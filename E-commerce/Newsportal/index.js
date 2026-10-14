
// DATE
document.getElementById("today").textContent =
    new Date().toDateString();


// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuBtn.textContent =
        navLinks.classList.contains("show") ? "✕" : "☰";
});


// CLOSE MOBILE MENU ON CLICK
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.textContent = "☰";
    });
});


// DARK MODE
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
});


// CATEGORY FILTER
const categoryButtons =
    document.querySelectorAll(".category-btn");

const newsCards =
    document.querySelectorAll(".news-card");

let currentCategory = "all";

function filterNews() {
    const searchValue =
        document.getElementById("searchInput")
        .value.toLowerCase();

    newsCards.forEach(card => {
        const category = card.dataset.category;
        const text = card.innerText.toLowerCase();

        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;

        const matchesSearch =
            text.includes(searchValue);

        card.style.display =
            matchesCategory && matchesSearch ? "block" : "none";
    });
}

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentCategory = button.dataset.category;

        filterNews();
    });

});


// SEARCH NEWS
document.getElementById("searchInput")
.addEventListener("input", filterNews);


// ARTICLE POPUP
const modal = document.getElementById("articleModal");

const closeModal =
    document.getElementById("closeModal");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");

document.querySelectorAll(".read-more").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".news-card");

        const title = card.querySelector("h3").innerText;
        const description = card.querySelector("p").innerText;
        const image = card.querySelector("img").src;
        const category = card.dataset.category;

        modalTitle.innerText = title;
        modalDescription.innerText = description;
        modalImage.src = image;
        modalCategory.innerText = category.toUpperCase();

        modal.classList.add("show");

    });

});

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});


// NEWSLETTER
document.getElementById("newsletterForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    alert("Thank you! " + email +
          " has been added to our demo subscription list.");

    this.reset();

});


// LOAD MORE NEWS
const loadMore =
    document.getElementById("loadMore");

loadMore.addEventListener("click", () => {

    const extraNews = [
        {
            category: "technology",
            title: "The Future of Smart Technology",
            description: "Discover how smart devices are changing modern lifestyles.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700"
        },
        {
            category: "sports",
            title: "Young Athletes Making Their Mark",
            description: "A new generation of athletes is inspiring the sporting world.",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700"
        },
        {
            category: "business",
            title: "New Opportunities in Digital Business",
            description: "Digital innovation is creating new opportunities for entrepreneurs.",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700"
        }
    ];

    extraNews.forEach(news => {

        const card = document.createElement("article");

        card.className = "news-card";
        card.dataset.category = news.category;

        card.innerHTML = `
            <div class="news-image">
                <img src="${news.image}" alt="${news.category}">
                <span class="tag">${news.category.toUpperCase()}</span>
            </div>

            <div class="news-content">
                <span class="date">Latest Update · 4 min read</span>
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <button class="read-more">Read Full Story →</button>
            </div>
        `;

        document.getElementById("newsGrid")
        .appendChild(card);

        card.querySelector(".read-more")
        .addEventListener("click", () => {

            modalTitle.innerText = news.title;
            modalDescription.innerText = news.description;
            modalImage.src = news.image;
            modalCategory.innerText =
                news.category.toUpperCase();

            modal.classList.add("show");
        });

    });

    filterNews();

    loadMore.textContent = "More Stories Added ✓";

    loadMore.disabled = true;

});
