// set up route server file and added constans and linking
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const path = require('path');

const notes = require('./db/db.json');


app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recieved to add a note`)
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);