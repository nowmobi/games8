var MarkerSetPosition = pc.createScript('markerSetPosition');

// initialize code called once per entity
MarkerSetPosition.prototype.initialize = function() {
    this.yOffset = this.entity.getLocalPosition().clone().y;
    this.footballPosition = this.entity.parent.parent.getPosition();
};

// update code called every frame
MarkerSetPosition.prototype.update = function(dt) {
    this.entity.setPosition(this.footballPosition.x, this.footballPosition.y + this.yOffset, this.footballPosition.z);
};

// swap method called for script hot-reloading
// inherit your script state here
// MarkerSetRotation.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/