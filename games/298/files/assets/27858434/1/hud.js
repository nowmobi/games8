var Hud = pc.createScript('hud');

pc.extend(Hud.prototype, {
    // Called once after all resources are loaded and before the first update
    initialize: function() {
        this.initializeCanvas();

        this.createHud();
    },

    initializeCanvas: function() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 256;
        this.canvas.height = 256;

        this.context = this.canvas.getContext("2d");

        this.texture = new pc.Texture(this.app.graphicsDevice, {
            format: pc.PIXELFORMAT_R8_G8_B8_A8,
            autoMipmap: true
        });

        this.texture.setSource(this.canvas);
        this.texture.minFilter = pc.FILTER_LINEAR_MIPMAP_LINEAR;
        this.texture.magFilter = pc.FILTER_LINEAR;
        this.texture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
        this.texture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;

        this.updateText("");

        this.entity.model.material.diffuseMap = this.texture;
        //this.entity.model.material.opacityMap = this.texture;
        this.entity.model.material.blendType = pc.BLEND_NORMAL;
        this.entity.model.material.update();
    },

    updateText: function(text) {
        var width = this.canvas.width;
        var height = this.canvas.height;


        this.context.fillStyle = "rgba(255, 0, 0, 255)";
        this.context.fillRect(0, 0, width, height);


        this.context.fillStyle = "rgba(255, 255, 255, 255)";
        this.context.font = "30pt Verdana";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(text, width / 2, height / 2);

        this.texture.upload();

    },

    createHud: function() {
        this.hudContainer = document.createElement("div");
        this.hudContainer.style.position = "absolute";
        this.hudContainer.style.top = "0px";
        this.hudContainer.style.right = "0px";
        this.hudContainer.style.border = "solid red 2px";

        document.body.appendChild(this.hudContainer);

        this.textInput = document.createElement("input");
        this.textInput.setAttribute("type", "text");
        this.textInput.id = "exampleTextInput";
        this.textInput.value = "";
        this.textInput.style.border = "solid blue 1px";
        this.textInput.style.fontSize = "3em";
        this.textInput.addEventListener("input", this.textInputHandler.bind(this));

        this.hudContainer.appendChild(this.textInput);
    },

    textInputHandler: function(event) {
        console.info("getting text", this.textInput.value);
        this.updateText(this.textInput.value);
    },

    // Called every frame, dt is time in seconds since last update
    update: function(deltaTime) {
        this.entity.rotate(0, 1, 0.2);
    }


});