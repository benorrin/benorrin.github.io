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

// Hello to anyone who opens the console
console.log('%c~ orrin.uk ~', 'font: 800 20px Inter, sans-serif; color: #e0603c;');
console.log('Hello, fellow developer. The source is at https://github.com/benorrin/benorrin.github.io\nWhile you\'re here, try typing "coffee" on any page.\nAnd if you like a treasure hunt: there are 8 pieces of sea glass hidden around this site. Keep count at https://orrin.uk/treasure/');

// Easter eggs: the Konami code brings the tide in, and typing "coffee" keeps the page awake
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let keys = [];
let tide = null;

const toast = (message) => {
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
    setTimeout(() => {
        el.classList.remove('is-in');
        setTimeout(() => el.remove(), 400);
    }, 4000);
};

window.toast = toast;

const tideIn = () => {
    if (tide) return;
    tide = document.createElement('div');
    tide.className = 'tide';
    tide.setAttribute('aria-hidden', 'true');
    tide.innerHTML = `
        <div class="tide-layer tide-back"></div>
        <div class="tide-buoy">
            <svg class="buoy-inner" viewBox="0 0 120 170">
                <defs><clipPath id="tide-buoy-body"><path d="M30 46 H90 L104 150 Q60 162 16 150 Z"/></clipPath></defs>
                <circle class="buoy-glow" cx="60" cy="14" r="14"/>
                <circle class="buoy-light" cx="60" cy="14" r="7"/>
                <rect x="56" y="20" width="8" height="24" rx="2" fill="#3a3330"/>
                <g clip-path="url(#tide-buoy-body)">
                    <rect x="0" y="40" width="120" height="130" fill="#e0603c"/>
                    <rect x="0" y="80" width="120" height="30" fill="#fbf7f2"/>
                    <rect x="0" y="40" width="22" height="130" fill="#000" opacity="0.12"/>
                </g>
                <rect x="24" y="40" width="72" height="9" rx="4.5" fill="#3a3330"/>
                <text x="60" y="102" text-anchor="middle">hi!</text>
            </svg>
        </div>
        <div class="tide-layer tide-mid"></div>
        <div class="tide-layer tide-front"></div>`;

    // The tide washes up a piece of sea glass, if it hasn't been found yet
    if (window.SeaGlass && !window.SeaGlass.has(8)) {
        tide.insertAdjacentHTML('beforeend', `
            <a class="seaglass tide-glass" href="/treasure/" data-glass="8" aria-label="A piece of sea glass" title="Sea glass!" style="--glass: #c9d6df">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 5.5 7.5 2 13.5 4 14.5 10 9.5 14.5 3.5 12.5Z"/><path class="glint" d="M6 5.5 8.5 4"/></svg>
            </a>`);
    }

    document.body.appendChild(tide);
    requestAnimationFrame(() => requestAnimationFrame(() => tide.classList.add('is-in')));
    toast('🌊 The tide is coming in…');

    setTimeout(() => {
        tide.classList.remove('is-in');
        setTimeout(() => {
            tide.remove();
            tide = null;
        }, 2000);
    }, 10000);
};

document.addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    keys.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    keys = keys.slice(-konami.length);

    if (keys.join() === konami.join()) {
        keys = [];
        tideIn();
    } else if (keys.slice(-6).join('') === 'coffee') {
        keys = [];
        toast('☕ Geekoffee mode: this page will now stay awake. (It already was.)');
    }
});
