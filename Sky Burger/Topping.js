function Topping(x, y, w, color) {

  this.position = createVector(x, y); // position

  this.color = color;

	/* dimensions */
  this.width = w;
  this.height = 25;

  this.stacked = false; // whether or not the Topping is falling
}

/**
 * draws the Toppings
 */
Topping.prototype.draw = function() {

  fill(this.color);
  noStroke();
  ellipse(this.position.x, this.position.y, this.width, this.height);
};

/**
 * adds gravity
 */
Topping.prototype.update = function() {

  if (!this.stacked) {
    this.position.y += 5;
  }
};

/**
 * returns whether or not the Topping stacks upon the top Topping
 */
Topping.prototype.stacksWith = function(top) {

  if (Math.abs(this.position.y - top.position.y) < this.height / 2) {
		// if y values match

		// return whether the Topping's center falls within the Topping's bounds
    return (Math.abs(this.position.x - top.position.x) < this.width / 2)
  }

  return false;
};

/**
 * moves the Topping directly to destination vector
 */
Topping.prototype.moveTo = function(destination) {

  this.position = createVector(destination.x, this.position.y);
};

/**
 * moves the topping relatively to movement vector
 */
Topping.prototype.move = function(movement) {

  this.position.add(movement);
};
