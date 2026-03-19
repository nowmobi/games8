"use strict";

const DEG_TO_RAD = Math.PI/180.0;
const TICK_MS = 100;
const TICK_MS_INV = 1.0/TICK_MS;

const RECT_L = -30;
const RECT_R = 30;
const RECT_T = -48;
const RECT_B = 48;

const MAX_UINT = 65535;

const MSG_GAME_TIME = 7;
const MSG_PLAYER_DATA = 9;
const MSG_GET_ALL_CHAR = 10;
const MSG_CHAR_DATA_CACHED = 19;
const MSG_CHAR_DATA = 20;
const MSG_CHAR_TCK = 21;

const MSG_CLIENT_MOVEMENT = 70;
const MSG_CLIENT_TACKLE = 71;

const SQRT_2_INV = 0.7071067811865476;
var INTER_MAX_ROT_ANGLE = 10;
var INTER_MAX_SPD_CHAR = 0.75; //3;
var INTER_MAX_SPD_BALL = 70;

var BZ_TEST = 0;

class A { }

A.MSG_EXIT = 8;

A.GOAL_INNER_BOX_WIDTH_RAD = 9.15;
A.GOAL_INNER_BOX_HEIGHT = 8.0;

A.GOAL_OUTER_BOX_WIDTH_RAD = 17.5;
A.GOAL_OUTER_BOX_HEIGHT = 18.0;

A.GOALS_RAD = 5.75 -0.2 -0.3;
A.GOALS_Z = 2.4+0.3;
A.GOALKEEPER_BALL_PICK_Z = 1;
A.GOALKEEPER_BALL_PICK_SPD_RUN = 5;
A.GOALKEEPER_BALL_PICK_SPD = 15;
A.GOALKEEPER_BALL_PICK_DIST = 1.5;
A.GOALKEEPER_BALL_PICK_DELAY = 10;
A.GOALKEEPER_BALL_PASS_DELAY_STEPS = 5;

A.GOALKEEPER_BALL_FOLLOW_SCALE = 0.25;
A.GOALKEEPER_MAX_X_DIST = 5;
A.GOALKEEPER_FACE_DIAGONAL = 4;

A.GOALKEEPER_TACKLE_DELAY = 6;
A.GOALKEEPER_TACKLE_START_RADIUS = 15;
A.GOALKEEPER_TACKLE_RADIUS = 20;

A.GOALKEEPER_DIVE_MAX_DIST = 7.0 + 0.5;
A.GOALKEEPER_DIVE_DELAY = 35;
A.GOALKEEPER_START_DIVE_RADIUS = 48;

A.START_POS = [-15.0, 25.0, 15.0, 25.0, -12.0, 35.0, 12.0, 35.0];
A.START_POS_MIDDLE = [0.0, 9.0, 15.0, 25.0, -12.0, 35.0, 12.0, 35.0];

A.DASH_STEPS = 6;
//A.DASH_DELAY_STEPS = 20;

A.DASH_SPD_0 = 20;
A.DASH_SPD_100 = 25;

A.DASH_DELAY_STEPS_0 = 67;
A.DASH_DELAY_STEPS_100 = 31;

A.DASH_DELAY_MIDFIELD_STEPS_0 = 25;
A.DASH_DELAY_MIDFIELD_STEPS_100 = 25;

A.RUN_SPEED_SUB_BALL = 2.0;

A.VAR_RUN_SPEED_0 = 10.0;
A.VAR_RUN_SPEED_100 = 13.5;

A.VAR_TCK_DIST_0 = 7.5;
A.VAR_TCK_DIST_100 = 17.0;

A.VAR_TCK_BALL_SPEED_MULT = 2.5;
	
A.TCK_DELAY_STEPS = 12;
A.TCK_GOT_BALL_MAX_DELAY_STEPS = 0;
A.TCK_TCK_BALL_MAX_DELAY_STEPS = 5;
A.TCK_NOBALL_BALL_DELAY_STEPS = 18;
A.TACKLED_DELAY_STEPS = 12;
A.BALL_DELAY_STEPS = 5;

A.PLAYER_RAD = 1.5;
A.TCK_DIST = A.PLAYER_RAD;

A.CHARGE_SPEED_0 = 0.55;
A.CHARGE_SPEED_100 = 1.7;
A.CHARGE_SPEED_MIDFIELDER_100 = 1.1;

A.GRAVITY = 62.5;
A.BALL_MIN_Z_SPD = 6;
A.BALL_AIR_SPD = 10;
A.BALL_PICK_DIST = A.PLAYER_RAD*1.5;
A.BALL_HEAD_DIST = A.PLAYER_RAD*3.0;
A.BALL_TCK_DIST = A.PLAYER_RAD*3.0;
A.BALL_SPD = 30;
A.BALL_POS_RAD = A.PLAYER_RAD*1.0;
A.BALL_PICK_DELAY_STEPS = 3;
A.GOAL_ANIM_STEPS = 40;

A.HEAD_STEPS = 5;
A.HEAD_DELAY_STEPS = A.HEAD_STEPS;
A.BALL_HEAD_MIN_SPD = 10;
A.BALL_HEAD_MAX_SPD = 35;
A.BALL_TCK_MIN_SPD = 10;
A.BALL_TCK_MAX_SPD = 50;
A.BALL_MAX_SPD = 300;
A.BALL_TCK_Z = 1;
A.BALL_HEAD_MIN_Z = 1;
A.BALL_HEAD_MAX_Z = 7;
A.BALL_HEAD_RADIUS = 10;
A.BALL_PICK_SPD = 40;
A.BALL_PICK_Z = 1;
A.BALL_SCALE = 0.8;
A.BALL_Z_SCALE = 2;
A.BALL_VOLLEY_SPD_Z_MIN = 25;
A.BALL_VOLLEY_SPD_Z_MAX = 35;
A.BALL_VOLLEY_SPD_MIN = 25;
A.BALL_VOLLEY_SPD_MAX = 35;

A.BALL_PASS_Z = 0.5;
A.BALL_PASS_SPD_MIN = 40;
A.BALL_PASS_SPD_MAX = 60;
A.BALL_PASS_SPD_FORWARD_MIN = 40;
A.BALL_PASS_SPD_FORWARD_MAX = 80;
A.PLAYER_PASS_SPD = 1;

A.CHAR_AUTO_SWITCH = true;
A.CHAR_SWITCH_DIST_ANGLE = 5.0 * Math.PI / 180.0;
A.CHAR_SWITCH_ANGLE = 60.0 * Math.PI / 180.0;
A.CHAR_SWITCH_WALL = 1.0;
A.MOUSE_CAPTURE = false;
A.MOUSE_CAPTURE_SPEED = 1.0;

A.MSG_GAME_NAMES = 3;
A.MSG_GAME_INIT = 5;
A.MSG_GSTEP = 17;
A.MSG_SYNC_START = 50;
A.MSG_SYNC_REPLY = 51;
A.MSG_PING = 52;
A.MSG_CHAR_DASH = 22;
A.MSG_CHAR_HEAD = 23;
A.MSG_BALL = 24;
A.MSG_GOALKEEPER_DATA = 25;
A.MSG_CHAR_PASS_START = 26;
A.MSG_CHAR_VOLLEY_START = 28;
A.MSG_SET_CHAR = 77;
A.MSG_SPECTATORS_FULL = 80;
A.MSG_GAME_RESULTS = 81;

A.MSG_SETTINGS = 11;
A.MSG_CLIENT_SYNC_REPLY = 51;
A.MSG_CLIENT_JUMP = 72;
A.MSG_CLIENT_DASH = 73;
A.MSG_CLIENT_PASS_START = 26;
A.MSG_CLIENT_PASS_END = 27;
A.MSG_CLIENT_VOLLEY_START = 28;
A.MSG_CLIENT_VOLLEY_END = 29;
A.MSG_CLIENT_SET_CHAR = 77;
A.MSG_DEBUG_POS = 100;
A.MSG_DEBUG_SET_VARS = 1;
A.MSG_DEBUG_SKIPPED_FRAME = 102;

A.GOALKEEPER_START_DIVE_RADIUS_SQ = A.GOALKEEPER_START_DIVE_RADIUS*A.GOALKEEPER_START_DIVE_RADIUS;
A.GOALKEEPER_TACKLE_START_RADIUS_SQ = A.GOALKEEPER_TACKLE_START_RADIUS*A.GOALKEEPER_TACKLE_START_RADIUS;
A.GOALKEEPER_TACKLE_RADIUS_SQ = A.GOALKEEPER_TACKLE_RADIUS*A.GOALKEEPER_TACKLE_RADIUS;
A.BALL_HEAD_RADIUS_SQ = A.BALL_HEAD_RADIUS*A.BALL_HEAD_RADIUS;
A.BALL_CIRCUM = Math.PI * 2.0 * A.BALL_SCALE;
A.BALL_CIRCUM_INV = 1.0/A.BALL_CIRCUM;
A.BALL_ROTATE_UNIT = Math.PI*2.0*A.BALL_CIRCUM_INV;
A.GRAVITY_INV = 1.0/A.GRAVITY;
A.TCK_DIST_SQ = A.TCK_DIST*A.TCK_DIST;
A.BALL_PICK_DIST_SQ = A.BALL_PICK_DIST*A.BALL_PICK_DIST;
A.GOALS_L =-A.GOALS_RAD;
A.GOALS_R = A.GOALS_RAD;

class StatMult {
	constructor(str, agi, def, head) {
		this.str = str;
		this.agi = agi;
		this.def = def;
		this.head = head;
	}
	max(v) {
		this.str = Math.max(this.str, v.str);
		this.agi = Math.max(this.agi, v.agi);
		this.def = Math.max(this.def, v.def);
		this.head = Math.max(this.head, v.head);
	}
}
/*A.TRAINING_FORWARD = 1;
A.TRAINING_MIDFIELD = 2;
A.TRAINING_DEFENDER = 4;

A.DRILL_DASH_TURN = 8;
A.DRILL_TEAM_TACKLE = 16;
A.DRILL_DRIBBLE = 32;*/
class Drill {
	constructor(id, name, icon, desc, str, agi, def, exp, luck, flags, val, limit=8) {
		this.id = id;
		this.name = name;
		this.icon = icon;
		this.desc = desc;
		this.str = str;
		this.agi = agi;
		this.def = def;
		this.exp = exp;
		this.luck = luck;
		this.flags = flags;
		this.val = val;
		this.limit = limit;
	}
	getReturnPrice() {
		return Math.floor(this.val*0.5);
	}
	isBuyable() {
        return !this.isGift() && this.val > 0;
    }
    isDrill() {
    	return this.id > 1 && !this.isGift();
    }
	isGift() {
        return this.id >= 100;
    }
    drillIndex() {
        for(var i = 0; i < A.DRILL.length; i++) if(A.DRILL[i].id === this.id) return i;
        return 0;
    }
}

