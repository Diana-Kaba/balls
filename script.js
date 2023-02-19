let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let n = 10; // 10 шариков

// конструктор для шариков

// функция рисования шарика
let circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

// рисование шарика заданным цветом
Ball.prototype.draw = function () {
  ctx.fillStyle = "blue";
  ctx.strokeStyle = "blue";
  circle(this.x, this.y, 3, true);
};
// движение шарика
Ball.prototype.move = function () {
  this.x += this.xSpeed;
  this.y += this.ySpeed;
};

// проверка столкновения шарика и стен - меняем движение на противоположное
Ball.prototype.checkCollision = function () {
  if (this.x < 0 || this.x > width) {
    this.xSpeed = -this.xSpeed;
  }

  if (this.y < 0 || this.y > height) {
    this.ySpeed = -this.ySpeed;
  }
};

// рисуем n шариков
let balls = [];
for (let i = 0; i < n; i++) {
  balls[i] = new Ball();
}

// функция для отрисовки и перемещения шариков
let go = function () {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < 10; i++) {
    balls[i].draw();
    balls[i].move();
    balls[i].checkCollision();
  }
  // ctx.strokeRect(0, 0, width, height);
};

// Анимируем шарики
setInterval(go, 30);
