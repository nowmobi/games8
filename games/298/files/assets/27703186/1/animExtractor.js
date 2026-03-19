var AnimExtractor = pc.createScript('animExtractor');

//
//  Extract animation from JSON animation file
//    usage: specify times and download from console log
//

// It seems uploading animations yourself is not possible atm

pc.extend(AnimExtractor.prototype, {

    initialize: function() {

        // Safeguard against placement in other scenes
        //if(document.URL.toString().indexOf('653189') === 0) this.entity.destroy();

        this.extractAnim(12506313, 'levelup', 314, 359);
        this.extractAnim(12506313, 'hooghouden1', 125, 188);
        this.extractAnim(12506313, 'hooghouden2', 188, 241);
        this.extractAnim(12506313, 'kickscreen', 363, 384);
        this.extractAnim(12506313, 'saveme', 435, 517);

        // Download scene
        //window.location.href = window.URL.createObjectURL(new Blob([json], { type: 'octet/stream'}));
        //console.log(this.jsonScene, json);
    },

    extractAnim: function(assetId, animName, startFrame, endFrame) {

        var asset = this.app.assets.get(assetId).resource;

        //console.log(this.app.assets.get(assetId));
        console.log(this.app.assets.get(assetId).resource);

        var anim = {};
        anim.animation = {};
        anim.animation.name = animName;
        anim.animation.version = asset.version;
        anim.animation.duration = (endFrame - startFrame) * 0.1;
        anim.animation.nodes = [];

        // missing defaults
        // missing NodeDict

        //asset.name = animName;
        //asset.duration = (endFrame - startFrame) * 0.1;

        // Traverse all bones in animation
        for (var i = 0; i < asset._nodes.length; i += 1) {

            var _defaults = {};
            //_defaults.s = asset._nodes[i]._defaults.s;
            console.log(asset._nodes[i].defaults);

            anim.animation.nodes.push({
                name: asset._nodes[i]._name,
                //defaults: _defaults, //asset._nodes[i].defaults,
                keys: asset._nodes[i]._keys.slice(startFrame, endFrame)
            });

            // Strip array of unwanted keyframes
            //asset.nodes[i]._keys = asset.nodes[i]._keys.slice(startFrame, endFrame);

            for (var j = 0; j < anim.animation.nodes[i].keys.length; j += 1) {

                // Reset timing from zero
                //asset.nodes[i]._keys[j].t = j * 0.1;
                anim.animation.nodes[i].keys[j].t = j * 0.1;
            }
        }

        console.log(animName);
        console.log(JSON.stringify(anim));
    }
});