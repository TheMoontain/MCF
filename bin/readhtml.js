const fs = require('fs')

const balise = require('../data/balise').balise_to_replace

var custom_function = {}

fs.readdirSync('./custom_function').forEach((element) => {
    const {name, run} = require('../custom_function/'+element)
    custom_function[name] = run
})

module.exports = {
    readhtml: async (res, path) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                res.writeHead(404)
                res.end('404')
                return;
            }

            data = data.toString()

            headparams = []

            newdata = []

            style_component = []

            data.split("{{").forEach((element, index) => {
                temp = element.split("}}")
                if (temp[1]) {
                    try {
                        newdata.push("<div class='" + temp[0] + "'>" + fs.readFileSync('./public/components/' + temp[0] + ".html") + "</div>")
                    } catch (error) { }
                    newdata.push(temp[1])
                    style_comp = []
                    try {
                        headparams.push('<link rel="stylesheet" href="/style/' + temp[0] + '.css">')
                    } catch (error) { }
                } else {
                    newdata.push(temp[0])
                }
            })

            data = newdata.join('')

            data.split("node(/*").forEach((element, index) => {
                temp = element.split("*/)")
                if (temp[1]) {
                    retour = eval(temp[0])
                    if (retour) {
                        data = data.split('node(/*' + temp[0] + '*/)').join(retour)
                    } else {
                        data = data.split('node(/*' + temp[0] + '*/)').join("")
                    }
                } else {
                }
            })

            balise.forEach((element) => {
                try {
                    headparams.push(element.balise.split('...').join(data.split('[[' + element.intitule + ' : ')[1].split(";]]")[0]))
                    data = data.split('[[' + element.intitule + ' : ' + data.split('[[' + element.intitule + ' : ')[1].split(";]]")[0] + ';]]').join("")
                } catch (error) { }
            })

            headparams.push('<link rel="stylesheet" href="/style/main.css">')

            data = "<html><head>" + headparams.join("") + "</head><body>" + data + "</body></html>"

            res.writeHead(200)
            res.end(data);
        });
    },
};