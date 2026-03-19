var NameText = pc.createScript('nameText');

NameText.attributes.add('key', {
    type: 'string',
    default: 'name'
});

pc.extend(NameText.prototype, {

    initialize: function() {

        this.on('enable', this.getText, this);
        this.getText();
    },

    getText: function() {
        if (this.key) {
            pc.wrapper.getData([this.key], this.setText, this);
        }
    },

    setText: function(data) {
        this.entity.element.text = data[this.key];
    },
});