
var speed;

var bugs = [];

var score;
var playing;

function setup() {

  createCanvas(400, 600);

  score = 0;
  speed = 3;
  playing = true;

  textSize(30);
}

function draw() {

  background(51);

  if (frameCount % 60 === 0)
    if (random() > 0.6)
      bugs.push(new Insect(random(width / 2) + width / 4, (random() > 0.8)));

  if (frameCount % 600 === 0)
    speed++;

  for (var i = bugs.length - 1; i >= 0; i--) {

    bugs[i].update();
    bugs[i].draw();


    if (bugs[i].pos.y > height && !bugs[i].type)
      endGame();

    if (bugs[i].squashed) {

      bugs.splice(i, 1);
      score++;
    }
  }

  /* draw score */
  fill(255);
  noStroke();
  text(score, 10, 40);

  if (!playing) {

    fill(255);
    noStroke();
    textSize(60);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2);
    textAlign(LEFT);
    textSize(30);
  }
}

function mousePressed() {

  for (var i = 0; i < bugs.length; i++) {

    bugs[i].squashed = bugs[i].squashedBy(mouseX, mouseY);

    if (bugs[i].squashed && bugs[i].type)
      endGame();
  }
}

function endGame() {

  playing = false;
  noLoop();
}
