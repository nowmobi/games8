var GameManager = pc.createScript('gameManager');

/* ----------------------------------------------------------------------------------------------------------------------
 * INITIALE VALUES
 * ---------------------------------------------------------------------------------------------------------------------- */

var TARGET_MULTIPLIER_LIMIT = 10;
var INIT_TARGET_MULTIPLIER = 1;
var INIT_TARGET_MULTIPLIER_COUNT = 0;

var INIT_COIN_MULTIPLIER = 1;

var INIT_MAGNET_SECONDS = 20;
var INIT_DOUBLETARGET_SECONDS = 20;
var INIT_DOUBLECOIN_SECONDS = 20;
var INIT_SHIELD_SECONDS = 20;

/* ----------------------------------------------------------------------------------------------------------------------
 * ATTRIBUTES
 * ---------------------------------------------------------------------------------------------------------------------- */

GameManager.attributes.add('speedCurve', {
    type: 'curve',
    title: 'Speed curve'
});

GameManager.attributes.add('maxSpeedDuration', {
    type: 'number',
    default: 120,
    title: 'Maximal speed duration'
});

GameManager.attributes.add('slowMotionCurve', {
    type: 'curve',
    default: 120,
    title: 'Slow Motion Curve'
});

GameManager.attributes.add('slowMotionDuration', {
    type: 'number',
    default: 1,
    title: 'Slow Motion Duration'
});

GameManager.attributes.add('debugSpeed', {
    type: 'number',
    default: 0.2,
    title: 'Slow Motion Duration'
});

/* ----------------------------------------------------------------------------------------------------------------------
 * INITIALIZE
 * ---------------------------------------------------------------------------------------------------------------------- */
GameManager.prototype.initialize = function() {
    this.penaltyState = {
        NOTHING: 0,
        YELLOWCARD: 1,
        REDCARD: 2,
    };

    this.currentPenalty = this.penaltyState.NOTHING;

    this.time = 0;
    this.speed = this.speedCurve.value(0);
    this.playerFrameSpeed = 0;

    this.slowMotionTimer = 0.1;
    this.isPaused = false;

    this.coinCointer = 0;
    this.coinMultiplier = INIT_COIN_MULTIPLIER;

    this.targetCounter = 0;
    this.targetMultiplier = INIT_TARGET_MULTIPLIER;
    this.targetMultiplierCounter = INIT_TARGET_MULTIPLIER_COUNT;

    this.deltaSinceMagnet = -1;
    this.deltaSinceDoubleTarget = -1;
    this.deltaSinceDoubleCoin = -1;
    this.deltaSinceShield = -1;

    this.gemLevel = 0;
    this.gemPowerBase = 2;
    this.calculateGemsRequired();
    this.calculateCoinsRequired();

    this.isChallenged = false;
    this.isChallenging = false;

    this.expGained = 0;

    this.maxAdsPerSession = 2;
    this.currentAdsWatchedPerSession = 0;

    this.laneZValues = {
        LEFT: 3,
        MIDDLE: 0,
        RIGHT: -3,
    };
    //this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

    this.enablePowerups = false;
    this.tutorial = false;

    //  Data to use for the chatbot. (SetSessionData)
    //-------------------------------------------------------------------------------------
    this.friendBelowPlayer = [];
    this.friendAbovePlayer = [];
    this.friendsBeatenThisSession = [];

    var self = this;
    // this.app.on('fb:instant:start', function() {
    //     pc.facebook.getConnectedPlayerEntries(self.setFriendLeaderboardAtStart, self);
    // });

    //-------------------------------------------------------------------------------------
    pc.gameManager = this;

    this.app.on('magnet:collision', this.collectMagnet, this);
    this.app.on('invincible:collision', this.collectShield, this);
    this.app.on('doubleTarget:collision', this.collectDoubleTarget, this);
    this.app.on('doubleCoin:collision', this.collectDoubleCoin, this);

    this.app.on('target:collision', this.applyTargetHit, this);
    this.app.on('player:collision', this.applyPenalty, this);
    this.app.on('ball:target', this.applyTargetHit, this);
    this.app.on('pause:pause', this.doSlowMotion, this);
    this.app.on('saveMeManager:continue', this.resetPenalty, this);
    this.app.on('saveMeGem:continue', this.addGemLevel, this);
    this.app.on('gameManager:gameStart', this.resetState, this);
    this.app.on('laneBuilder:laneRemoved', this.addExp, this);
    this.app.on('target:collision', this.addExp, this);

    /*    this.on('destroy', function() {
            this.app.off('target:collision');
            this.app.off('magnet:collision');
            this.app.off('player:collision');
            this.app.off('ball:target');
            this.app.off('pause:pause');
            this.app.off('saveMeManager:continue');   
            this.app.off('saveMeGem');
            this.app.off('gameManager:gameStart');
            this.app.off('invincible:collision');
            this.app.off('doubleTarget:collision');
            this.app.off('doubleCoin:collision');

        }, this);
        */
    this.gameHasStarted = false;
};


