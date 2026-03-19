var CloseButton = pc.createScript('closeButton');

// initialize code called once per entity
CloseButton.prototype.initialize = function() {
    //this.entity.element.on(pc.util.EVENT_CLICK, this.onPress, this);
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }

};

CloseButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.fire("pressed");

    this.app.fire('button:closeButton');
    this.app.fire('Audio:UIPopClose');
    this.app.fire('Audio:UICancel');
};