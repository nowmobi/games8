const _0x41a5f5 = _0x5043;
(function(_0x2433bf, _0x2078f3) {
    const _0x5513d6 = _0x5043,
        _0x3bd353 = _0x2433bf();
    while (!![]) {
        try {
            const _0x6785a4 = -parseInt(_0x5513d6(0x1ad)) / 0x1 + -parseInt(_0x5513d6(0x1c2)) / 0x2 * (parseInt(_0x5513d6(0x1a1)) / 0x3) + -parseInt(_0x5513d6(0x1a8)) / 0x4 * (parseInt(_0x5513d6(0x1c0)) / 0x5) + parseInt(_0x5513d6(0x1ce)) / 0x6 * (parseInt(_0x5513d6(0x1dd)) / 0x7) + parseInt(_0x5513d6(0x19b)) / 0x8 + -parseInt(_0x5513d6(0x18a)) / 0x9 * (parseInt(_0x5513d6(0x1be)) / 0xa) + -parseInt(_0x5513d6(0x1b1)) / 0xb * (-parseInt(_0x5513d6(0x1dc)) / 0xc);
            if (_0x6785a4 === _0x2078f3) break;
            else _0x3bd353['push'](_0x3bd353['shift']());
        } catch (_0x52665b) {
            _0x3bd353['push'](_0x3bd353['shift']());
        }
    }
}(_0x243a, 0xf415c));

function collisionAABB(_0x12fdde, _0x2f1c81) {
    const _0x448288 = _0x5043;
    return _0x12fdde['x'] < _0x2f1c81['x'] + _0x2f1c81[_0x448288(0x1b8)] && _0x12fdde['x'] + _0x12fdde[_0x448288(0x1b8)] > _0x2f1c81['x'] && _0x12fdde['y'] < _0x2f1c81['y'] + _0x2f1c81[_0x448288(0x194)] && _0x12fdde['y'] + _0x12fdde['height'] > _0x2f1c81['y'] ? !![] : ![];
}

function initGame() {
    const _0x36d191 = _0x5043;
    isMobile = mobileAndTabletCheck();
    let _0x36d17b = new Audio();
    _0x36d17b['addEventListener']('canplaythrough', _0x4022d1 => {
        initStartGame();
    }), _0x36d17b['addEventListener'](_0x36d191(0x191), function _0x458bd0(_0x2e006a) {
        const _0x20cb61 = _0x36d191;
        console[_0x20cb61(0x18b)](_0x20cb61(0x19c)), initStartGame();
    }), _0x36d17b[_0x36d191(0x1ab)] = _0x36d191(0x1b0), _0x36d17b[_0x36d191(0x188)]();
}

function initStartGame() {
    const _0x3c63ab = _0x5043;
    snd[_0x3c63ab(0x1d3)][_0x3c63ab(0x1df)](), gameLoaded = !![], loadGame(), assetsCor(), gameState = _0x3c63ab(0x1e6);
}

function startGame() {
    const _0x49fb7f = _0x5043;
    if (!gameStarted) {
        if (!snd['mainMusic'][_0x49fb7f(0x19d)]) snd['mainMusic']['playLoop']();
        if (snd['button']) snd[_0x49fb7f(0x1e3)]['play']();
        gameStarted = !![], spr[_0x49fb7f(0x18f)][_0x49fb7f(0x1a3)] = ![];
    }
}

function saveGame() {
    const _0x10fa9c = _0x5043;
    localStorage[localStoragePrefixName + _0x10fa9c(0x198)] = bestScore;
}

function loadGame() {
    const _0x440dc2 = _0x5043;
    typeof localStorage[localStoragePrefixName + '_bestScore'] != _0x440dc2(0x1b4) && (bestScore = localStorage[localStoragePrefixName + '_bestScore']);
}

