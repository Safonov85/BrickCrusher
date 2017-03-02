var ballX, ballY, speedX, speedY, ballSize, direction, paddleColor;

function setup()
{
    createCanvas(350, 600);
    background(50);
    paddleColor = 200;
    ballX = width / 2;
    ballY = height / 2;
    speedX = 5;
    speedY = 5;
    ballSize = 10;
    direction = "rightDown";
}

function draw()
{
    background(50);
    drawPaddle();
    drawBall();
    drawMousePos();
    textConsole();
}

function textConsole()
{
    textSize(20);
    text("direction: " + direction, 10, 30);

    textSize(20);
    text("ballX: " + ballX + " ballY: " + ballY, 10, 70);
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
    ellipse(ballX, ballY, ballSize, ballSize);
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
        }
        else if (direction == "rightUp")
        {
            speedX = -5;
            speedY = -5;
            direction = "leftUp";
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
        }
        else if (direction == "leftUp")
        {
            speedX = 5;
            speedY = -5;
            direction = "rightUp";
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
        }
        else // re-start ball from center of screen
        {
            speedX = 5;
            speedY = 5;
            ballX = width / 2;
            ballY = height / 2;
            direction = "rightDown";
        }
    }
}

function drawPaddle()
{
    noStroke();
    fill(paddleColor);
    rect(mouseX -50, 550, 100, 10);
}