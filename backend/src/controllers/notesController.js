import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find().sort({createdAt:1})//show newest note first
        res.status(200).json(notes)
        console.log("getAllNotes run")
    } catch(e) {
        console.error("Error in getAllNotes controller: ",e)
        res.status(500).json({message: "internal server error"})
    }
}
export const getNoteById = async (req, res) => {
    try{
        const getNote = await Note.findById(req.params.id)
        if (!getNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(getNote)
        console.log("getNoteById run")
    } catch(e){
        console.error("Error in getNoteById controller: ",e)
        res.status(500).json({message: "internal server error"})
    }
}
export const createNote = async (req, res) =>{
    try{
        const {title,content} = req.body
        const newNote = new Note({title, content})
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
        console.log(title, content)
        console.log("createNote run")
    }catch(e){
        console.error("Error creating note: ",e)
        res.status(500).json({message: "internal server error"})
    }
}
export const updateNote = async (req, res) =>{
    try{
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content},{new:true})

        if(!updatedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updatedNote)
        console.log("updateNote run")
    } catch(e){
        console.error("Error updating note: ",e)
        res.status(500).json({message: "internal server error"})
    }
}
export const deleteNote = async (req, res) =>{
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json({ message: "Note deleted successfully"})
        console.log("deleteNote run")
    } catch(e){
        console.error("Error deleting note: ",e)
        res.status(500).json({message: "internal server error"})
    }
}