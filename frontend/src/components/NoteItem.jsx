import { Link } from "react-router"
import { useState } from "react"
import plus from "../../public/plus.png"

const NoteItem = ({note, onDelete}) => {
    const [showNote, setShowNote] = useState(false)

    const deleteNote = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${note._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                onDelete(note._id)
            } else {
                console.error("Failed to delete note:", response.status);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }


    return(
        <div 
            key={note._id} 
            className={showNote ? 'note toggle' : 'note'}
        >
            <h1>{note.title}</h1>
            <p>{showNote ? note.content : '...'}</p>
            <div>
                {showNote && 
                    <button className="delete" onClick={deleteNote}>
                        <img src={plus}/>
                    </button>
                }
                <Link to={`/note/${note._id}`}>EDIT</Link>
                <button className="dropdown" onClick={() => setShowNote(prev => !prev)}>^</button>
            </div>
        </div>
    )
}

export default NoteItem