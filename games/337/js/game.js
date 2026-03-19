"use strict";

//v 011
var loader = new THREE.GLTFLoader();

var camera, scene0, scene, renderer, composer, blendPass;
var geometry, material, mesh;
var controls = null;

var _gameResultsCallback = _sdkShowA;
var _init1Loaded = false;
var _doInit2AfterLoad = true;
var _isEmptyFooter = true;

var statsElement = null;
var stats = null, stats2 = null, stats0 = null;

var CAM_ZMIN = 100;
var CAM_ZMAX = 430;
var CAM_ZOOM_SPD = 10;

var DEBUG_CIRCLE_PLAYER_POS = false;

var grassField;
var ballModel;
var ballShadowModel;
var matCube;

var _ballModelEffectNode;
var _ballModelEffectI = 0;
var _ballModelEffect = [];
var _ballModelEffectActive = [];
var _ballModelEffectLastTime = 0;

function cleanBallModelEffect() {
	_ballModelEffectI = 0;
	_ballModelEffectLastTime = 0;
	_ballModelEffectActive = [];
	_ballModelEffectNode.remove.apply(_ballModelEffectNode, _ballModelEffectNode.children);
}
function ballModelEffect(ball, time) {
	var lastTime = time-_ballModelEffectLastTime;
	if(ball.speed < 60.05 && (lastTime > 5 || ball.speed < 25.0)) { 
		return;
	}
	if(lastTime < 0.1+0.5*unmix(60.0, 25.0, ball.speed)) return; //0.2
	_ballModelEffectLastTime = time;
	var b = _ballModelEffect[_ballModelEffectI++];
	if(_ballModelEffectI >= _ballModelEffect.length) { _ballModelEffectI = 0; }
	
	b.position.copy(ballModel.position);
	b.rotation.copy(ballModel.rotation);
	b.opacity = 1.0;
	b.matA.opacity = 1.0;
	b.matB.opacity = 1.0;
	b.time = time;

	if(_ballModelEffectActive >= _ballModelEffect.length) {

	}
	else {
		_ballModelEffectActive.push(b);
		_ballModelEffectNode.add(b);
	}
}
function initBallModelEffect() {
	for(var i = 0; i < 20; i++) {
		var b = ballModel.clone();

		b.matA = b.children[0].children[0].material.clone();
		b.matB = b.children[0].children[1].material.clone();
		b.children[0].children[0].material = b.matA;
		b.children[0].children[1].material = b.matB;
		b.matA.transparent = true;
		b.matB.transparent = true;
		b.matA.opacity = 1.0;
		b.matB.opacity = 1.0;
		_ballModelEffect.push(b);
	}
}
function updateBallModelEffect(time) {
	var a = _ballModelEffectActive;
	if(a.length > 0) {
		for(var i = a.length-1; i >= 0; i--) {
			var b = a[i];
			
			b.opacity = clamp(mix(0.5, 0.0, (time-b.time)*0.1), 0.0, 1.0); //0.5
			b.matA.opacity = b.opacity;
			b.matB.opacity = b.opacity;
			if(b.opacity <= 0.05) {
				var rem = a.splice(i, i+1);
				for(var k = 0; k < rem.length; k++) {
					_ballModelEffectNode.remove(rem[k]);	
				}
				return;
			}
		}
	}
}

var charModel = new Array(4);
var charModelCache = new Array(32);
var charModelCacheI = [0,0,0,0];
var goalkeeperCache = new Array(2);

var m1;
var m2;

var camZ = 200;
var CHARA_RENDER_ANGLE = -40.0*Math.PI/180.0; //-25 -40

function log(pos, text) {
	/*pos = ""+pos;
	if(pos == "lag" || pos == "msg" || pos.startsWith("msg") || pos == "gTime" || pos == "fps")
		document.getElementById("log"+pos).innerHTML = text;
		*/
	console.log("log " + pos + ": " + text);
}
function distSq(a, b) {
	return a.xy.distSq(b.xy);
}
function dist(a, b) {
	return a.xy.dist(b.xy);
}

class GlobalData {
	constructor() {
		this.game = null;
		this.player = null;
		this.playerChars = null;
		this.canvas = null;
		this.chars3d = null;
		this.playerData = new Array(B.MAX_PLAYERS);
		this.gameData = [];
		this.gameDataTmp = new Array(B.MAX_PLAYERS+10);
		this.gameState = false;
		this.timeAtm = 0;
		this.rgameOps = 32;
		this.isWelcome = false;
		this.isNewGame2 = false;
		this.isNewGame3 = false;
		this.game3Type = 1;
		this.doRematch = -1;
		this.lastScoreO = 0;
		this.lastScoreK = 0;
		this.gifts = new Array(A.DRILL.length).fill(0);
		this.settings = new Array(A.SETTINGS_LENGTH.length).fill(0); 
		this.timeUpdate = null;
		this.timeTi = 0;
		this.timeX = null;
		this.pingLog = null;
		//this.game.player = 0;
		_selectedSlot = -1;
	}
	setDrillsLog(drills) {
		if(drills === null) {
			this.drillsLog.innerHTML = "";
			this.drillsLog.hidden = true;
		}
		else {
			this.drillsLog.innerHTML = _drillView(drills);
			this.drillsLog.hidden = false;
		}
	}
	setScore(a,b) {
		this.scoreLog.innerHTML = a+"-"+b;
		//this.scoreLog2.innerHTML = a+" - "+b;
		this.logscoreO.removeClass('goalGui3');
		this.logscoreK.removeClass('goalGui3');
		if(a > 0 || b > 0) {
			if(this.lastScoreO === a) {
				this.logscoreO[0].innerHTML = ""+a;
			}
			else {
				this.logscoreO.addClass('goalGui3');
				this.logscoreO[0].innerHTML = this.lastScoreO+"<br>"+a;
			}
			if(this.lastScoreK === b) {
				this.logscoreK[0].innerHTML = ""+b;
			}
			else {
				this.logscoreK.addClass('goalGui3');
				this.logscoreK[0].innerHTML = this.lastScoreK+"<br>"+b;
			}
			CAM_PAUSE = CAM_PAUSE_DEF;
			setTimeout(function(){
				gl.gGoalGui.removeClass('d-none');
				setTimeout(function(){
					gl.gGoalGui.addClass('d-none');
				}, 4000);
			}, 250);
		}
		else {
			this.logscoreO[0].innerHTML = "0";
			this.logscoreK[0].innerHTML = "0";
		}
		this.lastScoreO = a;
		this.lastScoreK = b;
	}
	setPing(t) {
		if(this.pingLog === null) return;
		this.pingLog.innerHTML = "ping "+t+" ms";
	}
	setTime(t) {
		t = toInt(t);
		if(t === this.timeAtm) return;
		this.timeAtm = t;
		var min = toInt(t/60);
		var sec = toInt(t-min*60);
		if(sec < 10) { sec = "0"+sec; }
		this.timeLog.innerHTML = min+":"+sec;
	}
	setTimeX(time, x) {
		if(x === null && this.timeUpdate === null) return;
		this.timeTi = time;
		this.timeX = x;
		if(this.timeUpdate === null) {
			this.timeUpdate = setInterval(function() {
				if(gl.timeX !== null) {
					var t = Math.max(0, toInt((gl.timeTi-glnow())*0.001));
					gl.timeX.textContent = ""+t;
					if(t <= 0) {
						clearInterval(gl.timeUpdate);
						gl.timeUpdate = null;
					}
				}
			}, 500);
		}
		else if(x === null) {
			clearInterval(this.timeUpdate);
			this.timeUpdate = null;
		}
	}
	isGameState() {
		return this.gameState;
	}
	setGameState(state) {
		if(this.gameState === state) return;
		this.gameState = state;
		if(state) {
			$("#mainHtml").addClass("hideOverflow");
			$("#mainBody").addClass("hideOverflow");
			$("#glCanvas").removeClass("d-none");	
			$("#stateChat").addClass("gameChat");
			$("#logtext").removeClass('d-none');
			document.getElementById("textbox").placeholder = "....... (Tab to Close)";
			this.setTimeX(0, null);
			//document.body.appendChild(gl.canvas.canvas);
			this.canvas.resizeIfNeeded();
			startLoop();
		}
		else {
			_selectedSlot = -1;
			$("#mainHtml").removeClass("hideOverflow");
			$("#mainBody").removeClass("hideOverflow");
			$("#stateChat").removeClass("gameChat");
			var pData = gl.playerDataHere();
			document.getElementById("textbox").placeholder = (pData===null)?"...":pData.username;
			//$("#glCanvas").addClass("d-none");	
			/*$("#glCanvas").fadeOut(3000, function() {
				$("#glCanvas").fadeIn(0);
				$("#glCanvas").addClass("d-none");
			});*/
			$("#gMenu").addClass('d-none');		
			this.canvas.keyMap.UP = false;
			this.canvas.keyMap.DOWN = false;
			this.canvas.keyMap.LEFT = false; 
			this.canvas.keyMap.RIGHT = false;	
			this.canvas.dash = false;
			this.canvas.doTackle = false;
			this.canvas.doJump = false;
			this.canvas.switchChar = -1;
			this.canvas.doPass = 0;
			this.canvas.endPass = 0;
			this.canvas.movement = Movement.NONE;
			lastMovement = Movement.NONE;
			pauseLoop();
			//document.body.appendChild(gl.canvas.canvas);
		}
	}
	hasBall() {
		return this.game.ball.charId === this.player.charId;
	}
	getChar() {
		if(this.player === null || this.player.charId === -1) return null;
		return this.game.chars[this.player.charId];
	}
	getCharId() {
		if(this.player === null || this.player.charId === -1) return -1;
		return this.player.charId;
	}
	getPlayerData(id) {
		if(id in this.playerData) {
			return this.playerData[id];		
		}
		return null;
	}
	playerDataHere() {
		if(this.player === null) return null;
		var p = gl.getPlayerData(this.player.id);
		return p;
	}
	getGame(id) {
		var gg = this.gameData;
		for(var i = 0; i < gg.length; i++) {
			var g = gg[i];
			if(g.id === id) return g;
		}
		return null;
	}
	refreshGameData() {
		var gameDataTmp = this.gameDataTmp;
		gameDataTmp.fill(null);
		var gg = this.gameData;
		for(var i = 0; i < gg.length; i++) {
			var g = gg[i];
			g.pnum = 0;
			gameDataTmp[g.id] = g;
		} 
		var pp = this.playerData;
		for(var i = 0; i < pp.length; i++) {
			var p = pp[i];
			if(p != null && p.gid !== -1 && gameDataTmp[p.gid] !== null) {
				gameDataTmp[p.gid].pnum++;
			}
		}
		gameDataTmp.fill(null);
		for(var i = gg.length-1; i >= 0; i--) {
			var g = gg[i];
			if(gg[i].pnum === 0 && !(gg[i].gameType === 3 && gg[i].id === 0)) {
				gg.splice(i, 1);
			}
		} 
	}
	welcome(i) {
		this.isWelcome = false;
		switch(i) {
			case 1: this.sandbox(1); break;
			case 2: this.quickGame(); break;
			case 3: updateGTable(); break;
		}
	}
	sandbox(x) {
		console.log("sandbox");
		var p = this.playerDataHere();
		if(p !== null && p.gid === -1) {
			var bufS = _tmp();
			bufS.putByte(B.MSG_CLIENT_SANDBOX);
			bufS.putByte(x);
			this.player.chan.send(bufS.flip());
		}
	}
	newGame() {
		console.log("new game ");
		var p = this.playerDataHere();
		if(p !== null && p.gid === -1) {
			var bufS = _tmp();
			bufS.putByte(B.MSG_CLIENT_NEW_GAME);
			this.player.chan.send(bufS.flip());
		}
	}
	startGame() {
		var p = this.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = this.getGame(p.gid);
			if(g !== null && g.pid === p.id) {
				var bufS = _tmp();
				bufS.putByte(B.MSG_CLIENT_START_GAME);
				this.player.chan.send(bufS.flip());
			}
		}
	}
	newGame2() {
		console.log("new game 2");
		var p = this.playerDataHere();
		if(p !== null && p.gid === -1) {
			this.isNewGame2 = true;
			_display("#state0");
			$("#gamesA").addClass('d-none');
			$("#gamesB").addClass('d-none');
			$("#gamesI").addClass('d-none');
			$("#gamesR").removeClass('d-none');
			document.getElementById("rbutton").innerHTML = "Start";
			/*_active("#option" + (ops & B.GAME_OPTION_PMASK));
			_active("#option" + (ops & B.GAME_OPTION_MMASK));
			_active("#option" + (ops & B.GAME_OPTION_TMASK));
			_active("#option" + (ops & B.GAME_OPTION_OMASK));
			_active("#option" + (ops & B.GAME_OPTION_AMASK));*/
		}
	}
	newGame3() {
		console.log("new game 3");
		var p = this.playerDataHere();
		if(p !== null && p.gid === -1) {
			this.isNewGame3 = true;
			_display("#state0");
			$("#gamesA").addClass('d-none');
			$("#gamesB").addClass('d-none');
			$("#gamesR").addClass('d-none');
			$("#gamesI").removeClass('d-none');
			document.getElementById("rbutton").innerHTML = "Start";
			_active("#optionI" + this.game3Type);
		}
	}
	setGame3Type(x) {
		this.game3Type = x;
		_active("#optionI" + this.game3Type);
	}
	setGameOps(type, val) {
		var p = this.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = this.getGame(p.gid);
			if(g !== null && g.pid === p.id) {
				var bufS = _tmp();
				switch(type) {
					case B.MSG_CLIENT_SET_P:
						if((g.options & B.GAME_OPTION_PMASK) === val) return;
					break;
					case B.MSG_CLIENT_SET_M:
						if((g.options & B.GAME_OPTION_MMASK) === val) return;
					break;
					case B.MSG_CLIENT_SET_T:
						if((g.options & B.GAME_OPTION_TMASK) === val) return;
					break;
					case B.MSG_CLIENT_SET_O:
						if((g.options & B.GAME_OPTION_OMASK) === val) return;
					break;
					case B.MSG_CLIENT_SET_A:
						if((g.options & B.GAME_OPTION_AMASK) === val) return;
					break;
					default: 
					console.log("unknown setting " + type + " " + val);
					return;
				}
				bufS.putByte(B.MSG_CLIENT_SET_OPS);
				bufS.putByte(type);
				bufS.putChar(val);
				this.player.chan.send(bufS.flip());
			}
		}
	}
	startGame2() {
		console.log("start game 2 ");
		var p = this.playerDataHere();
		if(p !== null && p.gid === -1) {
			var bufS = _tmp();
			bufS.putByte(B.MSG_CLIENT_NEW_GAME2);
			bufS.putByte(this.rgameOps);
			this.player.chan.send(bufS.flip());
		}
	}
	startGame3() {
		console.log("start game 3 ");
		var p = this.playerDataHere();
		if(p !== null && p.gid === -1) {
			this.sandbox(1+this.game3Type);
		}
	}
	setGameOps2(type, val) {
		this.rgameOps = val;
		_active("#option" + (val & B.GAME_OPTION_MMASK) + "r");
	}
	team(t) {
		var p = this.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = this.getGame(p.gid);
			if(g !== null) {
				var state = g.getState();
				if(state === B.GAME_OPTION_STATE_TEAM_SEL && t >= 1 && t <= 3) {
					var bufS = _tmp();
					bufS.putByte(B.MSG_CLIENT_SELECT_TEAM);
					bufS.putByte(t);
					this.player.chan.send(bufS.flip());
				}
			}
		}
	}
	teampos(pos) {
		//teampos check if captain
		var p = this.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = this.getGame(p.gid);
			if(g !== null) {
				var state = g.getState();
				var teamorder = p.getTeamOrder();
				if(state === B.GAME_OPTION_STATE_POS_SEL && (teamorder === 0 || teamorder === 4)) {
					var bufS = _tmp();
					bufS.putByte(B.MSG_CLIENT_SELECT_POS);
					bufS.putByte(pos+1);
					this.player.chan.send(bufS.flip());				
				}
			}
		}
	}
	autoFill() {
		var p = this.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = this.getGame(p.gid);
			if(g !== null) {
				var state = g.getState();
				var slot = _selectedSlot;
				if(state === B.GAME_OPTION_STATE_PLAYER_SEL) {
					var bufS = _tmp();
					bufS.putByte(B.MSG_CLIENT_SELECT_CHAR);
					bufS.putByte(255);
					bufS.putByte(255);
					this.player.chan.send(bufS.flip());		
				}
			}
		}
	}
	selectPlayer(x) {
		var p = this.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = this.getGame(p.gid);
			if(g !== null) {
				var state = g.getState();
				var slot = _selectedSlot;
				if(state === B.GAME_OPTION_STATE_PLAYER_SEL && slot >= 0 && slot < 4) {
					//console.log("select Player " + slot + " " + x);
					//figure out if this player controls the given slot
		
					var bufS = _tmp();
					bufS.putByte(B.MSG_CLIENT_SELECT_CHAR);
					bufS.putByte(slot);
					bufS.putByte(x);
					this.player.chan.send(bufS.flip());		

					
					for(var i = 1; i < 4; i++) {
						var i2 = (slot+i)&3;
						if((_selectSlotSlots&(1<<i2)) !== 0) {
							selectSlot(i2);
							break;
						}
					}
					
				}
			}
		}	
	}
	selectGift(slot, tI, dI) {
		var p = this.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = this.getGame(p.gid);
			if(g !== null) {
				var state = g.getState();
				if(state === B.GAME_OPTION_STATE_PLAYER_SEL && slot >= 0 && slot < 4 &&
					tI >= 0 && tI < 4 && dI >= 0 && dI < A.DRILL.length) {
					//console.log("select gift " + slot + " " + tI + " " + dI);
					
					var bufS = _tmp();
					bufS.putByte(B.MSG_CLIENT_SELECT_GIFT);
					bufS.putByte(slot);
					bufS.putByte(tI);
					bufS.putByte(dI);
					this.player.chan.send(bufS.flip());
				}
			}
		}
	}
	ready() {
		var p = this.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = this.getGame(p.gid);
			if(g !== null) {
				var state = g.getState();
				if(state === B.GAME_OPTION_STATE_PLAYER_SEL) {
					var bufS = _tmp();
					bufS.putByte(B.MSG_CLIENT_SELECT_CHAR_READY);
					this.player.chan.send(bufS.flip());		
				}
			}
		}
	}
	quickGame() {
		var gg = this.gameData;
		for(var i = 0; i < gg.length; i++) {
			var g = gg[i];
			if(g.gameType === 3 && g.pnum < g.getMaxPlayers()) {
				this.joinGame(g.id);
				return;
			}
		}
		this.sandbox(100);
		//...create game...
	}
	joinGame(gid) {
		this.isNewGame2 = false;
		this.isNewGame3 = false;
		console.log("join game " + gid);
		var bufS = _tmp();
		bufS.putByte(B.MSG_CLIENT_JOIN_GAME);
		bufS.putChar(gid+1);
		this.player.chan.send(bufS.flip());
		
		var p = this.playerDataHere();
		if(p === null || p.gid === -1) {
			updateGTable();
		}
	}
	rematch() {
		console.log("rematch game ");
		var bufS = _tmp();
		bufS.putByte(B.MSG_CLIENT_REMATCH_GAME);
		this.player.chan.send(bufS.flip());
		var t = this.game.gameData.gameType;
		if(t === 0 || t > 3) {
			this.doRematch = t;
		}
	}
	te(te) {
		if(te.length > 0) {
			if(te.length > B.MAX_TE) {
				te = te.substring(0, B.MAX_TE);
			}
			var p = this.player;
			if(p !== null && p.text !== null) {
				var b = _tmp();
				b.putByte(B.MSG_TE);
				b.putByteString(te);
				p.text.send(b.flip());
			}
		}
	}
	exit() {
		var b = _tmp();
		var p = this.player;
		if(p !== null && p.chan !== null) {
			b.putByte(A.MSG_EXIT);
			p.chan.send(b.flip());
		}
		_reOk = false;
		setTimeout(function() {
			window.location.reload();
		}, 500);
	}
}
var gl = new GlobalData();

