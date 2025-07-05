

JavaScript

// Type.js for typing animation
document.addEventListener('DOMContentLoaded', function() {
    // Check if Typed.js library is loaded
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('.typed', {
            strings: ["Gerald Kyalo", "a Web Developer", "a Software Developer"],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1000,
            loop: true
        });
    } else {
        console.error("Typed.js library not loaded. Please ensure it's linked correctly.");
        // Fallback if Typed.js isn't available
        document.querySelector('.typed').textContent = "Gerald Kyalo";
    }

    // --- Dark Mode Toggle ---
    const toggleButton = document.getElementById('toggle');
    const moonIcon = document.getElementById('moon');
    const sunIcon = document.getElementById('sun');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    } else {
        // Default to light theme if no preference is saved
        body.setAttribute('data-theme', 'light');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }

    toggleButton.onclick = function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    };

    // --- Mobile Navigation Menu Toggle ---
    const navMenu = document.getElementById('myNavmenu');
    const navToggleBtn = document.querySelector('.nav-btn i'); // The hamburger icon

    // Function to toggle the menu
    window.myMenuFunction = function() {
        navMenu.classList.toggle('open');
        // Toggle the icon (e.g., from bars to times and vice-versa)
        if (navMenu.classList.contains('open')) {
            navToggleBtn.classList.remove('uil-bars');
            navToggleBtn.classList.add('uil-times'); // Assuming you have uil-times for close icon
        } else {
            navToggleBtn.classList.remove('uil-times');
            navToggleBtn.classList.add('uil-bars');
        }
    };

    // Close mobile menu when a navigation link is clicked
    const navLinks = document.querySelectorAll('.nav-lists a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggleBtn.classList.remove('uil-times');
                navToggleBtn.classList.add('uil-bars');
            }
        });
    });

    // --- Active Navigation Link Highlighting on Scroll ---

    
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.getElementById('header').offsetHeight; // Get header height dynamically

    function activateNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20; // Adjusted for header and some padding
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Call on load to set initial active link

    // --- Skill Bar Animations on Scroll (Intersection Observer) ---
    const skillBars = document.querySelectorAll('.skills-per');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillPer = entry.target;
                const percentage = skillPer.querySelector('.tooltip').textContent.replace('%', '');
                skillPer.style.width = percentage + '%';
                observer.unobserve(skillPer); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.7 // Trigger when 70% of the element is visible
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    // --- Smooth Scrolling for all internal links (if not using scroll-behavior: smooth) ---
    // This is optional if `scroll-behavior: smooth` in CSS is sufficient.
    // If you need more control or older browser support, uncomment this.
    /*
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    */
});