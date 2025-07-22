import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router"
import toast from "react-hot-toast"

const NotePage = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    const navigate = useNavigate()

    //get note data and set title/content
    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setNote({ title: data.title, content: data.content })
                } else {
                    console.error("Failed to fetch note:", response.status)
                }
            } catch (error) {
                console.error("Network error:", error)
            } finally {
                setLoading(false)
            }
        };

        getNote()
    }, [id])

    const updateNote = (e) => {
        const { name, value } = e.target

        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }))
        //console.log(note)
    }

    const sendNote = async (e) =>{
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            });

            if (response.ok) {
                toast.success("Note updated!");
                navigate('/');
            } else {
                console.error("Failed to update note:", response.status);
            }
        } catch (error) {
            console.error("Network error:", error);
        }

    }

    return (
        <>
            <header>
                <Link to="/" className="back">BACK</Link>
                <h1>UPDATE NOTE</h1>
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
                    <button type="submit">UPDATE NOTE</button>
                </form>
            </div>
        </>
    )
}

export default NotePage