import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import RateLimit from "../components/RateLimit"
import NoteItem from "../components/NoteItem"
import toast from "react-hot-toast"

const HomePage = () => {

    const url = process.env.NODE_ENV !== "production" ?
        "http://localhost:5001" :    
        import.meta.env.VITE_API_URL

    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const fetchData = async () => {
            setLoading(true)
            try {
                console.log("Fetching from:", `${url}/api/notes`)
                const response = await fetch(`${url}/api/notes`)

                if (response.status === 429){
                    setIsRateLimited(true)
                }

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const result = await response.json()
                setNotes(result)
                setIsRateLimited(false)

            } catch (e) {
                console.error("Error running getNotes", e)
                toast.error("Failed to load notes")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    },[])

    const handleDelete = (deleteId) => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== deleteId))
        toast.success("Note deleted")
    }


    return (
        <div className="home-page">
            <NavBar />
            {loading && <div>waiting for data</div>}
            {isRateLimited && <RateLimit />}
            <div className="note-list">
                {!isRateLimited && !loading ? 
                notes.map(note =>
                    <NoteItem 
                        key={note.id} 
                        note={note} 
                        onDelete={handleDelete}
                    />
                )
             : ''}
            </div>
        </div>
    )
}

export default HomePage