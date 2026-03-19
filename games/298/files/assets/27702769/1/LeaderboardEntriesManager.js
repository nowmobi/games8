var LeaderboardEntriesManager = pc.createScript('leaderboardEntriesManager');

LeaderboardEntriesManager.attributes.add('updateDuration', {
    type: 'number',
    default: 60000
});

// initialize code called once per entity
LeaderboardEntriesManager.prototype.initialize = function() {
    this.leaderboardEntries = [];
    this._updateLeaderboard = true;

    this.app.on('leaderboard:getAllPlayers', this.getAllPlayers, this);

    pc.lbEntryManager = this;
};

LeaderboardEntriesManager.prototype.getAllPlayers = function(force) {
    if (this.leaderboardEntries.length === 0 || this._updateLeaderboard || force) {
        //this.overlay.enabled = true;
        pc.wrapper.getLeaderboard(this.saveEntries, this);
    } else {
        this.app.fire('leaderboardEntriesManager:updateEntries', this.leaderboardEntries);
    }
};

LeaderboardEntriesManager.prototype.saveEntries = function(entries) {
    this.leaderboardEntries = entries;

    this.app.fire('leaderboardEntriesManager:updateEntries', this.leaderboardEntries);

    this._updateLeaderboard = false;

    setTimeout(this.updateLeaderboard.bind(this), this.updateDuration);
};

LeaderboardEntriesManager.prototype.updateLeaderboard = function() {
    this._updateLeaderboard = true;
};