! function(e) {
    var t = function() {
        function e() {}
        return e.fieldChanged = new Phaser.Signal, e.linesCleared = new Phaser.Signal, e.restartNeeded = new Phaser.Signal, e.moveDone = new Phaser.Signal, e.newAchieveRequest = new Phaser.Signal, e.achieveUnlocked = new Phaser.Signal, e.continueSignal = new Phaser.Signal, e.achieveSignal = new Phaser.Signal, e.onScoreChange = new Phaser.Signal, e.onPause = new Phaser.Signal, e.onStateChange = new Phaser.Signal, e.onMusicChange = new Phaser.Signal, e.onSfxChange = new Phaser.Signal, e.onMonthChange = new Phaser.Signal, e.onMonthArrowPress = new Phaser.Signal, e.onDayButtonPress = new Phaser.Signal, e.onPopUpButtonPress = new Phaser.Signal, e.UIButtonPress = new Phaser.Signal, e.secondPass = new Phaser.Signal, e.saveDay = new Phaser.Signal, e.onHintUsed = new Phaser.Signal, e.levelPassed = new Phaser.Signal, e.tutorialProcess = new Phaser.Signal, e
    }();
    e.GameEvent = t
}(TProject || (TProject = {}));
var __extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i(i, o, s, a, n, h) {
            var r = t.call(this, i, o, s) || this;
            return r._opened = !1, r._achieveValue = 120, r._type = n, r._id = a, r._subid = h, r._achieveValue = e.Boot.gameConfig.achievementReward, r._back = r.game.make.sprite(0, 0, "gameAssets", "achieveBack"), r._back.alpha = .1, r._icon = r.game.make.sprite(50, r._back.height / 2, "gameAssets", "achievmentIcon"), r._icon.anchor.set(.5, .5), r._coinIcon = r.game.make.sprite(r._back.width / 2 - 120, r._back.height / 2, "gameAssets", "coin"), r.initTexts(), r._newText.anchor.set(.5, .5), r._newText.rotation = -8 / 180 * Math.PI, r.addChild(r._back), r.addChild(r._icon), r.addChild(r._coinIcon), r.addChild(r._coinText), r.addChild(r._title), r.addChild(r._newText), r._newText.visible = !1, r.initAchievement(r.game.renderer.type == Phaser.CANVAS), e.GameEvent.achieveSignal.add(r.checkAchieve, r), r
        }
        return __extends(i, t), Object.defineProperty(i.prototype, "id", {
            get: function() {
                return this._id
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "titleText", {
            get: function() {
                return this._title.text
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "titleFrameName", {
            get: function() {
                return this._titleFrameName
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "coinText", {
            get: function() {
                return this._coinText.text
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "isOpened", {
            get: function() {
                return this._opened
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "iconFrameName", {
            get: function() {
                return this._icon.frameName
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.initTexts = function() {
            if (this.game.renderer.type != Phaser.CANVAS) {
                var t = "";
                switch (this._type) {
                    case e.AchieveManager.MEDAL:
                        t = "medal";
                        break;
                    case e.AchieveManager.TOTALLINES:
                        t = "clearLine";
                        break;
                    case e.AchieveManager.LINESATONCE:
                        t = "linesAtOnce";
                        break;
                    case e.AchieveManager.LINESINROW:
                        t = "linesAtRow";
                        break;
                    case e.AchieveManager.CYANCOUNT:
                        t = "0";
                        break;
                    case e.AchieveManager.PINKCOUNT:
                        t = "1";
                        break;
                    case e.AchieveManager.REDCOUNT:
                        t = "2";
                        break;
                    case e.AchieveManager.ORANGECOUNT:
                        t = "3";
                        break;
                    case e.AchieveManager.YELLOWCOUNT:
                        t = "4";
                        break;
                    case e.AchieveManager.ICECOUNT:
                        t = "5";
                        break;
                    case e.AchieveManager.GREENCOUNT:
                        t = "6";
                        break;
                    case e.AchieveManager.BLUECOUNT:
                        t = "7";
                        break;
                    case e.AchieveManager.VIOLETCOUNT:
                        t = "8";
                        break;
                    case e.AchieveManager.PURPLECOUNT:
                        t = "9";
                        break;
                    case e.AchieveManager.TOTALCOINS:
                        t = "coinsCollect";
                        break;
                    case e.AchieveManager.CONTINUEDGAMES:
                        t = "continuedGames"
                }
                this._titleFrameName = t + this._subid, this._title = this.game.make.sprite(this._coinIcon.x, 5, "menuTextAtlas", t + this._subid), this._title.tint = "#000000", this._coinText = this.game.make.sprite(this._coinIcon.x + this._coinIcon.width + 5, this._coinIcon.y, "menuTextAtlas", "achieveReward"), this._newText = this.game.make.sprite(this._icon.x + 30, this._icon.y - 30, "menuTextAtlas", "newText")
            } else this._title = this.game.make.text(this._coinIcon.x, 5, "Achievement title", {
                font: "24px " + e.Boot.fontName,
                fill: "#000000"
            }), this._coinText = this.game.make.text(this._coinIcon.x + this._coinIcon.width + 5, this._coinIcon.y, this._achieveValue + "", {
                font: "24px " + e.Boot.fontName,
                fill: "#000000"
            }), this._newText = this.game.make.text(this._icon.x + 30, this._icon.y - 30, "new!", {
                font: "24px " + e.Boot.fontName,
                fill: "#f57f17",
                stroke: "#ffeb3b",
                strokeThickness: 2
            })
        }, i.prototype.setAsNew = function() {
            this._newText.scale.set(1, 1), this.game.add.tween(this._newText.scale).to({
                x: .9,
                y: .9
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this._newText.visible = !0
        }, i.prototype.unsetAsNew = function() {
            this.game.tweens.removeFrom(this._newText.scale), this._newText.visible = !1
        }, i.prototype.openIt = function(t) {
            void 0 === t && (t = !1), t && (this._opened = !0, this._icon.alpha = 1, this._coinText.alpha = 1, this._coinIcon.alpha = 1, this._title.alpha = 1, e.Boot.addMoney(this._achieveValue), e.GameEvent.achieveSignal.remove(this.checkAchieve, this), e.Boot.achieveManager.addAchieveToShow(this._id))
        }, i.prototype.checkAchieve = function() {
            if (this._opened) e.GameEvent.achieveSignal.remove(this.checkAchieve, this);
            else switch (this._type) {
                case e.AchieveManager.MEDAL:
                    this.openIt(e.Boot.gameConfig.medalsAchievesCount[this._subid] <= e.Boot.highScorePoints);
                    break;
                case e.AchieveManager.TOTALLINES:
                    this.openIt(e.Boot.gameConfig.clearLinesAchieve[this._subid] <= e.Boot.totalLinesRemoved);
                    break;
                case e.AchieveManager.LINESATONCE:
                    this.openIt(e.Boot.gameConfig.linesAtOnceAchieve[this._subid] <= e.Boot.removedLinesAtOnce);
                    break;
                case e.AchieveManager.LINESINROW:
                    this.openIt(e.Boot.gameConfig.linesAtRowAchieve[this._subid] <= e.Boot.removedLinesAtRow);
                    break;
                case e.AchieveManager.CYANCOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.cyanBlocksDestroyed);
                    break;
                case e.AchieveManager.PINKCOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.pinkBlocksDestroyed);
                    break;
                case e.AchieveManager.REDCOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.redBlocksDestroyed);
                    break;
                case e.AchieveManager.ORANGECOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.orangeBlocksDestroyed);
                    break;
                case e.AchieveManager.YELLOWCOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.yellowBlocksDestroyed);
                    break;
                case e.AchieveManager.ICECOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.iceBlocksDestroyed);
                    break;
                case e.AchieveManager.GREENCOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.greenBlocksDestroyed);
                    break;
                case e.AchieveManager.BLUECOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.blueBlocksDestroyed);
                    break;
                case e.AchieveManager.VIOLETCOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.violetBlocksDestroyed);
                    break;
                case e.AchieveManager.PURPLECOUNT:
                    this.openIt(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.purpleBlocksDestroyed);
                    break;
                case e.AchieveManager.TOTALCOINS:
                    this.openIt(e.Boot.gameConfig.coinsCollectAchieve[this._subid] <= e.Boot.moneyTotal);
                    break;
                case e.AchieveManager.CONTINUEDGAMES:
                    this.openIt(e.Boot.gameConfig.continueGameAchieve[this._subid] <= e.Boot.totalContinuedGames)
            }
        }, i.prototype.initState = function(t) {
            void 0 === t && (t = !0), t || (this._icon.alpha = .5, this._coinText.alpha = .5, this._coinIcon.alpha = .5, this._title.alpha = .5), this._opened = t, e.GameEvent.achieveSignal.remove(this.checkAchieve, this)
        }, i.prototype.initAchievement = function(t) {
            switch (this._type) {
                case e.AchieveManager.MEDAL:
                    switch (this._title.text = "Earn the " + e.Boot.langConfig.medalNames[this._subid] + " medal", this._subid) {
                        case 0:
                        default:
                            this._icon.frameName = "bronze";
                            break;
                        case 1:
                            this._icon.frameName = "silver";
                            break;
                        case 2:
                            this._icon.frameName = "gold";
                            break;
                        case 3:
                            this._icon.frameName = "platin";
                            break;
                        case 4:
                            this._icon.frameName = "diamond";
                            break;
                        case 5:
                            this._icon.frameName = "champion";
                            break;
                        case 6:
                            this._icon.frameName = "grandchampion"
                    }
                    this.initState(e.Boot.gameConfig.medalsAchievesCount[this._subid] <= e.Boot.highScorePoints);
                    break;
                case e.AchieveManager.TOTALLINES:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.clearLinesAchieve[this._subid] + " lines"), this.initState(e.Boot.gameConfig.clearLinesAchieve[this._subid] <= e.Boot.totalLinesRemoved);
                    break;
                case e.AchieveManager.LINESATONCE:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.linesAtOnceAchieve[this._subid] + " lines at once"), this.initState(e.Boot.gameConfig.linesAtOnceAchieve[this._subid] <= e.Boot.removedLinesAtOnce);
                    break;
                case e.AchieveManager.LINESINROW:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.linesAtRowAchieve[this._subid] + " lines in row"), this.initState(e.Boot.gameConfig.linesAtRowAchieve[this._subid] <= e.Boot.removedLinesAtRow);
                    break;
                case e.AchieveManager.CYANCOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " cyan blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.cyanBlocksDestroyed);
                    break;
                case e.AchieveManager.PINKCOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " pink blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.pinkBlocksDestroyed);
                    break;
                case e.AchieveManager.REDCOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " red blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.redBlocksDestroyed);
                    break;
                case e.AchieveManager.ORANGECOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " orange blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.orangeBlocksDestroyed);
                    break;
                case e.AchieveManager.YELLOWCOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " yellow blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.yellowBlocksDestroyed);
                    break;
                case e.AchieveManager.ICECOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " ice blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.iceBlocksDestroyed);
                    break;
                case e.AchieveManager.GREENCOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " green blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.greenBlocksDestroyed);
                    break;
                case e.AchieveManager.BLUECOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " blue blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.blueBlocksDestroyed);
                    break;
                case e.AchieveManager.VIOLETCOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " violet blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.violetBlocksDestroyed);
                    break;
                case e.AchieveManager.PURPLECOUNT:
                    t && (this._title.text = "Clear " + e.Boot.gameConfig.colorAchieve[this._subid] + " purple blocks"), this.initState(e.Boot.gameConfig.colorAchieve[this._subid] <= e.Boot.purpleBlocksDestroyed);
                    break;
                case e.AchieveManager.TOTALCOINS:
                    t && (this._title.text = "Earn " + e.Boot.gameConfig.coinsCollectAchieve[this._subid] + " coins"), this.initState(e.Boot.gameConfig.coinsCollectAchieve[this._subid] <= e.Boot.moneyTotal);
                    break;
                case e.AchieveManager.CONTINUEDGAMES:
                    t && (this._title.text = "Continue the game " + e.Boot.gameConfig.continueGameAchieve[this._subid] + " times"), this.initState(e.Boot.gameConfig.continueGameAchieve[this._subid] <= e.Boot.totalContinuedGames)
            }
        }, i.prototype.setBackAlpha = function(e) {
            this._back.alpha = e
        }, i
    }(Phaser.Sprite);
    e.Achieve = t
}(TProject || (TProject = {})),
function(e) {
    var t = function() {
        function t(t) {
            this._game = t, this._achieveGroup = this._game.make.group(), this._achievemntsArray = [], this._achievemntArrayVisual = [], this._upcomingAchievesArray = [], this.initAchieves(), e.GameEvent.newAchieveRequest.add(this.newAchieveShow, this)
        }
        return Object.defineProperty(t.prototype, "achieveGroup", {
            get: function() {
                return this._achieveGroup
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "achievesCount", {
            get: function() {
                return this._achievemntsArray.length
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "newAchievesCount", {
            get: function() {
                return this._upcomingAchievesArray.length
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "openedCount", {
            get: function() {
                for (var e = 0, t = 0; t < this._achievemntsArray.length; t++) this._achievemntsArray[t].isOpened && e++;
                return e
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.initAchieves = function() {
            for (var i, o = 0, s = 0; s < e.Boot.gameConfig.medalsAchievesCount.length; s++)(i = new e.Achieve(this._game, 0, 100 * o, o, t.MEDAL, s)).setBackAlpha(o % 2 * .1), o++, this._achievemntsArray.push(i), this._achieveGroup.add(i);
            for (s = 0; s < e.Boot.gameConfig.clearLinesAchieve.length; s++)(i = new e.Achieve(this._game, 0, 100 * o, o, t.TOTALLINES, s)).setBackAlpha(o % 2 * .1), o++, this._achievemntsArray.push(i), this._achieveGroup.add(i);
            for (s = 0; s < e.Boot.gameConfig.linesAtOnceAchieve.length; s++)(i = new e.Achieve(this._game, 0, 100 * o, o, t.LINESATONCE, s)).setBackAlpha(o % 2 * .1), o++, this._achievemntsArray.push(i), this._achieveGroup.add(i);
            for (s = 0; s < e.Boot.gameConfig.linesAtRowAchieve.length; s++)(i = new e.Achieve(this._game, 0, 100 * o, o, t.LINESINROW, s)).setBackAlpha(o % 2 * .1), o++, this._achievemntsArray.push(i), this._achieveGroup.add(i);
            for (s = 0; s < e.Boot.gameConfig.colorAchieve.length; s++)
                for (var a = 0; a < t.COLORSARRAY.length; a++)(i = new e.Achieve(this._game, 0, 100 * o, o, t.COLORSARRAY[a], s)).setBackAlpha(o % 2 * .1), o++, this._achievemntsArray.push(i), this._achieveGroup.add(i);
            for (s = 0; s < e.Boot.gameConfig.coinsCollectAchieve.length; s++)(i = new e.Achieve(this._game, 0, 100 * o, o, t.TOTALCOINS, s)).setBackAlpha(o % 2 * .1), o++, this._achievemntsArray.push(i), this._achieveGroup.add(i);
            for (s = 0; s < e.Boot.gameConfig.continueGameAchieve.length; s++)(i = new e.Achieve(this._game, 0, 100 * o, o, t.CONTINUEDGAMES, s)).setBackAlpha(o % 2 * .1), o++, this._achievemntsArray.push(i), this._achieveGroup.add(i);
            this._achievemntArrayVisual = this._achievemntsArray.slice()
        }, t.prototype.addAchieveToShow = function(t) {
            this._achievemntArrayVisual.sort((function(e, i) {
                return e.id == t ? -1 : i.id == t ? 1 : 0
            })), this._upcomingAchievesArray.push(t), this.getAchieveById(t).setAsNew(), this.updateAchieveGroup(), e.GameEvent.achieveUnlocked.dispatch(t)
        }, t.prototype.getAchieveById = function(e) {
            for (var t, i = 0; i < this._achievemntsArray.length; i++)
                if (this._achievemntsArray[i].id == e) {
                    t = this._achievemntsArray[i];
                    break
                }
            return t
        }, t.prototype.clearNewAchieves = function() {
            this._achievemntArrayVisual = this._achievemntsArray.slice();
            for (var e = 0; e < this._upcomingAchievesArray.length; e++) this._achievemntArrayVisual[e].unsetAsNew();
            this._upcomingAchievesArray = [], this.updateAchieveGroup()
        }, t.prototype.updateAchieveGroup = function() {
            for (var e = 0; e < this._achievemntArrayVisual.length; e++) this._achievemntArrayVisual[e].y = 100 * e, this._achievemntArrayVisual[e].setBackAlpha(e % 2 * .07)
        }, t.prototype.updateAchievesVisibleArea = function(e) {
            for (var t = 0; t < this._achievemntArrayVisual.length; t++) this.achieveGroup.y + this._achievemntArrayVisual[t].y >= e - 100 && this.achieveGroup.y + this._achievemntArrayVisual[t].y <= e + 300 ? (this._achieveGroup.add(this._achievemntArrayVisual[t]), this._achievemntArrayVisual[t].visible = !0) : (null != this._achievemntArrayVisual[t].parent && this._achieveGroup.remove(this._achievemntArrayVisual[t]), this._achievemntArrayVisual[t].visible = !1)
        }, t.prototype.newAchieveShow = function() {}, t.MEDAL = 0, t.TOTALLINES = 1, t.LINESATONCE = 2, t.LINESINROW = 3, t.CYANCOUNT = 4, t.PINKCOUNT = 5, t.REDCOUNT = 6, t.ORANGECOUNT = 7, t.YELLOWCOUNT = 8, t.ICECOUNT = 9, t.GREENCOUNT = 10, t.BLUECOUNT = 11, t.VIOLETCOUNT = 12, t.PURPLECOUNT = 13, t.TOTALCOINS = 14, t.CONTINUEDGAMES = 15, t.COLORSARRAY = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], t
    }();
    e.AchieveManager = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i(i, o, s) {
            var a = t.call(this, i, o, s, "gameAssets", "emptySprite") || this;
            return a._blockMap = [
                [!0, !0, !0],
                [!1, !0, !1],
                [!0, !0, !0]
            ], a._blockColor = e.FieldBlock.GREEN, a._blockScore = 1, a._randWeight = 1, a._blocksArray = [], a.scaleDown(!1), a._blockBack = a.game.make.sprite(0, 0, "gameAssets", "bigSquareBottom"), a._blockBack.scale.set(2), a._blockBack.anchor.set(.5, .5), a._blockBack.alpha = 0, a.addChild(a._blockBack), a
        }
        return __extends(i, t), Object.defineProperty(i.prototype, "blockWidth", {
            get: function() {
                return this._blockMap[0].length
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "blockHeight", {
            get: function() {
                return this._blockMap.length
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "blockMap", {
            get: function() {
                return this._blockMap
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "blockColor", {
            get: function() {
                return this._blockColor
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "blockScore", {
            get: function() {
                return this._blockScore
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "isItStone", {
            get: function() {
                return this._stoned
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "randomWeight", {
            get: function() {
                return this._randWeight
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "halfWidth", {
            get: function() {
                return 50 * this.blockWidth / 2 + this.blockWidth / 2 * e.Boot.gameConfig.blockOffset
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "halfHeight", {
            get: function() {
                return 50 * this.blockHeight / 2 + this.blockHeight / 2 * e.Boot.gameConfig.blockOffset
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "topLeftSprite", {
            get: function() {
                return this._topLeftSprite
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.scaleDown = function(e) {
            void 0 === e && (e = !0), this.game.tweens.removeFrom(this.scale), e ? this.game.add.tween(this.scale).to({
                x: .5,
                y: .5
            }, 150, Phaser.Easing.Sinusoidal.InOut, !0) : this.scale.set(.5, .5)
        }, i.prototype.scaleUp = function(e) {
            void 0 === e && (e = !0), this.game.tweens.removeFrom(this.scale), e ? this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 150, Phaser.Easing.Sinusoidal.InOut, !0) : this.scale.set(1, 1)
        }, i.prototype.generateBlock = function(t) {
            var i, o, s;
            void 0 === t && (t = null), null == t && (t = e.FieldBlock.COLOR_LIST[Math.floor(e.FieldBlock.COLOR_LIST.length * Math.random())]), this._blockColor = t, this._blocksArray = [];
            for (var a = 0, n = 0; n < this.blockHeight; n++)
                for (var h = 0; h < this.blockWidth; h++) 1 == this._blockMap[n][h] ? (o = -50 * this.blockWidth / 2 - this.blockWidth / 2 * e.Boot.gameConfig.blockOffset + 50 * h + e.Boot.gameConfig.blockOffset * h, s = -50 * this.blockHeight / 2 - this.blockHeight / 2 * e.Boot.gameConfig.blockOffset + 50 * n + e.Boot.gameConfig.blockOffset * n, i = this.game.make.sprite(o, s, "gameAssets", t), this.addChild(i), this._blocksArray.push(i), 0 == n && 0 == h && (this._topLeftSprite = i), a++) : 0 == n && 0 == h && (o = -50 * this.blockWidth / 2 - this.blockWidth / 2 * e.Boot.gameConfig.blockOffset + 50 * h + e.Boot.gameConfig.blockOffset * h, s = -50 * this.blockHeight / 2 - this.blockHeight / 2 * e.Boot.gameConfig.blockOffset + 50 * n + e.Boot.gameConfig.blockOffset * n, (i = this.game.make.sprite(o, s, "gameAssets", t)).alpha = 0, this.addChild(i), this._topLeftSprite = i);
            this._blockScore = a, this._stoned = !1
        }, i.prototype.stoneIt = function() {
            for (var e = 0; e < this._blocksArray.length; e++) this._blocksArray[e].frameName = "grey";
            this._stoned = !0, this.inputEnabled = !1
        }, i.prototype.unstoneIt = function() {
            for (var e = 0; e < this._blocksArray.length; e++) this._blocksArray[e].frameName = this._blockColor;
            this._stoned = !1, this.inputEnabled = !0
        }, i.prototype.destroy = function() {
            this._topLeftSprite.destroy(), this._blockMap = null, this._blockColor = null, t.prototype.destroy.call(this, !0)
        }, i
    }(Phaser.Sprite);
    e.GameBlock = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s) {
            void 0 === s && (s = null);
            var a = e.call(this, t, i, o) || this;
            return a.generateBlockMap(s), a.generateBlock(), a
        }
        return __extends(t, e), t.prototype.generateBlockMap = function(e) {
            var t;
            0 == (t = null == e ? Math.floor(2 * Math.random()) : e) ? this._blockMap = [
                [!0, !0, !0, !0, !0]
            ] : 1 == t && (this._blockMap = [
                [!0],
                [!0],
                [!0],
                [!0],
                [!0]
            ])
        }, t
    }(e.GameBlock);
    e.LineFive = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s, a) {
            void 0 === s && (s = null), void 0 === a && (a = null);
            var n = e.call(this, t, i, o) || this;
            return n.generateBlockMap(s), a ? n.generateBlock(a) : n.generateBlock(), n
        }
        return __extends(t, e), t.prototype.generateBlockMap = function(e) {
            var t;
            0 == (t = null == e ? Math.floor(2 * Math.random()) : e) ? this._blockMap = [
                [!0, !0, !0, !0]
            ] : 1 == t && (this._blockMap = [
                [!0],
                [!0],
                [!0],
                [!0]
            ])
        }, t
    }(e.GameBlock);
    e.LineFour = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s) {
            void 0 === s && (s = null);
            var a = e.call(this, t, i, o) || this;
            return a.generateBlockMap(s), a.generateBlock(), a
        }
        return __extends(t, e), t.prototype.generateBlockMap = function(e) {
            var t;
            0 == (t = null == e ? Math.floor(2 * Math.random()) : e) ? this._blockMap = [
                [!0, !0, !0]
            ] : 1 == t && (this._blockMap = [
                [!0],
                [!0],
                [!0]
            ])
        }, t
    }(e.GameBlock);
    e.LineThree = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s, a) {
            void 0 === s && (s = null), void 0 === a && (a = null);
            var n = e.call(this, t, i, o) || this;
            return n.generateBlockMap(s), n.generateBlock(a), n
        }
        return __extends(t, e), t.prototype.generateBlockMap = function(e) {
            var t;
            0 == (t = null == e ? Math.floor(2 * Math.random()) : e) ? this._blockMap = [
                [!0, !0]
            ] : 1 == t && (this._blockMap = [
                [!0],
                [!0]
            ])
        }, t
    }(e.GameBlock);
    e.LineTwo = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s) {
            void 0 === s && (s = null);
            var a = e.call(this, t, i, o) || this;
            return a.generateBlockMap(s), a.generateBlock(), a
        }
        return __extends(t, e), t.prototype.generateBlockMap = function(e) {
            var t;
            0 == (t = null == e ? Math.floor(4 * Math.random()) : e) ? this._blockMap = [
                [!0, !0, !0, !0],
                [!0, !1, !1, !1],
                [!0, !1, !1, !1],
                [!0, !1, !1, !1]
            ] : 1 == t ? this._blockMap = [
                [!0, !0, !0, !0],
                [!1, !1, !1, !0],
                [!1, !1, !1, !0],
                [!1, !1, !1, !0]
            ] : 2 == t ? this._blockMap = [
                [!1, !1, !1, !0],
                [!1, !1, !1, !0],
                [!1, !1, !1, !0],
                [!0, !0, !0, !0]
            ] : 3 == t && (this._blockMap = [
                [!0, !1, !1, !1],
                [!0, !1, !1, !1],
                [!0, !1, !1, !1],
                [!0, !0, !0, !0]
            ])
        }, t
    }(e.GameBlock);
    e.NookFour = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s, a) {
            void 0 === s && (s = null), void 0 === a && (a = null);
            var n = e.call(this, t, i, o) || this;
            return n.generateBlockMap(s), n.generateBlock(a), n
        }
        return __extends(t, e), t.prototype.generateBlockMap = function(e) {
            var t;
            0 == (t = null == e ? Math.floor(4 * Math.random()) : e) ? this._blockMap = [
                [!0, !0, !0],
                [!0, !1, !1],
                [!0, !1, !1]
            ] : 1 == t ? this._blockMap = [
                [!0, !0, !0],
                [!1, !1, !0],
                [!1, !1, !0]
            ] : 2 == t ? this._blockMap = [
                [!0, !1, !1],
                [!0, !1, !1],
                [!0, !0, !0]
            ] : 3 == t && (this._blockMap = [
                [!1, !1, !0],
                [!1, !1, !0],
                [!0, !0, !0]
            ])
        }, t
    }(e.GameBlock);
    e.NookThree = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s, a) {
            void 0 === s && (s = null), void 0 === a && (a = null);
            var n = e.call(this, t, i, o) || this;
            return n.generateBlockMap(s), n.generateBlock(a), n
        }
        return __extends(t, e), t.prototype.generateBlockMap = function(e) {
            var t;
            0 == (t = null == e ? Math.floor(4 * Math.random()) : e) ? this._blockMap = [
                [!0, !0],
                [!0, !1]
            ] : 1 == t ? this._blockMap = [
                [!0, !0],
                [!1, !0]
            ] : 2 == t ? this._blockMap = [
                [!0, !1],
                [!0, !0]
            ] : 3 == t && (this._blockMap = [
                [!1, !0],
                [!0, !0]
            ])
        }, t
    }(e.GameBlock);
    e.NookTwo = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o) {
            var s = e.call(this, t, i, o) || this;
            return s._blockMap = [
                [!0]
            ], s.generateBlock(), s
        }
        return __extends(t, e), t
    }(e.GameBlock);
    e.SimpleDot = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o) {
            var s = e.call(this, t, i, o) || this;
            return s._blockMap = [
                [!0, !0, !0],
                [!0, !0, !0],
                [!0, !0, !0]
            ], s.generateBlock(), s
        }
        return __extends(t, e), t
    }(e.GameBlock);
    e.SquareThree = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s, a) {
            void 0 === s && (s = null), void 0 === a && (a = null);
            var n = e.call(this, t, i, o) || this;
            return n._blockMap = [
                [!0, !0],
                [!0, !0]
            ], n.generateBlock(a), n
        }
        return __extends(t, e), t
    }(e.GameBlock);
    e.SquareTwo = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(e) {
        function t(t, i, o, s) {
            var a = e.call(this, t, i, o, "gameAssets", "emptySprite") || this;
            return a._horizontal = s, a._firstExplosion = a.game.make.sprite(0, 0, "gameAssets", "animation_05"), a._firstExplosion.animations.add("explode", Phaser.Animation.generateFrameNames("animation_", 5, 33, "", 2), 40), a._firstExplosion.anchor.set(1, .5), a._secondExplosion = a.game.make.sprite(0, 0, "gameAssets", "animation_05"), a._explosionAnimation = a._secondExplosion.animations.add("explode", Phaser.Animation.generateFrameNames("animation_", 5, 33, "", 2), 40), a._secondExplosion.anchor.set(1, .5), a._horizontal || (a._firstExplosion.angle = 90, a._secondExplosion.angle = 90), a._secondExplosion.scale.set(-1, 1), a.addChild(a._firstExplosion), a.addChild(a._secondExplosion), a._explosionAnimation.onComplete.add(a.hideExplosion, a), a.visible = !1, a
        }
        return __extends(t, e), t.prototype.showExplosion = function() {
            this.visible = !0, this._firstExplosion.play("explode"), this._secondExplosion.play("explode")
        }, t.prototype.hideExplosion = function() {
            this.visible = !1
        }, t
    }(Phaser.Sprite);
    e.ExplosionLineAnimation = t
}(TProject || (TProject = {})),
function(e) {
    var t = function() {
        function e() {}
        return e.wiggle = function(e, t, i) {
            var o = e * Math.PI * 2 * t,
                s = e * (2 * Math.PI * i + Math.PI / 2);
            return Math.sin(o) * Math.cos(s)
        }, e
    }();
    e.GameTweens = t
}(TProject || (TProject = {})),
function(e) {
    var t = function() {
        this.cfg = {
            width: 640,
            height: 960,
            multiTexture: !0,
            renderer: Phaser.AUTO,
            parent: "content",
            enableDebug: !0,
            antialias: !0
        }, this.game = new Phaser.Game(this.cfg), window.game = this.game, this.game.state.add("Boot", e.Boot, !0), this.game.state.add("Preloader", e.Preloader), this.game.state.add("Level", e.Level)
    };
    e.Main = t
}(TProject || (TProject = {})), window.onload = function() {
    var e;
    sgSdk.initialize(["basic", "scoreGame"], {
        id: "2020-plus",
        build: "0.9.6",
        supportedLanguages: ["en", "de", "es", "fr", "it", "pt", "ru", "tr", "nl", "pl", "ja"],
        freezeGame: function() {
            e.game.paused = !0, e.game.sound.mute = !0
        },
        unfreezeGame: function() {
            e.game.paused = !1, e.game.sound.mute = !1
        },
        getScore: function() {},
        startOver: function() {},
        runGame: function() {
            e.game.state.start("Level", !0)
        }
    }, (function(t, i, o) {
        sdkHandler = o, sgSettings = i, dataMigrator.migrateLocalDataToPlatform(), mySaver.loadData().then((function() {
            e = new TProject.Main
        }))
    }))
};
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    Boot = function(t) {
        function i() {
            return t.call(this) || this
        }
        return __extends(i, t), i.prototype.init = function() {
            this.input.maxPointers = 1, this.stage.disableVisibilityChange = !1, this.game.stage.backgroundColor = "#0e1527", this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE, this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL, this.firstRunLandscape = this.game.scale.isGameLandscape, this.game.device.desktop || (this.game.scale.forceOrientation(!1, !0), this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this), this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this)), e.GameEvent.onMusicChange.add(i.onMusicChange, this), e.GameEvent.onSfxChange.add(i.onSfxChange, this)
        }, i.prototype.handleIncorrect = function() {
            document.getElementById("orientation").style.display = "block"
        }, i.prototype.handleCorrect = function() {
            document.getElementById("orientation").style.display = "none"
        }, i.gameOverTrigger = function() {}, i.addMoney = function(e) {
            i.currentMoney += e, i.moneyTotal += e
        }, i.onMusicChange = function() {
            null != i.music && (i.musicEnable = !i.musicEnable, i.musicEnable ? (!i.music.isPlaying && i.music.play(), i.music.resume()) : i.music.pause()), i.saveTheGame()
        }, i.onSfxChange = function() {
            i.sfxEnable = !i.sfxEnable, i.saveTheGame()
        }, i.saveTheGame = function() {
            i.saveGameObject = {}, i.saveGameObject.musicEnable = i.musicEnable, i.saveGameObject.sfxEnable = i.sfxEnable, i.saveGameObject.firstTimePlay = i.firstTimePlay, i.firstTimePlay || (i.saveGameObject.currentMoney = i.currentMoney, i.saveGameObject.totalPoints = i.totalPoints, i.saveGameObject.highScore = i.highScorePoints, i.saveGameObject.linesRemoved = i.totalLinesRemoved, i.saveGameObject.removedLinesAtOnce = i.removedLinesAtOnce, i.saveGameObject.removedLinesAtRow = i.removedLinesAtRow, i.saveGameObject.cyanBlocksDestroyed = i.cyanBlocksDestroyed, i.saveGameObject.pinkBlocksDestroyed = i.pinkBlocksDestroyed, i.saveGameObject.redBlocksDestroyed = i.redBlocksDestroyed, i.saveGameObject.orangeBlocksDestroyed = i.orangeBlocksDestroyed, i.saveGameObject.yellowBlocksDestroyed = i.yellowBlocksDestroyed, i.saveGameObject.iceBlocksDestroyed = i.iceBlocksDestroyed, i.saveGameObject.greenBlocksDestroyed = i.greenBlocksDestroyed, i.saveGameObject.blueBlocksDestroyed = i.blueBlocksDestroyed, i.saveGameObject.violetBlocksDestroyed = i.violetBlocksDestroyed, i.saveGameObject.purpleBlocksDestroyed = i.purpleBlocksDestroyed, i.saveGameObject.moneyTotal = i.moneyTotal, i.saveGameObject.totalContinuedGames = i.totalContinuedGames, mySaver.save("saveFieldObject", i.saveFieldObject)), mySaver.save("saveGameObject", i.saveGameObject)
        }, i.changedString = function(e, t) {
            for (var i = t, o = 1; o <= e.length; o++) {
                var s = "$" + o;
                i = i.split(s).join(e[o - 1] + "")
            }
            return i
        }, i.prototype.preload = function() {
            this.game.load.text("config", i.PATH_SETTINGS + "gameconfig.json?v=4")
        }, i.prototype.create = function() {
            i.gameConfig = JSON.parse(this.game.cache.getText("config")), i.defLang = sgSettings.config.env.locale, i.adEnabled = i.gameConfig.adEnabled, this.game.scale.refresh(), this.game.state.start("Preloader")
        }, i.PATH_IMAGES = "./assets/images/", i.PATH_FONTS = "./assets/fonts/", i.PATH_SOUNDS = "./assets/sounds/", i.PATH_SETTINGS = "./assets/data/", i.defLang = "en", i.sfxEnable = !0, i.musicEnable = !0, i.adEnabled = !0, i.dpiScaleFactor = 1.5 * window.devicePixelRatio, i.firstTimePlay = !0, i.fontName = "framd", i.currentMoney = 0, i.totalPoints = 0, i.highScorePoints = 0, i.totalLinesRemoved = 0, i.removedLinesAtOnce = 0, i.removedLinesAtRow = 0, i.cyanBlocksDestroyed = 0, i.pinkBlocksDestroyed = 0, i.redBlocksDestroyed = 0, i.orangeBlocksDestroyed = 0, i.yellowBlocksDestroyed = 0, i.iceBlocksDestroyed = 0, i.greenBlocksDestroyed = 0, i.blueBlocksDestroyed = 0, i.violetBlocksDestroyed = 0, i.purpleBlocksDestroyed = 0, i.moneyTotal = 0, i.totalContinuedGames = 0, i
    }(Phaser.State), e.Boot = Boot
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i() {
            var e = t.call(this) || this;
            return e._tutorialStep = 0, e._boosterStep = 0, e._currentBoosterType = 0, e._boosterComboDelay = 0, e._boosterPointsMultiplier = 1, e._boosterComboMultiplier = 1, e._elementsList = ["Dot", "SquareTwo", "SquareThree", "LineTwo", "LineThree", "LineFour", "LineFive", "NookTwo", "NookThree", "NookFour"], e._elementsWeightList = [5, 3, 2, 5, 4, 3, 1, 4, 2, 1], e._currentRank = 0, e._prevSessionExist = !1, e._showHand = !1, e
        }
        return __extends(i, t), i.prototype.create = function() {
            this._shotOuts = e.Boot.langConfig.shotOuts, this._grabSound = this.game.make.sound("grab_figure"), this._insertSound = this.game.make.sound("insert_figure"), this._loseSound = this.game.make.sound("lose"), this._newMedalSound = this.game.make.sound("new_medal"), this._background = this.game.add.sprite(0, 0, "gameAssets", "bg"), this._giftShakeTimer = this.game.time.create(!1), this._giftShakeTimer.loop(5e3, this.shakeGift, this), this._newAchievesIds = [], this._handSprite = this.game.make.sprite(0, 0, "gameAssets", "finger"), this._handSprite.anchor.set(0, 0), this._prevSessionExist = !1, this._canBeContinued = !0, this._currentRank = 0, this._currScore = 0, this._gameScore = 0, e.Boot.totalPoints > 0 && (this._prevSessionExist = !0, this._gameScore = e.Boot.totalPoints, this._currScore = e.Boot.totalPoints), e.Boot.achieveManager = new e.AchieveManager(this.game), this.createField(), this.createTopUI(), this.createBottomUI(), this.createBlocks(), this.createMoodUp(), this.createBonusPopUp(), this.createLoseScreen(), this.createPauseScreen(), this._comboTimer = this.game.time.create(!1), this._comboTimer.loop(5e3, this.resetCombo, this), this._currentCombo = 0, this._comboTimer.start(), this.checkRank(this._prevSessionExist), e.Boot.firstTimePlay && this.initiateTutorial(), e.GameEvent.linesCleared.add(this.checkCombo, this), e.GameEvent.restartNeeded.add(this.restartLevel, this), e.GameEvent.moveDone.add(this.updateBoosterState, this), e.GameEvent.continueSignal.add(this.checkContinue, this), e.GameEvent.achieveUnlocked.add(this.addNewAchieve, this), this.resize(), null == e.Boot.music && (e.Boot.music = this.game.make.sound("main_theme", .5, !0), e.Boot.musicEnable && e.Boot.music.play())
        }, i.prototype.showHandHint = function() {
            var e = this;
            if (this._showHand) {
                this._handSprite.bringToTop(), this._handSprite.visible = !0, this.game.tweens.removeFrom(this._handSprite);
                var t = 0;
                1 == this._tutorialStep ? t = 94 : 2 == this._tutorialStep && (t = 0), this._handSprite.position.set(this._midPanel.x - 10, this._midPanel.y - 10), this.game.add.tween(this._handSprite).to({
                    alpha: 1
                }, 200, Phaser.Easing.Linear.None, !0);
                var i, o;
                i = (this._gameField.fieldBlockPosition(t).x - this._blocksGroup.x) / this._blocksGroup.scale.x, o = (this._gameField.fieldBlockPosition(t).y - this._blocksGroup.y) / this._blocksGroup.scale.y, this.game.add.tween(this._handSprite).to({
                    x: i,
                    y: o
                }, 1700, Phaser.Easing.Cubic.Out, !0, 200).onComplete.addOnce((function() {
                    e.game.add.tween(e._handSprite).to({
                        alpha: 0
                    }, 200, Phaser.Easing.Linear.None, !0)
                }), this)
            }
        }, i.prototype.initiateTutorial = function() {
            var t = this;
            this.game.time.events.add(600, (function() {
                t.showTutorText(e.Boot.langConfig.tutorialStepTexts[0][1], 0, -180, e.Boot.langConfig.tutorialStepTexts[0][0])
            }), this), this._tutorialStep = 1, this._tutorTimer = this.game.time.create(!1), this._tutorTimer.loop(2300, this.showHandHint, this), this._showHand = !0, this.game.device.desktop || this.game.scale.isLandscape ? (this._midBlock = new e.LineTwo(this.game, this._midPanel.x + this.game.width / 2, this._midPanel.y, 0, e.FieldBlock.ICE), this.game.tweens.removeFrom(this._midBlock), this.game.add.tween(this._midBlock).to({
                x: this._midPanel.x
            }, 250, Phaser.Easing.Cubic.Out, !0, 100)) : (this._midBlock = new e.LineTwo(this.game, this._midPanel.x, this._midPanel.y + 480, 0, e.FieldBlock.ICE), this.game.tweens.removeFrom(this._midBlock), this.game.add.tween(this._midBlock).to({
                y: this._midPanel.y
            }, 250, Phaser.Easing.Cubic.Out, !0, 100)), this._midBlock.inputEnabled = !0, this._midBlock.input.enableDrag(!0), this._midBlock.events.onDragStart.add(this.dragIt, this), this._midBlock.events.onDragUpdate.add(this.updateDrag, this), this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight), this._midBlock.events.onDragStop.add(this.stopDrag, this), this._blocksGroup.add(this._midBlock), this.game.device.desktop || this._midBlock.input.dragOffset.set(0, 2 * -this._midBlock.halfHeight), this._blocksGroup.add(this._handSprite), this._handSprite.visible = !1, this._gameField.initiateTutorial(), this.game.time.events.add(50, this.showHandHint, this), this._tutorTimer.start()
        }, i.prototype.showSecondTutorialPart = function() {
            this.showTutorText(e.Boot.langConfig.tutorialStepTexts[1][1], 0, 240, e.Boot.langConfig.tutorialStepTexts[1][0]), this._tutorialStep = 2, this._showHand = !0, this.game.device.desktop || this.game.scale.isLandscape ? (this._midBlock = new e.NookThree(this.game, this._midPanel.x + this.game.width / 2, this._midPanel.y, 0, e.FieldBlock.ORANGE), this.game.tweens.removeFrom(this._midBlock), this.game.add.tween(this._midBlock).to({
                x: this._midPanel.x
            }, 250, Phaser.Easing.Cubic.Out, !0, 100)) : (this._midBlock = new e.NookThree(this.game, this._midPanel.x, this._midPanel.y + 480, 0, e.FieldBlock.ORANGE), this.game.tweens.removeFrom(this._midBlock), this.game.add.tween(this._midBlock).to({
                y: this._midPanel.y
            }, 250, Phaser.Easing.Cubic.Out, !0, 100)), this._midBlock.inputEnabled = !0, this._midBlock.input.enableDrag(!0), this._midBlock.events.onDragStart.add(this.dragIt, this), this._midBlock.events.onDragUpdate.add(this.updateDrag, this), this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight), this._midBlock.events.onDragStop.add(this.stopDrag, this), this._blocksGroup.add(this._midBlock), this.game.device.desktop || this._midBlock.input.dragOffset.set(0, 2 * -this._midBlock.halfHeight), this._handSprite.visible = !1, this._tutorTimer.stop(!1), this.game.time.events.add(50, this.showHandHint, this), this._tutorTimer.start(), this._gameField.showSecondTutorPart()
        }, i.prototype.disableTutorial = function() {
            this._handSprite.visible = !1, this.showTutorText(e.Boot.langConfig.tutorialStepTexts[2][1], 0, 240, e.Boot.langConfig.tutorialStepTexts[2][0], 1e3), this._tutorTimer.destroy(), e.Boot.firstTimePlay = !1, localStorage.setItem("firstTime", "ft"), this._gameField.endTheTutorial(), this.checkBlocks()
        }, i.prototype.showTutorText = function(e, t, i, o, s) {
            void 0 === o && (o = ""), void 0 === s && (s = -1), this.game.tweens.removeFrom(this._tutorialTextContainer), this._tutorialTextContainer.visible = !0, this._tutorialTextContainer.alpha = 0, this._tutorialTextContainer.position.set(t, i - 100), this._tutorialDescriptionText.text = e, this._tutorialHeaderText.text = o, this._tutorialTextBack.width = Math.max(444, this._tutorialHeaderText.width, this._tutorialDescriptionText.width), this.game.add.tween(this._tutorialTextContainer).to({
                y: i,
                alpha: 1
            }, 300, Phaser.Easing.Linear.None, !0), s > 0 && this.game.add.tween(this._tutorialTextContainer).to({
                y: i + 100,
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, !0, 300 + s)
        }, i.prototype.hideTutorText = function() {
            this.game.tweens.removeFrom(this._tutorialTextContainer), this._tutorialTextContainer.visible = !1
        }, i.prototype.addNewAchieve = function() {
            this._popUpAchieveBack.visible ? this._newAchievesIds.push(arguments[0]) : this.showNewAchieve(e.Boot.achieveManager.getAchieveById(arguments[0]))
        }, i.prototype.checkNewAchieveList = function() {
            this._newAchievesIds.length > 0 ? this.showNewAchieve(e.Boot.achieveManager.getAchieveById(this._newAchievesIds.shift())) : this._popUpAchieveBack.visible = !1
        }, i.prototype.showNewAchieve = function(e) {
            this._popUpAchieveBack.visible = !0, this._popUpAchieveIcon.frameName = e.iconFrameName, this.game.renderer.type != Phaser.CANVAS ? this._popUpAchieveDescription.frameName = e.titleFrameName : this._popUpAchieveDescription.text = e.titleText, this.game.add.tween(this._popUpAchieveBack).to({
                y: 90
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0), this.game.time.events.add(3500, (function() {
                this.game.add.tween(this._popUpAchieveBack).to({
                    y: -200
                }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.addOnce((function() {
                    this.checkNewAchieveList()
                }), this)
            }), this)
        }, i.prototype.checkContinue = function() {
            "accept" == arguments[0] ? this.hideContinuePopUp(!1) : this.hideContinuePopUp(!0)
        }, i.prototype.showBonusPopUp = function() {
            this._popUpGroup.visible = !0, this._popupBlackScreen.visible = !0, this._popupBlackScreen.alpha = 0, this.game.add.tween(this._popupBlackScreen).to({
                alpha: .75
            }, 400, Phaser.Easing.Cubic.Out, !0), this._purchaseBtn.events.onInputUp.removeAll(), this._moneyIcon.alpha = 0, this._moneyValue.alpha = 0, this._moneyValue.text = e.Boot.currentMoney + "", this._bonusIcon.alpha = 0, this._bonusIcon.position.set(0, -130), this._bonusDescription.alpha = 0, this._purchaseBtn.alpha = 0, this._purchaseBtn.position.y += 100, this._closeBtn.alpha = 0, this._closeBtn.position.y += 100, e.Boot.currentMoney < e.Boot.gameConfig.boosterPrice ? (this.shakeCoins(), this._purchaseBtn.events.onInputUp.add(this.showRewardedAd, this), this._watchAdIcon.visible = !0, this._purchaseBtnDescriptionText.visible = !this._watchAdIcon.visible, this._purchaseBtnAdditionalText.visible = !0) : (this._purchaseBtn.events.onInputUp.add((() => {
                this.buyTheBooster(!1)
            }), this), this._purchaseBtn.frameName = "greenButtonGift", this._purchaseBtnAdditionalText.visible = !1, this._purchaseBtnCoinText.fill = "#ffffff"), this.game.add.tween(this._moneyIcon).to({
                alpha: 1
            }, 400, Phaser.Easing.Sinusoidal.InOut, !0, 100), this.game.add.tween(this._moneyValue).to({
                alpha: 1
            }, 400, Phaser.Easing.Sinusoidal.InOut, !0, 200), this.game.add.tween(this._bonusIcon).to({
                alpha: 1
            }, 400, Phaser.Easing.Sinusoidal.InOut, !0, 300), this.game.add.tween(this._bonusDescription).to({
                alpha: 1
            }, 400, Phaser.Easing.Sinusoidal.InOut, !0, 400), this.game.add.tween(this._purchaseBtn).to({
                alpha: 1,
                y: this._purchaseBtn.y - 100
            }, 400, Phaser.Easing.Cubic.Out, !0, 500), this.game.add.tween(this._closeBtn).to({
                alpha: 1,
                y: this._closeBtn.y - 100
            }, 400, Phaser.Easing.Cubic.Out, !0, 600)
        }, i.prototype.shakeCoins = function() {
            this.game.tweens.removeFrom(this._moneyIcon), this.game.add.tween(this._moneyIcon).to({
                x: this._moneyIcon.x + 5
            }, 100, Phaser.Easing.Sinusoidal.InOut, !0, 0, 3, !0)
        }, i.prototype.hideBonusPopUp = function() {
            this.game.add.tween(this._moneyIcon).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._moneyValue).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._bonusDescription).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._bonusIcon).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._purchaseBtn).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._closeBtn).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0), this.game.time.events.add(200, (function() {
                this._popUpGroup.visible = !1
            }), this), this.game.add.tween(this._popupBlackScreen).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0).onComplete.addOnce((function() {
                this._popupBlackScreen.visible = !1
            }), this), window.setTimeout((() => {
                this._noAdAvailableText.visible = !1, this._purchaseBtnDescriptionText.visible = !0, this._purchaseBtnAdditionalText.visible = !0, this._purchaseBtn.input.enabled = !0, this._noAdAvailableText.visible = !1, this._watchAdIcon.visible = !1
            }), 200)
        }, i.prototype.showRewardedAd = function() {
            sdkHandler.trigger("rewardedAd", {
                callback: function(e) {
                    e ? (this.buyTheBooster(e), this._noAdAvailableText.visible = !1, this._watchAdIcon.visible = this._noAdAvailableText.visible, this._purchaseBtnDescriptionText.visible = !this._watchAdIcon.visible) : (this.shakeCoins(), this._noAdAvailableText.visible = !0, this._purchaseBtnDescriptionText.visible = !1, this._purchaseBtnAdditionalText.visible = !1, this._purchaseBtn.input.enabled = !1)
                }
            }, this)
        }, i.prototype.buyTheBooster = function(t) {
            switch (t || (e.Boot.currentMoney -= e.Boot.gameConfig.boosterPrice), this._currentBoosterType) {
                case i.POINTMULT:
                    this._boosterStep = 3, this._boosterPointsMultiplier = 1.5;
                    break;
                case i.COMBOSCORE:
                    this._boosterStep = 10, this._boosterComboMultiplier = 3;
                    break;
                case i.COMBODURATION:
                    this._boosterStep = 10, this._boosterComboDelay = 5e3
            }
            this.updateBoosterState(!0), this.hideBonusPopUp(), this.hideGift()
        }, i.prototype.createBonusPopUp = function() {
            this._popupBlackScreen = this.game.add.sprite(0, 0, "gameAssets", "bg"), this._popupBlackScreen.inputEnabled = !0, this._popupBlackScreen.alpha = .75, this._popupBlackScreen.visible = !1, this._popUpGroup = this.game.add.group(), this._purchaseBtn = this.game.make.sprite(0, 100, "gameAssets", "greenButtonGift"), this._purchaseBtn.anchor.set(.5, .5), this._purchaseBtn.inputEnabled = !0, this._purchaseBtn.events.onInputUp.add((() => {
                this.buyTheBooster(!1)
            }), this);
            var t = this.game.make.sprite(-this._purchaseBtn.width / 2 + 30, 0, "gameAssets", "coin");
            t.anchor.set(.5, .5), this._purchaseBtnCoinText = this.game.make.text(t.x + t.width / 2, 0, e.Boot.gameConfig.boosterPrice + "", {
                font: "28px " + e.Boot.fontName,
                fill: "#FFFFFF"
            }), this._purchaseBtnCoinText.anchor.set(0, .5), this._purchaseBtnDescriptionText = this.game.make.text(this._purchaseBtn.width / 6, 0, e.Boot.langConfig.purchaseText, {
                font: "28px " + e.Boot.fontName,
                fill: "#FFFFFF"
            }), this._purchaseBtnDescriptionText.anchor.set(.5, .5), this._purchaseBtnAdditionalText = this.game.make.text(0, this._purchaseBtn.height / 2 + 20, e.Boot.langConfig.watchVideo, {
                font: "24px " + e.Boot.fontName,
                fill: "#FFFFFF"
            }), this._purchaseBtnAdditionalText.anchor.set(.5, .5), this._noAdAvailableText = this.game.make.text(0, this._purchaseBtn.height / 2 + 20, e.Boot.langConfig.noAdAvailable, {
                font: "24px " + e.Boot.fontName,
                fill: "#FFFFFF"
            }), this._noAdAvailableText.anchor.set(.5, .5), this._noAdAvailableText.visible = !1, this._watchAdIcon = this.game.make.sprite(this._purchaseBtn.width / 6, 0, "gameAssets", "videoIconSmall"), this._watchAdIcon.anchor.set(.5, .5), this._watchAdIcon.visible = !1, this._purchaseBtn.addChild(t), this._purchaseBtn.addChild(this._purchaseBtnCoinText), this._purchaseBtn.addChild(this._purchaseBtnDescriptionText), this._purchaseBtn.addChild(this._purchaseBtnAdditionalText), this._purchaseBtn.addChild(this._watchAdIcon), this._purchaseBtn.addChild(this._noAdAvailableText), this._closeBtn = this.game.make.sprite(this._purchaseBtn.x + 200, this._purchaseBtn.y, "gameAssets", "closeButton"), this._closeBtn.anchor.set(.5, .5), this._closeBtn.inputEnabled = !0, this._closeBtn.events.onInputUp.add((() => {
                sdkHandler.trigger("interstitialAd", {
                    callback: function() {
                        this.hideBonusPopUp()
                    }
                }, this)
            }), this), this._bonusIcon = this.game.make.sprite(0, -130, "gameAssets", "boosterIcon"), this._bonusIcon.anchor.set(.5, .5), this._moneyIcon = this.game.make.sprite(-40, -220, "gameAssets", "coin"), this._moneyIcon.anchor.set(.5, .5), this._bonusDescription = this.game.make.text(0, this._bonusIcon.y + this._bonusIcon.width / 2 + 60, "", {
                font: "28px " + e.Boot.fontName,
                fill: "#FFFFFF",
                wordWrap: !0,
                wordWrapWidth: 600
            }), this._bonusDescription.anchor.set(.5, 0), this._moneyValue = this.game.make.text(this._moneyIcon.x + this._moneyIcon.width / 2 + 20, this._moneyIcon.y, "1231233", {
                font: "28px " + e.Boot.fontName,
                fill: "#FFFFFF"
            }), this._moneyValue.anchor.set(0, .5), this._popUpGroup.add(this._moneyIcon), this._popUpGroup.add(this._moneyValue), this._popUpGroup.add(this._bonusIcon), this._popUpGroup.add(this._bonusDescription), this._popUpGroup.add(this._purchaseBtn), this._popUpGroup.add(this._closeBtn), this._popUpGroup.visible = !1
        }, i.prototype.createPauseScreen = function() {
            this._pauseGroup = this.game.add.group(), this._continueBtn = new e.UIButton(this.game, 0, -70, "playButtonPause", this.hidePause.bind(this)), this._replayBtn = new e.UIButton(this.game, 0, 100, "restartButtonPause", this.restartLevel.bind(this)), this._musicBtn = new e.UIButton(this.game, 240, 440, "musOn", (function() {
                e.GameEvent.onMusicChange.dispatch()
            }), "musOff", e.Boot.musicEnable), this._soundBtn = new e.UIButton(this.game, 160, 440, "soundOn", (function() {
                e.GameEvent.onSfxChange.dispatch()
            }), "soundOff", e.Boot.sfxEnable), this._highScoreDescriptionText = this.game.make.text(0, -250, e.Boot.langConfig.highScoreText, {
                font: "30px " + e.Boot.fontName,
                fill: "#6945ab"
            }), this._highScoreDescriptionText.anchor.set(.5, .5), this._highScoreValueText = this.game.make.text(0, this._highScoreDescriptionText.y - this._highScoreDescriptionText.height - 15, e.Boot.highScorePoints + "", {
                font: "36px " + e.Boot.fontName,
                fill: "#ffffff"
            }), this._highScoreValueText.anchor.set(.5, .5), this._pauseGroup.add(this._continueBtn), this._pauseGroup.add(this._replayBtn), this._pauseGroup.add(this._musicBtn), this._pauseGroup.add(this._soundBtn), this._pauseGroup.add(this._highScoreDescriptionText), this._pauseGroup.add(this._highScoreValueText), this._highScoreDescriptionText.visible = !1, this._highScoreValueText.visible = !1, this._continueBtn.hideBtn(!0), this._replayBtn.hideBtn(!0), this._musicBtn.hideBtn(!0), this._soundBtn.hideBtn(!0), this.game.onPause.add(this.showPause, this)
        }, i.prototype.showPause = function() {
            this._highScoreValueText && !0 !== this._highScoreValueText.visible && !0 !== this._popupBlackScreen.visible && !0 !== this._overBlackScreen.visible && (this.showIngameBlackFilter(), this._highScoreValueText.text = e.Boot.highScorePoints + "", this._highScoreDescriptionText.visible = !0, this._highScoreValueText.visible = !0, this._continueBtn.showBtn(), this._replayBtn.showBtn(), this._musicBtn.showBtn(), this._soundBtn.showBtn(), null != Boot.music && Boot.music.pause())
        }, i.prototype.hidePause = function() {
            sdkHandler.trigger("interstitialAd", {
                callback: function() {
                    this.hideIngameBlackFilter(), this._highScoreDescriptionText.visible = !1, this._highScoreValueText.visible = !1, this._continueBtn.hideBtn(), this._replayBtn.hideBtn(), this._musicBtn.hideBtn(), this._soundBtn.hideBtn(), null != Boot.music && Boot.musicEnable && (!Boot.music.isPlaying && Boot.music.play(), Boot.music.resume())
                }
            }, this)
        }, i.prototype.showIngameBlackFilter = function(e) {
            void 0 === e && (e = .7), this.game.tweens.removeFrom(this._overBlackScreen), this._overBlackScreen.visible = !0, this._overBlackScreen.alpha = 0, this.game.add.tween(this._overBlackScreen).to({
                alpha: e
            }, 300, Phaser.Easing.Linear.None, !0)
        }, i.prototype.hideIngameBlackFilter = function() {
            this.game.tweens.removeFrom(this._overBlackScreen), this.game.add.tween(this._overBlackScreen).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, !0).onComplete.addOnce((function() {
                this._overBlackScreen.visible = !1
            }), this)
        }, i.prototype.createLoseScreen = function() {
            this._overBlackScreen = this.game.add.sprite(0, 0, "gameAssets", "bg"), this._overBlackScreen.inputEnabled = !0, this._overBlackScreen.alpha = .75, this._overBlackScreen.visible = !1, this._overRedScreen = this.game.add.sprite(0, 0, "gameAssets", "redOverlay"), this._overRedScreen.anchor.set(.5, .5), this._overRedScreen.visible = !1, this._noMoreMovesBack = this.game.make.sprite(0, 0, "gameAssets", "gameoverPanel"), this._noMoreMovesBack.anchor.set(.5, .5), this._noMoreMovesBack.visible = !1;
            var t = this.game.make.text(0, -20, e.Boot.langConfig.noMoreMovesText[0], {
                font: "40px " + e.Boot.fontName,
                fill: "#0e0e0e"
            });
            t.anchor.set(.5, .5);
            var i = this.game.make.text(0, 30, e.Boot.langConfig.noMoreMovesText[1], {
                font: "24px " + e.Boot.fontName,
                fill: "#0e0e0e"
            });
            i.anchor.set(.5, .5), this._noMoreMovesBack.addChild(t), this._noMoreMovesBack.addChild(i), this._overGroup = this.game.add.group(), this._overPopUp = new e.OverPopUp(this.game, 0, 0), this._continuePopUp = new e.ContinuePopUp(this.game, 0, 0), this._overGroup.add(this._noMoreMovesBack), this._overGroup.add(this._continuePopUp), this._overGroup.add(this._overRedScreen), this._overGroup.add(this._overPopUp), this._overPopUp.visible = !1, this._continuePopUp.visible = !1
        }, i.prototype.resetCombo = function() {
            this._currentCombo = 0, this._comboTimer.stop(!1)
        }, i.prototype.checkCombo = function() {
            this._comboTimer.running && this._comboTimer.stop(!1);
            for (var t, i = 0, o = 0; o < arguments[0]; o++) this._currentCombo++, this._currentCombo < 4 ? i += 15 : this._currentCombo < 7 ? i += 25 : i += 35;
            e.Boot.removedLinesAtRow = Math.max(e.Boot.removedLinesAtRow, this._currentCombo), t = (arguments[0] + i) * this._boosterComboMultiplier * (1 + e.Boot.gameConfig.achievementBonus * e.Boot.achieveManager.openedCount / 100), e.Boot.addMoney(Math.ceil(t / 10)), this.addScore(t), this.showMoodUp(this._currentCombo), this._comboTimer.start(this._boosterComboDelay), this.saveGame(), e.Boot.firstTimePlay && (1 == this._tutorialStep ? this.showSecondTutorialPart() : 2 == this._tutorialStep && this.disableTutorial())
        }, i.prototype.showMoodUp = function(t) {
            this.game.tweens.removeFrom(this._moodUpBack), this.game.tweens.removeFrom(this._moodUpText1), this._moodUpBack.visible = !0, this._moodUpBack.angle = 0, this._moodUpContainer.visible = !0, this._moodUpBack.scale.set(0, 0), this._moodUpContainer.scale.set(0, 0), this._moodUpBack.alpha = 1, this._moodUpContainer.alpha = 1, this._moodUpText1.text = this._shotOuts[Math.floor(Math.random() * this._shotOuts.length)], this._moodUpText1.position.set(0, 0), this._moodUpText1.addColor("#ffffff", 0), this._moodUpText1.visible = !0, this._moodUpText2.visible = !1, t > 1 ? (this._moodUpText1.position.set(0, 50), this._moodUpText2.position.set(0, -50), this._moodUpText2.visible = !0, this._moodUpText2.text = t + "", this._moodUpText1.text = e.Boot.langConfig.comboText) : this._moodUpBack.visible = !1, 3 == t ? this._comboParticleEmmiter.explode(5e3, 80) : t >= 4 && this._comboParticleEmmiter.explode(5e3, 140), this.game.add.tween(this._moodUpBack.scale).to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._moodUpContainer.scale).to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._moodUpContainer).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0, 900), this.game.add.tween(this._moodUpBack).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0, 900), this.game.add.tween(this._moodUpBack).to({
                angle: 90
            }, 1300, Phaser.Easing.Cubic.Out, !0), this.game.time.events.add(1100, this.hideMoodUp, this)
        }, i.prototype.hideMoodUp = function() {
            this._moodUpBack.visible = !1, this._moodUpText1.visible = !1
        }, i.prototype.setScore = function(e) {
            this.game.tweens.removeFrom(this), this._currScore = parseInt(this._scoreText.text);
            var t = this.game.add.tween(this).to({
                _currScore: e
            }, 350, Phaser.Easing.Linear.None, !0);
            t.onUpdateCallback((function() {
                this._scoreText.text = Math.floor(this._currScore) + ""
            }), this), t.onComplete.addOnce((function() {
                this._scoreText.text = e + "", t = null
            }), this)
        }, i.prototype.arraySum = function(e) {
            for (var t = 0, i = 0; i < e.length; i++) t += e[i];
            return t
        }, i.prototype.weightedRandom = function(e, t) {
            for (var i = this.arraySum(t), o = 0, s = Math.floor(Math.random() * i) + 1, a = 0; a < e.length; a++)
                if ((o += t[a]) >= s) return e[a]
        }, i.prototype.addScore = function(t) {
            this._gameScore += Math.ceil(t * this._boosterPointsMultiplier), e.GameEvent.onScoreChange.dispatch(this._gameScore), this.setScore(this._gameScore), this.checkRank(), e.Boot.totalPoints = this._gameScore, e.Boot.highScorePoints = Math.max(e.Boot.highScorePoints, e.Boot.totalPoints), e.GameEvent.achieveSignal.dispatch()
        }, i.prototype.createBlocks = function() {
            this._blocksGroup = this.game.add.group(), e.Boot.firstTimePlay || this.checkBlocks(this._prevSessionExist)
        }, i.prototype.getRandomBlock = function(t, i) {
            switch (this.weightedRandom(this._elementsList, this._elementsWeightList)) {
                case "Dot":
                    return new e.SimpleDot(this.game, t, i);
                case "SquareTwo":
                    return new e.SquareTwo(this.game, t, i);
                case "SquareThree":
                    return new e.SquareThree(this.game, t, i);
                case "LineTwo":
                    return new e.LineTwo(this.game, t, i);
                case "LineThree":
                    return new e.LineThree(this.game, t, i);
                case "LineFour":
                    return new e.LineFour(this.game, t, i);
                case "LineFive":
                    return new e.LineFive(this.game, t, i);
                case "NookTwo":
                    return new e.NookTwo(this.game, t, i);
                case "NookThree":
                    return new e.NookThree(this.game, t, i);
                case "NookFour":
                    return new e.NookFour(this.game, t, i)
            }
        }, i.prototype.checkBlocksOnStone = function() {
            var e = !0;
            null != this._leftBlock && (this._gameField.checkIfStone(this._leftBlock), this._leftBlock.isItStone || (e = !1)), null != this._midBlock && (this._gameField.checkIfStone(this._midBlock), this._midBlock.isItStone || (e = !1)), null != this._rightBlock && (this._gameField.checkIfStone(this._rightBlock), this._rightBlock.isItStone || (e = !1)), e && sdkHandler.trigger("beforePlayButtonDisplay", {
                callback: function() {
                    this._gameField.wasLineAnimated ? this.game.time.events.add(1400, this.showNoMoreMoves, this) : this.showNoMoreMoves()
                }
            }, this)
        }, i.prototype.checkBlocks = function(t) {
            void 0 === t && (t = !1), e.Boot.firstTimePlay || (t ? null == this._leftBlock && null == this._midBlock && null == this._rightBlock && this.resetBlocks(t) : (null == this._leftBlock && null == this._midBlock && null == this._rightBlock && this.resetBlocks(), this.checkBlocksOnStone()))
        }, i.prototype.resetBlocks = function(e) {
            if (void 0 === e && (e = !1), null != this._leftBlock && this.removeExistingBlocks(this._leftBlock), null != this._midBlock && this.removeExistingBlocks(this._midBlock), null != this._rightBlock && this.removeExistingBlocks(this._rightBlock), this.game.device.desktop || this.game.scale.isLandscape) {
                if (e) {
                    do {
                        this._leftBlock = this.getRandomBlock(this._leftPanel.x + this.game.width / 2, this._leftPanel.y)
                    } while (this._gameField.checkIfStone(this._leftBlock));
                    do {
                        this._midBlock = this.getRandomBlock(this._midPanel.x + this.game.width / 2, this._midPanel.y)
                    } while (this._gameField.checkIfStone(this._midBlock));
                    do {
                        this._rightBlock = this.getRandomBlock(this._rightPanel.x + this.game.width / 2, this._rightPanel.y)
                    } while (this._gameField.checkIfStone(this._rightBlock))
                } else this._leftBlock = this.getRandomBlock(this._leftPanel.x + this.game.width / 2, this._leftPanel.y), this._midBlock = this.getRandomBlock(this._midPanel.x + this.game.width / 2, this._midPanel.y), this._rightBlock = this.getRandomBlock(this._rightPanel.x + this.game.width / 2, this._rightPanel.y);
                this.game.tweens.removeFrom(this._leftBlock), this.game.add.tween(this._leftBlock).to({
                    x: this._leftPanel.x
                }, 250, Phaser.Easing.Cubic.Out, !0), this.game.tweens.removeFrom(this._midBlock), this.game.add.tween(this._midBlock).to({
                    x: this._midPanel.x
                }, 250, Phaser.Easing.Cubic.Out, !0, 100), this.game.tweens.removeFrom(this._rightBlock), this.game.add.tween(this._rightBlock).to({
                    x: this._rightPanel.x
                }, 250, Phaser.Easing.Cubic.Out, !0, 200)
            } else {
                if (e) {
                    do {
                        this._leftBlock = this.getRandomBlock(this._leftPanel.x, this._leftPanel.y + 480)
                    } while (this._gameField.checkIfStone(this._leftBlock));
                    do {
                        this._midBlock = this.getRandomBlock(this._midPanel.x, this._midPanel.y + 480)
                    } while (this._gameField.checkIfStone(this._midBlock));
                    do {
                        this._rightBlock = this.getRandomBlock(this._rightPanel.x, this._rightPanel.y + 480)
                    } while (this._gameField.checkIfStone(this._rightBlock))
                } else this._leftBlock = this.getRandomBlock(this._leftPanel.x, this._leftPanel.y + 480), this._midBlock = this.getRandomBlock(this._midPanel.x, this._midPanel.y + 480), this._rightBlock = this.getRandomBlock(this._rightPanel.x, this._rightPanel.y + 480);
                this.game.tweens.removeFrom(this._leftBlock), this.game.add.tween(this._leftBlock).to({
                    y: this._leftPanel.y
                }, 250, Phaser.Easing.Cubic.Out, !0), this.game.tweens.removeFrom(this._midBlock), this.game.add.tween(this._midBlock).to({
                    y: this._midPanel.y
                }, 250, Phaser.Easing.Cubic.Out, !0, 100), this.game.tweens.removeFrom(this._rightBlock), this.game.add.tween(this._rightBlock).to({
                    y: this._rightPanel.y
                }, 250, Phaser.Easing.Cubic.Out, !0, 200)
            }
            this._leftBlock.inputEnabled = !0, this._leftBlock.input.enableDrag(!0), this._leftBlock.events.onDragStart.add(this.dragIt, this), this._leftBlock.events.onDragUpdate.add(this.updateDrag, this), this._leftBlock.input.dragOffset.set(0, -this._leftBlock.halfHeight), this._leftBlock.events.onDragStop.add(this.stopDrag, this), this._blocksGroup.add(this._leftBlock), this._midBlock.inputEnabled = !0, this._midBlock.input.enableDrag(!0), this._midBlock.events.onDragStart.add(this.dragIt, this), this._midBlock.events.onDragUpdate.add(this.updateDrag, this), this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight), this._midBlock.events.onDragStop.add(this.stopDrag, this), this._blocksGroup.add(this._midBlock), this._rightBlock.inputEnabled = !0, this._rightBlock.input.enableDrag(!0), this._rightBlock.events.onDragStart.add(this.dragIt, this), this._rightBlock.events.onDragUpdate.add(this.updateDrag, this), this._rightBlock.input.dragOffset.set(0, -this._rightBlock.halfHeight), this._rightBlock.events.onDragStop.add(this.stopDrag, this), this._blocksGroup.add(this._rightBlock), this.game.device.desktop || (this._leftBlock.input.dragOffset.set(0, 2 * -this._leftBlock.halfHeight), this._midBlock.input.dragOffset.set(0, 2 * -this._midBlock.halfHeight), this._rightBlock.input.dragOffset.set(0, 2 * -this._rightBlock.halfHeight))
        }, i.prototype.stopDrag = function(t, i) {
            var o = this._gameField.getOverlapTiles(t);
            this._gameField.unhintTheField(), -1 != o ? (e.Boot.sfxEnable && this._insertSound.play(), this.addScore(t.blockScore), this.game.tweens.removeFrom(t), this._gameField.fillTheShape(o, t), this._blocksGroup.remove(t), t.events.onDragStart.removeAll(this), t.events.onDragUpdate.removeAll(this), t.events.onDragStop.removeAll(this), t.destroy(), t == this._leftBlock ? this._leftBlock = null : t == this._midBlock ? this._midBlock = null : t == this._rightBlock && (this._rightBlock = null), this.checkBlocks()) : (t.scaleDown(), t == this._leftBlock ? this.game.add.tween(t).to({
                x: this._leftPanel.x,
                y: this._leftPanel.y
            }, 200, Phaser.Easing.Cubic.Out, !0) : t == this._midBlock ? this.game.add.tween(t).to({
                x: this._midPanel.x,
                y: this._midPanel.y
            }, 200, Phaser.Easing.Cubic.Out, !0) : t == this._rightBlock && this.game.add.tween(t).to({
                x: this._rightPanel.x,
                y: this._rightPanel.y
            }, 200, Phaser.Easing.Cubic.Out, !0)), e.Boot.firstTimePlay && (this._showHand = !0), this.saveGame()
        }, i.prototype.updateDrag = function(e, t) {
            this._isSinglePlace || (this._gameField.unhintTheField(), this._gameField.showBlockShadow(e))
        }, i.prototype.dragIt = function(t, i) {
            e.Boot.firstTimePlay, e.Boot.sfxEnable && this._grabSound.play(), t.scaleUp(), this._isSinglePlace = this._gameField.checkIfOnePlace(t)
        }, i.prototype.checkOverlap = function(e, t) {
            var i = e.getBounds(),
                o = new Phaser.Rectangle(i.x + i.width / 4, i.y + i.height / 4, i.width / 4, i.height / 4),
                s = t.getBounds();
            return Phaser.Rectangle.intersects(o, s)
        }, i.prototype.checkRank = function(t) {
            void 0 === t && (t = !1);
            for (var i = this._currentRank; this._gameScore >= e.Boot.gameConfig.medalsAchievesCount[this._currentRank] && this._currentRank != e.Boot.gameConfig.medalsAchievesCount.length - 1;) this._currentRank++;
            this._currentRank > i ? this.changeMedal(t) : 0 == this._currentRank && (this._medalSprite.visible = !1), this._rankText.text = e.Boot.langConfig.medalNames[this._currentRank] + "/" + e.Boot.gameConfig.medalsAchievesCount[this._currentRank], 0 != this._currentRank ? this._progressBarMask.scale.set(Math.min((this._gameScore - e.Boot.gameConfig.medalsAchievesCount[this._currentRank - 1]) / (e.Boot.gameConfig.medalsAchievesCount[this._currentRank] - e.Boot.gameConfig.medalsAchievesCount[this._currentRank - 1])), 1) : this._progressBarMask.scale.set(Math.min(this._gameScore / e.Boot.gameConfig.medalsAchievesCount[this._currentRank]), 1)
        }, i.prototype.changeMedal = function(t) {
            if (this.game.tweens.removeFrom(this._medalSprite), t) switch (this._medalSprite.y = this._rankBack.y, this._medalSprite.visible = !0, this._currentRank) {
                case 1:
                    this._medalSprite.frameName = "bronze";
                    break;
                case 2:
                    this._medalSprite.frameName = "silver";
                    break;
                case 3:
                    this._medalSprite.frameName = "gold";
                    break;
                case 4:
                    this._medalSprite.frameName = "platin";
                    break;
                case 5:
                    this._medalSprite.frameName = "diamond";
                    break;
                case 6:
                    this._medalSprite.frameName = "champion";
                    break;
                case 7:
                    this._medalSprite.frameName = "grandchampion"
            } else 1 == this._currentRank ? (e.Boot.sfxEnable && this._newMedalSound.play(), this._medalSprite.y = -100, this._medalSprite.visible = !0, this._medalSprite.frameName = "bronze", this.game.time.events.add(400, this.emitMedalParticles, this), this.game.make.tween(this._medalSprite).to({
                y: this._rankBack.y
            }, 2e3, Phaser.Easing.Elastic.Out, !0)) : (e.Boot.sfxEnable && this._newMedalSound.play(), this._medalSprite.visible = !0, this.game.tweens.removeFrom(this._medalSprite), this.game.make.tween(this._medalSprite).to({
                y: -100
            }, 700, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce((function() {
                switch (this._currentRank) {
                    case 1:
                        this._medalSprite.frameName = "bronze";
                        break;
                    case 2:
                        this._medalSprite.frameName = "silver";
                        break;
                    case 3:
                        this._medalSprite.frameName = "gold";
                        break;
                    case 4:
                        this._medalSprite.frameName = "platin";
                        break;
                    case 5:
                        this._medalSprite.frameName = "diamond";
                        break;
                    case 6:
                        this._medalSprite.frameName = "champion";
                        break;
                    case 7:
                        this._medalSprite.frameName = "grandchampion"
                }
                this.game.time.events.add(400, this.emitMedalParticles, this), this.game.make.tween(this._medalSprite).to({
                    y: this._rankBack.y
                }, 2e3, Phaser.Easing.Elastic.Out, !0)
            }), this))
        }, i.prototype.emitMedalParticles = function() {
            this._medalParticleEmmiter.explode(5e3)
        }, i.prototype.createTopUI = function() {
            this._topBack = this.game.make.sprite(0, 0, "gameAssets", "topUI"), this._topBack.anchor.set(.5, 0), this._progressBar = this.game.make.sprite(-190, 60, "gameAssets", "topUIline"), this._progressBar.anchor.set(0, .5), this._progressBarFill = this.game.make.sprite(this._progressBar.x + 2, this._progressBar.y, "gameAssets", "lineAnimation_00"), this._progressBarFill.anchor.set(0, .5), this._progressBarFill.animations.add("idle", Phaser.Animation.generateFrameNames("lineAnimation_", 0, 10, "", 2), 18, !0), this._progressBarFill.play("idle"), this._progressBarMask = this.game.make.graphics(this._progressBarFill.x, this._progressBarFill.y - this._progressBarFill.height / 2), this._progressBarMask.beginFill(16777215), this._progressBarMask.drawRect(0, 0, this._progressBarFill.width, this._progressBarFill.height), this._progressBarFill.mask = this._progressBarMask, this._progressBarMask.scale.set(0, 1), this._rankBack = this.game.make.sprite(this._progressBar.x + this._progressBar.width + 30, this._progressBar.y, "gameAssets", "topUICircle"), this._rankBack.anchor.set(.5, .5), this._medalSprite = this.game.make.sprite(this._rankBack.x, this._progressBar.y, "gameAssets", "bronze"), this._medalSprite.anchor.set(.5, .5), this._medalSprite.visible = !1, this._pauseButton = new e.UIButton(this.game, -260, 60, "pause", this.showPause.bind(this)), this._pauseButton.showBtn(!0), this._rankText = this.game.make.text(this._rankBack.x - this._rankBack.width / 2, this._rankBack.y - this._progressBar.height / 2, "", {
                font: "28px " + e.Boot.fontName,
                fill: "#ffffff"
            }), this._rankText.anchor.set(1, 1), this._scoreDescriptionText = this.game.make.text(0, 190, e.Boot.langConfig.scoreText, {
                font: "40px " + e.Boot.fontName,
                fill: "#d276f6"
            }), this._scoreDescriptionText.anchor.set(.5, 1), this._scoreText = this.game.make.text(0, this._scoreDescriptionText.y - this._scoreDescriptionText.height, "" + this._currScore, {
                font: "50px " + e.Boot.fontName,
                fill: "#ffffff"
            }), this._scoreText.anchor.set(.5, 1), this._giftIcon = this.game.make.sprite(240, 150, "gameAssets", "giftIcon"), this._giftIcon.anchor.set(.5, .5), this._giftIcon.inputEnabled = !0, this._giftIcon.events.onInputUp.add(this.showBonusPopUp, this), this._giftNotification = this.game.make.sprite(this._giftIcon.x + this._giftIcon.width / 2 - 5, this._giftIcon.y - 10, "gameAssets", "giftPart"), this._giftNotification.anchor.set(.5, .5), this._giftIcon.visible = !1, this._giftNotification.visible = !1, this._boosterBack = this.game.make.sprite(-240, 150, "gameAssets", "boosterUI1"), this._boosterBack.anchor.set(.5, .5), this._boosterFill = this.game.make.sprite(this._boosterBack.x - this._boosterBack.width / 2, this._boosterBack.y + this._boosterBack.height / 2, "gameAssets", "boosterUI2"), this._boosterFill.anchor.set(0, 1), this._boosterMask = this.game.make.graphics(this._boosterFill.x, this._boosterFill.y), this._boosterMask.beginFill(16777215), this._boosterMask.drawRect(0, 0, this._boosterFill.width, this._boosterFill.height), this._boosterFill.mask = this._boosterMask, this._boosterMask.scale.set(1, -1), this._boosterBack.visible = !1, this._boosterFill.visible = !1, this._boosterMask.visible = !1, this._popUpAchieveBack = this.game.make.sprite(0, -200, "gameAssets", "popupPanel"), this._popUpAchieveBack.anchor.set(.5, .5), this._popUpAchieveIcon = this.game.make.sprite(144, -7, "gameAssets", "achievmentIcon"), this._popUpAchieveIcon.anchor.set(.5, .5), this._popUpAchieveIcon.scale.set(.8, .8), this.game.renderer.type != Phaser.CANVAS ? this._popUpAchieveDescription = this.game.make.sprite(-50, 17, "menuTextAtlas", "medal1") : this._popUpAchieveDescription = this.game.make.text(-50, 17, "", {
                font: "24px " + e.Boot.fontName,
                fill: "#ffffff"
            }), this._popUpAchieveDescription.anchor.set(.5, .5), this._popUpAchieveInfoText = this.game.make.text(-50, -28, e.Boot.langConfig.newAchieveText, {
                font: "24px " + e.Boot.fontName,
                fill: "#ffffff"
            }), this._popUpAchieveInfoText.anchor.set(.5, .5), this._popUpAchieveBack.addChild(this._popUpAchieveIcon), this._popUpAchieveBack.addChild(this._popUpAchieveDescription), this._popUpAchieveBack.addChild(this._popUpAchieveInfoText), this._popUpAchieveBack.visible = !1, this._topPanels = this.game.add.group(), this._topPanels.add(this._topBack), this._topPanels.add(this._rankText), this._topPanels.add(this._scoreText), this._topPanels.add(this._scoreDescriptionText), this._topPanels.add(this._progressBar), this._topPanels.add(this._progressBarFill), this._topPanels.add(this._progressBarMask), this._topPanels.add(this._rankBack), this._topPanels.add(this._medalSprite), this._topPanels.add(this._pauseButton), this._topPanels.add(this._giftIcon), this._topPanels.add(this._giftNotification), this._topPanels.add(this._boosterBack), this._topPanels.add(this._boosterFill), this._topPanels.add(this._boosterMask), this._topPanels.add(this._popUpAchieveBack), this.hideGift(), this.checkRank(!0), this._medalParticleEmmiter = this.game.make.emitter(0, 0, 60), this._medalParticleEmmiter.makeParticles("gameAssets", "particleStar"), this._medalParticleEmmiter.setXSpeed(-350, 200), this._medalParticleEmmiter.setYSpeed(-200, 150), this._medalParticleEmmiter.minParticleScale = .4, this._medalParticleEmmiter.maxParticleScale = 1, this._medalParticleEmmiter.gravity.set(0, 250), this._medalParticleEmmiter.particleAnchor.set(.5, .5)
        }, i.prototype.updateBoosterState = function(e) {
            void 0 === e && (e = !1), this._giftIcon.visible ? (this._giftTimeToHide--, this._giftTimeToHide <= 0 && this.hideGift()) : (this._giftTimeToShow--, this._giftTimeToShow <= 0 && this.showGift()), e ? (this._boosterBack.visible = !0, this._boosterBack.frameName = "boosterUI1", this._boosterFill.visible = !0, this._boosterMask.visible = !0, this._boosterMask.scale.set(1, -1)) : this._boosterStep > 0 && (this._boosterStep--, 0 == this._currentBoosterType ? this._boosterMask.scale.set(1, -this._boosterStep / 3) : this._boosterMask.scale.set(1, -this._boosterStep / 10), 0 == this._boosterStep && (this._boosterBack.visible = !1, this._boosterFill.visible = !1, this._boosterMask.visible = !1, this._boosterPointsMultiplier = 1, this._boosterComboMultiplier = 1, this._boosterComboDelay = 0))
        }, i.prototype.shakeGift = function() {
            this.game.add.tween(this._giftIcon.scale).to({
                x: 1.2,
                y: 1.2
            }, 500, Phaser.Easing.Bounce.Out, !0, 0, 2, !0)
        }, i.prototype.showGift = function() {
            this._currentBoosterType = Math.floor(3 * Math.random()), this._bonusDescription.text = e.Boot.langConfig.boosterDescriptions[this._currentBoosterType], this._giftTimeToHide = 3, this._giftIcon.visible = !0, this._giftIcon.position.y = 50, this._giftIcon.alpha = .5, this._giftIcon.scale.set(1, 1), this.game.add.tween(this._giftIcon).to({
                x: 240,
                y: 150,
                alpha: 1
            }, 400, Phaser.Easing.Bounce.Out, !0), this.game.time.events.add(400, (function() {
                this._giftNotification.visible = !0, this._giftShakeTimer.start()
            }), this)
        }, i.prototype.hideGift = function() {
            this._giftTimeToShow = Phaser.Math.between(7, 13), this.game.tweens.removeFrom(this._giftIcon.scale), this._giftShakeTimer.stop(!1), this.game.add.tween(this._giftIcon.scale).to({
                x: 0,
                y: 0
            }, 200, Phaser.Easing.Cubic.In, !0).onComplete.addOnce((function() {
                this._giftIcon.visible = !1
            }), this), this._giftNotification.visible = !1
        }, i.prototype.createBottomUI = function() {
            this._bottomBack = this.game.make.sprite(0, 0, "gameAssets", "botUI"), this._bottomBack.anchor.set(.5, 1), this._midPanel = this.game.make.sprite(0, 0, "gameAssets", "bigSquareBottom"), this._midPanel.anchor.set(.5, .5), this._midPanel.position.set(0, -20 - this._midPanel.height / 2), this._leftPanel = this.game.make.sprite(0, 0, "gameAssets", "bigSquareBottom"), this._leftPanel.anchor.set(.5, .5), this._leftPanel.position.set(-200, -20 - this._midPanel.height / 2), this._rightPanel = this.game.make.sprite(0, 0, "gameAssets", "bigSquareBottom"), this._rightPanel.anchor.set(.5, .5), this._rightPanel.position.set(200, -20 - this._midPanel.height / 2), this._bottomPanels = this.game.add.group(), this._bottomPanels.add(this._bottomBack), this._bottomPanels.add(this._midPanel), this._bottomPanels.add(this._leftPanel), this._bottomPanels.add(this._rightPanel), this.game.device.desktop || this.game.scale.isLandscape ? (this._bottomBack.visible = !1, this._leftPanel.position.set(0, -200), this._midPanel.position.set(0, 0), this._rightPanel.position.set(0, 200)) : (this._bottomBack.visible = !0, this._leftPanel.position.set(-200, -20 - this._midPanel.height / 2), this._midPanel.position.set(0, -20 - this._midPanel.height / 2), this._rightPanel.position.set(200, -20 - this._midPanel.height / 2))
        }, i.prototype.createField = function() {
            this._gameField = new e.GameField(this.game, 0, 0), this.game.add.existing(this._gameField), this._prevSessionExist && this._gameField.loadExistingField()
        }, i.prototype.createMoodUp = function() {
            this._comboParticleEmmiter = this.game.make.emitter(0, 0, 500), this._comboParticleEmmiter.makeParticles("gameAssets", "particleStar"), this._comboParticleEmmiter.setXSpeed(-300, 300), this._comboParticleEmmiter.setYSpeed(-300, 300), this._comboParticleEmmiter.minParticleScale = .4, this._comboParticleEmmiter.maxParticleScale = 1, this._comboParticleEmmiter.particleAnchor.set(.5, .5), this._moodUpGroup = this.game.add.group(), this._moodUpBack = this.game.make.sprite(0, 0, "gameAssets", "lightRay"), this._moodUpBack.anchor.set(.5, .5), this._moodUpText1 = this.game.make.text(0, 0, "", {
                font: "90px " + e.Boot.fontName,
                fill: "#ffffff"
            }), this._moodUpText1.anchor.set(.5, .5), this._moodUpText2 = this.game.make.text(0, 0, "", {
                font: "90px " + e.Boot.fontName,
                fill: "#ffd040"
            }), this._moodUpText2.anchor.set(.5, .5), this._moodUpContainer = this.game.make.sprite(0, 0, "gameAssets", "emptySprite"), this._moodUpContainer.anchor.set(.5, .5), this._moodUpContainer.angle = -15, this._moodUpBack.visible = !1, this._moodUpContainer.visible = !1, this._moodUpContainer.addChild(this._moodUpText1), this._moodUpContainer.addChild(this._moodUpText2), this._tutorialTextContainer = this.game.make.sprite(0, 0), this._tutorialTextContainer.anchor.set(.5, .5), this._tutorialTextBack = this.game.make.sprite(0, 0, "gameAssets", "ftePanel"), this._tutorialTextBack.anchor.set(.5, .5), this._tutorialHeaderText = this.game.make.text(0, -this._tutorialTextBack.height / 2 + 25, "header", {
                font: "40px " + e.Boot.fontName,
                fill: "#0e0e0e"
            }), this._tutorialHeaderText.anchor.set(.5, .5), this._tutorialDescriptionText = this.game.make.text(0, 10, "", {
                font: "25px " + e.Boot.fontName,
                fill: "#0e0e0e",
                wordWrap: !0,
                wordWrapWidth: 420
            }), this._tutorialDescriptionText.anchor.set(.5, .5), this._tutorialTextContainer.addChild(this._tutorialTextBack), this._tutorialTextContainer.addChild(this._tutorialHeaderText), this._tutorialTextContainer.addChild(this._tutorialDescriptionText), this._tutorialTextContainer.visible = !1, this._moodUpGroup.add(this._tutorialTextContainer), this._moodUpGroup.add(this._moodUpBack), this._moodUpGroup.add(this._moodUpContainer)
        }, i.prototype.overThisTry = function() {
            this.resetCombo(), this._gameField.clearField(), null != this._leftBlock && (this._blocksGroup.remove(this._leftBlock), this._leftBlock.events.onDragStart.removeAll(this), this._leftBlock.events.onDragUpdate.removeAll(this), this._leftBlock.events.onDragStop.removeAll(this), this._leftBlock.destroy(), this._leftBlock = null), null != this._midBlock && (this._blocksGroup.remove(this._midBlock), this._midBlock.events.onDragStart.removeAll(this), this._midBlock.events.onDragUpdate.removeAll(this), this._midBlock.events.onDragStop.removeAll(this), this._midBlock.destroy(), this._midBlock = null), null != this._rightBlock && (this._blocksGroup.remove(this._rightBlock), this._rightBlock.events.onDragStart.removeAll(this), this._rightBlock.events.onDragUpdate.removeAll(this), this._rightBlock.events.onDragStop.removeAll(this), this._rightBlock.destroy(), this._rightBlock = null), this.game.time.events.add(1e3, this.showOverPopUp, this)
        }, i.prototype.shakeExistingBlocks = function() {
            null != this._leftBlock && this.game.add.tween(this._leftBlock).to({
                x: this._leftBlock.x + 10
            }, 100, Phaser.Easing.Linear.None, !0, 0, 6, !0), null != this._midBlock && this.game.add.tween(this._midBlock).to({
                x: this._midBlock.x + 10
            }, 100, Phaser.Easing.Linear.None, !0, 0, 6, !0), null != this._rightBlock && this.game.add.tween(this._rightBlock).to({
                x: this._rightBlock.x + 10
            }, 100, Phaser.Easing.Linear.None, !0, 0, 6, !0)
        }, i.prototype.showNoMoreMoves = function() {
            var e = this;
            this.shakeExistingBlocks(), this._overBlackScreen.alpha = 0, this._overBlackScreen.visible = !0, this._noMoreMovesBack.visible = !0, this._noMoreMovesBack.y = this.game.height / this._overGroup.scale.y, this.game.add.tween(this._noMoreMovesBack).to({
                y: 0
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 1e3).onComplete.addOnce((function() {
                e.game.add.tween(e._noMoreMovesBack).to({
                    y: -e.game.height / e._overGroup.scale.y
                }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 3e3).onComplete.addOnce((function() {
                    e._noMoreMovesBack.visible = !1, e._canBeContinued ? e.showContinuePopUp() : e.overThisTry()
                }), e)
            }), this)
        }, i.prototype.showContinuePopUp = function() {
            this._overBlackScreen.alpha = 0, this._overBlackScreen.visible = !0, this._overRedScreen.alpha = .5, this._overRedScreen.visible = !0, this.game.add.tween(this._overBlackScreen).to({
                alpha: .75
            }, 400, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._overRedScreen).to({
                alpha: 1
            }, 500, Phaser.Easing.Cubic.Out, !0, 0, -1, !0), this._continuePopUp.show(400), this._continuePopUp.checkIsEnoughMoney(), this._continuePopUp.position.set(0, 1440), this.game.add.tween(this._continuePopUp).to({
                y: 0
            }, 400, Phaser.Easing.Cubic.Out, !0), this._canBeContinued = !1
        }, i.prototype.hideContinuePopUp = function(e) {
            void 0 === e && (e = !0), this.game.tweens.removeFrom(this._overRedScreen), this.game.add.tween(this._overBlackScreen).to({
                alpha: 0
            }, 400, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce((function() {
                this._overBlackScreen.visible = !1, this._overRedScreen.visible = !1
            }), this), this.game.add.tween(this._continuePopUp).to({
                y: -1440
            }, 400, Phaser.Easing.Cubic.Out, !0), e ? this.game.time.events.add(400, this.overThisTry, this) : (this._gameField.clearToContinue(), this.checkBlocks())
        }, i.prototype.hideAllGameText = function() {
            this._rankText.visible = !1, this._scoreText.visible = !1, this._gameField.visible = !1
        }, i.prototype.showAllGameText = function() {
            this._rankText.visible = !0, this._scoreText.visible = !0, this._gameField.visible = !0
        }, i.prototype.showOverPopUp = function() {
            e.Boot.sfxEnable && this._loseSound.play(), this.hideAllGameText(), this._overBlackScreen.alpha = 0, this._overBlackScreen.visible = !0, this.game.add.tween(this._overBlackScreen).to({
                alpha: .75
            }, 400, Phaser.Easing.Cubic.Out, !0), this._overPopUp.show(400), this._overPopUp.position.set(0, 1440), this.game.add.tween(this._overPopUp).to({
                y: 0
            }, 400, Phaser.Easing.Cubic.Out, !0), this._overPopUp.showNewAchieves(), this._gameScore = 0, this._currentRank = 0, this.setScore(0), this.checkRank(), e.Boot.totalPoints = this._gameScore, this.saveGame()
        }, i.prototype.removeExistingBlocks = function(e) {
            this.game.tweens.removeFrom(e), this._blocksGroup.remove(e), e.events.onDragStart.removeAll(this), e.events.onDragUpdate.removeAll(this), e.events.onDragStop.removeAll(this), e.destroy(), e == this._leftBlock ? this._leftBlock = null : e == this._midBlock ? this._midBlock = null : e == this._rightBlock && (this._rightBlock = null)
        }, i.prototype.restartLevel = function() {
            sdkHandler.trigger("interstitialAd", {
                callback: function() {
                    this.showAllGameText(), this._overBlackScreen.visible = !1, this._overPopUp.visible = !1, this.hideGift(), this._boosterStep = 1, this.updateBoosterState(), this._gameField.clearField(), this.hidePause(), this.resetBlocks(), this.resetCombo(), this._gameScore = 0, this._currentRank = 0, e.Boot.totalPoints = this._gameScore, this.setScore(0), this._canBeContinued = !0, this.checkRank(), this.saveGame(), sdkHandler.trigger("gameStart")
                }
            }, this)
        }, i.prototype.saveGame = function() {
            this._gameField.saveCurrentField(), e.Boot.saveTheGame()
        }, i.prototype.resize = function() {
            var e = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const t = navigator.userAgent.toLowerCase();
            var i = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(t),
                o = this.game.width / 1152,
                s = this.game.height / 960,
                a = Math.min(o, s);
            e && (a = this.game.width / 640), i && (a = this.game.width / 960), this._background.width = this.game.width, this._background.height = this.game.height, this._overBlackScreen.width = this.game.width, this._overBlackScreen.height = this.game.height, this._popupBlackScreen.width = this.game.width, this._popupBlackScreen.height = this.game.height, this._moodUpGroup.scale.set(a), this._moodUpGroup.position.set(this.game.width / 2, this.game.height / 2), this._topPanels.scale.set(a), this._topPanels.position.set(this.game.width / 2, 0), this._topBack.width = this.game.width / a, this.game.device.desktop || this.game.scale.isLandscape ? (this._bottomBack.visible = !1, this._leftPanel.position.set(0, -200), this._midPanel.position.set(0, 0), this._rightPanel.position.set(0, 200)) : (this._bottomBack.visible = !0, this._leftPanel.position.set(-200, -20 - this._midPanel.height / 2), this._midPanel.position.set(0, -20 - this._midPanel.height / 2), this._rightPanel.position.set(200, -20 - this._midPanel.height / 2)), null != this._leftBlock && (this.game.tweens.removeFrom(this._leftBlock), this._leftBlock.position.set(this._leftPanel.x, this._leftPanel.y)), null != this._midBlock && (this.game.tweens.removeFrom(this._midBlock), this._midBlock.position.set(this._midPanel.x, this._midPanel.y)), null != this._rightBlock && (this.game.tweens.removeFrom(this._rightBlock), this._rightBlock.position.set(this._rightPanel.x, this._rightPanel.y)), this.game.device.desktop || this.game.scale.isLandscape ? (this._gameField.scale.set(1.2 * a), this._gameField.position.set(this.game.width / 2, this.game.height / 2 + 192 * a * 1.2 / 2), this._bottomPanels.scale.set(1.2 * a), this._bottomPanels.position.set(this.game.width / 2 + 400 * a * 1.2, this._gameField.y), this._blocksGroup.scale.set(1.2 * a), this._blocksGroup.position.set(this._bottomPanels.x, this._gameField.y)) : (this._gameField.scale.set(a), this._gameField.position.set(this.game.width / 2, this.game.height / 2), this._bottomPanels.scale.set(a), this._bottomPanels.position.set(this.game.width / 2, this.game.height), this._bottomBack.width = this.game.width / a, this._blocksGroup.scale.set(a), this._blocksGroup.position.set(this.game.width / 2, this.game.height)), this._overGroup.scale.set(a), this._overGroup.position.set(this.game.width / 2, this.game.height / 2), this._overRedScreen.height = 1.096 * this.game.height * (1 / a), this._medalParticleEmmiter.emitX = this._rankBack.x * a + this.game.width / 2, this._medalParticleEmmiter.emitY = this._rankBack.y, this._medalParticleEmmiter.minParticleScale = .4 * a, this._medalParticleEmmiter.maxParticleScale = a, this._comboParticleEmmiter.emitX = this.game.width / 2, this._comboParticleEmmiter.emitY = this.game.height / 2, this._comboParticleEmmiter.minParticleScale = .4 * a, this._comboParticleEmmiter.maxParticleScale = a, this._popUpGroup.scale.set(a), this._popUpGroup.position.set(this.game.width / 2, this.game.height / 2), this._pauseGroup.scale.set(a), this._pauseGroup.position.set(this.game.width / 2, this.game.height / 2), this._closeBtn.position.set(-this._rankBack.x, -this.game.height / 2 / a + this._closeBtn.height)
        }, i.POINTMULT = 0, i.COMBOSCORE = 1, i.COMBODURATION = 2, i
    }(Phaser.State);
    e.Level = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i() {
            var e = t.call(this) || this;
            return e._soundsArray = ["main_theme", "grab_figure", "insert_figure", "line_combo_1", "line_combo_2", "line_combo_3", "lose", "new_medal"], e
        }
        return __extends(i, t), i.prototype.preload = function() {
            this.loadAtlases(["gameAssets"]), this.loadFonts(["" + e.Boot.fontName]), this.loadSettings(["lang"]), this.loadSounds(this._soundsArray), this.game.load.crossOrigin = "anonymous", this.load.onFileComplete.add(this.onLoadProgress, this)
        }, i.prototype.onLoadProgress = function(e, t) {
            sdkHandler.trigger("loading.update", {
                progressPercentage: e
            })
        }, i.prototype.create = function() {
            this.game.renderer.type != Phaser.CANVAS && (e.Boot.texturesArray = this.game.renderer.setTexturePriority(["gameAssets"])), e.Boot.langConfig = JSON.parse(this.game.cache.getText("lang")), e.Boot.langConfig = e.Boot.langConfig[e.Boot.defLang], this.game.renderer.type != Phaser.CANVAS && this.createTextAtlas(), sdkHandler.trigger("loading.completed", {
                callback: function() {
                    e.Boot.saveGameObject = mySaver.get("saveGameObject"), e.Boot.saveGameObject && (e.Boot.firstTimePlay = e.Boot.saveGameObject.firstTimePlay, e.Boot.firstTimePlay || (e.Boot.saveFieldObject = mySaver.get("saveFieldObject"), e.Boot.currentMoney = e.Boot.saveGameObject.currentMoney, e.Boot.totalPoints = e.Boot.saveGameObject.totalPoints, e.Boot.highScorePoints = e.Boot.saveGameObject.highScore, e.Boot.totalLinesRemoved = e.Boot.saveGameObject.linesRemoved, e.Boot.removedLinesAtOnce = e.Boot.saveGameObject.removedLinesAtOnce, e.Boot.removedLinesAtRow = e.Boot.saveGameObject.removedLinesAtRow, e.Boot.cyanBlocksDestroyed = e.Boot.saveGameObject.cyanBlocksDestroyed, e.Boot.pinkBlocksDestroyed = e.Boot.saveGameObject.pinkBlocksDestroyed, e.Boot.redBlocksDestroyed = e.Boot.saveGameObject.redBlocksDestroyed, e.Boot.orangeBlocksDestroyed = e.Boot.saveGameObject.orangeBlocksDestroyed, e.Boot.yellowBlocksDestroyed = e.Boot.saveGameObject.yellowBlocksDestroyed, e.Boot.iceBlocksDestroyed = e.Boot.saveGameObject.iceBlocksDestroyed, e.Boot.greenBlocksDestroyed = e.Boot.saveGameObject.greenBlocksDestroyed, e.Boot.blueBlocksDestroyed = e.Boot.saveGameObject.blueBlocksDestroyed, e.Boot.violetBlocksDestroyed = e.Boot.saveGameObject.violetBlocksDestroyed, e.Boot.purpleBlocksDestroyed = e.Boot.saveGameObject.purpleBlocksDestroyed, e.Boot.moneyTotal = e.Boot.saveGameObject.moneyTotal, e.Boot.totalContinuedGames = e.Boot.saveGameObject.totalContinuedGames), e.Boot.musicEnable = e.Boot.saveGameObject.musicEnable, e.Boot.sfxEnable = e.Boot.saveGameObject.sfxEnable)
                }
            }, this)
        }, i.prototype.createTextAtlas = function() {
            this._textBitmapData = this.game.make.bitmapData(2e3, 2e3);
            for (var t, i = 0, o = 0, s = 1, a = '{"frames":{', n = "", h = 0; h < e.Boot.gameConfig.medalsAchievesCount.length; h++) {
                for (t = new Phaser.Text(this.game, i, o, e.Boot.changedString([e.Boot.langConfig.medalNames[h]], e.Boot.langConfig.medalAchieveText), {
                        font: "24px " + e.Boot.fontName,
                        fill: "#ffffff"
                    }), s = 1; t.width > 350;) t.fontSize = 24 - s, s += 1;
                window.devicePixelRatio > 1 && (t.resolution = e.Boot.dpiScaleFactor), a += '"medal' + h + '":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50)
            }
            for (h = 0; h < e.Boot.gameConfig.clearLinesAchieve.length; h++) {
                for (t = new Phaser.Text(this.game, i, o, e.Boot.changedString([e.Boot.gameConfig.clearLinesAchieve[h]], e.Boot.langConfig.clearLinesAchieveText), {
                        font: "24px " + e.Boot.fontName,
                        fill: "#ffffff"
                    }), s = 1; t.width > 350;) t.fontSize = 24 - s, s += 1;
                window.devicePixelRatio > 1 && (t.resolution = e.Boot.dpiScaleFactor), a += '"clearLine' + h + '":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50)
            }
            for (h = 0; h < e.Boot.gameConfig.linesAtOnceAchieve.length; h++) {
                for (t = new Phaser.Text(this.game, i, o, e.Boot.changedString([e.Boot.gameConfig.linesAtOnceAchieve[h]], e.Boot.langConfig.linesAtOnceAchieveText), {
                        font: "24px " + e.Boot.fontName,
                        fill: "#ffffff"
                    }), s = 1; t.width > 350;) t.fontSize = 24 - s, s += 1;
                window.devicePixelRatio > 1 && (t.resolution = e.Boot.dpiScaleFactor), a += '"linesAtOnce' + h + '":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50)
            }
            for (h = 0; h < e.Boot.gameConfig.linesAtRowAchieve.length; h++) {
                for (t = new Phaser.Text(this.game, i, o, e.Boot.changedString([e.Boot.gameConfig.linesAtRowAchieve[h]], e.Boot.langConfig.linesAtRowAchieveText), {
                        font: "24px " + e.Boot.fontName,
                        fill: "#ffffff"
                    }), s = 1; t.width > 350;) t.fontSize = 24 - s, s += 1;
                window.devicePixelRatio > 1 && (t.resolution = e.Boot.dpiScaleFactor), a += '"linesAtRow' + h + '":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50)
            }
            for (h = 0; h < e.Boot.gameConfig.colorAchieve.length; h++)
                for (var r = 0; r < e.AchieveManager.COLORSARRAY.length; r++) {
                    switch (e.AchieveManager.COLORSARRAY[r]) {
                        case e.AchieveManager.CYANCOUNT:
                            n = e.Boot.langConfig.colorsNames[0];
                            break;
                        case e.AchieveManager.PINKCOUNT:
                            n = e.Boot.langConfig.colorsNames[1];
                            break;
                        case e.AchieveManager.REDCOUNT:
                            n = e.Boot.langConfig.colorsNames[2];
                            break;
                        case e.AchieveManager.ORANGECOUNT:
                            n = e.Boot.langConfig.colorsNames[3];
                            break;
                        case e.AchieveManager.YELLOWCOUNT:
                            n = e.Boot.langConfig.colorsNames[4];
                            break;
                        case e.AchieveManager.ICECOUNT:
                            n = e.Boot.langConfig.colorsNames[5];
                            break;
                        case e.AchieveManager.GREENCOUNT:
                            n = e.Boot.langConfig.colorsNames[6];
                            break;
                        case e.AchieveManager.BLUECOUNT:
                            n = e.Boot.langConfig.colorsNames[7];
                            break;
                        case e.AchieveManager.VIOLETCOUNT:
                            n = e.Boot.langConfig.colorsNames[8];
                            break;
                        case e.AchieveManager.PURPLECOUNT:
                            n = e.Boot.langConfig.colorsNames[9]
                    }
                    for (t = new Phaser.Text(this.game, i, o, e.Boot.changedString([e.Boot.gameConfig.colorAchieve[h], n], e.Boot.langConfig.colorsAchieveText), {
                            font: "24px " + e.Boot.fontName,
                            fill: "#ffffff"
                        }), s = 1; t.width > 350;) t.fontSize = 24 - s, s += 1;
                    window.devicePixelRatio > 1 && (t.resolution = e.Boot.dpiScaleFactor), a += '"' + r + h + '":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50)
                }
            for (h = 0; h < e.Boot.gameConfig.coinsCollectAchieve.length; h++) {
                for (t = new Phaser.Text(this.game, i, o, e.Boot.changedString([e.Boot.gameConfig.coinsCollectAchieve[h]], e.Boot.langConfig.coinsCollectAchieveText), {
                        font: "24px " + e.Boot.fontName,
                        fill: "#ffffff"
                    }), s = 1; t.width > 350;) t.fontSize = 24 - s, s += 1;
                window.devicePixelRatio > 1 && (t.resolution = e.Boot.dpiScaleFactor), a += '"coinsCollect' + h + '":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50)
            }
            for (h = 0; h < e.Boot.gameConfig.continueGameAchieve.length; h++) {
                for (t = new Phaser.Text(this.game, i, o, e.Boot.changedString([e.Boot.gameConfig.continueGameAchieve[h]], e.Boot.langConfig.continueGamesAchieveText), {
                        font: "24px " + e.Boot.fontName,
                        fill: "#ffffff"
                    }), s = 1; t.width > 350;) t.fontSize = 24 - s, s += 1;
                window.devicePixelRatio > 1 && (t.resolution = e.Boot.dpiScaleFactor), a += '"continuedGames' + h + '":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50)
            }
            for ((t = new Phaser.Text(this.game, i, o, e.Boot.langConfig.newText, {
                    font: "24px " + e.Boot.fontName,
                    fill: "#eb490f",
                    stroke: "#fcff91",
                    strokeThickness: 2
                })).resolution = window.devicePixelRatio, a += '"newText":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50), a += '"gameOverTitle":{"frame":{"x":' + (t = new Phaser.Text(this.game, i, o, e.Boot.langConfig.gameOverText, {
                    font: "48px " + e.Boot.fontName,
                    fill: "#242424"
                })).x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50), t = new Phaser.Text(this.game, i, o, e.Boot.langConfig.againText, {
                    font: "46px " + e.Boot.fontName,
                    fill: "#FFFFFF"
                }), s = 1; t.width > 180;) t.fontSize = 46 - s, s += 1;
            a += '"againTitle":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}},", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50), t = new Phaser.Text(this.game, i, o, "" + e.Boot.gameConfig.achievementReward, {
                font: "24px " + e.Boot.fontName,
                fill: "#000000"
            }), window.devicePixelRatio > 1 && (t.resolution = e.Boot.dpiScaleFactor), a += '"achieveReward":{"frame":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":' + t.x + ',"y":' + t.y + ',"w":' + t.width + ',"h":' + t.height + '},"sourceSize":{"w":' + t.width + ',"h":' + t.height + "}}", this._textBitmapData.draw(this.game.make.sprite(0, 0, t.generateTexture()), t.x, t.y), (i += t.width + 1) >= 1700 && (i = 0, o += 50), a += "}}", this.game.cache.addTextureAtlas("menuTextAtlas", null, this._textBitmapData.canvas, JSON.parse(a), Phaser.Loader.TEXTURE_ATLAS_JSON_HASH), this.game.cache.getBaseTexture("menuTextAtlas").textureIndex = e.Boot.texturesArray.length + 1, e.Boot.texturesArray.length++
        }, Object.defineProperty(i.prototype, "isAllSoundsDecoded", {
            get: function() {
                for (var e = 0; e < this._soundsArray.length; e++)
                    if (!this.cache.isSoundDecoded(this._soundsArray[e])) return !1;
                return !0
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.loadSounds = function(t) {
            if (null != t && 0 != t.length)
                for (var i = 0; i < t.length; i++) this.game.load.audio(t[i], [e.Boot.PATH_SOUNDS + t[i] + ".ogg", e.Boot.PATH_SOUNDS + t[i] + ".mp3"], !0)
        }, i.prototype.loadFonts = function(t, i, o) {
            var s = this;
            void 0 === i && (i = "styles"), null != t && 0 != t.length && (this._loadedFont = !1, e.System.loadFonts(t, i + ".css", (function() {
                s._loadedFont = !0, o && o()
            })))
        }, i.prototype.loadAtlases = function(t, i) {
            if (void 0 === i && (i = "png"), null != t && 0 != t.length) {
                for (var o = "?v=12", s = 0; s < t.length; s++) {
                    var a = t[s].split("/").pop(),
                        n = e.Boot.PATH_IMAGES + t[s];
                    this.game.load.atlas(a, n + "." + i + o, n + ".json" + o, null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
                }
                this._loadedAssets = !1
            }
        }, i.prototype.loadSettings = function(t, i) {
            if (void 0 === i && (i = "json"), null != t && 0 != t.length)
                for (var o = 0; o < t.length; o++) {
                    var s = t[o].split("/").pop(),
                        a = e.Boot.PATH_SETTINGS + t[o];
                    this.game.load.text(s, a + "." + i + "?v=3")
                }
        }, i.prototype.loadImages = function(t, i) {
            if (void 0 === i && (i = "png"), null != t && 0 != t.length) {
                for (var o = 0; o < t.length; o++) {
                    var s = t[o].split("/").pop(),
                        a = e.Boot.PATH_IMAGES + t[o];
                    this.game.load.image(s, a + "." + i)
                }
                this._loadedAssets = !1
            }
        }, i.prototype.loadImagesFromSite = function(e, t, i) {
            if (null != e && 0 != e.length) {
                for (var o = 0; o < e.length; o++) {
                    var s = e[o].split("/").pop(),
                        a = i + e[o];
                    this.game.load.image(s, a + "." + t)
                }
                this._loadedAssets = !1
            }
        }, i
    }(Phaser.State);
    e.Preloader = t
}(TProject || (TProject = {})),
function(e) {
    var t = function() {
        function t() {}
        return t.loadFonts = function(t, i, o) {
            WebFont.load({
                custom: {
                    families: t,
                    urls: [e.Boot.PATH_FONTS + i]
                },
                active: function() {
                    window.setTimeout((function() {
                        null != o && o()
                    }), 100)
                }
            })
        }, t
    }();
    e.System = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i(e, i, o) {
            var s = t.call(this, e, i, o, "gameAssets", "continuePanel") || this;
            return s.anchor.set(.5, .5), s._cntdwn = 7, s.init(), s
        }
        return __extends(i, t), i.prototype.countDown = function() {
            this._cntdwn > 0 && (this._cntdwn--, this._countDownText.text = this._cntdwn + ""), 0 == this._cntdwn && (this._cntdwn = 7, this._countDownTimer.stop(!1), e.GameEvent.continueSignal.dispatch("deny"))
        }, i.prototype.init = function() {
            this._countDownTimer = this.game.time.create(!1), this._countDownTimer.loop(1e3, this.countDown, this), this._countDownText = this.game.make.text(0, -20, "" + this._cntdwn, {
                font: "96px " + e.Boot.fontName,
                fill: "#555555"
            }), this._countDownText.anchor.set(.5, .5), this._continueText = this.game.make.text(0, -this.height / 2 + 20, e.Boot.langConfig.continueText, {
                font: "43px " + e.Boot.fontName,
                fill: "#555555"
            }), this._continueText.anchor.set(.5, 0), this._noAdText = this.game.make.text(0, -20, e.Boot.langConfig.noAdAvailable, {
                font: "40px " + e.Boot.fontName,
                fill: "#555555"
            }), this._noAdText.anchor.set(.5, .5), this._noAdText.visible = !1, this.initPurchaseBtn(), this.addChild(this._continueText), this.addChild(this._countDownText), this.addChild(this._purchaseBtn), this.addChild(this._noAdText)
        }, i.prototype.initPurchaseBtn = function() {
            var t = e.Boot.gameConfig.adEnabled;
            this._purchaseBtn = this.game.make.sprite(0, this.height / 2 - 80, "gameAssets", "greenButtonGift"), this._purchaseBtn.anchor.set(.5, .5), this._purchaseBtn.inputEnabled = !0;
            for (var i = this.game.make.text(this._purchaseBtn.width / 6, 0, e.Boot.langConfig.watchText, {
                    font: "40px " + e.Boot.fontName,
                    fill: "#FFFFFF"
                }), o = 1; i.width > 180;) i.fontSize = 48 - o, o += 1;
            if (i.anchor.set(.5, .5), this._purchaseBtn.addChild(i), t) {
                this._purchaseBtn.events.onInputUp.add((function() {
                    this._countDownTimer.stop(!1), this.showAd()
                }), this);
                var s = this.game.make.sprite(-this._purchaseBtn.width / 2 + 10, 0, "gameAssets", "videoIconSmall");
                s.anchor.set(0, .5), this._purchaseBtn.addChild(s)
            } else {
                i.text = e.Boot.langConfig.purchaseText, this._purchaseBtn.events.onInputUp.add((function() {
                    this._countDownTimer.stop(!1), e.Boot.currentMoney -= e.Boot.gameConfig.adContinuePrice, e.Boot.totalContinuedGames++, e.GameEvent.continueSignal.dispatch("accept")
                }), this);
                var a = this.game.make.sprite(-this._purchaseBtn.width / 2 + 30, 0, "gameAssets", "coin");
                a.anchor.set(.5, .5), this._purchaseBtnCoinText = this.game.make.text(a.x + a.width / 2, 0, e.Boot.gameConfig.adContinuePrice + "", {
                    font: "25px " + e.Boot.fontName,
                    fill: "#FFFFFF"
                }), this._purchaseBtnCoinText.anchor.set(0, .5), this._purchaseBtn.addChild(a), this._purchaseBtn.addChild(this._purchaseBtnCoinText), this.checkIsEnoughMoney()
            }
        }, i.prototype.showAd = function() {
            sdkHandler.trigger("rewardedAd", {
                callback: function(t) {
                    t ? (e.Boot.totalContinuedGames++, e.GameEvent.continueSignal.dispatch("accept")) : (this._noAdText.visible = !0, this._countDownText.visible = !this._noAdText.visible, window.setTimeout((() => {
                        this._noAdText.visible = !1, this._countDownText.visible = !this._noAdText.visible, this._cntdwn = 0, this.countDown()
                    }), 400))
                }
            }, this), e.Boot.gameConfig.withoutAdSDKCallback && (this.game.paused = !1, this.game.sound.mute = !1, e.Boot.totalContinuedGames++, e.GameEvent.continueSignal.dispatch("accept"))
        }, i.prototype.checkIsEnoughMoney = function() {
            e.Boot.gameConfig.adEnabled || e.Boot.currentMoney >= e.Boot.gameConfig.adContinuePrice ? (this._purchaseBtn.inputEnabled = !0, this._purchaseBtn.frameName = "greenButtonGift", this._purchaseBtnCoinText && (this._purchaseBtnCoinText.fill = "#ffffff")) : (this._purchaseBtn.inputEnabled = !1, this._purchaseBtn.frameName = "greyButtonGift", this._purchaseBtnCoinText && (this._purchaseBtnCoinText.fill = "#f44336"))
        }, i.prototype.show = function(e) {
            this.visible = !0, this._cntdwn = 7, this._countDownText.text = this._cntdwn + "", this._countDownTimer.start()
        }, i
    }(Phaser.Sprite);
    e.ContinuePopUp = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i(e, o, s, a, n, h) {
            var r = t.call(this, e, o, s, "gameAssets", "fieldPiece") || this;
            return r._currColor = "1", n && n.addChild(r), r._id = a, r._blockGroup = h, r._empty = !0, r._filledBlock = r.game.make.sprite(25 + r.x, 25 + r.y, "gameAssets", i.CYAN), r._filledBlock.anchor.set(.5, .5), r._hintBlock = r.game.make.sprite(25 + r.x, 25 + r.y, "gameAssets", i.CYAN + "h"), r._hintBlock.anchor.set(.5, .5), r._hintBlock.alpha = .5, r._hinted = !1, r.events.onInputUp.add(r.changeState, r), r
        }
        return __extends(i, t), Object.defineProperty(i.prototype, "isFilled", {
            get: function() {
                return !this._empty
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "isHinted", {
            get: function() {
                return this._hinted
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "currColor", {
            get: function() {
                return this._currColor
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "id", {
            get: function() {
                return this._id
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.changeState = function() {
            this._empty ? this.appear(i.YELLOW) : this.disappear(), e.GameEvent.fieldChanged.dispatch()
        }, i.prototype.hint = function(e, t) {
            void 0 === t && (t = !0), this._blockGroup.add(this._hintBlock), this._hintBlock.frameName = e + "h", this.game.tweens.removeFrom(this._hintBlock.scale), t ? (this._hintBlock.scale.set(0, 0), this.game.add.tween(this._hintBlock.scale).to({
                x: 1,
                y: 1
            }, 400, Phaser.Easing.Cubic.Out, !0)) : this._hintBlock.scale.set(1, 1), this._hinted = !0
        }, i.prototype.unhint = function() {
            this._blockGroup.contains(this._hintBlock) && (this.game.tweens.removeFrom(this._hintBlock.scale), this.game.add.tween(this._hintBlock.scale).to({
                x: 0,
                y: 0
            }, 400, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce((function() {
                this._blockGroup.remove(this._hintBlock)
            }), this), this._hinted = !1)
        }, i.prototype.appear = function(e, t) {
            void 0 === t && (t = !1), this._blockGroup.add(this._filledBlock), this._filledBlock.frameName = e, this._currColor = e, this.game.tweens.removeFrom(this._filledBlock.scale), this._filledBlock.scale.set(1, 1), this.game.add.tween(this._filledBlock.scale).to({
                x: 1.2,
                y: 1.2
            }, 150, Phaser.Easing.Linear.None, !0, 0, 0, !0), this.game.add.tween(this._filledBlock.scale).to({
                x: 1.05,
                y: 1.05
            }, 100, Phaser.Easing.Linear.None, !0, 300, 0, !0), this._empty = !1, this._filledBlock.visible = !t
        }, i.prototype.disappear = function(e) {
            void 0 === e && (e = !1), e ? this._blockGroup.contains(this._filledBlock) && (this.game.tweens.removeFrom(this._filledBlock.scale), this._filledBlock.frameName = "grey", this.game.add.tween(this._filledBlock.scale).to({
                x: 1.2,
                y: 1.2
            }, 350, Phaser.Easing.Linear.None, !0, 200), this.game.add.tween(this._filledBlock.scale).to({
                x: 0,
                y: 0
            }, 450, Phaser.Easing.Cubic.Out, !0, 550).onComplete.addOnce((function() {
                this._blockGroup.remove(this._filledBlock)
            }), this), this._empty = !0) : this._blockGroup.contains(this._filledBlock) && (this.game.tweens.removeFrom(this._filledBlock.scale), this.game.add.tween(this._filledBlock.scale).to({
                x: 0,
                y: 0
            }, 400, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce((function() {
                this._blockGroup.remove(this._filledBlock)
            }), this), this._empty = !0)
        }, i.CYAN = "1", i.PINK = "2", i.RED = "3", i.ORANGE = "4", i.YELLOW = "5", i.ICE = "6", i.GREEN = "7", i.BLUE = "8", i.VIOLET = "9", i.PURPLE = "10", i.COLOR_LIST = [i.CYAN, i.PINK, i.RED, i.ORANGE, i.YELLOW, i.ICE, i.GREEN, i.BLUE, i.VIOLET, i.PURPLE], i
    }(Phaser.Sprite);
    e.FieldBlock = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i(e, i, o) {
            var s = t.call(this, e, i, o, "gameAssets", "emptySprite") || this;
            return s._fieldLength = 10, s._lineAnimated = !1, s.init(), s
        }
        return __extends(i, t), Object.defineProperty(i.prototype, "wasLineAnimated", {
            get: function() {
                return this._lineAnimated
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.fieldBlockPosition = function(e) {
            return this._blocks[e].worldPosition
        }, i.prototype.init = function() {
            var t, i, o, s;
            this._blocks = [], this._horizontalExplosions = [], this._verticalExplosions = [], this._line1Sound = this.game.make.sound("line_combo_1"), this._line2Sound = this.game.make.sound("line_combo_2"), this._line3Sound = this.game.make.sound("line_combo_3"), this._blockLayer = this.game.make.group(), this._effectLayer = this.game.make.sprite(e.Boot.gameConfig.blockOffset, -e.Boot.gameConfig.blockOffset, "gameAssets", "fieldLight"), this._effectLayer.anchor.set(.5, .5), this._effectLayer.alpha = 0, this._explosionLayer = this.game.make.group();
            for (var a = 1; a <= this._fieldLength; a++)
                for (var n = 1; n <= this._fieldLength; n++) i = -250 - 4.5 * e.Boot.gameConfig.blockOffset + 50 * (n - 1) + e.Boot.gameConfig.blockOffset * (n - 1), o = -250 - 4.5 * e.Boot.gameConfig.blockOffset + 50 * (a - 1) + e.Boot.gameConfig.blockOffset * (a - 1), t = new e.FieldBlock(this.game, i, o, (a - 1) * this._fieldLength + (n - 1), this, this._blockLayer), this._blocks.push(t);
            for (n = 0; n < this._fieldLength; n++) o = -250 - 4.5 * e.Boot.gameConfig.blockOffset + 50 * n + e.Boot.gameConfig.blockOffset * n + 25, s = new e.ExplosionLineAnimation(this.game, 0, o, !0), this._explosionLayer.add(s), this._horizontalExplosions.push(s);
            for (n = 0; n < this._fieldLength; n++) i = -250 - 4.5 * e.Boot.gameConfig.blockOffset + 50 * n + e.Boot.gameConfig.blockOffset * n + 25, s = new e.ExplosionLineAnimation(this.game, i, 0, !1), this._explosionLayer.add(s), this._verticalExplosions.push(s);
            this.addChild(this._effectLayer), this.addChild(this._blockLayer), this.addChild(this._explosionLayer), e.GameEvent.fieldChanged.add(this.checkIt, this)
        }, i.prototype.initiateTutorial = function() {
            for (var t = 0; t < this._fieldLength; t++)
                for (var i = 0; i < this._fieldLength; i++) t <= 8 ? (this._blocks[t * this._fieldLength + i].visible = !1, (t + i) % 2 == 1 && this._blocks[t * this._fieldLength + i].appear(e.FieldBlock.ORANGE, !0)) : 4 != i && 5 != i && this._blocks[t * this._fieldLength + i].appear(e.FieldBlock.ORANGE)
        }, i.prototype.showSecondTutorPart = function() {
            for (var t = 0; t < this._blocks.length; t++) this._blocks[t].disappear(), this._blocks[t].visible = !0;
            for (t = 0; t < this._fieldLength; t++)
                for (var i = 0; i < this._fieldLength; i++) t >= 3 ? (this._blocks[t * this._fieldLength + i].visible = !1, (t + i) % 2 == 1 && this._blocks[t * this._fieldLength + i].appear(e.FieldBlock.ICE, !0)) : 0 == i || i <= 2 && 0 == t || this._blocks[t * this._fieldLength + i].appear(e.FieldBlock.ICE)
        }, i.prototype.endTheTutorial = function() {
            for (var t = 0; t < this._blocks.length; t++) this._blocks[t].disappear(), this._blocks[t].visible = !0, t % 10 == 2 && (t < 40 || t > 60) && this._blocks[t].appear(e.FieldBlock.GREEN), t % 10 > 3 && t < 20 && this._blocks[t].appear(e.FieldBlock.YELLOW), t % 10 > 6 && t > 70 && this._blocks[t].appear(e.FieldBlock.RED)
        }, i.prototype.saveCurrentField = function() {
            e.Boot.saveFieldObject = [];
            for (var t = 0; t < this._blocks.length; t++) this._blocks[t].isFilled ? e.Boot.saveFieldObject.push(this._blocks[t].currColor) : e.Boot.saveFieldObject.push("")
        }, i.prototype.loadExistingField = function() {
            for (var t = 0; t < this._blocks.length; t++) "" != e.Boot.saveFieldObject[t] && this._blocks[t].appear(e.Boot.saveFieldObject[t])
        }, i.prototype.clearToContinue = function() {
            for (var e = 0; e < 4 * this._fieldLength; e++) this._blocks[e].disappear()
        }, Object.defineProperty(i.prototype, "firstBlock", {
            get: function() {
                return this._blocks[0]
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.fillTheShape = function(e, t) {
            for (var i = 0; i < t.blockHeight; i++)
                for (var o = 0; o < t.blockWidth; o++) t.blockMap[i][o] && this._blocks[e + o + i * this._fieldLength].appear(t.blockColor);
            this.checkIt()
        }, i.prototype.getOverlapTiles = function(e) {
            var t = new Phaser.Rectangle(e.topLeftSprite.getBounds().x, e.topLeftSprite.getBounds().y, e.topLeftSprite.getBounds().width, e.topLeftSprite.getBounds().height),
                i = -1;
            this._output = [];
            for (var o = 0; o < this._fieldLength; o++)
                for (var s = 0; s < this._fieldLength; s++) this.checkOverlap(this._blocks[o * this._fieldLength + s], t) && this._output.push(this._blocks[o * this._fieldLength + s]);
            for (o = 0; o < this._output.length; o++)
                if (this.checkFilling(e, this._output[o].id)) {
                    i = this._output[o].id;
                    break
                }
            if (-1 == i) {
                this._output = [];
                var a = 1e5,
                    n = 0;
                for (o = 0; o < this._fieldLength; o++)
                    for (s = 0; s < this._fieldLength; s++) this.checkOverlap(this._blocks[o * this._fieldLength + s], t, 2) && this._output.push(this._blocks[o * this._fieldLength + s]);
                for (o = 0; o < this._output.length; o++) this.checkFilling(e, this._output[o].id) && (n = Phaser.Math.distance(this._output[o].x, this._output[o].y, t.x, t.y)) < a && (a = n, i = this._output[o].id)
            }
            return i
        }, i.prototype.clearField = function() {
            for (var e = 0; e < this._blocks.length; e++) this._blocks[e].disappear(!0)
        }, i.prototype.checkIfStone = function(e) {
            return -2 == this.searchInField(0, e) ? (e.isItStone || e.stoneIt(), !0) : (e.isItStone && e.unstoneIt(), !1)
        }, i.prototype.showBlockShadow = function(e) {
            var t = this.getOverlapTiles(e);
            t >= 0 && this.hintThePlace(t, e, !1)
        }, i.prototype.checkIfOnePlace = function(e) {
            var t = this.searchInField(1, e);
            return t >= 0 && (this.hintThePlace(t, e), !0)
        }, i.prototype.unhintTheField = function() {
            for (var e = 0; e < this._fieldLength; e++)
                for (var t = 0; t < this._fieldLength; t++) this._blocks[e * this._fieldLength + t].isHinted && this._blocks[e * this._fieldLength + t].unhint()
        }, i.prototype.hintThePlace = function(e, t, i) {
            void 0 === i && (i = !0);
            for (var o = 0; o < t.blockHeight; o++)
                for (var s = 0; s < t.blockWidth; s++) t.blockMap[o][s] && this._blocks[e + s + o * this._fieldLength].hint(t.blockColor, i)
        }, i.prototype.searchInField = function(e, t) {
            for (var i = 0, o = -2, s = 0; s < this._fieldLength; s++)
                for (var a = 0; a < this._fieldLength; a++)
                    if (this.checkFilling(t, s * this._fieldLength + a) && (i++, o = s * this._fieldLength + a, i > e)) return -1;
            return o
        }, i.prototype.checkFilling = function(e, t) {
            if (e.blockWidth + t % this._fieldLength > this._fieldLength) return !1;
            if (t + (e.blockHeight - 1) * this._fieldLength >= this._fieldLength * this._fieldLength) return !1;
            for (var i = 0; i < e.blockHeight; i++)
                for (var o = 0; o < e.blockWidth; o++)
                    if (e.blockMap[i][o] && this._blocks[t + o + i * this._fieldLength].isFilled) return !1;
            return !0
        }, i.prototype.checkOverlap = function(e, t, i) {
            void 0 === i && (i = 5);
            var o = e.getBounds(),
                s = new Phaser.Rectangle(o.x + o.width * (i - 1) / (2 * i), o.y + o.height * (i - 1) / (2 * i), o.width / i, o.height / i);
            return Phaser.Rectangle.intersects(s, t)
        }, i.prototype.checkIt = function() {
            this._lineAnimated = !1, this._lineToDel = [], this._rowToDel = [];
            for (var t = 1; t <= this._fieldLength; t++) this.checkLine(t) && this._lineToDel.push(t), this.checkRow(t) && this._rowToDel.push(t);
            if (this._lineToDel.length > 0)
                for (var i = 0; i < this._lineToDel.length; i++) this.clearLine(this._lineToDel[i]), this._horizontalExplosions[this._lineToDel[i] - 1].showExplosion();
            if (this._rowToDel.length > 0)
                for (var o = 0; o < this._rowToDel.length; o++) this.clearRow(this._rowToDel[o]), this._verticalExplosions[this._rowToDel[o] - 1].showExplosion();
            0 == this._lineToDel.length && 0 == this._rowToDel.length || (this._lineAnimated = !0, this.game.tweens.removeFrom(this._effectLayer), this._effectLayer.alpha = 0, this.game.add.tween(this._effectLayer).to({
                alpha: 1
            }, 300, Phaser.Easing.Linear.None, !0, 150, 0, !0), e.GameEvent.linesCleared.dispatch(this._rowToDel.length + this._lineToDel.length), e.Boot.totalLinesRemoved += this._rowToDel.length + this._lineToDel.length, e.Boot.removedLinesAtOnce = Math.max(e.Boot.removedLinesAtOnce, this._rowToDel.length + this._lineToDel.length), e.Boot.sfxEnable && (this._rowToDel.length + this._lineToDel.length == 1 ? this._line1Sound.play() : this._rowToDel.length + this._lineToDel.length == 2 ? this._line2Sound.play() : this._line3Sound.play())), e.GameEvent.moveDone.dispatch()
        }, i.prototype.indicateColor = function(t) {
            switch (t) {
                case e.FieldBlock.CYAN:
                    e.Boot.cyanBlocksDestroyed++;
                    break;
                case e.FieldBlock.PINK:
                    e.Boot.pinkBlocksDestroyed++;
                    break;
                case e.FieldBlock.RED:
                    e.Boot.redBlocksDestroyed++;
                    break;
                case e.FieldBlock.ORANGE:
                    e.Boot.orangeBlocksDestroyed++;
                    break;
                case e.FieldBlock.YELLOW:
                    e.Boot.yellowBlocksDestroyed++;
                    break;
                case e.FieldBlock.ICE:
                    e.Boot.iceBlocksDestroyed++;
                    break;
                case e.FieldBlock.GREEN:
                    e.Boot.greenBlocksDestroyed++;
                    break;
                case e.FieldBlock.BLUE:
                    e.Boot.blueBlocksDestroyed++;
                    break;
                case e.FieldBlock.VIOLET:
                    e.Boot.violetBlocksDestroyed++;
                    break;
                case e.FieldBlock.PURPLE:
                    e.Boot.purpleBlocksDestroyed++
            }
        }, i.prototype.clearLine = function(e) {
            for (var t = e * this._fieldLength - this._fieldLength; t < e * this._fieldLength; t++) this._blocks[t].isFilled && this.indicateColor(this._blocks[t].currColor), this._blocks[t].disappear()
        }, i.prototype.clearRow = function(e) {
            for (var t = e - 1; t < e + this._fieldLength * (this._fieldLength - 1); t += this._fieldLength) this._blocks[t].isFilled && this.indicateColor(this._blocks[t].currColor), this._blocks[t].disappear()
        }, i.prototype.checkLine = function(e) {
            for (var t = e * this._fieldLength - this._fieldLength; t < e * this._fieldLength; t++)
                if (!this._blocks[t].isFilled) return !1;
            return !0
        }, i.prototype.checkRow = function(e) {
            for (var t = e - 1; t < e + this._fieldLength * (this._fieldLength - 1); t += this._fieldLength)
                if (!this._blocks[t].isFilled) return !1;
            return !0
        }, i
    }(Phaser.Sprite);
    e.GameField = t
}(TProject || (TProject = {}));
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i(e, i, o) {
            var s = t.call(this, e, i, o, "gameAssets", "gameOver") || this;
            return s._fixAchieveMove = !1, s._currentAchieve = 0, s._lastDuration = 0, s._lastScore = 0, s._currentScore = 0, s._moneyVal = 0, s.anchor.set(.5, .5), s.init(), s
        }
        return __extends(i, t), i.prototype.init = function() {
            this.game.renderer.type != Phaser.CANVAS ? (this._title = this.game.make.sprite(0, 2 * -this.height / 5, "menuTextAtlas", "gameOverTitle"), this._againText = this.game.make.sprite(50, 0, "menuTextAtlas", "againTitle")) : (this._title = this.game.make.text(0, 2 * -this.height / 5, e.Boot.langConfig.gameOverText, {
                font: "48px " + e.Boot.fontName,
                fill: "#242424"
            }), this._againText = this.game.make.text(50, 0, e.Boot.langConfig.againText, {
                font: "46px " + e.Boot.fontName,
                fill: "#FFFFFF"
            })), this._title.anchor.set(.5, .5), this._finalScore = this.game.make.text(0, -180, "424", {
                font: "62px " + e.Boot.fontName,
                fill: "#434343"
            }), this._finalScore.anchor.set(.5, .5), this._moneyIcon = this.game.make.sprite(-35, -100, "gameAssets", "coin"), this._moneyIcon.anchor.set(.5, .5), this._moneyText = this.game.make.text(this._moneyIcon.x + this._moneyIcon.width / 2 + 10, this._moneyIcon.y, this._moneyVal + "", {
                font: "32px " + e.Boot.fontName,
                fill: "#555555"
            }), this._moneyText.anchor.set(0, .5), this._completedAchievesText = this.game.make.text(0, this.height / 2 - 25, "", {
                font: "30px " + e.Boot.fontName,
                fill: "#4e342e"
            }), this._completedAchievesText.anchor.set(.5, .5), this._againButton = this.game.make.sprite(0, 10, "gameAssets", "againButton"), this._againButton.anchor.set(.5, .5), this._againButton.inputEnabled = !0, this._againButton.events.onInputUp.add(this.onAgainHandler, this), this._againButton.visible = !1;
            this._againButton.visible = !0, this._againText.anchor.set(.5, .5), this._againButton.addChild(this._againText), this._achieveLine = this.game.make.sprite(0, this._againButton.y + this._againButton.height / 2 + 10, "gameAssets", "lineGameOver"), this._achieveLine.anchor.set(.5, 0), this._achieveGroup = e.Boot.achieveManager.achieveGroup, this._achieveGroup.position.set(-this.width / 2, this._achieveLine.y + this._achieveLine.height), this._achieveMask = this.game.make.graphics(this._achieveGroup.x, this._achieveGroup.y), this._achieveMask.beginFill(16777215), this._achieveMask.drawRect(0, 0, this.width, 200), this._achieveMask.inputEnabled = !0, this._achieveMask.events.onInputUp.add(this.moveAchieves, this), this._achieveMask.events.onInputDown.add(this.registerAchieveMove, this), this._achieveGroup.mask = this._achieveMask;
            var t = this.game.make.sprite(0, 0, "gameAssets", "achieveBack");
            t.alpha = 0, this._achieveGroup.add(t), (t = this.game.make.sprite(0, 100, "gameAssets", "achieveBack")).alpha = .1, this._achieveGroup.add(t), this.addChild(this._moneyIcon), this.addChild(this._againButton), this.addChild(this._title), this.addChild(this._finalScore), this.addChild(this._achieveLine), this.addChild(this._achieveGroup), this.addChild(this._achieveMask), this.addChild(this._moneyText), this.addChild(this._completedAchievesText), this._fixAchieveMove = !1, this.updateAchieveGroupPos(), e.GameEvent.onScoreChange.add(this.scoreChanged, this)
        }, i.prototype.createPseudoParticleMoney = function(e, t) {
            var i = this,
                o = this.game.make.sprite(e, t, "gameAssets", "coin"),
                s = this.game.make.sprite(e, t, "gameAssets", "coin"),
                a = this.game.make.sprite(e, t, "gameAssets", "coin");
            o.anchor.set(.5, .5), s.anchor.set(.5, .5), a.anchor.set(.5, .5), this.addChild(o), this.addChild(s), this.addChild(a), this.game.add.tween(o).to({
                y: this._moneyIcon.y
            }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0), this.game.add.tween(o).to({
                x: this._moneyIcon.x + 50
            }, 400, Phaser.Easing.Exponential.Out, !0).onComplete.addOnce((function() {
                i.game.add.tween(o).to({
                    x: i._moneyIcon.x
                }, 600, Phaser.Easing.Linear.None, !0).onComplete.addOnce((function() {
                    o.destroy()
                }))
            })), this.game.add.tween(s).to({
                y: this._moneyIcon.y
            }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0, 250), this.game.add.tween(s).to({
                x: this._moneyIcon.x + 50
            }, 400, Phaser.Easing.Exponential.Out, !0, 250).onComplete.addOnce((function() {
                i.game.add.tween(s).to({
                    x: i._moneyIcon.x
                }, 600, Phaser.Easing.Linear.None, !0).onComplete.addOnce((function() {
                    s.destroy()
                }))
            })), this.game.add.tween(a).to({
                y: this._moneyIcon.y
            }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0, 500), this.game.add.tween(a).to({
                x: this._moneyIcon.x + 50
            }, 400, Phaser.Easing.Exponential.Out, !0, 500).onComplete.addOnce((function() {
                i.game.add.tween(a).to({
                    x: i._moneyIcon.x
                }, 600, Phaser.Easing.Linear.None, !0).onComplete.addOnce((function() {
                    a.destroy()
                }))
            }))
        }, i.prototype.scoreChanged = function() {
            this._currentScore = arguments[0]
        }, i.prototype.updateAchieveGroupPos = function(e) {
            void 0 === e && (e = !1), this.game.tweens.removeFrom(this._achieveGroup), e ? this.game.add.tween(this._achieveGroup).to({
                y: this._achieveLine.y + this._achieveLine.height - 100 * this._currentAchieve
            }, 250, Phaser.Easing.Cubic.Out, !0) : this._achieveGroup.y = this._achieveLine.y + this._achieveLine.height - 100 * this._currentAchieve
        }, i.prototype.goToTheNewAchieves = function() {
            var t = this;
            if (0 == this._currentAchieve) this._achieveMask.events.onInputUp.add(this.moveAchieves, this), this._achieveMask.events.onInputDown.add(this.registerAchieveMove, this);
            else {
                this.game.tweens.removeFrom(this._achieveGroup);
                var i = this._currentAchieve;
                this._currentAchieve = 0, this.game.add.tween(this._achieveGroup).to({
                    y: this._achieveLine.y + this._achieveLine.height - 100 * this._currentAchieve
                }, 300 * i, Phaser.Easing.Cubic.Out, !0, 1e3).onComplete.addOnce((function() {
                    t._achieveMask.events.onInputUp.add(t.moveAchieves, t), t._achieveMask.events.onInputDown.add(t.registerAchieveMove, t), t.createPseudoParticleMoney(-98, 138), i > 1 && t.createPseudoParticleMoney(-98, 238);
                    var o = t.game.add.tween(t).to({
                        _moneyVal: e.Boot.currentMoney
                    }, 600, Phaser.Easing.Linear.None, !0, 1e3);
                    o.onUpdateCallback((function() {
                        this._moneyText.text = Math.floor(this._moneyVal) + ""
                    }), t), o.onComplete.addOnce((function() {
                        this._moneyVal = e.Boot.currentMoney, this._moneyText.text = this._moneyVal + "", o = null
                    }), t)
                }), this)
            }
        }, i.prototype.registerAchieveMove = function() {
            this._fixAchieveMove = !0, this._fixPointerPositiony = this.game.input.activePointer.position.y
        }, i.prototype.moveAchieves = function() {
            var t = this.game.input.activePointer.position.y - this._fixPointerPositiony,
                i = Math.ceil(t / (this.game.height / 10));
            this._lastDuration <= 300 ? this._currentAchieve -= i : this._currentAchieve -= Math.ceil(t / (100 * this.scale.y)), this._currentAchieve = Math.min(this._currentAchieve, e.Boot.achieveManager.achievesCount - 2), this._currentAchieve = Math.max(this._currentAchieve, 0), this.game.add.tween(this._achieveGroup).to({
                y: this._achieveLine.y + this._achieveLine.height - 100 * this._currentAchieve
            }, 250, Phaser.Easing.Cubic.Out, !0), this._fixAchieveMove = !1
        }, i.prototype.showNewAchieves = function() {
            this._currentAchieve = e.Boot.achieveManager.newAchievesCount, this.updateAchieveGroupPos(), this._achieveMask.events.onInputUp.remove(this.moveAchieves, this), this._achieveMask.events.onInputDown.remove(this.registerAchieveMove, this), this.goToTheNewAchieves(), e.GameEvent.newAchieveRequest.dispatch()
        }, i.prototype.show = function(t) {
            e.Boot.achieveManager.updateAchievesVisibleArea(this._achieveLine.y + this._achieveLine.height), this.visible = !0, this._finalScore.text = this._lastScore + "";
            var i = this._currentScore;
            sdkHandler.trigger("gameOver", {
                score: i
            }, this), this._moneyVal = e.Boot.currentMoney, e.Boot.achieveManager.newAchievesCount > 0 && (this._moneyVal -= 30, e.Boot.achieveManager.newAchievesCount > 1 && (this._moneyVal -= 30)), this._moneyText.text = this._moneyVal + "", this._completedAchievesText.text = e.Boot.changedString([e.Boot.achieveManager.openedCount, e.Boot.achieveManager.achievesCount], e.Boot.langConfig.completedText);
            var o = this.game.add.tween(this).to({
                _lastScore: this._currentScore
            }, 350, Phaser.Easing.Linear.None, !0, t);
            o.onUpdateCallback((function() {
                this._finalScore.text = Math.floor(this._lastScore) + ""
            }), this), o.onComplete.addOnce((function() {
                this._lastScore = this._currentScore, this._finalScore.text = this._lastScore + "", o = null
            }), this)
        }, i.prototype.update = function() {
            if (this._fixAchieveMove) {
                var t = this.game.input.activePointer.position.y - this._fixPointerPositiony;
                this._lastDuration = this.game.input.activePointer.duration, this._achieveGroup.y = this._achieveLine.y + this._achieveLine.height - 100 * this._currentAchieve + t
            }
            this.visible && e.Boot.achieveManager.updateAchievesVisibleArea(this._achieveLine.y + this._achieveLine.height)
        }, i.prototype.onAgainHandler = function() {
            e.Boot.achieveManager.clearNewAchieves(), e.GameEvent.restartNeeded.dispatch()
        }, i
    }(Phaser.Sprite);
    e.OverPopUp = t
}(TProject || (TProject = {}));
var TProject;
__extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(e, t) {
        e.__proto__ = t
    } || function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function o() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o)
    }
}();
! function(e) {
    var t = function(t) {
        function i(e, i, o, s, a, n, h) {
            void 0 === n && (n = null), void 0 === h && (h = null);
            var r = t.call(this, e, i, o) || this;
            return null != n && (r._buttonSpriteOff = r.game.make.sprite(0, 0, "gameAssets", n), r._buttonSpriteOff.anchor.set(.5, .5), r._buttonSpriteOff.visible = !1, r.addChild(r._buttonSpriteOff)), r._buttonSprite = r.game.make.sprite(0, 0, "gameAssets", s), r._buttonSprite.anchor.set(.5, .5), r.addChild(r._buttonSprite), r._buttonWidth = r._buttonSprite.width, r._buttonHeight = r._buttonSprite.height, r._callBack = a, r.inputEnabled = !0, r.events.onInputUp.add(r.onClickHandler, r), null != h && (h || (r._buttonSpriteOff.visible = !0, r._buttonSprite.visible = !1)), r
        }
        return __extends(i, t), i.prototype.onClickHandler = function(t, i, o) {
            o && (e.Boot.sfxEnable, this._buttonSpriteOff && (this._buttonSpriteOff.visible = !this._buttonSpriteOff.visible, this._buttonSprite.visible = !this._buttonSpriteOff.visible), null != this._callBack && this._callBack())
        }, Object.defineProperty(i.prototype, "buttonWidth", {
            get: function() {
                return this._buttonWidth * this.scale.x
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "buttonHeight", {
            get: function() {
                return this._buttonHeight * this.scale.y
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.showBtn = function(e) {
            void 0 === e && (e = !1), this.visible = !0, this.inputEnabled = !0, this.ignoreChildInput = !1, this.game.tweens.removeFrom(this._buttonSprite), e ? (this._buttonSprite.scale.setTo(1, 1), this._buttonSpriteOff && this._buttonSpriteOff.scale.setTo(1, 1)) : (this._buttonSprite.scale.setTo(0, 0), this.game.add.tween(this._buttonSprite.scale).to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Exponential.Out, !0), this._buttonSpriteOff && (this._buttonSpriteOff.scale.setTo(0, 0), this.game.add.tween(this._buttonSpriteOff.scale).to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Exponential.Out, !0)))
        }, i.prototype.hideBtn = function(e) {
            void 0 === e && (e = !1), this.game.tweens.removeFrom(this._buttonSprite), this.inputEnabled = !1, this.ignoreChildInput = !0, e ? this.visible = !1 : (this.game.add.tween(this._buttonSprite.scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Exponential.In, !0).onComplete.addOnce((function() {
                this.visible = !1
            }), this), this._buttonSpriteOff && this.game.add.tween(this._buttonSpriteOff.scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Exponential.In, !0))
        }, i.prototype.destroy = function() {
            this.game.tweens.removeFrom(this._buttonSprite), this._buttonSpriteOff && this.game.tweens.removeFrom(this._buttonSpriteOff), this.events.onInputUp.remove(this.onClickHandler, this), this._callBack = null, this._buttonWidth = null, this._buttonHeight = null, t.prototype.destroy.call(this)
        }, i
    }(Phaser.Sprite);
    e.UIButton = t
}(TProject || (TProject = {}));
const dataMigrator = {
        migrateLocalDataToPlatform: function() {
            if (null !== localStorage.getItem("gameData") && void 0 !== localStorage.getItem("gameData") && localStorage.getItem("gameData").length > 0) {
                let e = localStorage.getItem("gameData");
                sdkHandler.trigger("save", {
                    key: "2020-plus",
                    value: e,
                    callback: function(e) {}
                })
            }
        }
    },
    mySaver = function() {
        const e = {
            loadData: function() {
                return new Promise((function(t, i) {
                    sdkHandler.trigger("restore", {
                        key: "2020-plus",
                        callback: function(o, s) {
                            o ? i(o) : (e.data = JSON.parse(s), null == e.data && (e.data = {}), t())
                        }
                    })
                }))
            },
            save: function(t, i) {
                return e.data[t] = i, new Promise((function(t, i) {
                    sdkHandler.trigger("save", {
                        key: "2020-plus",
                        value: JSON.stringify(e.data),
                        callback: function(e) {
                            e ? i(e) : t()
                        }
                    })
                }))
            },
            get: function(t) {
                return e.data[t]
            },
            data: {}
        };
        return e
    }();