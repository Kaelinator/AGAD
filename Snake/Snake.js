
var SCL = 20;
var wOs, hOs; // width over SCL, height over SCL

var snake = [];

var dir;
var score;
var food;

function setup() {

  createCanvas(500, 500);

  wOs = width / SCL;
  hOs = height / SCL;

  snake.push(createVector(Math.floor(wOs / 2), Math.floor(hOs / 2)));

  dir = createVector(-1, 0);
  score = 0;
  food = newFood();

  textAlign(CENTER);
  textSize(SCL);

  frameRate(5);
}

function draw() {

  background(51);

  handleSnake();

  paint();
}

function handleSnake() {

  snake.unshift(snake[0].copy().add(dir));

  if (snake[0].x == food.x && snake[0].y == food.y) {
    /* snake ate food */

    food = newFood();
    score++;
  } else {

    snake.splice(snake.length - 1, 1);
  }

  for (var i = 0; i < snake.length; i++) {
    for (var j = 0; j < snake.length; j++) {
      if (j != i && snake[j].equals(snake[i])) {
        /* dead! */
        gameOver();
      }
    }
  }

  if (snake[0].x > wOs || snake[0].x < 0 ||
      snake[0].y > hOs ||  snake[0].y < 0) {
    gameOver();
  }


}

function gameOver() {

  noLoop();
  textSize(60);
  text("You lose!", width / 2, height / 2);
  textSize(30);
  text("Press f5 to restart!", width / 2, height / 2 + 50);
}

function paint() {

  /* draw snake */
  fill(255);
  for (var j = 0; j < snake.length; j++) {
    rect(snake[j].x * SCL, snake[j].y * SCL, SCL, SCL);
  }

  /* draw food */
  fill(random(255), 0, random(255));
  rect(food.x * SCL, food.y * SCL, SCL, SCL);

  /* draw score */
  text(score, SCL, height - SCL);
}

function newFood() {

  return createVector(Math.floor(random(wOs)), Math.floor(random(hOs)));
}

function keyPressed() {

  switch (keyCode) {

    case UP_ARROW:
      dir = createVector(0, -1);
      break;

    case DOWN_ARROW:
      dir = createVector(0, 1);
      break;

    case RIGHT_ARROW:
      dir = createVector(1, 0);
      break;

    case LEFT_ARROW:
      dir = createVector(-1, 0);
      break;

  }

}
