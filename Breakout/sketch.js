
var paddle, paddleV;
var ball, ballV, radius;

var blocks;
var staticBlocks;

var score;

function setup() {
  createCanvas(600, 400);

  radius = 10;
  ball = createVector(width / 2, height / 2);
  ballV = createVector(random(-3, 3), random(2, 4));
  // ballV = createVector(0, 10);

  paddle = new Block(width / 2 - 50, height - 40, 100, 10, "#FFFFF");
  paddleV = 0;

  staticBlocks = [];
  staticBlocks.push(paddle);
  staticBlocks.push(new Block(0, 0, 5, height, "#000")); // left
  staticBlocks.push(new Block(width, 0, width - 5, height, "#000")); // right
  staticBlocks.push(new Block(0, 0, width, 5, "#000")); // top

  blocks = populateBlocks();

  score = 0;

  textSize(20);
  textAlign(CENTER);
  noStroke();
}

function draw() {
  background(51);

  /* draw stuff */
  fill(255);
  text(score);
  fill(paddle.c);
  rect(paddle.x, paddle.y, paddle.w, paddle.h); // paddle
  fill("#999");
  ellipse(ball.x, ball.y, radius * 2); // ball
  text(score, 50, height - 50);
  for (var i = 0; i < blocks.length; i++) {
    /* blocks */

    if (blocks[i].intact) {
      fill(blocks[i].c);
      rect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
    }
  }



  if (score == blocks.length)
    endGame(true);

  /* handle movement */
  handlePaddle();
  handleBall();
}

function handleBall() {

  ball.add(ballV);

  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].intact) {

      if (areColliding(ball, blocks[i])) {
        score++;
        blocks[i].intact = false;
        break;
      }
    }
  }

  for (var j = 0; j < staticBlocks.length; j++)
    areColliding(ball, staticBlocks[j]);

  if (ball.y > height)
    endGame(false);

}

function areColliding(ball, block) {

  /* ball's true velocity */
  var bXV = ball.x + ballV.x;
  var bYV = ball.y + ballV.y;

  /* check y plane */
  var upperYBlock = block.y;
  var upperYBound = block.y - radius;

  var lowerYBlock = block.y + block.h;
  var lowerYBound = block.y + block.h + radius;

  var topBound = (bYV >= upperYBound) && (bYV <= upperYBlock);
  var bottomBound = (bYV <= lowerYBound) && (bYV >= lowerYBlock);

  var yBound = (bYV >= upperYBound) && (bYV <= lowerYBound);

  /* check x plane */
  var leftXBlock = block.x;
  var leftXBound = block.x - radius;

  var rightXBlock = block.x + block.w;
  var rightXBound = block.x + block.w + radius;

  var leftBound = (bXV >= leftXBound) && (bXV <= leftXBlock);
  var rightBound = (bXV <= rightXBound) && (bXV >= rightXBlock);

  var xBound = (bXV >= leftXBound) && (bXV <= rightXBound);

  if (xBound && yBound) {
    /* collision! */

    ballV.x *= (leftBound || rightBound) ? -1 : 1;
    ballV.y *= (topBound || bottomBound) ? -1 : 1;

    ballV.mult(1.0175);

    return true;
  }

  return false;
}

function handlePaddle() {

  if (keyIsDown(LEFT_ARROW)) {

    paddleV -= 4;
  } else if (keyIsDown(RIGHT_ARROW)) {

    paddleV += 4;
  }

  paddle.x += paddleV;
  paddleV *= 0.7;

  paddle.x = constrain(paddle.x, 0, width - 100);
}

function endGame(won) {

  fill(255);
  textSize(50);
  if (won) {
    text("You win!", width / 2, height / 2);
  } else {
    text("You lose!", width / 2, height / 2);
  }
  textSize(30);
  text("Press f5 to restart!", width / 2, height / 2 - 40);

  noLoop();
}

/**
 * Block object
 */
function Block(x, y, w, h, c) {

  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;

  this.intact = true;
}

function populateBlocks() {

  var b = [];

  var cols = 20;
  var rows = 10;

  var w = 25;
  var h = 10;
  var padding = 5;

  var offset = (width - (w + padding) * cols) / 2;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      var x = (col * w) + (col * padding) + offset;
      var y = (row * h) + (row * padding);
      b.push(new Block(x, y, w, h, color(random(255), 0, random(255))));
    }
  }

  return b;
}
