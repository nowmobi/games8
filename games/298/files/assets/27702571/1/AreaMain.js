var Area = pc.createScript('area');

//
//  Area - Handles requests for area instances
//

Area.attributes.add("is50mArea", {
    type: 'boolean',
    default: false,
    title: 'is50mArea'
});

Area.attributes.add("instanceCount", {
    type: 'number',
    default: 1,
    title: 'instanceCount'
});

pc.extend(Area.prototype, {

    lazyInitialize: function() {
        this.entity.setLocalPosition(0, 0, 0);
        this.instances = [];
        this.unitLength = this.is50mArea ? 50 : 100;

        var entChildren = this.entity.children;

        if (entChildren.length === 0) {
            console.error(this.entity.name + ": no instances in descendants! (AREA_ERROR)");
            this.enabled = false;
            return;
        }

        // Register instances
        this.instances.push(entChildren[0]);
        for (var j = 1; j < this.instanceCount; j += 1) {
            this.clone(entChildren[0]);
        }

        // Initialize instances
        for (var n = 0; n < this.instances.length; n += 1) {
            this.instances[n].isActiveArea = false;
            this.instances[n].setPosition(this.unitLength + 300 + this.unitLength * n, 0, 0);
        }

        if (pc.util.DEBUG) {
            if (this.instanceCount > 6) {
                console.warn('AREA: Instance count is too high (Please set to 6)');
            }

            if ((this.instanceCount > 1) && !this.entity.name.includes('MAIN')) {
                console.warn('AREA: non-MAIN can only have single instance');
            }
        }

    },

    resetState: function() {
        this.entity.setLocalPosition(0, 0, 0);

        for (var i = 0; i < this.instances.length; i += 1) {
            this.instances[i].isActiveArea = false;
            this.instances[i].setPosition(this.unitLength + 300 + this.unitLength * i, 0, 0);
            this.instances[i].enabled = false;
        }

    },

    clone: function(entity) {

        var clone = entity.clone();
        this.entity.addChild(clone);
        this.instances.unshift(clone);

    },

    disable: function() {

        for (var x = 0; x < this.instances.length; x += 1) {
            if (this.instances[x].isActiveArea) {
                this.instances[x].isActiveArea = false;
                this.instances[x].enabled = false;
                return;
            }
        }
        console.error(this.entity.name + ": No instance was in use for removal!");

    },

    canRequest: function() {
        return this.instances[0].isActiveArea === false;
    },

    request: function(position) {
        var instance = null;

        if (this.instances[0].isActiveArea) {
            console.warn(this.entity.name + ": All instances are already in use! (PERFORMANCE_COST)");
            return;
        } else instance = this.instances.shift();

        this.instances.push(instance);
        instance.setPosition(position, 0, 0);
        instance.isActiveArea = true;
        instance.enabled = true;

        return instance;
    },

    getInstances: function() {
        return this.instances;
    }

});