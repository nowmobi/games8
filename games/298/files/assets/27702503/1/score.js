var ScoreCounter = pc.createScript('scoreCounter');

// initialize code called once per entity
ScoreCounter.prototype.initialize = function() {
    this.app.on('scoreManager:updateScoreCounter', this.updateScoreCounter, this);

    /*    this.on('destroy', function() {
            this.app.off('scoreManager:updateScoreCounter');
        });*/
};

ScoreCounter.prototype.updateScoreCounter = function(value) {
    this.entity.script.text.setText(value);
};

// swap method called for script hot-reloading
// inherit your script state here
// Score.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/