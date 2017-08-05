function Fruit(x, y, size, color, bad) {

	this.position = createVector(x, y);

  this.color = color; // original color

  this.bad = bad; // bad fruit

  this.size = size; // size

	this.velocity = createVector(randomXVelocity(x), random(-7, -11));

  this.sliced = false;
	this.slicedTime = 0; // keep track of fade

  this.visible = true;
}

/**
 * handles position, velocity, visibility, and slice time
 */
Fruit.prototype.update = function() {

  this.position.add(this.velocity);

  this.velocity.x *= 0.99; // air resistance
  this.velocity.y += GRAVITY; // gravity

	this.visible = (this.position.y < height); // update visibility

	if (this.sliced) {

		this.slicedTime++; // update sliced time
	}
};

/**
 * draws fruit, handles fading
 */
Fruit.prototype.draw = function() {

	var fillColor = this.color;
  if (this.sliced) {

    if (this.bad) {
      /* game over */
      endGame();
    }

		var interp = constrain(this.slicedTime, 0, 15) / 15; // how much to interpolate

		// lerp to background color
    fillColor = lerpColor(this.color, color(51), interp);
  }

	/* determine stroke based upon bad */
  if (this.bad) {

    stroke(0);
    strokeWeight(5);
  } else {

    noStroke();
  }

	/* draw */
  fill(fillColor);
  ellipse(this.position.x, this.position.y, this.size);
};

/**
 * returns a random fruit
 */
function randomFruit() {

	/* randomize position */
  var x = random(width);
  var y = height;

  var size = noise(frameCount) * 20 + 20; // random size

  var bad = (random() > BAD_FRUIT_PROBABILITY); // good or bad

	/* base color upon bad */
  var r = (bad) ? 225 : 0;
  var g = (bad) ? 0 : noise(frameCount * 2) * 255;
  var b = (bad) ? 0 : noise(frameCount * 3) * 255;

  var col = color(r, g, b); // color

  return new Fruit(x, y, size, col, bad); // return fruit
}

/**
 * returns velocity to always point toward center
 */
function randomXVelocity(x) {

  if (x > width / 2) {

    return random(-1.5, -0.5);
  } else {

    return random(0.5, 1.5);
  }
}
