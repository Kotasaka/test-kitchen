// 自動スライドショーの制御（メニューはHTML/CSSのみで表示するため、JSの追加は不要です）
window.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length === 0) return;

  let currentSlide = 0;
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  setInterval(nextSlide, 4000);
});
