


var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 960;
var ARENA_WIDTH = 10000;
var ARENA_HEIGHT = 10000;
var BOUNDARY_HEIGHT = 136;

var uWidth = 1;
var uHeight = 1;

var canvasWidth = 1280;
var canvasHeight = 960;

var scaledWidth = 1280;
var scaledHeight = 960;

var zoomDX = 0;
var zoomDY = 0;

var scrollXRange = 0;
var scrollYRange = 0;

var SCROLL_xRANGE_noZOOM = 0;
var SCROLL_yRANGE_noZOOM = 0;

var scrolluX = 0;
var scrolluY = 0;

var maxSnakes = 20;

var ASPECT_RATIO = CANVAS_WIDTH/CANVAS_HEIGHT;

var DEFAULT_ZOOM = 1;
var isDebugging = false;

const SCREENS = {
    DEFAULT : -1,
    PRELOAD: 0,
    MENU: 1,
    SELECTION: 2,
    CONNECTING: 3,
    GAMEPLAY: 5
}
const PLATFORMS = {
    WEB : 0,
    GD : 1,
    FACEBOOK : 2
}




var gameScreen = SCREENS.PRELOAD;
var platform = PLATFORMS.GD;
var isFirstGamePlayed = false;
var myLastStrength = 0;
var myDeathPosX = 0;
var myDeathPosY= 0;



//var boostTapID = 0;



var isGameStarted = false;
var isOnMobile = detectmob();
if(isOnMobile == false)
{
    if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
        isOnMobile = true;
}
var isOnSite = true;
var camFreezed = true;

var isPlayAgainAvailable = true;

function setMobileParams()
{
    if(!isOnMobile)
        return;
    ARENA_WIDTH = 7000;
    ARENA_HEIGHT = 7000;
    MAX_FOOD = 200;
    maxSnakes = 10;
    FOOD_VALUE = 0.5;
    LEFTOVER_VALUE = 0.5;
    BOOST_SPEED = 0.8;
    BOOST_ACC = 0.0015;
    BOOST_DEACC = 0.0035;
}


var scenes=[];
scenes.push(BootScene),
scenes.push(PreloadScene),
scenes.push(MenuScene),
scenes.push(GameScene),
scenes.push(GameHudScene);

var Config;




var game;

//game.canvas.id = "gamecnavas";

var touchID = -1;
var aGame;
var LAYER_BG, BOUNDARIES;
var player,
    cam,
    map,
    selectSnake;
var camSpeed = 100;
var snakeNo = 0;
var snakes = [];
var food = [];
var pointerX = 0;
var pointerY = 0;


var snakesHeadX = [];
var snakesHeadY = [];
var fromGameOverScreen = false;

var foodTick = 0;

var base64Picture = null;

var isJoystickEnabled = true;
var isInstructionDisplayed = false;


function captureScreenShot()
{
    console.log("CP CALLED");
    base64Picture = game.canvas.toDataURL("png");
    GameHudScene.headertext.alpha = 0;
    GameHudScene.lengthtext.alpha = 0;
}


function ProceedToGame()
{
    MenuScene.cameras.main.fadeOut(500, 0);
    document.getElementById('yourname').style.display = "none";

}
function ProceedToGameEnd()
{
    GameHudScene.Show_GameOverScreen();
    switch(platform)
    {
        case PLATFORMS.WEB:
        setTimeout(GameOver,2500);
        setTimeout(function(){ GameHudScene.cameras.main.fadeOut(500,0,0,0); }, 2000);
        break;

        case PLATFORMS.GD:
        setTimeout(GameOver,2500);
        setTimeout(function(){ GameHudScene.cameras.main.fadeOut(500,0,0,0); }, 2000);
        break;

        case PLATFORMS.FACEBOOK:
        if(isFBInstSDKReady)
        {
            // no play again for strength less than 60
            if(myLastStrength < 60)
            {
                isPlayAgainAvailable = false;
            }
            isVideoAdPreloaded = false;

            if(isPlayAgainAvailable)
            {
                GameHudScene.ShowResume(isVideoAdPreloaded);
                isPlayAgainAvailable = false;
            }
            else
            {
                if (supportedAPIs.includes('getInterstitialAdAsync'))
                {
                    preloadFBInterstatial();
                }
                setTimeout(GameOver,2500);
                setTimeout(function(){ GameHudScene.cameras.main.fadeOut(500,0,0,0); }, 2000);
            }
                
            /*
            FBInstant.setSessionData({
                playerWon:true
            });
            */   
        }
        break;
    }


    //setTimeout(GameOver,2500);
}


