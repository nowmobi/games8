var Player = pc.createScript('player');


/* ----------------------------------------------------------------------------------------------------------------------
 * ATTRIBUTES
 * ---------------------------------------------------------------------------------------------------------------------- */

// Player.attributes.add('startVelocity', {
//     type: 'number', 
//     default: 7,
//     title: 'Start Velocity'
// });

Player.attributes.add('minVelocity', {
    type: 'number',
    default: 16,
    title: 'Min Velocity',
});

// Player.attributes.add('maxVelocity', {
//     type: 'number',
//     default: 34,
//     title: 'Max Velocity',
// });

Player.attributes.add('sideSpeed', {
    type: 'number',
    default: 10,
    title: 'Side Speed',
});

Player.attributes.add('duckingTime', {
    type: 'number',
    default: 0.5,
    title: 'Ducking Time',
});

Player.attributes.add('jumpCurve', {
    type: 'curve',
    title: 'Jump Curve',
});

Player.attributes.add('descendingCurve', {
    type: 'curve',
    title: 'Descending Curve',
});

Player.attributes.add('descendingHeight', {
    type: 'number',
    default: 8,
    title: 'Descending Height',
});

Player.attributes.add('slammingCurve', {
    type: 'curve',
    title: 'Slamming Curve',
});

Player.attributes.add('jumpHeight', {
    type: 'number',
    default: 4,
    title: 'Jump Height',
});

Player.attributes.add('obstacleCurve', {
    type: "curve",
    title: 'Obstacle Curve'
});

Player.attributes.add('smokeParticle', {
    type: "entity",
    title: 'Smoke Particles'
});

Player.attributes.add('spikeParticle', {
    type: "entity",
    title: 'Spike Particles'
});

Player.states = {
    switch_L_out: {
        animation: 'ronaldo_switch_L_out.json'
    },
    switch_L: {
        animation: 'ronaldo_switch_L.json'
    },
    switch_R: {
        animation: 'ronaldo_switch_R.json'
    },
    duck: {
        animation: 'ronaldo_duck.json'
    },
    duck_in: {
        animation: 'ronaldo_duck_in.json'
    },
    ronaldo_jumpascending: {
        animation: 'ronaldo_jumpascending.json'
    },
    ronaldo_jumpdescending: {
        animation: 'ronaldo_jumpdescending.json'
    },
    ronaldo_slam: {
        animation: 'ronaldo_slam.json'
    },
    ronaldo_kick: {
        animation: 'ronaldo_kick.json'
    },
    ronaldo_run: {
        animation: 'ronaldo_run.json'
    },
    ronaldo_bounceL: {
        animation: 'ronaldo_bounceL.json'
    },
    ronaldo_bounceR: {
        animation: 'ronaldo_bounceR.json'
    },
    duck_out: {
        animation: 'ronaldo_duck_out.json'
    },
    ronaldo_glanceLR: {
        animation: 'ronaldo_glanceLR.json'
    }
};

/* ----------------------------------------------------------------------------------------------------------------------
 * INITIALIZE
 * ---------------------------------------------------------------------------------------------------------------------- */

Player.prototype.initialize = function() {
    pc.playerEntity = this.entity;
    pc.playerScript = this;
};

