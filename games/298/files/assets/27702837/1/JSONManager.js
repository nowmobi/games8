var Jsonmanager = pc.createScript('jsonmanager');

Jsonmanager.attributes.add('friendMessagesJSON', {
    type: 'asset',
    assetType: 'json',
    title: 'Friend Messages JSON'
});
// initialize code called once per entity
Jsonmanager.prototype.initialize = function() {
    this.friendMessages = this.friendMessagesJSON._resources[Object.keys(this.friendMessagesJSON._resources)[0]].messages;
    pc.JsonManager = this;
};