/**
 * ProjectModal
 * -----------------------------------------------------------------------
 * Original "basic" modal binding for the bento project cards. This was
 * present in the monolithic main.js alongside the newer ProjectDrawer and
 * both ran on DOMContentLoaded. It is preserved verbatim — same selectors,
 * same behavior — so the refactor doesn't drop logic.
 *
 * Mirrors initProjectModal() from the original main.js.
 */
export class ProjectModal {
    init() {
        const modal = document.getElementById('projectModal');
        const cards = document.querySelectorAll('.bento-card');

        if (!modal) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalImg = document.getElementById('modalImg');
        const modalGithubLink = document.querySelector('#modalGithub a');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');
                const img = card.getAttribute('data-img');
                const github = card.getAttribute('data-github');

                if (title) {
                    modalTitle.textContent = title;
                    modalDesc.textContent = desc;
                    modalImg.src = img;
                    modalGithubLink.href = github;

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scroll
                }
            });
        });
    }
}
