/**
 * SecureVPN - Main JavaScript File
 * This file contains all the interactive functionality for the SecureVPN website
 */

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initMobileMenu();
    initPricingToggle();
    initAnimations();
    initCounters();
    initServerSearch();
    initTestimonialSlider();
    initContactForm();
});

/**
 * SentVPN - Упрощенный JavaScript файл
 * Содержит только функциональность, используемую в index.html
 */

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initMobileMenu();
    initAnimations();
    initTelegramRedirect();
});

/**
 * Плавная прокрутка для якорных ссылок
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    if (anchorLinks.length === 0) return;
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Мобильное меню
 */
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    
    if (!mobileMenuButton) return;
    
    // Создаем мобильное меню, если его нет
    let mobileMenu = document.querySelector('#mobile-menu');
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'mobile-menu hidden';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-close">
                <i class="fas fa-times"></i>
            </div>
            <div class="mobile-menu-links">
                <a href="#features">Возможности</a>
                <a href="#pricing">Тарифы</a>
                <a href="#pricing" class="bg-white text-yellow-600 px-4 py-2 rounded-lg font-medium hover:bg-yellow-50 transition inline-block">Купить сейчас</a>
            </div>
        `;
        document.body.appendChild(mobileMenu);
    }
    
    mobileMenuButton.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие меню
    const closeButton = mobileMenu.querySelector('.mobile-menu-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }
    
    // Закрытие при клике на ссылки
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Перенаправление в Telegram канал при выборе плана
 */
/**
 * Перенаправление в Telegram канал при выборе плана
 */
function initTelegramRedirect() {
    const telegramChannelUrl = 'https://t.me/sentvpn_bot'; // Замените на ваш URL Telegram канала
    
    // Находим все кнопки "Выбрать план"
    const planButtons = document.querySelectorAll('button[class*="Выбрать план"], .pricing-card button');
    
    planButtons.forEach(button => {
        if (button.textContent.includes('Выбрать план')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Добавляем небольшую анимацию перед переходом
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.2s ease';
                
                setTimeout(() => {
                    // Открываем Telegram в новой вкладке
                    window.open(telegramChannelUrl, '_blank');
                    
                    // Возвращаем исходное состояние кнопки
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        }
    });
    
    // Добавляем обработчик для кнопки "Купить сейчас" и "Попробовать бесплатно"
    // чтобы они перенаправляли в телеграм канал
    const buyButtons = document.querySelectorAll('a[href="#pricing"]');
    buyButtons.forEach(button => {
        if (button.textContent.includes('Купить сейчас')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Добавляем небольшую анимацию перед переходом
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.2s ease';
                
                setTimeout(() => {
                    // Открываем Telegram в новой вкладке
                    window.open(telegramChannelUrl, '_blank');
                    
                    // Возвращаем исходное состояние кнопки
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        }
    });
    
    // Обработчик для кнопки "Попробовать бесплатно" - оставляем прокрутку к тарифам
    const tryFreeButtons = document.querySelectorAll('a[href="#pricing"]');
    tryFreeButtons.forEach(button => {
        if (button.textContent.includes('Попробовать бесплатно')) {
            // Не добавляем обработчик, позволяем стандартной прокрутке работать
        }
    });
}

/**
 * Анимации для элементов
 */
function initAnimations() {
    // Анимация при наведении для карточек
    const hoverElements = document.querySelectorAll('.hover-scale');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-10px) scale(1.02)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Анимация для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
    
    // Плавное появление элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками и секциями
    document.querySelectorAll('.hover-scale, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Дополнительные утилиты
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

// Оптимизация прокрутки
window.addEventListener('scroll', debounce(() => {
    // Добавить дополнительные действия при прокрутке при необходимости
}, 100));

/**
 * Pricing toggle functionality
 */
function initPricingToggle() {
    const pricingButtons = document.querySelectorAll('[role="group"] button');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (pricingButtons.length === 0) return;
    
    // Define pricing data
    const pricingData = {
        monthly: {
            basic: { price: '$4.99', period: '/месяц', discount: '' },
            premium: { price: '$9.99', period: '/месяц', discount: '' },
            business: { price: '$14.99', period: '/месяц', discount: '' }
        },
        yearly: {
            basic: { price: '$3.99', period: '/месяц', discount: 'Экономия 20%' },
            premium: { price: '$7.99', period: '/месяц', discount: 'Экономия 20%' },
            business: { price: '$11.99', period: '/месяц', discount: 'Экономия 20%' }
        },
        twoYear: {
            basic: { price: '$2.99', period: '/месяц', discount: 'Экономия 40%' },
            premium: { price: '$5.99', period: '/месяц', discount: 'Экономия 40%' },
            business: { price: '$8.99', period: '/месяц', discount: 'Экономия 40%' }
        }
    };
    
    // Set initial state (monthly is default)
    updatePricingDisplay('monthly');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update button styles
            pricingButtons.forEach(btn => {
                btn.classList.remove('bg-yellow-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            button.classList.add('bg-yellow-600', 'text-white');
            button.classList.remove('bg-white', 'text-gray-700');
            
            // Get selected period
            const period = button.getAttribute('data-period') || 'monthly';
            
            // Update pricing display
            updatePricingDisplay(period);
        });
    });
    
    function updatePricingDisplay(period) {
        // Get pricing data for selected period
        const data = pricingData[period];
        
        // Update each pricing card
        pricingCards.forEach(card => {
            const type = card.getAttribute('data-plan');
            if (!type || !data[type]) return;
            
            const priceElement = card.querySelector('.plan-price');
            const periodElement = card.querySelector('.plan-period');
            const discountElement = card.querySelector('.plan-discount');
            
            if (priceElement) priceElement.textContent = data[type].price;
            if (periodElement) periodElement.textContent = data[type].period;
            
            if (discountElement) {
                if (data[type].discount) {
                    discountElement.textContent = data[type].discount;
                    discountElement.classList.remove('hidden');
                } else {
                    discountElement.classList.add('hidden');
                }
            }
        });
    }
}

/**
 * Animations for elements
 */
function initAnimations() {
    // Add animation to elements with hover-scale class
    const hoverElements = document.querySelectorAll('.hover-scale');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-fade-in');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
}

/**
 * Animated counters for statistics
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const animateCounter = (counter, target) => {
        let count = 0;
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const increment = target / totalFrames;
        
        const animate = () => {
            count += increment;
            counter.textContent = Math.floor(count);
            
            if (count < target) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };
        
        animate();
    };
    
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Server search functionality
 */
function initServerSearch() {
    const searchInput = document.querySelector('#server-search');
    const serverItems = document.querySelectorAll('.server-item');
    
    if (!searchInput || serverItems.length === 0) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        serverItems.forEach(item => {
            const serverName = item.querySelector('.server-name');
            const serverLocation = item.querySelector('.server-location');
            
            if (!serverName && !serverLocation) return;
            
            const nameText = serverName ? serverName.textContent.toLowerCase() : '';
            const locationText = serverLocation ? serverLocation.textContent.toLowerCase() : '';
            
            if (nameText.includes(searchTerm) || locationText.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

/**
 * Testimonial slider
 */
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (!testimonialContainer || testimonials.length === 0) return;
    
    let currentIndex = 0;
    const testimonialCount = testimonials.length;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.classList.add('hidden');
        }
    });
    
    // Show testimonial at specified index
    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.remove('hidden');
                testimonial.classList.add('animate-fade-in');
            } else {
                testimonial.classList.add('hidden');
                testimonial.classList.remove('animate-fade-in');
            }
        });
    };
    
    // Next testimonial
    const nextTestimonial = () => {
        currentIndex = (currentIndex + 1) % testimonialCount;
        showTestimonial(currentIndex);
    };
    
    // Previous testimonial
    const prevTestimonial = () => {
        currentIndex = (currentIndex - 1 + testimonialCount) % testimonialCount;
        showTestimonial(currentIndex);
    };
    
    // Add event listeners to buttons
    if (nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevTestimonial);
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Simple validation
        let isValid = true;
        
        if (nameInput && nameInput.value.trim() === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else if (nameInput) {
            clearError(nameInput);
        }
        
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Пожалуйста, введите ваш email');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Пожалуйста, введите корректный email');
                isValid = false;
            } else {
                clearError(emailInput);
            }
        }
        
        if (messageInput && messageInput.value.trim() === '') {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
            isValid = false;
        } else if (messageInput) {
            clearError(messageInput);
        }
        
        // If form is valid, submit it
        if (isValid) {
            // Show loading state
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Отправка...';
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    // Show success message
                    contactForm.innerHTML = '<div class="text-center p-8"><i class="fas fa-check-circle text-green-500 text-5xl mb-4"></i><h3 class="text-2xl font-bold mb-2">Сообщение отправлено!</h3><p class="text-gray-600">Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.</p></div>';
                }, 1500);
            }
        }
    });
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('border-red-500');
    }
    
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('border-red-500');
    }
}