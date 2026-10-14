
// PRODUCT DATABASE

const products = [
    {
        id: 1,
        name: "Premium Casual Jacket",
        category: "Fashion",
        price: 2499,
        oldPrice: 3499,
        rating: 5,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 3999,
        oldPrice: 4999,
        rating: 5,
        badge: "HOT",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },
    {
        id: 3,
        name: "Luxury Beauty Kit",
        category: "Beauty",
        price: 1599,
        oldPrice: 1999,
        rating: 4,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
    },
    {
        id: 4,
        name: "Classic Wrist Watch",
        category: "Accessories",
        price: 2999,
        oldPrice: 3999,
        rating: 5,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },
    {
        id: 5,
        name: "Stylish Sneakers",
        category: "Fashion",
        price: 2799,
        oldPrice: 3499,
        rating: 4,
        badge: "HOT",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 6,
        name: "Smart Camera",
        category: "Electronics",
        price: 8999,
        oldPrice: 9999,
        rating: 5,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"
    },
    {
        id: 7,
        name: "Premium Perfume",
        category: "Beauty",
        price: 1899,
        oldPrice: 2499,
        rating: 5,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"
    },
    {
        id: 8,
        name: "Fashion Sunglasses",
        category: "Accessories",
        price: 999,
        oldPrice: 1499,
        rating: 4,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    }
];

let cart = [];
let wishlist = [];

const grid = document.getElementById("product-grid");

// DISPLAY PRODUCTS

function displayProducts(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
    }

    list.forEach(product => {
        const isWished = wishlist.includes(product.id);

        grid.innerHTML += `
        <div class="product-card">

            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">

                <span class="product-badge">${product.badge}</span>

                <button class="wishlist ${isWished ? 'selected' : ''}"
                onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>

            <div class="product-info">
                <small>${product.category}</small>
                <h3>${product.name}</h3>

                <div class="stars">
                    ${"★".repeat(product.rating)}
                </div>

                <span class="price">Rs. ${product.price.toLocaleString()}</span>
                <span class="old-price">Rs. ${product.oldPrice.toLocaleString()}</span>

                <div class="product-actions">
                    <button class="add-btn"
                    onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Add To Cart
                    </button>

                    <button class="view-btn"
                    onclick="quickView(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>

        </div>`;
    });
}

// ADD TO CART

function addToCart(id) {
    const product = products.find(p => p.id === id);

    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
    showToast("Product added to your bag!");
}

// UPDATE CART

function updateCart() {
    const container = document.getElementById("cart-items");

    container.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p style='padding:25px 0'>Your shopping bag is empty.</p>";
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        container.innerHTML += `
        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div>
                <h4>${item.name}</h4>

                <p>Rs. ${(item.price * item.quantity).toLocaleString()}</p>

                <div class="quantity">
                    <button onclick="changeQuantity(${item.id},-1)">-</button>

                    ${item.quantity}

                    <button onclick="changeQuantity(${item.id},1)">+</button>

                    <button class="remove-btn"
                    onclick="removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>

        </div>`;
    });

    document.getElementById("cart-count").innerText = count;
    document.getElementById("cart-total").innerText = total.toLocaleString();
}

// CHANGE QUANTITY

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeItem(id);
        return;
    }

    updateCart();
}

// REMOVE PRODUCT

function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
    showToast("Product removed!");
}

// OPEN CART

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
}

// WISHLIST

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        showToast("Removed from wishlist");
    } else {
        wishlist.push(id);
        showToast("Added to wishlist!");
    }

    document.getElementById("wish-count").innerText = wishlist.length;

    displayProducts(
        products.filter(p =>
            document.getElementById("search-input").value.trim() === ""
                ? true
                : p.name.toLowerCase().includes(
                    document.getElementById("search-input").value.toLowerCase()
                )
        )
    );
}

function showWishlist() {
    const items = products.filter(p => wishlist.includes(p.id));

    displayProducts(items);

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Showing your wishlist");
}

// CATEGORY FILTER

function filterCategory(category, button) {
    const filtered = category === "All"
        ? products
        : products.filter(p => p.category === category);

    displayProducts(filtered);

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    } else {
        document.querySelectorAll(".filter-btn").forEach(btn => {
            if (btn.textContent.trim() === category) {
                btn.classList.add("active");
            }
        });
    }

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

// SEARCH

function toggleSearch() {
    document.getElementById("search-box").classList.toggle("show");

    if (document.getElementById("search-box").classList.contains("show")) {
        document.getElementById("search-input").focus();
    }
}

function searchProducts() {
    const query = document.getElementById("search-input").value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    displayProducts(filtered);
}

// QUICK VIEW

function quickView(id) {
    const product = products.find(p => p.id === id);

    document.getElementById("modal-details").innerHTML = `
        <img src="${product.image}" alt="${product.name}">

        <h2 style="margin:15px 0">${product.name}</h2>

        <p>${product.category}</p>

        <p style="color:#ff6b35;font-size:23px;font-weight:bold;margin:10px 0">
            Rs. ${product.price.toLocaleString()}
        </p>

        <p>Enjoy quality and style with this amazing product.</p>

        <button class="checkout-btn"
        style="margin-top:20px"
        onclick="addToCart(${product.id});closeModal()">
            ADD TO CART
        </button>
    `;

    document.getElementById("product-modal").classList.add("show");
}

function closeModal() {
    document.getElementById("product-modal").classList.remove("show");
}

// CHECKOUT

function checkout() {
    if (cart.length === 0) {
        showToast("Your shopping bag is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const summary = cart.map(item =>
        `${item.name} x ${item.quantity}`
    ).join("\n");

    alert(
        "ORDER SUMMARY\n\n" +
        summary +
        "\n\nTotal Amount: Rs. " + total.toLocaleString() +
        "\n\nThank you for shopping with SHOPORA!"
    );
}

// NEWSLETTER

function subscribe(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    showToast("Thank you for subscribing!");

    document.getElementById("email").value = "";
}

// MOBILE MENU

function toggleMenu() {
    document.getElementById("navbar").classList.toggle("show");
}

// TOAST NOTIFICATION

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.innerText = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// CLOSE MODAL WHEN CLICKING OUTSIDE

document.getElementById("product-modal").addEventListener("click", function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// INITIALIZE WEBSITE

displayProducts(products);
updateCart();
