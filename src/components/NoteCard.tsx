import React, { useState } from "react";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import EditNoteCard from "./EditNoteCard";
import ReadNoteCard from "./ReadNoteCard";
import './NoteCard.css'

type Props = {
    user: MyUser,
    note: Note
}

export default function NoteCard({ user, note }: Props) {
    const [showNoteToEdit, setShowNoteToEdit] = useState<boolean>(false);

    function onEditClose() {
        setShowNoteToEdit(false)
    };

    function onEditOpen() {
        setShowNoteToEdit(true)
    };

    return (
        <>
            <div className={`${showNoteToEdit ? "invisible" : ""}`}>
                <ReadNoteCard user={user} note={note} onClick={onEditOpen} />
            </div>
            {showNoteToEdit ? <EditNoteCard user={user} note={note} onClose={onEditClose} /> : ''}
        </>
    )
}