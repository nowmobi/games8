gdjs.Game_95OverCode = {};
gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1= [];
gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects2= [];
gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1= [];
gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects2= [];
gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1= [];
gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects2= [];
gdjs.Game_95OverCode.GDBackGroundObjects1= [];
gdjs.Game_95OverCode.GDBackGroundObjects2= [];
gdjs.Game_95OverCode.GDMenuObjects1= [];
gdjs.Game_95OverCode.GDMenuObjects2= [];
gdjs.Game_95OverCode.GDMovingBubbleObjects1= [];
gdjs.Game_95OverCode.GDMovingBubbleObjects2= [];
gdjs.Game_95OverCode.GDNewBBTextObjects1= [];
gdjs.Game_95OverCode.GDNewBBTextObjects2= [];
gdjs.Game_95OverCode.GDGameGateObjects1= [];
gdjs.Game_95OverCode.GDGameGateObjects2= [];
gdjs.Game_95OverCode.GDScoreTextObjects1= [];
gdjs.Game_95OverCode.GDScoreTextObjects2= [];
gdjs.Game_95OverCode.GDTextInputObjects1= [];
gdjs.Game_95OverCode.GDTextInputObjects2= [];


gdjs.Game_95OverCode.mapOfGDgdjs_9546Game_959595OverCode_9546GDMenuObjects1Objects = Hashtable.newFrom({"Menu": gdjs.Game_95OverCode.GDMenuObjects1});
gdjs.Game_95OverCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("PurpleButtonWithShadow"), gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1);
gdjs.copyArray(runtimeScene.getObjects("PurpleButtonWithShadow2"), gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1);
gdjs.copyArray(runtimeScene.getObjects("PurpleButtonWithShadow3"), gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1);
gdjs.copyArray(runtimeScene.getObjects("ScoreText"), gdjs.Game_95OverCode.GDScoreTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("TextInput"), gdjs.Game_95OverCode.GDTextInputObjects1);
{for(var i = 0, len = gdjs.Game_95OverCode.GDScoreTextObjects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDScoreTextObjects1[i].setString("YOUR SCORE: " + gdjs.evtTools.common.toString(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(2))));
}
}{for(var i = 0, len = gdjs.Game_95OverCode.GDScoreTextObjects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDScoreTextObjects1[i].setX((gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) - (gdjs.Game_95OverCode.GDScoreTextObjects1[i].getWidth())) / 2);
}
}{for(var i = 0, len = gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1[i].setX((gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) - (gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1[i].getWidth())) / 2);
}
}{for(var i = 0, len = gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1[i].setX((gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) - (( gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1.length === 0 ) ? 0 :gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1[0].getWidth())) / 2);
}
}{for(var i = 0, len = gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1[i].setX((gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) - (( gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1.length === 0 ) ? 0 :gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1[0].getWidth())) / 2);
}
}{for(var i = 0, len = gdjs.Game_95OverCode.GDTextInputObjects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDTextInputObjects1[i].setX((gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) - (( gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1.length === 0 ) ? 0 :gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1[0].getWidth())) / 2);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("PurpleButtonWithShadow"), gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1.length;i<l;++i) {
    if ( gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1[k] = gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1[i];
        ++k;
    }
}
gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1.length = k;
if (isConditionTrue_0) {
{runtimeScene.getGame().getVariables().getFromIndex(2).setNumber(0);
}{runtimeScene.getGame().getVariables().getFromIndex(1).setNumber(60);
}{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber(1);
}{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("PurpleButtonWithShadow2"), gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1);
gdjs.copyArray(runtimeScene.getObjects("TextInput"), gdjs.Game_95OverCode.GDTextInputObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1.length;i<l;++i) {
    if ( gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1[k] = gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1[i];
        ++k;
    }
}
gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_95OverCode.GDTextInputObjects1.length;i<l;++i) {
    if ( gdjs.Game_95OverCode.GDTextInputObjects1[i].getString() != "" ) {
        isConditionTrue_0 = true;
        gdjs.Game_95OverCode.GDTextInputObjects1[k] = gdjs.Game_95OverCode.GDTextInputObjects1[i];
        ++k;
    }
}
gdjs.Game_95OverCode.GDTextInputObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1 */
/* Reuse gdjs.Game_95OverCode.GDTextInputObjects1 */
{gdjs.evtTools.leaderboards.savePlayerScore(runtimeScene, "a416d7c1-0763-4a7f-a9ed-6514775abd05", gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(2)), (( gdjs.Game_95OverCode.GDTextInputObjects1.length === 0 ) ? "" :gdjs.Game_95OverCode.GDTextInputObjects1[0].getString()));
}{for(var i = 0, len = gdjs.Game_95OverCode.GDTextInputObjects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDTextInputObjects1[i].setY(-(200));
}
}{for(var i = 0, len = gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1[i].setY(-(500));
}
}{gdjs.evtTools.leaderboards.displayLeaderboard(runtimeScene, "a416d7c1-0763-4a7f-a9ed-6514775abd05", true);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("PurpleButtonWithShadow3"), gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1.length;i<l;++i) {
    if ( gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1[k] = gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1[i];
        ++k;
    }
}
gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.window.openURL("https://gamegate.org", runtimeScene);
}}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("BackGround"), gdjs.Game_95OverCode.GDBackGroundObjects1);
{for(var i = 0, len = gdjs.Game_95OverCode.GDBackGroundObjects1.length ;i < len;++i) {
    gdjs.Game_95OverCode.GDBackGroundObjects1[i].setYOffset(gdjs.Game_95OverCode.GDBackGroundObjects1[i].getYOffset() - (1));
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "Escape");
if (isConditionTrue_0) {
{gdjs.evtTools.window.setFullScreen(runtimeScene, false, true);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Menu"), gdjs.Game_95OverCode.GDMenuObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_95OverCode.mapOfGDgdjs_9546Game_959595OverCode_9546GDMenuObjects1Objects, runtimeScene, true, false);
}
if (isConditionTrue_0) {
{gdjs.evtTools.leaderboards.displayLeaderboard(runtimeScene, "a416d7c1-0763-4a7f-a9ed-6514775abd05", true);
}}

}


};