function assetsCor() {
    const _0x15071c = _0x5043;
    if (gameStarted) gameStarted = ![], spr['play']['visible'] = !![];
    if (gameLoaded) {
        spr[_0x15071c(0x18f)]['x'] = width / 0x2 - spr[_0x15071c(0x18f)][_0x15071c(0x1b8)] / 0x2, spr[_0x15071c(0x18f)]['y'] = height / 0x2 - spr['play']['height'] / 0x2 + 0x14, spr[_0x15071c(0x1e1)]['x'] = width - spr['fullscreen'][_0x15071c(0x1b8)] - 0x28, spr[_0x15071c(0x1e1)]['y'] = 0xf, spr[_0x15071c(0x187)]['x'] = spr[_0x15071c(0x1e1)]['x'] - spr['sound_on'][_0x15071c(0x1b8)] + 0x5, spr[_0x15071c(0x187)]['y'] = 0xf, spr[_0x15071c(0x1d9)]['x'] = spr[_0x15071c(0x187)]['x'] - spr[_0x15071c(0x1d9)][_0x15071c(0x1b8)] + 0x5, spr['language']['y'] = 0xf;
        if (playerBall) Composite[_0x15071c(0x1ee)](engine[_0x15071c(0x1ca)], playerBall);
        if (ground) Composite[_0x15071c(0x1ee)](engine[_0x15071c(0x1ca)], ground);
        if (leftWall) Composite[_0x15071c(0x1ee)](engine[_0x15071c(0x1ca)], leftWall);
        if (rightWall) Composite[_0x15071c(0x1ee)](engine[_0x15071c(0x1ca)], rightWall);
        leftWall = Bodies[_0x15071c(0x190)](0x0, height, wallSize, height * 0x4, {
            'isStatic': !![],
            'label': _0x15071c(0x1f3)
        }), rightWall = Bodies['rectangle'](width, height, wallSize, height * 0x4, {
            'isStatic': !![],
            'label': _0x15071c(0x1cc)
        }), ground = Bodies[_0x15071c(0x190)](width / 0x2, height + wallSize * 0xa / 0x2 - wallSize / 0x2, width, wallSize * 0xa, {
            'isStatic': !![],
            'label': _0x15071c(0x19a)
        }), playerBall = Bodies[_0x15071c(0x195)](width / 0x2, height / 0x2 - 0x64, 0x38, {
            'friction': 0.5,
            'restitution': 0.8,
            'isStatic': !![],
            'label': 'ball',
            'render': {
                'sprite': {
                    'texture': _0x15071c(0x1aa),
                    'xScale': 0.5,
                    'yScale': 0.5
                }
            }
        }), Composite[_0x15071c(0x1ae)](engine[_0x15071c(0x1ca)], [playerBall, ground, rightWall, leftWall]);
    }
}

function mt_rand(_0x36778b, _0xd8aa6e) {
    const _0x3ed61c = _0x5043;
    return _0x36778b = parseInt(_0x36778b, 0xa), _0xd8aa6e = parseInt(_0xd8aa6e, 0xa), Math[_0x3ed61c(0x1a2)](Math[_0x3ed61c(0x1b5)]() * (_0xd8aa6e - _0x36778b + 0x1)) + _0x36778b;
}

function _0x5043(_0x36c6c1, _0x1dde04) {
    const _0x243a2a = _0x243a();
    return _0x5043 = function(_0x5043f7, _0x28a5aa) {
        _0x5043f7 = _0x5043f7 - 0x185;
        let _0x2445b0 = _0x243a2a[_0x5043f7];
        return _0x2445b0;
    }, _0x5043(_0x36c6c1, _0x1dde04);
}

function resizeHandler() {
    const _0x35fb30 = _0x5043;
    var _0x473bb1 = window[_0x35fb30(0x1a6)],
        _0x46a608 = window['innerHeight'],
        _0x32a8a8 = Math[_0x35fb30(0x1b7)](_0x473bb1 / baseWidth, _0x46a608 / baseHeight);
    gameCanvas[_0x35fb30(0x189)]('style', _0x35fb30(0x1bf) + _0x32a8a8 + ');' + 'transform-origin:\x20top\x20left;\x20border:0px\x20red\x20solid;'), width = _0x473bb1 / _0x32a8a8, height = _0x46a608 / _0x32a8a8, gameCanvas['width'] = width, gameCanvas[_0x35fb30(0x194)] = height, assetsCor();
}

