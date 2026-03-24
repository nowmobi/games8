;(function(){
/*********************************************
				Shop Manager
*********************************************/
	/*********************************************
				var
	*********************************************/
	var shopManager = function(){};
	/*********************************************
				function
	*********************************************/
	/*
	*	shopManager.init()     : load json and create stash
	*
	*	@param : string _json
	*/
	shopManager.prototype.init = function(_json){
		var ret = this.getBaseStash();
		for(var i in _json.shop){
			ret.stash.items[i] = this.createObject(_json.shop[i].unlocked,_json.shop[i].quantity);
		}
		return JSON.stringify(ret);
	};

	shopManager.prototype.getBaseStash = function() {
		return {
			"stash":{
				"items":{},
				"money":{
					"normal":{
						"gold":0,
						"silver":0,
						"bronze":0
					},
					"premium":{
						"gold":0
					}
				}
			}
		};
	};

	shopManager.prototype.createObject = function(_unlocked,_quantity){
		var unlocked = (typeof(_unlocked)=="undefined")?1:_unlocked;
		var quantity = (typeof(_quantity)=="undefined")?0:_quantity;
		return {
			"unlocked":unlocked,
			"quantity":quantity
		};
	};

	shopManager.prototype.test = function(_variable,_comparator,_value){
		try{
			if(eval("'"+_variable+"'" + _comparator + "'"+_value+"'")){
				return true;
			}
		}catch(e){
			console.error("function Test of 'shopManager' ERROR");
			console.error(e.stack);
		}
		return false;
	};

/*********************************************
				Playtouch object
*********************************************/
	if(typeof(window.playtouch) != "object"){ window.playtouch = {};}
	playtouch.shopManager = new shopManager();
})();

