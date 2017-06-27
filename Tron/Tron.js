
var SCL = 5;

var p1, p2;

function setup() {
  createCanvas(500, 500);

  frameRate(10);

  p1 = new Bike(50 / SCL, height / 2 / SCL, 1, 0, color("#0000FF"));
  p2 = new Bike((width - 50) / SCL, height / 2 / SCL, -1, 0, color("#FF0000"));
}

function draw() {
  background(51);

  p1.update();
  p2.update();

  p1.draw();
  p2.draw();

  if (p1.collidesWith(p2.trail) || p1.collidesWithBounds() || p2.collidesWith(p2.trail)) {
    endGame("Red");
  } else if (p2.collidesWith(p1.trail) || p2.collidesWithBounds() || p1.collidesWith(p1.trail)) {
    endGame("Blue");
  }
}

function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {

    case 37:
      p2.vel = createVector(-1, 0);
      break;

    case 38:
      p2.vel = createVector(0, -1);
      break;

    case 39:
      p2.vel = createVector(1, 0);
      break;

    case 40:
      p2.vel = createVector(0, 1);
      break;

    case 65:
      p1.vel = createVector(-1, 0);
      break;

    case 87:
      p1.vel = createVector(0, -1);
      break;

    case 68:
      p1.vel = createVector(1, 0);
      break;

    case 83:
      p1.vel = createVector(0, 1);
      break;

  }
}

function endGame(winner) {
  noStroke();
  textAlign(CENTER);
  textSize(60);
  fill(255);
  text(winner + " wins!", width / 2, height / 2);
  noLoop();
}
