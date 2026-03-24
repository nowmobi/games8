var __reflect = this && this.__reflect || function(t, e, i) {
        t.__class__ = e, i ? i.push(e) : i = [e], t.__types__ = t.__types__ ? i.concat(t.__types__) : i
    },
    __extends = this && this.__extends || function(t, e) {
        function i() {
            this.constructor = t
        }
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        i.prototype = e.prototype, t.prototype = new i
    },
    __awaiter = this && this.__awaiter || function(t, e, i, n) {
        return new(i || (i = Promise))(function(r, o) {
            function a(t) {
                try {
                    h(n.next(t))
                } catch (e) {
                    o(e)
                }
            }

            function s(t) {
                try {
                    h(n["throw"](t))
                } catch (e) {
                    o(e)
                }
            }

            function h(t) {
                t.done ? r(t.value) : new i(function(e) {
                    e(t.value)
                }).then(a, s)
            }
            h((n = n.apply(t, e || [])).next())
        })
    },
    __generator = this && this.__generator || function(t, e) {
        function i(t) {
            return function(e) {
                return n([t, e])
            }
        }

        function n(i) {
            if (r) throw new TypeError("Generator is already executing.");
            for (; h;) try {
                if (r = 1, o && (a = o[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(a = a.call(o, i[1])).done) return a;
                switch (o = 0, a && (i = [0, a.value]), i[0]) {
                    case 0:
                    case 1:
                        a = i;
                        break;
                    case 4:
                        return h.label++, {
                            value: i[1],
                            done: !1
                        };
                    case 5:
                        h.label++, o = i[1], i = [0];
                        continue;
                    case 7:
                        i = h.ops.pop(), h.trys.pop();
                        continue;
                    default:
                        if (a = h.trys, !(a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
                            h = 0;
                            continue
                        }
                        if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
                            h.label = i[1];
                            break
                        }
                        if (6 === i[0] && h.label < a[1]) {
                            h.label = a[1], a = i;
                            break
                        }
                        if (a && h.label < a[2]) {
                            h.label = a[2], h.ops.push(i);
                            break
                        }
                        a[2] && h.ops.pop(), h.trys.pop();
                        continue
                }
                i = e.call(t, h)
            } catch (n) {
                i = [6, n], o = 0
            } finally {
                r = a = 0
            }
            if (5 & i[0]) throw i[1];
            return {
                value: i[0] ? i[1] : void 0,
                done: !0
            }
        }
        var r, o, a, s, h = {
            label: 0,
            sent: function() {
                if (1 & a[0]) throw a[1];
                return a[1]
            },
            trys: [],
            ops: []
        };
        return s = {
            next: i(0),
            "throw": i(1),
            "return": i(2)
        }, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
            return this
        }), s
    },
    DisplayObjectContainer = egret.DisplayObjectContainer,
    BaseEuiComponent = function(t) {
        function e(e) {
            void 0 === e && (e = null);
            var i = t.call(this) || this;
            return i.openEff = !0, i.event = [], i.flushList = [], i._myParent = e, i.isInit = !1, i.touchEnabled = !1, i
        }
        return __extends(e, t), e.prototype.childrenCreated = function() {
            t.prototype.childrenCreated.call(this), this.init(), this.isInit = !0
        }, e.prototype.init = function() {}, e.prototype.open = function(t) {
            void 0 === t && (t = null)
        }, e.prototype.close = function(t) {
            void 0 === t && (t = null), this.removeAllEvent()
        }, Object.defineProperty(e.prototype, "myParent", {
            get: function() {
                return this._myParent
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.isShow = function() {
            return null != this.stage
        }, e.prototype.addToParent = function() {
            this._myParent && this._myParent.addChild(this), !this.openEff || this._myParent != LayerManager.UI_Win && this._myParent != LayerManager.UI_Tips && this._myParent != LayerManager.UI_TipsNoClick || (this.scaleX = this.scaleY = .5, egret.Tween.get(this).to({
                scaleX: 1.05,
                scaleY: 1.05
            }, 250, egret.Ease.cubicOut).to({
                scaleX: 1,
                scaleY: 1
            }, 240, egret.Ease.cubicIn))
        }, e.prototype.removeFromParent = function() {
            this.removeAllEvent(), App.DisplayUtils.removeFromParent(this.$modalTipsRect), App.DisplayUtils.removeFromParent(this)
        }, e.prototype.dispose = function() {
            this.destroy()
        }, e.prototype.destroy = function() {
            this.removeFromParent(), this._myParent = null, this.disposeChildren(this), this.removeAllEvent()
        }, e.prototype.disposeChildren = function(t) {
            if (t && t.numChildren)
                for (var e, i = t.numChildren; i;) i--, e = t.removeChildAt(0), e instanceof eui.Image && e.texture && (e.source = null), e.clickEff && App.DisplayUtils.removeClickEff(e), e.$autoClickTimer && App.DisplayUtils.buttonAutoClick(e, !1), e.stop && e.stop(), e.dispose && e.dispose(), e instanceof eui.List && (e.dataProvider = null), this.disposeChildren(e)
        }, e.prototype.setVisible = function(t) {
            this.visible = t
        }, e.prototype.setListData = function(t, e, i) {
            if (void 0 === i && (i = !1), t) {
                var n = t.dataProvider,
                    r = i ? [].concat(e) : e;
                n ? n.length != r.length ? n.source = r : i ? n.replaceAll(r) : n.source = r : t.dataProvider = new eui.ArrayCollection(r)
            }
        }, e.prototype.addItemClick = function(t, e) {
            this.addEvent(eui.ItemTapEvent.ITEM_TAP, t, e)
        }, e.prototype.addTouchEvent = function(t, e) {
            this.addEvent(egret.TouchEvent.TOUCH_TAP, t, e)
        }, e.prototype.removeTouchEvent = function(t, e) {
            t.removeEventListener(egret.TouchEvent.TOUCH_TAP, e, this)
        }, e.prototype.addEvent = function(t, e, i) {
            e.addEventListener(t, i, this), this.event.push([t, i, e])
        }, e.prototype.removeAllEvent = function() {
            for (var t = 0, e = this.event; t < e.length; t++) {
                var i = e[t];
                i[2].removeEventListener(i[0], i[1], this)
            }
            this.event = [], this.removeMessage(), App.TimerManager.removeAll(this), this.removeFlushFun()
        }, e.prototype.message = function(t, e) {
            App.MessageCenter.addListener(t, e, this)
        }, e.prototype.removeMessage = function() {
            App.MessageCenter.removeAll(this)
        }, e.prototype.flushFun = function(t, e) {
            for (var i = [], n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
            if (e)
                for (var r = 0, o = this.flushList.length; o > r; r++)
                    if (this.flushList[r].fun == t) {
                        this.flushList.splice(r, 1);
                        break
                    }
            this.flushList.push({
                fun: t,
                param: i
            }), App.TimerManager.isExists(this.onFlush, this) || App.TimerManager.addFrame(2, this.onFlush, this)
        }, e.prototype.onFlush = function() {
            var t = this.flushList.shift();
            t && t.fun.apply(this, t.param)
        }, e.prototype.removeFlushFun = function() {
            this.flushList.length = 0
        }, e
    }(eui.Component);
__reflect(BaseEuiComponent.prototype, "BaseEuiComponent");
var BaseClass = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.ins = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var i = this;
        if (!i._instance) {
            var n = t.length;
            0 == n ? i._instance = new i : 1 == n ? i._instance = new i(t[0]) : 2 == n ? i._instance = new i(t[0], t[1]) : 3 == n ? i._instance = new i(t[0], t[1], t[2]) : 4 == n ? i._instance = new i(t[0], t[1], t[2], t[3]) : 5 == n && (i._instance = new i(t[0], t[1], t[2], t[3], t[4]))
        }
        return i._instance
    }, e
}(egret.HashObject);
__reflect(BaseClass.prototype, "BaseClass");
var BaseCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return CacheManager.reg(e), e
    }
    return __extends(e, t), e.prototype.onLogin = function() {}, e.prototype.clear = function() {}, e
}(egret.HashObject);
__reflect(BaseCache.prototype, "BaseCache");
var BaseEuiLayer = function(t) {
    function e(e) {
        var i = t.call(this) || this;
        return i.numShow = 0, i.originalAlpha = 0, i.param = e, i.percentWidth = 100, i.percentHeight = 100, i.touchEnabled = !1, i.visible = !1, e && (i.modal(e.modal, e.alpha), e.vGroup && (i.vGroup || (i.vGroup = new eui.Group, i.vGroup.top = 0, i.vGroup.right = 0, i.vGroup.left = 0, i.vGroup.bottom = 0, i.vGroup.touchThrough = !0, i.addChild(i.vGroup), i.vGroup.visible))), i.numShow = i.numChildren, i
    }
    return __extends(e, t), Object.defineProperty(e.prototype, "focusStage", {
        set: function(t) {
            t ? (App.MessageCenter.addListener(MsgConst.RESIZE_STAGE, this.resizeStage, this), this.resizeStage()) : App.MessageCenter.removeListener(MsgConst.RESIZE_STAGE, this)
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.resizeStage = function() {
        this.modalRect && (this.modalRect.graphics.clear(), this.modalRect.graphics.beginFill(0, 1), this.modalRect.graphics.drawRect(0, 0, App.StageUtils.getWidth(), App.StageUtils.getHeight()), this.modalRect.cacheAsBitmap = !0)
    }, e.prototype.modal = function(e, i) {
        e && !this.modalRect && (this.modalRect = new egret.Shape, this.modalRect.alpha = null == i ? .9 : i, this.originalAlpha = this.modalRect.alpha, t.prototype.addChildAt.call(this, this.modalRect, 0), this.focusStage = !0)
    }, e.prototype.setRectAlpha = function(t) {
        void 0 === t && (t = .9), this.modalRect && (this.modalRect.alpha = t)
    }, e.prototype.resetAlpha = function() {
        this.modalRect && (this.modalRect.alpha = this.originalAlpha)
    }, Object.defineProperty(e.prototype, "visible", {
        get: function() {
            return this.$visible
        },
        set: function(t) {
            this.modalRect && this.param && this.param.modalClick && (0 == this.visible && 1 == t ? this.modalRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeAll, this) : 1 == this.visible && 0 == t && this.modalRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeAll, this)), this.$setVisible(t)
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.addChild = function(e) {
        return this.visible = !0, t.prototype.addChild.call(this, e)
    }, e.prototype.addChildAt = function(e, i) {
        return i += this.numShow, this.visible = !0, t.prototype.addChildAt.call(this, e, i)
    }, e.prototype.removeChild = function(e) {
        var i = t.prototype.removeChild.call(this, e);
        return this.numChildren - this.numShow <= 0 && (this.visible = !1), i
    }, e.prototype.removeChildAt = function(e) {
        var i = t.prototype.removeChildAt.call(this, e);
        return this.numChildren - this.numShow <= 0 && (this.visible = !1), i
    }, e.prototype.removeModalTop = function() {
        var t, e = this.numChildren - this.numShow;
        e && (t = this.removeChildAt(this.numChildren - 1), t.closeView && t.closeView(), e--)
    }, e.prototype.removeAll = function() {
        for (var t, e = this.numChildren - this.numShow; e;) t = this.removeChildAt(this.numShow), t.closeView && t.closeView(), e--
    }, e.prototype.setGropVisible = function(t, e) {
        this.vGroup.visible = !0, this.vGroup.alpha = 1
    }, e.prototype.removeChildren = function() {
        this.removeAll()
    }, e
}(eui.Group);
__reflect(BaseEuiLayer.prototype, "BaseEuiLayer");
var BaseScene = function() {
    function t() {
        this._layers = new Array
    }
    return t.prototype.onEnter = function() {}, t.prototype.onExit = function() {
        App.ViewManager.cleanWinBuff(), App.ViewManager.closeAll(), this.removeAllLayer()
    }, t.prototype.addLayer = function(t) {
        t instanceof BaseSpriteLayer ? (App.StageUtils.getStage().addChild(t), this._layers.push(t)) : t instanceof BaseEuiLayer && (App.StageUtils.getUIStage().addChild(t), this._layers.push(t))
    }, t.prototype.addLayerAt = function(t, e) {
        t instanceof BaseSpriteLayer ? (App.StageUtils.getStage().addChildAt(t, e), this._layers.push(t)) : t instanceof BaseEuiLayer && (App.StageUtils.getUIStage().addChildAt(t, e), this._layers.push(t))
    }, t.prototype.removeLayer = function(t) {
        t instanceof BaseSpriteLayer ? (App.StageUtils.getStage().removeChild(t), this._layers.splice(this._layers.indexOf(t), 1)) : t instanceof BaseEuiLayer && (App.StageUtils.getUIStage().removeChild(t), this._layers.splice(this._layers.indexOf(t), 1))
    }, t.prototype.layerRemoveAllChild = function(t) {
        t instanceof BaseSpriteLayer ? t.removeChildren() : t instanceof BaseEuiLayer && t.removeChildren()
    }, t.prototype.removeAllLayer = function() {
        for (; this._layers.length;) {
            var t = this._layers[0];
            this.layerRemoveAllChild(t), this.removeLayer(t)
        }
    }, t
}();
__reflect(BaseScene.prototype, "BaseScene");
var BaseSound = function() {
    function t() {
        this.cache = {}, this.loadingCache = []
    }
    return t.prototype.getSound = function(t) {
        var e = RES.getRes(t);
        if (e) this.cache[t];
        else {
            if (-1 != this.loadingCache.indexOf(t)) return null;
            this.loadingCache.push(t), RES.getResByUrl(t, this.onResourceLoadComplete, this, RES.ResourceItem.TYPE_SOUND)
        }
        return e
    }, t.prototype.onResourceLoadComplete = function(t, e) {
        var i = this.loadingCache.indexOf(e); - 1 != i && (this.loadingCache.splice(i, 1), t && this.loadedPlay(t, e))
    }, t.prototype.loadedPlay = function(t, e) {}, t.prototype.checkCanClear = function(t) {
        return !0
    }, t
}();
__reflect(BaseSound.prototype, "BaseSound");
var BaseEuiWindow = function(t) {
    function e(e) {
        void 0 === e && (e = null);
        var i = t.call(this, e) || this;
        return i.viewKey = 0, i.closeDispose = !0, i.disposeTime = 0, i.bClickClose = !0, i.bLockClose = !1, i.playSound = !0, i.showAd = !0, i.showModel = !0, null == e && (e = LayerManager.UI_Win, i._myParent = e), i.isInit = !1, i
    }
    return __extends(e, t), e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this), this.isTweenY = this.y, this._initOpen && this.openView.apply(this, this.openParam)
    }, e.prototype.addDelayDestroy = function(t) {
        void 0 === t && (t = 2e4), this.closeDispose && (this.disposeTime > 0 || (this.disposeTime = egret.setTimeout(this.destroy, this, t)))
    }, e.prototype.removeDelayDestroy = function() {
        this.disposeTime > 0 && (egret.clearTimeout(this.disposeTime), this.disposeTime = 0)
    }, e.prototype.open = function(t) {
        void 0 === t && (t = null), this._viewPro = t, this.$modalTipsRect && this._myParent != LayerManager.UI_TipsNoClick && this.bClickClose && this.addTouchEvent(this.$modalTipsRect, this.closeView), this.closeBtn && (this.closeBtn.effMusic = SoundType.close, this.addTouchEvent(this.closeBtn, this.onCloseBtn)), this.bg && this.bg.closeBtn && (this.bg.closeBtn.effMusic = SoundType.close, this.addTouchEvent(this.bg.closeBtn, this.onCloseBtn)), !this.closeBtn || this.closeBtn instanceof eui.Button || App.DisplayUtils.addClickEff(this.closeBtn), GameCache.ad.playBanner(this.viewKey)
    }, e.prototype.close = function(e) {
        void 0 === e && (e = null), !this.closeBtn || this.closeBtn instanceof eui.Button || App.DisplayUtils.removeClickEff(this.closeBtn), this._viewPro && this._viewPro.backParam && App.ViewManager.open(this._viewPro.backParam.key, this._viewPro.backParam), t.prototype.close.call(this, e), this.showInsertAd(), GameCache.ad.closeBanner()
    }, e.prototype.showInsertAd = function() {
        this.showAd && this._myParent == LayerManager.UI_Win && GameCache.ad.playInsertOnWin()
    }, e.prototype.focusToStage = function() {
        this.message(MsgConst.RESIZE_STAGE, this.resizeStage), this.resizeStage()
    }, e.prototype.resizeStage = function() {
        this.height = App.StageUtils.getHeight(), this.width = App.StageUtils.getWidth()
    }, e.prototype.openView = function(t) {
        if (void 0 === t && (t = null), this.openParam = t, this.isInit) {
            this._initOpen = !1;
            try {
                this.open.call(this, t)
            } catch (e) {}
        } else this._initOpen = !0
    }, e.prototype.closeView = function(t) {
        this.bLockClose || (App.ViewManager.close(this.viewKey), this.openParam = null)
    }, e.prototype.onCloseBtn = function(t) {
        App.ViewManager.backOpen && App.ViewManager.open(App.ViewManager.backOpen.key, App.ViewManager.backOpen), this.closeView()
    }, e.prototype.resetOpen = function(t) {
        this.close.call(this, t), this.removeAllEvent.call(this), this.openView.call(this, t)
    }, e.prototype.setWinTitleHold = function(t) {
        this.bg && this.bg.setNameImgHold(t)
    }, e.prototype.setWinHeleTitle = function(t) {
        void 0 === t && (t = null), this.bg && this.bg.setHelpBtn(t)
    }, e.prototype.addToParent = function() {
        if (this.showModel || this.bClickClose) {
            var e = this.$modalTipsRect;
            e || (e = new eui.Rect, e.fillColor = 0, e.alpha = .8, e.width = App.StageUtils.getWidth() + 80, e.height = App.StageUtils.getHeight() + 80, e.horizontalCenter = 0, e.verticalCenter = 0, e.x = e.y = -40, this.$modalTipsRect = e), this._myParent.addChild(e)
        }(this._myParent == LayerManager.UI_Win || this._myParent == LayerManager.UI_Tips || this._myParent == LayerManager.UI_TipsNoClick) && this.setCenter(), t.prototype.addToParent.call(this), this.removeDelayDestroy()
    }, e.prototype.setCenter = function() {
        this.horizontalCenter = 0, this.verticalCenter = 0
    }, Object.defineProperty(e.prototype, "isShowClickToClose", {
        set: function(t) {
            this.clickToClose && (this.clickToClose.visible = t)
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.destroy = function() {
        if (this.viewKey) {
            var e = this.viewKey;
            return this.viewKey = null, void App.ViewManager.destroy(e)
        }
        this.removeDelayDestroy(), t.prototype.destroy.call(this)
    }, e.prototype.disposeChildren = function(t) {
        if (t.numChildren)
            for (var e, i = t.numChildren; i;) i--, e = t.removeChildAt(0), e instanceof eui.Image && e.texture && (e.source = null), e.stop && e.stop(), e.dispose && e.dispose(), this.disposeChildren(e)
    }, e
}(BaseEuiComponent);
__reflect(BaseEuiWindow.prototype, "BaseEuiWindow");
var BaseSpriteView = function(t) {
    function e(e) {
        void 0 === e && (e = null);
        var i = t.call(this, e) || this;
        return i._resources = null, i.playListAnim = !0, i.isInit = !0, i
    }
    return __extends(e, t), e.prototype.open = function(e) {
        void 0 === e && (e = null), t.prototype.open.call(this, e), this.playListAnim = !0
    }, e.prototype.close = function(e) {
        void 0 === e && (e = null), t.prototype.close.call(this, e), this.playListAnim = !0
    }, e.prototype.addToParent = function() {
        this._myParent && this._myParent.addChild(this)
    }, e.prototype.destroy = function() {
        t.prototype.destroy.call(this), this._myParent = null, this._resources = null
    }, e.prototype.setListData = function(e, i, n) {
        void 0 === n && (n = !1), t.prototype.setListData.call(this, e, i, n)
    }, e
}(BaseEuiComponent);
__reflect(BaseSpriteView.prototype, "BaseSpriteView");
var BaseCustComponent = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.className = "@逻辑类名", e.event = [], e
    }
    return __extends(e, t), e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this), this.init()
    }, e.prototype.init = function() {}, e.prototype.addItemClick = function(t, e) {
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, t, e)
    }, e.prototype.addTouchEvent = function(t, e) {
        this.addEvent(egret.TouchEvent.TOUCH_TAP, t, e)
    }, e.prototype.addEvent = function(t, e, i) {
        e && (e.addEventListener(t, i, this, !1, 1e3), this.event.push([t, i, e]))
    }, e.prototype.removeAllEvent = function() {
        for (var t = 0, e = this.event; t < e.length; t++) {
            var i = e[t];
            i[2].removeEventListener(i[0], i[1], this)
        }
        this.event = [], App.MessageCenter.removeAll(this), App.TimerManager.removeAll(this)
    }, e.prototype.dispose = function() {
        this.removeAllEvent(), this.skin && this.skin.hostComponent && (this.skin.hostComponent = null), this.disposeChildren(this)
    }, e.prototype.message = function(t, e) {
        App.MessageCenter.addListener(t, e, this)
    }, e.prototype.setListData = function(t, e, i) {
        void 0 === i && (i = !1);
        var n = t.dataProvider,
            r = i ? [].concat(e) : e;
        n ? n.length != r.length ? n.source = r : i ? n.replaceAll(r) : n.source = r : t.dataProvider = new eui.ArrayCollection(r)
    }, e.prototype.disposeChildren = function(t) {
        if (t.numChildren)
            for (var e, i = t.numChildren; i;) i--, e = t.removeChildAt(0), e instanceof eui.Image && e.texture && (e.source = null), e.stop && e.stop(), e.dispose && e.dispose(), this.disposeChildren(e)
    }, e
}(eui.ItemRenderer);
__reflect(BaseCustComponent.prototype, "BaseCustComponent");
var xxtea = function() {
    function t() {}
    return Object.defineProperty(t, "ins", {
        get: function() {
            return t._ins || (t._ins = new t), t._ins
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.long2str = function(t, e) {
        for (var i = t.length, n = 4294967295 & t[i - 1], r = 0; i > r; r++) t[r] = String.fromCharCode(255 & t[r], t[r] >>> 8 & 255, t[r] >>> 16 & 255, t[r] >>> 24 & 255);
        return e ? t.join("").substring(0, n) : t.join("")
    }, t.prototype.str2long = function(t, e) {
        for (var i = t.length, n = [], r = 0; i > r; r += 4) n[r >> 2] = t.charCodeAt(r) | t.charCodeAt(r + 1) << 8 | t.charCodeAt(r + 2) << 16 | t.charCodeAt(r + 3) << 24;
        return e && (n[n.length] = i), n
    }, t.prototype.xxtea_encrypt = function(t, e) {
        if ("" == t) return "";
        for (var i, n, r = this.str2long(t, !1), o = this.str2long(e, !1), a = r.length - 1, s = r[a], h = r[0], l = 2654435769, c = Math.floor(6 + 52 / (a + 1)), p = 0; c-- > 0;) {
            p = p + l & 4294967295, n = p >>> 2 & 3;
            for (var u = 0; a > u; u++) h = r[u + 1], i = (s >>> 5 ^ h << 2) + (h >>> 3 ^ s << 4) ^ (p ^ h) + (o[3 & u ^ n] ^ s), s = r[u] = r[u] + i & 4294967295;
            h = r[0], i = (s >>> 5 ^ h << 2) + (h >>> 3 ^ s << 4) ^ (p ^ h) + (o[3 & u ^ n] ^ s), s = r[a] = r[a] + i & 4294967295
        }
        return this.str2Hex(this.long2str(r, !1))
    }, t.prototype.xxtea_decrypt = function(t, e) {
        if ("" == t) return "";
        t = this.hex2str(t);
        for (var i, n, r = this.str2long(t, !1), o = this.str2long(e, !1), a = r.length - 1, s = r[a - 1], h = r[0], l = 2654435769, c = Math.floor(6 + 52 / (a + 1)), p = c * l & 4294967295; 0 != p;) {
            n = p >>> 2 & 3;
            for (var u = a; u > 0; u--) s = r[u - 1], i = (s >>> 5 ^ h << 2) + (h >>> 3 ^ s << 4) ^ (p ^ h) + (o[3 & u ^ n] ^ s), h = r[u] = r[u] - i & 4294967295;
            s = r[a], i = (s >>> 5 ^ h << 2) + (h >>> 3 ^ s << 4) ^ (p ^ h) + (o[3 & u ^ n] ^ s), h = r[0] = r[0] - i & 4294967295, p = p - l & 4294967295
        }
        return this.long2str(r, !0)
    }, t.prototype.str2Hex = function(t) {
        var e = "",
            i = "",
            n = 0;
        do i = t.charCodeAt(n++).toString(16), 1 == i.length && (i = "0" + i), e += i; while (n < t.length);
        return e
    }, t.prototype.hex2str = function(t) {
        for (var e = "", i = 0; i < t.length;) {
            var n = parseInt(t.substr(i, 1), 16) << 4 | parseInt(t.substr(++i, 1), 16);
            n = 255 & n, e += String.fromCharCode(n), ++i
        }
        return e
    }, t
}();
__reflect(xxtea.prototype, "xxtea");
var ResVersionManager = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.resVersionData = window.verData, e
    }
    return __extends(e, t), e.ins = function() {
        return t.ins.call(this)
    }, e.prototype.has = function(t) {
        return this.resVersionData.hasOwnProperty(t)
    }, e.prototype.getVer = function(t) {
        return this.resVersionData ? this.resVersionData[t] : null
    }, e.prototype.getVer2 = function(t) {
        return this.resVersionData2 ? this.resVersionData2[t] : null
    }, e.prototype.loadConfig = function(t, e, i) {
        var n = this;
        this.complateFunc = e, this.complateFuncTarget = i, RES.getResByUrl(t, function(t) {
            n.resVersionData = t, n.complateFunc.call(n.complateFuncTarget)
        }, this, RES.ResourceItem.TYPE_JSON)
    }, e.prototype.loadConfig2 = function(t, e, i) {
        var n = this;
        this.complateFunc = e, this.complateFuncTarget = i, RES.getResByUrl(t, function(t) {
            n.resVersionData2 = t, n.complateFunc.call(n.complateFuncTarget)
        }, this, RES.ResourceItem.TYPE_JSON)
    }, e
}(BaseClass);
__reflect(ResVersionManager.prototype, "ResVersionManager");
var SecondTimer = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.add = function() {}, e
}(BaseClass);
__reflect(SecondTimer.prototype, "SecondTimer");
var TimerManager = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._handlerDic = {}, e._currTime = egret.getTimer(), e._currFrame = 0, egret.startTick(e.onEnterFrame, e), e
    }
    return __extends(e, t), e.prototype.getFrameId = function() {
        return this._currFrame
    }, e.prototype.getSyncTime = function() {
        return this._currTime
    }, e.DeleteHandle = function(t) {
        t.clear(), t.save()
    }, e.prototype.onEnterFrame = function(t) {
        return this._currTime = t, this._currFrame++, App.FrameHandler.onFrame(), this.doTime(), !1
    }, e.prototype.doTime = function() {
        var t = this._currTime,
            i = this._currFrame;
        for (var n in this._handlerDic) {
            var r = this._handlerDic[n],
                o = r.length;
            if (0 >= o) delete this._handlerDic[n];
            else
                for (var a = 0, s = void 0, h = !1; o > a; a++) {
                    if (s = r[a], !s) return;
                    if (s.needDelete) r.splice(a, 1), a--, o--, e.DeleteHandle(s);
                    else if (h = !1, s.exeTime > 0 && s.exeTime <= t ? (s.exeTime = t + s.delay, h = !0) : s.exeFrame > 0 && s.exeFrame <= i && (s.exeFrame = i + s.delay, h = !0), h) {
                        s.method.apply(s.methodObj, s.methodParam);
                        var l = s.forever;
                        l || (s.repeatCount > 1 ? (s.repeatCount--, l = !0) : 1 == s.repeatCount && s.onFinish && s.onFinish.apply(s.finishObj)), l || (r.splice(a, 1), a--, o--, e.DeleteHandle(s))
                    }
                }
        }
    }, e.prototype.create = function(t, e, i, n, r, o, a, s) {
        void 0 === s && (s = !0);
        for (var h = [], l = 8; l < arguments.length; l++) h[l - 8] = arguments[l];
        if (!(0 > e || 0 > i || null == n)) {
            if (!r.hashCode) throw new Error("计时器对象必须是HashObject");
            var c = TimerHandler.create();
            c.forever = 0 == i, c.repeatCount = i, c.delay = e, c.method = n, c.methodObj = r, c.methodParam = h, c.onFinish = o, c.finishObj = a, c.exeTime = t + this._currTime, c.exeFrame = 0;
            var p = this._handlerDic[r.hashCode];
            p || (p = this._handlerDic[r.hashCode] = []), p.push(c)
        }
    }, e.prototype.add = function(t, e, i, n, r, o) {
        void 0 === n && (n = 0), void 0 === r && (r = null), void 0 === o && (o = null), this.create(t, t, n, e, i, r, o)
    }, e.prototype.addDelay = function(t, e, i, n, r, o, a) {
        void 0 === o && (o = null), void 0 === a && (a = null);
        for (var s = [], h = 7; h < arguments.length; h++) s[h - 7] = arguments[h];
        this.create.apply(this, [t, e, i, n, r, o, a, !0].concat(s))
    }, e.prototype.addFrame = function(t, e, i, n) {
        if (void 0 === n && (n = 0), !(0 > t || 0 > n || null == e)) {
            var r = TimerHandler.create();
            r.forever = 0 == n, r.repeatCount = n, r.delay = t, r.method = e, r.methodObj = i, r.exeTime = 0, r.exeFrame = t + this._currFrame;
            var o = this._handlerDic[i.hashCode];
            o || (o = this._handlerDic[i.hashCode] = []), o.push(r)
        }
    }, e.prototype.remove = function(t, e) {
        var i = this._handlerDic[e.hashCode];
        if (i) {
            for (var n = i.length - 1; n >= 0; n--) {
                var r = i[n];
                r.method == t && (r.needDelete = !0)
            }
            0 == i.length && delete this._handlerDic[e.hashCode]
        }
    }, e.prototype.removeAll = function(t) {
        var e = this._handlerDic[t.hashCode];
        if (e) {
            for (var i = e.length - 1; i >= 0; i--) {
                var n = e[i];
                n.needDelete = !0
            }
            delete this._handlerDic[t.hashCode]
        }
    }, e.prototype.isExists = function(t, e) {
        var i = this._handlerDic[e.hashCode];
        if (i) {
            for (var n = i.length - 1; n >= 0; n--) {
                var r = i[n];
                if (r.method == t) return !0
            }
            return !1
        }
    }, e
}(BaseClass);
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = function() {
    function t() {
        this.delay = 0, this.forever = !1, this.repeatCount = 0, this.exeTime = 0, this.exeFrame = 0, this.needDelete = !1
    }
    return t.prototype.clear = function() {
        this.method = null, this.methodObj = null, this.methodParam = null, this.onFinish = null, this.finishObj = null, this.forever = !1, this.needDelete = !1
    }, t.prototype.save = function() {
        t.pool.push(this)
    }, t.create = function() {
        var e = t.pool.pop();
        return e || (e = new t), e
    }, t.pool = [], t
}();
__reflect(TimerHandler.prototype, "TimerHandler");
var BaseConfig = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.getConfig = function(t) {
        return ConfigCache.getConfig(t)
    }, e
}(BaseClass);
__reflect(BaseConfig.prototype, "BaseConfig");
var ConfigCache = function() {
    function t() {}
    return t.read = function(t) {
        this.configZip || (this.configZip = new JSZip(t))
    }, t.clear = function() {
        this.configZip = null
    }, t.getConfig = function(t) {
        return this.configZip ? (t += ".json", this.parseFile(t), this.configDataList[t]) : null
    }, t.getFileList = function() {
        var t = [],
            e = this.configZip.files;
        for (var i in e) t.push(i);
        return t
    }, t.parseFile = function(t) {
        if (!this.configDataList[t]) {
            var e = this.configZip.file(t);
            if (!e) return void console.log(t + "配置不存在");
            this.configDataList[t] = this.isJSON(e.asText()), this.configDataList[t] || console.log(t + "配置不存在")
        }
    }, t.isJSON = function(t) {
        try {
            return JSON.parse(t)
        } catch (e) {
            return null
        }
    }, t.configDataList = {}, t.nameList = "", t
}();
__reflect(ConfigCache.prototype, "ConfigCache");
var HotspotBitmap = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._hotspot = [], e.touchEnabled = !0, e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, e.onTouch, e), e
    }
    return __extends(e, t), e.prototype.addHotspotArea = function(t, e, i, n) {
        this._hotspot.push({
            rect: t,
            callBack: e,
            thisObj: i,
            para: n
        })
    }, e.prototype.onTouch = function(t) {
        for (var e, i = t.localX, n = t.localY, r = 0; r < this._hotspot.length; r++) e = this._hotspot[r], e.rect.contains(i, n) && (e.para ? e.callBack.call(e.thisObj, e.para) : e.callBack.call(e.thisObj))
    }, e
}(egret.Bitmap);
__reflect(HotspotBitmap.prototype, "HotspotBitmap");
var ImgMovieClip = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.touchChildren = !1, e
    }
    return __extends(e, t), e.prototype.setData = function(t, e) {
        void 0 === e && (e = 12), this._list = t, this.totalFrame = t.length, this.curFrame = 0, this.rate = e;
        for (var i = 0, n = t; i < n.length; i++) {
            var r = n[i];
            this.addChild(r), r.visible = !1
        }
        this.setFrame()
    }, Object.defineProperty(e.prototype, "rate", {
        set: function(t) {
            this._rate = t
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.onFrame = function() {
        this.curFrame++, this.curFrame >= this.totalFrame && (this.curFrame = 0), this.setFrame()
    }, e.prototype.setFrame = function() {
        this._lastImg && (this._lastImg.visible = !1), this._list[this.curFrame] && (this._list[this.curFrame].visible = !0, this._lastImg = this._list[this.curFrame])
    }, e.prototype.play = function() {
        this.stop(), App.TimerManager.add(1e3 / this._rate >> 0, this.onFrame, this)
    }, e.prototype.stop = function() {
        App.TimerManager.removeAll(this)
    }, e.prototype.gotoAndStop = function(t) {
        this.stop(), this.curFrame = t, this.setFrame()
    }, e
}(eui.Group);
__reflect(ImgMovieClip.prototype, "ImgMovieClip");
var MovieClip = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.autoDispose = !0, e.autoVisible = !0, e._isDispose = !1, e.touchEnabled = !1, e
    }
    return __extends(e, t), e.prototype.loadFile = function(t, e, i, n) {
        void 0 === e && (e = -1), this._isDispose = !1, this.playCount = e, this._compFun = i, this._loadFun = n, this.mcName && this.movieClipData && (McDataManager.removeMovieClipDataByName(this.mcName), this.movieClipData = null), this.mcName = t, this.autoVisible && (this.visible = !1), App.TimerManager.removeAll(this), this.loadSource(t)
    }, e.prototype.loadSource = function(t) {
        var e = McDataManager.getMovieClipDataByName(t);
        if (e) return void this.setMcData(e);
        var i, n = this,
            r = t;
        if (r.indexOf("/") > -1) {
            var o = r.lastIndexOf("/");
            r = t.substr(o + 1)
        }
        var a = RES.getRes(r + "_png");
        a ? RES.getResByUrl(t + ".json", function(e) {
            i = e, n.resGetComplete(t, a, i)
        }, n, RES.ResourceItem.TYPE_JSON) : MovieClipLoader.ins().load(this, t)
    }, e.prototype.resGetComplete = function(t, e, i) {
        if (!this._isDispose && (McDataManager.setMovieClipDataByName(t, i, e), this.mcName == t)) {
            var n = McDataManager.getMovieClipDataByName(t);
            this.setMcData(n)
        }
    }, e.prototype.setMcData = function(t) {
        t && (this.rate && (t.frameRate = this.rate), this.movieClipData = t, this.play(this.playCount), this.playCount > 0 && App.TimerManager.addDelay(this.playTime * this.playCount, 0, 1, this.playComplete, this), this.autoVisible && (this.visible = !0), this._loadFun && this._loadFun.run())
    }, Object.defineProperty(e.prototype, "playTime", {
        get: function() {
            return this.movieClipData ? 1 / this.frameRate * this.totalFrames * 1e3 : 0
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.playComplete = function() {
        this.autoVisible && (this.visible = !1), this._compFun && this._compFun.run(), this.autoDispose && this.dispose()
    }, e.prototype.dispose = function() {
        this.autoDispose = !0, this.autoVisible = !0, this._isDispose = !0, this.mcName && this.movieClipData && (McDataManager.removeMovieClipDataByName(this.mcName), this.mcName = null), this._loadFun && (this._loadFun.dispose(), this._loadFun = null), this.stop(), this.playCount = 0, this.rate = null, this.movieClipData = null, this._compFun = null, this.x = this.y = 0, this.scaleX = this.scaleY = 1, this.rotation = 0, this.visible = !1, this.touchEnabled = !1, this.alpha = 1, this.blendMode = null, App.DisplayUtils.removeFromParent(this), ObjectPool.push(this)
    }, e.prototype.$onAddToStage = function(e, i) {
        this.movieClipData && this.playCount <= 0 && this.play(this.playCount), t.prototype.$onAddToStage.call(this, e, i)
    }, e.prototype.$onRemoveFromStage = function() {
        this.playCount <= 0 && this.stop(), t.prototype.$onRemoveFromStage.call(this)
    }, e.prototype.gotoAndstop = function(e) {
        this.movieClipData && t.prototype.gotoAndStop.call(this, e)
    }, e.prototype.stop = function() {
        t.prototype.stop.call(this)
    }, e.create = function() {
        return ObjectPool.get(e)
    }, e
}(egret.MovieClip);
__reflect(MovieClip.prototype, "MovieClip");
var MovieClipLoader = function() {
    function t() {
        this.count = 0, this.needLoadUrl = [], this.loadList = {}, this.loadingDic = {}
    }
    return t.ins = function() {
        return t.instance || (t.instance = new t), t.instance
    }, t.prototype.load = function(t, e) {
        var i = this.loadList[e];
        i || (i = this.loadList[e] = []), i.push(t), this.loadingDic[e] || (this.needLoadUrl.push(e), this.loadNext())
    }, t.prototype.loadData = function(t) {
        this.count++;
        var e, i, n = this,
            r = !1,
            o = function(o) {
                if (!r) {
                    if (!o) return console.log("加载失败，跳过", t), r = !0, n.count--, delete n.loadingDic[t], void n.loadNext();
                    if (e && i) {
                        n.count--;
                        var a = n.loadList[t];
                        if (!a) return;
                        delete n.loadList[t], delete n.loadingDic[t];
                        for (var s = 0, h = a; s < h.length; s++) {
                            var l = h[s];
                            l.resGetComplete(t, e, i)
                        }
                        n.loadNext()
                    }
                }
            };
        n.loadingDic[t] = 1, RES.getResByUrl(t + ".png", function(t) {
            e = t, o(t)
        }, n, RES.ResourceItem.TYPE_IMAGE), RES.getResByUrl(t + ".json", function(t) {
            i = t, o(t)
        }, n, RES.ResourceItem.TYPE_JSON)
    }, t.prototype.loadNext = function() {
        if (this.count <= 1e4) {
            var t = this.needLoadUrl.shift();
            t && this.loadData(t)
        }
    }, t.prototype.removeUrl = function(t) {
        var e = this.needLoadUrl.indexOf(t);
        e && this.needLoadUrl.splice(e, 1), delete this.loadList[t], delete this.loadingDic[t]
    }, t
}();
__reflect(MovieClipLoader.prototype, "MovieClipLoader");
var SheetMovieClip = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.isDispose = !1, e
    }
    return __extends(e, t), e.prototype.loadFile = function(t, i) {
        if (void 0 === i && (i = 0), null != this.sheetName) {
            this.isDispose = !1;
            var n = t;
            if (-1 != n.indexOf("/") && (n = t.substring(n.lastIndexOf("/") + 1)), e.mcData[n]) return SheetMovieClipMgr.addCount(this.sheetName, null), this.movieClipData = e.mcData[n], void(this.movieClipData.frames.length > 1 ? this.play(-1) : this.gotoAndStop(1));
            var r = this;
            RES.getResByUrl(this.sheetName + "_json", function(o) {
                RES.getResByUrl(t + ".json", function(o) {
                    if (!r.isDispose) {
                        SheetMovieClipMgr.addCount(this.sheetName, t + ".json");
                        var a = RES.getRes(r.sheetName + "_json." + n + "_png"),
                            s = new egret.MovieClipDataFactory(o, a);
                        s.texture = a;
                        var h = s.generateMovieClipData();
                        h.frameRate = r.rate ? r.rate : h.frameRate, h.frameRate >= 24 && (h.frameRate = 8), e.mcData[n] = h, r.movieClipData = h, h.frames.length > 1 ? r.play(i) : r.gotoAndStop(1), s.clearCache()
                    }
                }, r, RES.ResourceItem.TYPE_JSON)
            }, r, RES.ResourceItem.TYPE_SHEET)
        }
    }, e.prototype.dispose = function() {
        this.stop(), this.isDispose = !0, this.movieClipData && (SheetMovieClipMgr.delCount(this.sheetName), this.movieClipData = null), App.DisplayUtils.removeFromParent(this), ObjectPool.push(this)
    }, e.create = function() {
        return ObjectPool.get(e)
    }, e.mcData = {}, e
}(egret.MovieClip);
__reflect(SheetMovieClip.prototype, "SheetMovieClip");
var SheetMovieClipMgr = function() {
    function t() {}
    return t.addCount = function(t, e) {
        var i = this.sheetCount[t];
        i || (i = this.sheetCount[t] = ObjectPool.get(SheetMovieCountData)), i.count++, e && -1 == i.json.indexOf(e) && i.json.push(e)
    }, t.delCount = function(t) {
        var e = this.sheetCount[t];
        e && e.count > 0 && (e.count--, e.count <= 0 && (e.disposeTime = App.TimerManager.getSyncTime() + 3e4))
    }, t.sheetCount = {}, t
}();
__reflect(SheetMovieClipMgr.prototype, "SheetMovieClipMgr");
var SheetMovieCountData = function() {
    function t() {
        this.count = 0, this.disposeTime = 0, this.json = []
    }
    return t.prototype.dispose = function() {
        RES.destroyRes(this.sheetName), this.sheetName = null, this.count = 0, this.disposeTime = 0, this.json.length = 0, ObjectPool.push(this);
        for (var t = 0, e = this.json; t < e.length; t++) {
            var i = e[t];
            RES.destroyRes(i)
        }
    }, t
}();
__reflect(SheetMovieCountData.prototype, "SheetMovieCountData");
var CMovieClip = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.touchEnabled = !1, e
    }
    return __extends(e, t), e.prototype.setSource = function(t, e) {
        void 0 === e && (e = 5), this.removeSource(), this._dirNum = e, this._data = CMovieDataCache.ins().getData(t), this._data.addTarget(this)
    }, e.prototype.removeSource = function() {
        this._data && (this._data.removeTarget(this), this._data = null), this.visible = !1, this.movieClipData = null, this.curLoaDir = -1
    }, e.prototype.load = function(t) {
        if (void 0 === t && (t = -1), 5 == this._dirNum) {
            var e = DirUtil.isScaleX(t);
            e > 0 ? (this.scaleX = -1, t = e) : this.scaleX = 1
        }
        this.curLoaDir = t, this.getMCData()
    }, e.prototype.disposeSource = function() {
        this.removeSource(), this.stop()
    }, e.prototype.dispose = function() {
        this.disposeSource(), App.DisplayUtils.removeFromParent(this), ObjectPool.push(this)
    }, e.prototype.getMCData = function() {
        var t = this._data.getMovieClipData(this.curLoaDir);
        t && this.setMCData(t)
    }, e.prototype.setMCData = function(t) {
        this.movieClipData = t, t && (this.visible = !0)
    }, e.prototype.setFrame = function(t) {
        null != this.movieClipData && this.gotoAndStop(t)
    }, e
}(egret.MovieClip);
__reflect(CMovieClip.prototype, "CMovieClip");
var CMovieDataCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._dataDic = {}, App.TimerManager.add(1e4, e.check, e, 0), e
    }
    return __extends(e, t), e.ins = function() {
        return t.ins.call(this)
    }, e.prototype.printData = function() {
        var t, e = this._dataDic;
        for (var i in e) t = e[i], t.printData();
        e = McDataManager.mcDataPool;
        var n;
        for (var i in e) n = e[i], n.printData()
    }, e.prototype.check = function() {
        var t, e = this._dataDic,
            i = App.TimerManager.getSyncTime();
        for (var n in e) t = e[n], t.disposeTime > 0 && t.disposeTime <= i && (t.dispose(), delete e[n]);
        this.clearEffect(), this.checkSheetMovieClip()
    }, e.prototype.checkSheetMovieClip = function() {
        for (var t in SheetMovieClipMgr.sheetCount) {
            var e = SheetMovieClipMgr.sheetCount[t];
            e.count <= 0 && App.TimerManager.getSyncTime() > e.disposeTime && (e.dispose(), delete SheetMovieClipMgr.sheetCount[t])
        }
    }, e.prototype.clearEffect = function() {
        var t, e = McDataManager.mcDataPool,
            i = App.TimerManager.getSyncTime();
        for (var n in e) t = e[n], t.disposeTime > 0 && t.disposeTime <= i && (t.dispose(), delete e[n])
    }, e.prototype.getData = function(t) {
        return null == this._dataDic[t] && (this._dataDic[t] = ObjectPool.get(CMovieData), this._dataDic[t].isDispose = !1, this._dataDic[t].url = t), this._dataDic[t]
    }, e
}(BaseClass);
__reflect(CMovieDataCache.prototype, "CMovieDataCache");
var CMovieData = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._counts = 0, e.disposeTime = 0, e.isDispose = !1, e.level = 0, e._data = {}, e._mcArr = [], e
    }
    return __extends(e, t), e.prototype.getMovieClipData = function(t) {
        if (void 0 === t && (t = -1), this._data[t]) return this._data[t];
        var e = t > -1 ? this.url + "_" + t : this.url;
        CMovieDataLoader.ins().addLoader(e, t, this)
    }, e.prototype.onComplete = function(t, e) {
        if (null == this._data) return void this.dispose();
        this._data[t] = e;
        for (var i = 0, n = this._mcArr, r = this._counts; r > i; i++) {
            var o = n[i];
            o.curLoaDir == t && o.setMCData(e)
        }
    }, e.prototype.addTarget = function(t) {
        var e = this._mcArr,
            i = e.indexOf(t); - 1 == i && (this.disposeTime = 0, this._counts++, e.push(t))
    }, e.prototype.removeTarget = function(t) {
        var e = this._mcArr,
            i = e.indexOf(t);
        i > -1 && (e.splice(i, 1), this._counts--, this._counts <= 0 && (CMovieDataLoader.ins().remove(this), this.disposeTime = App.TimerManager.getSyncTime() + 1e4))
    }, Object.defineProperty(e.prototype, "count", {
        get: function() {
            return this._counts
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.dispose = function() {
        var t = this._data;
        this.isDispose = !0;
        for (var e in t) parseInt(e) > -1 ? (RES.destroyRes(this.url + "_" + e + ".png"), RES.destroyRes(this.url + "_" + e + ".json")) : (RES.destroyRes(this.url + ".png"), RES.destroyRes(this.url + ".json"));
        this._data = {}, this.level = 0, ObjectPool.push(this)
    }, e.prototype.printData = function() {
        var t = this._data;
        console.log("disposeTime : " + this.disposeTime);
        for (var e in t) parseInt(e) > -1 ? console.log("$$ CMovieData Cache：" + this.url + "_" + e) : console.log("$$ CMovieData Cache：" + this.url)
    }, e
}(egret.HashObject);
__reflect(CMovieData.prototype, "CMovieData");
var McDataManager = function() {
    function t() {}
    return t.getMovieClipDataByName = function(t) {
        var e = this.mcDataPool[t];
        return e ? (e.addCount(), e.data) : null
    }, t.setMovieClipDataByName = function(t, e, i, n) {
        if (!this.mcDataPool[t] && i && e) {
            this.mcDataFactory || (this.mcDataFactory = new egret.MovieClipDataFactory), this.mcDataFactory.texture = i, this.mcDataFactory.mcDataSet = e;
            var r = this.mcDataFactory.generateMovieClipData();
            r.frameRate = n ? n : r.frameRate;
            var o = ObjectPool.get(McDataRf);
            o.data = r, o.mcName = t, this.mcDataPool[t] = o, this.mcDataFactory.clearCache()
        }
    }, t.removeMovieClipDataByName = function(t) {
        var e = this.mcDataPool[t];
        e && e.removeCount(), MovieClipLoader.ins().removeUrl(t)
    }, t.mcDataPool = {}, t
}();
__reflect(McDataManager.prototype, "McDataManager");
var McDataRf = function() {
    function t() {
        this.disposeTime = 0, this.mcName = "", this._counts = 0
    }
    return t.prototype.addCount = function(t) {
        void 0 === t && (t = 1), this._counts = this._counts + t, this.disposeTime = 0
    }, t.prototype.removeCount = function(t) {
        void 0 === t && (t = 1), this._counts = this._counts - t, this._counts <= 0 && (this.disposeTime = App.TimerManager.getSyncTime() + 3e4)
    }, t.prototype.printData = function() {
        console.log("disposeTime : " + this.disposeTime), this.mcName && console.log("$$ effect：" + this.mcName)
    }, t.prototype.dispose = function() {
        this.mcName && (RES.destroyRes(this.mcName + ".png"), RES.destroyRes(this.mcName + ".json")), this.data = null, this.disposeTime = 0, this._counts = 0, this.mcName = null, ObjectPool.push(this)
    }, t
}();
__reflect(McDataRf.prototype, "McDataRf");
var CMovieDataLoader = function() {
    function t() {
        this.loaderList_A = [], this.loaderList_B = [], this.loaderDic = {}, this.loadingConut = 0, this._factory = new egret.MovieClipDataFactory
    }
    return t.ins = function() {
        return t.instance || (t.instance = new t), t.instance
    }, t.prototype.addLoader = function(t, e, i) {
        var n = this.loaderDic[i.hashCode];
        n || (n = this.loaderDic[i.hashCode] = []);
        var r = ObjectPool.get(CMovieDataLoaderItem);
        r.isDelete = !1, r.url = t, r.tar = i, r.dir = e, this.loadingConut >= 1e5 ? (1 == i.level ? this.loaderList_A.push(r) : this.loaderList_B.push(r), n.push(r)) : this.load(r)
    }, t.prototype.load = function(t) {
        this.loadingConut++;
        var e, i, n = this._factory,
            r = t.url,
            o = t.tar,
            a = t.dir,
            s = this,
            h = !1,
            l = function(l) {
                if (!h) {
                    if (!l) return console.log("加载失败，跳过", r), h = !0, s.loadingConut--, void s.loadNext();
                    if (e && i) {
                        if (s.loadingConut--, ObjectPool.push(t), t.isDelete) return void s.loadNext();
                        n.texture = e, n.mcDataSet = i, o.onComplete(a, n.generateMovieClipData()), n.clearCache(), s.loadNext()
                    }
                }
            };
        RES.getResByUrl(r + ".png", function(t) {
            e = t, l(t)
        }, s, RES.ResourceItem.TYPE_IMAGE), RES.getResByUrl(r + ".json", function(t) {
            i = t, l(t)
        }, s, RES.ResourceItem.TYPE_JSON)
    }, t.prototype.loadNext = function() {
        var t = this.loaderList_A.pop();
        t || (t = this.loaderList_B.pop()), t && (t.isDelete ? (ObjectPool.push(t), this.loadNext()) : this.load(t))
    }, t.prototype.remove = function(t) {
        var e = this.loaderDic[t.hashCode];
        if (e) {
            for (var i = 0, n = e; i < n.length; i++) {
                var r = n[i];
                r.isDelete = !0
            }
            delete this.loaderDic[t.hashCode]
        }
    }, t
}();
__reflect(CMovieDataLoader.prototype, "CMovieDataLoader");
var CMovieDataLoaderItem = function() {
    function t() {}
    return t
}();
__reflect(CMovieDataLoaderItem.prototype, "CMovieDataLoaderItem");
var AvatarBtn = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._isTouched = !1, e._avatar = new UIAvatar, e._avatar.autoDispose = !1, e.addChild(e._avatar), e._avatar.addCallBack(e.onPlayCom, e, null), e
    }
    return __extends(e, t), e.prototype.setSize = function(t, e) {}, e.prototype.$onAddToStage = function(e, i) {
        t.prototype.$onAddToStage.call(this, e, i), this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this, this.onTouchDown), this.addEvent(egret.TouchEvent.TOUCH_END, App.stage, this.onTouchEnd)
    }, e.prototype.$onRemoveFromStage = function() {
        t.prototype.$onRemoveFromStage.call(this), this.removeAllEvent()
    }, e.prototype.onPlayCom = function(t) {}, Object.defineProperty(e.prototype, "source", {
        set: function(t) {
            this._avatar.source = t, this._avatar.play(0, "animation")
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.onTouchDown = function() {
        this._isTouched = !0, App.SoundManager.playEffect("button1"), this._avatar.play(1, "animation2")
    }, e.prototype.onTouchEnd = function() {
        this._isTouched && (this._avatar.play(1, "animation3"), this._isTouched = !1)
    }, e
}(BaseCustComponent);
__reflect(AvatarBtn.prototype, "AvatarBtn");
var DBAvatar = function() {
    function t() {
        this._visible = !0, this.isRemove = !1
    }
    return t.prototype.setHandler = function(t, e) {
        this._playCompleteHandler = t, this._loadCompleteHandler = e
    }, t.prototype.setRoot = function(t) {
        this._root = t, this.updateVisible(!0)
    }, t.prototype.setVisible = function(t) {
        this._visible = t, this.updateVisible(!1)
    }, t.prototype.updateVisible = function(t) {
        this._armature && (this._visible && this._root ? (this._root.addChild(this._armature.display), void 0 != this.px && (this._armature.display.x = this.px), void 0 != this.py && (this._armature.display.y = this.py)) : (t || this._root) && App.DisplayUtils.removeFromParent(this._armature.display)), this._visible || this.stop()
    }, t.prototype.load = function(t, e, i) {
        void 0 === e && (e = !1), void 0 === i && (i = DBPart.FIGHT), this.type = i, (e || t != this._armatureName) && (this.unload(), this.isRemove = !1, this._armatureName = t, App.DBAvatarManager.loadArmature(t, this, !1, 1))
    }, t.prototype.unload = function() {
        this._armatureName && (this.isRemove = !0, this._armature && (this.stop(), App.DisplayUtils.removeFromParent(this._armature.display), this._armature.dispose(), this._armature = null), App.DBAvatarManager.unLoadArmature(this._armatureName, this), this._armatureName = null)
    }, t.prototype.create = function(t, e) {
        this._armature = t, this._clock = e, this.updateVisible(!0), this._playName && this.play(this._playName, this._playNum), this._loadCompleteHandler && (this._loadCompleteHandler.args = [this._armatureName], this._loadCompleteHandler.run()), this.checkRelpace()
    }, t.prototype.checkRelpace = function() {
        if (this.replaceDic) {
            for (var t in this.replaceDic) this.replace(t, this.replaceDic[t]);
            this.replaceDic = null
        }
    }, t.prototype.play = function(t, e, i) {
        void 0 === e && (e = 0), void 0 === i && (i = !0);
        var n = this._armature;
        this._playName = t, this._playNum = e, n && this._playName && i && (this.start(), n.animation.play(t, e))
    }, t.prototype.playTempAction = function(t) {
        this._armature && this._playName && (this.start(), this._armature.animation.play(t, 1))
    }, t.prototype.recoverPlay = function() {
        this.play(this._playName, this._playNum)
    }, t.prototype.addListeners = function() {
        this._armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.COMPLETE, this.playComplete, this), this._armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.START, this.actStart, this)
    }, t.prototype.removeListeners = function() {
        this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, this.playComplete, this), this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.START, this.actStart, this)
    }, t.prototype.resetParam = function() {
        this._armatureName = null, this._isPlay = !1, this._playName = null, this._playNum = 0
    }, t.prototype.playComplete = function(t) {
        this._playCompleteHandler && (this._playCompleteHandler.args = [this, this._playName], this._playCompleteHandler.run())
    }, t.prototype.start = function() {
        this._isPlay || (this._clock.add(this._armature), this._isPlay = !0, this.addListeners())
    }, t.prototype.stop = function() {
        this._playName = null, this._isPlay && (this._clock.remove(this._armature), this._isPlay = !1, this.removeListeners())
    }, Object.defineProperty(t.prototype, "armature", {
        get: function() {
            return this._armature
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "playName", {
        get: function() {
            return this._playName
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "playNum", {
        get: function() {
            return this._playNum
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.onRemove = function() {
        this.unload(), this.resetParam()
    }, t.prototype.dispose = function() {
        this.onRemove(), this._root = null, this._playCompleteHandler = null, this._loadCompleteHandler = null;
        for (var t = 0, e = this.replaceList; t < e.length; t++) {
            var i = e[t];
            i.dispose && i.dispose(), i instanceof eui.Image && (i.source = null)
        }
    }, t.prototype.replace = function(t, e, i, n) {
        if (void 0 === i && (i = !0), void 0 === n && (n = !0), this._armature) {
            var r = this._armature.getSlot(t),
                o = r.display;
            i && o && (o.dispose && o.dispose(), o instanceof eui.Image && (o.source = null)), r.display = e, n && (this.replaceList || (this.replaceList = []), this.replaceList.push(e))
        } else this.replaceDic || (this.replaceDic = {}), this.replaceDic[t] = e
    }, t.prototype.actStart = function(t) {
        var e = t.animationState.name;
        if (this.changeDic) {
            for (var i in this.changeDic)
                if (i == e) {
                    var n = this.changeDic[i][0],
                        r = this.changeDic[i][1],
                        o = this._armature.getSlot(n),
                        a = o.rawDisplayDatas;
                    o.displayList;
                    if (a)
                        for (var s = 0, h = a.length; h > s; s++) a[s].name != r || (o.displayIndex = s);
                    delete this.changeDic[i]
                }
            this.changeDic = null
        }
    }, t.prototype.showDisByName = function(t, e, i) {
        this.changeDic || (this.changeDic = {}), this.changeDic[t] = [e, i]
    }, t
}();
__reflect(DBAvatar.prototype, "DBAvatar");
var DBAvatarBody = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._onStage = !1, e.isPlay = !0, e.bodyGroup = new egret.DisplayObjectContainer, e.addChild(e.bodyGroup), e.touchChildren = e.touchEnabled = !1, e.createBody(), e
    }
    return __extends(e, t), e.prototype.createBody = function() {
        this.body = new DBAvatar, this.body.py = 29, this.body.setHandler(Handler.create(this, this.bodyPlayEnd, null, !1), Handler.create(this, this.onLoadBody, null, !1)), this.body.setRoot(this.bodyGroup)
    }, e.prototype.bodyPlayEnd = function(t, e) {
        this.callHandler && (this.callHandler.args = [e], this.callHandler.run())
    }, e.prototype.onLoadBody = function() {}, e.prototype.loadBody = function(t, e) {
        void 0 === e && (e = DBPart.FIGHT), this.body.load(t, !0, e)
    }, e.prototype.playAction = function(t, e) {
        void 0 === e && (e = 0), this.act = t, this.count = e, this.body.play(t, e, !0), this.isPlay = !0
    }, e.prototype.setStage = function(t) {
        if (this._onStage = t, !this.count)
            if (t) this.isPlay && this.recoverPlay();
            else {
                var e = this.isPlay;
                this.stop(), this.isPlay = e
            }
    }, e.prototype.recoverPlay = function() {
        this.body.play(this.act, this.count, this._onStage)
    }, Object.defineProperty(e.prototype, "onStage", {
        get: function() {
            return this._onStage
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.hasBody = function() {
        return null != this.body.armature
    }, e.prototype.setVisible = function(t) {
        this.setStage(t), this.body.setVisible(t)
    }, e.prototype.stop = function() {
        this.isPlay = !1, this.body && this.body.stop()
    }, e.prototype.onRemove = function() {
        this.body.onRemove()
    }, e.prototype.replace = function(t, e, i, n) {
        void 0 === i && (i = !0), void 0 === n && (n = !0), this.body.replace(t, e, i, n)
    }, e.prototype.showDisByName = function(t, e, i) {
        this.body.showDisByName(t, e, i)
    }, e
}(egret.DisplayObjectContainer);
__reflect(DBAvatarBody.prototype, "DBAvatarBody");
var DBAvatarManager = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.disposeTime = 0, e.disposeList = [], e.averageUtils = new AverageUtils, e.clocks = {}, e.files = {}, e.loadFiles = {}, e.start(), e
    }
    return __extends(e, t), e.prototype.addArmatureFile = function(t, e, i) {
        if (!this.files[t.name]) {
            var n = new dragonBones.EgretFactory;
            n.parseDragonBonesData(t), e && n.parseTextureAtlasData(i, e);
            var r = new DBFile;
            r.name = t.name, r.ref = 0, r.factory = n, this.files[t.name] = r
        }
    }, e.prototype.removeArmatureFile = function(t) {
        var e = this.files[t];
        if (e) {
            var i = e.factory;
            i.removeDragonBonesData(t), i.removeTextureAtlasData(t), RES.destroyRes(RES_DIR_DRAGON + e.name + "_ske.json"), RES.destroyRes(RES_DIR_DRAGON + e.name + "_tex.json"), RES.destroyRes(RES_DIR_DRAGON + e.name + "_tex.png"), i.clear(), delete this.files[t]
        }
    }, e.prototype.loadArmature = function(t, e, i, n) {
        if (void 0 === i && (i = !1), void 0 === n && (n = 1), this.files[t]) this.makeArmature(t, e, i, n);
        else {
            var r = this.loadFiles[t];
            r || (r = this.loadFiles[t] = new LoadFile, r.name = t), r.isReplace.push(i), r.tar.push(e), r.loading || this.starLoad(r)
        }
    }, e.prototype.unLoadArmature = function(t, e) {
        if (this.files[t]) this.files[t].ref--;
        else {
            var i = this.loadFiles[t];
            if (i) {
                var n = i.tar.indexOf(e);
                n >= 0 && (i.tar.splice(n, 1), i.isReplace.splice(n, 1), i.tar.length <= 0)
            }
        }
    }, e.prototype.starLoad = function(t) {
        t.loading = !0;
        var e, i, n, r = this,
            o = function() {
                if (e && i && n) {
                    r.addArmatureFile(e, n, i);
                    for (var o = 0, a = t.tar.length; a > o; o++) r.makeArmature(t.name, t.tar[o], t.isReplace[o]);
                    delete r.loadFiles[t.name]
                }
            };
        RES.getResByUrl(RES_DIR_DRAGON + t.name + "_ske.json", function(t) {
            e = t, o()
        }, r, RES.ResourceItem.TYPE_JSON), RES.getResByUrl(RES_DIR_DRAGON + t.name + "_tex.json", function(t) {
            i = t, o()
        }, r, RES.ResourceItem.TYPE_JSON), RES.getResByUrl(RES_DIR_DRAGON + t.name + "_tex.png", function(t) {
            n = t, o()
        }, r, RES.ResourceItem.TYPE_IMAGE)
    }, e.prototype.makeArmature = function(t, e, i, n) {
        void 0 === n && (n = 1);
        var r = this.files[t];
        if (r && !e.isRemove) {
            r.ref++;
            var o = r.factory;
            if (!i) {
                var a = o.buildArmature("armatureName");
                if (null == a) return;
                a.cacheFrameRate = DBPart.getCache(e.type);
                var s = this.createWorldClock(e.type);
                e.create(a, s)
            }
        }
    }, e.prototype.createWorldClock = function(t) {
        var e = this.clocks[t];
        return e || (e = new DBClock(t), this.clocks[t] = e), e.clock
    }, e.prototype.onEnterFrame = function() {
        for (var t in this.clocks) this.clocks[t].onEnterFrame();
        var e = App.TimerManager.getSyncTime();
        if (e >= this.disposeTime) {
            this.disposeTime = e + 6e4;
            var i = this.disposeList.shift();
            if (i) {
                var n = this.files[i];
                if (!n || n.ref > 0) return;
                this.removeArmatureFile(i)
            }
        }
    }, e.prototype.updateClockFps = function() {
        for (var t in this.clocks) this.clocks[t].ivFrame = DBPart.getFrame(t)
    }, e.prototype.onScengChange = function() {
        var t = App.TimerManager.getSyncTime();
        this.disposeTime = t + 6e4, this.disposeList.length = 0;
        for (var e in this.files) {
            var i = this.files[e];
            i.ref <= 0 && this.disposeList.push(i.name)
        }
    }, e.prototype.replaceSoltDisplay = function(t, e, i, n, r) {}, e.prototype.stop = function() {
        this.isPlay && (App.TimerManager.remove(this.onEnterFrame, this), this.isPlay = !1)
    }, e.prototype.start = function() {
        this.isPlay || (this.isPlay = !0, this.disposeTime = this.advancedTime = App.TimerManager.getSyncTime(), App.TimerManager.addFrame(2, this.onEnterFrame, this))
    }, e
}(BaseClass);
__reflect(DBAvatarManager.prototype, "DBAvatarManager");
var DBFile = function() {
    function t() {
        this._ref = 0
    }
    return Object.defineProperty(t.prototype, "ref", {
        get: function() {
            return this._ref
        },
        set: function(t) {
            this._ref = t
        },
        enumerable: !0,
        configurable: !0
    }), t
}();
__reflect(DBFile.prototype, "DBFile");
var LoadFile = function() {
    function t() {
        this.tar = [], this.isReplace = [], this.loading = !1
    }
    return t
}();
__reflect(LoadFile.prototype, "LoadFile");
var DBClock = function() {
    function t(t) {
        this.advancedTime = 0, this.clock = new dragonBones.WorldClock, this.clock.timeScale = 1, this.ivFrame = DBPart.getFrame(t), this.curFrame = 0, this.averageUtils = new AverageUtils, this.advancedTime = App.TimerManager.getSyncTime()
    }
    return t.prototype.onEnterFrame = function() {
        if (this.curFrame++, !(this.curFrame < this.ivFrame)) {
            this.curFrame = 0;
            var t = App.TimerManager.getSyncTime(),
                e = t - this.advancedTime;
            e > 100 && (e = 100), this.advancedTime = t, this.averageUtils.push(e), e = .001 * this.averageUtils.getValue(), this.clock.advanceTime(e)
        }
    }, t
}();
__reflect(DBClock.prototype, "DBClock");
var DBPart = function() {
    function t() {}
    return t.getCache = function(t) {
        return t == this.FIGHT ? 24 : 30
    }, t.getFrame = function(t) {
        return t == this.FIGHT ? 1 : t == this.OTHER_NUDE ? 1 : (t == this.UI, 1)
    }, t.FIGHT = "FIGHT", t.OTHER_NUDE = "OTHER_NUDE", t.UI = "UI", t
}();
__reflect(DBPart.prototype, "DBPart");
var UIAvatar = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.autoDispose = !0, e.economy = !0, e.body = new DBAvatarBody, e.addChild(e.body), e.body.body.py = 0, e.body.callHandler = Handler.create(e, e.onPlayEnd, null, !1), e.touchEnabled = e.touchChildren = !1, e
    }
    return __extends(e, t), Object.defineProperty(e.prototype, "source", {
        set: function(t) {
            this.body.loadBody(t, DBPart.UI), this.play(0)
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.play = function(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = "animation"), this.action = e, this.body.playAction(e, t)
    }, e.prototype.stop = function() {
        this.body.stop()
    }, e.prototype.setInterval = function(t) {
        void 0 === t && (t = [3e3, 6e3]), this._time = t, this.autoDispose = !1
    }, e.prototype.addCallBack = function(t, e, i) {
        void 0 === t && (t = null), void 0 === e && (e = null), void 0 === i && (i = null), this._callBack = Handler.create(e, t, i || [], !1)
    }, e.prototype.onPlayEnd = function(t) {
        this._callBack && (this._callBack.args.push(t), this._callBack.run(), this._callBack && this._callBack.args.pop()), this._time && App.TimerManager.addDelay(MathUtils.limitInteger(this._time[0], this._time[1]), 1, 1, this.body.recoverPlay, this.body), this.autoDispose && this.dispose()
    }, e.prototype.dispose = function() {
        this.body.onRemove(), t.prototype.dispose.call(this), this.body.callHandler && (this.body.callHandler.dispose(), this.body.callHandler = null), this._callBack && (this._callBack.dispose(), this._callBack = null), App.DisplayUtils.removeFromParent(this), App.TimerManager.remove(this.body.recoverPlay, this.body), this._time = null, this.autoDispose = !0, this.x = 0, this.y = 0, this.scaleX = 1, this.scaleY = 1
    }, e.prototype.$onAddToStage = function(e, i) {
        t.prototype.$onAddToStage.call(this, e, i), this.economy && this.body.setStage(!0)
    }, e.prototype.$onRemoveFromStage = function() {
        t.prototype.$onRemoveFromStage.call(this), this.economy && this.body.setStage(!1)
    }, e.prototype.replace = function(t, e, i, n) {
        void 0 === i && (i = !0), void 0 === n && (n = !0), this.body.replace(t, e, i, n)
    }, e.prototype.showDisByName = function(t, e, i) {
        this.body.showDisByName(t, e, i)
    }, e
}(BaseCustComponent);
__reflect(UIAvatar.prototype, "UIAvatar");
var AssetAdapter = function() {
    function t() {}
    return t.prototype.getAsset = function(t, e, i) {
        function n(n) {
            e.call(i, n, t)
        }
        if (RES.hasRes(t)) {
            var r = RES.getRes(t);
            r ? n(r) : RES.getResAsync(t, n, this)
        } else RES.getResByUrl(t, n, this, RES.ResourceItem.TYPE_IMAGE)
    }, t
}();
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var CacheManager = function() {
    function t() {}
    return t.reg = function(t) {
        this.cacheList.push(t)
    }, t.clearAll = function() {
        for (var t = 0, e = this.cacheList.length; e > t; t++) this.cacheList[t].clear()
    }, t.onLogin = function() {
        for (var t = 0, e = this.cacheList.length; e > t; t++) this.cacheList[t].onLogin()
    }, t.cacheList = [], t
}();
__reflect(CacheManager.prototype, "CacheManager");
var MsgEvent;
! function(t) {
    t.RESIZE_STAGE = "RESIZE_STAGE"
}(MsgEvent || (MsgEvent = {}));
var GameByteArray = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.endian = egret.Endian.LITTLE_ENDIAN, e
    }
    return __extends(e, t), e.prototype.readCustomBytes = function() {
        var t = this.readUTF();
        return this.position++, t
    }, e.prototype.readUnsignedInt64 = function() {
        var t = this.readUnsignedInt(),
            e = this.readUnsignedInt();
        return e * uint64.MaxLowUint + t
    }, e.prototype.readInt64 = function() {
        var t = this.readInt(),
            e = this.readInt();
        return 0 > e && e++, e * uint64.MaxLowUint + t
    }, e.prototype.readNumeric = function(t) {
        switch (t) {
            case e.DT_SMALL:
                return this.readByte();
            case e.DT_USMALL:
                return this.readUnsignedByte();
            case e.DT_SHORT:
                return this.readShort();
            case e.DT_USHORT:
                return this.readUnsignedShort();
            case e.DT_INT:
                return this.readInt();
            case e.DT_UINT:
                return this.readUnsignedInt();
            case e.DT_FLOAT:
                return this.readFloat();
            case e.DT_INT64:
                return this.readInt64();
            default:
                return 0
        }
    }, e.prototype.writeNumber = function(t) {
        var e = uint64.stringToUint64(t.toString());
        this.writeInt64(e)
    }, e.prototype.writeInt64 = function(t) {
        this.writeUnsignedInt(t._lowUint), this.writeUnsignedInt(t._highUint)
    }, e.prototype.writeString = function(t) {
        this.writeUTF(t), this.writeByte(0)
    }, e.prototype.writeCmd = function(t, e) {
        this.writeByte(t), this.writeByte(e)
    }, e.recycleByte = function(t) {
        ObjectPool.push(t)
    }, e.getBytes = function() {
        var t = ObjectPool.get(e);
        return t.clear(), t
    }, e.DT_VOID = 0, e.DT_SMALL = 1, e.DT_USMALL = 2, e.DT_SHORT = 3, e.DT_USHORT = 4, e.DT_INT = 5, e.DT_UINT = 6, e.DT_FLOAT = 7, e.DT_INT64 = 8, e
}(egret.ByteArray);
__reflect(GameByteArray.prototype, "GameByteArray");
var CRC16 = function() {
    function t() {}
    return t.update = function(e, i, n) {
        void 0 === i && (i = 0), void 0 === n && (n = 0);
        var r = 0,
            o = 0;
        0 == n && (n = e.length), e.position = i;
        for (var a = i; n > a; ++a) o = 255 & t.CRCBitReflect(e.readByte(), 8) ^ r >> 8 & 16777215, o &= 255, r = t.CRCTable[o] ^ r << 8 & 4294967040;
        return 65535 & (0 ^ t.CRCBitReflect(r, 16))
    }, t.makeCRCTable = function() {
        for (var e = 0, i = new Array(256), n = 0; 256 > n; ++n) {
            e = n << 8 & 4294967040;
            for (var r = 0; 8 > r; ++r) e = 32768 & e ? e << 1 & 4294967294 ^ t.POLYNOMIAL : e << 1 & 4294967294;
            i[n] = e
        }
        return i
    }, t.CRCBitReflect = function(e, i) {
        var n = 0,
            r = 0;
        i--;
        for (var o = 0; i >= o; ++o) r = i - o, 1 & e && (n |= 1 << r & t.DropBits[r]), e = e >> 1 & 2147483647;
        return n
    }, t.POLYNOMIAL = 4129, t.CRCTable = t.makeCRCTable(), t.DropBits = [4294967295, 4294967294, 4294967292, 4294967288, 4294967280, 4294967264, 4294967232, 4294967168, 4294967040, 4294966784, 4294966272, 4294965248, 4294963200, 4294959104, 4294950912, 4294934528], t
}();
__reflect(CRC16.prototype, "CRC16");
var Encrypt = function() {
    function t() {}
    return t.encode = function(e, i, n) {
        if (void 0 === i && (i = 0), void 0 === n && (n = 0), i >= e.length) return 0;
        var r = n ? i + n : e.length;
        r > e.length && (r = e.length), e.position = i;
        for (var o = i; r > o; ++o) {
            var a = e.readByte();
            a ^= t.sKeyBuff[o % 4], e.position--, e.writeByte(a)
        }
        return r - i
    }, t.decode = function(e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), t.encode(e, i, n)
    }, t.getCRC16 = function(t, e) {
        return void 0 === e && (e = 0), CRC16.update(t, 0, e)
    }, t.getCRC16ByPos = function(t, e, i) {
        return void 0 === e && (e = 0), void 0 === i && (i = 0), CRC16.update(t, e, i)
    }, t.getCheckKey = function() {
        var e = new egret.ByteArray;
        e.endian = egret.Endian.LITTLE_ENDIAN, e.writeUnsignedInt(t.sKey);
        var i = CRC16.update(e);
        return i
    }, t.getSelfSalt = function() {
        return t.sSelfSalt
    }, t.getTargetSalt = function() {
        return t.sTargetSalt
    }, t.setTargetSalt = function(e) {
        t.sTargetSalt = e, t.makeKey()
    }, t.makeSalt = function() {
        var t = new Date;
        return Math.random() * t.getTime()
    }, t.makeKey = function() {
        t.sKey = (t.sSelfSalt ^ t.sTargetSalt) + t.sSelfSalt + 8654;
        for (var e = 0; 4 > e; ++e) t.sKeyBuff[e] = (t.sKey & 255 << (e << 3)) >> (e << 3)
    }, t.sSelfSalt = t.makeSalt(), t.sKeyBuff = new Array(4), t
}();
__reflect(Encrypt.prototype, "Encrypt");
var ProxyUpdate = function() {
    function t(t) {
        this._cache = t
    }
    return t.prototype.isArray = function(t) {
        return t instanceof Array
    }, t.prototype.isObject = function(t) {
        return t.indexOf("object") > -1
    }, t.prototype.isNormal = function(t) {
        var e = t.indexOf("@") > -1,
            i = t.indexOf(".") > -1,
            n = t.indexOf("_") > -1;
        return !e && !i && !n
    }, t.prototype.isAddToArray = function(t) {
        return "@a" == t
    }, t.prototype.isRemoveToArray = function(t) {
        var e = t.split("_");
        return e.length <= 3 && "@d" == e[0]
    }, t.prototype.isFilter = function(t) {
        var e = t.split("_");
        return "@f" == e[0]
    }, t.prototype.isNumeric = function(t) {
        return parseFloat(t).toString() == t.toString()
    }, t.prototype._updateObject = function(t, e, i) {
        var n = t.split(".");
        "@a" == n[0] || "@s" == n[0] ? i[n[1]] = e : "@d" == n[0] && delete i[n[1]]
    }, t.prototype._getFilterObject = function(t, e) {
        if (e) {
            var i = t.split("_");
            if (3 == i.length && "@f" == i[0] && this.isArray(e))
                for (var n = i[1], r = i[2], o = 0; o < e.length; o++) {
                    var a = e[o];
                    if (3 == i.length && this.isObject(a.toString())) {
                        var s = a[n];
                        if (s && ("@" == r[0] && (r = r.replace("@", "")), r == s)) return a
                    }
                }
        }
        return null
    }, t.prototype._addObjectToArray = function(t, e) {
        if (this.isArray(e))
            for (var i = 0; i < e.length; i++) t.push(e[i]);
        else t.push(e)
    }, t.prototype._removeObjectFromArray = function(t, e, i) {
        var n = e.split("_");
        if (n.length <= 3 && "@d" == n[0] && this.isArray(t))
            for (var r = t.length, o = r - 1; o >= 0; o--) {
                var a = t[o];
                if (3 == n.length) {
                    if (a.hasOwnProperty(n[1])) {
                        var s = n[2];
                        "@" == s[0] && (s = s.replace("@", "")), s == a[n[1]] && t.splice(o, 1)
                    }
                } else 2 == n.length && a.hasOwnProperty(n[1]) ? i == a[n[1]] && t.splice(o, 1) : 1 == n.length && i == a && t.splice(o, 1)
            }
    }, t.prototype.update = function(t, e) {
        if (this._cache[t] = e, e.hasOwnProperty("c"))
            for (var i = e.c, n = Object.keys(i), r = 0, o = n.length; o > r; r++) {
                var a = n[r];
                this._cache[a] && (this._update(this._cache[a], i[a]), App.MessageCenter.dispatch(a + "_HttpUpdate"))
            }
    }, t.prototype._update = function(t, e) {
        if (t && e && this.isObject(e.toString()))
            for (var i = Object.keys(e), n = 0, r = i.length; r > n; n++) {
                var o = i[n],
                    a = e[o];
                if (this.isNormal(o) && this.isObject(a.toString())) t.hasOwnProperty(o) && this._update(t[o], a);
                else if (this.isNormal(o) && this.isNumeric(a)) {
                    var s = t[o];
                    t[o] = s + a
                } else if (this.isNormal(o)) t[o] = a;
                else if (this.isAddToArray(o)) this._addObjectToArray(t, a);
                else if (this.isRemoveToArray(o)) this._removeObjectFromArray(t, o, a);
                else if (this.isFilter(o)) {
                    var h = this._getFilterObject(o, t);
                    h && this._update(h, a)
                } else this._updateObject(o, a, t)
            }
    }, t
}();
__reflect(ProxyUpdate.prototype, "ProxyUpdate");
var Http = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.ins = function() {
        return t.ins.call(this)
    }, e.prototype.send = function(t, e, i, n, r, o) {
        var a = new egret.HttpRequest;
        a.responseType = e ? egret.HttpResponseType.TEXT : egret.HttpResponseType.ARRAY_BUFFER, a.open(t, i ? egret.HttpMethod.GET : egret.HttpMethod.POST), a.once(egret.Event.COMPLETE, n, this), a.once(egret.IOErrorEvent.IO_ERROR, r ? r : function() {}, this), a.once(egret.ProgressEvent.PROGRESS, o ? o : function() {}, this), a.send()
    }, e
}(BaseClass);
__reflect(Http.prototype, "Http");
var EUIResourceManager = function(t) {
    function e() {
        var e = null !== t && t.apply(this, arguments) || this;
        return e.resHash = {}, e.disposeHash = {}, e
    }
    return __extends(e, t), e.prototype.add = function(t, e) {
        var i = this.getSheetName(t);
        return i && (t = i), this.resHash[t] || (this.resHash[t] = ObjectPool.get(EUIResourceItem), this.resHash[t].dir = e), this.resHash[t].count++, delete this.disposeHash[t], this.resHash[t].count
    }, e.prototype.remove = function(t) {
        var e = this.getSheetName(t);
        return e && (t = e), this.resHash[t] ? (this.resHash[t].count--, 0 == this.resHash[t].count && (this.disposeHash[t] = 1), this.resHash[t].count) : 0
    }, e.prototype.has = function(t) {
        return null == this.resHash[t] ? 0 : this.resHash[t]
    }, e.prototype.getSheetName = function(t) {
        if ("string" != typeof t) return null;
        var e = t.indexOf("_json");
        return e > -1 ? t.substr(0, e) + "_json" : null
    }, e.prototype.log = function() {
        var t = this.resHash,
            e = 0;
        for (var i in t) e++, console.log("texture ", i);
        console.log("total ", e)
    }, e.prototype.init = function() {}, e.prototype.doTime = function() {
        var t = App.TimerManager.getSyncTime(),
            e = 0;
        for (var i in this.disposeHash) {
            var n = this.resHash[i];
            if (n.destroyTime > 0 && t > n.destroyTime) {
                var r = this.resHash[i].dir;
                if (r);
                else if (RES.destroyRes(i)) {
                    if (n.dispose(), delete this.resHash[i], delete this.disposeHash[i], e++, e >= 15) return
                } else n.times++, n.times > 0 && (n.dispose(), delete this.resHash[i], delete this.disposeHash[i])
            }
        }
    }, e
}(BaseClass);
__reflect(EUIResourceManager.prototype, "EUIResourceManager");
var EUIResourceItem = function() {
    function t() {
        this.times = 0, this._count = 0
    }
    return Object.defineProperty(t.prototype, "count", {
        get: function() {
            return this._count < 0 ? 0 : this._count
        },
        set: function(t) {
            this._count = t, this.destroyTime = this._count > 0 ? 0 : App.TimerManager.getSyncTime() + 1e4
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.dispose = function() {
        this._count = 0, this.destroyTime = 0, this.times = 0
    }, t
}();
__reflect(EUIResourceItem.prototype, "EUIResourceItem");
var Handler = function() {
    function t(t, e, i, n) {
        void 0 === i && (i = []), void 0 === n && (n = !1), this.isDispose = !1, this.setData(t, e, i, n)
    }
    return t.prototype.setData = function(t, e, i, n) {
        return this.caller = t, this.method = e, this.args = i, this.once = n, this
    }, t.prototype.run = function() {
        this.method && this.method.apply(this.caller, this.args), this.once && this.dispose()
    }, t.prototype.dispose = function() {
        this.isDispose || (this.isDispose = !0, this.caller = null, this.method = null, this.args = null, t.pool.push(this))
    }, t.create = function(e, i, n, r) {
        void 0 === n && (n = []), void 0 === r && (r = !0);
        var o;
        return this.pool.length > 0 ? (o = this.pool.pop(), o.isDispose = !1, o.setData(e, i, n, r), o.hashCode = t.hashCode++, o) : (o = new t(e, i, n, r), o.hashCode = t.hashCode++, o)
    }, t.pool = [], t.hashCode = 0, t
}();
__reflect(Handler.prototype, "Handler");
var RES_DIR = "res/",
    RES_DIR_DRAGON = RES_DIR + "dragon/",
    RES_DIR_ROLE = RES_DIR + "role/",
    RES_DIR_VISIT_ROLE = RES_DIR + "visit/",
    RES_DIR_SOUND = RES_DIR + "music/",
    RES_DIR_EFF = RES_DIR + "eff/",
    RES_DIR_SKILLEFF = RES_DIR + "eff/",
    RES_AVATAR = RES_DIR + "avatar/",
    RES_DIR_BUFF_ICON = "res/image/buffIcon/",
    RES_DIR_AWARD_ICON = "res/image/awardIcon/",
    RES_DIR_AWARD_NAME = "res/image/awardName/",
    DIR_ATLAS = "resource/image/atlas/",
    ThemeAdapter = function() {
        function t() {}
        return t.prototype.getTheme = function(t, e, i, n) {
            function r(t) {
                e.call(n, t)
            }

            function o(e) {
                e.resItem.url == t && (RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, o, null), i.call(n))
            }
            var a = this;
            if ("undefined" != typeof generateEUI) egret.callLater(function() {
                e.call(n, generateEUI)
            }, this);
            else if ("undefined" != typeof generateEUI2) RES.getResByUrl("resource/gameEui.json", function(t, i) {
                window.JSONParseClass.setData(t), egret.callLater(function() {
                    e.call(n, generateEUI2)
                }, a)
            }, this, RES.ResourceItem.TYPE_JSON);
            else if ("undefined" != typeof generateJSON)
                if (t.indexOf(".exml") > -1) {
                    var s = t.split("/");
                    s.pop();
                    var h = s.join("/") + "_EUI.json";
                    generateJSON.paths[t] ? egret.callLater(function() {
                        e.call(n, generateJSON.paths[t])
                    }, this) : RES.getResByUrl(h, function(i) {
                        window.JSONParseClass.setData(i), egret.callLater(function() {
                            e.call(n, generateJSON.paths[t])
                        }, a)
                    }, this, RES.ResourceItem.TYPE_JSON)
                } else egret.callLater(function() {
                    e.call(n, generateJSON)
                }, this);
            else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, o, null), RES.getResByUrl(t, r, this, RES.ResourceItem.TYPE_TEXT)
        }, t
    }();
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var LoadingMgr = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.resOk = !1, e.cacheInit = !1, e.timeOver = !1, e.checkWx = !1, e.isComp = !1, e
    }
    return __extends(e, t), e.ins = function() {
        for (var e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
        return t.ins.call(this)
    }, e.prototype.init = function() {
        SceneManager.ins().runScene(MainScene), App.MessageCenter.addListener(MsgConst.BIND_WEIXIN, this.isBindWei, this)
    }, e.prototype.start = function() {
        this.loadRes()
    }, e.prototype.loadRes = function() {
        var t = "all";
        LogWin.push("预加载资源：" + egret.getTimer()), ResourceUtils.ins().loadGroup(t, this.onResourceLoadComplete, this.onResourceLoadProgress, this)
    }, e.prototype.onResourceLoadComplete = function() {
        LogWin.push("预加载资源完成：" + egret.getTimer()), this.resOk = !0, this.enterGame()
    }, e.prototype.enterGame = function() {
        console.log("进入游戏"), GameCache.data.init(), App.ViewManager.open(ViewConst.MAINUI), App.ViewManager.open(ViewConst.LOADING), LocationProperty.setLoadProgress(100, "(正在进入游戏)"), App.TimerManager.addDelay(600, 1, 1, this.closeloading, this)
    }, e.prototype.isBindWei = function() {
        this.isClose()
    }, e.prototype.closeloading = function() {
        App.TimerManager.remove(this.closeloading, this), this.isEnterGame = !0, this.isClose()
    }, e.prototype.fcmValid = function() {
        this.isClose()
    }, e.prototype.isClose = function() {
        if (this.isEnterGame) {
            if (GameCache.fcm.isOpen()) {
                if (!GameCache.fcm.hasValid) return void App.ViewManager.open(ViewConst.FCM_VIEW);
                if (GameCache.fcm.showTips()) return
            }
            App.ViewManager.close(ViewConst.LOADING)
        }
    }, e.prototype.onResourceLoadProgress = function(t, e) {
        LocationProperty.setLoadProgress(25 + t / e * 60, "(加载必要资源)")
    }, e
}(BaseClass);
__reflect(LoadingMgr.prototype, "LoadingMgr");
var BaseSpriteLayer = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.touchEnabled = !1, e
    }
    return __extends(e, t), e
}(egret.DisplayObjectContainer);
__reflect(BaseSpriteLayer.prototype, "BaseSpriteLayer");
var LayerManager = function() {
    function t() {}
    return t.init = function() {
        this.Game_Main = new BaseEuiLayer, this.Game_Main.name = "Game_Main", this.UI_Main = new BaseEuiLayer({
            vGroup: !0
        }), this.UI_Main.name = "UI_Main", this.UI_Main2 = new BaseEuiLayer, this.UI_Main2.name = "UI_Main2", this.UI_Win = new UIWinLayer({
            modal: !1,
            alpha: .9
        }), this.UI_Win.name = "UI_Win", this.UI_Tips = new BaseEuiLayer, this.UI_Tips.name = "UI_Tips", this.UI_TipsNoClick = new BaseEuiLayer({
            modal: !1
        }), this.UI_TipsNoClick.name = "UI_TipsNoClick", this.UI_Message = new BaseEuiLayer, this.UI_Message.name = "UI_Message", this.UI_Message.touchEnabled = !1, this.UI_Guide = new BaseEuiLayer, this.UI_Guide.name = "UI_Guide", this.UI_Guide.touchEnabled = !1
    }, t.prototype.onStageResize = function() {}, t
}();
__reflect(LayerManager.prototype, "LayerManager");
var SceneManager = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.ins = function() {
        return t.ins.call(this)
    }, e.prototype.clear = function() {
        var t = this._currScene;
        t && (t.onExit(), this._currScene = void 0)
    }, e.prototype.runScene = function(t) {
        if (null == t) return void console.log("runScene:scene is null");
        if (!(this._currScene && this._currScene instanceof t)) {
            var e = this._currScene;
            e && (e.onExit(), e = void 0);
            var i = new t;
            i.onEnter(), this._currScene = i
        }
    }, e.prototype.getCurrScene = function() {
        return this._currScene
    }, e
}(BaseClass);
__reflect(SceneManager.prototype, "SceneManager");
var UIWinLayer = function(t) {
    function e(e) {
        var i = this;
        return DeviceUtils.IsMobile ? (i = t.call(this) || this, i.numShow++, i.bg = new eui.Image, i.bg.width = App.StageUtils.getWidth(), i.bg.height = App.StageUtils.getHeight(), i.addChild(i.bg), i.visible = !1) : i = t.call(this, e) || this, i
    }
    return __extends(e, t), e.prototype.showBg = function(t) {
        this.bg && (this.bg.visible = t)
    }, e
}(BaseEuiLayer);
__reflect(UIWinLayer.prototype, "UIWinLayer");
var BezierTween = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.to = function(t, e, i, n, r, o, a, s, h, l, c) {
        return void 0 === c && (c = null), this.target = t, this._factor = 0, this.startX = e, this.startY = i, this.endX = n, this.endY = r, this.topX = o, this.topY = a, h && (this._Handler = Handler.create(l, h)), egret.Tween.get(this).to({
            factor: 1
        }, s, c).call(this.moveEnd, this), this
    }, e.prototype.moveEnd = function() {
        this._Handler && (this._Handler.run(), this._Handler = null), this.dispose()
    }, Object.defineProperty(e.prototype, "factor", {
        get: function() {
            return this._factor
        },
        set: function(t) {
            this._factor = t;
            var e = 1 - t,
                i = e * e,
                n = t * e * 2,
                r = t * t;
            this.target.x = i * this.startX + n * this.topX + r * this.endX, this.target.y = i * this.startY + n * this.topY + r * this.endY
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.dispose = function() {
        egret.Tween.removeTweens(this), ObjectPool.push(this)
    }, e
}(egret.HashObject);
__reflect(BezierTween.prototype, "BezierTween");
var SoundEffects = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.limitName = null, e.countDic = {}, e
    }
    return __extends(e, t), e.prototype.play = function(t, e) {
        if (e)
            if (this.countDic[t]) {
                if (this.countDic[t] >= e) return;
                this.countDic[t]++
            } else this.countDic[t] = 1;
        var i = this.getSound(t);
        i && this.playSound(i, t)
    }, e.prototype.playSound = function(t, e) {
        var i = t.play(0, 1);
        i.volume = this.volume, this.limitName == e && i.once(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this)
    }, e.prototype.onPlayComplete = function(t) {
        this.limitName = null
    }, e.prototype.setVolume = function(t) {
        this.volume = t
    }, e.prototype.loadedPlay = function(t, e) {
        this.playSound(t, e)
    }, e
}(BaseSound);
__reflect(SoundEffects.prototype, "SoundEffects");
var SoundManager = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.musicOff = 1, e.effectOff = 1, e.soundFlag = !0, e._currEffName = "", e.soundMusic = new SoundMusic, e.soundEffect = new SoundEffects, e
    }
    return __extends(e, t), e.getIns = function() {
        return null == this._instance && (this._instance = new e), this._instance
    }, e.prototype.init = function(t, e, i, n) {
        this.musicOff = t, this.musicVolume = e, this.soundMusic.setVolume(e), this.effectOff = i, this.effectVolume = n, this.soundEffect.setVolume(n)
    }, e.prototype.playResume = function() {
        this.currMusicLoop || (this.currMusicLoop = -1), this.currMusicName && this.playMusic(this.currMusicName, this.currMusicLoop)
    }, e.prototype.playMusic = function(t, e) {
        if (void 0 === e && (e = -1), (this.currMusicName != t || !this.soundMusic.currSound) && (this.currMusicName = t, this.currMusicLoop = e, 1 != this.musicOff && t)) {
            var i = this.musicVolume;
            this.soundMusic.play(RES_DIR_SOUND + t + ".mp3", e), this.soundMusic.Volume = 0;
            var n = this;
            egret.Tween.get(this.soundMusic).to({
                Volume: i
            }, 1e3).call(function() {
                egret.Tween.removeTweens(n.soundMusic)
            })
        }
    }, e.prototype.switchMusic = function(t) {
        this.currMusicName = t;
        var e = this;
        egret.Tween.get(this.soundMusic).to({
            Volume: 0
        }, 1e3).call(function() {
            e.playMusic()
        })
    }, Object.defineProperty(e.prototype, "musicName", {
        get: function() {
            return this.currMusicName
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.stopMusic = function() {
        this.soundMusic.stop()
    }, e.prototype.clearBgName = function() {
        this.currMusicName = null
    }, e.prototype.setMusicOn = function(t) {
        this.musicOff = t, 1 == t ? this.stopMusic() : (this.currMusicLoop || (this.currMusicLoop = -1), this.playMusic(this.currMusicName, this.currMusicLoop))
    }, e.prototype.setMusicVolume = function(t) {
        this.musicVolume = t, this.soundMusic.setVolume(t)
    }, e.prototype.getMusicVolume = function() {
        return this.musicVolume
    }, e.prototype.playEffect = function(t, e) {
        1 != this.effectOff && t && (this._currEffName = t, this.soundEffect.play(RES_DIR_SOUND + t + ".mp3", e))
    }, e.prototype.setEffectOn = function(t) {
        this.effectOff = t
    }, e.prototype.setEffectVolume = function(t) {
        this.effectVolume = t, this.soundEffect.setVolume(t)
    }, e.prototype.getEffectVolume = function() {
        return this.effectVolume
    }, e.prototype.closeAllSound = function(t) {
        this.setMusicOn(t), this.setEffectOn(t)
    }, e.prototype.useSkill = function(t) {}, e
}(egret.HashObject);
__reflect(SoundManager.prototype, "SoundManager");
var SoundMusic = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.stop = function() {
        this.currSoundChannel && (this.currSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onMusicCom, this), this.currSoundChannel.stop()), this.currSoundChannel = null, this.currSound = null, this.currName = ""
    }, e.prototype.play = function(t, e) {
        if (void 0 === e && (e = 1), this.currName != t) {
            this.stop(), this.curCount = e, this.currName = t;
            var i = this.getSound(t);
            i && this.playSound(i, e)
        }
    }, e.prototype.playSound = function(t, e) {
        void 0 === e && (e = 1), t.type = egret.Sound.MUSIC, this.currSound = t, this.curCount || (this.curCount = 1), this.currSoundChannel = this.currSound.play(0, this.curCount), this.currSoundChannel.volume = this.volume, this.currSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onMusicCom, this)
    }, e.prototype.onMusicCom = function() {}, e.prototype.playCom = function() {}, e.prototype.setVolume = function(t) {
        this.volume = t, this.currSoundChannel && (this.currSoundChannel.volume = this.volume)
    }, Object.defineProperty(e.prototype, "Volume", {
        get: function() {
            return this.volume
        },
        set: function(t) {
            this.setVolume(t)
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.loadedPlay = function(t, e) {
        this.currName == e && this.playSound(t)
    }, e.prototype.checkCanClear = function(t) {
        return this.currName != t
    }, e
}(BaseSound);
__reflect(SoundMusic.prototype, "SoundMusic");
var Algorithm = function() {
    function t() {}
    return t.sortAsc = function(t, e) {
        return e > t ? -1 : t > e ? 1 : 0
    }, t.sortAsc1 = function(t, e) {
        return e > t ? 1 : t > e ? -1 : 0
    }, t.sortDesc = function(t, e) {
        return t > e ? -1 : e > t ? 1 : 0
    }, t.binSearch = function(e, i, n) {
        if (void 0 === n && (n = null), !e || 0 == e.length) return 0;
        n || (n = t.sortAsc);
        for (var r = 0, o = e.length - 1; o >= r;) {
            var a = o + r >> 1,
                s = e[a];
            n(s, i) <= 0 ? r = a + 1 : o = a - 1
        }
        return r
    }, t
}();
__reflect(Algorithm.prototype, "Algorithm");
var AverageUtils = function() {
    function t(t) {
        void 0 === t && (t = 10), this.nums = [], this.numsLen = 0, this.numSum = 0, this.maxNum = t
    }
    return t.prototype.push = function(t) {
        this.numsLen > this.maxNum && (this.numsLen--, this.numSum -= this.nums.shift()), this.nums.push(t), this.numSum += t, this.numsLen++
    }, t.prototype.getValue = function() {
        return this.numSum / this.numsLen
    }, t.prototype.clear = function() {
        this.nums.splice(0), this.numsLen = 0, this.numSum = 0
    }, t
}();
__reflect(AverageUtils.prototype, "AverageUtils");
var Base64 = function() {
    function t() {}
    return t.encode = function(e) {
        var i, n, r, o, a, s, h, l = "",
            c = 0;
        for (e = t._utf8_encode(e); c < e.length;) i = e.charCodeAt(c++), n = e.charCodeAt(c++), r = e.charCodeAt(c++), o = i >> 2, a = (3 & i) << 4 | n >> 4, s = (15 & n) << 2 | r >> 6, h = 63 & r, isNaN(n) ? s = h = 64 : isNaN(r) && (h = 64), l = l + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(s) + this._keyStr.charAt(h);
        return l
    }, t.decode = function(t) {
        var e, i, n, r, o, a, s, h = "",
            l = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < t.length;) r = this._keyStr.indexOf(t.charAt(l++)), o = this._keyStr.indexOf(t.charAt(l++)), a = this._keyStr.indexOf(t.charAt(l++)), s = this._keyStr.indexOf(t.charAt(l++)), e = r << 2 | o >> 4, i = (15 & o) << 4 | a >> 2, n = (3 & a) << 6 | s, h += String.fromCharCode(e), 64 != a && (h += String.fromCharCode(i)), 64 != s && (h += String.fromCharCode(n));
        return h = this._utf8_decode(h)
    }, t._utf8_encode = function(t) {
        for (var e = t + "", i = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            128 > r ? i += String.fromCharCode(r) : r > 127 && 2048 > r ? (i += String.fromCharCode(r >> 6 | 192), i += String.fromCharCode(63 & r | 128)) : (i += String.fromCharCode(r >> 12 | 224), i += String.fromCharCode(r >> 6 & 63 | 128), i += String.fromCharCode(63 & r | 128))
        }
        return i
    }, t._utf8_decode = function(t) {
        for (var e = "", i = 0, n = 0, r = 0, o = 0; i < t.length;) n = t.charCodeAt(i), 128 > n ? (e += String.fromCharCode(n), i++) : n > 191 && 224 > n ? (o = t.charCodeAt(i + 1), e += String.fromCharCode((31 & n) << 6 | 63 & o), i += 2) : (o = t.charCodeAt(i + 1), r = t.charCodeAt(i + 2), e += String.fromCharCode((15 & n) << 12 | (63 & o) << 6 | 63 & r), i += 3);
        return e
    }, t._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", t
}();
__reflect(Base64.prototype, "Base64");
var BigNumberCal = function() {
    function t() {}
    return t.checkHasUnit = function(t) {
        "number" == typeof t && (console.log("----传过来的值是number类型，不是string,请检查---", t), t += "");
        for (var e = t.charAt(t.length - 1), i = 0; i < this.unitCoin.length; i++)
            if (this.unitCoin[i] == e) return {
                index: i + 1,
                unit: this.unitCoin[i]
            };
        return null
    }, t.compare = function(t, e) {
        var i = this.openSpecial(t),
            n = this.openSpecial(e);
        if (parseFloat(i) < 1e6 && parseFloat(n) < 1e6) return parseFloat(i) >= parseFloat(n);
        if (i.length > n.length) return !0;
        if (i.length < n.length) return !1;
        for (var r = 0, o = i.length; o > r; r++) {
            if (parseInt(i[r]) > parseInt(n[r])) return !0;
            if (parseInt(i[r]) < parseInt(n[r])) return !1
        }
        return !0
    }, t.openSpecial = function(t, e) {
        void 0 == e && (e = !0), "number" == typeof t && (t += "");
        var i = this.checkHasUnit(t),
            n = t.indexOf(".");
        if (i) {
            var r = t.substr(0, t.length - 1); - 1 != n ? (t = (100 * parseFloat(r)).toFixed(), i.index--, t += "0") : t = r;
            for (var o = 0; o < i.index; o++) t += "000"
        } else -1 != n && e && (t = t.substr(0, n));
        return t
    }, t.closeNumToSpecial = function(t, e) {
        if (void 0 == e && (e = !1), "number" == typeof t && (t += ""), -1 != t.indexOf("e+")) {
            var i = t.split("e+"),
                n = parseInt(i[1]) - i[0].length + 1; - 1 != i[0].indexOf(".") && n++;
            for (var r = i[0].replace(".", ""); n > 0;) n--, r += "0";
            t = r
        }
        if (this.checkHasUnit(t)) return t;
        var o = t.indexOf("."),
            a = t; - 1 != o && (a = t.substr(0, o));
        var s = "",
            h = "",
            l = a.length;
        if (6 >= l) return parseFloat(t).toFixed();
        var c = Math.floor(l / 4);
        (c == l / 4 || e) && (c -= 1), s = this.unitCoin[c - 1];
        var p = a.substr(0, l - 4 * c);
        return c >= 2 && p.length < 3 ? (h = this.unitCoin[c - 2], p + s + this.delFrontZero(a.substr(p.length, 4)) + h) : p + s
    }, t.delFrontZero = function(t) {
        return t.replace(/\b(0+)/gi, "")
    }, t.add = function(t, e) {
        var i = 0;
        if (t = t.toString(), e = e.toString(), "number" == typeof t && (t += "", i++), "number" == typeof e && (e += "", i++), 2 == i) return parseFloat(t) + parseFloat(e) + "";
        var n = this.openSpecial(t),
            r = this.openSpecial(e);
        if (parseFloat(n) < 1e6 && parseFloat(r) < 1e6) return (parseFloat(n) + parseFloat(r)).toFixed();
        var o = "",
            a = 0,
            s = "";
        n.length < r.length && (s = n, n = r, r = s);
        for (var h = 0, l = n.length - r.length; l > h; h++) r = "0" + r;
        for (var c = n.length - 1; c >= 0; c--) {
            var p = parseInt(n[c]) + parseInt(r[c]) + a;
            a = Math.floor(p / 10), p += "";
            var u = parseInt(p) >= 10 ? p.substr(1, 1) : p;
            0 == c && (u = p), o = u + o
        }
        return -1 == o.indexOf("NaN") ? this.delFrontZero(o) : void console.error("-----add计算出错啦---coin1=" + t + "  coin2 =" + e)
    }, t.reduce = function(t, e) {
        var i, n = 0;
        if (t = t.toString(), e = e.toString(), "number" == typeof t && (t += "", n++), "number" == typeof e && (e += "", n++), 2 == n) i = parseFloat(t) - parseFloat(e) + "";
        else {
            var r = this.openSpecial(t),
                o = this.openSpecial(e);
            if (parseFloat(r) < 1e6 && parseFloat(o) < 1e6) i = (parseFloat(r) - parseFloat(o)).toFixed();
            else {
                var a = r.length >= o.length ? "" : "-",
                    s = "",
                    h = 0,
                    l = "";
                r.length < o.length && (l = r, r = o, o = l);
                for (var c = 0, p = r.length - o.length; p > c; c++) o = "0" + o;
                for (var u = r.length - 1; u >= 0; u--) {
                    var d = parseInt(r[u]) - parseInt(o[u]) - h;
                    0 > d ? (d += 10, h = 1) : h = 0, s = d + s
                } - 1 == s.indexOf("NaN") ? ("-" == a && console.log("----请注意减法结果为负数---coin1=" + t + "  coin2 =" + e), i = a + this.delFrontZero(s)) : console.error("-----reduce计算出错啦---coin1=" + t + "  coin2 =" + e)
            }
        }
        return "" == i && (i = "0"), i
    }, t.mult = function(t, e) {
        t = t.toString(), e = e.toString();
        var i = this.openSpecial(t),
            n = this.openSpecial(e, !1);
        if (parseFloat(i) < 1e6 && parseFloat(n) < 1e6) return (parseFloat(i) * parseFloat(n)).toFixed();
        var r = e.indexOf(".");
        if (-1 != r) {
            var o = e.substr(0, r),
                a = e.substring(r + 1, e.length),
                s = this.mult(t, o),
                h = this.mult(t, a);
            return h = h.substr(0, h.length - a.length) + "." + h.substring(h.length - a.length, h.length), this.add(s, h)
        }
        var l = "",
            c = 0,
            p = "";
        i.length > n.length && (p = i, i = n, n = p);
        for (var u = i.length - 1; u >= 0; u--) {
            p = "";
            for (var d = n.length - 1; d >= 0; d--) {
                var f = parseInt(i[u]) * parseInt(n[d]) + c;
                c = Math.floor(f / 10), f += "";
                var g = parseInt(f) >= 10 ? f.substr(1, 1) : f;
                0 == d && (g = f), p = g + p
            }
            for (var _ = i.length - 1; _ > u; _--) p += "0";
            l = "" == l ? p : this.add(l, p)
        }
        return -1 == l.indexOf("NaN") ? this.delFrontZero(l) : void console.error("-----mult计算出错啦---coin1=" + t + "  coin2 =" + e)
    }, t.divi = function() {}, t.floor = function(t) {
        if (!t) return "";
        var e = t.split(".");
        return e[0]
    }, t.unitCoin = ["万", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载", "极"], t
}();
__reflect(BigNumberCal.prototype, "BigNumberCal");
var BitStorer = function() {
    function t(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = !0), this._length = t, this._storer = []
    }
    return Object.defineProperty(t.prototype, "length", {
        get: function() {
            return this._length
        },
        set: function(t) {
            this._storer.length = t >> 5
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "numDirtyBits", {
        get: function() {
            var t, e, i = this._length;
            for (e = 0; i > e; e++) this._storer[e >> 5] & 1 << e % 32 && t++;
            return t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "dirtyBits", {
        get: function() {
            var t, e = [];
            for (t = this._length - 1; t > -1; t--) this._storer[t >> 5] & 1 << t % 32 && (e[e.length] = t);
            return e
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.store = function(t) {}, t.prototype.toByteArray = function(t, e) {
        void 0 === t && (t = null), void 0 === e && (e = 0), t || (t = new egret.ByteArray), t.position = e;
        for (var i, n = this._storer.length, r = 0; n > r; r++) {
            i = this._storer[r];
            for (var o = 0; 32 > o; o += 8) t.writeByte(i >> o & 255)
        }
        return t
    }, t.prototype.setBit = function(t, e) {
        1 & e ? this._storer[t >> 5] |= 1 << t % 32 : this._storer[t >> 5] &= ~(1 << t % 32)
    }, t.prototype.getBit = function(t) {
        return this._storer[t % this._length >> 5] >> t % 32 & 1
    }, t
}();
__reflect(BitStorer.prototype, "BitStorer");
var CollectionUtil = function() {
    function t() {}
    return t.iterator = function(t, e, i, n) {
        if (!t) return [];
        var r = Object.keys(t);
        n && r.sort(function(e, i) {
            var r = t[e],
                o = t[i];
            return n(r, o)
        });
        for (var o = 0, a = [], s = 0, h = r; s < h.length; s++) {
            var l = h[s],
                c = e.apply(i, [o++, t[l], l, r.length]);
            c && a.push(c)
        }
        return a
    }, t.map2List = function(e, i) {
        return t.iterator(e, function(t, e) {
            return e
        }, null, i)
    }, t.removeElementByField = function(t, e, i, n) {
        if (!t || !e) return null;
        for (var r = 0; r < t.length; r++) {
            var o = i ? t[r][i] : t[r];
            if (o === e) {
                var a = void 0;
                return a = n ? t.splice.apply(t, [r, 1].concat(n)) : t.splice(r, 1), a[0]
            }
        }
        return null
    }, t.removeElement = function(t, e, i, n) {
        if (!t || !e) return null;
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            if (i) {
                var a = i.apply(i, [o, e]);
                if (a) {
                    var s = void 0;
                    return s = n ? t.splice.apply(t, [r, 1].concat(n)) : t.splice(r, 1), s[0]
                }
            } else if (o === e) {
                var s = t.splice.apply(t, [r, 1].concat(n));
                return s[0]
            }
        }
        return null
    }, t.findElementByField = function(t, e, i) {
        if (!t || !e) return null;
        for (var n = 0; n < t.length; n++) {
            var r = i ? t[n][i] : t[n];
            if (r === e) return t[n]
        }
        return null
    }, t
}();
__reflect(CollectionUtil.prototype, "CollectionUtil");
var ColorUtil = function() {
    function t() {}
    return t.mergeARGB = function(t, e, i, n) {
        return t << 24 | e << 16 | i << 8 | n
    }, t.getChannel = function(t, e) {
        switch (e) {
            case this.ALPHA:
                return t >> 24 & 255;
            case this.RED:
                return t >> 16 & 255;
            case this.GREEN:
                return t >> 8 & 255;
            case this.BLUE:
                return 255 & t
        }
        return 0
    }, t.numberToString = function(t, e) {
        return void 0 === e && (e = "#"), e + t.toString(16)
    }, t.getColorByquality = function(t) {
        return 0
    }, t.C_WHITE = 16777215, t.C_YELLOW = 16767011, t.C_YELLOW2 = 16774656, t.C_COFFEE = 4992807, t.C_RED = 16711680, t.C_GREEN = 2817792, t.C_BLUE = 41727, t.C_BLUE2 = 7337727, t.C_GRAY = 14079702, t.TITLE_NORMAL = 16762368, t.TITLE_NPC = 65286, t.TITLE_HERO = 16776672, t.TITLE_TITLE = 11879661, t.ALPHA = 4278190080, t.RED = 16711680, t.GREEN = 65280, t.BLUE = 255, t.ColorGrayFlilter = [.3, .6, 0, 0, 0, .3, .6, 0, 0, 0, .3, .6, 0, 0, 0, 0, 0, 0, 1, 0], t
}();
__reflect(ColorUtil.prototype, "ColorUtil");
var CommonUtils = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this
    }
    return __extends(e, t), e.addLableStrokeColor = function(t, e, i) {
        t.strokeColor = e, t.stroke = i
    }, e.getObjectLength = function(t) {
        var e = 0;
        for (var i in t) e++;
        return e
    }, e.copyDataHandler = function(t) {
        var e;
        if (t instanceof Array) e = [];
        else {
            if (!(t instanceof Object)) return t;
            e = {}
        }
        for (var i = Object.keys(t), n = 0, r = i.length; r > n; n++) {
            var o = i[n];
            e[o] = this.copyDataHandler(t[o])
        }
        return e
    }, e.lock = function() {
        App.StageUtils.getStage().touchChildren = !1
    }, e.unlock = function() {
        App.StageUtils.getStage().touchChildren = !0
    }, e.labelIsOverLenght = function(t, e) {
        t.text = this.overLength(e)
    }, e.overLength = function(t) {
        var e = null;
        return 1e5 > t ? e = t : t > 1e8 ? (t /= 1e8, t = Math.floor(10 * t) / 10, e = t + "亿") : (t /= 1e4, t = Math.floor(10 * t) / 10, e = t + "万"), e
    }, e
}(BaseClass);
__reflect(CommonUtils.prototype, "CommonUtils");
var DataUtil = function() {
    function t() {}
    return t.dataToNumberOnArray = function(t, e) {
        for (var i = [], n = 0, r = t; n < r.length; n++) {
            var o = r[n];
            i.push(o[e])
        }
        return i
    }, t.fitListData = function(t) {
        for (var e = t.concat(), i = e.length - 1; i > -1; i--)(void 0 == e[i] || null == e[i]) && e.splice(i, 1);
        return e
    }, t.formatNList = function(t) {
        var e = [];
        for (var i in t) {
            var n = t[i];
            e.push(n)
        }
        return e
    }, t
}();
__reflect(DataUtil.prototype, "DataUtil");
var DateStyle = function(t) {
    function e(e, i, n, r) {
        var o = t.call(this) || this;
        return o.format = [], o.from = 0, o.to = 0, o.isFormatNum = !1, o.format = e, o.from = i, o.to = n, o.isFormatNum = r, o
    }
    return __extends(e, t), e
}(BaseClass);
__reflect(DateStyle.prototype, "DateStyle");
var DateUtils = function(t) {
    function e() {
        var i = t.call(this) || this;
        return i.mod = [e.SECOND_PER_MUNITE, e.MUNITE_PER_HOUR, e.HOURS_PER_DAY, e.DAYS_PER_MONTH, e.MONTH_PER_YEAR, e.YEAR_PER_YEAR], i.mul = [e.SECOND_PER_SECOND, e.SECOND_PER_MUNITE, e.SECOND_PER_HOUR, e.SECOND_PER_DAY, e.SECOND_PER_MONTH, e.SECOND_PER_YEAR], i
    }
    return __extends(e, t), e.prototype.formatMiniDateTime = function(t) {
        return e.MINI_DATE_TIME_BASE + (2147483647 & t) * e.MS_PER_SECOND
    }, e.prototype.formatServerTime = function(t) {
        return (t - e.MINI_DATE_TIME_BASE) / e.MS_PER_SECOND
    }, e.prototype.getFormatBySecond = function(t, i, n) {
        void 0 === i && (i = 1), void 0 === n && (n = 999);
        var r = "",
            o = 1e3 * t;
        switch (i) {
            case e.TIME_FORMAT_1:
                r = this.format_1(o);
                break;
            case e.TIME_FORMAT_2:
                r = this.format_2(o);
                break;
            case e.TIME_FORMAT_3:
                r = this.format_3(o);
                break;
            case e.TIME_FORMAT_4:
                r = this.format_4(o);
                break;
            case e.TIME_FORMAT_5:
                r = this.format_5(o, n);
                break;
            case e.TIME_FORMAT_6:
                r = this.format_6(o);
                break;
            case e.TIME_FORMAT_7:
                r = this.format_7(o);
                break;
            case e.TIME_FORMAT_8:
                r = this.format_8(o);
                break;
            case e.TIME_FORMAT_9:
                r = this.format_9(o);
                break;
            case e.TIME_FORMAT_10:
                r = this.format_10(o);
                break;
            case e.TIME_FORMAT_11:
                r = this.format_11(o);
                break;
            case e.TIME_FORMAT_12:
                r = this.format_12(o);
                break;
            case e.TIME_FORMAT_13:
                r = this.format_13(o);
                break;
            case e.TIME_FORMAT_14:
                r = this.format_14(o);
                break;
            case e.TIME_FORMAT_15:
                r = this.format_15(o);
                break;
            case e.TIME_FORMAT_16:
                r = this.format_16(o);
                break;
            case e.TIME_FORMAT_17:
                r = this.format_17(o);
                break;
            case e.TIME_FORMAT_18:
                r = this.format_18(o);
                break;
            case e.TIME_FORMAT_19:
                r = this.format_19(o)
        }
        return r
    }, e.prototype.format_1 = function(t) {
        var i = 0,
            n = "##:##:##";
        return i = Math.floor(t / e.MS_PER_HOUR), n = n.replace("##", this.formatTimeNum(i)), i && (t -= i * e.MS_PER_HOUR), i = Math.floor(t / e.MS_PER_MINUTE), n = n.replace("##", this.formatTimeNum(i)), i && (t -= i * e.MS_PER_MINUTE), i = Math.floor(t / 1e3), n = n.replace("##", this.formatTimeNum(i))
    }, e.prototype.format_2 = function(t) {
        var e = new Date(t),
            i = e.getFullYear(),
            n = e.getMonth() + 1,
            r = e.getDate(),
            o = e.getHours(),
            a = e.getMinutes(),
            s = e.getSeconds();
        return i + "-" + n + "-" + r + " " + o + ":" + a + ":" + s
    }, e.prototype.format_3 = function(t) {
        var e = this.format_1(t),
            i = e.split(":");
        return i[1] + ":" + i[2]
    }, e.prototype.format_4 = function(t) {
        return t < e.MS_PER_HOUR ? Math.floor(t / e.MS_PER_MINUTE) + "分钟前" : t < e.MS_PER_DAY ? Math.floor(t / e.MS_PER_HOUR) + "小时前" : Math.floor(t / e.MS_PER_DAY) + "天前"
    }, e.prototype.format_5 = function(t, i) {
        void 0 === i && (i = 2);
        var n = "",
            r = ["天", "时", "分", "秒"],
            o = [],
            a = Math.floor(t / e.MS_PER_DAY);
        o.push(a), t -= a * e.MS_PER_DAY;
        var s = Math.floor(t / e.MS_PER_HOUR);
        o.push(s), t -= s * e.MS_PER_HOUR;
        var h = Math.floor(t / e.MS_PER_MINUTE);
        o.push(h), t -= h * e.MS_PER_MINUTE;
        var l = Math.floor(t / 1e3);
        o.push(l);
        for (var c in o)
            if (o[c] > 0 && (n += this.formatTimeNum(o[c]) + r[c], i--, 0 >= i)) break;
        return n
    }, e.prototype.format_6 = function(t) {
        var e = new Date(t),
            i = e.getHours(),
            n = e.getMinutes(),
            r = e.getSeconds();
        return this.formatTimeNum(i) + ":" + this.formatTimeNum(n) + ":" + this.formatTimeNum(r)
    }, e.prototype.format_7 = function(t) {
        return t < e.MS_PER_HOUR ? "<1小时" : t < e.MS_PER_DAY ? Math.floor(t / e.MS_PER_HOUR) + "小时" : Math.floor(t / e.MS_PER_DAY) + "天"
    }, e.prototype.format_8 = function(t) {
        var e = new Date(t),
            i = e.getFullYear(),
            n = e.getMonth() + 1,
            r = e.getDate(),
            o = e.getHours(),
            a = e.getMinutes();
        return i + "-" + n + "-" + r + " " + o + ":" + a
    }, e.prototype.format_9 = function(t) {
        var i = Math.floor(t / e.MS_PER_HOUR);
        t -= i * e.MS_PER_HOUR;
        var n = Math.floor(t / e.MS_PER_MINUTE);
        t -= n * e.MS_PER_MINUTE;
        var r = Math.floor(t / 1e3);
        return i + "小时" + n + "分钟" + r + "秒"
    }, e.prototype.format_10 = function(t) {
        var i = Math.floor(t / e.MS_PER_MINUTE);
        t -= i * e.MS_PER_MINUTE;
        var n = Math.floor(t / 1e3);
        return i ? n ? i + "分钟" + n + "秒" : i + "分钟" : n + "秒"
    }, e.prototype.format_11 = function(t) {
        var i = Math.ceil(t / e.MS_PER_MINUTE);
        return i + "分钟"
    }, e.prototype.format_12 = function(t) {
        var i = "",
            n = Math.floor(t / e.MS_PER_DAY);
        t -= n * e.MS_PER_DAY;
        var r = Math.floor(t / e.MS_PER_HOUR);
        t -= r * e.MS_PER_HOUR;
        var o = t < e.MS_PER_MINUTE ? Math.ceil(t / e.MS_PER_MINUTE) : Math.floor(t / e.MS_PER_MINUTE);
        return t -= o * e.MS_PER_MINUTE, n > 0 && (i += n + "天"), i += r + "小时", i += o + "分钟"
    }, e.prototype.format_14 = function(t) {
        return Math.floor(t / e.MS_PER_DAY) + ""
    }, e.prototype.format_15 = function(t) {
        var e = new Date(t),
            i = e.getFullYear(),
            n = e.getMonth() + 1,
            r = e.getDate(),
            o = e.getHours(),
            a = e.getMinutes(),
            s = e.getSeconds(),
            h = "",
            l = "",
            c = "";
        return h = 10 > o ? "0" + o : "" + o, l = 10 > a ? "0" + a : "" + a, c = 10 > s ? "0" + s : "" + s, i + "-" + n + "-" + r + " " + h + ":" + l + ":" + c
    }, e.prototype.format_13 = function(t) {
        var e = new Date(t),
            i = e.getFullYear(),
            n = e.getMonth() + 1,
            r = e.getDate(),
            o = e.getHours(),
            a = e.getMinutes();
        return i + "年" + n + "月" + r + "日" + o + "时" + a + "分 "
    }, e.prototype.format_16 = function(t) {
        var e = new Date(t),
            i = e.getFullYear(),
            n = e.getMonth() + 1,
            r = e.getDate();
        return i + "." + n + "." + r
    }, e.prototype.format_17 = function(t) {
        var e = new Date(t),
            i = e.getHours(),
            n = e.getMinutes(),
            r = "",
            o = "";
        return r = 10 > i ? "0" + i : "" + i, o = 10 > n ? "0" + n : "" + n, r + ":" + o
    }, e.prototype.format_18 = function(t) {
        return Math.ceil(t / e.MS_PER_DAY) + ""
    }, e.prototype.format_19 = function(t) {
        var i = 0,
            n = "##:##";
        return i = Math.floor(t / e.MS_PER_MINUTE), n = n.replace("##", this.formatTimeNum(i)), i && (t -= i * e.MS_PER_MINUTE), i = Math.floor(t / 1e3), n = n.replace("##", this.formatTimeNum(i))
    }, e.prototype.DayEndTime = function(t) {
        var e = new Date;
        e.setTime(1e3 * t);
        var i = e.getHours(),
            n = e.getMinutes(),
            r = e.getSeconds();
        return 23 - i + "小时" + (59 - n) + "分钟" + (59 - r) + "秒"
    }, e.prototype.DayEndTimeSe = function(t) {
        var e = 0,
            i = ObjectPool.get(Date);
        i.setTime(t);
        var n = i.getHours(),
            r = i.getMinutes(),
            o = i.getSeconds();
        return e = 3600 * (23 - n) + 60 * (59 - r) + (59 - o), ObjectPool.push(i), e
    }, e.prototype.dayDelta = function(t, e) {
        if (t && e) {
            var i, n = new Date,
                r = new Date;
            return n.setTime(1e3 * t), r.setTime(1e3 * e), n.setHours(0, 0, 0, 0), r.setHours(0, 0, 0, 0), i = Math.floor((r.getTime() - n.getTime()) / 864e5)
        }
    }, e.prototype.isOverdue = function(t) {
        return !1
    }, e.prototype.formatTimeNum = function(t) {
        return t >= 10 ? t.toString() : "0" + t
    }, e.prototype.timeFormat = function(t, e, i) {
        void 0 === i && (i = DateShowType.DOUBLE);
        var n, r = "一二三四五六日",
            o = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        n = t instanceof Date ? t : new Date(t);
        var a = n.getFullYear(),
            s = n.getMonth() + 1,
            h = n.getDate(),
            l = n.getHours(),
            c = n.getMinutes(),
            p = n.getSeconds(),
            u = n.getMilliseconds(),
            d = n.getDay(),
            f = 10 > s && i == DateShowType.DOUBLE ? "0" + s : s.toString(),
            g = 10 > h && i == DateShowType.DOUBLE ? "0" + h : h.toString(),
            _ = 10 > l && i == DateShowType.DOUBLE ? "0" + l : l.toString(),
            y = 10 > c && i == DateShowType.DOUBLE ? "0" + c : c.toString(),
            m = 10 > p && i == DateShowType.DOUBLE ? "0" + p : p.toString();
        return e = -1 !== e.indexOf("yyyy") ? e.replace("yyyy", a.toString()) : e.replace("yy", (a + "").slice(2)), e = e.replace("MM", f), e = e.replace("dd", g), e = e.replace("hh", _), e = e.replace("mm", y), e = e.replace("ss", m), e = e.replace("SSS", u.toString()), e = e.replace("W", r[d - 1]), e = e.replace("ww", o[d - 1]), e = e.replace("w", d.toString())
    }, e.prototype.msFormat = function(t, i, n) {
        void 0 === n && (n = DateShowType.DOUBLE);
        var r = t;
        0 > r && (r = 0);
        var o = r > 0 ? Math.floor(r / e.SECOND_PER_YEAR / 1e3) : 0;
        r -= o * e.SECOND_PER_YEAR * 1e3;
        var a = r > 0 ? Math.floor(r / e.SECOND_PER_MONTH / 1e3) : 0;
        r -= a * e.SECOND_PER_MONTH * 1e3;
        var s = r > 0 ? Math.floor(r / e.SECOND_PER_DAY / 1e3) : 0;
        r -= s * e.SECOND_PER_DAY * 1e3;
        var h = r > 0 ? Math.floor(r / e.SECOND_PER_HOUR / 1e3) : 0;
        r -= h * e.SECOND_PER_HOUR * 1e3;
        var l = r > 0 ? Math.floor(r / e.SECOND_PER_MUNITE / 1e3) : 0;
        r -= l * e.SECOND_PER_MUNITE * 1e3;
        var c = r > 0 ? Math.floor(r / 1e3) : 0,
            p = 10 > a && n == DateShowType.DOUBLE ? "0" + a : a.toString(),
            u = 10 > s && n == DateShowType.DOUBLE ? "0" + s : s.toString(),
            d = 10 > h && n == DateShowType.DOUBLE ? "0" + h : h.toString(),
            f = 10 > l && n == DateShowType.DOUBLE ? "0" + l : l.toString(),
            g = 10 > c && n == DateShowType.DOUBLE ? "0" + c : c.toString();
        return i = -1 !== i.indexOf("yyyy") ? i.replace("yyyy", o.toString()) : i.replace("yy", (o + "").slice(2)), i = i.replace("MM", p), i = i.replace("dd", u), i = i.replace("hh", d), i = i.replace("mm", f), i = i.replace("ss", g)
    }, e.prototype.isSameDay = function(t, e) {
        var i = new Date;
        i.setTime(1e3 * t);
        var n = new Date;
        return n.setTime(1e3 * e), i.getFullYear() == n.getFullYear() && i.getMonth() == n.getMonth() && i.getDate() == n.getDate()
    }, e.TIME_FORMAT_1 = 1, e.TIME_FORMAT_2 = 2, e.TIME_FORMAT_3 = 3, e.TIME_FORMAT_4 = 4, e.TIME_FORMAT_5 = 5, e.TIME_FORMAT_6 = 6, e.TIME_FORMAT_7 = 7, e.TIME_FORMAT_8 = 8, e.TIME_FORMAT_9 = 9, e.TIME_FORMAT_10 = 10, e.TIME_FORMAT_11 = 11, e.TIME_FORMAT_12 = 12, e.TIME_FORMAT_13 = 13, e.TIME_FORMAT_14 = 14, e.TIME_FORMAT_15 = 15, e.TIME_FORMAT_16 = 16, e.TIME_FORMAT_17 = 17, e.TIME_FORMAT_18 = 18, e.TIME_FORMAT_19 = 19, e.MS_PER_SECOND = 1e3, e.MS_PER_MINUTE = 6e4, e.MS_PER_HOUR = 36e5, e.MS_PER_DAY = 864e5, e.SECOND_PER_HOUR = 3600, e.SECOND_PER_DAY = 86400, e.SECOND_PER_MONTH = 2592e3, e.SECOND_PER_YEAR = 31104e3, e.DAYS_PER_WEEK = 7, e.YEAR_PER_YEAR = 1, e.MONTH_PER_YEAR = 12, e.DAYS_PER_MONTH = 30, e.HOURS_PER_DAY = 24, e.MUNITE_PER_HOUR = 60, e.SECOND_PER_MUNITE = 60, e.SECOND_PER_SECOND = 1, e.MINI_DATE_TIME_BASE = Date.UTC(2010, 0) + (new Date).getTimezoneOffset() * e.MS_PER_MINUTE, e.TIME_ZONE_OFFSET = 8 * e.MS_PER_HOUR, e.TO_SECOND = 0, e.TO_MINUTE = 1, e.TO_HOUR = 2, e.TO_DAY = 3, e.TO_MONTH = 4, e.TO_YEAR = 5, e.FORMAT_1 = ["秒", "分", "时", "天", "月", "年"], e.FORMAT_2 = [":", ":", ":", ":", ":", ":"], e.STYLE_1 = new DateStyle(e.FORMAT_1, e.TO_SECOND, e.TO_HOUR, !1), e.STYLE_2 = new DateStyle(e.FORMAT_1, e.TO_SECOND, e.TO_DAY, !1), e.STYLE_3 = new DateStyle(e.FORMAT_2, e.TO_SECOND, e.TO_HOUR, !0), e.STYLE_4 = new DateStyle(e.FORMAT_1, e.TO_SECOND, e.TO_MINUTE, !0), e
}(BaseClass);
__reflect(DateUtils.prototype, "DateUtils");
var DateShowType;
! function(t) {
    t[t.DOUBLE = 0] = "DOUBLE", t[t.SINGLE = 1] = "SINGLE"
}(DateShowType || (DateShowType = {}));
var DebugUtils = function() {
    function t() {}
    return t.logOnline = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
    }, t
}();
__reflect(DebugUtils.prototype, "DebugUtils");
var logOnline = DebugUtils.logOnline,
    DeviceUtils = function() {
        function t() {}
        return Object.defineProperty(t, "IsHtml5", {
            get: function() {
                return egret.Capabilities.runtimeType == egret.RuntimeType.WEB
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsNative", {
            get: function() {
                return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE || egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsMobile", {
            get: function() {
                return egret.Capabilities.isMobile
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsPC", {
            get: function() {
                return !egret.Capabilities.isMobile
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsCanvas", {
            get: function() {
                return "canvas" == egret.Capabilities.renderMode
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsQQBrowser", {
            get: function() {
                return this.IsHtml5 && -1 != navigator.userAgent.indexOf("MQQBrowser")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsIEBrowser", {
            get: function() {
                return this.IsHtml5 && -1 != navigator.userAgent.indexOf("MSIE")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsFirefoxBrowser", {
            get: function() {
                return this.IsHtml5 && -1 != navigator.userAgent.indexOf("Firefox")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsChromeBrowser", {
            get: function() {
                return this.IsHtml5 && -1 != navigator.userAgent.indexOf("Chrome")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsSafariBrowser", {
            get: function() {
                return this.IsHtml5 && -1 != navigator.userAgent.indexOf("Safari")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "IsOperaBrowser", {
            get: function() {
                return this.IsHtml5 && -1 != navigator.userAgent.indexOf("Opera")
            },
            enumerable: !0,
            configurable: !0
        }), t
    }();
__reflect(DeviceUtils.prototype, "DeviceUtils");
var Dichotomy = function() {
    function t() {}
    return t.searchIndex = function(t, e, i, n, r) {
        void 0 === n && (n = 0), void 0 === r && (r = 2147483647);
        var o, a;
        for (2147483647 == r && (r = t.length - 1); r >= n;) {
            if (o = n + r >> 1, a = e(i, t[o]), 0 == a) return o;
            0 > a ? r = o - 1 : n = ++o
        }
        return -1
    }, t
}();
__reflect(Dichotomy.prototype, "Dichotomy");
var DirType;
! function(t) {
    t[t.NULL = -1] = "NULL", t[t.UP = 0] = "UP", t[t.RIGHT_UP = 1] = "RIGHT_UP", t[t.RIGHT = 2] = "RIGHT", t[t.RIGHT_DOWN = 3] = "RIGHT_DOWN", t[t.DOWN = 4] = "DOWN", t[t.LEFT_DOWN = 5] = "LEFT_DOWN", t[t.LEFT = 6] = "LEFT", t[t.LEFT_UP = 7] = "LEFT_UP"
}(DirType || (DirType = {}));
var DirUtil = function() {
    function t() {}
    return t.get8DirBy2Point = function(t, e) {
        var i = MathUtils.getAngle(MathUtils.getRadian2(t.x, t.y, e.x, e.y));
        return this.angle2dir(i)
    }, t.dir2angle = function(t) {
        return t *= 45, t -= 90
    }, t.angle2dir = function(t) {
        return -90 > t && (t += 360), Math.round((t + 90) / 45) % 8
    }, t.dirOpposit = function(t) {
        return 4 > t ? t + 4 : t - 4
    }, t.get5DirBy8Dir = function(t) {
        return t - this.isScaleX(t)
    }, t.isScaleX = function(t) {
        var e = 2 * (t - 4);
        return 0 > e && (e = 0), e
    }, t.getGridByDir = function(t, e, i) {
        void 0 === e && (e = 1), void 0 === i && (i = {
            x: 0,
            y: 0
        });
        var n = this.dir2angle(this.dirOpposit(t));
        return MathUtils.getDirMove(n, e, i.x, i.y)
    }, t.getGridTowardByDir = function(t, e, i) {
        void 0 === e && (e = 1), void 0 === i && (i = {
            x: 0,
            y: 0
        });
        var n = {
            x: 0,
            y: 0
        };
        return 0 == t ? (n.x = i.x, n.y = i.y - e) : 1 == t ? (n.x = i.x + e, n.y = i.y - e) : 2 == t ? (n.x = i.x + e, n.y = i.y) : 3 == t ? (n.x = i.x + e, n.y = i.y + e) : 4 == t ? (n.x = i.x, n.y = i.y + e) : 5 == t ? (n.x = i.x - e, n.y = i.y + e) : 6 == t ? (n.x = i.x - e, n.y = i.y) : 7 == t && (n.x = i.x - e, n.y = i.y - e), n
    }, t.getDirByPoint = function(t, e) {
        return t.x != e.x ? t.x > e.x ? t.y > e.y ? 7 : t.y < e.y ? 5 : 6 : t.y > e.y ? 1 : t.y < e.y ? 3 : 2 : t.y > e.y ? 0 : t.y < e.y ? 4 : void 0
    }, t
}();
__reflect(DirUtil.prototype, "DirUtil");
var DisplayUtils = function(t) {
    function e() {
        var e = null !== t && t.apply(this, arguments) || this;
        return e.shakingList = {}, e
    }
    return __extends(e, t), e.prototype.removeFromParent = function(t) {
        t && null != t.parent && t.parent.removeChild(t)
    }, e.prototype.drawArc = function(t, e, i, n, r, o) {
        return null == t && (t = new egret.Shape), t.graphics.clear(), t.graphics.lineStyle(r, n), t.graphics.drawArc(0, 0, e, 0, i * Math.PI / 180, o), t.graphics.endFill(), t
    }, e.prototype.drawCircle = function(t, e, i, n, r) {
        void 0 === r && (r = 16777215), t = t ? t : new egret.Shape, t.graphics.clear(), t.graphics.beginFill(r, 1), t.graphics.moveTo(n.x, n.y), t.graphics.lineTo(n.x, 0), t.graphics.drawArc(n.x, n.y, i, -90 * Math.PI / 180, e * Math.PI / 180, !1), t.graphics.lineTo(n.x, n.y), t.graphics.endFill()
    }, e.prototype.shakeIt = function(t, e, i, n, r, o) {
        if (void 0 === n && (n = 1), void 0 === r && (r = !1), void 0 === o && (o = function() {
                return !0
            }), !(!t || !r && 1 > n) && o()) {
            var a = App.DisplayUtils.shakingList[t.hashCode];
            if (!a) {
                App.DisplayUtils.shakingList[t.hashCode] = !0;
                var s = [{
                    anchorOffsetX: 0,
                    anchorOffsetY: -e
                }, {
                    anchorOffsetX: -e,
                    anchorOffsetY: 0
                }, {
                    anchorOffsetX: e,
                    anchorOffsetY: 0
                }, {
                    anchorOffsetX: 0,
                    anchorOffsetY: e
                }, {
                    anchorOffsetX: 0,
                    anchorOffsetY: 0
                }];
                egret.Tween.removeTweens(t);
                var h = i / 5;
                egret.Tween.get(t).to(s[0], h).to(s[1], h).to(s[2], h).to(s[3], h).to(s[4], h).call(function() {
                    delete App.DisplayUtils.shakingList[t.hashCode], App.DisplayUtils.shakeIt(t, e, i, !r && --n, r, o)
                }, this)
            }
        }
    }, e.prototype.clearShake = function(t) {
        egret.Tween.removeTweens(t), delete App.DisplayUtils.shakingList[t.hashCode]
    }, e.prototype.floatObject = function(t, e, i, n) {
        void 0 === n && (n = -1), t && 0 != n && egret.Tween.get(t).to({
            anchorOffsetY: -e
        }, i / 2).to({
            anchorOffsetY: 0
        }, i / 2).call(function() {
            n > 0 ? App.DisplayUtils.floatObject(t, e, i, --n) : 0 > n && App.DisplayUtils.floatObject(t, e, i)
        })
    }, e.prototype.shakeRandom = function(t, e, i) {
        void 0 === i && (i = 1e3), this.clearShake(t), App.DisplayUtils.shakingList[t.hashCode] = !0;
        var n = t.x,
            r = t.y,
            o = function() {
                var a = n + MathUtils.limitInteger(-e, e),
                    s = r + MathUtils.limitInteger(-e, e),
                    h = Math.pow(Math.pow(a - t.x, 2) + Math.pow(s - t.y, 2), .5) / i * 1e3;
                egret.Tween.get(t).to({
                    x: a,
                    y: s
                }, h).call(o)
            };
        o()
    }, e.prototype.flashingObj = function(t, e, i) {
        void 0 === i && (i = 1e3), this.tweenProp(t, e, {
            alpha: 0
        }, {
            alpha: 1
        }, i)
    }, e.prototype.tweenProp = function(t, e, i, n, r) {
        void 0 === r && (r = 1e3), e ? (egret.Tween.removeTweens(t), egret.Tween.get(t, {
            loop: !0
        }).to(i, r).to(n, r)) : egret.Tween.removeTweens(t)
    }, e.prototype.newTextField = function(t, e, i, n, r, o) {
        void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 16777215), void 0 === r && (r = "center"), void 0 === o && (o = 20);
        var a = new egret.TextField;
        return a.x = e, a.y = i, a.text = t, a.size = o, a.textColor = n, a.textAlign = r, a
    }, e.prototype.tabBarIndexShow = function(t, e, i) {
        if (t.numChildren > e) {
            var n = t.getElementAt(e) || t.getChildAt(e);
            n.includeInLayout = i, n.visible = i
        }
    }, e.prototype.tabBarShowFirst = function(t) {
        t.validateNow();
        var e = t.numChildren;
        if (!e) return !1;
        for (var i = 0; e > i; i++)
            if (t.getChildAt(i).includeInLayout) return t.selectedIndex = i, !0;
        return !1
    }, e.prototype.slideContent = function(t, e, i) {
        t.$slideHand = [e, i], t.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.slideEvent, t), t.removeEventListener(egret.TouchEvent.TOUCH_END, this.slideEvent, t), e && (t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.slideEvent, t), t.addEventListener(egret.TouchEvent.TOUCH_END, this.slideEvent, t))
    }, e.prototype.slideEvent = function(t) {
        switch (t.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.$slideValue = [t.stageX, t.stageY];
                break;
            case egret.TouchEvent.TOUCH_END:
                this.$slideValue && (this.$slideHand[0].apply(this.$slideHand[1], [t.stageX - this.$slideValue[0], t.stageY - this.$slideValue[1]]), this.$slideValue = null)
        }
    }, e.prototype.buttonDownTime = function(t, e, i) {
        void 0 === i && (i = []), (t.downTimer <= 0 || !t.downTimer) && (t.restLabel = t.label), t.downTimer = e, t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, t), App.TimerManager.addDelay(0, 1e3, 0, this.onButtonTime, t, null, null, i)
    }, e.prototype.onButtonTime = function(t) {
        void 0 === t && (t = []);
        var e = this;
        return e.downTimer <= 0 ? (e.label = e.restLabel, void e.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP))) : (e.label = e.restLabel + ("(" + e.downTimer + ")"), t && (t[0].text = StringUtils.substitute(t[1], "" + e.downTimer)), void e.downTimer--)
    }, e.prototype.onTap = function() {
        var t = this;
        t.downTimer = null, t.label = t.restLabel, t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, t), App.TimerManager.removeAll(t)
    }, e.prototype.buttonAutoClick = function(t, e, i) {
        void 0 === i && (i = 50), e ? t.$autoClickTimer || (t.$autoClickTimer = i, t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonAutoClick, t, !0), t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAutoClick, t, !0), App.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onButtonAutoClick, t, !0)) : (App.TimerManager.removeAll(t), delete t.$autoClickTimer, t.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonAutoClick, t, !0), t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAutoClick, t, !0), App.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onButtonAutoClick, t, !0))
    }, e.prototype.onButtonAutoClick = function(t) {
        var e = t.currentTarget;
        switch (t.type) {
            case egret.TouchEvent.TOUCH_TAP:
                var i = egret.getTimer();
                !e.$clickTimer || i - e.$clickTimer > 200 ? e.$clickCounts = 1 : (e.$clickCounts++, e.$clickCounts >= 3), e.$clickTimer = i;
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                App.TimerManager.addDelay(1e3, e.$autoClickTimer, 0, function() {
                    return App.DisplayUtils.checkLayerCover() ? void e.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_END)) : void e.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP))
                }, e);
                break;
            case egret.TouchEvent.TOUCH_END:
                App.TimerManager.removeAll(this)
        }
    }, e.prototype.checkLayerCover = function() {
        var t = LayerManager.UI_Tips;
        return t.visible && t.modalRect && t.modalRect.alpha >= .5 ? !0 : !1
    }, e.prototype.circularLayout = function(t, e, i, n, r) {
        void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === r && (r = 0);
        for (var o, a, s = t.numChildren, h = 0; s > h; h++) o = (360 / s * h - 90 + i) / 180 * Math.PI, a = t.getChildAt(h), a.x = e * Math.cos(o) + n, a.y = e * Math.sin(o) + r
    }, e.prototype.addEffectToObj = function(t, e, i, n, r, o, a) {
        void 0 === i && (i = -1), void 0 === n && (n = 0), void 0 === r && (r = 0);
        var s = MovieClip.create();
        return t && t.addChild(s), s.x = n, s.y = r, a && (s.rate = a), s.loadFile(RES_DIR_EFF + e, i, o), s
    }, e.prototype.addDBToObj = function(t, e, i, n, r, o, a, s, h) {
        void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === o && (o = "animation"), void 0 === a && (a = null), void 0 === s && (s = null), void 0 === h && (h = null);
        var l = ObjectPool.get(UIAvatar);
        return t && t.addChild(l), l.x = n, l.y = r, l.source = e, s && l.addCallBack(s, a, h), l.play(i, o || "animation"), l
    }, e.prototype.addClickEff = function(t) {
        t.clickEff || (t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleFunc, t, !0), t.addEventListener(egret.TouchEvent.TOUCH_END, this.scaleFunc, t, !0), t.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.scaleFunc, t, !0)), t.clickEff = 1
    }, e.prototype.scaleFunc = function(t) {
        if (this instanceof eui.TabBar) {
            var e = this.getChildAt(this.selectedIndex);
            e.ico ? e.ico.scaleX = e.ico.scaleY = "touchBegin" != t.type ? 1 : .9 : e.scaleX = e.scaleY = "touchBegin" != t.type ? 1 : .9
        } else {
            var i = 1,
                n = 1;
            this.scaleX < 0 && (i = -1), this.scaleY < 0 && (n = -1), this.scaleX = "touchBegin" != t.type ? 1 * i : .9 * i, this.scaleY = "touchBegin" != t.type ? 1 * n : .9 * n, t.type == egret.TouchEvent.TOUCH_END && 0 != t.target.effMusic && App.SoundManager.playEffect(t.target.effMusic ? t.target.effMusic : SoundType.BUTTONCLICK)
        }
    }, e.prototype.removeClickEff = function(t) {
        t.clickEff && (t.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleFunc, t, !0), t.removeEventListener(egret.TouchEvent.TOUCH_END, this.scaleFunc, t, !0), t.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.scaleFunc, t, !0), delete t.clickEff)
    }, e.prototype.addCbEffect = function(t) {
        t.addEff || (t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCbChange, this, !0), t.addEff = 1), this.showBoxEffect(t)
    }, e.prototype.removeCbEffect = function(t) {
        t.addEff && (t.addEff = null, t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCbChange, this, !0))
    }, e.prototype.showBoxEffect = function(t) {
        t.selected ? t.eff && (t.eff.dispose(), t.eff = null) : (t.eff || (t.eff = this.addEffectToObj(t, "replace_0_1", -1, t.width >> 1, t.height >> 1), t.eff.width = t.width, t.eff.height = t.height), t.eff.play(-1))
    }, e.prototype.onCbChange = function(t) {
        t.target instanceof eui.CheckBox && this.showBoxEffect(t.target)
    }, e.prototype.prinitMsg = function(t, e, i) {
        void 0 === i && (i = 100);
        var n = e,
            r = n.length,
            o = 0;
        App.TimerManager.removeAll(t), App.TimerManager.add(i, function() {
            var e = n.substr(0, o + 1);
            t.text = e, o++, o >= r && App.TimerManager.removeAll(t)
        }, t)
    }, e.prototype.breathingTween = function(t) {
        t && egret.Tween.get(t, {
            loop: !0
        }).to({
            scaleX: 1.05,
            scaleY: 1.05
        }, 1e3).to({
            scaleX: 1,
            scaleY: 1
        }, 1e3)
    }, e.prototype.removeBreathingTween = function(t) {
        t && (egret.Tween.removeTweens(t), t.scaleX = t.scaleY = 1)
    }, e.prototype.jumpOutTween = function(t, e, i) {
        void 0 === e && (e = null), void 0 === i && (i = null), t && egret.Tween.get(t).to({
            scaleX: 1.05,
            scaleY: 1.05
        }, 200).to({
            scaleX: .95,
            scaleY: .95
        }, 200).to({
            scaleX: 1,
            scaleY: 1
        }, 200, egret.Ease.backOut).call(function() {
            e && e.apply(i)
        })
    }, e.prototype.jumpOutTween2 = function(t) {
        t && egret.Tween.get(t).to({
            scaleX: 1,
            scaleY: 1
        }, 350)
    }, e.prototype.removeJumpOutTween = function(t) {
        t && (egret.Tween.removeTweens(t), t.scaleX = t.scaleY = 1)
    }, e.prototype.moveUpAndDown = function(t, e) {
        void 0 === e && (e = 20), t && egret.Tween.get(t, {
            loop: !0
        }).to({
            verticalCenter: 20
        }, 1e3).to({
            verticalCenter: 0
        }, 1e3)
    }, e.prototype.moveUpAndDown2 = function(t, e) {
        void 0 === e && (e = 20), t && egret.Tween.get(t, {
            loop: !0
        }).to({
            y: t.y + e
        }, 1e3).to({
            y: t.y
        }, 1e3)
    }, e.prototype.removeMoveUpAndDown = function(t, e) {
        void 0 === e && (e = 0), t && (egret.Tween.removeTweens(t), t.y = e)
    }, e.prototype.scaleTween = function(t, e) {
        if (void 0 === e && (e = !0), t) {
            var i = this;
            t.visible = !0, egret.Tween.get(t).to({
                scaleX: 1,
                scaleY: 1
            }, 200).call(function() {
                egret.Tween.removeTweens(t), e && i.rotationTween(t)
            })
        }
    }, e.prototype.rotationTween = function(t) {
        t && egret.Tween.get(t, {
            loop: !0
        }).to({
            rotation: 360
        }, 6e3)
    }, e.prototype.removescaleRotaTween = function(t, e, i) {
        void 0 === e && (e = 1), void 0 === i && (i = 0), t && (egret.Tween.removeTweens(t), t.scaleX = t.scaleY = e, t.rotation = i)
    }, e.prototype.twinkleTween = function(t, e, i, n, r) {
        if (void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 1), void 0 === r && (r = 300), 0 == e) t && egret.Tween.get(t, {
            loop: !0
        }).to({
            alpha: i
        }, r).to({
            alpha: n
        }, r);
        else {
            var o = this;
            o._twinkleTweenFun = function() {
                return 0 == e ? (o._twinkleTweenFun = null, void(t && (egret.Tween.removeTweens(t), t.alpha = n))) : void(t && (e--, egret.Tween.get(t).to({
                    alpha: i
                }, r).to({
                    alpha: n
                }, r).call(o._twinkleTweenFun)))
            }, o._twinkleTweenFun && o._twinkleTweenFun()
        }
    }, e.prototype.removeTwinkleTween = function(t, e) {
        void 0 === e && (e = 1), t && (egret.Tween.removeTweens(t), t.alpha = e, this._twinkleTweenFun && (this._twinkleTweenFun = null))
    }, e.prototype.playBezier = function(t, e, i, n, r, o, a, s, h, l, c) {
        void 0 === c && (c = null);
        var p = ObjectPool.get(BezierTween);
        p.to(t, e, i, n, r, o, a, s, h, l, c)
    }, e.prototype.playListEff1 = function(t) {
        t.validateNow();
        for (var e = 0, i = t.numElements; i > e; e++) {
            var n = t.getElementAt(e);
            if (n.content) {
                var r = (n.content.x, 0);
                n.content.y = r + 160, egret.Tween.get(n.content).wait(50 * e).to({
                    y: r - 30
                }, 200).to({
                    y: r + 30
                }, 80).to({
                    y: r - 20
                }, 80).to({
                    y: r + 20
                }, 80).to({
                    y: r
                }, 80)
            }
        }
    }, e.prototype.playListEff2 = function(t, e, i) {
        void 0 === i && (i = 100), t.validateNow();
        for (var n = 0, r = t.numElements, o = e.viewport.contentHeight / 2, a = Math.ceil(o / 2); r > n; n++) {
            var s = t.getElementAt(n);
            if (!s) return;
            var h = s.content;
            if (h) {
                var l = (h.x, 0);
                h.y = l + o, egret.Tween.removeTweens(h), egret.Tween.get(h).wait(n * i).to({
                    y: 0 == n ? l : l - 30
                }, a).to({
                    y: l + 30
                }, 200).to({
                    y: l
                }, 200)
            }
        }
    }, e.prototype.playEffScaleList = function(t, e) {
        void 0 === e && (e = 0), t.validateNow();
        for (var i = 0, n = t.numElements; n > i; i++) {
            var r = t.getElementAt(i);
            if (!r) return;
            var o = r.content;
            o && (egret.Tween.removeTweens(o), egret.Tween.get(o).wait(100 + i * e).to({
                scaleX: 1.1,
                scaleY: 1.1
            }, 150).to({
                scaleX: .9,
                scaleY: .9
            }, 150).to({
                scaleX: 1,
                scaleY: 1
            }, 200, egret.Ease.backOut))
        }
    }, e.prototype.initList = function(t, e, i) {
        void 0 === i && (i = 0), t.validateNow();
        for (var n = 0, r = t.numElements; r > n; n++) {
            var o = t.getElementAt(n);
            if (!o) return;
            var a = o.content;
            if (a)
                for (var s = 0; s < e.length; s++) {
                    var h = e[s];
                    a[h] = i
                }
        }
    }, e.prototype.fishEff = function(t, e, i, n, r, o, a) {
        void 0 === o && (o = 0), void 0 === a && (a = 1);
        var s = new eui.Image("main_fishPao_png");
        s.scaleX = s.scaleY = n, s.x = e, s.y = i, s.blendMode = "add", s.alpha = 0, t.addChild(s);
        o || (egret.Tween.get(s).to({
            alpha: 1
        }, 130).wait(540).to({
            alpha: 0
        }, 330), egret.Tween.get(s).to({
            scaleX: r,
            scaleY: r,
            x: e + -29 * a
        }, 1e3).to(function() {
            egret.Tween.removeTweens(s), App.DisplayUtils.removeFromParent(s), s = null
        }))
    }, e.prototype.NumAutoPlusAnimation = function(t, e, i, n) {
        var r = Math.round(e / (t / 50) * 100) / 100,
            o = 0,
            a = 0,
            s = function() {
                o += r, o = Math.round(100 * o) / 100;
                var t = !1;
                o >= e && (App.TimerManager.remove(s, n), o = e, t = !0);
                var h = o;
                h == a && e || (a = h, i && i(o, t))
            };
        0 == e ? s() : App.TimerManager.add(50, s, n, 0)
    }, e
}(BaseClass);
__reflect(DisplayUtils.prototype, "DisplayUtils");
var FilterTextUtil = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.init = function() {
        this.uncompress(RES.getRes("fw_dat")), RES.destroyRes("fw_dat")
    }, e.prototype.uncompress = function(t) {
        var e, i = egret.getTimer(),
            n = new JSZip(t),
            r = new FilterMsg;
        n.file("role.xml") && (e = n.file("role.xml").asText(), r.createRegExpStr(e)), this.filterMsg = r, console.log("chat-----" + (egret.getTimer() - i))
    }, e.prototype.getFilterStr = function(t) {
        return GlobalVar.FILTERMSG ? this.filterMsg.getFilterStr(t) : t
    }, e.prototype.validate = function(t) {
        return GlobalVar.FILTERMSG ? this.filterMsg.validate(t) : !1
    }, e.dic = {}, e
}(BaseClass);
__reflect(FilterTextUtil.prototype, "FilterTextUtil");
var FilterMsg = function() {
    function t() {
        this._splitReg = /(\n|\r)+/gm, this._wordMap = {}
    }
    return t.prototype.createRegExpStr = function(t) {
        for (var e = t.split(this._splitReg), i = e.length, n = 0; i > n; n++) this.addWord(e[n])
    }, t.prototype.addWord = function(t) {
        if (t = t.replace("\n", ""), t && t.length > 0) {
            var e, i = t.charAt(0);
            e = this._wordMap[i], e ? this._wordMap[i] += "|" + t : this._wordMap[i] = t
        }
    }, t.prototype.getFilterStr = function(t) {
        if (!t) return "";
        t = t.replace(/^\s*|\s*$/, "");
        try {
            for (var e, i, n = t.length, r = 0; n > r; r++) e = t.charAt(r), "*" != e && (i = this._wordMap[e], "string" == typeof i && (i = this._wordMap[e] = new RegExp("(" + i + ")", "img")), t = t.replace(i, this.regHandler))
        } catch (o) {}
        return t
    }, t.prototype.validate = function(t) {
        try {
            t = t.replace(/\s/g, "");
            for (var e, i, n = t.length, r = 0; n > r; r++)
                if (e = t.charAt(r), i = this._wordMap[e]) {
                    "string" == typeof i && (i = i.replace(/\(/g, "（"), i = i.replace(/\)/g, "）"), i = this._wordMap[e] = new RegExp("(" + i + ")", "img"));
                    var o = i;
                    if (o.lastIndex = 0, o.test(t)) return !0
                }
        } catch (a) {
            return !0
        }
        return !1
    }, t.prototype.regHandler = function() {
        var t = arguments[1].toString();
        return t.replace(/.{1}/g, "*")
    }, t.prototype.setWordMap = function(t) {
        this._wordMap = t
    }, t.prototype.getWordMap = function() {
        return this._wordMap
    }, t
}();
__reflect(FilterMsg.prototype, "FilterMsg");
var FilterUtils = function() {
    function t() {}
    return Object.defineProperty(t, "DefaultGrayFilters", {
        get: function() {
            return null == this._DefaultGrayFilters && (this._DefaultGrayFilters = [new egret.ColorMatrixFilter([.3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0])]), this._DefaultGrayFilters
        },
        enumerable: !0,
        configurable: !0
    }), t.createColorFilter = function(t) {
        var e = new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]),
            i = e.matrix.concat();
        return i[4] = ((16711680 & t) >> 16) - 255, i[9] = ((65280 & t) >> 8) - 255, i[14] = (255 & t) - 255, e.matrix = i, e
    }, t.createColorFilter2 = function(t) {
        var e = new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]),
            i = e.matrix.concat();
        return i[4] = ((16711680 & t) >> 16) - 255, i[9] = ((65280 & t) >> 8) - 255, i[14] = (255 & t) - 255, e.matrix = i, e
    }, Object.defineProperty(t, "ThresholdFilters", {
        get: function() {
            return null == this._ThresholdFilters && (this._ThresholdFilters = new egret.ColorMatrixFilter([79.0016, 156.0064, 20.992, 0, -256, 79.0016, 156.0064, 20.992, 0, -256, 79.0016, 156.0064, 20.992, 0, -256, 0, 0, 0, 1, 0])), this._ThresholdFilters
        },
        enumerable: !0,
        configurable: !0
    }), t.BlackGlowFilter0 = new egret.GlowFilter(0, .6, 3, 3, 8), t.GreyFilters = new egret.ColorMatrixFilter([.3, .6, 0, 0, 0, .3, .6, 0, 0, 0, .3, .6, 0, 0, 0, 0, 0, 0, 1, 0]), t
}();
__reflect(FilterUtils.prototype, "FilterUtils");
var KeyboardUtils = function(t) {
    function e() {
        var e = t.call(this) || this;
        if (e.key_ups = new Array, e.key_downs = new Array, DeviceUtils.IsHtml5) {
            var i = e;
            document.addEventListener("keyup", function(t) {
                for (var e = 0, n = i.key_ups.length; n > e; e++) {
                    var r = i.key_ups[e][0],
                        o = i.key_ups[e][1];
                    o ? r.call(o, t.keyCode) : r(t.keyCode)
                }
            }), document.addEventListener("keydown", function(t) {
                for (var e = 0, n = i.key_downs.length; n > e; e++) {
                    var r = i.key_downs[e][0],
                        o = i.key_downs[e][1];
                    o ? r.call(o, t.keyCode) : r(t.keyCode)
                }
            })
        }
        return e
    }
    return __extends(e, t), e.ins = function() {
        return t.ins.call(this)
    }, e.prototype.addKeyUp = function(t, e) {
        this.key_ups.push([t, e])
    }, e.prototype.addKeyDown = function(t, e) {
        this.key_downs.push([t, e])
    }, e.prototype.removeKeyUp = function(t, e) {
        for (var i = 0; i < this.key_ups.length; i++) this.key_ups[i][0] == t && this.key_ups[i][1] == e && (this.key_ups.splice(i, 1), i--)
    }, e.prototype.removeKeyDown = function(t, e) {
        for (var i = 0; i < this.key_downs.length; i++) this.key_downs[i][0] == t && this.key_downs[i][1] == e && (this.key_downs.splice(i, 1), i--)
    }, e
}(BaseClass);
__reflect(KeyboardUtils.prototype, "KeyboardUtils");
var KeyCode = function() {
    function t() {}
    return t.KC_1 = 49, t.KC_2 = 50, t.KC_3 = 51, t.KC_4 = 52, t.KC_5 = 53, t.KC_6 = 54, t.KC_7 = 55, t.KC_8 = 56, t.KC_9 = 57, t.KC_0 = 48, t.KC_A = 65, t.KC_B = 66, t.KC_C = 67, t.KC_D = 68, t.KC_E = 69, t.KC_F = 70, t.KC_G = 71, t.KC_H = 72, t.KC_I = 73, t.KC_J = 74, t.KC_K = 75, t.KC_L = 76, t.KC_M = 77, t.KC_N = 78, t.KC_O = 79, t.KC_P = 80, t.KC_Q = 81, t.KC_R = 82, t.KC_S = 83, t.KC_T = 84, t.KC_U = 85, t.KC_V = 86, t.KC_W = 87, t.KC_X = 88, t.KC_Y = 89, t.KC_Z = 90, t.KC_F1 = 112, t.KC_F2 = 113, t.KC_F3 = 114, t.KC_F4 = 115, t.KC_F5 = 116, t.KC_F6 = 117, t.KC_F7 = 118, t.KC_F8 = 119, t.KC_F9 = 120, t.KC_F10 = 121, t.KC_F11 = 122, t.KC_F12 = 123, t.KC_F13 = 124, t.KC_F14 = 125, t.KC_F15 = 126, t.KC_NUMPAD_0 = 96, t.KC_NUMPAD_1 = 97, t.KC_NUMPAD_2 = 98, t.KC_NUMPAD_3 = 99, t.KC_NUMPAD_4 = 100, t.KC_NUMPAD_5 = 101, t.KC_NUMPAD_6 = 102, t.KC_NUMPAD_7 = 103, t.KC_NUMPAD_8 = 104, t.KC_NUMPAD_9 = 105, t.KC_NUMPAD_MULTIPLY = 106, t.KC_NUMPAD_ADD = 107, t.KC_NUMPAD_ENTER = 108, t.KC_NUMPAD_SUBTRACT = 109, t.KC_NUMPAD_DECIMAL = 110, t.KC_NUMPAD_DIVIDE = 111, t.KC_BACKSPACE = 8, t.KC_TAB = 9, t.KC_ENTER = 13, t.KC_SHIFT = 16, t.KC_CONTROL = 17, t.KC_ESCAPE = 27, t.KC_SPACE = 32, t.KC_WINDOWS = 91, t.KC_MENU = 93, t.KC_CAPS_LOCK = 20, t.KC_NUM_LOCK = 144, t.KC_SCROLL_LOCK = 145, t.KC_PAUSE = 19, t.KC_PAGE_UP = 33, t.KC_PAGE_DOWN = 34, t.KC_END = 35, t.KC_HOME = 36, t.KC_INSERT = 45, t.KC_DELETE = 46, t.KC_LEFT = 37, t.KC_UP = 38, t.KC_RIGHT = 39, t.KC_DOWN = 40, t.KC_SEMICOLON_COLON = 186, t.KC_EQUAL_PLUS = 187, t.KC_MINUS_UNDERLINE = 189, t.KC_SLASH_QUESTIONMARK = 191, t.KC_SPECIALCOMMA_EARTHWORM = 192, t.KC_LEFT_BRACKET_BRACE = 219, t.KC_BACKSLASH_VERTICALBAR = 220, t.KC_RIGHT_BRACKET_BRACE = 221, t.KC_QUOTE = 222, t.KC_COMMA = 188, t.KC_PERIOD = 190, t
}();
__reflect(KeyCode.prototype, "KeyCode");
var LocationProperty = function() {
    function t() {}
    return t.init = function() {
        if (this.urlParam = window.urlParam, !this.urlParam) {
            this.urlParam = {};
            var t = window.paraUrl || location.href;
            if (t) {
                var e = t.indexOf("?");
                if (-1 != e)
                    for (var i = t.slice(e + 1).split("&"), n = void 0, r = 0; r < i.length; r++) n = i[r].split("="), this.urlParam[n[0]] = n[1]
            }
        }
    }, Object.defineProperty(t, "resAdd", {
        get: function() {
            return this.urlParam.hosts || ""
        },
        set: function(t) {
            this.urlParam.hosts = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "user", {
        get: function() {
            return this.urlParam.user
        },
        set: function(t) {
            this.urlParam.user = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "srvid", {
        get: function() {
            return parseInt(this.urlParam.srvid || 0)
        },
        set: function(t) {
            this.urlParam.srvid = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "srvName", {
        get: function() {
            return this.urlParam.srvName
        },
        set: function(t) {
            this.urlParam.srvName = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "serverPort", {
        set: function(t) {
            this.urlParam.srvport = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "nativeType", {
        get: function() {
            return parseInt(this.urlParam["native"]) || 0
        },
        set: function(t) {
            this.urlParam["native"] = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "packType", {
        get: function() {
            return this.urlParam.pack || ""
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "serverUrl", {
        get: function() {
            return this.urlParam.serverUrl
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "splashAdClicked", {
        get: function() {
            return 1 == this.urlParam.splashAdClicked || "true" == this.urlParam.splashAdClicked
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "browserScheme", {
        get: function() {
            return 1 == this.urlParam.browserScheme || "true" == this.urlParam.browserScheme
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "tabHeight", {
        get: function() {
            return parseInt(this.urlParam.tab) || 0
        },
        set: function(t) {
            this.urlParam.tab = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "token", {
        get: function() {
            return this.urlParam.token
        },
        set: function(t) {
            this.urlParam.token = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "gameName", {
        get: function() {
            return this.urlParam.gameName || "小小军团"
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "packageName", {
        get: function() {
            return this.urlParam.packageName || "com.bc.byvip"
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "configSel", {
        get: function() {
            return this.urlParam.configSel || ""
        },
        set: function(t) {
            this.urlParam.configSel = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "channel", {
        get: function() {
            return this.urlParam.channel || ""
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "plat", {
        get: function() {
            return this.urlParam.plat || ""
        },
        enumerable: !0,
        configurable: !0
    }), t.setLoadProgress = function(t, e) {
        console.log(t, e, egret.getTimer()), App.MessageCenter.dispatch(MsgConst.ONLOADING, t, e)
    }, Object.defineProperty(t, "versionCode", {
        get: function() {
            return this.urlParam.versionCode || ""
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "versionName", {
        get: function() {
            return this.urlParam.versionName || "1.0.2"
        },
        enumerable: !0,
        configurable: !0
    }), t.enterGame = function() {
        this.isEnter || (this.isEnter = !0, window.showGame && window.showGame())
    }, t.isEnter = !1, t
}();
__reflect(LocationProperty.prototype, "LocationProperty");
var XY = function() {
    function t(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
    }
    return t
}();
__reflect(XY.prototype, "XY");
var MathUtils = function() {
    function t() {}
    return t.getAngle = function(t) {
        return 180 * t / Math.PI
    }, t.getRadian = function(t) {
        return t / 180 * Math.PI
    }, t.getRadian2 = function(t, e, i, n) {
        var r = i - t,
            o = n - e;
        return Math.atan2(o, r)
    }, t.getDistance = function(t, e, i, n) {
        var r = Math.abs(i - t),
            o = Math.abs(n - e);
        if (r > 20 || o > 20) {
            var a = Math.min(r, o);
            return Math.floor(r + o - (a >> 1) - (a >> 2) + (a >> 4))
        }
        var s = r * r + o * o;
        return Math.floor(Math.sqrt(s))
    }, t.getDistanceByObject = function(t, e) {
        return this.getDistance(t.x, t.y, e.x, e.y)
    }, t.getDistanceX2ByObject = function(t, e) {
        var i = t.x - e.x,
            n = t.y - e.y;
        return i * i + n * n
    }, t.getDirMove = function(t, e, i, n) {
        void 0 === i && (i = 0), void 0 === n && (n = 0);
        var r = this.getRadian(t),
            o = {
                x: 0,
                y: 0
            };
        return o.x = Math.cos(r) * e + i, o.y = Math.sin(r) * e + n, o
    }, t.getPByDistance = function(t, e, i) {
        var n = Math.atan2(e.y - t.y, e.x - t.x),
            r = new egret.Point;
        return r.x = e.x + i * Math.cos(n), r.y = e.y + i * Math.sin(n), r
    }, t.limit = function(t, e) {
        t = Math.min(t, e), e = Math.max(t, e);
        var i = e - t;
        return t + Math.random() * i
    }, t.whetherPrize = function(e) {
        var i = t.limitInteger(1, 1001);
        return e >= i ? !0 : !1
    }, t.limitInteger = function(t, e) {
        return Math.floor(this.limit(t, e))
    }, t.randomArray = function(t) {
        var e = Math.floor(Math.random() * t.length);
        return t[e]
    }, t.toInteger = function(t) {
        return t >> 0
    }, t.getGridTowardByDir = function(t, e, i, n) {
        void 0 === e && (e = 1), void 0 === i && (i = 0), void 0 === n && (n = 0);
        var r = {
            x: 0,
            y: 0
        };
        return 0 == t ? (r.x = i, r.y = n - e) : 1 == t ? (r.x = i + e, r.y = n - e) : 2 == t ? (r.x = i + e, r.y = n) : 3 == t ? (r.x = i + e, r.y = n + e) : 4 == t ? (r.x = i, r.y = n + e) : 5 == t ? (r.x = i - e, r.y = n + e) : 6 == t ? (r.x = i - e, r.y = n) : 7 == t && (r.x = i - e, r.y = n - e), r
    }, t.getDirByGridPoint = function(t, e, i, n) {
        return t == i ? n >= e ? DirType.DOWN : DirType.UP : e == n ? t > i ? DirType.LEFT : DirType.RIGHT : i > t ? e > n ? DirType.RIGHT_UP : DirType.RIGHT_DOWN : e > n ? DirType.LEFT_UP : DirType.LEFT_DOWN
    }, t.getRectangle = function(t, e, i, n, r, o) {
        void 0 === o && (o = Number.MAX_VALUE);
        var a = [];
        a.push(e);
        for (var s = i, h = e.x - t.x, l = e.y - t.y, c = Math.atan2(l, h), p = n / 2, u = 0, d = r; u < d.length; u++) {
            var f = d[u],
                g = f.x - t.x,
                _ = f.y - t.y,
                y = Math.abs(Math.atan2(_, g) - c),
                m = g * g + _ * _,
                v = Math.cos(y),
                T = Math.sin(y);
            if ((y <= Math.PI / 2 || y >= 3 * Math.PI / 2) && s * s >= v * v * m && p * p >= T * T * m && e != f && a.push(f), a.length >= o) break
        }
        return a
    }, t.getClosest = function(t, e, i) {
        void 0 === i && (i = 1);
        for (var n = [], r = "_tDis", o = e.length, a = 0; o > a; a++) {
            var s = this.getDistanceByObject(t, e[a]);
            e[a][r] = s, n.push(e[a])
        }
        return n.sort(function(t, e) {
            return Algorithm.sortAsc(t[r], e[r])
        }), n.length > i && (n.length = i), n
    }, t.fomatFloat = function(t, e) {
        return Math.floor(t * Math.pow(10, e)) / Math.pow(10, e)
    }, t.getAngelByXY = function(t, e, i, n) {
        return this.getAngle(this.getRadiansByXY(t, e, i, n))
    }, t.getRadiansByXY = function(t, e, i, n) {
        return Math.atan2(n - e, i - t)
    }, t.getPointMove = function(t, e, i) {
        var n = Math.sqrt(t * t + e * e),
            r = this.getAngle(this.getRadian(i) - this.getRadian2(0, 0, t, -e));
        return this.getDirMove(r, n)
    }, t.toInt = function(t) {
        var e = parseInt(t);
        return isNaN(e) ? 0 : e
    }, t.toFloat = function(t) {
        var e = parseFloat(t);
        return isNaN(e) ? 0 : e
    }, t.random = function(t, e) {
        return Math.round(Math.random() * (e - t)) + t
    }, t.randomArraySort = function(t) {
        var e = function(t, e) {
            return Math.random() > .5 ? -1 : 1
        };
        return t.sort(e), t
    }, t.hypot = function(t, e) {
        return Math.sqrt(Math.pow(t, 2) + Math.pow(e, 2))
    }, t.prototype.fortmatDecimals = function(t, e) {
        void 0 === e && (e = 2);
        var i = Math.pow(10, e);
        return Math.floor(t * i) / i
    }, t.changeBit = function(t, e, i) {
        var n = Math.pow(2, e - 1);
        return t & n ? i || (t -= n) : i && (t += n), t
    }, t.bezierPoint = function(t, e, i, n) {
        return new egret.Point(Math.pow(1 - n, 2) * t.x + 2 * n * (1 - n) * e.x + Math.pow(n, 2) * i.x, Math.pow(1 - n, 2) * t.y + 2 * n * (1 - n) * e.y + Math.pow(n, 2) * i.y)
    }, t.insertPoints = function(t, e, i) {
        for (var n = [], r = this.getDistance(t.x, t.y, e.x, e.y), o = this.getRadian2(t.x, t.y, e.x, e.y), a = i; r > a;) {
            var s = a * Math.sin(o),
                h = a * Math.cos(o);
            n.push(new egret.Point(t.x + h, t.y + s)), a += i
        }
        return n
    }, t.cutFloat = function(t, e) {
        var i = t.toString(),
            n = i.split(".");
        if (2 == n.length) {
            var r = n[1];
            for (r = r.substr(0, e); r.length;) {
                var o = r.charAt(r.length - 1);
                if ("0" != o) break;
                r = r.substr(0, r.length - 1)
            }
            i = n[0] + (r.length ? "." + r : "")
        }
        return i
    }, t.limitWeight = function(e, i) {
        void 0 === i && (i = 0);
        for (var n = 1, r = 0, o = e; r < o.length; r++) {
            var a = o[r];
            n += i ? a[0] : a[1]
        }
        for (var s = t.limitInteger(0, n), h = 0, l = 0, c = e; l < c.length; l++) {
            var a = c[l];
            if (h += i ? a[0] : a[1], h >= s) return i ? a[1] : a[0]
        }
        return null
    }, t.max = function(t) {
        return null == t ? 0 : Math.max.apply(Math, t)
    }, t
}();
__reflect(MathUtils.prototype, "MathUtils");
var md5 = function() {
    function t() {}
    return t.hex_md5 = function(t) {
        return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)))
    }, t.b64_md5 = function(t) {
        return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)))
    }, t.any_md5 = function(t, e) {
        return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)), e)
    }, t.hex_hmac_md5 = function(t, e) {
        return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)))
    }, t.b64_hmac_md5 = function(t, e) {
        return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)))
    }, t.any_hmac_md5 = function(t, e, i) {
        return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)), i)
    }, t.md5_vm_test = function() {
        return "900150983cd24fb0d6963f7d28e17f72" == this.hex_md5("abc").toLowerCase()
    }, t.rstr_md5 = function(t) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(t), 8 * t.length))
    }, t.rstr_hmac_md5 = function(t, e) {
        var i = this.rstr2binl(t);
        i.length > 16 && (i = this.binl_md5(i, 8 * t.length));
        for (var n = Array(16), r = Array(16), o = 0; 16 > o; o++) n[o] = 909522486 ^ i[o], r[o] = 1549556828 ^ i[o];
        var a = this.binl_md5(n.concat(this.rstr2binl(e)), 512 + 8 * e.length);
        return this.binl2rstr(this.binl_md5(r.concat(a), 640))
    }, t.rstr2hex = function(t) {
        try {
            this.hexcase
        } catch (e) {
            this.hexcase = 0
        }
        for (var i, n = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", r = "", o = 0; o < t.length; o++) i = t.charCodeAt(o), r += n.charAt(i >>> 4 & 15) + n.charAt(15 & i);
        return r
    }, t.rstr2b64 = function(t) {
        try {
            this.b64pad
        } catch (e) {
            this.b64pad = ""
        }
        for (var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = "", r = t.length, o = 0; r > o; o += 3)
            for (var a = t.charCodeAt(o) << 16 | (r > o + 1 ? t.charCodeAt(o + 1) << 8 : 0) | (r > o + 2 ? t.charCodeAt(o + 2) : 0), s = 0; 4 > s; s++) n += 8 * o + 6 * s > 8 * t.length ? this.b64pad : i.charAt(a >>> 6 * (3 - s) & 63);
        return n
    }, t.rstr2any = function(t, e) {
        var i, n, r, o, a, s = e.length,
            h = Array(Math.ceil(t.length / 2));
        for (i = 0; i < h.length; i++) h[i] = t.charCodeAt(2 * i) << 8 | t.charCodeAt(2 * i + 1);
        var l = Math.ceil(8 * t.length / (Math.log(e.length) / Math.log(2))),
            c = Array(l);
        for (n = 0; l > n; n++) {
            for (a = Array(), o = 0, i = 0; i < h.length; i++) o = (o << 16) + h[i], r = Math.floor(o / s), o -= r * s, (a.length > 0 || r > 0) && (a[a.length] = r);
            c[n] = o, h = a
        }
        var p = "";
        for (i = c.length - 1; i >= 0; i--) p += e.charAt(c[i]);
        return p
    }, t.str2rstr_utf8 = function(t) {
        for (var e, i, n = "", r = -1; ++r < t.length;) e = t.charCodeAt(r), i = r + 1 < t.length ? t.charCodeAt(r + 1) : 0, e >= 55296 && 56319 >= e && i >= 56320 && 57343 >= i && (e = 65536 + ((1023 & e) << 10) + (1023 & i), r++), 127 >= e ? n += String.fromCharCode(e) : 2047 >= e ? n += String.fromCharCode(192 | e >>> 6 & 31, 128 | 63 & e) : 65535 >= e ? n += String.fromCharCode(224 | e >>> 12 & 15, 128 | e >>> 6 & 63, 128 | 63 & e) : 2097151 >= e && (n += String.fromCharCode(240 | e >>> 18 & 7, 128 | e >>> 12 & 63, 128 | e >>> 6 & 63, 128 | 63 & e));
        return n
    }, t.str2rstr_utf16le = function(t) {
        for (var e = "", i = 0; i < t.length; i++) e += String.fromCharCode(255 & t.charCodeAt(i), t.charCodeAt(i) >>> 8 & 255);
        return e
    }, t.str2rstr_utf16be = function(t) {
        for (var e = "", i = 0; i < t.length; i++) e += String.fromCharCode(t.charCodeAt(i) >>> 8 & 255, 255 & t.charCodeAt(i));
        return e
    }, t.rstr2binl = function(t) {
        for (var e = Array(t.length >> 2), i = 0; i < e.length; i++) e[i] = 0;
        for (var i = 0; i < 8 * t.length; i += 8) e[i >> 5] |= (255 & t.charCodeAt(i / 8)) << i % 32;
        return e
    }, t.binl2rstr = function(t) {
        for (var e = "", i = 0; i < 32 * t.length; i += 8) e += String.fromCharCode(t[i >> 5] >>> i % 32 & 255);
        return e
    }, t.binl_md5 = function(t, e) {
        t[e >> 5] |= 128 << e % 32, t[(e + 64 >>> 9 << 4) + 14] = e;
        for (var i = 1732584193, n = -271733879, r = -1732584194, o = 271733878, a = 0; a < t.length; a += 16) {
            var s = i,
                h = n,
                l = r,
                c = o;
            i = this.md5_ff(i, n, r, o, t[a + 0], 7, -680876936), o = this.md5_ff(o, i, n, r, t[a + 1], 12, -389564586), r = this.md5_ff(r, o, i, n, t[a + 2], 17, 606105819), n = this.md5_ff(n, r, o, i, t[a + 3], 22, -1044525330), i = this.md5_ff(i, n, r, o, t[a + 4], 7, -176418897), o = this.md5_ff(o, i, n, r, t[a + 5], 12, 1200080426), r = this.md5_ff(r, o, i, n, t[a + 6], 17, -1473231341), n = this.md5_ff(n, r, o, i, t[a + 7], 22, -45705983), i = this.md5_ff(i, n, r, o, t[a + 8], 7, 1770035416), o = this.md5_ff(o, i, n, r, t[a + 9], 12, -1958414417), r = this.md5_ff(r, o, i, n, t[a + 10], 17, -42063), n = this.md5_ff(n, r, o, i, t[a + 11], 22, -1990404162), i = this.md5_ff(i, n, r, o, t[a + 12], 7, 1804603682), o = this.md5_ff(o, i, n, r, t[a + 13], 12, -40341101), r = this.md5_ff(r, o, i, n, t[a + 14], 17, -1502002290), n = this.md5_ff(n, r, o, i, t[a + 15], 22, 1236535329), i = this.md5_gg(i, n, r, o, t[a + 1], 5, -165796510), o = this.md5_gg(o, i, n, r, t[a + 6], 9, -1069501632), r = this.md5_gg(r, o, i, n, t[a + 11], 14, 643717713), n = this.md5_gg(n, r, o, i, t[a + 0], 20, -373897302), i = this.md5_gg(i, n, r, o, t[a + 5], 5, -701558691), o = this.md5_gg(o, i, n, r, t[a + 10], 9, 38016083), r = this.md5_gg(r, o, i, n, t[a + 15], 14, -660478335), n = this.md5_gg(n, r, o, i, t[a + 4], 20, -405537848), i = this.md5_gg(i, n, r, o, t[a + 9], 5, 568446438), o = this.md5_gg(o, i, n, r, t[a + 14], 9, -1019803690), r = this.md5_gg(r, o, i, n, t[a + 3], 14, -187363961), n = this.md5_gg(n, r, o, i, t[a + 8], 20, 1163531501), i = this.md5_gg(i, n, r, o, t[a + 13], 5, -1444681467), o = this.md5_gg(o, i, n, r, t[a + 2], 9, -51403784), r = this.md5_gg(r, o, i, n, t[a + 7], 14, 1735328473), n = this.md5_gg(n, r, o, i, t[a + 12], 20, -1926607734), i = this.md5_hh(i, n, r, o, t[a + 5], 4, -378558), o = this.md5_hh(o, i, n, r, t[a + 8], 11, -2022574463), r = this.md5_hh(r, o, i, n, t[a + 11], 16, 1839030562), n = this.md5_hh(n, r, o, i, t[a + 14], 23, -35309556), i = this.md5_hh(i, n, r, o, t[a + 1], 4, -1530992060), o = this.md5_hh(o, i, n, r, t[a + 4], 11, 1272893353), r = this.md5_hh(r, o, i, n, t[a + 7], 16, -155497632), n = this.md5_hh(n, r, o, i, t[a + 10], 23, -1094730640), i = this.md5_hh(i, n, r, o, t[a + 13], 4, 681279174), o = this.md5_hh(o, i, n, r, t[a + 0], 11, -358537222), r = this.md5_hh(r, o, i, n, t[a + 3], 16, -722521979), n = this.md5_hh(n, r, o, i, t[a + 6], 23, 76029189), i = this.md5_hh(i, n, r, o, t[a + 9], 4, -640364487), o = this.md5_hh(o, i, n, r, t[a + 12], 11, -421815835), r = this.md5_hh(r, o, i, n, t[a + 15], 16, 530742520), n = this.md5_hh(n, r, o, i, t[a + 2], 23, -995338651), i = this.md5_ii(i, n, r, o, t[a + 0], 6, -198630844), o = this.md5_ii(o, i, n, r, t[a + 7], 10, 1126891415), r = this.md5_ii(r, o, i, n, t[a + 14], 15, -1416354905), n = this.md5_ii(n, r, o, i, t[a + 5], 21, -57434055), i = this.md5_ii(i, n, r, o, t[a + 12], 6, 1700485571), o = this.md5_ii(o, i, n, r, t[a + 3], 10, -1894986606), r = this.md5_ii(r, o, i, n, t[a + 10], 15, -1051523), n = this.md5_ii(n, r, o, i, t[a + 1], 21, -2054922799), i = this.md5_ii(i, n, r, o, t[a + 8], 6, 1873313359), o = this.md5_ii(o, i, n, r, t[a + 15], 10, -30611744), r = this.md5_ii(r, o, i, n, t[a + 6], 15, -1560198380), n = this.md5_ii(n, r, o, i, t[a + 13], 21, 1309151649), i = this.md5_ii(i, n, r, o, t[a + 4], 6, -145523070), o = this.md5_ii(o, i, n, r, t[a + 11], 10, -1120210379), r = this.md5_ii(r, o, i, n, t[a + 2], 15, 718787259), n = this.md5_ii(n, r, o, i, t[a + 9], 21, -343485551), i = this.safe_add(i, s), n = this.safe_add(n, h), r = this.safe_add(r, l), o = this.safe_add(o, c)
        }
        return [i, n, r, o]
    }, t.md5_cmn = function(t, e, i, n, r, o) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(e, t), this.safe_add(n, o)), r), i)
    }, t.md5_ff = function(t, e, i, n, r, o, a) {
        return this.md5_cmn(e & i | ~e & n, t, e, r, o, a)
    }, t.md5_gg = function(t, e, i, n, r, o, a) {
        return this.md5_cmn(e & n | i & ~n, t, e, r, o, a)
    }, t.md5_hh = function(t, e, i, n, r, o, a) {
        return this.md5_cmn(e ^ i ^ n, t, e, r, o, a)
    }, t.md5_ii = function(t, e, i, n, r, o, a) {
        return this.md5_cmn(i ^ (e | ~n), t, e, r, o, a)
    }, t.safe_add = function(t, e) {
        var i = (65535 & t) + (65535 & e),
            n = (t >> 16) + (e >> 16) + (i >> 16);
        return n << 16 | 65535 & i
    }, t.bit_rol = function(t, e) {
        return t << e | t >>> 32 - e
    }, t.hexcase = 0, t.b64pad = "", t
}();
__reflect(md5.prototype, "md5");
var NumericUtils = function() {
    function t() {}
    return t.IntToHex = function(t) {
        return this.HexCharTable[(4026531840 & t) >> 28] + this.HexCharTable[(251658240 & t) >> 24] + this.HexCharTable[(15728640 & t) >> 20] + this.HexCharTable[(983040 & t) >> 16] + this.HexCharTable[(61440 & t) >> 12] + this.HexCharTable[(3840 & t) >> 8] + this.HexCharTable[(240 & t) >> 4] + this.HexCharTable[15 & t]
    }, t.HexToInt = function(t) {
        var e, i, n = 0;
        for (e = 0; 8 > e && !(e >= t.length); ++e)
            if (n <<= 4, i = t.charCodeAt(e), i >= 48 && 57 >= i) n |= i - 48;
            else if (i >= 65 && 70 >= i) n |= i - 65 + 10;
        else {
            if (!(i >= 97 && 102 >= i)) break;
            n |= i - 97 + 10
        }
        return n
    }, t.MakeLong64 = function(t, e) {
        return t + 4294967296 * e
    }, t.MakeLong = function(t, e) {
        return 65535 & t | e << 16 & 4294901760
    }, t.MakeWord = function(t, e) {
        return 255 & t | e << 8 & 65280
    }, t.LoWord = function(t) {
        return 65535 & t
    }, t.HiWord = function(t) {
        return t >> 16 & 65535
    }, t.LoByte = function(t) {
        return 255 & t
    }, t.HiByte = function(t) {
        return t >> 8 & 255
    }, t.PercentToFixed = function(t, e) {
        return e = 10 ^ e, t *= e, t = Math.floor(t) / e, t.toString()
    }, t.BitValue = function(t, e) {
        return t >> e & 1
    }, t.HexCharTable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"], t
}();
__reflect(NumericUtils.prototype, "NumericUtils");
var RegExpUtil = function() {
    function t() {}
    return t.LINE_BREAK = /\r+/g, t.BLANK_REG = /[\s\\]/g, t.ARGB_COLOR = /[a-fA-F0-9]{8}/, t.HTML = /<[^>]+>/g, t.DELETE_SPACE = /\s/g, t.NumericExp = /^\d+$/, t.NonNumericExp = /\D/, t.ActorNameExp = /^([\u4e00-\u9fa5]?\w?[^>|!@#$%&*\^\?]){1,48}$/, t
}();
__reflect(RegExpUtil.prototype, "RegExpUtil");
var ResourceUtils = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._groupIndex = 0, e._configs = new Array, e._groups = {}, e._urlResorce = {}, RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, e.onResourceLoadComplete, e), RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, e.onResourceLoadProgress, e), RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, e.onResourceLoadError, e), e
    }
    return __extends(e, t), e.ins = function() {
        return t.ins.call(this)
    }, e.prototype.addConfig = function(t, e) {
        this._configs.push([t, e])
    }, e.prototype.loadConfig = function(t, e) {
        this._onConfigComplete = t, this._onConfigCompleteTarget = e, this.loadNextConfig()
    }, e.prototype.loadNextConfig = function() {
        if (0 == this._configs.length) return this._onConfigComplete.call(this._onConfigCompleteTarget), this._onConfigComplete = null, void(this._onConfigCompleteTarget = null);
        var t = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this), RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigError, this), RES.loadConfig(t[0], t[1])
    }, e.prototype.onConfigError = function(t) {
        console.log("@@@" + LocationProperty.nativeType)
    }, e.prototype.onConfigCompleteHandle = function(t) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this), this.loadNextConfig()
    }, e.prototype.loadGroup = function(t, e, i, n) {
        this._groups[t] = [e, i, n], RES.loadGroup(t)
    }, e.prototype.loadGroups = function(t, e, i, n, r) {
        RES.createGroup(t, e, !0), this.loadGroup(t, i, n, r)
    }, e.prototype.pilfererLoadGroup = function(t, e) {
        void 0 === e && (e = null);
        var i = "pilferer_" + t;
        e || (e = [t]), RES.createGroup(i, e, !0), RES.loadGroup(i, -1)
    }, e.prototype.onResourceLoadComplete = function(t) {
        var e = t.groupName;
        if (this._groups[e]) {
            var i = this._groups[e][0],
                n = this._groups[e][2];
            null != i && i.call(n), this._groups[e] = null, delete this._groups[e]
        }
    }, e.prototype.onResourceLoadProgress = function(t) {
        var e = t.groupName;
        if (this._groups[e]) {
            var i = this._groups[e][1],
                n = this._groups[e][2];
            null != i && i.call(n, t.itemsLoaded, t.itemsTotal)
        }
    }, e.prototype.onResourceLoadError = function(t) {
        console.log(t.groupName + "资源组有资源加载失败"), this.onResourceLoadComplete(t)
    }, e.prototype.loadResource = function(t, e, i, n, r) {
        void 0 === t && (t = []), void 0 === e && (e = []), void 0 === i && (i = null), void 0 === n && (n = null), void 0 === r && (r = null);
        var o = t.concat(e),
            a = "loadGroup" + this._groupIndex++;
        RES.createGroup(a, o, !0), this._groups[a] = [i, n, r], RES.loadGroup(a)
    }, e.prototype.loadUrlResource = function(t, e, i, n) {
        var r = this;
        null == this._urlResorce[t] ? (this._urlResorce[t] = {
            data: null,
            compFun: i,
            thisObj: n
        }, RES.getResByUrl(t, function(e) {
            r._urlResorce[t].data = e, null != i && i.apply(r._urlResorce[t].thisObj)
        }, this, e)) : null != i && i.apply(n)
    }, e.prototype.getUrlResource = function(t) {
        return null == this._urlResorce[t] ? (console.log("资源未加载"), null) : this._urlResorce[t].data
    }, e
}(BaseClass);
__reflect(ResourceUtils.prototype, "ResourceUtils");
var StageUtils = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.touchTime = 0, e.imgPool = [], null == e._uiStage && (e._uiStage = new eui.UILayer, e._uiStage.touchEnabled = !1, e._uiStage.percentHeight = 100, e._uiStage.percentWidth = 100, e.getStage().addChild(e._uiStage)), e
    }
    return __extends(e, t), e.prototype.getHeight = function() {
        return this.stageHeight
    }, e.prototype.getWidth = function() {
        return this.stageWidth
    }, e.prototype.setTouchChildren = function(t) {
        this.getStage().touchChildren = t
    }, e.prototype.setMaxTouches = function(t) {
        this.getStage().maxTouches = t
    }, e.prototype.setFrameRate = function(t) {
        this.getStage().frameRate = t
    }, e.prototype.setScaleMode = function(t) {
        this.getStage().scaleMode = t
    }, e.prototype.setOrientation = function(t) {
        DeviceUtils.IsPC || (t ? this.getStage().orientation = t : this.getStage().orientation == egret.OrientationMode.LANDSCAPE ? (this.getStage().orientation = egret.OrientationMode.PORTRAIT, this.getStage().setContentSize(580, 930)) : (this.getStage().orientation = egret.OrientationMode.LANDSCAPE, this.getStage().setContentSize(930, 580)))
    }, e.prototype.getStage = function() {
        return egret.MainContext.instance.stage
    }, e.prototype.getUIStage = function() {
        return this._uiStage
    }, e.prototype.resize = function() {
        var t = this.getStage(),
            e = t.stageWidth,
            i = t.stageHeight;
        this.stageWidth = e, this.stageHeight = i
    }, e.prototype.init = function() {
        var t = this.getStage();
        LocationProperty.tabHeight;
        t.setContentSize(GlobalVar.GAME_WIDTH, GlobalVar.GAME_HEIGHT), t.scaleMode = egret.StageScaleMode.SHOW_ALL, this.stageWidth = t.stageWidth, this.stageHeight = t.stageHeight
    }, e.prototype.log = function(t) {
        this.logTx.text += t + " ## "
    }, e.prototype.addTouchEvent = function() {
        this.getStage().addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouch, this)
    }, e.prototype.onStageTouch = function(t) {
        this.showImgEff(t)
    }, e.prototype.showImgEff = function(t) {}, e.prototype.hideImgEff = function(t) {
        App.DisplayUtils.removeFromParent(t), t.alpha = 1, t.scaleX = t.scaleY = 1, this.imgPool.push(t)
    }, e.prototype.logCh = function(t) {
        for (var e = 0, i = t.numChildren; i > e; e++) {
            var n = t.getChildAt(e);
            n.__class__;
            n instanceof egret.DisplayObjectContainer && this.logCh(n)
        }
    }, e
}(BaseClass);
__reflect(StageUtils.prototype, "StageUtils");
var StringUtils = function() {
    function t() {}
    return t.trimSpace = function(t) {
        return t.replace(/^\s*(.*?)[\s\n]*$/g, "$1")
    }, t.getStringLength = function(t) {
        for (var e = t.split(""), i = 0, n = 0; n < e.length; n++) {
            var r = e[n];
            i += this.isChinese(r) ? 2 : 1
        }
        return i
    }, t.subChinese = function(e, i) {
        if (t.getStringLength(e) > i)
            for (var n = e.split(""), r = 0, o = "", a = 0; a < n.length; a++) {
                var s = n[a];
                if (r += this.isChinese(s) ? 2 : 1, r >= i) return o += "...";
                o += s
            }
        return e
    }, t.isChinese = function(t) {
        var e = /^[\u4E00-\u9FA5]+$/;
        return e.test(t) ? !0 : !1
    }, t.strByteLen = function(t) {
        for (var e = 0, i = t.length, n = 0; i > n; n++) e += t.charCodeAt(n) >= 127 ? 2 : 1;
        return e
    }, t.complementByChar = function(e, i, n, r) {
        void 0 === n && (n = " "), void 0 === r && (r = !0);
        var o = this.strByteLen(r ? e.replace(t.HTML, "") : e);
        return e + this.repeatStr(n, i - o)
    }, t.repeatStr = function(t, e) {
        for (var i = "", n = 0; e > n; n++) i += t;
        return i
    }, t.addColor = function(t, e) {
        var i;
        return "string" == typeof e ? i = String(e) : "number" == typeof e && (i = Number(e).toString(10)), '<font color="' + i + '">' + t + "</font>"
    }, t.addColor1 = function(t, e) {
        var i = new Object;
        return i.style = new Object, i.text = t, i.textColor = Number(e).toString(16), i
    }, t.replaceStr = function(t, e, i) {
        if (-1 == t.indexOf(e)) return t;
        var n = t.split(e);
        return n[0] + i + n[1]
    }, t.substitute = function(t) {
        for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        var n;
        if (null == t) return "";
        var r = e.length;
        1 == r && Array.isArray(e[0]) ? (n = e[0], r = n.length) : n = e;
        for (var o = 0; r > o;) t = t.replace(new RegExp("\\{" + o + "\\}", "g"), n[o]), o++;
        return t
    }, t.subArr = function(t) {
        for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        var n = this.substitute.apply(this, [t].concat(e)),
            r = n.split(",");
        return r
    }, t.strToObj = function(t) {
        for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        if (!t) return null;
        for (var n = 0; n < e.length; n++)
            for (var r in t) {
                var o = parseFloat(t[r]);
                if (o) {
                    t[r] = e[n];
                    break
                }
            }
        return t
    }, t.toolNumber = function(t) {
        if (t = t.toString(), -1 != t.indexOf("+") && (t = t.replace("+", "")), -1 != t.indexOf("E") || -1 != t.indexOf("e")) {
            var e, i = "",
                n = null,
                r = 0,
                o = [],
                a = "",
                s = t.toString();
            if ("-" == s[0] && (s = s.substr(1), a = "-"), -1 != s.indexOf("E") || -1 != s.indexOf("e")) {
                var h = new RegExp("^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$", "ig");
                if (n = h.exec(s), null != n && (i = n[2], e = n[5], n = null), !i && !e) return !1;
                if (r = -1 == i.indexOf(".") ? 0 : i.indexOf("."), i = i.replace(".", ""), o = i.split(""), parseFloat(e) >= 0) {
                    var l = i.substr(r);
                    e = parseFloat(e);
                    for (var c = 0; c <= e - l.length; c++) o.push("0");
                    e - l.length < 0 && o.splice(r + e, 0, ".")
                } else {
                    e = e.replace("-", ""), e = Number(e);
                    for (var c = 0; e - r > c; c++) o.unshift("0");
                    var p = e - r >= 0 ? 1 : -(e - r);
                    o.splice(p, 0, ".")
                }
            }
            return i = o.join(""), a + i
        }
        return t
    }, t.toEnUpper = function(t, e) {
        void 0 === e && (e = !1);
        var i = "",
            n = BigNumberCal.floor(t.toString());
        "-" == n.charAt(0) ? (i = "", n = n.substring(0)) : e && (i = "+");
        var r = n.length,
            o = Math.floor((r - 1) / 3);
        if (1 > o) return n;
        var a = this.NUM_EN[o - 1],
            s = 3 * o - 2,
            h = n.substr(0, n.length - s),
            l = n.substr(h.length - 2, 2),
            c = h.substr(0, h.length - 2) + "." + l;
        return i + c + a
    }, t.toCNUpper = function(t, e) {
        if (void 0 === e && (e = 0), 0 == t) return this.NUM_CN[e][0];
        var i = t.toString();
        if (i.length > 16) throw new Error("数字太大，无法处理！");
        var n = this.convertIntegerStr(i, e);
        return n
    }, t.convertIntegerStr = function(t, e) {
        void 0 === e && (e = 0);
        var i = Math.floor(t.length / 4),
            n = t.length % 4,
            r = [];
        n > 0 && r.push(this.convertThousand(t.substr(0, n), i, e));
        for (var o = 0; i > o; o++) {
            var a = n + 4 * o,
                s = t.substring(a, a + 4);
            r.push(this.convertThousand(s, i - o - 1, e))
        }
        return this.convertNodes(r, e)
    }, t.convertNodes = function(t, e) {
        void 0 === e && (e = 0);
        for (var i, n = "", r = 0; r < t.length; r++) {
            var o = t[r];
            (i && o.desc.length > 0 || o.beforeZero && o.desc.length > 0 && n.length > 0) && (n += this.NUM_CN[e][0]), n += o.desc, o.afterZero && r < t.length - 1 ? i = !0 : o.desc.length > 0 && (i = !1)
        }
        return n
    }, t.convertThousand = function(t, e, i) {
        void 0 === i && (i = 0);
        for (var n = new ThousandNode, r = t.length, o = 0; 4 - r > o; o++) t = "0" + t;
        var a = parseInt(t.charAt(0)),
            s = parseInt(t.charAt(1)),
            h = parseInt(t.charAt(2)),
            l = parseInt(t.charAt(3));
        return a + s + h + l == 0 ? n : (0 == a ? n.beforeZero = !0 : n.desc += this.NUM_CN[i][a] + this.UNITS[i][0], 0 == s && "" != n.desc && h + l > 0 ? n.desc += this.NUM_CN[i][0] : s > 0 && (n.desc += this.NUM_CN[i][s] + this.UNITS[i][1]), 0 == h && "" != n.desc && l > 0 ? n.desc += this.NUM_CN[i][0] : h > 0 && (h > 1 && (n.desc += this.NUM_CN[i][h]), n.desc += this.UNITS[i][2]), 0 == l ? n.afterZero = !0 : l > 0 && (n.desc += this.NUM_CN[i][l]), n.desc.length > 0 && (n.desc += this.LEVELS[i][e]), n)
    }, t.getUnitCount = function(t) {
        return Math.ceil(Math.log(t) / Math.LN10)
    }, t.encode = function(t) {
        return Base64.encode(t)
    }, t.decode = function(t) {
        return Base64.decode(t)
    }, t.getDayCN = function(t) {
        return "星期" + this.days[t]
    }, t.complementNumber = function(t, e, i) {
        void 0 === i && (i = "0"), t += "";
        var n = t.length;
        if (e > n)
            for (var r = 0; e - n > r; r++) t = i + t;
        return t
    }, t.HTML = /<[^>]+>/g, t.NUM_EN = ["k", "m", "b", "t", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"], t.NUM_CN = [
        ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "s"]
    ], t.UNITS = [
        ["千", "百", "十"],
        ["t", "h", "s"]
    ], t.LEVELS = [
        ["", "万", "亿", "兆"],
        ["", "w", "y", "z"]
    ], t.days = ["日", "一", "二", "三", "四", "五", "六"], t
}();
__reflect(StringUtils.prototype, "StringUtils");
var ThousandNode = function() {
    function t() {
        this.desc = ""
    }
    return t
}();
__reflect(ThousandNode.prototype, "ThousandNode");
var SysUtils = function() {
    function t() {}
    return t.copyToPasteBoard = function(t) {
        var e = document.createElement("input");
        e.value = t, document.body.appendChild(e), e.select(), e.setSelectionRange(0, e.value.length), document.execCommand("Copy"), document.body.removeChild(e)
    }, t
}();
__reflect(SysUtils.prototype, "SysUtils");
var TextFlowUtils = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this
    }
    return __extends(e, t), e.generateTextFlow = function(t) {
        if ("" == t || null == t || void 0 == t) return null;
        if (-1 != t.indexOf("/font") || -1 != t.indexOf("/FONT")) return this.generateHTML(t);
        t = t.replace(/\\/g, "\n"), t = t.replace(/</g, "///<"), t = t.replace(/>/g, "///");
        for (var e = t.split("///"), i = [], n = 0, r = e.length; r > n; n++) "" != e[n] && ("<" == e[n].charAt(0) ? i.push(this.getSingleTextFlow(e[n].substr(1))) : i.push({
            text: e[n],
            style: {}
        }));
        return i
    }, e.parseHTML = function(t) {
        return e._par || (e._par = new egret.HtmlTextParser), e._par.parser(t)
    }, e.getSingleTextFlow = function(t) {
        for (var e, i = {
                style: {}
            }, n = t.match(/\((.+?)\)/g) || [], r = 0, o = n.length; o > r; r++) {
            var a = n[r].replace(/[\(\)]/g, "");
            switch (e = a.charAt(0).toLocaleUpperCase()) {
                case this.STYLE_COLOR:
                    var s = a.slice(1);
                    s.length > 8 && (s = "0x" + a.slice(s.length - 5)), i.style.textColor = parseInt(s);
                    break;
                case this.STYLE_SIZE:
                    i.style.size = parseInt(a.slice(1));
                    break;
                case this.STYLE_UNDERLINE:
                    i.style.underline = !0;
                    break;
                case this.STYLE_BOLD:
                    i.style.bold = !0;
                    break;
                case this.STYLE_ITALIC:
                    i.style.italic = !0;
                    break;
                case this.STYLE_EVENT:
                    i.style.href = "event:" + a.slice(1);
                    break;
                case this.STYLE_IMG:
                    a = a.slice(1);
                    var h = a.split("_");
                    i.style.img = h;
                    break;
                default:
                    continue
            }
        }
        return i.text = t.replace(/\((.+?)\)/g, ""), i
    }, e.generateHTML = function(t) {
        for (var e = ["FONT", "COLOR", "SIZE", "<B>", "</B>", "<U>", "</U>"], i = 0, n = e.length; n > i; i++) {
            var r = RegExp("" + e[i], "g");
            t = t.replace(r, e[i].toLocaleLowerCase())
        }
        return (new egret.HtmlTextParser).parser(t)
    }, e.color = function(t, e) {
        return '<font color="' + e + '">' + t + "</font>"
    }, e.textBanWord = function(t) {
        return t = t.replace(/<\([cibeCIBE]/g, "*")
    }, e.hrefType = function(t) {
        for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        if (t) {
            t = t.trim();
            var n = t.split(":");
            n[1] ? n[1].split("&") : [];
            switch (n[0]) {
                case "win":
            }
        }
    }, e.generateEmoji = function(t, e, i) {
        void 0 === i && (i = !1), t.textHeight;
        for (var n = t.linesArr, r = t.picArr || [], o = 0, a = 0 + t.y, s = 0, h = 0; h < n.length; h++) {
            for (var l = n[h], c = 0 + t.x, p = 0; p < l.elements.length; p++) {
                var u = l.elements[p];
                if (u.style.img && u.text) {
                    var d = u.style.img,
                        f = t.picArr && t.picArr[s],
                        g = u.style.size ? u.style.size : t.size;
                    f ? (f.scaleX = f.scaleY = 1, f.height = f.width = 0 / 0) : (f = ObjectPool.get(eui.Image), f.name = "emoji", r.push(f), e.addChild(f)), f.source = StringUtils.substitute(GlobalVar.EMOJI_TYPE[d[0]], d[1]);
                    var _ = RES.getRes(f.source);
                    _ ? (f.height = parseInt(d[2]) || g, f.width = parseInt(d[3]) || g) : (f.height = parseInt(d[2]) || g, f.width = parseInt(d[3]) || g), f.touchEnabled = !1, f.x = c, f.y = o * t.lineSpacing + a + l.height - g, s++
                }
                c += u.width
            }
            a += l.height, o++
        }
        for (var y = r.length - s > 0 ? r.splice(s, r.length - s) : [], h = 0; h < y.length; h++) {
            var m = y[h];
            m.source = null, m.scaleX = m.scaleY = 1, m.name = "", m.x = m.y = 0, ObjectPool.push(m), e.removeChild(m), m = null
        }
        r && (t.picArr = r)
    }, e.toChineseNum = function(t, e) {
        void 0 === e && (e = 0);
        var i = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
            n = ["", "十", "百", "千", "万"];
        1 == e && (i = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], n = ["", "s", "b", "q", "w"]), t = parseInt(t);
        var r = function(t) {
                for (var e = t.toString().split("").reverse(), r = "", o = 0; o < e.length; o++) r = (0 == o && 0 == e[o] ? "" : o > 0 && 0 == e[o] && 0 == e[o - 1] ? "" : i[e[o]] + (0 == e[o] ? n[0] : n[o])) + r;
                return r
            },
            o = Math.floor(t / 1e4),
            a = t % 1e4;
        return a.toString().length < 4 && (a = "0" + a), o ? r(o) + n[4] + r(a) : r(t)
    }, e.STYLE_COLOR = "C", e.STYLE_SIZE = "S", e.STYLE_ITALIC = "I", e.STYLE_BOLD = "B", e.STYLE_UNDERLINE = "U", e.STYLE_EVENT = "E", e.STYLE_IMG = "P", e
}(BaseClass);
__reflect(TextFlowUtils.prototype, "TextFlowUtils");
var TextImage = function(t) {
    function e(e) {
        void 0 === e && (e = []);
        var i = t.call(this) || this;
        return i._TextImageData = e, i._size = 26, i._verticalAlign = egret.VerticalAlign.MIDDLE, i._lineSpacing = 0, i.lineHeightArray = [], i.components = [], i._textColor = 1846852, i.invalidate_Flag = !1, i.init(), i
    }
    return __extends(e, t), Object.defineProperty(e.prototype, "TextImageData", {
        get: function() {
            return this._TextImageData
        },
        set: function(t) {
            this._TextImageData = t, this.init()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "size", {
        get: function() {
            return this._size
        },
        set: function(t) {
            this._size = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "width", {
        get: function() {
            return this._width
        },
        set: function(t) {
            this._width = t, this.invalidate()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "verticalAlign", {
        get: function() {
            return this._verticalAlign
        },
        set: function(t) {
            this._verticalAlign = t, this.invalidate()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "maxWidth", {
        get: function() {
            return this._maxWidth
        },
        set: function(t) {
            this._maxWidth = t, this.templet.width > t && (this.width = t, this.invalidate())
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "lineSpacing", {
        get: function() {
            return this._lineSpacing
        },
        set: function(t) {
            this._lineSpacing !== t && (this._lineSpacing = t, this.invalidate())
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.validateNow = function() {
        this.init(), this.invalidate_Flag = !1
    }, e.prototype.init = function() {
        var t = this;
        if (this.removeChildren(), 0 == this._TextImageData.length) return void(this.width = this.height = 0);
        this.components = [], this._TextImageData.forEach(function(e) {
            "object" == typeof e && (t.components.push(e), e.watch || (egret.is(e, "eui.Component") && e.once(eui.UIEvent.COMPLETE, t.invalidate, t), eui.Watcher.watch(e, ["width"], t.invalidate, t), eui.Watcher.watch(e, ["height"], t.invalidate, t), e.watch = !0))
        });
        var e = this._TextImageData.map(function(t) {
                return "string" == typeof t || egret.is(t, "eui.Label") ? {
                    text: egret.is(t, "eui.Label") ? t.text : t
                } : {
                    text: "樂",
                    style: {
                        size: t.width
                    }
                }
            }),
            i = this.templet = new egret.TextField;
        i.size = this.size, i.lineSpacing = 0, i.width = this.width, i.textFlow = e, i.height = i.height, this.height = 0, this.lineHeightArray = [];
        var n = 0,
            r = 0;
        i.linesArr.forEach(function(e, i) {
            var o = t.size;
            e.elements.forEach(function(e) {
                if ("樂" == e.text) {
                    var i = t.components[n++];
                    o = Math.max(o, i.height)
                }
            }), o = t._lineSpacing + o, t.lineHeightArray.push(o);
            var a = 0;
            e.elements.forEach(function(e) {
                var i;
                "樂" !== e.text ? (i = new egret.TextField, i.x = a, i.size = t.size, i.text = e.text, i.width = e.width, i.textColor = t._textColor, i.height = o, i.y = t.height, i.verticalAlign = t._verticalAlign) : (i = t.components[r++], i.x = a, i.y = t.height + (o - i.height) / 2 - 2), a = a + 5 + i.width, t.addChild(i)
            }), t.height += o
        }), this._width = this.templet.width
    }, Object.defineProperty(e.prototype, "textColor", {
        get: function() {
            return this._textColor
        },
        set: function(t) {
            this._textColor = t, this.invalidate()
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.invalidate = function(t) {
        var e = this;
        this.invalidate_Flag || (this.invalidate_Flag = !0, this.once(egret.Event.ENTER_FRAME, function() {
            e.init(), e.invalidate_Flag = !1
        }, this))
    }, e
}(eui.Group);
__reflect(TextImage.prototype, "TextImage");
var uint64 = function() {
    function t(t) {
        this._lowUint = 0, this._highUint = 0, this.value = t
    }
    return t.prototype.isEqual = function(t) {
        return t ? this._lowUint == t._lowUint && this._highUint == t._highUint : !1
    }, t.prototype.isGreaterThan = function(e) {
        if (e instanceof t) return this._highUint > e._highUint || this._highUint == e._highUint && this._lowUint > e._lowUint;
        var i = new t;
        return "string" == typeof e ? (i.value = e, this.isGreaterThanOrEqual(i)) : "number" == typeof e ? (i.value = e.toString(), this.isGreaterThanOrEqual(i)) : void 0
    }, t.prototype.isGreaterThanOrEqual = function(e) {
        if (e instanceof t) return this._highUint > e._highUint || this._highUint == e._highUint && this._lowUint >= e._lowUint;
        var i = new t;
        return "string" == typeof e ? (i.value = e, this.isGreaterThanOrEqual(i)) : "number" == typeof e ? (i.value = e.toString(), this.isGreaterThanOrEqual(i)) : void 0
    }, Object.defineProperty(t.prototype, "isZero", {
        get: function() {
            return 0 == this._lowUint && 0 == this._highUint
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "isGreaterThanZero", {
        get: function() {
            return this._lowUint > 0 || this._highUint > 0
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.writeByte = function(t) {
        t.writeUnsignedInt(this._lowUint), t.writeUnsignedInt(this._highUint)
    }, t.prototype.setValue = function(t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), this._lowUint = t, this._highUint = e
    }, Object.defineProperty(t.prototype, "value", {
        set: function(e) {
            e instanceof egret.ByteArray ? (this._lowUint = e.readUnsignedInt(), this._highUint = e.readUnsignedInt()) : "string" == typeof e && t.stringToUint64(e, 10, this)
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "valueByString", {
        set: function(t) {},
        enumerable: !0,
        configurable: !0
    }), t.prototype.leftMove = function(e, i) {
        void 0 === i && (i = null), i = i || this;
        var n = t.LeftMoveMask[e],
            r = n & this._lowUint;
        r >>>= 32 - e, i._lowUint = this._lowUint << e, i._highUint = this._highUint << e, i._highUint = i._highUint | r
    }, t.prototype.add = function(e, i) {
        void 0 === i && (i = null), i = i || this;
        var n = this._lowUint + e._lowUint;
        i._highUint = this._highUint + e._highUint, n >= t.MaxLowUint ? (i._highUint++, i._lowUint = n - t.MaxLowUint) : i._lowUint = n
    }, t.prototype.subtraction = function(e, i) {
        void 0 === i && (i = null), i = i || this;
        var n = this._lowUint - e._lowUint;
        i._highUint = this._highUint - e._highUint, 0 > n ? (i._highUint--, i._lowUint = n + t.MaxLowUint) : i._lowUint = n
    }, t.prototype.scale = function(e, i) {
        void 0 === i && (i = null), i = i || this;
        var n = this._lowUint * e;
        i._highUint = this._highUint * e, i._highUint += Math.floor(Math.abs(n / t.MaxLowUint)), i._lowUint = n % t.MaxLowUint
    }, t.prototype.toNumber = function() {
        return this._highUint * t.MaxLowUint + this._lowUint
    }, t.prototype.toString = function(e) {
        void 0 === e && (e = 10);
        for (var i, n, r, o = "", a = this._lowUint, s = this._highUint; 0 != s || 0 != a;) i = s % e, r = i * t.MaxLowUint + a, n = r % e, o = n + o, s = (s - i) / e, a = (r - n) / e;
        return o.length ? o : "0"
    }, t.stringToUint64 = function(e, i, n) {
        void 0 === i && (i = 10), void 0 === n && (n = null), n = n || new t;
        for (var r, o, a = 0, s = 0, h = e.length, l = 0; h > l; l++) o = parseInt(e.charAt(l)), r = a * i + o, s = s * i + Math.floor(r / t.MaxLowUint), a = r % t.MaxLowUint;
        return n.setValue(a, s), n
    }, t.readBytes = function(e) {
        var i = e.readUnsignedInt(),
            n = e.readUnsignedInt();
        return n * t.MaxLowUint + i
    }, t.LeftMoveMask = [0, 2147483648, 1073741824, 536870912, 268435456, 134217728, 67108864, 33554432, 16777216, 8388608, 4194304, 2097152, 1048576, 524288, 262144, 131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1], t.MaxLowUint = 4294967296, t
}();
__reflect(uint64.prototype, "uint64");
var UseCondition = function() {
    function t() {
        this.type = 0, this.id = 101, this.count = 1
    }
    return t
}();
__reflect(UseCondition.prototype, "UseCondition");
var WatcherUtil = function() {
    function t() {}
    return t.removeFromArrayCollection = function(e) {
        if (e && e.source && e.source.length)
            for (var i = 0, n = e.source; i < n.length; i++) {
                var r = n[i];
                t.removeFromObject(r)
            }
    }, t.removeFromObject = function(t) {
        if (t instanceof egret.EventDispatcher) {
            var e = t.$getEventMap(),
                i = e[eui.PropertyEvent.PROPERTY_CHANGE];
            if (i)
                for (var n = i.length - 1; n >= 0; n--) {
                    var r = i[n];
                    r.thisObject instanceof eui.Watcher && (r.thisObject.unwatch(), i.splice(n, 1))
                }
        } else {
            var o = t.__listeners__;
            if (o && o.length)
                for (var a = 0; a < o.length; a += 2) {
                    var s = o[a + 1];
                    s instanceof eui.Watcher && (s.unwatch(), a -= 2)
                }
        }
    }, t
}();
__reflect(WatcherUtil.prototype, "WatcherUtil");
var Main = function(t) {
    function e() {
        var e = this;
        return eui.Label.default_fontFamily = "Microsoft YaHei", egret.TextField.default_fontFamily = "Microsoft YaHei", e = t.call(this) || this, e.addEventListener(egret.Event.ADDED_TO_STAGE, e.onAddToStage, e), e
    }
    return __extends(e, t), e.prototype.onAddToStage = function(t) {
        console.log("发布版", egret.Capabilities.runtimeType, egret.Capabilities.renderMode), console.log("version", GlobalVar.version), RES.setMaxLoadingThread(6), RES.setMaxRetryTimes(1), this.stage.maxTouches = 3, this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this), this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this), this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter), this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter), egret.ImageLoader.crossOrigin = "anonymous", LocationProperty.init(), RuntimeMgr.init(), App.SDKManager.init(), EUIResourceManager.ins().init(), GameName.init(), this.login(), HttpDebugWin.addDTxt("CDN：" + LocationProperty.resAdd), HttpDebugWin.addDTxt("包名：" + LocationProperty.packageName)
    }, e.prototype.login = function() {
        return __awaiter(this, void 0, void 0, function() {
            var t;
            return __generator(this, function(e) {
                return this.loginSuccess(t), [2]
            })
        })
    }, e.prototype.loginSuccess = function(t) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(t) {
                return OperatorEgret.init(), EUIResourceManager.ins().init(), App.StageUtils.init(), LayerManager.init(), App.SoundManager.init(0, 1, 0, 1), LogWin.push("游戏初始化：" + egret.getTimer()), this.loadDefaultRes(), GameCache.init(), [2]
            })
        })
    }, e.prototype.loadDefaultRes = function() {
        LogWin.push("开始加载default.res.json：" + egret.getTimer()), LocationProperty.setLoadProgress(4, "(加载资源配置)"), ResourceUtils.ins().addConfig("/resource/default.res.json?cc=" + GlobalVar.version, "resource/"), ResourceUtils.ins().loadConfig(this.onConfigComplete, this)
    }, e.prototype.onConfigComplete = function() {
        LogWin.push("加载default.res.json完毕：" + egret.getTimer()), ModuleManager.initView(), LocationProperty.setLoadProgress(8, "(加载资源版本号)"), this.loadThem()
    }, e.prototype.loadResVersionComplate = function() {
        LogWin.push("加载resVersion.json完毕：" + egret.getTimer()), RuntimeMgr.hotRes() ? (LocationProperty.setLoadProgress(12, "(加载资源版本号2)"), LogWin.push("开始加载package.json：" + egret.getTimer()), ResVersionManager.ins().loadConfig2("package" + LocationProperty.packType + ".json", this.loadThem, this)) : this.loadThem()
    }, e.prototype.loadThem = function() {
        LoadingMgr.ins().init(), LogWin.push("开始加载default.thm.json：" + egret.getTimer()), LocationProperty.setLoadProgress(15, "(加载游戏主题文件)");
        var t = new eui.Theme("/resource/default.thm.json", this.stage);
        t.once(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this)
    }, e.prototype.onThemeLoadComplete = function() {
        LogWin.push("加载default.thm.json完毕：" + egret.getTimer()), console.log("加载成功"), GameCache.sysTips.init(), LoadingMgr.ins().start(), App.StageUtils.addTouchEvent()
    }, e.prototype.onResize = function(t) {
        App.StageUtils.resize(), App.MessageCenter.dispatch(MsgConst.RESIZE_STAGE)
    }, e
}(egret.DisplayObjectContainer);
__reflect(Main.prototype, "Main");
var App = function() {
    function t() {}
    return Object.defineProperty(t, "stage", {
        get: function() {
            return t.StageUtils.getStage()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "StageUtils", {
        get: function() {
            return StageUtils.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "Http", {
        get: function() {
            return HttpManager.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "TimerManager", {
        get: function() {
            return TimerManager.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "ViewManager", {
        get: function() {
            return ViewManager.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "MessageCenter", {
        get: function() {
            return MessageCenter.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "RedPointManager", {
        get: function() {
            return RedPointManager.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "GuideFingerManger", {
        get: function() {
            return GuideFingerManger.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "DBAvatarManager", {
        get: function() {
            return DBAvatarManager.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "SDKManager", {
        get: function() {
            return SDKManager.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "DisplayUtils", {
        get: function() {
            return DisplayUtils.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "UIEffect", {
        get: function() {
            return UIEffect.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "DateUtils", {
        get: function() {
            return DateUtils.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "FrameHandler", {
        get: function() {
            return FrameHandler.ins()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "SoundManager", {
        get: function() {
            return SoundManager.getIns()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "FilterTextUtil", {
        get: function() {
            return FilterTextUtil.ins()
        },
        enumerable: !0,
        configurable: !0
    }), t.isJSON = function(t) {
        try {
            var e = JSON.parse(t);
            return "object" == typeof e && e ? !0 : !1
        } catch (i) {
            return !1
        }
    }, t
}();
__reflect(App.prototype, "App");
var GameName = function() {
    function t() {}
    return t.init = function() {}, t.type = 0, t.shuiguo = 0, t.quanmin = 1, t.naoDongDual = 2, t.naoDongTalent = 3, t
}();
__reflect(GameName.prototype, "GameName");
var RuntimeMgr = function() {
    function t() {}
    return t.init = function() {
        egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME && (LocationProperty.nativeType = this.TYPE_WX), egret.Capabilities.runtimeType == egret.RuntimeType.QQGAME && (LocationProperty.nativeType = this.TYPE_QQGAME)
    }, t.hide = function() {
        t.hotRes() ? App.SDKManager.call(SDKMsgConst.HIDELOGO, {}) : window.hideLogo && window.hideLogo()
    }, t.hotRes = function() {
        return LocationProperty.nativeType == t.TYPE_ANDROID || LocationProperty.nativeType == t.TYPE_IOS
    }, t.TYPE_DEFAUL = 0, t.TYPE_ANDROID = 1, t.TYPE_IOS = 2, t.TYPE_WX = 3, t.TYPE_QQGAME = 4, t
}();
__reflect(RuntimeMgr.prototype, "RuntimeMgr");
var FrameHandler = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._handler = [], e
    }
    return __extends(e, t), e.prototype.add = function(t, e, i) {
        for (var n = [], r = 3; r < arguments.length; r++) n[r - 3] = arguments[r];
        if (i)
            for (var o = 0, a = this._handler.length; a > o; o++)
                if (this._handler[o].method == t && this._handler[o].caller == e) return void(this._handler[o].args = n);
        var s = Handler.create(e, t, n);
        this._handler.push(s)
    }, e.prototype.remove = function(t, e) {
        for (var i = 0, n = this._handler, r = n.length; r > i; i++) {
            var o = n[i];
            if (o.method == t && o.caller == e) {
                o.dispose(), n.splice(i, 1);
                break
            }
        }
    }, e.prototype.has = function(t, e) {
        for (var i = 0, n = this._handler, r = n.length; r > i; i++) {
            var o = n[i];
            if (o.method == t && o.caller == e) return !0
        }
        return !1
    }, e.prototype.onFrame = function() {
        var t = this._handler.shift();
        t && t.run()
    }, e
}(BaseClass);
__reflect(FrameHandler.prototype, "FrameHandler");
var MessageCenter = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._dic = {}, e.changeDic = {}, e._targetDic = {}, e._type = 1, e._msgVo = [], e._msgPool = [], 0 == e._type && egret.startTick(e.onRun, e), e
    }
    return __extends(e, t), e.prototype.addListener = function(t, e, i, n) {
        void 0 === n && (n = !1);
        var r = this._dic[t];
        null == r && (r = [], this._dic[t] = r);
        var o = i && i.hashCode;
        if (o) {
            var a = this._targetDic[o];
            null == a && (a = [], this._targetDic[o] = a), a.push(t)
        }
        var s = Handler.create(i, e, null, n);
        r.push(s)
    }, e.prototype.removeListener = function(t, e) {
        var i = this._dic[t];
        if (i) {
            var n = 0;
            for (i.length; n != i.length;) {
                var r = i[n];
                r.caller === e || null == r.caller ? (i.splice(n, 1), r.dispose()) : n++
            }
            0 == i.length && delete this._dic[t]
        }
    }, e.prototype.removeAll = function(t) {
        var e = t && t.hashCode;
        if (e) {
            var i = this._targetDic[e];
            if (i) {
                for (var n = 0, r = i; n < r.length; n++) {
                    var o = r[n];
                    this.removeListener(o, t)
                }
                delete this._targetDic[e]
            }
        } else
            for (var a in this._dic) this.removeListener(a, t)
    }, e.prototype.dispatch = function(t) {
        for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        0 == this._type ? this._msgVo.push(this.getMessageVo(t, e)) : this.doMsg(t, e)
    }, e.prototype.doMsg = function(t, e) {
        var i = this._dic[t];
        if (i && i.length)
            for (var n = i.length - 1, r = void 0; n >= 0; n--) r = i[n], r ? (null == e ? r.run() : (r.args = e, r.run(), r.args = null), r.once && i.splice(n, 1)) : i.splice(n, 1);
        this.changeDic[t] = t
    }, e.prototype.onRun = function() {
        for (var t = App.TimerManager.getSyncTime(), e = this._msgVo; e.length > 0;) {
            var i = e.shift();
            this.doMsg(i.type, i.param), this._msgPool.push(i);
            var n = egret.getTimer() - t;
            if (n > 5) break
        }
        return !0
    }, e.prototype.getMessageVo = function(t, e) {
        var i = this._msgPool.pop();
        return i || (i = new MessageVo), i.type = t, i.param = e, i
    }, e.prototype.getMsgList = function() {
        return this._dic
    }, e
}(BaseClass);
__reflect(MessageCenter.prototype, "MessageCenter");
var MessageVo = function() {
    function t() {}
    return t.prototype.dispose = function() {
        this.type = null, this.param = null
    }, t
}();
__reflect(MessageVo.prototype, "MessageVo");
var ObjectPool = function() {
    function t() {}
    return t.get = function(e) {
        for (var i = [], n = 1; n < arguments.length; n++) i[n - 1] = arguments[n];
        var r = egret.getQualifiedClassName(e);
        null == t.PoolObj[r] && (t.PoolObj[r] = []);
        var o = t.PoolObj[r].pop();
        if (o) return (o instanceof eui.Image || o instanceof egret.Bitmap) && (o.x = o.y = 0, o.scaleX = o.scaleY = 1, o.width = o.height = 0 / 0, o.alpha = 1, o.visible = !0, o instanceof eui.Image && (o.top = o.bottom = o.left = o.right = 0 / 0)), o;
        if (0 == t.PoolObj[r].length) switch (i.length) {
            case 1:
                return new e(i[0]);
            case 2:
                return new e(i[0], i[1]);
            case 3:
                return new e(i[0], i[1], i[2]);
            case 4:
                return new e(i[0], i[1], i[2], i[3]);
            case 5:
                return new e(i[0], i[1], i[2], i[3], i[4]);
            default:
                return new e
        }
    }, t.push = function(e) {
        var i = e.__class__;
        return t.PoolObj[i] ? t.PoolObj[i].indexOf(e) > -1 ? !1 : (t.PoolObj[i].length >= t.max || t.PoolObj[i].push(e), !0) : void 0
    }, t.max = 100, t.PoolObj = {}, t
}();
__reflect(ObjectPool.prototype, "ObjectPool");
var BaseWinBg = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this), this.setNameImg = this._titleName, this.hideBtn = this._hide
    }, Object.defineProperty(e.prototype, "hideBtn", {
        set: function(t) {
            this._hide = t, this.closeBtn && void 0 != this._hide && (this.closeBtn.visible = t)
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "setNameImg", {
        set: function(t) {
            this._titleName = t, this.winTitle && t && (this.winTitle.source = t)
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "setBg", {
        set: function(t) {
            this._bgName = t, this.bg && this._bgName && (this.bg.source = t)
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.setNameImgHold = function(t) {
        t && (this.winTitle.source = t)
    }, e.prototype.setHelpBtn = function(t) {}, e.prototype.delayShow = function() {
        this.recordId && (this.setHelpBtn(this.recordId), this.recordId = 0)
    }, e.prototype.remove = function() {}, e.prototype.dispose = function() {
        this.disposeChildren(this)
    }, e.prototype.disposeChildren = function(t) {
        if (t.numChildren)
            for (var e, i = t.numChildren; i;) i--, e = t.removeChildAt(0), e instanceof eui.Image && e.texture && (e.source = null), e.stop && e.stop(), e.dispose && e.dispose(), this.disposeChildren(e)
    }, e
}(eui.Component);
__reflect(BaseWinBg.prototype, "BaseWinBg", ["eui.UIComponent", "egret.DisplayObject"]);
var CommonPage = function(t) {
    function e(e) {
        void 0 === e && (e = null);
        var i = t.call(this, e) || this;
        return i.oldIndex = -1, i.viewDic = {}, i.redlist = [], i.skinName = "CommunalPagePannelSkin", i
    }
    return __extends(e, t), e.prototype.showArrowSt = function() {
        this.tabBtn.validateNow(), this.tabBtn.numElements > 4 ? this.tabBtn.scrollH <= 0 ? (this.rArr.source = "public_json.public_arrow_2_png", this.lArr.source = "public_json.public_arrow_3_png") : this.tabBtn.scrollH >= this.scl.viewport.contentWidth - this.scl.width ? (this.lArr.source = "public_json.public_arrow_2_png", this.rArr.source = "public_json.public_arrow_3_png") : (this.lArr.source = "public_json.public_arrow_2_png", this.rArr.source = "public_json.public_arrow_2_png") : (this.lArr.source = null, this.rArr.source = null), this.showArrowRed()
    }, e.prototype.showArrowRed = function() {
        var t = !1,
            e = !1;
        if (this.tabBtn.numElements > 4) {
            var i = this.tabBtn.getChildAt(0) ? this.tabBtn.getChildAt(0).width : 1,
                n = this.tabBtn.scrollH >= 0 ? this.tabBtn.scrollH : 0,
                r = this.scl.viewport.contentWidth - this.scl.width - this.tabBtn.scrollH - i / 2;
            r = r >= 0 ? r : 0;
            for (var o = Math.ceil(n / i), a = Math.ceil(r / i), s = 0; s < this.redlist.length; s++) o > s && o && !t && this.redlist[s - 1] && (t = !0), s >= this.redlist.length - a && a && !e && this.redlist[s] && (e = !0)
        }
        this.lRed.visible = t, this.rRed.visible = e
    }, e.prototype.scrollEnd = function() {
        for (var t = 0; t < this.redlist.length; t++)
            if (4 > t) {
                if (this.redlist[t]) break
            } else this.redlist[t] && this.tabBtn.contentWidth >= this.scl.width && (this.tabBtn.scrollH = this.scl.viewport.contentWidth - this.scl.width)
    }, e.prototype.close = function() {
        for (var e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
        t.prototype.close.call(this), this.curView && this.curView.close()
    }, e
}(BaseSpriteView);
__reflect(CommonPage.prototype, "CommonPage");
var CommunalPageWin = function(t) {
    function e(e) {
        void 0 === e && (e = null);
        var i = t.call(this, e) || this;
        return i.oldIndex = -1, i.viewCl = [], i.viewDic = {}, i.winModuleData = [], i.listIcon = [], i.listPanel = [], i.tabIdx = [], i.bFirst = !1, i.skinName = "CommunalPageWinSkin", i
    }
    return __extends(e, t), e.prototype.open = function(e) {
        void 0 === e && (e = null), t.prototype.open.call(this)
    }, e.prototype.setTabBar = function() {
        this.setViewData(this.listIcon, this.listPanel)
    }, e.prototype.openView = function(e) {
        this.isInit && (this.addEvent(egret.TouchEvent.CHANGE, this.tabBtn, this.onTabChange), this.addEvent(egret.Event.CHANGING, this.tabBtn, this.onTabEvent), this.viewProp = e, this.viewProp || (this.viewProp = new ViewProp), this.setTabBar(), this.tabBtn.visible = this.viewCl && this.viewCl.length > 1, this.onTabChange()), t.prototype.openView.call(this, e)
    }, e.prototype.close = function(t) {
        this.curView && this.curView.close(t)
    }, e.prototype.onTabEvent = function(t) {
        var e = t.target;
        this.winModuleData[e.selectedIndex]
    }, e.prototype.onTabChange = function(t) {
        var e = this.tabBtn.selectedIndex;
        this.oldIndex != e && (this.curView && (this.curView.close(), this.curView.visible = !1), this.oldIndex = e);
        var i = this.getView(e);
        if (i) {
            i.parentKey = this.viewKey, i.indexCt = e;
            try {
                t ? i.open() : i.open(this.viewProp), i.roleSelect && i.roleSelect.open()
            } catch (n) {
                console.log(n)
            }
            i.visible = !0, this.curView = i
        }
    }, e.prototype.setViewData = function(t, e) {
        t.length && (this.tabBtn.dataProvider = new eui.ArrayCollection(t), this.tabBtn.validateNow()), e.length && (this.viewCl = e)
    }, e.prototype.getView = function(t) {
        var e = this.tabIdx[t],
            i = this.viewDic[e],
            n = this.viewCl[t];
        if (n) {
            if (i && i.name != n && (i.visible = !1, i = this.viewContent.getChildByName(n), i && (i.pannelModuleData = this.winModuleData[t], this.viewDic[e] = i)), !i) {
                if ("string" == typeof n && (n = window[n]), !n) {
                    "类名 " + this.viewCl[t] + " 无对应 ,请检查modControl配置";
                    return
                }
                i = new n, i && n.name && (i.name = n.name), i.pannelModuleData = this.winModuleData[t], this.viewDic[e] = i, this.viewContent.addChild(i)
            }
            return i
        }
        "类名 " + this.__class__ + " 无对应无法获取下标 " + t + " ,请检查modControl配置"
    }, e
}(BaseEuiWindow);
__reflect(CommunalPageWin.prototype, "CommunalPageWin");
var BaseBtnEffComponent = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this), this.init(), this.iconEff = this._effName, this.iconSour = this._imgSour, this.iconImg.visible = !1, this.icon = this._iconName, this._effQuan || (this._effQuan = App.DisplayUtils.addDBToObj(this.effG, "Bubble", 0), this.effG.setChildIndex(this._effQuan, 0), this._effQuan.verticalCenter = 80, this._effQuan.horizontalCenter = 50), this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onbtn, this), this.addEventListener(egret.TouchEvent.TOUCH_END, this.onbtn, this), this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onbtn, this), this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtn, this), this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onbtn, this)
    }, e.prototype.init = function() {}, Object.defineProperty(e.prototype, "effTime", {
        set: function(t) {
            this._effTime = JSON.parse(t), this._effDb && (this._effDb.play(1), this._effDb.setInterval(this._effTime))
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "iconSour", {
        set: function(t) {
            this._imgSour = t, t && this.imgRes && (this.imgRes.source = t)
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "isPlay2", {
        set: function(t) {
            this._isPlay = t
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "iconEff", {
        set: function(t) {
            var e = this;
            this._effName = t, t && !this._effDb && this.effG && (this._isPlay ? this._effDb = App.DisplayUtils.addDBToObj(this.effG, t, 1, 0, 0, "animation2", this, function() {
                e._effDb.play(0)
            }) : this._effDb = App.DisplayUtils.addDBToObj(this.effG, t, 0, 0, 0, "animation"), this._effDb.autoDispose = !1, this._effTime && (this._effDb.setInterval(this._effTime), this._effDb.play(1)), this._effDb.verticalCenter = 75, this._effDb.horizontalCenter = 45, this.effG.setChildIndex(this._effDb, 0))
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "icon", {
        set: function(t) {
            this._iconName = t, this._iconName && this.iconImg && (this.iconImg.visible = !0, this.iconImg.source = t)
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "numStr", {
        set: function(t) {
            this.numMc.value = t
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.playIcon = function(t, e) {
        void 0 === t && (t = 1), void 0 === e && (e = "animation2"), this._effDb && this._effDb.play(t, e)
    }, e.prototype.onbtn = function(t) {
        "touchBegin" == t.type ? (this.currentState = "down", App.SoundManager.playEffect(SoundType.BUTTONCLICK)) : "touchMove" == t.type ? this.currentState = "down" : this.currentState = "up"
    }, e.prototype.dispose = function() {
        this._effDb && (this._effDb.dispose(), this._effDb = null), this._effQuan && (this._effQuan.dispose(), this._effQuan = null), this._effName = null, this._imgSour = null
    }, e
}(eui.Component);
__reflect(BaseBtnEffComponent.prototype, "BaseBtnEffComponent");
var OperatorEgret = function() {
    function t() {}
    return t.init = function() {
        this.lifecycle(), this.res_loadByVersion(), this.eui_Image_source(), this.eui_getClassNameOfNode(), this.eui_List_rendererRemoved(), this.egretNodeAddChild(), this.egretEuiButton(), console.warn = function(t) {
            for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i]
        }, window.onerror = function(t, e, i, n, r) {
            GlobalFun.postError(t, e, i, n, r)
        }
    }, t.lifecycle = function() {
        DeviceUtils.IsPC || (egret.lifecycle.addLifecycleListener(function(t) {
            document.addEventListener("qbrowserVisibilityChange", function(e) {
                try {
                    e.hidden ? t.pause() : (t.resume(), GameCache.ad.alertRest())
                } catch (e) {}
            })
        }), egret.lifecycle.onPause = function() {
            App.SoundManager.stopMusic()
        }, egret.lifecycle.onResume = function() {
            App.SoundManager.playResume(), GameCache.ad.alertRest()
        })
    }, t.eui_Image_source = function() {
        var t = Object.getOwnPropertyDescriptor(eui.Image.prototype, "source");
        Object.defineProperty(eui.Image.prototype, "source", {
            set: function(e) {
                '""' != e && (this.source && "string" == typeof this.source && this.source != e && (this.texture = null), t.set.call(this, e))
            }
        })
    }, t.eui_rect_touchEnabled = function() {}, t.res_loadByVersion = function() {}, t.transferUrl = function(t) {
        return t.indexOf("config.data") >= 0 && GameName.type == GameName.quanmin && (t = t.replace("config.data", "config1.data")), t
    }, t.eui_List_rendererRemoved = function() {
        var t = eui.List.prototype.rendererRemoved;
        eui.List.prototype.rendererRemoved = function(e, i, n) {
            e.dispose && e.dispose(), t.call(this, e, i, n)
        }
    }, t.egretNodeAddChild = function() {
        var t = egret.DisplayObjectContainer.prototype.addChildAt;
        egret.DisplayObjectContainer.prototype.addChildAt = function(e, i) {
            return e.hashCode ? t.call(this, e, i) : null
        }
    }, t.egretEuiButton = function() {
        var t = eui.Button.prototype.onTouchBegin;
        eui.Button.prototype.onTouchBegin = function(e) {
            0 != e.target.effMusic && App.SoundManager.playEffect(e.target.effMusic ? e.target.effMusic : SoundType.BUTTONCLICK), t.call(this, e)
        };
        var e = Box2D.Common.Math.b2Vec2.prototype.SetZero;
        Box2D.Common.Math.b2Vec2.prototype.SetZero = function() {
            this.lock || e.call(this)
        }
    }, t.eui_getClassNameOfNode = function() {}, t.urlList = [], t
}();
__reflect(OperatorEgret.prototype, "OperatorEgret");
var ItemExpendN = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.label = "消耗：", e.numColor_0 = 41727, e.numColor_1 = 16711680, e._single = !1, e._item = 0, e._needNum = 0, e._packType = 0, e._haveNum = 0, e._dataItem = null, e.bOpenChangeWin = !1, e.bShowBangZuan = !1, e.bShowEn = !1, e.borrowZuan = !0, e.numCut = !1, e.bLabelWhite = !1, e.skinName = "ItemExpendSkin", e
    }
    return __extends(e, t), e.prototype.partAdded = function(e, i) {
        t.prototype.partAdded.call(this, e, i)
    }, e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this), this.gainWay.textFlow = TextFlowUtils.parseHTML("<(u)" + this.gainWay.text + ">")
    }, e.prototype.$onAddToStage = function(e, i) {
        t.prototype.$onAddToStage.call(this, e, i), this.gainWay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this), this.iconImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this)
    }, e.prototype.onTouch = function() {
        this._item
    }, e.prototype.openTips = function() {
        this.bShowBangZuan && (this.bShowEn || GlobalFun.gotoCharge())
    }, e.prototype.$onRemoveFromStage = function() {
        t.prototype.$onRemoveFromStage.call(this), this.gainWay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this), this.iconImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this), App.MessageCenter.removeAll(this)
    }, e.prototype.dispose = function() {
        this.iconImg && (this.iconImg.source = null), this._costObj = null, this.bOpenChangeWin = !1, this._bindComponent = null
    }, e
}(eui.Component);
__reflect(ItemExpendN.prototype, "ItemExpendN", ["eui.UIComponent", "egret.DisplayObject"]);
var NumberMC = function(t) {
    function e(e, i, n) {
        void 0 === e && (e = 0), void 0 === i && (i = "0"), void 0 === n && (n = 0);
        var r = t.call(this) || this;
        return r.roll = !1, r._value = 0, r._type = "0", r._init = !1, r._gap = 0, r._alignV = "top", r._alignH = "left", r._tilt = 0, r._spacing = 0, r._value = e, r._type = i + "", r._gap = n, r.touchChildren = !1, r
    }
    return __extends(e, t), e.prototype.updateType = function(t) {
        this._type = t
    }, e.pool = function(t, i) {
        return void 0 === t && (t = 0), void 0 === i && (i = 0), ObjectPool.get(e, t, i)
    }, e.prototype.partAdded = function(e, i) {
        t.prototype.partAdded.call(this, e, i)
    }, e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this), this._init = !0, this.upNumber()
    }, Object.defineProperty(e.prototype, "value", {
        get: function() {
            return this.rolling ? this._rollValue : this._value
        },
        set: function(t) {
            this._value !== t && (this._value = null == t ? "" : t, this.rolling = !1, this.upNumber())
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "type", {
        get: function() {
            return this._type
        },
        set: function(t) {
            this._type != t && (this._type = t, this.upNumber())
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "gap", {
        get: function() {
            return this._gap
        },
        set: function(t) {
            this._gap != t && (this._gap = t, this.upNumber())
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "spacing", {
        get: function() {
            return this._spacing
        },
        set: function(t) {
            this._spacing != t && (this._spacing = t, this.upNumber())
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.initMask = function() {}, Object.defineProperty(e.prototype, "alignV", {
        set: function(t) {
            this._alignV !== t && (this._alignV = t, this.upAlign())
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "alignH", {
        set: function(t) {
            this._alignH !== t && (this._alignH = t, this.upAlign())
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.upAlign = function() {
        switch (this._alignH) {
            case "center":
                this.anchorOffsetX = this.width / 2;
                break;
            case "left":
                this.anchorOffsetX = 0;
                break;
            case "right":
                this.anchorOffsetX = this.width;
                break;
            default:
                this.anchorOffsetX = 0
        }
        switch (this._alignV) {
            case "mid":
                this.anchorOffsetY = this.height / 2;
                break;
            case "top":
                this.anchorOffsetY = 0;
                break;
            case "bottom":
                this.anchorOffsetY = this.height;
                break;
            default:
                this.anchorOffsetY = 0
        }
    }, e.prototype.upNumber = function() {
        if (this._init && "0" != this._type) {
            for (var t, e = this._value + "", i = 0, n = this.numChildren, r = e.length, o = 0, a = 0, s = 0; r > o; o++) {
                n > o ? t = this.getChildAt(o) : (t = ObjectPool.get(eui.Image), this.addChild(t)), t.source = this.getSingleNumPic(e.charAt(o), this._type), t.x = i, t.y = this._tilt * o;
                var h = this._gap;
                if (!h) {
                    var l = RES.getRes(t.source);
                    l && (h = l.textureWidth, a = h, s = l.textureHeight)
                }
                i = i + h + this._spacing
            }
            for (; n > r;) {
                var c = this.removeChildAt(o);
                c.source = null, GlobalFun.pushImg(c), r++
            }
            t && (this.width = t.x + (a ? a : this.gap), s && (this.height = s), this.upAlign(), this.playRoll())
        }
    }, e.prototype.playRoll = function() {
        this.roll && !this.rolling && (this.rolling = !0, this._rollValue = this._value, this._value = 0, this.initMask(), egret.Tween.removeTweens(this), egret.Tween.get(this).to({
            rollValue: this._rollValue
        }, 1e3).call(this.tweenComp, this))
    }, Object.defineProperty(e.prototype, "rollValue", {
        get: function() {
            return this._value
        },
        set: function(t) {
            this._value != t && (this._value = Math.floor(t), this.upNumber())
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.tweenComp = function() {
        this.rolling = !1, this.rollHand && this.rollHand.run()
    }, e.prototype.getSingleNumPic = function(t, e) {
        switch (t) {
            case ".":
                t = "dot";
                break;
            case "?":
                t = "mark";
                break;
            case "+":
                t = "plus";
                break;
            case "%":
                t = "p";
                break;
            case "/":
                t = "Slash";
                break;
            case "-":
                t = "line";
                break;
            case "=":
                t = "yue";
                break;
            case "(":
            case "（":
                t = "l";
                break;
            case ")":
            case "）":
                t = "r";
                break;
            case ":":
            case "：":
                t = "colon"
        }
        return "." == t ? t = "dot" : "?" == t && (t = "q"), "num_json." + e + t + "_png"
    }, e.prototype.removeAll = function() {
        for (var t = this.numChildren; t;) {
            t--;
            var e = this.removeChildAt(t);
            e.source = null, ObjectPool.push(e)
        }
    }, e.prototype.dispose = function() {
        this.removeAll(), this.anchorOffsetX = this.anchorOffsetY = 0, this.scaleX = this.scaleY = 1, this.horizontalCenter = this.verticalCenter = 0 / 0, this.blendMode = null, this._value = null, this._type = null
    }, Object.defineProperty(e.prototype, "cnValue", {
        set: function(t) {
            if (this._cnValue != t) {
                if (this._cnValue = t, this.rolling = !1, 10 > t && (this._value = t), t >= 10 && 20 > t) {
                    var e = t % 10 == 0 ? "" : t % 10;
                    this._value = "X" + e
                }
                if (t >= 20) {
                    var e = t % 10 == 0 ? "" : t % 10;
                    this._value = Math.floor(t / 10) + "X" + e
                }
                this.upNumber()
            }
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "tilt", {
        get: function() {
            return this._tilt
        },
        set: function(t) {
            this._tilt = t, this.upNumber()
        },
        enumerable: !0,
        configurable: !0
    }), e
}(eui.Component);
__reflect(NumberMC.prototype, "NumberMC");
var TailEffect = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.setItem = function(t, e, i, n) {
        void 0 === n && (n = 100), this.parent = t, this.target = e, this.eff = i, t.addChild(e), App.TimerManager.add(n, this.onTimer, this)
    }, e.prototype.flyTo = function(t, e, i, n, r, o, a) {
        void 0 === o && (o = 0), void 0 === a && (a = 0), o || a ? (this._factor = 0, this.startX = t, this.startY = e, this.endX = i, this.endY = n, this.topX = o, this.topY = a, egret.Tween.get(this).to({
            factor: 1
        }, r).call(this.moveEnd, this)) : egret.Tween.get(this.target).to({
            x: i,
            y: n
        }, r)
    }, e.prototype.setHandle = function(t) {
        t && (this._compFun = t)
    }, Object.defineProperty(e.prototype, "factor", {
        get: function() {
            return this._factor
        },
        set: function(t) {
            this._factor = t;
            var e = 1 - t,
                i = e * e,
                n = t * e * 2,
                r = t * t;
            this.target.x = i * this.startX + n * this.topX + r * this.endX, this.target.y = i * this.startY + n * this.topY + r * this.endY
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.onTimer = function() {
        var t = App.DisplayUtils.addEffectToObj(this.parent, this.eff, 1);
        t.x = this.target.x, t.y = this.target.y
    }, e.prototype.moveEnd = function() {
        this._compFun && this._compFun.run(), this.dispose()
    }, e.prototype.dispose = function() {
        this._compFun && (this._compFun.dispose(), this._compFun = null), App.TimerManager.removeAll(this)
    }, e
}(egret.HashObject);
__reflect(TailEffect.prototype, "TailEffect");
var UIEffect = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.play = function(t, e, i, n, r) {
        void 0 === r && (r = 1), i || n || (i = e.width >> 1, n = e.height >> 1);
        var o = App.DisplayUtils.addEffectToObj(e, t, r, i, n);
        return o
    }, e.ACTSUCS = "actSucs_0_1", e.UPGRADE = "upgrade_0_1", e.STAR = "star_0_1", e.POTENSUCS = "potenSucs_0_1", e.CRIT = "crit_0_1", e.LUCKYCRIT = "luckyCrit_0_1", e.LIGHT = "light_0_1", e.ZKHEL_ENTRY = "3_perfect_0_1", e.ZKHEL_EFF = "zakumHelmetEff_0_1", e.EXP_EFF = "exp_0_1", e.NICE_EFF = "4_nice_0_1", e.ACT_ICON = "actIcon_0_1", e.COMPOSE_SUC = "compSucs_0_1", e.STAR_EFF = "star_0_1", e.DAILY_ACTOPEN = "huodongkaiqi_0_1", e.SOUL_PROGRESS = "zhuhun_0_1", e.SKILL_UPGRADE = "jinengshengji_0_1", e.CONSUME_REPLACE = "replace_0_1", e.UP_SUC = "up_suc", e.STAR_BOOM = "star_boom", e.LIGHT_POINT = "light_point", e.RED_BAG_BTN = "redBag_chai_0_1", e
}(BaseClass);
__reflect(UIEffect.prototype, "UIEffect");
var ChannelType = function() {
    function t() {}
    return t.ZHIBO = "", t
}();
__reflect(ChannelType.prototype, "ChannelType");
var DataCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.needPost = !1, e.openList = [], e.waitList = {}, e.clientData = {}, e.clientData2 = {}, e.serverData = {}, e.oldData = {}, e
    }
    return __extends(e, t), e.prototype.init = function() {
        this.readList(DataId.BEGIN, DataId.length1), this.readList(DataId.typeObject + 1, DataId.length2), this.readList(DataId.typeClient + 1, DataId.length3);
        var t = this.getId(DataId.ACCOUNT);
        t || (this.initNewCount(), this.saveId(DataId.ACCOUNT, {
            uid: "111"
        }, !1)), this.readList(DataId.typeClient + 1, DataId.length3), this.login(), App.MessageCenter.addListener(MsgConst.WIN_CLOSE, this.onCloseBack, this)
    }, e.prototype.login = function() {
        GameCache.main.init(), GameCache.wechatShare.init(), GameCache.fruit.init(), GameCache.ad.init(), GameCache.server.isInit = !0, App.SoundManager.setMusicOn(this.getId(DataId.MUSIC_BG) || 0), App.SoundManager.setEffectOn(this.getId(DataId.MUSIC_EFF) || 0)
    }, e.prototype.initOpenView = function() {
        this.onCloseBack(null)
    }, e.prototype.onCloseBack = function(t) {
        if (t == this.curView) {
            var e = this.openList.shift();
            e && (this.curView = e.view, App.ViewManager.open(e.view, e.pro))
        }
    }, e.prototype.isNewDay = function(t, e) {
        var i = new Date;
        i.setTime(1e3 * t);
        var n = new Date;
        return n.setTime(1e3 * e), !(i.getFullYear() == n.getFullYear() && i.getMonth() == n.getMonth() && i.getDate() == n.getDate())
    }, e.prototype.clearData = function() {
        for (var t in this.clientData) egret.localStorage.removeItem(GlobalVar.key4 + t);
        for (var t in this.clientData2) egret.localStorage.removeItem(GlobalVar.key4 + t);
        this.clientData = {}, this.clientData2 = {}
    }, e.prototype.initNewCount = function() {}, e.prototype.saveId = function(t, e, i, n) {
        void 0 === i && (i = !0), void 0 === n && (n = !0), t < DataId.length2 ? (n && (this.clientData[t] = e), this.waitList[t] = 1, App.FrameHandler.add(this.onSave, this, !0), this.needPost = !0) : t < DataId.length3 ? (n && (this.clientData2[t] = e), this.waitList[t] = 1, App.FrameHandler.add(this.onSave, this, !0)) : this.serverData[t] = e, i && App.MessageCenter.dispatch(MsgConst.DATA + t)
    }, e.prototype.getId = function(t) {
        if (t < DataId.length2) {
            if (!this.clientData[t] && t < DataId.length1) return 0;
            var e = this.clientData[t];
            return e
        }
        return t < DataId.length3 ? this.clientData2[t] : this.serverData[t]
    }, e.prototype.changeId = function(t, e) {
        var i = this.getId(t),
            n = parseFloat(e);
        i += n, i = Math.round(1e3 * i) / 1e3, this.saveId(t, i)
    }, e.prototype.onSave = function() {
        for (var t in this.waitList) {
            var e = this.clientData[t] || this.clientData2[t];
            parseInt(t) < DataId.length1 || (e = JSON.stringify(e)), egret.localStorage.setItem(GlobalVar.key4 + t, e)
        }
        this.waitList = {}
    }, e.prototype.readList = function(t, e) {
        for (; e > t; t++) {
            var i = this.readId(t);
            null != i && (t < DataId.typeClient ? this.clientData[t] = i : this.clientData2[t] = i)
        }
    }, e.prototype.readId = function(t) {
        var e;
        if (e = egret.localStorage.getItem(GlobalVar.key4 + t), void 0 == e) return null;
        if (t < DataId.length1) return parseFloat(e) || 0;
        try {
            return JSON.parse(e)
        } catch (i) {
            return null
        }
    }, e
}(BaseCache);
__reflect(DataCache.prototype, "DataCache");
var DataId;
! function(t) {
    t[t.BEGIN = 1] = "BEGIN", t[t.TODAY_SCORE = 2] = "TODAY_SCORE", t[t.SCORE = 3] = "SCORE", t[t.MUSIC_BG = 4] = "MUSIC_BG", t[t.MUSIC_EFF = 5] = "MUSIC_EFF", t[t.length1 = 6] = "length1", t[t.typeObject = 1e3] = "typeObject", t[t.ACCOUNT = 1001] = "ACCOUNT", t[t.length2 = 1002] = "length2", t[t.typeClient = 1500] = "typeClient", t[t.FRUIT_INFO = 1501] = "FRUIT_INFO", t[t.length3 = 1502] = "length3", t[t.typeServer = 2e3] = "typeServer"
}(DataId || (DataId = {}));
var GlobalFun = function() {
    function t() {}
    return t.SysMsg = function(t, e) {
        void 0 === e && (e = 2), t && 0 != t.length && GameCache.sysTips.doMessage(t, e)
    }, t.alert = function(t, e, i, n, r, o, a, s, h) {
        if (void 0 === e && (e = null), void 0 === i && (i = null), void 0 === n && (n = 1), 3 == n && r && AlertView.tipsChkState[r]) return void e.apply(i);
        var l = new ViewProp;
        l.exData1 = {}, l.exData1.func = e, l.exData1.thisc = i, l.exData1.desc = t, l.exData1.state = n, l.exData1.tipsType = r, l.exData1.func2 = o, l.exData1.thisc2 = a, l.exData1.btnIco = s, l.exData1.auto = h, App.ViewManager.open(ViewConst.ALERT, l)
    }, t.commenTips = function(t, e, i, n) {
        void 0 === e && (e = null), void 0 === i && (i = null), void 0 === n && (n = 1), App.ViewManager.open(ViewConst.COMMENTIPS, {
            exData1: t,
            exData2: e,
            exData3: i,
            exData4: n
        })
    }, t.BitHas = function(t, e) {
        return (t & 1 << e) > 0
    }, t.Min = function(t) {
        for (var e = 0, i = t[0], n = 0; n < t.length; n++) t[n] < i && (i = t[n], e = n);
        return [i, e]
    }, t.Max = function(t) {
        for (var e = 0, i = t[0], n = 0; n < t.length; n++) t[n] > i && (i = t[n], e = n);
        return [i, e]
    }, t.showRedPoint = function(t, e, i, n, r, o) {
        if (void 0 === i && (i = -95), void 0 === n && (n = 0), void 0 === r && (r = "tips"), void 0 === o && (o = 0), t && t instanceof egret.DisplayObjectContainer) {
            r = r || "tips";
            var a = t.getChildByName(r);
            return e ? (a ? a.visible = !0 : (a = App.DisplayUtils.addDBToObj(t, r, o, 0, 0), a.autoDispose = !1, a.right = i, a.top = n, a.name = r), a.parent || t.addChild(a)) : a && (App.DisplayUtils.removeFromParent(a), a.visible = !1), a
        }
    }, t.getHead = function() {}, t.getOtherHead = function(t) {
        return t && t.length > 1 ? t : GameName.type == GameName.quanmin ? "main_json.main_touxiang2_png" : "main_json.main_touxiang_png"
    }, t.isMainShow = function() {
        var t = App.ViewManager.isShow(ViewConst.MAINUI);
        return t && 1 == App.ViewManager.currOpenNum()
    }, t.gotoCharge = function() {}, t.redCoinToCash = function(t) {
        var e = t / GameConfig.getConstByKey("exchange_rate"),
            i = e.toString(),
            n = i.split(".");
        return n[1] && n[1].length > 2 ? e.toFixed(2) : i
    }, t.itemTips = function(t, e, i) {}, t.removeObj = function(t) {
        t && t.parent && (egret.Tween.removeTweens(t), t.parent.removeChild(t), t = null)
    }, t.objChangeList = function(t) {
        var e = [];
        for (var i in t) e.push(t[i]);
        return e
    }, t.moveToIndex = function(t, e) {
        void 0 === e && (e = !0);
        var i = t.parent;
        App.TimerManager.addDelay(100, 100, 1, function() {
            var n = t.selectedIndex;
            if (t.$children && t.$children[0]) {
                var r = e ? t.$children[0].width : t.$children[0].height,
                    o = e ? i.width : i.height,
                    a = t.layout.gap,
                    s = n * (r + a) - a,
                    h = t.dataProvider.source,
                    l = h.length * (r + a) - a - o;
                s = o > s ? 0 : s, l = 0 > l ? 0 : l, e ? i.viewport.scrollH = s > l ? l : s : i.viewport.scrollV = s > l ? l : s
            }
        }, i)
    }, t.getRandom = function(t) {
        for (var e = 0, i = 1; t >= i; i++) e += Math.pow(10, i) * Math.random();
        return e / Math.pow(10, t)
    }, t.addTabHeght = function(t) {
        t && (t.top = LocationProperty.tabHeight + t.top)
    }, t.cutTextFlow = function(t, e) {
        void 0 === e && (e = 20);
        for (var i = TextFlowUtils.parseHTML(t), n = [], r = 0, o = i; r < o.length; r++) {
            var a = o[r];
            if (!a.style.img) {
                if (n.push(a), a.text.length <= e) {
                    e -= a.text.length;
                    continue
                }
                a.text = a.text.slice(0, e), a.text += "...";
                break
            }
            if (2 > e) {
                a.text += "...";
                break
            }
            n.push(a), e -= 2
        }
        return n
    }, t.transformationPoint = function(t, e, i, n) {
        void 0 === i && (i = 0), void 0 === n && (n = 0);
        var r = new egret.Point;
        return t.parent.localToGlobal(t.x + i, t.y + n, r), e.globalToLocal(r.x, r.y, r), r
    }, t.daysBetween = function(t, e) {
        var i = new Date;
        i.setTime(1e3 * t), i.setHours(0, 0, 0, 0);
        var n = new Date;
        return n.setTime(1e3 * e), n.setHours(0, 0, 0, 0), (i.getTime() - n.getTime()) / 1e3 / 60 / 60 / 24 >> 0
    }, t.copy = function(t) {
        LocationProperty.nativeType == RuntimeMgr.TYPE_DEFAUL ? SysUtils.copyToPasteBoard(t) : App.SDKManager.call(SDKMsgConst.COPY_TEXT, t)
    }, t.postError = function(t, e, i, n, r) {
        void 0 === e && (e = ""), void 0 === i && (i = 0), void 0 === n && (n = 0), t.indexOf(".mp3") > -1
    }, t.initScreen = function() {
        var e = new egret.RenderTexture;
        e.drawToTexture(App.ViewManager.getView(ViewConst.EXPLORER)), t.img1.source = e, t.img2.source = RES.getRes("mainUI_json.2_png"), t.sp.addChild(t.img1), t.sp.addChild(t.img2), App.stage.addChild(t.sp), t.sp.visible = !1
    }, t.cutScreen = function() {
        t.sp.visible = !0;
        var e = new egret.RenderTexture;
        e.drawToTexture(t.sp), e.saveToFile("image/png", "dddd.png")
    }, t.localToGloabal = function(e, i, n) {
        return t._cpoint || (t._cpoint = new egret.Point), e ? e.localToGlobal(i, n, t._cpoint) : (t._cpoint.x = 0, t._cpoint.y = 0), t._cpoint
    }, t.globalToLocal = function(e, i, n) {
        return t._cpoint || (t._cpoint = new egret.Point), e ? e.globalToLocal(i, n, t._cpoint) : (t._cpoint.x = 0, t._cpoint.y = 0), t._cpoint
    }, t.transferPosition = function(t, e, i, n) {
        var r = this.localToGloabal(t, e, i);
        return r = this.globalToLocal(n, r.x, r.y)
    }, t.pushImg = function(t) {
        t && ObjectPool.push(t) && (App.DisplayUtils.removeFromParent(t), t.anchorOffsetX = t.anchorOffsetY = 0, t.scaleX = t.scaleY = 1, t.horizontalCenter = t.verticalCenter = 0 / 0, t.blendMode = null, t.visible = !0, t.alpha = 1, t.rotation = 0, t.touchEnabled = !0)
    }, t.guideTween = function(t) {
        t.alpha = 0, t.scaleX = t.scaleY = .7, egret.Tween.get(t).to({
            alpha: 1,
            scaleX: 1,
            scaleY: 1
        }, 400)
    }, t.sp = new egret.Sprite, t.img1 = new eui.Image, t.img2 = new eui.Image, t
}();
__reflect(GlobalFun.prototype, "GlobalFun");
var GlobalVar = function() {
    function t() {}
    return t.version = "202112032030.12", t.configVer = "xx", t.key = "ld@yile.com", t.key2 = "57ufhdrtw", t.key3 = "portn", t.key4 = "100066825num", t.GAME_WIDTH = 600, t.GAME_HEIGHT = 800, t.GAME_PC_HEIGHT = 1064, t.FILTERMSG = !0, t.WUSHANG = !1, t.EMOJI_TYPE = ["emoji_json.emoji_{0}_png", "zjm_json.zjm_channel_{0}_png"], t.TITLE_COLOR = 4144959, t.TITLE_SIZE = 40, t.isGM = !1, t.printMsg = !0, t.qqqq = !1, t.isExplore = !1, t.isCeshi = !1, t
}();
__reflect(GlobalVar.prototype, "GlobalVar");
var SoundType = function() {
    function t() {}
    return t.BUTTONCLICK = "button", t.REWARD = "reward", t.close = "close", t.drop = "drop", t.popup = "popup", t.reward = "reward", t.flyin = "flyin", t.target = "target", t.targetin = "targetin", t.spin = "spin", t.complete = "complete", t.springin = "throwin", t.springout = "springout", t.die = "die", t.spinout = "spinout", t.gameover = "gameover", t.hammer = "hammer", t.tip = "tip", t.CAT1 = "cat1", t.girl_task = "girl_task", t.girl_spin = "girl_spin", t.girl_cashout = "girl_cashout", t.BGMUSIC = "music_bg", t.EXPLORERBG = "bg_island", t.FRUITMACHINE = "zhuanpan", t
}();
__reflect(SoundType.prototype, "SoundType");
var BG_MUSIC_COLLECTION;
! function(t) {}(BG_MUSIC_COLLECTION || (BG_MUSIC_COLLECTION = {}));
var SystemId;
! function(t) {}(SystemId || (SystemId = {}));
var TipsType;
! function(t) {
    t[t.TIPS_BINDGOLD = 1] = "TIPS_BINDGOLD", t[t.TIPS_LVUP_CARD = 2] = "TIPS_LVUP_CARD", t[t.TIPS_BELONGENTER_VIP = 3] = "TIPS_BELONGENTER_VIP", t[t.TIPS_BELONGENTER_WORLD = 4] = "TIPS_BELONGENTER_WORLD", t[t.TIPS_PURGATORY_DEL = 5] = "TIPS_PURGATORY_DEL", t[t.TIPS_PET_EXPLORE = 6] = "TIPS_PET_EXPLORE", t[t.TIPS_MOUNT_EXPLORE = 7] = "TIPS_MOUNT_EXPLORE", t[t.TIPS_PARTNER_EXPLORE = 8] = "TIPS_PARTNER_EXPLORE", t[t.TIPS_SPIRIT_EXPLORE = 9] = "TIPS_SPIRIT_EXPLORE", t[t.TIPS_BATTERY_EXPLORE = 10] = "TIPS_BATTERY_EXPLORE", t[t.TIPS_ASSISTANT_EXPLORE = 11] = "TIPS_ASSISTANT_EXPLORE", t[t.TIPS_PET_REFERSH = 12] = "TIPS_PET_REFERSH", t[t.TIPS_MOUNT_REFRESH = 13] = "TIPS_MOUNT_REFRESH", t[t.TIPS_PARTNER_REFERSH = 14] = "TIPS_PARTNER_REFERSH", t[t.TIPS_SPIRIT_REFERSH = 15] = "TIPS_SPIRIT_REFERSH", t[t.TIPS_BATTERY_REFERSH = 16] = "TIPS_BATTERY_REFERSH", t[t.TIPS_ASSISTANT_REFERSH = 17] = "TIPS_ASSISTANT_REFERSH", t[t.TIPS_EXP_CARD = 18] = "TIPS_EXP_CARD", t[t.TIPS_OPTIONALGIFT = 19] = "TIPS_OPTIONALGIFT", t[t.TIPS_BEATTACK = 20] = "TIPS_BEATTACK", t[t.TIPS_EXPCOPY_CARD = 21] = "TIPS_EXPCOPY_CARD"
}(TipsType || (TipsType = {}));
var GuideFingerManger = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.dic = {}, e
    }
    return __extends(e, t), e.prototype.addGuide = function(t, e, i, n) {
        void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = !0);
        var r = t;
        if (!this.dic[t.hashCode]) {
            var o = new eui.Image("guide_json.0_new_hand_png");
            r.addChild(o), o.x = e, o.y = i, o.visible = n, o.touchEnabled = !1, egret.Tween.get(o, {
                loop: !0
            }).to({
                x: o.x + 10,
                y: o.y + 10
            }, 500).to({
                x: o.x,
                y: o.y
            }, 500), this.dic[t.hashCode] = o
        }
    }, e.prototype.addGuide2 = function(t, e, i, n) {
        void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = !0);
        var r = t;
        if (!this.dic[t.hashCode]) {
            var o = new eui.Image("guide_json.0_new_hand_png");
            r.addChild(o), o.x = e, o.y = i, o.rotation = 227, o.visible = n, o.touchEnabled = !1, egret.Tween.get(o, {
                loop: !0
            }).to({
                y: o.y - 10
            }, 500).to({
                y: o.y
            }, 500), this.dic[t.hashCode] = o
        }
    }, e.prototype.addGuide3 = function(t, e, i, n) {
        void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = !0);
        var r = t;
        if (!this.dic[t.hashCode]) {
            var o = new eui.Image("guide_json.0_new_hand_png");
            r.addChild(o), o.x = e, o.y = i, o.rotation = 50, o.visible = n, o.touchEnabled = !1, egret.Tween.get(o, {
                loop: !0
            }).to({
                y: o.y + 10
            }, 500).to({
                y: o.y
            }, 500), this.dic[t.hashCode] = o
        }
    }, e.prototype.addGuide4 = function(t, e, i, n) {
        void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = !0);
        var r = t;
        if (!this.dic[t.hashCode]) {
            var o = new eui.Image("guide_json.0_new_hand_png");
            r.addChild(o), o.x = e, o.y = i, o.rotation = 145, o.visible = n, o.touchEnabled = !1, egret.Tween.get(o, {
                loop: !0
            }).to({
                x: o.x + 10
            }, 500).to({
                x: o.x
            }, 500), this.dic[t.hashCode] = o
        }
    }, e.prototype.addGuide5 = function(t, e, i, n) {
        void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = !0);
        var r = t;
        if (!this.dic[t.hashCode]) {
            var o = new eui.Image("guide_json.0_new_hand_png");
            r.addChild(o), o.x = e, o.y = i, o.rotation = 334, o.visible = n, o.touchEnabled = !1, egret.Tween.get(o, {
                loop: !0
            }).to({
                x: o.x + 10
            }, 500).to({
                x: o.x
            }, 500), this.dic[t.hashCode] = o
        }
    }, e.prototype.remove = function(t) {
        var e = this.dic[t.hashCode];
        e && (egret.Tween.removeTweens(e), App.DisplayUtils.removeFromParent(e), delete this.dic[t.hashCode], e = null)
    }, e
}(BaseClass);
__reflect(GuideFingerManger.prototype, "GuideFingerManger");
var GuideForceView = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this), this.addTouchEvent(this, this.onTouch)
    }, e.prototype.setTarget = function(t, e, i) {
        void 0 === i && (i = null);
        var n = GlobalFun.transferPosition(t.parent, t.x, t.y, this);
        n.x -= t.anchorOffsetX, n.y -= t.anchorOffsetY;
        var r = App.StageUtils.getWidth(),
            o = App.StageUtils.getHeight();
        1 == e ? (this.rect1.x = this.rect1.y = 0, this.rect1.width = n.x, this.rect1.height = n.y + t.height, this.rect2.x = n.x + t.width, this.rect2.y = 0, this.rect2.width = r - this.rect2.x, this.rect2.height = n.y + t.height, this.rect3.x = 0, this.rect3.y = n.y + t.height, this.rect3.width = r, this.rect3.height = o - this.rect3.y, App.GuideFingerManger.addGuide(this, n.x + t.width / 2, n.y + t.height)) : 4 == e ? (this.rect1.x = this.rect1.y = 0, this.rect1.width = r, this.rect1.height = n.y, this.rect2.x = 0, this.rect2.y = n.y, this.rect2.width = n.x, this.rect2.height = t.height, this.rect3.x = 0, this.rect3.y = n.y + t.height, this.rect3.width = r, this.rect3.height = o - this.rect3.y, App.GuideFingerManger.addGuide4(this, n.x, n.y + t.height / 2)) : 5 == e && (this.rect1.x = this.rect1.y = 0, this.rect1.width = r, this.rect1.height = n.y, this.rect2.x = 0, this.rect2.y = n.y, this.rect2.width = n.x, this.rect2.height = t.height, this.rect3.x = n.x + t.width, this.rect3.y = n.y, this.rect3.width = r - this.rect3.x, this.rect3.height = t.height, this.rect4.x = 0, this.rect4.y = n.y + t.height, this.rect4.width = r, this.rect4.height = o - this.rect4.y, App.GuideFingerManger.addGuide(this, n.x + t.width / 2, n.y + t.height)), this.textImg && i && (this.textImg.x = n.x + i[0], this.textImg.y = n.y + i[1]), this.textImg && GlobalFun.guideTween(this.textImg), this._tar = t, this.addTouchEvent(t, this.onTarTouch)
    }, e.prototype.onTouch = function() {
        this._tar && this._tar.stage && this._tar.visible || e.hide(this)
    }, e.prototype.onTarTouch = function() {
        e.hide(this._tar)
    }, e.prototype.dispose = function() {
        t.prototype.dispose.call(this), this.textImg && egret.Tween.removeTweens(this.textImg), App.GuideFingerManger.remove(this)
    }, e.show = function(t, i, n, r) {
        void 0 === r && (r = null), this.viewDic[t.hashCode] || (this.viewDic[t.hashCode] = new e, this.viewDic[t.hashCode].skinName = i), LayerManager.UI_Guide.addChild(this.viewDic[t.hashCode]), this.viewDic[t.hashCode].setTarget(t, n, r)
    }, e.hide = function(t) {
        this.viewDic[t.hashCode] && (this.viewDic[t.hashCode].dispose(), delete this.viewDic[t.hashCode])
    }, e.hasView = function() {
        for (var t in this.viewDic) return !0
    }, e.viewDic = {}, e
}(BaseEuiComponent);
__reflect(GuideForceView.prototype, "GuideForceView");
var FpsManager = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._reg = !1, e._frame = 0, e._reTime = 0, e
    }
    return __extends(e, t), e.ins = function() {
        return t.ins.call(this)
    }, e.prototype.reg = function() {
        this._reg || (this._reg = !0, App.stage.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this), App.TimerManager.addDelay(3e4, 3e5, 0, this.onTime, this), this._frame = 0, this._reTime = egret.getTimer())
    }, e.prototype.unReg = function() {
        this._reg = !1, App.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this), App.TimerManager.removeAll(this)
    }, e.prototype.onFrame = function(t) {
        this._frame++
    }, e.prototype.onTime = function() {
        var t = egret.getTimer();
        this._frame / (t - this._reTime) * 1e3;
        this._reTime = t, this._frame = 0
    }, e
}(BaseClass);
__reflect(FpsManager.prototype, "FpsManager");
var SilentLoading = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.dragons = ["mission_page", "fountain", "Crabwark", "mermaid", "cash_pig", "cashing", "lucky_reward", "luck_reward", "lucky_button", "animal_dividend", "animal_dividend_2", "rank_page", "gongxi_get", "giving", "gameover_1", "gameover_2", "88get1", "openbox", "rattan_1", "rattan_2", "arcade_fruit"], e
    }
    return __extends(e, t), e.prototype.start = function() {
        var t = this,
            e = this.dragons;
        App.TimerManager.addFrame(1, function() {
            e.length > 0 ? App.DisplayUtils.addDBToObj(null, e.shift(), 1, 0, 0) : App.TimerManager.removeAll(t)
        }, this, 0)
    }, e
}(BaseClass);
__reflect(SilentLoading.prototype, "SilentLoading");
var RedPointManager = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.dic = {}, e
    }
    return __extends(e, t), e.prototype.init = function() {
        App.TimerManager.add(1e3, this.onCheck, this)
    }, e.prototype.onCheck = function() {
        for (var t in this.dic)
            for (var e = this.dic[t], i = 0, n = e; i < n.length; i++) {
                var r = n[i];
                r.onCheck()
            }
    }, e.prototype.regist = function(t, e, i, n, r, o, a, s) {
        void 0 === r && (r = -95), void 0 === o && (o = 0), void 0 === a && (a = null);
        var h = this.dic[t.hashCode];
        h || (h = [], this.dic[t.hashCode] = h);
        var l = new RedPoint;
        h.push(l), l.init(t, r, o, e, i, n, a, s)
    }, e.prototype.remove = function(t) {
        var e = this.dic[t.hashCode];
        if (e) {
            for (var i = 0, n = e; i < n.length; i++) {
                var r = n[i];
                r.dispose()
            }
            delete this.dic[t.hashCode]
        }
    }, e
}(BaseClass);
__reflect(RedPointManager.prototype, "RedPointManager");
var RedPoint = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._parent = null, e.needCheck = !1, e
    }
    return __extends(e, t), e.prototype.init = function(t, e, i, n, r, o, a, s) {
        void 0 === a && (a = null), this.addEvent(o), this.tar = t, this.r = e, this.t = i, this.fun = n, this.funObj = r, this._parent = a ? a : t, this.needCheck = !0, this.effName = s
    }, e.prototype.addEvent = function(t) {
        for (var e = 0, i = t; e < i.length; e++) {
            var n = i[e];
            App.MessageCenter.addListener(n, this.onEvent, this)
        }
    }, e.prototype.onEvent = function() {
        this.needCheck = !0
    }, e.prototype.onCheck = function() {
        if (this.needCheck) {
            this.needCheck = !1;
            var t = this.fun.apply(this.funObj);
            GlobalFun.showRedPoint(this._parent, t, this.r, this.t, this.effName)
        }
    }, e.prototype.dispose = function() {
        App.MessageCenter.removeAll(this)
    }, e
}(egret.HashObject);
__reflect(RedPoint.prototype, "RedPoint");
var ServerCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.isInit = !1, e._serverTimeBase = 0, e
    }
    return __extends(e, t), Object.defineProperty(e.prototype, "serverTimeBase", {
        set: function(t) {
            this._serverTimeBase = 1e3 * t - egret.getTimer()
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "serverTime", {
        get: function() {
            return this._serverTimeBase + egret.getTimer()
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.noticePrize = function() {}, e.prototype.noticeSave = function() {
        GameConfig.getConstByKey("announcement_version"), GameConfig.getConstByKey("announcement_weight")
    }, e.prototype.getZeroTime = function() {
        var t = new Date;
        return t.setTime(this.serverTime + 864e5), t.setHours(0, 0, 0, 0), t.getTime() - this.serverTime
    }, e
}(BaseCache);
__reflect(ServerCache.prototype, "ServerCache");
var Language_cn = function() {
    function t() {}
    return t.version = "版本号 : {0}", t
}();
__reflect(Language_cn.prototype, "Language_cn");
var Language = function() {
    function t() {}
    return Object.defineProperty(t, "lang", {
        get: function() {
            return Language_cn
        },
        enumerable: !0,
        configurable: !0
    }), t
}();
__reflect(Language.prototype, "Language");
var SDKManager = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.init = function() {
        this.handlers = {};
        var t = this;
        egret.ExternalInterface.addCallback("sendToJS", function(e) {
            var i = JSON.parse(e),
                n = i.state,
                r = t.handlers[n];
            t.handlers[n] && (r.args = [i], r.run(), delete t.handlers[n]), n != SDKMsgConst.SENSOR_ROTATION_ANGLE_BACK && n != SDKMsgConst.SENSOR_ACCELEROMETER_BACK && n != SDKMsgConst.INSTALL && App.MessageCenter.dispatch(MsgConst.SDK_CALL + n, i)
        })
    }, e.prototype.call = function(t, e, i, n, r, o) {
        var a = {
            state: t,
            data: e
        };
        if (t == SDKMsgConst.MAKE_SIGN && (a.key = o), i) {
            var s = Handler.create(r, n, null, !0);
            this.handlers[i] = s
        }
        this.callNative("callNative", JSON.stringify(a))
    }, e.prototype.callNative = function(t, e) {
        LocationProperty.nativeType == RuntimeMgr.TYPE_IOS ? window.ExternalInterface.call(t, e) : LocationProperty.nativeType == RuntimeMgr.TYPE_ANDROID ? egret.ExternalInterface.call(t, e) : LocationProperty.nativeType == RuntimeMgr.TYPE_WX || LocationProperty.nativeType == RuntimeMgr.TYPE_QQGAME || window[t] && window[t](e)
    }, e
}(BaseClass);
__reflect(SDKManager.prototype, "SDKManager");
var SDKMsgConst = function() {
    function t() {}
    return t.LOGIN = "login", t.HIDELOGO = "hide_logo", t.LOGOUT = "logout", t.GAME_ACCOUNT = "game_account", t.MAKE_SIGN = "make_sign", t.AD_VIDEO = "ad_video", t.AD_REWARD = "ad_reward", t.AD_MODULE = "ad_module", t.AD_NEW_MODULE = "ad_new_module", t.AD_BANNER = "ad_banner", t.WECHAT_SHARE = "wechat_share", t.WECHAT_BIND = "wechat_bind", t.COPY_TEXT = "copy_text", t.SENSOR_GYRO_START = "sensor_gyro_start", t.SENSOR_GYRO_END = "sensor_gyro_end", t.SENSOR_MAGNETIC_FIELD_START = "sensor_magnetic_field_start", t.SENSOR_MAGNETIC_FIELD_END = "sensor_magnetic_field_end", t.SENSOR_ROTATION_ANGLE_START = "sensor_rotation_angle_start", t.SENSOR_ROTATION_ANGLE_END = "sensor_rotation_angle_end", t.SENSOR_ACCELEROMETER_START = "sensor_accelerometer_start", t.SENSOR_ACCELEROMETER_END = "sensor_accelerometer_end", t.VIBRATOR = "vibrator", t.BANNER_CLOSE = "ad_banner_close", t.SYSTEM_SEND = "system_send", t.ALL_APPS_NUM = "query_all_apps_num", t.LOGIN_BACK = "login_back", t.LOGOUT_BACK = "logout_back", t.MAKE_SIGB_BACK = "make_sign_back", t.AD_SHOW = "ad_show", t.AD_CLICKED = "ad_clicked", t.AD_SKIP = "ad_skip", t.AD_TIME_OVER = "ad_time_over", t.AD_CLOSE = "ad_close", t.AD_ERROR = "ad_error", t.AD_REWARD_VERIFY = "ad_reward_verify", t.INSTALL = "installed", t.WECHAT_SHARE_BACK = "wechat_share_back", t.WECHAT_BIND_BACK = "wechat_bind_back", t.SENSOR_GYRO_BACK = "sensor_gyro_back", t.SENSOR_MAGNETIC_FIELD_BACK = "sensor_magnetic_field_back", t.SENSOR_ROTATION_ANGLE_BACK = "sensor_rotation_angle_back", t.SENSOR_ACCELEROMETER_BACK = "sensor_accelerometer_back", t.AUDIO_ADD = "audio_add", t.AUDIO_SUB = "audio_sub", t.VOLUME_UP = "key_volume_up_back", t.VOLUME_DOWN = "key_volume_down_back", t.ALL_APPS_NUM_BACK = "query_all_apps_num_back", t
}();
__reflect(SDKMsgConst.prototype, "SDKMsgConst");
var LoadingPage = function(t) {
    function e() {
        var e = t.call(this, LayerManager.UI_TipsNoClick) || this;
        return e.barWidth = 300, e.bClickClose = !1, e.showAd = !1, e.openEff = !1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this), this.createView(), this.initFun(), this.touchEnabled = this.touchChildren = !0
    }, e.prototype.open = function() {
        t.prototype.open.call(this), this.focusToStage(), App.MessageCenter.addListener(MsgConst.ONLOADING, this.showProgress, this)
    }, e.prototype.createView = function() {
        this.rectBg = new eui.Rect, this.addChild(this.rectBg), this.proCon = new egret.DisplayObjectContainer, this.addChild(this.proCon), this.proBg = new egret.Shape, this.proBg.x = (App.StageUtils.getWidth() - this.barWidth >> 1) - 1, this.proBg.y = App.StageUtils.getHeight() - 201, this.proBg.graphics.lineStyle(3, 0), this.proBg.graphics.drawRoundRect(0, 0, this.barWidth, 20, 30, 30), this.proCon.addChild(this.proBg), this.pro = new egret.Shape, this.pro.x = (App.StageUtils.getWidth() - this.barWidth >> 1) - 1, this.pro.y = App.StageUtils.getHeight() - 201, this.pro.graphics.lineStyle(3, 0), this.pro.graphics.beginFill(0), this.pro.graphics.drawRoundRect(0, 0, this.barWidth, 20, 30, 30), this.pro.graphics.endFill(), this.proCon.addChild(this.pro), this.login_tips = new egret.Bitmap, this.proCon.addChild(this.login_tips), this.tipsTx = new egret.TextField, this.tipsTx.textColor = 0, this.tipsTx.width = App.StageUtils.getWidth(), this.tipsTx.textAlign = "center", this.tipsTx.size = 18, this.tipsTx.y = this.pro.y + 40, this.proCon.addChild(this.tipsTx), this.loadImg()
    }, e.prototype.loadImg = function() {
        this.rectBg.width = App.StageUtils.getWidth(), this.rectBg.height = App.StageUtils.getHeight(), this.rectBg.fillColor = 16777215
    }, e.prototype.onTime = function() {}, e.prototype.initFun = function() {
        this.showVersion(GlobalVar.version), window.showLoadProgress = this.showProgress
    }, e.prototype.showProgress = function(t, e) {
        10 != t && (this.changePro(t), this.tipsTx.text = e)
    }, e.prototype.showVersion = function(t) {
        this.changeVersion(t)
    }, e.prototype.changeVersion = function(t) {}, e.prototype.changePro = function(t) {
        this.tw && (egret.Tween.removeTweens(this.pro), this.tw = null);
        var e = 500,
            i = t >= 100 ? 100 : t;
        this.tw = egret.Tween.get(this.pro), this.pro.width > i / 100 * this.barWidth || this.tw.to({
            width: i / 100 * this.barWidth
        }, e)
    }, e.prototype.destroy = function() {
        this.tw && (egret.Tween.removeTweens(this.pro), this.tw = null), t.prototype.destroy.call(this)
    }, e.prototype.hidePro = function() {
        this.proCon.visible = !1
    }, e.prototype.showPro = function() {
        this.proCon.visible = !0
    }, e.prototype.close = function() {
        t.prototype.close.call(this), this.addDelayDestroy()
    }, e
}(BaseEuiWindow);
__reflect(LoadingPage.prototype, "LoadingPage");
var LogWin = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this
    }
    return __extends(e, t), e.push = function(t) {
        this.LogStr = this.LogStr + "\n" + t
    }, e.LogStr = "", e
}(BaseEuiWindow);
__reflect(LogWin.prototype, "LogWin");
var AdCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._isPlay = !1, e._lastPlayTime = 0, e._isInit = !1, e.adConst = {}, e.bannerWidth = 600, e.bannerHeight = 150, e._restCount = -1, e._apps = 0, e._curCounts = 0, e.lastInserTime = 0, e._showBanner = !1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        this.initInsertData(), this.queryAppsNum(), App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.AD_SHOW, this.onPlayEnd, this), App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.AD_CLICKED, this.onPlayEnd, this), App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.AD_SKIP, this.onPlayEnd, this), App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.AD_TIME_OVER, this.onPlayEnd, this), App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.AD_CLOSE, this.onPlayEnd, this), App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.AD_ERROR, this.onAdError, this), App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.AD_REWARD_VERIFY, this.onRewardBack, this), App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.INSTALL, this.onInstall, this)
    }, e.prototype.play = function(t, e, i, n) {
        var r = App.TimerManager.getSyncTime();
        if (!(this._isPlay && r - this._lastPlayTime < 5e3)) return this._handler = Handler.create(e, t, [], !0), this._isInit ? this.adConst[AdCode.VIDIEO] ? void 0 : void GlobalFun.SysMsg("暂时无法播放广告，请联系客服") : void GlobalFun.SysMsg("广告初始化失败")
    }, e.prototype.onPlayEnd = function() {
        this._isPlay = !1
    }, e.prototype.onRewardBack = function(t) {}, e.prototype.queryAppsNum = function() {}, e.prototype.alertRest = function() {
        this._restCount > -1 && (this._restCount = -1)
    }, e.prototype.playVideo = function(t) {}, e.prototype.onPlayBack = function(t) {
        return this._isPlay = !1, t == SDKMsgConst.AD_ERROR ? void GlobalFun.SysMsg("广告播放失败，请稍后重试") : void(this._handler && (this._handler.args.unshift(t, this._key), this._handler.run(), this._handler = null))
    }, e.prototype.onInstall = function(t) {}, e.prototype.onAdError = function(t) {
        var e = this.adConst[AdCode.VIDIEO];
        e && t.data && t.data.codeId == e.ad_code_id && this.onPlayBack(SDKMsgConst.AD_ERROR)
    }, e.prototype.initInsertData = function() {}, e.prototype.playInsertOnWin = function() {}, e.prototype.playIntsertScreen = function() {}, e.prototype.playBanner = function(t) {}, e.prototype.playOpenScreen = function() {}, e.prototype.closeBanner = function() {
        App.SDKManager.call(SDKMsgConst.BANNER_CLOSE, {})
    }, e
}(BaseCache);
__reflect(AdCache.prototype, "AdCache");
var AdType = function() {
    function t() {}
    return t.CLIENTHANDLE = "other", t.LUCKDRAW = "luckDraw", t.SIGNIN = "signin", t.LUCKY_RED = "luckyBag", t.PASS_RED = "levelPass", t.DAILYTASK = "dailyTask", t.GOLDFISH = "goldfishLuckDraw", t.FRUITMACHINE = "fruitMachine", t.EXPLORE = "explore", t.FOUNTAIN = "fountain", t.NEWBIERED = "newPlayerRedpack", t.EXPLORE_COIN = "gold", t
}();
__reflect(AdType.prototype, "AdType");
var AdCode = function() {
    function t() {}
    return t.VIDIEO = 1, t.SCREEN = 2, t.BANNER = 3, t.INSERT_SCREEN = 4, t.OPEN_SCREEN = 5, t
}();
__reflect(AdCode.prototype, "AdCode");
var AlertView = function(t) {
    function e() {
        var e = t.call(this, LayerManager.UI_Message) || this;
        return e.skinName = "AlertSkin", e.horizontalCenter = 1, e.verticalCenter = 1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this)
    }, e.prototype.open = function(e) {
        t.prototype.open.call(this), this.initData(e), this.addTouchEvent(this.btn0, this.closeFunc), this.addTouchEvent(this.btn1, this.onCLick), this.addEvent(egret.Event.CHANGE, this.chkTips, this.onChkTipsClick), this.tipsType = e.exData1.tipsType, this.currentState = this.getAlertState(e.exData1.state), App.TimerManager.remove(this.onAutoTimer, this), e.exData1.auto ? (App.TimerManager.add(1e3, this.onAutoTimer, this, 0), this.autoTime = e.exData1.auto[0], this.autoType = e.exData1.auto[1], this.showAutoTime()) : this.autoTx.text = ""
    }, e.prototype.onAutoTimer = function() {
        this.autoTime--, this.showAutoTime(), this.autoTime <= 0 && (App.TimerManager.remove(this.onAutoTimer, this), 1 == this.autoType ? this.onCLick() : this.closeFunc())
    }, e.prototype.showAutoTime = function() {
        this.autoTx.text = StringUtils.substitute("{0}秒", this.autoTime)
    }, e.prototype.getAlertState = function(t) {
        switch (t) {
            case 1:
                return "single";
            case 2:
                return "normal";
            case 3:
                return "normal2";
            case 4:
                return "normal3"
        }
        return "normal"
    }, e.prototype.onChkTipsClick = function(t) {
        this.tipsType && this.chkTips && (e.tipsChkState[this.tipsType] = this.chkTips.selected)
    }, e.prototype.closeFunc = function() {
        this.cancle && this.cancle.run(), this.closeView()
    }, e.prototype.close = function(e) {
        t.prototype.close.call(this), this.handler && (this.handler.dispose(), this.handler = null)
    }, e.prototype.initData = function(t) {
        this.desc.textFlow = TextFlowUtils.parseHTML(t.exData1.desc), this.handler && this.handler.dispose(), this.handler = Handler.create(t.exData1.thisc, t.exData1.func, t.exData1.arg || [], !1), this.cancle && this.cancle.dispose(), this.cancle = Handler.create(t.exData1.thisc2, t.exData1.func2, t.exData1.arg2 || [], !1)
    }, e.prototype.onCLick = function() {
        this.handler && this.handler.run(), this.closeView()
    }, e.tipsChkState = {}, e
}(BaseEuiWindow);
__reflect(AlertView.prototype, "AlertView");
var CommenTipsView = function(t) {
    function e() {
        var e = t.call(this, LayerManager.UI_TipsNoClick) || this;
        return e.skinName = "CommenTipsSkin", e.horizontalCenter = 1, e.verticalCenter = 1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this)
    }, e.prototype.open = function(e) {
        t.prototype.open.call(this), this.contentLab.text = e.exData1, e.exData2 && (this.handler = Handler.create(e.exData3, e.exData2)), this.currentState = e.exData4, App.SoundManager.playEffect(SoundType.tip)
    }, e.prototype.close = function() {
        t.prototype.close.call(this), this.handler && (this.handler.run(), this.handler = null)
    }, e
}(BaseEuiWindow);
__reflect(CommenTipsView.prototype, "CommenTipsView");
var AwardCache = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.giveAwardList = function(t) {
        for (var e = 0, i = t; e < i.length; e++) {
            var n = i[e];
            this.giveAward(n)
        }
    }, e.prototype.giveAward = function(t, e, i, n) {
        void 0 === e && (e = !0)
    }, e.prototype.getAwardName = function(t) {
        var e = t[0],
            i = (t[1], "");
        switch (e) {
            case AwardType.cash:
                i = ""
        }
        return i
    }, e.prototype.getAwardValue = function(t, e) {
        void 0 === e && (e = !1);
        var i = t[0],
            n = t[1],
            r = n + "";
        switch (i) {
            case AwardType.cash:
                break;
            case AwardType.coin:
                break;
            case AwardType.cash:
        }
        return e && (r = (n >= 0 ? "+" : "") + r), r
    }, e.prototype.getAwardNameSource = function(t, e) {
        void 0 === e && (e = 0);
        var i;
        switch (t) {
            case AwardType.coin:
                i = 1 == e ? AWARDTYPENAME.SMALL_REDBAG : 2 == e ? AWARDTYPENAME.MIDDLE_REDBAG : AWARDTYPENAME.MORE_REDBAG;
                break;
            case AwardType.chest:
                i = 1 == e ? AWARDTYPENAME.CHEST_SILVER : 2 == e ? AWARDTYPENAME.GOLD_SILVER : AWARDTYPENAME.DIAMONDS_SILVER;
                break;
            case AwardType.cash:
                i = AWARDTYPENAME.CASH_REDBAG;
                break;
            default:
                i = t
        }
        return i
    }, e.prototype.showAwardView = function(t, e, i, n, r, o) {
        void 0 === i && (i = AwardType.coin), void 0 === n && (n = !0), void 0 === r && (r = SoundType.REWARD), void 0 === o && (o = null);
        var a = new ViewProp;
        a.exData1 = t, a.firIndex = e, a.secIndex = i, a.exData2 = n, a.exData3 = r, a.backParam = o, i == AwardType.chest ? App.ViewManager.open(ViewConst.AWARD_BOXEXCESSIVE, {
            exData1: e,
            exData2: a
        }) : App.ViewManager.open(ViewConst.AWARD_TONGYONG, a)
    }, e.prototype.showDirectAwardView = function(t, e, i) {
        void 0 === i && (i = AwardType.appointCashDirect);
        var n = new ViewProp;
        n.exData1 = t, n.exData2 = e, n.exData3 = i, App.ViewManager.open(ViewConst.AWARD_DIRECT, n)
    }, Object.defineProperty(e.prototype, "arrContinuity", {
        set: function(t) {
            this._arrContinuity = t, this.showContinuityView()
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.showContinuityView = function() {}, e
}(BaseCache);
__reflect(AwardCache.prototype, "AwardCache");
var AwardItem = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this)
    }, e.prototype.dataChanged = function() {
        if (t.prototype.dataChanged.call(this), this.data && !this.data.a) {
            this.data[0] == AwardType.gameCurrency ? this.rewardImg.source = "fruitMachine_json.13_icon_game_png" : this.rewardImg.source = RES_DIR_AWARD_ICON + this.data[0] + ".png";
            var e = "";
            (this.data[0] == AwardType.cash || this.data[0] == AwardType.direct) && (e = "y"), this.coinG && (this.coinG.visible = !1, this.data[0] == AwardType.coin && (this.coinG.visible = !0)), this.valueNum && (this.valueNum.value = GameCache.award.getAwardValue(this.data) + e)
        }
    }, e
}(BaseCustComponent);
__reflect(AwardItem.prototype, "AwardItem");
var AwardType = function() {
    function t() {}
    return t.coin = 1, t.cash = 2, t.piggyCoin = 3, t.chest = 4, t.direct = 5, t.animal = 6, t.gameCurrency = 8, t.appointCoinDirect = 11, t.appointCashDirect = 12, t.hammer = 100, t.fountain = 101, t
}();
__reflect(AwardType.prototype, "AwardType");
var AWARDTYPENAME;
! function(t) {
    t[t.SMALL_REDBAG = 8] = "SMALL_REDBAG", t[t.MIDDLE_REDBAG = 9] = "MIDDLE_REDBAG", t[t.MORE_REDBAG = 10] = "MORE_REDBAG", t[t.CHEST_SILVER = 11] = "CHEST_SILVER", t[t.GOLD_SILVER = 12] = "GOLD_SILVER", t[t.DIAMONDS_SILVER = 13] = "DIAMONDS_SILVER", t[t.CASH_REDBAG = 14] = "CASH_REDBAG", t[t.WONDERFUL_FOUNTAIN = 15] = "WONDERFUL_FOUNTAIN", t[t.REWARD_TASK = 16] = "REWARD_TASK", t[t.REWARD_SIGN = 17] = "REWARD_SIGN", t[t.LUCK_REDBAG = 18] = "LUCK_REDBAG", t[t.GOLDFISH_GIFTS = 19] = "GOLDFISH_GIFTS", t[t.EVERYDAY_REWARD = 22] = "EVERYDAY_REWARD", t[t.LITTLE_BAG = 25] = "LITTLE_BAG", t[t.EXPLORER_AWARD = 26] = "EXPLORER_AWARD", t[t.EVERYDAY_WELFARE = 100] = "EVERYDAY_WELFARE", t[t.GAME_CURRENCY = 101] = "GAME_CURRENCY", t[t.CASH_DIRECT = 102] = "CASH_DIRECT", t[t.COIN_DIRECT = 103] = "COIN_DIRECT", t[t.COIN_COUPONS = 104] = "COIN_COUPONS", t[t.EXPLORER_COIN = 106] = "EXPLORER_COIN"
}(AWARDTYPENAME || (AWARDTYPENAME = {}));
var HttpDebugWin = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._id = 1, e.skinName = "HttpDebugWinSkin", e
    }
    return __extends(e, t), e.addDTxt = function(t) {
        if (GlobalVar.printMsg && (this.str += "\n" + t, App.ViewManager.isShow(ViewConst.HTTPDEBUG))) {
            var e = App.ViewManager.getView(ViewConst.HTTPDEBUG);
            e.refresh()
        }
    }, e.prototype.init = function() {
        t.prototype.init.call(this)
    }, e.prototype.open = function() {
        t.prototype.open.call(this), this.refresh(), this.addTouchEvent(this.testBtn, this.onTest), this.addTouchEvent(this.clearBtn, this.onClear), this.addTouchEvent(this, this.onTouch), this.versionTx.text = "版本：" + GlobalVar.version + "，配置：" + GameConfig.getConstByKey("version")
    }, e.prototype.refresh = function() {
        this.txt.textFlow = TextFlowUtils.parseHTML(e.str)
    }, e.prototype.onClear = function() {
        this.txt.text = "", e.str = "", e.str_i = 0
    }, e.prototype.onTest = function() {}, e.prototype.onTouch = function(t) {
        var i, n;
        switch (t.target) {
            case this.cleanSave:
                i = "clearData", n = 0;
                break;
            case this.copyBtn:
                GlobalFun.copy(e.str);
                break;
            case this.copyBtn1:
                GlobalFun.copy(JSON.stringify(GameCache.data.clientData) + JSON.stringify(GameCache.data.clientData2));
                break;
            case this.gameOver:
                this.closeView(), App.MessageCenter.dispatch(MsgConst.FRUIT_END);
                break;
            case this.qqBtn:
                GlobalVar.qqqq = !0;
                break;
            case this.mode0:
                GameCache.fruit.gameMode = 0;
                break;
            case this.mode1:
                GameCache.fruit.gameMode = 1;
                break;
            case this.mode2:
                GameCache.fruit.gameMode = 2;
                break;
            case this.mode4:
                GlobalVar.isExplore = !0, GlobalFun.SysMsg("开启探索功能：" + GlobalVar.isExplore)
        }
    }, e.str = "", e.str_i = 0, e
}(BaseEuiWindow);
__reflect(HttpDebugWin.prototype, "HttpDebugWin");
var FcmCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.hasValid = !1, e.isAdult = !1, e.anti_addiction = 0, e
    }
    return __extends(e, t), e.prototype.isOpen = function() {
        return this.anti_addiction
    }, e.prototype.init = function(t) {
        this.hasValid = t.hasValid, this.isAdult = t.isAdult, this.anti_addiction = parseInt(t.anti_addiction), this.isOpen() && this.onUnderAge()
    }, e.prototype.onUnderAge = function() {
        this.hasValid && !this.isAdult && App.TimerManager.addDelay(6e4, 6e4, 0, this.onUnderAgeTimer, this)
    }, e.prototype.onUnderAgeTimer = function() {
        this.showTips()
    }, e.prototype.showTips = function() {
        return this.hasValid && this.isAdult ? !1 : (App.ViewManager.open(ViewConst.FCM_TIPS), !0)
    }, e
}(BaseCache);
__reflect(FcmCache.prototype, "FcmCache");
var FcmTips = function(t) {
    function e() {
        var e = t.call(this, LayerManager.UI_TipsNoClick) || this;
        return e.skinName = "FcmTips2Skin", e.showModel = !1, e
    }
    return __extends(e, t), e.prototype.open = function(e) {
        t.prototype.open.call(this, e), this.addTouchEvent(this.sureBtn, this.onSure)
    }, e.prototype.onSure = function() {
        this.closeView(), App.ViewManager.open(ViewConst.FCM_TIPS)
    }, e
}(BaseEuiWindow);
__reflect(FcmTips.prototype, "FcmTips");
var FcmTips2 = function(t) {
    function e() {
        var e = t.call(this, LayerManager.UI_TipsNoClick) || this;
        return e.skinName = "FcmTips2Skin", e.showModel = !1, e
    }
    return __extends(e, t), e.prototype.open = function() {
        this.addTouchEvent(this.sureBtn, this.onSure)
    }, e.prototype.onSure = function() {
        this.closeView()
    }, e.prototype.close = function() {}, e
}(BaseEuiWindow);
__reflect(FcmTips2.prototype, "FcmTips2");
var FcmView = function(t) {
    function e() {
        var e = t.call(this, LayerManager.UI_TipsNoClick) || this;
        return e.defalut1 = "请输入姓名", e.default2 = "请输入身份证号", e.skinName = "FcmViewSkin", e.showModel = !1, e
    }
    return __extends(e, t), e.prototype.open = function() {
        t.prototype.open.call(this), this.focusToStage(), this.addTouchEvent(this.sureBtn, this.onSure), this.nameInput.prompt = this.defalut1, this.codeInput.prompt = this.default2
    }, e.prototype.onSure = function() {
        var t = this.codeInput.text,
            e = this.nameInput.text;
        return e && "" != e && e != this.defalut1 ? e.length < 2 ? void GlobalFun.SysMsg("您输入的姓名格式不正确") : t && "" != t && t != this.default2 ? void 0 : void GlobalFun.SysMsg("请输入身份证号") : void GlobalFun.SysMsg("请输入姓名")
    }, e
}(BaseEuiWindow);
__reflect(FcmView.prototype, "FcmView");
var FlyItem = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.img = new eui.Image, e.addChild(e.img), e.touchEnabled = e.img.touchEnabled = !1, e.p0 = new egret.Point, e.p1 = new egret.Point, e.p2 = new egret.Point, e
    }
    return __extends(e, t), Object.defineProperty(e.prototype, "source", {
        set: function(t) {
            this.img.source = t
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.flyTo = function(t, e, i, n, r) {
        var o = this;
        this.last = n, o.parent || t.addChild(o), o.x = o.p0.x, o.y = o.p0.y;
        var a = 1100;
        o.alpha = 0, o.scaleX = o.scaleY = .1;
        App.ViewManager.getView(ViewConst.MAINUI);
        egret.Tween.get(o).wait(r).to({
            scaleX: .4,
            scaleY: .4
        }, 500), egret.Tween.get(o).wait(r).to({
            alpha: 1
        }, 100).wait(100).call(this.flyTo2, this, [a]), this.dataId = e, this.value = i
    }, e.prototype.flyTo2 = function(t) {
        App.DisplayUtils.playBezier(this, this.p0.x, this.p0.y, this.p2.x, this.p2.y, this.p1.x, this.p1.y, t, this.onEnd, this)
    }, e.prototype.onEnd = function() {
        App.ViewManager.getView(ViewConst.MAINUI);
        App.DisplayUtils.removeFromParent(this), ObjectPool.push(this)
    }, e.ybFlyTo = function(t, i, n, r, o) {
        var a;
        a = "string" == typeof t ? BigNumberCal.compare(t, "9007199254740992") ? 9007199254740992 : parseFloat(t) : t;
        var s = App.ViewManager.getView(ViewConst.MAINUI);
        if (!s) return void GameCache.data.changeId(n, t);
        var h, l, c = LayerManager.UI_Message,
            p = Math.floor(a / 10),
            u = a / 10,
            d = 10;
        h = "" + RES_DIR_AWARD_ICON + i + ".png";
        e.objTar;
        if (h && l) {
            var f = 0,
                g = 0,
                _ = void 0,
                y = void 0;
            i == AwardType.piggyCoin ? (_ = l.x - 30, y = l.y - 50) : (_ = l.x, y = l.y);
            for (var m = 0; d > m; m++) {
                var v = r || c.width / 2,
                    T = o || c.height / 2;
                v += MathUtils.random(-80, 80), T += MathUtils.random(-80, 80);
                var C = e.createFlyItem(h);
                C.x = v, C.y = T, C.p0.x = C.x, C.p0.y = C.y;
                var E = GlobalFun.globalToLocal(c, _, y);
                if (C.p1.x = v + 200 * (Math.random() > .5 ? -1 : 1), C.p1.y = T - MathUtils.random(40, 60), i == AwardType.animal) {
                    var S = App.StageUtils.getWidth();
                    C.p1.x = v + Math.floor(S / 3.5), C.p1.y = E.y - 50
                }
                C.p2.x = E.x, C.p2.y = E.y;
                var A = 0,
                    M = !1;
                n && (m + 1 == d ? (A = (Math.round(1e3 * a) - Math.round(1e3 * f)) / 1e3, M = !0) : (A = p, 0 == A && (A = Math.floor(g * u), A > 0 ? g = 0 : g++), f += A), C.flyTo(c, n, A, M, 100 * (m + 1)))
            }
        }
    }, e.createFlyItem = function(t) {
        var i = ObjectPool.get(e);
        return i.source = t, i
    }, e.objTar = {}, e
}(egret.DisplayObjectContainer);
__reflect(FlyItem.prototype, "FlyItem");
var MainCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.goldfishCount = 10, e.goldType = 1, e.isShowMelonGui = !1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        App.MessageCenter.addListener(MsgConst.WIN_OPEN, this.onWinOpen, this), App.MessageCenter.addListener(MsgConst.WIN_CLOSE, this.onWinClose, this), App.TimerManager.add(1e3, function() {
            HttpDebugWin.str_i++, HttpDebugWin.str_i >= 300 && (HttpDebugWin.str = "", HttpDebugWin.str_i = 0), App.MessageCenter.dispatch(MsgConst.PERSECOND)
        }, this, 0)
    }, e.prototype.onWinOpen = function() {
        App.FrameHandler.add(this.checkMainOpen, this, !0)
    }, e.prototype.onWinClose = function() {
        App.FrameHandler.add(this.checkMainOpen, this, !0)
    }, e.prototype.checkMainOpen = function() {
        GlobalFun.isMainShow();
        App.MessageCenter.dispatch(MsgConst.MAIN_OPEN, GlobalFun.isMainShow())
    }, e.prototype.setPoint = function(t, e, i) {
        void 0 === i && (i = null)
    }, e.prototype.reLogin = function() {}, e
}(BaseCache);
__reflect(MainCache.prototype, "MainCache");
var MainUI = function(t) {
    function e() {
        var e = t.call(this, LayerManager.UI_Main) || this;
        return e.skinName = "MainUISkin", e.bClickClose = !1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this), this.focusToStage(), this.openInit()
    }, e.prototype.open = function(e) {
        t.prototype.open.call(this, e)
    }, e.prototype.close = function() {
        t.prototype.close.call(this)
    }, e.prototype.removeAllEvent = function() {}, e.prototype.openInit = function() {
        this.addEff()
    }, e.prototype.addEff = function() {}, e.prototype.onTouch = function(t) {}, e.prototype.updateScore = function(t) {
        this.curScoreTx.text = t
    }, e
}(BaseEuiWindow);
__reflect(MainUI.prototype, "MainUI");
var GUIDETYPE;
! function(t) {
    t[t.LUCK = 0] = "LUCK", t[t.TIPS = 1] = "TIPS"
}(GUIDETYPE || (GUIDETYPE = {}));
var FruitCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.playTarget = !1, e.onGuide = !1, e.curFruirMax = 0, e.gameMode = -1, e
    }
    return __extends(e, t), e.prototype.init = function() {}, e
}(BaseCache);
__reflect(FruitCache.prototype, "FruitCache");
var FinalPrizVo = function() {
    function t() {}
    return t
}();
__reflect(FinalPrizVo.prototype, "FinalPrizVo");
var FruitConst = function() {
    function t() {}
    return t.getConfig = function(t) {
        var e = GameConfig.fruit[t];
        return e
    }, t.getConfigType = function(t) {
        if (t == this.allType) return 0;
        if (this.recordType[t]) return this.recordType[t];
        var e = GameConfig.fruit[t];
        if (e) {
            var i = e.Resource,
                n = i.split("_");
            return this.recordType[t] = parseInt(n[1]), this.recordType[t]
        }
    }, t.getRadiu = function(t) {
        var e = 30 + 10 * (t - 1);
        return e > 120 && (e = 120), e
    }, t.getLeafRadiu = function(t) {
        return this.leafRadiusArr[this.getConfigType(t)]
    }, t.getEffScale = function(t) {
        return this.effScale[this.getConfigType(t)]
    }, t.getQuanAction = function(t) {
        return this.quanAction[this.getConfigType(t)]
    }, t.getShawdownScal = function(t) {
        return this.shawdownScal[this.getConfigType(t)]
    }, t.getClearScal = function(t) {
        return this.clearScal[this.getConfigType(t)]
    }, t.getShineSource = function(t) {
        return "fruitEff_json.fruitEff_" + this.shineType[this.getConfigType(t)] + "_png"
    }, t.p2m = 30, t.maxType = 15, t.allType = -1, t.radiusArr = [76, 30, 41, 56, 63, 77, 93, 103, 118, 131, 143, 154], t.leafRadiusArr = [76, 30, 41, 56, 68, 77, 93, 113, 115, 131, 143], t.effScale = [0, .28, .24, .16, .12, .04, 0, -.1, -.2, -.3, -.3], t.quanAction = ["", "cyan", "pink", "yellow", "cyan", "orange", "pink", "yellow", "orange", "orange", "cyan", "pink"], t.shawdownScal = [0, .3, .4, .5, .55, .6, .7, .7, .7, .8, .9, 1, 1.2, 1.2], t.clearScal = [0, .5, .7, .9, .95, 1.05, 1.2, 1.25, 1.65, 1.75, 1.9, 1.9], t.shineType = [0, 2, 4, 1, 3, 1, 4, 1, 1, 1, 3, 3], t.isChange = !1, t.needSort = !1, t.recordType = {}, t
}();
__reflect(FruitConst.prototype, "FruitConst");
var FruitDoubleHit = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.skinName = "FruitDoubleHitSkin", e.horizontalCenter = 0, e.y = 150, e
    }
    return __extends(e, t), e.prototype.init = function(t) {
        this._parent = t
    }, e.prototype.regiView = function(t) {
        this._fuitHit = t
    }, e.prototype.playCount = function(t) {
        if (void 0 === t && (t = 0), !(1 >= t)) {
            this.parent || this._parent.addChild(this), t >= 7 ? this.countNum.type = "num_combo1_" : this.countNum.type = "num_combo_", this.countNum.value = t;
            var e = this.countNum.width;
            100 > e ? this.countNum.horizontalCenter = -50 : e >= 100 && 120 > e ? this.countNum.horizontalCenter = -70 : e >= 120 && 190 > e ? this.countNum.horizontalCenter = -100 : this.countNum.horizontalCenter = -120, this.lianjiEff(this.img3), this.valueEff(this.countNum), this.endPlay()
        }
    }, e.prototype.valueEff = function(t) {
        egret.Tween.removeTweens(t), t.scaleX = t.scaleY = .5, t.alpha = .5, this._fuitHit && this._fuitHit.isPlayEnd(), egret.Tween.get(t).to({
            alpha: 1,
            scaleX: 1.2,
            scaleY: 1.2
        }, 100).to({
            scaleY: 1
        }, 100).to({
            scaleX: 1
        }, 100)
    }, e.prototype.endEff = function(t) {
        App.DisplayUtils.removeFromParent(t), this.countNum.value = 2, ObjectPool.push(t)
    }, e.prototype.lianjiEff = function(t) {
        egret.Tween.removeTweens(t), t.alpha = .8, t.scaleX = t.scaleY = .8, egret.Tween.get(t).to({
            alpha: 1,
            scaleX: 1,
            scaleY: 1
        }, 100)
    }, e.prototype.endPlay = function() {
        egret.Tween.removeTweens(this.g), this.g.scaleX = this.g.scaleY = 1, this.g.alpha = 1, egret.Tween.get(this.g).wait(1e3).to({
            scaleX: 0,
            scaleY: 0,
            alpha: 0
        }, 300, egret.Ease.quadOut).call(this.endEff, this, [this])
    }, e
}(eui.Component);
__reflect(FruitDoubleHit.prototype, "FruitDoubleHit");
var FruitHitText = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._scoreList = [], e._source = {
            3: "good",
            4: "great",
            5: "excellent",
            6: "unbelievable"
        }, e
    }
    return __extends(e, t), e.prototype.init = function(t) {
        this._parent = t, this._playImgArr = [], App.TimerManager.add(100, this.onTimer, this)
    }, e.prototype.onTimer = function() {
        var t = this._scoreList.shift();
        if (t) {
            var e = ObjectPool.get(eui.Label);
            e.textColor = 16777215, e.stroke = 2, e.strokeColor = 0, e.size = 18, e.text = "+" + t[0], e.x = t[1], e.y = t[2] - 20, e.x + e.width > this._parent.width && (e.x = this._parent.width - e.width), e.anchorOffsetX = e.width >> 1, e.anchorOffsetY = e.height >> 1, this._parent.addChild(e), egret.Tween.get(e).wait(200).to({
                y: t[2] - 80
            }, 800), egret.Tween.get(e).to({
                scaleX: 1.4,
                scaleY: 1.4
            }, 200).to({
                scaleX: .8,
                scaleY: .8
            }, 800, egret.Ease.bounceOut).to({
                scaleX: 0,
                scaleY: 0,
                alpha: 0
            }, 200).call(this.playScoreEnd, this, [e])
        }
    }, e.prototype.playCounts = function(t) {
        t > 6 && (t = 6);
        var e = this._source[t];
        e && (App.SoundManager.playEffect(e), this.getImg("hitText_json.main_font_" + e + "1_png", 0, 100), this.getImg("hitText_json.main_font_" + e + "2_png", 0, 190))
    }, e.prototype.getImg = function(t, e, i) {
        void 0 === e && (e = 0), void 0 === i && (i = 0);
        var n = ObjectPool.get(eui.Image);
        n.source = t, n.y = i, n.horizontalCenter = e, this._parent.addChild(n), this._playImgArr.push(n), egret.Tween.get(n).to({
            scaleX: 1.4,
            scaleY: 1.4
        }, 200).to({
            scaleX: 1,
            scaleY: 1
        }, 500, egret.Ease.bounceOut).wait(500).to({
            scaleX: 0,
            scaleY: 0,
            alpha: 0
        }, 300, egret.Ease.quadOut).call(this.playEnd, this, [n])
    }, e.prototype.isPlayEnd = function() {
        if (this._playImgArr && this._playImgArr.length > 0)
            for (var t = 0; t < this._playImgArr.length; t++) {
                var e = this._playImgArr[t];
                e && (egret.Tween.removeTweens(e), this.playEnd(e), t--)
            }
    }, e.prototype.playEnd = function(t) {
        GlobalFun.pushImg(t);
        var e = this._playImgArr.indexOf(t);
        e >= 0 && this._playImgArr.splice(e, 1)
    }, e.prototype.playScore = function(t, e, i) {
        this._scoreList.push([t, e, i])
    }, e.prototype.playScoreEnd = function(t) {
        App.DisplayUtils.removeFromParent(t), t.scaleX = t.scaleY = 1, t.alpha = 1, ObjectPool.push(t)
    }, e
}(egret.HashObject);
__reflect(FruitHitText.prototype, "FruitHitText");
var FruitItem = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.isDrop = !1, e.isSleep = !1, e.isNew = !1, e.isMove = !0, e.shape = new egret.Shape, e.addChild(e.shape), e.content = new eui.Group, e.content.width = e.content.height = 30, e.content.anchorOffsetX = e.content.anchorOffsetY = 15, e.addChild(e.content), e.label = new eui.Label, e.content.addChild(e.label), e.label.horizontalCenter = e.label.verticalCenter = 0, e.label.textColor = 0, e.data = {}, e.touchChildren = !1, e.touchEnabled = !0, e
    }
    return __extends(e, t), e.prototype.create = function(t, e, i, n) {
        this.data.t = i, this.createBody(t, e, i, n), this.createImg(i)
    }, e.prototype.createBody = function(t, e, i, n) {
        this.data.t = i, this.radius = FruitConst.getRadiu(i);
        var r = new Box2D.Dynamics.b2BodyDef;
        r.position.Set(t / 30, e / 30), r.type = Box2D.Dynamics.b2Body.b2_dynamicBody, r.angularDamping = 2;
        var o = n.CreateBody(r),
            a = new Box2D.Collision.Shapes.b2CircleShape(this.radius / FruitConst.p2m),
            s = new Box2D.Dynamics.b2FixtureDef;
        s.density = 2.4, s.restitution = .4, s.friction = .3, s.shape = a, o.CreateFixture(s), o.SetUserData(this), this.body = o
    }, Object.defineProperty(e.prototype, "frition", {
        set: function(t) {
            this.body.GetFixtureList().SetFriction(t)
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.createImg = function(t) {
        this.shape.graphics.clear(), this.label.text = "", t && (this.data.t = t, this.type = t, this.radius = FruitConst.getRadiu(t), this.shape.graphics.lineStyle(2, 0, 1), this.shape.graphics.beginFill(16777214, 1), this.shape.graphics.drawCircle(0, 0, this.radius), this.shape.graphics.endFill(), this.label.text = Math.pow(2, t - 1) + "", this.label.size = Math.floor(this.radius / 30) + 30)
    }, e.prototype.updateInfo = function(t, e, i) {
        if (this.parent) {
            var n = GlobalFun.globalToLocal(this.parent, t, e);
            this.x = n.x, this.y = n.y, this.rotation = i, this.data.r = Math.round(i);
            var r = Math.round(t),
                o = Math.round(e);
            this.data.x != r || this.data.y != o ? (this.data.x = Math.round(t), this.data.y = Math.round(e), FruitConst.isChange = !0, this.isMove = !0) : this.body && (this.isMove = !1)
        }
    }, e.prototype.playClear = function(t) {
        var e = FruitConst.getRadiu(this.type) / FruitConst.getRadiu(7) * 1.2,
            i = ObjectPool.get(eui.Image);
        i.source = "res/image/fruitShine/guang3.png", i.blendMode = egret.BlendMode.ADD, t.topG.addChild(i), i.x = this.x, i.y = this.y, i.anchorOffsetX = 135, i.anchorOffsetY = 135, i.alpha = .8, i.scaleX = i.scaleY = 0, egret.Tween.get(i).to({
            scaleX: e,
            scaleY: e
        }, 700, egret.Ease.cubicOut).call(GlobalFun.pushImg, null, [i]), egret.Tween.get(i).wait(300).to({
            alpha: 0
        }, 400, egret.Ease.cubicOut)
    }, e.prototype.dispose = function() {
        this.body = null, App.DisplayUtils.removeFromParent(this), ObjectPool.push(this), App.TimerManager.removeAll(this)
    }, e
}(BaseCustComponent);
__reflect(FruitItem.prototype, "FruitItem");
var FruitPanel = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.removeList = [], e.createList = [], e.isSeleep = !1, e.dropCount = 0, e.maxLevel = 1, e.lastSaveTime = 0, e.minH = 200, e.warnH = 400, e.hitCounts = 0, e.curLv = 0, e.curH = 0, e.color = [820729, 7461151, 16081701, 16081701, 16081701, 16081701], e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this), this.hitText = new FruitHitText, this.hitText.init(this.topG), App.FrameHandler.add(this.createView, this, !0), this.doubleHitView = new FruitDoubleHit, this.doubleHitView.init(this.topG), this.doubleHitView.regiView(this.hitText), App.MessageCenter.addListener(MsgConst.FRUIT_BEGIN, this.start, this), App.MessageCenter.addListener(MsgConst.FRUIT_END, this.onGameOver, this), this.failedShine = new eui.Image, this.failedShine.touchEnabled = !1, this.failedShine.anchorOffsetX = this.failedShine.anchorOffsetY = 200, this.failedShine.source = "res/image/bg/failed.png", this.topG.addChild(this.failedShine), this.failedShine.visible = !1, this.addForce = new Box2D.Common.Math.b2Vec2
    }, e.prototype.createView = function() {
        GameCache.fruit.width = this.content.width, GameCache.fruit.height = this.content.height, this.warnH = .3 * this.content.height >> 0, this.createWorld(), this.warnShap = new egret.Shape, this.warnShap.graphics.lineStyle(8, 16711680, 1, !1, null, egret.CapsStyle.ROUND, egret.JointStyle.ROUND, 2, [30, 30]), this.warnShap.graphics.moveTo(0, 10), this.warnShap.graphics.lineTo(this.content.width, 10), this.bottomG.addChild(this.warnShap), this.warnShap.visible = !1, this.warnShap.cacheAsBitmap = !0, this.warnShap.y = this.minH, this.drop = new FruitItem, this.drop.touchEnabled = !1, this.drop.visible = !1, this.topG.addChild(this.drop);
        var t = App.stage.stageWidth - this.content.width >> 1,
            e = t + this.content.width;
        this.floor = this.createGround(App.stage.stageWidth / 2 / 30, App.stage.stageHeight / 30, App.stage.stageWidth / 30, .1, 1, .2), this.createGround(t / 30, App.stage.stageHeight / 30, .1, App.stage.stageHeight / 30, 1, 0), this.createGround(e / 30, App.stage.stageHeight / 30, .1, App.stage.stageHeight / 30, 1, 0), this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this), this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageMouseDown, this), this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp, this), this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this), this.initFruit(), this.createDrop(this.fruitInfo.al), this.updateScores()
    }, e.prototype.initFruit = function() {
        this.fruitInfo = GameCache.data.getId(DataId.FRUIT_INFO) || this.initInfo(), this.fruitInfo.needClear && (this.fruitInfo = this.initInfo());
        var t = this.fruitInfo.list.concat();
        this.fruitInfo.list = [];
        for (var e = 0, i = t; e < i.length; e++) {
            var n = i[e];
            this.createBody(n.x, n.y, n.t, n.r, 0)
        }
        if (0 == this.fruitInfo.score && !GameCache.data.getId(DataId.SCORE) && (this.guide = new FruitGuide, this.topG.addChild(this.guide), GameCache.fruit.onGuide = !0, 0 == t.length))
            for (var r = FruitConst.getRadiu(1), o = this.content.height - r, a = (this.content.width - 2 * r) / 4, s = 0; 5 > s; s++) {
                var h = GlobalFun.localToGloabal(this.content, r + s * a, o);
                this.createBody(h.x, h.y, 1, 1, 0)
            }
    }, e.prototype.initInfo = function() {
        var t = new FruitInfo;
        return t.al = 0, t.list = [], t.score = 0, t.needClear = 0, t.hammer = 0, t.lv = 1, t
    }, e.prototype.saveFruit = function() {
        FruitConst.isChange = !1, App.FrameHandler.add(this.onSaveFruit, this, !0)
    }, e.prototype.onSaveFruit = function() {
        GameCache.data.saveId(DataId.FRUIT_INFO, this.fruitInfo)
    }, e.prototype.removeFruit = function(t) {
        t.dispose();
        var e = this.fruitInfo.list.indexOf(t.data);
        e > -1 && this.fruitInfo.list.splice(e, 1), this.saveFruit()
    }, e.prototype.clearAll = function() {
        for (var t = this.world.GetBodyList(); t; t = t.GetNext()) {
            var e = t.GetUserData();
            e instanceof FruitItem && (this.world.DestroyBody(t), e.dispose())
        }
        this.maxLevel = 1, this.fruitInfo = this.initInfo(), this.updateScores()
    }, e.prototype.onStageMouseDown = function(t) {
        GlobalFun.isMainShow() && (GuideForceView.hasView() || this.guide && (this.guide.dispose(), this.guide = null))
    }, e.prototype.onStageMouseMove = function(t) {
        if (GlobalFun.isMainShow() && this.drop.visible) {
            var e = GlobalFun.globalToLocal(this.topG, t.stageX, t.stageY);
            if (e.x < 0 || e.x > this.topG.width || e.y < 0 || e.y > this.topG.height) return;
            e.x < this.drop.radius + 10 ? e.x = this.drop.radius + 10 : e.x + this.drop.radius > this.topG.width - 1 && (e.x = this.topG.width - this.drop.radius - 1), this.drop.x = e.x, egret.Tween.removeTweens(this.drop)
        }
    }, e.prototype.onStageMouseUp = function(t) {
        if (GlobalFun.isMainShow()) {
            var e = GlobalFun.globalToLocal(this.topG, t.stageX, t.stageY);
            if (this.drop.visible) {
                if (e.x < 0 || e.x > this.topG.width || e.y < 0 || e.y > this.topG.height) return;
                if (t.target instanceof BaseBtnEffComponent) return;
                this.fruitInfo.al = 0, this.drop.y = this.minH, this.drop.visible = !1, e.x < this.drop.radius + 10 ? e.x = this.drop.radius + 10 : e.x + this.drop.radius > this.topG.width - 1 && (e.x = this.topG.width - this.drop.radius - 1), e = GlobalFun.localToGloabal(this.topG, e.x, this.drop.y), this.curItem = this.createBody(e.x, e.y, this.drop.type, 0, 1), this.curItem.isDrop = !0;
                var i = FruitConst.getRadiu(this.drop.type) / FruitConst.getRadiu(1);
                this.addForce.x = 0, this.addForce.y = 1e3 * i * i, this.curItem.body.ApplyForce(this.addForce, this.curItem.body.GetWorldCenter()), this.curItem.body.m_force.lock = !0, App.TimerManager.addDelay(800, 1, 1, this.delayCreate, this), this.guide && (this.guide.dispose(), this.guide = null)
            }
        }
    }, e.prototype.onRemove = function(t) {
        this.removeList.push(t.body), t.body = null, this.removeFruit(t), this.fruitInfo.hammer++
    }, e.prototype.createWorld = function() {
        var t = this,
            e = new Box2D.Common.Math.b2Vec2(0, 20);
        this.world = new Box2D.Dynamics.b2World(e, !0), this.contact = new Box2D.Dynamics.b2ContactListener, this.world.SetContactListener(this.contact);
        var i = this;
        this.contact.BeginContact = function(e) {
            var n = e.GetFixtureA().GetBody(),
                r = e.GetFixtureB().GetBody(),
                o = n.GetUserData(),
                a = r.GetUserData(),
                s = i.curItem;
            if (o && o.isNew && o.body && (o.body.m_force.SetZero(), o.body.m_torque = 0, o.isNew = !1), a && a.isNew && a.body && (a.body.m_force.SetZero(), a.body.m_torque = 0, a.isNew = !1), s && s.isDrop && (s == o || s == a)) {
                var h = void 0;
                h = s == o ? a : o, (h || n == i.floor || r == i.floor) && (s.isDrop = !1, t.curItem.body.m_force.lock = !1, GameCache.fruit.onGuide && (GameCache.fruit.onGuide = !1))
            }
            if (o && a && !o.isSleep && !a.isSleep && (o.type == a.type || o.type == FruitConst.allType && a.type != FruitConst.allType && a.type != FruitConst.maxType || a.type == FruitConst.allType && o.type != FruitConst.allType && o.type != FruitConst.maxType)) {
                o.y > a.y ? o.y : a.y, o.y > a.y ? o.x : a.x;
                o.isSleep = !0, a.isSleep = !0, i.playHitEff(o, a)
            }
        }
    }, e.prototype.createGround = function(t, e, i, n, r, o) {
        var a = new Box2D.Dynamics.b2BodyDef;
        a.position.Set(t, e), a.type = Box2D.Dynamics.b2Body.b2_staticBody;
        var s = this.world.CreateBody(a),
            h = Box2D.Collision.Shapes.b2PolygonShape.AsBox(i, n),
            l = new Box2D.Dynamics.b2FixtureDef;
        return l.density = 0, l.restitution = o, l.shape = h, l.friction = r, s.CreateFixture(l), s
    }, e.prototype.createBody = function(t, e, i, n, r, o) {
        void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === o && (o = null);
        var a = ObjectPool.get(FruitItem);
        return this.content.addChild(a), a.scaleX = 1, a.scaleY = 1, a.isSleep = !1, a.isNew = !0, 2 == r ? (a.createImg(i), this.playAt(a, o)) : a.create(t, e, i, this.world), a.updateInfo(t, e, n), a.type > this.maxLevel && this.maxLevel < FruitConst.maxType && (this.maxLevel = a.type), this.fruitInfo.list.push(a.data), 0 != r && this.saveFruit(), FruitConst.needSort = !0, a
    }, e.prototype.loop = function(t) {
        for (var e = 0, i = this.removeList; e < i.length; e++) {
            var n = i[e];
            n && this.world.DestroyBody(n)
        }
        for (var r = 0, o = this.createList; r < o.length; r++) {
            var a = o[r];
            this.createBody(a[0], a[1], a[2], 0, 2, a[3])
        }
        if (this.removeList.length = 0, this.createList.length = 0, !this.isSeleep) {
            this.world.Step(1 / 60, 10, 10);
            for (var s = 999, h = this.world.GetBodyList(); h; h = h.GetNext()) {
                var l = h.GetUserData();
                if (null != l && (l.updateInfo(30 * h.GetPosition().x, 30 * h.GetPosition().y, 180 * h.GetAngle() / Math.PI), !l.isDrop && !l.isSleep && !l.isNew && l.body)) {
                    var c = l.y - l.radius;
                    s > c && (s = c, c <= this.minH && (this.failedItem = l))
                }
            }
            s <= this.minH ? this.gameOver() : (this.clearGameOver(), s <= this.warnH ? this.showWarn() : this.hideWarn());
            var p = App.TimerManager.getSyncTime();
            p - 3e3 > this.lastSaveTime && FruitConst.isChange && (this.saveFruit(), this.lastSaveTime = p), this.curH = s, FruitConst.needSort && (FruitConst.needSort = !1, this.topG.$children.sort(this.onSort))
        }
    }, e.prototype.onSort = function(t, e) {
        return "leaf" == t.name && "leaf" != e.name ? -1 : "leaf" == e.name && "leaf" != t.name ? 1 : 0
    }, e.prototype.useAllType = function() {
        this.drop.visible && this.fruitInfo.al == FruitConst.allType || (this.fruitInfo.al = FruitConst.allType, this.createDrop(this.fruitInfo.al))
    }, e.prototype.delayCreate = function() {
        this.drop.visible || this.createDrop()
    }, e.prototype.createDrop = function(t) {
        void 0 === t && (t = 0), t || (t = this.creadteDropRule(), this.fruitInfo.al = t), this.drop.createImg(t), this.drop.visible = !0, this.drop.x = this.topG.width >> 1, this.drop.y = this.minH, this.drop.scaleX = this.drop.scaleY = .4, egret.Tween.get(this.drop).to({
            scaleX: 1.2,
            scaleY: 1.2
        }, 200, egret.Ease.cubicOut).to({
            scaleX: .8,
            scaleY: .8
        }, 200).to({
            scaleX: 1,
            scaleY: 1
        }, 200), this.saveFruit()
    }, e.prototype.creadteDropRule = function() {
        var t = Math.random(),
            e = 1,
            i = this.fruitInfo.lv;
        return .6 > t ? (e = i / 3 >> 0, i = i / 3 * 2 >> 0) : .8 > t ? (e = 1, i = i / 3 >> 0) : (e = i / 3 * 2 >> 0, i = i), 1 > e && (e = 1), i > this.fruitInfo.lv && (i = this.fruitInfo.lv), 1 >= i && (i = 2), MathUtils.limitInteger(e, i)
    }, e.prototype.playHitEff = function(t, e) {
        var i = this;
        if (e.y + e.radius > this.content.height && t.type != FruitConst.allType && e.type != FruitConst.allType || e.type == FruitConst.allType) {
            var n = t;
            t = e, e = n
        }
        this.removeList.push(t.body), t.body && t.body.SetUserData(null), t.body = null, egret.Tween.get(t).to({
            x: e.x,
            y: e.y
        }, 100, egret.Ease.cubicOut).call(function() {
            var n = GlobalFun.localToGloabal(i.content, e.x, e.y);
            i.createList.push([n.x, n.y, e.type + 1, e]), i.fruitInfo.lv < e.type + 1 && (i.fruitInfo.lv = e.type + 1), i.removeFruit(t)
        }, this)
    }, e.prototype.playAt = function(t, e) {
        this.hitCounts++, this.changeHitcounts(!1);
        var i = t.type;
        this.hitText.playScore(i, t.x, t.y), this.fruitInfo.score += i, this.updateScores();
        var n = this.hitCounts;
        n > 5 && (n = 5), GameCache.fruit.curFruirMax < t.type && (GameCache.fruit.curFruirMax = t.type), e.body && e.body.SetUserData(null), App.TimerManager.addDelay(1, 1, 1, this.checkNext, this, null, null, t, e.body), this.removeFruit(e)
    }, e.prototype.checkNext = function(t, e) {
        var i = GlobalFun.localToGloabal(this.content, t.x, t.y);
        e && (this.removeList.push(e), t.createBody(i.x, i.y, t.type, this.world))
    }, e.prototype.updateScores = function() {
        var t = App.ViewManager.getView(ViewConst.MAINUI);
        t && t.updateScore(this.fruitInfo.score)
    }, e.prototype.changeHitcounts = function(t) {
        t ? this.playHitText(this.hitCounts) : this.playDoubleHit()
    }, e.prototype.playDoubleHit = function(t) {
        void 0 === t && (t = 0), t = t || this.hitCounts, App.TimerManager.remove(this.playHitText, this), App.TimerManager.addDelay(1500, 1, 1, this.playHitText, this)
    }, e.prototype.playHitText = function(t) {
        void 0 === t && (t = 0), t = t || this.hitCounts, this.hitText.playCounts(t), this.hitCounts = 0
    }, e.prototype.showWarn = function() {
        App.TimerManager.isExists(this.onShowWarn, this) || App.TimerManager.addDelay(1e3, 1, 1, this.onShowWarn, this)
    }, e.prototype.onShowWarn = function() {
        this.warnShap.visible || (this.warnShap.visible = !0, this.warnShap.alpha = 1, App.DisplayUtils.flashingObj(this.warnShap, !0, 1e3))
    }, e.prototype.hideWarn = function() {
        App.TimerManager.remove(this.onShowWarn, this), this.warnShap.visible && (this.warnShap.visible = !1, App.DisplayUtils.flashingObj(this.warnShap, !1))
    }, e.prototype.gameOver = function() {
        App.TimerManager.isExists(this.playFailedImg, this) || App.TimerManager.addDelay(3e3, 1, 1, this.playFailedImg, this)
    }, e.prototype.clearGameOver = function() {
        App.TimerManager.remove(this.playFailedImg, this)
    }, e.prototype.playFailedImg = function() {
        if (App.TimerManager.remove(this.createDrop, this), this.drop.visible = !1, this.isSeleep = !0, this.failedShine.visible = !0, this.failedShine.blendMode = egret.BlendMode.ADD, this.failedShine.scaleX = this.failedShine.scaleY = 1, this.failedItem) {
            var t = (this.failedItem.radius + 4) / this.failedShine.anchorOffsetX;
            this.failedShine.x = this.failedItem.x, this.failedShine.y = this.failedItem.y, egret.Tween.get(this.failedShine).to({
                scaleX: t,
                scaleY: t
            }, 2e3).wait(500).call(this.onGameOver, this)
        } else this.onGameOver()
    }, e.prototype.onGameOver = function() {
        this.failedShine.visible = !1, this.isSeleep = !0, this.stop(), this.hideWarn();
        var t = this.fruitInfo.score,
            e = GameCache.data.getId(DataId.SCORE) || 0;
        App.ViewManager.open(ViewConst.FRUIT_RESULT, {
            exData1: t,
            exData2: e
        }), this.fruitInfo.needClear = 1, this.saveFruit(), t > e && GameCache.data.saveId(DataId.SCORE, t)
    }, e.prototype.stop = function() {
        this.isSeleep = !0
    }, e.prototype.start = function() {
        this.curLv = 0, this.clearAll(), this.isSeleep = !1, this.createDrop()
    }, e.prototype.createDebug = function() {
        var t = new egret.Sprite;
        this.addChild(t), this.debug = new Box2D.Dynamics.b2DebugDraw, this.debug.SetSprite(t), this.debug.SetDrawScale(30), this.debug.SetLineThickness(1), this.debug.SetAlpha(.8), this.debug.SetFillAlpha(.5), this.debug.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_aabbBit), this.world.SetDebugDraw(this.debug)
    }, e
}(BaseEuiComponent);
__reflect(FruitPanel.prototype, "FruitPanel");
var FruitInfo = function() {
    function t() {}
    return t
}();
__reflect(FruitInfo.prototype, "FruitInfo");
var FruitGuide = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.skinName = "FruitGuideSkin", e.touchEnabled = e.touchChildren = !1, e.verticalCenter = e.horizontalCenter = 0, e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this), this.focusToStage(), App.TimerManager.add(500, this.eff, this, 1)
    }, e.prototype.focusToStage = function() {
        this.message(MsgConst.RESIZE_STAGE, this.resizeStage), this.resizeStage()
    }, e.prototype.resizeStage = function() {
        this.height = App.StageUtils.getHeight(), this.width = App.StageUtils.getWidth() > 1e3 ? 1e3 : App.StageUtils.getWidth()
    }, e.prototype.eff = function() {
        egret.Tween.removeTweens(this.img1);
        var t = this.imgLeft.x + 120,
            e = this.img2.x;
        this.img1.x = t;
        var i = 8 * Math.round(e - t);
        App.DisplayUtils.tweenProp(this.img1, !0, {
            x: e
        }, {
            x: this.img1.x
        }, i)
    }, e.prototype.dispose = function() {
        t.prototype.dispose.call(this), App.DisplayUtils.tweenProp(this.img1, !1)
    }, e
}(BaseEuiComponent);
__reflect(FruitGuide.prototype, "FruitGuide");
var FruitResultView = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.skinName = "FruitResultViewSkin", e.bClickClose = !1, e.openEff = !1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this)
    }, e.prototype.playCom = function(t) {}, e.prototype.open = function(e) {
        t.prototype.open.call(this, e);
        var i = e.exData1 > e.exData2;
        this.curScoreTx.text = e.exData1, this.maxScoreTx.text = i ? e.exData1 : e.exData2
    }, e.prototype.close = function() {
        t.prototype.close.call(this), App.MessageCenter.dispatch(MsgConst.FRUIT_BEGIN)
    }, e
}(BaseEuiWindow);
__reflect(FruitResultView.prototype, "FruitResultView");
var SettingWin = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.skinName = "SettingWinSkin", e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this), this.copyIdLab.textFlow = TextFlowUtils.generateTextFlow("<(u)复制>"), this.copyQQLab.textFlow = TextFlowUtils.generateTextFlow("<(u)复制>"), this._QQqun = GameConfig.getConstByKey("qq_group")
    }, e.prototype.open = function(e) {
        t.prototype.open.call(this, e), this.message(MsgConst.BIND_WEIXIN, this.onBaseInfo), this.onBaseInfo(), this.addTouchEvent(this, this.onTouch), this._music = GameCache.data.getId(DataId.MUSIC_BG), this._eff = GameCache.data.getId(DataId.MUSIC_EFF), this.setEff(), this.setMusic()
    }, e.prototype.setEff = function() {
        this.effTo.selected = this._eff ? !1 : !0
    }, e.prototype.setMusic = function() {
        this.musicTo.selected = this._music ? !1 : !0
    }, e.prototype.onBaseInfo = function() {}, e.prototype.onTouch = function(t) {
        var e = t.target;
        switch (e) {
            case this.backBtn:
                break;
            case this.feedbackBtn:
                App.ViewManager.open(ViewConst.KEFU);
                break;
            case this.inviteBtn:
                GameCache.wechatShare.share();
                break;
            case this.musicTo:
                this._music = this._music ? 0 : 1, App.SoundManager.setMusicOn(this._music), GameCache.data.saveId(DataId.MUSIC_BG, this._music), this.setMusic();
                break;
            case this.effTo:
                this._eff = this._eff ? 0 : 1, App.SoundManager.setEffectOn(this._eff), GameCache.data.saveId(DataId.MUSIC_EFF, this._eff), this.setEff(), App.SoundManager.playEffect(SoundType.BUTTONCLICK);
                break;
            case this.copyQQLab:
                GlobalFun.copy(this._QQqun + "")
        }
    }, e.prototype.close = function() {
        t.prototype.close.call(this)
    }, e
}(BaseEuiWindow);
__reflect(SettingWin.prototype, "SettingWin");
var SHARETYPE;
! function(t) {
    t[t.SHARE_WECHAT = 1] = "SHARE_WECHAT", t[t.SHARE_FRIND = 2] = "SHARE_FRIND"
}(SHARETYPE || (SHARETYPE = {}));
var WechatShareCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._isShare = !1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.WECHAT_SHARE_BACK, this.onShareBack, this)
    }, e.prototype.share = function(t, e, i) {
        void 0 === t && (t = null), void 0 === e && (e = null), void 0 === i && (i = SHARETYPE.SHARE_WECHAT), this._isShare || t && (this._handler = Handler.create(e, t, [], !0))
    }, e.prototype.startShare = function(t) {
        this._isShare = !0, App.SDKManager.call(SDKMsgConst.WECHAT_SHARE, {
            type: t.type,
            imageUrl: t.icon,
            title: t.title,
            description: t.description,
            url: t.url
        })
    }, e.prototype.onShareBack = function(t) {
        this.onShareOver(t.data), HttpDebugWin.addDTxt("分享结果" + JSON.stringify(t))
    }, e.prototype.onShareOver = function(t) {}, e
}(BaseCache);
__reflect(WechatShareCache.prototype, "WechatShareCache");
var SysTipsCache = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.carouselIndex = 0, e._nextBulletTime = 0, e._key = "", e
    }
    return __extends(e, t), e.prototype.init = function() {
        this.sceneCenter = new SystemTextTips, this.tipsPopupMgr = new TipsPopupMgr, this.barrageTips = new BarrageTips, this.bulletScreen = new BulletScreen
    }, e.prototype.doMessage = function(t, e) {
        switch (void 0 === e && (e = SysMessageType.SYSTEM_SCENE_CENTER), e) {
            case SysMessageType.SYSTEM_SCENE_CENTER:
                this.sceneCenter.text = t, !this.sceneCenter.parent && LayerManager.UI_Message.addChild(this.sceneCenter);
                break;
            case SysMessageType.SYSTEM_BARRAGE:
                this.barrageTips.push(t);
                break;
            case SysMessageType.SYSTEM_BARRAGE_NOW:
                this.barrageTips.push(t, !0)
        }
    }, e.prototype.playBulletScreen = function(t) {}, e.prototype.requestUserName = function() {}, e.prototype.showLuckyDrawBulletScreen = function(t) {
        void 0 === t && (t = !0)
    }, e.prototype.stopBulletScreen = function() {
        App.TimerManager.remove(this.showLuckyDrawBulletScreen, this), this.bulletScreen.clearALl()
    }, e
}(BaseClass);
__reflect(SysTipsCache.prototype, "SysTipsCache");
var SysMessageType;
! function(t) {
    t[t.CHAT_PANEL_RIGHT = 1] = "CHAT_PANEL_RIGHT", t[t.SYSTEM_SCENE_CENTER = 2] = "SYSTEM_SCENE_CENTER", t[t.CHAT_PANEL_SYS = 3] = "CHAT_PANEL_SYS", t[t.SYSTEM_BARRAGE = 4] = "SYSTEM_BARRAGE", t[t.SYSTEM_BARRAGE_NOW = 5] = "SYSTEM_BARRAGE_NOW", t[t.length = 6] = "length"
}(SysMessageType || (SysMessageType = {}));
var BulletScreenType;
! function(t) {
    t[t.LUCKYDRAW = 1] = "LUCKYDRAW", t[t.CASHDRWA = 2] = "CASHDRWA"
}(BulletScreenType || (BulletScreenType = {}));
var BarrageTips = function() {
    function t() {
        this.gap = 60, this.w = 500, this.msgList = [], this.groPool = [], this.playingGro = [], this.group = new eui.Group, this.group.y = 170, this.group.horizontalCenter = 0, this.group.width = this.w, this.groBg = new eui.Image, this.groBg.touchEnabled = !1, this.groBg.source = "mainUI_json.main_pmd_png", this.group.addChild(this.groBg), this._mask = new egret.Shape, this._mask.graphics.beginFill(0, 1), this._mask.graphics.drawRect(0, 0, this.w, 44), this._mask.graphics.endFill(), this._mask.y = this.group.y
    }
    return t.prototype.createGroBg = function(t, e, i) {
        void 0 === i && (i = 16777215);
        var n = this.groPool.shift();
        return null == n && (n = new BarrageTipsGro, n.y = 10), n.currentState = t, n.text = e, n.textColor = i, n.name = "0", n
    }, t.prototype.push = function(t, e) {
        return e ? (this.msgList.unshift(t), this.stopAll(), void this.playNext()) : (this.msgList.push(t), void this.playNext())
    }, t.prototype.stopAll = function() {
        for (var t = 0, e = this.playingGro; t < e.length; t++) {
            var i = e[t];
            App.DisplayUtils.removeFromParent(i), this.groPool.push(i), egret.Tween.removeTweens(i)
        }
        this.playingGro = [], this.stopPlay()
    }, t.prototype.startPlay = function() {
        this.playing || (this._parent = LayerManager.UI_Message, this.playing = !0, this.showBg())
    }, t.prototype.stopPlay = function() {
        this.playing && (this.playing = !1, this.hideBg())
    }, t.prototype.complete1 = function(t) {
        t.name = "1", this.playNext()
    }, t.prototype.complete2 = function(t) {
        var e = this.playingGro.indexOf(t);
        e >= 0 && this.playingGro.splice(e, 1), App.DisplayUtils.removeFromParent(t), this.groPool.push(t), this.playingGro.length <= 0 && this.stopPlay()
    }, t.prototype.playNext = function() {
        if (this.getCanPlayNow()) {
            var t = this.msgList.shift();
            if (t) {
                var e, i, n;
                if (-1 != t.indexOf("$$")) {
                    var r = t.split("$$");
                    if ("99" == r[0]) return;
                    e = r[0], i = r[1]
                } else e = "0", i = t;
                this.startPlay();
                var o = this.createGroBg(e, i, n);
                o.x = this.group.width, this.playingGro.push(o), this.group.addChild(o);
                var a = o.x - o.width - this.gap,
                    s = 7 * (o.x - a),
                    h = -o.width,
                    l = 7 * (a - h);
                egret.Tween.get(o).to({
                    x: a
                }, s).call(this.complete1, this, [o]).to({
                    x: h
                }, l).call(this.complete2, this, [o])
            }
        }
    }, t.prototype.getCanPlayNow = function() {
        var t = this.playingGro.length;
        if (0 == t) return !0;
        var e = this.playingGro[t - 1];
        return "1" == e.name
    }, t.prototype.showBg = function() {
        var t = this.groBg;
        this._parent.addChild(this.group), egret.Tween.removeTweens(t), t.alpha = 0, egret.Tween.get(t).to({
            alpha: 1
        }, 500), this._parent.addChild(this._mask), this._mask.x = App.StageUtils.getWidth() - this._mask.width >> 1, this._mask.y = this.group.y, this.group.mask = this._mask
    }, t.prototype.hideBg = function() {
        var t = this.groBg;
        this.group.parent && (egret.Tween.removeTweens(t), egret.Tween.get(t).to({
            alpha: 0
        }, 500).call(App.DisplayUtils.removeFromParent, null, [this.group]))
    }, t
}();
__reflect(BarrageTips.prototype, "BarrageTips");
var BulletScreen = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._line = {}, e
    }
    return __extends(e, t), e.prototype.addMsg = function(t) {
        var e = ObjectPool.get(egret.TextField);
        e.size = 24, e.textColor = 16777215, e.bold = !0, e.textFlow = TextFlowUtils.parseHTML(t), LayerManager.UI_Message.addChild(e);
        for (var i = 0, n = 0, r = 0; 3 > i; i++) {
            var o = this._line[i];
            if (!o || 0 == o.length) {
                r = i;
                break
            }
            var a = o[o.length - 1],
                s = a.x + a.textWidth;
            (!n || n > s) && (n = s, r = i)
        }
        var h = r + "";
        e.x = App.StageUtils.getWidth(), e.y = 60 * r + 20, e.name = h;
        var l = -e.textWidth,
            c = this._line[h];
        c || (this._line[h] = [], c = this._line[h]), c.push(e), egret.Tween.get(e).to({
            x: l
        }, 6.5 * (e.x - l) >> 0).call(this.onTextEnd, this, [e])
    }, e.prototype.clearALl = function() {
        for (var t in this._line)
            for (var e = this._line[t], i = 0, n = e; i < n.length; i++) {
                var r = n[i];
                egret.Tween.removeTweens(r), ObjectPool.push(r), App.DisplayUtils.removeFromParent(r)
            }
        this._line = {}
    }, e.prototype.onTextEnd = function(t) {
        var e = this._line[t.name];
        if (e) {
            var i = e.indexOf(t);
            e.splice(i, 1)
        }
        App.DisplayUtils.removeFromParent(t), ObjectPool.push(t)
    }, e
}(egret.HashObject);
__reflect(BulletScreen.prototype, "BulletScreen");
var ProChangeTips = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.curShow = [], e._h = 34, e
    }
    return __extends(e, t), e.prototype.addPro = function(t) {
        this.onShow(t)
    }, e.prototype.onShow = function(t) {
        for (var e = 0; e < this.curShow.length; e++) {
            var i = this.curShow[e];
            i.disappear()
        }
        this.curShow.length = 0, App.TimerManager.remove(this.checkClear, this), this.show(t)
    }, e.prototype.show = function(t) {
        0 == this.curShow.length && App.TimerManager.add(50, this.checkClear, this);
        var e = 0,
            i = t.length;
        this.reset(i);
        var n;
        for (this._bottom = 300; i > e; e++) n = ObjectPool.get(ProChangeItem), n.setData(t[e].type, t[e].value), LayerManager.UI_Message.addChild(n), this.curShow.push(n), n.y = this._bottom, n.time = App.TimerManager.getSyncTime() + 2e3, egret.Tween.get(n).to({
            y: this._bottom - (i - e) * this._h
        }, 300)
    }, e.prototype.reset = function(t) {
        for (var e, i = 0, n = this.curShow.length, r = t + n; n > i; i++) e = this.curShow[i], egret.Tween.removeTweens(e), egret.Tween.get(e).to({
            y: this._bottom - (r - i) * this._h
        }, 300)
    }, e.prototype.checkClear = function() {
        if (!this.curShow.length) return void App.TimerManager.remove(this.checkClear, this);
        for (var t = App.TimerManager.getSyncTime(), e = 0; e < this.curShow.length; e++) {
            var i = this.curShow[e];
            i.time <= t && (egret.Tween.removeTweens(i), this.curShow.splice(e, 1), e--, i.disappear())
        }
    }, e
}(BaseClass);
__reflect(ProChangeTips.prototype, "ProChangeTips");
var ProChangeItem = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.touchEnabled = e.touchChildren = !1, e.attName = new eui.Image, e.attName.x = 50, e.attName.y = 4, e.addChild(e.attName), e.attValue = new NumberMC, e.attValue.y = 6, e.addChild(e.attValue), e
    }
    return __extends(e, t), e.prototype.setData = function(t, e) {
        var i = RES.getRes("num_json.pro_type_" + t + "_png");
        this.attName.source = i;
        var n;
        e > 0 ? (this.attValue.updateType("num_json.pro_green_"), n = "+" + e) : (this.attValue.updateType("num_json.pro_red_"), n = e), i && (this.attValue.x = this.attName.x + i.textureWidth + 2, this.attValue.value = n, this.x = 120 - this.attValue.x)
    }, e.prototype.disappear = function() {
        egret.Tween.get(this).to({
            x: -this.width
        }, 300, egret.Ease.sineIn).call(this.dispose, this)
    }, e.prototype.dispose = function() {
        App.DisplayUtils.removeFromParent(this), egret.Tween.removeTweens(this), ObjectPool.push(this)
    }, e
}(egret.DisplayObjectContainer);
__reflect(ProChangeItem.prototype, "ProChangeItem");
var SystemTextTips = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.skinName = "SystemTextTipsSkin", e.horizontalCenter = 0, e.touchEnabled = e.touchChildren = !1, e._init = !1, e
    }
    return __extends(e, t), e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this), this._init = !0, this.text = this._text
    }, Object.defineProperty(e.prototype, "text", {
        set: function(t) {
            this._text = t, this._init && this.txt && (this.txt.textFlow = TextFlowUtils.parseHTML(t), egret.Tween.removeTweens(this), this.alpha = 1, this.y = (App.StageUtils.getHeight() >> 1) + 50, egret.Tween.get(this).to({
                y: this.y - 40
            }, 1500).to({
                alpha: 0
            }, 500).call(this.remove, this))
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.remove = function() {
        App.DisplayUtils.removeFromParent(this)
    }, e
}(eui.Component);
__reflect(SystemTextTips.prototype, "SystemTextTips");
var SysTips = function(t) {
    function e() {
        var e = t.call(this, LayerManager.UI_Message) || this;
        return e.skinName = "SysTipsSkin", e.horizontalCenter = 1, e.verticalCenter = 1, e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this)
    }, e.prototype.open = function(e) {
        t.prototype.open.call(this), this.initData(e), this.setWinTitleHold("hint2"), this.addTouchEvent(this.btn0, this.closeFunc), this.addTouchEvent(this.btn1, this.onCLick), this.addEvent(egret.Event.CHANGE, this.chkTips, this.onChkTipsClick), this.tipsType = e.exData1.tipsType;
        var i = e.exData1.btnIco;
        i ? (i[0] && (this.btn0.icon = i[0]), i[1] && (this.btn1.icon = i[1])) : (this.btn0.icon = "win_json.win_cancel_png", this.btn1.icon = "win_json.win_confirm_png"), this.currentState = this.getAlertState(e.exData1.state), App.TimerManager.remove(this.onAutoTimer, this), e.exData1.auto ? (App.TimerManager.add(1e3, this.onAutoTimer, this, 0), this.autoTime = e.exData1.auto[0], this.autoType = e.exData1.auto[1], this.showAutoTime()) : this.autoTx.text = ""
    }, e.prototype.onAutoTimer = function() {
        this.autoTime--, this.showAutoTime(), this.autoTime <= 0 && (App.TimerManager.remove(this.onAutoTimer, this), 1 == this.autoType ? this.onCLick() : this.closeFunc())
    }, e.prototype.showAutoTime = function() {}, e.prototype.getAlertState = function(t) {
        switch (t) {
            case 1:
                return "single";
            case 2:
                return "normal";
            case 3:
                return "normal2";
            case 4:
                return "normal3"
        }
        return "normal"
    }, e.prototype.onChkTipsClick = function(t) {
        this.tipsType && this.chkTips
    }, e.prototype.closeFunc = function() {
        this.cancle && this.cancle.run(), this.closeView()
    }, e.prototype.close = function(e) {
        t.prototype.close.call(this), this.handler && (this.handler.dispose(), this.handler = null)
    }, e.prototype.initData = function(t) {
        this.desc.textFlow = TextFlowUtils.parseHTML(t.exData1.desc), this.handler && this.handler.dispose(), this.handler = Handler.create(t.exData1.thisc, t.exData1.func, t.exData1.arg || [], !1), this.cancle && this.cancle.dispose(), this.cancle = Handler.create(t.exData1.thisc2, t.exData1.func2, t.exData1.arg2 || [], !1)
    }, e.prototype.onCLick = function() {
        this.handler && this.handler.run(), this.closeView()
    }, e
}(BaseEuiWindow);
__reflect(SysTips.prototype, "SysTips");
var TipsPopupMgr = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.banOffY = -2.5, e._nTime = 0, e._h = 24, e._bottom = 300, e.showList = [], e.msgList = [], e.pool = [], e.banList = [], e.banPool = [], App.TimerManager.addFrame(1, e.onFrame, e), e
    }
    return __extends(e, t), e.prototype.pushStr = function(t) {
        this.msgList.push(t)
    }, e.prototype.onFrame = function() {
        var t, e, i = App.TimerManager.getSyncTime();
        i >= this._nTime && this.msgList.length > 0 && (t = this.createTx(this.msgList.shift()), e = this.banPool.pop(), e || (e = new eui.Image("win_json.win_xt_png")), e.touchEnabled = !1, e.height = this._h - 2, this.showList.unshift(t), this.banList.unshift(e), this._nTime = i + 90, t.y = this._bottom + this._h, t.x = App.StageUtils.getWidth() >> 1, e.horizontalCenter = 0, e.y = this._bottom + this._h - this.banOffY, LayerManager.UI_Message.addChildAt(e, 0), LayerManager.UI_Message.addChild(t));
        for (var n = 0, r = this.showList.length; r > n; n++) {
            var o = this.showList[n],
                a = this.banList[n];
            i >= o.aTime || n >= 8 ? (this.removeTx(o), this.removeBan(a), this.banList.splice(n, 1), this.showList.splice(n, 1), n--, r--) : (t && (egret.Tween.removeTweens(o), t == o ? egret.Tween.get(o).to({
                y: this._bottom - n * this._h,
                alpha: 1
            }, 120) : (o.alpha = 1, egret.Tween.get(o).to({
                y: this._bottom - n * this._h
            }, 120))), e && (egret.Tween.removeTweens(a), e == a ? egret.Tween.get(a).to({
                y: this._bottom - n * this._h - this.banOffY,
                alpha: 1
            }, 120) : (a.alpha = 1, egret.Tween.get(a).to({
                y: this._bottom - n * this._h - this.banOffY
            }, 120))))
        }
    }, e.prototype.createTx = function(t) {
        var e = this.pool.pop();
        return e || (e = new CenterTipsItem), e.text = t, e.aTime = App.TimerManager.getSyncTime() + 2500, e.bTime = App.TimerManager.getSyncTime() + 2e3, e.alpha = 0, e
    }, e.prototype.removeBan = function(t) {
        App.DisplayUtils.removeFromParent(t), egret.Tween.removeTweens(t), this.banPool.push(t)
    }, e.prototype.removeTx = function(t) {
        App.DisplayUtils.removeFromParent(t), egret.Tween.removeTweens(t), this.pool.push(t)
    }, e
}(BaseClass);
__reflect(TipsPopupMgr.prototype, "TipsPopupMgr");
var BarrageTipsGro = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.skinName = "BarrageTipsSkin", e
    }
    return __extends(e, t), e.prototype.childrenCreated = function() {
        t.prototype.childrenCreated.call(this), this.touchEnabled = !1, this.touchChildren = !1
    }, Object.defineProperty(e.prototype, "text", {
        set: function(t) {
            this.content.textFlow = TextFlowUtils.parseHTML(t)
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "textColor", {
        set: function(t) {
            this.content.textColor = t
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.dispose = function() {
        t.prototype.dispose.call(this)
    }, e.prototype.onLink = function(t) {
        TextFlowUtils.hrefType(t.text)
    }, e
}(BaseCustComponent);
__reflect(BarrageTipsGro.prototype, "BarrageTipsGro");
var CenterTipsItem = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.decsTxt = App.DisplayUtils.newTextField("", 84, 4, 16373546, "left", 18), e.decsTxt.stroke = 1, e.decsTxt.strokeColor = 0, e.decsTxt.lineSpacing = 5, e.addChild(e.decsTxt), e.touchEnabled = e.touchChildren = !1, e
    }
    return __extends(e, t), Object.defineProperty(e.prototype, "text", {
        set: function(t) {
            this.decsTxt.textFlow = TextFlowUtils.parseHTML(t);
            var e = this.decsTxt.width;
            126 > e && (e = 126), this.decsTxt.x = -this.decsTxt.width >> 1, this.width = this.decsTxt.textWidth
        },
        enumerable: !0,
        configurable: !0
    }), e
}(egret.DisplayObjectContainer);
__reflect(CenterTipsItem.prototype, "CenterTipsItem");
var WinTips = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.skinName = "WintipsSkin", e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this)
    }, e.prototype.open = function(e) {
        t.prototype.open.call(this, e);
        var i = GameConfig.getLang(e.exData1);
        i && i != e.exData1 ? this.contentLab.textFlow = TextFlowUtils.parseHTML(i) : this.contentLab.textFlow = TextFlowUtils.parseHTML("暂无此说明！"), this.scroll.viewport.scrollV = 0
    }, e
}(BaseEuiWindow);
__reflect(WinTips.prototype, "WinTips");
var WinTipsIcon = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.skinName = "WinTipsIconSkin", e
    }
    return __extends(e, t), e.prototype.init = function() {
        t.prototype.init.call(this), this.addTouchEvent(this, this.onTouch), App.DisplayUtils.addClickEff(this.g)
    }, e.prototype.onTouch = function() {
        App.ViewManager.open(ViewConst.WIN_TIPS, {
            exData1: this.name
        })
    }, e.prototype.dispose = function() {
        t.prototype.dispose.call(this), App.DisplayUtils.removeClickEff(this.g)
    }, e
}(BaseCustComponent);
__reflect(WinTipsIcon.prototype, "WinTipsIcon");
var GameCache;
! function(t) {
    function e() {
        t.data = new DataCache, t.main = new MainCache, t.server = new ServerCache, t.ad = new AdCache, t.sysTips = new SysTipsCache, t.award = new AwardCache, t.fruit = new FruitCache, t.wechatShare = new WechatShareCache, t.fcm = new FcmCache
    }
    t.init = e
}(GameCache || (GameCache = {}));
var GameConfig = function() {
    function t() {}
    return t.getConstByKey = function(e) {
        var i = t["const"];
        return i || GlobalFun.postError("JSON-E " + ConfigCache.nameList), i[e] && i[e].constant
    }, t.getLang = function(t) {
        var e = ConfigCache.getConfig("config_string");
        return e && e[t] && e[t].Text || t
    }, Object.defineProperty(t, "const", {
        get: function() {
            return ConfigCache.getConfig("config_universal")
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "fruit", {
        get: function() {
            return ConfigCache.getConfig("config_balls")
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "fountain", {
        get: function() {
            return ConfigCache.getConfig("config_fountain")
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "difficulty", {
        get: function() {
            return ConfigCache.getConfig("config_difficulty")
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "fruitmachine", {
        get: function() {
            return ConfigCache.getConfig("config_fruitmachine")
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t, "explore", {
        get: function() {
            return ConfigCache.getConfig("config_explore")
        },
        enumerable: !0,
        configurable: !0
    }), t.isRead = !1, t
}();
__reflect(GameConfig.prototype, "GameConfig");
var ModuleManager = function() {
    function t() {}
    return t.initView = function() {
        this.register(ViewConst.LOADING, LoadingPage), this.register(ViewConst.MAINUI, MainUI), this.register(ViewConst.ALERT, AlertView), this.register(ViewConst.HTTPDEBUG, HttpDebugWin), this.register(ViewConst.FRUIT_RESULT, FruitResultView), this.register(ViewConst.FCM_TIPS, FcmTips), this.register(ViewConst.FCM_VIEW, FcmView), this.register(ViewConst.WIN_TIPS, WinTips), this.register(ViewConst.COMMENTIPS, CommenTipsView), this.register(ViewConst.SETTING, SettingWin)
    }, t.initCache = function() {}, t.register = function(t, e) {
        App.ViewManager.register(t, e)
    }, t
}();
__reflect(ModuleManager.prototype, "ModuleManager");
var MsgConst = function() {
    function t() {}
    return t.ONLOADING = "ONLOADING", t.RESIZE_STAGE = "RESIZE_STAGE", t.RECONNECTED = "RECONNECTED", t.CREATE_ROLE_ERROR = "CREATE_ROLE_ERROR", t.DATA = "DATA_", t.SDK_CALL = "SDK_CALL_", t.WIN_OPEN = "WIN_OPEN", t.WIN_CLOSE = "WIN_CLOSE", t.MAIN_OPEN = "MAIN_OPEN", t.BIND_WEIXIN = "BIND_WEIXIN", t.FRUIT_BEGIN = "FRUIT_BEGIN", t.WITHDRAWAL = "WITHDRAWAL", t.FRUIT_END = "FRUIT_END", t.FRUIT_TARGET_SHOW = "FRUIT_TARGET_SHOW", t.PIGGYCOIN = "PIGGYCOIN", t.FOUNTAIN_UPDATE = "FOUNTAIN_UPDATE", t.FINALPRIZE = "FINALPRIZE", t.LUCKYRED_UPDATE_INDEX = "LUCKYRED_UPDATE_INDEX", t.PERSECOND = "PERSECOND", t.LUCKPRIZE = "LUCKPRIZE", t.LUCKCRAB = "LUCKCRAB", t.TASK = "TASK", t.SIGN = "SIGN", t.GOLDFISH = "GOLDFISH", t.SIGNGUI = "SIGNGUI", t.ICONEFF = "ICONEFF", t.SETANIMAL = "SETANIMAL", t.RANKSCORE = "RANKSCORE", t.FM_WELFARE = "FM_WELFARE", t.EXPLORER_INFO = "EXPLORER_INFO", t.EXPLORER_UPDATE = "EXPLORER_UPDATE", t.ULTIMATEGOAL_INFO = "ULTIMATEGOAL_INFO", t.REDTASK_INFO = "REDTASK_INFO", t.PHONENUM = "PHONENUM", t
}();
__reflect(MsgConst.prototype, "MsgConst");
var ViewConst;
! function(t) {
    t[t.MAINUI = 1] = "MAINUI", t[t.WITHDRAEAL = 2] = "WITHDRAEAL", t[t.EXPLORER = 3] = "EXPLORER", t[t.LUCKDRAW = 4] = "LUCKDRAW", t[t.FRUITMACHINE = 5] = "FRUITMACHINE", t[t.RANKING = 6] = "RANKING", t[t.SCREENWIN = 999999] = "SCREENWIN", t[t.LOADING = 1e6] = "LOADING", t[t.ALERT = 1000001] = "ALERT", t[t.HTTPDEBUG = 1000002] = "HTTPDEBUG", t[t.SETTING = 1000003] = "SETTING", t[t.NOTICE = 1000004] = "NOTICE", t[t.WIN_TIPS = 1000005] = "WIN_TIPS", t[t.KEFU = 1000006] = "KEFU", t[t.SIGNIN = 1000007] = "SIGNIN", t[t.TASK = 1000008] = "TASK", t[t.FRUIT_RESULT = 1000009] = "FRUIT_RESULT", t[t.FRUIT_TARGET = 1000010] = "FRUIT_TARGET", t[t.PASS_RED = 1000011] = "PASS_RED", t[t.LUCKY_RED = 1000012] = "LUCKY_RED", t[t.NEWBIE_RED = 1000013] = "NEWBIE_RED", t[t.FOUNTAIN = 1000014] = "FOUNTAIN", t[t.FOUNTAIN_TIPS = 1000015] = "FOUNTAIN_TIPS", t[t.FINALPRIZE = 1000016] = "FINALPRIZE", t[t.AWARD_TONGYONG = 1000017] = "AWARD_TONGYONG", t[t.AWARD_CHEST = 1000018] = "AWARD_CHEST", t[t.AWARD_ANIMAL = 1000019] = "AWARD_ANIMAL", t[t.AWARD_BOXEXCESSIVE = 1000020] = "AWARD_BOXEXCESSIVE", t[t.AWARD_DIRECT = 1000021] = "AWARD_DIRECT", t[t.WITHDRAEAL_RECORD = 1000022] = "WITHDRAEAL_RECORD", t[t.WITHDRAEAL_SUCCES = 1000023] = "WITHDRAEAL_SUCCES", t[t.WITHDRAEAL_CASHRED = 1000024] = "WITHDRAEAL_CASHRED", t[t.WITHDRAEAL_FAIL = 1000025] = "WITHDRAEAL_FAIL", t[t.WITHDRAEAL_TIPS = 1000026] = "WITHDRAEAL_TIPS", t[t.PIGGYBANK = 1000027] = "PIGGYBANK", t[t.SEVENAVT = 1000028] = "SEVENAVT", t[t.COMMENTIPS = 1000029] = "COMMENTIPS", t[t.GOLDFISH = 1000030] = "GOLDFISH", t[t.ANIMALATLAS = 1000031] = "ANIMALATLAS", t[t.FCM_VIEW = 1000032] = "FCM_VIEW", t[t.FCM_TIPS = 1000033] = "FCM_TIPS", t[t.FRUITMACHINE_EXPLAIN = 1000034] = "FRUITMACHINE_EXPLAIN", t[t.FRUITMACHINE_BUY = 1000035] = "FRUITMACHINE_BUY", t[t.ULTIMATEGOAL = 1000036] = "ULTIMATEGOAL", t[t.ULTIMATEgOAL_TIPS = 1000037] = "ULTIMATEgOAL_TIPS", t[t.REDTASKWIN = 1000038] = "REDTASKWIN", t[t.PHONEBILL_EXCHAGE = 1000039] = "PHONEBILL_EXCHAGE", t[t.PHONEBILL_BIND = 1000040] = "PHONEBILL_BIND", t[t.EXPLOERE_COIN = 1000041] = "EXPLOERE_COIN"
}(ViewConst || (ViewConst = {}));
var ViewManager = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e._viewCl = {}, e._winBuff = [], e._viewCl = {}, e._views = {}, e._opens = [], e._opened = {}, e
    }
    return __extends(e, t), e.prototype.register = function(t, e) {
        this._viewCl[t] = e
    }, e.prototype.clear = function() {
        this.closeAll(), this._views = {}, this._winBuff = []
    }, e.prototype.destroy = function(t) {
        var e = this._views[t];
        e && (e.destroy(), delete this._views[t], e = null)
    }, e.prototype.destroyView = function() {
        var t = this._views,
            e = this._opens;
        for (var i in t) {
            var n = t[i]; - 1 == e.indexOf(parseInt(i)) && n.addDelayDestroy && n.addDelayDestroy()
        }
    }, e.prototype.open = function(t, e, i) {
        void 0 === e && (e = null), void 0 === i && (i = -1);
        var n, r;
        e && (n = e.firIndex, r = e.secIndex);
        var o = t;
        "string" != typeof t && (o = ViewConst[t]), "string" == typeof t && (t = parseInt(t) || ViewConst[t]);
        var a = this.getView(t);
        return null != a ? a.isShow() ? (a.resetOpen(e), a) : (t < ViewConst.SCREENWIN && (this.closeAll(), t != ViewConst.MAINUI && this.close(ViewConst.MAINUI)), a.addToParent.call(a, e), a.openView.call(a, e), -1 == this._opens.indexOf(t) && this._opens.push(t), App.MessageCenter.dispatch(MsgConst.WIN_OPEN, t), a) : void 0
    }, e.prototype.recoredWin = function(t, e, i) {
        void 0 === e && (e = 0), void 0 === i && (i = 0), "string" != typeof t && (t = ViewConst[t]), this.backOpen || (this.backOpen = new ViewProp), this.backOpen.key = t, this.backOpen.firIndex = e, this.backOpen.secIndex = i
    }, e.prototype.close = function(t, e) {
        if (void 0 === e && (e = null), "string" == typeof t && (t = parseInt(t) || ViewConst[t]), t != this.backOpen && this.backOpen && (this.backOpen = null), this.isShow(t)) {
            var i = this.getView(t);
            if (null != i) {
                var n = this._opens.indexOf(t);
                return n >= 0 && this._opens.splice(n, 1), i.removeFromParent(), i.close.call(i, e), t < ViewConst.SCREENWIN && t != ViewConst.MAINUI && this.open(ViewConst.MAINUI, null, 1), App.MessageCenter.dispatch(MsgConst.WIN_CLOSE, t), !0
            }
        }
    }, e.prototype.recordOpendWin = function(t) {}, e.prototype.recordOpenWin = function(t) {
        this._opened[t] || (this._opened[t] = !0)
    }, e.prototype.toggle = function(t, e) {
        void 0 === e && (e = null), this.isShow(t) ? this.close(t, e) : this.open(t, e)
    }, e.prototype.getView = function(t) {
        "string" == typeof t && (-1 != t.indexOf("#") && (t = t.split("#")[0]), t = parseInt(t) || ViewConst[t]);
        var e = this._views[t];
        if (e) return e;
        var i = this._viewCl[t];
        return i && (e = new i, e.viewKey = t, this._views[t] = e), e
    }, e.prototype.getViewCl = function(t) {
        return this._viewCl[t]
    }, e.prototype.openParm = function(t, e, i) {
        var n;
        n = new ViewProp, n.exData1 = e, n.exData2 = i, this.open(t, n)
    }, e.prototype.closeAll = function(t) {
        void 0 === t && (t = !0);
        for (var e = this._opens.length; e;) e--, this._opens[e] != ViewConst.MAINUI && this.close(this._opens[e])
    }, e.prototype.pushWinBuff = function(t, e) {
        this._winBuff.push([t, e])
    }, e.prototype.cleanWinBuff = function() {
        this._winBuff = []
    }, e.prototype.currOpenNum = function() {
        return this._opens.length
    }, e.prototype.isShow = function(t) {
        return -1 != this._opens.indexOf(t)
    }, e.prototype.bOpened = function(t) {
        return this._opened[t] ? this._opened[t] : !1
    }, e
}(BaseClass);
__reflect(ViewManager.prototype, "ViewManager");
var ViewProp = function() {
    function t() {
        this.key = 0, this.firIndex = 0, this.secIndex = 0
    }
    return t
}();
__reflect(ViewProp.prototype, "ViewProp");
var API = function() {
    function t() {}
    return t
}();
__reflect(API.prototype, "API");
var HttpManager = function(t) {
    function e() {
        var e = null !== t && t.apply(this, arguments) || this;
        return e.recog = 0, e.waitDic = {}, e.dic = {}, e
    }
    return __extends(e, t), e.prototype.init = function() {
        App.MessageCenter.addListener(MsgConst.SDK_CALL + SDKMsgConst.MAKE_SIGB_BACK, this.onSignBack, this)
    }, e.prototype.onSignBack = function(t) {
        var e = t.data,
            i = this.waitDic[e.key];
        i && (delete this.waitDic[e.key], i[1].sign = e.sign, this.send(i[0], i[1], i[2], i[3], i[4]))
    }, e.prototype.request = function(t, e, i, n, r) {}, e.prototype.send = function(t, e, i, n, r) {}, e
}(BaseClass);
__reflect(HttpManager.prototype, "HttpManager");
var CreateRoleScene = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.onEnter = function() {
        t.prototype.onEnter.call(this), this.addLayer(LayerManager.UI_Main), this.addLayer(LayerManager.UI_Win), this.addLayer(LayerManager.UI_Tips)
    }, e.prototype.onExit = function() {
        t.prototype.onExit.call(this)
    }, e
}(BaseScene);
__reflect(CreateRoleScene.prototype, "CreateRoleScene");
var LoadingScene = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.onEnter = function() {
        t.prototype.onEnter.call(this), this.addLayer(LayerManager.UI_Win), this.addLayer(LayerManager.UI_TipsNoClick), this.addLayer(LayerManager.UI_Tips), this.addLayer(LayerManager.UI_Message), App.ViewManager.open(ViewConst.LOADING)
    }, e.prototype.onExit = function() {
        t.prototype.onExit.call(this)
    }, e
}(BaseScene);
__reflect(LoadingScene.prototype, "LoadingScene");
var MainScene = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t), e.prototype.onEnter = function() {
        t.prototype.onEnter.call(this), this.addLayer(LayerManager.UI_Main), this.addLayer(LayerManager.UI_Main2), this.addLayer(LayerManager.UI_Win), this.addLayer(LayerManager.UI_TipsNoClick), this.addLayer(LayerManager.UI_Tips), this.addLayer(LayerManager.UI_Message), this.addLayer(LayerManager.UI_Guide), App.ViewManager.open(ViewConst.LOADING)
    }, e.prototype.onExit = function() {
        t.prototype.onExit.call(this)
    }, e
}(BaseScene);
__reflect(MainScene.prototype, "MainScene");