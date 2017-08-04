function Wall(x, w) {

  this.x = x;
  this.w = w;

	this.leftBound = this.x - (this.w / 2);
	this.rightBound = this.x + (this.w / 2);
}

/**
 * draws walls
 */
Wall.prototype.draw = function(y, previousWall) {

	var greenBlue = random(100);
	var red = greenBlue + random(155);
  stroke(red, greenBlue, greenBlue);
	strokeWeight(5);
	noFill();

	/* drawing left */
	beginShape();
	vertex(this.leftBound, y * 10);
	vertex(previousWall.leftBound, y * 10 + 10);
	endShape();

	/* drawing right */
	beginShape();
	vertex(this.rightBound, y * 10);
	vertex(previousWall.rightBound, y * 10 + 10);
	endShape();
};
