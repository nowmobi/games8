var AreaBuilder = pc.createScript('areaBuilder');

//
//  AreaBuilder - Manages the placement/removal of areaInstances.
//

pc.extend(AreaBuilder.prototype, {

    initialize: function() {

        this.entity.setLocalPosition(0, 0, 0);

        this.areaDepot = {};
        this.activeInstances = [];
        this.queuedAreas = [];
        this.flushQueue = true;

        // Register all areas
        for (var i = 0; i < this.entity.children.length; i += 1) {
            var areaEntity = this.entity.children[i];
            areaEntity.enabled = true;
            this.areaDepot[areaEntity.name] = areaEntity.script.area;
            this.areaDepot[areaEntity.name].lazyInitialize();
        }

        pc.areaBuilder = this;
    },

    resetState: function() {

        this.activeInstances.splice(0, this.activeInstances.length);
        this.queuedAreas.splice(0, this.queuedAreas.length);
        this.flushQueue = true;

        // Place all areas OOB (behind camera on gamestart)
        for (var areaScript in this.areaDepot) {
            this.areaDepot[areaScript].entity.setPosition(0, 0, 0);
            this.areaDepot[areaScript].resetState();
        }
    },

    update: function(dt) {

        if (!!!pc.trackBuilder || !pc.trackBuilder.isActive) return;
        if (!this.activeInstances.length) return;

        // Closest areaInstance is OutOfBounds
        if (pc.trackBuilder.getAreaIsOOB(
                this.activeInstances[0].getPosition().x,
                this.activeInstances[0].area.unitLength)) {

            this.removeArea();
        }

        // Furthest areaInstance is completely visible
        if (!pc.trackBuilder.getDistanceIsOOB(
                this.activeInstances[this.activeInstances.length - 1].getPosition().x -
                this.activeInstances[this.activeInstances.length - 1].area.unitLength)) {

            this.shiftQueue();
        }
    },

    shiftQueue: function() {
        this.flushQueue = false;
        if (this.queuedAreas.length < 1) return;
        var instance = this.queuedAreas.shift();
        this.placeArea(instance[0], instance[1], instance[2]);
    },

    areaIsAvailable: function(areaName) {
        return this.areaDepot[areaName].canRequest();
    },

    placeArea: function(areaName, position, laneLength) {

        var instance = this.areaDepot[areaName].request(position);
        if (!instance) {
            return false;
        }

        // Active instance
        instance.area = instance.parent.script.area;
        var areaLength = instance.area.is50mArea ? 50 : 100;
        this.activeInstances.push(instance);

        // Queued instances
        var nQueuedAreas = Math.round(laneLength / areaLength) - 1;
        for (var i = 0; i < nQueuedAreas; i++) {
            var posQueued = position - areaLength * (i + 1);
            this.queuedAreas.push([areaName, posQueued, areaLength]);
        }

        if (this.flushQueue) this.shiftQueue();
    },

    removeArea: function() {
        if (!this.activeInstances.length) return;
        this.activeInstances.shift().area.disable();
    },

    getInstances: function(areaName) {
        return this.areaDepot[areaName].getInstances();
    }

});