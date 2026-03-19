var ScoreManager = pc.createScript('scoreManager');

var TARGET_MULTIPLIER_LIMIT = 10;
var INIT_TARGET_MULTIPLIER = 1;
var INIT_TARGET_MULTIPLIER_COUNT = 0;

// Hey Kangsi! Is this the new targetManager?
// I moved all the targetMultiplier Powerup code to here,
// with the exception of timers and audio events
// i left it there for powerup consistency, move at will if needed

// initialize code called once per entity
ScoreManager.prototype.initialize = function() {
    this.targetCounter = 0;
    this.targetMultiplier = INIT_TARGET_MULTIPLIER;
    this.targetMultiplierCounter = INIT_TARGET_MULTIPLIER_COUNT;
    this.targetPowMultiplier = 1;

    this.scoreList = [];

    pc.scoreManager = this;

    this.app.on("player:collision", this.resetTargetMultiplier, this);
    this.app.on('target:collision', this.applyTargetHit, this);
    this.app.on('gameManager:gameStart', this.resetState, this);
    this.app.on('gameManager:doubleTargetState', this.applyTargetPowerup, this);

    /*    this.on('destroy', function() {
            this.app.off("player:collision");
            this.app.off('target:collision');
            this.app.off('gameManager:gameStart');
            this.app.off('doubleTarget:collision');
        });*/
};

ScoreManager.prototype.getMultiplier = function() {
    return this.targetMultiplier * this.targetPowMultiplier;
};

// Managed by SceneManager - Set Object to its initialize state
ScoreManager.prototype.resetState = function() {
    this.targetCounter = 0;
    this.targetMultiplier = INIT_TARGET_MULTIPLIER;
    this.targetMultiplierCounter = INIT_TARGET_MULTIPLIER_COUNT;
    this.targetPowMultiplier = 1;
    this.scoreList.length = 0;

    this.app.fire('scoreManager:updateScoreDisplay', this.getMultiplier(), this.targetMultiplierCounter);
    this.app.fire('scoreManager:updateScoreCounter', this.targetCounter);
};

/* ----------------------------------------------------------------------------------------------------------------------
 * TARGET MULTIPLIER
 * ---------------------------------------------------------------------------------------------------------------------- */

ScoreManager.prototype.applyTargetHit = function(value) {
    this.applyTargetMultiplierCounter();
    this.addTargetCounter(value);
    this.app.fire('scoreManager:updateScoreDisplay', this.getMultiplier(), this.targetMultiplierCounter);
    this.app.fire('scoreManager:updateScoreCounter', this.targetCounter);
};

ScoreManager.prototype.addTargetCounter = function(value) {
    this.targetCounter += value * this.getMultiplier();
    //this.addScoreTimestampData();
};

ScoreManager.prototype.applyTargetMultiplierCounter = function() {
    this.targetMultiplierCounter += 1;

    if (this.targetMultiplierCounter >= TARGET_MULTIPLIER_LIMIT) {
        this.targetMultiplierCounter = 0;
        this.targetMultiplier += 1;
        this.app.fire('scoreManager:multGain');
    }
};

ScoreManager.prototype.resetTargetMultiplier = function() {
    if (this.targetMultiplier > INIT_TARGET_MULTIPLIER) {
        this.app.fire('scoreManager:multReset');
    }

    this.targetMultiplier = INIT_TARGET_MULTIPLIER;
    this.targetMultiplierCounter = INIT_TARGET_MULTIPLIER_COUNT;
    this.app.fire('scoreManager:updateScoreDisplay', this.getMultiplier(), this.targetMultiplierCounter);
};

ScoreManager.prototype.applyTargetPowerup = function(value) {
    console.log("SCORE_MAN: PowPicked " + value);

    if (value) {
        this.targetPowMultiplier = 2;
        this.app.fire('scoreManager:multGain');
    } else {
        this.targetPowMultiplier = 1;
    }
    this.app.fire('scoreManager:updateScoreDisplay', this.getMultiplier(), this.targetMultiplierCounter);
};