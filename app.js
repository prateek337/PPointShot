// Shoot Aim Academy - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initStatisticsCounter();
    initGalleryFilters();
    initLightbox();
    initTestimonialCarousel();
    initContactForm();
    initRegistrationForm();
    initSmoothScrolling();
    initScrollAnimations();
    
    // Show all gallery items by default
    showAllGalleryItems();
    
    // Initialize WhatsApp integration
    initWhatsApp();
    
    // Initialize performance optimizations
    setTimeout(() => {
        initPerformanceOptimizations();
        initErrorHandling();
        initAccessibility();
    }, 500);
});

// Show all gallery items on page load
function showAllGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach((item, index) => {
        item.classList.remove('hidden');
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        // Add slight delay for better visual effect
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, index * 50);
    });
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Prevent menu from closing when clicking inside
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Active navigation highlighting
    updateActiveNavigation();
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll effects for header
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    const scrollHandler = throttle(function() {
        const currentScrollY = window.scrollY;

        if (header) {
            // Add/remove scrolled class for styling
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
                header.style.background = 'rgba(19, 52, 59, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'rgba(19, 52, 59, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }

            // Hide/show header on scroll (only on mobile)
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollY = currentScrollY;
    }, 16);

    window.addEventListener('scroll', scrollHandler);
}

// Statistics counter animation
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat__number');
    let animated = false;

    function animateCounters() {
        if (animated) return;

        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let count = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(count);
                }, 33);
            });
        }
    }

    const scrollHandler = throttle(animateCounters, 100);
    window.addEventListener('scroll', scrollHandler);
    animateCounters(); // Check on load
}

// Gallery filtering functionality - Fixed
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery__item');

    // Ensure all items are visible initially
    galleryItems.forEach(item => {
        item.classList.remove('hidden');
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show item
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    // Stagger the animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 100);
                } else {
                    // Hide item
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (item.style.opacity === '0') {
                            item.style.display = 'none';
                            item.classList.add('hidden');
                        }
                    }, 300);
                }
            });
        });
    });

    // Set "All" as default active
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
}

// Lightbox functionality - Enhanced
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxOverlay = document.querySelector('.lightbox__overlay');

    if (!lightbox) return;

    // Initialize lightbox styles
    lightbox.style.transition = 'opacity 0.3s ease';
    lightbox.style.opacity = '0';

    // Function to open lightbox
    function openLightbox(imageSrc, title, description, altText) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = altText || title;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            lightbox.style.opacity = '1';
        });
        
        // Focus management
        lightbox.setAttribute('tabindex', '-1');
        lightbox.focus();
    }

    // Function to close lightbox
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    // Open lightbox when gallery item is clicked
    function attachGalleryClickHandlers() {
        const galleryItems = document.querySelectorAll('.gallery__item');
        galleryItems.forEach(item => {
            // Remove any existing listeners
            item.removeEventListener('click', item.clickHandler);
            
            // Create new click handler
            item.clickHandler = function() {
                const img = this.querySelector('.gallery__image');
                const overlay = this.querySelector('.gallery__overlay');
                
                if (img && overlay) {
                    const title = overlay.querySelector('h4').textContent;
                    const description = overlay.querySelector('p').textContent;
                    openLightbox(img.src, title, description, img.alt);
                }
            };
            
            // Add the listener
            item.addEventListener('click', item.clickHandler);
        });
    }

    // Initial attachment
    attachGalleryClickHandlers();

    // Reattach after gallery filtering
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                // Reattach handlers when gallery items are shown/hidden
                setTimeout(attachGalleryClickHandlers, 100);
            }
        });
    });

    // Observe gallery items for changes
    document.querySelectorAll('.gallery__item').forEach(item => {
        observer.observe(item, { attributes: true, attributeFilter: ['style'] });
    });

    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on overlay click
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });

    // Export function globally
    window.openLightbox = openLightbox;
}

