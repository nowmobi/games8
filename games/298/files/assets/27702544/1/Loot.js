var Loot = pc.createScript('loot');

pc.extend(Loot.prototype, {

    initialize: function() {

        this.origRotation = this.entity.getRotation().clone();
        this.position = this.entity.parent.getPosition();
        this.pivotY = this.entity.getPosition().y + 0.2;

        this.deltaPosition = new pc.Vec3(0, 0, 0);
        this.accDeltaTime = 0;

        this.lootGlow = this.entity.parent.findOne('name', 'Glow');
        this.origGlowScale = this.lootGlow.getLocalScale().clone();
        this.glowScale = this.origGlowScale.x;

        this.entity.itemScript = this;
    },

    postInitialize: function() {
        pc.poolBuilder.addCallbacks(this, this.onReset, null);
    },

    onCollision: function() {

        this.app.fire('Audio:CollectLoot');
        pc.gameManager.collectLoot();
        this.entity.parent.enabled = false;
    },

    update: function(dt) {

        this.accDeltaTime += dt;
        this.frameSpeed = this.accDeltaTime * Math.PI * 1.5;

        this.entity.parent.setPosition(this.position.x, this.pivotY - Math.sin(this.frameSpeed * 2) * 0.2, this.position.z);
        this.entity.setRotation(this.entity.getRotation().setFromAxisAngle(pc.Vec3.LEFT, 15 * Math.cos(this.frameSpeed)));
        this.entity.rotateLocal(0, 90, 0);

        this.lootGlow.rotateLocal(0, 60 * dt, 0);
        //this.glowScale = this.origGlowScale.x + (0.75 * Math.sin(this.frameSpeed));
        this.lootGlow.setLocalScale(this.glowScale, this.glowScale, this.glowScale);

        if (this.moveToPlayer) this.doMoveToPlayer(dt);

    },

    onReset: function() {

        this.position = this.entity.parent.getPosition();
        this.pivotY = this.entity.parent.getPosition().y + 0.2;

        this.entity.setRotation(this.origRotation);
        this.lootGlow.setLocalScale(this.origGlowScale);

        this.accDeltaTime = 0;
        this.moveToPlayer = false;
    },

    setMoveToPlayer: function() {

        this.moveToPlayer = true;
    },

    doMoveToPlayer: function(dt) {

        this.deltaPosition.set(0, 0, 0);

        this.deltaPosition.add(pc.playerEntity.getPosition());
        this.deltaPosition.sub(this.entity.getPosition());
        this.deltaPosition.normalize().scale(pc.gameManager.playerFrameSpeed * 1.08);

        this.entity.parent.translate(this.deltaPosition);
    }

});