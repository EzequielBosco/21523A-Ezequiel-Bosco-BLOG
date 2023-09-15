const showData = (a, b) => {
    let register = ""
    a.forEach(post => {
        register += `
        <div class="card-img-top rounded d-flex border border-2 m-2 mb-3">
            <img class="card-img-top" src="${post.url_imagen}" alt="Imagen blog">
            <div class="card-body px-3 m-2">
                <h3>${post.titulo}</h3>
                <p class="card-text">${post.detalle}</p>
                <p>${post.fecha_publicacion}</p>
            </div>
            <a href="posts/update/${post.id}" class="btn-update">Modificar publicación</a>
            <a href="posts/detail/${post.id}" class="btn">Ver más</a>
        </div>
        `
    })

    b.innerHTML = register
}

const getPosts = async () => {
    const response = await fetch('/posts/get')
    const posts = await response.json()
    const divPosts = document.querySelector('#div-posts')
    showData(posts, divPosts)
}
const btnGet = document.getElementById('btn-get')
btnGet.addEventListener('click', getPosts)


const btnCreate = document.getElementById('btn-create')
btnCreate.addEventListener('click', createPost)

const createPost = () => {
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

const btnUpdate = document.getElementById('btn-update')
btnUpdate.addEventListener('click', updatePost)

const updatePost = () => {
    const url = window.location.pathname
    const parts = url.split('/')
    const postId = parts[parts.length - 1]

    const updatedData = {
        titulo: document.getElementById('titulo').value,
        detalle: document.getElementById('detalle').value,
        url_imagen: document.getElementById('url_imagen').value,
    }

    fetch(`/posts/update/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.msg === 'Post updated successfully') {
            console.log('Redirection is being executed')
            window.location.href = '/posts'
        } else {
            console.log('Error updating the post')
        }
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}


const btnDelete = document.getElementById("btn-delete")
btnDelete.addEventListener('click', deletePost)

const deletePost = () => {
    console.log("hola")
    const url = window.location.pathname
    const parts = url.split('/')
    const postId = parts[parts.length - 1]
    const deleteUrl = `/posts/detail/${postId}`

    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.msg === 'Post deleted successfully') {
            console.log('Redirection is being executed')
            window.location.href = '/posts'
        } else {
            console.log('Error to delete the post')
        }
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}
