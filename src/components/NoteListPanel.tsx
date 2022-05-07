import React, { useEffect, useState } from "react";
import { seeNotes } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import NoteCard from "./NoteCard";
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
                    return <NoteCard key={note.id} user={user} note={note} />
                })}
            </section>
        </>
    )
}
