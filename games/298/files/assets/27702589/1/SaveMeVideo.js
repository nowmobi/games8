var SaveMevideo = pc.createScript('saveMevideo');

SaveMevideo.attributes.add('failPopUp', {
    type: 'entity',
    title: 'Fail Pop Up',
});

// initialize code called once per entity
SaveMevideo.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

// When we press the element assign the active texture
SaveMevideo.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    if (pc.saveMeManager.currentState !== pc.saveMeManager.saveMeState.ACTIVATED) {
        return;
    }

    this.app.fire('saveMeManager:pauseTimer', true);
    this.app.fire('loadingScreen:enabled', true);
    pc.wrapper.showRewardedAd(this.showPopUp, this);
};

SaveMevideo.prototype.afterVideoWatched = function(message) {
    this.app.fire('saveMeManager:pauseTimer', false);
    this.app.fire('loadingScreen:enabled', false);

    this.app.fire('saveMe:continue');

    setTimeout(function() {
        pc.inputManager.inputEnd(true);
    }.bind(pc.inputManager));
    pc.gameManager.saveMeAdsWatched();

    if (message !== undefined) {
        this.app.fire('debug', message);
    }
};

SaveMevideo.prototype.showPopUp = function(message, error) {
    // this.overlay.enabled = false;
    console.log(message);
    if (error) {
        // this.afterVideoWatched();
        // TODO: fire fail pop up and able to contiue game even if add failed (needed in debug etc);
        console.log(error);
        this.app.fire('popUp:addPopUp', this.failPopUp);
        return;
    }

    this.afterVideoWatched();
};