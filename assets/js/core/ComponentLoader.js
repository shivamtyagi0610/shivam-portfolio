/**
 * ComponentLoader
 * -----------------------------------------------------------------------
 * Replaces every `<div data-component="name">` placeholder in the document
 * with the HTML found at `assets/js/components/<name>/<name>.html`.
 *
 * Returns a promise that resolves once every placeholder has been
 * populated, so the entry point can safely initialize behavior classes
 * (which query the DOM) only after the markup is in place.
 *
 * Requires the page to be served over HTTP(S); `fetch` against `file://`
 * is blocked by browsers.
 */
export class ComponentLoader {
    constructor(basePath = 'assets/js/components') {
        this.basePath = basePath;
    }

    async loadAll() {
        const placeholders = document.querySelectorAll('[data-component]');
        await Promise.all(
            Array.from(placeholders).map(el => this.#loadInto(el))
        );
    }

    async #loadInto(el) {
        const name = el.getAttribute('data-component');
        const url = `${this.basePath}/${name}/${name}.html`;

        // Always revalidate so edited fragments never get served from a stale
        // browser/dev-server cache (otherwise UI changes appear to "not show up").
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) {
            throw new Error(`ComponentLoader: failed to load ${url} (${res.status})`);
        }
        el.innerHTML = await res.text();
    }
}
