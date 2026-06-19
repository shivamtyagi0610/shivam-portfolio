/**
 * ScrollEffects
 * -----------------------------------------------------------------------
 * Cross-cutting scroll behavior:
 *   - Toggle the navbar's `scrolled` class past 50px
 *   - Toggle the back-to-top button's `visible` class past 500px
 *   - Highlight the active nav link based on the section currently in view
 *   - Trigger the nav pill to re-position via window.__updateNavPill
 *
 * Mirrors initScrollEffects() from the original main.js exactly.
 */
export class ScrollEffects {
    init() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('backToTop');
        const navAnchors = document.querySelectorAll('.nav-links a');

        // Only track sections that have a matching nav link, so scrolling through
        // unlinked sections (e.g. #ai-intelligence, #process) keeps the previous
        // mapped nav item active instead of clearing it.
        const navHrefs = new Set(
            Array.from(navAnchors)
                .map(a => a.getAttribute('href'))
                .filter(Boolean)
        );
        const trackableSections = Array.from(
            document.querySelectorAll('section[id]')
        ).filter(s => navHrefs.has('#' + s.getAttribute('id')));

        let lastActiveId = null;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            if (navbar) {
                navbar.classList.toggle('scrolled', scrollY > 50);
            }

            if (backToTop) {
                backToTop.classList.toggle('visible', scrollY > 500);
            }

            // Skip active-link updates while a programmatic scroll (nav click) is
            // in progress, so the pill goes directly to the clicked tab without
            // bouncing through every section in between.
            if (window.__navSuppressScrollActive) return;

            // Active link highlight — pick the last trackable section we've passed
            let currentId = trackableSections.length
                ? trackableSections[0].getAttribute('id')
                : '';
            for (const section of trackableSections) {
                if (scrollY >= section.offsetTop - 200) {
                    currentId = section.getAttribute('id');
                }
            }

            if (currentId !== lastActiveId) {
                navAnchors.forEach(a => {
                    a.classList.toggle(
                        'active',
                        a.getAttribute('href') === '#' + currentId
                    );
                });
                lastActiveId = currentId;
                if (typeof window.__updateNavPill === 'function') {
                    window.__updateNavPill();
                }
            }
        });
    }
}
