/**
 * ProjectDrawer
 * -----------------------------------------------------------------------
 * Immersive right-side drawer that shows a project's full breakdown —
 * staggered reveal, dynamic tech-stack chips, scroll lock.
 *
 * `ProjectDrawer.open(project)` is the single entry point used both by the
 * featured bento cards (which read their data-* attributes) and by the
 * "All Projects" gallery (which passes a project object from projectsData).
 * The close handler is exposed on `window.closeProjectModal` so the inline
 * `onclick` attributes in the drawer HTML keep working.
 */
export class ProjectDrawer {
    init() {
        const overlay = document.querySelector('.project-drawer-overlay');
        const drawer = document.querySelector('.project-drawer');
        if (!overlay || !drawer) return;

        // Featured bento cards → build a project object from their data-* attrs.
        document.querySelectorAll('.bento-card').forEach((card) => {
            card.addEventListener('click', () => {
                ProjectDrawer.open({
                    title: card.getAttribute('data-title'),
                    desc: card.getAttribute('data-desc'),
                    img: card.getAttribute('data-img'),
                    github: card.getAttribute('data-github'),
                    tech: (card.getAttribute('data-tech') || '')
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean),
                });
            });
        });

        // Expose for the inline onclick handlers in project-drawer.html
        window.closeProjectModal = ProjectDrawer.close;

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') ProjectDrawer.close();
        });
    }

    /**
     * Populate and reveal the drawer.
     * @param {{title, desc, img, github, tech?: string[], live?: string}} project
     */
    static open(project) {
        const overlay = document.querySelector('.project-drawer-overlay');
        if (!overlay || !project || !project.title) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalImg = document.getElementById('modalImg');
        const modalGithubLink = document.getElementById('modalGithub');
        const specGrid = overlay.querySelector('.spec-grid');

        modalTitle.textContent = project.title;
        modalDesc.textContent = project.desc || '';
        modalImg.src = project.img || '';
        modalGithubLink.href = project.github || '#';

        // Render the tech-stack as chips (falls back to a generic label).
        const techs = project.tech && project.tech.length ? project.tech : ['System Architecture'];
        if (specGrid) {
            specGrid.innerHTML = techs
                .map(
                    (t) => `
                <div class="spec-item">
                    <span class="spec-dot"></span>
                    <span>${t}</span>
                </div>`
                )
                .join('');
        }

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Restart the soft "typing" feel for the header.
        modalTitle.style.opacity = '0';
        setTimeout(() => {
            modalTitle.style.opacity = '1';
            modalTitle.style.transition = 'opacity 0.8s ease';
        }, 400);
    }

    static close() {
        const overlay = document.querySelector('.project-drawer-overlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        setTimeout(() => {
            // Keep scroll locked if the projects gallery is still open behind us.
            if (!document.querySelector('.gallery-overlay.active')) {
                document.body.style.overflow = '';
            }
        }, 600); // Wait for transition
    }
}
