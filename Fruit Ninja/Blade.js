function Blade(c) {

  this.swipes = [];

  this.c = c;
}

Blade.prototype.update = function() {

  /* fade swipe */
  if (this.swipes.length > 20) {

    this.swipes.splice(0, 1);
    this.swipes.splice(0, 1);
  } else if (this.swipes.length > 0) {
    this.swipes.splice(0, 1); // delete last value
  }
};

Blade.prototype.checkForSlice = function(f) {

  if (f.sliced || this.swipes.length < 2)
    return false;

  var l = this.swipes.length;

  var d1 = dist(this.swipes[l - 1].x, this.swipes[l - 1].y, f.x, f.y);
  var d2 = dist(this.swipes[l - 2].x, this.swipes[l - 2].y, f.x, f.y);
  var d3 = dist(this.swipes[l - 1].x, this.swipes[l - 1].y, this.swipes[l - 2].x, this.swipes[l - 2].y);

  var sliced = d1 < f.s || ((d1 < d3 && d2 < d3) && (d3 < width / 4));

  f.sliced = sliced;
  return sliced;
};

Blade.prototype.draw = function(p, c) {

  var l = this.swipes.length;

  for (var i = 0; i < l; i++) {

    var s = map(i, 0, this.swipes.length, 2, 20);

    noStroke();
    fill(this.c);
    ellipse(this.swipes[i].x, this.swipes[i].y, s);
  }

};

Blade.prototype.swing = function(x, y) {

  this.swipes.push(createVector(x, y));
};
