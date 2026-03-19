var DailyChallengeCollectButton = pc.createScript('dailyChallengeCollectButton');

// initialize code called once per entity
DailyChallengeCollectButton.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
    this.on("state", function(enabled) {
        if (enabled) this.app.fire('Audio:UIMenuEnter');
    });
};

DailyChallengeCollectButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    pc.dailyChallengeScreen.getReward();
    pc.dailyChallengeManager.collectedRewardToday = true;
    pc.dailyChallengeScreen.changePricesCollected();
    pc.dailyChallengeScreen.togglePopUp();
    pc.dailyChallengeManager.setDataAsync();
    this.app.fire('Audio:UIConfirm');
};

// swap method called for script hot-reloading
// inherit your script state here
// DailyChallengeCollectButton.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/