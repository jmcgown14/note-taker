const fs = require("fs");
const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`The server is listening on PORT: ${PORT}`);
});