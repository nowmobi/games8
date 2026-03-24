function CHelp(){
    var _oListener;
    
    var _oSpriteBg;
    var _oFade;
    var _oContainer;
    var _oContainerPanel;

    var _oThis = this;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oFade);
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainerPanel.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oContainerPanel);
        
        _oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(_oSpriteBg);
        _oContainerPanel.addChild(oBg);
        
        var oSpriteHelp = s_oSpriteLibrary.getSprite("help_sprite");
        var oHelpBmp = createBitmap(oSpriteHelp);
        oHelpBmp.regX = oSpriteHelp.width/2;
        oHelpBmp.regY = oSpriteHelp.height/2;
        oHelpBmp.x = _oSpriteBg.width/2;
        oHelpBmp.y = _oSpriteBg.height/2 - 130;
        _oContainerPanel.addChild(oHelpBmp);
        
        
        var oText = new CTLText(_oContainerPanel, 
                    _oSpriteBg.width/2-360, _oSpriteBg.height/2+120,720 , 240, 
                    80, "center", "#fff", FONT, 1,
                    0, 0,
                    TEXT_HELP,
                    true, true, true,
                    false );
                    

        
        _oListener = _oContainer.on("click", this._onSkip,this);
        
        _oContainerPanel.regX = _oSpriteBg.width/2;
        _oContainerPanel.regY = _oSpriteBg.height/2;
    };
    
    this.unload = function(){
        _oContainer.off("click",_oListener);
    };
    
    this.show = function(){
        _oContainer.visible = true;
        
        _oFade.alpha = 0;
        createjs.Tween.get(_oFade).to({alpha:0.7}, 400, createjs.Ease.cubicOut);
        
        _oContainerPanel.scale = 0;
        createjs.Tween.get(_oContainerPanel).wait(400).to({scaleX: 1,scaleY:1,alpha:1}, 1000, createjs.Ease.elasticOut);
    };
    
    this.hide = function(){
        createjs.Tween.get(_oFade).to({alpha:0}, 400, createjs.Ease.cubicOut);
        createjs.Tween.get(_oContainerPanel).to({scaleX: 0.1,scaleY:0.1,alpha:0.5}, 400, createjs.Ease.backIn).call(function(){
            _oContainer.visible = false;
            s_oGame.onExitHelp();
        });
    };
    
    this._onSkip = function(){
        _oThis.hide();
    };
    
    this._init();
    
}