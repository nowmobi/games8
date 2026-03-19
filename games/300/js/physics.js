function _0x4536(_0x3b16ab, _0x948630) {
    const _0x39736f = _0x3973();
    return _0x4536 = function(_0x45362c, _0x1a0aae) {
        _0x45362c = _0x45362c - 0x15e;
        let _0x24f770 = _0x39736f[_0x45362c];
        return _0x24f770;
    }, _0x4536(_0x3b16ab, _0x948630);
}
const _0x5b60f8 = _0x4536;
(function(_0x5ebb53, _0x4e0d45) {
    const _0x2ed981 = _0x4536,
        _0x2cd69c = _0x5ebb53();
    while (!![]) {
        try {
            const _0xbd2a94 = parseInt(_0x2ed981(0x17a)) / 0x1 + -parseInt(_0x2ed981(0x182)) / 0x2 + -parseInt(_0x2ed981(0x160)) / 0x3 + -parseInt(_0x2ed981(0x17b)) / 0x4 + parseInt(_0x2ed981(0x167)) / 0x5 + parseInt(_0x2ed981(0x161)) / 0x6 * (parseInt(_0x2ed981(0x16d)) / 0x7) + parseInt(_0x2ed981(0x16e)) / 0x8 * (parseInt(_0x2ed981(0x17d)) / 0x9);
            if (_0xbd2a94 === _0x4e0d45) break;
            else _0x2cd69c['push'](_0x2cd69c['shift']());
        } catch (_0x10d3b5) {
            _0x2cd69c['push'](_0x2cd69c['shift']());
        }
    }
}(_0x3973, 0xe7def));

function _0x3973() {
    const _0x3d8dc4 = ['position', '1296947clDdGm', '6738560SoaTsk', 'World', '876897anqBIk', 'mousedownPosition', 'pairs', 'Events', 'scale', '3695524vRqnSM', 'Engine', 'ball', 'bodyA', '2314899WZHcpi', '30MTOSaz', 'Bodies', 'bodyB', 'height', 'setStatic', 'canvas', '9069050TwIfYU', 'body', 'undefined', 'velocity', 'create', 'play', '681324YvsnwA', '136nxKrqJ', 'width', 'Composite', 'Body', 'Runner', 'Mouse', 'Render', 'ground', 'transparent', 'MouseConstraint', 'label'];
    _0x3973 = function() {
        return _0x3d8dc4;
    };
    return _0x3973();
}
let Engine = Matter[_0x5b60f8(0x183)],
    Render = Matter[_0x5b60f8(0x174)],
    World = Matter[_0x5b60f8(0x17c)],
    Bodies = Matter[_0x5b60f8(0x162)];
MouseConstraint = Matter[_0x5b60f8(0x177)], Mouse = Matter[_0x5b60f8(0x173)], Body = Matter[_0x5b60f8(0x171)], Events = Matter[_0x5b60f8(0x180)], Runner = Matter[_0x5b60f8(0x172)], Composite = Matter[_0x5b60f8(0x170)];
let engine = Engine[_0x5b60f8(0x16b)]();
engine['world']['gravity']['y'] = 5.7;
let render = Render[_0x5b60f8(0x16b)]({
        'element': document[_0x5b60f8(0x168)],
        'canvas': gameCanvas,
        'engine': engine,
        'options': {
            'width': baseWidth,
            'height': baseHeight,
            'wireframes': ![],
            'background': _0x5b60f8(0x176)
        }
    }),
    wallSize = 0x50,
    ground = ![],
    leftWall = ![],
    rightWall = ![],
    playerBall = ![];
var mouseMATTER = Mouse[_0x5b60f8(0x16b)](render[_0x5b60f8(0x166)]);
mouseConstraint = MouseConstraint[_0x5b60f8(0x16b)](engine, {
    'mouse': mouseMATTER
}), Events['on'](mouseConstraint, 'mousedown', function(_0x1848db) {
    const _0x23cc56 = _0x5b60f8;
    let _0x21237e = gameCanvas['getBoundingClientRect'](),
        _0x219300 = width / _0x21237e[_0x23cc56(0x16f)],
        _0x2cbd4c = height / _0x21237e[_0x23cc56(0x164)];
    mouseMATTER[_0x23cc56(0x181)]['x'] = _0x219300, mouseMATTER[_0x23cc56(0x181)]['y'] = _0x2cbd4c;
    let _0x42d63e, _0x3b2840, _0x33a0ac = mouseConstraint[_0x23cc56(0x168)];
    if (gameStarted) {
        if (!(typeof _0x33a0ac == _0x23cc56(0x169) || _0x33a0ac == null)) {
            if (_0x33a0ac[_0x23cc56(0x178)] == _0x23cc56(0x15e)) {
                if (tapInfo) tapInfo = ![];
                if (snd[_0x23cc56(0x15e)]) snd['ball'][_0x23cc56(0x16c)]();
                score++, Body[_0x23cc56(0x165)](_0x33a0ac, ![]), Body['setVelocity'](_0x33a0ac, {
                    'x': _0x33a0ac[_0x23cc56(0x16a)]['x'],
                    'y': 0x0
                }), _0x42d63e = (_0x33a0ac[_0x23cc56(0x179)]['x'] - _0x1848db['mouse'][_0x23cc56(0x17e)]['x']) / 0x32, Body['applyForce'](_0x33a0ac, {
                    'x': _0x33a0ac[_0x23cc56(0x179)]['x'],
                    'y': _0x33a0ac['position']['y']
                }, {
                    'x': _0x42d63e,
                    'y': -0x1
                }), Body['setAngularVelocity'](_0x33a0ac, _0x42d63e / 0x23);
            }
        }
    }
}), Events['on'](engine, 'collisionStart', function(_0x27e31d) {
    const _0x5ba9bc = _0x5b60f8;
    if (gameStarted)
        for (let _0x57fcc5 = 0x0; _0x57fcc5 < _0x27e31d[_0x5ba9bc(0x17f)]['length']; _0x57fcc5++) {
            let _0x28b576 = _0x27e31d[_0x5ba9bc(0x17f)][_0x57fcc5];
            if (_0x28b576[_0x5ba9bc(0x15f)]['label'] == 'ball' && _0x28b576[_0x5ba9bc(0x163)][_0x5ba9bc(0x178)] == _0x5ba9bc(0x175) || _0x28b576[_0x5ba9bc(0x15f)][_0x5ba9bc(0x178)] == _0x5ba9bc(0x175) && _0x28b576[_0x5ba9bc(0x163)][_0x5ba9bc(0x178)] == _0x5ba9bc(0x15e)) {
                if (snd[_0x5ba9bc(0x15e)]) snd[_0x5ba9bc(0x15e)][_0x5ba9bc(0x16c)]();
                score > bestScore && (bestScore = score, saveGame()), score = 0x0;
            }
        }
});