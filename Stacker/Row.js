function Row(y, c) {

  this.xV = 1;
  this.y = y;

  this.c = c; // count

  this.tiles = [];

  this.dynamic = true;

  this.initRow(c);
}

Row.prototype.update = function() {

  if (this.xV > 0) {
    /* moving to the right */

    for (var x = WIDTH - 1; x >= 0; x--) {

      if (this.tiles[x]) {

        if (x < WIDTH - 1) {

          if (this.tiles[x + 1]) {

            this.reverse();
          } else {

            this.tiles[x] = false;
            this.tiles[x + 1] = true;
          }
        } else {

          this.reverse();
        }
      }
    }
  } else {
    /* moving to the left */

    for (var x = 0; x < WIDTH; x++) {

      if (this.tiles[x]) {

        if (x > 0) {

          if (this.tiles[x - 1]) {

            this.reverse();
          } else {

            this.tiles[x] = false;
            this.tiles[x - 1] = true;
          }
        } else {

          this.reverse();
        }
      }
    }
  }
};

Row.prototype.draw = function(size) {

  for (var x = 0; x < WIDTH; x++) {

    if (this.tiles[x])
      rect(x * size, height - ((this.y + 1) * size), size, size);
  }
};

Row.prototype.stop = function(r) {

  if (r) {

    var tC = 0;
    for (var x = 0; x < WIDTH; x++) {

      if (this.tiles[x] && r.tiles[x]) {

        this.tiles[x] = true;
        tC++;
      } else {
        this.tiles[x] = false;
      }
    }

    this.dynamic = false;
    return tC;
  } else {

    this.dynamic = false;
    return this.c;
  }

};

Row.prototype.reverse = function() {

  this.xV *= -1;
  this.update();
  this.update();
};

Row.prototype.initRow = function(c) {

  for (var x = 0; x < WIDTH; x++) {

    this.tiles.push((x < c));
  }
};
