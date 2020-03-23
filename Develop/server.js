var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
const noteJSON = require("./db/db.json");
var PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("./"));

//html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

//API routes
app.get("/api/notes", (req, res) => {
    res.json(noteJSON)
})

app.post("/api/notes", (req,res) => {
    const lastID = noteJSON.length ? Math.max(...(noteJSON.map(note=> note.id))) : 0;

    const id = lastID + 1;
    noteJSON.push({id,...req.body});
    res.json(noteJSON.slice(-1));
})

app.delete("/api/notes/:id", (req,res) => {
    let note = noteJSON.find(({id}) => id === JSON.parse(req.params.id));
    noteJSON.splice(noteJSON.indexOf(note), 1);
    res.end("note deleted")
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.listen(PORT, ()=> console.log(`APP listening on Port ${PORT}`));
  