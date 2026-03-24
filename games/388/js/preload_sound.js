(function(){
var _verbose = false;

var c2Runtime;

var step = -1;
var started = false;
var audioBuffer = [];
var timerUpdate;


var listOfAllSong = ["321.ogg","3210.ogg","boom_firework_0.ogg","boom_firework_1.ogg","boom_firework_2.ogg","butt_level.ogg","butt_menu.ogg","chess pressed.ogg","defeat.ogg","dissolve.ogg","gameover_achievement.ogg","jackpot.ogg","music_ingame.ogg","music_menu.ogg","newrecord.ogg","spawnfireworks.ogg","victory.ogg","victory_coin.ogg","victory_full_coin.ogg","victory_star.ogg"];
var category_list = [];

fillArrayCategory();

eventToFire.registerEvent("c2LayoutChange",
	function (args){
		if(!started){
			c2Runtime = cr_getC2Runtime();
			started = true;
			nextStep();
		}
	}
);

function update(){
	for (var i = 0; i < audioBuffer.length; i++) {
		if(audioBuffer[i].isLoadedAndDecoded()){ //audioBuffer[i].isLoaded()
			if(_verbose) console.log("sound end load & decoded:",audioBuffer[i].src);
			audioBuffer.splice(i, 1);
		}
	};

	if(audioBuffer.length == 0){
		nextStep();
	}
}

function nextStep(){
	step +=1;
	clearInterval(timerUpdate);

	if(category_list[step]){
		for (var i = category_list[step].length - 1; i >= 0; i--) {
			if(_verbose) console.log("sound start load:",category_list[step][i]);
			audioBuffer.push(c2Runtime.audioInstance.getAudioBuffer(c2Runtime.files_subfolder+category_list[step][i]));
		};

		timerUpdate = setInterval(update,100);

	}else{
		if(_verbose) console.log("all Sound loaded & decoded");
	}
}

function fillArrayCategory(){
	var firstLoad = [];
	var arrayWihtoutMusic = [];
	var musicInGame = [];
	var musicGameOver = [];
	var name;

	for (var i = 0; i < listOfAllSong.length; i++) {
		name = listOfAllSong[i].replace(/\.[a-z]+/,"");
		
		if(name == "butt_level" || name == "butt_menu" || name == "music_menu"){
			firstLoad.push(listOfAllSong[i]);
		}
		else if(name == "music_ingame"){
			musicInGame.push(listOfAllSong[i]);
		}
		//list of gameOverSong
		else if(name == "music_game_over" || name == "defeat_sound" || name == "defeat" || name == "victory_game_over" || name == "looser" || name == "gameOver_defeat" || name == "gameOver"){
			musicGameOver.push(listOfAllSong[i]);
		}
		else {
			arrayWihtoutMusic.push(listOfAllSong[i]);
		}
	};
	category_list.push(firstLoad);
	category_list.push(arrayWihtoutMusic);
	category_list.push(musicInGame);
	category_list.push(musicGameOver);
}

}())

