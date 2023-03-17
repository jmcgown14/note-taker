const fs = require("fs");
const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// POTENTIAL WAY TO DO SAVE ROUTE
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now().toString(); // add a unique ID to the new note
  noteData.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
    res.json(newNote);
  });
});

document.getElementById("save-note").addEventListener("click", function(event) {
  event.preventDefault(); // prevent the default form submit behavior
  const noteTitle = document.getElementById("note-title").value;
  const noteText = document.getElementById("note-text").value;
  const newNote = { title: noteTitle, text: noteText };
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newNote)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); 
  })
  .catch(error => console.error(error));
});

app.listen(PORT, () => {
  console.log(`The server is listening on PORT: ${PORT}`);
});

