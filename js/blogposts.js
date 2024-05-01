const fetchArticles = async () => {
    const loader = document.querySelector('.loader');
    const blogPostsContainer = document.querySelector('.blogposts-container');
    
    try {
      loader.style.display = 'block';
    
      const response = await fetch('https://sandernilsen.com/wp-json/wp/v2/posts');
    
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
    
      const articles = await response.json();
    
      articles.forEach((article) => {
        const title = article.title.rendered;
        const content = article.excerpt.rendered; 
        const imageUrl = article.featured_media_src_url;
        const postId = article.id;
    
        const articleElement = document.createElement('article');
        articleElement.classList.add('article-preview');
    
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
    
        const wrapperElement = document.createElement('div');
        wrapperElement.classList.add('article-preview-wrapper');
    
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
    
        const contentElement = document.createElement('p');
        contentElement.innerHTML = content;
    
        const readMoreLink = document.createElement('a');
        readMoreLink.href = `post.html?id=${postId}`; 
        readMoreLink.textContent = 'Read More';
        readMoreLink.classList.add('readmore-button');
    
        wrapperElement.appendChild(titleElement);
        wrapperElement.appendChild(contentElement);
        wrapperElement.appendChild(readMoreLink);
    
        articleElement.appendChild(imgElement);
        articleElement.appendChild(wrapperElement);
    
        blogPostsContainer.appendChild(articleElement);
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      loader.style.display = 'none';
    }
  };
  
  document.addEventListener('DOMContentLoaded', fetchArticles);
  
  