// Testimonial carousel - Enhanced
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const carousel = document.querySelector('.testimonials__carousel');
    let currentTestimonial = 0;
    let autoPlayInterval;

    if (testimonials.length === 0) return;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
                testimonial.style.opacity = '1';
            } else {
                testimonial.style.opacity = '0';
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 6000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            stopAutoPlay();
            setTimeout(startAutoPlay, 3000);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            stopAutoPlay();
            setTimeout(startAutoPlay, 3000);
        });
    }

    // Pause auto-play on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // Touch/swipe support
    if (carousel && 'ontouchstart' in window) {
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            stopAutoPlay();
        });

        carousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
            }
            setTimeout(startAutoPlay, 3000);
        });
    }

    // Initialize
    testimonials.forEach(testimonial => {
        testimonial.style.transition = 'opacity 0.5s ease';
    });
    
    showTestimonial(0);
    startAutoPlay();
}

// Contact form handling - Enhanced
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear any existing messages
        clearFormMessages();
        
        // Set loading state
        setFormLoading(this, true);
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Simulate form processing with realistic delay
        setTimeout(() => {
            // Validate form
            if (validateContactForm(formObject)) {
                // Show success message
                showFormMessage(
                    'Thank you for your inquiry! We will get back to you within 24 hours.\n\nFor immediate assistance, please contact us on WhatsApp using the button below.',
                    'success',
                    this
                );
                
                // Reset form
                this.reset();
                
                // Log for development
                console.log('Contact form submitted:', formObject);
                
                // Track form submission
                trackEvent('contact_form_submitted', {
                    program_interest: formObject.program || 'not_specified'
                });
            }
            
            // Reset loading state
            setFormLoading(this, false);
        }, 1500);
    });
}

// Registration form handling - Enhanced
function initRegistrationForm() {
    const registrationForm = document.getElementById('registration-form');
    
    if (!registrationForm) return;

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear any existing messages
        clearFormMessages();
        
        // Set loading state
        setFormLoading(this, true);
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        
        // Handle checkboxes for interests
        const interests = [];
        formData.getAll('interest').forEach(interest => {
            interests.push(interest);
        });
        
        formData.forEach((value, key) => {
            if (key === 'interest') return; // Skip individual interest entries
            formObject[key] = value;
        });
        formObject.interests = interests;

        // Simulate form processing
        setTimeout(() => {
            // Validate form
            if (validateRegistrationForm(formObject)) {
                // Show success message
                showFormMessage(
                    'Registration successful! Welcome to Shoot Aim Academy.\n\nWe will contact you within 24 hours to:\n• Confirm your enrollment\n• Schedule your first session\n• Provide payment details\n\nCheck your email for further information.',
                    'success',
                    this
                );
                
                // Reset form
                this.reset();
                
                // Log for development
                console.log('Registration form submitted:', formObject);
                
                // Track registration
                trackEvent('registration_completed', {
                    course_type: formObject.course || 'not_specified',
                    experience_level: formObject.experience || 'not_specified'
                });
            }
            
            // Reset loading state
            setFormLoading(this, false);
        }, 2000);
    });
}

// Form validation functions
function validateContactForm(data) {
    const errors = [];

    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.push('First name must be at least 2 characters long');
    }

    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.push('Last name must be at least 2 characters long');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid Indian phone number');
    }

    if (errors.length > 0) {
        showFormMessage(errors.join('\n'), 'error');
        return false;
    }

    return true;
}

function validateRegistrationForm(data) {
    const errors = [];

    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.push('First name must be at least 2 characters long');
    }

    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.push('Last name must be at least 2 characters long');
    }

    if (!data.age || data.age < 12 || data.age > 80) {
        errors.push('Age must be between 12 and 80 years');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Please enter a valid Indian phone number');
    }

    if (!data.course) {
        errors.push('Please select a preferred course');
    }

    // Age-specific validation for pistol courses
    if ((data.course === 'basic-pistol' || data.course === 'advanced-pistol') && data.age < 18) {
        errors.push('You must be 18 years or older for pistol training courses');
    }

    // Experience validation for advanced courses
    if (['advanced-rifle', 'advanced-pistol', 'competition'].includes(data.course) && 
        (!data.experience || data.experience === 'none')) {
        errors.push('This course requires some previous shooting experience');
    }

    if (errors.length > 0) {
        showFormMessage(errors.join('\n'), 'error');
        return false;
    }

    return true;
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
    const phoneRegex = /^(91)?[6789]\d{9}$/;
    return phoneRegex.test(cleanPhone);
}

