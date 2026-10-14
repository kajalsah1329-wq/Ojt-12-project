```javascript
// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});

// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");
        icon.classList.replace("fa-xmark", "fa-bars");
    });
});


// ANIMATED COUNTERS

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;
            const increment = Math.max(1, Math.ceil(target / 100));

            let current = 0;

            const updateCounter = () => {

                current += increment;

                if (current < target) {
                    counter.innerText = current;
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };

            updateCounter();
            observer.unobserve(counter);
        }

    });

}, { threshold: 0.5 });

counters.forEach(counter => {
    observer.observe(counter);
});


// TESTIMONIAL SLIDER

const reviews = [

    {
        text: "Elevate helped us transform our business. Their professional team and innovative approach exceeded our expectations.",
        name: "Sarah Johnson",
        role: "Business Owner"
    },

    {
        text: "Working with Elevate was an amazing experience. They understood our goals and delivered excellent results.",
        name: "Michael Smith",
        role: "Company Director"
    },

    {
        text: "A reliable team with outstanding creativity and professionalism. Highly recommended for growing businesses.",
        name: "Emily Davis",
        role: "Marketing Manager"
    }

];

let currentReview = 0;

function showReview(index) {

    document.getElementById("review").innerText =
        '"' + reviews[index].text + '"';

    document.getElementById("clientName").innerText =
        reviews[index].name;

    document.getElementById("clientRole").innerText =
        reviews[index].role;
}

document.getElementById("next").addEventListener("click", () => {

    currentReview++;

    if (currentReview >= reviews.length) {
        currentReview = 0;
    }

    showReview(currentReview);
});

document.getElementById("prev").addEventListener("click", () => {

    currentReview--;

    if (currentReview < 0) {
        currentReview = reviews.length - 1;
    }

    showReview(currentReview);
});


// CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !subject || !message) {

        formMessage.style.color = "red";
        formMessage.innerText = "Please fill in all fields.";

        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.style.color = "red";
        formMessage.innerText = "Please enter a valid email address.";

        return;
    }

    formMessage.style.color = "green";

    formMessage.innerText =
        "Thank you, " + name + "! Your message has been validated successfully. Connect a backend or email service to receive it.";

    contactForm.reset();

});


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .about-content, .why-item, .contact-form"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);
        }

    });

}, { threshold: 0.15 });

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.7s ease";

    revealObserver.observe(element);

});


// CURRENT YEAR IN CONSOLE
console.log("Elevate Corporate Website Loaded Successfully!");
```