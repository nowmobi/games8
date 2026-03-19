var SaveMeclick = pc.createScript('saveMeclick');

SaveMeclick.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

SaveMeclick.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('saveMe:wildClick');
};