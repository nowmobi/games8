var CameraShader = pc.createScript('cameraShader');

//
//  CameraShader - Post processing effects
//

// https://developer.playcanvas.com/en/tutorials/custom-posteffect/
pc.extend(CameraShader.prototype, {

    initialize: function() {

        this.deltaShake = 1;
        this.entity.camera.fov = 48;

        // Increase FOV for devices with extreme width/height ratio
        if (pc.quality.device.height / pc.quality.device.width > 1.9) this.entity.camera.fov = 52;

        this.entity.camera.frustumCulling = pc.quality.frustumCulling;

        this.skyShader = new pc.SkyShader(this.app.graphicsDevice, this.app, this.entity);

        // postEffectQueue: effects in queue are order-sensitive
        this.queue = this.entity.camera.postEffects;
        this.queue.addEffect(this.skyShader);

        // Apply Multisampling (AA) to the skybox InputTarget
        this.queue.effects[0].inputTarget._samples = pc.quality.multiSampling;
    },

    update: function(dt) {
        this.skyShader.cameraEul = this.entity.getEulerAngles();
        this.skyShader.cameraPos = this.entity.getPosition();
        this.skyShader.updateShader(this.deltaShake += dt || 1);
        this.skyShader.time = this.app._time;
    },

    shakeScreen: function(enable) {
        this.deltaShake = enable ? 0 : 1;
    }
});

//
// Skybox Shader - PostEffect component extension
//

pc.extend(pc, function() {

    var SkyShader = function(graphicsDevice, app, entity) {

        this.cameraPos = entity.getPosition();
        this.cameraEul = entity.getEulerAngles();
        this.cameraRatio = 2 * Math.tan(entity.camera.fov * Math.PI / 360);

        this.rendDist = 140;
        this.skyboxCenter = 0.5;
        this.arguments = [0.0, 0.0, 0.0];
        this.time = 0;

        this.shader = new pc.Shader(graphicsDevice, {

            attributes: {
                aPOS: pc.SEMANTIC_POSITION
            },

            vshader: 'precision ' + graphicsDevice.precision + ' float;' +
                'attribute vec2 aPOS;' +
                'varying vec2 v2f_UV0;' +

                // Camera Skybox - Vertex Stage

                'void main(void){' +
                'gl_Position=vec4(aPOS,0.0,1.0);' +
                'v2f_UV0=(aPOS.xy+1.0)*0.5;}',

            fshader: 'precision ' + graphicsDevice.precision + ' float;' +
                'varying vec2 v2f_UV0;' +
                'uniform sampler2D colorBuffer;' +
                //'uniform float horizon;' +
                'uniform vec3 args;' +
                'const vec3 skyColor=vec3(0.0,0.28,1.0);' +
                'const vec3 gndColor=vec3(0.935,0.82,0.88);' +

                // Camera Skybox - Fragment Stage

                'void main(void){' +
                'vec4 buffColor=texture2D(colorBuffer,vec2(v2f_UV0.x+args.x,v2f_UV0.y+args.y));' +
                'vec3 bgColor=mix(gndColor.rgb,skyColor.rgb,-1.65+((v2f_UV0.y+args.z)*3.54));' +
                'gl_FragColor=vec4(mix(bgColor,buffColor.rgb,buffColor.a),1.0);}'
        });
    };

    SkyShader = pc.inherits(SkyShader, pc.PostEffect);
    SkyShader.prototype = pc.extend(SkyShader.prototype, {
        //'vec3 bgColor=mix(gndColor.rgb,skyColor.rgb,-1.9+((v2f_UV0.y+heightNormal/80.0)*3.0));' +

        render: function(inputTarget, outputTarget, rect) {

            // Set the input render target to the shader. This is the image rendered from our camera
            this.device.scope.resolve("colorBuffer").setValue(inputTarget.colorBuffer);
            //this.device.scope.resolve("horizon").setValue(this.skyboxCenter);
            this.device.scope.resolve("args").setValue(this.arguments);

            pc.drawFullscreenQuad(this.device, outputTarget, this.vertexBuffer, this.shader, rect);
        },

        updateShader: function(deltaShake) {

            // Perform an anti-perspective on the target to simulate world placement
            var eulHeight = Math.tan((pc.sceneManager.isInHomeScene() ? -12 : this.cameraEul.x) * Math.PI / 180) * this.rendDist;
            var eulDist = Math.sqrt(Math.pow(this.rendDist, 2) + Math.pow(eulHeight, 2));

            this.skyboxCenter = (pc.sceneManager.isInHomeScene() ? 2.75 : this.cameraPos.y) / (this.cameraRatio * this.rendDist);
            this.skyboxCenter += eulHeight / (this.cameraRatio * eulDist);

            this.arguments[0] = Math.sin(this.time + deltaShake * Math.PI) * pc.util.clamp01(1 - deltaShake * 3.2) * 0.016;
            this.arguments[1] = Math.cos(this.time + deltaShake * Math.PI) * pc.util.clamp01(1 - deltaShake * 3.2) * 0.016;
            this.arguments[2] = this.skyboxCenter;
        }

    });

    return {
        SkyShader: SkyShader
    };
}());