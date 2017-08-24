function Basket(x, y) {

	this.position = createVector(x, y);

	this.fluidColor = color("#FFFFFF");
}

Basket.prototype.update = function(x) {

	this.position.x = constrain(x, 0, width);
};

/**
 * draws the Basket
 */
Basket.prototype.draw = function() {

	/* calculate coordinates */
	var leftX = this.position.x - HALF_B_SIZE; // left-most X
	var rightX = this.position.x + HALF_B_SIZE; // right-most X

	var bottomY = this.position.y - HALF_B_SIZE; // bottom-most Y
	var topY = this.position.y + HALF_B_SIZE; // top-most Y

	/* contents */
	fill(this.fluidColor);
	noStroke();
	rect(leftX, this.position.y, B_SIZE, HALF_B_SIZE);

	stroke(255);
	strokeWeight(3);
	noFill();

	/* walls */
	beginShape();
	vertex(leftX, bottomY);
	vertex(leftX, topY);
	vertex(rightX, topY);
	vertex(rightX, bottomY);
	endShape();
};

/**
 * updates the color of fluid within the basket
 */
Basket.prototype.catch = function(ball) {

	/* interpolate current color with Ball color */
	var amount = ball.size * 0.01; // amount to add

	this.fluidColor = lerpColor(this.fluidColor, ball.color, amount);
};
