var DailyChallengeCollectedLetters = pc.createScript('dailyChallengeCollectedLetters');

// initialize code called once per entity
DailyChallengeCollectedLetters.prototype.initialize = function() {
    this.textBack = this.entity.children[0];
    this.textFront = this.entity.children[1];

    this.app.on('dailyChallenge:updateLetters', this.setText, this);

    this.on('state', function() {
        this.setText();
    });

    this.setText();
};

DailyChallengeCollectedLetters.prototype.centerTexts = function() {
    this.textBack.setLocalPosition(-this.textBack.element.width / 2, 0, 0);
    this.textFront.setLocalPosition(-this.textBack.element.width / 2, 0, 0);
};

DailyChallengeCollectedLetters.prototype.setText = function() {
    this.textBack.element.text = pc.dailyChallengeManager.getWord();
    this.textFront.element.text = pc.dailyChallengeManager.getCollectedLetters();
    this.centerTexts();
};