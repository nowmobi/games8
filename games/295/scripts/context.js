var mycanvas;
var canvas;
var ctx;
var game_dimensions={
    width:1000,
    height:700,
};
mycanvas=document.createElement("canvas");
document.body.insertBefore(mycanvas, document.body.childNodes[0]);
mycanvas.id="canvas";
mycanvas.width=game_dimensions.width;
mycanvas.height=game_dimensions.height;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
mycanvas.style.cursor="none";

var start_screen = new Image();
start_screen.src="Images/Start.png";

var help_screen= new Image();
help_screen.src= "Images/Help.png";

var success= new Image();
success.src = "Images/Success.png";

var level_word=new Image();
level_word.src= "Images/Level.png";