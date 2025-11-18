import express from "express";

const app = express();
const port = 3000;

app.get("/api", (req, res) => {
    res.status(200).send("Hello, World!");
});
app.post("/api/notes", (req, res) => {
    res.status(201).send("Note Created");
});
app.post("/api/notes/:id", (req, res) => {
    res.status(201).send("Note Updated");
});
app.delete("/api/notes/:id", (req, res) => {
    res.status(201).send("Note Deleted");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
