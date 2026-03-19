var LaneStats = pc.createScript('laneStats');

//
//  LaneStats - Configure lane properties
//

LaneStats.attributes.add('laneLength', {
    type: 'number',
    enum: [{
            METER_50: 50
        },
        {
            METER_100: 100
        },
        {
            METER_200: 200
        },
        {
            METER_300: 300
        },
        {
            METER_400: 400
        },

    ],
    default: 100,
    title: 'laneLength',
});

//pc.extend(LaneStats.prototype, {});