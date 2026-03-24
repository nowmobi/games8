window.__require = function e(t, o, a) {
    function n(i, c) {
        if (!o[i]) {
            if (!t[i]) {
                var s = i.split("/");
                if (s = s[s.length - 1], !t[s]) {
                    var l = "function" == typeof __require && __require;
                    if (!c && l) return l(s, !0);
                    if (r) return r(s, !0);
                    throw new Error("Cannot find module '" + i + "'")
                }
                i = s
            }
            var d = o[i] = {
                exports: {}
            };
            t[i][0].call(d.exports, function(e) {
                return n(t[i][1][e] || e)
            }, d, d.exports, e, t, o, a)
        }
        return o[i].exports
    }
    for (var r = "function" == typeof __require && __require, i = 0; i < a.length; i++) n(a[i]);
    return n
}({
    ActionTools: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b2c25CPD7ZMCZD/CIj7ZzqP", "ActionTools"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.ActionTools = void 0;
        var a = function() {
            function e() {}
            return Object.defineProperty(e, "_ins", {
                get: function() {
                    return this._instance
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.doLabStrAni = function(e, t, o) {
                e.node.stopAllActions(), e.string = "";
                var a = t.split(""),
                    n = 0,
                    r = o / a.length;
                e.node.runAction(cc.sequence(cc.callFunc(function() {
                    e.string = e.string + a[n], n++
                }), cc.delayTime(r)).repeat(a.length))
            }, e.prototype.openUIAni = function(e, t, o, a) {
                void 0 === o && (o = .3), void 0 === a && (a = function() {}), e.opacity = 0, t.scale = 0, e.runAction(cc.fadeTo(o, 100)), t.runAction(cc.sequence(cc.scaleTo(o, 1).easing(cc.easeBackOut()), cc.callFunc(a)))
            }, e.prototype.closeUIAni = function(e, t, o, a) {
                void 0 === o && (o = .2), void 0 === a && (a = function() {}), e.runAction(cc.fadeOut(o)), t.runAction(cc.sequence(cc.scaleTo(o, 0).easing(cc.easeBackIn()), cc.callFunc(a), cc.removeSelf(!0)))
            }, e.prototype.sortFadeToArr = function(e, t, o, a) {
                void 0 === t && (t = .3), void 0 === o && (o = .02), void 0 === a && (a = !1);
                for (var n = a ? 0 : 255, r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.opacity = 0, i.runAction(cc.sequence(cc.delayTime(o * r), cc.fadeTo(t, n)))
                }
            }, e.prototype.jumpByDegressAni = function(e, t, o, a, n, r) {
                void 0 === o && (o = 0), void 0 === r && (r = 0);
                var i = cc.misc.degreesToRadians(t),
                    c = cc.v2(Math.cos(i) * a, Math.sin(i) * a),
                    s = a / n;
                e.runAction(cc.sequence(cc.delayTime(r), cc.jumpBy(s, cc.v2(1.5 * c.x, o), a, 1), cc.removeSelf(!0)))
            }, e.prototype.moveDegressAni = function(e, t, o, a, n, r) {
                void 0 === o && (o = 200), void 0 === n && (n = !1), void 0 === r && (r = !1), t = t || this.returnRanNum(-180, 180);
                var i = cc.misc.degreesToRadians(t),
                    c = cc.v2(Math.cos(i) * o, Math.sin(i) * o),
                    s = o / a,
                    l = n ? 0 : e.scale,
                    d = r ? 0 : e.opacity;
                e.runAction(cc.sequence(cc.spawn(cc.scaleTo(s + .1, l), cc.moveBy(s, c).easing(cc.easeQuadraticActionOut()), cc.fadeTo(s + .1, d)), cc.fadeOut(.1), cc.removeSelf(!0)))
            }, e.prototype.moveByOutInit = function(e, t, o, a) {
                void 0 === t && (t = .5), void 0 === o && (o = 0), void 0 === a && (a = 0), e.x += o, e.y += a, e.runAction(cc.moveBy(t, cc.v2(-o, -a)).easing(cc.easeBackOut()))
            }, e.prototype.sprRedAni = function(e, t, o, a) {
                var n = 0;
                e.runAction(cc.sequence(cc.delayTime(t), cc.callFunc(function(e) {
                    e.color = cc.Color.RED
                }), cc.delayTime(t), cc.callFunc(function(e) {
                    e.color = cc.Color.WHITE, ++n >= o && null != a && a()
                })).repeat(o))
            }, e.prototype.shakeAni = function(e, t, o, a, n) {
                void 0 === t && (t = !1), void 0 === o && (o = 10), void 0 === a && (a = .1), void 0 === n && (n = 2);
                var r = cc.sequence(cc.rotateBy(a, o), cc.rotateBy(a, -o), cc.rotateBy(a, -o), cc.rotateBy(a, o), cc.rotateBy(a, o), cc.rotateBy(a, -o), cc.delayTime(n));
                t ? e.runAction(r.repeatForever()) : e.runAction(r)
            }, e.prototype.returnRanNum = function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            }, e._instance = new e, e
        }();
        o.ActionTools = a, cc._RF.pop()
    }, {}],
    AdManager_H5: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a2d4apyHgxPzpAgAaWifHNK", "AdManager_H5"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.AdManager_H5 = void 0;
        var a = function() {
            function e() {}
            return Object.defineProperty(e, "_ins", {
                get: function() {
                    return this._instance
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.showIntersAd = function() {
                adBreak({
                    type: "next",
                    name: "restart-game"
                })
            }, e.prototype.showVideoAd = function(e, t) {
                var o = this;
                this.videoBack = null, this.errorBack = null, e && (this.videoBack = e), t && (this.errorBack = t), adBreak({
                    type: "reward",
                    name: "dasdf",
                    beforeReward: function(e) {
                        e()
                    },
                    adDismissed: function() {
                        o.errorVideo()
                    },
                    adViewed: function() {
                        o.finishVideo()
                    },
                    adBreakDone: function() {
                        o.finishVideo()
                    }
                })
            }, e.prototype.finishVideo = function() {
                this.videoBack && this.videoBack(), this.videoBack = null, this.errorBack = null
            }, e.prototype.errorVideo = function() {
                this.errorBack && this.errorBack(), this.videoBack = null, this.errorBack = null
            }, e._instance = new e, e
        }();
        o.AdManager_H5 = a, cc._RF.pop()
    }, {}],
    AdManager_WX: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "47cdfp5drpH8r4S/bv1auem", "AdManager_WX"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.AdManager_WX = void 0;
        var a = e("../manager/PlatformManager"),
            n = function() {
                function e() {
                    this.app_id = "wx2c68756779fd1535", this.ad_banner_id = "adunit-64d55f82495fec1d", this.ad_inter_id = "adunit-3e889a9a21c90ec2", this.ad_video_id = "adunit-fc615ecff3915673", this.ad_banner = null, this.ad_video = null, this.gameName = "\u5927\u6218\u5c0f\u9ed1"
                }
                return Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }), e.prototype.loadAllAd = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_wechat && this.addShareMenu()
                }, e.prototype.initVideoAd = function() {
                    var e = this;
                    this.ad_video = wx.createRewardedVideoAd({
                        adUnitId: this.ad_video_id
                    }), this.ad_video.load().then(function() {
                        console.log("\u89c6\u9891\u5e7f\u544a\u52a0\u8f7d\u5b8c\u6210!")
                    }).catch(function(e) {
                        console.log("\u89c6\u9891\u52a0\u8f7d\u5931\u8d25:" + e.errMsg)
                    }), this.ad_video.onError(function(t) {
                        e.errorVideo(), console.log("\u89c6\u9891\u51fa\u9519:" + t), e.ad_video.load().then(function() {
                            console.log("\u624b\u52a8\u52a0\u8f7d\u6210\u529f"), e.ad_video.show()
                        })
                    }), this.ad_video.onClose(function(t) {
                        t && t.isEnded || void 0 === t ? (console.log("\u6b63\u5e38\u64ad\u653e\u7ed3\u675f\uff0c\u53ef\u4ee5\u4e0b\u53d1\u6e38\u620f\u5956\u52b1"), e.finishVideo()) : (e.errorVideo(!0), console.log("\u64ad\u653e\u4e2d\u9014\u9000\u51fa\uff0c\u4e0d\u4e0b\u53d1\u6e38\u620f\u5956\u52b1"))
                    })
                }, e.prototype.initBanner = function() {
                    var e = wx.createBannerAd({
                        adUnitId: this.ad_banner_id,
                        style: {
                            left: 0,
                            top: 0,
                            width: 720
                        }
                    });
                    e.onResize(function() {
                        var t = wx.getSystemInfoSync(),
                            o = t.screenWidth / 2,
                            a = t.screenHeight;
                        e.style.left = o - e.style.realWidth / 2 + .1, e.style.top = a - e.style.realHeight + .1, e.style.width = .8 * t.screenWidth, console.log("bannerAd\u52a0\u8f7d\u6210\u529f")
                    }), e.onError(function(e) {
                        console.log(e)
                    }), this.ad_banner = e
                }, e.prototype.showBanner = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_wechat && (this.ad_banner || this.initBanner(), this.ad_banner.show())
                }, e.prototype.hideBanner = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_wechat && this.ad_banner && this.ad_banner.hide()
                }, e.prototype.showIntersAd = function() {}, e.prototype.showVideoAd = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_wechat && wx.showToast({
                        title: "\u6682\u65e0\u89c6\u9891\u5e7f\u544a\uff01",
                        icon: "none",
                        duration: 1500
                    })
                }, e.prototype.finishVideo = function() {
                    this.videoBack && this.videoBack(), this.videoBack = null, this.errorBack = null
                }, e.prototype.errorVideo = function(e) {
                    void 0 === e && (e = !1), this.errorBack && this.errorBack(e), this.videoBack = null, this.errorBack = null
                }, e.prototype.shareFriends = function(e, t) {
                    void 0 === t && (t = "share"), a.PlatformManager.releaseType == a.releaseType.applet_wechat && (e = e || "\u5feb\u6765\u5927\u621825\u4e2a\u56de\u5408~~", cc.resources.load(t, cc.Asset, function(t, o) {
                        wx.shareAppMessage({
                            title: e,
                            imageUrl: o.url,
                            success: function(e) {
                                console.log("\u5206\u4eab\u6210\u529f:", e)
                            },
                            fail: function() {
                                wx.showToast({
                                    title: "\u5206\u4eab\u5931\u8d25",
                                    icon: "none",
                                    duration: 1500
                                })
                            }
                        })
                    }))
                }, e.prototype.addShareMenu = function(e, t) {
                    var o = this;
                    void 0 === t && (t = "share"), a.PlatformManager.releaseType == a.releaseType.applet_wechat && (e = e || "", cc.resources.load(t, cc.Asset, function(e, t) {
                        wx.showShareMenu({
                            withShareTicket: !0,
                            menus: ["shareAppMessage", "shareTimeline"]
                        }), wx.onShareAppMessage(function() {
                            return {
                                title: o.gameName,
                                imageUrl: t.url
                            }
                        })
                    }))
                }, e.prototype.toMoreGame = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_wechat && wx.navigateToMiniProgram({
                        appId: "wxda02fde13d108205",
                        path: "page/index/index?id=123",
                        extraData: {
                            foo: "bar"
                        },
                        envVersion: "develop",
                        success: function() {}
                    })
                }, e.prototype.vibrate = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_wechat && wx.vibrateShort({
                        type: "medium"
                    })
                }, e.prototype.addTable = function() {}, e.prototype.isAddTable = function() {}, e._instance = new e, e
            }();
        o.AdManager_WX = n, cc._RF.pop()
    }, {
        "../manager/PlatformManager": "PlatformManager"
    }],
    AdManager_ZJ: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "124e3pbqNZPxK62SespMIsm", "AdManager_ZJ"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.AdManager_ZJ = void 0;
        var a = e("../manager/PlatformManager"),
            n = function() {
                function e() {
                    this.app_id = "tta582d33f3abc001a02", this.ad_inter_id = "2mrqugugp7e9f29c36", this.ad_video_id = "9e617go08ho2094lcq", this.ad_banner_id = "5qmmte1agjm5fjd50r", this.recorder = null, this.videoPath = null, this.videoTimer = null, this.ad_banner = null, this.ad_video = null
                }
                return Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }),  e.prototype.finishVideo = function() {
                    this.videoBack && this.videoBack(), this.videoBack = null, this.errorBack = null
                }, e.prototype.errorVideo = function(e) {
                    void 0 === e && (e = !1), this.errorBack && this.errorBack(e), this.videoBack = null, this.errorBack = null
                }, e.prototype.createVideoScreen = function() {
                    if (a.PlatformManager.releaseType == a.releaseType.applet_ziJie) {
                        null !== this.videoTimer && (clearTimeout(this.videoTimer), this.videoTimer = null);
                        var e = this;
                        this.recorder = tt.getGameRecorderManager(), this.recorder.onStart(function(e) {
                            console.log("\u5f00\u59cb\u5f55\u5c4f:", e)
                        }), this.recorder.onError(function(e) {
                            console.log("\u5f55\u5c4f\u9519\u8bef:", e)
                        }), this.recorder.start({
                            duration: 300
                        }), this.videoTimer = setTimeout(function() {
                            e.stopVideoScreen()
                        }, 28e4)
                    }
                }, e.prototype.stopVideoScreen = function() {
                    if (a.PlatformManager.releaseType == a.releaseType.applet_ziJie) {
                        null !== this.videoTimer && (clearTimeout(this.videoTimer), this.videoTimer = null);
                        var e = this;
                        console.log(this.recorder), this.recorder && this.recorder.stop && (this.recorder.onStop(function(t) {
                            e.videoPath = t.videoPath
                        }), this.recorder.stop())
                    }
                }, e.prototype.shareScreenVideo = function(e, t) {
                    a.PlatformManager.releaseType == a.releaseType.applet_ziJie && (e = e || ["\u5927\u6218\u5c0f\u9ed1"], t = t || "\u6765\u5927\u621825\u4e2a\u56de\u5408~~", tt.shareAppMessage({
                        channel: "video",
                        title: t,
                        imageUrl: "",
                        query: "",
                        extra: {
                            videoPath: this.videoPath,
                            videoTopics: e
                        },
                        success: function() {
                            console.log("\u5206\u4eab\u89c6\u9891\u6210\u529f")
                        },
                        fail: function(e) {
                            console.log("\u5206\u4eab\u89c6\u9891\u5931\u8d25" + e)
                        }
                    }), console.log("shareScreenVideo"))
                }, e.prototype.addMoreGame = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_ziJie && setTimeout(function() {
                        var e = tt.getSystemInfoSync();
                        console.log(e), tt.showGridGamePanel({
                            query: {
                                "\u82b1\u82b1\u50f5\u5c38": "ttd12aa7974e142ca002"
                            },
                            type: "one",
                            size: "medium",
                            position: {
                                top: e.screenHeight / 2 - 70,
                                left: e.screenWidth - 70
                            },
                            fail: function(e) {
                                console.log(e)
                            }
                        })
                    }, 100)
					console.log("overrr")
                }, e.prototype.hideMoreGame = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_ziJie && tt.hideGridGamePanel()
                }, e.prototype.addTable = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_ziJie && tt.addShortcut({
                        success: function(e) {
                            console.log("\u6dfb\u52a0\u684c\u9762\u6210\u529f\uff01" + e)
                        },
                        fail: function(e) {
                            console.log("\u6dfb\u52a0\u684c\u9762\u5931\u8d25\uff01" + e)
                        }
                    })
                }, e.prototype.isAddTable = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_ziJie && tt.checkShortcut({
                        success: function(e) {
                            console.log(e.status), e.status.exist && console.log("\u5df2\u7ecf\u6dfb\u52a0\u684c\u9762\u4e86")
                        },
                        fail: function() {}
                    })
                }, e._instance = new e, e
            }();
        o.AdManager_ZJ = n, cc._RF.pop()
    }, {
        "../manager/PlatformManager": "PlatformManager"
    }],
    AdManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2a99aiMR2pMnpcfHJUcJzI4", "AdManager"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.AdManager = void 0;
        var a = e("../manager/PlatformManager"),
            n = e("./AdManager_H5"),
            r = e("./AdManager_WX"),
            i = e("./AdManager_ZJ"),
            c = function() {
                function e() {}
                return e.initAds = function() {}, e.loadAds = function() {
                    this.isLoadAd || (a.PlatformManager.releaseType == a.releaseType.applet_ziJie ? i.AdManager_ZJ._ins.loadAllAd() : a.PlatformManager.releaseType == a.releaseType.applet_wechat && r.AdManager_WX._ins.loadAllAd(), this.isLoadAd = !0)
                }, e.showBanner = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_ziJie ? i.AdManager_ZJ._ins.showBanner() : a.PlatformManager.releaseType == a.releaseType.applet_wechat && r.AdManager_WX._ins.showBanner()
                }, e.hideBanner = function() {
                    a.PlatformManager.releaseType == a.releaseType.applet_ziJie ? i.AdManager_ZJ._ins.hideBanner() : a.PlatformManager.releaseType == a.releaseType.applet_wechat && r.AdManager_WX._ins.hideBanner()
                }, e.showIntersAd = function() {
                    var e = a.PlatformManager.releaseType;
                    e != a.releaseType.test_TEST && (e == a.releaseType.h5_weiSan || e == a.releaseType.h5_common ? n.AdManager_H5._ins.showIntersAd() : e == a.releaseType.applet_ziJie ? i.AdManager_ZJ._ins.showIntersAd() : a.PlatformManager.releaseType == a.releaseType.applet_wechat && r.AdManager_WX._ins.showIntersAd())
                }, e.showVideoAd = function(e, t) {
                    var o = a.PlatformManager.releaseType;
                    o != a.releaseType.test_TEST ? o == a.releaseType.h5_weiSan || o == a.releaseType.h5_common ? n.AdManager_H5._ins.showVideoAd(e, t) : o == a.releaseType.applet_ziJie ? i.AdManager_ZJ._ins.showVideoAd(e, t) : a.PlatformManager.releaseType == a.releaseType.applet_wechat && r.AdManager_WX._ins.showVideoAd(e, t) : e && e()
                }, e.isLoadAd = !1, e
            }();
        o.AdManager = c, cc._RF.pop()
    }, {
        "../manager/PlatformManager": "PlatformManager",
        "./AdManager_H5": "AdManager_H5",
        "./AdManager_WX": "AdManager_WX",
        "./AdManager_ZJ": "AdManager_ZJ"
    }],
    AudioTools: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "bc1bcPG03RIK4fB+zDwX088", "AudioTools"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.AudioTools = void 0;
        var a = e("./LoadTools"),
            n = e("./Tools"),
            r = function() {
                function e() {
                    this.isPlayAudio = !0, this.isPlayBG = !0
                }
                return Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }), e.prototype.playBG = function(e, t) {
                    var o = this;
                    void 0 === t && (t = .5), this.isPlayBG && (this.stopBG(), null != n.Tools.AudioClipDic.get(e) ? this.bgAudio = cc.audioEngine.play(n.Tools.AudioClipDic.get(e), !0, t) : a.LoadTools._ins.loadResAny(cc.url.raw("resources/music/" + e + ".mp3"), cc.AudioClip, function(e) {
                        o.bgAudio = cc.audioEngine.play(e, !0, t)
                    }))
                }, e.prototype.stopBG = function() {
                    this.stopAudio(this.bgAudio)
                }, e.prototype.playAudio = function(e, t, o) {
                    if (void 0 === t && (t = .5), void 0 === o && (o = !1), this.isPlayAudio) return null != n.Tools.AudioClipDic.get(e) ? cc.audioEngine.play(n.Tools.AudioClipDic.get(e), o, t) : void a.LoadTools._ins.loadResAny(cc.url.raw("resources/music/" + e + ".mp3"), cc.AudioClip, function(e) {
                        cc.audioEngine.play(e, !0, t)
                    })
                }, e.prototype.stopAudio = function(e) {
                    null != e && (cc.audioEngine.stop(e), e = null)
                }, e.prototype.playAudioSource = function(e, t, o) {
                    var r = this;
                    if (void 0 === t && (t = .5), void 0 === o && (o = !1), this.isPlayAudio) return null != n.Tools.AudioClipDic.get(e) ? this.newAduioSource(n.Tools.AudioClipDic.get(e), t, o) : void a.LoadTools._ins.loadResAny(e, cc.AudioClip, function(e) {
                        r.newAduioSource(e, t, o)
                    })
                }, e.prototype.newAduioSource = function(e, t, o) {
                    void 0 === t && (t = .5), void 0 === o && (o = !1);
                    var a = new cc.Node,
                        n = a.addComponent(cc.AudioSource);
                    return n.clip = e, n.loop = o, n.volume = t, n.play(), 0 == o && cc.tween(a).delay(n.getDuration() + .1).removeSelf().union().start(), n
                }, e._instance = new e, e
            }();
        o.AudioTools = r, cc._RF.pop()
    }, {
        "./LoadTools": "LoadTools",
        "./Tools": "Tools"
    }],
    BallTs: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "5c36bdoPvhMupaOfOpCDtgF", "BallTs");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = e("../common/AudioTools"),
            c = e("../common/Tools"),
            s = e("../ctrl/GameCtrl"),
            l = e("../model/GameModel"),
            d = e("./Util"),
            p = cc._decorator,
            u = p.ccclass,
            m = (p.property, function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.IsCanTouch = !0, t.IsFailMove = !1, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function() {
                    this.addTouchEvents(), this.rigidBody = this.node.getComponent(cc.RigidBody), this.physicsCircleCollider = this.node.getComponent(cc.PhysicsCircleCollider)
                }, t.prototype.start = function() {
                    this.NowPos = this.node.position
                }, t.prototype.PhyOff = function() {
                    this.node.removeComponent(this.physicsCircleCollider), this.node.removeComponent(this.rigidBody)
                }, t.prototype.addTouchEvents = function() {
                    cc.macro.ENABLE_MULTI_TOUCH = !1, this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartBack, this)
                }, t.prototype.touchStartBack = function(e) {
                    if (s.GameCtrl._ins.boolTouch && l.GameModel._ins.GameTS.IsCanTouch && this.IsCanTouch && !l.GameModel._ins.GameTS.IsOver && (this.touchStartPos = c.Tools.getToNodePosForWorld(e.getLocation(), this.node), this.RayCast(this.node))) {
                        i.AudioTools._ins.playAudioSource("Biu"), this.IsCanTouch = !1, l.GameModel._ins.GameTS.BallDataArr = l.GameModel._ins.GameTS.GetMoveData(l.GameModel._ins.GameTS.BallDataArr, this._BallData);
                        for (var t = 0; t < l.GameModel._ins.GameTS.BallDataArr.length; ++t) l.GameModel._ins.GameTS.BallMove(l.GameModel._ins.GameTS.BallDataArr[t], t);
                        l.GameModel._ins.GameTS.CanDestroy(this._BallData), l.GameModel._ins.GameTS.GameOver(this._BallData), l.GameModel._ins.GameTS.IsOver || (cc.log(l.GameModel._ins.GameTS.BallCanMove()), l.GameModel._ins.GameTS.BallCanMove() && l.GameModel._ins.GameTS.BallUpMove())
                    }
                }, t.prototype.update = function() {
                    this.IsFailMove && this.FailMove(this.FailNode)
                }, t.prototype.RayCast = function(e) {
                    for (var t = 5 * e.width, a = e.width, n = e.parent.convertToWorldSpaceAR(cc.v2(e.x, e.y)), r = cc.director.getPhysicsManager().rayCast(n, cc.v2(n.x, n.y + t), cc.RayCastType.Closest), i = cc.director.getPhysicsManager().rayCast(n, cc.v2(n.x + Math.sin(.3) * a, n.y + Math.cos(.3) * a), cc.RayCastType.Closest), c = cc.director.getPhysicsManager().rayCast(n, cc.v2(n.x - Math.sin(.3) * a, n.y + Math.cos(.3) * a), cc.RayCastType.Closest), s = !0, l = 0; l < c.length; ++l)
                        if (10 == c[l].collider.tag && c[l].collider.node != this.node) {
                            cc.log(c[l].collider.node.getComponent(o)._BallData.Type), this.FailNode = c[l].collider.node, this.IsFailMove = !0;
                            var p = d.default.getNormalizeVector(this.node, this.FailNode);
                            return this.rigidBody.type = cc.RigidBodyType.Dynamic, this.rigidBody.linearVelocity = cc.v2(0, 1e3 * p.y), !1
                        }
                    for (l = 0; l < i.length; ++l)
                        if (10 == i[l].collider.tag && i[l].collider.node != this.node) return cc.log(i[l].collider.node.getComponent(o)._BallData.Type), this.FailNode = i[l].collider.node, this.IsFailMove = !0, p = d.default.getNormalizeVector(this.node, this.FailNode), this.rigidBody.type = cc.RigidBodyType.Dynamic, this.rigidBody.linearVelocity = cc.v2(0, 1e3 * p.y), !1;
                    for (l = 0; l < r.length; ++l)
                        if (10 == r[l].collider.tag && r[l].collider.node != this.node) return cc.log(r[l].collider.node.getComponent(o)._BallData.Type), this.FailNode = r[l].collider.node, this.IsFailMove = !0, p = d.default.getNormalizeVector(this.node, this.FailNode), this.rigidBody.type = cc.RigidBodyType.Dynamic, this.rigidBody.linearVelocity = cc.v2(0, 1e3 * p.y), !1;
                    return s
                }, t.prototype.FailMove = function(e) {
                    var t = this;
                    this.IsCanTouch = !1, c.Tools.getDistance(e.position, this.node.position) < this.node.width && (i.AudioTools._ins.playAudioSource("warning"), this.rigidBody.type = cc.RigidBodyType.Static, this.rigidBody.linearVelocity = cc.v2(0, 0), this.IsFailMove = !1, cc.tween(this.node).sequence(cc.moveTo(.15, this.NowPos).easing(cc.easeBackOut()), cc.callFunc(function() {
                        t.IsCanTouch = !0
                    })).start())
                }, o = r([u], t)
            }(cc.Component));
        o.default = m, cc._RF.pop()
    }, {
        "../common/AudioTools": "AudioTools",
        "../common/Tools": "Tools",
        "../ctrl/GameCtrl": "GameCtrl",
        "../model/GameModel": "GameModel",
        "./Util": "Util"
    }],
    BgTs: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b39841R4jtAhqBbQ2nXGsSu", "BgTs");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = e("../model/GameModel"),
            c = cc._decorator,
            s = c.ccclass,
            l = c.property,
            d = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.Bg = [], t
                }
                return n(t, e), t.prototype.onLoad = function() {
                    i.GameModel._ins.BgTs = this
                }, t.prototype.start = function() {}, t.prototype.ChangeBg = function(e) {
                    i.GameModel._ins.gameScore % 4 == 1 ? (this.Bg[0].zIndex = 1, this.Bg[1].zIndex = 0, this.Bg[2].zIndex = 0, this.Bg[3].zIndex = 0, cc.tween(this.Bg[0]).to(e, {
                        opacity: 255
                    }).start(), cc.tween(this.Bg[1]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[2]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[3]).to(e, {
                        opacity: 0
                    }).start()) : i.GameModel._ins.gameScore % 4 == 2 ? (this.Bg[0].zIndex = 0, this.Bg[1].zIndex = 1, this.Bg[2].zIndex = 0, this.Bg[3].zIndex = 0, cc.tween(this.Bg[0]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[1]).to(e, {
                        opacity: 255
                    }).start(), cc.tween(this.Bg[2]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[3]).to(e, {
                        opacity: 0
                    }).start()) : i.GameModel._ins.gameScore % 4 == 3 ? (this.Bg[0].zIndex = 0, this.Bg[1].zIndex = 0, this.Bg[2].zIndex = 1, this.Bg[3].zIndex = 0, cc.tween(this.Bg[0]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[1]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[2]).to(e, {
                        opacity: 255
                    }).start(), cc.tween(this.Bg[3]).to(e, {
                        opacity: 0
                    }).start()) : i.GameModel._ins.gameScore % 4 == 0 && (this.Bg[0].zIndex = 0, this.Bg[1].zIndex = 0, this.Bg[2].zIndex = 0, this.Bg[3].zIndex = 1, cc.tween(this.Bg[0]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[1]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[2]).to(e, {
                        opacity: 0
                    }).start(), cc.tween(this.Bg[3]).to(e, {
                        opacity: 255
                    }).start())
                }, r([l(cc.Node)], t.prototype, "Bg", void 0), r([s], t)
            }(cc.Component);
        o.default = d, cc._RF.pop()
    }, {
        "../model/GameModel": "GameModel"
    }],
    ButtonControl: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2a726KzCDtFXqZWmaLlAk4I", "ButtonControl");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = e("../common/AudioTools"),
            c = e("../common/Tools"),
            s = e("../manager/PlatformManager"),
            l = e("../model/GameModel"),
            d = cc._decorator,
            p = d.ccclass,
            u = d.property,
            m = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.MusicFrame = null, t
                }
                return n(t, e), t.prototype.onLoad = function() {
                    l.GameModel._ins.ButtonTs = this, (new cc.Component.EventHandler).target = this.node
                }, t.prototype.start = function() {
                    l.GameModel._ins.mainGame.localData.IsPlayMusic ? (c.Tools.setSpriteFrame(this.MusicFrame, "MusicON1"), i.AudioTools._ins.isPlayAudio = !0, i.AudioTools._ins.isPlayBG = !0, this.PlayBG(l.GameModel._ins.gameScore)) : (c.Tools.setSpriteFrame(this.MusicFrame, "MusicOFF1"), i.AudioTools._ins.isPlayAudio = !1, i.AudioTools._ins.isPlayBG = !1, i.AudioTools._ins.stopBG())
                console.log("startttt")
				if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
sdk.showBanner();
}
				}, t.prototype.OnMusicPlay = function() {
                    //l.GameModel._ins.mainGame.localData.IsPlayMusic ? (c.Tools.setSpriteFrame(this.MusicFrame, "MusicOFF1"), i.AudioTools._ins.isPlayAudio = !1, i.AudioTools._ins.isPlayBG = !1, i.AudioTools._ins.stopBG(), l.GameModel._ins.mainGame.localData.IsPlayMusic = !1, s.PlatformManager.setStorage("localData", l.GameModel._ins.mainGame.localData, !0)) : (c.Tools.setSpriteFrame(this.MusicFrame, "MusicON1"), i.AudioTools._ins.isPlayAudio = !0, i.AudioTools._ins.isPlayBG = !0, this.PlayBG(l.GameModel._ins.gameScore), l.GameModel._ins.mainGame.localData.IsPlayMusic = !0, s.PlatformManager.setStorage("localData", l.GameModel._ins.mainGame.localData, !0))
                console.log("ffff")
				window.open("https://hyhygames.com/?utm_source=www.hyhygames.com&utm_campaign=game-triple-tile", "blank");
				}, t.prototype.PlayBG = function(e) {
                    e % 4 == 1 ? i.AudioTools._ins.playBG("Chun (32CBR)", .1) : e % 4 == 2 ? i.AudioTools._ins.playBG("Xia", .1) : e % 4 == 3 ? i.AudioTools._ins.playBG("Qiu", .1) : e % 4 == 0 && i.AudioTools._ins.playBG("Dong (32CBR)", .2)
                }, r([u(cc.Node)], t.prototype, "MusicFrame", void 0), r([p], t)
            }(cc.Component);
        o.default = m, cc._RF.pop()
    }, {
        "../common/AudioTools": "AudioTools",
        "../common/Tools": "Tools",
        "../manager/PlatformManager": "PlatformManager",
        "../model/GameModel": "GameModel"
    }],
    EventManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "133eazTY8lPDrziDak8SK9u", "EventManager"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.EventData = o.EventManager = void 0;
        var a = function() {
            function e() {}
            return e.addListener = function(e, t, o) {
                cc.director.on(e, t, o)
            }, e.removeListener = function(e, t, o) {
                cc.director.off(e, t, o)
            }, e.dispachEvent = function(e, t, o, a, n, r) {
                cc.director.emit(e, t, o, a, n, r)
            }, e.removeListenerForTarget = function(e) {
                cc.director.targetOff(e)
            }, e
        }();
        o.EventManager = a,
            function(e) {
                e.START_GAME = "START_GAME", e.SHOW_GLOD = "SHOW_GLOD", e.REIVE_GAME = "REIVE_GAME"
            }(o.EventData || (o.EventData = {})), cc._RF.pop()
    }, {}],
    GameCtrl: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a1d7eXYRpRDM7lzYxYf5Tki", "GameCtrl"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.GameState = o.GameCtrl = void 0;
        var a, n = e("../manager/PoolManager"),
            r = e("../model/GameModel"),
            i = function() {
                function e() {
                    this.boolTouch = !1
                }
                return Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }), e.prototype.initGame = function() {
                    this.gameState = a.Defualt, r.GameModel._ins.gameScore = 0, this.boolTouch = !1
                }, e.prototype.overGame = function() {
                    this.gameState = a.Over, this.boolTouch = !1, n.PoolManager.clearAllPool()
                }, e._instance = new e, e
            }();
        o.GameCtrl = i,
            function(e) {
                e[e.Defualt = 0] = "Defualt", e[e.Start = 1] = "Start", e[e.Pause = 2] = "Pause", e[e.Over = 3] = "Over"
            }(a = o.GameState || (o.GameState = {})), cc._RF.pop()
    }, {
        "../manager/PoolManager": "PoolManager",
        "../model/GameModel": "GameModel"
    }],
    GameModel: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a8f362i/MJKRKQHQCpCjKll", "GameModel"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.GameModel = void 0;
        var a = function() {
            function e() {
                this.mianScene = "MainGame", this.mainGame = null, this.GameTS = null, this.BgTs = null, this.ButtonTs = null, this.gameScore = 1, this.standScore = 20, this.gameMaxScore = 200
            }
            return Object.defineProperty(e, "_ins", {
                get: function() {
                    return this._instance
                },
                enumerable: !1,
                configurable: !0
            }), e._instance = new e, e
        }();
        o.GameModel = a, cc._RF.pop()
    }, {}],
    InitGame: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "11d57xkx8xC/bpnzMOQ9DT5", "InitGame");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = e("../common/weiSanTools"),
            c = e("../manager/PlatformManager"),
            s = cc._decorator,
            l = s.ccclass,
            d = s.property,
            p = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.resNodeArr = [], t.rType = c.releaseType.test_TEST, t.storageKey = "demo_Game", t
                }
                return n(t, e), t.prototype.onLoad = function() {
                    this.rType == c.releaseType.h5_weiSan && (this.rType = c.releaseType.h5_common), c.PlatformManager.releaseType = this.rType, c.PlatformManager.storageKey = this.storageKey, c.PlatformManager.initPlatform(), this.initResNode(), this.initScreen(), i.weiSan.initLog()
                }, t.prototype.initResNode = function() {
                    for (var e = 0; e < this.resNodeArr.length; e++) {
                        var t = cc.instantiate(this.resNodeArr[e]);
                        this.node.addChild(t)
                    }
                }, t.prototype.initScreen = function() {
                    i.weiSan.log("\u7cfb\u7edfOS: " + cc.sys.os);
                    var e = cc.find("Canvas").getComponent(cc.Canvas);
                    cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS ? (e.fitWidth = !0, e.fitHeight = !1) : (e.fitWidth = !0, e.fitHeight = !0)
                }, r([d([cc.Prefab])], t.prototype, "resNodeArr", void 0), r([d({
                    type: cc.Enum(c.releaseType)
                })], t.prototype, "rType", void 0), r([d], t.prototype, "storageKey", void 0), r([l], t)
            }(cc.Component);
        o.default = p, cc._RF.pop()
    }, {
        "../common/weiSanTools": "weiSanTools",
        "../manager/PlatformManager": "PlatformManager"
    }],
    LoadTools: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b96adtj6ztJp5Q4tD5LbQij", "LoadTools"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.LoadTools = void 0;
        var a = e("./Tools"),
            n = e("./weiSanTools"),
            r = function() {
                function e() {}
                return Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }), e.prototype.loadScene = function(e, t, o) {
                    void 0 === o && (o = !0), o && a.Tools.clearResDic(), cc.director.preloadScene(e, function() {
                        cc.director.loadScene(e, t)
                    })
                }, e.prototype.loadResPrefab = function(e, t, o, a, n) {
                    void 0 === n && (n = 0), this.loadResAny(e, cc.Prefab, function(e) {
                        var r = cc.instantiate(e);
                        o && o.addChild(r, n), a && (r.position = cc.v3(a.x, a.y, 0)), null != t && t(r)
                    })
                }, e.prototype.loadResSpriteFrame = function(e, t, o, a, r, i) {
                    void 0 === r && (r = 0), cc.loader.loadRes(e, cc.SpriteFrame, function(e, c) {
                        e ? n.weiSan.error(e) : (t.getComponent(cc.Sprite).spriteFrame = c, o && o.addChild(t, r), a && (t.position = cc.v3(a.x, a.y, 0)), null != i && i(t))
                    })
                }, e.prototype.loadResAny = function(e, t, o) {
                    cc.loader.loadRes(e, t, function(e, t) {
                        e ? n.weiSan.error(e) : null != o && o(t)
                    })
                }, e.prototype.loadBundleScene = function(e, t, o, a) {
                    void 0 === a && (a = !0), cc.assetManager.loadBundle(e, function(e, n) {
                        if (e) console.log(e);
                        else {
                            if (!a) return;
                            n.loadScene(t, function(e, t) {
                                o && o(), cc.director.runScene(t)
                            })
                        }
                    })
                }, e._instance = new e, e
            }();
        o.LoadTools = r, cc._RF.pop()
    }, {
        "./Tools": "Tools",
        "./weiSanTools": "weiSanTools"
    }],
    MainGame: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ef932zNAq1A1IMD8IZjy4f7", "MainGame");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = e("../common/AudioTools"),
            c = e("../common/Tools"),
            s = e("../common/weiSanTools"),
            l = e("../ctrl/GameCtrl"),
            d = e("../manager/EventManager"),
            p = e("../manager/PlatformManager"),
            u = e("../manager/UIManager"),
            m = e("../model/GameModel"),
            h = cc._decorator,
            f = h.ccclass,
            g = h.property,
            y = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.Score = null, t.Button = null, t
                }
                return n(t, e), t.prototype.onLoad = function() {
                    this.gameWidth = cc.view.getVisibleSize().width, this.gameHeight = cc.view.getVisibleSize().height, this.Scale = this.gameWidth / this.gameHeight, cc.log(this.Scale), cc.director.getPhysicsManager().enabled = !0, m.GameModel._ins.mainGame = this, this.addTouchEvents(), this.addInitListener(), this.GameLocalData(), m.GameModel._ins.gameScore = this.localData.GameScore, cc.log(this.localData, "\u672c\u5730\u6570\u636e")
                }, t.prototype.start = function() {
                    this.initGame(), this.Score.getComponent(cc.Label).string = this.localData.GameScore.toString()
                }, t.prototype.GameLocalData = function() {
                    this.localData = p.PlatformManager.getStorage("localData", !0), null == this.localData && (this.localData = {
                        IsPlayMusic: !0,
                        IsOver: !1,
                        GameScore: 1,
                        FrameArr: [],
                        TypeArr: []
                    }), p.PlatformManager.setStorage("localData", this.localData, !0)
                }, t.prototype.AddScore = function() {
                    var e = this;
                    l.GameCtrl._ins.boolTouch = !1, this.localData.GameScore++, m.GameModel._ins.gameScore = this.localData.GameScore, cc.tween(this.Score).to(.15, {
                        scale: 0
                    }).call(function() {
                        e.Score.getComponent(cc.Label).string = m.GameModel._ins.gameScore.toString()
                    }).to(.15, {
                        scale: .75
                    }).start(), p.PlatformManager.setStorage("localData", this.localData, !0)
					console.log("ssssssssssssss")
					if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
sdk.showBanner();
}
                }, t.prototype.update = function() {
                    l.GameCtrl._ins.gameState, l.GameState.Start
                }, t.prototype.addTouchEvents = function() {
                    cc.macro.ENABLE_MULTI_TOUCH = !1, this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartBack, this)
                }, t.prototype.touchStartBack = function(e) {
                    var t = this;
                    l.GameCtrl._ins.boolTouch && (this.touchStartPos = c.Tools.getToNodePosForWorld(e.getLocation(), this.node), this.Button.active && this.scheduleOnce(function() {
                        t.Button.active = !1
                    }, 5))
                }, t.prototype.initGame = function() {
                    l.GameCtrl._ins.initGame(), l.GameCtrl._ins.boolTouch = !0
                }, t.prototype.startGame = function() {}, t.prototype.gameEnd = function() {
                    l.GameCtrl._ins.gameState != l.GameState.Over && (this.Score.active = !1, i.AudioTools._ins.stopBG(), l.GameCtrl._ins.overGame(), s.weiSan.log("\u6e38\u620f\u7ed3\u675f"), this.scheduleOnce(function() {
                        u.UIManager.OpenUI("OverUI")
                    }, .5))
                }, t.prototype.addInitListener = function() {
                    d.EventManager.addListener(d.EventData.START_GAME, this.startGame.bind(this), this.node)
                }, t.prototype.onDestroy = function() {
                    d.EventManager.removeListenerForTarget(this.node)
                }, r([g(cc.Node)], t.prototype, "Score", void 0), r([g(cc.Node)], t.prototype, "Button", void 0), r([f], t)
            }(cc.Component);
        o.default = y, cc._RF.pop()
    }, {
        "../common/AudioTools": "AudioTools",
        "../common/Tools": "Tools",
        "../common/weiSanTools": "weiSanTools",
        "../ctrl/GameCtrl": "GameCtrl",
        "../manager/EventManager": "EventManager",
        "../manager/PlatformManager": "PlatformManager",
        "../manager/UIManager": "UIManager",
        "../model/GameModel": "GameModel"
    }],
    MyGameTs: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2363dO6BZFJ05bR27O4ZYNv", "MyGameTs");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.FrameData = o.BallData = void 0;
        var i = e("../common/AudioTools"),
            c = e("../common/Tools"),
            s = e("../ctrl/GameCtrl"),
            l = e("../manager/PlatformManager"),
            d = e("../manager/PoolManager"),
            p = e("../model/GameModel"),
            u = e("./BallTs"),
            m = e("./clearTs"),
            h = e("./Util"),
            f = cc._decorator,
            g = f.ccclass,
            y = f.property,
            _ = function() {
                this.IsMove = !1, this.IsFirst = !0, this.IsTween = !1
            };
        o.BallData = _;
        var v = function() {};
        o.FrameData = v;
        var T = function() {},
            M = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.BallDataArr = [], t.FrameDataArr = [], t.FrameArr = [], t.AllBall = [], t.FrameNode = [], t.Json = null, t.Ball = null, t.GamePass = null, t.Up = null, t.IsCanTouch = !0, t.IsFirst = !0, t.IsInit = !0, t.IsOver = !1, t.BallNum = 0, t.WhileNum = 0, t.TypeArr1 = [], t.TypeArr = [1, 1, 1, 2, 2, 2], t.GetArr = [], t.DuiBiArr = [], t.InitY = 0, t
                }
                return n(t, e), t.prototype.onLoad = function() {
                    p.GameModel._ins.GameTS = this, this.MyGame = this.node
                }, t.prototype.start = function() {
                    p.GameModel._ins.gameScore = p.GameModel._ins.mainGame.localData.GameScore, p.GameModel._ins.BgTs.ChangeBg(.35), this.FrameDataArr = this.InitArr(), this.UPPos(), this.FirstInit(), this.Level(), this.InitGame()
                }, t.prototype.UPPos = function() {
                    this.Up.setPosition(0, p.GameModel._ins.mainGame.gameHeight / 2.5 - 80)
                }, t.prototype.InitArr = function() {
                    for (var e = [], t = 0; t < this.FrameNode.length; ++t) {
                        var o = new v;
                        o.Frame = this.FrameNode[t], o.Ball = null, o.type = null, e[t] = o
                    }
                    return e
                }, t.prototype.GetJsonData = function() {
                    var e = this.levelData.LevenNum;
                    this.JsonData = {
                        id: this.Json.json.type[e].id,
                        width: this.Json.json.type[e].width,
                        hight: this.Json.json.type[e].hight,
                        Map: this.Json.json.type[e].Map
                    }
                }, t.prototype.InitNum = function() {
                    for (var e = 0, t = 0; t < this.JsonData.hight; ++t)
                        for (var o = 0; o < this.JsonData.width; ++o) 1 == this.JsonData.Map[t][o] && e++;
                    return e
                }, t.prototype.Level = function() {
                    if (this.levelData = new T, this.levelData.LevenNum = p.GameModel._ins.gameScore - 1, this.levelData.MaxNum = p.GameModel._ins.gameScore + 1, p.GameModel._ins.gameScore <= 6) this.levelData.MaxNum = p.GameModel._ins.gameScore + 1, this.levelData.Long = 0;
                    else if (p.GameModel._ins.gameScore > 6 && p.GameModel._ins.gameScore < 10) p.GameModel._ins.gameScore >= 9 && (this.levelData.LevenNum = 9, this.levelData.MaxNum = 9), this.levelData.Long = 1.5;
                    else if (p.GameModel._ins.gameScore >= 10) {
                        if (this.levelData.Long = 1.5, 10 == p.GameModel._ins.gameScore && (this.levelData.LevenNum = 10), p.GameModel._ins.gameScore < 20 ? this.WhileNum = 2 : this.WhileNum = 3, this.levelData.LevenNum = c.Tools.random(6, 10), 9 == this.levelData.LevenNum) {
                            var e = c.Tools.random(0, 1);
                            this.levelData.LevenNum = 1 == e ? c.Tools.random(6, 8) : 10
                        }
                        this.levelData.Long = 1.5, this.levelData.MaxNum = 9
                    }
                    p.GameModel._ins.gameScore >= 2 && p.GameModel._ins.gameScore < 3 ? this.TypeArr1 = [3, 2, 1] : p.GameModel._ins.gameScore >= 3 && p.GameModel._ins.gameScore < 4 ? this.TypeArr1 = [4, 3, 2, 1] : p.GameModel._ins.gameScore >= 4 && p.GameModel._ins.gameScore < 5 ? this.TypeArr1 = [5, 4, 3, 2, 1] : p.GameModel._ins.gameScore >= 5 && p.GameModel._ins.gameScore < 6 ? this.TypeArr1 = [6, 5, 4, 3, 2, 1] : p.GameModel._ins.gameScore >= 6 && p.GameModel._ins.gameScore < 7 ? this.TypeArr1 = [7, 6, 5, 4, 3, 2, 1] : p.GameModel._ins.gameScore >= 7 && p.GameModel._ins.gameScore < 8 && (this.TypeArr1 = [8, 7, 6, 5, 4, 3, 2, 1])
                }, t.prototype.GetType = function(e, t) {
                    var o = [];
                    for (this.GetArr.length > 0 && o.push(this.GetArr[0]); o.length < t;) {
                        var a = void 0,
                            n = !0;
                        if (p.GameModel._ins.gameScore < 8) this.TypeArr1.length > 0 ? (a = this.TypeArr1[0], this.TypeArr1.splice(0, 1)) : a = c.Tools.random(1, e);
                        else if (p.GameModel._ins.gameScore >= 8) {
                            a = c.Tools.random(1, e);
                            for (var r = 0; r < this.DuiBiArr.length; ++r) a == this.DuiBiArr[r] && (n = !1);
                            for (var i = 0; i < o.length; ++i) a == o[i] && (n = !1)
                        }
                        n && o.push(a)
                    }
                    var s = 0;
                    for (r = 0; r < 3 * t; ++r) r < 3 ? s = 0 : r >= 3 && r < 6 ? s = 1 : r >= 6 && r < 9 ? s = 2 : r >= 9 && r < 12 ? s = 3 : r >= 12 && r < 15 && (s = 4), this.GetArr[r] = o[s], this.TypeArr[r] = o[s];
                    this.DuiBiArr = o, this.GetArr.splice(0, 6), c.Tools.aginSortArr(this.TypeArr)
                }, t.prototype.FirstInit = function() {
                    if (p.GameModel._ins.mainGame.localData.FrameArr.length > 0)
                        for (var e = 0; e < p.GameModel._ins.mainGame.localData.FrameArr.length; ++e) {
                            var t = c.Tools.getToNodePosForNode(this.FrameNode[e], this.node),
                                o = cc.instantiate(this.Ball);
                            o.setParent(this.node), o.setPosition(t);
                            var a = "S" + p.GameModel._ins.mainGame.localData.FrameArr[e];
                            c.Tools.setSpriteFrame(o, a);
                            var n = new _;
                            n.Ball = o, n.Type = p.GameModel._ins.mainGame.localData.FrameArr[e], n.IsFirst = !1, o.getComponent(u.default)._BallData = n, this.BallDataArr.push(n), o.scale = .01, o.getComponent(u.default).PhyOff(), cc.tween(o).sequence(cc.delayTime(.5 + .05 * e), cc.scaleTo(.15, 1).easing(cc.easeBackOut()), cc.moveTo(.1, t)).start()
                        }
                }, t.prototype.InitBall = function() {
                    var e, t = this.InitNum();
                    this.IsFirst && (this.IsFirst = !1, p.GameModel._ins.mainGame.localData.TypeArr.length > 0 && (this.TypeArr = p.GameModel._ins.mainGame.localData.TypeArr), c.Tools.aginSortArr(this.TypeArr));
                    for (var o = 0; o < this.JsonData.hight; ++o)
                        for (var a = 0; a < this.JsonData.width; ++a)
                            if (1 == this.JsonData.Map[o][a]) {
                                var n;
                                e = 85;
                                var r = cc.instantiate(this.Ball);
                                this.AllBall.push(r);
                                var i = this.TypeArr[0];
                                1 == this.TypeArr.length ? p.GameModel._ins.gameScore < 5 ? this.GetType(this.levelData.MaxNum, 2) : t <= 15 ? this.GetType(this.levelData.MaxNum, 3) : p.GameModel._ins.gameScore < 10 ? this.GetType(this.levelData.MaxNum, c.Tools.random(3, 4)) : this.GetType(this.levelData.MaxNum, 5) : (this.TypeArr.shift(), c.Tools.aginSortArr(this.TypeArr));
                                var s = "S" + i;
                                c.Tools.setSpriteFrame(r, s), r.setParent(this.node), n = p.GameModel._ins.gameScore >= 3 ? o % 2 == 0 ? cc.v2(-e * this.levelData.Long + e * (a - 2), -e * o + p.GameModel._ins.mainGame.gameHeight / 10 - this.InitY) : cc.v2(-e * this.levelData.Long + .5 * e + e * (a - 2), -e * o + p.GameModel._ins.mainGame.gameHeight / 10 - this.InitY) : o % 2 == 0 ? cc.v2(-e * this.levelData.Long + e * (a - 2), -e * o - this.InitY) : cc.v2(-e * this.levelData.Long + .5 * e + e * (a - 2), -e * o - this.InitY), r.setPosition(n);
                                var l = new _;
                                l.Ball = r, l.Type = i, l.IsFirst = !0, r.getComponent(u.default)._BallData = l, this.BallNum++, r.scale = .01, cc.tween(r).sequence(cc.delayTime(.5 + .05 * o + .05 * a), cc.scaleTo(.15, 1).easing(cc.easeBackOut())).start(), t--
                            }
                    this.InitY += e * this.JsonData.hight
                }, t.prototype.BallMove = function(e, t) {
                    var o = this;
                    if (e.IsFirst) {
                        e.IsFirst = !1, this.BallNum--, e.Ball.getComponent(u.default).PhyOff(), this.AllBall.splice(this.AllBall.indexOf(e.Ball), 1);
                        var a = this.FrameDataArr[t].Frame;
                        e.Frame = this.FrameDataArr[t].Frame, this.FrameDataArr[t].type = e.Type, this.FrameDataArr[t].Ball = e.Ball, c.Tools.setNodeParent(this.FrameDataArr[t].Ball, this.FrameDataArr[t].Frame), this.FrameDataArr[t].Ball.scale = .8;
                        var n = cc.v2(0, 0);
                        e.IsTween = !0, e.MoveTween = cc.tween(this.FrameDataArr[t].Ball).sequence(cc.moveTo(.3, n).easing(cc.easeBackOut()), cc.callFunc(function() {
                            if (e.IsTween = !1, 0 == p.GameModel._ins.GameTS.BallNum && !o.IsOver) {
                                for (var t = 0; t < p.GameModel._ins.GameTS.BallDataArr.length; ++t) p.GameModel._ins.GameTS.BallMove(p.GameModel._ins.GameTS.BallDataArr[t], t);
                                i.AudioTools._ins.stopBG(), i.AudioTools._ins.playAudioSource("success"), p.GameModel._ins.GameTS.GamePass.getComponent(m.default).Play()
                            }
                        })).start(), cc.tween(a).sequence(cc.delayTime(.3), cc.moveBy(.1, cc.v2(0, -10)), cc.moveBy(.1, cc.v2(0, 10))).start()
                    } else 0 == this.BallNum ? (e.Frame = this.FrameDataArr[t].Frame, this.FrameDataArr[t].type = e.Type, this.FrameDataArr[t].Ball = e.Ball, c.Tools.setNodeParent(this.FrameDataArr[t].Ball, this.FrameDataArr[t].Frame), this.FrameDataArr[t].Ball.scale = .8, n = cc.v2(0, 0), e.IsTween = !0, e.IsTween && e.MoveTween.stop(), e.MoveTween = cc.tween(this.FrameDataArr[t].Ball).sequence(cc.moveTo(.3, n).easing(cc.easeBackOut()), cc.callFunc(function() {
                        e.IsTween && (e.IsTween = !1)
                    })).start()) : e.Frame != this.FrameDataArr[t].Frame && (this.FrameDataArr[t].type = e.Type, this.FrameDataArr[t].Ball = e.Ball, e.Frame = this.FrameDataArr[t].Frame, c.Tools.setNodeParent(this.FrameDataArr[t].Ball, this.node), this.FrameDataArr[t].Ball.scale = 1, n = c.Tools.getToNodePosForNode(this.FrameDataArr[t].Frame, this.node), e.IsTween = !0, e.IsTween && null != e.MoveTween && e.MoveTween.stop(), e.MoveTween = cc.tween(e.Ball).sequence(cc.moveTo(.3, n).easing(cc.easeBackOut()), cc.callFunc(function() {
                        e.IsTween && (e.IsTween = !1)
                    })).start())
                }, t.prototype.GetMoveData = function(e, t) {
                    if (0 == e.length) return e.push(t), e;
                    for (var o = 0; o < e.length; ++o) {
                        if (t.Type == e[o].Type) {
                            if (null == e[o + 1]) return e.push(t), e;
                            if (e[o + 1].Type == t.Type) {
                                for (var a = [], n = [], r = 0; r < o + 2; ++r) a.push(e[r]);
                                for (var i = o + 2; i < e.length; ++i) n.push(e[i]);
                                return a.push(t), a.concat(n)
                            }
                            for (a = [], n = [], r = 0; r < o + 1; ++r) a.push(e[r]);
                            for (i = o + 1; i < e.length; ++i) n.push(e[i]);
                            return a.push(t), a.concat(n)
                        }
                        if (o == e.length - 1 && e[e.length - 1].Type != t.Type) return e.push(t), e
                    }
                }, t.prototype.CanDestroy = function(e) {
                    for (var t = this, o = [], a = 0, n = 0; n < this.BallDataArr.length; ++n)
                        if (e.Type == this.BallDataArr[n].Type && (o.push(n), ++a >= 3)) {
                            for (var r = function(e) {
                                    var a = c.BallDataArr[o[e]].Ball,
                                        n = c.BallDataArr[o[e]].Type,
                                        r = c.BallDataArr[o[e]].Frame;
                                    cc.tween(a).sequence(cc.delayTime(.3), cc.callFunc(function() {
                                        if (t.InitSp(r, "Light", 1, 1), t.InitSp(r, "", 1, 1, !0, n), t.InitChip(10, r, "L1_1", n, 150, !0, !1, 1), t.InitChip(20, r, "L1_1", n, 120, !0, !1, 1), e == o.length - 1 && t.BallNum > 0)
                                            for (var a = 0; a < p.GameModel._ins.GameTS.BallDataArr.length; ++a) p.GameModel._ins.GameTS.BallMove(p.GameModel._ins.GameTS.BallDataArr[a], a)
                                    }), cc.fadeOut(.35), cc.callFunc(function() {
                                        a.destroy()
                                    })).start()
                                }, c = this, s = 0; s < o.length; ++s) r(s);
                            i.AudioTools._ins.playAudioSource("Delete2"), this.BallDataArr.splice(o[0], 3)
                        }
                }, t.prototype.InitSp = function(e, t, o, a, n, r) {
                    void 0 === n && (n = !1), void 0 === r && (r = 0);
                    var i = c.Tools.getToNodePosForNode(e, this.node);
                    n && (t = "H1");
                    var s = d.PoolManager.getPoolObj(t);
                    n && (t = "H" + r), c.Tools.setSpriteFrame(s, t), s.setParent(this.node), s.setPosition(i), s.scale = 0, s.zIndex = 10, 0 != s.scale && (s.scale = 0), cc.tween(s).parallel(cc.scaleTo(o, a).easing(cc.easeBounceOut()), cc.fadeOut(1)).delay(.5).call(function() {
                        s.destroy()
                    }).start()
                }, t.prototype.InitSp2 = function(e, t, o, a, n, r) {
                    void 0 === n && (n = !1), void 0 === r && (r = 0);
                    var i = c.Tools.getToNodePosForNode(e, this.node);
                    n && (t = "H1");
                    var s = d.PoolManager.getPoolObj(t);
                    n && (t = "H" + r), c.Tools.setSpriteFrame(s, t), s.setParent(this.node), s.setPosition(i), s.scale = 0, s.zIndex = 10, 0 != s.scale && (s.scale = 0), cc.tween(s).parallel(cc.scaleTo(o, a).easing(cc.easeBackOut()), cc.fadeOut(1)).delay(.5).call(function() {
                        s.destroy()
                    }).start()
                }, t.prototype.InitChip = function(e, t, o, a, n, r, i, s) {
                    void 0 === r && (r = !1), void 0 === i && (i = !1), void 0 === s && (s = .25);
                    for (var l = c.Tools.getToNodePosForNode(t, this.node), p = function(t) {
                            var p = void 0,
                                m = void 0,
                                f = d.PoolManager.getPoolObj(o);
                            f.zIndex = 10, f.setParent(u.node), f.setPosition(l), f.scale = 1;
                            var g = "L" + a + "_" + c.Tools.random(1, 2);
                            if (c.Tools.setSpriteFrame(f, g), null == f.getComponent(cc.RigidBody) && (f.addComponent(cc.RigidBody), f.getComponent(cc.RigidBody).linearDamping = 1.5), f.getComponent(cc.RigidBody).linearVelocity != cc.v2(0, 0) && (f.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0)), 255 != f.opacity && (f.opacity = 255), r) i ? t < e / 2 ? p = -Math.PI / 2 / (e / 2) * t : t >= e / 2 && (p = Math.PI / 2 / (e / 2) * (t - e / 2)) : p = 2 * Math.PI / e * t, m = h.default.radToVec(p), f.getComponent(cc.RigidBody).gravityScale = 0, f.getComponent(cc.RigidBody).linearDamping = 1.5;
                            else {
                                var y = c.Tools.random(-2, 2, !1),
                                    _ = c.Tools.random(-2, 2, !1);
                                m = cc.v2(y, _), f.getComponent(cc.RigidBody).gravityScale = 0, s = c.Tools.random(1, 1, !1), f.scale = c.Tools.random(.8, 1.2, !1)
                            }
                            f.getComponent(cc.RigidBody).linearVelocity = cc.v2(n * m.x, n * m.y), cc.tween(f).delay(.25).to(s, {
                                opacity: 0
                            }).delay(.5).call(function() {
                                d.PoolManager.addPoolObj(f)
                            }).start()
                        }, u = this, m = 0; m < e; ++m) p(m)
                }, t.prototype.GameNext = function() {
                    p.GameModel._ins.mainGame.localData.FrameArr = [];
                    for (var e = 0; e < this.BallDataArr.length; ++e) null != this.BallDataArr[e] && (p.GameModel._ins.mainGame.localData.FrameArr[e] = this.BallDataArr[e].Type);
                    for (p.GameModel._ins.mainGame.localData.TypeArr = [], e = 0; e < this.TypeArr.length; ++e) p.GameModel._ins.mainGame.localData.TypeArr[e] = this.TypeArr[e];
                    l.PlatformManager.setStorage("localData", p.GameModel._ins.mainGame.localData, !0), p.GameModel._ins.mainGame.localData.FrameArr, p.GameModel._ins.mainGame.AddScore(), s.GameCtrl._ins.boolTouch = !0, this.IsCanTouch = !0, this.IsInit = !0, this.InitGame(), p.GameModel._ins.BgTs.ChangeBg(.35), p.GameModel._ins.ButtonTs.PlayBG(p.GameModel._ins.gameScore)
                }, t.prototype.InitGame = function() {
                    if (this.InitY = 0, p.GameModel._ins.gameScore > 10)
                        for (var e = 0; e < this.WhileNum;) this.Level(), this.GetJsonData(), this.InitBall(), e++;
                    else this.Level(), this.GetJsonData(), this.InitBall()
                }, t.prototype.GameOver = function(e) {
                    var t = this;
                    if (this.BallDataArr.length >= this.FrameNode.length) {
                        for (var o = 0, a = 0; a < this.BallDataArr.length; ++a) this.BallDataArr[a].Type == e.Type && o++;
                        if (o < 3) {
                            this.IsOver = !0, i.AudioTools._ins.playAudioSource("over");
                            var n = function(e) {
                                    var o = r.BallDataArr[e].Ball,
                                        a = r.BallDataArr[e].Type;
                                    cc.tween(o).sequence(cc.delayTime(1 + .05 * e), cc.callFunc(function() {
                                        i.AudioTools._ins.playAudioSource("Biu"), t.InitChip(20, o, "L1_1", a, c.Tools.random(145, 150, !1), !0, !1, 1), t.InitChip(20, o, "L1_1", a, c.Tools.random(100, 125, !1), !0, !1, 1)
                                    }), cc.fadeOut(.35), cc.callFunc(function() {
                                        o.destroy()
                                    })).start()
                                },
                                r = this;
                            for (a = 0; a < this.BallDataArr.length; ++a) n(a);
                            var s = this.AllBall.length,
                                l = function(e) {
                                    var t = d.AllBall[e];
                                    cc.tween(t).sequence(cc.delayTime(.05 + .01 * (s - e)), cc.callFunc(function() {
                                        t.getComponent(u.default).rigidBody.type = cc.RigidBodyType.Dynamic, t.getComponent(u.default).rigidBody.gravityScale = 3, t.getComponent(u.default).rigidBody.linearVelocity = cc.v2(0, -100)
                                    }), cc.delayTime(2), cc.callFunc(function() {
                                        t.destroy()
                                    })).start()
                                },
                                d = this;
                            for (a = 0; a < s; ++a) l(a);
                            var m = 1.5;
                            m = .05 + .1 * s > m ? 1.5 : .05 + .1 * s, this.scheduleOnce(function() {
                                p.GameModel._ins.mainGame.gameEnd()
                            }, m)
                        }
                    }
					
                }, t.prototype.GetMaxNum = function(e) {
                    void 0 === e && (e = []);
                    for (var t = 0, o = 0, a = 0, n = 0; n < e.length; ++n) {
                        var r = 0;
                        o = e[n].Type;
                        for (var i = 0; i < e.length; ++i) o == e[i].Type && ++r >= t && (t = r, a = o)
                    }
                    return a
                }, t.prototype.BallCanMove = function() {
                    for (var e = 0, t = 0, o = 0; o < this.AllBall.length; ++o)
                        if (null != this.AllBall[o]) {
                            if (0 == t && (t = this.AllBall[0].y), this.AllBall[o].y < t && (t = this.AllBall[o].y), this.AllBall[o].y > -p.GameModel._ins.mainGame.gameHeight / 2 + 255) return !1;
                            e++
                        }
                    return t < -p.GameModel._ins.mainGame.gameHeight / 2 + 42.5 || !(e < 24)
                }, t.prototype.BallUpMove = function() {
                    var e = this;
                    this.IsCanTouch = !1;
                    for (var t = Math.floor(p.GameModel._ins.mainGame.gameHeight / 2 / 85), o = function(o) {
                            null != a.AllBall[o] && cc.tween(a.AllBall[o]).sequence(cc.delayTime(.25), cc.moveBy(1, cc.v2(0, 85 * t - p.GameModel._ins.mainGame.gameHeight / 10)).easing(cc.easeSineOut()), cc.callFunc(function() {
                                e.AllBall[o].getComponent(u.default).NowPos = e.AllBall[o].position, e.IsCanTouch = !0
                            })).start()
                        }, a = this, n = 0; n < this.AllBall.length; ++n) o(n)
                }, r([y(cc.Node)], t.prototype, "FrameNode", void 0), r([y(cc.JsonAsset)], t.prototype, "Json", void 0), r([y(cc.Prefab)], t.prototype, "Ball", void 0), r([y(cc.Node)], t.prototype, "GamePass", void 0), r([y(cc.Node)], t.prototype, "Up", void 0), r([g], t)
            }(cc.Component);
        o.default = M, cc._RF.pop()
    }, {
        "../common/AudioTools": "AudioTools",
        "../common/Tools": "Tools",
        "../ctrl/GameCtrl": "GameCtrl",
        "../manager/PlatformManager": "PlatformManager",
        "../manager/PoolManager": "PoolManager",
        "../model/GameModel": "GameModel",
        "./BallTs": "BallTs",
        "./Util": "Util",
        "./clearTs": "clearTs"
    }],
    NetworkManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "7368bvx8K9EabyOcKON6XK5", "NetworkManager"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.msgHttpUrl = o.NetworkManager = void 0;
        var a = e("../common/weiSanTools"),
            n = e("./PlatformManager"),
            r = function() {
                function e() {}
                return e.initNetwork = function() {
                    n.PlatformManager.releaseType == n.releaseType.h5_common || n.PlatformManager.releaseType == n.releaseType.h5_weiSan ? this.initNet_H5() : n.PlatformManager.releaseType == n.releaseType.test_TEST && (this.moreGameUrl = "http://m.wesane.com/", a.weiSan.log("\u53d1\u9001:---\u6e38\u620f\u52a0\u8f7d\u6210\u529f!"))
                }, e.initNet_H5 = function() {
                    this.getHttpGameId(), this.sendLoadGame()
                }, e.getHttpGameId = function() {
                    var e = document.URL,
                        t = 0;
                    if (n.PlatformManager.releaseType == n.releaseType.h5_common) {
                        var r = window.location.href,
                            i = r.substring(0, r.lastIndexOf("//") + 2),
                            c = window.location.host,
                            s = (e = document.URL).lastIndexOf("/"),
                            l = e.substring(0, s);
                        s = l.lastIndexOf("/"), t = parseInt(l.substring(s + 1, l.length)), this.gameHttpId = t;
                        var d = i + c,
                            p = d.lastIndexOf("//"),
                            u = d.substring(p + 2, d.indexOf("//") + 4);
                        if ("g." == u) {
                            var m = d.replace(u, "");
                            d = m
                        }
                        this.moreGameUrl = d, o.msgHttpUrl.gamePv_commonH5 = i + c + "/Service/GamePv/index", o.msgHttpUrl.score_commonH5 = i + c + "/Service/Score/index"
                    } else {
                        var h = e.substring(e.lastIndexOf("/game/") + 1, e.length).split("/");
                        h.length >= 2 && (t = parseInt(h[1])), this.moreGameUrl = "http://m.wesane.com/"
                    }
                    this.gameHttpId = t, a.weiSan.log("gameId:", t, this.moreGameUrl)
                }, e.sendLoadGame = function() {
                    n.PlatformManager.releaseType == n.releaseType.h5_weiSan ? this.sendMsg(o.msgHttpUrl.gamePv_weiSanH5, "gameID=" + this.gameHttpId.toString(), this.loadGameBack) : n.PlatformManager.releaseType == n.releaseType.h5_common && this.sendMsg(o.msgHttpUrl.gamePv_commonH5, "gameId=" + this.gameHttpId.toString(), this.loadGameBack)
                }, e.loadGameBack = function() {
                    a.weiSan.log("gamePv\u52a0\u8f7d\u6210\u529f")
                }, e.sendGameScore = function(e, t) {
                    n.PlatformManager.releaseType == n.releaseType.h5_weiSan ? this.sendMsg(o.msgHttpUrl.score_weiSanH5, "gameScore=" + e + "&gameId=" + this.gameHttpId + "&gameType=" + t, this.sendScoreBack) : n.PlatformManager.releaseType == n.releaseType.h5_common && this.sendMsg(o.msgHttpUrl.score_commonH5, "gameScore=" + e + "&gameId=" + this.gameHttpId + "&gameType=" + t, this.sendScoreBack)
                }, e.sendScoreBack = function(e) {
                    a.weiSan.log("---\u63d0\u4ea4\u5206\u6570\u6210\u529f!" + e), null != e.currentTarget.response && "" != e.currentTarget.response && JSON.parse(e.currentTarget.response)
                }, e.sendMsg = function(e, t, o) {
                    var a = cc.loader.getXMLHttpRequest();
                    a.onreadystatechange = o, a.open("POST", e), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.send(t)
                }, e.gameHttpId = 0, e
            }();
        o.NetworkManager = r, window.NetworkManager = r, o.msgHttpUrl = {
            gamePv_weiSanH5: "http://www.wesane.com/admin.php/Activityshow/gamelogo",
            score_weiSanH5: "http://www.wesane.com/admin.php/Gamescore/saveGamescore",
            gamePv_commonH5: "",
            score_commonH5: ""
        }, cc._RF.pop()
    }, {
        "../common/weiSanTools": "weiSanTools",
        "./PlatformManager": "PlatformManager"
    }],
    OtherModel: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a7d991QTY1Bt7JTY7l9t4I2", "OtherModel"), Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.interTag = o.groupAll = o.zIndexAll = void 0,
            function(e) {
                e[e.player_Z = 10] = "player_Z", e[e.bg_Z = 1] = "bg_Z"
            }(o.zIndexAll || (o.zIndexAll = {})),
            function(e) {
                e[e.default = 0] = "default", e[e.UI = 2] = "UI"
            }(o.groupAll || (o.groupAll = {})),
            function(e) {
                e[e.enemy_Tag = 1] = "enemy_Tag", e[e.player_Tag = 3] = "player_Tag"
            }(o.interTag || (o.interTag = {})), cc._RF.pop()
    }, {}],
    OverUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "eef84sRpGtEYKFhq3Zv4xGF", "OverUI");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = e("../ads/AdManager"),
            c = e("../common/Tools"),
            s = e("../common/weiSanTools"),
            l = e("../manager/NetworkManager"),
            d = e("../manager/PlatformManager"),
            p = e("../manager/UIManager"),
            u = e("../model/GameModel"),
            m = e("../model/WordsModel"),
            h = cc._decorator,
            f = h.ccclass,
            g = h.property,
            y = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.bgSpr = null, t.viewNode = null, t.scoreLab = null, t.maxScoreLab = null, t.infoText = null, t.moreBtn = null, t.aginBtn = null, t.aginBtn1 = null, t.isClick = !1, t
                }
                return n(t, e), t.prototype.onLoad = function() {
                    u.GameModel._ins.mainGame.Scale > .75 && (this.node.scale *= .7), this.bgSpr.opacity = 0, this.viewNode.y += 1e3, this.aginBtn.scale = 0, this.initShowInfo(), this.addBtnEvent(), l.NetworkManager.sendGameScore(u.GameModel._ins.gameScore, 1), i.AdManager.showIntersAd(), d.PlatformManager.osType != d.osType.h5 && (this.moreBtn.active = !1)
                }, t.prototype.initShowInfo = function() {
                    this.scoreLab.string = u.GameModel._ins.gameScore.toString();
                    var e = this.getBeatItScore(u.GameModel._ins.gameScore, u.GameModel._ins.standScore, u.GameModel._ins.gameMaxScore);
                    this.infoText.string = this.getBeatItStr(u.GameModel._ins.gameScore, e, !0);
                    var t = c.Tools.getStorage("gameOverMaxScore");
                    if ((!t || t <= u.GameModel._ins.gameScore) && (t = u.GameModel._ins.gameScore, c.Tools.setStorage("gameOverMaxScore", u.GameModel._ins.gameScore)), this.maxScoreLab.string = t.toString(), d.PlatformManager.osType == d.osType.h5) {
                        if ("CN" == c.Tools.getLanguageType() || "CHT" == c.Tools.getLanguageType() ? document.title = m.WordsModel.getStrForLanguage("overTitle_1", "CN") + "<" + m.WordsModel.getStrForLanguage("gameName", "CN") + ">" + m.WordsModel.getStrForLanguage("overTitle_2", "CN") + this.getBeatItStr(u.GameModel._ins.gameScore, e, !1) : document.title = m.WordsModel.getStrForLanguage("overTitle_1", "EN") + "<" + m.WordsModel.getStrForLanguage("gameName", "EN") + ">" + m.WordsModel.getStrForLanguage("overTitle_2", "EN") + this.getBeatItStr(u.GameModel._ins.gameScore, e, !1), "EN" == c.Tools.getLanguageType()) {
                            var o = this.moreBtn.children[0];
                            c.Tools.setSpriteFrame(o, "EN")
                        }
                        console.log(document.title)
                    }
					console.log("fklkjlkjlkj")
					if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
sdk.showBanner();
}
                }, t.prototype.addBtnEvent = function() {
                    var e = this;
                    this.aginBtn.on("click", function() {
                        e.isClick && e.aginGame()
                    }), this.aginBtn1.on("click", function() {
                        e.isClick && e.aginGame()
                    }), this.moreBtn.on("click", function() {
                       // e.isClick && (d.PlatformManager.releaseType != d.releaseType.test_TEST ? window.location.href = l.NetworkManager.moreGameUrl : s.weiSan.log("\u6d4b\u8bd5\u6a21\u5f0f \u66f4\u591a\u6e38\u620fUrl: " + l.NetworkManager.moreGameUrl))
                    window.open("https://hyhygames.com/?utm_source=www.hyhygames.com&utm_campaign=game-triple-tile", "blank");
					})
                }, t.prototype.aginGame = function() {
                    this.isClick = !1, p.UIManager.CloseUI("OverUI"), this.scheduleOnce(function() {
                        cc.director.preloadScene(u.GameModel._ins.mianScene, function() {
                            cc.director.loadScene(u.GameModel._ins.mianScene)
                        })
                    }, .2)
                }, t.prototype.getBeatItStr = function(e, t, o) {
                    void 0 === o && (o = !0);
                    var a = m.WordsModel.getStrForLanguage("overScoreInfo_0");
                    return e > 0 && (a = m.WordsModel.getStrForLanguage("overScoreInfo_1") + t + "%" + m.WordsModel.getStrForLanguage("overScoreInfo_2")), a
                }, t.prototype.getBeatItScore = function(e, t, o) {
                    if (e >= o) return 100;
                    if (e <= t) {
                        var a = e / t * 80 + c.Tools.random(-3, 3);
                        return Math.max(Math.floor(a), 5)
                    }
                    return a = 80 + (e - t) / (o - t) * 20 + c.Tools.random(-3, 3), Math.min(Math.floor(a), 99)
                }, t.prototype.openUI = function() {
                    var e = this;
                    this.bgSpr.runAction(cc.fadeTo(.3, 100)), this.viewNode.runAction(cc.sequence(cc.moveBy(.3, cc.v2(0, -1e3)).easing(cc.easeBackOut()), cc.callFunc(function() {
                        e.isClick = !0, e.aginBtn.runAction(cc.scaleTo(.3, 1).easing(cc.easeBackOut()))
                    })))
                }, t.prototype.closeUI = function() {
                    this.bgSpr.runAction(cc.fadeOut(.3)), this.viewNode.runAction(cc.moveBy(.3, cc.v2(0, 1e3)).easing(cc.easeBackIn()))
                }, r([g(cc.Node)], t.prototype, "bgSpr", void 0), r([g(cc.Node)], t.prototype, "viewNode", void 0), r([g(cc.Label)], t.prototype, "scoreLab", void 0), r([g(cc.Label)], t.prototype, "maxScoreLab", void 0), r([g(cc.Label)], t.prototype, "infoText", void 0), r([g(cc.Node)], t.prototype, "moreBtn", void 0), r([g(cc.Node)], t.prototype, "aginBtn", void 0), r([g(cc.Node)], t.prototype, "aginBtn1", void 0), r([f], t)
            }(p.UIManager);
        o.default = y, cc._RF.pop()
    }, {
        "../ads/AdManager": "AdManager",
        "../common/Tools": "Tools",
        "../common/weiSanTools": "weiSanTools",
        "../manager/NetworkManager": "NetworkManager",
        "../manager/PlatformManager": "PlatformManager",
        "../manager/UIManager": "UIManager",
        "../model/GameModel": "GameModel",
        "../model/WordsModel": "WordsModel"
    }],
    PlatformManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "526f4NSDmdHDqwXmWoL2A3b", "PlatformManager"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.osType = o.releaseType = o.PlatformManager = void 0;
        var a, n = e("../ads/AdManager"),
            r = e("./NetworkManager"),
            i = function() {
                function e() {}
                return e.initPlatform = function() {
                    this.loadGameBool || (this.initOsType(), r.NetworkManager.initNetwork(), e.releaseType != o.releaseType.h5_weiSan && e.releaseType != o.releaseType.h5_common || ("NaN" == r.NetworkManager.gameHttpId.toString() && (e.releaseType == o.releaseType.h5_weiSan ? window.location.href = r.NetworkManager.moreGameUrl : window.location.href = "http://www.vsane.com/"), loadInScene && loadInScene(), cc.view.enableAutoFullScreen(!1)), e.releaseType != o.releaseType.applet_ziJie && (window.AdManager = n.AdManager), this.loadGameBool = !0)
                }, e.initOsType = function() {
                    this.releaseType == o.releaseType.APP_google ? this.osType = a.android : this.releaseType == o.releaseType.APP_ios ? this.osType = a.ios : this.releaseType == o.releaseType.applet_ziJie ? this.osType = a.applet : this.osType = a.h5
                }, e.setStorage = function(t, a, n) {
                    if (void 0 === n && (n = !1), t = this.storageKey + t, e.releaseType === o.releaseType.applet_ziJie) return tt.setStorageSync(t, a);
                    n && (a = JSON.stringify(a)), cc.sys.localStorage.setItem(t, a)
                }, e.getStorage = function(t, a) {
                    void 0 === a && (a = !1), t = this.storageKey + t;
                    var n = null;
                    return e.releaseType === o.releaseType.applet_ziJie ? "" == (n = tt.getStorageSync(t)) && (n = null) : (n = cc.sys.localStorage.getItem(t)) && "NaN" != n.toString() && "null" != n.toString() ? a ? n = JSON.parse(n) : isNaN(n) || (n = parseInt(n)) : n = null, n
                }, e.storageKey = "demo_Game_", e.loadGameBool = !1, e
            }();
        o.PlatformManager = i, window.PlatformManager = i, o.releaseType = cc.Enum({
                test_TEST: 1,
                h5_weiSan: 2,
                h5_common: 3,
                applet_ziJie: 4,
                applet_wechat: 5,
                APP_google: 10,
                APP_ios: 11
            }),
            function(e) {
                e[e.h5 = 1] = "h5", e[e.android = 2] = "android", e[e.ios = 3] = "ios", e[e.applet = 4] = "applet"
            }(a = o.osType || (o.osType = {})), cc._RF.pop()
    }, {
        "../ads/AdManager": "AdManager",
        "./NetworkManager": "NetworkManager"
    }],
    PoolManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "6d71a4IRmhHHqQ3Zkrz3M5U", "PoolManager"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.PoolManager = void 0;
        var a = e("../common/Tools"),
            n = e("../common/weiSanTools"),
            r = function() {
                function e() {}
                return e.addPoolObj = function(e) {
                    null == this.PoolDic[e.name] && (this.PoolDic[e.name] = new cc.NodePool(e.name)), this.PoolDic[e.name].put(e)
                }, e.getPoolObj = function(e) {
                    return null == this.PoolDic[e] ? (n.weiSan.warn("\u6ca1\u6709\u6dfb\u52a0\u5bf9\u8c61\u6c60\uff1a", e), this.PoolDic[e] = new cc.NodePool(e), a.Tools.newPrefab(e)) : this.PoolDic[e].size() > 1 ? this.PoolDic[e].get() : a.Tools.newPrefab(e)
                }, e.clearPool = function(e) {
                    if (null != this.PoolDic[e]) return this.PoolDic[e].clear();
                    n.weiSan.warn("\u6ca1\u6709\u6dfb\u52a0\u5bf9\u8c61\u6c60\uff1a", e)
                }, e.clearAllPool = function() {
                    for (var e in this.PoolDic) Object.prototype.hasOwnProperty.call(this.PoolDic, e) && this.clearPool(e)
                }, e.PoolDic = new Map, e
            }();
        o.PoolManager = r, cc._RF.pop()
    }, {
        "../common/Tools": "Tools",
        "../common/weiSanTools": "weiSanTools"
    }],
    ResArr: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "56af2D00XFDX6lyw8ZO/zKX", "ResArr");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = e("../common/Tools"),
            c = cc._decorator,
            s = c.ccclass,
            l = c.property,
            d = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.SpriteFrameArr = [], t.PrefabArr = [], t.audiosArr = [], t
                }
                return n(t, e), t.prototype.onLoad = function() {
                    this.addAudio(), this.addPrefabs(), this.addSpriteFrame()
                }, t.prototype.addAudio = function() {
                    for (var e = 0; e < this.audiosArr.length; e++)
                        if (this.audiosArr[e]) {
                            var t = this.audiosArr[e];
                            i.Tools.AudioClipDic.set(t.name, t)
                        }
                }, t.prototype.addSpriteFrame = function() {
                    for (var e = 0; e < this.SpriteFrameArr.length; e++)
                        if (this.SpriteFrameArr[e]) {
                            var t = this.SpriteFrameArr[e];
                            i.Tools.SpriteFrameDic.set(t.name, t)
                        }
                }, t.prototype.addPrefabs = function() {
                    for (var e = 0; e < this.PrefabArr.length; e++)
                        if (this.PrefabArr[e]) {
                            var t = this.PrefabArr[e];
                            i.Tools.PrefabDic.set(t.data.name, t)
                        }
                }, r([l([cc.SpriteFrame])], t.prototype, "SpriteFrameArr", void 0), r([l([cc.Prefab])], t.prototype, "PrefabArr", void 0), r([l([cc.AudioClip])], t.prototype, "audiosArr", void 0), r([s], t)
            }(cc.Component);
        o.default = d, cc._RF.pop()
    }, {
        "../common/Tools": "Tools"
    }],
    Tools: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1cabc0YRwVLlaPoVAuI9R3d", "Tools"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.Tools = void 0;
        var a = e("../manager/PlatformManager"),
            n = e("./LoadTools"),
            r = function() {
                function e() {}
                return e.clearResDic = function() {
                    this.AudioClipDic.clear(), this.SpriteFrameDic.clear(), this.PrefabDic.clear()
                }, e.setStorage = function(e, t, o) {
                    void 0 === o && (o = !1), a.PlatformManager.setStorage(e, t, o)
                }, e.getStorage = function(e, t) {
                    return void 0 === t && (t = !1), a.PlatformManager.getStorage(e, t)
                }, e.newPrefab = function(e, t, o, a, n) {
                    return void 0 === a && (a = 0), i._ins.newPrefab(e, n, t, o, a)
                }, e.newSprite = function(e, t, o, a, n) {
                    return void 0 === a && (a = 0), i._ins.newSprite(e, n, t, o, a)
                }, e.setSpriteFrame = function(e, t) {
                    i._ins.setSpriteFrame(e, t)
                }, e.setNodeGroupIndex = function(e, t) {
                    i._ins.setNodeGroupIndex(e, t)
                }, e.setBtnClickSpr = function(e, t, o) {
                    i._ins.setBtnClickSpr(e, t, o)
                }, e.setSpriteState = function(e, t) {
                    i._ins.setSpriteState(e, t)
                }, e.setNodeParent = function(e, t) {
                    i._ins.setNodeParent(e, t)
                }, e.random = function(e, t, o) {
                    return void 0 === o && (o = !0), c._ins.random(e, t, o)
                }, e.chooseRandom = function(e) {
                    return c._ins.chooseRandom(e)
                }, e.refractionY = function(e) {
                    return c._ins.refractionY(e)
                }, e.refractionX = function(e) {
                    return c._ins.refractionX(e)
                }, e.aginSortArr = function(e) {
                    c._ins.aginSortArr(e)
                }, e.sortArrForObject = function(e, t, o) {
                    void 0 === o && (o = !1), c._ins.sortArrForObject(e, t, o)
                }, e.getDiffNumRandom = function(e, t, o) {
                    return c._ins.getDiffNumRandom(e, t, o)
                }, e.getAngleForPos = function(e, t, o) {
                    return void 0 === o && (o = !1), s._ins.getAngleForPos(this.getV2ForV3(e), this.getV2ForV3(t), o)
                }, e.getDistance = function(e, t) {
                    return s._ins.getDistance(this.getV2ForV3(e), this.getV2ForV3(t))
                }, e.getV2ForV3 = function(e) {
                    return cc.v2(e.x, e.y)
                }, e.getPosForAngleLen = function(e, t, o) {
                    return void 0 === o && (o = cc.v2(0, 0)), s._ins.getPosForAngleLen(e, t, o)
                }, e.getToNodePosForNode = function(e, t) {
                    return s._ins.getToNodePosForNode(e, t)
                }, e.getToWorldPosAR = function(e) {
                    return s._ins.getToWorldPosAR(e)
                }, e.getToNodePosForWorld = function(e, t) {
                    return s._ins.getToNodePosForWorld(e, t)
                }, e.removeArrForValue = function(e, t) {
                    return e.splice(e.indexOf(t), 1)
                }, e.addArrNoValue = function(e, t) {
                    return e.indexOf(t) < 0 && (e.push(t), !0)
                }, e.addArrIndex = function(e, t, o) {
                    return e.splice(t, 0, o)
                }, e.insertStrForIndex = function(e, t, o) {
                    return e.slice(0, t) + o + e.slice(t)
                }, e.prefixInteger = function(e, t) {
                    return void 0 === t && (t = 2), (Array(t).join("0") + e).slice(-t)
                }, e.getLanguageType = function() {
                    var e = "EN";
                    return cc.sys.language == cc.sys.LANGUAGE_CHINESE ? e = -1 != cc.sys.languageCode.toLowerCase().indexOf("zh-cn") || -1 != cc.sys.languageCode.toLowerCase().indexOf("zh_cn") ? "CN" : "CHT" : cc.sys.language == cc.sys.LANGUAGE_KOREAN ? e = "KOR" : cc.sys.language == cc.sys.LANGUAGE_JAPANESE ? e = "JP" : "th-TH" == window.navigator.language && (e = "TH"), e
                }, e.SpriteFrameDic = new Map, e.PrefabDic = new Map, e.AudioClipDic = new Map, e
            }();
        o.Tools = r;
        var i = function() {
                function e() {}
                return Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }), e.prototype.newPrefab = function(e, t, o, a, i) {
                    void 0 === i && (i = 0);
                    var c = r.PrefabDic.get(e),
                        s = null;
                    return null != c ? (s = cc.instantiate(c), o && o.addChild(s, i), a && (s.position = cc.v3(a.x, a.y, 0)), null != t && t(s)) : n.LoadTools._ins.loadResPrefab(e, t, o, a, i), s
                }, e.prototype.newSprite = function(e, t, o, a, i) {
                    void 0 === i && (i = 0);
                    var c = new cc.Node;
                    return c.name = e, null != r.SpriteFrameDic.get(e) ? (c.addComponent(cc.Sprite).spriteFrame = r.SpriteFrameDic.get(e), o && o.addChild(c, i), a && (c.position = cc.v3(a.x, a.y, 0)), null != t && t(c)) : (c.addComponent(cc.Sprite), n.LoadTools._ins.loadResSpriteFrame(e, c, o, a, i, t)), c
                }, e.prototype.setSpriteFrame = function(e, t) {
                    r.SpriteFrameDic.get(t) ? e.getComponent(cc.Sprite).spriteFrame = r.SpriteFrameDic.get(t) : n.LoadTools._ins.loadResAny(t, cc.SpriteFrame, function(t) {
                        e.getComponent(cc.Sprite).spriteFrame = t
                    })
                }, e.prototype.setNodeGroupIndex = function(e, t) {
                    e.groupIndex = t;
                    for (var o = 0; o < e.children.length; o++) e.children[o].groupIndex = t
                }, e.prototype.setBtnClickSpr = function(e, t, o) {
                    r.SpriteFrameDic.get(t) ? (e.getComponent(cc.Button).normalSprite = r.SpriteFrameDic.get(t), e.getComponent(cc.Button).hoverSprite = r.SpriteFrameDic.get(t), e.getComponent(cc.Button).pressedSprite = r.SpriteFrameDic.get(o)) : (n.LoadTools._ins.loadResAny(t, cc.SpriteFrame, function(t) {
                        e.getComponent(cc.Button).normalSprite = t, e.getComponent(cc.Button).hoverSprite = t
                    }), n.LoadTools._ins.loadResAny(o, cc.SpriteFrame, function(t) {
                        e.getComponent(cc.Button).pressedSprite = t
                    }))
                }, e.prototype.setSpriteState = function(e, t) {
                    var o = 0 == t ? "builtin-2d-sprite" : "builtin-2d-gray-sprite";
                    cc.loader.loadRes("materials/" + o, cc.Material, function(t, o) {
                        t ? cc.error(t) : e.getComponent(cc.Sprite).setMaterial(0, o)
                    })
                }, e.prototype.setNodeParent = function(e, t) {
                    var o = s._ins.getToNodePosForNode(e, t);
                    e.parent = t, e.position = cc.v3(o.x, o.y)
                }, e._instance = new e, e
            }(),
            c = function() {
                function e() {}
                return Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }), e.prototype.random = function(e, t, o) {
                    return void 0 === o && (o = !0), o ? e + Math.floor(Math.random() * (t - e + 1)) : Math.random() * (t - e) + e
                }, e.prototype.chooseRandom = function(e) {
                    for (var t = 0, o = 0; o < e.length; o++) t += e[o];
                    var a = this.random(0, t, !1);
                    for (o = 0; o < e.length; o++) {
                        if (a < e[o] && e[o] > 0) return o;
                        a -= e[o]
                    }
                    return e.length - 1
                }, e.prototype.refractionY = function(e) {
                    return Math.atan2(Math.sin(e), -Math.cos(e))
                }, e.prototype.refractionX = function(e) {
                    return Math.atan2(-Math.sin(e), Math.cos(e))
                }, e.prototype.aginSortArr = function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var o = r.random(0, e.length - 1);
                        if (o != t) {
                            var a = e[t];
                            e[t] = e[o], e[o] = a
                        }
                    }
                }, e.prototype.sortArrForObject = function(e, t, o) {
                    void 0 === o && (o = !1), o ? e.sort(function(e, o) {
                        return o[t] - e[t]
                    }) : e.sort(function(e, o) {
                        return e[t] - o[t]
                    })
                }, e.prototype.getDiffNumRandom = function(e, t, o) {
                    for (var a = [], n = e; n <= t; n++) a.push(n);
                    var i = a.length - o;
                    for (n = 0; n < i; n++) {
                        var c = r.random(0, a.length - 1);
                        a.splice(c, 1)
                    }
                    return a
                }, e._instance = new e, e
            }(),
            s = function() {
                function e() {}
                return Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }), e.prototype.getAngleForPos = function(e, t, o) {
                    void 0 === o && (o = !1);
                    var a;
                    return a = o ? -Math.atan2(t.x - e.x, t.y - e.y) : Math.atan2(t.y - e.y, t.x - e.x), cc.misc.radiansToDegrees(a)
                }, e.prototype.getDistance = function(e, t) {
                    return e.sub(t).mag()
                }, e.prototype.getPosForAngleLen = function(e, t, o) {
                    void 0 === o && (o = cc.v2(0, 0));
                    var a = cc.misc.degreesToRadians(e);
                    return cc.v3(o.x + Math.cos(a) * t, o.y + Math.sin(a) * t)
                }, e.prototype.getToNodePosForNode = function(e, t) {
                    var o = e.parent.convertToWorldSpaceAR(e.position),
                        a = t.convertToNodeSpaceAR(o);
                    return cc.v2(a.x, a.y)
                }, e.prototype.getToWorldPosAR = function(e) {
                    return e.parent.convertToWorldSpaceAR(e.position)
                }, e.prototype.getToNodePosForWorld = function(e, t) {
                    return t.convertToNodeSpaceAR(e)
                }, e._instance = new e, e
            }();
        cc._RF.pop()
    }, {
        "../manager/PlatformManager": "PlatformManager",
        "./LoadTools": "LoadTools"
    }],
    UIManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2db57i1B6xAH6TGmydefCWN", "UIManager");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__spreadArrays || function() {
                for (var e = 0, t = 0, o = arguments.length; t < o; t++) e += arguments[t].length;
                var a = Array(e),
                    n = 0;
                for (t = 0; t < o; t++)
                    for (var r = arguments[t], i = 0, c = r.length; i < c; i++, n++) a[n] = r[i];
                return a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.UIManager = void 0;
        var i = e("../common/Tools"),
            c = e("../common/weiSanTools"),
            s = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n(t, e), t.OpenUI = function(e, t) {
                    void 0 === t && (t = !1);
                    for (var o, a = [], n = 2; n < arguments.length; n++) a[n - 2] = arguments[n];
                    if (l[e] && (o = l[e]), null == o) return c.weiSan.error("\u672a\u627e\u5230\u8be5UI\u7684\u914d\u7f6e\u4fe1\u606f:" + e), null;
                    this.UIDic.has(e) ? c.weiSan.warn("\u5df2\u7ecf\u6253\u5f00\u8fc7UI:" + e) : (1 == t && this.removeAllUI(), this.CreateUI.apply(this, r([o], a)))
                }, t.CloseUI = function(e) {
                    for (var t, o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
                    if (t = this.UIDic.get(e)) {
                        if (this.UIDic.delete(e), "" == t.name) return;
                        var n = t.getComponent(t.config.com);
                        n && n.closeUI && n.closeUI.apply(n, o)
                    } else c.weiSan.warn("\u5df2\u7ecf\u5173\u95ed\u8fc7UI:" + e)
                }, t.GetUI = function(e) {
                    var t = this.UIDic.get(e);
                    return null != t ? t : (c.weiSan.log("\u6ca1\u6709\u6253\u5f00UI:" + e), null)
                }, t.GetUIForComponent = function(e) {
                    var t = this.UIDic.get(e);
                    return null != t ? t.getComponent(t.config.com) : (c.weiSan.warn("\u6ca1\u6709\u6253\u5f00UI:" + e), null)
                }, t.CreateUI = function(e) {
                    for (var t = this, o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
                    if (null == this.UIDic.get(e.name)) {
                        var n = cc.director.getScene().getChildByName("Canvas");
                        i.Tools.newPrefab(e.resUrl, n, null, e.zIndex, function(a) {
                            a.config = e;
                            var n = a.getComponent(e.com);
                            n && n.openUI && (n.openUI.apply(n, o), n.uiName = e.name), t.UIDic.set(e.name, a)
                        })
                    }
                }, t.removeAllUI = function() {
                    var e = this;
                    this.UIDic.forEach(function(t, o) {
                        e.CloseUI(o.toString())
                    })
                }, t.removeUIDic = function() {
                    this.UIDic.clear()
                }, t.prototype.onDestroy = function() {
                    t.UIDic.delete(this.uiName)
                }, t.UIDic = new Map, t
            }(cc.Component);
        o.UIManager = s;
        var l = {
            OverUI: {
                name: "OverUI",
                resUrl: "OverUI",
                com: "OverUI",
                zIndex: 99
            },
            ReviveUI: {
                name: "ReviveUI",
                resUrl: "ReviveUI",
                com: "ReviveUI",
                zIndex: 99
            },
            MatchingUI: {
                name: "MatchingUI",
                resUrl: "MatchingUI",
                com: "MatchingUI",
                zIndex: 99
            },
            SkinUI: {
                name: "SkinUI",
                resUrl: "SkinUI",
                com: "SkinUI",
                zIndex: 99
            },
            PackUI: {
                name: "PackUI",
                resUrl: "PackUI",
                com: "PackUI",
                zIndex: 99
            },
            LuckUI: {
                name: "LuckUI",
                resUrl: "LuckUI",
                com: "LuckUI",
                zIndex: 99
            },
            StartUseUI: {
                name: "StartUseUI",
                resUrl: "startUseUI",
                com: "StartUseUI",
                zIndex: 99
            },
            PersonUI: {
                name: "PersonUI",
                resUrl: "PersonUI",
                com: "PersonUI",
                zIndex: 100
            },
            LoadUI: {
                name: "LoadUI",
                resUrl: "LoadUI",
                com: "LoadUI",
                zIndex: 100
            }
        };
        cc._RF.pop()
    }, {
        "../common/Tools": "Tools",
        "../common/weiSanTools": "weiSanTools"
    }],
    Util: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a38a9JKWbVKNKoAuUIEKne4", "Util");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            c = i.ccclass,
            s = (i.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n(t, e), t.getNormalizeVector = function(e, t) {
                    var o = t.convertToWorldSpaceAR(t.position),
                        a = e.convertToWorldSpaceAR(e.position);
                    return o.sub(a).normalize()
                }, t.getDistance = function(e, t) {
                    var o = t.convertToWorldSpaceAR(t.position),
                        a = e.convertToWorldSpaceAR(e.position);
                    return o.sub(a).len()
                }, t.vectorsToDegress = function(e, t) {
                    void 0 === t && (t = cc.v2(0, 1));
                    var o = t,
                        a = cc.v2(e.x, e.y).signAngle(o);
                    return cc.misc.radiansToDegrees(-a)
                }, t.degreesToVectors = function(e, t) {
                    void 0 === t && (t = cc.v2(0, 1));
                    var o = cc.misc.degreesToRadians(e);
                    return t.rotate(o)
                }, t.radToVec = function(e, t) {
                    return void 0 === t && (t = cc.v2(0, 1)), t.rotate(-e)
                }, r([c], t)
            }(cc.Component));
        o.default = s,
            function() {
                function e() {}
                Object.defineProperty(e, "_ins", {
                    get: function() {
                        return this._instance
                    },
                    enumerable: !1,
                    configurable: !0
                }), e.prototype.refractionY = function(e) {
                    return Math.atan2(Math.sin(e), -Math.cos(e))
                }, e.prototype.refractionX = function(e) {
                    return Math.atan2(-Math.sin(e), Math.cos(e))
                }, e.refractionY = function(t) {
                    return e._ins.refractionY(t)
                }, e.refractionX = function(t) {
                    return e._ins.refractionX(t)
                }, e._instance = new e
            }(), cc._RF.pop()
    }, {}],
    WordsModel: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2ece89cEWRIPr2lAofwJh4H", "WordsModel"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.WordsModel = void 0;
        var a = e("../common/Tools"),
            n = e("../common/weiSanTools");
        o.WordsModel = {
            gameName: {
                CN: "\u56db\u5b63\u5e73\u5b89",
                CHT: "\u56db\u5b63\u5e73\u5b89",
                EN: "Triple Tile",
                KOR: "\uc0ac\uacc4\uc808 \uacbd\uae30",
                JP: "\u56db\u5b63\u306e\u8a66\u5408",
                TH: "\u0e24\u0e14\u0e39\u0e01\u0e32\u0e25\u0e17\u0e31\u0e49\u0e07\u0e2a\u0e35\u0e48"
            },
            overScoreInfo_0: {
                CN: "\u53ea\u5f970\u5206\uff0c\u5168\u7403\u72ec\u4e00\u4e2a\uff01",
                CHT: "\u53ea\u5f970\u5206\uff0c\u5168\u7403\u7368\u4e00\u500b\uff01",
                EN: "Only 0, the only one in the world!",
                KOR: "0\uc810\ubc16\uc5d0 \uc548 \ub3fc, \uc804 \uc138\uacc4\uc5d0\uc11c \ud558\ub098\uc57c!",
                JP: "0\u70b9\u3057\u304b\u53d6\u308c\u307e\u305b\u3093\u3002\u4e16\u754c\u3067\u552f\u4e00\u3067\u3059",
                TH: "\u0e21\u0e35\u0e40\u0e1e\u0e35\u0e22\u0e07 <NU>0 \u0e08\u0e38\u0e14\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e43\u0e19\u0e42\u0e25\u0e01"
            },
            overScoreInfo_1: {
                CN: "\u51fb\u8d25\u4e86\u5168\u7403",
                CHT: "\u64ca\u6557\u4e86\u5168\u7403",
                EN: "Handy: beat the world ",
                KOR: "\uaca9\ud30c",
                JP: "\u6253\u3061\u8ca0\u304b\u3059",
                TH: "\u0e17\u0e33\u0e43\u0e2b\u0e49\u0e1e\u0e48\u0e32\u0e22\u0e41\u0e1e\u0e49"
            },
            overScoreInfo_2: {
                CN: "\u7684\u73a9\u5bb6\uff01",
                CHT: "\u7684\u73a9\u5bb6\uff01",
                EN: " of the players!",
                KOR: "\uc720\uc800!",
                JP: "\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\uff01",
                TH: "\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e02\u0e2d\u0e07"
            },
            overTitle_1: {
                CN: "\u6211\u771f\u662f\u592a\u5389\u5bb3\u4e86\uff0c\u6211\u5728",
                CHT: "\u6211\u771f\u662f\u592a\u53b2\u5bb3\u4e86\uff0c\u6211\u5728",
                EN: "I'm really great.  I'm in "
            },
            overTitle_2: {
                CN: "\u4e2d,",
                CHT: "\u4e2d,",
                EN: ". "
            },
            getStrForLanguage: function(e, t) {
                if (t = t || a.Tools.getLanguageType(), this[e]) return this[e][t] ? this[e][t] : this[e].EN;
                n.weiSan.log("\u6ca1\u6709\u7ffb\u8bd1:" + e)
            }
        }, cc._RF.pop()
    }, {
        "../common/Tools": "Tools",
        "../common/weiSanTools": "weiSanTools"
    }],
    caidaiTS: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0c729ZL1u9GH40u+HWnrP4G", "caidaiTS");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            c = i.ccclass,
            s = (i.property, e("../model/GameModel")),
            l = e("../common/Tools"),
            d = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return n(t, e), t.prototype.start = function() {}, t.prototype.CaiDai = function(e, t, o) {
                    var a, n = this,
                        r = s.GameModel._ins.gameScore % 4;
                    0 == r ? a = "C" + r + "_" + l.Tools.random(0, 1) : 1 == r ? a = "C" + r + "_" + l.Tools.random(0, 1) : 2 == r ? a = "C" + r + "_" + l.Tools.random(0, 1) : 3 == r && (a = "C" + r + "_" + l.Tools.random(0, 2)), l.Tools.setSpriteFrame(this.node, a);
                    var i = !0;
                    this.node.scale = .6 * Math.random() + .3, 2 != r && (this.node.scale *= .7), Math.random() < .5 ? this.node.setPosition(e) : (i = !1, this.node.setPosition(t)), this.node.scale;
                    var c = .5 * Math.random() + .01,
                        d = 90;
                    i ? d -= 60 * Math.random() : d += 60 * Math.random();
                    var p = cc.v2(Math.cos(d * Math.PI / 180), Math.sin(d * Math.PI / 180));
                    p.mulSelf(Math.random() * o);
                    var u = cc.spawn(cc.moveBy(c + .05, p.x, p.y).easing(cc.easeQuadraticActionOut()), cc.moveBy(10, cc.v2(300 + 500 * Math.random() - 200, 400 * Math.random() - 1500 - 200))),
                        m = cc.spawn(cc.moveBy(c + .05, p.x, p.y).easing(cc.easeQuadraticActionOut()), cc.moveBy(10, cc.v2(500 * Math.random() - 300 - 200, 400 * Math.random() - 1500 - 200)));
                    i ? cc.tween(this.node).then(u).start() : cc.tween(this.node).then(m).start();
                    var h = 40 * Math.random() + 15;
                    if (cc.tween(this.node).repeatForever(cc.tween().by(.1, {
                            angle: h
                        })).start(), Math.random() < .8) {
                        var f = this.node.scaleX;
                        cc.tween(this.node).delay(c).to(2 * c, {
                            scaleX: -f
                        }).start()
                    }
                    cc.tween(this.node).delay(.2 * Math.random() + 1).to(2 * c, {
                        opacity: 0
                    }).call(function() {
                        n.node.destroy()
                    }).start()
                }, r([c], t)
            }(cc.Component);
        o.default = d, cc._RF.pop()
    }, {
        "../common/Tools": "Tools",
        "../model/GameModel": "GameModel"
    }],
    clearTs: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e7368bPxzlC0rJzHYNnB4EM", "clearTs");
        var a, n = this && this.__extends || (a = function(e, t) {
                return (a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    })(e, t)
            }, function(e, t) {
                function o() {
                    this.constructor = e
                }
                a(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
            }),
            r = this && this.__decorate || function(e, t, o, a) {
                var n, r = arguments.length,
                    i = r < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a);
                else
                    for (var c = e.length - 1; c >= 0; c--)(n = e[c]) && (i = (r < 3 ? n(i) : r > 3 ? n(t, o, i) : n(t, o)) || i);
                return r > 3 && i && Object.defineProperty(t, o, i), i
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = e("../common/Tools"),
            c = e("../model/GameModel"),
            s = cc._decorator,
            l = s.ccclass,
            d = s.property,
            p = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.CaiDai = null, t.UP = null, t.Sz = [], t.Frame = null, t.IsOpen = !1, t
                }
                return n(t, e), t.prototype.start = function() {
                    var e = c.GameModel._ins.gameScore % 4,
                        t = "Sea" + e + "_1",
                        o = "Sea" + e + "_2";
                    e % 4 == 0 ? (this.Frame.setPosition(8, 35.5), cc.log(1212)) : e % 4 == 1 ? (this.Frame.setPosition(0, 0), cc.log(1111)) : e % 4 == 2 ? (this.Frame.setPosition(16.5, 16.5), cc.log(1111)) : e % 4 == 3 && (this.Frame.setPosition(0, 3), cc.log(1111)), i.Tools.setSpriteFrame(this.Frame, t);
                    for (var a = 0; a < this.Sz.length; ++a) i.Tools.setSpriteFrame(this.Sz[a], o)
                }, t.prototype.Play = function() {
                    var e = this;
                    if (!this.IsOpen) {
                        this.IsOpen = !0, this.node.active || (this.node.active = !0, this.node.opacity = 255);
                        var t = c.GameModel._ins.gameScore % 4,
                            o = "clear" + t;
                        t % 4 == 0 ? (this.Frame.setPosition(8, 35.5), cc.log(1212)) : t % 4 == 1 ? (this.Frame.setPosition(0, 0), cc.log(1111)) : t % 4 == 2 ? (this.Frame.setPosition(16.5, 16.5), cc.log(1111)) : t % 4 == 3 && (this.Frame.setPosition(0, 3), cc.log(1111)), i.Tools.setSpriteFrame(this.node, o), this.node.scale = 0, cc.tween(this.node).parallel(cc.scaleTo(1, .8).easing(cc.easeQuinticActionInOut()), cc.rotateTo(1.5, 1080).easing(cc.easeQuinticActionInOut())).call(function() {
                            for (var t = c.GameModel._ins.mainGame.gameWidth / 2 + 120, o = -c.GameModel._ins.mainGame.gameHeight / 6, a = 0; a < 150; a++) {
                                var n = cc.instantiate(e.CaiDai);
                                n.setParent(c.GameModel._ins.GameTS.MyGame), n.getComponent("caidaiTS").CaiDai(cc.v2(-t, o), cc.v2(t, o), 1e3)
                            }
                        }).sequence(cc.scaleTo(.25, 1).easing(cc.easeBackIn()), cc.scaleTo(.5, 0).easing(cc.easeQuinticActionIn())).delay(.5).call(function() {
                            c.GameModel._ins.GameTS.GameNext(), e.IsOpen = !1
                        }).start(), this.UPMove()
                    }
                }, t.prototype.UPMove = function() {
                    var e = this;
                    cc.tween(this.UP).sequence(cc.delayTime(1.5), cc.moveBy(.25, cc.v2(0, 300)), cc.callFunc(function() {
                        var t = c.GameModel._ins.gameScore % 4 + 1;
                        4 == t && (t = 0);
                        var o = "Sea" + t + "_1",
                            a = "Sea" + t + "_2";
                        i.Tools.setSpriteFrame(e.Frame, o);
                        for (var n = 0; n < e.Sz.length; ++n) i.Tools.setSpriteFrame(e.Sz[n], a);
                        t % 4 == 0 ? e.Frame.setPosition(8, 35.5) : t % 4 == 1 ? e.Frame.setPosition(0, 0) : t % 4 == 2 ? e.Frame.setPosition(16.5, 16.5) : t % 4 == 3 && e.Frame.setPosition(0, 3)
                    }), cc.delayTime(1), cc.moveBy(1, cc.v2(0, -300)).easing(cc.easeBackOut())).start()
                }, r([d(cc.Prefab)], t.prototype, "CaiDai", void 0), r([d(cc.Node)], t.prototype, "UP", void 0), r([d(cc.Node)], t.prototype, "Sz", void 0), r([d(cc.Node)], t.prototype, "Frame", void 0), r([l], t)
            }(cc.Component);
        o.default = p, cc._RF.pop()
    }, {
        "../common/Tools": "Tools",
        "../model/GameModel": "GameModel"
    }],
    weiSanTools: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ff39aoXMlBNuoJpIycuGqrL", "weiSanTools");
        var a = this && this.__spreadArrays || function() {
            for (var e = 0, t = 0, o = arguments.length; t < o; t++) e += arguments[t].length;
            var a = Array(e),
                n = 0;
            for (t = 0; t < o; t++)
                for (var r = arguments[t], i = 0, c = r.length; i < c; i++, n++) a[n] = r[i];
            return a
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.weiSan = void 0;
        var n = function() {
            function e() {}
            return e.log = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.isLog && console.log.apply(console, a([this.logName], e))
            }, e.logTrace = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.isLog && console.trace.apply(console, a([this.logName], e))
            }, e.error = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.isLog && console.error.apply(console, a([this.logName], e))
            }, e.warn = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.isLog && console.warn.apply(console, a([this.logName], e))
            }, e.initLog = function() {
                console.log(this.logInfo)
            }, e.isLog = !0, e.logName = "\u5fae\u4f1e\u6e38\u620fLog:", e.logInfo = "\u672c\u6e38\u620f\u5305\u542b\u7684\u6240\u6709\u5185\u5bb9\uff08\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\uff1a\u4ee3\u7801\u3001\u56fe\u7247\u3001\u89c6\u50cf\u53ca\u58f0\u97f3\u5185\u5bb9\u3001\u540d\u79f0\uff09\u7684\u6240\u6709\u6743\u5f52\u5317\u4eac\u7c73\u515c\u79d1\u6280\u6709\u9650\u516c\u53f8\u6240\u6709\u3002\u4efb\u4f55\u5355\u4f4d\u6216\u4e2a\u4eba\u5c06\u672c\u6e38\u620f\u63d0\u4f9b\u7684\u5185\u5bb9\u4e0e\u670d\u52a1\u7528\u4e8e\u5546\u4e1a\u3001\u76c8\u5229\u3001\u5e7f\u544a\u6027\u7b49\u76ee\u7684\u65f6\uff0c\u9700\u5f81\u5f97\u5317\u4eac\u7c73\u515c\u79d1\u6280\u6709\u9650\u516c\u53f8\u76f8\u5173\u6743\u5229\u4eba\u7684\u4e66\u9762\u8bb8\u53ef\uff1b\u5c06\u672c\u7f51\u7ad9\u63d0\u4f9b\u7684\u5185\u5bb9\u4e0e\u670d\u52a1\u7528\u4e8e\u975e\u5546\u4e1a\u7528\u9014\u65f6\uff0c\u5e94\u9075\u5b88\u8457\u4f5c\u6743\u6cd5\u4ee5\u53ca\u5176\u4ed6\u76f8\u5173\u6cd5\u5f8b\u7684\u89c4\u5b9a\uff0c\u4e0d\u5f97\u4fb5\u72af\u6e38\u620f\u6240\u6709\u8005\u53ca\u76f8\u5173\u6743\u5229\u4eba\u7684\u6743\u76ca\u3002", e
        }();
        o.weiSan = n, cc._RF.pop()
    }, {}]
}, {}, ["BallTs", "BgTs", "ButtonControl", "MyGameTs", "Util", "caidaiTS", "clearTs", "AdManager", "AdManager_H5", "AdManager_WX", "AdManager_ZJ", "ActionTools", "AudioTools", "LoadTools", "Tools", "weiSanTools", "GameCtrl", "InitGame", "MainGame", "ResArr", "EventManager", "NetworkManager", "PlatformManager", "PoolManager", "UIManager", "GameModel", "OtherModel", "WordsModel", "OverUI"]);