;(function(){

var init = false;
var jsonLoaded = false;
var leaderboards_list = {};

var partner = {};
partner.name = "android";

document.addEventListener("deviceready",
	function(){
		if(init){return;}
		init = true;
		window.eventToFire.fireEvent("gameConnect_requireLogin");
		window.eventToFire.fireEvent("leaderboard_addPartner", partner);
		
		window.game.onSubmitScoreSucceeded = function() {
			eventToFire.fireEvent("playtouchLeaderboard_submit-succeededed");
		};	
		window.game.onSubmitScoreFailed = function() {
			eventToFire.fireEvent("playtouchLeaderboard_submit-failed");
		};
		loadLeaderboard();
	}, false
);


partner.isReady = function(){
	try{
		return ((window.game && window.game.isLoggedIn && window.game.isLoggedIn() && jsonLoaded) || false);
	}catch(e){
		return false;
	}
}

partner.canDisplay = function(){
	window.eventToFire.fireEvent("leaderboard:ICanDisplayLeaderboard",true);
}

partner.submitScore = function(leaderboard, score){
	if(!this.isReady()){return;}
	if(getLeaderboardCodePlatform(leaderboard) == ""){return;}
	window.game.submitScore(getLeaderboardCodePlatform(leaderboard), score);
}

partner.showLeaderboard = function(leaderboard,canFallback){
	if(!this.isReady()){return;}
	var leaderboard_code = getLeaderboardCodePlatform(leaderboard);
	if(leaderboard_code == ""){
		if(canFallback){
			this.showLeaderboards();
		}
		return;
	}
	window.game.showLeaderboard(leaderboard_code);
}

partner.showLeaderboards = function(){
	if(!this.isReady()){return;}
	window.game.showLeaderboards();
}

function loadLeaderboard(){
	try{
		$.ajax({
			url:"js/leaderboard/leaderboards.json",
			complete: function(response){
				if(response.readyState == 4 && response.status == 200){
					var ac = JSON.parse(response.responseText);
					for (var i in ac) {
						leaderboards_list[ac[i]["leaderboard_code"]] = ac[i]["leaderboard_code_android"];
					};
					jsonLoaded = true;
				}
			},
			method :"GET"
		});
	}catch(e){}
}

function getLeaderboardCodePlatform(code){
	return leaderboards_list[code] || "";
}

}());