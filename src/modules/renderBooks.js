import { toggleCartItem, isInCart, updateCartBadge } from './cart.js';

export function renderBooks(books, append = false) {
  const booksContainer = document.querySelector('.books');
  if (!append) booksContainer.innerHTML = '';

  books.forEach(book => {
    const id = book.id;
    const {
      title,
      authors,
      description,
      imageLinks,
      averageRating,
      ratingsCount,
    } = book.volumeInfo;

    const img = imageLinks?.thumbnail || './assets/placeholder.jpg';
    const authorText = authors ? authors.join(', ') : 'Unknown Author';
    const shortDesc = description ? truncate(description, 200) : 'No description';
    const rating = averageRating
      ? `<div class="book__rating">★ ${averageRating} (${ratingsCount || 0})</div>`
      : '';

    const inCart = isInCart(id);
    const buttonText = inCart ? 'Remove from cart' : 'Buy now';
    const buttonClass = inCart ? 'active' : '';

    const html = `
      <div class="book">
        <img src="${img}" alt="${title}" class="book__image"/>
        <h3 class="book__title">${title}</h3>
        <p class="book__author">${authorText}</p>
        ${rating}
        <p class="book__description">${shortDesc}</p>
        <button class="book__buy ${buttonClass}" data-id="${id}">${buttonText}</button>
      </div>
    `;

    booksContainer.insertAdjacentHTML('beforeend', html);
  });

  document.querySelectorAll('.book__buy').forEach(button => {
    button.addEventListener('click', () => {
      const bookId = button.dataset.id;
      toggleCartItem(bookId);
      updateCartBadge();
      const inCart = isInCart(bookId);
      button.textContent = inCart ? 'Remove from cart' : 'Buy now';
      button.classList.toggle('active', inCart);
    });
  });

  const loadMoreBtn = document.querySelector('.load-more');
  if (books.length < 6) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }

  updateCartBadge();
}

function truncate(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}