document.addEventListener('DOMContentLoaded', function () {
  const articlesContainer = document.querySelector('.article-slider');
  const prevBtn = document.querySelector('.arrow.prev');
  const nextBtn = document.querySelector('.arrow.next');
  const loader = document.querySelector('.loader');

  let currentPosition = 0;

  function fetchData(url) {
      return fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok.');
              }
              return response.json();
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              throw error; 
          });
  }

  function createArticleElement(article) {
      const articleElement = document.createElement('article');
      const imgElement = document.createElement('img');
      const titleElement = document.createElement('h3');
      const paragraphElement = document.createElement('p');

      imgElement.classList.add('homearticleimg');
      imgElement.src = article._embedded['wp:featuredmedia'][0].source_url;
      titleElement.textContent = article.title.rendered;
      paragraphElement.innerHTML = article.excerpt.rendered;

      articleElement.classList.add('latest-article');
      articleElement.appendChild(imgElement);
      articleElement.appendChild(titleElement);
      articleElement.appendChild(paragraphElement);

      articleElement.addEventListener('click', function () {
          window.location.href = `post.html?id=${article.id}`;
      });

      return articleElement;
  }

  function decodeHtmlEntities(html) {
    const element = document.createElement('div');
    element.innerHTML = html;
    return element.textContent;
}

  function displayArticles(articles) {
      articles.forEach(article => {
          const articleElement = createArticleElement(article);
          articlesContainer.appendChild(articleElement);
      });
  }

  function moveSlider(direction) {
      const articleWidth = articlesContainer.querySelector('article').clientWidth;
      const maxPosition = articlesContainer.scrollWidth - articlesContainer.clientWidth;
      currentPosition = direction === 'next' ? currentPosition + articleWidth : currentPosition - articleWidth;
      currentPosition = Math.max(0, Math.min(maxPosition, currentPosition));
      articlesContainer.scrollTo({
          left: currentPosition,
          behavior: 'smooth'
      });
  }

  loader.style.display = 'block';

  fetchData('https://sandernilsen.com/wp-json/wp/v2/posts?per_page=5&_embed')
      .then(articles => {
          displayArticles(articles);
          loader.style.display = 'none';
      })
      .catch(error => {
          loader.style.display = 'none';
      });

  nextBtn.addEventListener('click', function () {
      moveSlider('next');
  });

  prevBtn.addEventListener('click', function () {
      moveSlider('prev');
  });
});
