
function Topping(x, y, c) {

  this.pos = createVector(x, y); // position

  this.c = c; // color

  this.w = 100;
  this.h = 25;

  this.stacked = false;
}

Topping.prototype.draw = function() {

  fill(this.c);
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.w, this.h);

};

Topping.prototype.update = function() {

  if (!this.stacked) {
    this.pos.y += 5;
  }
};

Topping.prototype.stacksWith = function(top) {

  if (Math.abs(this.pos.y - top.pos.y) < this.h / 2) {

    return (Math.abs(this.pos.x - top.pos.x) < this.w / 2)
  }

  return false;
};

Topping.prototype.moveTo = function(to) {

  this.pos = createVector(to.x, this.pos.y);
};

Topping.prototype.move = function(m) {

  this.pos.add(m);
};
