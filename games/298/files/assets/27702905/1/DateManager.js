var DateManager = pc.createScript('dateManager');

// initialize code called once per entity
DateManager.prototype.initialize = function() {
    pc.dateManager = this;
    this.loggedInDate = new Date();
    this._resetTime = null;
    this._dayInMilliseconds = 8.64e+7;
};

DateManager.prototype.currentTime = function() {
    if (this.loggedInDate) {
        var currentTime = new Date(this.loggedInDate);
        currentTime.setUTCMilliseconds(currentTime.getUTCMilliseconds() + this.app._time);
        return currentTime;
    }

    console.warn('Last Logged in date not Found!');
    return new Date();
};

DateManager.prototype.timeTillReset = function() {
    var currentTime = this.currentTime();
    var resetTime = this.resetTime();

    return resetTime - currentTime;
};

DateManager.prototype.resetTime = function() {
    var currentTime = this.currentTime();

    if (this._resetTime) {
        if (this._resetTime < currentTime) {
            console.log("reset");
            this._resetTime.setDate(this._resetTime.getDate() + 1);

            this.app.fire('DateManager:.reset');
        }
    } else {
        var resetTime = new Date(currentTime);
        resetTime.setDate(resetTime.getDate() + 1);
        resetTime.setHours(5);
        resetTime.setMinutes(0);
        resetTime.setSeconds(0);

        this._resetTime = resetTime;
    }

    var diff = this._resetTime.getTime() - currentTime.getTime()

    var days = Math.floor(diff / this._dayInMilliseconds);

    if (days > 0) {
        this._resetTime.setDate(this._resetTime.getDate() - days);
    }

    return this._resetTime;
};

DateManager.prototype.hasDayPassed = function(pReferenceDate, amount) {
    if (!amount) {
        amount = 1;
    }
    var currentTime = this.currentTime();

    var currentTimeToDays = this.dateToDays(currentTime);
    var referenceDateToDays = this.dateToDays(pReferenceDate);

    return currentTimeToDays > (referenceDateToDays + (amount - 1));
};

DateManager.prototype.daysPassed = function(pReferenceDate) {
    var currentTime = this.currentTime();

    var currentTimeToDays = this.dateToDays(currentTime);
    var referenceDateToDays = this.dateToDays(pReferenceDate);

    return currentTimeToDays - referenceDateToDays;
};

DateManager.prototype.dateToDays = function(pDate) {
    if (!pDate) {
        pDate = this.currentTime();
    }

    return Math.floor(pDate.getTime() / this.dayToMilliSeconds());
};

DateManager.prototype.dayToMilliSeconds = function() {
    return 24 * 60 * 60 * 1000;
};

DateManager.prototype.getDifferenceInMilliseconds = function(dateObject) {
    console.log(dateObject)
    return dateObject.getTime() - this.currentTime().getTime();
};

DateManager.prototype.getCurrentTimeWithOffset = function(unit, value) {
    var date = this.currentTime();

    switch (unit) {
        case 'day':
            date.setUTCDate(date.getUTCDate() + value);
            break;
        case 'hour':
            date.setUTCHours(date.getUTCHours() + value);
            break;
        case 'minute':
            date.setUTCMinutes(date.getUTCMinutes() + value);
            break;
        case 'second':
            date.setUTCSeconds(date.getUTCSeconds() + value);
            break;
        case 'millisecond':
            date.setUTCMilliseconds(date.getUTCMilliseconds() + value);
            break;
        default:
            console.warn(type + ' is not recognized');
            break;
    }
    return date;
};