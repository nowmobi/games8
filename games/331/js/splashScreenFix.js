(function(){

	(function verifySplashScreen(){
		if(typeof(cr_getC2Runtime) == "function" &&
			cr_getC2Runtime() &&
			cr_getC2Runtime().loaderlogos && 
			cr_getC2Runtime().loaderlogos["logo"]&&
			cr_getC2Runtime().loaderlogos["logo"].complete&&
			typeof(navigator.splashscreen) != "undefined"){
			navigator.splashscreen.hide()
		}else{
			setTimeout(verifySplashScreen,10);
		}

	})();

}());

