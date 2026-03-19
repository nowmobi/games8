var CancelButton = pc.createScript('cancelButton');

// initialize code called once per entity
CancelButton.prototype.initialize = function() {
    // this.entity.element.on(pc.util.EVENT_CLICK, this.onPress, this);

    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

// update code called every frame
CancelButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('PauseScreenManager:onCancel');
};