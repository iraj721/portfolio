// ========== TYPING ANIMATION ==========
const words = ["Full Stack Developer", "AI Integration Expert", "React Developer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function typeEffect() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const updateCount = () => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = Math.ceil(target / 50);
        
        if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close sidebar if open on mobile
            if (sidebar && sidebar.classList.contains('active')) {
                closeSidebarFunc();
            }
        }
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.project-card, .edu-card, .skill-category, .stat-box').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    revealObserver.observe(el);
});

// ========== MOBILE SIDEBAR (RIGHT SIDE) ==========
const sidebar = document.getElementById('sidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
const hamburgerBtn = document.querySelector('.hamburger');

function openSidebar() {
    if (sidebar) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSidebarFunc() {
    if (sidebar) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Open sidebar on hamburger click
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openSidebar);
}

// Close sidebar on X button click
if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', closeSidebarFunc);
}

// Close sidebar on overlay click
if (overlay) {
    overlay.addEventListener('click', closeSidebarFunc);
}

// Close sidebar on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
        closeSidebarFunc();
    }
});

// Close sidebar when clicking sidebar links
document.querySelectorAll('.sidebar-links a').forEach(link => {
    link.addEventListener('click', closeSidebarFunc);
});

// ========== CONTACT FORM - EMAILJS ==========
window.addEventListener('load', function() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("hbN1RnsxEt7dTKZPG");
        console.log("EmailJS initialized");
    } else {
        console.error("EmailJS not loaded");
    }
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            formStatus.innerHTML = "📧 Sending message...";
            formStatus.style.color = "#6c63ff";
            
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value || "Portfolio Contact",
                message: document.getElementById('message').value
            };
            
            emailjs.send('service_7w8utlu', 'template_vn9nntb', templateParams)
                .then(function(response) {
                    console.log("Email sent:", response);
                    formStatus.innerHTML = "✅ Message sent! I'll reply within 24 hours.";
                    formStatus.style.color = "#4caf50";
                    contactForm.reset();
                    setTimeout(() => { formStatus.innerHTML = ""; }, 5000);
                })
                .catch(function(error) {
                    console.error("Email error:", error);
                    formStatus.innerHTML = "❌ Failed to send. Please email: irajtahir555@gmail.com";
                    formStatus.style.color = "#ff6584";
                    setTimeout(() => { formStatus.innerHTML = ""; }, 5000);
                });
        });
    }
});