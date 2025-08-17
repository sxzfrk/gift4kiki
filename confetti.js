let confetti;

function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    confetti = confetti || confettiCanvas(canvas);
    confetti.start();
    setTimeout(() => confetti.stop(), 3000); // stop after 3s
}

function confettiCanvas(canvas) {
    let particles = [];
    const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f'];
    const ctx = canvas.getContext('2d');

    function resetParticle(p) {
    p.x = Math.random() * canvas.width;
    p.y = 0; // Start at the top of canvas
    p.color = colors[Math.floor(Math.random() * colors.length)];
    p.size = Math.random() * 5 + 5;
    p.speed = Math.random() * 3 + 2;
}


    function start() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            let p = {};
            resetParticle(p);
            particles.push(p);
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            p.y += p.speed;
            if (p.y > canvas.height) {
                resetParticle(p);
            }
        }
        requestAnimationFrame(animate);
    }

    function stop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return { start, stop };
}
