//hotkeys: https://developer.playcanvas.com/en/user-manual/scripting/code-editor/#hot-keys
//
(function() {
    pc.util = {};

    pc.util.DEBUG = true;
    pc.util.EXPLICIT = false;
    pc.util.DEBUG_FB = false;

    pc.util.EVENT_CLICK = pc.Application.getApplication().touch ? pc.EVENT_TOUCHEND : pc.EVENT_MOUSEUP;

    pc.util.COLL_MASK_SCENERY = 1 << 15;
    pc.util.COLL_MASK_PLAYER = 1 << 14;
    pc.util.COLL_MASK_BALL = 1 << 13;
    pc.util.COLL_MASK_CAMERA = 1 << 12;

    pc.util.COLL_MASK_TRIGGER = (1 << 4) | (1 << 2);
    pc.util.COLL_MASK_ENGINE = 1 << (64 - 1);

    // Prevent event bubbling (optimizes listeners)
    pc.util.processEvent = function(event) {
        event.stopPropagation();
    };

    pc.util.ray = {
        start: new pc.Vec3(0, 0, 0),
        end: new pc.Vec3(0, 0, 0),
        get: function(app) {
            return app.systems.rigidbody.raycastFirst(pc.util.ray.start, pc.util.ray.end);
        }
    };

    // Return if match with one or more words ("Nick|Weikang|CloudGames")
    // NOTE: Currently CaseSensitive! [Global i modifier doesnt work]
    // also not a true regexep, how to concatenate them?
    pc.util.strHasWord = function(string, word) {
        return !!string.match('^(.*?(' + word + ')[^$]*)$');
    };

    // Variation on strHasWord that returns the match itself
    pc.util.strGetMatch = function(string, word) {
        var match = string.match('^(.*?(' + word + ')[^$]*)$');
        return match[match.length - 1];
    };

    pc.util.isMobile = function() {
        return /Android/i.test(navigator.userAgent) ||
            /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };

    pc.util.arrayContainsTag = function(array, tag) {
        return array._list.includes(tag);
    };

    pc.util.getDistance = function(pos1, pos2) {
        var x = pos1.x - pos2.x;
        var y = pos1.y - pos2.y;
        var z = pos1.z - pos2.z;

        var temp = new pc.Vec3(x, y, z);
        return temp.length();
    };

    pc.util.lerpClamp = function(start, end, amt) {
        return (1 - pc.util.clamp01(amt)) * start + pc.util.clamp01(amt) * end;
    };

    pc.util.lerp = function(start, end, amt) {
        if (start > end) {
            return (amt) * start + (1 - amt) * end;
        }
        return (1 - amt) * start + amt * end;
    };

    pc.util.clamp = function(value, low, high) {
        return value <= low ? low : value >= high ? high : value;
    };

    pc.util.clamp01 = function(value) {
        return value <= 0.0 ? 0.0 : value >= 1.0 ? 1.0 : value;
    };

    //
    // Remaps 'value' from original range 'min-max' to new range 'from-to'
    //
    pc.util.remap = function(value, min, max, from, to) {
        return from + (to - from) * (value - min) / (max - min);
    };

    //
    // Returns if value is in range [min, max>
    //
    pc.util.isInRange = function(value, min, max) {
        return (value >= min) && (value < max);
    };

    ///
    // Returns the Euclidean distance between two vectors.
    ///
    pc.util.distance = function(vec1, vec2) {
        var dist = Math.sqrt(Math.pow((vec1.x - vec2.x), 2) + Math.pow((vec1.y - vec2.y), 2) + Math.pow((vec1.z - vec2.z), 2));
        return dist;
    };

    ///
    // Returns a int between min and max - 1
    ///
    pc.util.next = function(min, max) {
        return min + (Math.random() * (max - min));
    };

    ///
    // Returns a int between min and max - 1
    ///
    pc.util.nextInt = function(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    };

    ///
    // Returns a int between 0 and max - 1
    ///
    pc.util.nextInt = function(max) {
        return Math.floor(Math.random() * max);
    };

    //
    // Rounds num1 to num2 if difference is smaller than variance
    //
    pc.util.roundApproximate = function(num1, num2, variance) {
        if (Math.abs(num2 - num1) < variance) return num2;
        else return num1;
    };

    //
    // Clamps num between 0 and 1 and rounds appromixations using variance
    //
    pc.util.clamp01Approximate = function(num, variance) {
        return num <= variance ? 0.0 : num >= (1.0 - variance) ? 1.0 : num;
    };

    pc.util.secondsToTimer = function(seconds, showHours, singleMinutes) {
        var totalSeconds = seconds;
        var hour = Math.floor(totalSeconds / 3600);
        totalSeconds -= hour * 3600;
        hour = pc.util.pad(hour);
        var min = Math.floor(totalSeconds / 60);
        if (!singleMinutes) min = pc.util.pad(min);
        totalSeconds -= min * 60;
        totalSeconds = pc.util.pad(totalSeconds);
        var text = showHours ? hour + ':' + min + ':' + totalSeconds : min + ':' + totalSeconds;

        return text;
    };

    pc.util.pad = function(stringToPad, width, z) {
        return stringToPad.toString().length >= (width || 2) ? stringToPad : new Array((width || 2) - stringToPad.toString().length + 1).join(z || '0') + stringToPad;
    };

    pc.util.getScreenShot = function() {
        return this.app.graphicsDevice.canvas.toDataURL();

        //var img = new Image();
        //img.src = this.app.graphicsDevice.canvas.toDataURL();
    };

    pc.util.textToUnicode = function(text) {
        return text.split('').map(function(value, index, array) {
            var dec = value.charCodeAt(0);

            if (dec <= 127) {
                return value;
            }

            var temp = dec.toString(16).padStart(4, '0');
            return '\\u' + temp;
        }).join('');
    };

    pc.util.isEmpty = function(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };
})();