function load(arr, done, progress, err) {
	loadX(arr, [], done, progress, err);
}
function loadX(arr, res, done, progress, err) {
	if(res.length < arr.length) {
		loader.load(
			arr[res.length],
			function ( gltf ) {
				res.push(gltf);
				loadX(arr, res, done, progress, err);
			},
			progress,
			err
		);
	}
	else {
		done(res);
	}		
}
var RUN_SPD_MULT = 0.15;
class AnimManager {
	constructor(anim,anims) {
		this.anim = anim;
		this._head = this.findByName("Head", anims);
		this._run = this.findByName("Run", anims);
		this._stand = this.findByName("Stand", anims);
		this._tackle = this.findByName("Tackle", anims);
		this._stand2 = this.findByName("Stand2", anims);
		this._diveR = this.findByName("DiveR", anims);
		this._diveL = this.findByName("DiveL", anims);
		this._current = null;
		this.headSpeed = 1.0;
		this.runSpeed = 1.0;
		this.headNum = 0;
		 //12.15
		this._head.loop = THREE.LoopOnce;
		this._stand.loop = THREE.LoopOnce;
		this._tackle.loop = THREE.LoopOnce;
		this._tackle.clampWhenFinished = true;
	}
	head(num) {
		if(this._current != this._head || this.headNum !== num) {
			this.headNum = num;
			this._head.reset();
			this.set(this._head, false);
		}
	}
	setHeadSpeed(spd) {
		if(this.headSpeed !== spd) {
			this.headSpeed = spd;
			this._head.timeScale = spd;
		}
	}
	setRunSpeed(spd) {
		if(this.runSpeed !== spd) {
			this.runSpeed = spd;
			this._run.timeScale = spd*RUN_SPD_MULT;
		}
	}
	run() {
		this.set(this._run, true);
	}
	stand() {
		this.set(this._stand, false);
	}
	stand2() {
		this.set(this._stand2, false);
	}
	diveR() {
		this.set(this._diveR, false);
	}
	diveL() {
		this.set(this._diveL, false);
	}
	tackle() {
		if(this._current != this._tackle) {
			this._tackle.reset();
			this.set(this._tackle, false);
		}
	}
	tackled() {
		if(this._current != this._tackle) {
			this.set(this._tackle, false);
		}
	}
	set(anim, loop) {
		if(this._current === anim) return;
		//console.log("anim " + anim._clip.name);
		if(anim !== null) anim.reset();
		if(this._current !== null) {
			//this._current.stop();
			if(anim !== null) {
				anim.play();
				this._current.crossFadeTo(anim, 0.1);
			}
			else {
				this._current.crossFadeTo(this._stand, 0.1);
				this._current = this._stand;
			}
		}
		else {
			if(anim !== null) anim.play();
		}
		this._current = anim;
	}
	update(tpf) {
		this.anim.update(tpf);
	}
	findByName(name, anims) {
		for(var i = 0; i < anims.length; i++) {
			var a = anims[i];
			if(a._clip.name === name) {
				return a;
			}
		}
		return null;
	}
}
function clearScene() {
	cleanBallModelEffect();
	charModelCacheI.fill(0);
	scene.remove.apply(scene, scene.children);
}
function getCharModel(type) {
	//console.log("type " + type);
	if(type < 1 || type > 4) {
		console.log("error: getChar of type " + type);
		return null;
	}
	var i = charModelCacheI[type-1];
	if(i < 8) {
		var m = charModelCache[i+(type-1)*8];
		charModelCacheI[type-1] = i+1;
		return m;
	}
	else {
		console.log("error: charModelCache overflow " + type);
	}
	return null;
}
function createChar(type) {
	if(type < 1 || type > 4) {
		console.log("error: createChar of type " + type);
		return;
	}
	var m = charModel[type-1];
	//var mesh = new THREE.Mesh(m.geometry, m.material);
	var mesh = THREE.SkeletonUtils.clone(m);
	var mix = new THREE.AnimationMixer( mesh );
	var anims = [];
	for(var i = 0; i < m.anims.length; i++) {
		anims.push(mix.clipAction(m.anims[i]));
	}
	mesh.anim = new AnimManager(mix, anims);
	mesh.anims = anims;
	var scale = type===2?1.3:1.5;
	mesh.scale.set(scale,scale,scale);
	
	var skinMat = mesh.children[0].children[1].children[0].material.clone();
	mesh.children[0].children[1].children[0].material = skinMat;
	
	var jerseyMat = mesh.children[0].children[1].children[1].material.clone();
	mesh.children[0].children[1].children[1].material = jerseyMat;
	//mesh.children[0].children[1].children[2].material.color.setRGB(0.5,0.5,0.5);

	var eyeMat = mesh.children[0].children[1].children[3].material.clone();
	mesh.children[0].children[1].children[3].material = eyeMat;

	var hairMat = mesh.children[0].children[2].material.clone();

	var geoms = mesh.children[0];
	var name = "Char"+type+"Mesh";

	var hairM = geoms.getObjectByName(name+"M"); 
	var hairMM = geoms.getObjectByName(name+"MM"); 

	var hairA = geoms.getObjectByName(name+"A"); 
	var hairB = geoms.getObjectByName(name+"B"); 
	var hairC = geoms.getObjectByName(name+"C"); 

	var hairArr = [hairM, hairMM, hairA, hairB];
	if(hairC != null) hairArr.push(hairC);

	for(var i = 0; i < hairArr.length; i++) { 
		hairArr[i].material = hairMat;
		hairArr[i].visible = false;
	} 
	
	mesh.eyeMat = eyeMat;
	mesh.hairMat = hairMat;
	mesh.skinMat = skinMat;
	mesh.jerseyMat = jerseyMat;

	//mesh.anim.run();

	var groupRot = new THREE.Group();
	groupRot.rotation.x = CHARA_RENDER_ANGLE;
	groupRot.add(mesh);

	var dashQuad = createDashQuad();

	var group = new THREE.Group();
	group.eyeMat = mesh.eyeMat;
	group.jerseyMat = mesh.jerseyMat;
	group.hairMat = mesh.hairMat;
	group.skinMat = mesh.skinMat;
	group.setHair = (v) => {
		for(var i = 0; i < hairArr.length; i++) { 
			hairArr[i].material = hairMat;
			hairArr[i].visible = (v&(1<<i)) !== 0;
		}
	};
	group.add(groupRot);
	group.add(dashQuad);
	group.anim = mesh.anim;
	group.setDash = dashQuad.setDash;
	group.dashCol = dashQuad.dashCol;
	group.groupRot = groupRot;
	group.dashQuad = dashQuad;

	return group;
}
/*function createChar4() {
	var m = char4Model;
	//var mesh = new THREE.Mesh(m.geometry, m.material);
	var mesh = THREE.SkeletonUtils.clone(m);
	var mix = new THREE.AnimationMixer( mesh );
	var anims = [];
	for(var i = 0; i < m.anims.length; i++) {
		anims.push(mix.clipAction(m.anims[i]));
	}
	mesh.anim = new AnimManager(mix, anims);
	mesh.anims = anims;
	var scale = 1.5;
	mesh.scale.set(scale,scale,scale);
	
	var jerseyMat = mesh.children[0].children[1].children[2].material.clone();

	mesh.children[0].children[1].children[2].material = jerseyMat;
	//mesh.children[0].children[1].children[2].material.color.setRGB(0.5,0.5,0.5);

	mesh.jerseyMat = jerseyMat;

	//mesh.anim.run();
	return mesh;
}*/
var GL_OPS = { antialias: true };
function init1() {
	initCharMask();
	camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.09, 500);

	camera.position.set(0, camZ, 0);
	//camera.up.set(0, 0, -1);
	camera.lookAt(0, 0, 0);

	CAM_CONST_A = 0.5*Math.tan(camera.fov*DEG_TO_RAD);

	//camera.up.set(0, 1, 0);

	ballModel.scale.set(A.BALL_SCALE, A.BALL_SCALE, A.BALL_SCALE);
	ballShadowModel.scale.set(A.BALL_SCALE, A.BALL_SCALE, A.BALL_SCALE);

	initMats();
	initBallModelEffect();

	scene0 = new THREE.Scene();
	scene = new THREE.Scene();
	_ballModelEffectNode = new THREE.Scene();

	scene0.add(grassField);
	//scene.add(ballModel);
	//scene.add(ballShadowModel);

	scene0.add(scene);

	//var dashQuad = createDashQuad();
	//scene0.add(dashQuad);

	gl.chars3d = [];

	for(var i = 0; i < 8; i++) {
		charModelCache[i] = createChar(1);
		charModelCache[i+8] = createChar(2);
		charModelCache[i+16] = createChar(3);
		charModelCache[i+24] = createChar(4);
	}

	/*for(var i = 0; i < 8; i++) {
		var a = createChar4();
		//a.position.set(i,0,0);

		var g = new THREE.Group();
		g.jerseyMat = a.jerseyMat;
		g.rotation.x = CHARA_RENDER_ANGLE;
		g.add(a);
		g.anim = a.anim;

		if(i < 4) {
			g.jerseyMat.color.setHex(0xfafafa);
		}
		else {
			g.jerseyMat.color.setHex(0xffc743);
		}

		gl.chars3d.push(g);

		scene.add(g);
	}*/
	
	for(var i = 0; i < 2; i++) {
		var g = createChar(4);
		/*var g = new THREE.Group();
		g.jerseyMat = a.jerseyMat;
		g.rotation.x = CHARA_RENDER_ANGLE;
		g.add(a);
		g.anim = a.anim;
			*/
		if(i < 1) {
			g.jerseyMat.color.setHex(0xfafafa);
			g.dashCol.setHex(0xfafafa);
		}
		else {
			g.jerseyMat.color.setHex(0xffc743);
			g.dashCol.setHex(0xffc743);
		}

		goalkeeperCache[i] = g;
		gl.chars3d.push(g);

		scene.add(g);
	}

	//mesh = m1; //char4Model;//createChar4();//ballModel; 

	/*var color = 0xFFFFFF;
	var intensity = 1;
	var light = new THREE.AmbientLight(color, intensity);
	scene0.add(light);*/

	//var skyColor = 0xB1E1FF;  // light blue
	//var groundColor = 0xB97A20;  // brownish orange
	//var intensity = 1;
	//var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
	var intensity = 1;
	var _charMaskCanvasMiniSky = new THREE.Color(0xffffff); 
	var _charMaskCanvasMiniGround = new THREE.Color(0xc6b27a); 
	var light = new THREE.HemisphereLight(_charMaskCanvasMiniSky, _charMaskCanvasMiniGround, intensity);
	scene0.add(light);

	//geometry = new THREE.BoxGeometry( 1,1,1 );
	//material = new THREE.MeshNormalMaterial();
	//mesh = new THREE.Mesh( geometry, material );
	//scene.add( mesh );

	renderer = new THREE.WebGLRenderer(GL_OPS);
	renderer.outputEncoding=THREE.sRGBEncoding;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.setAttribute("id", "glCanvas"); 
	renderer.domElement.setAttribute("class", "d-none"); 
	document.body.appendChild(renderer.domElement);

	gl.canvas = new Canvas(renderer.domElement, camera, renderer);
	//init2();
			
	//controls = new THREE.OrbitControls( camera, renderer.domElement );
	if(controls == null) {
		//window
		//gl.canvas.canvas.
		document.body.addEventListener('wheel', (e) => {
			if(gl.isGameState()) {
				camZ = clamp(camZ+Math.sign(e.deltaY)*CAM_ZOOM_SPD, CAM_ZMIN, CAM_ZMAX);
				e.preventDefault();
			}
		}, { passive: false });
	}
	
	renderer.render(scene0, camera);
	
	/*stats = createStats(0, 0);
    document.body.appendChild(stats.domElement);
    
    stats2 = createStats(0, 1);
    document.body.appendChild(stats2.domElement);
    
    stats0 = createStats(0, 2);
    document.body.appendChild(stats0.domElement);*/
	
	// post processing starts here
	/*	
	composer = new THREE.EffectComposer(renderer);
	
	// render pass
	
	var renderPass = new THREE.RenderPass(scene0, camera)
			
	// save pass
	
	var renderTargetParameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		stencilBuffer: false
	};
	
	var savePass = new THREE.SavePass(new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters));

	// blend pass

	blendPass = new THREE.ShaderPass(THREE.BlendShader, 'tDiffuse1');
	blendPass.uniforms[ 'tDiffuse2' ].value = savePass.renderTarget.texture;
	blendPass.uniforms[ 'mixRatio' ].value = 0.65;
	
	// output pass
	
	var outputPass = new THREE.ShaderPass(THREE.CopyShader);
	outputPass.renderToScreen = true;
	
	// setup pass chain
	
	composer.addPass(renderPass);
	composer.addPass(blendPass);
	composer.addPass(savePass);
	composer.addPass(outputPass);
	*/
	
	_onModalOk = function(t,d) {
		gl.selectGift(t, d, _drillSelectedSlot);
	}
	_init1Loaded = true;
	if(_doInit2AfterLoad) init2(null);
	//initS();
	/*window.addEventListener('keydown', (e) => {
		e.preventDefault();
		switch (e.keyCode) {
		  case 38: // up
			mesh.position.z -= 1;
			break;
		  case 40: // down
			mesh.position.z += 1;
			break;
		  case 37: // left
			mesh.position.x -= 1;
			break;
		  case 39: // right
			mesh.position.x += 1;
			break;
		}
	});*/
}
class Canvas {
	constructor(a, cam, r) {
 		this.canvas = a;
		this.cam = cam;
		this.renderer = r;
		this.keyMap = {
			lUP: false,
			lRIGHT: false,
			UP: false,
			DOWN: false,
			LEFT: false,
			RIGHT: false,
		};
		this.movement = Movement.NONE;
		this.startPassTime = 0;
		this.passPow = 0;
		this.doPass = 0;
		this.didPass = 0;
		this.endPass = 0;
		this.switchChar = -1;
		this.passA = 0;
		this.dash = false;
		this.doTackle = false;
		this.doJump = false;
		this.tackleA = 0;
		this.lastUpdateStep = 0;
		this.mXY = new vec2(0,0);
		this.tmpV2 = new vec2(0,0);
		this.debugPos = new vec2(0.0,0.0);
		this.tmpVec1 = new THREE.Vector3();
		this.tmpVec2 = new THREE.Vector3();
		this.tmpVec3 = new THREE.Vector3();
		this.resizeInterval = null;
		this.arrow = createArrow(0xffffff);
		this.arrowSpin = createArrow(0xabe673);
		this.mouseCircle = createCircle(1.0, 0xffffff);
		this.flipCanvas = false;
		this.mouseCaptured = false;
		this.rotAxisTmp = new THREE.Vector3(0.0, 0.0, 0.0);
		
		this.arrowSpin.setLength(2.0);
		//this.canvas.addEventListener('keydown', this.keyDown.bind(this), false);
        //this.canvas.addEventListener('keyup', this.keyUp.bind(this), false);
		document.body.addEventListener('keydown', this.keyDown.bind(this), false);
		document.body.addEventListener('keyup', this.keyUp.bind(this), false);
 		this.canvas.addEventListener('mousemove', this.mouseMove.bind(this), false);
		this.canvas.addEventListener('mousedown', this.mouseDown.bind(this), false);
		this.canvas.addEventListener('mouseup', this.mouseUp.bind(this), false);
		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();
		
		this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;
		document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
		
		document.addEventListener('pointerlockchange', (event) => {
		  	if(document.pointerLockElement === gl.canvas.canvas || document.mozPointerLockElement === gl.canvas.canvas) {
				this.mouseCaptured = true;
				
			} else {
				this.mouseCaptured = false;
			}
			console.log('Pointer lock changed ' + this.mouseCaptured);
		});
	} 
	setMouseCapture(x) {
		if(x === A.MOUSE_CAPTURE) return;
		A.MOUSE_CAPTURE = x;
		if(this.canvas.requestPointerLock == null || document.exitPointerLock == null) return;
		if(x) {
			//this.canvas.requestPointerLock();
		}
		else {
			document.exitPointerLock();
		}
	}
	setFlipCanvas(v) {
		//if(this.flipCanvas === v) return;
		this.flipCanvas = v;
		var angle;
		if(v) {
			angle = -CHARA_RENDER_ANGLE;
			scene.rotation.set(0.0,Math.PI,0.0);
		}
		else {
			angle = CHARA_RENDER_ANGLE;
			scene.rotation.set(0.0,0.0,0.0);
		}

		var arr = gl.chars3d;
		for(var i = 0; i < arr.length; i++) {
			var g = arr[i];
			g.groupRot.rotation.x = angle;
			if(v) {
				g.dashQuad.rotation.z = Math.PI;
			}
			else {
				g.dashQuad.rotation.z = 0.0;
			}
		}
		for(var i = 0; i < 8; i++) {
			var quad = TEXT_QUADS[i];
			if(v) {
				quad.rotation.z = Math.PI;
				quad.position.z = 7.0;
			}
			else {
				quad.rotation.z = 0.0;
				quad.position.z = -7.0;
			}
		}
	}
	convertMouse(xx, yy) {
		var vec = this.tmpVec1; 
		var pos = this.tmpVec2;
		var dir = this.tmpVec3;
		var cam = this.cam;

		vec.set(0,0,0);
		vec.project(cam);

		var z = vec.z;

		//vec.set(2*(xx/this.canvas.width)-1, -2*(yy/this.canvas.height)+1, 0.5);
		vec.set(
			-1 + 2 * ( xx / this.canvas.width),
			+1 - 2 * ( yy / this.canvas.height),
			vec.z
 			);

		vec.unproject(cam);
		vec.y = vec.z;
		if(this.flipCanvas) {
			vec.x = -vec.x;
			vec.y = -vec.y;
		}
		return vec;
	}
	switchPlayer(p0, chId, v2) {
		var clickA = atan2PI(v2.x-p0.xyI.x,v2.y-p0.xyI.y);
		
		var chars = gl.game.chars;
		var chOffset = (gl.player.team1)?0:4;
		
		var minId = -1;
		var minDistSq = 10000;
		var minAngleDist = A.CHAR_SWITCH_ANGLE;
		
		for(var i = 0; i < 4; i++) {
			if(i+chOffset === chId) continue;
			var ch = chars[i+chOffset];
			var charAngle = atan2PI(ch.xyI.x-p0.xyI.x,ch.xyI.y-p0.xyI.y);
			var distSq = v2.distSq(ch.xyI);
			var angleDist = angleDist2PI(clickA, charAngle);

			if(minId !== -1 && angleDist < A.CHAR_SWITCH_DIST_ANGLE) {
				if(distSq < minDistSq) {
					minId = i+chOffset;
					minDistSq = distSq;
					minAngleDist = angleDist;
				}
			}
			else if(angleDist < minAngleDist) {
				minId = i+chOffset;
				minDistSq = distSq;
				minAngleDist = angleDist;
			}
		}
		if(minId === -1 && A.CHAR_SWITCH_WALL > -1) {
			//left right wall...
			var XX = RECT_R+RECT_R;
			var YY = RECT_B+RECT_B;
			var minDistSq0 = RECT_B*RECT_B;
			minDistSq = minDistSq0;
			for(var k = 0; k < 4; k++) {
				for(var i = 0; i < 4; i++) {
					//if(i+chOffset === chId) continue;
					var ch = chars[i+chOffset];
					var chX = ch.xyI.x; 
					var chY = ch.xyI.y;
					
					switch(k) {
						case 0: chX = -chX+XX; break;
						case 1: chX = -chX-XX; break;
						case 2: chY = -chY+YY; break;
						case 3: chY = -chY-YY; break;
					}
					
					var charAngle = atan2PI(chX-p0.xyI.x,chY-p0.xyI.y);
					var distSq = v2.distSq2(chX, chY);
					var angleDist = angleDist2PI(clickA, charAngle);

					if(minId !== -1 && angleDist < A.CHAR_SWITCH_DIST_ANGLE) {
						if(distSq < minDistSq) {
							minId = i+chOffset;
							minDistSq = distSq;
							minAngleDist = angleDist;
						}
					}
					else if(angleDist < minAngleDist) {
						if(distSq < minDistSq0) {
							minId = i+chOffset;
							minDistSq = distSq;
							minAngleDist = angleDist;
						}
					}
				}
			}
			if(minId === chId) { minId = -1; }
		}
		if(minId !== -1) {
			this.switchChar = minId;
		}
	}
	mouseMove(e) {
		if(!gl.isGameState()) return;
		if(this.mouseCaptured) {
			this.mXY.x = clamp(this.mXY.x+e.movementX*A.MOUSE_CAPTURE_SPEED, 0, this.canvas.width);
	  		this.mXY.y = clamp(this.mXY.y+e.movementY*A.MOUSE_CAPTURE_SPEED, 0, this.canvas.height);
		}
		else {
			this.mXY.x = e.clientX;
			this.mXY.y = e.clientY;
		}
		
		//var v = this.convertMouse(e.clientX, e.clientY);
		//log("mouse", "move " + JSON.stringify(e) + " " + e.clientX + " " + e.clientY + " " + v.x + ", "  + v.y + " " + v.z + " cam " + this.cam.position.x );
				
	}
	mouseDown(e) {
		if(!gl.isGameState()) return;
		
		if(A.MOUSE_CAPTURE) {
			if(document.pointerLockElement === this.canvas || document.mozPointerLockElement === this.canvas) {
			
			} else {
				console.log("mouse capture");
				this.canvas.requestPointerLock();
			}
		}
		
		this.mouseMove(e);
		var chId = gl.getCharId();
		if(chId === -1) return;
		var p0 = gl.getChar();
		if(p0 === null) return;
		var ball = gl.game.ball;
		switch (e.button) {
			case 0: //LEFT CLICK
				if(gl.hasBall()) {
					//dist();
					//var len = p0.xy.dist(this.mXY);
					//if(len >= 1.0) {
					//	len = 1.0/len;
						//Shoot
						//ball.delay = 0.5;
						//ball.dxy.x = len*(this.mXY.x-p0.xy.x);
						//ball.dxy.y = len*(this.mXY.y-p0.xy.y);
					
						//ball.xy.set(p0.xy);
						//ball.player = -1;
					//}
					//if(p0.canPass()) {
						this.doPass = A.MSG_CLIENT_PASS_START;
						this.didPass = A.MSG_CLIENT_PASS_START;
						this.startPassTime = Date.now();
					//}
				}
				else {
					//Tackle
					if(p0.canTackle()) {
						var v = this.convertMouse(this.mXY.x, this.mXY.y);

						var len = p0.xyI.distSq(v);
						this.doTackle = true;

						if(len >= 1.0) {
							//len = 1.0/len;
						
							//p0.tackle = 1.0;
							//p0.delay = 1.5;
							//p0.dxy.x = len*(this.mXY.x-p0.xy.x);
							//p0.dxy.y = len*(this.mXY.y-p0.xy.y);
							
							this.tackleA = atan2PI(v.x-p0.xyI.x,v.y-p0.xyI.y);
						}	
						else {
							this.tackleA = 0;
						}
					}
				}
				break;
			case 1:
				if(gl.hasBall()) {
				
				}
				else {
					if(p0.canTackle()) {
						var v = this.convertMouse(this.mXY.x, this.mXY.y);
						var len = p0.xyI.distSq(v);
						this.doJump = true;
						if(len >= 1.0) {
							this.tackleA = atan2PI(v.x-p0.xyI.x,v.y-p0.xyI.y);
						}
						else {
							this.tackleA = 0;
						}
					}
				}
				break;
			case 2: //RIGHT CLICK
				if(gl.hasBall()) {
					//if(p0.canPass()) {
						this.doPass = A.MSG_CLIENT_VOLLEY_START;
						this.didPass = A.MSG_CLIENT_VOLLEY_START;
						this.startPassTime = Date.now();
					//}
				}
				else {
					//switch player
					// chId
					var v = this.convertMouse(this.mXY.x, this.mXY.y);
					var v2 = new vec2(v.x,v.y);
					this.switchPlayer(p0, chId, v2);
				}
				break;
		}
	}
	mouseUp(e) {
		if(!gl.isGameState()) return;
		this.mouseMove(e);
		var chId = gl.getCharId();
		if(chId === -1) return;
		var p0 = gl.getChar();
		if(p0 === null) return;
		var ball = gl.game.ball;
		switch (e.button) {
			case 0:
				if(this.didPass === A.MSG_CLIENT_PASS_START) {
					this.didPass = 0;
					this.endPass = A.MSG_CLIENT_PASS_END;
					this.passPow = passPow(Date.now()-this.startPassTime);
					var v = this.convertMouse(this.mXY.x, this.mXY.y);
					this.passA = v;

					if(A.CHAR_AUTO_SWITCH) {
						var v2 = new vec2(v.x,v.y);
						this.switchPlayer(p0, chId, v2);
					}
					
					/*var len = p0.xy.dist(v);
					if(len >= 1.0) {
						this.passA = atan2PI(v.x-p0.xy.x,v.y-p0.xy.y);
					}	
					else {
						this.passA = 0;
					}*/
				}
			break;
			case 2:
				if(this.didPass === A.MSG_CLIENT_VOLLEY_START) {
					this.didPass = 0;
					this.endPass = A.MSG_CLIENT_VOLLEY_END;
					this.passPow = passPow(Date.now()-this.startPassTime);
					var v = this.convertMouse(this.mXY.x, this.mXY.y);
					this.passA = v;

					if(A.CHAR_AUTO_SWITCH) {
						var v2 = new vec2(v.x,v.y);
						this.switchPlayer(p0, chId, v2);
					}
					/*var len = p0.xy.dist(v);
					if(len >= 1.0) {
						this.passA = atan2PI(v.x-p0.xy.x,v.y-p0.xy.y);
					}	
					else {
						this.passA = 0;
					}*/
				}
			break;
		}
		//log(2, "move " + JSON.stringify(e) + " " + e.button + " " + e.clientX + " " + e.clientY);
	}
	updateMovement() {
		var m = this.keyMap;
		var idM = 0;
		if(m.UP && m.DOWN) { idM |= (m.lUP)?Movement.UP.idM:Movement.DOWN.idM; }
		else if(m.UP) { idM |= Movement.UP.idM; }
		else if(m.DOWN) { idM |= Movement.DOWN.idM; }
		if(m.RIGHT && m.LEFT) { idM |= (m.lRIGHT)?Movement.RIGHT.idM:Movement.LEFT.idM; }
		else if(m.RIGHT) { idM |= Movement.RIGHT.idM; }
		else if(m.LEFT) { idM |= Movement.LEFT.idM; }
		this.movement = Movement.fromIdM(idM);
		quickUpdate();
	}	
	isInputElement(e) {
		if(e.keyCode === KeyInput.TAB) return false;
		var target = e.target || e.srcElement;
		if(target != null && target.nodeName == "INPUT") return true;
		return false;
	}
	keyUp(e) {
		if(!gl.isGameState() || this.isInputElement(e)) return;
		if(this.flipCanvas) {
			switch (e.keyCode) {
			case KeyInput.DOWN:	case KeyInput.S: this.keyMap.UP = false; this.updateMovement();
				//e.stopPropagation();
				return;
 			case KeyInput.UP: case KeyInput.W: this.keyMap.DOWN = false; this.updateMovement();
				//e.stopPropagation();
				return;
			case KeyInput.RIGHT: case KeyInput.D: this.keyMap.LEFT = false; this.updateMovement();
				//e.stopPropagation();
				return;		
			case KeyInput.LEFT:	case KeyInput.A: this.keyMap.RIGHT = false; this.updateMovement();
				//e.stopPropagation();
				return;
			default:
				return;			
			}
		}
		else {
			switch (e.keyCode) {
 			case KeyInput.UP: case KeyInput.W: this.keyMap.UP = false; this.updateMovement();
				//e.stopPropagation();
				return;
 			case KeyInput.DOWN:	case KeyInput.S: this.keyMap.DOWN = false; this.updateMovement();
				//e.stopPropagation();
				return;		
			case KeyInput.LEFT:	case KeyInput.A: this.keyMap.LEFT = false; this.updateMovement();
				//e.stopPropagation();
				return;		
			case KeyInput.RIGHT: case KeyInput.D: this.keyMap.RIGHT = false; this.updateMovement();
				//e.stopPropagation();
				return;
			default:
				return;			
			}
		}
	}
	keyDown(e) {
		if(e.repeat || !gl.isGameState() || this.isInputElement(e)) return;
		if(this.flipCanvas) {
			switch (e.keyCode) {
				case KeyInput.DOWN: case KeyInput.S: this.keyMap.UP = true; this.keyMap.lUP = false; this.updateMovement();
					//e.stopPropagation();
					e.preventDefault();
					return;
	 			case KeyInput.UP: case KeyInput.W: this.keyMap.DOWN = true; this.keyMap.lUP = true; this.updateMovement();
					//e.stopPropagation();
					e.preventDefault();
					return;	
				case KeyInput.RIGHT: case KeyInput.D: this.keyMap.LEFT = true; this.keyMap.lRIGHT = true;this.updateMovement();
					//e.stopPropagation();
					e.preventDefault();
					return;		
				case KeyInput.LEFT: case KeyInput.A: this.keyMap.RIGHT = true; this.keyMap.lRIGHT = false;this.updateMovement();
					//e.stopPropagation();
					e.preventDefault();
					return;	
				case KeyInput.TAB:
					e.preventDefault();
					toggleChat();
					return;
				case KeyInput.SHIFT:
				case KeyInput.CTRL:
				case KeyInput.SPACE:
					this.dash = true; 
					quickUpdate();
					e.preventDefault();
					return;	
				case KeyInput.ESC:
					toggleMenu();
					return;
				default:
					e.preventDefault();
					return;				
			}
		}
		else {
			switch (e.keyCode) {
	 			case KeyInput.UP: case KeyInput.W: this.keyMap.UP = true; this.keyMap.lUP = true;this.updateMovement();
					//e.stopPropagation();
					e.preventDefault();
					return;
	 			case KeyInput.DOWN: case KeyInput.S: this.keyMap.DOWN = true; this.keyMap.lUP = false;this.updateMovement();
					//e.stopPropagation();
					e.preventDefault();
					return;			
				case KeyInput.LEFT: case KeyInput.A: this.keyMap.LEFT = true; this.keyMap.lRIGHT = false;this.updateMovement();
					//e.stopPropagation();
					e.preventDefault();
					return;		
				case KeyInput.RIGHT: case KeyInput.D: this.keyMap.RIGHT = true; this.keyMap.lRIGHT = true;this.updateMovement();
					//e.stopPropagation();
					e.preventDefault();
					return;
				case KeyInput.TAB:
					e.preventDefault();
					toggleChat();
					return;
				case KeyInput.SHIFT:
				case KeyInput.CTRL:
				case KeyInput.SPACE:
					this.dash = true; 
					quickUpdate();
					e.preventDefault();
					return;	
				case KeyInput.ESC:
					toggleMenu();
					return;
				default:
					e.preventDefault();
					return;			
			}
		}
		/*var p0 = null; //gl.game.getPlayer();
		if(p0 === null) return;
		log(0, "D " + JSON.stringify(this.keyMap) );
		p0.dxy.x = this.movement.dx;
		p0.dxy.y = this.movement.dy;*/
	}
	resize() {		
		if(gl.isGameState()) {
			if(this.resizeInterval !== null) return;
		   	this.resizeInterval = setInterval(this.resize0.bind(this), 1000);
		}
    }
	resize0() {
		if(this.resizeInterval !== null) {
			clearInterval(this.resizeInterval);
			this.resizeInterval = null;
		}
		this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
		this.cam.aspect = this.canvas.width/this.canvas.height;
		this.cam.updateProjectionMatrix();
		this.renderer.setSize(this.canvas.width,this.canvas.height);
		//composer.setSize(this.canvas.width,this.canvas.height);
	}
	resizeIfNeeded() {
		if(this.resizeInterval === null && (this.canvas.width !== window.innerWidth || this.canvas.height !== window.innerHeight)) {
			this.resize0();
		}
	}
	setSize(x, y) {
		this.canvas.width = x;
        this.canvas.height = y;
		this.cam.aspect = this.canvas.width/this.canvas.height;
		this.cam.updateProjectionMatrix();
		this.renderer.setSize(this.canvas.width,this.canvas.height);
	}
	updateBall(ball) {
		var field = FIELDS[gl.game.fieldType];
		var fieldDrag = field.fieldDrag;
		
		var repeat = gl.game.gameStep-ball.gameStep;
		if(repeat <= 0) return;
		/*if(ball.goal && gl.game.gameStep > ball.goalStep+5) { 
			ball.speed *= 0.75;
			//return;
		}*/
		if(repeat > 100) {
			console.log("warning: clamp ball repeat to 100");
			repeat = 100;
		}

		var elStep = TICK_MS*0.001;
		for(var r = 0; r < repeat; r++) {
			ball.xy0.set(ball.xy);
			ball.z0 = ball.z;
			var isGoal = ball.goal;
			var goalNum = 0;

			if(ball.goal && gl.game.gameStep > ball.goalStep) { 
				ball.speed0 *= 0.65;
				ball.speed *= 0.65;
				//return;
			}

			var t = 0.0;
			if(ball.z !== 0.0 || ball.dz !== 0.0) {
				var G = A.GRAVITY;
				var G_INV = A.GRAVITY_INV;
			
				for(var k = 0; k < 30; k++) {
					//A = -0.5A  B = dz   C = z
					var res = solveQuadric(-0.5*G, ball.dz, ball.z);
					if(res === null) {
						console.log("BALL RES 0");
						break;
					}
					else {
						var t0 = res[1];
						if(t + t0 >= elStep) {
							t0 = elStep - t;
							ball.xy.x += t0 * ball.speed * ball.dxy.x;
							ball.xy.y += t0 * ball.speed * ball.dxy.y;
							ball.z += (ball.dz - 0.5*G*t0) * t0;
							ball.dz = ball.dz-G*t0;
							break;
						} 
						ball.xy.x += t0 * ball.speed * ball.dxy.x;
						ball.xy.y += t0 * ball.speed * ball.dxy.y;
						if(ball.backspin > 0) {
                            ball.dxy.set(ball.bxy);
                            ball.backspin = 0;
                            ball.speed *= 0.9;
                        }
						else { ball.speed *= field.bounceXY; }
					
						//z = z + (dz - 0.5*G*t0) * t0;
						ball.z = 0.0;
						ball.dz = -(ball.dz - G*t0)*field.bounceZ;
						t = t + t0;

						/*if(!isGoal) {
							if(ball.xy.y <= RECT_T) {
								var ttt = unmix(ball.xy.y, ball.xy.y, RECT_T)
								var xxx = mix(ball.xy.x, ball.xy.x, ttt);
								var zzz = 
								if(xxx >= A.GOALS_L && xxx <= A.GOALS_R && zzz < A.GOALS_Z) {

								}
							}
						}*/

						if(ball.dz < A.BALL_MIN_Z_SPD) {
							ball.dz = 0.0;

							ball.speed0 = ball.speed;
							ball.speedStep = ball.gameStep;
							if(t < elStep) {
								t = elStep-t;

								ball.speed = ball.speed0*Math.exp(-t*fieldDrag);
								var ballDist = ball.speed0-ball.speed; 
								ball.xy.x += ballDist*ball.dxy.x;
								ball.xy.y += ballDist*ball.dxy.y;
							
								//ballSpd0 = ballSpd;
						
								/*t = Math.min(t, ballSpd/fieldDrag);
								ball.xy.x += t * (ballSpd - 0.5*fieldDrag*t) * ball.dxy.x;
								ball.xy.y += t * (ballSpd - 0.5*fieldDrag*t) * ball.dxy.y;
								ballSpd = Math.max(0.0, ballSpd-fieldDrag*t);*/
							}
							break;
						}
					
					}
				}
			
			}
			else {
				if(ball.gameStep > ball.speedStep) { 
					var ballSpdDiff = 0.1*(ball.gameStep - ball.speedStep);
					if(ballSpdDiff <= 4.0) {
						ball.speed = ball.speed0*Math.exp(-ballSpdDiff*fieldDrag);
						var ballDist = ball.speed0*Math.exp(-(ballSpdDiff-0.1)*fieldDrag)-ball.speed; 
						ball.xy.x += ballDist*ball.dxy.x;
						ball.xy.y += ballDist*ball.dxy.y;

						//console.log("ball.speed " + ball.speed + " diff" + ballSpdDiff + " dist " + ballDist + " spd0 "  + ball.speed0 );
					}
					else {
						ball.speed = 0.0;
					}
				}

				/*if(elStep > 0) { 
					ballSpd = ball.speed0*Math.exp(-Math.min(elStep,4.0)*fieldDrag);
					var ballDist = ball.speed0 - ballSpd;  
					ball.xy.x += ballDist*ball.dxy.x;
					ball.xy.y += ballDist*ball.dxy.y;
					//ballSpd = 0.0;
				}*/

				/*t = Math.min(elStep, ballSpd/fieldDrag);
				ball.xy.x += t * (ballSpd - 0.5*fieldDrag*t) * ball.dxy.x;// - 0.5 * fieldDrag * t * t * ball.dxy.x;
				ball.xy.y += t * (ballSpd - 0.5*fieldDrag*t) * ball.dxy.y;// - 0.5 * fieldDrag * t * t * ball.dxy.y;
				ballSpd = Math.max(0.0, ballSpd-fieldDrag*t);*/
			}

			ball.z = Math.max(ball.z, 0.0);

			if(!isGoal) {
				if(ball.xy.x <= RECT_L) {
					ball.dxy.x = -ball.dxy.x;		
					ball.xy.x = RECT_L + (RECT_L-ball.xy.x); 
				}
				else if(ball.xy.x >= RECT_R) {
					ball.dxy.x = -ball.dxy.x;		
					ball.xy.x = RECT_R - (ball.xy.x-RECT_R);
				}


				if(ball.xy.y <= RECT_T) {
					//check goals

					//ball.xy0 ball.xy
					//ball.xy.y
					var ttt = unmix(ball.xy0.y, ball.xy.y, RECT_T);
					var xxx = mix(ball.xy0.x, ball.xy.x, ttt);
					var zzz = mix(ball.z0, ball.z, ttt);
					if(xxx >= A.GOALS_L && xxx <= A.GOALS_R && zzz < A.GOALS_Z) {
						goalNum = 1;
					}
					else {
						//ball.speed0 = ball.speed;
						ball.dxy.y = -ball.dxy.y;		
						ball.xy.y = RECT_T + (RECT_T-ball.xy.y);
						//ball.updateNeeded = true;
					}
				}
				else if(ball.xy.y >= RECT_B) {
					//check goals
					var ttt = unmix(ball.xy0.y, ball.xy.y, RECT_B);
					var xxx = mix(ball.xy0.x, ball.xy.x, ttt);
					var zzz = mix(ball.z0, ball.z, ttt);
					if(xxx >= A.GOALS_L && xxx <= A.GOALS_R && zzz < A.GOALS_Z) {
						goalNum = 2;
					}
					else {
						//ball.speed0 = ball.speed;
						ball.dxy.y = -ball.dxy.y;		
						ball.xy.y = RECT_B - (ball.xy.y-RECT_B);
						//ball.updateNeeded = true;
					}
				}

			
				if(goalNum !== 0) {
					//goal unless goalkeeper can stop it
					//console.log("goal " + goalNum + " " + ball.goalStep);
					ball.goal = true;
					ball.goalStep = ball.gameStep;
					//ball.goalStep = ball.gameStep + 1000;
				}
			}
			/*if(!isGoal) {
				if(ball.xy.y <= RECT_T) {
					//ball.dxy.y = -ball.dxy.y;		
					//hmm.. unmix does not work any more since not linear speed
					var xxx = mix(ball.xy.x, ball.xyI.x, unmix(ball.xy.y, ball.xyI.y, RECT_T));
					//console.log("xxx " + xxx + " " + ball.xy.y + " " +  ball.xyI.y, );
					if(xxx >= A.GOALS_L && xxx <= A.GOALS_R && ball.z < A.GOALS_Z) {
			
					}
					else { 
						ball.xy.y = RECT_T + (RECT_T-ball.xy.y);
					}
				}
				else if(ball.xy.y >= RECT_B) {
					//ball.dxy.y = -ball.dxy.y;	

					var xxx = mix(ball.xy.x, ball.xyI.x, unmix(ball.xy.y, ball.xyI.y, RECT_B));
					//console.log("xxx2 " + xxx + " " + ball.xy.y + " " +  ball.xyI.y, );
					if(xxx >= A.GOALS_L && xxx <= A.GOALS_R && ball.z < A.GOALS_Z) {
			
					}
					else {
						ball.xy.y = RECT_B - (ball.xy.y-RECT_B);
					}
				}
			}*/
			
			ball.gameStep++;
		}
	}
	testUpdate(step) {
		var player = gl.player;
		if(player === null) return;
		var updateStepEl = step-this.lastUpdateStep;
		this.lastUpdateStep = step;

		if(updateStepEl < 0.0) {
			console.log("testUpdate el < 0");
			//console.log("time < 0");
		}

		var el = 0.1; 

		//log(1, JSON.stringify(this.movement) );

		var goalkeepers = gl.game.goalkeepers;
		var chars = gl.game.chars;
		var ball = gl.game.ball;

		var maxRotAngle = 0.1*updateStepEl*INTER_MAX_ROT_ANGLE;

		/*for(var k = 0; k < chars.length; k++) {
		
			var p0 = chars[k] ; //gl.game.getPlayer();

			var VAR_RUN_SPEED = 50;
			var VAR_TCK_SPEED = 200;

			var spd = VAR_RUN_SPEED;
			var ballSpd = 300;

			if(p0.isTackling()) {
				spd = VAR_TCK_SPEED;
				//etc todo exact 
			}
		
			if(p0.canMove()) {
				p0.xy.x += p0.dxy.x*spd*el;
				p0.xy.y += p0.dxy.y*spd*el;
				
				//player bounds
				if(p0.xy.x < RECT_L) {
					p0.xy.x = RECT_L;
				}
				else if(p0.xy.x > RECT_R) {
					p0.xy.x = RECT_R;
				}

				if(p0.xy.y < RECT_T) {
					p0.xy.y = RECT_T;
				}
				else if(p0.xy.y > RECT_B) {
					p0.xy.y = RECT_B;
				}
				
			}
			
			if(p0.tackle > 0) {
				p0.tackle = p0.tackle-el;
				if(p0.tackle <= 0.0) {
					p0.tackle = 0.0;
					p0.dxy.x = this.movement.dx;
					p0.dxy.y = this.movement.dy;
				} 
			}
			if(p0.delay > 0) p0.delay = Math.max(0, p0.delay-el);

		}*/
			/*
			if(p0 !== null) {

			if(ball.isFree()) {
				if(ball.dxy.x != 0.0 || ball.dxy.y != 0.0) { 
			
					ball.xy.x += ball.dxy.x*ballSpd*el;
					ball.xy.y += ball.dxy.y*ballSpd*el;

					//ball bounds
					if(ball.xy.x <= RECT_L) {
						ball.dxy.x = -ball.dxy.x;		
						ball.xy.x = RECT_L + (RECT_L-ball.xy.x);
					}
					else if(ball.xy.x >= RECT_R) {
						ball.dxy.x = -ball.dxy.x;		
						ball.xy.x = RECT_R - (ball.xy.x-RECT_R);
					}

					if(ball.xy.y <= RECT_T) {
						ball.dxy.y = -ball.dxy.y;		
						ball.xy.y = RECT_T + (RECT_T-ball.xy.y);
					}
					else if(ball.xy.y >= RECT_B) {
						ball.dxy.y = -ball.dxy.y;		
						ball.xy.y = RECT_B - (ball.xy.y-RECT_B);
					}
				}
				
				if(ball.delay > 0) {
					ball.delay = Math.max(0, ball.delay-el);
				}
				else {
					var dist = distSq(ball, p0);
					if(dist < 50*50) {
						if(p0.isTackling()) {
							//if(dist < 1.0) {
							//	ball.dxy.x = 0.0;
							//	ball.dxy.y = -1.0;
							//}
							//else {
							//	dist = 1.0/Math.sqrt(dist);
							//	ball.dxy.x = dist*(ball.xy.x-p0.xy.x);
							//	ball.dxy.y = dist*(ball.xy.y-p0.xy.y);
							//}

							var len = ball.xy.dist(this.mXY);
							if(len < 1.0) {
								ball.dxy.x = 0.0;
								ball.dxy.y = -1.0;
							}
							else {
								len = 1.0/len;

								ball.delay = 0.5;
								ball.dxy.x = len*(this.mXY.x-p0.xy.x);
								ball.dxy.y = len*(this.mXY.y-p0.xy.y);
							}
						}
						else {
							ball.player = 0;
						}
					}
				}
			}
		}*/

		//this.clear();
		//this.rect(RECT_L, RECT_T, RECT_R-RECT_L, RECT_B-RECT_T);
		//=====DRAW=====
		//arrow
		//if(p0 !== null) this.line(this.mXY.x, this.mXY.y, p0.xy.x, p0.xy.y);

		//debugCircle("debugPos", this.debugPos.x,1,this.debugPos.y, 2.5, 0xaa7732);		

		//this.color("#000000");
		
		

		var nudge = false;
		//chars
		for(var i = 0; i < chars.length; i++) {
		  	var p = chars[i];
			var p3 = gl.chars3d[i];
			var p3Rot = p3.groupRot.rotation;

			var elStep = (step-p.gameStep)*TICK_MS*0.001;

			/*if(!nudge && elStep < 0) {
				nudge = true;
				TIME_OFFSET++;
				console.log("nudge time" + TIME_OFFSET);
			}*/

			/*if(i == gl.player.charId) {
				log(5, " el " + elStep  + " " + p.dxy.x + " " + p.dxy.y );
			}*/

			if(player.charId == i) {
				//this.color("#eaae62");
			}
			else {
				//this.color("#000000");
			}

			if(!p.canMove()) {
				//console.log("cant move " + i);
				//this.color("#552232");
			}

			var xx = 0.0;
			var yy = 0.0;

			var linearT = INTER_MAX_SPD_CHAR*updateStepEl;
			var charInterpolationSpeed = 3.0;
			
			var runSpd = p.stats.getRunSpeed(ball.charId === i);
			//if(player.charId === i) { log("msg", "run Spd " + runSpd ); }
			var spd = runSpd;
			if(ball.isGoal()) {
				if(p.xyI.distSq(p.xy) > 1) {
					charInterpolationSpeed *= 0.75;
					p3Rot.y = rotateTo(p3Rot.y, atan2PI(p.xy.x-p.xyI.x, p.xy.y-p.xyI.y), maxRotAngle);
					p3.anim.setRunSpeed(15.0);
					p3.anim.run();
				}
				else {
					p3Rot.y = rotateTo(p3Rot.y, i < 4?Math.PI:0.0, maxRotAngle);
					p3.anim.stand();
				}
			}
			else if(p.isHeadingHere()) {
				if(p.dxy.x !== 0.0 || p.dxy.y !== 0.0) { 
					p3Rot.y = rotateTo(p3Rot.y, atan2PI(p.dxy.x, p.dxy.y), maxRotAngle);
				}
				p3.anim.setHeadSpeed(A.HEAD_STEPS/p.headLen);
				p3.anim.head(p.head);

				var headEl = (p.head-p.gameStep)*TICK_MS*0.001;
				if(elStep > headEl) {
					xx += headEl * p.headSpd * p.dxy.x;
					yy += headEl * p.headSpd * p.dxy.y;
					elStep = elStep-headEl;
					spd = 0.0;
				}
				else {
					spd = p.headSpd;
				}

				//etc todo exact 
				//this.color("#aa7732");
			}
			else if(p.isTacklingHere()) {
				if(p.dxy.x !== 0.0 || p.dxy.y !== 0.0) { 
					p3Rot.y = rotateTo(p3Rot.y, atan2PI(p.dxy.x, p.dxy.y), maxRotAngle);
				}
				p3.anim.tackle();

				spd = p.stats.getTackleSpeed();
				var tckEl = (p.tackle-p.gameStep)*TICK_MS*0.001;
				if(elStep > tckEl) {
					xx += tckEl * spd * p.dxy.x;
					yy += tckEl * spd * p.dxy.y;
					elStep = elStep-tckEl;
					spd = 0.0;
				}

				//etc todo exact 
				//this.color("#aa7732");
			}
			else if(p.isDashingHere()) {
				if(p.dxy.x !== 0.0 || p.dxy.y !== 0.0) { 
					p3Rot.y = rotateTo(p3Rot.y, atan2PI(p.dxy.x, p.dxy.y), maxRotAngle);
				}
				spd = p.stats.getDashSpeed(ball.charId === i);
				p3.anim.setRunSpeed(spd);
				p3.anim.run();
				var dashEl = (p.dash-p.gameStep)*TICK_MS*0.001;
				//log("dash", elStep + "  > " + dashEl);
				//console.log("dash " +  p.dxy.x + " " + p.dxy.y);
				if(elStep > dashEl) {
					//console.log("dash1");
					xx += dashEl * spd * p.dxy.x;
					yy += dashEl * spd * p.dxy.y;
					elStep = elStep-dashEl;
					//console.log("dash1 " + elStep + "  " + dashEl + "  "  + xx + " " + yy);
					//console.log("dash2 " + xx + " " + yy);

					if(this.movement.id === Movement.NONE.id || this.movement.id === Movement.TACKLED.id) {
						spd = 0.0;
					}
					else { 
						spd = runSpd;
					}
					//spd = A.DASH_SPD;
				}
				else {
					//console.log("dash2 " + elStep);
					
				}
			}
			else if(p.isPassing()) {
				spd = p.stats.getPassSpeed();
			}
			else if(!p.canMove()) {
				p3.anim.tackled();
			}
			else {
				p3Rot.y = rotateTo(p3Rot.y, Movement.fromId(p.lookAtDir).ra, maxRotAngle);
			    if(p.movementId === Movement.NONE.id) {
					p3.anim.stand();
				}
				else {
					p3.anim.setRunSpeed(spd);
					p3.anim.run();
				}
			}

			xx += p.xy.x + elStep * spd * p.dxy.x;
			yy += p.xy.y + elStep * spd * p.dxy.y;

			if(xx < RECT_L) {
				xx = RECT_L;
			}
			else if(xx > RECT_R) {
				xx = RECT_R;
			}

			if(yy < RECT_T) {
				yy = RECT_T;
			}
			else if(yy > RECT_B) {
				yy = RECT_B;
			}

			//if(p.xyI.x !== xx || p.xyI.y !== yy) {
			//	console.log("Pos is: " + xx + "," + yy);
			//}

			p3.dx = p.dxy.x;
			p3.dz = p.dxy.y;
			p3.spd = spd;

			if(ball.isGoal()) {
				interpolate(p.xyI, xx, yy, updateStepEl, charInterpolationSpeed);
			}
			else {
				linear(p.xyI, xx, yy, linearT);
				//if(p.isTacklingHere()) {
				//	console.log("tackle " + p.xyI.x + " " + p.xyI.y + " (" + xx + " " + yy + ") " + glnow());
				//}
			}
			p3.position.set(p.xyI.x, 0, p.xyI.y);
			
			if(DEBUG_CIRCLE_PLAYER_POS) { debugCircle("char"+i, xx, 1, yy, A.PLAYER_RAD, 0x55ff00); }

			if(player.charId === i) {
				var v = this.convertMouse(this.mXY.x, this.mXY.y);
				if(distSq2Diff(v.x-p.xyI.x, v.y-p.xyI.y) > 0.5) {
					this.arrow.rotation.y = atan2PI(v.x-p.xyI.x, v.y-p.xyI.y);
					var bSpin = p.stats.getFlag(A.DRILL_BACKSPIN);
					if(bSpin > 0 && ball.charId === i) {
						this.arrowSpin.visible = true;
						this.arrowSpin.position.set(p.xyI.x,1,p.xyI.y);
						 
						this.tmpV2.set2(v.x-p.xyI.x, v.y-p.xyI.y).normalizeLocal();
						var dotSpin = bSpin*p.dxy.dot2(-this.tmpV2.y, this.tmpV2.x);
			            this.arrowSpin.rotation.y = atan2PI(-dotSpin*this.tmpV2.y-this.tmpV2.x, dotSpin*this.tmpV2.x-this.tmpV2.y);
					}
					else {
						this.arrowSpin.visible = false;
					}
				}
				var ARROW_LENGTH = 7;
				if(this.didPass === 0) {
					this.arrow.setLength(ARROW_LENGTH);
					//this.arrowSpin.visible = false;
				}
				else {
					var pow = passPow(p.stats.getChargeSpeed()*(Date.now()-this.startPassTime));
					this.arrow.setLength(ARROW_LENGTH*pow*0.01);
				}
				
				this.arrow.position.set(p.xyI.x,1,p.xyI.y);
				
				if(this.mouseCaptured) {
					this.mouseCircle.position.set(v.x,1,v.y);
				}
				else {
					this.mouseCircle.position.set(-100,-100,-100);
				}
				/*var col = 0x55ff55;
				var v2 = new vec2(v.x, v.y);

				var pG = goalkeepers[1];
				//var ballP0 = intersectsCapsule2(p.xy, v2, pG.xy0, pG.xy, A.GOALKEEPER_BALL_PICK_DIST);

				var ballP0 = calcForSpheres2(p.xy, v2, pG.xy0, pG.xy, A.GOALKEEPER_BALL_PICK_DIST);

				debugCircle("coltestA",p.xy.x,10,p.xy.y, 0.5, 0xffff00);
				debugCircle("coltestB",v2.x,10,v2.y, 0.5, 0xeeee00);
				debugCircle("coltestC",pG.xy0.x,10,pG.xy0.y, 0.5, 0xdddd00);
				debugCircle("coltestD",pG.xy.x,10,pG.xy, 0.5, 0xaaaa00);

				if(ballP0 !== null && ballP0[0] <= 1.0) {

					
					var txt = ballP0[0] + " " + ballP0[1];

					var b2 = p.xy.mix(v2, ballP0[0]);
					var g2 = pG.xy0.mix(pG.xy, ballP0[0]);
					var N = g2.sub(b2).normalizeLocal();
					debugCircle("coltest1",b2.x,1,b2.y, 0.5);	

					var distLeft = (1.0-ballP0[0])*p.xy.dist(v2);

					var dxG = v2.sub(p.xy).normalizeLocal();
					dxG.reflectLocal(N);
					b2.x += distLeft*dxG.x;
					b2.y += distLeft*dxG.y;

					debugCircle("coltest2",b2.x,1,b2.y, 0.5, 0x55ff00);	*/
					
					/*var dxG = v2.sub(p.xy).normalizeLocal();
					var b2 = p.xy.mix(v2, ballP0[0]);
					var g2 = pG.xy0.mix(pG.xy, ballP0[1]);
					var N = ballP0[3];

					var txt = ballP0[0] + "," + ballP0[1] + " |" + N.x + "," + N.y + " | " + dxG.x + "," + dxG.y;

					N.x = -N.x; N.y = -N.y;

					dxG.reflectLocal(N);
					debugCircle("coltest1",b2.x,1,b2.y, 0.5);	

					var distLeft = (1.0-ballP0[0])*p.xy.dist(v2);

					b2.x += distLeft*dxG.x;
					b2.y += distLeft*dxG.y;
					debugCircle("coltest2",b2.x,1,b2.y, 0.5, 0x55ff00);	

					txt += " now " + dxG.x + "," + dxG.y;

					*/
					/*log("msg", txt);
				}*/
				/*var N = ballP0[3];
				//var T = new vec2(-N.y, N.x);
				var distLeft = (1.0-ballP0[0])*ball.xy0.dist(ball.xy);

				ball.xy.mixLocal(ball.xy0, 1.0-ballP0[0]);
				ball.dxy.reflectLocal(N);

				ball.xy.x += distLeft*ball.dxy.x;
				ball.xy.y += distLeft*ball.dxy.y;*/

				//for(var k = 0; k < chars.length; k++) {
				//	if(k === i) continue;				
				//	var t = chars[k];
				//	if(intersectsCapsule(t.xy, t.xy, p.xy, v2, 2.0*A.TCK_DIST)) {
				//		col = 0xffccaa;
				//		break;
				//	}
				//}
				//debugCircle("char"+i, p.xyI.x,1,p.xyI.y, A.PLAYER_RAD, col);			
			}

			//p.dashDelay <= step
			//max dash delay
			var maxDashDelay = p.stats.getDashRechargeTime();
			var dashSteps = clamp((maxDashDelay-(p.dashDelay-step))/maxDashDelay, 0.0, 1.0);
			p3.setDash(dashSteps);


			/*if(p.playerId !== -1) {
				var col = 0x55ff55;
				if(p.canDash()) {
					col = 0x55ff55;
				}
				else {
					col = 0xffffff;
				}
			
				debugCircle("char"+i, p.xyI.x,1,p.xyI.y, A.PLAYER_RAD, col);	
			}	
			else {
				debugCircle("char"+i, p.xyI.x,1,p.xyI.y, A.PLAYER_RAD, col);	
			}*/

			//this.circle(p.xyI.x, p.xyI.y, 50);

			if(ball.charId === i) {
				var dir = Movement.fromId(p.lookAtDir);
				var rotAxis = this.rotAxisTmp;
				rotAxis.x = ball.xyI.x;
				rotAxis.z = ball.xyI.y;
				
				//ball.xyI.x = p.xyI.x + dir.dx*A.BALL_POS_RAD;
				//ball.xyI.y = p.xyI.y + dir.dy*A.BALL_POS_RAD;
				ball.xyI.x = p.xyI.x + Math.sin(p3Rot.y)*A.BALL_POS_RAD;
				ball.xyI.y = p.xyI.y + Math.cos(p3Rot.y)*A.BALL_POS_RAD;
				ballModel.position.set(ball.xyI.x,0,ball.xyI.y);
				ballModel.scale.set(A.BALL_SCALE, A.BALL_SCALE, A.BALL_SCALE);

				rotAxis.set(ball.xyI.y-rotAxis.z, 0, -(ball.xyI.x-rotAxis.x));

				var rotAxisLenSq = rotAxis.lengthSq();
				if(rotAxisLenSq > 0.01) {
					rotAxisLenSq = Math.sqrt(rotAxisLenSq);
					var rotAxisLenSqInv = 1.0/rotAxisLenSq;
					rotAxis.x *= rotAxisLenSqInv;
					rotAxis.z *= rotAxisLenSqInv;
					ballModel.rotateOnWorldAxis(rotAxis, rotAxisLenSq*A.BALL_ROTATE_UNIT);
					//log("rot", "rot " + rotAxisLenSq); 
				}
				if(this.flipCanvas) {
					ballShadowModel.position.set(ball.xyI.x+0.15,0.1,ball.xyI.y-0.15);
				}
				else {
					ballShadowModel.position.set(ball.xyI.x-0.15,0.1,ball.xyI.y+0.15);
				}
				//this.circle(ball.xyI.x, ball.xyI.y, 10);
			} 		
		}

		//this.color("#000000");

		if(ball.isFree()) {
			this.updateBall(ball);

			ballModelEffect(ball, step);
			
			var field = FIELDS[gl.game.fieldType];
			var fieldDrag = field.fieldDrag;
			var ballSpd = ball.speed;
			var elStep = (step-ball.gameStep)*TICK_MS*0.001;

			var bx = ball.xy.x;
			var by = ball.xy.y; 
			var bz = ball.z;  
			
			var dx = ball.dxy.x;
			var dy = ball.dxy.y; 

			var backspin = ball.backspin;
			var isGoal = ball.goal;

			var t = 0.0;
			if(ball.z !== 0.0 || ball.dz !== 0.0) {
				var G = A.GRAVITY;
				var G_INV = A.GRAVITY_INV;
				var dz = ball.dz;
				
				for(var k = 0; k < 30; k++) {
					//A = -0.5A  B = dz   C = z
					var res = solveQuadric(-0.5*G, dz, bz);
					if(res === null) {
						console.log("BALL RES 0");
						break;
					}
					else {
						var t0 = res[1];
						if(t + t0 >= elStep) {
							t0 = elStep - t;
							bx += t0 * ballSpd * dx;
							by += t0 * ballSpd * dy;
							bz += (dz - 0.5*G*t0) * t0;
							dz = dz-G*t0;
							break;
						} 
						bx += t0 * ballSpd * dx;
						by += t0 * ballSpd * dy;						
						if(backspin > 0) {
							dx = ball.bxy.x;
							dy = ball.bxy.y;
                            backspin = 0;
                            ballSpd *= 0.9;
                        }
						else { ballSpd *= field.bounceXY; }
						
						//z = z + (dz - 0.5*G*t0) * t0;
						bz = 0.0;
						dz = -(dz - G*t0)*field.bounceZ;
						t = t + t0;

						if(dz < A.BALL_MIN_Z_SPD) {
							dz = 0.0;

							var ballSpd0 = ballSpd;
							if(t < elStep) {
								t = elStep-t;

								ballSpd = ballSpd0*Math.exp(-Math.min(t,4.0)*fieldDrag);
								var ballDist = ballSpd0-ballSpd; 
								bx += ballDist*dx;
								by += ballDist*dy;
							}
							break;
						}
						
						
					}
				}
			}
			else {

				if(ball.gameStep > ball.speedStep) { 
					var ballSpdDiff = 0.1*(ball.gameStep - ball.speedStep);
					if(ballSpdDiff <= 4.0) {
						ballSpd = ball.speed0*Math.exp(-ballSpdDiff*fieldDrag);
						var ballDist = ball.speed0*Math.exp(-(ballSpdDiff-elStep)*fieldDrag)-ballSpd; 
						bx += ballDist*ball.dxy.x;
						by += ballDist*ball.dxy.y;

						//console.log("ball.speed " + ball.speed + " diff" + ballSpdDiff + " dist " + ballDist + " spd0 "  + ball.speed0 );
					}
					else {
						ballSpd = 0.0;
					}
				}

			}

			bz = Math.max(bz, 0.0);

			for(var k = 0; k < 30; k++) {
				var breakLoop = true;
				if(bx <= RECT_L) {
					//ball.dxy.x = -ball.dxy.x;		
					bx = RECT_L + (RECT_L-bx); 
					breakLoop = false;
				}
				else if(bx >= RECT_R) {
					//ball.dxy.x = -ball.dxy.x;		
					bx = RECT_R - (bx-RECT_R);
					breakLoop = false;
				}

				if(!isGoal) {
					if(by <= RECT_T) {
						//ball.dxy.y = -ball.dxy.y;		
						//hmm.. unmix does not work any more since not linear speed
						var xxx = mix(ball.xy.x, ball.xyI.x, unmix(ball.xy.y, ball.xyI.y, RECT_T));
						//console.log("xxx " + xxx + " " + ball.xy.y + " " +  ball.xyI.y, );
						if(xxx >= A.GOALS_L && xxx <= A.GOALS_R && ball.z < A.GOALS_Z) {
					
						}
						else { 
							by = RECT_T + (RECT_T-by);
							breakLoop = false;
						}
					}
					else if(by >= RECT_B) {
						//ball.dxy.y = -ball.dxy.y;	

						var xxx = mix(ball.xy.x, ball.xyI.x, unmix(ball.xy.y, ball.xyI.y, RECT_B));
						//console.log("xxx2 " + xxx + " " + ball.xy.y + " " +  ball.xyI.y, );
						if(xxx >= A.GOALS_L && xxx <= A.GOALS_R && ball.z < A.GOALS_Z) {
					
						}
						else {
							by = RECT_B - (by-RECT_B);
							breakLoop = false;
						}
					}
				}

				if(breakLoop) { break; }
			}

			/*log("ball", "ball is at " + ball.xy.x + ", " + ball.xy.y + " " + ball.z + "["+bx+","+by+"]");
			log("ball2", "ball is at " + bz);
			log("ball3", "ball spd " + ballSpd + " " + ball.dz + "  " +  ball.gameStep + " " + ball.goalStep);
			*/

			//bz = BZ_TEST;

			//log(3, "interpolateBall " + updateStepEl + " "); 
			var rotAxis2 = new THREE.Vector3(ball.xyI.x, 0.0, ball.xyI.y);
			linear(ball.xyI, bx, by, linearT);
			//interpolate(ball.xyI, bx, by, updateStepEl, INTER_MAX_SPD_BALL);
			//ball.xyI.x = bx;
			//ball.xyI.y = by;

			ballModel.position.set(ball.xyI.x,0.0,ball.xyI.y + (this.flipCanvas?bz:-bz));
			var ballScale = A.BALL_SCALE*mix(1.0,A.BALL_Z_SCALE,bz*0.1);
			ballModel.scale.set(ballScale, ballScale, ballScale);

			rotAxis2.set(ball.xyI.y-rotAxis2.z, 0, -(ball.xyI.x-rotAxis2.x));
			var rotAxisLenSq2 = rotAxis2.lengthSq();
			if(rotAxisLenSq2 > 0.01) {
				rotAxisLenSq2 = Math.sqrt(rotAxisLenSq2);
				//log("rot", "rot " + rotAxisLenSq2); 
				var rotAxisLenSqInv2 = 1.0/rotAxisLenSq2;
				rotAxis2.x *= rotAxisLenSqInv2;
				rotAxis2.z *= rotAxisLenSqInv2;
				//rotAxisLenSq2 = Math.min(0.25, rotAxisLenSq2);
				ballModel.rotateOnWorldAxis(rotAxis2, rotAxisLenSq2*A.BALL_ROTATE_UNIT);
			}
			else {
				//ballModel.rotateOnWorldAxis(new THREE.Vector3(1,0,0), A.BALL_ROTATE_UNIT*10.0);
			}
			ballShadowModel.position.set(ball.xyI.x,0.1,ball.xyI.y);
			//this.circle(ball.xyI.x, ball.xyI.y,10);
		}
		else {
			//this.circle(ball.getX(),ball.getY(),10);
		}	

		//debugCircle("gtacklestart"+i, 0, 1.1, -48, A.GOALKEEPER_TACKLE_START_RADIUS, 0x77ff77);
		//debugCircle("gtackle"+i, 0,1.2, -48, A.GOALKEEPER_TACKLE_RADIUS);

		for(var i = 0; i < goalkeepers.length; i++) {
			var p = goalkeepers[i];
			var p3 = gl.chars3d[8+i];
			var p3Rot = p3.groupRot.rotation;

			var elStep = (step-p.gameStep)*TICK_MS*0.001;
			
			var spd = p.getSpeed();
			
			var xx;
			var yy;

			if(p.state === 0) {
				var tX;
				if(ball.isFree() && ball.speed >= A.GOALKEEPER_BALL_PICK_SPD_RUN) {
					var tY = unmix2(ball.xyI.y, ball.xyI.y+ball.dxy.y, p.xy.y);

					tX = ball.xyI.x;
					if(tY > 0.0) {
						tX = mix(ball.xyI.x, ball.xyI.x+ball.dxy.x, tY);
						//console.log("tX " + tX + " " + tY);
					}
				}
				else { tX = ball.xyI.x; }		
			
				var moveDX = spd*updateStepEl*TICK_MS*0.001; 
				var followScale = ball.isFree()?1.0:A.GOALKEEPER_BALL_FOLLOW_SCALE;
				var tXPosClamp = clamp(followScale*tX, -A.GOALKEEPER_MAX_X_DIST, A.GOALKEEPER_MAX_X_DIST);
				var dirXClamp = tXPosClamp-p.xy.x;

				if(dirXClamp > moveDX) {
					p.xy.x += moveDX;
				}
				else if(dirXClamp < -moveDX) {
					p.xy.x -= moveDX;
				}
				else {
					p.xy.x = tXPosClamp;
				} 

				xx = p.xy.x;
				yy = p.xy.y;

				//xx = clamp(xx, -A.GOALKEEPER_MAX_X_DIST, A.GOALKEEPER_MAX_X_DIST);
			}
			else {
				xx = p.xy.x + elStep * spd * p.dxy.x;
				yy = p.xy.y + elStep * spd * p.dxy.y;
			}
		
			linear(p.xyI, xx, yy, linearT);
			//interpolate(p.xyI, xx, yy, updateStepEl, INTER_MAX_SPD_CHAR);
			p3.position.set(p.xyI.x, 0, p.xyI.y);

			//p3.position.set(xx, 0, yy);

			if(p.state === 0) {
				p3.anim.stand2();
				if(p.team1) {
					if(xx < -A.GOALKEEPER_FACE_DIAGONAL) {
						p3Rot.y = rotateTo(p3Rot.y, Movement.UP_LEFT.ra, maxRotAngle);
					}
					else if(xx > A.GOALKEEPER_FACE_DIAGONAL) {
						p3Rot.y = rotateTo(p3Rot.y, Movement.UP_RIGHT.ra, maxRotAngle);
					}
					else {
						p3Rot.y = rotateTo(p3Rot.y, Movement.UP.ra, maxRotAngle);
					}
				}  
				else {
					if(xx < -A.GOALKEEPER_FACE_DIAGONAL) {
						p3Rot.y = rotateTo(p3Rot.y, Movement.DOWN_LEFT.ra, maxRotAngle);
					}
					else if(xx > A.GOALKEEPER_FACE_DIAGONAL) {
						p3Rot.y = rotateTo(p3Rot.y, Movement.DOWN_RIGHT.ra, maxRotAngle);
					}
					else {
						p3Rot.y = rotateTo(p3Rot.y, Movement.DOWN.ra, maxRotAngle);
					}
				}
			}
			else if(p.state === 1) {
				p3.anim.tackle();
				p3Rot.y = rotateTo(p3Rot.y, Movement.fromId(p.lookAtDir).ra, maxRotAngle);
			}
			else if(p.state === 3) {
				p3Rot.y = rotateTo(p3Rot.y, Movement.fromId(p.lookAtDir).ra, maxRotAngle);
			}
			else if(p.state === 4) {
				if(p.team1) {
					if(p.movementId === Movement.RIGHT.id) {
						p3.anim.diveR();
					}
					else if(p.movementId === Movement.LEFT.id) {
						p3.anim.diveL();
					}
					p3Rot.y = rotateTo(p3Rot.y, Movement.UP.ra, maxRotAngle);
				}
				else {	
					if(p.movementId === Movement.RIGHT.id) {
						p3.anim.diveL();
					}
					else if(p.movementId === Movement.LEFT.id) {
						p3.anim.diveR();
					}
					p3Rot.y = rotateTo(p3Rot.y, Movement.DOWN.ra, maxRotAngle);
				}
			}
			else {	
				p3.anim.run();
				p3Rot.y = rotateTo(p3Rot.y, Movement.fromId(p.lookAtDir).ra, maxRotAngle);
			}

			//debugCircle("goalkeeper"+i, p.xy.x,1,p.xy.y, A.GOALKEEPER_BALL_PICK_DIST);

			//interpolate(p.xyI, xx, yy, updateStepEl, INTER_MAX_SPD_CHAR);
			//p3.position.set(p.xyI.x, 0, p.xyI.y);
		}	
	}
}
var CHAT_LOG = new CircularBuffer(100);
function teAdd(user, msg, color) {
	CHAT_LOG.add({msg: user+": " + msg.replaceAll("\n", " "), time:Date.now(), col: color});
	
	var p = gl.getPlayerData(gl.player.id);
	if(p !== null) {
		//var g; 
		//if(p.gid === -1 || ((g=gl.getGame(p.gid)) != null && g.getState() === B.GAME_OPTION_STATE_LOBBY)) {
			var te = document.getElementById("textbox2");
			var nodes = te.childNodes;
			
			var x = 0;
			var row;
			for(var i = CHAT_LOG.length-1; i >= 0; i--) {
				if(x < te.childNodes.length) {
					row = nodes[x];
				}
				else {
					row = document.createElement("p");
					te.appendChild(row);
					nodes = te.childNodes;
				}
				var m = CHAT_LOG.get(i);
				row.textContent = m.msg;
				row.style.color = m.col;
				x++;
			}
			for(; x < te.childNodes.length; x++) {
				row = nodes[x];
				row.textContent = "";
			}
		//}
		if(gl.isGameState()) {
			updateLogText();
		}
	}
}
var TUTORIAL_MSG = [
	[ "Welcome to tutorial.",
	  "Toggle Menu with (ESC), Chat log with (TAB). Zoom in-out with mouse wheel.",
	  "Move your character with WASD or Arrows."	],
	"Good Job! Next, dash by pressing Spacebar.", 
	"Now that you know how to move. Pick the ball by moving over it.",
	"Good! Now move to the selected location.",
	null,
	"Now to the next location! Zoom out with mouse wheel to see it.",
	["It seems you were tackled! Press left mouse button to tackle and reclaim the ball!", "Then, move to the selected location."],
	null,
	"Pass the ball to the forward player by left clicking.",
	null,
	null,
	"By holding the left mouse button, charge a more powerful pass to the forward player.",
	null,
	null,
	"Use a loft kick by holding the right mouse button to pass to the forward player.",
	"Switch control of your character to the forward player by right clicking.",
	"Now move to the selected location.",
	"Score a goal by charging a powerful shot by holding left mouse button. Aim at the opposite corner!",
	["Good Job! You have completed the tutorial. Press (ESC) and Leave to exit...",
	"You can practive shooting more goals or go to lobby and play a game with people online or AI."
	]
	
];

