var EntCloseButton = pc.createScript('entCloseButton');

EntCloseButton.attributes.add('target', {
    type: 'entity'
});

EntCloseButton.attributes.add('targetEnable', {
    type: 'entity'
});

// initialize code called once per entity
EntCloseButton.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

EntCloseButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.target.enabled = false;
    if (!!this.targetEnable) this.targetEnable.enabled = true;
    this.app.fire('Audio:UIPopClose');
    this.app.fire('Audio:UICancel');
};