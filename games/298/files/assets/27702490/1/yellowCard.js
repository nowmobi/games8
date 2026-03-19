var YellowCard = pc.createScript('yellowCard');

YellowCard.attributes.add('moveCurve', {
    type: 'curve',
    title: 'Move curve',
});

YellowCard.attributes.add('offset', {
    type: 'number',
    default: 100,
    title: 'Offset',
});

YellowCard.attributes.add('moveDuration', {
    type: 'number',
    default: 0.5,
    title: 'Offset',
});

// initialize code called once per entity
YellowCard.prototype.initialize = function() {
    this.cardState = {
        DEFAULT: 0,
        YELLOWCARD: 1,
        REDCARD: 2
    };
    this.position = this.entity.getLocalPosition();
    this.entity.setLocalPosition(this.position.add(new pc.Vec3(-this.offset, 0, 0)));
    this.initPositionX = this.position.x;

    this.setInitValues();

    this.app.on('gameManager:gameStart', this.setInitValues, this);
    this.app.on('gameManager:moveYellowCard', this.activateCard, this);
    this.app.on('saveMeManager:continue', this.setInitValues, this);

    /*    this.on('destroy', function() {
            this.app.off('gameManager:moveYellowCard');
            this.app.off('saveMeManager:continue');
            this.app.off('gameManager:gameStart');
        });*/
};

YellowCard.prototype.update = function(dt) {
    if (this.currentState === this.cardState.DEFAULT) {
        return;
    }
    this.time += dt;
    this.entity.setLocalPosition(
        this.initPositionX + this.moveCurve.value(this.time / this.moveDuration) * this.offset,
        this.position.y,
        this.position.z);
};

YellowCard.prototype.activateCard = function() {
    this.currentState = this.cardState.YELLOWCARD;
};

YellowCard.prototype.setInitValues = function() {
    this.time = 0;
    this.entity.setLocalPosition(this.initPositionX, 0, 0);
    this.currentState = this.cardState.DEFAULT;
};

YellowCard.prototype.applyTween = function() {
    // TODO get the correct angle of this entity
    var tween = this.entity.tween(this.entity.getLocalRotation()).to({
        x: 10,
        y: 10
    }, this.moveDuration, pc.Linear);
    tween.loop(true);
    tween.yoyo(true);
};