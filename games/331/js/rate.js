(function(){

var firstPrompt = parseInt("10") || 10;
var intervalPrompt = parseInt("5") || 5;

//is Ready
document.addEventListener("deviceready", 
	function() {
		if(typeof(AppRate) == "undefined"){return;}

		//override for get the notification Rate
		navigator.notification.confirmOld = navigator.notification.confirm;
		navigator.notification.confirm = function(){
			//skip pub if we show the notification
			window.saveAdNb = 1;
			navigator.notification.confirmOld.apply(this,arguments);
		}
		navigator.globalization.getPreferredLanguage(function(a) {
			AppRate.preferences.useLanguage = a.value;
		});
		AppRate.preferences.storeAppURL.ios = '1069262007';
		AppRate.preferences.storeAppURL.android = 'market://details?id=net.playtouch.yukiandrinafootball';
		checkStorage();
	}, false
);

function checkStorage(){
	if(typeof(AppRate) == "undefined"){return;}
	//set the AppRate preference
	if(getStorage("rate_nbTimePlayed",true) >= firstPrompt){
		AppRate.preferences.usesUntilPrompt = intervalPrompt -1;
	}else{
		AppRate.preferences.usesUntilPrompt = firstPrompt -1;
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
