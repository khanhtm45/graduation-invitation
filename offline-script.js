// Simple offline JavaScript without CDN dependencies

// RSVP Button
const rsvpButton = document.getElementById('rsvpButton');

if (rsvpButton) {
    rsvpButton.addEventListener('click', () => {
        // Simple celebration without canvas-confetti
        createSimpleConfetti();

        // Show custom modal instead of alert
        setTimeout(() => {
            const modal = document.getElementById('rsvpModal');
            if (modal) {
                modal.classList.add('active');
            }
        }, 500);
    });
}

// Modal close button
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modal = document.getElementById('rsvpModal');

if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Simple confetti effect without external library
function createSimpleConfetti() {
    const colors = ['#d4af37', '#6eb9d4', '#4a7c9e', '#fef9f3', '#a8d5e2'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Simple fade-in on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Initialize Particles.js for star effect
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'star',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.3,
                        sync: false
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'bottom',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'bubble'
                    },
                    onclick: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 150,
                        size: 8,
                        duration: 2,
                        opacity: 1,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    }
                }
            },
            retina_detect: true
        });
    }
});
