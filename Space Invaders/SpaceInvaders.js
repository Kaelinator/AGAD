
var COOLDOWN = 30;

var shuttle;
var score;
var aliens = [];

var speed;
var movement;

function setup() {
  createCanvas(600, 400);

  shuttle = new Saucer(width / 2, height - 20, 20, 3, "#FFFFFF", false);

  aliens = initFleet(10, 1, 20);
  score = 0;

  speed = 0.01;
  movement = 0;

  textAlign(CENTER);
}

function draw() {
  background(51);

  var yChange = random(speed * 5);
  for (var i = aliens.length - 1; i >= 0; i--) {

    if (random() < aliens[i].sh * 0.001)
      aliens[i].shoot();

    if (aliens[i].intact) {

      aliens[i].move(sin(movement * 0.01) * 0.3, yChange);

      aliens[i].update(aliens.concat(shuttle));
      aliens[i].draw();
    } else {

      score += (aliens[i].e) ? aliens[i].sh : 0;

      aliens.splice(i, 1);
    }
  }

  movement++;

  if (aliens.length < 1) {

    speed += 0.01
    aliens = initFleet(10, speed * 100, 20);
    movement = 0;
  }

  shuttle.update(aliens.concat(shuttle));
  shuttle.draw();

  if (!shuttle.intact) {
    endGame();
  }

  textSize(35);
  fill(255);
  noStroke();
  text(score, width / 2, 40);

  handleKeys();
}

function handleKeys() {

  if (keyIsDown(LEFT_ARROW))
    shuttle.move(-1, 0);

  if (keyIsDown(RIGHT_ARROW))
    shuttle.move(1, 0);

}

function keyPressed() {

  if (keyCode === 32) {

    shuttle.shoot();
  }
}

function rCol() {
  return color(random(255), random(255), random(255));
}

function initFleet(w, h, size) {

  var fleet = [];

  var yOff = height / 2;

  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {

      fleet.push(new Saucer(x * size * 2 + size, yOff - (y * size * 2), size,
        Math.floor(random(9) + 3), rCol(), true));
    }
  }

  return fleet;
}

function endGame() {
  noLoop();
  textSize(100);
  fill(255);
  noStroke();

  text("Game Over!", width / 2, height / 2);
}
