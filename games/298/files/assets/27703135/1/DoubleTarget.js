var DoubleTarget = pc.createScript('doubleTarget');

pc.extend(DoubleTarget.prototype, {

    initialize: function() {

        this.dxRotation = 0;
        this.origPosY = this.entity.parent.getPosition().y + 0.2;
        this.entity.itemScript = this;
        //this.entity.collision.on('triggerenter', this.onCollisionStart, this);
    },

    postInitialize: function() {
        pc.poolBuilder.addCallbacks(this, this.onReset, null);
    },

    update: function(dt) {

        this.dxRotation += dt;

        this.entity.parent.setPosition(
            this.entity.parent.getPosition().x,
            this.origPosY - Math.cos(this.dxRotation * Math.PI * 1.2) * 0.25,
            this.entity.parent.getPosition().z);
    },

    onCollision: function() {

        //if (collider.tags._list.includes('GamePlayer')) {
        this.app.fire('doubleTarget:collision');
        this.entity.parent.enabled = false;
        //}
    },

    onReset: function() {
        this.origPosY = this.entity.parent.getPosition().y + 0.2;
    }

});