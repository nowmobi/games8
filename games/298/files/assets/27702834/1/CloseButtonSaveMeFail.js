var CloseButtonSaveMeFail = pc.createScript('closeButtonSaveMeFail');

// initialize code called once per entity
CloseButtonSaveMeFail.prototype.initialize = function() {
    //this.entity.element.on(pc.util.EVENT_CLICK, this.onPress, this);

    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

CloseButtonSaveMeFail.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('loadingScreen:enabled', false);
    this.app.fire('saveMeManager:pauseTimer', false);
    this.app.fire('button:closeButton');
};