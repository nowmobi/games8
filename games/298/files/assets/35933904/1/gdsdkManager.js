var GdsdkManager = pc.createScript('gdsdkManager');

pc.extend(GdsdkManager.prototype, {

    initialize: function() {

        pc.gdsdkManager = this;

        this._preloaded = true;



    },

    playAd: function() {



        new Promise(function(resolve, reject) {
            reject();
        });
    },

    playRewardedAd: function() {



        new Promise(function(resolve, reject) {
            reject();
        });
    },

    preloadAd: function() {

    },

});