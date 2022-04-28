import React, { useEffect, useState } from "react";
import { deleteNote, seeNotes } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import './NoteListPanel.css'

type Props = {
    user: MyUser
}

export default function NoteListPanel({ user }: Props) {
    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {
        seeNotes(user).subscribe((notes) => setNotes(notes));
    }, [user])
    return (
        <>
            <section className="section-notes" data-testid="section" >
                {notes.map((note, index) => {
                    return <article key={index} className="note-card" data-testid="article">
                        <div className="note-title"><p>{note.title}</p></div>
                        <div className="note-content"><pre>{note.content}</pre></div>
                        {/* <div>{note.id}</div> */}
                        <div className="note-footer">
                            <div onClick={() => deleteNote(user, note)} >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}>
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </div>

                    </article>
                })}
            </section>
        </>
    )
}
