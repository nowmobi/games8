var IAP_debug = false;
var IAP_activated = (1 == 1)? true : false;
var IAP_ready = false;
var IAP_app = {};
var IAP_buyableProducts = {};
var IAP_buyableProducts_type = {};

//PREPARE
IAP_app.prepareList = function(){
	var IAP_listOfProduct = "remove_all_ads";
	if(IAP_listOfProduct != ""){
		var IAP_splittedList = IAP_listOfProduct.split(",");
		for (var i = 0; i < IAP_splittedList.length; i++) {
			IAP_buyableProducts[IAP_splittedList[i]] = "buyable";
			IAP_buyableProducts_type[IAP_splittedList[i]] = store.NON_CONSUMABLE;
		};
	}
	var IAP_listOfProduct_consumable = "";
	if(IAP_listOfProduct_consumable != ""){
		var IAP_splittedList_consumable = IAP_listOfProduct_consumable.split(",");
		for (var i = 0; i < IAP_splittedList_consumable.length; i++) {
			IAP_buyableProducts[IAP_splittedList_consumable[i]] = "buyable";
			IAP_buyableProducts_type[IAP_splittedList_consumable[i]] = store.CONSUMABLE;
		};
	}

	checkLocalStorage_IAP_remove_all_ads();
}
//-------------------

IAP_app.initialize = function() {
	if(IAP_debug) console.log('initialize');
	document.addEventListener('deviceready', this.bind(this.onDeviceReady), false);
};
IAP_app.onDeviceReady = function() {
	if(IAP_debug) console.log('onDeviceReady');
	this.prepareList();
	this.initStore();
};

IAP_app.initStore = function() {
	if (typeof(window.store) == "undefined" || !IAP_activated) {
		if(IAP_debug) console.log('Store not available');
		return;
	}
	//store.verbosity = store.DEBUG;
	
	if(IAP_debug) console.log('registerProducts');
	for(var name in IAP_buyableProducts){
		store.register({
			id:    	name, // id without package name!
			alias: 	name,
			type:   IAP_buyableProducts_type[name]
		});
		store.when(name).approved(function (product) {
			if(IAP_debug) console.log('You just unlocked the ',product.id,'!', product);
			IAP_buyableProducts[product.id] = "owned";

			product.playtouch_fromIAP = true;
			eventToFire.fireEvent("IAP_unlock_"+product.id,product);
			eventToFire.fireEvent("reward_grant",product.id,(product.quantity || 1),JSON.stringify(product));

			if(product.id != "remove_all_ads" && product.id.indexOf("remove_all_ads") != -1){
				IAP_buyableProducts["remove_all_ads"] = "owned";
				eventToFire.fireEvent("IAP_unlock_remove_all_ads",{});
				eventToFire.fireEvent("reward_grant","remove_all_ads",1,"{}");
			}

			c2_callFunction("changeStatusOfBuy",["hide"]);
			eventToFire.fireEvent("IAP_analytic",product.id,"done");
		});
		store.when(name).updated(function (product) {
			if(IAP_debug) console.log('Update ',product.id,'!', product);
			if(product.owned && product.type == store.NON_CONSUMABLE){
				product.playtouch_fromIAP = true;
				IAP_buyableProducts[product.id] = "owned";
				eventToFire.fireEvent("IAP_update_owned_"+product.id,product);

				if(product.id != "remove_all_ads" && product.id.indexOf("remove_all_ads") != -1){
					IAP_buyableProducts["remove_all_ads"] = "owned";
					eventToFire.fireEvent("IAP_update_owned_remove_all_ads",{});
				}

				c2_callFunction("changeStatusOfBuy",["hide"]);
			}
		});
	}

	store.when("product").cancelled(function(){
		c2_callFunction("changeStatusOfBuy",["hide"]);
	});

	store.ready(function() {
		IAP_ready = true;
	});
	
	if(IAP_debug) console.log('refresh');
	store.refresh();
}

IAP_app.bind = function(fn) {
	return function() {
		fn.call(IAP_app, arguments);
	};
};

function IAP_C2CallbakDispatcher(cb, params, ack){
	if(typeof(cb) == "undefined") cb = "";
	if(cb == "") return false;
	if(typeof(ack) != "boolean") ack = true;
	
	if(typeof(params) == "undefined") params = [];
	if(params == null) params = [];
	if(typeof(params.join) != "function"){//is array
		params = [params];
	}
	
	if(typeof(c2_callFunction) != "function"){
		if(ack){
			setTimeout(IAP_C2CallbaksDispatcher, 100, cb, params, ack);
			return true;
		}else{
			return false;
		}
	}
	if(IAP_debug) console.log("C2 Call : ", arguments);
	return c2_callFunction(cb, params);
}

