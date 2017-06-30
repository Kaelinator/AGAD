function Asteroid(x, y, text, c) {

  this.pos = createVector(x, y);

  this.c = c; // color

  this.text = text;
  this.s = text.length * 10; // size

  this.completedText = "";

  this.intact = true;
}

Asteroid.prototype.update = function() {

  if (this.pos.y++ > height) {
    endGame();
  }
};

Asteroid.prototype.erode = function(code) {

  var char = String.fromCharCode(code).toLowerCase();
  var l = this.completedText.length + 1;

  if (this.text.substring(0, l) === this.completedText + char)
    this.completedText += char;

  this.intact = (this.completedText !== this.text);
};

Asteroid.prototype.draw = function() {

  fill(this.c);

  stroke(0);
  strokeWeight(3);
  ellipse(this.pos.x, this.pos.y, this.s);

  noStroke();
  textAlign(CENTER);
  textSize(20);
  fill(255);
  text(this.text, this.pos.x, this.pos.y);
};

function findAsteroid(code, arr) {

  var char = String.fromCharCode(code).toLowerCase();

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].text.startsWith(char)) {
      return arr[i];
    }
  }

  return null;
}
