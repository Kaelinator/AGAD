
const GRAVITY = 0.2;

const BLADE_SIZE = 20; // number of strokes before fading
const BLADE_LENGTH = 150;  // maximum distance between points to connect two strokes

const BAD_FRUIT_PROBABILITY = 0.9; // chance of each fruit being bad

var sword;
var fruit = []; // on-screen fruit

var lives;
var score;

function setup() {
  createCanvas(600, 400);

  sword = new Blade(color("#FFF0EE"));
  frameRate(60);

  lives = 3;
  score = 0;
}

function draw() {
  background(51);

	handleMouse();
  score += handleFruit();

  drawScore();
  drawLives();
}

/**
 * swings and draws the sword
 */
function handleMouse() {

	if (mouseIsPressed) { // swinging
		sword.swing(mouseX, mouseY);
	}

  if (frameCount % 2 === 0) { // update half the time

		sword.update();
	}

  sword.draw();
}

/**
 * pushes and updates fruit
 * returns number of points scored
 */
function handleFruit() {

	/* push new fruit */
  if (frameCount % 10 === 0) {

		if (noise(frameCount) > 0.66) {

			fruit.push(randomFruit());
		}
	}

	/* handle slicing fruit */
	var points = 0;
	for (var i = fruit.length - 1; i >= 0; i--) {

		fruit[i].update();
		fruit[i].draw();

		if (!fruit[i].visible) { // if the fruit is no longer on-screen

			if (!fruit[i].sliced && !fruit[i].bad) { // if we haven't sliced & it's not a bad

				lives--;
			}

			if (lives < 1) { // if it's game over

				endGame();
			}

			fruit.splice(i, 1); // delete invisible fruit from array
		} else {

			points += (sword.checkForSlice(fruit[i])) ? 1 : 0; // if we sliced the fruit, add to the points
		}

	}

	return points;
}

/**
 * draws lives in the top right
 */
function drawLives() {

  stroke(255);
  strokeWeight(3);
  fill("#FF00EE");

  for (var i = lives; i > 0; i--) {

		ellipse(width - (i * 20 + 20), 50, 20);
	}

}

/**
 * draws score in the top left
 */
function drawScore() {

  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(50);
  text(score, 10, 50);
}

/**
 * ends the loop, draws message
 */
function endGame() {

  noLoop();

  textAlign(CENTER);
  noStroke();
  fill("#888888");
  textSize(100);
  text("Game over!", width / 2, height / 2);
  textSize(50);
  text("Press f5 to restart!", width / 2, height / 2 + 60);
}
