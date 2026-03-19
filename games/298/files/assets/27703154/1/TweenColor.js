var TweenColor = pc.createScript('tweenColor');

TweenColor.attributes.add('colorCurve', {
    title: 'colorCurve',
    type: 'curve',
    color: 'rgba'

});

TweenColor.attributes.add('playStyle', {
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

TweenColor.attributes.add('duration', {
    type: 'number',
    default: 1,
    title: 'duration'
});
TweenColor.attributes.add('curve', {
    type: 'curve',
    title: 'Animation Curve'
});
TweenColor.attributes.add('ignoreTimeScale', {
    type: 'boolean',
    default: true,
    title: 'Ignore Time Scale'
});
TweenColor.attributes.add('startDelay', {
    type: 'number',
    default: 0,
    title: 'Start Delay'
});
TweenColor.attributes.add('debug', {
    type: 'boolean',
    default: false,
    title: 'Show Debug'
});
TweenColor.attributes.add('startOnEnable', {
    type: 'boolean',
    default: true,
    title: 'Start on Enable'
});
TweenColor.attributes.add('startOnInitialize', {
    type: 'boolean',
    default: true,
    title: 'Start on Initialize'
});


//
//      TweenColor - Doesn't work, dont use it
//

pc.extend(TweenColor.prototype, {

    initialize: function() {
        console.log(this.entity.element);

        this.currentColor = new pc.Color(1, 1, 1, 1);
        this.time = this.startOnInitialize ? 0 : this.duration + this.startDelay;
        this.oldTime = this.app._time || 0;
        this.from = 0;
        this.to = 1;

        // List of all elements
        this.elements = [];

        this.getElements(this.entity);

        if (this.startOnInitialize) {
            this.startTween();
        }

        this.on('state', function(enabled) {
            if (enabled && this.startOnEnable) {
                this.startTween();
            }
        });

    },

    update: function(dt) {

        if (this.isActive()) {

            this.updateTime(dt);

            if (this.time > this.startDelay) {

                this.setElementColor(this.from - this.curve.value((this.time - this.startDelay) / this.duration) * (this.from - this.to));

                if (this.debug) {
                    console.log(this.entity.name, this.time, opacity);
                }
            }

            this.oldTime = this.app._time;
        }

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
    },

    updateTime: function(dt) {

        this.time += this.ignoreTimeScale ? (this.app._time - this.oldTime) / 1000 : dt;
    },

    startTween: function() {

        this.time = 0;
        this.from = 0;
        this.to = 1;
        this.setElementColor(this.from);
        this.oldTime = this.app._time;
    },

    getElements: function(entity) {

        if (entity.element) {
            this.elements.push(entity.element);
        }

        // var self = this;
        // entity.children.forEach(function(child) {
        //     self.getElements(child); 
        // });
    },

    setElementColor: function(curveValue) {

        // this.currentColor = this.currentColor.set(
        //     this.colorCurve.value(curveValue)[0],
        //     this.colorCurve.value(curveValue)[1],
        //     this.colorCurve.value(curveValue)[2],
        //     this.colorCurve.value(curveValue)[3]
        // );

        for (var i = 0; i < this.elements.length; i += 1) {
            this.elements[i].color.set(
                this.colorCurve.value(curveValue)[0],
                this.colorCurve.value(curveValue)[1],
                this.colorCurve.value(curveValue)[2],
                this.colorCurve.value(curveValue)[3]
            );
        }

        this.entity.element.color.set(1, 1, 1, 1);
        this.entity.element.color.copy(this.currentColor);

        this.entity.element.material.update();
        //         this.elements.forEach(function(element) {
        //             //element.color = this.currentColor;
        //             console.log(element);
        //             console.log(element.color);
        //             console.log(this.currentColor);
        //             element.color.set(this.currentColor.r,this.currentColor.g,this.currentColor.b,this.currentColor.a);
        //             //element.color.r = this.currentColor.r;
        //             //element.color.g = this.currentColor.g;
        //             //element.color.b = this.currentColor.b;
        //             //element.color.a = this.currentColor.a;

        //         });
    },

    isActive: function() {

        return this.time >= 0 && this.time <= this.duration + this.startDelay;
    }
});