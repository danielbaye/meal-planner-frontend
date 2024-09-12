import { useState, useEffect, useCallback } from "react"
import api from "../api"
import Note from "../components/note"
import React from "react"
import "../styles/Home.css"

type NoteType = {
    id: number,
    title: string,
    content: string,
    created_at: string
}

export function Home() {
    const [notes, SetNotes] = useState<NoteType[]>([])
    const [content, setContent] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const getNotes = useCallback(async () => {
        try {
            const res = await api.get("/api/notes/")
            SetNotes(res.data)
        }
        catch (error) { alert(error) }
    }, [])

    useEffect(() => {
        getNotes()
    }, [])

    const deleteNote = async (id: number) => {
        try {
            const res = await api.delete(`/api/notes/delete/${id}`)
            if (res.status === 204) {
                getNotes()
            }
            else {
                alert('note not deleted')
            }
        }
        catch (error) { alert(error) }
    }

    const createNote = async (e: any) => {
        e.preventDefaut
        try {
            const res = await api.post("/api/notes/", { content, title })
            if (res.status === 204) {
                getNotes()
            }
            else {
                alert('note note created')
            }
        }
        catch (error) { alert(error) }
    }

    return (<div>
        <div>
            <h2>Notes</h2>
            {notes.map(note => {
                return <Note note={note} onDelete={(id: number) => deleteNote(id)} key={note.id} />
            })}
        </div>

        <form onSubmit={createNote}>
            <h2>create a note</h2>
            <label htmlFor='title'>Title:</label>
            <br />
            <input type="text" id="title" name="title" required onChange={e => setTitle(e.target.value)} value={title} />
            <br />
            <label htmlFor='title'>Content:</label>
            <br />
            <textarea id="content" name="content" required onChange={e => setContent(e.target.value)} value={content} />
            <br />
            <input type="submit" value={"submit"} />
        </form>
    </div>)
}
