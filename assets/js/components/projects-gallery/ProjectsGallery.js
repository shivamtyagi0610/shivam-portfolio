/**
 * ProjectsGallery
 * -----------------------------------------------------------------------
 * Renders the "All Projects" overlay from the shared PROJECTS data, wires
 * the filter chips, the per-card "Preview" (image lightbox) and "Details"
 * (reuses ProjectDrawer) actions, and the open/close behaviour triggered
 * by the "View All Projects" button in the projects section.
 */
import { PROJECTS } from '../projects/projectsData.js';
import { ProjectDrawer } from '../project-drawer/ProjectDrawer.js';

export class ProjectsGallery {
    init() {
        this.overlay = document.getElementById('projectsGallery');
        this.grid = document.getElementById('galleryGrid');
        if (!this.overlay || !this.grid) return;

        this.lightbox = document.getElementById('galleryLightbox');

        this.#renderCards();
        this.#bindFilters();
        this.#bindOpenClose();
        this.#bindLightbox();
    }

    /* ---------- Rendering ---------- */
    #renderCards() {
        this.grid.innerHTML = PROJECTS.map((p) => `
            <article class="g-card" data-tags="${p.tags.join(' ')}">
                <div class="g-card-media">
                    <img src="${p.img}" alt="${p.name}" loading="lazy"
                         onerror="this.closest('.g-card-media').classList.add('no-img')">
                    <span class="g-card-badge">${p.icon}</span>
                    <button class="g-preview" data-preview="${p.id}" aria-label="Preview ${p.name}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        Preview
                    </button>
                </div>
                <div class="g-card-body">
                    <span class="g-card-cat">${p.category}</span>
                    <h3 class="serif">${p.name}</h3>
                    <p>${p.short}</p>
                    <div class="g-card-tech">
                        ${p.tech.slice(0, 3).map((t) => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="g-card-foot">
                        <button class="g-details" data-details="${p.id}">View Details →</button>
                        <a class="g-github" href="${p.github}" target="_blank" rel="noopener"
                           aria-label="Source code">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');

        // Wire per-card actions
        this.grid.querySelectorAll('[data-details]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const project = PROJECTS.find((p) => p.id === btn.dataset.details);
                if (project) ProjectDrawer.open(project);
            });
        });

        this.grid.querySelectorAll('[data-preview]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const project = PROJECTS.find((p) => p.id === btn.dataset.preview);
                if (project) this.#openLightbox(project);
            });
        });
    }

    /* ---------- Filters ---------- */
    #bindFilters() {
        const chips = this.overlay.querySelectorAll('.filter-chip');
        chips.forEach((chip) => {
            chip.addEventListener('click', () => {
                chips.forEach((c) => c.classList.remove('is-active'));
                chip.classList.add('is-active');

                const filter = chip.dataset.filter;
                this.grid.querySelectorAll('.g-card').forEach((card) => {
                    const match = filter === 'all' || card.dataset.tags.split(' ').includes(filter);
                    card.classList.toggle('is-hidden', !match);
                });
            });
        });
    }

    /* ---------- Open / Close gallery ---------- */
    #bindOpenClose() {
        document.querySelectorAll('[data-open-gallery]').forEach((trigger) => {
            trigger.addEventListener('click', () => this.open());
        });

        this.overlay.querySelectorAll('[data-gallery-close]').forEach((el) => {
            el.addEventListener('click', () => this.close());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) this.close();
        });
    }

    open() {
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.remove('active');
        if (!document.querySelector('.project-drawer-overlay.active')) {
            document.body.style.overflow = '';
        }
    }

    /* ---------- Preview lightbox ---------- */
    #bindLightbox() {
        if (!this.lightbox) return;
        this.lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
            el.addEventListener('click', () => this.lightbox.classList.remove('active'));
        });
    }

    #openLightbox(project) {
        if (!this.lightbox) return;
        this.lightbox.querySelector('#lightboxImg').src = project.img;
        this.lightbox.querySelector('#lightboxTitle').textContent = project.title;

        const actions = this.lightbox.querySelector('#lightboxActions');
        const live = project.live
            ? `<a class="btn-pill btn-dark" href="${project.live}" target="_blank" rel="noopener">↗ Live Demo</a>`
            : '';
        actions.innerHTML = `
            ${live}
            <a class="btn-pill btn-outline" href="${project.github}" target="_blank" rel="noopener">View Code</a>
        `;
        this.lightbox.classList.add('active');
    }
}
