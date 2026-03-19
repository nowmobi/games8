var FreeTicketButton = pc.createScript('freeTicketButton');

FreeTicketButton.attributes.add('successPopUp', {
    type: 'entity',
    title: 'Success Pop Up',
});

FreeTicketButton.attributes.add('failPopUp', {
    type: 'entity',
    title: 'Fail Pop Up',
});

FreeTicketButton.attributes.add('overlay', {
    type: 'entity',
    title: 'Overlay'
});

FreeTicketButton.attributes.add('nTickets', {
    type: 'number',
    default: 2,
    title: 'Number of Tickets reward'
});

// initialize code called once per entity
FreeTicketButton.prototype.initialize = function() {
    // if (!pc.facebook.supportRewardedVideoAPI()) {
    //     this.entity.parent.enabled = false;
    //     return;
    // }
    if (this.app.mouse) {
        this.entity.element.on('mouseup', this.onPress, this);
    }

    if (this.app.touch) {
        this.entity.element.on('touchend', this.onPress, this);
    }

};

FreeTicketButton.prototype.onPress = function(event) {
    pc.util.processEvent(event);
    this.app.fire('Audio:UIConfirm');
    this.overlay.enabled = true;

    pc.wrapper.showRewardedAd(this.showPopUp, this);
};

FreeTicketButton.prototype.showPopUp = function(message, error) {
    this.overlay.enabled = false;

    this.app.fire('Audio:UIMenuEnter');
    console.log(message);

    if (error) {
        this.app.fire('popUp:addPopUp', this.failPopUp);
        console.log(error)
        return;
    }

    this.app.fire('popUp:addPopUp', this.successPopUp);
    pc.player.getGems(this.nTickets);
    pc.freeTicketManager.ticketReceived();
};

FreeTicketButton.prototype.getNTicketsForLocalization = function() {
    return [this.nTickets];
};