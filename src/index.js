import { initCategories } from './modules/categories.js';
import { fetchBooks } from './modules/api.js';
import { renderBooks } from './modules/renderBooks.js';
import { updateCartBadge } from './modules/cart.js';
import './styles/main.scss';

let currentCategory = 'Fiction';
let startIndex = 0;
const maxResults = 6;

async function loadBooks(category = currentCategory, append = false) {
  const books = await fetchBooks(category, startIndex, maxResults);
  renderBooks(books, append);
}

initCategories(category => {
  currentCategory = category;
  startIndex = 0;
  loadBooks(category, false);
});

document.querySelector('.load-more').addEventListener('click', () => {
  startIndex += maxResults;
  loadBooks(currentCategory, true);
});

updateCartBadge();
loadBooks(currentCategory);

import { initSlider } from './modules/slider.js';
initSlider();

import userIcon from './assets/icons/user.svg';
import searchIcon from './assets/icons/search.svg';
import cartIcon from './assets/icons/cart.svg';

document.querySelector('.icon--user').innerHTML = `<img src="${userIcon}" alt="Login">`;
document.querySelector('.icon--search').innerHTML = `<img src="${searchIcon}" alt="Search">`;
document.querySelector('.icon--cart').innerHTML = `<img src="${cartIcon}" alt="Cart">`;