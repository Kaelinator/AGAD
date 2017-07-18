
var blocks = [];
var score;

function setup() {

  createCanvas(300, 500);
  textAlign(CENTER);

  score = 0;
}

function draw() {
  background(51);

  if (frameCount % 10 === 0) {
    if (random() > noise(score)) {

      blocks.push(new Block(random(width / 2) + width / 4, random(3) + 3, random(40) + 30, rCol()));
    }
  }

  for (var i = blocks.length - 1; i >= 0; i--) {

    if (blocks[i].pos.y < height) {

      blocks[i].update();
      blocks[i].draw();
    } else {

      endGame();
    }
  }

  textSize(50);
  noStroke();
  text(score, width / 2, 50);

}

function mousePressed() {

  for (var i = blocks.length - 1; i >= 0; i--) {

    if (blocks[i].isClicked(mouseX, mouseY)) {

      blocks.splice(i, 1);
      score++;
    }
  }
}

function endGame() {

  noLoop();

  fill(255);
  noStroke();

  textSize(50);
  text("Game Over!", width / 2, height / 2);
}

function rCol() {
  return color(random(255), random(255), random(255));
}
