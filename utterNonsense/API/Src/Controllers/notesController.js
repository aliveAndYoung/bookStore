import Note from "../models/Note.js";
export async function getNotes(req, res) {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}
export async function getNoteById(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }
        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}
export async function postNotes(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            title,
            content,
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}
export async function updateNotes(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}
export async function deleteNotes(req, res) {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.status(200).send("Note Deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}
