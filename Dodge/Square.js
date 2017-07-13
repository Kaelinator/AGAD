function Square(x, y, d, c, player) {

  this.pos = createVector(x, y);

  this.vel = setVelocity(this.pos, player);

  this.p = player;

  this.d = d; // dimensions
  this.c = c; // color
}

Square.prototype.update = function() {

  this.pos.add(this.vel);

  if (!this.p) {

    this.vel.x *= 0.5;
    this.vel.y *= 0.5;
  }

};

Square.prototype.draw = function() {

  fill(this.c);
  stroke(255);
  strokeWeight(3);

  rect(this.pos.x, this.pos.y, this.d, this.d);
};

Square.prototype.isOffscreen = function() {

  return (this.pos.x < 0 || this.pos.x > width ||
      this.pos.y < 0 || this.pos.y > height);
}

Square.prototype.collidesWith = function(s) {

  var tX = this.pos.x + this.d / 2;
  var tY = this.pos.y + this.d / 2;

  return !(tX < s.pos.x || tX > s.pos.x + s.d ||
      tY < s.pos.y || tY > s.pos.y + s.d);
};

Square.prototype.move = function(v) {

  this.vel.add(v);
};

function setVelocity(s, p) {

  if (p) {

    var vel = createVector(p.x - s.x, p.y - s.y);
    vel.setMag(speed);

    return vel;
  }

  return createVector(0, 0);
}
