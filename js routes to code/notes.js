const notes = require('express').Router()
const { readAndWriteFile, readFile } = require('../utility/fsUtiity')

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))})

notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved to add a note`)
    console.log(req.body)

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        }
        readAndWriteFile(newNote, './db/db.json') 
        const response = {
            status: 'success',
            body: newNote
        }
        console.info(response)
    } else {
        res.error('Error')
    }
})

module.exports = notes