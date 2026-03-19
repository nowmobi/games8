var SettingToggleButton = pc.createScript('settingToggleButton');

SettingToggleButton.attributes.add('key', {
    type: 'string'
});

SettingToggleButton.attributes.add('background', {
    type: 'entity'
});
SettingToggleButton.attributes.add('onColor', {
    type: 'rgb'
});
SettingToggleButton.attributes.add('offColor', {
    type: 'rgb'
});

SettingToggleButton.attributes.add('toggleButton', {
    type: 'entity'
});
SettingToggleButton.attributes.add('onPosition', {
    type: 'vec3'
});
SettingToggleButton.attributes.add('offPosition', {
    type: 'vec3'
});

SettingToggleButton.attributes.add('toggButtonBackground', {
    type: 'entity'
});
SettingToggleButton.attributes.add('toggButtonBackgroundOnColor', {
    type: 'rgb'
});
SettingToggleButton.attributes.add('toggButtonBackgroundOffColor', {
    type: 'rgb'
});

pc.extend(SettingToggleButton.prototype, {

    initialize: function() {
        this._on = true;

        this.background.element.on(pc.EVENT_TOUCHEND, this._onClick, this);
        this.background.element.on(pc.EVENT_MOUSEUP, this._onClick, this);

        this.on('enable', this._onEnable, this);

    },

    postInitialize: function() {
        this._onEnable();
    },

    _onClick: function() {
        this._on = !this._on;
        this.app.fire('Audio:UITabSwitch');
        this._setSettings();
        this.setState();
    },

    _onEnable: function() {
        this._on = pc.audioManager.getSetting(this.key);
        this.setState();
    },

    setState: function() {

        switch (this._on) {
            case true:
                this.background.element.color = this.onColor;
                this.toggleButton.script.tweenPosition.moveTo(this.offPosition, this.onPosition);
                break;

            case false:
                this.background.element.color = this.offColor;
                this.toggleButton.script.tweenPosition.moveTo(this.onPosition, this.offPosition);
                break;
        }

    },

    _setSettings: function() {
        pc.audioManager.applySettings(this.key, this._on);
    },
});