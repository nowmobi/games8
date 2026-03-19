function start() {
    Laya.init(720, 1280, laya.webgl.WebGL);
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
    Laya.stage.bgColor = "#343944";
    //Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    Laya.SoundManager.useAudioMusic = !1;
    Laya.stage.frameRate = "fast";
    UIConfig.popupBgAlpha = .8;
    !0 === Laya.Render.isWebGL && platform.logEvent("supportWEBGL"), Res.loadRes(function() {
        platform.afterLoad(Game.init)
    })
}
parseStatic(), platform.start(start);