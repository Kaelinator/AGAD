function Asteroid(x, y, text, color) {

  this.position = createVector(x, y);

  this.color = color; // color

  this.text = text; // text do be typed
  this.size = text.length * 15; // size

  this.completedText = ""; // text which the user has correctly inputted

  this.intact = true; // whether the astroid is on-screen or not
}

/**
 * moves Astroid down the screen
 */
Asteroid.prototype.update = function() {

	// make speed based upon score
	this.position.y += map(score, 0, 1000, 1, 15);

  if (this.position.y > height) {
    endGame();
  }
};

/**
 * based upon keyCode, will add to the completedText
 */
Asteroid.prototype.erode = function(keyCode) {

  var inputChar = String.fromCharCode(keyCode).toLowerCase(); // keyCode to char
  var length = this.completedText.length + 1;

  if (this.text.substring(0, length) === this.completedText + inputChar) // if the character matches text
    this.completedText += inputChar;

  this.intact = (this.completedText !== this.text); // update intact
};

/**
 * draws Astroid
 */
Asteroid.prototype.draw = function() {

  fill(this.color);

  stroke(0);
  strokeWeight(3);
  ellipse(this.position.x, this.position.y, this.size);

  noStroke();
  textAlign(CENTER);
  textSize(20);
  fill(255);
  text(this.text, this.position.x, this.position.y);
};

/**
 * figures out which Astroid within the field array
 * should be targeted
 */
function findAsteroid(code, field) {

  var char = String.fromCharCode(code).toLowerCase();

  for (var i = 0; i < field.length; i++) {
    if (field[i].text.startsWith(char)) {

      return field[i];
    }
  }

  return null;
}
