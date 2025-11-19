import express from "express";
import { get } from "mongoose";
import {
    deleteNotes,
    getNoteById,
    getNotes,
    postNotes,
    updateNotes,
} from "../Controllers/notesController.js";
const noteRouter = express.Router();

noteRouter.get("/", getNotes);
noteRouter.get("/:id", getNoteById);
noteRouter.post("/", postNotes);
noteRouter.post("/:id", updateNotes);
noteRouter.delete("/:id", deleteNotes);

export default noteRouter;
