
const SCL = 5; // pixel-scale of each tile

var player1, player2;

function setup() {
  createCanvas(500, 500);

  frameRate(10);

	/* initialize players */
  player1 = new Bike(50 / SCL, height / 2 / SCL, 1, 0, color("#0000FF"));
  player2 = new Bike((width - 50) / SCL, height / 2 / SCL, -1, 0, color("#FF0000"));
}

function draw() {
  background(51);

	handlePlayers();
}

/**
 * update, draw, and check collision with players
 */
function handlePlayers() {

	/* update players */
	player1.update();
	player2.update();

	/* draw players */
	player1.draw();
	player2.draw();

	/* check collision */
	if ((player1.collidesWith(player2.trail) && player2.collidesWith(player1.trail)) ||
		(player1.collidesWith(player1.trail) && player2.collidesWith(player2.trail)) ||
		(player1.collidesWithBounds() && player2.collidesWithBounds()))	{

		// both players died at the same time

		endGame("Draw!");
	} else if (player1.collidesWith(player2.trail) ||
		player1.collidesWithBounds() || player1.collidesWith(player1.trail)) {

		// if player1 hits player2 or the side
		// or if player2 hits themself

		endGame("Red wins!");
	} else if (player2.collidesWith(player1.trail) ||
		player2.collidesWithBounds() || player2.collidesWith(player2.trail)) {

		// if player2 hits player1 or the side
		// or if player1 hits themself

		endGame("Blue wins!");
	}
}

/**
 * handles player input
 * player1 = W, A, S, & D
 * player2 = UP, LEFT, DOWN, & RIGHT
 */
function keyPressed() {

  switch (keyCode) {

    case 37:
      player2.setVelocity(createVector(-1, 0));
      break;

    case 38:
      player2.setVelocity(createVector(0, -1));
      break;

    case 39:
      player2.setVelocity(createVector(1, 0));
      break;

    case 40:
      player2.setVelocity(createVector(0, 1));
      break;

    case 65:
      player1.setVelocity(createVector(-1, 0));
      break;

    case 87:
      player1.setVelocity(createVector(0, -1));
      break;

    case 68:
      player1.setVelocity(createVector(1, 0));
      break;

    case 83:
      player1.setVelocity(createVector(0, 1));
      break;

  }
}

/**
 * ends the game, displays the outcome
 */
function endGame(winner) {

  noStroke();
  textAlign(CENTER);
  textSize(60);
  fill(255);
  text(winner, width / 2, height / 2);
  noLoop();
}
