const fs = require('fs')
const readhtml = require('./readhtml.js').readhtml

module.exports = {
    routing: async (req, res) => {
        if (req.url == '/') {
            readhtml(res, './public/site/index.html')
        } else if (req.url.startsWith("/nodeapi")) {
            if (req.method == "POST") {
                res.end(req.url.split("/nodeapi/").join("") + " " + req.body)
            } else {
                res.end("Non valid method")
            }
        } else if (req.url.startsWith("/apanel")) {
            if (req.url == "/apanel") {
                html = fs.readFileSync('./panel/index.html')
                res.end(html)
            } else {
                file = fs.readFileSync('./panel/'+req.url.split("/apanel/").join(""))
                res.end(file)
            }
        } else if (req.url == '/style/main.css') {
            res.end(fs.readFileSync('./public/style/main.css').toString())
        } else if (req.url.startsWith('/style')) {
            component = req.url.split("/style/").join('')
            component_name = component.split(".")
            component_name.pop()
            component_name = component_name.join('.')
            try {
                res.end("." + component_name + " " + fs.readFileSync('./public/style/' + component).toString().split('\r\n').join("").split('}').join("} ." + component_name + " "))
            } catch (error) {
                res.writeHead(404)
                res.end('')
            }
        } else if (req.url.search('.') != -1) {
            readhtml(res, './public' + req.url + '.html')
        } else {
            fs.readFile('./public/site/' + req.url, function (err, data) {
                if (err) {
                    res.writeHead(404)
                    res.end('nop')
                    return;
                }
                res.writeHead(200)
                res.end(data);
            });
        }
    },
};