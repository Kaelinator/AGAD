function Sprinter(skill, color) {

  this.distance = 0; // distance traveled by the runner
  this.speed = 0; // acceleration (amount of velocity gained each "stride")
  this.velocity = 0; // "momentum"

	/** AI variables */
  this.skill = skill; // chance of correctly striding
  this.previousKey = null;

  this.color = color;
  this.finished = false; // whether to recieve input or draw the time
  this.time = 0; // stopwatch
}

/**
 * draws the runner
 */
Sprinter.prototype.draw = function(lane, laneWidth) {

  var y = (lane * laneWidth) + (laneWidth / 2); // figure out y

  fill(this.color);
  stroke(255);
  strokeWeight(2);
  ellipse(this.distance, y, laneWidth / 2);

  if (this.finished) {
		// draw the time

    textSize(laneWidth / 2);
    noStroke();
    fill(255);
    textAlign(RIGHT);
    text((this.time / 1000).toFixed(2), width - laneWidth, y);
  }
};

/**
 * handles distance based upon velocity,
 * handles velocity based upon speed & resistance
 * handles finish, stops stopwatch
 */
Sprinter.prototype.update = function() {

  if (this.finished) {
		// don't allow movement
		return;
	} else {

    if (this.finished = (this.distance > width)) // set whether the runner finished the race
      this.time = new Date().getTime() - startTime; // stop stopwatch
  }

	/* move the Sprinter */
  this.velocity = (this.velocity > 3) ? 3 : this.velocity; // constrain velocity

  this.distance += this.velocity; // movement
  this.velocity += this.speed; // acceleration
  this.velocity *= 0.99; // resistance
  this.speed = 0; // reset acceleration
};

/**
 * handles key press & previousKey
 * accelerates the runner
 */
Sprinter.prototype.run = function(key) {

  if (this.previousKey != null) { // only if they've strided in the past

		// LEFT_ARROW + RIGHT_ARROW = 76, therefore;
		// 76 - LEFT_ARROW = RIGHT_ARROW &
		// 76 - RIGHT_ARROW = LEFT_ARROW
    if (this.previousKey != key && (this.previousKey + key === 76)) {
			// they've tapped the correct key

      this.speed += (this.velocity / 75 + 0.06); // accelerate
    } else {
			// they've pressed the wrong key

			/* cut off momentum */
      this.speed = 0;
      this.velocity = 0;
    }

  } else {
		// no previous key press

    this.speed += (this.velocity / 75 + 0.06);
  }

	// keep track of key
  this.previousKey = key;
};
