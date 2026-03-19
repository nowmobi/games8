var TrackBuilder = pc.createScript('trackBuilder');

//
// TrackBuilder - Manages the creation and placements of gameTracks
//

pc.extend(TrackBuilder.prototype, {

    getAllRoutesVisible: function() {
        return this.getCameraDistance() + (-this.nextLanePosition) < pc.quality.viewDistance;
    },

    getCameraDistance: function() {
        // Use playerposition to safeguard against disappearing areas
        return pc.playerEntity.position.x + pc.gameCamera.playerOffset.x;
    },

    getAreaIsOOB: function(offset, length) {
        return this.getDistanceIsOOB(offset - (pc.gameManager.tutorial ? 100 : 0)) && this.getDistanceIsOOB(offset - length - (pc.gameManager.tutorial ? 100 : 0));
    },

    getLaneIsOOB: function(laneDistance, length) {
        return laneDistance - this.getCameraDistance() > length;
    },

    getDistanceIsOOB: function(distance) {
        return (distance > this.getCameraDistance()) || (this.getCameraDistance() - distance > pc.quality.viewDistance);
    },

    getDistanceTravelled: function() {
        return Math.abs(this.entPlayer.position.x - this.playerOffset);
    },

    initialize: function() {

        this.entity.setLocalPosition(0, 0, 0);
        this.playerSpawn = new pc.Vec3(-5, 1, 0);

        this.routes = [];
        this.routeOffset = 0;
        this.routeIndex = 0;
        this.nextLanePosition = 0;
        this.entCamera = null;
        this.entPlayer = null;
        this.playerOffset = 0;
        this.isActive = false;
        this.batcherIsComplete = false;
        this.buildersIsInit = false;

        pc.trackBuilder = this;
    },

    postInitialize: function() {

        this.app.root.findByTag('GameCam')[0].camera.farClip = pc.quality.viewDistance;

        this.app.on('gameManager:gameStart', this.onStartGame, this);
        this.app.on('gameManager:gameEnd', this.onGameOver, this);
        this.app.on('sceneManager:OnHomeConfirmed', this.onGotoHome, this);
        this.app.on('gameManager:gameOver', this.onSaveMeActivate, this);
        this.app.on('saveMeManager:continue', this.onSaveMeContinue, this);
    },

    postUpdate: function(dt) {
        if (!this.isActive) return;

        while (this.getAllRoutesVisible()) {
            this.placeNextRoute();
        }

        pc.poolBuilder.doUpdate(dt);
    },

    onStartGame: function() {
        this.resetBuilders();
        this.createTrack();
        this.setTrackState(true);
    },

    onGameOver: function() {
        this.setTrackState(false);
        this.setSaveMeState(false);
    },

    onSaveMeActivate: function() {
        this.setTrackState(false);
        this.setSaveMeState(true);
    },

    onSaveMeContinue: function() {
        this.setSaveMeState(false);
        this.setTrackState(true);
    },

    onGotoHome: function() {
        pc.poolBuilder.resetState();
        this.setTrackState(false);
    },

    createTrack: function() {

        pc.playerEntity.rigidbody.teleport(this.playerSpawn);
        pc.playerEntity.setLocalEulerAngles(0, -90, 0);

        pc.gameCamera.setCameraGame();

        if (!!this.routes) {
            this.routes.splice(0, this.routes.length);
        }

        this.routeOffset = 0;
        this.routeIndex = 0;
        this.nextLanePosition = 0;

        this.routes = pc.routeBuilder.getTrackList();
    },

    resetBuilders: function() {
        pc.gameCamera.setCameraGame();
        pc.areaBuilder.resetState();
        pc.poolBuilder.resetState();
        this.buildersIsInit = true;
    },

    setTrackState: function(enable) {

        this.isActive = !!enable;

        if (this.isActive) {

            if (!this.buildersIsInit) {
                this.resetBuilders();
            }

            if (!this.routes.length) {
                this.createTrack();
            }
        }
    },

    setInactiveTrackPositions: function(position) {
        // OnHierarchyChanged event is expensive, but does influence AABB
        // TODO: refactor using syncAABB sometime
        // Maybe doable now because of pooling??
        //this.laneBuilder.setInactivePosition(position);
    },

    placeNextRoute: function() {

        // Set to lastLanePosition minus a bunch
        this.setInactiveTrackPositions((this.routeOffset - 4) * -100);

        if (this.routeIndex >= this.routes.length - 1) {
            this.routeIndex = 1;
        }

        var nextRoute = this.routes[this.routeIndex];

        if (pc.areaBuilder.areaIsAvailable(nextRoute[0])) {

            pc.areaBuilder.placeArea(nextRoute[0], this.nextLanePosition, pc.poolBuilder.getLaneLength(nextRoute));
            pc.poolBuilder.activateLane(nextRoute[0], nextRoute[1], this.nextLanePosition);
            this.nextLanePosition -= pc.poolBuilder.getLaneLength(nextRoute);
            this.routeOffset += 1;

        } else console.warn("TrackBuilder: unavailable route", nextRoute);

        this.routeIndex += 1;
    },

    setSaveMeState: function(enable) {

        if (!!!this.saveMeInstances && (enable === false)) return;

        if (!!!this.saveMeLocations) this.saveMeLocations = [new pc.Vec3(), new pc.Vec3(), new pc.Vec3()];
        if (!!!this.saveMeInstances) this.saveMeInstances = pc.areaBuilder.getInstances('MAIN');
        if (!!!this.saveMeStates) this.saveMeStates = [false, false, false];

        if (!!enable) {
            for (var i = 0; i < 3; i += 1) {
                this.saveMeLocations[i].set(0, 0, 0);
                this.saveMeLocations[i].add(this.saveMeInstances[i].getPosition());
                this.saveMeInstances[i].setPosition(480, 0, -96 - 75 + (50 * i));
                this.saveMeInstances[i].setLocalEulerAngles(0, 270, 0);

                this.saveMeStates[i] = this.saveMeInstances[i].enabled;
                this.saveMeInstances[i].enabled = true;
            }
        } else {
            for (var j = 0; j < 3; j += 1) {
                this.saveMeInstances[j].setPosition(this.saveMeLocations[j]);
                this.saveMeInstances[j].setLocalEulerAngles(0, 0, 0);
                this.saveMeInstances[j].enabled = this.saveMeStates[j];
            }
        }
    }

});