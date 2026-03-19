var WatchAd = function() {
    var a, i = {};
    return i.f = null, i.show = function(n) {
        a.visible = !0, Laya.stage.addChild(a), i.f = n
    }, i.hide = function() {
        Laya.stage.removeChild(a)
    }, i.init = function() {
        a = new watchAdUI;
        var n = new Laya.Sprite;
        n.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#0"), n.alpha = .7, a.addChildAt(n, 0), a.visible = !1, Laya.stage.addChild(a), a.watch.on("click", null, function() {
            null !== i.f && (i.f(), i.f = null), i.hide()
        }), a.cancle.on("click", null, function() {
            i.hide()
        })
    }, i
}();