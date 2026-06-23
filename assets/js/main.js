/**
 * Shivam Tyagi Portfolio — Entry Point
 * -----------------------------------------------------------------------
 * 1. Fetches every component's HTML fragment via ComponentLoader and
 *    injects it into the matching <div data-component> placeholder in
 *    index.html.
 * 2. Once all fragments are in the DOM, instantiates each behavior class
 *    and calls init(). Each class owns one feature from the original
 *    monolithic main.js — logic is identical, only the packaging changed.
 *
 * NOTE: Because step 1 uses fetch(), the page MUST be served over HTTP.
 *       Opening index.html directly via file:// will fail. See README.md.
 */

import { ComponentLoader } from './core/ComponentLoader.js';

import { HeroAnimations }    from './components/hero/HeroAnimations.js';
import { TypingEffect }      from './components/hero/TypingEffect.js';
import { HeroStageCycle }    from './components/hero/HeroStageCycle.js';
import { Hero3DTilt }        from './components/hero/Hero3DTilt.js';
import { AICore3D }          from './components/hero/AICore3D.js';

import { NavPill }           from './components/navbar/NavPill.js';
import { MobileMenu }        from './components/navbar/MobileMenu.js';

import { ProjectDrawer }     from './components/project-drawer/ProjectDrawer.js';
import { ProjectsGallery }   from './components/projects-gallery/ProjectsGallery.js';

import { ScrollEffects }     from './behaviors/ScrollEffects.js';
import { ScrollReveal }      from './behaviors/ScrollReveal.js';
import { SpotlightGlow }     from './behaviors/SpotlightGlow.js';
import { AIShowcase }        from './behaviors/AIShowcase.js';
import { HighVisibilityRoad } from './behaviors/HighVisibilityRoad.js';

async function boot() {
    // 1. Pull every component fragment into the shell.
    const loader = new ComponentLoader();
    await loader.loadAll();

    // 2. Wire up behaviors that read the newly-injected DOM.
    //    Order mirrors the original main.js DOMContentLoaded handler.
    new HeroAnimations().init();
    new NavPill().init();
    new ScrollEffects().init();
    new ScrollReveal().init();
    new TypingEffect().init();
    new MobileMenu().init();
    new HeroStageCycle().init();
    new SpotlightGlow().init();
    new AIShowcase().init();

    // Originally each of these registered its own DOMContentLoaded listener.
    // NOTE: the legacy ProjectModal double-bound the same cards as ProjectDrawer
    // (and threw on a stale selector), so the drawer is now the single owner.
    new ProjectDrawer().init();
    new ProjectsGallery().init();
    new Hero3DTilt().init();
    new AICore3D().init();

    // Originally bound to window 'load' — keep the same timing.
    window.addEventListener('load', () => new HighVisibilityRoad().init());
}

document.addEventListener('DOMContentLoaded', boot);