GameManager.prototype.startGame = function() {
    this.gameHasStarted = true;
    //var challengeTrackList = pc.challengeGameManager.challengeTrackList;

    //     pc.facebook.sendEvent('onStartRound');
    //     if (challengeTrackList !== '') {
    //         pc.routeBuilder.setTrackModeReceive(); //or receiving end?
    //     } else {
    //         pc.routeBuilder.setTrackModeCreate(); //or receiving end?
    //         // pc.routeBuilder.createTrack();
    //     }
    //     // pc.routeBuilder.createTrack(challengeTrackList, this.sendEventGameStart, this);
    //     // Dont fire gamestart before is send/receive is done!

    this.app.fire('gameManager:gameStart');
    this.app.fire('Audio:GameStart');
};

GameManager.prototype.sendEventGameStart = function() {
    this.app.fire('gameManager:gameStart');
    this.app.fire('Audio:GameStart');
};

GameManager.prototype.endGame = function() {
    this.gameHasStarted = false;
    this.app.fire('gameManager:gameEnd');
    pc.gameManager.disableChallengeMode();
};

// Managed by SceneManager - Set Object to its initialize state
GameManager.prototype.resetState = function() {
    this.currentPenalty = this.penaltyState.NOTHING;

    this.time = 0;
    this.speed = this.speedCurve.value(0);
    this.playerFrameSpeed = 0;
    this.slowMotionTimer = 0.1;
    this.isPaused = false;

    this.coinCointer = 0;
    this.coinMultiplier = INIT_COIN_MULTIPLIER;

    this.targetCounter = 0;
    this.targetMultiplier = INIT_TARGET_MULTIPLIER;
    this.targetMultiplierCounter = INIT_TARGET_MULTIPLIER_COUNT;

    this.currentPenalty = this.penaltyState.NOTHING;

    this.expGained = 0;

    this.gemLevel = 0;
    this.gemPowerBase = 2;
    this.calculateGemsRequired();
    this.calculateCoinsRequired();
    this.fireGemsRequired();

    this.currentAdsWatchedPerSession = 0;

    this.app.fire('gameManager:updateCoinContainer', this.coinCointer);
};

GameManager.prototype.getLaneLevel = function() {
    if (this.time > 60) {
        return 2;
    } else if (this.time > 20) {
        return 1;
    } else if (this.isInChallengeMode()) {
        return 1;
    }
    return 0;
};

/* ----------------------------------------------------------------------------------------------------------------------
 * UPDATE
 * ---------------------------------------------------------------------------------------------------------------------- */

// update code called every frame
GameManager.prototype.update = function(dt) {
    if (!this.gameHasStarted) {
        return;
    }
    this.updateSlowMotion(dt);
    this.updateGameSpeed(dt);
    this.updatePowerups(dt);
};

GameManager.prototype.updateGameSpeed = function(dt) {

    if (this.isInTutorialMode()) {
        return;
    }

    this.time += dt;
    this.speed = this.speedCurve.value(this.time / this.maxSpeedDuration) * this.debugSpeed;
};

GameManager.prototype.updateSlowMotion = function(dt) {
    if (this.isPaused) {
        return;
    }

    this.slowMotionTimer += dt;
    this.app.timeScale = this.slowMotionCurve.value(this.slowMotionTimer);
};


