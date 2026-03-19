(function(){

var activeAnalytic = parseInt(1) | 0;
var partner = "";
var PT_analytics= {};


eventToFire.registerEvent("c2LayoutChange",
function (args){
	var state = args.state;
	var name = args.name;
	var obj = args.obj;
	if(typeof(PT_analytics.setCurrentScreen) == "undefined") return;
	if(activeAnalytic) {
		if(state == "in") PT_analytics.setCurrentScreen(name);
		PT_analytics.logEvent("layout_change",{
			"name" :
				((typeof(obj) != "undefined" && typeof(obj.gameMode) != "undefined" && obj.gameMode != "")?obj.gameMode+"_":"")+
				state+"_"+
				name+"_"+
				((typeof(obj) != "undefined" && typeof(obj.level) != "undefined")?obj.level:-1)
		});

		if(name == "GameMain"){
			PT_analytics.logEvent("level",{
				"levelName": 
					((typeof(obj) != "undefined" && typeof(obj.gameMode) != "undefined" && obj.gameMode != "")?obj.gameMode+"_":"")+
					state+"_"+
					((typeof(obj) != "undefined" && typeof(obj.level) != "undefined")?obj.level:-1)
			});
		}
	}
});

document.addEventListener("deviceready", 
	function() {
		try{
			if (activeAnalytic) PT_analytics = window.cordova.plugins.firebase.analytics;
		}catch(e){
			activeAnalytic = 0;
		}
		if(activeAnalytic){
			PT_analytics.setUserId(device.uuid);
			PT_analytics.setUserProperty("partner",partner);
		}

	}, false
);

eventToFire.registerEvent("rewarded_analytic",function(eventName,success,info){
	if(!activeAnalytic){return;}
	var currentLayout = "undefined";
	try{
		currentLayout = JSON.parse(c2_callFunction('getGameInfo',[])).currentLayout;
	}catch(e){}
	PT_analytics.logEvent("rewarded",{
		"name": eventName+"_"+currentLayout+"_"+((success)?"success":"error")+((typeof(info) != "undefined")?"_"+info:"")
	});
});

eventToFire.registerEvent("IAP_analytic",function(eventName,status){
	if(!activeAnalytic){return;}
	var currentLayout = "";
	try{
		currentLayout = JSON.parse(c2_callFunction('getGameInfo',[])).currentLayout+"_";
	}catch(e){}
	PT_analytics.logEvent("spend_real_currency",{
		"name": eventName+"_"+currentLayout+status
	});
})

eventToFire.registerEvent("userChoosesToReborn",
	function(userChoosesToReborn){
		if(activeAnalytic && userChoosesToReborn) PT_analytics.logEvent("want_to_reborn");
	}
);

eventToFire.registerEvent("shopAction_upgradeItem",shopItemAction);
eventToFire.registerEvent("shopAction_buyItem",shopItemAction);

function shopItemAction(item){
	if(!activeAnalytic){return;}
	PT_analytics.logEvent("spend_virtual_currency",{
		"item_name":item.idName,
		"virtual_currency_name":getMoneyType(item),
		"value":item.objectJsonBase[Math.max(0,item.quantity)].price,
		"item": item.idName+"_"+ Math.max(0,item.quantity)
	});
}

function getMoneyType(item){
	try{
		if(item.type == "upgradable"){
			return item.objectJsonBase[item.quantity].moneyType;
		}else{
			return item.objectJsonBase.moneyType;
		}
	}catch(e){
		return "normal";
	}
}


var gameOverByRetry = false;
eventToFire.registerEvent("c2:replay",function(){
	gameOverByRetry = true;
});


eventToFire.registerEvent("gameOverResult",function(allScore,victory,obj){
	if(!activeAnalytic){return;}

	PT_analytics.logEvent("gameOver_result",{
		"levelName": 
			((typeof(obj) != "undefined" && typeof(obj.gameMode) != "undefined" && obj.gameMode != "")?obj.gameMode+"_":"")+
			((typeof(obj) != "undefined" && typeof(obj.level) != "undefined")?obj.level:-1)+"_"+
			((gameOverByRetry)?"retry":((typeof(victory) != "undefined")?((victory)?"victory":"defeat"):"unknow"))
	});
	gameOverByRetry = false;
});


eventToFire.registerEvent("c2:touchesUsed",function(touchesUsed){
	if(!activeAnalytic){return;}
	var gameMode = "default";
	var level = "default";
	try{
		gameMode = JSON.parse(c2_callFunction('getGameInfo',[])).gameMode+"_";
		level = JSON.parse(c2_callFunction('getGameInfo',[])).level+"_";
	}catch(e){}
	PT_analytics.logEvent("touchesUsed",{
		"name": gameMode+level+touchesUsed
	});
});

})();

/*
level
	levelName: GAMEMODE_[in,out]_level

spend_virtual_currency
	item_name: NAMEITEM
	virtual_currency_name: ["normal",coins","diamonds",....]
	value: COST
	item: NAMEITEM_LEVEL

layout_change
	name: GAMEMODE_[in,out]_LAYOUTNAME_LEVELNUMBER

rewarded
	name : EVENTNAME_LAYOUTNAME_[SUCCES,FAIL]_[fail-error,No-Network-Available]

want_to_reborn
*/
