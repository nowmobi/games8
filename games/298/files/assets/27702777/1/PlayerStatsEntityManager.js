var PlayerStatsEntityManager = pc.createScript('playerStatsEntityManager');

PlayerStatsEntityManager.attributes.add('highscore', {
    type: 'entity',
    title: 'Highscore Entity'
});

PlayerStatsEntityManager.attributes.add('coins', {
    type: 'entity',
    title: 'Coins Entity'
});

PlayerStatsEntityManager.attributes.add('gems', {
    type: 'entity',
    title: 'Gems Entity'
});

// initialize code called once per entity
PlayerStatsEntityManager.prototype.initialize = function() {
    this.highscore.enabled = false;
    this.gems.enabled = false;
    this.coins.enabled = false;

    this.app.on('player:updateGems', this.updateGemsText, this);
    this.app.on('player:updateCoins', this.updateCoinsText, this);
    this.app.on('player:updateHighscore', this.updateHighscoreText, this);
    this.app.on('loadingScreen:activateText', this.activateText, this);
    this.on("state", function(enabled) {
        if (enabled) {
            this.updateGemsText(pc.player.gems);
            this.updateCoinsText(pc.player.coins);
            this.updateHighscoreText(pc.player.highscore);
        }
    });

    this.updateGemsText(pc.player.gems);
    this.updateCoinsText(pc.player.coins);
    this.updateHighscoreText(pc.player.highscore);
    if (!this.gemsValue) {
        this.gemsValue = 0;
    }

    if (!this.coinsValue) {
        this.coinsValue = 0;
    }

    if (!this.highScoreValue) {
        this.highScoreValue = 0;
    }

};

PlayerStatsEntityManager.prototype.updateGemsText = function(value) {
    this.gemsValue = value;
    this.setGemsText();
};

PlayerStatsEntityManager.prototype.updateCoinsText = function(value) {
    this.coinsValue = value;
    this.setCoinsText();
};

PlayerStatsEntityManager.prototype.updateHighscoreText = function(value) {
    this.highScoreValue = value;
    this.setHighscoreText();
};

PlayerStatsEntityManager.prototype.setGemsText = function() {
    this.gems.script.text.setText(this.gemsValue.toLocaleString());
};

PlayerStatsEntityManager.prototype.setCoinsText = function() {
    this.coins.script.text.setText(this.coinsValue.toLocaleString());
};

PlayerStatsEntityManager.prototype.setHighscoreText = function() {
    this.highscore.script.text.setText(this.highScoreValue.toLocaleString());
};

PlayerStatsEntityManager.prototype.activateText = function() {
    this.gems.enabled = true;
    this.coins.enabled = true;
    this.highscore.enabled = true;

    this.setGemsText();
    this.setHighscoreText();
    this.setCoinsText();
};