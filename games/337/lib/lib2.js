"use strict";

class B { 
	/*static setRoom(buf, arr) {
		buf.putByte(B.MSG_ROOM_DATA);
		buf.putChar(arr.length);
		for(var i = 0; i < arr.length; i++) {
			buf.putChar(arr[i]);
		}
		return buf;
	}
	static getRoom(buf) {
		var len = buf.getChar();
		var arr = new Array(len);
		for(var i = 0; i < len; i++) {
			arr[i] = buf.getChar();
		}
		return arr;
	}*/
}

B.MAX_PLAYERS = 100;
B.MAX_TE = 100;

B.MSG_PLAYER_DATA = 31;
B.MSG_PLAYER_LEFT_ARR = 32;
B.MSG_PLAYER_DATA_ARR = 33;

B.MSG_GAME_DATA = 34;
B.MSG_GAME_DATA_ARR = 35;

B.MSG_WELCOME = 36;
B.MSG_GAME_DATA_POS = 37;
B.MSG_PLAYER_CHARS = 38;
B.MSG_GAME_CHARS = 39;

B.MSG_CLIENT_NEW_GAME = 40;
B.MSG_CLIENT_JOIN_GAME = 41;
B.MSG_CLIENT_SET_OPS = 42;
B.MSG_CLIENT_START_GAME = 43;
B.MSG_CLIENT_SELECT_TEAM = 44;
B.MSG_CLIENT_SELECT_POS = 45;
B.MSG_CLIENT_SELECT_CHAR = 46;
B.MSG_CLIENT_SELECT_CHAR_READY = 47;
B.MSG_CLIENT_REMATCH_GAME = 48;

B.MSG_CLIENT_SELECT_GIFT = 97;
B.MSG_TE = 98;
B.MSG_TE2 = 99;

B.MSG_CLIENT_SANDBOX = 49;
B.MSG_CLIENT_NEW_GAME2 = 90;

B.MSG_CLIENT_SET_P = 1;
B.MSG_CLIENT_SET_M = 2;
B.MSG_CLIENT_SET_T = 3;
B.MSG_CLIENT_SET_O = 4;
B.MSG_CLIENT_SET_A = 5;

B.updateLocal = false;
B.updateLobby = false;
B.updateChat = false;

B.GAME_OPTION_2P = 2;
B.GAME_OPTION_4P = 4;
B.GAME_OPTION_6P = 6;
B.GAME_OPTION_8P = 8;

B.GAME_OPTION_PMASK = 31;

B.GAME_OPTION_4M = 32;
B.GAME_OPTION_8M = 64;
B.GAME_OPTION_12M = 96;

B.GAME_OPTION_MMASK = 96;

B.GAME_OPTION_TSEL = 128;
B.GAME_OPTION_TRND = 256;
B.GAME_OPTION_TORD = 384;
B.GAME_OPTION_TMASK = 384;

B.GAME_OPTION_RND = 0;
B.GAME_OPTION_ORD = 512;
B.GAME_OPTION_OMASK = 512;

B.GAME_OPTION_AJOIN = 1024;
B.GAME_OPTION_AOBSV = 2048;
B.GAME_OPTION_ANONE = 3072;
B.GAME_OPTION_AMASK = 3072;

B.GAME_OPTION_STATE_LOBBY = 0;
B.GAME_OPTION_STATE_TEAM_SEL = 4096;
B.GAME_OPTION_STATE_POS_SEL = 8192;
B.GAME_OPTION_STATE_PLAYER_SEL = 12288;
B.GAME_OPTION_STATE_STARTED = 16384;
B.GAME_OPTION_STATE_LOOKING_FOR_FRIENDS = 20480;
B.GAME_OPTION_STATE_ENDED = 32768;
B.GAME_OPTION_STATE_MASK = 61440;

B.CUP_NAMES = ["Starter", "Peridot", "Garnet", "Aquamarine", "Topaz", "Sapphire", "Diamond", "Emerald"];
B.CUP_PTS = [0, 3, 170, 700, 1700, 3700, 7000, 17000];
B.ptsToCup = function(pts) {
    for(var i = B.CUP_PTS.length-1; i >= 0 ; i--) {
        if(pts >= B.CUP_PTS[i]) return i;
    }
    return 0;
};
B.toRank = function(x) {
	return Math.min(3000, Math.max(0, 3000-x));
}

/*B.HAIR_COLOR = [	
	new THREE.Color( 0xfaf9bb ),
	new THREE.Color( 0xe5a645 ),
	new THREE.Color( 0x805c4d ),
	new THREE.Color( 0x5C443A ),
	new THREE.Color( 0xd4cac5 ),
	new THREE.Color( 0x393939 )
];*/
B.HAIR_COLOR = [
	{ r: 0.9803921568627451, g: 0.9764705882352941, b: 0.7333333333333333 },
	{ r: 0.8980392156862745, g: 0.6509803921568628, b: 0.27058823529411763 },
	{ r: 0.5019607843137255, g: 0.3607843137254902, b: 0.30196078431372547 },
	{ r: 0.3607843137254902, g: 0.26666666666666666, b: 0.22745098039215686 },
	{ r: 0.8313725490196079, g: 0.792156862745098, b: 0.7725490196078432 },
	{ r: 0.2235294117647059, g: 0.2235294117647059, b: 0.2235294117647059 }
];
B.SKIN_COLOR = [
	{ r: 0.9803921568627451, g: 0.9372549019607843, b: 0.9098039215686274 },
	{ r: 0.9333333333333333, g: 0.7568627450980392, b: 0.611764705882353 },
	{ r: 0.8509803921568627, g: 0.5529411764705883, b: 0.34901960784313724 },
	{ r: 0.5333333333333333, g: 0.4, b: 0.3411764705882353 }
];
B.CHAR_NAMES = [
	[""],
	["Accuracy", "Blaze", "Delta", "Glitter", "Heat", "Ignition",
	  "Plasma", "Paprika", "Railgun", "Re", "Sharp", "Zeal"],
	["Accelerator","Breeze","Cyclone","Dash","Energy","Gale",
		"Hop", "Motion", "Mi", "Swift", "Stormwind", "Stamina", 
		"Typhoon", "Velocity", "Wind", "Windwhirl"],
	["Backbone", "Claydome", "Do", "Diamond", "Everest", "Momentum",
	 "Fortress", "Globe", "Ground", "Rock", "Terraformer",
	 "Tolerance", "Foundation", "Sauna", "Grandpa", "Restraint"],
	["Certain", "Prima", "Grace", "Flow", "Fiesta", "Stream",
	 "Elastic", "Shrewd", "Keen", "Upright", "Rest", "Holiday",
	 "Simple", "Siesta", "Tetra", "Veda", "Fa", "Lala"]
];
B.DRILL_REF = null;

B.CHAR_DATA_SIZE = 14;
class CharData {
	constructor() {
		this.name = 0;
		this.surname = 0;
		this.type = 0;
		this.beardHair = 0;
		this.hairSkin = 0;
		this.str = 0;
		this.agi = 0;
		this.def = 0;
		this.exp = 0;
		this.training = [0,0,0,0];
		this.charNum = -1;
	}
	set(d) {
		this.name = d.name;
		this.surname = d.surname;
		this.type = d.type;
		this.beardHair = d.beardHair;
		this.hairSkin = d.hairSkin;
		this.str = d.str;
		this.agi = d.agi;
		this.def = d.def;
		this.exp = d.exp;
		this.training[0] = d.training[0];
		this.training[1] = d.training[1];
		this.training[2] = d.training[2];
		this.training[3] = d.training[3];
	}
	initOpenSlots(x) {
		var arr = this.training;
		var i = 0;
		for(; i < x; i++) {
			arr[i] = 1;		
		}
		for(; i < 4; i++) {
			arr[i] = 0;		
		}
	}
	randomName() {
		this.name = Math.floor(Math.random()*26);
		this.surname = Math.floor(Math.random()*B.CHAR_NAMES[this.type].length);
	}
	randomLook() {
		var h = (this.type === 1 || this.type === 4)?3:4;
		this.beardHair = Math.floor(Math.random()*4) | (Math.floor(Math.random()*h)<<4);
		this.hairSkin = Math.floor(Math.random()*B.HAIR_COLOR.length) | (Math.floor(Math.random()*B.SKIN_COLOR.length)<<4);
	}
	getBeard() {
		return this.beardHair&0xf;
	}
	getHair() {
		return this.beardHair>>4;
	}
	getHairCol() {
		return this.hairSkin&0xf;
	}
	getSkinCol() {
		return this.hairSkin>>4;
	}
	getFullName() {
		var arr = B.CHAR_NAMES[this.type];
		return String.fromCharCode(65+this.name)+". "+arr[this.surname%arr.length];
	}
	getHash() {
		return this.name ^ this.surname ^ this.type ^ this.str ^ this.agi ^ this.def ^ this.beardHair ^ this.hairSkin;
	}
	getNumOpenSlots() {
        var numOpen = 0;
        var arr = this.training;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] > 0) {
				numOpen++;
            }
        }
        return numOpen;
    }
	getBuyPrice() {
		var p = 350*(this.str + this.agi + this.def);
		var numOpen = 0;
		var arr = this.training;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] > 0) {
				numOpen++;
				p += B.DRILL_REF[arr[i]].val;
			}
		}
		if(numOpen > 0) {	
			//p += 5000;
			if(numOpen > 1) {
				p += 10000;
				if(numOpen > 2) { 
					p += 35000;
				}
			}
		}
		return p;
	}
	getReleasePrice() {
		return Math.floor(this.getBuyPrice()*0.5);
	}
	static toBuf0(buf, d) {
		buf.putByte(d.name);
		buf.putByte(d.surname);
		buf.putByte(d.type);
		buf.putByte(d.beardHair);
		buf.putByte(d.hairSkin);
		buf.putByte(d.str);
		buf.putByte(d.agi);
		buf.putByte(d.def);
		buf.putByte(d.exp);
		buf.putByte(d.training[0]);
		buf.putByte(d.training[1]);
		buf.putByte(d.training[2]);
		buf.putByte(d.training[3]);
		buf.putByte(d.charNum+1);
		return buf;
	}
	fromBuf(buf) {
		this.name = buf.getByte();
		this.surname = buf.getByte();
		this.type = buf.getByte();
		this.beardHair = buf.getByte();
		this.hairSkin = buf.getByte();
		this.str = buf.getByte();
		this.agi = buf.getByte();
		this.def = buf.getByte();
		this.exp = buf.getByte();
		this.training[0] = buf.getByte();
		this.training[1] = buf.getByte();
		this.training[2] = buf.getByte();
		this.training[3] = buf.getByte();
		this.charNum = buf.getByte()-1;
	}
	static toArrayBuffer0(buf, off, d) {
		buf[off] = d.name;
		buf[off+1] = d.surname;
		buf[off+2] = d.type;
		buf[off+3] = d.beardHair;
		buf[off+4] = d.hairSkin;
		buf[off+5] = d.str;
		buf[off+6] = d.agi;
		buf[off+7] = d.def;
		buf[off+8] = d.exp;
		buf[off+9] = d.training[0];
		buf[off+10] = d.training[1];
		buf[off+11] = d.training[2];
		buf[off+12] = d.training[3];
		buf[off+13] = d.charNum+1;
		return buf;
	}
	fromArrayBuffer(buf, off) {
		this.name = buf[off];
		this.surname = buf[off+1];
		this.type = buf[off+2];
		this.beardHair = buf[off+3];
		this.hairSkin = buf[off+4];
		this.str = buf[off+5];
		this.agi = buf[off+6];
		this.def = buf[off+7];
		this.exp = buf[off+8];
		this.training[0] = buf[off+9];
		this.training[1] = buf[off+10];
		this.training[2] = buf[off+11];
		this.training[3] = buf[off+12];
		this.charNum = buf[off+13]-1;
	}
	static toBufArr(buf, arr) {
		buf.putByte(arr.length);
		for(var i = 0; i < arr.length; i++) {
			var d = arr[i];
			CharData.toBuf0(buf, d);
		}
		return buf;
	}
	static fromBufArr(buf) {
		var len = buf.getByte();
		var arr = new Array(len);
		for(var i = 0; i < len; i++) {
			var d = new CharData();
			d.fromBuf(buf);
			arr[i] = d;
		}
		return arr;
	}
	static fromBufArrLen(buf, len) {
		var arr = new Array(len);
		for(var i = 0; i < len; i++) {
			var d = new CharData();
			d.fromBuf(buf);
			arr[i] = d;
		}
		return arr;
	}
}
class PlayerData {
	constructor(id, username, rating, cup) {
		this.id = id;
		this.gid = -1;
		this.order = 0;
		this.username = username;
		this.rating = rating;
		this.gp = 0;
		this.gp1 = 0;
		this.pts = 0;
		this.cup = cup;
		this.chars = [];
		this.drills = null;
		this.gifts = null;
		this.inLobby = true;
		this.updateJoin = false;
		this.updateLocal = false;
		this.updateLobby = true;
		this.updateNeeded = true;
		B.updateLobby = true;
		B.updateChat = true;
	}
	getTeamOrder() {
		return (this.order&15);
	}
	setTeamOrder(x) {
		this.order = (this.order&(~15))|x;
		this.updateLocal = true;
		B.updateLocal = true;
	}
	getTeam() {
		return (this.order>>4)&3;
	}
	setTeam(x) {
		this.order = (this.order&(~48))|(x<<4);
		this.updateLocal = true;
		B.updateLocal = true;
	}
	isReady() {
		return (this.order&64) !== 0;
	}
	setReady(b) {
		this.order = (this.order&(~64))|(b?64:0);
		this.updateLocal = true;
		B.updateLocal = true;
	}
	isRematch() {
		return (this.order&128) !== 0;
	}
	setRematch(b) {
		this.order = (this.order&(~128))|(b?128:0);
		this.updateLocal = true;
		B.updateLocal = true;
	}
	setUpdateNeeded() {
		this.updateNeeded = true;
		B.updateChat = true;
	}
	toBuf(buf) {
		buf.putByte(B.MSG_PLAYER_DATA);
		PlayerData.toBuf0(buf, this);
		return buf;
	}
	static toBuf0(buf, g) {
		buf.putChar(g.id);
		buf.putChar(g.gid+1);
		buf.putChar(g.rating);
		buf.putByte(g.cup);
		buf.putByte(g.order);
		buf.putByteString(g.username);
		return buf;
	}
	fromBuf(buf) {
		this.id = buf.getChar();
		this.gid = buf.getChar()-1;
		this.rating = buf.getChar();
		this.cup = buf.getByte();
		this.order = buf.getByte();
		this.username = buf.getByteString();
	}
	static toBufArr(buf, arr) {
		buf.putByte(B.MSG_PLAYER_DATA_ARR);
		var len = 0;
		for(var i = 0; i < arr.length; i++) {
			var p = arr[i];
			if(p != null) { 
				len++;
			}
		}
		buf.putChar(len);
		for(var i = 0; i < arr.length; i++) {
			var p = arr[i];
			if(p != null) { 
				PlayerData.toBuf0(buf, p);
			}
		}
		return buf;
	}
	static fromBufArrFill(buf, arr) {
		var len = buf.getChar();
		for(var i = 0; i < len; i++) {
			var g = new PlayerData();
			g.fromBuf(buf);
			arr[g.id] = g;
		}
		return arr;
	}
}



