// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillFills = document.querySelectorAll('.skill-fill');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const contactForm = document.querySelector('.contact-form');
const fadeElements = document.querySelectorAll('.fade-in');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    //document.body.classList.toggle('nav-open');
});

// Close navigation when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

// Smooth Scrolling for Navigation Links - Fixed
navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.nav-glass').offsetHeight;
            const offsetTop = targetSection.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link immediately
            navLinkItems.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Active Navigation Link Highlighting - Improved
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150; // Offset for navbar
    let current = '';
    
    // Check each section
    const sections = ['home', 'about', 'projects', 'skills', 'testimonials', 'contact'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        }
    });
    
    // Update active state
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Typewriter Effect
function typeWriter(element, words, speed = 100) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = speed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize Typewriter Effect
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    const words = typewriterElement.getAttribute('data-words');
    if (words) {
        const wordsArray = JSON.parse(words);
        typeWriter(typewriterElement, wordsArray);
    }
}

// Project Filtering
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').toLowerCase();
        const shouldShow = category === 'all' || cardCategories.includes(category);
        
        if (shouldShow) {
            card.style.display = 'flex';
            card.classList.add('fade-in');
            setTimeout(() => card.classList.add('visible'), 100);
        } else {
            card.style.display = 'none';
            card.classList.remove('visible');
        }
    });
}

// Filter Button Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter category
        const category = button.getAttribute('data-filter');
        
        // Filter projects
        filterProjects(category);
    });
});

// Skill Bar Animation
function animateSkillBars() {
    skillFills.forEach(skill => {
        const percentage = skill.getAttribute('data-percentage');
        setTimeout(() => {
            skill.style.width = percentage + '%';
        }, 300);
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section comes into view
            if (entry.target.closest('#skills')) {
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}, observerOptions);

// Observe elements for fade-in animations
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .testimonial-card, .contact-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Testimonials Slider
let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    
    // Activate current dot
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
}

// Initialize first testimonial
if (testimonialCards.length > 0) {
    showTestimonial(0);
}

// Testimonial dots event listeners
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(index);
    });
});

// Auto-advance testimonials
function autoAdvanceTestimonials() {
    if (testimonialCards.length > 1) {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
}

// Start auto-advance
setInterval(autoAdvanceTestimonials, 5000);

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 16px 20px;
        color: white;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    // Add type-specific styles
    if (type === 'success') {
        notification.style.borderLeftColor = '#10b981';
    } else if (type === 'error') {
        notification.style.borderLeftColor = '#ef4444';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll Event Handler
let ticking = false;

function handleScroll() {
    updateActiveNavLink();
    
    // Hide/show navigation on scroll
    const navbar = document.querySelector('.nav-glass');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

// Parallax Effect for Gradient Orbs
function handleParallax() {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

window.addEventListener('scroll', handleParallax);

// Initialize AOS (Animation on Scroll) alternative
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const aos = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        aos.observe(element);
        element.style.cssText += `
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        `;
    });
    
    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollTopButton.className = 'scroll-top-btn';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 18px;
    cursor: pointer;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
`;

scrollTopButton.addEventListener('click', scrollToTop);
document.body.appendChild(scrollTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.transform = 'translateY(0)';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.transform = 'translateY(100px)';
    }
});

// Loading Animation
window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }, 500);
    
    // Set initial active nav link
    updateActiveNavLink();
});

// Resize Event Handler
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
}

window.addEventListener('resize', handleResize);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : testimonialCards.length - 1;
        showTestimonial(currentTestimonial);
    } else if (e.key === 'ArrowRight') {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
});

// Performance Optimization
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Apply throttling to scroll events
const throttledScroll = throttle(handleScroll, 16); // ~60fps
const throttledParallax = throttle(handleParallax, 16);

window.removeEventListener('scroll', handleScroll);
window.removeEventListener('scroll', handleParallax);
window.addEventListener('scroll', throttledScroll);
window.addEventListener('scroll', throttledParallax);

// Console welcome message
console.log(
    '%c👋 Welcome to Muhammad Taha\'s Portfolio!',
    'color: #667eea; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cFeel free to explore the code and get in touch!',
    'color: #764ba2; font-size: 14px;'
);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully! 🚀');
    
    // Ensure proper initialization
    setTimeout(() => {
        updateActiveNavLink();
    }, 100);
});

//coursor design
const cursor = document.getElementById("cursor");
const trailContainer = document.getElementById("trail-container");

// Different colors for dots
const colors = ["#ff004c", "#ff7b00", "#ffeb00", "#00ff85", "#00c3ff", "#7b00ff", "#ff00b3"];

document.addEventListener("mousemove", (e) => {
  // Move main cursor
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  // Create trail dot
  const dot = document.createElement("div");
  dot.className = "trail-dot";
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  dot.style.background = colors[Math.floor(Math.random() * colors.length)];

  trailContainer.appendChild(dot);

  // Remove dot after animation
  setTimeout(() => {
    dot.remove();
  }, 800);
});

//scroll bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width = scrollPercent + "%";
});