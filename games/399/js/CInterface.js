function CInterface(iCurLevel){
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    
    var _oAudioToggle;
    var _oButFullscreen;
    var _oButExit;
    var _oButRestart;
    var _oButHint;
    var _oButHelp;
    var _oGUIExpandible;


    var _oBestScoreText;
    var _oAreYouSurePanel;
    var _oRollingScore;
    var _oContainerScore;

    var _oBlockGrid;
    
    var _pStartPosHint;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _pStartPosRestart;
    var _pStartPosHelp;
    
    this._init = function(iCurLevel){  
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oBlockGrid = new createjs.Shape();
        _oBlockGrid.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBlockGrid.alpha = 0;
        _oListener = _oBlockGrid.on("click", function () {});
        s_oStage.addChild(_oBlockGrid);

        _oContainerScore = new createjs.Container();
        s_oStage.addChild(_oContainerScore);

        
        var oSpriteScoreBg = s_oSpriteLibrary.getSprite("rank_panel");
        var oBestBg = createBitmap(oSpriteScoreBg);
        oBestBg.x = 0;
        _oContainerScore.addChild(oBestBg);
        
        _oBestScoreText =  new CTLText(_oContainerScore, 
                    oBestBg.x+80, oBestBg.y+24, 300, 74, 
                    60, "right", "#fff", FONT, 1,
                    0, 0,
                    ""+s_iTotalScore,
                    true, true, false,
                    false );

	_pStartPosExit = {x:CANVAS_WIDTH - 101,y:127};
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        _pStartPosHelp = {x:_pStartPosExit.x,y:_pStartPosExit.y};
        _oButHelp = new CGfxButton(_pStartPosHelp.x,_pStartPosHelp.y,s_oSpriteLibrary.getSprite("but_help"),s_oStage);
        _oButHelp.addEventListener(ON_MOUSE_UP,this._onHelp,this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _pStartPosAudio = {x:_pStartPosExit.x - oSprite.width,y:_pStartPosExit.y}
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x: _pStartPosAudio.x - oSprite.width/2,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x:_pStartPosExit.x - oSprite.width,y:_pStartPosExit.y}
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        
        _pStartPosRestart = {x:CANVAS_WIDTH - (oSprite.width/2) -10,y:_pStartPosExit.y};
        _oButRestart = new CGfxButton(_pStartPosRestart.x,_pStartPosRestart.y,s_oSpriteLibrary.getSprite("but_restart"),s_oStage);
        _oButRestart.addEventListener(ON_MOUSE_UP,this._onRestart,this);
        
        
         
        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oGUIExpandible.addButton(_oButExit);
        _oGUIExpandible.addButton(_oButHelp);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oGUIExpandible.addButton(_oAudioToggle);
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oGUIExpandible.addButton(_oButFullscreen);
        }

        _oGUIExpandible.addButton(_oButRestart);
        
        var oSpriteHint = s_oSpriteLibrary.getSprite("but_hint");
        _pStartPosHint = {x:_pStartPosExit.x - oSpriteHint.width/3 - 50,y:oSpriteHint.height/2 + 10};
        _oButHint = new CButHint(_pStartPosHint.x,_pStartPosHint.y,oSpriteHint,s_oStage);
        _oButHint.addEventListener(ON_MOUSE_UP,this._onHint,this);
        
        _oRollingScore = new CRollingScore();
        
        
        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
    };
    
    this.unload = function(){
        _oBlockGrid.off("click",_oListener);
        _oGUIExpandible.unload();
        _oAreYouSurePanel.unload();
        _oButHint.unload();
        _oButHelp.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
                _oButFullscreen.unload();
        }
        
        _oButExit.unload();
        _oButRestart.unload();

        s_oInterface = null;
    };
        
    this.refreshButtonPos = function(){
        _oButHint.setPosition(_pStartPosHint.x - s_iOffsetX,_pStartPosHint.y + s_iOffsetY);
        _oGUIExpandible.refreshPos();
        
        _oContainerScore.x = CANVAS_WIDTH/2 - (550*CUR_GRID_SCALE)
        _oContainerScore.y = CANVAS_HEIGHT/2 - (720*CUR_GRID_SCALE);
        
    };
    
    this.refreshGridScale = function(){
        _oContainerScore.scaleX = _oContainerScore.scaleY = CUR_GRID_SCALE;
    };

    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.refreshBestScore = function(){
        _oBestScoreText.refreshText(s_iTotalScore);
    };

    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        _oAreYouSurePanel.show(TEXT_ARE_YOU_SURE);
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN,s_oGame.onExit,s_oGame);
        _oAreYouSurePanel.addEventListener(ON_BUT_NO_DOWN,s_oGame.onHideExitPanel,s_oGame);
        s_oGame.setUpdate(false);
    };
    
    this._onHelp = function(){
        if(_aCbCompleted[ON_HELP]){
            _aCbCompleted[ON_HELP].call(_aCbOwner[ON_HELP]);
        }
    };

    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };
    
    this.changeHintState = function(iState){
        _oButHint.setState(iState);
    };
        
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    this._onRestart = function(){
        _oAreYouSurePanel.show(TEXT_ARE_YOU_SURE_RESTART);
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN,s_oGame.restart,s_oGame);
        _oAreYouSurePanel.addEventListener(ON_BUT_NO_DOWN,s_oGame.onHideExitPanel,s_oGame);
        
        s_oGame.setUpdate(false);
    };
    
    this._onHint = function(iState){
        if(_aCbCompleted[ON_HINT]){
            _aCbCompleted[ON_HINT].call(_aCbOwner[ON_HINT],iState);
        }
    };

    s_oInterface = this;
    
    this._init(iCurLevel);
    
    return this;
}

var s_oInterface = null;