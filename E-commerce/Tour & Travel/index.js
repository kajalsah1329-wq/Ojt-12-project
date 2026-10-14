
// MOBILE NAVIGATION
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");
});

// CLOSE MENU WHEN CLICKING A LINK
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-xmark");
    });
});

// SEARCH DESTINATIONS
function searchDestination() {
    const searchValue = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const cards = document.querySelectorAll(".destination-card");
    const noResults = document.getElementById("noResults");

    let found = 0;

    cards.forEach(card => {
        const destination = card.dataset.name.toLowerCase();

        if (destination.includes(searchValue)) {
            card.style.display = "block";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = found !== 0;

    document.getElementById("destinations").scrollIntoView({
        behavior: "smooth"
    });
}

// BOOKING POPUP
function openBooking(packageName, price) {
    const modal = document.getElementById("bookingModal");

    document.getElementById("selectedPackage").textContent =
        packageName + " - " + price + " per person";

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeBooking() {
    document.getElementById("bookingModal").style.display = "none";
    document.body.style.overflow = "auto";
}

// CLOSE MODAL WHEN CLICKING OUTSIDE
window.addEventListener("click", function(event) {
    const modal = document.getElementById("bookingModal");

    if (event.target === modal) {
        closeBooking();
    }
});

// BOOKING FORM
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Thank you! Your booking request has been submitted successfully.");

    this.reset();
    closeBooking();
});

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Thank you for contacting Travelora! We will get back to you soon.");

    this.reset();
});

// SET MINIMUM TRAVEL DATE
const today = new Date().toISOString().split("T")[0];

document.getElementById("travelDate").min = today;
document.getElementById("bookingDate").min = today;
