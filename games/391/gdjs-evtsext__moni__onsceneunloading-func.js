
if (typeof gdjs.evtsExt__Moni__onSceneUnloading !== "undefined") {
  gdjs.evtsExt__Moni__onSceneUnloading.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Moni__onSceneUnloading = {};

gdjs.evtsExt__Moni__onSceneUnloading.conditionTrue_0 = {val:false};
gdjs.evtsExt__Moni__onSceneUnloading.condition0IsTrue_0 = {val:false};


gdjs.evtsExt__Moni__onSceneUnloading.userFunc0xe30a38 = function(runtimeScene, eventsFunctionContext) {
"use strict";
if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') sdk.showBanner();

};
gdjs.evtsExt__Moni__onSceneUnloading.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Moni__onSceneUnloading.userFunc0xe30a38(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__Moni__onSceneUnloading.func = function(runtimeScene, parentEventsFunctionContext) {
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


gdjs.evtsExt__Moni__onSceneUnloading.eventsList0(runtimeScene, eventsFunctionContext);
return;
}

gdjs.evtsExt__Moni__onSceneUnloading.registeredGdjsCallbacks = [];
gdjs.evtsExt__Moni__onSceneUnloading.registeredGdjsCallbacks.push((runtimeScene) => {
    gdjs.evtsExt__Moni__onSceneUnloading.func(runtimeScene, runtimeScene);
})
gdjs.registerRuntimeSceneUnloadingCallback(gdjs.evtsExt__Moni__onSceneUnloading.registeredGdjsCallbacks[gdjs.evtsExt__Moni__onSceneUnloading.registeredGdjsCallbacks.length - 1]);
