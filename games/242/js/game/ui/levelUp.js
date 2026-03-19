var LevelUp = (function () {
  function a() {
    function a() {
      Laya.Tween.to(
        e.share,
        {
          scaleX: 1.1,
          scaleY: 1.1,
        },
        500,
        null,
        Laya.Handler.create(null, function () {
          !0 === n &&
            Laya.Tween.to(
              e.share,
              {
                scaleX: 1,
                scaleY: 1,
              },
              300,
              Laya.Ease.backInOut,
              Laya.Handler.create(null, function () {
                !0 === n && a();
              })
            );
        })
      );
    }
    (n = !0), a();
  }
  var e,
    n,
    r = {},
    o = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER"];
  return (
    (r.show = function () {
      (e.rank.skin = "ui/b_icon_rank" + User.rank1 + ".png"),
        (e.rankbefore.skin = "ui/b_icon_rank" + (User.rank1 - 1) + ".png"),
        (e.msg.text =
          "Wow!I got the " + o[User.rank1 + 1] + " rank. Can you surpass me?"),
        (e.visible = !0),
        Laya.Tween.from(
          e.body,
          {
            scaleX: 0,
            scaleY: 0,
          },
          300
        ),
        (function () {
          function a() {
            n -= 1;
            for (var r = 3 + Math.floor(3 * Math.random()), o = 0; o < r; o++) {
              var t = new Laya.Image();
              (t.skin =
                "effects/lizi" + Math.floor(1 + 4 * Math.random()) + ".png"),
                (t.x = 100 + 500 * Math.random()),
                (t.y = 200 + 100 * Math.random()),
                (t.speedY = 1),
                (t.scaleX = 0.6 * Math.random()),
                (t.scaleY = t.scaleX),
                (t.rotation = 360 * Math.random()),
                (t.speedX = 5 * Math.random() * (t.x - 320) > 0 ? 1 : -1),
                e.addChild(t),
                (function (a) {
                  var e = 180 * Math.random();
                  Laya.timer.frameLoop(1, null, function n() {
                    (e -= 1),
                      (a.x += 1 * a.speedX),
                      Math.abs(a.speedX) > 0.05
                        ? (a.speedX -= (0.05 * a.speedX) / Math.abs(a.speedX))
                        : (a.speedX = 0),
                      (a.y += t.speedY),
                      (a.speedY += 0.2),
                      e <= 0 && (a.destroy(), Laya.timer.clear(null, n));
                  });
                })(t);
            }
            0 === n && Laya.timer.clear(null, a);
          }
          var n = 60;
          Laya.timer.frameLoop(1, null, a);
        })(),
        a();
    }),
    (r.hide = function () {
      (n = !1), (e.visible = !1), UI.show();

      //gdsdk
      if (typeof gdsdk !== "undefined" && gdsdk.showAd !== "undefined") {
        sdk.showBanner();
      }
    }),
    (r.init = function () {
      ((e = new levelUpUI()).popupEffect = null), (e.photo.skin = User.photo);
      var a = new Laya.Sprite();
      a.graphics.drawCircle(65, 65, 65, 65),
        (e.photo.mask = a),
        e.share.on("click", null, function () {
          var a = e.img
            .drawToCanvas(500, 260, e.img.x, e.img.y)
            .getCanvas()
            .toDataURL("image/jpeg");
          console.log(a),
            platform.shareResult(
              a,
              {
                type: "share",
                type2: "newCar",
              },
              function () {
                platform.logEvent("shareNewCar");
              }
            );
        }),
        Laya.stage.addChild(e),
        (e.visible = !1),
        e.btn.on("click", null, r.hide);

      /*禁止share按钮*/
      e.share.visible = false;
      /*调整continue按钮位置*/
      e.btn.x = e.width / 2 - e.btn.width / 2;
    }),
    r
  );
})();
