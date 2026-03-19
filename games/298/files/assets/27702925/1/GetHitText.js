var GetHitText = pc.createScript('getHitText');
GetHitText.attributes.add('camera', {
    type: "entity"
});
GetHitText.attributes.add('target', {
    type: "entity"
});

// initialize code called once per entity
GetHitText.prototype.initialize = function() {
    //this.app.on('target:hit', this.updatePosition, this);
};

// update code called every frame
// GetHitText.prototype.update = function(dt) {
//     // world space position of target
//     var worldPos = this.target.getPosition();
//     var screenPos = new pc.Vec3();

//     // get screen space co-ord
//     this.camera.camera.worldToScreen(worldPos, screenPos);

//     // convert to screen component co-ordinates
//     var screenEntity = this.entity.element.screen;
//     var scale = screenEntity.screen.scale;

//     var device = this.app.graphicsDevice;

//     this.entity.setLocalPosition(screenPos.x / scale - device.width / 2 / scale, (device.height - screenPos.y) / scale - device.height / 2 / scale, 0);    
// };




// swap method called for script hot-reloading
// inherit your script state here
// GetHitText.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/