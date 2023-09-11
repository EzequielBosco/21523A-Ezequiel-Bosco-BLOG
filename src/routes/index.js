const usersController = require('../controllers/controller.users')

const router = app => {
    app.use('/users', usersController)
}

module.exports = router