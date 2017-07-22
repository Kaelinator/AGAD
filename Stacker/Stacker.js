
const WIDTH = 7;

var grid = [];

var score;
var playing;

function setup() {

  createCanvas(540, 720);
  initGrid();
  frameRate(5);

  textAlign(CENTER);
  textSize(50);

  score = 0;
  playing = true;
}

function draw() {

  background(51);

  handleGrid();

  noStroke();
  fill("#FFFF00");
  text(score, width / 2, 70);

  if (!playing) {

    noStroke();
    fill("#FFFF00");
    textSize(90);
    text("Game Over!", width / 2, height / 2);
    textSize(50);
  }
}

function keyPressed() {

  if (keyCode === 32) {

    var y = grid.length - 1;
    var c = grid[y].stop(grid[y - 1]);

    if (c < 1) {

      endGame();
      return;
    }

    frameRate(5 + score);

    if (++y > 5) {

      for (var i = 0; i < y; i++) {

        grid[i].y--;
      }
    }

    score = y;

    grid.push(new Row((y > 5) ? 5 : y, c));
  }
}

function handleGrid() {

  var size = width / WIDTH;

  fill("#FF0000");
  stroke(255);
  strokeWeight(3);

  for (var y = 0; y < grid.length; y++) {

    if (grid[y].dynamic)
      grid[y].update();

    grid[y].draw(size);
  }
}

function endGame() {

  noLoop();

  playing = false;
}

function initGrid() {

  grid = [];

  grid.push(new Row(0, 3));
}
