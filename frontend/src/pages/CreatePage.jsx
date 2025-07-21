import { useState } from "react"
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"

const CreatePage = () => {
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    const navigate = useNavigate()

    const updateNote = (e) => {
        const { name, value } = e.target

        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }))
    }

    const sendNote = async (e) =>{
        e.preventDefault()

        try{
            const response = await fetch('http://localhost:3000/api/notes' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            })
            if (response.ok) {
                setNote({ title: "", content: "" });
                toast.success("Note created!");
                navigate('/');
            } else {
                console.error("Error saving note:", response.status);
            }
        }catch(e){
            console.error("Failed to send note:", e)
        }
    }

    return (
        <>
            <header>
                <Link to="/" className="back">BACK</Link>
                <h1>NEW NOTE</h1>
            </header>
            <div className="create-note">
                <form onSubmit={sendNote}>
                    <input
                        className="title"
                        name="title"
                        value={note.title}
                        onChange={updateNote}
                        placeholder="TITLE"
                        required
                    ></input>
                    <textarea
                        className="content"
                        name="content"
                        value={note.content}
                        onChange={updateNote}
                        placeholder="CONTENT"
                        required
                    ></textarea>
                    <button type="submit">CREATE NOTE</button>
                </form>
            </div>
        </>
    )
}

export default CreatePage