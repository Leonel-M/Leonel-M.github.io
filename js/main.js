// Smooth scrolling for navigation links
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

// Change navigation style on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 59, 92, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 59, 92, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate skill bars
const animateSkills = () => {
    document.querySelectorAll('.skill-level').forEach(skill => {
        const level = skill.getAttribute('data-level');
        const progress = skill.querySelector('.skill-progress');
        progress.style.width = `${level}%`;
    });
};

// Observer to trigger animations when elements are visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills-grid')) {
                animateSkills();
            }
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe sections for animations
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Handle contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you can add the logic to handle form submission
        alert('Thank you for your message. I will get back to you soon.');
        contactForm.reset();
    });
}

// Toggle skills sections
function toggleSkills(element) {
    // Close any other expanded categories
    document.querySelectorAll('.skills-category.expanded').forEach(category => {
        if (category !== element) {
            category.classList.remove('expanded');
        }
    });

    // Toggle the clicked category
    element.classList.toggle('expanded');
}

// Initialize skills sections
document.addEventListener('DOMContentLoaded', () => {
    // Make sure all categories start collapsed
    document.querySelectorAll('.skills-category').forEach(category => {
        category.classList.remove('expanded');
    });
}); 