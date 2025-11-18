import express from "express";
const noteRouter = express.Router();

noteRouter.get("/", (req, res) => {
    res.status(200).send("Hello, World!");
});
noteRouter.post("/", (req, res) => {
    res.status(201).send("Note Created");
});
noteRouter.post("/:id", (req, res) => {
    res.status(201).send("Note Updated");
});
noteRouter.delete("/:id", (req, res) => {
    res.status(201).send("Note Deleted");
});

export default noteRouter;
