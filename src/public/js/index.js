const showData = (a, b) => {
    let register = ""
    a.forEach(post => {
        register += `
        <div class="col mt-2 d-flex justify-content-center">
            <div class="card-box card-box-2 card-img-top d-flex border border-2 m-2 mb-3">
                <img class="card-img-top" src="${post.url_imagen}" alt="Imagen blog">
                <div class="card-body px-3 m-2 pb-1 pt-1 d-flex flex-column justify-content-between">
                    <h3>${post.titulo}</h3>
                    <p>Autor: <strong>${post.autor}</strong></p>
                    <p>Fecha: ${post.fecha_publicacion}</p>
                    <a href="posts/detail/${post.id}" class="btn btn-red">Ver más</a>
                </div>
            </div>
        </div>
        `
    })

    b.innerHTML = register
}

const getPosts = async () => {
    const response = await fetch('/posts/get')
    const posts = await response.json()
    const divPosts = document.querySelector('#div-posts')

    divPosts.innerHTML = ''
    showData(posts, divPosts)
}
const btnGet = document.getElementById('btn-get')
btnGet.addEventListener('click', getPosts)


const btnCreate = document.getElementById('btn-create')
btnCreate.addEventListener('click', createPost)

const createPost = async () => {
    fetch('/posts/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            autor: document.getElementById('autor').value,
            titulo: document.getElementById('titulo').value,
            detalle: document.getElementById('detalle').value,
            url_imagen: document.getElementById('url_imagen').value,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        if (data.message === "Post created successfully" && data.redirect) {
            window.location.href = data.redirect
        }
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

const btnUpdate = document.getElementById('btn-update')
btnUpdate.addEventListener('click', updatePost)

const updatePost = async () => {
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
        console.log(data)
        if (data.message === "Post updated successfully" && data.redirect) {
            window.location.href = data.redirect
        }
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

const btnDelete = document.getElementById("btn-delete")
btnDelete.addEventListener('click', deletePost)

function deletePost() {
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
        console.log(data)
        if (data.message === 'Deleted successfully' && data.redirect) {
            window.location.href = data.redirect
        }
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}
