var DailyChallengeScreen = pc.createScript('dailyChallengeScreen');

DailyChallengeScreen.attributes.add('prizes', {
    type: 'entity',
    title: 'Prizes',
});

DailyChallengeScreen.attributes.add('completedPopUp', {
    type: 'entity',
    title: 'PopUp',
});

DailyChallengeScreen.attributes.add('challengeLetters', {
    type: 'entity',
    title: 'lettersText',
});

pc.extend(DailyChallengeScreen.prototype, {

    initialize: function() {

        pc.dailyChallengeScreen = this;

        this.on("state", function(enabled) {
            if (enabled) {
                this.app.fire('dailyChallenge:updateLetters');
                this.changePricesCollected();
                this.checkReward();
            } else {
                if (this._currentPopUpScreen) {
                    this.app.fire('popUp:addPopUp', this._currentPopUpScreen);
                    this._currentPopUpScreen = null;
                }
            }
        });

        this.changePricesCollected();
        this.checkReward();
    },

    changePricesCollected: function() {
        for (var i = 0; i < this.prizes.children.length; i += 1) {
            if (pc.dailyChallengeManager.getStreak() > i) {
                this.prizes.children[i].findByName('Medal').enabled = true;
                this.prizes.children[i].findByName('BackgroundCompleted').enabled = false;
                this.prizes.children[i].findByName('Title').enabled = false;
            } else if (pc.dailyChallengeManager.getStreak() === i) {
                this.prizes.children[i].findByName('Medal').enabled = false;
                this.prizes.children[i].findByName('BackgroundCompleted').enabled = true;
                this.prizes.children[i].findByName('Title').script.textLocalization.setKey(pc.dailyChallengeManager.isToday() ? 'Today' : 'Tomorrow');
            } else {
                this.prizes.children[i].findByName('Medal').enabled = false;
                this.prizes.children[i].findByName('BackgroundCompleted').enabled = false;
                if ((i < this.prizes.children.length - 1) && pc.dailyChallengeManager.getStreak() + 1 > i) {
                    if (!pc.dailyChallengeManager.collectedRewardToday) {
                        // console.log(i, pc.dailyChallengeManager.lastDayCompleted);
                        this.prizes.children[i].findByName('BackgroundCompleted').enabled = true;
                    }
                }
            }
        }
    },

    togglePopUp: function() {

        if (this.completedPopUp.enabled) {

            this.completedPopUp.enabled = false;
            this.app.fire('button:closeButton');

        } else {

            // Update popup elements
            var streak = Math.max(pc.dailyChallengeManager.getStreak() - 1, 0);
            this.completedPopUp.findByName('PriceImage').element.sprite = this.prizes.children[streak].findByName('PriceImage').element.sprite;
            this.completedPopUp.findByName('PriceAmount').element.text = this.prizes.children[streak].findByName('Number').element.text;

            this.completedPopUp.enabled = true;
            this._currentPopUpScreen = pc.homescreenManager.currentPopUpScreen;
        }
    },

    getReward: function() {

        var streak = Math.max(pc.dailyChallengeManager.getStreak() - 1, 0);
        pc.player.getCoins(Number(this.prizes.children[streak].findByName('Number').element.text));
    },

    checkReward: function() {

        if (pc.dailyChallengeManager.isWordComplete() && !pc.dailyChallengeManager.collectedRewardToday) {
            this.doPrizeAnimation();
        } else {
            //this.setCollectedLetters();
        }
    },

    //     setCollectedLetters: function() {
    //         var word = pc.dailyChallengeManager.getWord();
    //         var letters = pc.dailyChallengeManager.getCollectedLetters();
    //         var width = 0;

    //         for(var i = 0; i < this.challengeLetters.children.length; i += 1) {

    //             var textBack = this.challengeLetters.children[i].children[0];
    //             var textFront = this.challengeLetters.children[i].children[1];

    //             // Create child entities
    //             // Get actual width of letter
    //             // Get element width
    //             // Reposition stuff
    //             // Animate

    //             if(i > (word.length - 1)) { this.challengeLetters.children[i].enabled = false; }
    //             else {
    //                 textBack.element.text = word.charAt(i);
    //                 if(letters.length > (i - 1)) textFront.element.text = word.charAt(i);
    //                 else textFront.element.text = '';
    //             }

    //             textBack.translate((6-word.length) * 64 / pc.app.graphicsDevice.width, 0, 0);
    //             textFront.translate((6-word.length) * 64 / pc.app.graphicsDevice.height, 0, 0);

    //         }

    //         this.challengeLetters.setPosition(word.length * 20, this.challengeLetters.getPosition().y, this.challengeLetters.getPosition().z);
    //     },

    doPrizeAnimation: function() {
        console.warn('doPrizeAnimation')
        this.togglePopUp();
    }
});