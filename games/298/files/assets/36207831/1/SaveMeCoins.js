var SaveMecoins = pc.createScript('saveMecoins');

// initialize code called once per entity
SaveMecoins.prototype.initialize = function() {
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }
};

// When we press the element assign the active texture
SaveMecoins.prototype.onPress = function(event) {
    pc.util.processEvent(event);

    if (pc.saveMeManager.currentState !== pc.saveMeManager.saveMeState.ACTIVATED) {
        return;
    }

    if (pc.player.payCoins(pc.gameManager.coinsRequired)) {
        this.onContinue();
    } else {
        console.log("Not enough coins");
    }
};

SaveMecoins.prototype.onContinue = function() {
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