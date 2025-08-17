const COLORS = ['red', 'blue', 'green', 'yellow'];
const TOTAL_TUBES = 6;
const MAX_LAYERS = 4;
let gameState = [];
let selectedTube = null;

function initGame() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';
  gameState.forEach((tube, index) => {
    const tubeDiv = document.createElement('div');
    tubeDiv.classList.add('tube');
    tubeDiv.setAttribute('data-index', index);

    tube.forEach(color => {
      const layerDiv = document.createElement('div');
      layerDiv.classList.add('layer', color);
      tubeDiv.appendChild(layerDiv);
    });

    tubeDiv.addEventListener('click', () => handleTubeClick(index));
    container.appendChild(tubeDiv);
  });
}

function generateGameState() {
  const colorPool = [];

  // Add 4 layers of each color
  COLORS.forEach(color => {
    for (let i = 0; i < 4; i++) colorPool.push(color);
  });

  // Shuffle the colors
  for (let i = colorPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
  }

  // Fill first N-2 tubes with colors
  const tubes = [];
  for (let i = 0; i < TOTAL_TUBES; i++) {
    if (i < TOTAL_TUBES - 2) {
      tubes.push(colorPool.splice(0, 4));
    } else {
      tubes.push([]); // empty tubes
    }
  }

  return tubes;
}

function handleTubeClick(index) {
  const tube = document.querySelectorAll('.tube')[index];

  if (selectedTube === null) {
    selectedTube = index;
    tube.classList.add('selected');
  } else if (selectedTube === index) {
    tube.classList.remove('selected');
    selectedTube = null;
  } else {
    const fromTube = gameState[selectedTube];
    const toTube = gameState[index];
    const fromDiv = document.querySelectorAll('.tube')[selectedTube];
    const toDiv = document.querySelectorAll('.tube')[index];

    if (canPour(fromTube, toTube)) {
      animatePour(fromDiv, toDiv, fromTube, toTube, () => {
        checkWin();
      });
    } else {
      fromDiv.classList.remove('selected');
      selectedTube = null;
    }
  }
}

function canPour(from, to) {
  if (from.length === 0 || to.length >= MAX_LAYERS) return false;
  const movingColor = from[from.length - 1];
  const targetColor = to[to.length - 1] || movingColor;
  if (to.length === 0 || targetColor === movingColor) return true;
  return false;
}

function animatePour(fromDiv, toDiv, fromTube, toTube, callback) {
  const layer = fromDiv.lastChild;
  const color = fromTube.pop();

  const clone = layer.cloneNode();
  clone.style.position = 'absolute';
  clone.style.bottom = `${25 * (fromTube.length)}%`;
  clone.style.left = '0';
  clone.style.zIndex = '10';
  fromDiv.removeChild(layer);
  fromDiv.appendChild(clone);

  const toPos = toTube.length;
  const containerRect = fromDiv.parentElement.getBoundingClientRect();
  const fromRect = fromDiv.getBoundingClientRect();
  const toRect = toDiv.getBoundingClientRect();

  const dx = toRect.left - fromRect.left;
  const dy = fromRect.top - toRect.top - (toPos * (fromRect.height / 4));

  clone.style.transition = 'transform 0.5s ease';
  clone.style.transform = `translate(${dx}px, ${-dy}px)`;

  setTimeout(() => {
    fromDiv.removeChild(clone);
    const newLayer = document.createElement('div');
    newLayer.classList.add('layer', color);
    toTube.push(color);
    toDiv.appendChild(newLayer);

    document.querySelectorAll('.tube')[selectedTube].classList.remove('selected');
    selectedTube = null;
    callback();
  }, 500);
}

function checkWin() {
  const win = gameState.every(tube => {
    return tube.length === 0 ||
      (tube.length === MAX_LAYERS && tube.every(color => color === tube[0]));
  });

  if (win) {
    document.getElementById('message').innerHTML =
      "🎉 Level Complete!<br>cheesecake says: I promise I drank a lot of water while making this";
    document.getElementById('next-level-btn').style.display = 'inline-block';
  }
}

function goToLevel5() {
  window.location.href = "level5.html";
}

window.onload = () => {
  gameState = generateGameState();
  initGame();
};
