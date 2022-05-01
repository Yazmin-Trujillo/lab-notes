import React, { useState } from "react";
import { updateNote } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import './EditNotePanel.css'

type Props = {
    user: MyUser,
    note: Note
    onClose: () => void
}

export default function EditNotePanel({ user, note, onClose }: Props) {
    const id = note.id;
    const [title, setTitle] = useState<string>(note.title);
    const [content, setContent] = useState<string>(note.content);

    function closeNote() {
        // 
        changeNote();
        onClose()
    }

    function changeNote() {
        if (title === note.title && content === note.content){
            return;
        }
        updateNote(user,{ title, content, id });
    }

    return (
        <div className="update-note-panel">
            <div>
                <input
                    className="note-area-title"
                    placeholder="Title"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                    data-testid="note-title" />
            </div>
            <div>
                <textarea
                    placeholder="New Note..."
                    className="note-area-textarea"
                    onChange={event => setContent(event.target.value)}
                    value={content}
                    data-testid="note-content" />
            </div>
            <div className="note-footer">
                <button onClick={closeNote} data-testid="close-button">Close</button>
            </div>
        </div>
    )


}