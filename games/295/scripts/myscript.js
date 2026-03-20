
var ball_size=100;
var ball_weight=100;
var wind=0;
var goal=5;
var next_logo=new logo();
function drawPicture()
{
	// 广告显示检查已禁用
	// if(on_ad)
	// {
	// 	ctx.fillStyle="black";
	// 	ctx.fillRect(0,0,stage.width,stage.height);
	// }
	// else
	// {
		// 广告计时器已禁用，但保留逻辑以避免错误
		// if(ads_ready)
		// {
		// 	time_to_ad--;
		// }
		
		if(stage_change=="NEW")
		{
			level++;
			refresh_values();
			refresh_clouds();
			refresh_mountains();
			stage_change="NEW LOGO";
			time=0;
		}
		else if(stage_change=="WIN")
		{
			
			next_level_play();
			
			stage_change="WIN LOGO";
		}
		time++;
		ctx.clearRect(0,0,mycanvas.width,mycanvas.height);
		drawBackGround();
		drawBall();
		rain.draw();
		if(start)
		{
			drawLogo();
		}
		drawButtons();
		next_logo.draw(time);
		you_win.draw();
		cursor.draw();
		cursor.functionality();
		mouse_refresh();
	// }
}

function logo()
{
	this.draw=function(time)
	{
		
		if(time<=50 && stage_change=="NEW LOGO")
		{
			var value;
			if(time>20)
			{
				value=(50-time)/30;
			}
			else
			{
				value=1;
			}
            ctx.fillStyle= "rgba(0,0,0,"+value+")";
            ctx.fillRect(0,0,mycanvas.width,mycanvas.height);
			
			var valueX;
			if(time>=30)
			{
				valueX=(time-30)*(time-30)*mycanvas.height/800;
			}
			else
			{
				valueX=0;
			}
			ctx.drawImage(level_word,mycanvas.width/2-300,mycanvas.height/2-20-valueX-50);
			ctx.fillStyle="#fe3521";
			ctx.strokeStyle="#fe3521";
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			ctx.font="100px Arial";
			ctx.fillText(level,mycanvas.width/2,mycanvas.height/2+60+valueX);
			ctx.strokeText(level,mycanvas.width/2,mycanvas.height/2+60+valueX);
			ctx.fillStyle="#7f0000";
			ctx.strokeStyle="#7f0000";
			ctx.fillText(level,mycanvas.width/2-4,mycanvas.height/2+60+valueX+4);
			ctx.strokeText(level,mycanvas.width/2-4,mycanvas.height/2+60+valueX+4);
			if(rainy_weather)
			{
				rain_sound.volume=time/50;
			}
			else
			{
				birds.volume=time/50;
			}
		}
		else if(time==51 && stage_change=="NEW LOGO")
		{
			refresh_ball();
			stage_change="PLAY";
			if(rainy_weather)
			{
				rain_sound.volume=1;
			}
			else
			{
				birds.volume=1;
			}
		}
	}
}

function refresh_values()
{
	if(level % 4==0 && ball_size>20)
	{
		ball_size-=10;
	}
	if(level % 4==1)
	{
		ball_weight+=3;
	}
	if(level % 4 ==2)
	{
		if(wind>0)
		{
			wind= -wind-1;
		}
		else
		{
			wind= -wind+1;
		}
		rainy_weather= !rainy_weather;
	}
	if(level % 4==3)
	{
		goal+= Math.floor(goal/10+1);
	}
}

function refresh_clouds()
{
	var i;
	for(i=0; i<6; i++)
	{
		cloud[i].refresh(Math.random()*(mycanvas.width+400)-400/2,(i+level)%6+1);
	}
}

function refresh_mountains()
{
	mountains.refresh();
}

function refresh_ball()
{
	delete ball;
	var BallPix;
	var color;
	BallPix="Images/BallPix/BallPix"+(level%8+1)+".png";
	if(level % 5==0)
	{
		color="orange";
	}
	else if(level %5 ==1)
	{
		color="yellow";
	}
	else if(level %5==2)
	{
		color="green";
	}
	else if(level%5==3)
	{
		color="magenta";
	}
	else
	{
		color="blue";
	}
	ball= new create_ball(0,stage.height/2,ball_size,wind,ball_weight,goal,BallPix,color);
}

setInterval(drawPicture, 20);

