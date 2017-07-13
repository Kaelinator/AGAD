
var player;
var projs = [];

var speed = 2;

function setup() {

  createCanvas(600, 400);

  var wo2 = width / 2;
  var ho2 = height / 2;

  textAlign(CENTER);
  player = new Square(wo2, ho2, 30, color("#FFFFFF"), null);

  textSize(40);
}

function draw() {

  background(51);

  if (frameCount % 30 === 0) {

    if (random(speed) > 1.25)
      projs.push(genSquare());
    speed += 0.05;
  }

  for (var i = projs.length - 1; i >= 0; i--) {

    projs[i].update();
    projs[i].draw();

    if (projs[i].collidesWith(player))
      endGame();

    if (projs[i].isOffscreen())
      projs.splice(i, 1);

  }

  noStroke();
  text(frameCount, width / 2, 60);

  player.update();
  player.draw();

  if (player.isOffscreen()) {
    endGame();
  }

  handleKeys();
}

function handleKeys() {

  if (keyIsDown(UP_ARROW))
    player.move(createVector(0, -speed * 0.8));

  if (keyIsDown(DOWN_ARROW))
    player.move(createVector(0, speed * 0.8));

  if (keyIsDown(LEFT_ARROW))
    player.move(createVector(-speed * 0.8, 0));

  if (keyIsDown(RIGHT_ARROW))
    player.move(createVector(speed * 0.8, 0));

}

function endGame() {

  noLoop();
  textSize(70);
  fill(255);
  noStroke();
  text("Game Over!", width / 2, height / 2);
  textSize(40);
}

function genSquare() {

  /* create square */
  var plane = (random() > 0.5); // true = x-axis, false = y-axis

  var x = (plane) ? random(width) : ((random() > 0.5) ? 0 : width);
  var y = (plane) ? ((random() > 0.5) ? 0 : height) : random(height);

  return new Square(x, y, random(35), rCol(), player.pos);
}

function rCol() {
  return color(random(255), random(255), random(255));
}
