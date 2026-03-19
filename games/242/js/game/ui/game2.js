var Game2 = function() {
    function e() {
        var e = i[t][0] - l.hand.x,
            a = i[t][1] - l.hand.y;
        if (Math.abs(e) + Math.abs(a) < s) l.hand.x = i[t][0], l.hand.y = i[t][1], (t += 1) === i.length && (t = 0);
        else {
            var n = Math.sqrt(e * e + a * a);
            l.hand.x += e * s / n, l.hand.y += a * s / n
        }
    }

    function a() {
        if (0 !== c.length) {
            l.killMsg.visible = !0;
            var e = c[0],
                a = l.killMsg.getChildByName("p1"),
                n = l.killMsg.getChildByName("p2");
            a.skin = e.p1, n.skin = e.p2, l.killMsg.getChildByName("p1name").text = e.p1n, l.killMsg.getChildByName("p2name").text = e.p2n, e.life === r * e.titles.length && (a.x = 0, n.x = 415, Laya.Tween.from(a, {
                x: a.x - 100
            }, 200), Laya.Tween.from(n, {
                x: n.x + 100
            }, 200), Laya.Tween.from(l.killMsg.getChildByName("spark"), {
                scaleX: 0,
                scaleY: 0
            }, 500, Laya.Ease.backInOut));
            var i = l.killMsg.getChildByName("title");
            e.life % r == 0 && (i.skin = "ui/" + e.titles[e.titles.length - e.life / r] + ".png", i.alpha = 1, i.y = 0, Laya.Tween.from(i, {
                y: i.y + 100
            }, 300, null, Laya.Handler.create(null, function() {
                Laya.timer.once(1500, null, function() {
                    Laya.Tween.to(i, {
                        alpha: 0
                    }, 100)
                })
            }))), e.life -= 1, 0 === e.life && c.splice(0, 1)
        } else l.killMsg.visible = !1
    }
    var l, n = {},
        i = [
            [11, 786],
            [42, 791],
            [106, 863],
            [137, 872],
            [168, 856],
            [182, 828],
            [168, 792],
            [123, 784],
            [51, 862],
            [22, 868],
            [-19, 844],
            [-18, 802]
        ],
        t = 0,
        s = 10,
        c = [],
        r = 120;
    return n.showKill = function(e, a, l, n, i) {
        c.push({
            p1: e,
            p1n: a,
            p2: l,
            p2n: n,
            titles: i,
            life: i.length * r
        })
    }, n.show = function() {
        l.killMsg.visible = !1, c = [], Laya.timer.frameLoop(1, null, a), Laya.timer.frameLoop(1, null, e), l.visible = !0, l.start.visible = !0, l.killMsg.visible = !1, l.kills.value = 0, l.count.skin = "ui/b_pic_3.png", -1 === User.rank1 ? l.count.y = 107 : l.count.y = 0, l.energy.visible = !1
    }, n.kill = function() {
        l.kills.scale(1, 1), l.kills.value = parseInt(l.kills.value) + 1
    }, n.start = function() {
        Laya.timer.clear(null, e), Laya.Tween.to(l.count, {
            scaleX: 3,
            scaleY: 3,
            alpha: .3
        }, 300, null, Laya.Handler.create(null, function() {
            l.start.visible = !1, l.count.scale(1, 1), l.count.alpha = 1
        })), l.energy.visible = !0, n.setEnergy(0)
    }, n.setEnergy = function(e) {
        l.energy.energyMask.graphics.clear(), l.energy.energyMask.graphics.drawRect(0, 0, 336 * e, 66, "#000000")
    }, n.count = function(e) {
        l.count.skin = "ui/b_pic_" + e + ".png", Laya.Tween.to(l.count, {
            scaleX: 1.2,
            scaleY: 1.2
        }, 200, null, Laya.Handler.create(null, function() {
            Laya.Tween.to(l.count, {
                scaleX: 1,
                scaleY: 1
            }, 100, Laya.Ease.backInOut)
        }))
    }, n.hide = function() {
        Laya.timer.clear(null, a), l.visible = !1
    }, n.init = function() {
        l = new game2UI, n.ui = l, n.stick = l.stick, n.stickSign = l.stick.getChildAt(0), Laya.stage.addChild(l), l.visible = !1, l.energy.energyMask = new Laya.Sprite, l.energyBar.mask = l.energy.energyMask
    }, n
}();