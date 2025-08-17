let score = 0;
const maxScore = 5;
let timeoutId;
let delay = 1500; // start at 2 seconds
let buttonLocked = false;

function showButton() {
  if (buttonLocked) return; // don't spawn a new one if the old one is active

  const button = document.getElementById("click-me-btn");
  const gameArea = document.getElementById("game-area");

  const areaWidth = gameArea.clientWidth - 100;
  const areaHeight = gameArea.clientHeight - 50;

  const x = Math.random() * areaWidth;
  const y = Math.random() * areaHeight;

  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  button.classList.remove("hidden");

  buttonLocked = true;

  timeoutId = setTimeout(() => {
    fail();
  }, delay);
}

function buttonClicked() {
  if (!buttonLocked) return;

  clearTimeout(timeoutId);
  document.getElementById("click-me-btn").classList.add("hidden");

  score++;
  updateStatus();

  buttonLocked = false;

  if (score >= maxScore) {
    win();
  } else {
    delay *= 0.9;
    setTimeout(showButton, 700);
  }
}

function updateStatus() {
  document.getElementById("status").textContent = `Caught: ${score} / ${maxScore}`;
}

function fail() {
  document.getElementById("status").textContent = "Too slow! Try again 🐌";
  score = 0;
  delay = 2000;
  buttonLocked = false;

  setTimeout(() => {
    updateStatus();
    showButton();
  }, 1000);
}

function win() {
  document.getElementById("message").innerHTML =
    "🎉 You passed Level 6!<br>cheesecake says: DUDUDUDU MAX VERSTAPPENNNN 🏁🔥";
  document.getElementById("message").classList.remove("hidden");
  document.getElementById("next-level-btn").classList.remove("hidden");
  document.getElementById("click-me-btn").classList.add("hidden");
  buttonLocked = true;
}

function goToLevel7() {
  window.location.href = "level7.html";
}

window.onload = () => {
  updateStatus();
  showButton();
};
