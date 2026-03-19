;(function(){
var removeAds = false;

window.allNetworks_banner = [];
eventToFire.registerEvent("adNetwork_Banner",function(network){
	allNetworks_banner.push(network);
	network.callback.close = bannerClosed;
	network.callback.load = bannerLoaded;
});

////////////////////////////////
function bannerClosed(){}

function bannerLoaded(){
	launchBanner();
}
////////////////////

function isReady(){
	var ret = false;
	if(allNetworks_banner.length > 0 && typeof(navigator.connection) != "undefined" && navigator.connection.type != "none"){
		for(var i in allNetworks_banner){
			if(typeof(allNetworks_banner[i].isReady) == "function" && allNetworks_banner[i].isReady()){
				ret = true;
				break;
			}
		}
	}
	return ret;
}

function isBannerReady(){
	var ret=false;
	if(removeAds) return ret;
	for(var i in allNetworks_banner){
		if(typeof(allNetworks_banner[i].isBannerReady) == "function"){
			if(allNetworks_banner[i].isBannerReady()){
				ret = true;
				break;
			}
		}
	}
	return ret;
}

function launchBanner(){
	if(removeAds) return false;
	var availablesNetworks = [];
	for(var i in allNetworks_banner){
		if(typeof(allNetworks_banner[i].isBannerReady) == "function"){
			if(allNetworks_banner[i].isBannerReady()){
				availablesNetworks.push(allNetworks_banner[i]);
			}
		}
	}

	if(availablesNetworks.length != 0){
		var choosenNetwork = availablesNetworks[getRandomInt(0, availablesNetworks.length - 1)];
		console.log("banner","Choose", choosenNetwork.name,choosenNetwork, "from", availablesNetworks);
		if(!choosenNetwork.launchBanner()){
			bannerClosed();
		}
	}
}

function hideBanner(){
	var availablesNetworks = [];
	for(var i in allNetworks_banner){
		if(typeof(allNetworks_banner[i].hideBanner) == "function"){
			allNetworks_banner[i].hideBanner();
		}
	}
}


/*
*	c2LayoutChange(state,name)     : called on construct when layout change
*
*	string state : "in" when enter on the layout, "out" when left the layout
*	string name : name of the layout
*/
var lastLayout = "Loading";
eventToFire.registerEvent("c2LayoutChange",
	function (args){
		var state = args.state;
		var name = args.name;
		var obj = args.obj;
		
		if(state == "in"){
			launchBanner();
		}
		switch(name) {
			case "Splash":


			break;
			case "GameOver":

			break;
		}
		lastLayout = name;
	}
);

eventToFire.registerEvent("remove_all_ads",function(state){
	if(state){
		hideBanner();
		removeAds = true;
	}else{
		launchBanner();
		removeAds = false;
	}
});


//---------------------------UTILS-------------------------------------------------------------


function getRandomInt(min, max) { //include include
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


}());