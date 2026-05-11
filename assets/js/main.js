/**
 * Shivam Tyagi Portfolio — Main JavaScript
 * Phase 5: Final Polish
 *
 * Features:
 *  1. Hero entrance animations (staggered fade-up)
 *  2. Navbar shrink on scroll
 *  3. Back-to-top button visibility toggle
 *  4. Active nav link highlight on scroll
 *  5. Intersection Observer scroll-reveal for all sections
 *  6. Mobile hamburger menu toggle with X animation
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollEffects();
    initScrollReveal();
    initMobileMenu();
    initHeroStageCycle();
});

/* ============================================
   1. Hero Entrance Animations
   ============================================ */
function initHeroAnimations() {
    const content = document.getElementById('heroContent');
    const visual = document.getElementById('heroVisual');

    if (content) {
        setTimeout(() => content.classList.add('fade-up'), 200);
    }
    if (visual) {
        setTimeout(() => visual.classList.add('fade-up'), 500);
    }
}

/* ============================================
   2. Scroll Effects — Navbar Shrink, Back-to-Top, Active Link
   ============================================ */
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar shrink
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }

        // Back-to-top visibility
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 500);
        }

        // Active link highlight
        let currentId = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 200) {
                const id = section.getAttribute('id');
                if (id) currentId = id;
            }
        });

        navAnchors.forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (href && currentId && href === '#' + currentId) {
                a.classList.add('active');
            }
        });
    });
}

/* ============================================
   3. Intersection Observer — Scroll Reveal
   ============================================ */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

/* ============================================
   4. Mobile Hamburger Menu
   ============================================ */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navAnchors = document.querySelectorAll('.nav-links a');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navAnchors.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            menuToggle.classList.remove('active');
        });
    });
}

/* ============================================
   5. Hero Stage — Cycling Skill Text
   ============================================ */
function initHeroStageCycle() {
    const cycleEl = document.getElementById('heroCycleText');
    if (!cycleEl) return;

    const skills = [
        'Flutter Developer',
        'Dart Programmer',
        'Java Engineer',
        'Cloud Architect',
        'AI Builder',
        'MCA Graduate',
        'Android Developer'
    ];

    let index = 0;

    setInterval(() => {
        cycleEl.style.opacity = '0';
        
        setTimeout(() => {
            index = (index + 1) % skills.length;
            cycleEl.textContent = skills[index];
            cycleEl.style.opacity = '1';
        }, 500);
    }, 2200);
}
