/**
 * AIShowcase
 * -----------------------------------------------------------------------
 * Drives the interactive split showcase in the AI & Automation section.
 * The left-hand nav items act as tabs; selecting one cross-fades the
 * matching detail panel on the right, updates the giant ghost number, and
 * (re)starts a 6s auto-advance cycle. Auto-advance pauses while the pointer
 * is over the showcase and respects prefers-reduced-motion.
 */
export class AIShowcase {
    init() {
        const root = document.querySelector('[data-ai-showcase]');
        if (!root) return;

        const items   = Array.from(root.querySelectorAll('.ai-nav-item'));
        const panels  = Array.from(root.querySelectorAll('.ai-panel'));
        const ghost   = root.querySelector('[data-ghost]');
        const progress = root.querySelector('.ai-stage-progress');
        if (!items.length || !panels.length) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const INTERVAL = 6000;
        let current = 0;
        let timer = null;

        const restartProgress = () => {
            if (!progress || reduceMotion) return;
            progress.classList.remove('is-running');
            // Force reflow so the animation restarts from 0 each cycle.
            void progress.offsetWidth;
            progress.classList.add('is-running');
        };

        const select = (index) => {
            current = (index + items.length) % items.length;
            items.forEach((item, i) => {
                const active = i === current;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            panels.forEach((panel, i) => panel.classList.toggle('is-active', i === current));
            if (ghost) ghost.textContent = String(current + 1).padStart(2, '0');
            restartProgress();
        };

        const stop  = () => { if (timer) { clearInterval(timer); timer = null; } };
        const start = () => {
            if (reduceMotion) return;
            stop();
            timer = setInterval(() => select(current + 1), INTERVAL);
            restartProgress();
        };

        items.forEach((item, i) => {
            // Hover and focus preview on desktop; click locks it in on touch.
            item.addEventListener('mouseenter', () => { select(i); start(); });
            item.addEventListener('focus',      () => { select(i); start(); });
            item.addEventListener('click', (e) => { e.preventDefault(); select(i); start(); });
        });

        // Pause the carousel while the user is inspecting the showcase.
        root.addEventListener('mouseenter', stop);
        root.addEventListener('mouseleave', start);

        select(0);
        start();
    }
}
