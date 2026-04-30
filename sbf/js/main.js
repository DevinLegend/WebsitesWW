// ===================================
// South Bay Fence - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const setScrolled = () => {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        setScrolled();
        window.addEventListener('scroll', setScrolled, { passive: true });
    }

    // --- Hero Carousel: crossfade + Ken Burns + autoplay + controls ---
    const heroSlidesEl = document.getElementById('heroSlides');
    if (heroSlidesEl) {
        const slides = Array.from(heroSlidesEl.querySelectorAll('.hero-slide'));
        const dots = Array.from(document.querySelectorAll('#heroDots .hero-dot'));
        const prevBtn = document.getElementById('heroPrev');
        const nextBtn = document.getElementById('heroNext');
        const heroEl = document.getElementById('hero');
        const intervalMs = 6500;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let current = slides.findIndex(s => s.classList.contains('is-active'));
        if (current < 0) current = 0;
        let timer = null;
        let isPaused = false;

        // Preload every slide image to prevent first-cycle flicker
        slides.forEach(slide => {
            const bg = slide.style.backgroundImage;
            const match = bg && bg.match(/url\(["']?(.+?)["']?\)/);
            if (match && match[1]) {
                const img = new Image();
                img.src = match[1];
            }
        });

        const goTo = (index) => {
            const next = ((index % slides.length) + slides.length) % slides.length;
            if (next === current) return;

            slides[current].classList.remove('is-active');
            dots[current] && dots[current].classList.remove('is-active');

            const incoming = slides[next];
            // Restart Ken Burns animation cleanly
            incoming.classList.remove('is-active');
            void incoming.offsetWidth;
            incoming.classList.add('is-active');

            dots[next] && dots[next].classList.add('is-active');
            current = next;
        };

        const nextSlide = () => goTo(current + 1);
        const prevSlide = () => goTo(current - 1);

        const startAutoplay = () => {
            if (reduceMotion || slides.length <= 1) return;
            stopAutoplay();
            timer = setInterval(() => {
                if (!isPaused && !document.hidden) nextSlide();
            }, intervalMs);
        };

        const stopAutoplay = () => {
            if (timer) { clearInterval(timer); timer = null; }
        };

        // Controls
        nextBtn && nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
        prevBtn && prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.dataset.slide, 10);
                if (!Number.isNaN(idx)) { goTo(idx); startAutoplay(); }
            });
        });

        // Pause on hover (desktop)
        if (heroEl && window.matchMedia('(hover: hover)').matches) {
            heroEl.addEventListener('mouseenter', () => { isPaused = true; });
            heroEl.addEventListener('mouseleave', () => { isPaused = false; });
        }

        // Keyboard navigation when hero is in view
        document.addEventListener('keydown', (e) => {
            if (!heroEl) return;
            const rect = heroEl.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > 0;
            if (!inView) return;
            if (e.key === 'ArrowRight') { nextSlide(); startAutoplay(); }
            if (e.key === 'ArrowLeft') { prevSlide(); startAutoplay(); }
        });

        // Touch swipe (mobile)
        let touchStartX = 0;
        let touchStartY = 0;
        let touchTracking = false;
        heroSlidesEl.addEventListener('touchstart', (e) => {
            if (!e.touches[0]) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchTracking = true;
        }, { passive: true });
        heroSlidesEl.addEventListener('touchend', (e) => {
            if (!touchTracking || !e.changedTouches[0]) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            touchTracking = false;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
                if (dx < 0) nextSlide(); else prevSlide();
                startAutoplay();
            }
        }, { passive: true });

        startAutoplay();
    }

    // --- Mobile menu toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navActions = document.querySelector('.nav-actions');

    if (mobileToggle && navLinks) {
        let mobileActionsLi = null;

        const insertMobileActions = () => {
            if (!navActions || mobileActionsLi) return;
            const clone = navActions.cloneNode(true);
            clone.classList.add('nav-actions-mobile');
            const li = document.createElement('li');
            li.className = 'nav-actions-li';
            li.appendChild(clone);
            navLinks.appendChild(li);
            mobileActionsLi = li;
        };

        const removeMobileActions = () => {
            if (mobileActionsLi) {
                mobileActionsLi.remove();
                mobileActionsLi = null;
            }
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileToggle.classList.remove('open');
            removeMobileActions();
        };

        mobileToggle.addEventListener('click', () => {
            const willOpen = !navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            mobileToggle.classList.toggle('open');
            if (willOpen) {
                insertMobileActions();
            } else {
                removeMobileActions();
            }
        });

        navLinks.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link) return;
            const isAction = link.closest('.nav-actions-mobile');
            if (link.getAttribute('href') && link.getAttribute('href').startsWith('#') && !isAction) {
                closeMenu();
                return;
            }
            closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 960 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const a = i.querySelector('.faq-answer');
                    if (a) a.style.maxHeight = '0';
                });

                // Open clicked if it was closed
                if (!isOpen) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // --- Scroll animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // --- Auto-add fade-up to major sections ---
    const sections = document.querySelectorAll('.section-header, .about-text, .about-images, .service-card, .specialty-card, .specialty-page-card, .testimonial-card, .contact-info-card');
    sections.forEach((el, i) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(el);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // --- Active nav link highlighting ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});