class FieldPos {
	constructor(name, x1,y1, x2,y2, x3,y3, x4, y4) {
		this.name = name;
		this.pos = [x1,y1, x2,y2, x3,y3, x4, y4];
	}
}

B.DEFAULT_FIELD_POS = [
	new FieldPos("Box", -11.0, -29.0, 11.0, -29.0, -12.0, 35.0, 12.0, 35.0), 
	new FieldPos("Diamond", 0.0, -29.0, -24.0, 0.0, 24.0, 0.0, 0.0, 35.0), 
	new FieldPos("Center A", 0.0, -24.0, 0.0, 0.0, -12.0, 35.0, 12.0, 35.0), 
	new FieldPos("Center Y", -11.0, -29.0, 11.0, -29.0, 0.0, 0.0, 0.0, 35.0), 
	new FieldPos("Forward", -13.0, -27.0, 13.0, -27.0, 0.0, -15.0, 0.0, 25.0), 
	new FieldPos("Defender", 0.0, -15.0, 0.0, 15.0, -12.0, 30.0, 12.0, 30.0), 
	new FieldPos("Left Advance", -11.0, -29.0, 11.0, -19.0, -12.0, 20.0, 12.0, 30.0), 
	new FieldPos("Right Advance", -11.0, -19.0, 11.0, -29.0, -12.0, 30.0, 12.0, 20.0)
];

class GameData {
	constructor(id,pid,pnum,ops,starttime) {
		this.id = id;
		this.pid = pid;
		this.pnum = pnum;
		this.options = ops;
		this.starttime = starttime;
		this.matchtime = 0; 
		this.gameType = 0;
		this.updateGame = false;
		this.seletime = 0;

		this.chars = [new CharData(),new CharData(),new CharData(),new CharData(),
					  new CharData(),new CharData(),new CharData(),new CharData()];
		this.updateGameChars = false;
		this.updatePlayerData = false;
		this.updatePlayerDataDB = false;
		this.posO = 0;
		this.posK = 0;
		this.updateLocalPos = false;

		this.orderIndex = 0;
		this.arr = null;
		this.updateLocal = false;
		this.updateNeeded = true;
		B.updateChat = true;
	}	
	getSlots(teamorder) {
		return GameData.getSlots0(teamorder, this.teamCount((teamorder < 4)?1:2));
	}
	static getSlots0(teamorder, teamCount) {
		var slots = 15;
		var teamorder4 = (teamorder < 4)?teamorder:(teamorder-4);
		if(teamCount > 1) {
			if(teamCount === 4) {
				slots = 1 << teamorder4;
			}
			else {
				for(var playerSlot = 0; playerSlot < 4; playerSlot++) {
					if(teamorder4 !== playerSlot) {
						if(teamCount === 3) {
							if(teamorder4 === 0 && playerSlot === 3) {
								//ok
							} 
							else {
								slots = slots & (~(1 << playerSlot));
							}
						}
						else if(teamCount === 2) {
							if(teamorder4+2 === playerSlot) {
								//ok
							} 
							else {
								slots = slots & (~(1 << playerSlot));
							}
						}
					}
				}
			}
		}
		return slots;
	}
	getFieldPosO() {
		return B.DEFAULT_FIELD_POS[this.posO&63];
	}
	getFieldPosK() {
		return B.DEFAULT_FIELD_POS[this.posK&63];
	}
	setPosO(p) {
		this.posO = p;
		this.updateLocalPos = true;
		B.updateLocal = true;
	}
	setPosK(p) {
		this.posK = p;
		this.updateLocalPos = true;
		B.updateLocal = true;
	}
	teamCount(team) {
		var a = this.arr;
		var t = 0;
		for(var i = 0; i < a.length; i++) {
			if(a[i].getTeam() === team) {
				t++;					
			}
		}
		return t;
	}
	setPlayers(num) {
		if(this.getMaxPlayers() === num) return true;
		switch(num) {
		case B.GAME_OPTION_2P:
			this.options = (this.options & ~B.GAME_OPTION_PMASK) | B.GAME_OPTION_2P;
		break;
		case B.GAME_OPTION_4P:
			this.options = (this.options & ~B.GAME_OPTION_PMASK) | B.GAME_OPTION_4P;
		break;
		case B.GAME_OPTION_6P:
			this.options = (this.options & ~B.GAME_OPTION_PMASK) | B.GAME_OPTION_6P;
		break;
		case B.GAME_OPTION_8P:
			this.options = (this.options & ~B.GAME_OPTION_PMASK) | B.GAME_OPTION_8P;
		break;
		default:
			//TODO ... if client calls...
			console.log("warning: setting game players to " + num);
			return false;
		}
		if(this.gameType === 2) return true;
		this.updateNeeded = true;
		B.updateChat = true;
		return true;
	}
	setMinutes(min) {
		if((this.options&B.GAME_OPTION_MMASK) === min) return true;
		switch(min) {
			case B.GAME_OPTION_4M:
				this.options = (this.options & ~B.GAME_OPTION_MMASK) | B.GAME_OPTION_4M;
			break;
			case B.GAME_OPTION_8M:
				this.options = (this.options & ~B.GAME_OPTION_MMASK) | B.GAME_OPTION_8M;
			break;
			case B.GAME_OPTION_12M:
				this.options = (this.options & ~B.GAME_OPTION_MMASK) | B.GAME_OPTION_12M;
			break;
			default:
				//TODO ... if client calls...
				console.log("warning: setting game players to " + num);
			return false;
		}
		if(this.gameType === 2) return true;
		this.updateNeeded = true;
		B.updateChat = true;
		return true;
	}
	setTeamSelection(val) {
		if((this.options&B.GAME_OPTION_TMASK) === val) return true;
		switch(val) {
			case B.GAME_OPTION_TSEL:
				this.options = (this.options & ~B.GAME_OPTION_TMASK) | B.GAME_OPTION_TSEL;
			break;
			case B.GAME_OPTION_TRND:
				this.options = (this.options & ~B.GAME_OPTION_TMASK) | B.GAME_OPTION_TRND;
			break;
			case B.GAME_OPTION_TORD:
				this.options = (this.options & ~B.GAME_OPTION_TMASK) | B.GAME_OPTION_TMASK;
			break;
			default:
				//TODO ... if client calls...
				console.log("warning: setting game players to " + num);
			return false;
		}
		this.updateNeeded = true;
		B.updateChat = true;
		return true;
	} 
	setOrder(val) {
		if((this.options&B.GAME_OPTION_OMASK) === val) return true;
		switch(val) {
			case B.GAME_OPTION_RND:
				this.options = (this.options & ~B.GAME_OPTION_OMASK) | B.GAME_OPTION_RND;
			break;
			case B.GAME_OPTION_ORD:
				this.options = (this.options & ~B.GAME_OPTION_OMASK) | B.GAME_OPTION_ORD;
			break;
			default:
				//TODO ... if client calls...
				console.log("warning: setting game players to " + num);
			return false;
		}
		this.updateNeeded = true;
		B.updateChat = true;
		return true;
	}
	setA(val) {
		if((this.options&B.GAME_OPTION_AMASK) === val) return true;
		switch(val) {
			case B.GAME_OPTION_AJOIN:
				this.options = (this.options & ~B.GAME_OPTION_AMASK) | B.GAME_OPTION_AJOIN;
			break;
			case B.GAME_OPTION_AOBSV:
				this.options = (this.options & ~B.GAME_OPTION_AMASK) | B.GAME_OPTION_AOBSV;
			break;
			case B.GAME_OPTION_ANONE:
				this.options = (this.options & ~B.GAME_OPTION_AMASK) | B.GAME_OPTION_ANONE;
			break;
			default:
				//TODO ... if client calls...
				console.log("warning: setting game players to " + num);
			return false;
		}
		this.updateNeeded = true;
		B.updateChat = true;
		return true;
	}
	setStartTime(time) {
		this.starttime = time;
		this.updateNeeded = true;
		B.updateChat = true;
	}
	setState(val) {
		if((this.options&B.GAME_OPTION_STATE_MASK) === val) return true;

		switch(val) {
			case B.GAME_OPTION_STATE_LOBBY:
				this.options = (this.options & ~B.GAME_OPTION_STATE_MASK) | B.GAME_OPTION_STATE_LOBBY;
			break;
			case B.GAME_OPTION_STATE_TEAM_SEL:
				this.options = (this.options & ~B.GAME_OPTION_STATE_MASK) | B.GAME_OPTION_STATE_TEAM_SEL;
			break;
			case B.GAME_OPTION_STATE_POS_SEL:
				this.options = (this.options & ~B.GAME_OPTION_STATE_MASK) | B.GAME_OPTION_STATE_POS_SEL;
			break;
			case B.GAME_OPTION_STATE_PLAYER_SEL:
				this.options = (this.options & ~B.GAME_OPTION_STATE_MASK) | B.GAME_OPTION_STATE_PLAYER_SEL;
			break;
			case B.GAME_OPTION_STATE_STARTED:
				this.options = (this.options & ~B.GAME_OPTION_STATE_MASK) | B.GAME_OPTION_STATE_STARTED;
			break;
			case B.GAME_OPTION_STATE_LOOKING_FOR_FRIENDS:
				this.options = (this.options & ~B.GAME_OPTION_STATE_MASK) | B.GAME_OPTION_STATE_LOOKING_FOR_FRIENDS;
			break;
			case B.GAME_OPTION_STATE_ENDED:
				this.options = (this.options & ~B.GAME_OPTION_STATE_MASK) | B.GAME_OPTION_STATE_ENDED;
		return;
			default:
				//TODO ... if client calls...
				console.log("warning: setting game players to " + num);
			return false;
		}
		this.updateLocal = true;
		B.updateLocal = true;
	}
	getMaxPlayers() {
		var v = this.options;
		return v&B.GAME_OPTION_PMASK;
	}
	getMinutes() {
		if(this.gameType === 0 || this.gameType === 10) return 60;
		var v = this.options & B.GAME_OPTION_MMASK;
		if(v === B.GAME_OPTION_4M) return 4;
		if(v === B.GAME_OPTION_8M) return 8;
		if(v === B.GAME_OPTION_12M) return 12;
		return 0;
	}
	getState() {
		return this.options & B.GAME_OPTION_STATE_MASK;
	}
	hasStarted() {
		return this.starttime !== 0;
	}