class Field {
	constructor(drag, bounceXY, bounceZ) {
		this.fieldDrag = drag; 
		this.bounceXY = bounceXY;
		this.bounceZ = bounceZ;
	}
}
//                      10
//var FIELDS = [new Field(1.0,0.5,0.75)];

	A.RECT_L = -30;
	A.RECT_R = 30;
	A.RECT_T = -48;
	A.RECT_B = 48;
	A.GOAL_INNER_BOX_WIDTH_RAD = 9.15;
	A.GOAL_INNER_BOX_HEIGHT = 8.0;
	A.GOAL_OUTER_BOX_WIDTH_RAD = 17.5;
	A.GOAL_OUTER_BOX_HEIGHT = 18.0;
	A.GOALS_RAD = 5.25;
	A.GOALS_Z = 2.7;
	A.GOALKEEPER_BALL_PICK_Z = 1.0;
	A.GOALKEEPER_BALL_PICK_SPD_RUN = 5.0;
	A.GOALKEEPER_BALL_PICK_SPD = 15.0;
	A.GOALKEEPER_BALL_PICK_DIST = 1.5;
	A.GOALKEEPER_BALL_PICK_DELAY = 10;
	A.GOALKEEPER_BALL_PASS_DELAY_STEPS = 5;
	A.GOALKEEPER_BALL_FOLLOW_SCALE = 0.25;
	A.GOALKEEPER_MAX_X_DIST = 5.0;
	A.GOALKEEPER_FACE_DIAGONAL = 4.0;
	A.GOALKEEPER_TACKLE_DELAY = 6;
	A.GOALKEEPER_TACKLE_START_RADIUS = 15.0;
	A.GOALKEEPER_TACKLE_RADIUS = 20.0;
	A.GOALKEEPER_DIVE_MAX_DIST = 7.5;
	A.GOALKEEPER_DIVE_DELAY = 35;
	A.GOALKEEPER_START_DIVE_RADIUS = 48.0;
	A.GOALKEEPER_SPEED = [5.0, 15.0, 10.0, 0.0, 10.0, 0.0];
	A.GOALKEEPER_SPEED_5 = [4.5, 14.0, 9.0, 0.0, 9.0, 0.0];
	A.GOALKEEPER_SPEED_0 = [4.0, 13.0, 8.0, 0.0, 8.0, 0.0];
	A.START_POS = [-15.0, 25.0, 15.0, 25.0, -12.0, 35.0, 12.0, 35.0];
	A.START_POS_MIDDLE = [0.0, 9.0, 15.0, 25.0, -12.0, 35.0, 12.0, 35.0];
	A.HAIR_VOLUME = [0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 2.0, 2.0, 0.0, 4.0, 1.0, 0.0, 0.0, 1.0, 2.0, 0.0];
	A.DASH_STEPS = 6;
	A.DASH_SPD_0 = 20.0;
	A.DASH_SPD_100 = 25.0;
	A.DASH_DELAY_STEPS_0 = 67;
	A.DASH_DELAY_STEPS_100 = 31;
	A.DASH_DELAY_MIDFIELD_STEPS_0 = 25;
	A.DASH_DELAY_MIDFIELD_STEPS_100 = 25;
	A.RUN_SPEED_SUB_BALL = 2.0;
	A.VAR_RUN_SPEED_0 = 10.0;
	A.VAR_RUN_SPEED_100 = 13.5;
	A.VAR_TCK_DIST_0 = 7.5;
	A.VAR_TCK_DIST_100 = 17.0;
	A.VAR_TCK_BALL_SPEED_MULT = 2.5;
	A.TCK_DELAY_STEPS = 12;
	A.TCK_GOT_BALL_MAX_DELAY_STEPS = 0;
	A.TCK_TCK_BALL_MAX_DELAY_STEPS = 5;
	A.TCK_NOBALL_BALL_DELAY_STEPS = 18;
	A.TACKLED_DELAY_STEPS = 12;
	A.BALL_DELAY_STEPS = 5;
	A.PLAYER_RAD = 1.5;
	A.TCK_DIST = 1.5;
	A.CHARGE_SPEED_0 = 0.55;
	A.CHARGE_SPEED_100 = 1.7;
	A.CHARGE_SPEED_MIDFIELDER_100 = 1.1;
	A.GRAVITY = 62.5;
	A.BALL_MIN_Z_SPD = 6.0;
	A.BALL_AIR_SPD = 10.0;
	A.BALL_PICK_DIST = 2.25;
	A.BALL_HEAD_DIST = 4.5;
	A.BALL_TCK_DIST = 4.5;
	A.BALL_SPD = 30.0;
	A.BALL_POS_RAD = 1.5;
	A.BALL_PICK_DELAY_STEPS = 3;
	A.GOAL_ANIM_STEPS = 40;
	A.HEAD_STEPS = 5;
	A.HEAD_DELAY_STEPS = 5;
	A.BALL_HEAD_MIN_SPD = 10.0;
	A.BALL_HEAD_MAX_SPD = 35.0;
	A.BALL_TCK_MIN_SPD = 10.0;
	A.BALL_TCK_MAX_SPD = 50.0;
	A.BALL_MAX_SPD = 300.0;
	A.BALL_TCK_Z = 1.0;
	A.BALL_HEAD_MIN_Z = 1.0;
	A.BALL_HEAD_MAX_Z = 7.0;
	A.BALL_HEAD_RADIUS = 10.0;
	A.BALL_PICK_SPD = 40.0;
	A.BALL_PICK_Z = 1.0;
	A.BALL_SCALE = 0.8;
	A.BALL_Z_SCALE = 2.0;
	A.BALL_VOLLEY_SPD_Z_MIN = 25.0;
	A.BALL_VOLLEY_SPD_Z_MAX = 35.0;
	A.BALL_VOLLEY_SPD_MIN = 25.0;
	A.BALL_VOLLEY_SPD_MAX = 35.0;
	A.BALL_PASS_Z = 0.5;
	A.BALL_PASS_SPD_MIN = 40.0;
	A.BALL_PASS_SPD_MAX = 60.0;
	A.BALL_PASS_SPD_FORWARD_MIN = 40.0;
	A.BALL_PASS_SPD_FORWARD_MAX = 80.0;
	A.PLAYER_PASS_SPD = 1.0;
	A.GIFT = 0;
	A.TRAINING_FORWARD = 3;
	A.TRAINING_MIDFIELD = 6;
	A.TRAINING_DEFENDER = 9;
	A.DRILL_AGILE_CHARGER = 12;
	A.DRILL_BACKSPIN = 15;
	A.DRILL_BOLD_POWER = 18;
	A.DRILL_HIGH_LOB = 21;
	A.DRILL_DRIBBLE = 24;
	A.DRILL_DASH_TURN = 27;
	A.DRILL_SLOW_DASH = 32;
	A.DRILL_DASH_STACKER = 35;
	A.DRILL_MEGA_DASH = 38;
	A.DRILL_ADRENALINE = 41;
	A.DRILL_ATTENTIVE_DEFENDER = 44;
	A.DRILL_BALL_DEFENDER = 47;
	A.DRILL_STRONG_DEFENDER = 50;
	A.DRILL_SLOW_DEFENDER = 53;
	A.DRILL_QUICK_STANDER = 56;
	A.DRILL_AFRO_CATCHER = 59;
	A.DRILL_REBOUND_RADIUS = 64;
	A.DRILL_HIGH_JUMPER = 67;
	A.DRILL_JUMPER = 70;
	A.DRILL_JOKER = 73;
	A.DRILL = [
		new Drill(0, "None", "", "", 0, 0, 0, 0, 0, 0, 0), 
		new Drill(1, "Open", "<span class=\"progressWCol oi oi-plus iconBig\"></span>", "The character has free time & energy to undergo another training/drill.", 0, 0, 0, 0, 0, 0, 0), 
		new Drill(2, "Forward Training", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-bolt\"></span></span>", "Intensive shooting training.", 0, 0, 0, 0, 0, A.TRAINING_FORWARD, 50000, 1), 
		new Drill(3, "Midfield Training", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-flash hvflip\"></span></span>", "Intensive agility training.", 0, 0, 0, 0, 0, A.TRAINING_MIDFIELD, 50000, 1), 
		new Drill(4, "Defender Training", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-shield\"></span></span>", "Intensive defense training.", 0, 0, 0, 0, 0, A.TRAINING_DEFENDER, 50000, 1), 
		new Drill(5, "+7 STR", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-bolt\"></span>&nbsp;7</span>", "Advanced strength training drill.", 7, 0, 0, 0, 0, 0, 10000), 
		new Drill(6, "+7 AGI", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-flash hvflip\"></span>&nbsp;7</span>", "Advanced agility training drill.", 0, 7, 0, 0, 0, 0, 10000), 
		new Drill(7, "+7 DEF", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-shield\"></span>&nbsp;7</span>", "Advanced defense training drill.", 0, 0, 7, 0, 0, 0, 10000), 
		new Drill(8, "Agile Charger", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-move\"></span></span>", "Learn how to move better while charging a kick.", 0, 0, 0, 0, 0, A.DRILL_AGILE_CHARGER, 30000, 3), 
		new Drill(9, "Backspin Lob", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-action-undo\" style=\"rotate: -45deg;\"></span></span>", "Learn how to apply backspin to loft kick, adjusting the spin angle based on current movement.", 0, 0, 0, 0, 0, A.DRILL_BACKSPIN, 35000), 
		new Drill(10, "Bold Power", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-person\"></span></span>", "Improve the strenght of heading ball. The less hair, the bolder the effect.", 0, 0, 0, 0, 0, A.DRILL_BOLD_POWER, 25000, 1), 
		new Drill(11, "High Lob", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-action-redo\" style=\"rotate: -135deg;\"></span></span>", "Learn how to shoot higher loft kick.", 0, 0, 0, 0, 0, A.DRILL_HIGH_LOB, 25000), 
		new Drill(12, "Dribble", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-aperture\" style=\"rotate: -45deg;\"></span></span>", "Learn how to efficiently dribble the ball.", 0, 0, 0, 0, 0, A.DRILL_DRIBBLE, 30000, 1), 
		new Drill(13, "Dash Turn", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-infinity\" style=\"rotate: -45deg;scale: 1.25;\"></span></span>", "Learn how to turn while dashing.", 0, 0, 0, 0, 0, A.DRILL_DASH_TURN, 35000, 1), 
		new Drill(14, "Slow Dash", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-ellipses\" style=\"rotate: -45deg;\"></span></span>", "Learn how to dash slower but over a larger distance.", 0, 0, 0, 0, 0, A.DRILL_SLOW_DASH, 25000, 1), 
		new Drill(15, "Dash Stacker", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-media-skip-forward\" style=\"rotate: -45deg;\"></span></span>", "Learn how to stack up to 50% of dash energy.", 0, 0, 0, 0, 0, A.DRILL_DASH_STACKER, 35000), 
		new Drill(16, "Mega Dash", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-arrow-thick-top\" style=\"rotate: 45deg;scale: 1.25;\"></span></span>", "Learn how to dash for 50% longer, but rest twice as much.", 0, 0, 0, 0, 0, A.DRILL_MEGA_DASH, 30000), 
		new Drill(17, "Adrenaline", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-droplet\" ></span></span>", "When in control of ball and opponent attemts a tackle, regain 25% dash energy and increase dash distance by 50% if dashing.", 0, 0, 0, 0, 0, A.DRILL_ADRENALINE, 50000), 
		new Drill(18, "Attentive Defender", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-flag\" style=\"rotate: -45deg;\"></span></span>", "Pay attention to tackle only players on the other team.", 0, 0, 0, 0, 0, A.DRILL_ATTENTIVE_DEFENDER, 35000, 1), 
		new Drill(19, "Ball Defender", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-aperture\"></span></span>", "Pay attention to tackle only players with ball.", 0, 0, 0, 0, 0, A.DRILL_BALL_DEFENDER, 35000, 1), 
		new Drill(20, "Strong Defender", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-media-skip-forward\" style=\"rotate: -45deg;\"></span></span>", "Tackling someone with ball will cause them to stay down longer.", 0, 0, 0, 0, 0, A.DRILL_STRONG_DEFENDER, 30000), 
		new Drill(21, "Slow Defender", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-ellipses\" style=\"rotate: -45deg;\"></span></span>", "Learn how to tackle slower but over a larger distance.", 0, 0, 0, 0, 0, A.DRILL_SLOW_DEFENDER, 30000, 1), 
		new Drill(22, "Quick Stander", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-arrow-thick-top\"></span></span>", "Learn how to stand up faster after missing a tackle or being tackled without ball.", 0, 0, 0, 0, 0, A.DRILL_QUICK_STANDER, 35000, 1), 
		new Drill(23, "Afro Catcher", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-play-circle\" style=\"rotate: -90deg;\"></span></span>", "Learn how to catch loft kicks by using head. If growing an afro, use it to catch ball instead of heading it.", 0, 0, 0, 0, 0, A.DRILL_AFRO_CATCHER, 47120, 1), 
		new Drill(24, "Rebound Radius", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-target\" style=\"rotate: -45deg;\"></span></span>", "Learn how to rebound a ball by tackling and heading from longer distance.", 0, 0, 0, 0, 0, A.DRILL_REBOUND_RADIUS, 25000, 1), 
		new Drill(25, "High Jumper", "<span class=\"progressWCol iconBig\"><span class=\"oi oi-chevron-top\"></span></span>", "Learn how to jump higher and head high ball.", 0, 0, 0, 0, 0, A.DRILL_HIGH_JUMPER, 25000, 1), 
		new Drill(26, "Jumper", "<span class=\"progressWCol iconBig\"><span class=\"oi oi-arrow-thick-top\"></span></span>", "Learn how to increase mobility by jumping when not in control of ball.", 0, 0, 0, 0, 0, A.DRILL_JUMPER, 25000, 1), 
		new Drill(27, "Jo Of All Drills", "<span class=\"progressWCol iconBig\"><span class=\"oi oi-cog\"></span></span>", "Learn a bit from every drill, master none - start with two random drills, switch to another two during score change break.", 0, 0, 0, 0, 0, A.DRILL_JOKER, 50000), 
		new Drill(100, "+3 STR", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-bolt\"></span>&nbsp;3</span>", "Offer teammates help with strength training.", 3, 0, 0, 0, 0, A.GIFT, 0), 
		new Drill(101, "+3 AGI", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-flash hvflip\"></span>&nbsp;3</span>", "Offer teammates help with agility training.", 0, 3, 0, 0, 0, A.GIFT, 0), 
		new Drill(102, "+3 DEF", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-shield\"></span>&nbsp;3</span>", "Offer teammates help with defense training.", 0, 0, 3, 0, 0, A.GIFT, 0), 
		new Drill(103, "+5 STR", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-bolt\"></span>&nbsp;5</span>", "Offer teammates help with strength training.", 5, 0, 0, 0, 0, A.GIFT, 0), 
		new Drill(104, "+5 AGI", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-flash hvflip\"></span>&nbsp;5</span>", "Offer teammates help with agility training.", 0, 5, 0, 0, 0, A.GIFT, 0), 
		new Drill(105, "+5 DEF", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-shield\"></span>&nbsp;5</span>", "Offer teammates help with defense training.", 0, 0, 5, 0, 0, A.GIFT, 0), 
		new Drill(106, "+7 STR", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-bolt\"></span>&nbsp;7</span>", "Offer teammates help with strength training.", 7, 0, 0, 0, 0, A.GIFT, 0), 
		new Drill(107, "+7 AGI", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-flash hvflip\"></span>&nbsp;7</span>", "Offer teammates help with agility training.", 0, 7, 0, 0, 0, A.GIFT, 0), 
		new Drill(108, "+7 DEF", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-shield\"></span>&nbsp;7</span>", "Offer teammates help with defense training.", 0, 0, 7, 0, 0, A.GIFT, 0), 
		new Drill(109, "Agile Charger", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-move\"></span></span>", "Offer teammates help on how to move better while charging a kick.", 0, 0, 0, 0, 0, A.DRILL_AGILE_CHARGER, 0, 3), 
		new Drill(110, "Bold Power", "<span class=\"progressYCol iconBig\"><span class=\"oi oi-person\"></span></span>", "Offer teammates help to improve strength of heading ball. The less hair, the bolder the effect.", 0, 0, 0, 0, 0, A.DRILL_BOLD_POWER, 0, 1), 
		new Drill(111, "Adrenaline", "<span class=\"progressGCol iconBig\"><span class=\"oi oi-droplet\" ></span></span>", "When teammates are in control of ball and opponent attemts a tackle, they regain 25% dash energy and increase dash distance by 50% if dashing.", 0, 0, 0, 0, 0, A.DRILL_ADRENALINE, 0), 
		new Drill(112, "Attentive Defender", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-flag\" style=\"rotate: -45deg;\"></span></span>", "Offer teammates help on how to pay attention to tackle only players on the other team.", 0, 0, 0, 0, 0, A.DRILL_ATTENTIVE_DEFENDER, 0, 1), 
		new Drill(113, "Strong Defender", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-media-skip-forward\" style=\"rotate: -45deg;\"></span></span>", "When teammates tackle someone with ball, it will cause the other to stay down longer.", 0, 0, 0, 0, 0, A.DRILL_STRONG_DEFENDER, 0), 
		new Drill(114, "Quick Stander", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-arrow-thick-top\"></span></span>", "Offer teammates help on how to stand up faster after missing a tackle or being tackled without ball.", 0, 0, 0, 0, 0, A.DRILL_QUICK_STANDER, 0, 1), 
		new Drill(115, "Rebound Radius", "<span class=\"progressRCol iconBig\"><span class=\"oi oi-target\" style=\"rotate: -45deg;\"></span></span>", "Offer teammates help to learn how to rebound a ball by tackling and heading from longer distance.", 0, 0, 0, 0, 0, A.DRILL_REBOUND_RADIUS, 0, 1), 
		new Drill(116, "High Jumper", "<span class=\"progressWCol iconBig\"><span class=\"oi oi-chevron-top\"></span></span>", "Offer teammates help to learn how to jump higher and head high ball.", 0, 0, 0, 0, 0, A.DRILL_HIGH_JUMPER, 0, 1)
	];
	A.FIELDS = [
		new Field(1.0, 0.5, 0.75)
	];
	A.SETTING_CamFollowSpeed = 0;
	A.SETTING_AutoswitchOn = 1;
	A.SETTING_AutoswitchOnWalls = 2;
	A.SETTING_MouseCapture = 3;
	A.SETTING_MouseCaptureSpeed = 4;
	A.SETTING_Up = 5;
	A.SETTING_Down = 6;
	A.SETTING_Left = 7;
	A.SETTING_Right = 8;
	A.SETTING_Dash = 9;
	A.SETTINGS_LENGTH = 10;

A.WIKI_DATA = [
{a:"/wiki",t:"KickAround Wiki"}
];

