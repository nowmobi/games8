var SceneManager = pc.createScript('sceneManager');

SceneManager.attributes.add('homeManagers', {
    type: 'entity',
    default: 'HomeManagers'
});

SceneManager.attributes.add('gameManagers', {
    type: 'entity',
    default: 'gameManagers'
});

SceneManager.attributes.add('gameScene', {
    type: 'entity',
    default: 'gameScene'
});

SceneManager.attributes.add('homeScene', {
    type: 'entity',
    default: 'homeScene'
});

SceneManager.attributes.add('dailyChallengeScreen', {
    type: 'entity',
    default: 'dailyChallenge'
});

SceneManager.attributes.add('entSceneConfirm', {
    type: 'entity',
    default: 'confirmChange'
});

SceneManager.attributes.add('entConfirmButton', {
    type: 'entity',
    default: 'confirmButton'
});

SceneManager.attributes.add('entPauseScreen', {
    type: 'entity',
    default: 'pauseScreen'
});

SceneManager.attributes.add('entConfirmText', {
    type: 'entity',
    default: 'confirmText'
});

pc.extend(SceneManager.prototype, {

    initialize: function() {

        pc.sceneManager = this;

        this.changingScene = false;

        this.gamePlayed = 0;
        this.showSubscribe = true;

        this.app.on('sceneManager:gotoGame', this.changeSceneGame, this);
        this.app.on('sceneManager:gotoHome', this.changeSceneHome, this);

        this.needConfirmation = false;

        this.app.on('gameManager:gameStart', function() {
            this.needConfirmation = true;
        }, this);
        this.app.on('gameManager:gameEnd', function() {
            this.needConfirmation = false;
        }, this);

        this.homeScreenManager = this.homeManagers.script.homeScreenManager;

        this.entSceneConfirm.enabled = false;
        this.startDelta = 0;
    },

    postInitialize: function() {

        this.inGameManager = pc.gameManager;

        this.homeScene.enabled = true;
        this.homeScene.setLocalPosition(0, 0, 0);
        pc.gameCamera.setCameraHome();

        this.gameScene.enabled = !!pc.quality.preAllocateScene;
        this.gameScene.setLocalPosition(0, 0, 0);
    },

    update: function(dt) {

        if (!this.sceneIsActive) {
            this.startDelta += dt;
            if (this.startDelta > 0.4) {
                this.sceneIsActive = true;
                this.homeScene.children[1].enabled = true;
            }
        }

        if (!!pc.quality.preAllocateScene && !!!this.gameIsPrepared) {
            this.gameScene.enabled = false;
            this.gameIsPrepared = true;
            this.homeScene.children[1].enabled = false;
        }

        if (this.gameIsPrepared) {
            WorldBender.update();
        }
    },

    changeSceneGame: function(ad) {
        if (this.changingScene) {
            console.log("don't over press")
            return;
        }

        this.changingScene = true;

        if (!this.homeScreenManager.checkIfChangingSceneIsPossible()) {
            console.info('SCENEMANAGER: ChangeScene blocked by Homescreen');
            return;
        }

        // Confirm making a scene change
        if (this.needConfirmation && this.entSceneConfirm.enabled === false) {
            this.entSceneConfirm.enabled = true;
            this.entPauseScreen.enabled = false;
            this.entConfirmButton.script.changeSceneButton.sceneId = 'GAME';
            this.entConfirmText.script.textLocalization.textKey = 'RestartMessage';
            this.entConfirmText.script.textLocalization.initialize();
            this.changingScene = false;
            return;
        } else {
            this.entSceneConfirm.enabled = false;
        }

        if (ad) {
            this.needConfirmation = false;
            pc.wrapper.showInterstitialAd(function() {
                this.changingScene = false;
                this.changeSceneGame();
                //this.app.fire('gdSdkManager:playAd');
            }, this);
            return;
        }

        //
        // Confirmed Scene Change
        //

        this.changingScene = false;

        this.gamePlayed += 1;

        this.homeScene.enabled = false;
        this.gameScene.enabled = true;
        pc.gameCamera.setCameraGame();

        this.app.fire('Audio:GotoGame');
        this.app.fire('sceneManager:resetGameState');

        this.inGameManager.startGame();
    },

    changeSceneHome: function(ad) {
        if (this.changingScene) {
            return;
        }

        this.changingScene = true;

        // Confirm making a scene change
        if (this.needConfirmation && this.entSceneConfirm.enabled === false) {
            this.entSceneConfirm.enabled = true;
            this.entPauseScreen.enabled = false;
            this.entConfirmButton.script.changeSceneButton.sceneId = 'HOME_SCENE';
            this.entConfirmText.script.textLocalization.textKey = 'QuitMessage';
            this.entConfirmText.script.textLocalization.initialize();

            this.changingScene = false;
            return;
        } else {
            this.entSceneConfirm.enabled = false;
        }

        if (ad) {

            this.needConfirmation = false
            pc.wrapper.showInterstitialAd(function() {
                this.changingScene = false;
                this.changeSceneHome();
                //this.app.fire('gdSdkManager:playAd');
            }, this);
            return;
        }

        //
        // Confirmed Scene Change
        //        

        this.changingScene = false;

        this.app.fire('Audio:GotoHome')
        this.app.fire('sceneManager:unpause', true);
        this.app.fire('sceneManager:OnHomeConfirmed')
        //this.app.fire('gdSdkManager:playAd');;

        this.gameScene.enabled = false;
        this.homeScene.enabled = true;
        this.needConfirmation = false;
        pc.gameCamera.setCameraHome();

        // TODO: Check if in challenge Mode!
        if (pc.dailyChallengeManager.isWordComplete()) {
            if (!pc.dailyChallengeManager.collectedRewardToday) {
                this.app.fire('button:openScreen', this.dailyChallengeScreen);
            }
        }
    },

    isInHomeScene: function() {
        return this.homeScene.enabled;
    },

    getActiveScene: function(scene) {
        if (this.homeScene.enabled) return this.homeScene.name;
        else if (this.gameScene.enabled) return this.gameScene.name;
        return '';
    }
});