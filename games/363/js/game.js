! function() {
    var G = {};
    window.G = G, window.gameG = G, G.BuildEnvironment = {
        production: !0
    }, "undefined" == typeof G && (G = {}), G.ExtLoader = function() {
        Phaser.Loader.call(this, game), game.state.onStateChange.add(this.reset, this), this.imagesToRemoveOnStateChange = [], this.loadedUrls = {}
    }, G.ExtLoader.prototype = Object.create(Phaser.Loader.prototype), G.ExtLoader.prototype.reset = function(hard, clearEvents) {
        this.imagesToRemoveOnStateChange.forEach(function(key) {
            this.cache.removeImage(key)
        }, this), this.imagesToRemoveOnStateChange = [], Phaser.Loader.prototype.reset.call(this, hard, clearEvents)
    }, G.ExtLoader.prototype.addToFileList = function(type, key, url, properties, overwrite, extension) {
        if (void 0 === overwrite && (overwrite = !1), void 0 === key || "" === key) return console.warn("Phaser.Loader: Invalid or no key given of type " + type), this;
        if (void 0 === url || null === url) {
            if (!extension) return console.warn("Phaser.Loader: No URL given for file type: " + type + " key: " + key), this;
            url = key + extension
        }
        var file = {
            type: type,
            key: key,
            path: this.path,
            url: url,
            syncPoint: this._withSyncPointDepth > 0,
            data: null,
            loading: !1,
            loaded: !1,
            error: !1
        };
        if (properties)
            for (var prop in properties) file[prop] = properties[prop];
        var fileIndex = this.getAssetIndex(type, key);
        if (overwrite && fileIndex > -1) {
            var currentFile = this._fileList[fileIndex];
            currentFile.loading || currentFile.loaded ? (this._fileList.push(file), this._totalFileCount++) : this._fileList[fileIndex] = file
        } else -1 === fileIndex && (this._fileList.push(file), this._totalFileCount++);
        return this.loadFile(this._fileList.shift()), this
    }, G.ExtLoader.prototype.asyncComplete = function(file, errorMessage) {
        void 0 === errorMessage && (errorMessage = ""), file.loaded = !0, file.error = !!errorMessage, errorMessage && (file.errorMessage = errorMessage, console.warn("Phaser.Loader - " + file.type + "[" + file.key + "]: " + errorMessage))
    }, G.ExtLoader.prototype.fileComplete = function(file, xhr) {
        var loadNext = !0;
        switch (file.type) {
            case "packfile":
                var data = JSON.parse(xhr.responseText);
                file.data = data || {};
                break;
            case "image":
                this.cache.addImage(file.key, file.url, file.data);
                break;
            case "spritesheet":
                this.cache.addSpriteSheet(file.key, file.url, file.data, file.frameWidth, file.frameHeight, file.frameMax, file.margin, file.spacing);
                break;
            case "textureatlas":
                if (null == file.atlasURL) this.cache.addTextureAtlas(file.key, file.url, file.data, file.atlasData, file.format);
                else if (loadNext = !1, file.format == Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY || file.format == Phaser.Loader.TEXTURE_ATLAS_JSON_HASH || file.format == Phaser.Loader.TEXTURE_ATLAS_JSON_PYXEL) this.xhrLoad(file, this.transformUrl(file.atlasURL, file), "text", this.jsonLoadComplete);
                else {
                    if (file.format != Phaser.Loader.TEXTURE_ATLAS_XML_STARLING) throw new Error("Phaser.Loader. Invalid Texture Atlas format: " + file.format);
                    this.xhrLoad(file, this.transformUrl(file.atlasURL, file), "text", this.xmlLoadComplete)
                }
                break;
            case "bitmapfont":
                file.atlasURL ? (loadNext = !1, this.xhrLoad(file, this.transformUrl(file.atlasURL, file), "text", function(file, xhr) {
                    var json;
                    try {
                        json = JSON.parse(xhr.responseText)
                    } catch (e) {}
                    json ? (file.atlasType = "json", this.jsonLoadComplete(file, xhr)) : (file.atlasType = "xml", this.xmlLoadComplete(file, xhr))
                })) : this.cache.addBitmapFont(file.key, file.url, file.data, file.atlasData, file.atlasType, file.xSpacing, file.ySpacing);
                break;
            case "video":
                if (file.asBlob) try {
                    file.data = xhr.response
                } catch (e) {
                    throw new Error("Phaser.Loader. Unable to parse video file as Blob: " + file.key)
                }
                this.cache.addVideo(file.key, file.url, file.data, file.asBlob);
                break;
            case "audio":
                this.game.sound.usingWebAudio ? (file.data = xhr.response, this.cache.addSound(file.key, file.url, file.data, !0, !1), file.autoDecode && this.game.sound.decode(file.key)) : this.cache.addSound(file.key, file.url, file.data, !1, !0);
                break;
            case "text":
                file.data = xhr.responseText, this.cache.addText(file.key, file.url, file.data);
                break;
            case "shader":
                file.data = xhr.responseText, this.cache.addShader(file.key, file.url, file.data);
                break;
            case "physics":
                var data = JSON.parse(xhr.responseText);
                this.cache.addPhysicsData(file.key, file.url, data, file.format);
                break;
            case "script":
                file.data = document.createElement("script"), file.data.language = "javascript", file.data.type = "text/javascript", file.data.defer = !1, file.data.text = xhr.responseText, document.head.appendChild(file.data), file.callback && (file.data = file.callback.call(file.callbackContext, file.key, xhr.responseText));
                break;
            case "binary":
                file.callback ? file.data = file.callback.call(file.callbackContext, file.key, xhr.response) : file.data = xhr.response, this.cache.addBinary(file.key, file.data)
        }
        this.onFileComplete.dispatch(0, file.key, !file.error)
    };
    var saveAs = saveAs || function(e) {
        "use strict";
        if (!("undefined" == typeof e || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
            var t = e.document,
                n = function() {
                    return e.URL || e.webkitURL || e
                },
                r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                o = "download" in r,
                a = function(e) {
                    var t = new MouseEvent("click");
                    e.dispatchEvent(t)
                },
                i = /constructor/i.test(e.HTMLElement) || e.safari,
                f = /CriOS\/[\d]+/.test(navigator.userAgent),
                u = function(t) {
                    (e.setImmediate || e.setTimeout)(function() {
                        throw t
                    }, 0)
                },
                s = "application/octet-stream",
                d = 4e4,
                c = function(e) {
                    var t = function() {
                        "string" == typeof e ? n().revokeObjectURL(e) : e.remove()
                    };
                    setTimeout(t, d)
                },
                l = function(e, t, n) {
                    t = [].concat(t);
                    for (var r = t.length; r--;) {
                        var o = e["on" + t[r]];
                        if ("function" == typeof o) try {
                            o.call(e, n || e)
                        } catch (a) {
                            u(a)
                        }
                    }
                },
                p = function(e) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], {
                        type: e.type
                    }) : e
                },
                v = function(t, u, d) {
                    d || (t = p(t));
                    var y, v = this,
                        w = t.type,
                        m = w === s,
                        h = function() {
                            l(v, "writestart progress write writeend".split(" "))
                        },
                        S = function() {
                            if ((f || m && i) && e.FileReader) {
                                var r = new FileReader;
                                return r.onloadend = function() {
                                    var t = f ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;"),
                                        n = e.open(t, "_blank");
                                    n || (e.location.href = t), t = void 0, v.readyState = v.DONE, h()
                                }, r.readAsDataURL(t), void(v.readyState = v.INIT)
                            }
                            if (y || (y = n().createObjectURL(t)), m) e.location.href = y;
                            else {
                                var o = e.open(y, "_blank");
                                o || (e.location.href = y)
                            }
                            v.readyState = v.DONE, h(), c(y)
                        };
                    return v.readyState = v.INIT, o ? (y = n().createObjectURL(t), void setTimeout(function() {
                        r.href = y, r.download = u, a(r), h(), c(y), v.readyState = v.DONE
                    })) : void S()
                },
                w = v.prototype,
                m = function(e, t, n) {
                    return new v(e, t || e.name || "download", n)
                };
            return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function(e, t, n) {
                return t = t || e.name || "download", n || (e = p(e)), navigator.msSaveOrOpenBlob(e, t)
            } : (w.abort = function() {}, w.readyState = w.INIT = 0, w.WRITING = 1, w.DONE = 2, w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null, m)
        }
    }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
    "undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null !== define.amd && define("FileSaver.js", function() {
        return saveAs
    }), "undefined" == typeof G && (G = {}), G.Button = function(x, y, sprite, callback, context) {
        Phaser.Button.call(this, game, G.l(x), G.l(y), null), this.state = game.state.getCurrentState(), G.changeTexture(this, sprite), this.anchor.setTo(.5), this.sfx = G.sfx.pop, this.active = !0, this.onClick = new Phaser.Signal, callback && this.onClick.add(callback, context || this), this.onInputDown.add(this.click, this), this.terms = [], this.IMMEDIATE = !1, this.scaleOnClick = !0, this.targetAlphaTermsNotFulfilled = .5, this.targetAlpha = 1, this.refractorPeriod = 400, this.scaleChange = .1, this.pulsing = !1
    }, G.Button.prototype = Object.create(Phaser.Button.prototype), G.Button.constructor = G.Button, G.Button.prototype.update = function() {
        this.checkTerms() ? this.targetAlpha = 1 : this.targetAlpha = this.targetAlphaTermsNotFulfilled, this.alpha = G.lerp(this.alpha, this.targetAlpha, .2, .05), this.updateChildren()
    }, G.Button.prototype.pulse = function(maxScale) {
        this.pulsing = !0, this.pulsingTween = game.add.tween(this.scale).to({
            x: maxScale || 1.1,
            y: maxScale || 1.1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.Button.prototype.stopPulse = function(maxScale) {
        this.pulsingTween && this.pulsingTween.stop(), this.scale.setTo(maxScale || 1), this.pulsing = !1
    }, G.Button.prototype.click = function() {
        if (this.active && this.checkTerms()) {
            this.active = !1, this.onClick.dispatch(), this.sfx && this.sfx.play();
            var orgScaleX = this.scale.x,
                orgScaleY = this.scale.y;
            this.IMMEDIATE ? this.active = !0 : this.pulsing || !this.scaleOnClick ? game.time.events.add(this.refractorPeriod, function() {
                this.active = !0
            }, this) : game.add.tween(this.scale).to({
                x: orgScaleX + this.scaleChange,
                y: orgScaleY + this.scaleChange
            }, Math.floor(.5 * this.refractorPeriod), Phaser.Easing.Quadratic.Out, !0).onComplete.add(function() {
                game.add.tween(this.scale).to({
                    x: orgScaleX,
                    y: orgScaleY
                }, Math.floor(.5 * this.refractorPeriod), Phaser.Easing.Quadratic.Out, !0).onComplete.add(function() {
                    this.active = !0
                }, this)
            }, this)
        }
    }, G.Button.prototype.checkTerms = function() {
        for (var i = 0; i < this.terms.length; i++)
            if (!this.terms[i][0].call(this.terms[i][1])) return !1;
        return !0
    }, G.Button.prototype.addTerm = function(callback, context) {
        this.terms.push([callback, context])
    }, G.Button.prototype.addImageLabel = function(image) {
        this.label = game.make.image(0, 0, "ssheet", image), this.label.anchor.setTo(.5), this.addChild(this.label)
    }, G.Button.prototype.addTextLabel = function(font, text, size) {
        var multi = 1 / G.Loader.currentConfigMulti;
        this.label = new G.OneLineText(-7, -6, font, text, size || Math.floor(this.height * multi * .7), this.width * multi * .9, .5, .5), this.addChild(this.label)
    }, G.Button.prototype.addTextLabelMultiline = function(font, text) {
        var multi = 1 / G.Loader.currentConfigMulti;
        this.label = new G.MultiLineText(0, 0, font, text, Math.floor(this.height * multi * .5), this.width * multi * .8, this.height * multi * .7, "center", .5, .5), this.addChild(this.label)
    }, G.Button.prototype.addGTextLabel = function(text, style) {
        this.label = new G.Text(0, 0, text, style, .5, .9 * this.width, .9 * this.height, !0, "center"), this.addChild(this.label)
    }, G.Button.prototype.stopTweens = function() {
        G.stopTweens(this)
    }, G.Button.prototype.changeTexture = function(image) {
        G.changeTexture(this, image)
    }, G.Button.prototype.add = function(obj) {
        return this.addChild(obj)
    }, G.Button.prototype.updateChildren = function() {
        for (var i = this.children.length; i--;) this.children[i].update()
    }, "undefined" == typeof G && (G = {}), G.FrameAnimation = function(x, y, frameName, frameRate, autoPlay) {
        Phaser.Image.call(this, game, G.l(x), G.l(y)), this.anchor.setTo(.5), this.frameNamePrefix = frameName, this.animFramesLen = this.getAnimationLength(this.frameNamePrefix), this.timerEvery = frameRate ? 60 / frameRate : 1, this.animDir = 1, G.changeTexture(this, this.frameNamePrefix + "_0"), this.currentTimer = 0, this.currentIndex = 0, this.onFinish = new Phaser.Signal, this.active = autoPlay || !1
    }, G.FrameAnimation.prototype = Object.create(Phaser.Image.prototype), G.FrameAnimation.prototype.play = function(loop, bounce, startFrame) {
        return this.currentTimer = 0, this.currentIndex = startFrame || 0, this.active = !0, this.loop = loop - 1 || 0, this.animDir = 1, this.bounce = bounce || !1, G.changeTexture(this, this.frameNamePrefix + "_" + this.currentIndex), this
    }, G.FrameAnimation.prototype.update = function() {
        if (this.active && (this.currentTimer += G.deltaTime, this.currentTimer >= this.timerEvery)) {
            if (this.currentTimer = this.currentTimer - this.timerEvery, this.currentIndex += this.animDir, this.bounce) {
                if (this.currentIndex == this.animFramesLen || 0 == this.currentIndex) {
                    if (0 == this.loop && 0 == this.currentIndex) return this.onFinish.dispatch(), this.active = !1;
                    this.loop > 0 && 0 == this.currentIndex && this.loop--, this.currentIndex == this.animFramesLen && (this.currentIndex = this.animFramesLen - 1), this.animDir *= -1
                }
            } else if (this.currentIndex == this.animFramesLen) {
                if (0 == this.loop) return this.onFinish.dispatch(), this.active = !1;
                this.loop > 0 && this.loop--, this.currentIndex = 0
            }
            G.changeTexture(this, this.frameNamePrefix + "_" + this.currentIndex)
        }
    }, G.FrameAnimation.prototype.getAnimationLength = function(frameNamePrefix) {
        if (G.FrameAnimation.CacheAnimLength[frameNamePrefix]) return G.FrameAnimation.CacheAnimLength[frameNamePrefix];
        for (var len = 0, i = 0; 1e3 > i && G.isImageInCache(frameNamePrefix + "_" + i); i++) len++;
        return G.FrameAnimation.CacheAnimLength[frameNamePrefix] = len, len
    }, G.FrameAnimation.CacheAnimLength = {}, G.gift = {}, G.gift.getGift = function(giftsGroup) {
        var giftsGroup = giftsGroup || "normals",
            giftsObj = G.json.settings.gifts[giftsGroup],
            boosterMaxNr = giftsObj.boosterMaxNr || G.json.settings.gifts.boosterMaxNr,
            boosterChance = giftsObj.boosterChance || G.json.settings.gifts.boosterChance,
            possibleGifts = [];
        giftsObj.list.forEach(function(e) {
            "coin" == e[0] ? possibleGifts.push(e) : -1 !== e[0].indexOf("booster") && G.saveState.isBoosterUnlocked(parseInt(e[0][8])) && G.saveState.getBoosterAmount(parseInt(e[0][8])) < boosterMaxNr && possibleGifts.push(e)
        }), Phaser.ArrayUtils.shuffle(possibleGifts);
        for (var booster = Math.random() < boosterChance, i = 0; i < possibleGifts.length; i++) {
            var gift = possibleGifts[i];
            if (-1 === gift[0].indexOf("booster")) return gift.slice();
            if (booster) return gift.slice()
        }
        return ["coin", 50]
    }, G.gift.getLabelString = function(giftData) {
        return giftData[1] + " @" + G.json.settings.gifts.icons[giftData[0]] + "@"
    }, G.gift.applyGift = function(giftData) {
        "coin" == giftData[0] ? G.saveState.changeCoins(giftData[1]) : G.saveState.changeBoosterAmount(parseInt(giftData[0][8]), giftData[1])
    }, G.gift.getIcon = function(giftData) {
        return G.json.settings.gifts.icons[giftData[0]]
    }, "undefined" == typeof G && (G = {}), G.GridArray = function(width, height, value, dbg) {
        "number" == typeof width ? this.createGrid.apply(this, arguments) : "string" == typeof width ? (this.data = JSON.parse(arguments[0]), this.width = this.data.length, this.height = this.data[0].length) : Array.isArray(width) && (a = arguments[0], this.data = arguments[0], this.width = this.data.length, this.height = this.data[0].length)
    }, G.GridArray.prototype = {
        createGrid: function(width, height, value) {
            this.data = [], this.width = width, this.height = height;
            for (var collumn = 0; width > collumn; collumn++) {
                this.data[collumn] = [];
                for (var row = 0; height > row; row++) this.data[collumn][row] = value
            }
        },
        set: function(x, y, val) {
            return this.isInGrid(x, y) ? this.data[x][y] = val : (this.dbg && console.log("setValue OUT OF RANGE"), !1)
        },
        get: function(x, y) {
            return this.isInGrid(x, y) ? this.data[x][y] : (this.dbg && console.log("getValue OUT OF RANGE"), !1)
        },
        swapValues: function(x1, y1, x2, y2) {
            if (!this.isInGrid(x1, y1) || !this.isInGrid(x2, y2)) return this.dbg && console.log("swapValues OUT OF RANGE"), !1;
            var tmp = this.data[x1][y1];
            this.data[x1][y1] = this.data[x2][y2], this.data[x2][y2] = tmp
        },
        isInGrid: function(x, y) {
            return !(0 > x || x >= this.width || 0 > y || y >= this.height)
        },
        find: function(func, context) {
            for (var coll = 0; coll < this.width; coll++)
                for (var row = 0; row < this.height; row++) {
                    var val = func.call(context, this.data[coll][row], coll, row, this.data);
                    if (val) return this.data[coll][row]
                }
            return !1
        },
        filter: function(func, context) {
            for (var result = [], coll = 0; coll < this.width; coll++)
                for (var row = 0; row < this.height; row++) {
                    var val = func.call(context, this.data[coll][row], coll, row, this.data);
                    val && result.push(this.data[coll][row])
                }
            return result
        },
        loop: function(func, context) {
            for (var coll = 0; coll < this.width; coll++)
                for (var row = 0; row < this.height; row++) func.call(context, this.data[coll][row], coll, row, this.data)
        },
        clear: function(value) {
            this.loop(function(elem, x, y, array) {
                array[x][y] = value || !1
            })
        },
        findPattern: function(positions, mark) {
            var result = !1,
                len = positions.length;
            return this.loop(function(elem, x, y, array) {
                if (elem == mark && !result) {
                    for (var i = 0; len > i; i += 2) {
                        if (!this.get(x + positions[i], y + positions[i + 1])) return;
                        if (this.get(x + positions[i], y + positions[i + 1]) !== mark) return
                    }
                    result = [];
                    for (var j = 0; len > j; j += 2) result.push(x + positions[j], y + positions[j + 1])
                }
            }, this), result
        },
        count: function() {
            for (var result = 0, coll = 0; coll < this.width; coll++)
                for (var row = 0; row < this.height; row++) this.data[coll][row] && result++;
            return result
        },
        getAllElements: function() {
            for (var result = [], coll = 0; coll < this.width; coll++)
                for (var row = 0; row < this.height; row++) this.data[coll][row] && result.push(this.data[coll][row]);
            return result
        }
    }, G.Image = function(x, y, frame, anchor, groupToAdd) {
        Phaser.Image.call(this, game, G.l(x), G.l(y), null), this.state = game.state.getCurrentState(), this.changeTexture(frame), anchor && ("number" == typeof anchor ? this.anchor.setTo(anchor) : this.anchor.setTo(anchor[0], anchor[1])), groupToAdd ? (groupToAdd.add || groupToAdd.addChild).call(groupToAdd, this) : null !== groupToAdd && game.world.add(this)
    }, G.Image.prototype = Object.create(Phaser.Image.prototype), G.Image.prototype.stopTweens = function() {
        G.stopTweens(this)
    }, G.Image.prototype.changeTexture = function(image) {
        G.changeTexture(this, image)
    }, Phaser.Image.prototype.changeTexture = function(image) {
        G.changeTexture(this, image)
    }, G.Image.prototype.add = function(obj) {
        return this.addChild(obj)
    }, G.LabelGroupT = function(str, x, y, textStyle, anchor, maxWidth, distanceBetween) {
        Phaser.Group.call(this, game), this.str = str, this.tagArray = G.LabelParser.changeIntoTagArray(str), this.x = x, this.y = y, this.textStyle = textStyle, this.fontSize = parseInt(textStyle.fontSize), this.distanceBetween = distanceBetween || 0, "number" == typeof anchor ? this.anchorX = this.anchorY = anchor : (this.anchorX = anchor[0], this.anchorY = anchor[1]), this.maxWidth = maxWidth || 0, this.processTagArray()
    }, G.LabelGroupT.prototype = Object.create(Phaser.Group.prototype), G.LabelGroupT.prototype.processTagArray = function() {
        for (var i = 0; i < this.tagArray.length; i++)
            if ("img" == this.tagArray[i].type) {
                var img = G.makeImage(0, 0, this.tagArray[i].content, 0, this);
                img.tagScale = this.tagArray[i].scale
            } else if ("separator" == this.tagArray[i].type) {
            var img = G.makeImage(0, 0, null, 0, this);
            img.SEPARATOR = !0, img.SEP_LENGTH = this.tagArray[i].length
        } else this.add(new G.Text(0, 0, this.tagArray[i].content, this.textStyle));
        this.refresh()
    }, G.LabelGroupT.prototype.refresh = function() {
        if (this.applySizeAndAnchor(), this.maxWidth > 0 && this.getWholeWidth() > this.maxWidth)
            for (; this.getWholeWidth() > this.maxWidth;) this.distanceBetween = Math.floor(.9 * this.distanceBetween), this.fontSize = Math.floor(.9 * this.fontSize), this.applySizeAndAnchor();
        this.spreadElements()
    }, G.LabelGroupT.prototype.applySizeAndAnchor = function() {
        this.children.forEach(function(e) {
            e.anchor.setTo(this.anchorX, this.anchorY), e.fontSize ? (e.fontSize = this.fontSize, e.updateTransform()) : (e.height = this.fontSize * (e.tagScale || 1), e.scale.x = e.scale.y), e.SEPARATOR && (e.width = this.fontSize * e.SEP_LENGTH)
        }, this)
    }, G.LabelGroupT.prototype.getWholeWidth = function() {
        var allDistanceBetween = (this.children.length - 1) * this.distanceBetween,
            widthOfAllElements = 0;
        return this.children.forEach(function(e) {
            widthOfAllElements += e.width
        }), allDistanceBetween + widthOfAllElements
    }, G.LabelGroupT.prototype.spreadElements = function() {
        var startX = this.getWholeWidth() * this.anchorX * -1;
        this.children.forEach(function(e, index, array) {
            e.left = 0 == index ? startX : array[index - 1].right + this.distanceBetween
        }, this)
    }, G.LabelParser = {
        specialChars: ["$", "@", "%", "^"],
        changeIntoTagArray: function(str, propObj) {
            for (var result = [], i = 0; str.length > 0 && !(i++ > 20);) {
                var firstTag = this.findFirstSpecialChar(str);
                if (-1 === firstTag) {
                    result.push(str);
                    break
                }
                firstTag[0] > 0 && (result.push(str.slice(0, firstTag[0])), str = str.slice(firstTag[0])), str = this.cutOffTag(str, result, firstTag[1])
            }
            for (var processedResult = [], i = 0; i < result.length; i++) processedResult.push(this.processTag(result[i], propObj));
            return this.mergeTextTagsInArray(processedResult)
        },
        mergeTextTagsInArray: function(tagArray) {
            for (var mergedArray = [], startIndex = null, i = 0; i < tagArray.length; i++) "text" !== tagArray[i].type ? (null !== startIndex && (mergedArray.push(this.mergeTextTags(tagArray, startIndex, i)), startIndex = null), mergedArray.push(tagArray[i])) : null == startIndex && (startIndex = i);
            return null !== startIndex && mergedArray.push(this.mergeTextTags(tagArray, startIndex, i)), mergedArray
        },
        mergeTextTags: function(array, startIndex, endIndex) {
            for (var newObj = {
                    type: "text",
                    content: []
                }; endIndex > startIndex; startIndex++) newObj.content.push(array[startIndex].content);
            return newObj.content = newObj.content.join(" "), newObj
        },
        processTag: function(elem, propObj) {
            if ("@" == elem[0]) {
                var scale = 1;
                return "*" == elem[1] && elem.indexOf("*", 2) && (scale = parseFloat(elem.slice(elem.indexOf("*") + 1, elem.indexOf("*", 2))), elem = elem.slice(elem.indexOf("*", 2))), {
                    type: "img",
                    content: elem.slice(1, -1),
                    scale: scale
                }
            }
            return "%" == elem[0] ? {
                type: "text",
                content: propObj[elem.slice(1, -1)]
            } : "$" == elem[0] ? {
                type: "text",
                content: G.txt(elem.slice(1, -1))
            } : "^" == elem[0] ? {
                type: "text",
                content: elem.slice(1, -1)
            } : this.isStringJustSpaces(elem) ? {
                type: "separator",
                content: elem,
                length: elem.length
            } : {
                type: "text",
                content: elem
            }
        },
        isStringJustSpaces: function(elem) {
            for (var i = 0; i < elem.length; i++)
                if (" " !== elem[i]) return !1;
            return !0
        },
        cutOffTag: function(str, result, tag) {
            var startIndex = str.indexOf(tag),
                endIndex = str.indexOf(tag, startIndex + 1);
            return result.push(str.slice(startIndex, endIndex + 1)), str.slice(0, startIndex) + str.slice(endIndex + 1)
        },
        findFirstSpecialChar: function(str) {
            var smallest = 1 / 0,
                foundedChar = !1;
            return this.specialChars.forEach(function(char) {
                var index = str.indexOf(char);
                index > -1 && smallest > index && (foundedChar = char, smallest = Math.min(index, smallest))
            }), smallest === 1 / 0 ? -1 : [smallest, foundedChar]
        },
        createLabel: function(string, propObj, x, y, font, fontSize, anchorX, anchorY, distanceBetween, maxWidth) {
            var group = (this.changeIntoTagArray(string, propObj), new G.LabelGroup(x, y, fontSize, distanceBetween, anchorX, anchorY, maxWidth));
            return group
        }
    }, G.LabelGroup = function(str, x, y, font, fontSize, anchorX, anchorY, maxWidth) {
        Phaser.Group.call(this, game), this.fontData = game.cache.getBitmapFont(font).font, this.fontBaseSize = this.fontData.size, this.fontSpaceOffset = this.fontData.chars[32].xOffset + this.fontData.chars[32].xAdvance, this.str = str, this.tagArray = G.LabelParser.changeIntoTagArray(str), this.x = "undefined" == typeof x ? 0 : G.l(x), this.y = "undefined" == typeof y ? 0 : G.l(y), this.font = font, this.fontSize = "undefined" == typeof fontSize ? G.l(30) : G.l(fontSize), this.distanceBetween = 0, this.anchorX = "undefined" == typeof anchorX ? .5 : anchorX, this.anchorY = "undefined" == typeof anchorY ? .5 : anchorY, this.maxWidth = maxWidth || 0, this.processTagArray()
    }, G.LabelGroup.prototype = Object.create(Phaser.Group.prototype), G.LabelGroup.prototype.processTagArray = function() {
        for (var i = 0; i < this.tagArray.length; i++)
            if ("img" == this.tagArray[i].type) {
                var img = G.makeImage(0, 0, this.tagArray[i].content, 0, this);
                img.tagScale = this.tagArray[i].scale
            } else if ("separator" == this.tagArray[i].type) {
            var img = G.makeImage(0, 0, null, 0, this);
            img.SEPARATOR = !0, img.SEP_LENGTH = this.tagArray[i].length
        } else this.add(game.add.bitmapText(0, 0, this.font, this.tagArray[i].content, this.fontSize));
        this.refresh()
    }, G.LabelGroup.prototype.refresh = function() {
        if (this.applySizeAndAnchor(), this.maxWidth > 0 && this.getWholeWidth() > this.maxWidth)
            for (; this.getWholeWidth() > this.maxWidth;) this.distanceBetween *= .9, this.fontSize *= .9, this.applySizeAndAnchor();
        this.spreadElements()
    }, G.LabelGroup.prototype.applySizeAndAnchor = function() {
        this.children.forEach(function(e) {
            e.anchor.setTo(this.anchorX, this.anchorY), e.fontSize ? (e.fontSize = this.fontSize, e.updateText()) : (e.height = this.fontSize * (e.tagScale || 1), e.scale.x = e.scale.y), e.SEPARATOR && (e.width = this.fontSize / this.fontBaseSize * this.fontSpaceOffset * e.SEP_LENGTH)
        }, this)
    }, G.LabelGroup.prototype.getWholeWidth = function() {
        var allDistanceBetween = (this.children.length - 1) * this.distanceBetween,
            widthOfAllElements = 0;
        return this.children.forEach(function(e) {
            widthOfAllElements += e.width
        }), allDistanceBetween + widthOfAllElements
    }, G.LabelGroup.prototype.spreadElements = function() {
        var startX = this.getWholeWidth() * this.anchorX * -1;
        this.children.forEach(function(e, index, array) {
            e.left = 0 == index ? startX : array[index - 1].right + this.distanceBetween
        }, this)
    }, G.LineEditor = function() {
        Phaser.Group.call(this, game), this.gfx = game.add.graphics(), this.gfx.fixedToCamera = !0, this.points = {
            x: [],
            y: []
        }, this.currentIndex = null, this.pointerStart = new Phaser.Point(0, 0), this.interpolation = "linearInterpolation", game.input.onDown.add(function(pointer) {
            this.currentIndex = this.findCurrentIndex(pointer), null !== this.currentIndex && (this.pointerStart.x = pointer.x, this.pointerStart.y = pointer.y)
        }, this), game.input.onUp.add(function(pointer) {
            this.currentIndex = null
        }, this), this.keys = game.input.keyboard.addKeys({
            Z: Phaser.Keyboard.Z,
            X: Phaser.Keyboard.X,
            C: Phaser.Keyboard.C,
            A: Phaser.Keyboard.A,
            S: Phaser.Keyboard.S,
            D: Phaser.Keyboard.D
        }), this.keys.Z.onDown.add(function() {
            this.interpolation = "catmullRomInterpolation"
        }, this), this.keys.X.onDown.add(function() {
            this.interpolation = "bezierInterpolation"
        }, this), this.keys.C.onDown.add(function() {
            this.interpolation = "linearInterpolation"
        }, this), this.keys.A.onDown.add(function() {
            var pointer = game.input.activePointer;
            this.points.x.push(pointer.x), this.points.y.push(pointer.y)
        }, this), this.keys.S.onDown.add(function() {
            this.currentIndex && (this.points.x.splice(this.currentIndex, 1), this.points.y.splice(this.currentIndex, 1))
        }, this), this.keys.D.onDown.add(function() {
            this.points.x.pop(), this.points.y.pop()
        }, this)
    }, G.LineEditor.prototype = Object.create(Phaser.Group.prototype), G.LineEditor.prototype.update = function() {
        if (this.currentIndex) {
            var pointer = game.input.activePointer,
                diffX = this.pointerStart.x - pointer.x,
                diffY = this.pointerStart.y - pointer.y;
            this.pointerStart.x = pointer.x, this.pointerStart.y = pointer.y, this.points.x[this.currentIndex] -= diffX, this.points.y[this.currentIndex] -= diffY
        }
        this.redraw()
    }, G.LineEditor.prototype.findCurrentIndex = function(pointer) {
        for (var index = null, min = 1 / 0, i = 0; i < this.points.x.length; i++) {
            var dist = game.math.distance(pointer.x, pointer.y, this.points.x[i], this.points.y[i]);
            min > dist && (index = i, min = dist)
        }
        return 10 > min ? index : index
    }, G.LineEditor.prototype.redraw = function() {
        this.gfx.clear(), this.drawLine(), this.drawPoints()
    }, G.LineEditor.prototype.drawPoints = function() {
        this.gfx.lineStyle(2, 255, 1), this.gfx.beginFill(255, .5);
        for (var i = 0; i < this.points.x.length; i++) this.gfx.drawCircle(this.points.x[i], this.points.y[i], 10)
    }, G.LineEditor.prototype.drawLine = function() {
        if (0 != this.points.x.length) {
            this.gfx.lineStyle(2, 16711680, 1), this.gfx.moveTo(this.points.x[0], this.points.y[0]);
            for (var i = 0; 1 > i; i += .001) {
                var x = game.math[this.interpolation](this.points.x, i),
                    y = game.math[this.interpolation](this.points.y, i);
                this.gfx.lineTo(x, y)
            }
        }
    }, "undefined" == typeof G && (G = {}), G.Loader = {
        currentConfig: "hd",
        currentConfigMulti: 1,
        loadingScreenActive: !1,
        lang: !1,
        passConfigs: function(conf) {
            this.configs = conf
        },
        setConfig: function(chosen) {
            this.currentConfig = chosen, this.currentConfigMulti = this.configs[chosen]
        },
        killLoadingScreen: function() {
            G.imgRotate && (G.whiteOverlay.destroy(), G.imgRotate.fadeOut = !0, G.imgRotate = !1, this.loadingScreenActive = !1)
        },
        loadPOSTImage: function(name) {
            "undefined" != typeof name && (game.cache.checkImageKey(name) || (this.makeLoadingScreen(), game.load.image(name, "assets/" + this.currentConfig + "/imagesPOST/" + name)))
        },
        loadBootAssets: function(lang) {
            lang && (this.lang = lang.toUpperCase()), G.ASSETS.images.forEach(function(fileName) {
                this.checkIfLoad(fileName, !0) && game.load.image(this.removeExt(this.cutOffPrefixes(fileName)), "assets/" + this.currentConfig + "/images/" + fileName)
            }, this), G.ASSETS.spritesheets.forEach(function(elem) {
                this.checkIfLoad(elem, !0) && game.load.atlasJSONHash(this.cutOffPrefixes(elem), "assets/" + this.currentConfig + "/spritesheets/" + elem + ".png", "assets/" + this.currentConfig + "/spritesheets/" + elem + ".json")
            }, this), game.load.onLoadComplete.addOnce(function() {
                this.createSpritesheetMap(!0)
            }, this)
        },
        loadAssets: function(lang) {
            lang && (this.lang = lang.toUpperCase()), game.load.onLoadComplete.addOnce(this.processAssets, this), this.loadSFX(G.ASSETS.sfx), this.loadImages(G.ASSETS.images), this.loadSpritesheets(G.ASSETS.spritesheets), this.loadJson(G.ASSETS.json), this.loadFonts(G.ASSETS.fonts)
        },
        processAssets: function() {
            this.processJson(G.ASSETS.json), this.processSFX(G.ASSETS.sfx), this.createSpritesheetMap()
        },
        createSpritesheetMap: function(boot) {
            G.spritesheetMap || (G.spritesheetMap = {});
            for (var i = 0, len = G.ASSETS.spritesheets.length; len > i; i++)
                if (this.checkIfLoad(G.ASSETS.spritesheets[i], boot)) {
                    var sheetName = this.cutOffPrefixes(G.ASSETS.spritesheets[i]);
                    if (game.cache.checkImageKey(sheetName))
                        for (var sheet = game.cache.getFrameData(sheetName), frameIndex = 0; frameIndex < sheet._frames.length; frameIndex++) {
                            var frame = sheet._frames[frameIndex];
                            G.spritesheetMap[frame.name] && console.warn("Images name collision: " + frame.name), G.spritesheetMap[frame.name] = sheetName
                        }
                }
        },
        loadSFX: function(list) {
            list.forEach(function(fileName) {
                "forest_sounds" === fileName ? game.load.audio(this.removeExt(fileName), "https://trap-cdn.softgames.com/candy-rain-5/assets/sfx/forest_sounds.mp3") : game.load.audio(this.removeExt(fileName), "assets/sfx/" + fileName)
            }, this)
        },
        loadFonts: function(fontObj) {
            for (var font in fontObj) {
                if (!this.checkIfLoad(font)) return;
                game.load.bitmapFont(this.cutOffPrefixes(font), "assets/" + this.currentConfig + "/fonts/" + fontObj[font].frame, "assets/" + this.currentConfig + "/fonts/" + fontObj[font].data)
            }
        },
        loadImages: function(list) {
            list.forEach(function(fileName) {
                this.checkIfLoad(fileName) && game.load.image(this.removeExt(this.cutOffPrefixes(fileName)), "assets/" + this.currentConfig + "/images/" + fileName)
            }, this)
        },
        loadJson: function(list) {
            list.forEach(function(fileName) {
                game.load.json(this.removeExt(fileName), "assets/json/" + fileName)
            }, this)
        },
        loadSpritesheets: function(list) {
            list.forEach(function(elem) {
                this.checkIfLoad(elem) && game.load.atlasJSONHash(this.cutOffPrefixes(elem), "assets/" + this.currentConfig + "/spritesheets/" + elem + ".png", "assets/" + this.currentConfig + "/spritesheets/" + elem + ".json")
            }, this)
        },
        checkIfLoad: function(fileName, bootPhase) {
            return bootPhase && -1 == fileName.indexOf("BOOT-") ? !1 : bootPhase || -1 === fileName.indexOf("BOOT-") ? -1 !== fileName.indexOf("MOBILE-") && game.device.desktop ? !1 : -1 === fileName.indexOf("DESKTOP-") || game.device.desktop ? this.lang && fileName.match(/^[A-Z]{2}\-/) ? 0 == fileName.indexOf(this.lang + "-") : !0 : !1 : !1
        },
        cutOffPrefixes: function(fileName) {
            return fileName = fileName.replace(/^[A-Z]{2}\-/, ""), fileName = fileName.replace("BOOT-", ""), fileName = fileName.replace("MOBILE-", ""), fileName = fileName.replace("DESKTOP-", "")
        },
        removeExt: function(fileName) {
            return fileName.slice(0, fileName.lastIndexOf("."))
        },
        processJson: function(list) {
            G.json = {}, list.forEach(function(fileName) {
                fileName = this.removeExt(fileName), G.json[fileName] = game.cache.getJSON(fileName)
            }, this)
        },
        processSFX: function(list) {
            G.sfx = {}, game.sfx = G.sfx;
            var clusters = {};
            list.forEach(function(elem) {
                elem = this.removeExt(elem), G.sfx[elem] = game.add.audio(elem);
                var lastIndex = elem.lastIndexOf("_");
                if (-1 !== lastIndex && !isNaN(elem.slice(lastIndex + 1))) {
                    var name = (parseInt(elem.slice(lastIndex + 1)), elem.slice(0, lastIndex));
                    clusters[name] || (clusters[name] = []), clusters[name].push(G.sfx[elem])
                }
            }, this), Object.keys(clusters).forEach(function(key) {
                G.sfx[key] = {
                    sfxArray: clusters[key],
                    play: function(volume, loop, forceRestart) {
                        game.rnd.pick(this.sfxArray).play("", 0, volume, loop, forceRestart)
                    }
                }
            })
        }
    }, G.MultiLineText = function(x, y, font, text, size, max_width, max_height, align, hAnchor, vAnchor) {
        if (x = G.l(x), y = G.l(y), size = G.l(size), max_width = G.l(max_width), max_height = G.l(max_height), this.maxUserWidth = max_width, this.maxUserHeight = max_height, Phaser.BitmapText.call(this, game, x, y, font, "", size), this.splitText(text, max_width), this.align = align || "center", max_height)
            for (; this.height > max_height && (this.fontSize -= 2, this.splitText(text, max_width), this.updateText(), !(this.fontSize < 5)););
        this.anchor.setTo(hAnchor, vAnchor), this.cacheAsBitmap = !0
    }, G.MultiLineText.prototype = Object.create(Phaser.BitmapText.prototype), G.MultiLineText.prototype.constructor = G.MultiLineText, G.MultiLineText.prototype.splitText = function(text, max_width) {
        for (var txt = text, txtArray = [], prevIndexOfSpace = 0, indexOfSpace = 0; txt.length > 0;)
            if (prevIndexOfSpace = indexOfSpace, indexOfSpace = txt.indexOf(" ", indexOfSpace + 1), -1 == indexOfSpace ? this.setText(txt) : this.setText(txt.substring(0, indexOfSpace)), this.updateText(), this.width > max_width) {
                if (0 == prevIndexOfSpace && -1 == indexOfSpace) {
                    txtArray.push(txt), txt = "", indexOfSpace = 0;
                    continue
                }
                if (0 == prevIndexOfSpace) {
                    txtArray.push(txt.substring(0, indexOfSpace)), txt = txt.substring(indexOfSpace + 1), indexOfSpace = 0;
                    continue
                }
                txtArray.push(txt.substring(0, prevIndexOfSpace)), txt = txt.substring(prevIndexOfSpace + 1), indexOfSpace = 0
            } else -1 == indexOfSpace && (txtArray.push(txt), txt = "");
        this.setText(txtArray.join("\n"))
    }, G.MultiLineText.prototype.popUpAnimation = function() {
        this.cacheAsBitmap = !1;
        for (var char_numb = this.children.length, delay_array = [], i = 0; char_numb > i; i++) delay_array[i] = i;
        delay_array = Phaser.ArrayUtils.shuffle(delay_array), delay_index = 0, this.activeTweens = 0, this.children.forEach(function(letter) {
            0 == letter.anchor.x && (letter.x = letter.x + .5 * letter.width, letter.y = letter.y + letter.height, letter.anchor.setTo(.5, 1));
            var target_scale = letter.scale.x;
            letter.scale.setTo(0, 0), this.activeTweens++;
            var tween = game.add.tween(letter.scale).to({
                x: 1.5 * target_scale,
                y: 1.5 * target_scale
            }, 200, Phaser.Easing.Quadratic.In, !1, 25 * delay_array[delay_index]).to({
                x: target_scale,
                y: target_scale
            }, 200, Phaser.Easing.Sinusoidal.In);
            tween.onComplete.add(function() {
                this.activeTweens--, 0 == this.activeTweens && this.alive && (this.cacheAsBitmap = !0)
            }, this), tween.start(), delay_index++
        }, this)
    }, G.OneLineText = function(x, y, font, text, size, width, hAnchor, vAnchor) {
        if (Phaser.BitmapText.call(this, game, G.l(x), G.l(y), font, text, G.l(size), G.l(width)), width)
            for (; this.width > G.l(width) && (this.fontSize -= 2, this.updateText(), !(this.fontSize < 5)););
        this.orgFontSize = G.l(size), this.maxUserWidth = G.l(width), this.skipCaching = G.skipOneLineTextCaching || !1, this.hAnchor = hAnchor, this.vAnchor = vAnchor, this.anchor.setTo(this.hAnchor, this.vAnchor), this.updateText(), this.insertCoin(this.fontSize), this.skipCaching || (this.cacheAsBitmap = !0, this.updateCache())
    }, G.OneLineText.prototype = Object.create(Phaser.BitmapText.prototype), G.OneLineText.prototype.constructor = G.OneLineText, G.OneLineText.prototype.insertCoin = function(size) {
        -1 != this.text.indexOf("$$") && this.children.forEach(function(element, index, array) {
            if (element.name && "$" == element.name && element.visible && index + 1 <= array.length - 1 && "$" == array[index].name) {
                var el = element,
                    el2 = array[index + 1];
                el.visible = !1, el2.visible = !1, coin = G.makeImage(el.x + .05 * size, el.y - .05 * size, "coin"), coin.width = size, coin.height = size, el.parent.addChild(coin)
            }
        })
    }, G.OneLineText.prototype.setText = function(text) {
        Phaser.BitmapText.prototype.setText.call(this, text.toString());
        var oldScaleX = this.scale.x,
            oldScaleY = this.scale.y,
            oldAlpha = this.alpha,
            oldAngle = this.angle;
        if (this.alpha = 1, this.scale.setTo(1), this.maxUserWidth) {
            this.fontSize = this.orgFontSize, this.updateText();
            for (; this.width > this.maxUserWidth && (this.fontSize -= 1, this.updateText(), !(this.fontSize < 5)););
        }!this.skipCaching && this.cacheAsBitmap && this.updateCache(), this.scale.setTo(oldScaleX, oldScaleY), this.alpha = oldAlpha, this.angle = oldAngle
    }, G.OneLineText.prototype.popUpAnimation = function() {
        this.cacheAsBitmap = !1;
        for (var char_numb = this.children.length, delay_array = [], i = 0; char_numb > i; i++) delay_array[i] = i;
        delay_array = Phaser.ArrayUtils.shuffle(delay_array), delay_index = 0, this.activeTweens = 0, this.children.forEach(function(letter) {
            0 == letter.anchor.x && (letter.x = letter.x + .5 * letter.width, letter.y = letter.y + letter.height, letter.anchor.setTo(.5, 1));
            var target_scale = letter.scale.x;
            letter.scale.setTo(0, 0), this.activeTweens++;
            var tween = game.add.tween(letter.scale).to({
                x: 1.5 * target_scale,
                y: 1.5 * target_scale
            }, 200, Phaser.Easing.Quadratic.In, !1, 25 * delay_array[delay_index]).to({
                x: target_scale,
                y: target_scale
            }, 200, Phaser.Easing.Sinusoidal.In);
            tween.onComplete.add(function() {
                this.activeTweens--, 0 == this.activeTweens && this.alive && !this.skipCaching && (this.cacheAsBitmap = !0)
            }, this), tween.start(), delay_index++
        }, this)
    }, G.OneLineText.prototype.scaleOut = function(onComplete, context) {
        this.cacheAsBitmap = !1, this.activeTweens = 0, this.children.forEach(function(letter, index) {
            0 == letter.anchor.x && (letter.x = letter.x + .5 * letter.width, letter.y = letter.y + .5 * letter.height, letter.anchor.setTo(.5, .5)), this.activeTweens++, letter.scale.setTo(letter.scale.x, letter.scale.y);
            var tween = game.add.tween(letter.scale).to({
                x: 0,
                y: 0
            }, 400, Phaser.Easing.Cubic.In, !1, 20 * index);
            tween.onComplete.add(function() {
                this.activeTweens--, 0 == this.activeTweens && this.destroy()
            }, this), tween.start()
        }, this)
    }, G.OneLineCounter = function(x, y, font, amount, size, width, hAnchor, vAnchor, preText, postText) {
        G.OneLineText.call(this, x, y, font, "", size, width, hAnchor, vAnchor), this.amount = amount, this.amountDisplayed = amount, this.amountMaxInterval = 5, this.amountMaxNegInterval = -5, this.absoluteDisplay = !1, this.fixedToDecimal = 0, this.stepCurrent = 0, this.step = 0, this.preText = preText || "", this.postText = postText || "", this.setText(this.preText + amount + this.postText)
    }, G.OneLineCounter.prototype = Object.create(G.OneLineText.prototype), G.OneLineCounter.prototype.update = function() {
        if (this.lerp) return void this.lerpUpdate();
        if (this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.amountDisplayed != this.amount)) {
            var diff = this.amount - this.amountDisplayed;
            this.amountDisplayed += game.math.clamp(diff, this.amountMaxNegInterval, this.amountMaxInterval);
            var valueToDisplay = this.amountDisplayed;
            this.absoluteDisplay && (valueToDisplay = Math.abs(valueToDisplay)), 0 != this.fixedTo && (valueToDisplay = valueToDisplay.toFixed(this.fixedToDecimal)), this.setText(this.preText + valueToDisplay + this.postText)
        }
    }, G.OneLineCounter.prototype.changeAmount = function(amount) {
        this.amount = amount
    }, G.OneLineCounter.prototype.increaseAmount = function(change) {
        this.amount += change
    }, G.OneLineCounter.prototype.changeIntervals = function(max, maxNeg) {
        "undefined" == typeof maxNeg ? (this.amountMaxInterval = max, this.amountMaxNegInterval = -max) : (this.amountMaxInterval = max, this.amountMaxNegInterval = maxNeg)
    }, G.OneLineCounter.prototype.lerpUpdate = function() {
        this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.amountDisplayed = Math.round(G.lerp(this.amountDisplayed, this.amount, .5, .6)), this.setText(this.amountDisplayed.toString()))
    }, G.PartCacher = function() {
        Phaser.Group.call(this, game), this.active = !1, this.every = 1, this.rt = game.add.renderTexture(10, 10), this.frameCounter = 0, this.framesToRecord = null
    }, G.PartCacher.prototype = Object.create(Phaser.Group.prototype), G.PartCacher.prototype.update = function() {
        if (this.active) {
            if (this.stepForward(), !this.checkChildren()) return this.active = !1, void this.removeAll(!0, !0);
            this.frameCounter % this.frameRate === 0 && (this.saveFrame(), this.frameNr++, null !== this.framesToRecord && (this.framesToRecord--, 0 == this.framesToRecord && (this.active = !1))), this.frameCounter++
        }
    }, G.PartCacher.prototype.stepForward = function() {
        for (var i = this.children.length; i--;) this.children[i].update()
    }, G.PartCacher.prototype.start = function(fileName, frameRate, nrOfFrames) {
        this.fileName = fileName, this.frameNr = 0, this.frameRate = 60 / frameRate, this.active = !0, this.frameCounter = 0, this.framesToRecord = nrOfFrames || null
    }, G.PartCacher.prototype.saveFrame = function() {
        var bounds = this.getBounds(),
            widthFromCenter = Math.max(this.x - bounds.x, bounds.x + bounds.width - this.x, 400),
            heightFromCenter = Math.max(this.y - bounds.y, bounds.y + bounds.height - this.y, 400);
        this.rt.resize(2 * widthFromCenter, 2 * heightFromCenter, !0), this.rt.renderXY(this, widthFromCenter, heightFromCenter, !0);
        var c = this.rt.getCanvas(),
            fileName = this.fileName + "_" + this.frameNr;
        c.toBlob(function(blob) {
            saveAs(blob, fileName)
        })
    }, G.PartCacher.prototype.checkChildren = function() {
        var inactive = this.children.filter(function(child) {
            return !child.alive || 0 === child.alpha || 0 == child.scale.x || 0 == child.scale.y
        });
        return this.children.length !== inactive.length
    }, G.PoolGroup = function(elementConstructor, argumentsArray, signal, initFill) {
        if (Phaser.Group.call(this, game), this._deadArray = [], this._elementConstructor = elementConstructor, this._argumentsArray = argumentsArray || [], this._argumentsArray.unshift(null), signal && G.sb(signal).add(this.init, this), initFill)
            for (var i = 0; initFill > i; i++) element = new(Function.prototype.bind.apply(this._elementConstructor, this._argumentsArray)), this.add(element), element.events.onKilled.add(this._onElementKilled, this), element.kill()
    }, G.PoolGroup.prototype = Object.create(Phaser.Group.prototype), G.PoolGroup.prototype.getFreeElement = function() {
        var element;
        return this._deadArray.length > 0 ? element = this._deadArray.pop() : (element = new(Function.prototype.bind.apply(this._elementConstructor, this._argumentsArray)), element.events.onKilled.add(this._onElementKilled, this)), this.add(element), element
    }, G.PoolGroup.prototype._onElementKilled = function(elem) {
        this === elem.parent && (this._deadArray.push(elem), this.removeChild(elem))
    }, G.PoolGroup.prototype.init = function() {
        var elem = this.getFreeElement();
        return elem.init.apply(elem, arguments), elem
    }, G.PoolGroup.prototype.initBatch = function(nr) {
        for (var i = 0; nr > i; i++) this.init.apply(this, [].slice.call(arguments, 1))
    }, G.PreloaderBar = function() {
        Phaser.Group.call(this, game), this.fixedToCamera = !0, this.gfx = game.add.graphics(), this.add(this.gfx), this.drawProgress(0), G.sb("onScreenResize").add(this.onResize, this), this.onResize(), game.load.onFileComplete.add(this.drawProgress, this)
    }, G.PreloaderBar.prototype = Object.create(Phaser.Group.prototype), G.PreloaderBar.prototype.onResize = function() {
        this.cameraOffset.x = .5 * game.width, this.cameraOffset.y = .4 * game.height
    }, G.PreloaderBar.prototype.drawProgress = function(progress) {
        this.gfx.clear(), this.gfx.lineStyle(2, 16777215, 1), this.gfx.beginFill(0, 1), this.gfx.drawRect(-150, 0, 300, 50), this.gfx.beginFill(16777215, 1), this.gfx.drawRect(-145, 5, progress / 100 * 290, 40)
    }, G.ProgressBar = function(x, y, sprite, currentValue, maxValue, offsetX, offsetY) {
        G.Image.call(this, x, y, sprite + "_empty", 0, null), offsetX = "undefined" == typeof offsetX ? 0 : offsetX, offsetY = "undefined" == typeof offsetY ? 0 : offsetX, this.fill = G.makeImage(offsetX, offsetY, sprite + "_full", 0, this), this.fillFullWidth = this.fill.width, this.fillOverlay = G.makeImage(offsetX, offsetY, sprite + "_full_overlay", this.fill, this), this.fillOverlay.alpha = 0, this.fill.cropRect = new Phaser.Rectangle(0, 0, 0, this.fill.height), this.fill.updateCrop(), this.currentValue = currentValue, this.prevCurrentValue = currentValue, this.targetValue = currentValue, this.maxValue = maxValue, this.lerpValue = .05, this.updateBarCrop(), this.onTargetReached = new Phaser.Signal, this.onBarFilled = new Phaser.Signal
    }, G.ProgressBar.prototype = Object.create(G.Image.prototype), G.ProgressBar.prototype.update = function() {
        this.currentValue !== this.targetValue && (this.currentValue = G.lerp(this.currentValue, this.targetValue, this.lerpValue, .005 * this.maxValue), this.currentValue === this.targetValue && this.onTargetReached.dispatch()), this.currentValue !== this.prevCurrentValue && (this.updateBarCrop(), this.currentValue === this.maxValue && (game.add.tween(this.fillOverlay).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), this.onBarFilled.dispatch(), this.label && game.add.tween(this.label).to({
            alpha: 0
        }, 600, Phaser.Easing.Sinusoidal.InOut, !0)), this.label && Math.floor(this.currentValue) !== Math.floor(this.prevCurrentValue) && (console.log("updating label"), this.label.updateValue(Math.floor(this.currentValue)))), this.prevCurrentValue = this.currentValue
    }, G.ProgressBar.prototype.updateBarCrop = function() {
        var oldCropRectWidth = this.fill.cropRect.width,
            newCropRectWidth = Math.round(this.fillFullWidth * (this.currentValue / this.maxValue));
        oldCropRectWidth !== newCropRectWidth && (this.fill.cropRect.width = newCropRectWidth, this.fill.updateCrop())
    }, G.ProgressBar.prototype.changeCurrentValue = function(newTargetValue, lerpValue) {
        this.targetValue = game.math.clamp(newTargetValue, 0, this.maxValue), this.lerpValue = lerpValue || this.lerpValue
    }, G.ProgressBar.prototype.increaseCurrentValue = function(amount) {
        this.changeCurrentValue(this.targetValue + (amount || 1))
    }, G.ProgressBar.prototype.decreaseCurrentValue = function(amount) {
        this.changeCurrentValue(this.targetValue - (amount || 1))
    }, G.ProgressBar.prototype.changeValues = function(currentValue, maxValue) {
        this.currentValue = currentValue, this.prevCurrentValue = currentValue, this.targetValue = currentValue, this.maxValue = maxValue, this.label && this.label.changeValues(currentValue, maxValue), this.updateBarCrop()
    }, G.ProgressBar.prototype.addLabel = function(labelType, animationOnIncrease) {
        this.label = new G.ProgressBar.Label(G.rl(.5 * this.width), G.rl(.5 * this.height), this.currentValue, this.maxValue, Math.floor(.6 * G.rl(this.height)), G.rl(.7 * this.width), labelType, animationOnIncrease), this.add(this.label)
    }, G.ProgressBar.Label = function(x, y, currentValue, maxValue, size, maxWidth, labelType, animationOnIncrease) {
        G.OneLineText.call(this, x, y, "font", "", size, maxWidth, .5, .5), this.labelType = labelType || 0, this.labelType1Text = G.txt("%AMOUNT% left"), this.currentValue = currentValue, this.maxValue = maxValue, this.animationOnIncrease = animationOnIncrease || !1, this.updateValue(this.currentValue, !0)
    }, G.ProgressBar.Label.prototype = Object.create(G.OneLineText.prototype), G.ProgressBar.Label.prototype.updateValue = function(newCurrentValue, init) {
        (init || Math.min(newCurrentValue, this.maxValue) !== this.currentValue) && (this.currentValue = newCurrentValue, this.updateLabelText(), !init && this.animationOnIncrease && (G.stopTweens(this), this.scale.setTo(1), game.add.tween(this.scale).to({
            x: 1.2,
            y: 1.2
        }, 200, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0)))
    }, G.ProgressBar.Label.prototype.changeValues = function(currentValue, maxValue) {
        this.currentValue = currentValue, this.maxValue = maxValue, this.alpha = this.currentValue < this.maxValue ? 1 : 0, this.updateLabelText()
    }, G.ProgressBar.Label.prototype.updateLabelText = function() {
        0 == this.labelType ? this.setText(this.currentValue + "/" + this.maxValue) : this.setText(this.labelType1Text.replace("%AMOUNT%", this.maxValue - this.currentValue))
    }, "undefined" == typeof G && (G = {}), G.SignalBox = function() {
        function clearNonPermanent() {
            Object.keys(signals).forEach(function(signal) {
                signals[signal].removeNonPermanent()
            })
        }

        function clearAll() {
            Object.keys(signals).forEach(function(signal) {
                signals[signal].removeAll()
            })
        }

        function getSignal(signalName) {
            return clearOnStageChange || game.state.onStateChange.add(clearNonPermanent, this), signals[signalName] || (signals[signalName] = new Phaser.Signal), signals[signalName]
        }
        Phaser.Signal.prototype.addPermanent || (Phaser.Signal.prototype.addPermanent = function() {
            var signalBinding = this.add.apply(this, arguments);
            return signalBinding._PERMANENT = !0, signalBinding
        }, Phaser.Signal.prototype.removeNonPermanent = function() {
            if (this._bindings)
                for (var n = this._bindings.length; n--;) this._bindings[n]._PERMANENT || (this._bindings[n]._destroy(), this._bindings.splice(n, 1))
        });
        var clearOnStageChange = !1,
            signals = {};
        return getSignal.signals = signals, getSignal.clearNonPermanent = clearNonPermanent, getSignal.clearAll = clearAll, getSignal
    }(), G.Slider = function(x, y, width, initPos) {
        Phaser.Graphics.call(this, game, x, y), this.sliderWidth = width, this.pos = initPos, this.beginFill(0, 1), this.drawRect(0, -2, this.sliderWidth, 4), this.circleGfx = this.addChild(game.make.graphics(width * initPos, 0)), this.circleGfx.clear(), this.circleGfx.lineStyle(1, 0, 1), this.circleGfx.beginFill(10066329, 1), this.circleGfx.drawCircle(0, 0, 32), this.circleGfx.sliderWidth = width, this.circleGfx.inputEnabled = !0, this.circleGfx.input.useHandCursor = !0, this.circleGfx.input.draggable = !0, this.circleGfx.input.setDragLock(!0, !1)
    }, G.Slider.prototype = Object.create(Phaser.Graphics.prototype), G.Slider.prototype.update = function() {
        this.circleGfx.x = game.math.clamp(this.circleGfx.x, 0, this.sliderWidth), this.pos = this.circleGfx.x / this.sliderWidth
    }, G.SliderPanel = function(x, y, width, height, content, config) {
        Phaser.Group.call(this, game), this.sliderWidth = G.l(width), this.sliderHeight = G.l(height), this.x = x + this.sliderWidth * -.5, this.y = y + this.sliderHeight * -.5, this.gfxMask = game.add.graphics(), this.gfxMask.beginFill(0, 1), this.gfxMask.drawRect(0, 0, width, height), this.clickableObjects = [], this.config = config, this.applyConfig(this.config), this.addContent(content), this.add(this.gfxMask), this.contentGroup.mask = this.gfxMask, this.slideY = 0, this.inputSprite = G.makeImage(0, 0, null, 0, this), this.inputSprite.inputEnabled = !0, this.inputSprite.hitArea = new Phaser.Rectangle(0, 0, width, height), this.inputSpriteDown = !1, this.inputData = {
            x: null,
            y: null,
            velX: 0,
            velY: 0,
            xStart: null,
            yStart: null,
            startFrameStamp: null,
            clickDistanceWindow: 10,
            clickTimeWindow: 10
        }, this.inputSprite.events.onInputDown.add(function(pointer) {
            var p = game.input.activePointer;
            this.inputSpriteDown = !0, this.inputData.x = this.inputData.xStart = p.worldX, this.inputData.y = this.inputData.yStart = p.worldY, this.inputData.startFrameStamp = this.frameCounter
        }, this), this.inputSprite.events.onInputUp.add(function() {
            var p = game.input.activePointer;
            this.inputSpriteDown = !1;
            var distance = game.math.distance(this.inputData.xStart, this.inputData.yStart, p.worldX, p.worldY),
                timeDelta = this.frameCounter - this.inputData.startFrameStamp;
            distance <= this.inputData.clickDistanceWindow && timeDelta <= this.inputData.clickTimeWindow && (this.propagateClick(p.x, p.y), this.inputData.velX = 0, this.inputData.velY = 0)
        }, this), this.frameCounter = 0
    }, G.SliderPanel.prototype = Object.create(Phaser.Group.prototype), G.SliderPanel.prototype.applyConfig = function(config) {
        this.horizontal = config.horizontal || !1, this.horizontalLerp = config.horizontalLerp || !1, this.vertical = config.vertical || !0, this.verticalLerp = config.verticalLerp
    }, G.SliderPanel.prototype.addContent = function(group) {
        this.changeInputSettings(group), this.contentGroup = group, this.add(group), this.contentGroup.x = 0, this.contentGroupMinY = -this.contentGroup.height + this.sliderHeight, this.contentGroupMaxY = 0, this.contentGroupMinX = this.sliderWidth - this.contentGroup.width, this.contentGroupMaxX = 0
    }, G.SliderPanel.prototype.changeInputSettings = function(group) {
        for (var i = group.children.length; i--;) {
            var child = group.children[i];
            child.inputEnabled && (this.clickableObjects.push(child), child.inputEnabled = !1), child.children.length > 0 && this.changeInputSettings(child)
        }
    }, G.SliderPanel.prototype.update = function() {
        if (this.frameCounter++, this.inputSpriteDown && game.input.activePointer.isDown) {
            var difX = this.inputData.x - game.input.activePointer.worldX,
                difY = this.inputData.y - game.input.activePointer.worldY;
            this.inputData.x = game.input.activePointer.worldX, this.inputData.y = game.input.activePointer.worldY, this.inputData.velX = .8 * difX + .2 * this.inputData.velX, this.inputData.velY = .8 * difY + .2 * this.inputData.velY, this.horizontal && (this.contentGroup.x -= this.inputData.velX), this.vertical && (this.contentGroup.y -= this.inputData.velY)
        } else this.horizontal && (this.contentGroup.x -= this.inputData.velX, this.inputData.velX *= .95, Math.abs(this.inputData.velX) < 1 && (this.inputData.velX = 0)), this.vertical && (this.contentGroup.y -= this.inputData.velY, this.inputData.velY *= .95, Math.abs(this.inputData.velY) < 1 && (this.inputData.velY = 0));
        this.vertical && this.boundRestrict("y", this.verticalLerp, this.contentGroupMinY, this.contentGroupMaxY), this.horizontal && this.boundRestrict("x", this.horizontalLerp, this.contentGroupMinX, this.contentGroupMaxX), this.boundRestrict()
    }, G.SliderPanel.prototype.propagateClick = function(pX, pY) {
        for (var i = 0; i < this.clickableObjects.length; i++)
            if (this.clickableObjects[i].visible && this.clickableObjects[i].getBounds().contains(pX, pY)) {
                this.clickableObjects[i].onInputDown.dispatch();
                break
            }
    }, G.SliderPanel.prototype.boundRestrict = function(prop, lerp, min, max) {
        lerp ? (this.contentGroup[prop] > max && (this.contentGroup[prop] = G.lerp(this.contentGroup[prop], max, .5), this.contentGroup[prop] < max + 1 && (this.contentGroup[prop] = max)), this.contentGroup[prop] < min && (this.contentGroup[prop] = G.lerp(this.contentGroup[prop], min, .2), this.contentGroup[prop] > min - 1 && (this.contentGroup[prop] = min))) : this.contentGroup[prop] = game.math.clamp(this.contentGroup[prop], min, max)
    }, G.StrObjGroup = function(x, y, importObj) {
        Phaser.Group.call(this, game), this.x = x || 0, this.y = y || 0, this.importObj = "string" == typeof importObj ? JSON.parse(importObj) : importObj, this.parseImportObj(this.importObj)
    }, G.StrObjGroup.prototype = Object.create(Phaser.Group.prototype), G.StrObjGroup.prototype.parseImportObj = function(importObj) {
        for (var i = 0; i < importObj.length; i++) {
            var chunk = importObj[i],
                img = G.makeImage(chunk.x, chunk.y, chunk.frame, chunk.anchor, this);
            img.scale.setTo(chunk.scale[0], chunk.scale[1]), img.angle = chunk.angle
        }
    }, G.Text = function(x, y, txt, style, anchor, maxWidth, maxHeight, textWrap, align) {
        "object" != typeof style && (style = JSON.parse(JSON.stringify(G.Text.styles[style]))), this.userMaxWidth = maxWidth || 1 / 0, this.userMaxHeight = maxHeight || 1 / 0, textWrap && (style.wordWrap = !0, style.wordWrapWidth = maxWidth, style.align = align || "left"), Phaser.Text.call(this, game, x, y, txt, style), style.lineSpacing && (this.lineSpacing = style.lineSpacing), anchor && ("number" == typeof anchor ? this.anchor.setTo(anchor) : this.anchor.setTo(anchor[0], anchor[1])), this.width = Math.min(this.width, this.userMaxWidth), this.height = Math.min(this.height, this.userMaxHeight)
    }, G.Text.prototype = Object.create(Phaser.Text.prototype), G.Text.styles = {}, G.Text.addStyle = function(name, obj) {
        G.Text.styles[name] = obj
    }, G.Text.prototype.setText = function(txt) {
        Phaser.Text.prototype.setText.call(this, txt), this.scale.setTo(1), this.width = Math.min(this.width, this.userMaxWidth), this.height = Math.min(this.height, this.userMaxHeight)
    }, G.TextCounter = function(x, y, amount, style, anchor, maxWidth, config) {
        this.amount = amount, this.amountDisplayed = amount, G.Text.call(this, x, y, null === amount ? "..." : amount.toString(), style, anchor, maxWidth), config = config || {
            lerpValue: .5
        }, this.lerp = !0, this.lerpValue = config.lerpValue, this.stepCurrent = 0, this.step = 0
    }, G.TextCounter.prototype = Object.create(G.Text.prototype), G.TextCounter.prototype.setAmount = function(amount, immediately) {
        this.amount = amount, immediately && (this.amountDisplayed = amount, this.setText(this.amountDisplayed.toString()))
    }, G.TextCounter.prototype.changeAmount = function(change, immediately) {
        this.amount += change, immediately && (this.amountDisplayed = this.amount, this.setText(this.amountDisplayed.toString()))
    }, G.TextCounter.prototype.update = function() {
        this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.lerp && this.lerpUpdate())
    }, G.TextCounter.prototype.lerpUpdate = function() {
        this.amountDisplayed = G.lerp(this.amountDisplayed, this.amount, this.lerpValue, .2), this.setText(Math.round(this.amountDisplayed).toString())
    }, G.TextRTCacher = function() {}, G.TextRTCacher.prototype.cacheText = function(font, txt, fontSize, cacheLabel, tint) {
        this.txt || (this.txt = game.make.bitmapText(0, 0, font, "", 80)), this.txt.fontSize = fontSize, this.txt.setText(txt), this.txt.updateCache();
        var rt = game.make.renderTexture(this.txt.width, this.txt.height, cacheLabel, !0);
        rt.render(this.txt)
    }, G.TextRTCacher.prototype.cachePhaserText = function(text, cacheLabel, style) {
        var txt = game.make.text(0, 0, text, style),
            rt = game.make.renderTexture(txt.width, txt.height, cacheLabel, !0);
        rt.render(txt), txt.destroy()
    }, G.Timer = function(x, y, font, fontSize, maxWidth, anchorX, anchorY) {
        G.OneLineText.call(this, x, y, font, "???", fontSize, maxWidth, anchorX, anchorY), this.secLeft = 0, this.active = !1, this.timerBinding = G.sb("onWallClockTimeUpdate").add(this.updateTimer, this), this.events.onDestroy.add(function() {
            this.timerBinding.detach()
        }, this)
    }, G.Timer.prototype = Object.create(G.OneLineText.prototype), G.Timer.prototype.updateTimer = function() {
        this.active && (G.sfx.clock_tick.play(), this.secLeft = Math.max(0, this.secLeft - 1), this.setText(G.changeSecToTimerFormat(this.secLeft)))
    }, G.Timer.prototype.setSecLeft = function(secLeft) {
        this.secLeft = secLeft, this.setText(G.changeSecToTimerFormat(this.secLeft))
    }, G.Timer.prototype.start = function(secLeft) {
        this.active = !0
    }, G.TimerT = function(x, y, date, style, anchor, maxWidth, timerFormat, sfx) {
        G.Text.call(this, x, y, "???", style, anchor, maxWidth), this.secLeft = 0, this.active = !1, this.timerFormat = timerFormat, this.dots = !0, this.sfx = sfx ? G.sfx[sfs] : null, this.timerBinding = G.sb("onWallClockTimeUpdate").add(this.updateTimer, this), this.events.onDestroy.add(function() {
            this.timerBinding.detach()
        }, this), date && this.setDate(date)
    }, G.TimerT.prototype = Object.create(G.Text.prototype), G.TimerT.prototype.updateTimer = function() {
        this.active && (this.sfx && this.sfx.play(), this.secLeft = Math.max(0, this.secLeft - 1), this.updateTimerText(this.secLeft, this.dots), this.dots = !this.dots)
    }, G.TimerT.prototype.setSecLeft = function(secLeft) {
        this.secLeft = Math.max(0, secLeft), this.updateTimerText(this.secLeft, !0)
    }, G.TimerT.prototype.updateTimerText = function(secLeft, dots) {
        var dataArray = G.changeSecToDHMS(this.secLeft),
            txt = [];
        this.timerFormat.indexOf("d") > -1 && txt.push(dataArray[0]), this.timerFormat.indexOf("h") > -1 && txt.push(dataArray[1]), this.timerFormat.indexOf("m") > -1 && txt.push(dataArray[2]), this.timerFormat.indexOf("s") > -1 && txt.push(dataArray[3]), this.setText(txt.join(dots ? ":" : " "))
    }, G.TimerT.prototype.start = function(secLeft) {
        this.active = !0
    }, G.TimerT.prototype.setDate = function(dateString) {
        var ms = new Date(dateString).getTime(),
            now = Date.now(),
            diffSec = Math.ceil((ms - now) / 1e3);
        this.setSecLeft(diffSec), this.active = !0
    }, G.UITargetParticles = function() {
        G.PoolGroup.call(this, G.UITargetParticle), this.fixedToCamera = !0
    }, G.UITargetParticles.prototype = Object.create(G.PoolGroup.prototype), G.UITargetParticles.prototype.initPart = function(x, y, sprite, targetObj, carriedValue, start) {
        var part = this.init(x, y, sprite, targetObj, carriedValue);
        return part
    }, G.UITargetParticles.prototype.createDividedBatch = function(x, y, sprite, targetObj, amount, interval) {
        var batchObj = new G.UITargetParticles.BatchObj,
            maxPartNr = maxPartNr || 25,
            partNr = amount / interval;
        partNr > maxPartNr && (interval = Math.ceil(amount / maxPartNr));
        for (var nrOfPartsInBatch = Math.floor(amount / interval) + Math.sign(amount % interval), i = 0; nrOfPartsInBatch > i; i++) {
            var part = this.init(x, y, sprite, targetObj, Math.min(interval, amount));
            amount -= interval, batchObj.add(part)
        }
        return batchObj
    }, G.UITargetParticles.prototype.createBatch = function(x, y, sprite, targetObj, carriedValue, nrOfParts) {
        for (var batchObj = new G.UITargetParticles.BatchObj, array = Array.isArray(x), i = 0; nrOfParts > i; i++) {
            if (array) var part = this.init(x[i].x, x[i].y, sprite, targetObj, carriedValue);
            else var part = this.init(x, y, sprite, targetObj, carriedValue);
            batchObj.add(part)
        }
        return batchObj
    }, G.UITargetParticles.BatchObj = function() {
        this.parts = [], this.nrOfParts = 0, this.nrOfFinished = 0, this.onFinish = new Phaser.Signal
    }, G.UITargetParticles.BatchObj.prototype.add = function(part) {
        this.parts.push(part), part.onFinish.addOnce(this.onPartFinish, this), this.nrOfParts++
    }, G.UITargetParticles.BatchObj.prototype.onPartFinish = function() {
        this.nrOfFinished++, this.nrOfFinished == this.nrOfParts && this.onFinish.dispatch()
    }, G.UITargetParticles.BatchObj.prototype.addOnPartStart = function(func, context) {
        this.parts.forEach(function(part) {
            part.onStart.addOnce(func, context || part, 1)
        })
    }, G.UITargetParticles.BatchObj.prototype.addOnPartFinish = function(func, context) {
        this.parts.forEach(function(part) {
            part.onFinish.addOnce(func, context || part, 1)
        })
    }, G.UITargetParticles.BatchObj.prototype.start = function(delayBetween) {
        var delay = 0;
        this.parts.forEach(function(part) {
            part.start(delay), delay += delayBetween || 0
        })
    }, G.UITargetParticle = function() {
        G.Image.call(this, 0, 0, null, .5), this.onStart = new Phaser.Signal, this.onFinish = new Phaser.Signal, this.speed = 0, this.speedMax = 30, this.speedDelta = .75, this.vel = new Phaser.Point(0, 0), this.velInit = new Phaser.Point(0, 0), this.kill()
    }, G.UITargetParticle.prototype = Object.create(G.Image.prototype), G.UITargetParticle.prototype.init = function(x, y, sprite, targetObj, carriedValue) {
        this.position.setTo(x, y), this.changeTexture(sprite), this.onStart.removeAll(), this.onFinish.removeAll(), this.carriedValue = carriedValue || 1, this.targetObj = targetObj, this.stopTweens(this), this.scale.setTo(1), this.alpha = 1, this.speed = 0, this.vel.setTo(0, 0)
    }, G.UITargetParticle.prototype.start = function(delay) {
        return delay ? void game.time.events.add(delay, this.start, this) : (this.revive(), void this.onStart.dispatch(this, this.carriedValue))
    }, G.UITargetParticle.prototype.update = function() {
        if (this.alive) {
            this.position.add(this.vel.x, this.vel.y), this.vel.x *= .95, this.vel.y *= .95, this.speed += this.speedDelta, this.speed = Math.min(this.speed, this.speedMax);
            var distanceToTarget = Phaser.Point.distance(this.worldPosition, this.targetObj.worldPosition),
                angleToTarget = Phaser.Point.angle(this.targetObj.worldPosition, this.worldPosition);
            this.position.add(G.lengthDirX(angleToTarget, Math.min(distanceToTarget, this.speed), !0), G.lengthDirY(angleToTarget, Math.min(distanceToTarget, this.speed), !0)), distanceToTarget < 1.2 * this.speedMax && (this.onFinish.dispatch(this, this.carriedValue), this.kill())
        }
    }, "undefined" == typeof G && (G = {}), Math.sign = Math.sign || function(x) {
        return x = +x, 0 === x || isNaN(x) ? x : x > 0 ? 1 : -1
    }, G.isImageInCache = function(frameName) {
        var spritesheet = this.checkSheet(frameName);
        return "" != spritesheet ? !0 : game.cache.checkImageKey(frameName)
    }, G.checkSheet = function(frame) {
        return G.spritesheetMap ? G.spritesheetMap[frame] || "" : this.checkSheetOld()
    }, G.checkSheetOld = function() {
        for (var i = 0, len = G.ASSETS.spritesheets.length; len > i; i++) {
            G.ASSETS.spritesheets[i];
            if (game.cache.checkImageKey(G.ASSETS.spritesheets[i]) && game.cache.getFrameData(G.ASSETS.spritesheets[i]).getFrameByName(frame)) return G.ASSETS.spritesheets[i]
        }
        return ""
    }, G.lerp = function(valCurrent, valTarget, lerp, snapRange) {
        return snapRange && Math.abs(valCurrent - valTarget) <= snapRange ? valTarget : valCurrent + lerp * (valTarget - valCurrent)
    }, G.l = function(value) {
        return Math.floor(value * G.Loader.currentConfigMulti)
    }, G.rl = function(value) {
        return Math.floor(value * (1 / G.Loader.currentConfigMulti))
    }, G.lnf = function(value) {
        return value * G.Loader.currentConfigMulti
    }, G.rnd = function(min, max) {
        return game.rnd.realInRange(min || 0, max || 1)
    }, G.rndInt = function(min, max) {
        return game.rnd.between(min, max)
    }, G.changeTexture = function(obj, image) {
        if ("string" != typeof image) return obj.loadTexture(image);
        var ssheet = this.checkSheet(image);
        "" == ssheet ? obj.loadTexture(image) : obj.loadTexture(ssheet, image)
    }, G.txt = function(text) {
        return G.lang || (G.lang = "en"), G.json.languages[G.lang] || (G.lang = "en"), G.json.languages[G.lang][text] || text + "***"
    }, G.deltaTime = 1, G.delta = function() {
        G.deltaTime = Math.min(1.5, game.time.elapsedMS / 16), 17 == game.time.elapsedMS && (G.deltaTime = 1)
    }, G.rotatePositions = function(positions) {
        for (var result = [], i = 0, len = positions.length; len > i; i += 2) result.push(-1 * positions[i + 1], positions[i]);
        return result
    }, G.loadTexture = G.changeTexture, G.makeImage = function(x, y, frame, anchor, groupToAdd) {
        var image, ssheet = this.checkSheet(frame);
        return image = "" == ssheet ? game.make.image(this.l(x), this.l(y), frame) : game.make.image(this.l(x), this.l(y), ssheet, frame), anchor && ("number" == typeof anchor ? image.anchor.setTo(anchor) : image.anchor.setTo(anchor[0], anchor[1])), groupToAdd ? (groupToAdd.add || groupToAdd.addChild).call(groupToAdd, image) : null !== groupToAdd && game.world.add(image), image
    }, G.capitalize = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }, G.lengthDirX = function(angle, length, rads) {
        var rads = rads || !1;
        return rads ? Math.cos(angle) * length : Math.cos(game.math.degToRad(angle)) * length
    }, G.lengthDirY = function(angle, length, rads) {
        var rads = rads || !1;
        return rads ? Math.sin(angle) * length : Math.sin(game.math.degToRad(angle)) * length
    }, G.stopTweens = function(obj) {
        game.tweens._add.forEach(function(tween) {
            obj.scale && tween.target == obj.scale && tween.stop(), tween.target == obj && tween.stop()
        }), game.tweens._tweens.forEach(function(tween) {
            obj.scale && tween.target == obj.scale && tween.stop(), tween.target == obj && tween.stop()
        })
    }, G.makeExtImage = function(x, y, url, waitImg, anchor, groupToAdd, tmp, func) {
        G.extLoader || (G.extLoader = new G.ExtLoader(game));
        var img;
        if (G.extLoader.loadedUrls[url]) return img = G.makeImage(x, y, G.extLoader.loadedUrls[url], anchor, groupToAdd), func.call(img), img;
        img = G.makeImage(x, y, waitImg, anchor, groupToAdd), img.onImgLoaded = new Phaser.Signal, G.extImagesKeys || (G.extImagesKeys = []);
        var name = "extImgBlankName" + G.extImagesKeys.length;
        G.extImagesKeys.push(name);
        var binding = G.extLoader.onFileComplete.add(function(progress, key, success) {
            key == name && success && (G.extLoader.loadedUrls[url] = name, null !== img.game && (G.changeTexture(img, name), func && func.call(img)), binding.detach())
        });
        return G.extLoader.image(name, url, !0), img
    }, G.drawCircleSegment = function(gfx, x, y, radius, angleStart, angleFinish, segments) {
        if (angleStart === angleFinish) return gfx;
        void 0 === segments && (segments = 10);
        var angleDiff = angleFinish - angleStart,
            segDiff = angleDiff / segments;
        gfx.moveTo(x, y);
        for (var points = gfx.currentPath.shape.points; angleFinish >= angleStart; angleStart += segDiff) points.push(Math.floor(x + G.lengthDirX(angleStart, radius, !1)), Math.floor(y + G.lengthDirY(angleStart, radius, !1)));
        return points.push(Math.floor(x + G.lengthDirX(angleFinish, radius, !1)), Math.floor(y + G.lengthDirY(angleFinish, radius, !1))), gfx.dirty = !0, gfx._boundsDirty = !0, gfx
    }, G.centerElements = function(list, distanceList, center) {
        void 0 === center && (center = 0), void 0 === distanceList && (distanceList = []);
        var wholeWidth = 0,
            isDistArray = Array.isArray(distanceList);
        list.forEach(function(e, i) {
            wholeWidth += e.width, (isDistArray ? distanceList[i - 1] : void 0 !== distanceList) && (wholeWidth += G.l(isDistArray ? distanceList[i - 1] : distanceList))
        });
        var currentX = center + wholeWidth * -.5;
        list.forEach(function(e, i, a) {
            e.x = currentX, e.x += e.width * e.anchor.x, currentX += e.width, (isDistArray ? distanceList[i - 1] : void 0 !== distanceList) && (currentX += G.l(isDistArray ? distanceList[i] : distanceList))
        })
    }, G.centerElements2 = function(list, distance, center) {
        void 0 === center && (center = 0), void 0 === distance && (distance = 0);
        var wholeWidth = 0;
        list.forEach(function(e, i) {
            wholeWidth += e.width
        }), wholeWidth += distance * (list.length - 1), list.forEach(function(e, i, l) {
            0 == i ? e.left = center + wholeWidth * -.5 : e.left = l[i - 1].right + distance;
        })
    }, G.makeMover = function(obj) {
        void 0 !== G.activeMover && (G.activeMover.destroy(), G.activeMover.eKey.onDown.removeAll()), G.activeMover = game.add.image(), G.activeMover.obj = obj, G.activeMover.cursors = game.input.keyboard.createCursorKeys(), G.activeMover.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT), G.activeMover.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E), G.activeMover.eKey.onDown.add(function() {}, G.activeMover), G.activeMover.update = function() {
            var moveVal = this.shiftKey.isDown ? 10 : 2;
            this.cursors.down.isDown && (obj.y += moveVal), this.cursors.up.isDown && (obj.y -= moveVal), this.cursors.left.isDown && (obj.x -= moveVal), this.cursors.right.isDown && (obj.x += moveVal)
        }
    }, G.makeLineEditor = function(interpolation) {
        var be = game.add.group();
        return be.interpolation = interpolation || "linear", be.pointsX = [0], be.pointsY = [0], be.gfx = be.add(game.make.graphics()), be.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT), be.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W), be.wKey.onDown.add(function() {
            var xx, yy;
            this.children.length > 2 ? (xx = this.children[this.children.length - 1].x, yy = this.children[this.children.length - 1].y) : (xx = 0, yy = 0);
            var newPoint = G.makeImage(xx, yy, "candy_1");
            newPoint.anchor.setTo(.5), newPoint.scale.setTo(.1), this.add(newPoint), this.activeObject = newPoint, this.changed = !0
        }, be), be.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q), be.qKey.onDown.add(function() {
            this.children.length <= 2 || (this.removeChildAt(this.children.length - 1), this.children.length > 3 ? this.activeObject = this.children[this.children.length - 1] : this.activeObject = null, this.changed = !0)
        }, be), be.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A), be.aKey.onDown.add(function() {
            if (this.activeObject) {
                var index = this.getChildIndex(this.activeObject);
                2 != index && (this.activeObject = this.getChildAt(index - 1))
            }
        }, be), be.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S), be.sKey.onDown.add(function() {
            if (this.activeObject) {
                var index = this.getChildIndex(this.activeObject);
                index != this.children.length - 1 && (this.activeObject = this.getChildAt(index + 1))
            }
        }, be), be.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E), be.eKey.onDown.add(function() {
            console.log(JSON.stringify([this.pointsX, this.pointsY]))
        }, be), be.cursors = game.input.keyboard.createCursorKeys(), be.activeObject = null, be.preview = G.makeImage(0, 0, "candy_2", .5, be), be.preview.width = 8, be.preview.height = 8, be.preview.progress = 0, be.update = function() {
            if (null !== this.activeObject && (this.forEach(function(e) {
                    e == this.activeObject ? e.alpha = 1 : e.alpha = .5
                }, this), 0 != this.children.length)) {
                var moveVal = this.shiftKey.isDown ? 3 : 1;
                if (this.cursors.down.isDown && (this.activeObject.y += moveVal, this.changed = !0), this.cursors.up.isDown && (this.activeObject.y -= moveVal, this.changed = !0), this.cursors.left.isDown && (this.activeObject.x -= moveVal, this.changed = !0), this.cursors.right.isDown && (this.activeObject.x += moveVal, this.changed = !0), be.preview.progress += .01, be.preview.progress > 1 && (be.preview.progress = 0), be.preview.x = game.math[this.interpolation + "Interpolation"](this.pointsX, be.preview.progress), be.preview.y = game.math[this.interpolation + "Interpolation"](this.pointsY, be.preview.progress), this.changed) {
                    var pointsX = [],
                        pointsY = [];
                    this.pointsX = pointsX, this.pointsY = pointsY, this.children.forEach(function(e, index) {
                        1 >= index || (pointsX.push(e.x), pointsY.push(e.y))
                    }), this.gfx.clear(), this.gfx.beginFill(16711680, 1);
                    for (var i = 0; 200 > i; i++) this.gfx.drawRect(game.math[this.interpolation + "Interpolation"](pointsX, i / 200), game.math[this.interpolation + "Interpolation"](pointsY, i / 200), 3, 3)
                }
            }
        }, be
    }, G.lineUtils = {
        getWholeDistance: function(pointsX, pointsY) {
            for (var wholeDistance = 0, i = 1; i < pointsX.length; i++) wholeDistance += game.math.distance(pointsX[i - 1], pointsY[i - 1], pointsX[i], pointsY[i]);
            return wholeDistance
        },
        findPointAtDitance: function(pointsX, pointsY, dist) {
            for (var soFar = 0, i = 1; i < pointsX.length; i++) {
                var currentDistance = game.math.distance(pointsX[i - 1], pointsY[i - 1], pointsX[i], pointsY[i]);
                if (currentDistance + soFar > dist) {
                    var angle = game.math.angleBetween(pointsX[i - 1], pointsY[i - 1], pointsX[i], pointsY[i]);
                    return [pointsX[i - 1] + G.lengthDirX(angle, dist - soFar, !0), pointsY[i - 1] + G.lengthDirY(angle, dist - soFar, !0)]
                }
                soFar += currentDistance
            }
            return [pointsX[pointsX.length - 1], pointsY[pointsY.length - 1]]
        },
        spreadAcrossLine: function(pointsX, pointsY, elementsList, propName1, propName2) {
            for (var wholeDistance = this.getWholeDistance(pointsX, pointsY), every = wholeDistance / (elementsList.length - 1), i = 0; i < elementsList.length; i++) {
                var point = this.findPointAtDitance(pointsX, pointsY, every * i);
                elementsList[i][propName1 || "x"] = point[0], elementsList[i][propName2 || "y"] = point[1]
            }
        },
        spreadOnNodes: function(pointsX, pointsY, elementsList, propName1, propName2) {
            for (var i = 0; i < pointsX.length; i++) {
                if ("undefined" == typeof elementsList[i]) return;
                elementsList[i][propName1 || "x"] = pointsX[i], elementsList[i][propName2 || "y"] = pointsY[i]
            }
        }
    }, G.changeSecToTimerFormat = function(sec, forceFormat) {
        var sec_num = parseInt(sec, 10),
            fD = forceFormat ? -1 !== forceFormat.toUpperCase().indexOf("D") : !1,
            fH = forceFormat ? -1 !== forceFormat.toUpperCase().indexOf("H") : !1,
            days = Math.floor(sec_num / 86400),
            hours = Math.floor((sec_num - 86400 * days) / 3600),
            minutes = Math.floor((sec_num - 86400 * days - 3600 * hours) / 60),
            seconds = sec_num - 86400 * days - 3600 * hours - 60 * minutes,
            result = G.zeroPad(minutes) + ":" + G.zeroPad(seconds);
        return (hours > 0 || days > 0 || fH) && (result = G.zeroPad(hours) + ":" + result), (days > 0 || fD) && (result = G.zeroPad(days) + ":" + result), result
    }, G.changeSecToDHMS = function(sec, forceFormat) {
        var sec_num = parseInt(sec, 10),
            days = (forceFormat ? -1 !== forceFormat.toUpperCase().indexOf("D") : !1, forceFormat ? -1 !== forceFormat.toUpperCase().indexOf("H") : !1, Math.floor(sec_num / 86400)),
            hours = Math.floor((sec_num - 86400 * days) / 3600),
            minutes = Math.floor((sec_num - 86400 * days - 3600 * hours) / 60),
            seconds = sec_num - 86400 * days - 3600 * hours - 60 * minutes;
        return [G.zeroPad(days), G.zeroPad(hours), G.zeroPad(minutes), G.zeroPad(seconds)]
    }, G.zeroPad = function(number) {
        return 10 > number ? "0" + number : number
    }, G.arrayJoin = function(array, marker) {
        return array.reduce(function(accumulator, currentVal) {
            return currentVal ? accumulator ? accumulator + marker + currentVal : currentVal : accumulator
        }, "")
    }, G.makeTextButton = function(x, y, text, style, func, context) {
        var txt = game.make.text(x, y, text, style);
        return txt.inputEnabled = !0, txt.input.useHandCursor = !0, txt.hitArea = new Phaser.Rectangle(0, 0, txt.width, txt.height), txt.events.onInputDown.add(func, context || null), txt
    }, G.setObjProp = function(obj, prop, val) {
        var currentObj = obj;
        "string" == typeof prop && prop.split(".");
        try {
            for (var i = 0; i < this.refreshProp.length - 1; i++) currentObj = currentObj[this.refreshProp[i]];
            currentObj[this.refreshProp[this.refreshProp.length - 1]] = val
        } catch (e) {
            console.warn("cant set prop")
        }
    }, G.getObjProp = function(obj, prop) {
        var current = obj;
        "string" == typeof prop && (prop = prop.split("."));
        try {
            for (var i = 0; i < prop.length; i++) current = current[prop[i]]
        } catch (e) {
            return
        }
        return current
    }, "undefined" == typeof G && (G = {}), G.Utils = {
        cacheText: function(cacheLabel, txt, font, fontSize, tint) {
            var txt = game.make.bitmapText(0, 0, font, txt, fontSize);
            txt.updateCache();
            var rt = game.make.renderTexture(txt.width, txt.height, cacheLabel, !0);
            rt.render(txt), txt.destroy()
        },
        cacheGText: function(cacheLabel, txt, style) {
            var txt = new G.Text(0, 0, txt, style, 0),
                rt = game.make.renderTexture(txt.width, txt.height, cacheLabel, !0);
            rt.render(txt), txt.destroy()
        },
        lerp: function(valCurrent, valTarget, lerp, snapRange) {
            return snapRange && Math.abs(valCurrent - valTarget) <= snapRange ? valTarget : valCurrent + lerp * (valTarget - valCurrent)
        },
        copyToClipboard: function(text) {
            this.copyArea || (this.copyArea = document.createElement("textarea"), this.copyArea.style.positon = "fixed", this.copyArea.style.opacity = 0, document.body.appendChild(this.copyArea)), this.copyArea.value = text, this.copyArea.select(), document.execCommand("copy")
        },
        getObjProp: function(obj, prop) {
            var current = obj;
            "string" == typeof prop && (prop = prop.split("."));
            try {
                for (var i = 0; i < prop.length; i++) current = current[prop[i]]
            } catch (e) {
                return
            }
            return current
        },
        setObjProp: function(obj, prop, val) {
            var currentObj = obj;
            "string" == typeof prop && (prop = prop.split("."));
            try {
                for (var i = 0; i < prop.length - 1; i++) currentObj = currentObj[prop[i]];
                currentObj[prop[prop.length - 1]] = val
            } catch (e) {
                return null
            }
        },
        replaceAll: function(string, search, replacement) {
            return string.split(search).join(replacement)
        },
        removeDuplicates: function(array) {
            var result = [];
            return array.forEach(function(elem) {
                -1 === result.indexOf(elem) && result.push(elem)
            }), result
        },
        getParentsScaleX: function(obj, rec) {
            return obj == game.stage ? 1 : G.Utils.getParentsScaleX(obj.parent, !0) * (rec ? obj.scale.x : 1)
        },
        getParentsScaleY: function(obj, rec) {
            return obj == game.stage ? 1 : G.Utils.getParentsScaleY(obj.parent, !0) * (rec ? obj.scale.y : 1)
        },
        makeTextButton: function(x, y, label, func, context, style) {
            var txt = game.add.text(x, y, label, style);
            return txt.inputEnabled = !0, txt.input.useHandCursor = !0, txt.hitArea = new Phaser.Rectangle(0, 0, txt.width, txt.height), txt.events.onInputDown.add(func, context), txt
        },
        injectCSS: function(css) {
            var style = document.createElement("style");
            style.type = "text/css", style.innerHTML = css, document.getElementsByTagName("head")[0].appendChild(style)
        },
        toClientX: function(ingameX) {
            var marginLeft = parseInt(game.canvas.style.marginLeft) || 0;
            return marginLeft + ingameX / game.width * game.canvas.clientWidth
        },
        toClientY: function(ingameY) {
            var marginTop = parseInt(game.canvas.style.marginTop) || 0;
            return marginTop + ingameY / game.height * game.canvas.clientHeight
        },
        clientXToWorldX: function(clientX) {
            var marginLeft = parseInt(game.canvas.style.marginLeft) || 0;
            clientX -= marginLeft;
            var canvasStyleWidth = parseInt(game.canvas.style.width),
                canvasContextWidth = (parseInt(game.canvas.style.height), parseInt(game.canvas.width)),
                ratio = (parseInt(game.canvas.height), canvasContextWidth / canvasStyleWidth);
            return clientX * ratio
        },
        clientYToWorldY: function(clientY) {
            var marginTop = parseInt(game.canvas.style.marginTop) || 0;
            clientY -= marginTop;
            var canvasStyleHeight = (parseInt(game.canvas.style.width), parseInt(game.canvas.style.height)),
                canvasContextHeight = (parseInt(game.canvas.width), parseInt(game.canvas.height)),
                ratio = canvasContextHeight / canvasStyleHeight;
            return clientY * ratio
        },
        getImageURI: function(img) {
            return this._bmpMarker || (this._bmpMarker = G.makeImage(0, 0, null, 0, null)), this._bmp || (this._bmp = game.make.bitmapData()), this._bmp.clear(), G.changeTexture(this._bmpMarker, img), this._bmp.resize(this._bmpMarker.width, this._bmpMarker.height), this._bmp.draw(this._bmpMarker), this._bmp.canvas.toDataURL()
        },
        getRT: function(rtName) {
            return game.cache.getRenderTexture(rtName).texture
        },
        arraysEqual: function(a, b) {
            if (a === b) return !0;
            if (null == a || null == b) return !1;
            if (a.length != b.length) return !1;
            for (var i = 0; i < a.length; ++i)
                if (a[i] !== b[i]) return !1;
            return !0
        }
    }, G.lineCircleColl = function(LINE, C, point) {
        var A = LINE.start,
            B = LINE.end,
            LAB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2)),
            Dx = (B.x - A.x) / LAB,
            Dy = (B.y - A.y) / LAB,
            t = Dx * (C.x - A.x) + Dy * (C.y - A.y),
            Ex = t * Dx + A.x,
            Ey = t * Dy + A.y,
            LEC = Math.sqrt(Math.pow(Ex - C.x, 2) + Math.pow(Ey - C.y, 2));
        if (LEC < C.radius) {
            var dt = Math.sqrt(C.radius * C.radius - LEC * LEC),
                Fx = (t - dt) * Dx + A.x,
                Fy = (t - dt) * Dy + A.y,
                Gx = (t + dt) * Dx + A.x,
                Gy = (t + dt) * Dy + A.y,
                FtoLength = game.math.distance(A.x, A.y, Fx, Fy),
                GtoLength = game.math.distance(A.x, A.y, Gx, Gy);
            return GtoLength > FtoLength ? LINE.length > FtoLength ? (point.setTo(Fx, Fy), point) : !1 : LINE.length > GtoLength ? (point.setTo(Gx, Gy), point) : !1
        }
        return !1
    }, G.getRT = function(rtName) {
        var rt = game.cache.getRenderTexture(rtName);
        return rt ? rt.texture : null
    }, G.numberDot = function(price) {
        price = price.toString();
        for (var result = "", n = 0, i = price.length - 1; i >= 0; i--) result = price[i] + result, n++, 3 == n && 0 !== i && (result = "." + result, n = 0);
        return result
    }, G.guid = function() {
        function s4() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()
    }, G.AnimationElement = function(x, y, data, autoplay) {
        G.Image.call(this, x, y, null), this.ANIMATIONELEMENT = !0, this.SPR = new G.Image(0, 0, null, .5, this), this.frameCounter = 0, this.data = data, this.currentAnimationData = null, this.currentAnimationName = null, this.playing = void 0 === autoplay ? !0 : autoplay
    }, G.AnimationElement.prototype = Object.create(G.Image.prototype), G.AnimationElement.prototype.update = function() {
        this.currentAnimationName && this.playing && (this.frameCounter++, this.updateAnimation(this.frameCounter))
    }, G.AnimationElement.prototype.pause = function() {
        this.playing = !1
    }, G.AnimationElement.prototype.resume = function() {
        this.playing = !0
    }, G.AnimationElement.prototype.play = function() {
        this.playing = !0
    }, G.AnimationElement.prototype.stop = function() {
        this.playing = !1, this.updateAnimation(0)
    };
    var testObj = {
        normal: {
            eventTL: [],
            frameTL: [{
                f: 0,
                v: "candy_1"
            }],
            propTLS: {
                alpha: [{
                    f: 0,
                    v: 1
                }],
                x: [{
                    f: 0,
                    v: 0
                }],
                y: [{
                    f: 0,
                    v: 0
                }],
                angle: [{
                    f: 0,
                    v: 0
                }],
                "scale.x": [{
                    f: 0,
                    v: 1
                }],
                "scale.y": [{
                    f: 0,
                    v: 1
                }],
                "anchor.x": [{
                    f: 0,
                    v: .5
                }],
                "anchor.y": [{
                    f: 0,
                    v: 1
                }]
            }
        },
        jump: {
            eventTL: [],
            frameTL: [{
                f: 0,
                v: null
            }],
            propTLS: {
                alpha: [{
                    f: 0,
                    v: 1
                }],
                x: [{
                    f: 0,
                    v: 0
                }],
                y: [{
                    f: 0,
                    v: 0
                }, {
                    f: 120,
                    v: -300
                }],
                angle: [{
                    f: 0,
                    v: 0,
                    e: ["Linear", "None"]
                }, {
                    f: 400,
                    v: 360
                }],
                "scale.x": [{
                    f: 0,
                    v: 1
                }],
                "scale.y": [{
                    f: 0,
                    v: 1
                }],
                "anchor.x": [{
                    f: 0,
                    v: .5
                }],
                "anchor.y": [{
                    f: 0,
                    v: 1
                }]
            }
        }
    };
    G.AnimationElement.prototype.changeAnimationData = function(animationName) {
        this.data[animationName] || (animationName = Object.keys(this.data)[0]), this.eventTL = this.data[animationName].eventTL, this.frameTL = this.data[animationName].frameTL, this.propTLS = this.data[animationName].propTLS, this.propKeys = Object.keys(this.propTLS), this.currentAnimationData = this.data[animationName], this.currentAnimationName = animationName, this.updateAnimation(0)
    }, G.AnimationElement.prototype.playAnimation = function(animationName) {
        this.changeAnimationData(animationName), this.playing = !0
    }, G.AnimationElement.prototype.getLastKeyFrame = function(tl, frameNr) {
        for (var len = tl.length, i = 0; len > i; i++) {
            if (tl[i].f == frameNr || i == len - 1) return tl[i];
            if (tl[i].f < frameNr && frameNr < tl[i + 1].f) return tl[i]
        }
    }, G.AnimationElement.prototype.getNextKeyFrame = function(tl, frameNr) {
        for (var len = tl.length, i = 0; len > i; i++)
            if (tl[i].f > tl || i == len - 1) return tl[i]
    }, G.AnimationElement.prototype.getKeyFrameAt = function(tl, frameNr) {
        if (!this.currentAnimationName) return null;
        for (var i = 0; i < tl.length; i++) {
            var keyFrame = tl[i];
            if (keyFrame.f === frameNr) return keyFrame
        }
        return null
    }, G.AnimationElement.prototype.isAnyKeyFrameAt = function(frameNr) {
        if (!this.currentAnimationName) return !1;
        if (this.getKeyFrameAt(this.eventTL, frameNr)) return !0;
        if (this.getKeyFrameAt(this.frameTL, frameNr)) return !0;
        for (var i = 0; i < this.propKeys.length; i++) {
            var key = this.propKeys[i];
            if (this.getKeyFrameAt(this.propTLS[key], frameNr)) return !0
        }
        return !1
    }, G.AnimationElement.prototype.getFrameValue = function(tl, frameNr) {
        var lastKey = this.getLastKeyFrame(tl, frameNr),
            nextKey = this.getNextKeyFrame(tl, frameNr);
        if (lastKey.e) {
            var animLength = nextKey.f - lastKey.f,
                valDiff = nextKey.v - lastKey.v,
                easingVal = Phaser.Easing[lastKey.e[0]][lastKey.e[1]]((frameNr - lastKey.f) / animLength);
            return lastKey.v + valDiff * easingVal
        }
        return lastKey.v
    }, G.AnimationElement.prototype.updateAnimation = function(frameNr) {
        if (this.currentAnimationName) {
            this.frameCounter = frameNr, this.updateFromPropTLS(frameNr);
            var frame = this.getTextureFrameValue(this.frameTL, frameNr);
            this.SPR.key != frame && this.SPR.frameName != frame && G.changeTexture(this.SPR, frame)
        }
    }, G.AnimationElement.prototype.updateFromPropTLS = function(frameNr) {
        for (var i = 0; i < this.propKeys.length; i++) {
            var key = this.propKeys[i];
            this.setProp(key, this.getFrameValue(this.propTLS[key], frameNr))
        }
    }, G.AnimationElement.prototype.setProp = function(key, value) {
        "scale.x" == key ? this.SPR.scale.x = value : "scale.y" == key ? this.SPR.scale.y = value : "anchor.x" == key ? this.SPR.anchor.x = value : "anchor.y" == key ? this.SPR.anchor.y = value : this.SPR[key] = value
    }, G.AnimationElement.prototype.getTextureFrameValue = function(tl, frameNr) {
        var lastKey = this.getLastKeyFrame(tl, frameNr),
            frameSkip = lastKey.frameSkip || 1,
            frameDiff = frameNr - lastKey.f;
        if (frameDiff = Math.floor(frameDiff / frameSkip), !lastKey.animation) return lastKey.v;
        var len = lastKey.v.length;
        return lastKey.loop ? lastKey.refraction || lastKey.reverse ? lastKey.refraction && !lastKey.reverse ? lastKey.v[Math.min(len - 1, frameDiff % (len + lastKey.refraction))] : void 0 : lastKey.v[frameDiff % len] : lastKey.v[Math.min(len - 1, frameDiff)]
    }, G.GroupColliderLineLine = function(group1, group2, callback, context) {
        G.Image.call(this, 0, 0, null), this.group1 = group1, this.group2 = group2, this.callback = callback, this.context = context || null, this.collPoint = new Phaser.Point(0, 0)
    }, G.GroupColliderLineLine.prototype = Object.create(G.Image.prototype), G.GroupColliderLineLine.prototype.update = function() {
        for (var len1 = this.group1.length, len2 = this.group2.length, i = 0; len1 > i; i++)
            for (var e1 = this.group1.children[i], j = 0; len2 > j; j++) {
                var e2 = this.group2.children[j];
                e1 !== e2 && e1.collLine.intersects(e2.collLine, !0, this.collPoint) && this.callback.call(this.context, e1, e2, this.collPoint, this.group1, this.group2)
            }
    }, G.GroupColliderLineCircle = function(group1, group2, callback, context) {
        G.Image.call(this, 0, 0, null), this.group1 = group1, this.group2 = group2, this.callback = callback, this.context = context || null, this.collPoint = new Phaser.Point(0, 0)
    }, G.GroupColliderLineCircle.prototype = Object.create(G.Image.prototype), G.GroupColliderLineCircle.prototype.update = function() {
        for (var i = (this.group1.length, this.group2.length, this.group1.length); i--;)
            for (var e1 = this.group1.children[i], j = this.group2.length; j--;) {
                var e2 = this.group2.children[j];
                e1 !== e2 && G.lineCircleColl(e1.collLine, e2.collCircle, this.collPoint) && this.callback.call(this.context, e1, e2, this.collPoint, this.group1, this.group2)
            }
    }, Phaser.Group.prototype.destroy = function(destroyChildren, soft) {
        null === this.game || this.ignoreDestroy || (void 0 === destroyChildren && (destroyChildren = !0), void 0 === soft && (soft = !1), this.onDestroy.dispatch(this, destroyChildren, soft), this.removeAll(destroyChildren), this.cursor = null, this.filters = null, this.alive = !1, this.pendingDestroy = !1, soft || (this.parent && this.parent.removeChild(this), this.game = null, this.exists = !1))
    }, Phaser.exportChildren = function(obj) {
        for (var result = [], i = 0; i < obj.children.length; i++) {
            var child = obj.children[i];
            child.exportToString && result.push(child.exportToString())
        }
        return result
    }, Phaser.Group.prototype.exportToString = function() {
        var exportObj = {
            type: "GROUP",
            x: this.x,
            y: this.y,
            scale: [this.scale.x, this.scale.y],
            angle: this.angle,
            children: Phaser.exportChildren(this)
        };
        return exportObj
    }, Phaser.Image.prototype.exportToString = function() {
        return exportObj = {
            type: "IMG",
            x: this.x,
            y: this.y,
            frame: this.frameName,
            anchor: [this.anchor.x, this.anchor.y],
            scale: [this.scale.x, this.scale.y],
            angle: this.angle,
            children: Phaser.exportChildren(this)
        }, exportObj
    }, "undefined" == typeof G && (G = {}), G.Board = function(lvl, tilesize, editor) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.MAX_NUMBER_OF_REGULAR_CANDY = G.lvlData.nrOfTypes, this.collectCells = lvl.collectCells || !1, this.tilesize = tilesize, this.offsetX = 0, this.offsetY = 0, this.editorMode = editor, this.borderSize = G.l(8), this.tweenObj = {
            a: .6
        }, game.add.tween(this.tweenObj).to({
            a: 1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.levelData = new G.GridArray(lvl.levelData), this.boardData = new G.GridArray(this.levelData.width, this.levelData.height), this.checkMatchList = [], this.checkSpecialMatchList = [], this.checkAfterFall = [], this.fallCheckList = [], this.duringAnimation = 0, this.duringFall = 0, G.sb("onCandyFallStart").add(function() {
            this.duringFall++
        }, this), G.sb("onCandyFallFinish").add(function(candy) {
            this.duringFall--, -1 == this.fallCheckList.indexOf(candy) && this.fallCheckList.push(candy)
        }, this), G.sb("onCandyAnimationStart").add(function() {
            this.duringAnimation++
        }, this), G.sb("onCandyAnimationFinish").add(function() {
            this.duringAnimation--
        }, this), G.sb("onScreenResize").add(this.onResize, this), this.matcher = new G.BoardMatcher(this), this.boardBackground = new G.BoardBackground(this), this.background = game.make.image(0, 0, this.boardBackground.renderTexture), this.background.x = -this.tilesize, this.background.y = -this.tilesize, this.add(this.background), this.tileShade = G.makeImage(0, 0, "tile_shade", .5, this), this.tileShade.visible = !1, this.boardDirt = new G.BoardDirt(this), this.boardDirtS = new G.BoardDirtS(this), this.candySelection = new G.CandySelection(this), this.boardCandies = new G.BoardCandies(this, this.boardData, lvl), this.boardJam = new G.BoardJam(this), this.boardIce = new G.BoardIce(this), this.boardCage = new G.BoardConcrete(this), this.boardCandies.secondFloor.parent.bringToTop(this.boardCandies.secondFloor), this.boardCandies.fxGroup.parent.bringToTop(this.boardCandies.fxGroup), this.boardCandies.boosterFxGroup.parent.bringToTop(this.boardCandies.boosterFxGroup), this.boardCandies.thirdFloor.parent.bringToTop(this.boardCandies.thirdFloor), this.boardCandies.fxTopGroup.parent.bringToTop(this.boardCandies.fxTopGroup), this.layers = [this.boardDirt, this.boardDirtS, this.boardCandies, this.boardJam, this.boardCage, this.boardIce], this.layersNoCandies = [this.boardDirt, this.boardDirtS, this.boardJam, this.boardCage, this.boardIce], this.inputController = new G.InputController(this), this.actionManager = new G.BoardActionManager(this), this.refiller = new G.Refiller(lvl, this), this.fallMgr = new G.BoardFallMgr(this, this.refiller), this.goalCandies = G.json.specialCandies.goalCandies, this["import"](this.levelData), this.boardBackground.redraw(), this.lastRowInCollumn = this.getLastRowInCollumn(), this.onResize(), G.sb("onActionFinish").add(function() {
            if (!(this.actionManager.actionList.length > 1)) {
                for (var removed = !1, i = 0; i < this.boardData.width; i++) {
                    var candy = this.getCandy(i, this.boardData.height - 1);
                    candy && -1 !== this.goalCandies.indexOf(candy.candyType) && (this.boardCandies.removeCandy(i, this.boardData.height - 1), G.sfx.xylophone_positive6.play(), removed = !0)
                }
                removed && this.actionManager.newAction("processFall")
            }
        }, this)
    }, G.Board.prototype = Object.create(Phaser.Group.prototype), G.Board.prototype.getLastRowInCollumn = function() {
        for (var result = [], i = 0; i < this.boardData.width; i++) result.push(this.getLastCellInCollumn(i));
        return result
    }, G.Board.prototype.pushToFallCheckList = function(candy) {
        candy !== !1 && -1 == this.fallCheckList.indexOf(candy) && this.fallCheckList.push(candy)
    }, G.Board.prototype.onResize = function() {
        this.center()
    }, G.Board.prototype.destroyBoard = function() {
        this.boardDirt.destroy(), this.boardCandies.destroy(), this.boardCage.destroy(), this.boardIce.destroy(), this.destroy()
    }, G.Board.prototype.clearBoard = function() {
        this.boardData.loop(function(elem, x, y) {
            this.boardCandies.goalCandies = [], this.boardCandies.rabbitCandy = !1;
            var candy = this.boardCandies.getCandy(x, y);
            candy && this.boardCandies.removeCandy(candy), this.boardIce.destroyCell(x, y), this.boardDirt.destroyCell(x, y)
        }, this)
    }, G.Board.prototype.center = function() {
        var scaleX, scaleY, scale, pxWidth = this.tilesize * this.boardData.width,
            pxHeight = this.tilesize * this.boardData.height;
        G.horizontal ? (scaleX = Math.min(1, 580 / pxWidth), scaleY = Math.min(1, (game.height - 100) / pxHeight), scale = Math.min(scaleX, scaleY), this.scale.setTo(scale), this.x = G.l(80) - .5 * (580 - pxWidth * scale), this.y = .5 * game.height - pxHeight * scale * .5) : (scaleX = Math.min(1, 640 / pxWidth), scaleY = Math.min(1, (game.height - 220 - 150) / pxHeight), scale = Math.min(scaleX, scaleY), this.scale.setTo(scale), this.x = G.l(320) - pxWidth * scale * .5, this.y = G.l(220) + .5 * (game.height - 220 - 150 - pxHeight * scale)), this.x = Math.floor(this.x), this.y = Math.floor(this.y)
    }, G.Board.prototype.update = function() {
        this.actionManager.update()
    }, G.Board.prototype.isIdle = function() {
        return 0 === this.actionManager.actionList.length
    }, G.Board.prototype.checkGoalCandy = function() {
        for (var removed = !1, i = 0; i < this.boardData.width; i++) {
            var candy = this.getCandy(i, this.lastRowInCollumn[i]);
            if (candy && -1 !== this.goalCandies.indexOf(candy.candyType)) {
                var viableToRemove = !0;
                this.collectCells && (this.isCandyOnCollectCell(candy) || (viableToRemove = !1)), viableToRemove && (this.boardCandies.removeCandy(i, this.lastRowInCollumn[i]), G.sfx.xylophone_positive6.play(), removed = !0)
            }
        }
        return removed ? (this.actionManager.newAction("processFall"), !0) : void 0
    }, G.Board.prototype.isCandyOnCollectCell = function(candy) {
        if (this.collectCells) {
            var matchingCP = this.collectCells.find(function(cp) {
                return cp.x === candy.cellX && cp.y === candy.cellY
            });
            if (matchingCP) return !0
        }
        return !1
    }, G.Board.prototype.makeMove = function(candy1, candy2, force) {
        this.actionManager.newAction("move", candy1, candy2, force)
    }, G.Board.prototype.hitCell = function(cellX, cellY) {
        for (var i = this.layers.length; i--;)
            if (!this.layers[i].onHit(cellX, cellY)) return
    }, G.Board.prototype.isMoveable = function(x, y, noCandy) {
        if ("number" != typeof x && (y = x[1], x = x[0]), !this.isCellOnBoard(x, y)) return !1;
        if (this.isMoveBlocked(x, y)) return !1;
        var candy = this.getCandy(x, y);
        return candy ? !0 : !1
    }, G.Board.prototype.isMoveBlocked = function(cellX, cellY) {
        for (var i = this.layers.length; i--;)
            if (this.layers[i].isMoveBlocked(cellX, cellY)) return !0;
        return !1
    }, G.Board.prototype.isBoosterChangeBlocked = function(cellX, cellY) {
        for (var i = this.layers.length; i--;)
            if (this.layers[i].isBoosterChangeBlocked(cellX, cellY)) return !0;
        return !1
    }, G.Board.prototype.isMatchBlocked = function(cellX, cellY) {
        for (var i = this.layers.length; i--;)
            if (this.layers[i].isMatchBlocked(cellX, cellY)) return !0;
        return !1
    }, G.Board.prototype.matchCellExceptCandy = function(cellX, cellY) {
        for (var i = this.layersNoCandies.length; i--;)
            if (!this.layersNoCandies[i].onMatch(cellX, cellY)) return void console.log("** except stopped propataion")
    }, G.Board.prototype.getLastCellInCollumn = function(cellX) {
        for (var i = this.boardData.height - 1; i >= 0; i--)
            if (this.isCellOnBoard(cellX, i)) return i
    }, G.Board.prototype.matchCell = function(cellX, cellY, delay, moveCellX, moveCellY) {
        for (var i = this.layers.length; i--;)
            if (!this.layers[i].onMatch(cellX, cellY, delay, moveCellX, moveCellY)) return void console.log("** stopped propagation")
    }, G.Board.prototype.isCellInBoardArea = function(cellX, cellY) {
        return cellX < this.boardData.width && cellX >= 0 && cellY >= 0 && cellY < this.boardData.height
    }, G.Board.prototype.isCellMatchable = function(x, y, type) {
        if ("number" != typeof x && (y = x[1], x = x[0]), !this.isCellOnBoard(x, y)) return !1;
        if (this.isMatchBlocked(x, y)) return !1;
        var candy = this.getCandy(x, y);
        return candy ? type ? candy.candyType == type : !0 : !1
    }, G.Board.prototype.isCellMatchable = function(x, y, type) {
        if ("number" != typeof x && (y = x[1], x = x[0]), !this.isCellOnBoard(x, y)) return !1;
        if (this.boardIce.isToken(x, y)) return !1;
        if (this.isMatchBlocked(x, y)) return !1;
        var candy = this.getCandy(x, y);
        return candy && candy.matchable ? candy.falling ? !1 : candy.goalCandy ? !1 : candy.chocolate ? !1 : type ? this.getCandy(x, y).candyType == type : !0 : !1
    }, G.Board.prototype.isCellOnBoard = function(x, y) {
        return "boolean" == typeof x ? !1 : ("number" != typeof x && (y = x[1], x = x[0]), 0 > x || x >= this.boardData.width || 0 > y || y >= this.boardData.height ? !1 : "X" != this.boardData.get(x, y))
    }, G.Board.prototype.getCandy = function(cellX, cellY) {
        return "number" != typeof cellX ? this.boardCandies.getCandy(cellX[0], cellX[1]) : this.boardCandies.getCandy(cellX, cellY)
    }, G.Board.prototype.cellToPxOut = function(cell) {
        var tilesize = this.tilesize * this.scale.x;
        return [this.x + this.offsetX + tilesize * cell[0] + .5 * tilesize, this.y + this.offsetY + tilesize * cell[1] + .5 * tilesize]
    }, G.Board.prototype.pxInToCellX = function(px) {
        return Math.floor(px / this.tilesize)
    }, G.Board.prototype.pxInToCellY = function(px) {
        return Math.floor(px / this.tilesize)
    }, G.Board.prototype.cellXToPxIn = function(cellX) {
        return cellX * this.tilesize + .5 * this.tilesize
    }, G.Board.prototype.cellYToPxIn = function(cellY) {
        return cellY * this.tilesize + .5 * this.tilesize
    }, G.Board.prototype.cellToPxIn = function(cell) {
        return [this.cellXToPxIn(cell[0]), this.cellYToPxIn(cell[1])]
    }, G.Board.prototype.swapCandies = function(c1, c2) {
        this.boardCandies.swapCandies(c1, c2)
    }, G.Board.prototype.removeCandy = function() {
        this.boardCandies.removeCandy.apply(this.boardCandies, arguments)
    }, G.Board.prototype.newFallingCandy = function(cellX, cellY, type, fromCellY) {
        var newCandy = this.boardCandies.newCandy(cellX, cellY, type);
        newCandy.y = this.cellYToPxIn(fromCellY), newCandy.fallTo(cellX, cellY), newCandy.alpha = 0
    }, G.Board.prototype["export"] = function() {
        var result = new G.GridArray(this.boardData.width, this.boardData.height);
        return result.loop(function(elem, x, y, data) {
            var cell = [];
            "X" == this.boardData.get(x, y) && cell.push("X"), this.layers.forEach(function(layer) {
                var exp = layer["export"](x, y);
                exp && cell.push(exp)
            }), data[x][y] = cell
        }, this), JSON.stringify(result.data)
    }, G.Board.prototype["import"] = function(levelData) {
        levelData.loop(function(elem, x, y) {
            for (var i = 0, len = elem.length; len > i; i++)
                if (elem[i] = elem[i].toString(), "W" == elem[i][0] && (elem[i] = elem[i][1] + ":" + elem[i][0]), "r" !== elem[i][0] || this.editorMode || (elem[i] = this.getRandomThatDoesntMatch(x, y) + elem[i].substr(1)), "X" == elem[i]) this.boardData.set(x, y, "X");
                else {
                    var imported = !1;
                    this.layersNoCandies.forEach(function(layer) {
                        var imp = layer["import"](x, y, elem[i]);
                        !imported && imp && (imported = !0)
                    }), imported || this.boardCandies["import"](x, y, elem[i])
                }
        }, this), 0 == this.matcher.checkPossibleMoves().length && this.shuffleCandies(!0), this.possibleMoves = this.matcher.checkPossibleMoves()
    }, G.Board.prototype.makePossibleMatch = function() {
        for (var x, y, off, w = this.boardData.width, h = this.boardData.height, offsetsCoords = [
                [1, 0, 1, -1, 1, 1],
                [-1, 0, -1, -1, -1, 1],
                [0, -1, -1, -1, 1, -1],
                [0, 1, -1, 1, 1, 1]
            ];;)
            if (x = Math.floor(Math.random() * w), y = Math.floor(Math.random() * h), off = offsetsCoords[Math.floor(Math.random() * offsetsCoords.length)], this.isMoveable(x, y) && this.isCellMatchable(x, y) && this.isMoveable(x + off[0], y + off[1]) && this.isCellMatchable(x + off[2], y + off[3]) && this.isCellMatchable(x + off[4], y + off[5])) {
                var candy1 = this.getCandy(x, y),
                    candy2 = this.getCandy(x + off[2], y + off[3]),
                    candy2OrgType = candy2.candyType,
                    candy3 = this.getCandy(x + off[4], y + off[5]),
                    candy3OrgType = candy3.candyType;
                if (!candy1.goalCandy && !candy2.goalCandy && !candy3.goalCandy) {
                    if (candy2.candyType = candy1.candyType, candy3.candyType = candy1.candyType, !this.matcher.quickMatchCheck(candy2) && !this.matcher.quickMatchCheck(candy3)) {
                        G.changeTexture(candy2, candy1.frameName), G.changeTexture(candy3, candy1.frameName);
                        break
                    }
                    candy2.candyType = candy2OrgType, candy3.candyType = candy3OrgType
                }
            }
    }, G.Board.prototype.getRandomThatDoesntMatch = function(x, y) {
        for (var rnd = game.rnd.between(1, this.MAX_NUMBER_OF_REGULAR_CANDY), i = 0; i < this.MAX_NUMBER_OF_REGULAR_CANDY; i++) {
            if (!(this.isCellMatchable(x - 2, y, rnd) && this.isCellMatchable(x - 1, y, rnd) || this.isCellMatchable(x, y - 2, rnd) && this.isCellMatchable(x, y - 1, rnd) || this.isCellMatchable(x - 1, y, rnd) && this.isCellMatchable(x - 1, y - 1, rnd) && this.isCellMatchable(x, y - 1, rnd))) return rnd;
            rnd = (rnd + 1) % this.MAX_NUMBER_OF_REGULAR_CANDY
        }
        return rnd
    }, G.Board.prototype.shuffleFailure = function() {
        for (var i = 0; 24 > i; i++) this.removeCandy(i % 8, Math.floor(i / 8));
        for (i = 0; 24 > i; i++) this.boardCandies.newCandy(i % 8, Math.floor(i / 8), game.rnd.between(1, 3).toString())
    }, G.Board.prototype.shuffleCandies = function(immediate) {
        var w = this.boardData.width,
            h = this.boardData.height,
            attempts = 0;
        do attempts++, attempts > 20 && this.shuffleFailure(), this.boardCandies.grid.loop(function(elem, x, y, data) {
            if (elem && this.isMoveable(x, y) && !elem.goalCandy) {
                for (var x2, y2, elem2;;)
                    if (x2 = game.rnd.between(0, w - 1), y2 = game.rnd.between(0, h - 1), (x != x2 || y2 != y) && (elem2 = data[x2][y2], this.isMoveable(x2, y2) && !elem2.goalCandy)) break;
                immediate || G.IMMEDIATE ? this.swapCandiesWithPosition(elem, elem2) : this.swapCandies(elem, elem2)
            }
        }, this); while (0 == this.matcher.checkPossibleMoves().length);
        G.sfx.whoosh_short_1.play(), this.boardCandies.grid.loop(function(elem, x, y) {
            elem && (!immediate && this.isMoveable(x, y) && elem.shuffleMoveToOwnCell(), this.isCellMatchable(x, y) && this.matcher.quickMatchCheck(elem) && this.checkMatchList.push(elem))
        }, this), this.checkMatchList.length > 0 && this.actionManager.newAction("processMatch")
    }, G.Board.prototype.swapCandiesWithPosition = function(c1, c2) {
        this.boardCandies.grid.set(c1.cellX, c1.cellY, c2), this.boardCandies.grid.set(c2.cellX, c2.cellY, c1);
        var tmpCellX = c1.cellX,
            tmpCellY = c1.cellY,
            tmpX = c1.x,
            tmpY = c1.y;
        c1.x = c2.x, c1.y = c2.y, c1.cellX = c2.cellX, c1.cellY = c2.cellY, c2.x = tmpX, c2.y = tmpY, c2.cellX = tmpCellX, c2.cellY = tmpCellY
    }, G.Board.prototype.deconstruct = function() {
        this.deconstructing = !0, this.background.x += .5 * this.background.width, this.background.y += .5 * this.background.height, this.background.anchor.setTo(.5), this.glowImg = G.makeImage(0, 0, "popup_lighht", .5, this), this.glowImg.x = this.background.x, this.glowImg.y = this.background.y, this.glowImg.blendMode = 1, game.add.tween(this.glowImg).to({
                angle: 360
            }, 6e3, Phaser.Easing.Linear.None, !0), this.glowImg.alpha = 0, this.wellDoneTxt = new G.Text(0, 0, G.txt("Well done!"), {
                style: "font-red",
                fontSize: 70
            }, .5, 600), this.add(this.wellDoneTxt), this.wellDoneTxt.x = this.background.x, this.wellDoneTxt.y = this.background.y, this.wellDoneTxt.visible = !1, game.add.tween(this.boardDirt).to({
                alpha: 0
            }, 200, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this.boardIce).to({
                alpha: 0
            }, 200, Phaser.Easing.Sinusoidal.In, !0),
            game.add.tween(this.boardCage).to({
                alpha: 0
            }, 200, Phaser.Easing.Sinusoidal.In, !0), game.time.events.add(200, this.boardCandies.deconstruct, this.boardCandies), game.time.events.add(900, function() {
                game.add.tween(this.background.scale).to({
                    x: 0,
                    y: 0
                }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.background).to({
                    angle: 70
                }, 500, Phaser.Easing.Sinusoidal.InOut, !0)
            }, this), game.time.events.add(900, function() {
                game.add.tween(this.glowImg).to({
                    alpha: .2
                }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.wellDoneTxt.visible = !0, this.wellDoneTxt.scale.setTo(0), game.add.tween(this.wellDoneTxt.scale).to({
                    x: 1,
                    y: 1
                }, 500, Phaser.Easing.Elastic.Out, !0)
            }, this), game.time.events.add(2200, function() {
                game.add.tween(this.glowImg).to({
                    alpha: 0
                }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.wellDoneTxt).to({
                    alpha: 0
                }, 300, Phaser.Easing.Sinusoidal.Out, !0), G.lvl.state.windowLayer.pushWindow("win")
            }, this)
    }, G.BoardActionManager = function(board) {
        this.board = board, this.state = game.state.getCurrentState(), this.actionList = [], this.noAction = !0, this.madeMove = !1, G.sb("madeMove").add(function() {
            this.madeMove = !0
        }, this), this.availableActions = {
            move: G.ActionMove,
            processMatch: G.ActionProcessMatch,
            processFall: G.ActionProcessFall,
            boosterMatch: G.ActionBoosterMatch,
            boosterSwap: G.ActionBoosterSwap,
            shuffle: G.ActionShuffle,
            startBoosterInit: G.ActionStartBoosters
        }, G.sb("onBoosterSelect").add(function(nr) {
            1 == nr ? this.newAction("boosterSwap") : this.newAction("boosterMatch", nr)
        }, this), G.sb("onBoosterDeselect").add(function() {
            1 == this.actionList.length && this.actionList[0].finish()
        }, this), this.noActionFrames = 0, this.shakingCandies = []
    }, G.BoardActionManager.prototype.update = function() {
        0 == this.actionList.length ? (this.noAction = !0, this.noActionFrames++, this.noActionFrames > 160 && (this.noActionFrames = 0, this.glowPossibleMoves()), this.updateShakes()) : (this.noActionFrames = 0, this.noAction = !1, this.actionList[0].update())
    }, G.BoardActionManager.prototype.normalCandies = ["0", "1", "2", "3", "4", "5", "6"], G.BoardActionManager.prototype.updateShakes = function() {
        for (var i = this.shakingCandies.length; i--;) {
            var shakeObj = this.shakingCandies[i],
                candy = shakeObj.candy;
            shakeObj.dt += .04, candy.x = shakeObj.orgX + Math.sin(shakeObj.dt * (4 * Math.PI)) * shakeObj.wave, shakeObj.dt >= 1 && (candy.x = shakeObj.orgX, candy.y = shakeObj.orgY, this.shakingCandies.pop())
        }
    }, G.BoardActionManager.prototype.breakShakes = function() {
        this.shakingCandies.forEach(function(shakeObj) {
            shakeObj.candy.x = shakeObj.orgX, shakeObj.candy.y = shakeObj.orgY
        }), this.shakingCandies = []
    }, G.BoardActionManager.prototype.glowPossibleMoves = function() {
        if (!G.tutorialOpened) {
            var possibleMoves = this.board.matcher.checkPossibleMoves();
            if (Phaser.ArrayUtils.shuffle(possibleMoves), 0 != possibleMoves.length) {
                var moveToShow = possibleMoves[0];
                this.shakeCandy(this.board.getCandy(moveToShow[0], moveToShow[1])), this.shakeCandy(this.board.getCandy(moveToShow[2], moveToShow[3]))
            }
        }
    }, G.BoardActionManager.prototype.shakeCandy = function(candy) {
        this.shakingCandies.push({
            candy: candy,
            orgX: candy.x,
            orgY: candy.y,
            dt: 0,
            wave: G.l(5)
        })
    }, G.BoardActionManager.prototype.newAction = function(type) {
        this.breakShakes();
        var args = [].slice.call(arguments, 1);
        this.actionList.push(new this.availableActions[type](this.board, this, args))
    }, G.BoardActionManager.prototype.removeAction = function(action) {
        var index = this.actionList.indexOf(action);
        if (-1 != index ? this.actionList.splice(index, 1) : this.actionList.splice(0, 1), 0 == this.actionList.length) {
            if (G.lvl.endCombo(), G.lvl.goalAchieved) {
                if (G.lvl.moves > 0) {
                    var normals = this.board.boardCandies.getNormalCandies();
                    Phaser.ArrayUtils.shuffle(normals);
                    for (var len = Math.min(G.lvl.moves, normals.length, 15), i = 0; len > i; i++) {
                        var candy = normals[i];
                        candy.changeInto(Math.random() < .5 ? "horizontal" : "vertical"), candy.activatedByMove = !0, G.lvl.changePointsNumber(G.json.settings.pointsForMoveLeft);
                        var pxOut = G.lvl.state.board.cellToPxOut([candy.cellX, candy.cellY]);
                        G.sb("displayPoints").dispatch(pxOut[0], pxOut[1], G.json.settings.pointsForMoveLeft), G.lvl.madeMove(), this.board.checkSpecialMatchList.push(candy)
                    }
                    return G.sfx.booster.play(), void game.time.events.add(800, function() {
                        this.newAction("processMatch")
                    }, this)
                }
                var specialCandies = this.board.boardCandies.getAllSpecialCandies();
                if (!(specialCandies.length > 0)) return G.sb("onWinLevelPopUp").dispatch(), "CHALLENGE" == this.state.mode && (G.saveState.data.dailyBeaten || (G.saveState.data.dailyBeaten = 0), G.saveState.data.dailyBeaten++), this.board.deconstruct();
                specialCandies.forEach(function(candy) {
                    candy.activatedByMove = !0, this.board.checkSpecialMatchList.push(candy)
                }, this), G.IMMEDIATE ? this.newAction("processMatch") : game.time.events.add(G.IMMEDIATE ? 1 : 300, function() {
                    this.newAction("processMatch")
                }, this)
            }
            if (this.board.possibleMoves = this.possibleMoves = this.board.matcher.checkPossibleMoves(), 0 == this.possibleMoves.length) return this.newAction("shuffle");
            0 == G.lvl.moves && (G.lvl.isGoalAchieved() || (game.incentivised ? G.lvl.state.windowLayer.pushWindow("outOfMoves") : G.saveState.getCoins() >= 2 * G.lvl.getPriceOfExtraMoves() ? G.lvl.state.windowLayer.pushWindow("outOfMoves") : G.lvl.state.windowLayer.pushWindow("levelFailed"))), G.sb("actionQueueEmpty").dispatch(), this.madeMove && (this.madeMove = !1, G.sb("actionQueueEmptyAfterMove").dispatch())
        }
    }, G.BoardBackground = function(boardObj) {
        Phaser.Group.call(this, game), this.board = boardObj, this.borderSize = G.l(8), this.renderTexture = game.add.renderTexture(1, 1), this.markerImg = game.make.image(), this.markerImg.anchor.setTo(.5)
    }, G.BoardBackground.prototype = Object.create(Phaser.Group.prototype), G.BoardBackground.prototype.redraw = function() {
        this.renderTexture.resize((this.board.boardData.width + 2) * this.board.tilesize, (this.board.boardData.height + 2) * this.board.tilesize, !0), this.renderTexture.clear(), this.drawBg()
    }, G.BoardBackground.prototype.drawBg = function() {
        for (var col = (this.board.tilesize, -1); col < this.board.boardData.width + 1; col++)
            for (var row = -1; row < this.board.boardData.height + 1; row++) {
                var tile = this.checkIfTile(col, row),
                    up = this.checkIfTile(col, row - 1),
                    down = this.checkIfTile(col, row + 1),
                    left = this.checkIfTile(col - 1, row),
                    right = this.checkIfTile(col + 1, row),
                    ur = this.checkIfTile(col + 1, row - 1),
                    ul = this.checkIfTile(col - 1, row - 1),
                    dr = this.checkIfTile(col + 1, row + 1),
                    dl = this.checkIfTile(col - 1, row + 1);
                tile ? this.drawSprite(col, row, "tile_" + (1 + (col % 2 + row % 2) % 2), 0) : (up && this.drawSprite(col, row, "tile_border_straight", 180), down && this.drawSprite(col, row, "tile_border_straight", 0), left && this.drawSprite(col, row, "tile_border_straight", 90), right && this.drawSprite(col, row, "tile_border_straight", 270), !dr || right || down || this.drawSprite(col, row, "tile_border_outside_corner", 0), !dl || left || down || this.drawSprite(col, row, "tile_border_outside_corner", 90), !ur || right || up || this.drawSprite(col, row, "tile_border_outside_corner", 270), !ul || left || up || this.drawSprite(col, row, "tile_border_outside_corner", 180), down && right && this.drawSprite(col, row, "tile_border_inside_corner", 0), down && left && this.drawSprite(col, row, "tile_border_inside_corner", 90), up && right && this.drawSprite(col, row, "tile_border_inside_corner", 270), up && left && this.drawSprite(col, row, "tile_border_inside_corner", 180))
            }
    }, G.BoardBackground.prototype.drawSprite = function(x, y, sprite, angle) {
        var px = {
            x: x * this.board.tilesize,
            y: y * this.board.tilesize
        };
        this.markerImg.angle = angle || 0, G.changeTexture(this.markerImg, sprite), this.markerImg.updateTransform(), this.renderTexture.renderXY(this.markerImg, px.x + 1.5 * this.board.tilesize, px.y + 1.5 * this.board.tilesize)
    }, G.BoardBackground.prototype.checkIfTile = function(x, y) {
        var val = this.board.boardData.get(x, y);
        return val === !1 ? !1 : "X" === val ? !1 : !0
    }, G.BoardCandies = function(board, data) {
        Phaser.Group.call(this, game), this.board = board, this.position = board.position, this.scale = board.scale, this.boardData = data, this.grid = new G.GridArray(this.boardData.width, this.boardData.height, !1), this.deadGroup = game.add.group(), this.deadGroup.visible = !1, this.firstFloor = game.add.group(), this.secondFloor = game.add.group(), this.collectCells = board.collectCells, this.boardCollectCells = new G.BoardCollectCells(board, this.collectCells), board.boardCollectCells = this.boardCollectCells, this.fxGroup = new G.TopFxLayer(this.board), this.boosterFxGroup = game.add.group(), this.thirdFloor = game.add.group(), this.fxTopGroup = this.fxGroup.aboveThirdFloorLayer = game.add.group(), G.IMMEDIATE && (this.deadGroup.visible = this.firstFloor.visible = this.secondFloor.visible = this.fxGroup.visible = this.thirdFloor.visible = this.fxTopGroup.visible = !1), this.firstFloor.position = this.secondFloor.position = this.fxGroup.position = this.fxTopGroup.position = this.boosterFxGroup.position = this.thirdFloor.position = this.position, this.firstFloor.scale = this.secondFloor.scale = this.fxGroup.scale = this.fxTopGroup.scale = this.boosterFxGroup.scale = this.thirdFloor.scale = this.scale, this.infectionSources = [], this.infectionSuperSources = [], this.infectionCoords = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, -1],
            [-1, -1],
            [-1, -1],
            [1, -1],
            [1, 1]
        ], G.sb("onCandyInfect").add(function(candy) {
            this.addInfectionSource(candy, this.infectionSources)
        }, this), G.sb("onCandyInfectionRemove").add(function(candy) {
            this.removeInfectionSource(candy, this.infectionSources)
        }, this), this.removedInfectionSource = !1, this.infectionToMakeStep = 0, G.sb("actionQueueEmptyAfterMove").add(function() {
            if (!this.removedInfectionSource && this.infectionSuperSources.length > 0) {
                var spreaded = this.spreadInfection(this.infectionSuperSources);
                spreaded || this.spreadInfection(this.infectionSources)
            }
            this.removedInfectionSource = !1
        }, this)
    }, G.BoardCandies.prototype = Object.create(Phaser.Group.prototype), G.BoardCandies.prototype.onMatch = function(cellX, cellY, delay, moveCellX, moveCellY) {
        var candy = this.getCandy(cellX, cellY);
        return candy && candy.match(delay, moveCellX, moveCellY), !0
    }, G.BoardCandies.prototype.onHit = function(cellX, cellY) {
        var candy = this.getCandy(cellX, cellY);
        return candy && candy.hit(), !0
    }, G.BoardCandies.prototype.isMoveBlocked = function(cellX, cellY) {
        return !1
    }, G.BoardCandies.prototype.isMatchBlocked = function(cellX, cellY) {
        var candy = this.getCandy(cellX, cellY);
        return candy ? !candy.matchable || candy.falling || candy.goalCandy || candy.chocolate : !1
    }, G.BoardCandies.prototype.isBoosterChangeBlocked = function(cellX, cellY) {
        var candy = this.getCandy(cellX, cellY);
        return candy ? candy.special || candy.wrapped || candy.infected : !1
    }, G.BoardCandies.prototype["import"] = function(cellX, cellY, chunk) {
        var colonIndex = chunk.indexOf(":");
        colonIndex = -1 == colonIndex ? chunk.length : colonIndex;
        var candy = this.newCandy(cellX, cellY, chunk.slice(0, colonIndex)),
            modifier = chunk.slice(colonIndex); - 1 !== modifier.indexOf("W") && candy.wrap(), -1 !== modifier.indexOf("B") && candy.changeIntoBlocker(modifier[2]), -1 !== modifier.indexOf("I") && candy.infect(), -1 !== modifier.indexOf("H") && candy.changeInto("horizontal", !0), -1 !== modifier.indexOf("V") && candy.changeInto("vertical", !0), -1 !== modifier.indexOf("S") && candy.changeInto("spiral", !0), -1 !== modifier.indexOf("C") && candy.changeInto("cross", !0)
    }, G.BoardCandies.prototype["export"] = function(cellX, cellY) {
        var candy = this.getCandy(cellX, cellY);
        return candy && !candy.blocker ? candy.wrapped ? "W" + candy.candyType : candy.chocolate ? "c" + candy.hp : candy.candyType : !1
    }, G.BoardCandies.prototype.spreadInfection = function(sourcesArray) {
        if (0 != sourcesArray.length) {
            Phaser.ArrayUtils.shuffle(sourcesArray);
            for (var source = game.rnd.pick(sourcesArray), i = 0, len = this.infectionCoords.length; len > i; i++) {
                var coords = this.infectionCoords[i],
                    xx = source.cellX + coords[0],
                    yy = source.cellY + coords[1],
                    candyToInfect = this.getCandy(xx, yy);
                if (candyToInfect && this.board.isMoveable(xx, yy) && this.board.isCellMatchable(xx, yy) && !candyToInfect.wrapped && !candyToInfect.infected && !candyToInfect.special) return candyToInfect.infect(), !0
            }
            return !1
        }
    }, G.BoardCandies.prototype.getRandom = function() {
        var piece, children = this.firstFloor.children.concat(this.secondFloor.children),
            len = children.length,
            rnd = game.rnd.between(0, len);
        if (0 == len) return !1;
        for (var i = 0; len > i; i++)
            if (piece = children[(i + rnd) % len], this.grid.get(piece.cellX, piece.cellY) == piece && piece && piece.alive && !piece.goalCandy && this.board.isCellMatchable(piece.cellX, piece.cellY)) return piece;
        return !1
    }, G.BoardCandies.prototype.getRandomNormal = function() {
        var piece, children = this.firstFloor.children.concat(this.secondFloor.children),
            len = children.length,
            rnd = game.rnd.between(0, len);
        if (0 == len) return !1;
        for (var i = 0; len > i; i++)
            if (piece = children[(i + rnd) % len], this.grid.get(piece.cellX, piece.cellY) == piece && piece && !piece.special && !piece.chocolate && !piece.wrapped && piece.alive && !piece.goalCandy && this.board.isCellMatchable(piece.cellX, piece.cellY) && this.board.isMoveable(piece.cellX, piece.cellY)) return piece;
        return !1
    }, G.BoardCandies.prototype.getNormalCandies = function() {
        var piece, children = this.firstFloor.children.concat(this.secondFloor.children),
            len = children.length,
            rnd = game.rnd.between(0, len),
            result = [];
        if (0 == len) return !1;
        for (var i = 0; len > i; i++) piece = children[(i + rnd) % len], this.grid.get(piece.cellX, piece.cellY) == piece && piece && !piece.special && !piece.chocolate && !piece.wrapped && piece.alive && !piece.goalCandy && this.board.isCellMatchable(piece.cellX, piece.cellY) && this.board.isMoveable(piece.cellX, piece.cellY) && result.push(piece);
        return result
    }, G.BoardCandies.prototype.moveTo = function(x, y) {
        this.x = x, this.y = y
    }, G.BoardCandies.prototype.isSpaceFree = function(cellX, cellY) {
        return !this.grid.get(cellX, cellY)
    }, G.BoardCandies.prototype.gridMoveFromTo = function(cellX, cellY, newCellX, newCellY) {
        this.grid.set(newCellX, newCellY, this.grid.get(cellX, cellY)), this.grid.set(cellX, cellY, null)
    }, G.BoardCandies.prototype.newCandy = function(x, y, type) {
        var candy = this.deadGroup.children[0] ? this.deadGroup.children[0] : new G.Candy(this.board, this.grid);
        return this.firstFloor.add(candy), "undefined" != typeof type && type.indexOf && -1 !== type.indexOf("CHAIN") ? (candy.init(x, y, type.slice(-1)), candy.wrap()) : candy.init(x, y, type || game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY)), this.grid.set(x, y, candy), "infection" == type && (candy.matchable = !1, this.addInfectionSource(candy, this.infectionSuperSources)), "chest" == type && (candy.matchable = !1), candy
    }, G.BoardCandies.prototype.getCandy = function(cellX, cellY) {
        return this.grid.get(cellX, cellY)
    }, G.BoardCandies.prototype.swapCandies = function(c1, c2) {
        this.grid.set(c1.cellX, c1.cellY, c2), this.grid.set(c2.cellX, c2.cellY, c1);
        var tmpX = c1.cellX,
            tmpY = c1.cellY;
        c1.cellX = c2.cellX, c1.cellY = c2.cellY, c2.cellX = tmpX, c2.cellY = tmpY
    }, G.BoardCandies.prototype.removeCandy = function() {
        var candy, skipCollectableRemove = !1;
        "object" == typeof arguments[0] ? (candy = Array.isArray(arguments[0]) ? this.getCandy(arguments[0][0], arguments[0][1]) : arguments[0], skipCollectableRemove = arguments[1]) : (candy = this.getCandy(arguments[0], arguments[1]), skipCollectableRemove = arguments[2]), candy && (this.removeInfectionSource(candy, this.infectionSuperSources), this.grid.set(candy.cellX, candy.cellY, !1), skipCollectableRemove || G.sb("onCollectableRemove").dispatch(candy.candyType, candy.specialType ? !1 : candy), candy.kill(), this.deadGroup.add(candy))
    }, G.BoardCandies.prototype.removeToken = G.BoardCandies.prototype.removeCandy, G.BoardCandies.prototype.destroyCell = G.BoardCandies.prototype.removeCandy, G.BoardCandies.prototype.addInfectionSource = function(candy, sourcesArray) {
        -1 === sourcesArray.indexOf(candy) && sourcesArray.push(candy)
    }, G.BoardCandies.prototype.removeInfectionSource = function(candy, sourcesArray) {
        var index = sourcesArray.indexOf(candy); - 1 !== index && (sourcesArray.splice(index, 1), this.removedInfectionSource = !0)
    }, G.BoardCandies.prototype.consoleInfectionSources = function() {
        for (var i = 0; i < this.infectionSources.length; i++) console.log("INFECTION SOURCE: " + this.infectionSources[i].cellX + "x" + this.infectionSources[i].cellY)
    }, G.BoardCandies.prototype.getAllSpecialCandies = function() {
        var result = [];
        return this.grid.loop(function(elem, x, y) {
            elem && elem.special && result.push(elem)
        }), result
    }, G.BoardCandies.prototype.deconstruct = function() {
        for (var delay = 0, i = 0; 14 >= i; i++) {
            for (var xx = 0, yy = i; yy >= 0; yy--) this.grid.get(xx, yy) && (t1 = game.add.tween(this.grid.get(xx, yy).scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Sinusoidal.InOut, !0, delay)), xx++;
            delay += 40
        }
    }, G.BoardCandies.prototype.areCandiesNeighbours = function(candy, candy2) {
        return candy && candy2 ? Math.abs(candy.cellX - candy2.cellX) + Math.abs(candy.cellY - candy2.cellY) == 1 : !1
    }, G.BoardCollectCells = function(board, collectCells) {
        Phaser.Group.call(this, game), this.board = board, this.position = board.position, this.scale = board.scale, this.ccs = [], collectCells && this.init(collectCells)
    }, G.BoardCollectCells.prototype = Object.create(Phaser.Group.prototype), G.BoardCollectCells.prototype.init = function(collectCells) {
        collectCells.forEach(function(cc) {
            this.addCC(cc)
        }, this), G.sb("onCollectableTaskFinished").add(function(type) {
            "goalCandy" === type && this.hide()
        }), G.sb("onGoalAchieved").add(this.hide, this)
    }, G.BoardCollectCells.prototype.hide = function() {
        1 === this.alpha && game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0)
    }, G.BoardCollectCells.prototype.addCC = function(ccData) {
        var x = ccData.x * this.board.tilesize,
            y = ccData.y * this.board.tilesize,
            cc = G.makeImage(x, y, "collect_cell", 0, this);
        cc.cellX = ccData.x, cc.cellY = ccData.y, this.ccs.push(cc)
    }, G.BoardCollectCells.prototype.editorChangeCC = function(cellX, cellY) {
        var matchingCC = this.ccs.find(function(cc) {
            return cc.cellX === cellX && cc.cellY === cellY
        });
        matchingCC ? (matchingCC.destroy(), this.ccs.splice(this.ccs.indexOf(matchingCC), 1)) : this.addCC({
            x: cellX,
            y: cellY
        }), G.lvlData.collectCells = this.editorExport()
    }, G.BoardCollectCells.prototype.editorExport = function() {
        return 0 === this.ccs.length ? null : this.ccs.map(function(cc) {
            return {
                x: cc.cellX,
                y: cc.cellY
            }
        })
    }, G.BoardMatcher = function(board) {
        this.board = board, this.specialsCoordinates = G.specialCandies.patterns, this.grid = new G.GridArray(this.board.boardData.width, this.board.boardData.height, !1), this.grid.set = function(x, y, val) {
            return this.isInGrid(x, y) ? this.data[x][y] ? "m" == this.data[x][y] && "m" != val ? this.data[x][y] = val : void 0 : this.data[x][y] = val : !1
        }, this.tempGrid = new G.GridArray(this.board.boardData.width, this.board.boardData.height, !1), this.hitGrid = new G.GridArray(this.board.boardData.width, this.board.boardData.height, !1), this.toCheck = []
    }, G.BoardMatcher.prototype.isMoveValid = function(candy) {
        var cellX = candy.cellX,
            cellY = candy.cellY;
        return this.board.isCellMatchable(cellX, cellY) ? candy.special && candy.activatedByMove ? !0 : this.quickCheckCoords(candy, this.horCoords, !1) ? !0 : this.quickCheckCoords(candy, this.verCoords, !1) ? !0 : !1 : !1
    }, G.BoardMatcher.prototype.quickMatchCheck = function(candy) {
        if (!candy) return !1;
        var cellX = candy.cellX,
            cellY = candy.cellY;
        return this.board.isCellMatchable(cellX, cellY) ? this.quickCheckCoords(candy, this.horCoords, !1) ? !0 : this.quickCheckCoords(candy, this.verCoords, !1) ? !0 : !1 : !1
    }, G.BoardMatcher.prototype.checkPossibleMoves = function() {
        var result = [];
        return this.board.boardCandies.grid.loop(function(elem, x, y) {
            elem && this.board.isMoveable(elem.cellX, elem.cellY) && this.board.isCellMatchable(elem.cellX, elem.cellY) && (elem && this.board.isMoveable(x + 1, y) && this.quickCheckCoords(elem, this.possibleRightMoves, !1) && result.push([x, y, x + 1, y]), elem && this.board.isMoveable(x - 1, y) && this.quickCheckCoords(elem, this.possibleLeftMoves, !1) && result.push([x, y, x - 1, y]), elem && this.board.isMoveable(x, y - 1) && this.quickCheckCoords(elem, this.possibleUpMoves, !1) && result.push([x, y, x, y - 1]), elem && this.board.isMoveable(x, y + 1) && this.quickCheckCoords(elem, this.possibleDownMoves, !1) && result.push([x, y, x, y + 1]))
        }, this), result
    }, G.BoardMatcher.prototype.quickCheckCoords = function(candy, data, all) {
        for (var coords, test, cellX = candy.cellX, cellY = candy.cellY, type = candy.candyType, i = 0, len = data.length; len > i; i++) {
            coords = data[i], test = !0;
            for (var j = 0, len2 = coords.length; len2 > j; j += 2)
                if (!this.board.isCellMatchable(cellX + coords[j], cellY + coords[j + 1], type)) {
                    test = !1;
                    break
                }
            if (all && !test) return !1;
            if (!all && test) return !0
        }
        return all ? !0 : !1
    }, G.BoardMatcher.prototype.processMatchList = function() {
        if (0 != this.board.checkMatchList.length || 0 != this.board.checkSpecialMatchList.length) {
            G.lvl.increaseCombo(), G.sfx["match_" + game.math.clamp(G.lvl.combo || 1, 1, 5)].play(), this.candiesToProcess = this.board.checkMatchList, this.specialCandiesToProcess = this.board.checkSpecialMatchList;
            for (var i = 0, len = this.candiesToProcess.length; len > i; i++) this.grid.get(this.candiesToProcess[i].cellX, this.candiesToProcess[i].cellY) || (this.candiesToProcess[i].special && this.candiesToProcess[i].activatedByMove ? this.specialCandiesToProcess.push(this.candiesToProcess[i]) : this.processTemp(this.candiesToProcess[i]));
            this.inflateHitGrid();
            for (var j = 0; j < this.specialCandiesToProcess.length; j++) this.processTempSpecial(this.specialCandiesToProcess[j]);
            this.processGrid(), this.processHitGrid(), this.board.checkMatchList = [], this.board.checkSpecialMatchList = [], this.grid.clear(), this.hitGrid.clear()
        }
    }, G.BoardMatcher.prototype.inflateHitGrid = function() {
        this.grid.loop(function(elem, x, y) {
            elem && (this.hitGrid.set(x - 1, y, "h"), this.hitGrid.set(x + 1, y, "h"), this.hitGrid.set(x, y - 1, "h"), this.hitGrid.set(x, y + 1, "h"))
        }, this)
    }, G.BoardMatcher.prototype.processHitGrid = function() {
        this.hitGrid.loop(function(elem, x, y) {
            elem && this.board.hitCell(x, y)
        }, this)
    }, G.BoardMatcher.prototype.processGrid = function() {
        this.grid.loop(function(elem, x, y) {
            elem && ("m" == elem ? this.board.matchCell(x, y) : ("change" == elem[0] && (this.board.getCandy(x, y) && this.board.getCandy(x, y).changeInto(elem[1]), this.board.matchCellExceptCandy(x, y)), "match-move" == elem[0] && this.board.matchCell(x, y, elem[1], elem[2], elem[3])))
        }, this)
    }, G.BoardMatcher.prototype.processTempSpecial = function(candy) {
        for (var currentExe, i = 0, len = candy.exe.length; len > i; i++) currentExe = candy.exe[i], "loop" == currentExe[0] && this.processSpecialExeLoop(candy, currentExe[1]), "specific" == currentExe[0] && this.processSpecialExeSpecific(candy, currentExe[1]), "matchType" == currentExe[0] && this.processSpecialExeMatchType(candy, currentExe[1]), "changeTypeInto" == currentExe[0] && this.processSpecialExeChangeTypeInto(candy, currentExe[1], currentExe[2]), "perform" == currentExe[0] && this.processSpecialExePerform(candy, currentExe[1]), "superSpiral" == currentExe[0] && this.processSpecialExeSuperSpiral(candy, currentExe[1]);
        this.copyTempGridToMatchGrid()
    }, G.BoardMatcher.prototype.processSpecialExeLoop = function(candy, posObj) {
        G.sfx.line.play();
        for (var candy, xx = candy.cellX, yy = candy.cellY;;) {
            if (!this.board.isCellInBoardArea(xx, yy)) break;
            this.tempCheckAndMark(xx, yy), xx += posObj.x, yy += posObj.y
        }
    }, G.BoardMatcher.prototype.processSpecialExePerform = function(candy, name) {
        candy[name]()
    }, G.BoardMatcher.prototype.processSpecialExeSpecific = function(candy, posArray) {
        G.sfx.boom.play();
        var cellX = candy.cellX,
            cellY = candy.cellY;
        G.sb("fx").dispatch("explosion", candy);
        for (var xx, yy, i = 0, len = posArray.length; len > i; i += 2) xx = cellX + posArray[i], yy = cellY + posArray[i + 1], this.tempCheckAndMark(xx, yy)
    }, G.BoardMatcher.prototype.processSpecialExeMatchType = function(candy, exeType) {
        G.sfx.lightning.play(), "LASTMOVEDWITH" == exeType && (exeType = candy.lastMovedWith ? candy.lastMovedWith.candyType : game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY)), "CANDYTYPE" == exeType && (exeType = candy.candyType), this.board.getCandy(candy.cellX, candy.cellY) == candy && this.tempGrid.set(candy.cellX, candy.cellY, "m"), this.board.boardCandies.grid.loop(function(elem, x, y) {
            elem && elem.candyType == exeType && this.tempCheckAndMark(x, y, !0) && G.sb("fx").dispatch("lightning", candy, [x, y])
        }, this)
    }, G.BoardMatcher.prototype.processSpecialExeChangeTypeInto = function(candy, changeTarget, changeInto) {
        "CANDYTYPE" == changeTarget && (changeTarget = candy.candyType), "SPECIALLASTMOVED" == changeInto && (changeInto = candy.lastMovedWith.specialType), this.board.getCandy(candy.cellX, candy.cellY) == candy && this.tempGrid.set(candy.cellX, candy.cellY, "m"), this.board.boardCandies.grid.loop(function(elem, x, y) {
            elem && elem.candyType == changeTarget && !elem.special && elem !== candy && this.board.isCellMatchable(x, y) && this.board.isMoveable(x, y) && (this.board.checkAfterFall.push(elem), elem.changeInto(changeInto), G.sb("fx").dispatch("lightning", candy, [x, y]))
        }, this)
    }, G.BoardMatcher.prototype.processSpecialExeSuperSpiral = function(candy) {
        this.board.boardData.loop(function(val, x, y) {
            this.board.isCellOnBoard(x, y) && this.tempCheckAndMark(x, y)
        }, this)
    }, G.BoardMatcher.prototype.tempCheckAndMark = function(xx, yy, hitOnlyIfMAtch) {
        return hitOnlyIfMAtch || this.hitGrid.set(xx, yy, !0), this.board.isCellMatchable(xx, yy) && !this.grid.get(xx, yy) ? (candy = this.board.getCandy(xx, yy), candy.special ? (this.specialCandiesToProcess.push(candy), this.tempGrid.set(xx, yy, "mSpecial"), this.hitGrid.set(xx, yy, !0), !0) : (this.tempGrid.set(xx, yy, "m"), this.hitGrid.set(xx, yy, !0), !0)) : !1
    }, G.BoardMatcher.prototype.processTemp = function(candy) {
        for (var currentCandy, currentMatchCandy, horPos, vertPos, allPos, candiesInMatch = [candy], i = 0; i < candiesInMatch.length; i++) {
            currentCandy = candiesInMatch[i], allPos = [], horPos = this.getHorizontalMatchPos(currentCandy, this.quickCheckCoords(currentCandy, this.horCoords, !1)), vertPos = this.getVerticalMatchPos(currentCandy, this.quickCheckCoords(currentCandy, this.verCoords, !1)), allPos = [].concat(horPos, vertPos);
            for (var j = 0, len = allPos.length; len > j; j += 2) currentMatchCandy = this.board.getCandy(allPos[j], allPos[j + 1]), -1 == candiesInMatch.indexOf(currentMatchCandy) && candiesInMatch.push(currentMatchCandy)
        }
        candiesInMatch.forEach(function(elem) {
            elem.special ? (this.tempGrid.set(elem.cellX, elem.cellY, "m"), this.specialCandiesToProcess.push(elem)) : this.tempGrid.set(elem.cellX, elem.cellY, "m")
        }, this), this.searchAndProcessSpecialsInTemp(candiesInMatch[0]), this.copyTempGridToMatchGrid()
    }, G.BoardMatcher.prototype.copyTempGridToMatchGrid = function() {
        var nrOfElements = 0,
            totalX = 0,
            totalY = 0,
            colors = [],
            expColor = !1;
        this.tempGrid.loop(function(elem, x, y) {
            if (elem) {
                nrOfElements++, totalX += x, totalY += y;
                var candy = this.board.getCandy(x, y);
                candy && -1 === colors.indexOf(candy.candyType.toString()) && colors.push(candy.candyType.toString()), "mSpecial" == elem ? this.grid.set(x, y, "m") : this.grid.set(x, y, elem)
            }
        }, this), 1 == colors.length && (expColor = colors[0]), nrOfElements > 0 && G.lvl.processMatch(nrOfElements, totalX / nrOfElements, totalY / nrOfElements, expColor), this.tempGrid.clear()
    }, G.BoardMatcher.prototype.searchAndProcessSpecialsInTemp = function(priorityCandy) {
        for (;;) {
            for (var specialIndex = 0, len = this.specialsCoordinates.length; len > specialIndex; specialIndex++)
                for (var specialCoordIndex = 0, len2 = this.specialsCoordinates[specialIndex][1].length; len2 > specialCoordIndex; specialCoordIndex++) {
                    var pattern = this.tempGrid.findPattern(this.specialsCoordinates[specialIndex][1][specialCoordIndex], "m");
                    pattern && this.pushSpecialToTempGrid(pattern, this.specialsCoordinates[specialIndex][0], priorityCandy) && specialCoordIndex--
                }
            break
        }
    }, G.BoardMatcher.prototype.pushSpecialToTempGrid = function(coords, special, priorityCandy) {
        var i, markedChange = !1,
            len = coords.length,
            changeArray = ["change", special],
            moveToX = coords[0],
            moveToY = coords[1],
            anyChanges = !1;
        if (priorityCandy)
            for (i = 0; len > i; i += 2) {
                this.board.getCandy(coords[i], coords[i + 1]);
                if (coords[i] == priorityCandy.cellX && coords[i + 1] == priorityCandy.cellY && !this.board.isBoosterChangeBlocked(coords[i], coords[i + 1])) {
                    markedChange = !0, moveToX = coords[i], moveToY = coords[i + 1], this.tempGrid.set(coords[i], coords[i + 1], changeArray), anyChanges = !0;
                    break
                }
            }
        for (i = 0; len > i; i += 2) 0 != i || markedChange || this.board.isBoosterChangeBlocked(coords[i], coords[i + 1]) ? this.tempGrid.get(coords[i], coords[i + 1]) == changeArray || this.board.getCandy(coords[i], coords[i + 1]).wrapped || this.board.boardCage.isToken(coords[i], coords[i + 1]) || (this.tempGrid.set(coords[i], coords[i + 1], ["match-move", 0, moveToX, moveToY]), anyChanges = !0) : (this.tempGrid.set(coords[i], coords[i + 1], changeArray), anyChanges = !0);
        return anyChanges
    }, G.BoardMatcher.prototype.getHorizontalMatchPos = function(candy, match) {
        var result = [],
            cellY = (candy.cellX, candy.cellY);
        if (!match) return result;
        var left = candy.cellX,
            right = candy.cellX;
        for (result.push(candy.cellX, candy.cellY);;) {
            if (!this.board.isCellMatchable(--left, cellY, candy.candyType) || this.grid.get(left, cellY)) break;
            result.push(left, cellY)
        }
        for (;;) {
            if (!this.board.isCellMatchable(++right, cellY, candy.candyType) || this.grid.get(right, cellY)) break;
            result.push(right, cellY)
        }
        return result
    }, G.BoardMatcher.prototype.getVerticalMatchPos = function(candy, match) {
        var result = [],
            cellX = candy.cellX,
            cellY = candy.cellY;
        if (!match) return result;
        var up = cellY,
            down = cellY;
        for (result.push(candy.cellX, candy.cellY);;) {
            if (!this.board.isCellMatchable(cellX, --up, candy.candyType) || this.grid.get(cellX, up)) break;
            result.push(cellX, up)
        }
        for (;;) {
            if (!this.board.isCellMatchable(cellX, ++down, candy.candyType) || this.grid.get(cellX, down)) break;
            result.push(cellX, down)
        }
        return result
    }, G.BoardMatcher.prototype.getBirdMatchPos = function(candy) {
        for (var result = [], cellX = candy.cellX, cellY = candy.cellY, i = 0; 4 > i; i++) this.board.isCellMatchable(cellX + this.birdCoords[i][0], cellY + this.birdCoords[i][1], candy.candyType) && this.board.isCellMatchable(cellX + this.birdCoords[i][2], cellY + this.birdCoords[i][3], candy.candyType) && this.board.isCellMatchable(cellX + this.birdCoords[i][4], cellY + this.birdCoords[i][5], candy.candyType) && result.push(cellX + this.birdCoords[i][0], cellY + this.birdCoords[i][1], cellX + this.birdCoords[i][2], cellY + this.birdCoords[i][3], cellX + this.birdCoords[i][4], cellY + this.birdCoords[i][5]);
        return result
    }, G.BoardMatcher.prototype.possibleDownMoves = [
        [-1, 1, 1, 1],
        [1, 1, 2, 1],
        [-2, 1, -1, 1],
        [0, 2, 0, 3]
    ], G.BoardMatcher.prototype.possibleRightMoves = [
        [2, 0, 3, 0],
        [1, 1, 1, 2],
        [1, -1, 1, 1],
        [1, -2, 1, -1]
    ], G.BoardMatcher.prototype.possibleLeftMoves = [
        [-3, 0, -2, 0],
        [-1, -2, -1, -1],
        [-1, -1, -1, 1],
        [-1, 1, -1, 2]
    ], G.BoardMatcher.prototype.possibleUpMoves = [
        [-1, -1, 1, -1],
        [1, -1, 2, -1],
        [-2, -1, -1, -1],
        [0, -3, 0, -2]
    ], G.BoardMatcher.prototype.horCoords = [
        [-1, 0, 1, 0],
        [-2, 0, -1, 0],
        [1, 0, 2, 0]
    ], G.BoardMatcher.prototype.verCoords = [
        [0, -1, 0, 1],
        [0, -1, 0, -2],
        [0, 1, 0, 2]
    ], G.BoardMatcher.prototype.birdCoords = [
        [-1, -1, -1, 0, 0, -1],
        [1, 0, 0, -1, 1, -1],
        [-1, 0, -1, 1, 0, 1],
        [1, 0, 0, 1, 1, 1]
    ], G.Candy = function(board, grid) {
        this.grid = grid, this.board = board, this.boardCandies = board.boardCandies, Phaser.Image.call(this, game, 0, 0), this.anchor.setTo(.5), this.wrapperImg = G.makeImage(0, 0, "blocker_chain_wrapped", .5, null), this.anchor.setTo(.5, .5), this.animationData = {
            active: !1
        }, this.fallData = {
            alpha0: this.board.cellYToPxIn(-1),
            alpha1: this.board.cellYToPxIn(0),
            alphaDistance: Math.abs(this.board.cellYToPxIn(-1) - this.board.cellYToPxIn(0)),
            active: !1,
            delay: 0,
            targetY: 0,
            targetX: 0,
            velY: 0,
            grav: G.lnf(2.5)
        }, this.kill()
    }, G.Candy.prototype = Object.create(Phaser.Image.prototype), G.Candy.prototype.init = function(cellX, cellY, type) {
        this.loadTexture(null), this.scale.setTo(1), this.candyType = !1, this.special = !1, this.specialType = !1, this.animationData.active = !1, this.fallData.active = !1, this.alpha = 1, this.angle = 0, this.scale.setTo(1), this.revive(), this.onMatchFx = !1, this.activatedByMove = !1, this.exe = [], this.matchable = !0, this.goalCandy = !1, this.blocker = !1, this.blockerHp = 0, this.wrapped = !1, this.infected = !1, this.chocolate = !1, this.cellX = cellX, this.cellY = cellY, this.x = this.board.cellXToPxIn(cellX), this.y = this.board.cellYToPxIn(cellY), this.changeInto(type, !0)
    }, G.Candy.prototype.fallTo = function(cellX, cellY, delay) {
        this.setCell(cellX, cellY), this.fallData.active || G.sb("onCandyFallStart").dispatch(this), this.fallData.active = !0, this.fallData.delay = delay || 0, this.fallData.velY = G.IMMEDIATE ? 1e3 : 0, this.fallData.targetY = this.board.cellYToPxIn(cellY), this.fallData.targetX = this.board.cellXToPxIn(cellX)
    }, G.Candy.prototype.fallFrom = function(cellY, delay) {
        G.sb("onCandyFallStart").dispatch(this), this.y = this.board.cellYToPxIn(cellY), this.fallData.active = !0, this.fallData.delay = delay || 0, this.fallData.velY = 0, this.fallData.targetX = this.board.cellXToPxIn(this.cellX), this.fallData.targetY = this.board.cellYToPxIn(this.cellY)
    }, G.Candy.prototype.movedWith = function(candy) {
        this.lastMovedWith = candy
    }, G.Candy.prototype.changeInto = function(type, skipAnim) {
        if (this.bringToTop(), G.specialCandies.isTypeSpecial(type)) {
            skipAnim || G.sb("fx").dispatch("changeCircle", this);
            var data = G.specialCandies.getSpecialData(type);
            this.special = !0, data.texture && (this.boardCandies.secondFloor.add(this), G.changeTexture(this, data.texture.replace("%CANDYTYPE%", this.candyType))), data.candyType && ("RANDOM" == data.candyType ? this.candyType = Math.random() : this.candyType = data.candyType), data.onMatchFx && (this.onMatchFx = data.onMatchFx.slice()), data.specialType && (this.specialType = data.specialType), G.sb("onCandyChangedIntoSpecial").dispatch(this.specialType), data.activatedByMove && (this.activatedByMove = !0), data.exe && (this.exe = data.exe.slice()), data.specialInit && this["changeInto" + G.capitalize(type)]()
        } else G.changeTexture(this, "candy_" + type), this.candyType = type, this.boardCandies.firstFloor.add(this); - 1 !== G.json.specialCandies.goalCandies.indexOf(this.candyType) && (this.matchable = !1,
            this.goalCandy = !0)
    }, G.Candy.prototype.changeIntoBlocker = function(hp) {
        this.blocker = !0, this.blockerHp = hp, G.changeTexture(this, "candy_blocker_" + hp), this.matchable = !1
    }, G.Candy.prototype.removeBlocker = function() {
        this.blocker = !1, G.changeTexture(this, "candy_" + this.candyType), this.matchable = !0
    }, G.Candy.prototype.prepareToProcess = function() {
        this.startAnimation("biggerAndExplode")
    }, G.Candy.prototype.wrap = function() {
        this.wrapped = !0, this.wrapperImg.alpha = 1, this.wrapperImg.scale.setTo(1), G.changeTexture(this.wrapperImg, "blocker_chain_wrapped"), this.addChild(this.wrapperImg)
    }, G.Candy.prototype.unwrap = function() {
        G.sfx.brick_break.play(), G.sb("onCollectableRemove").dispatch("chain", this), game.add.tween(this.wrapperImg).to({
            width: 1.5 * this.wrapperImg.width,
            height: 1.5 * this.wrapperImg.height,
            alpha: 0
        }, 1e3, Phaser.Easing.Cubic.Out, !0).onComplete.add(function() {
            this.removeChild(this.wrapperImg)
        }, this), G.sb("fx").dispatch("changeCircle", this), G.sb("fxTop").dispatch("burstChainAnim", this, this), G.sfx.chain_rattle.play(), this.wrapped = !1, this.board.pushToFallCheckList(this)
    }, G.Candy.prototype.coverWithChocolate = function() {
        this.chocolateHp = 2, this.chocolate = !0
    }, G.Candy.prototype.hitChocolate = function() {
        G.sb("fx").dispatch("changeCircle", this), G.sb("fx").dispatch("chocolatePart", this), G.sb("fx").dispatch("chocolatePart", this), G.sb("fx").dispatch("chocolatePart", this), G.sb("fx").dispatch("chocolatePart", this), G.sfx.explosion_subtle.play(), 1 == --this.chocolateHp || (this.chocolate = !1, this.board.fallCheckList.push(this))
    }, G.Candy.prototype.detachFromGrid = function() {
        this.boardCandies.grid.set(this.cellX, this.cellY, null)
    }, G.Candy.prototype.hit = function() {
        this.blocker && (this.blockerHp--, 0 === this.blockerHp ? (this.candyType = "blocker", this.remove()) : G.changeTexture(this, "candy_blocker_" + this.blockerHp)), "infection" == this.candyType && (G.sb("fxTop").dispatch("burstInfectionAnim", this, this), this.remove()), "chest" == this.candyType && (G.sb("onChestOpen").dispatch(this), this.remove()), this.chocolate && this.hitChocolate()
    }, G.Candy.prototype.update = function() {
        this.updateFall(), this.updateAnimation(), this.chainAttachement && (this.chainAttachement.x = this.x, this.chainAttachement.y = this.y)
    }, G.Candy.prototype.updateFall = function() {
        if (this.fallData.active) {
            if (this.fallData.delay > 0) return this.fallData.delay -= 1 * G.deltaTime;
            this.fallData.velY += this.fallData.grav * G.deltaTime, this.y += this.fallData.velY * G.deltaTime, this.y < this.fallData.alpha1 ? this.y < this.fallData.alpha0 ? this.alpha = 0 : this.alpha = Math.abs(this.fallData.alpha0 - this.y) / this.fallData.alphaDistance : this.alpha = 1;
            var xDif = this.fallData.targetX - this.x,
                yDif = this.fallData.targetY - this.y;
            Math.abs(xDif) > yDif && (this.x = this.fallData.targetX - yDif * game.math.sign(xDif)), this.y > this.fallData.targetY && (this.y = this.fallData.targetY, this.x = this.fallData.targetX, this.fallData.active = !1, this.startAnimation("bounce"), G.sfx["stone_impact_" + game.rnd.between(1, 3)].play(), G.sb("onCandyFallFinish").dispatch(this))
        }
    }, G.Candy.prototype.setCell = function(cellX, cellY) {
        this.grid.get(this.cellX, this.cellY) == this && this.grid.set(this.cellX, this.cellY, null), this.cellX = cellX, this.cellY = cellY, this.grid.set(cellX, cellY, this)
    }, G.Candy.prototype.isGoalCandy = function() {
        return -1 != this.boardCandies.goalCandies.indexOf(this)
    }, G.Candy.prototype.infect = function() {
        this.infected = !0, G.stopTweens(this.wrapperImg), this.wrapperImg.alpha = 1, this.wrapperImg.scale.setTo(1), G.changeTexture(this.wrapperImg, "infection_front"), game.add.tween(this.wrapperImg).from({
            alpha: 0,
            width: 0,
            height: 0
        }, 250, Phaser.Easing.Sinusoidal.Out, !0), this.addChild(this.wrapperImg), G.sb("onCandyInfect").dispatch(this)
    }, G.Candy.prototype.removeInfection = function() {
        G.sb("fxTop").dispatch("burstInfectionAnim", this, this), this.infected = !1, G.stopTweens(this.wrapperImg), this.board.pushToFallCheckList(this), game.add.tween(this.wrapperImg).to({
            alpha: 0
        }, 250, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            this.removeChild(this.wrapperImg)
        }, this), G.sb("onCandyInfectionRemove").dispatch(this)
    }, G.Candy.prototype.match = function(delay, cellX, cellY) {
        if (this.matchable) {
            if (this.wrapped) return this.unwrap();
            if (this.infected) return this.removeInfection();
            if (!this.animationData.active) return this.detachFromGrid(), G.sb("onCandyMatch").dispatch(this), this.special ? (this.onMatchFx && this.onMatchFx.forEach(function(child) {
                G.sb("fx").dispatch(child[0], this, child[1], this)
            }, this), game.camera.shake(.0075, 250), this.boardCandies.thirdFloor.add(this), this.startAnimation("growAndFade", delay)) : G.lvl.isGoal(this.candyType) ? this.remove() : void("undefined" == typeof cellX ? this.startAnimation("vanishAlphaBurst", delay) : this.startAnimation("moveTo", [delay, cellX, cellY]))
        }
    }, G.Candy.prototype.remove = function() {
        this.boardCandies.removeCandy(this)
    }, G.Candy.prototype.updateAnimation = function() {
        this.animationData.active && (this.animationData.func && this.animationData.func.call(this), this.animationData.active || G.sb("onCandyAnimationFinish").dispatch())
    }, G.Candy.prototype.startAnimation = function(type, args) {
        return this.animationData.active ? alert("during another animation") : void(this["animation-init-" + type] && (G.sb("onCandyAnimationStart").dispatch(), this.animationData.active = !0, this["animation-init-" + type](args)))
    }, G.Candy.prototype["animation-init-bounce"] = function() {
        return G.IMMEDIATE ? (this.animationData.active = !1, void G.sb("onCandyAnimationFinish").dispatch(this)) : void game.add.tween(this).to({
            y: this.y - G.l(5)
        }, 100, Phaser.Easing.Sinusoidal.Out, !0, 0, 0, !0).onComplete.add(function() {
            this.animationData.active = !1, G.sb("onCandyAnimationFinish").dispatch(this)
        }, this)
    }, G.Candy.prototype["animation-init-vanishAlphaBurst"] = function(delay) {
        G.sb("fx").dispatch("burstCandy", this, this), G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
    }, G.Candy.prototype["animation-init-vanish"] = function(delay) {
        return G.IMMEDIATE ? (G.sb("onCandyAnimationFinish").dispatch(this), this.remove(), void this.scale.setTo(1)) : void game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0, delay || 0).onComplete.add(function() {
            G.sb("onCandyAnimationFinish").dispatch(this), this.remove(), this.scale.setTo(1)
        }, this)
    }, G.Candy.prototype["animation-init-scaleEndlessly"] = function() {
        G.IMMEDIATE || game.add.tween(this.scale).to({
            x: .5,
            y: .5
        }, 300, Phaser.Easing.Sinusoidal.In, !0, 0, -1, !0)
    }, G.Candy.prototype["animation-init-shrink"] = function() {
        this.boardCandies.thirdFloor.add(this), this.bringToTop();
        game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function() {
            G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
        }, this)
    }, G.Candy.prototype["animation-init-growAndFade"] = function() {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), void this.remove();
        this.boardCandies.thirdFloor.add(this), this.bringToTop();
        var scaleTween = game.add.tween(this.scale).to({
            x: 2.5,
            y: 2.5
        }, 200, Phaser.Easing.Sinusoidal.In, !0);
        game.add.tween(this).to({
            alpha: 0
        }, 100, Phaser.Easing.Sinusoidal.In, !0, 100).onComplete.add(function() {
            scaleTween.stop(), G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
        }, this)
    }, G.Candy.prototype["animation-init-biggerAndExplode"] = function(delay) {
        return G.IMMEDIATE ? (this.board.checkSpecialMatchList.push(this), this.burst = !0, this.readyToProcess = !0, G.sb("onCandyAnimationFinish").dispatch(this), void this.remove()) : void(delay ? game.time.events.add(delay, function() {
            this.bringToTop(), game.add.tween(this.scale).to({
                x: 1.5,
                y: 1.5
            }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function() {
                this.board.checkSpecialMatchList.push(this), this.burst = !0, this.readyToProcess = !0, G.sb("onCandyAnimationFinish").dispatch(this), this.remove(), this.scale.setTo(1)
            }, this)
        }, this) : (this.bringToTop(), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function() {
            this.board.checkSpecialMatchList.push(this), this.burst = !0, this.readyToProcess = !0, G.sb("onCandyAnimationFinish").dispatch(this), this.remove(), this.scale.setTo(1)
        }, this)))
    }, G.Candy.prototype["animation-init-moveTo"] = function(args) {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), void this.remove();
        if (args[0]) game.time.events.add(args[0], function() {
            var moveTween = game.add.tween(this).to({
                x: this.board.cellXToPxIn(args[1]),
                y: this.board.cellYToPxIn(args[2])
            }, 300, Phaser.Easing.Sinusoidal.In, !0);
            game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Sinusoidal.In, !0, 100).onComplete.add(function() {
                moveTween.stop(), G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
            }, this)
        }, this);
        else {
            var moveTween = game.add.tween(this).to({
                x: this.board.cellXToPxIn(args[1]),
                y: this.board.cellYToPxIn(args[2])
            }, 300, Phaser.Easing.Sinusoidal.In, !0);
            game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Sinusoidal.In, !0, 100).onComplete.add(function() {
                moveTween.stop(), G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
            }, this)
        }
    }, G.Candy.prototype["animation-init-moveToCombo"] = function(args) {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), void this.remove();
        if (0 !== args[3]) var rotateTween = game.add.tween(this).to({
            angle: args[3]
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0);
        var moveTween = game.add.tween(this).to({
            x: this.board.cellXToPxIn(args[1]),
            y: this.board.cellYToPxIn(args[2])
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0);
        game.add.tween(this).to({
            alpha: .8
        }, 200, Phaser.Easing.Sinusoidal.In, !0, 200).onComplete.add(function() {
            moveTween.stop(), rotateTween && rotateTween.stop(), G.sb("onCandyAnimationFinish").dispatch(this), game.time.events.add(1, this.remove, this)
        }, this)
    }, G.Candy.prototype.moveTo = function(cellX, cellY, scale) {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), this.cellX = newCell[0], this.cellY = newCell[1], this.animationData.active = !1, void this.boardCandies.grid.set(this.cellX, this.cellY, this);
        var newCell = (this.board.getCandy(cellX, cellY), [cellX, cellY]);
        this.bringToTop(), G.sb("onCandyAnimationStart").dispatch(), this.animationData.active = !0, scale && game.add.tween(this.scale).to({
            x: 2 * this.scale.x,
            y: 2 * this.scale.y
        }, 250, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), game.add.tween(this).to({
            x: this.board.cellXToPxIn(cellX),
            y: this.board.cellYToPxIn(cellY)
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function() {
            G.sb("onCandyAnimationFinish").dispatch(this), this.cellX = newCell[0], this.cellY = newCell[1], this.animationData.active = !1, this.boardCandies.grid.set(this.cellX, this.cellY, this)
        }, this)
    }, G.Candy.prototype.shuffleMoveToOwnCell = function() {
        var orgParent = this.parent;
        this.special ? this.boardCandies.thirdFloor.add(this) : this.boardCandies.secondFloor.add(this), G.sb("onCandyAnimationStart").dispatch(), this.animationData.active = !0, game.add.tween(this).to({
            x: this.board.cellXToPxIn(this.cellX),
            y: this.board.cellYToPxIn(this.cellY)
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function() {
            orgParent.add(this), G.sb("onCandyAnimationFinish").dispatch(this), this.animationData.active = !1
        }, this)
    }, G.CandySelection = function(board) {
        G.Image.call(this, 0, 0, null, .5), this.board = board, this.alpha = 0, game.add.existing(this), this.selection = G.makeImage(0, 0, "selected_cookie_new", .5, this), game.add.tween(this.selection.scale).to({
            x: 1.2,
            y: 1.2
        }, 800, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.frameIndex = 0, this.every = 3, this.frameCounter = 0, this.scale = this.board.scale
    }, G.CandySelection.prototype = Object.create(G.Image.prototype), G.CandySelection.prototype.selectCandy = function(candy) {
        this.alpha = 1, this.x = this.board.boardCandies.x + candy.x * this.board.scale.x, this.y = this.board.boardCandies.y + candy.y * this.board.scale.y
    }, G.CandySelection.prototype.hide = function() {
        this.alpha = 0
    }, G.AttachementsGroup = function() {
        Phaser.Group.call(this, game), this.deadArray = []
    }, G.AttachementsGroup.prototype = Object.create(Phaser.Group.prototype), G.AttachementsGroup.prototype.attach = function(type, obj) {
        var part;
        return part = this.deadArray.length > 0 ? this.deadArray.pop() : new G.AttachementPart, part.init(type, obj), this.add(part), part
    }, G.AttachementPart = function() {
        Phaser.Image.call(this, game, 0, 0, null), this.anchor.setTo(.5), this.kill()
    }, G.AttachementPart.prototype = Object.create(Phaser.Image.prototype), G.AttachementPart.prototype.init = function(type, obj) {
        this.attachement = obj, this.position = obj.position, this.scale = obj.scale, this.position, this["init" + G.capitalize(type)](obj), this.revive()
    }, G.AttachementPart.prototype.postUpdate = function() {
        this.alive && (this.rotation = this.attachement.rotation)
    }, G.AttachementPart.prototype.remove = function() {
        this.kill(), this.parent.deadArray.push(this), this.parent.removeChild(this)
    }, G.AttachementPart.prototype.detach = function() {
        this.position = new Phaser.Point(this.x, this.y)
    }, G.AttachementPart.prototype.initChain = function(obj) {
        G.changeTexture(this, "blocker_chain_wrapped")
    }, G.BoardFallMgr = function(board, refiller) {
        this.board = board, this.boardData = board.boardData, this.refiller = refiller, this.refillData = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    }, G.BoardFallMgr.prototype.allCollumsFall = function() {
        this.refillData = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        for (var i = 0; i < this.boardData.width; i++) this.collumnFall(i)
    }, G.BoardFallMgr.prototype.collumnFall = function(coll) {
        for (var row = this.boardData.height - 1; row >= 0; row--)
            if ("X" != this.boardData.get(coll, row) && !this.board.getCandy(coll, row) && !this.board.boardIce.isToken(coll, row)) {
                for (var candyToFall = !1, rowCheck = row; rowCheck >= 0; rowCheck--) {
                    var candyToFall = this.board.getCandy(coll, rowCheck);
                    if (this.board.isMoveBlocked(coll, rowCheck)) {
                        candyToFall = !0;
                        break
                    }
                    if (candyToFall && this.board.isMoveable(coll, rowCheck)) {
                        candyToFall.fallTo(coll, row);
                        break
                    }
                }
                candyToFall || this.board.newFallingCandy(coll, row, this.refiller.getTypeToDrop(coll), this.refillData[coll]--)
            }
    }, G.BoardFallMgr.prototype.collumnFall = function(coll) {
        for (var row = this.boardData.height - 1; row >= 0; row--)
            if ("X" != this.boardData.get(coll, row) && !this.board.getCandy(coll, row) && !this.board.boardIce.isToken(coll, row)) {
                for (var candyToFall = !1, rowCheck = row; rowCheck >= 0; rowCheck--) {
                    var candyToFall = this.board.getCandy(coll, rowCheck);
                    if (this.board.isMoveBlocked(coll, rowCheck)) {
                        candyToFall = !0;
                        break
                    }
                    if (candyToFall && this.board.isMoveable(coll, rowCheck)) {
                        candyToFall.fallTo(coll, row);
                        break
                    }
                }
                candyToFall || this.board.newFallingCandy(coll, row, this.refiller.getTypeToDrop(coll), this.refillData[coll]--)
            }
    }, G.BoardFallMgr.prototype.isCellSolid = function(cellX, cellY) {
        return cellY == this.boardData.height || "X" == this.boardData.get(cellX, cellY) ? !0 : this.board.getCandy(cellX, cellY)
    }, G.BoardFallMgr.prototype.crossCollumnFall = function() {
        for (var wasMoved = !1, val = 1, row = this.boardData.height - 1; row >= 0; row--)
            for (var coll = 0; coll < this.boardData.width; coll++)
                if (this.board.isCellOnBoard(coll, row) && !this.isCellSolid(coll, row) && this.isCellSolid(coll, row + 1) && !this.board.isMoveBlocked(coll, row)) {
                    if (this.board.isMoveable(coll + val, row - 1)) {
                        this.board.getCandy(coll + val, row - 1).fallTo(coll, row), this.collumnFall(coll + val), wasMoved = !0;
                        continue
                    }
                    if (this.board.isMoveable(coll - val, row - 1)) {
                        this.board.getCandy(coll - val, row - 1).fallTo(coll, row), this.collumnFall(coll - val), wasMoved = !0;
                        continue
                    }
                    val *= -1
                }
        return wasMoved
    }, G.InputController = function(boardObj) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.board = boardObj, this.booster = null, this.clicked = !1, this.clickedCell = !1, this.anyWindowOpen = !1, this.possibleCandies = [], G.sb("onWindowOpened").add(function() {
            this.anyWindowOpen = !0
        }, this), G.sb("onAllWindowsClosed").add(function() {
            this.anyWindowOpen = !1
        }, this), this.state.EDITOR || game.input.onDown.add(this.onClick, this), game.input.onUp.add(function() {
            this.clicked = !1
        }, this), this.locked = !1
    }, G.InputController.prototype = Object.create(Phaser.Group.prototype), G.InputController.prototype.update = function() {
        this.board.tileShade.visible = !1;
        var over = this.pointerToCell2(game.input.activePointer);
        if (game.device.desktop && !G.lvl.goalAchieved && this.board.isCellOnBoard(over[0], over[1]) && (this.board.tileShade.visible = !0, this.board.tileShade.x = this.board.cellXToPxIn(over[0]), this.board.tileShade.y = this.board.cellYToPxIn(over[1])), this.canMakeMove() && this.clicked) {
            if (this.possibleCandies.length > 0 && (-1 == this.possibleCandies.indexOf(this.board.getCandy(this.clickedCell)) || -1 == this.possibleCandies.indexOf(this.board.getCandy(over)))) return;
            over && this.board.isMoveable(over) && this.areNeighbours(this.clickedCell, over) && this.board.getCandy(over) && (this.board.makeMove(this.board.getCandy(this.clickedCell), this.board.getCandy(over)), this.clicked = !1, this.clickedCell = null)
        }
    }, G.InputController.prototype.canMakeMove = function() {
        return this.locked ? !1 : this.board.actionManager.noAction ? G.lvl.goalAchieved ? !1 : this.anyWindowOpen ? !1 : !0 : !1
    }, G.InputController.prototype.onClick = function(pointer) {
        if (this.canMakeMove()) {
            var cell = this.pointerToCell(pointer);
            if (cell && this.board.isMoveable(cell[0], cell[1]) && this.board.getCandy(cell)) {
                if (G.sfx.pop.play(), 0 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE-04_TapOnGrid") : 1 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE-14_Level2TapOnGrid") : 2 === G.lvl.lvlNr && G.gameTracking.FTUEDesign("FTUE-21_Level3TapOnGrid"), this.clickedCell && Math.abs(this.clickedCell[0] - cell[0]) + Math.abs(this.clickedCell[1] - cell[1]) == 1) {
                    if (!(this.possibleCandies.length > 0)) return this.board.makeMove(this.board.getCandy(this.clickedCell), this.board.getCandy(cell)), this.clickedCell = null, void(this.clicked = !1);
                    if (this.possibleCandies.indexOf(this.board.getCandy(this.clickedCell)) > -1 && this.possibleCandies.indexOf(this.board.getCandy(cell)) > -1) return this.board.makeMove(this.board.getCandy(this.clickedCell), this.board.getCandy(cell)), this.clickedCell = null, void(this.clicked = !1)
                }
                this.clicked = !0, this.clickedCell = cell
            }
        }
    }, G.InputController.prototype.pointerToCell = function(pointer) {
        if (this.anyWindowOpen) return !1;
        var xx = pointer.worldX,
            yy = pointer.worldY;
        return this.isPointerInRange(pointer) ? [Math.floor((xx - (this.board.x + this.board.offsetX)) / (this.board.tilesize * this.board.scale.x)), Math.floor((yy - (this.board.y + this.board.offsetY)) / (this.board.tilesize * this.board.scale.y))] : !1
    }, G.InputController.prototype.pointerToCell2 = function(pointer) {
        var xx = pointer.worldX,
            yy = pointer.worldY;
        return [Math.floor((xx - (this.board.x + this.board.offsetX)) / (this.board.tilesize * this.board.scale.x)), Math.floor((yy - (this.board.y + this.board.offsetY)) / (this.board.tilesize * this.board.scale.y))]
    }, G.InputController.prototype.isPointerInRange = function(pointer) {
        var x = pointer.worldX,
            y = pointer.worldY;
        return !(x < this.board.x + this.board.offsetX || x > this.board.x + this.board.offsetX + this.board.width || y < this.board.y + this.board.offsetY || y > this.board.y + this.board.offsetY + this.board.height)
    }, G.InputController.prototype.areNeighbours = function(cell1, cell2) {
        return cell1[0] == cell2[0] ? 1 == Math.abs(cell1[1] - cell2[1]) : cell1[1] == cell2[1] ? 1 == Math.abs(cell1[0] - cell2[0]) : void 0
    }, G.MatchList = function() {
        this.list = []
    }, G.MatchList.prototype.push = function(array) {
        for (var i = 0, len = this.list.length; len > i; i++)
            if (this.list[i][0] == array[0] && this.list[i][1] == array[1]) return;
        this.list.push(array)
    }, G.MatchList.prototype.remove = function(array) {
        for (var i = 0, len = this.list.length; len > i; i++)
            if (this.list[i][0] == array[0] && this.list[i][1] == array[1]) return void this.list.splice(i, 1)
    }, G.MatchList.prototype.addHorizontal = function(cellFrom, cellTo, cellY) {
        for (; cellTo >= cellFrom; cellFrom++) this.push([cellFrom, cellY])
    }, G.MatchList.prototype.addVertical = function(cellX, cellFrom, cellTo) {
        for (; cellFrom >= cellTo; cellFrom--) this.push([cellX, cellFrom])
    }, G.MatchList.prototype.loop = function(func, context) {
        for (var i = 0, len = this.list.length; len > i; i++) func.call(context || this, this.list[i])
    }, G.Refiller = function(lvl, board) {
        this.board = board, this.drops = lvl.drops, this.goalDrops = lvl.goalDrops ? JSON.parse(JSON.stringify(lvl.goalDrops)) : [], this.predefinedDrops = lvl.predefinedDrops ? JSON.parse(JSON.stringify(lvl.predefinedDrops)) : [], "undefined" == typeof this.drops.chest && (this.drops.chest = 0), "undefined" == typeof this.drops.infection && (this.drops.infection = 0), "undefined" == typeof this.drops.chain && (this.drops.chain = 0), "undefined" == typeof this.drops.goalCandy && (this.drops.goalCandy = 0), this.drops.chest *= G.lvl.coinChanceProb
    }, G.Refiller.prototype.getTypeToDrop = function(column) {
        var pre = this.checkPredifinedDrops(column);
        if (pre) return "r" === pre && (pre = game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY)), pre;
        this.substractGoalDropCounter();
        var goalDrop = this.checkGoalDropList();
        if (goalDrop) return goalDrop;
        var goalCandy = Math.random() < this.drops.goalCandy / 100,
            chest = Math.random() < this.drops.chest / 100,
            chain = Math.random() < this.drops.chain / 100,
            infection = Math.random() < this.drops.infection / 100;
        if (goalCandy) return "goalCandy";
        if (chest) return "chest";
        if (infection) return "infection";
        var rndType = game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY);
        return chain && (rndType = "CHAIN" + rndType, 0 == rndType && alert(rndType)), rndType
    }, G.Refiller.prototype.checkPredifinedDrops = function(column) {
        return this.predefinedDrops[column] ? this.predefinedDrops[column].shift() : null
    }, G.Refiller.prototype.checkGoalDropList = function() {
        for (var i = 0, len = this.goalDrops.length; len > i; i++)
            if (this.goalDrops[i][1] <= 0) {
                var result = this.goalDrops[i][0];
                return this.goalDrops.splice(i, 1), result
            }
        return !1
    }, G.Refiller.prototype.substractGoalDropCounter = function() {
        for (var i = 0, len = this.goalDrops.length; len > i; i++) this.goalDrops[i][1] = this.goalDrops[i][1] - 1
    }, G.Action = function(board, am, args) {
        this.state = game.state.getCurrentState(), this.board = board, this.am = am, this.args = args
    }, G.Action.prototype.finish = function() {
        this.am.removeAction(this)
    }, G.ActionBoosterMatch = function(board, am, args) {
        G.Action.call(this, board, am, args), this.clickedCandy = !1, this.availableCandies = [], this.inputController = this.board.inputController, this.signalBinding = game.input.onDown.add(function(pointer) {
            var cell = this.inputController.pointerToCell(pointer);
            if (cell) {
                var candy = this.board.getCandy(cell[0], cell[1]);
                !candy || 0 != this.availableCandies.length && -1 == this.availableCandies.indexOf(candy) || (G.sfx.pop.play(), this.clickedCandy = candy, G.saveState.useBooster(this.args[0]))
            }
        }, this), this.boosterInit = !1
    }, G.ActionBoosterMatch.prototype = Object.create(G.Action.prototype), G.ActionBoosterMatch.prototype.update = function() {
        this.clickedCandy && (this.boosterInit || this.board.duringAnimation || this.board.duringFall || (this.boosterInit = !0, this.signalBinding.detach(), 3 == this.args[0] ? this.board.boardCandies.boosterFxGroup.add(new G.BoosterHorizontal(this.clickedCandy.cellX, this.clickedCandy.cellY, this.args[0])) : 4 == this.args[0] ? this.board.boardCandies.boosterFxGroup.add(new G.BoosterVertical(this.clickedCandy.cellX, this.clickedCandy.cellY, this.args[0])) : this.board.boardCandies.boosterFxGroup.add(new G.Booster(this.clickedCandy.cellX, this.clickedCandy.cellY, this.args[0]))))
    }, G.ActionBoosterMatch.prototype.finish = function() {
        this.signalBinding.detach(), this.am.removeAction(this)
    }, G.ActionBoosterSwap = function(board, am, args) {
        G.Action.call(this, board, am, args), this.availableCandies = [], this.clickedCandy = !1, this.clickedCandy2 = !1, this.madeMove = !1, this.inputController = this.board.inputController, this.signalBinding = game.input.onDown.add(function(pointer) {
            var cell = this.inputController.pointerToCell(pointer);
            if (cell && this.board.isMoveable(cell[0], cell[1])) {
                var candy = this.board.getCandy(cell[0], cell[1]);
                if (candy.goalCandy) return;
                if (!this.clickedCandy && (0 == this.availableCandies.length || -1 != this.availableCandies.indexOf(candy))) return this.selection = this.board.candySelection, this.selection.selectCandy(candy), G.sb("onBoosterSwapCandySelect").dispatch(candy), this.clickedCandy = candy;
                if (this.clickedCandy != candy && (0 == this.availableCandies.length || -1 != this.availableCandies.indexOf(candy))) {
                    if (G.lvl.tutOpen) {
                        var tut = game.state.getCurrentState().tut;
                        game.add.tween(tut.hand).to({
                            alpha: 0
                        }, 300, Phaser.Easing.Sinusoidal.In, !0)
                    }
                    this.clickedCandy2 = candy, G.saveState.useBooster(1)
                }
            }
        }, this)
    }, G.ActionBoosterSwap.prototype = Object.create(G.Action.prototype), G.ActionBoosterSwap.prototype.update = function() {
        this.clickedCandy && this.clickedCandy2 && (this.madeMove || (this.madeMove = !0, this.signalBinding.detach(), this.selection && this.selection.hide(), this.clickedCandy2.moveTo(this.clickedCandy.cellX, this.clickedCandy.cellY), this.clickedCandy.moveTo(this.clickedCandy2.cellX, this.clickedCandy2.cellY, !0)), this.board.duringAnimation || this.board.duringFall || (this.board.matcher.isMoveValid(this.clickedCandy) && this.board.checkMatchList.push(this.clickedCandy), this.board.matcher.isMoveValid(this.clickedCandy2) && this.board.checkMatchList.push(this.clickedCandy2), this.board.checkMatchList.length > 0 && this.am.newAction("processMatch"), G.sb("onBoosterActionFinished").dispatch(), this.finish()))
    }, G.ActionBoosterSwap.prototype.finish = function() {
        this.selection && this.selection.hide(), this.signalBinding.detach(), this.am.removeAction(this)
    }, G.ActionMove = function(board, am, args) {
        G.Action.call(this, board, am, args), this.candy1 = args[0], this.candy1orgParent = this.candy1.parent, this.candy2 = args[1], this.candy2orgParent = this.candy2.parent, this.forceMove = args[2], this.back = !1, this.startAnimation()
    }, G.ActionMove.prototype = Object.create(G.Action.prototype), G.ActionMove.prototype.update = function() {
        if (this.updateAnimation(), this.progress += .075 * G.deltaTime, this.progress >= 1) {
            if (this.finishAnimation(), this.back) return this.finish();
            if (this.candy1.movedWith(this.candy2), this.candy2.movedWith(this.candy1), this.candy1.special && this.candy2.special) {
                if (this.checkCombo(this.candy1, this.candy2)) return G.lvl.madeMove(), this.am.newAction("processMatch"), this.finish();
                if ("spiral" == this.candy1.specialType || "spiral" == this.candy2.specialType) {
                    var spiral = "spiral" == this.candy1.specialType ? this.candy1 : this.candy2,
                        other = "spiral" != this.candy1.specialType ? this.candy1 : this.candy2;
                    return other.startAnimation("moveTo", [0, spiral.cellX, spiral.cellY]), spiral.exe = [
                        ["changeTypeInto", other.candyType >= 1 ? other.candyType : game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY), other.specialType]
                    ], this.board.checkMatchList.push(spiral), G.lvl.madeMove(), this.am.newAction("processMatch"), this.finish()
                }
                return this.candy1.activatedByMove = !0, this.candy2.activatedByMove = !0, this.board.checkMatchList.push(this.candy1), this.board.checkMatchList.push(this.candy2), G.lvl.madeMove(), this.am.newAction("processMatch"), this.finish()
            }
            if (this.additionalChecks(this.candy1, this.candy2) && (this.board.matcher.isMoveValid(this.candy1) && this.board.checkMatchList.push(this.candy1), this.board.matcher.isMoveValid(this.candy2) && this.board.checkMatchList.push(this.candy2)), 0 != this.board.checkMatchList) return this.candy1.movedWith(this.candy2), this.candy2.movedWith(this.candy1), this.forceMove || G.lvl.madeMove(), this.am.newAction("processMatch"), this.finish();
            this.back || this.forceMove ? this.finish() : (this.back = !0, this.startAnimation())
        }
    }, G.ActionMove.prototype.additionalChecks = function(candy1, candy2) {
        var spiralBomb = [candy1, candy2].find(function(c) {
                return "spiral" == c.specialType
            }),
            goalCandy = [candy1, candy2].find(function(c) {
                return "goalCandy" === c.candyType
            }),
            chest = [candy1, candy2].find(function(c) {
                return "chest" === c.candyType
            });
        return spiralBomb && goalCandy || spiralBomb && chest ? !1 : !0
    }, G.ActionMove.prototype.startAnimation = function() {
        G.sfx.exchange.play(), this.candy1anim = {
            startX: this.candy1.x,
            deltaX: this.candy2.x - this.candy1.x,
            startY: this.candy1.y,
            deltaY: this.candy2.y - this.candy1.y
        }, this.board.boardCandies.secondFloor.add(this.candy1), this.candy2anim = {
            startX: this.candy2.x,
            deltaX: this.candy1.x - this.candy2.x,
            startY: this.candy2.y,
            deltaY: this.candy1.y - this.candy2.y
        }, this.board.boardCandies.secondFloor.add(this.candy2), this.candy1.bringToTop(), this.progress = 0, G.IMMEDIATE && (this.progress = 1)
    }, G.ActionMove.prototype.finishAnimation = function() {
        this.board.swapCandies(this.candy1, this.candy2), this.candy1.x = this.board.cellXToPxIn(this.candy1.cellX), this.candy1.y = this.board.cellYToPxIn(this.candy1.cellY), this.candy1.scale.setTo(1), this.candy1orgParent.add(this.candy1), this.candy2.x = this.board.cellXToPxIn(this.candy2.cellX), this.candy2.y = this.board.cellYToPxIn(this.candy2.cellY), this.candy2orgParent.add(this.candy2)
    }, G.ActionMove.prototype.updateAnimation = function() {
        var animProgress = Phaser.Easing.Sinusoidal.InOut(this.progress);
        this.candy1.x = this.candy1anim.startX + animProgress * this.candy1anim.deltaX, this.candy1.y = this.candy1anim.startY + animProgress * this.candy1anim.deltaY, this.candy1.scale.setTo(2 - 2 * Math.abs(.5 - animProgress)), this.candy2.x = this.candy2anim.startX + animProgress * this.candy2anim.deltaX, this.candy2.y = this.candy2anim.startY + animProgress * this.candy2anim.deltaY
    }, G.ActionMove.prototype.checkCombo = function(candy1, candy2) {
        for (var combo, i = 0, len = G.specialCandies.combos.length; len > i; i++)
            if (combo = G.specialCandies.combos[i], candy1.specialType == combo[0] && candy2.specialType == combo[1] || candy1.specialType == combo[1] && candy2.specialType == combo[0]) {
                var moveRot = combo[3];
                return "vertical" != combo[0] && "horizontal" != combo[0] || "cross" != combo[1] || ("vertical" == candy1.specialType || "horizontal" == candy1.specialType) && (game.add.tween(candy1).to({
                    angle: combo[3]
                }, 300, Phaser.Easing.Sinusoidal.InOut, !0), moveRot = 0), candy1.changeInto(combo[2]), candy2.detachFromGrid(), candy2.startAnimation("moveToCombo", [0, candy1.cellX, candy1.cellY, moveRot]), candy1.onMatchFx || (candy1.onMatchFx = []), candy1.onMatchFx.push(["dummyComboGrowAndFade", [candy2.frameName, moveRot]]), candy2.bringToTop(), candy2.candyType = Math.random(), candy1.activatedByMove = !0, this.board.checkMatchList.push(this.candy1), !0
            }
        return !1
    }, G.ActionProcessFall = function(board, am, args) {
        G.Action.call(this, board, am, args), this.madeCrossCollumn = !1, this.board.fallMgr.allCollumsFall()
    }, G.ActionProcessFall.prototype = Object.create(G.Action.prototype), G.ActionProcessFall.prototype.update = function() {
        if (!this.board.duringAnimation && !this.board.duringFall) {
            if (!this.madeCrossCollumn) {
                for (;;)
                    if (!this.board.fallMgr.crossCollumnFall()) break;
                return void(this.madeCrossCollumn = !0)
            }
            if (this.board.fallCheckList.forEach(function(candy) {
                    this.board.matcher.quickMatchCheck(candy) && this.board.checkMatchList.push(candy)
                }, this), this.board.fallCheckList = [], 0 != this.board.checkMatchList || this.board.checkAfterFall.length > 0) {
                for (var i = 0, len = this.board.checkAfterFall.length; len > i; i++) this.board.checkMatchList.push(this.board.checkAfterFall[i]);
                this.board.checkAfterFall = [], this.am.newAction("processMatch")
            }
            G.sb("actionFallEnd").dispatch(), this.board.checkGoalCandy(), this.finish()
        }
    }, G.ActionProcessMatch = function(board, am, args) {
        G.Action.call(this, board, am, args), this.preFall = !0, this.processed = !1
    }, G.ActionProcessMatch.prototype = Object.create(G.Action.prototype), G.ActionProcessMatch.prototype.update = function() {
        this.board.duringAnimation || this.board.duringFall || this.board.matcher.processMatchList(), this.board.duringAnimation || this.board.duringFall || 0 != this.board.checkMatchList || 0 != this.board.checkSpecialMatchList || (this.am.newAction("processFall"), this.finish())
    }, G.ActionShuffle = function(board, am, args) {
        G.Action.call(this, board, am, args), this.state = game.state.getCurrentState(), this.board = this.state.board, this.shuffleText = new G.Text(0, 0, G.txt("No possible match - shuffling"), {
            style: "font-blue",
            fontSize: "70px"
        }, .5, 620), this.shuffleText.position.setTo(this.board.x + .5 * (this.board.width - 2 * this.board.tilesize), this.board.y + .45 * (this.board.height - 2 * this.board.tilesize)), game.state.getCurrentState().UIFxLayer.add(this.shuffleText), this.shuffleText.scale.setTo(0), game.add.tween(this.shuffleText.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Elastic.Out, !0), this.updateActive = !1, game.add.tween(this.shuffleText).to({
            alpha: 0
        }, G.IMMEDIATE ? 1 : 300, Phaser.Easing.Sinusoidal.Out, !0, G.IMMEDIATE ? 10 : 2e3).onComplete.add(function() {
            this.board.shuffleCandies(), this.updateActive = !0, this.shuffleText.destroy()
        }, this)
    }, G.ActionShuffle.prototype = Object.create(G.Action.prototype), G.ActionShuffle.prototype.update = function() {
        this.updateActive && (this.board.duringAnimation || this.board.duringFall || (this.updateActive = !1, 0 == this.board.checkMatchList.length ? this.finish() : G.IMMEDIATE ? this.finish() : game.time.events.add(300, this.finish, this)))
    }, G.ActionStartBoosters = function(board, am, args) {
        G.Action.call(this, board, am, args), this.state = game.state.getCurrentState(), this.boosters = [], this.popCounter = 0, this.positions = this.generatePositions(), this.positionIndex = 0;
        this.delay = 500, this.delayIncrease = 200;
        var startBoosters = this.state.startBoosters || [];
        this.normals = this.getTargetCandies(), this.normalsIndex = 0, this.initStartBoosters(startBoosters), G.MYSTERYGIFT && this.initMysteryGifts(G.saveState.mysteryGift_getCurrentGifts()),
            this.state.UIFxLayer.addMultiple(this.boosters), this.boosters.forEach(function(booster) {
                booster.events.onDestroy.add(function() {
                    this.popCounter++
                }, this)
            }, this)
    }, G.ActionStartBoosters.prototype = Object.create(G.Action.prototype), G.ActionStartBoosters.prototype.update = function() {
        this.popCounter == this.boosters.length && this.finish()
    }, G.ActionStartBoosters.prototype.generatePositions = function() {
        for (var result = [], xx = .15; .85 >= xx; xx += .14)
            for (var yy = .15; .85 >= yy; yy += .14) result.push([xx + game.rnd.realInRange(-.02, .02), yy + game.rnd.realInRange(-.02, .02)]);
        return Phaser.ArrayUtils.shuffle(result)
    }, G.ActionStartBoosters.prototype.initStartBoosters = function(startBoosters) {
        if (startBoosters[5]) {
            G.saveState.useStartBooster(5);
            var bubble = new G.StartBoosterBubble(this.positions[this.positionIndex++], "ui_booster_5", this.state.topBar.movesTxt, function() {
                G.lvl.changeMoveNumber(5)
            });
            bubble.goToTarget(this.delay), this.delay += this.delayIncrease, this.boosters.push(bubble), G.sb("onStartBoosterUsed").dispatch(6)
        }
        if (startBoosters[7]) {
            for (var i = 0; 3 > i; i++)
                if (this.normals[this.normalsIndex + 1]) {
                    var bubble = new G.StartBoosterBubble(this.positions[this.positionIndex++], "ui_booster_7", this.normals[this.normalsIndex++], function() {
                        this.target.changeInto(Math.random() < .5 ? "vertical" : "horizontal")
                    });
                    bubble.goToTarget(this.delay), this.delay += this.delayIncrease, this.boosters.push(bubble), G.sb("onStartBoosterUsed").dispatch(7)
                }
            G.saveState.useStartBooster(7)
        }
        if (startBoosters[8] && this.normals[this.normalsIndex + 1]) {
            G.saveState.useStartBooster(8);
            var bubble = new G.StartBoosterBubble(this.positions[this.positionIndex++], "ui_booster_8", this.normals[this.normalsIndex++], function() {
                this.target.changeInto("spiral")
            });
            bubble.goToTarget(this.delay), this.delay += this.delayIncrease, this.boosters.push(bubble), G.sb("onStartBoosterUsed").dispatch(8)
        }
    }, G.ActionStartBoosters.prototype.initMysteryGifts = function(mysteryGifts) {
        mysteryGifts.forEach(this.addChangeIntoBooster, this)
    }, G.ActionStartBoosters.prototype.addChangeIntoBooster = function(giftType) {
        var iconMap = {
                cross: "ui_booster_9",
                vertical: "ui_booster_3",
                spiral: "ui_booster_8",
                horizontal: "ui_booster_4"
            },
            gemTarget = this.normals[this.normalsIndex + 1];
        if (gemTarget) {
            var icon = iconMap[giftType].replace("%%", gemTarget.frameName),
                bubble = new G.StartBoosterBubble(this.positions[this.positionIndex], icon, gemTarget, function() {
                    this.target.changeInto(giftType)
                });
            this.normalsIndex++, this.positionIndex++, bubble.goToTarget(this.delay), this.delay += this.delayIncrease, this.boosters.push(bubble)
        }
    }, G.ActionStartBoosters.prototype.getTargetCandies = function() {
        var normals = this.board.boardCandies.getNormalCandies();
        Phaser.ArrayUtils.shuffle(normals);
        var filtered = [],
            neighbours = [];
        return normals.forEach(function(g) {
            var isNeighbour = filtered.find(function(elem) {
                return this.board.boardCandies.areCandiesNeighbours(g, elem)
            }, this);
            isNeighbour ? neighbours.push(g) : filtered.push(g)
        }, this), filtered.concat(neighbours)
    }, G.BoardLayer = function(board, config) {
        Phaser.Group.call(this, game), this.position = board.position, this.scale = board.scale, this.board = board, this.boardData = board.boardData, this.config = config, this.grid = new G.GridArray(this.boardData.width, this.boardData.height, !1)
    }, G.BoardLayer.prototype = Object.create(Phaser.Group.prototype), G.BoardLayer.prototype.isMoveBlocked = function(cellX, cellY) {
        return this.isToken(cellX, cellY) && this.config.blockMove
    }, G.BoardLayer.prototype.isMatchBlocked = function(cellX, cellY) {
        return this.isToken(cellX, cellY) && this.config.blockMatch
    }, G.BoardLayer.prototype.isBoosterChangeBlocked = function(cellX, cellY) {
        return this.isToken(cellX, cellY) && this.config.blockMove
    }, G.BoardLayer.prototype.isProperChunk = function(chunk) {
        return 0 === chunk.indexOf(this.config.editorSymbol)
    }, G.BoardLayer.prototype.createToken = function(cellX, cellY, hp) {
        var elem = this.add(new this.config.constructor(this, cellX, cellY, hp));
        return this.grid.set(cellX, cellY, elem), elem.grid = this.grid, elem
    }, G.BoardLayer.prototype["import"] = function(cellX, cellY, chunk) {
        return 0 === chunk.indexOf(this.config.editorSymbol) ? (this.config.hpToken && this.createToken(cellX, cellY, chunk[this.config.editorSymbol.length]), !0) : !1
    }, G.BoardLayer.prototype["export"] = function(cellX, cellY) {
        var elem = this.getToken(cellX, cellY);
        return elem ? this.config.hpToken ? this.config.editorSymbol + elem.hp : elem["export"] ? elem["export"]() : this.config.editorSymbol : null
    }, G.BoardLayer.prototype.getRandom = function() {
        if (0 == this.children.length) return !1;
        for (var elem, len = this.children.length, i = (game.rnd.between(0, len), 0); len > i; i++)
            if (elem = this.children[i], elem && this.grid.get(elem.cellX, elem.cellY) == elem) return elem;
        return !1
    }, G.BoardLayer.prototype.removeToken = function(cellX, cellY) {
        var elem = this.grid.get(cellX, cellY);
        if (elem) {
            this.grid.set(cellX, cellY, !1), this.config.collectableType && G.sb("onCollectableRemove").dispatch(this.config.collectableType, elem, elem.frameName), elem.deathAnimation();
            var candy = this.board.getCandy(cellX, cellY);
            candy && (this.config.blockMove && this.board.pushToFallCheckList(candy), this.config.blockMatch && this.board.checkMatchList.push(candy))
        }
    }, G.BoardLayer.prototype.onMatch = function(cellX, cellY) {
        var token = this.getToken(cellX, cellY);
        return token ? (token.onMatch(), this.config.stopMatchPropagation ? !1 : !0) : !0
    }, G.BoardLayer.prototype.onHit = function(cellX, cellY) {
        var token = this.getToken(cellX, cellY);
        return token ? (token.onHit(), this.config.stopHitPropagation ? !1 : !0) : !0
    }, G.BoardLayer.prototype.isCellFree = function(cellX, cellY) {
        return !this.grid.get(cellX, cellY)
    }, G.BoardLayer.prototype.getToken = function(cellX, cellY) {
        return this.grid.get(cellX, cellY)
    }, G.BoardLayer.prototype.isToken = G.BoardLayer.prototype.getToken, G.BoardLayer.prototype.destroyCell = G.BoardLayer.prototype.removeToken, G.BoardToken = function(layer, config, cellX, cellY, hp) {
        Phaser.Image.call(this, game, layer.board.cellXToPxIn(cellX), layer.board.cellYToPxIn(cellY)), this.board = layer.board, this.config = config, this.anchor.setTo(.5), this.layer = layer, this.layerGrid = layer.grid, this.cellX = cellX, this.cellY = cellY, this.hp = parseInt(hp)
    }, G.BoardToken.prototype = Object.create(Phaser.Image.prototype), G.BoardToken.prototype.onMatch = function() {}, G.BoardToken.prototype.onHit = function() {}, G.BoardToken.prototype.remove = function() {
        this.layer.removeToken(this.cellX, this.cellY)
    }, G.BoardToken.prototype.deathAnimation = function() {
        this.destroy()
    }, G.BoardConcrete = function(board) {
        G.BoardLayer.call(this, board, {
            constructor: G.Concrete,
            maxHp: 3,
            hpToken: !0,
            editorSymbol: "cn",
            blockMove: !0,
            blockBoosterChange: !0,
            collectableType: "concrete",
            stopMatchPropagation: !0
        })
    }, G.BoardConcrete.prototype = Object.create(G.BoardLayer.prototype), G.BoardDirt = function(board) {
        G.BoardLayer.call(this, board, {
            constructor: G.Dirt,
            maxHp: 3,
            hpToken: !0,
            editorSymbol: "dirt",
            collectableType: "dirt"
        })
    }, G.BoardDirt.prototype = Object.create(G.BoardLayer.prototype), G.BoardDirtS = function(board) {
        G.BoardLayer.call(this, board, {
            constructor: G.DirtS,
            maxHp: 3,
            hpToken: !0,
            editorSymbol: "dS",
            collectableType: "dirtS"
        }), this.removedToken = !1, G.sb("onCollectableRemove").add(function(type) {
            "dirtS" === type && (this.removedToken = !0)
        }, this), G.sb("actionQueueEmptyAfterMove").add(function() {
            this.removedToken || this.spread(), this.removedToken = !1
        }, this)
    }, G.BoardDirtS.prototype = Object.create(G.BoardLayer.prototype), G.BoardDirtS.prototype.spread = function() {
        for (var actions = ["U", "D", "L", "R", "I"], len = this.children.length, iRnd = game.rnd.between(0, len - 1), i = 0; len > i; i++) {
            var dirt = this.children[(i + iRnd) % len];
            Phaser.ArrayUtils.shuffle(actions);
            for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
                var action = actions[actionIndex];
                switch (action) {
                    case "U":
                        if (this.isSpreadPossible(dirt.cellX, dirt.cellY - 1)) return void this.spreadToken(dirt.cellX, dirt.cellY - 1);
                        break;
                    case "D":
                        if (this.isSpreadPossible(dirt.cellX, dirt.cellY + 1)) return void this.spreadToken(dirt.cellX, dirt.cellY + 1);
                        break;
                    case "L":
                        if (this.isSpreadPossible(dirt.cellX - 1, dirt.cellY)) return void this.spreadToken(dirt.cellX - 1, dirt.cellY);
                        break;
                    case "R":
                        if (this.isSpreadPossible(dirt.cellX + 1, dirt.cellY)) return void this.spreadToken(dirt.cellX + 1, dirt.cellY);
                        break;
                    case "I":
                        if (dirt.hp < this.config.maxHp) return void dirt.increaseHp()
                }
            }
        }
    }, G.BoardDirtS.prototype.isSpreadPossible = function(cellX, cellY) {
        return this.board.isCellOnBoard(cellX, cellY) && !this.getToken(cellX, cellY)
    }, G.BoardDirtS.prototype.spreadToken = function(cellX, cellY) {
        var token = this.createToken(cellX, cellY, 1);
        game.add.tween(token.scale).from({
            x: 0,
            y: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.BoardIce = function(board) {
        G.BoardLayer.call(this, board, {
            constructor: G.Ice,
            maxHp: 4,
            hpToken: !0,
            editorSymbol: "ice",
            collectableType: "ice",
            blockMove: !0,
            blockMatch: !0,
            blockBoosterChange: !0,
            stopHitPropagation: !0
        })
    }, G.BoardIce.prototype = Object.create(G.BoardLayer.prototype), G.BoardJam = function(board) {
        G.BoardLayer.call(this, board, {
            constructor: G.Jam,
            maxHp: 3,
            hpToken: !0,
            editorSymbol: "jam",
            collectableType: "jam",
            blockMove: !0,
            blockMatch: !0,
            stopHitPropagation: !0
        }), this.removedToken = !1, G.sb("onCollectableRemove").add(function(type) {
            "jam" === type && (this.removedToken = !0)
        }, this), G.sb("actionQueueEmptyAfterMove").add(function() {
            this.removedToken || this.spread(), this.removedToken = !1
        }, this)
    }, G.BoardJam.prototype = Object.create(G.BoardLayer.prototype), G.BoardJam.prototype.spread = function() {
        for (var actions = ["U", "D", "L", "R", "I"], len = this.children.length, iRnd = game.rnd.between(0, len - 1), i = 0; len > i; i++) {
            var dirt = this.children[(i + iRnd) % len];
            Phaser.ArrayUtils.shuffle(actions);
            for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
                var action = actions[actionIndex];
                switch (action) {
                    case "U":
                        if (this.isSpreadPossible(dirt.cellX, dirt.cellY - 1)) return void this.spreadToken(dirt.cellX, dirt.cellY - 1);
                        break;
                    case "D":
                        if (this.isSpreadPossible(dirt.cellX, dirt.cellY + 1)) return void this.spreadToken(dirt.cellX, dirt.cellY + 1);
                        break;
                    case "L":
                        if (this.isSpreadPossible(dirt.cellX - 1, dirt.cellY)) return void this.spreadToken(dirt.cellX - 1, dirt.cellY);
                        break;
                    case "R":
                        if (this.isSpreadPossible(dirt.cellX + 1, dirt.cellY)) return void this.spreadToken(dirt.cellX + 1, dirt.cellY);
                        break;
                    case "I":
                        if (dirt.hp < this.config.maxHp) return void dirt.increaseHp()
                }
            }
        }
    }, G.BoardJam.prototype.isSpreadPossible = function(cellX, cellY) {
        return this.board.isCellOnBoard(cellX, cellY) && !this.getToken(cellX, cellY)
    }, G.BoardJam.prototype.spreadToken = function(cellX, cellY) {
        var token = this.createToken(cellX, cellY, 1);
        game.add.tween(token.scale).from({
            x: 0,
            y: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.Concrete = function(layer, cellX, cellY, hp) {
        G.BoardToken.call(this, layer, {
            tokenType: "concrete"
        }, cellX, cellY, hp), G.changeTexture(this, "concrete_" + this.hp)
    }, G.Concrete.prototype = Object.create(G.BoardToken.prototype), G.Concrete.prototype.onMatch = function() {
        G.sb("fx").dispatch("burstConcrete", this, this.hp), G.sfx.explosion_subtle.play(), this.hp--, G.sb("fxTop").dispatch("burstConcreteAnim", this, this), G.sfx.brick_break.play(), 0 == this.hp ? this.remove() : G.changeTexture(this, "concrete_" + this.hp)
    }, G.Dirt = function(layer, cellX, cellY, hp) {
        G.BoardToken.call(this, layer, {
            tokenType: "dirt"
        }, cellX, cellY, hp), G.changeTexture(this, "dirt_" + this.hp)
    }, G.Dirt.prototype = Object.create(G.BoardToken.prototype), G.Dirt.prototype.onMatch = function() {
        G.sb("fxTop").dispatch("burstDirtAnim", this, this), this.hp--, this.hp > 0 ? G.changeTexture(this, "dirt_" + this.hp) : this.remove()
    }, G.DirtS = function(layer, cellX, cellY, hp) {
        G.BoardToken.call(this, layer, {
            tokenType: "dirtS"
        }, cellX, cellY, hp), G.changeTexture(this, "dirt_s_" + this.hp), this.top
    }, G.DirtS.prototype = Object.create(G.BoardToken.prototype), G.DirtS.prototype.onMatch = function() {
        G.sb("fxTop").dispatch("burstDirtAnim", this, this), this.hp--, this.hp > 0 ? G.changeTexture(this, "dirt_s_" + this.hp) : this.remove()
    }, G.DirtS.prototype.increaseHp = function() {
        this.hp++, G.changeTexture(this, "dirt_s_" + this.hp)
    }, G.Ice = function(layer, cellX, cellY, hp) {
        G.BoardToken.call(this, layer, {
            tokenType: "ice"
        }, cellX, cellY, hp), G.changeTexture(this, "ice_front"), this.breakImg = G.makeImage(0, 0, null, .5, this), this.hp < 4 && G.changeTexture(this.breakImg, "ice_crack_" + this.hp)
    }, G.Ice.prototype = Object.create(G.BoardToken.prototype), G.Ice.prototype.onHit = function() {
        G.sfx.explosion_subtle.play(), G.sb("fxTop").dispatch("burstIce", this, this), this.hp--, this.hp > 0 ? G.changeTexture(this.breakImg, "ice_crack_" + this.hp) : (G.sb("fx").dispatch("smallCircle", this), this.remove())
    }, G.Jam = function(layer, cellX, cellY, hp) {
        G.BoardToken.call(this, layer, {
            tokenType: "jam"
        }, cellX, cellY, hp), G.changeTexture(this, "jam_" + this.hp)
    }, G.Jam.prototype = Object.create(G.BoardToken.prototype), G.Jam.prototype.onHit = function() {
        if (G.sfx.explosion_subtle.play(), this.hp--, 0 == this.hp) {
            this.remove();
            this.board.removeCandy(this.cellX, this.cellY, !0)
        } else G.changeTexture(this, "jam_" + this.hp)
    }, G.Jam.prototype.increaseHp = function() {
        this.hp++, G.changeTexture(this, "jam_" + this.hp)
    }, G.EditorDropPanel = function(x, y) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.goalTxt = new G.Text(0, 0, "% DROPS:", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }, [0, .5], 400), this.add(this.goalTxt), this.drops = G.lvlData.drops, this.makeField(50, "candy_chest", "chest"), this.makeField(100, "blocker_chain_wrapped", "chain"), this.makeField(150, "candy_infection", "infection"), this.makeField(200, "candy_goalCandy", "goalCandy")
    }, G.EditorDropPanel.prototype = Object.create(Phaser.Group.prototype), G.EditorDropPanel.prototype.makeField = function(y, spriteName, propName) {
        var ico = G.makeImage(50, y, spriteName, [0, .5], this);
        ico.scale.setTo(.6);
        var txt = new G.Text(150, y - 30, this.drops[propName] || "0", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        });
        txt.inputEnabled = !0, txt.input.useHandCursor = !0, txt.events.onInputDown.add(function() {
            var answer = prompt("Enter % of getting " + propName),
                parsedAnswer = parseFloat(answer);
            isNaN(parsedAnswer) || 0 > parsedAnswer || parsedAnswer >= 100 || (G.lvlData.drops[propName] = parsedAnswer, this.setText(parsedAnswer.toString()))
        }, txt), this.add(txt)
    }, G.EditorDropZones = function(board, importData) {
        Phaser.Group.call(this, game), this.board = board, this.position = board.position, this.scale = board.scale, this.dropZones = [], this["import"](importData)
    }, G.EditorDropZones.prototype = Object.create(Phaser.Group.prototype), G.EditorDropZones.prototype["import"] = function(drops) {
        drops && (this.update(), drops.forEach(function(col, i) {
            col.forEach(function(elem, index) {
                this.dropZones[i].addElement(elem, index)
            }, this)
        }, this))
    }, G.EditorDropZones.prototype["export"] = function() {
        return this.dropZones.filter(function(dropZone) {
            return null !== dropZone
        }).map(function(dropZone) {
            return dropZone.elements
        })
    }, G.EditorDropZones.prototype.update = function() {
        for (var len = Math.max(this.dropZones.length, this.board.boardData.width), i = 0; len > i; i++) i < this.board.boardData.width ? this.dropZones[i] ? this.dropZones[i].update() : this.dropZones[i] = this.add(new G.EditorDropZone(this.board, i)) : this.dropZones[i] && (this.dropZones[i].destroy(), this.dropZones[i] = null)
    }, G.EditorDropZone = function(board, col) {
        Phaser.Group.call(this, game), this.board = board, this.col = col, this.elements = [], this.elementsObj = [], this.x = col * board.tilesize, this.y = this.getTopTile() * board.tilesize, this.gfx = game.add.graphics(), this.add(this.gfx), this.redrawGfx(), this.gfx.inputEnabled = !0, this.keys = game.input.keyboard.addKeys({
            one: Phaser.Keyboard.ONE,
            two: Phaser.Keyboard.TWO,
            three: Phaser.Keyboard.THREE,
            four: Phaser.Keyboard.FOUR,
            five: Phaser.Keyboard.FIVE,
            six: Phaser.Keyboard.SIX,
            seven: Phaser.Keyboard.SEVEN,
            eight: Phaser.Keyboard.EIGHT,
            nine: Phaser.Keyboard.NINE,
            zero: Phaser.Keyboard.ZERO,
            bs: Phaser.Keyboard.BACKSPACE
        }), this.keys.one.onDown.add(function() {
            this.onBtnPressed("1")
        }, this), this.keys.two.onDown.add(function() {
            this.onBtnPressed("2")
        }, this), this.keys.three.onDown.add(function() {
            this.onBtnPressed("3")
        }, this), this.keys.four.onDown.add(function() {
            this.onBtnPressed("4")
        }, this), this.keys.five.onDown.add(function() {
            this.onBtnPressed("5")
        }, this), this.keys.six.onDown.add(function() {
            this.onBtnPressed("6")
        }, this), this.keys.seven.onDown.add(function() {
            this.onBtnPressed("r")
        }, this), this.keys.eight.onDown.add(function() {
            this.onBtnPressed("chest")
        }, this), this.keys.nine.onDown.add(function() {
            this.onBtnPressed("goalCandy")
        }, this), this.keys.bs.onDown.add(this.removeLastElement, this)
    }, G.EditorDropZone.prototype = Object.create(Phaser.Group.prototype), G.EditorDropZone.prototype.onBtnPressed = function(elem) {
        if (this.gfx.input.pointerOver()) {
            var index = Math.floor((this.gfx.worldPosition.y - game.input.activePointer.worldY) / this.board.tilesize);
            this.addElement(elem, index)
        }
    }, G.EditorDropZone.prototype.addElement = function(elem, index) {
        this.elementsObj[index] && this.elementsObj[index].destroy(), this.elements[index] = elem, this.elementsObj[index] = G.makeImage(.5 * this.board.tilesize, (index + .5) * this.board.tilesize * -1, "candy_" + elem, .5, this), this.redrawGfx()
    }, G.EditorDropZone.prototype.removeLastElement = function(index) {
        this.gfx.input.pointerOver() && this.elements.length > 0 && (this.elements.splice(-1, 1), this.elementsObj.splice(-1, 1)[0].destroy()), this.redrawGfx()
    }, G.EditorDropZone.prototype.redrawGfx = function() {
        var tilesize = this.board.tilesize;
        this.gfx.clear(), this.gfx.beginFill(255, .5);
        var height = Math.max(1, this.elements.length + 1) * tilesize;
        this.gfx.drawRect(0, -height, tilesize, height)
    }, G.EditorDropZone.prototype.update = function() {
        var topTile = this.getTopTile();
        null === topTile ? this.visible = !1 : this.y = topTile * this.board.tilesize, this.gfx.input.pointerOver() ? this.gfx.alpha = 1 : this.gfx.alpha = .1
    }, G.EditorDropZone.prototype.getTopTile = function(col) {
        for (var i = 0; i < this.board.boardData.height; i++)
            if (this.board.isCellOnBoard(this.col, i)) return i;
        return null
    }, G.EditorGoalDropPanel = function(x, y) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), G.lvlData.goalDrops || (G.lvlData.goalDrops = []), this.goalTxt = new G.Text(0, 0, "DROPS:", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }, [0, .5], 400), this.plusBtn = new G.Button(200, 0, "plus_ico", function() {
            this.makeGoalItem(this.goals.length)
        }, this), this.minusBtn = new G.Button(240, 0, "minus_ico", function() {
            0 != this.goals.length && this.removeGoal()
        }, this), this.addMultiple([this.goalTxt, this.plusBtn, this.minusBtn]), this.goals = [], this.loadLvlDrops()
    }, G.EditorGoalDropPanel.prototype = Object.create(Phaser.Group.prototype), G.EditorGoalDropPanel.prototype.loadLvlDrops = function() {
        G.lvlData.goalDrops.forEach(function(elem, index) {
            this.makeGoalItem(index, elem[0], elem[1])
        }, this)
    }, G.EditorGoalDropPanel.prototype.removeGoal = function() {
        var goalToRemove = this.goals.pop();
        goalToRemove.destroy(), G.lvlData.goalDrops.pop()
    }, G.EditorGoalDropPanel.prototype.makeGoalItem = function(index, name, nr) {
        var goalItem = game.make.group();
        goalItem.goalIndex = index, goalItem.x = G.l(100), goalItem.y = G.l(50 + 50 * index), goalItem.allGoals = ["goalCandy"], goalItem.goalName = name || goalItem.allGoals[0], goalItem.goalNr = nr || 5, goalItem.img = G.makeImage(-50, 0, null, .5, goalItem), goalItem.img.scale.setTo(.6), goalItem.img.refreshGraphics = function() {
            G.changeTexture(this, G.json.settings.goals[this.parent.goalName].sprite)
        }, goalItem.img.refreshGraphics(), goalItem.img.inputEnabled = !0, goalItem.img.input.useHandCursor = !0, goalItem.img.events.onInputDown.add(function() {
            var index = goalItem.allGoals.indexOf(goalItem.goalName);
            goalItem.goalName = goalItem.allGoals[(index + 1) % goalItem.allGoals.length], G.lvlData.goalDrops[goalItem.goalIndex][0] = goalItem.goalName, goalItem.img.refreshGraphics()
        }), goalItem.nr = new G.Text(50, 0, goalItem.goalNr.toString(), {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        }), goalItem.add(goalItem.nr), goalItem.nr.anchor.setTo(0, .5), goalItem.nr.inputEnabled = !0, goalItem.nr.input.useHandCursor = !0, goalItem.nr.events.onInputDown.add(function() {
            var answer = prompt("Enter moves number");
            isNaN(parseInt(answer)) || (G.lvlData.goalDrops[goalItem.goalIndex][1] = parseInt(answer), goalItem.goalNr = answer, goalItem.nr.setText(goalItem.goalNr.toString()))
        }), this.add(goalItem), this.goals.push(goalItem), index >= G.lvlData.goalDrops.length && G.lvlData.goalDrops.push([goalItem.goalName, goalItem.goalNr])
    }, G.EditorGoalPanel = function(x, y) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.state = game.state.getCurrentState(), this.goalTxt = new G.Text(0, 0, "GOAL:", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }, [0, .5], 400), this.plusBtn = new G.Button(160, 0, "plus_ico", function() {
            "points" !== G.lvlData.goal[0] && (this.goals.length >= 4 || this.makeGoalItem(this.goals.length))
        }, this), this.plusBtn.IMMEDIATE = !0, this.minusBtn = new G.Button(200, 0, "minus_ico", function() {
            "points" !== G.lvlData.goal[0] && 1 != this.goals.length && this.removeGoal()
        }, this), this.minusBtn.IMMEDIATE = !0, this.changeGoalType = new G.Button(270, 0, "minus_ico", function() {
            "points" === G.lvlData.goal[0] ? G.lvlData.goal = ["collect", [
                ["1", 5],
                ["2", 5]
            ]] : G.lvlData.goal = ["points", 5e3], this.loadLvlGoals()
        }, this), this.changeGoalType.IMMEDIATE = !0, this.changeGoalType.angle = 90, this.addMultiple([this.goalTxt, this.plusBtn, this.minusBtn, this.changeGoalType]), this.goals = [], this.normals = ["1", "2", "3", "4", "5", "6"];
        var pointsTarget = "points" === G.lvlData.goal[0] ? G.lvlData.goal[1] : 1e3;
        this.pointTxt = new G.Text(50, 50, pointsTarget, {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        }), this.add(this.pointTxt), this.pointTxt.anchor.setTo(0, .5), this.pointTxt.inputEnabled = !0, this.pointTxt.input.useHandCursor = !0, this.pointTxt.events.onInputDown.add(function() {
            var answer = prompt("Enter points target");
            isNaN(parseInt(answer)) || (G.lvlData.goal[1] = parseInt(answer), this.setText(parseInt(answer)))
        }, this.pointTxt), this.loadLvlGoals()
    }, G.EditorGoalPanel.prototype = Object.create(Phaser.Group.prototype), G.EditorGoalPanel.prototype.update = function() {
        if ("points" !== G.lvlData.goal[0])
            for (var i = 0; i < this.goals.length; i++) this.updateGoal(this.goals[i])
    }, G.EditorGoalPanel.prototype.loadLvlGoals = function() {
        return this.goals.forEach(function(g) {
            g.destroy()
        }), this.goals = [], "points" == G.lvlData.goal[0] ? (this.pointTxt.visible = !0, void this.pointTxt.setText(G.lvlData.goal[1])) : (this.pointTxt.visible = !1, void G.lvlData.goal[1].forEach(function(elem, index) {
            this.makeGoalItem(index, elem[0], elem[1])
        }, this))
    }, G.EditorGoalPanel.prototype.removeGoal = function() {
        var goalToRemove = this.goals.pop();
        goalToRemove.destroy(), G.lvlData.goal[1].pop()
    }, G.EditorGoalPanel.prototype.makeGoalItem = function(index, name, nr) {
        var goalItem = game.make.group();
        goalItem.goalIndex = index, goalItem.x = G.l(50), goalItem.y = G.l(50 + 50 * index), goalItem.allGoals = Object.keys(G.json.settings.goals), goalItem.goalName = name || goalItem.allGoals[0], goalItem.goalNr = nr || 5, goalItem.img = G.makeImage(0, 0, null, .5, goalItem), goalItem.img.scale.setTo(.6), goalItem.img.refreshGraphics = function() {
            this.parent.goalName;
            G.changeTexture(this, G.json.settings.goals[this.parent.goalName].sprite)
        }, goalItem.img.refreshGraphics(), goalItem.img.inputEnabled = !0, goalItem.img.input.useHandCursor = !0, goalItem.img.events.onInputDown.add(function() {
            var index = goalItem.allGoals.indexOf(goalItem.goalName);
            goalItem.goalName = goalItem.allGoals[(index + 1) % goalItem.allGoals.length], G.lvlData.goal[1][goalItem.goalIndex][0] = goalItem.goalName, goalItem.img.refreshGraphics()
        }), goalItem.alert = new G.Text(250, 0, "ALERT", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }), goalItem.alert.anchor.setTo(0, .5), goalItem.alert.visible = !1, goalItem.add(goalItem.alert), goalItem.nr = new G.Text(50, 0, goalItem.goalNr.toString(), {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        }), goalItem.add(goalItem.nr), goalItem.nr.anchor.setTo(0, .5), goalItem.nr.inputEnabled = !0, goalItem.nr.input.useHandCursor = !0, goalItem.nr.events.onInputDown.add(function() {
            var answer = prompt("Enter moves number");
            isNaN(parseInt(answer)) || (G.lvlData.goal[1][goalItem.goalIndex][1] = parseInt(answer), goalItem.goalNr = answer, goalItem.nr.setText(goalItem.goalNr.toString()))
        }), this.add(goalItem), this.goals.push(goalItem), index >= G.lvlData.goal[1].length && G.lvlData.goal[1].push([goalItem.goalName, goalItem.goalNr])
    }, G.EditorGoalPanel.prototype.updateGoal = function(goalItem) {
        var txt = goalItem.goalNr.toString();
        if (-1 !== this.normals.indexOf(goalItem.goalName)) goalItem.nr.setText(txt), goalItem.nr.fill = "#a8dbc6";
        else {
            var currentAmount, goodAnyway = !1;
            "concrete" === goalItem.goalName && (currentAmount = this.countConcrete()), "goalCandy" === goalItem.goalName ? currentAmount = this.countGoalCandies() : "ice" === goalItem.goalName ? currentAmount = this.countIce() : "dirt" === goalItem.goalName ? currentAmount = this.countDirt() : "chain" === goalItem.goalName ? (currentAmount = this.countChains(), goodAnyway = G.lvlData.drops.chain > 0) : "infection" === goalItem.goalName && (currentAmount = this.countInfections(), goodAnyway = G.lvlData.drops.infection > 0), txt += " (" + currentAmount + ")", goalItem.nr.setText(" "), goalItem.nr.setText(txt), goalItem.goalNr > currentAmount ? goalItem.nr.fill = goodAnyway ? "#ffa500" : "#ff0000" : goalItem.nr.fill = "#a8dbc6"
        }
    }, G.EditorGoalPanel.prototype.countConcrete = function() {
        var result = 0;
        return this.state.board.boardCage.grid.loop(function(e) {
            null !== e && e !== !1 && result++
        }), result
    }, G.EditorGoalPanel.prototype.countGoalCandies = function() {
        var result = 0;
        return this.state.board.boardCandies.grid.loop(function(e) {
            null !== e && e !== !1 && "goalCandy" == e.candyType && result++
        }), G.lvlData.goalDrops.forEach(function(g) {
            "goalCandy" === g[0] && result++
        }), result
    }, G.EditorGoalPanel.prototype.countDirt = function() {
        var result = 0;
        return this.state.board.boardDirt.grid.loop(function(e) {
            null !== e && e !== !1 && result++
        }), result
    }, G.EditorGoalPanel.prototype.countChains = function() {
        var result = 0;
        return this.state.board.boardCandies.grid.loop(function(e) {
            null !== e && e !== !1 && e.wrapped && result++
        }), result
    }, G.EditorGoalPanel.prototype.countIce = function() {
        var result = 0;
        return this.state.board.boardIce.grid.loop(function(e) {
            null !== e && e !== !1 && result++
        }), result
    }, G.EditorGoalPanel.prototype.countInfections = function() {
        var result = 0;
        return this.state.board.boardCandies.grid.loop(function(e) {
            null !== e && e !== !1 && "infection" === e.candyType && result++
        }), result
    }, "undefined" == typeof G && (G = {}), G.EditorSidePanel = function(x) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.x = x, this.makeKeyLabels(0, 0), this.makeBoardSizeController(0, 150), this.makeMoveController(0, 220), this.makeMaxNumberController(0, 270), this.makeStarsReqController(0, 320), this.makeTutorialIdBtn(0, 370), this.goalPanel = new G.EditorGoalPanel(0, 470), this.add(this.goalPanel), this.dropPanel = new G.EditorDropPanel(350, 470), this.add(this.dropPanel), this.dropGoalPanel = new G.EditorGoalDropPanel(650, 470), this.add(this.dropGoalPanel), this.backBtn = this.makeTextBtn(0, 1370, "Back to WORLD MAP", function() {
            this.exportLevel(), game.state.start("EditorWorld", !0, !1, G.lvlNr)
        }, this), this.makeNextPrevExport(0, 1420)
    }, G.EditorSidePanel.prototype = Object.create(Phaser.Group.prototype), G.EditorSidePanel.prototype.makeTutorialIdBtn = function(x, y) {
        var group = this.add(game.add.group());
        group.position.setTo(x, y), group.label = group.add(this.makeText(0, 0, "Tutorial ID:"));
        var tutID = G.lvlData.tutID;
        group["switch"] = this.makeTextBtn(300, 0, tutID || "---", function() {
            var id = prompt("Enter tutorial ID");
            0 == id.length ? (delete G.lvlData.tutID, this.setText("---"), this.fill = "#a8dbc6") : (G.lvlData.tutID = id, this.setText(id), this.fill = G.json.tutorials[id] ? "green" : "orange")
        }), group.add(group["switch"]), tutID && G.json.tutorials[tutID] && (group["switch"].fill = "green")
    }, G.EditorSidePanel.prototype.makeNextPrevExport = function(x, y) {
        this.makeTextBtn(x + 200, y, "Prev", function() {
            this.exportLevel(), game.state.start("Editor", !0, !1, Math.max(0, G.lvlNr - 1))
        }, this), this.makeTextBtn(x, y, "Play", function() {
            this.exportLevel(), game.state.start("Game", !0, !1, G.lvlNr, !0)
        }, this), this.makeTextBtn(x + 350, y, "Next", function() {
            this.exportLevel(), game.state.start("Editor", !0, !1, Math.min(G.json.levels.length - 1, G.lvlNr + 1))
        }, this), this.makeTextBtn(x + 600, y, "EXPORT", function() {
            this.exportLevel();
            var blob = new Blob([JSON.stringify(G.json.levels)], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(blob, "levels.json")
        }, this)
    }, G.EditorSidePanel.prototype.makeText = function(x, y, text) {
        var text = new G.Text(x, y, text, {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        });
        return this.add(text), text
    }, G.EditorSidePanel.prototype.makeTextBtn = function(x, y, text, func, context) {
        var text = new G.Text(x, y, text, {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        });
        return text.inputEnabled = !0, text.input.useHandCursor = !0, text.events.onInputDown.add(func, context || text), this.add(text), text
    }, G.EditorSidePanel.prototype.makeMaxNumberController = function(x, y) {
        this.maxNrGroup = this.add(game.make.group()), this.maxNrGroup.x = G.l(x), this.maxNrGroup.y = G.l(y), this.maxNrLabel = this.makeText(0, 0, "Types of candies:"), this.maxNrGroup.add(this.maxNrLabel), this.maxNrBtn = this.makeTextBtn(400, 0, G.lvlData.nrOfTypes.toString(), function() {
            var answer = prompt("Enter max candy number (4 or 5)"),
                parsedAnswer = parseInt(answer);
            isNaN(parsedAnswer) || (G.lvlData.nrOfTypes = parseInt(answer), this.maxNrBtn.setText(parseInt(answer).toString()))
        }, this), this.maxNrGroup.add(this.maxNrBtn)
    }, G.EditorSidePanel.prototype.makeMoveController = function(x, y) {
        this.moveControllerGroup = this.add(game.make.group()), this.moveControllerGroup.x = G.l(x), this.moveControllerGroup.y = G.l(y), this.moveLabel = this.makeText(0, 0, "Moves:"), this.movesNr = this.makeTextBtn(200, 0, G.lvlData.moves.toString(), function() {
            var answer = prompt("Enter moves number");
            isNaN(parseInt(answer)) || (G.lvlData.moves = parseInt(answer), this.setText(parseInt(answer).toString()))
        }), this.moveControllerGroup.addMultiple([this.moveLabel, this.movesNr])
    }, G.EditorSidePanel.prototype.makeStarsReqController = function(x, y) {
        this.starsReqGroup = this.add(game.make.group()), this.starsReqGroup.x = G.l(x), this.starsReqGroup.y = G.l(y), this.starsReqGroup.add(this.makeText(0, 0, "Stars:")), this.btns = [];
        for (var i = 0; 3 > i; i++) this.btns[i] = this.makeTextBtn(200 + 150 * i, 0, G.lvlData.starsReq[i].toString(), function() {
            var answer = prompt("Enter requirement for " + (this.index + 1) + " stars:"),
                parsedAnswer = parseInt(answer);
            isNaN(parsedAnswer) || (G.lvlData.starsReq[this.index] = parsedAnswer, this.setText(parsedAnswer.toString()))
        }), this.btns[i].index = i;
        this.starsReqGroup.addMultiple(this.btns)
    }, G.EditorSidePanel.prototype.makeKeyPreview = function(x, y, letter, image) {
        var group = game.add.group();
        group.position.setTo(x, y);
        var img = G.makeImage(0, 0, image, 0, group),
            txt = new G.Text(45, 30, letter, {
                font: "Verdana",
                fontWeight: "bold",
                fontSize: 20,
                fill: "white",
                stroke: "black",
                strokeThickness: 5
            }, 0);
        group.add(txt), img.width = G.l(60), img.height = G.l(60), this.add(group)
    }, G.EditorSidePanel.prototype.makeBoardSizeController = function(x, y) {
        this.makeText(x, y, "Board size:"), this.widthMinus = new G.Button(x + 320, y + 30, "minus_ico", function() {
            this.state.changeBoardSize(Math.max(4, this.state.board.boardData.width - 1), Math.max(4, this.state.board.boardData.height)), this.widthText.setText(this.state.board.boardData.width)
        }, this), this.widthMinus.IMMEDIATE = !0, this.widthText = this.makeText(x + 340, y, this.state.board.boardData.width.toString()), this.widthPlus = new G.Button(x + 390, y + 30, "plus_ico", function() {
            this.state.changeBoardSize(Math.max(4, this.state.board.boardData.width + 1), Math.max(4, this.state.board.boardData.height)), this.widthText.setText(this.state.board.boardData.width)
        }, this), this.widthPlus.IMMEDIATE = !0, this.heightMinus = new G.Button(x + 440, y + 30, "minus_ico", function() {
            this.state.changeBoardSize(Math.max(4, this.state.board.boardData.width), Math.max(4, this.state.board.boardData.height - 1)), this.heightText.setText(this.state.board.boardData.height)
        }, this), this.heightMinus.IMMEDIATE = !0, this.heightText = this.makeText(x + 460, y, this.state.board.boardData.height.toString()), this.heightPlus = new G.Button(x + 510, y + 30, "plus_ico", function() {
            this.state.changeBoardSize(Math.max(4, this.state.board.boardData.width), Math.max(4, this.state.board.boardData.height + 1)), this.heightText.setText(this.state.board.boardData.height)
        }, this), this.heightPlus.IMMEDIATE = !0, this.addMultiple([this.widthMinus, this.widthPlus, this.heightPlus, this.heightMinus])
    }, G.EditorSidePanel.prototype.makeKeyLabels = function(x, y) {
        var rowFirst = {
                1: "candy_1",
                2: "candy_2",
                3: "candy_3",
                4: "candy_4",
                5: "candy_5",
                6: "candy_6",
                7: "candy_r",
                8: "candy_chest",
                9: "candy_goalCandy",
                B: "candy_spiral"
            },
            rowSecond = {
                E: "concrete_3",
                R: "dirt_2",
                T: "eraser",
                Y: "tile_1",
                W: "ice_front",
                A: "blocker_chain_wrapped",
                S: "candy_infection",
                C: "collect_cell",
                F: "dirt_s_2",
                G: "jam_2",
                S: "candy_infection",
                0: "candy_r"
            };
        Object.keys(rowFirst).forEach(function(key, i) {
            this.makeKeyPreview(x + 70 * i, y, key, rowFirst[key])
        }, this), Object.keys(rowSecond).forEach(function(key, i) {
            this.makeKeyPreview(x + 70 * i, y + 70, key, rowSecond[key])
        }, this)
    }, G.EditorSidePanel.prototype.exportLevel = function() {
        var tempArray = new G.GridArray(this.state.board.boardData.width, this.state.board.boardData.height);
        tempArray.loop(function(elem, x, y, data) {
            data[x][y] = [], "X" == s.board.boardData.data[x][y] && data[x][y].push("X");
            var dirt = s.board.boardDirt.grid.data[x][y];
            dirt && data[x][y].push("dirt" + dirt.hp);
            var dirtS = s.board.boardDirtS.grid.data[x][y];
            dirtS && data[x][y].push("dS" + dirtS.hp);
            var jam = s.board.boardJam.grid.data[x][y];
            jam && data[x][y].push("jam" + jam.hp);
            var ice = s.board.boardIce.grid.data[x][y];
            ice && data[x][y].push("ice" + ice.hp);
            var cage = s.board.boardCage.grid.data[x][y];
            cage && data[x][y].push("cn" + cage.hp);
            var candy = s.board.boardCandies.grid.data[x][y];
            if (candy) {
                var expStr = candy.candyType;
                candy.blocker && (expStr += ":B" + candy.blockerHp), candy.wrapped && (expStr += ":W"), candy.infected && (expStr += ":I"), candy.specialType && ("horizontal" == candy.specialType && (expStr += ":H"), "vertical" == candy.specialType && (expStr += ":V"), "cross" == candy.specialType && (expStr += ":C"), "spiral" == candy.specialType && (expStr = "1:S")), data[x][y].push(expStr)
            }
        }, this), G.lvlData.predefinedDrops = this.state.dropZones["export"](), G.lvlData.levelData = tempArray.data
    }, G.EditorWorldSidePanel = function(x, y) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.state = game.state.getCurrentState(), this.levelNr = this.makeText(0, 0, "LEVEL: --"), this.add(this.levelNr), this.starsReq = this.makeText(0, 50, "--"), this.add(this.starsReq), this.previewBitmap = game.add.bitmapData(400, 400), this.previewBitmapImg = this.add(this.previewBitmap.addToWorld(0, 100)), this.swapUpBtn = this.makeTextButton(0, 500, "Swap Up", 50, function() {
            void 0 !== this.state.selectedLevels[0] && this.swapLevels(this.state.selectedLevels[0] + 1)
        }, this), this.add(this.swapUpBtn), this.swapDownBtn = this.makeTextButton(0, 550, "Swap Down", 50, function() {
            void 0 !== this.state.selectedLevels[0] && this.swapLevels(Math.max(0, this.state.selectedLevels[0] - 1))
        }, this), this.add(this.swapDownBtn), this.changeNumberBtn = this.makeTextButton(0, 600, "Change number", 50, function() {
            var changeTo = parseInt(prompt("New lvl nr")) - 1;
            isNaN(changeTo) || this.swapLevels(changeTo)
        }, this), this.add(this.changeNumberBtn), this.removeLevelsBtn = this.makeTextButton(0, 675, "Remove Levels", 50, this.removeLevels, this), this.removeLevelsBtn.fill = "red", this.add(this.removeLevelsBtn), this.playLevelBtn = this.makeTextButton(0, 750, "Play Level", 50, function() {
            void 0 !== this.state.selectedLevels[0] && (G.lvlNr = this.state.selectedLevels[0], game.state.start("Game", !0, !1, G.lvlNr, !0))
        }, this), this.add(this.playLevelBtn), this.editLevelBtn = this.makeTextButton(0, 800, "Edit Level", 50, function() {
            void 0 !== this.state.selectedLevels[0] && game.state.start("Editor", !0, !1, this.state.selectedLevels[0])
        }, this), this.add(this.editLevelBtn), this.copyLevelBtn = this.makeTextButton(0, 850, "Copy Levels", 50, function() {
            this.copyLevels()
        }, this), this.add(this.copyLevelBtn), this.exportBtn = this.makeTextButton(0, 950, "Export JSON", 50, function() {
            var blob = new Blob([JSON.stringify(G.json.levels)], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(blob, "levels.json")
        }, this), this.add(this.exportBtn), this.lineEditorInit()
    }, G.EditorWorldSidePanel.prototype = Object.create(Phaser.Group.prototype), G.EditorWorldSidePanel.prototype.makeText = function(x, y, text, size) {
        var text = new G.Text(x, y, text, {
            style: "font-white",
            fontSize: (size || 50) + "px"
        });
        return this.add(text), text
    }, G.EditorWorldSidePanel.prototype.makeTextButton = function(x, y, text, size, callback, context) {
        var text = this.makeText(x, y, text, size);
        return text.inputEnabled = !0, text.input.useHandCursor = !0, text.events.onInputDown.add(callback, context), text
    }, G.EditorWorldSidePanel.prototype.swapLevels = function(pos) {
        if (0 !== this.state.selectedLevels.length) {
            console.log("swap levels");
            var posOfLevels = G.json.levels.map(function(lvlData) {
                    return {
                        mapX: lvlData.mapX,
                        mapY: lvlData.mapY
                    }
                }),
                levelsToSwap = [];
            this.state.selectedLevels.forEach(function(index) {
                levelsToSwap.push(G.json.levels[index])
            }), levelsToSwap.forEach(function(lvlData) {
                var index = G.json.levels.indexOf(lvlData);
                index >= 0 && G.json.levels.splice(index, 1)
            }), G.json.levels.splice.apply(G.json.levels, [pos, 0].concat(levelsToSwap)), G.json.levels.forEach(function(lvlData, i) {
                lvlData && (lvlData.mapX = posOfLevels[i].mapX, lvlData.mapY = posOfLevels[i].mapY)
            });
            var newIndexes = levelsToSwap.map(function(lvlData) {
                return G.json.levels.indexOf(lvlData)
            });
            this.state.selectLevel(newIndexes)
        }
    }, G.EditorWorldSidePanel.prototype.copyLevels = function() {
        var levelsToCopy = this.state.selectedLevels.map(function(lvlIndex) {
            var copy = JSON.parse(JSON.stringify(G.json.levels[lvlIndex]));
            return copy.mapX += 150, copy
        });
        G.json.levels = G.json.levels.concat(levelsToCopy), this.state.fillSaveState3Stars(), this.state.map.refreshButtons();
        var copyIndexes = levelsToCopy.map(function(lvlData) {
            return G.json.levels.indexOf(lvlData)
        });
        this.state.selectLevel(copyIndexes)
    }, G.EditorWorldSidePanel.prototype.removeLevels = function(levels) {
        if (confirm("ARE YOU SURE?") && 0 !== this.state.selectedLevels.length) {
            var levelsToRemove = [];
            this.state.selectedLevels.forEach(function(lvlIndex) {
                levelsToRemove.push(G.json.levels[lvlIndex])
            }), levelsToRemove.forEach(function(lvlData) {
                var index = G.json.levels.indexOf(lvlData);
                index >= 0 && G.json.levels.splice(index, 1)
            }), this.state.selectLevel(null)
        }
    }, G.EditorWorldSidePanel.prototype.refresh = function() {
        void 0 === s.selectedLevels[0] ? (this.levelNr.setText("LEVEL: --"), this.starsReq.setText("--"), this.previewBitmapImg.alpha = 0) : (this.previewBitmapImg.alpha = 1, G.makeLvlPreview(G.json.levels[s.selectedLevels[0]], this.previewBitmap), this.levelNr.setText("LEVEL: " + (s.selectedLevels[0] + 1)), this.starsReq.setText(G.json.levels[s.selectedLevels[0]].starsReq.toString()))
    }, G.makeLvlPreview = function(lvl, bitmapData) {
        var sprite = game.make.image(0, 0, null);
        bitmapData.clear(), bitmapData.fill(0, 0, 0, 1);
        for (var boardWidth = lvl.levelData.length, boardHeight = lvl.levelData[0].length, cellWidthPx = bitmapData.width / boardWidth, cellHeightPx = bitmapData.height / boardHeight, cellSize = Math.min(cellWidthPx, cellHeightPx), lookUpObject = {
                1: "candy_1",
                2: "candy_2",
                3: "candy_3",
                4: "candy_4",
                5: "candy_5",
                6: "candy_6",
                r: "candy_r",
                goalCandy: "candy_goalCandy",
                cn1: "concrete_1",
                cn2: "concrete_2",
                cn3: "concrete_3",
                dirt1: "dirt_1",
                dirt2: "dirt_2",
                dirt3: "dirt_3",
                ice1: "ice_front",
                ice2: "ice_front",
                ice3: "ice_front",
                chest: "candy_chest",
                infection: "candy_infection",
                dS1: "dirt_s_1",
                dS2: "dirt_s_2",
                dS3: "dirt_s_3",
                jam1: "jam_1",
                jam2: "jam_2",
                jam3: "jam_3"
            }, coll = 0; boardWidth > coll; coll++)
            for (var row = 0; boardHeight > row; row++) {
                var cell = lvl.levelData[coll][row];
                if ("X" != cell[0]) {
                    G.changeTexture(sprite, "tile_1"), bitmapData.draw(sprite, coll * cellSize, row * cellSize, cellSize, cellSize);
                    for (var elemI = 0; elemI < cell.length; elemI++) {
                        var elem = cell[elemI];
                        if ("S" != elem[2])
                            if ("H" != elem[2] && "V" != elem[2] && "C" != elem[2]) "W" == elem[2] ? (G.changeTexture(sprite, lookUpObject[elem[0]]), bitmapData.draw(sprite, coll * cellSize, row * cellSize, cellSize, cellSize), G.changeTexture(sprite, "blocker_chain_wrapped"), sprite.alpha = .5, bitmapData.draw(sprite, coll * cellSize, row * cellSize, cellSize, cellSize), sprite.alpha = 1) : lookUpObject[elem] && (G.changeTexture(sprite, lookUpObject[elem]), bitmapData.draw(sprite, coll * cellSize, row * cellSize, cellSize, cellSize));
                            else {
                                var texture = "candy_" + elem[0] + "_bonus_" + [0, "H", "V", "C"].indexOf(elem[2]);
                                G.changeTexture(sprite, texture), bitmapData.draw(sprite, coll * cellSize, row * cellSize, cellSize, cellSize)
                            }
                        else G.changeTexture(sprite, "candy_spiral"), bitmapData.draw(sprite, coll * cellSize, row * cellSize, cellSize, cellSize)
                    }
                } else G.changeTexture(sprite, "dark_screen"), bitmapData.draw(sprite, coll * cellSize, row * cellSize, cellSize, cellSize)
            }
    }, G.EditorWorldSidePanel.prototype.lineEditorInit = function() {
        this.line = this.makeText(0, 1050, "LVL LINE:\nZ-clearLine\nX-add node\nC-remove last node\nV-spread\nB-improt from lvls\nN-spread on nodes", 25), this.lvlLineX = [], this.lvlLineY = [], gfx = game.add.graphics(), gfx.sidePanel = this, gfx.update = function() {
            if (this.x = s.map.x, this.y = s.map.y, this.clear(), this.beginFill(16711680, 1), !(this.sidePanel.lvlLineX.length < 2))
                for (var i = 0; 1e4 > i; i++) this.drawRect(game.math.linearInterpolation(this.sidePanel.lvlLineX, i / 1e4), game.math.linearInterpolation(this.sidePanel.lvlLineY, i / 1e4), 1, 1)
        }, this.keys = game.input.keyboard.addKeys({
            Z: Phaser.Keyboard.Z,
            X: Phaser.Keyboard.X,
            C: Phaser.Keyboard.C,
            V: Phaser.Keyboard.V,
            B: Phaser.Keyboard.B,
            N: Phaser.Keyboard.N
        }), this.keys.Z.onDown.add(function() {
            this.lvlLineX = [], this.lvlLineY = []
        }, this), this.keys.X.onDown.add(function() {
            var pointer = game.input.activePointer,
                xx = Math.floor((pointer.worldX - s.map.x) * (1 / G.Loader.currentConfigMulti)),
                yy = Math.floor((pointer.worldY - s.map.y) * (1 / G.Loader.currentConfigMulti));
            this.lvlLineX.push(xx), this.lvlLineY.push(yy)
        }, this), this.keys.C.onDown.add(function() {
            this.lvlLineX.pop(), this.lvlLineY.pop()
        }, this), this.keys.V.onDown.add(function() {
            var from = parseInt(prompt("FROM: ")),
                to = parseInt(prompt("TO: "));
            if (isNaN(from) && isNaN(to)) G.lineUtils.spreadAcrossLine(this.lvlLineX, this.lvlLineY, G.json.levels, "mapX", "mapY");
            else {
                isNaN(from) && !isNaN(to) && (from = 0), !isNaN(from) && isNaN(to) && (to = G.json.levels.length), from--;
                var array = G.json.levels.slice(from, to);
                G.lineUtils.spreadAcrossLine(this.lvlLineX, this.lvlLineY, array, "mapX", "mapY")
            }
            s.map.refreshButtons()
        }, this), this.keys.N.onDown.add(function() {
            console.log("N key");
            var from = parseInt(prompt("FROM: ")),
                to = parseInt(prompt("TO: "));
            if (isNaN(from) && isNaN(to)) G.lineUtils.spreadAcrossLine(this.lvlLineX, this.lvlLineY, G.json.levels, "mapX", "mapY");
            else {
                isNaN(from) && !isNaN(to) && (from = 0), !isNaN(from) && isNaN(to) && (to = G.json.levels.length), from--;
                var array = G.json.levels.slice(from, to);
                console.log("from to: " + from + "x" + to), G.lineUtils.spreadOnNodes(this.lvlLineX, this.lvlLineY, array, "mapX", "mapY")
            }
            s.map.refreshButtons()
        }, this), this.keys.B.onDown.add(function() {
            this.lvlLineX = [], this.lvlLineY = [], G.json.levels.forEach(function(lvl) {
                this.lvlLineX.push(lvl.mapX), this.lvlLineY.push(lvl.mapY)
            }, this)
        }, this)
    }, G.BOT = function(board) {
        Phaser.Group.call(this, game), this.board = board, this.active = !1, this.finished = !1, this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), this.spacebar.onDown.add(function() {
            this.active = !this.active
        }, this), G.sb("onGoalAchieved").add(function() {
            this.finished = !0
        }, this)
    }, G.BOT.prototype = Object.create(Phaser.Group.prototype), G.BOT.prototype.update = function() {
        return !this.active || this.finished ? void(G.IMMEDIATE = !1) : (G.IMMEDIATE = !0, void(this.active && this.board.isIdle() && this.board.possibleMoves[0] && this.makeMove()))
    }, G.BOT.prototype.makeMove = function() {
        var move = game.rnd.pick(this.board.possibleMoves),
            candy1 = this.board.getCandy(move[0], move[1]),
            candy2 = this.board.getCandy(move[2], move[3]);
        this.board.makeMove(candy1, candy2)
    }, G.BoosterTutorialText = function() {
        Phaser.Group.call(this, game), this.x = G.l(480), this.y = .8 * game.height, this.alpha = 0, this.bg = G.makeImage(0, 0, "text_shade_bg", .5, this), this.bg.alpha = 0, G.sb("onBoosterUse").add(function(nr) {
            G.lvl.tutOpen || (this.alpha = 1, 1 == nr && this.makeNewText("CANDY SWIPER CHANGES THE PLACE OF TWO CANDIES"), 2 == nr && this.makeNewText("SWEET APPLE CRUSHES ONE CANDY. TAP ON CANDY YOU WANT TO CRUSH"), (3 == nr || 4 == nr) && this.makeNewText("THE ROLLING PIN CAN CLEAR WHOLE ROW OR COLUMN"))
        }, this), G.sb("onBoosterUsed").add(function() {
            G.lvl.tutOpen || game.add.tween(this).to({
                alpha: 0
            }, 500, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(this.hide, this)
        }, this)
    }, G.BoosterTutorialText.prototype = Object.create(Phaser.Group.prototype), G.BoosterTutorialText.prototype.makeNewText = function(txt) {
        this.txt = new G.Text(0, 0, {
            font: "ComicSansBold",
            fill: "white",
            fontSize: "45px",
            lineSpacing: -25
        }, .5, 940, 400, !0, "center"), this.txt.alpha = 0, this.add(this.txt), game.add.tween(this.txt).to({
            alpha: 1
        }, 500, Phaser.Easing.Sinusoidal.Out, !0), this.bg.width = this.txt.width + G.l(100), this.bg.height = this.txt.height + G.l(100), game.add.tween(this.bg).to({
            alpha: .7
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.BoosterTutorialText.prototype.changeText = function(txt) {
        var currentTxt = this.txt;
        game.add.tween(currentTxt).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(currentTxt.destroy, currentTxt), this.makeNewText(txt)
    }, G.BoosterTutorialText.prototype.hide = function() {
        if (this.txt) {
            var currentTxt = this.txt;
            game.add.tween(this).to({
                alpha: 0
            }, 500, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
                this.bg.alpha = 0, currentTxt.destroy()
            }, this)
        }
    }, G.CollectableAnimLayer = function(board, topBar) {
        Phaser.Group.call(this, game), this.board = board, this.goalPanel = topBar.goalPanel, G.IMMEDIATE || G.sb("onCandyToUIAnim").add(function(type, elem, sprite, callback, context) {
            if (!elem) return void callback.call(context);
            var goalPanel = this.goalPanel.getGoalPanel(type);
            this.getFreeParticle().init(type, elem, goalPanel, sprite, callback, context)
        }, this)
    }, G.CollectableAnimLayer.prototype = Object.create(Phaser.Group.prototype), G.CollectableAnimLayer.prototype.getFreeParticle = function() {
        return this.getFirstDead() || this.add(new G.CollectableAnimPart(this.board, this.goalPanel))
    }, G.CollectableAnimLayer.prototype.initNofly = function(panel) {
        this.getFreeParticle().initNofly(panel)
    }, G.CollectableAnimPart = function(board, goalPanel) {
        Phaser.Image.call(this, game), this.kill(), this.anchor.setTo(.5), this.board = board, this.goalPanel = goalPanel
    }, G.CollectableAnimPart.prototype = Object.create(Phaser.Image.prototype), G.CollectableAnimPart.prototype.init = function(type, candy, target, sprite, callback, context) {
        this.revive();
        var pxOut = this.board.cellToPxOut([candy.cellX, candy.cellY]);
        this.x = pxOut[0], this.y = pxOut[1], this.scale.setTo(1), this.alpha = 1, G.changeTexture(this, sprite || G.json.settings.goals[type].sprite);
        var target = target,
            targetX = target.img.worldPosition.x + game.world.bounds.x,
            targetY = target.img.worldPosition.y;
        game.add.tween(this.scale).to({
            x: 1.2,
            y: 1.2
        }, 250, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            game.add.tween(this).to({
                x: targetX,
                y: targetY,
                width: target.img.width * target.scale.x,
                height: target.img.height * target.scale.y
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function() {
                callback && callback.call(context), game.add.tween(this).to({
                    alpha: 0
                }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.scale).to({
                    x: 2,
                    y: 2
                }, 300, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
                    this.kill()
                }, this)
            }, this)
        }, this)
    }, G.CollectableAnimPart.prototype.initNofly = function(panel) {
        this.revive(), this.x = game.world.bounds.x + panel.img.worldPosition.x, this.y = panel.img.worldPosition.y, this.alpha = 1, G.changeTexture(this, G.json.settings.goals[panel.goalName].sprite), this.width = panel.img.width * panel.scale.x, this.height = panel.img.height * panel.scale.y, game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            this.kill()
        }, this)
    }, G.FadeLayer = function() {
        Phaser.Image.call(this, game, 0, 0), game.camera.flash(16777215, 600, !0), G.sb("onStateChange").add(this.setupChange, this), this.game.add.existing(this)
    }, G.FadeLayer.prototype = Object.create(Phaser.Image.prototype), G.FadeLayer.constructor = G.FadeLayer, G.FadeLayer.prototype.setupChange = function(changeLevel, arg1, arg2, arg3, arg4) {
        G.sfx.transition.play(), game.camera.onFadeComplete.getNumListeners() > 0 || (game.camera.onFadeComplete.addOnce(function() {
            game.state.start(changeLevel, !0, !1, arg1, arg2, arg3, arg4)
        }), game.camera.fade(16777215, 300, !0))
    }, G.FxParticle = function(board, fxGroup) {
        Phaser.Image.call(this, game), this.board = board, this.fxGroup = fxGroup, this.anchor.setTo(.5), this.kill(), this.id = Math.random(), this.animationData = {
            currentIndex: 0,
            currentTimer: 0,
            timer: 3,
            loop: 0,
            maxFrame: 0,
            gfxName: ""
        }
    }, G.FxParticle.prototype = Object.create(Phaser.Image.prototype), G.FxParticle.prototype.getOther = function() {
        return this.parent.getFreeParticle()
    }, G.FxParticle.prototype.update = function() {
        this.alive && this.updateFunc()
    }, G.FxParticle.prototype.updateAnimation = function() {
        if (this.animationData.currentTimer += G.deltaTime, this.animationData.currentTimer >= this.animationData.timer) {
            if (this.animationData.currentIndex++, this.animationData.currentTimer -= this.animationData.timer, this.animationData.currentIndex > this.animationData.maxFrame) {
                if (0 == this.animationData.loop) return this.kill();
                this.animationData.loop--, this.animationData.currentIndex = 0
            }
            G.changeTexture(this, this.animationData.gfxName + this.animationData.currentIndex)
        }
    }, G.FxParticle.prototype.initAnimation = function(gfxName, maxFrame, timer, loop, startingIndex) {
        this.animationData.currentIndex = startingIndex || 0, this.animationData.currentTimer = 0, this.animationData.timer = timer, this.animationData.gfxName = gfxName, this.animationData.maxFrame = maxFrame, this.animationData.loop = loop || 0, G.changeTexture(this, gfxName + this.animationData.currentIndex), this.updateFunc = this.updateAnimation
    }, G.FxParticle.prototype.emptyFunc = function() {}, G.FxParticle.prototype.init = function(x, y) {
        this.x = x, this.y = y, this.blendMode = 0, this.alpha = 1, this.angle = 0, this.scale.setTo(1), this.updateFunc = this.emptyFunc, this.anchor.setTo(.5), this.revive()
    }, G.FxParticle.prototype.explosion = function(x, y, args) {
        this.init(x, y), this.initAnimation("cookie_match_", 10, 2, 0, 1), this.scale.setTo(.6)
    }, G.FxParticle.prototype.spiral = function(x, y, args) {
        this.init(x, y), this.initAnimation("candy_spiral_explode_", 13, 2)
    }, G.FxParticle.prototype.dummyFadeOut = function(x, y, args) {
        this.init(x, y), G.changeTexture(this, args), game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.dummyFadeOutScaleIn = function(x, y, args) {
        this.init(x, y), G.changeTexture(this, args), game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.dummyComboGrowAndFade = function(x, y, args) {
        this.fxGroup.aboveThirdFloorLayer.add(this), this.init(x, y), G.changeTexture(this, args[0]), this.angle = args[1], this.alpha = .8;
        var scaleTween = game.add.tween(this.scale).to({
            x: 2.5,
            y: 2.5
        }, 200, Phaser.Easing.Sinusoidal.In, !0);
        game.add.tween(this).to({
            alpha: 0
        }, 100, Phaser.Easing.Sinusoidal.In, !0, 100).onComplete.add(function() {
            scaleTween.stop(), this.fxGroup.add(this), this.kill()
        }, this)
    }, G.FxParticle.prototype.electricCircle = function(x, y) {
        this.init(x, y), this.blendMode = 1, G.loadTexture(this, "circle"), game.add.tween(this).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.Out, !0, 300).onComplete.add(this.kill, this), this.updateFunc = this.electricCircleUpdate, this.other = this.getOther(), this.other.blendMode = 1, G.loadTexture(this.other, "circle"), this.other.updateFunc = this.other.electricCircleUpdate, game.add.tween(this.other).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.Out, !0, 300).onComplete.add(this.other.kill, this.other)
    }, G.FxParticle.prototype.electricCircleUpdate = function() {
        this.scale.setTo(1 + .5 * Math.random())
    }, G.FxParticle.prototype.smallCircle = function(x, y) {
        this.init(x, y), this.blendMode = 1, G.loadTexture(this, "circle"), this.scale.setTo(0), this.alpha = .5, game.add.tween(this.scale).to({
            x: .5,
            y: .5
        }, 150, Phaser.Easing.Cubic.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 150, Phaser.Easing.Cubic.Out, !0, 200).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.lightCircle = function(x, y) {
        this.init(x, y), this.blendMode = 1, G.loadTexture(this, "circle"), this.scale.setTo(0), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 500, Phaser.Easing.Cubic.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Cubic.Out, !0, 200).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.lightCircleFast = function(x, y) {
        this.init(x, y), this.blendMode = 1, G.loadTexture(this, "circle"), this.scale.setTo(0), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Cubic.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 200, Phaser.Easing.Cubic.Out, !0, 100).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.changeCircle = function(x, y) {
        this.init(x, y), this.blendMode = 1, G.loadTexture(this, "circle"), this.scale.setTo(.6), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 600, Phaser.Easing.Cubic.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 600, Phaser.Easing.Cubic.Out, !0).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.initStroke = function(x, y, candy, angle) {
        this.init(x, y);
        var parsetType = parseInt(candy.candyType),
            sprite = "line_effect_" + game.rnd.between(1, 6);
        parsetType >= 1 && 6 >= parsetType && (sprite = "line_effect_" + parsetType), G.changeTexture(this, sprite), this.angle = angle || 0, game.add.tween(this.scale).to({
            y: 15
        }, 500, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 100, Phaser.Easing.Cubic.In, !0, 400).onComplete.add(function() {
            this.kill()
        }, this)
    }, G.FxParticle.prototype.strokeH = function(x, y, args, candy) {
        this.initStroke(x, y, candy, 90)
    }, G.FxParticle.prototype.strokeV = function(x, y, args, candy) {
        this.initStroke(x, y, candy, 0)
    }, G.FxParticle.prototype.strokeDR = function(x, y, args, candy) {
        this.initStroke(x, y, candy, -45)
    }, G.FxParticle.prototype.strokeDF = function(x, y, args, candy) {
        this.initStroke(x, y, candy, 45)
    }, G.FxParticle.prototype.lightning = function(x, y, args) {
        this.init(x, y), G.changeTexture(this, "lightning"), this.anchor.setTo(.5, 0);
        var x2 = this.board.cellXToPxIn(args[0]),
            y2 = this.board.cellYToPxIn(args[1]);
        this.height = game.math.distance(x, y, x2, y2), this.rotation = game.math.angleBetween(x, y, x2, y2), this.angle -= 90, this.timer = 0, this.updateFunc = this.lightningUpdate, game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Cubic.In, !0).onComplete.add(function() {
            this.kill()
        }, this)
    }, G.FxParticle.prototype.lightningUpdate = function() {
        this.timer += 1 * G.deltaTime, this.timer > 2 && (this.scale.x *= -1, this.timer = 0)
    }, G.FxParticle.prototype.chocolatePart = function(x, y) {
        this.init(x, y), this.x += G.l(40 * Math.random() - 20), this.y += G.l(40 * Math.random() - 20), G.changeTexture(this, "chocolatePiece"), this.scale.setTo(.8), this.angle = 360 * Math.random(), this.velX = Math.random() * G.lnf(-12) + G.lnf(6), this.velY = Math.random() * G.lnf(-6) - G.lnf(4), this.gravity = G.lnf(.6), this.updateFunc = this.fallingPartUpdate
    }, G.FxParticle.prototype.chocolatePartW = function(x, y) {
        this.init(x, y), this.x += G.l(40 * Math.random() - 20), this.y += G.l(40 * Math.random() - 20), G.changeTexture(this, "chocolatePieceW"), this.scale.setTo(.8), this.angle = 360 * Math.random(), this.velX = Math.random() * G.lnf(-12) + G.lnf(6), this.velY = Math.random() * G.lnf(-6) - G.lnf(4), this.gravity = G.lnf(.6), this.updateFunc = this.fallingPartUpdate
    }, G.FxParticle.prototype.burstConcrete = function(x, y, offsetX, offsetY, gfx) {
        this.init(x + G.l(offsetX), y + G.l(offsetY)), G.changeTexture(this, gfx), this.burstConcreteVelX = Math.sign(offsetX) * G.lnf(2 + 3 * Math.random()), this.burstConcreteVelY = G.lnf(-3 + -3 * Math.random()), this.burstConcreteGrav = G.lnf(.6), this.updateFunc = this.burstConcreteUpdate
    }, G.FxParticle.prototype.burstConcreteUpdate = function() {
        this.x += this.burstConcreteVelX, this.y += this.burstConcreteVelY, this.angle += 2 * this.burstConcreteVelX, this.burstConcreteVelX *= .98, this.burstConcreteVelY += this.burstConcreteGrav, this.alpha -= .03, this.scale.setTo(this.scale.x + .01), this.alpha <= 0 && this.kill()
    }, G.FxParticle.prototype.burstLookup = {
        1: 17,
        2: 15,
        3: 16,
        4: 16,
        5: 16,
        6: 17
    }, G.FxParticle.prototype.burstCandy = function(x, y, candy) {
        this.init(x, y), this.scale.setTo(.9), this.alpha = 1, this.initAnimation("cookie_match_", 10, 2, 0, 1)
    }, G.FxParticle.prototype.burstIce = function(x, y, candy) {
        this.init(x, y), this.alpha = 1, this.scale.setTo(1), this.initAnimation("ice_part_", 13, 2, 0, 1)
    }, G.FxParticle.prototype.burstConcreteAnim = function(x, y, candy) {
        this.init(x, y), this.alpha = 1, this.scale.setTo(1), this.initAnimation("concrete_part_", 17, 2, 0, 0)
    }, G.FxParticle.prototype.burstDirtAnim = function(x, y, candy) {
        this.init(x, y), this.alpha = 1, this.scale.setTo(1), this.initAnimation("dirt_part_", 16, 2, 0, 0)
    }, G.FxParticle.prototype.burstInfectionAnim = function(x, y, candy) {
        this.init(x, y), this.alpha = 1, this.scale.setTo(1), this.initAnimation("infection_part_", 18, 2, 0, 0)
    }, G.FxParticle.prototype.burstChainAnim = function(x, y, candy) {
        this.init(x, y), this.alpha = 1, this.scale.setTo(1), this.initAnimation("unwrap_part_", 14, 2, 0, 0)
    }, G.FxParticle.prototype.glowLookup = {
        1: 8,
        2: 12,
        3: 5,
        4: 6,
        5: 11,
        6: 8
    }, G.FxParticle.prototype.whiteStarPart = function(x, y) {
        this.init(x, y), G.changeTexture(this, "starPart"), this.blendMode = 1, this.angle = 360 * Math.random(), this.velX = Math.random(20) * G.lnf(-20) + G.lnf(10), this.velY = Math.random() * G.lnf(-9) - G.lnf(3), this.gravity = G.lnf(.5), this.updateFunc = this.fallingPartUpdate
    }, G.FxParticle.prototype.fallingPartUpdate = function() {
        this.x += this.velX * G.deltaTime, this.y += this.velY * G.deltaTime, this.angle += .1 * this.velX, this.velX *= .99, this.velY += this.gravity * G.deltaTime, this.alpha -= .02, this.alpha <= 0 && this.kill()
    }, G.FxParticle.prototype.whiteStarPartFast = function(x, y) {
        this.init(x, y), G.changeTexture(this, "starPart"), this.blendMode = 1, this.angle = 360 * Math.random(), this.velX = Math.random(20) * G.lnf(-20) + G.lnf(10), this.velY = Math.random() * G.lnf(-9) - G.lnf(3), this.gravity = G.lnf(.25), this.updateFunc = this.fallingPartUpdate
    }, G.addTextStyles = function() {
        G.Text.addStyle("font-white", {
            font: "ComicSansBold",
            fill: "white",
            fontSize: 40
        }), G.Text.addStyle("font-white-stroke", {
            font: "ComicSansBold",
            fill: "white",
            fontSize: 40,
            stroke: "#85511f",
            strokeThickness: 5
        }), G.Text.addStyle("font-green", {
            font: "ComicSansBold",
            fill: "#f7ffdb",
            fontSize: 40,
            stroke: "#005700",
            strokeThickness: 5
        }), G.Text.addStyle("font-beige", {
            font: "ComicSansBold",
            fill: "#85511f",
            fontSize: 40
        }), G.Text.addStyle("font-beige-standard", {
            font: "ComicSansBold",
            fill: "#fdfbe4",
            fontSize: 40,
            stroke: "#73461c",
            strokeThickness: 7
        }), G.Text.addStyle("font-beige-header", {
            font: "ComicSansBold",
            fill: "#85511f",
            fontSize: 40
        }), G.Text.addStyle("font-brown", {
            font: "ComicSansBold",
            fill: "#85511f",
            fontSize: 40,
            stroke: "#ffedd9",
            strokeThickness: 7
        }), G.Text.addStyle("font-red", {
            font: "ComicSansBold",
            fill: "#ffe9d0",
            fontSize: 40,
            stroke: "#961400",
            strokeThickness: 7
        }), G.Text.addStyle("font-blue-out", {
            font: "ComicSansBold",
            fill: "#ffffe8",
            fontSize: 40,
            stroke: "#004455",
            strokeThickness: 10
        }), G.Text.addStyle("font-blue-out-small", {
            font: "ComicSansBold",
            fill: "#ffffe8",
            fontSize: 40,
            stroke: "#004455",
            strokeThickness: 5
        }), G.Text.addStyle("font-gray", {
            font: "ComicSansBold",
            fill: "white",
            fontSize: 40,
            stroke: "#393939",
            strokeThickness: 5
        }), G.Text.addStyle("font-white", {
            font: "Lobster",
            fill: "white",
            fontSize: "30px",
            shadow: [2, 3, "rgba(0,0,0,0.3)", 0]
        }), G.Text.addStyle("font-blue", {
            font: "Lobster",
            fill: "#008aca",
            fontSize: "30px"
        }), G.Text.addStyle("font-darkBlue", {
            font: "Lobster",
            fill: "#006A8F",
            fontSize: "30px"
        }), G.Text.addStyle("font-num-blue", {
            font: "Lobster",
            fill: "white",
            fontSize: "30px",
            stroke: "#3d95ea",
            strokeThickness: 3
        }), G.Text.addStyle("font-num-orange", {
            font: "Lobster",
            fill: "white",
            fontSize: "30px",
            stroke: "#ff7200",
            strokeThickness: 3
        }), G.Text.addStyle("font-score-0", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#eea1c2"
        }), G.Text.addStyle("font-score-1", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#c52216"
        }), G.Text.addStyle("font-score-2", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#1eb3e5"
        }), G.Text.addStyle("font-score-3", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#eac867"
        }), G.Text.addStyle("font-score-4", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#e34bbc"
        }), G.Text.addStyle("font-score-5", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#7adc2c"
        }), G.Text.addStyle("font-score-6", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#e79909"
        }), G.Text.addStyle("rubikWB", {
            font: "RubikBold",
            fontSize: "40px",
            stroke: "#49abe8",
            strokeThickness: 6,
            fill: "white"
        }), G.Text.addStyle("rubikPW", {
            font: "RubikBold",
            fontSize: "40px",
            stroke: "white",
            strokeThickness: 6,
            fill: "#EC048D"
        })
    }, "undefined" == typeof G && (G = {}), G.Button = function(x, y, sprite, callback, context) {
        Phaser.Button.call(this, game, G.l(x), G.l(y), null), this.state = game.state.getCurrentState(), G.changeTexture(this, sprite), this.anchor.setTo(.5), this.sfx = G.sfx.pop, this.active = !0, this.onClick = new Phaser.Signal, callback && this.onClick.add(callback, context || this), this.onInputDown.add(this.click, this), this.terms = [], this.IMMEDIATE = !1, this.pulsing = !1, this.tweenScale = !1
    }, G.Button.prototype = Object.create(Phaser.Button.prototype), G.Button.constructor = G.Button, G.Button.prototype.pulse = function(maxScale) {
        this.pulsing = !0, this.pulsingTween = game.add.tween(this.scale).to({
            x: maxScale || 1.1,
            y: maxScale || 1.1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.Button.prototype.stopPulse = function(maxScale) {
        this.pulsingTween && this.pulsingTween.stop(), this.scale.setTo(maxScale || 1), this.pulsing = !1
    }, G.Button.prototype.click = function() {
        if (this.active) {
            for (var i = 0; i < this.terms.length; i++)
                if (!this.terms[i][0].call(this.terms[i][1])) return;
            this.active = !1, this.onClick.dispatch(), this.sfx.play();
            var orgScaleX = this.scale.x,
                orgScaleY = this.scale.y;
            this.IMMEDIATE ? this.active = !0 : this.pulsing ? game.time.events.add(400, function() {
                this.active = !0
            }, this) : game.add.tween(this.scale).to({
                x: this.tweenScale ? this.tweenScale.x : orgScaleX + .2 * Math.sign(orgScaleX),
                y: this.tweenScale ? this.tweenScale.y : orgScaleY + .2 * Math.sign(orgScaleY)
            }, 200, Phaser.Easing.Quadratic.Out, !0).onComplete.add(function() {
                game.add.tween(this.scale).to({
                    x: orgScaleX,
                    y: orgScaleY
                }, 200, Phaser.Easing.Quadratic.Out, !0).onComplete.add(function() {
                    this.active = !0
                }, this)
            }, this)
        }
    }, G.Button.prototype.addTerm = function(callback, context) {
        this.terms.push([callback, context])
    }, G.Button.prototype.addImageLabel = function(image) {
        this.label = game.make.image(0, 0, "ssheet", image), this.label.anchor.setTo(.5), this.addChild(this.label)
    }, G.Button.prototype.addTextLabel = function(font, text, size, x, y, maxWidth) {
        var multi = 1 / G.Loader.currentConfigMulti;
        x = "undefined" == typeof x ? 0 : x, y = "undefined" == typeof y ? -6 : y, maxWidth = "undefined" == typeof maxWidth ? this.width * multi * .7 : maxWidth, this.label = new G.Text(x, y, text, {
            style: font,
            fontSize: size || Math.floor(this.height * multi * .7)
        }, .5, maxWidth), this.label.scale.setTo(Math.min(this.label.scale.x, this.label.scale.y)), this.label.hitArea = new Phaser.Rectangle(0, 0, 0, 0), this.addChild(this.label)
    }, G.Button.prototype.addTextLabelMultiline = function(font, text) {
        this.label = new G.Text(0, 0, text, {
            style: font,
            fontSize: Math.floor(.5 * this.height)
        }, .5, .7 * this.width, .7 * this.height, !0, "center"), this.addChild(this.label)
    }, G.ChestLayer = function() {
        Phaser.Group.call(this, game), this.deadElems = [], this.state = game.state.getCurrentState(), this.board = this.state.board, this.deadArray = [], G.sb("onChestOpen").add(function(elem) {
            var pxOut = this.board.cellToPxOut([elem.cellX, elem.cellY]);
            this.getFreeParticle().init(pxOut[0], pxOut[1]), this.sort("orgY", Phaser.Group.SORT_ASCENDING)
        }, this)
    }, G.ChestLayer.prototype = Object.create(Phaser.Group.prototype), G.ChestLayer.prototype.onElemKilled = function(elem) {
        this === elem.parent && (this.deadArray.push(elem), this.removeChild(elem))
    }, G.ChestLayer.prototype.getFreeParticle = function() {
        return this.deadArray.length > 0 ? part = this.deadArray.pop() : (part = new G.Chest(this.board, this), part.events.onKilled.add(this.onElemKilled, this)), this.add(part), part
    }, G.Chest = function() {
        Phaser.Image.call(this, game, 0, 0), G.changeTexture(this, "chest_bottom"), this.anchor.setTo(.5), this.state = game.state.getCurrentState(), this.cover = G.makeImage(-33, 0, null, [0, 1], this), this.light = G.makeImage(0, -20, "popup_lighht", .5, this), this.light.scale.setTo(.5), this.light.cacheAsBitmap = !0, this.light.blendMode = 1, this.addChild(this.light), this.gift = G.makeImage(0, -10, null, .5, this), this.animTimer = 0, this.animEvery = 3, this.animIndex = 0, this.coverCoords = [
            [G.l(-33), 0],
            [G.l(-33), G.l(-8)],
            [G.l(-33), G.l(-8)],
            [G.l(-35), G.l(-8)]
        ], this.kill()
    }, G.Chest.prototype = Object.create(Phaser.Image.prototype), G.Chest.prototype.init = function(x, y) {
        G.stopTweens(this), G.changeTexture(this.cover, "chest_top_00"), this.cover.y = 0, this.orgX = x, this.orgY = y, this.alpha = 1, this.scale.setTo(1), this.animTimer = 0, this.animIndex = 0, this.x = x, this.y = y + G.l(5), this.light.alpha = 0, game.add.tween(this).to({
                y: y - G.l(30)
            }, 1500, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.scale).to({
                x: 1.2,
                y: 1.2
            }, 400, Phaser.Easing.Sinusoidal.Out, !0), G.stopTweens(this.gift), this.giftData = G.gift.getGift("ingamechests"), G.changeTexture(this.gift, G.gift.getIcon(this.giftData)), "coin" == this.giftData[0] && (1 == this.giftData[1] ? G.changeTexture(this.gift, "coin_package_icon_0") : 2 == this.giftData[1] ? G.changeTexture(this.gift, "coin_package_icon_1") : 3 == this.giftData[1] ? G.changeTexture(this.gift, "coin_package_icon_2") : G.changeTexture(this.gift, "coin_package_icon_4")),
            this.gift.scale.setTo(0), this.gift.angle = -10, this.gift.y = G.l(-10), this.update = this.updatePreOpen, this.revive(), G.sfx.chest_open_louder.play()
    }, G.Chest.prototype.updatePreOpen = function() {
        if (this.alive) {
            if (this.animIndex < 3 && this.animTimer++ % this.animEvery == 0 && (this.animIndex++, this.cover.x = this.coverCoords[this.animIndex][0], this.cover.y = this.coverCoords[this.animIndex][1], G.changeTexture(this.cover, "chest_top_0" + this.animIndex), 3 == this.animIndex)) {
                var scaleTo = 1;
                game.add.tween(this.gift.scale).to({
                    x: scaleTo,
                    y: scaleTo
                }, 600, Phaser.Easing.Bounce.Out, !0);
                var moveTween = game.add.tween(this.gift).to({
                    y: G.l(-40)
                }, 400, Phaser.Easing.Sinusoidal.InOut).to({
                    y: G.l(-30)
                }, 1100, Phaser.Easing.Sinusoidal.Out);
                moveTween.start(), game.add.tween(this.gift).to({
                    angle: 10
                }, 1500, Phaser.Easing.Sinusoidal.InOut, !0), game.time.events.add(1e3, function() {
                    G.gift.applyGift(this.giftData, !0), game.add.tween(this).to({
                        alpha: 0
                    }, 500, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function() {
                        this.kill()
                    }, this)
                }, this)
            }
            this.light.angle++, this.light.alpha = game.math.clamp(this.light.alpha + .03, 0, .5)
        }
    }, G.DotBg = function(lvl_gfx) {
        this.texture = game.add.renderTexture(game.width, game.height), this.marker = G.makeImage(0, 0, "background_star_tile", 0, null), this.marker.alpha = .4, this.img = game.add.image(0, 0, this.texture), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.DotBg.prototype = Object.create(Phaser.Image.prototype), G.DotBg.prototype.onScreenResize = function() {
        this.texture.resize(game.width, game.height), this.texture.clear(), this.img.x = game.world.bounds.x;
        for (var xx = 0; xx < game.width; xx += this.marker.width)
            for (var yy = 0; yy < game.height; yy += this.marker.height) this.texture.renderXY(this.marker, xx, yy)
    }, G.FxMapLayer = function() {
        G.PoolGroup.call(this, G.FxMapPart), this.fixedToCamera = !0, G.sb("fxMap").add(this.init, this)
    }, G.FxMapLayer.prototype = Object.create(G.PoolGroup.prototype), G.FxMapPart = function() {
        G.Image.call(this), this.state = game.state.getCurrentState()
    }, G.FxMapPart.prototype = Object.create(G.Image.prototype), G.FxMapPart.prototype.emptyUpdate = function() {}, G.FxMapPart.prototype.reset = function(obj) {
        this.x = obj.position ? obj.position.x : obj.x, this.y = obj.position ? obj.position.y : obj.y, this.anchor.setTo(.5), this.scale.setTo(1), this.alpha = 1, this.angle = 0, this.blendMode = 0, this.changeTexture(null), this.visible = !0, this.update = this.emptyUpdate, this.revive()
    }, G.FxMapPart.prototype.init = function(effect, obj) {
        this.reset(obj), this[effect] ? this[effect].apply(this, arguments) : console.warn("There is no " + effect + " in G.FxPart")
    }, G.FxMapPart.prototype.star = function(fx, obj) {
        this.changeTexture("starPart"), this.blendMode = 1, this.alpha = obj.alpha || 1, this.grav = "undefined" == typeof obj.grav ? 0 : obj.grav, this.timer = obj.timer || game.rnd.between(20, 40), this.blendMode = 0, this.scale.setTo(obj.scale || .7), this.velX = obj.velX || game.rnd.realInRange(-10, 10), this.velY = obj.velY || game.rnd.realInRange(-20, -8), this.velAngle = game.rnd.realInRange(-5, 5), this.angle = game.rnd.realInRange(0, 360), this.update = this.starUpdate
    }, G.FxMapPart.prototype.starUpdate = function() {
        this.x += this.velX, this.y += this.velY, this.velX *= .95, this.velY *= .95, this.angle += this.velAngle, this.timer-- < 0 && (this.alpha -= .05, this.alpha <= 0 && this.kill())
    }, G.gameTracking = {
        sink: function(dim1, dim2, dim3, val) {},
        source: function(dim1, dim2, dim3, val) {},
        start: function(dim1, dim2, dim3, val) {},
        fail: function(dim1, dim2, dim3, val) {},
        complete: function(dim1, dim2, dim3, val) {},
        design: function(dim1, val) {},
        init: function() {
            this.onInitFinished = new Phaser.Signal, data = localStorage.getItem("ftueEventsData"), null === data ? this.ftueData = {} : this.ftueData = JSON.parse(data), this.initialized = !0, this.onInitFinished.dispatch()
        },
        FTUEDesign: function(dim1, val) {
            this.initialized && this._FTUEDesign(dim1, val)
        },
        _FTUEDesign: function(dim1, val) {
            this.ftueData[dim1] || (this.ftueData[dim1] = !0, this.design(dim1, val), localStorage.setItem("ftueEventsData", JSON.stringify(this.ftueData)))
        },
        checkFTUE: function(dim) {
            return this.ftueData[dim]
        }
    }, G.ga = {
        event: function() {}
    }, G.gift = {}, G.gift.getGift = function(giftsGroup) {
        var giftsGroup = giftsGroup || "normals",
            giftsObj = G.json.settings.gifts[giftsGroup],
            boosterMaxNr = giftsObj.boosterMaxNr || G.json.settings.gifts.boosterMaxNr,
            boosterChance = giftsObj.boosterChance || G.json.settings.gifts.boosterChance,
            possibleGifts = [];
        giftsObj.list.forEach(function(e) {
            "coin" == e[0] ? possibleGifts.push(e) : -1 !== e[0].indexOf("booster") ? G.saveState.isBoosterUnlocked(parseInt(e[0][8])) && G.saveState.getBoosterAmount(parseInt(e[0][8])) < boosterMaxNr && possibleGifts.push(e) : "ginger" === e[0] && G.GINGEREVENT && possibleGifts.push(e)
        }), Phaser.ArrayUtils.shuffle(possibleGifts);
        for (var booster = Math.random() < boosterChance, i = 0; i < possibleGifts.length; i++) {
            var gift = possibleGifts[i];
            if (-1 === gift[0].indexOf("booster")) return gift.slice();
            if (booster) return gift.slice()
        }
        return ["coin", 50]
    }, G.gift.getLabelString = function(giftData, imgScale) {
        var middleStr = "coin" === giftData[0] ? "" : "x",
            imgScale = imgScale ? "*" + imgScale + "*" : "";
        return giftData[1] + middleStr + "@" + imgScale + G.json.settings.gifts.icons[giftData[0]] + "@"
    }, G.gift.applyGift = function(giftData, skipSave) {
        "coin" == giftData[0] ? G.saveState.changeCoins(giftData[1], skipSave) : "life" == giftData[0] ? G.saveState.addLife(giftData[1], skipSave) : "ginger" == giftData[0] ? G.saveState.addGinger(giftData[1]) : G.saveState.changeBoosterAmount(parseInt(giftData[0][8]), giftData[1], skipSave)
    }, G.gift.getIcon = function(giftData) {
        return G.json.settings.gifts.icons[giftData[0]]
    }, G.gift.processRandomBoosters = function(gift) {
        if ("coin" === gift[0] && "R" !== gift[0][8]) return gift;
        var availableBoosters = [1, 2, 3, 4, 5, 6, 7, 8].filter(function(nr) {
            return G.saveState.isBoosterUnlocked(nr)
        });
        return availableBoosters.length > 0 ? gift[0] = "booster#" + game.rnd.pick(availableBoosters) : (gift[0] = "coin", gift[1] = gift[1] * G.json.settings.gifts.fallbackCoins), gift
    }, G.gift.getLabelPackString = function(gifts) {
        var giftsStr = "";
        return gifts.forEach(function(gift, i, array) {
            giftsStr += G.gift.getLabelString(gift, 1), i !== array.length - 1 && (giftsStr += " ")
        }), giftsStr
    }, G.GiftBox = function(x, y, clickable, gift) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.giftData = gift || G.gift.getGift("normals"), this.giftData = G.gift.processRandomBoosters(this.giftData), this.x = x, this.y = y, this.light = G.makeImage(0, 0, "popup_lighht", .5, this), this.light.update = function() {
            this.angle++
        }, this.light.alpha = 0, this.light.blendMode = 1, this.inside = new G.LabelGroupT(G.gift.getLabelString(this.giftData), 0, 0, {
            font: "ComicSansBold",
            fontSize: "120px",
            fill: "#ad7f56",
            stroke: "#ffedd9",
            strokeThickness: 7
        }, .5, 180), this.add(this.inside), this.inside.alpha = 0, this.gift = G.makeImage(0, 0, "gift", .5, this), clickable && (this.gift.inputEnabled = !0, this.gift.events.onInputDown.add(function() {
            this.gift.inputEnabled = !1, this.unpack()
        }, this), this.hand = G.makeImage(30, 40, "tut_hand", 0, this), this.hand.scale.setTo(.6), game.add.tween(this.hand).to({
            x: G.l(50),
            y: G.l(60)
        }, 600, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0))
    }, G.GiftBox.prototype = Object.create(Phaser.Group.prototype), G.GiftBox.prototype.unpack = function(dontApply) {
        if ("coin" == this.giftData[0] && "World" == game.state.current && this.state.uiTargetParticles) {
            this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.worldPosition.x, this.worldPosition.y, this.state.panel.coinsTxt, this.giftData[1]);
            this.state.uiTargetParticles.createDividedBatch(this.worldPosition.y, "coin_1", this.state.panel.coinsTxt, this.giftData[1], 5)
        } else G.gift.applyGift(this.giftData);
        G.sfx.xylophone_positive_12.play(), game.add.tween(this.gift).to({
            alpha: 0,
            width: 1.2 * this.gift.width,
            height: 1.2 * this.gift.height
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.light).to({
            alpha: .5
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.inside).to({
            alpha: 1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), this.hand && game.add.tween(this.hand).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.InOut, !0)
    }, G.GlobalGoalButton = function(x, y) {
        Phaser.Group.call(this, game), this.position.setTo(0, 130), this.unlocked = G.saveState.getLastPassedLevelNr() >= G.json.settings.featuresUnlock.globalGoals, this.tutorial = this.unlocked && !G.saveState.data.sawGlobalGoalsTut, this.x = G.l(x), this.y = G.l(y), this.state = game.state.getCurrentState(), this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.blendMode = 1, this.glow.scale.setTo(.5), this.glow.alpha = 0, this.importantStuff = G.globalGoalMgr.isAnyToUserAttention(), this.goalBtn = new G.Button(0, 0, this.unlocked ? "Mission_Button_yellow" : "Mission_Button_locked_yellow", function() {
            new G.Window("globalGoals")
        }), this.goalBtn.addTerm(function() {
            return this.unlocked
        }, this), this.add(this.goalBtn), this.unlocked ? this.initUnlocked() : this.initLocked(), this.tutorial && this.addTutHand(), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.GlobalGoalButton.prototype = Object.create(Phaser.Group.prototype), G.GlobalGoalButton.prototype.onResize = function() {
        var center = game.world.bounds.x + Math.floor(.5 * game.width);
        game.width < 1070 ? this.x = center - 265 : this.x = center - 265 - 235
    }, G.GlobalGoalButton.prototype.initUnlocked = function() {
        this.amount = G.makeImage(20, 15, "booster_ammount", .5, this), this.amount.scale.setTo(.75), this.amountTxt = this.amount.addChild(new G.Text(0, 2, this.importantStuff.toString(), {
            style: "font-beige-standard",
            fontSize: "30px"
        }, .5)), this.reasons = [], G.globalGoalMgr.isAnyToUserAttention() && (this.reasons = G.globalGoalMgr.getAttentionReason()), G.sb("onGlobalGoalOutOfTime").add(function(goal) {
            this.reasons.push(goal.status)
        }, this), this.duringMessage = !1, this.txtLookUp = {
            inactive: "New mission available",
            achieved: "Mission completed",
            failed: "Mission failed"
        }, this.initDelay = 30
    }, G.GlobalGoalButton.prototype.initLocked = function() {
        this.unlockTxt = new G.Text(95, 0, G.txt("Unlock at Level X").replace("X", G.json.settings.featuresUnlock.globalGoals + 1), {
            fill: "#fdfbe4",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#73461c",
            strokeThickness: 5
        }, .5, 150, 150, !0, "center"), this.unlockTxt.lineSpacing = -15, this.unlockTxt.setShadow(0, 0, "black", 3), this.add(this.unlockTxt), game.add.tween(this.unlockTxt.scale).to({
            x: .9,
            y: .9
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.GlobalGoalButton.prototype.update = function() {
        if (this.unlocked) {
            var prevImportantStuff = this.importantStuff;
            this.importantStuff = G.globalGoalMgr.isAnyToUserAttention(), prevImportantStuff !== this.importantStuff && this.amountTxt.setText(this.importantStuff.toString()), this.amount.alpha = 0 == this.importantStuff ? 0 : 1, this.glow.angle++, this.importantStuff > 0 ? this.glow.alpha = Math.min(this.glow.alpha + .05, .4) : this.glow.alpha = Math.max(this.glow.alpha - .05, 0), this.updateMsg()
        }
    }, G.GlobalGoalButton.prototype.updateMsg = function() {
        if (!(this.state.windowLayer.children.length > 0)) {
            if (this.initDelay-- < 0 && this.reasons[0] && !this.duringMessage) {
                var txt = this.txtLookUp[this.reasons[0]];
                this.reasons.splice(0, 1);
                var msg = new G.Text(60, 0, G.txt(txt), {
                    fill: "#fdfbe4",
                    font: "ComicSansBold",
                    fontSize: "30px",
                    stroke: "#73461c",
                    strokeThickness: 7
                }, [0, .5], 300);
                msg.scale.x = 0, game.add.tween(msg.scale).to({
                    x: 1
                }, 300, Phaser.Easing.Elastic.Out, !0), this.add(msg), this.duringMessage = !0, game.add.tween(msg).to({
                    alpha: 0
                }, 500, Phaser.Easing.Sinusoidal.In, !0, 2e3).onComplete.add(function() {
                    this.duringMessage = !1, msg.destroy()
                }, this)
            }
        }
    }, G.GlobalGoalButton.prototype.addTutHand = function() {
        this.tutHand = G.makeImage(0, 10, "tut_hand", 0, this), game.add.tween(this.tutHand).to({
            x: G.l(10),
            y: G.l(20)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.goalBtn.onClick.addOnce(function() {
            this.tutHand && (this.tutHand.destroy(), this.tutHand = null, G.saveState.data.sawGlobalGoalsTut = !0)
        }, this)
    }, G.GlobalGoalMgr = function() {
        this.globalGoalsTemplates = G.json.settings.globalGoals, this.loadGoals(), this.lastSave = 15, setInterval(function() {
            G.sb("onWallClockTimeUpdate").dispatch(Date.now())
        }, 1e3), G.sb("onGlobalGoalOutOfTime").addPermanent(this.saveGoals, this), G.sb("onWallClockTimeUpdate").addPermanent(this.updateTimers, this)
    }, G.GlobalGoalMgr.prototype.saveGoals = function() {
        var parsedGoals = [];
        this.goals.forEach(function(goal) {
            parsedGoals.push(goal.stringify())
        }), G.saveState.data.globalGoals = parsedGoals, G.saveState.save()
    }, G.GlobalGoalMgr.prototype.loadGoals = function() {
        if (this.goals = [], !(G.saveState.getLastPassedLevelNr() < G.json.settings.featuresUnlock.globalGoals))
            for (G.saveState.data.globalGoals.forEach(function(goalStr) {
                    this.goals.push(this.parseGoal(goalStr))
                }, this); this.goals.length < 4;) this.createNewGoal()
    }, G.GlobalGoalMgr.prototype.unlockCheck = function() {
        0 === this.goals.length && G.saveState.getLastPassedLevelNr() >= G.json.settings.featuresUnlock.globalGoals && this.loadGoals()
    }, G.GlobalGoalMgr.prototype.updateTimers = function(d) {
        for (var i = 0; i < this.goals.length; i++) this.goals[i].updateTimer(d)
    }, G.GlobalGoalMgr.prototype.isAnyToUserAttention = function() {
        for (var result = 0, i = 0; i < this.goals.length; i++) "active" != this.goals[i].status && result++;
        return result
    }, G.GlobalGoalMgr.prototype.getAttentionReason = function() {
        for (var result = [], i = 0; i < this.goals.length; i++) "active" != this.goals[i].status && -1 == result.indexOf(this.goals[i].status) && result.push(this.goals[i].status);
        return result
    }, G.GlobalGoalMgr.prototype.parseGoal = function(str) {
        var obj = JSON.parse(str),
            goal = new G.GlobalGoal(obj.id, obj.description, obj.listener, obj.terms, obj.increaser, obj.target, obj.timeDuration, obj.afterIncreaseCallbackName, obj.reward, obj.rewardHidden, obj.cancelationPrice);
        return goal.status = obj.status, goal.current = obj.current, obj.timeBeginingDate && (goal.timeBinding = G.sb("onWallClockTimeUpdate").addPermanent(goal.updateTimer, this), goal.timeBeginingDate = obj.timeBeginingDate, goal.updateTimer(Date.now())), goal
    }, G.GlobalGoalMgr.prototype.removeAndPushNew = function(goal) {
        var goalId = goal.id,
            goalIndex = this.goals.indexOf(goal);
        this.goals.splice(goalIndex, 1), goal.destroy(), G.sb("onGlobalGoalRemove").dispatch(goal, goalIndex);
        var newGoal = this.createNewGoal(goalId);
        return this.saveGoals(), newGoal
    }, G.GlobalGoalMgr.prototype.createNewGoal = function(avoidId) {
        var currentId = [];
        "undefined" != typeof avoidId && currentId.push(avoidId);
        for (var i = 0; i < this.goals.length; i++) currentId.push(this.goals[i].id);
        var lastPassed = G.saveState.getLastPassedLevelNr(),
            filteredGoals = this.globalGoalsTemplates.filter(function(goalData) {
                if (goalData.levelRangeRequired && Array.isArray(goalData.levelRangeRequired)) {
                    var min = goalData.levelRangeRequired[0],
                        max = goalData.levelRangeRequired[1];
                    return lastPassed >= min && max > lastPassed
                }
                return !0
            });
        for (filteredGoals.length < 4 && (filteredGoals = this.globalGoalsTemplates);;) {
            var goalIndex = Math.floor(Math.random() * filteredGoals.length);
            if (-1 == currentId.indexOf(filteredGoals[goalIndex].id)) break
        }
        var goalData = filteredGoals[goalIndex],
            playerProgress = G.saveState.getLastPassedLevelNr() / G.json.levels.length;
        if (goalData.levelRangeRequired && Array.isArray(goalData.levelRangeRequired)) {
            var minMaxDiff = goalData.levelRangeRequired[1] - goalData.levelRangeRequired[0];
            playerProgress = (lastPassed - goalData.levelRangeRequired[0]) / minMaxDiff, playerProgress = game.math.clamp(playerProgress, 0, 1)
        }
        var argumentsArray = this.prepareArgumentsArray(goalData, playerProgress),
            newGoal = new(Function.prototype.bind.apply(G.GlobalGoal, [null].concat(argumentsArray)));
        return newGoal.timeRestriction || newGoal.start(), this.goals.push(newGoal), G.sb("onGoalCreated").dispatch(newGoal, this.goals.indexOf(newGoal)), newGoal
    }, G.GlobalGoalMgr.safetyCheck = function() {
        function checkForLvl(lastPassed) {
            var filteredGoals = G.json.settings.globalGoals.filter(function(goalData) {
                if (goalData.levelRangeRequired && Array.isArray(goalData.levelRangeRequired)) {
                    var min = goalData.levelRangeRequired[0],
                        max = goalData.levelRangeRequired[1];
                    return lastPassed >= min && max > lastPassed
                }
                return !0
            });
            return filteredGoals
        }
        for (var i = 0; i < G.json.levels.length++; i++) {
            var len = checkForLvl(i).length;
            console.log(i, len)
        }
    }, G.GlobalGoalMgr.prototype.prepareArgumentsArray = function(goalData, playerProgress) {
        var target = goalData.targetRange[0] + 5 * Math.floor((goalData.targetRange[1] - goalData.targetRange[0]) * playerProgress / 5),
            terms = !1;
        "undefined" != typeof goalData.terms && (terms = JSON.parse(JSON.stringify(goalData.terms)));
        var timeDuration = !1;
        "undefined" != typeof goalData.timeRange && Math.random() < .3 && (timeDuration = goalData.timeRange[0] + 5 * Math.floor((goalData.timeRange[1] - goalData.timeRange[0]) * playerProgress / 5));
        var reward = G.gift.getGift("missions");
        return [goalData.id, goalData.description.replace("%TARGET%", target.toString()), goalData.listener, terms, goalData.increaser, target, timeDuration, goalData.afterIncrease, reward, Math.random() < .4]
    }, G.GlobalGoal = function(id, description, listener, terms, processArray, target, timeDuration, afterIncrease, reward, rewardHidden, cancelationPrice) {
        this.id = id, this.reward = reward, this.rewardHidden = rewardHidden || !1, this.description = description, this.status = "inactive", this.listenerBinding = G.sb(listener).addPermanent(this.onListener, this), this.listener = listener, this.current = 0, this.target = target, this.timeRestriction = timeDuration || !1, this.timeDuration = timeDuration || 0, this.timeBeginingDate = !1, this.cancelationPrice = cancelationPrice || 5 * game.rnd.between(G.json.settings.priceOfGoalRemove[0] / 5, G.json.settings.priceOfGoalRemove[1] / 5), this.terms = terms, this.increaser = processArray, this.afterIncreaseCallback = this.customAfterIncrease[afterIncrease] || !1, this.afterIncreaseCallbackName = afterIncrease || "", this.onFinish = new Phaser.Signal
    }, G.GlobalGoal.prototype.customAfterIncrease = {
        pushPassedLevelToTerms: function(lvlNr) {
            this.terms || (this.terms = [
                []
            ]), this.terms[0].push("!" + lvlNr)
        }
    }, G.GlobalGoal.prototype.stringify = function() {
        var obj = {
            id: this.id,
            reward: this.reward,
            rewardHidden: this.rewardHidden,
            description: this.description,
            status: this.status,
            current: this.current,
            target: this.target,
            listener: this.listener,
            terms: this.terms,
            increaser: this.increaser,
            timeRestriction: this.timeRestriction,
            timeDuration: this.timeDuration,
            timeBeginingDate: this.timeBeginingDate,
            afterIncreaseCallbackName: this.afterIncreaseCallbackName,
            cancelationPrice: this.cancelationPrice
        };
        return JSON.stringify(obj)
    }, G.GlobalGoal.prototype.getProgress = function() {
        return Math.min(this.current, this.target) / this.target
    }, G.GlobalGoal.prototype.getLeft = function() {
        return Math.max(0, this.target - this.current)
    }, G.GlobalGoal.prototype.start = function() {
        "inactive" === this.status && (this.status = "active", this.timeRestriction && (this.timeBeginingDate = Date.now(), this.timeBinding = G.sb("onWallClockTimeUpdate").addPermanent(this.updateTimer, this)))
    }, G.GlobalGoal.prototype.finish = function() {
        "active" === this.status && (this.listenerBinding.detach(), this.timeRestriction && this.timeBinding.detach(), this.current >= this.target ? (G.gameTracking.design("MissionCompleted"), this.status = "achieved") : (G.gameTracking.design("MissionFailed"), this.status = "failed"), this.onFinish.dispatch(this.status))
    }, G.GlobalGoal.prototype.updateTimer = function(date) {
        "active" === this.status && this.timeRestriction && date - this.timeBeginingDate > 60 * this.timeDuration * 1e3 && (this.finish(), G.sb("onGlobalGoalOutOfTime").dispatch(this))
    }, G.GlobalGoal.prototype.checkTerms = function(args) {
        if (this.terms)
            for (var i = 0, len = this.terms.length; len > i; i++) {
                var term = this.terms[i];
                if (Array.isArray(term)) {
                    if (!this.checkArrayTerm(args[i], term)) return !1
                } else if (!this.checkTerm(args[i], term)) return !1
            }
        return !0
    }, G.GlobalGoal.prototype.checkArrayTerm = function(arg, term) {
        for (var j = 0; j < term.length; j++)
            if (!this.checkTerm(arg, term[j])) return !1;
        return !0
    }, G.GlobalGoal.prototype.checkTerm = function(arg, term) {
        return term === !1 ? !0 : "string" == typeof term && "!" === term[0] ? arg != term.slice(1) : arg == term
    }, G.GlobalGoal.prototype.processIncrease = function(args) {
        if ("number" == typeof this.increaser) this.current += this.increaser;
        else if (Array.isArray(this.increaser))
            for (var j = 0, len = this.increaser.length; len > j; j++) this.increaser[j] && (this.current += args[j])
    }, G.GlobalGoal.prototype.getEndtime = function() {
        this.timeBeginingDate + 60 * this.timeDuration * 1e3
    }, G.GlobalGoal.prototype.destroy = function() {
        this.listenerBinding.detach(), this.timeBinding && this.timeBinding.detach()
    }, G.GlobalGoal.prototype.getRemainingSeconds = function() {
        return "inactive" == this.status ? 60 * this.timeDuration : Math.max(0, Math.floor((60 * this.timeDuration * 1e3 - (Date.now() - this.timeBeginingDate)) / 1e3))
    }, G.GlobalGoal.prototype.onListener = function() {
        "active" === this.status && (this.checkTerms(arguments) && (this.processIncrease(arguments), this.afterIncreaseCallback && this.afterIncreaseCallback.apply(this, arguments)), this.current >= this.target && this.finish())
    }, G.GlobalGoalPanel = function(x, y, goalObj, goalIndex) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.x = x, this.y = y, this.bg = G.makeImage(-35, 8, "goal_bar_empty", .5, this), this.goalObj = goalObj, this.goalIndex = goalIndex, this.label = new G.LabelGroupT(this.goalObj.description, -210, -5, {
            font: "ComicSansBold",
            fontSize: "30px",
            fill: "#85511f"
        }, [0, .5], 200), this.add(this.label), this.prize = new G.LabelGroupT(this.goalObj.rewardHidden ? "@*1.3*gift_small@" : G.gift.getLabelString(this.goalObj.reward), 140, -5, {
            font: "ComicSansBold",
            fontSize: "30px",
            fill: "#85511f"
        }, [1, .5], 200), this.add(this.prize), this.bar = G.makeImage(-216, 24, "goal_bar_full", 0, this), this.bar.cropRect = new Phaser.Rectangle(0, 0, this.bar.width * this.goalObj.getProgress(), this.bar.height), this.bar.updateCrop(), this.goalObj.timeRestriction && (("active" == this.goalObj.status || "inactive" == this.goalObj.status) && (this.timer = new G.Timer(142, 22, "font-white", 20, 300, 1, 0), this.add(this.timer), this.timer.setSecLeft(this.goalObj.getRemainingSeconds()), this.onFinishBinding = this.goalObj.onFinish.add(this.onGoalFinish, this), this.timer.events.onDestroy.add(this.onFinishBinding.detach, this.onFinishBinding)), "active" == this.goalObj.status ? this.timer.start() : "inactive" == this.goalObj.status && (this.startBtn = new G.Button(200, 10, "btn_start_goal", function() {
            this.goalObj.start(), this.timer.start(), this.startBtn.destroy(), this.addGoalRemoveBtn(), G.gameTracking.design("MissionStarted")
        }, this), this.startBtn.pulse(), this.add(this.startBtn))), "failed" == this.goalObj.status && this.addGoalFailedBtn(), "achieved" == this.goalObj.status && this.addGoalAchievedBtn(), "active" == this.goalObj.status && this.addGoalRemoveBtn()
    }, G.GlobalGoalPanel.prototype = Object.create(Phaser.Group.prototype), G.GlobalGoalPanel.prototype.replaceSelfWithNewGoal = function() {
        G.globalGoalMgr.removeAndPushNew(this.goalObj)
    }, G.GlobalGoalPanel.prototype.addGoalFailedBtn = function() {
        this.timer && this.timer.destroy(), this.failedIcon = G.makeImage(this.label.x + this.label.width, this.label.y, "task_fail", [0, .5], this), this.replaceBtn = new G.Button(200, 10, "btn_trash", function() {
            this.replaceSelfWithNewGoal()
        }, this), this.replaceBtn.pulse(), this.add(this.replaceBtn)
    }, G.GlobalGoalPanel.prototype.addGoalAchievedBtn = function() {
        this.timer && this.timer.destroy(), this.successIcon = G.makeImage(this.label.x + this.label.width, this.label.y, "task_complete", [0, .5], this);
        var gift = this.goalObj.rewardHidden;
        this.replaceBtn = new G.Button(200, 10, gift ? "btn_present" : "btn_buy", function() {
            this.replaceSelfWithNewGoal(), gift ? (G.sb("closeAndOpenWindow").dispatch("gift", !1, this.goalObj.reward), G.sb("pushWindow").dispatch("globalGoals")) : (G.sfx.match_4.play(), "coin" == this.goalObj.reward[0] ? this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.replaceBtn.worldPosition.x, this.replaceBtn.worldPosition.y, this.state.panel.coinsTxt, this.goalObj.reward[1]) : G.gift.applyGift(this.goalObj.reward)), G.gameTracking.design("MissionRewardCollected")
        }, this), this.replaceBtn.pulse(), this.add(this.replaceBtn)
    }, G.GlobalGoalPanel.prototype.addGoalRemoveBtn = function() {
        this.goalRemoveBtn = new G.Button(200, 10, "btn_trash_buy", function() {
            G.sfx.cash_register.play(), G.saveState.getCoins() >= this.goalObj.cancelationPrice ? (G.saveState.changeCoins(-this.goalObj.cancelationPrice), this.replaceSelfWithNewGoal(), G.gameTracking.design("MissionSkipped"), G.gameTracking.sink("Coins", "MissionSkip", "Map", this.goalObj.cancelationPrice)) : game.incentivised ? G.sb("closeAndOpenWindow").dispatch("moreMoney", "globalGoals") : G.saveState.getCoins() < this.goalObj.cancelationPrice && (this.goalRemoveBtn.alpha = .5)
        }, this), this.goalRemoveBtn.price = new G.Text(-7, 26, this.goalObj.cancelationPrice.toString(), {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "25px"
        }, [0, .5], 40), this.goalRemoveBtn.addChild(this.goalRemoveBtn.price), this.add(this.goalRemoveBtn), !game.incentivised && G.saveState.getCoins() < this.goalObj.cancelationPrice && (this.goalRemoveBtn.price.updateCache(), this.goalRemoveBtn.alpha = .5)
    }, G.GlobalGoalPanel.prototype.onGoalFinish = function(newStatus) {
        this.goalRemoveBtn && this.goalRemoveBtn.destroy(), "achieved" == newStatus ? this.addGoalAchievedBtn() : this.addGoalFailedBtn()
    }, G.GlobalGoalPanelGroup = function(x, y, maxHeight) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.maxHeight = G.l(maxHeight), this.panelDistance = this.maxHeight / 3, this.panels = [], G.globalGoalMgr.goals.forEach(function(goal, index) {
            this.createGoalPanel(goal, index)
        }, this), G.sb("onGoalCreated").add(this.onGoalCreated, this), G.sb("onGlobalGoalRemove").add(this.onGoalRemove, this)
    }, G.GlobalGoalPanelGroup.prototype = Object.create(Phaser.Group.prototype), G.GlobalGoalPanelGroup.prototype.createGoalPanel = function(goalObj, goalIndex) {
        var goalPanel = new G.GlobalGoalPanel(0, goalIndex * this.panelDistance, goalObj, goalIndex);
        this.panels.push(goalPanel), this.add(goalPanel)
    }, G.GlobalGoalPanelGroup.prototype.onGoalRemove = function(goalToRemove, goalToRemoveIndex) {
        var panelToRemove = this.panels.splice(goalToRemoveIndex, 1)[0];
        panelToRemove.igonreChildInput = !1, this.bringToTop(panelToRemove), game.add.tween(panelToRemove).to({
            alpha: 0
        }, 400, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(panelToRemove.destroy, panelToRemove), game.add.tween(panelToRemove.scale).to({
            x: 1.1,
            y: 1.1
        }, 400, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(panelToRemove.destroy, panelToRemove), this.refreshPanelsPosition()
    }, G.GlobalGoalPanelGroup.prototype.refreshPanelsPosition = function() {
        this.panels.forEach(function(panel, index) {
            var newIndex = G.globalGoalMgr.goals.indexOf(panel.goalObj);
            newIndex != panel.goalIndex && (G.stopTweens(panel), panel.alpha = 1, game.add.tween(panel).to({
                y: newIndex * this.panelDistance
            }, 400, Phaser.Easing.Linear.None, !0))
        }, this)
    }, G.GlobalGoalPanelGroup.prototype.onGoalCreated = function(goalObj, goalIndex) {
        var newPanel = new G.GlobalGoalPanel(0, goalIndex * this.panelDistance, goalObj, goalIndex);
        newPanel.igonreChildInput = !1, this.panels.push(newPanel), this.add(newPanel), game.add.tween(newPanel).from({
            y: newPanel.y + G.l(100),
            alpha: 0
        }, 400, Phaser.Easing.Linear.None, !0).onComplete.add(function() {
            newPanel.igonreChildInput = !0
        })
    }, G.JewelsBlitzMoneyCounter = function() {
        Phaser.Group.call(this, game), this.x = 0, this.y = 0, this.amountTxt = new G.Text(0, 0, G.lvl.moneyGained, {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px"
        }, [0, .5], 100), this.add(this.amountTxt), this.coinIcon = G.makeImage(0, 0, "coin_1", [0, .5], this), this.coinIcon.scale.setTo(.4), this.amountTxt.cacheAsBitmap = !1, G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), this.alpha = 0, this.levelFinished = !1, G.sb("onLevelFinished").add(function() {
            this.levelFinished = !0
        }, this)
    }, G.JewelsBlitzMoneyCounter.prototype = Object.create(Phaser.Group.prototype), G.JewelsBlitzMoneyCounter.prototype.update = function() {
        this.levelFinished ? this.alpha = Math.max(0, this.alpha - .05) : (this.alpha = Math.min(1, this.alpha + .05), this.amountDisplayed !== G.lvl.moneyGained && this.updateCoinsAmount(G.lvl.moneyGained))
    }, G.JewelsBlitzMoneyCounter.prototype.updateCoinsAmount = function(newAmount) {
        G.stopTweens(this), this.scale.setTo(1), game.add.tween(this.scale).to({
            x: 1.3,
            y: 1.3
        }, 200, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), this.amountTxt.setText(newAmount.toString());
        var xx = (this.amountTxt.width + this.coinIcon.width) * -.5;
        this.amountTxt.x = xx, this.coinIcon.x = this.amountTxt.x + this.amountTxt.width + G.l(5), this.amountDisplayed = newAmount
    }, G.JewelsBlitzMoneyCounter.prototype.onScreenResize = function() {
        G.horizontal ? (this.x = 0, this.y = G.l(440)) : (this.x = G.l(415), this.y = G.l(74))
    }, G.LabelTextT = function(str, x, y, textStyle, anchor, maxWidth, distanceBetween) {
        Phaser.Group.call(this, game), this.str = str, this.tagArray = G.LabelParser.changeIntoTagArray(str), this.x = x, this.y = y, this.textStyle = G.Text.getStyle(textStyle), this.fontSize = parseInt(textStyle.fontSize), this.distanceBetween = distanceBetween || 0, "number" == typeof anchor ? this.anchorX = this.anchorY = anchor : (this.anchorX = anchor[0], this.anchorY = anchor[1]), this.maxWidth = maxWidth || 0, this.processTagArray()
    }, G.LabelTextT.prototype = Object.create(Phaser.Group.prototype), G.LabelTextT.prototype.processTagArray = function() {
        for (var i = 0; i < this.tagArray.length; i++)
            if ("img" == this.tagArray[i].type) {
                var img = G.makeImage(0, 0, this.tagArray[i].content, 0, this);
                img.tagScale = this.tagArray[i].scale
            } else if ("separator" == this.tagArray[i].type) {
            var img = G.makeImage(0, 0, null, 0, this);
            img.SEPARATOR = !0, img.SEP_LENGTH = .5 * this.tagArray[i].length
        } else this.add(new G.Text(0, 0, this.tagArray[i].content, this.textStyle));
        this.refresh()
    }, G.LabelTextT.prototype.refresh = function() {
        if (this.applySizeAndAnchor(), this.maxWidth > 0 && this.getWholeWidth() > this.maxWidth)
            for (; this.getWholeWidth() > this.maxWidth;) this.distanceBetween = Math.floor(.9 * this.distanceBetween), this.fontSize = Math.floor(.9 * this.fontSize), this.applySizeAndAnchor();
        this.spreadElements()
    }, G.LabelTextT.prototype.applySizeAndAnchor = function() {
        this.children.forEach(function(e) {
            e.anchor.setTo(this.anchorX, this.anchorY), e.fontSize ? (e.fontSize = this.fontSize, e.updateTransform(), e.y += e.padding.y) : (e.height = this.fontSize * (e.tagScale || 1), e.scale.x = e.scale.y), e.SEPARATOR && (e.width = this.fontSize * e.SEP_LENGTH)
        }, this)
    }, G.LabelTextT.prototype.getWholeWidth = function() {
        var allDistanceBetween = (this.children.length - 1) * this.distanceBetween,
            widthOfAllElements = 0;
        return this.children.forEach(function(e) {
            widthOfAllElements += e.width
        }), allDistanceBetween + widthOfAllElements
    }, G.LabelTextT.prototype.spreadElements = function() {
        var startX = this.getWholeWidth() * this.anchorX * -1;
        this.children.forEach(function(e, index, array) {
            e.left = 0 == index ? startX : array[index - 1].right + this.distanceBetween
        }, this)
    }, G.LabelTextT.prototype.addOffsetYToText = function(value) {
        this.children.forEach(function(e) {
            e.fontSize && (e.y += value)
        })
    }, G.LevelGenerator = {}, G.LevelGenerator.generate = function(config) {
        var lvl = {
                mapX: -200 + 400 * Math.random(),
                mapY: -400 * Math.random(),
                moves: config.movesNr,
                nrOfTypes: config.typesOfCandy,
                goal: ["collect", []],
                bgImg: config.bgImg,
                starsReq: [3e3, 5e3, 7e3],
                drops: {
                    chest: config.chestDrop,
                    chain: config.chainDrop,
                    infection: config.infectionDrop
                }
            },
            width = 8,
            height = 8,
            board = new G.GridArray(width, height);
        board.loop(function(elem, coll, row, array) {
            array[coll][row] = []
        });
        var pickedBlockers = this.pickBlockers(lvl, config);
        return this.putBlockers(board, config, pickedBlockers), lvl.levelData = board.data, lvl.goal[1] = this.makeGoal(board, config, lvl, pickedBlockers), this.fillWithRandom(board, config), lvl
    }, G.LevelGenerator.putBlockers = function(board, config, pickedBlockers) {
        for (var i = 0; i < pickedBlockers.length; i++) switch (pickedBlockers[i]) {
            case "concrete":
                this.putSymmetrical(board, [!1, "cn3", "cn2", "cn1"], this.getRandomEvenInRange(config.concrete[0], config.concrete[1]), ["dirt3", "dirt2", "dirt1", "cn3", "cn2", "cn1", "infection"], 2);
                break;
            case "ice":
                this.putSymmetrical(board, "ice", this.getRandomEvenInRange(config.ice[0], config.ice[1]), ["ice", "dirt3", "dirt2", "dirt1", "infection"], 3);
                break;
            case "chain":
                this.putWrapped(board, config);
                break;
            case "dirt":
                this.putSymmetrical(board, ["dirt3", "dirt2", "dirt1"], this.getRandomEvenInRange(config.dirt[0], config.dirt[1]), ["ice", "dirt3", "dirt2", "dirt1", "cn3", "cn2", "cn1"], 0);
                break;
            case "infection":
                this.putSymmetrical(board, "infection", this.getRandomEvenInRange(config.infection[0], config.infection[1]), ["infection", "cn3", "cn2", "cn1", "ice", "W1", "W2", "W3", "W4", "W5", "W6"], 0)
        }
    }, G.LevelGenerator.pickBlockers = function(lvl, config) {
        var blockersAvailable = [];
        ["concrete", "ice", "chain", "dirt", "infection"].forEach(function(blocker) {
            config[blocker][1] > 0 && blockersAvailable.push(blocker)
        });
        Phaser.ArrayUtils.shuffle(blockersAvailable);
        for (var picked = [], nrToPick = game.rnd.between(config.blockersTypes[0], config.blockersTypes[1]), i = 0; i < Math.min(blockersAvailable.length, nrToPick); i++) picked.push(blockersAvailable[i]);
        return picked
    }, G.LevelGenerator.putWrapped = function(board, config) {
        for (var markList = [!1], i = 1; i <= config.typesOfCandy; i++) markList.push("W" + i.toString());
        this.putSymmetrical(board, markList, this.getRandomEvenInRange(config.chain[0], config.chain[1]), ["infection", "W1", "W2", "W3", "W4", "W5", "W6"])
    }, G.LevelGenerator.fillWithRandom = function(board, config) {
        var avoid = ["W1", "W2", "W3", "W4", "W5", "W6", "infection"];
        board.loop(function(elem, x, y) {
            this.shouldAvoidCell(board, x, y, avoid) || elem.unshift("r")
        }, this)
    }, G.LevelGenerator.getRandomEven = function(maxNr) {
        var result = game.rnd.between(0, maxNr);
        return result % 2 == 1 && (maxNr > result ? result++ : result--), result
    }, G.LevelGenerator.getRandomEvenInRange = function(minNr, maxNr) {
        var result = game.rnd.between(minNr, maxNr);
        return result % 2 == 1 && (maxNr > result ? result++ : result--), result
    }, G.LevelGenerator.makeGoal = function(board, config, lvl, pickedBlockers) {
        for (var possibleGoals = [], i = 1; i <= config.typesOfCandy; i++) possibleGoals.push([i.toString(), 5 * Math.ceil(game.rnd.between(config.normReq[0], config.normReq[1]) / 5)]);
        for (var lookUpMarks = {
                concrete: ["cn3", "cn2", "cn1"],
                ice: ["ice"],
                chain: ["W1", "W2", "W3", "W4", "W5", "W6"],
                dirt: ["dirt3", "dirt2", "dirt1"],
                infection: ["infection"]
            }, i = 0; i < pickedBlockers.length; i++) possibleGoals.push([pickedBlockers[i], this.countOnBoard(board, lookUpMarks[pickedBlockers[i]])]);
        var goalNr = game.rnd.between(config.goalRange[0], config.goalRange[1]);
        return Phaser.ArrayUtils.shuffle(possibleGoals), possibleGoals.splice(0, goalNr)
    }, G.LevelGenerator.countEmptySpaces = function(board) {
        return this.countOnBoard(board, "X")
    }, G.LevelGenerator.countOnBoard = function(board, lookFor) {
        var result = 0;
        Array.isArray(lookFor) || (lookFor = Array.prototype.slice.call(arguments).splice(1));
        for (var i = 0; i < lookFor.length; i++) {
            var currentLookFor = lookFor[i];
            board.loop(function(elem, x, y) {
                -1 !== elem.indexOf(currentLookFor) && result++
            })
        }
        return result
    }, G.LevelGenerator.putSymmetrical = function(board, mark, nrOfElements, avoid, startFrom) {
        if (startFrom = startFrom || 0, Array.isArray(mark)) var markList = mark,
            keepMarkSymmetry = markList.shift();
        if (console.log("PUT SYMETRIC: " + mark + " x " + nrOfElements), 0 != nrOfElements) {
            var twoLines = Math.random() < .5;
            console.log(twoLines);
            for (var maxWidthIndex = Math.ceil(.5 * board.width), maxHeightIndex = twoLines ? Math.ceil(.5 * board.height) : board.height, pairs = [], attempts = 0; nrOfElements > 0;) {
                if (400 == attempts++) return;
                markList && keepMarkSymmetry && (mark = markList[Math.floor(Math.random() * markList.length)]), pairs = [];
                var xx = Math.floor(Math.random() * maxWidthIndex),
                    yy = Math.floor(Math.random() * maxHeightIndex),
                    xxR = board.width - 1 - xx,
                    yyR = board.height - 1 - yy;
                !this.shouldAvoidCell(board, xx, yy, avoid) && nrOfElements > 0 && yy >= startFrom && (console.log("PUT: " + xx + "x" + yy), markList && !keepMarkSymmetry && (mark = markList[Math.floor(Math.random() * markList.length)]), board.data[xx][yy].push(mark), nrOfElements--, pairs.push(!0)), !this.shouldAvoidCell(board, xxR, yy, avoid) && nrOfElements > 0 && yy >= startFrom && (console.log("PUT XR: " + xxR + "x" + yy), markList && !keepMarkSymmetry && (mark = markList[Math.floor(Math.random() * markList.length)]), board.data[xxR][yy].push(mark), nrOfElements--, pairs.push(!0)), twoLines && (!this.shouldAvoidCell(board, xx, yyR, avoid) && nrOfElements > 0 && yyR >= startFrom && (markList && !keepMarkSymmetry && (mark = markList[Math.floor(Math.random() * markList.length)]), board.data[xx][yyR].push(mark), console.log("PUT YR: " + xx + "x" + yyR), nrOfElements--, pairs.push(!0)), !this.shouldAvoidCell(board, xxR, yyR, avoid) && nrOfElements > 0 && yyR >= startFrom && (markList && !keepMarkSymmetry && (mark = markList[Math.floor(Math.random() * markList.length)]), board.data[xxR][yyR].push(mark), console.log("PUT XR YR: " + xxR + "x" + yyR), nrOfElements--, pairs.push(!0))), pairs.length % 2 == 1 && nrOfElements--
            }
        }
    }, G.LevelGenerator.shouldAvoidCell = function(board, x, y, avoid) {
        for (var cell = board.data[x][y], i = 0; i < avoid.length; i++)
            if (-1 !== cell.indexOf(avoid[i])) return !0;
        return !1
    }, G.LvlGoalMgr = function(goalData) {
        this.onGoalAchieved = new Phaser.Signal, this.onGoalNumberChanged = new Phaser.Signal, this.goalsSettings = G.json.settings.goals, this.bindings = [], "collect" === goalData[0] ? (this.COLLECT = !0, this.tasksMap = this.processCollectGoals(goalData[1]), this.bindings.push(G.sb("onCollectableRemove").add(this.onCollectableRemove, this), G.sb("onCollectableAdded").add(this.onCollectableAdded, this))) : (this.POINTS = !0, this.pointsTarget = goalData[1], this.bindings.push(G.sb("onPointsChange").add(this.onPointsChange, this)))
    }, G.LvlGoalMgr.prototype = {
        isPointBased: function() {
            return this.POINTS
        },
        getPointTarget: function() {
            return this.pointsTarget
        },
        isGoal: function(type) {
            return this.tasksMap && this.tasksMap[type] ? !this.tasksMap[type].completed : !1
        },
        goalAchieved: function() {
            this.bindings.forEach(function(binding) {
                binding.detach()
            }), this.onGoalAchieved.dispatch()
        },
        onPointsChange: function(newAmount) {
            newAmount >= this.pointsTarget && this.goalAchieved()
        },
        processCollectGoals: function(collectGoals) {
            var result = {};
            return collectGoals.forEach(function(goal) {
                var type = goal[0],
                    target = goal[1],
                    config = this.goalsSettings[type],
                    goalObj = {
                        target: target,
                        dynamic: config.dynamic || !1,
                        uiAnimation: config.toUIAnimation,
                        completed: !1
                    };
                result[type] = goalObj
            }, this), result
        },
        onCollectableAdded: function(type) {
            var task = this.tasksMap[type];
            task && task.dynamic && !task.completed && (task.target++, G.sb("onTaskAmountChanged").dispatch(type, 1))
        },
        onCollectableRemove: function(type, elem, sprite) {
            var task = this.tasksMap[type];
            task && !task.completed && (task.uiAnimation ? G.sb("onCandyToUIAnim").dispatch(type, elem, sprite, function() {
                G.sb("onTaskAmountChanged").dispatch(type, -1)
            }) : G.sb("onTaskAmountChanged").dispatch(type, -1), task.target--, 0 == task.target && (G.sb("onCollectableTaskFinished").dispatch(type), task.completed = !0, this.areAllCompleted() && this.goalAchieved()))
        },
        areAllCompleted: function() {
            var allCompleted = !0;
            return Object.keys(this.tasksMap).forEach(function(key) {
                this.tasksMap[key].completed || (allCompleted = !1)
            }, this), allCompleted
        }
    }, G.LvlObject = function() {
        this.state = game.state.getCurrentState(), this.lvlNr = this.state.lvlNr, this.latestLevel = this.lvlNr === G.saveState.getLastPassedLevelNr(), this.coinChanceProb = 0 == G.saveState.getStars(this.lvlNr) ? 1 : G.json.settings.completedLevelCoinsProb, this.stars = 0, this.combo = 0, this.data = G.lvlData, this.goalAchieved = !1, this.moves = G.lvlData.moves, this.points = 0, this.boosterInUse = !1, this.movesMade = 0, this.goal = G.lvlData.goal, this.goalMgr = new G.LvlGoalMgr(G.lvlData.goal), this.goalMgr.onGoalAchieved.add(function() {
            this.goalAchieved = !0, G.sb("onGoalAchieved").dispatch()
        }, this), this.items = [], this.firstMoveMade = !1, this.extraMovesBoughtNr = 0, this.outOfMovesPopUp = 0, this.moneyGained = 0, this.comboBonus = G.json.settings.comboBonus, this.moneyGainedChest = 0, G.sb("onLevelMoneyGain").add(function(change) {
            this.moneyGained += change
        }, this)
    }, G.LvlObject.prototype = {
        getPriceOfExtraMoves: function() {
            return G.json.settings.priceOfExtraMoves * (this.extraMovesBoughtNr + 1)
        },
        buyExtraMoves: function(double, forcePrice) {
            var price = forcePrice || G.json.settings.priceOfExtraMoves * (double ? 2 : 1);
            G.saveState.data.coins -= price, G.saveState.save(), this.extraMovesBoughtNr++, this.changeMoveNumber(5), G.sb("onExtraMovesUsed").dispatch(), G.gameTracking.sink("Coins", "Moves", "InGame", price)
        },
        isGoalAchieved: function() {
            return this.goalAchieved
        },
        madeMove: function() {
            G.IMMEDIATE || this.changeMoveNumber(-1), this.goalAchieved || (this.movesMade++, G.sb("userMadeMove").dispatch()), G.sb("madeMove").dispatch()
        },
        changeMoveNumber: function(change) {
            this.moves += change, G.sb("changeMoveNumber").dispatch()
        },
        changePointsNumber: function(change) {
            this.points += change, G.sb("onPointsAdded").dispatch(change), G.sb("onPointsChange").dispatch(this.points)
        },
        increaseCombo: function() {
            this.combo++, G.sb("onComboIncrease").dispatch(this.combo)
        },
        endCombo: function() {
            this.combo = 0, G.sb("onComboBreak").dispatch()
        },
        processMatch: function(amount, meanX, meanY, color) {
            var pointsToAdd = amount * (10 + this.getComboBonus());
            this.changePointsNumber(pointsToAdd);
            var pxOut = this.state.board.cellToPxOut([meanX, meanY]);
            G.sb("displayPoints").dispatch(pxOut[0], pxOut[1], pointsToAdd, color), this.firstMoveMade || (this.firstMoveMade = !0, 0 === this.lvlNr ? G.gameTracking.FTUEDesign("FTUE:05_FirstMatch") : 1 === this.lvlNr ? G.gameTracking.FTUEDesign("FTUE:15_Level2FirstMatch") : 2 === this.lvlNr && G.gameTracking.FTUEDesign("FTUE:22_Level3FirstMatch"))
        },
        getComboBonus: function() {
            return this.comboBonus[Math.min(this.combo, this.comboBonus.length - 1)]
        },
        isGoal: function(type) {
            return this.goalMgr.isGoal(type)
        }
    }, G.MapGift = function() {
        Phaser.Group.call(this, game), this.position.setTo(0, 220), G.saveState.data.lastMapGiftOpenTime || (G.saveState.data.lastMapGiftOpenTime = 0), this.msGiftCooldown = 60 * G.json.settings.mapGiftTimeMinutes * 1e3, this.active = Date.now() - G.saveState.data.lastMapGiftOpenTime > this.msGiftCooldown, this.addGlow(), this.btn = new G.Button(3, 0, "gift", this.open, this), this.btnDarkOverlay = G.makeImage(0, 0, "gift", .5, this.btn), this.btnDarkOverlay.alpha = .5, this.btn.scale.setTo(.4), this.add(this.btn), this.btn.addTerm(function() {
            return this.active
        }, this), this.addTimer(), this.active || this.startTimer(), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.MapGift.prototype = Object.create(Phaser.Group.prototype), G.MapGift.prototype.update = function() {
        this.glow.angle++, Date.now() - G.saveState.data.lastMapGiftOpenTime > this.msGiftCooldown ? (this.active = !0, this.ignoreChildInput = !1) : (this.active && this.startTimer(), this.active = !1, this.ignoreChildInput = !0), this.glow.visible = this.active, this.btnDarkOverlay.visible = !this.active, this.timer.visible = !this.active
    }, G.MapGift.prototype.onResize = function() {
        var center = game.world.bounds.x + Math.floor(.5 * game.width);
        game.width < 1070 ? this.x = center - 265 : this.x = center - 265 - 235
    }, G.MapGift.prototype.open = function() {
        G.gameTracking.design("FreeGiftButtonClicked"), G.sb("pushWindow").dispatch("mapGift")
    }, G.MapGift.prototype.addTimer = function() {
        this.timer = new G.TextTimer(5, 55, null, {
            fill: "#fdfbe4",
            font: "ComicSansBold",
            fontSize: "25px",
            stroke: "#73461c",
            strokeThickness: 7
        }, .5, 130), this.add(this.timer), this.add(this.timer)
    }, G.MapGift.prototype.startTimer = function() {
        var secLeft = Math.floor((G.saveState.data.lastMapGiftOpenTime + this.msGiftCooldown - Date.now()) / 1e3);
        this.timer.setSecLeft(secLeft), this.timer.active = !0
    }, G.MapGift.prototype.addGlow = function() {
        this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.alpha = .5, this.glow.scale.setTo(.5), this.glow.blendMode = 1
    }, G.MapTilesRenderer = function() {
        Phaser.Group.call(this, game), this.marker = G.makeImage(0, 0, null), this.rts = [], this.imgs = [];
        for (var totalHeight = this.getMapTotalHeight(), heightToCover = totalHeight, tileHeight = 600, nrOfTiles = Math.ceil(heightToCover / tileHeight), mapTiles = {
                totalHeight: totalHeight,
                tiles: []
            }, i = 0; nrOfTiles > i; i++) {
            Math.min(tileHeight, heightToCover);
            this.rts[i] = game.make.renderTexture(1200, tileHeight, "map-tile-" + i, !0), this.drawMap(this.rts[i], G.json.map, tileHeight * i), heightToCover -= tileHeight, mapTiles.tiles.push({
                rt: "map-tile-" + i,
                y: -i * tileHeight
            })
        }
        G.json.settings.mapTiles = mapTiles, this.marker.destroy()
    }, G.MapTilesRenderer.prototype = Object.create(Phaser.Group.prototype), G.MapTilesRenderer.prototype.getMapTotalHeight = function() {
        for (var i = 0; i < G.json.map.length; i++)
            if (G.json.map[i].label && "ENDMARKER" === G.json.map[i].label) return Math.floor(-1 * G.json.map[i].y)
    }, G.MapTilesRenderer.prototype.drawMap = function(rt, list, offsetY) {
        for (var xOffset = .5 * rt.width, yOffset = rt.height + offsetY, i = 0; i < list.length; i++) {
            var elem = list[i];
            elem.label && "ENDMARKER" === elem.label || this.drawElementXY(elem.x + xOffset, elem.y + yOffset, elem, rt)
        }
    }, G.MapTilesRenderer.prototype.drawElementXY = function(x, y, elem, rt) {
        this.marker.position.setTo(x, y), this.marker.anchor.setTo(elem.anchor[0], elem.anchor[1]), this.marker.angle = elem.angle, this.marker.scale.setTo(elem.scale[0], elem.scale[1]), G.changeTexture(this.marker, elem.frame), this.marker.updateTransform(), rt.renderXY(this.marker, x, y)
    }, G.MapTutHand = function(map) {
        G.Image.call(this, 0, 0, "tut_hand", 0);
        var lastPassed = G.saveState.getLastPassedLevelNr();
        this.map = map, G.json.levels[lastPassed] && (this.levelPos = {
            x: G.json.levels[lastPassed].mapX,
            y: G.json.levels[lastPassed].mapY
        }), lastPassed === G.saveState.getFirstClosedGateLvLIndex() && (this.levelPos.y += 35), this.closestBubble = G.json.settings.bubbleGifts.find(function(obj) {
            return !G.saveState.isBubbleGiftUsed(obj.levelNumber) && obj.levelNumber - 1 <= lastPassed && Math.abs(lastPassed - obj.levelNumber) < 2
        }), this.closestBubble && (this.bubblePos = {
            x: G.json.levels[this.closestBubble.levelNumber - 1].mapX + 20,
            y: G.json.levels[this.closestBubble.levelNumber - 1].mapY - 90
        }, this.bubbleLvlNr = this.closestBubble.levelNumber), this.closestBubble ? (this.position.setTo(this.bubblePos.x, this.bubblePos.y), G.sb("onBubbleGiftOpened").add(this.onBubbleGiftOpened, this), this.showingBubble = !0) : this.levelPos ? this.position.setTo(this.levelPos.x, this.levelPos.y) : this.visible = !1, game.add.tween(this.anchor).to({
            x: -.1,
            y: -.1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.existing(this)
    }, G.MapTutHand.prototype = Object.create(G.Image.prototype), G.MapTutHand.prototype.onBubbleGiftOpened = function(lvlNumber) {
        this.showingBubble && this.bubbleLvlNr === lvlNumber && (this.levelPos ? (this.showingBubble = !1, game.add.tween(this).to({
            x: this.levelPos.x,
            y: this.levelPos.y
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0)) : game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0))
    }, G.MultiLineText = function(x, y, font, text, size, max_width, max_height, align, hAnchor, vAnchor) {
        if (x = G.l(x), y = G.l(y), size = G.l(size), max_width = G.l(max_width), max_height = G.l(max_height), Phaser.BitmapText.call(this, game, x, y, font, "", size), this.splitText(text, max_width), this.align = align || "center", max_height)
            for (; this.height > max_height;) this.fontSize -= 2, this.splitText(text, max_width), this.updateText();
        this.hAnchor = "number" == typeof hAnchor ? hAnchor : .5, this.vAnchor = "number" == typeof vAnchor ? vAnchor : 0, this.cacheAsBitmap = !0, this._cachedSprite.anchor.setTo(this.hAnchor, this.vAnchor)
    }, G.MultiLineText.prototype = Object.create(Phaser.BitmapText.prototype), G.MultiLineText.prototype.splitText = function(text, max_width) {
        for (var txt = text, txtArray = [], prevIndexOfSpace = 0, indexOfSpace = 0; txt.length > 0;)
            if (prevIndexOfSpace = indexOfSpace, indexOfSpace = txt.indexOf(" ", indexOfSpace + 1), -1 == indexOfSpace ? this.setText(txt) : this.setText(txt.substring(0, indexOfSpace)), this.updateText(), this.width > max_width) {
                if (0 == prevIndexOfSpace && -1 == indexOfSpace) {
                    txtArray.push(txt), txt = "", indexOfSpace = 0;
                    continue
                }
                if (0 == prevIndexOfSpace) {
                    txtArray.push(txt.substring(0, indexOfSpace)), txt = txt.substring(indexOfSpace + 1), indexOfSpace = 0;
                    continue
                }
                txtArray.push(txt.substring(0, prevIndexOfSpace)), txt = txt.substring(prevIndexOfSpace + 1), indexOfSpace = 0
            } else -1 == indexOfSpace && (txtArray.push(txt), txt = "");
        this.setText(txtArray.join("\n"))
    }, G.MultiLineText.prototype.popUpAnimation = function() {
        this.cacheAsBitmap = !1;
        for (var char_numb = this.children.length, delay_array = [], i = 0; char_numb > i; i++) delay_array[i] = i;
        delay_array = Phaser.ArrayUtils.shuffle(delay_array), delay_index = 0, this.activeTweens = 0, this.children.forEach(function(letter) {
            0 == letter.anchor.x && (letter.x = letter.x + .5 * letter.width, letter.y = letter.y + letter.height, letter.anchor.setTo(.5, 1));
            var target_scale = letter.scale.x;
            letter.scale.setTo(0, 0), this.activeTweens++;
            var tween = game.add.tween(letter.scale).to({
                x: 1.5 * target_scale,
                y: 1.5 * target_scale
            }, 200, Phaser.Easing.Quadratic.In, !1, 25 * delay_array[delay_index]).to({
                x: target_scale,
                y: target_scale
            }, 200, Phaser.Easing.Sinusoidal.In);
            tween.onComplete.add(function() {
                this.activeTweens--, 0 == this.activeTweens && this.alive && (this.cacheAsBitmap = !0)
            }, this), tween.start(), delay_index++
        }, this)
    }, G.NoMoreAds = function() {
        Phaser.Image.call(this, game), this.bg = G.makeImage(0, 0, "text_shade_bg", .5, this), this.txt = new G.Text(0, 0, G.txt("You watched all videos for today. Come back tomorrow!"), {
            font: "ComicSansBold",
            fill: "white",
            fontSize: "50px",
            lineSpacing: -25
        }, .5, 600, 300, !0, "center"), this.addChild(this.txt), this.bg.width = this.txt.width + G.l(100), this.bg.height = this.txt.height + G.l(100), this.fixedToCamera = !0, this.cameraOffset.x = .5 * game.width, this.cameraOffset.y = .5 * game.height, game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 2500).onComplete.add(function() {
            this.destroy()
        }, this), game.add.tween(this).from({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.existing(this)
    }, G.NoMoreAds.prototype = Object.create(Phaser.Image.prototype), G.NoMoreAds.prototype.update = function() {
        this.cameraOffset.x = .5 * game.width, this.cameraOffset.y = .5 * game.height
    }, G.OneLineText = function(x, y, font, text, size, width, hAnchor, vAnchor) {
        var style = {
            font: "ComicSansBold",
            fontSize: size + "px"
        };
        "font-white" === font && (style.fill = "white"), "font-green" === font && (style.fill = "#f7ffdb", style.stroke = "#005700", style.strokeThickness = 5), "font-beige" === font && (style.fill = "#ad7f56"), "font-beige-header" === font && (style.fill = "#85511f"), "font-white-stroke" === font && (style.fill = "white", style.fontSize = 40, style.stroke = "#85511f", style.strokeThickness = 5), "font-brown" === font && (style.fill = "#85511f", style.stroke = "#ffedd9", style.strokeThickness = 7), "font-red" === font && (style.fill = "#ffe9d0", style.stroke = "#961400", style.strokeThickness = 7), "font-blue-out" === font && (style.fill = "#ffffe8", style.stroke = "#004455", style.strokeThickness = 10), "font-blue-out-small" === font && (style.fill = "#ffffe8", style.stroke = "#004455", style.strokeThickness = 5), "font-gray" === font && (style.fill = "white", style.stroke = "#393939", style.strokeThickness = 7), G.Text.call(this, x, y, text, style, [hAnchor, vAnchor], width)
    }, G.OneLineText.prototype = Object.create(G.Text.prototype), G.OneLineText.prototype.constructor = G.OneLineText, G.OneLineText.prototype.popUpAnimation = function() {}, G.OneLineText.prototype.scaleOut = function(onComplete, context) {}, G.OneLineCounter = function(x, y, font, amount, size, width, hAnchor, vAnchor, preText, postText) {
        G.OneLineText.call(this, x, y, font, "", size, width, hAnchor, vAnchor), this.amount = amount, this.amountDisplayed = amount, this.amountMaxInterval = 5, this.amountMaxNegInterval = -5, this.absoluteDisplay = !1, this.fixedToDecimal = 0, this.stepCurrent = 0, this.step = 0, this.preText = preText || "", this.postText = postText || "", this.setText(this.preText + amount + this.postText)
    }, G.OneLineCounter.prototype = Object.create(G.OneLineText.prototype), G.OneLineCounter.prototype.update = function() {
        if (this.lerp) return void this.lerpUpdate();
        if (this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.amountDisplayed != this.amount)) {
            var diff = this.amount - this.amountDisplayed;
            this.amountDisplayed += game.math.clamp(diff, this.amountMaxNegInterval, this.amountMaxInterval);
            var valueToDisplay = this.amountDisplayed;
            this.absoluteDisplay && (valueToDisplay = Math.abs(valueToDisplay)), 0 != this.fixedTo && (valueToDisplay = valueToDisplay.toFixed(this.fixedToDecimal)), this.setText(this.preText + valueToDisplay + this.postText)
        }
    }, G.OneLineCounter.prototype.changeAmount = function(amount) {
        this.amount = amount
    }, G.OneLineCounter.prototype.increaseAmount = function(change) {
        this.amount += change
    }, G.OneLineCounter.prototype.changeIntervals = function(max, maxNeg) {
        "undefined" == typeof maxNeg ? (this.amountMaxInterval = max, this.amountMaxNegInterval = -max) : (this.amountMaxInterval = max, this.amountMaxNegInterval = maxNeg)
    }, G.OneLineCounter.prototype.lerpUpdate = function() {
        this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.amountDisplayed = Math.round(G.lerp(this.amountDisplayed, this.amount, .5, .6)), this.setText(this.amountDisplayed.toString()))
    }, G.PlayFabLogger = function() {
        G.BuildEnvironment.PLAYFAB_ID && (PlayFab.settings.titleId = G.BuildEnvironment.PLAYFAB_ID, this.loginToPlayFabWithFBID())
    }, G.PlayFabLogger.prototype.loginToPlayFabWithFBID = function() {
        return -1 !== window.location.href.indexOf("player2") && -1 !== window.location.href.indexOf("sandbox") && sgSettings.config.user.userId++, this.userAvatarUrl = sgSettings.config.user.avatar, this.userDisplayName = sgSettings.config.user.name, new Promise(function(resolve, reject) {
            console.log("LOGIN WITH PLAYFAB"), PlayFabClientSDK.LoginWithCustomID({
                TitleId: PlayFab.settings.titleId,
                CustomId: sgSettings.config.user.userId,
                CreateAccount: !0,
                InfoRequestParameters: {
                    GetPlayerProfile: !0
                }
            }, function(result, error) {
                error ? (console.log(error), reject()) : (G.playFabLoginResult = result, G.playFabLoginResult.data.InfoResultPayload.PlayerProfile ? G.playFabLoginResult.data.InfoResultPayload.PlayerProfile.DisplayName !== sgSettings.config.user.userId && PlayFabClientSDK.UpdateUserTitleDisplayName({
                    DisplayName: sgSettings.config.user.userId
                }, function() {
                    G.playFabLoginResult.data.NewlyCreated && this.sendFBFriends()
                }.bind(this)) : PlayFabClientSDK.UpdateUserTitleDisplayName({
                    DisplayName: sgSettings.config.user.userId
                }, function() {
                    this.sendFBFriends()
                }.bind(this)), resolve())
            }.bind(this))
        }.bind(this))
    }, G.PlayFabLogger.prototype.sendFBFriends = function() {}, G.PlayFabLogger.prototype.preparePlayFabIdsOfFriends = function(connectedPlayers, callback) {
        console.log("preparePlayFabIdsOfFriends");
        for (var toFinish = connectedPlayers.length, playFabIds = [], i = 0; i < connectedPlayers.length; i++) try {
            PlayFabClientSDK.GetAccountInfo({
                TitleDisplayName: connectedPlayers[i].userId
            }, function(res, error) {
                if (res && !error) {
                    var id = res.data.AccountInfo.PlayFabId;
                    playFabIds.push(id)
                }
                toFinish--, 0 === toFinish && callback(playFabIds)
            })
        } catch (e) {}
    }, G.PlayFabLogger.prototype._broadcastNewUserBotMessage = function() {}, G.PlayFabLogger.prototype.getGingerEvent = function() {
        console.log("GET GINGER EVENT"), PlayFabClientSDK.ExecuteCloudScript({
            FunctionName: "getGingerEvent"
        }, function(res, err) {
            this.gingerEvent = res.data.FunctionResult, console.log(res)
        }.bind(this))
    }, G.PlayFabLogger.prototype.getGingerGroup = function() {
        PlayFabClientSDK.ExecuteCloudScript({
            FunctionName: "getGingerGroupData",
            FunctionParameter: {
                contextId: "test-group-id"
            }
        }, function(res, err) {
            this.gingerGroup = res.data.FunctionResult, this.processGingerGroupUpdate()
        }.bind(this))
    }, G.PlayFabLogger.prototype.updateGingerAmount = function(amount) {
        PlayFabClientSDK.ExecuteCloudScript({
            FunctionName: "updateGingerAmount",
            FunctionParameter: {
                gingerAmount: amount,
                groupId: this.gingerGroup.id,
                playerId: sgSettings.config.user.userId
            }
        }, function(res, err) {
            this.gingerGroup.data = res.data.FunctionResult, this.processGingerGroupUpdate()
        }.bind(this))
    }, G.PlayFabLogger.prototype.processGingerGroupUpdate = function(gingerGroup) {
        var playerVal = this.gingerGroup.data[sgSettings.config.user.userId];
        playerVal ? G.saveState.data.gingerAmount = parseInt(playerVal.Value) : G.saveState.data.gingerAmount = 0
    }, G.PlayFabLogger.prototype.getTitleData = function() {
        return new Promise(function(resolve, reject) {
            PlayFabClientSDK.GetTitleData(null, function(response, error) {
                error ? reject(error) : response && (this.rawTitleData = response.data.Data, resolve(this.rawTitleDataToParsed(this.rawTitleData)))
            }.bind(this))
        }.bind(this))
    }, G.PlayFabLogger.prototype.rawTitleDataToParsed = function(raw) {
        var parsed = {};
        return Object.keys(raw).forEach(function(key) {
            parsed[key] = JSON.parse(raw[key])
        }), parsed
    }, G.PopOutMoneyLayer = function(topBar) {
        Phaser.Group.call(this, game), G.sb("newPopOutMoney").add(this.onPopOutMoney, this), this.deadArray = []
    }, G.PopOutMoneyLayer.prototype = Object.create(Phaser.Group.prototype), G.PopOutMoneyLayer.prototype.getFreePart = function() {
        var part;
        return this.deadArray.length > 0 ? part = this.deadArray.pop() : (part = new G.UI_PopOutMoney, part.events.onKilled.add(this.onElemKilled, this)), this.add(part), part
    }, G.PopOutMoneyLayer.prototype.onElemKilled = function(elem) {
        this === elem.parent && (this.deadArray.push(elem), this.removeChild(elem))
    }, G.PopOutMoneyLayer.prototype.onPopOutMoney = function(x, y) {
        var part = this.getFreePart();
        part.init(x, y)
    }, G.StartBoosterBubble = function(position, sprite, target, onPop, context) {
        Phaser.Image.call(this, game, 0, 0), this.anchor.setTo(.5), this.state = game.state.getCurrentState(), this.board = this.state.board, this.x = this.board.x + this.board.width * position[0], this.y = this.board.y + this.board.height * position[1], this.tweenFloating = game.add.tween(this).to({
            y: this.y + G.l(30)
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.tween(this.scale).from({
            x: 0,
            y: 0
        }, 1e3, Phaser.Easing.Elastic.Out, !0), G.changeTexture(this, sprite), this.target = target || null, this.onPop = onPop || function() {}, this.onPopContext = context || this, this.goingToTarget = !1
    }, G.StartBoosterBubble.prototype = Object.create(Phaser.Image.prototype), G.StartBoosterBubble.prototype.update = function() {}, G.StartBoosterBubble.prototype.goToTarget = function(delay) {
        null == this.target ? game.time.events.add(delay + 500, function() {
            this.tweenFloating.stop(), this.pop()
        }, this) : game.time.events.add(delay, function() {
            this.tweenFloating.stop(), game.add.tween(this).to({
                x: game.world.bounds.x + this.target.worldPosition.x,
                y: game.world.bounds.y + this.target.worldPosition.y
            }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(this.pop, this), game.add.tween(this.scale).to({
                x: .6,
                y: .6
            }, 300, Phaser.Easing.Sinusoidal.In, !0)
        }, this)
    }, G.StartBoosterBubble.prototype.pop = function() {
        G.sfx["match_" + game.rnd.between(1, 5)].play(), this.onPop.call(this.onPopContext), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), this.destroy()
    }, G.StartBoosterConfig = function() {
        this.data = []
    }, G.StartBoosterConfig.prototype.select = function(lvlNr, boosterNr) {
        this.data[lvlNr] || (this.data[lvlNr] = []), this.data[lvlNr][boosterNr] = !0
    }, G.StartBoosterConfig.prototype.deselect = function(lvlNr, boosterNr) {
        this.data[lvlNr] || (this.data[lvlNr] = []), this.data[lvlNr][boosterNr] = !1
    }, G.StartBoosterConfig.prototype.isSelected = function(lvlNr, boosterNr) {
        return this.data[lvlNr] ? this.data[lvlNr][boosterNr] : !1
    }, G.StartBoosterConfig.prototype.getConfigForLevel = function(lvlNr) {
        return this.data[lvlNr] || []
    }, G.Text = function(x, y, txt, style, anchor, maxWidth, maxHeight, textWrap, align) {
        for (style = G.Text.getStyle(style), this.userMaxWidth = maxWidth || 1 / 0, this.userMaxHeight = maxHeight || 1 / 0, textWrap && (style.wordWrap = !0, style.wordWrapWidth = maxWidth, style.align = align || "left"), Phaser.Text.call(this, game, x, y, txt, style), style.lineSpacing && (this.lineSpacing = style.lineSpacing), style.shadow && (this.setShadow.apply(this, style.shadow), this.padding.setTo(style.shadow[0], style.shadow[1])), anchor && ("number" == typeof anchor ? this.anchor.setTo(anchor) : this.anchor.setTo(anchor[0], anchor[1]));
            (this.width > this.userMaxWidth || this.height > this.userMaxHeight) && (this.fontSize -= 2, !(this.fontSize < 10)););
    }, G.Text.prototype = Object.create(Phaser.Text.prototype), G.Text.styles = {}, G.Text.addStyle = function(name, obj) {
        G.Text.styles[name] = obj
    }, G.Text.getStyle = function(style) {
        var result;
        if ("object" != typeof style) result = JSON.parse(JSON.stringify(G.Text.styles[style]));
        else if (style.style || style.fontStyle) {
            style.style = style.fontStyle || style.style;
            var orgStyle = JSON.parse(JSON.stringify(G.Text.styles[style.style]));
            if (style.scaleStroke && style.fontSize && orgStyle.fontSize && orgStyle.strokeThickness) {
                var orgStrokeSizeRatio = orgStyle.strokeThickness / parseInt(orgStyle.fontSize);
                style.strokeThickness = Math.ceil(parseInt(style.fontSize) * orgStrokeSizeRatio)
            }
            result = Object.assign(orgStyle, style)
        } else result = style;
        return "vi" === G.lang && "Lobster" === result.font && (delete result.font, result.fontWeight = "bold"), result
    }, G.Text.prototype.setText = function(txt) {
        Phaser.Text.prototype.setText.call(this, txt), this.scale.setTo(1), this.width = Math.min(this.width, this.userMaxWidth), this.height = Math.min(this.height, this.userMaxHeight)
    }, G.Text.prototype.setStyle = function(style, update) {
        style = G.Text.getStyle(style), Phaser.Text.prototype.setStyle.call(this, style, update)
    }, G.TextCounter = function(x, y, amount, style, anchor, maxWidth, config) {
        this.amount = amount, this.amountDisplayed = amount, G.Text.call(this, x, y, null === amount ? "..." : amount.toString(), style, anchor, maxWidth), config = config || {
            lerpValue: .5
        }, this.lerp = !0, this.lerpValue = config.lerpValue, this.stepCurrent = 0, this.step = 0
    }, G.TextCounter.prototype = Object.create(G.Text.prototype), G.TextCounter.prototype.setAmount = function(amount, immediately) {
        this.amount = amount, immediately && (this.amountDisplayed = amount, this.setText(this.amountDisplayed.toString()))
    }, G.TextCounter.prototype.changeAmount = function(change, immediately) {
        this.amount += change, immediately && (this.amountDisplayed = this.amount, this.setText(this.amountDisplayed.toString()))
    }, G.TextCounter.prototype.increaseAmount = function(change, immediately) {
        this.changeAmount(change)
    }, G.TextCounter.prototype.update = function() {
        this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.lerp && this.lerpUpdate())
    }, G.TextCounter.prototype.lerpUpdate = function() {
        this.amountDisplayed = G.lerp(this.amountDisplayed, this.amount, this.lerpValue, .2), this.setText(Math.round(this.amountDisplayed).toString())
    }, "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(target, varArgs) {
            "use strict";
            if (null == target) throw new TypeError("Cannot convert undefined or null to object");
            for (var to = Object(target), index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (null != nextSource)
                    for (var nextKey in nextSource) Object.prototype.hasOwnProperty.call(nextSource, nextKey) && (to[nextKey] = nextSource[nextKey])
            }
            return to
        },
        writable: !0,
        configurable: !0
    }), G.TextTimer = function(x, y, date, style, anchor, maxWidth, timerFormat) {
        G.Text.call(this, x, y, "???", style, anchor, maxWidth), this.secLeft = 0, this.active = !1, this.timerFormat = timerFormat || "hms", this.dots = !0, this.timerBinding = G.sb("onWallClockTimeUpdate").add(this.updateTimer, this), this.events.onDestroy.add(function() {
            this.timerBinding.detach()
        }, this), date && this.setDate(date)
    }, G.TextTimer.prototype = Object.create(G.Text.prototype), G.TextTimer.prototype.sfx = null, G.TextTimer.prototype.updateTimer = function() {
        this.active && (this.sfx && this.sfx.play(), this.secLeft = Math.max(0, this.secLeft - 1), this.updateTimerText(this.secLeft, this.dots), this.dots = !this.dots)
    }, G.TextTimer.prototype.setSecLeft = function(secLeft) {
        this.secLeft = Math.max(0, secLeft), this.updateTimerText(this.secLeft, !0)
    }, G.TextTimer.prototype.updateTimerText = function(secLeft, dots) {
        var dataArray = G.changeSecToDHMS(this.secLeft),
            txt = [];
        this.timerFormat.indexOf("d") > -1 && txt.push(dataArray[0]), this.timerFormat.indexOf("h") > -1 && txt.push(dataArray[1]), this.timerFormat.indexOf("m") > -1 && txt.push(dataArray[2]), this.timerFormat.indexOf("s") > -1 && txt.push(dataArray[3]), dots = !0, this.setText(txt.join(dots ? ":" : " "))
    }, G.TextTimer.prototype.start = function(secLeft) {
        secLeft && this.setSecLeft(secLeft), this.active = !0
    }, G.TextTimer.prototype.setDate = function(dateString) {
        var ms = new Date(dateString).getTime(),
            now = Date.now(),
            diffSec = Math.ceil((ms - now) / 1e3);
        this.setSecLeft(diffSec), this.active = !0
    }, G.Timer = function(x, y, font, fontSize, maxWidth, anchorX, anchorY, secLeft) {
        G.OneLineText.call(this, x, y, font, secLeft ? G.changeSecToTimerFormat(secLeft) : "???", fontSize, maxWidth, anchorX, anchorY), this.secLeft = secLeft || 0, this.dhms = !1, this.active = !1, this.timerBinding = G.sb("onWallClockTimeUpdate").add(this.updateTimer, this), this.events.onDestroy.add(function() {
            this.timerBinding.detach()
        }, this)
    }, G.Timer.prototype = Object.create(G.OneLineText.prototype), G.Timer.prototype.updateTimer = function() {
        this.active && (this.secLeft = Math.max(0, this.secLeft - 1), this.setText(G.changeSecToTimerFormat(this.secLeft, this.dhms)))
    }, G.Timer.prototype.setSecLeft = function(secLeft) {
        this.secLeft = secLeft, this.setText(G.changeSecToTimerFormat(this.secLeft, this.dhms))
    }, G.Timer.prototype.start = function(secLeft) {
        this.setText(G.changeSecToTimerFormat(this.secLeft, this.dhms)), this.active = !0
    }, G.TitleScreenGemsThrower = function() {
        Phaser.Group.call(this, game), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), this.chanceForShoot = .1, this.horizontal = !1;
        for (var i = 0; 20 > i; i++) this.addChild(new G.TitleScreenGem)
    }, G.TitleScreenGemsThrower.prototype = Object.create(Phaser.Group.prototype), G.TitleScreenGemsThrower.prototype.onScreenResize = function() {
        this.x = game.world.bounds.x, this.y = 0
    }, G.TitleScreenGemsThrower.prototype.throwGem = function() {
        var gem = this.getFreeGem();
        if (null != gem) {
            var xx, yy, velX, velY;
            this.horizontal ? (xx = Math.random() < .5 ? game.world.bounds.x - G.l(50) : -game.world.bounds.x + game.width + G.l(50), yy = .5 * game.height + .5 * game.height * Math.random(), velX = G.l(3 + 6 * Math.random()) * Math.sign(xx) * -1, velY = G.l(-2 + -2 * Math.random())) : (xx = Math.random() * game.width, yy = game.height + G.l(50), velX = G.l(1 + -2 * Math.random()), velY = G.l(-1 + -3 * Math.random())), gem.init(xx, yy, velX, velY)
        }
    }, G.TitleScreenGemsThrower.prototype.getFreeGem = function() {
        return this.getFirstDead()
    }, G.TitleScreenGemsThrower.prototype.update = function() {
        Math.random() < this.chanceForShoot && this.throwGem();
        for (var i = 0; i < this.children.length; i++) this.children[i].update();
    }, G.TitleScreenGem = function() {
        Phaser.Image.call(this, game, 0, 0), this.anchor.setTo(.5), this.grav = G.lnf(.02), this.kill()
    }, G.TitleScreenGem.prototype = Object.create(Phaser.Image.prototype), G.TitleScreenGem.prototype.init = function(x, y, velX, velY) {
        G.changeTexture(this, "candy_" + game.rnd.between(1, 6)), this.x = x, this.y = y, this.velX = velX, this.velX *= .99, this.velY = velY, this.angleSpeed = -1.5 + 3 * Math.random(), this.revive()
    }, G.TitleScreenGem.prototype.update = function() {
        this.alive && (this.x += this.velX, this.angle += this.angleSpeed, this.y += this.velY, this.velY += this.grav, this.y > game.height + 100 && this.kill())
    }, G.TrackData = function(lvlNr, lvlData) {
        this.data = {
            boosterBought: [0, 0, 0, 0],
            boosterUsed: [0, 0, 0, 0],
            startBoosterUsed: [0, 0, 0, 0],
            lvlNr: lvlNr + 1,
            extraMovesBought: 0,
            continues: 0,
            stars: 0,
            passed: !1,
            movesLeft: lvlData.moves
        }, G.sb("onBoosterBought").add(function(nr) {
            this.data.boosterBought[nr - 1]++
        }, this), G.sb("onBoosterUsed").add(function(nr) {
            this.data.boosterUsed[nr - 1]++
        }, this), G.sb("onStartBoosterUsed").add(function(nr) {
            this.data.startBoosterUsed[nr - 5] = 1
        }, this), G.sb("onExtraMovesUsed").add(function() {
            this.data.extraMovesBought++
        }, this), G.sb("onOutOfMovesWatch").add(function() {
            this.data.continues++
        }, this), G.sb("onOutOfMovesBuy").add(function() {
            this.data.continues++
        }, this), G.sb("madeMove").add(function() {
            this.data.passed || this.data.movesLeft--
        }, this), G.sb("onGoalAchieved").add(function() {
            this.data.passed = !0
        }, this), G.sb("onLevelFinished").add(function(lvlNr, stars) {
            this.data.stars = stars
        }, this), game.state.onStateChange.addOnce(this.send, this)
    }, G.TrackData.prototype.send = function() {}, G.UITargetParticles = function(minNrOfPart, maxNrOfPart) {
        G.PoolGroup.call(this, G.UITargetParticle), this.minNrOfPart = minNrOfPart || 3, this.maxNrOfPart = maxNrOfPart || 100
    }, G.UITargetParticles.prototype = Object.create(G.PoolGroup.prototype), G.UITargetParticles.prototype.createDividedBatch = function(x, y, sprite, targetObj, amount, interval, maxPartNr) {
        var batchObj = new G.UITargetParticles.BatchObj,
            maxPartNr = maxPartNr || 25,
            partNr = amount / interval;
        partNr > maxPartNr && (interval = Math.ceil(amount / maxPartNr));
        for (var nrOfPartsInBatch = Math.floor(amount / interval) + Math.sign(amount % interval), i = 0; nrOfPartsInBatch > i; i++) {
            var part = this.init(x, y, sprite, targetObj, Math.min(interval, amount));
            amount -= interval, batchObj.add(part)
        }
        return batchObj
    }, G.UITargetParticles.prototype.createBatch = function(x, y, sprite, targetObj, carriedValue, nrOfParts) {
        for (var batchObj = new G.UITargetParticles.BatchObj, i = 0; nrOfParts > i; i++) {
            var part = this.init(x, y, sprite, targetObj, carriedValue);
            batchObj.add(part)
        }
        return batchObj
    }, G.UITargetParticles.prototype.createCoinBatch = function(x, y, targetObj, amount) {
        var batch = (game.state.getCurrentState(), this.createDividedBatch(x, y, "coin_1", targetObj, amount, 5));
        batch.addOnPartStart(function() {
            this.scale.setTo(.75), this.vel.setTo(game.rnd.realInRange(-12, 12), game.rnd.realInRange(-12, 12))
        }), batch.addOnPartFinish(function() {
            G.sfx.pop.play(), G.saveState.changeCoins(this.carriedValue, !0)
        }), batch.start(), batch.onFinish.add(function() {
            G.saveState.save()
        })
    }, G.UITargetParticles.BatchObj = function() {
        this.parts = [], this.nrOfParts = 0, this.nrOfFinished = 0, this.onFinish = new Phaser.Signal
    }, G.UITargetParticles.BatchObj.prototype.add = function(part) {
        this.parts.push(part), part.onFinish.addOnce(this.onPartFinish, this), this.nrOfParts++
    }, G.UITargetParticles.BatchObj.prototype.onPartFinish = function() {
        this.nrOfFinished++, this.nrOfFinished == this.nrOfParts && this.onFinish.dispatch()
    }, G.UITargetParticles.BatchObj.prototype.addOnPartStart = function(func, context) {
        this.parts.forEach(function(part) {
            part.onStart.addOnce(func, context || part, 1)
        })
    }, G.UITargetParticles.BatchObj.prototype.addOnPartFinish = function(func, context) {
        this.parts.forEach(function(part) {
            part.onFinish.addOnce(func, context || part, 1)
        })
    }, G.UITargetParticles.BatchObj.prototype.start = function(delayBetween) {
        var delay = 0;
        this.parts.forEach(function(part) {
            part.start(delay), delay += delayBetween || 0
        })
    }, G.UITargetParticle = function() {
        G.Image.call(this, 0, 0, null, .5), this.onStart = new Phaser.Signal, this.onFinish = new Phaser.Signal, this.speed = 0, this.speedMax = 30, this.speedDelta = .75, this.vel = new Phaser.Point(0, 0), this.velInit = new Phaser.Point(0, 0), this.kill()
    }, G.UITargetParticle.prototype = Object.create(G.Image.prototype), G.UITargetParticle.prototype.init = function(x, y, sprite, targetObj, carriedValue) {
        this.position.setTo(x, y), this.changeTexture(sprite), this.onStart.removeAll(), this.onFinish.removeAll(), this.carriedValue = carriedValue || 1, this.targetObj = targetObj, this.stopTweens(this), this.scale.setTo(1), this.alpha = 1, this.speed = 0, this.speedMax = 30, this.speedDelta = .75, this.vel.setTo(0, 0)
    }, G.UITargetParticle.prototype.start = function(delay) {
        return delay ? void game.time.events.add(delay, this.start, this) : (this.revive(), this.worldPosition.x = 9999, this.worldPosition.y = 9999, void this.onStart.dispatch(this, this.carriedValue))
    }, G.UITargetParticle.prototype.update = function() {
        if (this.alive) {
            this.position.add(this.vel.x, this.vel.y), this.vel.x *= .95, this.vel.y *= .95, this.speed += this.speedDelta, this.speed = Math.min(this.speed, this.speedMax);
            var distanceToTarget = Phaser.Point.distance(this.worldPosition, this.targetObj.worldPosition),
                angleToTarget = Phaser.Point.angle(this.targetObj.worldPosition, this.worldPosition);
            this.position.add(G.lengthDirX(angleToTarget, Math.min(distanceToTarget, this.speed), !0), G.lengthDirY(angleToTarget, Math.min(distanceToTarget, this.speed), !0)), distanceToTarget < this.speedMax && (this.onFinish.dispatch(this, this.carriedValue), this.kill())
        }
    }, G.UI_BoosterButton = function(x, y, nr) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.orgY = this.y, this.state = game.state.getCurrentState(), this.boosterNr = nr, this.overlay = this.state.overlay, this.selected = !1, this.highlighted = !1, this.hl = G.makeImage(0, 0, "popup_lighht", .5, this), this.hl.blendMode = 1, this.hl.alpha = 0, this.hl.angle2 = 0, this.openLock = !1, G.sb("onTutorialFinish").add(function() {
            this.hideSuggestion()
        }, this), this.btn = new G.Button(0, 0, "ui_booster_" + nr, function() {
            return this.selected && !G.tutorialOpened ? G.sb("onBoosterDeselect").dispatch(this.boosterNr) : void(this.state.board.actionManager.actionList.length > 0 || (G.saveState.getBoosterAmount(this.boosterNr) > 0 || G.saveState.isEnoughToBuyBooster(this.boosterNr) ? G.sb("onBoosterSelect").dispatch(this.boosterNr) : game.incentivised ? G.sb("pushWindow").dispatch("moreMoney") : (G.stopTweens(this.priceLabel), this.priceLabel.scale.setTo(1), game.add.tween(this.priceLabel.scale).to({
                x: .6,
                y: 1.4
            }, 150, Phaser.Easing.Bounce.InOut, !0, 0, 2, !0))))
        }, this), this.add(this.btn), this.btn.addTerm(function() {
            return 0 == this.state.board.actionManager.actionList.length || this.selected
        }, this), this.boosterActiveOffset = G.l(20), this.tweenObj = {
            angle: -15,
            alpha: 1
        }, game.add.tween(this.tweenObj).to({
            angle: 15
        }, 2e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.tween(this.tweenObj).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.angleMulti = 0, this.priceLabel = new G.LabelGroupT(G.json.settings["priceOfBooster" + nr] + "@currency@", 0, 35, {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "#fdfbe4",
            stroke: "#73461c",
            strokeThickness: 7
        }, .5, 85), this.add(this.priceLabel), this.plus = G.makeImage(40, 30, "booster_plus", .5, this), this.amount = new G.Text(40, 33, G.saveState.getBoosterAmount(nr).toString(), {
            style: "font-beige-standard",
            fontSize: "25px"
        }, .5, 100), this.add(this.amount), this.hand = G.makeImage(0, 0, "tut_hand", 0, this), this.hand.alpha = 0, this.alphaTween = !1, this.refreshBoosterAmount(), G.sb("refreshBoosterAmount").add(function(nr) {
            nr == this.boosterNr && this.refreshBoosterAmount()
        }, this), G.sb("onBoosterSelect").add(function(nr) {
            nr == this.boosterNr ? this.select() : this.squeeze()
        }, this), G.sb("onBoosterUsed").add(function(nr) {
            nr == this.boosterNr ? this.deselect() : this.unsqueeze()
        }, this), G.sb("onBoosterDeselect").add(function(nr) {
            nr == this.boosterNr ? this.deselect() : this.unsqueeze()
        }, this)
    }, G.UI_BoosterButton.prototype = Object.create(Phaser.Group.prototype), G.UI_BoosterButton.prototype.refreshBoosterAmount = function() {
        0 == G.saveState.getBoosterAmount(this.boosterNr) ? (this.plus.visible = !1, this.amount.visible = !1, this.priceLabel.visible = !0) : (G.changeTexture(this.plus, "booster_ammount"), this.plus.visible = !0, this.amount.visible = !0, this.priceLabel.visible = !1, this.amount.setText(G.saveState.getBoosterAmount(this.boosterNr).toString()))
    }, G.UI_BoosterButton.prototype.update = function() {
        this.angle = this.angleMulti * this.tweenObj.angle, this.y = this.orgY - this.angleMulti * this.boosterActiveOffset, this.x = this.orgX, this.hl.angle2++, this.hl.angle = -this.angle + this.hl.angle2, this.hl.alpha = G.lerp(this.hl.alpha, this.selected ? .5 : 0, .1)
    }, G.UI_BoosterButton.prototype.select = function() {
        G.sb("startOverlay").dispatch([
            ["clearBoard"],
            ["moveToAboveGroup", this, "boosterGroup"]
        ]), this.selected = !0, game.add.tween(this).to({
            angleMulti: 1
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0)
    }, G.UI_BoosterButton.prototype.deselect = function() {
        G.sb("closeOverlay").dispatch(), this.selected = !1, game.add.tween(this).to({
            angleMulti: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0)
    }, G.UI_BoosterButton.prototype.squeeze = function() {
        game.add.tween(this.scale).to({
            x: .8,
            y: .8
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UI_BoosterButton.prototype.unsqueeze = function() {
        1 != this.scale.x && game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UI_BoosterButton.prototype.lock = function() {
        this.ignoreChildInput = !0
    }, G.UI_BoosterButton.prototype.unlock = function() {
        this.ignoreChildInput = !1
    }, G.UI_BoosterButton.prototype.hideSuggestion = function() {
        0 != this.hand.alpha && (this.alphaTween && this.alphaTween.stop(), G.stopTweens(this.hand), this.alphaTween = game.add.tween(this.hand).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0))
    }, G.UI_BoosterButton.prototype.showSuggestion = function() {
        this.openLock || (this.alphaTween && this.alphaTween.stop(), this.alphaTween = game.add.tween(this.hand).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.hand.position.setTo(0, 0), game.add.tween(this.hand).to({
            x: G.l(20),
            y: G.l(20)
        }, 800, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.openLock = !0, G.tutorialOpened || game.time.events.add(5e3, function() {
            this.hideSuggestion()
        }, this), game.time.events.add(15e3, function() {
            this.openLock = !1
        }, this))
    }, G.UI_BoosterLabel = function() {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.ico = G.makeImage(0, 0, null, .5, this), this.txt = new G.Text(0, 0, " ", {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "white",
            lineSpacing: -10
        }, .5, 400, 200, !0, "center"), this.txt.anchor.setTo(.5), this.txt.setShadow(0, 10, "rgba(0,0,0,1)", 10), this.add(this.txt), this.topBar = this.state.topBar, this.textLookup = {
            1: G.txt("Use the swap booster to change the place of two cookies!") + " ",
            2: G.txt("Use the star wand to crush one cookie!") + " ",
            3: G.txt("Use the horizontal pin to clear the whole row!") + " ",
            4: G.txt("Use the vertical pin to clear the whole column!") + " "
        }, G.sb("onScreenResize").add(this.resize, this), this.resize(), G.sb("onBoosterSelect").add(this.init, this), G.sb("closeOverlay").add(this.hide, this)
    }, G.UI_BoosterLabel.prototype = Object.create(Phaser.Group.prototype), G.UI_BoosterLabel.prototype.init = function(boosterNr) {
        G.changeTexture(this.ico, "ui_booster_" + boosterNr), this.txt.setText(this.textLookup[boosterNr.toString()]), this.alpha = 0, G.stopTweens(this), game.add.tween(this).to({
            alpha: 1
        }, 500, Phaser.Easing.Sinusoidal.Out, !0), this.resize()
    }, G.UI_BoosterLabel.prototype.hide = function() {
        G.stopTweens(this), game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UI_BoosterLabel.prototype.resize = function() {
        G.horizontal ? (this.position.setTo(-79, 194), this.txt.position.setTo(0, 60), this.txt.anchor.y = 0, this.txt.wordWrapWidth = G.l(200)) : (this.position.setTo(132, 70), this.txt.position.setTo(260, 0), this.txt.anchor.y = .5, this.txt.wordWrapWidth = G.l(350)), this.txt.setText(this.txt.text)
    }, G.UI_CoinCounter = function() {
        Phaser.Group.call(this, game), this.x = 100, this.y = 100, this.state = game.state.getCurrentState(), this.text = new G.TextCounter(0, 0, G.saveState.data.coins, {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "40px"
        }, [1, .5], 200), this.add(this.text), this.ico = G.makeImage(0, 0, "currency", [0, .5], this), this.alpha = 0, G.sb("onScreenResize").add(this.resize, this), this.resize(), G.sb("onBoosterSelect").add(this.init, this), G.sb("closeOverlay").add(this.hide, this), G.sb("onCoinsChange").add(this.text.setAmount, this.text)
    }, G.UI_CoinCounter.prototype = Object.create(Phaser.Group.prototype), G.UI_CoinCounter.prototype.resize = function() {
        G.horizontal ? (this.x = 0, this.y = G.l(700)) : (this.x = G.l(330), this.y = this.state.board.y - G.l(60), this.x += Math.floor(.5 * this.text.width))
    }, G.UI_CoinCounter.prototype.init = function(boosterNr) {
        G.saveState.getBoosterAmount(boosterNr) <= 0 && (this.alpha = 0, G.stopTweens(this), game.add.tween(this).to({
            alpha: 1
        }, 500, Phaser.Easing.Sinusoidal.Out, !0), this.resize())
    }, G.UI_CoinCounter.prototype.hide = function() {
        G.stopTweens(this), game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UI_ComboIndicator = function() {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.bg = G.makeImage(0, 0, "combo_bg", .5, this), this.coinGroup = this.add(game.add.group()), this.comboTxt = new G.OneLineCounter(0, 5, "font-score-4", 0, 50, 100, .5, .5, "x"), this.add(this.comboTxt), G.sb("onComboIncrease").add(this.increaseCombo, this), G.sb("onComboBreak").add(this.breakCombo, this), this.lvl = G.lvl, this.scale.setTo(0), this.breakTimerAmount = 30, this.breakTimer = -1, this.combo = 0, this.board = game.state.getCurrentState().board, this.x = this.board.x + .5 * this.board.width, this.y = this.board.y + .5 * this.board.height
    }, G.UI_ComboIndicator.prototype = Object.create(Phaser.Group.prototype), G.UI_ComboIndicator.prototype.update = function() {
        this.x = this.board.x + .9 * this.board.width, this.y = this.board.y + .02 * this.board.height, this.comboTxt.update(), 0 == this.breakTimer-- && (G.stopTweens(this), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 200, Phaser.Easing.Cubic.In, !0)), this.coinGroup.update()
    }, G.UI_ComboIndicator.prototype.increaseCombo = function(newAmount) {
        G.lvl.combo < 2 || (3 == G.lvl.combo && (this.breakTimer = -1, G.stopTweens(this), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Cubic.In, !0)), G.stopTweens(this.comboTxt), this.comboTxt.changeAmount(newAmount), this.comboTxt.scale.setTo(1), game.add.tween(this.comboTxt.scale).to({
            x: 1.3,
            y: 1.3
        }, 200, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), this.combo = newAmount)
    }, G.UI_ComboIndicator.prototype.breakCombo = function() {
        this.combo < 3 || (this.combo = 0, this.breakTimer = this.breakTimerAmount)
    }, G.UI_ComboIndicatorCoin = function(x, y) {
        Phaser.Image.call(this, game, x, y, null), this.anchor.setTo(.5), this.scale.setTo(.7), G.changeTexture(this, "coin_1"), this.angle = game.rnd.between(0, 360), this.velX = game.rnd.realInRange(G.l(-5), G.l(5)), this.velY = game.rnd.realInRange(G.l(-10), G.l(-5)), this.grav = G.lnf(.35), this.alphaDelay = 20
    }, G.UI_ComboIndicatorCoin.prototype = Object.create(Phaser.Image.prototype), G.UI_ComboIndicatorCoin.prototype.update = function() {
        this.x += this.velX, this.y += this.velY, this.velX *= .98, this.velY += this.grav, this.angle += .5 * this.velX, this.alphaDelay-- < 0 && (this.alpha -= .03, this.alpha <= 0 && this.destroy())
    }, G.UI_DailyChallengeIcon = function(x, y) {
        this.state = game.state.getCurrentState(), Phaser.Group.call(this, game), this.unlocked = G.saveState.getLastPassedLevelNr() >= G.json.settings.featuresUnlock.dailyChallenge, this.x = G.l(x), this.y = G.l(y), this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.alpha = .5, this.glow.scale.setTo(.5), this.glow.blendMode = 1, this.glow.update = function() {
            this.angle++
        }, this.icon = new G.Button(0, 0, "btn_daily_challenge", function() {
            this.available && G.sb("pushWindow").dispatch(["dailyChallenge", G.saveState.getDailyChallengeLevel()])
        }, this), this.add(this.icon), this.freeText = new G.Text(0, 65, G.txt("Daily Challenge"), {
            fill: "#fdfbe4",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#73461c",
            strokeThickness: 7
        }, .5, 150, 150, !0, "center"), this.freeText.inputEnabled = !0, this.freeText.input.useHandCursor = !0, this.freeText.events.onInputDown.add(function() {
            this.available && G.sb("pushWindow").dispatch(["dailyChallenge", G.saveState.getDailyChallengeLevel()])
        }, this), this.freeText.lineSpacing = -20, this.freeText.setShadow(0, 0, "black", 3), this.add(this.freeText), game.add.tween(this.freeText.scale).to({
            x: .9,
            y: .9
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.checkAvailability(), G.sb("onScreenResize").add(this.onResize, this), this.onResize();
        var lastLevelData = this.state.lastLevelData;
        lastLevelData && lastLevelData.challenge && game.time.events.add(1e3, function() {
            this.batchesWaitingForFinish = 0, this.createParticlesBatch(lastLevelData)
        }, this)
    }, G.UI_DailyChallengeIcon.prototype = Object.create(Phaser.Group.prototype), G.UI_DailyChallengeIcon.prototype.update = function() {
        this.glow.angle++
    }, G.UI_DailyChallengeIcon.prototype.checkAvailability = function() {
        this.unlocked && G.saveState.isChallengeAvailable() ? (this.available = !0, this.freeText.visible = this.glow.visible = !0, this.visible = !0) : (this.freeText.visible = this.glow.visible = !1, this.available = !1, this.visible = !1, game.time.events.add(5e3, this.checkAvailability, this))
    }, G.UI_DailyChallengeIcon.prototype.onResize = function() {
        var center = game.world.bounds.x + Math.floor(.5 * game.width);
        game.width < 1070 ? this.x = center + 260 : this.x = center + 260 + 230
    }, G.UI_DailyChallengeIcon.prototype.createParticlesBatch = function(lastLevelData) {
        lastLevelData.starImprovement > 0 && this.afterLvlPartBatch(lastLevelData.lvlNr, lastLevelData.starImprovement, "stars"), lastLevelData.reward > 0 && this.afterLvlPartBatch(lastLevelData.lvlNr, lastLevelData.reward, "coins")
    }, G.UI_DailyChallengeIcon.prototype.afterLvlPartBatch = function(lvlNr, amount, objType) {
        var coins = "coins" == objType,
            batch = this.state.uiTargetParticlesBW.createDividedBatch(game.world.bounds.x + this.worldPosition.x, this.worldPosition.y, coins ? "coin_1" : "map_star_1", coins ? this.state.panel.coinsTxt : this.state.panel.starsTxt, amount, coins ? 3 : 1);
        batch.addOnPartStart(function() {
            coins ? this.scale.setTo(.9) : this.scale.setTo(1.2), this.speedDelta = .5, this.speedMax = 20, this.vel.x = game.rnd.realInRange(-20, 20), this.vel.y = game.rnd.realInRange(-20, 20)
        }), batch.addOnPartFinish(function() {
            if (G.sfx.pop.play(), coins) G.saveState.changeCoins(this.carriedValue, !0);
            else {
                var starsTxt = this.state.panel.starsTxt;
                starsTxt.setText(parseInt(starsTxt.text) + 1)
            }
        }), this.batchesWaitingForFinish++, batch.onFinish.add(function() {
            this.batchesWaitingForFinish--, 0 == this.batchesWaitingForFinish && G.saveState.save()
        }, this), batch.start()
    }, G.UI_DailyIcon = function(x, y) {
        this.active = G.saveState.getLastPassedLevelNr() >= G.json.settings.featuresUnlock.daily, this.tutorial = this.active && !G.saveState.data.sawDailyTut, this.state = game.state.getCurrentState(), Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.addIcon(), this.active ? (this.addGlow(), this.addTimerAndFreeText()) : this.addUnlockTxt(), this.update(), this.tutorial && (this.tutHand = G.makeImage(0, 20, "tut_hand", 0, this), game.add.tween(this.tutHand).to({
            x: G.l(20),
            y: G.l(50)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.UI_DailyIcon.prototype = Object.create(Phaser.Group.prototype), G.UI_DailyIcon.prototype.update = function() {
        this.active && (this.glow.angle++, this.freeText.visible = this.glow.visible = G.saveState.data.freeSpin, this.timer.visible = !this.freeText.visible), this.iconDark.visible = !this.active || !G.saveState.data.freeSpin
    }, G.UI_DailyIcon.prototype.onResize = function() {
        var center = game.world.bounds.x + Math.floor(.5 * game.width);
        game.width < 1070 ? this.x = center + 260 : this.x = center + 260 + 230
    }, G.UI_DailyIcon.prototype.addIcon = function() {
        this.icon = new G.Button(0, 0, "daily_icon", function() {
            this.active && (game.incentivised || G.saveState.data.freeSpin) && (G.sb("pushWindow").dispatch(["daily2", this.tutorial]), this.tutorial && (this.tutHand && this.tutHand.destroy(), G.saveState.data.sawDailyTut = !0, G.saveState.save(), G.sb("onWindowClosed").addOnce(function() {
                var state = game.state.getCurrentState();
                state.lvlTutHand && game.add.tween(state.lvlTutHand).to({
                    alpha: 1
                }, 500, Phaser.Easing.Sinusoidal.Out, !0)
            })))
        }, this), this.add(this.icon), this.iconDark = G.makeImage(0, 0, "daily_icon_dark", .5, this.icon)
    }, G.UI_DailyIcon.prototype.addGlow = function() {
        this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.alpha = .5, this.glow.scale.setTo(.5), this.glow.blendMode = 1, this.glow.update = function() {
            this.angle++
        }, this.sendToBack(this.glow)
    }, G.UI_DailyIcon.prototype.addTimerAndFreeText = function() {
        this.timer = new G.Timer(0, 0, "font-white-stroke", 30, 130, .5, .5, (G.saveState.data.lastDaily + 864e5 - Date.now()) / 1e3), this.timer.active = !0, this.add(this.timer), G.sb("onDailyFreeSpinGain").add(function() {
            this.timer.setSecLeft((G.saveState.data.lastDaily + 864e5 - Date.now()) / 1e3)
        }, this), this.freeText = new G.Text(0, 0, G.txt("Free spin!"), {
            fill: "#ffffe8",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#004455",
            strokeThickness: 5
        }, .5, 150, 150, !0, "center"), this.freeText.lineSpacing = -15, this.freeText.setShadow(0, 0, "black", 3), this.add(this.freeText), game.add.tween(this.freeText.scale).to({
            x: .9,
            y: .9
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.UI_DailyIcon.prototype.addUnlockTxt = function(lvl) {
        this.unlockTxt = new G.Text(0, 0, G.txt("Unlock at Level X").replace("X", G.json.settings.featuresUnlock.daily + 1), {
            fill: "#fdfbe4",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#73461c",
            strokeThickness: 5
        }, .5, 150, 150, !0, "center"), this.unlockTxt.lineSpacing = -15, this.unlockTxt.setShadow(0, 0, "black", 3), this.add(this.unlockTxt), game.add.tween(this.unlockTxt.scale).to({
            x: .9,
            y: .9
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.UI_ExtraMovesBuyButton = function() {
        Phaser.Group.call(this, game), this.targetY = 0, this.state = game.state.getCurrentState(), this.hl = G.makeImage(0, 0, "popup_lighht", .5, this), this.hl.alpha = .2, this.hl.scale.setTo(.6), this.hl.blendMode = 1, this.floating = {
            offset: G.l(-10)
        }, game.add.tween(this.floating).to({
            offset: G.l(10)
        }, 700, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.btn = new G.Button(0, 0, "ui_booster_5", this.btnClick, this), this.btn.sfx = G.sfx.cash_register, this.btn.addTerm(function() {
            return G.lvl.moves < 5
        }), this.add(this.btn), this.labelBg = G.makeImage(0, 45, "move_extra_label", .5, this), G.sb("madeMove").add(function() {
            G.lvl.goalAchieved || G.saveState.data.coins >= G.lvl.getPriceOfExtraMoves() && 4 == G.lvl.moves && this.show()
        }, this), G.sb("onWindowOpened").add(function() {
            this.hide()
        }, this), G.sb("onWindowClosed").add(function() {
            this.visible || G.saveState.data.coins >= G.lvl.getPriceOfExtraMoves() && G.lvl.moves <= 4 && G.lvl.moves > 0 && this.show()
        }, this), this.scale.setTo(0), this.visible = !1, G.sb("onGoalAchieved").add(this.hide, this)
    }, G.UI_ExtraMovesBuyButton.prototype = Object.create(Phaser.Group.prototype), G.UI_ExtraMovesBuyButton.prototype.update = function() {
        this.y = this.targetY + this.floating.offset, this.hl.angle++
    }, G.UI_ExtraMovesBuyButton.prototype.btnClick = function() {
        if (G.saveState.data.coins >= G.lvl.getPriceOfExtraMoves()) {
            var wp = this.worldPosition;
            G.sb("UIfx").dispatch(wp.x + game.world.bounds.x, wp.y, "whiteStarPart"), G.sb("UIfx").dispatch(wp.x + game.world.bounds.x, wp.y, "whiteStarPart"), G.sb("UIfx").dispatch(wp.x + game.world.bounds.x, wp.y, "whiteStarPart"), G.sb("UIfx").dispatch(wp.x + game.world.bounds.x, wp.y, "whiteStarPart"), G.lvl.buyExtraMoves(), this.hide()
        } else this.state.windowLayer.pushWindow(["moreMoney"])
    }, G.UI_ExtraMovesBuyButton.prototype.show = function() {
        !game.incentivised && G.saveState.getCoins() < G.lvl.getPriceOfExtraMoves() || (this.priceTxt && this.priceTxt.destroy(), this.priceTxt = new G.LabelGroupT("$+5 moves$ " + G.lvl.getPriceOfExtraMoves() + "@coin_1@", 5, 45, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "white"
        }, .5, 180), this.add(this.priceTxt), this.visible = !0, G.stopTweens(this), this.scale.setTo(0), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 2e3, Phaser.Easing.Elastic.Out, !0))
    }, G.UI_ExtraMovesBuyButton.prototype.hide = function() {
        G.stopTweens(this), game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 400, Phaser.Easing.Cubic.Out, !0).onComplete.add(function() {
            this.visible = !1
        }, this)
    }, G.UI_Life = function(x, y) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.lifeIcon = new G.Button(0, 0, "top-panel-heardsBg", function() {
            G.gameTracking.design("GetLivesButtonClicked"), G.sb("pushWindow").dispatch("buyLives")
        }, this), this.add(this.lifeIcon), this.currentLivesNr = G.saveState.getCurrentLivesNr(), this.livesMax = G.json.settings.livesMax, this.livesNrTxt = new G.Text(-50, 0, this.currentLivesNr.toString(), {
            style: "font-red",
            fontSize: "29px"
        }, .5, 150), this.add(this.livesNrTxt), this.timer = new G.TextTimer(25, 4, 0, {
            style: "font-beige",
            fontSize: 30
        }, .5, 140, "ms"), this.add(this.timer), this.timerMax = new G.Text(25, 4, G.txt("Max"), {
            style: "font-beige",
            fontSize: 30
        }, .5, 100), this.add(this.timerMax), this.timer.start(), G.sb("onWallClockTimeUpdate").add(this.onTickUpdate, this), G.sb("onLifeAdded").add(this.onTickUpdate, this), G.sb("onLifeTimerUpdate").add(this.timer.setSecLeft, this.timer), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onAllWindowsClosed").add(this.unlockInput, this)
    }, G.UI_Life.prototype = Object.create(Phaser.Group.prototype), G.UI_Life.prototype.onTickUpdate = function() {
        var newCurrentLives = G.saveState.getCurrentLivesNr();
        this.currentLivesNr !== newCurrentLives && (this.currentLivesNr = newCurrentLives, this.livesNrTxt.setText(this.currentLivesNr.toString()))
    }, G.UI_Life.prototype.update = function() {
        this.currentLivesNr !== this.livesMax ? (this.timer.visible = !0, this.timerMax.visible = !1) : (this.timer.visible = !1, this.timerMax.visible = !0), 0 === this.currentLivesNr ? this.lifeIcon.inputEnabled = !0 : this.lifeIcon.inputEnabled = !1
    }, G.UI_Life.prototype.lockInput = function() {
        this.ignoreChildInput = !0
    }, G.UI_Life.prototype.unlockInput = function() {
        this.ignoreChildInput = !1
    }, G.UI_PopOutMoney = function() {
        Phaser.Image.call(this, game, 0, 0, null), this.state = game.state.getCurrentState(), this["double"] = this.state.doubleMoney, G.changeTexture(this, this["double"] ? "coin_2" : "coin_1"), this.anchor.setTo(.5), this.kill()
    }, G.UI_PopOutMoney.prototype = Object.create(Phaser.Image.prototype), G.UI_PopOutMoney.prototype.init = function(x, y) {
        G.stopTweens(this), this.revive(), G.saveState.changeCoins(this["double"] ? 2 : 1), G.sb("onLevelMoneyGain").dispatch(this["double"] ? 2 : 1), G.sfx.cash_register.play(), this.x = x, this.y = y, this.scale.setTo(0), this.angle = -10, game.add.tween(this).to({
            y: this.y - G.l(20 * Math.random() + 30)
        }, 500, Phaser.Easing.Cubic.InOut, !0, 0, 0, !0), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Cubic.InOut, !0, 0, 0, !0).onComplete.add(this.kill, this)
    }, G.UI_ShoutOuts = function() {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.board = this.state.board, this.glowImg = G.makeImage(0, 0, "popup_lighht", .5, this), this.glowImg.alpha = .5, this.glowImg.visible = !1, this.shoutOut = new G.Text(0, 0, " ", {
            style: "font-red",
            fontSize: 70
        }, .5, 600), this.add(this.shoutOut), this.shoutOut.visible = !1, this.combo = 0, G.sb("onComboIncrease").add(this.increaseCombo, this), G.sb("onComboBreak").add(this.breakCombo, this), G.sb("onGoalAchieved").add(this.cookieCrush, this), G.sb("madeMove").add(function() {
            G.lvl.goalAchieved || (10 == G.lvl.moves && this.lockedShoutOut(G.txt("10 moves left")), 5 == G.lvl.moves && this.lockedShoutOut(G.txt("5 moves left")))
        }, this), this.locked = !1, this.board = game.state.getCurrentState().board, this.x = this.board.x + .5 * (this.board.width - 2 * this.board.tilesize), this.y = this.board.y + .45 * (this.board.height - 2 * this.board.tilesize)
    }, G.UI_ShoutOuts.prototype = Object.create(Phaser.Group.prototype), G.UI_ShoutOuts.prototype.update = function() {
        this.x = this.board.x + .5 * (this.board.width - 2 * this.board.tilesize), this.y = this.board.y + .45 * (this.board.height - 2 * this.board.tilesize), this.glowImg.angle++
    }, G.UI_ShoutOuts.prototype.increaseCombo = function(newAmount) {
        if (!this.locked && !G.lvl.goalAchieved) {
            this.combo = newAmount;
            var txt = !1;
            3 == this.combo && (txt = G.txt("Good!")), 5 == this.combo && (txt = G.txt("Nice!")), this.combo >= 7 && (txt = G.txt("Amazing!")), this.combo >= 9 && (txt = G.txt("Excellent!")), 11 == this.combo && (txt = G.txt("Super Combo!")), txt && (G.stopTweens(this.shoutOut), this.shoutOut.visible = !0, this.shoutOut.alpha = 1, this.shoutOut.setText(txt), this.shoutOut.scale.setTo(0), game.add.tween(this.shoutOut.scale).to({
                x: 1,
                y: 1
            }, 700, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.shoutOut).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.In, !0, 1e3).onComplete.add(function() {
                this.shoutOut.visible = !1
            }, this))
        }
    }, G.UI_ShoutOuts.prototype.lockedShoutOut = function(txt) {
        this.locked = !0, G.stopTweens(this.shoutOut), this.shoutOut.visible = !0, this.shoutOut.alpha = 1, this.shoutOut.setText(txt), this.shoutOut.scale.setTo(0), game.add.tween(this.shoutOut.scale).to({
            x: 1,
            y: 1
        }, 700, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.shoutOut).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0, 1500).onComplete.add(function() {
            this.shoutOut.visible = !1, this.locked = !1
        }, this)
    }, G.UI_ShoutOuts.prototype.cookieCrush = function() {
        this.glowImg.scale.setTo(0), this.glowImg.visible = !0, game.add.tween(this.glowImg.scale).to({
            x: 1.5,
            y: 1.5
        }, 500, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.glowImg).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0, 1500), G.stopTweens(this.shoutOut), this.shoutOut.visible = !0, this.shoutOut.alpha = 1, this.shoutOut.setText(G.txt("Cookie Crush!")), this.shoutOut.scale.setTo(0), game.add.tween(this.shoutOut.scale).to({
            x: 1,
            y: 1
        }, 700, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.shoutOut).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0, 1500).onComplete.add(function() {
            this.shoutOut.visible = !1
        }, this);
        for (var i = 0; 10 > i; i++) G.sb("UIfx").dispatch(this.x - 100 + 20 * i, this.y, "whiteStarPart")
    }, G.UI_ShoutOuts.prototype.breakCombo = function() {
        this.combo = 0
    }, G.UI_StartBoosterButton = function(x, y, nr, lvlNr) {
        Phaser.Group.call(this, game), this.unlocked = G.saveState.isBoosterUnlocked(nr), this.x = G.l(x), this.y = G.l(y), this.nr = nr, this.lvlNr = lvlNr, this.unlocked ? (this.initUnlocked(nr, lvlNr), G.saveState.data.startBoosterAnim[nr - 5] && (G.saveState.data.startBoosterAnim[nr - 5] = !1, G.saveState.save(), this.initUlockAnimation())) : this.img = G.makeImage(0, 0, "ui_booster_" + nr + "_locked", .5, this)
    }, G.UI_StartBoosterButton.prototype = Object.create(Phaser.Group.prototype), G.UI_StartBoosterButton.prototype.update = function() {
        this.hl && (this.hl.angle++, this.hl.alpha = game.math.clamp(this.hl.alpha + (this.selected ? .05 : -.05), 0, 1), this.priceTxt.alpha = game.math.clamp(this.priceTxt.alpha + (0 != this.amount || this.selected ? -.05 : .05), 0, 1));
        for (var i = this.children.length; i--;) this.children[i].update()
    }, G.UI_StartBoosterButton.prototype.select = function() {
        this.startBoosterConfig.select(this.levelNr, this.boosterNr), this.selected = !0, this.amount--, this.amountTxt.setText(this.amount.toString())
    }, G.UI_StartBoosterButton.prototype.deselect = function() {
        this.startBoosterConfig.deselect(this.levelNr, this.boosterNr), this.selected = !1, this.amount++, this.amountTxt.setText(this.amount.toString())
    }, G.UI_StartBoosterButton.prototype.initUnlocked = function(nr, lvlNr) {
        this.startBoosterConfig = game.state.getCurrentState().startBoosterConfig, this.boosterNr = nr, this.levelNr = lvlNr, this.hl = G.makeImage(0, 0, "popup_lighht", .5, this), this.hl.scale.setTo(.6), this.hl.angle = 360 * Math.random(), this.hl.alpha = 0, this.btn = new G.Button(0, 0, "ui_booster_" + nr, function() {
            this.selected ? this.deselect() : this.amount > 0 ? this.select() : G.saveState.isEnoughToBuyBooster(this.boosterNr) ? (G.saveState.buyBooster(this.boosterNr), this.amount++, this.amountTxt.setText(this.amount.toString())) : game.incentivised ? (this.parent.state.windowLayer.pushWindow(["moreMoney", "level"]), this.parent.closeWindow()) : (this.alpha = .5, this.btn.inputEnabled = !1)
        }, this), this.add(this.btn), this.selected = !1, this.amountBg = G.makeImage(-40, -40, "booster_ammount", .5, this), this.amount = G.saveState.getBoosterAmount(nr), this.amountTxt = new G.Text(-40, -40, this.amount.toString(), {
            style: "font-beige-standard",
            fontSize: "25px"
        }, .5, 100), this.add(this.amountTxt), this.priceTxt = new G.LabelGroupT(G.json.settings["priceOfBooster" + this.boosterNr] + "@coin_1@", 10, 45, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "white"
        }, .5, 100), this.add(this.priceTxt), this.amount > 0 && (this.priceTxt.alpha = 0), this.startBoosterConfig.isSelected(this.levelNr, this.boosterNr) && this.select(), 0 == this.amount && !game.incentivised && G.saveState.getCoins() < G.json.settings["priceOfBooster" + this.boosterNr] && (this.alpha = .5,
            this.btn.inputEnabled = !1)
    }, G.UI_StartBoosterButton.prototype.initUlockAnimation = function() {
        this.ignoreChildInput = !0, this.amountTxt.alpha = 0, this.amountBg.alpha = 0;
        var delay = 500,
            circle = G.makeImage(0, 0, "circle", .5, this),
            orgW = circle.width,
            orgH = circle.height;
        circle.scale.setTo(0), circle.blendMode = 1, game.add.tween(circle).to({
            width: 2 * orgW,
            height: 2 * orgH,
            alpha: 0
        }, 600, Phaser.Easing.Cubic.Out, !0, delay), game.time.events.add(delay, function() {
            G.sfx.match_1.play();
            for (var i = 0; 5 > i; i++) {
                var start = G.makeImage(0, 0, "starPart", .5, this);
                start.angle = 360 * Math.random(), start.velX = Math.random(20) * G.lnf(-20) + G.lnf(10), start.velY = Math.random() * G.lnf(-9) - G.lnf(3), start.gravity = G.lnf(.5), start.update = function() {
                    this.x += this.velX * G.deltaTime, this.y += this.velY * G.deltaTime, this.angle += .1 * this.velX, this.velX *= .99, this.velY += this.gravity * G.deltaTime, this.alpha -= .02, this.alpha <= 0 && this.kill()
                }
            }
            game.add.tween(this.amountTxt).to({
                alpha: 1
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.amountBg).to({
                alpha: 1
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.ignoreChildInput = !1
        }, this), this.lock = G.makeImage(0, 0, "ui_booster_" + this.nr + "_locked", .5, this), game.add.tween(this.lock).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, delay)
    }, G.makeExtImage = function(x, y, url, waitImg, anchor, groupToAdd, tmp, func) {
        G.extLoader || (G.extLoader = new G.ExtLoader(game), G.extLoader.crossOrigin = "anonymous");
        var img;
        if (G.extLoader.loadedUrls[url]) return img = G.makeImage(x, y, G.extLoader.loadedUrls[url], anchor, groupToAdd), func.call(img), img;
        img = G.makeImage(x, y, waitImg, anchor, groupToAdd), img.onImgLoaded = new Phaser.Signal, G.extImagesKeys || (G.extImagesKeys = []);
        var name = "extImgBlankName" + G.extImagesKeys.length;
        G.extImagesKeys.push(name);
        var binding = G.extLoader.onFileComplete.add(function(progress, key, success) {
            key == name && success && (G.extLoader.loadedUrls[url] = name, G.changeTexture(img, name), func && func.call(img), binding.detach())
        });
        return G.extLoader.image(name, url, !0), img
    }, G.changeSecToDHMS = function(sec) {
        var secNum = parseInt(sec, 10),
            days = Math.floor(secNum / 86400),
            hours = Math.floor((secNum - 86400 * days) / 3600),
            minutes = Math.floor((secNum - 86400 * days - 3600 * hours) / 60),
            seconds = secNum - 86400 * days - 3600 * hours - 60 * minutes;
        return [this.zeroPad(days), this.zeroPad(hours), this.zeroPad(minutes), this.zeroPad(seconds)]
    }, G.zeroPad = function(number) {
        return 10 > number ? "0" + number : number
    }, G.WaitingIcon = function(x, y) {
        Phaser.Image.call(this, game, x, y), G.changeTexture(this, "waiting_icon"), this.anchor.setTo(.5, .5), this.frameCounter = 0
    }, G.WaitingIcon.prototype = Object.create(Phaser.Image.prototype), G.WaitingIcon.prototype.update = function() {
        this.frameCounter++ % 5 === 0 && (this.angle += 45)
    }, G.WorldMapBubbleGiftDynamicLayer = function(map) {
        Phaser.Group.call(this, game), this.position = map.position, this.map = map, this.freeInstances = [], this.activeBubbleGiftsData = JSON.parse(JSON.stringify(G.json.settings.bubbleGifts)).filter(function(obj) {
            return !G.saveState.isBubbleGiftUsed(obj.levelNumber)
        }), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapBubbleGiftDynamicLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapBubbleGiftDynamicLayer.prototype.unlockInput = function() {
        this.ignoreChildInput = !1, this.children.forEach(function(child) {
            child.ignoreChildInput = !1
        })
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.lockInput = function() {
        this.ignoreChildInput = !0, this.children.forEach(function(child) {
            child.ignoreChildInput = !0
        })
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.update = function() {
        for (var i = 0, len = this.activeBubbleGiftsData.length; len > i; i++) {
            var bubbleData = this.activeBubbleGiftsData[i];
            if (G.json.levels[bubbleData.levelNumber - 1]) {
                var wy = this.y + G.json.levels[bubbleData.levelNumber - 1].mapY;
                wy > -500 && wy < game.height + 500 ? bubbleData.instance || G.saveState.isBubbleGiftUsed(bubbleData.levelNumber) || this.placeInstance(bubbleData) : bubbleData.instance && this.hideInstance(bubbleData)
            }
        }
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.placeInstance = function(bubbleData) {
        bubbleData.instance = this.getFreeInstance(), bubbleData.instance.init(bubbleData), this.add(bubbleData.instance)
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.hideInstance = function(bubbleData) {
        bubbleData.instance.hide(), bubbleData.instance.parent.removeChild(bubbleData.instance), this.freeInstances.push(bubbleData.instance), bubbleData.instance = null
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.getFreeInstance = function() {
        return this.freeInstances.shift() || new G.WorldMapBubbleGiftDynamicLayer.BubbleGift
    }, G.WorldMapBubbleGiftDynamicLayer.BubbleGift = function() {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.iconImg = G.makeImage(0, 0, null, .5, this), this.bubbleImg = G.makeImage(0, 0, null, .5, this), this.bubbleImg2 = G.makeImage(0, 0, null, .5, this), this.bubbleImg2.blendMode = 1, this.bubbleImg2.scale = this.bubbleImg.scale, this.bubbleImg2.alpha = .3, game.add.tween(this.bubbleImg2).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.tween(this.pivot).to({
            y: 20
        }, 2600, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.WorldMapBubbleGiftDynamicLayer.BubbleGift.prototype = Object.create(Phaser.Group.prototype), G.WorldMapBubbleGiftDynamicLayer.BubbleGift.prototype.init = function(config) {
        this.config = config, this.levelNumber = this.config.levelNumber, this.lvlData = G.json.levels[config.levelNumber - 1], this.position.setTo(this.lvlData.mapX, this.lvlData.mapY), this.config.offset ? (this.position.x += this.config.offset.x, this.position.y += this.config.offset.y) : this.position.y -= 120;
        var icon = G.gift.getIcon(this.config.gift);
        G.changeTexture(this.iconImg, "coin_1" === icon ? "coin_3" : icon), this.iconImg.scale.setTo("coin_3" === icon ? .9 : 1), this.bubbleImg.scale.setTo(1), this.unlocked = this.config.levelNumber - 1 <= G.saveState.getLastPassedLevelNr(), G.changeTexture(this.bubbleImg, this.unlocked ? "giftBubble_active" : "giftBubble"), G.changeTexture(this.bubbleImg2, this.unlocked ? "giftBubble_active" : "giftBubble"), this.unlocked ? (this.bubbleImg.inputEnabled = !0, this.bubbleImg.input.useHandCursor = !0, this.bubbleImg.events.onInputDown.addOnce(this.open, this), this.bubbleImg2.visible = !0, this.alpha = 1) : (this.bubbleImg.inputEnabled = !1, this.bubbleImg2.visible = !1, this.alpha = .75)
    }, G.WorldMapBubbleGiftDynamicLayer.BubbleGift.prototype.hide = function() {
        G.stopTweens(this), G.stopTweens(this.bubbleImg), G.stopTweens(this.iconImg), this.bubbleImg.events.onInputDown.removeAll(), this.rewardLabel && (this.rewardLabel.destroy(), this.rewardLabel = null)
    }, G.WorldMapBubbleGiftDynamicLayer.BubbleGift.prototype.open = function() {
        G.gameTracking.design("BubbleGiftOpened", this.config.levelNumber), G.gameTracking.FTUEDesign("FTUE:28a_MapCollectBonus"), G.saveState.markBubbleGiftAsUsed(this.config.levelNumber), G.gift.applyGift(this.config.gift), G.sb("onBubbleGiftOpened").dispatch(this.config.levelNumber), G.sfx.pop.play(), game.time.events.add(300, G.sfx.line.play, G.sfx.line), this.bubbleImg.inputEnabled = !1;
        var str = G.gift.getLabelString(this.config.gift, 1.2);
        game.add.tween(this.bubbleImg.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0), game.add.tween(this.iconImg.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0), this.rewardLabel = this.add(new G.LabelTextT(str, 0, 0, {
            font: "ComicSansBold",
            fontSize: "45px",
            fill: "#ffedd9",
            stroke: "#85511f",
            strokeThickness: 4
        }, .5, 300)), this.rewardLabel.scale.setTo(0), game.add.tween(this.rewardLabel.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Elastic.Out, !0, 300), game.add.tween(this).to({
            alpha: 0
        }, 400, Phaser.Easing.Sinusoidal.Out, !0, 1200)
    }, G.WorldMapBubbleGiftLayer = function(map) {
        Phaser.Group.call(this, game), this.position = map.position, this.init(), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapBubbleGiftLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapBubbleGiftLayer.prototype.unlockInput = function() {
        this.ignoreChildInput = !1, this.children.forEach(function(child) {
            child.ignoreChildInput = !1
        })
    }, G.WorldMapBubbleGiftLayer.prototype.lockInput = function() {
        this.ignoreChildInput = !0, this.children.forEach(function(child) {
            child.ignoreChildInput = !0
        })
    }, G.WorldMapBubbleGiftLayer.prototype.init = function() {
        G.json.settings.bubbleGifts.forEach(function(obj) {
            G.saveState.isBubbleGiftUsed(obj.levelNumber) || this.add(new G.WorldMapBubbleGiftLayer.BubbleGift(obj))
        }, this)
    }, G.WorldMapBubbleGiftLayer.BubbleGift = function(config) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.config = config, this.levelNumber = this.config.levelNumber, this.lvlData = G.json.levels[config.levelNumber - 1], this.position.x = this.lvlData.mapX, this.position.y = this.lvlData.mapY, this.config.offset ? (this.position.x += this.config.offset.x, this.position.y += this.config.offset.y) : this.position.y -= 120, this.unlocked = this.config.levelNumber - 1 <= G.saveState.getLastPassedLevelNr();
        var icon = G.gift.getIcon(this.config.gift);
        "coin_1" === icon && (icon = "coin_3"), this.iconImg = G.makeImage(0, 0, icon, .5, this), "coin_3" === icon && this.iconImg.scale.setTo(.9), this.bubbleImg = G.makeImage(0, 0, this.unlocked ? "giftBubble_active" : "giftBubble", .5, this), this.unlocked ? (this.bubbleImg.inputEnabled = !0, this.bubbleImg.input.useHandCursor = !0, this.bubbleImg.events.onInputDown.addOnce(this.open, this), this.bubbleImg2 = G.makeImage(0, 0, this.unlocked ? "giftBubble_active" : "giftBubble", .5, this), this.bubbleImg2.blendMode = 1, this.bubbleImg2.scale = this.bubbleImg.scale, this.bubbleImg2.alpha = .3, game.add.tween(this.bubbleImg2).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)) : this.alpha = .75, game.add.tween(this).to({
            y: this.y + 20
        }, 2600, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.WorldMapBubbleGiftLayer.BubbleGift.prototype = Object.create(Phaser.Group.prototype), G.WorldMapBubbleGiftLayer.BubbleGift.prototype.update = function() {
        var wy = this.state.map.y + this.y; - 400 > wy || wy > game.height + 400 ? this.visible = !1 : this.visible = !0
    }, G.WorldMapBubbleGiftLayer.BubbleGift.prototype.open = function() {
        G.gameTracking.design("BubbleGiftOpened", this.config.levelNumber), G.gameTracking.FTUEDesign("FTUE:28a_MapCollectBonus"), G.saveState.markBubbleGiftAsUsed(this.config.levelNumber), G.gift.applyGift(this.config.gift), G.sb("onBubbleGiftOpened").dispatch(this.config.levelNumber), G.sfx.pop.play(), game.time.events.add(300, G.sfx.line.play, G.sfx.line), this.bubbleImg.inputEnabled = !1;
        var str = G.gift.getLabelString(this.config.gift, 1.2);
        game.add.tween(this.bubbleImg.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0), game.add.tween(this.iconImg.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0), this.rewardLabel = this.add(new G.LabelGroupT(str, 0, 0, {
            font: "ComicSansBold",
            fontSize: "45px",
            fill: "#ffedd9",
            stroke: "#85511f",
            strokeThickness: 4
        }, .5, 300)), this.rewardLabel.scale.setTo(0), game.add.tween(this.rewardLabel.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Elastic.Out, !0, 300), game.time.events.add(1200, function() {
            game.add.tween(this).to({
                alpha: 0
            }, 400, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
                this.destroy()
            }, this)
        }, this)
    }, G.WorldMapChestDynamicLayer = function(map) {
        Phaser.Group.call(this, game), this.position = map.position, this.map = map, this.freeInstances = [], this.activeChestsData = JSON.parse(JSON.stringify(G.json.settings.mapChests)).filter(function(mapChest) {
            return !G.saveState.data.mapChests[mapChest.id]
        }), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapChestDynamicLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapChestDynamicLayer.prototype.unlockInput = function() {
        this.ignoreChildInput = !1, this.children.forEach(function(child) {
            child.ignoreChildInput = !1
        })
    }, G.WorldMapChestDynamicLayer.prototype.lockInput = function() {
        this.ignoreChildInput = !0, this.children.forEach(function(child) {
            child.ignoreChildInput = !0
        })
    }, G.WorldMapChestDynamicLayer.prototype.update = function() {
        for (var result = 0, i = 0, len = this.activeChestsData.length; len > i; i++) {
            var chestData = this.activeChestsData[i],
                wy = this.y + chestData.mapY;
            wy > -500 && wy < game.height + 500 ? (result++, chestData.instance || chestData.opened || G.saveState.data.mapChests[chestData.id] || this.placeInstance(chestData)) : chestData.instance && this.hideInstance(chestData)
        }
        for (var t = this.children.length; t--;) this.children[t].update()
    }, G.WorldMapChestDynamicLayer.prototype.placeInstance = function(chestData) {
        chestData.instance = this.getFreeInstance(), chestData.instance.init(chestData), this.add(chestData.instance)
    }, G.WorldMapChestDynamicLayer.prototype.hideInstance = function(chestData) {
        chestData.instance.hide(), chestData.instance.parent.removeChild(chestData.instance), this.freeInstances.push(chestData.instance), chestData.instance = null
    }, G.WorldMapChestDynamicLayer.prototype.getFreeInstance = function() {
        return this.freeInstances.shift() || new G.WorldMapChestDynamicLayer.ChestInstance
    }, G.WorldMapChestDynamicLayer.ChestInstance = function() {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.shadow = G.makeImage(0, 40, "chest_shadow", .5, this), this.chest = new G.Button(0, 0, "chest", this.onClick, this), this.chest.IMMEDIATE = !0, this.chestGlow = G.makeImage(0, 0, "chest", .5, this.chest), this.chestGlow.blendMode = 1, this.chestGlow.alpha = .4, game.add.tween(this.chestGlow).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.add(this.chest), game.time.events.loop(2e3, this.setJumpRepeat, this)
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype = Object.create(Phaser.Group.prototype), G.WorldMapChestDynamicLayer.ChestInstance.prototype.init = function(chestData) {
        G.changeTexture(this.chest, "chest"), G.changeTexture(this.chestGlow, "chest"), this.chestData = chestData, this.position.setTo(chestData.mapX, chestData.mapY), this.orgX = this.x, this.orgY = this.y, this.chest.inputEnabled = !0, this.chest.input.useHandCursor = !0, this.chest.scale.x = this.x < 0 ? 1 : -1, this.shadow.scale.x = this.chest.scale.x, this.alpha = 1, this.opened = !1, this.currentStars = G.saveState.getAllStars(), this.unlocked = this.currentStars >= chestData.req, this.unlocked ? (this.chestGlow.visible = !0, this.setJumpRepeat()) : (this.chestGlow.visible = !1, this.label = new G.LabelTextT(Math.min(this.currentStars, chestData.req) + "/" + this.chestData.req + "@map_star_1@", 0, 50, {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "#fdfbe4",
            stroke: "#73461c",
            strokeThickness: 5
        }, .5, 150), this.add(this.label))
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.update = function() {
        this.shadow.alpha = 1 + this.chest.y / 150
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.hide = function() {
        G.stopTweens(this.chest), this.chest.position.setTo(0, 0), this.chest.angle = 0, this.label && this.label.destroy()
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.onClick = function() {
        this.unlocked ? (G.changeTexture(this.chest, "chest_open"), G.changeTexture(this.chestGlow, "chest_open"), this.opened = !0, this.chestData.opened = !0, G.saveState.data.mapChests[this.chestData.id] = !0, G.saveState.save(), this.chest.inputEnabled = !1, G.sb("pushWindow").dispatch(["mapChest", this.chestData.gifts]), game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 1e3).onComplete.add(function() {
            this.hide()
        }, this)) : (this.chest.inputEnabled = !1, this.jump(function() {
            this.chest.inputEnabled = !0, this.chest.input.useHandCursor = !0
        }, this))
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.setJumpRepeat = function(callback, context) {
        this.opened || this.unlocked && this.parent && this.jump()
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.jump = function(callback, context) {
        var moveTweenA = game.add.tween(this.chest).to({
                y: -G.l(150)
            }, 300, Phaser.Easing.Cubic.Out),
            moveTweenB = game.add.tween(this.chest).to({
                y: 0
            }, 300, Phaser.Easing.Circular.In);
        moveTweenA.chain(moveTweenB), moveTweenA.start();
        var tweenAngleA = game.add.tween(this.chest).to({
                angle: -15
            }, 200, Phaser.Easing.Cubic.InOut),
            tweenAngleB = game.add.tween(this.chest).to({
                angle: 15
            }, 375, Phaser.Easing.Sinusoidal.In),
            tweenAngleC = game.add.tween(this.chest).to({
                angle: 0
            }, 50, Phaser.Easing.Cubic.InOut);
        tweenAngleA.chain(tweenAngleB, tweenAngleC), tweenAngleA.start(), callback && tweenAngleC.onComplete.add(callback, context)
    }, G.WorldMapChestLayer = function(map) {
        Phaser.Group.call(this, game), this.position = map.position, G.json.settings.mapChests.forEach(function(chest) {
            G.saveState.data.mapChests[chest.id] || this.add(new G.WorldMapChestLayer.Chest(chest))
        }, this), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapChestLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapChestLayer.prototype.unlockInput = function() {
        this.ignoreChildInput = !1, this.children.forEach(function(child) {
            child.ignoreChildInput = !1
        })
    }, G.WorldMapChestLayer.prototype.lockInput = function() {
        this.ignoreChildInput = !0, this.children.forEach(function(child) {
            child.ignoreChildInput = !0
        })
    }, G.WorldMapChestLayer.Chest = function(chestData) {
        Phaser.Group.call(this, game), this.onChestClicked = new Phaser.Signal, this.chestData = chestData, this.state = game.state.getCurrentState(), this.shadow = G.makeImage(0, 40, "chest_shadow", .5, this), this.x = G.l(chestData.mapX), this.y = G.l(chestData.mapY), this.orgX = this.x, this.orgY = this.y, this.opened = !1, this.currentStars = G.saveState.getAllStars();
        var currentStart = Math.min(this.currentStars, this.chestData.req);
        this.unlocked = this.currentStars >= chestData.req, this.gift = new G.Button(0, 0, "chest", this.onClick, this), this.add(this.gift), this.gift.scale.x = this.x < 0 ? -1 : 1, this.shadow.scale.x = this.gift.scale.x, this.unlocked ? (this.gift.tweenScale = {
            x: this.gift.scale.x,
            y: this.gift.scale.y
        }, this.glow = G.makeImage(10, -20, "popup_lighht", .5, this), this.glow.update = function() {
            this.angle++
        }, this.glow.scale.setTo(.75), this.glow.blendMode = 1, this.glow.alpha = 0, this.giftGlow = G.makeImage(0, 0, "chest", .5, this.gift), this.giftGlow.blendMode = 1, this.giftGlow.alpha = .4, game.add.tween(this.giftGlow).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.jump()) : (this.gift.IMMEDIATE = !0, this.label = new G.LabelGroupT(currentStart + "/" + this.chestData.req + "@star_small@", 0, 50, {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "#fdfbe4",
            stroke: "#73461c",
            strokeThickness: 5
        }, .5, 150), this.add(this.label))
    }, G.WorldMapChestLayer.Chest.prototype = Object.create(Phaser.Group.prototype), G.WorldMapChestLayer.Chest.prototype.onClick = function() {
        if (this.currentStars >= this.chestData.req) G.changeTexture(this.gift, "chest_open"), G.changeTexture(this.giftGlow, "chest_open"), this.opened = !0, G.saveState.data.mapChests[this.chestData.id] = !0, G.saveState.save(), this.gift.inputEnabled = !1, game.add.tween(this.glow).to({
            alpha: .2
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.onChestClicked.dispatch(), G.sb("pushWindow").dispatch(["mapChest", this.chestData.gifts]), game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 1e3).onComplete.add(function() {
            this.destroy()
        }, this);
        else {
            this.gift.inputEnabled = !1;
            var moveTweenA = game.add.tween(this.gift).to({
                    y: -G.l(150)
                }, 300, Phaser.Easing.Cubic.Out),
                moveTweenB = game.add.tween(this.gift).to({
                    y: 0
                }, 300, Phaser.Easing.Circular.In);
            moveTweenA.chain(moveTweenB), moveTweenA.start();
            var tweenAngleA = game.add.tween(this.gift).to({
                    angle: -15
                }, 200, Phaser.Easing.Cubic.InOut),
                tweenAngleB = game.add.tween(this.gift).to({
                    angle: 15
                }, 375, Phaser.Easing.Sinusoidal.In),
                tweenAngleC = game.add.tween(this.gift).to({
                    angle: 0
                }, 50, Phaser.Easing.Cubic.InOut);
            tweenAngleC.onComplete.add(function() {
                this.gift.inputEnabled = !0, this.gift.input.useHandCursor = !0
            }, this), tweenAngleA.chain(tweenAngleB, tweenAngleC), tweenAngleA.start()
        }
    }, G.WorldMapChestLayer.Chest.prototype.update = function() {
        this.glow && this.glow.update(), this.shadow.alpha = 1 + this.gift.y / 150;
        var scale = -1 * (1 - this.gift.y / 150 * .1);
        this.shadow.scale.x = scale * this.gift.scale.x * -1, this.shadow.scale.y = Math.abs(scale);
        var wy = this.state.map.y + this.y; - 1e3 > wy || wy > game.height + 1e3 ? this.visible = !1 : this.visible = !0
    }, G.WorldMapChestLayer.Chest.prototype.jump = function() {
        if (!this.opened) {
            var moveTweenA = game.add.tween(this.gift).to({
                    y: -G.l(150)
                }, 300, Phaser.Easing.Cubic.Out),
                moveTweenB = game.add.tween(this.gift).to({
                    y: 0
                }, 300, Phaser.Easing.Circular.In);
            moveTweenA.chain(moveTweenB), moveTweenA.start();
            var tweenAngleA = game.add.tween(this.gift).to({
                    angle: -15
                }, 200, Phaser.Easing.Cubic.InOut),
                tweenAngleB = game.add.tween(this.gift).to({
                    angle: 15
                }, 375, Phaser.Easing.Sinusoidal.In),
                tweenAngleC = game.add.tween(this.gift).to({
                    angle: 0
                }, 50, Phaser.Easing.Cubic.InOut);
            tweenAngleA.chain(tweenAngleB, tweenAngleC), tweenAngleA.start(), game.time.events.add(2e3, this.jump, this)
        }
    }, G.WorldMapCloudDynamicLayer = function(map) {
        Phaser.Group.call(this, game), this.position = map.position, this.map = map, this.freeInstances = [], this.activeGatesData = JSON.parse(JSON.stringify(G.json.settings.gates)).filter(function(gate) {
            return G.saveState.checkGate(gate), G.json.levels[gate.lvlNr - 1] ? (gate.savedGateData = G.saveState.getGateData(gate.id), !gate.savedGateData.open) : void 0
        })
    }, G.WorldMapCloudDynamicLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCloudDynamicLayer.prototype.update = function() {
        for (var t = this.children.length; t--;) this.children[t].update();
        for (var i = 0, len = this.activeGatesData.length; len > i; i++) {
            var gateData = this.activeGatesData[i],
                wy = this.y + G.json.levels[gateData.lvlNr - 1].mapY;
            wy > -500 && wy < game.height + 500 ? gateData.instance || gateData.savedGateData.open || this.placeInstance(gateData) : gateData.instance && this.hideInstance(gateData)
        }
    }, G.WorldMapCloudDynamicLayer.prototype.placeInstance = function(gateData) {
        gateData.instance = this.getFreeInstance(), gateData.instance.init(gateData), this.add(gateData.instance)
    }, G.WorldMapCloudDynamicLayer.prototype.hideInstance = function(gateData) {
        gateData.instance.hide(), gateData.instance.parent.removeChild(gateData.instance), this.freeInstances.push(gateData.instance), gateData.instance = null
    }, G.WorldMapCloudDynamicLayer.prototype.getFreeInstance = function() {
        return this.freeInstances.shift() || new G.WorldMapCloudDynamicLayer.CloudInstance
    }, G.WorldMapCloudDynamicLayer.CloudInstance = function() {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.cloud1 = G.makeImage(-450, 0, "cloud_1", .5, this), this.cloud1.scale.setTo(2), this.c1tween = game.add.tween(this.cloud1.scale).to({
            x: 2.1,
            y: 2.1
        }, 4e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.c1tween.timeline[0].dt = 2e3, this.cloud1.alpha = .95, this.cloud2 = G.makeImage(0, 50, "cloud_1", .5, this), this.cloud2.scale.setTo(2), this.c2tween = game.add.tween(this.cloud2.scale).to({
            x: 2.1,
            y: 2.1
        }, 8e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.c2tween.timeline[0].dt = 3e3, this.cloud2.alpha = .95, this.cloud3 = G.makeImage(450, 0, "cloud_1", .5, this), this.cloud3.scale.setTo(-2, 2), this.c3tween = game.add.tween(this.cloud3.scale).to({
            x: -2.1,
            y: 2.1
        }, 6e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.c3tween.timeline[0].dt = 1500, this.cloud3.alpha = .95
    }, G.WorldMapCloudDynamicLayer.CloudInstance.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCloudDynamicLayer.CloudInstance.prototype.init = function(gateData) {
        this.savedGateData = gateData.savedGateData, this.y = G.json.levels[gateData.lvlNr - 1].mapY - 370, this.fading = !1, this.cloud1.x = -450, this.cloud1.y = 50, this.cloud2.x = 0, this.cloud2.y = 50, this.cloud2.alpha = .95, this.cloud3.x = 450, this.alpha = 1
    }, G.WorldMapCloudDynamicLayer.CloudInstance.prototype.hide = function() {
        this.fadingTweens && (this.fadingTweens.forEach(function(t) {
            t.stop()
        }), this.fadingTweens = null)
    }, G.WorldMapCloudDynamicLayer.CloudInstance.prototype.fadeAway = function() {
        if (!this.fading) {
            this.fading = !0;
            var t1 = game.add.tween(this.cloud1).to({
                    x: -900,
                    y: 50
                }, 3e3, Phaser.Easing.Sinusoidal.Out, !0),
                t2 = game.add.tween(this.cloud3).to({
                    x: 900,
                    y: 50
                }, 3e3, Phaser.Easing.Sinusoidal.Out, !0),
                t3 = game.add.tween(this.cloud2).to({
                    alpha: 0
                }, 3e3, Phaser.Easing.Sinusoidal.Out, !0),
                t4 = game.add.tween(this).to({
                    alpha: 0
                }, 2e3, Phaser.Easing.Sinusoidal.In, !0, 1e3);
            this.fadingTweens = [t1, t2, t3, t4]
        }
    }, G.WorldMapCloudDynamicLayer.CloudInstance.prototype.update = function() {
        !this.fading && this.savedGateData.open && this.fadeAway()
    }, G.WorldMapCloudLayer = function(map) {
        Phaser.Group.call(this, game), this.position = map.position, this.init(), this.minGateY = null
    }, G.WorldMapCloudLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCloudLayer.prototype.init = function() {
        G.json.settings.gates.forEach(function(gate) {
            if (G.saveState.checkGate(gate), G.json.levels[gate.lvlNr - 1]) {
                var savedGateData = G.saveState.getGateData(gate.id);
                savedGateData.open || this.add(new G.WorldMapCloudLayer.CloudWall(gate.lvlNr - 1, savedGateData))
            }
        }, this)
    }, G.WorldMapCloudLayer.CloudWall = function(lvlIndex, savedGateData) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.savedGateData = savedGateData, this.y = G.json.levels[lvlIndex].mapY - 370, this.cloud1 = G.makeImage(-450, 0, "cloud_1", .5, this), this.cloud1.scale.setTo(2);
        var c1tween = game.add.tween(this.cloud1.scale).to({
            x: 2.1,
            y: 2.1
        }, 4e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0);
        c1tween.timeline[0].dt = 2e3, this.cloud1.alpha = .95, this.cloud2 = G.makeImage(0, 50, "cloud_1", .5, this), this.cloud2.scale.setTo(2);
        var c2tween = game.add.tween(this.cloud2.scale).to({
            x: 2.1,
            y: 2.1
        }, 8e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0);
        c2tween.timeline[0].dt = 3e3, this.cloud2.alpha = .95, this.cloud3 = G.makeImage(450, 0, "cloud_1", .5, this), this.cloud3.scale.setTo(-2, 2);
        var c3tween = game.add.tween(this.cloud3.scale).to({
            x: -2.1,
            y: 2.1
        }, 6e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0);
        c3tween.timeline[0].dt = 1500, this.cloud3.alpha = .95, this.fading = !1
    }, G.WorldMapCloudLayer.CloudWall.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCloudLayer.prototype.update = function() {
        for (var i = 0; i < this.length; i++) this.children.visible = 0 == i, this.children[i].update()
    }, G.WorldMapCloudLayer.CloudWall.prototype.fadeAway = function() {
        this.fading || (this.fading = !0, game.add.tween(this.cloud1).to({
            x: -900,
            y: 50
        }, 3e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.cloud3).to({
            x: 900,
            y: 50
        }, 3e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.cloud2).to({
            alpha: 0
        }, 3e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 2e3, Phaser.Easing.Sinusoidal.In, !0, 1e3).onComplete.add(function() {
            this.destroy()
        }, this))
    }, G.WorldMapCloudLayer.CloudWall.prototype.update = function() {
        !this.fading && this.savedGateData.open && this.fadeAway(), this.visible = this.state.map.y + this.y > -1e3
    }, G.WorldMapGateLayer = function(map) {
        Phaser.Group.call(this, game), this.position = map.position, this.init(), this.minGateY = null, G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapGateLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapGateLayer.prototype.getMinY = function() {
        if (0 == this.children.length) return 1 / 0;
        for (var min = -(1 / 0), i = 0; i < this.length; i++) this.children[i].y > min && (min = this.children[i].y);
        return -1 * min
    }, G.WorldMapGateLayer.prototype.unlockInput = function() {
        this.ignoreChildInput = !1, this.children.forEach(function(child) {
            child.ignoreChildInput = !1
        })
    }, G.WorldMapGateLayer.prototype.lockInput = function() {
        this.ignoreChildInput = !0, this.children.forEach(function(child) {
            child.ignoreChildInput = !0
        })
    }, G.WorldMapGateLayer.prototype.init = function() {
        G.json.settings.gates.forEach(function(gate) {
            if (G.saveState.checkGate(gate), G.json.levels[gate.lvlNr - 1]) {
                var savedGateData = G.saveState.getGateData(gate.id);
                savedGateData.open || this.add(new G.WorldMapGateLayer.Gate(gate))
            }
        }, this)
    }, G.WorldMapGateLayer.Gate = function(gateData) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.gate = gateData, this.lvlIndex = this.gate.lvlNr - 1, this.savedData = G.saveState.getGateData(gateData.id);
        var level = G.json.levels[this.lvlIndex];
        this.x = G.l(level.mapX), this.y = G.l(level.mapY), this.gateImg = G.makeImage(0, 20, "gate", [.5, 1], this), this.active = this.lvlIndex <= G.saveState.getLastPassedLevelNr(), this.active && (G.saveState.activateGate(gateData), this.unlockBtn = new G.Button(10, 30, "btn_chest_gate", function() {
            this.savedData.readyToOpen ? G.saveState.openGate(this.gate.id) : G.sb("pushWindow").dispatch(["gate", this.gate])
        }, this), this.unlockBtn.addTextLabel("font-beige-standard", G.txt("Unlock"), 40), this.unlockBtn.label.y = -2, this.add(this.unlockBtn), this.savedData.readyToOpen ? (this.unlockBtn.x = 0, this.unlockBtn.pulse()) : this.lockImg = G.makeImage(-73, 28, "lock", .5, this)), this.bursedParts = !1
    }, G.WorldMapGateLayer.Gate.prototype = Object.create(Phaser.Group.prototype), G.WorldMapGateLayer.Gate.prototype.update = function() {
        if (this.visible = this.state.map.y + this.y > -1e3, this.savedData.open) {
            if (!this.bursedParts) {
                this.bursedParts = !0;
                for (var i = 0; 10 > i; i++) G.sb("fxMap").dispatch("star", {
                    x: this.worldPosition.x,
                    y: this.worldPosition.y
                })
            }
            this.alpha -= .05, this.alpha <= 0 && this.destroy()
        }
    }, G.WorldMapPack = function(x, y) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y);
        var activePack = G.json.settings.packs.find(function(pack) {
            return G.saveState.isPackActive(pack)
        });
        activePack && (this.initPack(activePack), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this), G.sb("onStarterPackBought").add(function() {
            game.add.tween(this).to({
                y: 140
            }, 400, Phaser.Easing.Sinusoidal.Out, !0)
        }, this), G.saveState.data.sawPackTut || (this.tutHand = G.makeImage(0, 20, "tut_hand", 0, this), game.add.tween(this.tutHand).to({
            x: G.l(20),
            y: G.l(50)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)), G.sb("onScreenResize").add(this.onResize, this), this.onResize())
    }, G.WorldMapPack.prototype = Object.create(Phaser.Group.prototype), G.WorldMapPack.prototype.onResize = function() {
        G.horizontal ? this.x = -200 : this.x = 60
    }, G.WorldMapPack.prototype.initPack = function(activePack) {
        this.activePack = activePack, this.currentStage = G.saveState.getPackStage(activePack), this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.update = function() {
            this.angle++
        }, this.glow.scale.setTo(.5), this.glow.alpha = .25, this.glow.blendMode = 1, this.giftBtn = new G.Button(-7, 0, "promo_pack", function() {
            G.saveState.data.sawPackTut = !0, G.saveState.save(), G.sb("pushWindow").dispatch(["pack", this.activePack]), this.tutHand && this.tutHand.destroy()
        }, this), this.add(this.giftBtn);
        var saveData = G.saveState.getPackSaveData(this.activePack.id),
            secLeft = 60 * this.activePack.timeMinutes - (Date.now() - saveData.activationTime) / 1e3,
            lblSprite = "lbl_50%";
        this.currentStage.promo && (60 == this.currentStage.promo && (lblSprite = "lbl_60%"), 70 == this.currentStage.promo && (lblSprite = "lbl_70%")), this.lblPromo = G.makeImage(-35, 30, lblSprite, .5, this.giftBtn), this.timer = new G.Timer(0, 60, "font-num-orange", 30, 150, .5, .5, secLeft), this.add(this.timer), this.timer.start(), this.update = function() {
            this.glow.angle++, G.saveState.isPackActive(this.activePack) || (this.alpha -= .05, this.alpha <= 0 && this.destroy())
        }
    }, G.WorldMapPack.prototype.unlockInput = function() {
        this.ignoreChildInput = !1
    }, G.WorldMapPack.prototype.lockInput = function() {
        this.ignoreChildInput = !0
    }, G.WorldMapPlayerAvatar = function(worldMap) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.onAnimFinished = new Phaser.Signal, sgSettings.config.user && sgSettings.config.user.avatar ? this.avatar = G.makeExtImage(0, 0, sgSettings.config.user.avatar, "avatar_m", 0, this, !1, function() {
            this.width = this.height = 80
        }) : this.avatar = G.makeImage(0, 0, "avatar_m", 0, this), this.avatar.anchor.setTo(.5), this.avatar.width = this.avatar.height = 80, this.pivotTween = game.add.tween(this.pivot).to({
            x: 10
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.add(this.avatar), this.frame = G.makeImage(0, 0, "avatar_frame_big", [.5, .52], this), this.frame.position = this.avatar.position, this.worldMap = worldMap, this.position = worldMap.position, this.state.lastLevelData ? this.animPosToLevel(this.state.lastLevelData.lvlNr, G.saveState.getLastPassedLevelNr()) : this.setPosToLevel(G.saveState.getLastPassedLevelNr())
    }, G.WorldMapPlayerAvatar.prototype = Object.create(Phaser.Group.prototype), G.WorldMapPlayerAvatar.prototype.setPosToLevel = function(lvlIndex) {
        lvlIndex = game.math.clamp(lvlIndex, 0, G.json.levels.length - 1);
        var lvl = G.json.levels[lvlIndex];
        this.avatar.x = lvl.mapX - 90, this.avatar.y = lvl.mapY - 10, this.onAnimFinished.dispatch()
    }, G.WorldMapPlayerAvatar.prototype.animPosToLevel = function(prevLvlIndex, lvlIndex) {
        prevLvlIndex = game.math.clamp(prevLvlIndex, 0, G.json.levels.length - 1), lvlIndex = game.math.clamp(lvlIndex, 0, G.json.levels.length - 1);
        var prevLvl = G.json.levels[prevLvlIndex],
            lvl = G.json.levels[lvlIndex];
        this.avatar.x = prevLvl.mapX - 90, this.avatar.y = prevLvl.mapY - 10, game.add.tween(this.avatar).to({
            x: lvl.mapX - 90,
            y: lvl.mapY - 10
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function() {
            this.onAnimFinished.dispatch()
        }, this)
    }, G.WorldMapSides = function(worldMap) {
        Phaser.Group.call(this, game), this.worldMap = worldMap, this.leftSide = game.make.tileSprite(-550, 0, 556, game.height, "map_margin"), this.leftSide.anchor.setTo(1, 0), this.add(this.leftSide), this.rightSide = game.make.tileSprite(550, 0, 556, game.height, "map_margin"),
            this.rightSide.anchor.setTo(1, 0), this.rightSide.scale.x = -1, this.add(this.rightSide), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.WorldMapSides.prototype = Object.create(Phaser.Group.prototype), G.WorldMapSides.prototype.postUpdate = function() {
        this.visible = game.width > 1100, this.x = this.worldMap.x, this.leftSide.tilePosition.y = this.worldMap.y, this.rightSide.tilePosition.y = this.worldMap.y
    }, G.WorldMapSides.prototype.onResize = function() {
        this.leftSide.height = game.height, this.rightSide.height = game.height
    }, G.WorldMapSocialLayer = function(worldMap) {
        Phaser.Group.call(this, game), this.position = worldMap.position
    }, G.WorldMapSocialLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapSocialLayer.prototype.initLabels = function(userList) {
        if (userList)
            for (var usedLvls = [], i = 0; i < userList.length; i++) {
                var user = userList[i];
                if (void 0 !== user.maxLevel && 3 !== usedLvls[user.maxLevel]) {
                    void 0 === usedLvls[user.maxLevel] && (usedLvls[user.maxLevel] = 0);
                    var extraOffset = 30 * usedLvls[user.maxLevel];
                    usedLvls[user.maxLevel]++;
                    var lvlData = G.json.levels[user.maxLevel - 1];
                    this.add(new G.WorldMapSocialLayer.MapLabel(lvlData.mapX, lvlData.mapY, user.avatar, extraOffset))
                }
            }
    }, G.WorldMapSocialLayer.MapLabel = function(x, y, imgUrl, extraOffset) {
        var placeSign = 0 > x ? 1 : -1;
        placeSign = 1, extraOffset = extraOffset || 0, Phaser.Image.call(this, game, G.l(x) + G.l((50 + extraOffset) * placeSign), G.l(y - 20)), this.anchor.setTo(.5, .5), this.orgX = G.l(x) + G.l((70 + extraOffset) * placeSign), this.tweenOffsetX = 0, this.scale.setTo(0);
        var that = this;
        this.avatar = G.makeExtImage(0, 0, imgUrl, null, .5, this, !1, function() {
            this.width = 50, this.height = 50, game.add.tween(that.scale).to({
                x: 1,
                y: 1
            }, 500, Phaser.Easing.Elastic.Out, !0)
        }), this.border = G.makeImage(0, 0, "avatar_frame", .5, this)
    }, G.WorldMapSocialLayer.MapLabel.prototype = Object.create(Phaser.Image.prototype), G.WorldMapSocialLayer.MapLabel.prototype.update = function() {
        this.x = this.orgX + this.tweenOffsetX * this.scale.x
    }, G.WorldMapStarterPack = function(x, y) {
        this.state = game.state.getCurrentState(), G.saveState.data.sawPackTut || this.state.makeBlackOverlay(), Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this), G.sb("onStarterPackBought").add(function() {
            this.giftBtn.inputEnabled = !1
        }, this), this.initPack(G.json.settings.starterPack), G.saveState.data.sawPackTut || (G.saveState.data.sawPackTut = !0, G.saveState.save(), this.tutHand = G.makeImage(0, 20, "tut_hand", 0, this), game.add.tween(this.tutHand).to({
            x: G.l(20),
            y: G.l(50)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.WorldMapStarterPack.prototype = Object.create(Phaser.Group.prototype), G.WorldMapStarterPack.prototype.onResize = function() {
        G.horizontal ? this.x = -200 : this.x = 60
    }, G.WorldMapStarterPack.prototype.initPack = function(activePack) {
        this.activePack = activePack, this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.update = function() {
            this.angle++
        }, this.glow.scale.setTo(.5), this.glow.alpha = .25, this.glow.blendMode = 1, this.giftBtn = new G.Button(0, 0, "chest_sale", function() {
            G.sb("pushWindow").dispatch(["starterPack", this.activePack]), this.tutHand && this.tutHand.destroy()
        }, this), this.add(this.giftBtn);
        var saveData = G.saveState.getPackSaveData(this.activePack.id);
        60 * this.activePack.timeMinutes - (Date.now() - saveData.activationTime) / 1e3;
        this.update = function() {
            this.glow.angle++, G.saveState.data.starterPackBought && (this.alpha -= .05, this.alpha <= 0 && this.destroy())
        }
    }, G.WorldMapStarterPack.prototype.unlockInput = function() {
        this.ignoreChildInput = !1
    }, G.WorldMapStarterPack.prototype.lockInput = function() {
        this.ignoreChildInput = !0
    }, G.LevelBg = function(lvl_gfx) {
        Phaser.Image.call(this, game, 0, 0), this.anchor.setTo(.5), G.changeTexture(this, "background_1"), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), game.add.existing(this)
    }, G.LevelBg.prototype = Object.create(Phaser.Image.prototype), G.LevelBg.prototype.onScreenResize = function() {
        this.x = game.world.bounds.x + .5 * game.width, this.y = game.world.bounds.y + .5 * game.height, this.scale.setTo(1), this.width = Math.max(this.width, game.width), this.height = Math.max(this.height, game.height), this.width += 10, this.height += 10, this.updateCache()
    }, "undefined" == typeof G && (G = {}), G.Logo = function(x, y) {
        Phaser.Group.call(this, game), this.shine = G.makeImage(0, 0, "shine_title", [.5, .5], this), this.shine.scale.setTo(2), this.shine.update = function() {
            this.angle += .17
        }, this.wheel = G.makeImage(0, 0, "whell_1", .5, this), this.wheel.update = function() {
            this.angle += .22
        }, this.wheel2 = G.makeImage(0, 0, "whell_2", .5, this), this.wheel2.update = function() {
            this.angle += .12
        }, this.x = G.l(x), this.y = G.l(y), this.logo = G.makeImage(0, 0, "ja" === G.lang ? "logo-ja" : "logo", .5, this), game.add.tween(this.logo.scale).to({
            x: 1.05,
            y: 1.05
        }, 3e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.Logo.prototype = Object.create(Phaser.Group.prototype), G.Logo.prototype.startGlow = function() {
        game.add.tween(this.logoGlow).to({
            alpha: .5
        }, 1e3 + 1e3 * Math.random(), Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0).onComplete.add(function() {
            game.time.events.add(1500 + Math.floor(1500 * Math.random()), this.startGlow, this)
        }, this)
    }, G.Logo.prototype.startPartGlow = function() {
        this.glows[this.currentGlow++ % this.glows.length].start(), game.time.events.add(2e3 + Math.floor(1e3 * Math.random()), this.startPartGlow, this)
    }, G.MoreGamesBtn = function(x, y) {
        G.Button.call(this, x, y, "btn_moregames", function() {}), this.visible = !1, game.add.existing(this)
    }, G.MoreGamesBtn.prototype = Object.create(G.Button.prototype), G.Modify = function() {
        return this === G ? new G.Modify : (Phaser.Group.call(this, game), G.Modify.instance = this, this.onLevelObjChange = new Phaser.Signal, this.onCurrentObjChange = new Phaser.Signal, this.onObjDestroy = new Phaser.Signal, this.inputBlocker = new G.ModifyInputBlocked, this.add(this.inputBlocker), game.stage.disableVisibilityChange = !0, game.paused = !1, obj = game.state.getCurrentState(), obj === game.state.getCurrentState() && (game.state.getCurrentState().children = game.world.children), this.objectName = "WORLD", this.currentLevel = [], this.currentChildIndex = 0, this.currentPropIndex = 0, this.mods = [], this.gfx = game.add.graphics(), this.gfx.fixedToCamera = !0, this.add(this.gfx), this.obj = obj, this.propGroup = this.add(new G.ModifyPropGroup(this)), this.childrenPropNames = this.getChildrenPropNames(), this.buttonGroup = new G.ModifyButtonGroup, this.add(this.buttonGroup), this.childList = new G.ModifyChildList, this.add(this.childList), this.addKeyboardControlls(), this.bottomBar = this.add(new G.ModifyBottomBar), this.frameSelector = this.add(new G.ModifyFrameSelector), this.frameSelector.onFrameClicked.add(this.changeFrame, this), this.animationEditor = new G.ModifyAnimationEditor(this), this.add(this.animationEditor), this.removeCash = {}, this.codeGenerator = new G.ModifyCodeGenerator(this), this.defaultNewObjectsNames = !0, this.hideGroupTxt = !1, game.state.states.MODIFYEMPTYSTATE || game.state.add("MODIFYEMPTYSTATE", {
            create: function() {
                new G.Modify
            }
        }), this.domLayer = new G.ModifyDOMLayer(this), void game.input.onDown.add(this.processClick, this))
    }, G.Modify.prototype = Object.create(Phaser.Group.prototype), G.Modify.prototype.removeCashObjToString = function(levelObjTxt) {
        if (!this.removeCash[levelObjTxt]) return "";
        for (var str = "	REMOVED:", i = 0; i < this.removeCash[levelObjTxt].length; i++) str += "		" + this.removeCash[levelObjTxt][i] + "\n";
        return str
    }, G.Modify.prototype.removeObject = function() {
        console.log("removeObject");
        var obj = this.getCurrentObject();
        if (console.log(obj), obj) {
            var lvlObjName = this.currentLevel.join("/") || this.currentLevel[0] || game.state.current,
                objName = this.childrenPropNames[this.currentChildIndex].toString();
            !obj.___NEWOBJECT, this.removeCash[lvlObjName] || (this.removeCash[lvlObjName] = []), this.removeCash[lvlObjName].push(objName), obj.destroy(), this.refreshLevel()
        }
    }, G.Modify.prototype.refreshLevel = function() {
        this.currentLevel = this.currentLevel, this.childrenPropNames = this.getChildrenPropNames(), this.onLevelObjChange.dispatch()
    }, G.Modify.prototype.addToGroup = function(parent, obj) {
        (parent == game.world || parent == game.state.getCurrentState()) && (parent = game.world, obj.x = game.camera.x + .5 * game.width, obj.y = game.camera.y + .5 * game.height), parent.add ? parent.add(obj) : parent.addChild && parent.addChild(obj);
        var name, lvlObj = this.getCurrentLevelObject();
        name = this.defaultNewObjectsNames ? "child_" + lvlObj.children.length : prompt("Enter object name"), name && (obj.___LABEL = name, parent == game.world ? game.state.getCurrentState()[name] = obj : parent[name] = obj)
    }, G.Modify.prototype.addGroup = function() {
        var obj = this.getCurrentLevelObject(),
            group = game.make.group();
        group.___NEWOBJECT = !0, this.addToGroup(obj, group), this.refreshLevel()
    }, G.Modify.prototype.addImage = function() {
        var obj = this.getCurrentLevelObject(),
            image = new G.Image(0, 0, "__missing", .5, null);
        return image.___NEWOBJECT = !0, this.addToGroup(obj, image), this.refreshLevel(), image
    }, G.Modify.prototype.addButton = function() {
        var obj = this.getCurrentLevelObject(),
            image = new G.Button(0, 0, "__missing", function() {}, this);
        image.___NEWOBJECT = !0, this.addToGroup(obj, image), this.refreshLevel()
    }, G.Modify.prototype.addOneLineText = function() {
        var obj = this.getCurrentLevelObject(),
            fonts = Object.keys(game.cache._cache.bitmapFont),
            txt = new G.OneLineText(0, 0, fonts[0], "TEXT", 50, 300, .5, .5);
        txt.cacheAsBitmap = !1, this.addToGroup(obj, txt), this.refreshLevel()
    }, G.Modify.prototype.addMultiLineText = function() {
        var obj = this.getCurrentLevelObject(),
            fonts = Object.keys(game.cache._cache.bitmapFont),
            txt = new G.MultiLineText(0, 0, fonts[0], "TEXT", 50, 300, 300, "center", .5, .5);
        txt.cacheAsBitmap = !1, this.addToGroup(obj, txt), this.refreshLevel()
    }, G.Modify.prototype.update = function() {
        this.updateKeyboard(), this.redrawGfx(), this.propGroup.update(), this.hideGroupTxt ? (this.childList.hideList(), this.propGroup.cameraOffset.y = this.childList.cameraOffset.y + 50) : (this.childList.showList(), this.propGroup.cameraOffset.y = this.childList.cameraOffset.y + this.childList.height + 30), this.frameSelector.update(), this.bottomBar.x = game.world.bounds.x, this.bottomBar.y = game.world.bounds.y + game.height - this.bottomBar.height;
        for (var i = 0; i < this.children.length; i++) this.children[i].update()
    }, G.Modify.prototype.getChildrenPropNames = function() {
        game.world.bringToTop(this);
        var result = [],
            obj = this.getCurrentLevelObject(),
            nameObj = obj;
        obj === game.world && (nameObj = game.state.getCurrentState());
        for (var i = 0; i < obj.children.length; i++) {
            var found = !1,
                child = obj.children[i];
            if (child !== this)
                if (child.___LABEL) result.push([child.___LABEL]);
                else {
                    for (var prop in nameObj)
                        if ("children" != prop && "cursor" != prop && (found || child !== nameObj[prop] || (found = !0, child.___LABEL = prop, result.push([prop])), Array.isArray(nameObj[prop]) && "children" !== prop))
                            for (var j = 0; j < nameObj[prop].length; j++) found || child !== nameObj[prop][j] || (found = !0, result.push([prop, j]));
                    found || result.push(["children", i])
                }
            else result.push(["G.MODIFY-EDITOR"])
        }
        return result
    }, G.Modify.prototype.getCurrentObject = function() {
        return this.getCurrentLevelObject().children[this.currentChildIndex]
    }, G.Modify.prototype.changeFrame = function(newFrame) {
        console.log(newFrame);
        var obj = this.getCurrentObject();
        this.saveInitPropValue("frameName", newFrame), obj.loadTexture && G.changeTexture(obj, newFrame)
    }, G.Modify.prototype.getCurrentLevelObject = function() {
        for (var obj = this.obj, i = 0; i < this.currentLevel.length; i++) obj = obj[this.currentLevel[i]];
        return obj
    }, G.Modify.prototype.redrawGfx = function() {
        this.gfx.clear();
        var obj = this.getCurrentLevelObject();
        if (obj !== game.state.getCurrentState()) {
            var bounds = obj.getLocalBounds();
            this.gfx.lineStyle(3, 16711680, .2), this.gfx.drawRect(obj.worldPosition.x + bounds.x, obj.worldPosition.y + bounds.y, bounds.width, bounds.height), this.gfx.beginFill(0, .5), this.gfx.drawRect(obj.worldPosition.x - 10, obj.worldPosition.y - 10, 20, 20)
        }
        this.gfx.beginFill(0, 0), this.childrenPropNames.forEach(function(key, index) {
            var activeObj = index == this.currentChildIndex;
            this.gfx.lineStyle(activeObj ? 3 : 1, 255, activeObj ? 1 : .2);
            var obj = this.getCurrentLevelObject().children[index];
            if (obj) {
                var bounds = obj.getBounds(),
                    localBounds = obj.getLocalBounds();
                this.gfx.drawRect(obj.worldPosition.x + localBounds.x * obj.scale.x, obj.worldPosition.y + localBounds.y * obj.scale.y, bounds.width * obj.scale.x, bounds.height * obj.scale.y), activeObj && obj.maxUserWidth && !obj.maxUserHeight ? (this.gfx.lineStyle(2, 65280, .5), this.gfx.drawRect(obj.worldPosition.x - obj.anchor.x * obj.maxUserWidth, obj.worldPosition.y - obj.anchor.y * obj.height, obj.maxUserWidth, obj.height)) : activeObj && obj.maxUserWidth && obj.maxUserHeight && (this.gfx.lineStyle(2, 65280, .5), this.gfx.drawRect(obj.worldPosition.x - obj.anchor.x * obj.maxUserWidth, obj.worldPosition.y - obj.anchor.y * obj.maxUserHeight, obj.maxUserWidth, obj.maxUserHeight))
            }
        }, this);
        var currentObj = this.getCurrentObject()
    }, G.Modify.prototype.addKeyboardControlls = function() {
        this.keys = game.input.keyboard.addKeys({
            Q: Phaser.Keyboard.Q,
            A: Phaser.Keyboard.A,
            E: Phaser.Keyboard.E,
            UP: Phaser.Keyboard.UP,
            ONE: Phaser.Keyboard.ONE,
            TWO: Phaser.Keyboard.TWO,
            DOWN: Phaser.Keyboard.DOWN,
            RIGHT: Phaser.Keyboard.RIGHT,
            LEFT: Phaser.Keyboard.LEFT,
            ALT: Phaser.Keyboard.ALT,
            Z: Phaser.Keyboard.Z,
            X: Phaser.Keyboard.X,
            C: Phaser.Keyboard.C,
            U: Phaser.Keyboard.U,
            PLUS: 107,
            MINUS: 109,
            ESC: Phaser.Keyboard.ESC,
            NUM8: 104,
            NUM5: 101,
            NUM4: 100,
            NUM6: 102,
            NUM2: 98,
            NUM7: 103,
            NUM9: 105,
            NUMSTAR: 106,
            SPACE: Phaser.Keyboard.SPACEBAR,
            V: Phaser.Keyboard.V,
            L: Phaser.Keyboard.L,
            I: Phaser.Keyboard.I,
            P: Phaser.Keyboard.P,
            O: Phaser.Keyboard.O,
            M: Phaser.Keyboard.M,
            DEL: Phaser.Keyboard.DELETE,
            sqBracketOpen: 219,
            sqBracketClose: 221,
            SHIFT: Phaser.Keyboard.SHIFT
        }), this.keys.sqBracketOpen.onDown.add(function() {
            this.keys.SHIFT.isDown ? this.objToBottom() : this.objMoveDown()
        }, this), this.keys.sqBracketClose.onDown.add(function() {
            this.keys.SHIFT.isDown ? this.objToTop() : this.objMoveUp()
        }, this), this.keys.frameCounter = 0, this.keys.L.onDown.add(function() {
            var lvlObj = this.getCurrentLevelObject(),
                obj = this.getCurrentObject();
            this.domLayer.openInputDiv((obj.___LABEL || "obj") + " | label", obj.___LABEL || "", function(value) {
                void 0 === lvlObj[value] && (obj.___LABEL && delete lvlObj[obj.___LABEL], lvlObj[value] = obj, obj.___LABEL = value, this.refreshLevel())
            }, this, "string")
        }, this), this.keys.Q.onDown.add(function() {
            this.changeCurrentChildrenIndex(this.currentChildIndex + 1)
        }, this), this.keys.A.onDown.add(function() {
            console.log("children -1"), this.changeCurrentChildrenIndex(this.currentChildIndex - 1)
        }, this), this.keys.E.onDown.add(function() {
            this.exportChanges()
        }, this), this.keys.NUM5.onDown.add(function() {
            var obj = this.getCurrentObject();
            obj && (obj.scale.setTo(1), obj.angle = 0, obj.alpha = 1, obj.visible = !0, obj.anchor.setTo(.5))
        }, this), this.keys.TWO.onDown.add(function() {
            var obj = this.getCurrentObject();
            obj.children.length > 0 && (this.currentLevel = this.currentLevel.concat(this.childrenPropNames[this.currentChildIndex]), this.childrenPropNames = this.getChildrenPropNames(), this.currentChildIndex = 0, this.makeTexts())
        }, this), this.keys.ONE.onDown.add(function() {
            0 != this.currentLevel.length && (this.currentLevel = "number" == typeof this.currentLevel[this.currentLevel.length - 1] ? this.currentLevel.splice(0, this.currentLevel.length - 2) : this.currentLevel.splice(0, this.currentLevel.length - 1), this.childrenPropNames = this.getChildrenPropNames(), this.currentChildIndex = 0, this.makeTexts())
        }, this), this.keys.ESC.onDown.add(this.turnOff, this), this.keys.V.onDown.add(function() {
            this.alpha = 1 == this.alpha ? .1 : 1
        }, this), this.keys.O.onDown.add(function() {
            var obj = this.getCurrentObject();
            obj instanceof Phaser.Group && (obj.___CONSTRUCTOR = !0)
        }, this), this.keys.P.onDown.add(function() {
            var obj = this.getCurrentObject();
            this.codeGenerator.start(obj)
        }, this), this.keys.C.onDown.add(function() {
            var pointer = game.input.activePointer,
                newObj = this.addImage();
            this.setNewCurrentChildren(newObj), this.moveCurrentObjectToWorldPos(pointer.x, pointer.y)
        }, this), this.keys.I.onDown.add(function() {
            void 0 === this.pressCounterI && (this.pressCounterI = 0), this.pressCounterI++, 3 == this.pressCounterI && game.state.start("MODIFYEMPTYSTATE"), game.time.events.add(1e3, function() {
                this.pressCounterI = 0
            }, this)
        }, this), this.keys.DEL.onDown.add(this.removeObject, this), this.keys.NUMSTAR.onDown.add(function() {
            console.log("numstar"), this.frameSelector.opened ? this.frameSelector.close() : this.frameSelector.open()
        }, this), this.keys.U.onDown.add(function() {
            this.hideGroupTxt = !this.hideGroupTxt
        }, this)
    }, G.Modify.prototype.turnOff = function() {
        if (void 0 === this.escPressed && (this.escPressed = 0), this.escPressed++, game.time.events.add(2e3, function() {
                this.escPressed = 0
            }, this), !(this.escPressed < 5)) {
            for (key in this.keys) this.keys[key].onDown && this.keys[key].onDown.removeAll();
            this.gfx.destroy(), this.levelTxt.destroy(), this.propGroup.destroy(), this.groupTxt.destroy(), this.destroy()
        }
    }, G.Modify.prototype.modifyCurrentObjProp = function(prop, value) {
        var obj = this.getCurrentObject();
        this.saveInitPropValue(prop, value), G.Utils.setObjProp(obj, prop, value)
    }, G.Modify.prototype.saveInitPropValue = function(prop, newVal) {
        var obj = this.getCurrentObject();
        Array.isArray(prop) && (prop = prop.join("."));
        var val = G.Utils.getObjProp(obj, prop);
        val !== newVal && (obj.___initState || (obj.___initState = {}), "undefined" == typeof obj.___initState[prop] && (obj.___initState[prop] = G.Utils.getObjProp(obj, prop)))
    }, G.Modify.prototype.updateKeyboard = function() {
        var obj = this.getCurrentObject();
        if (obj) {
            this.keys.frameCounter++;
            var val = 1,
                proc = !0;
            this.keys.Z.isDown && this.keys.frameCounter % 5 != 0 && (proc = !1), this.keys.X.isDown && (val = 5), this.keys.C.isDown && (val = 20), proc && this.keys.UP.isDown && this.modifyCurrentObjProp("y", obj.y - val), proc && this.keys.DOWN.isDown && this.modifyCurrentObjProp("y", obj.y + val), proc && this.keys.LEFT.isDown && this.modifyCurrentObjProp("x", obj.x - val), proc && this.keys.RIGHT.isDown && this.modifyCurrentObjProp("x", obj.x + val), val = .025, this.keys.X.isDown && (val = .05), this.keys.C.isDown && (val = .1), proc && this.keys.NUM8.isDown && this.modifyCurrentObjProp("scale.y", obj.scale.y + val), proc && this.keys.NUM2.isDown && (this.modifyCurrentObjProp("scale.y", obj.scale.y - val), obj.scale.y -= val), proc && this.keys.NUM4.isDown && this.modifyCurrentObjProp("scale.x", obj.scale.x - val), proc && this.keys.NUM6.isDown && this.modifyCurrentObjProp("scale.x", obj.scale.x + val), proc && this.keys.PLUS.isDown && (this.modifyCurrentObjProp("scale.x", obj.scale.x + val), this.modifyCurrentObjProp("scale.y", obj.scale.y + val)), proc && this.keys.MINUS.isDown && (this.modifyCurrentObjProp("scale.x", obj.scale.x - val), this.modifyCurrentObjProp("scale.y", obj.scale.y - val)), val = 1, this.keys.X.isDown && (val = 2), this.keys.C.isDown && (val = 5), proc && this.keys.NUM7.isDown && this.modifyCurrentObjProp("angle", obj.angle - val), proc && this.keys.NUM9.isDown && this.modifyCurrentObjProp("angle", obj.angle + val), this.keys.SPACE.isDown && (this.modifyCurrentObjProp("x", 5 * Math.floor(obj.x / 5)), this.modifyCurrentObjProp("y", 5 * Math.floor(obj.y / 5)), this.modifyCurrentObjProp("scale.x", .025 * Math.floor(obj.scale.x / .025)), this.modifyCurrentObjProp("scale.y", .025 * Math.floor(obj.scale.y / .025)), this.modifyCurrentObjProp("angle", Math.floor(obj.angle)))
        }
    }, G.Modify.prototype.currentLevelGoUp = function() {
        0 != this.currentLevel.length && (this.currentLevel = "number" == typeof this.currentLevel[this.currentLevel.length - 1] ? this.currentLevel.splice(0, this.currentLevel.length - 2) : this.currentLevel.splice(0, this.currentLevel.length - 1), this.childrenPropNames = this.getChildrenPropNames(), this.currentChildIndex = 0, this.onLevelObjChange.dispatch())
    }, G.Modify.prototype.currentLevelGoDown = function(childIndex) {
        console.log(arguments), console.log(this.childrenPropNames[childIndex]), this.currentLevel = this.currentLevel.concat(this.childrenPropNames[childIndex]), this.childrenPropNames = this.getChildrenPropNames(), this.currentChildIndex = 0, this.onLevelObjChange.dispatch()
    }, G.Modify.prototype.changeCurrentChildrenIndex = function(newIndex) {
        this.currentChildIndex = newIndex, this.currentChildIndex < 0 && (this.currentChildIndex = this.childrenPropNames.length - 1), this.currentChildIndex >= this.childrenPropNames.length && (this.currentChildIndex = 0), this.onCurrentObjChange.dispatch()
    }, G.Modify.prototype.setNewCurrentChildren = function(obj) {
        var currentLevel = this.getCurrentLevelObject(),
            index = currentLevel.children.indexOf(obj); - 1 != index && this.changeCurrentChildrenIndex(index)
    }, G.Modify.prototype.childPropChange = function(currentLevel) {
        var orgLevel = this.currentLevel,
            orgIndex = this.currentChildIndex;
        this.currentLevel = currentLevel || [];
        for (var currentLevelTxt = this.currentLevel.join("/") || this.currentLevel[0] || game.state.current, removeStr = this.removeCashObjToString(currentLevelTxt), exportStr = "", childrenPropNames = this.getChildrenPropNames(), i = 0; i < childrenPropNames.length; i++) {
            this.currentChildIndex = i;
            var obj = this.getCurrentObject();
            if (obj !== this) {
                var fresh = (childrenPropNames[i].toString(), obj.___NEWOBJECT),
                    isText = obj.constructor === G.OneLineText || obj.constructor === G.MultiLineText;
                if (fresh && (exportStr += "NEW OBJECT \n"), obj.___initState) {
                    exportStr += "	" + childrenPropNames[i] + "\n";
                    var keys = Object.keys(obj.___initState);
                    keys.forEach(function(key) {
                        exportStr += "	" + key + ":  " + G.Utils.getObjProp(obj, key) + "\n"
                    }, this), obj.___initState = void 0
                }!isText && (fresh || obj.children && obj.children.length > 0) && this.childPropChange(this.currentLevel.concat(childrenPropNames[i]))
            }
        }(exportStr.length > 0 || removeStr.length > 0) && (removeStr.length > 0, exportStr.length > 0, this["export"] += currentLevelTxt + "\n" + removeStr + exportStr), this.currentChildIndex = orgIndex, this.currentLevel = orgLevel
    }, G.Modify.prototype.exportChanges = function() {
        this["export"] = "", this.childPropChange(), this["export"] ? (this["export"] = this.objectName + "\n" + this["export"], G.Utils.copyToClipboard(this["export"]), console.log(this["export"])) : console.log("NO CHANGES TO EXPORT")
    }, G.Modify.prototype.processClick = function() {
        var pointer = game.input.activePointer;
        this.keys.M.isDown && this.moveCurrentObjectToWorldPos(pointer.x, pointer.y)
    }, G.Modify.prototype.moveCurrentObjectToWorldPos = function(x, y) {
        var obj = this.getCurrentObject();
        if (obj) {
            obj.updateTransform();
            var offsetX = x - obj.worldPosition.x,
                offsetY = y - obj.worldPosition.y,
                offset = new Phaser.Point(offsetX, offsetY),
                pointer = new Phaser.Point(x, y);
            offset.normalize();
            for (var dist = obj.worldPosition.distance(pointer);;) {
                var prev = dist;
                obj.x += offset.x, obj.y += offset.y, obj.updateTransform();
                var dist = obj.worldPosition.distance(pointer);
                if (dist > prev) break
            }
            obj.x = Math.round(obj.x), obj.y = Math.round(obj.y)
        }
    }, G.Modify.prototype.addMouseWheel = function() {
        function mouseWheel(event) {
            var lvlObj = this.getCurrentLevelObject();
            lvlObj && lvlObj !== game.world && (lvlObj.y += 150 * game.input.mouse.wheelDelta)
        }
        game.input.mouse.mouseWheelCallback = mouseWheel.bind(this)
    }, G.Modify.prototype.exportLvlAsString = function() {
        for (var exportObj = [], lvl = this.getCurrentLevelObject(), i = 0; i < lvl.children.length; i++) {
            var child = lvl.children[i];
            if (child instanceof Phaser.Image) {
                var frameName = null;
                "string" == typeof child.frameName && (frameName = -1 == child.frameName.indexOf("/") ? child.frameName : child.key);
                var childObj = {
                    x: child.x,
                    y: child.y,
                    frame: frameName,
                    anchor: [child.anchor.x, child.anchor.y],
                    scale: [child.scale.x, child.scale.y],
                    angle: child.angle
                };
                child.___LABEL && (childObj.label = child.___LABEL), child.___DATA && (childObj.data = child.___DATA), exportObj.push(childObj)
            }
        }
        console.log(JSON.stringify(exportObj)), G.Utils.copyToClipboard(JSON.stringify(exportObj))
    }, G.Modify.prototype.objToTop = function() {
        var obj = this.getCurrentObject();
        if (obj) {
            var lvl = this.getCurrentLevelObject();
            lvl.bringToTop(obj), this.refreshLevel(), this.setNewCurrentChildren(obj)
        }
    }, G.Modify.prototype.objMoveUp = function() {
        var obj = this.getCurrentObject();
        if (obj) {
            var lvl = this.getCurrentLevelObject();
            lvl.moveUp(obj), this.refreshLevel(), this.setNewCurrentChildren(obj)
        }
    }, G.Modify.prototype.objMoveDown = function() {
        var obj = this.getCurrentObject();
        if (obj) {
            var lvl = this.getCurrentLevelObject();
            lvl.moveDown(obj), this.refreshLevel(), this.setNewCurrentChildren(obj)
        }
    }, G.Modify.prototype.objToBottom = function() {
        var obj = this.getCurrentObject();
        if (obj) {
            var lvl = this.getCurrentLevelObject();
            lvl.sendToBack(obj), this.refreshLevel(), this.setNewCurrentChildren(obj)
        }
    }, G.ModifyAnimationEditor = function(modify) {
        Phaser.Group.call(this, game), this.modify = G.Modify.instance, this.tl = new G.ModifyAnimationTL, this.tl.x = 100, this.add(this.tl), this.fw = new G.ModifyAnimationFrameWindow, this.fw.x = -250, this.add(this.fw), this.tl.onFrameSelected.add(this.fw.refresh, this.fw), this.fw.onChange.add(function(obj, frameNr) {
            console.log("fw onchange"), this.tl.redrawTl(), obj.updateAnimation(frameNr)
        }, this), this.tl.changeTlPxWidth(800), this.visible = !1, this.modify.onLevelObjChange.add(function() {
            var obj = this.modify.getCurrentLevelObject();
            obj.ANIMATIONELEMENT ? this.open(obj) : this.close()
        }, this)
    }, G.ModifyAnimationEditor.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationEditor.prototype.open = function(o) {
        this.visible = !0, this.tl.open(o), this.fw.refresh(o, 0)
    }, G.ModifyAnimationEditor.prototype.close = function() {
        this.visible = !1
    }, G.ModifyAnimationFrameGroup = function(x, y) {
        Phaser.Group.call(this, game), this.x = x, this.y = y, this.active = !1, this.currentObj = null, this.currentKeyFrame = null, this.currentFrameNr = 0, this.style = {
            font: "Verdana",
            fontSize: 13,
            fontWeight: "bold"
        }, this.onOffBtn = game.add.text(0, 0, "off", this.style), this.onOffBtn.inputEnabled = !0, this.onOffBtn.hitArea = new Phaser.Rectangle(0, 0, this.onOffBtn.width, this.onOffBtn.height), this.onOffBtn.events.onInputDown.add(this.onOff, this), this.propValue = game.add.text(280, 0, "---", this.style), this.propValue.anchor.x = 1, this.addMultiple([this.onOffBtn, this.propValue]), this.onChange = new Phaser.Signal
    }, G.ModifyAnimationFrameGroup.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationFrameGroup.prototype.onOff = function() {
        if (0 != this.currentFrameNr) {
            if (this.active) {
                this.active = !1, this.alpha = .5, this.onOffBtn.setText("off");
                var index = this.currentObj.frameTL.indexOf(this.currentKeyFrame);
                this.currentObj.frameTL.splice(index, 1)
            } else {
                this.active = !0, this.alpha = 1, this.onOffBtn.setText("on");
                for (var newKeyFrame = {
                        f: this.currentFrameNr,
                        v: G.Utils.getObjProp(this.currentObj.SPR, "frameName")
                    }, f = this.currentFrameNr, timeline = this.currentObj.frameTL, indexToPut = 0, i = 0; i < timeline.length; i++) timeline[i].f < f && indexToPut++;
                timeline.splice(indexToPut, 0, newKeyFrame)
            }
            this.refresh(this.currentObj, this.currentFrameNr)
        }
    }, G.ModifyAnimationFrameGroup.prototype.update = function() {
        if (this.currentObj.playing) return void this.refresh(this.currentObj, this.currentObj.frameCounter);
        if (this.currentObj) {
            var val = G.Utils.getObjProp(this.currentObj.SPR, "frameName") || G.Utils.getObjProp(this.currentObj.SPR, "key");
            val.indexOf("/") && (val = val.slice(val.lastIndexOf("/") + 1)), null == this.currentKeyFrame && (val != this.valAtRefresh ? (this.propValue.fill = "red", this.alpha = 1) : (this.alpha = .5, this.propValue.fill = "black")), !this.currentObj.playing && this.currentKeyFrame && this.currentKeyFrame.v !== val && (this.currentKeyFrame.v = val), this.propValue.setText(val)
        } else this.propValue.setText("---")
    }, G.ModifyAnimationFrameGroup.prototype.refresh = function(obj, frameNr) {
        this.currentObj = obj, this.currentObj.currentAnimationName && (this.currentKeyFrame = obj.getKeyFrameAt(obj.frameTL, frameNr), this.currentFrameNr = frameNr, this.propValue.fill = "black", this.valAtRefresh = G.Utils.getObjProp(this.currentObj.SPR, "frameName"), this.currentKeyFrame ? (this.active = !0, this.alpha = 1, this.onOffBtn.setText("on"), console.log("frameGroup refresh"), console.log(this.currentObj.getTextureFrameValue(obj.frameTL, frameNr)), this.propValue.setText(this.currentObj.getTextureFrameValue(obj.frameTL, frameNr) || "---")) : (this.onOffBtn.setText("off"), this.active = !1, this.alpha = .5, this.propValue.setText("---")))
    }, G.ModifyAnimationFrameWindow = function() {
        Phaser.Group.call(this, game), this.onChange = new Phaser.Signal, this.gfx = game.add.graphics(), this.gfx.inputEnabled = !0, this.add(this.gfx), this.gfx.beginFill(14540253), this.gfx.drawRect(0, 0, 300, 500), this.style = {
            font: "Verdana",
            fontSize: 13,
            fontWeight: "bold"
        }, this.currentAnimationTxt = game.add.text(10, 10, "", this.style), this.add(this.currentAnimationTxt), this.currentAnimationTxt.inputEnabled = !0, this.currentAnimationTxt.events.onInputDown.add(function() {
            this.changeAnimation()
        }, this), this.addAnimationBtn = game.add.text(170, 10, "+", this.style), this.add(this.addAnimationBtn), this.addAnimationBtn.inputEnabled = !0, this.addAnimationBtn.events.onInputDown.add(this.addNewAnimation, this), this.renameAnimationBtn = game.add.text(200, 10, "R", this.style), this.add(this.renameAnimationBtn), this.renameAnimationBtn.inputEnabled = !0, this.renameAnimationBtn.events.onInputDown.add(this.renameAnimation, this), this.removeAnimationBtn = game.add.text(230, 10, "-", this.style), this.add(this.removeAnimationBtn), this.removeAnimationBtn.inputEnabled = !0, this.removeAnimationBtn.events.onInputDown.add(this.removeAnimation, this), this.frameNr = game.add.text(290, 10, "", this.style), this.frameNr.anchor.x = 1, this.add(this.frameNr), this.frameGroup = new G.ModifyAnimationFrameGroup(10, 50), this.add(this.frameGroup), this.propGroups = [new G.ModifyAnimationPropGroup(10, 70, "alpha", "#43c9e7"), new G.ModifyAnimationPropGroup(10, 90, "x", "#e08040"), new G.ModifyAnimationPropGroup(10, 110, "y", "#d8ff30"), new G.ModifyAnimationPropGroup(10, 130, "angle", "#072ba0"), new G.ModifyAnimationPropGroup(10, 150, "scale.x", "#6c0674"), new G.ModifyAnimationPropGroup(10, 170, "scale.y", "#d34ed9"), new G.ModifyAnimationPropGroup(10, 190, "anchor.x"), new G.ModifyAnimationPropGroup(10, 210, "anchor.y")], this.propGroups.forEach(function(pg) {
            pg.onChange.add(this.onChange.dispatch, this.onChange)
        }, this), this.addMultiple(this.propGroups)
    }, G.ModifyAnimationFrameWindow.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationFrameWindow.prototype.update = function() {
        this.currentObj && (this.propGroups.forEach(function(g) {
            g.update()
        }, this), this.frameGroup.update())
    }, G.ModifyAnimationFrameWindow.prototype.loadFrame = function(obj, frameNr) {
        this.currentObj = obj, this.labelObjTxt.setText(obj.LABEL || "obj"), this.frameNr.setText(frameNr)
    }, G.ModifyAnimationFrameWindow.prototype.refresh = function(obj, frameNr) {
        this.propGroups.forEach(function(pg) {
            pg.refresh(obj, frameNr)
        }), this.frameGroup.refresh(obj, frameNr), this.frameNr.setText(frameNr), this.currentFrameNr = frameNr, this.currentObj = obj, this.currentAnimationTxt.setText(this.currentObj.currentAnimationName || "------")
    }, G.ModifyAnimationFrameWindow.prototype.changeAnimation = function(name) {
        if (this.currentObj) {
            var animations = Object.keys(this.currentObj.dataAnimation);
            if (console.log(JSON.stringify(animations)), name) this.currentObj.changeAnimationData(name);
            else if (this.currentObj.currentAnimationName) {
                var index = animations.indexOf(this.currentObj.currentAnimationName),
                    newIndex = (index + 1) % animations.length;
                console.log(index, newIndex), this.currentObj.changeAnimationData(animations[newIndex])
            } else this.currentObj.changeAnimationData(animations[0]);
            this.refresh(this.currentObj, this.currentFrameNr), this.onChange.dispatch(this.currentObj, 0)
        }
    }, G.ModifyAnimationFrameWindow.prototype.addNewAnimation = function() {
        if (this.currentObj) {
            for (var animations = Object.keys(this.currentObj.dataAnimation), name = "newAnimation", number = 0; - 1 !== animations.indexOf(name + number);) number++;
            this.currentObj.dataAnimation[name + number] = {
                eventTL: [],
                frameTL: [{
                    f: 0,
                    v: null
                }],
                propTLS: {
                    alpha: [{
                        f: 0,
                        v: 1
                    }],
                    x: [{
                        f: 0,
                        v: 0
                    }],
                    y: [{
                        f: 0,
                        v: 0
                    }],
                    angle: [{
                        f: 0,
                        v: 0
                    }],
                    "scale.x": [{
                        f: 0,
                        v: 1
                    }],
                    "scale.y": [{
                        f: 0,
                        v: 1
                    }],
                    "anchor.x": [{
                        f: 0,
                        v: .5
                    }],
                    "anchor.y": [{
                        f: 0,
                        v: .5
                    }]
                }
            }, this.changeAnimation(name + number)
        }
    }, G.ModifyAnimationFrameWindow.prototype.removeAnimation = function() {
        this.currentObj && this.currentObj.currentAnimationName && 1 != Object.keys(this.currentObj.dataAnimation).length && confirm("delete " + this.currentObj.currentAnimationName + "?") && (delete this.currentObj.dataAnimation[this.currentObj.currentAnimationName], this.changeAnimation())
    }, G.ModifyAnimationFrameWindow.prototype.renameAnimation = function() {
        this.currentObj && this.currentObj.currentAnimationName && G.Modify.instance.domLayer.openInputDiv(this.currentObj.currentAnimationName, this.currentObj.currentAnimationName, function(value) {
            var oldName = this.currentObj.currentAnimationName,
                dataAnimation = this.currentObj.currentAnimationData;
            delete this.currentObj.dataAnimation[oldName], this.currentObj.dataAnimation[value] = dataAnimation, this.changeAnimation(value)
        }, this, "string")
    }, G.ModifyAnimationPropGroup = function(x, y, prop, color) {
        Phaser.Group.call(this, game), this.x = x, this.y = y, this.propKey = prop, this.active = !1, this.currentObj = null, this.currentKeyFrame = null, this.currentFrameNr = 0, this.style = {
                font: "Verdana",
                fontSize: 13,
                fontWeight: "bold"
            }, this.easings = ["Back", "Bounce", "Circular", "Cubic", "Elastic", "Exponential", "Linear", "Quadratic", "Quartic", "Quintic", "Sinusoidal"],
            this.onOffBtn = game.add.text(0, 0, "off", this.style), this.onOffBtn.inputEnabled = !0, this.onOffBtn.hitArea = new Phaser.Rectangle(0, 0, this.onOffBtn.width, this.onOffBtn.height), this.onOffBtn.events.onInputDown.add(this.onOff, this), this.label = game.add.text(30, 0, prop, this.style), color && this.label.addColor(color, 0), this.easingLabel0 = game.add.text(120, 0, "", this.style), this.easingLabel0.inputEnabled = !0, this.easingLabel0.hitArea = new Phaser.Rectangle(0, 0, 80, this.easingLabel0.height), this.easingLabel0.events.onInputDown.add(this.changeEasing0, this), this.easingLabel1 = game.add.text(200, 0, "", this.style), this.easingLabel1.inputEnabled = !0, this.easingLabel1.hitArea = new Phaser.Rectangle(0, 0, 50, this.easingLabel1.height), this.easingLabel1.events.onInputDown.add(this.changeEasing1, this), this.propValue = game.add.text(280, 0, "", this.style), this.propValue.anchor.x = 1, this.addMultiple([this.label, this.onOffBtn, this.easingLabel0, this.easingLabel1, this.propValue]), this.onChange = new Phaser.Signal
    }, G.ModifyAnimationPropGroup.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationPropGroup.prototype.onOff = function() {
        if (0 != this.currentFrameNr) {
            if (this.active) {
                this.active = !1, this.alpha = .5, this.onOffBtn.setText("off");
                var index = this.currentObj.propTLS[this.propKey].indexOf(this.currentKeyFrame);
                this.currentObj.propTLS[this.propKey].splice(index, 1)
            } else {
                this.active = !0, this.alpha = 1, this.onOffBtn.setText("on");
                for (var newKeyFrame = {
                        f: this.currentFrameNr,
                        v: G.Utils.getObjProp(this.currentObj.SPR, this.propKey)
                    }, f = this.currentFrameNr, timeline = this.currentObj.propTLS[this.propKey], indexToPut = 0, i = 0; i < timeline.length; i++) timeline[i].f < f && indexToPut++;
                timeline.splice(indexToPut, 0, newKeyFrame)
            }
            this.refresh(this.currentObj, this.currentFrameNr)
        }
    }, G.ModifyAnimationPropGroup.prototype.update = function() {
        if (this.currentObj.playing) return void this.refresh(this.currentObj, this.currentObj.frameCounter);
        if (this.currentObj) {
            var val = G.Utils.getObjProp(this.currentObj.SPR, this.propKey);
            null == this.currentKeyFrame && (val != this.valAtRefresh ? (this.propValue.fill = "red", this.alpha = 1) : (this.alpha = .5, this.propValue.fill = "black")), !this.currentObj.playing && this.currentKeyFrame && this.currentKeyFrame.v !== val && (this.currentKeyFrame.v = val), this.propValue.setText(val.toFixed(1))
        } else this.propValue.setText("---")
    }, G.ModifyAnimationPropGroup.prototype.changeEasing0 = function() {
        if (this.currentKeyFrame) {
            if (this.currentKeyFrame.e) {
                var index = this.easings.indexOf(this.currentKeyFrame.e[0]);
                if (index + 1 == this.easings.length) this.currentKeyFrame.e = !1, this.easingLabel0.setText("--"), this.easingLabel1.setText("--");
                else {
                    this.currentKeyFrame.e[0] = this.easings[index + 1], this.easingLabel0.setText(this.easings[index + 1]);
                    var currentE1 = this.currentKeyFrame.e[1];
                    Phaser.Easing[this.easings[index + 1]][currentE1] || (Phaser.Easing[this.easings[index + 1]].None ? this.currentKeyFrame.e[1] = "None" : Phaser.Easing[this.easings[index + 1]].In && (this.currentKeyFrame.e[1] = "In")), this.easingLabel1.setText(this.currentKeyFrame.e[1])
                }
            } else this.currentKeyFrame.e = ["Back", "In"], this.easingLabel0.setText("Back"), this.easingLabel1.setText("In");
            this.onChange.dispatch(this.currentObj, this.currentFrameNr)
        }
    }, G.ModifyAnimationPropGroup.prototype.changeEasing1 = function() {
        if (this.currentKeyFrame && this.currentKeyFrame.e) {
            var currentE1 = this.currentKeyFrame.e[1],
                keys = Object.keys(Phaser.Easing[this.currentKeyFrame.e[0]]),
                index = keys.indexOf(currentE1);
            this.currentKeyFrame.e[1] = keys[(index + 1) % keys.length], this.easingLabel1.setText(this.currentKeyFrame.e[1]), this.onChange.dispatch(this.currentObj, this.currentFrameNr)
        }
    }, G.ModifyAnimationPropGroup.prototype.refresh = function(obj, frameNr) {
        this.currentObj = obj, this.currentObj.currentAnimationName && (this.currentKeyFrame = obj.getKeyFrameAt(obj.propTLS[this.propKey], frameNr), this.currentFrameNr = frameNr, this.propValue.fill = "black", this.valAtRefresh = G.Utils.getObjProp(this.currentObj.SPR, this.propKey), this.currentKeyFrame ? (this.active = !0, this.alpha = 1, this.onOffBtn.setText("on"), this.currentKeyFrame.e ? (this.easingLabel0.setText(this.currentKeyFrame.e[0]), this.easingLabel1.setText(this.currentKeyFrame.e[1])) : (this.easingLabel0.setText("---"), this.easingLabel1.setText("---"))) : (this.onOffBtn.setText("off"), this.active = !1, this.alpha = .5, this.easingLabel0.setText("---"), this.easingLabel1.setText("---")))
    }, G.ModifyAnimationTL = function() {
        Phaser.Group.call(this, game), this.gfx = game.add.graphics(), this.add(this.gfx), this.tlGfx = game.add.graphics(), this.tlGfx.inputEnabled = !0, this.pointerPressed = !1, this.pointerStartFrame = 0, this.tlGfx.events.onInputDown.add(this.onDown, this), this.tlGfx.events.onInputUp.add(this.onUp, this), this.add(this.tlGfx), this.visible = !1, this.currentObj = null, this.frameWidth = 10, this.frameHeight = 50, this.tlPxWidth = 400, this.tlFrameLength = this.tlPxWidth / this.frameWidth, this.selectedFrame = null, this.frameOffset = 0, this.cursors = game.input.keyboard.createCursorKeys(), this.cursors.left.onDown.add(function() {
            this.frameOffset--, this.redrawTl()
        }, this), this.cursors.right.onDown.add(function() {
            this.frameOffset++, this.redrawTl()
        }, this), this.onFrameSelected = new Phaser.Signal
    }, G.ModifyAnimationTL.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationTL.prototype.colors = [9904692, 35664, 4442599, 14712896, 14221104, 469920, 7079540, 13848281], G.ModifyAnimationTL.prototype.update = function() {
        if (this.pointerPressed) {
            var p = game.input.activePointer,
                frameNr = Math.floor((p.x - this.tlGfx.worldPosition.x) / this.frameWidth);
            if (frameNr !== this.pointerStartFrame) {
                var diff = this.pointerStartFrame - frameNr;
                this.frameOffset += diff, this.pointerStartFrame = frameNr, this.frameOffset = Math.max(0, this.frameOffset), this.redrawTl()
            }
        }
    }, G.ModifyAnimationTL.prototype.changeFrameWidth = function(newWidth) {
        this.frameWidth = newWidth, this.tlFrameLength = Math.floor(this.tlPxWidth / this.frameWidth), this.redrawTl()
    }, G.ModifyAnimationTL.prototype.changeTlPxWidth = function(newWidth) {
        this.tlPxWidth = newWidth, this.tlFrameLength = Math.floor(this.tlPxWidth / this.frameWidth), this.redrawTl()
    }, G.ModifyAnimationTL.prototype.open = function(obj) {
        this.currentObj = obj, this.visible = !0, this.redrawTl(), this.currentObj.stop()
    }, G.ModifyAnimationTL.prototype.onDown = function(obj, p) {
        this.currentObj.pause();
        var frameNr = Math.floor((p.x - this.tlGfx.worldPosition.x) / this.frameWidth);
        this.pointerStartFrame = frameNr, this.pointerPressed = !0
    }, G.ModifyAnimationTL.prototype.onUp = function(obj, p) {
        var frameNr = Math.floor((p.x - this.tlGfx.worldPosition.x) / this.frameWidth);
        this.pointerStartFrame == frameNr && (this.selectFrame(frameNr), this.pointerStar), this.pointerPressed = !1
    }, G.ModifyAnimationTL.prototype.selectFrame = function(frameNr) {
        this.selectedFrame = frameNr + this.frameOffset, this.currentObj.updateAnimation(this.selectedFrame), this.redrawTl(), this.onFrameSelected.dispatch(this.currentObj, this.selectedFrame)
    }, G.ModifyAnimationTL.prototype.redrawTl = function() {
        if (this.tlGfx.clear(), this.currentObj && this.currentObj.currentAnimationName) {
            this.tlGfx.beginFill(14540253, 1), this.tlGfx.drawRect(0, 0, this.tlFrameLength * this.frameWidth, this.frameHeight), this.tlGfx.beginFill(10066329, 1);
            for (var i = this.frameOffset; i < this.frameOffset + this.tlFrameLength; i++) this.currentObj.isAnyKeyFrameAt(i) && (this.tlGfx.lineStyle(1, 0, 1), this.tlGfx.drawRect(this.frameWidth * i - this.frameOffset * this.frameWidth, 0, this.frameWidth, this.frameHeight)), i % 60 == 0 && (this.tlGfx.lineStyle(1, 0, .25), this.tlGfx.moveTo(this.frameWidth * i - this.frameOffset * this.frameWidth, 0), this.tlGfx.lineTo(this.frameWidth * i - this.frameOffset * this.frameWidth, this.frameHeight));
            this.tlGfx.lineStyle(0, 0, 0);
            for (var i = 0; i < this.currentObj.eventTL.length; i++) {
                var key = this.currentObj.eventTL[i];
                this.tlGfx.beginFill(this.colors[0], 1), key.f >= this.frameOffset && key.f < this.frameOffset + this.tlFrameLength && this.tlGfx.drawRect(this.frameWidth * key.f - this.frameOffset * this.frameWidth, 0, this.frameWidth, 5)
            }
            for (var i = 0; i < this.currentObj.frameTL.length; i++) {
                var key = this.currentObj.frameTL[i];
                this.tlGfx.beginFill(this.colors[1], 1), key.f >= this.frameOffset && key.f < this.frameOffset + this.tlFrameLength && this.tlGfx.drawRect(this.frameWidth * key.f - this.frameOffset * this.frameWidth, 5, this.frameWidth, 5)
            }
            for (var i = 0; i < this.currentObj.propKeys.length; i++) this.drawPropLine(this.currentObj.propTLS[this.currentObj.propKeys[i]], 15 + 5 * i, this.colors[2 + i]);
            null !== this.selectedFrame && this.selectedFrame >= this.frameOffset && this.selectedFrame < this.frameOffset + this.tlFrameLength && (this.tlGfx.beginFill(255, .5), this.tlGfx.drawRect(this.frameWidth * this.selectedFrame - this.frameOffset * this.frameWidth, 0, this.frameWidth, this.frameHeight))
        }
    }, G.ModifyAnimationTL.prototype.drawPropLine = function(tl, y, color) {
        for (var x, w = .5 * this.frameWidth, i = 0; i < tl.length; i++) {
            var kf = tl[i];
            if (x = kf.f * this.frameWidth + .5 * this.frameWidth - this.frameOffset * this.frameWidth, this.tlGfx.lineStyle(0, 0, 0), !(kf.f < this.frameOffset)) {
                var pkf = tl[i - 1];
                if (pkf && pkf.e && (this.tlGfx.lineStyle(2, color, 1), this.tlGfx.moveTo(0, y), this.tlGfx.lineTo(Math.min(this.tlFrameLength * this.frameWidth, kf.f * this.frameWidth - this.frameOffset * this.frameWidth), y)), !(kf.f >= this.frameOffset + this.tlFrameLength))
                    if (kf.e) {
                        if (this.tlGfx.beginFill(color, 1), this.tlGfx.drawCircle(x, y, w), tl[i + 1]) {
                            this.tlGfx.lineStyle(2, color, 1), this.tlGfx.moveTo(x, y);
                            var lineToX = tl[i + 1].f * this.frameWidth - this.frameOffset * this.frameWidth;
                            lineToX = Math.min(this.tlFrameLength * this.frameWidth, lineToX), this.tlGfx.lineTo(lineToX, y)
                        }
                    } else this.tlGfx.endFill(), this.tlGfx.lineStyle(2, color, 1), this.tlGfx.drawCircle(x, y, w - 2)
            }
        }
    }, G.ModifyBottomBar = function() {
        Phaser.Group.call(this, game), this.modify = G.Modify.instance, this.gfx = game.add.graphics(), this.gfx.beginFill(13421772, 1), this.gfx.drawRect(0, 0, 3e3, 30), this.gfx.inputEnabled = !0, this.gfx.events.onInputDown.add(function() {}), this.add(this.gfx);
        var style = {
            font: "Verdana",
            fontSize: 15,
            fontWeight: "bold"
        };
        this.buttons = [G.Utils.makeTextButton(10, 5, "+GROUP", this.modify.addGroup, this.modify, style), G.Utils.makeTextButton(90, 5, "+IMG", this.modify.addImage, this.modify, style), G.Utils.makeTextButton(160, 5, "+OneLine", this.modify.addOneLineText, this.modify, style), G.Utils.makeTextButton(260, 5, "+MultiLine", this.modify.addMultiLineText, this.modify, style), G.Utils.makeTextButton(360, 5, "+BTN", this.modify.addButton, this.modify, style), G.Utils.makeTextButton(450, 5, "REMOVE", this.modify.removeObject, this.modify, style), G.Utils.makeTextButton(600, 5, "EXPORT LVL STR", this.modify.exportLvlAsString, this.modify, style)], this.addMultiple(this.buttons)
    }, G.ModifyBottomBar.prototype = Object.create(Phaser.Group.prototype), G.ModifyButtonGroup = function() {
        Phaser.Group.call(this, game), this.modify = G.Modify.instance, this.fixedToCamera = !0, this.gfx = this.add(game.add.graphics()), this.transformButtons = this.add(game.add.group()), this.changeObjButtons = this.add(game.add.group()), this.mode = 0, this.tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB), this.tabKey.onDown.add(function() {
            this.gfx.clear(), this.mode = (this.mode + 1) % 2, this.transformButtons.visible = 0 == this.mode, this.changeObjButtons.visible = 1 == this.mode
        }, this), this.keys = {
            ALT: game.input.keyboard.addKey(Phaser.Keyboard.ALT)
        }, this.clickedButton = null, this.clickedPos = null, this.posButton = game.add.button(0, 0, null), this.posButton.onInputDown.add(function() {
            this.clickedButton = this.posButton, this.clickedPos = {
                x: game.input.activePointer.x,
                y: game.input.activePointer.y
            }
        }, this), this.posButton.anchor.setTo(.5, .5), this.transformButtons.add(this.posButton), this.scaleButton = game.add.button(0, 0, null), this.scaleButton.onInputDown.add(function() {
            this.clickedButton = this.scaleButton, this.clickedPos = {
                x: game.input.activePointer.x,
                y: game.input.activePointer.y
            }
        }, this), this.scaleButton.anchor.setTo(.5, .5), this.transformButtons.add(this.scaleButton), this.rotateButton = game.add.button(0, 0, null), this.rotateButton.onInputDown.add(function() {
            this.clickedButton = this.rotateButton, this.clickedPos = {
                x: game.input.activePointer.x,
                y: game.input.activePointer.y
            }
        }, this), this.rotateButton.anchor.setTo(.5, .5), this.transformButtons.add(this.rotateButton), this.refreshChangeObjButtons(), this.modify.onLevelObjChange.add(this.refreshChangeObjButtons, this), this.modify.onObjDestroy.add(this.refreshChangeObjButtons, this)
    }, G.ModifyButtonGroup.prototype = Object.create(Phaser.Group.prototype), G.ModifyButtonGroup.prototype.update = function() {
        0 == this.mode ? (this.updateTransformButtons(), this.transformButtons.ignoreChildInput = !1, this.changeObjButtons.ignoreChildInput = !0) : (this.transformButtons.ignoreChildInput = !0, this.changeObjButtons.ignoreChildInput = !1, this.updateChangeObjButtons())
    }, G.ModifyButtonGroup.prototype.updateTransformButtons = function() {
        var obj = this.modify.getCurrentObject();
        if (!obj) return this.posButton.position.setTo(-9999, -9999), this.scaleButton.position.setTo(-9999, -9999), void this.rotateButton.position.setTo(-9999, -9999);
        var bounds = obj.getBounds(),
            localBounds = obj.getLocalBounds(),
            pointer = game.input.activePointer;
        if (this.posButton.x = obj.worldPosition.x, this.posButton.y = obj.worldPosition.y, this.scaleButton.x = obj.worldPosition.x + localBounds.x * obj.scale.x + bounds.width * obj.scale.x + 20, this.scaleButton.y = obj.worldPosition.y + localBounds.y * obj.scale.y + bounds.height * obj.scale.y + 20, this.rotateButton.x = obj.worldPosition.x + localBounds.x * obj.scale.x - 20, this.rotateButton.y = obj.worldPosition.y + localBounds.y * obj.scale.y - 20, this.gfx.clear(), this.gfx.lineStyle(1, 0, 1), this.gfx.beginFill(16711680, 1), this.gfx.drawCircle(this.posButton.worldPosition.x, this.posButton.worldPosition.y, 10), this.gfx.endFill(), this.gfx.beginFill(65280, 1), this.gfx.drawCircle(this.scaleButton.worldPosition.x, this.scaleButton.worldPosition.y, 10), this.gfx.endFill(), this.gfx.beginFill(255, 1), this.gfx.drawCircle(this.rotateButton.worldPosition.x, this.rotateButton.worldPosition.y, 10), this.gfx.endFill(), this.clickedButton)
            if (pointer.isDown) {
                var offsetX = pointer.x - this.clickedPos.x,
                    offsetY = pointer.y - this.clickedPos.y;
                this.clickedButton === this.posButton && (this.modify.modifyCurrentObjProp("x", obj.x + offsetX), this.modify.modifyCurrentObjProp("y", obj.y + offsetY)), this.clickedButton === this.scaleButton && (this.modify.modifyCurrentObjProp("width", obj.width + offsetX), this.modify.modifyCurrentObjProp("height", obj.height + offsetY), this.keys.ALT.isDown && this.modify.modifyCurrentObjProp("scale.y", obj.scale.x)), this.clickedButton === this.rotateButton && this.modify.modifyCurrentObjProp("angle", obj.angle + .25 * offsetX), this.clickedPos = {
                    x: game.input.activePointer.x,
                    y: game.input.activePointer.y
                }
            } else this.modify.modifyCurrentObjProp("x", 5 * Math.floor(obj.x / 5)), this.modify.modifyCurrentObjProp("y", 5 * Math.floor(obj.y / 5)), this.modify.modifyCurrentObjProp("scale.x", .025 * Math.floor(obj.scale.x / .025)), this.modify.modifyCurrentObjProp("scale.y", .025 * Math.floor(obj.scale.y / .025)), this.modify.modifyCurrentObjProp("angle", Math.floor(obj.angle)), this.clickedButton = null
    }, G.ModifyButtonGroup.prototype.updateChangeObjButtons = function() {
        this.gfx.clear(), this.gfx.beginFill(65280, 1), this.gfx.lineStyle(3, 16711680, 1);
        for (var i = 0; i < this.changeObjButtons.length; i++) {
            var child = this.changeObjButtons.children[i];
            this.gfx.drawCircle(child.worldPosition.x, child.worldPosition.y, 10)
        }
    }, G.ModifyButtonGroup.prototype.refreshChangeObjButtons = function() {
        this.changeObjButtons.removeAll(!0);
        for (var currentLevel = this.modify.getCurrentLevelObject(), i = 0; i < currentLevel.children.length; i++)
            if (currentLevel.children[i] != this.modify) {
                var child = currentLevel.children[i],
                    btn = game.make.button(0, 0, null);
                this.changeObjButtons.add(btn), btn.attachement = child, btn.modify = this.modify, btn.position = child.worldPosition, btn.hitArea = new Phaser.Circle(0, 0, 10), btn.onInputDown.add(function() {
                    this.modify.setNewCurrentChildren(this.attachement)
                }, btn)
            }
    }, G.ModifyChildList = function() {
        Phaser.Group.call(this, game), this.fixedToCamera = !0, this.modify = G.Modify.instance, this.levelTxt = game.add.text(20, 0, "", {
            font: "Verdana",
            fontSize: 20
        }), this.levelTxtBack = game.add.text(0, 0, "<", {
            font: "Verdana",
            backgroundColor: "rgba(0,255,0,0.5)",
            fontSize: 20,
            fontWeight: "bold"
        }), this.levelTxtBack.visible = !1, this.levelTxtBack.inputEnabled = !0, this.levelTxtBack.input.useHandCursor = !0, this.levelTxtBack.events.onInputDown.add(function() {
            this.modify.currentLevelGoUp()
        }, this), this.add(this.levelTxtBack), this.add(this.levelTxt), this.listGroup = this.add(game.add.group()), this.listGroup.y = 40, this.makeList(), this.currentLevelObj = this.modify.getCurrentLevelObject(), this.currentObj = this.modify.getCurrentObject(), this.modify.onLevelObjChange.add(this.makeList, this), this.modify.onCurrentObjChange.add(this.refreshTexts, this), this.modify.onObjDestroy.add(this.makeList)
    }, G.ModifyChildList.prototype = Object.create(Phaser.Group.prototype), G.ModifyChildList.prototype.hideList = function() {
        this.listGroup.visible = !1
    }, G.ModifyChildList.prototype.showList = function() {
        this.listGroup.visible = !0
    }, G.ModifyChildList.prototype.makeList = function() {
        var obj = this.modify.getCurrentLevelObject();
        this.listGroup.removeAll();
        for (var i = 0; i < this.modify.childrenPropNames.length; i++) {
            var hasChildren = obj.children[i].children && obj.children[i].children.length > 0 || obj.children[i].constructor === Phaser.Group,
                isTextObj = obj.children[i].constructor == G.OneLineText || obj.children[i].constructor == G.MultiLineText,
                txt = game.make.text(0, 20 * i, this.modify.childrenPropNames[i].join("."), {
                    font: "Verdana",
                    fontSize: 15,
                    backgroundColor: "rgba(221,221,221,0.5)",
                    fontWeight: "bold"
                }),
                self = "G.MODIFY-EDITOR" == this.modify.childrenPropNames[i].join(".");
            if (!isTextObj && !self && hasChildren) {
                var levelText = game.make.text(txt.width + 10, 0, "+", {
                    font: "Verdana",
                    fontSize: 15,
                    backgroundColor: "rgba(200,255,200,0.75)",
                    fontWeight: "bold"
                });
                txt.addChild(levelText), levelText.txtBtn = txt, levelText.modify = this.modify, levelText.childList = this, levelText.indexChild = i, levelText.inputEnabled = !0, levelText.input.useHandCursor = !0, levelText.hitArea = new Phaser.Rectangle(0, 0, levelText.width, levelText.height), levelText.events.onInputDown.add(function() {
                    this.modify.currentLevelGoDown(this.indexChild)
                }, levelText)
            }
            this.listGroup.add(txt), self || (txt.inputEnabled = !0, txt.indexChild = i, txt.childList = this, txt.modify = this.modify, txt.hitArea = new Phaser.Rectangle(0, 0, txt.width, txt.height), txt.input.useHandCursor = !0, txt.events.onInputDown.add(function() {
                this.modify.changeCurrentChildrenIndex(this.indexChild)
            }, txt))
        }
        this.refreshTexts()
    }, G.ModifyChildList.prototype.refreshTexts = function() {
        this.levelTxt.setText(this.modify.currentLevel.join("/") || this.modify.currentLevel[0] || game.state.current), this.levelTxtBack.visible = this.levelTxt.text !== game.state.current;
        for (var i = 0; i < this.listGroup.length; i++) {
            var txt = this.listGroup.children[i];
            this.modify.currentChildIndex == i ? (txt.x = 10, "rgba(221,221,221,0.5)" === txt.style.backgroundColor && (txt.style.backgroundColor = "rgba(180,180,255,1)", txt.updateText())) : (txt.x = 0, "rgba(180,180,255,1)" === txt.style.backgroundColor && (txt.style.backgroundColor = "rgba(221,221,221,0.5)", txt.updateText()))
        }
    }, G.ModifyCodeGenerator = function(modify) {
        this.modify = modify
    }, G.ModifyCodeGenerator.prototype.start = function(obj) {
        this.constStr = "";
        var exeStr = this.generateCode(obj),
            endStr = this.constStr + "\n\n" + exeStr;
        G.Utils.copyToClipboard(endStr), console.log(endStr)
    }, G.ModifyCodeGenerator.prototype.generateCode = function(obj, prefix) {
        return G.OneLineText && obj instanceof G.OneLineText ? this.generateCodeOneLineText(obj, prefix) : G.MultiLineText && obj instanceof G.MultiLineText ? this.generateCodeMultiLineText(obj, prefix) : G.Button && obj instanceof G.Button ? this.generateCodeButton(obj, prefix) : obj instanceof Phaser.Group && !(obj instanceof Phaser.BitmapText) ? obj.___CONSTRUCTOR ? this.generateConstructorCode(obj, prefix) : this.generateGroupCode(obj, prefix) : this.generateCodeImage(obj, prefix)
    }, G.ModifyCodeGenerator.prototype.generateConstructorCode = function(obj, prefix, inside) {
        var name = this.getObjName(obj),
            capName = G.capitalize(name),
            constStr = "";
        constStr += "G." + capName + " = function(x,y){\n", constStr += "	Phaser.Group.call(this,game);\n", constStr += "	this.position.setTo(x,y);\n", constStr += this.generateCodeUniProp(obj, "this"), constStr += "\n";
        for (var i = 0; i < obj.children.length; i++) constStr += "	" + this.generateCode(obj.children[i], "this"), constStr += "\n";
        constStr += "};\n", constStr += "G." + capName + ".prototype = Object.create(Phaser.Group.prototype);\n\n", this.constStr += constStr;
        var exeStr = (prefix ? prefix + "." : "var ") + "%NAME% = new G." + capName + "(^x^,^y^);\n";
        return prefix && (exeStr += prefix + ".add(" + prefix + ".%NAME%);\n"), exeStr = G.Utils.replaceAll(exeStr, "%NAME%", name), exeStr = this.injectObjPropToString(obj, exeStr)
    }, G.ModifyCodeGenerator.prototype.generateGroupCode = function(obj, prefix) {
        var name = this.getObjName(obj),
            str = (prefix ? prefix + "." : "var ") + "%NAME% = game.add.group();\n";
        str += (prefix ? prefix + "." : "") + "%NAME%.position.setTo(^x^,^y^);\n", str += this.generateCodeUniProp(obj, prefix), prefix && (str += prefix + ".add(" + prefix + ".%NAME%);\n");
        for (var i = 0; i < obj.children.length; i++) {
            var childStr = this.generateCode(obj.children[i], (prefix ? prefix + "." : "") + name, !0);
            str += G.Utils.replaceAll(childStr, "this", "%NAME%")
        }
        return str = G.Utils.replaceAll(str, "%NAME%", name), this.injectObjPropToString(obj, str)
    }, G.ModifyCodeGenerator.prototype.generateGroupConstructor = function(obj) {}, G.ModifyCodeGenerator.prototype.generateChildrensCode = function(obj) {}, G.ModifyCodeGenerator.prototype.generateCodeButton = function(obj, prefix) {
        prefix = prefix || "";
        var str = "";
        return str += (prefix ? prefix + "." : "var ") + "%NAME% = new G.Button(^x^,^y^,'^frameName^',function(){},this);\n", str += (prefix ? prefix + "." : "") + "add(" + (prefix ? prefix + "." : "var ") + "%NAME%);\n", str += this.generateCodeUniProp(obj, prefix), str = G.Utils.replaceAll(str, "%NAME%", this.getObjName(obj)), this.injectObjPropToString(obj, str)
    }, G.ModifyCodeGenerator.prototype.generateCodeImage = function(obj, prefix) {
        var str = "";
        return str += (prefix ? prefix + "." : "var ") + "%NAME% = G.makeImage(^x^,^y^,'^frameName^',[^anchor.x^,^anchor.y^]," + prefix + ");\n", str += this.generateCodeUniProp(obj, prefix), str = G.Utils.replaceAll(str, "%NAME%", this.getObjName(obj)), this.injectObjPropToString(obj, str)
    }, G.ModifyCodeGenerator.prototype.generateCodeOneLineText = function(obj, prefix) {
        var str = "";
        return str += (prefix ? prefix + "." : "var ") + "%NAME% = new G.OneLineText(^x^,^y^,'^font^','^text^',^fontSize^,^maxUserWidth^,^anchor.x^,^anchor.y^);\n", str += (prefix ? prefix + "." : "") + "add(" + (prefix ? prefix + "." : "var ") + "%NAME%);\n", str += this.generateCodeUniProp(obj, prefix), str = G.Utils.replaceAll(str, "%NAME%", this.getObjName(obj)), this.injectObjPropToString(obj, str)
    }, G.ModifyCodeGenerator.prototype.generateCodeMultiLineText = function(obj, prefix) {
        var str = "";
        return str += (prefix ? prefix + "." : "var ") + "%NAME% = new G.MultiLineText(^x^,^y^,'^font^','^text^',^fontSize^,^maxUserWidth^,^maxUserHeight^,'^align^',^anchor.x^,^anchor.y^);\n", str += (prefix ? prefix + "." : "") + "add(" + (prefix ? prefix + "." : "var ") + "%NAME%);\n", str += this.generateCodeUniProp(obj, prefix), str = G.Utils.replaceAll(str, "%NAME%", this.getObjName(obj)), this.injectObjPropToString(obj, str)
    }, G.ModifyCodeGenerator.prototype.getObjName = function(obj) {
        if (obj.___LABEL) return obj.___LABEL;
        var name = prompt("enter name");
        return obj.___LABEL = name, name
    }, G.ModifyCodeGenerator.prototype.generateCodeUniProp = function(obj, prefix) {
        var str = "";
        return prefix = prefix ? prefix + "." : "", (1 !== obj.scale.x || 1 !== obj.scale.y) && (str += prefix + "%NAME%.scale.setTo(^scale.x^, ^scale.y^);\n"), 0 !== obj.angle && (str += prefix + "%NAME%.angle = ^angle^;\n"), 1 !== obj.alpha && (str += prefix + "%NAME%.alpha = ^alpha^;\n"), obj.fixedToCamera && (str += prefix + "%NAME%.fixedToCamera = true;\n", str += prefix + "%NAME%.cameraOffset.setTo(^cameraOffset.x^,^cameraOffset.y^);\n"), str
    }, G.ModifyCodeGenerator.prototype.injectObjPropToString = function(obj, str) {
        for (;;) {
            var firstIndex = str.indexOf("^"),
                secondIndex = str.indexOf("^", firstIndex + 1);
            if (-1 == firstIndex) break;
            var toReplace = str.slice(firstIndex, secondIndex + 1),
                propToGet = str.slice(firstIndex + 1, secondIndex);
            str = str.replace(toReplace, G.Utils.getObjProp(obj, propToGet))
        }
        return str
    }, G.ModifyDOMLayer = function(modify) {
        this.modify = modify, this.openElement = null, this.extraDataDiv = this.initExtraDataDiv(), this.inputDataDiv = this.initInputDiv()
    }, G.ModifyDOMLayer.prototype.closeCurrent = function() {
        game.time.events.add(1, function() {
            game.input.enabled = !0
        }), this.openElement.style.display = "none", game.canvas.focus()
    }, G.ModifyDOMLayer.prototype.initExtraDataDiv = function() {
        var dataInputDiv = document.createElement("DIV");
        dataInputDiv.style.backgroundColor = "green", dataInputDiv.style.left = "10%", dataInputDiv.style.top = "10%", dataInputDiv.style.position = "fixed", dataInputDiv.style.width = "80%", dataInputDiv.style.height = "80%";
        var input = document.createElement("TEXTAREA");
        return input.style.marginTop = "2%", input.style.marginLeft = "2%", input.style.width = "95%", input.style.height = "94%", input.style.resize = "none", input.onkeydown = function(e) {
            var textarea = e.target,
                div = dataInputDiv;
            if (game.time.events.add(1, function() {
                    try {
                        eval("var tmp = " + textarea.value), "object" == typeof tmp ? (div.style.backgroundColor = "green", div.proper = !0) : (div.style.backgroundColor = "red", div.proper = !1)
                    } catch (e) {
                        div.style.backgroundColor = "red", div.proper = !1
                    }
                }), 9 == e.keyCode || 9 == e.which) {
                e.preventDefault();
                var s = textarea.selectionStart;
                textarea.value = textarea.value.substring(0, textarea.selectionStart) + "	" + textarea.value.substring(textarea.selectionEnd), textarea.selectionEnd = s + 1
            }
            return 83 == e.keyCode && e.ctrlKey ? (e.preventDefault(), div.proper && (this.closeCurrent(), div.callback.call(div.context, textarea.value)), !1) : void(27 == e.keyCode && this.closeCurrent())
        }.bind(this), dataInputDiv.textarea = input, dataInputDiv.appendChild(input), document.body.appendChild(dataInputDiv), dataInputDiv.style.display = "none", dataInputDiv.style.position = "fixed", dataInputDiv
    }, G.ModifyDOMLayer.prototype.openExtraData = function(label, data, callback, context) {
        console.log("openExtraData"), this.openElement = this.extraDataDiv, this.extraDataDiv.style.backgroundColor = "green", this.extraDataDiv.callback = callback || function() {}, this.extraDataDiv.context = context || this, this.extraDataDiv.style.display = "block", game.input.enabled = !1, data ? "object" == typeof data && (data = JSON.stringify(data, null, "	")) : data = "", this.extraDataDiv.textarea.value = data, game.time.events.add(1, function() {
            this.extraDataDiv.textarea.focus()
        }, this)
    }, G.ModifyDOMLayer.prototype.initInputDiv = function() {
        var inputDiv = document.createElement("DIV");
        inputDiv.style.backgroundColor = "gray", inputDiv.style.left = "30%", inputDiv.style.top = "10%", inputDiv.style.position = "fixed", inputDiv.style.width = "40%", inputDiv.style.textAlign = "center", inputDiv.style.padding = "10px", inputDiv.style.fontFamily = "Verdana";
        var span = document.createElement("h3"),
            filterLabel = document.createElement("SPAN");
        filterLabel.style["float"] = "right";
        var initValue = document.createElement("SPAN");
        initValue.style["float"] = "left", span.innerHTML = "";
        var input = document.createElement("INPUT");
        return input.style.width = "90%", input.style.fontSize = "25px", input.onkeydown = function(e) {
            var textarea = e.target,
                div = inputDiv;
            if (83 == e.keyCode && e.ctrlKey || 13 == e.keyCode) {
                e.preventDefault();
                var filteredValue = div.filter(textarea.value);
                return void 0 === filteredValue ? (div.style.backgroundColor = "red", game.time.events.add(50, function() {
                    div.style.backgroundColor = "gray"
                })) : (this.closeCurrent(), div.callback.call(div.context, filteredValue)), !1
            }
            27 == e.keyCode && this.closeCurrent()
        }.bind(this), inputDiv.appendChild(span), inputDiv.appendChild(input), inputDiv.appendChild(filterLabel), inputDiv.appendChild(initValue), document.body.appendChild(inputDiv), inputDiv.span = span, inputDiv.textarea = input, inputDiv.input = input, inputDiv.filterLabel = filterLabel, inputDiv.initValue = initValue, inputDiv.filters = {
            number: function(value) {
                var parsed = parseFloat(value);
                return isNaN(parsed) ? void 0 : parsed
            },
            string: function(value) {
                return 0 != value.length ? value : void 0
            },
            none: function(value) {
                return value
            }
        }, inputDiv.style.display = "none", inputDiv.style.position = "fixed", inputDiv
    }, G.ModifyDOMLayer.prototype.openInputDiv = function(label, initValue, callback, context, filter) {
        this.inputDataDiv || this.initInputArea(), this.openElement = this.inputDataDiv, this.inputDataDiv.style.display = "block", game.input.enabled = !1, this.inputDataDiv.span.innerHTML = label || "", this.inputDataDiv.input.value = initValue, this.inputDataDiv.callback = callback || function() {}, this.inputDataDiv.context = context || this, filter = filter || "none", this.inputDataDiv.filter = this.inputDataDiv.filters[filter], this.inputDataDiv.filterLabel.innerHTML = filter, this.inputDataDiv.initValue.innerHTML = "init val: " + initValue, game.time.events.add(1, function() {
            this.inputDataDiv.input.focus(), this.inputDataDiv.input.select()
        }, this)
    }, G.ModifyFrameSelector = function() {
        Phaser.Group.call(this, game), this.panelWidth = 300, this.gfx = game.make.graphics(), this.add(this.gfx), this.gfx.beginFill(14540253, 1), this.gfx.drawRect(0, 0, this.panelWidth, game.height), this.gfx.inputEnabled = !0, this.gfx.events.onInputDown.add(function() {}), this.framesBtns = [], this.framesGroup = this.add(game.add.group()), this.framesGroup.y = 50, this.topGroup = this.add(this.createTopBar()), this.bottomGroup = this.add(this.createBottomBar()), this.opened = !1, this.onFrameClicked = new Phaser.Signal
    }, G.ModifyFrameSelector.prototype = Object.create(Phaser.Group.prototype), G.ModifyFrameSelector.prototype.open = function() {
        this.opened = !0
    }, G.ModifyFrameSelector.prototype.close = function() {
        this.opened = !1
    }, G.ModifyFrameSelector.prototype.update = function() {
        this.opened ? this.x = game.world.bounds.x + game.width - this.panelWidth : this.x = game.world.bounds.x + game.width, this.bottomGroup.y = game.world.bounds.y + game.height - this.bottomGroup.height
    }, G.ModifyFrameSelector.prototype.loadAtlas = function(atlasName) {
        var columnsNr = 5,
            collWidth = this.panelWidth / columnsNr;
        this.framesGroup.removeAll();
        for (var arrayToIterate = "__singleImages" == atlasName ? this.__singleImages : game.cache.getFrameData(atlasName)._frames, i = 0; i < arrayToIterate.length; i++) {
            var col = i % columnsNr,
                row = Math.floor(i / columnsNr),
                name = arrayToIterate[i].name;
            this.createFrameButton(col * collWidth, row * collWidth, name, collWidth, "__singleImages" == atlasName)
        }
    }, G.ModifyFrameSelector.prototype.createBottomBar = function() {
        var bottomGroup = game.add.group();
        bottomGroup.gfx = game.add.graphics(), bottomGroup.gfx.beginFill(13421772, 1), bottomGroup.gfx.drawRect(0, 0, this.panelWidth, 20), bottomGroup.gfx.inputEnabled = !0, bottomGroup.gfx.events.onInputDown.add(function() {}), bottomGroup.add(bottomGroup.gfx);
        var style = {
                font: "Verdana",
                fontSize: 15,
                fontWeight: "bold"
            },
            buttons = [game.make.text(10, 2, "UP", style), game.make.text(10 + .3 * this.panelWidth, 2, "DOWN", style), game.make.text(10 + .6 * this.panelWidth, 2, "CLOSE", style)];
        return buttons.forEach(function(b) {
            bottomGroup.add(b), b.inputEnabled = !0, b.hitArea = new Phaser.Rectangle(0, 0, b.width, b.height), b.input.useHandCursor = !0
        }), buttons[0].events.onInputDown.add(function() {
            this.framesGroup.y += 300, this.framesGroup.y = Math.min(50, this.framesGroup.y)
        }, this), buttons[1].events.onInputDown.add(function() {
            this.framesGroup.y -= 300, this.framesGroup.y = Math.min(this.framesGroup.y, -(this.framesGroup.height - game.height))
        }, this), buttons[2].events.onInputDown.add(function() {
            this.opened = !1
        }, this), bottomGroup
    }, G.ModifyFrameSelector.prototype.createTopBar = function() {
        var topGroup = game.add.group();
        this.topGroup = topGroup, topGroup.gfx = game.add.graphics(), topGroup.gfx.beginFill(13421772, 1), topGroup.gfx.drawRect(0, 0, this.panelWidth, 25), topGroup.gfx.inputEnabled = !0, topGroup.gfx.events.onInputDown.add(function() {}), topGroup.add(topGroup.gfx);
        var imgCache = game.cache._cache.image;
        this.__singleImages = [];
        var i = 0;
        for (prop in imgCache)("_" != prop[0] || "_" != prop[1]) && (imgCache[prop].frame ? this.__singleImages.push({
            name: imgCache[prop].key
        }) : (this.createAtlasButton(5 + 25 * i, 2, i + 1, prop), i++));
        return this.createAtlasButton(5 + 25 * i + 10, 2, "img", "__singleImages"), topGroup
    }, G.ModifyFrameSelector.prototype.createAtlasButton = function(x, y, label, atlas) {
        var txt = game.make.text(x, y, label, {
            font: "Verdana",
            fontSize: 15,
            fontWeight: "bold"
        });
        this.topGroup.add(txt), txt.inputEnabled = !0, txt.atlas = atlas, txt.hitArea = new Phaser.Rectangle(0, 0, txt.width, txt.height), txt.input.useHandCursor = !0, txt.frameSelector = this, txt.events.onInputDown.add(function() {
            this.frameSelector.framesGroup.y = 50, this.frameSelector.loadAtlas(this.atlas)
        }, txt)
    }, G.ModifyFrameSelector.prototype.createFrameButton = function(x, y, frame, tileSize, singleImgs) {
        var img = G.makeImage(x, y, frame, 0, this.framesGroup);
        img.inputEnabled = !0, img.FS = this, img.singleImgs = singleImgs, img.events.onInputDown.add(function() {
            console.log(this.key),
                this.FS.onFrameClicked.dispatch(this.singleImgs ? this.key : this.frameName)
        }, img), img.input.useHandCursor = !0, img.width > img.height ? (img.width = .95 * tileSize, img.scale.y = img.scale.x) : (img.height = .95 * tileSize, img.scale.x = img.scale.y)
    }, G.ModifyInputBlocked = function() {
        Phaser.Graphics.call(this, game, 0, 0), this.beginFill(16711680, 1e-4), this.drawRect(0, 0, 5e3, 4e3), this.inputEnabled = !0, this.events.onInputDown.add(function() {}), this.fixedToCamera = !0
    }, G.ModifyInputBlocked.prototype = Object.create(Phaser.Graphics.prototype), G.ModifyPropButton = function(modify, x, y, label, refreshFunc, setFunc, postSet) {
        Phaser.Text.call(this, game, x, y, label + ": ", {
            font: "Verdana",
            backgroundColor: "rgba(255,255,255,0.5)",
            fontSize: 15
        }), this.label = label, this.modify = modify, "string" == typeof refreshFunc ? this.refreshProp = refreshFunc.split(".") : this.refreshFunc = refreshFunc, "string" == typeof setFunc ? (this.filterProperty = setFunc.slice(0, setFunc.indexOf(":")), this.setProp = setFunc.slice(setFunc.indexOf(":") + 1).split("."), this.setFunc = this.openInput) : this.setFunc = setFunc, this.postSet = postSet, this.inputEnabled = !0, this.input.useHandCursor = !0, this.events.onInputDown.add(this.setFunc, this)
    }, G.ModifyPropButton.prototype = Object.create(Phaser.Text.prototype), G.ModifyPropButton.prototype.setFunc = function() {
        var obj = this.modify.getCurrentObject();
        if (obj) {
            var value = this[this.askFunc]();
            null !== value && (this.modify.modifyCurrentObjProp(this.refreshProp, value), this.postSet && this.postSet(obj, value))
        }
    }, G.ModifyPropButton.prototype.openInput = function() {
        var obj = this.modify.getCurrentObject();
        this.modify.domLayer.openInputDiv((obj.___LABEL || "obj") + " | " + this.setProp, G.Utils.getObjProp(obj, this.setProp), function(value) {
            this.modify.modifyCurrentObjProp(this.refreshProp, value), this.postSet && this.postSet(obj, value)
        }, this, this.filterProperty)
    }, G.ModifyPropButton.prototype.refreshFunc = function(obj) {
        this.setText(this.label + ": ---");
        var obj = this.modify.getCurrentObject();
        if (obj) {
            this.visible = !0;
            var val = G.Utils.getObjProp(obj, this.refreshProp);
            void 0 === val ? this.visible = !1 : ("number" == typeof val && (val = val.toFixed(2)), this.setText(this.label + ": " + val))
        }
    }, G.ModifyPropButton.prototype["int"] = function() {
        var input = prompt(this.label || "int"),
            parsedInput = parseInt(input);
        return isNaN(parsedInput) ? null : parsedInput
    }, G.ModifyPropButton.prototype["float"] = function() {
        var input = prompt(this.label || "float"),
            parsedInput = parseFloat(input);
        return isNaN(parsedInput) ? null : parseFloat(parsedInput.toFixed(2))
    }, G.ModifyPropButton.prototype.string = function() {
        return prompt(this.label || "string")
    }, G.ModifyPropGroup = function(modify) {
        Phaser.Group.call(this, game), this.fixedToCamera = !0;
        var x = new G.ModifyPropButton(modify, 10, 10, "x", "x", "number:x");
        this.add(x);
        var y = new G.ModifyPropButton(modify, 10, 30, "y", "y", "number:y");
        this.add(y);
        var width = new G.ModifyPropButton(modify, 10, 50, "width", "width", "number:width");
        this.add(width);
        var height = new G.ModifyPropButton(modify, 10, 70, "height", "height", "number:height");
        this.add(height);
        var scaleX = new G.ModifyPropButton(modify, 10, 90, "scale.x", "scale.x", "number:scale.x");
        this.add(scaleX);
        var scaleY = new G.ModifyPropButton(modify, 10, 110, "scale.y", "scale.y", "number:scale.y");
        this.add(scaleY);
        var angle = new G.ModifyPropButton(modify, 10, 130, "angle", "angle", "number:angle");
        this.add(angle);
        var alpha = new G.ModifyPropButton(modify, 10, 150, "alpha", "alpha", "number:alpha");
        this.add(alpha);
        var visible = new G.ModifyPropButton(modify, 10, 170, "visible", "visible", function() {
            var obj = this.modify.getCurrentObject();
            this.modify.modifyCurrentObjProp("visible", !obj.visible)
        });
        this.add(visible);
        var anchorX = new G.ModifyPropButton(modify, 10, 190, "anchor.x", "anchor.x", "number:anchor.x");
        this.add(anchorX);
        var anchorY = new G.ModifyPropButton(modify, 10, 210, "anchor.y", "anchor.y", "number:anchor.y");
        this.add(anchorY);
        var frame = new G.ModifyPropButton(modify, 10, 230, "frame", "frameName", function() {
            modify.frameSelector.open()
        });
        this.add(frame);
        var fontSize = new G.ModifyPropButton(modify, 10, 250, "fontSize", "fontSize", "number:fontSize", function(obj, value) {
            obj.cacheAsBitmap && (obj.orgFontSize = value, obj.setText && obj.setText(obj.text)), obj.refresh && obj.refresh()
        });
        this.add(fontSize);
        var font = new G.ModifyPropButton(modify, 10, 270, "font", "font", function() {
            var obj = this.modify.getCurrentObject(),
                keys = Object.keys(game.cache._cache.bitmapFont),
                fontIndex = keys.indexOf(obj.font);
            this.modify.modifyCurrentObjProp("font", keys[(fontIndex + 1) % keys.length]), obj.cacheAsBitmap && obj.setText && obj.setText(obj.text), obj.refresh && obj.refresh()
        });
        this.add(font);
        var text = new G.ModifyPropButton(modify, 10, 290, "text", "text", "string:text", function(obj) {
            obj.cacheAsBitmap && obj.setText && obj.setText(obj.text)
        });
        this.add(text);
        var maxUserWidth = new G.ModifyPropButton(modify, 10, 310, "maxUserWidth", "maxUserWidth", "number:maxUserWidth", function(obj, value) {
            obj.cacheAsBitmap && obj.setText(obj.text)
        });
        this.add(maxUserWidth);
        var maxUserHeight = new G.ModifyPropButton(modify, 10, 330, "maxUserHeight", "maxUserHeight", "number:maxUserHeight", function(obj, value) {
            obj.cacheAsBitmap && obj.setText(obj.text)
        });
        this.add(maxUserHeight);
        var fixedToCamera = new G.ModifyPropButton(modify, 10, 350, "fixedToCamera", "fixedToCamera", function() {
            var obj = this.modify.getCurrentObject();
            this.modify.modifyCurrentObjProp("fixedToCamera", !obj.fixedToCamera)
        });
        this.add(fixedToCamera);
        var cameraOffsetX = new G.ModifyPropButton(modify, 10, 370, "cameraOffset.x", "cameraOffset.x", "number:cameraOffset.x");
        this.add(cameraOffsetX);
        var cameraOffsetY = new G.ModifyPropButton(modify, 10, 390, "cameraOffset.y", "cameraOffset.y", "number:cameraOffset.y");
        this.add(cameraOffsetY);
        var data = new G.ModifyPropButton(modify, 10, 420, "EXTRA_DATA", function() {
            var obj = this.modify.getCurrentObject();
            obj && (obj && obj.___DATA ? this.setText(this.label + ": YES") : this.setText(this.label + ": ---"))
        }, function() {
            var obj = this.modify.getCurrentObject();
            this.modify.domLayer.openExtraData(obj.label, obj.___DATA || {}, function(newData) {
                if (newData) try {
                    eval("var tmp = " + newData), "object" == typeof tmp ? obj.___DATA = tmp : console.warn("extra data cannot be a string")
                } catch (e) {
                    console.warn("something went wrong with parsing value")
                } else delete obj.___DATA
            })
        });
        this.add(data)
    }, G.ModifyPropGroup.prototype = Object.create(Phaser.Group.prototype), G.ModifyPropGroup.prototype.update = function() {
        var yy = 10;
        this.forEach(function(child, index) {
            child.refreshFunc(), child.visible && (child.y = yy, yy += 20)
        })
    }, "undefined" == typeof G && (G = {}), G.Utils = {
        lerp: function(valCurrent, valTarget, lerp, snapRange) {
            return snapRange && Math.abs(valCurrent - valTarget) <= snapRange ? valTarget : valCurrent + lerp * (valTarget - valCurrent)
        },
        copyToClipboard: function(text) {
            this.copyArea || (this.copyArea = document.createElement("textarea"), this.copyArea.style.positon = "fixed", this.copyArea.style.opacity = 0, document.body.appendChild(this.copyArea)), this.copyArea.value = text, this.copyArea.select(), document.execCommand("copy")
        },
        getObjProp: function(obj, prop) {
            var current = obj;
            "string" == typeof prop && (prop = prop.split("."));
            try {
                for (var i = 0; i < prop.length; i++) current = current[prop[i]]
            } catch (e) {
                return
            }
            return current
        },
        setObjProp: function(obj, prop, val) {
            var currentObj = obj;
            "string" == typeof prop && (prop = prop.split("."));
            try {
                for (var i = 0; i < prop.length - 1; i++) currentObj = currentObj[prop[i]];
                currentObj[prop[prop.length - 1]] = val
            } catch (e) {
                return null
            }
        },
        replaceAll: function(string, search, replacement) {
            return string.split(search).join(replacement)
        },
        makeTextButton: function(x, y, label, func, context, style) {
            var txt = game.add.text(x, y, label, style);
            return txt.inputEnabled = !0, txt.input.useHandCursor = !0, txt.hitArea = new Phaser.Rectangle(0, 0, txt.width, txt.height), txt.events.onInputDown.add(func, context), txt
        }
    }, "undefined" == typeof G && (G = {}), G.Mover = function(groupToMove) {
        Phaser.Group.call(this, game), this.groupToMove = groupToMove, this.currentIndex = 0, this.keys = game.input.keyboard.addKeys({
            z: Phaser.Keyboard.Z,
            x: Phaser.Keyboard.X,
            c: Phaser.Keyboard.C,
            minus: Phaser.Keyboard.MINUS,
            plus: Phaser.Keyboard.PLUS
        }), this.keys.plus.onDown.add(function() {
            this.grouptoMove && (this.currentIndex++, this.currentIndex = this.currentIndex % this.groupToMove.length)
        }, this), this.keys.minus.onDown.add(function() {
            this.grouptoMove && (this.currentIndex--, -1 == this.currentIndex && (this.currentIndex = this.groupToMove.length - 1))
        }, this), this.cursors = game.input.keyboard.createCursorKeys()
    }, G.Mover.prototype = Object.create(Phaser.Group.prototype), G.Mover.prototype.update = function() {
        if (this.groupToMove) {
            var val = 1;
            this.keys.z.isDown && (val = 5), this.keys.x.isDown && (val = 10), this.keys.c.isDown && (val = 20), this.cursors.up.isDown && (this.groupToMove.children[this.currentIndex].y -= val), this.cursors.down.isDown && (this.groupToMove.children[this.currentIndex].y += val), this.cursors.left.isDown && (this.groupToMove.children[this.currentIndex].x -= val), this.cursors.left.isDown && (this.groupToMove.children[this.currentIndex].x += val)
        }
    }, G.PointsLayer = function(topBar) {
        Phaser.Group.call(this, game), this.progressBar = topBar.progressBar, G.sb("displayPoints").add(this.onPointMade, this), this.deadArray = []
    }, G.PointsLayer.prototype = Object.create(Phaser.Group.prototype), G.PointsLayer.prototype.getFreeText = function() {
        var part;
        return this.deadArray.length > 0 ? part = this.deadArray.pop() : (part = new G.Text(0, 0, " ", {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#fdfbe4",
            strokeThickness: 7
        }, .5, 400), part.events.onKilled.add(this.onElemKilled, this)), this.add(part), part
    }, G.PointsLayer.prototype.onElemKilled = function(elem) {
        this === elem.parent && (this.deadArray.push(elem), this.removeChild(elem))
    }, G.PointsLayer.prototype.colorMap = {
        1: "#d60a00",
        2: "#0c063c",
        3: "#ffbe00",
        4: "#930c5b",
        5: "#024e00",
        6: "#8d1b00"
    }, G.PointsLayer.prototype.onPointMade = function(x, y, amount, color) {
        var txt = this.getFreeText();
        txt.revive(), txt.target = this.progressBar, color && this.colorMap[color] ? txt.stroke = this.colorMap[color] : txt.stroke = "#73461c", txt.x = x, txt.y = y, txt.scale.setTo(1), txt.alpha = 1, txt.setText("+" + amount.toString()), game.add.tween(txt.scale).from({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Bounce.InOut, !0).onComplete.add(function() {
            var targetX = this.target.worldPosition.x + game.world.bounds.x,
                targetY = this.target.worldPosition.y,
                time = 500;
            game.add.tween(this).to({
                x: targetX,
                y: targetY
            }, time, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Cubic.In, !0, time).onComplete.add(function() {
                this.kill()
            }, this)
        }, txt)
    }, G.saveState = {
        ready: !1,
        makeNewDataObject: function() {
            for (var obj = {
                    coins: G.json.settings.coinsOnStart,
                    lives: G.json.settings.livesOnStart,
                    lastRefillDate: Date.now(),
                    mapVisibleCounter: 0,
                    lastDaily: Date.now(),
                    lastGiftCheck: 0,
                    firstTimeBtn: [!1, !1],
                    freeSpin: !0,
                    levels: [],
                    points: [],
                    gates: [],
                    sentLives: {},
                    packs: [],
                    items: [],
                    mapChests: [],
                    boosters: [],
                    globalGoals: [],
                    finishedTutorials: [],
                    startBoosterAnim: [!0, !0, !0, !0],
                    mute: !1,
                    version: 1,
                    whatsNewSaw: []
                }, i = 0; 10 > i; i++) obj.boosters[i] = G.json.settings.boostersOnStart;
            return G.firstTimePlay = !0, obj
        },
        _reset: function() {
            G.saveState.data = G.saveState.makeNewDataObject(), G.saveState.save(), game.state.start("World")
        },
        increaseMapVisibleCounter: function() {
            this.data.mapVisibleCounter++, 1 === this.data.mapVisibleCounter ? G.gameTracking.FTUEDesign("FTUE:11_MapIsVisibleFirstTime") : 2 === this.data.mapVisibleCounter && G.gameTracking.FTUEDesign("FTUE:18_MapIsVisibleSecondTime")
        },
        isChallengeAvailable: function() {
            void 0 === this.data.lastChallengeTry && (this.data.lastChallengeTry = 0);
            var dateNow = new Date,
                lastTryDate = new Date(this.data.lastChallengeTry);
            return dateNow.getTime() > lastTryDate.getTime() && dateNow.toDateString() !== lastTryDate.toDateString() ? !0 : !1
        },
        startChallenge: function() {
            this.data.lastChallengeTry = Date.now(), this.save()
        },
        getTimeToNextChallenge: function() {
            void 0 === this.data.lastChallengeTry && (this.data.lastChallengeTry = 0);
            var date = new Date;
            return date.setHours(0), date.setMinutes(0), date.setSeconds(0), date.setMilliseconds(0), date.getTime() + 864e5
        },
        getDailyChallengeLevel: function() {
            game.rnd.sow([this.getTimeToNextChallenge()]);
            var lvlIndex = game.rnd.between(0, Math.max(30, this.getLastPassedLevelNr()));
            lvlIndex = game.math.clamp(lvlIndex, 0, G.json.levels.length - 1);
            var lvl = JSON.parse(JSON.stringify(G.json.levels[lvlIndex]));
            try {
                lvl.levelData = Array.reverse(lvl.levelData)
            } catch (e) {}
            return lvl.lvlNumber = lvlIndex + 1, lvl.moves -= 3, lvl
        },
        isPackActive: function(packData) {
            var saveData = this.getPackSaveData(packData.id),
                payGroup = this.data.payingUser || !1;
            if (packData.group) {
                if ("paying" == packData.group && !payGroup) return !1;
                if ("nonPaying" == packData.group && payGroup) return !1
            }
            return this.getLastPassedLevelNr() >= packData.afterLvlNr && !saveData.activationTime && (saveData.activationTime = Date.now(), this.save()), this.getLastPassedLevelNr() >= packData.afterLvlNr && !saveData.bought && Date.now() - saveData.activationTime < 60 * packData.timeMinutes * 1e3
        },
        getPackStage: function(packData) {
            for (var saveData = G.saveState.getPackSaveData(packData.id), timeDiffMin = (Date.now() - saveData.activationTime) / 1e3 / 60, stages = packData.stages[this.data.payingUser ? "payingUser" : "nonPayingUser"], currentTime = 0, i = 0; i < stages.length; i++) {
                var stage = stages[i];
                if (currentTime += stage.timeMinutes || 1 / 0, currentTime > timeDiffMin) return stage
            }
            return stages[stages.length - 1]
        },
        getPackSaveData: function(id) {
            return this.data.packs[id] || (this.data.packs[id] = {
                activationTime: !1,
                bought: !1
            }), this.data.packs[id]
        },
        getCurrentLivesNr: function() {
            return this.data.lives
        },
        sendLife: function(extUserId) {},
        checkIfCanSendLifeTo: function(extUserId) {},
        checkGateNr: function(lvlIndex) {
            for (var gatesLvlNr = [0].concat(G.json.settings.gates.map(function(gate) {
                    return gate.lvlNr
                })), i = 0; i < gatesLvlNr.length; i++)
                if (lvlIndex < gatesLvlNr[i] - 1) return i - 1;
            return i
        },
        activateGate: function(gate) {
            var saved = this.getGateData(gate.id);
            saved.timerStartedAt || (saved.timerStartedAt = Date.now(), this.save())
        },
        openGate: function(id) {
            this.data.gates[id] && (this.data.gates[id].open = !0, this.save())
        },
        tickCheckGate: function() {
            for (var i = 0; i < G.json.settings.gates.length; i++) this.checkGate(G.json.settings.gates[i])
        },
        checkGate: function(gateData) {
            var savedData = this.getGateData(gateData.id);
            if (savedData.open || savedData.readyToOpen) return savedData;
            var allUserStars = this.getAllStars();
            return allUserStars >= gateData.req.stars && (G.gameTracking.design("GateUnlockStars"), savedData.readyToOpen = !0), savedData.timerStartedAt && Date.now() - savedData.timerStartedAt > 6e4 * gateData.req.timeMinutes && (savedData.readyToOpen = !0, G.gameTracking.design("GateUnlockTime")), savedData.invites >= gateData.req.invites && (savedData.readyToOpen = !0, G.gameTracking.design("GateUnlockFriends")), savedData.readyToOpen && this.save(), savedData
        },
        getGateData: function(id) {
            return this.data.gates[id] || (this.data.gates[id] = {
                open: !1,
                timerStartedAt: !1,
                invites: 0
            }), this.data.gates[id]
        },
        getFirstClosedGateLvLIndex: function() {
            for (var i = 0; i < G.json.settings.gates.length; i++)
                if (!this.getGateData(G.json.settings.gates[i].id).open) return G.json.settings.gates[i].lvlNr - 1;
            return null
        },
        passExtraLevel: function(extraStars) {
            this.data.extraStars || (this.data.extraStars = 0), this.data.extraStars += extraStars, this.save()
        },
        passLevel: function(lvl_nr, new_stars, new_points, skipReward) {
            G.sb("onLevelFinished").dispatch(lvl_nr, new_stars, new_points);
            var state = game.state.getCurrentState(),
                old_stars = this.getStars(lvl_nr),
                old_points = this.getPoints(lvl_nr),
                result = {
                    highscore: !1,
                    points: new_points,
                    reward: 0,
                    stars: new_stars,
                    passedFriend: !1,
                    starImprovement: Math.max(0, new_stars - old_stars)
                };
            if (new_points > old_points && (this.data.points[lvl_nr] = new_points, result.highscore = !0), new_stars > old_stars) {
                this.data.levels[lvl_nr] = new_stars;
                var reward = G.json.settings.coinsForStar[new_stars - 1] - (G.json.settings.coinsForStar[old_stars - 1] || 0);
                state.doubleMoney && (reward *= 2), result.reward = reward
            }
            return result.highscore, skipReward || (this.data.coins += result.reward), this.save(), result
        },
        getPoints: function(lvl_nr) {
            return this.data.points[lvl_nr] ? this.data.points[lvl_nr] : 0
        },
        isLevelBehindGate: function(levelIndex) {
            for (var i = 0; i < G.json.settings.gates.length; i++)
                if (G.json.settings.gates[i].lvlNr === levelIndex + 1) return !this.getGateData(G.json.settings.gates[i].id).open;
            return !1
        },
        getStars: function(lvl_nr) {
            return this.data.levels[lvl_nr] ? this.data.levels[lvl_nr] : 0
        },
        getCoins: function() {
            return this.data.coins
        },
        getItemAmount: function(nr) {
            return ("undefined" == typeof this.data.items[nr] || null == this.data.items[nr]) && (this.data.items[nr] = 0), this.data.items[nr]
        },
        changeItemAmount: function(nr, amount) {
            return void 0 === this.data.items[nr] && (this.data.items[nr] = 0), this.data.items[nr] += amount, G.sb("refreshItemAmount").dispatch(nr, this.data.items[nr]), this.save(), this.data.items[nr]
        },
        getBoosterAmount: function(nr) {
            return ("undefined" == typeof this.data.boosters[nr] || null == this.data.boosters[nr]) && (this.data.boosters[nr] = G.json.settings.boostersOnStart), this.data.boosters[nr]
        },
        buyBooster: function(nr) {
            return this.data.coins >= G.json.settings["priceOfBooster" + nr] ? (this.changeCoins(-G.json.settings["priceOfBooster" + nr]), this.changeBoosterAmount(nr, 1), G.sb("onBoosterBought").dispatch(nr), G.gameTracking.sink("Coins", this.nrToBoosterName(nr), "InGame", G.json.settings["priceOfBooster" + nr]), !0) : !1
        },
        removeMapGift: function(skipSave) {
            G.saveState.data.mapGifts = G.saveState.data.mapGifts.slice(1), skipSave || this.save(), G.sb("onMapGiftRemoved").dispatch()
        },
        isEnoughToBuyBooster: function(nr) {
            return this.data.coins >= G.json.settings["priceOfBooster" + nr] ? !0 : !1
        },
        isEnoughToBuy: function(amount) {
            return this.data.coins >= amount
        },
        isBoosterUnlocked: function(nr) {
            if (6 == nr) return !1;
            var lastPassedLevelNr = this.getLastPassedLevelNr();
            return 5 > nr ? lastPassedLevelNr + 1 >= G.json.settings.boostersUnlock[nr] : lastPassedLevelNr + 1 >= G.json.settings.startBoosterUnlock[nr - 5]
        },
        changeBoosterAmount: function(nr, amount, skipSave) {
            this.data.boosters[nr] += amount, skipSave || this.save(), G.sb("refreshBoosterAmount").dispatch(nr)
        },
        useBooster: function(nr) {
            this.data.boosters[nr] <= 0 && (G.saveState.buyBooster(nr), G.sfx.cash_register.play()), G.lvl && G.gameTracking.sink(this.nrToBoosterName(nr), "Level" + (G.lvlNr + 1), "Gameplay", 1), this.changeBoosterAmount(nr, -1), G.sb("onBoosterUsed").dispatch(nr)
        },
        isBubbleGiftUsed: function(levelNr) {
            return G.saveState.data.bubbleGifts || (G.saveState.data.bubbleGifts = []), -1 !== G.saveState.data.bubbleGifts.indexOf(levelNr)
        },
        markBubbleGiftAsUsed: function(levelNr) {
            G.saveState.data.bubbleGifts || (G.saveState.data.bubbleGifts = []), G.saveState.data.bubbleGifts.push(levelNr)
        },
        useStartBooster: function(nr) {
            this.data.boosters[nr] && (this.data.boosters[nr]--, G.lvl && G.gameTracking.sink(this.nrToBoosterName(nr), "Level" + (G.lvlNr + 1), "Gameplay", 1), this.save())
        },
        nrToBoosterName: function(nr) {
            return [null, "SWAP", "REMOVE", "HORIZONTAL", "VERTICAL", "MOVES", "DOUBLE", "VERHOR", "COLOR"][nr]
        },
        nrToWord: function(nr) {
            return ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIVETEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY"][parseInt(nr)]
        },
        changeCoins: function(amount, dontSave) {
            this.data.coins += amount, dontSave || this.save(), G.sb("onCoinsChange").dispatch(this.data.coins)
        },
        getAllStars: function() {
            for (var val = 0, i = 0, len = this.data.levels.length; len > i; i++) val += this.data.levels[i] || 0;
            return void 0 === this.data.extraStars && (this.data.extraStars = 0), val += this.data.extraStars
        },
        getLastPassedLevelNr: function() {
            return this.data.levels.length
        },
        isLevelAvailable: function(lvlNr) {
            return lvlNr <= this.data.levels.length
        },
        save: function() {
            var dtdta = JSON.stringify(this.data);
            localStorage.setItem("gmdatastring-kd5", dtdta)
        },
        init: function() {
            this.refillRate = Math.floor(6e4 * G.json.settings.refillRateMin), data = localStorage.getItem("gmdatastring-kd5"), data ? (this.data = JSON.parse(data), game.sound.mute = this.data.mute, "undefined" == typeof this.data.whatsNewSaw && (this.data.whatsNewSaw = []), this.getLastPassedLevelNr() > 3 && (this.data.sawDailyTut = !0), this.versionCheck()) : (this.data = this.makeNewDataObject(), G.firstTime = !0), game.sound.mute = this.data.mute, this.ready = !0, setTimeout(function() {
                G.sb("onWallClockTimeUpdate").dispatch()
            }, 1e3), G.sb("onWallClockTimeUpdate").addPermanent(this.onTick, this, 99), G.sb("onWallClockTimeUpdate").addPermanent(this.tickCheckGate, this, 99)
        },
        versionCheck: function() {
            if (!this.data.version) {
                this.data.version = 1;
                var lastLvl = this.getLastPassedLevelNr();
                G.json.settings.gates.forEach(function(gate) {
                    var saveData = this.getGateData(gate.id);
                    gate.lvlNr < lastLvl && !saveData.open && (saveData.open = !0)
                }, this)
            }
        },
        loseLife: function() {
            return !G.LIVES || this.data.lives <= 0 ? void 0 : (this.data.lives--, this.save(), this.save(), this.data.lives)
        },
        addLife: function(nr, skipSave) {
            return this.data.lives != G.json.settings.livesMax ? (nr = nr || 1, this.data.lives = game.math.clamp(this.data.lives + nr, 0, G.json.settings.livesMax), skipSave || this.save(), G.sb("onLifeAdded").dispatch(), this.data.lives) : void 0
        },
        addGinger: function(amount) {
            this.data.ginger || (this.data.ginger = 0), this.data.ginger += amount, G.sb("onGingerAdded").dispach(this.data.ginger)
        },
        onTick: function(currentTime) {
            if (Date.now() - this.data.lastDaily >= 864e5 && (this.data.lastDaily = Date.now(), this.data.freeSpin = !0, this.save(), G.sb("onDailyFreeSpinGain").dispatch()), this.data.lives == G.json.settings.livesMax && (this.data.lastRefillDate = Date.now()), this.data.lives < G.json.settings.livesMax) {
                var diff = currentTime - this.data.lastRefillDate,
                    nrOfLivesToAdd = Math.floor(diff / this.refillRate);
                nrOfLivesToAdd > 0 && (this.data.lastRefillDate += nrOfLivesToAdd * this.refillRate, this.addLife(nrOfLivesToAdd));
                var secLeft = Math.round((this.refillRate - (currentTime - this.data.lastRefillDate)) / 1e3);
                G.sb("onLifeTimerUpdate").dispatch(secLeft)
            }
        },
        debugStarsUpTo: function(lvlNr, starNr) {
            for (this.data.levels = []; lvlNr--;) this.data.levels.push(starNr || 3);
            game.state.start("World")
        },
        isPayloadGiftAvailable: function(id) {
            return this.data.payloadGifts || (this.data.payloadGifts = []), -1 === this.data.payloadGifts.indexOf(id)
        },
        markPayloadGiftAsOpen: function(id) {
            this.data.payloadGifts || (this.data.payloadGifts = []), this.data.payloadGifts.push(id)
        },
        dailyReward_reportVisit: function() {
            this.data.dailyReward || (this.data.dailyReward = {}, this.data.dailyReward.nextDaily = 0, this.data.dailyReward.currentDay = 0);
            var currentDay = this.dailyReward_daySinceEpoch(Date.now());
            if (currentDay >= this.data.dailyReward.nextDaily) {
                var diff = this.data.dailyReward.nextDaily - currentDay;
                return this.data.dailyReward.nextDaily = currentDay + 1, 0 === diff ? this.data.dailyReward.currentDay++ : this.data.dailyReward.currentDay = 0, G.saveState.save(), this.data.dailyReward.currentDay % 7
            }
            return null
        },
        dailyReward_daySinceEpoch: function(time) {
            return Math.floor(time / 864e5)
        }
    }, G.SoundBtn = function(x, y) {
        G.Button.call(this, x, y, game.sound.mute ? "btn_sound_off" : "btn_sound_on", function() {
            game.sound.mute = !game.sound.mute, game.sound.mute ? G.sfx.music.pause() : G.sfx.music.resume(), G.saveState.data.mute = game.sound.mute, G.changeTexture(this, game.sound.mute ? "btn_sound_off" : "btn_sound_on"), G.saveState.save(), G.sb("onSoundSettingsChange").dispatch(game.sound.mute)
        }), game.add.existing(this)
    }, G.SoundBtn.prototype = Object.create(G.Button.prototype), G.TopFxLayer = function(board, signalName) {
        Phaser.Group.call(this, game), this.aboveThirdFloorLayer = !1, this.board = board, G.sb(signalName || "fx").add(this.initEffect, this), this.deadArray = []
    }, G.TopFxLayer.prototype = Object.create(Phaser.Group.prototype), G.TopFxLayer.constructor = G.TopFxLayer, G.TopFxLayer.prototype.onElemKilled = function(elem) {
        this === elem.parent && (this.removeChild(elem), this.deadArray.push(elem))
    }, G.TopFxLayer.prototype.getFreeParticle = function() {
        var part;
        return this.deadArray.length > 0 ? part = this.deadArray.pop() : (part = new G.FxParticle(this.board, this), part.events.onKilled.add(this.onElemKilled, this)), this.add(part), part
    }, G.TopFxLayer.prototype.initEffect = function(effect, candy, args, args2) {
        if ("burstConcrete" == effect) return this.initConcreteBreak(candy, args);
        var part = this.getFreeParticle();
        return part[effect](this.board.cellXToPxIn(candy.cellX), this.board.cellYToPxIn(candy.cellY), args, args2), part
    }, G.TopFxLayer.prototype.initConcreteBreak = function(candy, hp) {
        3 == hp ? this.getFreeParticle().burstConcrete(this.board.cellXToPxIn(candy.cellX), this.board.cellYToPxIn(candy.cellY), -9, -1, "concrete_3_1") : 2 == hp ? this.getFreeParticle().burstConcrete(this.board.cellXToPxIn(candy.cellX), this.board.cellYToPxIn(candy.cellY), 14, 5, "concrete_2_1") : (this.getFreeParticle().burstConcrete(this.board.cellXToPxIn(candy.cellX), this.board.cellYToPxIn(candy.cellY), 15, 20, "concrete_1_1"), this.getFreeParticle().burstConcrete(this.board.cellXToPxIn(candy.cellX), this.board.cellYToPxIn(candy.cellY), -15, 20, "concrete_1_2"))
    }, G.Tutorial = function(tutorialNr) {
        Phaser.Group.call(this, game), this.tutorialNr = tutorialNr, G.tutorialOpened = !0, this.boardGroup = game.add.group(), this.add(this.boardGroup), this.state = game.state.getCurrentState(), this.overlay = this.state.overlay, this.board = this.state.board, this.boardGroup.x = this.board.x, this.boardGroup.y = this.board.y, this.tutData = G.json.tutorials[tutorialNr], this.tutData.booster ? this.makeBoosterTutorial(this.tutData) : this.makeStandardTutorial(this.tutData), game.add.tween(this.boardGroup).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0)
    }, G.Tutorial.prototype = Object.create(Phaser.Group.prototype), G.Tutorial.prototype.update = function() {
        this.boardGroup.x = this.board.x, this.boardGroup.y = this.board.y, this.boardGroup.update()
    }, G.Tutorial.prototype.makeStandardTutorial = function(tutData) {
        tutData.overlayTask && this.overlay.start(tutData.overlayTask), tutData.handCells && this.makeHandAnim(tutData.handCells), tutData.inputCells && this.setBoardCandyInput(tutData.inputCells), tutData.msg && this.makeMsg(tutData.msg.text, tutData.msg.position), G.sb("madeMove").addOnce(this.finish, this), this.state.boosterPanel.lockInput()
    }, G.Tutorial.prototype.makeBoosterTutorial = function(tutData) {
        tutData.msg && this.makeMsg(tutData.msg.text, tutData.msg.position, !0), this.lockBoard(), this.state.boosterPanel.lockInput(), this.state.boosterPanel.boostersBtn[tutData.boosterNr - 1].unlock(), this.state.boosterPanel.boostersBtn[tutData.boosterNr - 1].showSuggestion(), G.sb("onBoosterSelect").addOnce(function() {
            tutData.overlayTask && this.overlay.start(tutData.overlayTask), this.makeHandAnim(this.tutData.handCells), this.state.boosterPanel.boostersBtn[tutData.boosterNr - 1].hideSuggestion(), this.hideMsg(), this.state.board.actionManager.actionList[0].availableCandies = this.inputCellsToCandies(this.tutData.inputCells), 1 == this.tutData.boosterNr && (this.state.board.actionManager.actionList[0].availableCandies = [this.board.getCandy(this.tutData.inputCells[0], this.tutData.inputCells[1])], G.sb("onBoosterSwapCandySelect").addOnce(function() {
                this.hand.destroy(), this.makeHandAnim([this.tutData.inputCells[2], this.tutData.inputCells[3]]), this.state.board.actionManager.actionList[0].availableCandies = [this.board.getCandy(this.tutData.inputCells[2], this.tutData.inputCells[3])]
            }, this))
        }, this), G.sb("onBoosterUsed").addOnce(this.finish, this)
    }, G.Tutorial.prototype.makeMsg = function(text, position, shade) {
        shade && (this.msgShade = G.makeImage(0, 0, "text_shade_bg", .5), this.msgShade.alpha = .7), this.msg = new G.Text(0, 0, G.txt(text), {
            font: "ComicSansBold",
            fill: "white",
            fontSize: "35px",
            lineSpacing: -25
        }, .5, 580, 200, !0, "center"), this.msg.x = .5 * (this.board.width - 2 * this.board.tilesize), this.msg.y = (this.board.height - 2 * this.board.tilesize) * (position || .7), shade && (this.msgShade.width = this.msg.width + G.l(80), this.msgShade.height = this.msg.height + G.l(60), this.msgShade.position = this.msg.position, this.boardGroup.add(this.msgShade)), this.boardGroup.add(this.msg)
    }, G.Tutorial.prototype.hideMsg = function() {
        this.msgShade && game.add.tween(this.msgShade).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msg && game.add.tween(this.msg).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msg = !1, this.msgShade = !1
    }, G.Tutorial.prototype.afterMsg = function(text, position) {
        text && (this.msg && game.add.tween(this.msg).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msgShade && game.add.tween(this.msgShade).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.hand && game.add.tween(this.hand).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msgShade = G.makeImage(0, 0, "text_shade_bg", .5), this.boardGroup.add(this.msgShade), this.afterMsg = new G.Text(0, 0, G.txt(text), {
            font: "ComicSansBold",
            fill: "white",
            fontSize: "35px",
            lineSpacing: -25
        }, .5, 580, 200, !0, "center"), this.afterMsg.x = .5 * (this.board.width - 2 * this.board.tilesize), this.afterMsg.y = (this.board.height - 2 * this.board.tilesize) * (position || .7), this.boardGroup.add(this.afterMsg), game.add.tween(this.afterMsg).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msgShade.width = this.afterMsg.width + G.l(80), this.msgShade.height = this.afterMsg.height + G.l(60), this.msgShade.position = this.afterMsg.position, this.msgShade.alpha = .7, game.add.tween(this.msgShade).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this).to({
            alpha: 0
        }, 400, Phaser.Easing.Sinusoidal.Out, !0, this.tutData.afterMsgTime || 2500).onComplete.add(function() {
            this.destroy()
        }, this))
    }, G.Tutorial.prototype.makeHandAnim = function(array) {
        this.hand = G.makeImage(0, 0, "tut_hand", 0, this), this.hand.alpha = 1, this.boardGroup.add(this.hand), this.hand.x = this.board.tilesize * array[0] + .7 * this.board.tilesize, this.hand.y = this.board.tilesize * array[1] + .7 * this.board.tilesize;
        var toX, toY;
        2 == array.length ? (toX = this.hand.x + G.l(15), toY = this.hand.y + G.l(15), game.add.tween(this.hand).to({
            x: toX,
            y: toY
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)) : (toX = this.board.tilesize * array[2] + .7 * this.board.tilesize, toY = this.board.tilesize * array[3] + .7 * this.board.tilesize, game.add.tween(this.hand).to({
            x: toX,
            y: toY
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1))
    }, G.Tutorial.prototype.addInputCells = function(inputCells) {
        if (inputCells) {
            this.board.inputController.possibleCandies = [];
            for (var i = 0; i < tutData.inputCells.length; i += 2) this.board.inputController.possibleCandies.push(this.board.getCandy(inputCells[i], inputCells[i + 1]))
        }
    }, G.Tutorial.prototype.finish = function() {
        this.overlay.hideAndClear(), this.state.boosterPanel.unlockInput(), G.saveState.data.finishedTutorials.push(this.tutorialNr), G.saveState.save(), this.tutData.afterMsg ? this.afterMsg(this.tutData.afterMsg, .85) : game.add.tween(this).to({
            alpha: 0
        }, 400, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            this.destroy()
        }, this), this.clearBoardCandyInput(), G.sb("onTutorialFinish").dispatch(), G.tutorialOpened = !1
    }, G.Tutorial.prototype.lockBoard = function() {
        this.state.board.inputController.possibleCandies = [{}]
    }, G.Tutorial.prototype.setBoardCandyInput = function(cells) {
        this.state.board.inputController.possibleCandies = [];
        for (var i = 0; i < cells.length; i += 2) this.state.board.inputController.possibleCandies.push(this.state.board.getCandy(cells[i], cells[i + 1]))
    }, G.Tutorial.prototype.clearBoardCandyInput = function(cells) {
        this.state.board.inputController.possibleCandies = []
    }, G.Tutorial.prototype.inputCellsToCandies = function(cells) {
        for (var result = [], i = 0; i < cells.length; i++) result.push(this.board.getCandy(cells[i], cells[i + 1]));
        return result
    }, G.Overlay = function() {
        this.bitmap = G.overlayBitmap, this.state = game.state.getCurrentState(), s.tutO = this, (game.width !== G.overlayBitmap.width || game.height !== G.overlayBitmap.height) && this.bitmap.resize(game.width, game.height), this.board = game.state.getCurrentState().board, this.img = this.bitmap.addToWorld(), this.img.x = game.world.bounds.x, this.img.alpha = 0, G.sb("onScreenResize").add(this.onResize, this), this.topBar = game.add.group(), this.topBar.position = this.state.topBar.position, this.boosterGroup = game.add.group(), this.boosterGroup.position = this.state.boosterPanel.position, this.tasks = [], this.aboveObjects = [], G.sb("closeOverlay").add(this.hideAndClear, this), G.sb("startOverlay").add(this.start, this), this.alphaValue = .7, this.boosterLabel = new G.UI_BoosterLabel(this.board), this.coinCounter = new G.UI_CoinCounter
    }, G.Overlay.prototype.hideAndClear = function() {
        G.stopTweens(this), game.add.tween(this.img).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function() {
            this.tasks = [], this.moveAboveObjectsToOriginalParents()
        }, this)
    }, G.Overlay.prototype.clearCell = function(x, y) {
        var tilesize = this.board.tilesize * this.board.scale.x,
            xx = this.board.x + x * tilesize,
            yy = this.board.y + y * tilesize;
        this.bitmap.context.clearRect(-game.world.bounds.x + xx, yy, tilesize, tilesize)
    }, G.Overlay.prototype.clearCells = function(array) {
        this.clearCellsArray = array;
        for (var i = 0, len = array.length; len > i; i += 2) this.clearCell(array[i], array[i + 1])
    }, G.Overlay.prototype.clearBoard = function(obj) {
        this.clearObject = obj;
        var tilesize = this.board.tilesize * this.board.scale.x,
            halfTilesize = .5 * tilesize;
        this.board.levelData.loop(function(val, x, y) {
            if (this.board.isCellOnBoard(x, y)) {
                var pxOut = this.board.cellToPxOut([x, y]);
                this.bitmap.context.clearRect(-game.world.bounds.x + pxOut[0] - halfTilesize - G.l(6), pxOut[1] - halfTilesize - G.l(6), tilesize + G.l(12), tilesize + G.l(12))
            }
        }, this)
    }, G.Overlay.prototype.onResize = function() {
        (game.width !== G.overlayBitmap.width || game.height !== G.overlayBitmap.height) && this.bitmap.resize(game.width, game.height), this.bitmap.fill(0, 0, 0, this.alphaValue), this.img.x = game.world.bounds.x, game.time.events.add(5, this.redoTasks, this)
    }, G.Overlay.prototype.redoTasks = function() {
        for (var i = this.tasks.length; i--;) {
            var task = this.tasks[i];
            this[task[0]].apply(this, task.slice(1))
        }
    }, G.Overlay.prototype.moveToAboveGroup = function(obj, aboveGroup) {
        obj.parent != this[aboveGroup] && (obj._originalParent = obj.parent, this[aboveGroup].add(obj), this.aboveObjects.push(obj))
    }, G.Overlay.prototype.moveAboveObjectsToOriginalParents = function() {
        for (var i = this.aboveObjects.length; i--;) {
            var obj = this.aboveObjects[i];
            obj._originalParent.add(obj)
        }
    }, G.Overlay.prototype.start = function(tasks) {
        G.stopTweens(this), this.tasks = tasks, this.bitmap.cls(), this.bitmap.fill(0, 0, 0, this.alphaValue), this.redoTasks(), 1 != this.img.alpha && game.add.tween(this.img).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UIFxLayer = function(board) {
        Phaser.Group.call(this, game), this.board = board, this.state = game.state.getCurrentState(), G.sb("UIfx").add(this.initEffect, this)
    }, G.UIFxLayer.prototype = Object.create(Phaser.Group.prototype), G.UIFxLayer.constructor = G.TopFxLayer, G.UIFxLayer.prototype.getFreeParticle = function() {
        return this.getFirstDead() || this.add(new G.FxParticle(this.board))
    }, G.UIFxLayer.prototype.initEffect = function(x, y, effect) {
        var part = this.getFreeParticle();
        return part[effect](x, y), part
    }, G.UIFxLayer.prototype.candyRainText = function() {
        G.sfx.xylophone_positive_12.play();
        var glow = G.makeImage(480, -50, "popup_lighht", .5, this);
        glow.blendMode = 1, glow.alpha = .5, glow.scale.setTo(0), glow.update = function() {
            this.angle += 1
        }, game.add.tween(glow.scale).to({
            x: 1.5,
            y: 1.5
        }, 1e3, Phaser.Easing.Elastic.Out, !0);
        var state = game.state.getCurrentState(),
            txt = new G.Text(480, -50, G.txt("Cookie Crush!"), {
                style: "font-blue",
                fontSize: 70
            }, .5, 580);
        txt.x = glow.x = state.board.x + .5 * state.board.width, txt.y = glow.y = state.board.y + .45 * state.board.height, txt.popUpAnimation(), game.add.tween(glow).to({
            alpha: 0
        }, 1e3, Phaser.Easing.Sinusoidal.In, !0, 1500), game.add.tween(txt).to({
            alpha: 0
        }, 1e3, Phaser.Easing.Sinusoidal.In, !0, 1500).onComplete.add(function() {
            txt.destroy()
        }), this.add(txt)
    }, G.UIFxLayer.prototype.initFeedbackText = function(matchNumber) {
        if (!this.feedbackText.alive) {
            G.stopTweens(this.feedbackText);
            var txt;
            4 == matchNumber && (txt = "good"), 5 == matchNumber && (txt = "nice"), matchNumber >= 6 && (txt = "amazing"), matchNumber >= 7 && (txt = "excellent"), matchNumber >= 8 && (txt = "cookielicious"), this.feedbackText.revive(), this.feedbackText.x = this.state.board.x + .5 * this.state.board.width, this.feedbackText.y = this.state.board.y + .5 * this.state.board.height, G.changeTexture(this.feedbackText, txt), this.feedbackText.alpha = 1, this.feedbackText.scale.setTo(0), game.add.tween(this.feedbackText.scale).to({
                x: 1,
                y: 1
            }, 500, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.feedbackText).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.In, !0, 1e3).onComplete.add(this.feedbackText.kill, this.feedbackText)
        }
    }, G.UI_BoosterPanel = function() {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.board = this.state.board, this.y = game.height, this.tweenObj = {
            angle: -15,
            alpha: 1
        }, game.add.tween(this.tweenObj).to({
            angle: 15
        }, 2e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.tween(this.tweenObj).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.bg = G.makeImage(7, 0, "bottom_ui_base", [0, 1], this), this.shadows = [G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg), G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg), G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg), G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg), G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg)], this.pauseBtn = new G.Button(60, -70, "btn_game_pause", function() {
            new G.Window("pause")
        }, this), this.add(this.pauseBtn), this.boostersBtn = [this.makeBoosterBtn(290, -64, 1), this.makeBoosterBtn(480, -64, 2), this.makeBoosterBtn(860, -64, 3), this.makeBoosterBtn(670, -64, 4)], G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onAllWindowsClosed").add(this.unlockInput, this), G.sb("onStateChange").add(this.lockInput, this), G.sb("actionQueueEmpty").add(function() {
            G.lvl.goalAchieved || this.checkSuggestions()
        }, this), G.sb("onGoalAchieved").add(function() {
            this.boostersBtn.forEach(function(e) {
                e.suggested = !1
            })
        }, this), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.UI_BoosterPanel.prototype = Object.create(Phaser.Group.prototype), G.UI_BoosterPanel.prototype.onScreenResize = function() {
        G.horizontal ? (this.x = 755, this.y = 55, G.changeTexture(this.bg, "left_ui_base"), this.bg.anchor.setTo(.5, 0), this.pauseBtn.x = 7, this.pauseBtn.y = 590, this.boostersBtn.forEach(function(e, i) {
            e.x = e.orgX = 7, e.y = e.orgY = 110 + 110 * i, this.shadows[0].x = this.pauseBtn.x - G.l(7), this.shadows[0].y = this.pauseBtn.y + 38, this.shadows[i + 1].x = e.x - G.l(7), this.shadows[i + 1].y = e.y + 44
        }, this)) : (this.x = 0, this.y = game.height, G.changeTexture(this.bg, "bottom_ui_base"), this.bg.anchor.setTo(0, 1), this.pauseBtn.x = 60, this.pauseBtn.y = G.l(-58), this.boostersBtn.forEach(function(e, i) {
            e.y = e.orgY = G.l(-64), e.x = e.orgX = G.l(180 + 125 * i), this.shadows[0].x = this.pauseBtn.x - G.l(7), this.shadows[0].y = this.pauseBtn.y + 38, this.shadows[i + 1].x = e.x - G.l(7), this.shadows[i + 1].y = e.y + 44
        }, this))
    }, G.UI_BoosterPanel.prototype.lockInput = function() {
        this.pauseBtn.input.enabled = !1, this.boostersBtn.forEach(function(child) {
            child.lock && child.lock()
        }, this)
    }, G.UI_BoosterPanel.prototype.unlockInput = function() {
        this.pauseBtn.input.enabled = !0, this.pauseBtn.input.useHandCursor = !0, this.boostersBtn.forEach(function(child) {
            child.unlock && child.unlock()
        }, this)
    }, G.UI_BoosterPanel.prototype.makeBoosterBtn = function(x, y, nr) {
        if (G.saveState.isBoosterUnlocked(nr)) {
            var btn = new G.UI_BoosterButton(x, y, nr);
            return this.add(btn)
        }
        return G.makeImage(x, y, "ui_booster_" + nr + "_locked", .5, this)
    }, G.UI_BoosterPanel.prototype.checkSuggestions = function() {
        this.boostersBtn.forEach(function(elem, index) {
            !G.lvl.goalAchieved && this["checkBooster" + (index + 1) + "Suggestion"]() ? elem.showSuggestion && elem.showSuggestion() : elem.hideSuggestion && elem.hideSuggestion()
        }, this)
    }, G.UI_BoosterPanel.prototype.checkBooster1Suggestion = function() {
        return !1
    }, G.UI_BoosterPanel.prototype.checkBooster2Suggestion = function() {
        return !1
    }, G.UI_BoosterPanel.prototype.checkBooster3Suggestion = function() {
        return !1
    }, G.UI_BoosterPanel.prototype.checkBooster4Suggestion = function() {
        return !1
    }, G.UI_BoosterPanel.prototype.checkIfBlocker = function(x, y) {
        if (this.board.boardIce.isToken(x, y) || this.board.boardDirt.isToken(x, y) || this.board.boardCage.isToken(x, y)) return !0;
        var candy = this.board.getCandy(x, y);
        return candy && (candy.wrapped || candy.infected)
    }, G.UI_GoalPanelCollect = function(x, y) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.state = game.state.getCurrentState(), this.objectsToCollect = JSON.parse(JSON.stringify(G.lvlData.goal[1])), this.panels = [], this.makePanels(this.objectsToCollect), G.sb("onTaskAmountChanged").add(this.updateDisplay, this), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.UI_GoalPanelCollect.prototype = Object.create(Phaser.Group.prototype), G.UI_GoalPanelCollect.prototype.onScreenResize = function() {
        var horizontal = G.horizontal;
        if (horizontal) this.refreshPanelsHorizontalPositions();
        else {
            var width = G.l(260);
            2 == this.panels.length ? width = G.l(130) : 3 == this.panels.length && (width = G.l(210));
            var distance = 0;
            this.panels.length - 1 && (distance = width / (this.panels.length - 1));
            var startX = width * Math.sign(distance) * -.5;
            this.panels.forEach(function(child, index) {
                child.x = startX + index * distance, child.y = 0, child.scale.setTo(.5)
            })
        }
        this.panels.forEach(function(panel) {
            horizontal ? panel.turnHorizontal() : panel.turnVertical()
        })
    }, G.UI_GoalPanelCollect.prototype.getGoalPanel = function(goalName) {
        for (var i = 0, len = this.panels.length; len > i; i++)
            if (this.panels[i].goalName == goalName) return this.panels[i]
    }, G.UI_GoalPanelCollect.prototype.updateDisplay = function(type, change) {
        var panel = this.getGoalPanel(type);
        if (panel.nr.alive && panel.nr.alive) {
            var newValue = parseInt(panel.nr.text) - 1;
            panel.nr.setText(newValue), 0 == newValue && panel.nr.alive && (panel.checkmark.visible = !0, panel.nr.destroy())
        }
    }, G.UI_GoalPanelCollect.prototype.makePanel = function(x, y, name, number, scale) {
        var gfxName = G.json.settings.goals[name].sprite,
            panel = game.make.group();
        panel.x = G.l(x), panel.y = G.l(y), panel.scale.setTo(scale), panel.goalName = name, panel.amount = number, panel.nr = panel.add(new G.Text(38, 0, number.toString(), {
            style: "font-beige",
            fontSize: "60px"
        }, .5, 85)), panel.img = G.makeImage(-40, 0, gfxName, .5, panel), panel.imgFade = G.makeImage(-40, 0, gfxName, .5, this), panel.imgFade.alpha = 0, panel.checkmark = G.makeImage(panel.nr.x, panel.nr.y, "task_complete", [1, .5], panel), panel.checkmark.position = panel.nr.position, panel.checkmark.anchor = panel.nr.anchor, panel.checkmark.visible = !1, panel.turnHorizontal = function() {
            this.img.x = 0, this.nr.x = 0, this.nr.y = G.l(60), this.nr.anchor.setTo(.5), this.nr.cacheAsBitmap = !1
        }, panel.turnVertical = function() {
            this.img.x = G.l(-40), this.nr.x = G.l(38), this.nr.y = 0, this.nr.anchor.setTo(.5), this.nr.cacheAsBitmap = !1
        }, panel.fadeAnim = function() {
            G.stopTweens(this.imgFade), this.imgFade.scale.setTo(0), this.imgFade.alpha = 1, game.add.tween(this.imgFade).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.imgFade.scale).to({
                x: 2,
                y: 2
            }, 300, Phaser.Easing.Sinusoidal.Out, !0)
        }, this.add(panel), this.panels.push(panel)
    }, G.UI_GoalPanelCollect.prototype.makePanels = function(objects) {
        1 == objects.length && this.makePanel(0, -25, objects[0][0], objects[0][1], .8), 2 == objects.length && (this.makePanel(-30, 0, objects[0][0], objects[0][1], .6), this.makePanel(30, 0, objects[1][0], objects[1][1], .6)), 3 == objects.length && (this.makePanel(-60, 0, objects[0][0], objects[0][1], .6), this.makePanel(0, 0, objects[1][0], objects[1][1], .6), this.makePanel(60, 0, objects[2][0], objects[2][1], .6)), 4 == objects.length && (this.makePanel(-120, 0, objects[0][0], objects[0][1], .6), this.makePanel(-40, 0, objects[1][0], objects[1][1], .6), this.makePanel(40, 0, objects[2][0], objects[2][1], .6), this.makePanel(120, 0, objects[3][0], objects[3][1], .6))
    }, G.UI_GoalPanelCollect.prototype.refreshPanelsHorizontalPositions = function() {
        var coll1 = G.l(-40),
            coll2 = G.l(40),
            row1 = G.l(-60),
            row2 = G.l(30);
        1 == this.panels.length ? (this.panels[0].x = 0, this.panels[0].y = -25, this.panels[0].scale.setTo(.8)) : 2 == this.panels.length ? (this.panels[0].x = 0, this.panels[0].y = row1, this.panels[0].scale.setTo(.6), this.panels[1].x = 0, this.panels[1].y = row2, this.panels[1].scale.setTo(.6)) : 3 == this.panels.length ? (this.panels[0].x = coll1, this.panels[0].y = row1, this.panels[0].scale.setTo(.6), this.panels[1].x = coll2, this.panels[1].y = row1, this.panels[1].scale.setTo(.6), this.panels[2].x = coll1, this.panels[2].y = row2, this.panels[2].scale.setTo(.6)) : 4 == this.panels.length && (this.panels[0].x = coll1, this.panels[0].y = row1, this.panels[0].scale.setTo(.6), this.panels[1].x = coll2, this.panels[1].y = row1, this.panels[1].scale.setTo(.6), this.panels[2].x = coll1, this.panels[2].y = row2, this.panels[2].scale.setTo(.6), this.panels[3].x = coll2, this.panels[3].y = row2, this.panels[3].scale.setTo(.6))
    }, G.UI_GoalPanelPoints = function(x, y) {
        Phaser.Group.call(this, game), this.x = G.l(x), this.y = G.l(y), this.state = game.state.getCurrentState(), this.objectsToCollect = JSON.parse(JSON.stringify(G.lvlData.goal[1])), this.pointsTxt = new G.Text(0, 0, G.capitalize(G.txt("points")) + ":", {
            fontSize: 40,
            style: "font-beige"
        }, .5, 150), this.labelTxt = new G.Text(0, 0, "/" + G.lvlData.goal[1], {
            style: "font-beige",
            fontSize: 40
        }, .5, 150), this.pointsCounter = new G.Text(0, 0, 0, {
            style: "font-beige",
            fontSize: 40
        }, .5, 150), this.pointsTarget = G.lvlData.goal[1], this.add(this.pointsTxt), this.add(this.labelTxt), this.add(this.pointsCounter), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.UI_GoalPanelPoints.prototype = Object.create(Phaser.Group.prototype), G.UI_GoalPanelPoints.prototype.update = function() {
        this.centerTexts(), this.pointsCounter.setText(this.state.topBar.pointsCounter.text)
    }, G.UI_GoalPanelPoints.prototype.onScreenResize = function() {
        this.centerTexts()
    }, G.UI_GoalPanelPoints.prototype.centerTexts = function() {
        if (G.horizontal) this.pointsCounter.x = 0, this.pointsCounter.anchor.x = .5, this.labelTxt.anchor.x = .5, this.pointsTxt.visible = !0, this.pointsTxt.y = -40, this.labelTxt.y = 40;
        else {
            this.pointsTxt.visible = !1, this.labelTxt.anchor.x = 0, this.pointsCounter.anchor.x = 1;
            var xx = (this.pointsCounter.width + this.labelTxt.width) * -.5;
            this.pointsCounter.x = xx + this.pointsCounter.width, this.pointsCounter.y = 0, this.labelTxt.x = xx + this.pointsCounter.width, this.labelTxt.y = 0
        }
    }, G.UI_MapPanel = function() {
        Phaser.Group.call(this, game), this.fixedToCamera = !0, this.cameraOffset.x = Math.floor(.5 * game.width), this.bg = G.makeImage(0, 0, "top-panel-bg", [.5, 0], this), this.bg.inputEnabled = !0, this.state = game.state.getCurrentState(), this.soundBtn = new G.SoundBtn(275, 35), this.add(this.soundBtn), this.soundBtn.scale.setTo(.35);
        var starsAmount = G.saveState.getAllStars() - (this.state.lastLevelData ? this.state.lastLevelData.starImprovement : 0);
        this.starsIcon = G.makeImage(0, 36, "top-panel-starsBg", .5, this), this.starsTxt = new G.Text(-240, 40, starsAmount.toString(), {
            style: "font-beige",
            fontSize: 30
        }, .5, 80), this.starsTxt.currentVal = G.saveState.getAllStars() - (this.state.lastLevelData ? this.state.lastLevelData.starImprovement : 0), this.add(this.starsTxt), this.coinsBg = G.makeImage(0, 37, "top-panel-coinsBg", .5, this), this.coinsTxt = new G.Text(-40, 40, G.saveState.getCoins().toString(), {
            style: "font-beige",
            fontSize: 30
        }, .5, 110), this.coinsTxt.currentVal = G.saveState.getCoins() - (this.state.lastLevelData ? this.state.lastLevelData.reward : 0), this.add(this.coinsTxt), this.logo = G.makeImage(0, 40, "ja" === G.lang ? "logo-mini-ja" : "logo-mini", .5, this), this.plusIcon = new G.Button(200, 38, "btn_plus", function() {
            new G.Window("moreMoney")
        }, this), this.plusIcon.scale.setTo(.75), this.add(this.plusIcon), this.lifeUI = new G.UI_Life(-220, 36), this.add(this.lifeUI), game.incentivised || (this.plusIcon.visible = !1), this.fxLayer = new G.UI_MapPanelFxLayer(this), G.sb("onScreenResize").add(this.onResize, this), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onAllWindowsClosed").add(this.unlockInput, this), G.sb("onStateChange").add(this.lockInput, this), G.sb("onCoinsChange").add(function(coins) {
            this.coinsTxt.setText(coins.toString())
        }, this), G.sb("onMapToUIPartFinished").add(function(part) {
            G.sfx.pop.play(), "coin" == part.rewardType ? (this.coinsTxt.setText(this.coinsTxt.currentVal + part.coinValue), this.coinsTxt.currentVal += part.coinValue) : this.starsTxt.setText(++this.starsTxt.currentVal)
        }, this), this.onResize()
    }, G.UI_MapPanel.prototype = Object.create(Phaser.Group.prototype), G.UI_MapPanel.prototype.lockInput = function() {
        this.ignoreChildInput = !0
    }, G.UI_MapPanel.prototype.unlockInput = function() {
        this.ignoreChildInput = !1
    }, G.UI_MapPanel.prototype.resizeShortConfig = {
        bgTexture: "top-panel-bg",
        logoVisibility: !1,
        life: -220,
        sound: 275,
        lifeOn: {
            stars: -55,
            coins: 110,
            lifeVisibility: !0
        },
        lifeOff: {
            stars: -215,
            coins: -35,
            lifeVisibility: !1
        }
    }, G.UI_MapPanel.prototype.resizeLongConfig = {
        bgTexture: "top-panel-horizontal-bg",
        logoVisibility: !0,
        life: -450,
        sound: 495,
        lifeOn: {
            stars: -270,
            coins: 290,
            lifeVisibility: !0
        },
        lifeOff: {
            stars: -285,
            coins: -105,
            lifeVisibility: !1
        }
    }, G.UI_MapPanel.prototype.onResize = function() {
        this.cameraOffset.x = Math.floor(.5 * game.width);
        var config = this[game.width < 1070 ? "resizeShortConfig" : "resizeLongConfig"];
        G.changeTexture(this.bg, config.bgTexture), this.logo.visible = config.logoVisibility, this.lifeUI.x = config.life, this.soundBtn.x = config.sound;
        var configSpec = config[G.LIVES ? "lifeOn" : "lifeOff"];
        this.moveStarsTo(configSpec.stars), this.moveCoinsTo(configSpec.coins), this.lifeUI.visible = configSpec.lifeVisibility
    }, G.UI_MapPanel.prototype.moveStarsTo = function(x) {
        this.starsIcon.x = x, this.starsTxt.x = this.starsIcon.centerX + 15
    }, G.UI_MapPanel.prototype.moveCoinsTo = function(x) {
        this.coinsBg.x = x, this.coinsTxt.x = this.coinsBg.centerX + 15, this.plusIcon.x = this.coinsBg.x + 90
    }, G.UI_MapPanelFxLayer = function(mapPanel) {
        Phaser.Group.call(this, game), this.mapPanel = mapPanel, G.sb("onMapToUIPart").add(function(obj) {
            this.getFreeParticle().init(obj)
        }, this)
    }, G.UI_MapPanelFxLayer.prototype = Object.create(Phaser.Group.prototype), G.UI_MapPanelFxLayer.prototype.getFreeParticle = function() {
        return this.getFirstDead() || this.add(new G.UI_MapPanelFxPart(this.mapPanel))
    }, G.UI_MapPanelFxLayer.prototype.update = function() {
        this.sort("y", Phaser.Group.SORT_ASCENDING)
    }, G.UI_MapPanelFxPart = function(mapPanel) {
        Phaser.Image.call(this, game), this.kill(), this.anchor.setTo(.5), this.mapPanel = mapPanel
    }, G.UI_MapPanelFxPart.prototype = Object.create(Phaser.Image.prototype), G.UI_MapPanelFxPart.prototype.init = function(obj) {
        this.revive(), this.x = obj.worldPosition.x + game.world.bounds.x, this.y = obj.worldPosition.y, this.coinValue = obj.coinValue, this.scale.setTo(obj.scale.x), this.rewardType = obj.rewardType, G.changeTexture(this, obj.frameName);
        var target = "coin" == obj.rewardType ? this.mapPanel.coinsTxt : this.mapPanel.starsTxt,
            targetX = target.worldPosition.x + game.world.bounds.x,
            targetY = target.worldPosition.y;
        game.add.tween(this.scale).to({
            width: 1.5 * this.width,
            height: 1.5 * this.height
        }, 250, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            game.add.tween(this).to({
                x: targetX,
                y: targetY,
                width: target.width,
                height: target.height
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function() {
                G.sb("onMapToUIPartFinished").dispatch(this), this.destroy()
            }, this)
        }, this)
    }, G.UI_PointsCounter = function(x, y) {
        G.Text.call(this, x, y, G.capitalize(G.txt("points")) + ": 0", {
            style: "font-beige",
            fontSize: "32px"
        }, .5, 320), this.points = 0, this.pointsTarget = 0, G.sb("onPointsChange").add(function(amount) {
            this.pointsTarget = amount
        }, this), game.add.existing(this)
    }, G.UI_PointsCounter.prototype = Object.create(G.Text.prototype), G.UI_PointsCounter.prototype.update = function() {
        this.points != this.pointsTarget && (this.points += game.math.clamp(Math.ceil(.2 * (this.pointsTarget - this.points)), 0, this.pointsTarget - this.points), this.setText(G.capitalize(G.txt("points")) + ": " + this.points.toString()))
    }, G.UI_ProgressBar = function(x, y) {
        Phaser.Group.call(this, game);
        var lvl = G.lvlData;
        this.x = G.l(x), this.y = G.l(y), this.points = 0, this.pointsTarget = 0, this.barMaxPoints = 1.2 * lvl.starsReq[2], this.barProgress = G.makeImage(0, 0, "ingame_progress_bar", [.5, 1], this), this.barProgressMask = game.add.graphics(), this.add(this.barProgressMask), this.barProgressMask.position = this.barProgress.position, this.barProgress.mask = this.barProgressMask, this.barProgressMask.beginFill(0), G.drawCircleSegment(this.barProgressMask, 0, 0, 100, 170, 171);
        var distance = 84;
        this.stars = [G.makeImage(G.lengthDirX(this.pointsToAngle(lvl.starsReq[0]), distance + 15, !1), 5 + G.lengthDirY(this.pointsToAngle(lvl.starsReq[0]), distance + 15, !1), "progress_bar_star_1", .5, this), G.makeImage(G.lengthDirX(this.pointsToAngle(lvl.starsReq[1]), distance + 15, !1), 5 + G.lengthDirY(this.pointsToAngle(lvl.starsReq[1]), distance + 15, !1), "progress_bar_star_2", .5, this), G.makeImage(G.lengthDirX(this.pointsToAngle(lvl.starsReq[2]), distance + 15, !1), 5 + G.lengthDirY(this.pointsToAngle(lvl.starsReq[2]), distance + 15, !1), "progress_bar_star_3", .5, this)], this.stars.forEach(function(elem, index) {
            elem.req = lvl.starsReq[index]
        }), G.sb("onPointsChange").add(function(amount) {
            this.pointsTarget = amount
        }, this)
    }, G.UI_ProgressBar.prototype = Object.create(Phaser.Group.prototype), G.UI_ProgressBar.prototype.pointsToAngle = function(points) {
        return game.math.clamp(180 + points / this.barMaxPoints * 180, 0, 380)
    }, G.UI_ProgressBar.prototype.update = function() {
        this.points != this.pointsTarget && this.changePoints(game.math.clamp(Math.ceil(.05 * (this.pointsTarget - this.points)), 0, this.pointsTarget - this.points))
    }, G.UI_ProgressBar.prototype.changePoints = function(change) {
        var oldPoints = this.points;
        this.points += change, this.barProgressMask.clear(), this.barProgressMask.beginFill(0), G.drawCircleSegment(this.barProgressMask, 0, 0, 100, 90, this.pointsToAngle(this.points));
        for (var i = 0; 3 > i; i++) oldPoints < this.stars[i].req && this.stars[i].req <= this.points && (G.lvl.stars++, 2 > i ? G.sfx.xylophone_positive.play() : G.sfx.xylophone_positive2.play(), game.add.tween(this.stars[i].scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), G.sb("UIfx").dispatch(this.stars[i].worldPosition.x + game.world.bounds.x, this.stars[i].worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.stars[i].worldPosition.x + game.world.bounds.x, this.stars[i].worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.stars[i].worldPosition.x + game.world.bounds.x, this.stars[i].worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.stars[i].worldPosition.x + game.world.bounds.x, this.stars[i].worldPosition.y, "whiteStarPart"))
    }, G.UI_TopBar = function(lvl) {
        Phaser.Group.call(this, game), this.bg = G.makeImage(320, -2, "top_ui_new", [.5, 0], this), this.progressBar = new G.UI_ProgressBar(132, 110), this.movesLeft = G.lvl.moves, this.movesTxt = new G.Text(130, 75, G.txt("Moves"), {
            style: "font-beige",
            fontSize: 25
        }, [.5, 0], 75), this.add(this.movesTxt), this.movesAmountTxt = new G.Text(130, 100, G.lvl.moves, {
            style: "font-beige",
            fontSize: 30
        }, [.5, 0], 160), this.add(this.movesAmountTxt), "collect" == G.lvlData.goal[0] ? this.goalPanel = new G.UI_GoalPanelCollect(410, 50) : this.goalPanel = new G.UI_GoalPanelPoints(410, 50), this.pointsCounter = new G.UI_PointsCounter(405, 100), this.extraMovesBtn = new G.UI_ExtraMovesBuyButton, this.extraMovesBtn.x = 250, this.extraMovesBtn.targetY = 100, G.sb("changeMoveNumber").add(function() {
            this.movesAmountTxt.setText(G.lvl.moves.toString())
        }, this), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.UI_TopBar.prototype = Object.create(Phaser.Group.prototype), G.UI_TopBar.prototype.onScreenResize = function() {
        G.horizontal ? (G.changeTexture(this.bg, "top_ui_horizontal"), this.position.setTo(-80, 90), this.bg.position.setTo(0, 0), this.movesTxt.position.setTo(0, 70), this.movesAmountTxt.position.setTo(0, 95), this.extraMovesBtn.x = -80, this.extraMovesBtn.targetY = 80, this.progressBar.position.setTo(this.x, this.y + 113), this.pointsCounter.position.setTo(this.x, this.y + 208), this.goalPanel.position.setTo(this.x, this.y + 415)) : (G.changeTexture(this.bg, "top_ui_new"), this.position.setTo(0, 0), this.bg.position.setTo(320, -2), this.movesTxt.position.setTo(130, 70), this.movesAmountTxt.position.setTo(130, 95), this.extraMovesBtn.x = 250, this.extraMovesBtn.targetY = 100, this.progressBar.position.setTo(132, 110), this.pointsCounter.position.setTo(405, 100), this.goalPanel.position.setTo(410, 50))
    }, G.WindowLayer = function(offsetH, offsetV) {
        this.fadeImg = game.add.graphics(0, 0), this.fadeImg.fixedToCamera = !0, this.fadeImg.cameraOffset.x = -5, this.fadeImg.width = game.width + 10, this.fadeImg.height = game.height, this.fadeImg.alpha = 0, this.inputLayer = G.makeImage(0, 0, null, .5), this.inputLayer.inputEnabled = !0, this.inputLayer.events.onInputDown.add(function() {}, this), this.inputLayer.hitArea = new Phaser.Rectangle(-1e4, -1e4, 2e4, 2e4), Phaser.Group.call(this, game), this.fixedToCamera = !0, this.prevLength = 0, this.dispatch = !1, this.offsetH = G.l(offsetH || 0), this.offsetV = G.l(offsetV || 0), this.queue = [], G.sb("onScreenResize").add(this.resize, this), G.sb("onWindowOpened").add(this.cacheWindow, this), G.sb("onWindowClosed").add(this.onWindowClosed, this), G.sb("pushWindow").add(this.pushWindow, this), G.sb("closeAndOpenWindow").add(function(windowToOpen, windowToGoBack) {
            this.children.length > 0 && this.children[0].closeWindow(), this.pushWindow([windowToOpen, windowToGoBack])
        }, this), this.resize()
    }, G.WindowLayer.prototype = Object.create(Phaser.Group.prototype), G.WindowLayer.constructor = G.WindowLayer, G.WindowLayer.prototype.resize = function() {
        this.cameraOffset.x = Math.floor(.5 * game.width) + this.offsetH, this.cameraOffset.y = Math.floor(.5 * game.height) + this.offsetV, this.fadeImg.clear(), this.fadeImg.beginFill(0, .7), this.fadeImg.drawRect(0, 0, game.width + 100, game.height + 100)
    }, G.WindowLayer.prototype.update = function() {
        this.prevLength > 0 && 0 == this.length && (this.dispatch = !0), 0 == this.length ? (this.inputLayer.visible = !1, this.fadeImg.alpha = Math.max(0, this.fadeImg.alpha - .1), this.dispatch && 0 == this.fadeImg.alpha && (G.sb("onWindowClosed").dispatch(this), this.dispatch = !1)) : (this.inputLayer.visible = !0, this.children[0].stopFade || (this.fadeImg.alpha = Math.min(1, this.fadeImg.alpha + .1))), this.length > 0 && this.children[0].update()
    }, G.WindowLayer.prototype.onWindowClosed = function() {
        if (this.queue.length > 0) {
            var args = this.queue.splice(0, 1);
            new G.Window(args[0])
        } else G.sb("onAllWindowsClosed").dispatch()
    }, G.WindowLayer.prototype.cacheWindow = function(win) {
        this.add(win)
    }, G.WindowLayer.prototype.pushWindow = function(type, unshift) {
        0 == this.queue.length && 0 == this.children.length ? new G.Window(type) : unshift ? this.queue.unshift(type) : this.queue.push(type)
    }, G.WindowLayer.prototype.push = G.WindowLayer.prototype.pushWindow, G.WinStarPart = function(x, y, autostart) {
        Phaser.Image.call(this, game, x, y), G.changeTexture(this, "starPart"), this.anchor.setTo(.5), this.visible = !1, this.scale.setTo(1.5), this.grav = G.lnf(.75), autostart ? this.start() : this.visible = !1
    }, G.WinStarPart.prototype = Object.create(Phaser.Image.prototype), G.WinStarPart.prototype.start = function() {
        this.visible = !0, this.spdX = G.lnf(25 * Math.random() - 12.5), this.spdY = G.lnf(-15 * Math.random() - 5), this.angle = 360 * Math.random()
    }, G.WinStarPart.prototype.update = function() {
        this.visible && (this.x += this.spdX, this.y += this.spdY, this.spdX *= .98, this.angle += this.spdX, this.spdY += this.grav, this.alpha -= .02, this.alpha <= 0 && this.destroy())
    }, G.WorldMap = function(maptiles, animElements, levels, editorMode) {
        function mouseWheel(event) {
            return this.alive ? void(this.y += 300 * game.input.mouse.wheelDelta) : game.input.mouse.mouseWheelCallback = null
        }
        Phaser.Group.call(this, game), this.inputLayer = G.makeImage(0, 0, null), this.inputLayer.inputEnabled = !0, this.inputLayer.events.onInputDown.add(function() {
            this.clicked = !0
        }, this), this.inputLayer.hitArea = new Phaser.Rectangle(-1e4, -1e4, 2e4, 2e4), this.clicked = !1, this.x = .5 * G.l(640), this.centerX = .5 * G.l(640), this.y = game.height, this.editorMode = editorMode, this.state = game.state.getCurrentState(), this.processMaptilesStatic(), this.worldMapSides = new G.WorldMapSides(this), this.btnLayer = new G.WorldMapLvls(this), this.chestLayer = new G.WorldMapChestDynamicLayer(this), this.cloudLayer = new G.WorldMapCloudDynamicLayer(this), this.gateLayer = new G.WorldMapGateLayer(this), this.bubbleGiftLayer = new G.WorldMapBubbleGiftDynamicLayer(this), editorMode && (game.input.mouse.mouseWheelCallback = mouseWheel.bind(this), this.prevX = null, this.prevY = null, this.update = function() {
            this.x = 700, game.input.activePointer.middleButton.isDown ? (null !== this.prevX && (this.y -= 3 * (this.prevY - game.input.activePointer.y)), this.prevX = game.input.activePointer.x, this.prevY = game.input.activePointer.y) : (this.prevX = null, this.prevY = null)
        }), this.mapWidth = 1.1 * this.width, this.localBounds = this.getLocalBounds(), this.additionalMargin = G.l(50), this.velX = 0, this.velY = 0, this._x = G.l(320), this._y = this.y;
        this.state.lastLevelData;
        this.lockedInput = !1, this.centerOnLvl(G.saveState.getLastPassedLevelNr());
        var lastLevelData = this.state.lastLevelData;
        this.postLevelFlow(lastLevelData)
    }, G.WorldMap.prototype = Object.create(Phaser.Group.prototype), G.WorldMap.prototype.postLevelFlow = function(lastLevelData) {
        lastLevelData && (lastLevelData.starImprovement > 0 || lastLevelData.reward > 0) && !lastLevelData.challenge && (this.lockInput(), lastLevelData.mysteryGiftStreakIncrease && G.saveState.mysteryGift_getCurrentStreak() < 4 ? game.time.events.add(1, function() {
            G.sb("pushWindow").dispatch("mysteryGiftStreakIncrese"), G.sb("onAllWindowsClosed").addOnce(function() {
                this.startBatches(lastLevelData)
            }, this)
        }, this) : game.time.events.add(500, function() {
            this.startBatches(lastLevelData)
        }, this))
    }, G.WorldMap.prototype.startBatches = function(lastLevelData) {
        this.batchesWaitingForFinish = 0, lastLevelData.starImprovement > 0 && this.afterLvlPartBatch(lastLevelData.lvlNr, lastLevelData.starImprovement, "stars"), lastLevelData.reward > 0 && this.afterLvlPartBatch(lastLevelData.lvlNr, lastLevelData.reward, "coins"), 0 == this.batchesWaitingForFinish && this.afterBatch()
    }, G.WorldMap.prototype.centerOnLvl = function(lvlNr) {
        lvlNr = Math.min(G.json.levels.length - 1, lvlNr);
        var mapX = G.l(G.json.levels[lvlNr].mapX),
            mapY = G.l(G.json.levels[lvlNr].mapY);
        this.x = this._x = 320 - mapX, this.y = this._y = game.math.clamp(game.height + (Math.abs(mapY) - .5 * game.height), game.height, Math.max(game.height, this.mapHeight)), this.updatePosition()
    }, G.WorldMap.prototype.scrollToPoint = function(config, callback, context) {
        var pos = {};
        this.chestScroll = !0, this.lockInput();
        var diff = Math.max(0, .5 * (1200 - game.width));
        config.lvlNr ? (config.lvlNr = Math.min(G.json.levels.length - 1, config.lvlNr), pos.x = game.math.clamp(320 - G.json.levels[config.lvlNr].mapX, 320 - diff, 320 + diff), pos.y = game.math.clamp(game.height + (Math.abs(G.json.levels[config.lvlNr].mapY) - .5 * game.height), game.height, Math.max(game.height, this.mapHeight))) : (pos.x = game.math.clamp(320 - config.x, 320 - diff, 320 + diff), pos.y = game.math.clamp(game.height + (Math.abs(config.y) - .5 * game.height), game.height, Math.max(game.height, this.mapHeight)));
        var tween = game.add.tween(this).to({
            x: pos.x,
            _x: pos.x,
            y: pos.y,
            _y: pos.y
        }, 1300, Phaser.Easing.Sinusoidal.InOut, !0);
        tween.onComplete.add(function() {
            this.chestScroll = !1, this.unlockInput()
        }, this), callback && tween.onComplete.add(callback, context)
    }, G.WorldMap.prototype.update = function() {
        if (!this.chestScroll && !this.lockedInput) {
            if (this.state.windowLayer.children.length > 0) return this.velY = 0, void(this.velX = 0);
            this.clicked && game.input.activePointer.isDown ? (null != this.prevY && (this.velY = game.input.activePointer.y - this.prevY), this.prevY = game.input.activePointer.y, null != this.prevX && (this.velX = game.input.activePointer.x - this.prevX), this.prevX = game.input.activePointer.x) : (this.clicked = !1, this.prevY = null, this.prevX = null), this._x += this.velX, this._y += this.velY, this.velX *= .95, this.velY *= .95, this.updatePosition()
        }
    }, G.WorldMap.prototype.updatePosition = function() {
        var mapHeight = Math.min(this.mapHeight, this.gateLayer.getMinY() + 500);
        this.state.EDITOR && (mapHeight = this.mapHeight), this._y = game.math.clamp(this._y, game.height, Math.max(game.height, mapHeight)), this.y = game.math.clamp(Math.round(this._y), game.height, Math.max(game.height, mapHeight));
        var diff = Math.max(0, .5 * (1200 - game.width));
        this._x = game.math.clamp(this._x, 320 - diff, 320 + diff), this.x = Math.ceil(this._x)
    }, G.WorldMap.prototype.processMaptiles = function(maptiles) {
        this.mapHeight = maptiles.totalHeight, this.editorMode && (this.mapHeight *= 2);
        for (var i = 0; i < maptiles.tiles.length; i++) {
            var tile = maptiles.tiles[i],
                rt = game.cache.getRenderTexture(tile.rt);
            img = game.make.image(0, tile.y, rt.texture), img.anchor.setTo(.5, 1), img.autoCull = !0, this.add(img)
        }
    }, G.WorldMap.prototype.processMaptilesStatic = function() {
        this.mapHeight = G.json.settings.mapHeight, this.editorMode && (this.mapHeight *= 2);
        for (var targetY = G.json.settings.mapHeight, tileIndex = 0, currentY = 0; targetY > 0;) {
            var spriteName = "Map_background_tileable_" + tileIndex % 4,
                tile = G.makeImage(0, currentY, spriteName, [.5, 1], this);
            tile.autoCull = !0;
            var tileSize = game.cache.getFrame(spriteName).height;
            currentY -= tileSize, targetY -= tileSize, tileIndex++
        }
    }, G.WorldMap.prototype.refreshButtons = function() {
        this.btnLayer.refreshData()
    }, G.WorldMap.prototype.processAnimElements = function(animElements) {
        animElements.forEach(function(child) {
            var elem = G.makeImage(child[0], child[1], child[2], .5, this);
            elem.tweenY = game.add.tween(elem).to({
                y: elem.y - G.l(20)
            }, 5e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), elem.angle = -15, elem.tweenAngle = game.add.tween(elem).to({
                angle: 15
            }, 1e4, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), elem.tweenY.timeline[0].dt = Math.random() * elem.tweenY.timeline[0].duration, elem.tweenAngle.timeline[0].dt = Math.random() * elem.tweenAngle.timeline[0].duration
        }, this)
    }, G.WorldMap.prototype.lockInput = function() {
        this.lockedInput = !0, this.btnLayer.ignoreChildInput = !0, this.chestLayer.lockInput(), this.gateLayer.lockInput()
    }, G.WorldMap.prototype.unlockInput = function() {
        this.lockedInput = !1, this.btnLayer.ignoreChildInput = !1, this.chestLayer.unlockInput(), this.gateLayer.unlockInput()
    }, G.WorldMap.prototype.afterLvlPartBatch = function(lvlNr, amount, objType) {
        var coins = "coins" == objType,
            btn = this.btnLayer.getButtonObj(lvlNr);
        if (btn) {
            var batch = this.state.uiTargetParticlesBW.createDividedBatch(game.world.bounds.x + btn.worldPosition.x, btn.worldPosition.y, coins ? "coin_1" : "map_star_1", coins ? this.state.panel.coinsTxt : this.state.panel.starsTxt, amount, coins ? 5 : 1);
            batch.addOnPartStart(function() {
                coins && this.scale.setTo(.75), this.speedDelta = 1.5, this.speedMax = 35;
                var verOffsetY = 0,
                    verVelY = G.lnf(-2 * Math.random() - 5),
                    velX = game.rnd.realInRange(-2.5, 2.5),
                    yy = this.y,
                    velYY = game.rnd.realInRange(-2.5, 2.5),
                    grounded = !1;
                this.update = function() {
                    this.grounded || (this.x += velX, yy += velYY, verOffsetY += verVelY, verOffsetY > 0 ? Math.abs(verVelY) > 4 ? verVelY *= -.7 : (verVelX = 0, velX = 0, velYY = 0, grounded = !0, game.time.events.add(game.rnd.between(200, 600), function() {
                        this.update = G.UITargetParticle.prototype.update
                    }, this)) : verVelY += .5, verOffsetY = Math.min(0, verOffsetY), this.y = yy + verOffsetY)
                }
            }), batch.addOnPartFinish(function() {
                if (coins) G.saveState.changeCoins(this.carriedValue, !0);
                else {
                    var starsTxt = this.state.panel.starsTxt;
                    starsTxt.setText(parseInt(starsTxt.text) + 1)
                }
            }), this.batchesWaitingForFinish++, batch.onFinish.add(function() {
                this.batchesWaitingForFinish--, 0 == this.batchesWaitingForFinish && (this.afterBatch(), G.saveState.save())
            }, this), batch.start()
        }
    }, G.WorldMap.prototype.afterBatch = function() {
        var allStars = G.saveState.getAllStars(),
            unlockedChest = G.json.settings.mapChests.filter(function(chestData) {
                return chestData.req <= allStars && !G.saveState.data.mapChests[chestData.id]
            })[0];
        if (unlockedChest) this.scrollToPoint({
            x: unlockedChest.mapX,
            y: unlockedChest.mapY
        }), G.sb("mapChestWindowClosed").addOnce(function() {
            this.scrollToPoint({
                lvlNr: G.saveState.getLastPassedLevelNr()
            })
        }, this);
        else {
            if (this.unlockInput(), G.saveState.getLastPassedLevelNr() == G.json.levels.length) return;
            if (G.saveState.getLastPassedLevelNr() === G.saveState.getFirstClosedGateLvLIndex()) return;
            var giftBubble = G.json.settings.bubbleGifts.find(function(obj) {
                return obj.levelNumber - 1 == G.saveState.getLastPassedLevelNr() && !G.saveState.isBubbleGiftUsed(obj.levelNumber)
            });
            if (!giftBubble) {
                game.math.clamp(G.saveState.getLastPassedLevelNr(), 0, G.json.levels.length - 1);
                G.lvlNr = G.saveState.getLastPassedLevelNr(), G.lvlData = G.json.levels[G.saveState.getLastPassedLevelNr()], G.sb("pushWindow").dispatch("level")
            }
        }
    }, G.WorldMapCoinLayer = function(worldMap) {
        Phaser.Group.call(this, game), this.position = worldMap.position, this.inputEnabledChildren = !1
    }, G.WorldMapCoinLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCoinLayer.prototype.update = function() {
        this.sort("y", Phaser.Group.SORT_ASCENDING);
        for (var a = this.children.length; a--;) this.children[a].update()
    }, G.WorldMapCoinLayer.prototype.rewardOnLvl = function(lvlNr, coins, stars) {
        for (var xx = G.l(G.json.levels[lvlNr].mapX), yy = G.l(G.json.levels[lvlNr].mapY), reward = coins; reward > 0;) this.add(new G.WorldMapRewardPart(xx, yy, "coin", Math.min(reward, 15))), reward -= 15;
        for (var i = 0; stars > i; i++) this.add(new G.WorldMapRewardPart(xx, yy, "star"))
    }, G.WorldMapRewardPart = function(x, y, type, coinValue) {
        Phaser.Image.call(this, game, x, y), G.changeTexture(this, "coin" == type ? "coin_1" : "star"), this.rewardType = type, this.coinValue = coinValue || 0, this.anchor.setTo(.5), this.scale.setTo("coin" == type ? .5 : .3), this.verOffsetY = 0, this.verVelY = G.lnf(-2 * Math.random() - 3), this.velX = G.lnf(3 * Math.random() - 1.5), this.yy = y, this.velYY = G.lnf(3 * Math.random() - 1.5), this.grounded = !1
    }, G.WorldMapRewardPart.prototype = Object.create(Phaser.Image.prototype), G.WorldMapRewardPart.prototype.update = function() {
        this.grounded || (this.x += this.velX, this.yy += this.velYY, this.verOffsetY += this.verVelY, this.verVelY += .2, this.verOffsetY > 0 && (Math.abs(this.verVelY) > 2 ? this.verVelY *= -.6 : (this.verVelX = 0, this.velX = 0, this.velYY = 0, this.grounded = !0, game.time.events.add(Math.floor(500 * Math.random() + 200), function() {
            G.sb("onMapToUIPart").dispatch(this), this.destroy()
        }, this))), this.verOffsetY = Math.min(0, this.verOffsetY), this.y = this.yy + this.verOffsetY)
    }, G.WorldMapLvlButton = function() {
        G.Button.call(this, 0, 0, null, this.handleClick, this), this.state = game.state.getCurrentState(), this.starsImg = G.makeImage(0, 30, null, .5, this), this.lvlNrTxt = this.addChild(new G.Text(0, -16, " ", {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "white",
            stroke: "#1f6185",
            strokeThickness: 5
        }, .5, 60)), this.state = game.state.getCurrentState(), this.addTerm(function() {
            return !G.saveState.isLevelBehindGate(this.lvlIndex)
        }, this), this.kill(), this.state.EDITOR && G.sb("editorLevelSelected").add(this.editorCheckTint, this)
    }, G.WorldMapLvlButton.prototype = Object.create(G.Button.prototype), G.WorldMapLvlButton.prototype.handleClick = function() {
        (this.state.EDITOR || this.lvlAvailable) && (this.state.EDITOR ? (this.state.selectLevel(this.lvlIndex), this.IMMEDIATE = !0) : 0 == G.saveState.getCurrentLivesNr() ? G.sb("pushWindow").dispatch("buyLives") : (0 != this.lvlIndex || G.saveState.data.firstTimeBtn[this.lvlIndex] ? 1 != this.lvlIndex || G.saveState.data.firstTimeBtn[this.lvlIndex] || (G.gameTracking.FTUEDesign("FTUE:Map:SecondTime:Level2Button"), G.saveState.data.firstTimeBtn[this.lvlIndex] = !0, G.saveState.save()) : (G.gameTracking.FTUEDesign("FTUE:Map:FirstTime:Level1Button"), G.saveState.data.firstTimeBtn[this.lvlIndex] = !0, G.saveState.save()), G.lvlNr = this.lvlIndex, G.lvlData = G.json.levels[this.lvlIndex], G.sb("pushWindow").dispatch("level")))
    }, G.WorldMapLvlButton.prototype.revealChange = function() {
        game.add.tween(this.starsImg.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Elastic.Out, !0, 1500).onComplete.add(function() {
            this.inputEnabled = !0, this.input.useHandCursor = !0
        }, this), this.state.lastLevelData.lvlNr = -999
    }, G.WorldMapLvlButton.prototype.init = function(index, lvlData) {
        this.alpha = 1, this.stopPulse(), this.revive(), G.stopTweens(this), G.stopTweens(this.starsImg), this.starsImg.scale.setTo(1), this.x = G.l(lvlData.mapX), this.y = G.l(lvlData.mapY), this.lvlIndex = index, this.lvlAvailable = G.saveState.isLevelAvailable(this.lvlIndex), this.lvlStarsNr = G.saveState.getStars(this.lvlIndex), this.lvlAvailable ? (this.lvlNrTxt.visible = !0, this.lvlNrTxt.setText((this.lvlIndex + 1).toString()), 0 == this.lvlStarsNr ? (G.changeTexture(this, "map_point_2"), G.changeTexture(this.starsImg, null), this.lvlNrTxt.stroke = "#997b11", this.pulse()) : (G.changeTexture(this, "map_point_1"), this.lvlNrTxt.stroke = "#1f6185", G.changeTexture(this.starsImg, "map_star_" + this.lvlStarsNr)), this.inputEnabled = !0, this.input.useHandCursor = !0) : (G.changeTexture(this, "map_point_3"), G.changeTexture(this.starsImg, null), this.lvlNrTxt.visible = !1, this.alpha = .5, this.inputEnabled = !1, this.input.useHandCursor = !1);
        var gate = G.json.settings.gates.find(function(gate) {
            return gate.lvlNr === index + 1
        });
        if (gate) {
            var activeGate = gate.lvlNr - 1 <= G.saveState.getLastPassedLevelNr();
            activeGate || (this.alpha = 0)
        }
        this.state.EDITOR && this.editorCheckTint()
    }, G.WorldMapLvlButton.prototype.editorCheckTint = function() {
        this.state.EDITOR && this.state.selectedLevels.includes(this.lvlIndex)
    }, G.WorldMapLvls = function(mother) {
        G.PoolGroup.call(this, G.WorldMapLvlButton), this.position = mother.position, this.lvlBtnCoords = G.json.levels.map(function(e, index) {
            return {
                mapY: G.l(e.mapY),
                lvlIndex: index,
                btnObj: null,
                lvlData: e
            }
        }).sort(function(a, b) {
            return a.mapY - b.mapY
        }), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapLvls.prototype = Object.create(G.PoolGroup.prototype), G.WorldMapLvls.prototype.refreshData = function() {
        this.lvlBtnCoords.forEach(function(e, i) {
            e.btnObj && this.detachButton(i)
        }, this), this.lvlBtnCoords = G.json.levels.map(function(e, index) {
            return {
                mapY: G.l(e.mapY),
                lvlIndex: index,
                btnObj: null,
                lvlData: e
            }
        })
    }, G.WorldMapLvls.prototype.getButtonObj = function(lvlNr) {
        for (var i = 0; i < this.children.length; i++) {
            var btn = this.children[i];
            if (btn.lvlIndex == lvlNr) return btn
        }
    }, G.WorldMapLvls.prototype.update = function() {
        for (var howDeep = this.y - game.height, wasPushed = !1, wasPushedAndNoBtns = !1, i = 0; i < this.lvlBtnCoords.length; i++) howDeep - G.l(40) + this.lvlBtnCoords[i].mapY < 0 && howDeep + game.height + G.l(40) + this.lvlBtnCoords[i].mapY > 0 ? (null === this.lvlBtnCoords[i].btnObj && this.attachButton(i), wasPushed = !0) : null !== this.lvlBtnCoords[i].btnObj ? this.detachButton(i) : wasPushedAndNoBtns = wasPushed
    }, G.WorldMapLvls.prototype.attachButton = function(index) {
        this.lvlBtnCoords[index].btnObj = this.getFreeElement(), this.lvlBtnCoords[index].btnObj.init(this.lvlBtnCoords[index].lvlIndex, this.lvlBtnCoords[index].lvlData)
    }, G.WorldMapLvls.prototype.detachButton = function(index) {
        this.lvlBtnCoords[index].btnObj.kill(), this.lvlBtnCoords[index].btnObj = null
    }, G.WorldMapLvls.prototype.unlockInput = function() {
        this.ignoreChildInput = !1
    }, G.WorldMapLvls.prototype.lockInput = function() {
        this.ignoreChildInput = !0
    }, G.Booster = function(cellX, cellY, nr) {
        this.board = G.lvl.state.board, this.am = this.board.actionManager, this.cellX = cellX, this.cellY = cellY, Phaser.Image.call(this, game, this.board.cellXToPxIn(cellX), this.board.cellYToPxIn(cellY - 2)), this.anchor.setTo(.5), this.boosterNr = nr, this.orgY = this.y, this.targetY = this.board.cellYToPxIn(cellY), G.changeTexture(this, "ui_booster_" + nr), this.alpha = 0, this.scale.setTo(2), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 700, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 1
        }, 700, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            game.add.tween(this).to({
                y: this.targetY
            }, 300, Phaser.Easing.Cubic.In, !0).onComplete.add(function() {
                var matchCandy = this.getMatchCandy(this.boosterNr);
                3 == this.boosterNr && (G.sb("fx").dispatch("strokeH", matchCandy), G.sb("fx").dispatch("lightCircle", matchCandy), G.sb("fx").dispatch("explosion", matchCandy)), 4 == this.boosterNr && (G.sb("fx").dispatch("strokeV", matchCandy), G.sb("fx").dispatch("lightCircle", matchCandy), G.sb("fx").dispatch("explosion", matchCandy)), this.board.checkSpecialMatchList.push(matchCandy), this.am.newAction("processMatch"), this.am.removeAction(), game.add.tween(this).to({
                    y: this.orgY,
                    alpha: 0
                }, 600, Phaser.Easing.Cubic.Out, !0), game.time.events.add(600, this.destroy, this)
            }, this)
        }, this)
    }, G.Booster.prototype = Object.create(Phaser.Image.prototype), G.Booster.prototype.getMatchCandy = function(nr) {
        return 2 == nr ? {
            cellX: this.cellX,
            cellY: this.cellY,
            exe: [
                ["specific", [0, 0]]
            ]
        } : 3 == nr ? {
            cellX: this.cellX,
            cellY: this.cellY,
            exe: [
                ["loop", {
                    x: -1,
                    y: 0
                }],
                ["loop", {
                    x: 1,
                    y: 0
                }]
            ]
        } : 4 == nr ? {
            cellX: this.cellX,
            cellY: this.cellY,
            exe: [
                ["loop", {
                    x: 0,
                    y: -1
                }],
                ["loop", {
                    x: 0,
                    y: 1
                }]
            ]
        } : void 0
    }, G.BoosterHorizontal = function(cellX, cellY, nr) {
        this.board = G.lvl.state.board, this.am = this.board.actionManager, this.cellX = cellX, this.cellY = cellY, Phaser.Image.call(this, game, this.board.cellXToPxIn(-.5), this.board.cellYToPxIn(cellY)), this.anchor.setTo(.5), this.oldCellX = -1, this.boosterNr = nr, this.active = !1, this.orgY = this.y, this.targetX = this.board.cellYToPxIn(this.board.boardData.width) + G.l(30), G.changeTexture(this, "ui_booster_" + nr), this.alpha = 0, this.scale.setTo(2), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 1e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 1
        }, 1e3, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            this.active = !0
        }, this)
    }, G.BoosterHorizontal.prototype = Object.create(Phaser.Image.prototype), G.BoosterHorizontal.prototype.update = function() {
        if (this.active) {
            this.x += G.l(10);
            var candy, cellX = this.board.pxInToCellX(this.x);
            cellX != this.oldCellX && (this.oldCellX = cellX, candy = this.board.getCandy(cellX - 1, this.cellY), candy && (this.board.hitCell(cellX - 1, this.cellY), this.board.isCellMatchable(cellX - 1, this.cellY) && (this.board.boardDirt.isToken(cellX - 1, this.cellY) && this.board.boardDirt.onMatch(cellX - 1, this.cellY), this.board.boardCage.isToken(cellX - 1, this.cellY) ? this.board.boardCage.onMatch(cellX - 1, this.cellY) : candy.special ? this.board.checkSpecialMatchList.push(candy) : (candy.match(), G.sfx.boom.play(), G.lvl.processMatch(1, candy.cellX, candy.cellY))))), this.x >= this.targetX && 0 == this.board.duringAnimation && (this.active = !1, 0 == this.board.checkSpecialMatchList.length ? this.am.newAction("processFall") : this.am.newAction("processMatch"), G.sb("onBoosterActionFinished").dispatch(), this.am.removeAction(), this.destroy())
        }
    }, G.BoosterSelection = function(cellX, cellY, follow) {
        this.board = G.lvl.state.board, this.am = this.board.actionManager, this.cellX = cellX, this.cellY = cellY, Phaser.Image.call(this, game, this.board.cellXToPxIn(cellX), this.board.cellYToPxIn(cellY)), this.alpha = 0, this.follow = follow, this.anchor.setTo(0), G.changeTexture(this, "tut_hand"), this.offsetTween = 0, game.add.tween(this).to({
            offsetTween: G.l(20)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.alphaTween = game.add.tween(this).to({
            alpha: .8
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.BoosterSelection.prototype = Object.create(Phaser.Image.prototype), G.BoosterSelection.prototype.update = function() {
        this.x = this.follow.x + this.offsetTween, this.y = this.follow.y + this.offsetTween
    }, G.BoosterSelection.prototype.hide = function() {
        this.alphaTween.stop(), game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0, 200).onComplete.add(function() {
            this.destroy()
        }, this)
    }, G.BoosterVertical = function(cellX, cellY, nr) {
        this.board = G.lvl.state.board, this.am = this.board.actionManager, this.cellX = cellX, this.cellY = cellY, Phaser.Image.call(this, game, this.board.cellXToPxIn(cellX), this.board.cellYToPxIn(-.5)), this.anchor.setTo(.5), this.boosterNr = nr, this.oldCellY = -1, this.orgY = this.y, this.targetY = this.board.cellYToPxIn(this.board.boardData.height) + G.l(30), G.changeTexture(this, "ui_booster_" + nr), this.alpha = 0, this.scale.setTo(2), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 1e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 1
        }, 1e3, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            this.active = !0
        }, this)
    }, G.BoosterVertical.prototype = Object.create(Phaser.Image.prototype), G.BoosterVertical.prototype.getMatchCandy = function(nr) {
        return 2 == nr ? {
            cellX: this.cellX,
            cellY: this.cellY,
            exe: [
                ["specific", [0, 0]]
            ]
        } : 3 == nr ? {
            cellX: this.board.boardData.width - 1,
            cellY: this.cellY,
            exe: [
                ["loop", {
                    x: -1,
                    y: 0
                }],
                ["loop", {
                    x: 1,
                    y: 0
                }]
            ]
        } : 4 == nr ? {
            cellX: this.cellX,
            cellY: this.board.boardData.height - 1,
            exe: [
                ["loop", {
                    x: 0,
                    y: -1
                }],
                ["loop", {
                    x: 0,
                    y: 1
                }]
            ]
        } : void 0
    }, G.BoosterVertical.prototype.update = function() {
        if (this.active) {
            this.y += G.l(10);
            var candy, cellY = this.board.pxInToCellY(this.y);
            cellY != this.oldCellY && (this.oldCellY = cellY, candy = this.board.getCandy(this.cellX, cellY - 1), candy && (this.board.hitCell(this.cellX, cellY - 1), this.board.isCellMatchable(this.cellX, cellY - 1) && (this.board.boardDirt.isToken(this.cellX, cellY - 1) && this.board.boardDirt.onMatch(this.cellX, cellY - 1), this.board.boardCage.isToken(this.cellX, cellY - 1) ? this.board.boardCage.onMatch(this.cellX, cellY - 1) : candy.special ? this.board.checkSpecialMatchList.push(candy) : (candy.match(), G.sfx.boom.play(), G.lvl.processMatch(1, candy.cellX, candy.cellY))))), this.y >= this.targetY && 0 == this.board.duringAnimation && (this.active = !1, 0 == this.board.checkSpecialMatchList.length ? this.am.newAction("processFall") : this.am.newAction("processMatch"), G.sb("onBoosterActionFinished").dispatch(), this.am.removeAction(), this.destroy())
        }
    }, G.dailyCheck = function() {
        var openDaily = function() {
                new G.Window("daily2"), G.saveState.data.lastDaily = [now.getYear(), now.getMonth(), now.getDate()], G.saveState.save()
            },
            now = new Date,
            lastDaily = G.saveState.data.lastDaily;
        lastDaily ? (lastDaily[2] != now.getDate() || lastDaily[1] != now.getMonth() || lastDaily[0] != now.getYear()) && openDaily() : (G.saveState.data.spins++, G.saveState.save(), openDaily())
    }, G.DailyCoin = function(x, y, value) {
        Phaser.Image.call(this, game, G.l(x), G.l(y)), this.state = game.state.getCurrentState(), this.anchor.setTo(.5), G.changeTexture(this, "coin_1"), this.rewardType = "coin", this.coinValue = value, this.scale.setTo(.75), this.target = this.state.panel.coinIco, game.add.existing(this);
        var target = this.target;
        game.add.tween(this).to({
            x: game.world.bounds.x + target.worldPosition.x,
            y: this.target.worldPosition.y,
            width: target.width,
            height: target.height
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function() {
            G.saveState.changeCoins(this.coinValue), G.sb("onMapToUIPartFinished").dispatch(this), this.destroy()
        }, this)
    }, G.DailyCoin.prototype = Object.create(Phaser.Image.prototype), G.DailyCoin.prototype.update = function() {
        this.target
    }, G.DailyWheel = function(x, y) {
        Phaser.Group.call(this, game), D = this, this.state = game.state.getCurrentState(), this.x = G.l(x), this.y = G.l(y), this.prizeTable = G.json.settings.wheelPrizes, this.prizeTableGold = G.json.settings.wheelPrizesGold, this.prizeTable.forEach(function(prize) {
            G.gift.processRandomBoosters(prize.prize)
        }), this.prizeTableGold.forEach(function(prize) {
            G.gift.processRandomBoosters(prize.prize)
        }), this.angleBetweenFields = 360 / this.prizeTable.length, this.anglePrizeStartOffset = this.angleBetweenFields / 2, this.angleDiffSinceLastPin = 0, this.angleBetweenPins = 15, this.angleSpeedMulti = .985, this.wheelGfx = this.add(this.makeWheelGfx(0, 0, "prize_wheel_2", this.prizeTable)), this.wheelGfxGold = this.add(this.makeWheelGfx(0, 0, "gold_wheel", this.prizeTableGold)), this.wheelPointer = this.add(this.makeWheelPointer(0, -180, "prize_wheel_arrow")), WH = this.wheelGfx, this.wheelGfx.wheelDistancePassed = 0, this.wheelGfx.prevDistancePassed = 0, this.wheelGfx.inputEnabled = !0, this.pointer = null, this.pointerStartX = 0, this.pointerClickedDate = 0, this.launched = !1, this.finished = !1, this.wheelGfx.events.onInputDown.add(function() {
            var pointer = game.input.activePointer;
            this.pointerStartX.worldX, this.pointerClickedDate = Date.now(), this.pointer = pointer
        }, this), this.onFinish = new Phaser.Signal, this.gold = !1
    }, G.DailyWheel.prototype = Object.create(Phaser.Group.prototype), G.DailyWheel.prototype.changeToRegular = function() {
        this.gold = !1
    }, G.DailyWheel.prototype.changeToGold = function() {
        this.gold = !0
    }, G.DailyWheel.prototype.update = function() {
        if (this.wheelGfxGold.angle = this.wheelGfx.angle, this.gold ? (this.wheelGfx.alpha = G.lerp(this.wheelGfx.alpha, 0, .1, .02), this.wheelGfxGold.alpha = G.lerp(this.wheelGfxGold.alpha, 1, .1, .02)) : (this.wheelGfx.alpha = G.lerp(this.wheelGfx.alpha, 1, .1, .02), this.wheelGfxGold.alpha = G.lerp(this.wheelGfxGold.alpha, 0, .1, .02)), this.wheelPointer.update(), !this.finished) {
            if (this.launched) {
                var updateResult = this.updateLaunched();
                updateResult && (this.onFinish.dispatch(updateResult.prize), this.finished = !0)
            } else null !== this.pointer && !this.pointer.isDown;
            for (var i = this.children.length; i--;) this.children[i].update()
        }
    }, G.DailyWheel.prototype.restart = function() {
        sdk.showBanner();
        this.finished && (this.launched = !1, this.pointer = null, this.finished = !1, this.giftGfx && game.add.tween(this.giftGfx.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0).onComplete.add(function() {
            this.destroy()
        }, this.giftGfx), this.wheelGfx.inputEnabled = !0)
    }, G.DailyWheel.prototype.launch = function(speed) {
        for (this.wheelGfx.inputEnabled = !1;;) {
            var giftTestSpin = this.testSpin(speed, this.wheelGfx.prevDistancePassed, this.wheelGfx.wheelDistancePassed);
            if (!giftTestSpin.keep) break;
            if (!(Math.random() > giftTestSpin.keep)) break;
            speed += 80
        }
        this.wheelGfx.angleSpeed = .025 * speed, this.launched = !0
    }, G.DailyWheel.prototype.updateLaunched = function() {
        return this.updateWheel(this.wheelGfx, !0)
    }, G.DailyWheel.prototype.applyPrize = function(prize) {}, G.DailyWheel.prototype.testSpin = function(speed, prevDistancePassed, wheelDistancePassed) {
        var wheelGfx = {
            angle: 0
        };
        for (wheelGfx.angleSpeed = .025 * speed, wheelGfx.prevDistancePassed = prevDistancePassed || 0, wheelGfx.wheelDistancePassed = wheelDistancePassed || 0;;) {
            var gift = this.updateWheel(wheelGfx);
            if (gift) return gift
        }
    }, G.DailyWheel.prototype.updateWheel = function(wheel, bouncePointer) {
        wheel.angle += wheel.angleSpeed;
        var prevDistancePassed = wheel.wheelDistancePassed;
        return wheel.wheelDistancePassed += wheel.angleSpeed, Math.floor(prevDistancePassed / this.angleBetweenPins) !== Math.floor(wheel.wheelDistancePassed / this.angleBetweenPins) && (bouncePointer && this.wheelPointer.bounce(-1 * Math.sign(wheel.angleSpeed)), wheel.angleSpeed = .95 * wheel.angleSpeed, wheel.angleSpeed < .25 && (wheel.wheelDistancePassed = prevDistancePassed, wheel.angle = game.math.wrapAngle(prevDistancePassed), wheel.angleSpeed *= -.5)), wheel.angleSpeed *= this.angleSpeedMulti, this.wheelGfxGold.angle = wheel.angle, Math.abs(wheel.angleSpeed) < .05 ? this.getPrizeFromAngle(wheel.angle) : !1
    }, G.DailyWheel.prototype.getPrizeFromAngle = function(angle) {
        var table = this.gold ? this.prizeTableGold : this.prizeTable,
            angleToDisplay = angle + 180;
        return 0 > angle && (angleToDisplay = 180 + angle), table[Math.floor(angleToDisplay / this.angleBetweenFields)]
    }, G.DailyWheel.prototype.makeWheelGfx = function(x, y, bg, prizeTable) {
        wheel = G.makeImage(0, 0, bg, .5), wheel.labels = wheel.addChild(game.make.group());
        for (var prizeIndex = prizeTable.length - 1, i = this.anglePrizeStartOffset; 360 > i; i += this.angleBetweenFields) {
            var currentPrize = prizeTable[prizeIndex],
                label = new G.LabelGroupT(G.gift.getLabelString(currentPrize.prize, 1.4), G.lengthDirX(90 + i, 160, !1), G.lengthDirY(90 + i, 160, !1), {
                    font: "ComicSansBold",
                    fontSize: "25px",
                    fill: "#85511f",
                    stroke: "#ffedd9",
                    strokeThickness: 7
                }, [1, .5], 200);
            label.angle = 90 + i, wheel.labels.add(label), prizeIndex--
        }
        return wheel.labels.cacheAsBitmap = !0, wheel
    }, G.DailyWheel.prototype.makeWheelPointer = function(x, y, sprite) {
        var pointer = G.makeImage(x, y, sprite, .5, null);
        return pointer.soundTimer = 2, pointer.bounce = function(sign) {
            this.soundTimer < 0 && (G.sfx.pop.play(), this.soundTimer = 2), this.angle = 10 * sign
        }, pointer.update = function() {
            this.soundTimer--, this.angle = G.lerp(this.angle, 0, .2)
        }, pointer
    }, G.GiftUnwrapAnim = function(x, y, gift) {
        Phaser.Group.call(this, game), this.giftData = gift, this.x = G.l(x), this.y = G.l(y), this.light = G.makeImage(0, 0, "popup_lighht", .5, this), this.light.update = function() {
            this.angle++
        }, this.light.alpha = 0, this.light.blendMode = 1, game.add.tween(this.light).to({
            alpha: .2
        }, 1e3, Phaser.Easing.Cubic.Out, !0), game.add.tween(this.light).to({
            angle: 360
        }, 3e3, Phaser.Easing.Linear.None, !0, 0, -1, !1), this.inside = new G.LabelGroupT(G.gift.getLabelString(this.giftData), 0, 0, {
            font: "ComicSansBold",
            fontSize: "90px",
            fill: "white"
        }, .5, 180), this.add(this.inside), this.inside.scale.setTo(.5, 0), game.add.tween(this.inside.scale).to({
            x: 1,
            y: 1
        }, 800, Phaser.Easing.Elastic.Out, !0), G.sfx.xylophone_positive_12.play()
    }, G.GiftUnwrapAnim.prototype = Object.create(Phaser.Group.prototype), G.GiftUnwrapAnim.prototype.hide = function() {
        game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            this.destroy()
        }, this)
    }, G.DailyRewardBoxIcon = function(x, y, dayNr) {
        Phaser.Group.call(this, game), this.position.setTo(x, y);
        var iconData = G.json.settings.dailyReward.days[dayNr - 1].boxIcon;
        iconData.forEach(function(obj) {
            var sprite = obj.sprite || "medium_green_present",
                pos = obj.pos || [0, 0],
                scale = obj.scale || [1, 1],
                img = G.makeImage(pos[0], pos[1], sprite, .5, this);
            img.scale.setTo(scale[0], scale[1])
        }, this)
    }, G.DailyRewardBoxIcon.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardCurrentGift = function(x, y, dayNr) {
        Phaser.Group.call(this, game), this.position.setTo(x, y), this.dayConfig = G.json.settings.dailyReward.days[dayNr], this.giftPanel = this.add(new G.DailyRewardCurrentGiftPrizePanel(0, -30, this.dayConfig)), this.giftPanel.visible = !1, this.boxIcon = G.makeImage(0, 0, "big_pink_present", .5, this), this.boxJump(), this.add(this.boxIcon)
    }, G.DailyRewardCurrentGift.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardCurrentGift.prototype.showReward = function() {
        game.add.tween(this.boxIcon).to({
            alpha: 0,
            width: 1.2 * this.boxIcon.width,
            height: 1.2 * this.boxIcon.height
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.giftPanel.show()
    }, G.DailyRewardCurrentGift.prototype.claimReward = function() {
        this.giftPanel.claimPrize()
        sdk.showBanner();
    }, G.DailyRewardCurrentGift.prototype.boxJump = function() {
        if (1 == this.boxIcon.alpha && this.boxIcon.visible) {
            var moveTweenA = game.add.tween(this.boxIcon).to({
                    y: -G.l(15)
                }, 150, Phaser.Easing.Cubic.Out),
                moveTweenB = game.add.tween(this.boxIcon).to({
                    y: 0
                }, 150, Phaser.Easing.Circular.In);
            moveTweenA.chain(moveTweenB), moveTweenA.start();
            var tweenAngleA = game.add.tween(this.boxIcon).to({
                    angle: -3
                }, 100, Phaser.Easing.Cubic.InOut),
                tweenAngleB = game.add.tween(this.boxIcon).to({
                    angle: 3
                }, 170, Phaser.Easing.Sinusoidal.In),
                tweenAngleC = game.add.tween(this.boxIcon).to({
                    angle: 0
                }, 30, Phaser.Easing.Cubic.InOut);
            tweenAngleA.chain(tweenAngleB, tweenAngleC), tweenAngleA.start(), game.time.events.add(1e3, this.boxJump, this)
        }
    }, G.DailyRewardCurrentGiftPrizePanel = function(x, y, dayConfig) {
        Phaser.Group.call(this, game), this.position.setTo(x, y), this.dayConfig = dayConfig, this.prize = JSON.parse(JSON.stringify(this.dayConfig.gifts)), this.bg = G.makeImage(0, 0, "daily_prize_panel_bg", .5, this), "coin" === this.prize[0][0] ? this.icon = G.makeImage(0, 0, "coin_3", .5, this) : this.icon = this.add(new G.DailyRewardGiftIcon(0, 0, this.prize)), this.descText = this.addDescText(0, 130, this.prize), game.incentivised && (this.icon.x = -80, this.dblBtn = new G.Button(80, 0, "btn_x2", function() {
            G.gameTracking.design("NewDailyDoubleReward"), this.dblBtn.inputEnabled = !1, this.dblBtn.alpha = .5, this.dblSuccess()
        }, this), this.add(this.dblBtn)), this.visible = !1
    }, G.DailyRewardCurrentGiftPrizePanel.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardCurrentGiftPrizePanel.prototype.show = function() {
        this.visible = !0, this.alpha = 0, game.add.tween(this).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.icon.scale.setTo(0), game.add.tween(this.icon.scale).to({
            x: 1.2,
            y: 1.2
        }, 300, Phaser.Easing.Elastic.Out, !0), this.dblBtn && (this.dblBtn.scale.setTo(0), game.add.tween(this.dblBtn.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Elastic.Out, !0, 150)), this.descText.scale.setTo(0), game.add.tween(this.descText.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Elastic.Out, !0, 300)
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.claimPrize = function() {
        sdk.showBanner();
        this.dblBtn && (this.dblBtn.inputEnabled = !1), this.processClaim(this.icon, this.prize), this.dblIcon && this.processClaim(this.dblIcon, this.prize)
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.addDescText = function(x, y, gifts) {
        var txt;
        return txt = "coin" === gifts[0][0] ? G.txt("%NR% Coins").replace("%NR%", gifts[0][1]) : G.txt("Get more boosters!"), this.add(new G.Text(x, y, txt, {
            style: "font-beige",
            fontSize: "40px",
            lineSpacing: -20
        }, .5, 400, 200, !0, "center"))
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.dblSuccess = function() {
        this.dblBtn.inputEnabled = !1, game.add.tween(this.dblBtn).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), "coin" === this.prize[0][0] ? this.dblIcon = G.makeImage(-80, 0, "coin_3", .5, this) : this.dblIcon = this.add(new G.DailyRewardGiftIcon(-80, 0, this.prize)), this.dblIcon.scale.setTo(1.2), game.add.tween(this.dblIcon.scale).to({
            x: 1.3,
            y: 1.3
        }, 300, Phaser.Easing.Elastic.Out, !0, 0, 0, !0, 500), game.add.tween(this.dblIcon).to({
            x: 80,
            y: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), "coin" === this.prize[0][0] ? this.descText.setText(G.txt("%NR% Coins").replace("%NR%", 2 * this.prize[0][1])) : this.descText.setText(G.txt("Use these to boost your game!"))
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.dblFail = function() {
        new G.NoMoreAds
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.processClaim = function(icon, gifts) {
        var state = game.state.getCurrentState();
        gifts.forEach(function(gift) {
            "coin" === gift[0] ? G.gameTracking.source("Coins", "Reward", "NewDailyReward", gift[1]) : G.gameTracking.source(G.saveState.nrToBoosterName(gift[0][8]), "Reward", "NewDailyReward", gift[1]), "coin" === gift[0] ? state.uiTargetParticles.createCoinBatch(game.world.bounds.x + icon.worldPosition.x, icon.worldPosition.y, state.panel.coinsTxt, gift[1]) : G.gift.applyGift(gift, !0)
        })
    }, G.DailyRewardDay = function(x, y, config) {
        Phaser.Group.call(this, game), this.position.setTo(x, y), this.bg = G.makeImage(0, 0, config.bgSprite, .5, this), this.addRibbon(0, this.bg.height * -.5 + 10, config), config.giftsVisible ? this.icon = this.add(new G.DailyRewardGiftIcon(0, 10, config.gifts)) : this.icon = this.add(new G.DailyRewardBoxIcon(0, 10, config.dayNr)), this.icon.height = Math.min(this.icon.height, .9 * this.bg.height), this.icon.scale.setTo(this.icon.scale.y), config.past && (this.checkedIconPast = G.makeImage(50, 0, "task_complete", .5, this)), config.today && (this.checkedIcon = G.makeImage(50, 0, "task_complete", .5, this), this.checkedIcon.alpha = 0, this.checkedIcon.scale.setTo(2))
    }, G.DailyRewardDay.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardDay.prototype.checkedIconAnimation = function() {
        this.checkedIcon && (game.add.tween(this.checkedIcon).to({
            alpha: 1
        }, 400, Phaser.Easing.Cubic.In, !0), game.add.tween(this.checkedIcon.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Cubic.In, !0))
    }, G.DailyRewardDay.prototype.addRibbon = function(x, y, config) {
        this.dayRibbon = G.makeImage(x, y, config.today ? "selected_day" : "unselected_day", .5, this), this.dayText = new G.Text(x, y, config.today ? G.txt("Today") : G.txt("Day %NR%").replace("%NR%", config.dayNr), {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px"
        }, .5, 76), this.add(this.dayText)
    }, G.DailyRewardDay.prototype.addBoxesIcons = function(x, y, config) {
        this.iconGroup = this.add(this.iconGroup)
    }, G.DailyRewardGiftIcon = function(x, y, gifts) {
        Phaser.Group.call(this, game), this.position.setTo(x, y), 1 == gifts.length ? this.addIcon(0, 0, gifts[0]) : (this.addIcon(20, 20, gifts[0]), this.addIcon(-20, -20, gifts[1]))
    }, G.DailyRewardGiftIcon.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardGiftIcon.prototype.addIcon = function(x, y, gift) {
        var icon = G.makeImage(x, y, G.gift.getIcon(gift), .5, this);
        gift[1] > 1 && (icon.amountTxt = new G.Text(0, 30, "x" + gift[1], {
            style: "font-beige-header",
            fontSize: "35px"
        }, .5), icon.addChild(icon.amountTxt)), "coin" === gift[0] && (icon.y -= 10, icon.amountTxt.y += 10)
    }, G.DailyRewardWeek = function(x, y, currentDay, anim) {
        Phaser.Group.call(this, game), this.position.setTo(x, y), this.days = [], this.init(currentDay, anim)
    }, G.DailyRewardWeek.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardWeek.prototype.init = function(currentDay, anim) {
        for (var days = G.json.settings.dailyReward.days, i = 0; 7 > i; i++) {
            var bgSprite;
            bgSprite = i === currentDay ? "current_day_box" : currentDay > i ? "passed_day_box" : "future_day_box", bgSprite += 6 === i ? "_big" : "";
            var day = new G.DailyRewardDay(-140 + i % 3 * 140, -135 + 135 * Math.floor(i / 3), {
                gifts: days[i].gifts,
                dayNr: i + 1,
                past: currentDay > i,
                today: i === currentDay,
                bgSprite: bgSprite,
                giftsVisible: currentDay >= i
            });
            day.scale.setTo(0), game.add.tween(day.scale).to({
                x: 1,
                y: 1
            }, 200, Phaser.Easing.Sinusoidal.Out, !0, 50 + 50 * i), 6 == i && (day.x += 140), this.add(day), this.days.push(day)
        }
        game.time.events.add(50 + 50 * i, function() {
            this.days.forEach(function(day) {
                day.checkedIconAnimation()
            })
        }, this)
    }, G.GingerMapButton = function() {
        Phaser.Group.call(this, game), G.GINGEREVENT && (this.timer = new G.TextTimer(-13, 113, Date.now() + 36e6, {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#ec308f",
            strokeThickness: 6
        }, [.5, 0], 300), this.timer.setShadow(0, 4, "rgba(0,0,0,0.5)", 0, !0, !1), this.add(this.timer), this.mainButton = new G.Button(0, 0, "Button_Map", function() {
            G.sb("pushWindow").dispatch("gingerJoin")
        }, this), this.mainButton.label = new G.Text(-9, 84, "Cookie Quest", {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#ec308f"
        }, .5, 170), this.mainButton.addChild(this.mainButton.label), this.add(this.mainButton)), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.GingerMapButton.prototype = Object.create(Phaser.Group.prototype), G.GingerMapButton.prototype.onResize = function() {
        var center = game.world.bounds.x + Math.floor(.5 * game.width);
        this.x = center - 200, this.y = game.height - 365
    }, G.GingerRanking = function(eventData) {
        Phaser.Group.call(this, game), this.bg = G.makeImage(-204, 0, "Ranking_Board_Long", 0, this), this.bg.inputEnabled = !0, this.bg.events.onInputDown.add(function() {
            this.clicked = !0
        }, this), this.clicked = !1, this.rankingGroup = this.add(game.make.group()), this.rankingGroup.x = -204, this.rankingGroup.y = 55, this.maskGfx = this.add(game.add.graphics()), this.maskGfx.y = 55, this.maskGfx.x = -204, this.maskGfx.beginFill(16711680, 1), this.maskGfx.drawRect(0, 0, 408, 326), this.rankingUsers = [], this.rankingGroup.mask = this.maskGfx, this.initRanking(), this.inputPrevY = 0, this.inputVelY = 0, this.rankingTitle = new G.Text(0, 25, "Your team", {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "40px"
        }, .5, 400), this.add(this.rankingTitle)
    }, G.GingerRanking.prototype = Object.create(Phaser.Group.prototype), G.GingerRanking.prototype.update = function() {
        this.updateInput()
    }, G.GingerRanking.prototype.updateInput = function() {
        if (this.clicked && game.input.activePointer.isDown) {
            if (null !== this.inputPrevY) {
                var diffY = .5 * (game.input.activePointer.y - this.inputPrevY);
                this.inputVelY = diffY
            }
            this.inputPrevY = game.input.activePointer.y
        } else this.clicked = !1, this.inputPrevY = null;
        this.rankingGroup.y += this.inputVelY, this.boundRistrict(), this.inputVelY *= .95, Math.abs(this.inputVelY) < 1 && (this.inputVelY = 0)
    }, G.GingerRanking.prototype.boundRistrict = function() {
        var maxY = 55,
            minY = Math.min(55, 55 - (this.rankingGroup.height - 326));
        this.rankingGroup.y > maxY && (this.rankingGroup.y = G.lerp(this.rankingGroup.y, maxY, .5), this.rankingGroup.y < maxY + 1 && (this.rankingGroup.y = maxY)), this.rankingGroup.y < minY && (this.rankingGroup.y = G.lerp(this.rankingGroup.y, minY, .5), this.rankingGroup.y > minY + 1 && (this.rankingGroup.y = minY))
    }, G.GingerRanking.prototype.initRanking = function(users) {
        users = [{
            rank: 1,
            name: "sodomo",
            gingerAmount: 15,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 2,
            name: "Annie",
            gingerAmount: 13,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 3,
            name: "John",
            gingerAmount: 12,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 4,
            name: "Hell",
            gingerAmount: 10,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 5,
            name: "Dubious",
            gingerAmount: 8,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 6,
            name: "Krrr",
            gingerAmount: 3,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 7,
            name: "Goldie",
            gingerAmount: 0,
            avatar: sgSettings.config.user.avatar
        }];
        for (var i = 0; i < users.length; i++) this.initUser(30 + 60 * i, users[i])
    }, G.GingerRanking.prototype.initUser = function(y, userData) {
        var rankTxt = new G.Text(30, y, userData.rank.toString(), {
            fill: "#007D5D",
            font: "ComicSansBold",
            fontSize: "30px"
        }, .5, 50);
        this.rankingGroup.add(rankTxt);
        var nameTxt = (G.makeExtImage(80, y, userData.avatar, "avatar_m", .5, this.rankingGroup, !1, function() {
            this.width = this.height = 50
        }), new G.Text(120, y, userData.name, {
            fill: "#007D5D",
            font: "ComicSansBold",
            fontSize: "30px"
        }, [0, .5], 160));
        this.rankingGroup.add(nameTxt);
        var gingerBg = G.makeImage(340, y - 4, "Ranking_Small_Counter", .5, this.rankingGroup),
            gingerTxt = new G.Text(355, y, userData.gingerAmount.toString(), {
                fill: "white",
                font: "ComicSansBold",
                fontSize: "30px"
            }, .5, 40);
        this.rankingGroup.add(gingerTxt), this.rankingUsers.push({
            userData: userData,
            rankTxt: rankTxt,
            nameTxt: nameTxt,
            gingerBg: gingerBg,
            gingerTxt: gingerTxt
        })
    }, G.HighscorePanel = function() {
        Phaser.Group.call(this, game), this.hidingOffset = 500, this.hidingOffsetTarget = 0, this.x = .5 * game.width + game.world.bounds.x + this.hidingOffset, this.y = game.height, this.scrolled = !1, this.opened = !1, this.contentBg = G.makeImage(0, 0, "highscore-panel-content-bg", [.5, 0], this), this.contentBg.inputEnabled = !0, this.contentBg.events.onInputDown.add(function() {
            this.clicked = !0
        }, this), this.clicked = !1, this.tabsGroup = this.add(game.add.group()), this.tabsGroup.x = -320, this.tabs = {}, this.contentGroup = this.add(game.add.group()), this.contentGroup.x = -302, this.contentGroup.y = 68, this.borderImg = G.makeImage(0, 0, "highscore-panel-border", [.5, 0], this), this.initCheck = !1, this.responseData = !1, this.prevY = this.y, this.inputPrevY = null, this.inputVelY = 0, this.inputPrevX = null, this.inputVelX = 0, this.maskGfx = this.add(game.add.graphics()), this.maskGfx.y = 68, this.maskGfx.alpha = .5, this.maskWidth = 604, this.borderWidth = 5, this.maskHeight = 80, this.visiblePx = 195, this.updateMaskSize(), this.chinGroup = this.add(game.add.group()), this.inviteBtn = new G.Button(0, 0, "btn_invite", G.platform.invite), this.inviteBtn.addTextLabel("font-white", G.txt("Invite!"), 50), this.chinGroup.add(this.inviteBtn), this.toggleBtn = new G.Button(260, 0, "btn_up", function() {
            this.opened ? this.close() : (G.gameTracking.design("LeaderBoardExpandBtnClicked"), this.open())
        }, this), this.chinGroup.add(this.toggleBtn), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), this.leaderboards = {}, this.leaderboardsV = {}, this.fetchedData = {}, this.currentLeaderboard = null
    }, G.HighscorePanel.prototype = Object.create(Phaser.Group.prototype), G.HighscorePanel.prototype.init = function() {
        var data = {
                GLOBAL: G.LeaderboardData.getLeaderboardData("GLOBAL"),
                FRIENDS: G.LeaderboardData.getLeaderboardData("FRIENDS")
            },
            config = {
                vertical: !0,
                allEntries: !0,
                entriesNr: 5
            },
            configH = {
                vertical: !1,
                allEntries: !0,
                entriesNr: 5
            };
        Object.keys(data).forEach(function(key, i) {
            "GLOBAL" === key ? (configH.displayFullPos = !0, configH.displayPos = !1) : (configH.displayFullPos = !1, configH.displayPos = !0), this.leaderboardsV[key] = this.add(new G.HighscorePanelLeaderboard(data[key], config)), this.leaderboardsV[key].visible = !1, this.leaderboards[key] = this.add(new G.HighscorePanelLeaderboard(data[key], configH)), this.leaderboards[key].visible = !1, this.tabs[key] = this.tabsGroup.add(new G.HighscorePanelTabBtn(0, 0, key)), this.tabs[key].onTabClick.add(this.showLeaderboard, this)
        }, this), -1 !== Object.keys(data).indexOf("FRIENDS") ? this.showLeaderboard("FRIENDS") : this.showLeaderboard(Object.keys(data)[0])
    }, G.HighscorePanel.prototype.fetchData = function(key) {
        this.fetchedData[key] || (this.fetchedData[key] = !0, G.LeaderboardData.fetchLeaderboard(key, function(data) {
            this.fetchedData[key] = data, this.leaderboards[key].init(data), this.leaderboardsV[key].init(data), this.leaderboardsV[key].centerOnCurrent(this.maskWidth, 712), this.leaderboards[key].centerOnCurrent(this.maskWidth, 712)
        }, this))
    }, G.HighscorePanel.prototype.onScreenResize = function() {
        this.x = .5 * game.width + game.world.bounds.x
    }, G.HighscorePanel.prototype.showLeaderboard = function(key) {
        this.contentGroup.removeAll();
        for (name in this.leaderboards) this.leaderboards[name].visible = !1, this.leaderboards[name].mask = !1, this.tabs[name].setAsInactive();
        for (name in this.leaderboardsV) this.leaderboardsV[name].visible = !1, this.leaderboardsV[name].mask = !1, this.tabs[name].setAsInactive();
        var leaderboards = this.opened ? this.leaderboardsV : this.leaderboards;
        leaderboards[key] && (this.currentLeaderboard = leaderboards[key], this.maskGfx.visible = !0, this.currentLeaderboard.visible = !0, this.currentLeaderboard.mask = this.maskGfx, this.tabs[key].setAsActive(), this.tabsGroup.bringToTop(this.tabs[key]), this.contentGroup.add(this.currentLeaderboard), this.currentLeaderboardName = key, this.fetchData(key)), this.inputVelY = 0, this.inputVelX = 0
    }, G.HighscorePanel.prototype.update = function() {
        this.y = game.height + this.hidingOffset - this.visiblePx, this.chinGroup.y = this.visiblePx - 30, this.currentLeaderboard && this.currentLeaderboard.update(), this.updateMaskSize(), this.updateInput(), this.hidingOffset = G.lerp(this.hidingOffset, this.hidingOffsetTarget, .1)
    }, G.HighscorePanel.prototype.updateMaskSize = function() {
        this.maskGfx.clear(), this.maskGfx.beginFill(16711680, 1), this.maskGfx.drawRect(this.maskWidth * -.5, 0, this.maskWidth, this.maskHeight)
    }, G.HighscorePanel.prototype.updateInput = function() {
        if (this.clicked && this.currentLeaderboard && game.input.activePointer.isDown) {
            if (null !== this.inputPrevX) {
                var diffX = .5 * (game.input.activePointer.x - this.inputPrevX);
                this.inputVelX = diffX
            }
            if (null !== this.inputPrevY) {
                var diffY = .5 * (game.input.activePointer.y - this.inputPrevY);
                this.inputVelY = diffY
            }
            this.scrolled || (G.gameTracking.design("LeaderboardMapScrolled"), this.scrolled = !0), this.inputPrevX = game.input.activePointer.x, this.inputPrevY = game.input.activePointer.y
        } else this.clicked = !1, this.inputPrevY = null, this.inputPrevX = null;
        this.currentLeaderboard && (this.currentLeaderboard.HORIZONTAL && (this.currentLeaderboard.x += this.inputVelX), this.currentLeaderboard.VERTICAL && (this.currentLeaderboard.y += this.inputVelY), this.boundRistrict(this.currentLeaderboard)), this.inputVelX *= .95, this.inputVelY *= .95, Math.abs(this.inputVelX) < 1 && (this.inputVelX = 0), Math.abs(this.inputVelY) < 1 && (this.inputVelY = 0)
    }, G.HighscorePanel.prototype.boundRistrict = function(obj) {
        if (obj.VERTICAL) {
            var maxY = 0,
                minY = Math.min(0, -(obj.height - this.maskHeight));
            obj.y > maxY && (obj.y = G.lerp(obj.y, maxY, .5), obj.y < maxY + 1 && (obj.y = maxY)), obj.y < minY && (obj.y = G.lerp(obj.y, minY, .5), obj.y > minY + 1 && (obj.y = minY))
        }
        if (obj.HORIZONTAL) {
            var maxX = 0,
                minX = Math.min(0, -(obj.width - this.maskWidth));
            obj.x > maxX && (obj.x = G.lerp(obj.x, maxX, .5), obj.x < maxX + 1 && (obj.x = maxX)), obj.x < minX && (obj.x = G.lerp(obj.x, minX, .5), obj.x > minX + 1 && (obj.x = minX))
        }
    }, G.HighscorePanel.prototype.open = function(immediate) {
        this.opened = !0, G.stopTweens(this), this.visiblePx = 850, this.toggleBtn.angle = 180, this.maskHeight = this.visiblePx - 70 - 68, this.showLeaderboard(this.currentLeaderboardName)
    }, G.HighscorePanel.prototype.close = function(immediate) {
        this.opened = !1, G.stopTweens(this), this.visiblePx = 195, this.toggleBtn.angle = 0, this.maskHeight = this.visiblePx - 70, this.showLeaderboard(this.currentLeaderboardName)
    }, G.HighscorePanelIngame = function() {
        Phaser.Group.call(this, game), this.fixedToCamera = !0, this.contentBg = G.makeImage(0, 0, "leaderboard_ingame_panel", [.5, 1], this), this.contentBg.inputEnabled = !0, this.contentBg.events.onInputDown.add(function() {
            this.clicked = !0
        }, this), this.clicked = !1, this.contentGroup = this.add(game.add.group()), this.contentGroup.x = -302, this.contentGroup.y = -85, this.currentLeaderboard = new G.HighscorePanelLeaderboard([], {
            vertical: !1,
            entriesNr: 5,
            allEntries: !0,
            displayPos: !0
        }), this.contentGroup.add(this.currentLeaderboard), this.add(this.contentGroup), this.maskGfx = this.add(game.add.graphics()), this.maskGfx.y = -85, this.maskGfx.alpha = .5, this.maskWidth = 604, this.maskHeight = 80, this.maskGfx.beginFill(16711680, 1), this.maskGfx.drawRect(this.maskWidth * -.5, 0, this.maskWidth - 140, this.maskHeight), this.inputPrevY = null, this.inputVelY = 0, this.inputPrevX = null, this.inputVelX = 0, this.currentLeaderboard.mask = this.maskGfx, G.LeaderboardData.fetchLevelLeaderboard(G.lvl.lvlNr + 1, function(data, beatenFriendData) {
            this.currentLeaderboard.init(data), this.currentLeaderboard.centerOnCurrent(this.maskWidth, this.maskHeight), beatenFriendData && G.sb("pushWindow").dispatch(["friendBeaten", beatenFriendData[0], beatenFriendData[1]])
        }, this), this.inviteBtn = new G.Button(235, -45, "btn_invite_ingame", G.platform.invite, this), this.inviteBtn.addTextLabel("font-white", G.txt("Invite!"), 50), this.add(this.inviteBtn), this.additionalCameraOffset = 200, game.add.tween(this).to({
            additionalCameraOffset: 0
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0), this.update()
    }, G.HighscorePanelIngame.prototype = Object.create(Phaser.Group.prototype), G.HighscorePanelIngame.prototype.update = function() {
        this.cameraOffset.x = .5 * game.width, this.cameraOffset.y = game.height + this.additionalCameraOffset, this.currentLeaderboard.update(), this.updateInput()
    }, G.HighscorePanelIngame.prototype.updateInput = function() {
        if (this.clicked && this.currentLeaderboard && game.input.activePointer.isDown) {
            if (null !== this.inputPrevX) {
                var diffX = .5 * (game.input.activePointer.x - this.inputPrevX);
                this.inputVelX = diffX
            }
            if (null !== this.inputPrevY) {
                var diffY = .5 * (game.input.activePointer.y - this.inputPrevY);
                this.inputVelY = diffY
            }
            this.scrolled || (G.gameTracking.design("LeaderboardMapScrolled"), this.scrolled = !0), this.inputPrevX = game.input.activePointer.x, this.inputPrevY = game.input.activePointer.y
        } else this.clicked = !1, this.inputPrevY = null, this.inputPrevX = null;
        this.currentLeaderboard && (this.currentLeaderboard.HORIZONTAL && (this.currentLeaderboard.x += this.inputVelX), this.currentLeaderboard.VERTICAL && (this.currentLeaderboard.y += this.inputVelY), this.boundRistrict(this.currentLeaderboard)), this.inputVelX *= .95, this.inputVelY *= .95, Math.abs(this.inputVelX) < 1 && (this.inputVelX = 0), Math.abs(this.inputVelY) < 1 && (this.inputVelY = 0)
    }, G.HighscorePanelIngame.prototype.boundRistrict = function(obj) {
        if (obj.HORIZONTAL) {
            var maxX = 0,
                minX = Math.min(0, -(obj.width - this.maskWidth)) - 140;
            obj.x > maxX && (obj.x = G.lerp(obj.x, maxX, .5), obj.x < maxX + 1 && (obj.x = maxX)), obj.x < minX && (obj.x = G.lerp(obj.x, minX, .5), obj.x > minX + 1 && (obj.x = minX))
        }
    }, G.HighscorePanelLeaderboard = function(data, config) {
        Phaser.Group.call(this, game), this.config = config || {}, this.config = JSON.parse(JSON.stringify(config)), this.brush = game.make.image(0, 0), this.avatarAlphaMask = game.make.image(0, 0, "leaderboard", "highscore-avatar-alphaMask"), this.txt = new G.Text(0, 0, " ", {}), this.rt = game.make.renderTexture(602, 70), this.rtPadding = config.rtPadding || 10, this.image = this.add(game.make.image(0, 0, this.rt)), this.waitingIcon = new G.WaitingIcon(301, 45), this.add(this.waitingIcon), config.vertical ? (this.VERTICAL = !0, this.rt.resize(602, 300), this.waitingIcon.y = 150) : (this.HORIZONTAL = !0, this.waitingIcon.y = 35, this.waitingIcon.scale.setTo(.75)), this.currentUser = null, this.currentUserX = null, this.currentUserY = null
    }, G.HighscorePanelLeaderboard.prototype = Object.create(Phaser.Group.prototype), G.HighscorePanelLeaderboard.prototype.init = function(data) {
        this.waitingIcon.destroy();
        var entriesNr;
        if (entriesNr = this.config.allEntries ? Math.max(data.length, this.config.entriesNr) : this.config.entriesNr, this.config.entriesMax && (entriesNr = Math.min(entriesNr, this.config.entriesMax)), this.config.vertical) {
            var heightPx = 70 * entriesNr;
            this.rt.resize(602, heightPx)
        } else {
            var widthPx = 145 * entriesNr;
            this.rt.resize(widthPx + 2 * this.rtPadding, 70)
        }
        this.rt.x = game.world.bounds.x;
        for (var i = 0; entriesNr > i; i++) this.config.vertical ? data[i] ? this.createEntryVer(0, 70 * i, data[i].rank || i + 1, data[i]) : this.createEntryVer(0, 70 * i, i + 1) : data[i] ? this.createEntryHor(this.rtPadding + 145 * i, 10, data[i].rank || i + 1, data[i]) : this.createEntryHor(this.rtPadding + 145 * i, 10, i + 1)
    }, G.HighscorePanelLeaderboard.prototype.centerOnCurrent = function(width, height) {
        this.currentUser && (this.VERTICAL ? (this.y = -this.currentUserY + .5 * height, this.y = Math.min(0, this.y)) : (this.x = -this.currentUserX + .5 * width, this.x = Math.min(0, this.x)))
    }, G.HighscorePanelLeaderboard.prototype.createEntryVer = function(x, y, rank, userData) {
        userData && userData.isCurrentUser ? (G.changeTexture(this.brush, "highscore-v-hl-current"), this.rt.renderXY(this.brush, x, y)) : rank % 2 == 1 && (G.changeTexture(this.brush, "highscore-v-hl"), this.rt.renderXY(this.brush, x, y)), this.txt.fill = "#008bf9", this.txt.fontSize = "25px", this.txt.anchor.x = .5, this.txt.updateTransform(), this.txt.userMaxWidth = 40, this.txt.setText(rank.toString() + "."), this.txt.width = Math.min(40, this.txt.width), this.rt.renderXY(this.txt, x + 45, y + 17);
        var that = this;
        if (userData) {
            G.makeExtImage(x + 80, y + 10, userData.image, "avatar_m", 0, this, !1, function() {
                avatar = that.alphaMaskAvatar(x + 80, y + 10, this, userData && userData.isCurrentUser, rank), this.destroy()
            })
        } else G.changeTexture(this.brush, "avatar_m"), avatar = this.alphaMaskAvatar(x + 80, y + 10, this.brush, userData && userData.isCurrentUser, rank);
        var name = userData ? userData.name : "---";
        this.txt.anchor.x = 0, this.txt.updateTransform(), this.txt.fill = "#008bf9", this.txt.fontSize = "25px", this.txt.userMaxWidth = 250, this.txt.setText(name), this.rt.renderXY(this.txt, x + 145, y + 17), userData && userData.score && (this.txt.fill = "#008bf9", this.txt.fontSize = "25px", this.txt.userMaxWidth = 250, this.txt.anchor.x = 1, this.txt.updateTransform(), this.txt.setText(userData.score.toString()), this.rt.renderXY(this.txt, x + 570, y + 17)), userData && userData.isCurrentUser && (this.currentUser = !0, this.currentUserY = y + 35)
    }, G.HighscorePanelLeaderboard.prototype.createEntryHor = function(x, y, rank, userData) {
        G.changeTexture(this.brush, "highscore-h-playerBg_small"), this.rt.renderXY(this.brush, x + 10, y);
        var avatar, that = this;
        if (userData) {
            G.makeExtImage(x + 0, y - 0, userData.image, "avatar_m", 0, this, !1, function() {
                avatar = that.alphaMaskAvatar(x, y + 0, this, userData && userData.isCurrentUser, rank), this.destroy()
            })
        } else G.changeTexture(this.brush, "avatar_m"), avatar = this.alphaMaskAvatar(x, y + 0, this.brush, userData && userData.isCurrentUser, rank);
        var name = userData ? userData.name : "---";
        this.txt.anchor.x = 0, this.txt.updateTransform(), this.txt.fill = "#008bf9", this.txt.fontSize = "20px", this.txt.userMaxWidth = 60, this.txt.setText(name), this.rt.renderXY(this.txt, x + 55, y + 3), userData && userData.score && (this.txt.fill = "#008bf9", this.txt.fontSize = "20px", this.txt.userMaxWidth = 60, this.txt.setText(userData.score.toString()), this.rt.renderXY(this.txt, x + 55, y + 25)), userData && userData.isCurrentUser && (this.currentUser = !0, this.currentUserX = x + 100)
    }, G.HighscorePanelLeaderboard.prototype.alphaMaskAvatar = function(x, y, avatar, current, rank) {
        var bitmapData = game.make.bitmapData(50, 50),
            rect = new Phaser.Rectangle(0, 0, 50, 50);
        bitmapData.alphaMask(avatar, this.avatarAlphaMask, rect, rect);
        var spriteBorder;
        spriteBorder = this.config.displayPos ? "highscore-avatar-border_num" : this.config.displayFullPos ? "highscore-avatar-border_num_full" : "highscore-avatar-border", G.changeTexture(this.brush, spriteBorder), bitmapData.draw(this.brush, 0, 0, 50, 50);
        var img = bitmapData.addToWorld();
        if (this.rt.renderXY(img, x, y), bitmapData.destroy(), img.destroy(), current && (G.changeTexture(this.brush, "highscore-avatar-userBorder"), this.rt.renderXY(this.brush, x - 5, y - 5)), this.config.displayPos || this.config.displayFullPos) {
            this.txt.fontSize = "12px", this.txt.fill = "white", this.txt.anchor.x = .5, this.txt.userMaxWidth = this.config.displayPos ? 17 : 48, this.txt.setText(rank.toString());
            var xx = this.config.displayPos ? x + 10 : x + 25;
            this.rt.renderXY(this.txt, xx, y + 32)
        }
    }, G.HighscorePanelTabBtn = function(x, y, key) {
        this.onTabClick = new Phaser.Signal, this.tabKeyLower = key.toLowerCase(), G.Button.call(this, x, y, "highscore-panel-tab-" + this.tabKeyLower + "-inactive", function() {
            this.onTabClick.dispatch(this.tabKey)
        }, this), this.anchor.setTo(0, 0), this.hitArea = new Phaser.Rectangle("GLOBAL" == key ? 0 : 320, 0, 320, 68), this.tabKey = key, this.keyTxt = new G.Text("GLOBAL" == key ? 160 : 480, 30, G.txt(key), {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "40px",
            stroke: "#0a7fd5",
            strokeThickness: 1
        }, .5, 300), this.keyTxt.setShadow(0, 2, "#0a7fd5", 2, !0, !0), this.addChild(this.keyTxt), this.IMMEDIATE = !0, this.setAsInactive()
    }, G.HighscorePanelTabBtn.prototype = Object.create(G.Button.prototype), G.HighscorePanelTabBtn.prototype.setAsActive = function() {
        G.changeTexture(this, "highscore-panel-tab-" + this.tabKeyLower + "-active"), this.keyTxt.alpha = 1, this.keyTxt.y = 25
    }, G.HighscorePanelTabBtn.prototype.setAsInactive = function() {
        G.changeTexture(this, "highscore-panel-tab-" + this.tabKeyLower + "-inactive"), this.keyTxt.alpha = .5, this.keyTxt.y = 30
    }, G.LeaderboardData = {
        currentPlayer: null,
        lastGroupPosition: null,
        ready: !1,
        onReady: new Phaser.Signal,
        onFetch: {},
        onStateBinding: !1,
        leaderboards: {},
        onPerLevelFetch: new Phaser.Signal,
        perLevelPrev: [],
        fetchLeaderboard: function(scope, callback, context) {
            callback && (this.onFetch[scope] || (this.onFetch[scope] = new Phaser.Signal), this.onFetch[scope].addOnce(callback, context)), this.onStateBinding || (this.onStateBinding = game.state.onStateChange.add(this.clearFetch, this))
        },
        fetchLevelLeaderboard: function(lvlNr, callback, context) {
            callback && this.onPerLevelFetch.addOnce(callback, context), this.onStateBinding || (this.onStateBinding = game.state.onStateChange.add(this.clearFetch, this))
        },
        getBeatenFriend: function(oldData, newData) {
            try {
                var oldDataPlayer = oldData.find(function(p) {
                        return p.isCurrentUser
                    }),
                    oldDataPlayerIndex = oldData.indexOf(oldDataPlayer),
                    oldDataPlayerScore = oldDataPlayer ? oldDataPlayer.score : 0,
                    newDataPlayer = newData.find(function(p) {
                        return p.isCurrentUser
                    }),
                    newDataPlayerIndex = newData.indexOf(newDataPlayer),
                    newDataPlayerScore = newDataPlayer ? newDataPlayer.score : 0;
                if (!newDataPlayer) return null;
                if (oldDataPlayerScore >= newDataPlayerScore) return null;
                var userBehind = newData[newDataPlayerIndex + 1];
                if (!userBehind) return null;
                if (0 === oldDataPlayerScore) return userBehind ? [newDataPlayer, userBehind] : null;
                for (var userBehindId = userBehind.userId, i = 0; oldDataPlayerIndex > i; i++)
                    if (oldData[i].userId === userBehindId) return [newDataPlayer, userBehind];
                return null
            } catch (e) {
                console.log(e)
            }
        },
        clearFetch: function() {
            console.log("clear Fetch"), Object.keys(this.onFetch).forEach(function(key) {
                this.onFetch[key].removeAll()
            }, this), this.onReady.removeAll(), this.onPerLevelFetch.removeAll()
        },
        getLeaderboardData: function(key) {
            return this.leaderboards && this.leaderboards[key] ? this.leaderboards[key] : []
        },
        processLeaderboard: function(data, scope) {
            console.log("processLeaderboard"), this.leaderboards[scope] = data[scope], this.leaderboards.FRIENDS && (this.currentPlayer = this.leaderboards.FRIENDS.find(function(user) {
                return user.isCurrentUser
            }))
        },
        checkIfNewHighscoreTier: function() {
            if (G.saveState.data && this.currentPlayer && this.currentPlayer.score > 15e3) {
                var tier = Math.floor(this.currentPlayer.score / 15e3);
                G.saveState.data.highscoreTierMsgs || (G.saveState.data.highscoreTierMsgs = []), -1 == G.saveState.data.highscoreTierMsgs.indexOf(tier) && (G.saveState.data.highscoreTierMsgs.push(tier), G.saveState.save(), G.platform.sendMsg("New highscore!", G.MsgWOW, {
                    name: this.currentPlayer.name,
                    avatar: this.currentPlayer.image,
                    score: this.currentPlayer.score
                }))
            }
        },
        checkIfBeat: function() {
            try {
                if (this.leaderboardsPrev && this.leaderboards && this.leaderboardsPrev.GROUP && this.leaderboards.GROUP) {
                    var lastCurrentPlayer = this.leaderboardsPrev.GROUP.find(function(user) {
                        return user.isCurrentUser
                    });
                    console.log("lastCurrent", lastCurrentPlayer);
                    var currentPlayer = this.leaderboards.GROUP.find(function(user) {
                        return user.isCurrentUser
                    });
                    if (console.log("current", currentPlayer), lastCurrentPlayer && currentPlayer && currentPlayer.rank > lastCurrentPlayer.rank) {
                        var index = this.leaderboardsPrev.GROUP.indexOf(currentPlayer),
                            otherPlayer = this.leaderboardsPrev.GROUP[index + 1];
                        console.log("other", otherPlayer), otherPlayer && G.platform.beatMsg({
                            name: this.currentPlayer.name,
                            avatar: this.currentPlayer.image,
                            score: this.currentPlayer.score
                        }, {
                            name: otherPlayer.name,
                            avatar: otherPlayer.image,
                            score: otherPlayer.score
                        })
                    }
                }
            } catch (e) {}
        }
    }, G.platform = {
        invite: function() {},
        firstLevelMsg: function(points) {
            return
        },
        beatMsg: function(currentUser, otherUser) {},
        shareBeatMsg: function(currentUser, otherUser) {
            return
        },
        sendMsg: function(text, msg, user1, user2) {
            return
        }
    }, G.msgToDataURL = function(msgObj) {
        return G._msgBmp || (G._msgBmp = game.make.bitmapData(672, 354)), msgObj.x = game.world.bounds.x, msgObj.y = game.world.bounds.y, msgObj.updateTransform(), G._msgBmp.clear(), G._msgBmp.drawGroup(msgObj), msgObj.destroy(), G._msgBmp.canvas.toDataURL()
    }, G.MsgBeaten = function(user1, user2) {
        Phaser.Group.call(this, game), console.log("G.MsgBeaten"), console.log(user1, user2), user1.avatar || (user1.avatar = user1.image), user2.avatar || (user2.avatar = user2.image), this.imagesToLoad = 2, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_beat", 0, this), this.friendsBeaten = this.add(new G.Text(336, 40, "Friend beaten!", {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "white"
        }, .5, 420));
        var that = this;
        this.avatar1 = G.makeExtImage(230, 129, user1.avatar, null, 0, this, !1, function() {
            this.width = this.height = 94, that.imagesLoaded++, that.imagesLoaded == that.imagesToLoad && (that.ready = !0, game.time.events.add(100, that.onReady.dispatch, that.onReady))
        }), this.name1 = this.add(new G.Text(212, 156, user1.name, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#0088d1"
        }, [1, .5], 420)), this.score1 = this.add(new G.Text(212, 196, user1.score, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 4
        }, [1, .5], 420)), this.avatar2 = G.makeExtImage(354, 148, user2.avatar, null, 0, this, !1, function() {
            this.width = this.height = 94, that.imagesLoaded++, that.imagesLoaded == that.imagesToLoad && (that.ready = !0, game.time.events.add(100, that.onReady.dispatch, that.onReady))
        }), this.name2 = this.add(new G.Text(470, 186, user2.name, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#0088d1"
        }, [0, .5], 420)), this.avatar2.width = this.avatar2.height = 94, this.score2 = this.add(new G.Text(470, 226, user2.score, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 4
        }, [0, .5], 420));
        var msg = " scored higher than ";
        this.desc = this.add(new G.Text(336, 311, user1.name + msg + user2.name + "!", {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#ffe715"
        }, .5, 420)), this.desc.addColor("#ffffff", user1.name.length), this.desc.addColor("#ffe715", msg.length + user1.name.length), this.desc.addColor("#ffffff", msg.length + user1.name.length + user2.name.length)
    }, G.MsgBeaten.prototype = Object.create(Phaser.Group.prototype), G.MsgBeatMe = function(user1) {
        Phaser.Group.call(this, game), this.imagesToLoad = 1, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_beat_me", 0, this), this.friendsBeaten = this.add(new G.Text(336, 39, "Challenge Friend", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "white"
        }, .5, 420));
        var that = this;
        this.avatar1 = G.makeExtImage(380, 111, user1.avatar, null, 0, this, !1, function() {
            this.width = this.height = 96, that.imagesLoaded++, that.imagesLoaded == that.imagesToLoad && (that.ready = !0, game.time.events.add(100, that.onReady.dispatch, that.onReady))
        }), this.name1 = this.add(new G.Text(424, 325, user1.name, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#0088d1"
        }, .5, 420)), this.score1 = this.add(new G.Text(424, 266, user1.score, {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 4
        }, .5, 420)), this.name2 = this.add(new G.Text(241, 325, "YOU", {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#0088d1"
        }, .5, 420)), this.score2 = this.add(new G.Text(241, 266, "???", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 4
        }, .5, 420)), this.desc = this.add(new G.Text(336, 311, "Can you beat me?", {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "white"
        }, .5, 420))
    }, G.MsgBeatMe.prototype = Object.create(Phaser.Group.prototype), G.MsgFirst = function(user1) {
        Phaser.Group.call(this, game), this.imagesToLoad = 1, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_first_highscore", 0, this), this.friendsBeaten = this.add(new G.Text(336, 39, "First highscore ever!", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "white"
        }, .5, 420));
        var that = this;
        this.avatar1 = G.makeExtImage(266, 103, user1.avatar, null, 0, this, !1, function() {
            this.width = this.height = 139, that.imagesLoaded++, that.imagesLoaded == that.imagesToLoad && (that.ready = !0, game.time.events.add(100, that.onReady.dispatch, that.onReady))
        }), this.score1 = this.add(new G.Text(336, 295, user1.score, {
            font: "ComicSansBold",
            fontSize: "65px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 8
        }, .5, 420))
    }, G.MsgFirst.prototype = Object.create(Phaser.Group.prototype), G.MsgFirst.prototype.extToInt = function(url) {
        return G.extLoader.loadedUrls[url]
    }, G.MsgInvite = function(user1) {
        Phaser.Group.call(this, game), this.imagesToLoad = 1, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_woow", 0, this), this.friendsBeaten = this.add(new G.Text(336, 39, "Play with me!", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "white"
        }, .5, 420)), this.score1 = this.add(new G.Text(336, 295, user1.name, {
            font: "ComicSansBold",
            fontSize: "65px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 8
        }, .5, 420));
        var that = this;
        this.avatar1 = G.makeExtImage(266, 103, user1.avatar, null, 0, this, !1, function() {
            this.width = this.height = 139, that.imagesLoaded++, that.imagesLoaded == that.imagesToLoad && (that.ready = !0, game.time.events.add(100, that.onReady.dispatch, that.onReady))
        })
    }, G.MsgInvite.prototype = Object.create(Phaser.Group.prototype), G.MsgWOW = function(user1) {
        Phaser.Group.call(this, game), this.imagesToLoad = 1, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_woow", 0, this), this.friendsBeaten = this.add(new G.Text(336, 39, "Wow! See what I achieved!", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "white"
        }, .5, 420));
        var that = this;
        this.avatar1 = G.makeExtImage(266, 103, user1.avatar, null, 0, this, !1, function() {
            this.width = this.height = 139, that.imagesLoaded++, that.imagesLoaded == that.imagesToLoad && (that.ready = !0, game.time.events.add(100, that.onReady.dispatch, that.onReady))
        }), this.score1 = this.add(new G.Text(336, 295, user1.score, {
            font: "ComicSansBold",
            fontSize: "65px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 8
        }, .5, 420))
    }, G.MsgWOW.prototype = Object.create(Phaser.Group.prototype), G.MsgWOW.prototype.extToInt = function(url) {
        return G.extLoader.loadedUrls[url]
    }, G.Window = function(type) {
        Phaser.Group.call(this, game), this.buttonsList = [], this.state = game.state.getCurrentState(), type.constructor === Array ? this[type[0]].apply(this, type.slice(1)) : this[type].apply(this, Array.prototype.slice.call(arguments, 1)), "taskSlider" != type && (game.add.tween(this.scale).from({
            x: 0
        }, 300, Phaser.Easing.Elastic.Out, !0), game.add.tween(this).from({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0)), G.sb("onWindowOpened").dispatch(this), G.sb("onStateChange").add(this.lockInput, this)
    }, G.Window.prototype = Object.create(Phaser.Group.prototype), G.Window.constructor = G.Window, G.Window.prototype.closeWindow = function(callback, context) {
        this.closing || (this.lockInput(), this.closing = !0, this.boosterHighlight && (this.boosterHighlight.inputEnabled = !1, game.add.tween(this.boosterHighlight.shine).to({
            alpha: 0
        }, 800, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            this.boosterHighlight.destroy()
        }, this)), game.add.tween(this.scale).to({
            x: 1.5
        }, 200, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            G.sb("onWindowClosed").dispatch(), this.destroy(), callback && callback.call(context || !1)
        }, this))
    }, G.Window.prototype.addBackground = function(image) {
        var image = image || "popup";
        this.bg = G.makeImage(0, 0, image, .5, this)
    }, G.Window.prototype.addCloseButton = function(x, y, callback, context) {
        var callback = callback || !1,
            context = context || this;
        this.closeButton = new G.Button(x || 250, y || -270, "btn_x", function() {
            this.closeWindow(callback, context)
        }, this), this.registerButtons(this.closeButton)
    }, G.Window.prototype.registerButtons = function(obj) {
        for (var i = 0; i < arguments.length; i++) this.buttonsList.push(arguments[i]), this.add(arguments[i]), arguments[i].addTerm(function() {
            return 1 == this.scale.x
        }, this)
    }, G.Window.prototype.lockInput = function() {
        this.buttonsList.forEach(function(child) {
            child.input.enabled = !1
        })
    }, G.Window.prototype.unlockInput = function() {
        this.buttonsList.forEach(function(child) {
            child.input.enabled = !0, child.input.useHandCursor = !0
        })
    }, G.Window.prototype.makeCoinBar = function(x, y, windowToOpen) {
        this.coinArea = G.makeImage(0, y, "popup_text_backgr", .5, this), this.coinIco = G.makeImage(x - 130, y, "coin_1", .5, this), this.coinsTxt = new G.Text(0, y, G.saveState.getCoins().toString(), {
            style: "font-brown",
            fontSize: 45
        }, .5, 190), this.add(this.coinsTxt), game.incentivised && (this.plusBtn = new G.Button(x + 130, y, "btn_plus", function() {
            this.state.windowLayer.pushWindow(["moreMoney", windowToOpen]), this.closeWindow()
        }, this), this.registerButtons(this.plusBtn))
    }, G.Window.prototype.buyLives = function() {
        game.incentivised ? this.buyLivesIncentivised() : this.buyLivesNotIncentivised()
    }, G.Window.prototype.buyLivesIncentivised = function() {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(0, -300, G.txt("Not enough Hearts"), {
            style: "font-beige",
            fontSize: "50px"
        }, .5, 300), this.add(this.titleTxt), this.closeButton = new G.Button(250, -255, "btn_x", function() {
            this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.preGroup = this.add(game.make.group()), this.heartImg = G.makeImage(0, -85, "icon_video_hearts", [.5, .5], this), this.preGroup.add(this.heartImg), this.watchVideoToGetTxt = new G.Text(0, 45, G.txt("Watch a video to get"), {
            style: "font-brown",
            fontSize: "40px"
        }, .5, 500), this.preGroup.add(this.watchVideoToGetTxt), this.moneyTxt = new G.LabelGroupT("+" + G.json.settings.livesForAd + " @heart@", 0, 110, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#85511f",
            stroke: "#ffedd9",
            strokeThickness: 5
        }, .5, 500), this.preGroup.add(this.moneyTxt), this.watchBtn = new G.Button(0, 220, "btn_green", function() {
            this.watchBtn.inputEnabled = !1, "World" == game.state.current ? this.buyLivesIncentivised_thanks() : G.saveState.addLife(G.json.settings.livesForAd)
        }, this), this.watchBtn.addTextLabel("font-blue-out", G.txt("Watch"), 50), this.registerButtons(this.watchBtn)
    }, G.Window.prototype.buyLivesIncentivised_thanks = function() {
        game.add.tween(this.preGroup).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.watchBtn.inputEnabled = !1, game.add.tween(this.watchBtn).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.postGroup = this.add(game.make.group()), this.thanksForWatching = new G.Text(0, -100, G.txt("Thanks for watching!"), {
            style: "font-blue",
            fontSize: "50px"
        }, .5, 500), this.postGroup.add(this.thanksForWatching), this.moneyBg = G.makeImage(0, 25, "popup_bigtext_backgr", [.5, .5], this.postGroup), this.moneyTxt = new G.LabelGroupT("+" + G.json.settings.livesForAd + " @heart@", 0, 25, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#85511f",
            stroke: "#ffedd9",
            strokeThickness: 5
        }, .5, 500), this.postGroup.add(this.moneyTxt), this.postGroup.alpha = 0, game.add.tween(this.postGroup).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.claimBtn = new G.Button(0, 230, "button_green", function() {
            if ("World" == game.state.current) {
                var batch = this.state.uiTargetParticles.createDividedBatch(game.world.bounds.x + this.worldPosition.x, this.worldPosition.y, "heart", this.state.panel.lifeUI.lifeIcon, G.json.settings.livesForAd, 1);
                batch.addOnPartFinish(function() {
                    G.saveState.addLife(1)
                }), batch.start()
            } else G.saveState.addLife(G.json.settings.livesForAd);
            this.closeWindow()
        }, this), this.claimBtn.addTextLabel("font-white", G.txt("Claim"), 50), this.registerButtons(this.claimBtn), game.add.tween(this.claimBtn).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.Window.prototype.buyLivesNotIncentivised = function() {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(0, -300, G.txt("Not enough Hearts"), {
            style: "font-beige",
            fontSize: "50px"
        }, .5, 300), this.add(this.titleTxt), this.closeButton = new G.Button(250, -255, "btn_x", function() {
            this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.heartImg = G.makeImage(0, -70, "broken_heart", [.5, .5], this), this.heartImg.scale.setTo(2), this.moneyTxt = new G.LabelGroupT("+1 @heart@ = " + G.json.settings.lifePrice + "@coin_1@", 0, 60, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#85511f",
            stroke: "#ffedd9",
            strokeThickness: 5
        }, .5, 500), this.add(this.moneyTxt), this.buyBtn = new G.Button(0, 220, "btn_orange", function() {
            if (G.gameTracking.sink("Coins", "Life", "Map", G.json.settings.lifePrice),
                G.saveState.changeCoins(-G.json.settings.lifePrice, !0), "World" == game.state.current) {
                var batch = this.state.uiTargetParticles.createDividedBatch(game.world.bounds.x + this.worldPosition.x, this.worldPosition.y, "heart", this.state.panel.lifeUI.lifeIcon, 1, 1);
                batch.addOnPartFinish(function() {
                    G.saveState.addLife(1)
                }), batch.start()
            } else G.saveState.addLife(1);
            this.closeWindow()
        }, this), this.buyBtn.addTextLabel("font-green", G.txt("Buy"), 50), this.registerButtons(this.buyBtn), G.saveState.getCoins() < G.json.settings.lifePrice && (this.buyBtn.alpha = .5, this.buyBtn.inputEnabled = !1)
    }, G.Window.prototype.daily2 = function() {
        G.saveState.ftueDailyRewardVisible || (G.gameTracking.FTUEDesign("FTUE:DailyReward:Visible"), G.saveState.ftueDailyRewardVisible = !0), this.incentivised = game.incentivised, this.played = 0, this.addBackground("popup_background_2"), this.bg.y = G.l(40), this.ribbon = G.makeImage(0, -270, "popup_top", .5, this), this.titleTxt = new G.Text(0, -295, G.txt("Prize wheel"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 300), this.add(this.titleTxt), this.ribbonImg = G.makeImage(0, -215, "gold_wheel_ribbon", .5, this), this.ribbonTxt = new G.Text(0, 0, G.txt("3x higher winnings!"), {
            style: "font-blue-out-small",
            fontSize: 30
        }, .5, 350), this.ribbonImg.scale.setTo(0), this.ribbonImg.addChild(this.ribbonTxt), this.closeButton = new G.Button(260, -222, "btn_x", function() {
            G.saveState.ftueDailyRewardClose || (G.gameTracking.FTUEDesign("FTUE:DailyReward:Close"), G.saveState.ftueDailyRewardClose = !0), this.wonPrize && (G.gift.applyGift(this.wonPrize), "coin" === this.wonPrize[0] ? G.gameTracking.source("Coins", "Reward", "DailyReward", this.wonPrize[1]) : G.gameTracking.source(G.saveState.nrToBoosterName(this.wonPrize[0][8]), "Reward", "DailyReward", this.wonPrize[1]), this.wonPrize = !1), this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.dailyGame = this.add(new G.DailyWheel(0, 70)), this.giftGroup = this.add(game.make.group()), this.giftGroup.y = 50, this.freeSpinBtn = new G.Button(0, 335, "button_green", function() {
            this.dailyGame.restart(), this.dailyGame.launch(game.rnd.between(600, 1400)), G.gameTracking.design("DailySpinClicked"), this.closeButton.visible = !1, G.saveState.data.freeSpin = !1, G.saveState.save(), this.freeSpinBtn.visible = !1, this.premiumSpinBtn.visible = !1
        }, this), this.freeSpinBtn.addTextLabel("font-green", G.txt("Spin"), 50), this.add(this.freeSpinBtn), this.premiumSpinBtn = new G.Button(0, 280, "button_play", function() {
            this.dailyGame.restart(), this.dailyGame.launch(game.rnd.between(600, 1400)), G.gameTracking.design("DailySpinClicked"), this.closeButton.visible = !1, this.freeSpinBtn.visible = !1, this.premiumSpinBtn.visible = !1
        }, this), this.premiumSpinBtn.label = new G.Text(42, 0, G.txt("Watch a video to try again"), {
            font: "ComicSansBold",
            fontSize: "30px",
            fill: "#f7ffdb",
            stroke: "#005700",
            lineSpacing: -25,
            strokeThickness: 5
        }, .5, 230, 70, !0, "center"), this.premiumSpinBtn.addChild(this.premiumSpinBtn.label), this.add(this.premiumSpinBtn), G.saveState.data.freeSpin ? this.changeToRegular() : this.changeToGold(), this.dailyGame.onFinish.add(function(prize) {
            game.add.tween(this.dailyGame).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.daily2showPrize(prize)
        }, this), this.plusCoin = new G.LabelGroupT("+@coin_1@", 100, 30, {
            font: "ComicSansBold",
            fontSize: "100px",
            fill: "#ad7f56"
        }, .5, 200), this.plusCoin.visible = !1, this.add(this.plusCoin), this.youWinTxt = new G.Text(0, -40, G.txt("You win!"), {
            style: "font-beige",
            fontSize: 60
        }, .5, 500), this.add(this.youWinTxt), this.youWinTxt.visible = !1, this.claimButton = new G.Button(0, 260, "button_green", function() {
            this.shareCheckbox && this.shareCheckbox.selected || this.daily2ClaimBtnAction()
        }, this), this.claimButton.addTextLabel("font-green", G.txt("Claim"), 50), this.registerButtons(this.claimButton), this.claimButton.inputEnabled = !1, this.claimButton.visible = !1
    }, G.Window.prototype.daily2ClaimBtnAction = function() {
        this.daily2applyPrize(this.wonPrize, !1), this.wonPrize = !1, this.claimButton.inputEnabled = !1
    }, G.Window.prototype.daily2showPrize = function(prize) {
        this.youWinTxt.scale.setTo(0), this.youWinTxt.visible = !0, game.add.tween(this.youWinTxt.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Elastic.Out, !0), this.giftGfx = new G.LabelGroupT(G.gift.getLabelString(prize), 0, 30, {
            font: "ComicSansBold",
            fontSize: "80px",
            fill: "#ad7f56"
        }, .5, 300), this.giftGfx.scale.setTo(0), game.add.tween(this.giftGfx.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Elastic.Out, !0), this.giftGroup.add(this.giftGfx), this.wonPrize = prize, game.time.events.add(1e3, function() {
            this.plusCoin.width + this.giftGfx.width + G.l(10);
            this.claimButton.alpha = 1, this.claimButton.scale.setTo(0), game.add.tween(this.claimButton.scale).to({
                x: 1,
                y: 1
            }, 600, Phaser.Easing.Elastic.Out, !0).onComplete.add(function() {
                this.claimButton.inputEnabled = !0, this.claimButton.input.useHandCursor = !0
            }, this), this.claimButton.visible = !0, this.shareCheckbox && (this.shareCheckbox.visible = !0, this.shareCheckbox.alpha = 0, game.add.tween(this.shareCheckbox).to({
                alpha: 1
            }, 600, Phaser.Easing.Elastic.Out, !0).onComplete.add(function() {
                this.shareCheckbox.ignoreChildInput = !1
            }, this)), this.closeButton.visible = !0
        }, this)
    }, G.Window.prototype.daily2applyPrize = function(prize, additional) {
        this.wonPrize = !1, "coin" === prize[0] ? (this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.giftGfx.worldPosition.x, this.giftGfx.worldPosition.y, this.state.panel.coinsTxt, prize[1]), G.gameTracking.source("Coins", "Reward", "DailyReward", prize[1])) : (G.gift.applyGift(prize), G.gameTracking.source(G.saveState.nrToBoosterName(prize[0][8]), "Reward", "DailyReward")), game.time.events.add(1e3, this.daily2restart, this)
    }, G.Window.prototype.changeToRegular = function() {
        this.freeSpinBtn.visible = !0, this.premiumSpinBtn.visible = !1, this.ribbonImg.scale.x > 0 && (G.stopTweens(this.ribbonImg), game.add.tween(this.ribbonImg.scale).to({
            x: 0,
            y: 0
        }, 200, Phaser.Easing.Cubic.In, !0)), this.dailyGame.changeToRegular()
    }, G.Window.prototype.changeToGold = function() {
        this.freeSpinBtn.visible = !1, this.premiumSpinBtn.visible = !0, this.ribbonImg.scale.x < 1 && (G.stopTweens(this.ribbonImg), game.add.tween(this.ribbonImg.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Elastic.Out, !0)), this.dailyGame.changeToGold()
    }, G.Window.prototype.daily2restart = function() {
        return game.incentivised ? (this.shareCheckbox && (this.shareCheckbox.ignoreChildInput = !0, game.add.tween(this.shareCheckbox).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0)), this.claimButton.inputEnabled = !1, game.add.tween(this.claimButton).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this.plusCoin).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this.dailyGame).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 400).onComplete.add(function() {
            G.saveState.data.freeSpin ? this.changeToRegular() : this.changeToGold()
        }, this), game.add.tween(this.youWinTxt.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), void game.add.tween(this.giftGroup).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function() {
            this.giftGroup.destroy(), this.giftGroup = this.add(game.make.group()), this.giftGroup.y = 40
        }, this)) : this.closeWindow()
    }, G.Window.prototype.daily2makeFirework = function(x, y) {
        var group = game.add.group();
        this.add(group), group.x = G.l(x), group.y = G.l(y);
        for (var i = 0; 10 > i; i++) {
            var firework = G.makeImage(0, 0, "firework", .5, group),
                angle = 36 * (i + .5 * Math.random());
            firework.fadeRate = .02 + .02 * Math.random(), firework.grav = 4, firework.scale.setTo(1.5), firework.velX = G.lengthDirX(angle, G.l(12), !1), firework.velY = G.lengthDirY(angle, G.l(12), !1), firework.update = function() {
                this.x += this.velX, this.y += this.velY, this.y += this.grav, this.velX *= .97, this.velY *= .97, this.alpha -= this.fadeRate, this.alpha <= 0 && this.destroy()
            }
        }
        return group.update = function() {
            for (var i = this.children.length; i--;) this.children[i].update();
            0 == this.length && this.destroy()
        }, group
    }, G.Window.prototype.dailyChallenge = function(level) {
        this.addBackground("popup_background_2"), this.levelBg = G.makeImage(0, -290, "popup_top", .5, this), this.levelTxt = new G.Text(0, -315, G.txt("Daily Challenge"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 330), this.add(this.levelTxt), this.closeButton = new G.Button(235, -257, "btn_x", function() {
            this.boosters.forEach(function(btn) {
                btn.signalBinding && btn.signalBinding.detach()
            }), this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.addChild(this.closeButton);
        var starsAchieved = 0;
        this.stars = [G.makeImage(-100, -150, starsAchieved >= 1 ? "star" : "star_blank", .5, this), G.makeImage(0, -175, starsAchieved >= 2 ? "star" : "star_blank", .5, this), G.makeImage(100, -150, starsAchieved >= 3 ? "star" : "star_blank", .5, this)], this.stars[0].scale.setTo(.8), this.stars[2].scale.setTo(.8), this.taskBg = G.makeImage(0, 5, "popup_bigtext_backgr", .5, this), this.taskTxt = new G.Text(0, -70, G.txt("Task") + ":", {
            style: "font-beige",
            fontSize: 45
        }, .5, 380), this.add(this.taskTxt), "collect" == level.goal[0] ? this.makeTaskCollectPanels(5, level) : this.add(new G.Text(0, 5, G.txt("points").toUpperCase() + ": " + level.goal[1], {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 380)), this.buyTxt = new G.Text(0, 75, G.txt("Buy some boosters") + ":", {
            style: "font-beige",
            fontSize: 35
        }, .5, 680), this.add(this.buyTxt), this.boosterBg = G.makeImage(0, 170, "popup_bigtext_backgr", .5, this), this.boosters = [new G.UI_StartBoosterButton(-195, 170, 5, 999), new G.UI_StartBoosterButton(0, 170, 7, 999), new G.UI_StartBoosterButton(195, 170, 8, 999)], this.addMultiple(this.boosters), this.continueBtn = new G.Button(0, 300, "btn_orange", function() {
            G.saveState.startChallenge(), G.sb("onStateChange").dispatch("Game", 999, !1, this.state.startBoosterConfig.getConfigForLevel(999), level)
        }, this), this.continueBtn.pulse(), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.dailyReward = function(dayNr) {
        this.dayNr = game.math.clamp(dayNr, 0, 6), this.y = 0, this.bg = G.makeImage(0, -330, "big_popup", [.5, 0], this), this.bg.scale.y = .9, this.ribbon = G.makeImage(0, -285, "daily_rewards_ribbon", .5, this), this.title = new G.Text(0, -300, G.txt("Daily Reward") + "!", {
            style: "font-beige-header",
            fontSize: "55px"
        }, .5, 400), this.title.padding.x = 10, this.add(this.title), G.sb("hideMainHighscorePanel").dispatch(), this.dailyReward_showCurrentGift(this.dayNr)
    }, G.Window.prototype.dailyReward_showCurrentGift = function(dayNr) {
        this.currentDay = this.add(new G.DailyRewardCurrentGift(0, -30, dayNr)), this.openBtn = new G.Button(0, 200, "btn_orange", this.dailyReward_openGift, this), this.openBtn.addTextLabel("font-green", G.txt("Open"), 40), this.add(this.openBtn)
    }, G.Window.prototype.dailyReward_openGift = function() {
        sdk.showBanner();
        this.currentDay.showReward(), this.openBtn.visible = !1, this.openBtn.inputEnabled = !1, this.claimBtn = new G.Button(0, 200, "btn_orange", function() {
            this.currentDay.claimReward(), this.claimBtn.inputEnabled = !1, game.add.tween(this.claimBtn).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.currentDay).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(this.dailyReward_showGiftWeek, this)
        }, this), this.claimBtn.addTextLabel("font-green", G.txt("Claim"), 40), this.add(this.claimBtn)
    }, G.Window.prototype.dailyReward_showGiftWeek = function(dayNr) {
        game.add.tween(this).to({
            y: -70
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.bg.scale).to({
            y: 1.1
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.week = this.add(new G.DailyRewardWeek(0, 20, this.dayNr)), this.comeBackTxt = this.add(new G.Text(0, 270, G.txt("Come back tomorrow for more rewards!"), {
            style: "font-beige",
            fontSize: "30px",
            lineSpacing: -20
        }, .5, 400, null, !0, "center")), this.comeBackTxt.scale.setTo(0), game.add.tween(this.comeBackTxt.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Elastic.Out, !0, 200), this.timerBg = G.makeImage(0, 345, "future_day_box_big", .5, this), this.timerBg.height = 40, this.timerBg.alpha = 0, game.add.tween(this.timerBg).to({
            alpha: 1
        }, 600, Phaser.Easing.Sinusoidal.Out, !0, 600), this.timer = new G.TextTimer(0, 347, 864e5 * G.saveState.data.dailyReward.nextDaily, {
            style: "font-beige",
            fontSize: "35px"
        }, .5), this.add(this.timer), this.timer.alpha = 0, game.add.tween(this.timer).to({
            alpha: 1
        }, 600, Phaser.Easing.Sinusoidal.Out, !0, 600), this.coolBtn = new G.Button(0, 435, "btn_orange", function() {
            this.coolBtn.inputEnabled = !1, game.add.tween(this.coolBtn.scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Cubic.In, !0), this.closeWindow(), G.sb("showMainHighscorePanel").dispatch()
        }, this), this.coolBtn.addTextLabel("font-green", G.txt("Cool"), 40), this.coolBtn.scale.setTo(0), game.add.tween(this.coolBtn.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Cubic.Out, !0, 400), this.add(this.coolBtn)
    }, G.Window.prototype.gate = function(gateData) {
        this.addBackground("popup_background_2"), this.gateData = gateData, this.closeButton = new G.Button(250, -270, "btn_x", function() {
            this.closeWindow()
        }, this), this.registerButtons(this.closeButton);
        var savedData = this.savedData = G.saveState.getGateData(gateData.id),
            allStars = G.saveState.getAllStars();
        savedData.timerStartedAt === !1 && (savedData.timerStartedAt = Date.now(), G.saveState.save()), this.timerNewLevelsInTxt = new G.Text(0, -290, G.txt("New levels in"), {
            style: "font-brown",
            fontSize: 40
        }, .5, 400), this.add(this.timerNewLevelsInTxt);
        var secLeft = 60 * gateData.req.timeMinutes - (Date.now() - savedData.timerStartedAt) / 1e3;
        this.timer = new G.TextTimer(0, -245, 0, {
            style: "font-brown",
            fontSize: "40px"
        }, .5, 400), this.timer.setSecLeft(secLeft), this.timer.start(), this.add(this.timer);
        var offsetY = -130;
        this.starsTxt = new G.LabelGroupT("@*1.4*star@" + allStars + "/" + gateData.req.stars, -210, 60 + offsetY, {
            font: "ComicSansBold",
            fill: "#85511f",
            fontSize: "40px",
            stroke: "#ffedd9",
            strokeThickness: 7
        }, [0, .5], 250), this.add(this.starsTxt), this.collectMoreStarsTxt = new G.Text(130, 65 + offsetY, G.txt("Collect more stars!"), {
            font: "ComicSansBold",
            fill: "#85511f",
            fontSize: "40px",
            stroke: "#ffedd9",
            strokeThickness: 7,
            lineSpacing: -25
        }, .5, 250, !1, !0, "center"), this.add(this.collectMoreStarsTxt), this.or2 = new G.Text(0, 30, G.txt("or"), {
            style: "font-brown",
            fontSize: "50px"
        }, .5, 500), this.add(this.or2), offsetY = -80, this.priceTxt = new G.LabelGroupT(gateData.req.coins + " @coin_1@", -120, 230 + offsetY, {
            font: "ComicSansBold",
            fill: "#85511f",
            fontSize: "40px",
            stroke: "#ffedd9",
            strokeThickness: 7
        }, .5, 250), this.add(this.priceTxt), this.priceBtn = new G.Button(130, 230 + offsetY, "btn_orange", function() {
            G.saveState.isEnoughToBuy(this.gateData.req.coins) ? (G.gameTracking.design("GateUnlockCoins"), G.gameTracking.sink("Coins", this.gateData.id.toString, "Map", this.gateData.req.coins), G.saveState.changeCoins(-1 * this.gateData.req.coins), G.saveState.openGate(this.gateData.id)) : game.incentivised ? (G.sb("pushWindow").dispatch(["moreMoney", ["gate", this.gateData]]), this.closeWindow()) : (this.priceBtn.alpha = .5, this.priceBtn.inputEnabled = !1)
        }, this), this.priceBtn.label = new G.Text(0, 0, G.txt("Buy a key"), {
            font: "ComicSansBold",
            fontSize: "30px",
            fill: "#f7ffdb",
            stroke: "#005700",
            lineSpacing: -25,
            strokeThickness: 5
        }, .5, .9 * this.priceBtn.width, this.priceBtn.height, !0, "center"), this.priceBtn.addChild(this.priceBtn.label), this.add(this.priceBtn), !game.incentivised && G.saveState.getCoins() < this.gateData.req.coins && (this.priceBtn.alpha = .5, this.priceBtn.inputEnabled = !1), this.registerButtons(this.priceBtn), this.update = function() {
            this.savedData.open && this.closeWindow()
        }
    }, G.Window.prototype.gift = function(reason, gift) {
        "Game" === game.state.current && (0 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE:08_GiftDialogIsVisible") : 2 === G.lvl.lvlNr && G.gameTracking.FTUEDesign("FTUE:25_SecondGiftDialogIsVisible")), this.addBackground("popup_background_2"), this.giftMakeTitle(reason), reason && this.giftMakeExplanation(reason), this.gift = this.add(new G.GiftBox(0, reason ? 50 : 0, !1, gift)), this.continueBtn = new G.Button(5, 250, "btn_orange", function() {
            "Game" === game.state.current && (0 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE:09_GiftDialogUnpack") : 2 === G.lvl.lvlNr && G.gameTracking.FTUEDesign("FTUE:26_SecondGiftDialogUnpack")), this.continueBtn.inputEnabled = !1, this.continueBtn.visible = !1, game.add.tween(this.continueBtn).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.gift.unpack(), this.getItBtn = new G.Button(5, 250, "btn_orange", function() {
                "Game" === game.state.current && (0 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE:10_GiftDialogGetIt") : 2 === G.lvl.lvlNr && G.gameTracking.FTUEDesign("FTUE:27_SecondGiftDialogGetIt")), this.closeWindow()
            }, this), this.getItBtn.addTextLabel("font-green", G.txt("Get it"), 50), this.registerButtons(this.getItBtn)
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Unpack it"), 50), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.giftMakeTitle = function(reason) {
        if ("3stars" === reason) {
            this.stars = [], this.starsGroup = game.add.group();
            for (var i = 0; 3 > i; i++) this.stars[i] = G.makeImage(60 * i, i % 2 == 0 ? 0 : -20, "star", [0, .5], this.starsGroup), this.stars[i].scale.setTo(.7);
            this.starsGroup.y = G.l(-270), this.titleTxt = new G.Text(0, -270, G.txt("Gift"), {
                style: "font-beige-standard",
                fontSize: "60px"
            }, [0, .5], 300), this.starsGroup.x = (this.starsGroup.width + this.titleTxt.width + G.l(10)) * -.5, this.titleTxt.x = this.starsGroup.x + this.starsGroup.width + G.l(10), this.add(this.starsGroup), this.add(this.titleTxt)
        } else this.titleTxt = new G.Text(0, -270, "achievement" == reason ? G.txt("Achievement gift") : G.txt("Gift"), {
            style: "font-beige-standard",
            fontSize: "60px"
        }, .5, 450), this.add(this.titleTxt)
    }, G.Window.prototype.giftMakeExplanation = function(reason) {
        var txt = "3stars" == reason ? G.txt("Nice job! You earned 3 stars! Enjoy your gift!") : G.txt("Nice job! You won 3 times in a row! Enjoy your gift!");
        this.explanationTxt = new G.Text(0, -130, txt, {
            font: "ComicSansBold",
            fill: "#ad7f56",
            stroke: "#ffedd9",
            strokeThickness: 7,
            fontSize: "35px",
            lineSpacing: -25
        }, .5, 450, 110, !0, "center"), this.add(this.explanationTxt)
    }, G.Window.prototype.giveUp = function(windowToOpen, onGiveUp) {
        this.state = game.state.getCurrentState(), windowToOpen && this.state.windowLayer.pushWindow(windowToOpen), this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -290, "popup_top", .5, this), this.titleTxt = new G.Text(0, -315, "NORMAL" == this.state.mode ? G.txt("Level") + " " + (G.lvlNr + 1) : G.txt("Daily Challenge"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 330), this.add(this.titleTxt), this.loseProgressTxt = new G.Text(0, -70, G.txt("Your level progress will be lost!"), {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "#ad7f56",
            stroke: "#ffedd9",
            strokeThickness: 7,
            lineSpacing: -25
        }, .5, 500, 140, !0, "center"), this.add(this.loseProgressTxt), this.continueBtn = new G.Button(0, 120, "btn_orange", function() {
            this.closeWindow()
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn), this.continueBtn.pulse(), this.giveUpBtn = new G.Button(0, 250, "btn_red", function() {
            G.winsInRow = 0, "CHALLENGE" === this.state.mode ? G.gameTracking.fail("DailyChallenge", this.state.getLevelDimension(), void 0, G.lvl.points) : G.gameTracking.fail("Gate" + G.saveState.checkGateNr(G.lvlNr).toString(), this.state.getLevelDimension(), void 0, G.lvl.points), onGiveUp && onGiveUp()
        }, this), this.giveUpBtn.addTextLabel("font-red", G.txt("Give up"), 50), this.registerButtons(this.giveUpBtn), G.LIVES && (this.brokenHeart = G.makeImage(-120, 250, "broken_heart", .5, this), this.minusOneTxt = new G.Text(-125, 250, "-1", {
            style: "font-red",
            fontSize: "35px"
        }, .5, 50), this.add(this.minusOneTxt)), this.giveUpBtn.visible = !1, this.brokenHeart.visible = !1, this.minusOneTxt.visible = !1, this.giveUpBtn.visible = !0, this.brokenHeart.visible = !0, this.minusOneTxt.visible = !0
    }, G.Window.prototype.globalGoals = function() {
        G.gameTracking.design("MissionWindowVisibleOnMap"), this.addBackground("popup_background_2"), this.addCloseButton(), this.closeButton.terms = [], this.myMissionTxt = new G.Text(0, -280, G.txt("My Missions"), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 400), this.add(this.myMissionTxt), this.completeMissionsTxt = new G.Text(0, -235, G.txt("Complete missions to receive rewards!"), {
            style: "font-beige-standard",
            fontSize: "25px"
        }, .5, 400), this.add(this.completeMissionsTxt), this.add(new G.GlobalGoalPanelGroup(0, -140, 340))
    }, G.Window.prototype.level = function() {
        game.state.getCurrentState();
        this.addBackground("popup_background_2"), 1 === G.lvlNr ? G.gameTracking.FTUEDesign("FTUE:12_Level2PreLevelDialogIsVisible") : 2 === G.lvlNr ? G.gameTracking.FTUEDesign("FTUE:19_Level3PreLevelDialogIsVisible") : 3 === G.lvlNr && G.gameTracking.FTUEDesign("FTUE:28b_SelectLevel4"), this.levelBg = G.makeImage(0, -305, "popup_top", .5, this), this.levelTxt = new G.Text(0, -334, G.txt("Level") + " " + (G.lvlNr + 1), {
            style: "font-beige-header",
            fontSize: "50px"
        }, .5, 330), this.add(this.levelTxt), this.closeButton = new G.Button(235, -263, "btn_x", function() {
            1 === G.lvlNr ? G.gameTracking.FTUEDesign("FTUE:13b_Level2PreLevelDialogClose") : 2 === G.lvlNr && G.gameTracking.FTUEDesign("FTUE:20b_Level3PreLevelDialogClose"), this.boosters.forEach(function(btn) {
                btn.signalBinding && btn.signalBinding.detach()
            }), this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.addChild(this.closeButton);
        var starsAchieved = G.saveState.getStars(G.lvlNr);
        this.stars = [G.makeImage(-100, -180, starsAchieved >= 1 ? "star" : "star_blank", .5, this), G.makeImage(0, -208, starsAchieved >= 2 ? "star" : "star_blank", .5, this), G.makeImage(100, -180, starsAchieved >= 3 ? "star" : "star_blank", .5, this)], this.stars[0].scale.setTo(.8), this.stars[2].scale.setTo(.8), this.taskBg = G.makeImage(0, -25, "popup_bigtext_backgr", .5, this), this.taskTxt = new G.Text(0, -90, G.txt("Task") + ":", {
            style: "font-beige",
            fontSize: "45px"
        }, .5, 380), this.add(this.taskTxt), "collect" == G.lvlData.goal[0] ? this.makeTaskCollectPanels(-25, G.lvlData) : this.add(new G.Text(0, -25, G.txt("points").toUpperCase() + ": " + G.lvlData.goal[1], {
            style: "font-beige-header",
            fontSize: "50px"
        }, .5, 380)), this.buyTxt = new G.Text(0, 65, G.txt("Buy some boosters") + ":", {
            style: "font-beige",
            fontSize: "35px"
        }, .5, 680), this.add(this.buyTxt), this.boosterBg = G.makeImage(0, 150, "popup_bigtext_backgr", .5, this), this.boosters = [new G.UI_StartBoosterButton(-180, 150, 5, G.lvlNr), new G.UI_StartBoosterButton(0, 150, 7, G.lvlNr), new G.UI_StartBoosterButton(180, 150, 8, G.lvlNr)], this.addMultiple(this.boosters), this.continueBtn = new G.Button(0, 290, "btn_orange", function() {
            1 === G.lvlNr ? G.gameTracking.FTUEDesign("FTUE:13a_Level2PreLevelDialogContinue") : 2 === G.lvlNr && G.gameTracking.FTUEDesign("FTUE:20a_Level3PreLevelDialogContinue"), G.sb("onStateChange").dispatch("Game", G.lvlNr, !1, this.state.startBoosterConfig.getConfigForLevel(G.lvlNr))
        }, this), this.continueBtn.pulse(), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.makeTaskCollectPanels = function(y, level) {
        for (var posX = [
                [0],
                [-85, 85],
                [-170, 0, 170],
                [-205, -65, 65, 205]
            ], i = 0, len = level.goal[1].length; len > i; i++) {
            var spriteName = G.json.settings.goals[level.goal[1][i][0]].sprite,
                panel = G.makeImage(posX[len - 1][i] - 5, y, spriteName, [1, .5], this);
            panel.scale.setTo(.68);
            var nr = new G.Text(posX[len - 1][i] + 40, y, level.goal[1][i][1].toString(), {
                style: "font-beige-header",
                fontSize: "35px"
            }, [1, .5], 85);
            this.add(nr)
        }
    }, G.Window.prototype.levelFailed = function() {
        "CHALLENGE" === this.state.mode ? G.gameTracking.fail("DailyChallenge", this.state.getLevelDimension(), void 0, G.lvl.points) : G.gameTracking.fail("Gate" + G.saveState.checkGateNr(G.lvlNr).toString(), this.state.getLevelDimension(), void 0, G.lvl.points), this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -290, "popup_top", .5, this), this.titleTxt = new G.Text(0, -315, "NORMAL" == this.state.mode ? G.txt("Level") + " " + (G.lvlNr + 1) : G.txt("Daily Challenge"), {
            style: "font-beige",
            fontSize: 50
        }, .5, 330), this.add(this.titleTxt), this.closeButton = new G.Button(250, -270, "btn_x", function() {
            G.sb("onStateChange").dispatch("World")
        }, this), this.closeButton.visible = !1, this.registerButtons(this.closeButton), G.LIVES && (this.brokenHeart = G.makeImage(0, -75, "broken_heart", .5, this), this.minusOneTxt = new G.Text(-55, -75, "-1", {
            style: "font-red",
            fontSize: "35px"
        }, .5, 50), this.add(this.minusOneTxt)), G.lvl.goalMgr.isPointBased() ? this.add(new G.Text(0, 100, G.txt("points").toUpperCase() + ":\n" + G.lvl.points + "/" + G.lvl.goalMgr.getPointTarget(), {
            font: "ComicSansBold",
            fontSize: "40px",
            lineSpacing: -10,
            fill: "#85511f",
            stroke: "#ffedd9",
            strokeThickness: 7
        }, .5, 380, 170, !0, "center")) : this.makeLevelFailedTaskCollectPanels(95), "NORMAL" === this.state.mode ? (this.retryBtn = new G.Button(5, 250, "btn_orange", function() {
            game.paused = !1, G.winsInRow = 0, G.gameTracking.design("LevelRetryButtonClicked"), G.saveState.getCurrentLivesNr() > 0 ? G.sb("onStateChange").dispatch("Game", G.lvl.lvlNr, G.debugMode) : G.sb("onStateChange").dispatch("World")
        }, this), this.retryBtn.addTextLabel("font-green", G.txt("Retry"), 50), this.registerButtons(this.retryBtn)) : (this.continueBtn = new G.Button(0, 240, "btn_green", function() {
            G.sb("onStateChange").dispatch("World")
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 70), this.registerButtons(this.continueBtn)), this.continueBtn && (this.continueBtn.visible = !1), this.retryBtn && (this.retryBtn.visible = !1), this.retryBtn && (this.retryBtn.visible = !0), this.continueBtn && (this.continueBtn.visible = !0), this.closeButton && (this.closeButton.visible = !0)
    }, G.Window.prototype.makeLevelFailedTaskCollectPanels = function(y) {
        var posX = [
            [0],
            [-85, 85],
            [-170, 0, 170],
            [-205, -65, 65, 205]
        ];
        this.taskBg = G.makeImage(0, y, "popup_bigtext_backgr", .5, this), this.panels = [];
        for (var goals = G.lvl.goal[1], i = 0, len = goals.length; len > i; i++)
            if (this.state.topBar.goalPanel.panels[i].amount > 0) {
                var gfxName = G.json.settings.goals[goals[i][0]].sprite,
                    panel = G.makeImage(0, y, gfxName, .5, this);
                G.makeImage(70, 0, "task_fail", .5, panel), this.panels.push(panel)
            }
        var nrOfPanels = this.panels.length;
        this.panels.forEach(function(panel, index) {
            panel.x = G.l(posX[nrOfPanels - 1][index] - 25)
        })
    }, G.Window.prototype.mapChest = function(gifts) {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -290, "popup_top", .5, this), this.titleTxt = new G.Text(0, -315, G.txt("Chest Unlocked"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 330), this.add(this.titleTxt), this.gifts = gifts, this.chest = G.makeImage(0, -25, "chest_open", .5, this), this.youReceiveTxt = new G.Text(0, -150, G.txt("You receive") + ":", {
            style: "font-beige",
            fontSize: "50px"
        }, .5, 550), this.add(this.youReceiveTxt), this.giftsLabelGroup = new G.LabelGroupT(G.gift.getLabelPackString(gifts), 0, 120, {
            font: "ComicSansBold",
            fontSize: "60px",
            fill: "#ad7f56",
            stroke: "#ffedd9",
            strokeThickness: 7
        }, [.5, .5], 500, 0), this.add(this.giftsLabelGroup), this.claimBtn = new G.Button(0, 245, "btn_orange", function() {
            this.gifts.forEach(function(gift) {
                "coin" == gift[0] ? (G.gameTracking.source("Coins", "Reward", "MapChest", gift[1]), this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.chest.worldPosition.x, this.chest.worldPosition.y, this.state.panel.coinsTxt, gift[1])) : (G.gameTracking.source("life" === gift[0] ? "Life" : G.saveState.nrToBoosterName(gift[0][8]), "Reward", "MapChest", gift[1]), G.gift.applyGift(gift))
            }, this), this.closeWindow()
        }, this), this.claimBtn.addTextLabel("font-green", G.txt("Claim"), 45), this.registerButtons(this.claimBtn)
    }, G.Window.prototype.mapGift = function(giftData) {
        this.giftData = G.gift.getGift(), this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(0, -300, G.txt("Gift"), {
            style: "font-beige-header",
            fontSize: "50px"
        }, .5, 300), this.add(this.titleTxt), this.addCloseButton(), this.mapGift_claim()
    }, G.Window.prototype.mapGift_watch = function() {
        this.preGroup = this.add(game.make.group()), this.preGroup.y = 40, this.watchGiftImg = G.makeImage(0, -100, "icon_video_gift", [.5, .5], this.preGroup), this.watchVideoToGetTxt = new G.Text(0, 46, G.txt("Watch a video to get"), {
            style: "font-blue",
            fontSize: "50px"
        }, .5, 500), this.preGroup.add(this.watchVideoToGetTxt), this.getGiftTxt = new G.Text(0, 46, G.txt("Watch a video to get"), {
            style: "font-blue",
            fontSize: "50px"
        }, .5, 500), this.preGroup.add(this.getGiftTxt), this.watchBtn = new G.Button(0, 230, "button_play", function() {
            this.watchBtn.inputEnabled = !1, this.mapGift_claimAfterWatch()
        }, this), this.watchBtn.addTextLabel("font-white", G.txt("Watch"), 55, 30, -4, 260), this.registerButtons(this.watchBtn)
    }, G.Window.prototype.mapGift_claim = function() {
        this.gift = this.add(new G.GiftBox(0, 0, !1, this.giftData)), this.claimBtn = new G.Button(0, 230, "button_green", function() {
            this.claimBtn.visible = !1, G.saveState.data.lastMapGiftOpenTime = Date.now(), this.getItBtn = new G.Button(5, 230, "btn_orange", function() {
                this.closeWindow()
            }, this), this.getItBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.getItBtn), this.gift.unpack(), "coin" === this.giftData[0] ? G.gameTracking.source("Coins", "Reward", "FreeGift", this.giftData[1]) : "life" === this.giftData[0] ? G.gameTracking.source("Life", "Reward", "FreeGift", this.giftData[1]) : -1 !== this.giftData[0].indexOf("booster") && G.gameTracking.source(G.saveState.nrToBoosterName(this.giftData[0][8]), "Reward", "FreeGift", this.giftData[1])
        }, this), this.claimBtn.addTextLabel("font-green", G.txt("Claim"), 50), this.registerButtons(this.claimBtn)
    }, G.Window.prototype.mapGift_claimAfterWatch = function() {
        this.watchBtn.inputEnabled = !1, game.add.tween(this.watchBtn).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.preGroup).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.mapGift_claim(), game.add.tween(this.claimBtn).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.gift).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.gift.y = 30, this.thanksForWatching = new G.Text(0, -155, G.txt("Thanks for watching!"), {
            style: "font-blue",
            fontSize: 50
        }, .5, 500), this.add(this.thanksForWatching), game.add.tween(this.thanksForWatching).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.Window.prototype.moreMoney = function(windowToOpen) {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(0, -300, G.txt("Get more coins"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 300), this.add(this.titleTxt), this.addCloseButton(), windowToOpen && this.state.windowLayer.pushWindow(windowToOpen), this.preGroup = this.add(game.make.group()), this.coinImg = G.makeImage(0, -100, "icon_video_coins", [.5, .5], this.preGroup), this.watchVideoToGetTxt = new G.Text(0, 55, G.txt("Watch a video to get"), {
            style: "font-beige",
            fontSize: 40
        }, .5, 500), this.preGroup.add(this.watchVideoToGetTxt), this.moneyTxt = new G.LabelGroupT("@coin_1@ " + G.json.settings.coinsForAd, 0, 110, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ad7f56"
        }, .5, 500), this.preGroup.add(this.moneyTxt), this.watchBtn = new G.Button(0, 230, "button_play", function() {
            this.watchBtn.inputEnabled = !1, this.moreMoney_thanks()
        }, this), this.watchBtn.addTextLabel("font-green", G.txt("Watch"), 50, 30, -4, 260), this.registerButtons(this.watchBtn)
    }, G.Window.prototype.moreMoney_thanks = function() {
        game.add.tween(this.preGroup).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.watchBtn.inputEnabled = !1, game.add.tween(this.watchBtn).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.postGroup = this.add(game.make.group()), this.thanksForWatching = new G.Text(0, -100, G.txt("Thanks for watching!"), {
            style: "font-beige",
            fontSize: 50
        }, .5, 500), this.postGroup.add(this.thanksForWatching), this.moneyBg = G.makeImage(0, 25, "popup_bigtext_backgr", [.5, .5], this.postGroup), this.moneyTxt = new G.LabelGroupT("@coin_1@ " + G.json.settings.coinsForAd, 0, 25, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#85511f",
            stroke: "#ffedd9",
            strokeThickness: 5
        }, .5, 500), this.postGroup.add(this.moneyTxt), this.postGroup.alpha = 0, game.add.tween(this.postGroup).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.claimBtn = new G.Button(0, 230, "button_green", function() {
            "World" == game.state.current ? this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.moneyTxt.worldPosition.x, this.moneyTxt.worldPosition.y, this.state.panel.coinsTxt, G.json.settings.coinsForAd) : G.saveState.changeCoins(G.json.settings.coinsForAd), this.closeWindow()
        }, this), this.claimBtn.addTextLabel("font-green", G.txt("Claim"), 50), this.registerButtons(this.claimBtn), game.add.tween(this.claimBtn).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.Window.prototype.outOfMoves = function() {
        this.addBackground("popup_background_2"), this.makeCoinBar(0, -270, "outOfMoves"), G.sb("onGoalAchieved").add(this.closeWindow, this), this.outOfMovesTxt = new G.Text(0, -130, G.txt("Out of moves!"), {
                style: "font-brown",
                fontSize: 50
            }, .5, 500), this.add(this.outOfMovesTxt), this.endGameBtn = new G.Button(-120, 230, "end_game_btn", function() {
                G.sb("pushWindow").dispatch("levelFailed"), this.timerActivate = !1, this.closeWindow()
            }, this), this.endGameBtn.addTextLabel("font-gray", G.txt("End game"), 30), this.add(this.endGameBtn), G.LIVES && (this.brokenHeart = G.makeImage(-223, 226, "broken_heart", .5, this), this.minusOneTxt = new G.Text(-232, 226, "-1", {
                style: "font-red",
                fontSize: "35px"
            }, .5, 50), this.add(this.minusOneTxt)), this.promo = 0 == G.lvl.outOfMovesPopUp || Math.random() < .25,
            G.lvl.outOfMovesPopUp++, G.saveState.data.outOfMovesInterstitialTimer || (G.saveState.data.outOfMovesInterstitialTimer = 0), game.incentivised && Date.now() - G.saveState.data.outOfMovesInterstitialTimer > 60 * G.json.settings.interstitialSettings.outOfMovesTimerMin * 1e3 ? this.outOfMoves_addWatchButton() : this.outOfMoves_addBuyButton()
    }, G.Window.prototype.outOfMoves_addWatchButton = function() {
        this.watchBtn = new G.Button(140, 230, "moves-ad-btn", function() {
            this.watchBtn.inputEnabled = !1, G.lvl.changeMoveNumber(5), this.closeWindow(), G.saveState.data.outOfMovesInterstitialTimer = Date.now()
        }, this), this.registerButtons(this.watchBtn), "ja" === G.lang && (G.changeTexture(this.watchBtn, "btn_orange"), this.watchBtn.label = new G.Text(-40, 0, G.txt("watch-outOfMovesPopUp"), {
            fill: "#f7ffdb",
            fontSize: "30px",
            font: "Lobster",
            stroke: "#005700",
            strokeThickness: 7
        }, .5, 83), this.watchBtn.addChild(this.watchBtn.label), this.watchBtn.boosterIcon = G.makeImage(48, 0, "ui_booster_5", .5, this.watchBtn))
    }, G.Window.prototype.outOfMoves_addBuyButton = function() {
        this.timerTxt = new G.Text(0, 0, 60 * G.json.settings.outOfMovesTimer, {
            style: "font-brown",
            fontSize: 50
        }, .5, 500), this.timerTxt.cacheAsBitmap = !1, this.timerTxt.timer = 60 * G.json.settings.outOfMovesTimer, this.timerActivate = !0, this.add(this.timerTxt), this.price = this.promo ? Math.floor(2 * G.lvl.getPriceOfExtraMoves() * .7) : 2 * G.lvl.getPriceOfExtraMoves(), this.continueBtn = new G.Button(120, 230, "btn_orange", function() {
            G.saveState.data.coins >= this.price ? (G.lvl.buyExtraMoves(!0, this.price), this.timerActivate = !1, this.closeWindow(), G.ga.event("Recurring:GetMoreMoves:LevelEnd")) : (G.sb("pushWindow").dispatch(["moreMoney", "outOfMoves"]), this.timerActivate = !1, this.closeWindow())
        }, this), this.continueBtn.pulse(), this.continueBtn.extraMoveIcon = G.makeImage(-105, 0, "ui_booster_5", [0, .5], this.continueBtn), this.continueBtn.extraMoveIcon.scale.setTo(.95);
        var labelString = this.price + "@currency@";
        this.continueBtn.label = new G.LabelGroupT(labelString, 25, 0, {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "#f7ffdb",
            stroke: "#005700",
            strokeThickness: 5
        }, .5, 95), this.continueBtn.addChild(this.continueBtn.label), this.update = function() {
            if (this.timerActivate) {
                this.timerTxt.timer-- <= 0 && (this.timerActivate = !1, G.sb("pushWindow").dispatch("levelFailed"), this.closeWindow());
                var timerText = Math.ceil(this.timerTxt.timer / 60).toString();
                this.timerTxt.text != timerText && this.timerTxt.setText(timerText)
            }
        }, this.promo && (this.continueBtn.promoLabel = G.makeImage(115, -7, "off_lable", .5, this.continueBtn), this.continueBtn.promoTxt = this.continueBtn.addChild(new G.Text(117, -7, "-30%", {
            style: "font-red",
            fontSize: 25
        }, .5, 60)), this.continueBtn.promoTxt.angle = -10, this.continueBtn.label.y = G.l(10), this.continueBtn.label2 = new G.LabelGroupT(2 * G.lvl.getPriceOfExtraMoves() + "@currency@", 25, -30, {
            font: "ComicSansBold",
            fontSize: "20px",
            fill: "#ffe9d0",
            stroke: "#961400",
            strokeThickness: 5
        }, .5, 95), this.continueBtn.addChild(this.continueBtn.label2), this.continueBtn.crossOut = G.makeImage(25, -30, "coins_lable", .5, this.continueBtn), this.continueBtn.crossOut.cacheAsBitmap = !0, this.continueBtn.crossOut.width = 1.1 * this.continueBtn.label2.width, this.continueBtn.crossOut.height = 2, this.continueBtn.crossOut.angle = -10, this.continueBtn.bringToTop(this.continueBtn.label)), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.pause = function() {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(6, -300, G.txt("Pause"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 300), this.add(this.titleTxt), this.addCloseButton(253, -260), this.homeBtn = new G.Button(-130, -54, "btn_home", function() {
            this.state.windowLayer.pushWindow(["giveUp", "pause", function() {
                G.sb("onStateChange").dispatch(G.debugMode ? "EditorWorld" : "World")
            }]), this.closeWindow()
        }, this), this.playBtn = new G.Button(0, 150, "btn_play", function() {
            this.closeWindow()
        }, this), this.soundBtn = new G.SoundBtn(134, -50), this.registerButtons(this.soundBtn, this.homeBtn, this.playBtn)
    }, G.Window.prototype.taskSlider = function() {
        this.y = -1.5 * game.height, G.sfx.whoosh_short_1.play(), game.add.tween(this).to({
            y: G.l(-120)
        }, 400, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function() {
            game.time.events.add(1e3, G.sfx.whoosh_short_2.play, G.sfx.whoosh_short_2), game.add.tween(this).to({
                y: 1.5 * game.height
            }, 400, Phaser.Easing.Sinusoidal.Out, !0, 1e3).onComplete.add(function() {
                G.sb("onWindowClosed").dispatch(), this.destroy()
            }, this)
        }, this), this.addBackground("task_slider"), this.bg.y = G.l(120), this.taskTxt = new G.Text(0, 50, G.txt("Task") + ":", {
            style: "font-beige-standard",
            fontSize: 40
        }, .5, 380), this.add(this.taskTxt), G.lvl.goalMgr.isPointBased() ? (this.goal = new G.Text(0, 115, G.txt("points").toUpperCase() + ": " + G.lvl.goalMgr.getPointTarget(), {
            style: "font-beige",
            fontSize: 50
        }, .5, 380), this.add(this.goal)) : this.makeTaskCollectPanels(115, G.lvlData)
    }, G.Window.prototype.thanksForWatching = function() {
        this.addBackground("popup_background_2"), this.thanksForWatching = new G.Text(0, 0, G.txt("Thanks for watching!"), {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#85511f",
            stroke: "#ffedd9",
            strokeThickness: 7,
            lineSpacing: -25
        }, .5, 530, 200, !0, "center"), this.add(this.thanksForWatching), this.continueBtn = new G.Button(5, 250, "btn_orange", function() {
            this.closeWindow()
        }, this), this.continueBtn.pulse(), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.win = function(skipReward) {
        if (this.state = game.state.getCurrentState(), "CHALLENGE" === this.state.mode) return void this.winChallenge();
        var lastPassedLevelPre = G.saveState.getLastPassedLevelNr();
        G.saveState.addLife(), G.lvl.resultData || (G.lvl.oldStars = G.saveState.getStars(G.lvl.lvlNr), G.lvl.resultData = G.saveState.passLevel(G.lvl.lvlNr, Math.max(1, G.lvl.stars), G.lvl.points, !0));
        var result = G.lvl.resultData,
            oldStars = G.lvl.oldStars;
        3 > oldStars && 3 == result.stars && (G.winsInRow || (G.winsInRow = 0), G.winsInRow++), "CHALLENGE" === this.state.mode ? G.gameTracking.complete("DailyChallenge", this.state.getLevelDimension(), void 0, G.lvl.points) : G.gameTracking.complete("Gate" + G.saveState.checkGateNr(G.lvlNr).toString(), this.state.getLevelDimension(), void 0, G.lvl.points);
        for (var i = 0; i < G.lvl.items.length; i++) G.lvl.items[i] && G.saveState.changeItemAmount(i, G.lvl.items[i]);
        this.result = result, this.addBackground("popup_background_2");
        var starsAchieved = result.stars;
        this.ribbon = G.makeImage(0, -305, "popup_top", .5, this), this.titleTxt = new G.Text(0, -334, G.txt("Level") + " " + (this.state.lvlNr + 1), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 330), this.add(this.titleTxt), this.youWinTxt = new G.Text(0, -90, G.txt("You win!"), {
            style: "font-beige",
            fontSize: 45
        }, .5, 530), this.add(this.youWinTxt), this.scoreBg = G.makeImage(20, -5, "popup_text_backgr", .5, this), this.scoreIcon = G.makeImage(-90, -5, "score_icon", .5, this), this.scoreIcon.scale.setTo(1.2), G.lvl.resultData.reward > 0 && (this.coinBg = G.makeImage(20, 95, "popup_text_backgr", .5, this), this.coinIco = G.makeImage(-90, 95, "coin_1", .5, this), this.amountTxt = new G.OneLineCounter(25, 95, "font-beige-header", 0, 45, 160, .5, .5), this.add(this.amountTxt)), this.scoreTxt = new G.Text(32, -5, G.lvl.points.toString(), {
            style: "font-beige-header",
            fontSize: 45
        }, .5, 190), this.add(this.scoreTxt), this.retryBtn = new G.Button(-120, 205, "btn_green", function() {
            1 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE:17b_Level2CompleteDialogReplay") : 2 === G.lvl.lvlNr && G.gameTracking.FTUEDesign("FTUE:24b_Level3CompleteDialogReplay"), G.sb("onAllWindowsClosed").add(function() {
                G.sb("onStateChange").dispatch("Game", G.lvlNr)
            }), this.closeWindow()
        }, this), this.retryBtn.addTextLabel("font-blue-out", G.txt("Retry"), 50), this.add(this.retryBtn), this.continueBtn = new G.Button(120, 205, "btn_orange", function() {
            0 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE:07_ContinueClick") : 1 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE:17a_Level2CompleteDialogContinue") : 2 === G.lvl.lvlNr && G.gameTracking.FTUEDesign("FTUE:24a_Level3CompleteDialogContinue"), G.saveState.getLastPassedLevelNr() >= 4 && this.result.passed && G.sb("pushWindow").dispatch(["passedFriend", this.result]), G.sb("onAllWindowsClosed").add(function() {
                G.sb("onStateChange").dispatch(G.debugMode ? "EditorWorld" : "World", {
                    lvlNr: G.lvl.lvlNr,
                    reward: G.lvl.moneyGained,
                    starImprovement: G.lvl.resultData.starImprovement
                })
            }), 2 == G.lvl.lvlNr && 0 == oldStars || G.winsInRow >= 3 && Math.random() < G.json.settings.chancesForAchievementGift ? (G.winsInRow = 0, G.sb("pushWindow").dispatch(["gift", "achievement"])) : (0 == G.lvl.lvlNr && 0 == oldStars || 3 > oldStars && 3 == result.stars && Math.random() < G.json.settings.chancesFor3StarsGift) && G.sb("pushWindow").dispatch(["gift", "3stars"]), this.closeWindow()
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn), this.blankStars = [G.makeImage(-100, -180, "star_blank", .5, this), G.makeImage(0, -208, "star_blank", .5, this), G.makeImage(100, -180, "star_blank", .5, this)], this.blankStars[0].scale.setTo(.8), this.blankStars[2].scale.setTo(.8), this.stars = [G.makeImage(-100, -180, starsAchieved >= 1 ? "star" : "star_blank", .5, this), G.makeImage(0, -208, starsAchieved >= 2 ? "star" : "star_blank", .5, this), G.makeImage(100, -180, starsAchieved >= 3 ? "star" : "star_blank", .5, this)], this.stars[0].scale.setTo(.8), this.stars[2].scale.setTo(.8), this.stars.forEach(function(elem, index) {
            if (starsAchieved >= index + 1) {
                var orgScale = elem.scale.x;
                elem.scale.setTo(0);
                var tween = game.add.tween(elem.scale).to({
                    x: orgScale,
                    y: orgScale
                }, 300, Phaser.Easing.Bounce.Out, !0, 800 + 200 * index);
                tween.onStart.add(function() {
                    G.sfx.pop.play(), G.sfx.explosion_subtle.play(), this.add(new G.WinStarPart(elem.x, elem.y, !0)), this.add(new G.WinStarPart(elem.x, elem.y, !0)), this.add(new G.WinStarPart(elem.x, elem.y, !0)), this.add(new G.WinStarPart(elem.x, elem.y, !0)), this.add(new G.WinStarPart(elem.x, elem.y, !0))
                }, this)
            } else elem.visible = !1
        }, this), game.time.events.add(1e3, function() {
            result.reward > 0 && (G.gameTracking.source("Coins", "Reward", "LevelCompleted", result.reward), G.gameTracking.source("Coins", "Reward", "InGameChest", G.lvl.moneyGainedChest), this.amountTxt.increaseAmount(result.reward))
        }, this), G.sb("onLevelMoneyGain").dispatch(result.reward), 0 == lastPassedLevelPre && (this.retryBtn.visible = !1, this.continueBtn.x = 0, this.continueBtn.pulse()), 0 == G.lvl.lvlNr && 0 == oldStars && starsAchieved > 0 && G.platform.firstLevelMsg(G.lvl.points), this.retryBtn.visible = !1, this.continueBtn.visible = !1, 0 !== lastPassedLevelPre && (this.retryBtn.visible = !0), this.continueBtn.visible = !0, 0 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE:06_LevelCompleteDialogIsVisible") : 1 === G.lvl.lvlNr ? G.gameTracking.FTUEDesign("FTUE:16_Level2CompleteDialogIsVisible") : 2 === G.lvl.lvlNr && G.gameTracking.FTUEDesign("FTUE:23_Level3CompleteDialogIsVisible")
    }, G.Window.prototype.winChallenge = function() {
        this.addBackground("popup_background_2");
        var starsAchieved = G.lvl.stars;
        G.saveState.passExtraLevel(starsAchieved), G.gameTracking.complete("DailyChallenge", G.lvlData.lvlNumber, void 0, G.lvl.points), this.ribbon = G.makeImage(0, -290, "popup_top", .5, this), this.titleTxt = new G.Text(0, -315, G.txt("Daily Challenge"), {
            style: "font-beige",
            fontSize: 50
        }, .5, 330), this.add(this.titleTxt), this.youWinTxt = new G.Text(0, -70, G.txt("You win!"), {
            style: "font-brown",
            fontSize: 45
        }, .5, 530), this.add(this.youWinTxt), this.scoreBg = G.makeImage(20, 20, "popup_text_backgr", .5, this), this.scoreIcon = G.makeImage(-90, 20, "score_icon", .5, this), this.scoreIcon.scale.setTo(1.2);
        var coinReward = G.json.settings.coinsForStar[starsAchieved - 1];
        coinReward > 0 && (this.coinBg = G.makeImage(20, 120, "popup_text_backgr", .5, this), this.coinIco = G.makeImage(-90, 120, "coin_1", .5, this), this.amountTxt = new G.OneLineCounter(25, 120, "font-brown", 0, 45, 160, .5, .5), this.add(this.amountTxt)), this.scoreTxt = new G.Text(32, 20, G.lvl.points.toString(), {
            style: "font-brown",
            fontSize: 45
        }, .5, 190), this.add(this.scoreTxt), this.continueBtn = new G.Button(0, 240, "btn_orange", function() {
            G.sb("onAllWindowsClosed").add(function() {
                G.sb("onStateChange").dispatch(G.debugMode ? "EditorWorld" : "World", {
                    lvlNr: G.lvl.lvlNr,
                    reward: G.lvl.moneyGained,
                    starImprovement: starsAchieved,
                    challenge: !0
                })
            }), this.closeWindow()
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn), this.blankStars = [G.makeImage(-100, -150, "star_blank", .5, this), G.makeImage(0, -175, "star_blank", .5, this), G.makeImage(100, -150, "star_blank", .5, this)], this.blankStars[0].scale.setTo(.8), this.blankStars[2].scale.setTo(.8), this.stars = [G.makeImage(-100, -150, starsAchieved >= 1 ? "star" : "star_blank", .5, this), G.makeImage(0, -175, starsAchieved >= 2 ? "star" : "star_blank", .5, this), G.makeImage(100, -150, starsAchieved >= 3 ? "star" : "star_blank", .5, this)], this.stars[0].scale.setTo(.8), this.stars[2].scale.setTo(.8), this.stars.forEach(function(elem, index) {
            if (starsAchieved >= index + 1) {
                var orgScale = elem.scale.x;
                elem.scale.setTo(0);
                var tween = game.add.tween(elem.scale).to({
                    x: orgScale,
                    y: orgScale
                }, 300, Phaser.Easing.Bounce.Out, !0, 800 + 200 * index);
                tween.onStart.add(function() {
                    G.sfx.pop.play(), G.sfx.explosion_subtle.play(), this.add(new G.WinStarPart(elem.x, elem.y, !0)), this.add(new G.WinStarPart(elem.x, elem.y, !0)), this.add(new G.WinStarPart(elem.x, elem.y, !0)), this.add(new G.WinStarPart(elem.x, elem.y, !0)), this.add(new G.WinStarPart(elem.x, elem.y, !0))
                }, this)
            } else elem.visible = !1
        }, this), game.time.events.add(1e3, function() {
            coinReward > 0 && (G.sb("onLevelMoneyGain").dispatch(coinReward), this.amountTxt.increaseAmount(coinReward))
        }, this)
    }, G.Assets = {
        order: ["TitleScreen", "World", "Game"],
        jsons: ["languages", "levels", "settings", "specialCandies", "tutorials"],
        TitleScreen: {
            spritesheets: ["titleScreen", "buttons"],
            sfx: ["music", "pop", "transition"]
        },
        World: {
            spritesheets: ["mapsheet", "ssheet"],
            fonts: ["font-white", "font-pink"],
            images: ["bg_road.png"]
        },
        Game: {
            spritesheets: ["board", "gems", "bursteffects"],
            images: ["bg_1.png", "bg_2.png", "bg_3.png", "bg_4.png"],
            sfx: ["boom", "exchange", "lightning", "line", "match_1", "match_2", "match_3", "match_4", "match_5", "xylophone_positive", "xylophone_positive2", "xylophone_positive6", "explosion_subtle"]
        }
    }, G.Boot = function(game) {}, G.Boot.prototype = {
        init: function() {
            game.state.onStateChange.add(function() {
                game.input.interactiveItems.removeAll()
            }), G.sentWorldMapDesignEvent = !1, G.playFabLogger = new G.PlayFabLogger;
            var getAndroidVersion = function(ua) {
                ua = (ua || navigator.userAgent).toLowerCase();
                var match = ua.match(/android\s([0-9\.]*)/);
                return match ? match[1] : !1
            };
            if ("undefined" != navigator.languages)
                for (var l = "", i = 0; i < navigator.languages.length && (l = navigator.languages[i], "ru" != l && "en" != l && "de" != l && "es" != l && "fr" != l && "it" != l && "pt" != l && "tr" != l && "nl" != l && "pl" != l && "ja" != l); i++);
            var llang = "" != l ? l : "en";
            G.LIVES = !0, G.sb = G.SignalBox, G.lang = llang, G.ASSETS.images.splice(G.ASSETS.images.indexOf("ja" === G.lang ? "BOOT-logo.png" : "BOOT-logo-ja.png"), 1), G.ASSETS.images.splice(G.ASSETS.images.indexOf("ja" === G.lang ? "BOOT-logo-mini.png" : "BOOT-logo-mini-ja.png"), 1);
            var android_version = getAndroidVersion();
            game.device.desktop ? (G.Loader.currentConfig = "hd", G.Loader.currentConfigMulti = 1) : android_version && parseFloat(android_version) < 4.4 ? (G.Loader.currentConfig = "ssd", G.Loader.currentConfigMulti = .4) : (G.Loader.currentConfig = "sd", G.Loader.currentConfigMulti = .6), G.Loader.currentConfig = "hd", G.Loader.currentConfigMulti = 1, this.input.maxPointers = 1, this.stage.disableVisibilityChange = !0, this.stage.backgroundColor = 16777215, game.tweens.frameBased = !1, game.time.advancedTiming = !0, this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL, this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL, this.scale.pageAlignHorizontally = !0, this.scale.pageAlignVertically = !0, this.scaleGameSizeUpdate = function() {
                var ratio = ("World" === game.state.current, window.innerWidth / window.innerHeight),
                    state = game.state.getCurrentState(),
                    standardWidth = G.l(640),
                    standardHeight = G.l(960),
                    standardRatio = standardWidth / standardHeight;
                state.NOTRESIZABLE || state.NOSCALABLE || (G.horizontal = ratio > 1.35, G.horizontal && "Game" === game.state.current && (standardHeight = G.l(770)), ratio > standardRatio ? (game.scale.setGameSize(Math.ceil(standardHeight * ratio), standardHeight), standardWidth = G.l(640), game.world.setBounds(Math.ceil((game.width - standardWidth) * -.5), 0, game.width, game.height)) : (game.scale.setGameSize(standardWidth, Math.ceil(standardWidth * (window.innerHeight / window.innerWidth))), standardWidth = G.l(640), game.world.setBounds(Math.ceil((game.width - standardWidth) * -.5), 0, Math.ceil((game.height - standardHeight) * -.5), game.height)), G.sb("onScreenResize").dispatch(game.width, game.height))
            }, game.resizeGame = this.scaleGameSizeUpdate, this.scale.setResizeCallback(function() {
                (G.old_w != window.innerWidth || G.old_h != window.innerHeight) && (G.old_w = window.innerWidth, G.old_h = window.innerHeight, game.resizeGame())
            }), game.incentivised = !1, game.resizeGame()
        },
        preload: function() {
            G.Loader.loadBootAssets()
        },
        create: function() {
            game.resizeGame(), G.overlayBitmap = game.make.bitmapData(256, 256), G.overlayBitmap.fill(255, 0, 0, 1), game.state.start("Preloader")
        },
        enterIncorrectOrientation: function() {
            G.orientated = !1, document.getElementById("orientation").style.display = "block"
        },
        leaveIncorrectOrientation: function() {
            G.orientated = !0, document.getElementById("orientation").style.display = "none"
        }
    }, G.pad = function(n, width, z) {
        return z = z || "0", n += "", n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    }, Phaser.Stage.prototype.visibilityChange = function(event) {
        if ("pagehide" !== event.type && "blur" !== event.type && "pageshow" !== event.type && "focus" !== event.type && "click" !== event.type) document.hidden || document.mozHidden || document.msHidden || document.webkitHidden || "pause" === event.type ? game.sound.mute = !0 : game.sound.mute = !1;
        else if ("pagehide" === event.type || "blur" === event.type) this.game.focusLoss(event), game.sound.mute = !0;
        else if ("pageshow" === event.type || "focus" === event.type) {
            this.game.focusGain(event);
            try {
                var savedSettings = G.saveState.data.mute;
                game.paused || (game.sound.mute = savedSettings)
            } catch (e) {}
        }
    }, Phaser.Text.prototype.updateText = function() {
        this.texture.baseTexture.resolution = this._res, this.context.font = this.style.font;
        var outputText = this.text;
        this.characterLimitSize > -1 && this.characterLimitSize < outputText.length && (outputText = this.text.substring(0, this.characterLimitSize) + this.characterLimitSuffix), this.style.wordWrap && (outputText = this.runWordWrap(this.text));
        var lines = outputText.split(this.splitRegExp),
            tabs = this.style.tabs,
            lineWidths = [],
            maxLineWidth = 0,
            fontProperties = this.determineFontProperties(this.style.font),
            drawnLines = lines.length;
        this.style.maxLines > 0 && this.style.maxLines < lines.length && (drawnLines = this.style.maxLines), this._charCount = 0;
        for (var i = 0; drawnLines > i; i++) {
            if (0 === tabs) {
                var lineWidth = this.style.strokeThickness + this.padding.x;
                lineWidth += this.colors.length > 0 || this.strokeColors.length > 0 || this.fontWeights.length > 0 || this.fontStyles.length > 0 ? this.measureLine(lines[i]) : this.context.measureText(lines[i]).width, this.style.wordWrap && (lineWidth -= this.context.measureText(" ").width)
            } else {
                var line = lines[i].split(/(?:\t)/),
                    lineWidth = this.padding.x + this.style.strokeThickness;
                if (Array.isArray(tabs))
                    for (var tab = 0, c = 0; c < line.length; c++) {
                        var section = 0;
                        section = this.colors.length > 0 || this.strokeColors.length > 0 || this.fontWeights.length > 0 || this.fontStyles.length > 0 ? this.measureLine(line[c]) : Math.ceil(this.context.measureText(line[c]).width), c > 0 && (tab += tabs[c - 1]), lineWidth = tab + section
                    } else
                        for (var c = 0; c < line.length; c++) {
                            lineWidth += this.colors.length > 0 || this.strokeColors.length > 0 || this.fontWeights.length > 0 || this.fontStyles.length > 0 ? this.measureLine(line[c]) : Math.ceil(this.context.measureText(line[c]).width);
                            var diff = this.game.math.snapToCeil(lineWidth, tabs) - lineWidth;
                            lineWidth += diff
                        }
            }
            lineWidths[i] = Math.ceil(lineWidth), maxLineWidth = Math.max(maxLineWidth, lineWidths[i])
        }
        this.canvas.width = maxLineWidth * this._res, this.canvas.width % 2 === 1 && (this.canvas.width = this.canvas.width + 1);
        var lineHeight = fontProperties.fontSize + this.style.strokeThickness + this.padding.y,
            height = lineHeight * drawnLines,
            lineSpacing = this._lineSpacing;
        0 > lineSpacing && Math.abs(lineSpacing) > lineHeight && (lineSpacing = -lineHeight), 0 !== lineSpacing && (height += lineSpacing > 0 ? lineSpacing * lines.length : lineSpacing * (lines.length - 1)), this.canvas.height = height * this._res, this.canvas.height % 2 === 1 && (this.canvas.height = this.canvas.height + 1), this.context.scale(this._res, this._res), navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.style.backgroundColor && (this.context.fillStyle = this.style.backgroundColor, this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)), this.context.fillStyle = this.style.fill, this.context.font = this.style.font, this.context.strokeStyle = this.style.stroke, this.context.textBaseline = "alphabetic", this.context.lineWidth = this.style.strokeThickness, this.context.lineCap = "round", this.context.lineJoin = "round";
        var linePositionX, linePositionY;
        for (this._charCount = 0, i = 0; drawnLines > i; i++) linePositionX = this.style.strokeThickness / 2, linePositionY = this.style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent, i > 0 && (linePositionY += lineSpacing * i), "right" === this.style.align ? linePositionX += maxLineWidth - lineWidths[i] : "center" === this.style.align && (linePositionX += (maxLineWidth - lineWidths[i]) / 2), this.autoRound && (linePositionX = Math.round(linePositionX), linePositionY = Math.round(linePositionY)), this.colors.length > 0 || this.strokeColors.length > 0 || this.fontWeights.length > 0 || this.fontStyles.length > 0 ? this.updateLine(lines[i], linePositionX, linePositionY) : (this.style.stroke && this.style.strokeThickness && (this.updateShadow(this.style.shadowStroke), 0 === tabs ? this.context.strokeText(lines[i], linePositionX, linePositionY) : this.renderTabLine(lines[i], linePositionX, linePositionY, !1)), this.style.fill && (this.updateShadow(this.style.shadowFill), 0 === tabs ? this.context.fillText(lines[i], linePositionX, linePositionY) : this.renderTabLine(lines[i], linePositionX, linePositionY, !0)));
        this.updateTexture(), this.dirty = !1
    };
    var saveAs = saveAs || function(e) {
        "use strict";
        if (!("undefined" == typeof e || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
            var t = e.document,
                n = function() {
                    return e.URL || e.webkitURL || e
                },
                r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                o = "download" in r,
                i = function(e) {
                    var t = new MouseEvent("click");
                    e.dispatchEvent(t)
                },
                a = /constructor/i.test(e.HTMLElement),
                f = function(t) {
                    (e.setImmediate || e.setTimeout)(function() {
                        throw t
                    }, 0)
                },
                u = "application/octet-stream",
                s = 4e4,
                d = function(e) {
                    var t = function() {
                        "string" == typeof e ? n().revokeObjectURL(e) : e.remove()
                    };
                    setTimeout(t, s)
                },
                c = function(e, t, n) {
                    t = [].concat(t);
                    for (var r = t.length; r--;) {
                        var o = e["on" + t[r]];
                        if ("function" == typeof o) try {
                            o.call(e, n || e)
                        } catch (i) {
                            f(i)
                        }
                    }
                },
                l = function(e) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], {
                        type: e.type
                    }) : e
                },
                p = function(t, f, s) {
                    s || (t = l(t));
                    var m, p = this,
                        v = t.type,
                        w = v === u,
                        y = function() {
                            c(p, "writestart progress write writeend".split(" "))
                        },
                        h = function() {
                            if (w && a && e.FileReader) {
                                var r = new FileReader;
                                return r.onloadend = function() {
                                    var t = r.result;
                                    e.location.href = "data:attachment/file" + t.slice(t.search(/[,;]/)), p.readyState = p.DONE, y()
                                }, r.readAsDataURL(t), void(p.readyState = p.INIT)
                            }
                            if (m || (m = n().createObjectURL(t)), w) e.location.href = m;
                            else {
                                var o = e.open(m, "_blank");
                                o || (e.location.href = m)
                            }
                            p.readyState = p.DONE, y(), d(m)
                        };
                    return p.readyState = p.INIT, o ? (m = n().createObjectURL(t), void setTimeout(function() {
                        r.href = m, r.download = f, i(r), y(), d(m), p.readyState = p.DONE
                    })) : void h()
                },
                v = p.prototype,
                w = function(e, t, n) {
                    return new p(e, t || e.name || "download", n)
                };
            return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function(e, t, n) {
                return t = t || e.name || "download", n || (e = l(e)), navigator.msSaveOrOpenBlob(e, t)
            } : (v.abort = function() {}, v.readyState = v.INIT = 0, v.WRITING = 1, v.DONE = 2, v.error = v.onwritestart = v.onprogress = v.onwrite = v.onabort = v.onerror = v.onwriteend = null, w)
        }
    }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
    "undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null !== define.amd && define([], function() {
        return saveAs
    }), G.Editor = function(game) {
        this.game, this.add, this.camera, this.cache, this.input, this.load, this.math, this.sound, this.stage, this.time, this.tweens, this.state, this.world, this.particles, this.physics, this.rnd
    }, G.Editor.prototype = {
        init: function(lvlNr) {
            s = game.state.getCurrentState(), this.EDITOR = !0, this.NOTRESIZABLE = !0, G.lvl = {}, G.lvlNr = lvlNr, G.lvl.data = G.json.levels[lvlNr], G.lvlData = G.json.levels[lvlNr], G.lvl = new G.LvlObject
        },
        create: function() {
            game.world.setBounds(0, 0, game.width, game.height), game.scale.setGameSize(2e3, 1500), this.txt = game.add.existing(new G.Text(0, 0, "LEVEL " + (G.lvlNr + 1), {
                style: "font-white",
                fontSize: "50px"
            }, 0, 300)), this.board = new G.Board(G.lvlData, G.l(72), !0), this.board.update = function() {}, this.board.actionManager.glowPossibleMoves = function() {}, this.board.position.setTo(50, 150), this.board.boardIce.alpha = .7, this.board.inputController.destroy(), game.input.mouse.mouseWheelCallback = function() {
                this.board.y += -50 * game.input.mouse.wheelDelta
            }.bind(this), this.dropZones = new G.EditorDropZones(this.board, G.lvlData.predefinedDrops), this.sidePanel = new G.EditorSidePanel(900), this.keys = game.input.keyboard.addKeys({
                one: Phaser.Keyboard.ONE,
                two: Phaser.Keyboard.TWO,
                three: Phaser.Keyboard.THREE,
                four: Phaser.Keyboard.FOUR,
                five: Phaser.Keyboard.FIVE,
                six: Phaser.Keyboard.SIX,
                seven: Phaser.Keyboard.SEVEN,
                eight: Phaser.Keyboard.EIGHT,
                nine: Phaser.Keyboard.NINE,
                zero: Phaser.Keyboard.ZERO,
                tilde: Phaser.Keyboard.B,
                z: Phaser.Keyboard.Z,
                x: Phaser.Keyboard.X,
                c: Phaser.Keyboard.C,
                v: Phaser.Keyboard.V,
                b: Phaser.Keyboard.B,
                n: Phaser.Keyboard.N,
                m: Phaser.Keyboard.M,
                l: Phaser.Keyboard.L,
                Q: Phaser.Keyboard.Q,
                W: Phaser.Keyboard.W,
                E: Phaser.Keyboard.E,
                R: Phaser.Keyboard.R,
                T: Phaser.Keyboard.T,
                Y: Phaser.Keyboard.Y,
                U: Phaser.Keyboard.U,
                P: Phaser.Keyboard.P,
                A: Phaser.Keyboard.A,
                S: Phaser.Keyboard.S,
                D: Phaser.Keyboard.D,
                F: Phaser.Keyboard.F,
                G: Phaser.Keyboard.G,
                SPACE: Phaser.Keyboard.SPACEBAR
            }), this.keys.one.onDown.add(function() {
                this.dbgChangeCandy("1")
            }, this), this.keys.two.onDown.add(function() {
                this.dbgChangeCandy("2")
            }, this), this.keys.three.onDown.add(function() {
                this.dbgChangeCandy("3")
            }, this), this.keys.four.onDown.add(function() {
                this.dbgChangeCandy("4")
            }, this), this.keys.five.onDown.add(function() {
                this.dbgChangeCandy("5")
            }, this), this.keys.six.onDown.add(function() {
                this.dbgChangeCandy("6")
            }, this), this.keys.seven.onDown.add(function() {
                this.dbgChangeCandy("r")
            }, this), this.keys.eight.onDown.add(function() {
                this.dbgChangeCandy("chest")
            }, this), this.keys.nine.onDown.add(function() {
                this.dbgChangeCandy("goalCandy")
            }, this), this.keys.S.onDown.add(function() {
                this.dbgChangeCandy("infection")
            }, this), this.keys.tilde.onDown.add(function() {
                this.dbgChangeCandyIntoSpecial()
            }, this), this.keys.SPACE.onDown.add(function() {
                for (var xx = 0; 8 > xx; xx++)
                    for (var yy = 0; 8 > yy; yy++)
                        if (this.board.isCellOnBoard(xx, yy)) {
                            var candy = this.board.getCandy(xx, yy);
                            candy && candy.destroy(), this.board.boardCandies.newCandy(xx, yy, this.board.getRandomThatDoesntMatch(xx, yy))
                        }
            }, this), this.keys.zero.onDown.add(function() {
                for (var xx = 0; 10 > xx; xx++)
                    for (var yy = 0; 10 > yy; yy++)
                        if (this.board.isCellOnBoard(xx, yy)) {
                            var candy = this.board.getCandy(xx, yy);
                            candy && candy.destroy(), this.board.boardCandies.newCandy(xx, yy, "r")
                        }
            }, this), this.keys.P.onDown.add(function() {
                var pos = this.board.inputController.pointerToCell(game.input.activePointer);
                if (pos && this.board.isCellOnBoard(pos)) {
                    var candy = this.board.getCandy(pos[0], pos[1]);
                    candy && "infection" !== candy.candyType && (candy.infected ? candy.infect() : candy.removeInfection())
                }
            }, this), this.keys.A.onDown.add(function() {
                var pos = this.board.inputController.pointerToCell(game.input.activePointer);
                if (pos && this.board.isCellOnBoard(pos)) {
                    var candy = this.board.getCandy(pos[0], pos[1]);
                    candy && "infection" !== candy.candyType && (candy.wrapped ? candy.unwrap() : candy.wrap())
                }
            }, this), this.keys.D.onDown.add(function() {
                var pos = this.board.inputController.pointerToCell(game.input.activePointer);
                if (pos && this.board.isCellOnBoard(pos)) {
                    var candy = this.board.getCandy(pos[0], pos[1]);
                    candy && "infection" !== candy.candyType && (candy.blocker ? 1 == candy.blockerHp ? candy.removeBlocker() : candy.changeIntoBlocker(candy.blockerHp - 1) : candy.changeIntoBlocker(3))
                }
            }, this), this.keys.W.onDown.add(function() {
                this.changeHpToken(this.board.boardIce)
            }, this), this.keys.Y.onDown.add(function() {
                var pos = this.board.inputController.pointerToCell(game.input.activePointer);
                if (pos) {
                    if ("X" == this.board.boardData.get(pos[0], pos[1])) return this.board.boardData.set(pos[0], pos[1], null), void this.board.boardBackground.redraw();
                    this.board.boardData.set(pos[0], pos[1], "X"), this.board.boardBackground.redraw(), this.board.layers.forEach(function(layer) {
                        layer.grid.get(pos[0], pos[1]) && layer.removeToken(pos[0], pos[1])
                    }, this)
                }
            }, this), this.keys.U.onDown.add(function() {
                this.changeHpToken(this.board.boardIce)
            }, this), this.keys.E.onDown.add(function() {
                this.changeHpToken(this.board.boardCage)
            }, this), this.keys.R.onDown.add(function() {
                this.changeHpToken(this.board.boardDirt)
            }, this), this.keys.F.onDown.add(function() {
                this.changeHpToken(this.board.boardDirtS)
            }, this), this.keys.G.onDown.add(function() {
                this.changeHpToken(this.board.boardJam)
            }, this), this.keys.T.onDown.add(function() {
                var pos = this.board.inputController.pointerToCell(game.input.activePointer);
                pos && this.board.getCandy(pos[0], pos[1]) && this.board.removeCandy(pos[0], pos[1])
            }, this), this.keys.z.onDown.add(function() {
                this.sidePanel.exportLevel();
                for (var width = G.lvlData.levelData.length, levelData = G.lvlData.levelData, newLevelData = JSON.parse(JSON.stringify(levelData)), toCol = width % 2 == 0 ? .5 * width : Math.floor(.5 * width), col = 0; toCol > col; col++) newLevelData[col] = JSON.parse(JSON.stringify(levelData[col])), newLevelData[width - (col + 1)] = JSON.parse(JSON.stringify(levelData[col]));
                G.lvlData.levelData = newLevelData, game.state.start("Editor", !0, !1, G.lvlNr)
            }, this), this.keys.x.onDown.add(function() {
                this.sidePanel.exportLevel();
                for (var height = G.lvlData.levelData[0].length, levelData = G.lvlData.levelData, newLevelData = JSON.parse(JSON.stringify(levelData)), toRow = height % 2 == 0 ? .5 * height : Math.floor(.5 * height), col = 0; col < levelData.length; col++)
                    for (var row = 0; toRow > row; row++) newLevelData[col][height - (row + 1)] = JSON.parse(JSON.stringify(newLevelData[col][row]));
                G.lvlData.levelData = newLevelData, game.state.start("Editor", !0, !1, G.lvlNr)
            }, this), this.keys.c.onDown.add(function() {
                var pos = this.board.inputController.pointerToCell(game.input.activePointer);
                pos && this.board.boardCollectCells.editorChangeCC(pos[0], pos[1])
            }, this)
        },
        update: function() {},
        changeHpToken: function(layer) {
            var pos = this.board.inputController.pointerToCell(game.input.activePointer);
            if (pos) {
                var cellX = pos[0],
                    cellY = pos[1];
                if (this.board.isCellOnBoard(cellX, cellY)) {
                    var elem = layer.getToken(cellX, cellY);
                    if (elem) {
                        var hp = elem.hp;
                        console.log("changeHpToken", hp), layer.destroyCell(cellX, cellY), hp < layer.config.maxHp && layer.createToken(cellX, cellY, hp + 1)
                    } else console.log("create token"), layer.createToken(cellX, cellY, 1)
                }
            }
        },
        changeBoardSize: function(width, height) {
            var width = game.math.clamp(width, 4, 10),
                height = game.math.clamp(height, 4, 10),
                oldBoardData = this.board.boardData;
            this.board.boardData = new G.GridArray(width, height, null), oldBoardData.loop(function(elem, x, y, data) {
                this.board.boardData.isInGrid(x, y) && "X" == elem && this.board.boardData.set(x, y, "X")
            }, this), this.board.boardBackground.redraw(), this.board.layers.forEach(function(layer) {
                var oldGrid = layer.grid;
                layer.grid = new G.GridArray(width, height, !1), oldGrid.loop(function(elem, x, y) {
                    layer.grid.isInGrid(x, y) ? layer.grid.set(x, y, elem) : elem && elem.destroy && elem.destroy()
                })
            }), G.sb("editorChangedBoardSize").dispatch()
        },
        dbgChangeCandy: function(type) {
            var pos = this.board.inputController.pointerToCell(game.input.activePointer);
            if (pos && this.board.isCellOnBoard(pos)) {
                var candy = this.board.getCandy(pos[0], pos[1]);
                candy && candy.destroy(), this.board.boardCandies.newCandy(pos[0], pos[1], type)
            }
        },
        dbgChangeCandyIntoSpecial: function(type) {
            var pos = this.board.inputController.pointerToCell(game.input.activePointer);
            if (pos && this.board.isCellOnBoard(pos)) {
                var candy = this.board.getCandy(pos[0], pos[1]);
                if (!candy) return;
                var candyType = candy.candyType;
                console.log("candyType", candyType);
                var newCandy;
                candy.specialType === !1 ? candy.changeInto("horizontal", !0) : "horizontal" === candy.specialType ? (candy.destroy(), newCandy = this.board.boardCandies.newCandy(pos[0], pos[1], candyType), newCandy.changeInto("vertical", !0)) : "vertical" === candy.specialType ? (candy.destroy(), newCandy = this.board.boardCandies.newCandy(pos[0], pos[1], candyType), newCandy.changeInto("cross", !0)) : "cross" === candy.specialType ? (candy.destroy(),
                    newCandy = this.board.boardCandies.newCandy(pos[0], pos[1], candyType), newCandy.changeInto("spiral", !0)) : "spiral" === candy.specialType && (candy.destroy(), newCandy = this.board.boardCandies.newCandy(pos[0], pos[1], "1"))
            }
        },
        render: function() {
            game.debug.text(game.time.fps, 300, 10, "#ff0000");
            var pos = this.board.inputController.pointerToCell(game.input.activePointer);
            if (game.debug.text(this.board.inputController.isPointerInRange(game.input.activePointer), 10, 10, "#ff0000"), game.debug.text(pos, 10, 40, "#ff0000"), game.debug.text(this.board.isCellOnBoard(this.board.inputController.pointerToCell(game.input.activePointer)), 10, 80, "#ff0000"), pos) {
                var candy = this.board.getCandy(pos[0], pos[1]);
                candy && game.debug.text(candy.candyType, 10, 150, "#ff0000")
            }
        },
        shutdown: function() {
            G.IMMEDIATE = !1, game.input.mouse.mouseWheelCallback = null
        }
    }, G.EditorWorld = function(game) {}, G.EditorWorld.prototype = {
        init: function(lvlIndex) {
            s = game.state.getCurrentState(), this.NOTRESIZABLE = !0, this.EDITOR = !0, this.lastLvlIndex = null, "object" == typeof lvlIndex ? this.lastLvlIndex = lvlIndex.lvlNr : "number" == typeof lvlIndex && (this.lastLvlIndex = lvlIndex), this.fillSaveState3Stars(), this.selectedLevels = []
        },
        create: function() {
            game.world.setBounds(0, 0, game.width, game.height), game.scale.setGameSize(2300, 1300), this.map = new G.WorldMap(G.json.settings.mapTiles, [], G.json.levels, !0), this.sidePanel = new G.EditorWorldSidePanel(1400, 10), this.keys = game.input.keyboard.addKeys({
                C: Phaser.Keyboard.C,
                M: Phaser.Keyboard.M,
                CTRL: Phaser.Keyboard.CONTROL
            }), this.cursors = game.input.keyboard.createCursorKeys(), game.input.onDown.add(function(pointer) {
                var xx = Math.floor((pointer.worldX - this.map.x) * (1 / G.Loader.currentConfigMulti)),
                    yy = Math.floor((pointer.worldY - this.map.y) * (1 / G.Loader.currentConfigMulti));
                this.keys.C.isDown && (this.map.lvlBtnGroup.add(G.makeImage(xx, yy, "map_point", .5)), G.json.levels.push({
                    mapX: xx,
                    mapY: yy,
                    moves: 30,
                    rainbowChance: 2,
                    nrOfTypes: 5,
                    goal: ["collect", [
                        ["1", 5],
                        ["2", 5],
                        ["3", 5],
                        ["4", 5]
                    ]],
                    starsReq: [5e3, 7500, 1e4],
                    drops: [],
                    levelData: [
                        [
                            ["1"],
                            ["3"],
                            ["1"],
                            ["4"],
                            ["1"]
                        ],
                        [
                            ["2"],
                            ["3"],
                            ["2"],
                            ["3"],
                            ["4"]
                        ],
                        [
                            ["4"],
                            ["1"],
                            ["2"],
                            ["1"],
                            ["2"]
                        ],
                        [
                            ["1"],
                            ["4"],
                            ["4"],
                            ["3"],
                            ["1"]
                        ],
                        [
                            ["2"],
                            ["1"],
                            ["3"],
                            ["2"],
                            ["4"]
                        ],
                        [
                            ["3"],
                            ["4"],
                            ["1"],
                            ["4"],
                            ["3"]
                        ]
                    ]
                }), this.fillSaveState3Stars(), this.map.refreshButtons()), this.keys.M.isDown && this.moveLevels(xx, yy)
            }, this), void 0 !== this.lastLvlIndex && (this.map.centerOnLvl(this.lastLvlIndex + 1), this.selectLevel(this.lastLvlIndex))
        },
        selectLevel: function(lvlIndex) {
            "number" == typeof lvlIndex ? this.keys.CTRL.isDown ? this.selectedLevels.includes(lvlIndex) ? this.selectedLevels.splice(this.selectedLevels.indexOf(lvlIndex), 1) : this.selectedLevels.push(lvlIndex) : this.selectedLevels.includes(lvlIndex) ? this.selectedLevels = [] : this.selectedLevels = [lvlIndex] : Array.isArray(lvlIndex) ? this.selectedLevels = lvlIndex : this.selectedLevels = [], this.selectedLevels.sort(function(a, b) {
                return a - b
            }), this.map.refreshButtons(), G.sb("editorLevelSelected").dispatch(), this.sidePanel.refresh()
        },
        moveLevels: function(x, y) {
            if (0 !== this.selectedLevels.length) {
                var offsets = this.selectedLevels.map(function(lvlIndex, i, array) {
                    var firstLevel = G.json.levels[array[0]],
                        lvlData = G.json.levels[lvlIndex];
                    return {
                        x: lvlData.mapX - firstLevel.mapX,
                        y: lvlData.mapY - firstLevel.mapY
                    }
                });
                this.selectedLevels.forEach(function(lvlIndex, i) {
                    G.json.levels[lvlIndex].mapX = x + offsets[i].x, G.json.levels[lvlIndex].mapY = y + offsets[i].y
                }), this.map.refreshButtons()
            }
        },
        fillSaveState3Stars: function() {
            G.saveState.data.levels = [];
            for (var i = 0; i < G.json.levels.length; i++) G.saveState.data.levels.push(3);
            G.saveState.save()
        },
        update: function() {
            this.selectedLevels.forEach(function(lvlIndex) {
                this.cursors.up.isDown && (G.json.levels[lvlIndex].mapY--, this.map.refreshButtons()), this.cursors.down.isDown && (G.json.levels[lvlIndex].mapY++, this.map.refreshButtons()), this.cursors.left.isDown && (G.json.levels[lvlIndex].mapX--, this.map.refreshButtons()), this.cursors.right.isDown && (G.json.levels[lvlIndex].mapX++, this.map.refreshButtons())
            }, this)
        },
        render: function() {
            game.debug.text(game.time.fps, 10, 10, "#ff0000")
        }
    }, G.ErrorState = function() {}, G.ErrorState.prototype = {
        preload: function() {},
        create: function() {
            this.bg = new G.LevelBg, new G.AnotherTabWindow
        }
    }, G.Game = function(game) {}, G.Game.prototype = {
        init: function(lvlNr, debugMode, startBoosters, challengeLvl) {
            this.gameId = game.rnd.uuid(), G.giftStatusIndex = 0, s = game.state.getCurrentState(), challengeLvl ? (this.lvlNr = 1e4 + (G.saveState.data.dailyBeaten || 0), G.lvlData = challengeLvl, this.mode = "CHALLENGE") : (this.lvlNr = Math.min(G.json.levels.length - 1, lvlNr), G.lvlData = JSON.parse(JSON.stringify(G.json.levels[lvlNr])), this.mode = "NORMAL"), this.debugMode = debugMode || !1, G.debugMode = this.debugMode, this.startBoosters = startBoosters || [], this.doubleMoney = !1
        },
        preload: function() {},
        create: function() {
            function gofull() {
                if (!game.isFullScreen) {
                    game.isFullScreen = !0;
                    try {
                        document.body[game.device.requestFullscreen]()
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
            game.resizeGame(), G.saveState.loseLife(), "CHALLENGE" === this.mode ? G.gameTracking.start("DailyChallenge", this.getLevelDimension()) : G.gameTracking.start("Gate" + G.saveState.checkGateNr(this.lvlNr).toString(), this.getLevelDimension()), this.tracker = new G.TrackData(this.lvlNr, G.lvlData), G.lvl = new G.LvlObject, this.debugMode && game.resizeGame(), this.bg = new G.LevelBg, this.board = new G.Board(G.lvl.data, G.l(72)), this.topBar = new G.UI_TopBar, this.boosterPanel = new G.UI_BoosterPanel, this.collectableAnimLayer = new G.CollectableAnimLayer(this.board, this.topBar), this.chestLayer = new G.ChestLayer, this.UIFxLayer = new G.UIFxLayer, this.fxTopLayer = new G.TopFxLayer(this.board, "fxTop"), this.fxTopLayer.position = this.board.boardCandies.position, this.fxTopLayer.scale = this.board.boardCandies.scale, this.pointsLayer = new G.PointsLayer(this.topBar), this.popOutMoneyLayer = new G.PopOutMoneyLayer, this.shoutOuts = new G.UI_ShoutOuts, this.overlay = new G.Overlay, this.windowLayer = new G.WindowLayer, this.fadeLayer = new G.FadeLayer, this.windowLayer.pushWindow("taskSlider"), G.json.tutorials[this.lvlNr + 1] && -1 == G.saveState.data.finishedTutorials.indexOf(this.lvlNr + 1) ? (G.sb("onAllWindowsClosed").addOnce(function() {
                new G.Tutorial(this.lvlNr + 1)
            }, this), G.sb("onTutorialFinish").addOnce(function() {
                G.sb("actionQueueEmpty").addOnce(function() {
                    this.board.actionManager.newAction("startBoosterInit")
                }, this)
            }, this)) : G.sb("onAllWindowsClosed").addOnce(function() {
                this.board.actionManager.newAction("startBoosterInit")
            }, this), this.debugMode && this.debugInit(), game.resizeGame(), game.device.desktop || game.input.onUp.add(gofull, this), G.gameTracking.FTUEDesign("FTUE:03_GamefieldIsVisible")
        },
        update: function() {
            G.delta(), G.DEBUG && (this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer))
        },
        getLevelDimension: function() {
            return "Level" + G.pad(this.lvlNr + 1, 4)
        },
        render: function() {
            return
        },
        initDebugTools: function() {
            var keys = game.input.keyboard.addKeys({
                one: Phaser.Keyboard.ONE,
                two: Phaser.Keyboard.TWO,
                three: Phaser.Keyboard.THREE,
                four: Phaser.Keyboard.FOUR,
                five: Phaser.Keyboard.FIVE,
                six: Phaser.Keyboard.SIX,
                r: Phaser.Keyboard.R
            });
            keys.one.onDown.add(function() {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("1")
            }, this), keys.two.onDown.add(function() {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("2")
            }, this), keys.three.onDown.add(function() {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("3")
            }, this), keys.four.onDown.add(function() {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("4")
            }, this), keys.five.onDown.add(function() {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("5")
            }, this), keys.six.onDown.add(function() {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("6")
            }, this)
        },
        shutdown: function() {},
        debugInit: function() {
            this.initDebugTools();
            var levelNr = game.add.text(0, 0, "LEVEL " + (this.lvlNr + 1));
            game.add.existing(levelNr);
            var toolBtn = game.add.text(150, 0, "TOOL");
            toolBtn.inputEnabled = !0, toolBtn.input.useHandCursor = !0, toolBtn.events.onInputDown.add(function() {
                G.openLevelMgr(G.json.levels)
            }, this), game.add.existing(toolBtn);
            var mapBtn = game.add.text(250, 0, "MAP");
            mapBtn.inputEnabled = !0, mapBtn.input.useHandCursor = !0, mapBtn.events.onInputDown.add(function() {
                game.state.start("EditorWorld")
            }, this), game.add.existing(mapBtn);
            var editBtn = game.add.text(350, 0, "LVL EDIT");
            editBtn.inputEnabled = !0, editBtn.input.useHandCursor = !0, editBtn.events.onInputDown.add(function() {
                game.state.start("Editor", !0, !1, this.lvlNr)
            }, this), game.add.existing(editBtn);
            var prevBtn = game.add.text(500, 0, "PREV");
            prevBtn.inputEnabled = !0, prevBtn.input.useHandCursor = !0, prevBtn.events.onInputDown.add(function() {
                console.log("current: " + G.lvlNr), console.log("prev: " + Math.max(0, this.lvlNr - 1)), game.state.start("Game", !0, !1, Math.max(0, this.lvlNr - 1), !0)
            }, this), game.add.existing(prevBtn);
            var nextBtn = game.add.text(600, 0, "NEXT");
            nextBtn.inputEnabled = !0, nextBtn.input.useHandCursor = !0, nextBtn.events.onInputDown.add(function() {
                console.log("current: " + G.lvlNr), console.log("nextL " + Math.min(G.json.levels.length - 1, this.lvlNr + 1)), game.state.start("Game", !0, !1, Math.min(G.json.levels.length - 1, this.lvlNr + 1), !0)
            }, this), game.add.existing(nextBtn)
        }
    }, G.debugGoToLevel = function(nr) {
        G.saveState.data.levels = [], G.saveState.data.finishedTutorials = [], G.saveState.data.boosters = [null, 30, 30, 30, 30, 30, 30, 30, 30];
        for (var i = 0; nr > i; i++) G.saveState.data.levels.push(3);
        game.state.start("Game", !0, !1, nr - 1, !0)
    }, G.MapEditor = function(game) {}, G.MapEditor.prototype = {
        init: function() {
            s = game.state.getCurrentState()
        },
        create: function() {
            this.mapGroup = new G.StrObjGroup(.5 * game.width, .5 * game.height, G.json.map), this.gfxHelpLayer = game.add.graphics(), this.gfxHelpLayer.lineStyle(1, 16711680, .5), this.gfxHelpLayer.moveTo(0, 0), this.gfxHelpLayer.lineTo(0, 2e3), this.gfxHelpLayer.moveTo(-600, 0), this.gfxHelpLayer.lineTo(-600, 2e3), this.gfxHelpLayer.moveTo(600, 0), this.gfxHelpLayer.lineTo(600, 2e3), this.modify = new G.Modify, this.modify.addMouseWheel()
        },
        update: function() {
            this.mapGroup.x = game.world.bounds.x + .5 * game.width, this.gfxHelpLayer.x = this.mapGroup.x
        },
        render: function() {}
    }, G.MidLoader = function(game) {}, G.MidLoader.prototype = {
        init: function(goTo, args) {
            console.log("mid state loader init"), this.transitionCandy = G.makeImage(480, 0, "transition", .5), this.transitionCandy.angle = G.fadeTransitionAngle || 0, this.transitionCandy.scale.setTo(7), this.transitionCandy.y = .5 * game.height, this.softGamesLogo = new G.Button(480, 0, "softgames_logo", function() {
                SG && SG.redirectToPortal()
            }), game.add.existing(this.softGamesLogo), this.softGamesLogo.y = .5 * game.height, this.softGamesLogo.width = G.l(800), this.softGamesLogo.scale.y = this.softGamesLogo.scale.x, this.softGamesLogo.addTerm(function() {
                return 1 == this.alpha
            }), this.softGamesLogo.input.useHandCursor = !1, this.softGamesLogo.alpha = 0, this.goTo = goTo, this.neededAssets = G.Assets[goTo], this.args = args || []
        },
        create: function() {},
        update: function() {
            G.delta(), this.transitionCandy.angle += 1 * G.deltaTime, G.fadeTransitionAngle = this.transitionCandy.angle, G.Loader.checkAssets(this.neededAssets) ? (this.softGamesLogo.alpha = game.math.clamp(this.softGamesLogo.alpha - .05, 0, 1), 0 == this.softGamesLogo.alpha && (this.args.splice(0, 0, this.goTo, !0, !1), game.state.start.apply(game.state, this.args))) : this.softGamesLogo.alpha = game.math.clamp(this.softGamesLogo.alpha + .05, 0, 1)
        }
    }, G.Preloader = function() {}, G.Preloader.prototype = {
        preload: function() {
            this.ready = !1, this.load.onFileComplete.add(function(progress) {}), this.logo = new G.Logo(320, 360), this.loadingBar = G.makeImage(320, 650, "loading_bar"), this.loadingBar.x -= .5 * this.loadingBar.width, this.loadingBar.y -= .5 * this.loadingBar.height, this.loadingBarFull = G.makeImage(320, 650, "loading_bar_full"), this.loadingBarFull.x -= .5 * this.loadingBarFull.width, this.loadingBarFull.y -= .5 * this.loadingBarFull.height, this.load.setPreloadSprite(this.loadingBarFull, 0), G.Loader.loadAssets(), this.fadeLayer = new G.FadeLayer
        },
        create: function() {
            G.addTextStyles(), G.json.settings.boostersUnlock = [null, 0, 0, 0, 0], Object.keys(G.json.tutorials).forEach(function(key) {
                G.json.tutorials[key].boosterNr && (G.json.settings.boostersUnlock[G.json.tutorials[key].boosterNr] = parseInt(key))
            });
            var lvlWithTutID = G.json.levels.find(function(lvl) {
                return lvl.tutID
            });
            lvlWithTutID || Object.keys(G.json.tutorials).forEach(function(id) {
                G.json.levels[parseInt(id) - 1].tutID = id
            }), G.saveState.init(), this.processSpecialCandiesJson(), game.resizeGame(), G.gameTracking.FTUEDesign("FTUE:02_LoadingIsCompleted"), null === game.cache.getSound("music") && (Phaser.Sound.prototype.play = function() {})
        },
        update: function() {
            if (!this.ready && G.saveState.ready && (null === game.cache.getSound("music"), !0)) {
                if (this.ready = !0, G.globalGoalMgr = new G.GlobalGoalMgr, console.log("game is ready"), window._game_loading_timer) {
                    var loadingTime = Date.now() - window._game_loading_timer;
                    window._game_loading_timer = !1, G.gameTracking.design("LoadingComplete", loadingTime)
                }
                sdk.showBanner();
                1 == this.ready && (G.sfx.music.isPlaying || G.sfx.music.play("", 0, 1, !0), game.sound.mute && G.sfx.music.pause(), G.firstTime ? (G.lvlNr = 0, G.sb("onStateChange").dispatch("Game", 0)) : G.sb("onStateChange").dispatch("World"))
            }
        },
        processSpecialCandiesJson: function() {
            G.specialCandies = {
                names: [],
                patterns: [],
                lookUp: {},
                combos: G.json.specialCandies.combos,
                isTypeSpecial: function(type) {
                    return -1 != this.names.indexOf(type)
                },
                getSpecialData: function(type) {
                    return this.lookUp[type]
                }
            }, G.json.specialCandies.candies.forEach(function(elem, index, array) {
                G.specialCandies.names.push(elem.name), elem.patterns && G.specialCandies.patterns.push([elem.name, elem.patterns]), G.specialCandies.lookUp[elem.name] = elem
            })
        },
        getImageURL: function(img) {
            return this._bmpMarker || (this._bmpMarker = this.game.make.image(0, 0, null, 0, null)), this._bmp || (this._bmp = this.game.make.bitmapData()), this._bmp.clear(), G.changeTexture(this._bmpMarker, img), this._bmp.resize(this._bmpMarker.width, this._bmpMarker.height), this._bmp.draw(this._bmpMarker), this._bmp.canvas.toDataURL()
        }
    }, G.TestState = function(game) {
        this.game, this.add, this.camera, this.cache, this.input, this.load, this.math, this.sound, this.stage, this.time, this.tweens, this.state, this.world, this.particles, this.physics, this.rnd
    }, G.TestState.prototype = {
        init: function() {},
        create: function() {
            this.testGroup = game.add.group(), this.testGroup2 = game.add.group(), this.testGroup2.x = 10, this.testGroup2.add(this.testGroup), this.testGroup3 = game.add.group(), this.testGroup3.y = 50, this.testGroup3.add(this.testGroup2), this.testGroup4 = game.add.group(), this.testGroup4.angle = 30, this.testGroup4.add(this.testGroup3);
            for (var i = 0; 200 > i; i++) {
                var candy = G.makeImage(0, 0, "b_play_big_1", .5);
                candy.scale.x = 2, candy.dirX = 20 * Math.random() - 10, candy.dirY = 20 * Math.random() - 10, candy.update = function() {
                    this.x += this.dirX, this.y += this.dirY, this.x < 0 && (this.x = 0, this.dirX *= -1), this.y < 0 && (this.y = 0, this.dirY *= -1), this.x > game.width && (this.x = game.width, this.dirX *= -1), this.y > game.height && (this.y = game.height, this.dirY *= -1)
                }
            }
        },
        update: function() {},
        render: function() {
            game.debug.text(game.time.fps, 300, 10, "#ff0000")
        }
    }, G.TitleScreen = function(game) {}, G.TitleScreen.prototype = {
        init: function() {
            G.giftStatusIndex = 0, this.stage.backgroundColor = 16768477, s = game.state.getCurrentState(), game.world.children[0] && game.world.children[0].destroy()
        },
        create: function() {
            this.bg = new G.LevelBg, this.gemThrower = new G.TitleScreenGemsThrower, this.gemThrower.alpha = .7, this.mainGroup = game.add.group(), this.logo = new G.Logo(320, 360), this.playBtn = new G.Button(320, 650, "btn_play", function() {
                G.sb("onStateChange").dispatch("World")
            }), game.add.existing(this.playBtn), this.soundBtn = new G.SoundBtn(100, 850), this.moreGamesBtn = new G.MoreGamesBtn(540, 850), this.mainGroup.addMultiple([this.logo, this.playBtn, this.soundBtn, this.moreGamesBtn]), this.fadeLayer = new G.FadeLayer, this.editorString = "", this.EDITORKEY = game.input.keyboard.addKeys({
                Q: Phaser.KeyCode.Q,
                W: Phaser.KeyCode.W,
                E: Phaser.KeyCode.E
            }), this.EDITORKEY.Q.onDown.add(function() {
                this.onEditorKey("Q")
            }, this), this.EDITORKEY.W.onDown.add(function() {
                this.onEditorKey("W")
            }, this), this.EDITORKEY.E.onDown.add(function() {
                this.onEditorKey("E")
            }, this), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), game.resizeGame(), G.gameTracking.FTUEDesign("FTUE:MainMenu:Visible")
        },
        onScreenResize: function() {
            G.horizontal ? (this.logo.y = G.l(360), this.soundBtn.x = G.l(50), this.moreGamesBtn.x = G.l(590), this.soundBtn.y = this.moreGamesBtn.y = G.l(850), this.playBtn.y = G.l(800), this.mainGroup.y = 0) : (this.logo.y = G.l(260), this.soundBtn.x = G.l(100), this.moreGamesBtn.x = G.l(540), this.soundBtn.y = this.moreGamesBtn.y = G.l(850), this.playBtn.y = G.l(650), this.mainGroup.y = .5 * (game.height - G.l(960)))
        },
        update: function() {
            G.delta()
        },
        onEditorKey: function(letter) {
            this.editorString += letter, "QWEWQ" === this.editorString.slice(-5) && G.openLevelMgr(G.json.levels)
        },
        render: function() {}
    }, G.World = function(game) {}, G.World.prototype = {
        init: function(lastLevelData) {
            G.globalGoalMgr.unlockCheck(), G.giftStatusIndex = 0, s = game.state.getCurrentState(), this.lastLevelData = lastLevelData, this.startBoosterConfig = new G.StartBoosterConfig, document.body.style.backgroundColor = "#559f1b", document.body.style.backgroundImage = "none"
        },
        create: function() {
            function gofull() {
                if (!game.isFullScreen) {
                    game.isFullScreen = !0;
                    try {
                        document.body[game.device.requestFullscreen]()
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
            G.sentWorldMapDesignEvent || (G.gameTracking.design("SessionFirstTimeWorldMapVisible"), G.sentWorldMapDesignEvent = !0), game.resizeGame(), G.saveState.increaseMapVisibleCounter(), G.globalGoalMgr.saveGoals(), this.map = new G.WorldMap(G.json.settings.mapTiles, G.json.settings.mapAnimatedElements, G.json.levels);
            var lastPassed = G.saveState.getLastPassedLevelNr();
            if (G.json.levels[lastPassed] && (this.tutHandGroup = game.add.group(), this.tutHandGroup.position = this.map.position, this.tutHand = new G.MapTutHand(this.map), this.tutHandGroup.add(this.tutHand)), this.panel = new G.UI_MapPanel, this.mapGift = new G.MapGift, this.dailyChallengeIcon = new G.UI_DailyChallengeIcon(855, 220), this.dailyIcon = new G.UI_DailyIcon(855, 130, !G.saveState.data.sawDailyTut), this.globalGoalBtn = new G.GlobalGoalButton(-270, 125), G.GINGEREVENT && (this.gb = new G.GingerMapButton), this.uiTargetParticlesBW = new G.UITargetParticles, this.windowLayer = new G.WindowLayer(0, 0), this.windowLayer.resize(), this.fxMapLayer = new G.FxMapLayer, this.uiTargetParticles = new G.UITargetParticles, this.fadeLayer = new G.FadeLayer, game.device.desktop || game.input.onUp.add(gofull, this), !G.checkedDailyReward) {
                G.checkedDailyReward = !0;
                var dayToShow = G.saveState.dailyReward_reportVisit();
                null !== dayToShow && G.sb("pushWindow").dispatch(["dailyReward", dayToShow])
            }
        },
        update: function() {
            G.delta()
        },
        makeBlackOverlay: function() {},
        render: function() {}
    }, window.startGame = function() {
        var game = new Phaser.Game(800, 1100, Phaser.CANVAS, "", null, !0);
        window.game = game, game.state.add("Boot", G.Boot), game.state.add("Preloader", G.Preloader), game.state.add("World", G.World), game.state.add("Game", G.Game), game.state.add("Editor", G.Editor), game.state.add("EditorWorld", G.EditorWorld), game.state.add("TitleScreen", G.TitleScreen), game.state.add("TestState", G.TestState), game.state.add("MidLoader", G.MidLoader), game.state.add("ErrorState", G.ErrorState), game.state.add("MapEditor", G.MapEditor), game.state.start("Boot")
    }, window.initGame = function() {
        document.body.style.backgroundImage = "url(img/bg.jpg)", document.body.style.backgroundRepeat = "no-repeat", document.body.style.backgroundSize = "cover", document.body.style.backgroundPosition = "center", window.startGame()
    }, G.ASSETS = {
        spritesheets: ["board", "BOOT-preloader", "bursteffects", "buttons", "dailyReward", "gems", "leaderboard", "mapsheet", "ssheet"],
        sfx: ["boom.mp3", "booster.mp3", "brick_break.mp3", "cash_register.mp3", "chain_rattle.mp3", "chest_open.mp3", "chest_open_louder.mp3", "clock_tick.mp3", "coin_collect.mp3", "dirt_break.mp3", "exchange.mp3", "explosion_subtle.mp3", "forest_sounds.mp3", "ice_break_0.mp3", "ice_break_1.mp3", "lightning.mp3", "line.mp3", "match_1.mp3", "match_2.mp3", "match_3.mp3", "match_4.mp3", "match_5.mp3", "music.mp3", "pop.mp3", "stone_impact_1.mp3", "stone_impact_2.mp3", "stone_impact_3.mp3", "transition.mp3", "whoosh.mp3", "whoosh_short_1.mp3", "whoosh_short_2.mp3", "xylophone_positive.mp3", "xylophone_positive2.mp3", "xylophone_positive6.mp3", "xylophone_positive_12.mp3"],
        images: ["BOOT-background_1.jpg", "BOOT-logo-ja.png", "BOOT-logo-mini-ja.png", "BOOT-logo-mini.png", "BOOT-logo.png", "Map_background_tileable_0.jpg", "Map_background_tileable_1.jpg", "Map_background_tileable_2.jpg", "Map_background_tileable_3.jpg", "map_margin.png"],
        json: ["json.json", "languages.json", "levels.json", "map.json", "settings.json", "specialCandies.json", "tutorials.json"],
        fonts: {}
    }
}();