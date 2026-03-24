function CBoardCell(iX,iY,iRow,iCol,iValue,oParentContainer){

    var _iValue;
    var _iState;
    var _iIntervalIdle;
    var _iRow = iRow;
    var _iCol = iCol;
    var _iParentPieceIndex = -1;
    var _pStartCoord = {row:-1,col:-1};
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oListenerDown;;
    
    var _oBg;
    var _oParentPiece = null;
    var _oCell;
    var _oParticle;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    var _oThis = this;
    
    this._init = function(iX,iY,iValue){

        _iValue = iValue;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oListenerDown = _oContainer.on("mousedown",this._onPress,this);
        
        
        _oParentContainer.addChild(_oContainer);
        
        var szLabel;
        if(_iValue===LABEL_UNAVAILABLE){
            _iState = LABEL_UNAVAILABLE;
            if(_iRow%2 === 0){
                if(_iCol%2 === 0){
                    szLabel = "state_off_0";
                }else{
                    szLabel = "state_off_1";
                }
            }else{
                if(_iCol%2 === 0){
                    szLabel = "state_off_1";
                }else{
                    szLabel = "state_off_0";
                }
            }
            
        }else{
            _iState = LABEL_EMPTY;
            szLabel = "state_on";
        }
        
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("cell_bg")], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_WIDTH, height: CELL_HEIGHT,regX:CELL_WIDTH/2,regY:CELL_HEIGHT/2}, 
                        animations: {state_off_0:0,state_off_1:1,state_on:2}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oBg = createSprite(oSpriteSheet,szLabel,CELL_WIDTH/2,CELL_HEIGHT/2,CELL_WIDTH,CELL_HEIGHT);
        _oContainer.addChild(_oBg);
        
        _oCell = createSprite(s_oPieceSettings.getSpriteSheet(1),"start",CELL_WIDTH/2,CELL_HEIGHT/2,CELL_WIDTH,CELL_HEIGHT);
        _oCell.visible = false;
        _oContainer.addChild(_oCell);
        
        //PARTICLE EFFECT
        var aSprites = new Array();
        for(var k=0;k<22;k++){
            aSprites[k] = s_oSpriteLibrary.getSprite("particle_stars_"+k);
        }
        
        var oData = {   
                        images: aSprites, 
                        framerate:30,
                        // width, height & registration point of each sprite
                        frames: {width: aSprites[0].width,height:aSprites[0].height,regX:aSprites[0].width/2,regY:aSprites[0].height/2}, 
                        animations: {start:0,anim:[0,21,"stop_anim"],stop_anim:21}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        
        _oParticle = createSprite(oSpriteSheet,"start",aSprites[0].width/2,aSprites[0].height/2,aSprites[0].width,aSprites[0].height);
        _oParticle.visible = false;
        _oParticle.x = 0;
        _oParticle.y = 0;
        _oParticle.scale = 0.5;
        _oContainer.addChild(_oParticle);
        
        
    };
    
    this.unload = function(){
        clearInterval(_iIntervalIdle);
        _oContainer.off("mousedown",_oListenerDown);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.reset = function(){
        var szLabel;
        if(_iValue===LABEL_UNAVAILABLE){
            _iState = LABEL_UNAVAILABLE;
            if(_iRow%2 === 0){
                if(_iCol%2 === 0){
                    szLabel = "state_off_0";
                }else{
                    szLabel = "state_off_1";
                }
            }else{
                if(_iCol%2 === 0){
                    szLabel = "state_off_1";
                }else{
                    szLabel = "state_off_0";
                }
            }
            
        }else{
            _iState = LABEL_EMPTY;
            szLabel = "state_on";
        }
        
        _oBg.gotoAndStop(szLabel);
        _oCell.visible = false;
    };
    
    this.setValue = function(iValue,iParentPieceIndex,iStartRow,iStartCol,bTween,oParentPiece){
        clearInterval(_iIntervalIdle);
        
        _iParentPieceIndex = iParentPieceIndex;
        _pStartCoord = {row:iStartRow,col:iStartCol};
        _oParentPiece = oParentPiece;
        
        _iValue = iValue;
        _oCell.scaleX = _oCell.scaleY = 1.1;
       
        if(iValue === LABEL_EMPTY ){
            _iState = LABEL_EMPTY;
            _oCell.visible = false;
        }else{
            _iState = LABEL_FILL;
            _oCell.visible = true;
            _oCell.spriteSheet = s_oPieceSettings.getSpriteSheet(iValue);

            if(bTween){
                createjs.Tween.get(_oCell).to({scaleX:1,scaleY:1}, 1500, createjs.Ease.elasticOut);
            }else{
                _oCell.scaleX = _oCell.scaleY = 1;
            }
            
            _iIntervalIdle = setTimeout(function(){_oThis._playIdleAnim();},Math.floor(Math.random() * (MAX_TIME_IDLE - MIN_TIME_IDLE + 1)) + MIN_TIME_IDLE); 
            
            _oParticle.visible=true;
            _oParticle.gotoAndPlay("anim");
        }
        
        this.setAlpha(1);
        
        
        
    };
    
    this.setAlpha = function(iAlpha){
        _oCell.alpha = iAlpha;
    };
    
    this._playIdleAnim = function(){
        var iRandAnim = Math.floor(Math.random()*3);
        _oCell.gotoAndPlay("idle_"+iRandAnim);

        _iIntervalIdle = setTimeout(function(){_oThis._playIdleAnim();},Math.floor(Math.random() * (MAX_TIME_IDLE - MIN_TIME_IDLE + 1)) + MIN_TIME_IDLE)
    };
    
    
    this._onPress = function(){
        if(_oParentPiece === null){
            return;
        }
        
        if(_aCbCompleted[ON_CELL_PRESS]){
           _aCbCompleted[ON_CELL_PRESS].call(_aCbOwner[ON_CELL_PRESS],_iParentPieceIndex,_pStartCoord,_oParentPiece);
       }
    };

    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };

    this.getType = function(){
        return _iValue;
    };
    
    this.getState = function(){
        return _iState;
    };

    
    this._init(iX,iY,iValue);
}