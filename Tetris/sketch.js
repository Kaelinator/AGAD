
var WIDTH = 10;
var HEIGHT = 20;

var DIMENSION = 20;

var focusBlock;
var score;
var grid;

function setup() {
  createCanvas(WIDTH * DIMENSION, HEIGHT * DIMENSION);

  grid = initGrid();
  score = 0;

  pushBlock();
  frameRate(6);

  textAlign(CENTER);
  console.log(grid);
}

function draw() {
  background(51);

  if (frameCount % 2 === 0) {

    focusBlock.update(true);
    score++;
  }

  focusBlock.update(false);

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j].draw();
    }
  }

  textSize(20);
  fill("#FF0000");
  text(score, width / 2, height);

  if (focusBlock.isGrounded()) {
    if (focusBlock.yOff < 1) {
      noLoop();
      fill("#FF0000");
      noStroke();
      textSize(40);
      text("You lose!", width / 2, height / 2);
      textSize(25);
      text("Press f5 to restart!", width / 2, height / 2 + 20);
    }
    focusBlock.paint(true);
    checkCompleted();
    pushBlock();
  }
}

function pushBlock() {
  focusBlock = new Block(0, 0, random(SHAPES));
}

function shiftRows(index) {

  var rows = grid[0].map(function(col, i) {
    return grid.map(function(row) {
      return row[i];
    });
  });

  for (var i = index; i > 0; i--) {
    rows[i] = rows[i-1];
    for (var j = 0; j < WIDTH; j++) {
      rows[i][j].y++;
    }
  }
  rows[0] = newRow(0);

  grid = rows[0].map(function(col, i) {
    return rows.map(function(row) {
      return row[i];
    });
  });

  checkCompleted();
}

function newRow(index) {

  var row = [];

  for (var i = 0; i < WIDTH; i++) {
    row.push(new Tile(i, index, false));
  }

  return row;
}

function checkCompleted() {

  var rows = grid[0].map(function(col, i) {
    return grid.map(function(row) {
      return row[i];
    });
  });

  y: for (var i = 0; i < HEIGHT; i++) {
    x: for (var j = 0; j < WIDTH; j++) {
      if (!rows[i][j].occupied)
        continue y;
    }

    shiftRows(i);
    break;
  }
}

function keyPressed() {

  switch (keyCode) {

    case LEFT_ARROW:
      focusBlock.move(-1, 0);
      break;

    case RIGHT_ARROW:
      focusBlock.move(1, 0);
      break;

    case UP_ARROW:
      focusBlock.rotate(1);
      break;

    case DOWN_ARROW:
      focusBlock.rotate(-1);
      break;

  }

}

function initGrid() {

  var tileGrid = [];

  for (var i = 0; i < WIDTH; i++) {
    tileGrid[i] = [];
    for (var j = 0; j < HEIGHT; j++) {
      tileGrid[i][j] = new Tile(i, j, false);
    }
  }

  return tileGrid;
}