(function(){
	var arr = ["\x61\x6e\x61\x6c","\x61\x6e\x75\x73","\x61\x72\x73\x65","\x61\x72\x73\x65\x68\x6f\x6c\x65","\x61\x73\x73","\x61\x68\x6f\x6c\x65","\x61\x68\x6f\x6c\x65\x73","\x61\x73\x68\x6f\x6c\x65","\x61\x73\x68\x6f\x6c\x65\x73","\x61\x73\x73\x68\x6f\x6c\x65",
	"\x61\x73\x73\x68\x6f\x6c\x65\x73","\x62\x61\x73\x74\x61\x72\x64","\x62\x61\x73\x74\x61\x72\x64\x73","\x62\x6f\x6f\x62","\x62\x6f\x6f\x62\x73","\x62\x6f\x6f\x62\x69\x73","\x62\x6f\x6f\x62\x69\x65\x73","\x62\x69\x74\x63\x68","\x62\x69\x74\x63\x68\x65\x73","\x63\x6f\x63\x6b",
	"\x63\x6f\x63\x6b\x73","\x63\x75\x6e\x74","\x63\x75\x6e\x74\x73","\x64\x69\x63\x6b","\x64\x69\x63\x6b\x73","\x64\x75\x6d\x61\x73\x73","\x64\x75\x6d\x62\x61\x73\x73","\x64\x75\x6d\x62\x61\x73\x73\x65\x73","\x64\x75\x6d\x62\x73\x68\x69\x74","\x64\x75\x6d\x62\x66\x75\x63\x6b",
	"\x64\x75\x6d\x73\x68\x69\x74","\x66\x61\x67","\x66\x61\x67\x73","\x66\x61\x67\x67","\x66\x61\x67\x67\x6f\x74","\x66\x61\x67\x67\x6f\x74\x73","\x66\x61\x74\x61\x73\x73","\x66\x63\x6b","\x66\x63\x6b\x64","\x66\x63\x6b\x73",
	"\x66\x75\x63\x6b","\x66\x75\x63\x6b\x64","\x66\x75\x63\x6b\x65\x64","\x66\x75\x63\x6b\x68\x65\x61\x64","\x66\x75\x63\x6b\x68\x65\x61\x64\x73","\x66\x75\x63\x6b\x66\x61\x63\x65","\x66\x75\x63\x6b\x73","\x66\x75\x63\x6b\x73\x61\x6b\x65","\x66\x75\x63\x6b\x73\x61\x6b\x65\x73","\x66\x75\x63\x6b\x65\x72",
	"\x66\x75\x63\x6b\x65\x72\x73","\x66\x75\x63\x6b\x69\x6e","\x66\x75\x63\x6b\x69\x6e\x67","\x69\x64\x69\x6f\x74","\x69\x64\x69\x6f\x74\x73","\x6e\x69\x67","\x6e\x69\x67\x61","\x6e\x69\x67\x61\x73","\x6e\x69\x67\x67","\x6e\x69\x67\x67\x61",
	"\x6e\x69\x67\x67\x61\x73","\x6e\x73\x66\x77","\x6e\x75\x64\x65","\x6e\x75\x64\x69\x65","\x6e\x75\x64\x69\x65\x73","\x6e\x75\x64\x69\x74\x79","\x6f\x72\x67\x61","\x6f\x72\x67\x79","\x6f\x72\x67\x69\x65\x73","\x6f\x72\x67\x61\x73\x6d",
	"\x6f\x72\x67\x61\x73\x69\x6d","\x6f\x72\x67\x61\x73\x69\x6d\x73","\x6f\x72\x67\x61\x73\x6d\x69\x63","\x6f\x72\x67\x61\x73\x6d\x73","\x6f\x72\x67\x61\x73\x75\x6d","\x70\x61\x6e\x73\x79","\x70\x61\x6e\x73\x69\x65\x73","\x70\x61\x6e\x74\x69","\x70\x61\x6e\x74\x69\x65\x73","\x70\x61\x6e\x74\x79",
	"\x70\x6f\x72\x6e","\x70\x6f\x72\x6e\x6f","\x70\x6f\x72\x6e\x6f\x73","\x70\x6f\x72\x6e\x6f\x67\x72\x61\x70\x68\x79","\x70\x72\x69\x63\x6b","\x70\x72\x69\x63\x6b\x73","\x70\x72\x69\x63\x6b\x68\x65\x61\x64","\x70\x72\x69\x63\x6b\x68\x65\x61\x64\x73","\x70\x65\x65\x65\x6e\x75\x73","\x70\x65\x65\x65\x6e\x75\x73\x73\x73",
	"\x70\x65\x69\x6e\x75\x73","\x70\x65\x6e\x69\x73","\x70\x65\x6e\x69\x73\x65\x73","\x70\x65\x72\x76","\x70\x69\x73\x73","\x70\x75\x73\x79","\x70\x75\x73\x73","\x70\x75\x73\x73\x65\x65","\x70\x75\x73\x69\x65\x73","\x70\x75\x73\x73\x79",
	"\x70\x75\x73\x73\x79\x73","\x70\x75\x73\x73\x69\x65\x73","\x72\x61\x70\x65","\x72\x61\x70\x65\x64","\x72\x61\x70\x65\x72","\x72\x61\x70\x69\x6e\x67","\x72\x61\x70\x69\x73\x74","\x72\x65\x74\x61\x72\x64","\x72\x65\x74\x61\x72\x64\x73","\x72\x65\x74\x61\x72\x64\x7a",
	"\x72\x65\x74\x61\x72\x64\x65\x64","\x73\x65\x64\x75\x63\x65","\x73\x68\x69\x74","\x73\x65\x6d\x65\x6e","\x73\x65\x78","\x73\x65\x78\x78","\x73\x65\x78\x78\x78","\x73\x65\x78\x79","\x73\x65\x78\x78\x79","\x73\x65\x78\x78\x78\x79",
	"\x73\x6c\x75\x74","\x73\x6c\x75\x74\x74","\x73\x6c\x75\x74\x73","\x73\x6c\x75\x74\x74\x79","\x73\x75\x69\x63\x69\x64\x65","\x74\x69\x74","\x74\x69\x74\x74","\x74\x69\x74\x74\x69\x65\x73","\x74\x69\x74\x74\x69\x73","\x74\x69\x74\x73",
	"\x76\x67\x72\x61","\x76\x69\x61\x67\x72\x61","\x76\x61\x67","\x76\x61\x67\x69\x6e\x61","\x76\x61\x67\x69\x6e\x61\x6c","\x76\x61\x67\x69\x69\x6e\x61","\x76\x69\x62\x72\x61\x74\x6f\x72","\x77\x68\x6f\x72\x65","\x77\x68\x6f\x72\x65\x73","\x77\x74\x66",
	"\x79\x6f\x75\x72\x62\x6f\x6f\x62\x73","\x79\x6f\x75\x72\x70\x65\x6e\x69\x73","\x79\x6f\x75\x72\x74\x69\x74\x73","\x75\x72\x62\x6f\x6f\x62\x73","\x75\x72\x70\x65\x6e\x69\x73","\x75\x72\x74\x69\x74\x73"];
	A.TERE = {};
	for(var i = 0; i < arr.length; i++) {
		A.TERE[arr[i]] = arr[i].length;
	}
})();

function initWiki() {
	for(var i = 0; i < A.WIKI_DATA.length; i++) {
		var a = A.WIKI_DATA[i];
		a.tl = a.t.toLowerCase();
	}
	//A.WIKI_DATA
}
function isKey(e, name, val) {
	if(e.key !== undefined) return e.key === name;
	return e.keyCode === val;
}
initWiki();
function searchFunction() {
	var s = document.getElementById("search");
	var b = document.getElementById("searchbox");
	s.addEventListener("input", function(e) {
		var val = this.value;
		
		if (!val) { b.hidden = true; return false; }
		
		var tmp = {};
		
		val = val.toLowerCase();
		for(var i = 0; i < A.WIKI_DATA.length; i++) {
			var a = A.WIKI_DATA[i];
			var j = a.tl.indexOf(val);
			if(j !== -1) {
				if(tmp[j] === undefined) { tmp[j] = "";	}
				tmp[j] += `<a href=${a.a}>${a.t}</a>`;
			}
		}
		if(Object.keys(tmp).length === 0) {
			var a = A.WIKI_DATA[0];
			if(tmp[0] === undefined) { tmp[0] = "";	}
			tmp[0] += `<a href=${a.a}>${a.t}</a>`;
		}
		if(Object.keys(tmp).length !== 0) {
			var str = "";
			for(var e in tmp) {
				str += tmp[e];
			}
			b.innerHTML = str;
			b.hidden = false;
		}
		else { b.hidden = false; }
	});
	/*s.addEventListener("keydown", function(e) {
		if(isKey(e, "Enter", 13)) {
			
			e.preventDefault();
			return;
		}
		else if(isKey(e, "ArrowUp", 38)) {

			e.preventDefault();
			return;
		}
		else if(isKey(e, "ArrowDown", 40)) {

			e.preventDefault();
			return;	
		}
	});*/
}

function initDrillIndex() {
	var a = 0;
    for(var i = 0; i < A.DRILL.length; i++) {
        if(A.DRILL[i].isGift()) {
            a = i;
            break;
        }
    }
    A.DRILL_GIFT_INDEX = a;
	A.DRILL_GIFT_LENGTH = A.DRILL.length-a;
}
initDrillIndex();

var FIELDS = A.FIELDS;

A.STAT_MULT = [ 
	new StatMult(1, 0.9, 0.5, 1),
    new StatMult(A.CHARGE_SPEED_MIDFIELDER_100/A.CHARGE_SPEED_100, 1,   0.5, 1),
    new StatMult(1, 0.8, 1,   1),
    new StatMult(1, 1,   0.5,   1)
];
//Moonwalk
//Moonwalk Dash Tackle
//Moonwalk Slowtackle
/*A.DRILL = [
	new Drill("None", 
	"",
	"",
	0,0,0,     0,0,  0, 0),
	new Drill("Open",
	`<span class="progressWCol oi oi-plus iconBig"></span>`,
	"The character has free time & energy to undergo another training/drill.",
	0,0,0,     0,0,  0, 0),
	new Drill("Forward Training",
	`<span class="progressYCol iconBig"><span class="oi oi-bolt"></span></span>`,
	"Intensive shooting training.", 
	0,0,0,  0,0,  A.TRAINING_FORWARD, 50000),
	new Drill("Midfield Training",
	`<span class="progressGCol iconBig"><span class="oi oi-flash hvflip"></span></span>`,
	"Intensive agility training.",
	0,0,0,  0,0,  A.TRAINING_MIDFIELD, 50000),
	new Drill("Defender Training",
	`<span class="progressRCol iconBig"><span class="oi oi-shield"></span></span>`,
	"Intensive defense training.",
	0,0,0,  0,0,  A.TRAINING_DEFENDER, 50000),
	new Drill("+7 STR",
	`<span class="progressYCol iconBig"><span class="oi oi-bolt"></span>&nbsp;7</span>`,
	"Advanced strength training drill.",
	7,0,0,     0,0,  0, 30000),
	new Drill("+7 AGI",
	`<span class="progressGCol iconBig"><span class="oi oi-flash hvflip"></span>&nbsp;7</span>`,
	"Advanced agility training drill.",
	0,7,0,     0,0,  0, 30000),
	new Drill("+7 DEF",
	`<span class="progressRCol iconBig"><span class="oi oi-shield"></span>&nbsp;7</span>`,
	"Advanced defense training drill.",
	0,0,7,     0,0,  0, 30000),
	new Drill("+10% Exp",
	`<span class="progressGCol iconBig"><small><span class="oi oi-tag"></span>10</small></span>`,
	"",
	0,0,0,   10,0,  0, 10000),
	new Drill("+10% Luck",
	`<span class="progressYCol iconBig"><small><span class="oi oi-tag"></span>10</small></span>`,
	"",
	0,0,0,  0,10,  0, 10000),
	new Drill("Dash Turn",
	`<span class="progressGCol iconBig"><span class="oi oi-infinity" style="rotate: -45deg;"></span></span>`,
	"Learn how to turn while dashing.", 
	0,0,0,  0,0,  A.DRILL_DASH_TURN, 35000),
	new Drill("Attentive Tackle",
	`<span class="progressRCol iconBig"><span class="oi oi-media-skip-forward" style="rotate: -45deg;"></span></span>`,
	"Pay attention to tackle only players on the other team.",
	0,0,0,  0,0,  A.DRILL_TEAM_TACKLE, 35000),
	new Drill("Dribble",
	`<span class="progressGCol iconBig"><span class="oi oi-aperture" style="rotate: -45deg;"></span></span>`,
	"Learn how to efficiently dribble the ball.",
	0,0,0,  0,0,  A.DRILL_DRIBBLE, 35000)
];*/
class IntSet {
	constructor(bits, perint) {
		this.perint = perint;
		this.array = new Int32Array(toInt((bits+perint-1) / perint));
	}
	bitXX35(i35) {
        var i = (i35 >> 5);
        var p = i35 & 31;
        return (this.array[i] >> p)&7;
    }
    setXX35(i35, v) {
        var a = this.array;
        var i = (i35 >> 5);
        var p = i35 & 31;
        a[i] = (a[i] & (~(7 << p))) | (v << p);
    }
}
class CharDataCached {
	constructor(charData) {
		this.type = 0;
		this.str = 0;
		this.agi = 0;
		this.def = 0;
		this.exp = 0;
		this.luck = 0;
		this.flags = new IntSet(90, 30);
		this.drills = [];
		this.mult = new StatMult(0.0,0.0,0.0,0.0);
		
		/*if(charData.type === 1) { 
			this.flags.setXX35(A.TRAINING_FORWARD, 1);
			this.mult = A.STAT_MULT[0];
		}
		else if(charData.type === 2) { 
			this.flags.setXX35(A.TRAINING_MIDFIELD, 1);
			this.mult = A.STAT_MULT[1];
		}
		else if(charData.type === 3) { 
			this.flags.setXX35(A.TRAINING_DEFENDER, 1);
			this.mult = A.STAT_MULT[2];
		}
		else {
			var v =  A.STAT_MULT[3];
			this.mult = new StatMult(v.str, v.agi, v.def, v.head);
		}
		var arr = charData.training;
		for(var i = 0; i < arr.length; i++) {
			var d = A.DRILL[arr[i]];
			if(d.isDrill()) {
                this.applyDrill(d);
            }
		}
		if(charData.type === 4) {
			if(this.isForward()) {
				this.mult.max(A.STAT_MULT[0]);
			}
			if(this.isMidfielder()) {
				this.mult.max(A.STAT_MULT[1]);
			}
			if(this.isDefender()) {
				this.mult.max(A.STAT_MULT[2]);
			}
		}*/
	}
	
	toBuf(b) {
        var a = this;
        b.putByte(a.type);
        b.putByte(a.str);
        b.putByte(a.agi);
        b.putByte(a.def);
        b.putInt(a.flags.array[0]);
        b.putInt(a.flags.array[1]);
        b.putInt(a.flags.array[2]);
        b.putFloat(a.mult.str);
        b.putFloat(a.mult.agi);
        b.putFloat(a.mult.def);
        b.putFloat(a.mult.head);
        b.putByte(a.drills.length);
        for(var i = 0; i < a.drills.length; i++) {
            b.putByte(a.drills[i]);
        }
        return b;
    }
    fromBuf(b) {
        this.type = b.getByte();
        this.str = b.getByte();
        this.agi = b.getByte();
        this.def = b.getByte();
        this.flags.array[0] = b.getInt();
        this.flags.array[1] = b.getInt();
        this.flags.array[2] = b.getInt();
        this.mult.str = b.getFloat();
        this.mult.agi = b.getFloat();
        this.mult.def = b.getFloat();
        this.mult.head = b.getFloat();
        var drillsLength = b.getByte();
        this.drills.length = 0;
        for(var i = 0; i < drillsLength; i++) {
            this.drills[i] = b.getByte();
        }
    }
	
	applyDrill(d) {
        this.str += d.str;
        this.agi += d.agi;
        this.def += d.def;
        this.exp += d.exp;
        this.luck += d.luck;
        var num = this.getFlag(d.flags);
        if(num < d.limit) {
            this.flags.setXX35(d.flags, num+1);
            this.drills.push(d);
        }
        
    }

	getFlag(f) {
        return this.flags.bitXX35(f);
    }
	hasFlag(f) {
		return this.getFlag(f) !== 0;
	}

	isForward() {
		return this.hasFlag(A.TRAINING_FORWARD);
	}
	isMidfielder() {
		return this.hasFlag(A.TRAINING_MIDFIELD);
	}
	isDefender() {
		return this.hasFlag(A.TRAINING_DEFENDER);
	}

	canDashTurn() {
		return this.hasFlag(A.DRILL_DASH_TURN);
	}
	canTackleTurn() {
		return this.isDefender();
	}
	canTackleTeam() {
		return !this.hasFlag(A.DRILL_TEAM_TACKLE);
	}
	canBeTackledByTeam() {   
		return !this.hasFlag(A.DRILL_TEAM_TACKLE);
	}
	getPassSpeed() {
        var n = this.getFlag(A.DRILL_AGILE_CHARGER);
        return A.PLAYER_PASS_SPD + n*2.0;
    }
	getRunSpeed(hasBall) {
		var spd = this.mult.agi*mix(A.VAR_RUN_SPEED_0, A.VAR_RUN_SPEED_100, 0.01*this.agi);
		if(hasBall && !this.hasFlag(A.DRILL_DRIBBLE)) {
			spd = spd-A.RUN_SPEED_SUB_BALL;
		}
		return spd;
	}
	getDashSpeed(hasBall) {
		//return this.getRunSpeed(false)*DASH_SPD_MULT;//this.mult.agi*mix(A.DASH_SPD_0, A.DASH_SPD_100, 0.01*this.agi);
		var n = mix(A.DASH_SPD_0, A.DASH_SPD_100, 0.01*this.agi);
		if(this.hasFlag(A.DRILL_SLOW_DASH)) { n -= 5.0; }
		return this.mult.agi*n;
	}

	getDashRechargeTime() {
		var n = toInt(mix(A.DASH_DELAY_STEPS_0, A.DASH_DELAY_STEPS_100, 0.01*this.agi));
		n = n + n*this.getFlag(A.DRILL_MEGA_DASH);
		return n;
		/*if(this.isMidfielder()) { 
			return toInt(mix(A.DASH_DELAY_MIDFIELD_STEPS_0, A.DASH_DELAY_MIDFIELD_STEPS_100, 0.01*this.agi));
		}
		else {
			return toInt(mix(A.DASH_DELAY_STEPS_0, A.DASH_DELAY_STEPS_100, 0.01*this.agi));
		}	*/
	}

	getHeaderDist() {
		return this.mult.head*A.BALL_HEAD_RADIUS;
	}
	getTackleSteps() {
		var n = (this.def >= 120)?8:((this.def >= 80)?7:((this.def>=60)?6:5));
		if(this.hasFlag(A.DRILL_SLOW_DEFENDER)) { n += 3; }
        return n;
	}
	getTackleSpeed() {
		var time = 0.1*this.getTackleSteps();
		var n = this.mult.def*mix(A.VAR_TCK_DIST_0, A.VAR_TCK_DIST_100, 0.01*this.def)/time;
		if(this.hasFlag(A.DRILL_SLOW_DEFENDER)) { n += 3.0; }
        return n;
	}
	getChargeSpeed() {
		return mix(A.CHARGE_SPEED_0, this.mult.str*A.CHARGE_SPEED_100, 0.01*this.str);
	}
	getBallSpeedMin() {
		if(this.isForward()) { return A.BALL_PASS_SPD_FORWARD_MIN; }
		else { return A.BALL_PASS_SPD_MIN; }
	}
	getBallSpeedMax() {
		if(this.isForward()) { return A.BALL_PASS_SPD_FORWARD_MAX; }
		else { return A.BALL_PASS_SPD_MAX; }
	}
	getVolleySpeedMin() {
		return A.BALL_VOLLEY_SPD_MIN;
	}
	getVolleySpeedMax() {
		return A.BALL_VOLLEY_SPD_MAX;
	}
}