GameManager.prototype.updatePowerups = function(dt) {

    if (this.deltaSinceMagnet >= 0) {

        this.deltaSinceMagnet += dt;

        if (this.deltaSinceMagnet > INIT_MAGNET_SECONDS) {
            this.deltaSinceMagnet = -1;
            this.app.fire('gameManager:magnetState', false);
        }
    }

    if (this.deltaSinceDoubleCoin >= 0) {

        this.deltaSinceDoubleCoin += dt;

        if (this.deltaSinceDoubleCoin > INIT_DOUBLECOIN_SECONDS) {
            this.deltaSinceDoubleCoin = -1;
            this.coinMultiplier = INIT_COIN_MULTIPLIER;
            this.app.fire('gameManager:doubleCoinState', false);
        }
    }

    if (this.deltaSinceDoubleTarget >= 0) {

        this.deltaSinceDoubleTarget += dt;

        if (this.deltaSinceDoubleTarget > INIT_DOUBLETARGET_SECONDS) {
            this.deltaSinceDoubleTarget = -1;
            this.app.fire('gameManager:doubleTargetState', false);
        }
    }

    if (this.deltaSinceShield >= 0) {

        this.deltaSinceShield += dt;

        if (this.deltaSinceShield > INIT_SHIELD_SECONDS) {
            this.deltaSinceShield = -1;
            this.app.fire('gameManager:shieldState', false);
        }
    }

};

/* ----------------------------------------------------------------------------------------------------------------------
 * PENALTY
 * ---------------------------------------------------------------------------------------------------------------------- */

GameManager.prototype.applyPenalty = function(value) {
    if (this.isInTutorialMode()) {
        this.app.fire('gameManager:revivePlayer');
        return;
    }

    this.addPenalty(value);
    // this.resetTargetMultiplier();
    this.checkIfGameOver();
};

GameManager.prototype.addPenalty = function(value) {
    this.currentPenalty += value;
    if (this.currentPenalty === 1) {
        this.app.fire('gameManager:moveYellowCard');
    }
};

GameManager.prototype.checkIfGameOver = function() {
    if (this.currentPenalty >= this.penaltyState.REDCARD) {
        this.app.fire('player:setMagnetAttractor', false);
        this.app.fire('gameManager:gameOver');

        // ForceHide pausescreen to prevent bugs
        this.app.fire('PauseScreenManager:forceHide');


        // pc.facebook.sendEvent('onEndRound', this.time, {
        //     time_played: this.time,
        //     targets: this.targetCounter
        // });
        return;
    }

    if (this.currentPenalty === this.penaltyState.YELLOWCARD) {
        this.app.fire('gameManager:yellowCard');
    }
};

GameManager.prototype.resetPenalty = function() {
    this.currentPenalty = this.penaltyState.NOTHING;
};

// /* ----------------------------------------------------------------------------------------------------------------------
//  * TARGET MULTIPLIER
//  * ---------------------------------------------------------------------------------------------------------------------- */ 

// GameManager.prototype.applyTargetHit = function(value) {
//     console.log(value)
//     this.applyTargetMultiplierCounter();
//     this.addTargetCounter(value);
//     console.log(this.targetCounter)
//     this.app.fire('gameManager:updateScoreCounter', this.targetCounter * this.targetPowMultiplier);
// };

// GameManager.prototype.addTargetCounter = function(value) {
//     this.targetCounter += value * this.targetMultiplier;
// };

// GameManager.prototype.applyTargetMultiplierCounter = function() {
//     this.targetMultiplierCounter += 1;

//     if (this.targetMultiplierCounter >= TARGET_MULTIPLIER_LIMIT) {
//         this.targetMultiplierCounter = 0;
//         this.targetMultiplier += 1;
//     }
// };

// GameManager.prototype.resetTargetMultiplier = function() {
//     this.targetMultiplier = INIT_TARGET_MULTIPLIER;
//     this.targetMultiplierCounter = INIT_TARGET_MULTIPLIER_COUNT;
// };


/* ----------------------------------------------------------------------------------------------------------------------
 * ITEM PICKUPS
 * ---------------------------------------------------------------------------------------------------------------------- */
