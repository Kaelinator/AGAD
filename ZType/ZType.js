
var words = [ "game", "day", "java", "script", "rainbow", "program", "p5", "bunny", "youtube", "github", "gay", "straight" ];

var focus;
var field = [];

var score = 0;

var planetCrust;
var planetMantle;

var ship;

function setup() {

  createCanvas(500, 500);

  planetCrust = randomColor();
  planetMantle = randomColor();
  ship = randomColor();

  field.push(new Asteroid(random(width - 150) + 75, 0, random(words), randomColor()));

  focus = null;
}

function draw() {

  background(51);

  drawBase();
  drawLazer();

  for (var i = field.length - 1; i >= 0; i--) {

    field[i].update();

    if (field[i].intact)
      field[i].draw();
    else {

      score += field[i].text.length;
      field.splice(i, 1); // delete from array
      focus = null;
    }
  }

  if (frameCount % 60 === 0)
    if (noise(frameCount) > map(score, 0, 1000, 0.9, 0.01))
      field.push(new Asteroid(random(width - 150) + 75, 0, random(words), randomColor()));

  /* draw score */
  textAlign(RIGHT);
  noStroke();
  textSize(30);
  fill(255);
  text(score, 50, height / 2);
}

function keyPressed() {

  if (focus) {
    focus.erode(keyCode);
  } else {
    focus = findAsteroid(keyCode, field);
    if (focus) {
      focus.erode(keyCode);
    }
  }
}

function drawBase() {

  /* planet */
  fill(planetMantle);
  stroke(planetCrust);
  strokeWeight(5);
  rect(0, height - 15, width, height);

  /* ground control */
  fill(ship);
  stroke(255);
  beginShape();
  vertex(width / 2 - 20, height);
  vertex(width / 2, height - 50);
  vertex(width / 2 + 20, height);
  endShape(CLOSE);
}

function drawLazer() {

  if (!focus)
    return;

  stroke(randomColor());
  strokeWeight(focus.completedText.length);

  line(width / 2, height - 50, focus.pos.x, focus.pos.y);

  fill(255);
  noStroke();
  textAlign(LEFT);
  textSize(30);
  text(focus.completedText, 10, height - 40);
}

function randomColor() {

  return color(random(255), random(255), random(255));
}

function endGame() {
  noLoop();
  console.log("Game Over!");
}
