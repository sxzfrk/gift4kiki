const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 300, width: 20, height: 20, velocity: 0 };
let gravity = 0.4;
let jump = -7;
let pipes = [];
let pipeWidth = 50;
let gap = 140;
let frame = 0;
let score = 0;
let gameOver = false;
let gameWon = false;
const totalPipesToWin = 10;

// Bird movement
document.addEventListener("keydown", e => {
  if (e.code === "Space") bird.velocity = jump;
});

// Generate pipes
function createPipe() {
  let topHeight = Math.random() * (canvas.height - gap - 100) + 50;
  pipes.push({ x: canvas.width, topHeight });
}

// Draw pixel-style bird
function drawBird() {
  ctx.fillStyle = "#ffcccb"; // pastel pink
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  ctx.fillStyle = "#ff9999"; // darker shade for wing
  ctx.fillRect(bird.x + 5, bird.y + 5, 5, 5);
}

// Draw pipes
function drawPipes() {
  ctx.fillStyle = "#a3d977"; // pastel green
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.topHeight + gap, pipeWidth, canvas.height);
  });
}

// Update game
function update() {
  if (gameOver || gameWon) return;

  frame++;
  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (frame % 90 === 0) createPipe();

  pipes.forEach(pipe => {
    pipe.x -= 2;

    // Collision detection
    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.topHeight || bird.y + bird.height > pipe.topHeight + gap)
    ) {
      endGame(false);
    }

    // Scoring
    if (pipe.x + pipeWidth === bird.x) {
      score++;
      if (score >= totalPipesToWin) endGame(true);
    }
  });

  // Ground or ceiling hit
  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    endGame(false);
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "#d4f1f4"; // pastel blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPipes();
  drawBird();

  // Score
  ctx.fillStyle = "#444";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// End game
function endGame(win) {
  if (win) {
    gameWon = true;
    document.getElementById("message").innerText =
      "Cheesecake says: COCK-A-DOODLE-DOO";
    document.getElementById("buttons").innerHTML =
      `<button class="next-btn" onclick="location.href='level11.html'">Next Level</button>`;
  } else {
    gameOver = true;
    document.getElementById("message").innerText = "You Lost!";
    document.getElementById("buttons").innerHTML =
      `<button class="retry-btn" onclick="location.reload()">Retry</button>`;
  }
}

loop();

