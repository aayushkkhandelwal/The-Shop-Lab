const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderContainer = document.getElementById("orderItems");
const totalPriceEl = document.getElementById("totalPrice");

let total = 0;


cart.forEach(item => {
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${item.image}">
    <p>${item.name}</p>
    <p>$${item.price} x ${item.quantity}</p>
  `;

  orderContainer.appendChild(div);

  total += item.price * item.quantity;
});

totalPriceEl.innerText = total.toFixed(2);
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("🎉 Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "indexamazon.html";
});

const paymentCards = document.querySelectorAll(".payment-card");
paymentCards.forEach(card => {
  card.addEventListener("click", () => {
    paymentCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    const input = card.querySelector("input");
    input.checked = true;
  });
});


