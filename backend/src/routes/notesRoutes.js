import express from "express"
import { createNote, getNoteById, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js"

const router = express.Router()

router.get("/", getAllNotes)
    .get("/:id", getNoteById)
    .post("/", createNote)
    .put("/:id", updateNote)
    .delete("/:id", deleteNote)

export default router