var TUTORIAL_MSG_COLOR = [ "#ffd789", "#fcff94", "#74ea00", "#99ff8a", "#b1fff8" ];
function teTutorialMsg2(m, k, i) {
	setTimeout(function() { teAdd("", m, TUTORIAL_MSG_COLOR[i%TUTORIAL_MSG_COLOR.length]); }, k*3000);
}
var TUTORIAL_COLOR = 0;
function teTutorialMsg(i) {
	if(i >= 0 && i < TUTORIAL_MSG.length) {
		if(i === 2) {
			debugCircle("tutorialPos", 0,1,0, 5.0, 0xaa7732);		
		}
		else if(i === 3) {
			debugCircle("tutorialPos", -25,1,0, 5.0, 0xaa7732);		
		}
		else if(i === 5) {
			debugCircle("tutorialPos", 25,1,0, 5.0, 0xaa7732);		
		}
		else if(i === 6 || i === 7) {}
		else if(i === 16) {
			debugCircle("tutorialPos", -20,1,-32, 5.0, 0xaa7732);		
		}
		else {
			debugCircle("tutorialPos", -1000,1,-32, 5.0, 0xaa7732);		
		}
	
		var x = TUTORIAL_MSG[i];
		if(x === null) return null;
		for(var k = CHAT_LOG.length-1; k >= 0; k--) {
			var a = CHAT_LOG.get(k);
			if(a.msg[0] == ':') a.col = "";
		}
		if(i === 0) TUTORIAL_COLOR = 0;
		else TUTORIAL_COLOR++;
		if(Array.isArray(x)) {
			teAdd("", x[0], TUTORIAL_MSG_COLOR[TUTORIAL_COLOR%TUTORIAL_MSG_COLOR.length]);
			for(var k = 1; k < x.length; k++) { 
				var m = x[k];
				teTutorialMsg2(m, k, TUTORIAL_COLOR);
			}
		}
		else teAdd("", x, TUTORIAL_MSG_COLOR[TUTORIAL_COLOR%TUTORIAL_MSG_COLOR.length]);
	}
}
function updateLogText() {
	if(gl.isGameState()) {
		//console.log("updateLogText");
		var TEXT_TIME = 15000;
		var no = Date.now();
		var te = document.getElementById("logtext");
		var nodes = te.childNodes;
		var x = nodes.length-1;
		var row;
		for(var i = CHAT_LOG.length-1; i >= 0 && x >= 0; i--) {
			var a = CHAT_LOG.get(i);
			var ti = no-a.time;
			if(a.msg[0] == ':') ti *= 0.25;
			if(ti > TEXT_TIME) { break; }
			row = nodes[x];
			row.textContent = a.msg;
			row.style.color = a.col;
			x--;
		}
		if(x < nodes.length-1) {
			var ti = CHAT_LOG.get(CHAT_LOG.length-1).time;
			ti = 1000+Math.abs(TEXT_TIME-(no-ti));
			setTimeout(updateLogText, ti);
		}
		for(; x >= 0; x--) {
			row = nodes[x];
			row.textContent = "";
		}
	}
}
function initT() {
	var textbox = document.getElementById("textbox");
	textbox.addEventListener("keyup", function(e) {
		if (e.key !== undefined) {
			if(e.key === "Enter") {
				var te = textbox.value;
				textbox.value = "";
				gl.te(te);
			}
		}
		else {
			if(e.keyCode === 13) {
				var te = textbox.value;
				textbox.value = "";
				gl.te(te);
			}
		}
	});
	CHAT_LOG = new CircularBuffer(100);
	initTChan();
}
function initTChan() {
	var HOST = "wss://mirafungames.com/wslobbygame";
	if(gl.player !== null) { 
		if(ssGUEST !== null) HOST += "?a="+gl.player.ti + "&g="+ssGUEST;
		else HOST += "?a="+gl.player.ti;
	}
	else if(ssGUEST !== null) HOST += "?g="+ssGUEST;
	//if(gl.player !== null) HOST += "?a="+gl.player.ti;
	//console.log("connecting " + HOST);
	var chan0 = new WebSocket(HOST, "text");
	gl.player.text = chan0;
	chan0.binaryType = "arraybuffer";
	chan0.onopen = function() {
	
	};
	var handleMsg = function(buf) {
		while(buf.pos < buf.limit) {
			var type = buf.getByte();
			//console.log(type);

			switch(type) {
				case A.MSG_PING:
					setTimeout(function(){
						var bufS = _tmp();
						bufS.putByte(A.MSG_PING);
						chan0.send(bufS.flip());
					}, 100);
					break;
				case B.MSG_TE:
				case B.MSG_TE2:
					var col = 0;
					if(type == B.MSG_TE2) {
						col = buf.getInt();
					}
					var username = buf.getByteString();
					var msg = buf.getByteString();
					if(col === 0) { col = ""; } 
					else {
						col = '#'+col.toString(16).padStart(6, '0');
					}
					teAdd(username, tefi(msg), col);
					break;
			}
		}
	};
	chan0.onmessage = function(msg) {
		if(msg.data instanceof ArrayBuffer) { 
			var buf = wrap(msg.data);	
			handleMsg(buf);
		}
		else if(msg.data instanceof Blob) { 
			console.log("bytes");
		  //processBlob(msg.data);
			//reader.readAsArrayBuffer();
			
	    } else {
			console.log("text");
		  //processText(msg.data);
	    }
	};
	chan0.onclose = function(event) {
		console.log("closed T");
		console.log(event);
		
		reClose(event);
		//gl.setGameState(false);
		//_display("#state-2");
		//show some dialog that got disconnected
		//could do proper close as message etc, reason for close
	};
	chan0.onerror = function(event) {
	  	console.log("error T");
	  	console.log(event);
	};	
}
function init2HandleMsg(buf) {
	var updateLobby = false;
	var updatePlayerChars = false;
	var updatePlayerNames = false;
	var gTime = 0;
	var sTime = 0;
	var sTimeL = 0;
	//buf.dump();		
	while(buf.pos < buf.limit) {
		var type = buf.getByte();
		//console.log(type);

		if(type > 127) {
			//
			gl.game.setCharX(buf, type, sTime);
		}
		/*else if(type > 64) {
			//buf.pos = buf.limit;
			//console.log("Unknown message " + type);
		}*/
		else {
			switch(type) {
				case A.MSG_GSTEP:
					sTime = buf.getChar();
					sTimeL = buf.getLong();

					var nowTmp = glnow();
					var elTmp = nowTmp-gl.game.startTime;
					/*if(elTmp < 0.0) {
						console.log("elTmp < 0... todo nudge");
						elTmp = 0;
					}*/
					var stepTmp = elTmp*TICK_MS_INV;
					gTime = toInt(stepTmp);
					if(sTimeL > nowTmp) {
						var nudge = sTimeL-nowTmp;
						TIME_OFFSET += nudge;
						//console.log("nudge time" + nudge);
					}

					/*if(!nudge && elStep < 0) {
						nudge = true;
						TIME_OFFSET++;
						console.log("nudge time" + TIME_OFFSET);
					}*/
					
					var ping = (stepTmp-sTime)*TICK_MS;
					var rping = (nowTmp-sTimeL);
					//log("gTime", "gs " + gTime + " " + sTime + " tick dist " + ping.toFixed(2) + " ping " + rping );
					//log("gTime", " ping " + rping);
					gl.setPing(rping);
					break;
				case A.MSG_GAME_INIT: 
					//console.log("game init");
					var gameTime = buf.getLong();
					var p = gl.playerDataHere();
					if(p !== null && p.gid !== -1) {
						var g = gl.getGame(p.gid);
						if(g !== null) {
							gl.game = Game.newGame(g);

							gl.game.gameData = g;
							gl.setGameState(true);
							gl.game.startTime = gameTime;	
							gl.game.started = true;

							gl.player.setCharId(p.getTeamOrder());
						
							clearScene();

							scene.add(_ballModelEffectNode);
							scene.add(ballModel);
							scene.add(ballShadowModel);
							scene.add(gl.canvas.arrow);
							scene.add(gl.canvas.arrowSpin);
							scene.add(gl.canvas.mouseCircle);

							gl.chars3d = [];
							for(var i = 0; i < 8; i++) {
								var charData = g.chars[i];
								if(charData.type === 0) { charData.type = 4; }
								var group = getCharModel(charData.type);
								gl.game.chars[i].xyI.set(gl.game.chars[i].xy);
								//group.position.set(gl.game.chars[i].xy.x, 0, gl.game.chars[i].xy.y);
								
								var bearHairValue = (charData.getHair()<<2) | charData.getBeard();
								if(bearHairValue >= 12) { bearHairValue += 4; }
								group.setHair(bearHairValue);
								group.eyeMat.color.setHex(0x2D211C);
								group.hairMat.color.copy(B.HAIR_COLOR[charData.getHairCol() % B.HAIR_COLOR.length]);
								group.skinMat.color.copy(B.SKIN_COLOR[charData.getSkinCol() % B.SKIN_COLOR.length]);
								group.hairMat.color.convertSRGBToLinear();
								group.skinMat.color.convertSRGBToLinear();
								if(i < 4) {
									group.jerseyMat.color.setHex(0xfafafa);
									group.dashCol.setHex(0xfafafa);
								}
								else {
									group.jerseyMat.color.setHex(0xffc743);
									group.dashCol.setHex(0xffc743);
								}
								group.dx = 0.0;
								group.dz = 0.0;
								group.spd = 0.0;
								gl.chars3d.push(group);

								scene.add(group);
							}
							for(var i = 0; i < 2; i++) {
								var a = goalkeeperCache[i];
								a.position.set(gl.game.goalkeepers[i].xy.x, 0, gl.game.goalkeepers[i].xy.y);
								gl.chars3d.push(a);
								scene.add(a);
							}

							if(gl.player.spectating) {
								gl.game.spectators.push(gl.player);
								gl.canvas.setFlipCanvas(false);
							}
							else if(gl.player.team1) {
								gl.game.playersA.push(gl.player);
								gl.canvas.setFlipCanvas(false);
							}
							else {
								gl.game.playersB.push(gl.player);	
								gl.canvas.setFlipCanvas(true);
							}
							if(g.arr == null) {
								g.arr = gl.playerData.filter((a)=>{ return a != null && a.gid === g.id; }).sort((a,b)=>a.getTeamOrder()-b.getTeamOrder());
							}	
							var arr2 = new Array(8);
							var nameArr = new Array(8).fill("");								
							for(var i = 0; i < g.arr.length; i++) {
								var _pp = g.arr[i];
								gl.game.chars[_pp.getTeamOrder()].playerId = _pp.id;
								nameArr[_pp.getTeamOrder()] = _pp.username;
								arr2[_pp.getTeamOrder()] = _pp;
								_pp.order = _pp.order&(~64);
							}
							g.arr2 = arr2;
							camZ = 200;
							camera.position.set(0, camZ, 0);
							setPlayerNames(nameArr);
							scaleTextQuads(camZ);
							CAM_LAST_SCALE_QUADS = camZ;
							
							document.getElementById("stable13").innerHTML = _stablePos(arr2,0); 
							document.getElementById("stable23").innerHTML = _stablePos(arr2,4); 

							gl.setScore(0,0);	
							gl.setTime(g.getMinutes()*60);
							
							init3();
							updatePlayerChars = true;
						}
					}
					break;
				case A.MSG_GAME_NAMES: 
					
					break;
				case A.MSG_SPECTATORS_FULL:
					console.log("Currently the game is full.");
					//log("msg", "Currently the game is full.");
					break;
				case A.MSG_GAME_RESULTS:
					var arrLen1 = buf.getByte();
					var gid1 = buf.getChar();
					var goalsO1 = buf.getByte();
					var goalsK1 = buf.getByte();
					var resultsArr = { goalsO: goalsO1, goalsK: goalsK1, gid: gid1, players:{}, stats:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
					for(var i = 0; i < arrLen1; i++) {
						var res1 = {data:[], exp:[]};
						res1.gp1 = buf.getChar();
						res1.username = buf.getByteString();
						res1.pts = buf.getByte()-100;
						res1.rating = buf.getByte()-100;
						res1.flags = buf.getByte();
						var res1DataLen = buf.getByte();
						//console.log(" " + res1.gp1 + " " + res1.username + " " + res1.pts + " " + res1.rating);
						//console.log(" len " + res1DataLen);
						for(var k = 0; k < res1DataLen; k++) {
							res1.data.push(buf.getByte());
						}
						for(var k = 0; k < res1DataLen; k++) {
							res1.exp.push(buf.getByte());
						}
						resultsArr.players[res1.username] = res1;
					}
					for(var i = 0; i < 16; i++) {
						resultsArr.stats[i] = buf.getByte();
					}
					
					var p = gl.playerDataHere();
					if(p !== null && p.gid !== -1 && p.gid === gid1) {
						var g = gl.getGame(p.gid);
						if(g !== null) {
							if(_gameResultsCallback !== null) _gameResultsCallback();
							g.setState(B.GAME_OPTION_STATE_ENDED);
							gl.setGameState(false);
							if(CHAT_VISIBLE) toggleChat();
							if(g.gameType === 3) g.seletime = glnow();
							//pauseLoop();
							gl.resultStats = resultsArr;
							updateLobby = true;
						}
					}
					break;
				case A.MSG_SYNC_START:
					TIME_PRECISION = 10000;
					var bufS = _tmp();
					bufS.putByte(A.MSG_CLIENT_SYNC_REPLY);
					bufS.putLong(Date.now());
					gl.player.chan.send(bufS.flip());
					break;
				case A.MSG_SYNC_REPLY:
					var num = buf.getByte();
					var cTime = buf.getLong();
					var sTime = buf.getLong();
					var cTime2 = Date.now();
					var rtt = cTime2-cTime;
					//console.log("sync " + cTime + " " + sTime + ", rtt " + rtt );
					//if(rtt < 0) { console.log("rtt less than 0"); }
					var csGuess = rtt*0.5;
					var offset = sTime-(cTime+csGuess);
					if(rtt < TIME_PRECISION) {
						TIME_OFFSET = offset;
						TIME_PRECISION = rtt;
						//console.log(" time update " + offset + " prec " + rtt );
					}
					//console.log(" time offset " + offset + " prec " + rtt );
					if(num < 10) {
						setTimeout(function(){
							var bufS = _tmp();
							bufS.putByte(A.MSG_CLIENT_SYNC_REPLY);
							bufS.putLong(Date.now());
							gl.player.chan.send(bufS.flip());
						}, 100);
					}
					break;
				case A.MSG_PING:
					setTimeout(function(){
						var bufS = _tmp();
						bufS.putByte(A.MSG_PING);
						gl.player.chan.send(bufS.flip());
					}, 100);
					break;
				case MSG_GAME_TIME:
					//console.log("game time");
					gl.game.setGameTime(buf);
					break;
				case MSG_CHAR_DATA_CACHED:
					gl.game.setCharDataCached(buf);
					updatePlayerChars = true;
					break;
				case MSG_CHAR_DATA:
					gl.game.setChar(buf);
					break;
				case MSG_CHAR_TCK:
					gl.game.setTck(buf);
					break;
				case A.MSG_CHAR_DASH:
					gl.game.setDash(buf);
					break;
				case A.MSG_CHAR_HEAD:
					gl.game.setHead(buf);
					break;
				case A.MSG_CHAR_PASS_START:
				case A.MSG_CHAR_VOLLEY_START:
					gl.game.setPass(buf, type);
					break;
				case A.MSG_BALL:
					var prevBallId = gl.game.ball.charId;
					gl.game.ball.fromBuf(buf);
					if(gl.game.ball.goal) {
						gl.setScore(gl.game.ball.goalsO, gl.game.ball.goalsK);
					}
					if(prevBallId !== gl.game.ball.charId && prevBallId !== -1 && prevBallId < 8) {
						gl.game.chars[prevBallId].passStart = 0;
					}
					break;
				case A.MSG_SET_CHAR:
					var glCharIdOld = gl.getCharId();
					gl.game.setPlayerCharId(buf);
					updatePlayerChars = true;
					var glCharIdNew = gl.getCharId();
					if(glCharIdNew !== -1 && glCharIdOld !== glCharIdNew && gl.game !== null) {
						gl.setDrillsLog(gl.game.chars[glCharIdNew].stats.drills);
					}
					break;
				case A.MSG_GOALKEEPER_DATA:
					gl.game.setGoalkeeper(buf);
					break;
				case MSG_GET_ALL_CHAR:
					gl.game.setAllChars(buf);
					break;
				case MSG_PLAYER_DATA:
					gl.player.fromBuf(buf);
					break;
				case A.MSG_DEBUG_POS:
					gl.canvas.debugPos.x = decompX(buf.getChar());
					gl.canvas.debugPos.y = decompY(buf.getChar());
					break;
				case B.MSG_PLAYER_DATA:
					var g = new PlayerData();
					g.fromBuf(buf);
					gl.playerData[g.id] = g;
					if(gl.isGameState()) {
						updatePlayerNames = true;
						updatePlayerChars = true;
					}
					else updateLobby = true;
					break;
				case B.MSG_PLAYER_LEFT_ARR:
					var len = buf.getChar();
					for(var k = 0; k < len; k++) {
						var id = buf.getChar();
						gl.playerData[id] = null;
					}
					updateLobby = true;
					break;
				case B.MSG_PLAYER_DATA_ARR:
					gl.playerData.fill(null);
					PlayerData.fromBufArrFill(buf, gl.playerData);
					updateLobby = true; //updateRTable();
					break;
				case B.MSG_GAME_DATA:
					var gid = buf.peekChar();
					var g = gl.getGame(gid);
					if(g === null) {
						g = new GameData();
						g.fromBuf(buf);
						gl.gameData.push(g);
					}
					else {
						g.fromBuf(buf);
					}
					switch(g.getState()) {
						case B.GAME_OPTION_STATE_TEAM_SEL:
						case B.GAME_OPTION_STATE_POS_SEL:
						case B.GAME_OPTION_STATE_PLAYER_SEL:
							g.seletime = glnow();
							break;
						case B.GAME_OPTION_STATE_ENDED:
							//console.log("GAME_OPTION_STATE_ENDED ... ");
							updateLobby = true;
							break;
					}
					//gl.gameData[g.id] = g;
					if(gl.isGameState()) {
						
					}
					else updateLobby = true;
					break;
				case B.MSG_GAME_DATA_ARR:
					gl.gameData = GameData.fromBufArr(buf);
					updateLobby = true; //updateGTable();
					break;
				case B.MSG_GAME_DATA_POS:
					var gPosId = buf.getChar();
					var gPosO = buf.getByte();
					var gPosK = buf.getByte();
					var p = gl.playerDataHere();
					if(p !== null && p.gid !== -1) {
						var g = gl.getGame(p.gid);
						if(g !== null && g.id === gPosId) {
							g.posO = gPosO;
							g.posK = gPosK;
							updateLobby = true;
							//console.log("update pos " + gPosO + " " + gPosK);
						}
					}
					break;
				case B.MSG_PLAYER_CHARS:
					var playerChars = CharData.fromBufArr(buf);
					var gLen = buf.getByte();
					for(var k = 0; k < gLen; k++) {
						gl.gifts[k] = buf.getByte();
					}
					var p = gl.playerDataHere();
					if(p !== null) {
						p.chars = playerChars;
						gl.playerChars = playerChars;
					}
					break;
				case B.MSG_GAME_CHARS:
					var gameChars = CharData.fromBufArr(buf);
					var p = gl.playerDataHere();
					if(p !== null && p.gid !== -1) { 
						var g = gl.getGame(p.gid);
						if(g !== null) {  
							g.chars = gameChars;
							updateLobby = true;
						}
					}
					break;
				case B.MSG_WELCOME:
					var welcomeMsg = buf.getChar();
					if(welcomeMsg === 65535) {
						
					}
					else { 
						gl.player.id = welcomeMsg;
						gl.player.ti = buf.getLong();
						var msgByte = buf.getByte();
						gl.isWelcome = (msgByte&1) === 0;
						document.getElementById("playrated").hidden = ((msgByte&2) === 0);
						for(var i = 0; i < A.SETTINGS_LENGTH; i++) {
							gl.settings[i] = buf.getByte();
						}
						setSettings(gl.settings);
						initT();
					}
					break;
				case B.MSG_CLIENT_SANDBOX:
					teTutorialMsg(buf.getByte());
					break;
				case A.MSG_SETTINGS:
				
					break;
				case A.MSG_DEBUG_SET_VARS:
					console.log("read vars");
					A.varsFromBuf(buf);
					break;
				case A.MSG_DEBUG_SKIPPED_FRAME:
					var skippedFrames = buf.getChar();
					console.log("skipped frames " + skippedFrames);
					break;
				default:
					buf.pos = buf.limit;
					console.log("Unknown message " + type);
					break;
			}
		}
	}
	if(updateLobby) {
		if(gl.doRematch !== -1) {
			var t = gl.doRematch;
			gl.doRematch = -1;
			if(t === 0) {
				gl.sandbox(0);
			}
			else {
				gl.newGame3();
			}
		}
		gl.refreshGameData();
		updateRTable();
		updateGTable();
	}
	if(updatePlayerNames) {
		var p = gl.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = gl.getGame(p.gid);
			if(g !== null) {
				var arr2 = new Array(8);
				var gArr = gl.playerData.filter((a)=>{ return a != null && a.gid === g.id; });
				var nameArr = new Array(8).fill("");
				
				for(var i = 0; i < gArr.length; i++) {
					var _pp = gArr[i];
					nameArr[_pp.getTeamOrder()] = _pp.username;
					arr2[_pp.getTeamOrder()] = _pp;
					_pp.order = _pp.order&(~64);
				}
				
				setPlayerNames(nameArr);
				document.getElementById("stable13").innerHTML = _stablePos(arr2,0); 
				document.getElementById("stable23").innerHTML = _stablePos(arr2,4); 
			}
		}
		gl.refreshGameData();
	}
	if(updatePlayerChars) {
		for(var i = 0; i < 8; i++) {
			var quad = TEXT_QUADS[i];
			if(quad.parent !== null) {
				quad.parent.remove(quad);					
			}
		}
		for(var i = 0; i < 8; i++) {
			var pId = gl.game.chars[i].playerId;
			if(pId !== -1) {
				var p = gl.getPlayerData(pId);
				if(p !== null) {
					var teamPos = p.getTeamOrder();
					if(teamPos >= 0 && teamPos < 8) {
						gl.chars3d[i].add(TEXT_QUADS[teamPos]);
					}
				}
			}
		}
		gl.setDrillsLog(null);
		var glCharIdLog = gl.getCharId();
		if(glCharIdLog !== -1) {
			gl.setDrillsLog(gl.game.chars[glCharIdLog].stats.drills);
		}
		//gl.game.gameData
		/*var p = gl.playerDataHere();
		if(p !== null && p.gid !== -1) {
			var g = gl.getGame(p.gid);
			if(g !== null) {

			}
		}*/
	}
}
function init2(onError) {
	//var HOST = "ws://" + "127.0.0.1" + ":" + 5000";
	var HOST = "wss://mirafungames.com/wslobbygame";
	if(gl.player !== null) { 
		if(ssGUEST !== null) HOST += "?a="+gl.player.ti + "&g="+ssGUEST;
		else HOST += "?a="+gl.player.ti;
	}
	else if(ssGUEST !== null) HOST += "?g="+ssGUEST;
	//console.log("connecting " + HOST);
	var chan0 = new WebSocket(HOST, ((gl.player === null)?"lobby":"lobby2"));
	chan0.binaryType = "arraybuffer";

	if(gl.player === null) gl.player = new Player(chan0, -1, "unknown");
	else gl.player.chan = chan0;
	//gl.game.playersA.push(gl.player);
	chan0.onopen = function() {
		//init3();
    };	
    //var handleMsg = init2HandleMsg;
	chan0.onmessage = function(msg) {
		if(msg.data instanceof ArrayBuffer) { 
			var buf = wrap(msg.data);	
			init2HandleMsg(buf);
		}
		else if(msg.data instanceof Blob) { 
			console.log("bytes");
		  //processBlob(msg.data);
			//reader.readAsArrayBuffer();
	    } else {
			console.log("text");
	    }
	};
	chan0.onclose = function(event) { reClose(event); };
	chan0.onerror = function(event) {
	  	//onError(event);
	  	console.log("error 2");
	  	console.log(event);
	};	
}
function init3() {
	
}
function smoothMovement(x0, y0, yt, t, k, xytDist) {
    /*Vector3 f = x0 - y0 + (yt - y0) / (k * t);
    return yt - (yt - y0) / (k*t) + f * Math.exp(-k*t);*/
	var kt = Math.max(k*t,0.00001);
	var ktInv = 1.0/kt;
	var e = Math.exp(-kt);
	var fx = x0.x - y0.x + (yt.x - y0.x) * ktInv;
	var fz = x0.z - y0.z + (yt.z - y0.z) * ktInv;

	var xx = yt.x - (yt.x - y0.x) * ktInv + fx * e;
	var zz = yt.z - (yt.z - y0.z) * ktInv + fz * e;

	var d = Math.sqrt(distSq2Diff(xx-x0.x,zz-x0.z));
	var spd = d/t;

	if(spd > 0.0 && spd < CAM_FOLLOW_SPD) {
		var d2 = CAM_FOLLOW_SPD*t;
		if(xytDist <= d2) {
			x0.x = yt.x;
			x0.z = yt.z;
			//d2 = d2/xytDist;
			//x0.x += (yt.x-x0.x)*d2;
			//x0.z += (yt.z-x0.z)*d2;
		}
		else {
			d2 = d2/d;	
			x0.x += (xx-x0.x)*d2;
			x0.z += (zz-x0.z)*d2;
		}
	}
	else {
		x0.x = xx;
		x0.z = zz;
	}
	//x0.x = x0.x + (yt.x - y0.x)*e - ((yt.x - y0.x) + ((yt.x - y0.x)) * e) * ktInv;
	//x0.z = x0.z + (yt.z - y0.z)*e - ((yt.z - y0.z) + ((yt.z - y0.z)) * e) * ktInv;
}
var CAM_CONST_A = 0.5*Math.tan(15.0*DEG_TO_RAD);
var CAM_CLAMP_X = 40.0;
var CAM_CLAMP_Z = 60.0;
var CAM_FOLLOW_SPD = 25.0;
var CAM_FOLLOW_EXP = 2.5;
var TMP_VEC2_CAM = new vec2(0.0,0.0);
var TMP_VEC_ANIMATE = new THREE.Vector3(0.0,0.0,0.0);
var TMP_VEC_ANIMATE2 = new THREE.Vector3(0.0,0.0,0.0);
var camXOffset = 0.0;
var camZOffset = 0.0;
var camHalfW = 0.0;
var camHalfH = 0.0;
var CAM_LAST_ANIM = 0;
var CAM_ZOOM_ON_BALL = false;
var CAM_LAST_SCALE_QUADS = 0;