// Form message functions - Enhanced
function showFormMessage(message, type, form) {
    clearFormMessages();
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message status status--${type}`;
    messageElement.style.whiteSpace = 'pre-line';
    messageElement.textContent = message;

    if (form) {
        form.parentNode.insertBefore(messageElement, form);
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        const timeout = type === 'success' ? 10000 : 8000;
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.opacity = '0';
                setTimeout(() => messageElement.remove(), 300);
            }
        }, timeout);
    }
}

function clearFormMessages() {
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
}

function setFormLoading(form, loading) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formControls = form.querySelectorAll('.form-control, input, textarea, select');
    
    if (submitBtn) {
        submitBtn.disabled = loading;
        if (loading) {
            const spinner = '<span style="margin-right: 8px;">⏳</span>';
            if (form.id === 'contact-form') {
                submitBtn.innerHTML = spinner + 'Sending Message...';
            } else if (form.id === 'registration-form') {
                submitBtn.innerHTML = spinner + 'Processing Registration...';
            }
        } else {
            if (form.id === 'contact-form') {
                submitBtn.textContent = 'Send Message';
            } else if (form.id === 'registration-form') {
                submitBtn.textContent = 'Complete Registration';
            }
        }
    }
    
    formControls.forEach(control => {
        control.disabled = loading;
        control.style.opacity = loading ? '0.7' : '1';
    });
}

// Smooth scrolling - Enhanced
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navToggle) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// WhatsApp integration - Fixed
function initWhatsApp() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        // Update the href to make it functional
        const message = encodeURIComponent("Hello! I'm interested in learning more about shooting training at Shoot Aim Academy. Can you please provide me with details about your courses and pricing?");
        whatsappBtn.href = `https://wa.me/919876543210?text=${message}`;
        
        whatsappBtn.addEventListener('click', function(e) {
            // Track WhatsApp click
            trackEvent('whatsapp_clicked', {
                source: 'floating_button'
            });
            
            // Let the default behavior handle the link
            console.log('WhatsApp button clicked');
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.program-card, .facility, .achievement, .benefit, .context__item, .highlight, .event-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Preload critical images
    const criticalImages = [
        'https://pplx-res.cloudinary.com/image/upload/v1758965322/pplx_project_search_images/88f5508f28bdcd11c779af4ca29fb4fdd28c0761.png',
        'https://pplx-res.cloudinary.com/image/upload/v1758974497/pplx_project_search_images/7a550ad78fa15581813107ee12f0efcf57c5e9c5.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Lazy load non-critical images if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        trackEvent('js_error', {
            error_message: e.error.toString(),
            page_url: window.location.href
        });
    });

    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

// Accessibility improvements
function initAccessibility() {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Skip to main content
        if (e.key === 'Tab' && e.target.classList && e.target.classList.contains('skip-link')) {
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView();
            }
        }
        
        // Enhanced carousel navigation
        if (e.target.classList.contains('testimonial-btn')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
        
        // Enhanced filter button navigation
        if (e.target.classList.contains('filter-btn')) {
            const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
            const currentIndex = filterBtns.indexOf(e.target);
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (currentIndex + direction + filterBtns.length) % filterBtns.length;
                filterBtns[nextIndex].focus();
            }
        }
    });
    
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = 'var(--color-primary)';
    skipLink.style.color = 'white';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.borderRadius = '4px';
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Event tracking function
function trackEvent(eventName, properties = {}) {
    // Basic console logging for development
    console.log('Event tracked:', eventName, properties);
    
    // Integration with analytics (Google Analytics, etc.) can be added here
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// Public API for external use
window.ShootAimAcademy = {
    // Gallery functions
    showGalleryFilter: function(filter) {
        const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    },
    
    // Lightbox function
    openLightbox: function(imageSrc, title, description) {
        if (window.openLightbox) {
            window.openLightbox(imageSrc, title, description);
        }
    },
    
    // Navigation function
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Form functions
    showContactForm: function() {
        this.scrollToSection('contact');
    },
    
    showRegistrationForm: function() {
        this.scrollToSection('register');
    },
    
    // Analytics function
    track: trackEvent
};

// Console welcome message
console.log(
    '%c🎯 Welcome to Shoot Aim Academy! 🇮🇳',
    'color: #21808D; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cPrecision in Every Shot - India\'s Premier Shooting Training Academy',
    'color: #FF9933; font-size: 12px;'
);
console.log(
    '%cWebsite loaded successfully. All interactive features are ready!',
    'color: #138808; font-size: 10px;'
);