function GetLocalProfile()
{
    myName = sessionStorage.getItem(PREFIX +"name");
    if(myName == null)
        myName = "";

    myLongestLength = sessionStorage.getItem(PREFIX +"length");
    if(myLongestLength == null)
        myLongestLength = 0;
    myLongestLength = parseInt(myLongestLength);
    document.getElementById('yourname').value  = myName;

}


function StartGame()
{
    switch(platform)
    {
        case PLATFORMS.WEB:
        break;

        case PLATFORMS.GD:
        break;

        case PLATFORMS.FACEBOOK:
        if(isFBInstSDKReady)
        {
            
        }
        break;
    }



    isPlayAgainAvailable = true;
    isFirstGamePlayed = true;
    snakeNo = 0;
    mapUX = MAP_WIDTH/ARENA_WIDTH;
    mapUY = MAP_HEIGHT/ARENA_HEIGHT;
    aGame.cameras.main.setBounds(0, 0, ARENA_WIDTH, ARENA_HEIGHT);
    LAYER_BG = aGame.add.tileSprite(0, 0, ARENA_WIDTH, ARENA_HEIGHT, 'background').setOrigin(0, 0);
    LAYER_BG.setDepth(DEPTH_BG);

    for(var boundaryNo=0; boundaryNo<4; boundaryNo++)
    {
        var aBoundary;
        switch(boundaryNo)
        {
            case 0:
            aBoundary = aGame.add.tileSprite(0, 0, ARENA_WIDTH, BOUNDARY_HEIGHT, 'boundary').setOrigin(0, 0);
            aBoundary.angle = 0;
            aBoundary.setDepth(DEPTH_BOUNDARY);
            break;
            case 1:

            aBoundary = aGame.add.tileSprite(ARENA_WIDTH, 0, ARENA_HEIGHT, BOUNDARY_HEIGHT, 'boundary').setOrigin(0, 0);
            aBoundary.angle = 90;
            aBoundary.setDepth(DEPTH_BOUNDARY);
            break;

            case 2:
            aBoundary = aGame.add.tileSprite(ARENA_WIDTH, ARENA_HEIGHT, ARENA_WIDTH, BOUNDARY_HEIGHT, 'boundary').setOrigin(0, 0);
            aBoundary.angle = 180;
            aBoundary.setDepth(DEPTH_BOUNDARY);
            break;
            case 3:
            aBoundary = aGame.add.tileSprite(0, ARENA_HEIGHT, ARENA_HEIGHT, BOUNDARY_HEIGHT, 'boundary').setOrigin(0, 0);
            aBoundary.angle = 270;
            aBoundary.setDepth(DEPTH_BOUNDARY);
            break;
        }
              
    }
    if(isDebugging)
    {
        text = aGame.add.text(304, 230).setScrollFactor(0);
        text.style.fontSize = "128px";
        text.width = 600;
        text.height = 600;
        text.setDepth(10000);
        text.setShadow(1, 1, '#000000', 2);  
    }

    cursors = aGame.input.keyboard.createCursorKeys();
    aGame.snakesDetector = aGame.physics.add.group();
    aGame.snakeHeads = aGame.physics.add.group();
    //aGame.snakeBodies = aGame.physics.add.group();
    aGame.snakeBodies = aGame.add.group();

    var spawnX,spawnY;
    spawnX = Phaser.Math.RND.between(SPAWN_OFFSET, ARENA_WIDTH - SPAWN_OFFSET);
    spawnY = Phaser.Math.RND.between(SPAWN_OFFSET, ARENA_HEIGHT - SPAWN_OFFSET);
    player = new Snake(aGame, spawnX, spawnY, true, snakeNo, mySkinNo, 35, myName);

    snakes.push(player);

    for(snakeNo=1; snakeNo<maxSnakes; snakeNo++)
    {
        spawnX = Phaser.Math.RND.between(SPAWN_OFFSET, ARENA_WIDTH - SPAWN_OFFSET);
        spawnY = Phaser.Math.RND.between(SPAWN_OFFSET, ARENA_HEIGHT - SPAWN_OFFSET);
        var aSnake = new Snake(aGame, spawnX, spawnY, false, snakeNo, Phaser.Math.RND.between(0,MAX_SKINS-1), Phaser.Math.RND.between(MIN_STRENGTH,MAX_STRENGTH),"Opponent");
        snakes.push(aSnake);
    }
    InitFood();

    if(platform == PLATFORMS.FACEBOOK)
    {
        if(entryData == null)
            onScoreToBeatUpdate(35);
    }

    //aGame.physics.add.overlap(aGame.snakesDetector, aGame.foodGroup, OnOverlap_with_Food, null, this);


    setInterval(UpdateLeaderboard,LB_FRESH_INTERVAL*1000);
    game.canvas.style.cursor = "default";
    isGameStarted = true;
    onGameStarted(35);
}