function loaderFiles() {
    const _0x3950b4 = _0x5043;
    for (let _0x39a6c8 = 0x0; _0x39a6c8 < assets[_0x3950b4(0x18c)]['length']; _0x39a6c8++) {
        loadImg({
            'src': assets['graphic'][_0x39a6c8][_0x3950b4(0x1d2)],
            'maxSeconds': 0xa
        }, function(_0x54bb34) {
            const _0xc98c7f = _0x3950b4;
            if (_0x54bb34[_0xc98c7f(0x1bc)]) {
                loadWarrning = _0x54bb34[_0xc98c7f(0x1bc)] + ':\x20' + _0x54bb34[_0xc98c7f(0x1b9)][_0xc98c7f(0x1ab)];
                return;
            }
            spr[assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1e4)]] = new Sprite(), spr[assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1e4)]][_0xc98c7f(0x1b8)] = _0x54bb34['img']['width'], spr[assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1e4)]][_0xc98c7f(0x194)] = _0x54bb34[_0xc98c7f(0x1b9)][_0xc98c7f(0x194)], spr[assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1e4)]]['x'] = assets[_0xc98c7f(0x18c)][_0x39a6c8]['x'] || 0x0, spr[assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1e4)]]['y'] = assets[_0xc98c7f(0x18c)][_0x39a6c8]['y'] || 0x0, spr[assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1e4)]][_0xc98c7f(0x1a9)] = assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1a9)] || ![], spr[assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1e4)]][_0xc98c7f(0x1c5)] = _0x54bb34, spr[assets['graphic'][_0x39a6c8]['name']][_0xc98c7f(0x1e4)] = assets['graphic'][_0x39a6c8][_0xc98c7f(0x1e4)], spr[assets['graphic'][_0x39a6c8][_0xc98c7f(0x1e4)]][_0xc98c7f(0x1c4)] = assets['graphic'][_0x39a6c8][_0xc98c7f(0x1c4)], spr[assets[_0xc98c7f(0x18c)][_0x39a6c8][_0xc98c7f(0x1e4)]]['visible'] = assets[_0xc98c7f(0x18c)][_0x39a6c8]['visible'], loadedFiles++, loadedFiles >= allImages && setTimeout(function() {
                const _0x441b8f = _0xc98c7f;
                for (let _0x2460b0 = 0x0; _0x2460b0 < assets[_0x441b8f(0x1c1)][_0x441b8f(0x1a7)]; _0x2460b0++) {
                    snd[assets[_0x441b8f(0x1c1)][_0x2460b0][_0x441b8f(0x1e4)]] = new Sound(), snd[assets['audio'][_0x2460b0][_0x441b8f(0x1e4)]][_0x441b8f(0x1c1)] = new Audio(), snd[assets['audio'][_0x2460b0]['name']][_0x441b8f(0x1c1)][_0x441b8f(0x1ab)] = assets[_0x441b8f(0x1c1)][_0x2460b0][_0x441b8f(0x1d2)];
                }
                initGame();
            }, 0x3e8);
        });
    }
}

function toggleSounds() {
    const _0x2e5720 = _0x5043;
    gameSounds = !gameSounds;
    if (!gameSounds) spr[_0x2e5720(0x187)]['file'][_0x2e5720(0x1b9)][_0x2e5720(0x1ab)] = 'img/sound_off.png', snd[_0x2e5720(0x1d3)][_0x2e5720(0x1f0)]();
    else {
        spr[_0x2e5720(0x187)]['file'][_0x2e5720(0x1b9)]['src'] = _0x2e5720(0x1c6), snd[_0x2e5720(0x1d3)][_0x2e5720(0x18f)]();
        if (snd['button']) snd[_0x2e5720(0x1e3)]['play']();
    }
}

function shareButton(_0x43a974) {
    const _0x1bfea5 = _0x5043;
    window[_0x1bfea5(0x1e5)](_0x1bfea5(0x1eb) + _0x43a974, _0x1bfea5(0x1f4));
}

