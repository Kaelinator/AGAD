function Doodler(x, a, enemy, s, c) {

  this.loc = createVector(x, a);
  this.vel = createVector(0, 0);

  this.maxA = a;  // max altitude
  this.preMaxA = a; // previous max altitude

  this.force = 12;

  this.c = c; // color
  this.s = s; // size

  this.enemy = enemy;

  this.onScreen = true;
}

Doodler.prototype.update = function() {

  if (this.enemy) {

    // this.loc.x += this.speed;
    // this.loc.x %= width;
    console.log("flag");
  } else {

    this.loc.add(this.vel);
    this.vel.x *= 0.8;

    this.maxA = (this.loc.y > this.maxA) ? this.loc.y : this.maxA;
  }

};

Doodler.prototype.jump = function() {

  this.vel.y *= 0;

  if (this.preMaxA == this.maxA) {

    this.force = constrain(this.force + 1, 12, 16);
  } else {
    this.force = 12;
  }

  this.applyForce(createVector(0, this.force));

  this.preMaxA = this.maxA;
};

Doodler.prototype.applyForce = function(force) {

  this.vel.add(force);
};

Doodler.prototype.collidesWith = function(doodler) {

  var d = dist(doodler.loc.x, doodler.loc.y, this.loc.x, this.loc.y);

  if (d < (this.s / 2 + doodler.s / 2)) {

    if (doodler.loc.y < this.loc.y) {

      endGame();
      return false;
    } else {
      return true;
    }
  }
};

Doodler.prototype.draw = function(altitude) {

  stroke(255);
  strokeWeight(3);
  fill(this.c);

  if (this.enemy) {

    if (altitude - this.loc.y < height) {

      ellipse(this.loc.x, altitude - this.loc.y + height / 2, this.s);
    } else {
      this.onScreen = false;
    }
  } else {

    ellipse(this.loc.x, height / 2, this.s);
  }

};
