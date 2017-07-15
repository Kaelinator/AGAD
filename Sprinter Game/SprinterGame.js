
var runners = [];
var runner;

var w;

var startTime;

function setup() {
  createCanvas(680, 400);

  var c = rCol();
  for (var i = 0; i < 6; i++) {

    runners.push(new Sprinter(random(0.075) + 0.1, c));
  }

  runner = new Sprinter(0, rCol());
  runners.splice(Math.floor(runners.length / 2), 0, runner);


  startTime = new Date().getTime();
  w = height / runners.length;
}

function draw() {
  background(51);

  drawTrack();
  stride();
}

function keyPressed() {

  runner.run(keyCode);
}

function stride() {

  for (var r = 0; r < runners.length; r++) {

    if (random() < runners[r].skill)
      runners[r].run(76 - runners[r].prevKey);
  }

}

function drawTrack() {

  for (var r = 0; r < runners.length; r++) {

    runners[r].draw(r);
    runners[r].update();

    /* lanes */
    stroke("#A14948");
    strokeWeight(3);

    var y1 = (r / runners.length) * height;
    var y2 = (r / runners.length) * height + w;

    line(0, y1, width, y1);
    line(0, y2, width, y2);
  }

}

function rCol() {

  return color(random(255), random(255), random(255));
}
