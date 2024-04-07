//Slider
document.addEventListener('DOMContentLoaded', function () {
    const articles = document.querySelector('.article-slider');
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');
    let currentPosition = 0;

    function moveSlider(direction) {
      const articleWidth = articles.querySelector('article').clientWidth;
      const maxPosition = articles.scrollWidth - articles.clientWidth;
      const newPosition = direction === 'next' ? currentPosition + articleWidth : currentPosition - articleWidth;
      currentPosition = Math.max(0, Math.min(maxPosition, newPosition));
      articles.scrollTo({
        left: currentPosition,
        behavior: 'smooth'
      });
    }

    nextBtn.addEventListener('click', () => moveSlider('next'));
    prevBtn.addEventListener('click', () => moveSlider('prev'));
  });