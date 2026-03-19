function _0x34ad(_0x452c46, _0x3e514f) {
    const _0xf285ee = _0xf285();
    return _0x34ad = function(_0x34ad43, _0x1b8898) {
        _0x34ad43 = _0x34ad43 - 0x1a3;
        let _0x35c161 = _0xf285ee[_0x34ad43];
        return _0x35c161;
    }, _0x34ad(_0x452c46, _0x3e514f);
}
const _0x42c665 = _0x34ad;

function _0xf285() {
    const _0x3b2400 = ['#000000', '514809uhwCbr', 'backgroundColor', 'translate', 'ball', 'restore', 'fullscreen', 'font', 'file', 'fontColorLoadingError', 'getContext', 'angle', '#FFF', '2pRtzja', 'fillRect', 'height', 'fillText', 'fontColorMenu', 'fillStyle', 'language', '548EjiEzP', 'rgba(255,255,255,1)', '30px\x20', 'OtomanopeeOne', 'round', 'measureText', '23235bvwAHW', 'position', 'rgba(255,255,255,0.6)', '3062442cxOTUh', '18FiXAUn', 'visible', 'loading', 'toUpperCase', '#ff0000', 'best_score', '104287PaxTVP', '2241584fqGiDd', '1950000NJaaDY', 'save', 'now', '3747310aOiKwG', 'fontColorLoading', 'setLineDash', 'sound_on', 'rotate', '50px\x20', 'kick_the_soccer_ball', 'width', 'play', 'drawImage', '28px\x20', 'img', 'length'];
    _0xf285 = function() {
        return _0x3b2400;
    };
    return _0xf285();
}(function(_0x31b04b, _0x3014de) {
    const _0x3a80d8 = _0x34ad,
        _0x2fb0b9 = _0x31b04b();
    while (!![]) {
        try {
            const _0x52d673 = parseInt(_0x3a80d8(0x1af)) / 0x1 + parseInt(_0x3a80d8(0x1ce)) / 0x2 * (parseInt(_0x3a80d8(0x1c2)) / 0x3) + -parseInt(_0x3a80d8(0x1d5)) / 0x4 * (parseInt(_0x3a80d8(0x1a5)) / 0x5) + parseInt(_0x3a80d8(0x1a8)) / 0x6 + parseInt(_0x3a80d8(0x1b4)) / 0x7 + parseInt(_0x3a80d8(0x1b0)) / 0x8 * (-parseInt(_0x3a80d8(0x1a9)) / 0x9) + parseInt(_0x3a80d8(0x1b1)) / 0xa;
            if (_0x52d673 === _0x3014de) break;
            else _0x2fb0b9['push'](_0x2fb0b9['shift']());
        } catch (_0x4e160a) {
            _0x2fb0b9['push'](_0x2fb0b9['shift']());
        }
    }
}(_0xf285, 0x4e068));
let baseWidth = 0x400,
    baseHeight = 0x300,
    width = 0x0,
    height = 0x0,
    tapInfo = !![],
    ctx = gameCanvas[_0x42c665(0x1cb)]('2d'),
    gameOver = ![],
    gameState = 'menu',
    gameStarted = ![],
    waitForRestart = 0x1e,
    localStoragePrefixName = _0x42c665(0x1ba),
    gameSounds = !![],
    nameFont = _0x42c665(0x1d8),
    gameSettings = {
        'backgroundColor': ![],
        'fontColorLoading': '#FFFFFF',
        'touchColor': '#FFF',
        'fontColorLoadingError': _0x42c665(0x1ad),
        'touchMeColor': _0x42c665(0x1a7),
        'fontColorMenu': _0x42c665(0x1c1),
        'scoreColor': 'rgba(255,255,255,0.6)',
        'scoreBestColor': _0x42c665(0x1d6)
    },
    isMobile = ![],
    userTouchedScreen = ![],
    touches = [],
    bestScore = 0x0,
    score = 0x0,
    langCur = 'en',
    lang = {},
    langSelect = ![],
    langInd = 0x0,
    langAvai = [],
    then = Date[_0x42c665(0x1b3)](),
    maxFPS = 0x3c,
    interval = 0x3e8 / maxFPS,
    fpsNoLimit = ![],
    gameTitle = 'Kick\x20the\x20soccer\x20ball' [_0x42c665(0x1ac)](),
    loadedFiles = 0x0,
    allImages = assets['graphic'][_0x42c665(0x1c0)],
    loadWarrning = '',
    gameLoaded = ![],
    snd = {},
    spr = {},
    mouse = {
        'x': 0x0,
        'y': 0x0,
        'width': 0x1,
        'height': 0x1,
        'dir': ![]
    };