var VARS = [
	"CHARGE_SPEED_0", "CHARGE_SPEED_100",
	"BALL_PASS_SPD_FORWARD_MIN", "BALL_PASS_SPD_FORWARD_MAX",
	"BALL_PASS_SPD_MIN", "BALL_PASS_SPD_MAX",

	"VAR_RUN_SPEED_0", "VAR_RUN_SPEED_100",
	"DASH_SPD_0", "DASH_SPD_100",
	"VAR_TCK_DIST_0", "VAR_TCK_DIST_100",

	"DASH_DELAY_MIDFIELD_STEPS_0", "DASH_DELAY_MIDFIELD_STEPS_100",
	"DASH_DELAY_STEPS_0", "DASH_DELAY_STEPS_100",

	"BALL_HEAD_RADIUS",
	"BALL_VOLLEY_SPD_MIN", "BALL_VOLLEY_SPD_MAX",

	"BALL_MAX_SPD",
	"TCK_DIST", "TACKLED_DELAY_STEPS", "TCK_GOT_BALL_MAX_DELAY_STEPS",
	"BALL_TCK_DIST",
	"BALL_TCK_MIN_SPD", "BALL_TCK_MAX_SPD", "TCK_TCK_BALL_MAX_DELAY_STEPS",
	"BALL_TCK_Z",

	"BALL_PICK_SPD",
	"BALL_PICK_Z",
	"BALL_PICK_DIST",
	"BALL_HEAD_DIST",
	"BALL_HEAD_MIN_SPD", "BALL_HEAD_MAX_SPD", "BALL_DELAY_STEPS", "BALL_HEAD_MAX_Z",

	"GOALS_RAD", "GOALS_Z",
	"GOALKEEPER_BALL_PICK_SPD_RUN",
	"GOALKEEPER_BALL_PICK_DIST",
	"GOALKEEPER_BALL_PICK_SPD",
	"GOALKEEPER_BALL_PICK_Z",
	"GOALKEEPER_BALL_PICK_DELAY",
	"GOALKEEPER_BALL_FOLLOW_SCALE",
	"GOALKEEPER_DIVE_DELAY",
	"GOALKEEPER_DIVE_MAX_DIST",
	"GOALKEEPER_START_DIVE_RADIUS",
	"GOALKEEPER_TACKLE_START_RADIUS",
	"GOALKEEPER_TACKLE_RADIUS",
	"GOALKEEPER_TACKLE_DELAY",
	"GOALKEEPER_MAX_X_DIST"
];
var GUI = null;
var GUIID = 0;
A.varsToBuf = function(b) {
	b.putByte(A.MSG_DEBUG_SET_VARS);
	if(GUI != null) {
		for(var i = 0; i < VARS.length; i++) {
			var g = GUI[i];
			var v = VARS[i];
			if(v.indexOf("STEPS") === -1 && v.indexOf("DELAY") === -1) {
				b.putFloat(g.value);
			}
			else {
				b.putChar(g.value);
			}
		}
	}
	else {
		for(var i = 0; i < VARS.length; i++) {
			var v = VARS[i];
			if(v.indexOf("STEPS") === -1 && v.indexOf("DELAY") === -1) {
				b.putFloat(A[v]);
			}
			else {
				b.putChar(A[v]);
			}
		}
	}
}
A.varsFromBuf = function(b) {
	for(var i = 0; i < VARS.length; i++) {
		var v = VARS[i];
		if(v.indexOf("STEPS") === -1 && v.indexOf("DELAY") === -1) {
			var f = b.getFloat();
			if(f === f && f >= 0.0 && f <= 1000.0) {
				A[v] = f;
			}
		}
		else {
			var v2 = b.getChar();
			if(v2 >= 0 && v2 <= 1000) {
				A[v] = v2;
			}
		}
	}

	A.GOALKEEPER_START_DIVE_RADIUS_SQ = A.GOALKEEPER_START_DIVE_RADIUS*A.GOALKEEPER_START_DIVE_RADIUS;
	A.GOALKEEPER_TACKLE_START_RADIUS_SQ = A.GOALKEEPER_TACKLE_START_RADIUS*A.GOALKEEPER_TACKLE_START_RADIUS;
	A.GOALKEEPER_TACKLE_RADIUS_SQ = A.GOALKEEPER_TACKLE_RADIUS*A.GOALKEEPER_TACKLE_RADIUS;
	A.BALL_HEAD_RADIUS_SQ = A.BALL_HEAD_RADIUS*A.BALL_HEAD_RADIUS;
	A.BALL_CIRCUM = Math.PI * 2.0 * A.BALL_SCALE;
	A.BALL_CIRCUM_INV = 1.0/A.BALL_CIRCUM;
	A.BALL_ROTATE_UNIT = Math.PI*2.0*A.BALL_CIRCUM_INV;
	A.GRAVITY_INV = 1.0/A.GRAVITY;
	A.TCK_DIST_SQ = A.TCK_DIST*A.TCK_DIST;
	A.BALL_PICK_DIST_SQ = A.BALL_PICK_DIST*A.BALL_PICK_DIST;
	A.GOALS_L =-A.GOALS_RAD;
	A.GOALS_R = A.GOALS_RAD;

	if(GUI != null) {
		for(var i = 0; i < VARS.length; i++) {
			var g = GUI[i];
			var v = VARS[i];
			g.def(A[v]);
		}
	}
}
function strSet(x, i, ch) {
	x = x.substring(0, i) + ch + x.substring(i+1);
	return x;
}
A.base64normalize = function(x) {
	for(var i = 0; i < x.length; i++) {
		var ch = x[i];
		if(ch === '+') x = strSet(x, i, '-');
		else if(ch === '/') x = strSet(x, i, '_');
		else if(ch === '=') x = strSet(x, i, '.');
	}
	return x;
};
A.removeIndex = function(arr, i) {
	var res = arr.splice(i, 1);
	if(res != null && res.length === 1) { return res[0]; }
	return null;
};
A.removeByProp = function(arr, prop, val) {
	for(var i = 0; i < arr.length; i++) {
		var v = arr[i];
		if(v != null && v[prop] == val) {
			A.removeIndex(arr, i);
			return v;
		}
	}
	return null;
};

class Slider {
	constructor(name, min, max, soft, flt, get) {
		this.id = GUIID++;
		this.name = name;
		this.min = min;
		this.max = max;
		this.soft = soft;
		this.flt = flt;
		this.get = get;
		this.value = get();
		this.value0 = this.value;
		this.callback = null;
		GUI[this.id] = this;
	}
	static create(name, min, max, soft, flt, get) {
		var s = new Slider(name, min, max, soft, flt, get);
		return s.html();
	}
	static create2(name, min, max, soft, flt, get, callback) {
		var s = new Slider(name, min, max, soft, flt, get);
		s.callback = callback;
		return s.html();
	}
	def(x) {
		var t1 = document.getElementById("guiValue"+this.id);
		var t2 = document.getElementById("guiDef"+this.id);
		t1.value = x.toFixed(5);
		t2.innerHTML = x.toFixed(5);
	}
	set(x) {
		this.set1(x, null);
	}
	set1(x, tag) {
		this.value = x;
		var t1 = document.getElementById("guiText"+this.id);
		var t2 = document.getElementById("guiRange"+this.id);
		if(t1 !== tag) { t1.value = x; }
		if(t2 !== tag) { t2.value = x; }
		if(this.callback !== null) { this.callback(x); }
	}
	set2(tag, scale) {
		var v = Number(tag.value);
		if(v === v) {
			if(this.flt && scale) {
				v = mix(this.min, this.max, v*0.001);
				if(v > 0.1) { v = Number(v.toFixed(5)); }
			}
			this.set1(v, tag);
		}
	}
	html() {
		var value = this.value;
		var min; 
		var max;
		if(this.flt) {
			min = 0;
			max = 1000;
		}
		else {
			min = this.min;
			max = this.max;
		}
		var cls = "";//((this.id&1)===0)?"":' style="background-color:#5c5c5c;"';
		return `<div${cls}>
			<span style="display:inline-block;width:200px;">${this.name}:</span><span style="display:inline-block;width:100px;" id="guiValue${this.id}">${value}</span><input type="text" id="guiText${this.id}" name="vol" style="width:100px;" value="${value}" onchange="GUI[${this.id}].set2(this, false)">
			<br>
			<input type="range" style="width:300px;" id="guiRange${this.id}" name="vol" min="${min}" max="${max}" oninput="GUI[${this.id}].set2(this, true)" onchange="GUI[${this.id}].set2(this, true)"><label id="guiDef${this.id}" class="btn btn-light" style="padding-left:25px;padding-right:25px;padding-top: 0px;padding-bottom: 0px;width:100px;" onclick="GUI[${this.id}].set(this.innerHTML)">${value}</label>
		</div>`;
	}
} 
class KeyBox {
	constructor(name, get) {
		this.id = GUIID++;
		this.name = name;
		this.get = get;
		this.value = get();
		this.value0 = this.value;
		this.callback = null;
		GUI[this.id] = this;
	}
	static create(name, get) {
		var s = new KeyBox(name, get);
		return s.html();
	}
	static create2(name, get, callback) {
		var s = new KeyBox(name, get);
		s.callback = callback;
		return s.html();
	}
	def(x) {
		var t1 = document.getElementById("guiValue"+this.id);
		t1.value = String.fromCharCode(x) + "\t(" + x + ")";
	}
	set(x) {
		this.set1(x, null);
	}
	set1(x, tag) {
		this.value = x;
		var t1 = document.getElementById("guiText"+this.id);
		if(t1 !== tag) { t1.value = String.fromCharCode(x) + "\t(" + x + ")"; }
		if(this.callback !== null) { this.callback(x); }
	}
	set2(tag) {
		var e = event;
		if(e != null && e.keyCode >= 0 && e.keyCode < 256) {
			this.set(e.keyCode);
		}
		return false;
		/*tag.value
		var v = Number(tag.value);
		if(v === v) {
			if(this.flt && scale) {
				v = mix(this.min, this.max, v*0.001);
				if(v > 0.1) { v = Number(v.toFixed(5)); }
			}
			this.set1(v, tag);
		}*/
	}
	html() {
		var value = this.value;
		var cls = "";//((this.id&1)===0)?"":' style="background-color:#5c5c5c;"';
		return `<div${cls}>
			<span style="display:inline-block;width:200px;">${this.name}:</span><span style="display:inline-block;width:100px;" id="guiValue${this.id}">${value}</span><input type="text" id="guiText${this.id}" name="vol" style="width:100px;" value="${value}" onkeydown="return GUI[${this.id}].set2(this);">
		</div>`;
	}
} 
class CheckBox {
	constructor(name, get, callback) {
		this.id = GUIID++;
		this.name = name;
		this.get = get;
		this.value = get();
		this.value0 = this.value;
		this.callback = callback;
		GUI[this.id] = this;
	}
	static create(name, get, callback) {
		var s = new CheckBox(name, get, callback);
		return s.html();
	}
	set(x) {
		this.value = x;
		var t = document.getElementById("guiCheckBox"+this.id);
		t.checked = x;
		if(this.callback !== null) { this.callback(x); }
	}
	/*def(x) {
		var t1 = document.getElementById("guiValue"+this.id);
		var t2 = document.getElementById("guiDef"+this.id);
		t1.value = x.toFixed(5);
		t2.innerHTML = x.toFixed(5);
	}
	set(x) {
		this.set1(x, null);
	}
	set1(x, tag) {
		console.log("setting value");
		this.value = x;
		var t1 = document.getElementById("guiText"+this.id);
		var t2 = document.getElementById("guiRange"+this.id);
		if(t1 !== tag) { t1.value = x; }
		if(t2 !== tag) { t2.value = x; }
		if(this.callback !== null) { this.callback(x); }
	}
	set2(tag, scale) {
		var v = Number(tag.value);
		if(v === v) {
			if(this.flt && scale) {
				v = mix(this.min, this.max, v*0.001);
				if(v > 0.1) { v = Number(v.toFixed(5)); }
			}
			this.set1(v, tag);
		}
	}*/
	html() {
		var cls = "";//((this.id&1)===0)?"":' style="background-color:#5c5c5c;"';
		var checked = this.value?" checked":"";
		
		return `<div${cls}>
		<span style="display:inline-block;width:200px;">${this.name}:</span>
		<input style="width:100px;" type="checkbox" id="guiCheckBox${this.id}" name="guiCheckBox${this.id}" onclick='GUI[${this.id}].set(this.checked);' ${checked}>
	   	</div>`;
		
		/*var value = this.value;
		var min; 
		var max;
		if(this.flt) {
			min = 0;
			max = 1000;
		}
		else {
			min = this.min;
			max = this.max;
		}
		var cls = ((this.id&1)===0)?"":' style="background-color:#5c5c5c;"';
		return `<div${cls}>
			<span style="display:inline-block;width:200px;">${this.name}:</span><span style="display:inline-block;width:100px;" id="guiValue${this.id}">${value}</span><input type="text" id="guiText${this.id}" name="vol" style="width:100px;" value="${value}" onchange="GUI[${this.id}].set2(this, false)">
			<br>
			<input type="range" style="width:300px;" id="guiRange${this.id}" name="vol" min="${min}" max="${max}" oninput="GUI[${this.id}].set2(this, true)" onchange="GUI[${this.id}].set2(this, true)"><label id="guiDef${this.id}" class="btn btn-light" style="padding-left:25px;padding-right:25px;padding-top: 0px;padding-bottom: 0px;width:100px;" onclick="GUI[${this.id}].set(this.innerHTML)">${value}</label>
		</div>`;*/
	}
} 

