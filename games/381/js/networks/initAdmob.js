document.addEventListener('deviceready', function() {

	//check
	var activateInterstitial = parseInt("0") || parseInt("1") || 0;
	var activateRewardedVideo = parseInt("0") || 0;
	var activateBanner = parseInt("0") || 0;

	if(activateInterstitial){
		admob.interstitial.config({
			id:"ca-app-pub-8460767264532971/1615716038",
			//isTesting: true,
			autoShow: false,
		});
		setTimeout(function(){admob.interstitial.prepare();},500);
	}
	if(activateRewardedVideo){
		admob.rewardvideo.config({
			id:"ca-app-pub-8460767264532971/5363389352",
			//isTesting: true
		});
		setTimeout(function(){admob.rewardvideo.prepare();},500);
	}

	if(activateBanner){
		admob.banner.config({
			id:"",
			overlap:true,
			autoShow:false
			//isTesting: true
		});
		setTimeout(function(){admob.banner.prepare();},500);
	}

}, false);
