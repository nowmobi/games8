/*
 * This script replaces the console logs and warns if it's in developments. It checks if the URL contains the word localhost, playcanvas and debug. 
 * If so, it's in dev mode. If you want the console logs to be visible even if it's a production build, change the variable DEBUG to true!
 */

(function() {
    var DEBUG = false;

    var conditions = ['localhost', 'playcanvas', 'debug'];
    var isDev = conditions.some(function(el) {
        return window.location.href.includes(el);
    });

    pc.util.DEBUG = isDev || DEBUG;

    if (!(isDev || DEBUG)) {
        window.console.log = function() {};
        window.console.warn = function() {};
        window.console.info = function() {};
    }
})();