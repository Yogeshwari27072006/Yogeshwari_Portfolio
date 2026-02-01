// ========================================
// SIDE NAVIGATION FUNCTIONALITY
// ========================================

// Active navigation highlighting
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 0;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidenav.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });
});

// ========================================
// MOBILE NAVIGATION
// ========================================

const mobileToggle = document.getElementById('mobileToggle');
const sidenav = document.getElementById('sidenav');

if (mobileToggle && sidenav) {
    mobileToggle.addEventListener('click', () => {
        sidenav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sidenav') && !e.target.closest('.mobile-toggle')) {
            sidenav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

// ========================================
// ANIMATED ELEMENTS ON SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInElements = document.querySelectorAll(
    '.about-card, .timeline-card, .skill-box, .project-hero, .experience-card'
);

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});

// ========================================
// HERO STATS COUNTER ANIMATION
// ========================================

const stats = document.querySelectorAll('.stat-item h3');
let statsAnimated = false;

function animateStats() {
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const isDecimal = target.toString().includes('.');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = isDecimal ? target.toFixed(1) : Math.ceil(target);
                clearInterval(timer);
            } else {
                stat.textContent = isDecimal ? current.toFixed(1) : Math.ceil(current);
            }
        }, 20);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========================================
// PROFILE IMAGE TILT EFFECT
// ========================================

const profileImage = document.querySelector('.profile-image');

if (profileImage) {
    profileImage.addEventListener('mousemove', (e) => {
        const rect = profileImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ========================================
// SKILL TAGS HOVER EFFECT
// ========================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// PARALLAX EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Hero parallax
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    
    if (heroLeft && scrolled < window.innerHeight) {
        heroLeft.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroLeft.style.opacity = 1 - (scrolled / 700);
    }
    
    if (heroRight && scrolled < window.innerHeight) {
        heroRight.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ========================================
// GRADIENT TEXT ANIMATION
// ========================================

const gradientText = document.querySelector('.gradient-text');

if (gradientText) {
    let hue = 0;
    
    setInterval(() => {
        hue += 1;
        if (hue > 360) hue = 0;
        gradientText.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue + 60}, 70%, 60%))`;
        gradientText.style.webkitBackgroundClip = 'text';
        gradientText.style.backgroundClip = 'text';
    }, 50);
}

// ========================================
// TYPING EFFECT FOR HERO TITLE
// ========================================

const heroTitle = document.querySelector('.hero-title');

if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let index = 0;
    let isTag = false;
    let tagBuffer = '';
    
    function type() {
        if (index < text.length) {
            const char = text.charAt(index);
            
            if (char === '<') {
                isTag = true;
                tagBuffer = '<';
            } else if (char === '>') {
                isTag = false;
                tagBuffer += '>';
                heroTitle.innerHTML += tagBuffer;
                tagBuffer = '';
            } else if (isTag) {
                tagBuffer += char;
            } else {
                heroTitle.innerHTML += char;
            }
            
            index++;
            setTimeout(type, isTag ? 0 : 50);
        }
    }
    
    setTimeout(type, 500);
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================

const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: var(--nav-width);
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #ec4899);
    transform-origin: left;
    transform: scaleX(0);
    z-index: 9999;
    transition: transform 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight);
    progressBar.style.transform = `scaleX(${scrolled})`;
});

// ========================================
// CONTACT METHOD HOVER EFFECT
// ========================================

const contactMethods = document.querySelectorAll('.contact-method');

contactMethods.forEach(method => {
    method.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.method-icon');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.1)';
            icon.style.transition = 'transform 0.5s ease';
        }
    });
    
    method.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.method-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
        }
    });
});

// ========================================
// COPY EMAIL ON CLICK
// ========================================

const emailMethod = document.querySelector('a[href^="mailto:"]');

if (emailMethod) {
    emailMethod.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const email = emailMethod.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                const originalText = emailMethod.querySelector('.method-value').textContent;
                emailMethod.querySelector('.method-value').textContent = 'Copied!';
                
                setTimeout(() => {
                    emailMethod.querySelector('.method-value').textContent = originalText;
                }, 2000);
            });
        }
    });
}

// ========================================
// SMOOTH PAGE LOAD
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c👋 Hello Developer!', 'font-size: 24px; color: #6366f1; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #64748b;');
console.log('%c💼 Yogeshwari A - Textile Technologist', 'font-size: 12px; color: #ec4899;');
console.log('%c📧 ayogeshwari44@gmail.com', 'font-size: 12px; color: #14b8a6;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedUpdateNav = debounce(updateActiveNav, 100);
window.removeEventListener('scroll', updateActiveNav);
window.addEventListener('scroll', debouncedUpdateNav);
