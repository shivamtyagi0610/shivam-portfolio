/**
 * ProjectDrawer
 * -----------------------------------------------------------------------
 * Enhanced "drawer" experience for bento project cards — staggered reveal,
 * tech-stack label, scroll lock. Wraps both initAIProjectDrawer() and the
 * second closeProjectModal() definition from the original main.js. The
 * close handler is exposed on `window.closeProjectModal` so the inline
 * `onclick` attributes in the drawer HTML keep working.
 */
export class ProjectDrawer {
    init() {
        const overlay = document.querySelector('.project-drawer-overlay');
        const drawer = document.querySelector('.project-drawer');
        const cards = document.querySelectorAll('.bento-card');

        if (!overlay || !drawer) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalImg = document.getElementById('modalImg');
        const modalGithubLink = document.getElementById('modalGithub');
        const modalTech = document.getElementById('modalTech');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');
                const img = card.getAttribute('data-img');
                const github = card.getAttribute('data-github');

                // Extract tech stack from desc or use default
                const tech = title.includes('AI') ? 'Neural Networks · LLMs · RAG' : 'System Design · Java · API';

                if (title) {
                    // Populate data
                    modalTitle.textContent = title;
                    modalDesc.textContent = desc;
                    modalImg.src = img;
                    modalGithubLink.href = github;
                    modalTech.textContent = tech;

                    // Show Overlay & Drawer
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Restart "Typing" feel for header
                    modalTitle.style.opacity = '0';
                    setTimeout(() => {
                        modalTitle.style.opacity = '1';
                        modalTitle.style.transition = 'opacity 0.8s ease';
                    }, 400);
                }
            });
        });

        // Expose for the inline onclick handlers in project-drawer.html
        window.closeProjectModal = ProjectDrawer.close;
    }

    static close() {
        const overlay = document.querySelector('.project-drawer-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 600); // Wait for transition
        }
    }
}