/*function guiUpdate() {
	var buf = _tmp();
	A.varsToBuf(buf);
	gl.player.chan.send(buf.flip());
}*/
function guiDefaults() {
	/*for(var i = 0; i < VARS.length; i++) {
		var g = GUI[i];
		g.set(g.value0);
	}*/
	guiUpdate();
}
var GUI_CamFollowSpeed, GUI_AutoswitchOn, GUI_AutoswitchOnWalls, GUI_MouseCapture,
GUI_MouseCaptureSpeed, GUI_UP, GUI_DOWN, GUI_LEFT, GUI_RIGHT, GUI_DASH; 
function initGui() {
	GUI = {};
	//name, min, max, soft, flt, get
	var html;
	/*html = "Vars";	
	
	//html += Slider.create("test", 0, 20, true, true, ()=>{return B.GAME_OPTION_2P;});
	for(var i = 0; i < VARS.length; i++) {
		var v = VARS[i];
		if(v.indexOf("STEPS") === -1 && v.indexOf("DELAY") === -1) {
			html += Slider.create(v, 0, Math.max(A[v]*2.0, 100.0), true, true, ()=>{return A[v];});
		}
		else {
			html += Slider.create(v, 0, 50, false, false, ()=>{return A[v];});
		}
	}

	html += `<br><label class="btn btn-light" style="padding-left:25px;padding-right:25px;" onclick="guiDefaults()">Defaults</label><label class="btn btn-warning" style="padding-left:25px;padding-right:25px;float:right;" onclick="guiUpdate()">Update</label>`;
	document.getElementById("gVars").innerHTML = html;*/
	//default 3... 85
	html = "";
	GUI_CamFollowSpeed = GUIID;
	html += Slider.create2("Camera Follow Speed", 0, 255, false, false, ()=>{return 42.5*(CAM_FOLLOW_SPD2-1.0);}, (x)=>{CAM_FOLLOW_SPD2=1.0+x*0.023529411764705882;});
	GUI_AutoswitchOn = GUIID;
	html += CheckBox.create("Autoswitch On", ()=>{return A.CHAR_AUTO_SWITCH;}, (x)=>{A.CHAR_AUTO_SWITCH = x;});
	GUI_AutoswitchOnWalls = GUIID;
	html += CheckBox.create("Autoswitch On Walls", ()=>{return A.CHAR_SWITCH_WALL > -1;}, (x)=>{A.CHAR_SWITCH_WALL = x?1:-1});
	GUI_MouseCapture = GUIID;
	html += CheckBox.create("Mouse Capture", ()=>{return A.MOUSE_CAPTURE;}, (x)=>{ 
		if(gl.canvas != null) {
			gl.canvas.setMouseCapture(x);
		}
	});
	GUI_MouseCaptureSpeed = GUIID;
	html += Slider.create2("Mouse Captured Speed", 0, 255, false, false, ()=>{return 200.0*(A.MOUSE_CAPTURE_SPEED-0.25);}, (x)=>{ A.MOUSE_CAPTURE_SPEED = x*0.005 + 0.25;});
	GUI_UP = GUIID;
	html += KeyBox.create2("Key Up ", ()=>{ return KeyInput.W; }, (x)=>{ KeyInput.W = x; });
	GUI_DOWN = GUIID;
	html += KeyBox.create2("Key Down ", ()=>{ return KeyInput.S; }, (x)=>{ KeyInput.S = x; });
	GUI_LEFT = GUIID;
	html += KeyBox.create2("Key Left ", ()=>{ return KeyInput.A; }, (x)=>{ KeyInput.A = x; });
	GUI_RIGHT = GUIID;
	html += KeyBox.create2("Key Right ", ()=>{ return KeyInput.D; }, (x)=>{ KeyInput.D = x; });
	GUI_DASH = GUIID;
	html += KeyBox.create2("Key Dash ", ()=>{ return KeyInput.SPACE; }, (x)=>{ KeyInput.SPACE = x; });
	
	html += `<label class="btn btn-success" style="margin-right:15px;" onclick="loadWASD();">WASD</label>`;
	html += `<label class="btn btn-success" onclick="loadEDSF();">EDSF</label>`;
	
	document.getElementById("gOpsItems").innerHTML = html;
}
function loadWASD() {
	var g;
	g = GUI[GUI_UP];
	g.set(87);
	g = GUI[GUI_DOWN];
	g.set(83);
	g = GUI[GUI_LEFT];
	g.set(65);
	g = GUI[GUI_RIGHT];
	g.set(68);
}
function loadEDSF() {
	var g;
	g = GUI[GUI_UP];
	g.set(69);
	g = GUI[GUI_DOWN];
	g.set(68);
	g = GUI[GUI_LEFT];
	g.set(83);
	g = GUI[GUI_RIGHT];
	g.set(70);
}
function setSettings(s) {
	var g;
	g = GUI[GUI_CamFollowSpeed];
	g.set(s[A.SETTING_CamFollowSpeed]);
	g = GUI[GUI_AutoswitchOn];
	g.set(s[A.SETTING_AutoswitchOn] !== 0);
	g = GUI[GUI_AutoswitchOnWalls];
	g.set(s[A.SETTING_AutoswitchOnWalls] !== 0);
	g = GUI[GUI_MouseCapture];
	g.set(s[A.SETTING_MouseCapture] !== 0);
	g = GUI[GUI_MouseCaptureSpeed];
	g.set(s[A.SETTING_MouseCaptureSpeed]);
	g = GUI[GUI_UP];
	g.set(s[A.SETTING_Up]);
	g = GUI[GUI_DOWN];
	g.set(s[A.SETTING_Down]);
	g = GUI[GUI_LEFT];
	g.set(s[A.SETTING_Left]);
	g = GUI[GUI_RIGHT];
	g.set(s[A.SETTING_Right]);
	g = GUI[GUI_DASH];
	g.set(s[A.SETTING_Dash]);
}
function sendSettings(buf, s) {
	if(A.SETTINGS_LENGTH !== 10) {
		console.log("error " + sendSettings);
	}
	buf.putByte(A.MSG_SETTINGS);
	var g;
	g = GUI[GUI_CamFollowSpeed];
	s[0] = g.get();
	buf.putByte(g.get());
	g = GUI[GUI_AutoswitchOn];
	s[1] = g.value?1:0;
	buf.putByte(g.value);
	g = GUI[GUI_AutoswitchOnWalls];
	s[2] = g.value?1:0;
	buf.putByte(g.value);
	g = GUI[GUI_MouseCapture];
	s[3] = g.value?1:0;
	buf.putByte(g.value);
	
	g = GUI[GUI_MouseCaptureSpeed];	s[4] = g.get(); buf.putByte(g.get());
	g = GUI[GUI_UP];				s[5] = g.get(); buf.putByte(g.get());
	g = GUI[GUI_DOWN];				s[6] = g.get(); buf.putByte(g.get());
	g = GUI[GUI_LEFT];				s[7] = g.get(); buf.putByte(g.get());
	g = GUI[GUI_RIGHT];				s[8] = g.get(); buf.putByte(g.get());
	g = GUI[GUI_DASH];				s[9] = g.get(); buf.putByte(g.get());
}
function err(text) {
	console.log("Error: " + text);
}
function passPow(millis) {
	return clamp(millis, 0, 1000)*0.1;
}
function intersectsCapsule(A, B, X, Y, rad, debug) {
	//todo could test, line if (tN <= 0.0) {  changed < into <=
	var ZERO_TOLERANCE = 1.1920928955078125E-12;
		//http://geomalgorithms.com/a07-_distance.html
		// Copyright 2001 softSurfer, 2012 Dan Sunday
		// This code may be freely used, distributed and modified for any purpose
		// providing that this copyright notice is included with it.
		// SoftSurfer makes no warranty for this code, and cannot be held
		// liable for any real or imagined damage resulting from its use.
		// Users of this code must verify correctness for their application
		var u = B.sub(A);
		var v = Y.sub(X);
		var w0 = A.sub(X);
		
		var a = u.dot(u);
		var b = u.dot(v);
		var c = v.dot(v);
		var d = u.dot(w0);
		var e = v.dot(w0);
		
		var D = a*c - b*b;
		var sC, sN, sD = D;
		var tC, tN, tD = D;
		
		//console.log("D " + D + " w0 " + w0.x + " " + w0.y );
		
		// compute the line parameters of the two closest points
		if (Math.abs(D) < ZERO_TOLERANCE) { // the lines are almost parallel
			sN = 0.0;         // force using point P0 on segment S1
			sD = 1.0;         // to prevent possible division by 0.0 later
			tN = e;
			tD = c;
			//console.log("e " + e + " c " + c  );
		}
		else {                 // get the closest points on the infinite lines
			sN = (b*e - c*d);
			tN = (a*e - b*d);
			if (sN < 0.0) {        // sc < 0 => the s=0 edge is visible
				sN = 0.0;
				tN = e;
				tD = c;
			}
			else if (sN > sD) {  // sc > 1  => the s=1 edge is visible
				sN = sD;
				tN = e + b;
				tD = c;
			}
		}

		//maybe instead of 0 ZERO_TOLERANCE
		if (tN <= 0.0) {            // tc < 0 => the t=0 edge is visible
			tN = 0.0;
			// recompute sc for this edge
			if (-d < 0.0)
				sN = 0.0;
			else if (-d > a)
				sN = sD;
			else {
				sN = -d;
				sD = a;
			}
		}
		else if (tN > tD) {      // tc > 1  => the t=1 edge is visible
			tN = tD;
			// recompute sc for this edge
			if ((-d + b) < 0.0)
				sN = 0;
			else if ((-d + b) > a)
				sN = sD;
			else {
				sN = (-d +  b);
				sD = a;
			}
		}
		// finally do the division to get sc and tc
		var sc = (Math.abs(sN) < ZERO_TOLERANCE ? 0.0 : sN / sD);
		var tc = (Math.abs(tN) < ZERO_TOLERANCE ? 0.0 : tN / tD);

		//console.log("sN " + sN + " tN " + tN);
		//console.log("sc " + sc + " tc " + tc);
			
//		return new double[] {sc, tc};
//		u.multLocal(sc).subtractLocal(v.multLocal(tc)).addLocal(w0);
//		return u.lengthSquared();
		
		u.multLocal1(sc).subLocal(v.multLocal1(tc)).addLocal(w0);
		
		//if(u.lengthSquared() <= rad*rad*2) 
		//if(debug)	console.log("intersect " + Math.sqrt(u.lengthSquared()) + " <= " + rad);
		
		return u.lengthSquared() <= rad*rad;
} 
function intersectsCapsule2(A, B, X, Y, rad, debug) {
	//todo could test, line if (tN <= 0.0) {  changed < into <=
	var ZERO_TOLERANCE = 1.1920928955078125E-12;
		//http://geomalgorithms.com/a07-_distance.html
		// Copyright 2001 softSurfer, 2012 Dan Sunday
		// This code may be freely used, distributed and modified for any purpose
		// providing that this copyright notice is included with it.
		// SoftSurfer makes no warranty for this code, and cannot be held
		// liable for any real or imagined damage resulting from its use.
		// Users of this code must verify correctness for their application
		var u = B.sub(A);
		var v = Y.sub(X);
		var w0 = A.sub(X);
		
		var a = u.dot(u);
		var b = u.dot(v);
		var c = v.dot(v);
		var d = u.dot(w0);
		var e = v.dot(w0);
		
		var D = a*c - b*b;
		var sC, sN, sD = D;
		var tC, tN, tD = D;
		
		//console.log("D " + D + " w0 " + w0.x + " " + w0.y );
		
		// compute the line parameters of the two closest points
		if (Math.abs(D) < ZERO_TOLERANCE) { // the lines are almost parallel
			sN = 0.0;         // force using point P0 on segment S1
			sD = 1.0;         // to prevent possible division by 0.0 later
			tN = e;
			tD = c;
			//console.log("e " + e + " c " + c  );
		}
		else {                 // get the closest points on the infinite lines
			sN = (b*e - c*d);
			tN = (a*e - b*d);
			if (sN < 0.0) {        // sc < 0 => the s=0 edge is visible
				sN = 0.0;
				tN = e;
				tD = c;
			}
			else if (sN > sD) {  // sc > 1  => the s=1 edge is visible
				sN = sD;
				tN = e + b;
				tD = c;
			}
		}

		//maybe instead of 0 ZERO_TOLERANCE
		if (tN <= 0.0) {            // tc < 0 => the t=0 edge is visible
			tN = 0.0;
			// recompute sc for this edge
			if (-d < 0.0)
				sN = 0.0;
			else if (-d > a)
				sN = sD;
			else {
				sN = -d;
				sD = a;
			}
		}
		else if (tN > tD) {      // tc > 1  => the t=1 edge is visible
			tN = tD;
			// recompute sc for this edge
			if ((-d + b) < 0.0)
				sN = 0;
			else if ((-d + b) > a)
				sN = sD;
			else {
				sN = (-d +  b);
				sD = a;
			}
		}
		// finally do the division to get sc and tc
		var sc = (Math.abs(sN) < ZERO_TOLERANCE ? 0.0 : sN / sD);
		var tc = (Math.abs(tN) < ZERO_TOLERANCE ? 0.0 : tN / tD);

		//console.log("sN " + sN + " tN " + tN);
		//console.log("sc " + sc + " tc " + tc);
			
//		return new double[] {sc, tc};
//		u.multLocal(sc).subtractLocal(v.multLocal(tc)).addLocal(w0);
//		return u.lengthSquared();

		//console.log("u = " + u.x + ","+u.y + " v = " + v.x + "," + v.y);
		
		u.multLocal1(sc).subLocal(v.multLocal1(tc)).addLocal(w0);
	
		//console.log("res " + u.x + ","+u.y  + " | w0 " + w0.x + " " + w0.y);
		
		
		//if(u.lengthSquared() <= rad*rad*2) 
		if(debug)	console.log("intersect " + Math.sqrt(u.lengthSquared()) + " <= " + rad);
		var lenSq = u.lengthSquared();
		if(lenSq <= rad*rad) {
			if(lenSq < 0.001) {
				lenSq = 0;
				u.zero();
			}
			else {
				lenSq = Math.sqrt(lenSq);
				u.multLocal1(1.0/lenSq);
			}
			return [sc, tc, lenSq, u];
		}
		return null;
} 
function calcForSpheres2(pA, p2A, pB, p2B, bigRadius) {
	return calcForSpheres(pA, p2A.sub(pA), pB, p2B.sub(pB), bigRadius);
}
function calcForSpheres(pA, dA, pB, dB, bigRadius) {
	var d = [pA.x-pB.x,
			 pA.y-pB.y,
			dA.x-dB.x,
			dA.y-dB.y];
	bigRadius = bigRadius*bigRadius;
    var termC = d[2]*d[2]+d[3]*d[3];
	if(Math.abs(termC) < 0.0001) {
		if(d[0]*d[0]+d[1]*d[1] > bigRadius) return null;
        return [0.0, 0.0];
	}
    var roots = solveQuadric(termC, 2.0*(d[0]*d[2]+d[1]*d[3]), d[0]*d[0]+d[1]*d[1]-bigRadius);

	if(roots !== null) {
		if(roots[1] < 0.0) return null;		
	}
    return roots;
    /*double termA = 0.25f*(d[acc.x]*d[acc.x]+d[acc.z]*d[acc.z]);
    double termC = d[vel.x]*d[vel.x]+d[vel.z]*d[vel.z];
    double[] roots = 
            (termC == 0)? (d[pos.x]*d[pos.x]+d[pos.z]*d[pos.z] > bigRadius)?null
            :new double[] {0, 0}//Double.POSITIVE_INFINITY ? relly?}
            :(termA == 0)?Polynomials.solveQuadric(
                termC,
                2f*(d[pos.x]*d[vel.x]+d[pos.z]*d[vel.z]),
                d[pos.x]*d[pos.x]+d[pos.z]*d[pos.z]-bigRadius)
   
                :Polynomials.solveQuartic(
                termA, d[acc.x]*d[vel.x]+d[acc.z]*d[vel.z],
                d[vel.x]*d[vel.x]+d[vel.z]*d[vel.z]
                +d[acc.x]*d[pos.x]+d[acc.z]*d[pos.z],
                2f*(d[pos.x]*d[vel.x]+d[pos.z]*d[vel.z]),
                d[pos.x]*d[pos.x]+d[pos.z]*d[pos.z]-bigRadius);

    vars.release();
    if(roots == null) return;
    store.set(roots);*/
}
function solveQuadric(a, b, c) {
	var disc = b * b - 4.0 * a * c;
    if (disc < 0.0) {
        return null;
    }
	else if(disc === 0.0) {
		var q = ((b < 0) ? -0.5 * (b - disc) : -0.5 * (b + disc));
		var t0 = q / a;
		return [t0, t0];
	}
    disc = Math.sqrt(disc);
    var q = ((b < 0) ? -0.5 * (b - disc) : -0.5 * (b + disc));
    var t0 = q / a;
    var t1 = c / q;
    return (t0 > t1) ? [t1, t0] : [t0, t1];
}
function angleDist2PI(a,b) {
	return Math.min(Math.abs(a-b), Math.min(a,b)+Math.PI+Math.PI-Math.max(a,b));
}
function reflect(I, N) {
	var d2 = 2.0*N.dot(I);
	return new vec2(I.x - d2 * N.x, I.y - d2 * N.y);
}
function mix(x,y,t) {
	return x*(1.0-t)+y*t;
}
function unmix(x,y,t) {
	var L = Math.abs(x-y);
	if(L < 0.0001) {
		return 0.0;
	}
	else {
		return Math.abs(x-t)/Math.abs(x-y);
	}
} 
function unmix2(x,y,t) {
	var L = Math.abs(x-y);
	if(L < 0.0001) {
		return 0.0;
	}
	else {
		return (x-t)/(x-y);
	}
} 
function clamp(x, min, max) {
  return x <= min ? min : x >= max ? max : x;
}
function linear(v, tx, ty, t) {
	if(t >= 1.0) {
		v.set2(tx, ty);
	}
	else if(t >= 0){
		v.set2(v.x+t*(tx-v.x), v.y+t*(ty-v.y));
	}
}
function interpolate(v, tx, ty, t, maxSpeed) {
	var dist = v.dist2(tx,ty);
	var max = Math.abs(t)*maxSpeed;
	if(dist <= max) {
		v.set2(tx, ty);
	}
	else {
		dist = max/dist;
		v.set2(v.x+dist*(tx-v.x), v.y+dist*(ty-v.y));
	}
}
function compX(x) {
	return clamp(((x-RECT_L)/(RECT_R-RECT_L))*MAX_UINT, 0, MAX_UINT);
}
function compY(x) {
	return clamp(((x-RECT_T)/(RECT_B-RECT_T))*MAX_UINT, 0, MAX_UINT);
}
function compA(x) {
	return clamp((x*0.5/Math.PI)*MAX_UINT, 0, MAX_UINT);
}

