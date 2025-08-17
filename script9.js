const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const balloonImg = new Image();
balloonImg.src = "images/balloon.png";

const cloudImg = new Image();
cloudImg.src = "images/cloud.png";

const birdImg = new Image();
birdImg.src = "images/bird.png";

const finishLineHeight = 50;

// Balloon object
const balloon = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 150,
    width: 80,
    height: 120
};

// Obstacle array
let obstacles = [];

// Background scroll
let bgY = 0;
const bgSpeed = 2;

// Keys tracking
let keys = {};
document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function spawnObstacle() {
    const type = Math.random() > 0.5 ? cloudImg : birdImg;
    const size = type === cloudImg ? 120 : 80;
    obstacles.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        img: type
    });
}

// Collision detection
function checkCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// Game state
let gameOver = false;
let win = false;
let finishLineY = -3000; // position of finish line

function update() {
    if (gameOver) return;

    // Scroll background
    bgY += bgSpeed;
    if (bgY >= canvas.height) bgY = 0;

    // Smooth balloon movement
    const moveSpeed = 6;
    if (keys["ArrowLeft"] && balloon.x > 0) {
        balloon.x -= moveSpeed;
    }
    if (keys["ArrowRight"] && balloon.x < canvas.width - balloon.width) {
        balloon.x += moveSpeed;
    }

    // Move obstacles
    for (let o of obstacles) {
        o.y += bgSpeed + 1;
    }

    // Remove off-screen obstacles
    obstacles = obstacles.filter(o => o.y < canvas.height);

    // Spawn obstacles randomly
    if (Math.random() < 0.02) spawnObstacle();

    // Check collisions
    for (let o of obstacles) {
        if (checkCollision(balloon, o)) {
            gameOver = true;
            win = false;
        }
    }

    // Move finish line
    finishLineY += bgSpeed;
    if (finishLineY >= canvas.height - finishLineHeight) {
        win = true;
        gameOver = true;
    }
}

function drawBackground() {
    ctx.fillStyle = "#cce7ff"; // light blue sky
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#aaddff";
    ctx.fillRect(0, bgY, canvas.width, canvas.height);
    ctx.fillRect(0, bgY - canvas.height, canvas.width, canvas.height);
}

function drawFinishLine() {
    ctx.fillStyle = "red";
    ctx.fillRect(0, finishLineY, canvas.width, finishLineHeight);
}

function draw() {
    drawBackground();

    // Draw finish line
    drawFinishLine();

    // Draw balloon
    ctx.drawImage(balloonImg, balloon.x, balloon.y, balloon.width, balloon.height);

    // Draw obstacles
    for (let o of obstacles) {
        ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
    }

    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "28px Arial";
        ctx.textAlign = "center";
        if (win) {
            ctx.fillText("Cheesecake says: I really wanna pop a balloon now", canvas.width / 2, canvas.height / 2 - 40);
            createButton("Next Level", "level10.html");
        } else {
            ctx.fillText("You lost! Try again.", canvas.width / 2, canvas.height / 2 - 40);
            createButton("Retry", "level9.html");
        }
    }
}

function createButton(text, link) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.style.position = "absolute";
    btn.style.left = "50%";
    btn.style.top = "60%";
    btn.style.transform = "translate(-50%, -50%)";
    btn.style.padding = "12px 25px";
    btn.style.fontSize = "18px";
    btn.style.borderRadius = "30px";
    btn.style.backgroundColor = "#ff99cc";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.onclick = () => window.location.href = link;
    document.body.appendChild(btn);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
