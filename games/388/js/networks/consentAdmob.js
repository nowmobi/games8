;(function(){
/*	
ret = {
consent:["NON_PERSONALIZED","PERSONALIZED","UNKNOWN","NOT_IN_EU"],
hasShownDialog:[true,false],
isAdFree:[true,false] //[OPTIONAL] if user click on "adFree button"
}
*/
var keySave = "admobConsentState";
var consentIsActive = parseInt("1") || 0;
var consent = "NONE";
document.addEventListener("deviceready", function(){
	if(!consentIsActive){
		setTimeout(launchPrepareAds,100);
		return;
	}
	admobConsent.verifyConsent(
		["pub-8460767264532971"],
		"https://playtouch.net/privacy.html",
		false,//free ads button
		false,//debug
		checkReturnConsent,
		launchPrepareAds
	);
}, false);

window.askForChangeConsentDecision = function(){
	admobConsent.changeConsentDecision(
		"https://playtouch.net/privacy.html",
		false,//free ads button
		checkReturnConsent,
		launchPrepareAds
	);
}

function checkReturnConsent(obj){
	if(obj.isAdFree){
		launchPrepareAds();
		return;
	}
	console.log("User consent:",obj.consent);
	autoSet(keySave,obj.consent);

	var consentBool = true;
	switch(obj.consent){
		case "UNKNOWN":
		case "NOT_IN_EU":
			launchPrepareAds();
			return;
		break;
		case "NON_PERSONALIZED":
			consentBool = false;
		break;
		case "PERSONALIZED":
			consentBool = true;
		break;
	}
	if(obj.consent != consent){
		if(typeof(admob) != "undefined" && typeof(admob.setConsent) == "function") admob.setConsent(consentBool,function(){},function(){});
		launchPrepareAds();
	}
	consent = obj.consent;
}

function launchPrepareAds(){
	// console.log("FIRE PREPARE ADS >>> ads can now be prepared !!");
	eventToFire.fireEvent("prepareAds");
}

//--BUTTON ASK CHANGE CONSENT



document.addEventListener("deviceready", 
	function() {
		if(!consentIsActive){return;}
		var savedState = autoGet(keySave,"NONE");
		if(savedState != "NONE" && savedState != "UNKNOWN" && savedState != "NOT_IN_EU"){
			createButtonConsent();
		}
	}, false
);

eventToFire.registerEvent("c2LayoutChange",
	function (args){
		if(!consentIsActive){return;}
		var state = args.state;
		var name = args.name;
		var obj = args.obj;
		if(name == "Splash"){
			if(state == "out"){
				destroyButtonAskConsent();
			}else{
				setTimeout(destroyButtonAskConsent,10 * 1000);//destroy after 10s
			}
		}
	}
);

function createButtonConsent(){
	var urlButton = "icon-GDPR.png";

	$("body").append('<button id="consent_ask_button" class="consentButton"></button>');

	$("#consent_ask_button").append('<style type="text/css">button#consent_ask_button:active {transform: translateY(4px);}#consent_ask_button{position: fixed;width: 100px;height: 100px;background-repeat: no-repeat;background-size: contain;border: none;padding-left: 10px;padding-right: 25px;font-family: sans-serif;font-weight: bold;padding-bottom: 5px;color: white;line-height: 15px;font-size: 18px;bottom: 0;right: 0;margin: 0 auto;}</style>');

	$("#consent_ask_button").append('<style type="text/css">.consentButton{background: url('+urlButton+');}</style>');
	//fixe for bug on landscape
	setTimeout(function(){
		$("#consent_ask_button").css("position","initial");
	},500);
	 setTimeout(function(){
		$("#consent_ask_button").css("position","fixed");
	},1000);
	//----
	$("#consent_ask_button").on("mousedown touchstart",function(e){
		destroyButtonAskConsent();
		window.askForChangeConsentDecision();
		e.stopPropagation();
	});
}

function destroyButtonAskConsent(){
	clearInterval(intervalTimer_setVariable);
	$("#consent_ask_button").remove();
}

//-----------------------------BUTTON
var varsGlobalC2 = {
	"isLevelConfigLoaded":{obj:undefined,value:1},
	"waitingForConfig":{obj:undefined,value:0},
	"waitingForServer":{obj:undefined,value:0}
};

var intervalTimer_setVariable;

document.addEventListener("deviceready", 
	function() {
		setUpVariable();
		intervalTimer_setVariable = setInterval(checkVariable,100);
	}, false
);


function setUpVariable(){
	var c = cr_getC2Runtime()
	for(var i in c.all_global_vars){
		for(var y in varsGlobalC2){
			if(c.all_global_vars[i].name === y){
				varsGlobalC2[y].obj = c.all_global_vars[i];
			}
		}
	}
}

function checkVariable(){
	for(var i in varsGlobalC2){
		if(typeof(varsGlobalC2[i].obj) == "undefined"){
			setUpVariable();
			return;
		}
		if(varsGlobalC2[i].value != varsGlobalC2[i].obj.data){
			return;
		}
	}
	destroyButtonAskConsent()
}

})();
