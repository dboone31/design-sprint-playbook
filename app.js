// Comprehensive Moreland Playbook JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSearch();
    initPlaysLibrary();
    initScrollSpy();
    initSmoothScrolling();
    initInteractiveElements();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    initAccessibilityFeatures();
    addDynamicStyles();
    
    // Add loaded class for fade-in effect
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Enhanced navigation functionality - FIXED
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // Add click handlers to navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                scrollToSection(targetSection);
                updateActiveNavLink(this);
            }
        });
    });

    // Fix offering card buttons - ADDED FIX
    const offeringButtons = document.querySelectorAll('.offering-card .btn');
    offeringButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    scrollToSection(targetSection);
                    // Update nav to show active section
                    const correspondingNavLink = document.querySelector(`.nav-link[href="${href}"]`);
                    if (correspondingNavLink) {
                        updateActiveNavLink(correspondingNavLink);
                    }
                }
            }
        });
    });

    // Add smooth hover effects
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-1px)';
            }
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Enhanced scroll spy functionality
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    let isScrolling = false;

    function updateActiveNav() {
        if (isScrolling) return;

        const scrollPosition = window.scrollY + 80;
        let activeSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section;
            }
        });

        // Update active nav link with smooth transition
        navLinks.forEach(link => {
            const isCurrentlyActive = link.classList.contains('active');
            const shouldBeActive = activeSection && link.getAttribute('href') === `#${activeSection.id}`;

            if (shouldBeActive && !isCurrentlyActive) {
                link.classList.add('active');
                link.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 200);
            } else if (!shouldBeActive && isCurrentlyActive) {
                link.classList.remove('active');
            }
        });
    }

    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNav, 10);
    });

    // Initial update
    updateActiveNav();
}

// Advanced search functionality with highlighting - FIXED
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value);
        }, 150);
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            scrollToFirstResult();
        }
    });

    // Add search result counter
    addSearchResultsCounter();
}

// FIXED - Simplified and working search function
function performSearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    // Clear previous results
    clearAllSearchHighlights();
    
    if (term === '') {
        showAllElements();
        updateSearchCounter(0, 0);
        return;
    }

    let totalResults = 0;
    let matchedElements = [];

    // Search through all searchable content - SIMPLIFIED
    const searchableElements = document.querySelectorAll('.play-card, .role-card, .phase-detailed, .mvp-phase, .exercise-card, .pillar-card, .framework-card, .metric-item, h1, h2, h3, h4, p');
    
    searchableElements.forEach(element => {
        const content = element.textContent.toLowerCase();
        const tags = element.getAttribute('data-tags') || '';
        
        if (content.includes(term) || tags.includes(term)) {
            element.classList.add('search-highlight');
            matchedElements.push(element);
            totalResults++;
            
            // Show play cards that were hidden
            if (element.classList.contains('play-card')) {
                element.style.display = '';
            }
        } else {
            element.classList.remove('search-highlight');
            
            // Hide play cards that don't match
            if (element.classList.contains('play-card')) {
                element.style.display = 'none';
            }
        }
    });

    // Update UI
    updateSearchCounter(totalResults, totalResults);
    
    if (totalResults > 0) {
        showNotification(`Found ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${term}"`, 'success');
    } else {
        showNotification(`No results found for "${term}"`, 'warning');
    }
}

function clearAllSearchHighlights() {
    const highlighted = document.querySelectorAll('.search-highlight');
    highlighted.forEach(el => el.classList.remove('search-highlight'));
}

function showAllElements() {
    const hiddenElements = document.querySelectorAll('.play-card[style*="display: none"]');
    hiddenElements.forEach(el => {
        el.style.display = '';
    });
}

function scrollToFirstResult() {
    const firstResult = document.querySelector('.search-highlight');
    if (firstResult) {
        scrollToElement(firstResult);
    }
}

// Enhanced Plays & Drills Library - FIXED
function initPlaysLibrary() {
    initPlaysFilter();
    initPlaysSearch();
    initExerciseDetails(); // FIXED
    initDownloadHandlers();
}

function initPlaysFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const playCards = document.querySelectorAll('.play-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button with animation
            updateActiveFilter(this, filterButtons);
            
            // Animate filter change
            animateFilterTransition(() => {
                filterPlayCards(filter, playCards);
            });
        });
    });
}

function initPlaysSearch() {
    const playsSearchInput = document.getElementById('playsSearchInput');
    if (!playsSearchInput) return;

    let searchTimeout;
    
    playsSearchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterPlaysBySearch(this.value);
        }, 150);
    });

    playsSearchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstVisible = document.querySelector('.play-card:not([style*="display: none"])');
            if (firstVisible) {
                scrollToElement(firstVisible);
            }
        }
    });
}

// MAJOR FIX - Exercise details expansion
function initExerciseDetails() {
    // Fix details/summary elements
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(details => {
        // Ensure proper structure
        const summary = details.querySelector('summary');
        if (summary) {
            summary.style.cursor = 'pointer';
            summary.style.userSelect = 'none';
        }
        
        details.addEventListener('toggle', function() {
            if (this.open) {
                // Add opening animation
                const content = this.querySelector('.exercise-content, .play-content');
                if (content) {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 50);
                }
            }
        });
        
        // Add click handler to summary for better compatibility
        if (summary) {
            summary.addEventListener('click', function(e) {
                // Let the browser handle the details toggle
                console.log('Details toggled');
            });
        }
    });
}

// FIXED - Download handlers with proper notification
function initDownloadHandlers() {
    const downloadButtons = document.querySelectorAll('.template-card .btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Get template name
            const templateName = this.parentElement.querySelector('h5')?.textContent || 'Template';
            
            // Show download notification
            showNotification(`${templateName} download initiated (demo)`, 'success');
        });
    });
}

function updateActiveFilter(activeButton, allButtons) {
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = '';
    });
    
    activeButton.classList.add('active');
    activeButton.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        activeButton.style.transform = '';
    }, 200);
}

function animateFilterTransition(callback) {
    const playsGrid = document.getElementById('playsGrid');
    if (!playsGrid) return;

    playsGrid.style.opacity = '0.6';
    playsGrid.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        callback();
        playsGrid.style.opacity = '1';
        playsGrid.style.transform = 'scale(1)';
    }, 150);
}

function filterPlayCards(filter, playCards) {
    let visibleCount = 0;
    
    playCards.forEach(card => {
        const phase = card.getAttribute('data-phase');
        const phaseText = card.querySelector('.play-phase')?.textContent.toLowerCase() || '';
        
        let shouldShow = false;
        
        if (filter === 'all') {
            shouldShow = true;
        } else {
            shouldShow = 
                phase === filter || 
                phaseText.includes(filter) || 
                (filter === 'understand' && phaseText.includes('understand')) ||
                (filter === 'ideation' && (phaseText.includes('dream') || phaseText.includes('ideation'))) ||
                (filter === 'converge' && phaseText.includes('converge')) ||
                (filter === 'prototype' && phaseText.includes('prototype')) ||
                (filter === 'test' && (phaseText.includes('test') || phaseText.includes('learn')));
        }
        
        if (shouldShow) {
            card.style.display = '';
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.add('hidden');
        }
    });

    updatePlayCounter(visibleCount);
}

function filterPlaysBySearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const playCards = document.querySelectorAll('.play-card');
    let visibleCount = 0;

    playCards.forEach(card => {
        if (term === '') {
            card.style.display = '';
            card.classList.remove('search-hidden');
            visibleCount++;
            return;
        }

        const content = card.textContent.toLowerCase();
        const tags = card.getAttribute('data-tags') || '';
        const isMatch = content.includes(term) || tags.includes(term);
        
        if (isMatch) {
            card.style.display = '';
            card.classList.remove('search-hidden');
            card.classList.add('search-match');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.add('search-hidden');
            card.classList.remove('search-match');
        }
    });

    updatePlayCounter(visibleCount);
}

