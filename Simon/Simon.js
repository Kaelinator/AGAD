
var SCL = 175;

var pattern = [];
var tiles = [];
var input = [];

var demonstrating;
var time;
var dIndex;
var score;

var playing;

function setup() {
  createCanvas(500, 500);

  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {

      var r = (i % 2 === 0) ? 0 : random(155) + 50;
      var g = (j % 2 === 0) ? 0 : random(155) + 50;
      var b = random(155) + 50;

      var c = color(r, g, b);
      var bC = color(r + 50, g + 50, b + 50);
      tiles.push(new Tile(i * SCL + SCL, j * SCL + SCL, SCL, c, bC));
    }
  }

  playing = true;
  score = -1;
  newTile();

  textAlign(CENTER);
}

function draw() {
  background(51);

  for (var i = 0; i < tiles.length; i++) {
    if (demonstrating) {

      tiles[i].draw(pattern[dIndex] == i);

    } else {

      tiles[i].draw(i == input[input.length - 1]);
    }
  }


  time++;
  if (time % 60 === 0)
    dIndex++;

  if (dIndex >= pattern.length) {
    dIndex = 0;
    demonstrating = false;
  }

  textSize(30);
  fill(255);
  text(score, width / 2, height - 50);

  if (!playing) {

    textSize(50);
    fill(255);
    text("Game Over!", width / 2, height - 20);
  }
}

function mousePressed() {

  if (demonstrating)
    return;

  var t = getTile(tiles, mouseX, mouseY);

  if (t != -1)
    input.push(t);

  for (var i = 0; i < input.length; i++) {
    if (input[i] != pattern[i])
      endGame();
  }

  if (input.length == pattern.length)
    newTile();
}

function newTile() {

  pattern.push(Math.floor(random() * tiles.length));
  input = [];
  score++;
  demonstrating = true;
  dIndex = 0;
  time = 0;
}

function endGame() {

  playing = false;
  noLoop();
}
