var SlidingPlayer = pc.createScript('slidingPlayer');

//
//  SlidingPlayer - Handles Behaviours and animations
//

pc.extend(SlidingPlayer.prototype, {

    initialize: function() {

        this.objectState = {
            WAITING: 'WAITING',
            MOVING: 'MOVING',
            SLIDING: 'SLIDING'
        };

        this.laneState = {
            LEFT: 'LEFT',
            MIDDLE: 'MIDDLE',
            RIGHT: 'RIGHT'
        };

        this.instancePos = this.entity.parent.getPosition().clone();

        this.slideDistance = 25;
        this.moveDistance = 65;
        this.velocityX = 12;

        this.stateDelta = 0;
        this.currentState = this.objectState.WAITING;

        this.animation = this.entity.animation;
        this.queuedAnimation = {
            name: '',
            loop: false
        };
        this.playAnimation('idle', true);
        this.app.on('Player:tutoriaRevive', this.tutorialReset, this);
        this.particleSystem = this.entity.parent.findByName('Particles').particlesystem;
        this.collision = this.entity.collision;

    },

    postInitialize: function() {
        pc.poolBuilder.addCallbacks(this, this.onReset, this.onDisable);
    },

    onReset: function() {
        this.entity.parent.translate(0, 0, -this.instancePos.z + (this.getLane() * pc.gameManager.laneZValues.RIGHT));
        this.instancePos = this.entity.parent.getPosition();
        this.queuedAnimation.name = '';
        this.setState('WAITING');
        this.stateDelta = 0.8;
        this.velocityX = pc.gameManager.isInTutorialMode() ? 6 : 12;
    },

    tutorialReset: function() {
        if (!this.entity.enabled) {
            return;
        }

        this.onReset();
    },

    onDisable: function() {

        this.particleSystem.enabled = false;
    },

    update: function(dt) {

        this.stateDelta += dt;
        this.checkAnimQueue();

        switch (this.currentState) {

            case this.objectState.WAITING:
                {

                    if (this.getDistance() < this.moveDistance) {
                        this.app.fire('Audio:EnemyRunning');
                        this.setState('MOVING');
                    }

                }
                break;

            case this.objectState.MOVING:
                {

                    this.entity.parent.translate(this.velocityX * dt *
                        pc.util.lerpClamp(0.8, 1.2, this.stateDelta), 0, 0);

                    if (this.getDistance() > this.slideDistance) {
                        if (this.stateDelta > 0.8) this.trySwitchLanes();
                    } else {
                        if (this.isInPlayerLane() && this.stateDelta > 0.6) this.setState('SLIDING');
                    }

                }
                break;

            case this.objectState.SLIDING:
                {

                    this.entity.parent.translate(this.velocityX * dt *
                        pc.util.lerpClamp(1.2, 1.8, this.stateDelta), 0, 0);

                }
                break;
        }
    },

    setState: function(state, direction) {

        this.currentState = this.objectState[state];
        this.stateDelta = 0;

        switch (this.currentState) {

            case this.objectState.WAITING:
                {

                    this.playAnimation('idle', true);
                    this.particleSystem.enabled = false;
                    this.collision.axis = 1;

                }
                break;

            case this.objectState.MOVING:
                {

                    this.playAnimation('run', true);
                    this.particleSystem.enabled = true;

                }
                break;

            case this.objectState.SLIDING:
                {

                    this.playAnimation('slide_in', false);
                    this.queuedAnimation.name = 'slide';
                    this.queuedAnimation.loop = true;

                    this.app.fire('Audio:EnemySlide');
                    this.collision.axis = 2;

                }
                break;
        }
    },

    getLaneRayHit: function(laneZValue) {

        pc.util.ray.start.set(this.instancePos.x, 0, this.instancePos.z);
        pc.util.ray.end.set(this.instancePos.x + 10, 0, this.instancePos.z + laneZValue);
        return pc.util.ray.get(this.app);
    },

    trySwitchLanes: function() {

        var wantsToGoLeft = (this.getLane() > -1);
        var wantsToGoRight = (this.getLane() < 1);
        var wantsToChangeLane = this.getLaneRayHit(0);


        if (wantsToChangeLane && !pc.util.strHasWord(wantsToChangeLane.entity.name, 'Player|Tutorial|Step|Respawn|Ball')) {


            if (wantsToGoRight) {
                if (wantsToGoLeft) wantsToGoRight = !!!this.getLaneRayHit(pc.gameManager.laneZValues.RIGHT);
            }

            // Not needed
            //if(wantsToGoLeft && !wantsToGoRight) {
            //    wantsToGoLeft = !!!this.getLaneRayHit(pc.gameManager.laneZValues.LEFT);
            //}

        } else {

            if (this.isInPlayerLane()) {
                return;
            }

            if (wantsToGoLeft) wantsToGoLeft = pc.playerScript.currentLane < this.getLane();
            if (wantsToGoRight) wantsToGoRight = pc.playerScript.currentLane > this.getLane();

            if (wantsToGoLeft && this.getLaneRayHit(pc.gameManager.laneZValues.LEFT)) return;
            if (wantsToGoRight && this.getLaneRayHit(pc.gameManager.laneZValues.RIGHT)) return;
        }

        this.playAnimation('move_' + (wantsToGoRight ? 'right' : 'left'), false);
        this.queuedAnimation.name = 'run';
        this.queuedAnimation.loop = true;

        this.entity.parent.setPosition(
            this.instancePos.x,
            this.instancePos.y,
            pc.gameManager.laneZValues[wantsToGoRight ? 'RIGHT' : 'LEFT'] + this.instancePos.z);

        this.stateDelta = 0;
    },

    getDistance: function() {

        return pc.playerEntity.getPosition().x - this.instancePos.x;
    },

    getLane: function() {

        if (this.instancePos.z > 1.5) return -1;
        else if (this.instancePos.z >= 0) return 0;
        return 1;
    },

    isInPlayerLane: function() {
        return pc.playerScript.currentLane === this.getLane();
    },

    playAnimation: function(anim, loop) {

        this.animation.play('Polygoon_' + anim + '.json');
        this.animation.loop = !!loop;
    },

    checkAnimQueue: function() {

        if (!this.animation.playing && this.queuedAnimation.name.length) {
            this.playAnimation(this.queuedAnimation.name, this.queuedAnimation.loop);
            this.queuedAnimation.name = '';
        }
    }

});