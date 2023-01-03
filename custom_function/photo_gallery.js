const fs = require('fs')

module.exports = {
    name: "photo_gallery",
    run: function run() {
        futur_paste = []
        fs.readdirSync('./data/photo_gallery').forEach((element) => {
            futur_paste.push('<img src="data:image/png;base64, ' + fs.readFileSync('./data/photo_gallery/' + element).toString('base64') + '" alt="">')
        })

        return futur_paste.join("")
    }
};