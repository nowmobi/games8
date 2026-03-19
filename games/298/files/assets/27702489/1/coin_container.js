var CoinContainer = pc.createScript('coinContainer');

// initialize code called once per entity
CoinContainer.prototype.initialize = function() {
    this.app.on('gameManager:updateCoinContainer', this.updateCoinCounter, this);

    /*    this.on('destroy', function() {
            this.app.off('gameManager:updateCoinContainer');
        });*/
};

CoinContainer.prototype.updateCoinCounter = function() {
    this.entity.script.text.setText(pc.gameManager.coinCointer + pc.player.coins);
};