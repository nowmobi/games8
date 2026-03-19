var StartOverlay = pc.createScript('startOverlay');

StartOverlay.attributes.add('overlay', {
    type: 'entity',
    title: 'Overlay',
});

// initialize code called once per entity
StartOverlay.prototype.initialize = function() {
    this.overlay.enabled = true;
    this.app.on('removeOverlay', this.disable, this);
};

StartOverlay.prototype.disable = function() {
    this.overlay.enabled = false;
};