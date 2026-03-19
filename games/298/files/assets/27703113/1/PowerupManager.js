var PowerupManager = pc.createScript('powerupManager');

//
// PowerupManager - Handles spawning of powerups
//

// How to add new powerup: Make sure attribute name equals name of powerup script!

PowerupManager.attributes.add('magnet', {
    type: 'entity',
    title: 'magnetPrefab'
});

PowerupManager.attributes.add('doubleCoin', {
    type: 'entity',
    title: 'coinPrefab'
});

PowerupManager.attributes.add('invincible', {
    type: 'entity',
    title: 'invinciblePrefab'
});

PowerupManager.attributes.add('doubleTarget', {
    type: 'entity',
    title: 'targetPrefab'
});

PowerupManager.self = undefined;

pc.extend(PowerupManager.prototype, {

    initialize: function() {
        PowerupManager.self = this;

        if (!!this.magnet) this.magnet.enabled = false;
        else console.warn('POWERUP_MAN: Magnet is missing prefab');

        if (!!this.doubleCoin) this.doubleCoin.enabled = false;
        else console.warn('POWERUP_MAN: DoubleCoin is missing prefab');

        if (!!this.invincible) this.invincible.enabled = false;
        else console.warn('POWERUP_MAN: Invincible is missing prefab');

        if (!!this.doubleTarget) this.doubleTarget.enabled = false;
        else console.warn('POWERUP_MAN: Target is missing prefab');
    },

    request: function(entity) {

        if (!!!entity) {
            console.warn("POWERUP_MAN: Received invalid entity");
            return null;
        }

        if (!pc.gameManager.enablePowerups) {
            console.log("POWERUP_MAN: Powerups are disabled");
            return null;
        }

        //
        // TODO - Decide if to give powerup, decide which -- This is for balancing later
        //

        var prefab = this.magnet;

        if (!!prefab && !prefab.enabled) {

            prefab.enabled = true;
            prefab.setPosition(entity.getPosition().x, entity.getPosition().y, entity.getPosition().z);
            console.log(prefab);

            return prefab.script._scripts.find(function(script) {
                return script.__scriptType.__name === (prefab.name.charAt(0).toLowerCase() + prefab.name.slice(1));
            });
        } else console.log('POWERUP_MAN: powerup is already in use, wait for auto disable');

        return null;
    }

});