const { Router } = require('express')
const PostSchema = require('../models/posts.model.js.js')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const posts = await PostSchema.findAll()
        res.render('posts', { posts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error to get posts"
        })
    }
})

router.get('/get', async (req, res) => {
    try {
        const posts = await PostSchema.findAll()
        res.json( posts )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error to get posts"
        })
    }
})

router.get('/create', async (req, res) => {
    try {
        res.render('form')
    } catch (error) {
        return res.status(500).json({
            msg: "Error to get form"
        })
    }
})

router.post('/create', async (req, res) => {
    const { titulo, detalle, url_imagen, fecha_publicacion } = req.body

    try {
        const newPost = { titulo, detalle, url_imagen, fecha_publicacion }
        await PostSchema.create(newPost)

        res.send({ msg: 'Post created successfully', newPost })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error creating post"
        })
    }
})

// router.post('/create', async (req, res) => {
//     const { titulo, detalle, url_imagen, fecha_publicacion } = req.body

//     try {
//         const newPost = { titulo, detalle, url_imagen, fecha_publicacion }
//         await PostSchema.create(newPost)

//         res.send({ msg: "Post created successful", newPost })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             msg: "Error creating post"
//         })
//     }
// })

router.get('/get', async (req, res) => {
    try {
        const posts = await PostSchema.findAll()
    
        res.send({ msg: "Posts:", posts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error to get posts"
        })
    }
})

module.exports = router