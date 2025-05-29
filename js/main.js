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
    const skillsPreview = element.querySelector('.skills-preview');
    const skillsItems = element.querySelector('.skills-items');
    const arrow = element.querySelector('h3::after');

    // Toggle the expanded state
    const isExpanded = element.classList.contains('expanded');

    // First, close any other expanded categories
    document.querySelectorAll('.skills-category.expanded').forEach(category => {
        if (category !== element) {
            category.classList.remove('expanded');
            // Reset height of other sections
            const otherPreview = category.querySelector('.skills-preview');
            const otherItems = category.querySelector('.skills-items');
            if (otherPreview) otherPreview.style.display = 'grid';
            if (otherItems) otherItems.style.display = 'none';
        }
    });

    // Toggle the clicked category
    if (!isExpanded) {
        element.classList.add('expanded');
        if (skillsPreview) skillsPreview.style.display = 'none';
        if (skillsItems) {
            skillsItems.style.display = 'grid';
            // Trigger reflow for animation
            skillsItems.offsetHeight;
            skillsItems.style.opacity = '1';
            skillsItems.style.transform = 'translateY(0)';
        }
    } else {
        element.classList.remove('expanded');
        if (skillsPreview) skillsPreview.style.display = 'grid';
        if (skillsItems) {
            skillsItems.style.opacity = '0';
            skillsItems.style.transform = 'translateY(-10px)';
            // Wait for animation to complete before hiding
            setTimeout(() => {
                skillsItems.style.display = 'none';
            }, 300);
        }
    }
}

// Initialize skills sections
document.addEventListener('DOMContentLoaded', () => {
    // Make sure all categories start collapsed
    document.querySelectorAll('.skills-category').forEach(category => {
        category.classList.remove('expanded');
        const skillsItems = category.querySelector('.skills-items');
        if (skillsItems) {
            skillsItems.style.display = 'none';
            skillsItems.style.opacity = '0';
            skillsItems.style.transform = 'translateY(-10px)';
        }
    });

    // Add click event listeners to h3 elements
    document.querySelectorAll('.skills-category h3').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling to parent
            const category = header.closest('.skills-category');
            if (category) {
                toggleSkills(category);
            }
        });
    });
}); 