document.addEventListener('DOMContentLoaded', function () {
  const loader = document.querySelector('.loader');
  const blogPostsContainer = document.querySelector('.blogposts-container');
  const viewMoreButton = document.querySelector('.viewmore-button');

  let displayedCount = 0;
  const postsPerPage = 10;

  function fetchData(url, page, perPage) {
    const apiUrl = `${url}?per_page=${perPage}&page=${page}`;
    return fetch(apiUrl)
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

  function displayArticles(articles) {
    articles.forEach(article => {
      const articleElement = createArticleElement(article);
      blogPostsContainer.appendChild(articleElement);
    });

    loader.style.display = 'none';
  }

  function loadMoreArticles() {
    loader.style.display = 'block';
    const nextPage = Math.floor(displayedCount / postsPerPage) + 1;

    fetchData('https://sandernilsen.com/wp-json/wp/v2/posts', nextPage, postsPerPage)
      .then(articles => {
        displayArticles(articles);
        displayedCount += articles.length;

        if (articles.length < postsPerPage) {
          viewMoreButton.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error loading more articles:', error);
      });
  }

  loadMoreArticles();

  viewMoreButton.addEventListener('click', loadMoreArticles);
});
