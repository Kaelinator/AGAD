function Ship(bC, pC) {

  this.a = 0; // angle
  this.aV = 0; // angle velocity

  this.bC = bC; // body color
  this.pC = pC; // perimeter color

}

Ship.prototype.update = function() {

  this.a += this.aV;
  this.aV *= 0.7;
};

Ship.prototype.shoot = function(arr) {

  arr.push(new Lazer(-this.a + PI, 0, 5));
};

Ship.prototype.rot = function(a) {

  this.aV += a;
};

Ship.prototype.draw = function() {

  fill(this.bC);
  strokeWeight(2);
  stroke(this.pC);

  push();

  translate(width / 2, height / 2);
  rotate(this.a);

  beginShape();
  vertex(0, -30);
  vertex(15, 15);
  vertex(-15, 15);
  endShape(CLOSE);

  pop();

};