function ResumeGame()
{
    console.log("Game Resumed");
    cam.zoom = 1 * DEFAULT_ZOOM;
    UpdateZoomParams(cam.zoom);
    //Scale(window.innerWidth, window.innerHeight);
    //snakeNo ++;
    
    if(platform == PLATFORMS.FACEBOOK)
        onScoreToBeatUpdate(myLastStrength);

    player = new Snake(aGame, myDeathPosX, myDeathPosY, true, 0, mySkinNo, myLastStrength, myName);
    snakes.push(player);
    GameHudScene.Hide_GameOverScreen();
    GameHudScene.HideResume();
}

function GameOver()
{
    if(myLastStrength > myLongestLength)
    {
        myLongestLength = myLastStrength;
        sessionStorage.setItem(PREFIX +"length",myLongestLength);
    }

    if(platform == PLATFORMS.FACEBOOK)
    {
        if(isFBInstSDKReady)
        {
            if(myLastStrength > fbData.profile.score)
            {
                fbData.profile.score = myLastStrength;
                updateFbLeaderboard(fbData.profile.score);
                updateMyCloudData(fbData.profile.score);
            }
            if(entryData !=null)
            {
                if(!isChallengeDefeated)
                {
                    grabTryAgainImage();
                }
            }
        }
    }
    fromGameOverScreen = true;
    snakes = [];
    food = [];
    snakesHeadX = [];
    snakesHeadY = [];
    isGameStarted = false;
    game.scene.stop("Game");
    game.scene.stop("GameHud");
    game.scene.start("Menu");
    onGameOver();

    if(!isSessionDataSent)
    {
        console.log('Data SENT');
        isSessionDataSent = true;
        FBInstant.setSessionData({
            playerWon:true
        });
    }

    
}
function OfflineGame()
{
    isGameStarted = false;
    GameHudScene.Show_GameOverScreen();
    GameHudScene.gameover.title.text = "No network connection";
    GameHudScene.gameover.detail.text = "Please check your internet connection and refresh the page";
}

function RebornSnake()
{
    if(!isGameStarted)
        return;
    spawnX = Phaser.Math.RND.between(SPAWN_OFFSET, ARENA_WIDTH - SPAWN_OFFSET);
    spawnY = Phaser.Math.RND.between(SPAWN_OFFSET, ARENA_HEIGHT - SPAWN_OFFSET);
    var aSnake = new Snake(aGame, spawnX, spawnY, false, snakeNo, Phaser.Math.RND.between(0,MAX_SKINS-1), 40,namesPool[Phaser.Math.RND.between(0,maxNames-1)].slice(0,-1));
    snakes.push(aSnake);
    snakeNo++;
}







function OnOverlap_with_Food(snakeDetector, food)
{
    food.body.checkCollisions = false;
    food.body.enable = false;
    food.class.pick(snakeDetector.class.head);
    snakeDetector.class.addStrength(food.class.value);
}