Player.prototype.postInitialize = function() {

    // had to re-insert it, it might be incorrect
    this.reviveLocation = new pc.Vec3(-6.6, 1, 0);

    // Used for saving last input
    this.lastInput = {
        input: '',
        saved: false,
    };

    // Used to save animation to play it later
    this.animationQueue = {
        animation: '',
        blendTime: 0,
        queue: false,
    };

    // Define lane states
    this.lanes = {
        LEFT: -1,
        MIDDLE: 0,
        RIGHT: 1,
    };

    this.currentAnimation = {
        animation: 'ronaldo_run',
        blendTime: 0.1,
        loop: true,
    };

    this.initPosition = pc.trackBuilder.playerSpawn;
    this.deltaPosition = new pc.Vec3(0, 0, 0);

    this.entity.rigidbody.group = pc.util.COLL_MASK_PLAYER;
    this.entity.rigidbody.mask = pc.util.COLL_MASK_BALL | pc.util.COLL_MASK_SCENERY | pc.util.COLL_MASK_TRIGGER;

    this.ball = this.entity.parent.findByTag("Football")[0];
    this.ballMeshInstance = this.entity.children[0].model.meshInstances[4];
    this.ballMaterial = this.ballMeshInstance.material;

    this.groundCheckRay = new pc.Vec3(-1.5, (-this.entity.collision.height / 2) - 0.65, 0);
    this.tunnelCheckRay = new pc.Vec3(0, 6, 0);
    this.rayCastStart = new pc.Vec3(0, 0, 0);
    this.rayCastEnd = new pc.Vec3(0, 0, 0);

    // Angle used for rotation in air
    this.originalAngle = new pc.Vec3(
        this.entity.getLocalEulerAngles().x,
        this.entity.getLocalEulerAngles().y,
        this.entity.getLocalEulerAngles().z);

    this.angleOffset = 0;

    this.playerState = {
        RUNNING: 'running',
        TOLEFT: 'toLeft',
        TORIGHT: 'toRight',
        FORCETOLEFT: 'forceToLeft',
        FORCETORIGHT: 'forceToRight',
        JUMPING: 'jumping',
        JUMPINGDESCENDING: 'jumpingDescending',
        DUCKING: 'ducking',
        DUCKINGIN: 'duckingin',
        DUCKINGOUT: 'duckingout',
        SLAMMING: 'slamming',
    };

    this.currentState = this.playerState.RUNNING;
    this.changeState(this.currentState);

    this.isGrounded = true;
    this.isJumping = false;
    this.isInvincible = false;
    this.hasKicked = false;

    // Set initial values
    this.currentVelocity = this.minVelocity;
    this.currentLane = this.lanes.MIDDLE;
    this.jumpY = 0;
    this.jumpTime = 0;
    this.descendingTime = 0;
    this.slamTime = 0;
    this.duration = 0;
    //this.cameraY = this.initPosition.y;

    this.localPosition = this.entity.getLocalPosition();

    this.obstacleCollideDelay = 1;
    this.obstacleCollideDelayTime = 1;

    this.coinParticle = this.entity.findByName('CoinPulse').script.coinParticle;

    this.entity.collision.on('collisionend', this.onCollisionEnd, this);
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('contact', this.onCollision, this);

    this.app.on("inputManager:Input", this.applyInput, this);
    this.app.on('saveMeManager:continue', this.revive, this);
    this.app.on('gameManager:gameStart', this.enablePlayer, this);
    this.app.on('gameManager:magnetState', this.setMagnetActive, this);
    this.app.on('gameManager:shieldState', this.setShieldActive, this);
    this.app.on('gameManager:revivePlayer', this.tutorialRevive, this);

    this.setMagnetActive(false);

};

Player.prototype.enablePlayer = function() {
    this._onStairs = false;
    this.collisionDelay = 0.2;
    this.deltaIsEnabled = 0;

    this.lastInput.input = '';
    this.lastInput.saved = false;

    this.animationQueue.animation = '';
    this.animationQueue.blendTime = 0;
    this.animationQueue.queue = false;

    this.currentAnimation.animation = 'ronaldo_run';
    this.currentAnimation.blendTime = 0;
    this.currentAnimation.loop = true;

    this.deltaPosition.set(0, 0, 0);

    // Angle used for rotation in air
    this.originalAngle.set(
        this.entity.getLocalEulerAngles().x,
        this.entity.getLocalEulerAngles().y,
        this.entity.getLocalEulerAngles().z);

    this.angleOffset = 0;

    // Set initial values
    this.currentVelocity = this.minVelocity;
    this.currentLane = this.lanes.MIDDLE;

    this.isJumping = false;
    this.jumpY = 0;
    this.jumpTime = 0;
    this.descendingTime = 0;
    this.slamTime = 0;
    this.duration = 0;
    //this.cameraY = this.initPosition.y;

    this.isInvincible = false;
    this.hasKicked = false;

    this.currentState = this.playerState.RUNNING;
    this.changeState(this.currentState);

    this.obstacleCollideDelay = 1;
    this.obstacleCollideDelayTime = 1;

    this.applyCorrectAnimation('ronaldo_run', 0, true);
    this.entity.rigidbody.teleport(this.localPosition);
};

/* ----------------------------------------------------------------------------------------------------------------------
 * INPUT
 * ---------------------------------------------------------------------------------------------------------------------- */

