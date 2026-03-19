var sound_on=false;



var birds = document.createElement("audio");
birds.src = "Sounds/birds.mp3";
birds.setAttribute("preload", "auto");
birds.setAttribute("controls", "none");
birds.style.display = "none";
birds.volume=1;
// document.body.appendChild(birds);
function bird_play_pause()
{
    if(sound_on)
    {
    birds.pause();
    }
    else
    {
    birds.play();
    }
}
birds.addEventListener("ended", function(){
    birds.play();
});
function birds_mute()
{
    if(birds.volume>0)
    {
        birds.volume-=0.1;
    }
}
function birds_unmute()
{
    if(birds.volume<1)
    {
        birds.volume+=0.1;
    }
}

var kick = document.createElement("audio");
kick.src = "Sounds/Kick.mp3";
kick.setAttribute("preload", "auto");
kick.setAttribute("controls", "none");
kick.style.display = "none";
function kick_play()
{
    if(sound_on)
    {
        kick.play();
    }
}



var next_level = document.createElement("audio");
next_level.src = "Sounds/NextStage.mp3";
next_level.setAttribute("preload", "auto");
next_level.setAttribute("controls", "none");
next_level.style.display = "none";
next_level.volume=0.2;
function next_level_play()
{
    if(sound_on)
    {
        next_level.play();
    }
}




var rain_sound = document.createElement("audio");
rain_sound.src = "Sounds/rain.mp3";
rain_sound.setAttribute("preload", "auto");
rain_sound.setAttribute("controls", "none");
rain_sound.style.display = "none";
rain_sound.volume=0;
// document.body.appendChild(birds);
function rain_sound_play_pause()
{
    if(sound_on)
    {
    rain_sound.pause();
    }
    else
    {
    rain_sound.play();
    }
}
rain_sound.addEventListener("ended", function(){
    rain_sound.play();
});
function rain_sound_mute()
{
    if(rain_sound.volume>0)
    {
        rain_sound.volume-=0.1;
    }
}
function rain_sound_unmute()
{
    if(rain_sound.volume<1)
    {
        rain_sound.volume+=0.1;
    }
}


var touch_down = document.createElement("audio");
touch_down.src = "Sounds/touch_down.mp3";
touch_down.setAttribute("preload", "auto");
touch_down.setAttribute("controls", "none");
touch_down.style.display = "none";
function touch_down_play()
{
    if(sound_on)
    {
        touch_down.play();
    }
}


var click = document.createElement("audio");
click.src = "Sounds/click.mp3";
click.setAttribute("preload", "auto");
click.setAttribute("controls", "none");
click.style.display = "none";
function click_play()
{
    if(sound_on)
    {
        click.play();
    }
}

function play_pause()
{
    rain_sound_play_pause();
    bird_play_pause();
    sound_on= !sound_on;
}
var ads_ready=false;
var time_to_ad=50*30;
var on_ad=false;
var prev_sound_on_value;