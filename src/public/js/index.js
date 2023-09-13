const showData = (a, b) => {
    let register = ""
    a.forEach(post => {
        register += `
        <div class="card-img-top d-flex border border-2 m-2">
            <img class="card-img-top" src="${post.url_imagen}" alt="Imagen blog">
            <div class="card-body px-3 m-2">
                <h3>${post.titulo}</h3>
                <p class="card-text">${post.detalle}</p>
                <p>${post.fecha_publicacion}</p>
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
    showData(posts, divPosts)
}
const btnGet = document.getElementById('btn-get')
btnGet.addEventListener('click', getPosts)


const btnCreate = document.getElementById('btn-create')
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

const btnUpdate = document.getElementById('btn-update')
const updatePosts = () => {
    fetch()
}

const btnDelete = document.getElementById('btn-delete')
const deletePosts = () => {
    fetch()
}