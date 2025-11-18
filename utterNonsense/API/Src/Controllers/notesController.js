export function getNotes(req, res) {
    res.status(200).send("Hello,Notes Succesfully !");
}
export function postNotes(req, res) {
    res.status(201).send("Note Posted Succesfully !");
}
export function updateNotes(req, res) {
    res.status(200).send("Note Updated Succesfully !");
}
export function deleteNotes(req, res) {
    res.status(200).send("Note Deleted Succesfully !");
}
