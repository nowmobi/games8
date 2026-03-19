var SaveMeManager = pc.createScript('saveMeManager');

var countdown = 5;

SaveMeManager.attributes.add('saveMeUI', {
    type: 'entity',
    title: 'Save Me UI'
});

SaveMeManager.attributes.add('scoreEndFlow', {
    type: 'entity',
    title: 'Score End Flow'
});

SaveMeManager.attributes.add('uiInGame', {
    type: 'entity',
    title: 'UI In Game'
});

SaveMeManager.attributes.add('saveMeVideo', {
    type: 'entity',
    title: 'Save Me Video'
});

SaveMeManager.attributes.add('saveMeCoins', {
    type: 'entity',
    title: 'Save Me Coins'
});

SaveMeManager.attributes.add('saveMeGem', {
    type: 'entity',
    title: 'Save Me Gem'
});

SaveMeManager.attributes.add('saveMeOOT', {
    type: 'entity',
    title: 'Save Me Gem (No tickets)'
});


SaveMeManager.attributes.add('yellowCard', {
    type: 'entity',
    title: 'Yellow Card'
});

SaveMeManager.attributes.add('label', {
    type: 'entity',
    title: 'Label'
});

SaveMeManager.attributes.add('sceneId', {
    type: 'string',
    title: 'Scene Id'
});

SaveMeManager.attributes.add('gemsRequiredLabel', {
    type: 'entity',
    title: 'Gems Required Label'
});

SaveMeManager.attributes.add('coinsRequiredLabel', {
    type: 'entity',
    title: 'Coins Required Label'
});

SaveMeManager.attributes.add('gemsRequiredLabelBg', {
    type: 'entity',
    title: 'Gems Required Label BG'
});

SaveMeManager.attributes.add('gemsRequiredNoTicketLabel', {
    type: 'entity',
    title: 'Gems Required Label'
});


SaveMeManager.attributes.add('flashDeath', {
    type: 'entity',
    title: 'Flash Death'
});

SaveMeManager.attributes.add('saveMeStreet', {
    type: 'entity',
    title: 'saveMeStreet'
});

SaveMeManager.attributes.add('showAd', {
    type: 'boolean',
    default: false
});

// initialize code called once per entity
SaveMeManager.prototype.postInitialize = function() {

    pc.saveMeManager = this;

    this.saveMeState = {
        DEFAULT: 'default',
        ACTIVATED: 'activated',
        AD: 'ad',
        POSTSCREEN: 'postScreen',
    };

    this.currentCountdownTime = countdown;
    this.currentState = this.changeState(this.saveMeState.DEFAULT);

    this.saveMeUI.enabled = false;
    this.scoreEndFlow.enabled = false;
    this.oldTime = 0;
    this.pauseTimer = false;
    this.cachedGemsRequired = 0;

    this.app.on('gameManager:gameOver', this.activateSaveMe, this);
    this.app.on('saveMe:continue', this.continue, this);
    this.app.on('gameManager:updateGemsRequired', this.updateGemsRequiredText, this);
    this.app.on('saveMeManager:pauseTimer', this.setPauseTimer, this);
    this.app.on('gameManager:gameStart', this.resetState, this);
    this.app.on('saveMe:wildClick', this.decreaseTimer, this);
    this.withAds = false;
    this.positionOffset = 88;

    /*    this.on('destroy', function() {
        this.app.off('gameManager:gameOver');
        this.app.off('saveMe:continue');
        this.app.off('gameManager:updateGemsRequired');
        this.app.off('saveMeManager:pauseTimer');
        this.app.off('gameManager:gameStart');
    });*/

    this.inGameManager = this.app.root.findByTag('DontDestroy')[0].script.gameManager;

    if (!!!this.inGameManager) {
        console.error('SAVEME_MANAGER: ERROR - Could not locate GameManager script');
    }

    this.setSaveMeButtons();
};


// Managed by SceneManager - Set Object to its initialize state
SaveMeManager.prototype.resetState = function() {
    this.currentCountdownTime = countdown;

    // Manual, dont want to fire event
    this.currentState = this.saveMeState.DEFAULT;
    this.saveMeUI.enabled = false;
    this.scoreEndFlow.enabled = false;
    this.uiInGame.enabled = true;
    this.flashDeath.enabled = false;
    this.hasPausedBefore = false;

    this.oldTime = 0;
    this.pauseTimer = false;

    //this.saveMeVideo.enabled = pc.facebook.supportRewardedVideoAPI();
};

SaveMeManager.prototype.update = function(dt) {
    if ((this.currentState === this.saveMeState.ACTIVATED) && !this.pauseTimer) {
        this.app.fire('PauseScreenManager:forceHide');
        this.unscaledDt = (this.app._time - this.oldTime) / 1000;
        this.currentCountdownTime -= this.unscaledDt / 1.08;
        this.label.script.textLocalization.setText(Math.trunc(this.currentCountdownTime));
        this.yellowCard.setLocalScale(1, this.currentCountdownTime / countdown, 1);
        if (this.currentCountdownTime <= 0) {
            this.showInterstitialAd();
        }
    }

    this.oldTime = this.app._time;
};

