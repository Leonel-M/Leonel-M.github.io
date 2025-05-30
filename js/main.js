// Smooth scrolling for navigation links
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// Animate skill bars (when visible)
const animateSkills = () => {
    document.querySelectorAll('.skill-level').forEach(skill => {
        const level = skill.getAttribute('data-level');
        const progress = skill.querySelector('.skill-progress');
        progress.style.width = `${level}%`;
    });
};

// Intersection Observer for animations
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills-grid')) {
                animateSkills();
            }
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message. I will get back to you soon.');
        contactForm.reset();
    });
}

// Accordion for Skills Section: open only clicked category
/*
document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.skills-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const category = toggle.closest('.skills-category');
            if (!category) return;
            // Close all other categories
            document.querySelectorAll('.skills-category').forEach(cat => {
                if (cat !== category) {
                    cat.classList.remove('active');
                }
            });
            // Toggle this one
            category.classList.toggle('active');
        });
    });
    // Ensure all start collapsed
    document.querySelectorAll('.skills-category').forEach(cat => cat.classList.remove('active'));
});
*/
