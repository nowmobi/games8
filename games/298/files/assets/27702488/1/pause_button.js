var PauseButton = pc.createScript('pauseButton');

// initialize code called once per entity
PauseButton.prototype.initialize = function() {
    // this.entity.element.on(pc.util.EVENT_CLICK, this.onPress, this);

    this._down = false;

    if (this.app.mouse) {
        this.entity.element.on(pc.EVENT_MOUSEDOWN, this.onDown, this);
        this.entity.element.on(pc.EVENT_MOUSEUP, this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on(pc.EVENT_TOUCHSTART, this.onDown, this);
        this.entity.element.on(pc.EVENT_TOUCHEND, this.onPress, this);
    }
};

PauseButton.prototype.onDown = function(event) {
    pc.util.processEvent(event);
    this._down = true;
};


// When we press the element assign the active texture
PauseButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    if (!this._down) {
        return;
    }
    this._down = false;

    this.app.fire('UI:clicked');
    this.app.fire('PauseButton:onPause');
    this.app.fire('PauseButton:showPauseScreen');
};