function Bike(x, y, xV, yV, c) {

  this.trail = [];

  this.c = c;

  this.loc = createVector(x, y);
  this.vel = createVector(xV, yV);
}

Bike.prototype.draw = function() {

  noStroke();
  fill(this.c);

  for (var i = 0; i < this.trail.length; i++) {

    rect(this.trail[i].x * SCL, this.trail[i].y * SCL, SCL, SCL);
  }
};

Bike.prototype.update = function() {

  this.trail.push(createVector(this.loc.x, this.loc.y));
  this.loc.add(this.vel);
};

Bike.prototype.collidesWith = function(trail) {

  for (var i = 0; i < trail.length; i++) {

    var d = dist(trail[i].x, trail[i].y, this.loc.x, this.loc.y);
    if (d < 1)
      return true;
  }

  return false;
};

Bike.prototype.collidesWithBounds = function() {
  if (this.loc.x < 0 || this.loc.x > width / SCL ||
  this.loc.y < 0 || this.loc.y > height) {
    return true;
  }

  return false;
};
