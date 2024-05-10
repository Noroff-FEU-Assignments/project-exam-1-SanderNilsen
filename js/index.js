document.addEventListener('DOMContentLoaded', function () {
//Selecting elements from the DOM
  const articlesContainer = document.querySelector('.article-slider');
  const prevBtn = document.querySelector('.arrow.prev');
  const nextBtn = document.querySelector('.arrow.next');
  const loader = document.querySelector('.loader');

  let currentPosition = 0;

  //Function to create HTML elements
  function createArticleElement(article) {
    const articleElement = document.createElement('article');
    const imgElement = document.createElement('img');
    const titleElement = document.createElement('h3');
    const paragraphElement = document.createElement('p');

    imgElement.classList.add('homearticleimg');
    imgElement.src = article._embedded['wp:featuredmedia'][0].source_url;
    imgElement.alt = "Latest blog post image"
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

  //Slider
  function displayArticles(articles) {
      articles.forEach(article => {
        const articleElement = createArticleElement(article);
        articlesContainer.appendChild(articleElement);
      });
  }

  function moveSlider(direction) {
      const articleWidth = articlesContainer.querySelector('article').clientWidth;
      currentPosition = direction === 'next' ? currentPosition + articleWidth : currentPosition - articleWidth;
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

  async function fetchData(url) {
    try {
        const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return await response.json();
      } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
      }
  }

  nextBtn.addEventListener('click', function () {
    moveSlider('next');
  });

  prevBtn.addEventListener('click', function () {
    moveSlider('prev');
  });
});
