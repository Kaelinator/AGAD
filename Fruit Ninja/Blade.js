function Blade(color) {

  this.swipes = []; // fading blade movement

  this.color = color;
}

/**
 * fades blade movement
 */
Blade.prototype.update = function() {

  /* fade swipe */
  if (this.swipes.length > BLADE_SIZE) { // delete two every other frame

    this.swipes.splice(0, 1);
    this.swipes.splice(0, 1);
  } else if (this.swipes.length > 0) {

    this.swipes.splice(0, 1); // delete last value
  }
};

/**
 * tests whether the passed fruit is sliced by the sword's swipe
 */
Blade.prototype.checkForSlice = function(fruit) {

  if (fruit.sliced || this.swipes.length < 2)
    return false;

  var length = this.swipes.length; // length of sword

	var stroke1 = this.swipes[length - 1]; // latest stroke
	var stroke2 = this.swipes[length - 2]; // second-to-latest stroke

	/* calculate distance from strokes 1 & 2 from fruit */
  var d1 = dist(stroke1.x, stroke1.y, fruit.position.x, fruit.position.y);
  var d2 = dist(stroke2.x, stroke2.y, fruit.position.x, fruit.position.y);

	/* calculate distance from stroke1 to stroke2 */
  var d3 = dist(stroke1.x, stroke1.y, stroke2.x, stroke2.y);

  var sliced = d1 < fruit.size || 			// if stroke1 lands directly on the fruit
							((d1 < d3 && d2 < d3) && 	// if the fruit falls between stroke1 and stroke2
							(d3 < BLADE_LENGTH));			// if there is a new stroke, don't connect the two

  fruit.sliced = sliced; // update fruit's property

  return sliced;
};

/**
 * draws the blade
 */
Blade.prototype.draw = function() {

  var length = this.swipes.length;

  for (var i = 0; i < length; i++) {

    var s = map(i, 0, length, 2, 20); // shrink dots

    noStroke();
    fill(this.color);
    ellipse(this.swipes[i].x, this.swipes[i].y, s);
  }

};

/**
 * swings the sword
 */
Blade.prototype.swing = function(x, y) {

  this.swipes.push(createVector(x, y));
};
