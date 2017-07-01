function Asteroid(x, y, s, c) {

  this.pos = createVector(x, y);

  this.s = s; // size
  this.c = c; // color

}

Asteroid.prototype.update = function () {

  var path = createVector(width / 2, height / 2).sub(this.pos);
  // var path = this.pos.sub(0, 0);
  path.setMag(5 - log(this.s));

  this.pos.add(path);

  var d = dist(this.pos.x, this.pos.y, width / 2, height / 2);

  if (d < this.s / 2) {
    endGame();
  }
};

Asteroid.prototype.draw = function () {

  fill(51);
  stroke(this.c);
  strokeWeight(5);

  ellipse(this.pos.x, this.pos.y, this.s);
};
