var LeaderboardManager = pc.createScript('leaderboardManager');

LeaderboardManager.attributes.add('playerList', {
    type: 'entity',
    title: 'Player List',
});

LeaderboardManager.attributes.add('overlay', {
    type: 'entity',
    title: 'Overlay',
});

LeaderboardManager.attributes.add('card', {
    type: 'entity',
    title: 'Card',
});

LeaderboardManager.attributes.add('cardEntryGroup', {
    type: 'entity',
    title: 'CardEntryGroup',
});

LeaderboardManager.attributes.add('nameEntity', {
    type: 'entity',
});

// initialize code called once per entity
LeaderboardManager.prototype.initialize = function() {

    // this.tabList = [this.playerTab, this.friendTab];
    this.scoreList = [this.playerList, this.friendList];

    this._entries = [];

    this.selectedIndex = 0;

    this.on('enable', this.getList, this);
    this.app.on("PlayerStatsManager:updateEntry", this.updateEntry, this);
    this.app.on('leaderboardEntriesManager:updateEntries', this.createList, this);
    this.getList();

    this.on('state', function() {
        pc.inputManager.setPreventDefault(!this.enabled);
    }, this);

    pc.inputManager.setPreventDefault(false);
};

LeaderboardManager.prototype.deleteLeaderboard = function() {
    for (var i = 0; i < this._entries.length; i++) {
        this._entries[i].destroy();
    }

    this._entries.length = 0;
};

LeaderboardManager.prototype.getList = function(index) {
    this.deleteLeaderboard();

    this.app.fire('leaderboard:getAllPlayers');
};

LeaderboardManager.prototype.createList = function(entries) {
    for (var i = 0; i < entries.length; i += 1) {

        var duplicate = this.card.clone();
        this.playerList.addChild(duplicate);

        if (duplicate.findByName('LabelPosition')) {
            duplicate.findByName('LabelPosition').script.text.setText(entries[i].rank.toString());
            duplicate.findByName('LabelScore').script.text.setText(entries[i].score.toString());
            duplicate.findByName('LabelPlayerName').script.text.setText(entries[i].name);
        }

        duplicate.setLocalPosition(0, 50 - (i * 64), 0);

        this._entries.push(duplicate);
    }

    this.playerList.element.height = entries.length * 65;

    this.overlay.enabled = false;
};

LeaderboardManager.prototype.updateEntry = function(id, name, score, oldName) {
    if (name.length > 0) {
        pc.fetch.setScore({
            id: id,
            name: name,
            score: score
        }, function() {
            this.updateLeaderboard(id, name, score, oldName);
        }, this);
    }

    this.updateLeaderboard(id, name, score, oldName);
};

LeaderboardManager.prototype.updateLeaderboard = function(id, name, score, oldName) {
    for (var i = 0; i < this._entries.length; i += 1) {
        if (this._entries[i].findByName('LabelPlayerName').element.text === oldName && this._entries[i].findByName('LabelScore').element.text === String(score)) {
            this._entries[i].findByName('LabelPlayerName').script.text.setText(name);
            this._entries[i].findByName('LabelScore').script.text.setText(score);
            return;
        }
    }

    if (this._entries.length === 0 || score > Number(this._entries[this._entries.length - 1].element.text)) {
        this.deleteLeaderboard();
        this.app.fire('leaderboard:getAllPlayers', true);
    }
};