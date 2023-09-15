const { Router } = require('express')
const PostSchema = require('../models/posts.model.js')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const posts = await PostSchema.findAll({
            limit: 3,
            order: [['createdAt', 'DESC']]
        })
        res.render('posts', { posts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error to get posts"
        })
    }
})

router.get('/detail/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await PostSchema.findOne({ where: {id: id}})
        res.render('detail', { post })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error to get posts"
        })
    }
})

// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const post = await PostSchema.findOne({ where: {id: id}})
         
//         res.render('posts', { post })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             msg: "Error to get posts"
//         })
//     }
// })

// get
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
        res.render('form-create')
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

// router.get('/get', async (req, res) => {
//     try {
//         const posts = await PostSchema.findAll()
    
//         res.send({ msg: "Posts:", posts })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             msg: "Error to get posts"
//         })
//     }
// })

router.get('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await PostSchema.findOne({ where: {id: id}})

        if (!post) {
            return res.status(404).json({ msg: "El post no fue encontrado" });
        }

        res.render('form-update', { post })
    } catch (error) {
        return res.status(500).json({
            msg: "Error to get form"
        })
    }
})

router.post('/update/:id', async (req, res) => {
    const { id } = req.params

    try {
        const { titulo, detalle, url_imagen, fecha_publicacion } = req.body

        if(!titulo && !detalle && !url_imagen && !fecha_publicacion) {
            res.send("Debes ingresar por lo menos un campo para actualizar")
        }

        const post = await PostSchema.findOne({ where: {id: id}})

        if (!post) {
            return res.status(404).json({ msg: "El post no fue encontrado" })
        }

        if (titulo) {
            post.titulo = titulo
        }
        if (detalle) {
            post.detalle = detalle
        }
        if (url_imagen) {
            post.url_imagen = url_imagen
        }
        if (fecha_publicacion) {
            post.fecha_publicacion = fecha_publicacion
        }

        await post.save()
    
        res.json({ msg: "Post updated successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error to update post"
        })
    }
})

router.delete('/detail/:id', async (req, res) => {
    const { id } = req.params

    try {
        
        await PostSchema.destroy({
            where: {
                id
            }
        })
    
        return res.json({ msg: "Post deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error to delete post"
        })
    }
})

module.exports = router