


const express = require('express');
const fs = require('fs');
const app = express();
let dbJson = [];
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
});
app.get('/notes', function (req, res) {
    res.sendFile(__dirname + '/public/notes.html')
});
app.get('/api/notes', function (req, res) {
    const dbJson = fs.readFileSync(__dirname + '/db/db.json', 'utf8');
    return res.json(JSON.parse(dbJson));
});
app.post('/api/notes', function (req, res) {
    var newNotes = req.body;
    console.log(newNotes)
    const notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf8'));
    notes.push({
        ...newNotes,
        id: notes.length + 1
    });
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes));
    res.json(newNotes);
});
app.delete('/api/notes/:id', function (req, res) {
    const {
        id
    } = req.params;
    dbJson = fs.readFileSync(__dirname + '/db/db.json', 'utf8');
    dbJson = JSON.parse(dbJson);
    console.log(id);
    dbJson = dbJson.filter(function (note) {
        return note.id != id;
    })
    dbJson = JSON.stringify(dbJson);
    fs.writeFileSync(__dirname + '/db/db.json', dbJson);
    res.sendStatus(200);
});
app.listen(3000, function () {
    console.log('localhost:3000')
});
