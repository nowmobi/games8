var LoadingScreen = pc.createScript('loadingScreen');

// initialize code called once per entity
LoadingScreen.prototype.initialize = function() {
    this.app.on('loadingScreen:enabled', this.setLoadingScreen, this);

    this.setLoadingScreen(false);
};

// update code called every frame
LoadingScreen.prototype.setLoadingScreen = function(value) {
    this.entity.children.forEach(function(child) {
        child.enabled = value;
    });
};