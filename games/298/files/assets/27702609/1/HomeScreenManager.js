var HomeScreenManager = pc.createScript('homeScreenManager');

HomeScreenManager.attributes.add('homeScreen', {
    type: 'entity',
    default: 'Home Screen',
});


HomeScreenManager.attributes.add('getFocus', {
    type: 'entity',
    default: 'Get Focus Screen'
});

// initialize code called once per entity
HomeScreenManager.prototype.initialize = function() {
    pc.homescreenManager = this;

    this.currentScreen = this.homeScreen;
    this.linkedScreens = [this.currentScreen];

    this.popUpScreens = [];
    this.currentPopUpScreen = undefined;

    this.app.on('button:openScreen', this.openScreen, this);
    this.app.on('button:closeButton', this.onClose, this);

    this.app.on('popUp:addPopUp', this.addPopUpScreen, this);
    this.app.on('popUp:closePopUp', this.closePopUpScreen, this);

    //this.app.on("getFocus", this.showGetFocus, this);

    //this.app.on('homeScreenManager:changeScene', this.checkIfChangingSceneIsPossible, this);

    /*    this.on('destroy', function() {
            this.app.off('button:openScreen');
            this.app.off('button:closeButton');  
            
            this.app.off('homeScreenManager:openPopUp');
            this.app.off('homeScreenManager:closePopUp');
            
            //this.app.off('homeScreenManager:changeScene');
        });*/

    //this.app.fire('popUp:addPopUp', this.friendPopUp);

    // https://developer.playcanvas.com/en/user-manual/user-interface/input/
    // Only register touch events if the device supports touch (GoogleChrome)
    if (pc.util.DEBUG && this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHEND, function(event) {
            // This prevents that a mouse click event will be executed after a touch event.
            event.event.preventDefault();
        });
    }
};

HomeScreenManager.prototype.onClose = function() {
    if (this.currentPopUpScreen) {
        this.removePopUpScreen();
    } else {
        this.closeScreen();
    }
};

HomeScreenManager.prototype.openScreen = function(entity) {
    // If entity already exists, do nothing
    if (this.linkedScreens.includes(entity)) {
        console.warn(entity.name + ' already exists in the list');
        return;
    }

    // Set current screen to false
    this.currentScreen.enabled = false;

    // Add the new screen to the list
    this.addScreen(entity);
};

HomeScreenManager.prototype.addScreen = function(entity) {
    // Set new entity to true
    entity.enabled = true;

    // Push to array
    this.linkedScreens.push(entity);

    // Set current screen o this entity
    this.currentScreen = entity;
};

HomeScreenManager.prototype.addPopUpScreen = function(entity) {
    // If entity already exists, do nothing
    if (this.popUpScreens.includes(entity)) {
        console.warn(entity.name + ' already exists in the list');
        return;
    }
    // Set current screen to false
    // this.currentScreen.enabled = false;

    // Add the new screen to the list
    this.popUpScreens.push(entity);

    if (!this.currentPopUpScreen) {
        this.showPopUp(entity);
    }
};

HomeScreenManager.prototype.removePopUpScreen = function() {
    var index = this.popUpScreens.indexOf(this.currentPopUpScreen);

    if (index !== -1) {
        this.popUpScreens.splice(index, 1);

        if (this.popUpScreens.length > 0) {
            this.showPopUp(this.popUpScreens[0]);
        } else {
            this.currentPopUpScreen.enabled = false;
            this.currentPopUpScreen = undefined;
        }
    }
};

HomeScreenManager.prototype.showPopUp = function(entity) {
    //console.log(entity)
    this.currentPopUpScreen = entity;
    this.currentPopUpScreen.enabled = true;
};

HomeScreenManager.prototype.closeScreen = function() {
    // Do nothing if there is no screen to close
    if (this.linkedScreens.length === 0 || this.currentScreen === undefined) {
        console.warn('There is no screen to close');
        return;
    }

    this.removeScreen();
};

HomeScreenManager.prototype.removeScreen = function() {
    // Set current screen to false
    this.currentScreen.enabled = false;

    // Pop the list
    this.linkedScreens.pop();

    var length = this.linkedScreens.length;

    // There is no screen to show
    if (length === 0) {
        return;
    }

    // Set new current screen
    this.currentScreen = this.linkedScreens[length - 1];
    this.currentScreen.enabled = true;
};

HomeScreenManager.prototype.checkIfChangingSceneIsPossible = function(sceneId) {
    return true;
};

HomeScreenManager.prototype.showGetFocus = function() {
    this.getFocus.enabled = true;
};