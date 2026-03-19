var InGameText = pc.createScript('inGameText');

// initialize code called once per entity
InGameText.prototype.initialize = function() {
    this.tweenAlpha = this.entity.script.tweenAlpha;
    this.tweenRotation = this.entity.script.tweenRotation;
    this.tweenScale = this.entity.script.tweenScale;
    this.textLocalization = this.entity.script.textLocalization;
};

// update code called every frame
InGameText.prototype.showInGameText = function(position, key, data, angle) {
    this.entity.setLocalPosition(position.x, position.y, position.z);
    this.tweenRotation.setInitRotation(0, 0, angle);
    this.tweenAlpha.startTween();
    this.tweenRotation.startTween();
    this.tweenScale.startTween();
    this.textLocalization.setKey(key);
    if (data) {
        //console.log("changing style")
        this.textLocalization.setTextStyle(data);
    }
};