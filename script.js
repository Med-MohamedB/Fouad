document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.getElementById('particle-container');
    let mouseX = 0, mouseY = 0;
    const particles = [];

    const leafColors = [
        'rgba(79, 209, 197, 0.4)',   
        'rgba(45, 55, 72, 0.3)',     
        'rgba(32, 42, 58, 0.5)',     
        'rgba(79, 209, 197, 0.2)'    
    ];

    class LeafParticle {
        constructor() {
            this.element = document.createElement('div');
            this.element.classList.add('leaf-particle');
            
            this.width = Math.random() * 15 + 10;
            this.height = this.width * (Math.random() * 0.5 + 0.5);
            this.speed = Math.random() * 1.5 + 0.5;
            this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
            
            this.wobbleFrequency = Math.random() * 0.05 + 0.02;
            this.wobbleAmplitude = Math.random() * 10 + 5;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
            
            this.x = Math.random() * window.innerWidth;
            this.y = -50;
            this.time = Math.random() * 100;
            this.rotation = Math.random() * 360;
            
            this.createLeafShape();
            
            particleContainer.appendChild(this.element);
        }

        createLeafShape() {
            this.element.innerHTML = `
                <svg viewBox="0 0 30 40" width="${this.width}" height="${this.height}">
                    <path 
                        d="M15 0 Q25 10, 20 20 Q15 30, 15 40 Q10 30, 5 20 Q0 10, 15 0" 
                        fill="${this.color}" 
                        stroke="none"
                    />
                </svg>
            `;
            
            this.element.style.position = 'absolute';
            this.element.style.transformOrigin = 'center';
        }

        update() {
            this.time += 0.1;
            
            this.y += this.speed;
            this.x += Math.sin(this.time * this.wobbleFrequency) * this.wobbleAmplitude * 0.1;
            
            this.rotation += this.rotationSpeed;

            const cursorInfluence = (mouseX - this.x) / window.innerWidth;
            this.x += cursorInfluence * 1.1; 

            this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
            
            if (this.y > window.innerHeight + 50) {
                this.element.remove();
                return false;
            }
            return true;
        }
    }

    const particleStyle = document.createElement('style');
    particleStyle.innerHTML = `
        #particle-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
            perspective: 1000px;
        }
        .leaf-particle {
            position: absolute;
            pointer-events: none;
            will-change: transform;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(particleStyle);

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function generateLeaves() {
        if (particles.length < 70) {
            particles.push(new LeafParticle());
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].update()) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(generateLeaves);
    }

    generateLeaves();

//nav
    const navButtons = document.querySelectorAll('.nav-links button');
    const sections = document.querySelectorAll('main section');
    const defaultSection = document.querySelector('main section#home');
    if (defaultSection) {
        defaultSection.classList.add('active-section');
        const homeButton = document.querySelector('.nav-links button[data-section="home"]');
        if (homeButton) {
            homeButton.classList.add('active');
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active-section');
                section.classList.add('hidden-section');
            });

            const sectionToShow = document.getElementById(button.dataset.section);
            sectionToShow.classList.remove('hidden-section');
            sectionToShow.classList.add('active-section');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.menu-backdrop');
    const navButtons = document.querySelectorAll('.nav-links button');

    function toggleMenu() {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        backdrop.classList.toggle('show');
        
        if (navLinks.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    hamburger.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
            const sectionId = button.dataset.section;
            const sections = document.querySelectorAll('main section');
            
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active-section');
                section.classList.add('hidden-section');
            });

            const sectionToShow = document.getElementById(sectionId);
            if (sectionToShow) {
                sectionToShow.classList.remove('hidden-section');
                sectionToShow.classList.add('active-section');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            backdrop.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const typingContainer = document.querySelector('.typing-container');
    const text = "(Ecole Supérieur de l'Informatique) started his path in learning programming.";
    let charIndex = 0;

    function typeText() {
        if (charIndex < text.length) {
            typingContainer.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50); 
        } else {
            typingContainer.style.animation = 'float 3s ease-in-out infinite';
        }
    }

    setTimeout(typeText, 1000);

    const nameElement = document.getElementById('name');
    const letters = nameElement.textContent.split('');
    
    nameElement.innerHTML = letters
        .map(letter => `<span class="letter">${letter}</span>`)
        .join('');

    const letterElements = nameElement.querySelectorAll('.letter');
    letterElements.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.1}s`;
    });

    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseover', () => {
            highlight.style.transform = 'scale(1.1)';
            highlight.style.transition = 'transform 0.3s ease';
        });

        highlight.addEventListener('mouseout', () => {
            highlight.style.transform = 'scale(1)';
        });
    });
});

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const threshold = 100; 

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > threshold) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else {
        // Scrolling up or at top
        navbar.classList.add('scroll-up');
        navbar.classList.remove('scroll-down');
    }
    
    lastScrollTop = scrollTop;
});

