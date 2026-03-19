var GhostButton = pc.createScript('ghostButton');

//
// GhostButton - Fires inputManager:Input event once (for audioContext)
//

// initialize code called once per entity
GhostButton.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

// update code called every frame
GhostButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('inputManager:Input');
};