function IAP_getPrice(alias){
	if(!IAP_ready){ return -1;}
	if(typeof(alias) == "undefined"){ alias = "";}
	if(typeof(IAP_buyableProducts[alias]) == "undefined"){ return -1;}
	var price = (store.get(alias).price || -1);
	if(price == "-1" || price == -1){
		IAP_getInfoAgain();
	}
	return price;
}

var iapGetInfoAgain_canCheck = true;
var iapGetInfoAgain_timerBetween = 20;
function IAP_getInfoAgain(){
	if(!iapGetInfoAgain_canCheck){return;}
	iapGetInfoAgain_canCheck = false;
	setTimeout(function(){iapGetInfoAgain_canCheck = true;},iapGetInfoAgain_timerBetween*1000);

	var item = [];
	for(var i in IAP_buyableProducts){
		item.push(i);
	}
	store.inappbilling.getProductDetails(IAP_getInfoAgain_success,function(){console.log("fail",arguments)},item);
}


function IAP_getInfoAgain_success(validProducts) {
    var p;
    for (var i = 0; i < validProducts.length; ++i) {

        if (validProducts[i].productId){
            p = store.products.byId[validProducts[i].productId];
        }
        else{
            p = null;
        }

        if (p) {
            p.set({
                title: validProducts[i].title || validProducts[i].name,
                price: validProducts[i].price || validProducts[i].formattedPrice,
                priceMicros: validProducts[i].price_amount_micros,
                description: validProducts[i].description,
                currency: validProducts[i].price_currency_code ? validProducts[i].price_currency_code : "",
                state: store.VALID
            });
            p.trigger("loaded");
        }
    }
    store.iabGetPurchases();
}

function IAP_buy(productToBuy, C2_successCb, C2_failCb){
	if(!IAP_ready) return false;
	if(typeof(productToBuy) == "undefined") productToBuy = "";
	if(typeof(C2_successCb) == "undefined") C2_successCb = "";
	if(typeof(C2_failCb) == "undefined") C2_failCb = "";
	if(typeof(IAP_buyableProducts[productToBuy]) == "undefined"){
		IAP_C2CallbakDispatcher(C2_failCb, [0], false);
		return false;
	}

	eventToFire.fireEvent("IAP_analytic",productToBuy,"initiated");

	var theOrder = store.order(productToBuy)
		.then(function(){
				IAP_C2CallbakDispatcher(this.C2_successCb, [1], false);
			}.bind(
					{C2_successCb:C2_successCb}
				)
		)
		.error(function(){
			IAP_C2CallbakDispatcher(this.C2_failCb, [0], false);}.bind({C2_failCb:C2_failCb})
		);
}

function IAP_isReady(product){
	if(!IAP_ready) return "0";
	//if no product specified, just reply if the store is ready
	if(typeof(product) == "undefined") return (IAP_ready) ? "1": "0";
	if(product == "") return (IAP_ready) ? "1": "0";
	if(typeof(IAP_buyableProducts[product]) == "undefined") return "0";
	if(IAP_buyableProducts[product] != "buyable") return "0";
	try{
		JSON.parse(c2_callFunction('getGameInfo',[])).gameName;
	}catch(e){
		 return "0";
	}
	return "1";
}

// use it just for DEV !!!!!
function IAP_consumeProduct(product){
	console.info("USE IT ONLY ON DEV !!!!");
	var transaction = product.transaction;
	product.transaction = null;
	store.inappbilling.consumePurchase(
		function(product) {
			if(IAP_debug) console.log("consume success");
			store.get(product.id).state = store.VALID;
			IAP_buyableProducts[product.id] = "buyable";
			eventToFire.fireEvent("IAP_consume_"+product.id,product);
		}.bind(this,product),
		function(err, code) {
			if(IAP_debug) console.log("consume error " + err)
		},
		product.id,
		transaction.id
	);
}

eventToFire.registerEvent("reward_consume", function(objString){
	try{		
		var obj = objString;
		if(typeof(objString) == "string"){
			obj = JSON.parse(objString);
		}
		if(obj.playtouch_fromIAP){
			if(obj.type == store.CONSUMABLE){
				IAP_buyableProducts[obj.id] = "buyable";
			}
			store.get(obj.id).finish();
		}
	}catch(e){
		console.error(e);
	}
});

