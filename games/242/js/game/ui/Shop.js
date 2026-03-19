var Shop = function() {
    function i() {
        o.checkTime()
    }

    function e() {
        for (var i = 0; i < c.length; i++)
            for (var e = c[i], a = 0; a < e.length; a++)
                if (User.cars[User.car].id === e[a]) {
                    if (i === u) {
                        var t = l.carList.getCell(a);
                        if (void 0 === t) continue;
                        var s = t.getChildByName("car");
                        s.scaleX <= .905 + .04 * Math.random() ? (s.scaleX += .003 * Math.random(), s.scaleY = s.scaleX) : (s.scaleX = .9, s.scaleY = s.scaleX), ShowTail.update(94, 40, l.carList.getCell(a).getChildByName("bg"))
                    }
                    break
                }
    }

    function a(i) {
        for (var e = -1, a = User.cars[User.car].id, s = 0; s < c[u].length; s++) c[u][s] === a && (e = s);
        if (-1 !== e) {
            var n = {
                gou: {
                    visible: !1
                }
            };
            t(n), l.carList.setItem(e, n)
        }
        l.carList.setItem(i, {
            equipBtn: {
                visible: !1
            },
            adText1: {
                visible: !1
            },
            gou: {
                visible: !0
            }
        }), o.setUserCar(c[u][i])
    }

    function t(i) {
        i.equipBtn = {
            skin: "ui/b_btn_e.png",
            visible: !0
        }, i.adText1 = {
            text: "EQUIP",
            x: 103,
            y: 227,
            visible: !0
        }
    }

    function s(i, e) {
        i.adBtn = {
            skin: "ui/b_btn_ad.png",
            visible: !0
        }, i.adIcon = {
            visible: !0
        }, i.adText1 = {
            text: "WATCH AD",
            x: 122,
            y: 218,
            visible: !0
        }, i.adText2 = {
            text: getData("cars", e).p2 + "H",
            visible: !0
        }
    }

    function r(i) {
        for (var e = c[i], a = [], n = 0; n < e.length; n++) {
            var r = e[n],
                v = getData("cars", r),
                u = {};
            console.log(v), u.car = {
                skin: "cars/" + v.skin + ".png"
            }, u.loginBg = {
                visible: !1
            }, u.loginText = {
                visible: !1
            }, u.loginIcon = {
                visible: !1
            }, u.equipBtn = {
                visible: !1
            }, u.adBtn = {
                visible: !1
            }, u.adIcon = {
                visible: !1
            }, u.adText1 = {
                visible: !1
            }, u.adText2 = {
                visible: !1
            }, u.gou = {
                visible: !1
            }, u.timeIcon = {
                visible: !1
            }, u.timeText = {
                visible: !1
            }, -1 !== o.findCar(r) ? (u.msk = {
                visible: !1
            }, User.cars[User.car].id === r ? u.gou.visible = !0 : t(u)) : (u.msk = {
                visible: !0
            }, 0 === v.p1 ? (u.loginBg = {
                visible: !0
            }, u.loginText = {
                visible: !0,
                text: "LOGIN " + v.p2 + " DAYS"
            }, u.loginIcon = {
                visible: !0
            }) : s(u, r)), a.push(u)
        }
        l.carList.dataSource = a
    }
    var l, o = {},
        c = [
            [1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
        ];
    o.taps = c;
    var v = [],
        u = 1;
    return o.findCar = function(i) {
        for (var e = 0; e < User.cars.length; e++)
            if (User.cars[e].id === i) return e;
        return -1
    }, o.setUserCar = function(i) {
        for (var e = 0; e < User.cars.length; e++) User.cars[e].id === i && (User.car = e, Car.setSkin(Map1.mainCar, i))
    }, o.checkTime = function() {
        for (var i = Game.time + Game.timePast, e = 0; e < c[u].length; e++) {
            var t = c[u][e],
                n = o.findCar(t);
            if (-1 !== n) {
                var r = User.cars[n];
                if (void 0 !== r.time)
                    if (r.time < i) {
                        if (User.cars = User.cars.slice(0, n).concat(User.cars.slice(n + 1, User.cars.length)), o.setUserCar(1), 0 === u && a(0), 1 === u) {
                            var v = {};
                            v.timeIcon = {
                                visible: !1
                            }, v.timeText = {
                                visible: !1
                            }, v.gou = {
                                visible: !1
                            }, v.msk = {
                                visible: !0
                            }, v.equipBtn = {
                                visible: !1
                            }, s(v, t), l.carList.setItem(e, v)
                        }
                    } else {
                        if (1 !== u) return;
                        var b = r.time - i,
                            d = Math.floor(b / 36e5),
                            m = Math.floor(b % 36e5 / 6e4),
                            f = Math.floor(b % 6e4 / 1e3);
                        l.carList.setItem(e, {
                            timeIcon: {
                                visible: !0
                            },
                            timeText: {
                                text: Math.floor(d / 10) + "" + d % 10 + ":" + Math.floor(m / 10) + m % 10 + ":" + Math.floor(f / 10) + f % 10,
                                visible: !0
                            }
                        })
                    }
            }
        }
    }, o.show = function() {
        r(u), Laya.timer.frameLoop(1, null, e), Laya.timer.loop(300, null, i), l.visible = !0, Map1.mainCar.anim.visible = !1
    }, o.hide = function() {
        Laya.timer.clear(null, e), Laya.timer.clear(null, i), l.visible = !1, Map1.mainCar.anim.visible = !0, UI.show()
    }, o.watchAdGetCar = function(i) {
        var e = getData("cars", i);
        User.cars.push({
            id: i,
            time: Game.time + 36e5 * e.p2
        }), a(n), o.hide(), Reward.show(i, User.loginDays)
    }, o.init = function() {
        l = new shopUI, Laya.stage.addChild(l), l.visible = !1, l.back.on("click", null, o.hide), l.carList.vScrollBarSkin = "", Shop.ui = l, Dynamic.btnEffect(l.back);
        getDataLength("cars");
        var i = [];
        l.carList.on(Laya.Event.RENDER, null, function(e, t) {
            void 0 === i[t] && (i[t] = !0, e.getChildByName("equipBtn").on("click", null, function() {
                a(t)
            }), e.getChildByName("adBtn").on("click", null, function() {
                null !== Game.time && (!0 === Laya.Browser.onAndroid || !0 === Laya.Browser.onIOS ? platform.playAD(0, function() {
                    var i = c[u][t],
                        e = getData("cars", i);
                    User.cars.push({
                        id: i,
                        time: Game.time + 36e5 * e.p2
                    }), l.carList.setItem(t, {
                        adBtn: {
                            visible: !1
                        },
                        adText1: {
                            visible: !1
                        },
                        adText2: {
                            visible: !1
                        },
                        msk: {
                            visible: !1
                        },
                        adIcon: {
                            visible: !1
                        }
                    }), a(t), o.hide(), Reward.show(i, User.loginDays)
                }) : Game.adPlayCounter > 30 && platform.playAD2(function() {
                    Game.adPlayCounter = 0;
                    var i = c[u][t],
                        e = getData("cars", i);
                    User.cars.push({
                        id: i,
                        time: Game.time + 36e5 * e.p2
                    }), l.carList.setItem(t, {
                        adBtn: {
                            visible: !1
                        },
                        adText1: {
                            visible: !1
                        },
                        adText2: {
                            visible: !1
                        },
                        msk: {
                            visible: !1
                        },
                        adIcon: {
                            visible: !1
                        }
                    }), a(t), o.hide(), Reward.show(i, User.loginDays)
                }))
            }))
        }), v.push(l.tap1), v.push(l.tap2), l.tap1.on(Laya.Event.CLICK, null, function() {
            l.tap1.skin = "ui/b_tap3.png", l.tap2.skin = "ui/b_tap4.png", r(u = 0)
        }), l.tap2.on(Laya.Event.CLICK, null, function() {
            l.tap2.skin = "ui/b_tap3.png", l.tap1.skin = "ui/b_tap4.png", r(u = 1)
        });

        /*禁止Watch AD按钮*/
        //l.tap2.visible = false;
        r(u = 0);
    }, o
}();