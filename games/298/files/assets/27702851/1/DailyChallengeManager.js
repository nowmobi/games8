var DailyChallengeManager = pc.createScript('dailyChallengeManager');

DailyChallengeManager.attributes.add('uiElement', {
    type: 'entity',
    title: 'Daily Challenge UI',
});

DailyChallengeManager.attributes.add('textBack', {
    type: 'entity',
    title: 'Back Text',
});

DailyChallengeManager.attributes.add('textFront', {
    type: 'entity',
    title: 'Front Text',
});
DailyChallengeManager.attributes.add('wordsJSON', {
    type: 'asset',
    assetType: 'json'
});


// initialize code called once per entity
DailyChallengeManager.prototype.initialize = function() {

    pc.dailyChallengeManager = this;
    this.lastDayCompleted = new Date('1995-12-17T03:24:00');
    this.newWordDate = new Date('1995-12-17T03:24:00');
    this.completedStreak = 0;
    this.dailyWord = '';
    this.nLetters = 0;
    this.timer = pc.dateManager.timeTillReset();
    this.timerInSeconds = 0;
    this.timerInSecondsTemp = 0;
    this.oldTime = 0;
    this.collectedRewardToday = false;
    this.letterInGame = false;
    this.started = false;
    this.resetSpawnChance();
    this.app.on('DateManager:.reset', this.reset, this)
    this.app.on('StorageManager:onLoadSaveData', this.setData, this);
    this.app.on('gameManager:gameStart', this.resetSpawnChance, this);
    this.app.on('saveMeManager:continue', this.increaseLuck, this);
};

// update code called every frame
DailyChallengeManager.prototype.update = function(dt) {
    if (!this.started) {
        return;
    }

    this.updateTimer();
    this.oldTime = this.app._time;
};


DailyChallengeManager.prototype.updateTimer = function() {
    if (this.timer <= 0) {
        this.reset();
        this.timer = pc.dateManager.timeTillReset();

        return;
    }

    this.timer = pc.dateManager.timeTillReset();

    this.timerInSecondsTemp = Math.trunc(this.timer / 1000);

    if (this.timerInSeconds === this.timerInSecondsTemp) {
        return;
    }

    this.timerInSeconds = this.timerInSecondsTemp;
    this.app.fire('dailyChallengeManager:updateTimer', this.timerInSeconds);
};

DailyChallengeManager.prototype.reset = function() {
    this.checkDailyChallengeState(1);
};

DailyChallengeManager.prototype.collectLetter = function() {


    this.nLetters += 1;
    this.letterGameStreak += 1;
    this.lettersSkipped = 0;

    this.removeLetterEntity(true);
    if (this.nLetters === this.dailyWord.length) {
        this.completeWord();
    }

    this.setDataAsync();

    this.uiElement.script.tweenPosition.startDelay = 0.15;
    this.uiElement.script.tweenPosition.startTween();
    this.app.fire('Audio:LetterMenuIn');
    this.app.fire('dailyChallenge:updateLetters');

    var _this = this;
    setTimeout(function() {
        _this.app.fire('Audio:LetterMenuOut');
    }, _this.uiElement.script.tweenPosition.duration * 1000);
};

DailyChallengeManager.prototype.completeWord = function() {

    var _this = this;
    setTimeout(function() {
        _this.app.fire('Audio:LetterComplete');
    }, 300);

    this.lastDayCompleted = pc.dateManager.currentTime();
    this.completedStreak += 1;
    this.setDataAsync();
};

DailyChallengeManager.prototype.increaseLuck = function() {
    this.sessionLuck += 0.18;
    this.letterGameStreak = Math.max(this.letterGameStreak - 1, 0);
};

DailyChallengeManager.prototype.resetSpawnChance = function() {
    this.baseSpawnChance = 0.285;
    this.sessionLuck = 1 + (0.16 * Math.random() - 0.08);
    this.letterGameStreak = 0;
    this.lettersSkipped = 0;
    this.lettersMissed = 0;
};

DailyChallengeManager.prototype.getSpawnChance = function() {

    // TODO: balance using time playing
    // More accurate control over user engagement
    // No idea what average user score is

    // give higher drop chance when ticket is spent?

    var intermediateChance = this.baseSpawnChance;

    // Later letters are harder to collect
    switch (this.nLetters) {
        case 0:
            intermediateChance = this.baseSpawnChance * 1.1;
            break;
        case 1:
            intermediateChance = this.baseSpawnChance / 2.0;
            break;
        case 2:
            intermediateChance = this.baseSpawnChance / 1.6;
            break;
        case 3:
            intermediateChance = this.baseSpawnChance / 3.2;
            break;
        case 4:
            intermediateChance = this.baseSpawnChance / 2.4;
            break;
        case 5:
            intermediateChance = this.baseSpawnChance / 2.8;
            break;
        default:
            intermediateChance = this.baseSpawnChance / 2.6;
    }

    // Make it harder to collect several letters in single session
    //intermediateChance /= Math.max(this.letterGameStreak, 1.5) / 1.5;

    // Balancing algorithm against unfortunate rng
    if (this.nLetters >= 2) intermediateChance = pc.util.lerp(intermediateChance, this.baseSpawnChance, this.lettersSkipped / 18);

    // Compensate player for missing letter
    if (this.nLetters >= 3) {
        intermediateChance = pc.util.lerp(intermediateChance, this.baseSpawnChance, this.lettersMissed / 6);
    }

    // Make it really hard to collect ALL letters in single session
    if ((this.nLetters - this.letterGameStreak) === 1) intermediateChance /= 6; //(this.letterGameStreak / 2);

    // Make every streakday harder
    intermediateChance *= (1.0 - (this.completedStreak / 6));

    // Add luck randomization to the mix
    intermediateChance *= this.sessionLuck;

    // Last letter on first day should be easy to collect on second round
    if ((this.completedStreak < 1) && ((this.nLetters - this.dailyWord.length - 1) === 0) && (this.letterGameStreak < 1)) {
        if ((this.lettersSkipped > 5) || (this.lettersMissed > 2)) intermediateChance = 1;
        else intermediateChance = this.baseSpawnChance / 2.0;
    }

    intermediateChance *= 2;

    //console.log('dropchance ', intermediateChance);
    return intermediateChance > Math.random();
};

