document.querySelector(".save-note").addEventListener("click", function(event) {
    event.preventDefault(); // prevent the default form submit behavior
    const noteTitle = document.querySelector(".note-title").value;
    const noteText = document.querySelector(".note-textarea").value;
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
  