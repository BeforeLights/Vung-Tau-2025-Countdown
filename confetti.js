function launchConfetti() {
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confetti-canvas';
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.left = 0;
    confettiCanvas.style.top = 0;
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = 9999;
    document.body.appendChild(confettiCanvas);
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confettiCount = 600;
    const confetti = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#fdcb6e', '#6c5ce7', '#a29bfe', '#e17055'];
    const burstPoints = [
        { x: confettiCanvas.width * 0.2, y: confettiCanvas.height * 0.8 },
        { x: confettiCanvas.width * 0.5, y: confettiCanvas.height * 0.8 },
        { x: confettiCanvas.width * 0.8, y: confettiCanvas.height * 0.8 },
        { x: confettiCanvas.width * 0.1, y: confettiCanvas.height * 0.6 },
        { x: confettiCanvas.width * 0.9, y: confettiCanvas.height * 0.6 },
        { x: confettiCanvas.width * 0.5, y: confettiCanvas.height * 0.4 }
    ];
    
    for (let i = 0; i < confettiCount; i++) {
        const burstPoint = burstPoints[Math.floor(Math.random() * burstPoints.length)];
        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * 10 + 5;
        
        confetti.push({
            x: burstPoint.x + (Math.random() - 0.5) * 100,
            y: burstPoint.y + (Math.random() - 0.5) * 50,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - Math.random() * 3,
            w: Math.random() * 8 + 5,
            h: Math.random() * 8 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            opacity: 1,
            gravity: 0.12,
            friction: 0.995,
            shape: Math.random() > 0.6 ? 'rect' : Math.random() > 0.3 ? 'circle' : 'triangle'
        });
    }
    
    let animationFrame;
    function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        for (let i = 0; i < confettiCount; i++) {
            let c = confetti[i];

            c.x += c.vx;
            c.y += c.vy;
            c.vy += c.gravity;
            c.vx *= c.friction;
            c.vy *= 0.995;
            c.rotation += c.rotationSpeed;
            c.opacity -= 0.0008;
            
            if (c.x < 0 || c.x > confettiCanvas.width) {
                c.vx *= -0.8;
                c.x = Math.max(0, Math.min(confettiCanvas.width, c.x));
            }
            if (c.y > confettiCanvas.height) {
                c.vy *= -0.6;
                c.y = confettiCanvas.height;
            }
            
            if (c.opacity <= 0) continue;
            ctx.save();
            ctx.globalAlpha = Math.max(0, c.opacity);
            ctx.fillStyle = c.color;
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rotation * Math.PI / 180);
            
            if (c.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, c.w / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (c.shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(0, -c.h / 2);
                ctx.lineTo(-c.w / 2, c.h / 2);
                ctx.lineTo(c.w / 2, c.h / 2);
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            }
            
            ctx.restore();
        }
        
        animationFrame = requestAnimationFrame(drawConfetti);
    }
    
    drawConfetti();
    
    setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        confettiCanvas.remove();
    }, 7000);
}