function cameraFunction1(tpf) {
	var id = gl.getCharId();
	if(id !== -1) {
		var ch = gl.chars3d[id];
		var tmpPos = ch.position;				
		//TMP_VEC_ANIMATE.set(tmpPos.x+Math.sign(ch.dx)*4.0, tmpPos.y, tmpPos.z+Math.sign(ch.dz)*5.0);
		//TMP_VEC_ANIMATE.set(tmpPos.x+ch.dx*5.0, tmpPos.y, tmpPos.z+ch.dz*5.0);
		TMP_VEC_ANIMATE.set(tmpPos.x, tmpPos.y, tmpPos.z);
		TMP_VEC_ANIMATE2.set(TMP_VEC_ANIMATE.x-ch.dx*ch.spd*tpf, TMP_VEC_ANIMATE.y, TMP_VEC_ANIMATE.z-ch.dz*ch.spd*tpf);
		
		if(gl.canvas.flipCanvas) {
			TMP_VEC_ANIMATE.x = -TMP_VEC_ANIMATE.x;
			TMP_VEC_ANIMATE.z = -TMP_VEC_ANIMATE.z;

			TMP_VEC_ANIMATE2.x = -TMP_VEC_ANIMATE2.x;
			TMP_VEC_ANIMATE2.z = -TMP_VEC_ANIMATE2.z;
		}
		var pz0 = TMP_VEC_ANIMATE.z;
		var camZ0 = camera.position.y;
		
		camHalfH = camZ*CAM_CONST_A;
		camHalfW = camHalfH*gl.canvas.canvas.width/gl.canvas.canvas.height;
		
		if(camHalfW < 30.0) {
			if(TMP_VEC_ANIMATE.x-camHalfW < -CAM_CLAMP_X) {
				if(TMP_VEC_ANIMATE.x+camHalfW > CAM_CLAMP_X) { camXOffset = 0.0; }
				else {
					camXOffset = -CAM_CLAMP_X-(TMP_VEC_ANIMATE.x-camHalfW);   
				}
			}
			else if(TMP_VEC_ANIMATE.x+camHalfW > CAM_CLAMP_X) {
				camXOffset = CAM_CLAMP_X-(TMP_VEC_ANIMATE.x+camHalfW);   
			}
		}
		else {
			camXOffset = 0.0;
		}

		camZOffset = -camHalfH * 0.3;	
		var camHalfHOffset = camHalfH+camZOffset;
		var camHalfHOffset2 = camHalfH-camZOffset;
		
		if(TMP_VEC_ANIMATE.z-camHalfHOffset2 < -CAM_CLAMP_Z) {
			camZOffset = -((TMP_VEC_ANIMATE.z-camHalfH)+CAM_CLAMP_Z);   
		}
		else if(TMP_VEC_ANIMATE.z+camHalfHOffset > CAM_CLAMP_Z) {
			camZOffset = -((TMP_VEC_ANIMATE.z+camHalfH)-CAM_CLAMP_Z);   
		}
		
		TMP_VEC_ANIMATE.x += camXOffset;
		TMP_VEC_ANIMATE.z += camZOffset;
		TMP_VEC_ANIMATE2.x += camXOffset;
		TMP_VEC_ANIMATE2.z += camZOffset;

		var camZoom = camZ;

		var distBX = Math.abs(gl.game.ball.xyI.x-TMP_VEC_ANIMATE.x);
		var distBZ = (gl.canvas.flipCanvas?-gl.game.ball.xyI.y:gl.game.ball.xyI.y)-TMP_VEC_ANIMATE.z;

		//distBZ += camZOffset*0.5;
		
		camHalfHOffset = camHalfH;
		distBZ = Math.abs(distBZ);

		if(CAM_ZOOM_ON_BALL) {
			camZoom = (distBZ+2.5)/CAM_CONST_A;
			if(camZoom+5.0 < camZ || distBZ+5.0 < camHalfHOffset) {
				CAM_ZOOM_ON_BALL = false;
				//camZoom = camZ;
			}
			else {
				/*if(camZoom < camZ0) {
					var _camHalfH = camZoom*CAM_CONST_A;
					var _camZOffset = 0.0;//-_camHalfH * 0.3;	
					var _camHalfHOffset = _camHalfH+_camZOffset;
					var _camHalfHOffset2 = _camHalfH-_camZOffset;
	
					if(pz0-_camHalfHOffset < -CAM_CLAMP_Z) {
						_camZOffset = -((pz0-_camHalfH)+CAM_CLAMP_Z);   
					}
					else if(pz0+_camHalfHOffset > CAM_CLAMP_Z) {
						_camZOffset = -((pz0+_camHalfH)-CAM_CLAMP_Z);   
					}

					var _distBZ = Math.abs(gl.game.ball.xyI.y-(pz0+_camZOffset));
					var _camZoom = (_distBZ+2.5)/CAM_CONST_A;

					if(_camZoom > camZoom) {
						camZoom = camZ0;
					}
					else {
						camZoom += 5.0;
					}
				}
				else {
					camZoom += 5.0;
				}*/
			}
		}
		else {
			var camZoom0 = (distBZ+2.5)/CAM_CONST_A;
			//if(distBZ > camHalfHOffset) {
			if(camZoom0 > camZ0) {
				CAM_ZOOM_ON_BALL = true;
				//camZoom = camZoom0;
				//camZoom = (distBZ+2.5)/CAM_CONST_A; //+2.5
			}
		}
		
		var distX = TMP_VEC_ANIMATE.x-camera.position.x;
		var distZ = TMP_VEC_ANIMATE.z-camera.position.z;

		TMP_VEC2_CAM.set2(distX, distZ);

		/*if(distX !== 0.0) {
			var maxDist = Math.exp(CAM_FOLLOW_EXP*Math.abs(distX))*CAM_FOLLOW_SPD*tpf;
			if(maxDist >= Math.abs(distX)) {
				camera.position.x = TMP_VEC_ANIMATE.x;
			}
			else {
				camera.position.x = camera.position.x+Math.sign(distX)*maxDist;
			}
		}
		if(distZ !== 0.0) {
			var maxDist = Math.exp(CAM_FOLLOW_EXP*Math.abs(distZ))*CAM_FOLLOW_SPD*tpf;
			if(maxDist >= Math.abs(distZ)) {
				camera.position.z = TMP_VEC_ANIMATE.z;
			}
			else {
				camera.position.z = camera.position.z+Math.sign(distZ)*maxDist;
			}
		}*/
		var dist = TMP_VEC2_CAM.lengthSquared();
		if(dist > 0.0 && tpf > 0.0) {
			dist = Math.sqrt(dist);
			//var maxDist = Math.exp(CAM_FOLLOW_EXP*dist)*CAM_FOLLOW_SPD*tpf;
			/*if(maxDist >= dist) {
				camera.position.set(TMP_VEC_ANIMATE.x, TMP_VEC_ANIMATE.y, TMP_VEC_ANIMATE.z);
			}
			else {				
				TMP_VEC2_CAM.multLocal1(maxDist/dist);
				camera.position.set(camera.position.x+TMP_VEC2_CAM.x, TMP_VEC_ANIMATE.y, camera.position.z+TMP_VEC2_CAM.y);
			}*/
			var e = CAM_FOLLOW_EXP;
			/*if(dist < 100.0) {
				//dist = 100.0-dist;
				e += 5.0*Math.exp(-0.1*dist);
				console.log(e);
			}*/
			//smoothMovement(camera.position, TMP_VEC_ANIMATE2, TMP_VEC_ANIMATE, tpf, e, dist);
			if(dist > 1.0) {
				smoothMovement(camera.position, TMP_VEC_ANIMATE2, TMP_VEC_ANIMATE, tpf, e, dist);
				//smoothMovement(camera.position, TMP_VEC_ANIMATE2, TMP_VEC_ANIMATE, tpf, CAM_FOLLOW_EXP);
			}
			else {
				//smoothMovement(camera.position, TMP_VEC_ANIMATE2, TMP_VEC_ANIMATE, tpf, CAM_FOLLOW_EXP);
				camera.position.set(TMP_VEC_ANIMATE.x, TMP_VEC_ANIMATE.y, TMP_VEC_ANIMATE.z);
			}
			
		}
		/*if(dist < 3.0) {
			camera.position.set(TMP_VEC_ANIMATE.x, TMP_VEC_ANIMATE.y, TMP_VEC_ANIMATE.z);
			//camera.position.lerp(TMP_VEC_ANIMATE, CAM_FOLLOW_SPD*tpf);
		}
		else { camera.position.lerp(TMP_VEC_ANIMATE, CAM_FOLLOW_SPD*tpf); }*/

		var camZDiff = Math.abs(camZoom-camZ0);
		var camZDist = 20.0*CAM_ZOOM_SPD*tpf;
		if(camZoom > camZ0) {
			camZoom = clamp(camZ0+camZDist, CAM_ZMIN, camZoom);
		}
		else {
			camZoom = clamp(camZ0-camZDist, camZoom, CAM_ZMAX);
		}
		camera.position.y = clamp(camZoom, CAM_ZMIN, CAM_ZMAX);
		if(Math.abs(CAM_LAST_SCALE_QUADS-camera.position.y) > 7.0) {
			CAM_LAST_SCALE_QUADS = camera.position.y;
			scaleTextQuads(camera.position.y);
		}	
	}
	else {
		/*var dist = TMP_VEC2_CAM.lengthSquared();
		if(dist > 1.0) {
			smoothMovement(camera.position, TMP_VEC_ANIMATE2, TMP_VEC_ANIMATE, tpf, e, dist);
		}
		else {
			camera.position.set(TMP_VEC_ANIMATE.x, TMP_VEC_ANIMATE.y, TMP_VEC_ANIMATE.z);
		}*/
		var ballX = gl.game.ball.xyI.x;
		var ballY = gl.canvas.flipCanvas?-gl.game.ball.xyI.y:gl.game.ball.xyI.y;

		TMP_VEC_ANIMATE.set(ballX, camera.position.y, ballY);
		camera.position.lerp(TMP_VEC_ANIMATE, 20*tpf);
		
		camera.position.y = clamp(camZ, CAM_ZMIN, CAM_ZMAX);
		if(Math.abs(CAM_LAST_SCALE_QUADS-camera.position.y) > 7.0) {
			CAM_LAST_SCALE_QUADS = camera.position.y;
			scaleTextQuads(camera.position.y);
		}	
	}
}

