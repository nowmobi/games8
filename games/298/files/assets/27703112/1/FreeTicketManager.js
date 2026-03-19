var FreeTicketManager = pc.createScript('freeTicketManager');

FreeTicketManager.attributes.add('freeTicketEntity', {
    type: 'entity',
    title: 'Free Ticket Entity'
});

FreeTicketManager.attributes.add('cooldown', {
    type: 'number',
    title: 'Cooldown',
});

FreeTicketManager.attributes.add('cooldownUnit', {
    type: 'string',
    enum: [{
            'hour': 'hour'
        },
        {
            'minute': 'minute'
        },
        {
            'milliseconds': 'milliseconds'
        }
    ]
})

// initialize code called once per entity
FreeTicketManager.prototype.initialize = function() {
    pc.freeTicketManager = this;
    this.app.on('StorageManager:onLoadSaveData', this.setData, this);
};

FreeTicketManager.prototype.setData = function(stats) {
    var date = stats.freeTicketDate;

    if (!pc.wrapper.hasRewardedAd()) {
        //this.entity.parent.enabled = false;
        this.setEntityVisibility(false);
        return;
    }

    if (!date) {
        this.setEntityVisibility(true);
        return;
    }

    this.date = new Date(date);

    var difference = pc.dateManager.getDifferenceInMilliseconds(this.date);

    // If there is still time left
    if (difference > 0) {
        this.setEntityVisibility(false);

        var self = this;

        setTimeout(function() {
            self.setEntityVisibility(true);
        }, difference);
    } else {
        this.setEntityVisibility(true);
    }
};

FreeTicketManager.prototype.setEntityVisibility = function(enable) {
    this.freeTicketEntity.enabled = enable;
};

FreeTicketManager.prototype.ticketReceived = function() {
    var nextDate = pc.dateManager.getCurrentTimeWithOffset(this.cooldownUnit, this.cooldown);
    pc.wrapper.setData({
        freeTicketDate: nextDate.toISOString()
    });

    this.setEntityVisibility(false);

    var self = this;
    var timeDifference = pc.dateManager.getDifferenceInMilliseconds(nextDate);

    setTimeout(function() {
        self.setEntityVisibility(true);
    }, timeDifference);
};