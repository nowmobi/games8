;(function(){
var achievementsList = {};
var init = false;
document.addEventListener("deviceready", function(){
	if(init){return;}
	init = true;
	window.eventToFire.fireEvent("gameConnect_requireLogin");
	registerCallback();
	loadAchievement();
}, false);

window.eventToFire.registerEvent("c2:achievement_show",c2EventShow);
window.eventToFire.registerEvent("c2:achievement:show",c2EventShow);

window.eventToFire.registerEvent("c2:achievement_unlock",c2EventUnlock);
window.eventToFire.registerEvent("c2:achievement:unlock",c2EventUnlock);

window.eventToFire.registerEvent("c2:achievement_increment",c2EventIncrement);
window.eventToFire.registerEvent("c2:achievement:increment",c2EventIncrement);

function c2EventShow(obj){
	if(!game.isLoggedIn()){return false;}
	game.showAchievements();
}

function c2EventUnlock(obj){
	if(!achievementUnlock(obj)){
		achievementsOffline.unlock(obj.achievement_code);
	}
}

function c2EventIncrement(obj,increment){
	if(!achievementIncrement(obj,increment)){
		achievementsOffline.increment(obj.achievement_code, increment);
	}
};

//__________
function achievementUnlock(obj){
	if(!game.isLoggedIn()){return false;}
	if(!achievementCodeExist(obj.achievement_code)){return false;}
	window.game.unlockAchievement(getIdByCode(obj.achievement_code));
	return true;
}

function achievementIncrement(obj,increment){
	if(!game.isLoggedIn()){return false;}
	if(!achievementCodeExist(obj.achievement_code)){return false;}
	window.game.incrementAchievement(getIdByCode(obj.achievement_code),increment);
	return true;
}


//LOAD
function getIdByCode(code){
	if(!achievementCodeExist(code)){return "";}
	return achievementsList[code];
}

function achievementCodeExist(code){
	if(achievementsList[code]){return true;}
	return false;
}

function loadAchievement(){
	try{
		$.ajax({
			url:"js/achievements_list.json",
			complete: function(response){
				if(response.readyState == 4 && response.status == 200){
					var ac = JSON.parse(response.responseText);
					for (var i = 0; i < ac.length; i++) {
						achievementsList[ac[i]["achievement_code"]] = ac[i]["achievements-alias_name"];
					};
				}
			},
			method :"GET"
		});
	}catch(e){}
}

// window.game.incrementAchievement(achievementId1, 2); //achievementId, incrementalStepOrCurrentPercent: Incremental step (android) or current percent (ios) for incremental achievement.
// window.game.resetAchievements();//only supported on ios

function registerCallback(){
	window.game.onLoginSucceeded = function(result) {
		var playerDetail = result;
		// console.log("game",'onLoginSucceeded: ' + playerDetail['playerId'] + ' ' + playerDetail['playerDisplayName']);
		achievementsOffline.checkSave();
	};
	window.game.onLoginFailed = function() {
		// console.log("game",'onLoginFailed');
	};

	//
	window.game.onUnlockAchievementSucceeded = function() {
		// console.log("game",'onUnlockAchievementSucceeded');
	};
	window.game.onUnlockAchievementFailed = function() {
		// console.log("game",'onUnlockAchievementFailed');
	};
	window.game.onIncrementAchievementSucceeded = function() {
		// console.log("game",'onIncrementAchievementSucceeded');
	};
	window.game.onIncrementAchievementFailed = function() {
		// console.log("game",'onIncrementAchievementFailed');
	};
	window.game.onResetAchievementsSucceeded = function() {
		// console.log("game",'onResetAchievementsSucceeded');
	};
	window.game.onResetAchievementsFailed = function() {
		// console.log("game",'onResetAchievementsFailed');
	};
	//
	window.game.onGetPlayerImageSucceeded = function(result) {
		var playerImageUrl = result;
		// console.log("game",'onGetPlayerImageSucceeded: ' + playerImageUrl);
	};
	window.game.onGetPlayerImageFailed = function() {
		// console.log("game",'onGetPlayerImageFailed');
	};
}

//OFFLINE SAVE
var achievementsOffline = {};
achievementsOffline.init = function() {
	this.saveKey = "saveAchOffline";
	this.arrayNotif = {};
	this.load();
};

achievementsOffline.load = function() {
	this.arrayNotif = JSON.parse(autoGet(this.saveKey,"{}"));
};

achievementsOffline.save = function() {
	var count = 0;
	for(var i in this.arrayNotif){count++;break;}
	if(count == 0){return;}
	autoSet(this.saveKey,JSON.stringify(this.arrayNotif));
};

achievementsOffline.checkIfExist = function(achievement_code){
	if(!this.arrayNotif[achievement_code]){
		this.arrayNotif[achievement_code] = {};
	}
}

achievementsOffline.unlock = function (achievement_code){
	this.checkIfExist(achievement_code);
	this.arrayNotif[achievement_code].t = "u";
	this.save();
}

achievementsOffline.increment = function (achievement_code,increment){
	this.checkIfExist(achievement_code);
	this.arrayNotif[achievement_code].t = "i";
	this.arrayNotif[achievement_code].q = (this.arrayNotif[achievement_code].q || 0)+increment;
	this.save();
}

achievementsOffline.checkSave = function(){
	if(!game.isLoggedIn()){return;}
	for(var i in this.arrayNotif){
		if(this.arrayNotif[i].t == "u"){
			if(achievementUnlock({achievement_code:i})){
				delete this.arrayNotif[i];
				continue;
			}
		}else{
			if(achievementIncrement({achievement_code:i},this.arrayNotif[i].q)){
				delete this.arrayNotif[i];
				continue;
			}
		}
	}
	this.save();
}

achievementsOffline.init();

}());