var color_text="pink";
var color_back="black";
var color_text_hover="pink";
var color_back_hover="grey";

function create_button(name,posX,posY,sizeX,sizeY,action)
{
    this.hover_value=false;
    this.name=name,
    this.posX=posX,
    this.posY=posY,
    this.sizeX=sizeX,
    this.sizeY=sizeY,
    this.posX2=posX+sizeX,
    this.posY2=posY+sizeY,
    this.color_text=color_text,
    this.color_back=color_back,
    this.color_text_hover=color_text_hover,
    this.color_back_hover=color_back_hover,
    this.draw=function(){
        if(this.hover_value)
        {
            ctx.fillStyle=color_back_hover;
        }
        else
        {
            ctx.fillStyle= color_back;
        }
        ctx.fillRect(posX,posY,sizeX,sizeY);
        ctx.textAlign="center";
        ctx.textBaseLine="middle";
        ctx.font="14px Arial"
        ctx.fillStyle="#fe3521";
		ctx.strokeStyle="#fe3521";
        ctx.fillText(name,posX+sizeX/2-1,posY+sizeY/2+1);    
    },
    this.functionality=function(){
         if(mouse.x>=this.posX && mouse.x<=this.posX2 && mouse.y>=posY && mouse.y<=this.posY2 && mouse.down) 
         {
             action();
             click_play();
         }
         if(mouse.x>=this.posX && mouse.x<=this.posX2 && mouse.y>=posY && mouse.y<=this.posY2)
         {
             this.hover_value=true;
         }
         else
         {
             this.hover_value=false;
         }
    }
}
function create_button_hover(name,posX,posY,sizeX,sizeY,action)
{
    this.hover_value=false;
    this.name=name,
    this.posX=posX,
    this.posY=posY,
    this.sizeX=sizeX,
    this.sizeY=sizeY,
    this.posX2=posX+sizeX,
    this.posY2=posY+sizeY,
    this.color_text=color_text,
    this.color_back=color_back,
    this.color_text_hover=color_text_hover,
    this.color_back_hover=color_back_hover,
    this.draw=function(){
        if(this.hover_value)
        {
            ctx.fillStyle=color_back_hover;
        }
        else
        {
            ctx.fillStyle= color_back;
        }
        ctx.fillRect(posX,posY,sizeX,sizeY);
        ctx.textAlign="center";
        ctx.textBaseLine="middle";
        ctx.font="14px Arial"
        ctx.fillStyle="#fe3521";
		ctx.strokeStyle="#fe3521";
        ctx.fillText(name,posX+sizeX/2-1,posY+sizeY/2+1);
    },
    this.functionality=function(){
         if(mouse.x>=this.posX && mouse.x<=this.posX2 && mouse.y>=posY && mouse.y<=this.posY2) 
         {
             action();
             this.hover_value=true;
         }
         else
         {
             this.hover_value=false;
         }
    }
}




