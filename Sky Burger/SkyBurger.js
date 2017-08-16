
var toppings = []; // track falling toppins
var stack = []; // track burger stack

var player; // bottom bun

var score;
var toppingWidth;
var toppingChance;

function setup() {

  createCanvas(300, 600);

	/* initialize values */
	score = 0;
	toppingWidth = 100;
	toppingChance = 0.5;

	/* initialize bottom bun */
  player = new Topping(width / 2, height - 15, toppingWidth, color("#FFFFFF"));
  stack.push(player);
  player.stacked = true;
}

function draw() {

  background(51);

  handleKeys();
  handleToppings();
	handleStack();
	handleDifficulty(frameCount, score);

  attemptNewTopping(frameCount);

  drawScore();
}

/**
 * handles player input
 */
function handleKeys() {

	if (keyIsDown(LEFT_ARROW)) {
		player.move(createVector(-5, 0));
	}

	if (keyIsDown(RIGHT_ARROW)) {
		player.move(createVector(5, 0));
	}

}

/**
 * tweak the values to increase difficulty
 * every half-a-second
 */
function handleDifficulty(frame, score) {

	if (frame % 30 === 0) { // every half-a-second

		toppingWidth = map(score, 0, 500, 100, 10);
		toppingChance = map(score, 0, 500, 0.5, 0.999);
	}

}

/**
 * draws & updates stack
 * moves the entire stack
 * shifts stack to screen
 * updates score
 */
function handleStack() {

	/* calculate bottom toppings first */
	for (var i = stack.length - 1; i >= 0; i--) {

    stack[i].update();

		/* move the entire stack */
    if (stack[i - 1] != null) // if the previous topping exists
      stack[i].moveTo(stack[i - 1].position); // set the position to the previous topping

    if (stack.length - 1 > score && stack.length > 15) {
			// if the stack exceeds half of the screen's height

      stack[i].move(createVector(0, +12)); // move all toppings downward
    }

  }

	/* draw the top toppings first */
	for (var i = 0; i < stack.length; i++) {

		stack[i].draw();
	}

	/* update score */
  if (stack.length - 1 > score) {
    score++;
  }
}

/**
 * updates & draws toppings
 * checks for game over
 * checks for stacks
 */
function handleToppings() {

	for (var i = 0; i < toppings.length; i++) {

		/* update & draw */
    toppings[i].update();
    toppings[i].draw();

		/* check for the end of the game */
    if (toppings[i].position.y > height)
    	endGame();

		/* check for stacks */
    if (toppings[i].stacksWith(stack[stack.length - 1])) {
			// if the topping stacks, push to the stack

      toppings[i].stacked = true;
      stack.push(toppings[i]);
      toppings.splice(i, 1);
    }

  }
}

/**
 * pushes a new topping to the toppings array
 * bases frequency off of frame
 */
function attemptNewTopping(frame) {

	if (frame % 90 === 0) { // every 1.5 seconds

		if (random() < toppingChance) {
			// based upon a random chance, a new topping might be pushed

			toppings.push(new Topping(random(width), 0, toppingWidth, rCol()));
		}
	}
}

/**
 * draws the score
 */
function drawScore() {

	textSize(50);
  text(score, 10, 70);
}

/**
 * ends loop, displays message
 */
function endGame() {

  textAlign(CENTER);
  fill(255);
  text("Game Over!", width / 2, height / 2);
  textAlign(LEFT);
  noLoop();
}

/**
 * returns a random color
 */
function rCol() {

  return color(random(255), random(255), random(255));
}
