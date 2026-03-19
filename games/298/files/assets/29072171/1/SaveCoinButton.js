var SaveCoinButton = pc.createScript('saveCoinButton');

pc.extend(SaveCoinButton.prototype, {

    initialize: function() {
        this.entity.script.changeSceneButton.on('pressed', this._pressed, this);
    },

    _pressed: function() {
        var data = {
            exp: pc.gameManager.expGained,
            coins: pc.gameManager.coinCointer
        };
        pc.player.updateStats(data);
    },
});