	toBufPos(buf) {
		buf.putByte(B.MSG_GAME_DATA_POS);
		buf.putChar(this.id);
		buf.putByte(this.posO);
		buf.putByte(this.posK);
		return buf;
	}
	fromBufPos(buf, g) {
		this.posO = buf.getByte();
		this.posK = buf.getByte();
	}

	toBuf(buf) {
		buf.putByte(B.MSG_GAME_DATA);
		GameData.toBuf0(buf, this);
		return buf;
	}
	static toBuf0(buf, g) {
		buf.putChar(g.id);
		buf.putChar(g.pid);
		buf.putChar(g.options);
		buf.putByte(g.gameType);
		buf.putByte(g.pnum);
		buf.putByte((g.starttime !==0)?1:0);
		return buf;
	}
	fromBuf(buf) {
		this.id = buf.getChar();
		this.pid = buf.getChar();
		this.options = buf.getChar();
		this.gameType = buf.getByte();
		this.pnum = buf.getByte();
		this.starttime = buf.getByte();
	}
	static toBufArr(buf, arr) {
		buf.putByte(B.MSG_GAME_DATA_ARR);
		/*buf.putChar(arr.length);
		for(var i = 0; i < arr.length; i++) {
			GameData.toBuf0(buf, arr[i]);
		}*/

		var len = 0;
		for(var i = 0; i < arr.length; i++) {
			var p = arr[i];
			if(p != null) { 
				len++;
			}
		}
		buf.putChar(len);
		for(var i = 0; i < arr.length; i++) {
			var p = arr[i];
			if(p != null) { 
				GameData.toBuf0(buf, p);
			}
		}
		return buf;
	}
	static fromBufArr(buf) {
		var len = buf.getChar();
		var arr = new Array(len);
		for(var i = 0; i < len; i++) {
			var g = new GameData();
			g.fromBuf(buf);
			arr[i] = g;
		}
		return arr;
	}
}

/*
class GlobalData {
	constructor() {
		this.playerData = {};
		this.gameData = {};
		this.roomData = [];

		this.playerData[7] = new PlayerData(7, "test", 1234, 1);
		this.playerData[8] = new PlayerData(8, "aaa",  500, 2);
		this.playerData[9] = new PlayerData(9, "bbb", 700, 3);
		this.gameData[123] = new GameData(123, 7, 1, GAME_OPTION_8P|GAME_OPTION_4M, 0);

		this.gameData[0] = new GameData(0, 7, 1, GAME_OPTION_2P|GAME_OPTION_12M, 0);

		this.roomData = [7,8,9,11];
	}
	
	getPlayerData(id) {
		if(this.playerData.hasOwnProperty(id)) {
			return this.playerData[id];		
		}
		return null;
	}
	
}
var gl = new GlobalData();
*/
function calcCharSize(arr) {
	var size = 0;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].type !== 0) {
			size++;
		}
	}
	return size;
}
function _active(id) {
	var tag = $(id);
	if(tag !== null) {
		tag.addClass('active').siblings()/*.not(tag)*/.removeClass('active');
	}
	else {
		console.log("warning: tag not found " + id);
	}
}
function stateWithChat(id) {
	return id === "#state0" || id === "#state4096" || id === "#state8192" || id === "#state12288";
}
var _displaySkipAnim = true;
var _lastAnim = null;
function _display(id) {
	var hadChat = stateWithChat(_lastAnim);
	var hasChat = stateWithChat(id);
	var tag = $(id);
	var tagChat = $("#stateChat");
	if(tag !== null) {
		tag.removeClass('d-none').siblings().not(tagChat).addClass('d-none');
		if(_displaySkipAnim || _lastAnim === id) { _displaySkipAnim = false; }
		else { tag.fadeOut(0).fadeIn(750); }
		_lastAnim = id;
	}
	else {
		console.log("warning: tag not found " + id);
	}
	if(hasChat !== hadChat) {
		if(hasChat) {
			tagChat.removeClass('d-none');
		}
		else {
			tagChat.addClass('d-none');
		}
	}
}
function _rtableRow(p) {
	var name = "?";
	var rating = "?";
	var pData = p; // gl.getPlayerData(g);
	if(pData !== null) {
		name = `<img class="cupiconMini" src="img/cup${pData.cup}.png"/>`+pData.username;
		rating = B.toRank(pData.rating);
	}
	var style = "";
	if(pData.gid !== -1) {
		var g = gl.getGame(pData.gid);
		if(g !== null && g.pid === pData.id) {
			style=` class="progressWCol"`;
		}
	}
	
	return `<tr>
      <td${style}>
		${name}
	  </td>
	  <td style="padding-left: 5px;">
		${rating}
	  </td>
    </tr>`;
}
function updateRTable() {
	var gid = -1;
	var p = gl.getPlayerData(gl.player.id);
	if(p !== null) {
		gid = p.gid;
	}
	document.getElementById("rtable").innerHTML = gl.playerData.filter((a)=>{ return a != null && a.gid === gid; }).map(_rtableRow).join("");
}

function _gtableRow(g) {
	if(g.gameType === 2 && !g.hasStarted()) {
		return "";
	}
	var name = g.gameType === 3?"lobby":"?";
	var pData = gl.getPlayerData(g.pid);
	if(pData !== null) {
		name = pData.username;
	}
	if(g.gameType === 3) {
		return `<tr>
      <th scope="row">
		<button type="button" class="btn btn-warning joinBtn" style="color:#865700;" onclick="gl.joinGame(${g.id});">${g.pnum<8?"JoiN":"ObServe"}</button>
		</th>
      <td>
		${name}
	  </td>
		 <td>
		${g.pnum}/${g.getMaxPlayers()}
	  </td>
		 <td>
		${g.getMinutes()}m
	  </td>
    </tr>`;
	}
	if(g.gameType > 2) {
		return `<tr>
      <th scope="row"><span style="width:85px;"></span>
		</th>
      <td>
		${name}
	  </td>
		 <td>
		1
	  </td>
		 <td>
		${g.getMinutes()}m
	  </td>
    </tr>`;
	}
	return `<tr>
      <th scope="row">
		<button type="button" class="btn btn-success joinBtn" onclick="gl.joinGame(${g.id});">${g.hasStarted()?"ObServe":"JoiN"}</button>
		</th>
      <td>
		${name}
	  </td>
		 <td>
		${g.pnum}/${g.getMaxPlayers()}
	  </td>
		 <td>
		${g.getMinutes()}m
	  </td>
    </tr>`;
}
function _stableRow(p) {
	var name = `<img class="cupiconMini" src="img/cup${p.cup}.png"/>`+p.username;
	var team = p.getTeam();
	if(team === 1) {
		return `<tr><td>${name}</td><td></td><td></td></tr>`;
	}
	if(team === 2) {
		return `<tr><td></td><td></td><td>${name}</td></tr>`;
	}
	if(team === 0) {
		return `<tr><td></td><td style="color:#fff;">${name}</td><td></td></tr>`;
	}
	return `<tr><td></td><td>${name}</td><td></td></tr>`;
}
function _stablePos(arr,off) {
	var str = "";
	for(var i = 0; i < 4; i++) {
		var p = arr[i+off];
		if(p != null) {
			var name = `<img class="cupiconMini" src="img/cup${p.cup}.png"/>`+p.username;
			if(p.isReady()) {
				str += `<tr><td>${name} - X</td></tr>`;
			}
			else { str += `<tr><td>${name}</td></tr>`; }
		}
		else {
			str += `<tr><td>&nbsp;</td></tr>`;
		}
	}	
	return str;
}
function _rtablePos(arr,off,gid,stats) {
	var str = "";
	for(var i = 0; i < 4; i++) {
		var p = arr[i+off];
		var username = "&nbsp;";
		var style = "", stats1 = "", stats2 = "";
		if(p != null) {
			username = `<img class="cupiconMini" src="img/cup${p.cup}.png"/>`+p.username;
			//console.log(" rematch " + p.isRematch() + " " + (p.gid == gid));
			if(p.isRematch() && p.gid == gid) {
				username += " - RM";
			}
			if(p.gid != gid) {
				style = ` style="color:#bababa;"`;
			}
			stats1 = stats[i+off];
			stats2 = stats[i+off+8];
		}
		str += 
`<tr>
	<td${style}>${username}</td><td>${stats1}</td><td>${stats2}</td>
</tr>`;
	}	
	return str;
}
function _poslocation(_pos, scale) {
	var str = "";
	var arr = _pos.pos;
	var mult = scale/96.0;
	for(var i = 0; i < 8; i=i+2) {
		var x = (arr[i]+30)*mult    - 3;
		var y = (arr[i+1]+48)*mult  - 10;
		
		str += `<span style="color:white;position:absolute;left:${x}px;top:${y}px;">${(i>>1)+1}</span>`
	}
	return str;		
}
function _poslocation2() {
	var scale = 127.0;
	var arr = B.DEFAULT_FIELD_POS;
	var str = "";
	for(var i = 0; i < arr.length; i++) {
		var _pos = arr[i];
		var a = _poslocation(_pos, scale);
		str += `<div class="formSmall" onclick="gl.teampos(${i});">
				<img src="img/field61.jpg" style="width:80px;height:127px;border:1px solid #aaaaaa;border-radius: 5px;">
				${a}
			</div>`;
	}
	
	return str;		
}
function updatePosLocations() {
	document.getElementById("formList").innerHTML = _poslocation2();
}
var _selectedSlot = -1;
var _selectSlotSlots = 0;
var _onSlotChanged = null;
function selectSlot(x) {
	if(x === _selectedSlot) return;
	//console.log("select slot " + x);
	_selectedSlot = x;
	var item = $("#slot"+x);
	item.addClass('playerBoxSelected').siblings()/*.not(item)*/.removeClass('playerBoxSelected');
	if(_onSlotChanged) _onSlotChanged(x);
}
var MENU_VISIBLE = false;
function toggleMenu() {
	MENU_VISIBLE = !MENU_VISIBLE;
	if(MENU_VISIBLE) {
		$("#gMenu").removeClass('d-none');
	}
	else {
		$("#gMenu").addClass('d-none');
		$("#gOps").addClass('d-none');
		$("#gVars").addClass('d-none');
	}
}
var CHAT_VISIBLE = false;
function toggleChat() {
	CHAT_VISIBLE = !CHAT_VISIBLE;
	if(CHAT_VISIBLE) {
		$("#stateChat").removeClass('d-none');
		$("#logtext").addClass('d-none');
	}
	else {
		$("#stateChat").addClass('d-none');
		$("#logtext").removeClass('d-none');
	}
}
function loadDefaultSettings() {
	setSettings([85,1,1,0,150,87,83,65,68,32]);
}
function saveSettings() {
	var bufS = _tmp();
	sendSettings(bufS, gl.settings);
	gl.player.chan.send(bufS.flip());
	closeOptions();
}