SaveMeManager.prototype.activateSaveMe = function() {
    this.changeState(this.saveMeState.ACTIVATED);
};

SaveMeManager.prototype.showInterstitialAd = function() {
    if (this.showAd) {

        this.changeState(this.saveMeState.AD);

        pc.wrapper.showInterstitialAd(function() {
            this.changeState(this.saveMeState.POSTSCREEN);
        }, this);
    } else {
        this.changeState(this.saveMeState.POSTSCREEN);
    }
};

SaveMeManager.prototype.continue = function() {
    this.changeState(this.saveMeState.DEFAULT);
};

SaveMeManager.prototype.changeState = function(state) {
    this.currentState = state;
    switch (this.currentState) {
        case this.saveMeState.ACTIVATED:
            this.setSaveMeValues();
            this.checkOutOfTickets();
            this.setSaveMeButtons();
            pc.playerScript.isEnabled = false;
            break;
        case this.saveMeState.DEFAULT:
            this.setDefaultValues();
            pc.playerScript.isEnabled = true;
            break;
        case this.saveMeState.POSTSCREEN:
            this.inGameManager.endGame();
            this.setPostScreenValues();
    }
};

SaveMeManager.prototype.setSaveMeValues = function() {
    this.saveMeUI.enabled = true;
    this.uiInGame.enabled = false;
    this.oldTime = this.app._time;
    this.currentCountdownTime = countdown;
    this.flashDeath.enabled = true;
    this.saveMeStreet.enabled = true;

    pc.gameCamera.setCameraSaveMe(true);
};

SaveMeManager.prototype.setDefaultValues = function() {

    this.saveMeUI.enabled = false;
    this.uiInGame.enabled = true;
    this.flashDeath.enabled = false;
    this.saveMeStreet.enabled = false;
    this.hasPausedBefore = false;

    pc.gameCamera.setCameraSaveMe(false);
    this.app.fire('saveMeManager:continue');
};

SaveMeManager.prototype.setSaveMeButtons = function() {
    if (!pc.wrapper.hasRewardedAd()) {
        this.saveMeVideo.enabled = false;
        return;
    }

    if (pc.gameManager.isAbleToWatchAds() && !this.withAds) {
        // this.saveMeVideo.translateLocal(this.positionOffset, 0, 0);
        // this.saveMeGem.translateLocal(this.positionOffset, 0, 0);
        // this.saveMeOOT.translateLocal(this.positionOffset, 0, 0);

        this.saveMeVideo.enabled = true;
        this.withAds = true;
    } else if (!pc.gameManager.isAbleToWatchAds() && this.withAds) {
        // this.saveMeVideo.translateLocal(-this.positionOffset, 0, 0);
        // this.saveMeGem.translateLocal(-this.positionOffset, 0, 0);
        // this.saveMeOOT.translateLocal(-this.positionOffset, 0, 0);

        this.saveMeVideo.enabled = false;
        this.withAds = false;
    }
};

///
// Checks if ticket button is available. Will show out of tickets if there aren't enough tickets to save the player.
///
SaveMeManager.prototype.checkOutOfTickets = function() {
    var canBeSavedGems = pc.player.isBuyableGems(this.cachedGemsRequired);
    var canBeSavedCoins = pc.player.isBuyableCoin(this.cachedCoinsRequired);

    console.log(canBeSavedCoins, this.cachedCoinsRequired)

    if (canBeSavedGems) {
        this.saveMeGem.enabled = true;
        this.saveMeCoins.enabled = false;
        this.saveMeOOT.enabled = false;
    } else if (canBeSavedCoins) {
        this.saveMeGem.enabled = false;
        this.saveMeCoins.enabled = true;
        this.saveMeOOT.enabled = false;
    } else {
        this.saveMeGem.enabled = false;
        this.saveMeCoins.enabled = false;
        this.saveMeOOT.enabled = true;
    }
};

SaveMeManager.prototype.setPostScreenValues = function() {
    this.scoreEndFlow.enabled = true;
    this.saveMeUI.enabled = false;
    this.app.fire('pause:forcePause');
    this.app.fire('saveMeManager:postScreen');
};

SaveMeManager.prototype.updateGemsRequiredText = function(gems, coins) {
    this.gemsRequiredLabel.script.text.setText(gems);
    this.gemsRequiredNoTicketLabel.script.text.setText(gems);
    this.coinsRequiredLabel.script.text.setText(coins);
    this.gemsRequiredLabelBg.script.text.setText(gems);
    this.cachedGemsRequired = gems;
    console.log(gems, coins)
    this.cachedCoinsRequired = coins;
};

SaveMeManager.prototype.decreaseTimer = function() {
    this.currentCountdownTime -= 0.65;

    this.currentCountdownTime = pc.math.clamp(this.currentCountdownTime, 0, Number.POSITIVE_INFINITY);
};

SaveMeManager.prototype.setPauseTimer = function(value) {
    this.pauseTimer = value;

    if (!value && !this.hasPausedBefore) {
        this.currentCountdownTime = countdown;
        this.hasPausedBefore = true;
    }
};