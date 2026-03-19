var TweenTime = pc.createScript('tweenTime');

TweenTime.attributes.add('from', {
    type: 'number',
    default: 0,
    title: 'From'
});
TweenTime.attributes.add('to', {
    type: 'number',
    default: 1,
    title: 'To'
});
TweenTime.attributes.add('playStyle', {
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
TweenTime.attributes.add('curve', {
    type: 'curve',
    title: 'Animation Curve'
});

TweenTime.attributes.add('duration', {
    type: 'number',
    default: 1,
    title: 'duration'
});
TweenTime.attributes.add('ignoreTimeScale', {
    type: 'boolean',
    default: true,
    title: 'Ignore Time Scale'
});
TweenTime.attributes.add('startDelay', {
    type: 'number',
    default: 0,
    title: 'Start Delay'
});
TweenTime.attributes.add('debug', {
    type: 'boolean',
    default: false,
    title: 'Show Debug'
});
TweenTime.attributes.add('startOnEnable', {
    type: 'boolean',
    default: true,
    title: 'Start on Enable'
});
TweenTime.attributes.add('startOnInit', {
    type: 'boolean',
    default: true,
    title: 'Start on Initialize'
});


// initialize code called once per entity
TweenTime.prototype.initialize = function() {
    this.time = this.duration + this.startDelay;
    this.oldTime = this.app._time || 0;

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
TweenTime.prototype.update = function(dt) {
    // Only execute code if this.time is between 0 and this.duration + this.startDelay
    if (this.time >= 0 && this.time <= this.duration + this.startDelay) {
        // Update time
        this.updateTime(dt);

        // Only update opacity after the start delay.
        if (this.time > this.startDelay) {
            this.app.timeScale = 1 - (this.to - this.from) * this.curve.value((this.time - this.startDelay) / this.duration);

            if (this.debug) {
                console.log(this.app.timeScale);
            }
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

TweenTime.prototype.updateTime = function(dt) {
    this.time += (this.ignoreTimeScale ? (this.app._time - this.oldTime) / 1000 : dt);
};

TweenTime.prototype.startTween = function() {
    this.time = 0;
    this.app.timeScale = this.from;
    this.oldTime = this.app._time;
};