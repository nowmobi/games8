var Fetch = pc.createScript('fetch');

pc.extend(Fetch.prototype, {

    initialize: function() {
        pc.fetch = this;
        this._domain = 'https://4xq9aj21ie.execute-api.eu-west-1.amazonaws.com/prod/';
    },

    setScore: function(body, callback, context) {
        this._postRequest(body, 'score', callback, context);
    },

    createEntry: function(callback, context) {
        this._postRequest({}, 'entry', callback, context);
    },

    getLeaderboard: function(callback, context) {
        this._getRequest('leaderboard', callback, context);
    },

    getEntry: function(id, callback, context) {
        this._getRequest('entry?id=' + id, callback, context);
    },

    _getRequest: function(path, callback, context, domain) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var json = JSON.parse(xmlHttp.responseText);
                    callback.call(context, json);
                } else {
                    console.info('Call is: ' + xmlHttp.status);
                    if (callback) callback.call(context, 'Fail');
                }
            }
        };

        xmlHttp.open('GET', (domain || this._domain) + path, true);
        xmlHttp.send(null);
    },

    _postRequest: function(body, path, callback, context) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (xmlHttp.responseText) {
                        var json = JSON.parse(xmlHttp.responseText);
                        if (callback) callback.call(context, json);
                    } else {
                        if (callback) callback.call(context, 'Succes');
                    }

                } else {
                    console.info('Call is: ' + xmlHttp.status);
                    if (callback) callback.call(context, 'Fail');
                }
            }
        };

        xmlHttp.open('POST', this._domain + path, true);
        xmlHttp.send(JSON.stringify(body));
    },
});