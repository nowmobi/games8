var TargetBehaviour = pc.createScript('targetBehaviour');

//
// Target - Controls targeting bullseye obstacles
//

pc.extend(TargetBehaviour.prototype, {

    initialize: function() {

        this.targetState = {
            DEFAULT: 'default',
            HIT: 'hit',
        };

        this.targetName = this.entity.parent.parent.name;
        this.preCollider = this.entity.parent.findOne('name', 'Collider').collision;
        this.postColliders = this.entity.parent.find('name', 'postCollider');

        if (!pc.util.strHasWord(this.preCollider.entity.tags._list.join(), 'Ground')) {
            this.preCollider.on('triggerenter', this.onCollision, this);
        }

        this.animComponent = this.entity.parent.findOne('name', 'Model').animation;

        this.meshTarget = this.entity.model.meshInstances[0];
        this.meshFocus = this.entity.model.meshInstances[1];
        this.meshReticule = this.entity.model.meshInstances[2];

        this.changeState('DEFAULT');
        this.isRemoveable = false;

        this.activeReticule = false;
        this.activeFocus = false;

        this.deltaSpin = 0;
        this.deltaReticule = 0;
        this.deltaFocussed = 0;

        this.totalSpinTime = 0.48;
        this.totalReticuleTime = 0.28;
        this.totalFocusTime = 0.26;
    },

    postInitialize: function() {
        pc.poolBuilder.addCallbacks(this, this.onReset, this.onDisable);
    },

    update: function(dt) {

        if (!this.isAlive()) {
            this.onDisable();
            return;
        }

        this.deltaSpin = pc.util.clamp01(this.deltaSpin + (this.activeReticule ? dt : -dt) / this.totalSpinTime);
        this.deltaReticule = pc.util.clamp01(this.deltaReticule + (this.activeReticule ? dt : -dt) / this.totalReticuleTime);
        this.deltaFocussed = pc.util.clamp01(this.deltaFocussed + (this.activeFocus ? dt : -dt) / this.totalFocusTime);
        this.deltaEuler = pc.util.clamp01(this.deltaFocussed * 2.0);

        if (this.isInState('HIT')) {
            if (this.isRemoveable) {
                // confetti
                //this.entity.parent.translate(-40 * dt, -40 * dt * 0.04, 0);
            }
        }

        if (this.meshTarget.visible) {
            //var scaleTarget = this.activeFocus ? Math.sqrt(1 - this.deltaFocussed) : Math.sin((1 - this.deltaFocussed) * Math.PI * 0.64) * 1.12;
            //this.meshTarget.node.setEulerAngles((180 * this.deltaEuler), 90 - (180 * this.deltaEuler), (180 * this.deltaEuler));
            var scaleTarget = Math.sqrt(1 - this.deltaFocussed);
            this.meshTarget.node.setEulerAngles(0, 90 - (180 * this.deltaEuler), 0);
            this.meshTarget.node.setLocalScale(scaleTarget, scaleTarget, scaleTarget);
        }

        if (this.meshFocus.visible) {
            var scaleFocus = !this.activeFocus ? Math.sqrt(this.deltaFocussed) : Math.sin((this.deltaFocussed) * Math.PI * 0.64) * 1.12;
            this.meshFocus.node.setEulerAngles((180 * this.deltaEuler), -90 + (180 * this.deltaEuler), (180 * this.deltaEuler));
            this.meshFocus.node.setLocalScale(scaleFocus, scaleFocus, scaleFocus);
        }

        if (this.meshReticule.visible) {
            var scaleReticule = 0.014 * Math.sin(this.deltaReticule * Math.PI * 0.64) * 1.2;
            this.meshReticule.node.rotate(180 * (this.deltaSpin + 0.25) * dt, 0, 0);
            this.meshReticule.node.setLocalScale(scaleReticule, scaleReticule, scaleReticule);
        }
    },

    onCollision: function(entity) {

        if (pc.util.arrayContainsTag(entity.tags, 'GamePlayer')) {
            entity.script.player.collideWithObstacle();
            this.setColliders(false);
            this.onTargetHit(true);
        }
    },

    onReset: function() {
        this.changeState('DEFAULT');
        this.animComponent.currentTime = 0;
        this.animComponent.data.playing = false;
    },

    onDisable: function() {
        this.entity.parent.enabled = false;
    },

    changeState: function(state) {

        this.currentState = this.targetState[state];

        if (this.isInState('DEFAULT')) {
            this.isLocked = false;
            this.setReticule(false, false);
            this.setColliders(true);

            this.deltaSpin = 0;
            this.deltaReticule = 0;
            this.deltaFocussed = 0;
            this.activeReticule = false;
            this.activeFocus = false;
            this.meshTarget.visible = true;
            this.meshFocus.visible = true;
        }

        if (this.isInState('HIT')) {
            this.onTargetHit();
            this.setColliders(false);
        }
    },

    setColliders: function(value) {
        this.preCollider.enabled = !!value;
        for (var i = 0; i < this.postColliders.length; i += 1) {
            this.postColliders[i].enabled = !!!value;
        }
    },

    lockTarget: function() {
        this.setReticule(true, false);
        this.isLocked = true;
    },

    disableReticule: function() {
        this.meshTarget.visible = false;
        this.meshFocus.visible = false;
        this.meshReticule.visible = false;
        this.isLocked = true;
    },

    setReticule: function(focus, playerCanKick) {
        if (this.isLocked) return;

        this.activeFocus = !this.isInState('HIT') && focus;
        this.activeReticule = !this.isInState('HIT') && focus && playerCanKick;
        this.meshReticule.visible = this.activeReticule;
    },

    onTargetHit: function(ignoreScore) {

        if (!ignoreScore) {
            this.app.fire('target:collision', 1);
            this.app.fire("target:hit", this.entity.parent.getPosition(), 1 * pc.scoreManager.targetMultiplier);
        }

        this.disableReticule();

        this.playAnimation();

        switch (this.targetName) {
            case 'Bins':
                this.app.fire('Audio:BallHitBins');
                this.isRemoveable = true;
                break;
            case 'Crates':
                this.app.fire('Audio:BallHitCrate');
                this.isRemoveable = true;
                break;
            case 'Ladder':
                this.app.fire('Audio:BallHitLadder');
                this.isRemoveable = true;
                break;
            case 'Gate':
                this.app.fire('Audio:BallHitFence');
                this.isRemoveable = false;
                break;
            case 'FoodCart':
                this.app.fire('Audio:BallHitCart');
                this.isRemoveable = true;
                break;
            case 'Market':
                this.app.fire('Audio:BallHitStall');
                this.isRemoveable = false;
                break;
            case 'MovingTrain':
                this.app.fire('Audio:BallHitTrain');
                this.isRemoveable = false;
                break;
            case 'Scaffold':
                this.app.fire('Audio:BallHitScaffold');
                this.isRemoveable = false;
                break;
            case 'Sign':
                this.app.fire('Audio:BallHitSign');
                this.isRemoveable = false;
                break;
            case 'SatDish':
                this.app.fire('Audio:BallHitSatDish');
                this.isRemoveable = true;
                break;
            case 'Engine':
                this.app.fire('Audio:BallHitEngine');
                this.isRemoveable = true;
                break;
            default:
                console.warn('Target: missing audio event (' + this.targetName + ')');
                this.isRemoveable = false;
        }
    },

    isAlive: function() {
        if (!this.isRemoveable) return true;
        return this.animIsPlaying();
    },

    isInState: function(state) {
        return this.currentState === this.targetState[state];
    },

    animIsPlaying: function() {
        return pc.util.isInRange(this.animComponent.currentTime, 0, this.animComponent.duration - 0.01);
    },

    playAnimation: function(applyMovement) {

        this.animComponent.speed = 1.0;
        this.animComponent.currentTime = 0;
        this.animComponent.loop = false;
        this.animComponent.play(this.targetName + '.json', 0);
    },

});