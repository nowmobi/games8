var TargetManager = pc.createScript('targetManager');

pc.extend(TargetManager.prototype, {

    postInitialize: function() {

        this.accDeltaTime = 0;
        this.updateDelay = 1.0 / 20.0;
        this.activeIndex = -1;
        pc.targetManager = this;

        this.playerCanKick = false;
        this.targetIsLocked = false;

        this.app.on('gameManager:gameStart', this.onReset, this);
        this.app.on('saveMe:continue', this.onReset, this);
    },

    update: function(dt) {

        if (!!!this.ballController) this.setBallController();

        if ((this.accDeltaTime += dt) > this.updateDelay) {
            this.accDeltaTime = this.accDeltaTime - this.updateDelay;
            this.findActiveTarget();
        }
    },

    onReset: function() {

        this.accDeltaTime = 0;
        this.activeIndex = -1;
        this.playerCanKick = true;
        this.targetIsLocked = false;
    },

    addTargets: function(targetArray) {

        if (!!!this.targets) this.targets = [];
        for (var i = 0; i < targetArray.length; i += 1) {
            this.targets.push(targetArray[i].findOne('name', 'BullsEye'));
        }
    },

    setBallController: function() {

        this.ballController = pc.playerScript.ball.script.ballController;
        this.maxFocusDistance = this.ballController.maxXDistanceTarget;
        this.maxFocusWidth = 1.0; //this.ballController.maxZDistanceTarget;
    },

    onBallPickup: function() {

        this.playerCanKick = true;
        this.updateActiveTarget(false);
    },

    onKickFree: function() {

        this.playerCanKick = false;
        this.updateActiveTarget(false);
    },

    onKickTarget: function() {

        this.playerCanKick = false;
        this.updateActiveTarget(true);
    },

    onTargetHit: function(entity) {

        entity.script.targetBehaviour.changeState('HIT');
    },

    findActiveTarget: function() {

        this.playerPos = pc.playerEntity.getPosition();

        var closestDistance = this.maxFocusDistance;
        var closestIndex = -1;

        for (var i = 0; i < this.targets.length; i += 1) {

            if (!this.targets[i].enabled) continue;
            if (this.targets[i].script.targetBehaviour.isInState('HIT')) continue;
            if (Math.abs(this.playerPos.z - this.targets[i].getPosition().z) > this.maxFocusWidth) continue;

            var targetDistance = this.playerPos.x - this.targets[i].getPosition().x;
            if (!pc.util.isInRange(targetDistance, 0.1, this.maxFocusDistance)) continue;
            if (targetDistance > closestDistance) continue;

            pc.util.ray.start.set(0, 0, 0).add2(this.playerPos, pc.Vec3.UP);
            pc.util.ray.end.set(0, 0, 0).add(this.targets[i].getPosition());

            var ray = pc.util.ray.get(this.app);

            if (ray && (!ray.entity.parent || !ray.entity.parent.parent || !ray.entity.parent.parent.parent ||
                    ray.entity.parent.parent.parent.name !== 'Bullseye')) continue;

            closestDistance = targetDistance;
            closestIndex = i;
        }

        if (!this.hasActiveTarget() && (closestIndex < 0)) return;

        if (this.hasActiveTarget() && (closestIndex >= 0) && (this.activeIndex === closestIndex)) {
            return;
        }

        if (this.hasActiveTarget()) {
            this.getActiveBehaviour().isLocked = false;
            this.getActiveBehaviour().setReticule(false, false);
            this.activeIndex = -1;
        }

        if (closestIndex >= 0) this.activeIndex = closestIndex;
        this.updateActiveTarget();

    },

    hasActiveTarget: function() {
        return pc.util.isInRange(this.activeIndex, 0, this.targets.length);
    },

    getActiveBehaviour: function() {
        return this.targets[this.activeIndex].script.targetBehaviour;
    },

    updateActiveTarget: function(lock) {
        if (this.hasActiveTarget()) {
            this.getActiveBehaviour().setReticule(true, this.playerCanKick);
            if (lock) this.getActiveBehaviour().lockTarget();
        }
    },

});