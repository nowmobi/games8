var CurvedObject = pc.createScript('WorldBender');

//
//  WorldBender - builds curved shared materials
//

WorldBender = {

    active: false,
    camera: undefined,
    materials: {},

    vsNormal: null,
    vsColor: null,
    vsNormalAnim: null,
    vsColorAnim: null,
    fsNormal: null,
    fsColor: null,

    configure: function(ctx) {
        WorldBender.active = true;
        WorldBender.camera = ctx.root.findByTag('GameCam')[0];

        WorldBender.vsNormal = WorldBender.createVertex();
        WorldBender.vsColor = WorldBender.createVertex(true);
        WorldBender.vsNormalAnim = WorldBender.createVertex(false, true);
        WorldBender.vsColorAnim = WorldBender.createVertex(true, true);

        WorldBender.fsNormal = WorldBender.createFragment();
        WorldBender.fsColor = WorldBender.createFragment(true);
    },

    update: function() {
        var cameraZ = WorldBender.camera.getPosition().x - 100.0;
        for (var id in WorldBender.materials) {
            WorldBender.materials[id].setParameter('cameraZ', cameraZ);
        }
    },

    getDeviceRatio: function() {
        return (pc.quality.device.height / pc.quality.device.width).toFixed(2);
        //return Math.max(pc.quality.device.height / pc.quality.device.width, 1.64).toFixed(2);
    },

    getVertex: function(anim, color) {
        if (anim && color) return WorldBender.vsColorAnim;
        else if (anim) return WorldBender.vsNormalAnim;
        else if (color) return WorldBender.vsColor;
        else return WorldBender.vsNormal;
    },

    getFragment: function(color, customBias) {
        if (customBias) return WorldBender.createFragment(color, customBias);
        else if (color) return WorldBender.fsColor;
        else return WorldBender.fsNormal;
    },

    createVertex: function(color, anim) {

        return 'precision ' + pc.quality.device.precision + ' float;' +
            'attribute vec3 aPOS;' +
            'attribute vec2 aUV0;' +
            (!!color ? 'attribute vec3 aUVC;' +
                'varying vec3 v2f_UVC;' : '') +

            (!!anim ? 'attribute vec4 aBoneWeights;' +
                'attribute vec4 aBoneIndices;' +
                'uniform sampler2D texture_poseMap;' : '') +

            'uniform mat4 matrix_model;' +
            'uniform mat4 matrix_viewProjection;' +
            'varying float cameraZ;' +

            'varying vec2 v2f_UV0;' +
            'varying float v2f_camZNormal;' +

            (!!anim ? 'mat4 getBoneMatrix(const in float i){' +
                'float x=mod(i*4.0,16.0);' +
                'float y=0.0625*(floor(i*4.0/16.0)+0.5);' +
                'return mat4(' +
                'texture2D(texture_poseMap,vec2(0.0625*(x+0.5),y)),' +
                'texture2D(texture_poseMap,vec2(0.0625*(x+1.5),y)),' +
                'texture2D(texture_poseMap,vec2(0.0625*(x+2.5),y)),' +
                'texture2D(texture_poseMap,vec2(0.0625*(x+3.5),y)));' +
                '}' +

                'mat4 getModelMatrix(){' +
                'return matrix_model*(' +
                'getBoneMatrix(aBoneIndices.x)*aBoneWeights.x+' +
                'getBoneMatrix(aBoneIndices.y)*aBoneWeights.y+' +
                'getBoneMatrix(aBoneIndices.z)*aBoneWeights.z+' +
                'getBoneMatrix(aBoneIndices.w)*aBoneWeights.w);}' : '') +

            // WorldBender - Vertex Shader

            'void main(void){' +
            'v2f_UV0=aUV0;' +
            (!!color ? 'v2f_UVC=aUVC;' : '') +

            'gl_Position=matrix_viewProjection*' +
            (!!anim ? 'getModelMatrix()' : 'matrix_model') + '*vec4(aPOS,1.0);' +
            'v2f_camZNormal=clamp(distance(gl_Position.z,cameraZ)*0.0074,0.0,1.0);' +
            'gl_Position-=vec4(pow(v2f_camZNormal*6.8,2.0)*' + WorldBender.getDeviceRatio() + ',pow(v2f_camZNormal*5.2,2.2),0,0);}';
    },

    createFragment: function(color, customBias) {

        var bias = customBias || pc.quality.alphaBias.toPrecision(2);
        return 'precision ' + pc.quality.device.precision + ' float;' +
            'uniform sampler2D uDiffuseMap;' +
            'varying vec2 v2f_UV0;' +
            (!!color ? 'varying vec3 v2f_UVC;' : '') +
            'varying float v2f_camZNormal;' +

            // World Bender - Fragment Shader

            'void main(void){' +
            'vec4 color=texture2D(uDiffuseMap,v2f_UV0);' +
            'float alpha=clamp(' + bias + '-(v2f_camZNormal*' + bias + '),0.0,1.0);' +
            'gl_FragColor=vec4(color.rgb' + (!!color ? '*v2f_UVC.rgb' : '') + ',alpha*color.a);}';
    },

    compileShader: function(ctx, color, anim, bias) {

        var shaderCode = {
            attributes: {
                aPOS: pc.SEMANTIC_POSITION,
                aUV0: pc.SEMANTIC_TEXCOORD0
            },
            vshader: null,
            fshader: null
        };

        if (!!color) shaderCode.attributes.aUVC = pc.SEMANTIC_COLOR;
        if (!!anim) {
            shaderCode.attributes.aBoneIndices = pc.SEMANTIC_BLENDINDICES;
            shaderCode.attributes.aBoneWeights = pc.SEMANTIC_BLENDWEIGHT;
        }
        shaderCode.vshader = WorldBender.getVertex(!!anim, !!color);
        shaderCode.fshader = WorldBender.getFragment(!!color, bias);

        return new pc.Shader(ctx.graphicsDevice, shaderCode);
    },

    createMaterial: function(ctx, entity, mesh) {

        var diffuseMap = mesh.material.diffuseMap;
        var alphaBlend = !!mesh.material.opacityMap;

        var isBullseye = !!diffuseMap && diffuseMap.name.includes("Bullseye");
        var animShader = mesh.node.name.includes('Polygoon') || mesh.node.name.includes('Animation');
        var hasColor = mesh.mesh.vertexBuffer.format.hasColor;

        var id = 'wb_' + (hasColor ? 'vc_' : '') + (animShader ? 'anim_' : '') + (!!diffuseMap ? diffuseMap.name : '');

        if (!!!WorldBender.materials[id]) {

            var material = new pc.Material();

            material.name = id;
            material.alphaWrite = true;
            material.alphaToCoverage = alphaBlend;
            material.blendType = alphaBlend ? pc.BLEND_NORMAL : pc.quality.blendType;

            material.shader = WorldBender.compileShader(ctx, hasColor, animShader, isBullseye ? 2.8 : 0);
            WorldBender.materials[id] = material;

            // Set diffuseMap (and provide fallback)
            material.setParameter('uDiffuseMap', diffuseMap || ctx.assets.get(13960965).resource);
            //material.setParameter('uDiffuseMap', diffuseMap || null); //ctx.assets.get(13960965).resource);
            //console.log(!!!mesh.material.diffuseMap, mesh.material.diffuseMap, mesh)
            //if(!!!mesh.material.diffuseMap) console.log(this.entity.name, 'diffuseMap is null. Happens seldomly/randomly. Please report to Nick!');

            //if(!!!mesh.material.diffuseMap) {
            //    mesh.enabled = false;
            //     return;
            //}

            // Material rendering overrides
            if (mesh.material.diffuseMap && pc.util.strHasWord(mesh.material.diffuseMap.name, 'GodRays|Starburst')) {
                material.alphaToCoverage = false;
                material.blendType = 6;
            }
        }

        return WorldBender.materials[id];
    }
};

