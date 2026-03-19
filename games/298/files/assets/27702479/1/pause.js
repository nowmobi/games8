var Pause = pc.createScript('pause');

Pause.attributes.add('leaderboard', {
    type: 'entity'
});

// initialize code called once per entity
Pause.prototype.initialize = function() {
    this.paused = false;

    // Will handle window change to set the game on pause
    // NOTE: document+window might trigger twice
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this), false);
    document.addEventListener('focus', this.handleVisibilityChange.bind(this), false);
    document.addEventListener('blur', this.handleVisibilityChange.bind(this), false);
    window.addEventListener('focus', this.handleVisibilityChange.bind(this), false);
    window.addEventListener('blur', this.handleVisibilityChange.bind(this), false);

    window.onblur = function() {
        pc.inputManager.canPreventDefault = false;
        this.handleVisibilityChange(false);
    }.bind(this);

    window.onfocus = function() {
        pc.inputManager.canPreventDefault = !this.leaderboard.enabled;
        //this.handleVisibilityChange(true);
    }.bind(this);

    this.app.on('PauseButton:onPause', this.togglePaused, this);
    this.app.on('pause:forcePause', this.forcePauseGame, this);
    this.app.on('gameManager:gameOver', this.forcePauseGame, this);
    this.app.on('saveMeManager:continue', this.forceUnpauseGame, this);
    this.app.on('gameManager:gameStart', this.forceUnpauseGame, this);
    this.app.on('sceneManager:unpause', this.forceUnpauseGame, this);
    /*    this.on('destroy', function() {
            this.app.off('PauseButton:onPause');
            this.app.off('pause:forcePause');
            this.app.off('gameManager:gameOver');
            this.app.off('saveMeManager:continue'); 
            this.app.off('gameManager:gameStart');
            this.app.off('sceneManager:unpause');
        }, this);*/
};

Pause.prototype.togglePaused = function() {
    // More information about app.timeScale http://developer.playcanvas.com/en/api/pc.Application.html#timeScale
    // app.timeScale is global and affects the value of dt that is passed into the update functions
    if (this.paused) {
        this.app.timeScale = 1;
    } else {
        this.app.timeScale = 0;
    }

    this.paused = !this.paused;
    this.app.fire('pause:pause', this.paused);
};

Pause.prototype.forcePauseGame = function() {
    this.app.timeScale = 0;
    this.paused = true;
    this.app.fire('pause:pause', this.paused);
};

Pause.prototype.forceUnpauseGame = function(instant) {
    this.app.timeScale = 1;
    this.paused = false;
    if (!instant) {
        this.app.fire('pause:pause', this.paused);
    }
};

// Got this from: https://stereologics.wordpress.com/2015/04/02/about-page-visibility-api-hidden-visibilitychange-visibilitystate/
// 
Pause.prototype.handleVisibilityChange = function() {
    // if(typeof forcedFlag === "boolean") {
    //     if(isHidden) {
    //         console.log("ON VISIBILITYCHANGE with isHidden");
    //         this.onHidden();
    //     } else {
    //         console.log("ON VISIBILITYCHANGE without isHidden");
    //         this.onVisible();
    //     }
    // } else {
    //     if(document.hidden) { 
    //         this.onHidden();
    //     } else {
    //         this.onVisible();
    //     }
    // 
    this.onHidden();

};

Pause.prototype.onVisible = function() {
    var currentScene = pc.sceneManager.getActiveScene().toUpperCase();

    switch (currentScene) {
        case 'HOMESCENE':
            this.forceUnpauseGame(true);
            break;
        case 'GAMESCENE':
            break;
    }
};

///
// Will set the game on pause when the screen isnt visible for the player
///
Pause.prototype.onHidden = function() {
    var currentScene = pc.sceneManager.getActiveScene().toUpperCase();

    switch (currentScene) {
        case 'HOMESCENE':
            break;
        case 'GAMESCENE':
            if (this.paused) {
                break;
            }

            if (pc.gameManager.tutorial) {
                return;
            }

            this.app.fire('UI:clicked');
            this.app.fire('PauseButton:onPause');
            this.app.fire('PauseButton:showPauseScreen');
            break;
    }
};