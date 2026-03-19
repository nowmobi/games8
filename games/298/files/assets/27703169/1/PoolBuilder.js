var PoolBuilder = pc.createScript('poolBuilder');

pc.extend(PoolBuilder.prototype, {

    initialize: function() {
        this.accDeltaTime = 0;
        pc.poolBuilder = this;
        this.gameTracks = this.app.assets.find('gameTracks').resource;
        this.entity.enabled = true;
        this.poolObjects = {};
        this.poolIndexes = {};
        this.poolArray = [];
        this.itemArray = [];

        this.allocatePools();

        this.app.on('saveMeManager:continue', this.clearLane, this);
    },

    doUpdate: function(dt) {
        if ((this.accDeltaTime += dt) > 1) {
            this.accDeltaTime = 0;
            this.hideObjects();
        }

        this.doItemCollision();
    },

    addCallbacks: function(ctx, cbOnReset, cbOnDisable) {

        if (ctx.entity.parent.name !== 'instance')
            console.warn('poolBuilder: callback of', ctx.entity, 'is not an instance');

        ctx.entity.parent.poolCB = {};
        ctx.entity.parent.poolCB.ctx = ctx;
        ctx.entity.parent.poolCB.onReset = cbOnReset;
        ctx.entity.parent.poolCB.onDisable = cbOnDisable;
    },

    allocatePools: function() {

        this.poolObjects = {};

        for (var i = 0; i < this.entity.children.length; i += 1) {
            for (var j = 0; j < this.entity.children[i].children.length; j += 1) {

                var innerChild = this.entity.children[i].children[j].name;
                var gameObject = this.entity.children[i].children[j].children[0];

                if (gameObject.name !== 'instance') console.warn(this.entity.name, gameObject, 'is not an instance');
                if (this.poolObjects[innerChild]) console.warn(this.entity.name, innerChild, 'pool was already created');

                if (this.gameTracks.Stats[innerChild] === undefined) {
                    if (pc.util.EXPLICIT) console.info('PoolBuilder: unused -', innerChild);
                }

                for (var r = 0; r < gameObject.children.length; r += 1) {
                    if (gameObject.children[r].rigidbody) {
                        gameObject.children[r].rigidbody.group = pc.util.COLL_MASK_SCENERY;
                        gameObject.children[r].rigidbody.mask = 1 | pc.util.COLL_MASK_PLAYER | pc.util.COLL_MASK_BALL;
                    }
                }

                this.poolObjects[innerChild] = [];

                for (var k = 0; k < (this.gameTracks.Stats[innerChild] || 1); k += 1) {

                    this.poolObjects[innerChild].push(!k ? gameObject : gameObject.clone());
                    this.poolObjects[innerChild][k].enabled = false;
                    this.poolObjects[innerChild][k].reparent(gameObject.parent);
                    this.poolObjects[innerChild][k].setPosition(100, 0, 0);
                    this.poolArray.push(this.poolObjects[innerChild][k]);
                }

                if (this.entity.children[i].name === 'Bullseye') {
                    this.entity.children[i].script.targetManager.addTargets(this.poolObjects[innerChild]);
                }

                if (pc.util.strHasWord(innerChild, 'Loot|Letter|HugoCoin|Magnet|Invincible|DoubleTarget|DoubleCoin')) {
                    this.itemArray = this.itemArray.concat(this.poolObjects[innerChild]);
                }

                this.poolIndexes[innerChild] = 0;
            }
        }

        this.resetState();
    },

    verifyTracks: function(streetsList, streets) {

        // Existing route is not in gameTracks
        for (var i = 0; i < streetsList.length; i += 1) {

            if (streetsList[i].street === 'name') continue;
            var areaName = streets[streetsList[i].area].name;
            var laneName = streets[streetsList[i].area][streetsList[i].street].lane;

            if (!!!this.gameTracks.Root[areaName] || !!!this.gameTracks.Root[areaName][laneName]) {
                console.error('poolBuilder: unavailable (' + areaName + ', ' + laneName + ')');
            }
        }

        for (var area in this.gameTracks.Root) {
            for (var lane in this.gameTracks.Root[area]) {
                var isReachable = false;
                for (var j = 0; j < streetsList.length; j += 1) {

                    if (streetsList[j].street === 'name') continue;
                    var areaCode = streets[streetsList[j].area].name;
                    var laneCode = streets[streetsList[j].area][streetsList[j].street].lane;

                    if ((areaCode === area) && (laneCode === lane)) {
                        isReachable = true;
                    }
                }
                if (!isReachable) console.warn('poolBuilder: unused (' + area + ', ' + lane + ')');
            }
        }

    },

    resetState: function() {

        for (var key in this.poolObjects) {
            for (var i = 0; i < this.poolObjects[key].length; i += 1) {
                this.poolObjects[key][i].enabled = false;
            }
        }
    },

    activateLane: function(areaId, laneId, pos) {
        if (!!!this.gameTracks.Root[areaId] || !!!this.gameTracks.Root[areaId][laneId]) {
            console.error(this.entity.name + ': invalid lane properties (' + areaId + ', ' + laneId + ')');
            return;
        }

        var difficulty = pc.gameManager.getLaneLevel();

        this.activateObjects(this.gameTracks.Root[areaId][laneId].Easy, pos);
        if (difficulty > 0) this.activateObjects(this.gameTracks.Root[areaId][laneId].Medium, pos);
        if (difficulty > 1) this.activateObjects(this.gameTracks.Root[areaId][laneId].Hard, pos);
    },

    activateObjects: function(objs, pos) {

        for (var key in objs) {
            for (var i = 0; i < objs[key].length; i += 1) {

                if (!!!this.poolObjects[key]) {
                    console.warn('PoolBuilder: no pool exists for', key);
                    continue;
                }

                //var o = this.poolObjects[key][this.poolObjects[key].push(this.poolObjects[key].shift())-1];
                var o = this.poolObjects[key][(this.poolIndexes[key] += 1) % this.poolObjects[key].length];
                if (!!!o) continue;

                o.setPosition(pos + objs[key][i].p.x,
                    objs[key][i].p.y, -objs[key][i].p.z);

                o.setLocalEulerAngles(
                    objs[key][i].r.x,
                    objs[key][i].r.y,
                    objs[key][i].r.z);

                o.enabled = true;

                this.doCallback(o, 'onReset');

            }
        }
    },

    hideObjects: function() {
        for (var i = 0; i < this.poolArray.length; i += 1) {
            if (this.poolArray[i].enabled && this.getObjectIsOOB(this.poolArray[i])) {
                this.doCallback(this.poolArray[i], 'onDisable');
                this.poolArray[i].enabled = false;
            }
        }
    },

    clearLane: function() {
        for (var i = 0; i < this.poolArray.length; i += 1) {
            if (this.poolArray[i].enabled && this.getObjectIsClose(this.poolArray[i])) {
                this.doCallback(this.poolArray[i], 'onDisable');
                this.poolArray[i].enabled = false;
            }
        }
    },

    doItemCollision: function() {

        var playerPos = pc.playerEntity.getPosition();
        var itemPos = null;

        for (var i = 0; i < this.itemArray.length; i += 1) {

            if (!this.itemArray[i].enabled) continue;

            itemPos = this.itemArray[i].getPosition();
            if (Math.abs(itemPos.x - playerPos.x) > 1.6) continue;
            if (Math.abs(itemPos.z - playerPos.z) > 1.6) continue;
            if (Math.abs(itemPos.y - playerPos.y) > 1.6) continue;

            if (this.itemArray[i].children[0].itemScript) this.itemArray[i].children[0].itemScript.onCollision();
        }
    },

    getObjectIsClose: function(entity) {
        return entity.getPosition().x + 50 > pc.gameCamera.entity.getPosition().x;
    },

    getObjectIsOOB: function(entity) {
        return entity.getPosition().x - 25 > pc.gameCamera.entity.getPosition().x;
    },

    getLaneLength: function(areaLane) {
        return this.gameTracks.LaneLengths[areaLane[0]][areaLane[1]];
    },

    doCallback: function(entity, cb) {
        if (entity.poolCB && entity.poolCB[cb]) {
            entity.poolCB[cb].call(entity.poolCB.ctx);
        }
    }

});