IAP_app.initialize();

var IAP_firstCheckRefresh = false;
eventToFire.registerEvent("c2LayoutChange",
function (args){
  var state = args.state;
  var name = args.name;
  var obj = args.obj;
						  
  if(typeof(store) != "undefined" && !IAP_firstCheckRefresh) {
	  if(/*name == "shop" &&*/ state == "in"){
		  store.refresh();
	  }
	  else if(/*name == "shop" &&*/ state == "out"){
		  store.refresh();
		  IAP_firstCheckRefresh = true;
	  }
  }
});

//------------------- unlock_all_weapons -----------------------------------------

	eventToFire.registerEvent("IAP_unlock_unlock_all_weapons",function(product){
		eventToFire.fireEvent("reward_consume",JSON.stringify(product));
		eventToFire.fireEvent("IAP_update_owned_unlock_all_weapons");
	});
	eventToFire.registerEvent("IAP_update_owned_unlock_all_weapons",function(){
		IAP_GET_unlock_all_weapons();
	});

	function prepare_unlock_all_weapons_poor(){
		if(typeof(window.newStash.stash.items.hadou) == "undefined"){	window.newStash.stash.items.hadou = {"unlocked":1,"quantity":4};	}else{	window.newStash.stash.items.hadou.unlocked = 1;	window.newStash.stash.items.hadou.quantity = 4;	}
		if(typeof(window.newStash.stash.items.life) == "undefined"){	window.newStash.stash.items.life = {"unlocked":1,"quantity":4};	}else{	window.newStash.stash.items.life.unlocked = 1;	window.newStash.stash.items.life.quantity = 4;	}
		for(var weaponNb = 0; weaponNb < 27; weaponNb++){
			if(typeof(window.newStash.stash['weapon_' + weaponNb]) == "undefined"){
				window.newStash.stash.items['weapon_' + weaponNb] = {};
			}
			window.newStash.stash.items['weapon_' + weaponNb]['unlocked'] = 1;
			window.newStash.stash.items['weapon_' + weaponNb]['quantity'] = 7;
		}
		for(var weaponNb = 0; weaponNb < 5; weaponNb++){
			if(typeof(window.newStash.stash['bonus_' + weaponNb]) == "undefined"){
				window.newStash.stash.items['bonus_' + weaponNb] = {};
			}
			window.newStash.stash.items['bonus_' + weaponNb]['unlocked'] = 1;
			window.newStash.stash.items['bonus_' + weaponNb]['quantity'] = 6;
		}
		for(var weaponNb = 0; weaponNb < 4; weaponNb++){
			if(typeof(window.newStash.stash['passive_' + weaponNb]) == "undefined"){
				window.newStash.stash.items['passive_' + weaponNb] = {};
			}
			window.newStash.stash.items['passive_' + weaponNb]['unlocked'] = 1;
			window.newStash.stash.items['passive_' + weaponNb]['quantity'] = 6;
		}
	}

	function IAP_GET_unlock_all_weapons(){
		if(IAP_debug) console.log('Unlocking every weapons!');
		//{"stash":{"items":{"weapon_0":{"unlocked":1,"quantity":4},"weapon_1":{"unlocked":1,"quantity":4},"weapon_2":{"unlocked":1,"quantity":4},"weapon_3":{"unlocked":1,"quantity":4},"weapon_4":{"unlocked":1,"quantity":4},"weapon_5":{"unlocked":1,"quantity":4},"weapon_6":{"unlocked":1,"quantity":4},"weapon_7":{"unlocked":1,"quantity":4},"weapon_8":{"unlocked":1,"quantity":4},"weapon_9":{"unlocked":1,"quantity":4},"weapon_10":{"unlocked":1,"quantity":4},"weapon_11":{"unlocked":1,"quantity":4},"life":{"unlocked":1,"quantity":4},"hadou":{"unlocked":1,"quantity":4}},"money":{"normal":{"gold":8616,"silver":0,"bronze":0},"premium":{"gold":0}}}}

		//get stash
		var defaultStash = "error";
		if(typeof(playtouch) != "undefined"){
			if(typeof(playtouch.shopManager) != "undefined"){
				if(typeof(playtouch.shopManager.getBaseStash) != "undefined") defaultStash = playtouch.shopManager.getBaseStash();
			}
		}
		if(defaultStash == "error"){
			if(typeof(shopManager) != "undefined"){
				if(typeof(shopManager.getBaseStash) != "undefined") var defaultStash = shopManager.getBaseStash();
			}
		}
		var IAM_gameName = JSON.parse(c2_callFunction('getGameInfo',[])).gameName;
		var currentStash = getLocalStorageItem(IAM_gameName + 'Stash', false) || defaultStash;
		if(currentStash == "error"){
			setTimeout(IAP_GET_unlock_all_weapons, 200);
			return false;
		}
		if(typeof(currentStash) == "string"){
			try{
				window.newStash = JSON.parse(currentStash);
			}catch(e){
				return false;
			}
		}else{
			window.newStash = currentStash;
		}
		if(typeof(window.newStash) == "undefined"){	setTimeout(IAP_GET_unlock_all_weapons, 200);	return false;	}
		if(typeof(window.newStash.stash) == "undefined"){	setTimeout(IAP_GET_unlock_all_weapons, 200);	return false;	}
		if(typeof(window.newStash.stash.items) == "undefined"){	setTimeout(IAP_GET_unlock_all_weapons, 200);	return false;	}

		
		if(typeof(jQuery) == "undefined"){
			setTimeout(IAP_GET_unlock_all_weapons, 200);
			return false;
		}
		$.ajax({
			  url: "shop.json",
			  dataType: "json"
			}).done(function(data) {
				var shopsObject = data;
				if(typeof(shopsObject) == "string"){
					try{
						shopsObject = JSON.parse(data);
					}catch(e){
						prepare_unlock_all_weapons_poor();
					}
				}
				if(typeof(shopsObject.shop) == "undefined"){	prepare_unlock_all_weapons_poor();	return false;	}
				for(var anItem in shopsObject.shop){
					if(shopsObject.shop.hasOwnProperty(anItem)){
						if(typeof(shopsObject.shop[anItem].quantityMax) != "undefined"){
							if(typeof(window.newStash.stash.items[anItem]) == "undefined"){
								window.newStash.stash.items[anItem] = {};
							}
							window.newStash.stash.items[anItem].unlocked = 1;
							window.newStash.stash.items[anItem].quantity = shopsObject.shop[anItem].quantityMax;
						}
					}
				}
				IAP_servingGift();
			}).fail(function(){
				prepare_unlock_all_weapons_poor();
				IAP_servingGift();
			});
		return true;
	}

	function refreshShop(){
		IAP_C2CallbakDispatcher("loadSavedStashOrDefaultAfterLoadShopManager", [], true);
		IAP_C2CallbakDispatcher("updateShopGUI", [], true);
	}

	function IAP_servingGift(){
		if(getSaveSRC() == "local"){
			localStorage.setItem(JSON.parse(c2_callFunction('getGameInfo',[])).gameName + 'Stash', JSON.stringify(window.newStash));
			//localStorage.setItem('stickmanFighterEB_GCODEStash', JSON.stringify(window.newStash));
		}else{
			setLocalStorageItem(JSON.parse(c2_callFunction('getGameInfo',[])).gameName + 'Stash', JSON.stringify(window.newStash));
			//setCookie('stickmanFighterEB_GCODEStash', JSON.stringify(window.newStash), 365);
		}
		if(IAP_debug) console.log("applying : ", JSON.stringify(window.newStash));
		refreshShop();
	}
//-----------------------------------------------------------
//
//------------------- remove_all_ads -----------------------------------------
	eventToFire.registerEvent("IAP_unlock_remove_all_ads",function(product){
		eventToFire.fireEvent("reward_consume",JSON.stringify(product));
		eventToFire.fireEvent("IAP_update_owned_remove_all_ads");
	});

	eventToFire.registerEvent("IAP_update_owned_remove_all_ads",function(){
		IAP_buyableProducts["remove_all_ads"] = "buyed";
		setLocalStorageItem("IAP_remove_all_ads", "ok");
		eventToFire.fireEvent("remove_all_ads",true);
	});

	eventToFire.registerEvent("IAP_consume_remove_all_ads",function(product){
		product.owned = false;
		setLocalStorageItem("IAP_remove_all_ads", "notOk");
		eventToFire.fireEvent("remove_all_ads",false);
	});

	function checkLocalStorage_IAP_remove_all_ads(){
		if(getLocalStorageItem("IAP_remove_all_ads","notOk") === "ok"){
			eventToFire.fireEvent("IAP_update_owned_remove_all_ads");
		}
	}
	checkLocalStorage_IAP_remove_all_ads();
//-----------------------------------------------------------


