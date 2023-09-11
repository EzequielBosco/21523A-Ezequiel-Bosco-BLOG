const usersController = require('../controllers/controller.users')
const postController = require('../controllers/controller.posts')

const router = app => {
    app.use('/users', usersController)
    app.use('/posts', postController)
}

module.exports = router