System.register(["./application.js"], function (_export, _context) {
  "use strict";

  var Application, canvas, $p, bcr, application;

  function topLevelImport(url) {
    return System["import"](url);
  }

  return {
    setters: [function (_applicationJs) {
      Application = _applicationJs.Application;
    }],
    execute: function () {
      canvas = document.getElementById('GameCanvas');
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      canvas.width = bcr.width;
      canvas.height = bcr.height;
      application = new Application();
      topLevelImport('cc').then(function (engine) {
        return application.init(engine);
      }).then(function () {
        return application.start();
      })["catch"](function (err) {
        console.error(err);
      });
    }
  };
});

let isPlayAd = false;
window.SDK_OPTIONS = {
 gameId: "gbi6qfsgwe5ey4zw1okifiab099hj7ke",
 onEvent: function (a) {
    switch (a.name) {
       case "SDK_GAME_PAUSE":
          // pause game logic / mute audio
          console.log("SDK_GAME_PAUSE==========>>>>>isPlayAd:", isPlayAd);
         //  isPlayAd = true;
          break;
       case "SDK_GAME_START":
          // advertisement done, resume game logic and unmute audio
          console.log("SDK_GAME_START==========1>>>>>isPlayAd:", isPlayAd);
          if(isPlayAd){
             window["mWatchAdCallback"] && window["mWatchAdCallback"]();
             isPlayAd = false;
             console.log("SDK_GAME_START==========2>>>>>isPlayAd:", isPlayAd);
          }
          window["mWatchAdCallbackInter"] && window["mWatchAdCallbackInter"]();
          break;
     case "STARTED":
         // when sdk is play
         isPlayAd = true;
         console.log("STARTED==========>>>>>isPlayAd:", isPlayAd);
         break;
       case "SDK_READY":
          // when sdk is ready
          console.log("SDK_READY==========>>>>>isPlayAd:", isPlayAd);
          isPlayAd = true;
          break;
     case "SDK_ERROR":
         // when sdk get error
         console.log("SDK_ERROR==========>>>>>isPlayAd:", isPlayAd);
         // isPlayAd = false;
         break;
    }
 }
};

(function (a, b, c) {
  var d = a.getElementsByTagName(b)[0];
  a.getElementById(c) || (a = a.createElement(b),
  a.id = c, a.src = "https://api.gamemonetize.com/sdk.js",
  d.parentNode.insertBefore(a, d))
  })(document, "script", "gamemonetize-sdk"); 