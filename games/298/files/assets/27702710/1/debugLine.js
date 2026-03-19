var DebugLine = pc.createScript('debugLine');

// initialize code called once per entity
DebugLine.prototype.initialize = function() {
    this.app.on('debug', this.changeText, this);
    /*    this.on('destroy', function() {
            this.app.off('debug');
        });*/

    this.element = this.entity.element;
};

DebugLine.prototype.changeText = function(text) {
    this.element.text = this.element.text + text + '\n';
};