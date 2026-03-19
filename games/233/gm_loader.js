var _0x272ad1 = _0x5260;
(function(_0x2c6b73, _0x20374e) {
    var _0x1c35ff = _0x5260,
        _0x456d2d = _0x2c6b73();
    while (!![]) {
        try {
            var _0x47205d = -parseInt(_0x1c35ff(0x209)) / 0x1 + -parseInt(_0x1c35ff(0x232)) / 0x2 * (-parseInt(_0x1c35ff(0x21b)) / 0x3) + -parseInt(_0x1c35ff(0x237)) / 0x4 + -parseInt(_0x1c35ff(0x213)) / 0x5 + -parseInt(_0x1c35ff(0x19f)) / 0x6 * (-parseInt(_0x1c35ff(0x1d3)) / 0x7) + -parseInt(_0x1c35ff(0x220)) / 0x8 + -parseInt(_0x1c35ff(0x22b)) / 0x9 * (-parseInt(_0x1c35ff(0x1b9)) / 0xa);
            if (_0x47205d === _0x20374e) break;
            else _0x456d2d['push'](_0x456d2d['shift']());
        } catch (_0x2cd749) { _0x456d2d['push'](_0x456d2d['shift']()); }
    }
}(_0xcaad, 0x8f354), document[_0x272ad1(0x1fb)][_0x272ad1(0x1fd)] += _0x272ad1(0x1a0), window['SDK_OPTIONS'] = {
    'gameId': _0x272ad1(0x216),
    'onEvent': function(_0x2bc038) {
        var _0x1ff25e = _0x272ad1;
        switch (_0x2bc038[_0x1ff25e(0x1b7)]) {
            case _0x1ff25e(0x226):
                typeof game != _0x1ff25e(0x1e0) && (game[_0x1ff25e(0x1d0)] = !![]);
                break;
            case 'SDK_GAME_START':
                adDone();
                break;
            case 'SDK_READY':
                break;
        }
    }
}, function(_0x12530b, _0x27f193, _0x210ac2) {
    var _0x3d6c62 = _0x272ad1,
        _0x23bb7a = _0x12530b[_0x3d6c62(0x194)](_0x27f193)[0x0];
    _0x12530b[_0x3d6c62(0x1bf)](_0x210ac2) || (_0x12530b = _0x12530b[_0x3d6c62(0x20d)](_0x27f193), _0x12530b['id'] = _0x210ac2, _0x12530b[_0x3d6c62(0x1ec)] = _0x3d6c62(0x225), _0x23bb7a['parentNode'][_0x3d6c62(0x198)](_0x12530b, _0x23bb7a));
}(document, _0x272ad1(0x1e8), 'gamemonetize-sdk'));

function adDone() {
    var _0x12e076 = _0x272ad1;
    !prerollDone && prerollAdDone();
    if (typeof game != _0x12e076(0x1e0) && game != null) game[_0x12e076(0x1d0)] = ![];
    resumeGame();
}

function rewardAdWatchComplete() {
    var _0x48c668 = _0x272ad1;
    window[_0x48c668(0x1eb)](!![]);
}

