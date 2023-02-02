const fs = require('fs')
const util = require('util');
const readFromFile = util.promisify(fs.readFile)

const readAndWriteFile = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content);
            writeToFile(file, parsedData)
        }
    })
}
function writeToFile(fileName, content) {
    fs.writeFile(fileName, JSON.stringify(content, null, 2), (err) => err ? console.error(err) : console.info())
}
    module.exports = { readAndWriteFile, readFromFile }