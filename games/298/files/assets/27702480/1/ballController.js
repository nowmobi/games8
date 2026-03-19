var BallController = pc.createScript('ballController');

/* ----------------------------------------------------------------------------------------------------------------------
 * ATTRIBUTES
 * ---------------------------------------------------------------------------------------------------------------------- */

BallController.attributes.add('targetKickSpeed', {
    type: 'number',
    default: 86,
    title: 'Target Kick Speed',
});

BallController.attributes.add('freeKickSpeed', {
    type: 'number',
    default: 41,
    title: 'Free Kick Speed',
});

BallController.attributes.add('gravity', {
    type: 'number',
    default: -9.81,
    title: 'Gravity',
});

BallController.attributes.add('shootBallXCurve', {
    type: 'curve',
    title: 'Shoot Ball X Curve',
});

BallController.attributes.add('shootBallYCurve', {
    type: 'curve',
    title: 'Shoot Ball Y Curve',
});

BallController.attributes.add('maxXDistanceTarget', {
    type: 'number',
    default: 80,
    title: 'Maximal X Distance Target',
});

BallController.attributes.add('maxZDistanceTarget', {
    type: 'number',
    default: 2,
    title: 'Maximal Z Distance Target',
});

BallController.attributes.add('transparentMaterial', {
    type: 'material',
    title: 'Transparent Material'
});

BallController.attributes.add('marker', {
    type: 'entity',
    title: 'Ball Marker'
});
/* ----------------------------------------------------------------------------------------------------------------------
 * INITIALIZE
 * ---------------------------------------------------------------------------------------------------------------------- */

BallController.prototype.initialize = function() {
    pc.ball = this;
    this.ballState = {
        PICKEDUP: 'pickedUp',
        PICKINGUP: 'pickingUp',
        PLAYERFLYING: 'playerFlying',
        TARGET: 'target',
        FREE: 'free',
        RETURN: 'return'
    };

    pc.ball = this;

    this.gameManager = pc.gameManager;

    this.entity.rigidbody.group = pc.util.COLL_MASK_BALL;
    this.entity.rigidbody.mask = pc.util.COLL_MASK_PLAYER | pc.util.COLL_MASK_SCENERY | pc.util.COLL_MASK_TRIGGER;
    this.triggerComponent = this.entity.findByName('BallTrigger');

    this.groundHitted = false;
    this.isKicked = false;
    this.objectTouched = 0;
    //this.activeTargets = [];
    this.canBePickedUp = true;
    this.currentState = this.ballState.PICKEDUP;

    this.player = this.app.root.findByTag('GamePlayer')[0];

    this.lerpSpeed = new pc.Vec3(0, 0, 0);
    this.shootPosition = new pc.Vec3(0, 0, 0);

    this.groundHeight = this.entity.collision.radius / 1.5;

    this.app.on('player:Kick', this.kick, this);
    this.app.on('sceneManager:resetGameState', this.resetBallState, this);
    /*    this.on('destroy', function() {
            this.app.off("player:Kick");
        });*/
    this.lerpedPosition = new pc.Vec3(0, 0, 0);

    this.entity.collision.on('triggerenter', this.onCollisionStart, this);
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('contact', this.onCollision, this);
    this.app.on('gameManager:revivePlayer', this.resetBallState, this);

    this.triggerComponent.collision.on('triggerenter', this.onTriggerEnter, this);
};

BallController.prototype.resetBallState = function() {
    this.changeState(this.ballState.PICKEDUP);
    this.entity.rigidbody.teleport(100, 100, 100);
    this.resetPhysics();
};

/* ----------------------------------------------------------------------------------------------------------------------
 * UPDATE
 * ---------------------------------------------------------------------------------------------------------------------- */

// update code called every frame
BallController.prototype.update = function(dt) {
    switch (this.currentState) {
        case this.ballState.PICKEDUP:
            // seems to miss pickupEvent sometimes
            pc.targetManager.onBallPickup();
            break;
        case this.ballState.PICKINGUP:
            this.checkIfBehindCharacter();
            break;
        case this.ballState.PLAYERFLYING:
            break;
        case this.ballState.TARGET:
            this.resetPhysics();
            this.updateBallToTarget(dt);
            this.checkIfBehindCharacter();
            break;
        case this.ballState.FREE:
            this.applyGravity();
            this.checkIfNoVelocity();
            this.checkIfBehindCharacter();
            break;
    }
};

BallController.prototype.applyGravity = function() {
    this.entity.rigidbody.applyForce(0, this.gravity, 0);

    if (this.entity.getPosition().y < this.groundHeight) this.onSimulateGround();
};

