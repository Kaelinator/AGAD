
const SPRINTER_COUNT = 7; // how many lanes there are, including the player

var runners = []; // lineup
var runner; // player

var laneWidth; // width of each lane

var startTime; // beginning of the game

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

	/* initialize opponents */
  var opponentColor = randomColor(); // color of opponents
  for (var i = 1; i < SPRINTER_COUNT; i++) {
		// push opponents
    runners.push(new Sprinter(random(0.075) + 0.1, opponentColor));
  }

	/* initialize player */
  runner = new Sprinter(0, invertColor(opponentColor));
  runners.splice(Math.floor(runners.length / 2), 0, runner);

	/* initialize stopwatch */
  startTime = new Date().getTime();
  laneWidth = height / runners.length;
}

function draw() {
  background(51);

  handleTrack();
  stride();
}

/**
 * handle user input
 */
function keyPressed() {

  runner.run(keyCode);
}

/**
 * AI for opponents
 */
function stride() {

  for (var r = 0; r < runners.length; r++) {
		// loop through runners

    if (random() < runners[r].skill) { // calculate the speed of the runner
			// take a stride

			// LEFT_ARROW + RIGHT_ARROW = 76, therefore;
			// 76 - LEFT_ARROW = RIGHT_ARROW &
			// 76 - RIGHT_ARROW = LEFT_ARROW
			runners[r].run(76 - runners[r].previousKey);
		}

  }

}

/**
 * draws & updates runners
 * draws lanes
 */
function handleTrack() {

  for (var r = 0; r < runners.length; r++) {

		/* draw & update runners */
    runners[r].draw(r, laneWidth);
    runners[r].update();

    /* draw lanes */
    var y1 = (r / runners.length) * height; // inner line
    var y2 = (r / runners.length) * height + laneWidth; // outer line

		stroke("#A14948");
		strokeWeight(3);

    line(0, y1, width, y1);
    line(0, y2, width, y2);
  }

}

/**
 * returns a random color
 */
function randomColor() {

  return color(random(255), random(255), random(255));
}

/**
 * returns an inverted color of the passed col
 */
function invertColor(col) {

	var r = 255 - red(col);
	var g = 255 - green(col);
	var b = 255 - blue(col);

	return color(r, g, b);
}
