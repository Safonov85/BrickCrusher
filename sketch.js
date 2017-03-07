var ballX, ballY, speedX, speedY, ballSize, direction, paddleColor, score, randomColorR, randomColorG, randomColorB, fps, fpsSet;

function setup()
{
    createCanvas(350, 600);
    background(50);
    frameRate(60);
    paddleColor = 200;
    ballX = width / 2;
    ballY = height / 2;
    score = 0;
    speedX = 5;
    speedY = 5;
    ballSize = 10;
    randomColRGB();
    direction = "rightDown";
    fps = 0;
    fpsSet = 0;
}

function draw()
{
    simpleBounceGame();
    
}

function framesPerSecond()
{
    var date = new Date();
    var nin = d.getMilliseconds();
    //fps = nin;
    text("MilliSec: " + nin, 10, 90);
}

function simpleBounceGame()
{
    background(50);
    drawPaddle();
    drawBall();
    drawMousePos();
    drawLineDirection();
    textConsole();
}

function drawLineDirection()
{
    if (direction == "rightDown" || direction == "leftDown")
    stroke(230, 100, 20);
    line(ballX, ballY, mouseX, 550);
}

function textConsole()
{
    textSize(20);
    noStroke();
    fill(230, 20, 20);
    text("Score: " + score, 10, 30);

    var d = new Date();
    var n = d.getSeconds();

    text("Seconds: " + n, 10, 60);
    
    var millisec = d.getMilliseconds();
    text("FPS: " + fpsSet, 10, 90);


    fps++;
    if (millisec >= 990)
    {
        fpsSet = fps;
        fps = 0;
    }
}

function drawMousePos()
{
    fill(255, 0, 0);
    rect(mouseX, mouseY, 10, 10);
}

function drawBall()
{
    bounceWall();
    ballX = ballX + speedX;
    ballY = ballY + speedY;
    fill(randomColorR, randomColorG, randomColorB);
    ellipse(ballX, ballY, ballSize, ballSize);
}

function giveRandomColor()
{
    var giveRandom = random(50, 255);
    return giveRandom;
}

function randomColRGB()
{
    randomColorR = giveRandomColor();
    randomColorG = giveRandomColor();
    randomColorB = giveRandomColor();
}

function bounceWall()
{
    // if ball hits right side
    if (ballX > width)
    {
        if (direction == "rightDown")
        {
            speedX = -5
            speedY = 5;
            direction = "leftDown";
            randomColRGB();
        }
        else if (direction == "rightUp")
        {
            speedX = -5;
            speedY = -5;
            direction = "leftUp";
            randomColRGB();
        }
        else
        {
            direction = "no Direction :(";
        }
    }

    // if ball hits left side
    if (ballX < 0)
    {
        if (direction == "leftDown")
        {
            speedX = 5;
            speedY = 5;
            direction = "rightDown";
            randomColRGB();
        }
        else if (direction == "leftUp")
        {
            speedX = 5;
            speedY = -5;
            direction = "rightUp";
            randomColRGB();
        }
    }

    if (ballY < 10)
    {
        if (direction == "leftUp")
        {
            speedX = -5;
            speedY = 5;
            direction = "leftDown";
        }
        else if (direction == "rightUp")
        {
            speedX = 5;
            speedY = 5;
            direction = "rightDown";
        }
    }
    bouncePaddle();
}

function bouncePaddle()
{
    if (ballY > 540)
    {
        if ((mouseX + 50) > ballX && ballX > (mouseX - 50) )
        {
            paddleColor = random(100, 255);
            if (direction == "leftDown")
            {
                speedX = -5
                speedY = -5;
                direction = "leftUp"
            }

            if (direction == "rightDown")
            {
                speedX = 5
                speedY = -5;
                direction = "rightUp"
            }
            score += 10;
        }
        else // re-start ball from center of screen
        {
            speedX = 5;
            speedY = 5;
            ballX = width / 2;
            ballY = height / 2;
            direction = "rightDown";
            score = 0;
        }
    }
}

function drawPaddle()
{
    noStroke();
    fill(paddleColor);
    rect(mouseX -50, 550, 100, 10);
}