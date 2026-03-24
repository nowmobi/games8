function CButHint(iXPos,iYPos,oSprite,oParentContainer){
    var _bActive;
    var _iState;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oListenerDown;
    var _oListenerUp;
    
    var _oButton;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iXPos,iYPos,oSprite){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/3, height: oSprite.height, regX: (oSprite.width/3)/2, regY: oSprite.height/2}, 
                        animations: {state_0:0,state_1:1,state_2:2}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
         
         _iState = 0;
        _bActive = true;
	_oButton = createSprite(oSpriteSheet, "state_"+_iState,(oSprite.width/3)/2,oSprite.height/2,oSprite.width/3,oSprite.height);
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
        _oButton.cursor = "pointer";
        _oParentContainer.addChild(_oButton);
        
        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown", _oListenerDown);
       _oButton.off("pressup" , _oListenerUp); 
       _oParentContainer.removeChild(_oButton);
    };
    
    this._initListener = function(){
       _oListenerDown = _oButton.on("mousedown", this.buttonDown);
       _oListenerUp = _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,aParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };
    
    this.setState = function(iState){
        _iState = iState;
        if(_iState === 2){
            _bActive = false;
        }else{
            _bActive = true;
        }
        _oButton.gotoAndStop("state_"+_iState);
    };
    
    this.buttonRelease = function(){
        if(!_bActive){
            return;
        }
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
        
        playSound("click",1,false);


        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_iState);
        }
    };
    
    this.buttonDown = function(){
        if(!_bActive){
            return;
        }
        
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_iState);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.setMask = function(oMask){
        _oButton.mask = oMask;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };
    
    this._init(iXPos,iYPos,oSprite);
}