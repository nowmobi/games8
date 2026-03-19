! function() {
    "use strict";
    class t {
        constructor() {
            this.AI_count = 5, this.AI_Array = [], this.plane_array = []
        }
        static Instance() {
            return null == this._instance && (this._instance = new t), this._instance
        }
        SetScene(t) {
            this.sceneMian = t
        }
        GetCamera() {
            return this.camera = this.sceneMian.getChildByName("Main Camera"), this.camera
        }
        GetPlayer() {
            return this.player = this.sceneMian.getChildByName("player"), this.player
        }
        GetLine() {
            return this.line = this.sceneMian.getChildByName("line"), this.line
        }
        GetAI_Array() {
            for (let t = 0; t < this.AI_count; t++) this.AI_Array[t] = this.sceneMian.getChildByName("AI_array").getChildByName("AI" + String(t));
            return this.AI_Array
        }
        GetPlaneArray() {
            var t = this.sceneMian.getChildByName("scenes");
            for (let e = 0; e < t.numChildren; e++) this.plane_array[e] = t.getChildAt(e);
            return this.plane_array
        }
        GetSkinStoreModel() {
            return this.skinStoreModel = this.sceneMian.getChildByName("skinModel"), this.skinStoreModel
        }
    }
    var e, i;
    t._instance = null,
        function(t) {
            t[t.OutPlaying = 0] = "OutPlaying", t[t.Playing = 1] = "Playing", t[t.Pause = 2] = "Pause", t[t.Teaching = 3] = "Teaching"
        }(e || (e = {})),
        function(t) {
            t[t.Idel = 0] = "Idel", t[t.Jump = 1] = "Jump", t[t.Ground = 2] = "Ground", t[t.Fail = 3] = "Fail", t[t.Win = 4] = "Win"
        }(i || (i = {}));
    class a {
        constructor() {
            this.gameState = e.OutPlaying, this.playerState = i.Idel, this.isLineCross = !1
        }
        static Instance() {
            return null == this._instance && (this._instance = new a), this._instance
        }
    }
    a._instance = null;
    class s {
        constructor() {
            this.score_num = 0, this.level = 0, this.relifeCount = 0, this.coin_count = 0, this.win_count = 0, this.key_count = 0, this.rankTexts = [new Laya.Texture2D], this.expressionTexts = [], this.CtrlArray = [], this.RandomSortCtrlArray = [], this._ctrlIndexArray = [], this.AllHeadindex = [], this.AllNameindex = [], this.this_time_nameindex = [], this.this_time_headindex = [], this.listindex = [], this.randlistindex = [], this.initPosParentArray = [], this.initPosBodyArray = [], this.nameArray = ["凄美如画", "茕茕孑立", "剑舞琴扬", "天涯为客", "静候缘来", "芳心纵火犯", "无敌是多么~", "慕雪剑心", "慕血十三", "小天使", "泡泡龙", "tina", "for_love", "花菲", "可儿", "非想", "开元", "杰克", "大朋友", "大棒", "灵兰若梦", "锦瑟幽心", "冰城", "文远", "阿红", "都是辣鸡", "蛰伏", "柯", "天涯", "森舟", "似曾相识", "可可妈", "醉红尘", "莲波仙子", "bibe", "小棉", "金色", "袭夜风", "一颗海藻", "wei", "HGC、", "车♀神", "站在风口的猪", "吥丶可能", "额滴个神", "窈窕", "梦入晚花", "雨", "落樱纷飞", "马猴烧酒", "向阳花", "白衣少年", "幸运烟雨", "斗宗强者", "三师公", "步步为赢", "苍了微凉", "枫林晚", "卡哇伊", "乘风破~", "欧豆豆", "史迪仔", "此夜此月", "干净月光", "给我盘ta", "古道西风", "十里桃花", "G.I钟", "归去看刀光", "黑凤梨~", "尽揽风月", "格桑花", "闰土与猹", "蓝涩雨蝶", "佛剑分说", "两小无猜", "开小号的渣", "我是雨师..", "破~伤风", "卧龙跃马", "一场惊鸿", "biu,爽", "杂修", "剑指天涯", "时辰的错"], this.colorArray = [new Laya.Vector4(243 / 255, 31 / 255, 31 / 255, 1), new Laya.Vector4(111 / 255, 104 / 255, 104 / 255, 1), new Laya.Vector4(45 / 255, 122 / 255 / 212 / 255, 1), new Laya.Vector4(61 / 255, 219 / 255, 33 / 255, 1), new Laya.Vector4(20 / 255, 20 / 255, 20 / 255, 1), new Laya.Vector4(239 / 255, 98 / 255, 144 / 255, 1), new Laya.Vector4(243 / 255, 227 / 255, 20 / 255, 1), new Laya.Vector4(143 / 255, 55 / 255, 191 / 255, 1)], this.hat_index = 0, this.color_index = 0
        }
        static Instance() {
            return null == this._instance && (this._instance = new s), this._instance
        }
        InitExpressionTextures() {
            for (let t = 0; t < 9; t++) Laya.Texture2D.load("subPackage/sub2/Tex/e_" + t + ".png", Laya.Handler.create(this, function(e) {
                this.expressionTexts[t] = e
            }))
        }
        loadPlayerInitPosAndRank() {
            this._ctrlIndexArray = [], this.RandomSortCtrlArray = [];
            for (let e = 0; e < t.Instance().AI_count + 1; e++) this._ctrlIndexArray.push(e);
            for (let e = 0; e < t.Instance().AI_count + 1; e++) {
                let t = Math.floor(Math.random() * this._ctrlIndexArray.length);
                this.RandomSortCtrlArray.push(this.CtrlArray[this._ctrlIndexArray.splice(t, 1)[0]])
            }
            for (let t = 0, e = 0; t < this.RandomSortCtrlArray.length; t++) "player" != this.RandomSortCtrlArray[t].name && (this.RandomSortCtrlArray[t].SetInitPos(this.initPosParentArray[e], this.initPosBodyArray[e]), e++)
        }
        loadPeopleName(t) {
            this.AllNameindex.splice(0, this.AllNameindex.length), this.this_time_nameindex.splice(0, this.this_time_nameindex.length);
            for (let t = 0; t < 81; t++) this.AllNameindex.push(t);
            for (let e = 0; e < t; e++) {
                let t = Math.floor(Math.random() * this.AllNameindex.length);
                this.this_time_nameindex.push(this.AllNameindex.splice(t, 1)[0])
            }
            return this.this_time_nameindex
        }
        loadPeopleHead(t) {
            this.AllHeadindex.splice(0, this.AllHeadindex.length), this.this_time_headindex.splice(0, this.this_time_headindex.length);
            for (var e = 0; e < 40; e++) this.AllHeadindex.push(e);
            for (e = 0; e < t; e++) {
                var i = Math.floor(Math.random() * this.AllHeadindex.length);
                this.this_time_headindex.push(this.AllHeadindex.splice(i, 1)[0])
            }
            return this.this_time_headindex
        }
        loadPeopleIndex(t) {
            this.listindex.splice(0, this.listindex.length), this.randlistindex.splice(0, this.randlistindex.length);
            for (var e = 1; e < t + 1; e++) this.listindex.push(e);
            for (e = 0; e < t; e++) {
                var i = Math.floor(Math.random() * this.listindex.length);
                this.randlistindex.push(this.listindex.splice(i, 1)[0])
            }
            return this.randlistindex
        }
        UpdataRank() {
            var t = this.ArraySort(this.RandomSortCtrlArray);
            for (let e = 0; e < t.length; e++) t[e].rank = e + 1;
            return t
        }
        ArraySort(t) {
            var e = [];
            e = t;
            for (var i = 0; i < e.length - 1; i++)
                for (var a = 0; a < e.length - 1 - i; a++)
                    if (e[a].roadIndex < e[a + 1].roadIndex) {
                        var s = e[a + 1];
                        e[a + 1] = e[a], e[a] = s
                    }
            return e
        }
    }
    s._instance = null;
    class n extends Laya.Script3D {
        constructor() {
            super(), this._exp_timer = new Laya.Timer, this._hatArray = [], this.jump_a = 0, this.jump_speed = 0, this.speed_y = 0, this.isJump = !1, this.jumpVec = new Laya.Vector3(0, 0, 0), this.jump_count = 0, this.isTaunt = !1
        }
        onAwake() {
            this.AI = this.owner, this._man = this.AI.getChildByName("man"), this.vir_man = this._man.getChildByName("Virtual_Man_0"), this._expression = this._man.getChildByName("Expression"), this._exp_mat = this._expression.meshRenderer.material, this._man_mat = this.vir_man._render.material, this._hats = this._man.getChildByName("QuickRigCharacter_Reference").getChildByName("QuickRigCharacter_Hips").getChildByName("QuickRigCharacter_Spine").getChildByName("QuickRigCharacter_Spine1").getChildByName("QuickRigCharacter_Spine2").getChildByName("QuickRigCharacter_Neck").getChildByName("QuickRigCharacter_Head").getChildByName("hats");
            for (let t = 0; t < this._hats.numChildren; t++) {
                let e = this._hats.getChildAt(t);
                e.active = !1, this._hatArray.push(e)
            }
            this._aiAnimator = this._man.getComponent(Laya.Animator), this._animatorLayer = this._aiAnimator.getControllerLayer()
        }
        onStart() {
            this.vir_man.skinnedMeshRenderer.castShadow = !0, this.ReSet()
        }
        onUpdate() {
            Laya.timer.delta > 100 || a.Instance().gameState != e.Playing && this.AI_state != i.Jump || this.isJump && (this.speed_y -= this.jump_a, this.jumpVec.setValue(0, this.speed_y, 0), this.AI.transform.translate(this.jumpVec), this.AI.transform.position.y < .218 && (this.AI.transform.position.y = .218, this.isJump = !1, this.ChangeAIExpression(1), this.PlayAnima("idel"), this.jump_count++, this.AI_state = i.Ground))
        }
        AI_Jump() {
            this.AI_state != i.Ground && this.AI_state != i.Idel || this.isFall || Laya.timer.once(100 * Math.random(), this, () => {
                this.CalculateRandom() && (this.isJump = !0, this.PlayAnima("jump"), this.AI_state = i.Jump, this.speed_y = this.jump_speed)
            })
        }
        CalculateRandom() {
            var t = Math.random();
            if (s.Instance().level < 6) var e = 4 + Math.floor(3 * Math.random()),
                i = 8 + Math.floor(3 * Math.random());
            else s.Instance().level >= 6 && s.Instance().level < 12 ? (e = 6 + Math.floor(3 * Math.random()), i = 12 + Math.floor(3 * Math.random())) : (e = 9 + Math.floor(3 * Math.random()), i = 16 + Math.floor(3 * Math.random()));
            return this.jump_count < e ? t > .1 : this.jump_count >= 1 && this.jump_count < i ? t > .3 : t > .6
        }
        PlayAnima(t) {
            switch (t) {
                case "idel":
                    "idel" != this._animatorLayer._currentPlayState.name && (this._aiAnimator.speed = 1, this._aiAnimator.play("idel"));
                    break;
                case "jump":
                    "jump" != this._animatorLayer._currentPlayState.name && (this._aiAnimator.speed = 1.6, this._aiAnimator.play("jump"));
                    break;
                case "fall":
                    "fall" != this._animatorLayer._currentPlayState.name && (this._aiAnimator.speed = 1.4, this._aiAnimator.play("fall"))
            }
        }
        ChangeModelColor(t) {
            t >= s.Instance().colorArray.length || (this._man_mat.albedoColor = s.Instance().colorArray[t])
        }
        ChangeHatModel(t) {
            var e = Math.random();
            if (!(t >= this._hatArray.length)) {
                for (let t = 0; t < this._hatArray.length; t++) this._hatArray[t].active = !1;
                0 != t && e > .4 && (this._hatArray[t - 1].active = !0)
            }
        }
        AIFail() {
            this.isFall && (this.isFall = !1, this.AI_state = i.Fail, this.ChangeAIExpression(3))
        }
        ChangeAIExpression(t) {
            if (!(Math.random() > .35)) {
                var e = Math.random();
                if (1 == t) {
                    if (Math.random() > .5) return;
                    if (this.isTaunt) return;
                    this._exp_timer.clearAll(this), this._exp_mat.albedoTexture = e < .33 ? s.Instance().expressionTexts[0] : e >= .33 && e < .66 ? s.Instance().expressionTexts[1] : s.Instance().expressionTexts[2]
                } else if (2 == t) {
                    if (this.isTaunt) return;
                    if (this.AI_state != i.Ground) return;
                    this.isTaunt = !0, this._exp_timer.clearAll(this), this._exp_mat.albedoTexture = e < .33 ? s.Instance().expressionTexts[3] : e >= .33 && e < .66 ? s.Instance().expressionTexts[4] : s.Instance().expressionTexts[5]
                } else {
                    if (3 != t) return;
                    this._exp_timer.clearAll(this), this._exp_mat.albedoTexture = e < .33 ? s.Instance().expressionTexts[6] : e >= .33 && e < .66 ? s.Instance().expressionTexts[7] : s.Instance().expressionTexts[8]
                }
                this._expression.active = !0, this._exp_timer.once(1e3, this, () => {
                    this._expression.active = !1, this.isTaunt && (this.isTaunt = !1)
                })
            }
        }
        ReSet() {
            this._expression.active = !1, this.jump_count = 0, this.jump_speed = .09, this.speed_y = 0, this.jump_a = .005, this.AI.transform.position.y = .218, this.isJump = !1, this.jumpVec.setValue(0, 0, 0), this.isFall = !1, this.AI_state = i.Idel, this.AI.active = !1, this.PlayAnima("idel");
            var t = Math.floor(Math.random() * this._hatArray.length),
                e = Math.floor(Math.random() * s.Instance().colorArray.length);
            this.ChangeHatModel(t), this.ChangeModelColor(e)
        }
    }
    class o extends Laya.Script3D {
        constructor() {
            super(), this.cameraPos = new Laya.Vector3(0, 0, 0), this.cameraEuler = new Laya.Vector3(0, 0, 0), o.instance = this
        }
        onAwake() {
            this.camera = this.owner, this.mainPoint = T.Instance().scene_main.getChildByName("mainPoint"), this.startPoint = T.Instance().scene_main.getChildByName("startPoint"), this.skinPoint = T.Instance().scene_main.getChildByName("skinPoint"), this.skyMat = T.Instance().scene_main.skyRenderer.material
        }
        onStart() {}
        onUpdate() {
            Laya.timer.delta > 100 || (this.skyMat.rotation += Laya.timer.delta / 1e3 * 1)
        }
        StartGame() {
            this.cameraEuler.setValue(-20, -163, 1.8), this.cameraPos.setValue(this.startPoint.transform.position.x, this.startPoint.transform.position.y, this.startPoint.transform.position.z - .1), this.camera.transform.position = this.cameraPos, this.camera.transform.rotationEuler = this.cameraEuler
        }
        SkinStore() {
            console.log(this.skinPoint, "skinPoint"), this.cameraEuler.setValue(-16.62, 180, 0), this.cameraPos.setValue(this.skinPoint.transform.position.x, this.skinPoint.transform.position.y, this.skinPoint.transform.position.z), this.camera.transform.rotationEuler = this.cameraEuler, this.camera.transform.position = this.cameraPos, console.log(this.camera.transform.rotationEuler, "++!!!euler"), console.log(this.camera.transform.position, "++!!!position")
        }
        ReSet() {
            this.cameraPos.setValue(this.mainPoint.transform.position.x, this.mainPoint.transform.position.y, this.mainPoint.transform.position.z), this.cameraEuler.setValue(0, 180, 0), this.camera.transform.position = this.cameraPos, this.camera.transform.rotationEuler = this.cameraEuler
        }
    }
    o.instance = null;
    class r extends Laya.Script {
        constructor() {
            super(), this._headlistArr = [], this._playerNameArr = [], this._playerNameArr2 = [], this._playerIndexArr = [], this._playerHeadArr = [], this._playerHeadArr2 = [], r.instance = this
        }
        onAwake() {
            this.loadPlayerUI = this.owner, this._uiBox = this.loadPlayerUI.getChildAt(0), this._loadPlayerBg = this._uiBox.getChildByName("loadPlayerBg"), this._playerList = this._loadPlayerBg.getChildByName("headList"), this._uiBox.removeSelf()
        }
        onStart() {
            this.loadPlayerUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth
        }
        ShowLoadPlayerUI(t) {
            this.loadPlayerUI.visible || (this.loadPlayerUI.visible = !0, this.loadPlayerUI.addChild(this._uiBox), this.GetPlayerInfo(t))
        }
        GetPlayerInfo(t) {
            this._playerNameArr.splice(0, this._playerNameArr.length), this._playerHeadArr.splice(0, this._playerHeadArr.length), this._playerIndexArr.splice(0, this._playerIndexArr.length), this._playerNameArr = s.Instance().loadPeopleName(t), this._playerHeadArr = s.Instance().loadPeopleHead(t);
            for (let t = 0; t < this._playerHeadArr.length; t++) this._playerHeadArr2[t] = this._playerHeadArr[t];
            for (let t = 0; t < this._playerNameArr.length; t++) this._playerNameArr2[t] = this._playerNameArr[t];
            this._playerIndexArr = s.Instance().loadPeopleIndex(t), this.InitList(t)
        }
        InitList(t) {
            this._headlistArr = [], this._headlistArr.push({
                head: {
                    skin: localStorage.getItem("userhead")
                }
            });
            for (let e = 0; e < t; e++) this._headlistArr.push({
                head: {
                    skin: "LoadPlayerUI/HeadLoading.png"
                }
            });
            this._playerList.vScrollBarSkin = "", this._playerList.selectEnable = !0, this._playerList.dataSource = this._headlistArr, this._playerList.dataSource[0].head.skin = localStorage.getItem("userhead"), Laya.timer.loop(250 * Math.random() + 60, this, this.loadhead)
        }
        loadhead() {
            this._playerIndexArr.length > 0 ? (this._headlistArr[this._playerIndexArr.splice(0, 1)[0]].head.skin = "HeadUI/" + this._playerHeadArr.splice(0, 1)[0] + ".png", this._playerList.array = this._headlistArr) : (Laya.timer.clear(this, this.loadhead), Laya.timer.frameOnce(50, this, () => {
                this.loadPlayerUI.visible = !1, this._uiBox.removeSelf(), T.Instance().ShowAI(), U.instance.ShowGameInfoUI(s.Instance().player_count), a.Instance().playerState = i.Ground, o.instance.StartGame(), T.Instance().SetStartScene()
            }))
        }
    }
    r.instance = null;
    class h extends Laya.Script {
        constructor() {
            super(), h.instance = this
        }
        onAwake() {
            this.teachUI = this.owner, this.uiBox = this.teachUI.getChildAt(0), this.word = this.uiBox.getChildByName("word"), this.good = this.uiBox.getChildByName("good")
        }
        onStart() {
            this.uiBox.removeSelf();
            this.teachUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth
        }
        ShowTeachUI() {
            console.log("显示教程页面"), this.teachUI.visible || (this.teachUI.visible = !0, this.good.visible = !1, a.Instance().gameState = e.Teaching, this.teachUI.addChild(this.uiBox), console.log(this.teachUI.visible, "this.teachUI.visible"))
        }
        ShowGoodWord() {
            this.good.visible = !0
        }
        HideTeachUI() {
            this.teachUI.visible && (this.teachUI.visible = !1, this.uiBox.removeSelf())
        }
    }
    h.instance = null;
    class l {
        constructor() {
            this.verson = "1.6.8", this.projectName = "?JumpRope_wxb5ae2172cf43129a", this.miniGameAppids = ["wx29bb901319f9398a", "wxafcf3089831bd74b", "wx9533c59b01f4e3a7", "wx9288be0d45a14b78", "wxfe647cdc52aefa7e", "wx1c9cf5936ea7291a", "wx3c6d0ead3caa95d4", "wx6b755b2236bbc30a", "wx51018a0bf7fd177c", "wxf9dfe2f4b545f067"], this.miniAppid_FrameAni = [0, 1, 2], this.frameAni_Num = [13, 15, 7], this.frameAni_Time = [3.5 / 13, 4.01 / 15, 2 / 7], this.gameNames = ["果冻冲冲冲", "水果消消 ", "潜水艇冲刺", "滚滚破坏球", "最强瞄准", "方块翻翻乐", "削木头贼6", "汉堡达人", "果冻爆爆乐", "巴掌王", "果冻冲冲冲", "水果消消"], this.gameBoxDataVersion = "20200326_v1.6.8", this.gameData_ServerLink = this.gameBoxDataVersion + "/7cgamesBoxData.json", this.networkType = "none", this.gameCollectionData = null, this.maxIndexNum = 10, this.currIndexNum = 0, this.isFirstDown = !1, this.getNetworkType(), this.onNetworkStatusChange(), this.loadMoreGameData()
        }
        static Instance() {
            return null == this.instance && (this.instance = new l), this.instance
        }
        loadMoreGameData() {
            console.log("读取服务器数据,用于数据统计");
            var t = Laya.LocalStorage.getItem("Data_Day");
            "" == t || null == t || null == t ? (console.log("今天未读取数据，读取一次"), Laya.loader.load(this.gameData_ServerLink + this.projectName), Laya.LocalStorage.setItem("Data_Day", this.AnalysisTimeStamp())) : t != this.AnalysisTimeStamp() ? (console.log("今天未读取数据，读取一次"), Laya.loader.load(this.gameData_ServerLink + this.projectName), Laya.LocalStorage.setItem("Data_Day", this.AnalysisTimeStamp())) : console.log("今天已读取数据，无需再次读取")
        }
        getNetworkType() {
            Laya.Browser.window.wx && wx.getNetworkType && wx.getNetworkType({
                success: t => {
                    console.log("当前网络类型：", t.networkType), this.networkType = t.networkType
                }
            })
        }
        onNetworkStatusChange() {
            Laya.Browser.window.wx && wx.onNetworkStatusChange && wx.onNetworkStatusChange(t => {
                console.log("是否有网络连接：", t.isConnected), console.log("当前网络类型：", t.networkType), this.networkType = t.networkType
            })
        }
        navigateToMiniProgramByIndex(t, e = null) {
            Laya.Browser.window.wx && wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                appId: this.miniGameAppids[t % 10],
                success: () => {
                    e && e()
                },
                fail: () => {
                    e && e()
                }
            })
        }
        navigateToMiniProgramByAppid(t, e = null) {
            Laya.Browser.window.wx && wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                appId: t,
                success: () => {
                    e && e()
                },
                fail: () => {
                    e && e()
                }
            })
        }
        navigateToGameCollection() {
            Laya.Browser.window.wx && wx.navigateToMiniProgram && (wx.navigateToMiniProgram({
                appId: this.miniGameAppids[this.currIndexNum]
            }), this.currIndexNum++, this.currIndexNum %= this.maxIndexNum)
        }
        AnalysisTimeStamp() {
            var t = new Date(Laya.Browser.now()),
                e = String(t.getFullYear()),
                i = String(t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1),
                a = String(t.getDate() < 10 ? "0" + t.getDate() : t.getDate());
            return t.getHours(), t.getHours(), t.getMinutes(), t.getMinutes(), t.getSeconds(), t.getSeconds(), e + i + a
        }
    }
    l.instance = null;
    class c extends Laya.Script {
        constructor() {
            super(), c.instance = this
        }
        onAwake() {
            this.gameBoxPanel = this.owner, this.gameBoxBg = this.gameBoxPanel.getChildAt(0), this.gameBox_OCBtn = this.gameBoxBg.getChildByName("gameBox_OCBtn"), this.gameBoxList = this.gameBoxBg.getChildByName("gameBoxList"), this.versonLabel = this.gameBoxBg.getChildByName("VersonLabel")
        }
        onStart() {
            this.gameBox_OCBtn.on(Laya.Event.CLICK, this, this.gameBox_OCBtnClick), this.gameBoxList.vScrollBarSkin = "", this.gameBoxPanel.skin = "", this.gameBox_OCBtn.left = 558, this.SetBoxList();
            this.gameBoxPanel.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth
        }
        showGameBoxUI() {
            "" == this.gameBoxPanel.skin ? (this.gameBoxPanel.skin = "GameBoxUI/bg.png", this.gameBoxPanel.mouseThrough = !1, v.ShowBanner(), Laya.Tween.to(this.gameBoxBg, {
                x: 0
            }, 300, null, Laya.Handler.create(this, () => {
                this.gameBox_OCBtn.disabled = !1, this.gameBox_OCBtn.skin = "GameBoxUI/ocBtn_close.png", this.gameBox_OCBtn.left = 554
            }))) : Laya.Tween.to(this.gameBoxBg, {
                x: -this.gameBoxBg.width
            }, 300, null, Laya.Handler.create(this, () => {
                this.gameBoxPanel.skin = "", v.HideBanner(), this.gameBox_OCBtn.skin = "GameBoxUI/ocBtn_open.png", this.gameBoxPanel.mouseThrough = !0, this.gameBox_OCBtn.disabled = !1, this.gameBox_OCBtn.left = 558
            }))
        }
        SetBoxList() {
            var t = [];
            for (let e = 0; e < 12; e++) t.push({
                gameIcon: {
                    skin: "GameBoxUI/gameIcon" + String(e) + ".png"
                },
                gameName: l.Instance().gameNames[e]
            });
            this.gameBoxList.dataSource = t, this.gameBoxList.refresh()
        }
        gameBox_OCBtnClick() {
            this.showGameBoxUI(), this.gameBox_OCBtn.disabled = !0
        }
    }
    c.instance = null;
    class d extends Laya.Script {
        constructor() {
            super(), d.instance = this
        }
        onAwake() {
            this._rankUI = this.owner, this._uiBox = this._rankUI.getChildAt(0), this._listRank_bg = this._uiBox.getChildByName("rankBg"), this._backBtn = this._listRank_bg.getChildByName("backBtn"), this._shareBtn = this._listRank_bg.getChildByName("shareBtn"), this._openDataContext = this._listRank_bg.getChildAt(0), this._openDataContext.removeSelf()
        }
        onStart() {
            this._rankUI.visible = !1, this._uiBox.removeSelf(), this._backBtn.on(Laya.Event.CLICK, this, this.HideRankUI), this._shareBtn.on(Laya.Event.CLICK, this, this.ShareBtnClick);
            this._rankUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth;
            this.pos_x = this._listRank_bg.x, this.pos_top = this._listRank_bg.top
        }
        ShowRankUI() {
            this._rankUI.visible || (v.ShowBanner(), this._rankUI.visible = !0, this._rankUI.addChild(this._uiBox), this._openDataContext.removeSelf(), this._uiBox.addChild(this._openDataContext), this._openDataContext.x = this.pos_x + 68, this._openDataContext.top = this.pos_top + 218, v.PostMessage({
                cmd: "ShowRankList",
                dataName: "Kerry_Data1"
            }))
        }
        HideRankUI() {
            this._rankUI.visible && (v.HideBanner(), v.PostMessage({
                cmd: "HideRankList"
            }), Laya.timer.once(300, this, () => {
                this._rankUI.visible = !1
            }), c.instance.gameBox_OCBtn.visible = !0)
        }
        ShareBtnClick() {
            T.Instance().share_index = "", T.Instance().ShareMessage()
        }
    }
    d.instance = null;
    var g = Laya.Handler,
        m = Laya.Sprite;
    class _ extends Laya.Script {
        constructor() {
            super(), _.instance = this
        }
        onEnable() {}
        onecallfunc() {}
        allcallfunc() {}
        onDisable() {}
        creategold(t, e, i, a, s, n) {
            Laya.loader.load("UI/coin.png", g.create(this, function() {
                var o = Laya.loader.getRes("UI/coin.png"),
                    r = 0,
                    h = function() {
                        var n = new m;
                        n.graphics.drawTexture(o, 0, 0), n.zOrder = 4, n.scaleX = 1, p.instance.uiBox.addChild(n), n.pos(t.x, t.y), r == i - 1 ? this.move(t, e, n, a, s, !0) : this.move(t, e, n, a, s, !1), ++r >= i && Laya.timer.clear(this, h)
                    };
                Laya.timer.loop(n, this, h)
            }))
        }
        move(t, e, i, a, s, n) {
            var o = [],
                r = new Laya.Point(t.x, t.y),
                h = new Laya.Point(e.x, e.y),
                l = new Laya.Point((r.x + h.x) / 2 - 400 + 800 * Math.random(), (r.y + h.y) / 2 - 400 + 800 * Math.random());
            o.push(r), o.push(l), o.push(h);
            var c = this.CreateBezierPoints(o, 20),
                d = 0;
            Laya.timer.loop(10, this, function dsq() {
                d > c.length - 1 ? (a(), n && s(), i.destroy(), Laya.timer.clear(this, dsq)) : (i.pos(c[d].x, c[d].y), d++)
            })
        }
        CreateBezierPoints(t, e) {
            for (var i = [], a = 0; a < e; a++) {
                var s = this.MultiPointBezier(t, a / e);
                i.push(s)
            }
            return i
        }
        MultiPointBezier(t, e) {
            let i = t.length,
                a = 0,
                s = 0;
            for (let n = 0; n < i; n++) {
                let o = t[n];
                a += o.x * Math.pow(1 - e, i - 1 - n) * Math.pow(e, n) * this.erxiangshi(i - 1, n), s += o.y * Math.pow(1 - e, i - 1 - n) * Math.pow(e, n) * this.erxiangshi(i - 1, n)
            }
            return {
                x: a,
                y: s
            }
        }
        erxiangshi(t, e) {
            let i = 1,
                a = 1;
            for (; e > 0;) i *= t, a *= e, t--, e--;
            return i / a
        }
    }
    _.instance = null;
    class u extends Laya.Script3D {
        constructor() {
            super(), this._hat_array = [], u.instance = this
        }
        onAwake() {
            this._skin_stroe = this.owner, this._skin_stroe.active = !1, this._man = this._skin_stroe.getChildByName("model"), this._hats = this._hats = this._man.getChildByName("QuickRigCharacter_Reference").getChildByName("QuickRigCharacter_Hips").getChildByName("QuickRigCharacter_Spine").getChildByName("QuickRigCharacter_Spine1").getChildByName("QuickRigCharacter_Spine2").getChildByName("QuickRigCharacter_Neck").getChildByName("QuickRigCharacter_Head").getChildByName("hats");
            var t = this._man.getChildByName("Virtual_Man_0");
            this._man_mat = t._render.material;
            for (let t = 0; t < this._hats.numChildren; t++) {
                let e = this._hats.getChildAt(t);
                e.active = !1, this._hat_array.push(e)
            }
            this._aiAnimator = this._man.getComponent(Laya.Animator), this._animatorLayer = this._aiAnimator.getControllerLayer()
        }
        onStart() {}
        ChangeModelAndColor(t, e) {
            if (this._aiAnimator.speed = 1, this._aiAnimator.play("win"), !(t > this._hat_array.length + 1)) {
                for (let t = 0; t < this._hat_array.length; t++) this._hat_array[t].active = !1;
                0 != t && (this._hat_array[t - 1].active = !0), e > s.Instance().colorArray.length || (this._man_mat.albedoColor = s.Instance().colorArray[e])
            }
        }
        HideOrShowSkinModel(t) {
            this._skin_stroe.active = t
        }
    }
    u.instance = null;
    class y {}
    y.colorData = [{
        name: "红色",
        price: 0,
        times: 10
    }, {
        name: "灰色",
        price: 1e3,
        times: 10
    }, {
        name: "蓝色",
        price: 1e3,
        times: 10
    }, {
        name: "绿色",
        price: 1e3,
        times: 10
    }, {
        name: "黑色",
        price: 1e3,
        times: 10
    }, {
        name: "粉色",
        price: 1e3,
        times: 10
    }, {
        name: "黄色",
        price: 1e3,
        times: 10
    }, {
        name: "紫色",
        price: 1e3,
        times: 10
    }], y.hatData = [{
        name: "1",
        price: 0,
        times: 10,
        isSpecial: !1
    }, {
        name: "2",
        price: 1e3,
        times: 10,
        isSpecial: !1
    }, {
        name: "3",
        price: 1500,
        times: 10,
        isSpecial: !1
    }, {
        name: "4",
        price: 2e3,
        times: 10,
        isSpecial: !1
    }, {
        name: "5",
        price: 3e3,
        times: 10,
        isSpecial: !1
    }, {
        name: "6",
        price: 3e3,
        times: 10,
        isSpecial: !1
    }, {
        name: "7",
        price: 5e3,
        times: 10,
        isSpecial: !1
    }, {
        name: "8",
        price: 5e3,
        times: 10,
        isSpecial: !1
    }, {
        name: "9",
        price: 0,
        times: 10,
        isSpecial: !0
    }];
    class I extends Laya.Script {
        constructor() {
            super(), this._isHatPage = !0, this._chooseIndex = 0, this._listData = [], this.hatData = null, this.colorData = null, this.skinJson = null, this.jsonData = null, this.jsonDataEmpty = null, I.instance = this
        }
        onAwake() {
            this.skinStoreUI = this.owner, this._uiBox = this.skinStoreUI.getChildAt(0), this._skinBg = this._uiBox.getChildByName("skinBg"), this._returnBtn = this._uiBox.getChildByName("returnBtn"), this._hat_index = this._skinBg.getChildByName("index_hat"), this._color_index = this._skinBg.getChildByName("index_color"), this._stateBtn = this._skinBg.getChildByName("stateBtn"), this._videoBtn = this._skinBg.getChildByName("videoBtn"), this._skinList = this._skinBg.getChildByName("skinList")
        }
        onStart() {
            this.hatData = y.hatData, this.colorData = y.colorData;
            this.skinStoreUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth;
            this._skinList.hScrollBarSkin = "", this._skinList.selectEnable = !1, this._hat_index.on(Laya.Event.CLICK, this, this.HatIndexClick), this._color_index.on(Laya.Event.CLICK, this, this.ColorIndexClick), this._returnBtn.on(Laya.Event.CLICK, this, this.ReturnBtnClick), this._stateBtn.on(Laya.Event.CLICK, this, this.StateBtnClick), this._videoBtn.on(Laya.Event.CLICK, this, this.VideoBtnClick), Laya.loader.load("subPackage/sub2/SkinDataLocal.json", Laya.Handler.create(this, this.LoadJsonComplete))
        }
        LoadJsonComplete() {
            this.jsonData = Laya.loader.getRes("subPackage/sub2/SkinDataLocal.json"), "object" != typeof this.jsonData && (this.jsonData = JSON.parse(this.jsonData)), Laya.LocalStorage.setJSON("skinEmpty", this.jsonData), this.jsonDataEmpty = Laya.LocalStorage.getJSON("skinEmpty"), "" == Laya.LocalStorage.getJSON("skin") || null == Laya.LocalStorage.getJSON("skin") || null == Laya.LocalStorage.getJSON("skin") ? (this.skinJson = Laya.loader.getRes("subPackage/sub2/SkinDataLocal.json"), "object" != typeof this.skinJson && (this.skinJson = JSON.parse(this.skinJson)), Laya.LocalStorage.setJSON("skin", this.skinJson)) : (this.skinJson = Laya.LocalStorage.getJSON("skin"), this.jsonData.Version == this.skinJson.Version ? this.skinJson = Laya.LocalStorage.getJSON("skin") : console.log("版本发生了变化"))
        }
        ShowSkinStoreUI() {
            if (!this.skinStoreUI.visible) {
                p.instance.ShowCoinUI(!0), this.skinStoreUI.visible = !0, o.instance.SkinStore();
                var t = Number(Laya.LocalStorage.getItem("hat")),
                    e = Number(Laya.LocalStorage.getItem("color"));
                this._isHatPage ? this._chooseIndex = t : this._chooseIndex = e, u.instance.ChangeModelAndColor(t, e), this.LoadSkinList(this._isHatPage, this._chooseIndex)
            }
        }
        LoadSkinList(t, e) {
            this._listData = [];
            var i = 0,
                a = 0,
                n = !1,
                o = "",
                r = "",
                h = "",
                l = !1;
            if (n = !1, t)
                for (let t = 0; t < this.skinJson.HatData.length; t++) o = "SkinUI/hat_" + t + ".png", n = t == e, 0 == t ? (i = 86, a = 101, l = !1, r = "", this.skinJson.HatData[t].hasState && (n ? (h = "SkinUI/choose.png", this.skinJson.HatData[t].isUse ? (this._stateBtn.skin = "SkinUI/using.png", localStorage.setItem("hat", String(t))) : this._stateBtn.skin = "SkinUI/use.png") : h = "SkinUI/has.png")) : (i = 90, a = 73, this.skinJson.HatData[t].hasState ? (l = !1, r = "SkinUI/info_has.png", n ? (h = "SkinUI/choose.png", this.skinJson.HatData[t].isUse ? (this._stateBtn.skin = "SkinUI/using.png", localStorage.setItem("hat", String(t)), s.Instance().hat_index = Number(localStorage.getItem("hat"))) : this._stateBtn.skin = "SkinUI/use.png") : h = "SkinUI/has.png") : (l = !0, this.hatData[t].isSpecial ? (r = "SkinUI/special.png", n ? (h = "SkinUI/choose.png", this._stateBtn.skin = "SkinUI/boxGet.png") : h = "SkinUI/normal.png") : (r = "SkinUI/price_" + this.hatData[t].price + ".png", n ? (h = "SkinUI/choose.png", this._stateBtn.skin = "SkinUI/buy.png") : h = "SkinUI/normal.png"))), this._listData.push({
                    item_bg: {
                        skin: h
                    },
                    skin: {
                        x: i,
                        y: a,
                        skin: o
                    },
                    info: {
                        skin: r
                    },
                    lock: {
                        visible: l
                    }
                });
            else
                for (let t = 0; t < this.skinJson.ColorData.length; t++) n = t == e, o = "SkinUI/color_" + t + ".png", i = 87, a = 83, this.skinJson.ColorData[t].hasState ? (l = !1, r = "SkinUI/info_has.png", n ? (h = "SkinUI/choose.png", this.skinJson.ColorData[t].isUse ? (this._stateBtn.skin = "SkinUI/using.png", localStorage.setItem("color", String(t)), s.Instance().color_index = Number(localStorage.getItem("color"))) : this._stateBtn.skin = "SkinUI/use.png") : h = "SkinUI/has.png") : (l = !0, r = "SkinUI/price_" + this.colorData[t].price + ".png", n ? (h = "SkinUI/choose.png", this._stateBtn.skin = "SkinUI/buy.png") : h = "SkinUI/normal.png"), this._listData.push({
                    item_bg: {
                        skin: h
                    },
                    skin: {
                        x: i,
                        y: a,
                        skin: o
                    },
                    info: {
                        skin: r
                    },
                    lock: {
                        visible: l
                    }
                });
            this._skinList.dataSource = this._listData
        }
        HatIndexClick() {
            if ("SkinUI/hat_no.png" == this._hat_index.skin) {
                this._isHatPage = !0, this._hat_index.skin = "SkinUI/hat_choose.png", this._color_index.skin = "SkinUI/color_no.png";
                var t = Number(localStorage.getItem("hat"));
                this.LoadSkinList(this._isHatPage, t)
            }
        }
        ColorIndexClick() {
            if ("SkinUI/color_no.png" == this._color_index.skin) {
                this._isHatPage = !1, this._color_index.skin = "SkinUI/color_choose.png", this._hat_index.skin = "SkinUI/hat_no.png";
                var t = Number(localStorage.getItem("color"));
                this.LoadSkinList(this._isHatPage, t)
            }
        }
        ChooseSkinImgClick(t) {
            var e = t.parent.getChildByName("skin");
            if (this._isHatPage) {
                this._chooseIndex = Number(e.skin.split(".")[0].substring(11));
                var i = Number(Laya.LocalStorage.getItem("color"));
                u.instance.ChangeModelAndColor(this._chooseIndex, i)
            } else {
                this._chooseIndex = Number(e.skin.split(".")[0].substring(13));
                var a = Number(Laya.LocalStorage.getItem("hat"));
                u.instance.ChangeModelAndColor(a, this._chooseIndex)
            }
            this.LoadSkinList(this._isHatPage, this._chooseIndex)
        }
        StateBtnClick() {
            if (console.log("stateClick"), "SkinUI/using.png" != this._stateBtn.skin && "SkinUI/boxGet.png" != this._stateBtn.skin) {
                if ("SkinUI/use.png" == this._stateBtn.skin) {
                    if (this._isHatPage) {
                        if (this.skinJson.HatData[this._chooseIndex].hasState) {
                            for (let t = 0; t < this.skinJson.HatData.length; t++) this.skinJson.HatData[t].isUse = !1;
                            this.skinJson.HatData[this._chooseIndex].isUse = !0, localStorage.setItem("hat", String(this._chooseIndex)), s.Instance().hat_index = Number(localStorage.getItem("hat")), P.instance.ChangeHatModel(this._chooseIndex)
                        }
                    } else if (this.skinJson.ColorData[this._chooseIndex].hasState) {
                        for (let t = 0; t < this.skinJson.ColorData.length; t++) this.skinJson.ColorData[t].isUse = !1;
                        this.skinJson.ColorData[this._chooseIndex].isUse = !0, localStorage.setItem("color", String(this._chooseIndex)), s.Instance().color_index = Number(localStorage.getItem("color")), P.instance.ChangeModelColor(this._chooseIndex)
                    }
                } else if ("SkinUI/buy.png" == this._stateBtn.skin) {
                    var t = s.Instance().coin_count;
                    this._isHatPage ? t >= this.hatData[this._chooseIndex].price ? (this.UpdateCoin(this.hatData[this._chooseIndex].price), this.skinJson.HatData[this._chooseIndex].hasState = !0) : (v.ShowToast("Diamond shortage!"), console.log("钻石数量不足")) : t >= this.colorData[this._chooseIndex].price ? (this.UpdateCoin(this.colorData[this._chooseIndex].price), this.skinJson.ColorData[this._chooseIndex].hasState = !0) : (v.ShowToast("Insufficient gold coins!"), console.log("钻石数量不足"))
                }
                Laya.LocalStorage.setJSON("skin", this.skinJson), this.LoadSkinList(this._isHatPage, this._chooseIndex)
            }
        }
        VideoBtnClick() {
            GDAdsInstance.showReward().then(t => {
                t ? this.GetRewardCoin() : promptText("Failed to get the reward, please watch the ads to the end.")
            })
        }
        GetRewardCoin() {
            p.instance.GetCoin(200), v.ShowToast("Get 200 Diamonds!")
        }
        UpdateCoin(t) {
            s.Instance().coin_count -= t, localStorage.setItem("coin", String(s.Instance().coin_count)), p.instance.UpdateCoin()
        }
        SetJsonData() {
            Laya.LocalStorage.setJSON("skin", this.skinJson)
        }
        ReturnBtnClick() {
            this.skinStoreUI.visible && (this.skinStoreUI.visible = !1, p.instance.ShowCoinUI(!1), u.instance.HideOrShowSkinModel(!1), T.Instance().isStartPannel ? (S.instance.ShowStartUI(), o.instance.ReSet()) : (x.instance.SkinStoreToGameOver(), Laya.Browser.clientHeight / Laya.Browser.clientWidth >= 2 ? v.ShowGrid() : v.ShowBanner(), o.instance.StartGame()))
        }
    }
    I.instance = null;
    class p extends Laya.Script {
        constructor() {
            super(), this.coin_start_pos = new Laya.Vector2, this.coin_end_pos1 = new Laya.Vector2, this.coin_end_pos2 = new Laya.Vector2, p.instance = this
        }
        onAwake() {
            this._coinUI = this.owner, this.uiBox = this._coinUI.getChildAt(0), this._coinBg_up = this.uiBox.getChildByName("coinBg_up"), this._coinBg_down = this.uiBox.getChildByName("coinBg_down"), this._coinLabel_1 = this._coinBg_up.getChildByName("coinCount"), this._coinLabel_2 = this._coinBg_down.getChildByName("coinCount"), this._addCoinBtn_1 = this._coinBg_up.getChildByName("addCoin"), this._addCoinBtn_2 = this._coinBg_down.getChildByName("addCoin"), this._collectBg = this.uiBox.getChildByName("collectBG"), this._videoBtn = this._collectBg.getChildByName("video_coin"), this._closeBtn = this._collectBg.getChildByName("closeBtn");
            this._coinUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth;
            this.coin_start_pos.setValue(this._coinUI.width / 2, this._coinUI.height / 2), this.coin_end_pos1.setValue(this._coinLabel_1.x - 10, this._coinLabel_1.y + 180), this.coin_end_pos2.setValue(this._coinUI.width - this._coinLabel_1.x - 150, this._coinLabel_1.y + 1430), console.log(this.coin_end_pos2, "coin_endPOS")
        }
        onStart() {
            this._closeBtn.on(Laya.Event.CLICK, this, this.HideAddCoin), this._addCoinBtn_1.on(Laya.Event.CLICK, this, this.ShowAddCoin), this._addCoinBtn_2.on(Laya.Event.CLICK, this, this.ShowAddCoin), this._videoBtn.on(Laya.Event.CLICK, this, this.VideoBtnClick), this.ShowCoinUI(!1)
        }
        ShowCoinUI(t) {
            this._coinUI.skin = "", this._coinUI.mouseThrough = !0, this.uiBox.mouseThrough = !0, t ? (this._isSkinStore = !0, this._coinBg_up.visible = !1, this._coinBg_down.visible = !0) : (this._isSkinStore = !1, this._coinBg_up.visible = !0, this._coinBg_down.visible = !1), this.UpdateCoin()
        }
        ShowAddCoin() {
            console.log("show add"), this._collectBg.visible || (this._collectBg.visible = !0, this._collectBg.centerX = 0, this._collectBg.top = 390, this.uiBox.mouseThrough = !1, this._coinUI.skin = "GameBoxUI/bg.png")
        }
        HideAddCoin() {
            this._collectBg.visible && (this._collectBg.visible = !1, this.uiBox.mouseThrough = !0, this._coinUI.skin = "")
        }
        VideoBtnClick() {
            GDAdsInstance.showReward().then(t => {
                t ? this.GetRewardCoin() : promptText("Failed to get the reward, please watch the ads to the end.")
				sdk.showBanner();
            })
        }
        GetRewardCoin() {
            this.GetCoin(), this.HideAddCoin(), v.ShowToast("Get 200 Diamonds!", "none", 1500)
        }
        GetCoin(t = 200) {
            var e;
            0 != t && (e = I.instance.skinStoreUI.visible ? this.coin_end_pos2 : this.coin_end_pos1, _.instance.creategold(this.coin_start_pos, e, 10, () => {
                T.Instance().PlaySound("coin")
            }, () => {
                s.Instance().coin_count += t, localStorage.setItem("coin", String(s.Instance().coin_count)), this.UpdateCoin()
            }, 65))
        }
        UpdateCoin() {
            "" == localStorage.getItem("coin") || null == localStorage.getItem("coin") || null == localStorage.getItem("coin") ? localStorage.setItem("coin", "0") : s.Instance().coin_count = Number(localStorage.getItem("coin"));
            var t = s.Instance().coin_count;
            if (t >= 1e4 && t < 1e5) {
                var e = Math.floor(t / 1e3),
                    i = Math.floor(t % 1e3 / 100);
                this._coinLabel_1.text = e + "." + i + "K", this._coinLabel_2.text = e + "." + i + "K"
            } else if (t >= 1e5) {
                var a = Math.floor(t / 1e4);
                this._coinLabel_1.text = a + "W", this._coinLabel_2.text = a + "W"
            } else this._coinLabel_1.text = "" + s.Instance().coin_count, this._coinLabel_2.text = "" + s.Instance().coin_count
        }
    }
    p.instance = null;
    class S extends Laya.Script {
        constructor() {
            super(), this._keys_array = [], this._isOpenSkin = !1, S.instance = this
        }
        onAwake() {
            this._startGameUI = this.owner, this._uiBox = this._startGameUI.getChildAt(0), this._logo = this._uiBox.getChildByName("logo"), this._iconBtn_type3 = this._uiBox.getChildByName("iconBtn_type3"), this._startGameBtn = this._uiBox.getChildByName("start_btn"), this._rankBtn = this._uiBox.getChildByName("rankBtn"), this._shareBtn = this._uiBox.getChildByName("shareBtn"), this._muiscBtn = this._uiBox.getChildByName("musicBtn"), this._skinBtn = this._uiBox.getChildByName("skinBtn"), this._point = this._skinBtn.getChildAt(0), this._boxLine = this._uiBox.getChildByName("boxLine"), this._box_bg = this._boxLine.getChildByName("boxBg"), this._box = this._box_bg.getChildAt(0);
            for (let t = 0; t < 3; t++) {
                let e = this._boxLine.getChildAt(t);
                this._keys_array.push(e)
            }
            this._music_off = this._muiscBtn.getChildAt(0), this._music_off.visible = !1
        }
        onStart() {
            this._startGameBtn.on(Laya.Event.CLICK, this, this.StartBtnClick), this._rankBtn.on(Laya.Event.CLICK, this, this.RankBtnClick), this._shareBtn.on(Laya.Event.CLICK, this, this.ShareBtnClick), this._muiscBtn.on(Laya.Event.CLICK, this, this.MusicBtnClick), this._skinBtn.on(Laya.Event.CLICK, this, this.SkinBtnClick);
            this._startGameUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth;
            this.UpdateBoxLine()
        }
        ShowStartUI() {
            this._startGameUI.visible || (this._startGameUI.visible = !0, this._isOpenSkin && (this._point.visible = !1), p.instance.UpdateCoin(), this.UpdateBoxLine())
        }
        StartBtnClick() {
            GDAdsInstance.showInterstitial().then(() => {
                let e = localStorage.getItem("teach");
                this._startGameUI.visible = !1, "0" == e ? h.instance.ShowTeachUI() : "" == localStorage.getItem("nickName") || null == localStorage.getItem("nickName") || null == localStorage.getItem("nickName") ? Laya.Browser.onWeiXin ? v.CreateUserInfoButton(() => {
                    r.instance.ShowLoadPlayerUI(t.Instance().AI_count)
                }) : (localStorage.setItem("nickName", "Player"), localStorage.setItem("userhead", "HeadUI/Head.png"), r.instance.ShowLoadPlayerUI(t.Instance().AI_count)) : r.instance.ShowLoadPlayerUI(t.Instance().AI_count)
            })
        }
        RankBtnClick() {
            d.instance.ShowRankUI()
        }
        SkinBtnClick() {
            this._isOpenSkin = !0, T.Instance().isStartPannel = !0, this._startGameUI.visible = !1, u.instance.HideOrShowSkinModel(!0), I.instance.ShowSkinStoreUI()
        }
        ShareBtnClick() {
            T.Instance().share_index = "", T.Instance().ShareMessage()
        }
        MusicBtnClick() {
            v.isSoundMute ? (Laya.SoundManager.soundMuted = !1, v.isSoundMute = !1, this._music_off.visible = !1, T.Instance().PlaySound("button")) : (Laya.SoundManager.soundMuted = !0, v.isSoundMute = !0, this._music_off.visible = !0)
        }
        UpdateBoxLine() {
            "" == localStorage.getItem("key") || null == localStorage.getItem("key") || null == localStorage.getItem("key") ? localStorage.setItem("key", "0") : s.Instance().key_count = Number(localStorage.getItem("key"));
            var t = s.Instance().key_count;
            for (let t = 0; t < this._keys_array.length; t++) this._keys_array[t].skin = "StartUI/key_no.png";
            this._box_bg.skin = "StartUI/box_no_bg.png", this._box.skin = "StartUI/box_normol.png", 1 == t ? this._keys_array[0].skin = "StartUI/key_has.png" : 2 == t ? (this._keys_array[0].skin = "StartUI/key_has.png", this._keys_array[1].skin = "StartUI/key_has.png") : t >= 3 && (this._keys_array[0].skin = "StartUI/key_has.png", this._keys_array[1].skin = "StartUI/key_has.png", this._keys_array[2].skin = "StartUI/key_has.png", this._box_bg.skin = "StartUI/box_has_bg.png", this._box.skin = "StartUI/box_canOpen.png", s.Instance().key_count = 0, localStorage.setItem("key", "0"))
        }
    }
    S.instance = null;
    class x extends Laya.Script {
        constructor() {
            super(), this._getCoin_count = 0, this._isFiveCollect = !1, x.instance = this
        }
        onAwake() {
            this.gameOverUI = this.owner, this._uiBox = this.gameOverUI.getChildAt(0), this._title = this._uiBox.getChildByName("titleBg"), this._return = this._uiBox.getChildByName("returnBtn"), this._video_five = this._uiBox.getChildByName("video_five"), this._shareBtn = this._uiBox.getChildByName("shareBtn"), this._next = this._uiBox.getChildByName("nextBtn"), this._replay = this._uiBox.getChildByName("replay"), this._skin = this._uiBox.getChildByName("skinBtn"), this._get = this._uiBox.getChildByName("get"), this._ge = this._get.getChildByName("ge"), this._ten = this._get.getChildByName("ten"), this._hun = this._get.getChildByName("hun")
        }
        onStart() {
            this._return.on(Laya.Event.CLICK, this, this.ReturnBtnClick), this._video_five.on(Laya.Event.CLICK, this, this.VideoFiveBtnClik), this._shareBtn.on(Laya.Event.CLICK, this, this.ShareBtnClick), this._next.on(Laya.Event.CLICK, this, this.NextBtnClik), this._replay.on(Laya.Event.CLICK, this, this.ReplayBtnClick), this._skin.on(Laya.Event.CLICK, this, this.SkinBtnClick);
            this.gameOverUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth
        }
        ShowGameOverUI(t) {
            if (!this.gameOverUI.visible) {
                var e = localStorage.getItem("gameCount");
                "0" == e ? localStorage.setItem("gameCount", "1") : "1" == e && localStorage.setItem("gameCount", "2"), this.gameOverUI.visible = !0, this._isFiveCollect = !1, v.ShowInterstitial(), Laya.Browser.clientHeight / Laya.Browser.clientWidth >= 2 ? v.ShowGrid() : v.ShowBanner(), this._getCoin_count = 10 * s.Instance().score_num, this.SetGetCoinImg(this._getCoin_count), this._getCoin_count > 0 ? this._video_five.visible = !0 : this._video_five.visible = !1, U.instance.bgm && U.instance.bgm.stop(), t ? (this._title.skin = "GameOverUI/title_win.png", this._next.visible = !0, "0" == localStorage.getItem("teach") ? (localStorage.setItem("teach", "1"), this._getCoin_count = 100, this.SetGetCoinImg(this._getCoin_count)) : (this.SetLevel(), s.Instance().win_count += 1, v.PostMessage({
                    cmd: "SaveData",
                    dataName: "Kerry_Data1",
                    dataRes: String(s.Instance().win_count)
                }), localStorage.setItem("win", String(s.Instance().win_count)))) : (this._title.skin = "GameOverUI/title_lose.png", this._replay.visible = !0)
            }
        }
        ReturnBtnClick() {
            T.Instance().Reset(), S.instance.ShowStartUI(), this.HideGameOverUI(), this._isFiveCollect || this.ColllectCoin(1), console.log("return")
        }
        NextBtnClik() {
            this.HideGameOverUI(), T.Instance().Reset(), "" == localStorage.getItem("nickName") || null == localStorage.getItem("nickName") || null == localStorage.getItem("nickName") ? Laya.Browser.onWeiXin ? v.CreateUserInfoButton(() => {
                r.instance.ShowLoadPlayerUI(t.Instance().AI_count)
            }) : (localStorage.setItem("nickName", "Player"), localStorage.setItem("userhead", "HeadUI/Head.png"), r.instance.ShowLoadPlayerUI(t.Instance().AI_count)) : r.instance.ShowLoadPlayerUI(t.Instance().AI_count), this._isFiveCollect || this.ColllectCoin(1)
        }
        ReplayBtnClick() {
            this.HideGameOverUI(), T.Instance().Reset(), r.instance.ShowLoadPlayerUI(t.Instance().AI_count), this._isFiveCollect || this.ColllectCoin(1)
        }
        HideGameOverUI() {
            this.gameOverUI.visible && (this.gameOverUI.visible = !1, this._replay.visible = !1, this._next.visible = !1, v.HideGrid(), v.HideBanner())
        }
        SkinBtnClick() {
            this.gameOverUI.visible = !1, T.Instance().isStartPannel = !1, u.instance.HideOrShowSkinModel(!0), I.instance.ShowSkinStoreUI(), Laya.Browser.clientHeight / Laya.Browser.clientWidth >= 2 ? v.HideGrid() : v.HideBanner()
        }
        VideoFiveBtnClik() {
            GDAdsInstance.showReward().then(t => {
                t ? this.GetFiveAward() : promptText("Failed to get the reward, please watch the ads to the end.")
            })
        }
        ShareBtnClick() {
            T.Instance().share_index = "", T.Instance().ShareMessage()
        }
        GetFiveAward() {
            this._isFiveCollect = !0, this.ColllectCoin(5), v.ShowToast("Successfully received!", "none", 1500), this._video_five.visible = !1
        }
        ColllectCoin(t) {
            p.instance.GetCoin(this._getCoin_count * t)
        }
        SetGetCoinImg(t) {
            if (t < 10) this._ge.visible = !1, this._ten.visible = !0, this._hun.visible = !1, this._ten.skin = "GameOverUI/c_" + t + ".png";
            else if (t >= 10 && t < 100) {
                this._ge.visible = !0, this._ten.visible = !0, this._hun.visible = !1;
                var e = Math.floor(t / 10),
                    i = Math.floor(t % 10);
                this._ge.skin = "GameOverUI/c_" + i + ".png", this._ten.skin = "GameOverUI/c_" + e + ".png"
            } else {
                this._ge.visible = !0, this._ten.visible = !0, this._hun.visible = !0, i = Math.floor(t % 100 % 10), e = Math.floor(t % 100 / 10);
                var a = Math.floor(t / 100);
                this._ge.skin = "GameOverUI/c_" + i + ".png", this._ten.skin = "GameOverUI/c_" + e + ".png", this._hun.skin = "GameOverUI/c_" + a + ".png"
            }
        }
        SkinStoreToGameOver() {
            this.gameOverUI.visible = !0
        }
        SetLevel() {
            let t = s.Instance().level += 1;
            localStorage.setItem("level", String(t))
        }
    }
    x.instance = null;
    class w extends Laya.Script {
        constructor() {
            super(), w.instance = this
        }
        onAwake() {
            this.relifeUI = this.owner, this._uiBox = this.relifeUI.getChildAt(0), this.relifeBtn = this._uiBox.getChildByName("relifeBtn"), this.noBtn = this._uiBox.getChildByName("noBtn")
        }
        onStart() {
            this.relifeBtn.on(Laya.Event.CLICK, this, this.RelifeBtnClick), this.noBtn.on(Laya.Event.CLICK, this, this.SkipBtnClick), this._uiBox.removeSelf();
            this.relifeUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth
        }
        ShowRelifeUI() {
            this.relifeUI.visible || (v.ShowBanner(), this.noBtn.visible = !1, this.relifeUI.visible = !0, this.relifeUI.addChild(this._uiBox), Laya.timer.once(1e3, this, () => {
                this.noBtn.visible = !0
            }), U.instance.bgm && U.instance.bgm.stop())
        }
        RelifeBtnClick() {
            GDAdsInstance.showReward().then(t => {
                t ? this.Relife() : promptText("Failed to get the reward, please watch the ads to the end.")
            })
        }
        Relife() {
            this.relifeUI.visible && (this.relifeUI.visible = !1, this._uiBox.removeSelf()), P.instance.Relife(), v.HideBanner()
        }
        SkipBtnClick() {
            console.log("skip"), v.HideBanner(), this.relifeUI.visible && (this.relifeUI.visible = !1, this._uiBox.removeSelf()), T.Instance().PlaySound("lose"), U.instance.HideGameInfoUI(), x.instance.ShowGameOverUI(!1)
        }
    }
    w.instance = null;
    class B extends Laya.Script {
        constructor() {
            super(), this._box_count = 9, this._key_count = 0, this._key_total = 0, this._click_count = 0, this._special_p = .05, this._isHasSpecial = !1, this._isShowShare = !1, B.instance = this
        }
        onAwake() {
            this.boxUIPanel = this.owner, this.uiBox = this.boxUIPanel.getChildAt(0), this._title = this.uiBox.getChildByName("title"), this._list = this.uiBox.getChildByName("boxList"), this._videoBtn = this.uiBox.getChildByName("videoBtn"), this._shareBtn = this.uiBox.getChildByName("shareBtn"), this._special_img = this.uiBox.getChildByName("special"), this._closeBtn = this._title.getChildAt(0)
        }
        onStart() {
            this._videoBtn.on(Laya.Event.CLICK, this, this.VideoBtnClick), this._closeBtn.on(Laya.Event.CLICK, this, this.ClsoeBtnClick), this._shareBtn.on(Laya.Event.CLICK, this, this.ShareBtnClick);
            this.boxUIPanel.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth
        }
        ShowBoxUI() {
            this.boxUIPanel.visible || (v.HideBanner(), v.HideGrid(), I.instance.skinJson && (this._isHasSpecial = I.instance.skinJson.HatData[8].hasState), this._isHasSpecial && this._special_img && (this._special_img.visible = !1), this.boxUIPanel.visible = !0, this.ShowRewordBtn(), this._key_count = s.Instance().key_count, this._key_total = this._key_count, s.Instance().key_count = 0, localStorage.setItem("key", String(s.Instance().key_count)), this._closeBtn.visible = !1, I.instance.skinJson && (this._isHasSpecial = I.instance.skinJson.HatData[8].hasState)), this.SetBoxListData()
        }
        SetBoxListData() {
            var t = [];
            for (let e = 0; e < this._box_count; e++) t.push({
                itemBg: {
                    skin: "BoxUI/boxBg.png"
                },
                item: {
                    skin: "BoxUI/box.png"
                }
            });
            this._list.dataSource = t, this._list.refresh()
        }
        BoxItemClick(t) {
            if (this._key_count <= 0) return console.log("Insufficient number of keys!"), void v.ShowToast("Insufficient number of keys!");
            t.skin = this.RandomReword(), this._key_count -= 1, this._key_count <= 0 && Laya.timer.once(500, this, () => {
                this._closeBtn.visible = !0
            })
        }
        ShowRewordBtn() {
            "2" != localStorage.getItem("gameCount") ? (this._videoBtn.visible = !0, this._shareBtn.visible = !1) : this._isShowShare ? (this._isShowShare = !1, this._shareBtn.visible = !0, this._videoBtn.visible = !1) : (this._isShowShare = !0, this._shareBtn.visible = !1, this._videoBtn.visible = !0)
        }
        VideoBtnClick() {
            if (this._key_total >= 9) return console.log("钥匙获得数量已上限"), void v.ShowToast("The number of keys is full!");
            v.reword_index = "key", GDAdsInstance.showReward().then(t => {
                t ? this.GetReword() : promptText("Failed to get the reward, please watch the ads to the end.")
            })
        }
        ShareBtnClick() {
            T.Instance().share_index = "box", T.Instance().ShareMessage()
        }
        RandomReword() {
            var t, e = Math.random();
            return e < this._special_p ? !this._isHasSpecial && s.Instance().win_count > 6 ? (t = "BoxUI/hat.png", I.instance.skinJson && (I.instance.skinJson.HatData[8].hasState = !0, I.instance.SetJsonData(), this._isHasSpecial = !0)) : (t = "BoxUI/coin_1.png", this.UpdataCoin(50)) : e >= .05 && e < .25 ? (t = "BoxUI/coin_1.png", this.UpdataCoin(50)) : e >= .25 && e < .5 ? (t = "BoxUI/coin_2.png", this.UpdataCoin(100)) : e >= .5 && e < .7 ? (t = "BoxUI/coin_3.png", this.UpdataCoin(150)) : e >= .7 && e < .9 ? (t = "BoxUI/coin_4.png", this.UpdataCoin(200)) : (t = "BoxUI/coin_5.png", this.UpdataCoin(300)), t
        }
        GetReword() {
            this._key_count += 3, this._key_total += 3, T.Instance().share_index = ""
        }
        UpdataCoin(t) {
            s.Instance().coin_count += t, localStorage.setItem("coin", String(s.Instance().coin_count)), p.instance.UpdateCoin()
        }
        ClsoeBtnClick() {
            this.HideBoxUI()
        }
        HideBoxUI() {
            this.boxUIPanel.visible && (this.boxUIPanel.visible = !1, this._closeBtn.visible = !1, this._key_count = 0, this._key_total = 0, s.Instance().key_count = 0, localStorage.setItem("key", String(s.Instance().key_count)), Laya.Browser.clientHeight / Laya.Browser.clientWidth >= 2 ? v.ShowGrid() : v.ShowBanner())
        }
    }
    B.instance = null;
    const C = "",
        k = "adunit-72686fbfc48e3b3f",
        L = "adunit-b72e1668f1ee6ab2",
        A = "adunit-1d9b7a364ab84ad5",
        b = "adunit-b137a2f4ee1936e7",
        f = "";
    class v {
        constructor() {}
        static ShowShareMenu(t = !1) {
            Laya.Browser.onWeiXin && wx.showShareMenu({
                withShareTicket: t,
                success: () => {
                    wx.onShareAppMessage(() => {
                        T.Instance().share_index = "";
                        var t = Math.random();
                        let e = t < .25 ? 1 : t < .5 ? 2 : t < .75 ? 3 : 4;
                        return {
                            title: this.shareWords[e - 1],
                            imageUrl: "subPackage/sub2/shareimg" + String(e) + ".jpg",
                            query: "",
                            success: () => {}
                        }
                    })
                },
                fail: () => {
                    console.log("显示当前页面的转发按钮--失败！")
                }
            })
        }
        static ShareGame(t, e = null, i = null) {
            if (Laya.Browser.onWeiXin) {
                wx.shareAppMessage({
                    title: e,
                    imageUrl: t,
                    query: i
                });
                var a = (new Date).getTime(),
                    s = function() {
                        wx.offHide(s)
                    };
                wx.onHide(s);
                var n = function() {
                    wx.offShow(n);
                    var t = (new Date).getTime();
                    if (Math.abs(a - t) < 3e3)
                        if (this.isFirstShare)
                            if (this.isFirstShare = !1, Math.random() < .7) {
                                if ("" == T.Instance().share_index) return;
                                wx.showToast({
                                    title: "分享失败，请换个群重试",
                                    icon: "none",
                                    duration: 1500
                                }), T.Instance().share_index = ""
                            } else {
                                switch (T.Instance().share_index) {
                                    case "box":
                                        B.instance.GetReword()
                                }
                                T.Instance().share_index = ""
                            }
                    else {
                        if ("" == T.Instance().share_index) return;
                        wx.showToast({
                            title: "分享失败，请换个群重试",
                            icon: "none",
                            duration: 1500
                        }), T.Instance().share_index = ""
                    } else {
                        switch (T.Instance().share_index) {
                            case "box":
                                B.instance.GetReword()
                        }
                        T.Instance().share_index = ""
                    }
                };
                wx.onShow(n)
            }
        }
        static PostMessage(t) {
            Laya.Browser.onWeiXin && wx.getOpenDataContext && (null == this.openDataContext && (this.openDataContext = wx.getOpenDataContext()), this.openDataContext.postMessage(t))
        }
        static CreateUserInfoButton(t) {
            if (Laya.Browser.onWeiXin)
                if (wx.createUserInfoButton) {
                    var e = wx.createUserInfoButton({
                        type: "image",
                        image: "LoadUI/Enter.png",
                        style: {
                            top: wx.getSystemInfoSync().windowHeight / 2,
                            left: wx.getSystemInfoSync().windowWidth / 2 - 100,
                            width: 200,
                            height: 60
                        }
                    });
                    e.onTap(i => {
                        e.destroy(), this.userInfo = i.userInfo, console.log("用户信息", this.userInfo), null == this.userInfo && (this.userInfo = {
                            nickName: "Player",
                            avatarUrl: "PlayerUI/h_0.png"
                        }), localStorage.setItem("nickName", this.userInfo.nickName), localStorage.setItem("userhead", this.userInfo.avatarUrl), t()
                    })
                } else wx.authorize({
                    scope: "scope.userInfo",
                    success: function() {
                        wx.getUserInfo({
                            success: e => {
                                this.userInfo = e.userInfo, console.log("***用户信息", this.userInfo), null == this.userInfo && (this.userInfo = {
                                    nickName: "Player",
                                    avatarUrl: "HeadUI/head.png"
                                }), localStorage.setItem("nickName", this.userInfo.nickName), localStorage.setItem("userhead", this.userInfo.avatarUrl), t()
                            },
                            fail: e => {
                                console.log("***用户信息获取失败", e), localStorage.setItem("nickName", "Player"), localStorage.setItem("userhead", "HeadUI/head.png"), t()
                            }
                        })
                    },
                    fail: e => {
                        console.log("***授权失败", e), localStorage.setItem("nickName", "Player"), localStorage.setItem("userhead", "HeadUI/head.png"), t()
                    }
                })
        }
        static GetUserInfo(t) {
            Laya.Browser.window.wx && wx.authorize ? wx.authorize({
                scope: "scope.userInfo",
                success: function() {
                    wx.getUserInfo({
                        success: e => {
                            this.userInfo = e.userInfo, console.log("***用户信息", this.userInfo), null == this.userInfo && (this.userInfo = {
                                nickName: "Player",
                                avatarUrl: "PlayerUI/h_0.png"
                            }), localStorage.setItem("nickName", this.userInfo.nickName), localStorage.setItem("userhead", this.userInfo.avatarUrl), t()
                        },
                        fail: e => {
                            console.log("***用户信息获取失败", e), localStorage.setItem("nickName", "Player"), localStorage.setItem("userhead", "PlayerUI/h_0.png"), t()
                        }
                    })
                },
                fail: e => {
                    console.log("***授权失败", e), localStorage.setItem("nickName", "Player"), localStorage.setItem("userhead", "PlayerUI/h_0.png"), t()
                }
            }) : (localStorage.setItem("nickName", "Player"), localStorage.setItem("userhead", "PlayerUI/h_0.png"), t())
        }
        static LoadSubpackage(t, e) {
            Laya.Browser.window.wx ? wx.loadSubpackage ? wx.loadSubpackage({
                name: t,
                success: t => {
                    console.log("分包加载成功", t), e()
                },
                fail: t => {
                    console.log("分包加载失败", t)
                }
            }) : (Laya.Browser.window.require(t + "/game.js"), Laya.timer.once(1e3, this, () => {
                e()
            })) : e()
        }
        static ShowToast(t = "", e = "none", i = 1500) {
            promptText(t)
        }
        static MoreGameLink_Old(t = "") {
            Laya.Browser.onWeiXin && (null == this.gameListData ? Laya.loader.load(C, Laya.Handler.create(this, () => {
                this.gameListData = Laya.loader.getRes(C), this.maxIndex = this.gameListData.data.length, "" != t && t == f && Laya.Browser.onAndroid && wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appid: t
                }) : (this.indexQR++, this.indexQR %= this.maxIndex, this.ShowQRCode(this.gameListData.data[this.indexQR].qrcode))
            })) : (this.indexQR++, this.indexQR %= this.maxIndex, this.ShowQRCode(this.gameListData.data[this.indexQR].qrcode)))
        }
        static MoreGameLink(t, e = "") {
            Laya.Browser.onWeiXin && ("" != e && wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                appId: e
            }) : this.ShowQRCode(t))
        }
        static ShowQRCode(t) {
            Laya.Browser.onWeiXin && wx.previewImage && wx.previewImage({
                current: null,
                urls: [t]
            })
        }
        static SetVibration(t = !0, e = null) {
            Laya.Browser.onWeiXin && (t ? wx.vibrateShort && wx.vibrateShort({
                success: () => {
                    e && e()
                }
            }) : wx.vibrateLong && wx.vibrateLong({
                success: () => {
                    e && e()
                }
            }))
        }
        static CreateRewardAd() {
            Laya.Browser.onWeiXin && wx.createRewardedVideoAd && (null == this.rewardAd && (this.rewardAd = wx.createRewardedVideoAd({
                adUnitId: k
            })), this.rewardAd.onLoad(() => {
                console.log("拉取视频成功"), this.isHasAd = !0
            }), this.rewardAd.onError(t => {
                console.log("拉取视频失败", t)
            }), this.rewardAd.onClose(t => {
                this.rewardAd_CallBack(t)
            }))
        }
        static rewardAd_CallBack(t) {
            if (console.log("用户点击了【关闭广告】按钮"), t && t.isEnded || void 0 === t) {
                switch (this.reword_index) {
                    case "five":
                        x.instance.GetFiveAward();
                        break;
                    case "relife":
                        w.instance.Relife();
                        break;
                    case "coin":
                        p.instance.GetRewardCoin();
                        break;
                    case "skin":
                        I.instance.GetRewardCoin();
                        break;
                    case "key":
                        B.instance.GetReword()
                }
                this.isHasAd = !1
            } else console.log("未看完广告"), this.isHasAd = !1, this.ShowToast("只有观看完整视频才能获得奖励哦", "none", 1500)
        }
        static RewordAD() {
            if (Laya.Browser.onWeiXin) {
                if ("" == this.netWorkType || "none" == this.netWorkType) return void this.ShowToast("暂无可播放的视频,请稍后再试!");
                if (wx.createRewardedVideoAd) {
                    if (!this.isHasAd) return wx.showToast({
                        title: "暂时没有可播放的广告，请稍后再试",
                        icon: "none",
                        duration: 1500
                    }), void(null != this.rewardAd ? this.rewardAd.onLoad() : this.CreateRewardAd());
                    this.rewardAd.show()
                }
            }
        }
        static onNetworkStatusChange() {
            Laya.Browser.window.wx && Laya.Browser.window.wx.onNetworkStatusChange && Laya.Browser.window.wx.onNetworkStatusChange(t => {
                console.log("当前是否有网络连接：", t.isConnected), console.log("网络类型：", t.networkType), console.log("在此可添加逻辑代码，并注释本行代码"), this.netWorkType = t.networkType
            })
        }
        static showVideoAd(t, e) {
            this.isHasAd && this.rewardAd && (this.rewardAd.show(), this.callBack_Success = t, this.callBack_Fail = e)
        }
        static ShowRewardAd(t, e = (() => {})) {
            if (Laya.Browser.onWeiXin) {
                if (!this.isHasAd) return;
                null != this.rewardAd && (this.rewardAd.show(), this.BGM_PAUSE("subPackage/audio/BGM.mp3"), this.rewardAd.onClose(i => {
                    this.rewardAd.offClose(), i && i.isEnded || void 0 === i ? (t(), this.isHasAd = !1) : (console.log("未看完广告"), this.isHasAd = !1, e()), t = (() => {}), this.BGM_PLAY("subPackage/audio/BGM.mp3")
                }))
            }
        }
        static CreateBanner() {
            if (Laya.Browser.onWeiXin && wx.createBannerAd) {
                if (null != this.bannerAd) return;
                this.bannerAd = wx.createBannerAd({
                    adUnitId: L,
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: 0,
                        width: Laya.Browser.width
                    }
                }), this.bannerAd.onError(t => {
                    console.log("banner 加载失败", t), this.ClearBanner()
                }), this.bannerAd.onLoad(t => {
                    console.log("banner 加载成功", t)
                }), this.bannerAd.onResize(t => {
                    this.bannerAd.style.left = (wx.getSystemInfoSync().screenWidth - this.bannerAd.style.realWidth) / 2, Laya.Browser.clientHeight / Laya.Browser.clientWidth > 2 && Laya.Browser.onIOS ? this.bannerAd.style.top = wx.getSystemInfoSync().screenHeight - 1.2 * this.bannerAd.style.realHeight : this.bannerAd.style.top = wx.getSystemInfoSync().screenHeight - this.bannerAd.style.realHeight
                }), Laya.Browser.clientHeight / Laya.Browser.clientWidth <= 1.34 && (Laya.Browser.clientHeight, Laya.Browser.clientWidth), this.bannerAd.style.width = 300, this.bannerAd.show()
            }
        }
        static ClearBanner() {
            Laya.Browser.onWeiXin && null != this.bannerAd && (this.bannerAd.destroy && this.bannerAd.destroy(), this.bannerAd = null)
        }
        static ShowBanner() {
            Laya.Browser.onWeiXin && (null != this.bannerAd ? this.bannerAd.show && this.bannerAd.show() : this.CreateBanner())
        }
        static HideBanner() {
            Laya.Browser.onWeiXin && null != this.bannerAd && (this.bannerAd.hide ? this.bannerAd.hide() : this.bannerAd.destroy && this.bannerAd.destroy())
        }
        static CreateGridAd() {
            if (Laya.Browser.onWeiXin)
                if (wx.createGridAd) {
                    if (console.log("开始创建格子广告"), null != this.gridAd) return;
                    this.gridAd = wx.createGridAd({
                        adUnitId: b,
                        adTheme: "white",
                        gridCount: 5,
                        style: {
                            left: 0,
                            top: 0,
                            width: 330,
                            opacity: .8
                        }
                    }), this.gridAd.onError(t => {
                        console.log("grid 加载失败", t), this.loadGrid = !1, this.ClearGrid()
                    }), this.gridAd.onLoad(t => {
                        console.log("grid 加载成功", t), this.loadGrid = !0
                    }), this.gridAd.onResize(t => {
                        this.gridAd.style.left = (wx.getSystemInfoSync().screenWidth - this.gridAd.style.realWidth) / 2, Laya.Browser.height / Laya.Browser.width > 2 && Laya.Browser.onIOS ? this.gridAd.style.top = wx.getSystemInfoSync().screenHeight - 1.3 * this.gridAd.style.realHeight : this.gridAd.style.top = wx.getSystemInfoSync().screenHeight - this.gridAd.style.realHeight
                    }), Laya.Browser.onIOS && Laya.Browser.clientHeight / Laya.Browser.clientWidth - 1.3 <= .04 ? this.gridAd.style.width = Laya.Browser.clientWidth / 2 : this.gridAd.style.width = Laya.Browser.clientWidth
                } else console.log("没有格子广告创建方法")
        }
        static ShowGrid() {
            Laya.Browser.onWeiXin && (wx.createGridAd ? null != this.gridAd ? this.loadGrid ? this.gridAd.show ? this.gridAd.show() : console.log("格子广告没有show方法") : this.ShowBanner() : (console.log("没有格子广告 重新创建"), this.CreateGridAd()) : this.ShowBanner())
        }
        static ClearGrid() {
            Laya.Browser.onWeiXin && null != this.gridAd && (this.gridAd.destroy && this.gridAd.destroy(), this.gridAd = null)
        }
        static HideGrid() {
            Laya.Browser.onWeiXin && (wx.createGridAd ? null != this.gridAd && (this.loadGrid ? this.gridAd.hide ? this.gridAd.hide() : this.gridAd.destroy && this.gridAd.destroy() : this.HideBanner()) : this.HideBanner())
        }
        static CreateInterstitial() {
            if (Laya.Browser.onWeiXin && wx.createInterstitialAd) {
                if (null != this.interstitialAd) return;
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: A
                }), this.interstitialAd.onError(t => {
                    console.log("interstitial 加载失败", t), this.ClearInterstitial()
                }), this.interstitialAd.onLoad(t => {
                    console.log("interstitial 加载成功", t)
                })
            }
        }
        static ClearInterstitial() {
            Laya.Browser.onWeiXin && null != this.interstitialAd && (this.interstitialAd.destroy && this.interstitialAd.destroy(), this.interstitialAd = null)
        }
        static ShowInterstitial() {
            Laya.Browser.onWeiXin && (null != this.interstitialAd ? this.interstitialAd.show && this.interstitialAd.show() : this.CreateInterstitial())
        }
        static Shake(t = !0) {
            Laya.Browser.onWeiXin && (t ? wx.vibrateShort({}) : wx.vibrateLong({}))
        }
        static PlayerSound(t) {
            if (!this.isMute && !this.isSoundMute)
                if (Laya.Browser.onWeiXin) switch (this.audioIndex++, this.audioIndex >= 5 && (this.audioIndex = 0), this.audioIndex) {
                    case 0:
                        null == this.wxAudio1 && (this.wxAudio1 = wx.createInnerAudioContext()), this.wxAudio1.src = t, this.wxAudio1.play();
                        break;
                    case 1:
                        null == this.wxAudio2 && (this.wxAudio2 = wx.createInnerAudioContext()), this.wxAudio2.src = t, this.wxAudio2.play();
                        break;
                    case 2:
                        null == this.wxAudio3 && (this.wxAudio3 = wx.createInnerAudioContext()), this.wxAudio3.src = t, this.wxAudio3.play();
                        break;
                    case 3:
                        null == this.wxAudio4 && (this.wxAudio4 = wx.createInnerAudioContext()), this.wxAudio4.src = t, this.wxAudio4.play();
                        break;
                    case 4:
                        null == this.wxAudio5 && (this.wxAudio5 = wx.createInnerAudioContext()), this.wxAudio5.src = t, this.wxAudio5.play()
                } else Laya.SoundManager.playSound(t)
        }
        static PlayBGM(t, e = !0) {
            this.isMute || this.isBGMMute || (Laya.Browser.onWeiXin ? (null == this.wxBGMAudio && (this.wxBGMAudio = wx.createInnerAudioContext()), this.wxBGMAudio.src = t, this.wxBGMAudio.loop = e, this.wxBGMAudio.play()) : Laya.SoundManager.playMusic(t))
        }
        static BGM_PAUSE(t) {
            this.isMute && (Laya.Browser.onWeiXin ? this.wxBGMAudio.pause() : Laya.SoundManager.stopMusic())
        }
        static BGM_PLAY(t) {
            this.isMute || (Laya.Browser.onWeiXin ? this.wxBGMAudio.play() : Laya.SoundManager.playMusic(t))
        }
        static LoadFont(t) {
            Laya.Browser.onWeiXin ? wx.loadFont && wx.loadFont(t) : Laya.loader.load(t, Laya.Handler.create(this, t => {
                console.log("*************", t)
            }), null, Laya.Loader.TTF)
        }
        static WxOnShow(t = null) {
            Laya.Browser.onWeiXin && wx.onShow && wx.onShow(t => {
                T.Instance().isOutStage && (T.Instance().isOutStage = !1, this.isSoundMute || a.Instance().gameState != e.Playing || U.instance.bgm && U.instance.gameInfoUI.visible && (console.log("playBgm"), U.instance.bgm.play()), (this.isSoundMute || a.Instance().gameState == e.OutPlaying || a.Instance().gameState == e.Pause) && U.instance && U.instance.bgm && U.instance.bgm.stop())
            })
        }
        static WxOnHide(t = null) {
            Laya.Browser.onWeiXin && wx.onHide && wx.onHide(e => {
                t && t(), T.Instance().isOutStage = !0
            })
        }
    }
    v.openDataContext = null, v.userInfo = null, v.gameListData = null, v.maxIndex = 0, v.indexQR = 0, v.rewardAd = null, v.isHasAd = !1, v.bannerAd = null, v.interstitialAd = null, v.gridAd = null, v.wxAudio1 = null, v.wxAudio2 = null, v.wxAudio3 = null, v.wxAudio4 = null, v.wxAudio5 = null, v.wxBGMAudio = null, v.isSoundMute = !1, v.isBGMMute = !1, v.isMute = !1, v.reword_index = "", v.audioIndex = 0, v.loadGrid = !1, v.miniGameIndex = 0, v.isFirstShare = !0, v.shareWords = ["多人跳绳比赛马上要开始了！", "快来看看你能击败几个对手！", "每天跳一跳，健康生活一整天！", "魔性运动小游戏，根本停不下来！"], v.callBack_Success = null, v.callBack_Fail = null;
    class U extends Laya.Script {
        constructor() {
            super(), this._timerTween = new Laya.Tween, this._timerIndex = 0, this._keys_array = [], this._hasTween = new Laya.Tween, this._pauseTimer = new Laya.Timer, this.bgm = null, U.instance = this
        }
        onAwake() {
            this.gameInfoUI = this.owner, this._uiBox = this.gameInfoUI.getChildAt(0), this.playerState = this._uiBox.getChildByName("playerState"), this.gameState = this._uiBox.getChildByName("gameState"), this._timerCircle = this._uiBox.getChildByName("timer_circle"), this._timeImg = this._timerCircle.getChildByName("time"), this._has_bg = this._uiBox.getChildByName("has_bg"), this._has_img = this._has_bg.getChildByName("count_img"), this._boxLine = this._uiBox.getChildByName("boxLine"), this._box_bg = this._boxLine.getChildByName("boxBg"), this._box = this._box_bg.getChildAt(0);
            for (let t = 0; t < 3; t++) {
                let e = this._boxLine.getChildAt(t);
                this._keys_array.push(e)
            }
        }
        onStart() {
            Laya.Browser.onWeiXin && (this.bgm = wx.createInnerAudioContext(), this.bgm.src = "subPackage/sub2/Sound/bgm.mp3", this.bgm.loop = !0, this.bgm.stop());
            this.gameInfoUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth;
            this.ReSet()
        }
        onUpdate() {
            this.gameState.text = "游戏状态：" + a.Instance().gameState, this.playerState.text = "玩家状态：" + a.Instance().playerState
        }
        ShowGameInfoUI(t) {
            this.gameInfoUI.visible || (this.gameInfoUI.visible = !0, this.ShowStartTimer(t))
        }
        ShowStartTimer(t) {
            if (this._timerTween.clear(), 0 == this._timerIndex) return this._timerCircle.visible = !1, null != this.bgm && (v.isSoundMute || this.bgm.play()), a.Instance().gameState = e.Playing, void this.UpdateBoxLine();
            this._timeImg.skin = "StartUI/timer_" + (this._timerIndex - 1) + ".png", this._timeImg.scaleX = 1, this._timeImg.scaleY = 1, this._timeImg.alpha = 1, this._timerIndex -= 1, this._timerTween.to(this._timeImg, {
                scaleX: 1.15,
                scaleY: 1.15,
                alpha: .7
            }, 1e3, null, Laya.Handler.create(this, this.ShowStartTimer))
        }
        HideGameInfoUI() {
            this.gameInfoUI.visible && (this.gameInfoUI.visible = !1, console.log("hide gameinfoUI"), this.ReSet())
        }
        UpdatePlayerCount() {
            this._has_img.skin = "StartUI/p_" + s.Instance().player_count + ".png", this._hasTween.clear(), this._pauseTimer.clearAll(this), this._hasTween.to(this._has_bg, {
                left: 0
            }, 300, Laya.Ease.circOut, Laya.Handler.create(this, () => {
                s.Instance().player_count > 3 ? this._pauseTimer.once(1e3, this, () => {
                    this._hasTween.clear(), this._hasTween.to(this._has_bg, {
                        left: -165
                    }, 300, Laya.Ease.circOut)
                }) : (this._hasTween.clear(), this._pauseTimer.clearAll(this))
            })), s.Instance().player_count <= 1 && !P.instance.isFall && (a.Instance().playerState = i.Win, N.instance.LineStopTween(), console.log("win"))
        }
        UpdateBoxLine() {
            this._boxLine.visible = !0, "" == localStorage.getItem("key") || null == localStorage.getItem("key") || null == localStorage.getItem("key") ? localStorage.setItem("key", "0") : s.Instance().key_count = Number(localStorage.getItem("key"));
            var t = s.Instance().key_count;
            for (let t = 0; t < this._keys_array.length; t++) this._keys_array[t].skin = "StartUI/key_no.png";
            this._box_bg.skin = "StartUI/box_no_bg.png", this._box.skin = "StartUI/box_normol.png", 1 == t ? this._keys_array[0].skin = "StartUI/key_has.png" : 2 == t ? (this._keys_array[0].skin = "StartUI/key_has.png", this._keys_array[1].skin = "StartUI/key_has.png") : t >= 3 && (this._keys_array[0].skin = "StartUI/key_has.png", this._keys_array[1].skin = "StartUI/key_has.png", this._keys_array[2].skin = "StartUI/key_has.png", this._box_bg.skin = "StartUI/box_has_bg.png", this._box.skin = "StartUI/box_canOpen.png")
        }
        ReSet() {
            this.gameInfoUI.visible = !1, this._timerIndex = 4, this._timerCircle.visible = !0, this._timeImg.skin = "StartUI/timer_3.png", this._has_bg.left = -165, this._has_img.skin = "StartUI/p_8.png", this._boxLine.visible = !1
        }
    }
    U.instance = null;
    class P extends Laya.Script3D {
        constructor() {
            super(), this._exp_timer = new Laya.Timer, this._hatArray = [], this.jump_a = 0, this.jump_speed = 0, this.isJump = !1, this.speed_y = 0, this.jumpVec = new Laya.Vector3(0, 0, 0), this.isTaunt = !1, P.instance = this
        }
        onAwake() {
            this._player = this.owner, this._man = this._player.getChildByName("man"), this.vir_man = this._man.getChildByName("Virtual_Man_0"), this._expression = this._man.getChildByName("Expression"), this._exp_mat = this._expression.meshRenderer.material, this._man_mat = this.vir_man.skinnedMeshRenderer.material, this._hats = this._man.getChildByName("QuickRigCharacter_Reference").getChildByName("QuickRigCharacter_Hips").getChildByName("QuickRigCharacter_Spine").getChildByName("QuickRigCharacter_Spine1").getChildByName("QuickRigCharacter_Spine2").getChildByName("QuickRigCharacter_Neck").getChildByName("QuickRigCharacter_Head").getChildByName("hats");
            for (let t = 0; t < this._hats.numChildren; t++) {
                let e = this._hats.getChildAt(t);
                e.active = !1, this._hatArray.push(e)
            }
            this._playerAnimator = this._man.getComponent(Laya.Animator), this._animatorLayer = this._playerAnimator.getControllerLayer(), this.rig = this._player.getComponent(Laya.Rigidbody3D), this.ResetPlayer()
        }
        onStart() {
            this.vir_man.skinnedMeshRenderer.castShadow = !0, Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnMouseDown), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnMouseUp)
        }
        onUpdate() {
            Laya.timer.delta > 100 || a.Instance().gameState != e.OutPlaying && a.Instance().gameState != e.Pause && (this.isJump ? (this.speed_y -= this.jump_a, this.jumpVec.setValue(0, this.speed_y, 0), this._player.transform.translate(this.jumpVec), this._player.transform.localPosition.y < .218 && (this._player.transform.localPosition.y = .218, this.isFall || this.PlayAnima("idel"), this.isJump = !1, a.Instance().gameState == e.Teaching ? (h.instance.ShowGoodWord(), Laya.timer.once(600, this, () => {
                h.instance.HideTeachUI()
            }), a.Instance().playerState = i.Win) : this.ChangePlayerExpression(1), a.Instance().playerState == i.Win && this.PlayerWin(), a.Instance().playerState = i.Ground, T.Instance().PlaySound("fall"), v.SetVibration(), a.Instance().isLineCross && (s.Instance().score_num += 1, a.Instance().isLineCross = !1))) : a.Instance().playerState == i.Win && (this.PlayerWin(), a.Instance().playerState = i.Idel))
        }
        onCollisionEnter(t) {
            console.log(t)
        }
        onTriggerEnter(t) {}
        OnMouseUp() {}
        OnMouseDown() {
            a.Instance().gameState == e.OutPlaying || this.isFall || a.Instance().gameState == e.Pause || this.isJump || (this.speed_y = this.jump_speed, this.isJump = !0, a.Instance().playerState = i.Jump, this.PlayAnima("jump"), console.log("jump"))
        }
        PlayAnima(t) {
            switch (t) {
                case "idel":
                    "idel" != this._animatorLayer._currentPlayState.name && (this._playerAnimator.speed = 1, this._playerAnimator.play("idel"));
                    break;
                case "fall":
                    "fall" != this._animatorLayer._currentPlayState.name && (this._playerAnimator.speed = 1, this._playerAnimator.play("fall"), sdk.showBanner(),sdk.showBanner());
                    break;
                case "jump":
                    "jump" != this._animatorLayer._currentPlayState.name && (this._playerAnimator.speed = 1.6, this._playerAnimator.play("jump"));
                    break;
                case "win":
                    "win" != this._animatorLayer._currentPlayState.name && (this._playerAnimator.speed = 1, this._playerAnimator.play("win"))
            }
        }
        PlayerFail() {
            this.isFall && (a.Instance().gameState = e.OutPlaying, this.ChangePlayerExpression(3), s.Instance().relifeCount < 1 ? w.instance.ShowRelifeUI() : (T.Instance().PlaySound("lose"), U.instance.HideGameInfoUI(), x.instance.ShowGameOverUI(!1)), this.isFall = !1)
        }
        PlayerWin() {
            console.log("playerwin"), a.Instance().gameState = e.OutPlaying, this.PlayAnima("win"), T.Instance().PlaySound("win"), s.Instance().key_count += 1, localStorage.setItem("key", String(s.Instance().key_count)), U.instance.UpdateBoxLine(), Laya.timer.once(1200, this, () => {
                U.instance.HideGameInfoUI(), x.instance.ShowGameOverUI(!0), s.Instance().key_count >= 3 && B.instance.ShowBoxUI()
            })
        }
        PlayerAddForce() {
            console.log("addForce");
            var t = new Laya.Vector3(10, -2, 0);
            this.rig.applyImpulse(t, null), this.rig.applyTorqueImpulse(t)
        }
        Relife() {
            this.ResetPlayer(), a.Instance().gameState = e.Playing, s.Instance().relifeCount += 1, s.Instance().player_count += 1, U.instance.UpdatePlayerCount(), v.isSoundMute || (U.instance.bgm.stop(), U.instance.bgm.play())
        }
		
        ChangeModelColor(t) {
            console.log("改变肤色"), t >= s.Instance().colorArray.length || (console.log("改变  ", t), this._man_mat.albedoColor = s.Instance().colorArray[t])
        }
        ChangeHatModel(t) {
            if (!(t >= this._hatArray.length + 1)) {
                for (let t = 0; t < this._hatArray.length; t++) this._hatArray[t].active = !1;
                0 != t && (this._hatArray[t - 1].active = !0)
            }
        }
        ChangePlayerExpression(t) {
            var e = Math.random();
            if (1 == t) {
                if (Math.random() > .5) return;
                if (this.isTaunt) return;
                this._exp_timer.clearAll(this), this._exp_mat.albedoTexture = e < .33 ? s.Instance().expressionTexts[0] : e >= .33 && e < .66 ? s.Instance().expressionTexts[1] : s.Instance().expressionTexts[2]
            } else if (2 == t) {
                if (this.isTaunt) return;
                this.isTaunt = !0, this._exp_timer.clearAll(this), this._exp_mat.albedoTexture = e < .33 ? s.Instance().expressionTexts[3] : e >= .33 && e < .66 ? s.Instance().expressionTexts[4] : s.Instance().expressionTexts[5]
            } else {
                if (3 != t) return;
                this._exp_timer.clearAll(this), this._exp_mat.albedoTexture = e < .33 ? s.Instance().expressionTexts[6] : e >= .33 && e < .66 ? s.Instance().expressionTexts[7] : s.Instance().expressionTexts[8]
            }
            this._expression.active = !0, this._exp_timer.once(1e3, this, () => {
                this._expression.active = !1, this.isTaunt && (this.isTaunt = !1)
            })
        }
        ResetPlayer() {
            this._expression.active = !1, this.jump_a = .005, this.jump_speed = .09, this.speed_y = 0, this._player.transform.position.y = .218, this.isJump = !1, this.isFall = !1, this.jumpVec.setValue(0, 0, 0), this.PlayAnima("idel"), a.Instance().playerState = i.Idel, this.ChangeModelColor(s.Instance().color_index), this.ChangeHatModel(s.Instance().hat_index)
        }
    }
    P.instance = null;
    class M extends Laya.Script3D {
        constructor() {
            super()
        }
        onAwake() {
            this.lineCube = this.owner
        }
        onStart() {}
        onTriggerExit(t) {
            "scoreCube" == t.owner.name && (a.Instance().isLineCross = !0)
        }
        onTriggerEnter(t) {
            var o = t.owner;
            if ("player" == o.name && this.lineCube.transform.position.y > -.1 && this.lineCube.transform.position.y < .0355 && !P.instance.isFall && a.Instance().playerState != i.Win && s.Instance().player_count > 1 && a.Instance().gameState == e.Playing && (Laya.timer.once(150, this, () => {
                    N.instance.LineStopTween()
                }), v.SetVibration(), P.instance.isFall = !0, P.instance.PlayAnima("fall"), T.Instance().AITaunt(), Laya.timer.once(1500, this, () => {
                    P.instance.PlayerFail()
                }), T.Instance().PlaySound("lineTouch"), s.Instance().player_count > 0 && (s.Instance().player_count -= 1, U.instance.UpdatePlayerCount())), "AI" == o.name.substring(0, 2) && this.lineCube.transform.position.y > -.1 && this.lineCube.transform.position.y < .0355) {
                let t = o.getComponent(n);
                t.AI_state == i.Fail || P.instance.isFall || a.Instance().gameState != e.Playing || (t.AI_state = i.Fail, t.isFall = !0, t.PlayAnima("fall"), P.instance.ChangePlayerExpression(2), t.AIFail(), s.Instance().player_count > 0 && (s.Instance().player_count -= 1, U.instance.UpdatePlayerCount()), T.Instance().AITaunt())
            }
            if ("jumpCube" == o.name) {
                var r = T.Instance().AI_CtrlArray;
                for (let t = 0; t < r.length; t++) r[t].AI_Jump()
            }
        }
    }
    class N extends Laya.Script3D {
        constructor() {
            super(), this.rotSpeed = new Laya.Vector3(0, 0, .055), this.stopTween = new Laya.Tween, N.instance = this
        }
        onAwake() {
            this.line = this.owner, this.cord = this.line.getChildByName("cord"), this.lineCube = this.line.getChildAt(0).getChildAt(0), this.lineCube.addComponent(M), console.log(this.line.transform.localRotationEuler, "euler")
        }
        onStart() {}
        onUpdate() {
            a.Instance().gameState == e.Playing && this.line.transform.rotate(this.rotSpeed)
        }
        LineStopTween() {
            this.stopTween.clear(), this.stopTween.to(this.line.transform, {
                localRotationEulerZ: 70
            }, 600, null, Laya.Handler.create(this, () => {
                this.stopTween.to(this.line.transform, {
                    localRotationEulerZ: 32
                }, 800, null)
            }))
        }
        ReSet() {
            this.line.transform.localRotationEulerZ = 32, console.log(this.cord, "cord"), this.cord.meshRenderer.castShadow = !0
        }
    }
    N.instance = null;
    class T {
        constructor() {
            this.AI_Array = [], this.AI_CtrlArray = [], this.plane_array = [], this.isOutStage = !1, this.isStartPannel = !1, this.share_index = "", this.isCompleteLoad = !1, this.shareWords = ["多人跳绳比赛马上要开始了！", "快来看看你能击败几个对手！", "每天跳一跳，健康生活一整天！", "魔性运动小游戏，根本停不下来！"]
        }
        static Instance() {
            return null == this._instance && (this._instance = new T), this._instance
        }
        SetGameUI(t) {
            this.gameUI = t, this.LoadMainScene3D()
        }
        LoadMainScene3D() {
            Laya.loader.create("subPackage/LayaScene_main/Conventional/main.ls", Laya.Handler.create(this, this.onComplete_load))
        }
        onComplete_load() {
            this.scene_main = Laya.loader.getRes("subPackage/LayaScene_main/Conventional/main.ls"), Laya.stage.getChildByName("root").addChild(this.scene_main), this.SetLocalData(), this.directLight = this.scene_main.getChildByName("Directional Light"), this.SetLight(), this.SetPlaneModel(), this.scene_main.zOrder = 0, this.scene_main.ambientColor = new Laya.Vector3(.7, .7, .7), this.gameUI.zOrder = 1, this.sceneCtrl = t.Instance(), this.sceneCtrl.SetScene(this.scene_main), this.camera = this.sceneCtrl.GetCamera(), this.camera.enableHDR = !1, this.cameraCtrl = this.camera.addComponent(o), this.skinStoreModel = this.sceneCtrl.GetSkinStoreModel(), this.skinStoreModelCtrl = this.skinStoreModel.addComponent(u), this.frontBox = this.scene_main.getChildByName("boxFront"), this.behindBox = this.scene_main.getChildByName("boxBehind"), this.AI_Array = this.sceneCtrl.GetAI_Array();
            for (let t = 0; t < this.AI_Array.length; t++) {
                let e = this.AI_Array[t].addComponent(n);
                this.AI_CtrlArray.push(e), s.Instance().CtrlArray[t] = e
            }
            this.player = this.sceneCtrl.GetPlayer(), this.playerCtrl = this.player.addComponent(P), this.line = this.sceneCtrl.GetLine(), this.lineCtrl = this.line.addComponent(N), this.plane_array = this.sceneCtrl.GetPlaneArray(), s.Instance().InitExpressionTextures(), this.ChooseGamePlane(0), this.isCompleteLoad = !0, this.Reset()
        }
        ShowAI() {
            for (let t = 0; t < this.AI_Array.length; t++) s.Instance().CtrlArray[t].AI.active = !0
        }
        Reset() {
            s.Instance().player_count = 6, s.Instance().relifeCount = 0, s.Instance().score_num = 0, a.Instance().gameState = e.OutPlaying, a.Instance().playerState = i.Idel, P.instance.ResetPlayer(), o.instance.ReSet(), N.instance.ReSet();
            for (let t = 0; t < this.AI_Array.length; t++) s.Instance().CtrlArray[t].ReSet();
            this.ResetScene()
        }
        SetLocalData() {
            v.PostMessage({
                cmd: "SaveData",
                dataName: "Kerry_Data1",
                dataRes: "0"
            }), "" != localStorage.getItem("teach") && null != localStorage.getItem("teach") && null != localStorage.getItem("teach") || localStorage.setItem("teach", "0"), "" == localStorage.getItem("level") || null == localStorage.getItem("level") || null == localStorage.getItem("level") ? localStorage.setItem("level", "0") : s.Instance().level = Number(localStorage.getItem("level")), "" == localStorage.getItem("coin") || null == localStorage.getItem("coin") || null == localStorage.getItem("coin") ? localStorage.setItem("coin", "0") : s.Instance().coin_count = Number(localStorage.getItem("coin")), "" == localStorage.getItem("win") || null == localStorage.getItem("win") || null == localStorage.getItem("win") ? localStorage.setItem("win", "0") : s.Instance().win_count = Number(localStorage.getItem("win")), "" == localStorage.getItem("hat") || null == localStorage.getItem("hat") || null == localStorage.getItem("hat") ? localStorage.setItem("hat", "0") : s.Instance().hat_index = Number(localStorage.getItem("hat")), "" == localStorage.getItem("color") || null == localStorage.getItem("color") || null == localStorage.getItem("color") ? localStorage.setItem("color", "0") : s.Instance().color_index = Number(localStorage.getItem("color")), "" == localStorage.getItem("key") || null == localStorage.getItem("key") || null == localStorage.getItem("key") ? localStorage.setItem("key", "0") : s.Instance().key_count = Number(localStorage.getItem("key")), "" != localStorage.getItem("gameCount") && null != localStorage.getItem("gameCount") && null != localStorage.getItem("gameCount") || localStorage.setItem("gameCount", "0")
        }
        PlaySound(t) {
            "button" == t ? Laya.SoundManager.playSound("subPackage/sub2/Sound/button.mp3") : "fall" == t ? Laya.SoundManager.playSound("subPackage/sub2/Sound/fall.mp3") : "lineTouch" == t ? Laya.SoundManager.playSound("subPackage/sub2/Sound/lineTouch.mp3") : "win" == t ? Laya.SoundManager.playSound("subPackage/sub2/Sound/win.mp3") : "lose" == t && Laya.SoundManager.playSound("subPackage/sub2/Sound/lose.mp3")
        }
        ShareMessage() {
            var t = Math.random(),
                e = t < .25 ? 1 : t < .5 ? 2 : t < .75 ? 3 : 4;
            v.ShareGame("subPackage/sub2/shareimg" + String(e) + ".jpg", this.shareWords[e - 1])
        }
        ResetScene() {
            this.behindBox.active = !1, this.frontBox.active = !1, this.line.active = !1, this.ChooseGamePlane(0)
        }
        SetStartScene() {
            this.behindBox.active = !0, this.frontBox.active = !0, this.line.active = !0, this.ChooseGamePlane(s.Instance().level)
        }
        ChooseGamePlane(t) {
            let e = t % 5;
            for (let t = 0; t < this.plane_array.length; t++) this.plane_array[t].active = !1;
            this.plane_array[e].active = !0
        }
        AITaunt() {
            for (let t = 0; t < this.AI_CtrlArray.length; t++) this.AI_CtrlArray[t].ChangeAIExpression(2)
        }
        SetLight() {
            this.directLight && (this.directLight.shadow = !0, this.directLight.intensity = .5, this.directLight.shadowDistance = 40, this.directLight.shadowResolution = 4096, this.directLight.shadowPCFType = 1, this.directLight.shadowPSSMCount = 1, this.directLight.lightmapBakedType = 1)
        }
        SetPlaneModel() {
            var t = this.scene_main.getChildByName("scenes"),
                e = t.getChildAt(0),
                i = t.getChildAt(1),
                a = t.getChildAt(2).getChildAt(0),
                s = t.getChildAt(3).getChildAt(0),
                n = t.getChildAt(4).getChildAt(2);
            e.meshRenderer.receiveShadow = !0, i.meshRenderer.receiveShadow = !0, a.meshRenderer.receiveShadow = !0, s.meshRenderer.receiveShadow = !0, n.meshRenderer.receiveShadow = !0
        }
    }
    T._instance = null;
    class G extends Laya.Script {
        constructor() {
            super()
        }
        onAwake() {
            this.LaunchController()
        }
        LaunchController() {
            T.Instance().SetGameUI(this.owner)
        }
    }
    class H extends Laya.Script {
        constructor() {
            super()
        }
        onAwake() {
            this.gameLogo = this.owner.getChildByName("gameIcon")
        }
        onStart() {
            this.gameLogo.on(Laya.Event.CLICK, this, this.atClickCallBack)
        }
        atClickCallBack() {
            if (console.log("点击事件"), "none" == l.Instance().networkType) return console.log("当前无网络"), void(Laya.Browser.window.wx && wx.showToast && Laya.Browser.window.wx.showToast({
                title: "网络状态不好，请稍后再试",
                icon: "none",
                duration: 2e3
            }));
            l.Instance().navigateToMiniProgramByIndex(Number(this.gameLogo.skin.split(".")[0].substring(18)))
        }
    }
    class R extends Laya.Button {
        constructor() {
            super()
        }
        onEnable() {
            this.on(Laya.Event.MOUSE_DOWN, this, this.ToSmall), this.on(Laya.Event.MOUSE_UP, this, this.ToBig), this.on(Laya.Event.MOUSE_OUT, this, this.ToBig)
        }
        ToSmall() {
            T.Instance().PlaySound("button"), Laya.Tween.to(this, {
                scaleX: .9,
                scaleY: .9
            }, 200)
        }
        ToBig() {
            Laya.Tween.to(this, {
                scaleX: 1,
                scaleY: 1
            }, 200)
        }
    }
    class D extends Laya.Script {
        constructor() {
            super(), this.inArr = [0, 1, 2, 3, 4, 5, 6, 7, 8], this.outArr = [9], this.refreshTime = 4e3
        }
        onAwake() {
            this.gameBoxSixPanel = this.owner, this.gameBoxSixList = this.gameBoxSixPanel.getChildAt(0)
        }
        onStart() {
            this.setgameBoxListData(), Laya.timer.once(this.refreshTime, this, () => {
                this.refreshList_Random()
            })
        }
        setgameBoxListData() {
            var t = [];
            for (let e = 0; e < this.inArr.length; e++) t.push({
                gameIcon: {
                    skin: "GameBoxUI/gameIcon" + String(this.inArr[e]) + ".png"
                }
            });
            this.gameBoxSixList.dataSource = t, this.gameBoxSixList.refresh()
        }
        navigateToMiniGame(t, e) {
            if ("none" == l.Instance().networkType) return console.log("当前无网络"), void(Laya.Browser.window.wx && wx.showToast && Laya.Browser.window.wx.showToast({
                title: "网络状态不好，请稍后再试",
                icon: "none",
                duration: 2e3
            }));
            Laya.Browser.window.wx && Laya.Browser.window.wx.navigateToMiniProgram && Laya.Browser.window.wx.navigateToMiniProgram({
                appId: t,
                success: () => {
                    this.updateArrData(e)
                },
                fail: () => {
                    this.updateArrData(e)
                }
            })
        }
        updateArrData(t) {
            var e = 0;
            for (let i = 0; i < this.inArr.length; i++)
                if (this.inArr[i] == t) {
                    e = i;
                    break
                }
            var i = this.outArr.shift();
            this.outArr.push(this.inArr.splice(e, 1, i)[0]), this.setgameBoxListData()
        }
        refreshList_Random() {
            var t = this.inArr[Math.floor(Math.random() * Math.floor(this.inArr.length / 2))],
                e = this.inArr[Math.floor((Math.random() + 1) * Math.floor(this.inArr.length / 2))];
            t %= this.inArr.length, e %= this.inArr.length;
            var i = this.inArr[t];
            this.inArr[t] = this.inArr[e], this.inArr[e] = i, this.setgameBoxListData(), Laya.timer.once(this.refreshTime, this, () => {
                this.refreshList_Random()
            })
        }
    }
    class E extends Laya.Script {
        constructor() {
            super(), this.gameBoxNineCtrl = null
        }
        onAwake() {
            this.gameIcon = this.owner, this.gameBoxNineCtrl = this.gameIcon.parent.parent.parent.parent.getComponent(D)
        }
        onStart() {
            this.gameIcon.on(Laya.Event.CLICK, this, this.gameIconClick)
        }
        gameIconClick() {
            if ("none" == l.Instance().networkType) return console.log("当前无网络"), void(Laya.Browser.window.wx && wx.showToast && Laya.Browser.window.wx.showToast({
                title: "网络状态不好，请稍后再试",
                icon: "none",
                duration: 2e3
            }));
            var t = Number(this.gameIcon.skin.split(".")[0].substring(18));
            this.gameBoxNineCtrl.navigateToMiniGame(l.Instance().miniGameAppids[t], t)
        }
    }
    class O extends Laya.Script {
        onAwake() {
            O.instance = this, this.headimg = this.owner, this.nowtime = Date.now()
        }
        onUpdate() {
            "head" == this.headimg.name && ("LoadPlayerUI/HeadLoading.png" == this.headimg.skin ? this.headimg.rotation += 8 : this.headimg.rotation = 0)
        }
    }
    class W extends Laya.Script {
        constructor() {
            super(...arguments), this.index = 0
        }
        onEnable() {
            this.img = this.owner, this.index = 0
        }
        onStart() {}
        onUpdate() {
            "0" == this.img.name ? (this.index += .1, this.index >= 2 * Math.PI && (this.index = 0), this.img.pos(5 * Math.sin(this.index - Math.PI) - 16, 30 + 5 * Math.cos(this.index))) : (Math.sin(this.index - (Number(this.img.name) - 1) / 13) < 0 ? this.index += .03 : this.index += .2, this.index >= 1.3 * Math.PI && (this.index = 0), Number(this.img.name) < 11 ? this.img.y = 10 - this.Mathclamp(20 * Math.sin(this.index - (Number(this.img.name) - 1) / 13), 0, 20) : this.img.y = 46 - this.Mathclamp(20 * Math.sin(this.index - (Number(this.img.name) - 1) / 13), 0, 20))
        }
        Mathclamp(t, e, i) {
            return t < e ? e : t > i ? i : t
        }
    }
    class J extends Laya.Script {
        constructor() {
            super()
        }
        onAwake() {
            this.skin = this.owner
        }
        SkinClick() {
            I.instance.ChooseSkinImgClick(this.skin)
        }
        onEnable() {
            this.skin.on(Laya.Event.CLICK, this, this.SkinClick)
        }
    }
    class V extends Laya.Script {
        constructor() {
            super(), this.aniType = 0, this.maxAniType = 3, this.aniTime = 0, this.aniTimeInterval = .15, this.aniIndex = 0, this.maxAniIndex = 8, this.time_changeAni = 4e3
        }
        onAwake() {
            this.iconBtn_type3 = this.owner, this.gameIcon = this.iconBtn_type3.getChildByName("gameIcon"), this.gameName = this.iconBtn_type3.getChildByName("gameName")
        }
        onEnable() {
            this.iconBtn_type3.on(Laya.Event.CLICK, this, this.iconBtn_type3_Click), this.gameIcon.skin = "GameBoxUI/Ani/AniType" + String(this.aniType) + "/aniImg" + String(this.aniIndex) + ".png", this.gameName.text = "立即去玩", this.maxAniType = l.Instance().frameAni_Num.length, this.maxAniIndex = l.Instance().frameAni_Num[this.aniType], this.aniTimeInterval = l.Instance().frameAni_Time[this.aniType], Laya.timer.once(this.time_changeAni, this, () => {
                this.changeAniType()
            })
        }
        onUpdate() {
            this.aniTime += Laya.timer.delta / 1e3 > .02 ? .02 : Laya.timer.delta / 1e3, this.aniTime >= this.aniTimeInterval && (this.aniTime = 0, this.aniIndex++, this.aniIndex %= this.maxAniIndex, this.gameIcon.skin = "GameBoxUI/Ani/AniType" + String(this.aniType) + "/aniImg" + String(this.aniIndex) + ".png")
        }
        changeAniType() {
            this.aniType++, this.aniType %= this.maxAniType, this.maxAniIndex = l.Instance().frameAni_Num[this.aniType], this.aniTimeInterval = l.Instance().frameAni_Time[this.aniType], Laya.timer.once(this.time_changeAni, this, () => {
                this.changeAniType()
            })
        }
        iconBtn_type3_Click() {
            l.Instance().navigateToMiniProgramByAppid(l.Instance().miniGameAppids[l.Instance().miniAppid_FrameAni[this.aniType]])
        }
    }
    class j extends Laya.Script {
        constructor() {
            super(), this.imgs = [], this.moveDir = -1, this.moveTime = 500, this.moveTimeInterval = 2e3, this._myLeft = 0, this._MyLeftInterval = 0
        }
        onAwake() {
            this.guessYouLikePanel = this.owner, this.uiBox = this.guessYouLikePanel.getChildAt(0);
            for (let t = 0; t < this.uiBox.numChildren; t++) this.imgs.push(this.uiBox.getChildAt(t)), this.imgs[t].on(Laya.Event.CLICK, this, this.targetItemClick)
        }
        onStart() {
            var t = this.guessYouLikePanel.scaleX;
            this.guessYouLikePanel.parent && this.guessYouLikePanel.scale(1 + t - this.guessYouLikePanel.parent.scaleX, 1 + t - this.guessYouLikePanel.parent.scaleX), this._myLeft = 15, this._MyLeftInterval = (this.guessYouLikePanel.width - 30 - 555) / 4 + 111, this.initBox(), Laya.timer.once(this.moveTimeInterval, this, () => {
                this.setTween()
            })
        }
        onUpdate() {
            for (let t = 1; t < this.imgs.length; t++) this.imgs[t].left = this.imgs[0].left + this._MyLeftInterval * t
        }
        setTween() {
            if (1 == this.moveDir) {
                var t = this.imgs.pop();
                this.imgs.unshift(t), this.imgs[0].left = this._myLeft - this._MyLeftInterval
            }
            var e = this.moveDir > 0 ? this._myLeft : this._myLeft - this._MyLeftInterval;
            Laya.Tween.to(this.imgs[0], {
                left: e
            }, 500, null, Laya.Handler.create(this, () => {
                if (this.imgs[0].left = this._myLeft, -1 == this.moveDir) {
                    var t = this.imgs.shift();
                    this.imgs.push(t)
                }
                Laya.timer.once(this.moveTimeInterval, this, () => {
                    this.setTween()
                })
            }))
        }
        initBox() {}
        targetItemClick(t) {
            console.log("点击对象：", t.target.name), t && -1 != t.target.name.search("game") && l.Instance().navigateToMiniProgramByIndex(Number(t.target.getChildAt(0).skin.split(".")[0].substring(18)))
        }
    }
    class F extends Laya.Script {
        constructor() {
            super()
        }
        onAwake() {
            this.item = this.owner
        }
        onStart() {
            this.item.on(Laya.Event.CLICK, this, this.ItemClick)
        }
        ItemClick() {
            "BoxUI/box.png" == this.item.skin && B.instance.BoxItemClick(this.item)
        }
    }
    class X extends Laya.Script {
        constructor() {
            super(), this.cube_array = [], this.lineProgress = 0, this.isLoadComplete = !1, this.isEnterGame = !0, this.isLoad = !1, this.isSubSuccess = !1, this.isSubSuccess_1 = !1, this.isSubSuccess_2 = !1
        }
        onAwake() {
            this.loadUI = this.owner, this.uiBox = this.loadUI.getChildAt(0), this.loadCube = this.uiBox.getChildByName("loadCube");
            for (let t = 0; t < this.loadCube.numChildren; t++) {
                let e = this.loadCube.getChildAt(t);
                e.skin, this.cube_array.push(e)
            }
            this.isLoad = !0, this.uiBox.removeSelf()
        }
        onStart() {
            v.WxOnShow(), v.WxOnHide(), v.ShowShareMenu(), v.CreateRewardAd(), v.CreateBanner(), v.HideBanner(), v.CreateGridAd(), v.HideGrid(), v.CreateInterstitial(), v.LoadSubpackage("subPackage2", () => {
                this.isSubSuccess_2 = !0, this.completeSubpackage()
            }), v.LoadSubpackage("subPackage", () => {
                this.isSubSuccess_1 = !0, this.completeSubpackage()
            }), this.loadUI.addChild(this.uiBox);
            this.loadUI.width, Laya.Browser.clientHeight, Laya.Browser.clientWidth
        }
        onUpdate() {
            this.isLoad && this.loadUI.visible && (this.lineProgress < 570 ? this.lineProgress += 20 : Laya.Browser.onWeiXin ? this.isSubSuccess && (this.lineProgress += 3) : this.lineProgress += 3, this.lineProgress >= 64.5 && this.lineProgress < 129 ? this.cube_array[0].skin = "LoadUI/on.png" : this.lineProgress >= 129 && this.lineProgress < 193.5 ? this.cube_array[1].skin = "LoadUI/on.png" : this.lineProgress >= 193.5 && this.lineProgress < 258 ? this.cube_array[2].skin = "LoadUI/on.png" : this.lineProgress >= 258 && this.lineProgress < 322.5 ? this.cube_array[3].skin = "LoadUI/on.png" : this.lineProgress >= 322.5 && this.lineProgress < 387 ? this.cube_array[4].skin = "LoadUI/on.png" : this.lineProgress >= 387 && this.lineProgress < 451.5 ? this.cube_array[5].skin = "LoadUI/on.png" : this.lineProgress >= 451.5 && this.lineProgress < 516 ? this.cube_array[6].skin = "LoadUI/on.png" : this.lineProgress >= 516 && this.lineProgress < 580.5 ? this.cube_array[7].skin = "LoadUI/on.png" : this.lineProgress >= 580.5 && this.lineProgress < 645 ? this.cube_array[8].skin = "LoadUI/on.png" : this.lineProgress >= 645 && (this.cube_array[9].skin = "LoadUI/on.png"), this.lineProgress >= 600 && T.Instance().isCompleteLoad && this.EnterGame())
        }
        EnterGame() {
            this.isEnterGame && (console.log("enterGame"), this.isEnterGame = !1, this.uiBox.removeSelf(), this.loadUI.visible = !1, this.isLoad = !1, Laya.Scene.close(Y.startScene), S.instance.ShowStartUI())
        }
        completeSubpackage() {
            this.isSubSuccess_1 && this.isSubSuccess_2 && (Laya.Scene.open("GameScenes/GameUI.scene", !1), this.isSubSuccess = !0)
        }
    }
    class K extends Laya.Script {
        constructor() {
            super(), this.indexNum = 0
        }
        onAwake() {
            this.iconBtn_type1 = this.owner, this.gameIcon = this.iconBtn_type1.getChildByName("gameIcon"), this.gameName = this.iconBtn_type1.getChildByName("gameName")
        }
        onStart() {
            this.iconBtn_type1.on(Laya.Event.CLICK, this, this.iconBtn_type1_Click), this.changeSkin()
        }
        changeSkin() {
            this.gameIcon.skin = "GameBoxUI/gameIcon" + String(this.indexNum) + ".png", this.gameName.text = l.Instance().gameNames[this.indexNum], this.indexNum++, this.indexNum %= 10, Laya.timer.once(3e3, this, () => {
                this.changeSkin()
            })
        }
        iconBtn_type1_Click() {
            if ("none" == l.Instance().networkType) return console.log("当前无网络"), void(Laya.Browser.window.wx && wx.showToast && Laya.Browser.window.wx.showToast({
                title: "网络状态不好，请稍后再试",
                icon: "none",
                duration: 2e3
            }));
            l.Instance().navigateToMiniProgramByIndex(Number(this.gameIcon.skin.split(".")[0].substring(18)))
        }
    }
    class Q extends Laya.Script {
        constructor() {
            super(), this.iconBtns = [], this.inArrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
        onAwake() {
            this.selfBox = this.owner;
            for (let t = 0; t < this.selfBox.numChildren; t++) this.Breathed(this.selfBox.getChildAt(t).getChildAt(1)), this.iconBtns.push(this.selfBox.getChildAt(t)), this.selfBox.getChildAt(t).getChildAt(0).skin = "GameBoxUI/gameIcon" + String(t) + ".png";
            this.inArrs.splice(0, this.selfBox.numChildren)
        }
        onStart() {
            for (let t = 0; t < this.iconBtns.length; t++) this.iconBtns[t].getChildAt(0).on(Laya.Event.CLICK, this, this.iconImgClick)
        }
        iconImgClick(t) {
            if (console.log(t.target.name), "none" == l.Instance().networkType) return console.log("当前无网络"), void(Laya.Browser.window.wx && wx.showToast && Laya.Browser.window.wx.showToast({
                title: "网络状态不好，请稍后再试",
                icon: "none",
                duration: 2e3
            }));
            var e = Number(t.target.skin.split(".")[0].substring(18));
            l.Instance().navigateToMiniProgramByIndex(e, () => {
                this.inArrs.push(e), e = this.inArrs.shift(), t.target.skin = "GameBoxUI/gameIcon" + String(e) + ".png"
            })
        }
        Breathed(t) {
            Laya.Tween.to(t, {
                scaleX: 1.05,
                scaleY: 1.05
            }, 900, null, Laya.Handler.create(this, () => {
                this.Breath(t)
            }))
        }
        Breath(t) {
            Laya.Tween.to(t, {
                scaleX: .9,
                scaleY: .9
            }, 900, null, Laya.Handler.create(this, () => {
                this.Breathed(t)
            }))
        }
    }
    class Y {
        constructor() {}
        static init() {
            var t = Laya.ClassUtils.regClass;
            t("script/GameUI.ts", G), t("script/MoreGameManager/UIManager/GameBoxItem.ts", H), t("script/MoreGameManager/UIManager/GameBoxUICtrl.ts", c), t("script/UIManager/TeachUICtrl.ts", h), t("script/Component/BtnScalChange.ts", R), t("script/MoreGameManager/UIManager/GameBoxNineItemClick.ts", E), t("script/MoreGameManager/UIManager/GameBoxNineCtrl.ts", D), t("script/UIManager/GameOverUICtrl.ts", x), t("script/UIManager/RankUICtrl.ts", d), t("script/Component/HeadRotate.ts", O), t("script/Component/WordJumpCtrl.ts", W), t("script/UIManager/LoadPlayerUICtrl.ts", r), t("script/UIManager/CoinUICtrl.ts", p), t("script/Component/goldani.ts", _), t("script/Component/SkinImgChoose.ts", J), t("script/UIManager/SkinStoreUICtrl.ts", I), t("script/UIManager/GameInfoUICtrl.ts", U), t("script/UIManager/RelifeUICtrl.ts", w), t("script/MoreGameManager/UIManager/IconBtn_Type3_Ctrl.ts", V), t("script/MoreGameManager/UIManager/GuessYouLikeCtrl_2_0.ts", j), t("script/UIManager/StartUICtrl.ts", S), t("script/Component/BoxItemCtrl.ts", F), t("script/UIManager/BoxUICtrl.ts", B), t("script/UIManager/LoadUICtrl.ts", X), t("script/MoreGameManager/UIManager/IconBtn_Type1_Ctrl.ts", K), t("script/MoreGameManager/UIManager/IconBtn_Type2_Ctrl.ts", Q)
        }
    }
    Y.width = 750, Y.height = 1334, Y.scaleMode = "fixedwidth", Y.screenMode = "none", Y.alignV = "top", Y.alignH = "center", Y.startScene = "GameScenes/Load.scene", Y.sceneRoot = "", Y.debug = !1, Y.stat = !1, Y.physicsDebug = !1, Y.exportSceneToJson = !0, Y.init(), new class {
        constructor() {
            window.Laya3D ? Laya3D.init(Y.width, Y.height) : Laya.init(Y.width, Y.height, Laya.WebGL), Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(), Laya.stage.scaleMode = Y.scaleMode, Laya.stage.screenMode = Y.screenMode, Laya.stage.alignV = Y.alignV, Laya.stage.alignH = Y.alignH, Laya.URL.exportSceneToJson = Y.exportSceneToJson, Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL, Laya.stage.screenMode = Laya.Stage.SCREEN_NONE, Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE, Laya.stage.alignH = Laya.Stage.ALIGN_CENTER, (Y.debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(), Y.physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(), Y.stat && Laya.Stat.show(), Laya.alertGlobalError = !0, Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION)
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded))
        }
        onConfigLoaded() {
            Y.startScene && Laya.Scene.open(Y.startScene), GDAdsInstance.adsAsyncInit().then(() => {})
        }
    }
}();