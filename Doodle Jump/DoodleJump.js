
var GRAVITY = -0.6;
var player;
var points;

var platforms = [];

function setup() {

  createCanvas(400, 600);

  player = new Doodler(width / 2, height / 2, false, 30, color("#FFF070"));

  for (var y = 0; y < height * 2; y += 40) {

    for (var i = 0; i < 3; i++) {

      var x = noise(i, y) * width;

      if (noise(y, i) > 0.5)
        platforms.push(new Platform(x, y, 55, color("#FF80F0")));
    }
  }

  points = 0;

  frameRate(60);
}

function draw() {

  background(51);

  player.update();
  player.draw();
  player.applyForce(createVector(0, GRAVITY));

  handlePlatforms();

  if (player.maxA + player.loc.y < -height / 2) {
    /* end game */
    endGame();
  }

  textSize(30);
  textAlign(LEFT);
  fill(255);
  noStroke();
  text((player.maxA + points).toFixed(0), 50, 50);

  handleKeys();
}

function handlePlatforms() {

  for (var i = platforms.length - 1; i >= 0; i--) {

    if (platforms[i].onScreen) {

      platforms[i].draw(player.loc.y);

      if (platforms[i].collidesWith(player)) {
        player.jump();
        if (platforms[i] instanceof Doodler) {

          points += 100;
          platforms.splice(i, 1);
        }
      }
    } else {

      /* delete previous platforms */
      platforms.splice(i, 1);

      var x = noise(player.maxA, frameCount) * width;
      var y = player.maxA + height;

      if (random() < 0.9) {

        platforms.push(new Platform(x, y, 55, color("#FF80F0")));
      } else {
        if (random() > 0.5)
          platforms.push(new Doodler(x, y, true, 50, color("#00FFFF")));
      }
    }
  }
}

function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {
    player.applyForce(-1, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.applyForce(1, 0);
  }
}

function endGame() {

  textAlign(CENTER);
  textSize(60);
  noStroke();
  fill("#90FF90");
  text("Game Over!", width / 2, height / 2);
  noLoop();
}
