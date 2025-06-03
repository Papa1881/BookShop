import slide1 from '../assets/slider/slide1.png';
import slide2 from '../assets/slider/slide2.png';
import slide3 from '../assets/slider/slide3.png';

const slideImages = [slide1, slide2, slide3];

let currentIndex = 0;
let interval;

export function initSlider() {
  const sliderWrapper = document.querySelector('.slider__wrapper');

  // Создаём slides wrapper
  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  slideImages.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = `<img src="${src}" alt="Slide ${index + 1}" />`;
    slidesContainer.appendChild(slide);
  });

  // Добавляем в DOM
  sliderWrapper.prepend(slidesContainer);

  // Создаём точки
  const dotsContainer = document.querySelector('.slider__dots');
dotsContainer.classList.add('dots');

  slideImages.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  sliderWrapper.appendChild(dotsContainer);

  const dots = dotsContainer.querySelectorAll('.dot');

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slideImages.length;
    showSlide(nextIndex);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(+dot.dataset.index);
      restartInterval();
    });
  });

  function restartInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }

  showSlide(currentIndex);
  interval = setInterval(nextSlide, 5000);
}