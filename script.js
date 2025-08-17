const oathInput = document.getElementById('oath-input');
const startBtn = document.getElementById('start-btn');

if (oathInput) {
    oathInput.addEventListener('input', () => {
        const userInput = oathInput.value.trim().toLowerCase();
        const correctOath = "i solemnly swear that i am up to no good";

        if (userInput === correctOath) {
            startBtn.classList.remove('hidden');
        } else {
            startBtn.classList.add('hidden');
        }
    });
}

function startGame() {
    window.location.href = "level1.html";
}
