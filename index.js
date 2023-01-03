const http = require('http')
const routing = require('./bin/main.js').routing
const { port } = require('./config')

const server = http.createServer(function (req, res) {
    routing(req, res)
})

server.listen(port)