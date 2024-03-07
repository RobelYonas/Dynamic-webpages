const fetchPost = async () => {
    try {
        const postResponse = await fetch(`https://dummyjson.com/posts`);
        const postData = await postResponse.json();

        // Iterate over each post
        for (const post of postData.posts) {
            const userSection = await userPost(post.userId); // Fetch user details for the post

            const postCard = document.createElement('div');
            postCard.className = 'postCard';

            // Assuming userSection contains user's first and last name
            const username = document.createElement('div');
            username.className = 'username';
            username.appendChild(userSection); // Append user details to username div

            const userTitle = document.createElement('div');
            userTitle.className = 'userTitle';
            userTitle.innerHTML = `<p>${post.title}</p>`;

            const userBody = document.createElement('div');
            userBody.className = 'userBody';
            userBody.innerHTML = `<p>${post.body}</p>`;

            const userTag = document.createElement('div');
            userTag.className = 'userTag';
            userTag.innerHTML = `<p>${post.tags.join(', ')}</p>`; // Assuming tags is an array

            const userReaction = document.createElement('div');
            userReaction.className = 'userReaction';
            userReaction.innerHTML = `<p>${post.reactions}</p>`; // Assuming reactions is a field in your post

            const commentSection = await fetchComment(post.id); // Fetch comments for the post

            // Append elements to postCard
            postCard.appendChild(username);
            postCard.appendChild(userTitle);
            postCard.appendChild(userBody);
            postCard.appendChild(userTag);
            postCard.appendChild(userReaction);
            postCard.appendChild(commentSection);

            // Append postCard to the 'user-post' container in your HTML
            const postsContainer = document.getElementById('user-post');
            postsContainer.appendChild(postCard);
        }
    } catch (error) {
        console.error(error);
    }
};

const userPost = async (userId) => {
    try {
        const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);
        const userData = await userResponse.json();

        // Create a div to display user's username and store additional details in data attributes
        const userDiv = document.createElement('div');
        userDiv.className = 'username';
        userDiv.textContent = userData.username; // Display username
        // Storing user details in data attributes
        userDiv.dataset.firstName = userData.firstName;
        userDiv.dataset.lastName = userData.lastName;
        userDiv.dataset.email = userData.email;
        userDiv.dataset.phone = userData.phone;

        // Event listeners to show and hide tooltip on hover
        userDiv.addEventListener('mouseenter', showUserDetailsTooltip);
        userDiv.addEventListener('mouseleave', hideUserDetailsTooltip);

        return userDiv;
    } catch (error) {
        console.error(error);
        return document.createElement('div'); // Return an empty div in case of error
    }
};

// Function to create and show the tooltip with user details
const showUserDetailsTooltip = (event) => {
    const userDiv = event.currentTarget;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = `
        <p>First Name: ${userDiv.dataset.firstName}</p>
        <p>Last Name: ${userDiv.dataset.lastName}</p>
        <p>Email: ${userDiv.dataset.email}</p>
        <p>Phone: ${userDiv.dataset.phone}</p>
    `;
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    document.body.appendChild(tooltip);
};

// Function to hide the tooltip
const hideUserDetailsTooltip = () => {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
};


const fetchComment = async (postId) => {
    const commentSection = document.createElement('div');
    commentSection.className = 'commentSection';

    try {
        const commentResponse = await fetch(`https://dummyjson.com/comments/post/${postId}`);
        const commentData = await commentResponse.json();

        commentData.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<p>${comment.user.username}: ${comment.body}</p>`; // Assuming each comment has a user with a username
            commentSection.appendChild(commentDiv);
        });
    } catch (error) {
        console.error(error);
    }

    return commentSection;
};



fetchPost();
