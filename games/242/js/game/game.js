var Game = function() {
    var e = {};
    return e.time = null, e.dir = 0, e.season1Time = 15377724e5, e.timePast = 0, e.init = function() {
        null === User.abtest && (User.abtest = ABTest.create()), e.time = (new Date).getTime(), e.localTime = (new Date).getTime(), Effect.init(), World.init(), UI.init(), Share.init(), Laya.stage.on(Laya.Event.MOUSE_DOWN, null, Stick.onMouseDown), Laya.stage.on(Laya.Event.MOUSE_MOVE, null, Stick.onMouseMove), Laya.stage.on(Laya.Event.MOUSE_UP, null, Stick.onMouseUp), e.adPlayCounter = 30, Laya.timer.loop(1e3, null, function() {
            e.adPlayCounter += 1, e.timePast += 1e3, platform.logEvent("onlineTime", 1), User.syncData()
        }), platform.initADS()
    }, e
}();