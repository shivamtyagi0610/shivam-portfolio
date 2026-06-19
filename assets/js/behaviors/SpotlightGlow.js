/**
 * SpotlightGlow
 * -----------------------------------------------------------------------
 * Drives the cursor-following warm glow behind any element marked with
 * `data-spotlight` (currently the AI & Automation capability list). On
 * pointer move it writes the local cursor coordinates into the `--mx`/`--my`
 * CSS custom properties, which a radial-gradient `::before` reads to position
 * the glow. Updates are throttled to one write per animation frame.
 */
export class SpotlightGlow {
    init() {
        document.querySelectorAll('[data-spotlight]').forEach(el => {
            let ticking = false;
            let lastX = 0;
            let lastY = 0;

            el.addEventListener('pointermove', (e) => {
                const rect = el.getBoundingClientRect();
                lastX = e.clientX - rect.left;
                lastY = e.clientY - rect.top;
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(() => {
                    el.style.setProperty('--mx', `${lastX}px`);
                    el.style.setProperty('--my', `${lastY}px`);
                    ticking = false;
                });
            });
        });
    }
}
