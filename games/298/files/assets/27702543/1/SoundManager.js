var AudioManager = pc.createScript('audioManager');

//
// AudioManager - plays samples and music
//

// external usage:
//   Add sample: Uncomment, add use comment at end of line and use preload in editor
//   Use sample: create Audio event listener

pc.extend(AudioManager.prototype, {

    initialize: function() {

        pc.audioManager = this;

        this.soundPlayer = this.entity.addComponent("sound");
        this.soundPlayer.positional = false;
        this.activeMusicSlot = null;
        this.menuIsQueued = false;
        this.allowOverlap = false;

        // Volume configuration
        this.masterSampleVol = 0.75;
        this.masterGameVol = 1.0;
        this.masterPauseVol = 0;
        this.masterHomeVol = 0.65;
        this.mixDuration = 1.5;

        // Coin sample mechanisms
        this.comboDuration = 3;
        this.dtLastCoin = 0;
        this.coinCombo = 0;

        // Lerp variables
        this.currentVolume = 1.0;
        this.targetVolume = 1.0;
        this.dtVolumeMix = 0.0;

        this._canPlayMusic = true;
        this._canPlaySound = true;

        this.getSettings();

        this.samples = {

            // UNITY: $repo\Daybrook.unity\Assets\Game\Core\Audio
            // MP3 VBR 64 Kb/s || 96Kb/s - Joint Stereo

            //
            //     BGM
            //

            bgm_game: this.app.assets.find("bgm_game_96.mp3").id, // use
            bgm_menu: this.app.assets.find("bgm_menu_64.mp3").id, // use
            bgm_invincible: this.app.assets.find("bgm_invincible_64.mp3").id, // use
            bgm_results: this.app.assets.find("bgm_results.mp3").id, // use
            //bgm_flying     : this.app.assets.find("bgm_flying.mp3").id,

            //
            //     GUI
            //

            gui_back_button: this.app.assets.find("gui_back_button.mp3").id, // use
            gui_close_window: this.app.assets.find("gui_close_window.mp3").id, // use
            //gui_confetti_burst        :  this.app.assets.find("gui_confetti_burst.mp3").id,
            //gui_create_team           :  this.app.assets.find("gui_create_team.mp3").id,
            //gui_daily_reward_complete :  this.app.assets.find("gui_daily_reward_complete.mp3").id,
            gui_deflating_ball: this.app.assets.find("gui_deflating_ball.mp3").id, // use
            //gui_exchange              :  this.app.assets.find("gui_exchange.mp3").id,
            //gui_join_team             :  this.app.assets.find("gui_join_team.mp3").id,
            //gui_leave_team            :  this.app.assets.find("gui_leave_team.mp3").id,
            gui_level_up: this.app.assets.find("gui_level_up.mp3").id, // use
            //gui_locked                :  this.app.assets.find("gui_locked.mp3").id,
            gui_menu_in: this.app.assets.find("gui_menu_in.mp3").id, // use
            gui_menu_out: this.app.assets.find("gui_menu_out.mp3").id, // use
            //gui_message_received      :  this.app.assets.find("gui_message_received.mp3").id,
            gui_message_sent: this.app.assets.find("gui_message_sent.mp3").id, // use
            gui_panel_slam: this.app.assets.find("gui_panel_slam.mp3").id, // use
            gui_press_button: this.app.assets.find("gui_press_button.mp3").id, // use
            gui_press_button_02: this.app.assets.find("gui_press_button_02.mp3").id, // use
            //gui_ratchet_heavy_04      :  this.app.assets.find("gui_ratchet_heavy_04.mp3").id,
            //gui_receive_coins         :  this.app.assets.find("gui_receive_coins.mp3").id,
            //gui_save_me_screen        :  this.app.assets.find("gui_save_me_screen.mp3").id,
            //gui_settings_toggle       :  this.app.assets.find("gui_settings_toggle.mp3").id,
            //gui_spend_cash            :  this.app.assets.find("gui_spend_cash.mp3").id,
            gui_spend_coins: this.app.assets.find("gui_spend_coins.mp3").id, // use
            //gui_spend_token           :  this.app.assets.find("gui_spend_token.mp3").id,
            //gui_unlocked              :  this.app.assets.find("gui_unlocked.mp3").id,

            //
            //     HUD
            //

            //hud_coin_shower             :  this.app.assets.find("hud_coin_shower.mp3").id,
            hud_combo_multiplier: this.app.assets.find("hud_combo_multiplier.mp3").id, // use
            //hud_crowd_boo               :  this.app.assets.find("hud_crowd_boo.mp3").id,
            //hud_daily_challenge_in      :  this.app.assets.find("hud_daily_challenge_in.mp3").id,
            hud_end_game_whistle: this.app.assets.find("hud_end_game_whistle.mp3").id, // use
            //hud_end_tournament_beep_1a  :  this.app.assets.find("hud_end_tournament_beep_1a.mp3").id,
            hud_friends_score_beat: this.app.assets.find("hud_friends_score_beat.mp3").id, // use
            //hud_invincibility_finishing :  this.app.assets.find("hud_invincibility_finishing.mp3").id,
            hud_letter_challenge_in: this.app.assets.find("hud_letter_challenge_in.mp3").id,
            hud_multiplier_lost: this.app.assets.find("hud_multiplier_lost.mp3").id, // use
            //hud_pickup_coin             :  this.app.assets.find("hud_pickup_coin.mp3").id,
            //hud_pickup_coin_burst       :  this.app.assets.find("hud_pickup_coin_burst.mp3").id,
            //hud_pickup_coin_jump        :  this.app.assets.find("hud_pickup_coin_jump.mp3").id,
            hud_pickup_coin_multiplier: this.app.assets.find("hud_pickup_coin_multiplier.mp3").id, // use
            //hud_pickup_coin_ring        :  this.app.assets.find("hud_pickup_coin_ring.mp3").id,
            hud_pickup_goal_multiplier: this.app.assets.find("hud_pickup_goal_multiplier.mp3").id, // use
            //hud_pickup_gold_star        :  this.app.assets.find("hud_pickup_gold_star.mp3").id,
            hud_pickup_invincibility: this.app.assets.find("hud_pickup_invincibility.mp3").id, // use
            hud_pickup_letter: this.app.assets.find("hud_pickup_letter.mp3").id, // use
            hud_pickup_magnet: this.app.assets.find("hud_pickup_magnet.mp3").id, // use
            //hud_pickup_ticket           :  this.app.assets.find("hud_pickup_ticket.mp3").id,
            //hud_pickup_wingsuit         :  this.app.assets.find("hud_pickup_wingsuit.mp3").id,
            //hud_reveal_mystery_box      :  this.app.assets.find("hud_reveal_mystery_box.mp3").id,
            hud_start_game_whistle: this.app.assets.find("hud_start_game_whistle.mp3").id, // use
            //hud_use_start_boost         :  this.app.assets.find("hud_use_start_boost.mp3").id,

            //
            //     HUD - Items
            //

            //am_flavela_day         :  this.app.assets.find("am_flavela_day.mp3").id, // ?use
            //hud_beat_highscore     :  this.app.assets.find("BeatenHighScore.mp3").id,
            //hud_camera             :  this.app.assets.find("Camera.mp3").id,
            hud_pickup_coinbag: this.app.assets.find("CoinBagPickup.mp3").id, // use
            //hud_pickup_coin_high   :  this.app.assets.find("CoinPickupHigh.mp3").id, // use
            //hud_pickup_coin_low    :  this.app.assets.find("CoinPickupLow.mp3").id,
            hud_pickup_coin_mid: this.app.assets.find("CoinPickupMid.mp3").id, // use
            //hud_coin_purchase      :  this.app.assets.find("CoinsPurchased.mp3").id,
            //hud_coin_spent         :  this.app.assets.find("CoinsSpent.mp3").id,
            //hud_gems_purchased     :  this.app.assets.find("GemsPurchased.mp3").id,
            //hud_gems_spent         :  this.app.assets.find("GemsSpent.mp3").id,
            hud_magnet_loop: this.app.assets.find("MagnetLoop.mp3").id, // use
            //hud_rocket_boost_loop  :  this.app.assets.find("RocketBoostLoop.mp3").id,
            //hud_rocket_boost_start :  this.app.assets.find("RocketBoostStart.mp3").id,
            //hud_score_count_loop   :  this.app.assets.find("ScoreCountLoop.mp3").id,
            //hud_score_count_start  :  this.app.assets.find("ScoreCountStart.mp3").id,

            //
            //     Impact
            //

            //im_ball_hits_bicycle              :  this.app.assets.find("im_ball_hits_bicycle.mp3").id,
            im_ball_hits_billboard: this.app.assets.find("im_ball_hits_billboard.mp3").id, // use
            im_ball_hits_crates: this.app.assets.find("im_ball_hits_crates.mp3").id, // use
            im_ball_hits_fence: this.app.assets.find("im_ball_hits_fence.mp3").id, // use
            im_ball_hits_hot_dog_cart: this.app.assets.find("im_ball_hits_hot_dog_cart.mp3").id, // use
            im_ball_hits_ladder: this.app.assets.find("im_ball_hits_ladder.mp3").id, // use
            im_ball_hits_satellite_dish: this.app.assets.find("im_ball_hits_satellite_dish.mp3").id, // use
            //im_ball_hits_table_chairs         :  this.app.assets.find("im_ball_hits_table_chairs.mp3").id,
            im_ball_hits_target: this.app.assets.find("im_ball_hits_target.mp3").id, // use
            im_ball_hits_transformer: this.app.assets.find("im_ball_hits_transformer.mp3").id, // use
            //im_ball_hits_van_boxes            :  this.app.assets.find("im_ball_hits_van_boxes.mp3").id,
            //im_ball_hits_washing_line_crates  :  this.app.assets.find("im_ball_hits_washing_line_crates.mp3").id,
            im_ball_hits_wheelie_bins: this.app.assets.find("im_ball_hits_wheelie_bins.mp3").id, // use
            im_ball_hits_wood_brick_stall: this.app.assets.find("im_ball_hits_wood_brick_stall.mp3").id, // use
            im_ball_hits_wood_metal_stall: this.app.assets.find("im_ball_hits_wood_metal_stall.mp3").id, // use
            //im_ball_hits_wood_planks          :  this.app.assets.find("im_ball_hits_wood_planks.mp3").id,
            //im_billboard_hits_ground          :  this.app.assets.find("im_billboard_hits_ground.mp3").id,
            //im_fence_hits_ground              :  this.app.assets.find("im_fence_hits_ground.mp3").id,
            im_ladder_hits_roof: this.app.assets.find("im_ladder_hits_roof.mp3").id, // use
            //im_wood_brick_stall_hits_ground   :  this.app.assets.find("im_wood_brick_stall_hits_ground.mp3").id,
            //im_wood_metal_stall_hits_ground   :  this.app.assets.find("im_wood_metal_stall_hits_ground.mp3").id,
            //im_wood_planks_hits_ground        :  this.app.assets.find("im_wood_planks_hits_ground.mp3").id,
            //un_dynamite                       :  this.app.assets.find("un_Dynamite.mp3").id,
            un_generic_collision: this.app.assets.find("un_GenericCollision.mp3").id, // use
            //un_plant_obstacle                 :  this.app.assets.find("un_PlantObstacle.mp3").id,
            //un_stone_obstacle                 :  this.app.assets.find("un_StoneObstacle.mp3").id,
            //un_wooden_obstacle                :  this.app.assets.find("un_WoodenObstacle.mp3").id,

            //
            //  Obstacles
            //

            en_running: this.app.assets.find("en_running.mp3").id, // use
            en_slide: this.app.assets.find("en_slide.mp3").id, // use
            en_tackle: this.app.assets.find("en_tackle.mp3").id, // use
            ob_car_02: this.app.assets.find("ob_car_02.mp3").id, // use
            ob_car_04: this.app.assets.find("ob_car_04.mp3").id, // use
            //ob_lawnmower_01   :  this.app.assets.find("ob_lawnmower_01.mp3").id,
            ob_lorry_03: this.app.assets.find("ob_lorry_03.mp3").id, // use
            ob_train_01: this.app.assets.find("ob_train_01.mp3").id, // use
            ob_tram_02: this.app.assets.find("ob_tram_02.mp3").id, // use
            //un_truck_horn     :  this.app.assets.find("un_TruckHorn.mp3").id,

            //
            //  Player & Ball
            //

            cs_ball_hits_wall: this.app.assets.find("cs_ball_hits_wall.mp3").id, // use
            //cs_cheer              :  this.app.assets.find("cs_cheer.mp3").id,
            cs_control_fb_foot: this.app.assets.find("cs_control_fb_foot.mp3").id, // use
            cs_fb_bounce: this.app.assets.find("cs_fb_bounce.mp3").id, // use
            //cs_fb_kick            :  this.app.assets.find("cs_fb_kick.mp3").id,
            cs_jump: this.app.assets.find("cs_jump.mp3").id, // use
            cs_land: this.app.assets.find("cs_land.mp3").id, // use
            cs_yeah_01: this.app.assets.find("cs_yeah_01.mp3").id, // use
            //pl_celeb1_land_metal  :  this.app.assets.find("pl_celeb1_land_metal.mp3").id,
            //pl_celeb1_land_rail   :  this.app.assets.find("pl_celeb1_land_rail.mp3").id,
            //pl_crash_game_over    :  this.app.assets.find("pl_crash_game_over.mp3").id,
            pl_jump: this.app.assets.find("pl_jump.mp3").id, // use
            pl_kick_hard: this.app.assets.find("pl_kick_hard.mp3").id, // use
            pl_kick_soft: this.app.assets.find("pl_kick_soft.mp3").id, // use
            pl_land: this.app.assets.find("pl_land.mp3").id, // use?
            //pl_land_metal         :  this.app.assets.find("pl_land_metal.mp3").id,
            //pl_land_wood          :  this.app.assets.find("pl_land_wood.mp3").id,
            //pl_lane_bounce        :  this.app.assets.find("pl_lane_bounce.mp3").id,
            pl_lane_swap: this.app.assets.find("pl_lane_swap.mp3").id, // use
            //pl_pete_take_picture  :  this.app.assets.find("pl_pete_take_picture.mp3").id,
            //pl_roll               :  this.app.assets.find("pl_roll.mp3").id,
            //pl_run_01             :  this.app.assets.find("pl_run_01.mp3").id,
            //pl_run_02             :  this.app.assets.find("pl_run_02.mp3").id,
            //pl_run_03             :  this.app.assets.find("pl_run_03.mp3").id,
            //pl_run_04             :  this.app.assets.find("pl_run_04.mp3").id,
            //pl_run_05             :  this.app.assets.find("pl_run_05.mp3").id,
            //pl_run_06             :  this.app.assets.find("pl_run_06.mp3").id,
            //pl_run_metal_01       :  this.app.assets.find("pl_run_metal_01.mp3").id,
            //pl_run_metal_02       :  this.app.assets.find("pl_run_metal_02.mp3").id,
            //pl_run_metal_03       :  this.app.assets.find("pl_run_metal_03.mp3").id,
            //pl_run_metal_04       :  this.app.assets.find("pl_run_metal_04.mp3").id,
            //pl_run_metal_05       :  this.app.assets.find("pl_run_metal_05.mp3").id,
            //pl_run_metal_06       :  this.app.assets.find("pl_run_metal_06.mp3").id,
            //pl_run_wood_01        :  this.app.assets.find("pl_run_wood_01.mp3").id,
            //pl_run_wood_02        :  this.app.assets.find("pl_run_wood_02.mp3").id,
            //pl_run_wood_03        :  this.app.assets.find("pl_run_wood_03.mp3").id,
            //pl_run_wood_04        :  this.app.assets.find("pl_run_wood_04.mp3").id,
            //pl_run_wood_05        :  this.app.assets.find("pl_run_wood_05.mp3").id,
            //pl_run_wood_06        :  this.app.assets.find("pl_run_wood_06.mp3").id,
            pl_slam: this.app.assets.find("pl_slam.mp3").id, // use
            //pl_slam_asphalt       :  this.app.assets.find("pl_slam_asphalt.mp3").id,
            //pl_slam_metal         :  this.app.assets.find("pl_slam_metal.mp3").id,
            //pl_slam_rail          :  this.app.assets.find("pl_slam_rail.mp3").id,
            //pl_slam_wood          :  this.app.assets.find("pl_slam_wood.mp3").id,
            pl_slide: this.app.assets.find("pl_slide.mp3").id, // use
            //pl_super_jump         :  this.app.assets.find("pl_super_jump.mp3").id,
            pl_take_hit_01: this.app.assets.find("pl_take_hit_01.mp3").id, // use
            //pl_take_hit_02        :  this.app.assets.find("pl_take_hit_02.mp3").id,

        };

        //
        // Create soundPlayer slots
        //

        for (var key in this.samples) {

            this.samples[key] = this.soundPlayer.addSlot(key, {
                asset: this.samples[key],
                volume: this.masterSampleVol,
                pitch: 1.00,
                loop: false,
                overlap: this.allowOverlap,
                autoPlay: false
            });

            this.samples[key].load();
        }

        this.app.on('saveMe:continue', this.onSaveMeContinue, this);
        this.app.on('Audio:GotoHome', this.playMenuTheme, this);
        this.app.on('Audio:GotoGame', this.onStartGame, this);

        this.app.on('Audio:GameStart', function() {
            this.playSound(this.samples.hud_start_game_whistle);
        }, this);
        this.app.on('Audio:GameStart', function() {
            this.playSound(this.samples.cs_yeah_01);
        }, this);
        this.app.on('gameManager:gameOver', this.onSaveMeActivate, this);

        this.app.on('saveMeManager:postScreen', function() {
            this.playSound(this.samples.bgm_results);
        }, this);
        this.app.on('saveMeManager:postScreen', function() {
            this.playSound(this.samples.hud_end_game_whistle);
        }, this);
        this.app.on('saveMeManager:postScreen', this.stopMusic, this);


        //
        //  UI Samples
        //

        this.app.on('Audio:UIConfirm', function() {
            this.playSound(this.samples.gui_press_button);
        }, this);
        this.app.on('Audio:UICancel', function() {
            this.playSound(this.samples.gui_back_button);
        }, this);

        this.app.on('Audio:UIMenuEnter', function() {
            this.playSound(this.samples.gui_menu_in);
        }, this);
        this.app.on('Audio:UIMenuLeave', function() {
            this.playSound(this.samples.gui_menu_out);
        }, this);
        this.app.on('Audio:UIPopClose', function() {
            this.playSound(this.samples.gui_close_window);
        }, this);
        this.app.on('Audio:UITabSwitch', function() {
            this.playSound(this.samples.gui_press_button_02);
        }, this);

        this.app.on('button:openScreen', function() {
            this.playSound(this.samples.gui_menu_in);
        }, this);
        this.app.on('button:closeButton', function() {
            this.playSound(this.samples.gui_close_window);
        }, this);

        this.app.on('Audio:LevelUp', function() {
            this.playSound(this.samples.gui_level_up);
        }, this);
        this.app.on('challengeGameManager:sendChallenge', function() {
            this.playSound(this.samples.gui_message_sent);
        }, this);
        this.app.on('player:updateHighscore', function() {
            this.playSound(this.samples.hud_friends_score_beat);
        }, this);

        //
        //  HUD Samples
        //

        this.app.on('PauseButton:showPauseScreen', function() {
            this.playSound(this.samples.gui_menu_in);
        }, this);
        this.app.on('PauseScreenManager:onCancel', function() {
            this.playSound(this.samples.gui_back_button);
        }, this);
        this.app.on('pause:pause', this.setPause, this);

        this.app.on('Audio:LetterMenuIn', function() {
            this.playSound(this.samples.gui_menu_in);
        }, this);
        this.app.on('Audio:LetterMenuOut', function() {
            this.playSound(this.samples.gui_menu_out);
        }, this);
        this.app.on('Audio:LetterComplete', function() {
            this.playSound(this.samples.hud_letter_challenge_in);
        }, this);
        this.app.on('Audio:MultLost', function() {
            this.playSound(this.samples.hud_multiplier_lost);
        }, this);
        this.app.on('gameManager:yellowCard', function() {
            this.playSound(this.samples.un_generic_collision);
        }, this);

        this.app.on('scoreManager:multGain', function() {
            this.playSound(this.samples.hud_combo_multiplier);
        }, this);
        this.app.on('scoreManager:multReset', function() {
            this.playSound(this.samples.hud_multiplier_lost);
        }, this);

        //
        //  Player Samples
        //

        this.app.on('player:collision', function() {
            this.playSound(this.samples.pl_take_hit_01);
        }, this);
        this.app.on('player:collision', this.resetCoinCombo, this);
        this.app.on('player:switchLane', function() {
            this.playSound(this.samples.pl_lane_swap);
        }, this);
        this.app.on('player:Jump', function() {
            this.playSound(this.samples.pl_jump);
        }, this);
        this.app.on('player:Duck', function() {
            this.playSound(this.samples.pl_slide);
        }, this);
        this.app.on('player:Land', function() {
            this.playSound(this.samples.pl_land);
        }, this);
        this.app.on('player:Slam', function() {
            this.playSound(this.samples.pl_slam);
        }, this);

        //
        //  Ball Samples
        //

        this.app.on('Audio:BallKickFree', function() {
            this.playSound(this.samples.pl_kick_soft);
        }, this);
        this.app.on('Audio:BallKickTarget', function() {
            this.playSound(this.samples.pl_kick_hard);
        }, this);
        this.app.on('Audio:BallCollFloor', function() {
            this.playSound(this.samples.cs_fb_bounce);
        }, this);
        this.app.on('Audio:BallCollWall', function() {
            this.playSound(this.samples.cs_ball_hits_wall);
        }, this);
        this.app.on('Audio:BallPickup', function() {
            this.playSound(this.samples.cs_control_fb_foot);
        }, this);

        //
        //  Item Samples
        //

        //this.app.on('Audio:CollectCoin',           this.playCoinSample, this);
        this.app.on('Audio:CollectLoot', function() {
            this.playSound(this.samples.hud_pickup_coinbag);
        }, this);
        this.app.on('Audio:CollectLetter', function() {
            this.playSound(this.samples.hud_pickup_letter);
        }, this);

        this.app.on('gameManager:shieldState', this.setShieldAudio, this);
        this.app.on('gameManager:magnetState', this.setMagnetAudio, this);
        this.app.on('gameManager:doubleCoinState', this.setDoubleCoinAudio, this);
        this.app.on('gameManager:doubleTargetState', this.setDoubleTargetAudio, this);

        //
        //  Obstacle Samples
        //

        this.app.on('Audio:EnemySlide', function() {
            this.playSound(this.samples.en_slide);
        }, this);
        this.app.on('Audio:EnemyTackle', function() {
            this.playSound(this.samples.en_tackle);
        }, this);
        this.app.on('Audio:TramIncoming', function() {
            this.playTimeSample(this.samples.ob_tram_02);
        }, this);
        this.app.on('Audio:TramIncomingSide', function() {
            this.playTimeSample(this.samples.ob_train_01);
        }, this);
        this.app.on('Audio:CarIncoming', function() {
            this.playTimeSample(this.samples.ob_car_02);
        }, this);
        this.app.on('Audio:CarIncomingSide', function() {
            this.playTimeSample(this.samples.ob_car_04);
        }, this);
        this.app.on('Audio:HighwayIncomingSide', function() {
            this.playTimeSample(this.samples.ob_lorry_03);
        }, this);
        this.app.on('Audio:EnemyRunning', function() {
            this.playTimeSample(this.samples.en_running);
        }, this);

        //
        //  Bullseye Samples
        //

        this.app.on('Audio:BallHitBins', function() {
            this.playSound(this.samples.im_ball_hits_wheelie_bins);
        }, this);
        this.app.on('Audio:BallHitCrate', function() {
            this.playSound(this.samples.im_ball_hits_crates);
        }, this);
        this.app.on('Audio:BallHitLadder', function() {
            this.playSound(this.samples.im_ball_hits_ladder);
        }, this);
        this.app.on('Audio:BallHitFence', function() {
            this.playSound(this.samples.im_ball_hits_fence);
        }, this);
        this.app.on('Audio:BallHitCart', function() {
            this.playSound(this.samples.im_ball_hits_hot_dog_cart);
        }, this);
        this.app.on('Audio:BallHitStall', function() {
            this.playSound(this.samples.im_ball_hits_wood_brick_stall);
        }, this);
        this.app.on('Audio:BallHitTrain', function() {
            this.playSound(this.samples.im_ball_hits_wood_metal_stall);
        }, this);
        this.app.on('Audio:BallHitScaffold', function() {
            this.playSound(this.samples.im_ladder_hits_roof);
        }, this);
        this.app.on('Audio:BallHitSign', function() {
            this.playSound(this.samples.im_ball_hits_billboard);
        }, this);
        this.app.on('Audio:BallHitSatDish', function() {
            this.playSound(this.samples.im_ball_hits_satellite_dish);
        }, this);
        this.app.on('Audio:BallHitEngine', function() {
            this.playSound(this.samples.im_ball_hits_transformer);
        }, this);

        //
        // AudioContext OnResume handler (Needed because of browser audio protection)
        //

        this.audioContextInited = false;
        if (this.app.context._audioManager.context.state === 'suspended') {
            console.warn('AUDIOMANAGER: Context suspension detected, creating listener');
            if (this.app.touch) {
                this.app.touch.on(pc.EVENT_TOUCHSTART, this.onResumeContext, this);
                this.app.touch.on(pc.EVENT_TOUCHEND, this.onResumeContext, this);
            }

            if (this.app.mouse) {
                this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onResumeContext, this);
                this.app.mouse.on(pc.EVENT_MOUSEUP, this.onResumeContext, this);
            }

            this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onResumeContext, this);
        }

        // Start playing the menu music on startup
        this.app.on('removeOverlay', this.playMenuTheme, this);
        this.activeMusicSlot = this.samples.bgm_menu;
    },

    getSettings: function() {
        pc.wrapper.getData(['sound', 'music'], this.setSettings, this);
    },

    setSettings: function(data) {
        this._canPlayMusic = data.music;
        this._canPlaySound = data.sound;
    },

    update: function(dt) {

        this.dtLastCoin += dt * pc.gameManager.speed;
        this.dtVolumeMix += dt;
        this.currentVolume = pc.util.lerp(this.currentVolume, this.targetVolume, pc.util.clamp01(this.dtVolumeMix / this.mixDuration));
        this.activeMusicSlot.volume = pc.util.clamp01Approximate(this.currentVolume, 0.02);

        if (this.dtLastCoin > this.comboDuration) {
            this.dtLastCoin = 0;
            this.coinCombo = 0;
        }

    },

    setPause: function(value) {
        this.targetVolume = !!value ? this.masterPauseVol : this.masterGameVol;

        this.dtVolumeMix = 0.0;
    },

    //
    // Game events
    //

    onStartGame: function() {
        this.stopMusic();
        this.menuIsQueued = false;
        var ctx = this;
        setTimeout(function() {
            ctx.playGameTheme();
        }, 900);
    },

    onSaveMeContinue: function() {
        this.onStartGame();

        this.playSound(this.samples.gui_spend_coins);
        this.playSound(this.samples.cs_yeah_01);
        this.resetCoinCombo();
    },

    //
    // Game Music themes
    //

    queueMenuTheme: function() {
        var ctx = this;
        this.menuIsQueued = true;
        setTimeout(function() {
            if (ctx.menuIsQueued) ctx.playMenuTheme();
        }, 3600);
    },

    playGameTheme: function() {
        this.targetVolume = this.masterGameVol;
        this.playMusicTheme(this.samples.bgm_game, true);
    },

    playMenuTheme: function() {
        this.targetVolume = this.masterHomeVol;
        this.playMusicTheme(this.samples.bgm_menu, true);
    },

    playInvincibleTheme: function() {
        this.playMusicTheme(this.samples.bgm_invincible, true);
    },

    playMusicTheme: function(slot, applyFade) {

        this.menuIsQueued = false;

        if ((this.activeMusicSlot === slot) && this.activeMusicSlot.isPlaying) return;

        if (pc.util.DEBUG && !!!slot) {
            console.error('AUDIO: playMusicTheme is missing audio slot');
            return;
        }

        if (this.app.context._audioManager.context.state === 'suspended') {
            this.onResumeContext();
        }

        this.dtVolumeMix = applyFade ? 0.0 : this.mixDuration;
        this.currentVolume = applyFade ? this.currentVolume : this.targetVolume;

        if (!!this.activeMusicSlot) this.activeMusicSlot.stop();
        this.activeMusicSlot = slot;

        if (this.app.context._audioManager.context.state === 'suspended') {
            return;
        }

        if (!this._canPlayMusic) {
            return;
        }

        this.activeMusicSlot.volume = this.currentVolume;
        this.activeMusicSlot.loop = true;
        this.activeMusicSlot.play();
    },

    playSound: function(sample) {
        if (!this._canPlaySound) {
            return;
        }

        sample.play();
    },

    playTimeSample: function(sample, delayMs) {
        if (!this._canPlaySound) {
            return;
        }

        sample.pitch = 1.0 + Math.max(pc.gameManager.speed - 2.0, 0) / 8.0;
        sample.play();

        return;
        // setTimeout(function(){
        //     sample.pitch = 1.0 + Math.max(pc.gameManager.speed - 2.0, 0) / 8.0;
        //     sample.play();
        // }, Math.round(delayMs / (Math.max(pc.gameManager.speed - 1.0, 1) * 2.0)));
    },

    onSaveMeActivate: function() {

        this.stopMusic();
        for (var key in this.samples) {
            // Mute playing non-player samples
            if (this.samples[key].isPlaying && !pc.util.strHasWord(key, "pl_|en_|cs_|un_")) this.samples[key].stop();
        }

        this.playSound(this.samples.gui_deflating_ball);
    },

    stopMusic: function() {
        this.activeMusicSlot.stop();
    },

    onResumeContext: function() {

        this.app.context._audioManager.context.resume();

        setTimeout(function() {
            if (this.app.context._audioManager.context.state !== 'suspended') {
                if (this.activeMusicSlot && this._canPlayMusic) {
                    this.activeMusicSlot.volume = this.currentVolume;
                    this.activeMusicSlot.loop = true;
                    this.activeMusicSlot.play();
                }

                if (this.app.touch) {
                    this.app.touch.off(pc.EVENT_TOUCHSTART, this.onResumeContext, this);
                    this.app.touch.off(pc.EVENT_TOUCHEND, this.onResumeContext, this);
                }

                if (this.app.mouse) {
                    this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onResumeContext, this);
                    this.app.mouse.off(pc.EVENT_MOUSEUP, this.onResumeContext, this);
                }

                this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onResumeContext, this);
            }

        }.bind(this), 50);

    },

    //
    // Powerup & item audio states
    //

    setMagnetAudio: function(enable) {
        if (!!enable) {
            this.playSound(this.samples.hud_pickup_magnet);
            this.samples.hud_magnet_loop.loop = true;
            this.playSound(this.samples.hud_magnet_loop);
        } else this.samples.hud_magnet_loop.stop();
    },

    setShieldAudio: function(enable) {
        if (!!enable) {
            this.playSound(this.samples.hud_pickup_invincibility);
            this.playInvincibleTheme();
        } else this.playGameTheme();
    },

    setDoubleCoinAudio: function(enable) {
        if (!!enable) this.playSound(this.samples.hud_pickup_coin_multiplier);
        // Inform user on powerupend using audio?
    },

    setDoubleTargetAudio: function(enable) {
        if (!!enable) this.playSound(this.samples.hud_pickup_goal_multiplier);
        // Inform user on powerupend using audio?
    },

    //
    // Coin audio
    //

    playCoinSample: function() {
        this.coinCombo += 1;
        this.coinPitch = Math.min(1.0 + Math.pow(Math.max(this.coinCombo, 1), 0.058) - 1, 1.375); //1.125);

        this.samples.hud_pickup_coin_mid.overlap = true;
        this.samples.hud_pickup_coin_mid.pitch = this.coinPitch;
        this.playSound(this.samples.hud_pickup_coin_mid);

        this.dtLastCoin = 0;
    },

    resetCoinCombo: function() {
        this.dtLastCoin = 0;
        this.coinCombo = 0;
        this.coinPitch = 1.0;
    },

    mute: function() {
        this.app.systems.sound.volume = 0;
    },

    unmute: function() {
        this.app.systems.sound.volume = 1;
    },

    applySettings: function(key, value) {
        switch (key) {
            case 'music':
                this.setMusicSetting(value);
                break;

            case 'sound':
                this.setSoundSetting(value);
                break;
        }
    },

    getSetting: function(key) {
        switch (key) {
            case 'music':
                return this._canPlayMusic;

            case 'sound':
                return this._canPlaySound;
        }
    },

    setMusicSetting: function(value) {
        this._canPlayMusic = value;

        if (!this._canPlayMusic && this.activeMusicSlot) {
            this.activeMusicSlot.pause();
        } else if (this._canPlayMusic && this.activeMusicSlot) {
            this.playMusicTheme(this.activeMusicSlot);
        }

        pc.wrapper.setData({
            music: !!value
        });
    },

    setSoundSetting: function(value) {
        this._canPlaySound = value;

        pc.wrapper.setData({
            sound: !!value
        });
    },
});