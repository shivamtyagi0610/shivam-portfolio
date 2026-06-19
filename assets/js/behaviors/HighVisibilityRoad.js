/**
 * HighVisibilityRoad
 * -----------------------------------------------------------------------
 * Generates and animates the SVG "journey road" running behind the page.
 * The referenced DOM nodes (#roadBase, #roadCenter, .road-background-layer)
 * are no longer rendered, so init() early-returns. Preserved verbatim from
 * the original initHighVisibilityRoad() to keep behavior identical.
 *
 * NOTE: Was originally bound to window 'load'. main.js wires it the same way.
 */
export class HighVisibilityRoad {
    init() {
        const roadBase = document.getElementById('roadBase');
        const roadCenter = document.getElementById('roadCenter');
        const svg = document.getElementById('globalRoadSvg');
        if (!roadBase || !roadCenter) return;

        const generatePath = () => {
            const bodyHeight = document.body.scrollHeight;
            const width = window.innerWidth;
            const sections = Array.from(document.querySelectorAll('section'));

            // Update SVG Height
            svg.style.height = bodyHeight + 'px';
            svg.setAttribute('viewBox', `0 0 ${width} ${bodyHeight}`);

            let d = `M ${width / 2} 0`;
            let lastX = width / 2;
            let lastY = 0;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionBottom = rect.bottom + window.scrollY;
                const sectionMid = (sectionTop + sectionBottom) / 2;

                // Target X (winding)
                const targetX = index % 2 === 0 ? width * 0.15 : width * 0.85;
                const targetY = sectionMid;

                // Smooth cubic curves
                const cp1y = lastY + (targetY - lastY) / 3;
                const cp2y = lastY + (2 * (targetY - lastY)) / 3;

                d += ` C ${lastX} ${cp1y}, ${targetX} ${cp2y}, ${targetX} ${targetY}`;

                lastX = targetX;
                lastY = targetY;

                // Add Pin directly to background layer
                const pinId = 'pin-' + index;
                if (!document.getElementById(pinId)) {
                    const pin = document.createElement('div');
                    pin.id = pinId;
                    pin.className = 'road-marker-pin';
                    pin.style.left = `${targetX}px`;
                    pin.style.top = `${sectionTop}px`;
                    pin.innerHTML = '<div class="pin-head"><span>📍</span></div>';
                    document.querySelector('.road-background-layer').appendChild(pin);
                }
            });

            // Final exit
            d += ` L ${width / 2} ${bodyHeight}`;

            roadBase.setAttribute('d', d);
            roadCenter.setAttribute('d', d);
        };

        window.addEventListener('resize', generatePath);
        generatePath();

        // Road motion animation
        let dashOffset = 0;
        const animateRoad = () => {
            dashOffset -= 1.5;
            roadCenter.style.strokeDashoffset = dashOffset;
            requestAnimationFrame(animateRoad);
        };
        animateRoad();
    }
}
