var DeathTrigger = pc.createScript('deathTrigger');

pc.extend(DeathTrigger.prototype, {

    initialize: function() {
        this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    },

    onTriggerEnter: function(entity) {
        if (entity.tags.has('GamePlayer')) {
            this.app.fire("player:collision", 2);
        }
    },
});