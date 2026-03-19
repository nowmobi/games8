function drawBackGround()
{
    sky.draw();
    mountains.draw();
    for(var i=1; i<=6; i++)
    {
        for(var j=0; j<6; j++)
        {
            if(cloud[j].depth==i)
            {
                cloud[j].draw();
                cloud[j].functionality(wind);
            }
        }
    }
}

function drawLogo()
{
    ctx.drawImage(start_screen,mycanvas.width/2-300,mycanvas.height/3-150);
}

function drawButtons()
{
    fullscreenbutton.draw();
    fullscreenbutton.functionality();
    soundbutton.draw();
    soundbutton.functionality();
    helpbutton.draw();
    helpbutton.functionality();
}

function drawBall()
{
    ground.draw();
    ball.draw();
    ball.functionality();

}