function rewardAdWatchIncompleteComplete() { window['rewardClosed'](![]); }
is_api = {
    'DEBUGGING': !![],
    'googleAnalytics': !![],
    'log': function() {
        var _0x171bfc = _0x272ad1,
            _0x458634 = '';
        for (i = 0x0; i < arguments[_0x171bfc(0x210)]; i++) _0x458634 += arguments[i] + '\x20';
        this[_0x171bfc(0x1ea)] && console[_0x171bfc(0x1b0)](_0x458634);
    },
    'phaserSource': _0x272ad1(0x215),
    'coreSource': 'libs/',
    'secondCoreSource': _0x272ad1(0x224),
    'gd_api': null
}, is_preloader = {
    'assetsPath': _0x272ad1(0x20e),
    'slowDown': 0x0,
    'addPreloader': function() {
        var _0x7e60ec = _0x272ad1;
        console[_0x7e60ec(0x1b0)](_0x7e60ec(0x218));
        if (typeof abTesting !== _0x7e60ec(0x1e0) && abTesting) generateAB();
        contentDiv = document['getElementById'](_0x7e60ec(0x1dd)), contentDiv['style']['display'] = 0x0;
        var _0x5f93f2 = document['head'][_0x7e60ec(0x1ff)](document[_0x7e60ec(0x20d)]('link'));
        _0x5f93f2[_0x7e60ec(0x1d8)] = _0x7e60ec(0x20f), _0x5f93f2[_0x7e60ec(0x1c6)] = _0x7e60ec(0x1e4), _0x5f93f2[_0x7e60ec(0x197)] = is_preloader[_0x7e60ec(0x1f3)] + '/spin.css', document[_0x7e60ec(0x1fb)][_0x7e60ec(0x1ff)](_0x5f93f2), preloader = document[_0x7e60ec(0x20d)](_0x7e60ec(0x1ee)), preloader['id'] = _0x7e60ec(0x22d), preloader['style'][_0x7e60ec(0x1af)] = 0x64, preloader[_0x7e60ec(0x1b1)][_0x7e60ec(0x235)] = _0x7e60ec(0x1de), document[_0x7e60ec(0x1c8)][_0x7e60ec(0x1ff)](preloader), preloader[_0x7e60ec(0x1cd)] = _0x7e60ec(0x201), preloader[_0x7e60ec(0x1ff)](this[_0x7e60ec(0x206)]());
        var _0x50906c = document[_0x7e60ec(0x20d)]('div');
        preloader[_0x7e60ec(0x1ff)](_0x50906c), preloaderContent = document['createElement']('div'), _0x50906c[_0x7e60ec(0x1ff)](preloaderContent), _0x50906c['id'] = _0x7e60ec(0x1b3), _0x50906c['style']['cssText'] = _0x7e60ec(0x1e3), preloaderContent['id'] = _0x7e60ec(0x222), playDiv = document[_0x7e60ec(0x20d)](_0x7e60ec(0x1ee)), playDiv['id'] = 'playContainer', preloaderContent[_0x7e60ec(0x1ff)](playDiv), logoDiv = document[_0x7e60ec(0x20d)](_0x7e60ec(0x1ee)), logoDiv['id'] = _0x7e60ec(0x195), preloaderContent[_0x7e60ec(0x198)](logoDiv, playDiv), playDiv[_0x7e60ec(0x1ff)](this[_0x7e60ec(0x1f1)]()), genericBG = this['backgroundDiv']();
    },
    'preloaderBackground': function() {
        var _0x203fdd = _0x272ad1,
            _0x3c97a4 = window[_0x203fdd(0x1aa)] * window['innerHeight'] / 0x2710;
        nr_of_elements = Math['floor'](_0x3c97a4), bg_elements = [];
        for (var _0x523f91 = 0x1; _0x523f91 <= 0x14; _0x523f91++) {
            ii = document[_0x203fdd(0x20d)](_0x203fdd(0x19e)), _0x523f91 == 0x1 && (measureSpeed = Date[_0x203fdd(0x1a6)](), ii[_0x203fdd(0x1ef)] = function() {
                var _0x17d801 = _0x203fdd;
                measureSpeed = Date[_0x17d801(0x1a6)]() - measureSpeed;
                if (measureSpeed > 0x1f4) loadingSpeed = 0.02;
            }), ii[_0x203fdd(0x1ec)] = is_preloader[_0x203fdd(0x1f3)] + _0x203fdd(0x21e) + _0x523f91 + _0x203fdd(0x1c1), ii[_0x203fdd(0x1b1)][_0x203fdd(0x1f0)] = 'position:absolute', bg_elements[_0x203fdd(0x1bc)](ii);
        }
        bg = document[_0x203fdd(0x20d)](_0x203fdd(0x1ee)), bg['style'][_0x203fdd(0x1f0)] = _0x203fdd(0x1bb), console['log'](_0x203fdd(0x219), bg['style']['cssText']);
        for (var _0x1f9c50 = 0x0; _0x1f9c50 < nr_of_elements; _0x1f9c50++) { ind = Math[_0x203fdd(0x1c0)](Math[_0x203fdd(0x1f6)]() * 0x14), el = document[_0x203fdd(0x20d)](_0x203fdd(0x19e)), el[_0x203fdd(0x1ec)] = bg_elements[ind]['src'], el[_0x203fdd(0x1b1)]['cssText'] = bg_elements[ind][_0x203fdd(0x1b1)][_0x203fdd(0x1f0)], el[_0x203fdd(0x1b1)][_0x203fdd(0x204)] = Math[_0x203fdd(0x1f6)]() * 0x64 + '%', el['style'][_0x203fdd(0x1fc)] = Math[_0x203fdd(0x1f6)]() * 0x64 + '%', el['id'] = _0x203fdd(0x1ab) + _0x1f9c50, bg[_0x203fdd(0x1ff)](el); }
        return bg;
    },
    'backgroundDiv': function() {
        var _0x2f6953 = _0x272ad1;
        bg = document[_0x2f6953(0x20d)](_0x2f6953(0x1ee)), bg[_0x2f6953(0x1b1)][_0x2f6953(0x1f0)] = _0x2f6953(0x1a2);
        var _0x896634 = window['innerWidth'] * window[_0x2f6953(0x203)] / 0x2710;
        nr_of_elements = Math[_0x2f6953(0x1c0)](_0x896634), bg_elements = [];
        for (var _0x4ac27f = 0x1; _0x4ac27f <= 0x14; _0x4ac27f++) { ii = document[_0x2f6953(0x20d)](_0x2f6953(0x19e)), ii[_0x2f6953(0x1ec)] = is_preloader[_0x2f6953(0x1f3)] + _0x2f6953(0x21e) + _0x4ac27f + _0x2f6953(0x1c1), ii[_0x2f6953(0x1b1)][_0x2f6953(0x1f0)] = 'position:absolute', bg_elements[_0x2f6953(0x1bc)](ii); }
        for (var _0x303da5 = 0x0; _0x303da5 < nr_of_elements; _0x303da5++) { ind = Math[_0x2f6953(0x1c0)](Math[_0x2f6953(0x1f6)]() * 0x14), el = document[_0x2f6953(0x20d)]('img'), el[_0x2f6953(0x1ec)] = bg_elements[ind][_0x2f6953(0x1ec)], el[_0x2f6953(0x1b1)][_0x2f6953(0x1f0)] = bg_elements[ind][_0x2f6953(0x1b1)][_0x2f6953(0x1f0)], el[_0x2f6953(0x1b1)][_0x2f6953(0x204)] = Math[_0x2f6953(0x1f6)]() * 0x64 + '%', el[_0x2f6953(0x1b1)][_0x2f6953(0x1fc)] = Math[_0x2f6953(0x1f6)]() * 0x64 + '%', el['id'] = 'bg_element_' + _0x303da5, bg[_0x2f6953(0x1ff)](el); }
        return bg;
    },
    'loadingBarDiv': function() { var _0x806808 = _0x272ad1; return loadingDivContainer = document[_0x806808(0x20d)]('div'), loadingDivFull = document[_0x806808(0x20d)](_0x806808(0x1ee)), loadingProc = document[_0x806808(0x20d)](_0x806808(0x1ee)), loadingProcText = document[_0x806808(0x20d)](_0x806808(0x1ee)), loadingProcText[_0x806808(0x1fd)] = '5%', loadingProcText[_0x806808(0x1b1)]['cssText'] = _0x806808(0x22e), loadingProc[_0x806808(0x1b1)][_0x806808(0x1f0)] = _0x806808(0x1ce) + this[_0x806808(0x1f3)] + _0x806808(0x21c), loadingDivFull['style'][_0x806808(0x1f0)] = _0x806808(0x208), loadingDivContainer[_0x806808(0x1b1)][_0x806808(0x1f0)] = _0x806808(0x234), loadingDivContainer['appendChild'](loadingDivFull), loadingDivContainer[_0x806808(0x1ff)](loadingProc), loadingProc[_0x806808(0x1ff)](loadingProcText), loadingDivContainer; },
    'showPreloader': function() {
        var _0x5553d7 = _0x272ad1;
        preloader[_0x5553d7(0x1b1)]['display'] = 'block';
    },
    'showPlay': function(_0x2d0534) {
        var _0x1fa5ff = _0x272ad1,
            _0x5b3b59 = _0x2d0534[_0x1fa5ff(0x1d5)][_0x1fa5ff(0x1f8)];
        for (var _0x560198 = 0x0; _0x560198 < _0x5b3b59['length']; _0x560198++) { var _0x1beba9 = _0x5b3b59[_0x560198]; if (_0x1beba9[_0x1fa5ff(0x19d)] === _0x1fa5ff(0x23e)) { if (_0x1beba9[_0x1fa5ff(0x19a)] === '0') return ![]; } }
        return !![];
    },
    'showLogo': function(_0x1fb8cc) { return ![]; },
    'hidePreloader': function(_0x412a4f) {
        var _0x1927c7 = _0x272ad1;
        console[_0x1927c7(0x1b0)](_0x1927c7(0x1ed)), TTSLoaded = !![], hidehideAll = _0x412a4f;
    },
    'hidehidePreloader': function() {
        var _0x35735a = _0x272ad1;
        contentDiv['style']['opacity'] = 0x1;
        !disableAll && typeof triggerZone != _0x35735a(0x1e0) && (typeof abTesting !== _0x35735a(0x1e0) && abTesting && (ga(_0x35735a(0x1fe), 'dimension1', ab), ga('newEvents.set', _0x35735a(0x1d1), ab)));
        play !== undefined && (hide = !![], this['hideLoading']());
        if (loader !== undefined && loader[_0x35735a(0x1b1)] !== undefined) loader[_0x35735a(0x1b1)][_0x35735a(0x235)] = _0x35735a(0x1de);
        hidehideAll && (preloader['className'] = _0x35735a(0x1da), setInterval(function() { preloader['style']['display'] = 'none'; }, 0x1f4));
        if (!playViz) {
            if (typeof Main != _0x35735a(0x1e0) && typeof Main[_0x35735a(0x1f7)] != _0x35735a(0x1e0) && typeof Main[_0x35735a(0x1f7)][_0x35735a(0x22c)] != 'undefined') Main[_0x35735a(0x1f7)][_0x35735a(0x22c)]();
            if (typeof Core != _0x35735a(0x1e0) && typeof Core[_0x35735a(0x1f7)] != _0x35735a(0x1e0) && typeof Core[_0x35735a(0x1f7)][_0x35735a(0x1ae)] != _0x35735a(0x1e0)) Core[_0x35735a(0x1f7)]['startGame']();
            preloader[_0x35735a(0x1cd)] = _0x35735a(0x1da), setInterval(function() {
                var _0x38cdc9 = _0x35735a;
                preloader[_0x38cdc9(0x1b1)]['display'] = _0x38cdc9(0x1de);
            }, 0x1f4);
        }
    },
    'hideLoading': function() {
        var _0x324609 = _0x272ad1;
        loadingDivContainer[_0x324609(0x1b1)][_0x324609(0x235)] = _0x324609(0x1de), play['style'][_0x324609(0x235)] = _0x324609(0x22a), pd[_0x324609(0x1b1)][_0x324609(0x235)] = _0x324609(0x22a), play[_0x324609(0x1cd)] = 'show', play[_0x324609(0x200)](_0x324609(0x1a3), this['playVisible']), play[_0x324609(0x200)](_0x324609(0x1b6), this['playVisible']);
    },
    'playVisible': function() {
        var _0x13552c = _0x272ad1;
        play[_0x13552c(0x1cf)](_0x13552c(0x1a3), this['playVisible']), play[_0x13552c(0x1cf)](_0x13552c(0x1b6), this[_0x13552c(0x211)]), play[_0x13552c(0x1cd)] = _0x13552c(0x1b4);
    },
    'updateLoadingBar': function() {
        var _0x5ee800 = _0x272ad1;
        currentLoading += loadingSpeed;
        if (TTSLoaded) loadingSpeed = 0x1;
        else {
            if (currentLoading > 0x46 && this[_0x5ee800(0x202)] == 0x0) loadingSpeed = loadingSpeed / 0x2, this[_0x5ee800(0x202)]++;
            else {
                if (currentLoading > 0x50 && this['slowDown'] == 0x1) loadingSpeed = loadingSpeed / 0x2, this['slowDown']++;
                else {
                    if (currentLoading > 0x5a && this[_0x5ee800(0x202)] == 0x2) loadingSpeed = loadingSpeed / 0x2, this[_0x5ee800(0x202)]++;
                    else currentLoading > 0x61 && (loadingSpeed = 0x0);
                }
            }
        }
        loadingDivFull[_0x5ee800(0x1b1)][_0x5ee800(0x1be)] = currentLoading + '%', loadingProc[_0x5ee800(0x1b1)][_0x5ee800(0x204)] = currentLoading + '%', loadingProcText['innerHTML'] = Math[_0x5ee800(0x1c0)](currentLoading) + '%', currentLoading >= 0x64 && (is_preloader['hidehidePreloader'](), clearInterval(loadingInterval));
    }
}, hidePreloader = is_preloader[_0x272ad1(0x21a)];
var site = '',
    game_name = '',
    recievedJson = null,
    publisherFinal = null,
    flag, adblockOn = ![],
    customPublisher = null,
    params_from_url = location['href'][_0x272ad1(0x229)]('?'),
    gameDim = { 'width': 0x320, 'height': 0x258 },
    siteToCompare = '',
    cmsIsDown = ![],
    topDomain = '',
    contentDiv, counterForSomething = getTimeNowInSeconds(),
    xmlRequest1 = new XMLHttpRequest(),
    preloader, spin, image, preloaderLink, play, loader, playViz, disableAll = ![],
    preloaderContent, heart, loadingDivContainer, loadingDivFull, currentLoading = 0x5,
    loadingInterval, loadingSpeed = 0.2,
    loadingProcText, loadingProc, TTSLoaded = ![],
    hidehideAll = ![],
    measureSpeed = 0x0,
    genericBG, ab = 'A';
