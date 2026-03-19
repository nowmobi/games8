var ShowTutorialHitBox = pc.createScript('showTutorialHitBox');

ShowTutorialHitBox.attributes.add('type', {
    type: 'number',
    enum: [{
            Left: 0
        },
        {
            Right: 1
        },
        {
            Up: 2
        },
        {
            Down: 3
        },
        {
            KickIntro2: 4
        },
        {
            KickIntro3: 5
        },
        {
            WellDone: 6
        },
        {
            YourTurn: 7
        },
    ],
    title: 'Type',
});

// initialize code called once per entity
ShowTutorialHitBox.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

ShowTutorialHitBox.prototype.onTriggerEnter = function(collider) {
    if (pc.util.arrayContainsTag(collider.tags, "GamePlayer")) {

        if (this.type === 1 && pc.playerScript.currentLane === 0) {
            return;
        }

        if (this.type === 5) {
            pc.ball.changeState(pc.ball.ballState.PICKEDUP);
        }

        this.app.fire('showTutorialHitBox:showText', this.type);
    }
};