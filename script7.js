let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function makeMove(cell, index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === "X" ? "player-x" : "player-o");

        if (checkWinner()) {
            gameActive = false;
            if (currentPlayer === "X") {
                displayMessageAndButton(true); // Win
            } else {
                displayMessageAndButton(false, "lose"); // Lose
            }
        } else if (!board.includes("")) {
            gameActive = false;
            displayMessageAndButton(false, "draw"); // Draw
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer === "O") {
                setTimeout(aiMove, 500);
            }
        }
    }
}

function aiMove() {
    let emptyIndices = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(val => val !== null);

    let aiChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    let cell = document.querySelectorAll(".cell")[aiChoice];
    makeMove(cell, aiChoice);
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function displayMessageAndButton(win, type = "") {
    const gameDiv = document.getElementById("game");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";

    const button = document.createElement("button");
    button.className = "pink-button";

    if (win) {
        messageDiv.textContent = "Cheesecake says: you know if i had played against you, you wouldve lost right?";
        button.textContent = "Go to Next Level";
        button.onclick = () => window.location.href = "level8.html";
    } else {
        if (type === "draw") {
            messageDiv.textContent = "It’s a draw! Try again?";
        } else {
            messageDiv.textContent = "Oh no, you lost! Try again ❤️";
        }
        button.textContent = "Retry";
        button.onclick = () => window.location.reload();
    }

    gameDiv.appendChild(messageDiv);
    gameDiv.appendChild(button);
}