function updatePlayCounter(count = null) {
    const totalCards = document.querySelectorAll('.play-card').length;
    const visibleCards = count !== null ? count : document.querySelectorAll('.play-card:not([style*="display: none"])').length;
    
    // Remove existing counter
    const existingCounter = document.querySelector('.play-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    // Add new counter if not showing all
    const playsHeader = document.querySelector('#plays .chapter-header');
    if (playsHeader && visibleCards !== totalCards) {
        const counter = document.createElement('div');
        counter.className = 'play-counter';
        counter.textContent = `Showing ${visibleCards} of ${totalCards} plays`;
        counter.style.cssText = `
            margin-top: var(--space-8);
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            font-style: italic;
            text-align: center;
        `;
        playsHeader.appendChild(counter);
    }
}

// Utility Functions - ENHANCED
function scrollToSection(section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

function scrollToElement(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement && !this.classList.contains('nav-link')) {
                e.preventDefault();
                // Use scrollToSection for section links, scrollToElement for other elements
                if (targetElement.classList.contains('content-section') || targetElement.classList.contains('hero-section')) {
                    scrollToSection(targetElement);
                    // Update nav to show active section
                    const correspondingNavLink = document.querySelector(`.nav-link[href="${href}"]`);
                    if (correspondingNavLink) {
                        updateActiveNavLink(correspondingNavLink);
                    }
                } else {
                    scrollToElement(targetElement);
                }
            }
        });
    });
}

// Interactive visual effects
function initInteractiveElements() {
    addHoverEffects();
    addClickEffects();
    addScrollAnimations();
}

function addHoverEffects() {
    const cards = document.querySelectorAll('.offering-card, .role-card, .play-card, .phase-detailed, .pillar-card, .framework-card, .metric-item, .example-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all var(--duration-normal) var(--ease-standard)';
        });
    });
}

function addClickEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .filter-btn, .nav-link, .play-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.phase-detailed, .mvp-phase, .pillar-card, .role-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key clears search
        if (e.key === 'Escape') {
            clearAllSearches();
        }
        
        // Alt + S focuses main search
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Alt + P focuses plays search
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            const playsSearch = document.getElementById('playsSearchInput');
            if (playsSearch) {
                playsSearch.focus();
                playsSearch.select();
            }
        }
        
        // Arrow keys for navigation
        handleArrowKeyNavigation(e);
    });
}

function handleArrowKeyNavigation(e) {
    if (e.target.tagName === 'INPUT') return;
    
    const sections = document.querySelectorAll('.content-section');
    const currentSection = getCurrentSection();
    
    if (e.key === 'ArrowUp' && e.altKey) {
        e.preventDefault();
        navigateToSection(currentSection, -1, sections);
    } else if (e.key === 'ArrowDown' && e.altKey) {
        e.preventDefault();
        navigateToSection(currentSection, 1, sections);
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('.content-section');
    const scrollPosition = window.scrollY + 150;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            return section;
        }
    }
    
    return sections[0];
}

function navigateToSection(currentSection, direction, sections) {
    const sectionsArray = Array.from(sections);
    const currentIndex = sectionsArray.indexOf(currentSection);
    const newIndex = Math.max(0, Math.min(sectionsArray.length - 1, currentIndex + direction));
    
    if (newIndex !== currentIndex) {
        scrollToSection(sectionsArray[newIndex]);
    }
}

function clearAllSearches() {
    const searchInputs = document.querySelectorAll('#searchInput, #playsSearchInput');
    searchInputs.forEach(input => {
        if (input && input.value) {
            input.value = '';
            input.dispatchEvent(new Event('input'));
            input.blur();
        }
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResize();
        }, 100);
    });
    
    // Optimize scroll events
    optimizeScrollEvents();
}

function handleResize() {
    // Recalculate positions for scroll spy
    const scrollSpyEvent = new Event('scroll');
    window.dispatchEvent(scrollSpyEvent);
}

