
var FB_PREFIX = "<facebook>";

var FB_Leaderboard= 'big_snakes';

var isFBInstSDKReady = false;
var fbData = {};

var isFriendInvited = false;

var challengeImgData = "";
var defeatImgData = "";
var inviteImgData = "";
var tryagainImgData = "";
var entryData = null;

var isDefeatContextPosted = false;
var isSessionDataSent = false;
var supportedAPIs;

var friendsLB = [];

var scoreToBeat = 0;

var lbType = 0;




function onFBStart() {
  FBInstant.initializeAsync().then(function() {

    supportedAPIs = FBInstant.getSupportedAPIs();

    isFBInstSDKReady = true;
    console.log(FB_PREFIX + "SDK Ready");

    


    //FBInstant.setLoadingProgress(50);

    //F

    //FBInstant.startGameAsync().then(function() {
      //console.log("Assets loaded");
             
    //});
  });
}

function updateFBProgress(progress)
{
  FBInstant.setLoadingProgress(progress);
}
function updateFBAssetsLoaded() {

  FBInstant.startGameAsync().then(function() {
    console.log(FB_PREFIX + "Game loaded");
    console.log(FBInstant.player);

    



    entryData = FBInstant.getEntryPointData();



    /*
    entryData = {};
    entryData['name'] = 'Rana';
    entryData['score'] = '64';
    entryData['pic_url'] = 'https://platform-lookaside.fbsbx.com/platform/instantgames/profile_pic.jpg?igpid=1718832638217312&height=256&width=256&ext=1545828981&hash=AeR9TpPBxW1zhuD1';
    */

    console.log(entryData);
    //console.log(FBInstant.getEntryPointData());


    fbData.profile = {};
    fbData.profile.name = FBInstant.player.getName();
    fbData.profile.pic = FBInstant.player.getPhoto();
    fbData.profile.gameid = FBInstant.player.getID();



    fbData.contextId = FBInstant.context.getID();
    fbData.contextType = FBInstant.context.getType();
    
    getFriendsLBData();


    

    console.log("<context id>"+fbData.contextId);
    console.log("<context type>"+fbData.contextType);

    document.getElementById('header').style.display  = "block";
    document.getElementById('name').innerHTML  = fbData.profile.name;

    getMyFBCloudData();
    //console.log(FB_PREFIX + fbData.profile.name);
    //console.log(FB_PREFIX + fbData.profile.pic);
    //console.log(FB_PREFIX + fbData.profile.gameid);
    document.getElementById("pic").src = fbData.profile.pic;

    if(myName == null || myName == "")
    {
      myName = fbData.profile.name;
      sessionStorage.setItem(PREFIX +"name",myName);
      document.getElementById("yourname").value = myName;
    }
  });
}
function getMyFBCloudData()
{
	FBInstant.player
	.getDataAsync(['score'])
	.then(function(data) {
		var score = data['score'];
		console.log(FB_PREFIX +score);
		if(score == undefined || score == null)
		{
			score = 0;
			updateMyCloudData(score);
		}
		fbData.profile.score = score;
		myLongestLength = fbData.profile.score;
    if(isGameLoaded)
    {
      MenuScene.myLongestLength.text = myLongestLength;
    }
	});

}
function updateMyCloudData(score)
{
	FBInstant.player
	.setDataAsync({
		score: score
	})
	.then(function() {
	    console.log('data is set');
	});
}

function selectContext() {
  FBInstant.context.chooseAsync().then(function() {
    startGame();          
  })
}


//------------ SOCIAL
function ShareOnFacebook(message)
{
  var canvas = document.getElementsByTagName("canvas")[0];
  FBInstant.shareAsync({
    intent: 'SHARE',
    image: base64Picture,
    text: message,
    data: { myReplayData: '...' },
  })
  .then(function() 
  {

  });
}

function InviteOnFacebook(message,intent)
{
  console.log(FB_PREFIX +"invite called");
  FBInstant.shareAsync({
    intent: intent,
    image: base64Picture,
    text: message,
    data: { myReplayData: '...' },
  })
  .then(function() 
  {
  });

}

