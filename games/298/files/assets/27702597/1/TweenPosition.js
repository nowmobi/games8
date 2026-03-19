var TweenPosition = pc.createScript('tweenPosition');

TweenPosition.attributes.add('initFrom', {
    type: 'vec3',
    default: [0, 0, 0],
    title: 'From'
});
TweenPosition.attributes.add('initTo', {
    type: 'vec3',
    default: [0, 0, 0],
    title: 'To'
});
TweenPosition.attributes.add('playStyle', {
    type: 'number',
    enum: [{
            'Once': 0
        },
        {
            'Loop': 1
        },
        {
            'PingPong': 2
        }
    ],
    title: 'Play Style'
});

TweenPosition.attributes.add('duration', {
    type: 'number',
    default: 1,
    title: 'duration'
});
TweenPosition.attributes.add('curve', {
    type: 'curve',
    title: 'Animation Curve'
});
TweenPosition.attributes.add('ignoreTimeScale', {
    type: 'boolean',
    default: true,
    title: 'Ignore Time Scale'
});
TweenPosition.attributes.add('startDelay', {
    type: 'number',
    default: 0,
    title: 'Start Delay'
});
TweenPosition.attributes.add('debug', {
    type: 'boolean',
    default: false,
    title: 'Show Debug'
});
TweenPosition.attributes.add('startAtEnable', {
    type: 'boolean',
    default: true,
    title: 'Start on Initialize'
});
TweenPosition.attributes.add('startOnEnable', {
    type: 'boolean',
    default: true,
    title: 'Start on Enable'
});


// initialize code called once per entity
TweenPosition.prototype.initialize = function() {
    this.time = this.startAtEnable ? 0 : this.duration + this.startDelay + 1;
    this.oldTime = this.app._time || 0;
    this.initPosition = this.entity.getLocalPosition().clone();

    this._newPosition = new pc.Vec3(0, 0, 0);

    this.from = this.initFrom.clone();
    this.to = this.initTo.clone();

    this.on('state', function(enabled) {
        if (enabled && this.startOnEnable) {
            this.startTween();
        }
    });

    if (this.startAtEnable) {
        this.startTween();
    }
};

// update code called every frame
TweenPosition.prototype.update = function(dt) {
    // Only execute code if this.time is between 0 and this.duration + this.startDelay
    if (this.time >= 0 && this.time <= this.duration + this.startDelay) {
        // Update time
        this.updateTime(dt);

        // Only update opacity after the start delay.
        if (this.time > this.startDelay) {
            // Formula: position = initPosition + (from - (from - to) * curve)
            this._newPosition
                .set(this.from.x, this.from.y, this.from.z)
                .sub(this.to)
                .scale(this.curve.value((this.time - this.startDelay) / this.duration))
                .sub2(this.from, this._newPosition)
                .add(this.initPosition);

            if (this.debug) {
                console.log(this.time, this._newPosition.toString());
            }

            this.entity.setLocalPosition(this._newPosition);
        }
        // Set new old time 
        this.oldTime = this.app._time;
    }

    // Execute if this.time is higher than this.duration + this.startDelay
    if (this.time >= this.duration + this.startDelay || this.time <= 0) {
        switch (this.playStyle) {
            case 0:
                break;
            case 1:
                this.time = 0;
                break;
            case 2:
                this.time = 0;
                var temp = this.from;
                this.from = this.to;
                this.to = temp;
                break;
        }
    }
};

/*
 * Update the time with the game time or the unscaled time
 */
TweenPosition.prototype.updateTime = function(dt) {
    this.time += this.ignoreTimeScale ? (this.app._time - this.oldTime) / 1000 : dt;
};

/*
 * Set the correct value for starting a tween
 * This method can also be called to start a new tween
 */
TweenPosition.prototype.startTween = function() {
    this.time = 0;
    this.from.set(this.initFrom.x, this.initFrom.y, this.initFrom.z);
    this.to.set(this.initTo.x, this.initTo.y, this.initTo.z);
    this.entity.setLocalPosition(this.from.x + this.initPosition.x, this.from.y + this.initPosition.y, this.from.z + this.initPosition.z);
    this.oldTime = this.app._time;
};

/*
 * Use this method to start a tween where the init position is resetted to the current position of the entity.
 */
TweenPosition.prototype.moveTo = function(from, to) {
    this.time = 0;

    this.from.set(from.x, from.y, from.z);
    this.to.set(to.x, to.y, to.z);
    // this.to.sub(from);
    this.initPosition.set(0, 0, 0);

    this.oldTime = this.app._time;
};