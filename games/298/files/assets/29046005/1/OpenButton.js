var OpenButton = pc.createScript('openButton');

OpenButton.attributes.add('entityToOpen', {
    type: 'entity'
});

pc.extend(OpenButton.prototype, {

    initialize: function() {
        this.entity.element.on(pc.EVENT_MOUSEUP, this._onClick, this);
        this.entity.element.on(pc.EVENT_TOUCHEND, this._onClick, this);
    },

    _onClick: function() {
        this.app.fire('Audio:UIConfirm');
        this.app.fire('Audio:UIMenuEnter');
        this.entityToOpen.enabled = true;
    },
});