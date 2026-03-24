;(function(){
var isAdAvailable = false;
var requestFail = false;
var isOnRequest = true;
var network = {};
network.name = "admob";
network.callback = {
	load:undefined,
	close:undefined
};

document.addEventListener("deviceready",
	function(){
		eventToFire.fireEvent("adNetwork_Banner", network);
	}, false
);

network.isReady = function(eventName){
	return (parseInt("1") || 0);
}

network.isBannerReady = function(){
	if(isOnRequest){return false;}
	if(requestFail){
		isOnRequest = true;
		admob.banner.prepare();
		return false;
	}
	return isAdAvailable;
}

network.launchBanner = function(){
	if(!this.isReady()){return false;}
	if(!this.isBannerReady()){return false;}
	admob.banner.show();
	return true;
}

network.hideBanner = function(){
	if(!this.isReady()){return false;}
	admob.banner.hide();
	return true;
}

function closedBanner(){
	if(typeof(network.callback.close) != 'undefined') network.callback.close();
}
//-----------------------------------------------------------------

document.addEventListener("admob.banner.events.LOAD",function(e){
	requestFail = false;
	isOnRequest = false;
	isAdAvailable = true;
	if(typeof(network.callback.load) != 'undefined') network.callback.load();
}.bind(this));

document.addEventListener("admob.banner.events.LOAD_FAIL",function(e){
	requestFail = true;
	isOnRequest = false;
}.bind(this));

document.addEventListener("admob.banner.events.OPEN",function(e){
});

document.addEventListener("admob.banner.events.CLOSE",function(e){
}.bind(this));

/*document.addEventListener("admob.banner.events.EXIT_APP",function(e){
	console.log("interstitial.events.EXIT_APP",e);
});*/

}());