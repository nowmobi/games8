var TweenScale = pc.createScript('tweenScale');

TweenScale.attributes.add('initFrom', {
    type: 'vec3',
    default: [0, 0, 0],
    title: 'From'
});
TweenScale.attributes.add('initTo', {
    type: 'vec3',
    default: [0, 0, 0],
    title: 'To'
});
TweenScale.attributes.add('playStyle', {
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

TweenScale.attributes.add('duration', {
    type: 'number',
    default: 1,
    title: 'duration'
});
TweenScale.attributes.add('curve', {
    type: 'curve',
    title: 'Animation Curve'
});
TweenScale.attributes.add('ignoreTimeScale', {
    type: 'boolean',
    default: true,
    title: 'Ignore Time Scale'
});
TweenScale.attributes.add('startDelay', {
    type: 'number',
    default: 0,
    title: 'Start Delay'
});
TweenScale.attributes.add('debug', {
    type: 'boolean',
    default: false,
    title: 'Show Debug'
});
TweenScale.attributes.add('startOnEnable', {
    type: 'boolean',
    default: true,
    title: 'Start on Enable'
});
TweenScale.attributes.add('startOnInit', {
    type: 'boolean',
    default: true,
    title: 'Start on Initialize'
});

// initialize code called once per entity
TweenScale.prototype.initialize = function() {
    this.time = this.startAtEnable ? 0 : this.duration + this.startDelay + 1;
    this.oldTime = this.app._time || 0;
    this.initScale = this.entity.getLocalScale().clone();

    this.from = this.initFrom;
    this.to = this.initTo;
    this.temp = new pc.Vec3(0, 0, 0);

    this._newScale = new pc.Vec3(0, 0, 0);

    this.on('state', function(enabled) {
        if (enabled && this.startOnEnable) {
            this.startTween();
        }
    });

    if (this.startOnInit) {
        this.startTween();
    }
};

// update code called every frame
TweenScale.prototype.update = function(dt) {
    // Only execute code if this.time is between 0 and this.duration + this.startDelay
    if (this.time >= 0 && this.time <= this.duration + this.startDelay) {
        // Update time
        this.updateTime(dt);

        // Only update opacity after the start delay.
        if (this.time > this.startDelay) {
            // Formula: newScale = (from - (from - to) * curve) * initscale
            this._newScale
                .set(this.from.x, this.from.y, this.from.z)
                .sub(this.to)
                .scale(this.curve.value((this.time - this.startDelay) / this.duration))
                .sub2(this.from, this._newScale)
                .mul(this.initScale);

            if (this.debug) {
                console.log(this.time, newScale.toString());
            }

            this.entity.setLocalScale(this._newScale.x, this._newScale.y, this._newScale.z);
        }

        // Set new old time
        this.oldTime = this.app._time;
    }

    // Execute if this.time is higher than duration
    if (this.time >= this.duration + this.startDelay || this.time <= 0) {
        switch (this.playStyle) {
            case 0:
                break;
            case 1:
                this.time = 0;
                break;
            case 2:
                this.time = 0;
                this.temp.set(this.from.x, this.from.y, this.from.z);
                this.from.set(this.to.x, this.to.y, this.to.z);
                this.to.set(this.temp.x, this.temp.y, this.temp.z);
                break;
        }
    }
};

/*
 * Update the time with the game time or the unscaled time
 */
TweenScale.prototype.updateTime = function(dt) {
    this.time += this.ignoreTimeScale ? (this.app._time - this.oldTime) / 1000 : dt;
};

/*
 * Set the correct value for starting a tween
 * This method can also be called to start a new tween
 */
TweenScale.prototype.startTween = function() {
    if (!this.from) {
        setTimeout(this.startTween.bind(this));
        return;
    }
    this.time = 0;
    this.from.set(this.initFrom.x, this.initFrom.y, this.initFrom.z);
    this.to.set(this.initTo.x, this.initTo.y, this.initTo.z);
    this.entity.setLocalScale(this.from.x * this.initScale.x, this.from.y * this.initScale.y, this.from.z * this.initScale.z);
    this.oldTime = this.app._time;
};