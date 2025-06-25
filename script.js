function updateCountdown() {
    const targetDate = new Date('2025-06-28T00:00:00');
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML =
            '<div style="font-size: 2.5rem; font-weight: 800; background: linear-gradient(45deg, #f093fb, #f5576c, #43e97b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: celebrate 1s ease-in-out infinite alternate;">🎉 Xách xe lên đi đi bây ơi LES GOOO! 🎉</div>';
        triggerConfetti();
        swapToChickenAttack();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Add leading zeros for consistent formatting
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Add celebration animation CSS if it doesn't exist
    if (!document.getElementById('celebrate-style')) {
        const style = document.createElement('style');
        style.id = 'celebrate-style';
        style.textContent = `
            @keyframes celebrate {
                from { transform: scale(1) rotate(-1deg); }
                to { transform: scale(1.05) rotate(1deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function triggerConfetti() {
    if (!window._confettiLaunched) {
        window._confettiLaunched = true;
        if (typeof launchConfetti === 'function') {
            launchConfetti();
        }
    }
}

function swapToChickenAttack() {
    if (!window._videoSwapped) {
        window._videoSwapped = true;
        const originalVideo = document.getElementById('hehe');
        const chickenVideo = document.getElementById('chickenattack');
        const playBtn = document.getElementById('play-sound-btn');
        
        if (originalVideo && chickenVideo && playBtn) {
            originalVideo.pause();
            originalVideo.style.display = 'none';
            chickenVideo.style.display = 'block';
            chickenVideo.currentTime = 17;
            chickenVideo.muted = true;
            playBtn.style.display = 'flex';
        }
    }
}

const overlayImg = document.createElement('img');
overlayImg.className = 'bg-img-overlay';
document.body.appendChild(overlayImg);

const bgImages = [
    'materials/hinh_anh/a0a5feb3-d6d2-453a-8702-6d3b17b99b7e.jpg',
    'materials/hinh_anh/a9128942-c640-4aa3-b7e6-d29870277a05.jpg',
    'materials/hinh_anh/b5463594-a8f1-4904-84a6-85af6d0d54cf.jpg',
    'materials/hinh_anh/cea3f3d3-308b-4fbd-992f-961571045787.jpg',
    'materials/hinh_anh/e19262e8-7924-40e5-b0ec-54dd693c726b.jpg',
    'materials/hinh_anh/67f49f58-b1e0-4a93-a811-7d292420502e.jpg'
];

function setRandomBg() {
    const img = bgImages[Math.floor(Math.random() * bgImages.length)];
    overlayImg.style.opacity = 0;
    setTimeout(() => {
        overlayImg.src = img;
        overlayImg.onload = () => {
            overlayImg.style.opacity = 0.25;
        };
    }, 300);
}

function scatterImages() {
    document.querySelectorAll('.bg-img-scatter').forEach(img => img.remove());
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const placedRects = [];
    function isOverlapping(x, y, size) {
        return placedRects.some(rect => {
            return !(
                x + size < rect.x ||
                x > rect.x + rect.size ||
                y + size < rect.y ||
                y > rect.y + rect.size
            );
        });
    }
    bgImages.forEach(src => {
        let tries = 0;
        let x, y, size;
        do {
            size = 120 + Math.random() * 140;
            x = Math.random() * (vw - size);
            y = Math.random() * (vh - size);
            tries++;
        } while (isOverlapping(x, y, size) && tries < 50);
        placedRects.push({x, y, size});
        const img = document.createElement('img');
        img.src = src;
        img.className = 'bg-img-scatter';
        img.style.position = 'fixed';
        img.style.zIndex = 0;
        img.style.pointerEvents = 'none';
        img.style.opacity = '0.22';
        img.style.objectFit = 'cover';
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transition = 'opacity 0.7s, left 1.2s, top 1.2s';
        document.body.appendChild(img);
    });
}

updateCountdown();
setInterval(updateCountdown, 1000); // Back to 1-second updates
setRandomBg();
setInterval(setRandomBg, 8000);
scatterImages();
window.addEventListener('resize', scatterImages);
setInterval(scatterImages, 9000);

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('play-sound-btn');
    
    btn.addEventListener('click', function() {
        const originalVideo = document.getElementById('hehe');
        const chickenVideo = document.getElementById('chickenattack');
        
        if (originalVideo.style.display !== 'none') {
            originalVideo.muted = false;
            originalVideo.play();
        } else if (chickenVideo.style.display !== 'none') {
            chickenVideo.muted = false;
            chickenVideo.play();
        }
        
        btn.style.display = 'none';
    });

    const targetDate = new Date('2025-06-28T00:00:00');
    const now = new Date();
    if (now >= targetDate) {
        triggerConfetti();
        swapToChickenAttack();
    }
});