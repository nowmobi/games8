var InGameTextManager = pc.createScript('inGameTextManager');

InGameTextManager.attributes.add('textTemplate', {
    type: 'entity',
    title: 'textTemplate',
});

// initialize code called once per entity
InGameTextManager.prototype.initialize = function() {
    this.app.on('GetHitPositionManager:createInGameText', this.addNewText, this);

    this.textPool = [];

    this.createNewEntity();

    this.data = {
        kick: {
            fontSize: 90,
            color: '#9AE2FF',
        },
        score: {
            fontSize: 60,
            color: '#C5C5C5',
        }
    };
};

InGameTextManager.prototype.createNewEntity = function() {
    var clonedTextEntity = this.textTemplate.clone();
    clonedTextEntity.enabled = true;
    this.entity.addChild(clonedTextEntity);
    this.textPool.push(clonedTextEntity);
    return clonedTextEntity;
};

InGameTextManager.prototype.addNewText = function(position, text, type, angle) {
    var freeTextEntity = this.getTextEntityFromPool();

    freeTextEntity.script.inGameText.showInGameText(position, text, this.getCorrectData(type), angle);
};

InGameTextManager.prototype.getTextEntityFromPool = function() {
    // First method, will only work if all entities has the same alpha duration

    // Get first element
    var firstTextEntity = this.textPool[0];

    if (!firstTextEntity.script.tweenAlpha.isActive()) {
        // Push the first element to the last
        this.textPool.push(this.textPool.shift());

        return firstTextEntity;
    } else {
        return this.createNewEntity();
    }

    //     // Second method, loops through the array.
    //     for (var i = 0; i < this.textPool.length; i += 1) {
    //         var tweenAlpha = this.textPool[i].script.tweenAlpha;

    //         if (tweenAlpa.isActive()) {
    //             continue;
    //         } else {
    //             return this.textPool[i];
    //         }
    //     }

    //     return this.createNewEntity();
};

InGameTextManager.prototype.getCorrectData = function(type) {
    return this.data[type];
};

InGameTextManager.prototype.getRandomItemFromArray = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};

InGameTextManager.prototype.getCorrectKey = function(type) {
    switch (type) {
        case 'kick':
            return this.getRandomItemFromArray(this.kickKeys);
        case 'score':
            return 'Score';
        default:
            console.warn('No key exists for ' + type);
            return 'type';
    }
};