var PostScreenManager = pc.createScript('postScreenManager');

PostScreenManager.attributes.add('target', {
    type: 'entity',
    title: 'Target Entity',
});

PostScreenManager.attributes.add('coin', {
    type: 'entity',
    title: 'Coin Entity',
});

// initialize code called once per entity
PostScreenManager.prototype.initialize = function() {
    this.targetCounter = 0;
    this.coinCounter = 0;

    this.app.on('scoreManager:updateScoreCounter', this.setTargetCounter, this);
    this.app.on('gameManager:updateCoinContainer', this.setCoinCounter, this);
    this.app.on('saveMeManager:postScreen', this.setPostScreenValues, this);
    this.app.on('gameManager:gameStart', this.resetState, this);

    /*    this.on('destroy', function() {
            this.app.off('scoreManager:updateScoreCounter');
            this.app.off('gameManager:updateCoinContainer');
            this.app.off('saveMeManager:postScreen');
            this.app.off('gameManager:gameStart');
        });*/
};

// Managed by SceneManager - Set Object to its initialize state
PostScreenManager.prototype.resetState = function() {
    this.targetCounter = 0;
    this.coinCounter = 0;
};

PostScreenManager.prototype.setPostScreenValues = function() {
    this.target.script.text.setText(this.targetCounter);
    this.coin.script.text.setText(this.coinCounter + pc.player.coins);
    pc.audioManager.queueMenuTheme();

    var data = {
        exp: pc.gameManager.expGained,
        coins: this.coinCounter
    };
    pc.player.updateStats(data);
    this.setNewScore();
};


PostScreenManager.prototype.setTargetCounter = function(value) {
    this.targetCounter = value;
};

PostScreenManager.prototype.setCoinCounter = function(value) {
    this.coinCounter = value;
};

PostScreenManager.prototype.setNewScore = function() {
    pc.player.updateHighscore(this.targetCounter);
};