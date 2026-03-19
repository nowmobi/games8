var ScoreDisplay = pc.createScript('scoreDisplay');

ScoreDisplay.attributes.add('multiplierLabel', {
    type: 'entity',
    title: 'Mutliplier Label'
});

ScoreDisplay.attributes.add('tweenScaleToLabel', {
    type: 'vec3',
    default: [1.4, 1.4, 1.4],
    title: 'Tween Scale To Label'
});

ScoreDisplay.attributes.add('tweenScaleToHitBar', {
    type: 'vec3',
    default: [1.5, 1.5, 1.5],
    title: 'Tween Scale to Hitbar'
});

// initialize code called once per entity
ScoreDisplay.prototype.initialize = function() {
    this.hitbars = this.entity.children;
    this.resetScoreMultiplier();
    this.app.on('scoreManager:updateScoreDisplay', this.updateScoreDisplay, this);

    /*    this.on('destroy', function() {
            this.app.off('scoreManager:updateScoreDisplay');
        });*/
};

ScoreDisplay.prototype.updateScoreDisplay = function(targetMultiplier, targetMultiplierCounter) {
    this.multiplierLabel.element.text = 'x' + targetMultiplier;

    if (targetMultiplierCounter === 0) {
        this.resetScoreMultiplier();

        return;
    }

    var hitbar = this.hitbars[targetMultiplierCounter - 1];

    if (hitbar === undefined) {
        return;
    }
    hitbar.enabled = true;
};

ScoreDisplay.prototype.resetScoreMultiplier = function() {
    this.hitbars.forEach(function(hitbar) {
        hitbar.enabled = false;
    });

    this.counter = 0;
};