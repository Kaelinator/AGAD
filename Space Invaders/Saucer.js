function Saucer(x, y, s, sh, c, e) {

  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.s = s; // size
  this.sh = sh; // shape
  this.c = c; // color
  this.e = e; // enemy?

  this.cd = 30; // cooldown

  this.intact = true;

  this.lazers = [];
}

Saucer.prototype.update = function(allShips) {

  this.vel.add(this.acc);
  this.pos.add(this.vel);

  this.acc = createVector(0, 0);
  this.vel.mult(0.7);

  for (var i = this.lazers.length - 1; i >= 0; i--) {

    if (this.lazers[i].onScreen) {

      this.lazers[i].update();
      this.lazers[i].draw();
    } else {

      this.lazers.splice(i, 1);
      continue;
    }

    for (var j = 0; j < allShips.length; j++) {

      if (this.lazers[i].hits(allShips[j]) &&
      this.lazers[i].e != allShips[j].e) {

        allShips[j].intact = false;
        this.lazers.splice(i, 1);
        break;
      }
    }
  }

  this.cd++;
};

Saucer.prototype.draw = function() {

  stroke(255);
  strokeWeight(3);
  fill(this.c);

  var step = TWO_PI / this.sh;

  beginShape();

  for (var i = PI; i < TWO_PI + PI; i += step)
    vertex((sin(i) * this.s) + this.pos.x, (cos(i) * this.s) + this.pos.y);

  endShape(CLOSE);

};

Saucer.prototype.shoot = function() {

  if (this.cd > COOLDOWN) {

    this.lazers.push(new Lazer(this.pos.x, this.pos.y, (this.e) ? 3 : -3, this.e, rCol()));
    this.cd = 0;
  }
};

Saucer.prototype.move = function(x, y) {

  this.acc = createVector(x, y);
};
