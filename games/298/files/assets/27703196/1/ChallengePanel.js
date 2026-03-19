var ChallengePanel = pc.createScript('challengePanel');

//
//      ChallengePanel - manages fb-challenge UI on scoreEndFlow
//

pc.extend(ChallengePanel.prototype, {

    initialize: function() {

        this.panels = [];

        this.panelEntities = this.entity.findByTag('ChallengePanelEntry');
        this.panelInvite = this.entity.findByTag('PanelInvite')[0];

        this.setState(false);

        for (var i = 0; i < this.panelEntities.length; i += 1) {
            this.panels.push({
                bg: this.panelEntities[i].findByTag('PanelTab')[0],
                name: this.panelEntities[i].findByTag('PanelName')[0],
                rank: this.panelEntities[i].findByTag('PanelRank')[0],
                score: this.panelEntities[i].findByTag('PanelScore')[0],
                button: this.panelEntities[i].findByTag('PanelButton')[0].children[0],
                image: this.panelEntities[i].findByTag('PanelPhoto')[0],
            });
        }

        // this.colorWhite = new pc.Color(1, 1, 1, 1);
        // this.colorYellow = new pc.Color(0.9, 0.94, 0.275, 1);
        this.colorBlueDark = new pc.Color(0.058, 0.294, 0.376, 1);
        this.colorBlueLight = new pc.Color(0.164, 1, 0.964, 1);

        this.app.on('fbPool:FriendInfoReady', this.initPanels, this);
    },

    initPanels: function() {

        var players = pc.friendPool.getLocalTop3Friends();

        if ((players.length < 1) || (!!!players[0])) {
            return;
        }

        this.setState(true);

        for (var i = 0; i < Math.min(players.length, this.panels.length); i += 1) {
            this.setPanelInfo(this.panels[i], players[i]);
        }
    },

    setPanelInfo: function(panel, entry) {

        panel.name.script.textLocalization.setText(entry.name);

        if (entry.name.length > 14) {
            panel.name.element.fontSize /= 1.4;
            panel.name.element.lineHeight /= 1.4;
        }

        panel.rank.script.textLocalization.setText(entry.rank.toString());
        panel.score.script.textLocalization.setText(entry.score.toString());
        panel.image.script.photoStat.createImageFromURL(entry.image);

        panel.bg.element.color = entry.isPlayer ? this.colorBlueLight : this.colorBlueDark;
        panel.button.script.challengeButton.setState(!entry.isPlayer);
        panel.button.script.challengeButton.conPlayerId = entry.isPlayer ? '' : entry.id;
    },

    setState: function(enable) {

        for (var i = 0; i < this.panelEntities.length; i += 1) {
            this.panelEntities[i].enabled = !!enable;
        }

        if (this.panelInvite) this.panelInvite.enabled = !!!enable;
    }

});