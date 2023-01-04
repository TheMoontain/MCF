const fs = require('fs')

class panel {
    constructor() { }

    static async panel(req, res) {
        if (req.url == "/apanel") {
            let data = JSON.parse(fs.readFileSync('./data/sitedata.json'))
            console.log(Object.keys(data))
            let link_bar = ""
            let content = ""
            Object.keys(data).forEach((section) => {
                link_bar += `<li><a href="#${section}"><i class="${data[section].icon}"></i> ${data[section].name}</a></li>`
                content += `<div id='${section}' ><h2><i class="${data[section].icon}"></i> ${data[section].name}</h2>`
                Object.keys(data[section].options).forEach((element) => {
                    if (data[section].options[element].type == "list") {
                        content += "<div class='list'>"
                        content += `Nouvel ${element} <i class='fa-solid fa-plus'></i>`

                        content += `<div class='list_header'>`
                        data[section].options[element].params.forEach((params, index) => {
                            content += `<div>${params}</div>`
                        })
                        content += `</div>`

                        data[section].options[element].value.sort(function (a, b) {
                            return b.timestamp - a.timestamp;
                        });

                        data[section].options[element].value.forEach((value) => {
                            content += `<div><input value='${value[data[section].options[element].params[0]]}' type="text">`
                            data[section].options[element].params.forEach((params, index) => {
                                if (index != 0) {
                                    content += `<input value='${value[params]}' type="text">`
                                }
                            })
                            content += `</div>`
                        })
                        content += "</div>"
                    } else {
                        content += `<div><label>${element} :</label><input type="${data[section].options[element].type}" value="${data[section].options[element].value}"></div>`
                    }
                })
                content += "</div>"
            })

            console.log(content)
            let html = fs.readFileSync('./panel/index.html')
            res.writeHead(200)
            res.end(html.toString().split("{{link_bar}}").join(link_bar).split("{{content}}").join(content))
        } else {
            let file = fs.readFileSync('./panel/' + req.url.split("/apanel/").join(""))
            res.writeHead(200)
            res.end(file)
        }
    }
}

module.exports = { panel };

/*module.exports = {
panel: async (req, res) => {
    if (req.url == "/apanel") {
        html = fs.readFileSync('./panel/index.html')
        res.end(html)
    } else {
        file = fs.readFileSync('./panel/'+req.url.split("/apanel/").join(""))
        res.end(file)
    }
},
};*/