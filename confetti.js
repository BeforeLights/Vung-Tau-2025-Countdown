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

    const confettiCount = 800; // More confetti
    const confetti = [];
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', 
        '#fd79a8', '#fdcb6e', '#6c5ce7', '#a29bfe', '#e17055',
        '#00cec9', '#e84393', '#fdcb6e', '#6c5ce7', '#fd79a8',
        '#00b894', '#e17055', '#0984e3', '#a29bfe', '#00cec9'
    ];
    
    // Multiple burst points for spectacular effect
    const burstPoints = [
        { x: confettiCanvas.width * 0.1, y: confettiCanvas.height * 0.9 },
        { x: confettiCanvas.width * 0.3, y: confettiCanvas.height * 0.8 },
        { x: confettiCanvas.width * 0.5, y: confettiCanvas.height * 0.7 },
        { x: confettiCanvas.width * 0.7, y: confettiCanvas.height * 0.8 },
        { x: confettiCanvas.width * 0.9, y: confettiCanvas.height * 0.9 },
        { x: confettiCanvas.width * 0.2, y: confettiCanvas.height * 0.5 },
        { x: confettiCanvas.width * 0.8, y: confettiCanvas.height * 0.5 },
        { x: confettiCanvas.width * 0.5, y: confettiCanvas.height * 0.3 }
    ];
    
    for (let i = 0; i < confettiCount; i++) {
        const burstPoint = burstPoints[Math.floor(Math.random() * burstPoints.length)];
        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * 15 + 8; // Faster initial velocity
        
        confetti.push({
            x: burstPoint.x + (Math.random() - 0.5) * 150,
            y: burstPoint.y + (Math.random() - 0.5) * 80,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - Math.random() * 5,
            w: Math.random() * 12 + 6, // Larger pieces
            h: Math.random() * 12 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 12,
            opacity: 1,
            gravity: 0.08, // Slower falling
            friction: 0.998, // Less friction
            shape: Math.random() > 0.5 ? 'rect' : Math.random() > 0.3 ? 'circle' : Math.random() > 0.1 ? 'triangle' : 'star',
            wobble: Math.random() * 0.02,
            wobbleSpeed: Math.random() * 0.1 + 0.05
        });
    }
    
    let animationFrame;
    let time = 0;
    
    function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        time += 0.016; // Time for wobble effect
        
        for (let i = 0; i < confettiCount; i++) {
            let c = confetti[i];

            // Add wobble effect
            c.x += c.vx + Math.sin(time * c.wobbleSpeed) * c.wobble;
            c.y += c.vy;
            c.vy += c.gravity;
            c.vx *= c.friction;
            c.vy *= 0.998;
            c.rotation += c.rotationSpeed;
            c.opacity -= 0.0005; // Slower fade
            
            // Bounce off walls with more realistic physics
            if (c.x < 0 || c.x > confettiCanvas.width) {
                c.vx *= -0.7;
                c.x = Math.max(0, Math.min(confettiCanvas.width, c.x));
            }
            if (c.y > confettiCanvas.height) {
                c.vy *= -0.5;
                c.y = confettiCanvas.height;
                c.vx *= 0.8; // Slow down horizontal movement on bounce
            }
            
            if (c.opacity <= 0) continue;
            
            // Add glow effect for some confetti
            if (Math.random() > 0.7) {
                ctx.shadowColor = c.color;
                ctx.shadowBlur = 10;
            } else {
                ctx.shadowBlur = 0;
            }
            
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
            } else if (c.shape === 'star') {
                // Draw star shape
                ctx.beginPath();
                for (let j = 0; j < 10; j++) {
                    const radius = j % 2 === 0 ? c.w / 2 : c.w / 4;
                    const angle = (j * Math.PI) / 5;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
            } else {
                // Rectangle with rounded corners
                const radius = Math.min(c.w, c.h) / 4;
                ctx.beginPath();
                ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, radius);
                ctx.fill();
            }
            
            ctx.restore();
        }
        
        animationFrame = requestAnimationFrame(drawConfetti);
    }
    
    drawConfetti();
    
    // Longer duration for more impressive effect
    setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        confettiCanvas.remove();
    }, 12000); // 12 seconds
}
