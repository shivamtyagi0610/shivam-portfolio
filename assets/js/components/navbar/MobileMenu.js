/**
 * MobileMenu — hamburger toggle and "close on link click" for the navbar.
 * Mirrors initMobileMenu() from the original main.js exactly.
 */
export class MobileMenu {
    init() {
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
}