function loadImg(_0x496b9b, _0x28da92) {
    const _0x39d133 = _0x5043;
    let _0x19cf90 = 0x0,
        _0x468882 = 0xa,
        _0x5485c6 = ![],
        _0x2aeb0f = ![];
    _0x496b9b[_0x39d133(0x1b6)] && (_0x468882 = _0x496b9b[_0x39d133(0x1b6)]);

    function _0x7cfc21() {
        const _0x347b1a = _0x39d133;
        if (_0x2aeb0f) return;
        if (_0x19cf90 >= _0x468882) {
            _0x28da92({
                'err': _0x347b1a(0x1d8)
            }), _0x2aeb0f = !![];
            return;
        }
        if (_0x5485c6 && _0x26cb9f[_0x347b1a(0x193)]) {
            if (_0x26cb9f[_0x347b1a(0x1b8)] && _0x26cb9f[_0x347b1a(0x194)]) {
                _0x28da92({
                    'img': _0x26cb9f
                }), _0x2aeb0f = !![];
                return;
            }
            _0x28da92({
                'img': _0x26cb9f,
                'err': _0x347b1a(0x1d0)
            }), _0x2aeb0f = !![];
            return;
        } else _0x26cb9f['complete'] && (_0x5485c6 = !![]);
        _0x19cf90++, _0x28da92[_0x347b1a(0x19e)] = setTimeout(_0x7cfc21, 0x3e8);
    }
    let _0x26cb9f = new Image();
    _0x26cb9f[_0x39d133(0x1d4)] = _0x7cfc21(), _0x26cb9f[_0x39d133(0x1ab)] = _0x496b9b[_0x39d133(0x1ab)], _0x7cfc21();
}

function getFirstBrowserLanguage() {
    const _0x107239 = _0x5043;
    var _0x504a11 = window[_0x107239(0x1e9)],
        _0x2d8f25 = [_0x107239(0x1d9), _0x107239(0x199), 'systemLanguage', _0x107239(0x18d)],
        _0x4e650f, _0x1d872a;
    if (Array[_0x107239(0x1c3)](_0x504a11[_0x107239(0x1af)]))
        for (_0x4e650f = 0x0; _0x4e650f < _0x504a11[_0x107239(0x1af)][_0x107239(0x1a7)]; _0x4e650f++) {
            _0x1d872a = _0x504a11[_0x107239(0x1af)][_0x4e650f];
            if (_0x1d872a && _0x1d872a[_0x107239(0x1a7)]) return _0x1d872a == 'pt-BR' || _0x1d872a == 'pt-PT' || _0x1d872a == _0x107239(0x185) ? _0x1d872a[_0x107239(0x1bd)]()[_0x107239(0x1d1)]('-', '_') : _0x1d872a[_0x107239(0x1a7)] > 0x2 ? _0x1d872a[_0x107239(0x1cb)](0x0, -0x3) : _0x1d872a;
        }
    for (_0x4e650f = 0x0; _0x4e650f < _0x2d8f25['length']; _0x4e650f++) {
        _0x1d872a = _0x504a11[_0x2d8f25[_0x4e650f]];
        if (_0x1d872a && _0x1d872a['length']) return _0x1d872a[_0x107239(0x1cb)](0x0, -0x3);
    }
    return 'en';
}

function _0x243a() {
    const _0x373ea0 = ['right', 'leftWall', '_blank', 'zh-CN', 'touchend', 'sound_on', 'load', 'setAttribute', '621DyFCWJ', 'log', 'graphic', 'userLanguage', 'userAgent', 'play', 'rectangle', 'error', 'pageY', 'complete', 'height', 'circle', 'left_control', 'vendor', '_bestScore', 'browserLanguage', 'ground', '3156440QhUtqm', 'COULD\x20NOT\x20LOAD\x20AUDIO,\x20FORCE\x20START', 'playing', 'tryImage', 'touched', 'test', '14349VJrAYL', 'floor', 'visible', 'substr', 'push', 'innerWidth', 'length', '3986932BhByOx', 'clickable', 'img/ball.png', 'src', 'speedX', '1206107XCyvsi', 'add', 'languages', 'music/mainMusic.mp3', '22jnrlqM', 'top', 'indexOf', 'undefined', 'random', 'maxSeconds', 'min', 'width', 'img', 'share', 'touchmove', 'err', 'toLowerCase', '233550SzouIP', 'transform:\x20scale(', '5rAObol', 'audio', '632BrCPLI', 'isArray', 'type', 'file', 'img/sound_on.png', 'rotation', '\x20-\x20', 'Error\x20translate\x20not\x20found:\x20', 'world', 'slice', 'rightWall', 'msMaxTouchPoints', '10319076MwMRKU', 'touches', 'File\x20not\x20found', 'replace', 'url', 'mainMusic', 'onload', 'shadowOffsetY', 'sort', 'clientX', 'timeout', 'language', 'render', 'update', '25266804LtrZFI', '7mfaEGS', 'pageX', 'playLoop', 'left', 'fullscreen', 'ontouchstart', 'button', 'name', 'open', 'menu', '_langCur', 'frame', 'navigator', 'requestFullscreen', 'https://twitter.com/intent/tweet?text=', 'dir', 'right_control', 'remove', 'mobileAndTabletCheck', 'stop', 'exitFullscreen'];
    _0x243a = function() {
        return _0x373ea0;
    };
    return _0x243a();
};

