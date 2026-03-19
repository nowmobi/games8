function adService() {
    this.loadRewardState = -1;
    this.n = -1;
    this.a = 1;
    this.o = 2;
    this.l = 3;

}

adService.prototype.startPreLoad = function() {
        setInterval(this.checkHasAd.bind(this), 30000);
        //this.checkHasAd();
    },

    adService.prototype.checkHasAd = function() {
        var t = this;
        if (this.loadRewardState !== this.o && this.loadRewardState !== this.a)
            this.loadRewardedVideo()
    },

    adService.prototype.loadRewardedVideo = function(e) {
        var t = this;

        if (this.loadRewardState !== this.o && this.loadRewardState !== this.a) {
            if (typeof gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
                t.loadRewardState = this.a
                gdsdk.preloadAd('rewarded').then(response => {
                    //cc.log("loadRewardedVideo video preloaded.");
                    t.loadRewardState = t.o;
                }).catch(error => {
                    t.loadRewardState = t.n;
                    //cc.log("loadRewardedVideo video failed to preload:" + error.message);
                });
            }
        }

    },

    adService.prototype.showRewardedVideo = function(e, t) {
        var i = this;

        return new Promise(function(ts, rs) {
            if (typeof gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
                gdsdk.showAd('rewarded').then(function() {
                    //cc.log("showRewardedVideo ok.");
                    //e && e(!0);
                    ts();
                    i.loadRewardState = i.n;
                }).catch(function(e) {
                    //cc.log("showRewardedVideo error : " + e.message);
                    //t && t(!1);
                    rs();
                    i.loadRewardedVideo();
                });
            } else rs();
        });
    }