Player.prototype.applyInput = function(input) {
    this.lastInput.saved = false;

    switch (input) {
        case "SwipeUp":
            this.jump();
            break;
        case "SwipeDown":
            if (this.isGrounded) {
                this.duckIn();
            } else {
                this.slam();
            }
            break;
        case "SwipeLeft":
            this.moveLeft();
            break;
        case "SwipeRight":
            this.moveRight();
            break;
        case "Click":
            this.kick();
            break;
    }
};

Player.prototype.saveInput = function(input) {
    this.lastInput.input = input;
    this.lastInput.saved = true;
};

Player.prototype.applyLastInput = function() {
    if (this.lastInput.saved) {
        this.applyInput(this.lastInput.input);
    }

    //this.cameraY = this.entity.getLocalPosition().y;

    this.lastInput.saved = false;
};


/* ----------------------------------------------------------------------------------------------------------------------
 * COLLISIONS
 * ---------------------------------------------------------------------------------------------------------------------- */

Player.prototype.onCollisionStart = function(collider) {
    //console.log(collider);

    if (this.deltaIsEnabled < this.collisionDelay) return;

    if (this.arrayHasTag(collider.other.tags, "SlidingPlayer")) {
        this.app.fire('Audio:EnemyTackle');
        if (pc.gameManager.isInTutorialMode()) {
            collider.other.enabled = false;
        }
        this.app.fire("player:collision", 2);
    }

    if (this.arrayHasTag(collider.other.tags, 'Slope')) {
        this._onStairs = true;
        this.setCharacterYPosition(collider);
        return;
    }

    if (this.arrayHasTag(collider.other.tags, "Ground")) {
        this.checkCollision(collider);
    }

};

Player.prototype.onCollisionEnd = function(collider) {
    if (this.arrayHasTag(collider.tags, 'Slope')) {
        setTimeout(this.disableOnStairs.bind(this));
        return;
    }
};

Player.prototype.disableOnStairs = function() {
    this._onStairs = false;
};

Player.prototype.onCollision = function(collider) {

    if (this.deltaIsEnabled < this.collisionDelay) return;

    var point = collider.contacts[0].localPoint;

    // If collider is beneath
    if (point.y > this.entity.collision.height * 0.1) {
        return;
    }

    if (this.arrayHasTag(collider.other.tags, 'Slope')) {
        this._onStairs = true;
        this.setCharacterYPosition(collider);
    }

};

Player.prototype.checkCollision = function(collider, isGround) {

    if (this.app.timeScale === 0) {
        return;
    }

    var point = collider.contacts[0].localPoint;

    // Player collided with top of an object
    // 
    // 
    // 

    //console.log(point);
    //console.log(collider);

    // if(Math.abs(collider.contacts[0].point.y - this.entity.getPosition().y - 1) < 0.2) {
    //     console.log('feet collision');
    //     this.entity.rigidbody.teleport(this.localPosition.x, collider.contacts[0].point.y + 1.01, this.localPosition.z);
    //     return;
    // }

    //
    // Collision: football
    //

    if (this.arrayHasTag(collider.other.tags, "FootBall")) {
        return;
    }

    //
    // Collision: below
    //

    // If object is not an obstacle, increase threshold to avoid front collision on near-top
    var bypassThreshold = this.arrayHasTag(collider.other.tags, "Obstacle") ? 0.12 : 0.45;

    if (point.y < (-this.entity.collision.height / 2 * 0.3) + bypassThreshold) {
        // console.log('happpppp');
        this.setCharacterYPosition(collider);
        this.applyLastInput();
    }

    //
    // Collision: front
    //

    if (Math.round(point.z * 10) >= this.entity.collision.radius && point.y > -0.6) {

        if (this.arrayHasTag(collider.other.tags, 'NoFrontCollision')) {
            this.setCharacterYPosition(collider);
            return;
        }

        /*        if(this.isInvincible) {

            // do stuff

            return;
        }*/

        if (this.arrayHasTag(collider.other.tags, 'DuckObstacle')) {
            if (!this.isDucking()) {
                this.app.fire("player:collision", 2);
                // this.frontCollisionAnimation();
                return;
            } else {
                return;
            }
        }

        if (this._onStairs) {
            this.setCharacterYPosition(collider);
            return;
        }

        if (collider.parent && collider.parent.parent && collider.parent.parent.name.includes('building') && point.y > -0.4) {
            return;
        }

        //console.log('coll', collider, this.entity.getPosition());
        this.app.fire("player:collision", 2);

        //this.frontCollisionAnimation();
        return;
    }

    /*    if(this.isInvincible) {

        // do stuff

        return;
    }*/

    //
    // Collision: side
    //


    if (Math.round(Math.abs(point.x) * 10) >= this.entity.collision.radius && point.y > -0.6) {

        if (point.x < 0) {
            if (this.arrayHasTag(collider.other.tags, 'NoSideCollision')) {
                console.warn("no side collision triggered")
                return;
            }

            this.app.fire("player:collision", 1);

            if (!pc.gameManager.isInTutorialMode()) {
                this.forceMoveLeft();
            }

            return;
        } else {
            if (this.arrayHasTag(collider.other.tags, 'NoSideCollision')) {
                console.warn("no side collision triggered")
                return;
            }
            this.app.fire("player:collision", 1);

            if (!pc.gameManager.isInTutorialMode()) {
                this.forceMoveRight();
            }
        }
    }
};

