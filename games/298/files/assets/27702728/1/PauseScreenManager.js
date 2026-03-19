var PauseScreenManager = pc.createScript('pauseScreenManager');

PauseScreenManager.attributes.add('pauseEntity', {
    type: 'entity',
    title: 'Pause Entity',
});

PauseScreenManager.attributes.add('inGameEntity', {
    type: 'entity',
    title: 'In Game Entity',
});

PauseScreenManager.attributes.add('entLabelReady', {
    type: 'entity',
    title: 'Entity Label Ready',
});

PauseScreenManager.attributes.add('entLabelGo', {
    type: 'entity',
    title: 'Entity Label LetsGo',
});

PauseScreenManager.attributes.add('entConfirm', {
    type: 'entity',
    title: 'Entity Confirm Exit',
});

// initialize code called once per entity
PauseScreenManager.prototype.initialize = function() {
    this.pauseEntity.enabled = false;

    this.app.on('PauseButton:showPauseScreen', this.enablePauseScreen, this);
    this.app.on('PauseScreenManager:onCancel', this.disablePauseScreen, this);
    this.app.on('PauseScreenManager:forceHide', this.hidePauseScreen, this);
    this.app.on('gameManager:gameStart', this.resetState, this);

    /*    this.on('destroy', function() {
            this.app.off('PauseButton:showPauseScreen');
            this.app.off('PauseScreenManager:onCancel');
            this.app.off('gameManager:gameStart');
        });*/

    this.timeOutReady = 0;
    this.timeOutGo = 0;
};

// Managed by SceneManager - Set Object to its initialize state
PauseScreenManager.prototype.resetState = function() {
    this.pauseEntity.enabled = false;
    this.inGameEntity.enabled = true;

    var self = this;

    // old code
    // self.app.fire('PauseButton:onPause');
    // self.disablePauseScreen();

    // should be more robust, but fixes the bug for tonight at least
    // 

    this.entLabelReady.enabled = true;
    this.entLabelGo.enabled = false;

    setTimeout(function() {
        self.entLabelReady.enabled = false;
        self.entLabelGo.enabled = true;
    }, 1200);

    setTimeout(function() {
        self.entLabelReady.enabled = false;
        self.entLabelGo.enabled = false;
    }, 3000);

};

PauseScreenManager.prototype.enablePauseScreen = function() {
    this.pauseEntity.enabled = true;
    this.inGameEntity.enabled = false;

    this.entLabelReady.enabled = false;
    this.entLabelGo.enabled = false;
};

PauseScreenManager.prototype.hidePauseScreen = function() {
    this.pauseEntity.enabled = false;
};

PauseScreenManager.prototype.disablePauseScreen = function() {
    this.pauseEntity.enabled = false;
    this.inGameEntity.enabled = true;

    this.entLabelReady.enabled = true;
    this.entLabelGo.enabled = false;

    if (this.timeOutReady) clearTimeout(this.timeOutReady);
    if (this.timeOutGo) clearTimeout(this.timeOutGo);

    var self = this;
    this.timeOutReady = setTimeout(function() {
        self.entLabelReady.enabled = false;
        self.entLabelGo.enabled = true;
        self.app.fire('PauseButton:onPause');
    }, 1200);

    this.timeOutGo = setTimeout(function() {
        self.entLabelReady.enabled = false;
        self.entLabelGo.enabled = false;
    }, 3000);
};