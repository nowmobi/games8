(function() {
    pc.player = {};

    // Set default values
    pc.player.coins = 0;
    pc.player.gems = 0;
    pc.player.exp = 0;
    pc.player.highscore = 0;
    pc.player.lvl = 1;
    pc.player.uniqueID = 0;
    pc.player.name = '';
    pc.player.expBarRatio = 0;
    pc.player.app = pc.Application.getApplication();
    pc.player.entry = null;
    pc.player.statNames = ['exp', 'coins', 'gems'];

    // -------------------------------------------------------
    // Coins
    // -------------------------------------------------------

    pc.player.isBuyableCoin = function(value) {
        return this.coins + pc.gameManager.coinCointer >= value;
    };

    pc.player.getCoins = function(value) {
        if (value <= 0) {
            return;
        }

        pc.wrapper.incrementStats({
            coins: value
        }, function(stats) {
            if (typeof stats === 'string') {
                this.coins += Number(value);
            } else {
                this.coins = stats.coins;
            }

            this.app.fire('player:updateCoins', this.coins);
        }, this);
    };

    pc.player.payCoins = function(value) {
        if (value <= 0) {
            return false;
        }

        if (this.isBuyableCoin(value)) {
            pc.wrapper.incrementStats({
                coins: -value
            }, function(stats) {
                if (typeof stats === 'string') {
                    this.coins -= value;
                } else {
                    this.coins = stats.coins;
                }

                this.app.fire('player:updateCoins', this.coins);
                this.app.fire('gameManager:updateCoinContainer', pc.gameManager.coinCointer);
            }, this);
            return true;
        }

        return false;
    };

    // -------------------------------------------------------
    // Gems
    // -------------------------------------------------------

    pc.player.isBuyableGems = function(value) {
        return this.gems >= value;
    };

    pc.player.getGems = function(value) {
        if (value <= 0) {
            return;
        }

        pc.wrapper.incrementStats({
            gems: value
        }, function(stats) {
            if (typeof stats === 'string') {
                this.gems += value;
            } else {
                this.gems = stats.gems;
            }

            this.app.fire('player:updateGems', this.gems);
        }, this);
    };

    pc.player.getTotalGems = function() {
        return this.gems;
    };

    pc.player.payGems = function(value) {
        if (value <= 0) {
            return false;
        }

        if (this.isBuyableGems(value)) {
            this.gems -= value;


            pc.wrapper.incrementStats({
                gems: -value
            }, function(stats) {
                if (typeof stats === 'string') {} else {
                    this.gems = stats.gems;
                }

                this.app.fire('player:updateGems', this.gems);
            }, this);
            return true;
        }

        return false;
    };

    // -------------------------------------------------------
    // Highscore
    // -------------------------------------------------------

    pc.player.updateHighscore = function(value) {
        if (this.highscore >= value) {
            return;
        }

        this.highscore = value;
        if (this.name.length > 0) {
            pc.wrapper.setScore(this.highscore);
        } else {}


        this.app.fire('player:updateHighscore', this.highscore);
    };

    // -------------------------------------------------------
    // Exp
    // -------------------------------------------------------

    pc.player.doCalculateLevel = function(startUp) {
        if (this.calculateLevel()) {
            if (!startUp) {
                this.app.fire('Audio:LevelUp');
                if (!this.levelUpPopUp) {
                    this.levelUpPopUp = this.app.root.findByTag('LevelUpPopUp')[0];
                }

                var reward = this.getLevelReward();

                this.getCoins(reward);

                this.levelUpPopUp.script.levelUpdialog.setReward(reward);
                this.app.fire('popUp:addPopUp', this.levelUpPopUp);
            }
        }
    };

    pc.player.getLevelReward = function() {
        if (!this.expData) {
            this.expData = pc.player.app.assets.find("experienceData").resource.exp;
        }

        var rewardData = this.expData[this.lvl - 1];

        if (rewardData) {
            return rewardData.reward;
        } else {
            return 0;
        }
    };

    pc.player.calculateLevel = function() {
        var levelUp = false;

        if (!this.expData) {
            this.expData = pc.player.app.assets.find("experienceData").resource.exp;
        }

        if (!this.exp) {
            this.exp = 0;
        }

        if (isNaN(this.exp)) {
            this.exp = 0;
        }

        if (this.exp < 0) {
            this.exp = 0;
        }

        do {
            // If the next data does not exist, max lvl is reached
            if (!this.expData[this.lvl]) {
                this.expBarRatio = 1;
                break;
            }

            // Add level is current exp is higher than expRequired
            if (this.exp >= this.expData[this.lvl].expRequired) {
                this.lvl += 1;
                levelUp = true;
            } else {
                this.expBarRatio = (this.exp - this.expData[this.lvl - 1].expRequired) / (this.expData[this.lvl].expRequired - this.expData[this.lvl - 1].expRequired);
                break;
            }
        } while (true);

        this.app.fire("player:updateExp", this.lvl, this.expData[this.lvl - 1].nameKey, this.expBarRatio);

        return levelUp;
    };

    pc.player.addExp = function(value) {
        var self = this;

        pc.wrapper.incrementStats({
            exp: value
        }, function(stats) {
            if (typeof stats === 'string') {
                self.exp += value;
            } else {
                self.exp = stats.exp;
            }

            self.doCalculateLevel();
        }, self);
    };

    // -------------------------------------------------------
    // Data methods
    // -------------------------------------------------------

    pc.player.setData = function(stats) {
        this.setScore(stats.highscore);
        this.setStats(stats);
        this.setName(stats.name);
        this.setUniqueID(stats.uniqueID);
        this.setTutorial(stats.tutorial);

    };

    pc.player.setOldData = function(stats) {
        pc.wrapper.incrementStats({
            coins: stats.coins || 0,
            gems: stats.gems || 0,
            exp: stats.exp || 0
        }, this.setStats, this);
    };

    pc.player.setStats = function(stats) {
        this.coins = stats.coins || 0;
        this.gems = stats.gems || 0;
        this.exp = stats.exp || 0;

        if (this.coins < 0) {
            this.coins = 0;
            pc.wrapper.setData({
                coins: 0
            });
        }

        this.app.fire('player:updateCoins', this.coins);
        this.app.fire('player:updateGems', this.gems);

        this.doCalculateLevel(true);
    };

    pc.player.setScore = function(score) {
        this.highscore = score || 0;
    };

    pc.player.updateStats = function(data) {
        var statsToUpdate = {};

        for (var i = 0; i < this.statNames.length; i += 1) {

            this.checkStatUpdateViable(data, this.statNames[i], statsToUpdate);
        }

        pc.wrapper.incrementStats(statsToUpdate, function(stats) {
            if (typeof stats === 'string') {
                this.exp += statsToUpdate.exp || 0;
                this.coins += statsToUpdate.coins || 0;
                this.gems += statsToUpdate.gems || 0;
                this.doCalculateLevel();
                this.app.fire('player:updateCoins', this.coins);
                this.app.fire('player:updateGems', this.gems);
            } else {
                if (typeof stats.coins === 'number') {
                    this.coins = stats.coins;
                    this.app.fire('player:updateCoins', this.coins);
                }

                if (stats.exp) {
                    this.exp = stats.exp;
                    this.doCalculateLevel();
                }

                if (stats.gems) {
                    this.gems = stats.gems;
                    this.app.fire('player:updateGems', this.gems);
                }

            }
        }, this);
    };

    pc.player.checkStatUpdateViable = function(data, typeName, statsToUpdate) {
        if (data[typeName]) {
            if (data[typeName] > 0) {
                statsToUpdate[typeName] = data[typeName];
            }
        }
    };

    pc.player.setTutorial = function(value) {
        this.tutorialFinished = value;

        if (!value) {
            pc.gameManager.setTutorial();
        }
    };

    pc.player.saveTutorialCompleted = function() {
        if (!this.tutorialFinished) {
            pc.wrapper.setData({
                tutorial: true
            });
            this.tutorialFinished = true;
        }
    };

    pc.player.setName = function(name, firstTime) {
        var oldName = pc.player.name;
        pc.player.name = name;

        if (!firstTime) {
            pc.player.app.fire("PlayerStatsManager:updateEntry", pc.player.getUniqueID(), pc.player.name, pc.player.highscore, oldName);
        }
    };

    pc.player.setUniqueID = function(id) {

        if (isNaN(id) || id <= 0) {
            pc.fetch.createEntry(function(body) {
                this.uniqueID = body.id;

                pc.wrapper.setData({
                    uniqueID: this.uniqueID
                });

                this.fetchEntry();
            }, this);
        } else {
            this.uniqueID = id;
            this.fetchEntry();
        }
    };

    pc.player.fetchEntry = function() {
        //pc.fetch.getEntry(this.uniqueID, this.setEntry, this);
    };

    pc.player.setEntry = function(entry) {
        console.warn(entry)
        this.entry = entry;
    };

    pc.player.getUniqueID = function() {
        return this.uniqueID;
    };

    pc.player.app.on('StorageManager:onLoadSaveData', pc.player.setData, pc.player);
})();