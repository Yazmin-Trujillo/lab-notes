import React, { useEffect, useState } from "react";
import { seeNotes } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import './NoteListPanel.css'

type Props = {
    user: MyUser
}

export default function NoteListPanel({ user }: Props) {
    const [note, setNote] = useState<Note[]>([]);
    useEffect(() => {
        seeNotes(user).subscribe((notes) => setNote(notes));
    }, [user])
    return (
        <React.Fragment>
            <section className="section-notes">
                {note.map((value, index) => {
                    return <article key={index} className="note-card">
                        <div className="note-title"><h2>{value.title}</h2></div>
                        <div className="note-content"><pre> {value.content}</pre></div>
                    </article>
                })}
            </section>
        </React.Fragment>
    )
}
