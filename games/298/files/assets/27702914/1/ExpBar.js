var ExpBar = pc.createScript('expBar');

ExpBar.attributes.add('xpBarEntity', {
    type: 'entity',
    title: 'Xp bar entity',
});

ExpBar.attributes.add('levelNumberEntity', {
    type: 'entity',
    title: 'Level number entity',
});

ExpBar.attributes.add('rankEntity', {
    type: 'entity',
    title: 'Rank entity',
});

// initialize code called once per entity
ExpBar.prototype.initialize = function() {
    this.app.on("player:updateExp", this.setValues, this);

    this.expBarWidth = this.xpBarEntity.element.width;

    this.app.on('mainLocalization:enableText', this.updateXPbar, this);
};

ExpBar.prototype.setValues = function(lvl, key, ratio) {
    this.lvl = lvl;
    this.key = key;
    this.ratio = ratio;

    this.updateXPbar();
};

ExpBar.prototype.updateXPbar = function() {
    if (!pc.mainLocalization.activated) {
        return;
    }

    if (!this.lvl) {
        if (pc.util.EXPLICIT) console.warn('exp bar not set correct');
        return;
    }

    if (pc.util.EXPLICIT) console.log(this.lvl.toString())
    this.levelNumberEntity.script.textLocalization.setText(this.lvl.toString() + ':');
    this.rankEntity.script.textLocalization.setKey(this.key);
    this.xpBarEntity.element.width = this.expBarWidth * this.ratio;
};