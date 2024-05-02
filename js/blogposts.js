document.addEventListener('DOMContentLoaded', function () {
  const loader = document.querySelector('.loader');
  const blogPostsContainer = document.querySelector('.blogposts-container');

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
      articleElement.classList.add('article-preview');

      const imgElement = document.createElement('img');
      imgElement.classList.add('previewimg');
      imgElement.src = article.featured_media_src_url;

      const wrapperElement = document.createElement('div');
      wrapperElement.classList.add('article-preview-wrapper');

      const titleElement = document.createElement('h3');
      titleElement.textContent = article.title.rendered;

      const contentElement = document.createElement('p');
      contentElement.innerHTML = article.excerpt.rendered;

      const readMoreLink = document.createElement('a');
      readMoreLink.href = `post.html?id=${article.id}`;
      readMoreLink.textContent = 'Read More';
      readMoreLink.classList.add('readmore-button');

      wrapperElement.appendChild(titleElement);
      wrapperElement.appendChild(contentElement);
      wrapperElement.appendChild(readMoreLink);

      articleElement.appendChild(imgElement);
      articleElement.appendChild(wrapperElement);

      return articleElement;
  }

  loader.style.display = 'block';

  fetchData('https://sandernilsen.com/wp-json/wp/v2/posts')
      .then(articles => {
          articles.forEach(article => {
              const articleElement = createArticleElement(article);
              blogPostsContainer.appendChild(articleElement);
          });
          loader.style.display = 'none';
      })
      .catch(error => {
          loader.style.display = 'none';
      });
});