gdjs.Game_95OverCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects1.length = 0;
gdjs.Game_95OverCode.GDPurpleButtonWithShadowObjects2.length = 0;
gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects1.length = 0;
gdjs.Game_95OverCode.GDPurpleButtonWithShadow2Objects2.length = 0;
gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects1.length = 0;
gdjs.Game_95OverCode.GDPurpleButtonWithShadow3Objects2.length = 0;
gdjs.Game_95OverCode.GDBackGroundObjects1.length = 0;
gdjs.Game_95OverCode.GDBackGroundObjects2.length = 0;
gdjs.Game_95OverCode.GDMenuObjects1.length = 0;
gdjs.Game_95OverCode.GDMenuObjects2.length = 0;
gdjs.Game_95OverCode.GDMovingBubbleObjects1.length = 0;
gdjs.Game_95OverCode.GDMovingBubbleObjects2.length = 0;
gdjs.Game_95OverCode.GDNewBBTextObjects1.length = 0;
gdjs.Game_95OverCode.GDNewBBTextObjects2.length = 0;
gdjs.Game_95OverCode.GDGameGateObjects1.length = 0;
gdjs.Game_95OverCode.GDGameGateObjects2.length = 0;
gdjs.Game_95OverCode.GDScoreTextObjects1.length = 0;
gdjs.Game_95OverCode.GDScoreTextObjects2.length = 0;
gdjs.Game_95OverCode.GDTextInputObjects1.length = 0;
gdjs.Game_95OverCode.GDTextInputObjects2.length = 0;

gdjs.Game_95OverCode.eventsList0(runtimeScene);

return;

}

gdjs['Game_95OverCode'] = gdjs.Game_95OverCode;
