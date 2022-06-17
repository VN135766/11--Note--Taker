// set up route server file and added constans and linking
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const notes = require('./db/db.json');


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

app.get('/api/notes', (req, res) => res.json(notes))

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recieved to add a note`)
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
        }
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data)

                parsedNotes.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 2),
                    (writeErr) => writeErr
                        ? console.error(writeErr)
                        : console.info('success'))
            }
        })
        const response = {
            status: 'success',
            body: newNote
        }
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error')
    }
})


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);