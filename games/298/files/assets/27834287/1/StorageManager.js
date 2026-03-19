var StorageManager = pc.createScript('storageManager');

StorageManager.attributes.add('defaultSaveData', {
    type: 'asset',
    assetType: 'json'
});
StorageManager.attributes.add('uniqueName', {
    type: 'string'
});

pc.extend(StorageManager.prototype, {

    initialize: function() {
        pc.storageManager = this;

        this._basicInfo = this.defaultSaveData.resource;

        this._storages = Object.freeze({
            LOCALSTORAGE: 'LOCALSTORAGE',
            SESSIONSTORAGE: 'SESSIONSTORAGE'
        });

        this._localStorage = {};
        this._sessionStorage = {};

        this.loadSaveData();
    },

    /**
     * Get the value with the corresponding key.
     *
     * @param {string} key - Key of the value.
     * @returns {*} Value.
     */
    get: function(key, storage) {
        storage = storage || 'LOCALSTORAGE';

        switch (storage.toUpperCase()) {
            case this._storages.LOCALSTORAGE:
                return this._localStorage[key];
            case this._storages.SESSIONSTORAGE:
                return this._sessionStorage[key];
            default:
                console.warn("Storage is " + storage + ", which is incorrect.");
                return null;
        }
    },

    /**
     * Save the value in the storage.
     *
     * @param {string} key - Key of the value.
     * @param {*} value - Can be any JSON valid value.
     * @param {boolean} [compare=false] - If true, it will compare with the old value.
     * If the new value is higher, it will save. Otherwise it will ignore.
     * @param {'localstorage'|'sessionstorage} [storage='localStorage] - Use the correct storage.
     */
    set: function(key, value, compare, storage) {
        compare = compare || false;
        storage = storage || 'localStorage';

        if (compare) {
            var currentValue = this.get(key);

            switch (typeof value) {
                case 'number':
                    if (value <= currentValue) {
                        return;
                    }
                    break;
                default:
                    break;
            }
        }

        this._writeToStorage(key, value, storage);

        return value;
    },

    /**
     * Set the value to the basic value.
     *
     * @param {string} key - Key of the value.
     * @param {'localstorage'|'sessionstorage} [storage='localStorage] - Use the correct storage.
     */
    remove: function(key, storage) {
        this._getStorage(storage)[key] = this._basicInfo[key];

        switch (storage.toUpperCase()) {
            case this._storages.LOCALSTORAGE:
                window.localStorage.removeItem(this.uniqueName + key);
                break;
            case this._storages.SESSIONSTORAGE:
                window.sessionStorage.removeItem(this.uniqueName + key);
                break;
            default:
                console.warn('Storage is not recognized.', 'Key is ' + key);
                break;
        }
    },

    /**
     * Delete the whole save data. Use the default data file.
     *
     * @param {'localstorage'|'sessionstorage} [storage='localStorage] - Use the correct storage.
     */
    delete: function(storage) {
        var specificStorage = this._getStorage(storage);
        specificStorage = this._basicInfo;

        switch (storage.toUpperCase()) {
            case this._storages.LOCALSTORAGE:
                window.localStorage.clear();
                break;
            case this._storages.SESSIONSTORAGE:
                window.sessionStorage.clear();
                break;
            default:
                console.warn('Storage is not recognized.');
                break;
        }
    },

    /**
     * Write the data to the save file.
     *
     * @private
     * @param {string} key - Key of the value.
     * @param {*} value - Can be any JSON valid value.
     * @param {'localstorage'|'sessionstorage'} [storage='localStorage] - Use the correct storage.
     */
    _writeToStorage: function(key, value, storage) {
        this._getStorage(storage)[key] = value;

        switch (storage.toUpperCase()) {
            case this._storages.LOCALSTORAGE:
                window.localStorage.setItem(this.uniqueName + key, JSON.stringify(value));
                break;
            case this._storages.SESSIONSTORAGE:
                window.sessionStorage.setItem(this.uniqueName + key, JSON.stringify(value));
                break;
            default:
                console.warn('Storage is not recognized.', 'Key is ' + key);
                break;
        }
    },

    /**
     * Return the correct storage data.
     *
     * @private
     * @param {'localstorage'|'sessionstorage'} storage
     */
    _getStorage: function(storage) {
        switch (storage.toUpperCase()) {
            case this._storages.LOCALSTORAGE:
                return this._localStorage;
            case this._storages.SESSIONSTORAGE:
                return this._localStorage;
            default:
                console.warn('Storage ' + storage + ' not found');
                return null;
        }
    },

    /**
     * Load the save file.
     */
    loadSaveData: function() {
        var keys = Object.keys(this._basicInfo);

        for (var i = 0; i < keys.length; i += 1) {
            var key = keys[i];

            var value = window.localStorage.getItem(this.uniqueName + key);

            try {
                this._localStorage[key] = JSON.parse(value);
            } catch (error) {
                this._localStorage[key] = value;
            }


            if (this._localStorage[key] === undefined || this._localStorage[key] === null) {
                this._localStorage[key] = this._basicInfo[key];
                this.set(key, this._localStorage[key]);
            }

            if (Array.isArray(this._basicInfo[key]) && !Array.isArray(this._localStorage[key])) {
                this._localStorage[key] = this._basicInfo[key];
                this.set(key, this._localStorage[key]);
            }

            // Check if type is equal, or else replace with default value
            if (typeof this._localStorage[key] !== typeof this._basicInfo[key]) {
                this._localStorage[key] = this._basicInfo[key];
                this.set(key, this._localStorage[key]);
            }
        }

        setTimeout(function() {
            this.app.fire('StorageManager:onLoadSaveData', this._localStorage);
        }.bind(this));
    }
});