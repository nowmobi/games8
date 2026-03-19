var Inputbox = pc.createScript('inputbox');

Inputbox.attributes.add('html', {
    type: 'asset'
});
Inputbox.attributes.add('width', {
    type: 'number',
    default: 400
});
Inputbox.attributes.add('height', {
    type: 'number',
    default: 48
});
Inputbox.attributes.add('fontSize', {
    type: 'number',
    default: 48
});
Inputbox.attributes.add('screenY', {
    type: 'number',
    default: 1280
});

Inputbox.attributes.add('key', {
    type: 'string',
    default: "name"
});
Inputbox.attributes.add('maxInputLength', {
    type: 'number',
    default: 12
});


pc.extend(Inputbox.prototype, {

    initialize: function() {
        this.createInputbox();

        this._oldText = null;

        window.addEventListener('resize', this.onResize.bind(this));
        this.on('enable', function() {
            this.div.style.display = "block";
            this.getText();
        }, this);
        this.on('disable', function() {
            this.div.style.display = "none";
        }, this);

        this.on('attr:screenY', this.onResize, this);

        this.onResize();

        this.getText();
    },

    getText: function() {
        if (this.key) {
            pc.wrapper.getData([this.key], this.setText, this);
        }
    },

    setText: function(data) {
        this.documentInputbox.value = data[this.key];
        this._oldText = this.documentInputbox.value;
    },

    createInputbox: function() {
        // Create input element
        var asset = this.html;
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';

        this.div.innerHTML = asset.resource;

        window.document.body.appendChild(this.div);
        // this.div.firstElementChild.style.height = window.innerHeight / 5 + "px";

        this.documentInputbox = document.getElementById("inputbox");
        // Add listeners for input
        this.documentInputbox.addEventListener("input", this.onInputChange.bind(this));
        this.documentInputbox.addEventListener("keyup", this.blurOnEnterKey.bind(this));
        this.documentInputbox.addEventListener("blur", this.submit.bind(this));
    },


    onResize: function() {
        this.div.firstElementChild.style.height = window.innerHeight / 5 + "px";
        this.div.firstElementChild.firstElementChild.style.width = this.width * window.innerHeight / this.screenY + "px";
        this.div.firstElementChild.firstElementChild.style.height = this.height * window.innerHeight / this.screenY + "px";

        this.documentInputbox.style.fontSize = this.fontSize * window.innerHeight / this.screenY + "px";
    },

    onInputChange: function(text) {
        this.documentInputbox.value = this.documentInputbox.value.substr(0, this.maxInputLength);
    },

    blurOnEnterKey: function(event) {
        if (event.key === "Enter") {
            this.submit();
            return;
        }
    },

    doBlur: function() {
        this.documentInputbox.blur();
    },

    submit: function() {
        if (this._oldText === this.documentInputbox.value) {
            return;
        }

        if (this.key) {
            var data = {}
            data[this.key] = this.documentInputbox.value;
            pc.wrapper.setData(data);
            pc.player.setName(this.documentInputbox.value);
        }
    },

});