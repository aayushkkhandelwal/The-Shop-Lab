let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.style.display = 'flex';
    itemDiv.style.alignItems = 'center';
    itemDiv.style.marginBottom = '15px';
    itemDiv.style.borderBottom = '1px solid #ddd';
    itemDiv.style.paddingBottom = '15px';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.style.width = '80px';
    img.style.height = '80px';
    img.style.objectFit = 'cover';
    img.style.marginRight = '15px';

    const nameDiv = document.createElement('div');
    nameDiv.textContent = item.name;
    nameDiv.style.flex = '1';
    nameDiv.style.fontWeight = '600';

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = item.quantity;
    quantityInput.style.width = '50px';
    quantityInput.style.padding = '5px';
    quantityInput.style.marginLeft = '10px';
    quantityInput.addEventListener('change', (e) => {
      const newQty = parseInt(e.target.value);
      if (newQty > 0) {
        item.quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      }
    });

    const priceDiv = document.createElement('div');
    priceDiv.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    priceDiv.style.width = '80px';
    priceDiv.style.textAlign = 'right';
    priceDiv.style.marginLeft = '15px';
    priceDiv.style.fontWeight = '700';
    priceDiv.style.color = '#b12704';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.backgroundColor = '#dc3545';
    removeBtn.style.color = 'white';
    removeBtn.style.border = 'none';
    removeBtn.style.padding = '5px 10px';
    removeBtn.style.borderRadius = '4px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.marginLeft = '10px';
    removeBtn.addEventListener('click', () => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });

    itemDiv.appendChild(img);
    itemDiv.appendChild(nameDiv);
    itemDiv.appendChild(quantityInput);
    itemDiv.appendChild(priceDiv);
    itemDiv.appendChild(removeBtn);

    cartItemsContainer.appendChild(itemDiv);
  });

  document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartElement = document.querySelector('.nav-cart p:last-child');
  if (cartElement) {
    cartElement.textContent = `Cart (${cartCount})`;
  }
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
  alert('Proceeding to checkout...');
});

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartCount();
});
