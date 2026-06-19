/**
 * Hero3DTilt — mouse-driven tilt for the legacy `.identity-radial-system`.
 * The target element is no longer in the document, but the behavior is
 * preserved verbatim to match the original main.js. init3DHeroTilt() now.
 */
export class Hero3DTilt {
    init() {
        const stage = document.querySelector('.identity-radial-system');
        if (!stage) return;

        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            // Tilt amount
            const rotateX = deltaY * 15; // Up/Down
            const rotateY = deltaX * -15; // Left/Right

            stage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
}
