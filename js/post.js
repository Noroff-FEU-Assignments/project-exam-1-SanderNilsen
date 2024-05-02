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
        
        // Modal
        function createModal(imageUrl) {
            const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            const closeModalBtn = document.createElement('span');
            closeModalBtn.className = 'close-modal';
            closeModalBtn.innerHTML = '&times;';

            const modalImage = document.createElement('img');
            modalImage.src = imageUrl;
            modalImage.className = 'modal-image';
            modalImage.alt = 'Modal Image';

            modalContent.appendChild(closeModalBtn);
            modalContent.appendChild(modalImage);
            modalContainer.appendChild(modalContent);
            postContainer.appendChild(modalContainer); 

            // Show modal
            modalContainer.style.display = 'block';

            // Close when clicking button
            closeModalBtn.addEventListener('click', () => {
                    modalContainer.remove();
            });
            
            // Close when clicking outside of modal
            modalContainer.addEventListener('click', () => {
                    modalContainer.remove();
                
            });
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
                document.title = post.title.rendered;

                postContainer.innerHTML = `
                    <h1 class="lp-color">${post.title.rendered}</h1>
                    <p class="author">Posted on ${new Date(post.date).toLocaleDateString()} by ${post.author}</p>
                    <img class="post-img" src="${featuredImageUrl}" alt="Featured Image" />
                    <div class="post-wrapper">
                        <p class="lp-color">${post.content.rendered}</p>
                    </div>
                `;

                postContainer.addEventListener('click', (event) => {
                    const clickedImg = event.target.closest('.post-img');
                    if (clickedImg) {
                        const imageUrl = clickedImg.src;
                        createModal(imageUrl);
                    }
                });
            })
            .catch((error) => {
                loader.style.display = 'none';
                console.error('Error fetching post:', error);
            });
    }
})