(function mainLoop() {
    const _0xc58af3 = _0x42c665;
    let _0x291970 = Date[_0xc58af3(0x1b3)](),
        _0x320d98 = _0x291970 - then;
    if (_0x320d98 > interval || fpsNoLimit) {
        then = _0x291970 - _0x320d98 % interval;
        gameSettings[_0xc58af3(0x1c3)] ? (ctx[_0xc58af3(0x1d3)] = gameSettings[_0xc58af3(0x1c3)], ctx[_0xc58af3(0x1cf)](0x0, 0x0, width, height)) : ctx['clearRect'](0x0, 0x0, width, height);
        ctx[_0xc58af3(0x1c8)] = _0xc58af3(0x1d7) + nameFont;
        if (!gameLoaded) {
            var _0xbfedfb = getLang(_0xc58af3(0x1ab)) + ':\x20' + Math[_0xc58af3(0x1a3)](loadedFiles / allImages * 0x64) + '%',
                _0xf1464d = ctx[_0xc58af3(0x1a4)](_0xbfedfb)['width'];
            ctx[_0xc58af3(0x1d3)] = gameSettings[_0xc58af3(0x1b5)], ctx['fillText'](_0xbfedfb, width / 0x2 - _0xf1464d / 0x2, height / 0x2 + 0x23 / 0x2);
            if (loadWarrning) {
                ctx[_0xc58af3(0x1b2)](), ctx[_0xc58af3(0x1c8)] = '14px\x20' + nameFont, ctx['fillStyle'] = gameSettings[_0xc58af3(0x1ca)];
                var _0xf1464d = ctx[_0xc58af3(0x1a4)](loadWarrning)['width'];
                ctx['fillText'](loadWarrning, width / 0x2 - _0xf1464d / 0x2, height / 0x2 + 0x2d), ctx['restore']();
            }
        } else {
            Engine['update'](engine);
            if (gameStarted) {
                let _0x452d63 = 0.5,
                    _0x3fd599 = 0.5;
                ctx[_0xc58af3(0x1b2)](), ctx[_0xc58af3(0x1c4)](playerBall[_0xc58af3(0x1a6)]['x'], playerBall[_0xc58af3(0x1a6)]['y']), ctx[_0xc58af3(0x1b8)](playerBall[_0xc58af3(0x1cc)]), ctx['drawImage'](spr[_0xc58af3(0x1c5)]['file'][_0xc58af3(0x1bf)], -(_0x3fd599 * (spr[_0xc58af3(0x1c5)][_0xc58af3(0x1d0)] / 0x2)), -(_0x3fd599 * (spr[_0xc58af3(0x1c5)]['height'] / 0x2)), spr['ball'][_0xc58af3(0x1bb)] / 0x2, spr[_0xc58af3(0x1c5)][_0xc58af3(0x1d0)] / 0x2), ctx[_0xc58af3(0x1c6)]();
                let _0x308d14 = 0xa;
                ctx['strokeStyle'] = '#FFF', ctx[_0xc58af3(0x1b6)]([0x6]), ctx['strokeRect'](wallSize / 0x2, -_0x308d14, width - wallSize, height - wallSize / 0x2 + _0x308d14);
                tapInfo && ctx[_0xc58af3(0x1bd)](spr['tap'][_0xc58af3(0x1c9)][_0xc58af3(0x1bf)], playerBall[_0xc58af3(0x1a6)]['x'], playerBall['position']['y']);
                let _0x36cdec = getLang('score') + ':\x20' + score,
                    _0x4e7596 = ctx[_0xc58af3(0x1a4)](_0x36cdec)['width'];
                ctx['fillStyle'] = '#FFF', ctx[_0xc58af3(0x1d1)](_0x36cdec, width / 0x2 - _0x4e7596 / 0x2, parseInt(ctx['font']) + 0xa);
                let _0x50f618 = getLang(_0xc58af3(0x1ae)) + ':\x20' + bestScore,
                    _0xc40c1e = ctx['measureText'](_0x50f618)[_0xc58af3(0x1bb)];
                ctx[_0xc58af3(0x1d3)] = '#FFF', ctx['fillText'](_0x50f618, width / 0x2 - _0xc40c1e / 0x2, parseInt(ctx['font']) + 0x28);
            } else {
                ctx[_0xc58af3(0x1c8)] = _0xc58af3(0x1b9) + nameFont;
                let _0x37eaf5 = gameTitle,
                    _0x2c780e = ctx[_0xc58af3(0x1a4)](_0x37eaf5)[_0xc58af3(0x1bb)];
                ctx['fillStyle'] = _0xc58af3(0x1cd), ctx[_0xc58af3(0x1d1)](_0x37eaf5, width / 0x2 - _0x2c780e / 0x2, height / 0x2 - (parseInt(ctx[_0xc58af3(0x1c8)]) + 0x32)), ctx[_0xc58af3(0x1bd)](spr[_0xc58af3(0x1bc)][_0xc58af3(0x1c9)]['img'], spr[_0xc58af3(0x1bc)]['x'], spr[_0xc58af3(0x1bc)]['y']);
            }
            spr[_0xc58af3(0x1c7)][_0xc58af3(0x1aa)] && ctx['drawImage'](spr[_0xc58af3(0x1c7)]['file'][_0xc58af3(0x1bf)], spr['fullscreen']['x'], spr[_0xc58af3(0x1c7)]['y']);
            spr[_0xc58af3(0x1b7)][_0xc58af3(0x1aa)] && ctx[_0xc58af3(0x1bd)](spr[_0xc58af3(0x1b7)][_0xc58af3(0x1c9)][_0xc58af3(0x1bf)], spr[_0xc58af3(0x1b7)]['x'], spr[_0xc58af3(0x1b7)]['y']);
            if (spr['language'][_0xc58af3(0x1aa)]) {
                ctx[_0xc58af3(0x1bd)](spr[_0xc58af3(0x1d4)][_0xc58af3(0x1c9)][_0xc58af3(0x1bf)], spr[_0xc58af3(0x1d4)]['x'], spr[_0xc58af3(0x1d4)]['y']), ctx[_0xc58af3(0x1b2)](), ctx[_0xc58af3(0x1c8)] = _0xc58af3(0x1be) + nameFont, ctx[_0xc58af3(0x1d3)] = gameSettings[_0xc58af3(0x1d2)];
                let _0x164b91 = langCur[_0xc58af3(0x1ac)]();
                var _0xf1464d = ctx[_0xc58af3(0x1a4)](_0x164b91)[_0xc58af3(0x1bb)];
                ctx[_0xc58af3(0x1d1)](_0x164b91, spr[_0xc58af3(0x1d4)]['x'] + spr[_0xc58af3(0x1d4)]['width'] / 0x2 - _0xf1464d / 0x2, spr[_0xc58af3(0x1d4)]['y'] + spr[_0xc58af3(0x1d4)]['height'] / 0x2 + parseInt(ctx[_0xc58af3(0x1c8)]) / 2.9), ctx[_0xc58af3(0x1c6)]();
            }
        }
    }
    requestAnimationFrame(mainLoop);
}());