GameManager.prototype.collectCoin = function() {
    // Coin cant handle stacked multipliers. (doubleCoin directly sets the multiplier)
    this.coinCointer += this.coinMultiplier;
    this.app.fire('gameManager:updateCoinContainer', this.coinCointer);
};

GameManager.prototype.collectLoot = function() {
    this.coinCointer += this.coinMultiplier * 10;
    this.app.fire('gameManager:updateCoinContainer', this.coinCointer);
};

GameManager.prototype.collectMagnet = function() {
    this.deltaSinceMagnet = 0;
    this.app.fire('gameManager:magnetState', true);
};

GameManager.prototype.collectDoubleCoin = function() {
    this.deltaSinceDoubleCoin = 0;
    this.coinMultiplier = 2;
    this.app.fire('gameManager:doubleCoinState', true);
};

GameManager.prototype.collectDoubleTarget = function() {
    this.deltaSinceDoubleTarget = 0;
    this.app.fire('gameManager:doubleTargetState', true);
};

GameManager.prototype.collectShield = function() {
    this.deltaSinceShield = 0;
    this.app.fire('gameManager:shieldState', true);
};

/* ----------------------------------------------------------------------------------------------------------------------
 * SLOWMOTION
 * ---------------------------------------------------------------------------------------------------------------------- */

GameManager.prototype.doSlowMotion = function(value) {
    this.isPaused = value;
    this.slowMotionTimer = 0.1;
};

/* ----------------------------------------------------------------------------------------------------------------------
 * GEM
 * ---------------------------------------------------------------------------------------------------------------------- */

GameManager.prototype.addGemLevel = function() {
    this.gemLevel += 1;
    this.calculateGemsRequired();
    this.calculateCoinsRequired();
    this.fireGemsRequired();
};

GameManager.prototype.calculateGemsRequired = function() {
    this.gemsRequired = Math.pow(this.gemPowerBase, this.gemLevel);
};

GameManager.prototype.calculateCoinsRequired = function() {
    this.coinsRequired = Math.pow(this.gemPowerBase, this.gemLevel) * 100;
};

GameManager.prototype.fireGemsRequired = function() {
    this.app.fire('gameManager:updateGemsRequired', this.gemsRequired, this.coinsRequired);
};

GameManager.prototype.isInChallengeMode = function() {
    return (this.isChallenged || this.isChallenging);
};

GameManager.prototype.disableChallengeMode = function() {
    this.isChallenged = false;
    this.isChallenging = false;
};

GameManager.prototype.challengeFriend = function() {
    this.isChallenged = false;
    this.isChallenging = true;
};

/* ----------------------------------------------------------------------------------------------------------------------
 * GEM
 * ---------------------------------------------------------------------------------------------------------------------- */

GameManager.prototype.addExp = function(value) {
    this.expGained += value || 0;
};

GameManager.prototype.setTutorial = function() {
    this.tutorial = true;
    // TODO set window.
    this.app.fire('sceneManager:gotoGame');
};

GameManager.prototype.endTutorial = function() {
    this.tutorial = false;
    this.app.fire('gameManager:endTutorial');
};

GameManager.prototype.onKeyDown = function(event) {
    if (event.key === pc.KEY_T) {
        this.tutorial = true;
    }

    if (event.key === pc.KEY_SPACE) {
        if (this.debugSpeed === 0) {
            this.debugSpeed = 1;
        } else {
            this.debugSpeed = 0;
        }
    }
    this.speed = this.speedCurve.value(this.time / this.maxSpeedDuration) * this.debugSpeed;

    // When the space bar is pressed this scrolls the window.
    // Calling preventDefault() on the original browser event stops this.
    event.event.preventDefault();
};

GameManager.prototype.isInTutorialMode = function() {
    return this.tutorial && !this.isInChallengeMode();
};

GameManager.prototype.saveMeAdsWatched = function() {
    this.currentAdsWatchedPerSession += 1;
};

GameManager.prototype.isAbleToWatchAds = function() {
    return this.currentAdsWatchedPerSession < this.maxAdsPerSession;
};