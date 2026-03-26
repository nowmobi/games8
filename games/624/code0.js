gdjs.MainSceneCode = {};
gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects1= [];
gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects2= [];
gdjs.MainSceneCode.GDBackGroundObjects1= [];
gdjs.MainSceneCode.GDBackGroundObjects2= [];
gdjs.MainSceneCode.GDMenuObjects1= [];
gdjs.MainSceneCode.GDMenuObjects2= [];
gdjs.MainSceneCode.GDMovingBubbleObjects1= [];
gdjs.MainSceneCode.GDMovingBubbleObjects2= [];
gdjs.MainSceneCode.GDNewBBTextObjects1= [];
gdjs.MainSceneCode.GDNewBBTextObjects2= [];
gdjs.MainSceneCode.GDGameGateObjects1= [];
gdjs.MainSceneCode.GDGameGateObjects2= [];


gdjs.MainSceneCode.userFunc0xcd9580 = function(runtimeScene) {
"use strict";
if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
sdk.showBanner();
}

};
gdjs.MainSceneCode.eventsList0 = function(runtimeScene) {

{


gdjs.MainSceneCode.userFunc0xcd9580(runtimeScene);

}


};gdjs.MainSceneCode.mapOfGDgdjs_9546MainSceneCode_9546GDGameGateObjects1Objects = Hashtable.newFrom({"GameGate": gdjs.MainSceneCode.GDGameGateObjects1});
gdjs.MainSceneCode.mapOfGDgdjs_9546MainSceneCode_9546GDMenuObjects1Objects = Hashtable.newFrom({"Menu": gdjs.MainSceneCode.GDMenuObjects1});
gdjs.MainSceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.window.setFullScreen(runtimeScene, true, true);
}{gdjs.evtTools.sound.playMusicOnChannel(runtimeScene, "Space_Drift.mp3", 1, false, 50, 1);
}
{ //Subevents
gdjs.MainSceneCode.eventsList0(runtimeScene);} //End of subevents
}

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


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("BackGround"), gdjs.MainSceneCode.GDBackGroundObjects1);
{for(var i = 0, len = gdjs.MainSceneCode.GDBackGroundObjects1.length ;i < len;++i) {
    gdjs.MainSceneCode.GDBackGroundObjects1[i].setYOffset(gdjs.MainSceneCode.GDBackGroundObjects1[i].getYOffset() - (1));
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("PurpleButtonWithShadow"), gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects1.length;i<l;++i) {
    if ( gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects1[k] = gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects1[i];
        ++k;
    }
}
gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
}{gdjs.evtTools.sound.stopMusicOnChannel(runtimeScene, 1);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("GameGate"), gdjs.MainSceneCode.GDGameGateObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.MainSceneCode.mapOfGDgdjs_9546MainSceneCode_9546GDGameGateObjects1Objects, runtimeScene, true, false);
}
if (isConditionTrue_0) {
{gdjs.evtTools.window.openURL("https://gamegate.org", runtimeScene);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Menu"), gdjs.MainSceneCode.GDMenuObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.MainSceneCode.mapOfGDgdjs_9546MainSceneCode_9546GDMenuObjects1Objects, runtimeScene, true, false);
}
if (isConditionTrue_0) {
{gdjs.evtTools.leaderboards.displayLeaderboard(runtimeScene, "a416d7c1-0763-4a7f-a9ed-6514775abd05", true);
}}

}


};

gdjs.MainSceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects1.length = 0;
gdjs.MainSceneCode.GDPurpleButtonWithShadowObjects2.length = 0;
gdjs.MainSceneCode.GDBackGroundObjects1.length = 0;
gdjs.MainSceneCode.GDBackGroundObjects2.length = 0;
gdjs.MainSceneCode.GDMenuObjects1.length = 0;
gdjs.MainSceneCode.GDMenuObjects2.length = 0;
gdjs.MainSceneCode.GDMovingBubbleObjects1.length = 0;
gdjs.MainSceneCode.GDMovingBubbleObjects2.length = 0;
gdjs.MainSceneCode.GDNewBBTextObjects1.length = 0;
gdjs.MainSceneCode.GDNewBBTextObjects2.length = 0;
gdjs.MainSceneCode.GDGameGateObjects1.length = 0;
gdjs.MainSceneCode.GDGameGateObjects2.length = 0;

gdjs.MainSceneCode.eventsList1(runtimeScene);

return;

}

gdjs['MainSceneCode'] = gdjs.MainSceneCode;