Player.prototype.setCharacterYPosition = function(collider) {
    var contactPoint = collider.contacts[0].pointOther;
    this.entity.rigidbody.teleport(contactPoint.x, contactPoint.y + this.entity.collision.height / 2 - 0.01, contactPoint.z);
};

Player.prototype.collideWithObstacle = function() {

    if (this.deltaIsEnabled < this.collisionDelay) return;

    this.frontCollisionAnimation();
    this.app.fire("player:collision", 0);
    this.obstacleCollideDelayTime = 0;
};

/* ----------------------------------------------------------------------------------------------------------------------
 * ACTIONS
 * ---------------------------------------------------------------------------------------------------------------------- */

Player.prototype.kick = function() {
    if (!this.ball.script.ballController.canBeKicked()) {
        return;
    }

    this.doForcedAnimation('ronaldo_kick', 0, true);
    this.hasKicked = true;

    //var self = this;

    // setTimeout(function() {
    //     self.hasKicked = false;
    // }, this.entity.children[0].animation.duration * 1000);

    this.app.fire("player:Kick", this.entity.getPosition());
};

Player.prototype.kickBall = function() {
    // TODO Kick ball
};

Player.prototype.jump = function() {
    if (this.isGrounded) {
        this.changeState(this.playerState.JUMPING);
        this.isJumping = true;
        this.jumpTime = 0;
        this.jumpY = this.entity.getLocalPosition().y; // WORKS w/o clone?
        this.app.fire("player:Jump");
    } else {
        this.saveInput('SwipeUp');
    }
};

Player.prototype.descend = function() {
    this.changeState(this.playerState.JUMPINGDESCENDING);
    this.descendingTime = 0;
    this.jumpY = this.entity.getLocalPosition().y; // WORKS w/o clone?
};

Player.prototype.slam = function() {

    // Stop if already slamming
    if (this.currentState === this.playerState.SLAMMING) {
        return;
    }

    if (!this.isGrounded) {
        this.changeState(this.playerState.SLAMMING);
        this.slamTime = 0;
        this.lastInput.saved = false;
    }
};

Player.prototype.duckIn = function() {
    if (this.currentState === this.playerState.DUCKING || this.currentState === this.playerState.DUCKINGIN) {
        return;
    }

    this.changeState(this.playerState.DUCKINGIN);
    this.app.fire('player:Duck');
};

Player.prototype.duck = function() {
    this.duration = 0;
    this.changeState(this.playerState.DUCKING);
};

Player.prototype.duckOut = function() {
    this.duration = 0;
    this.changeState(this.playerState.DUCKINGOUT);
};


Player.prototype.moveLeft = function() {
    if (this.currentState === this.playerState.FORCETOLEFT || this.currentState === this.playerState.FORCETORIGHT) {
        //return;
    }

    if (this.currentState === this.playerState.TOLEFT) {
        this.saveInput('SwipeLeft');
        return;
    }

    if (this.currentLane === this.lanes.LEFT) {
        return;
    }

    if (this.isGrounded) {
        this.changeState(this.playerState.TOLEFT);
    } else {
        this.angleOffset = 30;
    }

    this.currentLane = this.lanes[this.getKeyByValue(this.currentLane - 1)];
    this.app.fire('player:switchLane', this.currentLane);
};

