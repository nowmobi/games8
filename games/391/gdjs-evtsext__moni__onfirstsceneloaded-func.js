
if (typeof gdjs.evtsExt__Moni__onFirstSceneLoaded !== "undefined") {
  gdjs.evtsExt__Moni__onFirstSceneLoaded.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Moni__onFirstSceneLoaded = {};

gdjs.evtsExt__Moni__onFirstSceneLoaded.conditionTrue_0 = {val:false};
gdjs.evtsExt__Moni__onFirstSceneLoaded.condition0IsTrue_0 = {val:false};


gdjs.evtsExt__Moni__onFirstSceneLoaded.userFunc0xe30a38 = function(runtimeScene, eventsFunctionContext) {
"use strict";
const game = runtimeScene.getGame();

window.SDK_OPTIONS = {
    gameId: "ihy9isgxrqvidrj1mmhwkvlx8ychfytl",
    onEvent: function (a) {
        switch (a.name) {
            case "SDK_GAME_PAUSE":
                game.pause(true);
                Howler.mute(true);
                break;
            case "SDK_GAME_START":
                game.pause(false);
                Howler.mute(false);
                break;
        }
    }
};
(function (a, b, c) {
    var d = a.getElementsByTagName(b)[0];
    a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src = "https://api.gamemonetize.com/sdk.js", d.parentNode.insertBefore(a, d))
})(document, "script", "gamemonetize-sdk"); 
};
gdjs.evtsExt__Moni__onFirstSceneLoaded.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Moni__onFirstSceneLoaded.userFunc0xe30a38(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__Moni__onFirstSceneLoaded.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName];
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__Moni__onFirstSceneLoaded.eventsList0(runtimeScene, eventsFunctionContext);
return;
}

gdjs.evtsExt__Moni__onFirstSceneLoaded.registeredGdjsCallbacks = [];
gdjs.evtsExt__Moni__onFirstSceneLoaded.registeredGdjsCallbacks.push((runtimeScene) => {
    gdjs.evtsExt__Moni__onFirstSceneLoaded.func(runtimeScene, runtimeScene);
})
gdjs.registerFirstRuntimeSceneLoadedCallback(gdjs.evtsExt__Moni__onFirstSceneLoaded.registeredGdjsCallbacks[gdjs.evtsExt__Moni__onFirstSceneLoaded.registeredGdjsCallbacks.length - 1]);
