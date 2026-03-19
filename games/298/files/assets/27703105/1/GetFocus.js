var GetFocus = pc.createScript('getFocus');

// initialize code called once per entity
GetFocus.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

// update code called every frame
GetFocus.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    console.log("false")
    this.entity.enabled = false;
};