var TutorialManager = pc.createScript('tutorialManager');

TutorialManager.attributes.add('tutorialUI', {
    type: 'entity',
    title: 'Title'
});

TutorialManager.attributes.add('flashDeath', {
    type: 'entity',
    title: 'Flash Death'
});

// initialize code called once per entity
TutorialManager.prototype.initialize = function() {
    this.app.on('tutorialQuest', this.stepCompleted, this);
    this.app.on('showTutorialHitBox:showText', this.showText, this);
    this.app.on('gameManager:revivePlayer', this.triggerReviveSettings, this);
    this.app.on('gameManager:endTutorial', this.endTutorial, this);

    this.tutorialStep = 0;

    pc.tutorialManager = this;
};

TutorialManager.prototype.stepCompleted = function() {
    this.tutorialStep += 1;
};

TutorialManager.prototype.startTutorial = function() {
    this.tutorialStep = 0;
};

TutorialManager.prototype.showText = function(id) {
    for (var i = 0; i < this.tutorialUI.children.length; i += 1) {
        this.tutorialUI.children[i].enabled = i === id;
    }
};

TutorialManager.prototype.triggerReviveSettings = function() {
    this.showText(-1);

    this.flashDeath.enabled = true;


    var self = this;

    self.flashDeath.script.tweenAlpha.startTween();
};

TutorialManager.prototype.endTutorial = function() {
    this.showText(-1);
};