// LEADERBOARD ----
// ----------------
// ----------------
function getFriendsLBData()
{
  friendsLB = [];
  FBInstant
  .getLeaderboardAsync(FB_Leaderboard)
  .then(leaderboard => leaderboard.getConnectedPlayerEntriesAsync(25, 0))
  .then(function(entries){
    console.log(entries);
    friendsLB = entries;
  })

}

function onScoreToBeatUpdate(score)
{
  var challengeFound = false;
  friendsLB.forEach(function(entry) {
    if(!challengeFound)
    {
      if(entry.getPlayer().getName() != fbData.profile.name)
      {
        if(score < entry.getFormattedScore())
        {
          scoreToBeat = entry.getFormattedScore();
          challengeFound = true;
          document.getElementById('welcome').innerHTML  = 'Beat '+entry.getPlayer().getName();
          document.getElementById('name').innerHTML  = 'Length ' +(entry.getFormattedScore() - score);
          document.getElementById('pic').src  = entry.getPlayer().getPhoto();
        }
      }
    }
  });

  if(!challengeFound)
  {
    scoreToBeat = -1;
    document.getElementById('welcome').innerHTML  = 'Champion '+fbData.profile.name;
    document.getElementById('name').innerHTML  = 'Length ' +score;
    document.getElementById('pic').src  = fbData.profile.pic;
  }
}

function getFBLeaderboard()
{
  document.getElementById("leaderboard_frame").style.display = "block";
  var lbContent = document.getElementById("leaderboard_content");
  lbContent.innerHTML = '';
  if(!isFBInstSDKReady)
    return;
  if(lbType == 0)
  {
    FBInstant
    .getLeaderboardAsync(FB_Leaderboard)
    .then(leaderboard => leaderboard.getEntriesAsync(25, 0))
    .then(function(entries){
      populateLeaderboard(entries);
    })
    .catch(error => console.error(error));

  }
  else
  {
    FBInstant
    .getLeaderboardAsync(FB_Leaderboard)
    .then(leaderboard => leaderboard.getConnectedPlayerEntriesAsync(25, 0))
    .then(function(entries){
      populateLeaderboard(entries);
    })
    .catch(error => console.error(error));
  }
  
}

function updateFbLeaderboard(score)
{
  FBInstant
  .getLeaderboardAsync(FB_Leaderboard)
  .then(leaderboard => {
    return leaderboard.setScoreAsync(score);
  })
  .then(() => console.log('Score saved'))
  .catch(error => console.error(error));
}

function populateLeaderboard(entries)
{
  var lbContent = document.getElementById("leaderboard_content");
  lbContent.innerHTML = '';
  var addHtml = '<ul>';
  entries.forEach(function(entry) {
    addHtml = addHtml + '<li>'+
                '<div class="graphic"><img src="'+entry.getPlayer().getPhoto()+'" alt=""></div>'+
                '<div class="name"><span class="header">'+entry.getPlayer().getName()+'</span><span class="stat">'+entry.getFormattedScore()+'</span><span class="sub">units</span></div>'+
              '</li>';
  });
  addHtml = addHtml + '</ul>';
  lbContent.innerHTML = addHtml;
}
function closeFBLeaderboard()
{
	document.getElementById("leaderboard_frame").style.display = "none";
	var lbContent = document.getElementById("leaderboard_content");
	lbContent.innerHTML = '';
}



function grabInviteImage()
{
  toDataURL(
    'invite.png',fbData.profile.name,'',
    function(dataUrl) {
      inviteImgData = dataUrl;
      sendInvite();
    });
}
function sendInvite()
{
  if(fbData.contextId == null && !isFriendInvited)
  {
    FBInstant.context.chooseAsync().then(function (result) {
      FBInstant.updateAsync({
        action: 'CUSTOM',
        intent: 'INVITE',
        cta: 'Play Now',
        template: "biggest_snake",
        image: inviteImgData, 
        text: "Help " +fbData.profile.name+ " by playing the game",
        data: {
        },
        strategy: 'IMMEDIATE',
        notification: 'NO_PUSH'
      }).then(function () {
        console.log("Invite Sent");
        isFriendInvited = true;
        ResumeGame();
      });
    }).catch(function (err) {
      if(isGameStarted)
        GameHudScene.onResumeTimeResumed();
    });
  }
  else
  {
    if(isGameStarted)
        GameHudScene.onResumeTimeResumed();
  }
  
}

