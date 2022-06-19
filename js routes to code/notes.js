const notes = require('express').Router()
const { readAndWriteFile, readFromFile } = require('../utility/fsUtiity')

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))})
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
        }
        readAndWriteFile(newNote, './db/db.json') 
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    } else {
        res.error('Error')
    }
})

module.exports = notes