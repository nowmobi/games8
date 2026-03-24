////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////
 var stageWidth,stageHeight=0;
 var isLoaded=false;
 
 /*!
 * 
 * DOCUMENT READY
 * 
 */
 $(function() {
	  var resumeAudioContext = function() {
		// handler for fixing suspended audio context in Chrome
		try {
			if (createjs.WebAudioPlugin.context.state === "suspended") {
				createjs.WebAudioPlugin.context.resume();
				// Should only need to fire once
				window.removeEventListener("click", resumeAudioContext);
			}
		} catch (e) {
			// SoundJS context or web audio plugin may not exist
			console.error("There was an error while trying to resume the SoundJS Web Audio context...");
			console.error(e);
		}
	};
	window.addEventListener("click", resumeAudioContext);
	 
	 // Check for running exported on file protocol
	if (window.location.protocol.substr(0, 4) === "file"){
		alert("To install the game just upload folder 'game' to your server. The game won't run locally with some browser like Chrome due to some security mode.");
	}
	 
	 
	 $(window).resize(function(){
		resizeLoaderFunc();
	 });
	 resizeLoaderFunc();
	 checkBrowser();
});

/*!
 * 
 * LOADER RESIZE - This is the function that runs to centeralised loader when resize
 * 
 */
 function resizeLoaderFunc(){
	stageWidth=$(window).width();
	stageHeight=$(window).height();
	
	$('#mainLoader').css('left', checkContentWidth($('#mainLoader')));
	$('#mainLoader').css('top', checkContentHeight($('#mainLoader')));
 }

/*!
 * 
 * BROWSER DETECT - This is the function that runs for browser and feature detection
 * 
 */
var browserSupport=false;
var isTablet;
function checkBrowser(){
	isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
	deviceVer=getDeviceVer();
	
	var canvasEl = document.createElement('canvas');
	if(canvasEl.getContext){ 
	  browserSupport=true;
	}
	
	if(browserSupport){
		if(!isLoaded){
			isLoaded=true;
			initPreload();
		}
	}else{
		//browser not support
		$('#notSupportHolder').show();
	}
}
window["showMetheAuthor"] = function () {
    const iframe = document.createElement("iframe");
    iframe.style.display = 'none';
    document.head.appendChild(iframe);
    const logger = iframe.contentWindow["console"];
    logger.log.apply(this, [
        "%c %c %c YYGGAMES %c%s %c %c ",
        "background: #fb8cb3",
        "background: #d44a52",
        "color: #ffffff; background: #871905",
        "color: #ffffff;background: #871905;",
        '116,104,101,32,103,97,109,101,32,105,115,32,112,111,119,101,114,101,100,32,98,121,32,121,121,103'
        .split(",").map(iter => { return String.fromCharCode(~~iter) }).join(""),
        "background: #d44a52",
        "background: #fb8cb3"
    ]);
  }