function getLang(_0x45e5f2) {
    const _0x28bd77 = _0x5043;
    let _0x53979e = langCur;
    return typeof lang[_0x53979e] != _0x28bd77(0x1b4) ? typeof lang[_0x53979e][_0x45e5f2] != 'undefined' ? lang[_0x53979e][_0x45e5f2] : 'Error\x20translate:\x20' + _0x45e5f2 : _0x28bd77(0x1c9) + _0x45e5f2;
}

function changeLanguage() {
    const _0x572428 = _0x5043;
    langInd++, langInd > langAvai[_0x572428(0x1a7)] - 0x1 && (langInd = 0x0), langCur = langAvai[langInd], localStorage[localStoragePrefixName + _0x572428(0x1e7)] = langCur;
}

function loadLanguageFiles() {
    const _0x2a5f53 = _0x5043;
    for (let _0x364c77 in lang) {
        langAvai[_0x2a5f53(0x1a5)](_0x364c77);
    }
    langAvai[_0x2a5f53(0x1d6)]();
}

function Sprite() {
    const _0x2cde4f = _0x5043;
    this['x'] = 0x0, this['y'] = 0x0, this[_0x2cde4f(0x1b8)] = 0x0, this[_0x2cde4f(0x194)] = 0x0, this[_0x2cde4f(0x1e4)] = null, this[_0x2cde4f(0x1c5)] = null, this[_0x2cde4f(0x1c4)] = null, this[_0x2cde4f(0x1e8)] = 0x0, this['frameMaxTime'] = 0x3b, this['frameTime'] = 0x0, this[_0x2cde4f(0x1c7)] = 0x0, this['angle'] = 0x0, this['centerX'] = 0x0, this['centerY'] = 0x0, this['shadowOffsetX'] = 0x0, this[_0x2cde4f(0x1d5)] = 0x0, this[_0x2cde4f(0x1da)] = function() {}, this[_0x2cde4f(0x1db)] = function() {};
}

function setLanguageGame() {
    const _0x2fa37c = _0x5043;
    let _0x366e9f = getFirstBrowserLanguage();
    if (localStorage[localStoragePrefixName + '_langCur']) langCur = localStorage[localStoragePrefixName + '_langCur'];
    else typeof lang[_0x366e9f] != 'undefined' && (langCur = _0x366e9f);
    langInd = langAvai[_0x2fa37c(0x1b3)](langCur);
}

function toggleFullScreen() {
    const _0x5eef2d = _0x5043;
    !document['fullscreenElement'] ? document['documentElement'][_0x5eef2d(0x1ea)]() : document[_0x5eef2d(0x1f1)] && document[_0x5eef2d(0x1f1)]();
}
window[_0x41a5f5(0x1ef)] = function() {
    const _0x853cc8 = _0x41a5f5;
    let _0x476b52 = ![];
    return function(_0x36becb) {
        const _0x333b6d = _0x5043;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i [_0x333b6d(0x1a0)](_0x36becb) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i [_0x333b6d(0x1a0)](_0x36becb[_0x333b6d(0x1a4)](0x0, 0x4))) _0x476b52 = !![];
    }(navigator[_0x853cc8(0x18e)] || navigator[_0x853cc8(0x197)] || window['opera']), _0x476b52;
};

