function CGUIExpandible(iX, iY, oSprite, oParentContainer){
    const OFFSET_Y = 126;
    
    var _bExpanded;
    
    var _aButtons;
    var _oListenerPress;
    
    var _oHitArea;
    var _oParent;
    var _oMenuBut;
    var _oGUIContainer;
    var _oBackContainer;
    var _oFrontContainer;
    var _oExpandedPos;
    
    var _pStartPos;
    
    this._init = function(iX, iY, oSprite, oParentContainer){
        
        _aButtons = new Array();
        
        _pStartPos = {x: iX, y: iY};
        _oGUIContainer = new createjs.Container();
        _oGUIContainer.x = iX;
        _oGUIContainer.y = iY;
        oParentContainer.addChild(_oGUIContainer);
        
        _oBackContainer = new createjs.Container();
        _oGUIContainer.addChild(_oBackContainer);
        
        
        
        _oFrontContainer = new createjs.Container();
        _oGUIContainer.addChild(_oFrontContainer);
        
        _bExpanded = false;
        
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("but_settings")], 
                        // width, height & registration point of each sprite
                        frames: {width: 183,height:234,regX:91,regY:117}, 
                        animations: {start:0,anim_expand:[0,10,"stop_anim_expand"],stop_anim_expand:11,
                        anim_collapse:{frames:[10,9,8,7,6,5,4,3,2,1,0],next:"stop_anim_collapse"},stop_anim_collapse:0}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
            
        _oMenuBut = createSprite(oSpriteSheet,"start",91,117,183,234);
        
        _oMenuBut.on("animationend",this._onAnimEnd,this);
        _oFrontContainer.addChild(_oMenuBut);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(-130,-167,261,190);
        _oHitArea.cursor = "pointer";
        _oListenerPress = _oHitArea.on("click", this._onMenu,this);
        _oFrontContainer.addChild(_oHitArea); 
        
        var oStart = {x: 0, y: OFFSET_Y-52};
        _oExpandedPos = {start: oStart, offset: OFFSET_Y};
        
    };
    
    this.unload = function(){
        _oHitArea.off("click",_oListenerPress);
        oParentContainer.removeChild(_oGUIContainer);
    };
    
    this.refreshPos = function(){
        ////REMOVE ALL BUTTONS FROM REFRESH FUNCTIONS IN INTERFACE OR IN OTHER MENU      
        _oGUIContainer.x = iX - s_iOffsetX;
        _oGUIContainer.y = iY + s_iOffsetY;
    };
    
    this.addButton = function(oObjClass){
        var oButton = oObjClass.getButtonImage();
        oButton.x = 14;
        oButton.y = 70;
        oButton.visible = false;
        _oBackContainer.addChildAt(oButton, 0);
        

        _aButtons.push(oButton);       
    };
    
    this._onMenu = function(){
        playSound("click",1,false);
        
        _bExpanded = !_bExpanded;
        if(_bExpanded){
            _oMenuBut.gotoAndPlay("anim_expand");
        }else{
            _oParent.hide();
        }
        
    };
    
    this.hide = function(){
        _oMenuBut.gotoAndPlay("anim_collapse");
        _oParent._collapse();
    };
    
    this._onAnimEnd = function(evt){
        if(evt.name === "anim_expand"){
            _oParent._expand();  
        }
        
    };
    
    this._expand = function(){
        _aButtons[0].visible = true;
        var iTime = 300;
        for(var i=1; i<_aButtons.length; i++){
            _aButtons[i].visible = true;
            createjs.Tween.get(_aButtons[i], {override:true}).to({y: _oExpandedPos.start.y + i*_oExpandedPos.offset}, iTime, createjs.Ease.cubicOut);
        };
    };
    
    this._collapse = function(){        
        var iTime = 100;
        for(var i=0; i<_aButtons.length; i++){
            if(i===0){
                _aButtons[i].visible = false;
            }
            var oButton = _aButtons[_aButtons.length-1-i];
            createjs.Tween.get(oButton, {override:true}).to({y: 70}, iTime, createjs.Ease.cubicOut).call(function(oButton){
                oButton.visible = false;
            }, [oButton]);
        };
    };
    
    _oParent = this;
    this._init(iX, iY, oSprite, oParentContainer);
}


