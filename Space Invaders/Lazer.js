function Lazer(x, y, yV, e, c) {

  this.pos = createVector(x, y);
  this.yV = yV;

  this.c = c; // color
  this.e = e; // enemy

  this.onScreen = true;
}

Lazer.prototype.update = function() {

  this.pos.y += this.yV;
  this.onScreen = !(this.pos.y < 0 || this.pos.y > height);
};

Lazer.prototype.draw = function() {

  stroke(this.c);
  strokeWeight(5);

  point(this.pos.x, this.pos.y);
};

Lazer.prototype.hits = function(saucer) {

  var d = dist(this.pos.x, this.pos.y, saucer.pos.x, saucer.pos.y);

  return (d < saucer.s);
};
