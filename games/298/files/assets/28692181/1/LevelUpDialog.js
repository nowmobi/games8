var LevelUpdialog = pc.createScript('levelUpdialog');

LevelUpdialog.attributes.add('amountEntity', {
    type: 'entity'
});
LevelUpdialog.attributes.add('buttons', {
    type: 'entity',
    array: true
});

pc.extend(LevelUpdialog.prototype, {

    initialize: function() {
        this.on('enable', function() {
            var value = pc.player.coins - this._reward;
            this.setCoinsDisplay(value);
        }, this);

        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].script.closeButton.on('pressed', this.giveReward, this);
        }

        var value = pc.player.coins - this._reward;

        this.setCoinsDisplay(value);
    },

    setReward: function(value) {
        if (typeof this._reward !== 'number') {
            this._reward = 0;
        }

        this._reward += value;
        this.amountEntity.element.text = this._reward;
    },

    giveReward: function() {
        this._reward = 0;
        this.setCoinsDisplay(pc.player.coins)
    },

    setCoinsDisplay: function(value) {
        this.app.fire('player:updateCoins', value);
    },
});