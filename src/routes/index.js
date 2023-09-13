const usersController = require('../controllers/controller.users')
const postsController = require('../controllers/controller.posts')
const homeController = require('../controllers/controller.home')

const router = app => {
    app.use('/users', usersController)
    app.use('/posts', postsController)
    app.use('/', homeController)
}

module.exports = router