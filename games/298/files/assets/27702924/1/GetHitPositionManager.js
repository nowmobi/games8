var GetHitPositionManager = pc.createScript('getHitPositionManager');

GetHitPositionManager.attributes.add("screenEntity", {
    type: 'entity',
    title: 'screenEntity',
});

GetHitPositionManager.attributes.add("test", {
    type: 'entity',
    title: 'test',
});

GetHitPositionManager.prototype.initialize = function() {
    this.app.on("target:hit", this.getTargetHit, this);
    this.app.on("player:Kick", this.showKickText, this);

    this.screenPos = new pc.Vec3(0, 0, 0);
    this.bendDisplacement = new pc.Vec3(0, 0, 0);

    this.camera = this.app.root.findByTag('GameCam')[0].camera;

    this.kickKeys = [
        'Ball_KickSplash_0',
        'Ball_KickSplash_1',
        'Ball_KickSplash_2',
    ];

    this.scoreKeys = [
        "Ball_HitSplash_0",
        "Ball_HitSplash_1",
    ];
};

GetHitPositionManager.prototype.getTargetHit = function(target, score) {
    var angle = this.getRandomRotation(-30, 30);

    this.app.fire("GetHitPositionManager:createInGameText", this.addOffset(this.worldSpaceToScreenPosition(target), -50, -20, -100, -100), this.getRandomItemFromArray(this.scoreKeys), 'score', angle);
    this.app.fire("GetHitPositionManager:createInGameText", this.addOffset(this.worldSpaceToScreenPosition(target), -50, -20, -50, -50), '+' + score, 'score', angle + 30);

    //var vec3Pos = this.worldSpaceToScreenPosition(target);

    //console.log(vec3Pos);
    //this.tttest.setLocalPosition(vec3Pos);
};

GetHitPositionManager.prototype.showKickText = function(position) {
    this.app.fire("GetHitPositionManager:createInGameText", this.worldSpaceToScreenPosition(position), this.getRandomItemFromArray(this.kickKeys), 'kick', this.getRandomRotation(-30, 30));
};

GetHitPositionManager.prototype.getRandomItemFromArray = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};

GetHitPositionManager.prototype.worldSpaceToScreenPosition = function(target) {

    var screenEntity = this.test.element.screen;
    var scale = this.screenEntity.screen.scale;

    var device = this.app.graphicsDevice;
    var invRatio = device.height / device.width;
    var cameraZ = pc.util.clamp01(
        Math.abs((this.camera.entity.getPosition().x - 100.0) - target.x) * (1.0 / pc.quality.renderDistance)
    );

    this.screenPos = this.camera.worldToScreen(target, this.screenPos);

    // Finding correct code is hard.
    // Camera doesn't know about worldbender so worldToScreen needs to be called first
    // The bender displacement is in worldUnits not in screencoords, so exact position
    // will remain a estimation. This should suffice for UI text. If not, a correlation
    // has to be drawn between worldunits and screen units by reversing camera perspective

    this.bendDisplacement.set(
        0,
        Math.pow(cameraZ * pc.quality.bendYamount, 1.8 + 2), -Math.pow(cameraZ * pc.quality.bendXamount, 2 + 1.6) * invRatio);

    this.screenPos.add(this.bendDisplacement);
    this.screenPos.y *= -1;
    this.screenPos.y = Math.min(this.screenPos.y, -200);
    this.screenPos.x = Math.max(this.screenPos.x, 20);

    // this.screenPos.x = this.screenPos.x - device.width / scale / 2;
    return this.screenPos;
};

GetHitPositionManager.prototype.addOffset = function(position, xMin, xMax, yMin, yMax) {
    if (!!!this._offset) this._offset = new pc.Vec3(0, 0, 0);
    this._offset.set(Math.random() * (xMax - xMin) + xMin, Math.random() * (yMax - yMin) + yMin, 0);
    return position.add(this._offset);
};

GetHitPositionManager.prototype.getRandomRotation = function(angleMin, angleMax) {
    return Math.random() * (angleMax - angleMin) + angleMin;
};