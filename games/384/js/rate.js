(function(){
var MAX_PROMPT = 3;

var firstPrompt = parseInt("5") || 10;
var intervalPrompt = parseInt("3") || 5;

//is Ready
document.addEventListener("deviceready", 
	function() {
		if(typeof(AppRate) == "undefined"){return;}

		/*navigator.globalization.getPreferredLanguage(function(a) {
			AppRate.preferences.useLanguage = a.value;
		});*/
		AppRate.preferences.simpleMode = true;
		AppRate.preferences.storeAppURL.ios = '790287034';
		AppRate.preferences.storeAppURL.android = 'market://details?id=net.playtouch.seaplumber';
		AppRate.preferences.reviewType.android = "InAppReview";
		AppRate.preferences.callbacks.onRateDialogShow = function(){
			setStorage("rate_prompted",getStorage("rate_prompted",true)+1);
			window.saveAdNb = 1;
			if(typeof window.bannerManager !== "undefined" && typeof window.bannerManager.hideBanner === "function"){
				setTimeout(window.bannerManager.hideBanner,100);
			}
		}
		checkStorage();
	}, false
);

function checkStorage(){
	if(typeof(AppRate) == "undefined"){return;}
	//set the AppRate preference
	if(getStorage("rate_nbTimePlayed",true) >= firstPrompt){
		AppRate.preferences.usesUntilPrompt = intervalPrompt;
	}else{
		AppRate.preferences.usesUntilPrompt = firstPrompt;
	}
}


eventToFire.registerEvent("c2LayoutChange",
	function (args){
		if(typeof(AppRate) == "undefined"){return;}
		var state = args.state;
		var name = args.name;
		var obj = args.obj;
		
		switch(name) {
			case "GameOver":
				if(state == "in"){
					window.triggerRateInApp();
				}
			break;
		}

	}
);

window.triggerRateInApp = function () {
	if(getStorage("rate_prompted",true) >= MAX_PROMPT){return;}
	setStorage("rate_nbTimePlayed",getStorage("rate_nbTimePlayed",true)+1);
	AppRate.promptForRating(false);
	checkStorage();
}

function getStorage(id,retInt){
	return ((!retInt)?getLocalStorageItem(id):(parseInt(getLocalStorageItem(id)) || 0));
}

function setStorage(id,nb){
	setLocalStorageItem(id, nb);
}

})();
