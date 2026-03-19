var RespawnTrigger = pc.createScript('respawnTrigger');

// initialize code called once per entity
RespawnTrigger.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

RespawnTrigger.prototype.onTriggerEnter = function(collider) {
    if (pc.util.arrayContainsTag(collider.tags, "GamePlayer")) {
        collider.script.player.setReviveLocation(this.entity.getPosition());
    }
};