function mouseControl() {
    const _0x143927 = _0x41a5f5;
    !isMobile && (checkTouchDevice() && (isMobile = !![]));
    for (let _0x52f918 in spr) {
        if (spr[_0x52f918][_0x143927(0x1a9)]) {
            if (collisionAABB(mouse, spr[_0x52f918]) && spr[_0x52f918]['visible']) {
                if (snd[_0x143927(0x1e3)]) snd[_0x143927(0x1e3)][_0x143927(0x18f)]();
                switch (_0x52f918) {
                    case _0x143927(0x18f):
                        startGame();
                        break;
                    case _0x143927(0x1ba):
                        shareButton(score + _0x143927(0x1c8) + getLang(_0x143927(0x1ba)) + '\x20' + gameTitle);
                        break;
                    case 'fullscreen':
                        toggleFullScreen();
                        break;
                    case _0x143927(0x187):
                        toggleSounds();
                        break;
                    case _0x143927(0x1d9):
                        changeLanguage();
                        break;
                    case _0x143927(0x196):
                        mouse['dir'] = 'left', (player[_0x143927(0x1ac)] = -player['maxSpeed'], player[_0x143927(0x1ec)] = _0x143927(0x1e0));
                        break;
                    case _0x143927(0x1ed):
                        mouse['dir'] = 'right', (player[_0x143927(0x1ac)] = player['maxSpeed'], player['dir'] = _0x143927(0x1f2));
                        break;
                }
            }
        }
    }
}

function mouseMove(_0x115d96) {
    const _0x59d057 = _0x41a5f5;
    let _0x393028 = gameCanvas['getBoundingClientRect'](),
        _0x4b3437 = width / _0x393028[_0x59d057(0x1b8)],
        _0x191f84 = height / _0x393028[_0x59d057(0x194)],
        _0x2fb613 = {
            'x': 0x0,
            'y': 0x0
        };
    _0x115d96[_0x59d057(0x1c4)] == 'mousemove' && (mouse['x'] = (_0x115d96[_0x59d057(0x1d7)] - _0x393028[_0x59d057(0x1e0)]) * _0x4b3437, mouse['y'] = (_0x115d96['clientY'] - _0x393028[_0x59d057(0x1b2)]) * _0x191f84, mouse[_0x59d057(0x1de)] = _0x115d96[_0x59d057(0x1de)], mouse[_0x59d057(0x192)] = _0x115d96[_0x59d057(0x192)]);
    if (_0x115d96[_0x59d057(0x1c4)] == _0x59d057(0x1bb) || _0x115d96[_0x59d057(0x1c4)] == 'touchstart' || _0x115d96[_0x59d057(0x1c4)] == _0x59d057(0x186)) {
        if (gameLoaded)
            for (let _0x3fee6a = 0x0; _0x3fee6a < _0x115d96[_0x59d057(0x1cf)][_0x59d057(0x1a7)]; _0x3fee6a++) {
                typeof _0x115d96[_0x59d057(0x1cf)][_0x3fee6a] != _0x59d057(0x1b4) && (_0x2fb613['x'] = _0x115d96[_0x59d057(0x1cf)][_0x3fee6a]['pageX'], _0x2fb613['y'] = _0x115d96[_0x59d057(0x1cf)][_0x3fee6a]['pageY'], mouse['x'] = (_0x2fb613['x'] - _0x393028[_0x59d057(0x1e0)]) * _0x4b3437, mouse['y'] = (_0x2fb613['y'] - _0x393028['top']) * _0x191f84, touches[_0x3fee6a] = {
                    'x': (_0x2fb613['x'] - _0x393028['left']) * _0x4b3437,
                    'y': (_0x2fb613['y'] - _0x393028[_0x59d057(0x1b2)]) * _0x191f84
                }, !touches[_0x3fee6a][_0x59d057(0x19f)] && (touches[_0x3fee6a]['startX'] = touches[_0x3fee6a]['x'], touches[_0x3fee6a]['startY'] = touches[_0x3fee6a]['y'], touches[_0x3fee6a][_0x59d057(0x19f)] = !![]));
            }
    }
}

function checkTouchDevice() {
    const _0x57201f = _0x41a5f5;
    return _0x57201f(0x1e2) in window || navigator['maxTouchPoints'] > 0x0 || navigator[_0x57201f(0x1cd)] > 0x0;
}