function optimizeScrollEvents() {
    let ticking = false;
    
    function updateOnScroll() {
        // Batch scroll-related updates
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// ENHANCED Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    const colors = {
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: var(--space-20);
        background-color: var(--color-surface);
        color: var(--color-text);
        padding: var(--space-12) var(--space-16);
        border-radius: var(--radius-base);
        border-left: 4px solid ${colors[type]};
        box-shadow: var(--shadow-md);
        font-size: var(--font-size-sm);
        z-index: 200;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-weight: var(--font-weight-medium);
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// Search results helpers - FIXED
function addSearchResultsCounter() {
    if (document.querySelector('#search-counter-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'search-counter-styles';
    style.textContent = `
        .search-counter {
            position: fixed;
            top: 90px;
            right: var(--space-20);
            background-color: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-6) var(--space-10);
            font-size: var(--font-size-xs);
            color: var(--color-text-secondary);
            z-index: 50;
            box-shadow: var(--shadow-sm);
            transition: all var(--duration-fast) var(--ease-standard);
        }
        
        .search-counter.hidden {
            opacity: 0;
            transform: translateX(100%);
        }
    `;
    document.head.appendChild(style);
}

function updateSearchCounter(visible, total) {
    let counter = document.querySelector('.search-counter');
    
    if (total === 0) {
        if (counter) {
            counter.classList.add('hidden');
            setTimeout(() => counter.remove(), 300);
        }
        return;
    }
    
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'search-counter hidden';
        document.body.appendChild(counter);
    }
    
    counter.textContent = `${visible} result${visible !== 1 ? 's' : ''}`;
    counter.classList.remove('hidden');
}

// Ripple effect for interactions
function createRippleEffect(event, element) {
    // Skip ripple for certain elements
    if (element.classList.contains('nav-link') || element.tagName === 'A') {
        return;
    }
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(var(--color-primary-rgb, 33, 128, 141), 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = element.style.position || 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Add dynamic styles - FIXED
function addDynamicStyles() {
    if (document.querySelector('#dynamic-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .search-highlight {
            background-color: rgba(var(--color-warning-rgb, 168, 75, 47), 0.25);
            border-radius: var(--radius-sm);
            padding: var(--space-1);
            transition: background-color var(--duration-fast) var(--ease-standard);
            animation: highlightPulse 1s ease-in-out;
        }
        
        @keyframes highlightPulse {
            0% { background-color: rgba(var(--color-warning-rgb, 168, 75, 47), 0.4); }
            100% { background-color: rgba(var(--color-warning-rgb, 168, 75, 47), 0.25); }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .search-match {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb, 33, 128, 141), 0.2);
        }
        
        body:not(.loaded) {
            opacity: 0;
        }
        
        body.loaded {
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
        }
        
        /* Fix for details/summary styling */
        details > summary {
            list-style: none;
            cursor: pointer;
            padding: var(--space-8) 0;
            border-radius: var(--radius-sm);
            transition: background-color var(--duration-fast) var(--ease-standard);
        }
        
        details > summary::-webkit-details-marker {
            display: none;
        }
        
        details > summary::before {
            content: '▸ ';
            margin-right: var(--space-8);
            transition: transform var(--duration-fast);
            color: var(--color-primary);
            font-weight: bold;
        }
        
        details[open] > summary::before {
            transform: rotate(90deg);
        }
        
        details > summary:hover {
            background-color: var(--color-secondary);
        }
    `;
    document.head.appendChild(style);
}

// Advanced features for accessibility
function initAccessibilityFeatures() {
    // Add focus management
    manageFocus();
    
    // Add ARIA attributes dynamically
    addAriaAttributes();
    
    // Handle reduced motion preferences
    handleReducedMotion();
}

function manageFocus() {
    // Trap focus in modal-like elements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Focus management logic here
        }
    });
}

function addAriaAttributes() {
    // Add appropriate ARIA labels and roles
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        if (!input.getAttribute('aria-label')) {
            input.setAttribute('aria-label', input.placeholder || 'Search');
        }
    });
    
    // Add aria-expanded to details elements
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        if (summary) {
            summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
            details.addEventListener('toggle', () => {
                summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
            });
        }
    });
}

function handleReducedMotion() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}