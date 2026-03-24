document.addEventListener('deviceready', function() {

	//check
	var activateInterstitial = parseInt("0") || parseInt("1") || 0;
	var activateRewardedVideo = parseInt("1") || 0;
	var activateBanner = parseInt("1") || 0;

	if(activateInterstitial){
		admob.interstitial.config({
			id:"ca-app-pub-8460767264532971/3969003471",
			//isTesting: true,
			autoShow: false,
		});
		// setTimeout(function(){admob.interstitial.prepare();},500);
	}

	if(activateRewardedVideo){
		admob.rewardvideo.config({
			id:"ca-app-pub-8460767264532971/5473656838",
			//isTesting: true
		});
		// setTimeout(function(){admob.rewardvideo.prepare();},500);
	}

	if(activateBanner){
		admob.banner.config({
			id:"ca-app-pub-8460767264532971/9983747481",
			overlap:true,
			autoShow:false
			//isTesting: true
		});
		// setTimeout(function(){admob.banner.prepare();},500);
	}

	eventToFire.registerEvent("prepareAds",function(){
		if(activateInterstitial){
			setTimeout(function(){admob.interstitial.prepare();},500);
		}
		if(activateRewardedVideo){
			setTimeout(function(){admob.rewardvideo.prepare();},500);
		}
		if(activateBanner){
			setTimeout(function(){admob.banner.prepare();},500);
		}
	});

}, false);
