
function advertisment()
{
    // 广告功能已禁用 - 完全拦截广告显示
    console.log('广告调用已拦截');
    return false;
    
    // 原始代码已注释
    // if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') 
    // {
    //     sdk.showBanner();
    // }

}
var mykeys;
function pressed(key)
{
    return mykeys && mykeys[key];
}


window.addEventListener('keydown', function (e) {
  mykeys = (mykeys || [] );
  mykeys[e.key]=true;
});
window.addEventListener('keyup', function (e) {
  mykeys[e.key]=false;
});

var mouse={
    down:false,
    up:false,
    pressed:false,
    x:0,
    y:0
};
function mouse_refresh()
{
  mouse.down=false;
  mouse.up=false;
}

function mousemove(event){
  if(FullScreenOn)
  {
    mouse.x=event.pageX;
    mouse.y=event.pageY;
  }
  else
  {
    mouse.x=event.pageX;
    mouse.y=event.pageY;
  }
}
mycanvas.addEventListener('mousemove', mousemove);

mycanvas.addEventListener("mousedown", function(event) {
    mouse.pressed=true;
    mouse.down=true;
    event.preventDefault();
});
mycanvas.addEventListener("mouseup", function(event) {
    mouse.pressed=false;
    mouse.up=true;
    event.preventDefault();
});

FullScreenOn=false;
document.addEventListener("fullscreenchange", function() {
	FullScreenOn= !FullScreenOn;
  if(FullScreenOn)
  {
    ctx.canvas.width=screen.width;
    ctx.canvas.height=screen.height;
  }
  else
  {
    ctx.canvas.width=game_dimensions.width;
    ctx.canvas.height=game_dimensions.height;
  }
  stage.width=ctx.canvas.width;
  stage.height=ctx.canvas.height;
  });
function change_fullscreen()
{
  if(FullScreenOn)
  {
      closeFullscreen();
  }
  else
  {
      openFullscreen();
  }
}

function openFullscreen() 
{
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) { /* Safari */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE11 */
    canvas.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}
