const fs = require('fs')

module.exports = {
    name: "get_articles",
    run: function run() {
        console.log(JSON.parse(fs.readFileSync('./data/sitedata.json')))

        return ""
    }
};