function lin3(a,b,x,y,z) {
	a.x += (b.x-a.x)*x;
	a.y += (b.y-a.y)*y;
	a.z += (b.z-a.z)*z;
	return this;
}
var CAM_PAUSE_DEF = 0.75;
var CAM_FOLLOW_SPD2 = 3.0;
var CAM_X = 5.5, CAM_X2 = 1.0;
var CAM_X_ON = true;
var CAM_Y_OFFSET = 3.0;
var CAM_PAUSE = 0.0;
function cameraFunction2(tpf) {
	if(CAM_PAUSE > 0.0) {
		if(CAM_PAUSE < tpf) {
			tpf -= CAM_PAUSE;
			CAM_PAUSE = 0.0;
		}
		else {
			CAM_PAUSE -= tpf;
			return;
		}
	}
	var id = gl.getCharId();
	if(id !== -1) {
		var ch = gl.chars3d[id];
		var tmpPos = ch.position;				
		TMP_VEC_ANIMATE.set(tmpPos.x, tmpPos.y, tmpPos.z);
		//TMP_VEC_ANIMATE.z -= CAM_Y_OFFSET;
		
		if(gl.canvas.flipCanvas) {
			TMP_VEC_ANIMATE.x = -TMP_VEC_ANIMATE.x;
			TMP_VEC_ANIMATE.z = -CAM_Y_OFFSET-TMP_VEC_ANIMATE.z;
		}	
		else {
			TMP_VEC_ANIMATE.z -= CAM_Y_OFFSET;
		}
		
		if(gl.game.ball.isGoal() && (gl.game.ball.gameStep-gl.game.ball.goalStep) < 20) {
			TMP_VEC_ANIMATE.y = clamp(camZ, CAM_ZMIN, CAM_ZMAX);
		}
		else {
			var distBZ = (gl.canvas.flipCanvas?Math.max(-gl.game.ball.xyI.y,RECT_T+2.5):Math.min(gl.game.ball.xyI.y,RECT_B-2.5))-TMP_VEC_ANIMATE.z;
			distBZ = Math.abs(distBZ);
			if(gl.game.ball.isGoal()) {
				distBZ = Math.min(distBZ, Math.abs(TMP_VEC_ANIMATE.z));
			}
			
			var camZoom0 = (distBZ+2.5)/CAM_CONST_A;
			var camZ0 = clamp(Math.max(camZoom0, camZ), CAM_ZMIN, CAM_ZMAX);
			TMP_VEC_ANIMATE.y = camZ0;
		}
		
		var xDiff = Math.abs(camera.position.x-TMP_VEC_ANIMATE.x);
		if(CAM_X_ON) {
			if(xDiff < CAM_X2) { CAM_X_ON = false; }
		}
		else {
			if(xDiff < CAM_X) { TMP_VEC_ANIMATE.x = camera.position.x; }
			else { CAM_X_ON = true; }
		}
		
		//camera.position.lerp(TMP_VEC_ANIMATE, Math.min(CAM_FOLLOW_SPD2*tpf, 1.0));
		var lT = Math.min(CAM_FOLLOW_SPD2*tpf, 1.0);
		lin3(camera.position, TMP_VEC_ANIMATE, lT*0.5, lT, lT);
		
		/*var pz0 = TMP_VEC_ANIMATE.z;
		var camZ0 = camera.position.y;*/
		
		/*var camZDiff = Math.abs(camZoom-camZ0);
		var camZDist = 20.0*CAM_ZOOM_SPD*tpf;
		if(camZoom > camZ0) {
			camZoom = clamp(camZ0+camZDist, CAM_ZMIN, camZoom);
		}
		else {
			camZoom = clamp(camZ0-camZDist, camZoom, CAM_ZMAX);
		}*/
		//camera.position.y = clamp(camZoom, CAM_ZMIN, CAM_ZMAX);
		
		
		if(Math.abs(CAM_LAST_SCALE_QUADS-camera.position.y) > 7.0) {
			CAM_LAST_SCALE_QUADS = camera.position.y;
			scaleTextQuads(camera.position.y);
		}	
	}
	else {
		/*var dist = TMP_VEC2_CAM.lengthSquared();
		if(dist > 1.0) {
			smoothMovement(camera.position, TMP_VEC_ANIMATE2, TMP_VEC_ANIMATE, tpf, e, dist);
		}
		else {
			camera.position.set(TMP_VEC_ANIMATE.x, TMP_VEC_ANIMATE.y, TMP_VEC_ANIMATE.z);
		}*/
		var ballX = gl.game.ball.xyI.x;
		var ballY = gl.canvas.flipCanvas?-gl.game.ball.xyI.y:gl.game.ball.xyI.y;

		TMP_VEC_ANIMATE.set(ballX, camera.position.y, ballY);
		camera.position.lerp(TMP_VEC_ANIMATE, CAM_FOLLOW_SPD2*tpf);
		
		camera.position.y = clamp(camZ, CAM_ZMIN, CAM_ZMAX);
		if(Math.abs(CAM_LAST_SCALE_QUADS-camera.position.y) > 7.0) {
			CAM_LAST_SCALE_QUADS = camera.position.y;
			scaleTextQuads(camera.position.y);
		}	
	}
}
function animate(tpf) {
	/*var tpf;
	var animTime = Date.now();
	var diff = animTime-CAM_LAST_ANIM;
	if(diff < 1000) { tpf = diff*0.001; }
	else { tpf = RENDER_MS*0.001; }
	CAM_LAST_ANIM = animTime;*/

	//mesh.rotation.x += 0.01;
	//mesh.rotation.y += 0.02;

	/*if(controls != null) controls.update();
	else {
		cameraFunction2(tpf);
	}*/

	for(var i = 0; i < scene.children.length; i++) {
		var a = scene.children[i];
		if("anim" in a) {
			a.anim.update(tpf);
		}
	}
	if(scene0.visible) {
		renderer.render( scene0, camera );
	}
	//composer.render();
	if(STATS_VISIBLE) { stats.update(); }
	/*setTimeout( function() {
	    requestAnimationFrame( animate );
	}, 1000 / 10 );*/
}

