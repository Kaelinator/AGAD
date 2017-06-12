var p1;
var p2;

var p1v = 0;
var p2v = 0;

var p1S = 0;
var p2S = 0;

var ball;
var ballXV;
var ballYV;

function setup() {
  createCanvas(600, 400);

  p1 = createVector(40, height / 2);
  p2 = createVector(width - 50, height / 2);

  ball = createVector(width / 2, height / 2);
  ballXV = random(2) + 2;
  ballYV = random(2) + 2;
}

function draw() {
  background(51);

  handleKeys();

  p1.y += p1v;
  p2.y += p2v;

  p1v *= 0.6;
  p2v *= 0.6;

  p1.y = constrain(p1.y, 0, height - 100);
  p2.y = constrain(p2.y, 0, height - 100);

  rect(p1.x, p1.y, 10, 100);
  rect(p2.x, p2.y, 10, 100);

  if (ball.y > height - 10 || ball.y < 10) {
    ballYV *= -1;
  } else if (ball.x < 10) {
    p2S++;
    ball = createVector(width / 2, height / 2);
  } else if (ball.x > width -10) {
    p1S++;
    ball = createVector(width / 2, height / 2);
  }

  checkCollision();

  ball.x += ballXV;
  ball.y += ballYV;

  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(p1S + "  |  " + p2S, width / 2, 50);
  ellipse(ball.x, ball.y, 20);
}

function checkCollision() {

  var p1dist = Math.abs(ball.x - p1.x);
  var p2dist = Math.abs(ball.x - p2.x + 10);

  if (p1dist < 1) {
    if (ball.y >= p1.y && ball.y <= p1.y + 100) {
      ballXV *= -1;
    }
  } else if (p2dist < 1) {
    if (ball.y >= p2.y && ball.y <= p2.y + 100) {
      ballXV *= -1;
    }
  }
}

function handleKeys() {

  if (keyIsDown(UP_ARROW)) {
    p2v -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    p2v += 5;
  }

  if (keyIsDown(87)) {
    p1v -= 5;
  } else if (keyIsDown(83)) {
    p1v += 5;
  }

}
