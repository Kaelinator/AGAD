function Block(x, velocity, size, color) {

  this.position = createVector(x, -50);
  this.velocity = velocity;

  this.size = size;
  this.color = color;
}

/**
 * changes position based upon velocity
 */
Block.prototype.update = function() {

  this.position.y += this.velocity;
};

/**
 * returns whether or not the Block was clicked
 * according to passed x and y
 */
Block.prototype.isClicked = function(x, y) {

  var xMaximum = this.position.x + this.size; // righter-most x
  var yMaximum = this.position.y + this.size; // bottom-most y

	// return NOT whether the Block WASN'T clicked
  return !(x < this.position.x || x > xMaximum || y < this.position.y || y > yMaximum);
};

/**
 * returns whether the block is still on-screen or not
 */
Block.prototype.onScreen = function() {

	return this.position.y < height;
};

/**
 * draws the Block
 */
Block.prototype.draw = function() {

  stroke(255);
  strokeWeight(3);

  fill(this.color);

  rect(this.position.x, this.position.y, this.size, this.size);
};
