const maze = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,1,0,1,0,1],
  [1,1,1,1,0,1,0,1,0,1],
  [1,0,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,2,1],
];

let playerPos = { x: 1, y: 1 };

function createMaze() {
  const container = document.getElementById("maze-container");
  container.innerHTML = '';

  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement("div");
      div.classList.add("cell");

      if (cell === 1) div.classList.add("wall");
      else if (cell === 2) div.classList.add("goal");

      if (playerPos.x === x && playerPos.y === y)
        div.classList.add("player");

      container.appendChild(div);
    });
  });
}

function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  if (
    newY >= 0 &&
    newY < maze.length &&
    newX >= 0 &&
    newX < maze[0].length &&
    maze[newY][newX] !== 1
  ) {
    playerPos = { x: newX, y: newY };
    createMaze();
    checkWin();
  }
}

function checkWin() {
  if (maze[playerPos.y][playerPos.x] === 2) {
    document.getElementById("message").classList.remove("hidden");
    document.getElementById("next-level-btn").classList.remove("hidden");
    document.removeEventListener("keydown", handleKeydown);
    console.log("Victory reached! Button should appear.");
  }
}

function handleKeydown(e) {
  switch (e.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
  }
}

function goToLevel6() {
  window.location.href = "level6.html"; // link to next level
}

window.onload = () => {
  createMaze();
  document.addEventListener("keydown", handleKeydown);
};
