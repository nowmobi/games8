window.setCookie = function (cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
	return true;
};

window.getCookie = function(cname, defaultVal) {
	if(typeof(defaultVal) == "undefined") defaultVal = "";
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return defaultVal;
};

window.getLocalStorageItem = function (item, defaultVal){
	if(typeof(defaultVal) == "undefined") defaultVal = "";
	if(typeof(localStorage) == "undefined") return defaultVal;
	var tmpVal = localStorage.getItem(item);
	if(tmpVal == null) return defaultVal;
	return tmpVal;
};

window.setLocalStorageItem = function (item, val){
	if(typeof(val) == "undefined") val = "";
	if(typeof(localStorage) == "undefined") return false;
	localStorage.setItem(item, val);
	return true;
};

window.getSaveSRC = function(){
	var toRet = "cookie";
	if(typeof(localStorage) != "undefined"){
		localStorage.setItem('testWriteCordova', 'test');
		if(localStorage.getItem('testWriteCordova') == 'test') toRet = "local";
	}
	return toRet;
};

window.autoGet = function (item, devaultVal){
	var saveSRC = getSaveSRC();
	switch(saveSRC){
		case "cookie":
			return getCookie(item, devaultVal);
		break;
		case "local":
			return getLocalStorageItem(item, devaultVal);
		break;
		default:
			return devaultVal;
		break;
	}
};

window.autoSet = function (item, val, duration){
	if(typeof(duration) != "number") duration = 365;
	duration = parseInt(duration);
	var saveSRC = getSaveSRC();
	switch(saveSRC){
		case "cookie":
			return setCookie(item, val, duration);
		break;
		case "local":
			return setLocalStorageItem(item, val);
		break;
		default:
			return false;
		break;
	}
};