document['head'][_0x272ad1(0x1fd)] += _0x272ad1(0x1a0);

function generateAB() {
    var _0x6a72a3 = _0x272ad1,
        _0x15103f = Math[_0x6a72a3(0x1f6)]();
    ab = _0x15103f >= 0.5 ? 'A' : 'B';
}

function startScript() {
    var _0x1993ed = _0x272ad1;
    console[_0x1993ed(0x1b0)](_0x1993ed(0x1ba)), loadConfig(), is_preloader[_0x1993ed(0x19b)]();
    return;
    var _0x3f655d = document[_0x1993ed(0x20d)](_0x1993ed(0x1e8));
    _0x3f655d[_0x1993ed(0x1d8)] = 'text/javascript', document[_0x1993ed(0x1fb)][_0x1993ed(0x1ff)](_0x3f655d), _0x3f655d[_0x1993ed(0x1ef)] = loadConfig, _0x3f655d[_0x1993ed(0x1ec)] = is_api['phaserSource'];
}

function loadConfig() {
    var _0x483621 = _0x272ad1,
        _0x7b78e2 = new XMLHttpRequest();
    _0x7b78e2[_0x483621(0x23c)] = function() {
        var _0x2ccf12 = _0x483621;
        _0x7b78e2[_0x2ccf12(0x22f)] == 0x4 && _0x7b78e2['status'] == 0xc8 && (recievedJson = JSON['parse'](_0x7b78e2[_0x2ccf12(0x23d)]), config = publisher = publisherFinal = recievedJson['publishers'][0x0], gameCanRun(), window[_0x2ccf12(0x1c5)] = recievedJson, window[_0x2ccf12(0x205)] = publisher, document['title'] = recievedJson['title'], loadingInterval = setInterval(is_preloader['updateLoadingBar'], 0xa), linkAndPlay(recievedJson, publisher));
    }, _0x7b78e2[_0x483621(0x207)](_0x483621(0x1e5), _0x483621(0x193), !![]), _0x7b78e2['setRequestHeader'](_0x483621(0x1b5), _0x483621(0x1f4)), _0x7b78e2[_0x483621(0x1a4)] = 0x1388, _0x7b78e2[_0x483621(0x1c7)](_0x483621(0x192)), _0x7b78e2[_0x483621(0x1dc)](null);
}

