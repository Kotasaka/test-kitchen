// MOGFUL: hero slideshow + automatic photo placeholders
window.addEventListener('DOMContentLoaded', () => {
  // Keep original hero slideshow. Skip animation when users prefer less motion.
  const slides = [...document.querySelectorAll('.hero-slider .slide')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (slides.length > 1 && !reducedMotion) {
    let current = 0;
    window.setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4800);
  }

  // Until you upload each JPG, the matching card displays a styled placeholder.
  // Once the image is available it automatically replaces that placeholder.
  document.querySelectorAll('.product-photo img').forEach((img) => {
    const frame = img.closest('.product-photo');
    const markLoaded = () => frame.classList.add('has-image');
    const markMissing = () => frame.classList.remove('has-image');
    img.addEventListener('load', markLoaded);
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth > 0) markLoaded();
  });
});
