var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var player = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 20,
  height: 20,
  speed: 5
};
var enemies = [];
var enemySpeed = 2;
var score = 0;
var bestScore = 0;
var worstScore = 0;
var bestScoreElement = document.getElementById("bestScore");
var worstScoreElement = document.getElementById("worstScore");

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function movePlayer(e) {
  if (e.keyCode == 37 && player.x > 0) {
    player.x -= player.speed;
  } else if (e.keyCode == 39 && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
}

function generateEnemy() {
  var radius = 10;
  var x = Math.random() * (canvas.width - radius * 2) + radius;
  var y = -radius;
  var speedX = 0; 
  var speedY = 2; 
  enemies.push({ x: x, y: y, radius: radius, speedX: speedX, speedY: speedY });
}

function updateEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;
    if (
      enemy.y + enemy.radius > canvas.height &&
      enemy.x > player.x &&
      enemy.x < player.x + player.width
    ) {
      gameOver();
    }
    if (enemy.y > canvas.height) {
      enemies.splice(i, 1);
      score++;
    }
  }
}

function checkCollision() {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var dx = player.x - enemy.x;
    var dy = player.y - enemy.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < player.width + enemy.radius) {
      gameOver();
    }
  }
}

function gameOver() {
  alert("Game Over! Your score: " + score);
  if (score > bestScore) {
    bestScore = score;
    bestScoreElement.innerText = "Best Score: " + bestScore;
    bestScoreElement.style.display = "block";
  }
  if (score < worstScore || worstScore === 0) {
    worstScore = score;
    worstScoreElement.innerText = "Worst Score: " + worstScore;
    worstScoreElement.style.display = "block";
  }
  score = 0;
  player.x = canvas.width / 2;
  player.y = canvas.height - 30;
  enemies = [];
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemies();
  drawScore();
  updateEnemies();
  checkCollision();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", movePlayer);
setInterval(generateEnemy, 1000);
gameLoop();