function prerollAdDone() {
    var _0xffed4f = _0x272ad1;
    console[_0xffed4f(0x1b0)](_0xffed4f(0x233)), preloader[_0xffed4f(0x1cd)] = _0xffed4f(0x1da), prerollDone = !![], play['onclick'] = function() {}, setInterval(function() {
        var _0x487e7b = _0xffed4f;
        preloader[_0x487e7b(0x1b1)][_0x487e7b(0x235)] = _0x487e7b(0x1de);
    }, 0x1f4);
    if (typeof Main != 'undefined' && typeof Main[_0xffed4f(0x1f7)] != _0xffed4f(0x1e0) && typeof Main['Main'][_0xffed4f(0x22c)] != _0xffed4f(0x1e0)) Main[_0xffed4f(0x1f7)][_0xffed4f(0x22c)]();
    if (typeof Core != _0xffed4f(0x1e0) && typeof Core['Main'] != _0xffed4f(0x1e0) && typeof Core[_0xffed4f(0x1f7)]['startGame'] != 'undefined') Core[_0xffed4f(0x1f7)][_0xffed4f(0x1ae)]();
}

function linkAndPlay(_0x5dc584, _0x2970c3) {
    var _0xdc03bb = _0x272ad1;
    preloader[_0xdc03bb(0x1b1)]['display'] = _0xdc03bb(0x22a);
    var _0x4f2758 = document[_0xdc03bb(0x20d)]('img');
    _0x4f2758['style'][_0xdc03bb(0x1f0)] = _0xdc03bb(0x1c3), _0x4f2758[_0xdc03bb(0x1e1)] = function() { return ![]; }, _0x4f2758[_0xdc03bb(0x1ef)] = function() {
        var _0x4880cf = _0xdc03bb;
        logoDiv[_0x4880cf(0x1ff)](_0x4f2758), _0x4f2758[_0x4880cf(0x1cd)] = _0x4880cf(0x201);
    }, _0x4f2758['src'] = is_preloader['assetsPath'] + '/prinxy_logo.png', (playViz = is_preloader[_0xdc03bb(0x23b)](_0x2970c3)) && (pd = document[_0xdc03bb(0x20d)](_0xdc03bb(0x1ee)), playDiv[_0xdc03bb(0x1ff)](pd), play = document[_0xdc03bb(0x20d)](_0xdc03bb(0x19e)), pd[_0xdc03bb(0x1b1)][_0xdc03bb(0x235)] = _0xdc03bb(0x1de), pd['id'] = 'playButtonDiv', play[_0xdc03bb(0x1e1)] = function() { return ![]; }, play['onload'] = function() { pd['appendChild'](play); }, play[_0xdc03bb(0x1ec)] = is_preloader[_0xdc03bb(0x1f3)] + _0xdc03bb(0x231), play['id'] = _0xdc03bb(0x227), play['style'][_0xdc03bb(0x235)] = _0xdc03bb(0x1de), console[_0xdc03bb(0x1b0)](_0xdc03bb(0x1ac)), play[_0xdc03bb(0x1b2)] = function() { console['log']('Play\x20Button\x20Clicked!'), showAd(); });
}

