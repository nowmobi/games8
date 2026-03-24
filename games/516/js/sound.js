////////////////////////////////////////////////////////////
// SOUND
////////////////////////////////////////////////////////////
var enableDesktopSound = true; //sound for dekstop
var enableMobileSound = true; //sound for mobile and tablet

var soundOn;
var soundMute = false;
var musicMute = false;

YYGG.sound = {};
var soundID = 0;
var soundPushArr = [];
var soundLoopPushArr = [];
var musicPushArr = [];

function playSound(soundName, vol){
	if(soundOn){
		var thisSoundID = soundID;
		soundPushArr.push(thisSoundID);
		soundID++;

		var defaultVol = vol == undefined ? 1 : vol;
		YYGG.sound[thisSoundID] = createjs.Sound.play(soundName);
		YYGG.sound[thisSoundID].defaultVol = defaultVol;
		setSoundVolume(thisSoundID);
		
		YYGG.sound[thisSoundID].removeAllEventListeners();
		YYGG.sound[thisSoundID].addEventListener ("complete", function() {
			var removeSoundIndex = soundPushArr.indexOf(thisSoundID);
			if(removeSoundIndex != -1){
				soundPushArr.splice(removeSoundIndex, 1);
			}
		});
	}
}

function playSoundLoop(soundName){
	if(soundOn){
		if(YYGG.sound[soundName]==null){
			soundLoopPushArr.push(soundName);

			YYGG.sound[soundName] = createjs.Sound.play(soundName);
			YYGG.sound[soundName].defaultVol = 1;
			setSoundLoopVolume(soundName);

			YYGG.sound[soundName].removeAllEventListeners();
			YYGG.sound[soundName].addEventListener ("complete", function() {
				YYGG.sound[soundName].play();
			});
		}
	}
}

function toggleSoundLoop(soundName, con){
	if(soundOn){
		if(YYGG.sound[soundName]!=null){
			if(con){
				YYGG.sound[soundName].play();
			}else{
				YYGG.sound[soundName].paused = true;
			}
		}
	}
}

function stopSoundLoop(soundName){
	if(soundOn){
		if(YYGG.sound[soundName]!=null){
			YYGG.sound[soundName].stop();
			YYGG.sound[soundName]=null;

			var soundLoopIndex = soundLoopPushArr.indexOf(soundName);
			if(soundLoopIndex != -1){
				soundLoopPushArr.splice(soundLoopIndex, 1);
			}
		}
	}
}

function playMusicLoop(soundName){
	if(soundOn){
		if(YYGG.sound[soundName]==null){
			musicPushArr.push(soundName);

			YYGG.sound[soundName] = createjs.Sound.play(soundName);
			YYGG.sound[soundName].defaultVol = 1;
			setMusicVolume(soundName);

			YYGG.sound[soundName].removeAllEventListeners();
			YYGG.sound[soundName].addEventListener ("complete", function() {
				YYGG.sound[soundName].play();
			});
		}
	}
}

function toggleMusicLoop(soundName, con){
	if(soundOn){
		if(YYGG.sound[soundName]!=null){
			if(con){
				YYGG.sound[soundName].play();
			}else{
				YYGG.sound[soundName].paused = true;
			}
		}
	}
}

function stopMusicLoop(soundName){
	if(soundOn){
		if(YYGG.sound[soundName]!=null){
			YYGG.sound[soundName].stop();
			YYGG.sound[soundName]=null;

			var soundLoopIndex = musicPushArr.indexOf(soundName);
			if(soundLoopIndex != -1){
				musicPushArr.splice(soundLoopIndex, 1);
			}
		}
	}
}

function stopSound(){
	createjs.Sound.stop();
}

function toggleSoundInMute(con){
	if(soundOn){
		soundMute = con;
		for(var n=0; n<soundPushArr.length; n++){
			setSoundVolume(soundPushArr[n]);
		}
		for(var n=0; n<soundLoopPushArr.length; n++){
			setSoundLoopVolume(soundLoopPushArr[n]);
		}
		setAudioVolume();
	}
}

function toggleMusicInMute(con){
	if(soundOn){
		musicMute = con;
		for(var n=0; n<musicPushArr.length; n++){
			setMusicVolume(musicPushArr[n]);
		}
	}
}

function setSoundVolume(id, vol){
	if(soundOn){
		var soundIndex = soundPushArr.indexOf(id);
		if(soundIndex != -1){
			var defaultVol = vol == undefined ? YYGG.sound[soundPushArr[soundIndex]].defaultVol : vol;
			var volume = soundMute == false ? defaultVol : 0;
			YYGG.sound[soundPushArr[soundIndex]].volume = volume;
			YYGG.sound[soundPushArr[soundIndex]].defaultVol = defaultVol;
		}
	}
}

function setSoundLoopVolume(soundLoop, vol){
	if(soundOn){
		var soundLoopIndex = soundLoopPushArr.indexOf(soundLoop);
		if(soundLoopIndex != -1){
			var defaultVol = vol == undefined ? YYGG.sound[soundLoopPushArr[soundLoopIndex]].defaultVol : vol;
			var volume = soundMute == false ? defaultVol : 0;
			YYGG.sound[soundLoopPushArr[soundLoopIndex]].volume = volume;
			YYGG.sound[soundLoopPushArr[soundLoopIndex]].defaultVol = defaultVol;
		}
	}
}

function setMusicVolume(soundLoop, vol){
	if(soundOn){
		var musicIndex = musicPushArr.indexOf(soundLoop);
		if(musicIndex != -1){
			var defaultVol = vol == undefined ? YYGG.sound[musicPushArr[musicIndex]].defaultVol : vol;
			var volume = musicMute == false ? defaultVol : 0;
			YYGG.sound[musicPushArr[musicIndex]].volume = volume;
			YYGG.sound[musicPushArr[musicIndex]].defaultVol = defaultVol;
		}
	}
}

/*!
 * 
 * PLAY AUDIO - This is the function that runs to play questiona and answer audio
 * 
 */
var audioFile = null;
function playAudio(audioName, callback){
	if(soundOn){
		if(audioFile==null){
			audioFile = createjs.Sound.play(audioName);
			setAudioVolume();

			audioFile.removeAllEventListeners();
			audioFile.addEventListener ("complete", function(event) {
				audioFile = null;
				
				if (typeof callback == "function")
					callback();
			});
		}
	}
}

function stopAudio(){
	if(soundOn){
		if(audioFile != null){
			audioFile.stop();
			audioFile = null;
		}
	}
}

function setAudioVolume(){
	if(soundOn){
		if(audioFile != null){
			var volume = soundMute == false ? 1 : 0;
			audioFile.volume = volume;
		}
	}
}