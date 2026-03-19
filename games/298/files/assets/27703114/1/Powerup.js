var Powerup = pc.createScript('powerup');

//
// Powerup - Temporary placeholder for replacement by PowerupManager
//

pc.extend(Powerup.prototype, {

    initialize: function() {

        // Prevent misplacement because invisible in editor
        if (this.entity.parent.getPosition().y <= 1.9) {
            this.entity.parent.setPosition(
                this.entity.parent.getPosition().x,
                1.7,
                this.entity.parent.getPosition().z);
        }

        this.powerScript = null;
        if (!!!this.entity.collision) {
            console.warn('POWERUP: Missing collision component');
            this.entity.enabled = false;
            return;
        }

        if (!!!pc.util.arrayContainsTag(this.entity.tags, 'Powerup')) {
            console.error('POWERUP: Missing tag - powerup!');
            // Solution: Add to lane after the fact by looking in parent
        }

        //this.entity.collision.on('triggerenter', this.onCollisionStart, this);
        this.entity.itemScript = this;
        // Powerups arent used in the game yet
        this.onDisable();
    },

    postInitialize: function() {
        pc.poolBuilder.addCallbacks(this, this.onReset, this.onDisable);
    },

    onReset: function() {
        this.powerScript = PowerupManager.self.request(this.entity);
        if (!!!this.powerScript) this.onDisable();
    },

    onDisable: function() {
        if (!!this.powerScript) this.powerScript.entity.enabled = false;
    },

    onCollision: function(collider) {

        // if (collider.tags._list.includes('GamePlayer') && !!this.powerScript) {
        this.powerScript.onCollide();
        this.onDisable();
        // }
    }

});