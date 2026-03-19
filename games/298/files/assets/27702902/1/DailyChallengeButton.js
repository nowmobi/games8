var DailyChallengeButton = pc.createScript('dailyChallengeButton');

DailyChallengeButton.attributes.add('dailyChallengeScreen', {
    type: 'entity',
    title: 'Daily Challenge Screen'
});

// initialize code called once per entity
DailyChallengeButton.prototype.initialize = function() {
    this.dailyChallengeScreen.enabled = false;

    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

DailyChallengeButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('Audio:UIConfirm');
    this.app.fire('Audio:UIMenuEnter');
    this.app.fire('button:openScreen', this.dailyChallengeScreen);
};