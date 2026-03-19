var CoinParticle = pc.createScript('coinParticle');

pc.extend(CoinParticle.prototype, {

    initialize: function() {

        this.compileShader();

        this.activeDelta = 1;
        this.particleTime = 0.2;
        this.particleMesh = this.entity.model.meshInstances[0];
    },

    update: function(dt) {

        this.activeDelta += dt / this.particleTime;

        this.entity.setLocalPosition(0, pc.playerScript.isDucking() ? -0.86 : -0.02, 0.45);
        this.particleMesh.material.setParameter('alpha',
            Math.cos(Math.min(this.activeDelta, 0.5) * Math.PI) * 0.8);

        if (this.activeDelta >= this.particleTime) {
            this.entity.enabled = false;
        }
    },

    activateParticle: function() {
        this.activeDelta = 0;
        this.entity.enabled = true;
    },

    // Move this to seperate class
    compileShader: function() {
        var material = new pc.Material();

        material.name = 'CoinParticle';
        material.alphaWrite = true;
        material.alphaToCoverage = false; //true;
        //material.blendType = pc.BLEND_NORMAL;
        material.blendType = 6;

        material.shader = new pc.Shader(this.app.graphicsDevice, {
            attributes: {
                aPOS: pc.SEMANTIC_POSITION,
                aUV0: pc.SEMANTIC_TEXCOORD0
            },
            vshader: 'precision ' + pc.quality.device.precision + ' float;' +
                'attribute vec3 aPOS;' +
                'attribute vec2 aUV0;' +
                'uniform mat4 matrix_model;' +
                'uniform mat4 matrix_viewProjection;' +
                'uniform float alpha;' +
                'varying vec2 v2f_UV0;' +
                'varying float v2f_camZNormal;' +
                'void main(void){' +
                'v2f_UV0=aUV0;' +
                'gl_Position=matrix_viewProjection*matrix_model*vec4(aPOS,1.0);}',
            fshader: 'precision ' + pc.quality.device.precision + ' float;' +
                'uniform sampler2D uDiffuseMap;' +
                'varying vec2 v2f_UV0;' +
                'varying float v2f_camZNormal;' +
                'uniform float alpha;' +
                'void main(void){' +
                'vec4 color=texture2D(uDiffuseMap,v2f_UV0);' +
                'gl_FragColor=vec4(color.rgb,alpha*color.a);}'
        });

        material.setParameter('uDiffuseMap', this.app.assets.find("CoinPulse.png").resource);

        this.entity.model.meshInstances[0].material = material;
    }
});