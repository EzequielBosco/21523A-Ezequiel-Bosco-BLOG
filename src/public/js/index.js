const btnCreate = document.getElementById('btn-create')
const btnUpdate = document.getElementById('btn-update')
const btnDelete = document.getElementById('btn-delete')

btnCreate.addEventListener('click', createPosts)

const createPosts = () => {
    fetch('/posts/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: document.getElementById('titulo').value,
            detalle: document.getElementById('detalle').value,
            url_imagen: document.getElementById('url_imagen').value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.msg === 'Post created successfully') {
                console.log('Redirection is being executed')
                window.location.href = '/posts'
            } else {
                console.log("Error to create a post")
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

const getPosts = async () => {
    const response = await fetch('/get')
    const posts = await response.json()
    return posts
}

const updatePosts = () => {
    fetch()
}

const deletePosts = () => {
    fetch()
}