function preloadRewardAd() {}
var gameStarted = ![],
    prerollDone = ![];

function _0xcaad() {
    var _0x21beae = ['zIndex', 'log', 'style', 'onclick', 'preloaderContainer', 'scaleOnHover', 'X-Requested-With', 'animationend', 'name', 'showAd', '9427540ILEiyr', 'aaaa', 'width:100%;height:100%;position:absolute;background:linear-gradient(rgb(248,\x20207,\x20249),rgb(247,\x20183,\x20249));', 'push', 'addModules', 'width', 'getElementById', 'floor', '.png', 'Show\x20Rewarded\x20AD', 'width:100%', 'PORTRAIT', 'receivedJson', 'rel', 'overrideMimeType', 'body', 'text/javascript', 'timer_between_ads', 'Resume\x20AD', 'timer_ads_positions', 'className', 'width:77px;height:50px;background-image:url(', 'removeEventListener', 'paused', 'dimension1', 'showBanner', '827015YQQwpb', 'contentDiv', 'optional', 'phaser_haxe', 'Resume\x20GAME', 'type', 'core', 'fadeout', 'title', 'send', 'content', 'none', 'Localization', 'undefined', 'ondragstart', 'reward', 'position:absolute;width:100%;height:100%', 'stylesheet', 'GET', 'modulesToLoad', 'pre1', 'script', 'game_build', 'DEBUGGING', 'rewardClosed', 'src', 'hide\x20preloader', 'div', 'onload', 'cssText', 'loadingBarDiv', 'Trigger\x20Zone', 'assetsPath', 'XMLHttpRequest', './libs/modules/', 'random', 'Main', 'outgoing', 'DynamicData', 'GameConfig', 'head', 'top', 'innerHTML', 'newUnits.set', 'appendChild', 'addEventListener', 'fadein', 'slowDown', 'innerHeight', 'left', 'ISpublisher', 'preloaderBackground', 'open', 'background:linear-gradient(to\x20right,#4BC0F5,#6DE4FF);width:5%;height:100%;border-radius:16px;', '507615ZvrkAf', 'setAttribute', 'nfi9', 'v1.1', 'createElement', 'assets/preloader', 'text/css', 'length', 'playVisible', 'gd_api', '4806790mDtTgN', 'timer\x20is\x20at\x20', 'libs/Phaser.js', 'hq69725hm23c4why11d389bh2vxl6vvc', 'resolution', 'add\x20preloader', 'goood', 'hidePreloader', '1815XjRART', '/loading_bubble.png);left:5%;position:relative;-webkit-transform:translate(-50%,0);animation-duration:0.5s;animation-name:proc_float;animation-iteration-count:infinite;animation-direction:alternate;text-align:center;', 'gh-123', '/bgElements/', 'defaultOrinetation', '3027080Appjfz', 'Point', 'preloaderContent', '.js', 'libs/phaser_haxe/', 'https://api.gamemonetize.com/sdk.js', 'SDK_GAME_PAUSE', 'playImg', 'height', 'split', 'block', '9MyPEYh', 'startTTS', 'preloader', 'font-family:\x20allerDisplay;top:33%;font-size:20px;position:relative;color:rgb(147,\x2033,\x20186)', 'readyState', 'core.js', '/play.png', '1724pEBhCZ', 'click', 'background-color:white;width:100%;height:30px;border-radius:16px;', 'display', 'game', '374524nbNiPx', 'portal', 'Game', 'modules', 'showPlay', 'onreadystatechange', 'responseText', 'preloader_button', 'rebrandName', './game.js?cb=', 'application/json', 'config.json', 'getElementsByTagName', 'logoDiv', 'Show\x20AD', 'href', 'insertBefore', 'en-us', 'show', 'addPreloader', 'Should\x20mute....\x20', 'zone', 'img', '54hXVGGA', '<meta\x20name=\x22viewport\x22\x20content=\x22initial-scale=1\x22>', 'timer\x20added,\x20now\x20at\x20', 'width:100%;height:100%;background:linear-gradient(rgb(248,\x20207,\x20249),rgb(247,\x20183,\x20249));position:absolute', 'webkitAnimationEnd', 'timeout', 'show\x20ad', 'now', 'toggleSound', 'whitelist', 'all\x20modules\x20loaded', 'innerWidth', 'bg_element_', 'Play\x20Button\x20Created!', 'MonetizationManager', 'startGame'];
    _0xcaad = function() { return _0x21beae; };
    return _0xcaad();
}