function Scale (width, height)
{
    canvasWidth = width;
    canvasHeight = height;
    uWidth = canvasWidth/CANVAS_WIDTH;
    uHeight = canvasHeight/CANVAS_HEIGHT;
    AdjustDefaultZoom();
    console.log(width +"<>"+ height);

    switch(gameScreen)
    {
        case SCREENS.PRELOAD:
        PreloadScene.cameras.resize(canvasWidth, canvasHeight);
        PreloadScene.tileBg.setPosition(canvasWidth*0.5, canvasHeight*0.5);
        PreloadScene.logo.setPosition(canvasWidth*0.5, -zoomDY + 75);
        PreloadScene.bg.setPosition(canvasWidth*0.5,canvasHeight*0.5);
        PreloadScene.bg.displayWidth = canvasWidth/DEFAULT_ZOOM;
        PreloadScene.bg.displayHeight = (canvasWidth/DEFAULT_ZOOM)/(1500/960);

        if(platform == PLATFORMS.WEB || platform == PLATFORMS.GD)
        {
            PreloadScene.progressBox.setPosition(canvasWidth*0.5, canvasHeight+zoomDY - uHeight*100);
            PreloadScene.progressBar.setPosition(canvasWidth*0.5 - PROGRESS_BAR_WIDTH*0.5, canvasHeight+zoomDY - uHeight*108 - (1-uHeight)*8);
            PreloadScene.loadingText.setPosition(canvasWidth*0.5, canvasHeight+zoomDY - uHeight*180 - (1-uHeight)*PreloadScene.loadingText.height);
        }
        break;

        case SCREENS.MENU:
        case SCREENS.CONNECTING:
        case SCREENS.SELECTION:
        var nameField = document.getElementById('yourname');
        MenuScene.cameras.resize(canvasWidth, canvasHeight);
        MenuScene.logo.setPosition(canvasWidth*0.5, -zoomDY + 100);
        MenuScene.tileBg.setPosition(canvasWidth*0.5, canvasHeight*0.5);
        MenuScene.bg.setPosition(canvasWidth*0.5,canvasHeight*0.5);
        MenuScene.bg.displayWidth = canvasWidth/DEFAULT_ZOOM;
        MenuScene.bg.displayHeight = canvasHeight/DEFAULT_ZOOM;

        MenuScene.overlayBg.setPosition(canvasWidth*0.5,canvasHeight*0.5);
        MenuScene.overlayBg.displayWidth = canvasWidth/DEFAULT_ZOOM;
        MenuScene.overlayBg.displayHeight = canvasHeight/DEFAULT_ZOOM;

        MenuScene.playButton.setPosition(canvasWidth*0.5, canvasHeight+zoomDY-275);
        MenuScene.skinButton.setPosition(canvasWidth*0.5, canvasHeight+zoomDY-135);
        MenuScene.emojisnakes.setPosition(canvasWidth*0.5, canvasHeight+zoomDY-65);


        if(platform == PLATFORMS.FACEBOOK)
        {
            MenuScene.shareButton.setPosition(canvasWidth*0.5 -450, canvasHeight+zoomDY-70);
            MenuScene.lbButton.setPosition(canvasWidth*0.5 -325, canvasHeight+zoomDY-70);
            MenuScene.challengeButton.setPosition(canvasWidth*0.5 +325, canvasHeight+zoomDY-70);
            MenuScene.inviteButton.setPosition(canvasWidth*0.5 +450, canvasHeight+zoomDY-70);

            MenuScene.myLongestLengthText.setPosition(canvasWidth*0.5, canvasHeight+zoomDY-470);
            MenuScene.myLongestLength.setPosition(canvasWidth*0.5, canvasHeight+zoomDY-420);
        }

        var canvasMinScale = Math.min(uHeight, uWidth);
        canvasMinScale = Phaser.Math.Clamp(canvasMinScale,0,1);
        nameField.style.transform = 'scale('+canvasMinScale+')';

        MenuScene.instruction.bg.setPosition(canvasWidth*0.5,canvasHeight*0.5);

        MenuScene.bg.displayWidth = canvasWidth/DEFAULT_ZOOM;
        MenuScene.bg.displayHeight = (canvasWidth/DEFAULT_ZOOM)/(1500/960);

        MenuScene.instruction.bg.displayWidth = canvasWidth/DEFAULT_ZOOM;
        MenuScene.instruction.bg.displayHeight = canvasHeight/DEFAULT_ZOOM;

        MenuScene.instruction.frame.setPosition(canvasWidth*0.5,canvasHeight*0.5);
        MenuScene.instruction.proceedButton.setPosition(canvasWidth*0.5,canvasHeight*0.5+200);

        MenuScene.connecting.bg.setPosition(canvasWidth*0.5,canvasHeight*0.5);
        MenuScene.connecting.bg.displayWidth = canvasWidth/DEFAULT_ZOOM;
        MenuScene.connecting.bg.displayHeight = canvasHeight/DEFAULT_ZOOM;
        MenuScene.connecting.icon.setPosition(canvasWidth*0.5, canvasHeight*0.5);
        MenuScene.connecting.ctext.setPosition(canvasWidth*0.5 -110, canvasHeight*0.5 +100);

        MenuScene.selection.bg.setPosition(canvasWidth*0.5,canvasHeight*0.5);
        MenuScene.selection.bg.displayWidth = canvasWidth/DEFAULT_ZOOM;
        MenuScene.selection.bg.displayHeight = canvasHeight/DEFAULT_ZOOM;
        MenuScene.selection.header.setPosition(canvasWidth*0.5,-zoomDY+50);

        MenuScene.selection.nextButton.setPosition(canvasWidth*0.5+525,canvasHeight*0.5);
        MenuScene.selection.backButton.setPosition(canvasWidth*0.5-525,canvasHeight*0.5);
        MenuScene.selection.selectButton.setPosition(canvasWidth*0.5, canvasHeight+zoomDY-135);

        if(gameScreen == SCREENS.SELECTION)
        {
            selectSnake.reposition(canvasWidth*0.5+125,canvasHeight*0.5);
        }
        break;

        case SCREENS.GAMEPLAY:
        if(isOnMobile)
        {
            GameHudScene.map.setPosition(MAP_OFFSET*Phaser.Math.Clamp(uWidth,0,1) -GameHudScene.zoomDX, -GameHudScene.zoomDY +MAP_OFFSET);
            GameHudScene.joystick.setPosition(-GameHudScene.zoomDX+JOYSTICK_OFFSET,GameHudScene.zoomDY+canvasHeight-JOYSTICK_OFFSET);
        }
        else
            GameHudScene.map.setPosition(MAP_OFFSET*Phaser.Math.Clamp(uWidth,0,1) -GameHudScene.zoomDX, canvasHeight - MAP_HEIGHT + GameHudScene.zoomDY -Phaser.Math.Clamp(uHeight,0,1)*MAP_OFFSET);
        aGame.cameras.resize(width, height);

        GameHudScene.headertext.setPosition(canvasWidth*0.5, canvasHeight*0.5-300);
        GameHudScene.lengthtext.setPosition(canvasWidth*0.5, canvasHeight*0.5-175);

        GameHudScene.nose.setPosition(canvasWidth + GameHudScene.zoomDX -80, canvasHeight + GameHudScene.zoomDY -80);
        GameHudScene.gameover.bg.setPosition(canvasWidth*0.5,canvasHeight*0.5);
        GameHudScene.gameover.bg.displayWidth = canvasWidth/DEFAULT_ZOOM;
        GameHudScene.gameover.bg.displayHeight = canvasHeight/DEFAULT_ZOOM;
        GameHudScene.gameover.title.setPosition (canvasWidth*0.5,canvasHeight*0.5 -50);
        GameHudScene.gameover.detail.setPosition (canvasWidth*0.5,canvasHeight*0.5 +20);

        GameHudScene.resume.adButton.setPosition(canvasWidth*0.5,canvasHeight*0.5 +200);
        GameHudScene.resume.inviteButton.setPosition(canvasWidth*0.5,canvasHeight*0.5 +200);
        GameHudScene.resume.timerText.setPosition(canvasWidth*0.5,canvasHeight*0.5 +285);

        GameHudScene.leaderboard.setPosition(canvasWidth + GameHudScene.zoomDX-Phaser.Math.Clamp(uWidth,0,1)*LB_xOFFSET,Phaser.Math.Clamp(uHeight,0,1)*LB_yOFFSET -GameHudScene.zoomDY);
        UpdateLBPosition(GameHudScene);
        break;
    }
    
    //AdjustDefaultZoom(width, height);
}

