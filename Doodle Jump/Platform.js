function Platform(x, a, w, c) {

  this.x = x;
  this.a = a; // altitude

  this.w = w; // width
  this.c = c; // color

  this.onScreen = true;
}

Platform.prototype.draw = function(altitude) {

  stroke(255);
  strokeWeight(3);
  fill(this.c);

  if (altitude - this.a < height / 2) {

    rect(this.x, (altitude - this.a + height / 2) , this.w, 15);
  } else {
    this.onScreen = false;
  }
};

Platform.prototype.collidesWith = function(doodler) {

  var pT = this.a; // platform top
  var dB = doodler.loc.y - doodler.s / 2 ; // doodler bottom

  stroke("#FF0000");
  strokeWeight(10);
  if (Math.abs(pT - dB) < -doodler.vel.y && pT < dB) {

    var pLX = this.x; // platform lefter-most x bound
    var pRX = this.x + this.w; // platform righter-most x bound

    var dLX = doodler.loc.x - doodler.s / 2; // doodler lefter-most x bound
    var dRX = doodler.loc.x + doodler.s / 2; // doodler righter-most x bound

    if ((dLX >= pLX && dLX <= pRX) || (dRX >= pLX && dRX <= pRX))
      return true;
  }

  return false;
};