function gameCanRun() {
    var _0x47b5a6 = _0x272ad1;
    is_api[_0x47b5a6(0x212)] = sdk, preloadRewardAd(), resumeGame(), ctotalLoaded = 0x0, gameStarted = !![];
    var _0x3f8ae8 = document[_0x47b5a6(0x20d)]('script');
    _0x3f8ae8[_0x47b5a6(0x1d8)] = 'text/javascript';
    var _0x359c38 = is_api['coreSource'] + _0x47b5a6(0x230);
    if (window['cacheBuster'] != undefined) _0x359c38 += '?cb=' + window['cacheBuster'];
    _0x3f8ae8[_0x47b5a6(0x20a)](_0x47b5a6(0x1ec), _0x359c38), _0x3f8ae8[_0x47b5a6(0x1ef)] = function() {
        var _0x5472fc = _0x47b5a6;
        if (receivedJson['core'] == _0x5472fc(0x20c)) {
            let _0x374a11 = gameData[_0x5472fc(0x1d9)] != '' ? gameData['core'] : _0x5472fc(0x20c);
            for (mod in gameData[_0x5472fc(0x23a)]) {
                data[_0x5472fc(0x1e6)]++;
                var _0x2f79c5 = document[_0x5472fc(0x20d)](_0x5472fc(0x1e8));
                _0x2f79c5[_0x5472fc(0x1d8)] = 'text/javascript', _0x2f79c5[_0x5472fc(0x1ef)] = moduleLoaded, _0x2f79c5[_0x5472fc(0x20a)](_0x5472fc(0x1ec), _0x5472fc(0x1f5) + gameData[_0x5472fc(0x23a)][mod] + _0x5472fc(0x223)), document[_0x5472fc(0x1fb)]['appendChild'](_0x2f79c5);
            }
        } else {
            var _0x3eab64 = document[_0x5472fc(0x20d)](_0x5472fc(0x1e8));
            _0x3eab64[_0x5472fc(0x1d8)] = _0x5472fc(0x1c9);
            var _0x57a03e = _0x5472fc(0x236);
            window['game_build'] != undefined && (_0x57a03e = window['game_build'], is_api[_0x5472fc(0x1b0)](window[_0x5472fc(0x1e9)])), _0x3eab64[_0x5472fc(0x20a)](_0x5472fc(0x1ec), _0x57a03e + '.js'), _0x3eab64['onload'] = function() {
                setTimeout(function() {
                    var _0x5ba9e5 = _0x5260;
                    if (gameWidth != undefined) gameDim[_0x5ba9e5(0x1be)] = gameWidth;
                    if (gameHeight != undefined) gameDim[_0x5ba9e5(0x228)] = gameHeight;
                    startGame({ 'gid': game_id, 'name': recievedJson[_0x5ba9e5(0x1b7)], 'portal': recievedJson[_0x5ba9e5(0x238)], 'title': recievedJson[_0x5ba9e5(0x1db)], 'rebrandName': recievedJson[_0x5ba9e5(0x23f)], 'publisher': publisherFinal, 'ga': recievedJson['ga'], 'gameWidth': gameDim['width'], 'gameHeight': gameDim[_0x5ba9e5(0x228)] });
                }, 0x1);
            }, document[_0x5472fc(0x1fb)]['appendChild'](_0x3eab64);
        }
    }, document['head'][_0x47b5a6(0x1ff)](_0x3f8ae8);
}
var hide = ![],
    timeToWait = 0x0,
    data = { 'modulesToLoad': 0x0, 'languageMapping': { 'Klingon': { 'flag': '', 'standards': ['uga-buga', _0x272ad1(0x21d), _0x272ad1(0x20b)], 'rtl': 0x0, 'addSpaces': 0x0 }, 'English': { 'flag': '', 'standards': [_0x272ad1(0x199), 'en-uk', 'en'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Russian': { 'flag': '', 'standards': ['ru'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'German': { 'flag': '', 'standards': ['de'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Finnish': { 'flag': '', 'standards': ['fi'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Swedish': { 'flag': '', 'standards': ['sv'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Brazilian\x20PT': { 'flag': '', 'standards': ['pt'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Bulgarian': { 'flag': '', 'standards': ['bg'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Greek': { 'flag': '', 'standards': ['el'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Lithuanian': { 'flag': '', 'standards': ['lt'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Croatian': { 'flag': '', 'standards': ['hr'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Latvian': { 'flag': '', 'standards': ['lv'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Italian': { 'flag': '', 'standards': ['it'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'French': { 'flag': '', 'standards': ['fr'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Hungarian': { 'flag': '', 'standards': ['hu'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Spanish': { 'flag': '', 'standards': ['es'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Czech': { 'flag': '', 'standards': ['cs'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Arabic': { 'flag': '', 'standards': ['ar'], 'rtl': 0x1, 'addSpaces': 0x0 }, 'Vietnamese': { 'flag': '', 'standards': ['vi'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Norwegian': { 'flag': '', 'standards': ['no'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Thai': { 'flag': '', 'standards': ['th'], 'rtl': 0x0, 'addSpaces': 0x1 }, 'Ukrainian': { 'flag': '', 'standards': ['uk'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Japanese': { 'flag': '', 'standards': ['ja'], 'rtl': 0x0, 'addSpaces': 0x1 }, 'Slovak': { 'flag': '', 'standards': ['sk'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Indonesian': { 'flag': '', 'standards': ['id'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Polish': { 'flag': '', 'standards': ['pl'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Danish': { 'flag': '', 'standards': ['da'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Hebrew': { 'flag': '', 'standards': ['he'], 'rtl': 0x1, 'addSpaces': 0x0 }, 'Romanian': { 'flag': '', 'standards': ['ro'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Chinese': { 'flag': '', 'standards': ['zh'], 'rtl': 0x0, 'addSpaces': 0x1 }, 'Dutch': { 'flag': '', 'standards': ['nl'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Turkish': { 'flag': '', 'standards': ['tk'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Serbian': { 'flag': '', 'standards': ['sr'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Hindu': { 'flag': '', 'standards': ['hi'], 'rtl': 0x0, 'addSpaces': 0x0 }, 'Portuguese': { 'flag': '', 'standards': ['pt'], 'rtl': 0x0, 'addSpaces': 0x0 } } };

function _0x5260(_0x563448, _0x26b64e) { var _0xcaad52 = _0xcaad(); return _0x5260 = function(_0x5260fe, _0x11d889) { _0x5260fe = _0x5260fe - 0x191; var _0x1ede56 = _0xcaad52[_0x5260fe]; return _0x1ede56; }, _0x5260(_0x563448, _0x26b64e); }

function gameFileLoaded() {
    setTimeout(function() {
        var _0x3761d9 = _0x5260;
        if (recievedJson[_0x3761d9(0x1d9)] == _0x3761d9(0x20c)) {
            console[_0x3761d9(0x1b0)]('load\x20v1.1');
            var _0x2bb24c = new Quack[(_0x3761d9(0x1fa))](null);
            _0x2bb24c[_0x3761d9(0x217)] = new Quack[(_0x3761d9(0x221))](gameData[_0x3761d9(0x1be)], gameData['height']), _0x2bb24c[_0x3761d9(0x21f)] = Quack['DeviceOrientation'][_0x3761d9(0x1c4)], game = new Quack[(_0x3761d9(0x239))](gameData['gid'], _0x2bb24c, domElements[_0x3761d9(0x1d4)]);
            var _0x39325a = [];
            _0x39325a['push'](new Modules[(_0x3761d9(0x1df))](game, receivedJson)), _0x39325a[_0x3761d9(0x1bc)](new Modules[(_0x3761d9(0x1f9))](game, receivedJson)), _0x39325a[_0x3761d9(0x1bc)](new Modules[(_0x3761d9(0x1ad))](game)), game[_0x3761d9(0x1bd)](_0x39325a);
        } else {
            if (gameWidth != undefined) gameDim[_0x3761d9(0x1be)] = gameWidth;
            if (gameHeight != undefined) gameDim['height'] = gameHeight;
            startGame({ 'gid': game_id, 'name': recievedJson[_0x3761d9(0x1b7)], 'portal': recievedJson[_0x3761d9(0x238)], 'title': recievedJson[_0x3761d9(0x1db)], 'rebrandName': recievedJson[_0x3761d9(0x23f)], 'publisher': publisherFinal, 'ga': recievedJson['ga'], 'gameWidth': gameDim[_0x3761d9(0x1be)], 'gameHeight': gameDim['height'] });
        }
    }, 0x1);
}

function moduleLoaded() {
    var _0x1be819 = _0x272ad1;
    data[_0x1be819(0x1e6)]--;
    if (data[_0x1be819(0x1e6)] == 0x0) {
        console['log'](_0x1be819(0x1a9));
        var _0x2fa4bb = document['createElement'](_0x1be819(0x1e8));
        _0x2fa4bb[_0x1be819(0x1d8)] = _0x1be819(0x1c9), _0x2fa4bb[_0x1be819(0x1ef)] = gameFileLoaded, _0x2fa4bb[_0x1be819(0x20a)](_0x1be819(0x1ec), _0x1be819(0x191) + Math[_0x1be819(0x1c0)](Math[_0x1be819(0x1f6)]() * 0x186a0)), document[_0x1be819(0x1fb)][_0x1be819(0x1ff)](_0x2fa4bb);
    }
}

function triggerZone(_0x56c587) {
    var _0x3fceff = _0x272ad1;
    is_api['log'](_0x3fceff(0x1f2), _0x56c587), trackAnalyticsNewUnit(_0x56c587);
    var _0x5bae7e = getTimeNowInSeconds();
    _0x56c587 === _0x3fceff(0x1e7) && (recievedJson['core'] == _0x3fceff(0x1d6) || recievedJson[_0x3fceff(0x1d9)] == 'v0') && typeof hidePreloader != 'undefined' && hidePreloader();
    if (typeof adblockOn != 'undefined' && adblockOn == !![]) return;
    if (config[_0x3fceff(0x1a8)] == 0x1) return;
    if (config[_0x3fceff(0x1cc)]['indexOf'](_0x56c587) > -0x1) { if (timeToWait > _0x5bae7e - counterForSomething) { is_api[_0x3fceff(0x1b0)](_0x3fceff(0x214) + timeToWait + '\x20seconds\x20passed:\x20' + (_0x5bae7e - counterForSomething)); return; } }
    ad_is_showing = !![], currentZone = _0x56c587, muteAd(![]);
    if (_0x56c587[_0x3fceff(0x229)](_0x3fceff(0x1e2))[_0x3fceff(0x210)] > 0x1) showRewardedAd();
    else showAd();
    counterForSomething = getTimeNowInSeconds(), timeToWait = 0x0, addTimeToWait(config[_0x3fceff(0x1ca)]), is_api['log']('ad\x20was\x20shown,\x20next\x20after\x20' + timeToWait);
}
IS_api = {
    'showAd': (_0x1fae53, _0x3614e4, _0x5d89d0) => {
        var _0x34843e = _0x272ad1;
        console[_0x34843e(0x1b0)](_0x34843e(0x1a5), _0x1fae53), triggerZone(_0x1fae53);
    },
    'initAds': () => {},
    'initIAP': () => {}
};

function showRewardedAd() {
    var _0x4a67ac = _0x272ad1;
    is_api[_0x4a67ac(0x1b0)](_0x4a67ac(0x1c2)), console[_0x4a67ac(0x1b0)]('Show\x20Rewarded\x20AD'), sdk !== _0x4a67ac(0x1e0) && sdk[_0x4a67ac(0x1b8)] !== _0x4a67ac(0x1e0) && sdk['showBanner']();
}

function showAd() {
    var _0x3cba2e = _0x272ad1;
    is_api[_0x3cba2e(0x1b0)](_0x3cba2e(0x196)), console[_0x3cba2e(0x1b0)]('Show\x20AD'), typeof game != 'undefined' && (game[_0x3cba2e(0x1d0)] = !![], muteAd(![])), typeof is_api['gd_api'] !== _0x3cba2e(0x1e0) && is_api[_0x3cba2e(0x212)][_0x3cba2e(0x1b8)] !== _0x3cba2e(0x1e0) && sdk[_0x3cba2e(0x1d2)]();
}

function showGame() {
    var _0x32daae = _0x272ad1;
    muteAd(!![]);
    if (typeof game != _0x32daae(0x1e0)) game['paused'] = ![];
    currentZone = '';
}

function resumeGame() {
    var _0x1ca8dd = _0x272ad1;
    console[_0x1ca8dd(0x1b0)](_0x1ca8dd(0x1d7)), is_api[_0x1ca8dd(0x1b0)](_0x1ca8dd(0x1cb)), showGame();
}

function addTimeToWait(_0xd76677) {
    var _0x6479ab = _0x272ad1;
    if (_0xd76677 != '') timeToWait += parseInt(_0xd76677);
    is_api[_0x6479ab(0x1b0)](_0x6479ab(0x1a1) + timeToWait);
}
var wasMuted = ![];

function muteAd(_0x574ddf) {
    var _0x515d6b = _0x272ad1;
    console[_0x515d6b(0x1b0)](_0x515d6b(0x19c) + _0x574ddf), typeof Main != _0x515d6b(0x1e0) && Main[_0x515d6b(0x1a7)] && Main[_0x515d6b(0x1a7)](_0x574ddf), typeof Core != 'undefined' && Core[_0x515d6b(0x1a7)] && Core[_0x515d6b(0x1a7)](_0x574ddf), typeof muteAdjs != _0x515d6b(0x1e0) && muteAdjs(_0x574ddf);
}

function trackAnalyticsNewUnit(_0x3cf2b7) {}

function trackAnalyticsEvent(_0x4611ce, _0x148322 = !![]) {}

function getTimeNowInSeconds() { var _0x4e502b = _0x272ad1; return Math[_0x4e502b(0x1c0)](Date[_0x4e502b(0x1a6)]() / 0x3e8); }
window['onload'] = function() { startScript(); }, relatedData = { 'buttonTop': null, 'firstTimer': null }, relatedObject = { 'customShow': function() {} }, domElements = { 'logo': { 'hide': function() {} } };