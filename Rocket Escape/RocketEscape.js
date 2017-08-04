
const SIZE = 30;

var fidelity; 	// how detailed the walls are

var walls = [];

var difficulty; // how sharp the curves are
var score;
var rocket;

function setup() {

  createCanvas(400, 800);

  fidelity = height / 10;

	var randomColor = color(random(255), random(255), random(255));
  rocket = new Rocket(noise(0) * width, height - SIZE, SIZE, randomColor);
  difficulty = 1;
	score = 0;

  frameRate(30);
  textAlign(CENTER);
}

function draw() {
  background(51);

	handleSpeed(frameCount);

  handleKeys();

  handleWalls();

  /* handle rocket */
  rocket.update();
  rocket.draw();

  /* draw score */
  textSize(30);
  noStroke();
  text(score, width / 2, fidelity);
}

/**
 * draws, deletes, pushes, and handles collision with walls
 */
function handleWalls() {

  var y = 0;
  for (var i = walls.length - 1; i >= 1; i -= 1) {

		walls[i].draw(y, walls[i - 1], color);

    /* check collision */
    if (y++ == fidelity) {
      if (rocket.collidesWith(walls[i])) {

				endGame();
      }
    }

		/* keep array clear */
    if (i < walls.length - fidelity * 2)
      walls.splice(i, 2);
  }

  /* move walls */

	var wall1 = new Wall(noise((score + i) * 0.01) * width, width / 2);
	var wall2 = new Wall(noise(((score + i + 1)) * 0.01) * width, width / 2);

	walls.push(wall1);
	walls.push(wall2);

	score += difficulty;
}

/**
 * stops loop, draws game over message
 */
function endGame() {

	noLoop();
	noStroke();
	fill("#0000FF");
	textSize(60);
	text("Game Over!", width / 2, height / 2);
	textSize(40);
	text("Press f5 to restart!", width / 2, height / 2 + 50);
}

/**
 * increases difficulty
 */
function handleSpeed(frame) {

	if (frame % 120 === 0) {

		difficulty += 1;
		rocket.speed *= 1.05;
	}
}

/**
 * handle user input
 */
function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {

    rocket.move(-1);
  } else if (keyIsDown(RIGHT_ARROW)) {

    rocket.move(1);
  }
}