function decompX(x) {
	return (x/MAX_UINT)*(RECT_R-RECT_L)+RECT_L;
}
function decompY(x) {
	return (x/MAX_UINT)*(RECT_B-RECT_T)+RECT_T;
}
function decompA(x) {
	return (x/MAX_UINT)*2.0*Math.PI;
}
function atan2PI(y0,x0) {
	var x = Math.atan2(y0,x0);
	return (x < 0 ? 2.0*Math.PI + x : x);
}
function rotateTo(a, t, maxRot) {
	var d = Math.abs(t-a);
	if(d <= Math.PI) {
		if(d <= maxRot) { return t; }
		return (a < t)?(a+maxRot):(a-maxRot);
	}
	else {
		var pi2 = 2.0*Math.PI;
		d = pi2-d;
		if(d <= maxRot) { return t; }
		if(a < t) {
			if(a >= maxRot) { return a-maxRot; }
			return pi2-maxRot+a;
		}
		else {
			var a = a+maxRot;
			if(a > pi2) a -= pi2;
			return a;
		}
	}
}
function distSq2Diff(x,y) {
	return x*x+y*y;
}

var tmp_arrayBuf = new ArrayBuffer(8);
var tmp_arrayBufU8 = new Uint8Array(tmp_arrayBuf);
var tmp_arrayBufU16 = new Uint16Array(tmp_arrayBuf);
var tmp_arrayBufI32 = new Int32Array(tmp_arrayBuf);
var tmp_arrayBufI64 = new BigInt64Array(tmp_arrayBuf);
var tmp_arrayBufF32 = new Float32Array(tmp_arrayBuf);
			
var isBigEndian = false;
function initBuf0() {
	tmp_arrayBufU16[0] = 0xAABB;
	if(tmp_arrayBufU8[0] === 0xAA) {
		isBigEndian = true;
	}
	else if(tmp_arrayBufU8[0] === 0xBB) {
		isBigEndian = false;
	}
	else {
		console.log("end error");
	}	
}
initBuf0();
var TIME_OFFSET = 0;
var TIME_PRECISION = 10000;
function glnow() {
	return Date.now()+TIME_OFFSET;
}
function toInt(num) {
	tmp_arrayBufI32[0] = num;
	return tmp_arrayBufI32[0];
}

function allocateBuf(size) {
	return new Buf(new ArrayBuffer(size));
}
function wrap(arrBuf) {
	return new Buf(arrBuf, arrBuf.byteLength);
}
function fromBase64(base64) {
	var bs = atob(base64);
    var len = bs.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = bs.charCodeAt(i);
    }
	return new Buf(bytes.buffer, bytes.buffer.byteLength);
}
class CircularBuffer {
	constructor(ca) {
		this.data = new Array(ca);
		this.ca = ca;
		this.f = 0;
		this.t = 0;
		this.length = 0;
	}
	add(da) {
		this.data[this.t] = da;
		if(this.f === this.t && this.length > 0) {
			this.f = (this.f+1)%this.ca;
			this.t = this.f;
		}
		else {
			this.t = (this.t+1)%this.ca;
			this.length = this.length+1;
		} 
	}
	get(i) {
		i = (this.f+i)%this.ca;
		return this.data[i];
	}
}
class Buf {
	constructor(buf, size) {
		this.data = buf;
		this.dataU8 = new Uint8Array(buf);
		this.pos = 0;
		this.limit = size;
		this.capacity = size;
	}
	dump() {
		var str = "";
		for(var i = 0; i < this.limit; i++) {
			str += this.dataU8[i] + " ";
		}
		console.log(str);
	}
	clear() { this.pos = 0; this.limit = this.capacity; return this; }
	flip() { this.limit = this.pos; this.pos = 0; var v = this.dataU8.subarray(this.pos,this.limit); v.buf = this; return v;}
	rewind() { this.pos = 0; }
	checkSize(x, size) {
		if(x < 0 || x >= size) throw "Out of bounds " + x + " " + " " + size;
	}	
	putByte(b) {
		this.checkSize(b, 256);
		this.checkSize(this.pos, this.limit);
		this.dataU8[this.pos++] = b;
		return this;
	}
	getByte() {
		this.checkSize(this.pos, this.limit);
		return this.dataU8[this.pos++];
	}
	putChar(ch) {
		this.checkSize(ch, 65536);
		this.checkSize(this.pos+1, this.limit);
		tmp_arrayBufU16[0] = ch;
		if(isBigEndian) {
			this.dataU8[this.pos++] = tmp_arrayBufU8[0];
			this.dataU8[this.pos++] = tmp_arrayBufU8[1];
		}
		else {
			this.dataU8[this.pos++] = tmp_arrayBufU8[1];
			this.dataU8[this.pos++] = tmp_arrayBufU8[0];
		}
		return this;
	}
	getChar() {
		this.checkSize(this.pos+1, this.limit);
		if(isBigEndian) {
			tmp_arrayBufU8[0] = this.dataU8[this.pos++];
			tmp_arrayBufU8[1] = this.dataU8[this.pos++];
		}
		else {
			tmp_arrayBufU8[1] = this.dataU8[this.pos++];
			tmp_arrayBufU8[0] = this.dataU8[this.pos++];
		}
		return tmp_arrayBufU16[0];
	}
	peekChar() {
		this.checkSize(this.pos+1, this.limit);
		if(isBigEndian) {
			tmp_arrayBufU8[0] = this.dataU8[this.pos];
			tmp_arrayBufU8[1] = this.dataU8[this.pos+1];
		}
		else {
			tmp_arrayBufU8[1] = this.dataU8[this.pos];
			tmp_arrayBufU8[0] = this.dataU8[this.pos+1];
		}
		return tmp_arrayBufU16[0];
	}
	putInt(ch) {
		//this.checkSize(ch, 65536);
		this.checkSize(this.pos+3, this.limit);
		tmp_arrayBufI32[0] = ch;
		if(isBigEndian) {
			this.dataU8[this.pos++] = tmp_arrayBufU8[0];
			this.dataU8[this.pos++] = tmp_arrayBufU8[1];
			this.dataU8[this.pos++] = tmp_arrayBufU8[2];
			this.dataU8[this.pos++] = tmp_arrayBufU8[3];
		}
		else {
			this.dataU8[this.pos++] = tmp_arrayBufU8[3];
			this.dataU8[this.pos++] = tmp_arrayBufU8[2];
			this.dataU8[this.pos++] = tmp_arrayBufU8[1];
			this.dataU8[this.pos++] = tmp_arrayBufU8[0];
		}
		return this;
	}
	getInt() {
		this.checkSize(this.pos+3, this.limit);
		if(isBigEndian) {
			tmp_arrayBufU8[0] = this.dataU8[this.pos++];
			tmp_arrayBufU8[1] = this.dataU8[this.pos++];
			tmp_arrayBufU8[2] = this.dataU8[this.pos++];
			tmp_arrayBufU8[3] = this.dataU8[this.pos++];
		}
		else {
			tmp_arrayBufU8[3] = this.dataU8[this.pos++];
			tmp_arrayBufU8[2] = this.dataU8[this.pos++];
			tmp_arrayBufU8[1] = this.dataU8[this.pos++];
			tmp_arrayBufU8[0] = this.dataU8[this.pos++];
		}
		return tmp_arrayBufI32[0];
	}
	putFloat(ch) {
		this.checkSize(this.pos+3, this.limit);
		tmp_arrayBufF32[0] = ch;
		if(isBigEndian) {
			this.dataU8[this.pos++] = tmp_arrayBufU8[0];
			this.dataU8[this.pos++] = tmp_arrayBufU8[1];
			this.dataU8[this.pos++] = tmp_arrayBufU8[2];
			this.dataU8[this.pos++] = tmp_arrayBufU8[3];
		}
		else {
			this.dataU8[this.pos++] = tmp_arrayBufU8[3];
			this.dataU8[this.pos++] = tmp_arrayBufU8[2];
			this.dataU8[this.pos++] = tmp_arrayBufU8[1];
			this.dataU8[this.pos++] = tmp_arrayBufU8[0];
		}
		return this;
	}
	getFloat() {
		this.checkSize(this.pos+3, this.limit);
		if(isBigEndian) {
			tmp_arrayBufU8[0] = this.dataU8[this.pos++];
			tmp_arrayBufU8[1] = this.dataU8[this.pos++];
			tmp_arrayBufU8[2] = this.dataU8[this.pos++];
			tmp_arrayBufU8[3] = this.dataU8[this.pos++];
		}
		else {
			tmp_arrayBufU8[3] = this.dataU8[this.pos++];
			tmp_arrayBufU8[2] = this.dataU8[this.pos++];
			tmp_arrayBufU8[1] = this.dataU8[this.pos++];
			tmp_arrayBufU8[0] = this.dataU8[this.pos++];
		}
		return tmp_arrayBufF32[0];
	}
	putLong(ch) {
		this.checkSize(this.pos+7, this.limit);
		tmp_arrayBufI64[0] = BigInt(ch);
		if(isBigEndian) {
			this.dataU8[this.pos++] = tmp_arrayBufU8[0];
			this.dataU8[this.pos++] = tmp_arrayBufU8[1];
			this.dataU8[this.pos++] = tmp_arrayBufU8[2];
			this.dataU8[this.pos++] = tmp_arrayBufU8[3];
			this.dataU8[this.pos++] = tmp_arrayBufU8[4];
			this.dataU8[this.pos++] = tmp_arrayBufU8[5];
			this.dataU8[this.pos++] = tmp_arrayBufU8[6];
			this.dataU8[this.pos++] = tmp_arrayBufU8[7];
		}
		else {	
			this.dataU8[this.pos++] = tmp_arrayBufU8[7];
			this.dataU8[this.pos++] = tmp_arrayBufU8[6];
			this.dataU8[this.pos++] = tmp_arrayBufU8[5];
			this.dataU8[this.pos++] = tmp_arrayBufU8[4];
			this.dataU8[this.pos++] = tmp_arrayBufU8[3];
			this.dataU8[this.pos++] = tmp_arrayBufU8[2];
			this.dataU8[this.pos++] = tmp_arrayBufU8[1];
			this.dataU8[this.pos++] = tmp_arrayBufU8[0];
		}
		return this;
	}
	getLong() {
		this.checkSize(this.pos+7, this.limit);
		if(isBigEndian) {
			tmp_arrayBufU8[0] = this.dataU8[this.pos++];
			tmp_arrayBufU8[1] = this.dataU8[this.pos++];
			tmp_arrayBufU8[2] = this.dataU8[this.pos++];
			tmp_arrayBufU8[3] = this.dataU8[this.pos++];
			tmp_arrayBufU8[4] = this.dataU8[this.pos++];
			tmp_arrayBufU8[5] = this.dataU8[this.pos++];
			tmp_arrayBufU8[6] = this.dataU8[this.pos++];
			tmp_arrayBufU8[7] = this.dataU8[this.pos++];
		}
		else {
			tmp_arrayBufU8[7] = this.dataU8[this.pos++];
			tmp_arrayBufU8[6] = this.dataU8[this.pos++];
			tmp_arrayBufU8[5] = this.dataU8[this.pos++];
			tmp_arrayBufU8[4] = this.dataU8[this.pos++];
			tmp_arrayBufU8[3] = this.dataU8[this.pos++];
			tmp_arrayBufU8[2] = this.dataU8[this.pos++];
			tmp_arrayBufU8[1] = this.dataU8[this.pos++];
			tmp_arrayBufU8[0] = this.dataU8[this.pos++];
		}
		return Number(tmp_arrayBufI64[0]);
	}
	putByteString(str) {
		var len = str.length;
		this.checkSize(this.pos+1+len, this.limit);
		this.putChar(len);
		for(var i = 0; i < len; i++) {
			this.putByte(str.charCodeAt(i));
		}
		return this;
	}
	getByteString() {
		this.checkSize(this.pos+1, this.limit);
		var len = this.getChar();
		this.checkSize(this.pos-1+len, this.limit);
		var res = "";
		for(var i = 0; i < len; i++) {
			res += String.fromCharCode(this.getByte());
		}
		return res;
	}
	putString(str) {
		var len = str.length;
		this.checkSize(this.pos+1+len+len, this.limit);
		this.putChar(len);
		for(var i = 0; i < len; i++) {
			this.putChar(str.charCodeAt(i));
		}
		return this;
	}
	getString() {
		this.checkSize(this.pos+1, this.limit);
		var len = this.getChar();
		this.checkSize(this.pos-1+len+len, this.limit);
		var res = "";
		for(var i = 0; i < len; i++) {
			res += String.fromCharCode(this.getChar());
		}
		return res;
	}
	putObj(obj) {
		this.putString(JSON.stringify(obj));
		return this;
	}
	getObj() {
		var str = this.getString();
		return JSON.parse(str);
	}
}
class vec3 {
	constructor(xx = 0.0, yy = 0.0, zz = 0.0) {
		this.x = xx;
		this.y = yy;
		this.z = zz;
	}
	dot(v) {
		return this.x*v.x+this.y*v.y+this.z*v.z;
	}
	lengthSquared() {
		return this.x*this.x+this.y*this.y+this.z*this.z;
	}
	addLocal(v) {
		this.x += v.x;
		this.y += v.y;	
		this.z += v.z;
		return this;
	}
	sub(v) {
		return new vec3(this.x-v.x, this.y-v.y, this.z-v.z);
	}
	subLocal(v) {
		this.x -= v.x;
		this.y -= v.y;	
		this.z -= v.z;
		return this;
	}
	multLocal1(num) {
		this.x *= num;
		this.y *= num;
		this.z *= num;
		return this;
	}
}
class vec2 {
	constructor(xx = 0.0, yy = 0.0) {
		this.x = xx;
		this.y = yy;
	}
	dot(v) {
		return this.x*v.x+this.y*v.y;
	}
	dot2(x,y) {
		return this.x*x+this.y*y;
	}
	lengthSquared() {
		return this.x*this.x+this.y*this.y;
	}
	normalizeLocal() {
		var len = this.lengthSquared();
		if(len <= 0.001) {
			this.x = 0;
			this.y = 1;
		}
		else {
			len = 1.0/Math.sqrt(len);
			this.x *= len;
			this.y *= len;
		}
		return this;
	}	
	distSq2(xx,yy) {
		var x = this.x-xx;
		var y = this.y-yy;
		return x*x+y*y;
	}
	dist2(xx,yy) {
		return Math.sqrt(this.distSq2(xx,yy));
	}
	distSq(b) {
		var x = this.x-b.x;
		var y = this.y-b.y;
		return x*x+y*y;
	}
	dist(b) {
		return Math.sqrt(this.distSq(b));
	}
	set(b) {
		this.x = b.x;
		this.y = b.y;
		return this;
	}
	set2(xx,yy) {
		this.x = xx;
		this.y = yy;
		return this;
	}
	addLocal(b) {
		this.x = this.x + b.x;
		this.y = this.y + b.y;
		return this;
	}
	sub(v) {
		return new vec2(this.x-v.x, this.y-v.y);
	}
	subLocal(b) {
		this.x = this.x - b.x;
		this.y = this.y - b.y;
		return this;
	}
	mulLocal(b) {
		this.x = this.x * b.x;
		this.y = this.y * b.y;
		return this;
	}
	multLocal1(num) {
		this.x *= num;
		this.y *= num;
		return this;
	}
	reflect(N) {
		return reflect(this, N);	
	}
	reflectLocal(N) {
		var d2 = 2.0*this.dot(N);
		this.x -= d2 * N.x;
		this.y -= d2 * N.y;
		return this;
	}
	mixLocal(b,t) {
		this.x = mix(this.x,b.x,t);
		this.y = mix(this.y,b.y,t);
		return this;
	}
	mix(b,t) {
		return new vec2(mix(this.x,b.x,t), mix(this.y,b.y,t));
	}
	zero() { this.x = 0.0; this.y = 0.0; return this; }
	isZero() { return this.x == 0.0 && this.y == 0.0;}
}
var KeyInput = {
	TAB: 9,
	SHIFT: 16,
	CTRL: 17,
	ESC: 27,
	SPACE: 32,
	W: 87,
	S: 83,
	A: 65,
	D: 68,
	/*W: 69,
	S: 68,
	A: 83,
	D: 70,*/
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};
 
