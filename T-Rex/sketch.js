
var speed;
var y;
var yVel;
var onGround;

var score;

var horizon;
var obstacles = [];

function setup() {
  createCanvas(600, 200);

  textAlign(CENTER);

  horizon = height - 40;
  y = 20;
  score = yVel = 0;
  speed = 6;
  onGround = false;
}

function draw() {
  background(51);

  /* draw horizon */
  stroke(255);
  line(0, horizon, width, horizon);

  fill('#999999');
  ellipse(40, y, 40);

  if (frameCount % 120 === 0) {
    speed *= 1.05;
  }

  if (frameCount % 30 === 0) {
    var n = noise(frameCount);
    if (n > 0.5)
      newObstacle(n);
  }

  score++;
  textSize(20);
  text("Score: " + score, width / 2, 30);

  updateObstacles();
  handleTRex();
}

function updateObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= speed;
    var x = obstacles[i].x;
    var size = obstacles[i].size;
    var s2 = size / 2;

    if (x > -30) {
      /* if it's onscreen */

      fill(obstacles[i].color);
      rect(x, horizon - size, size, size);
      var x1 = x + s2;
      var y1 = horizon - s2;
      if (dist(x1, y1, 40, y) < s2 + 20) {
        /* collision! */

        noStroke();
        textSize(40);
        text("GAME OVER", width / 2, height / 2);
        textSize(20);
        text("Press f5 to restart", width / 2, height / 2 + 20);
        noLoop();
      }
    } else {
      /* delete from array */

      obstacles.splice(i, 1);
    }
  }
}

function newObstacle(n) {

  var obs = new Obstacle(n * 50, color(random(255), random(255), random(255)));

  obstacles.push(obs);
}

function handleTRex() {

  if (y + 20 + yVel < horizon) {

    yVel += map(frameCount, 0, 3600, 0.7, 2);
    onGround = false;
  } else {
    yVel = 0;
    onGround = true;
  }

  if (mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(32)) {
    if (onGround) {
      yVel -= map(frameCount, 0, 3600, 9, 15);
      onGround = false;
    }
  }

  /* movement */
  y += yVel;
}
