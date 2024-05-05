document.addEventListener('DOMContentLoaded', function () {
  const loader = document.querySelector('.loader');
  const blogPostsContainer = document.querySelector('.blogposts-container');
  const viewMoreButton = document.querySelector('.viewmore-button');
  const searchInput = document.getElementById('searchInput');

  let displayedCount = 0;
  const postsPerPage = 10;
  let currentSearchTerm = ''; 

  function fetchData(url, page, perPage, searchTerm = '') {
    const apiUrl = `${url}?per_page=${perPage}&page=${page}&search=${searchTerm}`;
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

  function appendArticles(articles) {
    articles.forEach(article => {
      const articleElement = createArticleElement(article);
      blogPostsContainer.appendChild(articleElement); 
      displayedCount++; 
    });

    if (articles.length < postsPerPage) {
      viewMoreButton.style.display = 'none'; 
    }

    loader.style.display = 'none'; 
  }

  function loadArticlesBySearch(searchTerm) {
    loader.style.display = 'block';
    currentSearchTerm = searchTerm; 
    const nextPage = Math.ceil(displayedCount / postsPerPage) + 1; 

    fetchData('https://sandernilsen.com/wp-json/wp/v2/posts', nextPage, postsPerPage, searchTerm)
      .then(articles => {
        appendArticles(articles);
      })
      .catch(error => {
        console.error('Error loading articles by search:', error);
      });
  }


  loadArticlesBySearch('');


  searchInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value.trim();
    displayedCount = 0; 
    blogPostsContainer.innerHTML = ''; 
    loadArticlesBySearch(searchTerm);
  });


  viewMoreButton.addEventListener('click', function () {
    loadArticlesBySearch(currentSearchTerm); 
  });
});
