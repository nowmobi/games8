var Letter = pc.createScript('letter');

pc.extend(Letter.prototype, {

    initialize: function() {

        this.accDeltaTime = 0;
        this.position = this.entity.parent.getPosition();
        this.pivotY = this.entity.parent.getPosition().y + 0.2;

        this.letterEntity = null;
        this.letterCode = '?';
        this.isCollected = false;

        this.letterGlow = this.entity.parent.findOne('name', 'Glow');
        this.origGlowScale = this.letterGlow.getLocalScale().clone();
        this.glowScale = this.origGlowScale.x;

        this.entity.itemScript = this;
    },

    postInitialize: function() {
        pc.poolBuilder.addCallbacks(this, this.onReset, this.onDisable);
    },

    update: function(dt) {

        this.accDeltaTime += dt;
        this.frameSpeed = this.accDeltaTime * Math.PI * 1.5;

        this.entity.setRotation(this.entity.getRotation().setFromAxisAngle(pc.Vec3.UP, 27 * Math.cos(this.frameSpeed)));
        this.entity.rotateLocal(0, 90, 0);

        this.entity.parent.setPosition(this.position.x, this.pivotY + Math.abs(Math.sin(this.frameSpeed)) * 0.6, this.position.z);

        this.letterGlow.rotateLocal(0, 60 * dt, 0);
        this.glowScale = this.origGlowScale.x + (0.5 * Math.cos(this.frameSpeed * 2));
        this.letterGlow.setLocalScale(this.glowScale, this.glowScale, this.glowScale);
    },

    onCollision: function(collider) {

        this.app.fire('Audio:CollectLetter');
        pc.dailyChallengeManager.collectLetter();
        pc.playerScript.playSpikeParticle();
        this.isCollected = true;
        this.onDisable();
    },

    onReset: function() {

        this.letterGlow.setLocalScale(this.origGlowScale);
        this.isCollected = false;
        this.accDeltaTime = 0;

        this.position = this.entity.parent.getPosition();
        this.pivotY = this.entity.parent.getPosition().y + 0.2;
        this.letterCode = '?';

        if (this.letterEntity) this.letterEntity.enabled = false;

        if (pc.dailyChallengeManager.isLetterAvailable()) {

            this.letterCode = pc.dailyChallengeManager.placeNextLetter().toLowerCase();

            for (var i = 0; i < this.entity.children.length; i += 1) {

                if (this.entity.children[i].name === this.letterCode) {
                    this.letterEntity = this.entity.children[i];
                    this.letterEntity.enabled = true;
                    break;
                }
            }

        } else this.onDisable();
    },

    onDisable: function() {
        pc.dailyChallengeManager.removeLetterEntity(!this.isCollected);
        if (this.letterEntity) this.letterEntity.enabled = false;
        this.entity.parent.enabled = false;
    }

});