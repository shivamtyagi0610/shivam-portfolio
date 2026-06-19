/**
 * NavPill — sliding indicator pill behind the active nav link.
 * Mirrors initNavPill() from the original main.js exactly.
 */
export class NavPill {
    init() {
        const navLinks = document.getElementById('navLinks');
        const navPill = document.getElementById('navPill');
        if (!navLinks || !navPill) return;

        const anchors = navLinks.querySelectorAll('a');

        const moveTo = (el) => {
            if (!el) {
                navPill.style.opacity = '0';
                return;
            }
            const linkRect = el.getBoundingClientRect();
            const containerRect = navLinks.getBoundingClientRect();
            const left = linkRect.left - containerRect.left;
            navPill.style.opacity = '1';
            navPill.style.width = `${linkRect.width}px`;
            navPill.style.transform = `translateX(${left}px)`;
        };

        const moveToActive = () => {
            const active = navLinks.querySelector('a.active') || anchors[0];
            moveTo(active);
        };

        // Click — set active immediately so pill slides directly to clicked link.
        // Also suppress scroll-driven active updates briefly so the pill doesn't
        // ricochet through intermediate sections during the browser's smooth scroll.
        anchors.forEach((a) => {
            a.addEventListener('click', () => {
                anchors.forEach((x) => x.classList.remove('active'));
                a.classList.add('active');
                requestAnimationFrame(moveToActive);

                window.__navSuppressScrollActive = true;
                clearTimeout(window.__navSuppressTimer);
                window.__navSuppressTimer = setTimeout(() => {
                    window.__navSuppressScrollActive = false;
                }, 1100);
            });
        });

        // Position on load + resize. Two RAFs to wait for fonts/layout settle.
        requestAnimationFrame(() => requestAnimationFrame(moveToActive));
        window.addEventListener('load', moveToActive);
        window.addEventListener('resize', moveToActive);

        // Expose for scroll-effects to call after toggling .active
        window.__updateNavPill = moveToActive;
    }
}
