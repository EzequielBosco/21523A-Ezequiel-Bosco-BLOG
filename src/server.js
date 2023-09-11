const http = require('http')

const port = process.env.port || 4000

http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead('Bienvenido al servidor')
        res.end()
        return
    }

    res.write(req.url)
    res.end()

}).listen(port, console.log(`Server running at port ${port}`))