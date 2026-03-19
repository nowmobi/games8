var PracticeIcon = pc.createScript('practiceIcon');

// initialize code called once per entity
PracticeIcon.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

PracticeIcon.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('sceneManager:gotoGame');
};