pc.extend(CurvedObject.prototype, {

    initialize: function() {

        // WorldBender global initialize
        if (!!!WorldBender.active) WorldBender.configure(this.app);

        if (!!!this.entity.model.meshInstances) {
            console.warn('WorldBender: deactivated ' + this.entity.name + ' (no meshInstances)');
            this.enabled = false;
            return;
        }

        this.entity.model.castShadows = false;
        this.entity.model.receiveShadows = false;
        this.entity.model.castShadowsLightmap = false;
        this.entity.model.lightmapped = false;

        // Not sure about this one (is optimization but model moves infrequently)
        this.entity.model.isStatic = true;

        if (pc.util.strHasWord(this.entity.model.meshInstances[0].node.name, "Character|Ronaldo|Hugo")) {
            this.entity.model.isStatic = false;
        }

        for (var i = 0; i < this.entity.model.meshInstances.length; i += 1) {
            // Deactivate meshInstances without materials
            if (pc.util.strHasWord(this.entity.model.meshInstances[i].material.name, 'Default Mat|Untitled')) {
                this.entity.model.meshInstances[i].visible = false;
                continue;
            }

            // Assign custom shader material to meshInstance
            this.entity.model.meshInstances[i].material = WorldBender.createMaterial(
                this.app, this.entity, this.entity.model.meshInstances[i]);
        }
    }
});