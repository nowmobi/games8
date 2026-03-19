var Text = pc.createScript('text');

Text.attributes.add('text', {
    type: 'string',
    default: 'Hello World'
});
Text.attributes.add('bold', {
    type: 'boolean',
    default: false
});
Text.attributes.add('gradient', {
    type: 'boolean',
    default: false,
    title: 'Gradient'
});
Text.attributes.add('gradientTop', {
    type: 'rgba',
    default: [1, 1, 1, 1],
    title: 'Gradient Top'
});
Text.attributes.add('gradientBottom', {
    type: 'rgba',
    default: [0, 0, 0, 1],
    title: 'Gradient Bottom'
});
Text.attributes.add('anchor', {
    type: 'vec4',
    default: [0.5, 0.5, 0.5, 0.5],
    title: 'Anchor'
});
Text.attributes.add('pivot', {
    type: 'vec2',
    default: [0.5, 0.5],
    title: 'Pivot'
});
Text.attributes.add('fontSize', {
    type: 'number',
    default: 32,
    title: 'Font Size'
});
Text.attributes.add('effect', {
    type: 'number',
    enum: [{
            'None': 0
        },
        {
            'Shadow': 1
        },
        {
            'Outline': 2
        },
        {
            'Outline 8': 3
        },
    ],
    title: 'Effect Type'
});

Text.attributes.add('effectThickness', {
    type: 'number',
    default: 4,
    title: 'Effect Thickness'
});
Text.attributes.add('effectColor', {
    type: 'rgba',
    default: [0, 0, 0, 1],
    title: 'Effect Color'
});
Text.attributes.add('cloneObject', {
    type: 'boolean',
    default: false,
    title: 'Clone Object'
});

Text.prototype.initialize = function() {
    return;
    this.setText(this.text);

    if (!this.cloneObject) {
        this.createCanvas();
        this.createNewTexture();
        this.updateText();
        this.createElement();
    }

    this.on('attr', function(name, value, prev) {
        this.updateText();
    });

    /*    this.on('destroy', function() {
            this.canvas = null;
            this.entity.removeComponent('element'); 
        });*/
};

/*
 * Create or update the context with new text.
 */

Text.prototype.updateText = function() {
    // Create a new context
    var ctx = this.context;
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    this.effectOffset = this.effect === 0 ? 0 : this.effectThickness;

    // Clear the context
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Return scale to the original scale
    if (this.scaleX) {
        ctx.scale(1 / this.scaleX, 1 / this.scaleY)
    }

    // Set context settings
    ctx.font = this.bold ? 'bold ' + this.fontSize + 'px Blambot' : this.fontSize + 'px Blambot';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    // Calculate the metrics of the text
    var metrics = ctx.measureText(this.text);
    this.textWidth = metrics.width + this.effectOffset * 2;
    this.textHeight = this.fontSize + this.effectOffset * 2;
    this.scaleX = (ctx.canvas.width / this.textWidth);
    this.scaleY = (ctx.canvas.height / this.textHeight);

    ctx.scale(this.scaleX, this.scaleY);

    this.newX = (w / 2) / this.scaleX + this.effectOffset;
    this.newY = (h / 2) / this.scaleY + this.effectOffset;

    this.setGradient(ctx);
    this.setEffect(ctx);

    ctx.fillText(this.text, this.effectOffset, this.newY);
};

/*
 * Set the vertical gradient of the text
 */
Text.prototype.setGradient = function(ctx) {
    if (this.gradient) {
        var grd = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height / this.scaleY);
        grd.addColorStop(0, this.gradientTop);
        grd.addColorStop(1, this.gradientBottom);
        ctx.fillStyle = grd;
    } else {
        ctx.fillStyle = this.gradientTop;
    }
};

/*
 * Set the effect of the text
 */
Text.prototype.setEffect = function(ctx) {
    switch (this.effect) {
        case 0:
            break;
        case 1:
            ctx.shadowColor = this.effectColor;
            ctx.shadowOffsetY = this.effectThickness;
            ctx.shadowOffsetX = this.effectThickness;
            break;
        case 2:
            ctx.strokeStyle = this.effectColor;
            ctx.lineWidth = this.effectThickness * 3;
            ctx.strokeText(this.text, this.effectOffset, this.newY);
            break;
        case 3:
            ctx.strokeStyle = this.effectColor;
            ctx.lineWidth = this.effectThickness * 3;
            ctx.strokeText(this.text, this.effectOffset, this.newY);
            break;
    }
};


/*
 * This method can be called to set new text or update it.
 */

Text.prototype.setText = function(text) {
    if (!this.entity.element) return;
    this.entity.element.text = String(text);
};

/*
 * Create a new texture, used by the image element
 */
Text.prototype.createNewTexture = function() {
    // Return if a texture already exists
    if (this.texture) {
        return;
    }

    this.texture = new pc.Texture(this.app.graphicsDevice, {
        format: pc.PIXELFORMAT_R8_G8_B8_A8,
        autoMipmap: true
    });

    this.texture.setSource(this.canvas);

    this.texture.minFilter = pc.FILTER_LINEAR_MIPMAP_LINEAR;
    this.texture.magFilter = pc.FILTER_LINEAR;
    this.texture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
    this.texture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;
};

/*
 * Create a new image element with the correct parameters.
 */
Text.prototype.createElement = function() {
    if (this.entity.element) {
        this.element = this.entity.element;

        return;
    }

    this.entity.addComponent('element', {
        type: 'image',
        texture: this.texture,
        width: this.textWidth,
        height: this.textHeight,
        anchor: this.anchor,
        pivot: this.pivot,
    });

    this.element = this.entity.element;
};

/*
 * Set the new texture to the image element
 */
Text.prototype.updateTexture = function() {
    this.element.width = this.textWidth;
    this.element.height = this.textHeight;
    this.element.texture.setSource(this.canvas);
};

/*
 * Create a new canvas
 */
Text.prototype.createCanvas = function() {
    // Return if a canvas already exists.
    if (this.canvas) {
        return;
    }
    // Create a canvas to do the text rendering
    this.canvas = document.createElement('canvas');
    this.canvas.width = 720;
    this.canvas.height = 1280;
    this.context = this.canvas.getContext('2d');
};