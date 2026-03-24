function CGame(iLevel){
    var _bUpdate;
    var _iScore;
    var _iCurLevel;
    var _iTimeElaps;
    var _iNumHintUsed;
    
    var _oBoardContainer;
    var _oBoard;
    var _oInterface;
    var _oHelp;
    
    var _oGameOverPanel;
    
    
    this._init = function(iLevel){
        _iCurLevel = parseInt(iLevel);
        _iTimeElaps = 0;
        _iNumHintUsed = 0;
        
        setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME );
        s_oPieceSettings = new CPieceSettings();

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); 
        
        _oBoardContainer = new createjs.Container();
        s_oStage.addChild(_oBoardContainer);
        
        _oBoard = new CBoard(CANVAS_WIDTH/2,CANVAS_HEIGHT/2-50,_iCurLevel-1,_oBoardContainer);
        _oBoard.addEventListener(ON_LEVEL_WIN,this.gameOver,this);
         
        _oInterface = new CInterface(_iCurLevel-1);
        _oInterface.addEventListener(ON_HINT,this._onHint,this);
        _oInterface.addEventListener(ON_HELP,this._showHelp,this);
        
        _oGameOverPanel = new CGameOver();
       
  
        _oHelp = new CHelp();

        if(_iCurLevel === 1){
            this._showHelp();
        }else{
            _bUpdate = true;
        }
        
        this.refreshButtonPos();
    };
    
    
    this.unload = function(){
        _oInterface.unload();
        _oBoard.unload();
        _oHelp.unload();
        _oGameOverPanel.unload();

        s_oGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren(); 
    };
    
    this.refreshButtonPos = function(){
       
        this.refreshGridScale();
        
        _oInterface.refreshButtonPos();
        
        
    };
    
    this.refreshGridScale = function(){
        
        if(s_bLandscape){
            var iHeight = MAX_TABLE_HEIGHT_LANDSCAPE;
            var iMaxGridSizeHeight = (CANVAS_HEIGHT - (s_iOffsetY*2));
            CUR_GRID_SCALE = iMaxGridSizeHeight/iHeight;
        }else{
            var iWidth = MAX_TABLE_WIDTH_PORTRAIT;
            var iMaxGridSizeWidth = (CANVAS_WIDTH - (s_iOffsetX*2));
            CUR_GRID_SCALE = iMaxGridSizeWidth/iWidth;
            
            if(CUR_GRID_SCALE >1.23){
                CUR_GRID_SCALE = 1.23;
            }
        }

        if(CUR_GRID_SCALE <= 1){
            CUR_GRID_SCALE = parseFloat(CUR_GRID_SCALE.toFixed(2));
        }
    
        _oBoard.refreshGridScale();
        _oInterface.refreshGridScale();
    };
    
    this.restart = function(){;
        _iTimeElaps = 0;
        _iNumHintUsed = 0;
        
        _oBoard.reset(_iCurLevel-1);
        _oInterface.changeHintState(0);
        
        _bUpdate = true;
        
        $(s_oMain).trigger("restart_level",_iCurLevel);
    };

    this._showHelp = function(){
        _oHelp.show();
    };
    
    this.gameOver = function(){
        _bUpdate = false;
        
        _iScore = Math.floor((MAX_TIME_LEVEL_RESOLUTION[s_iCurDiff] - _iTimeElaps)/1000);
        if(_iScore < 0){
            _iScore = 0;
        }
        
        setLocalStorageLevel(s_iCurDiff,_iCurLevel);
        setLocalStorageScore(_iScore,s_iCurDiff,_iCurLevel-1);

        s_iTotalScore = getScoreTillLevel(s_iCurDiff,getSavedLevel(s_iCurDiff));
        
        $(s_oMain).trigger("end_level",_iCurLevel);
        $(s_oMain).trigger("save_score",[s_iTotalScore,s_iCurDiff]);
        $(s_oMain).trigger("share_event",s_iTotalScore);
      
        _oGameOverPanel.show(_iScore,_iCurLevel,LEVELS[s_iCurDiff].length===_iCurLevel?true:false);
    };

    this.nextLevel = function(){
        _iCurLevel++;
        
        _iTimeElaps = 0;
        _iNumHintUsed = 0;
        
        _oBoard.unload();
        _oBoard = new CBoard(CANVAS_WIDTH/2,CANVAS_HEIGHT/2-50,_iCurLevel-1,_oBoardContainer);
        _oBoard.addEventListener(ON_LEVEL_WIN,this.gameOver,this);

        _oInterface.refreshBestScore();
        _oInterface.changeHintState(0);
        
        this.refreshGridScale();
        
        _bUpdate = true;
    };
    
    this.onHideExitPanel = function(){
        _bUpdate = true;
    };
    
    this.setUpdate = function(bUpdate){
        _bUpdate = bUpdate;
    };
    
    this._onHint = function(iStateHint){
        switch(iStateHint){
            case 0:{
                    if(_oBoard.showHint()){
                        //DECREASE AVAILABLE TIME
                        _iTimeElaps -= MALUS_HINT;
                        _iNumHintUsed++;
                        if(_iNumHintUsed === MAX_FREE_HINTS){
                            _oInterface.changeHintState(2);
                        }
                    }
                    break;
            }
            case 1:{
                    //VIDEO REWARD
                    _iNumHintUsed++;
                    break;
            }
            case 2:{
                    
                    break;
            }
        }
        
    };
    
    this.onExit = function(){
        this.unload();
        
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        
        s_oMain.gotoMenu();
    };
    
    this.onExitHelp = function(){
        _bUpdate = true;
    };
    
    this.update = function(){
        if(_bUpdate){
            _iTimeElaps += s_iTimeElaps;
        }
    };

    s_oGame = this;
    
    this._init(iLevel);
}

var s_oGame = null;
var s_oHandEvaluator;