//var CLIENT_MS = 0;
//var SERVER_MS = 0;

var RENDER_MS = 50;
var renderTime = 0;
var lastUpdate;
var lastMovement = Movement.NONE;
var quickSend = 0;
var quickSend2 = null;

function quickUpdate() {
	if(quickSend2 != null) return; 
	var now = Date.now();
	var elUpdate = now-quickSend;
	if(elUpdate >= 20) {
		quickSend = now;
		updateInput();
	}
	else {
		quickSend2 = true;
		//quickSend2 = setTimeout(updateInput, 10-elUpdate);
	}
}
function updateInput() {
	quickSend2 = null;
	var chan = gl.player.chan;
	var canvas = gl.canvas;
	if(chan !== null && chan.readyState == 1 && chan.bufferedAmount < 4096) {
		var buf = _tmp();

		if(canvas.switchChar !== -1) {
			buf.putByte(A.MSG_CLIENT_SET_CHAR);
			buf.putByte(canvas.switchChar);
			canvas.switchChar = -1;
		}

		if(canvas.doPass !== 0) {
			buf.putByte(canvas.doPass);
			canvas.doPass = 0;
		}

		if(canvas.endPass !== 0) {
			buf.putByte(canvas.endPass);
			buf.putByte(canvas.passPow);
			buf.putChar(gl.game.gameStep);
			buf.putChar(compX(canvas.passA.x*0.5));
			buf.putChar(compY(canvas.passA.y*0.5));
			//buf.putChar(compA(canvas.passA));
			canvas.endPass = 0;
		}

		if(lastMovement.id !== canvas.movement.id) {
			lastMovement = canvas.movement;
			Movement.toBuf(lastMovement, buf);
		}

		if(canvas.dash) {
			canvas.dash = false;
			buf.putByte(A.MSG_CLIENT_DASH);
		}

		if(canvas.doTackle) {
			canvas.doTackle = false;
			Movement.toBufTackle(canvas.tackleA, buf);
			/*if(canvas.movement.id === Movement.NONE.id) {
				Movement.toBufTackle(canvas.tackleA, buf);
			}
			else {
				Movement.toBufTackle(canvas.movement.ra, buf);
			}*/
		}
		if(canvas.doJump) {
			canvas.doJump = false;
			Movement.toBufJump(canvas.tackleA, buf);
		}

		if(buf.pos > 0) {
			var data = buf.flip();
			//if(CLIENT_MS > 0) {
			//	setTimeout(function(){chan.send(data);}, CLIENT_MS);
			//}
			//else { 
			//	console.log("send " + chan.bufferedAmount + " " + Date.now());
				chan.send(data);
			//}
			return true;
		}
	}
	else {
		console.log("cannot send " + chan.readyState + " " + chan.bufferedAmount);
	}
	return false;
}
var GAME_FPS = 1000.0/30.0;
var I_FPS = 1000.0/25.0;
var fpsCount = 0;
var fpsEl = 0;
var fpsEl2 = 0;
function updateLoop() {
	if(loop !== null) loopAnim = requestAnimationFrame(updateLoop);
	if(stats0 !== null) stats0.update();
	
	var now = glnow();
	var elUpdate = now-lastUpdate;
	lastUpdate = now;
	if(elUpdate < 0) {
		console.log("time < 0");
		return;
	}
	//----------------------
	
	if(!gl.game.started) return;
	
	var el = now-gl.game.startTime;
	if(el < 0.0) {
		console.log("el < 0");
		return;
	}
	var step = el*TICK_MS_INV;
	//log("step", step);

	gl.game.gameStep = clamp(toInt(step), 0, 65535);
	
	fpsEl2 += elUpdate;
	if(fpsEl2 >= I_FPS) { 
		fpsEl2 = fpsEl2 % I_FPS;
		updateLoop2();
	}
	
	fpsEl += elUpdate;
	if(fpsEl < GAME_FPS) { return; }
	fpsEl = fpsEl % GAME_FPS; //fpsEl-GAME_FPS;
	
	gl.setTime(gl.game.gameData.getMinutes()*60-gl.game.gameStep*0.1); 
	
	//var updateStepEl = step-gl.canvas.lastUpdateStep;
	//log("fps", (10.0/updateStepEl).toFixed(1));
	//fpsCount++;
	//elUpdate

	//find out current time

	//send input
	
	//quickSend = true;
	//updateInput();
	
	//GAME_FPS
	//var tpf = GAME_FPS*0.001;
	var tpf;
	var animTime = Date.now();
	var diff = animTime-CAM_LAST_ANIM;
	if(diff < 1000) { tpf = diff*0.001; }
	else { tpf = RENDER_MS*0.001; }
	CAM_LAST_ANIM = animTime;
	//var tpf = (step-gl.canvas.lastUpdateStep)*0.1;
	
	if(controls != null) controls.update();
	else {
		cameraFunction2(tpf);
	}
	
	updateBallModelEffect(step);
	gl.canvas.testUpdate(step);


	//----------------------
	//renderTime += elUpdate;
	//if(renderTime >= RENDER_MS) {
	//	renderTime -= RENDER_MS;
	//	if(renderTime >= RENDER_MS*0.5) {
	//		console.log("Skipped render " + renderTime/RENDER_MS + " frames.");
	//		renderTime = 0;
	//	}
	//	requestAnimationFrame(animate);
	//}
	animate(tpf);
}
function updateLoop2() {
	//requestAnimationFrame(updateLoop);
	if(stats2 !== null) stats2.update();
	quickSend = true;
	updateInput();
}
function createStats(mode, num) {
	var stats = new Stats();
	stats.showPanel(mode);

	stats.dom.style.top = "";
	stats.domElement.style.position = 'fixed';
	stats.domElement.style.left = (80*num)+"px";
	stats.domElement.style.bottom = '5px';

	return stats;
}

