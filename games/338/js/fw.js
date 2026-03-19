const MockConfig = {
    verbose: true,
}


var Instant = {
    __mockState: {
        initialized: false
    },
    player: {
        getName: function() {
            return Utils.returnUserData('Player 1');
        },
        getPhoto: function() {
            return Utils.returnUserData('/assets/mock/profile.jpg');
        },
        getID: function() {
            return Utils.returnUserData(123456789);
        },
        getDataAsync: function(keys) {
            Utils.log('player.getDataAsync');
            return Utils.getFromLocalStorage('playerData', keys);
        },
        setDataAsync: function(obj) {
            Utils.log('player.setDataAsync');
            return Utils.writeToLocalStorage('playerData', obj);
        },
        getStatsAsync: function(keys) {
            Utils.log('player.getStatsAsync');
            return Utils.getFromLocalStorage('playerStats', keys);
        },
        setStatsAsync: function(obj) {
            Utils.log('player.setStatsAsync');
            return Utils.writeToLocalStorage('playerStats', obj);
        },
        incrementStatsAsync: function(obj) {
            return new Promise(function(resolve, reject) {
                Utils.getFromLocalStorage('playerStats', Object.keys(obj))
                    .then(function(storedObject) {
                        for (var key in storedObject) {
                            storedObject[key] += obj[key];
                        }
                        Utils.writeToLocalStorage('playerStats', storedObject)
                            .then(function() {
                                resolve();
                            });
                    });
            });

        },
        flushDataAsync: function(obj) {
            return new Promise(function(resolve, reject) {
                Utils.log('player.flushDataAsync');
                resolve();
            });
        },
        getConnectedPlayersAsync: function() {
            return new Promise(function(resolve, reject) {
                var players = [];
                var initialized = Instant.__mockState.initialized;
                if (initialized) {
                    players = [{
                            getID: function() {
                                return 42
                            },
                            getName: function() {
                                return 'Friend 1'
                            },
                            getPhoto: function() {
                                '/assets/mock/friend1.png'
                            }
                        },
                        {
                            getID: function() {
                                return 43
                            },
                            getName: function() {
                                return 'Friend 2'
                            },
                            getPhoto: function() {
                                '/assets/mock/friend2.png'
                            }
                        },
                        {
                            getID: function() {
                                return 44
                            },
                            getName: function() {
                                return 'Friend 3'
                            },
                            getPhoto: function() {
                                '/assets/mock/friend3.png'
                            }
                        },
                    ];
                } else {
                    Utils.log('getConnectedPlayersAsync', 'Connected players data is not available before startGameAsync resolves');
                }
                Utils.log('getConnectedPlayersAsync', 'players: ', players);
                resolve(players);
            });
        },
        getSignedPlayerInfoAsync: function() {
            Utils.log('player.getSignedPlayerInfoAsync is not available in the Mock SDK. Please test this function with the production SDK')
        }
    },
    context: {
        getID: function() {
            // return 1234;
            return null;
        },
        chooseAsync: function() {
            return new Promise(function(resolve, reject) {
                Utils.log('context.chooseAsync');
                Utils.createAlert({
                        message: 'Choosing a new context',
                        cta: 'Play!'
                    },
                    resolve
                );
            });

        },
        switchAsync: function(contextId) {
            return new Promise(function(resolve, reject) {
                Utils.log('context.switchAsync');
                Utils.createAlert({
                        message: 'Switching to a new context (' + contextId + ')',
                        cta: 'Play!'
                    },
                    resolve
                );
            });
        },
        createAsync: function(userId) {
            return new Promise(function(resolve, reject) {
                Utils.log('context.createAsync');
                Utils.createAlert({
                        message: 'Switching to a conversation with player ' + playerId,
                        cta: 'Play!'
                    },
                    resolve
                );
            });
        },
        getType: function() {
            return Utils.returnAndLog('SOLO');
        },
        isSizeBetween: function(minSize, maxSize) {
            return Utils.returnAndLog(true);
        },
        getPlayersAsync: function() {
            return new Promise(function(resolve, reject) {
                var players = [];
                var initialized = Instant.__mockState.initialized;
                if (initialized) {
                    players = [{
                            getID: function() {
                                return 42
                            },
                            getName: function() {
                                return 'Friend 1'
                            },
                            getPhoto: function() {
                                '/assets/mock/friend1.png'
                            }
                        },
                        {
                            getID: function() {
                                return 43
                            },
                            getName: function() {
                                return 'Friend 2'
                            },
                            getPhoto: function() {
                                '/assets/mock/friend2.png'
                            }
                        },
                        {
                            getID: function() {
                                return 44
                            },
                            getName: function() {
                                return 'Friend 3'
                            },
                            getPhoto: function() {
                                '/assets/mock/friend3.png'
                            }
                        },
                    ];
                } else {
                    Utils.log('context.getPlayersAsync', 'Connected players data is not available before startGameAsync resolves');
                }
                Utils.log('context.getPlayersAsync', 'players: ', players);
                resolve(players);
            });
        }
    },

    getLocale: function() {
        return 'pt_BR';
    },

    initializeAsync: function() {
        return new Promise(function(resolve, reject) {
            // Inject mock css
            /*var stylesheet = document.createElement('link');
            stylesheet.href = 'css/mock/mock.css';
            stylesheet.rel = 'stylesheet';
            stylesheet.type = 'text/css';
            document.head.appendChild(stylesheet);

            Utils.log('initializeAsync');*/
            resolve();
        });
    },

    setLoadingProgress: function(progress) {
        return new Promise(function(resolve, reject) {
            Utils.log('progress', progress, '%');
            resolve();
        });
    },

    startGameAsync: function() {
        return new Promise(function(resolve, reject) {
            Utils.log('startGameAsync', 'Showing game start dialog');
            /*Utils.createAlert(
                {
                    message:'Game has finished loading. <br /> Play now?', 
                    cta: 'Play!'
                }, 
                function() {
                    Instant.__mockState.initialized = true;
                    resolve();
                });*/
            resolve();
        });
    },

    quit: function() {
        Utils.log('QUIT was called. At this point the game will exit');
    },

    updateAsync: function(config) {
        return new Promise(function(resolve, reject) {
            Utils.log('updateAsync');
            if (config.image) {
                resolve();
            } else {
                reject();
            }
        });

    },

    getEntryPointData: function() {
        var queryString = Utils.getQueryString();
        Utils.log('getEntryPointData',
            'query string: ', queryString,
            'entry point data: ', queryString.entryPointData);

        if (queryString.entryPointData) {
            return JSON.parse(queryString.entryPointData[0]);
        } else {
            Utils.log(
                'While using the mock SDK, set your entryPointData in the URL querystring',
                'example: http://localhost:8080/?entryPointData={a:1,b:2,c:3}');
        }
    },

    getEntryPointAsync: function() {
        return new Promise(function(resolve, reject) {
            resolve('admin_message');
        });
    },

    setSessionData: function(object) {
        Instant.log('setSessionData', 'Object to be persisted', object, '(Please note, while using the mock SDK, setSessionData will have no effect.)')
    },

    getPlatform: function() {
        return 'WEB';
    },

    getSDKVersion: function() {
        return '5.0';
    },

    getSupportedAPIs: function() {
        var supportedAPIs = [];
        for (var prop in Instant) {
            supportedAPIs.push(prop);
        }
        for (var prop in Instant.player) {
            supportedAPIs.push('player.' + prop);
        }
        for (var prop in Instant.context) {
            supportedAPIs.push('context.' + prop);
        }
        return supportedAPIs;
    },

    shareAsync: function(options) {
        var message = 'Share Intent: ' + options.intent;
        message += '<br />';
        message += 'Share text: ' + options.text;
        message += '<br />';
        message += 'Share payload: ' + JSON.stringify(options.data);

        return new Promise(function(resolve, reject) {
            Utils.createAlert({
                    title: 'Shared content',
                    message: message,
                    image: options.image,
                    cta: 'Close'
                },
                resolve
            );
        });

    },

    getLeaderboardAsync: function(name) {
        var leaderboard = {
            getName: function() {
                return name;
            },
            getContextID: function() {
                return 1234;
            },
            getEntryCountAsync: function() {
                return Promise.resolve(3);
            },
            setScoreAsync: function(score, extraData) {
                var leaderboardEntry = Utils.createLeaderboardEntry(
                    score,
                    3, {
                        name: 'Player 1',
                        photo: '/assets/mock/profile.jpg',
                        id: 123456789
                    },
                    extraData
                );
                return Promise.resolve(leaderboardEntry);
            },
            getPlayerEntryAsync: function() {
                var leaderboardEntry = Utils.createLeaderboardEntry(
                    score,
                    3, {
                        name: 'Player 1',
                        photo: '/assets/mock/profile.jpg',
                        id: 123456789
                    },
                    extraData
                );
                return Promise.resolve(leaderboardEntry);
            },
            getEntriesAsync: function() {
                var entries = [
                    Utils.createLeaderboardEntry(
                        42,
                        3, {
                            name: 'Player 1',
                            photo: '/assets/mock/profile.jpg',
                            id: 123456789
                        },
                        null
                    ),
                    Utils.createLeaderboardEntry(
                        43,
                        2, {
                            name: 'Player 2',
                            photo: '/assets/mock/friend1.png',
                            id: 43
                        },
                        null
                    ),
                    Utils.createLeaderboardEntry(
                        44,
                        1, {
                            name: 'Player 3',
                            photo: '/assets/mock/friend2.png',
                            id: 44
                        },
                        null
                    )
                ];
                return Promise.resolve(entries);
            }
        };

        return Promise.resolve(leaderboard);
    },

    logEvent: function(eventName, value, parameters) {
        Utils.log('logEvent', eventName, value, parameters);
        return null;
    },

    onPause: function(callback) {
        window.onblur = function() {
            Utils.log('onPause', 'Interruption event triggered')
            callback();
        };
    }
};


