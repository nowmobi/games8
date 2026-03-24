function CPieceSettings(){
    var _aPieceConfig;
    var _aSpriteSheetType;
    var _aCellSize;
    
    this._init = function(){
        _aPieceConfig = new Array();

        
        //PIECE 1  ##
        _aPieceConfig[0] = {list_pos:[{row:0,col:0},{row:0,col:1}],type:1,num_cell:2};
        
        
        //PIECE 2  #
        //         #
        _aPieceConfig[1] = {list_pos:[{row:0,col:0},{row:1,col:0}],type:2,num_cell:2};
        
        //PIECE 3  ###
        _aPieceConfig[2] = {list_pos:[{row:0,col:0},{row:0,col:1},{row:0,col:2}],type:3,num_cell:3};
        
        
        //PIECE 4  #
        //         #
        _aPieceConfig[3] = {list_pos:[{row:0,col:0},{row:1,col:0},{row:2,col:0}],type:4,num_cell:3};
        
        
        //PIECE 5  ##
        //         #
        _aPieceConfig[4] = {list_pos:[{row:0,col:0},{row:0,col:1},{row:1,col:0}],type:5,num_cell:3};
        
        
        //PIECE 6  #
        //         ##
        _aPieceConfig[5] = {list_pos:[{row:0,col:0},{row:1,col:0},{row:1,col:1}],type:6,num_cell:3};
        
        
        //PIECE 7  #
        //        ##
        _aPieceConfig[6] = {list_pos:[{row:0,col:1},{row:1,col:1},{row:1,col:0}],type:7,num_cell:3};
        
        
        //PIECE 8  ##
        //          #
        _aPieceConfig[7] = {list_pos:[{row:0,col:0},{row:0,col:1},{row:1,col:1}],type:8,num_cell:3};
        
        
       
        //PIECE 16  ##
        //          ##
        _aPieceConfig[8] = {list_pos:[{row:0,col:0},{row:0,col:1},{row:1,col:0},{row:1,col:1}],type:9,num_cell:4};
        
        NUM_PIECES = _aPieceConfig.length;
       
       
       
       ////////////////////////////
       
       _aSpriteSheetType = new Array();
       
       for(var k=1;k<NUM_TYPES+1;k++){
           var oData = {   
                        images: [s_oSpriteLibrary.getSprite("cell_"+k)], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_WIDTH, height: CELL_HEIGHT,regX:CELL_WIDTH/2,regY:CELL_HEIGHT/2}, 
                        animations: {start:0,idle_0:[0,23,"start"],idle_1:[24,45,"start"],idle_2:[46,66,"start"],drag:67}
                   };
                   
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            
            _aSpriteSheetType[k] = oSpriteSheet;
       }
       
        ///////////////////////////
        _aCellSize = new Array();
        for(var j=0;j<NUM_PIECES;j++){
            _aCellSize[j] = {width:CELL_WIDTH,height:CELL_HEIGHT};
        }
        
        _aCellSize[9] = {width:350,height:350};
        _aCellSize[10] = {width:98,height:108};
        _aCellSize[11] = {width:350,height:350};
        _aCellSize[12] = {width:98,height:108};
    };
    
        
    this.getRandPieceInfos = function(){
        var iRand = Math.floor(Math.random()*NUM_PIECES);

        return _aPieceConfig[iRand];
    };
    
    this.getPieceInfos = function(iIndex){
        return _aPieceConfig[iIndex];
    };
    
    this.getSpriteSheet = function(iType){
        return _aSpriteSheetType[iType];
    };
    
    this.getCellSize = function(iIndex){
        return _aCellSize[iIndex];
    };
    
    this._init();
}

