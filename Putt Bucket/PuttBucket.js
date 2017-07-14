
var B_SIZE = 30;

var score;
var speed;
var bucket;

var lastShot;

var balls = [];

function setup() {

  createCanvas(500, 500);

  bucket = createVector(width / 2, height / 2, 0);
  speed = 0.01;
  score = 0;
  lastShot = 0;

  textSize(40);
  textAlign(CENTER);
}

function draw() {
  background(51);

  for (var i = balls.length - 1; i >= 0; i--) {

    balls[i].update();
    balls[i].draw();

    if (balls[i].offScreen())
      endGame();

    if (balls[i].collidesWith(bucket)) {

      balls.splice(i, 1);
      score++;
      speed += 0.0025;
    }
  }


  /* draw score */
  fill(255);
  noStroke();
  text(score, width / 2, 50);

  drawClub();
  updateBucket();
  lastShot++;
}

function drawClub() {

  fill("#FF0088");
  strokeWeight(3);
  stroke(255);
  ellipse(width / 2, height, 40);

  var d = dist(width / 2, height, mouseX, mouseY);
  var dots = d / 10;

  if (lastShot < 60)
    return; // cooldown

  /* draw dotted line */
  stroke(255);
  strokeWeight(5);
  for (var i = 0; i < dots; i++) {

    var x = lerp(width / 2, mouseX, i / dots);
    var y = lerp(height, mouseY, i / dots);
    point(x, y);
  }
}

function mousePressed() {

  if (lastShot < 60)
    return; // cooldown

  var d = dist(width / 2, height, mouseX, mouseY);

  var a = -atan((mouseX - width / 2) / (height - mouseY));

  balls.push(new Ball(width / 2, height, a + PI, 0, d / 50));
  lastShot = 0;
}

function updateBucket() {

  bucket.z += speed;
  bucket.x = sin(bucket.z) * width / 3 + width / 2;
  bucket.y = Math.abs(noise(bucket.z)) * (height / 2);

  fill(map(score, 0, 15, 0, 200));
  stroke(255);
  strokeWeight(2);
  rect(bucket.x, bucket.y, B_SIZE, B_SIZE);

}

function endGame() {

  noLoop();
  textSize(70);
  fill("#FFFF00");
  noStroke();
  text("Game Over!", width / 2, height / 2);
  textSize(40);
}
