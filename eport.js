
JavaScript

// Function for mobile navigation menu
function myMenuFunction() {
    const navMenu = document.getElementById("myNavmenu");
    const navBtnIcon = document.querySelector(".nav-btn i");

    if (navMenu.classList.contains("responsive")) {
        navMenu.classList.remove("responsive");
        navBtnIcon.classList.remove("fa-times"); // Change to X
        navBtnIcon.classList.add("fa-bars"); // Change back to bars
    } else {
        navMenu.classList.add("responsive");
        navBtnIcon.classList.remove("fa-bars");
        navBtnIcon.classList.add("fa-times");
    }
}

// Close mobile nav when a link is clicked
const navLinks = document.querySelectorAll('.nav-lists a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById("myNavmenu");
        const navBtnIcon = document.querySelector(".nav-btn i");
        if (navMenu.classList.contains("responsive")) {
            navMenu.classList.remove("responsive");
            navBtnIcon.classList.remove("fa-times");
            navBtnIcon.classList.add("fa-bars");
        }
    });
});


// Dark Mode Toggle
const toggleBtn = document.getElementById("toggle");
const body = document.body;
const moonIcon = document.getElementById("moon");

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.classList.add('dark');
    toggleBtn.classList.remove('light');
} else {
    body.classList.remove('dark-mode');
    toggleBtn.classList.add('light');
    toggleBtn.classList.remove('dark');
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.classList.add('dark');
        toggleBtn.classList.remove('light');
    } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.classList.add('light');
        toggleBtn.classList.remove('dark');
    }
});


// Smooth scrolling for navigation links
const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true,
    offset: 80 // Adjust based on your fixed header height
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-lists a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) { // Adjust offset for active state
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// Typed.js for dynamic text
// Make sure you have the Typed.js library included: <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.typed', {
        strings: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Software Developer'],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    });
} else {
    console.warn("Typed.js not loaded. The dynamic text animation will not work.");
}

// Animate skill bars on scroll
const skillSection = document.querySelector('#about');
const skillBars = document.querySelectorAll('.skills-per');

const animateSkills = () => {
    const sectionTop = skillSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight / 1.5) { // When section is visible
        skillBars.forEach(bar => {
            const percentage = bar.style.width; // Get percentage from CSS or set a data attribute
            bar.style.setProperty('--skill-percentage', percentage); // Set CSS variable
            bar.style.animationPlayState = 'running';
        });
        // Remove event listener after animation to prevent re-triggering
        window.removeEventListener('scroll', animateSkills);
    }
};

// Initial check and add event listener
window.addEventListener('scroll', animateSkills);
animateSkills(); // Call once on load in case section is already in view