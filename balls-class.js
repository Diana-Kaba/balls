const canvas = document.getElementById("canvas");
const n = 10;

// const colors = ["red", "green", "blue", "yellow", "pink", "orange", "purple"];
// const random = Math.floor(Math.random() * colors.length);

class Ball {
  constructor(canvas, x = 100, y = 100) {
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.x = x;
    this.y = x;
    this.xSpeed = Math.floor(Math.random() * 10);
    this.ySpeed = Math.floor(Math.random() * 10);
    this.colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
    this.color = this.getColor();
    // ctx.fillStyle = ctx.clearRect(0, 0, width, height);
  }

  circle(x, y, radius, fillCircle) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
      this.ctx.fill();
    } else {
      this.ctx.stroke();
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.circle(this.x, this.y, 5, true);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkCollision() {
    if (this.x < 0 || this.x > this.width) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y < 0 || this.y > this.height) {
      this.ySpeed = -this.ySpeed;
    }
  }

  getColor() {
    let random = Math.floor(Math.random() * this.colors.length);
    return this.colors[random];
  }
}

// let ball = new Ball(canvas);
// console.log(ball.x, ball.y, ball.xSpeed, ball.ySpeed);
// ball.draw();

class BallsGame {
  constructor(balls, canvas) {
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.balls = balls;
  }

  clear() {
    this.ctx.fillStyle = this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawBorder() {
    this.ctx.strokeStyle = "grey";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(0, 0, this.width, this.height);
  }

  go() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    console.log(this.balls.length);
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].draw();
      this.balls[i].move();
      this.balls[i].checkCollision();
    }
    this.drawBorder();
  }

  start() {
    setInterval(this.go.bind(this), 30);
  }
}

const balls = [];
for (let i = 0; i < n; i++) {
  balls[i] = new Ball(canvas);
}

let ballsGame = new BallsGame(balls, canvas);
ballsGame.drawBorder();
ballsGame.start();
