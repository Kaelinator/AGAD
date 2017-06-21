function Bird(x, y, r) {

  this.x = x;
  this.y = y;

  this.r = r;

  this.yV = 0; // velocity
}

Bird.prototype.update = function() {

  this.yV += GRAVITY;

  this.y += this.yV;
};

Bird.prototype.hop = function(f) {

  this.yV = 0;
  this.yV += f;
};

Bird.prototype.collidesWith = function(pipe) {

  if (pipe.x - this.x <= this.r && pipe.x - this.x >= -this.r) {

    var uH = pipe.hole - pipe.w / 2;
    var lH = pipe.hole + pipe.w / 2;

    return (this.y - this.r < uH || this.y + this.r > lH);
  }

  return false;

};

Bird.prototype.draw = function() {

  stroke(40);
  strokeWeight(3);
  fill(255);
  ellipse(this.x, this.y, this.r * 2);
};
