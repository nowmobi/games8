var PopUp = pc.createScript('popUp');

// initialize code called once per entity
PopUp.prototype.initialize = function() {
    this.entity.enabled = false;
};