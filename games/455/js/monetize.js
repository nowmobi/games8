window.SDK_OPTIONS = {
      gameId: "y3fs2hldpu6rdhbh5ika7ktg74o6pf7o",
      onEvent: function (a) {
         switch (a.name) {
            case "SDK_GAME_PAUSE":

               break;
            case "SDK_GAME_START":

               break;
            case "SDK_READY":
               // when sdk is ready
               break;
         }
      }
   };
(function (a, b, c) {
   var d = a.getElementsByTagName(b)[0];
   a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src = "https://api.gamemonetize.com/sdk.js", d.parentNode.insertBefore(a, d))
})(document, "script", "gamemonetize-sdk"); 
