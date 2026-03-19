"use strict";
var GD_AD_WEB = "GD_AD_WEB",
    GDAdsInstance = function() {
        function GDAdsInstance() {
            this.isInited = !1
        }
        return GDAdsInstance.prototype.adsAsyncInit = function() {
            var e = this;
            return new Promise(function(n, o) {
                window.GD_OPTIONS = {
                    gameId: "c536thsbtmlsdbqpddfdb9uy9kn886vl",
                    advertisementSettings: {
                        debug: !0,
                        autoplay: !1,
                        locale: "en"
                    },
                    onEvent: function(o) {
                        switch (o.name) {
                            case "AD_ERROR":
                                console.log("ErrorType:", o.message), e.onSuccess && (e.onSuccess(!0), e.onSuccess = null), e.onComplete();
								sdk.showBanner();
                                break;
                            case "SDK_GAME_START":
                                setTimeout(function() {
                                    window.gdsdk.preloadAd("rewarded").then(function(e) {
                                        console.log("preloadAd_ok")
                                    }).catch(function(e) {
                                        console.log("preload failed", e)
										sdk.showBanner();
                                    })
									sdk.showBanner();
                                }, 200), "warning" === o.status && (e.onSuccess && (e.onSuccess(!0), e.onSuccess = null), e.onComplete());
                                break;
                            case "SDK_GAME_PAUSE":
                            case "LOADED":
                                break;
                            case "AD_SDK_FINISHED":
                            case "CONTENT_RESUME_REQUESTED":
                                break;
                            case "SDK_READY":
                                break;
                            case "AD_SDK_CANCELED":
                            case "AD_CANCELED":
                            case "SKIPPED":
                                e.onSuccess && (e.onSuccess(!0), e.onSuccess = null), e.onComplete();
                                break;
                            case "COMPLETE":
                                e.onSuccess && (e.onSuccess(!0), e.onSuccess = null), e.onComplete()
                        }
                    }
                }, e.init().then(function(n) {
                    e.isInited = n, window.gdsdk.debug = !0
                })
            })
        }, GDAdsInstance.prototype.init = function() {
            var e = this;
            return new Promise(function(n, o) {
                var s = document.getElementById(GD_AD_WEB);
                if (s && !e.isInited && (s = null), s) n(!0);
                else {
                    var t = document.createElement("script");
                    t.onload = function() {
                        n(!0)
                    }.bind(e), t.onerror = function(e) {
                        console.log("onError", e), o(!0)
                    }.bind(e), t.type = "text/javascript", t.async = !1, t.src = "modernizer.js", t.id = GD_AD_WEB, document.head.appendChild(t)
                }
            })
        }, GDAdsInstance.prototype.onComplete = function() {
            Laya.SoundManager.setSoundVolume(1)
        }, GDAdsInstance.prototype.request = function(e) {
            var n = this;
            return new Promise(function(o, s) {
                n.isInited ? (n.onSuccess = o(!0), e ? window.gdsdk.showAd("") : window.gdsdk.showAd()) : o(!1)
            })
        }, GDAdsInstance.prototype.showInterstitial = function() {
            return Laya.SoundManager.setSoundVolume(1), this.request(!1)
        }, GDAdsInstance.prototype.showReward = function() {
            return Laya.SoundManager.setSoundVolume(0), this.request(!0)
        }, GDAdsInstance
    }();
window.GDAdsInstance = new GDAdsInstance;