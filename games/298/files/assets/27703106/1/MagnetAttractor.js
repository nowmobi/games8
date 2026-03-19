var MagnetAttractor = pc.createScript('magnetAttractor');

MagnetAttractor.attributes.add("collisionBox", {
    type: 'vec3',
    title: 'Collision Box'
});

pc.extend(MagnetAttractor.prototype, {

    initialize: function() {
        this.app.on('sceneManager:resetGameState', this.resetState, this);
        this.app.on('player:setMagnetAttractor', this.setState, this);
        this.coinArray = this.app.root.findByTag('Coin');
        //this.lootArray = this.app.root.findByTag('Loot');

        this.magnetEnabled = false;
        this.deltaSinceCheck = 0;
        this.updatesPerSecond = 8;
    },

    resetState: function() {
        this.setState(false);
    },

    setState: function(enable) {
        this.app.fire('magnetAttractor:setState', enable);
        this.magnetEnabled = enable;
    },

    update: function(dt) {

        if (!this.magnetEnabled) {
            return;
        }

        if ((this.deltaSinceCheck += dt) < (1.0 / this.updatesPerSecond)) {
            return;
        } else this.deltaSinceCheck = 0;

        for (var i = this.coinArray.length; i--;) {

            if (!this.coinArray[i].enabled) {
                continue;
            }

            if (this.checkCollision(this.coinArray[i], this.entity.getPosition())) {
                // can coins moving to player be skipped?
                this.coinArray[i].script.coin.setMoveToPlayer();
            }
        }

        // Loot may not be attracted to magnet
        // Thoughts?

        /* 
               for (var j = this.lootArray.length; j--; ) {
                    if (!this.lootArray[j].enabled) {
                        continue;
                    }
                    
                    if (this.checkCollision(this.lootArray[j], playerPosition)) {
                        this.lootArray[j].script.loot.setMoveToPlayer();
                    }
                }
                */
    },

    checkCollision: function(entity, targetPosition) {
        // NOTE: is this correct?!: Math.abs(targetPosition.x - position.x) < this.collisionBox.y

        if (Math.abs(targetPosition.z - entity.getPosition().z) < this.collisionBox.z) {
            if (Math.abs(targetPosition.y - entity.getPosition().y) < this.collisionBox.y) {
                if (Math.abs(targetPosition.x - entity.getPosition().x) < this.collisionBox.x) {
                    return true;
                }
            }
        }

        return false;
    }
});