// Refactor with function argument?
Player.prototype.forceMoveLeft = function() {
    if (this.currentState === this.playerState.FORCETOLEFT || this.currentState === this.playerState.FORCETORIGHT) {
        return;
    }

    if (this.currentState === this.playerState.FORCETOLEFT) {
        return;
    }

    if (this.currentLane === this.lanes.LEFT) {
        return;
    }

    this.changeState(this.playerState.FORCETOLEFT);

    this.currentLane = this.lanes[this.getKeyByValue(this.currentLane - 1)];

    this.app.fire('player:switchLane', this.currentLane);
};

Player.prototype.moveRight = function() {
    if (this.currentState === this.playerState.FORCETOLEFT || this.currentState === this.playerState.FORCETORIGHT) {
        //return;
    }

    if (this.currentState === this.playerState.TORIGHT) {
        this.saveInput('SwipeRight');
        return;
    }

    if (this.currentLane === this.lanes.RIGHT) {
        return;
    }
    if (this.isGrounded) {
        this.changeState(this.playerState.TORIGHT);
    } else {
        this.angleOffset = -30;
    }

    this.currentLane = this.lanes[this.getKeyByValue(this.currentLane + 1)];
    this.app.fire('player:switchLane', this.currentLane);
};

Player.prototype.forceMoveRight = function() {
    if (this.currentState === this.playerState.FORCETORIGHT) {
        return;
    }

    if (this.currentLane === this.lanes.RIGHT) {
        return;
    }

    this.changeState(this.playerState.FORCETORIGHT);

    this.currentLane = this.lanes[this.getKeyByValue(this.currentLane + 1)];
    this.app.fire('player:switchLane', this.currentLane);
};

/* ----------------------------------------------------------------------------------------------------------------------
 * UPDATE
 * ---------------------------------------------------------------------------------------------------------------------- */

Player.prototype.update = function(dt) {
    this.deltaIsEnabled += dt;
    this.checkAnimation(dt);

    // Calculate position

    this.deltaPosition.set(0, 0, 0);
    this.deltaPosition.add(this.applySideMovement(dt));
    this.deltaPosition.add(this.applyForwardMovement(dt));
    this.deltaPosition.add(this.applyVerticalMovement(dt));
    this.deltaPosition.add(this.localPosition);

    // Miscellaneous

    //this.updateCameraY();
    this.updateObstacleCollide(dt);
    this.applyRotation(dt);

    this.entity.rigidbody.teleport(this.deltaPosition);

    // Collision

    this.checkIfFallingThroughFloor();
    this.checkIfFalling();
    this.checkIfGrounded();

    // Global player FrameSpeed

    pc.gameManager.playerFrameSpeed = this.currentVelocity * dt * pc.gameManager.speed;
};

Player.prototype.checkIfFallingThroughFloor = function() {
    if (this.localPosition.y < 1.0) {
        this.entity.rigidbody.teleport(this.localPosition.x, 1, this.localPosition.z);
    }
};

Player.prototype.checkIfFalling = function() {
    if (this.currentState === this.playerState.JUMPING || this.currentState === this.playerState.JUMPINGDESCENDING || this.currentState === this.playerState.SLAMMING) {
        return;
    }

    if (this._onStairs) {
        return;
    }

    if (this.isGrounded) {
        return;
    }

    this.descend();
};

Player.prototype.applyForwardMovement = function(dt) {
    if (!!!this._plForwardDelta) this._plForwardDelta = new pc.Vec3(0, 0, 0);
    return this._plForwardDelta.set(-this.currentVelocity * dt * pc.gameManager.speed * this.obstacleCollideDelay, 0, 0);
};


//?
Player.prototype.updateObstacleCollide = function(dt) {
    if (this.obstacleCollideDelayTime > 1) {
        return;
    }

    this.obstacleCollideDelayTime += dt;
    this.obstacleCollideDelay = this.obstacleCurve.value(this.obstacleCollideDelayTime);
};

