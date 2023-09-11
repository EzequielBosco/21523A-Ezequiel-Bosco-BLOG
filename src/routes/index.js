const usersController = require('../controller/users')

const router = app => {
    app.use('/users', usersController)
}

module.exports = router