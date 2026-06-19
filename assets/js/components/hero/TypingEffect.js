/**
 * TypingEffect — typewriter reveal for the hero tagline.
 * Mirrors initTypingEffect() from the original main.js exactly.
 */
export class TypingEffect {
    init() {
        const tagline = document.querySelector('.hero-tagline');
        if (!tagline) return;

        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(type, 40);
            }
        }

        setTimeout(type, 1000);
    }
}
