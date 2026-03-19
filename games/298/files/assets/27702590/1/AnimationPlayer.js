var AnimationPlayer = pc.createScript('animationPlayer');

AnimationPlayer.prototype.initialize = function() {
    this.oldTime = this.app_time || 0;
};

AnimationPlayer.prototype.update = function(dt) {

    this.unscaledDt = (this.app._time - this.oldTime) / 1000;
    this.entity.animation.currentTime += this.unscaledDt;

    if (this.entity.animation.currentTime >= this.entity.animation.duration) {
        this.entity.animation.currentTime = 0;
    }

    this.oldTime = this.app._time;
};