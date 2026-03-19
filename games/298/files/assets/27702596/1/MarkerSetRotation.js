var MarkerSetRotation = pc.createScript('markerSetRotation');

// initialize code called once per entity
MarkerSetRotation.prototype.initialize = function() {};

// update code called every frame
MarkerSetRotation.prototype.update = function(dt) {
    this.entity.setEulerAngles(90, 90, 0)
};

// swap method called for script hot-reloading
// inherit your script state here
// MarkerSetRotation.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/