// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Carousel functionality
function initializeCarousel(carouselSelector) {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;

    const container = carousel.querySelector('.carousel-container');
    if (!container) return;

    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            container.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel('.portfolio-carousel');
    initializeCarousel('.projects-carousel');
});

// Dynamic gradient background on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Enhance footer visibility as you approach bottom
    if (scrolled > maxScroll * 0.8) {
        const footerOpacity = Math.min(1, (scrolled - maxScroll * 0.8) / (maxScroll * 0.2));
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.opacity = Math.min(1, 0.3 + footerOpacity * 0.5);
        }
    }
});

// Fade in cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate carousel items on load
document.querySelectorAll('.carousel-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Enhanced navbar shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    }
});

// Scroll animation for sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const sectionObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate', 'visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);
    
    sections.forEach(section => {
        section.classList.add('scroll-animate');
        sectionObserver.observe(section);
    });
});
