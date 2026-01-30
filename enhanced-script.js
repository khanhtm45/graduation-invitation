// Initialize Lucide icons
lucide.createIcons();

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100
});

// ========== CONFETTI EFFECTS ==========

// Professional confetti burst using canvas-confetti
function fireConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
        colors: ['#d4af37', '#6eb9d4', '#4a7c9e', '#fef9f3', '#a8d5e2']
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Fire from left side
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });

        // Fire from right side
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}

// Graduation cap confetti
function fireGraduationCaps() {
    const scalar = 2;
    const graduationCap = confetti.shapeFromText({ text: '🎓', scalar });

    const defaults = {
        spread: 360,
        ticks: 60,
        gravity: 0.5,
        decay: 0.94,
        startVelocity: 30,
        shapes: [graduationCap],
        scalar,
        colors: ['#4a7c9e', '#6eb9d4', '#d4af37']
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 30
        });

        confetti({
            ...defaults,
            particleCount: 20,
            scalar: scalar / 2,
            shapes: ['circle', 'square']
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}

// ========== FALLING GRADUATION CAPS ==========

function createFallingCap() {
    const cap = document.createElement('div');
    cap.className = 'falling-cap';
    cap.innerHTML = '🎓';
    cap.style.left = Math.random() * 100 + '%';
    cap.style.animationDuration = (Math.random() * 3 + 4) + 's';
    cap.style.fontSize = (Math.random() * 20 + 25) + 'px';

    document.body.appendChild(cap);

    setTimeout(() => {
        cap.remove();
    }, 7000);
}

// Create falling caps periodically
function startFallingCaps() {
    setInterval(() => {
        if (Math.random() > 0.3) {
            createFallingCap();
        }
    }, 800);
}

// ========== MUSIC PLAYER ==========

const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicWave = document.getElementById('musicWave');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.setAttribute('data-lucide', 'play');
        musicWave.classList.add('paused');
        isPlaying = false;
    } else {
        // Note: Auto-play might be blocked by browser policies
        // User interaction is required to play audio
        bgMusic.play().catch(err => {
            console.log('Audio playback failed:', err);
            alert('Please add a music file to enable background music!');
        });
        musicIcon.setAttribute('data-lucide', 'pause');
        musicWave.classList.remove('paused');
        isPlaying = true;
    }
    lucide.createIcons();
});

// ========== RSVP BUTTON ==========

const rsvpButton = document.getElementById('rsvpButton');

rsvpButton.addEventListener('click', () => {
    // Fire confetti celebration
    fireConfetti();

    // Fire graduation caps after a short delay
    setTimeout(() => {
        fireGraduationCaps();
    }, 500);

    // Show confirmation message
    setTimeout(() => {
        alert('🎉 Thank you for confirming your attendance! We can\'t wait to celebrate with you! 🎓');
    }, 1000);
});

// ========== LEGACY EFFECTS (keeping some for variety) ==========

// Create confetti particles (simple CSS version)
function createConfetti() {
    const colors = ['#d4af37', '#6eb9d4', '#4a7c9e', '#fef9f3'];
    const container = document.body;

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 4 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';

        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.width = '15px';
            confetti.style.height = '5px';
        }

        container.appendChild(confetti);
    }
}

// Create floating particles
function createParticles() {
    const container = document.body;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const circle = document.createElement('div');
        circle.className = 'particle-circle';
        particle.appendChild(circle);

        particle.style.left = Math.random() * 100 + '%';
        circle.style.animationDelay = Math.random() * 15 + 's';
        circle.style.animationDuration = (Math.random() * 10 + 10) + 's';

        container.appendChild(particle);
    }
}

// Sparkle effect on mouse move
let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '<i data-lucide="sparkles" style="color: #d4af37; width: 20px; height: 20px;"></i>';
            sparkle.style.left = e.pageX + 'px';
            sparkle.style.top = e.pageY + 'px';
            document.body.appendChild(sparkle);

            lucide.createIcons();

            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }
    }, 50);
});

// Glow effect following mouse
document.querySelectorAll('.left-panel, .name-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const glowEffect = card.querySelector('.glow-effect');
        if (glowEffect) {
            glowEffect.style.setProperty('--x', x + '%');
            glowEffect.style.setProperty('--y', y + '%');
        }
    });
});

// Add more dynamic stars
function createStars() {
    const body = document.body;
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        body.appendChild(star);
    }
}

// Initialize all effects
createStars();
createConfetti();
createParticles();
startFallingCaps();

// Smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.left-panel, .right-panel').forEach(el => {
    observer.observe(el);
});

// ========== PAGE LOAD CELEBRATION ==========

window.addEventListener('load', () => {
    // Fire initial confetti after page loads
    setTimeout(() => {
        fireConfetti();
    }, 500);

    // Fire graduation caps
    setTimeout(() => {
        fireGraduationCaps();
    }, 1200);

    // Create burst of sparkles
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.innerHTML = '<i data-lucide="sparkles" style="color: #d4af37; width: 25px; height: 25px;"></i>';
                sparkle.style.left = (Math.random() * 80 + 10) + '%';
                sparkle.style.top = (Math.random() * 80 + 10) + '%';
                document.body.appendChild(sparkle);

                lucide.createIcons();

                setTimeout(() => {
                    sparkle.remove();
                }, 1500);
            }, i * 200);
        }
    }, 2000);
});