function AdjustDefaultZoom()
{

    var deltaWidth = canvasWidth - CANVAS_WIDTH;
    var deltaHeight = canvasHeight - CANVAS_HEIGHT;
    var aspectRatio = canvasWidth / canvasHeight;



    DEFAULT_ZOOM = 1;

    if(aspectRatio > ASPECT_RATIO)
    {
        DEFAULT_ZOOM = parseInt((canvasHeight / CANVAS_HEIGHT)*100)*0.01;
    }
    if(aspectRatio < ASPECT_RATIO)
    {
        DEFAULT_ZOOM = parseInt((canvasWidth / CANVAS_WIDTH)*100)*0.01;
    }


    //DEFAULT_ZOOM = 1;
    switch(gameScreen)
    {
        case SCREENS.PRELOAD:
        PreloadScene.cameras.main.zoom = DEFAULT_ZOOM;
        PreloadScene.cameras.resize(canvasWidth, canvasHeight);
        UpdateZoomParams(DEFAULT_ZOOM);
       
        break;

        case SCREENS.MENU:
        case SCREENS.CONNECTING:
        case SCREENS.SELECTION:
        MenuScene.cameras.main.zoom = DEFAULT_ZOOM;
        MenuScene.cameras.resize(canvasWidth, canvasHeight);
        UpdateZoomParams(DEFAULT_ZOOM);
        break;


        case SCREENS.GAMEPLAY:
        GameHudScene.zoomDX = ((canvasWidth / DEFAULT_ZOOM) - canvasWidth)*0.5;
        GameHudScene.zoomDY = ((canvasHeight / DEFAULT_ZOOM) - canvasHeight)*0.5;

        console.log(GameHudScene.zoomDX+"<>"+GameHudScene.zoomDY);

        GameHudScene.cameras.main.zoom = DEFAULT_ZOOM;
        GameHudScene.cameras.resize(canvasWidth, canvasHeight);
        if(isZooming)
        {
            z0 = player.czoom * DEFAULT_ZOOM;
            z1 = player.zoom * DEFAULT_ZOOM;
        }
        else
            cam.zoom = DEFAULT_ZOOM * player.czoom;

        UpdateZoomParams(cam.zoom);
        break;
    }
    //console.log("<DWidth>" + deltaWidth + "<DHeight>" + deltaHeight);
    //console.log(Width_WRT_height +"<>"+ Height_WRT_width);
}
function UpdateZoomParams(zoomValue)
{
    scaledWidth = canvasWidth / zoomValue;
    scaledHeight = canvasHeight / zoomValue;

    zoomDX = (scaledWidth - canvasWidth)*0.5;
    zoomDY = (scaledHeight - canvasHeight)*0.5;

    scrollXRange = (ARENA_WIDTH - canvasWidth) - zoomDX*2;
    scrollYRange = (ARENA_HEIGHT - canvasHeight) - zoomDY*2;

    SCROLL_xRANGE_noZOOM = ARENA_WIDTH - canvasWidth;
    SCROLL_yRANGE_noZOOM = ARENA_HEIGHT- canvasHeight;

}


