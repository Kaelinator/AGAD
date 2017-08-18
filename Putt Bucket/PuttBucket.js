
const BUCKET_SIZE = 30; // size of the bucket
var speed; // speed of the bucket
var bucket;

var score;
var lastShot; // time since the last putt
var balls = []; // keeps track of on-screen balls

function setup() {

  createCanvas(500, 500);

	/* initialize game values */
  bucket = createVector(width / 2, height / 2, 0);
  speed = 0.01;
  score = 0;
  lastShot = 0;

  textSize(40);
  textAlign(CENTER);
}

function draw() {
  background(51);

	handleBalls();
  handleClub();
  handleBucket();

	drawScore();
}

/**
 * draws club & line of sight
 * handles cooldown
 */
function handleClub() {

	/* draw club */
  fill("#FF0088");
  strokeWeight(3);
  stroke(255);
  ellipse(width / 2, height, 40);

	/* "cooling down" */
	lastShot++;

	if (lastShot < 60)
		// club is cooling down
		return;

	/* draw line of sight */
  var d = dist(width / 2, height, mouseX, mouseY);
  var dots = d / 10;

  /* dotted line */
  stroke(255);
  strokeWeight(5);

  for (var i = 0; i < dots; i++) {

    var x = lerp(width / 2, mouseX, i / dots);
    var y = lerp(height, mouseY, i / dots);
    point(x, y);
  }
}

/**
 * draws the score
 */
function drawScore() {

  fill(255);
  noStroke();
  text(score, width / 2, 50);
}

/**
 * handles user shooting
 */
function mousePressed() {

  if (lastShot < 60)
		// club is cooling down
    return;

	// base the magnitude upon the distance from the club
  var d = dist(width / 2, height, mouseX, mouseY);

	// find the angle of the putt
  var a = -atan((mouseX - width / 2) / (height - mouseY));

	// track the ball
  balls.push(new Ball(width / 2, height, a + PI, 0, d / 50));

	// reset cooldown
	lastShot = 0;
}

/**
 * updates, draws, and handles collision
 * between balls
 * detects game over
 */
function handleBalls() {

	for (var i = balls.length - 1; i >= 0; i--) {

		/* update & draw */
    balls[i].update();
    balls[i].draw();

    if (balls[i].offScreen())
			// if the player missed
      endGame();

    if (balls[i].collidesWith(bucket)) {
			// if the player hit

      balls.splice(i, 1);
      score++;
      speed += 0.0025;
    }
  }
}

/**
 * moves & draws bucket
 */
function handleBucket() {

	/* move the bucket */
  bucket.z += speed;
  bucket.x = sin(bucket.z) * width / 3 + width / 2;
  bucket.y = Math.abs(noise(bucket.z)) * (height / 2);

	/* draw the bucket */
  fill(map(score, 0, 15, 0, 200)); // brightness is based upon score
  stroke(255);
  strokeWeight(2);
  rect(bucket.x, bucket.y, BUCKET_SIZE, BUCKET_SIZE);
}

/**
 * ends the loop, draws game over text
 */
function endGame() {

  noLoop();
  textSize(70);
  fill("#FFFF00");
  noStroke();
  text("Game Over!", width / 2, height / 2);
  textSize(40);
}
