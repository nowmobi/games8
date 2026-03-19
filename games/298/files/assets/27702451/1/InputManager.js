var InputManager = pc.createScript('inputManager');

// initialize code called once per entity
InputManager.prototype.initialize = function() {

    pc.inputManager = this;

    this.startPosition = new pc.Vec2();
    this.gestureDone = true;
    this.minimalDistance = this.app.graphicsDevice.width / 24; //50;
    this.uiClicked = false;
    this.removeInput();
    this.app.off('UI:clicked');
    this.app.on('UI:clicked', this.ignoreInputManager, this);
    this.app.on('gameManager:gameStart', this.resetState, this);
    this.app.on('saveMe:continue', this.removeInput, this);
    this.canPreventDefault = document.hasFocus();

    if (!this.canPreventDefault) {
        setTimeout(function() {
            window.focus();
        }.bind(this), 1000);
    }

    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchEnd, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);

        /*        this.on('destroy', function() {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
            this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchEnd, this);
            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
            this.app.off('gameManager:gameStart');
        });*/
    } else if (this.app.mouse) {
        this.app.mouse.disableContextMenu();

        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseStart, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseEnd, this);

        /*        this.on('destroy', function() {            
            this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseStart, this);
            this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseEnd, this);
            this.app.off('gameManager:gameStart');
        });*/
    }
};

InputManager.prototype.onKeyDown = function(event) {
    this.preventDefault(event);

    if (event.key === pc.KEY_RIGHT) {
        this.gestureDone = true;
        this.saveInput("SwipeRight");
    } else if (event.key === pc.KEY_LEFT) {
        this.gestureDone = true;
        this.saveInput("SwipeLeft");
    } else if (event.key === pc.KEY_DOWN) {
        this.gestureDone = true;
        this.saveInput("SwipeDown");
    } else if (event.key === pc.KEY_UP) {
        this.gestureDone = true;
        this.saveInput("SwipeUp");
    } else if (event.key === pc.KEY_SPACE) {
        this.saveInput("Click");
    }
};

// Managed by SceneManager - Set Object to its initialize state
InputManager.prototype.resetState = function() {
    //this.minimalDistance = 50;
    this.gestureDone = true;
    this.uiClicked = false;
    this.removeInput(); //(?)

    this.startPosition.x = this.app.graphicsDevice.width / 2.0;
    this.startPosition.y = this.app.graphicsDevice.height / 2.0;
};

InputManager.prototype.ignoreInputManager = function(event) {
    this.uiClicked = true;
};

InputManager.prototype.isPaused = function() {
    return this.app.timeScale === 0;
};

/* ----------------------------------------------------------------------------------------------------------------------
 * TOUCH EVENTS
 * ---------------------------------------------------------------------------------------------------------------------- */

InputManager.prototype.onTouchStart = function(event) {
    this.preventDefault(event);
    this.inputStart(event.changedTouches[0].x, event.changedTouches[0].y);
};

InputManager.prototype.onTouchEnd = function(event) {
    this.preventDefault(event);
    this.inputEnd();
};

InputManager.prototype.onTouchMove = function(event) {
    this.preventDefault(event);

    if (this.isPaused()) {
        this.inputEnd();
        return;
    }

    this.inputSwipe(event.changedTouches[0].x, event.changedTouches[0].y);
};

/* ----------------------------------------------------------------------------------------------------------------------
 * MOUSE EVENTS
 * ---------------------------------------------------------------------------------------------------------------------- */

InputManager.prototype.onMouseStart = function(event) {
    this.preventDefault(event);

    this.down = true;

    this.inputStart(event.x, event.y);
};

InputManager.prototype.onMouseMove = function(event) {
    this.preventDefault(event);

    if (this.isPaused()) {
        this.inputEnd();
        return;
    }

    if (this.down) {
        this.inputSwipe(event.x, event.y);
    }
};

InputManager.prototype.onMouseEnd = function(event) {
    this.preventDefault(event);
    this.inputEnd();
};

/* ----------------------------------------------------------------------------------------------------------------------
 * INPUT METHODS
 * ---------------------------------------------------------------------------------------------------------------------- */

InputManager.prototype.inputStart = function(x, y) {
    this.startPosition.x = x;
    this.startPosition.y = y;
    this.gestureDone = false;
};

InputManager.prototype.inputSwipe = function(x, y) {
    if (!this.gestureDone && !this.uiClicked && !this.isPaused()) {

        var deltaX = this.startPosition.x - x;
        var deltaY = this.startPosition.y - y;

        if (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) < this.minimalDistance) {
            return;
        }

        this.gestureDone = true;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) this.saveInput("SwipeRight");
            else this.saveInput("SwipeLeft");
        } else {
            if (deltaY < 0) this.saveInput("SwipeDown");
            else this.saveInput("SwipeUp");
        }
    }
};

/*
InputManager.prototype.inputSwipe = function(x, y) {
    if (!this.gestureDone && !this.uiClicked && !this.isPaused()) {
        if (this.startPosition.x - x < -this.minimalSwipeDistance) {
            this.gestureDone = true;
            this.saveInput("SwipeRight");
        } else if (this.startPosition.x - x > this.minimalSwipeDistance) {
            this.gestureDone = true;
            this.saveInput("SwipeLeft");
        } else if (this.startPosition.y - y < -this.minimalSwipeDistance) {
            this.gestureDone = true;
            this.saveInput("SwipeDown");
        } else if (this.startPosition.y - y > this.minimalSwipeDistance) {
            this.gestureDone = true;
            this.saveInput("SwipeUp");
        }
    }
};
*/

InputManager.prototype.inputEnd = function(stop) {
    if (!this.gestureDone && !this.uiClicked && !this.isPaused() && !stop) {
        this.saveInput("Click");
    }
    this.down = false;

    this.uiClicked = false;
};

InputManager.prototype.update = function(dt) {
    if (!this.uiClicked && !this.isPaused()) {
        if (this.command !== '') {
            this.app.fire('inputManager:Input', this.command);
            this.removeInput();
        }
    } else {
        this.removeInput();
    }
};

InputManager.prototype.postUpdate = function() {
    this.uiClicked = false;
};

InputManager.prototype.saveInput = function(command) {
    this.command = command;
};

InputManager.prototype.removeInput = function() {
    this.command = '';
};

InputManager.prototype.setPreventDefault = function(value) {
    this.canPreventDefault = value;
};

InputManager.prototype.preventDefault = function(event) {
    if (this.canPreventDefault) {
        event.event.preventDefault();
    }
};