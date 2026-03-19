var PlaceholderOverlay = pc.createScript('placeholderOverlay');

PlaceholderOverlay.attributes.add('interstitialAdOverlay', {
    type: 'entity'
});
PlaceholderOverlay.attributes.add('rewardedAdOverlay', {
    type: 'entity'
});

// initialize code called once per entity
pc.extend(PlaceholderOverlay.prototype, {
    initialize: function() {
        this.app.on('AdOverlay:showInterstitialAd', this.showInterstitialAd, this);
        this.app.on('AdOverlay:hideInterstitialAd', this.hideInterstitialAd, this);
        this.app.on('AdOverlay:showRewardAd', this.showRewardAd, this);
        this.app.on('AdOverlay:hideRewardAd', this.hideRewardAd, this);

        this.hideInterstitialAd();
        this.hideRewardAd();
    },

    showInterstitialAd: function() {
        this.interstitialAdOverlay.enabled = true;
    },

    hideInterstitialAd: function() {
        this.interstitialAdOverlay.enabled = false;
    },

    showRewardAd: function() {
        this.rewardedAdOverlay.enabled = true;
    },

    hideRewardAd: function() {
        this.rewardedAdOverlay.enabled = false;
    },
});