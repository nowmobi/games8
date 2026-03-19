var MagnetPulse = pc.createScript('magnetPulse');

MagnetPulse.attributes.add('scale', {
    type: 'curve',
    default: {
        keys: [0, 1, 1, 0]
    },
    title: 'Scale'
});


MagnetPulse.attributes.add('color', {
    type: 'curve',
    color: 'rgba',
    title: 'Color'
});

MagnetPulse.attributes.add('nWaves', {
    type: 'number',
    default: 2,
    title: 'Amount of waves'
});

MagnetPulse.attributes.add('duration', {
    type: 'number',
    default: 2,
    title: 'Duration'
});

// initialize code called once per entity
MagnetPulse.prototype.initialize = function() {
    for (var i = 0; i < this.nWaves - 1; i += 1) {
        var clonedWave = this.entity.children[0].clone();
        this.entity.addChild(clonedWave);
    }

    this.app.on('magnetAttractor:setState', this.setState, this);

    this.delay = this.duration / this.nWaves;

    this.time = 0;

    this.setState(false);
};

MagnetPulse.prototype.setState = function(enable) {
    for (var i = 0; i < this.entity.children.length; i += 1) {
        this.entity.children[i].enabled = enable;
    }

    this.entity.enabled = enable;
};

// update code called every frame
MagnetPulse.prototype.update = function(dt) {
    this.time += dt;

    if (this.time > this.duration) {
        this.time -= this.duration;
    }

    for (var i = 0; i < this.entity.children.length; i += 1) {
        var time = this.time + this.delay * i;
        if (time > this.duration) {
            time -= this.duration;
        }
        var scale = this.scale.value(time / this.duration);
        var color = this.color.value(time / this.duration);
        this.entity.children[i].setLocalScale(scale, scale, scale);

        this.entity.children[i].element.color.set(color[0], color[1], color[2]);
        this.entity.children[i].element.opacity = color[3];
    }
};