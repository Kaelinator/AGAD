
var field = [];
var bullets = [];

var score;
var ship;

function setup() {
  createCanvas(640, 480);

  translate(width / 2, height / 2);

  ship = new Ship(randomColor(), randomColor());
  score = 0;
}

function draw() {
  background(51);

  handleKeys();

  if (frameCount % 30 === 0) {
    if (random() > 0.7) {
      // var x = random() > 0.5 ?
      var r = random();
      var x = (r > 0.5) ? random(width) : (random() > 0.5) ? 0 : width;
      var y = (r < 0.5) ? random(height) : (random() > 0.5) ? 0 : height;
      field.push(new Asteroid(x, y, noise(frameCount) * 100, randomColor()));
    }
  }

  for (var i = field.length - 1; i >= 0; i--) {

    field[i].update();
    field[i].draw();

    for (var j = bullets.length - 1; j >= 0; j--) {

      if (bullets[j].penetrates(field[i])) {

        field.splice(i, 1);
        bullets.splice(j, 1);
        score++;
        break;
      }
    }
  }

  for (var q = bullets.length - 1; q >= 0; q--) {

    if (bullets[q].onScreen) {

      bullets[q].update();
      bullets[q].draw();
    } else {
      bullets.splice(q, 1);
    }
  }

  ship.update();
  ship.draw();

  noStroke();
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text(score, 50, 100);
}

function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {

    ship.rot(-0.05);
  } else if (keyIsDown(RIGHT_ARROW)) {

    ship.rot(0.05);
  }
}

function keyPressed() {

  switch (keyCode) {

    case 32:
      ship.shoot(bullets);
      break;
  }
}

function endGame() {

  noLoop();
  noStroke();
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text("Game Over!", width / 2, height / 2);
}

function randomColor() {

  return color(random(255), random(255), random(255));
}