var OPTIONS_VISIBLE = false;
function toggleOptions() {
	if(MENU_VISIBLE) {
		toggleMenu();
	}
	OPTIONS_VISIBLE = !OPTIONS_VISIBLE;
	if(OPTIONS_VISIBLE) {
		$("#gOps").removeClass('d-none');
			
	}
	else {
		$("#gOps").addClass('d-none');
		
	}
}
function closeOptions() {
	OPTIONS_VISIBLE = false;
	$("#gOps").addClass('d-none');
}
var STATS_VISIBLE = false;
function toggleFps() {
	STATS_VISIBLE = !STATS_VISIBLE;
	if(STATS_VISIBLE) {
		if(stats === null) {
			stats = createStats(0, 0);
			document.body.appendChild(stats.domElement);
		}
		else {
			stats.domElement.style.display = "";
		}
		gl.pingLog.style.display = "";
    }
    else {
   		if(stats !== null) {
    		stats.domElement.style.display = "none";
    	}
    	gl.pingLog.style.display = "none";
    }
}
function showAllStats() {
	STATS_VISIBLE = true;
	if(stats === null) {
		stats = createStats(0, 0);
		document.body.appendChild(stats.domElement);
	}
	if(stats2 === null) {
		stats2 = createStats(0, 1);
    	document.body.appendChild(stats2.domElement);
	}
	if(stats0 === null) {
		stats0 = createStats(0, 2);
    	document.body.appendChild(stats0.domElement);
	}
}

