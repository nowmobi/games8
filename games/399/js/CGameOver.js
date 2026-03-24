function CGameOver(){
    var _oListener;
    var _oSpriteBg;
    
    var _oTextScore;
    var _oTextGameOver;
    var _oTextTotScore;
    var _oButRestart;
    var _oButHome;
    var _oButNext;
    var _oFade;
    var _oContainer;
    var _oContainerPanel;
    var _oRollingScore;
    
    var _oThis = this;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oListener = _oFade.on("click", function () {});
        _oContainer.addChild(_oFade);
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainerPanel.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oContainerPanel);
        
        _oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(_oSpriteBg);
        _oContainerPanel.addChild(oBg);
        
        
       _oTextGameOver =  new CTLText(_oContainerPanel, 
                    _oSpriteBg.width/2-300, 100, 600, 160, 
                    80, "center", "#fff", FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
                    
       

        _oTextScore =  new CTLText(_oContainerPanel, 
                    _oSpriteBg.width/2-360, _oSpriteBg.height/2 -130, 720, 50, 
                    70, "center", "#fff", FONT, 1,
                    0, 0,
                    TEXT_SCORE,
                    true, true, false,
                    false );


        _oTextTotScore =  new CTLText(_oContainerPanel, 
                    _oSpriteBg.width/2-360, _oSpriteBg.height/2 -10, 720, 100, 
                    90, "center", "#fff", FONT, 1,
                    0, 0,
                    TEXT_TOT_SCORE+"\n"+s_iTotalScore,
                    true, true, true,
                    false );
                    
                    
        _oButHome = new CGfxButton(_oSpriteBg.width/2 - 240,_oSpriteBg.height - 200,s_oSpriteLibrary.getSprite("but_home"),_oContainerPanel);
        _oButHome.addEventListener(ON_MOUSE_UP,this._onHome,this);
        
        _oButRestart = new CGfxButton(_oSpriteBg.width/2,_oSpriteBg.height - 200,s_oSpriteLibrary.getSprite("but_restart_big"),_oContainerPanel);
        _oButRestart.addEventListener(ON_MOUSE_UP,this._onRestart,this);

        _oButNext = new CGfxButton(_oSpriteBg.width/2 + 240,_oSpriteBg.height - 200,s_oSpriteLibrary.getSprite("but_next_level"),_oContainerPanel);
        _oButNext.addEventListener(ON_MOUSE_UP,this._onNext,this);
        
        _oRollingScore = new CRollingScore();
        
        _oContainerPanel.regX = _oSpriteBg.width/2;
        _oContainerPanel.regY = _oSpriteBg.height/2;
    };
    
    this.unload = function(){
        _oFade.on("click", _oListener);
        _oButHome.unload();
        _oButRestart.unload();
        _oButNext.unload();
    };
    
    this.show = function(iScore,iCurLevel,bLastLevel){
      
        _oTextScore.refreshText(TEXT_SCORE+" "+iScore);
        _oTextGameOver.refreshText(sprintf(TEXT_GAME_OVER,iCurLevel))
        _oTextTotScore.refreshText(TEXT_TOT_SCORE+"\n"+s_iTotalScore);
        
        if(bLastLevel){
            _oButNext.setVisible(false);
            _oButRestart.setX(_oSpriteBg.width/2 + 150);
        }else{
            _oButNext.setVisible(true);
            _oButRestart.setX(_oSpriteBg.width/2);
        }
        
        _oContainer.visible = true;
        
        _oFade.alpha = 0;
        createjs.Tween.get(_oFade).to({alpha:0.7}, 400, createjs.Ease.cubicOut).call(function(){ playSound("game_over",1,false);});
        
        _oContainerPanel.scaleX = _oContainerPanel.scaleY = 0.01;
        _oContainerPanel.alpha = 0;
        createjs.Tween.get(_oContainerPanel).wait(1000).to({scaleX: 1,scaleY:1,alpha:1}, 1000, createjs.Ease.elasticOut);
        
    };
    
    this.hide = function(){
        createjs.Tween.get(_oFade).to({alpha:0}, 400, createjs.Ease.cubicOut);
        createjs.Tween.get(_oContainerPanel).to({scaleX: 0.1,scaleY:0.1,alpha:0.5}, 400, createjs.Ease.backIn).call(function(){_oContainer.visible = false;});
    };
    
    this._onHome = function(){
        s_oGame.onExit();
    };
    
    this._onRestart = function(){
        
        sdk.showBanner();
        
        s_oGame.restart();
        _oThis.hide();           
        
    };
    
    this._onNext = function(){
        var soundON = !1;
        
        sdk.showBanner();
        
        s_oGame.nextLevel();
        _oThis.hide();
        
    };
    
    this._init();
}