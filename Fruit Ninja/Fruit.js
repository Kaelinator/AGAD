function Fruit(x, y, s, c, speed, b) {

  this.x = x;
  this.y = y;

  this.c = c; // color
  this.clearC = clearColor(c); // color with no alpha

  this.b = b; // bad fruit

  this.s = s; // size
  this.speed = speed;

  this.xV = randomXV(x);
  this.yV = -6.5; // random(-5, -10);

  this.sliced = false;
  this.visible = true;
}

Fruit.prototype.update = function() {

  this.x += this.xV;
  this.y += this.yV;

  // this.xV *= 0.95;
  this.yV += GRAVITY;

  if (this.y > height) {
    this.visible = false;
  }
};

Fruit.prototype.draw = function() {

  if (this.sliced) {

    if (this.b) {
      /* game over */
      endGame();
    }

    this.c = lerpColor(this.c, color(51), 0.1);
  }

  if (this.b) {
    stroke(0);
    strokeWeight(5);
  } else {
    noStroke();
  }

  fill(this.c);

  ellipse(this.x, this.y, this.s);
};

function randomFruit() {

  var x = random(width);
  var y = height;
  var size = noise(frameCount) * 20 + 20;

  var bad = (random() > 1);

  var r = (bad) ? 225 : 0;
  var g = (bad) ? 0 : noise(frameCount * 2) * 255;
  var b = (bad) ? 0 : noise(frameCount * 3) * 255;

  var col = color(r, g, b);
  var speed = random(3, 5);

  return new Fruit(x, y, size, col, speed, bad);
}

function clearColor(c) {

  var r = red(c);
  var g = green(c);
  var b = blue(c);

  return color(r, g, b, 0);
}

function randomXV(x) {

  if (x > width / 2) {
    return random(-1.5, -0.5);
  } else {
    return random(0.5, 1.5);
  }
}