var Movement = {
	NONE:   		{idM:0,  id: 0, dx: 0.0,  dy: 0.0, ra: 0.0},
	UP:    		 	{idM:2,  id: 3, dx: 0.0,  dy:-1.0, ra: Math.PI},
	UP_LEFT:   	  	{idM:10, id: 4, dx:-SQRT_2_INV,  dy:-SQRT_2_INV, ra: Math.PI*1.25},
	UP_RIGHT:     	{idM:18, id: 2, dx: SQRT_2_INV,  dy:-SQRT_2_INV, ra: Math.PI*0.75},
	DOWN:   		{idM:4,  id: 7, dx: 0.0,  dy: 1.0, ra: 0.0},
	DOWN_LEFT:   	{idM:12, id: 6, dx:-SQRT_2_INV,  dy: SQRT_2_INV, ra: Math.PI*1.75},
	DOWN_RIGHT:   	{idM:20, id: 8, dx: SQRT_2_INV,  dy: SQRT_2_INV, ra: Math.PI*0.25},
	LEFT:   		{idM:8,  id: 5, dx:-1.0,  dy: 0.0, ra: Math.PI*1.5},
	RIGHT:  		{idM:16, id: 1, dx: 1.0,  dy: 0.0, ra: Math.PI*0.5},

	TACKLED:   		{idM:32, id: 9,  dx: 0.0,  dy: 0.0},
	
	MASK_X: 24,
	MASK_Y: 6,
	fromDir(dx, dy) {
		if(dx > 1.0) {
			if(dy > 1.0) {
				return Movement.DOWN_RIGHT;
			}
			else if(dy < -1.0) {
				return Movement.UP_RIGHT;
			}
			else {
				return Movement.RIGHT;
			}
		}
		else if(dx < -1.0) {
			if(dy > 1.0) {
				return Movement.DOWN_LEFT;
			}
			else if(dy < -1.0) {
				return Movement.UP_LEFT;
			}
			else {
				return Movement.LEFT;
			}
		}
		else {
			if(dy > 1.0) {
				return Movement.DOWN;
			}
			else if(dy < -1.0) {
				return Movement.UP;
			}
			else {
				return Movement.NONE;
			}
		}
	},
	fromAngle2PI(a2PI) {
		//DOWN, DOWN_RIGHT, RIGHT, UP_RIGHT, UP, UP_LEFT, LEFT, DOWN_LEFT
		if(a2PI > Math.PI*1.875) return Movement.DOWN;
		a2PI = toInt((a2PI-Math.PI*0.125)*1.27323954473516);
		if(a2PI < 0) return Movement.DOWN;
		return MOVEMENT_ARRAY[1+a2PI];
	},
	fromId: function(id) {
		if(id <= MOVEMENT_ARRAY2.length) {
			return MOVEMENT_ARRAY2[id];
		}
		err("should not happen Movement.fromId(" + id + ")");
		return Movement.NONE;	
	}, 
	fromIdM: function(id) {
		switch(id) {
			case 0: return Movement.NONE;
			case 2: return Movement.UP;
			case 10: return Movement.UP_LEFT;
			case 18: return Movement.UP_RIGHT;
			case 4: return Movement.DOWN;
			case 12: return Movement.DOWN_LEFT;
			case 20: return Movement.DOWN_RIGHT;
			case 8: return Movement.LEFT;
			case 16: return Movement.RIGHT;
			case 32: return Movement.TACKLED;
		}
		err("should not happen Movement.fromId(" + id + ")");
		return Movement.NONE;	
	}, 
	toBuf: function(m, buf) {
		buf.putByte(MSG_CLIENT_MOVEMENT);
		buf.putByte(m.id);
		return buf;
	},
	fromBuf: function(buf) {
		return Movement.fromId(buf.getByte());
	},
	toBufTackle: function(a, buf) {
		buf.putByte(MSG_CLIENT_TACKLE);
		buf.putChar(compA(a));
		return buf;
	},
	fromBufTackle: function(buf) {
		return decompA(buf.getChar());
	},
	toBufJump: function(a, buf) {
		buf.putByte(A.MSG_CLIENT_JUMP);
		buf.putChar(compA(a));
		return buf;
	}
};	
var MOVEMENT_ARRAY = [Movement.DOWN, Movement.DOWN_RIGHT, Movement.RIGHT, 
		Movement.UP_RIGHT, Movement.UP, Movement.UP_LEFT, Movement.LEFT, Movement.DOWN_LEFT, Movement.DOWN, Movement.DOWN_RIGHT];
var MOVEMENT_ARRAY2 = [
	Movement.NONE, Movement.RIGHT, Movement.UP_RIGHT,
	Movement.UP, Movement.UP_LEFT, Movement.LEFT,
	Movement.DOWN_LEFT, Movement.DOWN, Movement.DOWN_RIGHT,
	Movement.TACKLED ];

function tere(str, t, f, i) { 
	if(A.TERE[t] === undefined) return str;
	return str.substring(0,f) + '*'.repeat(i-f) + str.substring(i);
}
function tefi(str) {
	var f = 0;
	var t = "";
	for(var i = 0; i < str.length; i++) {
		var ch = str[i];
		if(ch >= 'a' && ch <= 'z') {
			t += ch;
		}
		else if(ch >= 'A' && ch <= 'Z') {
			t += ch.toLowerCase();
		}
		else {
			switch(ch) {
				case '0': t += 'o'; break;
				case '1': t += 'i'; break;
				case '3': t += 'e'; break;
				case '4': t += 'a'; break;
				case '5': t += 's'; break;
				case '6': t += 'g'; break;
				case '8': t += 'b'; break;
				default:
					if(f === i) f = i+1;
					else {
						str = tere(str, t, f, i);
						t = "";
						f = i+1;
					}
			}
		}
	}	
	if(f !== str.length) {		
		str = tere(str, t, f, str.length);
		t = "";	
	}
	return str;
}
class Goalkeeper {
	constructor(game,team1) {
		this.game = game;
		this.team1 = team1;
		this.hp = 10;
		this.actionDelay = 0;
		this.ballDelay = 0;
		this.xyDef = team1?new vec2(0.0,RECT_B-0.01-0.1):new vec2(0.0,RECT_T+0.01+0.1);
		this.xyI = new vec2(this.xyDef.x,this.xyDef.y);
		this.xy0 = new vec2(this.xyDef.x,this.xyDef.y);
		this.xy = new vec2(this.xyDef.x,this.xyDef.y);
		this.dxy = new vec2(0,0);
		this.diveX = 0;
		this.state = 0;
		this.saveState = 0;
		this.delay = 0;
		this.gameStep = 0;
		this.movementId = Movement.NONE.id;
		this.lookAtDir = team1?Movement.UP.id:Movement.DOWN.id;
		this.updateNeeded = false;
	}
	canBall() {  return this.ballDelay <= this.game.gameStep; }
	canMove() { return this.delay <= this.game.gameStep;  }
	setMovementId(id) {
		//if(id === Movement.TACKLED.id) id = Movement.NONE.id;
		this.movementId = id;
		if(this.movementId !== Movement.NONE.id && this.movementId !== Movement.TACKLED.id) {
			this.lookAtDir = id;
		}
	} 
	getTackleStart() { return 0.5; }
	defaultY() {
		return this.team1?-1:1;
	}
	defaultRot() {
		return this.team1?Movement.UP.ra:Movement.DOWN.ra;
	}
	action() {
		if(this.hp > 0 && this.actionDelay < this.game.gameStep) {
			//this.actionDelay = this.game.gameStep+10;
			this.hp--;
			//this.updateNeeded = true;
		}
	}
	getSpeed() {
	 	var arr = (this.hp <= 0)?A.GOALKEEPER_SPEED_0:((this.hp<=5)?A.GOALKEEPER_SPEED_5:A.GOALKEEPER_SPEED);
		return arr[this.state];
	}
}
class Char {
	constructor(game, x, y) {
		this.game = game;
		this.xyI = new vec2(x,y);
		this.xy0 = new vec2(x,y);
		this.xy = new vec2(x,y);
		this.dxy = new vec2(0,0);
		this.fxy = new vec2(0,0);
		this.fxyI = new vec2(0,0);
		this.gameStep = 0;
		this.lastGameStep = 0;
		this.formDelay = 0;
		this.doDash = false;
		this.doTackle = false;
		this.doTackleA = 0;
		this.inputId = Movement.NONE.id;
		this.movementId = Movement.NONE.id;
		this.lookAtDir = Movement.UP.id;
		this.playerId = -1;
		this.ballDelay = 0;
		this.dash = 0;
		this.dashDelay = 0;
		this.dashFlag = false;
		this.dashStopFlag = false;
		this.delay = 0;
		this.tackle = 0;
		this.tackleFlag = false;
		this.tackleFlag2 = false;
		this.head = 0;
		this.headSpd = 0;
		this.headLen = 5;
		this.dashUpdateNeeded = false;
		this.movUpdateNeeded = false;
		this.movXUpdateNeeded = false;
		this.passUpdateNeeded = false;
		this.passEndUpdateNeeded = false;
		this.tckUpdateNeeded = false;
		this.headUpdateNeeded = false;
		this.tckUpdateA = 0;
		this.tckUpdateA2 = 0;
		this.passStart = 0;
		this.passStep = 0;
		this.passEndStep = 0;
		this.passPow = 0;
		this.passA = new vec2(0.0,0.0);
	}
	angle() { return 0.0; }
	canBall() {  return this.ballDelay <= this.game.gameStep; }
	canPass() { return this.delay <= this.game.gameStep && !this.isPassing(); }
	canDash() { return this.delay <= this.game.gameStep && this.dashDelay <= this.game.gameStep && !this.isDashing() && !this.isTackling() && !this.isPassing(); }
	canMove() {  return this.delay <= this.game.gameStep || this.isTackling();  }
	canTackle() { return this.delay <= this.game.gameStep && !this.isTackling() && !this.isPassing(); }
	canFormMove() {  return this.formDelay <= this.game.gameStep; }
	isDashing() { return this.dash > this.game.gameStep; }
	isHeading() { return this.head > this.game.gameStep;  }
	isTackling() { return this.tackle > this.game.gameStep;  }
	isPassing() { return this.passStart !== 0; }
	isPassingA() { return this.passStart === A.MSG_CHAR_PASS_START; }
	isPassingB() { return this.passStart === A.MSG_CHAR_VOLLEY_START; }

	isHeadingHere() { return this.head > this.gameStep;  }	
	isTacklingHere() { return this.tackle > this.gameStep;  }	
	isDashingHere() { return this.dash > this.gameStep; }
	canMoveHere() {  return this.delay <= this.gameStep; }	

	setMovementId(id) {
		//if(id === Movement.TACKLED.id) id = Movement.NONE.id;
		this.movementId = id;
		if(this.movementId !== Movement.NONE.id && this.movementId !== Movement.TACKLED.id) {
			this.lookAtDir = id;
		}
	} 

	clampXY() {
		if(this.xy.x < RECT_L) {
			this.xy.x = RECT_L;
		}
		else if(this.xy.x > RECT_R) {
			this.xy.x = RECT_R;
		}

		if(this.xy.y < RECT_T) {
			this.xy.y = RECT_T;
		}
		else if(this.xy.y > RECT_B) {
			this.xy.y = RECT_B;
		}
	}

	applyInput() {
		if(this.movementId !== this.inputId) {
			var movement = Movement.fromId(this.inputId);
			this.dxy.set2(movement.dx, movement.dy);
			this.setMovementId(this.inputId);
			this.movXUpdateNeeded = true;
			//this.movUpdateNeeded = true;
		}
	}
}
class Ball {
	constructor(game) {
		this.game = game;
		this.xyI = new vec2(0,0);
		this.xy0 = new vec2(0,0);
		this.xy = new vec2(0,0);
		this.dxy = new vec2(0,0);
		this.bxy = new vec2(0,0);
		this.z0 = 0.0;
		this.z = 0.0;
		this.dz = 0.0;
		this.speed0 = 0;
		this.speed = 0;
		this.speedStep = 0;
		this.gameStep = 0;
		this.delay = 0;
		this.goalsO = 0;
		this.goalsK = 0;
		this.scoreDelay = 0;
		this.pickDelay = 0;
		this.charId = -1;
		this.pId0 = -1;
		this.pId1 = -1;
		this.backspin = 0;
		this.goalStep = 0;
		this.goal = false;
		this.updateNeeded = false;
	}
	setPlayerId(p) {
		this.pId1 = this.pId0;
		this.pId0 = p;
	}
	isGoal() {
		return this.goal;
	}
	isFree() {
		return this.charId === -1;
	}
	isTackable() { return this.pickDelay < this.game.gameStep; }
	isPickable() {
		return this.isFree() && this.speed <= A.BALL_PICK_SPD && Math.min(this.z0, this.z) < A.BALL_PICK_Z && this.delay < this.game.gameStep && this.pickDelay < this.game.gameStep;
	}
	getXY() { 
		return this.isFree()?this.xy:((this.charId < 8)?this.game.chars[this.charId].xy:this.game.goalkeepers[this.charId-8].xy);
	}
	getX() {
		return this.getXY().x;
	}
	getY() {
		return this.getXY().y;
	}
	toBuf(b) {
		b.putByte(A.MSG_BALL);
		b.putByte(this.charId+1);
		b.putChar(this.gameStep);
		b.putChar(this.speedStep);
		//b.putChar(compX(this.xy.x));
		//b.putChar(compY(this.xy.y));
		b.putFloat(this.xy.x);
		b.putFloat(this.xy.y);
		b.putFloat(this.dxy.x);
		b.putFloat(this.dxy.y);
		b.putFloat(this.speed0);
		b.putFloat(this.speed);
		b.putFloat(this.z);
		b.putFloat(this.dz);
		b.putByte(this.backspin);
        if(this.backspin > 0) {
            b.putFloat(this.bxy.x);
            b.putFloat(this.bxy.y);
        }
		b.putByte(this.goal?1:0);
		if(this.goal) {
			b.putByte(this.goalsO);
			b.putByte(this.goalsK);
		}
		return b;
	} 
	fromBuf(b) {
		//var prevId = 
		this.charId = b.getByte()-1;
		this.gameStep = b.getChar();
		this.speedStep = b.getChar();
		//this.xy.x = decompX(b.getChar());
		//this.xy.y = decompY(b.getChar());
		this.xy.x = b.getFloat();
		this.xy.y = b.getFloat();
		this.dxy.x = b.getFloat();
		this.dxy.y = b.getFloat();
		this.speed0 = b.getFloat();
		this.speed = b.getFloat();
		this.z = b.getFloat();
		this.dz = b.getFloat();
		this.backspin = b.getByte();
        if(this.backspin > 0) {
            this.bxy.x = b.getFloat();
            this.bxy.y = b.getFloat();
        }
		this.goal = b.getByte() !== 0;
		if(this.goal) {
			this.goalsO = b.getByte();
			this.goalsK = b.getByte();
		}
		else {
			if(this.charId === -1 && this.xy.x === 0.0 && this.xy.y === 0.0 && this.speed === 0.0) {
				this.xyI.x = 0.0;
				this.xyI.y = 0.0;
			}
		}	
		this.goalStep = this.goal?this.gameStep:0;
	}
}
class Game {
	constructor() {
		this.timeLimit = 2400; //4min
		this.gameStep = 0;
		this.startTime = 0;
		this.maxPlayers = 8;
		this.allowSpectators = true;
		this.started = false;
		this.ended = false;
		this.goalkeepers = [new Goalkeeper(this, true), new Goalkeeper(this, false)];
		this.playersA = [];
		this.playersB = [];
		this.spectators = [];
		this.chars = [];
		this.ball = new Ball(this);
		this.fieldType = 0;
		this.skippedFrames = 0;
		for(var i = 0; i < 8; i++) {
			var ch = new Char(this, 0.0, 0.0);
			this.chars.push(ch);
		}
	}

	static newGame(g) {
		var game = new Game(); 
		game.timeLimit = g.getMinutes()*60*10; 

		var _posO = g.getFieldPosO().pos;
		var _posK = g.getFieldPosK().pos;

		var startPos = A.START_POS_MIDDLE;

		for(var i = 0; i < 4; i++) {
			var i2 = i+i;
			var chO = game.chars[i];
			chO.fxy.set2(_posO[i2], _posO[i2+1]);
			var chK = game.chars[i+4];
			chK.fxy.set2(-_posK[i2], -_posK[i2+1]);

			chO.xy.set2(startPos[i2], startPos[i2+1]);
			chK.xy.set2(-startPos[i2], -startPos[i2+1]);

			chO.stats = new CharDataCached(g.chars[i]);
			chK.stats = new CharDataCached(g.chars[i+4]);
		}

		game.started = true;
		return game;
	}

	playerCount() { return this.playersA.length + this.playersB.length; }

