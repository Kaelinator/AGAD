
var GRAVITY = 0.1;

var sword;
var fruit = [];

var lives;
var score;

function setup() {
  createCanvas(600, 400);

  sword = new Blade(color("#FFF0EE"));
  frameRate(60);

  lives = 3;
  score = 0;
}

function draw() {
  background(51);

  if (mouseIsPressed) {
    sword.swing(mouseX, mouseY);
  }

  /* push new fruit */
  if (frameCount % 10 === 0)
    if (noise(frameCount) > 0.1)//0.66)
      fruit.push(randomFruit());

  var points = 0;
  for (var i = fruit.length - 1; i >= 0; i--) {

    fruit[i].update();
    fruit[i].draw();

    if (!fruit[i].visible) {
      if (!fruit[i].sliced && !fruit[i].b)
        lives--;

      if (lives < 1)
        endGame();

      fruit.splice(i, 1);
    } else {

      points += (sword.checkForSlice(fruit[i])) ? 1 : 0;
    }

  }

  if (frameCount % 2 === 0)
    sword.update();

  sword.draw();
  score += points;

  drawScore();
  drawLives();
}

function drawLives() {

  stroke(255);
  strokeWeight(3);
  fill("#FF00EE");

  for (var i = lives; i > 0; i--)
    ellipse(width - (i * 20 + 20), 50, 20);

}

function drawScore() {

  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(50);
  text(score, 10, 50);
}

function endGame() {
  noLoop();

  textAlign(CENTER);
  stroke(255);
  strokeWeight(2);
  fill("#FF0000");
  textSize(100);
  text("Game over!", width / 2, height / 2);
  textSize(50);
  text("Press f5 to restart!", width / 2, height / 2 + 60);
}
