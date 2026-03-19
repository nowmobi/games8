var InGameUimanager = pc.createScript('inGameUimanager');

InGameUimanager.attributes.add('pauseContainer', {
    type: 'entity',
    title: 'Pause Container'
});

InGameUimanager.attributes.add('coinCotainer', {
    type: 'entity',
    title: 'Coin Container'
});

InGameUimanager.attributes.add('yellowCardContainer', {
    type: 'entity',
    title: 'Yellow Card Container'
});

InGameUimanager.attributes.add('scoreContainer', {
    type: 'entity',
    title: 'Score Container'
});

InGameUimanager.attributes.add('challengeTimer', {
    type: 'entity',
    title: 'Challenge Timer'
});

InGameUimanager.attributes.add('challengeLeftInfo', {
    type: 'entity',
    title: 'Challenge Left Info'
});

InGameUimanager.attributes.add('challengeRightInfo', {
    type: 'entity',
    title: 'Challenge Right Info'
});

InGameUimanager.attributes.add('leftScoreText', {
    type: 'entity',
    title: 'Left Score Text'
});

// InGameUimanager.attributes.add('rightScoreText', {
//     type: 'entity',
//     title: 'Right Score Text'
// });

InGameUimanager.attributes.add('endGameChallengeText', {
    type: 'entity',
    title: 'End Game Challenge Text'
});

InGameUimanager.attributes.add('endGameChallengeScore', {
    type: 'entity',
    title: 'End Game Challenge Score'
});

InGameUimanager.attributes.add('dailyChallengeElement', {
    type: 'entity',
    title: 'daily Challenge In-Game Popup'
});

// initialize code called once per entity
InGameUimanager.prototype.initialize = function() {

    this.nonChallengeEntities = [];
    this.nonChallengeEntities.push(this.pauseContainer, this.coinCotainer, this.scoreContainer);

    this.ownScoreText = this.leftScoreText.script.textLocalization;
    this.ownScoreTween = this.leftScoreText.script.tweenScale;


    this.app.on('gameManager:gameStart', this.onStartGame, this);
    this.app.on('sceneManager:resetGameState', this.onStartGame, this);
    this.app.on('scoreManager:updateScoreCounter', this.updateOwnScoreCounter, this);

};

InGameUimanager.prototype.onStartGame = function() {

    if (!pc.dailyChallengeManager.collectedRewardToday && !pc.gameManager.isInChallengeMode()) {
        this.dailyChallengeElement.script.tweenPosition.startOnEnable = true;
    }
    return;
    if (pc.gameManager.isInChallengeMode()) {
        // for(var i = 0; i < this.challengeEntities.length; i += 1) {
        //     this.challengeEntities[i].enabled = true;
        // }
        for (var j = 0; j < this.nonChallengeEntities.length; j += 1) {
            this.nonChallengeEntities[j].enabled = false;
        }
        if (pc.gameManager.isChallenging) {
            this.endGameChallengeScore.enabled = false;
        }

        this.endGameChallengeText.enabled = true;
        //this.endGameChallengeScore.enabled = false;

    } else {

        for (var i = 0; i < this.challengeEntities.length; i += 1) {
            this.challengeEntities[i].enabled = false;
        }
        for (var j = 0; j < this.nonChallengeEntities.length; j += 1) {
            this.nonChallengeEntities[j].enabled = true;
        }

        this.endGameChallengeText.enabled = false;
        this.endGameChallengeScore.enabled = false;
    }
};

InGameUimanager.prototype.updateOwnScoreCounter = function(value) {
    this.ownScoreText.setText((value + pc.player.coins).toString());
    this.ownScoreTween.startTween();
};

InGameUimanager.prototype.updateEnemyScoreCounter = function(value) {
    this.enemyScoreText.setText(value.toString());
    this.enemyScoreTween.startTween();
};

InGameUimanager.prototype.setEndText = function(myScore, enemyScore) {
    this.endGameChallengeScore.enabled = true;
    this.endGameChallengeScore.script.text.setText(myScore + " - " + enemyScore);
};