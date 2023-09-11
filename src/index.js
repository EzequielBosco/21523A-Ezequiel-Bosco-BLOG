const router = require('./routes') 
require('dotenv').config()
const app = require('./app')

const port = process.env.port || 4000

router(app)

app.listen(port, console.log(`Server running at port ${port}`))