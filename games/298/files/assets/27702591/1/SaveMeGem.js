var SaveMegem = pc.createScript('saveMegem');

// initialize code called once per entity
SaveMegem.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

// When we press the element assign the active texture
SaveMegem.prototype.onPress = function(event) {
    pc.util.processEvent(event);

    if (pc.saveMeManager.currentState !== pc.saveMeManager.saveMeState.ACTIVATED) {
        return;
    }

    if (pc.player.payGems(pc.gameManager.gemsRequired)) {
        this.onContinue();
    } else {
        console.log("Not enough gems");
    }
};

SaveMegem.prototype.onContinue = function() {
    this.app.fire('saveMe:continue');
    this.app.fire('saveMeGem:continue');

    setTimeout(function() {
        pc.inputManager.inputEnd(true);
    }.bind(pc.inputManager));
};


// swap method called for script hot-reloading
// inherit your script state here
// SaveMegem.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/