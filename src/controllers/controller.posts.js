const { Router } = require('express')
const { Op } = require('sequelize')
const PostSchema = require('../models/posts.model.js')
const router = Router()

router.get('/', async (req, res) => {
    try {

        const searchTerm = req.query.query
        let posts

        if (searchTerm) {
            // Si hay busqueda
            posts = await PostSchema.findAll({
                where: {
                    titulo: {
                        [Op.like]: `%${searchTerm}%`
                    }
                },
                limit: 1,
                order: [['createdAt', 'DESC']]
            })
        } else {
            // Normal
            posts = await PostSchema.findAll({
                limit: 2,
                order: [['createdAt', 'DESC']]
            })
        }

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
    const { autor, titulo, detalle, url_imagen, fecha_publicacion } = req.body

    try {
        const newPost = { autor, titulo, detalle, url_imagen, fecha_publicacion }
        await PostSchema.create(newPost)

        const redirectUrl = '/posts'
    
        res.status(200).json({ msg: "Post created successfully", newPost, redirect: redirectUrl })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error creating post"
        })
    }
})

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
        const { autor, titulo, detalle, url_imagen, fecha_publicacion } = req.body

        if(!autor && !titulo && !detalle && !url_imagen && !fecha_publicacion) {
            return res.status(404).json({ msg: "Debes ingresar por lo menos un campo para actualizar" })
        }

        const post = await PostSchema.findOne({ where: {id: id}})

        if (!post) {
            return res.status(404).json({ msg: "El post no fue encontrado" })
        }

        if (autor) {
            post.autor = autor
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

        const redirectUrl = '/posts'
    
        res.status(200).json({ msg: "Post updated successfully", redirect: redirectUrl })
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
    
        return res.json({ msg: "Post deleted successfully", redirect: '/posts' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Error to delete post"
        })
    }
})

router.get('/', (req, res) => {
    const searchTerm = req.query.query
    res.send(`Búsqueda realizada con el término: ${searchTerm}`)
})

module.exports = router