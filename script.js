var me = {
  x: 20,
  y: 200,
  emoji: "🚀",
  lifes: 3
};

var monster1 = {
  x: 350,
  y: 200,
  speed: 1,
  emoji: "👾",
};

function drawObject(o) {
  textSize(30);
  text(o.emoji, o.x, o.y);
}

function drawMe(o) {
  o.y = mouseY;
  drawObject(o);
}

function drawMonster(o) {
  o.x = o.x - o.speed;

  if (o.x < 20) {
    if (abs(o.y - me.y) > 10) {
      me.lifes -= 1;
    }

    o.y = random() * 400;
    o.x = 400;
    o.speed += 1;
  }

  drawObject(o);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  if (me.lifes <= 0) {
    text('Game over', 100, 200);
  } else {
    drawMe(me);
    drawMonster(monster1);
    stroke(255);
    text('❤️' + me.lifes, 10, 40);
  }
}