/*function toggleVars() {
	$("#gVars").toggleClass('d-none');
}*/
function _trainingBox(d, i, clickable=false) {
	/*return `<div class="row no-gutters">
		<div class="col-auto">
			<div class="plusBtn trainingBoxBig" onclick="showModal('modalDialog', ${5+i});">${drill.icon}</div>
		</div>
		<div class="col">
		  	<div>${drill.name}</div>
			<small>${drill.desc}</small>
		</div>
	</div>
	<br>`;*/

	if(d === 0) {
		return `<div class="trainingBox border-0" ></div>`;
	}

	var drill = A.DRILL[d];
	var icon = "";
	if(d > 1) icon = drill.icon.replace("Big", "Min");
	var drillBg = _drillBgCol(drill);
	if(clickable !== false) {
		var num = i + clickable;
		return `<div class="trainingBox" onclick="showModal('modalDialog', ${num});" ${drillBg}>${icon}</div>`;
	}
	else return `<div class="trainingBox" ${drillBg}>${icon}</div>`;
}
function _trainingBoxes(ch, clickable=false) {
	var str = "";
	for(var i = 0; i < 4; i++) {
		var ii = (3-i);
		var d = ch.training[ii];
		str += _trainingBox(d, ii, clickable);
	}
	return str;
}
function _playerCharImg(charData, index) {
	var type = charData.type;
	var beard = charData.getBeard();
	var hair = charData.getHair();
	var hairCol = charData.getHairCol();
	var skinCol = charData.getSkinCol();
	return `<div style="display:block;float:left;width:90px;height:90px;margin-right:2px;"><img data-charimg="${type};${beard};${hair};${hairCol};${skinCol}" style="width:100%;border:1px solid #aaaaaa;border-radius: 5px;"></div>`;
}
function _storeChar(charData, index, clickable, isstore) {
	var str0 = clickable?clickable:"";

	var name = charData.getFullName();
	var type = charData.type;
	var beard = charData.getBeard();
	var hair = charData.getHair();
	var hairCol = charData.getHairCol();
	var skinCol = charData.getSkinCol();
	//trainings...

	var trainings = _trainingBoxes(charData);


	/*
	<div style="display:block;float:left;width:88px;">
		<small class="progressWCol">Stats&nbsp;</small>
		<div class="progress progressY w-100">
		  <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${charData.str}%;" aria-valuenow="${charData.str}" aria-valuemin="0" aria-valuemax="100"><span>STR ${charData.str}</span></div>
		</div>

		<div class="progress progressG w-100">
		  <div class="progress-bar" role="progressbar" style="width: ${charData.agi}%" aria-valuenow="${charData.agi}" aria-valuemin="0" aria-valuemax="100"><span>AGI ${charData.agi}</span></div>
		</div>

		<div class="progress progressR w-100">
		  <div class="progress-bar" role="progressbar" style="width: ${charData.def}%" aria-valuenow="${charData.def}" aria-valuemin="0" aria-valuemax="100"><span>DEF ${charData.def}</span></div>
		</div>
	</div>
	*/
	//var typeCols = ["W", "Y", "G", "R", "W"]; ${typeCols[charData.type]}

	var str = `<div class="storeBox clearfix"${str0}>
			<div style="display:block;width:70px;float:left;margin-right:2px;"><span class="progressWCol" style="font-size:12px;"><nobr>${name}</nobr></span><img data-charimg="${type};${beard};${hair};${hairCol};${skinCol}" style="width:67px;height:67px;border:1px solid #aaaaaa;border-radius: 5px;">
			</div>	
			<div style="display:inline-block;float:left;width:25px">${trainings}</div>
			<div style="display:block;float:left;width:95px;">
				<small class="progressWCol">Stats&nbsp;</small>
				<div style="line-height:1;">
				<div class="clearfix">
					<span style="display:inline-block;float:left;width:25px;text-align:center;"><span class="oi oi-bolt progressYCol"></span></span>
					<div class="progress progressY position-relative">
					<div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${charData.str}%;" aria-valuenow="${charData.str}" aria-valuemin="0" aria-valuemax="100"></div>
					<span class="position-absolute w-100 text-center progressYCol progressAlignText">${charData.str}</span>
					</div>
				</div>
				<div class="clearfix">
					<span style="display:inline-block;float:left;width:25px;text-align:center;"><span class="oi oi-flash hvflip progressGCol"></span></span>
					<div class="progress progressG position-relative">
					<div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${charData.agi}%;" aria-valuenow="${charData.agi}" aria-valuemin="0" aria-valuemax="100"></div>
					<span class="position-absolute w-100 text-center progressGCol progressAlignText">${charData.agi}</span>
					</div>
				</div>
				<div class="clearfix">
					<span style="display:inline-block;float:left;width:25px;text-align:center;"><span class="oi oi-shield progressRCol"></span></span>
					<div class="progress progressR position-relative">
					<div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${charData.def}%;" aria-valuenow="${charData.def}" aria-valuemin="0" aria-valuemax="100"></div>
					<span class="position-absolute w-100 text-center progressRCol progressAlignText">${charData.def}</span>
					</div>
				</div>
				</div>
			</div>
			<div style="display:block;float:left;width:88px;margin-left:5px;">
				<small class="progressWCol">Price&nbsp;</small><br>
				<div style="line-height:1;">
				<span><span class="oi oi-tag hflip progressYCol"></span>&nbsp;&nbsp;<small class="progressYCol">${charData.getBuyPrice()}</small></span>
				<br>`

	if(!isstore) {
		str +=	`<span><span class="oi oi-tags hflip progressGCol"></span>&nbsp;&nbsp;<small class="">4545</small></span>
				<br>
				<span><span class="oi oi-timer progressRCol"></span>&nbsp;&nbsp;<small class="">12:00</small></span>`;
	}
	str +=	`</div></div></div>`;
	return str;
}
function _storeChars(chars) {
	var str = '<div class="storeChars">';
	var len = chars.length;
	for(var i = 0; i < len; i++) {
		var ch = chars[i];
		//str += `<div id="store${i}">`;

		if(ch.type === 0) {
			str += `<span>${i+1}</span></div>`;
		}
		else {
			str += _storeChar(ch, 0, ` onclick="showModal('modalDialog', ${i+100});"`, true);// + "</div>";
		}
	}
 	str += "</div>";
	return str;
}
function _playerChar(charData, index, clickable, clickableSlots=false) {
	var str0 = clickable?clickable:"";

	var name = charData.getFullName();
	var type = charData.type;
	var beard = charData.getBeard();
	var hair = charData.getHair();
	var hairCol = charData.getHairCol();
	var skinCol = charData.getSkinCol();
	//trainings...

	var trainings = _trainingBoxes(charData, clickableSlots?(index*10+1000):false);

	return `<div class="playerBox2"${str0}>
		<div class="clearfix">
			<div style="display:block;float:left;width:75%;margin-right:2px;"><small><nobr>${name}</nobr></small><img data-charimg="${type};${beard};${hair};${hairCol};${skinCol}" style="width:100%;border:1px solid #aaaaaa;border-radius: 5px;">
			</div>	
			${trainings}
		</div>

		<div class="progress progressY w-100">
		  <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${charData.str}%;" aria-valuenow="${charData.str}" aria-valuemin="0" aria-valuemax="100"><span>STR ${charData.str}</span></div>
		</div>

		<div class="progress progressG w-100">
		  <div class="progress-bar" role="progressbar" style="width: ${charData.agi}%" aria-valuenow="${charData.agi}" aria-valuemin="0" aria-valuemax="100"><span>AGI ${charData.agi}</span></div>
		</div>

		<div class="progress progressR w-100">
		  <div class="progress-bar" role="progressbar" style="width: ${charData.def}%" aria-valuenow="${charData.def}" aria-valuemin="0" aria-valuemax="100"><span>DEF ${charData.def}</span></div>
		</div>

		<div class="progress progressW w-100">
		  <div class="progress-bar" role="progressbar" style="width: ${charData.exp}%" aria-valuenow="${charData.exp}" aria-valuemin="0" aria-valuemax="100"><span>EXP ${charData.exp}</span></div>
		</div>
	</div>`;
}
var _selectGameChars = null;
var _selectGameCharsOffset = 0;
function _gameChars(chars, offset, slots) {
	_selectSlotSlots = slots;
	_selectGameChars = chars;
	_selectGameCharsOffset = offset;
	var str = "";
	var len = slots==null?chars.length:4;
	
	for(var i = 0; i < len; i++) {
		var ch = chars[i+offset];

		if(slots == null && ch.type === 0) { continue; }
		var clickSlot = false;
		if(slots == null || (slots&(1<<i)) !== 0) {
			if(_selectedSlot === i) {
				str += `<div id="slot${i}" class="playerBox playerBoxHere playerBoxSelected" onclick="selectSlot(${i});">`;
			}
			else {
				str += `<div id="slot${i}" class="playerBox playerBoxHere" onclick="selectSlot(${i});">`;
			}
			clickSlot = true;
		}
		else {
			str += `<div class="playerBox">`;
		}

		if(ch.type === 0) {
			str += `<span>${i+1}</span></div>`;
		}
		else {
			str += _playerChar(ch, i, false, (clickSlot && slots!=null))+"</div>";
		}
		if(slots != null && i === 1) {
			str += "<br>";
		}
	}
	return str;
}
function _playerChars(chars, fname) {
	var str = "";
	for(var i = 0; i < chars.length; i++) {
		var ch = chars[i];
		if(ch.type !== 0) {
			str += _playerChar(ch, i, ` onclick="${fname}(${i});"`);
		}
	}
	return str;
}
function updateGTable() {
	var p = gl.getPlayerData(gl.player.id);
	if(p !== null) {
		if(p.gid === -1) {
			$("#gamesA").removeClass('d-none');
			$("#gamesB").addClass('d-none');
			$("#gamesR").addClass('d-none');
			$("#gamesI").addClass('d-none');
			document.getElementById("gtable").innerHTML = gl.gameData.map(_gtableRow).join("");
			document.getElementById("lobbyRoom").innerHTML = "Lobby";
			gl.setGameState(false);
			_display(gl.isWelcome?"#state-3":"#state0");
			if(gl.isNewGame2) {
				gl.newGame2();
			}
			if(gl.isNewGame3) {
				gl.newGame3();
			}
		}
		else {
			
			var g = gl.getGame(p.gid);
			if(g !== null) {
				var ops = g.options;
				var state = g.getState();

				//console.log("set state " + state);

				switch(state) {
					case B.GAME_OPTION_STATE_LOBBY: 
						_display("#state0");
						$("#gamesA").addClass('d-none');
						$("#gamesB").removeClass('d-none');
						$("#gamesR").addClass('d-none');
						$("#gamesI").addClass('d-none');
						document.getElementById("lobbyRoom").innerHTML = "Room";
						_active("#option" + (ops & B.GAME_OPTION_PMASK));
						_active("#option" + (ops & B.GAME_OPTION_MMASK));
						_active("#option" + (ops & B.GAME_OPTION_TMASK));
						_active("#option" + (ops & B.GAME_OPTION_OMASK));
						_active("#option" + (ops & B.GAME_OPTION_AMASK));
						if(g !== null && g.pid === p.id) {
							$("#start").addClass('btn-success');
						}
						else {
							$("#start").removeClass('btn-success');
						}
					break;
					case B.GAME_OPTION_STATE_TEAM_SEL:
						_display("#state4096");
						gl.setTimeX(g.seletime+10000, gl.time4096);
						var arr = gl.playerData.filter((a)=>{ return a != null && a.gid === g.id; }).sort((a,b)=>a.getTeamOrder()-b.getTeamOrder());
						var str = arr.map(_stableRow).join("");
						for(var i = arr.length; i < 8; i++) {
							str += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
						}
						document.getElementById("stable").innerHTML = str; 
					break;
					case B.GAME_OPTION_STATE_POS_SEL:
						_display("#state8192");
						gl.setTimeX(g.seletime+15000, gl.time8192);
						//team o, team k, ready
						document.getElementById("team1").innerHTML = ((g.posO&64)!==0)?"X Team O":"Team O";
						document.getElementById("team2").innerHTML = ((g.posK&64)!==0)?"X Team K":"Team K";
					
						//team members
						var arr = gl.playerData.filter((a)=>{ return a != null && a.gid === g.id; }).sort((a,b)=>a.getTeamOrder()-b.getTeamOrder());
					
						var arr2 = new Array(8);
						for(var i = 0; i < arr.length; i++) {
							var pp = arr[i];
							arr2[pp.getTeamOrder()] = pp;
						}

						document.getElementById("stable1").innerHTML = _stablePos(arr2,0); 
						document.getElementById("stable2").innerHTML = _stablePos(arr2,4); 
						
						var teamorder = p.getTeamOrder();
						var posIndex 
						if(teamorder < 4) {
							posIndex = (g.posO&63);
						}
						else {
							posIndex = (g.posK&63);
						}

						if(posIndex >= 0 && posIndex < B.DEFAULT_FIELD_POS.length) {
							var _pos = B.DEFAULT_FIELD_POS[posIndex];
							document.getElementById("posName").innerHTML = _pos.name; 
							document.getElementById("posLocation1").innerHTML = _poslocation(_pos, 260.0);
						}

						updatePosLocations();
						if(teamorder === 0 || teamorder === 4) {
							$("#formList").removeClass('d-none');
						}
						else {
							$("#formList").addClass('d-none');
						}
						//form name
						//form locations
						/*
						<span style="color:white;position:absolute;left:50px;top:20px;">x</span>
						*/
						//document.getElementById("posLocation1").innerHTML = _stablePos(arr2,4); 
					break;
					case B.GAME_OPTION_STATE_PLAYER_SEL:
						_display("#state12288");
						gl.setTimeX(g.seletime+30000, gl.time12288);
						var arr = gl.playerData.filter((a)=>{ return a != null && a.gid === g.id; }).sort((a,b)=>a.getTeamOrder()-b.getTeamOrder());
					
						var arr2 = new Array(8);
						for(var i = 0; i < arr.length; i++) {
							var pp = arr[i];
							arr2[pp.getTeamOrder()] = pp;
						}

						document.getElementById("stable12").innerHTML = _stablePos(arr2,0); 
						document.getElementById("stable22").innerHTML = _stablePos(arr2,4); 

						var teamorder = p.getTeamOrder();
						var posIndex 
						if(teamorder < 4) {
							posIndex = (g.posO&63);
						}
						else {
							posIndex = (g.posK&63);
						}

						if(posIndex >= 0 && posIndex < B.DEFAULT_FIELD_POS.length) {
							var _pos = B.DEFAULT_FIELD_POS[posIndex];
							document.getElementById("posLocation12").innerHTML = _poslocation(_pos, 260.0);
						}

						/*for(var i = 0; i < 4; i++) {
							`<div class="playerBox" onclick="selectSlot(this, ${i});">
								<span>1</span>
							</div>`
						}*/

						//_playerChar(charData, index, clickable)
						g.arr = arr;
						var slots = g.getSlots(teamorder);
			
						if(_selectedSlot === -1) {
							for(var i = 0; i < 4; i++) {
								if((slots&(1<<i)) !== 0) {
									_selectedSlot = i;
									break;
								}
							}
						}

						document.getElementById("gameChars").innerHTML = _gameChars(g.chars, teamorder < 4?0:4,slots);
						document.getElementById("playerChars").innerHTML = _playerChars(gl.playerChars, "gl.selectPlayer");
						updateCharImg();
						break;
					case B.GAME_OPTION_STATE_STARTED:
						_display("#state16384");
						$("#gMenu").addClass('d-none');
						gl.setTimeX(0, null);
						break;
					case B.GAME_OPTION_STATE_LOOKING_FOR_FRIENDS:
						document.getElementById("lobbyRoom").innerHTML = "Room";
						document.getElementById("rbutton").innerHTML = "Looking for friends to play with...";
						break;
					case B.GAME_OPTION_STATE_ENDED:
						_display("#state32768");
						if(g.gameType === 3) gl.setTimeX(g.seletime+10000, gl.time32768);
						else gl.setTimeX(0, null);

						if(gl.resultStats != null && gl.resultStats.gid === p.gid) {
							document.getElementById("gStatsScore").innerHTML = gl.resultStats.goalsO + " - " + gl.resultStats.goalsK;				
							var rstats = gl.resultStats.stats;
							for(var i = 0; i < g.arr2.length; i++) {
								var g2 = g.arr2[i];
								if(g2 != null) {
									var p1 = gl.getPlayerData(g2.id);
									if(p1 !== null) {
										g.arr2[i].order = p1.order;
										g.arr2[i].gid = p1.gid;
									}
								}
							}
						
							document.getElementById("rtable1").innerHTML = _rtablePos(g.arr2,0,p.gid,rstats);
							document.getElementById("rtable2").innerHTML = _rtablePos(g.arr2,4,p.gid,rstats);
						
							for(var res1Name in gl.resultStats.players) {
								var res1 = gl.resultStats.players[res1Name];
								if(res1.username == p.username) {
									
									var rsquad = ""; //p.chars
									if(gl.playerChars != null) {
										for(var i = 0; i < res1.data.length; i++) {
											var ii = res1.data[i];
											if(ii >= 0 && ii < gl.playerChars.length) {
												var ch = gl.playerChars[ii];
												ch.exp = res1.exp[i];
												rsquad += _playerChar(ch, 0, false);
											}
										}
									}

									var rinfo = "";
									if(res1.gp1 != 0) {
										rinfo += `<div class="progressYCol"><span class="oi oi-tag hflip"></span>&nbsp;&nbsp;${res1.gp1}</div>`;
									}
									if(res1.pts != 0) {
										rinfo += `<div class="progressGCol"><img class="cupiconMini" src="img/cup${p.cup}.png"/>${res1.pts}</div>`;
									}
									if(res1.rating != 0) {
										rinfo += `<div class="progressWCol"><span class="oi oi-graph hflip"></span>&nbsp;&nbsp;${res1.rating}</div>`;
									}
									if((res1.flags&1) !== 0) {
										rinfo += `<div class="progressWCol">Drill slot opened</div>`;
									}
									if((res1.flags&2) !== 0) {
										rinfo += `<div class="progressWCol">Bootcamp ticket</div>`;
									}
									if((res1.flags&4) !== 0) {
										rinfo += `<div class="progressWCol">Store ticket</div>`;
									}
									if((res1.flags&8) !== 0) {
										rinfo += `<div class="progressWCol">Gift Unlocked</div>`;
									}

									document.getElementById("rsquad").innerHTML = rsquad;
									document.getElementById("rinfo").innerHTML = rinfo;
									
									updateCharImg();
									break;
								}
							}
						}
						break;
				}
			}
		}
	}
}
function parseCookie(cookie,s) {
	if(s === undefined) s = ';'; 
    var list = {};

	if(cookie) {
		var f = 0;
		var key = null;
		for(var i = 0; i < cookie.length; i++) {
			var ch = cookie[i];
			if(key === null) {
				if(ch === '=') {
					if(i-f > 0) {
						key = cookie.substring(f, i).trim();
						f = i+1;
					}
				}
			}
			else {
				if(ch === s) {
					var value = cookie.substring(f, i).trim();
					list[key] = value;
					key = null;
					f = i+1;
				}
			}
		}

		if(key !== null) {
			var value = cookie.substring(f, cookie.length).trim();
			list[key] = value;
			key = null;
		}
		
	}

    return list;
}
B.parseCookie = parseCookie;
var _cookieINIT = null;
function getCookie(name) {
	if(_cookieINIT === null) _cookieINIT = parseCookie(document.cookie);
	return _cookieINIT[name];
}
function toJSArray(buf) {
	var arr = new Array(buf.length);
	for(var i = 0; i < arr.length; i++) {
		arr[i] = buf[i];
	}
	return arr;
}
var _dataINIT = null;
var _dataINIT_STARTED = false;
var _dataINIT_QUEUE = [];
B.SQUAD_SIZE = 32;
B.STORE_SIZE = 16;
B.DATA_GAME = 1;
B.DATA_STORE = 2;
B.DATA_TRANSFERS = 4;
B.DATA_LENGTH = 3;
B.DATA_MASK = (1<<B.DATA_LENGTH)-1;

