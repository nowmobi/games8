var TextLocalization = pc.createScript('textLocalization');

//
//      textLocalization - render language-agnostic text
//

// NOTE: There are known problems with this code
// shadows will be misplaced if text changed when anchor is NOT custom
// please align using alignment and keep anchor to center (0.5 ...)
// tried copying attributes but might not work due to editor anchors

TextLocalization.attributes.add('textKey', {
    type: "string",
    default: "Error",
    title: "Text Key",
    description: "The key must exist in the JSON!"
});

TextLocalization.attributes.add('isImage', {
    type: "boolean",
    default: false,
    title: "Is an Image",
});

TextLocalization.attributes.add('variableEntity', {
    type: "entity",
    title: "Variable entity",
});

TextLocalization.attributes.add('scriptName', {
    type: "string",
    title: "Script Name",
});

TextLocalization.attributes.add('method', {
    type: "string",
    title: "Method name",
});

TextLocalization.attributes.add('addedText', {
    type: 'string',
});

TextLocalization.attributes.add('applyOnStart', {
    type: 'boolean',
    default: true,
    title: 'Apply on start',
});

TextLocalization.attributes.add('shadow', {
    type: 'boolean',
    default: true,
    title: 'Shadow',
});

TextLocalization.attributes.add('enableByMainLocalization', {
    type: 'boolean',
    default: true,
    title: 'Enable by MainLocalization',
});

TextLocalization.attributes.add('forceFontSize', {
    type: 'boolean',
    default: false,
    title: 'forceFontSize',
});

TextLocalization.attributes.add('upperCase', {
    type: 'boolean',
    default: false,
    title: 'upperCase',
});

TextLocalization.attributes.add('shadowOffset', {
    type: 'vec2',
    default: [2, -1]
});
TextLocalization.attributes.add('outlineThickness', {
    type: 'number',
    default: 1
});

pc.extend(TextLocalization.prototype, {

    initialize: function() {
        this.shadow = false;
        // this.element = this.entity.element;
        if (pc.mainLocalization.activated && this.applyOnStart) {
            this.applyLocalization();
        }

        if (this.shadow) {
            this.createShadowEntity();
        }

        if (this.enableByMainLocalization) {
            this.app.on('mainLocalization:enableText', this.applyLocalization, this);
        }

        var setShadowOffset = function() {
            this.entity.element.shadowOffset = this.shadowOffset;
        }

        setShadowOffset.call(this);

        var setOutlineThickness = function() {
            this.entity.element.outlineThickness = this.outlineThickness;
        }

        setOutlineThickness.call(this);

        this.on('attr:shadowOffset', setShadowOffset, this);
        this.on('attr:outlineThickness', setOutlineThickness, this);
    },

    applyLocalization: function() {

        if (!this.entity.element) {
            console.warn(this.entity.name + " doesn't have a element!");
            return;
        }

        var variables;
        if (this.addedText) {
            variables = [this.addedText];
        } else if (this.variableEntity && this.scriptName && this.method) {
            try {
                variables = this.variableEntity.script[this.scriptName][this.method]();
            } catch (error) {
                console.error(this.variableEntity + " " + this.scriptName + " " + this.method + " gives an error!");
            }
        }

        this.setText(variables);
    },

    resizeFontSize: function(element) {

        if (this.forceFontSize) {
            return;
        }

        var scale = element.textWidth / element.width;
        if (scale > 1) {
            element.fontSize /= scale;
        }
    },

    setText: function(variables) {
        variables = this.validateVariableType(variables);
        var text = this.textKey ? pc.mainLocalization.getText(this.textKey, variables) : (variables || '').toString();
        this.entity.element.text = this.upperCase ? text.toUpperCase() : text;
        if (this.shadow) {
            if (this.realText) {

                this.realText.element.text = text;
                this.resizeFontSize(this.realText.element);
            }
        }

        this.resizeFontSize(this.entity.element);
    },

    validateVariableType: function(variables) {

        var type = typeof variables;

        switch (type) {
            case 'string':
                return [variables];
            case 'number':
                return [variables];
            default:
                return variables;
        }
    },

    createShadowEntity: function() {
        if (!this.shadow) {
            return;
        }

        //var child = this.entity.findByName(this.entity.name + "Child");
        //console.log('child', child);

        if (!this.realText) {
            this.realText = this.entity.clone();
            this.realText.removeComponent("script");
            this.realText.name = this.realText.name + "Child";
            this.realText.setLocalPosition(-2.6, 2, 0);
            this.realText.rotateLocal(0, 0, 0);

            this.realText.element.pivot = new pc.Vec2(0.5, 0.5);
            //console.log(this.realText)
            this.entity.element.color = new pc.Color(0, 0, 0, 1);

            //this.entity.element.alignment = this.realText.element.alignment.clone();
            //this.entity.element.pivot = this.realText.element.pivot.clone();

            /*
            this.realText.element.alignment = this.entity.element.alignment;
            this.realText.element.pivot = this.entity.element.pivot;
            this.realText.element.anchor = this.entity.element.anchor;
            this.realText.element.margin = this.entity.element.margin;
            this.realText.element.size = this.entity.element.size;
            */

            // Ensures shadow doesn't misalign with text
            // entity.element.autoWidth = false;
            // entity.element.autoHeight = false;

            this.entity.addChild(this.realText);

        } //else if (!this.realText) {
        //     this.realText = child;
        // }
    },

    setKey: function(key) {
        this.createShadowEntity();
        this.textKey = key;
        this.setText();
    },

    setTextStyle: function(style) {

        if (style.color) {
            this.entity.element.color = new pc.Color().fromString(style.color);
        }

        if (style.fontSize) {
            this.entity.element.fontSize = style.fontSize.toFixed(1);
        }
    }
});