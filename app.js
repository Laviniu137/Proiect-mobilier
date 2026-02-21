const products = [
  { id: 1, name: 'Scaun Nordic', price: 249 },
  { id: 2, name: 'Masă dining stejar', price: 899 },
  { id: 3, name: 'Canapea compactă', price: 1399 },
  { id: 4, name: 'Comodă modernă', price: 699 }
];

const cart = [];

const productsEl = document.getElementById('products');
const cartItemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
const clearBtn = document.getElementById('clear-cart');

function renderProducts() {
  productsEl.innerHTML = products
    .map(
      (product) => `
      <article class="card">
        <h3>${product.name}</h3>
        <p><strong>${product.price}</strong> RON</p>
        <button data-id="${product.id}">Adaugă în coș</button>
      </article>
    `
    )
    .join('');
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<li>Coșul este gol.</li>';
    totalEl.textContent = '0';
    return;
  }

  cartItemsEl.innerHTML = cart
    .map((item) => `<li>${item.name} - ${item.price} RON</li>`)
    .join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalEl.textContent = String(total);
}

productsEl.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;

  const id = Number(button.dataset.id);
  const product = products.find((item) => item.id === id);
  if (!product) return;

  cart.push(product);
  renderCart();
});

clearBtn.addEventListener('click', () => {
  cart.length = 0;
  renderCart();
});

renderProducts();
renderCart();
