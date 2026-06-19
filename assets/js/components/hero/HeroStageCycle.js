/**
 * HeroStageCycle — rotates the role label inside the hero stage on a loop.
 * Mirrors initHeroStageCycle() from the original main.js exactly.
 */
export class HeroStageCycle {
    init() {
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
}
