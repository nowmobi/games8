var RoadEvents = pc.createScript('roadEvents');

//
//  RoadEvents - Preconfigure area events
//

RoadEvents.attributes.add('firstTrain', {
    type: 'boolean',
    default: false
});

RoadEvents.attributes.add('firstTrainDirection', {
    type: 'number',
    enum: [{
            LEFT: 1
        },
        {
            RIGHT: -1
        }
    ],
    title: 'originPoint',
});

RoadEvents.attributes.add('firstTrainPosition', {
    type: 'number',
    enum: [{
            EARLY: 28
        },
        {
            LANES_FREE_3: 30
        },
        {
            LANES_FREE_2: 34
        },
        {
            LANES_FREE_1: 36
        },
        {
            LANES_FREE_0: 38
        }
    ],
    title: 'arrivalTime',
});

RoadEvents.attributes.add('secondTrain', {
    type: 'boolean',
    default: false
});

RoadEvents.attributes.add('secondTrainDirection', {
    type: 'number',
    enum: [{
            LEFT: -1
        },
        {
            RIGHT: 1
        }
    ],
    title: 'originPoint',
});

RoadEvents.attributes.add('secondTrainPosition', {
    type: 'number',
    enum: [{
            EARLY: 28
        },
        {
            LANES_FREE_3: 30
        },
        {
            LANES_FREE_2: 34
        },
        {
            LANES_FREE_1: 36
        },
        {
            LANES_FREE_0: 38
        }

    ],
    title: 'arrivalTime',
});

pc.extend(RoadEvents.prototype, {

    addEvents: function(graph, laneJSONifier) {

        if (!this.firstTrain && !this.secondTrain) return;

        // Object might or might not already exist in lane
        if (!graph.MovingTrain) graph.MovingTrain = [];

        if (this.firstTrain) {
            laneJSONifier.addToGraph(graph, 'MovingTrain', -95.12, -0.08, this.firstTrainPosition * this.firstTrainDirection,
                0, this.firstTrainDirection > 0 ? 180 : 0, 0
            );
            this.firstTrain = false;
        }

        if (this.secondTrain) {
            laneJSONifier.addToGraph(graph, 'MovingTrain', -45.1, -0.08, this.secondTrainPosition * this.secondTrainDirection,
                0, this.secondTrainDirection > 0 ? 180 : 0, 0
            );
            this.secondTrain = false;
        }
    }

});