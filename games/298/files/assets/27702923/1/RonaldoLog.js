var RonaldoLog = pc.createScript('ronaldoLog');

// initialize code called once per entity
RonaldoLog.prototype.initialize = function() {
    if (pc.util.EXPLICIT) console.log(this.entity);
};

// update code called every frame
RonaldoLog.prototype.update = function(dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// RonaldoLog.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/