	getFreeCharIdA(id) {
		for(var k = 0; k < 4; k++) {
			if(this.chars[k].playerId === -1) return k;
		}
		return -1;
	}
	getFreeCharIdB(id) {
		for(var k = 4; k < 8; k++) {
			if(this.chars[k].playerId === -1) return k;
		}
		return -1;
	}
	removePlayer(p) {
		for(var k = this.playersA.length-1; k >= 0; k--) {
			var player = this.playersA[k];
			if(player.id === p.id) {
				this.playersA[k].charId = -1;
				this.playersA.splice(k, 1);
			}
		}
		for(var k = this.playersB.length-1; k >= 0; k--) {
			var player = this.playersB[k];
			if(player.id === p.id) {
				this.playersB[k].charId = -1;
				this.playersB.splice(k, 1);
			}
		}
		for(var k = this.spectators.length-1; k >= 0; k--) {
			var player = this.spectators[k];
			if(player.id === p.id) {
				console.log("error, spectators controls char");
				this.spectators[k].charId = -1;
				this.spectators.splice(k, 1);
			}
		}
		for(var k = this.chars.length-1; k >= 0; k--) {
			var ch = this.chars[k];
			if(ch.playerId === p.id) {
				ch.playerId = -1;
				//TODO ch.setUpdateNee
			}
		}
	}

	getPlayerById(id) {
		for(var k = 0; k < this.playersA.length; k++) {
			var player = this.playersA[k];
			if(player.id === id) return player;
		}
		for(var k = 0; k < this.playersB.length; k++) {
			var player = this.playersB[k];
			if(player.id === id) return player;
		}
		return null;
	}	

	getPlayerCharId(b, player) {
		b.putByte(A.MSG_SET_CHAR);
		b.putByte(player.charId+1);
		b.putChar(player.id+1);
		return b;
	}
	setPlayerCharId(b) {
		var charId = b.getByte()-1;
		var id = b.getChar()-1;
		var player = this.getPlayerById(id);
		if(player !== null) {
			player.charId = charId;
		}
		for(var i = 0; i < 8; i++) {
			if(this.chars[i].playerId === id) 
				this.chars[i].playerId = -1;
		}
		if(charId !== -1) {
			this.chars[charId].playerId = id;
		}
	}
	getGameTime(b) {
		b.putByte(MSG_GAME_TIME);
		b.putLong(this.startTime);
		return b;
	}
	setGameTime(b) {
		this.startTime = b.getLong();
	}
	getPass(b, k, id) {
		if(id !== 0 && id !== A.MSG_CHAR_PASS_START && id !== A.MSG_CHAR_VOLLEY_START) { 
			throw "Pass type error " + id;
		}
		if(id === 0) {
			b.putByte(A.MSG_CHAR_PASS_START);
			b.putByte(k);
			b.putChar(0);
		}
		else {
			b.putByte(id);
			b.putByte(k);
			b.putChar(this.gameStep);
		}
		return b;
	}
	setPass(b, id) {
		var k = b.getByte();
		var ch0 = b.getChar();
		if(id !== A.MSG_CHAR_PASS_START && id !== A.MSG_CHAR_VOLLEY_START) { 
			throw "Pass type error " + id;
		}
		var ch = this.chars[k];
		if(ch0 == 0) {
			ch.passStart = 0;
			ch.passStep = 0;
		}
		else {
			ch.passStart = id;
			ch.passStep = ch0;
		}
	}
	getDash(b, id) {
		b.putByte(A.MSG_CHAR_DASH);
		var ch = this.chars[id];
		b.putByte(id);
		b.putByte(ch.movementId);
		b.putChar(this.gameStep);
		b.putChar(compX(ch.xy.x));
		b.putChar(compY(ch.xy.y));
		b.putByte(Math.max(100+ch.dash-this.gameStep, 0));
		b.putByte(Math.max(100+ch.dashDelay-this.gameStep, 0));
		return b;
	}	
	setDash(b) {
		var id = b.getByte();
		var ch = this.chars[id];
		var movement = Movement.fromBuf(b);
		ch.setMovementId(movement.id);
		ch.dxy.set2(movement.dx, movement.dy);
		ch.gameStep = b.getChar();
		ch.xy.x = decompX(b.getChar());
		ch.xy.y = decompY(b.getChar());
		ch.dash = ch.gameStep+(b.getByte()-100);
		ch.dashDelay = ch.gameStep+(b.getByte()-100);
		//ch.dash = ch.gameStep+A.DASH_STEPS;
		//ch.dashDelay = ch.dash+A.DASH_DELAY_STEPS;

		//calc latency
		//var el = glnow()-gl.game.startTime;
		//var lag = el-ch.gameStep*TICK_MS;
		
		//log("lag", lag);

		//var expY =  ch.xy.y - A.DASH_SPD* (ch.dash-ch.gameStep)* TICK_MS*0.001;
		//console.log("dash from " +ch.gameStep + " to " + ch.dash + " " + ch.xy.x + " " + ch.xy.y + " exp " + expY);
		
	}	

		
	getHead(b, id, tackleA) {
		b.putByte(A.MSG_CHAR_HEAD);
		var ch = this.chars[id];
		b.putByte(id);
		b.putByte(ch.movementId);
		b.putChar(this.gameStep);
		b.putChar(compX(ch.xy.x));
		b.putChar(compY(ch.xy.y));
		b.putChar(compA(tackleA));
		b.putFloat(ch.headSpd);
		b.putByte(Math.max(ch.head-this.gameStep, 0));
		b.putByte(Math.max(ch.delay-this.gameStep, 0));
		return b;
	}	

	setHead(b) {
		var id = b.getByte();
		var ch = this.chars[id];
		var movement = Movement.fromBuf(b);
		ch.setMovementId(movement.id);
		//ch.dxy.set2(movement.dx, movement.dy);
		ch.gameStep = b.getChar();
		ch.xy.x = decompX(b.getChar());
		ch.xy.y = decompY(b.getChar());
		var tackleA = decompA(b.getChar());
		ch.dxy.set2(Math.sin(tackleA), Math.cos(tackleA));
		ch.headSpd = b.getFloat();
		var hLen = b.getByte();
		ch.head = ch.gameStep+hLen;
		ch.delay = ch.gameStep+b.getByte();
		ch.headLen = hLen;
	}	

	getTck(b, id, tackleA) {
		b.putByte(MSG_CHAR_TCK);
		var ch = this.chars[id];
		b.putByte(id);
		b.putByte(ch.movementId);
		b.putChar(this.gameStep);
		b.putChar(compX(ch.xy.x));
		b.putChar(compY(ch.xy.y));
		b.putChar(compA(tackleA));
		b.putByte(Math.max(ch.tackle-this.gameStep, 0));
		b.putByte(Math.max(ch.delay-this.gameStep, 0));
		return b;
	}	

	setTck(b) {
		var id = b.getByte();
		var ch = this.chars[id];
		var movement = Movement.fromBuf(b);
		ch.setMovementId(movement.id);
		//ch.dxy.set2(movement.dx, movement.dy);
		ch.gameStep = b.getChar();
		ch.xy.x = decompX(b.getChar());
		ch.xy.y = decompY(b.getChar());
		var tackleA = decompA(b.getChar());
		ch.dxy.set2(Math.sin(tackleA), Math.cos(tackleA));
		ch.tackle = ch.gameStep+b.getByte();
		ch.delay = ch.gameStep+b.getByte();


	}	

	getGoalkeeper(b, id) {	
		var ch = this.goalkeepers[id];
		b.putByte(A.MSG_GOALKEEPER_DATA);
		b.putByte(id);
		b.putByte(ch.movementId);
		b.putByte(ch.state);	
		b.putByte(ch.hp);	
		b.putChar(this.gameStep);
		b.putChar(compX(ch.xy.x));
		b.putChar(compY(ch.xy.y));
	}
	setGoalkeeper(b) {
		var id = b.getByte();
		var ch = this.goalkeepers[id];
		var movement = Movement.fromBuf(b);
		if(movement.id === Movement.TACKLED.id) ch.setMovementId(Movement.NONE.id);
		else ch.setMovementId(movement.id);
		ch.dxy.set2(movement.dx, movement.dy);
		ch.state = b.getByte();
		ch.hp = b.getByte();
		ch.gameStep = b.getChar();
		ch.xy.x = decompX(b.getChar());
		ch.xy.y = decompY(b.getChar());

		//var el = glnow()-gl.game.startTime;
		//var lag = el-ch.gameStep*TICK_MS;
		//log("lag", lag);
	}	

	getCharX(b, id) {
		var ch = this.chars[id];
		b.putByte(128 | (id << 4) | ch.movementId); //ch.movementId
		b.putChar(compX(ch.xy.x));
		b.putChar(compY(ch.xy.y));
		return b;
	} 
	setCharX(b, t, sTime) {
		var ch = this.chars[(t>>4)&7];

		//console.log("ch step " + ch.gameStep + " ");

		var movement = Movement.fromId(t&15);
		if(movement.id === Movement.TACKLED.id) ch.setMovementId(Movement.NONE.id);
		else ch.setMovementId(movement.id);
		ch.dxy.set2(movement.dx, movement.dy);

		ch.xy.x = decompX(b.getChar());
		ch.xy.y = decompY(b.getChar());

		ch.gameStep = sTime;
	}
	getChar(b, id) {
		b.putByte(MSG_CHAR_DATA);
		var ch = this.chars[id];
		b.putByte(id);
		b.putByte(ch.movementId);
		b.putChar(this.gameStep);
		b.putChar(compX(ch.xy.x));
		b.putChar(compY(ch.xy.y));
		b.putChar(ch.delay);
		return b;
	}
	setChar(b) {
		var id = b.getByte();
		var ch = this.chars[id];
		var movement = Movement.fromBuf(b);
		if(movement.id === Movement.TACKLED.id) ch.setMovementId(Movement.NONE.id);
		else ch.setMovementId(movement.id);
		ch.dxy.set2(movement.dx, movement.dy);
		ch.gameStep = b.getChar();
		ch.xy.x = decompX(b.getChar());
		ch.xy.y = decompY(b.getChar());
		ch.delay = b.getChar();
		ch.tackle = Math.min(ch.tackle, ch.delay);
		/*if(movement.id === Movement.TACKLED.id) {
			ch.delay = ch.gameStep + A.TACKLED_DELAY_STEPS; 
			//console.log("delay " + id);
		}
		else {
			//ch.tackle = 0;
			//ch.delay = 0;
		}*/

		//var el = glnow()-gl.game.startTime;
		//var lag = el-ch.gameStep*TICK_MS;
		//log("lag", lag);
		
		//console.log("setChar " + ch.dxy.x + " " + ch.dxy.x + " " + ch.isDashing() + " " + ch.gameStep + " " + ch.dash);

		//log(4, "STEP " + ch.gameStep + " " +  id + "  mov " + ch.dxy.x + " " + ch.dxy.y);
	} 
	getCharDataCached(b, id) {
        b.putByte(MSG_CHAR_DATA_CACHED);
        b.putByte(id);
        var ch = this.chars[id];
        ch.stats.toBuf(b);
        return b;
    }
    setCharDataCached(b) {
        var id = b.getByte();
        var ch = this.chars[id];
        ch.stats.fromBuf(b);
    }
	getAllChars(b) {
		b.putByte(MSG_GET_ALL_CHAR);
		for(var i = 0; i < this.goalkeepers.length; i++) {
			this.getGoalkeeper(b, i);
		}
		for(var i = 0; i < this.chars.length; i++) {
			this.getChar(b, i);
		}
		return b;
	}
	setAllChars(b) {
		for(var i = 0; i < this.goalkeepers.length; i++) {
			b.getByte();
			this.setGoalkeeper(b);
		}
		for(var i = 0; i < this.chars.length; i++) {
			b.getByte();
			this.setChar(b);
		}
	}
}
class Player {
	constructor(chan0, id0, username0) {
		this.chan = chan0;
		this.text = null;
		this.id = id0; //server id, from 0 to max players
		this.username = username0;
		this.game = null;
		this.charId = -1;
		this.setCharTo = -1;
		this.team1 = true;
		this.spectating = false;
		this.sync = -1;
		this.goals = 0;
		this.assists = 0;
		this.ti = 0;
	}	
	toBuf(buf) {
		buf.putByte(MSG_PLAYER_DATA);
		buf.putByte(this.charId+1);
		buf.putChar(this.id);
		return buf;
	}
	fromBuf(buf) {
		this.setCharId(buf.getByte()-1);
		this.id = buf.getChar();
	}
	setCharId(charId) {
		this.charId = charId;
		if(this.charId === -1) {
			this.spectating = true;
			this.team1 = true;
		}
		else {
			this.spectating = false;
			this.team1 = this.charId < 4;
		}
	}
}
class XTimer {
	constructor(time,func) {
		this.time0 = 0;
		this.time = time;
		this.tm = null;
		this.fn = func;
		this.cb = this.callback.bind(this);
	}
	startAlign(t) {
		if(this.tm === null) {		
			var n = Date.now(); 
			var t0 = t-(n%t);
			this.time0 = n+t0;
			this.start0(t0); //var now = Date.now();
		}
	}
	start0(t0) {
		if(this.tm === null) {		
			 //or glnow
			this.tm = setTimeout(this.cb, t0);
		}
	}
	stop() {
		if(this.tm !== null) {
			clearTimeout(this.tm);
			this.tm = null;
		}
	}
	callback() {
		var n = Date.now(); 

		this.fn();

		var e = Date.now();

		var t = this.time;
		var diff = e-this.time0;

		var tm = t-(diff%t);

		this.tm = setTimeout(this.cb, tm);

		if(e - n > t) {
			console.log("skiped frame");
		}
	}
}
A.TMP_MANY = false;
var _tmp0 = allocateBuf(4096);
var _tmp0Free = [_tmp0];
var _tmp0InUse = [];
function _tmp() {
	if(A.TMP_MANY) {
		var b; 
		if(_tmp0Free.length===0){ 
			b = allocateBuf(4096); 
			_tmp0Free.push(b);
			_tmp0InUse.push(b);
			console.log("allocatebuf " + _tmp0InUse.length);
		}
		else { 
			b = _tmp0Free[_tmp0Free.length-1];
		}
		b.sendNum = 0;
		//console.log("buf " + b.data.readOnly); 
		return b.clear();
	}
	else {
		return _tmp0.clear();
	}
}
class ChanWrapper {
	constructor(chan) {
		this.chan = chan;
	}
	send(data) {
		var buf = data.buf;
		if(buf.sendNum === 0) {
			if(_tmp0Free.pop() !== buf) {
				console.log("buffer error");			
			}
		}
		buf.sendNum++;
		this.chan.send(data, null, () => {
			buf.sendNum--;
			if(buf.sendNum <= 0) {
				_tmp0Free.push(buf);
			}
		});
	}
}

if (typeof module !== 'undefined') {
	module.exports.A = A;
	module.exports.vec2 = vec2;
	module.exports.Buf = Buf;

	module.exports.CharDataCached = CharDataCached;
	module.exports.Char = Char;
	module.exports.Ball = Ball;
	module.exports.Game = Game;
	module.exports.Player = Player;
	module.exports.XTimer = XTimer;
	module.exports.Movement = Movement;
	module.exports.ChanWrapper = ChanWrapper;
	module.exports.FIELDS = FIELDS;

	module.exports.TICK_MS = TICK_MS;
	module.exports.TICK_MS_INV = TICK_MS_INV;
	module.exports.RECT_L = RECT_L;
	module.exports.RECT_R = RECT_R;
	module.exports.RECT_T = RECT_T;
	module.exports.RECT_B = RECT_B;

	module.exports.intersectsCapsule = intersectsCapsule;
	module.exports.intersectsCapsule2 = intersectsCapsule2;	
	module.exports.calcForSpheres2 = calcForSpheres2;
	module.exports.solveQuadric = solveQuadric;
	module.exports.toInt = toInt;
	module.exports.clamp = clamp;
	module.exports.mix = mix;
	module.exports.unmix = unmix;
	module.exports.unmix2 = unmix2;
	module.exports.atan2PI = atan2PI;
	module.exports.angleDist2PI	= angleDist2PI;
	module.exports.compX = compX;
	module.exports.compY = compY;
	module.exports.compA = compA;
	module.exports.decompX = decompX;
	module.exports.decompY = decompY;
	module.exports.decompA = decompA;
	module.exports.passPow = passPow;
	module.exports.allocateBuf = allocateBuf;
	module.exports.wrap = wrap;
	module.exports.MSG_GET_ALL_CHAR = MSG_GET_ALL_CHAR;
	module.exports.MSG_CLIENT_TACKLE = MSG_CLIENT_TACKLE;
	module.exports.MSG_CLIENT_MOVEMENT = MSG_CLIENT_MOVEMENT;
	module.exports._tmp = _tmp;
	module.exports._tmp0Free = _tmp0Free;
	module.exports._tmp0InUse = _tmp0InUse;
}
else {
	B.DRILL_REF = A.DRILL;
}

