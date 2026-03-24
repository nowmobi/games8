function CBoard(iX,iY,iLevel,oParentContainer){

    var _iNumPiecePlaced;
    var _aCells;
    var _aCellsLogicState;
    var _aCurPieces;
    var _aCellHighlights;
    var _aCellsToRestore;
    var _aCbCompleted;
    var _aCbOwner;
    var _aHints;
    var _oListenerBlock;
    var _oListenerMove;
    var _oListenerRelease;
    
    var _oCurMovingPiece;
    var _oBlock;
    var _oCellContainer;
    var _oPieceContainer;
    var _oContainer;
    var _oParentContainer = oParentContainer;

    
    this._init = function(iX,iY,iLevel){
        _iNumPiecePlaced = 0;
        _oCurMovingPiece = null;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _aCellsToRestore = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("grid_bg")
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);

        _aCellHighlights = new Array();
        var iXPos = 69;
        var iYPos = 104;
        
        var oSprite = s_oSpriteLibrary.getSprite("cell_highlight");
        for(var i=0;i<NUM_ROWS;i++){
            _aCellHighlights[i] = new Array();
            for(var j=0;j<NUM_COLS;j++){
                var oHighlight = createBitmap(oSprite);
                oHighlight.x = iXPos;
                oHighlight.y = iYPos;
                oHighlight.regX = oSprite.width/2;
                oHighlight.regY = oSprite.height/2;
                oHighlight.visible = false;
                _oContainer.addChild(oHighlight);
                
                _aCellHighlights[i][j] = oHighlight;
                
                iXPos += 108;
            }
            
            iXPos = 69;
            iYPos += 92;
        }

        _oContainer.regX = oSpriteBg.width/2;
        _oContainer.regY = oSpriteBg.height/2;
        
        
        
        _oBlock = new createjs.Shape();
        _oBlock.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, _oContainer.getBounds().width, _oContainer.getBounds().height);
        _oListenerBlock = _oBlock.on("click", function(){});
        _oContainer.addChild(_oBlock);
        

        this.initBoard(iLevel);
        
        this._prepareHints();
        
        _oBlock.visible = false;
        
        $(s_oMain).trigger("start_level",iLevel+1);
    };
    
    this.refreshGridScale = function(){
        _oContainer.scaleX = _oContainer.scaleY = CUR_GRID_SCALE;
    };
    
    this.unload = function(){
        _oParentContainer.removeChild(_oContainer);
        
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_COLS;j++){
                _aCells[i][j].unload();
            }
        }
    };
    
    this.reset = function(iLevel){
        _oCurMovingPiece = null;
        _iNumPiecePlaced = 0;
        _aCellsToRestore = new Array();
        
        var aLevelInfos = LEVELS[s_iCurDiff][iLevel]['grid'];
        var iCont = 0;
        
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_COLS;j++){
                var iValue = aLevelInfos[iCont];

                _aCells[i][j].reset(iValue);
                _aCellsLogicState[i][j] = iValue;
                
                iCont++;
            }
        }
        
        this.resetHighlights();
        
        //REMOVE ALL PIECES
        for(var k=0;k<_aCurPieces.length;k++){
            _aCurPieces[k].unload();
        }
        
        _aCurPieces = [];
         var aPieces = LEVELS[s_iCurDiff][iLevel]['pieces'];
         PIECE_TO_PLACE = aPieces.length;
         for(var i=0;i<PIECE_TO_PLACE;i++){
            this.spawnPieces(i,Math.floor(Math.random()*500),s_oPieceSettings.getPieceInfos(aPieces[i].index),aPieces[i]);
        }
        
        _oBlock.visible = false;
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.resetHighlights = function(){
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_COLS;j++){
                _aCellHighlights[i][j].visible = false;
                _aCells[i][j].setAlpha(1);
            }
        }
    }
    
    this.initBoard = function(iLevel){
        _oCellContainer = new createjs.Container();
        _oCellContainer.x = CELL_X;
        _oCellContainer.y = CELL_Y;
        _oContainer.addChild(_oCellContainer);
        
        _aCells = new Array();
        _aCellsLogicState = new Array();
        var iX = 0;
        var iY = 0;
        var aLevelInfos = LEVELS[s_iCurDiff][iLevel]['grid'];
        var iCont = 0;
        
        for(var i=0;i<NUM_ROWS;i++){
            _aCells[i] = new Array();
            _aCellsLogicState[i] = new Array();
            for(var j=0;j<NUM_COLS;j++){
                var iValue = aLevelInfos[iCont];
                _aCells[i][j] = new CBoardCell(iX,iY,i,j,iValue,_oCellContainer);
                _aCells[i][j].addEventListener(ON_CELL_PRESS,this._onPressCell,this);
                
                _aCellsLogicState[i][j] = iValue;
                
                iX += CELL_WIDTH;
                iCont++;
            }
            
            iX = 0;
            iY += CELL_HEIGHT_FAKE;
        }
        
        var oRoof = createBitmap(s_oSpriteLibrary.getSprite("grid_roof"));
        _oContainer.addChild(oRoof);
        
        _oPieceContainer = new createjs.Container();
        _oContainer.addChild(_oPieceContainer);
        
        
        _aCurPieces = [];
         var aPieces = LEVELS[s_iCurDiff][iLevel]['pieces'];
         PIECE_TO_PLACE = aPieces.length;
         for(var i=0;i<PIECE_TO_PLACE;i++){
            this.spawnPieces(i,Math.floor(Math.random()*500),s_oPieceSettings.getPieceInfos(aPieces[i].index),aPieces[i]);
        }
        
        var sortFunction = function(obj1, obj2, options) {
            if (obj1.y > obj2.y) { return -1; }
            if (obj1.y < obj2.y) { return 1; }
            return 0;
        };
        _oCellContainer.sortChildren(sortFunction);
    };
    
    this._prepareHints = function(){
        _aHints = new Array();
        
        for(var k=0;k<NUM_TYPES+1;k++){
            _aHints[k] = [];
        }
        
        
         for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_COLS;j++){
                if(_aCellsLogicState[i][j] !== -1){
                    _aHints[_aCellsLogicState[i][j]].push({row:i,col:j});
                }
            }
        }

        //REMOVE EMPTY VALUES
        var iLen = _aHints.length-1;
        while( iLen >= 0 ){
            if(_aHints[iLen].length === 0){
                _aHints.splice(iLen,1);
            }
            
            iLen--; 
        }
    };

    this.setBlock = function(bBlock){
        _oBlock.visible = bBlock;
    };

    
    this._onPressCell = function(iPieceIndex,pStartCoord,oParentPiece){
        var oInfos = s_oPieceSettings.getPieceInfos(iPieceIndex);
       
        _oCurMovingPiece = oParentPiece;
        
        _oCurMovingPiece.setVisible(true);
        _oCurMovingPiece.refreshGlobalPos(s_oStage.mouseX ,s_oStage.mouseY);
        
        //CLEAR PIECE POSITION IN GRID
        var iStartRow = pStartCoord.row;
        var iStartCol = pStartCoord.col;

        var aListPos = oInfos.list_pos;
        _aCellsToRestore = new Array();
        for(var i=0;i<aListPos.length;i++){
            var oCoord = aListPos[i];
            _aCells[iStartRow+oCoord.row][iStartCol+oCoord.col].setValue(LABEL_EMPTY,-1,-1,-1,false,null);
            _aCellsLogicState[iStartRow+oCoord.row][iStartCol+oCoord.col] = LABEL_EMPTY;
            
            _aCellsToRestore.push({row:iStartRow+oCoord.row,col:iStartCol+oCoord.col});
        }
        
        _oListenerMove = s_oStage.on("stagemousemove",this.onMovePiece,this);
        _oListenerRelease = s_oStage.on("stagemouseup",this._onRelease,this);
    };
    
    this.spawnPieces = function(iIndex,iDelaySpawn,oInfo,oInfoPiece){
        
        if(oInfo !== null){

            var oPiece = new CPiece(iIndex,PIECE_POSITION[s_iCurDiff][iIndex].x,PIECE_POSITION[s_iCurDiff][iIndex].y,oInfoPiece.type,
                                                                oInfoPiece.index,oInfo,iDelaySpawn,SCALE_STARTING_PIECE,_oPieceContainer);
            oPiece.addEventListener(ON_SELECT_PIECE,this._onSelectPiece,this);
            _aCurPieces[iIndex] = oPiece;
        }
    };
    
    this.showHint = function(){

        if(_aHints.length === 0){
            return false;
        }
        
        //HIDE HIGHLIGHTS EVENTUALLY
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_COLS;j++){
                _aCellHighlights[i][j].visible = false;
                _aCells[i][j].setAlpha(1);
            }
        }
        
        do{
            var aList = _aHints.pop();
        }while(!this._checkIfValidHint(aList) && _aHints.length>0);
        
        for(var k=0;k<aList.length;k++){
            _aCellHighlights[aList[k].row][aList[k].col].visible = true;
            _aCells[aList[k].row][aList[k].col].setAlpha(0.5);
        }
        
       return true;
        
    };
    
    this._checkIfValidHint = function(aListCells){
        //CHECK IF CURRENT HINT IS ALREADY FILLED CORRECTLY
        var iTypeParent = _aCellsLogicState[aListCells[0].row][aListCells[0].col];

        for(var k=1;k<aListCells.length;k++){
            if(_aCellsLogicState[aListCells[k].row][aListCells[k].col] !== iTypeParent || _aCells[aListCells[k].row][aListCells[k].col].getState() === LABEL_EMPTY){
                return true;
            }
        }
        
      
        return false;
    };
    
    this._onSelectPiece = function(oCurPiece){
        _oCurMovingPiece = oCurPiece;
    };
    
    this.onMovePiece = function(evt){
        _oCurMovingPiece.refreshGlobalPos(evt.stageX,evt.stageY);
        
        this.resetHighlights();
        
        var aListPos = _oCurMovingPiece.getInfos().list_pos;

        var oPiecePos = _oCurMovingPiece.getGlobalPos();
        oPiecePos = _oCellContainer.globalToLocal(oPiecePos.x,oPiecePos.y);
        var iStartRow = Math.floor(oPiecePos.y / CELL_HEIGHT_FAKE);
        var iStartCol = Math.floor(oPiecePos.x / CELL_WIDTH);
        
        if (this._checkIfPieceFit(iStartRow,iStartCol,aListPos) ){
            
            for(var i=0;i<aListPos.length;i++){
                var oCoord = aListPos[i];
                _aCellHighlights[iStartRow+oCoord.row][iStartCol+oCoord.col].visible = true;
            }
        }
    };
    
    this._onRelease = function(evt){

        s_oStage.off("stagemousemove",_oListenerMove);
        s_oStage.off("stagemouseup",_oListenerRelease);
        
        s_oBoard.onReleasePiece();
    };
    
    this.onReleasePiece = function(){

        this.resetHighlights();
        
        this._checkPieceCollision(_oCurMovingPiece.getIndex(),_oCurMovingPiece.getInfos());
        
        _oCurMovingPiece = null;
        
        if(this._checkWin()){
            //WIN LEVEL
            if(_aCbCompleted[ON_LEVEL_WIN]){
                _aCbCompleted[ON_LEVEL_WIN].call(_aCbOwner[ON_LEVEL_WIN]);
            }
        }
    };

    
    this._checkIfPieceCanBePlaced = function(oPiece){
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_COLS;j++){
                if(this._checkIfPieceFit(i,j,oPiece.getInfos().list_pos)){
                    return true;
                }
            }
        }
        
        return false;
    };

    
    this._checkPieceCollision = function(iIndex,oInfos){

        var aListPos = oInfos.list_pos;
        var oPiecePos = _oCurMovingPiece.getGlobalPos();
  
        oPiecePos = _oCellContainer.globalToLocal(oPiecePos.x,oPiecePos.y);
       
        var iStartRow = Math.floor(oPiecePos.y / CELL_HEIGHT_FAKE);
        var iStartCol = Math.floor(oPiecePos.x / CELL_WIDTH);
       
        if (this._checkIfPieceFit(iStartRow,iStartCol,aListPos) ){
            playSound("particle_sfx",1,false);
            //console.log("_oCurMovingPiece.getType() "+_oCurMovingPiece.getType())
            playSound("miao_"+_oCurMovingPiece.getType(),1,false);
            
            
            this.setCellValues(iStartRow,iStartCol,aListPos);

            _oCurMovingPiece.setVisible(false);
            _aCurPieces[iIndex].setVisible(false);
        }else{
            
            _oCurMovingPiece.resetPos();
            _aCurPieces[iIndex] = _oCurMovingPiece;
           
            for(var k=0;k<_aCellsToRestore.length;k++){
                _aCells[_aCellsToRestore[k].row][_aCellsToRestore[k].col].setValue(LABEL_EMPTY,-1,-1,-1,false,null);
            }
            
            
            this.setBlock(false);
        }
        
        _aCellsToRestore = [];
    };
    
    
    
    this._checkIfPieceFit = function(iStartRow,iStartCol,aListPos){
        if(iStartRow < 0 || iStartRow >= NUM_ROWS || iStartCol < 0 || iStartCol >= NUM_COLS){
            return false;
        }
        
        for(var i=0;i<aListPos.length;i++){
            var oCoord = aListPos[i];
            if((iStartRow+oCoord.row) < 0 || (iStartRow+oCoord.row) >= NUM_ROWS || (iStartCol+oCoord.col) < 0 
                    || (iStartCol+oCoord.col) >= NUM_COLS || _aCells[iStartRow+oCoord.row][iStartCol+oCoord.col].getState() === LABEL_UNAVAILABLE || 
                                        _aCells[iStartRow+oCoord.row][iStartCol+oCoord.col].getState() === LABEL_FILL){
               
                return false;
            }
        }
        
        return true;
    };
    
    this._checkWin = function(){
        //CHECK IF ALL PIECES ARE PLACED
        var bWin = true;
        for(var k=0;k<_aCurPieces.length;k++){
            if(_aCurPieces[k].isVisible()){
                bWin = false;
                break;
            }
        }
        
        return bWin;
    };
    
    this.setCellValues = function(iStartRow,iStartCol,aListPos){
        for(var i=0;i<aListPos.length;i++){
            var oCoord = aListPos[i];
            _aCells[iStartRow+oCoord.row][iStartCol+oCoord.col].setValue(_oCurMovingPiece.getType(),_oCurMovingPiece.getInfoIndex(),iStartRow,iStartCol,true,_oCurMovingPiece);
            _aCellsLogicState[iStartRow+oCoord.row][iStartCol+oCoord.col] = _oCurMovingPiece.getType();
        }
    };

    this.printBoardCell = function(){
        
        for(var i=0;i<NUM_ROWS;i++){
            var szPrint = "";
            for(var j=0;j<NUM_COLS;j++){
                szPrint += _aCells[i][j].getType()+"#"
            }
            trace(szPrint)
            
        }
        trace("####################")
        
    };
    
    this.getCurDraggingPiece = function(){
        return _oCurMovingPiece;
    };

    
    s_oBoard = this;
    
    this._init(iX,iY,iLevel);
}

var s_oBoard;