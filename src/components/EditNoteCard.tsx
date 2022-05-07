import React, { useEffect, useRef, useState } from "react";
import { updateNote } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import './EditNoteCard.css'

type Props = {
    user: MyUser,
    note: Note,
    onClick: () => void,
}

export default function EditNoteCard({ user, note, onClick:onClose }: Props) {
    const id = note.id;
    const [title, setTitle] = useState<string>(note.title);
    const [content, setContent] = useState<string>(note.content);

    function closeNote() {
        if (title !== note.title || content !== note.content) {
            updateNote(user, { title, content, id });
        }
        onClose()
    }

    let divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                closeNote();
            }
        }
        document.addEventListener("click", handler, true);

        return () => {
            document.removeEventListener("click", handler, true);
        }
    });

    return (
        <div ref={divRef} className="update-note-card">
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