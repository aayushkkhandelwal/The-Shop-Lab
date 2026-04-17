// ===============================
// 🛒 CART DATA
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

// ===============================
// 🛒 DISPLAY CART
// ===============================
function displayCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 😢</p>";
    totalPriceEl.innerText = "₹0.00"; // ✅ fixed
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");

    cartItem.innerHTML = `
      <!-- IMAGE -->
      <img src="${item.image}" class="cart-img" alt="product" />

      <!-- INFO -->
      <div class="cart-info">
        <p class="cart-name">${item.name}</p>
        <p class="cart-price">₹${item.price}</p> <!-- ✅ fixed -->
      </div>

      <!-- QUANTITY -->
      <div class="cart-qty">
        Qty:
        <input type="number"
               value="${item.quantity}"
               min="1"
               onchange="updateQuantity(${index}, this.value)" />
      </div>

      <!-- ITEM TOTAL -->
      <div class="cart-total">
        ₹${(item.price * item.quantity).toFixed(2)} <!-- ✅ fixed -->
      </div>

      <!-- REMOVE BUTTON -->
      <button class="remove-btn" onclick="removeItem(${index})">
        🗑️
      </button>
    `;

    cartContainer.appendChild(cartItem);

    total += item.price * item.quantity;
  });

  totalPriceEl.innerText = `₹${total.toFixed(2)}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateStorage();
  displayCart();
}

function updateQuantity(index, qty) {
  const quantity = parseInt(qty);

  if (quantity < 1 || isNaN(quantity)) return;

  cart[index].quantity = quantity;
  updateStorage();
  displayCart();
}

function updateStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", function () {

  displayCart();

  const checkoutBtn = document.getElementById("checkoutBtn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      window.location.href = "checkout.html";
    });
  }
});