const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

function createOrUpdatePost() {
    const postId = document.getElementById('postId').value;
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    if (postId) {
        updatePost(postId, title, body);
    } else {
        createPost(title, body);
    }
}

function createPost(title, body) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body, userId: 1 })
    })
    .then(response => response.json())
    .then(data => {
        alert('Post created successfully!');
        clearForm();
        readPosts();
    });
}

function updatePost(id, title, body) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body, userId: 1 })
    })
    .then(response => response.json())
    .then(data => {
        alert('Post updated successfully!');
        clearForm();
        readPosts();
    });
}

function readPosts() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';
        data.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button onclick="editPost(${post.id}, '${post.title}', '${post.body}')">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
            `;
            postsContainer.appendChild(postDiv);
        });
    });
}

function editPost(id, title, body) {
    document.getElementById('postId').value = id;
    document.getElementById('title').value = title;
    document.getElementById('body').value = body;
}

function deletePost(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        alert('Post deleted successfully!');
        readPosts();
    });
}

function clearForm() {
    document.getElementById('postId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
}

