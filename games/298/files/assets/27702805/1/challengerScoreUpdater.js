var ChallengerScoreUpdater = pc.createScript('challengerScoreUpdater');

// initialize code called once per entity
ChallengerScoreUpdater.prototype.initialize = function() {
    this.textScript = this.entity.script.textLocalization;

    this.scoreList = pc.challengeGameManager.challengeScoreData;
    this.step = 0;

    this.app.on('sceneManager:resetGameState', this.resetState, this);

    /*    this.on('destroy', function() {
            this.app.off('sceneManager:resetGameState');
        });*/
};

ChallengerScoreUpdater.prototype.resetState = function() {
    this.step = 0;
    this.scoreList = pc.challengeGameManager.challengeScoreData;
    this.textScript.setText(0);
};

// update code called every frame
ChallengerScoreUpdater.prototype.update = function(dt) {
    if (this.step >= this.scoreList.length) {
        return;
    }

    if (pc.challengeGameManager.currentTimer >= this.scoreList[this.step].t) {
        this.textScript.setText(this.scoreList[this.step].s);
        this.step += 1;
    }
};