/* 
 * Helper Functions
 */
var Utils = {

    createAlert: function(options, callback) {
        var alertDiv = document.createElement('div');
        alertDiv.className = 'mockDialog';

        var title = document.createElement('h3');
        title.innerHTML += ' ' + (options.title || '');
        alertDiv.appendChild(title);

        if (options.message) {
            var paragraph = document.createElement('p');
            paragraph.innerHTML = options.message;
            alertDiv.appendChild(paragraph);
        }

        if (options.image) {
            var image = document.createElement('img');
            image.src = options.image;
            alertDiv.appendChild(image);
        }

        var button = document.createElement('input');
        button.type = 'button';
        button.value = options.cta || 'Close';
        alertDiv.appendChild(button);


        button.onclick = function() {
            document.body.removeChild(alertDiv);
            callback();
        }

        document.body.appendChild(alertDiv);
    },

    log: function() {
        if (MockConfig.verbose) {
            args = [];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            console.log.apply(console, args);
        }
    },

    getQueryString: function() {
        var qd = {};
        if (location.search) location.search.substr(1).split("&").forEach(function(item) {
            var s = item.split("="),
                k = s[0],
                v = s[1] && decodeURIComponent(s[1]);
            (qd[k] = qd[k] || []).push(v)
        });
        return qd;
    },

    returnAndLog: function(value) {
        caller = Utils.returnAndLog.caller;
        if (caller) {
            Utils.log(caller.name, value);
        } else {
            Utils.log(value);
        }
        return value;
    },

    returnUserData: function(value) {
        var initialized = Instant.__mockState.initialized;
        if (initialized) {
            return Utils.returnAndLog(value);
        } else {
            Utils.log('User Data is not available until startGameAsync has resolved');
            return null;
        }
    },

    getFromLocalStorage: function(store, keys) {
        return new Promise(function(resolve, reject) {
            var data = localStorage.getItem(store);
            var response = {};
            if (data) {
                data = JSON.parse(data);
                keys.forEach(function(key) {
                    if (data[key] !== 'undefined') {
                        response[key] = data[key];
                    }
                });
            }
            Utils.log(response);
            resolve(response);
        });
    },

    writeToLocalStorage: function(store, obj) {
        return new Promise(function(resolve, reject) {
            Utils.log(JSON.stringify(obj));
            localStorage.setItem(store, JSON.stringify(obj));
            resolve();
        });
    },

    createLeaderboardEntry: function(score, rank, player, extraData) {
        return {
            getScore: function() {
                return score
            },
            getFormattedScore: function() {
                return score
            },
            getTimeStamp: function() {
                return 1515806357
            },
            getRank: function() {
                return rank
            },
            getExtraData: function() {
                return extraData
            },
            getPlayer: function() {
                return {
                    getName: function() {
                        return player.name
                    },
                    getPhoto: function() {
                        return player.photo
                    },
                    getID: function() {
                        return player.id
                    },
                }
            }
        }
    }
}