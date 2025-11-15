        const menuToggle = document.getElementById('menu-toggle');
        const nav = document.querySelector('nav');

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector(".news-slider");
    const cards = document.querySelectorAll(".news-card");
    const prevBtn = document.querySelector(".news-slider-wrapper .prev");
    const nextBtn = document.querySelector(".news-slider-wrapper .next");
    const dotsContainer = document.querySelector(".news-dots");
    const dots = document.querySelectorAll(".news-dots .dot");

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20; // width + gap
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) currentIndex--;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < totalCards - 1) currentIndex++;
        updateSlider();
    });

    // Click dots
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            currentIndex = i;
            updateSlider();
        });
    });

    // Optional: Auto update on window resize
    window.addEventListener("resize", () => {
        updateSlider();
    });

    // Initial
    updateSlider();
});


/* Reveal-on-scroll: wrapper-based approach that excludes header/nav/footer/#home
   and preserves existing hover transforms on cards by animating an inner wrapper. */
document.addEventListener('DOMContentLoaded', function () {
    try {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const selectors = [
            'section:not(#home) > *',
            'section:not(#home) .video-container',
            'section:not(#home) .contact-container',
            'section:not(#home) .product-card',
            'section:not(#home) .news-card'
        ];

        const set = new Set();
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => set.add(el)));
        const candidates = Array.from(set);

        const targets = [];
        let orderIndex = 0;

        candidates.forEach(el => {
            if (!document.body.contains(el)) return;
            // Exclude nav/header/footer and #home/menu toggle
            if (el.closest('header') || el.closest('nav') || el.closest('footer')) return;
            if (el.id === 'home' || el.matches('#menu-toggle')) return;
            // avoid nested reveals
            if (el.closest('[data-revealed]')) return;

            if (el.matches('.product-card, .news-card')) {
                // create wrapper only if not already present
                if (!el.querySelector('.reveal-inner')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'reveal-inner';
                    // move all children into wrapper
                    while (el.firstChild) wrapper.appendChild(el.firstChild);
                    el.appendChild(wrapper);
                    const delay = Math.min(orderIndex * 40, 400);
                    wrapper.style.setProperty('--reveal-delay', `${delay}ms`);
                    wrapper.setAttribute('data-reveal-delay', String(delay));
                    wrapper.classList.add('reveal');
                    el.setAttribute('data-revealed', 'true');
                    targets.push(wrapper);
                    orderIndex++;
                }
            } else {
                // normal element
                el.classList.add('reveal');
                const delay = Math.min(orderIndex * 40, 400);
                el.style.setProperty('--reveal-delay', `${delay}ms`);
                el.setAttribute('data-reveal-delay', String(delay));
                el.setAttribute('data-revealed', 'true');
                targets.push(el);
                orderIndex++;
            }
        });

        if (prefersReduced) {
            targets.forEach(t => t.classList.add('active'));
            return;
        }

        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        targets.forEach(t => {
            if (document.body.contains(t)) io.observe(t);
        });
    } catch (err) {
        console.error('Reveal-on-scroll init error:', err);
    }
});



