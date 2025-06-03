export function initCategories(onCategoryChange) {
  const categoryItems = document.querySelectorAll('.category');

  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      categoryItems.forEach(c => c.classList.remove('active'));
      item.classList.add('active');

      const selectedCategory = item.dataset.category;
      onCategoryChange(selectedCategory);
    });
  });
}