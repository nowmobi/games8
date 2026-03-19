var CloseButton2 = pc.createScript('closeButton2');

CloseButton2.attributes.add('entityToClose', {
    type: 'entity'
});

pc.extend(CloseButton2.prototype, {

    initialize: function() {
        this.entity.element.on(pc.EVENT_MOUSEUP, this._onClick, this);
        this.entity.element.on(pc.EVENT_TOUCHEND, this._onClick, this);
    },

    _onClick: function() {
        this.app.fire('Audio:UIPopClose');
        this.app.fire('Audio:UICancel');
        this.entityToClose.enabled = false;
    },
});