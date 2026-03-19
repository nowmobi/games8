var Result = (function () {
  function a() {
    function a() {
      Laya.Tween.to(
        e,
        {
          scaleX: 1.05,
          scaleY: 1.05,
        },
        1e3,
        null,
        Laya.Handler.create(null, function () {
          !0 === s &&
            Laya.Tween.to(
              e,
              {
                scaleX: 1,
                scaleY: 1,
              },
              500,
              Laya.Ease.backInOut,
              Laya.Handler.create(null, function () {
                !0 === s && a();
              })
            );
        })
      );
    }
    s = !0;
    var e = 0 === User.abtest.type ? t.share : t.continue;
    a();
  }

  function e(a) {
    platform.playAD(0, function () {
      var e = c[a],
        n = getData("cars", e);
      User.cars.push({
        id: e,
        time: Game.time + 36e5 * n.p2,
      }),
        Shop.setUserCar(e),
        (t.c1.visible = !1),
        (t.c2.visible = !1),
        (t.c3.visible = !1),
        (t.btns.y = 886);
    });
  }

  function n() {
    !(function () {
      for (e = 0; e < 3; e++) t["c" + (e + 1)].visible = !1;
      if (!0 === platform.canShowVideo()) {
        t.btns.y = 991;
        for (var a = [], e = 0; e < Shop.taps[1].length; e++) {
          var n = Shop.taps[1][e];
          -1 === Shop.findCar(n) && a.push(n);
        }
        var i = a.length > 3 ? 3 : a.length;
        if (1 === i)
          (c[0] = a[0]),
            (l = getData("cars", a[0])),
            (t.c1.x = 320),
            (t.c1.getChildByName("car").skin = "cars/" + l.skin + ".png");
        else if (2 === i)
          (c[0] = a[0]),
            (l = getData("cars", a[0])),
            (t.c1.x = 220),
            (t.c1.getChildByName("car").skin = "cars/" + l.skin + ".png"),
            (c[1] = a[1]),
            (l = getData("cars", a[1])),
            (t.c2.x = 420),
            (t.c2.getChildByName("car").skin = "cars/" + l.skin + ".png");
        else if (3 === i) {
          c[0] = a[0];
          var l = getData("cars", a[0]);
          (t.c1.x = 120),
            (t.c1.visible = !0),
            (t.c1.getChildByName("car").skin = "cars/" + l.skin + ".png"),
            (c[1] = a[1]),
            (l = getData("cars", a[1])),
            (t.c2.x = 320),
            (t.c2.visible = !0),
            (t.c2.getChildByName("car").skin = "cars/" + l.skin + ".png"),
            (c[2] = a[2]),
            (l = getData("cars", a[2])),
            (t.c3.x = 520),
            (t.c3.visible = !0),
            (t.c3.getChildByName("car").skin = "cars/" + l.skin + ".png");
        }
      } else t.btns.y = 886;
    })(),
      (t.resultPanel.visible = !0),
      (t.resultPanel.getChildByName("killMsg").visible = !1),
      Game2.ui.kills.value >= 3 &&
        ((t.resultPanel.getChildByName("killMsg").visible = !0),
        (t.resultPanel.getChildByName("killMsg").getChildAt(0).skin =
          "ui/" + o[Math.min(Game2.ui.kills.value - 3, 3)] + ".png"));
    var e = t.resultPanel.getChildByName("rank1");
    Laya.Tween.from(
      e,
      {
        scaleX: 1.5,
        scaleY: 1.5,
      },
      500
    );
    var n = t.resultPanel.getChildByName("rank2");
    (e.skin = Rank.getRank1Image()), (n.text = Rank.getRank2Text());
    for (var l = Rank.getTotalStars(), s = 331 - 13 * l, r = 0; r < 5; r++) {
      var u = t.resultPanel.getChildByName("item" + r);
      r < l
        ? (r < User.stars
            ? (u.skin = "ui/hd_pic_x1.png")
            : (u.skin = "ui/hd_pic_x2.png"),
          (u.visible = !1),
          (u.x = 490),
          (function (a, e) {
            Laya.timer.once(200 + 200 * e, null, function () {
              (a.visible = !0),
                Laya.Tween.to(
                  a,
                  {
                    x: s + 26 * e,
                  },
                  200
                );
            });
          })(u, r))
        : (u.visible = !1);
    }
    Laya.Tween.from(
      t.resultPanel,
      {
        scaleX: 0,
        scaleY: 0,
      },
      200
    ),
      Laya.Tween.from(
        t.rank,
        {
          scaleX: 0,
          scaleY: 0,
        },
        500
      ),
      (t.kills.value = Game2.ui.kills.value),
      a();
    var p = 0,
      m = [80, 40, 20, 5],
      f = Map1.rank <= 3 ? m[Map1.rank - 1] : 0,
      g = Math.floor(Game2.ui.kills.value * m[3]);
    (p = f + g),
      (t.text1.text = "rank points: +" + f),
      (t.text2.text = "kill points: +" + g);
    var v = User.points;
    !0 === Rank.getStar(p)
      ? ((i.newLevel = !0),
        Laya.timer.once(1e3, null, function () {
          Laya.Tween.to(
            e,
            {
              scaleX: 0,
            },
            300,
            null,
            Laya.Handler.create(null, function () {
              (e.skin = Rank.getRank1Image()),
                Laya.Tween.to(
                  e,
                  {
                    scaleX: 1,
                  },
                  300,
                  Laya.Ease.backInOut
                );
            })
          );
        }))
      : (i.newLevel = !1),
      (t.points.text = User.points + "/100");
    var h;
    h = v + p >= 100 ? 120 : 120 + (v / 100) * 300;
    var y = 120 + (User.points / 100) * 300;
    i.msk.graphics.clear(),
      i.msk2.graphics.clear(),
      i.msk.graphics.drawPie(0, 0, 92, 120, h, "#ffffff"),
      i.msk2.graphics.drawPie(0, 0, 92, h, y, "#ffffff"),
      Laya.timer.once(1500, null, function () {
        !(function (a) {
          for (
            var e = Rank.getTotalStars(), n = 331 - 13 * e, i = 0;
            i < 5;
            i++
          ) {
            var l = t.resultPanel.getChildByName("item" + i);
            i < e
              ? (i < User.stars
                  ? (l.skin = "ui/hd_pic_x1.png")
                  : (l.skin = "ui/hd_pic_x2.png"),
                (l.visible = !0),
                (l.x = n + 26 * i),
                !0 === a &&
                  i === User.stars - 1 &&
                  Laya.Tween.from(
                    l,
                    {
                      y: l.y - 20,
                      scaleX: 3,
                      scaleY: 3,
                    },
                    500,
                    Laya.Ease.backInOut
                  ))
              : (l.visible = !1);
          }
        })(!0),
          (n.text = Rank.getRank2Text());
      });
  }
  var t,
    i = {},
    l = 0,
    s = !1,
    r = 0;
  i.shareVersion = "V2-";
  var c = [],
    o = ["killingSpree", "rampage", "unstoppddable", "legendary"];
  return (
    (i.show = function () {
      (User.playTimes += 1),
        platform.logEvent("playEnd"),
        1 === Map1.rank &&
          (Laya.timer.clear(null, Map1.update),
          Laya.timer.clear(null, Monster.update)),
        (t.visible = !0),
        (t.rank.value = Map1.rank),
        !0 === Map1.result
          ? (Laya.SoundManager.playSound("sounds/win2.mp3", 1),
            !1 === User.shortCutCreated &&
              r % 5 == 0 &&
              ((r += 1),
              platform.createShortCut(function () {
                platform.logEvent("createShortCut"),
                  (User.shortCutCreated = !0);
              })),
            platform.logEvent("win"),
            (t.vicText.visible = !0),
            (t.vicBg.visible = !0),
            (t.vicBg.scaleX = 0),
            (t.vicBg.scaleY = 0.5),
            (t.vicLight.visible = !0),
            (t.vicLight.alpha = 1),
            (t.vicLight.scaleX = 0),
            (t.vicLight.scaleY = 0),
            (t.resultPanel.visible = !1),
            Laya.Tween.from(
              t.vicText,
              {
                scaleX: 1.3,
                scaleY: 1.3,
              },
              300,
              Laya.Ease.backInOut
            ),
            Laya.timer.once(300, null, function () {
              Laya.Tween.to(
                t.vicBg,
                {
                  scaleX: 1,
                  scaleY: 1,
                },
                300
              );
            }),
            Laya.timer.once(900, null, function () {
              Laya.Tween.to(
                t.vicLight,
                {
                  scaleX: 1,
                  scaleY: -1,
                },
                300,
                null,
                Laya.Handler.create(null, function () {
                  Laya.Tween.to(
                    t.vicLight,
                    {
                      alpha: 0,
                    },
                    500
                  );
                })
              ),
                Laya.timer.once(300, null, function () {
                  n();
                });
            }),
            (function () {
              function a() {
                e -= 1;
                for (
                  var n = 3 + Math.floor(3 * Math.random()), i = 0;
                  i < n;
                  i++
                ) {
                  var l = new Laya.Image();
                  (l.skin =
                    "effects/lizi" +
                    Math.floor(1 + 4 * Math.random()) +
                    ".png"),
                    (l.x = 100 + 500 * Math.random()),
                    (l.y = 100 + 100 * Math.random()),
                    (l.speedY = 1),
                    (l.scaleX = 0.6 * Math.random()),
                    (l.scaleY = l.scaleX),
                    (l.rotation = 360 * Math.random()),
                    (l.speedX = 5 * Math.random() * (l.x - 320) > 0 ? 1 : -1),
                    t.addChild(l),
                    (function (a) {
                      var e = 180 * Math.random();
                      Laya.timer.frameLoop(1, null, function n() {
                        (e -= 1),
                          (a.x += 1 * a.speedX),
                          Math.abs(a.speedX) > 0.05
                            ? (a.speedX -=
                                (0.05 * a.speedX) / Math.abs(a.speedX))
                            : (a.speedX = 0),
                          (a.y += l.speedY),
                          (a.speedY += 0.2),
                          e <= 0 && (a.destroy(), Laya.timer.clear(null, n));
                      });
                    })(l);
                }
                0 === e && Laya.timer.clear(null, a);
              }
              var e = 60;
              Laya.timer.frameLoop(1, null, a);
            })())
          : ((t.vicText.visible = !1),
            (t.vicBg.visible = !1),
            (t.vicLight.visible = !1),
            n());
    }),
    (i.hide = function () {
      (t.visible = !1), (s = !1);
    }),
    (i.r = 1 + Math.floor(4 * Math.random())),
    (i.init = function () {
      (t = new resultUI()),
        (i.msk = new Laya.Sprite()),
        (i.msk.x = 92),
        (i.msk.y = 92),
        (t.pointCircle.mask = i.msk),
        (i.msk2 = new Laya.Sprite()),
        (i.msk2.x = 92),
        (i.msk2.y = 92),
        (t.addPointCircle.mask = i.msk2),
        Laya.stage.addChild(t),
        (t.visible = !1);
      new Laya.Image("res/share/invite.jpg");
      t.share.on("click", null, function () {
        Share.getResultImg(function (a) {
          platform.shareResult(
            a,
            {
              type: "share",
              type2: !0 === Map1.result ? "win" : i.r,
            },
            function () {
              platform.logEvent(
                "share" + i.shareVersion + (!0 === Map1.result ? "win" : i.r)
              );
            }
          );
        });
      }),
        t.continue.on("click", null, function () {
          (l += 1) >= 1 &&
            Game.adPlayCounter > 30 &&
            platform.playAD2(function () {
              (l = 0), (Game.adPlayCounter = 0);
            }),
            1 !== Map1.rank &&
              (Laya.timer.clear(null, Map1.update),
              Laya.timer.clear(null, Monster.update)),
            i.hide(),
            Map1.end(),
            !0 === i.newLevel ? LevelUp.show() : UI.show();

          //gdsdk
          if (typeof gdsdk !== "undefined" && gdsdk.showAd !== "undefined") {
            sdk.showBanner();
          }
        }),
        t.c1.on("click", null, function () {
          e(0);
        }),
        t.c2.on("click", null, function () {
          e(1);
        }),
        t.c3.on("click", null, function () {
          e(2);
        });

      /*禁止share按钮*/
      t.share.visible = false;
      /*调整continue按钮位置*/
      t.continue.x = t.width / 2;
    }),
    i
  );
})();
