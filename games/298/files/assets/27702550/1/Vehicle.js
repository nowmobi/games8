var Vehicle = pc.createScript('vehicle');

Vehicle.attributes.add('vehicleType', {
    type: 'string',
    enum: [{
            TRAM: 'Tram'
        },
        {
            CAR: 'Car'
        }
    ]
});

pc.extend(Vehicle.prototype, {

    initialize: function() {

        this.objectState = {
            WAITING: 'WAITING',
            MOVING: 'MOVING'
        };

        // Starting values are hardcoded, so keep these intact
        this.moveDistance = 130;
        this.movementSpeed = 6.8;
        this.audioDistance = 80;

        this.currentState = this.objectState.WAITING;
        this.velocity = this.entity.parent.forward.normalize();
        this.frameVelocity = 0;
    },

    postInitialize: function() {
        pc.poolBuilder.addCallbacks(this, this.onReset, null);
    },

    update: function(dt) {

        switch (this.currentState) {

            case this.objectState.WAITING:
                {

                    if (pc.playerEntity.getPosition().x - this.entity.parent.getPosition().x < this.moveDistance) {
                        this.currentState = this.objectState.MOVING;
                    }
                }
                break;

            case this.objectState.MOVING:
                {
                    this.frameVelocity = this.movementSpeed * dt * pc.gameManager.speed;
                    this.entity.parent.translate(this.velocity.x * this.frameVelocity,
                        this.velocity.y * this.frameVelocity,
                        this.velocity.z * this.frameVelocity);

                    if (Math.abs(pc.playerEntity.getPosition().x - this.entity.parent.getPosition().x) < this.audioDistance) {
                        //if(this.vehicleType === 'Tram') this.app.fire('Audio:TramIncoming');
                        //else this.app.fire('Audio:CarIncoming');
                        this.app.fire('Audio:' + this.vehicleType + 'Incoming' + (this.isMovingSideways() ? 'Side' : ''));
                        // Doesn't work?
                        this.audioDistance = -999;
                    }
                }
                break;
        }
    },

    onReset: function() {
        this.currentState = this.objectState.WAITING;
        this.velocity = this.entity.parent.forward.normalize();
        this.audioDistance = 40;
    },

    isMovingSideways: function() {
        return pc.util.clamp01Approximate(this.entity.parent.forward.z, 0.1) > 0;
    }

});