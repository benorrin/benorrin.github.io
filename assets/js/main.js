// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(open));
    });
}

// Header border once the page has scrolled
const header = document.querySelector('.site-header');

const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Fade elements in as they scroll into view
const revealables = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

    revealables.forEach((el, i) => {
        // Stagger siblings slightly so grids cascade in
        el.style.transitionDelay = `${(i % 3) * 70}ms`;
        observer.observe(el);
    });
} else {
    revealables.forEach((el) => el.classList.add('is-visible'));
}

// Respect reduced motion for SVG (SMIL) animations, which CSS can't pause
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('svg').forEach((svg) => {
        if (svg.pauseAnimations) svg.pauseAnimations();
    });
}

// Light/dark theme toggle. Without a saved choice the site follows the system setting.
const themeToggle = document.querySelector('.theme-toggle');
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = () =>
    document.documentElement.dataset.theme || (darkQuery.matches ? 'dark' : 'light');

const syncThemeUi = () => {
    const theme = currentTheme();
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    const colour = theme === 'dark' ? '#121110' : '#faf9f7';
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', colour));
};

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
        syncThemeUi();
    });
}

darkQuery.addEventListener('change', syncThemeUi);
syncThemeUi();
