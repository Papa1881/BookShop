const API_KEY = 'AIzaSyApZww8PjxV-LxkyvNtwIdFVufQjRJTtI4';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function fetchBooks(category, startIndex = 0, maxResults = 6) {
  const url = `${BASE_URL}?q=subject:${category}&key=${API_KEY}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error('Ошибка загрузки книг:', err);
    return [];
  }
}