
var gridWidth = 5;
var gridHeight = 5;

var grid = [];
var path = [];
var steps = [];

var size;

var state; // 0 = animation & 1 = playing
var animation;
var score;
var time;

function setup() {
  createCanvas(window.innerWidth - 50, window.innerHeight - 50);

  score = 1;
  time = 60;

  initGrid();
  newPath();

  textAlign(CENTER);
  textSize(size * 0.8);
}

function draw() {
  background(51);

  if (state === 0)
    animate();

  drawGrid();

  if (!onPath())
    endGame();

  if (steps.length === path.length) {

    nextLevel();
  }

  noStroke();
  fill("#FF0000");
  text("Level " + score, width / 2, size);
}

function mousePressed() {

  if (state === 0)
    return;

  var tile = null;

  for (var x = 0; x < gridWidth; x++)
    for (var y = 0; y < gridHeight; y++)
      if (grid[x][y].clickedBy(mouseX, mouseY))
        tile = grid[x][y];

  if (tile == null)
    return;

  steps.push(tile);

  grid[tile.x][tile.y].lit = true;
}

function drawGrid() {

  strokeWeight(4);
  stroke(255);

  for (var x = 0; x < gridWidth; x++) {
    for (var y = 0; y < gridHeight; y++) {

      if (grid[x][y].lit)
        fill(200);
      else
        noFill();

      rect(x * size, y * size, size, size);
    }
  }

}

function animate() {
  animation++;

  var route = Math.floor(animation / time);

  if (route >= path.length) {

    state = 1; // done animating
    initGrid();
    return;
  }

  var tile = path[route];
  grid[tile.x][tile.y].lit = true;
}

function newPath() {

  initGrid();
  state = 0; // animating
  animation = 0; // time
  path = [];
  steps = [];

  console.log(gridHeight);
  path.push(new Tile(0, gridHeight - 1, true));

  while (path[path.length - 1].y !== 0) {

    var pool = [];
    var prevTile = path[path.length - 1];

    var left = new Tile(prevTile.x - 1, prevTile.y, true);
    var right = new Tile(prevTile.x + 1, prevTile.y, true);
    var up = new Tile(prevTile.x, prevTile.y - 1, true);

    if (left.x >= 0 && !arrIncludes(path, left))
      pool.push(left);

    if (right.x < gridWidth && !arrIncludes(path, right))
      pool.push(right);

    if (up.y < gridHeight && !arrIncludes(path, up))
      pool.push(up);

    path.push(random(pool));
  }
}

function onPath() {

  for (var i = 0; i < steps.length; i++)
    if (path[i].x !== steps[i].x || path[i].y !== steps[i].y)
      return false;

  return true;
}

function initGrid() {

  grid = [];

  size = Math.min(width / gridWidth, height / gridHeight);

  for (var x = 0; x < gridWidth; x++) {
    var col = [];
    for (var y = 0; y < gridHeight; y++) {

      col.push(new Tile(x, y, false));
    }
    grid.push(col);
  }

};

function nextLevel() {

  score++;
  gridWidth++;
  gridHeight++;
  newPath();
  time /= 1.25;
  initGrid();
}

function endGame() {

  noStroke();
  fill("#FF0000");
  text("Game Over!", width / 2, height / 2);
  noLoop();
}

function arrIncludes(pool, tile) {

  var t = JSON.stringify(tile);
  for (var i = 0; i < pool.length; i++)
    if (JSON.stringify(pool[i]) === t)
      return true;

  return false;
}
