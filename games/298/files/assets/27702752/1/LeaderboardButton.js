var LeaderboardButton = pc.createScript('leaderboardButton');

LeaderboardButton.attributes.add('leaderboardScreen', {
    type: 'entity',
    title: 'Leaderboard Screen'
});

// initialize code called once per entity
LeaderboardButton.prototype.initialize = function() {
    this.leaderboardScreen.enabled = false;

    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

LeaderboardButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('Audio:UIConfirm');
    this.app.fire('Audio:UIMenuEnter');

    this.app.fire('button:openScreen', this.leaderboardScreen);
};