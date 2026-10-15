// Toggle Mobile Navigation Menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modal Logic
const modal = document.getElementById('bookingModal');
const openModalBtns = document.querySelectorAll('.open-modal');
const closeModalBtn = document.querySelector('.close-modal');
const inquiryForm = document.getElementById('inquiryForm');

// Open Modal when any "Book Now" is pressed
openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
});

// Close Modal when close 'x' icon is selected
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close Modal if user clicks out of the modal contents wrapper box
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle simple mockup submission validation message
inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! Our agents will contact you shortly.');
    inquiryForm.reset();
    modal.style.display = 'none';
});

// Simple Active Window Scrolling Indicator Highlights
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(currentSection)) {
            item.classList.add('active');
        }
    });
});