function initStorageCharData(storageItem) {
	storageItem = JSON.parse(storageItem);
	if(storageItem.game) {
		var arr = storageItem.game.chars;
		for(var i = 0; i < arr.length; i++) {
			var obj = arr[i];
			arr[i] = new CharData();
			arr[i].set(obj);
		}
	}
	if(storageItem.store) {
		var arr = storageItem.store.store;
		for(var i = 0; i < arr.length; i++) {
			var obj = arr[i];
			arr[i] = new CharData();
			arr[i].set(obj);
		}
	}
	return storageItem;
}
function handleData(xmlHttp) {
	var storageItem = window.localStorage.getItem("data");
	if(storageItem != null) {
		storageItem = initStorageCharData(storageItem);
	}
	var data = xmlHttp.response;
	if(data != null && data.type != null) {
		//console.log(data);
		switch(data.type) {
			case 0:

				return;
			case 1:
				_dataINIT = storageItem;
				break;
			case 2:
				if(storageItem === null || storageItem.username !== data.username) {
					storageItem = {username:data.username, stamps:[-1,-1,-1], game:null, store:null, transfers:null};
				}
				var t = data.update;
				if((t&B.DATA_GAME) !== 0) {
					var game = data.game;
					var charBuf = fromBase64(game.chars);
					charBuf.getByte();
					game.chars = CharData.fromBufArrLen(charBuf, B.SQUAD_SIZE);
					game.drills = toJSArray(fromBase64(game.drills).dataU8);
					game.gifts = toJSArray(fromBase64(game.gifts).dataU8);
					storageItem.game = game;
					storageItem.stamps[0] = game.stamp;
				}
				if((t&B.DATA_STORE) !== 0) {
					var store = data.store;
					store.store = CharData.fromBufArrLen(fromBase64(store.store), B.STORE_SIZE);
					storageItem.store = store;
					storageItem.stamps[1] = store.stamp;
				}
				if((t&B.DATA_TRANSFERS) !== 0) {
					storageItem.transfers = data.transfers;
					storageItem.stamps[2] = data.transfers.stamp;	
				}
				_dataINIT = storageItem;
				window.localStorage.setItem("data", JSON.stringify(storageItem));
				break;
		}
		for(var i = 0; i < _dataINIT_QUEUE.length; i++) {
			_dataINIT_QUEUE[i](_dataINIT);
		}
	}
	else {
		console.log("error data type undefined " + data);
	}
}
function getData(onData, type) {
	if(_dataINIT === null) {
		_dataINIT_QUEUE.push(onData);
		if(_dataINIT_STARTED) return;
		_dataINIT_STARTED = true;

		//console.log("Data request " + type.toString(2));

		var link = "/form/data";
		var storageItem = window.localStorage.getItem("data");
		if(storageItem != null) {
			storageItem = initStorageCharData(storageItem);

			var cookieCache = null;//getCookie("_cache");
			if(cookieCache != null) {
				var stamps = cookieCache.split(".");
				//console.log("Stamps");
				//console.log(stamps);
				//console.log(storageItem.stamps);
				if(stamps.length-1 === B.DATA_LENGTH) {
					if(stamps[B.DATA_LENGTH] !== storageItem.username) {
						storageItem.stamps = [-1, -1, -1];
					}
					else for(var i = 0; i < B.DATA_LENGTH; i++) {
						if(stamps[i] == storageItem.stamps[i]) {
							type = type&(~(1<<i));
						}
					}
				}
			}

			if(type === 0) {
				_dataINIT = storageItem;
				for(var i = 0; i < _dataINIT_QUEUE.length; i++) {
					_dataINIT_QUEUE[i](_dataINIT);
				}
				return;
			}
			else {
				link += "?t="+type;
				for(var i = 0; i < B.DATA_LENGTH; i++) {
					if((type&(1<<i)) !== 0) {
						link += "&"+ String.fromCharCode(97+i)+"="+storageItem.stamps[i];
					}
				}
			}
		}
		else {
			link += "?t="+type;
			for(var i = 0; i < B.DATA_LENGTH; i++) {
				if((type&(1<<i)) !== 0) {
					link += "&"+ String.fromCharCode(97+i)+"=-1";
				}
			}
		}

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.responseType = "json";
		xmlHttp.onreadystatechange = function() { 
			if(xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200) {
				handleData(xmlHttp);
			}
		};
		xmlHttp.addEventListener( 'error', function(e) {
			console.log("error getData " + e);
			//submit.innerHTML = "Register";
			//sending = false;
		});
		
		
		xmlHttp.open("POST", link, true);
		xmlHttp.send(null);
	}
	else { onData(_dataINIT); }
}
function sd(method, action, data, sdHandle, eHandle) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.responseType = "json";
	xmlHttp.onreadystatechange = function() { 
		if(xmlHttp.readyState == XMLHttpRequest.DONE) {
			if(xmlHttp.status == 200) {
				sdHandle(xmlHttp);
			}
			else {
				eHandle(xmlHttp, xmlHttp.status);
			}
		}
	};
	xmlHttp.addEventListener( 'error', function(e) {
		console.log("error sd " + e);
		eHandle(xmlHttp, e);
	});
	xmlHttp.open(method, action, true);
	xmlHttp.send(data);
}
var _varSendingData = false;
function sendData(text) {
	if(_varSendingData) {
		console.log("already sending data");
		return;
	}
	if(text.length < 128) {
		_varSendingData = true;
		var link = "/form/x";
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.responseType = "json";
		xmlHttp.timeout = 5000;
		xmlHttp.onreadystatechange = function() { 
			if(xmlHttp.readyState == XMLHttpRequest.DONE) {
				_varSendingData = false;
				handleData(xmlHttp);
			}
		};
		xmlHttp.ontimeout = function () {
		    console.error("timeout sendData");
			_varSendingData = false;
		};
		xmlHttp.addEventListener('error', function(e) {
			console.log("error sendData " + e);
			_varSendingData = false;
		});
		
		xmlHttp.open("POST", link, true);
		xmlHttp.send(text);
	}
	else {
		console.log("error send " + text.length);
	}
}
function isCookieOk() {
	return getCookie("_x") !== undefined;
}
function isLoggedIn() {
	return getCookie("_x") === "7";
}
function initCookie() {
	if(isCookieOk()) {
		var s = document.getElementById("cookiebar");
		if(s !== null) {
			s.hidden = true;
		}
	}
}
function cookieOK() {
	if(!isCookieOk()) {
		var d = new Date();
		d.setTime(d.getTime() + (1000*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = "_x=0;" + expires + ";path=/;SameSite=Lax";
		_cookieINIT = null;
		initCookie();
	}
}
function initContents() {
	var s = document.getElementById("contents");
	if(s !== null) {
		var str = `Contents <small><a data-toggle="collapse" href="#contentsList" aria-expanded="true">(hide)</a></small><ul id="contentsList" class="collapse show">`;
		var j = 1;
		var list = s.parentNode.childNodes;
		for(var i = 0; i < list.length; i++) {
			var a = list[i];
			if(a.nodeName == "H2") {
				if(a.id == "") a.id = "a"+j;
				str += `<li>${j} <a href=#${a.id}>${a.textContent}</a></li>`;
				j++;
			}
		}
		str += "</ul>";
		s.innerHTML = str;
		
		s.insertAdjacentHTML('afterend', `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<ins class="adsbygoogle"
			 style="display:block; text-align:center;"
			 data-ad-layout="in-article"
			 data-ad-format="fluid"
			 data-ad-client="ca-pub-5777679069627429"
			 data-ad-slot="3161922525"></ins>
		<script>
			 (adsbygoogle = window.adsbygoogle || []).push({});
		</script>`);
	}
}
function rndItem(arr) {
	var len = arr.length;
	if(len > 0) {
		var i = Math.floor(Math.random()*arr.length);
		if(i >= arr.length) { console.log("error rndItem"); i = arr.length-1; }
		return arr[i]; 
	}
	return null;
}
var _drillSelectedSlot = -1;
function _drillSelect(tag, x) {
	if(x === _drillSelectedSlot) return;
	_drillSelectedSlot = x;
	var item = $(tag);
	item.addClass('drillSelected').siblings()/*.not(item)*/.removeClass('drillSelected');
}
function _drillSelectable(d) {
	var drill = A.DRILL[d];
	var drillBg = _drillBgCol(drill);
	return `<div class="plusBtn trainingBoxBig" onclick='_drillSelect(this,${d});' ${drillBg}>${drill.icon}</div>`;
	/*return `<div class="row no-gutters">
		<div class="col-auto">
			<div class="plusBtn trainingBoxBig" onclick='console.log("drill"+${d});'>${drill.icon}</div>
		</div>
		<div class="col">
		  	<div>${drill.name}</div>
			<small>${drill.desc}</small>
		</div>
	</div>
	<br>`;*/
}
function _drillView(drills) {
	var str = "<div>";
	for(var i = 0; i < drills.length; i++) {
		var d = A.DRILL[drills[i]];
		//str += `<div class="plusBtn trainingBoxBig">${d.icon}</div>`;
		var icon = "";
		if(d.id > 1) icon = d.icon.replace("Big", "Min");
		var drillBg = _drillBgCol(d);
		str += `<div class="trainingBox" ${drillBg}>${icon}</div>`;
	}
	str += "</div>"
	return str;
}
function _drillDialogContent(data, ch) {
	_drillSelectedSlot = -1;
	var type = ch.type;

	var len = Math.min(A.DRILL.length, data.drills.length+data.gifts.length);
	var str = "Select a training or drill:<br><br><div>";
	var added = 0;
	var i, dr;
	for(i = (type===4)?2:5; i < len; i++) {
		if(A.DRILL[i].isGift()) break;
		if(data.drills[i] > 0) {
			str += _drillSelectable(i);
			added++;
		}
	}
	if(added === 0) {
		str = 'There are no trainings/drills. There are available at <a href="/store">store.</a>';
	}
	str += "<br><br>";
	str += "Gifts:<br><br>"
	var gifts = data.gifts;
	
	i = A.DRILL_GIFT_INDEX+((gifts[6] > 0)?6:((gifts[3] > 0)?3:0));
	dr = A.DRILL[i];
	if(gifts[dr.id-100] > 0) {
		str += _drillSelectable(i);
		added++;
	}
	i = A.DRILL_GIFT_INDEX+((gifts[7] > 0)?7:((gifts[4] > 0)?4:1));
	dr = A.DRILL[i];
	if(gifts[dr.id-100] > 0) {
		str += _drillSelectable(i);
		added++;
	}
	i = A.DRILL_GIFT_INDEX+((gifts[8] > 0)?8:((gifts[5] > 0)?5:2));
	dr = A.DRILL[i];
	if(gifts[dr.id-100] > 0) {
		str += _drillSelectable(i);
		added++;
	}
	i = A.DRILL_GIFT_INDEX+9;
	for(; i < len; i++) {
		dr = A.DRILL[i];
		if(dr.isGift() && gifts[dr.id-100] > 0) {
			str += _drillSelectable(i);
			added++;
		}
	}
	str += "</div>"
	return str;
}
function _giftDialogContent(ch, gifts) {
	_drillSelectedSlot = -1;
	var type = ch.type;
	var len = A.DRILL.length;
	var str = "<i>Offer part of your training to benefit your teammates:</i><br><br><div>";
	var added = 0;
	var i, dr;
	str += _drillSelectable(1);
	
	i = A.DRILL_GIFT_INDEX+((gifts[6] > 0)?6:((gifts[3] > 0)?3:0));
	dr = A.DRILL[i];
	if(gifts[dr.id-100] > 0) {
		str += _drillSelectable(i);
		added++;
	}
	i = A.DRILL_GIFT_INDEX+((gifts[7] > 0)?7:((gifts[4] > 0)?4:1));
	dr = A.DRILL[i];
	if(gifts[dr.id-100] > 0) {
		str += _drillSelectable(i);
		added++;
	}
	i = A.DRILL_GIFT_INDEX+((gifts[8] > 0)?8:((gifts[5] > 0)?5:2));
	dr = A.DRILL[i];
	if(gifts[dr.id-100] > 0) {
		str += _drillSelectable(i);
		added++;
	}
	i = A.DRILL_GIFT_INDEX+9;
	for(; i < len; i++) {
		dr = A.DRILL[i];
		if(dr.isGift() && gifts[dr.id-100] > 0) {
			str += _drillSelectable(i);
			added++;
		}
	}
	str += "</div>"
	return str;
}
var _yesSynnonyms = [
"Yes", "Yea", "Yup", "You bet", "Sure",
"Ok", "K",  "Okay", "Alright", "Sure thing",

 "Certainly", "Definitely", "Gladly", "Affirmative",
"Absolutely", "Naturally", "Good", 

"Yeah, yeah, yeah", "Fine", "Very well", "Obviously",
"Verily", "Surely",

'<span class="oi oi-thumb-up"></span>'

];
var _onModalOk = null;
function modalOk(type, data) {
	if(_onModalOk) { _onModalOk(type, data); }
}
function showModal(id, type) {
	var tag = document.getElementById(id);
	if(type > 0) {
		var text = document.getElementById(id+"Text");
		var title = document.getElementById(id+"Title");
		var ok = document.getElementById(id+"Yes");
		ok.innerHTML = rndItem(_yesSynnonyms);
		if(type >= 1000) {
			type = type-1000;
			
			// does chara have gift
				// if yes
			// list of gifts
			
			/*
			if(_dataINIT != null) {
				var data = _dataINIT.game;
				var i = _selectedSlot;
				if(i >= 0 && i < data.chars.length ) {
					var ch = data.chars[i];
					var tI = type-5;
					if(ch.training[tI] > 0) {
						ok.setAttribute("onclick", `modalOk(${type});`);
						title.innerHTML = `Training & Drills`;
						if(ch.training[tI] === 1) {
							text.innerHTML = _drillDialogContent(data, ch);
						}
						else {
							_drillSelectedSlot = 1;
							text.innerHTML = `Quit training/drill?`;
						}
					}
				}	
			}
			*/
			var gChars = _selectGameChars;
			//0 1 2 3   0 10 20 30
			//33 -> 30/10
			var gCh = (type/10)|0; //0 1 2 3   
			var gSlot = type-gCh*10; //0 1 2 3
			//console.log("char " + gCh + " slot " + gSlot);
			var gChar = null;
			if(gChars !== null && (gChar=gChars[gCh+_selectGameCharsOffset]) !== null && gChar.type !== 0) {
				ok.setAttribute("onclick", `modalOk(${gCh}, ${gSlot});`);
				title.innerHTML = `Gifts`;
				text.innerHTML = _giftDialogContent(gChar, gl.gifts);
			}
			
			
			/*
			if(ch.training[tI] === 1) {
				text.innerHTML = _drillDialogContent(data, ch);
			}
			else {
				_drillSelectedSlot = 1;
				text.innerHTML = `Quit training/drill?`;
			}*/
		}
		else if(type >= 400) {
			type = type-400;
			if(type < A.DRILL.length) {
				ok.setAttribute("onclick", `modalOk(40,${type});`);
				title.innerHTML = `<span class="oi oi-home progressYCol"></span> Refund training/drill <small><span class="oi oi-book progressWCol"></span></small>`;
				text.innerHTML = `Refund the following training/drill for <small class="progressGCol"><span class="oi oi-tag hflip"></span>&nbsp;${A.DRILL[type].getReturnPrice()}</small>?<br><br>`+_drill3(type);
			}
		}
		else if(type >= 300) {
			type = type-300;
			if(type < A.DRILL.length) {
				ok.setAttribute("onclick", `modalOk(30,${type});`);
				title.innerHTML = `<span class="oi oi-home progressYCol"></span> Order training/drill <small><span class="oi oi-book progressWCol"></span></small>`;
				text.innerHTML = `Order the following training/drill for <small class="progressYCol"><span class="oi oi-tag hflip"></span>&nbsp;${A.DRILL[type].val}</small>?<br><br>`+_drill3(type);
			}
		}
		else if(type >= 200) {
			type = type-200;
			if(_dataINIT != null) {
				var data = _dataINIT.game;
				var i = _selectedSlot;
				if(i >= 0 && i < data.chars.length) {
					var numChars = 0;
					for(var i2 = 0; i2 < data.chars.length; i2++) {
						if(data.chars[i2].type !== 0) {
							numChars++;
						}
					}
					if(numChars <= 4) {
						ok.setAttribute("onclick", `modalOk(0,${type});`);
						title.innerHTML = `<span class="oi oi-home progressYCol"></span> Release player <small><span class="oi oi-person"></span></small>`;
						text.innerHTML = `Squad has minimum size of 4 players. Cannot release players.`;
					}
					else {
						var ch = data.chars[i];
						ok.setAttribute("onclick", `modalOk(20,${type});`);
						title.innerHTML = `<span class="oi oi-home progressYCol"></span> Release player <small><span class="oi oi-person"></span></small>`;
						text.innerHTML = `Release player from Squad for <small><span class="oi oi-tag hflip progressYCol"></span>&nbsp;${ch.getReleasePrice()}</small>&nbsp;&nbsp;?<br><br>`+_playerChar(ch, 0, false);
						updateCharImg();				
					}
				}
				else { return; }
			}
			else { return; }
		}
		else if(type >= 100) {
			type = type-100;

			if(type === 50) {
				ok.setAttribute("onclick", `modalOk(15,${type});`);
				title.innerHTML = `<span class="oi oi-home progressYCol"></span> Reroll store <small><span class="oi oi-loop-circular hflip progressYCol"></span></small>`;
				if(_dataINIT != null && _dataINIT.game != null && _dataINIT.game.storeTicket > 0) {
					text.innerHTML = `Reroll store selection for <span><span class="oi oi-tag hflip progressYCol"></span>&nbsp;<small class="progressYCol">1 store ticket</small></span>?`;	
				}
				else {
					text.innerHTML = `Reroll store selection for <span><span class="oi oi-tag hflip progressYCol"></span>&nbsp;<small class="progressYCol">10000</small></span>?`;
				}
			}
			else if(_dataINIT != null) {
				var data = _dataINIT.store;
				var i = type;
				if(i >= 0 && i < data.store.length ) {
					if(calcCharSize(_dataINIT.game.chars) >= 32) {
						ok.setAttribute("onclick", `modalOk(11,${type});`);
						title.innerHTML = `<span class="oi oi-home progressYCol"></span> Recruit new player <small><span class="oi oi-person"></span></small>`;
						text.innerHTML = `Squad is full.`;
					}
					else {
						var ch = data.store[i];
						ok.setAttribute("onclick", `modalOk(10,${type});`);
						title.innerHTML = `<span class="oi oi-home progressYCol"></span> Recruit new player <small><span class="oi oi-person"></span></small>`;
						text.innerHTML = `Recruit the following player for <span><span class="oi oi-tag hflip progressYCol"></span>&nbsp;<small class="progressYCol">${ch.getBuyPrice()}</small></span>?<br><br><div style="text-align:center;">`+_storeChar(ch, 0, false, true)+"</div>";
						updateCharImg();
					}
				}
				else { return; }
			}
			else { return; }
		}
		else {
			switch(type) {
				case 1: case 2: case 3:
				if(_dataINIT != null) {
					var data = _dataINIT.game;
					var i = _selectedSlot;
					if(i >= 0 && i < data.chars.length ) {
						var ch = data.chars[i];
						if(ch.exp < 100) {
							return;
						}
					}
				}
				break;
			}
			switch(type) {
			case 1:
				ok.setAttribute("onclick", `modalOk(1);`);
				title.innerHTML = `<span class="oi oi-bar-chart"></span> Level Up <span class="oi oi-arrow-top"></span>`;
				text.innerHTML = `Add point to <span class="progressYCol"><span class="oi oi-bolt"></span>&nbsp;Strength</span>?`;
			break;
			case 2:
				ok.setAttribute("onclick", `modalOk(2);`);
				title.innerHTML = `<span class="oi oi-bar-chart"></span> Level Up <span class="oi oi-arrow-top"></span>`;
				text.innerHTML = `Add point to <span class="progressGCol"><span class="oi oi-flash hvflip"></span>&nbsp;Agility</span>?`;
			break;
			case 3:
				ok.setAttribute("onclick", `modalOk(3);`);
				title.innerHTML = `<span class="oi oi-bar-chart"></span> Level Up <span class="oi oi-arrow-top"></span>`;
				text.innerHTML = `Add point to <span class="progressRCol"><span class="oi oi-shield"></span>&nbsp;Defense</span>?`;
			break;
			case 4:
				ok.setAttribute("onclick", `modalOk(4);`);
				title.innerHTML = `<span class="oi oi-bar-chart"></span> Level Up <span class="oi oi-arrow-top"></span>`;
				text.innerHTML = `Add 100 points to <span class="progressWCol"><span class="oi oi-book"></span>&nbsp;Exp</span>?`;
			break;
			case 5:
			case 6:
			case 7:
			case 8:
				if(_dataINIT != null) {
					var data = _dataINIT.game;
					var i = _selectedSlot;
					if(i >= 0 && i < data.chars.length ) {
						var ch = data.chars[i];
						var tI = type-5;
						if(ch.training[tI] > 0) {
							ok.setAttribute("onclick", `modalOk(${type});`);
							title.innerHTML = `Training & Drills`;
							if(ch.training[tI] === 1) {
								text.innerHTML = (type==8)?_giftDialogContent(ch, data.gifts):_drillDialogContent(data, ch);
							}
							else {
								_drillSelectedSlot = 1;
								text.innerHTML = `Quit training/drill?`;
							}
						}
					}	
				}
			break;
			case 9:
				if(_dataINIT != null) {
					var data = _dataINIT.game;
					var i = _selectedSlot;
					if(i >= 0 && i < data.chars.length ) {
						var ch = data.chars[i];
						if(data.bootcampTicket <= 0 || ch.getNumOpenSlots() != 2) {
							return;
						}
					}
				}
				ok.setAttribute("onclick", `modalOk(9);`);
				title.innerHTML = `<span class="oi oi-bar-chart"></span> Bootcamp <span class="oi oi-arrow-top"></span>`;
				text.innerHTML = `Use <span class="progressWCol">1 bootcamp ticket</span> to expand training &amp; drill capacity?`;
			break;
			}
		}
	}

	$(tag).modal("show");
}
function _drillCol(d) {
	if(d.isDrill() && d.icon.length > 21) {
		var ch = d.icon[21];
		if(ch === 'W') return "W";
		else if(ch === 'Y') return "Y";
		else if(ch === 'G') return "G";
		else if(ch === 'R') return "R";
		else return "W";
	}
	else if(d.isGift()) {
		var ch = d.icon[21];
		if(ch === 'Y') return "Y";
		else if(ch === 'G') return "G";
		else if(ch === 'R') return "R";
		else return "W";
	}
	return "W";
}
function _drillBgCol(d) {
	if(d.isDrill() && d.icon.length > 21) {
		var ch = d.icon[21];
		if(ch === 'W') return "";
		else if(ch === 'Y') ch = 'si';
		else if(ch === 'G') ch = 'ry';
		else if(ch === 'R') ch = 'de';
		else return ""; 
		return `style="background:var(--fa${ch}li);"`;
	}
	else if(d.isGift()) {
		var ch = d.icon[21];
		if(ch === 'Y') ch = 'si';
		else if(ch === 'G') ch = 'ry';
		else if(ch === 'R') ch = 'de';
		else return `style="background:linear-gradient(#fff, #ffaffa, #fff);border-color: rgb(255, 166, 250);"`;
		return `style="background:linear-gradient(#fff, #ffaffa, var(--fa${ch}));border-color: rgb(255, 166, 250);"`;
	}
	return "";
}
function _drill(d,i) {
	var drill = A.DRILL[d];
	var drillBg = _drillBgCol(drill);
	return `<div class="row no-gutters">
		<div class="col-auto">
			<div class="plusBtn trainingBoxBig" onclick="showModal('modalDialog', ${5+i});" ${drillBg}>${drill.icon}</div>
		</div>
		<div class="col">
		  	<div>${drill.name}</div>
			<small>${drill.desc}</small>
		</div>
	</div>
	<br>`;
}
function _drills(ch) {
	var str = "";
	for(var i = 0; i < 4; i++) {
		var d = ch.training[i];
		if(d > 0) {
			str += _drill(d, i);
		}
	}
	return str;
}
function _drill2(d,i) {
	var drill = A.DRILL[d];
	var drillBg = _drillBgCol(drill);
	return `<div class="row no-gutters">
		<div class="col-auto">
			<div class="trainingBoxBig" ${drillBg}>${drill.icon}</div>
		</div>
		<div class="col-3">
		  	<div>${drill.name}</div>
			<small>${drill.desc}</small>
		</div>
		<div class="col-auto" style="margin-right:15px;">
			<div class="progressWCol" style="margin-top:9px;">${i}x</div>
		</div>
		<div class="col-auto" style="margin-right:15px;">
			<div class="progressYCol plusBtn hBtn" style="margin-top:9px;" onclick="showModal('modalDialog', ${300+d});"><span class="oi oi-tag hflip progressYCol"></span>&nbsp;&nbsp;${drill.val}</div>
		</div>
		<div class="col-auto">
			<div class="progressGCol plusBtn hBtn" style="margin-top:9px;" onclick="showModal('modalDialog', ${400+d});"><span class="oi oi-tag hflip progressGCol"></span>&nbsp;&nbsp;${drill.getReturnPrice()}</div>
		</div>
	</div>
	<br>`;
}
function _drill3(d) {
	var drill = A.DRILL[d];
	var drillBg = _drillBgCol(drill);
	return `<div class="row no-gutters">
		<div class="col-auto">
			<div class="plusBtn trainingBoxBig" ${drillBg}>${drill.icon}</div>
		</div>
		<div class="col">
		  	<div>${drill.name}</div>
			<small>${drill.desc}</small>
		</div>
	</div>
	<br>`;
}
function _drillStore(arr) {
	var str = "";
	for(var i = 2; i < A.DRILL.length; i++) {
		var dr = A.DRILL[i];
		if(dr.isBuyable()) {
			str += _drill2(i, arr[i]);
		}
	}
	return str;
}
var TEXT_TYPE = 0;
var TEXT_OBJ = null;
function initText(m) {
	TEXT_TYPE = m;
	var canvas = document.getElementById('teimg');
	var g = canvas.getContext('2d');
	g.font = "18px Arial";
	//10-110  20-50
	var x = Math.floor(10+Math.random()*100);
	var y = Math.floor(20+Math.random()*30);
	//g.fillStyle = "#FF0000";
	//g.fillRect(x-5,y-21,90,28);
	g.fillStyle = "#000000";
	g.fillText("click here", x, y); 
	
	canvas.onclick = function(e) {
		var ox = e.offsetX; 
		var oy = e.offsetY;
		if(ox !== undefined && oy !== undefined && ox >= 0 && ox < 200 && oy >= 0 && oy < 60 &&
			(ox < x-5 || oy < y-21 || ox > x+85 || oy > y+7)) return;
		canvas.onclick = null;
		TEXT_OBJ = {x:x, y:y, ox:ox, oy:oy};
		loadText();
	};
}
function initTextImage(b) {
	if(b.byteLength === 0) return;
	var terow = document.getElementById('terow');
	if(b.byteLength === 6) {
		var te = document.getElementById('te');
		var str = "";
		for(var i = 0; i < b.byteLength; i++) {
			str += String.fromCharCode(b[i]);
		}
		te.value = str;
		terow.hidden = true;
	}
	else {
		terow.hidden = false;
		//var canvas = document.createElement('canvas');
		//canvas.width = 200;
		//canvas.height = 60;
		var canvas = document.getElementById('teimg');
		var g = canvas.getContext('2d');
		var data = g.getImageData(0, 0, canvas.width, canvas.height);
		var d = data.data;
	
		//200, 60
		//x*h + y
		var x = 0;
		var y = 0;
		var i = 0;
		for(; i < b.byteLength; i++) {
			var a = b[i];
			for(var j = 0; j < 8; j++) {
				var v = ((a&(1<<j))!==0)?0:255;
				var off = 4*(x+y*200);
				d[off] = v;
				d[off+1] = v;
				d[off+2] = v;
				d[off+3] = 255;
			
				y++;
				if(y >= 60) { y=0; x++; } 
			}
		}
		for(; i < 1500; i++) {
			for(var j = 0; j < 8; j++) {
				var off = 4*(x+y*200);
				d[off] = 255;
				d[off+1] = 255;
				d[off+2] = 255;
				d[off+3] = 255;
				y++;
				if(y >= 60) { y=0; x++; } 
			}
		}
		g.putImageData(data, 0, 0); 
		//return canvas;
	}
}
function loadText() {
	try {
		if(TEXT_TYPE === 0 || TEXT_OBJ === null) return;
		const XHR = new XMLHttpRequest();
		XHR.responseType = "arraybuffer";
		XHR.onreadystatechange = function() {
			if(this.readyState === XMLHttpRequest.DONE) {
				if(this.status === 200) {
					var arrayBuffer = XHR.response; 
					if (arrayBuffer) {
						var byteArray = new Uint8Array(arrayBuffer);
						initTextImage(byteArray);
					}
				}
				else {
					
				}
			}
		};
		XHR.addEventListener( 'error', function(event) {
			console.log("error");
		
		});
		XHR.open('POST', '/form/te', true);
		XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		XHR.send("m="+TEXT_TYPE+"&x="+TEXT_OBJ.x+"&y="+TEXT_OBJ.y+"&ox="+TEXT_OBJ.ox+"&oy="+TEXT_OBJ.oy);
	}
	catch(e) {
		console.log(e.stack);	
	}	
}
var _charMaskCanvas = null;
var _charMaskCanvasG = null; 
var _charMaskCanvasData = null;
var _charMaskCanvasAsync = [];
var _charMaskCanvasMini = null;
var _charMaskCanvasMiniG = null; 
var _charMaskCanvasMiniData = null; 
//var _charMaskCanvasMiniSky = new THREE.Color(0xB1E1FF); 
//var _charMaskCanvasMiniGround = new THREE.Color(0xB97A20); 
var _charMaskCanvasMiniSky = { r: 1.0, g: 1.0, b: 1.0 };//new THREE.Color(0xffffff); 
var _charMaskCanvasMiniGround = { r: 0.7764705882352941, g: 0.6980392156862745, b: 0.47843137254901963 }; //new THREE.Color(0xc6b27a); 
function initCharMask() {
	if(_charMaskCanvasMini != null) return;
	_charMaskCanvasMini = document.createElement('canvas');
	_charMaskCanvasMini.width = 90;
	_charMaskCanvasMini.height = 90;
	_charMaskCanvasMiniG = _charMaskCanvasMini.getContext('2d');
	_charMaskCanvasMiniData = _charMaskCanvasMiniG.getImageData(0, 0, 90, 90);

	var img1 = new Image();
    img1.onload = function () {
		_charMaskCanvas = document.createElement('canvas');
		_charMaskCanvas.width = 720;
		_charMaskCanvas.height = 720;
		_charMaskCanvasG = _charMaskCanvas.getContext('2d');
        _charMaskCanvasG.drawImage(img1, 0, 0);
		_charMaskCanvasData = _charMaskCanvasG.getImageData(0, 0, 720, 720);
		if(_charMaskCanvasData !== null) {
			for(var i = 0; i < _charMaskCanvasAsync.length; i++) {
				var item = _charMaskCanvasAsync[i];
				setCharImage(item.img, item.x, item.y, item.hairCol, item.skinCol);
			}
		}
    };

    img1.src = 'img/chars.png';	
}
function setCharImage(img, x0, y0, hairCol, skinCol) {
	if(_charMaskCanvasMini === null) {
		initCharMask();
	}
	if(_charMaskCanvasData === null) {
		_charMaskCanvasAsync.push({"img":img, "x":x0, "y":y0, "hairCol": hairCol, "skinCol": skinCol });
	}
	else {
		var b0 = _charMaskCanvasData.data;
		var b1 = _charMaskCanvasMiniData.data;

		//var eyeCol = new THREE.Color( 0x5C443A );
		//var eyeCol = { r: 0.3607843137254902, g: 0.26666666666666666, b: 0.22745098039215686 };
		var eyeCol = { r: 0.18, g: 0.13, b: 0.11 };
		var sky = _charMaskCanvasMiniSky;
		var ground = _charMaskCanvasMiniGround;

		var bgX = 4+(x0>>2)+((y0>>2)<<1);
		var bgY = 7;

		for(var y = 0; y < 90; y++) {
			var xOff = y*4*90;
			var xOff2 = x0*4*90+(y+y0*90)*4*720;
			var xOff3 = bgX*4*90+(y+bgY*90)*4*720;
			for(var x = 0; x < 90; x++, xOff+=4, xOff2+=4, xOff3+=4) {
				var r = b0[xOff2];
				var g = b0[xOff2+1];
				var b = b0[xOff2+2];
				var a = b0[xOff2+3];

				var max = Math.max(r, Math.max(g,b));
				var min = Math.min(r, Math.min(g,b));

				if(max-min > 50) {
					var rMult = r/255.0;
					var gMult = g/255.0;
					var bMult = b/255.0;

					var aMult = (r+g+b)/255.0;

					r = (rMult*hairCol.r + gMult*skinCol.r + bMult*eyeCol.r)/aMult;
					g = (rMult*hairCol.g + gMult*skinCol.g + bMult*eyeCol.g)/aMult;
					b = (rMult*hairCol.b + gMult*skinCol.b + bMult*eyeCol.b)/aMult;

					aMult = 2.0*(aMult-0.5);

					r *= mix(ground.r, sky.r, aMult);
					g *= mix(ground.g, sky.g, aMult);
					b *= mix(ground.b, sky.b, aMult);

					/*r = rMult*hairCol.r + gMult*skinCol.r + bMult*eyeCol.r;
					g = rMult*hairCol.g + gMult*skinCol.g + bMult*eyeCol.g;
					b = rMult*hairCol.b + gMult*skinCol.b + bMult*eyeCol.b;

					aMult = 2.0*(aMult-0.5);

					r *= mix(ground.r, sky.r, aMult);
					g *= mix(ground.g, sky.g, aMult);
					b *= mix(ground.b, sky.b, aMult);*/

					r = Math.floor(Math.min(r*255.0,255));
					g = Math.floor(Math.min(g*255.0,255));
					b = Math.floor(Math.min(b*255.0,255));
				}

				b1[xOff] = (a*r + ((255-a)*b0[xOff3]))/255;	
				b1[xOff+1] = (a*g + ((255-a)*b0[xOff3+1]))/255;	
				b1[xOff+2] = (a*b + ((255-a)*b0[xOff3+2]))/255;	
				b1[xOff+3] = 255;		
			}
		}
		_charMaskCanvasMiniG.putImageData(_charMaskCanvasMiniData, 0, 0);
		img.src = _charMaskCanvasMini.toDataURL("image/png", 1.0);
	}
}
function updateCharImg() {
	var elements = document.querySelectorAll('[data-charimg]');
	for(var i = 0; i < elements.length; i++) {
		var e = elements[i];
		var data = e.dataset.charimg.split(";");
		var type = Number(data[0]);
		var beard = Number(data[1]);
		var hair = Number(data[2]);
		var hairCol = B.HAIR_COLOR[Number(data[3]) % B.HAIR_COLOR.length];
		var skinCol = B.SKIN_COLOR[Number(data[4]) % B.SKIN_COLOR.length];
		var x = beard+((type-1) & 1)*4;
		var y = hair+((type-1)>>1)*4;
		e.removeAttribute("data-charimg");
		setCharImage(e, x, y, hairCol, skinCol);
	}
} 
if (typeof module !== 'undefined') {
	module.exports.B = B;
	module.exports.CharData = CharData;
	module.exports.PlayerData = PlayerData;
	module.exports.GameData = GameData;
}








