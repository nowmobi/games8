var RouteBuilder = pc.createScript('routeBuilder');

//
// RouteBuilder - Builds a complete route for trackBuilder
//

pc.extend(RouteBuilder.prototype, {

    initialize: function() {

        // Create universal access point
        pc.routeBuilder = this;

        this.trackList = [];
        // console.log(this.trackList)

        this.trackIsBuild = false;
        this.trackMode = "Create"; // TrackMode Create/Receive (use designated function calls)
        this.totalTrackSize = 256;

        // TODO?: Setup lanes using poolbuilder? more safe -> less accesible, depends on future routeBuilder

        this.streets = {
            main: {
                name: 'MAIN',
                starter1: 'STARTER_1',
                starter2: 'STARTER_2',
                footballer1: 'FOOTBALLER_1',
                spacer1: 'SPACER_1',
                spacer4: 'SPACER_4',
                roofrunner11: 'ROOFRUNNER_11',
                dynamic3lane100m1: 'DYNAMIC-3_LANE_100M_1',
                dynamic3lane100m2: 'DYNAMIC-3_LANE_100M_2',
                dynamic3lane100m3: 'DYNAMIC-3_LANE_100M_3',
                main1: 'MAIN_1',
                market1: 'MARKET_1',
                target1: 'TARGET_1',
                target2: 'TARGET_2',
                target3: 'TARGET_3',
                scaffold1: 'SCAFFOLD_1',
                vertical3: 'VERTICAL_3',
                simpelvertical1: 'SIMPLEVERTICAL1',
            },
            park: {
                name: 'PARK',
                starter1: 'STARTER_1',
                starter2: 'STARTER_2',
                starter3: 'STARTER_3',
                target1: 'PARK_TARGETS_1',
                target2: 'PARK_TARGETS_2',
            },
            tunnel: {
                name: 'TUNNEL',
                starter1: 'STARTER_1',
                tunnel2: 'TUNNEL_2',
                //tunnel3: 'TUNNEL_3',
                tunnel4: 'TUNNEL_4',
                tunnel5: 'TUNNEL_5',
                tunnel6: 'TUNNEL_6',
                tunnel7: 'TUNNEL_7',
                tunnel8: 'TUNNEL_8',
            },
            road: {
                name: 'CROSSROAD',
                starter1: 'STARTER_1',
                dynamic3lane100m4: 'DYNAMIC-3_LANE_100M_4',
                traffic1: 'TRAFFIC_1',
                crossingTrain2: 'CROSSING_TRAIN_2',
                //crossingTrain3: 'CROSSING_TRAIN_3',
                crossingTrain4: 'CROSSING_TRAIN_4',
                crossingTrain5: 'CROSSING_TRAIN_5',
                crossingTrain6: 'CROSSING_TRAIN_6',
                crossingTrain7: 'CROSSING_TRAIN_7',
            },
            tutorial: {
                name: 'MAIN',
                tutorialSwipe: 'TUTORIALSWIPE',
                tutorialKick: 'TUTORIALKICK'
            }
        };

        this.streetsList = [];

        // Initialize streets (put areaName into street -> ['areaName', 'laneName'])
        for (var area in this.streets) {
            var areaName = this.streets[area].name;
            for (var street in this.streets[area]) {
                var streetName = this.streets[area][street];
                this.streets[area][street] = {
                    area: areaName,
                    lane: streetName
                };

                if (typeof(this.streets[area][street]) === 'object') {
                    this.streetsList.push({
                        area: area,
                        street: street
                    });
                }
            }
            this.streets[area].name = areaName;
        }
    },

    postInitialize: function() {
        if (pc.util.DEBUG) pc.poolBuilder.verifyTracks(this.streetsList, this.streets);
    },

    setTrackModeCreate: function() {
        this.trackMode = "Create";
    },

    setTrackModeReceive: function() {
        this.trackMode = "Receive";
    },

    /*
     * This method is not used yet, it wikll be used to create a new track depening on the data it will get as parameters
     */
    buildTrack: function(trackList, callback, context) {
        this.createTrack(trackList, callback, context);
    },

    getTrackList: function() {
        this.createTrack(); //TODO FIX: Dont create a new track when other instances want to get tracklist

        if (this.trackList.length < 16) {
            console.warn("ROUTEBUILDER: call to getTrackList() but track is empty!");
        }
        return this.trackList;
    },

    //
    // Create regular track - returns the renewed tracklist
    //

    createTrack: function(trackList, callback, context) {
        this.resetTrackList();
        if (this.trackMode == "Receive") {
            //console.log("Calling receive in create Track");
            this.createTrackReceive(trackList, callback, context);
        } else {
            //console.log("Calling create in create Track");
            this.createTrackSelf(callback, context);
        }
    },

    createTrackReceive: function(trackList, callback, context) {
        // Receive the track
        // Make sure to return it in this function!!!
        this.trackList = pc.challengeGameManager.challengeTrackList;
        if (callback) {
            callback.call(context);
        }

    },

    createTrackSelf: function(callback, context) {

        //
        // Custom routes for testing (Be sure to remove it later!)
        //

        //
        // Starter Track routes
        //

        if (pc.gameManager.tutorial && !pc.gameManager.isInChallengeMode()) {
            this.addRoute(this.streets.tutorial.tutorialSwipe);
            this.addRoute(this.streets.tutorial.tutorialKick);
        }


        switch (pc.util.nextInt(2)) {
            case 0:
                this.addRoute(this.streets.main.starter1);
                break;
            case 1:
                this.addRoute(this.streets.main.starter2);
                break;
        }

        switch (pc.util.nextInt(2)) {
            case 0:
                this.addRoute(this.streets.main.footballer1);
                break;
            case 1:
                this.addRoute(this.streets.main.spacer4);
                break;
        }

        switch (pc.util.nextInt(3)) {
            case 0:
                this.addRoute(this.streets.tunnel.starter1);
                break;
            case 1:
                this.addRoute(this.streets.tunnel.tunnel2);
                break;
            case 2:
                this.addRoute(this.streets.main.roofrunner11);
                break;
        }

        switch (pc.util.nextInt(3)) {
            case 0:
                this.addRoute(this.streets.park.starter1);
                break;
            case 1:
                this.addRoute(this.streets.main.spacer4);
                break;
            case 2:
                this.addRoute(this.streets.main.dynamic3lane100m1);
                break;
        }

        //
        // Building a track
        //
        for (var i = 0; i < Math.floor(this.totalTrackSize / 5) - 1; i += 1) {
            this.addRandomRoutePack();
        }

        if (callback) {
            callback.call(context);
        }

        // Return the trackList
        return this.trackList;

    },

    addRandomRoutePack: function() {
        switch (pc.util.nextInt(5)) {
            case 0:
                this.addRandomAreaRoute(this.streets.park);
                this.addRandomAreaRoute(this.streets.road);
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.tunnel);
                break;
            case 1:
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.road);
                this.addRandomAreaRoute(this.streets.tunnel);
                break;
            case 2:
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.road);
                this.addRandomAreaRoute(this.streets.tunnel);
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.park);
                break;
            case 3:
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.park);
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.main);
                break;
            case 4:
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.tunnel);
                this.addRandomAreaRoute(this.streets.main);
                this.addRandomAreaRoute(this.streets.park);
                this.addRandomAreaRoute(this.streets.main);
                break;
        }
    },

    addRandomAreaRoute: function(area) {
        var keys = Object.keys(area);
        var rIndex = 0;

        keys.shift();
        if (area.name === "MAIN") {
            keys.shift();
            keys.shift();
        }

        // Some routes will be skipped because of rng (placed behind eachother)
        // This adds some variation, so its not a problem

        rIndex = Math.floor(Math.random() * keys.length);
        this.addRoute(area[keys[rIndex]]);
    },

    addRandomRoute: function() {
        var legitStreet = true;
        var rIndex = 0;

        do {
            legitStreet = true;
            rIndex = Math.floor(Math.random() * this.streetsList.length);

            // Invalid: Lane is a starter lane
            if (this.streetsList[rIndex].area === "main" && (this.streetsList[rIndex].street == "starter1" || this.streetsList[rIndex].street == "starter2")) {
                legitStreet = false;
            }

            // Valid: add street to routes
            if (legitStreet) {
                this.addRoute(this.streets[this.streetsList[rIndex].area][this.streetsList[rIndex].street]);
            }
        } while (!legitStreet);
    },

    addRoute: function(street) {

        //console.log(street)
        if (!!!street || !!!street.area || !!!street.lane) {
            console.error("this: invalid route detected.");
            return;
        }

        this.trackList.push([street.area, street.lane]);
    },

    resetTrackList: function() {
        if (this.trackList === undefined || this.trackList === null) {
            return;
        }

        this.trackList.splice(0, this.trackList.length);
    }

});