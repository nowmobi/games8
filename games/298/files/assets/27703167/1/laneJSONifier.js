var LaneJsonifier = pc.createScript('laneJsonifier');

pc.extend(LaneJsonifier.prototype, {

    initialize: function() {

        // Safeguard against placement in other scenes
        if (document.URL.toString().indexOf('653189') === 0) this.entity.destroy();

        this.floatPrecision = 2;

        // Strings are case-insensitive and return true if present anywhere in name

        this.rotationals = [

            'Building4m', 'Building6m', 'Building8m', 'Building10m', 'Building12m',

            'canopyLeft', 'canopyRight', 'canopyCenter', 'Fence2x',

            'Cars10m', 'Deco10m', 'decoCars10m',

            'Bus8m4m', 'Bus16m4m', 'Car4m2m', 'MovingTrain', 'MovingCar',
        ];

        this.prefabs = [

            'Building4m', 'Building6m', 'Building8m', 'Building10m', 'Building12m',

            'Bins', 'Crates', 'Engine', 'FoodCart', 'Gate', 'Ladder', 'Market',

            'Reticule', 'SatDish', 'Scaffold', 'Sign',

            'Canopy',

            'SlidingPlayer',

            'Cars10m', 'Deco10m', 'decoCars10m',

            'Fence2x', 'Fence3x',

            'obstacleDuck', 'obstacleDuckWarn', 'obstacleWarn', 'obtstacleHurdle', 'obstacleJump',

            'HugoCoin', 'Letter', 'Loot', 'Magnet', 'PowerJump', 'Prize', 'Shield', 'WingSuit',

            '2mSteps', '4mSteps', '6mSteps', '8mSteps',

            'Bus8m4m', 'Bus16m4m', 'Car4m2m', 'Ramp8m4m', 'MovingTrain', 'MovingCar',

            'Tutorial Step', 'Tutorial_End', 'Respawn'
        ];

        this.specials4x = [

            'Letter', 'Magnet', 'PowerJump', 'Shield', 'WingSuit'
        ];

        this.specials3x = [

            'Bins', 'Crates', 'Ladder'
        ];

        this.layers = [

            'Decoration Layer', 'Obstacle Layer', 'Item Layer', 'Event Layer', 'Group', 'Part'
        ];

        this.prefabRegex = this.prefabs.join('|').toLowerCase();
        this.rotationalRegex = this.rotationals.join('|').toLowerCase();
        this.layerRegex = this.layers.join('|').toLowerCase();

        this.specials3xRegex = this.specials3x.join('|').toLowerCase();
        this.specials4xRegex = this.specials4x.join('|').toLowerCase();

        this.createJSON();
        this.app.destroy();
    },

    createJSON: function() {

        this.traverseNode(this.entity, this.jsonScene = {});
        this.calculatePool(this.jsonScene);
        this.setLaneLengths(this.jsonScene);
        var json = JSON.stringify(this.jsonScene);

        // Download scene
        window.location.href = window.URL.createObjectURL(new Blob([json], {
            type: 'octet/stream'
        }));
        console.log(this.jsonScene, json);
    },

    traverseNode: function(entity, graph) {

        var hasChildNodes = false;

        var isPrefab = (entity.graphDepth > 5) && pc.util.strHasWord(entity.name.toLowerCase(), this.prefabRegex);
        var isLayer = pc.util.strHasWord(entity.name.toLowerCase(), this.layerRegex);
        var isEvent = (entity.graphDepth > 3) && entity.name === 'Event Layer';

        var branch = isLayer ? graph : (graph[entity.name] || (graph[entity.name] = {}));

        for (var i = 0;
            (i < entity.children.length) && !isPrefab; i += 1) {

            // child 'entity' is a modelNode
            if (entity.children[i].name === 'RootNode') continue;
            else hasChildNodes = true;

            this.traverseNode(entity.children[i], branch);
        }

        if (!isPrefab && !isLayer && !hasChildNodes) console.warn(entity, 'leaf node is not a prefab!', entity.parent.name);
        if (isPrefab && !isLayer && !isEvent) this.addLeaf(entity, graph);

        if (isEvent && this.grandMa(entity).script) {
            if (this.grandMa(entity).script.roadEvents) this.grandMa(entity).script.roadEvents.addEvents(graph, this);
            if (this.grandMa(entity).script.tunnelEvents) this.grandMa(entity).script.tunnelEvents.addEvents(graph, this);
        }
    },

    addLeaf: function(entity, graph) {

        if (!entity.enabled) return;

        var isRotational = pc.util.strHasWord(entity.name.toLowerCase(), this.rotationalRegex);
        if (entity.name === 'HugoCoin' && entity.parent.name === 'CoinGroup') {
            console.log("test")
            this.addToGraph(graph, entity.name,
                entity.getPosition().x + entity.parent.getPosition().x,
                entity.getPosition().y + entity.parent.getPosition().y,
                entity.getLocalPosition().x + entity.parent.getPosition().z,
                isRotational ? entity.getEulerAngles().x : 0,
                isRotational ? entity.getEulerAngles().y : 0,
                isRotational ? entity.getEulerAngles().z : 0);
        } else if (entity.name === 'canopyLeft') {
            this.addToGraph(graph, entity.name,
                entity.getPosition().x,
                entity.getPosition().y,
                entity.getLocalPosition().x,
                isRotational ? entity.getEulerAngles().x : 0,
                isRotational ? entity.getEulerAngles().y : 0,
                isRotational ? entity.getEulerAngles().z : 0);

        } else {
            this.addToGraph(graph, entity.name,
                entity.getPosition().x,
                entity.getPosition().y,
                entity.getLocalPosition().x,
                isRotational ? entity.getEulerAngles().x + this.entity.children[0].getEulerAngles().x : 0,
                isRotational ? entity.getEulerAngles().y + this.entity.children[0].getEulerAngles().y : 0,
                isRotational ? entity.getEulerAngles().z + this.entity.children[0].getEulerAngles().z : 0);
        }

    },

    addToGraph: function(graph, name, posX, posY, posZ, eulX, eulY, eulZ) {

        if (!graph[name].length) {
            graph[name] = [];
        }

        graph[name].push({

            p: {
                x: +(posX.toFixed(this.floatPrecision)),
                y: +(posY.toFixed(this.floatPrecision)),
                z: +(posZ.toFixed(this.floatPrecision)),
            },

            r: {
                x: +(eulX.toFixed(this.floatPrecision)),
                y: +(eulY.toFixed(this.floatPrecision)),
                z: +(eulZ.toFixed(this.floatPrecision)),
            }

        });
    },

    grandMa: function(entity) {
        if (entity.graphDepth < 4) return null;
        return entity.parent.parent;
    },

    calculatePool: function(json) {

        var poolObjSize = {},
            poolTempSize = {};

        // Traverses AREAS in JSON
        for (var key_1 in json)
            for (var key_2 in json[key_1])
                for (var key_3 in json[key_1][key_2]) {

                    // Reset temporary pool size
                    for (var k in poolTempSize) poolTempSize[k] = 0;

                    // Traverses OBJECTS in LANES
                    for (var key_4 in json[key_1][key_2][key_3])
                        for (var key_5 in json[key_1][key_2][key_3][key_4]) {

                            var keyIsPrefab = pc.util.strHasWord(key_5.toLowerCase(), this.prefabRegex);
                            if (!keyIsPrefab) console.warn(key_5, 'is not a prefab!');

                            poolTempSize[key_5] += json[key_1][key_2][key_3][key_4][key_5].length;
                        }

                    // Update maximum poolsize for lane
                    for (var z in poolTempSize) {
                        if (!!!poolObjSize[z] || (poolTempSize[z] > poolObjSize[z])) poolObjSize[z] = poolTempSize[z];
                    }
                }

        // Multiply poolSize maxActive lanes (not all lanes have maximum of said object)
        for (var o in poolObjSize) {
            if (pc.util.strHasWord(o.toLowerCase(), this.specials4xRegex)) poolObjSize[o] *= 4;
            else if (pc.util.strHasWord(o.toLowerCase(), this.specials3xRegex)) poolObjSize[o] *= 3;
            else poolObjSize[o] *= 2;
        }

        Object.assign(this.jsonScene.Stats = {}, poolObjSize);
    },

    setLaneLengths: function(json) {
        var laneStats = {};
        for (var key_1 in json)
            for (var key_2 in json[key_1])
                for (var key_3 in json[key_1][key_2]) {
                    if (!!!laneStats[key_2]) laneStats[key_2] = {};
                    laneStats[key_2][key_3] = this.app.root.findByName(key_3).script.laneStats.laneLength;
                }

        Object.assign(this.jsonScene.LaneLengths = {}, laneStats);
    }
});