Player.prototype.applySideMovement = function(dt) {
    if (!!!this._plSideDelta) this._plSideDelta = new pc.Vec3(0, 0, 0);
    else this._plSideDelta.set(0, 0, 0);

    if (Math.abs(pc.gameManager.laneZValues[this.getKeyByValue(this.currentLane)] - this.localPosition.z) < 0.1) {
        this.angleOffset = 0;
        return this._plSideDelta;
    }

    var differencePosition = this.localPosition.z - pc.gameManager.laneZValues[this.getKeyByValue(this.currentLane)];
    var differenceSpeed = this.sideSpeed * dt;

    if (differencePosition > 0) {
        return this._plSideDelta.set(0, 0, -Math.min(differencePosition, differenceSpeed));
    } else {
        return this._plSideDelta.set(0, 0, -Math.min(-differencePosition, -differenceSpeed));
    }
};

Player.prototype.applyVerticalMovement = function(dt) {

    if (!!!this._plVerticalDelta) this._plVerticalDelta = new pc.Vec3(0, 0, 0);
    else this._plVerticalDelta.set(0, 0, 0);

    if (this.currentState === this.playerState.JUMPING) {
        var previousHeight = this.jumpCurve.value(this.jumpTime) * this.jumpHeight;
        this.jumpTime += 0.8 * dt;
        if (this.jumpTime > 0.48) {
            this.descend();
        }
        //console.log( this.jumpCurve.value(this.jumpTime) * this.jumpHeight - previousHeight)
        return this._plVerticalDelta.set(0, this.jumpCurve.value(this.jumpTime) * this.jumpHeight - previousHeight, 0);

    } else if (this.currentState === this.playerState.JUMPINGDESCENDING) {

        var previousHeightDesc = this.descendingCurve.value(this.descendingTime) * this.descendingHeight;
        this.descendingTime += 0.6 * dt;

        // console.log( this.jumpCurve.value(this.jumpTime) * this.jumpHeight - previousHeight)
        return this._plVerticalDelta.set(0, this.descendingCurve.value(this.descendingTime) * this.descendingHeight - previousHeightDesc, 0);

    } else if (this.currentState === this.playerState.SLAMMING) {

        var previousHeightSlam = this.slammingCurve.value(this.slamTime) * this.descendingHeight;
        this.slamTime += 2 * dt;
        return this._plVerticalDelta.set(0, this.slammingCurve.value(this.slamTime) * this.descendingHeight - previousHeightSlam, 0);
    }

    if (this._onStairs) {
        return this._plVerticalDelta.set(0, pc.gameManager.speed * dt * 1.5, 0);
    }

    return this._plVerticalDelta.set(0, 0, 0);
};

Player.prototype.applyRotation = function(dt) {
    this.entity.children[0].setLocalEulerAngles(this.originalAngle.x, this.angleOffset, this.originalAngle.z);
};


/* ----------------------------------------------------------------------------------------------------------------------
 * ANIMATIONSpsal
 * ---------------------------------------------------------------------------------------------------------------------- */

Player.prototype.changeState = function(state) {
    this.currentState = state;

    switch (this.currentState) {
        case this.playerState.DUCKING:
            this.applyCorrectAnimation('duck');
            break;
        case this.playerState.DUCKINGIN:
            this.doForcedAnimation('duck_in', 0, true);
            this.resetAnimationQueue();
            break;
        case this.playerState.DUCKINGOUT:
            this.applyCorrectAnimation('duck_out');
            break;
        case this.playerState.JUMPING:
            this.applyCorrectAnimation('ronaldo_jumpascending');
            break;
        case this.playerState.JUMPINGDESCENDING:
            this.applyCorrectAnimation('ronaldo_jumpdescending', 0.3);
            break;
        case this.playerState.SLAMMING:
            this.applyCorrectAnimation('ronaldo_slam');
            break;
        case this.playerState.TOLEFT:
            this.applyCorrectAnimation('switch_R');
            break;
        case this.playerState.TORIGHT:
            this.applyCorrectAnimation('switch_L');
            break;
        case this.playerState.FORCETOLEFT:
            this.applyCorrectAnimation('ronaldo_bounceR');
            break;
        case this.playerState.FORCETORIGHT:
            this.applyCorrectAnimation('ronaldo_bounceL');
            break;
        case this.playerState.RUNNING:
            this.applyCorrectAnimation('ronaldo_run', 0.1);
            break;
    }

    if (this.animationQueue.queue) {
        this.entity.children[0].animation.loop = false;
        return;
    }

    if (this.currentState == this.playerState.RUNNING) {
        this.entity.children[0].animation.loop = true;
    } else {
        this.entity.children[0].animation.loop = false;
    }
};

