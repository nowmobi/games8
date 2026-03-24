;(function(){
	
var init = false;

eventToFire.registerEvent("gameConnect_requireLogin",function(){
	if(init){return;}
	if(game.isLoggedIn()){return;}
	init = true;
	window.game.setUp();
	window.game.login();
});

}());