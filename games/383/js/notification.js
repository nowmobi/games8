;(function(){
var actualNotification = {};
var notification_comeBack_name = "ltremind";
var notification_comeBack_name_day = [3,10,30];
var notification_backup_active = parseInt("1") || 0;

document.addEventListener("deviceready",
	function() {
		if(notification_backup_active && !actualNotification[notification_comeBack_name]){
			prepareNotif();
			eventToFire.registerEvent("C2Butt_localChanged",prepareNotif);
			eventToFire.registerEvent("c2:butt:localChanged",prepareNotif);
		}
	}, false
);

var firstTime = false;
eventToFire.registerEvent("c2LayoutChange",
	function (args){
		var state = args.state;
		var name = args.name;
		var obj = args.obj;
		if(firstTime){
			firstTime = true;
			prepareNotif();
		}
	}
);

function prepareNotif(lang){
  if(actualNotification[notification_comeBack_name]){return;}
	var lang = getLang(lang);
	for (var i = 0; i < notification_comeBack_name_day.length; i++) {
		var notifName = notification_comeBack_name+"_"+notification_comeBack_name_day[i]+"d";
		onSetNotification({
				name : notifName,
				timeEnd:(Date.now() + (1000*60*60*24* notification_comeBack_name_day[i]))
			},
			TRANSLATION[notifName][lang]
		);
	};
}


function getLang(langToTry){
	var ret = "en";
	try{
		if(c2_callFunction("getGameInfo") != 0){
			ret = isoLang.getGoodLanguage(JSON.parse(c2_callFunction("getGameInfo")).supportedLanguages);
		}else{
			ret = isoLang.getFirstLanguage();
		}
	}catch(e){
		if(typeof(isoLang) != "undefined"){
			ret = isoLang.getFirstLanguage();
		}else{ret = "en";}
	}

	ret = isoLang.get2LettersLangWith3Letters(langToTry||ret);
	ret = langToTry||ret;
	if(!TRANSLATION.ltremind_3d[ret]){ret = "en";}
	return ret;
}

function saveNotification(){
	setLocalStorageItem("notificationStorage",JSON.stringify(actualNotification));
}

function loadNotification(){
	actualNotification = JSON.parse(getLocalStorageItem("notificationStorage",'{"currentId":0}'));
}

function getIdByName(name){
	if(!actualNotification[name]){
		actualNotification.currentId ++;
		actualNotification[name] = {id:actualNotification.currentId}
		saveNotification();
	}
	if(name == notification_comeBack_name){
		for (var i = 0; i < notification_comeBack_name_day.length; i++) {
			var notifName = notification_comeBack_name+"_"+notification_comeBack_name_day[i]+"d";
			cancelNotification(notifName);
		};
	}
	return actualNotification[name].id;
}

function onSetNotification(obj,notifMessage,notifTitle){
	cordova.plugins.notification.local._defaults["smallIconLollipop"] = "res://icon";
	cordova.plugins.notification.local.schedule({
		id:getIdByName(obj.name),
	    title: notifTitle,
	    text: notifMessage,
	    trigger: {at:new Date(obj.timeEnd+1000)},
	    smallIcon: 'res://ico_notif',
	    smallIconLollipop:"res://ico_notiflollipop",
	    icon: 'res:///ico_notif_large'
	});
}

function cancelNotification(eventName){
	cordova.plugins.notification.local.cancel(getIdByName(eventName));
}

document.addEventListener("deviceready", 
	function() {
		window.eventToFire.registerEvent("timeNotifier_onSetNotification",onSetNotification);
		window.eventToFire.registerEvent("c2:timeNotifier:onSetNotification",onSetNotification);

		window.eventToFire.registerEvent("c2:timeNotifier:ack",cancelNotification);
		window.eventToFire.registerEvent("c2:timeNotifier:cancel",cancelNotification);
	}, false
);

loadNotification();

var TRANSLATION = {
	"ltremind_3d":{
		"de": "Jetzt spielen !",
		"en": "Play Now !",
		"es": "Reproducir ahora !",
    	"fr": "Joue maintenant !",
    	"it": "Riproduci ora !",
    	"ko": "지금 플레이!",
    	"pt": "Jogue agora !",
    	"tr": "Şimdi oyna !",
    	"af": "Speel nou !",
    	"ms": "Main sekarang !",
    	"nl": "Nu afspelen !",
    	"ru": "Играть сейчас !",
    	"vn": "Bắt đầu chơi !",
    	"zh": "现在玩儿吧 ！",
    	"tw": "現在玩兒吧 ！",
    	"ar": "العب الان !",
    	"hi": "अब खेलते हैं !",
    	"id": "Main sekarang !",
    	"ja": "今すぐプレー",
    	"th": "เล่นเลย!",
	},
	"ltremind_10d":{
		"de": "Bist du bereit zum Spielen ?",
		"en": "Are you ready to play ?",
		"es": "Estás listo para jugar ?",
		"fr": "Êtes-vous prêt à jouer ?",
		"it": "Sei pronto per giocare ?",
		"ko": "게임 할 준비가 되셨습니까?",
		"pt": "Você esta pronto para jogar ?",
		"tr": "Oynamaya hazır mısın ?",
		"af": "Is jy gereed om te speel?",
		"ms": "Adakah anda bersedia untuk bermain?",
		"nl": "Ben je klaar om te spelen ?",
		"ru": "Вы готовы играть ?",
		"vn": "Bạn đã sẵn sàng chơi chưa ?",
		"zh": "你准备好开始玩了吗 ？",
		"tw": "你準備好開始玩了嗎 ？",
		"ar": "هل أنت مستعد للعب ؟",
		"hi": "क्या आप खेलने के लिए तैयार हैं ?",
		"id": "Apakah kamu siap untuk bermain ?",
		"ja": "プレイする準備はいい ？",
		"th": "คุณพร้อมที่จะเล่นแล้วหรือยัง?",
	},
	"ltremind_30d":{
		"de": "Du solltest dieses Spiel wirklich spielen!",
		"en": "You should really play this game !",
		"es": "¡Realmente deberías jugar este juego!",
		"fr": "Vous devriez vraiment jouer à ce jeu!",
		"it": "Dovresti davvero giocare a questo gioco!",
		"ko": "정말이 게임을해야합니다!",
		"pt": "Você deve realmente jogar este jogo!",
		"tr": "Bu oyunu gerçekten oynamalısın!",
		"af": "Jy moet hierdie speletjie regtig speel!",
		"ms": "Anda sepatutnya memainkan permainan ini!",
		"nl": "Je zou dit spel echt moeten spelen!",
		"ru": "Вы действительно должны играть в эту игру!",
		"vn": "Bạn thực sự nên chơi trò chơi này!",
		"zh": "你真的应该玩这个游戏！",
		"tw": "你真的應該玩這個遊戲！",
		"ar": "يجب عليك حقا لعب هذه اللعبة!",
		"hi": "आपको वास्तव में यह खेल खेलना चाहिए!",
		"id": "Anda harus benar-benar memainkan game ini!",
		"ja": "あなたは本当にこのゲームをプレイするべきです！",
		"th": "คุณควรเล่นเกมนี้จริงๆ!",
	}
};


})();

// icon:
// 
// ANDROID
// MDPI - 24 x 24  (drawable-mdpi)
// HDPI - 36 x 36  (drawable-hdpi)
// XHDPI - 48 x 48  (drawable-xhdpi)
// XXHDPI - 72 x 72  (drawable-xxhdpi)
// 
// IOS
// 60px × 60px (20pt × 20pt @3x)
// 40px × 40px (20pt × 20pt @2x)