Player.prototype.applyCorrectAnimation = function(animation, blendTime, loop) {
    if (this.animationQueue.queue) {
        this.animationQueue.animation = animation;
        this.animationQueue.blendTime = blendTime || 0;
        return;
    }

    this.playAnimation(animation, blendTime, loop);
};

Player.prototype.playAnimation = function(state, blendTime, loop) {
    this.entity.children[0].animation.play(Player.states[state].animation || Player.states.ronaldo_run.animation, blendTime || 0);
    this.entity.children[0].animation.loop = loop || 0;
    this.entity.children[0].animation.speed = pc.gameManager.speed / 1.3;
    this.setCurrentAnimation(state, blendTime || 0, loop || 0);
};

Player.prototype.setCurrentAnimation = function(state, blendTime, loop) {
    this.currentAnimation.animation = state;
    this.currentAnimation.blendTime = blendTime;
    this.currentAnimation.loop = loop;
};

/*
 * Since the animations have no onComplete Event listener this method is added.
 */
Player.prototype.checkAnimation = function(dt) {
    this.duration += dt;

    if (this.animationQueue.queue) {
        if (this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration) {
            this.playNextAnimationInQueue();
            return;
        }
    }

    switch (this.currentState) {
        case this.playerState.DUCKINGIN:
            if (this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration && this.currentAnimation.animation === 'duck_in') {
                this.duck();
            }
            break;
        case this.playerState.DUCKING:
            if (this.duration >= this.duckingTime) {
                if (this.currentAnimation.animation === 'duck') {
                    this.duckOut();
                } else {
                    if (this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration) {
                        this.changeState(this.playerState.RUNNING);
                    }
                }

            }
            break;
        case this.playerState.DUCKINGOUT:
            if (this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration) {
                this.changeState(this.playerState.RUNNING);
            }
            break;
        case this.playerState.JUMPING:
            if (this.entity.rigidbody.linearVelocity.y < 0) {
                this.descend();
            }
            break;
        case this.playerState.JUMPINGDESCENDING:
            if (this.isGrounded) {
                this.changeState(this.playerState.RUNNING);
            }
            break;
        case this.playerState.SLAMMING:
            if (this.isGrounded) {
                this.duckIn();
                this.app.fire('player:Slam');
                this.playSmokeParticles();
            }
            break;
        case this.playerState.TOLEFT:
            if (this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration - 0.50) {
                this.changeState(this.playerState.RUNNING);
                this.applyLastInput();
            }
            break;
        case this.playerState.TORIGHT:
            if (this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration - 0.50) {
                this.changeState(this.playerState.RUNNING);
                this.applyLastInput();
            }
            break;
        case this.playerState.FORCETOLEFT:
            if (this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration) {
                if (this.isGrounded) {
                    this.changeState(this.playerState.RUNNING);
                } else {
                    this.descend();
                }
            }
            break;
        case this.playerState.FORCETORIGHT:
            if (this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration) {
                if (this.isGrounded) {
                    this.changeState(this.playerState.RUNNING);
                } else {
                    this.descend();
                }
            }
            break;
    }

    if (this.currentAnimation.animation === 'ronaldo_kick' && this.entity.children[0].animation.currentTime >= this.entity.children[0].animation.duration) {
        this.changeState(this.playerState.RUNNING);
    }

};

Player.prototype.frontCollisionAnimation = function() {
    this.doForcedAnimation('ronaldo_glanceLR');
};

Player.prototype.playNextAnimationInQueue = function() {
    if (this.animationQueue.animation === '') {
        console.warn('no Animation in queue');
        this.changeState(this.playerState.RUNNING)
        return;
    }

    this.playAnimation(this.animationQueue.animation, this.animationQueue.blendTime);
    this.resetAnimationQueue();

    if (this.currentState == this.playerState.RUNNING) {
        this.entity.children[0].animation.loop = true;
    } else {
        this.entity.children[0].animation.loop = false;
    }
};

