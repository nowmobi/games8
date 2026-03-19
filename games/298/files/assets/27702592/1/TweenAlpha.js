var TweenAlpha = pc.createScript('tweenAlpha');

TweenAlpha.attributes.add('initFrom', {
    type: 'number',
    default: 1,
    title: 'From'
});
TweenAlpha.attributes.add('initTo', {
    type: 'number',
    default: 0,
    title: 'To'
});
TweenAlpha.attributes.add('playStyle', {
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

TweenAlpha.attributes.add('duration', {
    type: 'number',
    default: 1,
    title: 'duration'
});
TweenAlpha.attributes.add('curve', {
    type: 'curve',
    title: 'Animation Curve'
});
TweenAlpha.attributes.add('ignoreTimeScale', {
    type: 'boolean',
    default: true,
    title: 'Ignore Time Scale'
});
TweenAlpha.attributes.add('startDelay', {
    type: 'number',
    default: 0,
    title: 'Start Delay'
});
TweenAlpha.attributes.add('debug', {
    type: 'boolean',
    default: false,
    title: 'Show Debug'
});
TweenAlpha.attributes.add('startOnEnable', {
    type: 'boolean',
    default: true,
    title: 'Start on Enable'
});
TweenAlpha.attributes.add('startOnInitialize', {
    type: 'boolean',
    default: true,
    title: 'Start on Initialize'
});

// initialize code called once per entity
TweenAlpha.prototype.initialize = function() {
    this.time = this.startOnInitialize ? 0 : this.duration + this.startDelay;
    this.oldTime = this.app._time || 0;
    this.from = this.initFrom;
    this.to = this.initTo;

    // List of all elements
    this.elements = this.elements || [];

    this.getAllElementComponents(this.entity);

    if (this.startOnInitialize) {
        this.startTween();
    }

    this.on('state', function(enabled) {
        if (enabled && this.startOnEnable) {
            this.startTween();
        }
    });

};

// update code called every frame
TweenAlpha.prototype.update = function(dt) {
    // Only execute code if this.time is between 0 and this.duration + this.startDelay
    if (this.isActive()) {
        // Update time
        this.updateTime(dt);

        // Only update opacity after the start delay.
        if (this.time > this.startDelay) {
            // Update opacity
            var opacity = this.from - this.curve.value((this.time - this.startDelay) / this.duration) * (this.from - this.to);
            this.setAllElementOpacity(opacity);

            if (this.debug) {
                console.log(this.entity.name, this.time, opacity);
            }
        }

        // Set new old time
        this.oldTime = this.app._time;
    }

    // Execute if this.time is higher than this.duration + this.startDelay
    if (this.time >= this.duration + this.startDelay) {
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
TweenAlpha.prototype.updateTime = function(dt) {
    this.time += this.ignoreTimeScale ? (this.app._time - this.oldTime) / 1000 : dt;
};

/*
 * Set the correct value for starting a tween
 * This method can also be called to start a new tween
 */
TweenAlpha.prototype.startTween = function() {
    this.time = 0;
    this.from = this.initFrom;
    this.to = this.initTo;
    this.setAllElementOpacity(this.from);
    this.oldTime = this.app._time;
};

/*
 * Recursive method to get all elements
 */
TweenAlpha.prototype.getAllElementComponents = function(entity) {
    var element = entity.element;

    if (element !== undefined && element.opacity !== null && element.opacity !== undefined) {
        this.elements.push(entity.element);
    }

    var self = this;
    entity.children.forEach(function(child) {
        self.getAllElementComponents(child);
    });
};

/*
 * Set opacity for all elements.
 */
TweenAlpha.prototype.setAllElementOpacity = function(opacity) {
    if (!this.elements) {
        this.elements = [];
        this.getAllElementComponents(this.entity);
    }

    this.elements.forEach(function(element) {
        element.opacity = opacity;
        if (element.shadowColor) {
            element.shadowColor = new pc.Color(element.shadowColor.r, element.shadowColor.g, element.shadowColor.b, opacity);
        }
    });
};

TweenAlpha.prototype.isActive = function() {
    return this.time >= 0 && this.time <= this.duration + this.startDelay;
};