const CART_KEY = 'bookshop-cart';

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function toggleCartItem(bookId) {
  const cart = getCart();
  const index = cart.indexOf(bookId);
  if (index === -1) {
    cart.push(bookId);
  } else {
    cart.splice(index, 1);
  }
  saveCart(cart);
  return cart.length;
}

export function isInCart(bookId) {
  const cart = getCart();
  return cart.includes(bookId);
}

export function updateCartBadge() {
  const count = getCart().length;
  const badge = document.querySelector('.cart__badge');
  if (!badge) return;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'inline-block';
  } else {
    badge.textContent = '';
    badge.style.display = 'none';
  }
}