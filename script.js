function updateCountdown() {
    const targetDate = new Date('2025-06-28T00:00:00');
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML =
            '<b>Xách xe lên đi đi bây ơi LES GOOO! 🎉</b>';
        triggerConfetti();
        swapToChickenAttack();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
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
            // Hide and stop original video
            originalVideo.pause();
            originalVideo.style.display = 'none';
            
            // Show chicken attack video
            chickenVideo.style.display = 'block';
            chickenVideo.currentTime = 17; // Start at 0:17
            chickenVideo.muted = true; // Start muted
            // Don't autoplay, wait for user to click
            
            // Reset and show the button for the new video
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
setInterval(updateCountdown, 1000);
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