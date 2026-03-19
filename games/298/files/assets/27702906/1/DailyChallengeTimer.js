var DailyChallengeTimer = pc.createScript('dailyChallengeTimer');

// initialize code called once per entity
DailyChallengeTimer.prototype.initialize = function() {
    this.app.on('dailyChallengeManager:updateTimer', this.setText, this);

    this.textScript = this.entity.script.textLocalization;
    this.setText(pc.dailyChallengeManager.timerInSeconds);

    this.on("state", function(enabled) {
        if (enabled) {
            this.setText(pc.dailyChallengeManager.timerInSeconds);
        }
    });

};

DailyChallengeTimer.prototype.setText = function(text) {
    if (!this.entity.enabled) {
        return;
    }

    this.textScript.setText(pc.util.secondsToTimer(text, true));
};