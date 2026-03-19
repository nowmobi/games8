var Coin = pc.createScript('coin');

pc.extend(Coin.prototype, {

    initialize: function() {

        this.deltaPosition = new pc.Vec3(0, 0, 0);
        this.entity.itemScript = this;
    },

    postInitialize: function() {
        pc.poolBuilder.addCallbacks(this, this.onReset);
    },

    onCollision: function() {
        pc.audioManager.playCoinSample();
        pc.playerScript.playCoinParticle();
        pc.gameManager.collectCoin();
        this.entity.parent.enabled = false;
    },

    update: function(dt) {

        this.entity.parent.rotateLocal(0, 120 * dt * pc.gameManager.speed, 0);
        if (this.moveToPlayer) this.doMoveToPlayer(dt);
    },

    onReset: function() {
        this.moveToPlayer = false;
        this.entity.parent.rotateLocal(0, (this.entity.getPosition().x % 60) * 6, 0);
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