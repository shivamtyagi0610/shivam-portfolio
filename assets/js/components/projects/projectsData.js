/**
 * projectsData
 * -----------------------------------------------------------------------
 * Single source of truth for every project shown on the site. The featured
 * bento grid (projects.html) renders a curated subset by hand, while the
 * "All Projects" gallery (ProjectsGallery.js) renders this entire list.
 *
 * Each entry:
 *   id       unique slug
 *   title    full title used in the detail drawer
 *   name     short title used on the gallery card
 *   icon     emoji glyph for the card badge
 *   category short label shown under the card title
 *   tags     filter keys ('ai' | 'flutter' | 'java' | 'game')
 *   short    one-line description for the gallery card
 *   desc     full description for the detail drawer
 *   img      preview image
 *   tech     technical-stack chips
 *   github   source-code link
 *   live     live demo link (null when not deployed)
 *   featured whether it appears in the bento grid
 */
export const PROJECTS = [
    {
        id: 'mysa',
        title: 'MySA — Personal AI Assistant',
        name: 'MySA — AI Assistant',
        icon: '🧠',
        category: 'AI · Flutter',
        tags: ['ai', 'flutter'],
        short: 'Context-aware personal assistant powered by Flutter and LLM integration.',
        desc: 'MySA is a state-of-the-art personal assistant built with Flutter and integrated with advanced Large Language Models. It features context-aware memory, autonomous task execution, and a seamless natural language interface.',
        img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
        tech: ['Flutter', 'Dart', 'LLM / RAG', 'REST APIs'],
        github: 'https://github.com/shivamtyagi0610/mysa-ai',
        live: null,
        featured: true,
    },
    {
        id: 'cards21',
        title: 'Cards21 — Real-time Engine',
        name: 'Cards21 Game',
        icon: '🎮',
        category: 'Java · Game',
        tags: ['java', 'game'],
        short: 'High-performance card game engine with real-time server logic.',
        desc: 'A high-performance card game engine developed using LibGDX and Java. The project implements complex game logic, real-time server synchronization, and a smooth, responsive UI for competitive gameplay.',
        img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop',
        tech: ['Java', 'LibGDX', 'Game Logic', 'Sockets'],
        github: 'https://github.com/shivamtyagi0610/cards21',
        live: null,
        featured: true,
    },
    {
        id: 'healthgen',
        title: 'HealthGen AI — Personal Doctor',
        name: 'HealthGen AI',
        icon: '🩺',
        category: 'AI Health',
        tags: ['ai', 'flutter'],
        short: 'AI doctor assistant for symptom analysis and report processing.',
        desc: 'HealthGen AI is an intelligent health assistant that allows users to chat about symptoms, receive medical advice, and analyze medical reports using AI-driven diagnostics.',
        img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
        tech: ['Flutter', 'LLM', 'Health AI', 'OCR'],
        github: 'https://github.com/shivamtyagi0610/healthgen-ai',
        live: null,
        featured: true,
    },
    {
        id: 'ai-research',
        title: 'AI Engineering & RAG Systems',
        name: 'AI Engineering',
        icon: '⚡',
        category: 'AI Research',
        tags: ['ai'],
        short: 'Scalable RAG pipelines & prompt engineering that minimise hallucinations.',
        desc: 'In-depth research into Retrieval-Augmented Generation (RAG) and prompt engineering. This project focuses on building scalable AI pipelines that minimize hallucinations and maximize context accuracy.',
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
        tech: ['Python', 'RAG', 'Vector DB', 'Prompt Engineering'],
        github: 'https://github.com/shivamtyagi0610/ai-research',
        live: null,
        featured: true,
    },
    {
        id: 'university-ms',
        title: 'University Management System',
        name: 'University MS',
        icon: '🎓',
        category: 'Java · MySQL',
        tags: ['java'],
        short: 'Desktop ERP for managing students, courses, faculty & results.',
        desc: 'A full-featured desktop University Management System built with Java Swing and a MySQL backend. It handles student enrolment, course and faculty management, attendance, fee tracking, and automated result generation — all behind a clean, role-based admin interface with secure JDBC data access.',
        img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
        tech: ['Java Swing', 'MySQL', 'JDBC', 'OOP'],
        github: 'https://github.com/shivamtyagi0610/university-management-system',
        live: null,
        featured: false,
    },
    {
        id: 'wallpaper-app',
        title: 'Wallverse — Wallpaper App',
        name: 'Wallpaper App',
        icon: '🖼️',
        category: 'Flutter',
        tags: ['flutter'],
        short: 'HD wallpaper gallery with categories, favourites & one-tap apply.',
        desc: 'A polished cross-platform wallpaper application crafted in Flutter. Users browse curated HD wallpapers fetched from a REST API, filter by category, save favourites, preview in full-screen, and set images directly as home or lock-screen wallpaper — with smooth caching and shimmer loading for a premium feel.',
        img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
        tech: ['Flutter', 'Dart', 'REST API', 'Cached Images'],
        github: 'https://github.com/shivamtyagi0610/wallpaper-app',
        live: null,
        featured: false,
    },
    {
        id: 'todo-app',
        title: 'TaskFlow — To-Do App',
        name: 'To-Do App',
        icon: '✅',
        category: 'Flutter',
        tags: ['flutter'],
        short: 'Minimal task manager with reminders, categories & offline storage.',
        desc: 'A clean and intuitive to-do application built with Flutter. It supports task creation with priorities and due dates, category grouping, local notifications for reminders, and persistent offline storage — wrapped in a smooth, gesture-driven interface with swipe-to-complete and dark mode.',
        img: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1000&auto=format&fit=crop',
        tech: ['Flutter', 'Dart', 'SQLite / Hive', 'Notifications'],
        github: 'https://github.com/shivamtyagi0610/todo-app',
        live: null,
        featured: false,
    },
];
