import React, { useEffect, useRef, useState } from "react";
import { saveNote } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import './CreateNotePanel.css';

type Props = {
    user: MyUser
}

export default function CreateNotePanel({ user }: Props) {
    const id = '';
    const [showNoteArea, setShowNoteArea] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    function onClose() {
        if (title !== '' || content !== '') {
            saveNote(user, { title, content, id });
        }
        setShowNoteArea(false);
        setTitle('');
        setContent('');
    }

    let divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        }
    });

    return (
        <div ref={divRef}  className={`note-area-container ${showNoteArea ? "" : "minimized"}`} data-testid="note-panel">
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
                    onClick={() => setShowNoteArea(true)}
                    data-testid="note-content" />
            </div>
            <div className="close-note-area">
                <button onClick={onClose} data-testid="close-button">Close</button>
            </div>
        </div>
    )


}
