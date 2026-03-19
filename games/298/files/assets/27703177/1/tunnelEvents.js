var TunnelEvents = pc.createScript('tunnelEvents');

//
//  TunnelEvents - Preconfigure area events
//

TunnelEvents.attributes.add('highwayCars', {
    type: 'number',
    enum: [{
            NO_CARS: 0
        },
        {
            LEFT_LANE_FREE: 1
        },
        {
            MID_LANE_FREE: 2
        },
        {
            RIGHT_LANE_FREE: 3
        },
        {
            ALL_LANE_FREE: 4
        }
    ]
});

TunnelEvents.attributes.add('leftTunnel', {
    type: 'number',
    enum: [{
            NO_TRAIN: 0
        },
        {
            EARLY_TRAIN: 1
        },
        {
            LATE_TRAIN: 2
        }
    ]
});

TunnelEvents.attributes.add('midTunnel', {
    type: 'number',
    enum: [{
            NO_TRAIN: 0
        },
        {
            EARLY_TRAIN: 1
        },
        {
            LATE_TRAIN: 2
        }
    ]
});

TunnelEvents.attributes.add('rightTunnel', {
    type: 'number',
    enum: [{
            NO_TRAIN: 0
        },
        {
            EARLY_TRAIN: 1
        },
        {
            LATE_TRAIN: 2
        }
    ]
});

pc.extend(TunnelEvents.prototype, {

    addEvents: function(graph, laneJSONifier) {

        if (!this.leftTunnel && !this.midTunnel && !this.rightTunnel) return;

        // Object might or might not already exist in lane
        if (!graph.MovingTrain) graph.MovingTrain = [];
        if (!graph.MovingCar) graph.MovingCar = [];

        if (this.leftTunnel) {
            laneJSONifier.addToGraph(graph, 'MovingTrain', -100 + (this.leftTunnel > 1 ? 22 : 10), -0.08, 3,
                0, -90, 0
            );
            this.leftTunnel = 0;
        }

        if (this.midTunnel) {
            laneJSONifier.addToGraph(graph, 'MovingTrain', -100 + (this.midTunnel > 1 ? 22 : 10), -0.08, 0,
                0, -90, 0
            );
            this.midTunnel = 0;
        }

        if (this.rightTunnel) {
            laneJSONifier.addToGraph(graph, 'MovingTrain', -100 + (this.rightTunnel > 1 ? 22 : 10), -0.08, -3,
                0, -90, 0
            );
            this.rightTunnel = 0;
        }

        this.frontLaneDepth = -57;
        this.backLaneDepth = -62.5;
        this.roadHeight = 6.2;
        this.offsetToMiddle = 48.75;
        this.laneVelWidth = 16;

        //this.highwayCars = 2;

        switch (this.highwayCars) {

            // No Cars
            case 0:
                break;

                // Left Lane Free
            case 1:
                {
                    laneJSONifier.addToGraph(graph, 'MovingCar',
                        this.frontLaneDepth, this.roadHeight, this.offsetToMiddle + 8,
                        0, 180, 0
                    );
                    laneJSONifier.addToGraph(graph, 'MovingCar',
                        this.backLaneDepth, this.roadHeight, -this.offsetToMiddle - 4,
                        0, 0, 0
                    );
                }
                break;

                // Mid Lane Free
            case 2:
                {
                    laneJSONifier.addToGraph(graph, 'MovingCar',
                        this.frontLaneDepth, this.roadHeight, this.offsetToMiddle + 4,
                        0, 180, 0
                    );
                    laneJSONifier.addToGraph(graph, 'MovingCar',
                        this.backLaneDepth, this.roadHeight, -this.offsetToMiddle,
                        0, 0, 0
                    );
                }
                break;

                // Right Lane Free
            case 3:
                {
                    laneJSONifier.addToGraph(graph, 'MovingCar',
                        this.frontLaneDepth, this.roadHeight, this.offsetToMiddle + 6,
                        0, 180, 0
                    );
                    laneJSONifier.addToGraph(graph, 'MovingCar',
                        this.backLaneDepth, this.roadHeight, -this.offsetToMiddle + 2,
                        0, 0, 0
                    );
                }
                break;

                // All Lane Free
            case 4:
                {
                    laneJSONifier.addToGraph(graph, 'MovingCar',
                        this.frontLaneDepth, this.roadHeight, this.offsetToMiddle - 4,
                        0, 180, 0
                    );
                    laneJSONifier.addToGraph(graph, 'MovingCar',
                        this.backLaneDepth, this.roadHeight, -this.offsetToMiddle + 4,
                        0, 0, 0
                    );
                }
                break;
        }

        this.highwayCars = 0;
    }

});