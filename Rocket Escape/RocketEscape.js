
var SIZE = 30;

var fidelity;

var walls = [];

var speed;
var rocket;

function setup() {

  createCanvas(400, 800);

  fidelity = height / 10;

  rocket = new Rocket(noise(0) * width, height - SIZE, SIZE);
  speed = 5;

  frameRate(30);
  textAlign(CENTER);
}

function draw() {
  background(51);

  handleKeys();

  handleWalls();

  /* handle rocket */
  rocket.update();
  rocket.draw();

  /* draw score */
  textSize(30);
  noStroke();
  text(frameCount, width / 2, fidelity);

  /* move walls */
  walls.push(new Wall(noise((frameCount / 2 + fidelity) * 0.05) * width, width / 2));
  walls.push(new Wall(noise(((frameCount + 1) / 2 + fidelity) * 0.05) * width, width / 2));

}

function handleWalls() {

  var y = 0;
  for (var i = walls.length - 1; i >= 0; i -= 2) {

    /* draw walls */
    stroke(255);
    strokeWeight(5);
    noFill();

    beginShape();
    vertex(walls[i].leftBound(), y * 10);
    vertex(walls[i - 1].leftBound(), y * 10 + 10);
    endShape();

    beginShape();
    vertex(walls[i].rightBound(), y * 10);
    vertex(walls[i - 1].rightBound(), y * 10 + 10);
    endShape();

    /* check collision */
    if (y == fidelity) {
      if (rocket.collidesWith(walls[i])) {
        noLoop();
        noStroke();
        fill("#0000FF");
        textSize(60);
        text("Game Over!", width / 2, height / 2);
        textSize(40);
        text("Press f5 to restart!", width / 2, height / 2 + 50);
      }
    }

    y++;

    if (i < walls.length - fidelity * 2)
      walls.splice(i, 2);
  }
}

function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {
    rocket.move(-1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    rocket.move(1);
  }
}
