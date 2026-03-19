var CameraTrigger = pc.createScript('cameraTrigger');

CameraTrigger.attributes.add('triggerAction', {
    type: 'number',
    default: 0,
    enum: [{
            'Default': 0
        },
        {
            'Tunnel': 1
        },
        {
            'Duck': 2
        }
    ]
});

pc.extend(CameraTrigger.prototype, {

    initialize: function() {

        this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
        this.entity.collision.on('triggerleave', this.onTriggerLeave, this);
    },

    postInitialize: function() {

        this.cameraBehaviour = pc.gameCamera || this.app.root.findByTag('GameCam')[0].script.cameraBehaviour;
    },

    onTriggerEnter: function(entity) {

        if (entity.tags && entity.tags.has('GameCam')) {
            entity.script.cameraBehaviour.setCameraAction(this.triggerAction);
        }
    },

    onTriggerLeave: function(entity) {

        if (entity.tags && entity.tags.has('GameCam')) {
            entity.script.cameraBehaviour.setCameraAction(0);
        }
    }

});