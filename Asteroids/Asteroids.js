
var field = []; // tracks ateroids
var bullets = []; // tracks lazers

var score;
var ship; // player

function setup() {
  createCanvas(640, 480);

  translate(width / 2, height / 2); // translate to mid-screen

  ship = new Ship(randomColor(), randomColor());
  score = 0;
}

function draw() {
  background(51);

	/* handle everything */
  handleKeys();
	handleField();
	handleBullets();

  newAsteroid();
	
	drawScore();

	/* update & draw ship */
  ship.update();
  ship.draw();
}

/**
 * attempts a new astroid
 */
function newAsteroid() {

	if (frameCount % 30 === 0) { // every half-a-second
    if (random() > map(score, 0, 1000, 0.75, 0.25)) { // increase difficulty

      var r = random(); // plane to randomize

			/* generate only on the edges */
      var x = (r > 0.5) ? random(width) : (random() > 0.5) ? 0 : width;
      var y = (r < 0.5) ? random(height) : (random() > 0.5) ? 0 : height;

      field.push(new Asteroid(x, y, noise(frameCount) * 100, randomColor()));
    }
  }
}

/**
 * updates, draws, and handles collision for asteroids in field array
 */
function handleField() {

	for (var i = field.length - 1; i >= 0; i--) {

		/* update & draw */
    field[i].update();
    field[i].draw();

		/* check collision */
    for (var j = bullets.length - 1; j >= 0; j--) {

      if (bullets[j].penetrates(field[i])) {
				// the asteroid was hit

				// manage arrays
        field.splice(i, 1);
        bullets.splice(j, 1);

        score++;
        return;
      }
    }
  }
}

/**
 * updates, draws, and manages bullets array
 */
function handleBullets() {

	for (var q = bullets.length - 1; q >= 0; q--) {

    if (bullets[q].onScreen) {

			/* update & draw */
      bullets[q].update();
      bullets[q].draw();
    } else {
			// not visible, delete from array

      bullets.splice(q, 1);
    }
  }
}

/**
 * handles user input for rotation
 */
function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {

    ship.rotate(-0.05);
  } else if (keyIsDown(RIGHT_ARROW)) {

    ship.rotate(0.05);
  }
}

/**
 * handles user input for lazer
 */
function keyPressed() {

  switch (keyCode) {

    case 32:
      ship.shoot(bullets);
      break;
  }
}

/**
 * draws player's score
 */
function drawScore() {

	noStroke();
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text(score, 50, 100);
}

/**
 * ends the loop, displays message
 */
function endGame() {

  noLoop();
  noStroke();
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text("Game Over!", width / 2, height / 2);
}

/**
 * returns a random color
 */
function randomColor() {

  return color(random(255), random(255), random(255));
}
