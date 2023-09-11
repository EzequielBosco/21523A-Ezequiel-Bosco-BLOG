const { Router } = require('express')
const router = Router()

const users = [
    {
        username: "ezequiel",
        name: "eze",
        lastname: "bos"
    }
]

router.get('/', (req, res) => {
    res.render('home', { users })
})

module.exports = router