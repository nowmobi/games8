var Reward = function() {
    function a() {
        function a() {
            Laya.Tween.to(e.share, {
                scaleX: 1.1,
                scaleY: 1.1
            }, 500, null, Laya.Handler.create(null, function() {
                !0 === n && Laya.Tween.to(e.share, {
                    scaleX: 1,
                    scaleY: 1
                }, 300, Laya.Ease.backInOut, Laya.Handler.create(null, function() {
                    !0 === n && a()
                }))
            }))
        }
        n = !0, a()
    }
    var e, n, t = {};
    return t.show = function(n, t) {
        e.car.skin = "cars/" + getData("cars", n).skin + ".png", t = Math.min(7, t), e.num.value = t, UI.hide(), e.visible = !0, Laya.Tween.from(e.body, {
                scaleX: 0,
                scaleY: 0
            }, 300),
            function() {
                function a() {
                    n -= 1;
                    for (var t = 3 + Math.floor(3 * Math.random()), r = 0; r < t; r++) {
                        var o = new Laya.Image;
                        o.skin = "effects/lizi" + Math.floor(1 + 4 * Math.random()) + ".png", o.x = 100 + 500 * Math.random(), o.y = 200 + 100 * Math.random(), o.speedY = 1, o.scaleX = .6 * Math.random(), o.scaleY = o.scaleX, o.rotation = 360 * Math.random(), o.speedX = 5 * Math.random() * (o.x - 320) > 0 ? 1 : -1, e.addChild(o),
                            function(a) {
                                var e = 180 * Math.random();
                                Laya.timer.frameLoop(1, null, function n() {
                                    e -= 1, a.x += 1 * a.speedX, Math.abs(a.speedX) > .05 ? a.speedX -= .05 * a.speedX / Math.abs(a.speedX) : a.speedX = 0, a.y += o.speedY, a.speedY += .2, e <= 0 && (a.destroy(), Laya.timer.clear(null, n))
                                })
                            }(o)
                    }
                    0 === n && Laya.timer.clear(null, a)
                }
                var n = 60;
                Laya.timer.frameLoop(1, null, a)
            }(), a()
    }, t.hide = function() {
        n = !1, e.visible = !1, UI.show()
    }, t.init = function() {
        (e = new rewardUI).popupEffect = null, e.photo.skin = User.photo;
        var a = new Laya.Sprite;
        a.graphics.drawCircle(65, 65, 65, 65), e.photo.mask = a, e.share.on("click", null, function() {
            var a = e.img.drawToCanvas(500, 260, e.img.x, e.img.y).getCanvas().toDataURL("image/jpeg");
            console.log(a), platform.shareResult(a, {
                type: "share",
                type2: "newCar"
            }, function() {
                platform.logEvent("shareNewCar")
            })
        }), Laya.stage.addChild(e), e.visible = !1, e.btn.on("click", null, t.hide);

        /*禁止share按钮*/
        e.share.visible = false;
        /*调整continue位置*/
        e.btn.x = e.width / 2 - e.btn.width / 2;

    }, t
}();