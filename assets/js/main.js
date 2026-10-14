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
