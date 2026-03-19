window.__require = function e(t, a, r) {
    function o(n, s) {
        if (!a[n]) {
            if (!t[n]) {
                var c = n.split("/");
                if (c = c[c.length - 1], !t[c]) {
                    var h = "function" == typeof __require && __require;
                    if (!s && h) return h(c, !0);
                    if (i) return i(c, !0);
                    throw new Error("Cannot find module '" + n + "'")
                }
            }
            var d = a[n] = {
                exports: {}
            };
            t[n][0].call(d.exports, function(e) {
                return o(t[n][1][e] || e)
            }, d, d.exports, e, t, a, r)
        }
        return a[n].exports
    }
    for (var i = "function" == typeof __require && __require, n = 0; n < r.length; n++) o(r[n]);
    return o
}({
    AniTools: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "80e77MCSA9LKrviaST0yufd", "AniTools");
        var r = {
            doLabStrAni: function(e, t, a) {
                e.node.stopAllActions(), e.string = "";
                var r = t.split(""),
                    o = 0,
                    i = a / r.length;
                e.node.runAction(cc.sequence(cc.callFunc(function() {
                    e.string = e.string + r[o], o++
                }), cc.delayTime(i)).repeat(r.length))
            },
            gunNumLabAni: function(e, t) {
                var a = parseInt(e.string);
                if (t != a) {
                    var r = 0,
                        o = t - a >= 50 ? 50 : t - a;
                    e.node.runAction(cc.sequence(cc.callFunc(function() {
                        r >= o - 1 ? e.string = t : (a++, e.string = a), r++
                    }), cc.delayTime(.02)).repeat(o))
                }
            },
            openUIAni: function(e, t, a, r) {
                e.opacity = 0, t.scale = 0, e.runAction(cc.fadeTo(a, 150)), t.runAction(cc.sequence(cc.scaleTo(a, 1).easing(cc.easeBackOut()), cc.callFunc(r)))
            },
            fireColorArr: ["#F5CD4D", "#F77986", "#D0F057", "#7ACCE8", "#E365EE"],
            fireworksAni: function(e, t, a, r) {
                for (var o = 0; o < t; o++) {
                    var i = ToolsJs.newSprite("fire" + this.returnRanNum(1, 4));
                    i.scale = .3 + .5 * Math.random(), i.position = a, i.color = cc.color(this.fireColorArr[this.returnRanNum(0, this.fireColorArr.length - 1)]), e.addChild(i, 88);
                    var n = this.returnRanNum(r - 15, r + 15),
                        s = this.returnRanNum(300, 1e3);
                    this.fireObjAni(i, n, s, 450, .01 * o)
                }
            },
            fireObjAni: function(e, t, a, r) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                    i = .1 + .5 * Math.random();
                e.runAction(cc.rotateBy(i, this.returnRanNum(-360, 360)).repeatForever());
                var n = cc.misc.degreesToRadians(t),
                    s = cc.v2(Math.cos(n) * a, Math.sin(n) * a),
                    c = a / r;
                e.runAction(cc.sequence(cc.delayTime(o), cc.moveBy(c, s).easing(cc.easeQuadraticActionOut()), cc.spawn(cc.moveBy(2 * c * .1, cc.v2(.1 * s.x, -.1 * s.y)), cc.fadeOut(2 * c * .1)), cc.removeSelf(!0)))
            },
            bombAni: function(e, t, a, r, o) {
                var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "#FFFFFF",
                    n = ToolsJs.newSprite(t);
                n.color = cc.color(i), e.addChild(n, 88);
                var s = this.returnRanNum(-180, 180);
                return this.bombObjAni(n, s, a, r, o), n
            },
            bombObjAni: function(e, t, a, r, o) {
                var i = cc.misc.degreesToRadians(t),
                    n = cc.v2(Math.cos(i) * a, Math.sin(i) * a),
                    s = a / r,
                    c = o ? 0 : 1;
                e.runAction(cc.sequence(cc.spawn(cc.scaleTo(s + .1, c), cc.moveBy(s, n).easing(cc.easeQuadraticActionOut())), cc.fadeOut(.1), cc.removeSelf(!0)))
            },
            playAni: function(e, t) {
                e.getComponent(cc.Animation).play(t)
            },
            stopAni: function(e, t) {
                e.getComponent(cc.Animation).stop(t)
            },
            addNodeAni: function(e, t, a, r, o, i, n) {
                for (var s = e.getComponent(cc.Animation), c = [], h = r; h <= o; h++) {
                    var d = new cc.SpriteFrame(cc.url.raw("resources/" + t + h + ".png"));
                    c.push(d)
                }
                var l = cc.AnimationClip.createWithSpriteFrames(c, 5);
                l.name = a, l.speed = n, l.wrapMode = i ? cc.WrapMode.Loop : cc.WrapMode.Normal, s.addClip(l)
            },
            addGlodAni: function(e, t, a, r, o) {
                r > 30 && (r = 30);
                for (var i = 0; i < r; i++) {
                    var n = GameUiTools.newSprite("texture/glod.png");
                    e.addChild(n, 20), n.position = t, n.scale = .5, this.glodAni(n, 800, 150, a)
                }
                null != o && e.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                    o()
                })))
            },
            glodAni: function(e, t, a, r) {
                var o = cc.degreesToRadians(this.returnRanNum(0, 360)),
                    i = cc.v2(e.x + a * Math.cos(o), e.y + a * Math.sin(o)),
                    n = a / t,
                    s = cc.pDistance(i, r) / t,
                    c = .1 * Math.random() + .1;
                e.runAction(cc.sequence(cc.scaleTo(c, -.5, .5), cc.scaleTo(c, .5, .5)).repeatForever()), e.runAction(cc.sequence(cc.moveTo(n, i).easing(cc.easeQuadraticActionInOut()), cc.moveTo(s, r).easing(cc.easeQuadraticActionInOut()), cc.removeSelf(!0)))
            },
            returnRanNum: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            },
            danMuAni: function(e, t, a, r) {
                for (var o = 0; o < a; o++) {
                    var i = t[this.returnRanNum(0, t.length - 1)],
                        n = this.createText(i, e),
                        s = this.returnRanNum(r + 80, r - 80);
                    n.position = cc.v2(e.width / 2 + n.width * n.scale, s);
                    var c = this.returnRanNum(3, 4) + .5 * Math.random();
                    n.runAction(cc.sequence(cc.delayTime(.3 * o), cc.moveBy(c, cc.v2(-e.width - n.width * n.scale * 2, 0)), cc.removeSelf(!0)))
                }
            },
            LabColorArr: ["#000000", "#FF0202", "#3F02FF", "#02FFCC", "#2AFF02", "#FFC202", "#9AFF02"],
            createText: function(e, t) {
                var a = new cc.Node,
                    r = a.addComponent(cc.Label),
                    o = this.returnRanNum(0, this.LabColorArr.length - 1);
                return a.color = cc.color(this.LabColorArr[o]), r.string = e, a.scale = .8 + .5 * Math.random(), t.addChild(a, 20), a
            }
        };
        window.AniTools = r, cc._RF.pop()
    }, {}],
    AudioArrJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0704bHzoc5K641bRCwUhW6D", "AudioArrJs"), cc.Class({
            extends: cc.Component,
            properties: {
                audiosArr: {
                    type: cc.AudioClip,
                    default: []
                }
            },
            onLoad: function() {
                null != ToolsJs && (ToolsJs.AudioArrJs = this), this.audioClipDic = {};
                for (var e = 0; e < this.audiosArr.length; e++) {
                    var t = this.audiosArr[e];
                    this.audioClipDic[t.name] = t
                }
            },
            playAudio: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .3,
                    a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return null != this.audioClipDic[e] ? cc.audioEngine.play(this.audioClipDic[e], a, t) : (console.log("\u6ca1\u6709\u627e\u5230\u97f3\u9891\uff1a" + e), null)
            },
            getAudioClip: function(e) {
                return null != this.audioClipDic[e] ? this.audioClipDic[e] : (console.log("\u6ca1\u6709\u627e\u5230\u97f3\u9891\uff1a" + e), null)
            }
        }), cc._RF.pop()
    }, {}],
    GameConfig: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f0663sWtfNKCKOL+Hvnt0cI", "GameConfig");
        var r = {
            GameClubButton: null,
            GameScene: null,
            launchScene: null,
            Bros: null,
            caS: null,
            MAIN_MENU_NUM: "Classic",
            gameScore: 0,
            standScore: 30,
            GAME_OVER_BOOL: !0,
            publicGameBool: !1,
            ranLinkData: null,
            recGameData: null,
            InfoData: null,
            endShow0: null,
            endShow1: null,
            endShow2: null,
            endShow3: null,
            infoGameName: null,
            showText: null,
            startText: null,
            moreGameText: null,
            playAgainText: null,
            playNum: 0,
            noTouchBool: !0,
            returnRanNum: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            }
        };
        t.exports = r, cc._RF.pop()
    }, {}],
    GameUiTools: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "b21e8tF461OFalpptyeuAE2", "GameUiTools");
        e("GameConfig");
        var r = {
            newSprite: function(e, t) {
                var a = new cc.Node;
                return t ? (e = e.split(".")[0], a.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(e)) : a.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame("res/raw-assets/resources/" + e), a
            },
            setNodeSpriteFrame: function(e, t) {
                e.getComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(t)
            },
            setButtonClickEvents: function(e, t, a, r, o) {
                var i = new Array;
                void 0 == t.length ? i[0] = t : i = t;
                for (var n = 0; n < i.length; n++) {
                    var s = new cc.Component.EventHandler;
                    s.target = e.node, s.component = e.node.name, s.handler = a, void 0 == t.length ? s.customEventData = r : s.customEventData = n;
                    var c = i[n].addComponent(cc.Button);
                    c.clickEvents.push(s), (void 0 == o || o) && (c.transition = cc.Button.Transition.SCALE, c.duration = .1, c.zoomScale = 1.2)
                }
            },
            scheduleOnce: function(e, t, a) {
                e.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(t, e)))
            },
            loadingScene: function(e, t) {
                t ? cc.loader.loadRes("panel/LoadingLayer", function(t, a) {
                    var r = cc.instantiate(a);
                    cc.director.getScene().children[0].addChild(r), cc.director.preloadScene(e, function() {
                        cc.director.loadScene(e)
                    })
                }) : cc.director.preloadScene(e, function() {
                    cc.director.loadScene(e)
                })
            },
            loadingLayer: function(e) {
                cc.loader.loadRes(e, function(e, t) {
                    if (!e) {
                        var a = cc.instantiate(t);
                        cc.director.getScene().children[0].addChild(a, 100)
                    }
                })
            }
        };
        t.exports = r, cc._RF.pop()
    }, {
        GameConfig: "GameConfig"
    }],
    HttpManagerJs: [function(e, t, a) {
        "use strict";
        var r;

        function o(e, t, a) {
            return t in e ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = a, e
        }
        cc._RF.push(t, "197e1hfNnxIcJx73V3VhUxY", "HttpManagerJs");
        var i = e("GameConfig"),
            n = (o(r = {
                URL: "http://g.vsane.com/Service/Share/index",
                cacheList: null,
                isBusy: null,
                req: null,
                perform: null,
                retGameId: 0
            }, "cacheList", []), o(r, "ctor", function() {}), o(r, "checkHave", function() {
                this.isBusy || this.sendOne()
            }), o(r, "httpInitUrl", function(e) {
                var t = window.location.href,
                    a = t.substring(0, t.lastIndexOf("//") + 2) + window.location.host + "/Service/Share/index";
                this.URL = a, console.log("data", this.URL), this.retGameId = e
            }), o(r, "send", function(e, t, a, r) {
                this.cacheList.push({
                    type: e,
                    data: t,
                    func: a,
                    target: r
                }), this.isBusy || this.sendOne()
            }), o(r, "sendOne", function() {
                if (0 != this.cacheList.length) {
                    this.isBusy = !0, this.perform = this.cacheList.shift(), this.req = cc.loader.getXMLHttpRequest(), this.req.onreadystatechange = this.onDataHandler.bind(this), this.req.onerror = this.onErrorHandler.bind(this), this.req.ontimeout = this.onTimeoutHandler.bind(this), this.req.timeout = 2e3, cc.log("pos", this.URL), this.req.open("POST", this.URL), this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                    var e = this.returnLanguage();
                    console.log("gameIdid", this.retGameId);
                    var t = this.retGameId,
                        a = {
                            type: this.perform.type,
                            gid: t,
                            mid: null,
                            data: this.perform.data,
                            languageType: e
                        },
                        r = "send=" + JSON.stringify(a);
                    this.req.send(r)
                }
            }), o(r, "onDataHandler", function() {
                if (404 != this.req.status) {
                    if (4 == this.req.readyState && this.req.status >= 200 && this.req.status <= 207 && this.req.responseText) {
                        var e = JSON.parse(this.req.responseText);
                        this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, e.error, e.data, e.commendGame, e.gameInfo) : this.perform.func(e)
                    }
                } else {
                    var t = i.launchScene,
                        a = i.Bros;
                    i.caS;
                    cc.director.loadScene(t, null, function() {
                        if (a) {
                            "";
                            var e = document.getElementById("GameDiv");
                            e && (e.style.backgroundImage = "")
                        }
                        cc.loader.onProgress = null, console.log("Success to load scene: " + t)
                    })
                }
            }), o(r, "returnLanguage", function() {
                return ("" + window.navigator.language).toLocaleLowerCase()
            }), o(r, "onErrorHandler", function() {
                cc.log("\u7f51\u7edc\u9519\u8bef"), this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
            }), o(r, "onTimeoutHandler", function() {
                cc.log("\u8bf7\u6c42\u8d85\u65f6"), this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
            }), o(r, "clearAll", function() {
                for (var e = this.cacheList.length, t = 0; t < e; t++) {
                    var a = this.cacheList[t];
                    a && (a.target ? a.func.call(a.target, -1) : a.func(-1))
                }
                this.cacheList.length = 0
            }), r);
        t.exports = n, cc._RF.pop()
    }, {
        GameConfig: "GameConfig"
    }],
    LanguageSetJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "4754e8KuPZJCqklCNyKpG29", "LanguageSetJs");
        t.exports = {
            language_1: {
            game_name: "\u300cDriving To Travel\u300d",
                game_name1: "Driving To Travel",
                game_info: "Hold on to the vehicle and speed up. Take care to avoid the traffic.",
                txtStart: "Start",
                txtMore: "More Game",
                txtAgain: "Play Again",
                txtShare1: "In Game ",
                txtShare2: " Let's play together!",
                bgRgb: "#3698C5",
                gameT1: "Follow Us",
                gameT2: "Poppy Granny Unblocked Game",
                gameT3: "Poppy Granny Unblocked Game",
                gameUrl1: "https://zazgames.com/game/poppy-granny-unblocked-game",
                gameUrl2: "https://zazgames.com/game/poppy-granny-unblocked-game",
                gameT11: "Focus WeChat",
                gameT12: "Focus Kakao",
                gameT13: "Focus Line",
                gameEndL: "Game OVer",
                gameEndL1: "View the score later"
            },
            language_2: {
                game_name: "\u300cDriving To Travel\u300d",
                game_name1: "Driving To Travel",
                game_info: "Hold on to the vehicle and speed up. Take care to avoid the traffic.",
                txtStart: "Start",
                txtMore: "More Game",
                txtAgain: "Play Again",
                txtShare1: "In Game ",
                txtShare2: " Let's play together!",
                bgRgb: "#3698C5",
                gameT1: "Follow Us",
                gameT2: "Poppy Granny Unblocked Game",
                gameT3: "Poppy Granny Unblocked Game",
                gameUrl1: "https://zazgames.com/game/poppy-granny-unblocked-game",
                gameUrl2: "https://zazgames.com/game/poppy-granny-unblocked-game",
                gameT11: "Focus WeChat",
                gameT12: "Focus Kakao",
                gameT13: "Focus Line",
                gameEndL: "Game OVer",
                gameEndL1: "View the score later"
            }
        }, cc._RF.pop()
    }, {}],
    LoadSceneJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3ef908fwfNIwJsOjET8tCh2", "LoadSceneJs");
        var r = {
            goToCover: function(e, t, a, r, o) {
                var i = e;
                i = null == i || void 0 == i || e, console.log("LoadBoolBeforeLoadS", i), this.needShow = !1, i && i ? (this.needShow = !0, showMyAds()) : this.needShow = !1, this.needShow ? (void 0 == preloader && this.startGoToGame(a, r, o), resCompleteFlag = !0, adCompleteFlag && resCompleteFlag && this.startGoToGame(a, r, o)) : this.startGoToGame(a, r, o)
            },
            startGoToGame: function(e, t, a) {
                console.log("goToScene"), noAdGoToScene()
            }
        };
        t.exports = r, cc._RF.pop()
    }, {}],
    MainGameJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0e7a8SkMLxEY7nCB1Bqi8WZ", "MainGameJS");
        var r = e("GameConfig"),
            o = e("GameUiTools"),
            i = e("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                gameEndLay: cc.Node,
                startBgNode: cc.Node,
                sceneScore: cc.Label,
                gameOverT1: cc.Label,
                gameOverT2: cc.Label,
                mainGame: cc.Node,
                gameCamera: cc.Node,
                mapBg: cc.Node,
                maxScoreLab: cc.Label,
                dataJson: {
                    type: cc.JsonAsset,
                    default: null
                }
            },
            onLoad: function() {
                r.mainGameJs = this, this.gameOveEndBool = !1, this.gameOverNum = 0, this.gameWidth = cc.winSize.width, this.gameHeight = cc.winSize.height, r.playNum >= 2 && (this.startBgNode.active = !1), null == r.RoadsData && (r.RoadsData = this.dataJson.json.RoadsData, console.log("RoadsData:", r.RoadsData)), r.playNum++, this.addTouchEvents(), o.loadingLayer("panel/LinkIconSpr")
            },
            addTouchEvents: function() {
                this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                    if (r.GAME_OVER_BOOL && r.noTouchBool) return this.on_touch_begin(e), !0
                }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this), this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this)
            },
            on_touch_begin: function(e) {
                var t = this.node.convertToNodeSpaceAR(e.getLocation());
                if (this.lastPos = e.getLocation(), this.isTest) {
                    if (this.isMoveCanvas) return void(this.currentOther = null);
                    if (null != this.currentOther) return;
                    for (var a = 0; a < this.otherRoadArr.length; a++) {
                        this.otherRoadArr[a].color = cc.color("#FFFFFF")
                    }
                    for (var r = 0; r < this.otherRoadArr.length; r++) {
                        var o = this.otherRoadArr[r],
                            i = this.gameCamera.getComponent(cc.Camera).getWorldToCameraPoint(o.position),
                            n = o.getBoundingBoxToWorld();
                        if (new cc.Rect(i.x - n.width / 2, i.y - n.height / 2, n.width, n.height).contains(t)) return o.color = cc.color("#FF0000"), void(this.currentOther = o)
                    }
                } else this.shaCheNum = 0, this.onTouch = !0
            },
            on_touch_move: function(e) {
                if (this.isTest) {
                    var t = e.getLocation();
                    null == this.currentOther ? (this.gameCamera.x -= t.x - this.lastPos.x, this.gameCamera.y -= t.y - this.lastPos.y, this.lastPos = e.getLocation()) : (this.currentOther.x += t.x - this.lastPos.x, this.currentOther.y += t.y - this.lastPos.y, this.lastPos = e.getLocation())
                }
            },
            on_touch_end: function() {
                this.onTouch = !1, this.createShaChePar()
            },
            gameEnd: function() {
                r.GAME_OVER_BOOL = !1, i.gameOverShowText(r.gameScore, 1), this.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(this.gameEnd1.bind(this))))
            },
            gameEnd1: function() {
                this.gameOveEndBool = !0, this.gameOverT1.string = i.gameEndLText, this.gameOverT2.string = i.gameEndL1Text, this.gameOverT1.node.zIndex = 999, this.gameOverT2.node.zIndex = 999, this.gameOverT1.node.opacity = 0, this.gameOverT1.node.y = 100, this.gameOverT1.node.runAction(cc.sequence(cc.delayTime(.2), cc.spawn(cc.fadeIn(1), cc.moveBy(1, 0, -50)), cc.delayTime(.3), cc.callFunc(this.initEndLayer.bind(this)), cc.removeSelf())), this.gameOverT2.node.opacity = 0, this.gameOverT2.node.y = this.gameOverT1.node.y - 100, this.gameOverT2.node.runAction(cc.sequence(cc.delayTime(.2), cc.spawn(cc.fadeIn(1), cc.moveBy(1, 0, -50)), cc.delayTime(.3), cc.removeSelf()))
            },
            initEndLayer: function() {
                i.gotoEndLayer()
            },
            start: function() {
                this.initGame()
            },
            update: function(e) {
                this.starMove && !this.isTest && (this.lastCarPos = this.playerCar.position, this.updateCarMove(), this.updateOtherCarMove(), this.updateOtherCar(), this.updateRemoveRoad(), this.updateCarPar(), this.updateBgPos(this.playerCar.x - this.lastCarPos.x, this.playerCar.y - this.lastCarPos.y)), this.gameOverGoToOVer()
            },
            gameOverGoToOVer: function() {
                this.gameOveEndBool && (this.gameOverNum++, this.gameOverNum >= 900 && (this.gameOverNum = 0, this.gameOveEndBool = !1))
            },
            initGame: function() {
                if (this.isTest = !1, this.isTest && this.initTestNode(), this.roadArr = [], this.otherRoadArr = [], this.otherCarArr = [], this.treeArr = [], this.cityArr = [], this.shaCheArr = [], this.moveSpeed = 2, this.addMoveSpeed = 10, this.otherCarSpeed = 5, this.maxScore = ToolsJs.getStorage("maxScore") || 0, this.maxScoreLab.string = this.maxScore, this.yuanR = 160, this.createRoadTemp = 0, this.addCarParTemp = 0, this.addCarTime = 300, this.cityNum = 0, this.shaCheNum = 0, this.moveDisc = 0, this.addCityTemp = 0, this.getCityType(), this.isTest)
                    for (var e = 0; e < 1; e++) this.createRoadTemp = 0, this.createRoad();
                else this.initRoad();
                this.mainGame.scale = 1, this.playerCar = this.mainGame.getChildByName("playerCar"), this.cityPanel = this.mainGame.getChildByName("cityPanel"), this.cityLab = this.cityPanel.getChildByName("cityLab").getComponent(cc.Label), this.nextCityLab = this.cityPanel.getChildByName("nextCityLab").getComponent(cc.Label), this.newScore = this.node.getChildByName("newScore"), this.cityPanel.active = !1, this.initPlayerCar(), this.initMapBg(), this.xuePar = this.mainGame.getChildByName("xuePar"), this.yuPar = this.mainGame.getChildByName("yuPar"), this.leiPar = this.mainGame.getChildByName("leiPar"), this.starMove = !0, this.isPlayWeather = !1, this.jingDiAudioSource = ToolsJs.newAduioSource("jingDi")
            },
            initPlayerCar: function() {
                this.lastMoveRoad = null, this.moveRoad = null, this.playerCar.groupIndex = 1, ToolsJs.setTexture(this.playerCar, "car_" + ToolsJs.returnRandom(1, 5)), this.playerCar.zIndex = c.player, this.playerCar.parPos1 = this.playerCar.getChildByName("parPos1"), this.playerCar.parPos2 = this.playerCar.getChildByName("parPos2");
                var e = this.roadArr[0];
                this.playerCar.position = cc.v2(e.x, e.y - e.height / 2), this.gameCamera.position = this.playerCar.position, this.playerCar.angle = 0
            },
            initRoad: function() {
                var e = r.RoadsData;
                this.lastRoadArrData = e[ToolsJs.returnRandom(0, e.length - 1)], this.nextRoadArrData = e[ToolsJs.returnRandom(0, e.length - 1)], this.addRoadArr(this.lastRoadArrData), this.addRoadArr(this.nextRoadArrData);
                var t = ToolsJs.newSprite("road_1");
                t.groupIndex = 1, t.height = this.gameHeight, this.mainGame.addChild(t, c.road), t.position = cc.v2(this.roadArr[0].x, this.roadArr[0].y - t.height / 2)
            },
            addRoadArr: function(e) {
                for (var t = null, a = 0; a < e.roadArr.length; a++) {
                    var r = e.roadArr[a];
                    0 == a ? t = this.createRoad(r.iType, r.height) : this.createRoad(r.iType, r.height)
                }
                for (var o = 0; o < e.otherRoadArr.length; o++) {
                    var i = e.otherRoadArr[o],
                        n = cc.v2(i.x, i.y);
                    this.createOtherRoad(n, t, i.roT, i.height)
                }
                console.log("arrDataID:", e.id), this.addCityTemp >= this.cityArr.length && (this.addCityTemp = 0, this.createCity(t)), this.addCityTemp++, this.clearTree()
            },
            createRoad: function(e, t) {
                this.createRoadTemp++;
                var a = 0 == this.roadArr.length ? null : this.roadArr[this.roadArr.length - 1];
                e = e || 1;
                var r = null;
                if (null != a) {
                    var o = (r = this.getRoadData(a.iType)).toType;
                    null == t && (e = o[ToolsJs.returnRandom(0, o.length - 1)])
                }
                var i = this.getRoadData(e),
                    n = ToolsJs.newSprite(i.sprName);
                if (n.groupIndex = 1, n.angle = i.roT, n.iType = e, n.sprName = i.sprName, n.isMove = !1, this.mainGame.addChild(n, c.road), (n.iType >= 1 && n.iType <= 4 || n.iType >= 13 && n.iType <= 16) && (n.height = t || ToolsJs.returnRandom(.3 * n.height, n.height)), null == a) n.position = cc.v2(0, -this.gameHeight / 2 + n.height / 2);
                else {
                    var s = 90 == r.roT || -90 == r.roT ? a.height : a.width,
                        h = 90 == i.roT || -90 == i.roT ? n.height : n.width,
                        d = 90 == r.roT || -90 == r.roT ? a.width : a.height,
                        l = 90 == i.roT || -90 == i.roT ? n.width : n.height;
                    n.x = a.x + (s + h) / 2 * i.addX, n.y = a.y + (d + l) / 2 * i.addY, 0 == i.addX ? n.x += Math.abs(h - s) / 2 * i.reduceNum : n.y += Math.abs(l - d) / 2 * i.reduceNum
                }
                return this.isTest && this.createRoadTemp <= 10 && null != r && this.isInterRoad(n, a) ? (1 == r.toType.length && (this.roadArr.splice(this.roadArr.indexOf(a), 1), a.destroy()), n.destroy(), this.createRoad()) : (this.addTree(n), n.tiShi = this.createTiShi(n), this.roadArr.push(n), n)
            },
            createOtherRoad: function(e, t, a, r) {
                var o = ToolsJs.newSprite("road_1");
                o.groupIndex = 1, this.mainGame.addChild(o, c.road), this.isTest ? (o.position = cc.v2(0, 0), this.currentOther = o) : o.position = cc.v2(t.x + e.x, t.y + e.y), o.addCarTime = ToolsJs.returnRandom(0, .3 * this.addCarTime), o.isMove = !1, o.height = r || o.height * (1.5 + Math.random()), console.log("otherHeigt:", o.height), this.isTest ? (o.angle = 90, o.color = cc.color("#FF0000")) : o.angle = a, 90 == parseInt(o.angle) ? o.moveType = Math.random() > .5 ? 1 : 2 : o.moveType = Math.random() > .5 ? 3 : 4, this.otherRoadArr.push(o)
            },
            createOtherCar: function(e) {
                var t = Math.random() <= .3 ? ToolsJs.returnRandom(1, 7) : ToolsJs.returnRandom(1, 4),
                    a = ToolsJs.newSprite("others_" + t);
                a.groupIndex = 1, a.scale = this.playerCar.scale, this.mainGame.addChild(a, c.otherCar);
                var r = void 0,
                    o = void 0;
                if (e.moveType <= 2) {
                    var i = 1 == e.moveType ? 1 : -1;
                    r = cc.v2(e.x + e.height / 2 * i, e.y), o = cc.v2(e.x + e.height / 2 * -i, e.y), a.angle = 90 * i
                } else {
                    var n = 3 == e.moveType ? 0 : 1,
                        s = 3 == e.moveType ? -1 : 1;
                    r = cc.v2(e.x, e.y + e.height / 2 * s), o = cc.v2(e.x, e.y + e.height / 2 * -s), a.angle = 180 * n
                }
                a.moveType = e.moveType, a.opacity = 0, a.position = r, a.runAction(cc.fadeIn(.2)), a.tempTo = o, a.iType = t, a.isMove = !0, this.otherCarArr.push(a)
            },
            isInterRoad: function(e, t) {
                for (var a = 0; a < this.roadArr.length; a++) {
                    var r = this.roadArr[a];
                    if (r != t && ToolsJs.isRectInterRect(r, e)) return !0
                }
                return !1
            },
            getRoadData: function(e) {
                for (var t = 0; t < s.length; t++) {
                    var a = s[t];
                    if (a.iType == e) return a
                }
                return !1
            },
            getCurrentRoad: function(e) {
                for (var t = 0; t < this.roadArr.length; t++) {
                    var a = this.roadArr[t];
                    if (!a.isMove && ToolsJs.isBoxContainPos(a, e) && (null == this.moveRoad || t == this.roadArr.indexOf(this.moveRoad) + 1)) return a.isMove = !0, a
                }
                return null
            },
            setOtherRoad: function() {
                for (var e = 0; e < this.otherRoadArr.length; e++) {
                    var t = this.otherRoadArr[e];
                    !t.isMove && ToolsJs.isBoxContainPos(t, this.playerCar.position) && (t.isMove = !0)
                }
            },
            updateCarMove: function() {
                if (0 != this.starMove) {
                    this.moveRoad = this.getCurrentRoad(this.playerCar.position) || this.moveRoad, this.setOtherRoad();
                    var e = 1 == this.onTouch ? this.addMoveSpeed : this.moveSpeed,
                        t = this.getRoateSpeed(e);
                    this.playerCar.angle += t;
                    var a = this.cityArr[this.cityArr.length - 1];
                    Math.abs(this.playerCar.x - a.x) <= this.gameWidth / 2 && Math.abs(this.playerCar.y - a.y) <= this.playerCar.height / 2 && 0 == this.cityPanel.active && this.openCityPanel(a.iType);
                    var o = -cc.misc.degreesToRadians(this.playerCar.angle);
                    this.playerCar.x += Math.sin(o) * e, this.playerCar.y += Math.cos(o) * e, this.gameCamera.position = this.playerCar.position, this.onTouch ? (this.shaCheNum += 2, this.shaCheNum >= 50 && (this.shaCheNum = 50), null == this.addSpeedAudio && (this.addSpeedAudio = ToolsJs.playAudio("addSpeed", .5, !0))) : (this.shaCheNum >= 10 && (this.shaCheNum--, this.updateShaChePar(e)), null != this.addSpeedAudio && (ToolsJs.stopAudio(this.addSpeedAudio), ToolsJs.playAudio("shaChe", .5), this.addSpeedAudio = null)), this.moveDisc += e, this.moveDisc >= 200 && (this.moveDisc = 0, r.gameScore++, this.updateCostom(), this.sceneScore.string = r.gameScore, r.gameScore > this.maxScore && (ToolsJs.setStorage("maxScore", r.gameScore), this.maxScore > 0 && this.showMaxScore()), r.gameScore % 20 == 0 && this.playWeather())
                }
            },
            playWeather: function() {
                if (!this.isPlayWeather && Math.random() <= .3) {
                    this.isPlayWeather = !0;
                    var e = ToolsJs.returnRandom(1, 1);
                    console.log("isPlayWeather"), 1 == e && (ToolsJs.playAudio("yuAudio"), this.leiPar.active = !0, this.leiPar.opacity = 0, this.leiPar.runAction(cc.sequence(cc.fadeTo(.1, 150), cc.fadeOut(.1), cc.fadeTo(.1, 150), cc.fadeOut(.1), cc.fadeTo(.1, 150), cc.fadeOut(.1), cc.delayTime(1), cc.callFunc(function() {
                        this.yuPar.getComponent(cc.ParticleSystem).resetSystem()
                    }, this), cc.fadeTo(.1, 150), cc.fadeOut(.1), cc.fadeTo(.1, 150), cc.fadeOut(.1)))), this.node.runAction(cc.sequence(cc.delayTime(11), cc.callFunc(function() {
                        this.leiPar.active = !1, this.yuPar.getComponent(cc.ParticleSystem).stopSystem(), this.xuePar.active = !1, this.isPlayWeather = !1
                    }, this)))
                }
            },
            showMaxScore: function() {},
            updateOtherCar: function() {
                if (0 != this.starMove)
                    for (var e = 0; e < this.otherRoadArr.length; e++) {
                        var t = this.otherRoadArr[e];
                        t.addCarTime++, t.addCarTime >= this.addCarTime && (t.addCarTime = ToolsJs.returnRandom(0, .3 * this.addCarTime), this.createOtherCar(t))
                    }
            },
            updateRemoveRoad: function() {
                if (null != this.lastRoadArrData) {
                    var e = this.roadArr[this.lastRoadArrData.roadArr.length - 1],
                        t = this.roadArr[this.lastRoadArrData.roadArr.length],
                        a = ToolsJs.getToWorldPos(this.gameCamera),
                        o = new cc.Rect(a.x, a.y, 2 * this.gameWidth, 2 * this.gameHeight);
                    if (t.isMove && !o.intersects(e.getBoundingBoxToWorld())) {
                        for (var i = this.lastRoadArrData.roadArr.length, n = 0; n < i; n++) {
                            for (var s = this.roadArr[n], c = 0; c < s.treeArr.length; c++) this.removeTree(s.treeArr[c]);
                            s.treeArr = [], null != s.tiShi && s.tiShi.destroy(), s.destroy(), this.roadArr.splice(n, 1), i--, n--
                        }
                        for (var h = this.lastRoadArrData.otherRoadArr.length, d = 0; d < h; d++) {
                            var l = this.otherRoadArr[d];
                            this.clearOtherCar(l), l.destroy(), this.otherRoadArr.splice(d, 1), h--, d--
                        }
                        var u = r.RoadsData;
                        this.lastRoadArrData = this.nextRoadArrData, this.nextRoadArrData = u[ToolsJs.returnRandom(0, u.length - 1)], this.addRoadArr(this.nextRoadArrData)
                    }
                }
            },
            getRoateSpeed: function(e) {
                var t = this.getRoadData(this.moveRoad.iType),
                    a = 0;
                return "road_2" == t.sprName || "road_3" == t.sprName ? a = -90 / (this.yuanR * Math.PI / 2 / e) * t.moveDir : (this.playerCar.angle = -t.roT, 0 == t.addX ? this.playerCar.x = this.moveRoad.x : this.playerCar.y = this.moveRoad.y), a
            },
            initMapBg: function() {
                this.mapBgArr = [];
                for (var e = 0; e < 3; e++)
                    for (var t = 0; t < 3; t++) {
                        var a = cc.instantiate(this.mapBg);
                        a.width = this.gameWidth, a.height = this.gameHeight, a.position = cc.v2(a.width * e, a.height * t), this.mainGame.addChild(a, c.mapBg), this.mapBgArr.push(a)
                    }
                this.mapBg.active = !1
            },
            setMapBgScale: function(e) {
                var t = e.children;
                for (var a in t)
                    if (t.hasOwnProperty(a)) {
                        var r = t[a];
                        r.scaleX = Math.random() >= .5 ? 1 : -1, r.scaleY = Math.random() >= .5 ? 1 : -1
                    }
            },
            updateBgPos: function(e, t) {
                for (var a = 0; a < this.mapBgArr.length; a++) {
                    var r = this.mapBgArr[a];
                    if (Math.abs(r.x + e) >= 2 * r.width) {
                        var o = Math.abs(r.x) - 2 * r.width,
                            i = r.x > 0 ? -1 : 1;
                        r.x = r.width * i - o * i
                    }
                    if (Math.abs(r.y + t) >= 2 * r.height) {
                        var n = Math.abs(r.y) - 2 * r.height,
                            s = r.y > 0 ? -1 : 1;
                        r.y = r.height * s - n * s
                    }
                }
                for (var c = 0; c < this.mapBgArr.length; c++) {
                    var h = this.mapBgArr[c];
                    h.x -= e, h.y -= t
                }
            },
            updateCarPar: function() {
                this.addCarParTemp++, this.addCarParTemp <= 5 && (this.addCarParTemp = 0, this.createCarPar())
            },
            createCarPar: function() {
                var e, t = void 0;
                (t = Math.random() > .5 ? ToolsJs.getToWorldPosAR(this.playerCar.parPos1) : ToolsJs.getToWorldPosAR(this.playerCar.parPos2)).x += ToolsJs.returnRandom(-3, 3), e = this.mainGame.convertToNodeSpaceAR(t);
                var a = ToolsJs.newSprite("par");
                a.color = cc.color("#C5C4C4"), a.groupIndex = 1, this.mainGame.addChild(a, c.par), a.position = e, a.scale = .5 * Math.random() + .5, a.runAction(cc.sequence(cc.spawn(cc.fadeOut(.8), cc.scaleTo(.8, .2)), cc.removeSelf(!0)))
            },
            removeAllRoad: function() {
                for (var e = 0; e < this.roadArr.length; e++) {
                    this.roadArr[e].destroy()
                }
                this.roadArr = []
            },
            updateOtherCarMove: function() {
                for (var e = ToolsJs.getToWorldPos(this.gameCamera), t = (new cc.Rect(e.x - this.gameWidth / 2, e.y - this.gameHeight / 2, this.gameWidth, this.gameHeight), 1e3), a = 0; a < this.otherCarArr.length; a++) {
                    var r = this.otherCarArr[a];
                    if (this.setOtherMove(r), r.isMove) {
                        var o = -cc.misc.degreesToRadians(r.angle);
                        r.x += Math.sin(o) * this.otherCarSpeed, r.y += Math.cos(o) * this.otherCarSpeed
                    }
                    if (5 == r.iType || 6 == r.iType) {
                        var i = ToolsJs.getDistance(r.position, this.playerCar.position);
                        i <= 1e3 && i < t && (t = i)
                    }
                    ToolsJs.getDistance(r.tempTo, r.position) <= this.otherCarSpeed ? (r.destroy(), this.otherCarArr.splice(a, 1), a--) : ToolsJs.isRectInterRect(this.playerCar, r) && (this.starMove = !1, this.gameOverAni(r))
                }
                1e3 == t || this.jingDiAudioSource.isPlaying ? 1e3 == t && this.jingDiAudioSource.isPlaying ? this.jingDiAudioSource.stop() : this.jingDiAudioSource.isPlaying && (this.jingDiAudioSource.volume = (1e3 - t) / 1e3) : this.jingDiAudioSource.play()
            },
            setOtherMove: function(e) {
                for (var t = null, a = 0; a < this.otherCarArr.length; a++) {
                    var r = this.otherCarArr[a];
                    r.isMove && r != e && ToolsJs.getDistance(e.position, r.position) <= r.height && (t = r)
                }
                null != t ? e.moveType == t.moveType ? t.isMove = !1 : (1 == e.moveType && e.x - e.height / 2 > t.x + t.width / 2 && (e.isMove = !1), 2 == e.moveType && e.x + e.height / 2 < t.x - t.width / 2 && (e.isMove = !1), 3 == e.moveType && e.y + e.height / 2 < t.y - t.width / 2 && (e.isMove = !1), 4 == e.moveType && e.y - e.height / 2 > t.x + t.width / 2 && (e.isMove = !1)) : e.isMove = !0
            },
            clearOtherCar: function(e) {
                for (var t = 0; t < this.otherCarArr.length; t++) {
                    var a = this.otherCarArr[t];
                    ToolsJs.isBoxContainPos(e, a.position) && (a.destroy(), this.otherCarArr.splice(t, 1), t--)
                }
            },
            gameOverAni: function(e) {
                cc.audioEngine.stopAll(), ToolsJs.playAudio("interCar", .5);
                var t = e.x < this.playerCar.x ? 15 : -15,
                    a = Math.atan2(this.playerCar.y - e.y, this.playerCar.x - e.x),
                    r = cc.v2(350 * Math.cos(a), 350 * Math.sin(a)),
                    o = ToolsJs.getDistance(this.playerCar.position, e.position) / 2;
                this.interCarAni(cc.v2(Math.cos(a) * o + e.x, Math.sin(a) * o + e.y)), this.playerCar.runAction(cc.rotateBy(.02, t).repeatForever()), this.playerCar.runAction(cc.sequence(cc.moveBy(1, r), cc.callFunc(function() {
                    this.playerCar.stopAllActions(), this.gameEnd()
                }, this))), e.runAction(cc.rotateBy(.02, -t).repeatForever()), e.runAction(cc.sequence(cc.moveBy(1, cc.v2(-r.x, -r.y)), cc.callFunc(function() {
                    e.stopAllActions()
                }, this)))
            },
            updateShaChePar: function(e) {
                if (!(this.shaCheArr.length < 2))
                    for (var t = 0; t < 2; t++) {
                        var a = this.shaCheArr[this.shaCheArr.length - 1 - t];
                        a.scaleY += e / a.height
                    }
            },
            createShaChePar: function() {
                for (var e = 0; e < 2; e++) {
                    var t = ToolsJs.newSprite("singleColor");
                    t.width = 8, t.height = 5, t.anchorY = 0, t.groupIndex = 1, t.color = cc.color("#000000"), t.angle = this.playerCar.angle, this.mainGame.addChild(t, c.shaChe);
                    var a = ToolsJs.getToWorldPosAR(this.playerCar["parPos" + (e + 1)]);
                    t.position = this.mainGame.convertToNodeSpaceAR(a), this.shaCheArr.push(t)
                }
            },
            addTree: function(e) {
                var t = e.width > e.height ? e.width : e.height,
                    a = ToolsJs.getToWorldPosAR(e),
                    r = new cc.Rect(a.x - t / 2, a.y - t / 2, t, t);
                e.treeArr = [];
                for (var o = 0; o < 10; o++) {
                    var i = this.createTree(r);
                    e.treeArr.push(i)
                }
            },
            removeTree: function(e) {
                e.destroy(), this.treeArr.splice(this.treeArr.indexOf(e), 1)
            },
            clearTree: function() {
                for (var e = 0; e < this.treeArr.length; e++) {
                    var t = this.treeArr[e];
                    this.isInterRoadAndOther(t) && (t.destroy(), this.treeArr.splice(e, 1), e--)
                }
            },
            createTree: function(e) {
                var t = ToolsJs.newSprite("tree_" + ToolsJs.returnRandom(1, 8));
                return t.groupIndex = 1, this.mainGame.addChild(t, c.tree), t.x = ToolsJs.returnRandom(e.x - e.width / 2, e.x + e.width / 2), t.y = ToolsJs.returnRandom(e.y - e.height / 2, e.y + e.height / 2), this.treeArr.push(t), t
            },
            createCity: function(e) {
                var t = this.cityTypeArr[this.cityNum % 10],
                    a = ToolsJs.newSprite("jianzhu_" + t);
                this.cityNum++, a.groupIndex = 1, a.scale = 1, a.iType = t, this.mainGame.addChild(a, c.city), a.position = this.getCityPos(a, e), this.cityArr.push(a)
            },
            createTiShi: function(e) {
                if ("road_1" == e.sprName) {
                    var t = ToolsJs.newSprite("tishi");
                    return t.groupIndex = 1, this.mainGame.addChild(t, c.tiShi), 90 == Math.abs(e.angle) ? t.angle = -e.angle : t.angle = e.angle, t.scale = .6, t.position = e.position, t
                }
                return null
            },
            interCarAni: function(e) {
                for (var t = 0; t < 3; t++) {
                    var a = ToolsJs.newSprite("interPar");
                    a.groupIndex = 1, this.mainGame.addChild(a, c.player + 1), a.position = e, a.opacity = 150, a.scale = 0, a.runAction(cc.sequence(cc.delayTime(.3 * t), cc.spawn(cc.scaleTo(.5, 2).easing(cc.easeQuadraticActionOut()), cc.fadeOut(.5, 150)), cc.removeSelf(!0)))
                }
                for (var r = 0; r < 30; r++) {
                    var o = ToolsJs.returnRandom(50, 250),
                        i = AniTools.bombAni(this.mainGame, "circle_2", o, 300, !1);
                    i.width = 10, i.height = 10, i.groupIndex = 1
                }
            },
            removeCity: function() {
                this.cityArr[0].destroy(), this.cityArr.splice(0, 1)
            },
            getCityPos: function(e, t) {
                var a = Math.random() >= .5 ? t.x - (e.width + t.width + 30) / 2 : t.x + (e.width + t.width + 30) / 2,
                    r = t.y - t.height / 2;
                return cc.v2(a, r)
            },
            getCityType: function() {
                this.cityTypeArr = [];
                for (var e = 0; e < 10; e++) this.cityTypeArr.push(e + 1);
                for (var t = 0; t < this.cityTypeArr.length; t++) {
                    var a = ToolsJs.returnRandom(1, 10),
                        r = this.cityTypeArr[t];
                    this.cityTypeArr[t] = this.cityTypeArr[a - 1], this.cityTypeArr[a - 1] = r
                }
            },
            isInterRoadAndOther: function(e) {
                for (var t = 0; t < this.roadArr.length; t++) {
                    var a = this.roadArr[t];
                    if (ToolsJs.isRectInterRect(a, e)) return !0
                }
                for (var r = 0; r < this.otherRoadArr.length; r++) {
                    var o = this.otherRoadArr[r];
                    if (ToolsJs.isRectInterRect(o, e)) return !0
                }
                for (var i = 0; i < this.treeArr.length; i++) {
                    var n = this.treeArr[i];
                    if (n != e && ToolsJs.isRectInterRect(n, e)) return !0
                }
                for (var s = 0; s < this.cityArr.length; s++) {
                    var c = this.cityArr[s];
                    if (c != e && ToolsJs.isRectInterRect(c, e)) return !0
                }
                return !1
            },
            updateCostom: function() {
                this.addCarTime--, this.addCarTime <= 150 && (this.addCarTime = 150), this.otherCarSpeed += .02, this.otherCarSpeed >= 10 && (this.otherCarSpeed = 10)
            },
            openCityPanel: function(e) {
                var t = (this.cityTypeArr.indexOf(e) + 1) % this.cityTypeArr.length;
                console.log(this.cityTypeArr), this.cityLab.string = "\u672c\u7ad9\uff1a" + n[e - 1], this.nextCityLab.string = "\u4e0b\u4e00\u7ad9\uff1a" + n[this.cityTypeArr[t] - 1], this.cityPanel.active = !0, this.cityPanel.opacity = 0, this.cityPanel.runAction(cc.sequence(cc.fadeIn(.5), cc.delayTime(1), cc.fadeOut(.5), cc.callFunc(function() {
                    this.cityPanel.active = !1
                }, this)))
            },
            initTestNode: function() {
                this.TestNode = this.node.getChildByName("TestNode"), this.TestNode.active = !0, this.currentOther = null, this.isMoveCanvas = !1, this.starMove = !1, this.fangDaBtn = this.TestNode.getChildByName("fangDaBtn"), this.fangDaBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.gameCamera.getComponent(cc.Camera).zoomRatio += .2, console.log(this.gameCamera.getComponent(cc.Camera).zoomRatio)
                }, this), this.suoXiaoBtn = this.TestNode.getChildByName("suoXiaoBtn"), this.suoXiaoBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.gameCamera.getComponent(cc.Camera).zoomRatio -= .2, console.log(this.gameCamera.getComponent(cc.Camera).zoomRatio)
                }, this), this.addOtherBtn = this.TestNode.getChildByName("addOtherBtn"), this.addOtherBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.createOtherRoad(this.roadArr[0]), this.isMoveCanvas = !1
                }, this), this.addBtn = this.TestNode.getChildByName("addBtn"), this.addBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.createRoad()
                }, this), this.starBtn = this.TestNode.getChildByName("starBtn"), this.starBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.isTest = !1, this.starMove = !0, this.gameCamera.getComponent(cc.Camera).zoomRatio = 1
                }, this), this.aginBtn = this.TestNode.getChildByName("aginBtn"), this.aginBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.removeAllRoad();
                    for (var e = 0; e < 30; e++) this.createRoadTemp = 0, this.createRoad()
                }, this), this.logBtn = this.TestNode.getChildByName("logBtn"), this.logBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.logClick()
                }, this), this.swBtn = this.TestNode.getChildByName("swBtn"), this.swBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    null != this.currentOther && (this.currentOther.angle = 0 != this.currentOther.angle ? 0 : 90)
                }, this), this.overBtn = this.TestNode.getChildByName("overBtn"), this.overBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.isTest = !0, this.starMove = !1, this.initPlayerCar();
                    for (var e = 0; e < this.roadArr.length; e++) {
                        this.roadArr[e].isMove = !1
                    }
                }, this), this.setBtn = this.TestNode.getChildByName("setBtn"), this.setBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    null != this.currentOther && (this.currentOther.height = parseInt(this.heightInput.string))
                }, this), this.removeBtn = this.TestNode.getChildByName("removeBtn"), this.removeBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.roadArr.length <= 5 || (this.roadArr[this.roadArr.length - 1].destroy(), this.roadArr.splice(this.roadArr.length - 1, 1))
                }, this), this.moveBtn = this.TestNode.getChildByName("moveBtn"), this.moveBtn.on(cc.Node.EventType.TOUCH_END, function() {
                    this.isMoveCanvas = !this.isMoveCanvas, console.log("isMoveCanvas:" + this.isMoveCanvas)
                }, this), this.heightInput = this.TestNode.getChildByName("heightInput").getComponent(cc.EditBox)
            },
            logClick: function() {
                for (var e = {
                        id: 0,
                        roadArr: [],
                        otherRoadArr: []
                    }, t = 0; t < this.roadArr.length; t++) {
                    var a = {};
                    a.iType = this.roadArr[t].iType, a.height = this.roadArr[t].height, e.roadArr.push(a)
                }
                for (var r = 0; r < this.otherRoadArr.length; r++) {
                    var o = {},
                        i = this.otherRoadArr[r];
                    o.x = parseInt(i.x - this.roadArr[0].x), o.y = parseInt(i.y - this.roadArr[0].y), o.roT = parseInt(i.angle), o.height = parseInt(i.height), e.otherRoadArr.push(o)
                }
                console.log(JSON.stringify(e))
            }
        });
        var n = ["\u5317\u4eac", "\u7518\u8083", "\u5e7f\u4e1c", "\u6d77\u5357", "\u6c5f\u82cf", "\u6c5f\u82cf", "\u5929\u6d25", "\u65b0\u7586", "\u897f\u85cf", "\u4e91\u5357"],
            s = [{
                iType: 1,
                sprName: "road_1",
                toType: [1, 5, 6, 17, 18],
                roT: 0,
                reduceNum: 1,
                addX: 0,
                addY: 1
            }, {
                iType: 2,
                sprName: "road_1",
                toType: [2, 7, 8, 19, 20],
                roT: 90,
                reduceNum: -1,
                addX: 1,
                addY: 0
            }, {
                iType: 3,
                sprName: "road_1",
                toType: [3, 9, 10, 21, 22],
                roT: 180,
                reduceNum: 1,
                addX: 0,
                addY: -1
            }, {
                iType: 4,
                sprName: "road_1",
                toType: [4, 11, 12, 23, 24],
                roT: -90,
                reduceNum: -1,
                addX: -1,
                addY: 0
            }, {
                iType: 13,
                sprName: "road_1",
                toType: [1, 5, 6, 17, 18],
                roT: 0,
                reduceNum: -1,
                addX: 0,
                addY: 1
            }, {
                iType: 14,
                sprName: "road_1",
                toType: [2, 7, 8, 19, 20],
                roT: 90,
                reduceNum: 1,
                addX: 1,
                addY: 0
            }, {
                iType: 15,
                sprName: "road_1",
                toType: [3, 9, 10, 21, 22],
                roT: 180,
                reduceNum: -1,
                addX: 0,
                addY: -1
            }, {
                iType: 16,
                sprName: "road_1",
                toType: [4, 11, 12, 23, 24],
                roT: -90,
                reduceNum: 1,
                addX: -1,
                addY: 0
            }, {
                iType: 5,
                sprName: "road_2",
                toType: [14],
                roT: 0,
                reduceNum: 1,
                addX: 0,
                addY: 1,
                moveDir: 1
            }, {
                iType: 6,
                sprName: "road_2",
                toType: [16],
                roT: -90,
                reduceNum: -1,
                addX: 0,
                addY: 1,
                moveDir: -1
            }, {
                iType: 7,
                sprName: "road_2",
                toType: [3],
                roT: -90,
                reduceNum: -1,
                addX: 1,
                addY: 0,
                moveDir: 1
            }, {
                iType: 8,
                sprName: "road_2",
                toType: [1],
                roT: 180,
                reduceNum: 1,
                addX: 1,
                addY: 0,
                moveDir: -1
            }, {
                iType: 9,
                sprName: "road_2",
                toType: [2],
                roT: 90,
                reduceNum: 1,
                addX: 0,
                addY: -1,
                moveDir: -1
            }, {
                iType: 10,
                sprName: "road_2",
                toType: [4],
                roT: 180,
                reduceNum: -1,
                addX: 0,
                addY: -1,
                moveDir: 1
            }, {
                iType: 11,
                sprName: "road_2",
                toType: [15],
                roT: 0,
                reduceNum: -1,
                addX: -1,
                addY: 0,
                moveDir: -1
            }, {
                iType: 12,
                sprName: "road_2",
                toType: [13],
                roT: 90,
                reduceNum: 1,
                addX: -1,
                addY: 0,
                moveDir: 1
            }, {
                iType: 17,
                sprName: "road_3",
                toType: [3],
                roT: 0,
                reduceNum: 1,
                addX: 0,
                addY: 1,
                moveDir: 1
            }, {
                iType: 18,
                sprName: "road_3",
                toType: [15],
                roT: 0,
                reduceNum: -1,
                addX: 0,
                addY: 1,
                moveDir: -1
            }, {
                iType: 19,
                sprName: "road_3",
                toType: [16],
                roT: -90,
                reduceNum: 1,
                addX: 1,
                addY: 0,
                moveDir: -1
            }, {
                iType: 20,
                sprName: "road_3",
                toType: [4],
                roT: -90,
                reduceNum: -1,
                addX: 1,
                addY: 0,
                moveDir: 1
            }, {
                iType: 21,
                sprName: "road_3",
                toType: [1],
                roT: 180,
                reduceNum: 1,
                addX: 0,
                addY: -1,
                moveDir: -1
            }, {
                iType: 22,
                sprName: "road_3",
                toType: [13],
                roT: 180,
                reduceNum: -1,
                addX: 0,
                addY: -1,
                moveDir: 1
            }, {
                iType: 23,
                sprName: "road_3",
                toType: [14],
                roT: 90,
                reduceNum: 1,
                addX: -1,
                addY: 0,
                moveDir: 1
            }, {
                iType: 24,
                sprName: "road_3",
                toType: [2],
                roT: 90,
                reduceNum: -1,
                addX: -1,
                addY: 0,
                moveDir: -1
            }],
            c = {
                mapBg: 0,
                city: 1,
                road: 1,
                tiShi: 2,
                player: 5,
                otherCar: 4,
                par: 4,
                tree: 1,
                shaChe: 3
            };
        cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    MainManage: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "946adGkxvdBmZXnlD952XtK", "MainManage");
        var r = e("HttpManagerJs"),
            o = e("LanguageSetJs"),
            i = e("GameConfig"),
            n = e("LoadSceneJs"),
            s = e("GameUiTools"),
            c = {
                gameHttpId: 0,
                subScoreHttp: null,
                gameNameText: null,
                gameInfoText: null,
                txtStartText: null,
                txtMoreText: null,
                txtAgainText: null,
                gameEndLText: null,
                gameEndL1Text: null,
                bgLayRgb: null,
                gameEndName1: null,
                gameEndName2: null,
                gameEndUrl1: null,
                gameEndUrl2: null,
                langugeType: 1,
                ranLinkData: null,
                adShowBefore: !1,
                adShowAfter: !0,
                endLayCol: null,
                moreBtnBgCol: null,
                moreBtnTextCol: null,
                recGameData: null,
                recGameUrl: null,
                recGameDelPau: null,
                recGameDelPer: null,
                recGameimg1: null,
                recGameimg2: null,
                recGamePos: null,
                InfoData: null,
                endShow0: null,
                endShow1: null,
                endShow2: null,
                endShow3: null,
                infoGameName: null,
                showText: null,
                startText: null,
                moreGameText: null,
                playAgainText: null,
                endHttpShowInfo: null,
                moreGameUrl: null,
                init: function(e, t, a) {
                    if (!i.publicGameBool) {
                        if (i.playNum >= 1) return;
                        i.playNum++
                    }
                    i.launchScene = e, i.Bros = t, i.caS = a, this.curType = 1, this.getHttpGameId(), this.gamePV_load(), console.log("thisg", this.gameHttpId), r.httpInitUrl(this.gameHttpId), r.send("101", null, this.getLinkGameReturn, this);
                    var o = this.initLanguage();
                    this.gameNameText = o.game_name, this.gameInfoText = o.game_info, this.txtStartText = o.txtStart, this.txtMoreText = o.txtMore, this.txtAgainText = o.txtAgain, this.gameEndLText = o.gameEndL, this.gameEndL1Text = o.gameEndL1, this.bgLayRgb = o.bgRgb, this.gameEndName1 = o.gameT2, this.gameEndName2 = o.gameT3, this.gameEndUrl1 = o.gameUrl1, this.gameEndUrl2 = o.gameUrl2, this.langugeType = this.curType
                },
                getHttpGameId: function() {
                    var e = window.location.href,
                        t = e.substring(0, e.lastIndexOf("//") + 2),
                        a = window.location.host,
                        r = t + a + "/Service/Share/index";
                    this.gameAllHttp = r, cc.log("gameAll", this.gameAllHttp), this.subScoreHttp = t + a + "/Service/Score/index", this.gamePvHttp = t + a + "/Service/GamePv/index";
                    var o = document.URL,
                        i = 0,
                        n = o.substring(o.lastIndexOf("/game/") + 1, o.length).split("/");
                    n.length >= 2 && (i = n[1]), this.gameHttpId = i, cc.log("gameId", i);
                    e.substring(e.lastIndexOf("//") + 4, e.lastIndexOf("com") + 3);
                    this.moreGameUrl = this.httpHead + this.endHttp
                },
                gameOverShowText: function(e, t) {
                    this.ajaxLoad(this.subScoreHttp, "gameScore=" + e + "&gameId=" + this.gameHttpId + "&gameType=" + t, this.scoreResult)
                },
                gamePV_load: function() {
                    this.ajaxLoad(this.gamePvHttp, "gameId=" + this.gameHttpId, this.ajaxOnLogoResult)
                },
                ajaxOnLogoResult: function() {},
                ajaxLoad: function(e, t, a) {
                    var r = cc.loader.getXMLHttpRequest();
                    r.onreadystatechange = a, r.open("POST", e), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), r.send(t)
                },
                scoreResult: function(e) {
                    if (null != e.currentTarget.response && "" != e.currentTarget.response) {
                        var t = JSON.parse(e.currentTarget.response);
                        cc.log("endshow", t.content), c.endHttpShowInfo = t.content
                    }
                },
                initLanguage: function() {
                    var e = null;
                    return cc.sys.language == cc.sys.LANGUAGE_CHINESE ? (this.curType = 1, e = o.language_1) : (cc.log("\u82f1\u6587"), this.curType = 2, e = o.language_2), e
                },
                getLinkGameReturn: function(e, t, a, r) {
                    if (console.log("err0", e), console.log("err1", t), console.log("err2", a), console.log("err3", r), 0 == e) {
                        this.ranLinkData = t, this.adShowBefore = this.ranLinkData.gameSet.adShowBefore, this.adShowAfter = this.ranLinkData.gameSet.adShowAfter, this.endLayCol = this.ranLinkData.gameSet.endLayerColor, this.moreBtnBgCol = this.ranLinkData.gameSet.moreBtnBgCol, this.moreBtnTextCol = this.ranLinkData.gameSet.moreBtnTextCol, this.moreGameUrl = this.ranLinkData.gameSet.moreBtnUrl, this.recGameData = a, this.ranRecGameData(), this.InfoData = r, this.endShow0 = this.InfoData.endShow0, this.endShow1 = this.InfoData.endShow1, this.endShow2 = this.InfoData.endShow2, this.endShow3 = this.InfoData.endShow3, this.infoGameName = this.InfoData.gameName, this.showText = this.InfoData.showText, this.startText = this.InfoData.startText, this.moreGameText = this.InfoData.moreGame, this.playAgainText = this.InfoData.rePlay, this.gameInfoText = this.InfoData.showText, this.txtStartText = this.InfoData.startText, this.txtMoreText = this.InfoData.moreGame, this.txtAgainText = this.InfoData.rePlay, console.log("LoadMainGameScnee");
                        var o = i.launchScene,
                            s = i.Bros,
                            c = i.caS;
                        n.goToCover(this.adShowBefore, this.adShowAfter, o, s, c)
                    }
                },
                ranRecGameData: function() {
                    if (null != this.recGameData && "" != this.recGameData) {
                        this.returnBool = !1;
                        var e = this.recGameData.length,
                            t = i.returnRanNum(1, e) - 1;
                        cc.log("ranNNN", t), this.recGameUrl = this.recGameData[t].data_link, this.recGameDelPer = this.recGameData[t].delay_per, this.recGameDelPau = this.recGameData[t].delay_pau, this.recGameimg1 = this.recGameData[t].img_1, this.recGameimg2 = this.recGameData[t].img_2, this.recGamePos = this.recGameData[t].poistion
                    }
                },
                ranLinkUrl: function() {
                    if (null != this.ranLinkData && this.ranLinkData.gameList && null != this.ranLinkData.gameList) {
                        var e = this.ranLinkData.gameList.length,
                            t = i.returnRanNum(1, e) - 1;
                        return cc.log("templ", t, this.ranLinkData.gameList), cc.log("url", this.ranLinkData.gameList[0].gameName, this.ranLinkData.gameList[0].gameUrl), t
                    }
                    return null
                },
                gotoEndLayer: function() {
                    if (i.publicGameBool) this.showGameEndLayer();
                    else {
                        if (adEndComplete = !1, resEndComplete = !1, this.needShow = null, 1 == window.navigator.onLine) {
                            var e = this.adShowAfter;
                            console.log("ad", e), (e = null == e || void 0 == e || this.adShowAfter) ? (this.needShow = !0, console.log("showMyad"), showMyAds()) : this.needShow = !1
                        } else console.log("showOver1"), this.showGameEndLayer(), this.needShow = null;
                        console.log("showMyad2", this.needShow), null != this.needShow && (console.log("showMyad3"), this.needShow ? (console.log("pre", preloader), void 0 == preloader && this.showGameEndLayer(), resEndComplete = !0, adEndComplete && resEndComplete && (console.log("showOver1"), this.showGameEndLayer())) : (console.log("gam"), this.showGameEndLayer()))
                    }
                },
                showGameEndLayer: function() {
                    console.log("Gottttttgameend"), s.loadingLayer("panel/GameOverLayer")
                }
            };
        t.exports = c, cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LanguageSetJs: "LanguageSetJs",
        LoadSceneJs: "LoadSceneJs"
    }],
    PrefabArrJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f7d52gMY+JPmboVW82nVjyr", "PrefabArrJs"), cc.Class({
            extends: cc.Component,
            properties: {
                PrefabArr: [cc.Prefab]
            },
            onLoad: function() {
                void 0 != ToolsJs && (ToolsJs.PrefabArrJs = this), this.addPrefabs()
            },
            addPrefabs: function() {
                this.prefabsArr = {};
                for (var e = 0; e < this.PrefabArr.length; e++) {
                    var t = this.PrefabArr[e];
                    this.prefabsArr[t.name] = t
                }
            },
            getPrefabs: function(e) {
                return null != this.prefabsArr[e] ? this.prefabsArr[e] : (console.log("\u6ca1\u6709\u9884\u5236\u4f53\uff1a" + e), null)
            }
        }), cc._RF.pop()
    }, {}],
    SpriteFrameJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "1dbb7PMZLNF6IN8h8C51ocw", "SpriteFrameJs"), cc.Class({
            extends: cc.Component,
            properties: {
                SpriteFrameArr: [cc.SpriteFrame]
            },
            onLoad: function() {
                void 0 != ToolsJs && (ToolsJs.SpriteFrameJs = this), this.addSpriteFrame()
            },
            addSpriteFrame: function() {
                this.spriteArr = {};
                for (var e = 0; e < this.SpriteFrameArr.length; e++) {
                    var t = this.SpriteFrameArr[e];
                    null != t && (this.spriteArr[t.name] = t)
                }
            },
            getSpriteFrame: function(e) {
                return null != this.spriteArr[e] ? this.spriteArr[e] : (console.log("\u6ca1\u6709\u6dfb\u52a0\u56fe\u7247\uff1a" + e), null)
            }
        }), cc._RF.pop()
    }, {}],
    ToolsJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "00bd7u5QBZI351EbUWj/tPu", "ToolsJs");
        var r = {
            SpriteFrameJs: null,
            AudioArrJs: null,
            setStorage: function(e, t, a) {
                a && (t = JSON.stringify(t)), cc.sys.localStorage.setItem(e, t)
            },
            getStorage: function(e, t) {
                var a = cc.sys.localStorage.getItem(e);
                return isNaN(a) || (a = parseInt(a)), "NaN" == a.toString() && (a = null), t && null != a && (a = JSON.parse(a)), a
            },
            logJsonObject: function(e) {
                console.log(JSON.stringify(e))
            },
            loadJson: function(e, t) {},
            writeJson: function(e, t) {
                if (cc.sys.isBrowser) {
                    console.log("\u6d4f\u89c8\u5668");
                    var a = new Blob([e], {
                            type: "application/json"
                        }),
                        r = document.createElement("a");
                    r.download = t, r.innerHTML = "Download File", null != window.webkitURL ? r.href = window.webkitURL.createObjectURL(a) : (r.href = window.URL.createObjectURL(a), r.onclick = destroyClickedElement, r.style.display = "none", document.body.appendChild(r)), r.click()
                }
            },
            newSprite: function(e) {
                if (null != this.SpriteFrameJs.getSpriteFrame(e)) {
                    var t = new cc.Node;
                    return t.addComponent(cc.Sprite).spriteFrame = this.SpriteFrameJs.getSpriteFrame(e), t
                }
                return null
            },
            setTexture: function(e, t) {
                e.getComponent(cc.Sprite).spriteFrame = this.SpriteFrameJs.getSpriteFrame(t)
            },
            clonePrefabs: function(e, t, a) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                    o = this.PrefabArrJs.getPrefabs(e);
                if (null != o) {
                    var i = cc.instantiate(o);
                    return null != t && t.addChild(i, r), null != a && (i.position = a), i
                }
                return console.log("\u514b\u9686\u9884\u5236\u4f53\u5931\u8d25:" + e), null
            },
            newLabel: function(e, t) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : .5,
                    o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : .5,
                    i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
                    n = new cc.Node;
                n.anchorX = r, n.anchorY = o;
                var s = n.addComponent(cc.Label);
                return s.string = e, s.fontSize = a, t.addChild(n, i), n
            },
            playAudio: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .3,
                    a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return null != this.AudioArrJs ? this.AudioArrJs.playAudio(e, t, a) : cc.audioEngine.play(cc.url.raw("resources/music/" + e + ".mp3"), a, t)
            },
            stopAudio: function(e) {
                null != e && cc.audioEngine.stop(e)
            },
            newAduioSource: function(e) {
                var t = void 0;
                if (null != this.AudioArrJs) t = this.AudioArrJs.getAudioClip(e);
                else {
                    if (null == e) return console.log("clip\u4e0d\u80fd\u4e3a\u7a7a\uff01"), null;
                    t = e
                }
                var a = new cc.Node;
                return a.addComponent(cc.AudioSource).clip = t, a.getComponent(cc.AudioSource)
            },
            delayTimeCall: function(e, t, a, r) {
                e.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(t, r)))
            },
            getDistance: function(e, t) {
                return e.sub(t).mag()
            },
            getToNodePos: function(e, t) {
                var a = e.parent.convertToWorldSpaceAR(e.position);
                return t.convertToNodeSpaceAR(a)
            },
            getToWorldPosAR: function(e) {
                return e.parent.convertToWorldSpaceAR(e.position)
            },
            getToWorldPos: function(e) {
                return e.parent.convertToWorldSpace(e.position)
            },
            isBoxContainPos: function(e, t) {
                return e.getBoundingBox().contains(t)
            },
            isBoxContainWorldPos: function(e, t) {
                return e.getBoundingBoxToWorld().contains(t)
            },
            isRectInterRect: function(e, t) {
                return e.getBoundingBoxToWorld().intersects(t.getBoundingBoxToWorld())
            },
            returnRandom: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            }
        };
        window.ToolsJs = r, cc._RF.pop()
    }, {}],
    gameOverJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3621brbM61BsYFG7fM/74TL", "gameOverJs");
        var r = e("GameUiTools"),
            o = e("GameConfig"),
            i = e("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                bgLayer: cc.Node,
                scoreBg: cc.Node,
                overScoreT: cc.Label,
                overInfoT: cc.Label,
                moreBtn: cc.Button,
                leftBtn: cc.Button,
                rightBtn: cc.Button,
                midGameText: cc.Label,
                leftBtnText: cc.Label,
                rightBtnText: cc.Label
            },
            onLoad: function() {
                this.bgLayer.color = cc.color(i.bgLayRgb), this.standardScore = o.standScore, this.game_max_score = 200, this.rigthBtnGameName = null, this.rightBtnGameUrl = null, this.UIPosChange(), this.addClickBtns()
            },
            UIPosChange: function() {
                this.overScoreT.string = o.gameScore, console.log("lang", i.langugeType);
                var e = null;
                e = 1 == i.langugeType ? this.getContentByScore(o.gameScore, i.gameNameText) : this.getContentByScore2(o.gameScore, i.gameNameText), console.log("nihao", i.endHttpShowInfo), null != i.endHttpShowInfo && "" != i.endHttpShowInfo && (cc.log("gototo"), e = i.endHttpShowInfo), this.overInfoT.string = e;
                var t = this.overInfoT.node.height;
                if (this.overInfoT.node.height = Math.ceil(e.length * this.overInfoT.fontSize / this.overInfoT.node.width) * t, document.title = e, this.moreBtn.node.y = this.scoreBg.y - this.overInfoT.node.height - this.scoreBg.height - 20, this.leftBtn.node.y = this.moreBtn.node.y - 130, this.rightBtn.node.y = this.moreBtn.node.y - 130, console.log("gameOver txtMoreText", i.txtMoreText), this.midGameText.string = i.txtMoreText, this.leftBtnText.string = i.txtAgainText, this.tempArr = this.gameFocus(), null != i.ranLinkUrl()) {
                    var a = i.ranLinkUrl(),
                        r = i.ranLinkData.gameList[a].gameName;
                    this.rigthBtnGameName = r, this.rightBtnGameUrl = i.ranLinkData.gameList[a].gameUrl
                }
                null != this.rigthBtnGameName && "" != this.rigthBtnGameName ? this.rightBtnText.string = this.rigthBtnGameName : this.rightBtnText.string = this.tempArr[0]
            },
            gameFocus: function() {
                var e = [],
                    t = null,
                    a = null;
                return Math.random() <= .5 ? (t = i.gameEndName1, a = i.gameEndUrl1) : (t = i.gameEndName2, a = i.gameEndUrl2), e.push(t), e.push(a), e
            },
            addClickBtns: function() {
                var e = this;
                e.moreBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}), e.moreBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    console.log("MoreGame"), window.location.href = "https://zazgames.com/"
                }), e.leftBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}), e.leftBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    o.GAME_OVER_BOOL = !0, o.gameScore = 0, r.loadingScene("MainGameScene")
                }), e.rightBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}), e.rightBtn.node.on(cc.Node.EventType.TOUCH_END, function(t) {
                    var a = null;
                    a = null != e.rightBtnGameUrl && "" != e.rightBtnGameUrl ? e.rightBtnGameUrl : e.tempArr[1], window.location.href = a
                })
            },
            getContentByScore: function(e, t) {
                var a = "\u6211\u771f\u662f\u592a\u5389\u5bb3\uff0c\u5728" + t + "\u4e2d\u7adf\u7136\u5f97\u4e860\u5206\uff0c\u5168\u7403\u53ea\u67091\u4e2a\u4eba\u5f970\u5206\uff01",
                    r = parseInt(.3 * this.standardScore),
                    o = parseInt(1.5 * this.standardScore),
                    i = parseInt(2.5 * this.standardScore),
                    n = parseInt(4 * this.standardScore);
                if (e > 0 && e <= r) a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u5f97\u5fc3\u5e94\u624b\u4e86\uff01";
                else if (e > r && e <= this.standardScore) a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01";
                else if (e > this.standardScore && e <= o) {
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(12 * (e - this.standardScore) / (o - this.standardScore)) + 80) + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u4fe1\u624b\u62c8\u6765\u7684\u5883\u754c\uff01"
                } else if (e > o && e <= i) {
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(7 * (e - o) / (i - o)) + 92) + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u8fd0\u7528\u81ea\u5982\u7684\u5883\u754c\uff01"
                } else if (e > i && e <= n) a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff0c\u8fbe\u5230\u4e86\u884c\u4e91\u6d41\u6c34\u7684\u5883\u754c\uff01";
                else if (e > n && e < this.game_max_score) {
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u636e\u8bf4\u5168\u7403\u53ea\u6709 " + (20 - Math.ceil(17 * (e - n) / (this.game_max_score - n))) + "\u4e2a\u4eba\u8fbe\u5230\u8fd9\u4e2a\u6c34\u5e73\uff0c\u72ec\u5b64\u6c42\u8d25\uff01"
                } else e >= this.game_max_score && (a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u8d85\u8d8a\u4e86\u72ec\u5b64\u6c42\u8d25\uff0c\u5fc3\u6709\u7075\u7280\uff01");
                return a
            },
            strlen: function(e) {
                for (var t = 0, a = 0; a < e.length; a++) {
                    var r = e.charCodeAt(a);
                    r >= 1 && r <= 126 || 65376 <= r && r <= 65439 ? t++ : t += 2
                }
                return t
            },
            getContentByScore2: function(e, t) {
                var a = "I'm awesome\uff0cin" + t + "get 0 score\uff0conly one person in the world has a 0\uff01",
                    r = parseInt(.3 * this.standardScore),
                    o = parseInt(1.5 * this.standardScore),
                    i = parseInt(2.5 * this.standardScore),
                    n = parseInt(4 * this.standardScore);
                if (e >= this.game_max_score) a = "I got " + e + " points in the game, defeating all players worldwide, waiting for you to fight!";
                else if (e > 0 && e <= r) a = "I got " + e + " points in the game, really great\uff01";
                else if (e > r && e <= this.standardScore) a = "I got " + e + " points in the game, really great\uff01";
                else if (e > this.standardScore && e <= o) {
                    a = "I got in the game in " + e + " points, beating out " + (Math.floor(12 * (e - this.standardScore) / (o - this.standardScore)) + 80) + "% of global players\uff01"
                } else if (e > o && e <= i) {
                    a = "I got in the game in " + e + " points, beating out " + (Math.floor(7 * (e - o) / (i - o)) + 92) + "% of global players\uff01"
                } else if (e > i && e <= n) a = "I got in the game in " + e + " points, beating out 99% of global players\uff01";
                else if (e > n && e < this.game_max_score) {
                    a = "I got " + e + " points in the game, it said to be the world's only " + (20 - Math.ceil(17 * (e - n) / (this.game_max_score - n))) + " people to reach this level! Have you?"
                }
                return a
            },
            start: function() {}
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    linkHttpIconJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "95474fr0oNDP7SAidILF03q", "linkHttpIconJs");
        var r = e("MainManage"),
            o = e("GameConfig");
        cc.Class({
            extends: cc.Component,
            properties: {
                iconSpr: cc.Node,
                iconSpr1: cc.Node
            },
            onLoad: function() {
                if (this._imageArr = [], this.stopUpdateBool = !0, this.gameWidth = cc.director.getWinSize().width, this.gameHeight = cc.director.getWinSize().height, null != r.recGameData && "" != r.recGameData && null != r.recGameimg1 && "" != r.recGameimg1) {
                    var e = 50 - this.gameWidth / 2,
                        t = this.gameHeight - 50 - this.gameHeight / 2;
                    null != r.recGamePos && "" != r.recGamePos && (1 == r.recGamePos ? (e = 50 - this.gameWidth / 2, t = this.gameHeight - 50 - this.gameHeight / 2) : 2 == r.recGamePos ? (e = this.gameWidth - 50 - this.gameWidth / 2, t = this.gameHeight - 50 - this.gameHeight / 2) : 3 == r.recGamePos ? (e = this.gameWidth - 50 - this.gameWidth / 2, t = 50 - this.gameHeight / 2) : 4 == r.recGamePos && (e = 50 - this.gameWidth / 2, t = 50 - this.gameHeight / 2));
                    var a = r.recGameimg1,
                        o = r.recGameimg2,
                        i = this.iconSpr,
                        n = this.iconSpr1,
                        s = this;
                    cc.loader.load(a, function(a, r) {
                        i.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(r), s.iconSpr.opacity = 0, s.iconSpr.x = e, s.iconSpr.y = t, s._imageArr.push(s.iconSpr)
                    }), cc.loader.load(o, function(a, r) {
                        n.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(r), s.iconSpr1.opacity = 0, s.iconSpr1.x = e, s.iconSpr1.y = t, s._imageArr.push(s.iconSpr1)
                    })
                }
                this.addTouchEvents()
            },
            showLinkPic: function() {
                var e = 0,
                    t = 0;
                e = null != r.recGameDelPau ? r.recGameDelPau : 6, cc.log("dMainManager.recGameDelPer", r.recGameDelPer), t = null != r.recGameDelPer ? r.recGameDelPer : .7, this._imageArr[0].opacity = 255, this._imageArr[0].runAction(cc.repeatForever(cc.sequence(cc.delayTime(e), cc.rotateBy(t, 0, 180), cc.callFunc(function() {
                    this._imageArr[0].setRotation(0), this._imageArr[0].opacity = 0, this._imageArr[1].opacity = 255
                }, this), cc.delayTime(e), cc.callFunc(function() {
                    this.flowerAction(this._imageArr[1], t)
                }, this), cc.delayTime(t), cc.callFunc(function() {
                    this._imageArr[1].opacity = 0, this._imageArr[0].opacity = 255
                }, this))))
            },
            flowerAction: function(e, t) {
                e.runAction(cc.sequence(cc.rotateBy(t, 0, 180), cc.callFunc(function() {
                    e.setRotation(0)
                })))
            },
            start: function() {},
            addTouchEvents: function() {
                var e = this,
                    t = {
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        onTouchBegan: function(t, a) {
                            var i = t.getLocation();
                            if (e._imageArr.length >= 2) {
                                var n = Math.abs(i.x - e.gameWidth / 2 - e._imageArr[0].x),
                                    s = Math.abs(i.y - e.gameHeight / 2 - e._imageArr[0].y);
                                n <= 30 && s <= 30 && (o.noTouchBool = !1, null != r.recGameUrl && "" != r.recGameUrl && (e._imageArr[0].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1), cc.callFunc(function() {
                                    window.location.href = "https://zazgames.com/"
                                }))), e._imageArr[1].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1)))), console.log("touchLinkHttp"))
                            }
                            return !0
                        },
                        onTouchMoved: function(e, t) {},
                        onTouchEnded: function(e, t) {}
                    };
                cc.eventManager.addListener(t, e.node)
            },
            update: function(e) {
                this.stopUpdateBool && this._imageArr.length >= 2 && (this.stopUpdateBool = !1, this.showLinkPic())
            }
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        MainManage: "MainManage"
    }],
    startGameJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "280c3rsZJJKnZ9RqbALVwtK", "startGameJs");
        var r = e("GameUiTools"),
            o = (e("HttpManagerJs"), e("MainManage")),
            i = (e("LoadSceneJs"), e("GameConfig"));
        cc.Class({
            extends: cc.Component,
            properties: {
                showInfoT: cc.Label,
                startT: cc.Label
            },
            onLoad: function() {
                i.publicGameBool && o.init(), this.showInfoT.string = o.gameInfoText, this.startT.string = o.txtStartText, this.node.on("touchend", function(e) {
                    this.node.x = -2e3
                }, this)
            },
            addTouchEvents: function() {
                var e = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(e, t) {
                        return r.loadingScene("MainGameScene"), !0
                    },
                    onTouchMoved: function(e, t) {},
                    onTouchEnded: function(e, t) {}
                };
                cc.eventManager.addListener(e, this.node)
            },
            update: function(e) {}
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LoadSceneJs: "LoadSceneJs",
        MainManage: "MainManage"
    }]
}, {}, ["HttpManagerJs", "LanguageSetJs", "LoadSceneJs", "AniTools", "AudioArrJs", "MainGameJS", "PrefabArrJs", "SpriteFrameJs", "ToolsJs", "MainManage", "GameConfig", "GameUiTools", "gameOverJs", "linkHttpIconJs", "startGameJs"]);