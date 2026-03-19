var CloudAnimation = pc.createScript('cloudAnimation');

CloudAnimation.attributes.add('sceneWidth', {
    type: 'number',
    title: 'sceneWidth',
    default: 0
});

pc.extend(CloudAnimation.prototype, {

    initialize: function() {
        this.setCloudSpeed();
    },

    update: function(dt) {
        this.entity.translate(this.cloudSpeed * dt * 120, 0, 0);
        if (this.entity.getPosition().x > this.sceneWidth) this.resetCloud();
    },

    resetCloud: function() {
        this.entity.setPosition(-this.sceneWidth, this.entity.getPosition().y, this.entity.getPosition().z);
        this.setCloudSpeed();
    },

    setCloudSpeed: function() {
        this.windSpeed = 1 / Math.abs(this.entity.getPosition().z);
        this.cloudSpeed = this.windSpeed + (this.windSpeed / 4) * (Math.random() - 0.5);
    }

});