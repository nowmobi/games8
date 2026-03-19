var platform = function() {
    function n() {
        /*a.debug("ad2init!"), -1 != FBInstant.getSupportedAPIs().indexOf("getInterstitialAdAsync") && FBInstant.getInterstitialAdAsync(u).then(function(t) {
            a.debug("ad2inited!"), (o = t).loadAsync().then(function() {
                c = !0
            }).catch(function(t) {
                Laya.timer.once(3e3, null, n)
            })
        }).catch(function(n) {})*/
        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            gdsdk.preloadAd('rewarded').then(response => {
                c = !0
            }).catch(function(t) {
                //Laya.timer.once(3e3, null, n)
            });
        }

    }

    function t(n) {
        /*-1 != FBInstant.getSupportedAPIs().indexOf("getRewardedVideoAsync") && FBInstant.getRewardedVideoAsync(s[n]).then(function(e) {
            r[n] = e,
                function(n) {
                    r[n].loadAsync().then(function() {
                        f[n] = !0
                    }).catch(function(e) {
                        Laya.timer.once(3e3, null, function() {
                            t(n)
                        })
                    })
                }(n)
        }).catch(function(n) {})*/
        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            gdsdk.preloadAd('rewarded').then(response => {
                
            }).catch(function(t) {
               /*Laya.timer.once(3e3, null, function() {
                t(n)
                })*/
            });
        }
    }

    function e(n) {
        var t = "";
        for (k in n) "object" == typeof n[k] ? t += k + ":{" + e(n[k]) + "}" : t += k + ":" + n[k] + ",";
        return t
    }
    var a = {};
    a.start = function(n) {
        /*FBInstant.initializeAsync().then(function() {
            FBInstant.setLoadingProgress(10), n()
        })*/

        n();
    }, a.setLoadingProgress = function(n) {
        //FBInstant.setLoadingProgress(n)
    };
    var o, c, s = ["324885334739659_324914844736708"],
        u = "324885334739659_324908411404018",
        r = [],
        f = [];
    a.adloaded = function(n) {
        return f[n]
    }, a.pending, a.playAD2 = function(t) {
        /*-1 != FBInstant.getSupportedAPIs().indexOf("getInterstitialAdAsync") && !0 === c && (c = !1, a.debug("ad2Play!!"), o.showAsync().then(function() {
            t(), a.debug("ad2Play!!"), Laya.timer.once(1e3, null, function() {
                n()
            })
        }).catch(function(n) {
            a.debug(n.message)
        }))*/

        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            gdsdk.showAd('rewarded').then(function(){
                t(), Laya.timer.once(3e3, null, function() {
                    n()
                });
            }).catch(function(e){
                a.debug(n.message);
            });
        } 

        //t && t();
    }, a.canShowVideo = function() {
        return f[0];    
        //return !0;    
    }, a.playAD = function(n, e) {
       /* -1 != FBInstant.getSupportedAPIs().indexOf("getRewardedVideoAsync") && !0 === f[n] && WatchAd.show(function() {
            f[n] = !1, r[n].showAsync().then(function() {
                e(), Laya.timer.once(1e3, null, function() {
                    t(n)
                })
            }).catch(function(n) {
                a.debug(n.message)
            })
        })*/


        //gdsdk
        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            gdsdk.showAd('rewarded').then(function(){
                e(), Laya.timer.once(3e3, null, function() {
                    t(n)
                });
            }).catch(function(e){
                a.debug(n.message);
            });
        } 

    }, a.supportAD = !1, a.checkCanBuy = function() {
        return a.debug(" checkAPI:" + FBInstant.getSupportedAPIs().indexOf("payments.purchaseAsync")), -1 != FBInstant.getSupportedAPIs().indexOf("payments.purchaseAsync") && a.canbuy
    }, a.showBuy = function(n, t) {
        a.debug("-purchase state is:" + a.canBuy + "-"), a.canBuy && FBInstant.payments.getCatalogAsync().then(function(t) {
            a.debug("getCatalog-");
            var e = t[0];
            for (i in e) "key:" + i + " value:" + e[i] + " ";
            a.debug("-getCataLog-"), FBInstant.payments.purchaseAsync({
                productID: e.productID,
                developerPayload: "foobar"
            }).then(function(t) {
                n();
                var e = "";
                for (i in t) e += "key:" + i + " value:" + t[i] + " ";
                e += "-", a.debug(e)
            }).catch(function(n) {
                a.debug("-pucharseError:" + n.message)
            })
        }).catch(function(n) {
            a.debug("-getCataLogError:" + n.message)
        })
    }, a.debug = function(n) {}, a.getName = function() {
        return FBInstant.player.getName()
    }, a.getPhoto = function() {
        return FBInstant.player.getPhoto()
    }, a.getID = function() {
        return FBInstant.player.getID()
    }, a.invite = function(n, t) {
        FBInstant.context.createAsync("" + n).then(function() {
            Share.getInviteImg(function(n) {
                FBInstant.updateAsync({
                    action: "CUSTOM",
                    cta: "Play",
                    image: n,
                    text: {
                        default: "Come on,let`s bump!",
                        localizations: {
                            en_US: "Come on,let`s bump!",
                            es_LA: "Come on,let`s bump!"
                        }
                    },
                    template: "play_turn",
                    data: {
                        type: "share2"
                    },
                    strategy: "IMMEDIATE",
                    notification: "NO_PUSH"
                })
            }), a.logEvent("inviteFriend"), t && t()
        })
    }, a.share2 = function() {}, a.shareResult = function(n, t, e) {
        FBInstant.shareAsync({
            intent: "REQUEST",
            image: n,
            text: "Wow!",
            data: t
        }).then(function() {
            e && e(), a.logEvent("shareTofb")
        })
    }, a.share = function(n) {
        void 0 !== n && (a.debug(" finished share!!"), n()), FBInstant.context.chooseAsync().then(function() {
            a.logEvent("shareAsyncComplete"), Share.getInviteImg(function(n) {
                FBInstant.updateAsync({
                    action: "CUSTOM",
                    cta: "Play",
                    image: n,
                    text: {
                        default: "Come on,let`s bump!",
                        localizations: {
                            en_US: "Come on,let`s bump!",
                            es_LA: "Come on,let`s bump!"
                        }
                    },
                    template: "play_turn",
                    data: {
                        type: "share2"
                    },
                    strategy: "IMMEDIATE",
                    notification: "NO_PUSH"
                })
            })
        }).then(function(n) {}).catch(function(n) {})
    }, a.afterLoad = function(n) {
        /*FBInstant.startGameAsync().then(function() {
            a.afterInit(n)
        })*/
        a.afterInit(n)
    }, a.createShortCut = function(n) {
        /*FBInstant.canCreateShortcutAsync().then(function(t) {
            t && FBInstant.createShortcutAsync().then(function() {
                n()
            }).catch(function() {})
        })*/
        n();
    }, a.switchGame = function(n) {
        FBInstant.switchGameAsync("397719330799049", {
            from: "bump"
        }).then(function() {
            platform.logEvent("JBClickOut")
        })
    }, a.afterInit = function(n) {
        /*! function(n) {
            FBInstant.getLeaderboardAsync("rank0").then(function(t) {
                d = t, n && n()
            }), FBInstant.getLeaderboardAsync("rank1").then(function(n) {
                return g = n, n.getConnectedPlayerEntriesAsync(50, 0)
            }).then(function(n) {
                User.setHistoryFriends(n), g.setScoreAsync(0)
            })
        }(function() {
            a.getItem([User.dataName], function(t) {
                User.setData(t, function() {
                    n();
                    var t = FBInstant.getEntryPointData();
                    null !== t && ("share" === t.type && 0 === User.loadTimes && a.logEvent("logShare" + Result.shareVersion + t.type2), "share2" === t.type && 0 === User.loadTimes && a.logEvent("logShareUpdateAsync"))
                })
            }), FBInstant.player.subscribeBotAsync().then().catch(function(n) {})
        })*/
        n();
    }, a.initADS = function() {
        //-1 == FBInstant.getSupportedAPIs().indexOf("getRewardedVideoAsync") || t(0), -1 == FBInstant.getSupportedAPIs().indexOf("getInterstitialAdAsync") || n()
    }, a.objStr = e, a.getItem = function(n, t) {
        FBInstant.player.getDataAsync(n).then(function(n) {
            t(n)
        })
    }, a.setItem = function(n) {
        //FBInstant.player.setDataAsync(n).then(function() {})
        window.localStorage.setItem("bump.io", n);
    };
    var d = null;
    a.rankObj = function() {
        return d
    };
    var g = null;
    return a.setScore = function(n, t, e) {
        null != d && d.setScoreAsync(n, t).then(function(n) {
            e && e(n)
        })
    }, a.getSelfRank = function(n) {
        null != d && (a.debug("get rank"), d.getPlayerEntryAsync().then(function(t) {
            a.debug("geted rank"), a.debug(a.objStr(t)), n(t)
        }))
    }, a.getRank = function(n) {
        null != d && d.getEntriesAsync(50, 0).then(function(t) {
            n(t)
        })
    }, a.getRank2 = function(n) {
        null != d && d.getConnectedPlayerEntriesAsync(20, 0).then(function(t) {
            n(t)
        })
    }, a.logEvent = function(n) {
        //FBInstant.logEvent(n)
    }, a
}();