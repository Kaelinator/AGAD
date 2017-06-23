function Wall(x, w) {

  this.x = x;
  this.w = w;
}


Wall.prototype.leftBound = function() {

  return this.x - (this.w / 2);
};

Wall.prototype.rightBound = function() {

  return this.x + (this.w / 2);
};