DailyChallengeManager.prototype.placeNextLetter = function() {

    this.letterInGame = true;
    return this.dailyWord.charAt(this.nLetters);
};

DailyChallengeManager.prototype.isLetterAvailable = function() {

    var chance = this.letterSpawnChance;
    var randomNumber = Math.random();
    if (!this.isWordComplete() && !this.letterInGame && this.getSpawnChance() && !pc.gameManager.isInChallengeMode()) {
        return true;
    } else {
        return false;
    }
};

DailyChallengeManager.prototype.removeLetterEntity = function(wasCollected) {
    this.lettersMissed += !!!wasCollected ? 1 : -this.lettersMissed;
    this.letterInGame = false;
};

DailyChallengeManager.prototype.isWordComplete = function() {

    if (this.dailyWord === '') {
        return false;
    } else if (this.nLetters <= this.dailyWord.length - 1) {
        return false;
    } else {
        return true;
    }
};

DailyChallengeManager.prototype.getWord = function() {

    return this.dailyWord;
};

DailyChallengeManager.prototype.getStreak = function() {

    return this.completedStreak;
};

DailyChallengeManager.prototype.getCollectedLetters = function() {

    return this.dailyWord.substr(0, this.nLetters);
};

DailyChallengeManager.prototype.centerTexts = function() {

    this.textBack.setLocalPosition(-this.textBack.element.width / 2, 0, 0);
    this.textFront.setLocalPosition(-this.textBack.element.width / 2, 0, 0);
};

DailyChallengeManager.prototype.getRandomWord = function() {

    var newWord = '';
    var randomNumber = 0;

    do {
        randomNumber = Math.floor((Math.random() * this.wordsJSON.resource.words.length));
        newWord = this.wordsJSON.resource.words[randomNumber];
    } while (this.dailyWord === newWord);

    this.dailyWord = newWord;
    this.app.fire("dailyChallengeManager:newWord");
    this.app.fire('dailyChallenge:updateLetters');

};

DailyChallengeManager.prototype.setData = function(stats) {
    var data = stats.dailyChallenge;
    this.started = true;

    if (!data) {
        this.resetTime = pc.dateManager.resetTime()
        this.checkDailyChallengeState();
        return;
    }
    this.resetTime = data.resetTime ? new Date(data.resetTime) : pc.dateManager.resetTime();


    this.lastDayCompleted = new Date(data.lastDayCompleted || '1995-12-17T03:24:00');
    this.completedStreak = data.streak || 0;
    this.dailyWord = data.dailyWord || '';
    this.nLetters = data.nLetters || 0;
    this.collectedRewardToday = data.collectedRewardToday || false;
    this.checkDailyChallengeState();
};

DailyChallengeManager.prototype.checkDailyChallengeState = function(days) {
    var currentTime = pc.dateManager.currentTime();

    var daysPassedLastWord = days || 0;

    if (currentTime >= this.resetTime) {
        daysPassedLastWord = Math.ceil((currentTime - this.resetTime) / pc.dateManager._dayInMilliseconds);
    }

    if (daysPassedLastWord >= 1) {
        this.resetTime = pc.dateManager.resetTime();
        this.setResetTimer();
        // new day new word


        if (!this.collectedRewardToday) {
            this.completedStreak = 0;
        }

        if (this.completedStreak >= 4) {
            this.completedStreak = 0;
        }

        this.collectedRewardToday = false;
        this.nLetters = 0;
        this.getRandomWord();

        this.lastDayCompleted = pc.dateManager.currentTime();
        this.setDataAsync();
        if (pc.dailyChallengeScreen) {
            pc.dailyChallengeScreen.changePricesCollected();
        }
    }

    if (this.dailyWord === '') {
        //console.log("daily word is empty")
        this.getRandomWord();
    }

};

DailyChallengeManager.prototype.setResetTimer = function() {

    // this.endTime = this.app._time + this.timer;
    this.oldTime = this.app._time;
};

DailyChallengeManager.prototype.setDataAsync = function() {
    var data = {};
    data.dailyChallenge = {
        dailyWord: this.dailyWord,
        nLetters: this.nLetters,
        streak: this.completedStreak,
        lastDayCompleted: this.lastDayCompleted,
        collectedRewardToday: this.collectedRewardToday,
        resetTime: this.resetTime.toISOString(),
    };

    pc.wrapper.setData(data);
};

DailyChallengeManager.prototype.resetChallenge = function() {

    this.lastDayCompleted = new Date('1995-12-17T03:24:00');
    this.completedStreak = 0;
    this.getRandomWord();
    this.nLetters = 0;
    this.collectedRewardToday = false;
    this.letterInGame = false;
    this.setDataAsync();
};

DailyChallengeManager.prototype.isToday = function() {
    return !this.collectedRewardToday;
};