function create_ball(x,y,size,wind,weigth,goal,filename,color)
{
    this.image= new Image();
    this.image.src= filename;
    this.goal=goal;
    this.wind=wind;
    this.weigth=weigth;
    this.rotation=0;
    this.doing_highscore=false;
    this.count_y=0,
    this.count_x=0,
    this.counter=0,
    this.high=0,
    this.x=x,
    this.y=y,
    this.speedX=0,
    this.speedY=0,
    this.size=size,
    this.colordefault=color,
    this.color=color,
    this.draw=function(){
        if(time>51)
        {
            ctx.fillStyle=this.color;
            ctx.beginPath();
            ctx.arc(stage.transx(this.x),stage.transy(this.y),this.size,0,2*Math.PI);
            ctx.fill();
            ctx.save();
            ctx.translate(stage.transx(this.x),stage.transy(this.y));
            ctx.rotate(this.rotation % 360*Math.PI/180);
            ctx.drawImage(this.image,-this.size,-this.size,this.size*2,this.size*2);
            ctx.restore();
            grd=ctx.createRadialGradient(stage.transx(this.x-this.size/2),stage.transy(this.y+this.size/2),0,stage.transx(this.x-this.size/2),stage.transy(this.y+this.size/2),this.size/4)
            grd.addColorStop(0, "white");
            grd.addColorStop(1, "rgba(255,255,255,0");
            ctx.fillStyle= grd;
            ctx.beginPath();
            ctx.arc(stage.transx(this.x-this.size/2),stage.transy(this.y+this.size/2),this.size/4,0,Math.PI*2);
            ctx.fill();
        }
        ctx.strokeStyle="red";
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(200+(mycanvas.width-400)*this.high/this.goal,5);
        ctx.lineTo(200+(mycanvas.width-400)*this.high/this.goal,35);
        ctx.stroke();
        ctx.fillStyle="grey";
        ctx.fillRect(200,5,(mycanvas.width-400)*this.counter/this.goal,30);
        ctx.strokeStyle="black";
        ctx.strokeRect(200,5,mycanvas.width-400,30);
        ctx.fillStyle="black";
        ctx.font="30px Arial";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText("GOAL:"+this.goal,mycanvas.width/2,22)
        ctx.font="80px Arial";
        ctx.textAlign="center";
        ctx.fillText(this.counter,mycanvas.width/2,80);
    },
    this.functionality=function() {
        this.rotation+=this.speedX;
        this.speedY-=this.weigth/100;
        this.speedX+=this.wind*0.05;
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.count_x= (this.x) % 360 * Math.PI*2/360;
        this.count_y= (this.y) % 360 * Math.PI*2/360;
        var mx=stage.op_transx(mouse.x);
        var my=stage.op_transy(mouse.y);
        if(40>=this.y-this.size)
        {
            if(this.speedY<-1 && stage_change=="PLAY")
            {
                touch_down_play();
            }
            this.speedY= -this.speedY*0.4;
            this.speedX= this.speedX*0.9;
            this.y=40+this.size;
            this.counter=0;
            this.doing_highscore=false;
        }
        if(this.x<-stage.width/2-this.size || this.x>stage.width/2+this.size)
        {
            this.x=0;
            this.y=stage.height/2;
            this.speedX=0;
            this.speedY=0;
            this.counter=0;
            this.doing_highscore=false;
        }
        this.color=this.colordefault;
        if(stage_change=="PLAY" && mouse.down && (mx-this.x)*(mx-this.x)+(my-this.y)*(my-this.y)<=(this.size+10)*(this.size+10))
        {
            kick_play();
            if(start)
            {
                start=false;
            }
            this.speedX=(this.x-mx)/5;
            this.speedY=(this.y-my+this.size/2)*(stage.height-this.y+this.size)/(3*stage.height);
            this.counter++;
            if(this.high<this.counter)
            {
                this.high=this.counter;
                this.doing_highscore=true;
            }
            this.color="white";
            if(this.counter==this.goal)
            {
                stage_change="WIN";
                you_win_counter=50;
            }
        }
    }
}

function create_ground()
{
    this.image=new Image();
    this.image.src = "Images/GroundPix.png"
    this.draw=function(){
        ctx.drawImage(this.image,0,stage.height-100);
    }
}

function create_mouse()
{
    this.x=mouse.x;
    this.y=mouse.y;
    this.counter=0;
    this.draw= function(){
        ctx.strokeStyle="black";
        if(this.counter>0)
        {
            ctx.beginPath();
            ctx.arc(mouse.x,mouse.y,this.counter,0,Math.PI*2);
            ctx.stroke();
            this.counter-=3;
        }
        else
        {
            ctx.beginPath();
            ctx.arc(mouse.x,mouse.y,10,0,Math.PI*2);
            ctx.stroke();
        }
    }
    this.functionality=function(){
        this.x=mouse.x;
        this.y=mouse.y;
        if(mouse.down)
        {
            this.counter=20;
        }
    }
}
function showhelp()
{
    ctx.drawImage(help_screen,mycanvas.width/2-400,mycanvas.height/2-200);
}
function create_cloud(filename)
{
    this.image= new Image();
    this.image.src= filename;
    this.x=0;
    this.y=0;
    this.depth=0;
    this.draw= function(){
        ctx.drawImage(this.image,this.x,this.y);
    };
    this.functionality= function(wind)
    {
        this.x+=wind*this.depth/5;
        this.y=100-this.depth*20;
        if(this.x>mycanvas.width)
        {
            this.x=-400;
        }
        else if(this.x<-400)
        {
            this.x=mycanvas.width;
        }
    };
    this.refresh= function(x,depth)
    {
        this.x=x;
        this.depth=depth;
    };
}