Player.prototype.doForcedAnimation = function(animation, blendTime, forced) {
    if (this.animationQueue.queue === true && !forced) {
        return;
    }

    if (this.currentAnimation.animation !== 'ronaldo_kick') {
        this.animationQueue.blendTime = this.currentAnimation.blendTime;
        this.animationQueue.animation = this.currentAnimation.animation;
        this.animationQueue.queue = true;
    }

    if (animation === 'ronaldo_kick') {
        this.resetAnimationQueue();

    }

    this.playAnimation(animation, blendTime, false);
};

Player.prototype.resetAnimationQueue = function() {
    this.animationQueue.queue = false;
    this.animationQueue.blendTime = 0;
    this.animationQueue.animation = '';
};

/* ----------------------------------------------------------------------------------------------------------------------
 * POWERUPS
 * ---------------------------------------------------------------------------------------------------------------------- */

Player.prototype.setMagnetActive = function(enable) {
    //console.log("MagnetState: " + enable);
    this.app.fire('player:setMagnetAttractor', enable);
};

Player.prototype.setShieldActive = function(enable) {
    //console.log("ShieldState: " + enable);
    this.isInvincible = enable;
    // this.app.fire('player:setMagnetAttractor', enable);
};

/* ----------------------------------------------------------------------------------------------------------------------
 * UTILS
 * ---------------------------------------------------------------------------------------------------------------------- */

Player.prototype.getKeyByValue = function(value) {
    for (var prop in this.lanes) {
        if (this.lanes.hasOwnProperty(prop)) {
            if (this.lanes[prop] === value)
                return prop;
        }
    }
};

Player.prototype.arrayHasTag = function(pArray, pTag) {
    return pArray._list.includes(pTag);
};


Player.prototype.doRayCast = function(rayCastVector) {

    this.rayCastStart.set(0, 0, 0);
    this.rayCastEnd.set(0, 0, 0);

    this.rayCastStart.add(this.entity.getPosition());
    this.rayCastEnd.add2(this.rayCastStart, rayCastVector);

    return this.app.systems.rigidbody.raycastFirst(this.rayCastStart, this.rayCastEnd);
};

Player.prototype.checkIfGrounded = function() {

    this.isGrounded = this.localPosition.y <= this.initPosition.y;

    if (!this.isGrounded) {
        var rayCastHit = this.doRayCast(this.groundCheckRay);
        if (rayCastHit && rayCastHit.entity.tags._list.includes('Ground')) {
            this.isGrounded = true;
        }
    }

    if (this.isGrounded && this.isJumping) {
        this.app.fire('player:Land');
        this.isJumping = false;
    }

};


Player.prototype.isDucking = function() {
    return this.currentState === this.playerState.DUCKING || this.currentState === this.playerState.DUCKINGIN || this.currentState === this.playerState.DUCKINGOUT;
};

Player.prototype.setBallVisibility = function(value) {
    this.ballMeshInstance.visible = !!value;
};

Player.prototype.revive = function() {

    this.entity.rigidbody.teleport(this.entity.getLocalPosition().x, this.initPosition.y, this.initPosition.z);
    this.currentLane = this.lanes.MIDDLE;
    this.resetAnimationQueue();
    this.changeState(this.playerState.RUNNING);
    //this.cancelKickInput = true;
    this.app.fire('player:switchLane', this.currentLane);
    this.isInvincible = false;
};

Player.prototype.playSmokeParticles = function() {
    this.smokeParticle.particlesystem.reset();
    this.smokeParticle.particlesystem.play();
};

Player.prototype.playSpikeParticle = function() {
    this.spikeParticle.particlesystem.reset();
    this.spikeParticle.particlesystem.play();
};


Player.prototype.playCoinParticle = function() {
    this.coinParticle.activateParticle();
};

Player.prototype.setReviveLocation = function(position) {
    this.reviveLocation = position.clone();
};

Player.prototype.tutorialRevive = function() {
    this.entity.rigidbody.teleport(this.reviveLocation.x, 1, this.reviveLocation.z);
    this.checkLanePosition();
    this.app.fire('Player:tutoriaRevive');
};

Player.prototype.checkLanePosition = function() {
    var z = this.reviveLocation.z;

    if (z > 1.5) {
        this.currentLane = this.lanes.LEFT;
    } else if (z < -1.5) {
        this.currentLane = this.lanes.RIGHT;
    } else {
        this.currentLane = this.lanes.MIDDLE;
    }

    this.resetAnimationQueue();
    this.lastInput.saved = false;

    this.playAnimation('ronaldo_run', 0, true);
};