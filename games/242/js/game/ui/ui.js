var UI = (function () {
  function a() {
    (r.jb.scaleX += r.jb.scaleSpeed),
      r.jb.scaleX >= 1.05 && ((r.jb.scaleX = 1.05), (r.jb.scaleSpeed *= -1)),
      r.jb.scaleX <= 0.95 && ((r.jb.scaleX = 0.95), (r.jb.scaleSpeed *= -1)),
      (r.jb.scaleY = r.jb.scaleX),
      ShowTail.update(0, 90, Scene.mapLayer),
      r.start.scaleX <= 1.04
        ? ((r.start.scaleX += 7e-4), (r.start.scaleY = r.start.scaleX))
        : ((r.start.scaleX = 1), (r.start.scaleY = 1)),
      Map1.mainCar.anim.scaleX <= 0.805 + 0.04 * Math.random()
        ? ((Map1.mainCar.anim.scaleX += 0.003 * Math.random()),
          (Map1.mainCar.anim.scaleY = Map1.mainCar.anim.scaleX))
        : ((Map1.mainCar.anim.scaleX = 0.8),
          (Map1.mainCar.anim.scaleY = Map1.mainCar.anim.scaleX)),
      r.shareWord.x > -676 ? (r.shareWord.x -= 1.7) : (r.shareWord.x = 176);
  }

  function e() {}

  function n() {
    0 === User.car ? (User.car = User.cars.length - 1) : (User.car -= 1), t();
  }

  function i() {
    User.car === User.cars.length - 1 ? (User.car = 0) : (User.car += 1), t();
  }

  function t() {
    var a = User.cars[User.car];
    Car.setSkin(Map1.mainCar, a.id);
  }

  function l() {
    platform.getRank2(function (a) {
      var e = [];
      (s.friendList = []), (s.clickList = []);
      for (u = 0; u < a.length; u++) {
        var n = {},
          i = a[u].getRank(),
          t = JSON.parse(a[u].getExtraData());
        if (
          ((n.rank = {
            text: i,
          }),
          (n.bg =
            i % 2 == 0
              ? {
                  skin: "ui/b_plan2.png",
                }
              : {
                  skin: "ui/b_plan3.png",
                }),
          (n.name = {
            text: a[u].getPlayer().getName().slice(0, 12),
          }),
          (n.photo = {
            skin: a[u].getPlayer().getPhoto(),
          }),
          (n.rank1 = {
            skin: "ui/b_icon_rank" + t.rank1 + ".png",
          }),
          (n.rank2 = {
            text: k[t.rank1 + 1] + ":" + t.rank2,
          }),
          t.car)
        ) {
          var l = getData("cars", t.car.id);
          n.car = {
            skin: "cars/" + l.skin + ".png",
          };
        }
        for (var o = t.stars, c = 0; c < 5; c++)
          n["item" + c] =
            c < o
              ? {
                  visible: !0,
                }
              : {
                  visible: !1,
                };
        (n.playBtn = {
          visible: !0,
        }),
          (n.share = {
            visible: !1,
          }),
          (n.playText = {
            visible: !1,
          }),
          (n.playHeart = {
            visible: !1,
          }),
          (n.addHeart = {
            visible: !1,
          });
        var g = a[u].getPlayer().getID();
        (s.friendList[u] = g),
          s.clickList.push(g),
          g === User.id
            ? (n.share.visible = !0)
            : ((n.playText.visible = !0), (n.playText.x = 588)),
          e.push(n);
      }
      for (var p = 1, u = 0; u < User.historyFriends.length; u++) {
        var b = User.historyFriends[u];
        if (-1 === s.friendList.indexOf(b.id)) {
          n = {};
          s.clickList.push(b.id);
          i = a.length + p;
          (p += 1),
            (n.rank = {
              text: i,
            }),
            (n.bg =
              i % 2 == 0
                ? {
                    skin: "ui/b_plan2.png",
                  }
                : {
                    skin: "ui/b_plan3.png",
                  }),
            (n.name = {
              text: b.name.slice(0, 12),
            }),
            (n.photo = {
              skin: b.photo,
            }),
            (n.rank1 = {
              skin: "ui/b_icon_rank-1.png",
            }),
            (n.rank2 = {
              text: k[0] + ":1",
            });
          for (var o = 1, c = 0; c < 5; c++)
            n["item" + c] =
              c < o
                ? {
                    visible: !0,
                  }
                : {
                    visible: !1,
                  };
          (n.playBtn = {
            visible: !0,
          }),
            (n.share = {
              visible: !1,
            }),
            (n.playText = {
              visible: !0,
              x: 588,
            }),
            (n.playHeart = {
              visible: !1,
            }),
            (n.addHeart = {
              visible: !1,
            }),
            e.push(n);
        }
      }
      if (e.length < 5) {
        e.length;
        for (u = e.length; u < 5; u++) {
          ((n = {}).bg =
            (u + 1) % 2 == 0
              ? {
                  skin: "ui/b_plan2.png",
                }
              : {
                  skin: "ui/b_plan3.png",
                }),
            e.push(n);
        }
      }
      r.localList.dataSource = e;
    });
  }
  var r,
    s = {};
  s.friendList = [];
  var o = [],
    c = !1;
  (s.updateSeasonTime = e),
    (s.show = function (n) {
      (r.visible = !0),
        (r.start.scaleX = 1),
        (r.start.scaleY = 1),
        (r.logo.y = -100),
        (r.logo.scaleX = 1.2),
        (r.logo.scaleY = 1.2),
        (r.yourPhoto.skin = User.photo),
        (r.yourCar.skin = Map1.mainCar.body.skin),
        Laya.Tween.from(
          r.rankBox,
          {
            x: -640,
          },
          300,
          Laya.Ease.backInOut
        ),
        Laya.timer.once(300, null, function () {
          Laya.Tween.to(
            r.logo,
            {
              y: 156,
              scaleX: 1,
              scaleY: 1,
            },
            500,
            Laya.Ease.backInOut
          );
        }),
        (c = !0),
        Laya.timer.frameLoop(1, null, a),
        s.syncRank(),
        Rank.syncScore(),
        platform.getRank(function (a) {
          for (var e = [], n = 2; n < a.length; n++) {
            var i = {},
              t = a[n].getRank() - 2,
              l = JSON.parse(a[n].getExtraData());
            if (
              ((i.rank = {
                text: t,
              }),
              (i.sign = {
                visible: !1,
              }),
              t <= 3 &&
                (i.sign = {
                  skin: "ui/b_pic_r" + t + ".png",
                  visible: !0,
                }),
              (i.bg =
                t % 2 == 0
                  ? {
                      skin: "ui/b_plan2.png",
                    }
                  : {
                      skin: "ui/b_plan3.png",
                    }),
              (i.name = {
                text: a[n].getPlayer().getName().slice(0, 12),
              }),
              (i.photo = {
                skin: a[n].getPlayer().getPhoto(),
              }),
              (i.rank1 = {
                skin: "ui/b_icon_rank" + l.rank1 + ".png",
              }),
              (i.rank2 = {
                text: k[l.rank1 + 1] + ":" + l.rank2,
              }),
              l.car)
            ) {
              var s = getData("cars", l.car.id);
              i.car = {
                skin: "cars/" + s.skin + ".png",
              };
            }
            for (var o = l.stars, c = 0; c < 5; c++)
              i["item" + c] =
                c < o
                  ? {
                      visible: !0,
                    }
                  : {
                      visible: !1,
                    };
            e.push(i);
          }
          r.globalList.dataSource = e;
        }),
        l(),
        (r.yourScore.getChildByName("rank").text =
          -1 === s.globalRank ? "99999" : s.globalRank),
        Laya.timer.loop(300, null, e);
    }),
    (s.syncRank = function () {
      (r.start.getChildByName("rank").skin = Rank.getRank1Image()),
        (r.start.getChildByName("text").text = Rank.getRank2Text()),
        (r.yourScore.getChildByName("rankrank").skin = Rank.getRank1Image()),
        (r.yourScore.getChildByName("text").text = Rank.getRank2Text());
      for (
        var a = Rank.getTotalStars(),
          e = 83 - 13 * a,
          n = 83 - 13 * a + 384,
          i = 0;
        i < 5;
        i++
      ) {
        var t = r.start.getChildByName("item" + i),
          l = r.yourScore.getChildByName("item" + i);
        i < a
          ? (i < User.stars
              ? ((t.skin = "ui/hd_pic_x1.png"), (l.skin = t.skin))
              : ((t.skin = "ui/hd_pic_x2.png"), (l.skin = t.skin)),
            (t.visible = !0),
            (l.visible = !0),
            (t.x = e + 26 * i),
            (l.x = n + 26 * i))
          : ((t.visible = !1), (l.visible = !1));
      }
    }),
    (s.hide = function (n) {
      Laya.timer.clear(null, a),
        Laya.timer.clear(null, e),
        (r.visible = !1),
        (c = !1);
    });
  (s.syncCar = t), (s.globalRank = -1), (s.localRank = 11);
  var k = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER"];
  return (
    (s.syncLocalList = l),
    (s.syncGlobalRank = function (a) {
      var e = s.globalRank;
      (s.globalRank = a.getRank()),
        -1 === e || e <= s.globalRank
          ? (r.yourScore.getChildByName("rankCp").visible = !1)
          : ((r.yourScore.getChildByName("rankCp").visible = !0),
            (r.yourScore.getChildByName("rankCp").text = e - s.globalRank)),
        (User.bestRank = a.getRank());
      JSON.parse(a.getExtraData());
      (r.yourScore.getChildByName("name").text = a
        .getPlayer()
        .getName()
        .slice(0, 12)),
        (r.yourScore.getChildByName("photo").skin = a.getPlayer().getPhoto()),
        (r.yourScore.getChildByName("rank").text =
          -1 === s.globalRank ? "99999" : s.globalRank),
        l();
    }),
    (s.syncFriendRank = function (a) {}),
    (s.init = function () {
      function a() {
        "ui/b_tap2.png" === r.local.skin &&
          (platform.logEvent("clickFriend"),
          (r.local.skin = "ui/b_tap1.png"),
          (r.global.skin = "ui/b_tap2.png"),
          (r.localList.visible = !0),
          (r.globalList.visible = !1),
          (r.yourScore.visible = !1),
          (r.share.visible = !0));
      }
      if (
        ((r = new gameUI()),
        (Game.ui = r),
        r.on("added", null, function () {
          s.show();
        }),
        Laya.stage.addChild(r),
        r.start.on("click", null, function () {
          World.start();

          //gdsdk
          if (typeof gdsdk !== "undefined" && gdsdk.showAd !== "undefined") {
            sdk.showBanner();
          }
        }),
        Game2.init(),
        Result.init(),
        Reward.init(),
        LevelUp.init(),
        WatchAd.init(),
        r.share.on("click", null, function () {
          platform.logEvent("clickInvite"), platform.share();
        }),
        (r.localList.vScrollBarSkin = ""),
        (r.globalList.vScrollBarSkin = ""),
        r.local.on("click", null, a),
        a(),
        r.global.on("click", null, function () {
          "ui/b_tap2.png" === r.global.skin &&
            (platform.logEvent("clickGlobal"),
            (r.global.skin = "ui/b_tap1.png"),
            (r.local.skin = "ui/b_tap2.png"),
            (r.localList.visible = !1),
            (r.globalList.visible = !0),
            (r.share.visible = !1),
            (r.yourScore.visible = !0),
            (r.yourScore.getChildByName("rank").text =
              -1 === s.globalRank ? "99999" : s.globalRank));
        }),
        t(),
        r.bodyLeft.on("click", null, n),
        r.bodyRight.on("click", null, i),
        Shop.init(),
        r.shop.on("click", null, function () {
          platform.logEvent("clickShop"), s.hide(), Shop.show();

          //gdsdk
          if (typeof gdsdk !== "undefined" && gdsdk.showAd !== "undefined") {
            sdk.showBanner();
          }
        }),
        r.shareRank.on("click", null, function () {
          Share.getRankImg(function (a) {
            platform.shareResult(
              a,
              {
                type: "share",
                type2: "rank",
              },
              function () {
                platform.logEvent("shareRank");
              }
            );
          });
        }),
        (UIConfig.popupBgAlpha = 0.9),
        User.rank1 < 2)
      ) {
        var e = new tutoUI();
        (e.popupEffect = null),
          (e.closeEffect = null),
          e.on("click", null, function () {
            platform.logEvent("clickTuto"), e.close();
          }),
          r.tuto.on("click", null, function () {
            e.popup();
          });
      } else r.tuto.visible = !1;
      Season.init(),
        Dynamic.btnEffect(r.shop),
        Dynamic.btnEffect(r.bodyLeft),
        Dynamic.btnEffect(r.bodyRight),
        (Game.inited = !0),
        r.localList.on(Laya.Event.RENDER, null, function (a, e) {
          !0 !== o[e] &&
            (a.getChildByName("playBtn").on("click", null, function () {
              !(function (a) {
                var e = s.clickList[a];
                e === User.id
                  ? Share.getRankImg(function (a) {
                      platform.shareResult(
                        a,
                        {
                          type: "share",
                          type2: "rank",
                        },
                        function () {
                          platform.logEvent("shareRank");
                        }
                      );
                    })
                  : -1 !== User.shared.indexOf(e) || null === Game.time
                  ? platform.invite(e)
                  : -1 === s.friendList.indexOf(e)
                  ? platform.invite(e, function () {
                      User.shared.push(e), User.getHeart(2), s.syncLocalList();
                    })
                  : platform.invite(e, function () {
                      User.shared.push(e), User.getHeart(1), s.syncLocalList();
                    });
              })(e);
            }),
            (o[e] = !0));
        }),
        (r.jb.scaleSpeed = 0.005),
        r.jb.on("click", null, function () {
          platform.logEvent("JBClick"), platform.switchGame(0);
        }),
        Laya.Browser.onIOS && (r.jb.visible = !1);

      /*禁止Rank区域*/
      r.rankBox.visible = false;
      r.share.visible = false;
      r.jb.visible = false;
    }),
    s
  );
})();
