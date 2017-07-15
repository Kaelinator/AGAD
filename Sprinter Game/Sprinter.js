function Sprinter(s, c) {

  this.distance = 0;
  this.speed = 0;
  this.vel = 0;

  this.skill = s;

  this.prevKey = null;

  this.c = c;
  this.finished = false;
  this.time = 0;
}

Sprinter.prototype.draw = function(lane) {

  var y = (lane * w) + (w / 2);

  fill(this.c);
  stroke(255);
  strokeWeight(2);
  ellipse(this.distance, y, w / 2);

  if (this.finished) {

    textSize(w/2);
    noStroke();
    fill(255);
    textAlign(RIGHT);
    text((this.time / 1000).toFixed(2), width - w, y);
  }
};

Sprinter.prototype.update = function() {

  if (this.finished)
    return;
  else {

    if (this.finished = (this.distance > width))
      this.time = new Date().getTime() - startTime;
  }

  this.vel = (this.vel > 3) ? 3 : this.vel;

  this.distance += this.vel;
  this.vel += this.speed;
  this.vel *= 0.99;
  this.speed = 0;
};

Sprinter.prototype.run = function(key) {

  if (this.prevKey != null) {

    if (this.prevKey !== key && (this.prevKey + key === 76)) {

      this.speed += (this.vel / 75 + 0.06);
    } else {

      this.speed = 0;
      this.vel = 0;
    }

  } else {

    this.speed += (this.vel / 75 + 0.06);
  }

  this.prevKey = key;
};
