/* ===================================================
   WebsitesWW.com — Main JavaScript
   Handles navigation, animations, form, and interactivity
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== MOBILE NAVIGATION ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ========== CUSTOM QUOTE BUILDER (Pricing Card) ==========
    const pagesInput = document.getElementById('pages');
    const pagesValue = document.getElementById('pagesValue');
    const quotePrice = document.getElementById('quotePrice');
    const quoteForm = document.getElementById('quoteForm');

    if (pagesInput && quotePrice) {
        const galleryCheckbox = document.querySelector('input[name="gallery"]');

        function calculateQuote() {
            const pages = parseInt(pagesInput.value, 10);
            if (pagesValue) pagesValue.textContent = pages;
            let price = 250; // Base price for first page
            if (pages > 1) price += (pages - 1) * 100; // $100 per additional page
            if (galleryCheckbox && galleryCheckbox.checked) price += 75;
            quotePrice.textContent = price;
        }

        pagesInput.addEventListener('input', calculateQuote);
        if (galleryCheckbox) galleryCheckbox.addEventListener('change', calculateQuote);
        calculateQuote();
    }

    // ========== SCROLL ANIMATIONS (Intersection Observer) ==========
    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .pricing-card, .testimonial-card, .about__content, .about__card, .contact__info, .contact__form, .cta__container, .hero__content, .hero__visual'
    );

    animateElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.Name || !data.Email || !data.Message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(data.Email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong.');
                    });
                }
            })
            .catch(error => {
                showNotification(error.message || 'Something went wrong. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            padding: '16px 24px',
            borderRadius: '12px',
            color: '#fff',
            fontWeight: '600',
            fontSize: '14px',
            zIndex: '9999',
            transform: 'translateY(100px)',
            opacity: '0',
            transition: 'all 0.4s ease',
            maxWidth: '400px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            background: type === 'success'
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #ef4444, #dc2626)'
        });

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        });

        // Auto-remove after 5s
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
