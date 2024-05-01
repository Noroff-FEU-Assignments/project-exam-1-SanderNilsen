document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        const postContainer = document.querySelector('.post-container');
        const loader = document.querySelector('.loader'); 

        loader.style.display = 'block';

        async function fetchFeaturedImageUrl(mediaId) {
            try {
                const response = await fetch(`https://sandernilsen.com/wp-json/wp/v2/media/${mediaId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch media');
                }
                const mediaData = await response.json();
                return mediaData.source_url;
            } catch (error) {
                console.error('Error fetching media:', error);
                return null;
            }
        }

        fetch(`https://sandernilsen.com/wp-json/wp/v2/posts/${postId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                return response.json();
            })
            .then(async (post) => {
                const featuredImageUrl = await fetchFeaturedImageUrl(post.featured_media);

                loader.style.display = 'none';

                postContainer.innerHTML = `
                    <h1 class="lp-color">${post.title.rendered}</h1>
                    <p class="author">Posted on ${new Date(post.date).toLocaleDateString()} by ${post.author}</p>
                    <img class="post-img" src="${featuredImageUrl}" />
                    <div class="post-wrapper">
                        <p class="lp-color">${post.content.rendered}</p>
                    </div>
                `;
            })
            .catch((error) => {
                loader.style.display = 'none';
                console.error('Error fetching post:', error);
            });
    }
});