var _reOk = true;
var _re = null;
var _reTime = 1000;
var _rePo = 0;
var _MAX_RE = 10;
function reClose(event) {
	console.log("re close ");
	if(event !== null) console.log("reason " + event.reason);
	if(event !== null && event.reason == "ti") {
		console.log("ti");
		_reOk = false;
		gl.setGameState(false);
		_display("#state-2");
	}
	else {
		startRe();
	}
}
function reStep() {
	if(!_reOk) {
		gl.setGameState(false);
		_display("#state-2");
		_re = null;
		return;
	}
	_rePo = _rePo + 1;
	_reTime = Math.min(_reTime+1000, 10000);
	console.log("reconnect " + _rePo);
	
	if(gl.player.chan == null || gl.player.chan.readyState >= 2) {
		init2(null);
	}
	else if(gl.player.text == null || gl.player.text.readyState >= 2) {
		initTChan();
	}
	
	if(gl.player.chan != null && gl.player.text != null && 
		gl.player.chan.readyState === 1 && gl.player.text.readyState === 1) {
		console.log("reconnect success ");
		_re = null;
	}
	else {
		if(_rePo >= _MAX_RE) {
			//show gui...
			gl.setGameState(false);
			_display("#state-2");
			_re = 10;
		}
		else {
			_re = setTimeout(reStep, _reTime);
		}
	}
}
function startRe() {
	if(_re !== null || gl.player === null) return;
	_rePo = 0;
	_reTime = 100;
	_re = setTimeout(reStep, 100);
}
var loop = null, loopAnim = null;
function startLoop() {
	if(loop !== null) return;
	renderTime = 0;
	gl.canvas.lastUpdateStep = 0;
	lastUpdate = glnow();
	//loop = setInterval(updateLoop2, 40);
	loop = true;
	loopAnim = requestAnimationFrame(updateLoop);
}
function pauseLoop() {
	if(loop === null) return;
	//clearInterval(loop);
	loop = null;
}
function flipCanvas() {
	gl.canvas.setFlipCanvas(!gl.canvas.flipCanvas);
}

