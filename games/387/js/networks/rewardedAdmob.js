;(function(){
var delayOnFail_timer = [10,30,60,300,600];
var delayOnFail_actualTimer = 0;
var delayOnFail_timerInter;
var delayOnFail_lastNetworkState = getNetworkState();

var isAdAvailable = false;
var isRewardedSucessfully = false;
var network = {};
network.name = "admob";
network.callback = {};
network.token = 0;
document.addEventListener("deviceready",
	function(){
		eventToFire.fireEvent("adNetwork", network);
	}, false
);

network.isReady = function(eventName){
	//isActive ? (from CSV "1")
	return (parseInt("1") || 0);
}

network.isEventReady = function(eventName){
	return isAdAvailable;
}

network.launchEvent = function(eventName, C2cbOnFail, C2cbOnVideoDidAppear, C2cbOnVideoDidDisappear, forceReload, fallBackOnOfferWall){
	this.callback = {"eventName" : eventName, "C2cbOnFail" : C2cbOnFail, "C2cbOnVideoDidAppear" : C2cbOnVideoDidAppear, "C2cbOnVideoDidDisappear" : C2cbOnVideoDidDisappear, "forceReload" : forceReload, "fallBackOnOfferWall" : fallBackOnOfferWall};
	
	if(!this.isReady()){return false;}
	if(!this.isEventReady()){return false;}
	network.token = 1;
	admob.rewardvideo.show();
	isAdAvailable = false;
	isRewardedSucessfully = false;
	return true;
	
}
//-----------------------------------------------------------------

function rewardedError(isFail){
	cr_setSuspended(false);
	if(network.token == 1){
		if(typeof(network.callback.C2cbOnFail) != 'undefined' && typeof(c2_callFunction) == 'function') c2_callFunction(network.callback.C2cbOnFail, [network.callback.eventName, "1"]);
		if(typeof(network.callback.C2cbOnVideoDidDisappear) != 'undefined' && typeof(c2_callFunction) == 'function') c2_callFunction(network.callback.C2cbOnVideoDidDisappear, [network.callback.eventName, "1"]);
		eventToFire.fireEvent("rewarded_analytic",network.callback.eventName,false,"fail-error");
	}
	if(!isFail){

		delayOnFail_actualTimer = 0;
		clearInterval(delayOnFail_timerInter);
		admob.rewardvideo.prepare();
	}else{
		loadFail();
	}
	network.token = 0;
}

function rewardedSucess(){
	cr_setSuspended(false);

	delayOnFail_actualTimer = 0;
	clearInterval(delayOnFail_timerInter);
	admob.rewardvideo.prepare();
	if(network.token == 1){
		if(typeof(network.callback.C2cbOnVideoDidDisappear) != 'undefined' && typeof(c2_callFunction) == 'function') c2_callFunction(network.callback.C2cbOnVideoDidDisappear, [network.callback.eventName, "1"]);
		eventToFire.fireEvent("rewarded_analytic",network.callback.eventName,true);
	}
	network.token = 0;
}

//--------------------------------

function loadFail(){
	var actualState = getNetworkState();
	if(actualState != delayOnFail_lastNetworkState){
		delayOnFail_actualTimer = 0;
	}
	delayOnFail_timerInter = setTimeout(
		function(){
			admob.rewardvideo.prepare();
		},
		delayOnFail_timer[delayOnFail_actualTimer]*1000
	);
	delayOnFail_lastNetworkState = getNetworkState();
	delayOnFail_actualTimer = Math.min(delayOnFail_actualTimer+1, delayOnFail_timer.length-1);
}

document.addEventListener("online", function(){
	var actualState = getNetworkState();
	if(actualState != delayOnFail_lastNetworkState){
		delayOnFail_actualTimer = 0;
		clearInterval(delayOnFail_timerInter);
		loadFail();
	}
}, false);

function getNetworkState(){
	return (typeof(navigator) != "undefined" && typeof(navigator.connection) != "undefined")?navigator.connection.type:-1;
}

//-----------------------------------------------------------------

document.addEventListener("admob.rewardvideo.events.LOAD",function(e){
	isAdAvailable = true;
}.bind(this));

document.addEventListener("admob.rewardvideo.events.LOAD_FAIL",function(e){
	rewardedError(true);
}.bind(this));

document.addEventListener("admob.rewardvideo.events.OPEN",function(e){
	cr_setSuspended(true);
	if(typeof(network.callback.C2cbOnVideoDidAppear) != 'undefined' && typeof(c2_callFunction) == 'function') c2_callFunction(network.callback.C2cbOnVideoDidAppear, [network.callback.eventName, "1"]);
}.bind(network));

document.addEventListener("admob.rewardvideo.events.CLOSE",function(e){
	if(isRewardedSucessfully){
		rewardedSucess();
	}else{
		rewardedError(false);
	}
}.bind(this));

/*document.addEventListener("admob.rewardvideo.events.EXIT_APP",function(e){
	console.log("rewardvideo.events.EXIT_APP",e);
});*/

/*document.addEventListener("admob.rewardvideo.events.START",function(e){
	console.log("rewardvideo.events.START",e);
});*/

document.addEventListener("admob.rewardvideo.events.REWARD",function(e){
	isRewardedSucessfully = true;
}.bind(this));


}());