function grabChallengeImage()
{
  toDataURL(
    'challenge.png',fbData.profile.name,fbData.profile.score,
    function(dataUrl) {
      challengeImgData = dataUrl;
      challengeYourFriend();
    });
}

function challengeYourFriend()
{
	FBInstant.context.chooseAsync().then(function (result) {
    FBInstant.updateAsync({
      action: 'CUSTOM',
      intent: 'CHALLENGE',
      cta: 'Beat Now!',
      template: "biggest_snake",
      image: challengeImgData, 
      text: "Is your snake bigger than mine, can you prove it?",
      data: {
          name: fbData.profile.name,
          score: fbData.profile.score,
          pic_url: fbData.profile.pic
      },
      strategy: 'IMMEDIATE',
      notification: 'NO_PUSH'
  }).then(function () {
 
  });
}).catch(function (err) {
  console.error(err);
});
}

function grabDefeatImage()
{
  toDataURL(
    'defeat.png',fbData.profile.name,myLastStrength,
    function(dataUrl) {
      defeatImgData = dataUrl;
      updateDefeatToFriend();
    });
}




function updateDefeatToFriend()
{
  if(isDefeatContextPosted)
    return;
  FBInstant.updateAsync({
      action: 'CUSTOM',
      intent: 'CHALLENGE',
      cta: 'Try Again',
      template: "biggest_snake",
      image: defeatImgData, 
      text: "I have defeated you",
      data: {
          name: fbData.profile.name,
          score: fbData.profile.score,
          pic_url: fbData.profile.pic
      },
      strategy: 'IMMEDIATE',
      notification: 'NO_PUSH'
  }).then(function () {
    console.log("<Defeat Context> Updated");
    isDefeatContextPosted = true;
  });
}

function grabTryAgainImage()
{
  toDataURL(
    'try_again.png',fbData.profile.name,myLastStrength,
    function(dataUrl) {
      tryagainImgData = dataUrl;
      updateTryAgainToFriend();
    });
}

function updateTryAgainToFriend()
{
  if(isDefeatContextPosted)
    return;
  FBInstant.updateAsync({
      action: 'CUSTOM',
      intent: 'CHALLENGE',
      cta: 'Try Again',
      template: "biggest_snake",
      image: tryagainImgData, 
      text: "I tried but got unlucky, next time i will win",
      data: {
          name: fbData.profile.name,
          score: fbData.profile.score,
          pic_url: fbData.profile.pic
      },
      strategy: 'IMMEDIATE',
      notification: 'NO_PUSH'
  }).then(function () {
    console.log("<Defeat Context> Updated");
    isDefeatContextPosted = true;
  });
}

//----------- MIX
function isLanguageSupported(langCode)
{
    var isSupported = false;
    switch(langCode)
    {
        case 'en_US':
        isSupported = true;
        break;

        case 'vi_VN':
        isSupported = true;
        break;

        case 'es_MX':
        isSupported = true;
        break;

        case 'es_ES':
        isSupported = true;
        break;

        case 'tl_PH':
        isSupported = true;
        break;

    }
    return isSupported;
}

function setLbtype(type)
{
  if(lbType == type)
    return;
  lbType = type;

  switch(lbType)
  {
    case 0:
    document.getElementById("lb_button_0").style.opacity = 1;
    document.getElementById("lb_button_1").style.opacity = 0.5;
    break;

    case 1:
    document.getElementById("lb_button_0").style.opacity = 0.5;
    document.getElementById("lb_button_1").style.opacity = 1;
    break;
  }
  getFBLeaderboard();
}




