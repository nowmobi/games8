var MainLocalization = pc.createScript('mainLocalization');

MainLocalization.attributes.add("defaultLanguageJSON", {
    type: 'asset',
    assetType: 'json',
    title: 'Default language JSON file',
});

// initialize code called once per entity
MainLocalization.prototype.initialize = function() {
    this.setDefaultLocale();
    if (pc.util.EXPLICIT) console.log(this.defaultLanguageJSON)
    pc.mainLocalization = this;
    this.app.on('loadingScreen:activateText', this.setLocale, this);
    //this.activated = false;
};

MainLocalization.prototype.getText = function(key, variables) {
    if (!this.textData) {
        //console.error("There is no text data");
        return;
    }

    var text = this.textData[key] || key;

    if (variables) {
        for (var i = 0; i < variables.length; i += 1) {
            text = text.replace("{" + i + "}", variables[i]);
        }
    }

    return text;
};

MainLocalization.prototype.setLocale = function() {
    this.locale = pc.wrapper.getLocale();
    this.language = this.getCorrectLanguage(this.locale);
    var asset = this.app.assets.find(this.language + ".json");
    var self = this;

    // If the localisation file does not exist
    if (!asset) {
        console.warn(this.locale.substring(0, 2) + " is not available. Set to default (English (US)");
        this.setLocalizationFile(this.defaultLanguageJSON.resource);
        return;
    }

    asset.ready(function(asset) {
        self.setLocalizationFile(asset.resource);
    });

    this.app.assets.load(asset);
};

MainLocalization.prototype.setLocalizationFile = function(textData) {
    this.textData = textData;
    this.activated = true;
    this.app.fire('mainLocalization:enableText');
};

MainLocalization.prototype.setDefaultLocale = function() {
    this.defaultLocale = 'en_US';
    this.defaultTextData = this.defaultLanguageJSON.resource;
};

MainLocalization.prototype.createFacebookTextBlob = function(textKey, variables) {
    var blob = {};
    blob.localizations = {};

    blob.default = this.getDefaultText(textKey, variables);
    blob.localizations[this.locale] = this.getText(textKey, variables);

    return blob;
};

MainLocalization.prototype.getDefaultText = function(key, variables) {
    if (!this.defaultTextData) {
        if (pc.util.EXPLICIT) console.error("There is no text data");
        return;
    }

    var text = this.defaultTextData[key] || key;

    if (variables) {
        for (var i = 0; i < variables.length; i += 1) {
            text = text.replace("{" + i + "}", variables[i]);
        }
    }

    return text;
};

MainLocalization.prototype.getCorrectLanguage = function(locale) {
    switch (locale) {
        case 'en_US':
            return 'us';
        default:
            return locale.substring(0, 2);
    }
};