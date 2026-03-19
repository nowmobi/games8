var Wrapper = pc.createScript('wrapper');

Wrapper.attributes.add('rewardedAd', {
    type: 'boolean',
    default: true
});

Wrapper.attributes.add('rewardedAdDuration', {
    type: 'number',
    default: 3000
});
Wrapper.attributes.add('rewardedAdFailRate', {
    type: 'number',
    default: 0.2,
    min: 0,
    max: 1
});
Wrapper.attributes.add('interstitialAdDuration', {
    type: 'number',
    default: 3000
});
Wrapper.attributes.add('showInterstitialOverlay', {
    type: 'boolean',
    default: false
});

pc.extend(Wrapper.prototype, {

    initialize: function() {
        pc.wrapper = this;
    },

    hasRewardedAd: function() {
        return this.rewardedAd;
    },

    showRewardedAd: function(callback, context) {


        pc.gdsdkManager.preloadAd();
        pc.audioManager.unmute();
      //  app.timescale = 1;
        pc.gameManager.isPaused = false;
            window.adsGameCon.showAdOfEvent({
                beforeShowAd: () => {

                },
                afterShowAd: () => {
                    callback.call(context, "");

                }
            });

    },

    showInterstitialAd: function(callback, context) {

        callback.call(context)
        pc.audioManager.unmute();
        pc.gameManager.isPaused = false;
            
        window.adsGameCon.showAd({
            beforeShowAd: () => {

               
            },
            afterShowAd: () => {

            }
        });
    },

    getLocale: function() {
        if (navigator.languages !== undefined)
            return navigator.languages[0];
        else
            return navigator.language;
    },

    getData: function(keys, callback, context) {
        var data = {};

        for (var i = 0; i < keys.length; i++) {
            data[keys[i]] = pc.storageManager.get(keys[i]);
        }

        if (typeof callback === 'function') {
            callback.call(context, data);
        }
    },

    setData: function(data, callback, context) {
        var keys = Object.keys(data);

        var newData = {};

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            newData[key] = pc.storageManager.set(key, data[key]);
        }

        if (typeof callback === 'function') {
            callback.call(context, data);
        }
    },

    incrementStats: function(data, callback, context) {
        var keys = Object.keys(data);

        var newData = {};

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            var value = pc.storageManager.get(key);
            var newValue = pc.storageManager.set(key, data[key] + value);

            newData[key] = newValue;
        }

        if (typeof callback === 'function') {
            callback.call(context, newData);
        }
    },

    setScore: function(score) {
        pc.storageManager.set('highscore', score);

        pc.fetch.setScore({
            name: pc.player.name,
            score: score,
            id: pc.player.uniqueID
        });
    },

    getLeaderboard: function(callback, context) {
        pc.fetch.getLeaderboard(callback, context);
    },
});