
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_STREAM_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_DIDDY_FRAMEWORK="1";
CFG_GLFW_COPY_LIBS="openal32";
CFG_GLFW_COPY_LIBS_32="openal32";
CFG_GLFW_GCC_LIB_OPTS="-lopenal32";
CFG_HOST="winnt";
CFG_HTML5_APP_FILENAME="CerberusGame.html";
CFG_HTML5_APP_ICON="";
CFG_HTML5_APP_TITLE="CerberusGame";
CFG_HTML5_CANVAS_ALPHA="0";
CFG_HTML5_CANVAS_ANTIALIAS="1";
CFG_HTML5_CANVAS_HEIGHT="480";
CFG_HTML5_CANVAS_RESIZE_MODE="1";
CFG_HTML5_CANVAS_WIDTH="640";
CFG_HTML5_CONSOLE_SHOW="1";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_REFLECTION_FILTER="diddy.exception";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n[Image1.png];type=image/png;width=1024;height=1024;\n[Image2.png];type=image/png;width=1024;height=1024;\n[Image3.png];type=image/png;width=1024;height=1024;\n[Image4.png];type=image/png;width=1024;height=1024;\n[Image5.png];type=image/png;width=1024;height=1024;\n[Image6.png];type=image/png;width=1024;height=1024;\n[font1.png];type=image/png;width=864;height=12;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Cerberus runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Cerberus Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

//function debugLog( str ){
//	if( window.console!=undefined ) window.console.log( str );
//}

function debugLog( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Cerberus Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "cerberusstate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "cerberusstate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.CountJoysticks=function( update ){
	return 0;
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.GetDeviceWindowWidth=function(){
	return this.GetDeviceWidth();
}

BBGame.prototype.GetDeviceWindowHeight=function(){
	return this.GetDeviceHeight();
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Cerberus Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ antialias: ( CFG_HTML5_CANVAS_ANTIALIAS=="1" ), alpha:( CFG_HTML5_CANVAS_ALPHA=="1" ) };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
	}
	
	// --- start gamepad api by skn3 ---------
	this._gamepads = null;
	this._gamepadLookup = [-1,-1,-1,-1];//support 4 gamepads
	this._gamepadCount = -1;//Grant Edit HTML5 gamepad count
	var that = this;
	window.addEventListener("gamepadconnected", function(e) {
		that.connectGamepad(e.gamepad);
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
		that.disconnectGamepad(e.gamepad);
	});
	
	//need to process already connected gamepads (before page was loaded)
	var gamepads = this.getGamepads();
	if (gamepads && gamepads.length > 0) {
		for(var index=0;index < gamepads.length;index++) {
			this.connectGamepad(gamepads[index]);
		}
	}
	// --- end gamepad api by skn3 ---------
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

// --- start gamepad api by skn3 ---------

//Grant Edit HTML5 gamepad count ---- start
BBHtml5Game.prototype.CountJoysticks = function( update ) {
	if (update || this._gamepadCount == -1) {
		for (var i = this._gamepadLookup.length-1; i >= 0; i --) {
			if (this._gamepadLookup[i] != -1) {
				this._gamepadCount = i+1;
				return this._gamepadCount;
			}
		}
		return 0;
	}
	return this._gamepadCount;
}
//Grant Edit HTML5 gamepad count ---- end

BBHtml5Game.prototype.getGamepads = function() {
	return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
}

BBHtml5Game.prototype.connectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//check if this is a standard gamepad
//	if (gamepad.mapping == "standard") {
		//yup so lets add it to an array of valid gamepads
		//find empty controller slot
		var slot = -1;
		for(var index = 0;index < this._gamepadLookup.length;index++) {
			if (this._gamepadLookup[index] == -1) {
				slot = index;
				break;
			}
		}
		
		//can we add this?
		if (slot != -1) {
			this._gamepadLookup[slot] = gamepad.index;
			
			//console.log("gamepad at html5 index "+gamepad.index+" mapped to Cerberus gamepad unit "+slot);
		}
//	} else {
//		console.log('Cerberus has ignored gamepad at raw port #'+gamepad.index+' with unrecognised mapping scheme \''+gamepad.mapping+'\'.');
//	}
}

BBHtml5Game.prototype.disconnectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}

	var m_disconnectedIndex = -1;//Grant Edit HTML5 gamepad count

	//scan all gamepads for matching index
	for(var index = 0;index < this._gamepadLookup.length;index++) {
		if (this._gamepadLookup[index] == gamepad.index) {
			//remove this gamepad
			m_disconnectedIndex = index;//Grant Edit HTML5 gamepad count
			this._gamepadLookup[index] = -1
			break;
		}
	}
	//Grant Edit HTML5 gamepad count ---- start
	if (m_disconnectedIndex >= 0 && m_disconnectedIndex < this._gamepadLookup.length-1) {
		for (var i = m_disconnectedIndex+1; i < this._gamepadLookup.length; i ++) {
			this._gamepadLookup[i-1] = this._gamepadLookup[i];
		}
		this._gamepadLookup[this._gamepadLookup.length-1] = -1;
	}
	//Grant Edit HTML5 gamepad count ---- end
}

BBHtml5Game.prototype.PollJoystick=function(port, joyx, joyy, joyz, buttons){
	//is this the first gamepad being polled
	if (port == 0) {
		//yes it is so we use the web api to get all gamepad info
		//we can then use this in subsequent calls to PollJoystick
		this._gamepads = this.getGamepads();
	}
	
	//dont bother processing if nothing to process
	if (!this._gamepads) {
	  return false;
	}
	
	//so use the Cerberus port to find the correct raw data
	var index = this._gamepadLookup[port];
	if (index == -1) {
		return false;
	}

	var gamepad = this._gamepads[index];
	if (!gamepad) {
		return false;
	}
	//so now process gamepad axis/buttons according to the standard mappings
	//https://w3c.github.io/gamepad/#remapping
	
	//left stick axis
	joyx[0] = gamepad.axes[0];
	joyy[0] = -gamepad.axes[1];
	
	//right stick axis
	joyx[1] = gamepad.axes[2];
	joyy[1] = -gamepad.axes[3];
	
	//left trigger
	joyz[0] = gamepad.buttons[6] ? gamepad.buttons[6].value : 0.0;
	
	//right trigger
	joyz[1] = gamepad.buttons[7] ? gamepad.buttons[7].value : 0.0;
	
	//clear button states
	for(var index = 0;index <32;index++) {
		buttons[index] = false;
	}
	
	//map html5 "standard" mapping to Cerberuss joy codes
	/*
	Const JOY_A=0
	Const JOY_B=1
	Const JOY_X=2
	Const JOY_Y=3
	Const JOY_LB=4
	Const JOY_RB=5
	Const JOY_BACK=6
	Const JOY_START=7
	Const JOY_LEFT=8
	Const JOY_UP=9
	Const JOY_RIGHT=10
	Const JOY_DOWN=11
	Const JOY_LSB=12
	Const JOY_RSB=13
	Const JOY_MENU=14
	*/
	buttons[0] = gamepad.buttons[0] && gamepad.buttons[0].pressed;
	buttons[1] = gamepad.buttons[1] && gamepad.buttons[1].pressed;
	buttons[2] = gamepad.buttons[2] && gamepad.buttons[2].pressed;
	buttons[3] = gamepad.buttons[3] && gamepad.buttons[3].pressed;
	buttons[4] = gamepad.buttons[4] && gamepad.buttons[4].pressed;
	buttons[5] = gamepad.buttons[5] && gamepad.buttons[5].pressed;
	buttons[6] = gamepad.buttons[8] && gamepad.buttons[8].pressed;
	buttons[7] = gamepad.buttons[9] && gamepad.buttons[9].pressed;
	buttons[8] = gamepad.buttons[14] && gamepad.buttons[14].pressed;
	buttons[9] = gamepad.buttons[12] && gamepad.buttons[12].pressed;
	buttons[10] = gamepad.buttons[15] && gamepad.buttons[15].pressed;
	buttons[11] = gamepad.buttons[13] && gamepad.buttons[13].pressed;
	buttons[12] = gamepad.buttons[10] && gamepad.buttons[10].pressed;
	buttons[13] = gamepad.buttons[11] && gamepad.buttons[11].pressed;
	buttons[14] = gamepad.buttons[16] && gamepad.buttons[16].pressed;
	
	//success
	return true
}
// --- end gamepad api by skn3 ---------


BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "cerberus://data/" )!=0 ) return "";
	path=path.slice(16);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "cerberus:" )!=0 ){
		return path;
	}else if( path.indexOf( "cerberus://data/" )==0 ) {
		return "data/"+path.slice( 16 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e),0 );
		eatEvent( e );
	}

	canvas.onwheel=function( e ){
		var amount = 0;
		if(e.deltaY < 0){
			amount = 1;
		}else if(e.deltaY > 0){
			amount = -1;
		}
		game.MouseEvent( BBGameEvent.MouseMove, -1, mouseX(e), mouseY(e), amount);
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}else{
			game.ValidateUpdateTimer();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}

	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();
	
	game.RenderGame();
}


function BBCerberusGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBCerberusGame.prototype=extend_class( BBHtml5Game );

BBCerberusGame.Main=function( canvas ){

	var game=new BBCerberusGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		try {
			chan.waSource.stop( 0 );
			chan.state = 0			
		} catch (err) {			
		}
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		try {
			chan.waSource.stop( 0 );
		} catch (err) {			
		}
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	try {
		chan.waSource.stop( 0 );
	} catch (err) {			
	}
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}


function BBDataBuffer(){
	this.arrayBuffer=null;
	this.length=0;
}

BBDataBuffer.tbuf=new ArrayBuffer(4);
BBDataBuffer.tbytes=new Int8Array( BBDataBuffer.tbuf );
BBDataBuffer.tshorts=new Int16Array( BBDataBuffer.tbuf );
BBDataBuffer.tints=new Int32Array( BBDataBuffer.tbuf );
BBDataBuffer.tfloats=new Float32Array( BBDataBuffer.tbuf );

BBDataBuffer.prototype._Init=function( buffer ){
  
  this.length=buffer.byteLength;
  
  if (buffer.byteLength != Math.ceil(buffer.byteLength / 4) * 4)
  {
    var new_buffer = new ArrayBuffer(Math.ceil(buffer.byteLength / 4) * 4);
    var src = new Int8Array(buffer);
    var dst = new Int8Array(new_buffer);
    for (var i = 0; i < this.length; i++) {
      dst[i] = src[i];
    }
    buffer = new_buffer;    
  }

	this.arrayBuffer=buffer;
	this.bytes=new Int8Array( buffer );	
	this.shorts=new Int16Array( buffer,0,this.length/2 );	
	this.ints=new Int32Array( buffer,0,this.length/4 );	
	this.floats=new Float32Array( buffer,0,this.length/4 );
}

BBDataBuffer.prototype._New=function( length ){
	if( this.arrayBuffer ) return false;
	
	var buf=new ArrayBuffer( length );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._Load=function( path ){
	if( this.arrayBuffer ) return false;
	
	var buf=BBGame.Game().LoadData( path );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._LoadAsync=function( path,thread ){

	var buf=this;
	
	var xhr=new XMLHttpRequest();
	xhr.open( "GET",BBGame.Game().PathToUrl( path ),true );
	xhr.responseType="arraybuffer";
	
	xhr.onload=function(e){
		if( this.status==200 || this.status==0 ){
			buf._Init( xhr.response );
			thread.result=buf;
		}
		thread.running=false;
	}
	
	xhr.onerror=function(e){
		thread.running=false;
	}
	
	xhr.send();
}


BBDataBuffer.prototype.GetArrayBuffer=function(){
	return this.arrayBuffer;
}

BBDataBuffer.prototype.Length=function(){
	return this.length;
}

BBDataBuffer.prototype.Discard=function(){
	if( this.arrayBuffer ){
		this.arrayBuffer=null;
		this.length=0;
	}
}

BBDataBuffer.prototype.PokeByte=function( addr,value ){
	this.bytes[addr]=value;
}

BBDataBuffer.prototype.PokeShort=function( addr,value ){
	if( addr&1 ){
		BBDataBuffer.tshorts[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		return;
	}
	this.shorts[addr>>1]=value;
}

BBDataBuffer.prototype.PokeInt=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tints[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.ints[addr>>2]=value;
}

BBDataBuffer.prototype.PokeFloat=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tfloats[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.floats[addr>>2]=value;
}

BBDataBuffer.prototype.PeekByte=function( addr ){
	return this.bytes[addr];
}

BBDataBuffer.prototype.PeekShort=function( addr ){
	if( addr&1 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		return BBDataBuffer.tshorts[0];
	}
	return this.shorts[addr>>1];
}

BBDataBuffer.prototype.PeekInt=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tints[0];
	}
	return this.ints[addr>>2];
}

BBDataBuffer.prototype.PeekFloat=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tfloats[0];
	}
	return this.floats[addr>>2];
}


function BBStream(){
}

BBStream.prototype.Eof=function(){
	return 0;
}

BBStream.prototype.Close=function(){
}

BBStream.prototype.Length=function(){
	return 0;
}

BBStream.prototype.Position=function(){
	return 0;
}

BBStream.prototype.Seek=function( position ){
	return 0;
}

BBStream.prototype.Read=function( buffer,offset,count ){
	return 0;
}

BBStream.prototype.Write=function( buffer,offset,count ){
	return 0;
}

/*
Copyright (c) 2011 Steve Revill and Shane Woolcock
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var diddy = new Object();

var diddy_mouseWheelDelta = 0.0;

diddy.mouseZ = function() {
	var t = diddy_mouseWheelDelta;
	diddy_mouseWheelDelta = 0.0;
	return t;
}

diddy.mouseZInit = function() {
	var canvas=document.getElementById( "GameCanvas" );
	
	canvas.onmousewheel = function(e) {
		diddy_mouseWheelDelta += e.wheelDelta/120.0;
	}
}

diddy.systemMillisecs=function(){
	return new Date().getTime();
};

diddy.setGraphics=function(w, h)
{
	var canvas=document.getElementById( "GameCanvas" );
	canvas.width  = w;
	canvas.height = h;
	//return window.innerHeight;
}
diddy.setMouse=function(x, y)
{
}
diddy.showKeyboard=function()
{
}
diddy.launchBrowser=function(address, windowName)
{
	window.open(address, windowName);
}
diddy.launchEmail=function(email, subject, text)
{
	location.href="mailto:"+email+"&subject="+subject+"&body="+text+"";
}

diddy.startVibrate=function(millisecs)
{
}
diddy.stopVibrate=function()
{
}

diddy.startGps=function(){
}

diddy.getLatitude=function(){
	return ""
}
diddy.getLongitude=function(){
	return ""
}
diddy.showAlertDialog=function(title, message)
{
	alert(title + "\n\n" + message);
}
diddy.getInputString=function()
{
	return "";
}
// Browser detect from http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

diddy.getBrowserName=function(){
	return BrowserDetect.browser;
};

diddy.getBrowserVersion=function(){
	return BrowserDetect.version;
};

diddy.getBrowserOS=function(){
	return BrowserDetect.OS;
};

diddy.seekMusic=function(timeMillis)
{
	if(bb_audio_device &&
		bb_audio_device.channels &&
		bb_audio_device.channels[32] &&
		bb_audio_device.channels[32].audio)
	{
		var audio = bb_audio_device.channels[32].audio;
		try {
			audio.currentTime = timeMillis/1000.0;
			return 1;
		} catch(e) {}
	}
	return 0;
};

function c_BoolObject(){
	Object.call(this);
	this.m_value=false;
}
c_BoolObject.m_new=function(t_value){
	this.m_value=t_value;
	return this;
}
c_BoolObject.prototype.p_ToBool=function(){
	return this.m_value;
}
c_BoolObject.prototype.p_Equals=function(t_box){
	return this.m_value==t_box.m_value;
}
c_BoolObject.m_new2=function(){
	return this;
}
function c_IntObject(){
	Object.call(this);
	this.m_value=0;
}
c_IntObject.m_new=function(t_value){
	this.m_value=t_value;
	return this;
}
c_IntObject.m_new2=function(t_value){
	this.m_value=((t_value)|0);
	return this;
}
c_IntObject.prototype.p_ToInt=function(){
	return this.m_value;
}
c_IntObject.prototype.p_ToFloat=function(){
	return (this.m_value);
}
c_IntObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_IntObject.prototype.p_Equals2=function(t_box){
	return this.m_value==t_box.m_value;
}
c_IntObject.prototype.p_Compare=function(t_box){
	return this.m_value-t_box.m_value;
}
c_IntObject.m_new3=function(){
	return this;
}
function c_FloatObject(){
	Object.call(this);
	this.m_value=.0;
}
c_FloatObject.m_new=function(t_value){
	this.m_value=(t_value);
	return this;
}
c_FloatObject.m_new2=function(t_value){
	this.m_value=t_value;
	return this;
}
c_FloatObject.prototype.p_ToInt=function(){
	return ((this.m_value)|0);
}
c_FloatObject.prototype.p_ToFloat=function(){
	return this.m_value;
}
c_FloatObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_FloatObject.prototype.p_Equals3=function(t_box){
	return this.m_value==t_box.m_value;
}
c_FloatObject.prototype.p_Compare2=function(t_box){
	if(this.m_value<t_box.m_value){
		return -1;
	}
	return ((this.m_value>t_box.m_value)?1:0);
}
c_FloatObject.m_new3=function(){
	return this;
}
function c_StringObject(){
	Object.call(this);
	this.m_value="";
}
c_StringObject.m_new=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new2=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new3=function(t_value){
	this.m_value=t_value;
	return this;
}
c_StringObject.prototype.p_ToString=function(){
	return this.m_value;
}
c_StringObject.prototype.p_Equals4=function(t_box){
	return this.m_value==t_box.m_value;
}
c_StringObject.prototype.p_Compare3=function(t_box){
	return string_compare(this.m_value,t_box.m_value);
}
c_StringObject.m_new4=function(){
	return this;
}
function bb_boxes_BoxBool(t_value){
	return (c_BoolObject.m_new.call(new c_BoolObject,t_value));
}
function bb_boxes_BoxInt(t_value){
	return (c_IntObject.m_new.call(new c_IntObject,t_value));
}
function bb_boxes_BoxFloat(t_value){
	return (c_FloatObject.m_new2.call(new c_FloatObject,t_value));
}
function bb_boxes_BoxString(t_value){
	return (c_StringObject.m_new3.call(new c_StringObject,t_value));
}
function bb_boxes_UnboxBool(t_box){
	return object_downcast((t_box),c_BoolObject).m_value;
}
function bb_boxes_UnboxInt(t_box){
	return object_downcast((t_box),c_IntObject).m_value;
}
function bb_boxes_UnboxFloat(t_box){
	return object_downcast((t_box),c_FloatObject).m_value;
}
function bb_boxes_UnboxString(t_box){
	return object_downcast((t_box),c_StringObject).m_value;
}
function bb_lang_DebugLog(t_message){
	var t_b=0;
	return 0;
}
function bb_lang_DebugStop(){
	return 0;
}
function c_DiddyException(){
	ThrowableObject.call(this);
	this.m_message="";
	this.m_cause=null;
	this.m_type="";
	this.m_fullType="";
}
c_DiddyException.prototype=extend_class(ThrowableObject);
c_DiddyException.prototype.p_Message=function(){
	return this.m_message;
}
c_DiddyException.prototype.p_Message2=function(t_message){
	this.m_message=t_message;
}
c_DiddyException.prototype.p_Cause=function(){
	return this.m_cause;
}
c_DiddyException.prototype.p_Cause2=function(t_cause){
	if(t_cause==(this)){
		t_cause=null;
	}
	this.m_cause=t_cause;
}
c_DiddyException.prototype.p_Type=function(){
	return this.m_type;
}
c_DiddyException.prototype.p_FullType=function(){
	return this.m_fullType;
}
c_DiddyException.prototype.p_ToString2=function(t_recurse){
	var t_rv=this.m_type+": "+this.m_message;
	if(t_recurse){
		var t_depth=10;
		var t_current=this.m_cause;
		while(((t_current)!=null) && t_depth>0){
			if((object_downcast((t_current),c_DiddyException))!=null){
				t_rv=t_rv+("\nCaused by "+this.m_type+": "+object_downcast((t_current),c_DiddyException).m_message);
				t_current=object_downcast((t_current),c_DiddyException).m_cause;
				t_depth-=1;
			}else{
				t_rv=t_rv+"\nCaused by a non-Diddy exception.";
				t_current=null;
			}
		}
	}
	return t_rv;
}
c_DiddyException.m_new=function(t_message,t_cause){
	this.m_message=t_message;
	this.m_cause=t_cause;
	var t_ci=bb_reflection_GetClass2(this);
	if((t_ci)!=null){
		this.m_fullType=t_ci.p_Name();
	}else{
		this.m_fullType="diddy.exception.DiddyException";
	}
	if(this.m_fullType.indexOf(".")!=-1){
		this.m_type=this.m_fullType.slice(this.m_fullType.lastIndexOf(".")+1);
	}else{
		this.m_type=this.m_fullType;
	}
	return this;
}
function c_ClassInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__sclass=null;
	this.m__ifaces=[];
	this.m__rconsts=[];
	this.m__consts=[];
	this.m__rfields=[];
	this.m__fields=[];
	this.m__rglobals=[];
	this.m__globals=[];
	this.m__rmethods=[];
	this.m__methods=[];
	this.m__rfunctions=[];
	this.m__functions=[];
	this.m__ctors=[];
}
c_ClassInfo.prototype.p_Name=function(){
	return this.m__name;
}
c_ClassInfo.m_new=function(t_name,t_attrs,t_sclass,t_ifaces){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__sclass=t_sclass;
	this.m__ifaces=t_ifaces;
	return this;
}
c_ClassInfo.m_new2=function(){
	return this;
}
c_ClassInfo.prototype.p_Init=function(){
	return 0;
}
c_ClassInfo.prototype.p_InitR=function(){
	if((this.m__sclass)!=null){
		var t_consts=c_Stack.m_new2.call(new c_Stack,this.m__sclass.m__rconsts);
		var t_=this.m__consts;
		var t_2=0;
		while(t_2<t_.length){
			var t_t=t_[t_2];
			t_2=t_2+1;
			t_consts.p_Push(t_t);
		}
		this.m__rconsts=t_consts.p_ToArray();
		var t_fields=c_Stack2.m_new2.call(new c_Stack2,this.m__sclass.m__rfields);
		var t_3=this.m__fields;
		var t_4=0;
		while(t_4<t_3.length){
			var t_t2=t_3[t_4];
			t_4=t_4+1;
			t_fields.p_Push4(t_t2);
		}
		this.m__rfields=t_fields.p_ToArray();
		var t_globals=c_Stack3.m_new2.call(new c_Stack3,this.m__sclass.m__rglobals);
		var t_5=this.m__globals;
		var t_6=0;
		while(t_6<t_5.length){
			var t_t3=t_5[t_6];
			t_6=t_6+1;
			t_globals.p_Push7(t_t3);
		}
		this.m__rglobals=t_globals.p_ToArray();
		var t_methods=c_Stack4.m_new2.call(new c_Stack4,this.m__sclass.m__rmethods);
		var t_7=this.m__methods;
		var t_8=0;
		while(t_8<t_7.length){
			var t_t4=t_7[t_8];
			t_8=t_8+1;
			t_methods.p_Push10(t_t4);
		}
		this.m__rmethods=t_methods.p_ToArray();
		var t_functions=c_Stack5.m_new2.call(new c_Stack5,this.m__sclass.m__rfunctions);
		var t_9=this.m__functions;
		var t_10=0;
		while(t_10<t_9.length){
			var t_t5=t_9[t_10];
			t_10=t_10+1;
			t_functions.p_Push13(t_t5);
		}
		this.m__rfunctions=t_functions.p_ToArray();
	}else{
		this.m__rconsts=this.m__consts;
		this.m__rfields=this.m__fields;
		this.m__rglobals=this.m__globals;
		this.m__rmethods=this.m__methods;
		this.m__rfunctions=this.m__functions;
	}
	return 0;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare4=function(t_lhs,t_rhs){
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare4(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare4(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap(){
	c_Map.call(this);
}
c_StringMap.prototype=extend_class(c_Map);
c_StringMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare4=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
var bb_reflection__classesMap=null;
var bb_reflection__classes=[];
function c_Node(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
function bb_reflection_GetClass(t_name){
	if(!((bb_reflection__classesMap)!=null)){
		bb_reflection__classesMap=c_StringMap.m_new.call(new c_StringMap);
		var t_=bb_reflection__classes;
		var t_2=0;
		while(t_2<t_.length){
			var t_c=t_[t_2];
			t_2=t_2+1;
			var t_name2=t_c.p_Name();
			bb_reflection__classesMap.p_Set(t_name2,t_c);
			var t_i=t_name2.lastIndexOf(".");
			if(t_i==-1){
				continue;
			}
			t_name2=t_name2.slice(t_i+1);
			if(bb_reflection__classesMap.p_Contains(t_name2)){
				bb_reflection__classesMap.p_Set(t_name2,null);
			}else{
				bb_reflection__classesMap.p_Set(t_name2,t_c);
			}
		}
	}
	return bb_reflection__classesMap.p_Get(t_name);
}
function c__GetClass(){
	Object.call(this);
}
c__GetClass.prototype.p_GetClass=function(t_obj){
}
c__GetClass.m_new=function(){
	return this;
}
var bb_reflection__getClass=null;
function bb_reflection_GetClass2(t_obj){
	return bb_reflection__getClass.p_GetClass(t_obj);
}
function c_AssertException(){
	c_DiddyException.call(this);
}
c_AssertException.prototype=extend_class(c_DiddyException);
c_AssertException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_ConcurrentModificationException(){
	c_DiddyException.call(this);
}
c_ConcurrentModificationException.prototype=extend_class(c_DiddyException);
c_ConcurrentModificationException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_IndexOutOfBoundsException(){
	c_DiddyException.call(this);
}
c_IndexOutOfBoundsException.prototype=extend_class(c_DiddyException);
c_IndexOutOfBoundsException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_IllegalArgumentException(){
	c_DiddyException.call(this);
}
c_IllegalArgumentException.prototype=extend_class(c_DiddyException);
c_IllegalArgumentException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_XMLParseException(){
	c_DiddyException.call(this);
}
c_XMLParseException.prototype=extend_class(c_DiddyException);
c_XMLParseException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_UnsupportedOperationException(){
	c_DiddyException.call(this);
}
c_UnsupportedOperationException.prototype=extend_class(c_DiddyException);
c_UnsupportedOperationException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_FormatException(){
	c_DiddyException.call(this);
}
c_FormatException.prototype=extend_class(c_DiddyException);
c_FormatException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_R16(){
	c_ClassInfo.call(this);
}
c_R16.prototype=extend_class(c_ClassInfo);
c_R16.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.lang.Object",1,null,[]);
	return this;
}
c_R16.prototype.p_Init=function(){
	this.p_InitR();
	return 0;
}
function c_R17(){
	c_ClassInfo.call(this);
}
c_R17.prototype=extend_class(c_ClassInfo);
c_R17.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.boxes.BoolObject",0,bb_reflection__classes[0],[]);
	bb_reflection__boolClass=(this);
	return this;
}
c_R17.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R18.m_new.call(new c_R18));
	this.m__methods=new_object_array(2);
	this.m__methods[0]=(c_R20.m_new.call(new c_R20));
	this.m__methods[1]=(c_R21.m_new.call(new c_R21));
	this.m__ctors=new_object_array(2);
	this.m__ctors[0]=(c_R19.m_new.call(new c_R19));
	this.m__ctors[1]=(c_R22.m_new.call(new c_R22));
	this.p_InitR();
	return 0;
}
var bb_reflection__boolClass=null;
function c_R23(){
	c_ClassInfo.call(this);
}
c_R23.prototype=extend_class(c_ClassInfo);
c_R23.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.boxes.IntObject",0,bb_reflection__classes[0],[]);
	bb_reflection__intClass=(this);
	return this;
}
c_R23.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R24.m_new.call(new c_R24));
	this.m__methods=new_object_array(5);
	this.m__methods[0]=(c_R27.m_new.call(new c_R27));
	this.m__methods[1]=(c_R28.m_new.call(new c_R28));
	this.m__methods[2]=(c_R29.m_new.call(new c_R29));
	this.m__methods[3]=(c_R30.m_new.call(new c_R30));
	this.m__methods[4]=(c_R31.m_new.call(new c_R31));
	this.m__ctors=new_object_array(3);
	this.m__ctors[0]=(c_R25.m_new.call(new c_R25));
	this.m__ctors[1]=(c_R26.m_new.call(new c_R26));
	this.m__ctors[2]=(c_R32.m_new.call(new c_R32));
	this.p_InitR();
	return 0;
}
var bb_reflection__intClass=null;
function c_R33(){
	c_ClassInfo.call(this);
}
c_R33.prototype=extend_class(c_ClassInfo);
c_R33.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.boxes.FloatObject",0,bb_reflection__classes[0],[]);
	bb_reflection__floatClass=(this);
	return this;
}
c_R33.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R34.m_new.call(new c_R34));
	this.m__methods=new_object_array(5);
	this.m__methods[0]=(c_R37.m_new.call(new c_R37));
	this.m__methods[1]=(c_R38.m_new.call(new c_R38));
	this.m__methods[2]=(c_R39.m_new.call(new c_R39));
	this.m__methods[3]=(c_R40.m_new.call(new c_R40));
	this.m__methods[4]=(c_R41.m_new.call(new c_R41));
	this.m__ctors=new_object_array(3);
	this.m__ctors[0]=(c_R35.m_new.call(new c_R35));
	this.m__ctors[1]=(c_R36.m_new.call(new c_R36));
	this.m__ctors[2]=(c_R42.m_new.call(new c_R42));
	this.p_InitR();
	return 0;
}
var bb_reflection__floatClass=null;
function c_R43(){
	c_ClassInfo.call(this);
}
c_R43.prototype=extend_class(c_ClassInfo);
c_R43.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.boxes.StringObject",0,bb_reflection__classes[0],[]);
	bb_reflection__stringClass=(this);
	return this;
}
c_R43.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R44.m_new.call(new c_R44));
	this.m__methods=new_object_array(3);
	this.m__methods[0]=(c_R48.m_new.call(new c_R48));
	this.m__methods[1]=(c_R49.m_new.call(new c_R49));
	this.m__methods[2]=(c_R50.m_new.call(new c_R50));
	this.m__ctors=new_object_array(4);
	this.m__ctors[0]=(c_R45.m_new.call(new c_R45));
	this.m__ctors[1]=(c_R46.m_new.call(new c_R46));
	this.m__ctors[2]=(c_R47.m_new.call(new c_R47));
	this.m__ctors[3]=(c_R51.m_new.call(new c_R51));
	this.p_InitR();
	return 0;
}
var bb_reflection__stringClass=null;
function c_R52(){
	c_ClassInfo.call(this);
}
c_R52.prototype=extend_class(c_ClassInfo);
c_R52.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.lang.Throwable",33,bb_reflection__classes[0],[]);
	return this;
}
c_R52.prototype.p_Init=function(){
	this.p_InitR();
	return 0;
}
function c_R53(){
	c_ClassInfo.call(this);
}
c_R53.prototype=extend_class(c_ClassInfo);
c_R53.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.DiddyException",32,bb_reflection__classes[5],[]);
	return this;
}
c_R53.prototype.p_Init=function(){
	this.m__fields=new_object_array(4);
	this.m__fields[0]=(c_R54.m_new.call(new c_R54));
	this.m__fields[1]=(c_R55.m_new.call(new c_R55));
	this.m__fields[2]=(c_R56.m_new.call(new c_R56));
	this.m__fields[3]=(c_R57.m_new.call(new c_R57));
	this.m__methods=new_object_array(7);
	this.m__methods[0]=(c_R58.m_new.call(new c_R58));
	this.m__methods[1]=(c_R59.m_new.call(new c_R59));
	this.m__methods[2]=(c_R60.m_new.call(new c_R60));
	this.m__methods[3]=(c_R61.m_new.call(new c_R61));
	this.m__methods[4]=(c_R62.m_new.call(new c_R62));
	this.m__methods[5]=(c_R63.m_new.call(new c_R63));
	this.m__methods[6]=(c_R65.m_new.call(new c_R65));
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R64.m_new.call(new c_R64));
	this.p_InitR();
	return 0;
}
function c_R66(){
	c_ClassInfo.call(this);
}
c_R66.prototype=extend_class(c_ClassInfo);
c_R66.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.AssertException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R66.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R67.m_new.call(new c_R67));
	this.p_InitR();
	return 0;
}
function c_R68(){
	c_ClassInfo.call(this);
}
c_R68.prototype=extend_class(c_ClassInfo);
c_R68.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.ConcurrentModificationException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R68.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R69.m_new.call(new c_R69));
	this.p_InitR();
	return 0;
}
function c_R70(){
	c_ClassInfo.call(this);
}
c_R70.prototype=extend_class(c_ClassInfo);
c_R70.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.IndexOutOfBoundsException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R70.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R71.m_new.call(new c_R71));
	this.p_InitR();
	return 0;
}
function c_R72(){
	c_ClassInfo.call(this);
}
c_R72.prototype=extend_class(c_ClassInfo);
c_R72.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.IllegalArgumentException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R72.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R73.m_new.call(new c_R73));
	this.p_InitR();
	return 0;
}
function c_R74(){
	c_ClassInfo.call(this);
}
c_R74.prototype=extend_class(c_ClassInfo);
c_R74.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.XMLParseException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R74.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R75.m_new.call(new c_R75));
	this.p_InitR();
	return 0;
}
function c_R76(){
	c_ClassInfo.call(this);
}
c_R76.prototype=extend_class(c_ClassInfo);
c_R76.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.UnsupportedOperationException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R76.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R77.m_new.call(new c_R77));
	this.p_InitR();
	return 0;
}
function c_R78(){
	c_ClassInfo.call(this);
}
c_R78.prototype=extend_class(c_ClassInfo);
c_R78.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.FormatException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R78.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R79.m_new.call(new c_R79));
	this.p_InitR();
	return 0;
}
function c_FunctionInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__retType=null;
	this.m__argTypes=[];
}
c_FunctionInfo.m_new=function(t_name,t_attrs,t_retType,t_argTypes){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__retType=t_retType;
	this.m__argTypes=t_argTypes;
	return this;
}
c_FunctionInfo.m_new2=function(){
	return this;
}
var bb_reflection__functions=[];
function c_R4(){
	c_FunctionInfo.call(this);
}
c_R4.prototype=extend_class(c_FunctionInfo);
c_R4.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.BoxBool",0,bb_reflection__classes[0],[bb_reflection__boolClass]);
	return this;
}
function c_R5(){
	c_FunctionInfo.call(this);
}
c_R5.prototype=extend_class(c_FunctionInfo);
c_R5.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.BoxInt",0,bb_reflection__classes[0],[bb_reflection__intClass]);
	return this;
}
function c_R6(){
	c_FunctionInfo.call(this);
}
c_R6.prototype=extend_class(c_FunctionInfo);
c_R6.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.BoxFloat",0,bb_reflection__classes[0],[bb_reflection__floatClass]);
	return this;
}
function c_R7(){
	c_FunctionInfo.call(this);
}
c_R7.prototype=extend_class(c_FunctionInfo);
c_R7.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.BoxString",0,bb_reflection__classes[0],[bb_reflection__stringClass]);
	return this;
}
function c_R8(){
	c_FunctionInfo.call(this);
}
c_R8.prototype=extend_class(c_FunctionInfo);
c_R8.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.UnboxBool",0,bb_reflection__boolClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R9(){
	c_FunctionInfo.call(this);
}
c_R9.prototype=extend_class(c_FunctionInfo);
c_R9.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.UnboxInt",0,bb_reflection__intClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R10(){
	c_FunctionInfo.call(this);
}
c_R10.prototype=extend_class(c_FunctionInfo);
c_R10.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.UnboxFloat",0,bb_reflection__floatClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R11(){
	c_FunctionInfo.call(this);
}
c_R11.prototype=extend_class(c_FunctionInfo);
c_R11.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.UnboxString",0,bb_reflection__stringClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R12(){
	c_FunctionInfo.call(this);
}
c_R12.prototype=extend_class(c_FunctionInfo);
c_R12.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.lang.DebugLog",0,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c_R13(){
	c_FunctionInfo.call(this);
}
c_R13.prototype=extend_class(c_FunctionInfo);
c_R13.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.lang.DebugStop",0,bb_reflection__intClass,[]);
	return this;
}
function c_R14(){
	c_FunctionInfo.call(this);
}
c_R14.prototype=extend_class(c_FunctionInfo);
c_R14.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.lang.Print",1,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c_R15(){
	c_FunctionInfo.call(this);
}
c_R15.prototype=extend_class(c_FunctionInfo);
c_R15.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.lang.Error",1,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c___GetClass(){
	c__GetClass.call(this);
}
c___GetClass.prototype=extend_class(c__GetClass);
c___GetClass.m_new=function(){
	c__GetClass.m_new.call(this);
	return this;
}
c___GetClass.prototype.p_GetClass=function(t_o){
	if(object_downcast((t_o),c_FormatException)!=null){
		return bb_reflection__classes[13];
	}
	if(object_downcast((t_o),c_UnsupportedOperationException)!=null){
		return bb_reflection__classes[12];
	}
	if(object_downcast((t_o),c_XMLParseException)!=null){
		return bb_reflection__classes[11];
	}
	if(object_downcast((t_o),c_IllegalArgumentException)!=null){
		return bb_reflection__classes[10];
	}
	if(object_downcast((t_o),c_IndexOutOfBoundsException)!=null){
		return bb_reflection__classes[9];
	}
	if(object_downcast((t_o),c_ConcurrentModificationException)!=null){
		return bb_reflection__classes[8];
	}
	if(object_downcast((t_o),c_AssertException)!=null){
		return bb_reflection__classes[7];
	}
	if(object_downcast((t_o),c_DiddyException)!=null){
		return bb_reflection__classes[6];
	}
	if(object_downcast((t_o),ThrowableObject)!=null){
		return bb_reflection__classes[5];
	}
	if(object_downcast((t_o),c_StringObject)!=null){
		return bb_reflection__classes[4];
	}
	if(object_downcast((t_o),c_FloatObject)!=null){
		return bb_reflection__classes[3];
	}
	if(object_downcast((t_o),c_IntObject)!=null){
		return bb_reflection__classes[2];
	}
	if(object_downcast((t_o),c_BoolObject)!=null){
		return bb_reflection__classes[1];
	}
	if(t_o!=null){
		return bb_reflection__classes[0];
	}
	return bb_reflection__unknownClass;
}
function bb_reflection___init(){
	bb_reflection__classes=new_object_array(14);
	bb_reflection__classes[0]=(c_R16.m_new.call(new c_R16));
	bb_reflection__classes[1]=(c_R17.m_new.call(new c_R17));
	bb_reflection__classes[2]=(c_R23.m_new.call(new c_R23));
	bb_reflection__classes[3]=(c_R33.m_new.call(new c_R33));
	bb_reflection__classes[4]=(c_R43.m_new.call(new c_R43));
	bb_reflection__classes[5]=(c_R52.m_new.call(new c_R52));
	bb_reflection__classes[6]=(c_R53.m_new.call(new c_R53));
	bb_reflection__classes[7]=(c_R66.m_new.call(new c_R66));
	bb_reflection__classes[8]=(c_R68.m_new.call(new c_R68));
	bb_reflection__classes[9]=(c_R70.m_new.call(new c_R70));
	bb_reflection__classes[10]=(c_R72.m_new.call(new c_R72));
	bb_reflection__classes[11]=(c_R74.m_new.call(new c_R74));
	bb_reflection__classes[12]=(c_R76.m_new.call(new c_R76));
	bb_reflection__classes[13]=(c_R78.m_new.call(new c_R78));
	bb_reflection__classes[0].p_Init();
	bb_reflection__classes[1].p_Init();
	bb_reflection__classes[2].p_Init();
	bb_reflection__classes[3].p_Init();
	bb_reflection__classes[4].p_Init();
	bb_reflection__classes[5].p_Init();
	bb_reflection__classes[6].p_Init();
	bb_reflection__classes[7].p_Init();
	bb_reflection__classes[8].p_Init();
	bb_reflection__classes[9].p_Init();
	bb_reflection__classes[10].p_Init();
	bb_reflection__classes[11].p_Init();
	bb_reflection__classes[12].p_Init();
	bb_reflection__classes[13].p_Init();
	bb_reflection__functions=new_object_array(12);
	bb_reflection__functions[0]=(c_R4.m_new.call(new c_R4));
	bb_reflection__functions[1]=(c_R5.m_new.call(new c_R5));
	bb_reflection__functions[2]=(c_R6.m_new.call(new c_R6));
	bb_reflection__functions[3]=(c_R7.m_new.call(new c_R7));
	bb_reflection__functions[4]=(c_R8.m_new.call(new c_R8));
	bb_reflection__functions[5]=(c_R9.m_new.call(new c_R9));
	bb_reflection__functions[6]=(c_R10.m_new.call(new c_R10));
	bb_reflection__functions[7]=(c_R11.m_new.call(new c_R11));
	bb_reflection__functions[8]=(c_R12.m_new.call(new c_R12));
	bb_reflection__functions[9]=(c_R13.m_new.call(new c_R13));
	bb_reflection__functions[10]=(c_R14.m_new.call(new c_R14));
	bb_reflection__functions[11]=(c_R15.m_new.call(new c_R15));
	bb_reflection__getClass=(c___GetClass.m_new.call(new c___GetClass));
	return 0;
}
var bb_reflection__init=0;
function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
	return this;
}
c_App.prototype.p_OnResize=function(){
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
c_App.prototype.p_OnClose=function(){
	bb_app_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
	return 0;
}
c_App.prototype.p_OnFileDrop=function(t_filename){
	return 0;
}
function c_Gold_Aztec(){
	c_App.call(this);
}
c_Gold_Aztec.prototype=extend_class(c_App);
c_Gold_Aztec.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_Gold_Aztec.prototype.p_OnBack=function(){
	return 0;
}
c_Gold_Aztec.m_RX_Ekr=0;
c_Gold_Aztec.m_RY_Ekr=0;
c_Gold_Aztec.m_Baza_Level_Blok=[];
c_Gold_Aztec.m_Baza_Level_Kris=[];
c_Gold_Aztec.m_Hod5Star=[];
c_Gold_Aztec.m_CreateBazaLevel=function(){
	c_Gold_Aztec.m_Baza_Level_Blok[1]="1112111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[1]="1111111111112111";
	c_Gold_Aztec.m_Hod5Star[1]=6;
	c_Gold_Aztec.m_Baza_Level_Blok[2]="2332222222222222";
	c_Gold_Aztec.m_Baza_Level_Kris[2]="2222222222223223";
	c_Gold_Aztec.m_Hod5Star[2]=8;
	c_Gold_Aztec.m_Baza_Level_Blok[3]="3366333633333333";
	c_Gold_Aztec.m_Baza_Level_Kris[3]="6333333333336336";
	c_Gold_Aztec.m_Hod5Star[3]=12;
	c_Gold_Aztec.m_Baza_Level_Blok[4]="5454454544444444";
	c_Gold_Aztec.m_Baza_Level_Kris[4]="4444444444445555";
	c_Gold_Aztec.m_Hod5Star[4]=12;
	c_Gold_Aztec.m_Baza_Level_Blok[5]="1551511555551555";
	c_Gold_Aztec.m_Baza_Level_Kris[5]="5555155555551111";
	c_Gold_Aztec.m_Hod5Star[5]=12;
	c_Gold_Aztec.m_Baza_Level_Blok[6]="3333366366666666";
	c_Gold_Aztec.m_Baza_Level_Kris[6]="6666666636633333";
	c_Gold_Aztec.m_Hod5Star[6]=16;
	c_Gold_Aztec.m_Baza_Level_Blok[7]="1151511551151551";
	c_Gold_Aztec.m_Baza_Level_Kris[7]="1115155115515115";
	c_Gold_Aztec.m_Hod5Star[7]=4;
	c_Gold_Aztec.m_Baza_Level_Blok[8]="3232232332322323";
	c_Gold_Aztec.m_Baza_Level_Kris[8]="3332232222322333";
	c_Gold_Aztec.m_Hod5Star[8]=9;
	c_Gold_Aztec.m_Baza_Level_Blok[9]="1333333333333336";
	c_Gold_Aztec.m_Baza_Level_Kris[9]="3633333333333313";
	c_Gold_Aztec.m_Hod5Star[9]=10;
	c_Gold_Aztec.m_Baza_Level_Blok[10]="1614444444444444";
	c_Gold_Aztec.m_Baza_Level_Kris[10]="4444444444414416";
	c_Gold_Aztec.m_Hod5Star[10]=13;
	c_Gold_Aztec.m_Baza_Level_Blok[11]="5315513555555555";
	c_Gold_Aztec.m_Baza_Level_Kris[11]="5555555535515315";
	c_Gold_Aztec.m_Hod5Star[11]=10;
	c_Gold_Aztec.m_Baza_Level_Blok[12]="6366643666436666";
	c_Gold_Aztec.m_Baza_Level_Kris[12]="6646666436663366";
	c_Gold_Aztec.m_Hod5Star[12]=18;
	c_Gold_Aztec.m_Baza_Level_Blok[13]="1311616113131161";
	c_Gold_Aztec.m_Baza_Level_Kris[13]="1166111631113311";
	c_Gold_Aztec.m_Hod5Star[13]=16;
	c_Gold_Aztec.m_Baza_Level_Blok[14]="4421421221221222";
	c_Gold_Aztec.m_Baza_Level_Kris[14]="1122112222242244";
	c_Gold_Aztec.m_Hod5Star[14]=21;
	c_Gold_Aztec.m_Baza_Level_Blok[15]="2334324334234332";
	c_Gold_Aztec.m_Baza_Level_Kris[15]="3333244224423333";
	c_Gold_Aztec.m_Hod5Star[15]=9;
	c_Gold_Aztec.m_Baza_Level_Blok[16]="1416416416146444";
	c_Gold_Aztec.m_Baza_Level_Kris[16]="6644664144414111";
	c_Gold_Aztec.m_Hod5Star[16]=21;
	c_Gold_Aztec.m_Baza_Level_Blok[17]="1315355315515313";
	c_Gold_Aztec.m_Baza_Level_Kris[17]="3335355135515111";
	c_Gold_Aztec.m_Hod5Star[17]=19;
	c_Gold_Aztec.m_Baza_Level_Blok[18]="2366166666666666";
	c_Gold_Aztec.m_Baza_Level_Kris[18]="6661666666662663";
	c_Gold_Aztec.m_Hod5Star[18]=13;
	c_Gold_Aztec.m_Baza_Level_Blok[19]="2113111111114114";
	c_Gold_Aztec.m_Baza_Level_Kris[19]="4114111111112113";
	c_Gold_Aztec.m_Hod5Star[19]=14;
	c_Gold_Aztec.m_Baza_Level_Blok[20]="1632622232222222";
	c_Gold_Aztec.m_Baza_Level_Kris[20]="2222222322232661";
	c_Gold_Aztec.m_Hod5Star[20]=20;
	c_Gold_Aztec.m_Baza_Level_Blok[21]="3233234334353353";
	c_Gold_Aztec.m_Baza_Level_Kris[21]="3352333453332433";
	c_Gold_Aztec.m_Hod5Star[21]=14;
	c_Gold_Aztec.m_Baza_Level_Blok[22]="4614613413444444";
	c_Gold_Aztec.m_Baza_Level_Kris[22]="4446444644413311";
	c_Gold_Aztec.m_Hod5Star[22]=19;
	c_Gold_Aztec.m_Baza_Level_Blok[23]="1155145555435533";
	c_Gold_Aztec.m_Baza_Level_Kris[23]="4515515315355354";
	c_Gold_Aztec.m_Hod5Star[23]=20;
	c_Gold_Aztec.m_Baza_Level_Blok[24]="1136135635566666";
	c_Gold_Aztec.m_Baza_Level_Kris[24]="6611666136653355";
	c_Gold_Aztec.m_Hod5Star[24]=23;
	c_Gold_Aztec.m_Baza_Level_Blok[25]="6144161431613316";
	c_Gold_Aztec.m_Baza_Level_Kris[25]="6346134113416116";
	c_Gold_Aztec.m_Hod5Star[25]=16;
	c_Gold_Aztec.m_Baza_Level_Blok[26]="2152132512351325";
	c_Gold_Aztec.m_Baza_Level_Kris[26]="5555333211112222";
	c_Gold_Aztec.m_Hod5Star[26]=27;
	c_Gold_Aztec.m_Baza_Level_Blok[27]="1442133213321442";
	c_Gold_Aztec.m_Baza_Level_Kris[27]="2222344334431111";
	c_Gold_Aztec.m_Hod5Star[27]=25;
	c_Gold_Aztec.m_Baza_Level_Blok[28]="1446435444444444";
	c_Gold_Aztec.m_Baza_Level_Kris[28]="4444444434454164";
	c_Gold_Aztec.m_Hod5Star[28]=17;
	c_Gold_Aztec.m_Baza_Level_Blok[29]="5153552553565555";
	c_Gold_Aztec.m_Baza_Level_Kris[29]="5555535525351655";
	c_Gold_Aztec.m_Hod5Star[29]=19;
	c_Gold_Aztec.m_Baza_Level_Blok[30]="1253625666666666";
	c_Gold_Aztec.m_Baza_Level_Kris[30]="6666666656651223";
	c_Gold_Aztec.m_Hod5Star[30]=22;
	c_Gold_Aztec.m_Baza_Level_Blok[31]="1111134134512511";
	c_Gold_Aztec.m_Baza_Level_Kris[31]="4412131111351115";
	c_Gold_Aztec.m_Hod5Star[31]=21;
	c_Gold_Aztec.m_Baza_Level_Blok[32]="1224214226326223";
	c_Gold_Aztec.m_Baza_Level_Kris[32]="2442122312232662";
	c_Gold_Aztec.m_Hod5Star[32]=21;
	c_Gold_Aztec.m_Baza_Level_Blok[33]="3311345125433233";
	c_Gold_Aztec.m_Baza_Level_Kris[33]="5323533213331144";
	c_Gold_Aztec.m_Hod5Star[33]=35;
	c_Gold_Aztec.m_Baza_Level_Blok[34]="4266244614431134";
	c_Gold_Aztec.m_Baza_Level_Kris[34]="4411422163346644";
	c_Gold_Aztec.m_Hod5Star[34]=30;
	c_Gold_Aztec.m_Baza_Level_Blok[35]="5311543125432255";
	c_Gold_Aztec.m_Baza_Level_Kris[35]="4555111522253334";
	c_Gold_Aztec.m_Hod5Star[35]=33;
	c_Gold_Aztec.m_Baza_Level_Blok[36]="1122166246634433";
	c_Gold_Aztec.m_Baza_Level_Kris[36]="6226123314136446";
	c_Gold_Aztec.m_Hod5Star[36]=14;
	c_Gold_Aztec.m_Baza_Level_Blok[37]="1421115311161111";
	c_Gold_Aztec.m_Baza_Level_Kris[37]="1111611151113241";
	c_Gold_Aztec.m_Hod5Star[37]=24;
	c_Gold_Aztec.m_Baza_Level_Blok[38]="1665234222222222";
	c_Gold_Aztec.m_Baza_Level_Kris[38]="5221222262264223";
	c_Gold_Aztec.m_Hod5Star[38]=18;
	c_Gold_Aztec.m_Baza_Level_Blok[39]="2433135335363363";
	c_Gold_Aztec.m_Baza_Level_Kris[39]="3663533353323341";
	c_Gold_Aztec.m_Hod5Star[39]=22;
	c_Gold_Aztec.m_Baza_Level_Blok[40]="1122533644444444";
	c_Gold_Aztec.m_Baza_Level_Kris[40]="3443144246541442";
	c_Gold_Aztec.m_Hod5Star[40]=16;
	c_Gold_Aztec.m_Baza_Level_Blok[41]="4521545235655356";
	c_Gold_Aztec.m_Baza_Level_Kris[41]="2244663355551555";
	c_Gold_Aztec.m_Hod5Star[41]=29;
	c_Gold_Aztec.m_Baza_Level_Blok[42]="2112366346646556";
	c_Gold_Aztec.m_Baza_Level_Kris[42]="5665666623321441";
	c_Gold_Aztec.m_Hod5Star[42]=23;
	c_Gold_Aztec.m_Baza_Level_Blok[43]="1264264163153151";
	c_Gold_Aztec.m_Baza_Level_Kris[43]="3415432112165166";
	c_Gold_Aztec.m_Hod5Star[43]=31;
	c_Gold_Aztec.m_Baza_Level_Blok[44]="2152154654632632";
	c_Gold_Aztec.m_Baza_Level_Kris[44]="5566533644112222";
	c_Gold_Aztec.m_Hod5Star[44]=36;
	c_Gold_Aztec.m_Baza_Level_Blok[45]="1111255246643333";
	c_Gold_Aztec.m_Baza_Level_Kris[45]="1551233423341661";
	c_Gold_Aztec.m_Hod5Star[45]=17;
	c_Gold_Aztec.m_Baza_Level_Blok[46]="1221455463362112";
	c_Gold_Aztec.m_Baza_Level_Kris[46]="1111635634452222";
	c_Gold_Aztec.m_Hod5Star[46]=23;
	c_Gold_Aztec.m_Baza_Level_Blok[47]="1442312632162551";
	c_Gold_Aztec.m_Baza_Level_Kris[47]="1552166213321442";
	c_Gold_Aztec.m_Hod5Star[47]=26;
	c_Gold_Aztec.m_Baza_Level_Blok[48]="1122612664364433";
	c_Gold_Aztec.m_Baza_Level_Kris[48]="4433466316621122";
	c_Gold_Aztec.m_Hod5Star[48]=18;
	c_Gold_Aztec.m_Baza_Level_Blok[49]="1221633664461551";
	c_Gold_Aztec.m_Baza_Level_Kris[49]="5335266211114664";
	c_Gold_Aztec.m_Hod5Star[49]=16;
	c_Gold_Aztec.m_Baza_Level_Blok[50]="1663122352245664";
	c_Gold_Aztec.m_Baza_Level_Kris[50]="2332644665562112";
	c_Gold_Aztec.m_Hod5Star[50]=14;
	c_Gold_Aztec.m_Baza_Level_Blok[51]="1334214532533663";
	c_Gold_Aztec.m_Baza_Level_Kris[51]="2255333336631144";
	c_Gold_Aztec.m_Hod5Star[51]=25;
	c_Gold_Aztec.m_Baza_Level_Blok[52]="4114122143344554";
	c_Gold_Aztec.m_Baza_Level_Kris[52]="1551422444441331";
	c_Gold_Aztec.m_Hod5Star[52]=21;
	c_Gold_Aztec.m_Baza_Level_Blok[53]="1155552233555544";
	c_Gold_Aztec.m_Baza_Level_Kris[53]="5542135555243155";
	c_Gold_Aztec.m_Hod5Star[53]=10;
	c_Gold_Aztec.m_Baza_Level_Blok[54]="4646636326266161";
	c_Gold_Aztec.m_Baza_Level_Kris[54]="3661366146624662";
	c_Gold_Aztec.m_Hod5Star[54]=20;
	c_Gold_Aztec.m_Baza_Level_Blok[55]="2342416335142432";
	c_Gold_Aztec.m_Baza_Level_Kris[55]="2436243124312435";
	c_Gold_Aztec.m_Hod5Star[55]=18;
	c_Gold_Aztec.m_Baza_Level_Blok[56]="3224211221126225";
	c_Gold_Aztec.m_Baza_Level_Kris[56]="2112322462252112";
	c_Gold_Aztec.m_Hod5Star[56]=8;
	c_Gold_Aztec.m_Baza_Level_Blok[57]="3413514215243253";
	c_Gold_Aztec.m_Baza_Level_Kris[57]="1144133453325522";
	c_Gold_Aztec.m_Hod5Star[57]=21;
	c_Gold_Aztec.m_Baza_Level_Blok[58]="1352412462162531";
	c_Gold_Aztec.m_Baza_Level_Kris[58]="1111465346532222";
	c_Gold_Aztec.m_Hod5Star[58]=22;
	c_Gold_Aztec.m_Baza_Level_Blok[59]="6632632431451455";
	c_Gold_Aztec.m_Baza_Level_Kris[59]="4155134563326624";
	c_Gold_Aztec.m_Hod5Star[59]=18;
	c_Gold_Aztec.m_Baza_Level_Blok[60]="6116266523353443";
	c_Gold_Aztec.m_Baza_Level_Kris[60]="6553614364136223";
	c_Gold_Aztec.m_Hod5Star[60]=19;
	c_Gold_Aztec.m_Baza_Level_Blok[61]="3456122112213456";
	c_Gold_Aztec.m_Baza_Level_Kris[61]="6226511541143223";
	c_Gold_Aztec.m_Hod5Star[61]=22;
	c_Gold_Aztec.m_Baza_Level_Blok[62]="1221655664463223";
	c_Gold_Aztec.m_Baza_Level_Kris[62]="6666133445512222";
	c_Gold_Aztec.m_Hod5Star[62]=16;
	c_Gold_Aztec.m_Baza_Level_Blok[63]="6116222233335445";
	c_Gold_Aztec.m_Baza_Level_Kris[63]="2222655614413333";
	c_Gold_Aztec.m_Hod5Star[63]=12;
	c_Gold_Aztec.m_Baza_Level_Blok[64]="1663413445245662";
	c_Gold_Aztec.m_Baza_Level_Kris[64]="4444153215326666";
	c_Gold_Aztec.m_Hod5Star[64]=16;
	c_Gold_Aztec.m_Baza_Level_Blok[65]="1234566512346666";
	c_Gold_Aztec.m_Baza_Level_Kris[65]="6666644635352112";
	c_Gold_Aztec.m_Hod5Star[65]=26;
	c_Gold_Aztec.m_Baza_Level_Blok[66]="3316221641224155";
	c_Gold_Aztec.m_Baza_Level_Kris[66]="2661233125512441";
	c_Gold_Aztec.m_Hod5Star[66]=13;
	c_Gold_Aztec.m_Baza_Level_Blok[67]="2113123142342443";
	c_Gold_Aztec.m_Baza_Level_Kris[67]="2143214321432143";
	c_Gold_Aztec.m_Hod5Star[67]=6;
	c_Gold_Aztec.m_Baza_Level_Blok[68]="2113156116514114";
	c_Gold_Aztec.m_Baza_Level_Kris[68]="1111523456641111";
	c_Gold_Aztec.m_Hod5Star[68]=17;
	c_Gold_Aztec.m_Baza_Level_Blok[69]="1335615626643243";
	c_Gold_Aztec.m_Baza_Level_Kris[69]="6666152415243333";
	c_Gold_Aztec.m_Hod5Star[69]=14;
	c_Gold_Aztec.m_Baza_Level_Blok[70]="3126312614521452";
	c_Gold_Aztec.m_Baza_Level_Kris[70]="2661233125512441";
	c_Gold_Aztec.m_Hod5Star[70]=18;
	c_Gold_Aztec.m_Baza_Level_Blok[71]="5645114662335265";
	c_Gold_Aztec.m_Baza_Level_Kris[71]="6116255425546336";
	c_Gold_Aztec.m_Hod5Star[71]=20;
	c_Gold_Aztec.m_Baza_Level_Blok[72]="6126112244336436";
	c_Gold_Aztec.m_Baza_Level_Kris[72]="6666112241234433";
	c_Gold_Aztec.m_Hod5Star[72]=10;
	c_Gold_Aztec.m_Baza_Level_Blok[73]="5566123455661234";
	c_Gold_Aztec.m_Baza_Level_Kris[73]="5336544652265116";
	c_Gold_Aztec.m_Hod5Star[73]=12;
	c_Gold_Aztec.m_Baza_Level_Blok[74]="5115522563366446";
	c_Gold_Aztec.m_Baza_Level_Kris[74]="5555142314236666";
	c_Gold_Aztec.m_Hod5Star[74]=14;
	c_Gold_Aztec.m_Baza_Level_Blok[75]="1332144215526126";
	c_Gold_Aztec.m_Baza_Level_Kris[75]="2222654365431111";
	c_Gold_Aztec.m_Hod5Star[75]=24;
	c_Gold_Aztec.m_Baza_Level_Blok[76]="1111432432322663";
	c_Gold_Aztec.m_Baza_Level_Kris[76]="3333146116412222";
	c_Gold_Aztec.m_Hod5Star[76]=19;
	c_Gold_Aztec.m_Baza_Level_Blok[77]="1441211232235335";
	c_Gold_Aztec.m_Baza_Level_Kris[77]="2222333345541111";
	c_Gold_Aztec.m_Hod5Star[77]=18;
	c_Gold_Aztec.m_Baza_Level_Blok[78]="6116134124326226";
	c_Gold_Aztec.m_Baza_Level_Kris[78]="1111366446632222";
	c_Gold_Aztec.m_Hod5Star[78]=22;
	c_Gold_Aztec.m_Baza_Level_Blok[79]="4355423223261136";
	c_Gold_Aztec.m_Baza_Level_Kris[79]="4455333322221166";
	c_Gold_Aztec.m_Hod5Star[79]=10;
	c_Gold_Aztec.m_Baza_Level_Blok[80]="2142341543512532";
	c_Gold_Aztec.m_Baza_Level_Kris[80]="2222514351435143";
	c_Gold_Aztec.m_Hod5Star[80]=32;
	c_Gold_Aztec.m_Baza_Level_Blok[81]="1662112244553453";
	c_Gold_Aztec.m_Baza_Level_Kris[81]="6222611134443555";
	c_Gold_Aztec.m_Hod5Star[81]=15;
	c_Gold_Aztec.m_Baza_Level_Blok[82]="1662512541243123";
	c_Gold_Aztec.m_Baza_Level_Kris[82]="6655443311221122";
	c_Gold_Aztec.m_Hod5Star[82]=26;
	c_Gold_Aztec.m_Baza_Level_Blok[83]="1133213422445665";
	c_Gold_Aztec.m_Baza_Level_Kris[83]="1234123412346655";
	c_Gold_Aztec.m_Hod5Star[83]=14;
	c_Gold_Aztec.m_Baza_Level_Blok[84]="1111334455662222";
	c_Gold_Aztec.m_Baza_Level_Kris[84]="1662134214321552";
	c_Gold_Aztec.m_Hod5Star[84]=23;
	c_Gold_Aztec.m_Baza_Level_Blok[85]="1321223344556546";
	c_Gold_Aztec.m_Baza_Level_Kris[85]="2221133344466555";
	c_Gold_Aztec.m_Hod5Star[85]=20;
	c_Gold_Aztec.m_Baza_Level_Blok[86]="1111624526543333";
	c_Gold_Aztec.m_Baza_Level_Kris[86]="1441166135533223";
	c_Gold_Aztec.m_Hod5Star[86]=12;
	c_Gold_Aztec.m_Baza_Level_Blok[87]="5125155236646346";
	c_Gold_Aztec.m_Baza_Level_Kris[87]="5226543653465116";
	c_Gold_Aztec.m_Hod5Star[87]=26;
	c_Gold_Aztec.m_Baza_Level_Blok[88]="1342312462152651";
	c_Gold_Aztec.m_Baza_Level_Kris[88]="1442155213321662";
	c_Gold_Aztec.m_Hod5Star[88]=22;
	c_Gold_Aztec.m_Baza_Level_Blok[89]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[89]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[89]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[90]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[90]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[90]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[91]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[91]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[91]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[92]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[92]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[92]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[93]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[93]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[93]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[94]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[94]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[94]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[95]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[95]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[95]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[96]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[96]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[96]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[97]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[97]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[97]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[98]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[98]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[98]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[99]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[99]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[99]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[100]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[100]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[100]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[101]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[101]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[101]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[102]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[102]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[102]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[103]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[103]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[103]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[104]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[104]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[104]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[105]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[105]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[105]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[106]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[106]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[106]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[107]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[107]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[107]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[108]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[108]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[108]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[109]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[109]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[109]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[110]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[110]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[110]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[111]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[111]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[111]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[112]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[112]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[112]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[113]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[113]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[113]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[114]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[114]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[114]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[115]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[115]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[115]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[116]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[116]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[116]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[117]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[117]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[117]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[118]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[118]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[118]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[119]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[119]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[119]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[120]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[120]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[120]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[121]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[121]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[121]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[122]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[122]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[122]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[123]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[123]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[123]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[124]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[124]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[124]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[125]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[125]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[125]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[126]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[126]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[126]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[127]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[127]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[127]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[128]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[128]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[128]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[129]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[129]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[129]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[130]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[130]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[130]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[131]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[131]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[131]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[132]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[132]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[132]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[133]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[133]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[133]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[134]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[134]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[134]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[135]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[135]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[135]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[136]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[136]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[136]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[137]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[137]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[137]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[138]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[138]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[138]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[139]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[139]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[139]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[140]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[140]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[140]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[141]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[141]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[141]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[142]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[142]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[142]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[143]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[143]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[143]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[144]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[144]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[144]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[145]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[145]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[145]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[146]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[146]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[146]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[147]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[147]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[147]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[148]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[148]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[148]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[149]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[149]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[149]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[150]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[150]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[150]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[151]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[151]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[151]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[152]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[152]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[152]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[153]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[153]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[153]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[154]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[154]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[154]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[155]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[155]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[155]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[156]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[156]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[156]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[157]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[157]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[157]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[158]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[158]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[158]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[159]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[159]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[159]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[160]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[160]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[160]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[161]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[161]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[161]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[162]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[162]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[162]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[163]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[163]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[163]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[164]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[164]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[164]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[165]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[165]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[165]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[166]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[166]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[166]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[167]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[167]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[167]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[168]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[168]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[168]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[169]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[169]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[169]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[170]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[170]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[170]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[171]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[171]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[171]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[172]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[172]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[172]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[173]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[173]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[173]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[174]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[174]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[174]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[175]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[175]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[175]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[176]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[176]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[176]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[177]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[177]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[177]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[178]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[178]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[178]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[179]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[179]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[179]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[180]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[180]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[180]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[181]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[181]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[181]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[182]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[182]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[182]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[183]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[183]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[183]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[184]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[184]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[184]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[185]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[185]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[185]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[186]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[186]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[186]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[187]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[187]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[187]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[188]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[188]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[188]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[189]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[189]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[189]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[190]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[190]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[190]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[191]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[191]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[191]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[192]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[192]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[192]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[193]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[193]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[193]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[194]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[194]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[194]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[195]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[195]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[195]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[196]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[196]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[196]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[197]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[197]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[197]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[198]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[198]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[198]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[199]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[199]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[199]=1;
	c_Gold_Aztec.m_Baza_Level_Blok[200]="1111111111111111";
	c_Gold_Aztec.m_Baza_Level_Kris[200]="1111111111111111";
	c_Gold_Aztec.m_Hod5Star[200]=1;
	return 0;
}
c_Gold_Aztec.m_Flag_Load=0;
c_Gold_Aztec.m_Flag_Help=0;
c_Gold_Aztec.m_Y_Help=0;
c_Gold_Aztec.m_Y_Meny=0;
c_Gold_Aztec.m_Y_RulonV=0;
c_Gold_Aztec.m_Y_RulonN=0;
c_Gold_Aztec.m_Frame_FireL=0;
c_Gold_Aztec.m_Frame_FireP=0;
c_Gold_Aztec.m_Flag_Listanie=0;
c_Gold_Aztec.m_Pauza=0;
c_Gold_Aztec.m_Max_Level=0;
c_Gold_Aztec.m_Flag_Stena=0;
c_Gold_Aztec.m_EK_K1=[];
c_Gold_Aztec.m_TK_K1=[];
c_Gold_Aztec.m_EK_K2=[];
c_Gold_Aztec.m_TK_K2=[];
c_Gold_Aztec.m_EK_K3=[];
c_Gold_Aztec.m_TK_K3=[];
c_Gold_Aztec.m_EK_K4=[];
c_Gold_Aztec.m_TK_K4=[];
c_Gold_Aztec.m_EK_K5=[];
c_Gold_Aztec.m_TK_K5=[];
c_Gold_Aztec.m_EK_K6=[];
c_Gold_Aztec.m_TK_K6=[];
c_Gold_Aztec.m_EK_K7=[];
c_Gold_Aztec.m_TK_K7=[];
c_Gold_Aztec.m_EK_K8=[];
c_Gold_Aztec.m_TK_K8=[];
c_Gold_Aztec.m_EK_K9=[];
c_Gold_Aztec.m_TK_K9=[];
c_Gold_Aztec.m_EK_K10=[];
c_Gold_Aztec.m_TK_K10=[];
c_Gold_Aztec.m_EK_K11=[];
c_Gold_Aztec.m_TK_K11=[];
c_Gold_Aztec.m_EK_K12=[];
c_Gold_Aztec.m_TK_K12=[];
c_Gold_Aztec.m_EK_K13=[];
c_Gold_Aztec.m_TK_K13=[];
c_Gold_Aztec.m_EK_K14=[];
c_Gold_Aztec.m_TK_K14=[];
c_Gold_Aztec.m_EK_K15=[];
c_Gold_Aztec.m_TK_K15=[];
c_Gold_Aztec.m_EK_K16=[];
c_Gold_Aztec.m_TK_K16=[];
c_Gold_Aztec.m_Atlas_Image1=null;
c_Gold_Aztec.m_Atlas_Image2=null;
c_Gold_Aztec.m_Atlas_Image3=null;
c_Gold_Aztec.m_Atlas_Image4=null;
c_Gold_Aztec.m_Atlas_Image5=null;
c_Gold_Aztec.m_Atlas_Image6=null;
c_Gold_Aztec.m_Im_Zastavka=null;
c_Gold_Aztec.m_Im_Loading=null;
c_Gold_Aztec.m_Zv_Click=null;
c_Gold_Aztec.m_Zv_Dveri=null;
c_Gold_Aztec.m_Zv_Kristal=null;
c_Gold_Aztec.m_Zv_Bumaga=null;
c_Gold_Aztec.m_Zv_Bumaga2=null;
c_Gold_Aztec.m_Zv_Click2=null;
c_Gold_Aztec.m_Zv_Scrip=null;
c_Gold_Aztec.m_Zv_Shagi=null;
c_Gold_Aztec.m_Zv_Zvon=null;
c_Gold_Aztec.m_Flag_Opros=0;
c_Gold_Aztec.m_Flag_Sound=0;
c_Gold_Aztec.m_Flag_Music=0;
c_Gold_Aztec.m_HighScore=[];
c_Gold_Aztec.m_HighStar=[];
c_Gold_Aztec.m_Dlina=function(t_St,t_Dl){
	var t_StD="";
	t_StD=String(t_St);
	while(t_StD.length<t_Dl){
		t_StD="0"+t_StD;
	}
	return t_StD;
}
c_Gold_Aztec.m_SaveDan=function(){
	var t_StrokaDan="";
	t_StrokaDan=t_StrokaDan+c_Gold_Aztec.m_Dlina(c_Gold_Aztec.m_Flag_Opros,1);
	t_StrokaDan=t_StrokaDan+c_Gold_Aztec.m_Dlina(c_Gold_Aztec.m_Flag_Sound,1);
	t_StrokaDan=t_StrokaDan+c_Gold_Aztec.m_Dlina(c_Gold_Aztec.m_Flag_Music,1);
	for(var t_C=1;t_C<=200;t_C=t_C+1){
		t_StrokaDan=t_StrokaDan+c_Gold_Aztec.m_Dlina(c_Gold_Aztec.m_HighScore[t_C],5);
		t_StrokaDan=t_StrokaDan+c_Gold_Aztec.m_Dlina(c_Gold_Aztec.m_HighStar[t_C],1);
	}
	bb_app_SaveState(t_StrokaDan);
	return 0;
}
c_Gold_Aztec.m_N_List=0;
c_Gold_Aztec.m_N_Level=0;
c_Gold_Aztec.m_SaveNachDan=function(){
	c_Gold_Aztec.m_Flag_Opros=0;
	c_Gold_Aztec.m_Flag_Sound=1;
	c_Gold_Aztec.m_Flag_Music=0;
	for(var t_C=1;t_C<=200;t_C=t_C+1){
		c_Gold_Aztec.m_HighScore[t_C]=0;
		c_Gold_Aztec.m_HighStar[t_C]=0;
	}
	c_Gold_Aztec.m_SaveDan();
	c_Gold_Aztec.m_HighScore[0]=1;
	c_Gold_Aztec.m_N_List=1;
	c_Gold_Aztec.m_N_Level=1;
	return 0;
}
c_Gold_Aztec.m_LoadDan=function(){
	var t_StrokaDan=bb_app_LoadState();
	if(t_StrokaDan==""){
		c_Gold_Aztec.m_SaveNachDan();
	}else{
		c_Gold_Aztec.m_Flag_Opros=parseInt((bb_functions_Mid(t_StrokaDan,1,1)),10);
		c_Gold_Aztec.m_Flag_Sound=parseInt((bb_functions_Mid(t_StrokaDan,2,1)),10);
		c_Gold_Aztec.m_Flag_Music=parseInt((bb_functions_Mid(t_StrokaDan,3,1)),10);
		c_Gold_Aztec.m_Flag_Music=0;
		var t_SS=0;
		t_SS=4;
		for(var t_C=1;t_C<=200;t_C=t_C+1){
			c_Gold_Aztec.m_HighScore[t_C]=parseInt((bb_functions_Mid(t_StrokaDan,t_SS,5)),10);
			c_Gold_Aztec.m_HighStar[t_C]=parseInt((bb_functions_Mid(t_StrokaDan,t_SS+5,1)),10);
			t_SS=t_SS+6;
		}
		c_Gold_Aztec.m_HighScore[0]=1;
		c_Gold_Aztec.m_N_Level=0;
		do{
			c_Gold_Aztec.m_N_Level=c_Gold_Aztec.m_N_Level+1;
		}while(!(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_N_Level]==0));
		if(c_Gold_Aztec.m_N_Level>c_Gold_Aztec.m_Max_Level){
			c_Gold_Aztec.m_N_Level=c_Gold_Aztec.m_Max_Level;
		}
		c_Gold_Aztec.m_N_List=((Math.floor(((c_Gold_Aztec.m_N_Level+3)/4)|0))|0);
	}
	return 0;
}
c_Gold_Aztec.m_Maska_Level_Blok=[];
c_Gold_Aztec.m_Maska_Level_Kris=[];
c_Gold_Aztec.m_Zagruzka_Level=function(){
	var t_Nl=c_Gold_Aztec.m_N_Level;
	c_Gold_Aztec.m_Maska_Level_Blok[1]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],1,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[2]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],2,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[3]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],3,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[4]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],4,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[5]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],5,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[6]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],6,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[7]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],7,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[8]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],8,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[9]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],9,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[10]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],10,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[11]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],11,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[12]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],12,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[13]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],13,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[14]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],14,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[15]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],15,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok[16]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],16,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[1]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],1,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[2]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],2,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[3]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],3,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[4]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],4,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[5]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],5,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[6]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],6,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[7]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],7,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[8]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],8,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[9]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],9,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[10]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],10,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[11]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],11,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[12]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],12,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[13]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],13,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[14]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],14,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[15]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],15,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris[16]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],16,1)),10);
	return 0;
}
c_Gold_Aztec.prototype.p_OnCreate=function(){
	bb_app_SetUpdateRate(50);
	c_Gold_Aztec.m_RX_Ekr=(bb_app_DeviceWidth())/480.0;
	c_Gold_Aztec.m_RY_Ekr=(bb_app_DeviceHeight())/800.0;
	bb_random_Seed=diddy.systemMillisecs();
	c_Gold_Aztec.m_CreateBazaLevel();
	c_Gold_Aztec.m_Flag_Load=0;
	c_Gold_Aztec.m_Flag_Help=0;
	c_Gold_Aztec.m_Y_Help=-70;
	c_Gold_Aztec.m_Y_Meny=800;
	c_Gold_Aztec.m_Y_RulonV=-70;
	c_Gold_Aztec.m_Y_RulonN=0;
	c_Gold_Aztec.m_Frame_FireL=((bb_random_Rnd2(0.0,15.0))|0);
	c_Gold_Aztec.m_Frame_FireP=((bb_random_Rnd2(0.0,15.0))|0);
	c_Gold_Aztec.m_Flag_Listanie=0;
	c_Gold_Aztec.m_Pauza=0;
	c_Gold_Aztec.m_Max_Level=88;
	c_Gold_Aztec.m_Flag_Stena=0;
	c_Gold_Aztec.m_EK_K1[0]=23;
	c_Gold_Aztec.m_EK_K1[1]=93;
	c_Gold_Aztec.m_TK_K1[0]=23;
	c_Gold_Aztec.m_TK_K1[1]=93;
	c_Gold_Aztec.m_EK_K2[0]=143;
	c_Gold_Aztec.m_EK_K2[1]=93;
	c_Gold_Aztec.m_TK_K2[0]=143;
	c_Gold_Aztec.m_TK_K2[1]=93;
	c_Gold_Aztec.m_EK_K3[0]=263;
	c_Gold_Aztec.m_EK_K3[1]=93;
	c_Gold_Aztec.m_TK_K3[0]=263;
	c_Gold_Aztec.m_TK_K3[1]=93;
	c_Gold_Aztec.m_EK_K4[0]=383;
	c_Gold_Aztec.m_EK_K4[1]=93;
	c_Gold_Aztec.m_TK_K4[0]=383;
	c_Gold_Aztec.m_TK_K4[1]=93;
	c_Gold_Aztec.m_EK_K5[0]=23;
	c_Gold_Aztec.m_EK_K5[1]=213;
	c_Gold_Aztec.m_TK_K5[0]=23;
	c_Gold_Aztec.m_TK_K5[1]=213;
	c_Gold_Aztec.m_EK_K6[0]=143;
	c_Gold_Aztec.m_EK_K6[1]=213;
	c_Gold_Aztec.m_TK_K6[0]=143;
	c_Gold_Aztec.m_TK_K6[1]=213;
	c_Gold_Aztec.m_EK_K7[0]=263;
	c_Gold_Aztec.m_EK_K7[1]=213;
	c_Gold_Aztec.m_TK_K7[0]=263;
	c_Gold_Aztec.m_TK_K7[1]=213;
	c_Gold_Aztec.m_EK_K8[0]=383;
	c_Gold_Aztec.m_EK_K8[1]=213;
	c_Gold_Aztec.m_TK_K8[0]=383;
	c_Gold_Aztec.m_TK_K8[1]=213;
	c_Gold_Aztec.m_EK_K9[0]=23;
	c_Gold_Aztec.m_EK_K9[1]=333;
	c_Gold_Aztec.m_TK_K9[0]=23;
	c_Gold_Aztec.m_TK_K9[1]=333;
	c_Gold_Aztec.m_EK_K10[0]=143;
	c_Gold_Aztec.m_EK_K10[1]=333;
	c_Gold_Aztec.m_TK_K10[0]=143;
	c_Gold_Aztec.m_TK_K10[1]=333;
	c_Gold_Aztec.m_EK_K11[0]=263;
	c_Gold_Aztec.m_EK_K11[1]=333;
	c_Gold_Aztec.m_TK_K11[0]=263;
	c_Gold_Aztec.m_TK_K11[1]=333;
	c_Gold_Aztec.m_EK_K12[0]=383;
	c_Gold_Aztec.m_EK_K12[1]=333;
	c_Gold_Aztec.m_TK_K12[0]=383;
	c_Gold_Aztec.m_TK_K12[1]=333;
	c_Gold_Aztec.m_EK_K13[0]=23;
	c_Gold_Aztec.m_EK_K13[1]=453;
	c_Gold_Aztec.m_TK_K13[0]=23;
	c_Gold_Aztec.m_TK_K13[1]=453;
	c_Gold_Aztec.m_EK_K14[0]=143;
	c_Gold_Aztec.m_EK_K14[1]=453;
	c_Gold_Aztec.m_TK_K14[0]=143;
	c_Gold_Aztec.m_TK_K14[1]=453;
	c_Gold_Aztec.m_EK_K15[0]=263;
	c_Gold_Aztec.m_EK_K15[1]=453;
	c_Gold_Aztec.m_TK_K15[0]=263;
	c_Gold_Aztec.m_TK_K15[1]=453;
	c_Gold_Aztec.m_EK_K16[0]=383;
	c_Gold_Aztec.m_EK_K16[1]=453;
	c_Gold_Aztec.m_TK_K16[0]=383;
	c_Gold_Aztec.m_TK_K16[1]=453;
	c_Gold_Aztec.m_Atlas_Image1=bb_graphics_LoadImage("Image1.png",1,c_Image.m_DefaultFlags);
	c_Gold_Aztec.m_Atlas_Image2=bb_graphics_LoadImage("Image2.png",1,c_Image.m_DefaultFlags);
	c_Gold_Aztec.m_Atlas_Image3=bb_graphics_LoadImage("Image3.png",1,c_Image.m_DefaultFlags);
	c_Gold_Aztec.m_Atlas_Image4=bb_graphics_LoadImage("Image4.png",1,c_Image.m_DefaultFlags);
	c_Gold_Aztec.m_Atlas_Image5=bb_graphics_LoadImage("Image5.png",1,c_Image.m_DefaultFlags);
	c_Gold_Aztec.m_Atlas_Image6=bb_graphics_LoadImage("Image6.png",1,c_Image.m_DefaultFlags);
	c_Gold_Aztec.m_Im_Zastavka=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(1,1,480,800,1,c_Image.m_DefaultFlags);
	c_Gold_Aztec.m_Im_Loading=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(431,903,193,43,1,c_Image.m_DefaultFlags);
	c_Gold_Aztec.m_Zv_Click=bb_audio_LoadSound("Click.wav");
	c_Gold_Aztec.m_Zv_Dveri=bb_audio_LoadSound("Dveri.wav");
	c_Gold_Aztec.m_Zv_Kristal=bb_audio_LoadSound("Kristal.wav");
	c_Gold_Aztec.m_Zv_Bumaga=bb_audio_LoadSound("Bumaga.wav");
	c_Gold_Aztec.m_Zv_Bumaga2=bb_audio_LoadSound("Bumaga2.wav");
	c_Gold_Aztec.m_Zv_Click2=bb_audio_LoadSound("Click2.wav");
	c_Gold_Aztec.m_Zv_Scrip=bb_audio_LoadSound("Scrip.wav");
	c_Gold_Aztec.m_Zv_Shagi=bb_audio_LoadSound("Shagi.wav");
	c_Gold_Aztec.m_Zv_Zvon=bb_audio_LoadSound("Zvon.wav");
	c_Gold_Aztec.m_LoadDan();
	c_Gold_Aztec.m_Flag_Opros=1;
	c_Gold_Aztec.m_Zagruzka_Level();
	return 0;
}
c_Gold_Aztec.m_Regim=0;
c_Gold_Aztec.m_BannerON=function(){
   if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
     sdk.showBanner();
    }
	return 0;
}
c_Gold_Aztec.m_Update_Zastavka=function(){
	if(c_Gold_Aztec.m_Flag_Load==1){
		c_Gold_Aztec.m_BannerON();
	}
	if(c_Gold_Aztec.m_Flag_Load>=5){
		c_Gold_Aztec.m_Flag_Load=0;
		c_Gold_Aztec.m_Regim=1;
	}
	return 0;
}
c_Gold_Aztec.m_Update_Smena_Zastavka_GlMeny=function(){
	c_Gold_Aztec.m_Y_Meny=c_Gold_Aztec.m_Y_Meny-5;
	if(c_Gold_Aztec.m_Y_Meny<=605){
		c_Gold_Aztec.m_Y_Meny=605;
		c_Gold_Aztec.m_Regim=2;
		if(c_Gold_Aztec.m_Flag_Music==1){
			bb_audio_PlayMusic("Music.wav",1);
		}
	}
	return 0;
}
c_Gold_Aztec.m_Proz_Screen=0;
c_Gold_Aztec.m_Frame_RulonH=0;
c_Gold_Aztec.m_Update_GlMeny=function(){
	if(c_Gold_Aztec.m_Flag_Help==0){
		if(c_Gold_Aztec.m_Pauza==0){
			for(var t_Co=0;t_Co<=5;t_Co=t_Co+1){
				if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>35.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<445.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>605.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<700.0*c_Gold_Aztec.m_RY_Ekr){
					if(c_Gold_Aztec.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click,2,0);
					}
					c_Gold_Aztec.m_Regim=3;
					c_Gold_Aztec.m_Proz_Screen=1.0;
				}
				if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>30.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<120.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>700.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<800.0*c_Gold_Aztec.m_RY_Ekr){
					bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click,2,0);
					var t_3=c_Gold_Aztec.m_Flag_Sound;
					if(t_3==0){
						c_Gold_Aztec.m_Flag_Sound=1;
					}else{
						if(t_3==1){
							c_Gold_Aztec.m_Flag_Sound=0;
						}
					}
				}
				if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>360.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<450.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>700.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<800.0*c_Gold_Aztec.m_RY_Ekr){
					if(c_Gold_Aztec.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click,2,0);
					}
					var t_4=c_Gold_Aztec.m_Flag_Music;
					if(t_4==0){
						c_Gold_Aztec.m_Flag_Music=1;
						bb_audio_PlayMusic("Music.wav",1);
					}else{
						if(t_4==1){
							c_Gold_Aztec.m_Flag_Music=0;
							bb_audio_StopMusic();
						}
					}
				}
				if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>120.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<360.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>700.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<800.0*c_Gold_Aztec.m_RY_Ekr){
					if(c_Gold_Aztec.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga,5,0);
					}
					c_Gold_Aztec.m_Flag_Help=1;
				}
			}
		}
	}else{
		var t_5=c_Gold_Aztec.m_Flag_Help;
		if(t_5==1){
			c_Gold_Aztec.m_Y_Help=c_Gold_Aztec.m_Y_Help+15;
			c_Gold_Aztec.m_Frame_RulonH=c_Gold_Aztec.m_Frame_RulonH-1;
			if(c_Gold_Aztec.m_Frame_RulonH<0){
				c_Gold_Aztec.m_Frame_RulonH=9;
			}
			if(c_Gold_Aztec.m_Y_Help>=730){
				c_Gold_Aztec.m_Y_Help=730;
				c_Gold_Aztec.m_Flag_Help=2;
			}
		}else{
			if(t_5==2){
				for(var t_Co2=0;t_Co2<=5;t_Co2=t_Co2+1){
					if(bb_input_TouchHit(t_Co2)==1 && bb_input_TouchX(t_Co2)>2.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co2)<478.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co2)>730.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co2)<800.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga,5,0);
						}
						c_Gold_Aztec.m_Flag_Help=3;
					}
				}
				if((bb_input_KeyHit(27))!=0){
					if(c_Gold_Aztec.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga,5,0);
					}
					c_Gold_Aztec.m_Flag_Help=3;
				}
			}else{
				if(t_5==3){
					c_Gold_Aztec.m_Y_Help=c_Gold_Aztec.m_Y_Help-15;
					c_Gold_Aztec.m_Frame_RulonH=c_Gold_Aztec.m_Frame_RulonH+1;
					if(c_Gold_Aztec.m_Frame_RulonH>9){
						c_Gold_Aztec.m_Frame_RulonH=0;
					}
					if(c_Gold_Aztec.m_Y_Help<=-70){
						c_Gold_Aztec.m_Y_Help=-70;
						c_Gold_Aztec.m_Flag_Help=0;
					}
				}
			}
		}
	}
	return 0;
}
c_Gold_Aztec.m_Flag_Complete=0;
c_Gold_Aztec.m_Zad_Fire=0;
c_Gold_Aztec.m_Update_Smena_GlMeny_Game=function(){
	if(c_Gold_Aztec.m_Y_Meny<800){
		c_Gold_Aztec.m_Y_Meny=c_Gold_Aztec.m_Y_Meny+5;
	}
	if(c_Gold_Aztec.m_Y_Meny>=800){
		c_Gold_Aztec.m_Y_Meny=800;
		c_Gold_Aztec.m_Proz_Screen=c_Gold_Aztec.m_Proz_Screen-0.025;
	}
	if(c_Gold_Aztec.m_Proz_Screen<=0.0){
		c_Gold_Aztec.m_Proz_Screen=0.0;
		c_Gold_Aztec.m_Regim=4;
		c_Gold_Aztec.m_Flag_Complete=0;
	}
	c_Gold_Aztec.m_Zad_Fire=c_Gold_Aztec.m_Zad_Fire+1;
	if(c_Gold_Aztec.m_Zad_Fire>1){
		c_Gold_Aztec.m_Zad_Fire=0;
		c_Gold_Aztec.m_Frame_FireL=c_Gold_Aztec.m_Frame_FireL+1;
		c_Gold_Aztec.m_Frame_FireP=c_Gold_Aztec.m_Frame_FireP+1;
	}
	if(c_Gold_Aztec.m_Frame_FireL>15){
		c_Gold_Aztec.m_Frame_FireL=0;
	}
	if(c_Gold_Aztec.m_Frame_FireP>15){
		c_Gold_Aztec.m_Frame_FireP=0;
	}
	return 0;
}
c_Gold_Aztec.m_Animacia=0;
c_Gold_Aztec.m_Viz_Level=[];
c_Gold_Aztec.m_Viz_Score=[];
c_Gold_Aztec.m_Viz_Star=[];
c_Gold_Aztec.m_Flag_Dostup=[];
c_Gold_Aztec.m_Cikl_Anim=0;
c_Gold_Aztec.m_Schet=0;
c_Gold_Aztec.m_Skor_Dvig=0;
c_Gold_Aztec.m_Sm_T1=0;
c_Gold_Aztec.m_Sm_T2=0;
c_Gold_Aztec.m_Sm_T5=0;
c_Gold_Aztec.m_Sm_T6=0;
c_Gold_Aztec.m_Frame_Kristal=[];
c_Gold_Aztec.m_Sm_T3=0;
c_Gold_Aztec.m_Sm_T7=0;
c_Gold_Aztec.m_Sm_T4=0;
c_Gold_Aztec.m_Sm_T8=0;
c_Gold_Aztec.m_Sm_T9=0;
c_Gold_Aztec.m_Sm_T10=0;
c_Gold_Aztec.m_Sm_T11=0;
c_Gold_Aztec.m_Sm_T12=0;
c_Gold_Aztec.m_Sm_T13=0;
c_Gold_Aztec.m_Sm_T14=0;
c_Gold_Aztec.m_Sm_T15=0;
c_Gold_Aztec.m_Sm_T16=0;
c_Gold_Aztec.m_Maska_Level_Blok2=[];
c_Gold_Aztec.m_Maska_Level_Kris2=[];
c_Gold_Aztec.m_Zagruzka_Level2=function(){
	var t_Nl=0;
	if(c_Gold_Aztec.m_N_Level<c_Gold_Aztec.m_Max_Level){
		t_Nl=c_Gold_Aztec.m_N_Level+1;
	}else{
		t_Nl=c_Gold_Aztec.m_N_Level;
	}
	c_Gold_Aztec.m_Maska_Level_Blok2[1]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],1,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[2]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],2,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[3]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],3,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[4]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],4,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[5]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],5,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[6]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],6,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[7]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],7,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[8]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],8,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[9]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],9,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[10]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],10,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[11]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],11,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[12]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],12,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[13]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],13,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[14]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],14,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[15]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],15,1)),10);
	c_Gold_Aztec.m_Maska_Level_Blok2[16]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Blok[t_Nl],16,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[1]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],1,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[2]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],2,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[3]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],3,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[4]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],4,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[5]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],5,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[6]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],6,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[7]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],7,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[8]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],8,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[9]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],9,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[10]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],10,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[11]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],11,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[12]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],12,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[13]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],13,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[14]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],14,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[15]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],15,1)),10);
	c_Gold_Aztec.m_Maska_Level_Kris2[16]=parseInt((bb_functions_Mid(c_Gold_Aztec.m_Baza_Level_Kris[t_Nl],16,1)),10);
	return 0;
}
c_Gold_Aztec.m_SkX_Blok=0;
c_Gold_Aztec.m_SmX_Blok=0;
c_Gold_Aztec.m_MKor=0;
c_Gold_Aztec.m_Frame_Sunduk=0;
c_Gold_Aztec.m_Alpha_Sunduk=0;
c_Gold_Aztec.m_Zad_Sunduk=0;
c_Gold_Aztec.m_M_StarL=[];
c_Gold_Aztec.m_Zad_PV=0;
c_Gold_Aztec.m_Star_Level=0;
c_Gold_Aztec.m_Score_Level=0;
c_Gold_Aztec.m_Frame_Kristal2=[];
c_Gold_Aztec.m_Update_Game=function(){
	if(c_Gold_Aztec.m_Pauza==0){
		var t_6=c_Gold_Aztec.m_Flag_Complete;
		if(t_6==0){
			if(c_Gold_Aztec.m_Animacia==0){
				for(var t_Co=0;t_Co<=5;t_Co=t_Co+1){
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>0.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<64.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga2,6,0);
						}
						c_Gold_Aztec.m_N_List=((Math.floor(((c_Gold_Aztec.m_N_Level+3)/4)|0))|0);
						c_Gold_Aztec.m_Viz_Level[1]=c_Gold_Aztec.m_N_List*4-3;
						c_Gold_Aztec.m_Viz_Level[2]=c_Gold_Aztec.m_N_List*4-2;
						c_Gold_Aztec.m_Viz_Level[3]=c_Gold_Aztec.m_N_List*4-1;
						c_Gold_Aztec.m_Viz_Level[4]=c_Gold_Aztec.m_N_List*4;
						c_Gold_Aztec.m_Viz_Score[1]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[1]];
						c_Gold_Aztec.m_Viz_Score[2]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[2]];
						c_Gold_Aztec.m_Viz_Score[3]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[3]];
						c_Gold_Aztec.m_Viz_Score[4]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[4]];
						c_Gold_Aztec.m_Viz_Star[1]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[1]];
						c_Gold_Aztec.m_Viz_Star[2]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[2]];
						c_Gold_Aztec.m_Viz_Star[3]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[3]];
						c_Gold_Aztec.m_Viz_Star[4]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[4]];
						c_Gold_Aztec.m_Flag_Dostup[1]=1;
						c_Gold_Aztec.m_Flag_Dostup[2]=1;
						c_Gold_Aztec.m_Flag_Dostup[3]=1;
						c_Gold_Aztec.m_Flag_Dostup[4]=1;
						if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[1]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[1]]==0){
							c_Gold_Aztec.m_Flag_Dostup[1]=0;
						}
						if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[2]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[2]]==0){
							c_Gold_Aztec.m_Flag_Dostup[2]=0;
						}
						if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[3]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[3]]==0){
							c_Gold_Aztec.m_Flag_Dostup[3]=0;
						}
						if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[4]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[4]]==0){
							c_Gold_Aztec.m_Flag_Dostup[4]=0;
						}
						c_Gold_Aztec.m_Regim=6;
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<180.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>70.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<250.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=1;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>180.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<300.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>70.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<250.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=2;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>300.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>70.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<250.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=3;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<180.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>250.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<370.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=4;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>180.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<300.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>250.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<370.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=5;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>300.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>250.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<370.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=6;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<180.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>370.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<550.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=7;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>180.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<300.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>370.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<550.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=8;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>300.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>370.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<550.0*c_Gold_Aztec.m_RY_Ekr){
						if(c_Gold_Aztec.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Kristal,4,0);
						}
						c_Gold_Aztec.m_Animacia=9;
						c_Gold_Aztec.m_Cikl_Anim=1;
						if(c_Gold_Aztec.m_Schet<99998){
							c_Gold_Aztec.m_Schet=c_Gold_Aztec.m_Schet+1;
						}
					}
				}
				if(((bb_input_KeyHit(27))!=0) && c_Gold_Aztec.m_Animacia==0){
					if(c_Gold_Aztec.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
					}
					c_Gold_Aztec.m_Pauza=1;
				}
			}else{
				var t_7=c_Gold_Aztec.m_Animacia;
				if(t_7==1){
					if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
						c_Gold_Aztec.m_Skor_Dvig=1;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
						c_Gold_Aztec.m_Skor_Dvig=2;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
						c_Gold_Aztec.m_Skor_Dvig=3;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
						c_Gold_Aztec.m_Skor_Dvig=4;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
						c_Gold_Aztec.m_Skor_Dvig=5;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
						c_Gold_Aztec.m_Skor_Dvig=6;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
						c_Gold_Aztec.m_Skor_Dvig=7;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
						c_Gold_Aztec.m_Skor_Dvig=8;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
						c_Gold_Aztec.m_Skor_Dvig=9;
					}
					if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
						c_Gold_Aztec.m_Skor_Dvig=10;
					}
					c_Gold_Aztec.m_TK_K1[0]=c_Gold_Aztec.m_TK_K1[0]+c_Gold_Aztec.m_Skor_Dvig;
					c_Gold_Aztec.m_TK_K2[1]=c_Gold_Aztec.m_TK_K2[1]+c_Gold_Aztec.m_Skor_Dvig;
					c_Gold_Aztec.m_TK_K5[1]=c_Gold_Aztec.m_TK_K5[1]-c_Gold_Aztec.m_Skor_Dvig;
					c_Gold_Aztec.m_TK_K6[0]=c_Gold_Aztec.m_TK_K6[0]-c_Gold_Aztec.m_Skor_Dvig;
					c_Gold_Aztec.m_Sm_T1=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
					c_Gold_Aztec.m_Sm_T2=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
					c_Gold_Aztec.m_Sm_T5=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
					c_Gold_Aztec.m_Sm_T6=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
					c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
					if(c_Gold_Aztec.m_Cikl_Anim>21){
						c_Gold_Aztec.m_Cikl_Anim=0;
						c_Gold_Aztec.m_Animacia=10;
						c_Gold_Aztec.m_TK_K1[0]=c_Gold_Aztec.m_EK_K1[0];
						c_Gold_Aztec.m_TK_K2[1]=c_Gold_Aztec.m_EK_K2[1];
						c_Gold_Aztec.m_TK_K5[1]=c_Gold_Aztec.m_EK_K5[1];
						c_Gold_Aztec.m_TK_K6[0]=c_Gold_Aztec.m_EK_K6[0];
						var t_El1=c_Gold_Aztec.m_Maska_Level_Kris[5];
						var t_El2=c_Gold_Aztec.m_Maska_Level_Kris[1];
						var t_El5=c_Gold_Aztec.m_Maska_Level_Kris[6];
						var t_El6=c_Gold_Aztec.m_Maska_Level_Kris[2];
						var t_Fr1=c_Gold_Aztec.m_Frame_Kristal[5];
						var t_Fr2=c_Gold_Aztec.m_Frame_Kristal[1];
						var t_Fr5=c_Gold_Aztec.m_Frame_Kristal[6];
						var t_Fr6=c_Gold_Aztec.m_Frame_Kristal[2];
						c_Gold_Aztec.m_Maska_Level_Kris[1]=t_El1;
						c_Gold_Aztec.m_Maska_Level_Kris[2]=t_El2;
						c_Gold_Aztec.m_Maska_Level_Kris[5]=t_El5;
						c_Gold_Aztec.m_Maska_Level_Kris[6]=t_El6;
						c_Gold_Aztec.m_Frame_Kristal[1]=t_Fr1;
						c_Gold_Aztec.m_Frame_Kristal[2]=t_Fr2;
						c_Gold_Aztec.m_Frame_Kristal[5]=t_Fr5;
						c_Gold_Aztec.m_Frame_Kristal[6]=t_Fr6;
						c_Gold_Aztec.m_Sm_T1=0;
						c_Gold_Aztec.m_Sm_T2=0;
						c_Gold_Aztec.m_Sm_T5=0;
						c_Gold_Aztec.m_Sm_T6=0;
					}
				}else{
					if(t_7==2){
						if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
							c_Gold_Aztec.m_Skor_Dvig=1;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
							c_Gold_Aztec.m_Skor_Dvig=2;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
							c_Gold_Aztec.m_Skor_Dvig=3;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
							c_Gold_Aztec.m_Skor_Dvig=4;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
							c_Gold_Aztec.m_Skor_Dvig=5;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
							c_Gold_Aztec.m_Skor_Dvig=6;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
							c_Gold_Aztec.m_Skor_Dvig=7;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
							c_Gold_Aztec.m_Skor_Dvig=8;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
							c_Gold_Aztec.m_Skor_Dvig=9;
						}
						if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
							c_Gold_Aztec.m_Skor_Dvig=10;
						}
						c_Gold_Aztec.m_TK_K2[0]=c_Gold_Aztec.m_TK_K2[0]+c_Gold_Aztec.m_Skor_Dvig;
						c_Gold_Aztec.m_TK_K3[1]=c_Gold_Aztec.m_TK_K3[1]+c_Gold_Aztec.m_Skor_Dvig;
						c_Gold_Aztec.m_TK_K6[1]=c_Gold_Aztec.m_TK_K6[1]-c_Gold_Aztec.m_Skor_Dvig;
						c_Gold_Aztec.m_TK_K7[0]=c_Gold_Aztec.m_TK_K7[0]-c_Gold_Aztec.m_Skor_Dvig;
						c_Gold_Aztec.m_Sm_T2=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
						c_Gold_Aztec.m_Sm_T3=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
						c_Gold_Aztec.m_Sm_T6=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
						c_Gold_Aztec.m_Sm_T7=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
						c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
						if(c_Gold_Aztec.m_Cikl_Anim>21){
							c_Gold_Aztec.m_Cikl_Anim=0;
							c_Gold_Aztec.m_Animacia=10;
							c_Gold_Aztec.m_TK_K2[0]=c_Gold_Aztec.m_EK_K2[0];
							c_Gold_Aztec.m_TK_K3[1]=c_Gold_Aztec.m_EK_K3[1];
							c_Gold_Aztec.m_TK_K6[1]=c_Gold_Aztec.m_EK_K6[1];
							c_Gold_Aztec.m_TK_K7[0]=c_Gold_Aztec.m_EK_K7[0];
							var t_El22=c_Gold_Aztec.m_Maska_Level_Kris[6];
							var t_El3=c_Gold_Aztec.m_Maska_Level_Kris[2];
							var t_El62=c_Gold_Aztec.m_Maska_Level_Kris[7];
							var t_El7=c_Gold_Aztec.m_Maska_Level_Kris[3];
							var t_Fr22=c_Gold_Aztec.m_Frame_Kristal[6];
							var t_Fr3=c_Gold_Aztec.m_Frame_Kristal[2];
							var t_Fr62=c_Gold_Aztec.m_Frame_Kristal[7];
							var t_Fr7=c_Gold_Aztec.m_Frame_Kristal[3];
							c_Gold_Aztec.m_Maska_Level_Kris[2]=t_El22;
							c_Gold_Aztec.m_Maska_Level_Kris[3]=t_El3;
							c_Gold_Aztec.m_Maska_Level_Kris[6]=t_El62;
							c_Gold_Aztec.m_Maska_Level_Kris[7]=t_El7;
							c_Gold_Aztec.m_Frame_Kristal[2]=t_Fr22;
							c_Gold_Aztec.m_Frame_Kristal[3]=t_Fr3;
							c_Gold_Aztec.m_Frame_Kristal[6]=t_Fr62;
							c_Gold_Aztec.m_Frame_Kristal[7]=t_Fr7;
							c_Gold_Aztec.m_Sm_T2=0;
							c_Gold_Aztec.m_Sm_T3=0;
							c_Gold_Aztec.m_Sm_T6=0;
							c_Gold_Aztec.m_Sm_T7=0;
						}
					}else{
						if(t_7==3){
							if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
								c_Gold_Aztec.m_Skor_Dvig=1;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
								c_Gold_Aztec.m_Skor_Dvig=2;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
								c_Gold_Aztec.m_Skor_Dvig=3;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
								c_Gold_Aztec.m_Skor_Dvig=4;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
								c_Gold_Aztec.m_Skor_Dvig=5;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
								c_Gold_Aztec.m_Skor_Dvig=6;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
								c_Gold_Aztec.m_Skor_Dvig=7;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
								c_Gold_Aztec.m_Skor_Dvig=8;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
								c_Gold_Aztec.m_Skor_Dvig=9;
							}
							if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
								c_Gold_Aztec.m_Skor_Dvig=10;
							}
							c_Gold_Aztec.m_TK_K3[0]=c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_Skor_Dvig;
							c_Gold_Aztec.m_TK_K4[1]=c_Gold_Aztec.m_TK_K4[1]+c_Gold_Aztec.m_Skor_Dvig;
							c_Gold_Aztec.m_TK_K7[1]=c_Gold_Aztec.m_TK_K7[1]-c_Gold_Aztec.m_Skor_Dvig;
							c_Gold_Aztec.m_TK_K8[0]=c_Gold_Aztec.m_TK_K8[0]-c_Gold_Aztec.m_Skor_Dvig;
							c_Gold_Aztec.m_Sm_T3=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
							c_Gold_Aztec.m_Sm_T4=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
							c_Gold_Aztec.m_Sm_T7=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
							c_Gold_Aztec.m_Sm_T8=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
							c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
							if(c_Gold_Aztec.m_Cikl_Anim>21){
								c_Gold_Aztec.m_Cikl_Anim=0;
								c_Gold_Aztec.m_Animacia=10;
								c_Gold_Aztec.m_TK_K3[0]=c_Gold_Aztec.m_EK_K3[0];
								c_Gold_Aztec.m_TK_K4[1]=c_Gold_Aztec.m_EK_K4[1];
								c_Gold_Aztec.m_TK_K7[1]=c_Gold_Aztec.m_EK_K7[1];
								c_Gold_Aztec.m_TK_K8[0]=c_Gold_Aztec.m_EK_K8[0];
								var t_El32=c_Gold_Aztec.m_Maska_Level_Kris[7];
								var t_El4=c_Gold_Aztec.m_Maska_Level_Kris[3];
								var t_El72=c_Gold_Aztec.m_Maska_Level_Kris[8];
								var t_El8=c_Gold_Aztec.m_Maska_Level_Kris[4];
								var t_Fr32=c_Gold_Aztec.m_Frame_Kristal[7];
								var t_Fr4=c_Gold_Aztec.m_Frame_Kristal[3];
								var t_Fr72=c_Gold_Aztec.m_Frame_Kristal[8];
								var t_Fr8=c_Gold_Aztec.m_Frame_Kristal[4];
								c_Gold_Aztec.m_Maska_Level_Kris[3]=t_El32;
								c_Gold_Aztec.m_Maska_Level_Kris[4]=t_El4;
								c_Gold_Aztec.m_Maska_Level_Kris[7]=t_El72;
								c_Gold_Aztec.m_Maska_Level_Kris[8]=t_El8;
								c_Gold_Aztec.m_Frame_Kristal[3]=t_Fr32;
								c_Gold_Aztec.m_Frame_Kristal[4]=t_Fr4;
								c_Gold_Aztec.m_Frame_Kristal[7]=t_Fr72;
								c_Gold_Aztec.m_Frame_Kristal[8]=t_Fr8;
								c_Gold_Aztec.m_Sm_T3=0;
								c_Gold_Aztec.m_Sm_T4=0;
								c_Gold_Aztec.m_Sm_T7=0;
								c_Gold_Aztec.m_Sm_T8=0;
							}
						}else{
							if(t_7==4){
								if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
									c_Gold_Aztec.m_Skor_Dvig=1;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
									c_Gold_Aztec.m_Skor_Dvig=2;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
									c_Gold_Aztec.m_Skor_Dvig=3;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
									c_Gold_Aztec.m_Skor_Dvig=4;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
									c_Gold_Aztec.m_Skor_Dvig=5;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
									c_Gold_Aztec.m_Skor_Dvig=6;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
									c_Gold_Aztec.m_Skor_Dvig=7;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
									c_Gold_Aztec.m_Skor_Dvig=8;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
									c_Gold_Aztec.m_Skor_Dvig=9;
								}
								if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
									c_Gold_Aztec.m_Skor_Dvig=10;
								}
								c_Gold_Aztec.m_TK_K5[0]=c_Gold_Aztec.m_TK_K5[0]+c_Gold_Aztec.m_Skor_Dvig;
								c_Gold_Aztec.m_TK_K6[1]=c_Gold_Aztec.m_TK_K6[1]+c_Gold_Aztec.m_Skor_Dvig;
								c_Gold_Aztec.m_TK_K9[1]=c_Gold_Aztec.m_TK_K9[1]-c_Gold_Aztec.m_Skor_Dvig;
								c_Gold_Aztec.m_TK_K10[0]=c_Gold_Aztec.m_TK_K10[0]-c_Gold_Aztec.m_Skor_Dvig;
								c_Gold_Aztec.m_Sm_T5=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
								c_Gold_Aztec.m_Sm_T6=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
								c_Gold_Aztec.m_Sm_T9=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
								c_Gold_Aztec.m_Sm_T10=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
								c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
								if(c_Gold_Aztec.m_Cikl_Anim>21){
									c_Gold_Aztec.m_Cikl_Anim=0;
									c_Gold_Aztec.m_Animacia=10;
									c_Gold_Aztec.m_TK_K5[0]=c_Gold_Aztec.m_EK_K5[0];
									c_Gold_Aztec.m_TK_K6[1]=c_Gold_Aztec.m_EK_K6[1];
									c_Gold_Aztec.m_TK_K9[1]=c_Gold_Aztec.m_EK_K9[1];
									c_Gold_Aztec.m_TK_K10[0]=c_Gold_Aztec.m_EK_K10[0];
									var t_El52=c_Gold_Aztec.m_Maska_Level_Kris[9];
									var t_El63=c_Gold_Aztec.m_Maska_Level_Kris[5];
									var t_El9=c_Gold_Aztec.m_Maska_Level_Kris[10];
									var t_El10=c_Gold_Aztec.m_Maska_Level_Kris[6];
									var t_Fr52=c_Gold_Aztec.m_Frame_Kristal[9];
									var t_Fr63=c_Gold_Aztec.m_Frame_Kristal[5];
									var t_Fr9=c_Gold_Aztec.m_Frame_Kristal[10];
									var t_Fr10=c_Gold_Aztec.m_Frame_Kristal[6];
									c_Gold_Aztec.m_Maska_Level_Kris[5]=t_El52;
									c_Gold_Aztec.m_Maska_Level_Kris[6]=t_El63;
									c_Gold_Aztec.m_Maska_Level_Kris[9]=t_El9;
									c_Gold_Aztec.m_Maska_Level_Kris[10]=t_El10;
									c_Gold_Aztec.m_Frame_Kristal[5]=t_Fr52;
									c_Gold_Aztec.m_Frame_Kristal[6]=t_Fr63;
									c_Gold_Aztec.m_Frame_Kristal[9]=t_Fr9;
									c_Gold_Aztec.m_Frame_Kristal[10]=t_Fr10;
									c_Gold_Aztec.m_Sm_T5=0;
									c_Gold_Aztec.m_Sm_T6=0;
									c_Gold_Aztec.m_Sm_T9=0;
									c_Gold_Aztec.m_Sm_T10=0;
								}
							}else{
								if(t_7==5){
									if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
										c_Gold_Aztec.m_Skor_Dvig=1;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
										c_Gold_Aztec.m_Skor_Dvig=2;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
										c_Gold_Aztec.m_Skor_Dvig=3;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
										c_Gold_Aztec.m_Skor_Dvig=4;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
										c_Gold_Aztec.m_Skor_Dvig=5;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
										c_Gold_Aztec.m_Skor_Dvig=6;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
										c_Gold_Aztec.m_Skor_Dvig=7;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
										c_Gold_Aztec.m_Skor_Dvig=8;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
										c_Gold_Aztec.m_Skor_Dvig=9;
									}
									if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
										c_Gold_Aztec.m_Skor_Dvig=10;
									}
									c_Gold_Aztec.m_TK_K6[0]=c_Gold_Aztec.m_TK_K6[0]+c_Gold_Aztec.m_Skor_Dvig;
									c_Gold_Aztec.m_TK_K7[1]=c_Gold_Aztec.m_TK_K7[1]+c_Gold_Aztec.m_Skor_Dvig;
									c_Gold_Aztec.m_TK_K10[1]=c_Gold_Aztec.m_TK_K10[1]-c_Gold_Aztec.m_Skor_Dvig;
									c_Gold_Aztec.m_TK_K11[0]=c_Gold_Aztec.m_TK_K11[0]-c_Gold_Aztec.m_Skor_Dvig;
									c_Gold_Aztec.m_Sm_T6=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
									c_Gold_Aztec.m_Sm_T7=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
									c_Gold_Aztec.m_Sm_T10=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
									c_Gold_Aztec.m_Sm_T11=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
									c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
									if(c_Gold_Aztec.m_Cikl_Anim>21){
										c_Gold_Aztec.m_Cikl_Anim=0;
										c_Gold_Aztec.m_Animacia=10;
										c_Gold_Aztec.m_TK_K6[0]=c_Gold_Aztec.m_EK_K6[0];
										c_Gold_Aztec.m_TK_K7[1]=c_Gold_Aztec.m_EK_K7[1];
										c_Gold_Aztec.m_TK_K10[1]=c_Gold_Aztec.m_EK_K10[1];
										c_Gold_Aztec.m_TK_K11[0]=c_Gold_Aztec.m_EK_K11[0];
										var t_El64=c_Gold_Aztec.m_Maska_Level_Kris[10];
										var t_El73=c_Gold_Aztec.m_Maska_Level_Kris[6];
										var t_El102=c_Gold_Aztec.m_Maska_Level_Kris[11];
										var t_El11=c_Gold_Aztec.m_Maska_Level_Kris[7];
										var t_Fr64=c_Gold_Aztec.m_Frame_Kristal[10];
										var t_Fr73=c_Gold_Aztec.m_Frame_Kristal[6];
										var t_Fr102=c_Gold_Aztec.m_Frame_Kristal[11];
										var t_Fr11=c_Gold_Aztec.m_Frame_Kristal[7];
										c_Gold_Aztec.m_Maska_Level_Kris[6]=t_El64;
										c_Gold_Aztec.m_Maska_Level_Kris[7]=t_El73;
										c_Gold_Aztec.m_Maska_Level_Kris[10]=t_El102;
										c_Gold_Aztec.m_Maska_Level_Kris[11]=t_El11;
										c_Gold_Aztec.m_Frame_Kristal[6]=t_Fr64;
										c_Gold_Aztec.m_Frame_Kristal[7]=t_Fr73;
										c_Gold_Aztec.m_Frame_Kristal[10]=t_Fr102;
										c_Gold_Aztec.m_Frame_Kristal[11]=t_Fr11;
										c_Gold_Aztec.m_Sm_T6=0;
										c_Gold_Aztec.m_Sm_T7=0;
										c_Gold_Aztec.m_Sm_T10=0;
										c_Gold_Aztec.m_Sm_T11=0;
									}
								}else{
									if(t_7==6){
										if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
											c_Gold_Aztec.m_Skor_Dvig=1;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
											c_Gold_Aztec.m_Skor_Dvig=2;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
											c_Gold_Aztec.m_Skor_Dvig=3;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
											c_Gold_Aztec.m_Skor_Dvig=4;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
											c_Gold_Aztec.m_Skor_Dvig=5;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
											c_Gold_Aztec.m_Skor_Dvig=6;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
											c_Gold_Aztec.m_Skor_Dvig=7;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
											c_Gold_Aztec.m_Skor_Dvig=8;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
											c_Gold_Aztec.m_Skor_Dvig=9;
										}
										if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
											c_Gold_Aztec.m_Skor_Dvig=10;
										}
										c_Gold_Aztec.m_TK_K7[0]=c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_Skor_Dvig;
										c_Gold_Aztec.m_TK_K8[1]=c_Gold_Aztec.m_TK_K8[1]+c_Gold_Aztec.m_Skor_Dvig;
										c_Gold_Aztec.m_TK_K11[1]=c_Gold_Aztec.m_TK_K11[1]-c_Gold_Aztec.m_Skor_Dvig;
										c_Gold_Aztec.m_TK_K12[0]=c_Gold_Aztec.m_TK_K12[0]-c_Gold_Aztec.m_Skor_Dvig;
										c_Gold_Aztec.m_Sm_T7=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
										c_Gold_Aztec.m_Sm_T8=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
										c_Gold_Aztec.m_Sm_T11=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
										c_Gold_Aztec.m_Sm_T12=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
										c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
										if(c_Gold_Aztec.m_Cikl_Anim>21){
											c_Gold_Aztec.m_Cikl_Anim=0;
											c_Gold_Aztec.m_Animacia=10;
											c_Gold_Aztec.m_TK_K7[0]=c_Gold_Aztec.m_EK_K7[0];
											c_Gold_Aztec.m_TK_K8[1]=c_Gold_Aztec.m_EK_K8[1];
											c_Gold_Aztec.m_TK_K11[1]=c_Gold_Aztec.m_EK_K11[1];
											c_Gold_Aztec.m_TK_K12[0]=c_Gold_Aztec.m_EK_K12[0];
											var t_El74=c_Gold_Aztec.m_Maska_Level_Kris[11];
											var t_El82=c_Gold_Aztec.m_Maska_Level_Kris[7];
											var t_El112=c_Gold_Aztec.m_Maska_Level_Kris[12];
											var t_El12=c_Gold_Aztec.m_Maska_Level_Kris[8];
											var t_Fr74=c_Gold_Aztec.m_Frame_Kristal[11];
											var t_Fr82=c_Gold_Aztec.m_Frame_Kristal[7];
											var t_Fr112=c_Gold_Aztec.m_Frame_Kristal[12];
											var t_Fr12=c_Gold_Aztec.m_Frame_Kristal[8];
											c_Gold_Aztec.m_Maska_Level_Kris[7]=t_El74;
											c_Gold_Aztec.m_Maska_Level_Kris[8]=t_El82;
											c_Gold_Aztec.m_Maska_Level_Kris[11]=t_El112;
											c_Gold_Aztec.m_Maska_Level_Kris[12]=t_El12;
											c_Gold_Aztec.m_Frame_Kristal[7]=t_Fr74;
											c_Gold_Aztec.m_Frame_Kristal[8]=t_Fr82;
											c_Gold_Aztec.m_Frame_Kristal[11]=t_Fr112;
											c_Gold_Aztec.m_Frame_Kristal[12]=t_Fr12;
											c_Gold_Aztec.m_Sm_T7=0;
											c_Gold_Aztec.m_Sm_T8=0;
											c_Gold_Aztec.m_Sm_T11=0;
											c_Gold_Aztec.m_Sm_T12=0;
										}
									}else{
										if(t_7==7){
											if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
												c_Gold_Aztec.m_Skor_Dvig=1;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
												c_Gold_Aztec.m_Skor_Dvig=2;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
												c_Gold_Aztec.m_Skor_Dvig=3;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
												c_Gold_Aztec.m_Skor_Dvig=4;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
												c_Gold_Aztec.m_Skor_Dvig=5;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
												c_Gold_Aztec.m_Skor_Dvig=6;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
												c_Gold_Aztec.m_Skor_Dvig=7;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
												c_Gold_Aztec.m_Skor_Dvig=8;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
												c_Gold_Aztec.m_Skor_Dvig=9;
											}
											if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
												c_Gold_Aztec.m_Skor_Dvig=10;
											}
											c_Gold_Aztec.m_TK_K9[0]=c_Gold_Aztec.m_TK_K9[0]+c_Gold_Aztec.m_Skor_Dvig;
											c_Gold_Aztec.m_TK_K10[1]=c_Gold_Aztec.m_TK_K10[1]+c_Gold_Aztec.m_Skor_Dvig;
											c_Gold_Aztec.m_TK_K13[1]=c_Gold_Aztec.m_TK_K13[1]-c_Gold_Aztec.m_Skor_Dvig;
											c_Gold_Aztec.m_TK_K14[0]=c_Gold_Aztec.m_TK_K14[0]-c_Gold_Aztec.m_Skor_Dvig;
											c_Gold_Aztec.m_Sm_T9=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
											c_Gold_Aztec.m_Sm_T10=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
											c_Gold_Aztec.m_Sm_T13=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
											c_Gold_Aztec.m_Sm_T14=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
											c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
											if(c_Gold_Aztec.m_Cikl_Anim>21){
												c_Gold_Aztec.m_Cikl_Anim=0;
												c_Gold_Aztec.m_Animacia=10;
												c_Gold_Aztec.m_TK_K9[0]=c_Gold_Aztec.m_EK_K9[0];
												c_Gold_Aztec.m_TK_K10[1]=c_Gold_Aztec.m_EK_K10[1];
												c_Gold_Aztec.m_TK_K13[1]=c_Gold_Aztec.m_EK_K13[1];
												c_Gold_Aztec.m_TK_K14[0]=c_Gold_Aztec.m_EK_K14[0];
												var t_El92=c_Gold_Aztec.m_Maska_Level_Kris[13];
												var t_El103=c_Gold_Aztec.m_Maska_Level_Kris[9];
												var t_El13=c_Gold_Aztec.m_Maska_Level_Kris[14];
												var t_El14=c_Gold_Aztec.m_Maska_Level_Kris[10];
												var t_Fr92=c_Gold_Aztec.m_Frame_Kristal[13];
												var t_Fr103=c_Gold_Aztec.m_Frame_Kristal[9];
												var t_Fr13=c_Gold_Aztec.m_Frame_Kristal[14];
												var t_Fr14=c_Gold_Aztec.m_Frame_Kristal[10];
												c_Gold_Aztec.m_Maska_Level_Kris[9]=t_El92;
												c_Gold_Aztec.m_Maska_Level_Kris[10]=t_El103;
												c_Gold_Aztec.m_Maska_Level_Kris[13]=t_El13;
												c_Gold_Aztec.m_Maska_Level_Kris[14]=t_El14;
												c_Gold_Aztec.m_Frame_Kristal[9]=t_Fr92;
												c_Gold_Aztec.m_Frame_Kristal[10]=t_Fr103;
												c_Gold_Aztec.m_Frame_Kristal[13]=t_Fr13;
												c_Gold_Aztec.m_Frame_Kristal[14]=t_Fr14;
												c_Gold_Aztec.m_Sm_T9=0;
												c_Gold_Aztec.m_Sm_T10=0;
												c_Gold_Aztec.m_Sm_T13=0;
												c_Gold_Aztec.m_Sm_T14=0;
											}
										}else{
											if(t_7==8){
												if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
													c_Gold_Aztec.m_Skor_Dvig=1;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
													c_Gold_Aztec.m_Skor_Dvig=2;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
													c_Gold_Aztec.m_Skor_Dvig=3;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
													c_Gold_Aztec.m_Skor_Dvig=4;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
													c_Gold_Aztec.m_Skor_Dvig=5;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
													c_Gold_Aztec.m_Skor_Dvig=6;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
													c_Gold_Aztec.m_Skor_Dvig=7;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
													c_Gold_Aztec.m_Skor_Dvig=8;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
													c_Gold_Aztec.m_Skor_Dvig=9;
												}
												if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
													c_Gold_Aztec.m_Skor_Dvig=10;
												}
												c_Gold_Aztec.m_TK_K10[0]=c_Gold_Aztec.m_TK_K10[0]+c_Gold_Aztec.m_Skor_Dvig;
												c_Gold_Aztec.m_TK_K11[1]=c_Gold_Aztec.m_TK_K11[1]+c_Gold_Aztec.m_Skor_Dvig;
												c_Gold_Aztec.m_TK_K14[1]=c_Gold_Aztec.m_TK_K14[1]-c_Gold_Aztec.m_Skor_Dvig;
												c_Gold_Aztec.m_TK_K15[0]=c_Gold_Aztec.m_TK_K15[0]-c_Gold_Aztec.m_Skor_Dvig;
												c_Gold_Aztec.m_Sm_T10=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
												c_Gold_Aztec.m_Sm_T11=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
												c_Gold_Aztec.m_Sm_T14=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
												c_Gold_Aztec.m_Sm_T15=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
												c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
												if(c_Gold_Aztec.m_Cikl_Anim>21){
													c_Gold_Aztec.m_Cikl_Anim=0;
													c_Gold_Aztec.m_Animacia=10;
													c_Gold_Aztec.m_TK_K10[0]=c_Gold_Aztec.m_EK_K10[0];
													c_Gold_Aztec.m_TK_K11[1]=c_Gold_Aztec.m_EK_K11[1];
													c_Gold_Aztec.m_TK_K14[1]=c_Gold_Aztec.m_EK_K14[1];
													c_Gold_Aztec.m_TK_K15[0]=c_Gold_Aztec.m_EK_K15[0];
													var t_El104=c_Gold_Aztec.m_Maska_Level_Kris[14];
													var t_El113=c_Gold_Aztec.m_Maska_Level_Kris[10];
													var t_El142=c_Gold_Aztec.m_Maska_Level_Kris[15];
													var t_El15=c_Gold_Aztec.m_Maska_Level_Kris[11];
													var t_Fr104=c_Gold_Aztec.m_Frame_Kristal[14];
													var t_Fr113=c_Gold_Aztec.m_Frame_Kristal[10];
													var t_Fr142=c_Gold_Aztec.m_Frame_Kristal[15];
													var t_Fr15=c_Gold_Aztec.m_Frame_Kristal[11];
													c_Gold_Aztec.m_Maska_Level_Kris[10]=t_El104;
													c_Gold_Aztec.m_Maska_Level_Kris[11]=t_El113;
													c_Gold_Aztec.m_Maska_Level_Kris[14]=t_El142;
													c_Gold_Aztec.m_Maska_Level_Kris[15]=t_El15;
													c_Gold_Aztec.m_Frame_Kristal[10]=t_Fr104;
													c_Gold_Aztec.m_Frame_Kristal[11]=t_Fr113;
													c_Gold_Aztec.m_Frame_Kristal[14]=t_Fr142;
													c_Gold_Aztec.m_Frame_Kristal[15]=t_Fr15;
													c_Gold_Aztec.m_Sm_T10=0;
													c_Gold_Aztec.m_Sm_T11=0;
													c_Gold_Aztec.m_Sm_T14=0;
													c_Gold_Aztec.m_Sm_T15=0;
												}
											}else{
												if(t_7==9){
													if(c_Gold_Aztec.m_Cikl_Anim==1 || c_Gold_Aztec.m_Cikl_Anim==21){
														c_Gold_Aztec.m_Skor_Dvig=1;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==2 || c_Gold_Aztec.m_Cikl_Anim==20){
														c_Gold_Aztec.m_Skor_Dvig=2;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==3 || c_Gold_Aztec.m_Cikl_Anim==19){
														c_Gold_Aztec.m_Skor_Dvig=3;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==4 || c_Gold_Aztec.m_Cikl_Anim==18){
														c_Gold_Aztec.m_Skor_Dvig=4;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==5 || c_Gold_Aztec.m_Cikl_Anim==17){
														c_Gold_Aztec.m_Skor_Dvig=5;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==6 || c_Gold_Aztec.m_Cikl_Anim==16){
														c_Gold_Aztec.m_Skor_Dvig=6;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==7 || c_Gold_Aztec.m_Cikl_Anim==15){
														c_Gold_Aztec.m_Skor_Dvig=7;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==8 || c_Gold_Aztec.m_Cikl_Anim==14){
														c_Gold_Aztec.m_Skor_Dvig=8;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==9 || c_Gold_Aztec.m_Cikl_Anim==13){
														c_Gold_Aztec.m_Skor_Dvig=9;
													}
													if(c_Gold_Aztec.m_Cikl_Anim==10 || c_Gold_Aztec.m_Cikl_Anim==11 || c_Gold_Aztec.m_Cikl_Anim==12){
														c_Gold_Aztec.m_Skor_Dvig=10;
													}
													c_Gold_Aztec.m_TK_K11[0]=c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_Skor_Dvig;
													c_Gold_Aztec.m_TK_K12[1]=c_Gold_Aztec.m_TK_K12[1]+c_Gold_Aztec.m_Skor_Dvig;
													c_Gold_Aztec.m_TK_K15[1]=c_Gold_Aztec.m_TK_K15[1]-c_Gold_Aztec.m_Skor_Dvig;
													c_Gold_Aztec.m_TK_K16[0]=c_Gold_Aztec.m_TK_K16[0]-c_Gold_Aztec.m_Skor_Dvig;
													c_Gold_Aztec.m_Sm_T11=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
													c_Gold_Aztec.m_Sm_T12=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
													c_Gold_Aztec.m_Sm_T15=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
													c_Gold_Aztec.m_Sm_T16=(((c_Gold_Aztec.m_Skor_Dvig)*1.5)|0);
													c_Gold_Aztec.m_Cikl_Anim=c_Gold_Aztec.m_Cikl_Anim+1;
													if(c_Gold_Aztec.m_Cikl_Anim>21){
														c_Gold_Aztec.m_Cikl_Anim=0;
														c_Gold_Aztec.m_Animacia=10;
														c_Gold_Aztec.m_TK_K11[0]=c_Gold_Aztec.m_EK_K11[0];
														c_Gold_Aztec.m_TK_K12[1]=c_Gold_Aztec.m_EK_K12[1];
														c_Gold_Aztec.m_TK_K15[1]=c_Gold_Aztec.m_EK_K15[1];
														c_Gold_Aztec.m_TK_K16[0]=c_Gold_Aztec.m_EK_K16[0];
														var t_El114=c_Gold_Aztec.m_Maska_Level_Kris[15];
														var t_El122=c_Gold_Aztec.m_Maska_Level_Kris[11];
														var t_El152=c_Gold_Aztec.m_Maska_Level_Kris[16];
														var t_El16=c_Gold_Aztec.m_Maska_Level_Kris[12];
														var t_Fr114=c_Gold_Aztec.m_Frame_Kristal[15];
														var t_Fr122=c_Gold_Aztec.m_Frame_Kristal[11];
														var t_Fr152=c_Gold_Aztec.m_Frame_Kristal[16];
														var t_Fr16=c_Gold_Aztec.m_Frame_Kristal[12];
														c_Gold_Aztec.m_Maska_Level_Kris[11]=t_El114;
														c_Gold_Aztec.m_Maska_Level_Kris[12]=t_El122;
														c_Gold_Aztec.m_Maska_Level_Kris[15]=t_El152;
														c_Gold_Aztec.m_Maska_Level_Kris[16]=t_El16;
														c_Gold_Aztec.m_Frame_Kristal[11]=t_Fr114;
														c_Gold_Aztec.m_Frame_Kristal[12]=t_Fr122;
														c_Gold_Aztec.m_Frame_Kristal[15]=t_Fr152;
														c_Gold_Aztec.m_Frame_Kristal[16]=t_Fr16;
														c_Gold_Aztec.m_Sm_T11=0;
														c_Gold_Aztec.m_Sm_T12=0;
														c_Gold_Aztec.m_Sm_T15=0;
														c_Gold_Aztec.m_Sm_T16=0;
													}
												}else{
													if(t_7==10){
														c_Gold_Aztec.m_Flag_Complete=1;
														for(var t_PR=1;t_PR<=16;t_PR=t_PR+1){
															if(c_Gold_Aztec.m_Maska_Level_Blok[t_PR]!=c_Gold_Aztec.m_Maska_Level_Kris[t_PR]){
																c_Gold_Aztec.m_Flag_Complete=0;
															}
														}
														if(c_Gold_Aztec.m_Flag_Complete==1){
															if(c_Gold_Aztec.m_Flag_Sound==1){
																bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Dveri,3,0);
															}
															if(c_Gold_Aztec.m_N_Level==c_Gold_Aztec.m_Max_Level){
																c_Gold_Aztec.m_Flag_Stena=1;
															}
															c_Gold_Aztec.m_Zagruzka_Level2();
															c_Gold_Aztec.m_SkX_Blok=0.01;
															c_Gold_Aztec.m_SmX_Blok=0;
															c_Gold_Aztec.m_MKor=0.6;
															c_Gold_Aztec.m_Frame_Sunduk=1;
															c_Gold_Aztec.m_Alpha_Sunduk=1.0;
															c_Gold_Aztec.m_Zad_Sunduk=0;
															c_Gold_Aztec.m_M_StarL[1]=0.0;
															c_Gold_Aztec.m_M_StarL[2]=0.0;
															c_Gold_Aztec.m_M_StarL[3]=0.0;
															c_Gold_Aztec.m_M_StarL[4]=0.0;
															c_Gold_Aztec.m_M_StarL[5]=0.0;
															c_Gold_Aztec.m_Zad_PV=0;
														}
														c_Gold_Aztec.m_Animacia=0;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}else{
			if(t_6==1){
				c_Gold_Aztec.m_SmX_Blok=(((c_Gold_Aztec.m_SmX_Blok)+c_Gold_Aztec.m_SkX_Blok)|0);
				if(c_Gold_Aztec.m_SkX_Blok<2.0){
					c_Gold_Aztec.m_SkX_Blok=c_Gold_Aztec.m_SkX_Blok*2.0;
				}
				if(c_Gold_Aztec.m_SmX_Blok>250){
					c_Gold_Aztec.m_Flag_Complete=2;
				}
			}else{
				if(t_6==2){
					var t_Pr5=0;
					var t_Pr25=0;
					var t_Pr50=0;
					var t_Pr75=0;
					t_Pr5=((c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]/20)|0);
					t_Pr25=((c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]/4)|0);
					t_Pr50=((c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]/2)|0);
					t_Pr75=(((c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level])/1.33)|0);
					if(c_Gold_Aztec.m_Schet>c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]*2){
						c_Gold_Aztec.m_Star_Level=0;
					}
					if(c_Gold_Aztec.m_Schet>c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]+t_Pr75 && c_Gold_Aztec.m_Schet<=c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]*2){
						c_Gold_Aztec.m_Star_Level=1;
					}
					if(c_Gold_Aztec.m_Schet>c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]+t_Pr50 && c_Gold_Aztec.m_Schet<=c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]+t_Pr75){
						c_Gold_Aztec.m_Star_Level=2;
					}
					if(c_Gold_Aztec.m_Schet>c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]+t_Pr25 && c_Gold_Aztec.m_Schet<=c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]+t_Pr50){
						c_Gold_Aztec.m_Star_Level=3;
					}
					if(c_Gold_Aztec.m_Schet>c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]+t_Pr5 && c_Gold_Aztec.m_Schet<=c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]+t_Pr25){
						c_Gold_Aztec.m_Star_Level=4;
					}
					if(c_Gold_Aztec.m_Schet<=c_Gold_Aztec.m_Hod5Star[c_Gold_Aztec.m_N_Level]+t_Pr5){
						c_Gold_Aztec.m_Star_Level=5;
					}
					if(c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_N_Level]<c_Gold_Aztec.m_Star_Level){
						c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_N_Level]=c_Gold_Aztec.m_Star_Level;
					}
					if(c_Gold_Aztec.m_Star_Level==0){
						c_Gold_Aztec.m_Score_Level=c_Gold_Aztec.m_N_Level*100-c_Gold_Aztec.m_Schet*20;
					}else{
						c_Gold_Aztec.m_Score_Level=c_Gold_Aztec.m_N_Level*100*c_Gold_Aztec.m_Star_Level-c_Gold_Aztec.m_Schet*20;
					}
					if(c_Gold_Aztec.m_Score_Level<=10){
						c_Gold_Aztec.m_Score_Level=((bb_random_Rnd2(1.0,11.0))|0);
						c_Gold_Aztec.m_Score_Level=c_Gold_Aztec.m_Score_Level*10;
					}
					if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_N_Level]<c_Gold_Aztec.m_Score_Level){
						c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_N_Level]=c_Gold_Aztec.m_Score_Level;
					}
					c_Gold_Aztec.m_SaveDan();
					c_Gold_Aztec.m_Flag_Complete=3;
					if(c_Gold_Aztec.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Scrip,8,0);
					}
				}else{
					if(t_6==3){
						c_Gold_Aztec.m_Zad_Sunduk=c_Gold_Aztec.m_Zad_Sunduk+1;
						if(c_Gold_Aztec.m_Zad_Sunduk>=2){
							c_Gold_Aztec.m_Frame_Sunduk=c_Gold_Aztec.m_Frame_Sunduk+1;
							c_Gold_Aztec.m_Zad_Sunduk=0;
						}
						if(c_Gold_Aztec.m_Frame_Sunduk>=16){
							c_Gold_Aztec.m_Frame_Sunduk=16;
							c_Gold_Aztec.m_Zad_PV=c_Gold_Aztec.m_Zad_PV+1;
							if(c_Gold_Aztec.m_Zad_PV>=30){
								c_Gold_Aztec.m_Zad_PV=0;
								c_Gold_Aztec.m_Flag_Complete=4;
							}
						}
					}else{
						if(t_6==4){
							if(c_Gold_Aztec.m_Star_Level>0 && c_Gold_Aztec.m_M_StarL[1]<1.0){
								c_Gold_Aztec.m_M_StarL[1]=c_Gold_Aztec.m_M_StarL[1]+0.07;
							}
							if(c_Gold_Aztec.m_M_StarL[1]>=1.0 && c_Gold_Aztec.m_Star_Level>1 && c_Gold_Aztec.m_M_StarL[2]<1.0){
								c_Gold_Aztec.m_M_StarL[2]=c_Gold_Aztec.m_M_StarL[2]+0.07;
							}
							if(c_Gold_Aztec.m_M_StarL[2]>=1.0 && c_Gold_Aztec.m_Star_Level>2 && c_Gold_Aztec.m_M_StarL[3]<1.0){
								c_Gold_Aztec.m_M_StarL[3]=c_Gold_Aztec.m_M_StarL[3]+0.07;
							}
							if(c_Gold_Aztec.m_M_StarL[3]>=1.0 && c_Gold_Aztec.m_Star_Level>3 && c_Gold_Aztec.m_M_StarL[4]<1.0){
								c_Gold_Aztec.m_M_StarL[4]=c_Gold_Aztec.m_M_StarL[4]+0.07;
							}
							if(c_Gold_Aztec.m_M_StarL[4]>=1.0 && c_Gold_Aztec.m_Star_Level>4 && c_Gold_Aztec.m_M_StarL[5]<1.0){
								c_Gold_Aztec.m_M_StarL[5]=c_Gold_Aztec.m_M_StarL[5]+0.07;
							}
							if(c_Gold_Aztec.m_M_StarL[1]==0.07 || c_Gold_Aztec.m_M_StarL[2]==0.07 || c_Gold_Aztec.m_M_StarL[3]==0.07 || c_Gold_Aztec.m_M_StarL[4]==0.07 || c_Gold_Aztec.m_M_StarL[5]==0.07){
								if(c_Gold_Aztec.m_Flag_Sound==1){
									bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Zvon,10,0);
								}
							}
							if(c_Gold_Aztec.m_M_StarL[c_Gold_Aztec.m_Star_Level]>=1.0 || c_Gold_Aztec.m_Star_Level==0){
								c_Gold_Aztec.m_Zad_PV=c_Gold_Aztec.m_Zad_PV+1;
								if(c_Gold_Aztec.m_Zad_PV>=40){
									c_Gold_Aztec.m_Zad_PV=0;
									c_Gold_Aztec.m_Flag_Complete=5;
								}
							}
						}else{
							if(t_6==5){
								for(var t_Co2=0;t_Co2<=5;t_Co2=t_Co2+1){
									if(bb_input_TouchHit(t_Co2)==1 && bb_input_TouchX(t_Co2)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co2)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co2)>190.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co2)<550.0*c_Gold_Aztec.m_RY_Ekr){
										c_Gold_Aztec.m_Flag_Complete=6;
										c_Gold_Aztec.m_Schet=0;
									}
								}
							}else{
								if(t_6==6){
									if(c_Gold_Aztec.m_Alpha_Sunduk>0.0){
										c_Gold_Aztec.m_Alpha_Sunduk=c_Gold_Aztec.m_Alpha_Sunduk-0.02;
										if(c_Gold_Aztec.m_Alpha_Sunduk<=0.0){
											if(c_Gold_Aztec.m_Flag_Sound==1){
												bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Shagi,9,0);
											}
											c_Gold_Aztec.m_Alpha_Sunduk=0.0;
										}
									}else{
										if(c_Gold_Aztec.m_MKor<1.0){
											c_Gold_Aztec.m_MKor=c_Gold_Aztec.m_MKor+0.002;
											if(c_Gold_Aztec.m_MKor>1.0){
												c_Gold_Aztec.m_MKor=1.0;
											}
										}
										if(c_Gold_Aztec.m_MKor==1.0){
											if(c_Gold_Aztec.m_N_Level<c_Gold_Aztec.m_Max_Level){
												c_Gold_Aztec.m_Flag_Complete=7;
											}else{
												c_Gold_Aztec.m_Flag_Complete=8;
												c_Gold_Aztec.m_Zagruzka_Level();
												for(var t_Zfa=1;t_Zfa<=16;t_Zfa=t_Zfa+1){
													c_Gold_Aztec.m_Frame_Kristal[t_Zfa]=c_Gold_Aztec.m_Frame_Kristal2[t_Zfa];
												}
												c_Gold_Aztec.m_SmX_Blok=0;
											}
										}
									}
								}else{
									if(t_6==7){
										c_Gold_Aztec.m_N_Level=c_Gold_Aztec.m_N_Level+1;
										c_Gold_Aztec.m_Zagruzka_Level();
										for(var t_Zfa2=1;t_Zfa2<=16;t_Zfa2=t_Zfa2+1){
											c_Gold_Aztec.m_Frame_Kristal[t_Zfa2]=c_Gold_Aztec.m_Frame_Kristal2[t_Zfa2];
										}
										c_Gold_Aztec.m_SmX_Blok=0;
										c_Gold_Aztec.m_Flag_Complete=0;
									}else{
										if(t_6==8){
											for(var t_Co3=0;t_Co3<=5;t_Co3=t_Co3+1){
												if(bb_input_TouchHit(t_Co3)==1 && bb_input_TouchX(t_Co3)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co3)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co3)>0.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co3)<550.0*c_Gold_Aztec.m_RY_Ekr){
													if(c_Gold_Aztec.m_Flag_Sound==1){
														bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga2,6,0);
													}
													c_Gold_Aztec.m_N_List=((Math.floor(((c_Gold_Aztec.m_N_Level+3)/4)|0))|0);
													c_Gold_Aztec.m_Viz_Level[1]=c_Gold_Aztec.m_N_List*4-3;
													c_Gold_Aztec.m_Viz_Level[2]=c_Gold_Aztec.m_N_List*4-2;
													c_Gold_Aztec.m_Viz_Level[3]=c_Gold_Aztec.m_N_List*4-1;
													c_Gold_Aztec.m_Viz_Level[4]=c_Gold_Aztec.m_N_List*4;
													c_Gold_Aztec.m_Viz_Score[1]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[1]];
													c_Gold_Aztec.m_Viz_Score[2]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[2]];
													c_Gold_Aztec.m_Viz_Score[3]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[3]];
													c_Gold_Aztec.m_Viz_Score[4]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[4]];
													c_Gold_Aztec.m_Viz_Star[1]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[1]];
													c_Gold_Aztec.m_Viz_Star[2]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[2]];
													c_Gold_Aztec.m_Viz_Star[3]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[3]];
													c_Gold_Aztec.m_Viz_Star[4]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[4]];
													c_Gold_Aztec.m_Flag_Dostup[1]=1;
													c_Gold_Aztec.m_Flag_Dostup[2]=1;
													c_Gold_Aztec.m_Flag_Dostup[3]=1;
													c_Gold_Aztec.m_Flag_Dostup[4]=1;
													if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[1]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[1]]==0){
														c_Gold_Aztec.m_Flag_Dostup[1]=0;
													}
													if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[2]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[2]]==0){
														c_Gold_Aztec.m_Flag_Dostup[2]=0;
													}
													if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[3]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[3]]==0){
														c_Gold_Aztec.m_Flag_Dostup[3]=0;
													}
													if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[4]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[4]]==0){
														c_Gold_Aztec.m_Flag_Dostup[4]=0;
													}
													c_Gold_Aztec.m_Regim=6;
												}
											}
											if(((bb_input_KeyHit(27))!=0) && c_Gold_Aztec.m_Animacia==0){
												if(c_Gold_Aztec.m_Flag_Sound==1){
													bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
												}
												c_Gold_Aztec.m_Pauza=1;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}else{
		for(var t_Co4=0;t_Co4<=5;t_Co4=t_Co4+1){
			if(bb_input_TouchHit(t_Co4)==1 && bb_input_TouchX(t_Co4)>20.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co4)<220.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co4)>300.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co4)<410.0*c_Gold_Aztec.m_RY_Ekr){
				if(c_Gold_Aztec.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
				}
				c_Gold_Aztec.m_Regim=5;
				c_Gold_Aztec.m_Pauza=0;
				c_Gold_Aztec.m_Proz_Screen=0.0;
				c_Gold_Aztec.m_Y_Meny=605;
			}
			if(bb_input_TouchHit(t_Co4)==1 && bb_input_TouchX(t_Co4)>260.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co4)<460.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co4)>300.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co4)<410.0*c_Gold_Aztec.m_RY_Ekr){
				if(c_Gold_Aztec.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
				}
				c_Gold_Aztec.m_Pauza=0;
			}
		}
		if(((bb_input_KeyHit(27))!=0) && c_Gold_Aztec.m_Animacia==0){
			if(c_Gold_Aztec.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
			}
			c_Gold_Aztec.m_Pauza=0;
		}
	}
	for(var t_Cfk=1;t_Cfk<=16;t_Cfk=t_Cfk+1){
		if(c_Gold_Aztec.m_Maska_Level_Blok[t_Cfk]==c_Gold_Aztec.m_Maska_Level_Kris[t_Cfk]){
			c_Gold_Aztec.m_Frame_Kristal[t_Cfk]=c_Gold_Aztec.m_Frame_Kristal[t_Cfk]+1;
			if(c_Gold_Aztec.m_Frame_Kristal[t_Cfk]>19){
				c_Gold_Aztec.m_Frame_Kristal[t_Cfk]=0;
			}
		}
	}
	if(c_Gold_Aztec.m_Flag_Complete>0){
		for(var t_Cfk2=1;t_Cfk2<=16;t_Cfk2=t_Cfk2+1){
			if(c_Gold_Aztec.m_Maska_Level_Blok2[t_Cfk2]==c_Gold_Aztec.m_Maska_Level_Kris2[t_Cfk2]){
				c_Gold_Aztec.m_Frame_Kristal2[t_Cfk2]=c_Gold_Aztec.m_Frame_Kristal2[t_Cfk2]+1;
				if(c_Gold_Aztec.m_Frame_Kristal2[t_Cfk2]>19){
					c_Gold_Aztec.m_Frame_Kristal2[t_Cfk2]=0;
				}
			}
		}
	}
	c_Gold_Aztec.m_Zad_Fire=c_Gold_Aztec.m_Zad_Fire+1;
	if(c_Gold_Aztec.m_Zad_Fire>1){
		c_Gold_Aztec.m_Zad_Fire=0;
		c_Gold_Aztec.m_Frame_FireL=c_Gold_Aztec.m_Frame_FireL+1;
		c_Gold_Aztec.m_Frame_FireP=c_Gold_Aztec.m_Frame_FireP+1;
	}
	if(c_Gold_Aztec.m_Frame_FireL>15){
		c_Gold_Aztec.m_Frame_FireL=0;
	}
	if(c_Gold_Aztec.m_Frame_FireP>15){
		c_Gold_Aztec.m_Frame_FireP=0;
	}
	return 0;
}
c_Gold_Aztec.m_Update_Smena_Game_GlMeny=function(){
	c_Gold_Aztec.m_Proz_Screen=c_Gold_Aztec.m_Proz_Screen+0.025;
	if(c_Gold_Aztec.m_Proz_Screen>=1.0){
		c_Gold_Aztec.m_Proz_Screen=1.0;
		c_Gold_Aztec.m_Regim=2;
		c_Gold_Aztec.m_Flag_Stena=0;
	}
	c_Gold_Aztec.m_Zad_Fire=c_Gold_Aztec.m_Zad_Fire+1;
	if(c_Gold_Aztec.m_Zad_Fire>1){
		c_Gold_Aztec.m_Zad_Fire=0;
		c_Gold_Aztec.m_Frame_FireL=c_Gold_Aztec.m_Frame_FireL+1;
		c_Gold_Aztec.m_Frame_FireP=c_Gold_Aztec.m_Frame_FireP+1;
	}
	if(c_Gold_Aztec.m_Frame_FireL>15){
		c_Gold_Aztec.m_Frame_FireL=0;
	}
	if(c_Gold_Aztec.m_Frame_FireP>15){
		c_Gold_Aztec.m_Frame_FireP=0;
	}
	return 0;
}
c_Gold_Aztec.m_Y_List=0;
c_Gold_Aztec.m_V_Level=0;
c_Gold_Aztec.m_Frame_RulonKN=0;
c_Gold_Aztec.m_Update_Smena_Game_Level=function(){
	if(c_Gold_Aztec.m_Y_RulonV<0){
		c_Gold_Aztec.m_Y_RulonV=c_Gold_Aztec.m_Y_RulonV+15;
	}
	if(c_Gold_Aztec.m_Y_RulonV>=0){
		c_Gold_Aztec.m_Y_RulonV=0;
	}
	c_Gold_Aztec.m_Y_List=c_Gold_Aztec.m_Y_RulonV+57;
	if(c_Gold_Aztec.m_Y_RulonN<490){
		c_Gold_Aztec.m_Y_RulonN=c_Gold_Aztec.m_Y_RulonN+15;
	}
	if(c_Gold_Aztec.m_Y_RulonN>=490){
		c_Gold_Aztec.m_Y_RulonN=490;
		c_Gold_Aztec.m_V_Level=0;
		c_Gold_Aztec.m_Regim=7;
	}
	c_Gold_Aztec.m_Frame_RulonKN=c_Gold_Aztec.m_Frame_RulonKN-1;
	if(c_Gold_Aztec.m_Frame_RulonKN<0){
		c_Gold_Aztec.m_Frame_RulonKN=9;
	}
	for(var t_Cfk=1;t_Cfk<=16;t_Cfk=t_Cfk+1){
		if(c_Gold_Aztec.m_Maska_Level_Blok[t_Cfk]==c_Gold_Aztec.m_Maska_Level_Kris[t_Cfk]){
			c_Gold_Aztec.m_Frame_Kristal[t_Cfk]=c_Gold_Aztec.m_Frame_Kristal[t_Cfk]+1;
			if(c_Gold_Aztec.m_Frame_Kristal[t_Cfk]>19){
				c_Gold_Aztec.m_Frame_Kristal[t_Cfk]=0;
			}
		}
	}
	c_Gold_Aztec.m_Zad_Fire=c_Gold_Aztec.m_Zad_Fire+1;
	if(c_Gold_Aztec.m_Zad_Fire>1){
		c_Gold_Aztec.m_Zad_Fire=0;
		c_Gold_Aztec.m_Frame_FireL=c_Gold_Aztec.m_Frame_FireL+1;
		c_Gold_Aztec.m_Frame_FireP=c_Gold_Aztec.m_Frame_FireP+1;
	}
	if(c_Gold_Aztec.m_Frame_FireL>15){
		c_Gold_Aztec.m_Frame_FireL=0;
	}
	if(c_Gold_Aztec.m_Frame_FireP>15){
		c_Gold_Aztec.m_Frame_FireP=0;
	}
	return 0;
}
c_Gold_Aztec.m_X_Ukaz=0;
c_Gold_Aztec.m_Y_Ukaz=0;
c_Gold_Aztec.m_Frame_Ukaz=0;
c_Gold_Aztec.m_Frame_RulonKV=0;
c_Gold_Aztec.m_Update_Level=function(){
	for(var t_Co=0;t_Co<=5;t_Co=t_Co+1){
		if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>250.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>425.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<490.0*c_Gold_Aztec.m_RY_Ekr && c_Gold_Aztec.m_Flag_Listanie==0 && c_Gold_Aztec.m_V_Level>0){
			if(c_Gold_Aztec.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga2,6,0);
			}
			c_Gold_Aztec.m_Schet=0;
			c_Gold_Aztec.m_Flag_Stena=0;
			c_Gold_Aztec.m_Flag_Complete=0;
			c_Gold_Aztec.m_Regim=8;
			c_Gold_Aztec.m_X_Ukaz=0;
			c_Gold_Aztec.m_Y_Ukaz=0;
			c_Gold_Aztec.m_N_Level=c_Gold_Aztec.m_V_Level;
			c_Gold_Aztec.m_Zagruzka_Level();
		}
		if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<230.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>425.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<490.0*c_Gold_Aztec.m_RY_Ekr && c_Gold_Aztec.m_Flag_Listanie==0){
			if(c_Gold_Aztec.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga2,6,0);
			}
			c_Gold_Aztec.m_Regim=8;
			c_Gold_Aztec.m_X_Ukaz=0;
			c_Gold_Aztec.m_Y_Ukaz=0;
			c_Gold_Aztec.m_V_Level=0;
		}
		if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>0.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<65.0*c_Gold_Aztec.m_RY_Ekr && c_Gold_Aztec.m_Flag_Listanie==0){
			if(c_Gold_Aztec.m_N_List>1){
				if(c_Gold_Aztec.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga2,6,0);
				}
				c_Gold_Aztec.m_Flag_Listanie=2;
				c_Gold_Aztec.m_Viz_Level[5]=(c_Gold_Aztec.m_N_List-1)*4-3;
				c_Gold_Aztec.m_Viz_Level[6]=(c_Gold_Aztec.m_N_List-1)*4-2;
				c_Gold_Aztec.m_Viz_Level[7]=(c_Gold_Aztec.m_N_List-1)*4-1;
				c_Gold_Aztec.m_Viz_Level[8]=(c_Gold_Aztec.m_N_List-1)*4;
				c_Gold_Aztec.m_Viz_Score[5]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[5]];
				c_Gold_Aztec.m_Viz_Score[6]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[6]];
				c_Gold_Aztec.m_Viz_Score[7]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[7]];
				c_Gold_Aztec.m_Viz_Score[8]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[8]];
				c_Gold_Aztec.m_Viz_Star[5]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[5]];
				c_Gold_Aztec.m_Viz_Star[6]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[6]];
				c_Gold_Aztec.m_Viz_Star[7]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[7]];
				c_Gold_Aztec.m_Viz_Star[8]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[8]];
				c_Gold_Aztec.m_Flag_Dostup[5]=1;
				c_Gold_Aztec.m_Flag_Dostup[6]=1;
				c_Gold_Aztec.m_Flag_Dostup[7]=1;
				c_Gold_Aztec.m_Flag_Dostup[8]=1;
				if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[5]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[5]]==0){
					c_Gold_Aztec.m_Flag_Dostup[5]=0;
				}
				if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[6]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[6]]==0){
					c_Gold_Aztec.m_Flag_Dostup[6]=0;
				}
				if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[7]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[7]]==0){
					c_Gold_Aztec.m_Flag_Dostup[7]=0;
				}
				if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[8]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[8]]==0){
					c_Gold_Aztec.m_Flag_Dostup[8]=0;
				}
				c_Gold_Aztec.m_X_Ukaz=0;
				c_Gold_Aztec.m_Y_Ukaz=0;
			}
		}
		if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>0.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<480.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>490.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<555.0*c_Gold_Aztec.m_RY_Ekr && c_Gold_Aztec.m_Flag_Listanie==0){
			if(c_Gold_Aztec.m_N_List<((c_Gold_Aztec.m_Max_Level/4)|0)){
				if(c_Gold_Aztec.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Bumaga2,6,0);
				}
				c_Gold_Aztec.m_Flag_Listanie=1;
				c_Gold_Aztec.m_Viz_Level[5]=(c_Gold_Aztec.m_N_List+1)*4-3;
				c_Gold_Aztec.m_Viz_Level[6]=(c_Gold_Aztec.m_N_List+1)*4-2;
				c_Gold_Aztec.m_Viz_Level[7]=(c_Gold_Aztec.m_N_List+1)*4-1;
				c_Gold_Aztec.m_Viz_Level[8]=(c_Gold_Aztec.m_N_List+1)*4;
				c_Gold_Aztec.m_Viz_Score[5]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[5]];
				c_Gold_Aztec.m_Viz_Score[6]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[6]];
				c_Gold_Aztec.m_Viz_Score[7]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[7]];
				c_Gold_Aztec.m_Viz_Score[8]=c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[8]];
				c_Gold_Aztec.m_Viz_Star[5]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[5]];
				c_Gold_Aztec.m_Viz_Star[6]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[6]];
				c_Gold_Aztec.m_Viz_Star[7]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[7]];
				c_Gold_Aztec.m_Viz_Star[8]=c_Gold_Aztec.m_HighStar[c_Gold_Aztec.m_Viz_Level[8]];
				c_Gold_Aztec.m_Flag_Dostup[5]=1;
				c_Gold_Aztec.m_Flag_Dostup[6]=1;
				c_Gold_Aztec.m_Flag_Dostup[7]=1;
				c_Gold_Aztec.m_Flag_Dostup[8]=1;
				if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[5]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[5]]==0){
					c_Gold_Aztec.m_Flag_Dostup[5]=0;
				}
				if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[6]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[6]]==0){
					c_Gold_Aztec.m_Flag_Dostup[6]=0;
				}
				if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[7]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[7]]==0){
					c_Gold_Aztec.m_Flag_Dostup[7]=0;
				}
				if(c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[8]-1]==0 && c_Gold_Aztec.m_HighScore[c_Gold_Aztec.m_Viz_Level[8]]==0){
					c_Gold_Aztec.m_Flag_Dostup[8]=0;
				}
				c_Gold_Aztec.m_X_Ukaz=0;
				c_Gold_Aztec.m_Y_Ukaz=0;
			}
		}
		if(c_Gold_Aztec.m_Flag_Dostup[1]==1 && bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>28.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<230.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>105.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<237.0*c_Gold_Aztec.m_RY_Ekr && c_Gold_Aztec.m_Flag_Listanie==0){
			if(c_Gold_Aztec.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
			}
			c_Gold_Aztec.m_X_Ukaz=28;
			c_Gold_Aztec.m_Y_Ukaz=106;
			c_Gold_Aztec.m_V_Level=c_Gold_Aztec.m_Viz_Level[1];
		}
		if(c_Gold_Aztec.m_Flag_Dostup[2]==1 && bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>249.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<451.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>105.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<237.0*c_Gold_Aztec.m_RY_Ekr && c_Gold_Aztec.m_Flag_Listanie==0){
			if(c_Gold_Aztec.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
			}
			c_Gold_Aztec.m_X_Ukaz=249;
			c_Gold_Aztec.m_Y_Ukaz=106;
			c_Gold_Aztec.m_V_Level=c_Gold_Aztec.m_Viz_Level[2];
		}
		if(c_Gold_Aztec.m_Flag_Dostup[3]==1 && bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>28.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<230.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>286.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<418.0*c_Gold_Aztec.m_RY_Ekr && c_Gold_Aztec.m_Flag_Listanie==0){
			if(c_Gold_Aztec.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
			}
			c_Gold_Aztec.m_X_Ukaz=28;
			c_Gold_Aztec.m_Y_Ukaz=287;
			c_Gold_Aztec.m_V_Level=c_Gold_Aztec.m_Viz_Level[3];
		}
		if(c_Gold_Aztec.m_Flag_Dostup[4]==1 && bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>249.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchX(t_Co)<451.0*c_Gold_Aztec.m_RX_Ekr && bb_input_TouchY(t_Co)>286.0*c_Gold_Aztec.m_RY_Ekr && bb_input_TouchY(t_Co)<418.0*c_Gold_Aztec.m_RY_Ekr && c_Gold_Aztec.m_Flag_Listanie==0){
			if(c_Gold_Aztec.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Gold_Aztec.m_Zv_Click2,7,0);
			}
			c_Gold_Aztec.m_X_Ukaz=249;
			c_Gold_Aztec.m_Y_Ukaz=287;
			c_Gold_Aztec.m_V_Level=c_Gold_Aztec.m_Viz_Level[4];
		}
	}
	c_Gold_Aztec.m_Frame_Ukaz=c_Gold_Aztec.m_Frame_Ukaz+1;
	if(c_Gold_Aztec.m_Frame_Ukaz>11){
		c_Gold_Aztec.m_Frame_Ukaz=0;
	}
	var t_8=c_Gold_Aztec.m_Flag_Listanie;
	if(t_8==1){
		c_Gold_Aztec.m_Frame_RulonKV=c_Gold_Aztec.m_Frame_RulonKV-1;
		if(c_Gold_Aztec.m_Frame_RulonKV<0){
			c_Gold_Aztec.m_Frame_RulonKV=9;
		}
		c_Gold_Aztec.m_Frame_RulonKN=c_Gold_Aztec.m_Frame_RulonKN-1;
		if(c_Gold_Aztec.m_Frame_RulonKN<0){
			c_Gold_Aztec.m_Frame_RulonKN=9;
		}
		c_Gold_Aztec.m_Y_List=c_Gold_Aztec.m_Y_List-15;
		if(c_Gold_Aztec.m_Y_List<=-383){
			c_Gold_Aztec.m_Y_List=57;
			c_Gold_Aztec.m_Flag_Listanie=0;
			c_Gold_Aztec.m_N_List=c_Gold_Aztec.m_N_List+1;
			c_Gold_Aztec.m_Viz_Level[1]=c_Gold_Aztec.m_Viz_Level[5];
			c_Gold_Aztec.m_Viz_Level[2]=c_Gold_Aztec.m_Viz_Level[6];
			c_Gold_Aztec.m_Viz_Level[3]=c_Gold_Aztec.m_Viz_Level[7];
			c_Gold_Aztec.m_Viz_Level[4]=c_Gold_Aztec.m_Viz_Level[8];
			c_Gold_Aztec.m_Viz_Score[1]=c_Gold_Aztec.m_Viz_Score[5];
			c_Gold_Aztec.m_Viz_Score[2]=c_Gold_Aztec.m_Viz_Score[6];
			c_Gold_Aztec.m_Viz_Score[3]=c_Gold_Aztec.m_Viz_Score[7];
			c_Gold_Aztec.m_Viz_Score[4]=c_Gold_Aztec.m_Viz_Score[8];
			c_Gold_Aztec.m_Viz_Star[1]=c_Gold_Aztec.m_Viz_Star[5];
			c_Gold_Aztec.m_Viz_Star[2]=c_Gold_Aztec.m_Viz_Star[6];
			c_Gold_Aztec.m_Viz_Star[3]=c_Gold_Aztec.m_Viz_Star[7];
			c_Gold_Aztec.m_Viz_Star[4]=c_Gold_Aztec.m_Viz_Star[8];
			c_Gold_Aztec.m_Flag_Dostup[1]=c_Gold_Aztec.m_Flag_Dostup[5];
			c_Gold_Aztec.m_Flag_Dostup[2]=c_Gold_Aztec.m_Flag_Dostup[6];
			c_Gold_Aztec.m_Flag_Dostup[3]=c_Gold_Aztec.m_Flag_Dostup[7];
			c_Gold_Aztec.m_Flag_Dostup[4]=c_Gold_Aztec.m_Flag_Dostup[8];
		}
	}else{
		if(t_8==2){
			c_Gold_Aztec.m_Frame_RulonKV=c_Gold_Aztec.m_Frame_RulonKV+1;
			if(c_Gold_Aztec.m_Frame_RulonKV>9){
				c_Gold_Aztec.m_Frame_RulonKV=0;
			}
			c_Gold_Aztec.m_Frame_RulonKN=c_Gold_Aztec.m_Frame_RulonKN+1;
			if(c_Gold_Aztec.m_Frame_RulonKN>9){
				c_Gold_Aztec.m_Frame_RulonKN=0;
			}
			c_Gold_Aztec.m_Y_List=c_Gold_Aztec.m_Y_List+15;
			if(c_Gold_Aztec.m_Y_List>=497){
				c_Gold_Aztec.m_Y_List=57;
				c_Gold_Aztec.m_Flag_Listanie=0;
				c_Gold_Aztec.m_N_List=c_Gold_Aztec.m_N_List-1;
				c_Gold_Aztec.m_Viz_Level[1]=c_Gold_Aztec.m_Viz_Level[5];
				c_Gold_Aztec.m_Viz_Level[2]=c_Gold_Aztec.m_Viz_Level[6];
				c_Gold_Aztec.m_Viz_Level[3]=c_Gold_Aztec.m_Viz_Level[7];
				c_Gold_Aztec.m_Viz_Level[4]=c_Gold_Aztec.m_Viz_Level[8];
				c_Gold_Aztec.m_Viz_Score[1]=c_Gold_Aztec.m_Viz_Score[5];
				c_Gold_Aztec.m_Viz_Score[2]=c_Gold_Aztec.m_Viz_Score[6];
				c_Gold_Aztec.m_Viz_Score[3]=c_Gold_Aztec.m_Viz_Score[7];
				c_Gold_Aztec.m_Viz_Score[4]=c_Gold_Aztec.m_Viz_Score[8];
				c_Gold_Aztec.m_Viz_Star[1]=c_Gold_Aztec.m_Viz_Star[5];
				c_Gold_Aztec.m_Viz_Star[2]=c_Gold_Aztec.m_Viz_Star[6];
				c_Gold_Aztec.m_Viz_Star[3]=c_Gold_Aztec.m_Viz_Star[7];
				c_Gold_Aztec.m_Viz_Star[4]=c_Gold_Aztec.m_Viz_Star[8];
				c_Gold_Aztec.m_Flag_Dostup[1]=c_Gold_Aztec.m_Flag_Dostup[5];
				c_Gold_Aztec.m_Flag_Dostup[2]=c_Gold_Aztec.m_Flag_Dostup[6];
				c_Gold_Aztec.m_Flag_Dostup[3]=c_Gold_Aztec.m_Flag_Dostup[7];
				c_Gold_Aztec.m_Flag_Dostup[4]=c_Gold_Aztec.m_Flag_Dostup[8];
			}
		}
	}
	c_Gold_Aztec.m_Zad_Fire=c_Gold_Aztec.m_Zad_Fire+1;
	if(c_Gold_Aztec.m_Zad_Fire>1){
		c_Gold_Aztec.m_Zad_Fire=0;
		c_Gold_Aztec.m_Frame_FireL=c_Gold_Aztec.m_Frame_FireL+1;
		c_Gold_Aztec.m_Frame_FireP=c_Gold_Aztec.m_Frame_FireP+1;
	}
	if(c_Gold_Aztec.m_Frame_FireL>15){
		c_Gold_Aztec.m_Frame_FireL=0;
	}
	if(c_Gold_Aztec.m_Frame_FireP>15){
		c_Gold_Aztec.m_Frame_FireP=0;
	}
	return 0;
}
c_Gold_Aztec.m_Update_Smena_Level_Game=function(){
	if(c_Gold_Aztec.m_Y_RulonN>0){
		c_Gold_Aztec.m_Y_RulonN=c_Gold_Aztec.m_Y_RulonN-15;
	}
	if(c_Gold_Aztec.m_Y_RulonV>-70 && c_Gold_Aztec.m_Y_RulonN<70){
		c_Gold_Aztec.m_Y_RulonV=c_Gold_Aztec.m_Y_RulonV-15;
	}
	if(c_Gold_Aztec.m_Y_RulonV<=-70){
		c_Gold_Aztec.m_Y_RulonV=-70;
	}
	c_Gold_Aztec.m_Y_List=c_Gold_Aztec.m_Y_RulonV+57;
	if(c_Gold_Aztec.m_Y_RulonN<=0){
		c_Gold_Aztec.m_Y_RulonV=-70;
		c_Gold_Aztec.m_Y_RulonN=0;
		c_Gold_Aztec.m_Regim=4;
	}
	c_Gold_Aztec.m_Frame_RulonKN=c_Gold_Aztec.m_Frame_RulonKN+1;
	if(c_Gold_Aztec.m_Frame_RulonKN>9){
		c_Gold_Aztec.m_Frame_RulonKN=0;
	}
	for(var t_Cfk=1;t_Cfk<=16;t_Cfk=t_Cfk+1){
		if(c_Gold_Aztec.m_Maska_Level_Blok[t_Cfk]==c_Gold_Aztec.m_Maska_Level_Kris[t_Cfk]){
			c_Gold_Aztec.m_Frame_Kristal[t_Cfk]=c_Gold_Aztec.m_Frame_Kristal[t_Cfk]+1;
			if(c_Gold_Aztec.m_Frame_Kristal[t_Cfk]>19){
				c_Gold_Aztec.m_Frame_Kristal[t_Cfk]=0;
			}
		}
	}
	c_Gold_Aztec.m_Zad_Fire=c_Gold_Aztec.m_Zad_Fire+1;
	if(c_Gold_Aztec.m_Zad_Fire>1){
		c_Gold_Aztec.m_Zad_Fire=0;
		c_Gold_Aztec.m_Frame_FireL=c_Gold_Aztec.m_Frame_FireL+1;
		c_Gold_Aztec.m_Frame_FireP=c_Gold_Aztec.m_Frame_FireP+1;
	}
	if(c_Gold_Aztec.m_Frame_FireL>15){
		c_Gold_Aztec.m_Frame_FireL=0;
	}
	if(c_Gold_Aztec.m_Frame_FireP>15){
		c_Gold_Aztec.m_Frame_FireP=0;
	}
	return 0;
}
c_Gold_Aztec.prototype.p_OnUpdate=function(){
	var t_1=c_Gold_Aztec.m_Regim;
	if(t_1==0){
		c_Gold_Aztec.m_Update_Zastavka();
	}else{
		if(t_1==1){
			c_Gold_Aztec.m_Update_Smena_Zastavka_GlMeny();
		}else{
			if(t_1==2){
				c_Gold_Aztec.m_Update_GlMeny();
			}else{
				if(t_1==3){
					c_Gold_Aztec.m_Update_Smena_GlMeny_Game();
				}else{
					if(t_1==4){
						c_Gold_Aztec.m_Update_Game();
					}else{
						if(t_1==5){
							c_Gold_Aztec.m_Update_Smena_Game_GlMeny();
						}else{
							if(t_1==6){
								c_Gold_Aztec.m_Update_Smena_Game_Level();
							}else{
								if(t_1==7){
									c_Gold_Aztec.m_Update_Level();
								}else{
									if(t_1==8){
										c_Gold_Aztec.m_Update_Smena_Level_Game();
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
c_Gold_Aztec.m_Im_OknoVerh=null;
c_Gold_Aztec.m_Im_VerhMask=null;
c_Gold_Aztec.m_Im_OknoNiz=null;
c_Gold_Aztec.m_Im_SoundOn=null;
c_Gold_Aztec.m_Im_MusicOn=null;
c_Gold_Aztec.m_Im_BlokMeny=null;
c_Gold_Aztec.m_Im_Star=[];
c_Gold_Aztec.m_Im_Stena=null;
c_Gold_Aztec.m_Im_Blok=[];
c_Gold_Aztec.m_Im_Kristal_1=[];
c_Gold_Aztec.m_Im_Kristal_2=[];
c_Gold_Aztec.m_Im_Kristal_3=[];
c_Gold_Aztec.m_Im_Kristal_4=[];
c_Gold_Aztec.m_Im_Kristal_5=[];
c_Gold_Aztec.m_Im_Kristal_6=[];
c_Gold_Aztec.m_Im_CifraB=[];
c_Gold_Aztec.m_Im_ListHelp=null;
c_Gold_Aztec.m_Im_Rulon=[];
c_Gold_Aztec.m_Im_ListKarta=null;
c_Gold_Aztec.m_Im_TBack=null;
c_Gold_Aztec.m_Im_MapL=null;
c_Gold_Aztec.m_Im_Up=null;
c_Gold_Aztec.m_Im_Down=null;
c_Gold_Aztec.m_Im_CifraL=[];
c_Gold_Aztec.m_Im_CifraR=[];
c_Gold_Aztec.m_Im_Close=null;
c_Gold_Aztec.m_Im_Koridor=null;
c_Gold_Aztec.m_Im_KromkaL=null;
c_Gold_Aztec.m_Im_KromkaP=null;
c_Gold_Aztec.m_Im_Fire=[];
c_Gold_Aztec.m_Im_Ukaz=[];
c_Gold_Aztec.m_Im_TKristal_1=null;
c_Gold_Aztec.m_Im_TKristal_2=null;
c_Gold_Aztec.m_Im_TKristal_3=null;
c_Gold_Aztec.m_Im_TKristal_4=null;
c_Gold_Aztec.m_Im_TKristal_5=null;
c_Gold_Aztec.m_Im_TKristal_6=null;
c_Gold_Aztec.m_Im_BlikF=null;
c_Gold_Aztec.m_Im_FireF=[];
c_Gold_Aztec.m_Im_BlikF2=null;
c_Gold_Aztec.m_Im_GoldBlik=[];
c_Gold_Aztec.m_Im_CifraS=[];
c_Gold_Aztec.m_Im_Sunduk=[];
c_Gold_Aztec.m_Im_Tap=null;
c_Gold_Aztec.m_Im_StarS=null;
c_Gold_Aztec.m_Im_FonTab=null;
c_Gold_Aztec.m_Im_Opros=null;
c_Gold_Aztec.m_Im_Quit=null;
c_Gold_Aztec.m_Vizual_Zastavka=function(){
	c_Gold_Aztec.m_Flag_Load=c_Gold_Aztec.m_Flag_Load+1;
	if(c_Gold_Aztec.m_Flag_Load==2){
		c_Gold_Aztec.m_Im_OknoVerh=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(1,802,480,70,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_VerhMask=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(1,802,480,5,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_OknoNiz=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(482,1,480,250,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_SoundOn=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(905,252,75,75,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_MusicOn=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(905,328,55,80,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_BlokMeny=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(483,253,420,193,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Star[1]=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(81,912,39,38,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Star[2]=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(1,912,79,38,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Star[3]=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(363,873,119,38,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Star[4]=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(202,873,160,38,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Star[5]=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(1,873,200,38,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Stena=c_Gold_Aztec.m_Atlas_Image1.p_GrabImage(483,448,480,480,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Stena.p_SetHandle(240.0,240.0);
		c_Gold_Aztec.m_Im_Blok[1]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(1,1,120,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Blok[2]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(1,122,120,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Blok[3]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(1,243,120,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Blok[4]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(1,364,120,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Blok[5]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(1,485,120,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Blok[6]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(1,606,120,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[0]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[1]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[2]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[3]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[4]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[5]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[6]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[7]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[8]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[9]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(122,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[10]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[11]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[12]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[13]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[14]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[15]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[16]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[17]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[18]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_1[19]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(197,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[0]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[1]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[2]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[3]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[4]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[5]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[6]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[7]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[8]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[9]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(272,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[10]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[11]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[12]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[13]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[14]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[15]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[16]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[17]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[18]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_2[19]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(347,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[0]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[1]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[2]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[3]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[4]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[5]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[6]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[7]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[8]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[9]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(422,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[10]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[11]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[12]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[13]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[14]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[15]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[16]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[17]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[18]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_3[19]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(497,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[0]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[1]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[2]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[3]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[4]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[5]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[6]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[7]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[8]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[9]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(572,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[10]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[11]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[12]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[13]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[14]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[15]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[16]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[17]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[18]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_4[19]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(647,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[0]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[1]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[2]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[3]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[4]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[5]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[6]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[7]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[8]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[9]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(722,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[10]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[11]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[12]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[13]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[14]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[15]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[16]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[17]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[18]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_5[19]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(797,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[0]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[1]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[2]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[3]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[4]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[5]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[6]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[7]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[8]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[9]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(872,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[10]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,1,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[11]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,76,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[12]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,151,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[13]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,226,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[14]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,301,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[15]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,376,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[16]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,451,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[17]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,526,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[18]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,601,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Kristal_6[19]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(947,676,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[0]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(0,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[1]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(41,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[2]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(82,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[3]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(123,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[4]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(164,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[5]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(205,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[6]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(246,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[7]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(287,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[8]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(328,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[9]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(369,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[10]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(410,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[11]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(451,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[12]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(492,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[13]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(533,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[14]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(574,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[15]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(615,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[16]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(656,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[17]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(697,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[18]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(738,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[19]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(779,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[20]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(820,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[21]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(861,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[22]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(902,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[23]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(943,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[24]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(984,751,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[25]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(0,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[26]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(41,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[27]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(82,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[28]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(123,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[29]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(164,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[30]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(205,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[31]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(246,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[32]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(287,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[33]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(328,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[34]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(369,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[35]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(410,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[36]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(451,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[37]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(492,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[38]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(533,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[39]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(574,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[40]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(615,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[41]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(656,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[42]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(697,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[43]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(738,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[44]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(779,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[45]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(820,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[46]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(861,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[47]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(902,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[48]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(943,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[49]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(984,818,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[50]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(0,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[51]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(41,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[52]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(82,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[53]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(123,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[54]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(164,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[55]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(205,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[56]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(246,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[57]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(287,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[58]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(328,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[59]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(369,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[60]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(410,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[61]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(451,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[62]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(492,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[63]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(533,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[64]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(574,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[65]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(615,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[66]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(656,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[67]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(697,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[68]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(738,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[69]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(779,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[70]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(820,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[71]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(861,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[72]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(902,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[73]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(943,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[74]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(984,885,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[75]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(0,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[76]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(41,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[77]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(82,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[78]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(123,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[79]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(164,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[80]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(205,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[81]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(246,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[82]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(287,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[83]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(328,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[84]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(369,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[85]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(410,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[86]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(451,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[87]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(492,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[88]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(533,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[89]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(574,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[90]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(615,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[91]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(656,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[92]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(697,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[93]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(738,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[94]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(779,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[95]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(820,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[96]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(861,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[97]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(902,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[98]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(943,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraB[99]=c_Gold_Aztec.m_Atlas_Image2.p_GrabImage(984,952,40,66,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_ListHelp=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(1,1,464,745,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[0]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(1,747,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[1]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(1,812,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[2]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(1,877,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[3]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(1,942,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[4]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(466,1,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[5]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(466,66,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[6]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(466,131,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[7]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(466,196,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[8]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(466,261,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Rulon[9]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(466,326,476,64,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_ListKarta=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(478,391,464,440,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_TBack=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(728,832,103,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_MapL=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(478,866,105,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Up=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(832,832,49,31,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Down=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(882,832,103,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[0]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(478,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[1]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(503,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[2]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(528,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[3]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(553,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[4]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(578,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[5]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(603,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[6]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(628,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[7]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(653,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[8]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(678,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraL[9]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(703,832,24,33,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[0]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(478,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[1]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(504,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[2]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(530,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[3]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(556,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[4]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(582,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[5]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(608,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[6]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(634,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[7]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(660,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[8]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(686,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraR[9]=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(712,911,25,35,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Close=c_Gold_Aztec.m_Atlas_Image3.p_GrabImage(478,947,161,63,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Koridor=c_Gold_Aztec.m_Atlas_Image4.p_GrabImage(1,1,800,800,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Koridor.p_SetHandle(400.0,400.0);
		c_Gold_Aztec.m_Im_KromkaL=c_Gold_Aztec.m_Atlas_Image4.p_GrabImage(802,1,10,480,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_KromkaP=c_Gold_Aztec.m_Atlas_Image4.p_GrabImage(813,1,10,480,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[0]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(0,0,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[1]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(64,0,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[2]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(128,0,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[3]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(192,0,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[4]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(256,0,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[5]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(320,0,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[6]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(384,0,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[7]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(448,0,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[8]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(0,128,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[9]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(64,128,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[10]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(128,128,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[11]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(192,128,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[12]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(256,128,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[13]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(320,128,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[14]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(384,128,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Fire[15]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(448,128,64,120,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[0]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(513,1,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[1]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(717,1,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[2]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(513,133,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[3]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(717,133,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[4]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(1,265,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[5]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(205,265,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[6]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(409,265,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[7]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(613,265,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[8]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(817,265,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[9]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(1,397,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[10]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(205,397,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Ukaz[11]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(409,397,203,131,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_TKristal_1=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(1,529,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_TKristal_2=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(76,529,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_TKristal_3=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(151,529,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_TKristal_4=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(226,529,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_TKristal_5=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(301,529,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_TKristal_6=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(376,529,74,74,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_BlikF=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(613,397,130,100,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[0]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(1,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[1]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(42,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[2]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(83,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[3]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(124,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[4]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(165,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[5]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(206,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[6]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(247,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[7]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(288,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[8]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(329,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[9]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(370,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[10]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(411,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[11]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(452,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[12]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(493,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[13]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(534,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[14]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(575,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[15]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(616,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_FireF[16]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(657,604,40,128,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_BlikF2=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(890,397,133,300,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_GoldBlik[0]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(1,733,169,169,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_GoldBlik[0].p_SetHandle(84.0,84.0);
		c_Gold_Aztec.m_Im_GoldBlik[1]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(171,733,169,169,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_GoldBlik[1].p_SetHandle(84.0,84.0);
		c_Gold_Aztec.m_Im_GoldBlik[2]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(341,733,169,169,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_GoldBlik[2].p_SetHandle(84.0,84.0);
		c_Gold_Aztec.m_Im_GoldBlik[3]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(511,733,169,169,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_GoldBlik[3].p_SetHandle(84.0,84.0);
		c_Gold_Aztec.m_Im_GoldBlik[4]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(681,733,169,169,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_GoldBlik[4].p_SetHandle(84.0,84.0);
		c_Gold_Aztec.m_Im_GoldBlik[5]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(851,733,169,169,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_GoldBlik[5].p_SetHandle(84.0,84.0);
		c_Gold_Aztec.m_Im_CifraS[0]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(1,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[1]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(44,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[2]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(87,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[3]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(130,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[4]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(173,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[5]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(216,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[6]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(259,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[7]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(302,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[8]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(345,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_CifraS[9]=c_Gold_Aztec.m_Atlas_Image5.p_GrabImage(388,903,42,52,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[0]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(1,505,236,226,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[1]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(1,1,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[2]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(238,1,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[3]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(475,1,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[4]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(712,1,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[5]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(1,127,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[6]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(238,127,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[7]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(475,127,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[8]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(712,127,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[9]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(1,253,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[10]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(238,253,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[11]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(475,253,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[12]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(712,253,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[13]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(1,379,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[14]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(238,379,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[15]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(475,379,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Sunduk[16]=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(712,379,236,125,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Tap=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(238,505,465,58,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_StarS=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(704,505,45,45,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_StarS.p_SetHandle(22.0,22.0);
		c_Gold_Aztec.m_Im_FonTab=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(1,732,480,204,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Opros=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(482,611,480,204,1,c_Image.m_DefaultFlags);
		c_Gold_Aztec.m_Im_Quit=c_Gold_Aztec.m_Atlas_Image6.p_GrabImage(482,816,480,204,1,c_Image.m_DefaultFlags);
	}
	if(c_Gold_Aztec.m_Flag_Load==3){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoVerh,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_VerhMask,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoNiz,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_SoundOn,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_MusicOn,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlokMeny,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Stena,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[17],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[18],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[19],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[17],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[18],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[19],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[17],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[18],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[19],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[17],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[18],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[19],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[17],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[18],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[19],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[17],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[18],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[19],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[17],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[18],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[19],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[20],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[21],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[22],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[23],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[24],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[25],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[26],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[27],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[28],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[29],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[30],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[31],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[32],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[33],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[34],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[35],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[36],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[37],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[38],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[39],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[40],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[41],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[42],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[43],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[44],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[45],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[46],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[47],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[48],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[49],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[50],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[51],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[52],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[53],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[54],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[55],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[56],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[57],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[58],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[59],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[60],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[61],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[62],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[63],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[64],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[65],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[66],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[67],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[68],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[69],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[70],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[71],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[72],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[73],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[74],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[75],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[76],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[77],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[78],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[79],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[80],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[81],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[82],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[83],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[84],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[85],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[86],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[87],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[88],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[89],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[90],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[91],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[92],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[93],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[94],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[95],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[96],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[97],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[98],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[99],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_ListHelp,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_ListKarta,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TBack,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_MapL,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Up,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Down,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Koridor,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_KromkaL,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_KromkaP,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FireF[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF2,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_GoldBlik[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_GoldBlik[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_GoldBlik[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_GoldBlik[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_GoldBlik[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_GoldBlik[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraS[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Loading,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Tap,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_StarS,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FonTab,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Opros,0.0,0.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Quit,0.0,0.0,0);
	}
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Loading,145.0,720.0,0);
	return 0;
}
c_Gold_Aztec.m_Vizual_Smena_Zastavka_GlMeny=function(){
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Loading,145.0,720.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlokMeny,30.0,(c_Gold_Aztec.m_Y_Meny),0);
	return 0;
}
c_Gold_Aztec.m_Vizual_GlMeny=function(){
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlokMeny,30.0,(c_Gold_Aztec.m_Y_Meny),0);
	if(c_Gold_Aztec.m_Flag_Sound==1){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_SoundOn,35.0,(c_Gold_Aztec.m_Y_Meny+105),0);
	}
	if(c_Gold_Aztec.m_Flag_Music==1){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_MusicOn,380.0,(c_Gold_Aztec.m_Y_Meny+105),0);
	}
	if(c_Gold_Aztec.m_Flag_Help>0){
		if(c_Gold_Aztec.m_Y_Help>0){
			bb_graphics_DrawImageRect(c_Gold_Aztec.m_Im_ListHelp,8.0,0.0,0,0,464,c_Gold_Aztec.m_Y_Help+5,0);
		}
		if(c_Gold_Aztec.m_Y_Help>-70){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonH],2.0,(c_Gold_Aztec.m_Y_Help),0);
		}
		if(c_Gold_Aztec.m_Flag_Help==2){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TBack,182.0,745.0,0);
		}
	}
	if(c_Gold_Aztec.m_Pauza==1){
		bb_graphics_SetAlpha(0.7);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FonTab,0.0,210.0,0);
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Quit,0.0,210.0,0);
	}
	return 0;
}
c_Gold_Aztec.m_Frame_Schet=[];
c_Gold_Aztec.m_Viz_BlokKristall=function(){
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[1]],(0-c_Gold_Aztec.m_SmX_Blok),70.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[2]],(120-c_Gold_Aztec.m_SmX_Blok),70.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[3]],(240+c_Gold_Aztec.m_SmX_Blok),70.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[4]],(360+c_Gold_Aztec.m_SmX_Blok),70.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[5]],(0-c_Gold_Aztec.m_SmX_Blok),190.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[6]],(120-c_Gold_Aztec.m_SmX_Blok),190.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[7]],(240+c_Gold_Aztec.m_SmX_Blok),190.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[8]],(360+c_Gold_Aztec.m_SmX_Blok),190.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[9]],(0-c_Gold_Aztec.m_SmX_Blok),310.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[10]],(120-c_Gold_Aztec.m_SmX_Blok),310.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[11]],(240+c_Gold_Aztec.m_SmX_Blok),310.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[12]],(360+c_Gold_Aztec.m_SmX_Blok),310.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[13]],(0-c_Gold_Aztec.m_SmX_Blok),430.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[14]],(120-c_Gold_Aztec.m_SmX_Blok),430.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[15]],(240+c_Gold_Aztec.m_SmX_Blok),430.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok[16]],(360+c_Gold_Aztec.m_SmX_Blok),430.0,0);
	var t_Pr_T=.0;
	t_Pr_T=0.7;
	var t_10=c_Gold_Aztec.m_Maska_Level_Kris[1];
	if(t_10==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T1>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K1[0]+c_Gold_Aztec.m_Sm_T1-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]+c_Gold_Aztec.m_Sm_T1),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[1]],(c_Gold_Aztec.m_TK_K1[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]),0);
	}else{
		if(t_10==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T1>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K1[0]+c_Gold_Aztec.m_Sm_T1-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]+c_Gold_Aztec.m_Sm_T1),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[1]],(c_Gold_Aztec.m_TK_K1[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]),0);
		}else{
			if(t_10==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T1>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K1[0]+c_Gold_Aztec.m_Sm_T1-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]+c_Gold_Aztec.m_Sm_T1),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[1]],(c_Gold_Aztec.m_TK_K1[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]),0);
			}else{
				if(t_10==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T1>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K1[0]+c_Gold_Aztec.m_Sm_T1-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]+c_Gold_Aztec.m_Sm_T1),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[1]],(c_Gold_Aztec.m_TK_K1[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]),0);
				}else{
					if(t_10==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T1>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K1[0]+c_Gold_Aztec.m_Sm_T1-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]+c_Gold_Aztec.m_Sm_T1),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[1]],(c_Gold_Aztec.m_TK_K1[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]),0);
					}else{
						if(t_10==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T1>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K1[0]+c_Gold_Aztec.m_Sm_T1-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]+c_Gold_Aztec.m_Sm_T1),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[1]],(c_Gold_Aztec.m_TK_K1[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K1[1]),0);
						}
					}
				}
			}
		}
	}
	var t_11=c_Gold_Aztec.m_Maska_Level_Kris[2];
	if(t_11==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T2>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K2[0]+c_Gold_Aztec.m_Sm_T2-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]+c_Gold_Aztec.m_Sm_T2),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[2]],(c_Gold_Aztec.m_TK_K2[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]),0);
	}else{
		if(t_11==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T2>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K2[0]+c_Gold_Aztec.m_Sm_T2-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]+c_Gold_Aztec.m_Sm_T2),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[2]],(c_Gold_Aztec.m_TK_K2[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]),0);
		}else{
			if(t_11==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T2>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K2[0]+c_Gold_Aztec.m_Sm_T2-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]+c_Gold_Aztec.m_Sm_T2),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[2]],(c_Gold_Aztec.m_TK_K2[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]),0);
			}else{
				if(t_11==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T2>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K2[0]+c_Gold_Aztec.m_Sm_T2-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]+c_Gold_Aztec.m_Sm_T2),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[2]],(c_Gold_Aztec.m_TK_K2[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]),0);
				}else{
					if(t_11==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T2>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K2[0]+c_Gold_Aztec.m_Sm_T2-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]+c_Gold_Aztec.m_Sm_T2),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[2]],(c_Gold_Aztec.m_TK_K2[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]),0);
					}else{
						if(t_11==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T2>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K2[0]+c_Gold_Aztec.m_Sm_T2-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]+c_Gold_Aztec.m_Sm_T2),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[2]],(c_Gold_Aztec.m_TK_K2[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K2[1]),0);
						}
					}
				}
			}
		}
	}
	var t_12=c_Gold_Aztec.m_Maska_Level_Kris[3];
	if(t_12==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T3>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_Sm_T3+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]+c_Gold_Aztec.m_Sm_T3),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[3]],(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]),0);
	}else{
		if(t_12==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T3>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_Sm_T3+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]+c_Gold_Aztec.m_Sm_T3),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[3]],(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]),0);
		}else{
			if(t_12==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T3>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_Sm_T3+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]+c_Gold_Aztec.m_Sm_T3),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[3]],(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]),0);
			}else{
				if(t_12==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T3>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_Sm_T3+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]+c_Gold_Aztec.m_Sm_T3),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[3]],(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]),0);
				}else{
					if(t_12==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T3>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_Sm_T3+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]+c_Gold_Aztec.m_Sm_T3),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[3]],(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]),0);
					}else{
						if(t_12==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T3>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_Sm_T3+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]+c_Gold_Aztec.m_Sm_T3),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[3]],(c_Gold_Aztec.m_TK_K3[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K3[1]),0);
						}
					}
				}
			}
		}
	}
	var t_13=c_Gold_Aztec.m_Maska_Level_Kris[4];
	if(t_13==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T4>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_Sm_T4+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]+c_Gold_Aztec.m_Sm_T4),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[4]],(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]),0);
	}else{
		if(t_13==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T4>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_Sm_T4+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]+c_Gold_Aztec.m_Sm_T4),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[4]],(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]),0);
		}else{
			if(t_13==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T4>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_Sm_T4+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]+c_Gold_Aztec.m_Sm_T4),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[4]],(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]),0);
			}else{
				if(t_13==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T4>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_Sm_T4+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]+c_Gold_Aztec.m_Sm_T4),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[4]],(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]),0);
				}else{
					if(t_13==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T4>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_Sm_T4+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]+c_Gold_Aztec.m_Sm_T4),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[4]],(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]),0);
					}else{
						if(t_13==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T4>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_Sm_T4+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]+c_Gold_Aztec.m_Sm_T4),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[4]],(c_Gold_Aztec.m_TK_K4[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K4[1]),0);
						}
					}
				}
			}
		}
	}
	var t_14=c_Gold_Aztec.m_Maska_Level_Kris[5];
	if(t_14==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T5>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K5[0]+c_Gold_Aztec.m_Sm_T5-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]+c_Gold_Aztec.m_Sm_T5),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[5]],(c_Gold_Aztec.m_TK_K5[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]),0);
	}else{
		if(t_14==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T5>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K5[0]+c_Gold_Aztec.m_Sm_T5-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]+c_Gold_Aztec.m_Sm_T5),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[5]],(c_Gold_Aztec.m_TK_K5[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]),0);
		}else{
			if(t_14==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T5>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K5[0]+c_Gold_Aztec.m_Sm_T5-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]+c_Gold_Aztec.m_Sm_T5),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[5]],(c_Gold_Aztec.m_TK_K5[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]),0);
			}else{
				if(t_14==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T5>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K5[0]+c_Gold_Aztec.m_Sm_T5-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]+c_Gold_Aztec.m_Sm_T5),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[5]],(c_Gold_Aztec.m_TK_K5[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]),0);
				}else{
					if(t_14==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T5>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K5[0]+c_Gold_Aztec.m_Sm_T5-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]+c_Gold_Aztec.m_Sm_T5),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[5]],(c_Gold_Aztec.m_TK_K5[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]),0);
					}else{
						if(t_14==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T5>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K5[0]+c_Gold_Aztec.m_Sm_T5-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]+c_Gold_Aztec.m_Sm_T5),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[5]],(c_Gold_Aztec.m_TK_K5[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K5[1]),0);
						}
					}
				}
			}
		}
	}
	var t_15=c_Gold_Aztec.m_Maska_Level_Kris[6];
	if(t_15==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T6>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K6[0]+c_Gold_Aztec.m_Sm_T6-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]+c_Gold_Aztec.m_Sm_T6),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[6]],(c_Gold_Aztec.m_TK_K6[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]),0);
	}else{
		if(t_15==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T6>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K6[0]+c_Gold_Aztec.m_Sm_T6-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]+c_Gold_Aztec.m_Sm_T6),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[6]],(c_Gold_Aztec.m_TK_K6[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]),0);
		}else{
			if(t_15==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T6>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K6[0]+c_Gold_Aztec.m_Sm_T6-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]+c_Gold_Aztec.m_Sm_T6),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[6]],(c_Gold_Aztec.m_TK_K6[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]),0);
			}else{
				if(t_15==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T6>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K6[0]+c_Gold_Aztec.m_Sm_T6-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]+c_Gold_Aztec.m_Sm_T6),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[6]],(c_Gold_Aztec.m_TK_K6[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]),0);
				}else{
					if(t_15==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T6>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K6[0]+c_Gold_Aztec.m_Sm_T6-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]+c_Gold_Aztec.m_Sm_T6),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[6]],(c_Gold_Aztec.m_TK_K6[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]),0);
					}else{
						if(t_15==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T6>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K6[0]+c_Gold_Aztec.m_Sm_T6-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]+c_Gold_Aztec.m_Sm_T6),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[6]],(c_Gold_Aztec.m_TK_K6[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K6[1]),0);
						}
					}
				}
			}
		}
	}
	var t_16=c_Gold_Aztec.m_Maska_Level_Kris[7];
	if(t_16==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T7>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_Sm_T7+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]+c_Gold_Aztec.m_Sm_T7),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[7]],(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]),0);
	}else{
		if(t_16==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T7>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_Sm_T7+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]+c_Gold_Aztec.m_Sm_T7),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[7]],(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]),0);
		}else{
			if(t_16==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T7>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_Sm_T7+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]+c_Gold_Aztec.m_Sm_T7),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[7]],(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]),0);
			}else{
				if(t_16==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T7>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_Sm_T7+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]+c_Gold_Aztec.m_Sm_T7),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[7]],(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]),0);
				}else{
					if(t_16==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T7>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_Sm_T7+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]+c_Gold_Aztec.m_Sm_T7),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[7]],(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]),0);
					}else{
						if(t_16==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T7>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_Sm_T7+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]+c_Gold_Aztec.m_Sm_T7),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[7]],(c_Gold_Aztec.m_TK_K7[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K7[1]),0);
						}
					}
				}
			}
		}
	}
	var t_17=c_Gold_Aztec.m_Maska_Level_Kris[8];
	if(t_17==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T8>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_Sm_T8+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]+c_Gold_Aztec.m_Sm_T8),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[8]],(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]),0);
	}else{
		if(t_17==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T8>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_Sm_T8+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]+c_Gold_Aztec.m_Sm_T8),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[8]],(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]),0);
		}else{
			if(t_17==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T8>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_Sm_T8+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]+c_Gold_Aztec.m_Sm_T8),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[8]],(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]),0);
			}else{
				if(t_17==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T8>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_Sm_T8+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]+c_Gold_Aztec.m_Sm_T8),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[8]],(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]),0);
				}else{
					if(t_17==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T8>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_Sm_T8+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]+c_Gold_Aztec.m_Sm_T8),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[8]],(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]),0);
					}else{
						if(t_17==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T8>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_Sm_T8+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]+c_Gold_Aztec.m_Sm_T8),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[8]],(c_Gold_Aztec.m_TK_K8[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K8[1]),0);
						}
					}
				}
			}
		}
	}
	var t_18=c_Gold_Aztec.m_Maska_Level_Kris[9];
	if(t_18==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T9>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K9[0]+c_Gold_Aztec.m_Sm_T9-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]+c_Gold_Aztec.m_Sm_T9),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[9]],(c_Gold_Aztec.m_TK_K9[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]),0);
	}else{
		if(t_18==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T9>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K9[0]+c_Gold_Aztec.m_Sm_T9-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]+c_Gold_Aztec.m_Sm_T9),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[9]],(c_Gold_Aztec.m_TK_K9[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]),0);
		}else{
			if(t_18==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T9>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K9[0]+c_Gold_Aztec.m_Sm_T9-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]+c_Gold_Aztec.m_Sm_T9),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[9]],(c_Gold_Aztec.m_TK_K9[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]),0);
			}else{
				if(t_18==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T9>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K9[0]+c_Gold_Aztec.m_Sm_T9-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]+c_Gold_Aztec.m_Sm_T9),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[9]],(c_Gold_Aztec.m_TK_K9[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]),0);
				}else{
					if(t_18==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T9>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K9[0]+c_Gold_Aztec.m_Sm_T9-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]+c_Gold_Aztec.m_Sm_T9),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[9]],(c_Gold_Aztec.m_TK_K9[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]),0);
					}else{
						if(t_18==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T9>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K9[0]+c_Gold_Aztec.m_Sm_T9-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]+c_Gold_Aztec.m_Sm_T9),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[9]],(c_Gold_Aztec.m_TK_K9[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K9[1]),0);
						}
					}
				}
			}
		}
	}
	var t_19=c_Gold_Aztec.m_Maska_Level_Kris[10];
	if(t_19==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T10>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K10[0]+c_Gold_Aztec.m_Sm_T10-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]+c_Gold_Aztec.m_Sm_T10),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[10]],(c_Gold_Aztec.m_TK_K10[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]),0);
	}else{
		if(t_19==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T10>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K10[0]+c_Gold_Aztec.m_Sm_T10-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]+c_Gold_Aztec.m_Sm_T10),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[10]],(c_Gold_Aztec.m_TK_K10[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]),0);
		}else{
			if(t_19==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T10>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K10[0]+c_Gold_Aztec.m_Sm_T10-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]+c_Gold_Aztec.m_Sm_T10),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[10]],(c_Gold_Aztec.m_TK_K10[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]),0);
			}else{
				if(t_19==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T10>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K10[0]+c_Gold_Aztec.m_Sm_T10-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]+c_Gold_Aztec.m_Sm_T10),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[10]],(c_Gold_Aztec.m_TK_K10[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]),0);
				}else{
					if(t_19==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T10>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K10[0]+c_Gold_Aztec.m_Sm_T10-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]+c_Gold_Aztec.m_Sm_T10),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[10]],(c_Gold_Aztec.m_TK_K10[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]),0);
					}else{
						if(t_19==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T10>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K10[0]+c_Gold_Aztec.m_Sm_T10-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]+c_Gold_Aztec.m_Sm_T10),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[10]],(c_Gold_Aztec.m_TK_K10[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K10[1]),0);
						}
					}
				}
			}
		}
	}
	var t_20=c_Gold_Aztec.m_Maska_Level_Kris[11];
	if(t_20==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T11>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_Sm_T11+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]+c_Gold_Aztec.m_Sm_T11),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[11]],(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]),0);
	}else{
		if(t_20==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T11>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_Sm_T11+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]+c_Gold_Aztec.m_Sm_T11),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[11]],(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]),0);
		}else{
			if(t_20==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T11>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_Sm_T11+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]+c_Gold_Aztec.m_Sm_T11),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[11]],(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]),0);
			}else{
				if(t_20==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T11>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_Sm_T11+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]+c_Gold_Aztec.m_Sm_T11),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[11]],(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]),0);
				}else{
					if(t_20==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T11>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_Sm_T11+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]+c_Gold_Aztec.m_Sm_T11),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[11]],(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]),0);
					}else{
						if(t_20==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T11>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_Sm_T11+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]+c_Gold_Aztec.m_Sm_T11),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[11]],(c_Gold_Aztec.m_TK_K11[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K11[1]),0);
						}
					}
				}
			}
		}
	}
	var t_21=c_Gold_Aztec.m_Maska_Level_Kris[12];
	if(t_21==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T12>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_Sm_T12+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]+c_Gold_Aztec.m_Sm_T12),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[12]],(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]),0);
	}else{
		if(t_21==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T12>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_Sm_T12+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]+c_Gold_Aztec.m_Sm_T12),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[12]],(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]),0);
		}else{
			if(t_21==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T12>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_Sm_T12+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]+c_Gold_Aztec.m_Sm_T12),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[12]],(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]),0);
			}else{
				if(t_21==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T12>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_Sm_T12+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]+c_Gold_Aztec.m_Sm_T12),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[12]],(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]),0);
				}else{
					if(t_21==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T12>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_Sm_T12+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]+c_Gold_Aztec.m_Sm_T12),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[12]],(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]),0);
					}else{
						if(t_21==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T12>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_Sm_T12+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]+c_Gold_Aztec.m_Sm_T12),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[12]],(c_Gold_Aztec.m_TK_K12[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K12[1]),0);
						}
					}
				}
			}
		}
	}
	var t_22=c_Gold_Aztec.m_Maska_Level_Kris[13];
	if(t_22==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T13>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K13[0]+c_Gold_Aztec.m_Sm_T13-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]+c_Gold_Aztec.m_Sm_T13),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[13]],(c_Gold_Aztec.m_TK_K13[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]),0);
	}else{
		if(t_22==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T13>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K13[0]+c_Gold_Aztec.m_Sm_T13-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]+c_Gold_Aztec.m_Sm_T13),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[13]],(c_Gold_Aztec.m_TK_K13[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]),0);
		}else{
			if(t_22==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T13>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K13[0]+c_Gold_Aztec.m_Sm_T13-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]+c_Gold_Aztec.m_Sm_T13),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[13]],(c_Gold_Aztec.m_TK_K13[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]),0);
			}else{
				if(t_22==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T13>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K13[0]+c_Gold_Aztec.m_Sm_T13-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]+c_Gold_Aztec.m_Sm_T13),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[13]],(c_Gold_Aztec.m_TK_K13[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]),0);
				}else{
					if(t_22==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T13>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K13[0]+c_Gold_Aztec.m_Sm_T13-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]+c_Gold_Aztec.m_Sm_T13),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[13]],(c_Gold_Aztec.m_TK_K13[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]),0);
					}else{
						if(t_22==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T13>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K13[0]+c_Gold_Aztec.m_Sm_T13-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]+c_Gold_Aztec.m_Sm_T13),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[13]],(c_Gold_Aztec.m_TK_K13[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K13[1]),0);
						}
					}
				}
			}
		}
	}
	var t_23=c_Gold_Aztec.m_Maska_Level_Kris[14];
	if(t_23==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T14>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K14[0]+c_Gold_Aztec.m_Sm_T14-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]+c_Gold_Aztec.m_Sm_T14),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[14]],(c_Gold_Aztec.m_TK_K14[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]),0);
	}else{
		if(t_23==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T14>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K14[0]+c_Gold_Aztec.m_Sm_T14-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]+c_Gold_Aztec.m_Sm_T14),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[14]],(c_Gold_Aztec.m_TK_K14[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]),0);
		}else{
			if(t_23==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T14>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K14[0]+c_Gold_Aztec.m_Sm_T14-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]+c_Gold_Aztec.m_Sm_T14),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[14]],(c_Gold_Aztec.m_TK_K14[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]),0);
			}else{
				if(t_23==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T14>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K14[0]+c_Gold_Aztec.m_Sm_T14-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]+c_Gold_Aztec.m_Sm_T14),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[14]],(c_Gold_Aztec.m_TK_K14[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]),0);
				}else{
					if(t_23==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T14>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K14[0]+c_Gold_Aztec.m_Sm_T14-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]+c_Gold_Aztec.m_Sm_T14),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[14]],(c_Gold_Aztec.m_TK_K14[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]),0);
					}else{
						if(t_23==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T14>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K14[0]+c_Gold_Aztec.m_Sm_T14-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]+c_Gold_Aztec.m_Sm_T14),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[14]],(c_Gold_Aztec.m_TK_K14[0]-c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K14[1]),0);
						}
					}
				}
			}
		}
	}
	var t_24=c_Gold_Aztec.m_Maska_Level_Kris[15];
	if(t_24==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T15>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_Sm_T15+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]+c_Gold_Aztec.m_Sm_T15),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[15]],(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]),0);
	}else{
		if(t_24==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T15>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_Sm_T15+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]+c_Gold_Aztec.m_Sm_T15),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[15]],(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]),0);
		}else{
			if(t_24==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T15>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_Sm_T15+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]+c_Gold_Aztec.m_Sm_T15),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[15]],(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]),0);
			}else{
				if(t_24==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T15>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_Sm_T15+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]+c_Gold_Aztec.m_Sm_T15),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[15]],(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]),0);
				}else{
					if(t_24==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T15>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_Sm_T15+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]+c_Gold_Aztec.m_Sm_T15),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[15]],(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]),0);
					}else{
						if(t_24==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T15>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_Sm_T15+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]+c_Gold_Aztec.m_Sm_T15),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[15]],(c_Gold_Aztec.m_TK_K15[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K15[1]),0);
						}
					}
				}
			}
		}
	}
	var t_25=c_Gold_Aztec.m_Maska_Level_Kris[16];
	if(t_25==1){
		bb_graphics_SetAlpha(t_Pr_T);
		if(c_Gold_Aztec.m_Sm_T16>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_1,(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_Sm_T16+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]+c_Gold_Aztec.m_Sm_T16),0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal[16]],(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]),0);
	}else{
		if(t_25==2){
			bb_graphics_SetAlpha(t_Pr_T);
			if(c_Gold_Aztec.m_Sm_T16>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_2,(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_Sm_T16+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]+c_Gold_Aztec.m_Sm_T16),0);
			}
			bb_graphics_SetAlpha(1.0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal[16]],(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]),0);
		}else{
			if(t_25==3){
				bb_graphics_SetAlpha(t_Pr_T);
				if(c_Gold_Aztec.m_Sm_T16>0){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_3,(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_Sm_T16+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]+c_Gold_Aztec.m_Sm_T16),0);
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal[16]],(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]),0);
			}else{
				if(t_25==4){
					bb_graphics_SetAlpha(t_Pr_T);
					if(c_Gold_Aztec.m_Sm_T16>0){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_4,(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_Sm_T16+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]+c_Gold_Aztec.m_Sm_T16),0);
					}
					bb_graphics_SetAlpha(1.0);
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal[16]],(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]),0);
				}else{
					if(t_25==5){
						bb_graphics_SetAlpha(t_Pr_T);
						if(c_Gold_Aztec.m_Sm_T16>0){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_5,(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_Sm_T16+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]+c_Gold_Aztec.m_Sm_T16),0);
						}
						bb_graphics_SetAlpha(1.0);
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal[16]],(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]),0);
					}else{
						if(t_25==6){
							bb_graphics_SetAlpha(t_Pr_T);
							if(c_Gold_Aztec.m_Sm_T16>0){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_TKristal_6,(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_Sm_T16+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]+c_Gold_Aztec.m_Sm_T16),0);
							}
							bb_graphics_SetAlpha(1.0);
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal[16]],(c_Gold_Aztec.m_TK_K16[0]+c_Gold_Aztec.m_SmX_Blok),(c_Gold_Aztec.m_TK_K16[1]),0);
						}
					}
				}
			}
		}
	}
	return 0;
}
c_Gold_Aztec.m_Vizual_Smena_GlMeny_Game=function(){
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoVerh,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKN],2.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_MapL,140.0,15.0,0);
	var t_X1S_LevM=0;
	var t_S_LevelM=((Math.floor((c_Gold_Aztec.m_N_Level/100)|0))|0);
	var t_D_LevelM=((Math.floor(((c_Gold_Aztec.m_N_Level-t_S_LevelM*100)/10)|0))|0);
	var t_E_LevelM=c_Gold_Aztec.m_N_Level-t_S_LevelM*100-t_D_LevelM*10;
	t_X1S_LevM=270;
	if(c_Gold_Aztec.m_N_Level>99){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_S_LevelM],(t_X1S_LevM),15.0,0);
		t_X1S_LevM=t_X1S_LevM+26;
	}
	if(c_Gold_Aztec.m_N_Level>9){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_D_LevelM],(t_X1S_LevM),15.0,0);
		t_X1S_LevM=t_X1S_LevM+26;
	}
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_E_LevelM],(t_X1S_LevM),15.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[1]],140.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[2]],180.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[3]],220.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[4]],260.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[5]],300.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoNiz,0.0,550.0,0);
	c_Gold_Aztec.m_Viz_BlokKristall();
	var t_PBlikL=.0;
	var t_PBlikP=.0;
	t_PBlikL=bb_random_Rnd2(0.01,0.15);
	t_PBlikP=bb_random_Rnd2(0.01,0.15);
	bb_graphics_SetAlpha(t_PBlikL);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,1.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetAlpha(t_PBlikP);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,350.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireL],45.0,520.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireP],390.0,520.0,0);
	bb_graphics_SetAlpha(c_Gold_Aztec.m_Proz_Screen);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlokMeny,30.0,(c_Gold_Aztec.m_Y_Meny),0);
	if(c_Gold_Aztec.m_Flag_Sound==1){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_SoundOn,35.0,(c_Gold_Aztec.m_Y_Meny+105),0);
	}
	if(c_Gold_Aztec.m_Flag_Music==1){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_MusicOn,380.0,(c_Gold_Aztec.m_Y_Meny+105),0);
	}
	bb_graphics_SetAlpha(1.0);
	return 0;
}
c_Gold_Aztec.m_Viz_BlokKristall2=function(t_Sm_BmX,t_Sm_BmY){
	bb_graphics_SetAlpha(c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor);
	if(c_Gold_Aztec.m_Flag_Stena==0){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[1]],(0+t_Sm_BmX),(70+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[2]],(120+t_Sm_BmX),(70+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[3]],(240+t_Sm_BmX),(70+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[4]],(360+t_Sm_BmX),(70+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[5]],(0+t_Sm_BmX),(190+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[6]],(120+t_Sm_BmX),(190+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[7]],(240+t_Sm_BmX),(190+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[8]],(360+t_Sm_BmX),(190+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[9]],(0+t_Sm_BmX),(310+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[10]],(120+t_Sm_BmX),(310+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[11]],(240+t_Sm_BmX),(310+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[12]],(360+t_Sm_BmX),(310+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[13]],(0+t_Sm_BmX),(430+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[14]],(120+t_Sm_BmX),(430+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[15]],(240+t_Sm_BmX),(430+t_Sm_BmY),0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Blok[c_Gold_Aztec.m_Maska_Level_Blok2[16]],(360+t_Sm_BmX),(430+t_Sm_BmY),0);
		var t_26=c_Gold_Aztec.m_Maska_Level_Kris2[1];
		if(t_26==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[1]],(c_Gold_Aztec.m_TK_K1[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K1[1]+t_Sm_BmY),0);
		}else{
			if(t_26==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[1]],(c_Gold_Aztec.m_TK_K1[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K1[1]+t_Sm_BmY),0);
			}else{
				if(t_26==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[1]],(c_Gold_Aztec.m_TK_K1[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K1[1]+t_Sm_BmY),0);
				}else{
					if(t_26==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[1]],(c_Gold_Aztec.m_TK_K1[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K1[1]+t_Sm_BmY),0);
					}else{
						if(t_26==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[1]],(c_Gold_Aztec.m_TK_K1[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K1[1]+t_Sm_BmY),0);
						}else{
							if(t_26==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[1]],(c_Gold_Aztec.m_TK_K1[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K1[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_27=c_Gold_Aztec.m_Maska_Level_Kris2[2];
		if(t_27==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[2]],(c_Gold_Aztec.m_TK_K2[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K2[1]+t_Sm_BmY),0);
		}else{
			if(t_27==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[2]],(c_Gold_Aztec.m_TK_K2[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K2[1]+t_Sm_BmY),0);
			}else{
				if(t_27==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[2]],(c_Gold_Aztec.m_TK_K2[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K2[1]+t_Sm_BmY),0);
				}else{
					if(t_27==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[2]],(c_Gold_Aztec.m_TK_K2[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K2[1]+t_Sm_BmY),0);
					}else{
						if(t_27==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[2]],(c_Gold_Aztec.m_TK_K2[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K2[1]+t_Sm_BmY),0);
						}else{
							if(t_27==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[2]],(c_Gold_Aztec.m_TK_K2[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K2[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_28=c_Gold_Aztec.m_Maska_Level_Kris2[3];
		if(t_28==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[3]],(c_Gold_Aztec.m_TK_K3[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K3[1]+t_Sm_BmY),0);
		}else{
			if(t_28==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[3]],(c_Gold_Aztec.m_TK_K3[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K3[1]+t_Sm_BmY),0);
			}else{
				if(t_28==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[3]],(c_Gold_Aztec.m_TK_K3[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K3[1]+t_Sm_BmY),0);
				}else{
					if(t_28==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[3]],(c_Gold_Aztec.m_TK_K3[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K3[1]+t_Sm_BmY),0);
					}else{
						if(t_28==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[3]],(c_Gold_Aztec.m_TK_K3[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K3[1]+t_Sm_BmY),0);
						}else{
							if(t_28==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[3]],(c_Gold_Aztec.m_TK_K3[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K3[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_29=c_Gold_Aztec.m_Maska_Level_Kris2[4];
		if(t_29==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[4]],(c_Gold_Aztec.m_TK_K4[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K4[1]+t_Sm_BmY),0);
		}else{
			if(t_29==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[4]],(c_Gold_Aztec.m_TK_K4[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K4[1]+t_Sm_BmY),0);
			}else{
				if(t_29==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[4]],(c_Gold_Aztec.m_TK_K4[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K4[1]+t_Sm_BmY),0);
				}else{
					if(t_29==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[4]],(c_Gold_Aztec.m_TK_K4[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K4[1]+t_Sm_BmY),0);
					}else{
						if(t_29==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[4]],(c_Gold_Aztec.m_TK_K4[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K4[1]+t_Sm_BmY),0);
						}else{
							if(t_29==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[4]],(c_Gold_Aztec.m_TK_K4[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K4[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_30=c_Gold_Aztec.m_Maska_Level_Kris2[5];
		if(t_30==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[5]],(c_Gold_Aztec.m_TK_K5[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K5[1]+t_Sm_BmY),0);
		}else{
			if(t_30==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[5]],(c_Gold_Aztec.m_TK_K5[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K5[1]+t_Sm_BmY),0);
			}else{
				if(t_30==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[5]],(c_Gold_Aztec.m_TK_K5[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K5[1]+t_Sm_BmY),0);
				}else{
					if(t_30==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[5]],(c_Gold_Aztec.m_TK_K5[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K5[1]+t_Sm_BmY),0);
					}else{
						if(t_30==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[5]],(c_Gold_Aztec.m_TK_K5[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K5[1]+t_Sm_BmY),0);
						}else{
							if(t_30==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[5]],(c_Gold_Aztec.m_TK_K5[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K5[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_31=c_Gold_Aztec.m_Maska_Level_Kris2[6];
		if(t_31==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[6]],(c_Gold_Aztec.m_TK_K6[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K6[1]+t_Sm_BmY),0);
		}else{
			if(t_31==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[6]],(c_Gold_Aztec.m_TK_K6[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K6[1]+t_Sm_BmY),0);
			}else{
				if(t_31==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[6]],(c_Gold_Aztec.m_TK_K6[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K6[1]+t_Sm_BmY),0);
				}else{
					if(t_31==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[6]],(c_Gold_Aztec.m_TK_K6[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K6[1]+t_Sm_BmY),0);
					}else{
						if(t_31==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[6]],(c_Gold_Aztec.m_TK_K6[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K6[1]+t_Sm_BmY),0);
						}else{
							if(t_31==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[6]],(c_Gold_Aztec.m_TK_K6[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K6[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_32=c_Gold_Aztec.m_Maska_Level_Kris2[7];
		if(t_32==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[7]],(c_Gold_Aztec.m_TK_K7[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K7[1]+t_Sm_BmY),0);
		}else{
			if(t_32==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[7]],(c_Gold_Aztec.m_TK_K7[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K7[1]+t_Sm_BmY),0);
			}else{
				if(t_32==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[7]],(c_Gold_Aztec.m_TK_K7[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K7[1]+t_Sm_BmY),0);
				}else{
					if(t_32==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[7]],(c_Gold_Aztec.m_TK_K7[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K7[1]+t_Sm_BmY),0);
					}else{
						if(t_32==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[7]],(c_Gold_Aztec.m_TK_K7[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K7[1]+t_Sm_BmY),0);
						}else{
							if(t_32==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[7]],(c_Gold_Aztec.m_TK_K7[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K7[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_33=c_Gold_Aztec.m_Maska_Level_Kris2[8];
		if(t_33==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[8]],(c_Gold_Aztec.m_TK_K8[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K8[1]+t_Sm_BmY),0);
		}else{
			if(t_33==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[8]],(c_Gold_Aztec.m_TK_K8[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K8[1]+t_Sm_BmY),0);
			}else{
				if(t_33==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[8]],(c_Gold_Aztec.m_TK_K8[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K8[1]+t_Sm_BmY),0);
				}else{
					if(t_33==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[8]],(c_Gold_Aztec.m_TK_K8[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K8[1]+t_Sm_BmY),0);
					}else{
						if(t_33==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[8]],(c_Gold_Aztec.m_TK_K8[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K8[1]+t_Sm_BmY),0);
						}else{
							if(t_33==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[8]],(c_Gold_Aztec.m_TK_K8[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K8[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_34=c_Gold_Aztec.m_Maska_Level_Kris2[9];
		if(t_34==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[9]],(c_Gold_Aztec.m_TK_K9[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K9[1]+t_Sm_BmY),0);
		}else{
			if(t_34==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[9]],(c_Gold_Aztec.m_TK_K9[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K9[1]+t_Sm_BmY),0);
			}else{
				if(t_34==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[9]],(c_Gold_Aztec.m_TK_K9[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K9[1]+t_Sm_BmY),0);
				}else{
					if(t_34==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[9]],(c_Gold_Aztec.m_TK_K9[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K9[1]+t_Sm_BmY),0);
					}else{
						if(t_34==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[9]],(c_Gold_Aztec.m_TK_K9[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K9[1]+t_Sm_BmY),0);
						}else{
							if(t_34==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[9]],(c_Gold_Aztec.m_TK_K9[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K9[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_35=c_Gold_Aztec.m_Maska_Level_Kris2[10];
		if(t_35==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[10]],(c_Gold_Aztec.m_TK_K10[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K10[1]+t_Sm_BmY),0);
		}else{
			if(t_35==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[10]],(c_Gold_Aztec.m_TK_K10[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K10[1]+t_Sm_BmY),0);
			}else{
				if(t_35==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[10]],(c_Gold_Aztec.m_TK_K10[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K10[1]+t_Sm_BmY),0);
				}else{
					if(t_35==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[10]],(c_Gold_Aztec.m_TK_K10[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K10[1]+t_Sm_BmY),0);
					}else{
						if(t_35==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[10]],(c_Gold_Aztec.m_TK_K10[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K10[1]+t_Sm_BmY),0);
						}else{
							if(t_35==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[10]],(c_Gold_Aztec.m_TK_K10[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K10[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_36=c_Gold_Aztec.m_Maska_Level_Kris2[11];
		if(t_36==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[11]],(c_Gold_Aztec.m_TK_K11[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K11[1]+t_Sm_BmY),0);
		}else{
			if(t_36==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[11]],(c_Gold_Aztec.m_TK_K11[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K11[1]+t_Sm_BmY),0);
			}else{
				if(t_36==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[11]],(c_Gold_Aztec.m_TK_K11[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K11[1]+t_Sm_BmY),0);
				}else{
					if(t_36==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[11]],(c_Gold_Aztec.m_TK_K11[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K11[1]+t_Sm_BmY),0);
					}else{
						if(t_36==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[11]],(c_Gold_Aztec.m_TK_K11[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K11[1]+t_Sm_BmY),0);
						}else{
							if(t_36==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[11]],(c_Gold_Aztec.m_TK_K11[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K11[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_37=c_Gold_Aztec.m_Maska_Level_Kris2[12];
		if(t_37==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[12]],(c_Gold_Aztec.m_TK_K12[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K12[1]+t_Sm_BmY),0);
		}else{
			if(t_37==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[12]],(c_Gold_Aztec.m_TK_K12[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K12[1]+t_Sm_BmY),0);
			}else{
				if(t_37==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[12]],(c_Gold_Aztec.m_TK_K12[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K12[1]+t_Sm_BmY),0);
				}else{
					if(t_37==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[12]],(c_Gold_Aztec.m_TK_K12[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K12[1]+t_Sm_BmY),0);
					}else{
						if(t_37==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[12]],(c_Gold_Aztec.m_TK_K12[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K12[1]+t_Sm_BmY),0);
						}else{
							if(t_37==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[12]],(c_Gold_Aztec.m_TK_K12[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K12[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_38=c_Gold_Aztec.m_Maska_Level_Kris2[13];
		if(t_38==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[13]],(c_Gold_Aztec.m_TK_K13[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K13[1]+t_Sm_BmY),0);
		}else{
			if(t_38==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[13]],(c_Gold_Aztec.m_TK_K13[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K13[1]+t_Sm_BmY),0);
			}else{
				if(t_38==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[13]],(c_Gold_Aztec.m_TK_K13[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K13[1]+t_Sm_BmY),0);
				}else{
					if(t_38==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[13]],(c_Gold_Aztec.m_TK_K13[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K13[1]+t_Sm_BmY),0);
					}else{
						if(t_38==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[13]],(c_Gold_Aztec.m_TK_K13[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K13[1]+t_Sm_BmY),0);
						}else{
							if(t_38==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[13]],(c_Gold_Aztec.m_TK_K13[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K13[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_39=c_Gold_Aztec.m_Maska_Level_Kris2[14];
		if(t_39==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[14]],(c_Gold_Aztec.m_TK_K14[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K14[1]+t_Sm_BmY),0);
		}else{
			if(t_39==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[14]],(c_Gold_Aztec.m_TK_K14[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K14[1]+t_Sm_BmY),0);
			}else{
				if(t_39==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[14]],(c_Gold_Aztec.m_TK_K14[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K14[1]+t_Sm_BmY),0);
				}else{
					if(t_39==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[14]],(c_Gold_Aztec.m_TK_K14[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K14[1]+t_Sm_BmY),0);
					}else{
						if(t_39==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[14]],(c_Gold_Aztec.m_TK_K14[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K14[1]+t_Sm_BmY),0);
						}else{
							if(t_39==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[14]],(c_Gold_Aztec.m_TK_K14[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K14[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_40=c_Gold_Aztec.m_Maska_Level_Kris2[15];
		if(t_40==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[15]],(c_Gold_Aztec.m_TK_K15[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K15[1]+t_Sm_BmY),0);
		}else{
			if(t_40==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[15]],(c_Gold_Aztec.m_TK_K15[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K15[1]+t_Sm_BmY),0);
			}else{
				if(t_40==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[15]],(c_Gold_Aztec.m_TK_K15[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K15[1]+t_Sm_BmY),0);
				}else{
					if(t_40==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[15]],(c_Gold_Aztec.m_TK_K15[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K15[1]+t_Sm_BmY),0);
					}else{
						if(t_40==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[15]],(c_Gold_Aztec.m_TK_K15[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K15[1]+t_Sm_BmY),0);
						}else{
							if(t_40==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[15]],(c_Gold_Aztec.m_TK_K15[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K15[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
		var t_41=c_Gold_Aztec.m_Maska_Level_Kris2[16];
		if(t_41==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_1[c_Gold_Aztec.m_Frame_Kristal2[16]],(c_Gold_Aztec.m_TK_K16[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K16[1]+t_Sm_BmY),0);
		}else{
			if(t_41==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_2[c_Gold_Aztec.m_Frame_Kristal2[16]],(c_Gold_Aztec.m_TK_K16[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K16[1]+t_Sm_BmY),0);
			}else{
				if(t_41==3){
					bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_3[c_Gold_Aztec.m_Frame_Kristal2[16]],(c_Gold_Aztec.m_TK_K16[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K16[1]+t_Sm_BmY),0);
				}else{
					if(t_41==4){
						bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_4[c_Gold_Aztec.m_Frame_Kristal2[16]],(c_Gold_Aztec.m_TK_K16[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K16[1]+t_Sm_BmY),0);
					}else{
						if(t_41==5){
							bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_5[c_Gold_Aztec.m_Frame_Kristal2[16]],(c_Gold_Aztec.m_TK_K16[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K16[1]+t_Sm_BmY),0);
						}else{
							if(t_41==6){
								bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Kristal_6[c_Gold_Aztec.m_Frame_Kristal2[16]],(c_Gold_Aztec.m_TK_K16[0]+t_Sm_BmX),(c_Gold_Aztec.m_TK_K16[1]+t_Sm_BmY),0);
							}
						}
					}
				}
			}
		}
	}
	bb_graphics_SetAlpha(1.0);
	return 0;
}
c_Gold_Aztec.m_Vizual_Game=function(){
	if(c_Gold_Aztec.m_Flag_Complete>0){
		bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_Koridor,240.0,310.0,0.0,c_Gold_Aztec.m_MKor,c_Gold_Aztec.m_MKor,0);
		var t_Sm_BmX=(((240.0-240.0*c_Gold_Aztec.m_MKor)/c_Gold_Aztec.m_MKor)|0);
		var t_Sm_BmY=(((310.0-310.0*c_Gold_Aztec.m_MKor)/c_Gold_Aztec.m_MKor)|0);
		bb_graphics_Scale(c_Gold_Aztec.m_MKor,c_Gold_Aztec.m_MKor);
		c_Gold_Aztec.m_Viz_BlokKristall2(t_Sm_BmX,t_Sm_BmY);
		bb_graphics_Scale(1.0/c_Gold_Aztec.m_MKor,1.0/c_Gold_Aztec.m_MKor);
		if(c_Gold_Aztec.m_Flag_Stena==1){
			bb_graphics_SetAlpha(c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor*c_Gold_Aztec.m_MKor);
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_Stena,240.0,310.0,0.0,c_Gold_Aztec.m_MKor,c_Gold_Aztec.m_MKor,0);
			bb_graphics_SetAlpha(1.0);
		}
		var t_PBlikL2=.0;
		var t_PBlikP2=.0;
		t_PBlikL2=bb_random_Rnd2(0.01,0.15);
		t_PBlikP2=bb_random_Rnd2(0.01,0.15);
		bb_graphics_SetAlpha(t_PBlikL2);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF2,180.0-c_Gold_Aztec.m_MKor*400.0,120.0,0);
		bb_graphics_SetAlpha(1.0);
		bb_graphics_SetAlpha(t_PBlikP2);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF2,200.0+c_Gold_Aztec.m_MKor*350.0,120.0,0);
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_FireF[c_Gold_Aztec.m_Frame_FireL],248.0-c_Gold_Aztec.m_MKor*400.0,233.0-c_Gold_Aztec.m_MKor*30.0,0.0,0.4+c_Gold_Aztec.m_MKor,0.4+c_Gold_Aztec.m_MKor,0);
		bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_FireF[c_Gold_Aztec.m_Frame_FireP],214.0+c_Gold_Aztec.m_MKor*350.0,233.0-c_Gold_Aztec.m_MKor*30.0,0.0,0.4+c_Gold_Aztec.m_MKor,0.4+c_Gold_Aztec.m_MKor,0);
		bb_graphics_SetAlpha(c_Gold_Aztec.m_Alpha_Sunduk);
		if(c_Gold_Aztec.m_Flag_Complete>4){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Tap,7.0,210.0,0);
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[0],122.0,330.0,0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Sunduk[c_Gold_Aztec.m_Frame_Sunduk],122.0,330.0,0);
		if(c_Gold_Aztec.m_Flag_Complete>3){
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_StarS,147.0,302.0,0.0,c_Gold_Aztec.m_M_StarL[1],c_Gold_Aztec.m_M_StarL[1],0);
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_StarS,194.0,302.0,0.0,c_Gold_Aztec.m_M_StarL[2],c_Gold_Aztec.m_M_StarL[2],0);
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_StarS,241.0,302.0,0.0,c_Gold_Aztec.m_M_StarL[3],c_Gold_Aztec.m_M_StarL[3],0);
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_StarS,288.0,302.0,0.0,c_Gold_Aztec.m_M_StarL[4],c_Gold_Aztec.m_M_StarL[4],0);
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_StarS,335.0,302.0,0.0,c_Gold_Aztec.m_M_StarL[5],c_Gold_Aztec.m_M_StarL[5],0);
		}
		var t_X1S_ScoL=0;
		var t_DT_VScoreL=((Math.floor((c_Gold_Aztec.m_Score_Level/10000)|0))|0);
		var t_T_VScoreL=((Math.floor(((c_Gold_Aztec.m_Score_Level-t_DT_VScoreL*10000)/1000)|0))|0);
		var t_S_VScoreL=((Math.floor(((c_Gold_Aztec.m_Score_Level-t_DT_VScoreL*10000-t_T_VScoreL*1000)/100)|0))|0);
		var t_D_VScoreL=((Math.floor(((c_Gold_Aztec.m_Score_Level-t_DT_VScoreL*10000-t_T_VScoreL*1000-t_S_VScoreL*100)/10)|0))|0);
		var t_E_VScoreL=c_Gold_Aztec.m_Score_Level-t_DT_VScoreL*10000-t_T_VScoreL*1000-t_S_VScoreL*100-t_D_VScoreL*10;
		if(c_Gold_Aztec.m_Score_Level<100000){
			t_X1S_ScoL=136;
		}
		if(c_Gold_Aztec.m_Score_Level<10000){
			t_X1S_ScoL=157;
		}
		if(c_Gold_Aztec.m_Score_Level<1000){
			t_X1S_ScoL=178;
		}
		if(c_Gold_Aztec.m_Score_Level<100){
			t_X1S_ScoL=199;
		}
		if(c_Gold_Aztec.m_Score_Level<10){
			t_X1S_ScoL=220;
		}
		if(c_Gold_Aztec.m_Score_Level>9999){
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_CifraS[t_DT_VScoreL],(t_X1S_ScoL),(435-c_Gold_Aztec.m_Frame_Sunduk*5),0.0,1.0,(c_Gold_Aztec.m_Frame_Sunduk-1)*0.06,0);
			t_X1S_ScoL=t_X1S_ScoL+42;
		}
		if(c_Gold_Aztec.m_Score_Level>999){
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_CifraS[t_T_VScoreL],(t_X1S_ScoL),(435-c_Gold_Aztec.m_Frame_Sunduk*5),0.0,1.0,(c_Gold_Aztec.m_Frame_Sunduk-1)*0.06,0);
			t_X1S_ScoL=t_X1S_ScoL+42;
		}
		if(c_Gold_Aztec.m_Score_Level>99){
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_CifraS[t_S_VScoreL],(t_X1S_ScoL),(435-c_Gold_Aztec.m_Frame_Sunduk*5),0.0,1.0,(c_Gold_Aztec.m_Frame_Sunduk-1)*0.06,0);
			t_X1S_ScoL=t_X1S_ScoL+42;
		}
		if(c_Gold_Aztec.m_Score_Level>9){
			bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_CifraS[t_D_VScoreL],(t_X1S_ScoL),(435-c_Gold_Aztec.m_Frame_Sunduk*5),0.0,1.0,(c_Gold_Aztec.m_Frame_Sunduk-1)*0.06,0);
			t_X1S_ScoL=t_X1S_ScoL+42;
		}
		bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_CifraS[t_E_VScoreL],(t_X1S_ScoL),(435-c_Gold_Aztec.m_Frame_Sunduk*5),0.0,1.0,(c_Gold_Aztec.m_Frame_Sunduk-1)*0.06,0);
		bb_graphics_SetAlpha(c_Gold_Aztec.m_Alpha_Sunduk/2.0);
		var t_Frame_Gold=0;
		t_Frame_Gold=((bb_random_Rnd2(0.0,6.0))|0);
		bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_GoldBlik[t_Frame_Gold],240.0,430.0,0.0,1.6,(c_Gold_Aztec.m_Frame_Sunduk-1)*0.06,0);
		bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_GoldBlik[t_Frame_Gold],170.0,435.0,0.0,0.8,(c_Gold_Aztec.m_Frame_Sunduk-1)*0.04,0);
		bb_graphics_DrawImage2(c_Gold_Aztec.m_Im_GoldBlik[t_Frame_Gold],300.0,435.0,0.0,0.8,(c_Gold_Aztec.m_Frame_Sunduk-1)*0.04,0);
		bb_graphics_SetAlpha(1.0);
		if(c_Gold_Aztec.m_Flag_Complete==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_KromkaL,230.0-(c_Gold_Aztec.m_SmX_Blok)*0.958333,70.0,0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_KromkaP,240.0+(c_Gold_Aztec.m_SmX_Blok)*0.958333,70.0,0);
		}
	}
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoVerh,0.0,0.0,0);
	var t_DT_Schet=((Math.floor((c_Gold_Aztec.m_Schet/10000)|0))|0);
	var t_T_Schet=((Math.floor(((c_Gold_Aztec.m_Schet-t_DT_Schet*10000)/1000)|0))|0);
	var t_S_Schet=((Math.floor(((c_Gold_Aztec.m_Schet-t_DT_Schet*10000-t_T_Schet*1000)/100)|0))|0);
	var t_D_Schet=((Math.floor(((c_Gold_Aztec.m_Schet-t_DT_Schet*10000-t_T_Schet*1000-t_S_Schet*100)/10)|0))|0);
	var t_E_Schet=c_Gold_Aztec.m_Schet-t_DT_Schet*10000-t_T_Schet*1000-t_S_Schet*100-t_D_Schet*10;
	var t_CF_DT=t_DT_Schet*10;
	var t_CF_T=t_T_Schet*10;
	var t_CF_S=t_S_Schet*10;
	var t_CF_D=t_D_Schet*10;
	var t_CF_E=t_E_Schet*10;
	if(c_Gold_Aztec.m_Frame_Schet[1]<t_CF_DT){
		c_Gold_Aztec.m_Frame_Schet[1]=c_Gold_Aztec.m_Frame_Schet[1]+1;
	}
	if(c_Gold_Aztec.m_Frame_Schet[1]>t_CF_DT){
		if(t_CF_DT==0 && c_Gold_Aztec.m_Frame_Schet[1]>=90){
			c_Gold_Aztec.m_Frame_Schet[1]=c_Gold_Aztec.m_Frame_Schet[1]+1;
			if(c_Gold_Aztec.m_Frame_Schet[1]>99){
				c_Gold_Aztec.m_Frame_Schet[1]=0;
			}
		}else{
			c_Gold_Aztec.m_Frame_Schet[1]=c_Gold_Aztec.m_Frame_Schet[1]-1;
		}
	}
	if(c_Gold_Aztec.m_Frame_Schet[2]<t_CF_T){
		c_Gold_Aztec.m_Frame_Schet[2]=c_Gold_Aztec.m_Frame_Schet[2]+1;
	}
	if(c_Gold_Aztec.m_Frame_Schet[2]>t_CF_T){
		if(t_CF_T==0 && c_Gold_Aztec.m_Frame_Schet[2]>=90){
			c_Gold_Aztec.m_Frame_Schet[2]=c_Gold_Aztec.m_Frame_Schet[2]+1;
			if(c_Gold_Aztec.m_Frame_Schet[2]>99){
				c_Gold_Aztec.m_Frame_Schet[2]=0;
			}
		}else{
			c_Gold_Aztec.m_Frame_Schet[2]=c_Gold_Aztec.m_Frame_Schet[2]-1;
		}
	}
	if(c_Gold_Aztec.m_Frame_Schet[3]<t_CF_S){
		c_Gold_Aztec.m_Frame_Schet[3]=c_Gold_Aztec.m_Frame_Schet[3]+1;
	}
	if(c_Gold_Aztec.m_Frame_Schet[3]>t_CF_S){
		if(t_CF_S==0 && c_Gold_Aztec.m_Frame_Schet[3]>=90){
			c_Gold_Aztec.m_Frame_Schet[3]=c_Gold_Aztec.m_Frame_Schet[3]+1;
			if(c_Gold_Aztec.m_Frame_Schet[3]>99){
				c_Gold_Aztec.m_Frame_Schet[3]=0;
			}
		}else{
			c_Gold_Aztec.m_Frame_Schet[3]=c_Gold_Aztec.m_Frame_Schet[3]-1;
		}
	}
	if(c_Gold_Aztec.m_Frame_Schet[4]<t_CF_D){
		c_Gold_Aztec.m_Frame_Schet[4]=c_Gold_Aztec.m_Frame_Schet[4]+1;
	}
	if(c_Gold_Aztec.m_Frame_Schet[4]>t_CF_D){
		if(t_CF_D==0 && c_Gold_Aztec.m_Frame_Schet[4]>=90){
			c_Gold_Aztec.m_Frame_Schet[4]=c_Gold_Aztec.m_Frame_Schet[4]+1;
			if(c_Gold_Aztec.m_Frame_Schet[4]>99){
				c_Gold_Aztec.m_Frame_Schet[4]=0;
			}
		}else{
			c_Gold_Aztec.m_Frame_Schet[4]=c_Gold_Aztec.m_Frame_Schet[4]-1;
		}
	}
	if(c_Gold_Aztec.m_Frame_Schet[5]<t_CF_E){
		c_Gold_Aztec.m_Frame_Schet[5]=c_Gold_Aztec.m_Frame_Schet[5]+1;
	}
	if(c_Gold_Aztec.m_Frame_Schet[5]>t_CF_E){
		if(t_CF_E==0 && c_Gold_Aztec.m_Frame_Schet[5]>=90){
			c_Gold_Aztec.m_Frame_Schet[5]=c_Gold_Aztec.m_Frame_Schet[5]+1;
			if(c_Gold_Aztec.m_Frame_Schet[5]>99){
				c_Gold_Aztec.m_Frame_Schet[5]=0;
			}
		}else{
			c_Gold_Aztec.m_Frame_Schet[5]=c_Gold_Aztec.m_Frame_Schet[5]-1;
		}
	}
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[1]],140.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[2]],180.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[3]],220.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[4]],260.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[5]],300.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoNiz,0.0,550.0,0);
	c_Gold_Aztec.m_Viz_BlokKristall();
	if(c_Gold_Aztec.m_Flag_Stena==1 && c_Gold_Aztec.m_MKor==1.0){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Stena,240.0,310.0,0);
	}
	var t_PBlikL=.0;
	var t_PBlikP=.0;
	t_PBlikL=bb_random_Rnd2(0.01,0.15);
	t_PBlikP=bb_random_Rnd2(0.01,0.15);
	bb_graphics_SetAlpha(t_PBlikL);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,1.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetAlpha(t_PBlikP);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,350.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireL],45.0,520.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireP],390.0,520.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKN],2.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_MapL,140.0,15.0,0);
	var t_X1S_LevM=0;
	var t_S_LevelM=((Math.floor((c_Gold_Aztec.m_N_Level/100)|0))|0);
	var t_D_LevelM=((Math.floor(((c_Gold_Aztec.m_N_Level-t_S_LevelM*100)/10)|0))|0);
	var t_E_LevelM=c_Gold_Aztec.m_N_Level-t_S_LevelM*100-t_D_LevelM*10;
	t_X1S_LevM=270;
	if(c_Gold_Aztec.m_N_Level>99){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_S_LevelM],(t_X1S_LevM),15.0,0);
		t_X1S_LevM=t_X1S_LevM+26;
	}
	if(c_Gold_Aztec.m_N_Level>9){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_D_LevelM],(t_X1S_LevM),15.0,0);
		t_X1S_LevM=t_X1S_LevM+26;
	}
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_E_LevelM],(t_X1S_LevM),15.0,0);
	if(c_Gold_Aztec.m_Pauza==1){
		bb_graphics_SetAlpha(0.7);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_FonTab,0.0,210.0,0);
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Quit,0.0,210.0,0);
	}
	return 0;
}
c_Gold_Aztec.m_Vizual_Smena_Game_GlMeny=function(){
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoVerh,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKN],2.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_MapL,140.0,15.0,0);
	var t_X1S_LevM=0;
	var t_S_LevelM=((Math.floor((c_Gold_Aztec.m_N_Level/100)|0))|0);
	var t_D_LevelM=((Math.floor(((c_Gold_Aztec.m_N_Level-t_S_LevelM*100)/10)|0))|0);
	var t_E_LevelM=c_Gold_Aztec.m_N_Level-t_S_LevelM*100-t_D_LevelM*10;
	t_X1S_LevM=270;
	if(c_Gold_Aztec.m_N_Level>99){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_S_LevelM],(t_X1S_LevM),15.0,0);
		t_X1S_LevM=t_X1S_LevM+26;
	}
	if(c_Gold_Aztec.m_N_Level>9){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_D_LevelM],(t_X1S_LevM),15.0,0);
		t_X1S_LevM=t_X1S_LevM+26;
	}
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraR[t_E_LevelM],(t_X1S_LevM),15.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[1]],140.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[2]],180.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[3]],220.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[4]],260.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[5]],300.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoNiz,0.0,550.0,0);
	c_Gold_Aztec.m_Viz_BlokKristall();
	if(c_Gold_Aztec.m_Flag_Stena==1 && c_Gold_Aztec.m_MKor==1.0){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Stena,240.0,310.0,0);
	}
	var t_PBlikL=.0;
	var t_PBlikP=.0;
	t_PBlikL=bb_random_Rnd2(c_Gold_Aztec.m_Proz_Screen*0.01,c_Gold_Aztec.m_Proz_Screen*0.15);
	t_PBlikP=bb_random_Rnd2(c_Gold_Aztec.m_Proz_Screen*0.01,c_Gold_Aztec.m_Proz_Screen*0.15);
	bb_graphics_SetAlpha(t_PBlikL);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,1.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetAlpha(t_PBlikP);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,350.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireL],45.0,520.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireP],390.0,520.0,0);
	bb_graphics_SetAlpha(c_Gold_Aztec.m_Proz_Screen);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlokMeny,30.0,(c_Gold_Aztec.m_Y_Meny),0);
	if(c_Gold_Aztec.m_Flag_Sound==1){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_SoundOn,35.0,(c_Gold_Aztec.m_Y_Meny+105),0);
	}
	if(c_Gold_Aztec.m_Flag_Music==1){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_MusicOn,380.0,(c_Gold_Aztec.m_Y_Meny+105),0);
	}
	bb_graphics_SetAlpha(1.0);
	return 0;
}
c_Gold_Aztec.m_Text_List=function(){
	if(c_Gold_Aztec.m_Y_List+7<c_Gold_Aztec.m_Y_RulonN){
		if(c_Gold_Aztec.m_Viz_Star[1]>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[c_Gold_Aztec.m_Viz_Star[1]],30.0,(c_Gold_Aztec.m_Y_List+7),0);
		}
	}
	if(c_Gold_Aztec.m_Y_List+7<c_Gold_Aztec.m_Y_RulonN){
		if(c_Gold_Aztec.m_Viz_Star[2]>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[c_Gold_Aztec.m_Viz_Star[2]],252.0,(c_Gold_Aztec.m_Y_List+7),0);
		}
	}
	if(c_Gold_Aztec.m_Y_List+189<c_Gold_Aztec.m_Y_RulonN){
		if(c_Gold_Aztec.m_Viz_Star[3]>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[c_Gold_Aztec.m_Viz_Star[3]],30.0,(c_Gold_Aztec.m_Y_List+189),0);
		}
	}
	if(c_Gold_Aztec.m_Y_List+189<c_Gold_Aztec.m_Y_RulonN){
		if(c_Gold_Aztec.m_Viz_Star[4]>0){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[c_Gold_Aztec.m_Viz_Star[4]],252.0,(c_Gold_Aztec.m_Y_List+189),0);
		}
	}
	if(c_Gold_Aztec.m_Y_List+61<c_Gold_Aztec.m_Y_RulonN){
		var t_X1S_Lev1=0;
		var t_S_VLevel1=((Math.floor((c_Gold_Aztec.m_Viz_Level[1]/100)|0))|0);
		var t_D_VLevel1=((Math.floor(((c_Gold_Aztec.m_Viz_Level[1]-t_S_VLevel1*100)/10)|0))|0);
		var t_E_VLevel1=c_Gold_Aztec.m_Viz_Level[1]-t_S_VLevel1*100-t_D_VLevel1*10;
		t_X1S_Lev1=149;
		if(c_Gold_Aztec.m_Viz_Level[1]>99){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VLevel1],(t_X1S_Lev1),(c_Gold_Aztec.m_Y_List+61),0);
			t_X1S_Lev1=t_X1S_Lev1+25;
		}
		if(c_Gold_Aztec.m_Viz_Level[1]>9){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VLevel1],(t_X1S_Lev1),(c_Gold_Aztec.m_Y_List+61),0);
			t_X1S_Lev1=t_X1S_Lev1+25;
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VLevel1],(t_X1S_Lev1),(c_Gold_Aztec.m_Y_List+61),0);
	}
	if(c_Gold_Aztec.m_Y_List+61<c_Gold_Aztec.m_Y_RulonN){
		var t_X1S_Lev2=0;
		var t_S_VLevel2=((Math.floor((c_Gold_Aztec.m_Viz_Level[2]/100)|0))|0);
		var t_D_VLevel2=((Math.floor(((c_Gold_Aztec.m_Viz_Level[2]-t_S_VLevel2*100)/10)|0))|0);
		var t_E_VLevel2=c_Gold_Aztec.m_Viz_Level[2]-t_S_VLevel2*100-t_D_VLevel2*10;
		t_X1S_Lev2=370;
		if(c_Gold_Aztec.m_Viz_Level[2]>99){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VLevel2],(t_X1S_Lev2),(c_Gold_Aztec.m_Y_List+61),0);
			t_X1S_Lev2=t_X1S_Lev2+25;
		}
		if(c_Gold_Aztec.m_Viz_Level[2]>9){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VLevel2],(t_X1S_Lev2),(c_Gold_Aztec.m_Y_List+61),0);
			t_X1S_Lev2=t_X1S_Lev2+25;
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VLevel2],(t_X1S_Lev2),(c_Gold_Aztec.m_Y_List+61),0);
	}
	if(c_Gold_Aztec.m_Y_List+242<c_Gold_Aztec.m_Y_RulonN){
		var t_X1S_Lev3=0;
		var t_S_VLevel3=((Math.floor((c_Gold_Aztec.m_Viz_Level[3]/100)|0))|0);
		var t_D_VLevel3=((Math.floor(((c_Gold_Aztec.m_Viz_Level[3]-t_S_VLevel3*100)/10)|0))|0);
		var t_E_VLevel3=c_Gold_Aztec.m_Viz_Level[3]-t_S_VLevel3*100-t_D_VLevel3*10;
		t_X1S_Lev3=149;
		if(c_Gold_Aztec.m_Viz_Level[3]>99){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VLevel3],(t_X1S_Lev3),(c_Gold_Aztec.m_Y_List+242),0);
			t_X1S_Lev3=t_X1S_Lev3+25;
		}
		if(c_Gold_Aztec.m_Viz_Level[3]>9){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VLevel3],(t_X1S_Lev3),(c_Gold_Aztec.m_Y_List+242),0);
			t_X1S_Lev3=t_X1S_Lev3+25;
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VLevel3],(t_X1S_Lev3),(c_Gold_Aztec.m_Y_List+242),0);
	}
	if(c_Gold_Aztec.m_Y_List+242<c_Gold_Aztec.m_Y_RulonN){
		var t_X1S_Lev4=0;
		var t_S_VLevel4=((Math.floor((c_Gold_Aztec.m_Viz_Level[4]/100)|0))|0);
		var t_D_VLevel4=((Math.floor(((c_Gold_Aztec.m_Viz_Level[4]-t_S_VLevel4*100)/10)|0))|0);
		var t_E_VLevel4=c_Gold_Aztec.m_Viz_Level[4]-t_S_VLevel4*100-t_D_VLevel4*10;
		t_X1S_Lev4=370;
		if(c_Gold_Aztec.m_Viz_Level[4]>99){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VLevel4],(t_X1S_Lev4),(c_Gold_Aztec.m_Y_List+242),0);
			t_X1S_Lev4=t_X1S_Lev4+25;
		}
		if(c_Gold_Aztec.m_Viz_Level[4]>9){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VLevel4],(t_X1S_Lev4),(c_Gold_Aztec.m_Y_List+242),0);
			t_X1S_Lev4=t_X1S_Lev4+25;
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VLevel4],(t_X1S_Lev4),(c_Gold_Aztec.m_Y_List+242),0);
	}
	if(c_Gold_Aztec.m_Y_List+135<c_Gold_Aztec.m_Y_RulonN){
		var t_X1S_Sco1=0;
		var t_DT_VScore1=((Math.floor((c_Gold_Aztec.m_Viz_Score[1]/10000)|0))|0);
		var t_T_VScore1=((Math.floor(((c_Gold_Aztec.m_Viz_Score[1]-t_DT_VScore1*10000)/1000)|0))|0);
		var t_S_VScore1=((Math.floor(((c_Gold_Aztec.m_Viz_Score[1]-t_DT_VScore1*10000-t_T_VScore1*1000)/100)|0))|0);
		var t_D_VScore1=((Math.floor(((c_Gold_Aztec.m_Viz_Score[1]-t_DT_VScore1*10000-t_T_VScore1*1000-t_S_VScore1*100)/10)|0))|0);
		var t_E_VScore1=c_Gold_Aztec.m_Viz_Score[1]-t_DT_VScore1*10000-t_T_VScore1*1000-t_S_VScore1*100-t_D_VScore1*10;
		if(c_Gold_Aztec.m_Viz_Score[1]<100000){
			t_X1S_Sco1=68;
		}
		if(c_Gold_Aztec.m_Viz_Score[1]<10000){
			t_X1S_Sco1=81;
		}
		if(c_Gold_Aztec.m_Viz_Score[1]<1000){
			t_X1S_Sco1=93;
		}
		if(c_Gold_Aztec.m_Viz_Score[1]<100){
			t_X1S_Sco1=106;
		}
		if(c_Gold_Aztec.m_Viz_Score[1]<10){
			t_X1S_Sco1=118;
		}
		if(c_Gold_Aztec.m_Viz_Score[1]>9999){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_DT_VScore1],(t_X1S_Sco1),(c_Gold_Aztec.m_Y_List+135),0);
			t_X1S_Sco1=t_X1S_Sco1+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[1]>999){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_T_VScore1],(t_X1S_Sco1),(c_Gold_Aztec.m_Y_List+135),0);
			t_X1S_Sco1=t_X1S_Sco1+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[1]>99){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VScore1],(t_X1S_Sco1),(c_Gold_Aztec.m_Y_List+135),0);
			t_X1S_Sco1=t_X1S_Sco1+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[1]>9){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VScore1],(t_X1S_Sco1),(c_Gold_Aztec.m_Y_List+135),0);
			t_X1S_Sco1=t_X1S_Sco1+25;
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VScore1],(t_X1S_Sco1),(c_Gold_Aztec.m_Y_List+135),0);
	}
	if(c_Gold_Aztec.m_Y_List+135<c_Gold_Aztec.m_Y_RulonN){
		var t_X1S_Sco2=0;
		var t_DT_VScore2=((Math.floor((c_Gold_Aztec.m_Viz_Score[2]/10000)|0))|0);
		var t_T_VScore2=((Math.floor(((c_Gold_Aztec.m_Viz_Score[2]-t_DT_VScore2*10000)/1000)|0))|0);
		var t_S_VScore2=((Math.floor(((c_Gold_Aztec.m_Viz_Score[2]-t_DT_VScore2*10000-t_T_VScore2*1000)/100)|0))|0);
		var t_D_VScore2=((Math.floor(((c_Gold_Aztec.m_Viz_Score[2]-t_DT_VScore2*10000-t_T_VScore2*1000-t_S_VScore2*100)/10)|0))|0);
		var t_E_VScore2=c_Gold_Aztec.m_Viz_Score[2]-t_DT_VScore2*10000-t_T_VScore2*1000-t_S_VScore2*100-t_D_VScore2*10;
		if(c_Gold_Aztec.m_Viz_Score[2]<100000){
			t_X1S_Sco2=289;
		}
		if(c_Gold_Aztec.m_Viz_Score[2]<10000){
			t_X1S_Sco2=302;
		}
		if(c_Gold_Aztec.m_Viz_Score[2]<1000){
			t_X1S_Sco2=314;
		}
		if(c_Gold_Aztec.m_Viz_Score[2]<100){
			t_X1S_Sco2=327;
		}
		if(c_Gold_Aztec.m_Viz_Score[2]<10){
			t_X1S_Sco2=339;
		}
		if(c_Gold_Aztec.m_Viz_Score[2]>9999){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_DT_VScore2],(t_X1S_Sco2),(c_Gold_Aztec.m_Y_List+135),0);
			t_X1S_Sco2=t_X1S_Sco2+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[2]>999){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_T_VScore2],(t_X1S_Sco2),(c_Gold_Aztec.m_Y_List+135),0);
			t_X1S_Sco2=t_X1S_Sco2+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[2]>99){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VScore2],(t_X1S_Sco2),(c_Gold_Aztec.m_Y_List+135),0);
			t_X1S_Sco2=t_X1S_Sco2+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[2]>9){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VScore2],(t_X1S_Sco2),(c_Gold_Aztec.m_Y_List+135),0);
			t_X1S_Sco2=t_X1S_Sco2+25;
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VScore2],(t_X1S_Sco2),(c_Gold_Aztec.m_Y_List+135),0);
	}
	if(c_Gold_Aztec.m_Y_List+316<c_Gold_Aztec.m_Y_RulonN){
		var t_X1S_Sco3=0;
		var t_DT_VScore3=((Math.floor((c_Gold_Aztec.m_Viz_Score[3]/10000)|0))|0);
		var t_T_VScore3=((Math.floor(((c_Gold_Aztec.m_Viz_Score[3]-t_DT_VScore3*10000)/1000)|0))|0);
		var t_S_VScore3=((Math.floor(((c_Gold_Aztec.m_Viz_Score[3]-t_DT_VScore3*10000-t_T_VScore3*1000)/100)|0))|0);
		var t_D_VScore3=((Math.floor(((c_Gold_Aztec.m_Viz_Score[3]-t_DT_VScore3*10000-t_T_VScore3*1000-t_S_VScore3*100)/10)|0))|0);
		var t_E_VScore3=c_Gold_Aztec.m_Viz_Score[3]-t_DT_VScore3*10000-t_T_VScore3*1000-t_S_VScore3*100-t_D_VScore3*10;
		if(c_Gold_Aztec.m_Viz_Score[3]<100000){
			t_X1S_Sco3=68;
		}
		if(c_Gold_Aztec.m_Viz_Score[3]<10000){
			t_X1S_Sco3=81;
		}
		if(c_Gold_Aztec.m_Viz_Score[3]<1000){
			t_X1S_Sco3=93;
		}
		if(c_Gold_Aztec.m_Viz_Score[3]<100){
			t_X1S_Sco3=106;
		}
		if(c_Gold_Aztec.m_Viz_Score[3]<10){
			t_X1S_Sco3=118;
		}
		if(c_Gold_Aztec.m_Viz_Score[3]>9999){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_DT_VScore3],(t_X1S_Sco3),(c_Gold_Aztec.m_Y_List+316),0);
			t_X1S_Sco3=t_X1S_Sco3+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[3]>999){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_T_VScore3],(t_X1S_Sco3),(c_Gold_Aztec.m_Y_List+316),0);
			t_X1S_Sco3=t_X1S_Sco3+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[3]>99){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VScore3],(t_X1S_Sco3),(c_Gold_Aztec.m_Y_List+316),0);
			t_X1S_Sco3=t_X1S_Sco3+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[3]>9){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VScore3],(t_X1S_Sco3),(c_Gold_Aztec.m_Y_List+316),0);
			t_X1S_Sco3=t_X1S_Sco3+25;
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VScore3],(t_X1S_Sco3),(c_Gold_Aztec.m_Y_List+316),0);
	}
	if(c_Gold_Aztec.m_Y_List+316<c_Gold_Aztec.m_Y_RulonN){
		var t_X1S_Sco4=0;
		var t_DT_VScore4=((Math.floor((c_Gold_Aztec.m_Viz_Score[4]/10000)|0))|0);
		var t_T_VScore4=((Math.floor(((c_Gold_Aztec.m_Viz_Score[4]-t_DT_VScore4*10000)/1000)|0))|0);
		var t_S_VScore4=((Math.floor(((c_Gold_Aztec.m_Viz_Score[4]-t_DT_VScore4*10000-t_T_VScore4*1000)/100)|0))|0);
		var t_D_VScore4=((Math.floor(((c_Gold_Aztec.m_Viz_Score[4]-t_DT_VScore4*10000-t_T_VScore4*1000-t_S_VScore4*100)/10)|0))|0);
		var t_E_VScore4=c_Gold_Aztec.m_Viz_Score[4]-t_DT_VScore4*10000-t_T_VScore4*1000-t_S_VScore4*100-t_D_VScore4*10;
		if(c_Gold_Aztec.m_Viz_Score[4]<100000){
			t_X1S_Sco4=289;
		}
		if(c_Gold_Aztec.m_Viz_Score[4]<10000){
			t_X1S_Sco4=302;
		}
		if(c_Gold_Aztec.m_Viz_Score[4]<1000){
			t_X1S_Sco4=314;
		}
		if(c_Gold_Aztec.m_Viz_Score[4]<100){
			t_X1S_Sco4=327;
		}
		if(c_Gold_Aztec.m_Viz_Score[4]<10){
			t_X1S_Sco4=339;
		}
		if(c_Gold_Aztec.m_Viz_Score[4]>9999){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_DT_VScore4],(t_X1S_Sco4),(c_Gold_Aztec.m_Y_List+316),0);
			t_X1S_Sco4=t_X1S_Sco4+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[4]>999){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_T_VScore4],(t_X1S_Sco4),(c_Gold_Aztec.m_Y_List+316),0);
			t_X1S_Sco4=t_X1S_Sco4+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[4]>99){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VScore4],(t_X1S_Sco4),(c_Gold_Aztec.m_Y_List+316),0);
			t_X1S_Sco4=t_X1S_Sco4+25;
		}
		if(c_Gold_Aztec.m_Viz_Score[4]>9){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VScore4],(t_X1S_Sco4),(c_Gold_Aztec.m_Y_List+316),0);
			t_X1S_Sco4=t_X1S_Sco4+25;
		}
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VScore4],(t_X1S_Sco4),(c_Gold_Aztec.m_Y_List+316),0);
	}
	if(c_Gold_Aztec.m_Flag_Dostup[1]==0 && c_Gold_Aztec.m_Y_List+86<c_Gold_Aztec.m_Y_RulonN){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,50.0,(c_Gold_Aztec.m_Y_List+86),0);
	}
	if(c_Gold_Aztec.m_Flag_Dostup[2]==0 && c_Gold_Aztec.m_Y_List+86<c_Gold_Aztec.m_Y_RulonN){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,270.0,(c_Gold_Aztec.m_Y_List+86),0);
	}
	if(c_Gold_Aztec.m_Flag_Dostup[3]==0 && c_Gold_Aztec.m_Y_List+266<c_Gold_Aztec.m_Y_RulonN){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,50.0,(c_Gold_Aztec.m_Y_List+266),0);
	}
	if(c_Gold_Aztec.m_Flag_Dostup[4]==0 && c_Gold_Aztec.m_Y_List+266<c_Gold_Aztec.m_Y_RulonN){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,270.0,(c_Gold_Aztec.m_Y_List+266),0);
	}
	if(c_Gold_Aztec.m_Flag_Listanie>0){
		var t_Sm_List=0;
		if(c_Gold_Aztec.m_Flag_Listanie==1){
			t_Sm_List=440;
		}
		if(c_Gold_Aztec.m_Flag_Listanie==2){
			t_Sm_List=-440;
		}
		if(c_Gold_Aztec.m_Y_List+7+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			if(c_Gold_Aztec.m_Viz_Star[5]>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[c_Gold_Aztec.m_Viz_Star[5]],30.0,(c_Gold_Aztec.m_Y_List+7+t_Sm_List),0);
			}
		}
		if(c_Gold_Aztec.m_Y_List+7+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			if(c_Gold_Aztec.m_Viz_Star[6]>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[c_Gold_Aztec.m_Viz_Star[6]],252.0,(c_Gold_Aztec.m_Y_List+7+t_Sm_List),0);
			}
		}
		if(c_Gold_Aztec.m_Y_List+189+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			if(c_Gold_Aztec.m_Viz_Star[7]>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[c_Gold_Aztec.m_Viz_Star[7]],30.0,(c_Gold_Aztec.m_Y_List+189+t_Sm_List),0);
			}
		}
		if(c_Gold_Aztec.m_Y_List+189+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			if(c_Gold_Aztec.m_Viz_Star[8]>0){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Star[c_Gold_Aztec.m_Viz_Star[8]],252.0,(c_Gold_Aztec.m_Y_List+189+t_Sm_List),0);
			}
		}
		if(c_Gold_Aztec.m_Y_List+61+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			var t_X1S_Lev5=0;
			var t_S_VLevel5=((Math.floor((c_Gold_Aztec.m_Viz_Level[5]/100)|0))|0);
			var t_D_VLevel5=((Math.floor(((c_Gold_Aztec.m_Viz_Level[5]-t_S_VLevel5*100)/10)|0))|0);
			var t_E_VLevel5=c_Gold_Aztec.m_Viz_Level[5]-t_S_VLevel5*100-t_D_VLevel5*10;
			t_X1S_Lev5=149;
			if(c_Gold_Aztec.m_Viz_Level[5]>99){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VLevel5],(t_X1S_Lev5),(c_Gold_Aztec.m_Y_List+61+t_Sm_List),0);
				t_X1S_Lev5=t_X1S_Lev5+25;
			}
			if(c_Gold_Aztec.m_Viz_Level[5]>9){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VLevel5],(t_X1S_Lev5),(c_Gold_Aztec.m_Y_List+61+t_Sm_List),0);
				t_X1S_Lev5=t_X1S_Lev5+25;
			}
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VLevel5],(t_X1S_Lev5),(c_Gold_Aztec.m_Y_List+61+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Y_List+61+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			var t_X1S_Lev6=0;
			var t_S_VLevel6=((Math.floor((c_Gold_Aztec.m_Viz_Level[6]/100)|0))|0);
			var t_D_VLevel6=((Math.floor(((c_Gold_Aztec.m_Viz_Level[6]-t_S_VLevel6*100)/10)|0))|0);
			var t_E_VLevel6=c_Gold_Aztec.m_Viz_Level[6]-t_S_VLevel6*100-t_D_VLevel6*10;
			t_X1S_Lev6=370;
			if(c_Gold_Aztec.m_Viz_Level[6]>99){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VLevel6],(t_X1S_Lev6),(c_Gold_Aztec.m_Y_List+61+t_Sm_List),0);
				t_X1S_Lev6=t_X1S_Lev6+25;
			}
			if(c_Gold_Aztec.m_Viz_Level[6]>9){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VLevel6],(t_X1S_Lev6),(c_Gold_Aztec.m_Y_List+61+t_Sm_List),0);
				t_X1S_Lev6=t_X1S_Lev6+25;
			}
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VLevel6],(t_X1S_Lev6),(c_Gold_Aztec.m_Y_List+61+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Y_List+242+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			var t_X1S_Lev7=0;
			var t_S_VLevel7=((Math.floor((c_Gold_Aztec.m_Viz_Level[7]/100)|0))|0);
			var t_D_VLevel7=((Math.floor(((c_Gold_Aztec.m_Viz_Level[7]-t_S_VLevel7*100)/10)|0))|0);
			var t_E_VLevel7=c_Gold_Aztec.m_Viz_Level[7]-t_S_VLevel7*100-t_D_VLevel7*10;
			t_X1S_Lev7=149;
			if(c_Gold_Aztec.m_Viz_Level[7]>99){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VLevel7],(t_X1S_Lev7),(c_Gold_Aztec.m_Y_List+242+t_Sm_List),0);
				t_X1S_Lev7=t_X1S_Lev7+25;
			}
			if(c_Gold_Aztec.m_Viz_Level[7]>9){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VLevel7],(t_X1S_Lev7),(c_Gold_Aztec.m_Y_List+242+t_Sm_List),0);
				t_X1S_Lev7=t_X1S_Lev7+25;
			}
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VLevel7],(t_X1S_Lev7),(c_Gold_Aztec.m_Y_List+242+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Y_List+242+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			var t_X1S_Lev8=0;
			var t_S_VLevel8=((Math.floor((c_Gold_Aztec.m_Viz_Level[8]/100)|0))|0);
			var t_D_VLevel8=((Math.floor(((c_Gold_Aztec.m_Viz_Level[8]-t_S_VLevel8*100)/10)|0))|0);
			var t_E_VLevel8=c_Gold_Aztec.m_Viz_Level[8]-t_S_VLevel8*100-t_D_VLevel8*10;
			t_X1S_Lev8=370;
			if(c_Gold_Aztec.m_Viz_Level[8]>99){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VLevel8],(t_X1S_Lev8),(c_Gold_Aztec.m_Y_List+242+t_Sm_List),0);
				t_X1S_Lev8=t_X1S_Lev8+25;
			}
			if(c_Gold_Aztec.m_Viz_Level[8]>9){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VLevel8],(t_X1S_Lev8),(c_Gold_Aztec.m_Y_List+242+t_Sm_List),0);
				t_X1S_Lev8=t_X1S_Lev8+25;
			}
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VLevel8],(t_X1S_Lev8),(c_Gold_Aztec.m_Y_List+242+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Y_List+135+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			var t_X1S_Sco5=0;
			var t_DT_VScore5=((Math.floor((c_Gold_Aztec.m_Viz_Score[5]/10000)|0))|0);
			var t_T_VScore5=((Math.floor(((c_Gold_Aztec.m_Viz_Score[5]-t_DT_VScore5*10000)/1000)|0))|0);
			var t_S_VScore5=((Math.floor(((c_Gold_Aztec.m_Viz_Score[5]-t_DT_VScore5*10000-t_T_VScore5*1000)/100)|0))|0);
			var t_D_VScore5=((Math.floor(((c_Gold_Aztec.m_Viz_Score[5]-t_DT_VScore5*10000-t_T_VScore5*1000-t_S_VScore5*100)/10)|0))|0);
			var t_E_VScore5=c_Gold_Aztec.m_Viz_Score[5]-t_DT_VScore5*10000-t_T_VScore5*1000-t_S_VScore5*100-t_D_VScore5*10;
			if(c_Gold_Aztec.m_Viz_Score[5]<100000){
				t_X1S_Sco5=68;
			}
			if(c_Gold_Aztec.m_Viz_Score[5]<10000){
				t_X1S_Sco5=81;
			}
			if(c_Gold_Aztec.m_Viz_Score[5]<1000){
				t_X1S_Sco5=93;
			}
			if(c_Gold_Aztec.m_Viz_Score[5]<100){
				t_X1S_Sco5=106;
			}
			if(c_Gold_Aztec.m_Viz_Score[5]<10){
				t_X1S_Sco5=118;
			}
			if(c_Gold_Aztec.m_Viz_Score[5]>9999){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_DT_VScore5],(t_X1S_Sco5),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
				t_X1S_Sco5=t_X1S_Sco5+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[5]>999){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_T_VScore5],(t_X1S_Sco5),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
				t_X1S_Sco5=t_X1S_Sco5+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[5]>99){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VScore5],(t_X1S_Sco5),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
				t_X1S_Sco5=t_X1S_Sco5+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[5]>9){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VScore5],(t_X1S_Sco5),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
				t_X1S_Sco5=t_X1S_Sco5+25;
			}
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VScore5],(t_X1S_Sco5),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Y_List+135+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			var t_X1S_Sco6=0;
			var t_DT_VScore6=((Math.floor((c_Gold_Aztec.m_Viz_Score[6]/10000)|0))|0);
			var t_T_VScore6=((Math.floor(((c_Gold_Aztec.m_Viz_Score[6]-t_DT_VScore6*10000)/1000)|0))|0);
			var t_S_VScore6=((Math.floor(((c_Gold_Aztec.m_Viz_Score[6]-t_DT_VScore6*10000-t_T_VScore6*1000)/100)|0))|0);
			var t_D_VScore6=((Math.floor(((c_Gold_Aztec.m_Viz_Score[6]-t_DT_VScore6*10000-t_T_VScore6*1000-t_S_VScore6*100)/10)|0))|0);
			var t_E_VScore6=c_Gold_Aztec.m_Viz_Score[6]-t_DT_VScore6*10000-t_T_VScore6*1000-t_S_VScore6*100-t_D_VScore6*10;
			if(c_Gold_Aztec.m_Viz_Score[6]<100000){
				t_X1S_Sco6=289;
			}
			if(c_Gold_Aztec.m_Viz_Score[6]<10000){
				t_X1S_Sco6=302;
			}
			if(c_Gold_Aztec.m_Viz_Score[6]<1000){
				t_X1S_Sco6=314;
			}
			if(c_Gold_Aztec.m_Viz_Score[6]<100){
				t_X1S_Sco6=327;
			}
			if(c_Gold_Aztec.m_Viz_Score[6]<10){
				t_X1S_Sco6=339;
			}
			if(c_Gold_Aztec.m_Viz_Score[6]>9999){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_DT_VScore6],(t_X1S_Sco6),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
				t_X1S_Sco6=t_X1S_Sco6+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[6]>999){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_T_VScore6],(t_X1S_Sco6),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
				t_X1S_Sco6=t_X1S_Sco6+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[6]>99){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VScore6],(t_X1S_Sco6),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
				t_X1S_Sco6=t_X1S_Sco6+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[6]>9){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VScore6],(t_X1S_Sco6),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
				t_X1S_Sco6=t_X1S_Sco6+25;
			}
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VScore6],(t_X1S_Sco6),(c_Gold_Aztec.m_Y_List+135+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Y_List+316+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			var t_X1S_Sco7=0;
			var t_DT_VScore7=((Math.floor((c_Gold_Aztec.m_Viz_Score[7]/10000)|0))|0);
			var t_T_VScore7=((Math.floor(((c_Gold_Aztec.m_Viz_Score[7]-t_DT_VScore7*10000)/1000)|0))|0);
			var t_S_VScore7=((Math.floor(((c_Gold_Aztec.m_Viz_Score[7]-t_DT_VScore7*10000-t_T_VScore7*1000)/100)|0))|0);
			var t_D_VScore7=((Math.floor(((c_Gold_Aztec.m_Viz_Score[7]-t_DT_VScore7*10000-t_T_VScore7*1000-t_S_VScore7*100)/10)|0))|0);
			var t_E_VScore7=c_Gold_Aztec.m_Viz_Score[7]-t_DT_VScore7*10000-t_T_VScore7*1000-t_S_VScore7*100-t_D_VScore7*10;
			if(c_Gold_Aztec.m_Viz_Score[7]<100000){
				t_X1S_Sco7=68;
			}
			if(c_Gold_Aztec.m_Viz_Score[7]<10000){
				t_X1S_Sco7=81;
			}
			if(c_Gold_Aztec.m_Viz_Score[7]<1000){
				t_X1S_Sco7=93;
			}
			if(c_Gold_Aztec.m_Viz_Score[7]<100){
				t_X1S_Sco7=106;
			}
			if(c_Gold_Aztec.m_Viz_Score[7]<10){
				t_X1S_Sco7=118;
			}
			if(c_Gold_Aztec.m_Viz_Score[7]>9999){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_DT_VScore7],(t_X1S_Sco7),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
				t_X1S_Sco7=t_X1S_Sco7+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[7]>999){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_T_VScore7],(t_X1S_Sco7),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
				t_X1S_Sco7=t_X1S_Sco7+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[7]>99){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VScore7],(t_X1S_Sco7),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
				t_X1S_Sco7=t_X1S_Sco7+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[7]>9){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VScore7],(t_X1S_Sco7),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
				t_X1S_Sco7=t_X1S_Sco7+25;
			}
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VScore7],(t_X1S_Sco7),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Y_List+316+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			var t_X1S_Sco8=0;
			var t_DT_VScore8=((Math.floor((c_Gold_Aztec.m_Viz_Score[8]/10000)|0))|0);
			var t_T_VScore8=((Math.floor(((c_Gold_Aztec.m_Viz_Score[8]-t_DT_VScore8*10000)/1000)|0))|0);
			var t_S_VScore8=((Math.floor(((c_Gold_Aztec.m_Viz_Score[8]-t_DT_VScore8*10000-t_T_VScore8*1000)/100)|0))|0);
			var t_D_VScore8=((Math.floor(((c_Gold_Aztec.m_Viz_Score[8]-t_DT_VScore8*10000-t_T_VScore8*1000-t_S_VScore8*100)/10)|0))|0);
			var t_E_VScore8=c_Gold_Aztec.m_Viz_Score[8]-t_DT_VScore8*10000-t_T_VScore8*1000-t_S_VScore8*100-t_D_VScore8*10;
			if(c_Gold_Aztec.m_Viz_Score[8]<100000){
				t_X1S_Sco8=289;
			}
			if(c_Gold_Aztec.m_Viz_Score[8]<10000){
				t_X1S_Sco8=302;
			}
			if(c_Gold_Aztec.m_Viz_Score[8]<1000){
				t_X1S_Sco8=314;
			}
			if(c_Gold_Aztec.m_Viz_Score[8]<100){
				t_X1S_Sco8=327;
			}
			if(c_Gold_Aztec.m_Viz_Score[8]<10){
				t_X1S_Sco8=339;
			}
			if(c_Gold_Aztec.m_Viz_Score[8]>9999){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_DT_VScore8],(t_X1S_Sco8),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
				t_X1S_Sco8=t_X1S_Sco8+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[8]>999){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_T_VScore8],(t_X1S_Sco8),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
				t_X1S_Sco8=t_X1S_Sco8+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[8]>99){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_S_VScore8],(t_X1S_Sco8),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
				t_X1S_Sco8=t_X1S_Sco8+25;
			}
			if(c_Gold_Aztec.m_Viz_Score[8]>9){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_D_VScore8],(t_X1S_Sco8),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
				t_X1S_Sco8=t_X1S_Sco8+25;
			}
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraL[t_E_VScore8],(t_X1S_Sco8),(c_Gold_Aztec.m_Y_List+316+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Flag_Dostup[5]==0 && c_Gold_Aztec.m_Y_List+86+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,50.0,(c_Gold_Aztec.m_Y_List+86+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Flag_Dostup[6]==0 && c_Gold_Aztec.m_Y_List+86+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,270.0,(c_Gold_Aztec.m_Y_List+86+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Flag_Dostup[7]==0 && c_Gold_Aztec.m_Y_List+266+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,50.0,(c_Gold_Aztec.m_Y_List+266+t_Sm_List),0);
		}
		if(c_Gold_Aztec.m_Flag_Dostup[8]==0 && c_Gold_Aztec.m_Y_List+266+t_Sm_List<c_Gold_Aztec.m_Y_RulonN){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Close,270.0,(c_Gold_Aztec.m_Y_List+266+t_Sm_List),0);
		}
	}
	return 0;
}
c_Gold_Aztec.m_Vizual_Smena_Game_Level=function(){
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoVerh,0.0,0.0,0);
	c_Gold_Aztec.m_Viz_BlokKristall();
	if(c_Gold_Aztec.m_Flag_Stena==1 && c_Gold_Aztec.m_MKor==1.0){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Stena,240.0,310.0,0);
	}
	bb_graphics_DrawImageRect(c_Gold_Aztec.m_Im_ListKarta,8.0,(c_Gold_Aztec.m_Y_List),0,0,464,c_Gold_Aztec.m_Y_RulonN+6-c_Gold_Aztec.m_Y_List,0);
	c_Gold_Aztec.m_Text_List();
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_VerhMask,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[1]],140.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[2]],180.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[3]],220.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[4]],260.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[5]],300.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoNiz,0.0,550.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKV],2.0,(c_Gold_Aztec.m_Y_RulonV),0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKN],2.0,(c_Gold_Aztec.m_Y_RulonN),0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Up,215.0,(c_Gold_Aztec.m_Y_RulonV+22),0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Down,188.0,(c_Gold_Aztec.m_Y_RulonN+13),0);
	var t_PBlikL=.0;
	var t_PBlikP=.0;
	t_PBlikL=bb_random_Rnd2(0.01,0.15);
	t_PBlikP=bb_random_Rnd2(0.01,0.15);
	bb_graphics_SetAlpha(t_PBlikL);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,1.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetAlpha(t_PBlikP);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,350.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireL],45.0,520.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireP],390.0,520.0,0);
	return 0;
}
c_Gold_Aztec.m_Vizual_Level=function(){
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoVerh,0.0,0.0,0);
	c_Gold_Aztec.m_Viz_BlokKristall();
	if(c_Gold_Aztec.m_Flag_Stena==1 && c_Gold_Aztec.m_MKor==1.0){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Stena,240.0,310.0,0);
	}
	var t_9=c_Gold_Aztec.m_Flag_Listanie;
	if(t_9==0){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_ListKarta,8.0,(c_Gold_Aztec.m_Y_List),0);
		c_Gold_Aztec.m_Text_List();
		if(c_Gold_Aztec.m_X_Ukaz>0 && c_Gold_Aztec.m_Y_Ukaz>0){
			bb_graphics_SetAlpha(0.5);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Ukaz[c_Gold_Aztec.m_Frame_Ukaz],(c_Gold_Aztec.m_X_Ukaz),(c_Gold_Aztec.m_Y_Ukaz),0);
			bb_graphics_SetAlpha(1.0);
		}
	}else{
		if(t_9==1){
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_ListKarta,8.0,(c_Gold_Aztec.m_Y_List),0);
			bb_graphics_DrawImage(c_Gold_Aztec.m_Im_ListKarta,8.0,(c_Gold_Aztec.m_Y_List+440),0);
			c_Gold_Aztec.m_Text_List();
		}else{
			if(t_9==2){
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_ListKarta,8.0,(c_Gold_Aztec.m_Y_List),0);
				bb_graphics_DrawImage(c_Gold_Aztec.m_Im_ListKarta,8.0,(c_Gold_Aztec.m_Y_List-440),0);
				c_Gold_Aztec.m_Text_List();
			}
		}
	}
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_VerhMask,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[1]],140.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[2]],180.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[3]],220.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[4]],260.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[5]],300.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoNiz,0.0,550.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKV],2.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKN],2.0,490.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Up,215.0,22.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Down,188.0,503.0,0);
	var t_PBlikL=.0;
	var t_PBlikP=.0;
	t_PBlikL=bb_random_Rnd2(0.01,0.15);
	t_PBlikP=bb_random_Rnd2(0.01,0.15);
	bb_graphics_SetAlpha(t_PBlikL);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,1.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetAlpha(t_PBlikP);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,350.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireL],45.0,520.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireP],390.0,520.0,0);
	return 0;
}
c_Gold_Aztec.m_Vizual_Smena_Level_Game=function(){
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoVerh,0.0,0.0,0);
	c_Gold_Aztec.m_Viz_BlokKristall();
	if(c_Gold_Aztec.m_Flag_Stena==1 && c_Gold_Aztec.m_MKor==1.0){
		bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Stena,240.0,310.0,0);
	}
	bb_graphics_DrawImageRect(c_Gold_Aztec.m_Im_ListKarta,8.0,(c_Gold_Aztec.m_Y_List),0,0,464,c_Gold_Aztec.m_Y_RulonN+6-c_Gold_Aztec.m_Y_List,0);
	c_Gold_Aztec.m_Text_List();
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_VerhMask,0.0,0.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[1]],140.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[2]],180.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[3]],220.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[4]],260.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_CifraB[c_Gold_Aztec.m_Frame_Schet[5]],300.0,611.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_OknoNiz,0.0,550.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKV],2.0,(c_Gold_Aztec.m_Y_RulonV),0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Rulon[c_Gold_Aztec.m_Frame_RulonKN],2.0,(c_Gold_Aztec.m_Y_RulonN),0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Up,215.0,(c_Gold_Aztec.m_Y_RulonV+22),0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Down,188.0,(c_Gold_Aztec.m_Y_RulonN+13),0);
	var t_PBlikL=.0;
	var t_PBlikP=.0;
	t_PBlikL=bb_random_Rnd2(0.01,0.15);
	t_PBlikP=bb_random_Rnd2(0.01,0.15);
	bb_graphics_SetAlpha(t_PBlikL);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,1.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetAlpha(t_PBlikP);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_BlikF,350.0,550.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireL],45.0,520.0,0);
	bb_graphics_DrawImage(c_Gold_Aztec.m_Im_Fire[c_Gold_Aztec.m_Frame_FireP],390.0,520.0,0);
	return 0;
}
c_Gold_Aztec.prototype.p_OnRender=function(){
	bb_graphics_PushMatrix();
	bb_graphics_Scale(c_Gold_Aztec.m_RX_Ekr,c_Gold_Aztec.m_RY_Ekr);
	bb_graphics_Cls(0.0,0.0,0.0);
	var t_2=c_Gold_Aztec.m_Regim;
	if(t_2==0){
		c_Gold_Aztec.m_Vizual_Zastavka();
	}else{
		if(t_2==1){
			c_Gold_Aztec.m_Vizual_Smena_Zastavka_GlMeny();
		}else{
			if(t_2==2){
				c_Gold_Aztec.m_Vizual_GlMeny();
			}else{
				if(t_2==3){
					c_Gold_Aztec.m_Vizual_Smena_GlMeny_Game();
				}else{
					if(t_2==4){
						c_Gold_Aztec.m_Vizual_Game();
					}else{
						if(t_2==5){
							c_Gold_Aztec.m_Vizual_Smena_Game_GlMeny();
						}else{
							if(t_2==6){
								c_Gold_Aztec.m_Vizual_Smena_Game_Level();
							}else{
								if(t_2==7){
									c_Gold_Aztec.m_Vizual_Level();
								}else{
									if(t_2==8){
										c_Gold_Aztec.m_Vizual_Smena_Level_Game();
									}
								}
							}
						}
					}
				}
			}
		}
	}
	bb_graphics_PopMatrix();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app_ValidateDeviceWindow(false);
	bb_app_EnumDisplayModes();
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	bb_app_ValidateDeviceWindow(true);
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	bb_app_ValidateDeviceWindow(true);
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
	if(t_event!=1){
		return;
	}
	var t_1=t_data;
	if(t_1==432){
		bb_app__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app__app.p_OnBack();
		}
	}
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
c_GameDelegate.prototype.FileDropEvent=function(t_filename){
	bb_app__app.p_OnFileDrop(t_filename);
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	c_Gold_Aztec.m_new.call(new c_Gold_Aztec);
	return 0;
}
function c_ConstInfo(){
	Object.call(this);
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_FieldInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__type=null;
}
c_FieldInfo.m_new=function(t_name,t_attrs,t_type){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__type=t_type;
	return this;
}
c_FieldInfo.m_new2=function(){
	return this;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	return this;
}
c_Stack2.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push4(t_values[t_offset+t_i]);
	}
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
}
c_Stack2.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_GlobalInfo(){
	Object.call(this);
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	return this;
}
c_Stack3.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack3.prototype.p_Push7=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push7(t_values[t_offset+t_i]);
	}
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
}
c_Stack3.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_MethodInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__retType=null;
	this.m__argTypes=[];
}
c_MethodInfo.m_new=function(t_name,t_attrs,t_retType,t_argTypes){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__retType=t_retType;
	this.m__argTypes=t_argTypes;
	return this;
}
c_MethodInfo.m_new2=function(){
	return this;
}
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	return this;
}
c_Stack4.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack4.prototype.p_Push10=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack4.prototype.p_Push11=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push10(t_values[t_offset+t_i]);
	}
}
c_Stack4.prototype.p_Push12=function(t_values,t_offset){
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
}
c_Stack4.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	return this;
}
c_Stack5.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack5.prototype.p_Push13=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack5.prototype.p_Push14=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push13(t_values[t_offset+t_i]);
	}
}
c_Stack5.prototype.p_Push15=function(t_values,t_offset){
	this.p_Push14(t_values,t_offset,t_values.length-t_offset);
}
c_Stack5.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_R18(){
	c_FieldInfo.call(this);
}
c_R18.prototype=extend_class(c_FieldInfo);
c_R18.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__boolClass);
	return this;
}
function c_R20(){
	c_MethodInfo.call(this);
}
c_R20.prototype=extend_class(c_MethodInfo);
c_R20.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToBool",0,bb_reflection__boolClass,[]);
	return this;
}
function c_R21(){
	c_MethodInfo.call(this);
}
c_R21.prototype=extend_class(c_MethodInfo);
c_R21.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[1]]);
	return this;
}
function c_R19(){
	c_FunctionInfo.call(this);
}
c_R19.prototype=extend_class(c_FunctionInfo);
c_R19.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[1],[bb_reflection__boolClass]);
	return this;
}
function c_R22(){
	c_FunctionInfo.call(this);
}
c_R22.prototype=extend_class(c_FunctionInfo);
c_R22.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[1],[]);
	return this;
}
function c_R24(){
	c_FieldInfo.call(this);
}
c_R24.prototype=extend_class(c_FieldInfo);
c_R24.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__intClass);
	return this;
}
function c_R27(){
	c_MethodInfo.call(this);
}
c_R27.prototype=extend_class(c_MethodInfo);
c_R27.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToInt",0,bb_reflection__intClass,[]);
	return this;
}
function c_R28(){
	c_MethodInfo.call(this);
}
c_R28.prototype=extend_class(c_MethodInfo);
c_R28.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToFloat",0,bb_reflection__floatClass,[]);
	return this;
}
function c_R29(){
	c_MethodInfo.call(this);
}
c_R29.prototype=extend_class(c_MethodInfo);
c_R29.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
function c_R30(){
	c_MethodInfo.call(this);
}
c_R30.prototype=extend_class(c_MethodInfo);
c_R30.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[2]]);
	return this;
}
function c_R31(){
	c_MethodInfo.call(this);
}
c_R31.prototype=extend_class(c_MethodInfo);
c_R31.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[2]]);
	return this;
}
function c_R25(){
	c_FunctionInfo.call(this);
}
c_R25.prototype=extend_class(c_FunctionInfo);
c_R25.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[2],[bb_reflection__intClass]);
	return this;
}
function c_R26(){
	c_FunctionInfo.call(this);
}
c_R26.prototype=extend_class(c_FunctionInfo);
c_R26.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[2],[bb_reflection__floatClass]);
	return this;
}
function c_R32(){
	c_FunctionInfo.call(this);
}
c_R32.prototype=extend_class(c_FunctionInfo);
c_R32.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[2],[]);
	return this;
}
function c_R34(){
	c_FieldInfo.call(this);
}
c_R34.prototype=extend_class(c_FieldInfo);
c_R34.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__floatClass);
	return this;
}
function c_R37(){
	c_MethodInfo.call(this);
}
c_R37.prototype=extend_class(c_MethodInfo);
c_R37.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToInt",0,bb_reflection__intClass,[]);
	return this;
}
function c_R38(){
	c_MethodInfo.call(this);
}
c_R38.prototype=extend_class(c_MethodInfo);
c_R38.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToFloat",0,bb_reflection__floatClass,[]);
	return this;
}
function c_R39(){
	c_MethodInfo.call(this);
}
c_R39.prototype=extend_class(c_MethodInfo);
c_R39.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
function c_R40(){
	c_MethodInfo.call(this);
}
c_R40.prototype=extend_class(c_MethodInfo);
c_R40.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[3]]);
	return this;
}
function c_R41(){
	c_MethodInfo.call(this);
}
c_R41.prototype=extend_class(c_MethodInfo);
c_R41.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[3]]);
	return this;
}
function c_R35(){
	c_FunctionInfo.call(this);
}
c_R35.prototype=extend_class(c_FunctionInfo);
c_R35.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[3],[bb_reflection__intClass]);
	return this;
}
function c_R36(){
	c_FunctionInfo.call(this);
}
c_R36.prototype=extend_class(c_FunctionInfo);
c_R36.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[3],[bb_reflection__floatClass]);
	return this;
}
function c_R42(){
	c_FunctionInfo.call(this);
}
c_R42.prototype=extend_class(c_FunctionInfo);
c_R42.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[3],[]);
	return this;
}
function c_R44(){
	c_FieldInfo.call(this);
}
c_R44.prototype=extend_class(c_FieldInfo);
c_R44.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__stringClass);
	return this;
}
function c_R48(){
	c_MethodInfo.call(this);
}
c_R48.prototype=extend_class(c_MethodInfo);
c_R48.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
function c_R49(){
	c_MethodInfo.call(this);
}
c_R49.prototype=extend_class(c_MethodInfo);
c_R49.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[4]]);
	return this;
}
function c_R50(){
	c_MethodInfo.call(this);
}
c_R50.prototype=extend_class(c_MethodInfo);
c_R50.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[4]]);
	return this;
}
function c_R45(){
	c_FunctionInfo.call(this);
}
c_R45.prototype=extend_class(c_FunctionInfo);
c_R45.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[4],[bb_reflection__intClass]);
	return this;
}
function c_R46(){
	c_FunctionInfo.call(this);
}
c_R46.prototype=extend_class(c_FunctionInfo);
c_R46.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[4],[bb_reflection__floatClass]);
	return this;
}
function c_R47(){
	c_FunctionInfo.call(this);
}
c_R47.prototype=extend_class(c_FunctionInfo);
c_R47.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[4],[bb_reflection__stringClass]);
	return this;
}
function c_R51(){
	c_FunctionInfo.call(this);
}
c_R51.prototype=extend_class(c_FunctionInfo);
c_R51.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[4],[]);
	return this;
}
function c_R54(){
	c_FieldInfo.call(this);
}
c_R54.prototype=extend_class(c_FieldInfo);
c_R54.m_new=function(){
	c_FieldInfo.m_new.call(this,"message",2,bb_reflection__stringClass);
	return this;
}
function c_R55(){
	c_FieldInfo.call(this);
}
c_R55.prototype=extend_class(c_FieldInfo);
c_R55.m_new=function(){
	c_FieldInfo.m_new.call(this,"cause",2,bb_reflection__classes[5]);
	return this;
}
function c_R56(){
	c_FieldInfo.call(this);
}
c_R56.prototype=extend_class(c_FieldInfo);
c_R56.m_new=function(){
	c_FieldInfo.m_new.call(this,"type",2,bb_reflection__stringClass);
	return this;
}
function c_R57(){
	c_FieldInfo.call(this);
}
c_R57.prototype=extend_class(c_FieldInfo);
c_R57.m_new=function(){
	c_FieldInfo.m_new.call(this,"fullType",2,bb_reflection__stringClass);
	return this;
}
function c_R58(){
	c_MethodInfo.call(this);
}
c_R58.prototype=extend_class(c_MethodInfo);
c_R58.m_new=function(){
	c_MethodInfo.m_new.call(this,"Message",8,bb_reflection__stringClass,[]);
	return this;
}
function c_R59(){
	c_MethodInfo.call(this);
}
c_R59.prototype=extend_class(c_MethodInfo);
c_R59.m_new=function(){
	c_MethodInfo.m_new.call(this,"Message",8,null,[bb_reflection__stringClass]);
	return this;
}
function c_R60(){
	c_MethodInfo.call(this);
}
c_R60.prototype=extend_class(c_MethodInfo);
c_R60.m_new=function(){
	c_MethodInfo.m_new.call(this,"Cause",8,bb_reflection__classes[5],[]);
	return this;
}
function c_R61(){
	c_MethodInfo.call(this);
}
c_R61.prototype=extend_class(c_MethodInfo);
c_R61.m_new=function(){
	c_MethodInfo.m_new.call(this,"Cause",8,null,[bb_reflection__classes[5]]);
	return this;
}
function c_R62(){
	c_MethodInfo.call(this);
}
c_R62.prototype=extend_class(c_MethodInfo);
c_R62.m_new=function(){
	c_MethodInfo.m_new.call(this,"Type",8,bb_reflection__stringClass,[]);
	return this;
}
function c_R63(){
	c_MethodInfo.call(this);
}
c_R63.prototype=extend_class(c_MethodInfo);
c_R63.m_new=function(){
	c_MethodInfo.m_new.call(this,"FullType",8,bb_reflection__stringClass,[]);
	return this;
}
function c_R65(){
	c_MethodInfo.call(this);
}
c_R65.prototype=extend_class(c_MethodInfo);
c_R65.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[bb_reflection__boolClass]);
	return this;
}
function c_R64(){
	c_FunctionInfo.call(this);
}
c_R64.prototype=extend_class(c_FunctionInfo);
c_R64.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[6],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R67(){
	c_FunctionInfo.call(this);
}
c_R67.prototype=extend_class(c_FunctionInfo);
c_R67.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[7],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R69(){
	c_FunctionInfo.call(this);
}
c_R69.prototype=extend_class(c_FunctionInfo);
c_R69.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[8],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R71(){
	c_FunctionInfo.call(this);
}
c_R71.prototype=extend_class(c_FunctionInfo);
c_R71.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[9],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R73(){
	c_FunctionInfo.call(this);
}
c_R73.prototype=extend_class(c_FunctionInfo);
c_R73.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[10],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R75(){
	c_FunctionInfo.call(this);
}
c_R75.prototype=extend_class(c_FunctionInfo);
c_R75.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[11],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R77(){
	c_FunctionInfo.call(this);
}
c_R77.prototype=extend_class(c_FunctionInfo);
c_R77.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[12],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R79(){
	c_FunctionInfo.call(this);
}
c_R79.prototype=extend_class(c_FunctionInfo);
c_R79.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[13],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_UnknownClass(){
	c_ClassInfo.call(this);
}
c_UnknownClass.prototype=extend_class(c_ClassInfo);
c_UnknownClass.m_new=function(){
	c_ClassInfo.m_new.call(this,"?",0,null,[]);
	return this;
}
var bb_reflection__unknownClass=null;
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
	return 0;
}
function c_Font(){
	Object.call(this);
	this.m__pages=[];
	this.m__pageCount=0;
	this.m__firstChar=0;
	this.m__height=.0;
	this.m__charMap=c_IntMap.m_new.call(new c_IntMap);
}
c_Font.m_new=function(t_pages,t_pageCount,t_chars,t_firstChar,t_height){
	this.m__pages=t_pages;
	this.m__pageCount=t_pageCount;
	this.m__firstChar=t_firstChar;
	this.m__height=t_height;
	this.m__charMap=t_chars;
	return this;
}
c_Font.m_new2=function(){
	return this;
}
c_Font.m_Load=function(t_path,t_firstChar,t_numChars,t_padded){
	var t_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	var t__pages=new_object_array(1);
	t__pages[0]=t_image;
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	var t__pageCount=1;
	if(!((t_image)!=null)){
		return null;
	}
	var t_cellWidth=((t_image.p_Width()/t_numChars)|0);
	var t_cellHeight=t_image.p_Height();
	var t_glyphX=0;
	var t_glyphY=0;
	var t_glyphWidth=t_cellWidth;
	var t_glyphHeight=t_cellHeight;
	if(t_padded==true){
		t_glyphX+=1;
		t_glyphY+=1;
		t_glyphWidth-=2;
		t_glyphHeight-=2;
	}
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		var t_y=((t_i/t_w)|0);
		var t_x=t_i % t_w;
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		t__charMap.p_Add(t_firstChar+t_i,t_glyph);
	}
	return c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
}
c_Font.m_Load2=function(t_path,t_cellWidth,t_cellHeight,t_glyphX,t_glyphY,t_glyphWidth,t_glyphHeight,t_firstChar,t_numChars){
	var t_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	var t__pages=new_object_array(1);
	t__pages[0]=t_image;
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	var t__pageCount=1;
	if(!((t_image)!=null)){
		return null;
	}
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		var t_y=((t_i/t_w)|0);
		var t_x=t_i % t_w;
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		t__charMap.p_Add(t_firstChar+t_i,t_glyph);
	}
	return c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
}
c_Font.m_Load3=function(t_url,t_flags){
	var t_iniText="";
	var t_pageNum=0;
	var t_idnum=0;
	var t_tmpChar=null;
	var t_plLen=0;
	var t_lines=[];
	var t_filename="";
	var t_lineHeight=0;
	var t__pages=[];
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	var t__pageCount=0;
	var t_path="";
	if(t_url.indexOf("/",0)>-1){
		var t_pl=t_url.split("/");
		t_plLen=t_pl.length;
		for(var t_pi=0;t_pi<=t_plLen-2;t_pi=t_pi+1){
			t_path=t_path+t_pl[t_pi]+"/";
		}
	}
	if(t_url.indexOf(".txt",0)>0 || t_url.indexOf(".fnt",0)>0){
		t_iniText=bb_app_LoadString(t_url);
	}
	t_lines=t_iniText.split(String.fromCharCode(13)+String.fromCharCode(10));
	if(t_lines.length<2){
		t_lines=t_iniText.split(String.fromCharCode(10));
	}
	var t_=t_lines;
	var t_2=0;
	while(t_2<t_.length){
		var t_line=t_[t_2];
		t_2=t_2+1;
		t_line=string_trim(t_line);
		if(string_startswith(t_line,"info") || t_line==""){
			continue;
		}
		if(string_startswith(t_line,"padding")){
			continue;
		}
		if(string_startswith(t_line,"common")){
			var t_commondata=t_line.split(String.fromCharCode(32));
			var t_3=t_commondata;
			var t_4=0;
			while(t_4<t_3.length){
				var t_common=t_3[t_4];
				t_4=t_4+1;
				if(string_startswith(t_common,"lineHeight=")){
					var t_lnh=t_common.split("=");
					t_lnh[1]=string_trim(t_lnh[1]);
					t_lineHeight=parseInt((t_lnh[1]),10);
				}
				if(string_startswith(t_common,"pages=")){
					var t_lnh2=t_common.split("=");
					t_lnh2[1]=string_trim(t_lnh2[1]);
					t__pageCount=parseInt((t_lnh2[1]),10);
					t__pages=new_object_array(t__pageCount);
				}
			}
		}
		if(string_startswith(t_line,"page")){
			var t_pagedata=t_line.split(String.fromCharCode(32));
			var t_5=t_pagedata;
			var t_6=0;
			while(t_6<t_5.length){
				var t_data=t_5[t_6];
				t_6=t_6+1;
				if(string_startswith(t_data,"file=")){
					var t_fn=t_data.split("=");
					t_fn[1]=string_trim(t_fn[1]);
					t_filename=t_fn[1];
					if(t_filename.charCodeAt(0)==34){
						t_filename=t_filename.slice(1,t_filename.length-1);
					}
					t_filename=t_path+string_trim(t_filename);
					t__pages[t_pageNum]=bb_graphics_LoadImage(t_filename,1,t_flags);
					t_pageNum=t_pageNum+1;
				}
			}
		}
		if(string_startswith(t_line,"chars")){
			continue;
		}
		if(string_startswith(t_line,"char")){
			t_tmpChar=c_Glyph.m_new2.call(new c_Glyph);
			var t_linedata=t_line.split(String.fromCharCode(32));
			var t_7=t_linedata;
			var t_8=0;
			while(t_8<t_7.length){
				var t_data2=t_7[t_8];
				t_8=t_8+1;
				if(string_startswith(t_data2,"id=")){
					var t_idc=t_data2.split("=");
					t_idc[1]=string_trim(t_idc[1]);
					t_tmpChar.m_id=parseInt((t_idc[1]),10);
				}
				if(string_startswith(t_data2,"x=")){
					var t_xc=t_data2.split("=");
					t_xc[1]=string_trim(t_xc[1]);
					t_tmpChar.m_x=parseInt((t_xc[1]),10);
				}
				if(string_startswith(t_data2,"y=")){
					var t_yc=t_data2.split("=");
					t_yc[1]=string_trim(t_yc[1]);
					t_tmpChar.m_y=parseInt((t_yc[1]),10);
				}
				if(string_startswith(t_data2,"width=")){
					var t_wc=t_data2.split("=");
					t_wc[1]=string_trim(t_wc[1]);
					t_tmpChar.m_width=parseInt((t_wc[1]),10);
				}
				if(string_startswith(t_data2,"height=")){
					var t_hc=t_data2.split("=");
					t_hc[1]=string_trim(t_hc[1]);
					t_tmpChar.m_height=parseInt((t_hc[1]),10);
				}
				if(string_startswith(t_data2,"xoffset=")){
					var t_xoc=t_data2.split("=");
					t_xoc[1]=string_trim(t_xoc[1]);
					t_tmpChar.m_xoff=parseInt((t_xoc[1]),10);
				}
				if(string_startswith(t_data2,"yoffset=")){
					var t_yoc=t_data2.split("=");
					t_yoc[1]=string_trim(t_yoc[1]);
					t_tmpChar.m_yoff=parseInt((t_yoc[1]),10);
				}
				if(string_startswith(t_data2,"xadvance=")){
					var t_advc=t_data2.split("=");
					t_advc[1]=string_trim(t_advc[1]);
					t_tmpChar.m_advance=parseInt((t_advc[1]),10);
				}
				if(string_startswith(t_data2,"page=")){
					var t_advc2=t_data2.split("=");
					t_advc2[1]=string_trim(t_advc2[1]);
					t_tmpChar.m_page=parseInt((t_advc2[1]),10);
				}
			}
			t__charMap.p_Add(t_tmpChar.m_id,t_tmpChar);
		}
		continue;
	}
	return c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,-1,(t_lineHeight));
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	if((this.m_matDirty)!=0){
		bb_graphics_renderDevice.SetMatrix(bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics_context=null;
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init2=function(t_surf,t_nframes,t_iflags){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Init3=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_source=t_src;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_srcw){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Width=function(){
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	return this.m_height;
}
c_Image.prototype.p_GrabImage=function(t_x,t_y,t_width,t_height,t_nframes,t_flags){
	if(this.m_frames.length!=1){
		return null;
	}
	return (c_Image.m_new.call(new c_Image)).p_Init3(this.m_surface,t_x,t_y,t_width,t_height,t_nframes,t_flags,this,this.m_frames[0].m_x,this.m_frames[0].m_y,this.m_width,this.m_height);
}
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "cerberus://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,t_frameCount,t_flags);
	}else{
		bb_lang_DebugLog("Error - Unable to load image: "+t_path);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init3(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
	}else{
		bb_lang_DebugLog("Error - Unable to load image: "+t_path);
	}
	return null;
}
function c_Glyph(){
	Object.call(this);
	this.m_page=0;
	this.m_id=0;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_advance=0;
	this.m_xoff=0;
	this.m_yoff=0;
}
c_Glyph.m_new=function(t_page,t_id,t_x,t_y,t_width,t_height,t_advance){
	this.m_page=t_page;
	this.m_id=t_id;
	this.m_x=t_x;
	this.m_y=t_y;
	this.m_width=t_width;
	this.m_height=t_height;
	this.m_advance=t_advance;
	this.m_xoff=0;
	this.m_yoff=0;
	return this;
}
c_Glyph.m_new2=function(){
	return this;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Compare5=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Add=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare5(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return false;
			}
		}
	}
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_IntMap(){
	c_Map2.call(this);
}
c_IntMap.prototype=extend_class(c_Map2);
c_IntMap.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare5=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Node2(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
function bb_graphics_SetFont(t_font){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=c_Font.m_Load("mojo_font.png",32,96,true);
		}
		t_font=bb_graphics_context.m_defaultFont;
	}
	bb_graphics_context.m_font=t_font;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__mouseZ=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		return;
	}
	this.m__keyHit[t_key]+=1;
	this.m__keyHitQueue[this.m__keyHitPut]=t_key;
	this.m__keyHitPut+=1;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.p_PutKeyHit(t_key);
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		this.m__keyHit[this.m__keyHitQueue[t_i]]=0;
	}
	this.m__keyHitPut=0;
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_1=t_event;
	if(t_1==1){
		if(!this.m__keyDown[t_data]){
			this.m__keyDown[t_data]=true;
			this.p_PutKeyHit(t_data);
			if(t_data==1){
				this.m__keyDown[384]=true;
				this.p_PutKeyHit(384);
			}else{
				if(t_data==384){
					this.m__keyDown[1]=true;
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		if(t_1==2){
			if(this.m__keyDown[t_data]){
				this.m__keyDown[t_data]=false;
				if(t_data==1){
					this.m__keyDown[384]=false;
				}else{
					if(t_data==384){
						this.m__keyDown[1]=false;
					}
				}
			}
		}else{
			if(t_1==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_2=t_event;
	if(t_2==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_2==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_2==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__mouseZ=t_z;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_3=t_event;
	if(t_3==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_3==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_3==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_4=t_event;
	if(t_4==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
	return 0;
}
c_InputDevice.prototype.p_TouchX=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchX[t_index];
	}
	return 0.0;
}
c_InputDevice.prototype.p_TouchY=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchY[t_index];
	}
	return 0.0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
var bb_app__devWinWidth=0;
var bb_app__devWinHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	var t_winW=bb_app__game.GetDeviceWindowWidth();
	var t_winH=bb_app__game.GetDeviceWindowHeight();
	var t_w=bb_app__game.GetDeviceWidth();
	var t_h=bb_app__game.GetDeviceHeight();
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight && t_winW==bb_app__devWinWidth && t_winH==bb_app__devWinHeight){
		return;
	}
	bb_app__devWidth=t_w;
	bb_app__devHeight=t_h;
	bb_app__devWinWidth=t_winW;
	bb_app__devWinHeight=t_winH;
	if(t_notifyApp){
		bb_app__app.p_OnResize();
	}
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	this.m__width=t_width;
	this.m__height=t_height;
	return this;
}
c_DisplayMode.m_new2=function(){
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare5=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare5(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map3.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map3.prototype.p_Set2=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare5(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map3.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set2(t_key,t_value);
}
function c_IntMap2(){
	c_Map3.call(this);
}
c_IntMap2.prototype=extend_class(c_Map3);
c_IntMap2.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_IntMap2.prototype.p_Compare5=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Stack6(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack6.m_new=function(){
	return this;
}
c_Stack6.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack6.prototype.p_Push16=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack6.prototype.p_Push17=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push16(t_values[t_offset+t_i]);
	}
}
c_Stack6.prototype.p_Push18=function(t_values,t_offset){
	this.p_Push17(t_values,t_offset,t_values.length-t_offset);
}
c_Stack6.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Node3(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	var t_modes=bb_app__game.GetDisplayModes();
	var t_mmap=c_IntMap2.m_new.call(new c_IntMap2);
	var t_mstack=c_Stack6.m_new.call(new c_Stack6);
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		var t_w=t_modes[t_i].width;
		var t_h=t_modes[t_i].height;
		var t_size=t_w<<16|t_h;
		if(t_mmap.p_Contains2(t_size)){
		}else{
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,t_modes[t_i].width,t_modes[t_i].height);
			t_mmap.p_Insert(t_size,t_mode);
			t_mstack.p_Push16(t_mode);
		}
	}
	bb_app__displayModes=t_mstack.p_ToArray();
	var t_mode2=bb_app__game.GetDesktopMode();
	if((t_mode2)!=null){
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,t_mode2.width,t_mode2.height);
	}else{
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetColor2(t_rgb){
	bb_graphics_context.m_color_r=(t_rgb>>16&255);
	bb_graphics_context.m_color_g=(t_rgb>>8&255);
	bb_graphics_context.m_color_b=(t_rgb&255);
	bb_graphics_renderDevice.SetColor(bb_graphics_context.m_color_r,bb_graphics_context.m_color_g,bb_graphics_context.m_color_b);
	return 0;
}
function c_Color(){
	Object.call(this);
	this.m_r=0;
	this.m_g=0;
	this.m_b=0;
}
function bb_graphics_SetColor3(t_col){
	bb_graphics_context.m_color_r=(t_col.m_r);
	bb_graphics_context.m_color_g=(t_col.m_g);
	bb_graphics_context.m_color_b=(t_col.m_b);
	bb_graphics_renderDevice.SetColor(bb_graphics_context.m_color_r,bb_graphics_context.m_color_g,bb_graphics_context.m_color_b);
	bb_graphics_renderDevice.SetAlpha(bb_graphics_context.m_alpha);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	error("");
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(t_low,t_high){
	return bb_random_Rnd3(t_high-t_low)+t_low;
}
function bb_random_Rnd3(t_range){
	return bb_random_Rnd()*t_range;
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.m_new=function(t_sample){
	this.m_sample=t_sample;
	return this;
}
c_Sound.m_new2=function(){
	return this;
}
function bb_audio_LoadSound(t_path){
	var t_sample=bb_audio_device.LoadSample(bb_data_FixDataPath(t_path));
	if((t_sample)!=null){
		return c_Sound.m_new.call(new c_Sound,t_sample);
	}
	return null;
}
function bb_app_LoadState(){
	return bb_app__game.LoadState();
}
function bb_app_SaveState(t_state){
	bb_app__game.SaveState(t_state);
}
function bb_functions_Mid(t_str,t_pos,t_size){
	if(t_pos>t_str.length){
		return "";
	}
	t_pos-=1;
	if(t_size<0){
		return t_str.slice(t_pos);
	}
	if(t_pos<0){
		t_size=t_size+t_pos;
		t_pos=0;
	}
	if(t_pos+t_size>t_str.length){
		t_size=t_str.length-t_pos;
	}
	return t_str.slice(t_pos,t_pos+t_size);
}
function bb_audio_PlayMusic(t_path,t_flags){
	return bb_audio_device.PlayMusic(bb_data_FixDataPath(t_path),t_flags);
}
function bb_input_TouchHit(t_index){
	return bb_input_device.p_KeyHit(384+t_index);
}
function bb_input_TouchX(t_index){
	return bb_input_device.p_TouchX(t_index);
}
function bb_input_TouchY(t_index){
	return bb_input_device.p_TouchY(t_index);
}
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	if(((t_sound)!=null) && ((t_sound.m_sample)!=null)){
		bb_audio_device.PlaySample(t_sound.m_sample,t_channel,t_flags);
	}
	return 0;
}
function bb_audio_StopMusic(){
	bb_audio_device.StopMusic();
	return 0;
}
function bb_input_KeyHit(t_key){
	return bb_input_device.p_KeyHit(t_key);
}
function bb_graphics_PushMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp;
	if(t_sp==bb_graphics_context.m_matrixStack.length){
		bb_graphics_context.m_matrixStack=resize_number_array(bb_graphics_context.m_matrixStack,t_sp*2);
	}
	bb_graphics_context.m_matrixStack[t_sp+0]=bb_graphics_context.m_ix;
	bb_graphics_context.m_matrixStack[t_sp+1]=bb_graphics_context.m_iy;
	bb_graphics_context.m_matrixStack[t_sp+2]=bb_graphics_context.m_jx;
	bb_graphics_context.m_matrixStack[t_sp+3]=bb_graphics_context.m_jy;
	bb_graphics_context.m_matrixStack[t_sp+4]=bb_graphics_context.m_tx;
	bb_graphics_context.m_matrixStack[t_sp+5]=bb_graphics_context.m_ty;
	bb_graphics_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics_context.m_ix+t_iy*bb_graphics_context.m_jx;
	var t_iy2=t_ix*bb_graphics_context.m_iy+t_iy*bb_graphics_context.m_jy;
	var t_jx2=t_jx*bb_graphics_context.m_ix+t_jy*bb_graphics_context.m_jx;
	var t_jy2=t_jx*bb_graphics_context.m_iy+t_jy*bb_graphics_context.m_jy;
	var t_tx2=t_tx*bb_graphics_context.m_ix+t_ty*bb_graphics_context.m_jx+bb_graphics_context.m_tx;
	var t_ty2=t_tx*bb_graphics_context.m_iy+t_ty*bb_graphics_context.m_jy+bb_graphics_context.m_ty;
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics_Transform2(t_m){
	bb_graphics_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_Cls2(t_col){
	bb_graphics_renderDevice.Cls((t_col.m_r),(t_col.m_g),(t_col.m_b));
	return 0;
}
function bb_graphics_Cls3(t_rgb){
	var t_r=t_rgb>>16&255;
	var t_g=t_rgb>>8&255;
	var t_b=t_rgb&255;
	bb_graphics_renderDevice.Cls((t_r),(t_g),(t_b));
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_PopMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.m_matrixStack[t_sp+0],bb_graphics_context.m_matrixStack[t_sp+1],bb_graphics_context.m_matrixStack[t_sp+2],bb_graphics_context.m_matrixStack[t_sp+3],bb_graphics_context.m_matrixStack[t_sp+4],bb_graphics_context.m_matrixStack[t_sp+5]);
	bb_graphics_context.m_matrixSp=t_sp;
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,0.0,0.0);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bb_graphics_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,-t_image.m_tx+t_x,-t_image.m_ty+t_y,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	return 0;
}
function bb_graphics_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	bb_graphics_PopMatrix();
	return 0;
}
function bbInit(){
	bb_reflection__classesMap=null;
	bb_reflection__classes=[];
	bb_reflection__getClass=null;
	bb_reflection__boolClass=null;
	bb_reflection__intClass=null;
	bb_reflection__floatClass=null;
	bb_reflection__stringClass=null;
	bb_reflection__functions=[];
	bb_reflection__init=bb_reflection___init();
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_reflection__unknownClass=(c_UnknownClass.m_new.call(new c_UnknownClass));
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__devWinWidth=0;
	bb_app__devWinHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	c_Gold_Aztec.m_RX_Ekr=.0;
	c_Gold_Aztec.m_RY_Ekr=.0;
	bb_random_Seed=1234;
	c_Gold_Aztec.m_Baza_Level_Blok=new_string_array(201);
	c_Gold_Aztec.m_Baza_Level_Kris=new_string_array(201);
	c_Gold_Aztec.m_Hod5Star=new_number_array(201);
	c_Gold_Aztec.m_Flag_Load=0;
	c_Gold_Aztec.m_Flag_Help=0;
	c_Gold_Aztec.m_Y_Help=0;
	c_Gold_Aztec.m_Y_Meny=0;
	c_Gold_Aztec.m_Y_RulonV=0;
	c_Gold_Aztec.m_Y_RulonN=0;
	c_Gold_Aztec.m_Frame_FireL=0;
	c_Gold_Aztec.m_Frame_FireP=0;
	c_Gold_Aztec.m_Flag_Listanie=0;
	c_Gold_Aztec.m_Pauza=0;
	c_Gold_Aztec.m_Max_Level=0;
	c_Gold_Aztec.m_Flag_Stena=0;
	c_Gold_Aztec.m_EK_K1=new_number_array(2);
	c_Gold_Aztec.m_TK_K1=new_number_array(2);
	c_Gold_Aztec.m_EK_K2=new_number_array(2);
	c_Gold_Aztec.m_TK_K2=new_number_array(2);
	c_Gold_Aztec.m_EK_K3=new_number_array(2);
	c_Gold_Aztec.m_TK_K3=new_number_array(2);
	c_Gold_Aztec.m_EK_K4=new_number_array(2);
	c_Gold_Aztec.m_TK_K4=new_number_array(2);
	c_Gold_Aztec.m_EK_K5=new_number_array(2);
	c_Gold_Aztec.m_TK_K5=new_number_array(2);
	c_Gold_Aztec.m_EK_K6=new_number_array(2);
	c_Gold_Aztec.m_TK_K6=new_number_array(2);
	c_Gold_Aztec.m_EK_K7=new_number_array(2);
	c_Gold_Aztec.m_TK_K7=new_number_array(2);
	c_Gold_Aztec.m_EK_K8=new_number_array(2);
	c_Gold_Aztec.m_TK_K8=new_number_array(2);
	c_Gold_Aztec.m_EK_K9=new_number_array(2);
	c_Gold_Aztec.m_TK_K9=new_number_array(2);
	c_Gold_Aztec.m_EK_K10=new_number_array(2);
	c_Gold_Aztec.m_TK_K10=new_number_array(2);
	c_Gold_Aztec.m_EK_K11=new_number_array(2);
	c_Gold_Aztec.m_TK_K11=new_number_array(2);
	c_Gold_Aztec.m_EK_K12=new_number_array(2);
	c_Gold_Aztec.m_TK_K12=new_number_array(2);
	c_Gold_Aztec.m_EK_K13=new_number_array(2);
	c_Gold_Aztec.m_TK_K13=new_number_array(2);
	c_Gold_Aztec.m_EK_K14=new_number_array(2);
	c_Gold_Aztec.m_TK_K14=new_number_array(2);
	c_Gold_Aztec.m_EK_K15=new_number_array(2);
	c_Gold_Aztec.m_TK_K15=new_number_array(2);
	c_Gold_Aztec.m_EK_K16=new_number_array(2);
	c_Gold_Aztec.m_TK_K16=new_number_array(2);
	c_Gold_Aztec.m_Atlas_Image1=null;
	c_Gold_Aztec.m_Atlas_Image2=null;
	c_Gold_Aztec.m_Atlas_Image3=null;
	c_Gold_Aztec.m_Atlas_Image4=null;
	c_Gold_Aztec.m_Atlas_Image5=null;
	c_Gold_Aztec.m_Atlas_Image6=null;
	c_Gold_Aztec.m_Im_Zastavka=null;
	c_Gold_Aztec.m_Im_Loading=null;
	c_Gold_Aztec.m_Zv_Click=null;
	c_Gold_Aztec.m_Zv_Dveri=null;
	c_Gold_Aztec.m_Zv_Kristal=null;
	c_Gold_Aztec.m_Zv_Bumaga=null;
	c_Gold_Aztec.m_Zv_Bumaga2=null;
	c_Gold_Aztec.m_Zv_Click2=null;
	c_Gold_Aztec.m_Zv_Scrip=null;
	c_Gold_Aztec.m_Zv_Shagi=null;
	c_Gold_Aztec.m_Zv_Zvon=null;
	c_Gold_Aztec.m_Flag_Opros=0;
	c_Gold_Aztec.m_Flag_Sound=0;
	c_Gold_Aztec.m_Flag_Music=0;
	c_Gold_Aztec.m_HighScore=new_number_array(201);
	c_Gold_Aztec.m_HighStar=new_number_array(201);
	c_Gold_Aztec.m_N_List=0;
	c_Gold_Aztec.m_N_Level=0;
	c_Gold_Aztec.m_Maska_Level_Blok=new_number_array(17);
	c_Gold_Aztec.m_Maska_Level_Kris=new_number_array(17);
	c_Gold_Aztec.m_Regim=0;
	c_Gold_Aztec.m_Proz_Screen=.0;
	c_Gold_Aztec.m_Frame_RulonH=0;
	c_Gold_Aztec.m_Flag_Complete=0;
	c_Gold_Aztec.m_Zad_Fire=0;
	c_Gold_Aztec.m_Animacia=0;
	c_Gold_Aztec.m_Viz_Level=new_number_array(9);
	c_Gold_Aztec.m_Viz_Score=new_number_array(9);
	c_Gold_Aztec.m_Viz_Star=new_number_array(9);
	c_Gold_Aztec.m_Flag_Dostup=new_number_array(9);
	c_Gold_Aztec.m_Cikl_Anim=0;
	c_Gold_Aztec.m_Schet=0;
	c_Gold_Aztec.m_Skor_Dvig=0;
	c_Gold_Aztec.m_Sm_T1=0;
	c_Gold_Aztec.m_Sm_T2=0;
	c_Gold_Aztec.m_Sm_T5=0;
	c_Gold_Aztec.m_Sm_T6=0;
	c_Gold_Aztec.m_Frame_Kristal=new_number_array(17);
	c_Gold_Aztec.m_Sm_T3=0;
	c_Gold_Aztec.m_Sm_T7=0;
	c_Gold_Aztec.m_Sm_T4=0;
	c_Gold_Aztec.m_Sm_T8=0;
	c_Gold_Aztec.m_Sm_T9=0;
	c_Gold_Aztec.m_Sm_T10=0;
	c_Gold_Aztec.m_Sm_T11=0;
	c_Gold_Aztec.m_Sm_T12=0;
	c_Gold_Aztec.m_Sm_T13=0;
	c_Gold_Aztec.m_Sm_T14=0;
	c_Gold_Aztec.m_Sm_T15=0;
	c_Gold_Aztec.m_Sm_T16=0;
	c_Gold_Aztec.m_Maska_Level_Blok2=new_number_array(17);
	c_Gold_Aztec.m_Maska_Level_Kris2=new_number_array(17);
	c_Gold_Aztec.m_SkX_Blok=.0;
	c_Gold_Aztec.m_SmX_Blok=0;
	c_Gold_Aztec.m_MKor=.0;
	c_Gold_Aztec.m_Frame_Sunduk=0;
	c_Gold_Aztec.m_Alpha_Sunduk=.0;
	c_Gold_Aztec.m_Zad_Sunduk=0;
	c_Gold_Aztec.m_M_StarL=new_number_array(6);
	c_Gold_Aztec.m_Zad_PV=0;
	c_Gold_Aztec.m_Star_Level=0;
	c_Gold_Aztec.m_Score_Level=0;
	c_Gold_Aztec.m_Frame_Kristal2=new_number_array(17);
	c_Gold_Aztec.m_Y_List=0;
	c_Gold_Aztec.m_V_Level=0;
	c_Gold_Aztec.m_Frame_RulonKN=0;
	c_Gold_Aztec.m_X_Ukaz=0;
	c_Gold_Aztec.m_Y_Ukaz=0;
	c_Gold_Aztec.m_Frame_Ukaz=0;
	c_Gold_Aztec.m_Frame_RulonKV=0;
	c_Gold_Aztec.m_Im_OknoVerh=null;
	c_Gold_Aztec.m_Im_VerhMask=null;
	c_Gold_Aztec.m_Im_OknoNiz=null;
	c_Gold_Aztec.m_Im_SoundOn=null;
	c_Gold_Aztec.m_Im_MusicOn=null;
	c_Gold_Aztec.m_Im_BlokMeny=null;
	c_Gold_Aztec.m_Im_Star=new_object_array(6);
	c_Gold_Aztec.m_Im_Stena=null;
	c_Gold_Aztec.m_Im_Blok=new_object_array(7);
	c_Gold_Aztec.m_Im_Kristal_1=new_object_array(20);
	c_Gold_Aztec.m_Im_Kristal_2=new_object_array(20);
	c_Gold_Aztec.m_Im_Kristal_3=new_object_array(20);
	c_Gold_Aztec.m_Im_Kristal_4=new_object_array(20);
	c_Gold_Aztec.m_Im_Kristal_5=new_object_array(20);
	c_Gold_Aztec.m_Im_Kristal_6=new_object_array(20);
	c_Gold_Aztec.m_Im_CifraB=new_object_array(100);
	c_Gold_Aztec.m_Im_ListHelp=null;
	c_Gold_Aztec.m_Im_Rulon=new_object_array(10);
	c_Gold_Aztec.m_Im_ListKarta=null;
	c_Gold_Aztec.m_Im_TBack=null;
	c_Gold_Aztec.m_Im_MapL=null;
	c_Gold_Aztec.m_Im_Up=null;
	c_Gold_Aztec.m_Im_Down=null;
	c_Gold_Aztec.m_Im_CifraL=new_object_array(10);
	c_Gold_Aztec.m_Im_CifraR=new_object_array(10);
	c_Gold_Aztec.m_Im_Close=null;
	c_Gold_Aztec.m_Im_Koridor=null;
	c_Gold_Aztec.m_Im_KromkaL=null;
	c_Gold_Aztec.m_Im_KromkaP=null;
	c_Gold_Aztec.m_Im_Fire=new_object_array(16);
	c_Gold_Aztec.m_Im_Ukaz=new_object_array(12);
	c_Gold_Aztec.m_Im_TKristal_1=null;
	c_Gold_Aztec.m_Im_TKristal_2=null;
	c_Gold_Aztec.m_Im_TKristal_3=null;
	c_Gold_Aztec.m_Im_TKristal_4=null;
	c_Gold_Aztec.m_Im_TKristal_5=null;
	c_Gold_Aztec.m_Im_TKristal_6=null;
	c_Gold_Aztec.m_Im_BlikF=null;
	c_Gold_Aztec.m_Im_FireF=new_object_array(17);
	c_Gold_Aztec.m_Im_BlikF2=null;
	c_Gold_Aztec.m_Im_GoldBlik=new_object_array(6);
	c_Gold_Aztec.m_Im_CifraS=new_object_array(10);
	c_Gold_Aztec.m_Im_Sunduk=new_object_array(17);
	c_Gold_Aztec.m_Im_Tap=null;
	c_Gold_Aztec.m_Im_StarS=null;
	c_Gold_Aztec.m_Im_FonTab=null;
	c_Gold_Aztec.m_Im_Opros=null;
	c_Gold_Aztec.m_Im_Quit=null;
	c_Gold_Aztec.m_Frame_Schet=new_number_array(6);
}
//${TRANSCODE_END}
