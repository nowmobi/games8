var TabSwitchButton = pc.createScript('tabSwitchButton');

// Just for sounds
// Rename, refactor for whatever purpose necessary

// initialize code called once per entity
TabSwitchButton.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

TabSwitchButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('Audio:UITabSwitch');
};