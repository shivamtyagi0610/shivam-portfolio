/**
 * HeroAnimations — staggered entrance for hero copy + visual stage.
 * Mirrors initHeroAnimations() from the original main.js exactly.
 */
export class HeroAnimations {
    init() {
        const content = document.getElementById('heroContent');
        const visual = document.getElementById('heroVisual');

        if (content) {
            setTimeout(() => content.classList.add('fade-up'), 200);
        }
        if (visual) {
            setTimeout(() => visual.classList.add('fade-up'), 500);
        }
    }
}
