var CameraBehaviour = pc.createScript('cameraBehaviour');

pc.extend(CameraBehaviour.prototype, {

    initialize: function() {

        this.cameraActions = {
            DEFAULT: 0,
            TUNNEL: 1,
            DUCK: 2
        };

        pc.gameCamera = this;

        this.playerOffset = new pc.Vec3(6.8, 3.75, 0);
        this.gameStartPos = new pc.Vec3(0, 0, 0);
        this.gameStartEul = new pc.Vec3(-20, 90, 0);

        this.tunnelActionTime = 0.96;
        this.tunnelOffset = new pc.Vec3(4.5, 1.2, 0);
        this.tunnelEuler = new pc.Vec3(-8, 90, 0);

        this.duckActionTime = 0.24;
        this.duckOffset = new pc.Vec3(5, 0.6, 0);
        this.duckEuler = new pc.Vec3(-6, 90, 0);

        this.savemePos = new pc.Vec3(480, 1.5, -79);
        this.savemeEul = new pc.Vec3(-12.9, -0.9, 1.9);
        this.cachedPos = new pc.Vec3(0, 0, 0);
        this.cachedEul = new pc.Vec3(0, 0, 0);

        this.currentAction = this.cameraActions.DEFAULT;
        this.actionVector = new pc.Vec3(0, 0, 0);
        this.actionEuler = new pc.Vec3(0, 0, 0);

        this.savemeActive = false;
        this.followYThreshold = 6.5;
        this.actionTime = 0.96;
        this.triggerDelta = 0;

        this.playerScript = this.app.root.findByTag('GamePlayer')[0].script.player;

        this.playerPos = this.playerScript.entity.getPosition();
        this.cameraPos = this.entity.getPosition();
        this.targetPos = this.playerPos.clone();
        this.lerpedPos = new pc.Vec3(0, 0, 0);
        this.targetEul = new pc.Vec3(0, 0, 0);
        this.lerpedEul = new pc.Vec3(0, 0, 0);

        this.oldActionVector = new pc.Vec3(0, 0, 0);
        this.oldActionEuler = new pc.Vec3(0, 0, 0);
        this.lerpedActionVector = new pc.Vec3(0, 0, 0);
        this.lerpedActionEuler = new pc.Vec3(0, 0, 0);

        this.entity.setPosition(pc.util.CAMERA_INIT_POS_VEC3);
        this.entity.setLocalEulerAngles(pc.util.CAMERA_INIT_ROT_VEC3);

        this.entity.rigidbody.group = pc.util.COLL_MASK_CAMERA;
        this.entity.rigidbody.mask = pc.util.COLL_MASK_TRIGGER;

        this.app.on('player:collision', this.doScreenShake, this);
        this.app.on('gameManager:gameOver', this.disableScreenShake, this);
    },

    postInitialize: function() {
        this.gameStartPos.set(0, 0, 0).add(pc.trackBuilder.playerSpawn);
    },

    setCameraHome: function() {
        this.entity.setPosition(0, 0.085, 0.886);
        this.entity.setEulerAngles(0, 0, 0);
    },

    setCameraGame: function() {

        this.entity.setPosition(this.gameStartPos);
        this.entity.setEulerAngles(this.gameStartEul);

        this.targetPos.set(0, 0, 0).add(this.gameStartPos);
        this.lerpedPos.set(0, 0, 0).add(this.gameStartPos);
        this.targetEul.set(0, 0, 0).add(this.gameStartEul);
        this.lerpedEul.set(0, 0, 0).add(this.gameStartEul);

        this.oldActionVector.set(0, 0, 0).add(this.playerOffset);
        this.oldActionEuler.set(0, 0, 0).add(this.gameStartEul);
        this.lerpedActionVector.set(0, 0, 0).add(this.playerOffset);
        this.lerpedActionEuler.set(0, 0, 0).add(this.gameStartEul);

        this.setCameraAction(this.cameraActions.DEFAULT);
        this.deltaGameActive = 0;
        this.savemeActive = false;
    },

    setCameraSaveMe: function(enable) {

        if (pc.sceneManager.isInHomeScene()) return;
        this.savemeActive = !!enable;

        if (!!enable) {

            this.cachedPos.set(0, 0, 0).add(this.entity.getPosition());
            this.cachedEul.set(0, 0, 0).add(this.entity.getEulerAngles());

            this.entity.setPosition(this.savemePos);
            this.entity.setEulerAngles(this.savemeEul);

        } else {

            this.entity.setPosition(this.cachedPos);
            this.entity.setEulerAngles(this.cachedEul);
        }
    },

    setCameraAction: function(action) {

        if ((this.deltaGameActive > 1) && this.triggerDelta < 0.2) return;

        this.currentAction = action;
        this.triggerDelta = 0;

        this.oldActionVector.set(0, 0, 0).add(this.lerpedActionVector);
        this.oldActionEuler.set(0, 0, 0).add(this.lerpedActionEuler);

        switch (this.currentAction) {

            case this.cameraActions.DEFAULT:
                {

                    this.actionVector = this.playerOffset;
                    this.actionEuler = this.gameStartEul;

                }
                break;

            case this.cameraActions.TUNNEL:
                {

                    if (this.playerPos.y > 3) return;
                    this.actionVector = this.tunnelOffset;
                    this.actionEuler = this.tunnelEuler;
                    this.actionTime = this.tunnelActionTime;

                }
                break;

            case this.cameraActions.DUCK:
                {

                    if (!pc.playerScript.isDucking() || pc.gameManager.speed > 2.3) {
                        this.currentAction = this.cameraActions.DEFAULT;
                        return;
                    }

                    this.actionVector = this.duckOffset;
                    this.actionEuler = this.duckEuler;
                    this.actionTime = this.duckActionTime;

                }
                break;

            default:
                {
                    console.warn('CameraBehaviour: unknown action', action);
                }
                break;
        }
    },

    doScreenShake: function(value) {
        if (value > 0) this.entity.script.cameraShader.shakeScreen(true);
    },

    disableScreenShake: function() {
        this.entity.script.cameraShader.shakeScreen(false);
    },

    postUpdate: function(dt) {

        if (pc.sceneManager.isInHomeScene()) return;
        if (this.savemeActive) return;

        this.triggerDelta += dt;
        this.deltaGameActive += dt;

        // Safeguard against triggerleave not functioning
        if ((this.triggerDelta > 4) && this.currentAction !== this.cameraActions.DEFAULT) {
            this.setCameraAction(0);
        }

        // Lerp Action vectors linearly        
        this.lerpedActionVector.lerp(this.oldActionVector, this.actionVector,
            Math.min(this.triggerDelta / this.actionTime * pc.gameManager.speed, 1));
        this.lerpedActionEuler.lerp(this.oldActionEuler, this.actionEuler,
            Math.min(this.triggerDelta / this.actionTime * pc.gameManager.speed, 1));

        // Set target vectors
        this.targetPos.set(this.playerPos.x, 1, this.playerPos.z).add(this.lerpedActionVector);
        this.targetEul.set(0, 0, 0).add(this.lerpedActionEuler);

        // Follow jumping player
        if (this.playerPos.y + this.cameraPos.y > this.followYThreshold) {
            this.targetPos.y += this.playerPos.y - 1;
        }

        // Lerp normal camera vectors exponentially
        this.lerpedPos.lerp(this.lerpedPos, this.targetPos, dt * 15); //dt * 10);
        this.lerpedEul.lerp(this.lerpedEul, this.targetEul, dt * 15); //dt * 10);

        // Do timescale thingy here
        var lerpedX = this.deltaGameActive < 0.2 ? this.lerpedPos.x : this.targetPos.x;
        this.entity.setPosition(lerpedX, this.lerpedPos.y, this.lerpedPos.z);
        this.entity.setEulerAngles(this.lerpedEul.x, this.lerpedEul.y, this.lerpedEul.z);

    }

});