
var toppings = [];
var stack = [];

var player;
var score;

function setup() {

  createCanvas(300, 600);

  player = new Topping(width / 2, height - 15, color("#FFFFFF"));
  stack.push(player);
  player.stacked = true;

  score = 0;
}

function draw() {
  background(51);

  handleKeys();

  if (frameCount % 90 === 0)
    if (random() > 0.5)
      toppings.push(new Topping(random(width), 0, rCol()));

  for (var i = 0; i < toppings.length; i++) {

    toppings[i].update();
    toppings[i].draw();

    if (toppings[i].pos.y > height)
    endGame();

    if (toppings[i].stacksWith(stack[stack.length - 1])) {

      toppings[i].stacked = true;
      stack.push(toppings[i]);
      toppings.splice(i, 1);
    }

  }

  for (var i = stack.length - 1; i >= 0; i--) {

    stack[i].update();
    stack[i].draw();

    if (stack[i - 1])
      stack[i].moveTo(stack[i - 1].pos);

    if (stack.length - 1 > score && stack.length > 15) {

      stack[i].move(createVector(0, +12));
    }

  }

  if (stack.length - 1 > score) {
    score++;
  }

  textSize(50);
  text(score, 10, 70);
}

function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {
    player.move(createVector(-5, 0));
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.move(createVector(5, 0));
  }

}

function endGame() {

  textAlign(CENTER);
  fill(255);
  text("Game Over!", width / 2, height / 2);
  textAlign(LEFT);
  noLoop();
}

function rCol() {

  return color(random(255), random(255), random(255));
}
