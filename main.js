// Basic JavaScript interactivity for the personal website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skills li');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click animation to education and experience items
    const infoItems = document.querySelectorAll('.education-item, .experience-item');
    
    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.backgroundColor = '#333333';
            setTimeout(() => {
                this.style.backgroundColor = 'black';
            }, 200);
        });
    });

    // Simple form validation (if contact form is added later)
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Console log for debugging
    console.log('Personal website loaded successfully!');
});
