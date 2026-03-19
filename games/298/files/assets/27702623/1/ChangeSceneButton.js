var ChangeSceneButton = pc.createScript('changeSceneButton');

ChangeSceneButton.attributes.add('showAd', {
    type: 'boolean',
    default: true
});

ChangeSceneButton.attributes.add('homescreenIconPrompt', {
    type: 'boolean',
    default: false,
    title: 'Show home screen icon prompt on click',
});

//
//  Generic implementation for UI elements that change scene states
//

ChangeSceneButton.attributes.add('sceneId', {
    type: 'string',
    enum: [{
            HOME_SCENE: 'HOME_SCENE'
        },
        {
            GAME_PRACTICE: 'GAME_PRACTICE'
        },
        {
            GAME_1VS1: 'GAME_1VS1'
        },
    ],
    title: 'Scene ID',
});


// initialize code called once per entity
ChangeSceneButton.prototype.initialize = function() {
    this.homescreenIconPromptDone = false;

    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

ChangeSceneButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);

    this.fire('pressed');
    this.app.fire('inputManager:Input');

    if (this.sceneId === 'HOME_SCENE') {
        this.app.fire('sceneManager:gotoHome', this.showAd);

        this.app.fire('Audio:UIConfirm');

    } else if (this.sceneId.includes('GAME', 0)) {

        this.app.fire('sceneManager:gotoGame', this.showAd);
    } else {
        console.warn('CHANGE_SCENE_BUTTON: There is no handler for this state (' + this.sceneId + ')');
    }
};