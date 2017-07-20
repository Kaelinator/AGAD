const B_SIZE = 50;
const HALF_B_SIZE = B_SIZE / 2;

var basket;
var basketColor;

var orbs = [];

var score;

function setup() {

  createCanvas(400, 600);

  basket = createVector(width / 2, height - B_SIZE);
  basketColor = color("#000000");

  score = 0;
  textAlign(CENTER);
}

function draw() {
  background(51);

  if (frameCount % 20 === 0 && random() < ((score < 10) ? 10 : score) * 0.01)
    orbs.push(new Ball(random(width), 0, random(20) + 10, rCol(), random(5) + 3));


  for (var i = orbs.length - 1; i >= 0; i--) {

    if (orbs[i].onScreen) {

      orbs[i].update();
      orbs[i].draw();

      if (orbs[i].caughtBy(basket)) {

        score += 1;
        basketColor = lerpColor(basketColor, orbs[i].c, orbs[i].s * 0.01);
        orbs.splice(i, 1);
      }

    } else {

      endGame();
    }
  }

  textSize(40);
  noStroke();
  fill(255);
  text(score, width / 2, 50);

  handleBasket();
}

function handleBasket() {

  basket.x = constrain(mouseX, 0, width);

  var x1 = basket.x - HALF_B_SIZE;
  var x2 = basket.x + HALF_B_SIZE;

  var y1 = basket.y - HALF_B_SIZE;
  var y2 = basket.y + HALF_B_SIZE;

  /* contents */
  fill(basketColor);
  noStroke();
  rect(x1, basket.y, B_SIZE, HALF_B_SIZE);

  stroke(255);
  strokeWeight(3);
  noFill();

  /* walls */
  beginShape();
  vertex(x1, y1);
  vertex(x1, y2);
  vertex(x2, y2);
  vertex(x2, y1);
  endShape();
}

function endGame() {

  noLoop();
  textSize(60);
  noStroke();
  fill(255);
  text("Game Over!", width / 2, height / 2);
}

function rCol() {

  return color(random(255), random(255), random(255));
}
