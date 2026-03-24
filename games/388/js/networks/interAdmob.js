;(function(){
var delayOnFail_timer = [10,30,60,300,600];
var delayOnFail_actualTimer = 0;
var delayOnFail_timerInter;
var delayOnFail_lastNetworkState = getNetworkState();

var isAdAvailable = false;
var network = {};
network.name = "admob";
network.callback = {
	load:undefined,
	close:undefined
};

document.addEventListener("deviceready",
	function(){
		eventToFire.fireEvent("adNetwork_Inter", network);
	}, false
);

network.isReady = function(eventName){
	return (parseInt("1") || 0);
}

network.isInterReady = function(){
	return isAdAvailable;
}

network.launchInter = function(){
	if(!this.isReady()){return false;}
	if(!this.isInterReady()){return false;}
	admob.interstitial.show();
	isAdAvailable = false;
	return true;
	
}

function closedInter(){
	if(typeof(network.callback.close) != 'undefined') network.callback.close();
	delayOnFail_actualTimer = 0;
	clearInterval(delayOnFail_timerInter);
	admob.interstitial.prepare();
}


function loadFail(){
	if(typeof(network.callback.close) != 'undefined') network.callback.close();
	var actualState = getNetworkState();
	if(actualState != delayOnFail_lastNetworkState){
		delayOnFail_actualTimer = 0;
	}

	delayOnFail_timerInter = setTimeout(
		function(){
			admob.interstitial.prepare();
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

document.addEventListener("admob.interstitial.events.LOAD",function(e){
	isAdAvailable = true;
	if(typeof(network.callback.load) != 'undefined') network.callback.load();
}.bind(this));

document.addEventListener("admob.interstitial.events.LOAD_FAIL",function(e){
	loadFail();
}.bind(this));

document.addEventListener("admob.interstitial.events.OPEN",function(e){
});

document.addEventListener("admob.interstitial.events.CLOSE",function(e){
	closedInter();
}.bind(this));

/*document.addEventListener("admob.interstitial.events.EXIT_APP",function(e){
	console.log("interstitial.events.EXIT_APP",e);
});*/

}());