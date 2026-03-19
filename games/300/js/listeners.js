function _0x42fd() {
    const _0x584ae9 = ['892854tjfdnH', 'addEventListener', 'mainMusic', 'load', '88jdXHAo', 'Page\x20is\x20fully\x20loaded', 'stop', '14BrRuYe', '177710vixfbj', 'preventDefault', 'length', 'touchmove', 'resize', '83352VsiEof', 'contextmenu', 'title', '1254636dPGosL', 'log', 'touched', 'visibilitychange', 'ball', 'touchend', '585IxLGtt', '7270130tUoTTJ', '370414xkblmN', '6uMqssO', 'hidden', '24OlgUlR', 'undefined', 'touchstart', '907170qncCTe', 'mouseup', 'visible'];
    _0x42fd = function() {
        return _0x584ae9;
    };
    return _0x42fd();
}
const _0x4fc364 = _0x5072;

function _0x5072(_0x22fff9, _0x26ce30) {
    const _0x42fd04 = _0x42fd();
    return _0x5072 = function(_0x5072d5, _0x27e513) {
        _0x5072d5 = _0x5072d5 - 0xf5;
        let _0x48a21a = _0x42fd04[_0x5072d5];
        return _0x48a21a;
    }, _0x5072(_0x22fff9, _0x26ce30);
}(function(_0x3b564a, _0x23a617) {
    const _0x1703ef = _0x5072,
        _0x55bd20 = _0x3b564a();
    while (!![]) {
        try {
            const _0x307136 = -parseInt(_0x1703ef(0x112)) / 0x1 + parseInt(_0x1703ef(0xfa)) / 0x2 * (parseInt(_0x1703ef(0x113)) / 0x3) + parseInt(_0x1703ef(0x115)) / 0x4 * (parseInt(_0x1703ef(0x102)) / 0x5) + parseInt(_0x1703ef(0xf7)) / 0x6 * (parseInt(_0x1703ef(0x101)) / 0x7) + -parseInt(_0x1703ef(0x107)) / 0x8 * (parseInt(_0x1703ef(0x110)) / 0x9) + -parseInt(_0x1703ef(0x111)) / 0xa + -parseInt(_0x1703ef(0xfe)) / 0xb * (-parseInt(_0x1703ef(0x10a)) / 0xc);
            if (_0x307136 === _0x23a617) break;
            else _0x55bd20['push'](_0x55bd20['shift']());
        } catch (_0x35c43d) {
            _0x55bd20['push'](_0x55bd20['shift']());
        }
    }
}(_0x42fd, 0x72cf2), window[_0x4fc364(0xfb)](_0x4fc364(0x108), function(_0xc7261e) {
    const _0x3062ec = _0x4fc364;
    _0xc7261e[_0x3062ec(0x103)]();
}), window[_0x4fc364(0xfb)]('mousemove', function(_0x58bd89) {
    if (!isMobile) mouseMove(_0x58bd89);
}), window['addEventListener'](_0x4fc364(0xf8), function(_0x75f001) {
    if (!isMobile) mouseControl();
}), window[_0x4fc364(0xfb)](_0x4fc364(0x105), function() {
    mouseMove(event);
}), window[_0x4fc364(0xfb)](_0x4fc364(0xf6), function(_0x113747) {
    const _0x4f5232 = _0x4fc364;
    mouseMove(_0x113747);
    if (snd[_0x4f5232(0x10e)]) snd[_0x4f5232(0x10e)]['play']();
    userTouchedScreen = !![];
}), window['addEventListener'](_0x4fc364(0x10f), function(_0x4274cb) {
    const _0x64aa01 = _0x4fc364;
    mouseMove(_0x4274cb), mouseControl();
    for (let _0x3bff03 = 0x0; _0x3bff03 < touches[_0x64aa01(0x104)]; _0x3bff03++) {
        touches[_0x3bff03][_0x64aa01(0x10c)] && (touches[_0x3bff03][_0x64aa01(0x10c)] = ![]);
    }
    userTouchedScreen = ![];
}), window[_0x4fc364(0xfb)](_0x4fc364(0x106), resizeHandler), window['addEventListener'](_0x4fc364(0x10d), function() {
    const _0x20d5d5 = _0x4fc364;
    if (document['visibilityState'] == _0x20d5d5(0x114)) {
        if (typeof snd[_0x20d5d5(0xfc)] != 'undefined') snd[_0x20d5d5(0xfc)][_0x20d5d5(0x100)]();
    } else {
        if (document['visibilityState'] == _0x20d5d5(0xf9)) {
            if (typeof snd['mainMusic'] != _0x20d5d5(0xf5)) snd[_0x20d5d5(0xfc)]['play']();
        }
    }
}, ![]), window[_0x4fc364(0xfb)](_0x4fc364(0xfd), _0x470a94 => {
    const _0x295fc5 = _0x4fc364;
    loadLanguageFiles(), setLanguageGame(), document[_0x295fc5(0x109)] = gameTitle, resizeHandler(), loaderFiles(), console[_0x295fc5(0x10b)](_0x295fc5(0xff));
}));