BallController.prototype.updateBallToTarget = function(dt) {
    if (this.toTargetTime >= 1) {

        if (this.target.name === 'BullsEye') {

            pc.targetManager.onTargetHit(this.target);
            this.setPlayerTarget();

        } else {

            this.changeState(this.ballState.PICKEDUP);
            this.setCanBePickedUp(true);
        }

        // if (pc.util.arrayContainsTag(this.target.tags, 'GamePlayer')) {
        //     this.changeState(this.ballState.PICKEDUP);
        //     this.setCanBePickedUp(true);
        // } else if (pc.util.arrayContainsTag(this.target.tags, 'Target')) {
        //     this.target.script.target.changeStateToHit();
        //     this.setPlayerTarget();
        // }
        return;
    }
    this.lerpedPosition.set(0, 0, 0);

    this.toTargetTime += dt * this.timeFactor * 1 * this.gameManager.speed;
    this.toTargetTime = pc.util.clamp01(this.toTargetTime);
    this.lerpedPosition.lerp(this.shootPosition, this.target.getPosition(), this.toTargetTime);

    this.lerpSpeed.set(0, 0, 0);
    this.lerpSpeed.add(this.lerpedPosition);
    this.lerpSpeed.sub(this.entity.getLocalPosition());

    this.entity.rigidbody.teleport(this.lerpedPosition.x, this.lerpedPosition.y, this.lerpedPosition.z);
};

/* ----------------------------------------------------------------------------------------------------------------------
 * COLLISION
 * ---------------------------------------------------------------------------------------------------------------------- */

BallController.prototype.onCollision = function(collider) {
    // 
    // If something doesn't work, verify this. Should work, as ZERO static cannot be scaled anyhow
};

BallController.prototype.onCollisionStart = function(collider) {
    if (!!!this._collNormal) this._collNormal = new pc.Vec3(0, 0, 0);
    if (!!!this._collLerpSpeed) this._collLerpSpeed = new pc.Vec3(0, 0, 0);

    if (this.currentState === this.ballState.TARGET) {
        if (this.arrayHasTag(collider.other.tags, "Ground")) {

            this.entity.rigidbody.linearVelocity = this.entity.rigidbody.linearVelocity.scale(0.7);

            this.setCanBePickedUp(true);

            this._collNormal.set(0, 0, 0);
            this._collNormal.add(collider.contacts[0].normal);
            this._collNormal.scale(this._collNormal.dot(this.lerpSpeed) * 2).scale(30);

            this._collLerpSpeed.sub2(this.lerpSpeed, this._collNormal);

            // Teleport to the contact point
            this.entity.rigidbody.teleport(collider.contacts[0].pointOther);
            this.entity.rigidbody.linearVelocity = this._collLerpSpeed;

            this.changeState(this.ballState.FREE);
            this.app.fire('Audio:BallCollFloor');

        } else this.app.fire('Audio:BallCollWall');

    } else {
        this.groundHitted = true;
        this.app.fire('Audio:BallCollWall');
    }

    this.objectTouched += 1;
    this.setCanBePickedUp(true);

    if (this.objectTouched >= 3) {
        this.isKicked = false;
    } else return;

    if (this.arrayHasTag(collider.other.tags, 'GamePlayer')) {
        this.changeState(this.ballState.PICKEDUP);
    }
};

BallController.prototype.onSimulateGround = function() {

    this.groundHitted = true;
    this.objectTouched += 1;

    this.entity.rigidbody.teleport(this.entity.getPosition().x, this.groundHeight, this.entity.getPosition().z);
    this.entity.rigidbody.linearVelocity = this.entity.rigidbody.linearVelocity.scale(this.entity.rigidbody.restitution + 0.1);

    if (Math.abs(this.entity.rigidbody.linearVelocity.y) > 3.0) {

        this.entity.rigidbody.applyImpulse(0, Math.abs(this.entity.rigidbody.linearVelocity.y) * 1.8, 0);
        this.app.fire('Audio:BallCollFloor');

    } else {

        // Comfortably buggy: built-up gravity will re-trigger a small jump
        this.entity.rigidbody.linearVelocity.set(
            this.entity.rigidbody.linearVelocity.x, 0,
            this.entity.rigidbody.linearVelocity.z);

        this.setCanBePickedUp(true);
        this.showMarker(true);

    }
};

BallController.prototype.onTriggerEnter = function(entity) {

    if (!this.canBePickedUp) {
        return;
    }

    if (entity.tags._list.includes('GamePlayer')) {
        this.entity.rigidbody.teleport(100, 0, 0);
        this.changeState(this.ballState.PICKEDUP);
    }
};

/* ----------------------------------------------------------------------------------------------------------------------
 * KICK
 * ---------------------------------------------------------------------------------------------------------------------- */

BallController.prototype.kick = function() {

    this.showMarker(false);

    if (this.currentState === this.ballState.PICKEDUP) {

        if (pc.targetManager.hasActiveTarget()) this.kickAtTarget(pc.targetManager.getActiveBehaviour().entity);
        else this.kickFree();
    }
};

