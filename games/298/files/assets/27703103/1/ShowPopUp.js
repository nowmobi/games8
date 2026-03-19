var ShowPopUp = pc.createScript('showPopUp');

// initialize code called once per entity
ShowPopUp.prototype.initialize = function() {
    this.app.on("showPopUp", this.visibilityChange, this);
};

// update code called every frame
ShowPopUp.prototype.visibilityChange = function(value) {
    console.log(value)
    console.log(this)
    this.entity.children[0].enabled = value;
};