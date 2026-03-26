window.ShowAds = function() { 

    YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv() );

};

window.ShowAdsCG = function() {
    
	const callbacks = {
    adFinished: () => console.log("End midgame ad (callback)"),
    adError: (error, errorData) => console.log("Error midgame ad (callback)", error, errorData),
    adStarted: () => console.log("Start midgame ad (callback)"),
	};

	window.CrazyGames.SDK.ad.requestAd("midgame", callbacks);
	
};

window.ShowAdsGD = function() {

    if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') { gdsdk.showAd(); }

};

window.ShowAdsGM = function() {

    if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') { sdk.showBanner(); }

};

window.ShowAdsGP = function() {

    GamePix.interstitialAd();

};