BallController.prototype.changeState = function(state) {

    this.currentState = state;
    switch (this.currentState) {
        case this.ballState.PICKEDUP:
            this.player.script.player.setBallVisibility(true);
            this.showMarker(false);
            pc.targetManager.onBallPickup();
            this.app.fire('Audio:BallPickup');
            break;
        case this.ballState.PICKINGUP:
            this.showMarker(true);
            break;
        case this.ballState.PLAYERFLYING:
            break;
        case this.ballState.TARGET:
            this.player.script.player.setBallVisibility(false);
            pc.targetManager.onKickTarget();
            this.app.fire('Audio:BallKickTarget');
            this.isKicked = true;
            this.objectTouched = 0;
            break;
        case this.ballState.FREE:
            this.player.script.player.setBallVisibility(false);
            pc.targetManager.onKickFree();
            this.app.fire('Audio:BallKickFree');
            this.isKicked = true;
            this.groundHitted = false;
            this.objectTouched = 0;
            break;
    }
};

BallController.prototype.checkIfNoVelocity = function() {
    if (this.isKicked) {
        return;
    }

    var magnitude = this.entity.rigidbody.linearVelocity.lengthSq();
    if (magnitude < 0.1 && magnitude !== 0) {
        this.changeState(this.ballState.PICKINGUP);
        this.resetPhysics();
    }
};

BallController.prototype.checkIfBehindCharacter = function() {

    // Player is touching Godrays
    if (this.marker.enabled &&
        (Math.abs(this.entity.getPosition().x - this.player.getPosition().x) < 4) &&
        (Math.abs(this.entity.getPosition().z - this.player.getPosition().z) < 1)) {

        this.changeState(this.ballState.PICKEDUP);
        return;
    }

    var distanceDifferenceX = this.entity.getPosition().x - this.player.getPosition().x;

    if ( /*distanceDifferenceX > 30 && this.groundHitted ||*/ distanceDifferenceX > 50) {
        this.changeState(this.ballState.PICKEDUP);
        return;
    }

    if (Math.abs(distanceDifferenceX) > 200) {
        console.warn('The ball has an extreme X position(' + distanceDifferenceX + '). Ball state is resetted');
        this.changeState(this.ballState.PICKEDUP);
        return;
    }

    var distanceDifferenceY = this.entity.getPosition().y - this.player.getPosition().y;

    if (Math.abs(distanceDifferenceY) > 50) {
        console.warn('The ball has an extreme Y position(' + distanceDifferenceY + '). Ball state is resetted');
        this.changeState(this.ballState.PICKEDUP);
        return;
    }

    var distanceDifferenceZ = this.entity.getPosition().z - this.player.getPosition().z;

    if (Math.abs(distanceDifferenceZ) > 50) {
        console.warn('The ball has an extreme Z position(' + distanceDifferenceZ + '). Ball state is resetted');
        this.changeState(this.ballState.PICKEDUP);
        return;
    }
};

BallController.prototype.canBeKicked = function() {
    return this.currentState === this.ballState.PICKEDUP;
};


/* ----------------------------------------------------------------------------------------------------------------------
 * UTILS
 * ---------------------------------------------------------------------------------------------------------------------- */

BallController.prototype.arrayHasTag = function(pArray, pTag) {
    return pArray._list.includes(pTag);
};

BallController.prototype.resetPhysics = function() {
    this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
    this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
};

BallController.prototype.kickFree = function() {
    if (!!!this._linearVel) this._linearVel = new pc.Vec3(0, 0, 0);
    var position = this.player.getLocalPosition();

    this.setCanBePickedUp(false);
    this.entity.rigidbody.teleport(position.x - 2, position.y + 1, position.z);
    this.resetPhysics();

    this._linearVel.set(-80, 10, 0);
    this.entity.rigidbody.linearVelocity = this._linearVel;

    this.changeState(this.ballState.FREE);
};

BallController.prototype.kickAtTarget = function(bullseye) {

    var playerPosition = this.player.getPosition();
    var targetPosition = bullseye.getPosition();
    this.setCanBePickedUp(false);
    this.target = bullseye;

    this.timeFactor = this.maxXDistanceTarget / (playerPosition.x - targetPosition.x);
    this.zFactor = playerPosition.z - targetPosition.z;
    this.toTargetTime = 0;

    this.changeState(this.ballState.TARGET);
    this.entity.rigidbody.teleport(playerPosition.x - 2, playerPosition.y + 1, playerPosition.z);

    this.shootPosition.set(0, 0, 0);
    this.shootPosition.add(this.entity.getPosition());
    this.app.fire('Audio:BallKickTarget');
};

BallController.prototype.setPlayerTarget = function() {

    this.shootPosition.set(0, 0, 0);
    this.shootPosition.add(this.entity.getPosition());
    this.setCanBePickedUp(true);

    this.timeFactor = Math.abs(this.maxXDistanceTarget / (this.shootPosition.x - this.player.getPosition().x));
    this.zFactor = this.shootPosition.z - this.player.getPosition().z;
    this.toTargetTime = 0;
    this.changeState(this.ballState.TARGET);

    this.target = this.player;
};

BallController.prototype.setCanBePickedUp = function(value) {
    this.canBePickedUp = value;
};

BallController.prototype.showMarker = function(value) {
    this.marker.enabled = !!value && (Math.abs(this.entity.rigidbody.linearVelocity.x) < 1);
};