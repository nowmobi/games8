var EndTutorial = pc.createScript('endTutorial');

EndTutorial.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
EndTutorial.prototype.onTriggerEnter = function(collider) {
    if (pc.util.arrayContainsTag(collider.tags, "GamePlayer")) {
        pc.gameManager.endTutorial();

        pc.player.saveTutorialCompleted();
    }
};