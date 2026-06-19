/**
 * ScrollReveal
 * -----------------------------------------------------------------------
 * Auto-tags meaningful children inside each section with `data-reveal`, then
 * uses IntersectionObservers to:
 *   - reveal sections once they enter the viewport (adds `.visible`)
 *   - reveal each tagged child with a staggered delay (adds `.is-revealed`)
 *
 * Mirrors initScrollReveal() from the original main.js exactly.
 */
export class ScrollReveal {
    init() {
        // Auto-tag meaningful children inside each section so they get a
        // staggered fade-up when the section enters the viewport. Skips the
        // hero section (always visible) and any element already tagged.
        const autoSelectors = [
            ':scope > .section-tag',
            ':scope > .section-heading',
            ':scope > p',
            ':scope > .projects-grid > .project-card',
            ':scope > .services-grid > .service-card',
            ':scope > .ai-grid > .ai-card',
            ':scope > .ai-grid > .expertise-card',
            ':scope > .expertise-list > .exp-row',
            ':scope > .process-grid > *',
            ':scope > .roadmap-section > *',
            ':scope > .about-section > *',
            ':scope > .contact-container > *',
        ].join(', ');

        document.querySelectorAll('section:not(.hero)').forEach(section => {
            const items = section.querySelectorAll(autoSelectors);
            items.forEach((el, idx) => {
                if (el.hasAttribute('data-reveal')) return;
                // Vary direction subtly based on index for visual interest
                const variant = (idx % 5 === 0) ? 'scale'
                              : (idx % 4 === 0) ? 'left'
                              : (idx % 4 === 2) ? 'right'
                              : '';
                el.setAttribute('data-reveal', variant);
            });
        });

        // Section-level observer
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

        // Child-level observer with per-element stagger delay
        const childObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                // Compute delay based on position among siblings under same section
                const section = el.closest('section');
                if (section) {
                    const siblings = section.querySelectorAll('[data-reveal]');
                    const idx = Array.prototype.indexOf.call(siblings, el);
                    el.style.setProperty('--reveal-delay', `${Math.min(idx, 8) * 0.09}s`);
                }
                el.classList.add('is-revealed');
                childObserver.unobserve(el);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('[data-reveal]').forEach(el => childObserver.observe(el));
    }
}
