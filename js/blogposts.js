document.addEventListener('DOMContentLoaded', function () {
  //Selecting elements from the DOM
  const loader = document.querySelector('.loader');
  const blogPostsContainer = document.querySelector('.blogposts-container');
  const viewMoreButton = document.querySelector('.viewmore-button');
  const searchInput = document.getElementById('searchInput');

  let displayedCount = 0;
  const postsPerPage = 10;
  let currentSearchTerm = ''; 

  //Function to fetch data, posts per page, and search term
  async function fetchData(url, page, perPage, searchTerm = '') {
    const apiUrl = `${url}?per_page=${perPage}&page=${page}&search=${searchTerm}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  //Function to create HTML elements
  function createArticleElement(article) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('article-preview');

    const imgElement = document.createElement('img');
    imgElement.classList.add('previewimg');
    imgElement.src = article.featured_media_src_url;
    imgElement.alt = "Blog post image"

    const wrapperElement = document.createElement('div');
    wrapperElement.classList.add('article-preview-wrapper');

    const titleElement = document.createElement('h2');
    titleElement.textContent = article.title.rendered;

    const contentElement = document.createElement('p');
    contentElement.innerHTML = article.excerpt.rendered;

    const readMoreLink = document.createElement('a');
    readMoreLink.href = `post.html?id=${article.id}`;
    readMoreLink.textContent = 'Read More';
    readMoreLink.classList.add('readmore-button');

    //Link to post-page when the wrapper is clicked
    wrapperElement.addEventListener('click', function () {
      window.location.href = `post.html?id=${article.id}`;
  })
    //Article structure
    wrapperElement.appendChild(titleElement);
    wrapperElement.appendChild(contentElement);
    wrapperElement.appendChild(readMoreLink);

    articleElement.appendChild(imgElement);
    articleElement.appendChild(wrapperElement);

    return articleElement;
  }
  //Append fetched articles to the blog container
  function appendArticles(articles) {
    articles.forEach(article => {
      const articleElement = createArticleElement(article);
      blogPostsContainer.appendChild(articleElement); 
      displayedCount++; 
    });

    //Hide the 'View More' button if fetched articles are less than the perPage count
    if (articles.length < postsPerPage) {
      viewMoreButton.style.display = 'none'; 
    }

    loader.style.display = 'none'; 
  }

  //Load articles based on search
  function loadArticlesBySearch(searchTerm) {
    loader.style.display = 'block';
    currentSearchTerm = searchTerm; 
    const nextPage = (displayedCount / postsPerPage) + 1; 

    fetchData('https://sandernilsen.com/wp-json/wp/v2/posts', nextPage, postsPerPage, searchTerm)
    .then(articles => {
      if (articles.length > 0) {
        appendArticles(articles);

      } else {
        const message = document.createElement('p');
        message.textContent = 'No posts found for this search.';
        blogPostsContainer.appendChild(message);
      }
    })
    .catch(error => {
      console.error('Error fetching articles:', error);
    })
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
