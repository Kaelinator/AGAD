
var player;
var projectiles = []; // track on-screen Squares

var difficulty; // difficulty of the projectiles

function setup() {

  createCanvas(600, 400);

	difficulty = 2;

	/* initialize player */
  player = new Square(width / 2, height / 2,
		30, color("#FFFFFF"), null, difficulty * 0.8);

	textAlign(CENTER);
  textSize(40);
}

function draw() {

  background(51);

  handleProjectiles();
	handlePlayer();
	handleKeys();

	attemptNewProjectile(frameCount);

  drawScore();
}

/**
 * attempt to push a new projectile to the projectiles array
 */
function attemptNewProjectile(frame) {

	if (frame % 30 === 0) {
		// every 0.5 seconds

    if (random(difficulty) > 1.25) {
			// based upon difficulty

			projectiles.push(generateSquare());
		}

		// increase difficulty
    difficulty += 0.05;
  }
}

/**
 * handles user input
 */
function handleKeys() {

	// player is 80% slower than projectiles
	var speed = difficulty * 0.8;

  if (keyIsDown(UP_ARROW))
    player.move(0, -speed);

	if (keyIsDown(DOWN_ARROW))
    player.move(0, speed);

  if (keyIsDown(LEFT_ARROW))
    player.move(-speed, 0);

  if (keyIsDown(RIGHT_ARROW))
    player.move(speed, 0);

}

/**
 * draws the player's score
 */
function drawScore() {

	noStroke();
  text(frameCount, width / 2, 60);
}

/**
 * updates, draws, checks collision for Squares
 * manages projectiles array
 */
function handleProjectiles() {

	for (var i = projectiles.length - 1; i >= 0; i--) {

		/* update & draw */
    projectiles[i].update(false); // false = not-the-player
    projectiles[i].draw();

    if (projectiles[i].collidesWith(player))
			// check for game over
      endGame();

    if (projectiles[i].isOffscreen())
			// delete from array
      projectiles.splice(i, 1);

  }
}

/**
 * updates, draws, and constrains the player
 */
function handlePlayer() {

	/* update & draw */
	player.update(true);
  player.draw();

	/* constrain the player */
  if (player.isOffscreen()) {
    endGame();
  }
}

/**
 * stops the loop, draws game over message
 */
function endGame() {

  noLoop();
  textSize(70);
  fill(255);
  noStroke();
  text("Game Over!", width / 2, height / 2);
  textSize(40);
}

/**
 * returns a randomly generated Square
 */
function generateSquare() {

  /* create square */
  var plane = (random() > 0.5);
	// true = randomize x-axis & keep y-axis constant
	// false = randomize y-axis & keep x-axis constant

	/* only allow squares to spawn at edges */
  var x = (plane) ? random(width) : ((random() > 0.5) ? 0 : width);
  var y = (plane) ? ((random() > 0.5) ? 0 : height) : random(height);

  return new Square(x, y, random(35), randomColor(), player.position, difficulty);
}

/**
 * returns a random color
 */
function randomColor() {
  return color(random(255), random(255), random(255));
}
