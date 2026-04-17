// ===============================
// 🛒 CART DATA
// ===============================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
document.addEventListener("DOMContentLoaded", function () {

  const username = localStorage.getItem("username");
  const greeting = document.getElementById("userGreeting");

  console.log("Username:", username); // DEBUG

  if (username && greeting) {
    greeting.textContent = `Hello, ${username}`;
  }

});

// ===============================
// ➕ ADD TO CART
// ===============================
function addToCart(productName, price, imageSrc) {
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: parseFloat(price.replace('₹', '').trim()),
      image: imageSrc,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();

  alert(`${productName} added to cart!`);
}

// ===============================
// 🛒 UPDATE CART COUNT
// ===============================
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartElement = document.querySelector('.nav-cart p:last-child');

  if (cartElement) {
    cartElement.textContent = `Cart (${cartCount})`;
  }
}

// ===============================
// ❤️ LIKE BUTTON
// ===============================
function toggleLike(button) {
  button.classList.toggle('liked');
}

// ===============================
// 🚀 INIT
// ===============================
document.addEventListener('DOMContentLoaded', function() {

  updateCartCount();

  // ===============================
  // ➕ ADD TO CART BUTTONS
  // ===============================
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {

      const box = button.closest('.box');

      const productName = box.querySelector('h2').textContent;
      const price = box.querySelector('.price').textContent;

      // ✅ FIXED IMAGE (IMPORTANT)
      const imageSrc = box.querySelector('img').src;

      addToCart(productName, price, imageSrc);
    });
  });

 
  // ❤️ LIKE BUTTONS

  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      toggleLike(button);
    });
  });


  // 🔍 SEARCH

  const searchInput = document.querySelector('.nav-search input');
  const searchSelect = document.querySelector('.search-select');

  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = searchInput.value;
        const category = searchSelect.value;

        alert(`Searching for "${query}" in ${category}`);
      }
    });
  }


  // 📩 NEWSLETTER
 
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = newsletterForm.querySelector('input').value;

      alert(`Thank you for subscribing with ${email}!`);
      newsletterForm.reset();
    });
  }

  // ===============================
  // 🚪 LOGOUT (FIXED POSITION)
  // ===============================
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("cart");

      window.location.href = "lgp.html";
    });
  }

});



const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let counter = 0;
let autoSlideInterval;

/* Set positions + background blur */
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;

    const img = slide.querySelector("img");
    slide.style.backgroundImage = `url(${img.src})`;
});

/* Update dots */
const updateDots = () => {
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === counter);
    });
};

/* Slide animation */
const slideImage = () => {
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
};

/* Next */
const goNext = () => {
    counter = (counter + 1) % slides.length;
    slideImage();
    updateDots();
};

/* Prev */
const goPrev = () => {
    counter = (counter - 1 + slides.length) % slides.length;
    slideImage();
    updateDots();
};

/* Go to slide */
const goToSlide = (index) => {
    counter = index;
    slideImage();
    updateDots();
};

/* Auto slide */
const startAutoSlide = () => {
    autoSlideInterval = setInterval(goNext, 3000);
};

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

/* Init */
updateDots();
startAutoSlide();

/* Pause on hover */
const slider = document.querySelector("main");
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

/* Keyboard */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
});

/* Swipe */
let startX = 0;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) goNext();
    else if (endX - startX > 50) goPrev();
});


document.addEventListener("DOMContentLoaded", function () {

  const username = localStorage.getItem("username");
  const greeting = document.getElementById("userGreeting");

  console.log("Username:", username); // DEBUG

  if (username && greeting) {
    greeting.textContent = `Hello, ${username}`;
  }

});