var initDone0 = false;
function init0() {
	if(initDone0) return;
	initDone0 = true;
	
	gl.pingLog = document.getElementById("logms");
	gl.drillsLog = document.getElementById("logdrills");
	gl.scoreLog = document.getElementById("logscore");
	gl.scoreLog2 = document.getElementById("logscore2");
	gl.gGoalGui = $(document.getElementById("gGoalGui"));
	gl.logscoreO = $(document.getElementById("logscoreO"));
	gl.logscoreK = $(document.getElementById("logscoreK"));
	gl.timeLog = document.getElementById("logtime");
	gl.time4096 = document.getElementById("time4096");
	gl.time8192 = document.getElementById("time8192");
	gl.time12288 = document.getElementById("time12288");
	gl.time32768 = document.getElementById("time32768");
	// Load a glTF resource
	load(
	// resource URL
	[ 
		'assets/field1.glb',
		'assets/ball.glb',	
		'assets/shadow.glb',
		'assets/char1.glb',
		'assets/char2.glb',
		'assets/char3.glb',
		'assets/char4.glb',
		'assets/matcube.glb'
		
	],
	// called when the resource is loaded
	function ( gltf ) {
		grassField = gltf[0].scene;
		ballModel = gltf[1].scene;
		ballShadowModel = gltf[2].scene;

		charModel[0] = gltf[3].scene;
		charModel[0].anims = gltf[3].animations;

		charModel[1] = gltf[4].scene;
		charModel[1].anims = gltf[4].animations;

		charModel[2] = gltf[5].scene;
		charModel[2].anims = gltf[5].animations;

		charModel[3] = gltf[6].scene;
		charModel[3].anims = gltf[6].animations;

		matCube = gltf[7].scene.children[0];
		//gltf.animations; // Array<THREE.AnimationClip>
		//gltf.scene; // THREE.Group
		//gltf.scenes; // Array<THREE.Group>
		//gltf.cameras; // Array<THREE.Camera>
		//gltf.asset; // Object
		
		ballShadowModel.children[0].material.transparent = true;
		
		var ground = grassField.getObjectByName("Ground");
		ground.renderOrder = -90;
		ground.depthWrite = false;
		ground.material.polygonOffset = true;
		ground.material.polygonOffsetUnits = -1;
		//grassField.getObjectByName("GoalsA");

		init1();
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' + error );
	}
	);
}
function doInit0Early() {
	_doInit2AfterLoad = false;
	init0();
}
var ssSELECT = false;
var ssGUEST = null;
var ssSending = false;
function ssError(x) {
	console.log("ss error ");
	console.log(x);
	ssSELECT = false;
	document.getElementById('ssHelp').innerHTML = "Error connecting to server - maybe the server is full.";
}
function ssSelect() {
	if(ssSELECT) { return; }
	/*if(g) {
		ssGUEST = document.getElementById("gname").value;
		if(ssGUEST == null) return;
	}*/
	ssSELECT = true;
	if(_init1Loaded) {
	 	init2(null);
	}
	else {
		_doInit2AfterLoad = true;
		init0();
	}
	//init2(ssError);
}
var _ssSendDataUseXHR = false;
function ssSendData(action, help, submit, data) {
	if(ssSending) {
		return;
	}
	submit.innerHTML = "Connecting...";
	ssSending = true;
	try {
		if(_ssSendDataUseXHR) {
			const XHR = new XMLHttpRequest();
			XHR.responseType = "json";
			let urlEncodedData = "",
			  urlEncodedDataPairs = [],
			  name;

			for( name in data ) {
				urlEncodedDataPairs.push( encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
			}
			urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

			XHR.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE) {
					if(this.status === 200) {
						var response = XHR.response;
						help.innerHTML = response.success;
						if(response.success === null) {
							//window.location.replace("/");
							ssSelect();
						}
						else {
							submit.innerHTML = "Join";
						}
					}
					else {
						submit.innerHTML = "Join";
						help.innerHTML = "Error " + this.status;
					}
					ssSending = false;
				}
			}

			XHR.addEventListener('error', function(event) {
			console.log("error");
				submit.innerHTML = "Join";
				ssSending = false;
			} );

			XHR.open('POST', action, true);
			XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
			XHR.send( urlEncodedData );	
		}
		else {
			var HOST = "wss://mirafungames.com/wslobbygame";
			HOST += "?g="+data.usernameGuest;
			var chan0 = new WebSocket(HOST, "guest");
			chan0.binaryType = "arraybuffer";
			chan0.onopen = function() {};
			chan0.onmessage = function(msg) {
				if(msg.data instanceof ArrayBuffer) { 
					console.log("array buf");
				}
				else if(msg.data instanceof Blob) { 
					console.log("bytes");
				  //processBlob(msg.data);
					//reader.readAsArrayBuffer();
			
				} else {
					//text{"success":null,"isession":"cDydmV9OQJvsZmn3_gBjhQ..guest~"}
					var response = JSON.parse(msg.data);
					if(response.success === null) {
						ssGUEST = response.isession;
						ssSelect();
					}
					else {
						submit.innerHTML = "Join";
					}
				  //processText(msg.data);
				}
			};
			chan0.onclose = function(event) {
				console.log("closed T");
				ssSending = false;
			};
			chan0.onerror = function(event) {
			  	console.log("error T");
			  	submit.innerHTML = "Join";
				help.innerHTML = "Error ";
				ssSending = false;
			};	
		}
	}
	catch(e) {
		console.log(e.stack);	
	}
}
function ssLoginGuest() {
	var g = document.getElementById("gname").value;
	console.log(g);
	var gformHelp = document.getElementById('ssHelp');
	var submit = document.getElementById('gjoin');
	ssSendData('https://mirafungames.com/form/loginGuest', gformHelp, submit, {usernameGuest:g} );
}
function ssSelect2() {
	document.getElementById("join").innerHTML = "Connecting...";
	ssSelect();
}
function initS() {
	var lArr = [
		`<a href="https://www.crazygames.com/" target="_blank">CrazyGames</a>`,
		`<a href="https://iogames.space/" target="_blank">IO Games</a>`,
		`<a href="https://iogames.fun" target="_blank" title="More IO Games">Play IO Games</a>`
	];
	var oneL = null, noout = false;
	try {
		if(window.location.search) {
		
			var query = window.location.search.substr(1);
		    var pairs = query.split("&");
		    for(var i = 0; i < pairs.length; i++) {
		       var p = pairs[i].split("=");
		       if(p[0] == "l") {
		       		var l = Number.parseInt(p[1]);
		       		oneL = l;
		       }
		       else if(p[0] == "h") {
		       		noout = true;
		       		oneL = -1;
		       }
		    }
		}
	}
	catch(e) {
		console.log(e.stack);	
	}

	var text = `<div class="container text-center"><p style="color:#404040"><small>`;
	text += `Hosted on: `;
	
	if(oneL !== null) { 
		if(oneL >= 0 && oneL <= lArr.length) text += lArr[oneL];
		else text += `<a href="https://mirafungames.com/" target="_blank">MiraFun Games</a>`;
	}
	else {
		for(var i = 0; i < lArr.length; i++) {
			text += lArr[i];
			if(i+1 !== lArr.length) text += " | ";
		}
	}
	
	text += `</small></p></div>`;
	if(_isEmptyFooter) text = "";
		  
	document.getElementById("footer").innerHTML = text;
	if(noout) {
		var h = function(x) { var a = document.getElementById(x); if(a !== null) a.hidden = true; };
		h("linkr1");
		h("linkd2");
	}
	
	if(isLoggedIn()) {	
		sd("POST", "/form/ss", null, (x,e)=>{
			var data = x.response;
			//console.log(data);
			if(data.redirect) {
				//window.location.replace("/login");
				var res = `<tr>
				<td class="progressWCol">Server 1</td>
				<td class="progressWCol"><input class="form-contol" id="gname" value="guest" placeholder="enter username" type="text" minlength="3" maxlength="13" pattern="[a-zA-Z0-9]+([_\s]+[a-zA-Z0-9]+)*" style="font-size: 14px;padding: 0px;margin: 0px;width: 90%;"></td>
				<td><label class="btn btn-success joinBtn" style="" id="gjoin" onclick="ssLoginGuest();">Join</label></td>
				</tr>`;
				document.getElementById("sstable").innerHTML = res;
			}
			else {
				var res = "";
				res += `<tr>
				<td class="progressWCol">Server 1</td>
				<td class="progressWCol">${data.num}/${data.max}</td>
				<td><label class="btn btn-success joinBtn" id="join" style="" onclick="ssSelect2();">Join</label></td>
				</tr>`;
				document.getElementById("sstable").innerHTML = res;
				document.getElementById("saveProgress").hidden = !data.g;
			}	
		}, (x, e) => {
			console.log("error " + e);
		});
	}
	else {
		var res = `<tr>
		<td class="progressWCol">Server 1</td>
		<td class="progressWCol"><input class="form-contol" id="gname" value="guest" placeholder="enter username" type="text" minlength="3" maxlength="13" pattern="[a-zA-Z0-9]+([_\s]+[a-zA-Z0-9]+)*" style="font-size: 14px;padding: 0px;margin: 0px;width: 90%;"></td>
		<td><label class="btn btn-success joinBtn" style="" id="gjoin" onclick="ssLoginGuest();">Join</label></td>
		</tr>`;
		document.getElementById("sstable").innerHTML = res;
	}
}