function create_you_win()
{
    this.draw=function(){
        if(stage_change=="WIN LOGO" && you_win_counter>0)
        {
            if(rainy_weather)
            {
                rain_sound.volume=you_win_counter/50;
            }
            else
            {
                birds.volume=you_win_counter/50;
            }
            var value;
            if(you_win_counter>20)
            {
                value=(50-you_win_counter)/30;
            }
            else
            {
                value=1;
            }
            ctx.fillStyle= "rgba(0,0,0,"+value+")";
            ctx.fillRect(0,0,mycanvas.width,mycanvas.height);
            ctx.drawImage(success,mycanvas.width/2-300,mycanvas.height/2-50);
            // ctx.fillStyle="black";
            // ctx.strokeStyle="rgb(255,0,0)";
            // ctx.font="50px Helvetica";
            // ctx.textAlign="center";
            // ctx.fillText("GOAL REACHED",mycanvas.width/2,mycanvas.height/2);
            // ctx.strokeText("GOAL REACHED",mycanvas.width/2,mycanvas.height/2);
            you_win_counter--;
        }
        else if(stage_change=="WIN LOGO" && you_win_counter==0)
        {
            value=1;
            ctx.fillStyle= "rgba(0,0,0,"+value+")";
            ctx.fillRect(0,0,mycanvas.width,mycanvas.height);
            ctx.drawImage(success,mycanvas.width/2-300,mycanvas.height/2-50);
            // ctx.fillStyle="black";
            // ctx.strokeStyle="rgb(255,0,0)";
            // ctx.font="50px Helvetica";
            // ctx.textAlign="center";
            // ctx.fillText("GOAL REACHED",mycanvas.width/2,mycanvas.height/2);
            // ctx.strokeText("GOAL REACHED",mycanvas.width/2,mycanvas.height/2);
            stage_change="NEW";
            if(rainy_weather)
            {
                rain_sound.volume=0;
            }
            else
            {
                birds.volume=0;
            }
        }
    }
}

function create_mountains()
{
    this.count=1;
    this.image= new Image();
    this.image.src="Images/Mountains/MountPix"+this.count+".png";
    this.draw= function()
    {
        ctx.drawImage(this.image,0,stage.height-900);
        
    };
    this.refresh= function()
    {
        this.count= this.count %3 +1;
        this.image.src="Images/Mountains/MountPix"+this.count+".png";
    };
}

function create_sky()
{
    this.draw= function(){
        if(rainy_weather)
        {
            ctx.fillStyle="rgb(200,220,200)";
        }
        else
        {
            ctx.fillStyle="rgb(150,255,255)";
        }
        ctx.fillRect(0,0,mycanvas.width,mycanvas.height);
    };
}

function create_stagona()
{
    this.x=Math.random()*mycanvas.width;
    this.y=Math.random()*mycanvas.height;
    this.draw=function(){
        ctx.beginPath();
        ctx.strokeStyle="rgba(180,180,180,1)";
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+wind*3,this.y+10);
        ctx.stroke();
    }
    this.restart=function()
    {
        this.x=Math.random()*mycanvas.width*1.4-mycanvas.width*0.2;
        this.y=-20;
    }
    this.functionality=function(){
        this.x+=wind*9;
        this.y+=mycanvas.height*Math.random();
        if(this.x>mycanvas.width)
        {
            this.restart();
        }
        else if(this.x<0)
        {
            this.restart();
        }
        if(this.y>mycanvas.height)
        {
            this.restart();
        }
        else if(this.y<0)
        {
            this.restart();
        }
    }
}

function create_rain()
{
    this.stagones=[];
    var i;
    for(i=0; i<100; i++)
    {
        this.stagones[i]=new create_stagona();
    }
    this.draw=function(){
        if(rainy_weather)
        {
            var i;
            for(i=0; i<100; i++)
            {
                this.stagones[i].draw();
                this.stagones[i].functionality();
            }
        }
    };
}



var start=true;
var time=51;
var level=0;
var rainy_weather=false;
var fullscreenbutton=new create_button("FULLSCREEN",10,10,100,20,change_fullscreen);
var helpbutton =new create_button_hover("HELP",10,90,100,20,showhelp);
var soundbutton= new create_button("SOUND",10,50,100,20,play_pause);
var ball=new create_ball(0,stage.height/2,100,0,100,5,"Images/BallPix/BallPix1.png","blue");
var ground=new create_ground();
var cursor=new create_mouse();
var mountains= new create_mountains();
var sky= new create_sky();
var rain= new create_rain();
var stage_change="PLAY";
var you_win_counter=0;
var cloud=[];
var you_win=new create_you_win();
cloud[0]=new create_cloud("Images/Clouds/cloud1.png");
cloud[1]=new create_cloud("Images/Clouds/cloud2.png");
cloud[2]=new create_cloud("Images/Clouds/cloud3.png");
cloud[3]=new create_cloud("Images/Clouds/cloud4.png");
cloud[4]=new create_cloud("Images/Clouds/cloud5.png");
cloud[5]=new create_cloud("Images/Clouds/cloud6.png");
var i;
for(i=0; i<6; i++)
{
	cloud[i].refresh(Math.random()*(mycanvas.width+400)-400/2,i+1);
}