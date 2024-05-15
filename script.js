var me = {
  x: 20,
  y: 200,
  emoji: "🚀",
  lifes: 3,
  particles: []
};

var monster1 = {
  x: 350,
  y: 200,
  speed: 1,
  emoji: "👾",
  particles: []
};

function drawObject(o) {
  textSize(30);
  stroke(0,0,0);
  fill(0,0,0);
  text(o.emoji, o.x, o.y);
}

function drawMe(o) {
  o.y = mouseY;
  drawObject(o);
  drawParticles(o.x, o.y, o.particles, 0, 5);
}

function drawMonster(o) {
  o.x = o.x - o.speed;

  if (o.x < 20) {
    if (abs(o.y - me.y) > 10) {
      me.lifes -= 1;
      for (var i = 0; i < 5; i++) {
        drawParticles(o.x+30, o.y-7, o.particles, 2, 5);
      }
    } else {
      for (var i = 0; i < 5; i++) {
        drawParticles(o.x+30, o.y-7, o.particles, 3, 5);
      }
    }

    o.y = random() * 400;
    o.x = 400;
    o.speed += 1;
  }

  drawObject(o);
  drawParticles(o.x+30, o.y-7, o.particles, 1, 5);
}

function drawParticles(x, y, particles, d, n) {
  for (let i = 0; i < n; i++) {
    let p = new Particle(x, y, d);
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    if (type == 0) {
      this.vx = random(-1, 1);
      this.vy = random(1, 3);
      this.d = 5;
    }
    if (type == 1) {
      this.vx = random(0.5, 2);
      this.vy = random(-0.5, 0.5);
      this.d = 7;
    }
    if (type == 2) {
      this.vx = random(-0.5, 0.5);
      this.vy = random(-0.5, 0.5);
      this.d = 15;
    }
    if (type == 3) {
      this.vx = random(-0.5, 0.5);
      this.vy = random(-0.5, 0.5);
      this.d = 2;
    }
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
    this.d -= random(0.05, 0.1);
  }

  show() {
    noStroke();
    if (this.type == 0) {
      fill(random(200,230), random(50, 150), 10, this.alpha); 
    }
    if (this.type == 1) {
      fill(random(90,255), random(180, 255), random(150, 255), this.alpha);
    }
    if (this.type == 2) {
      fill(random(200,255), random(0, 30), random(0, 30), this.alpha);
    }
    if (this.type == 3) {
      fill(random(0,30), random(200, 255), random(0, 30), this.alpha);
    }
    ellipse(this.x, this.y, this.d);
  }
}

var bg, menuBg;
var gameStarted = false;

function preload() {
  bg = loadImage("bg.jpg");
  menuBg = loadImage("menuBg.jpg");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (gameStarted) {
    textAlign(LEFT);
    fill("white");
    stroke("black");
    background(bg);
  
    if (me.lifes <= 0) {
      fill("yellow");
      stroke("black");
      textAlign(CENTER);
      textSize(30);
      text('Game over', width/2, 200);
      if (frameCount % 60 < 30) {
        text('Click to start', width/2, 250);
      }
      var n = 0;
      if (frameCount % 10 == 0) {
        n = 5;
      }
      drawParticles(random(0, width), random(0, height), me.particles, 2, n);
    } else {
      drawMe(me);
      drawMonster(monster1);
      stroke(255);
      text('❤️' + me.lifes, 10, 40);
    }
  } else {
    background(menuBg);

    // text should fly like in Star Wars
    // center text align
    textAlign(CENTER);
    textSize(30);
    fill("yellow");
    stroke("black");
    strokeWeight(2);
    text('Star Alien', width/2, 200);
    if (frameCount % 60 < 30) {
      text('Click to start', width/2, 250);
    }
  }
}

function mousePressed() {
  gameStarted = true;
  if (me.lifes <= 0) {
    me.lifes = 3;
    monster1.speed = 1;
  }
}