var PlayerEntry = pc.createScript('playerEntry');

pc.extend(PlayerEntry.prototype, {
    initialize: function() {
        this._nameEntity = this.entity.findByName('LabelPlayerName');
        this._scoreEntity = this.entity.findByName('LabelScore');

        this.app.on('PlayerStatsManager:updateEntry', this.postInitialize, this);
        this.on('enable', this.postInitialize, this);
    },

    postInitialize: function() {
        this.setName(pc.player.name);
        this.setHighscore(pc.player.highscore);
    },

    setName: function(name) {
        this._nameEntity.element.text = name;
    },

    setHighscore: function(highscore) {
        this._scoreEntity.element.text = highscore;
    },
});