window.addEventListener('resize', function (event) {
    game.resize(window.innerWidth ,window.innerHeight);
    Scale(window.innerWidth, window.innerHeight);
    

}, false);


var SKIN_COLORS = 
[
'#ff6a23',
'#00c9bd',
'#4fcdff',
'#8752b2',
'#fd4b97',
'#c64585',
'#a3916f',
'#b274e5',
'#d7c2ab',
'#e15bdf',
'#6fb157',
'#002798',
'#987a00',
'#b03e73',
'#299800',
'#c2e254',
'#6fb157',
'#006bb7',
'#7a0026',
'#4100a3',
'#ecc821',
'#ff6060',
'#875546',
'#d00910',
'#8058bd',
'#0f9bff',
'#745018',
'#fc7f76',
'#be908d',
'#b578b7',
'#6fb157',
'#575bb1',
'#a3076a',
'#00a68d',
'#f7b400'
]
var FACE_BODY_INDEX = [
0,
15,
14,
0,
12,
11,
20,
9,
9,
15,
16,
17,
2,
9,
16,
15,
0,
20,
14,
20,
19,
8,
12,
11,
6,
2,
20,
9,
8,
21,
6,
2,
20,
3,
18,
6,
2,
8,
9,
1,
13,
3,
0,
12,
2,
10,
7,
13,
20,
0,
4,
10,
15,
10,
11,
10,
12,
12,
1,
3,
13,
8,
6,
15,
0,
4,
16,
0,
6,
18,
15,
15,
6,
1,
4
]

