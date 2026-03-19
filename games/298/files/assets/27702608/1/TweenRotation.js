var TweenRotation = pc.createScript('tweenRotation');

TweenRotation.attributes.add('initFrom', {
    type: 'vec3',
    default: [0, 0, 0],
    title: 'From'
});
TweenRotation.attributes.add('initTo', {
    type: 'vec3',
    default: [0, 0, 0],
    title: 'To'
});
TweenRotation.attributes.add('playStyle', {
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

TweenRotation.attributes.add('duration', {
    type: 'number',
    default: 1,
    title: 'duration'
});
TweenRotation.attributes.add('curve', {
    type: 'curve',
    title: 'Animation Curve'
});
TweenRotation.attributes.add('ignoreTimeScale', {
    type: 'boolean',
    default: true,
    title: 'Ignore Time Scale'
});
TweenRotation.attributes.add('startDelay', {
    type: 'number',
    default: 0,
    title: 'Start Delay'
});
TweenRotation.attributes.add('debug', {
    type: 'boolean',
    default: false,
    title: 'Show Debug'
});
TweenRotation.attributes.add('startOnEnable', {
    type: 'boolean',
    default: true,
    title: 'Start on Enable'
});
TweenRotation.attributes.add('startOnInit', {
    type: 'boolean',
    default: true,
    title: 'Start on Initialize'
});

// initialize code called once per entity
TweenRotation.prototype.initialize = function() {
    this.time = this.startOnInit ? 0 : this.duration + this.startDelay + 1;
    this.oldTime = this.app._time || 0;
    this.initRotation = this.entity.getLocalEulerAngles();

    this.from = this.initFrom.clone();
    this.to = this.initTo.clone();

    this._newRotation = new pc.Vec3(0, 0, 0);

    this.on('state', function(enabled) {
        if (enabled && this.startOnEnable) {
            this.startTween();
        }
    });

    if (this.startOnInit) {
        if (pc.util.EXPLICIT) console.log("start tweening");
        this.startTween();
    }
};

// update code called every frame
TweenRotation.prototype.update = function(dt) {
    // Only execute code if this.time is between 0 and this.duration + this.startDelay
    if (this.time >= 0 && this.time <= this.duration + this.startDelay) {
        // Update time
        this.updateTime(dt);

        // Only update opacity after the start delay.
        if (this.time > this.startDelay) {
            // Formula: rotation = initRotation + (from - (from - to) * curve)
            this._newRotation
                .set(this.from.x, this.from.y, this.from.z)
                .sub(this.to)
                .scale(this.curve.value((this.time - this.startDelay) / this.duration))
                .sub2(this.from, this._newRotation)
                .add(this.initRotation);
            if (this.debug) {
                console.log(this.time, newRotation.toString());
            }

            this.entity.setLocalEulerAngles(this._newRotation.x, this._newRotation.y, this._newRotation.z);
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
TweenRotation.prototype.updateTime = function(dt) {
    this.time += (this.ignoreTimeScale ? (this.app._time - this.oldTime) / 1000 : dt);
};

TweenRotation.prototype.setInitRotation = function(x, y, z) {
    this.entity.setLocalEulerAngles(x, y, z);
    this.initRotation.set(this.entity.getLocalEulerAngles().x, this.entity.getLocalEulerAngles().y, this.entity.getLocalEulerAngles().z);
};

/*
 * Set the correct value for starting a tween
 * This method can also be called to start a new tween
 */
TweenRotation.prototype.startTween = function() {
    this.time = 0;
    this.from.set(this.initFrom.x, this.initFrom.y, this.initFrom.z);
    this.to.set(this.initTo.x, this.initTo.y, this.initTo.z);
    this.entity.setLocalEulerAngles(this.from.x, this.from.y, this.from.z);
    this.oldTime = this.app._time;
};