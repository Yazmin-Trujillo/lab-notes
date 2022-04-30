import React, { useState } from "react";
import { saveNote } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
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
        setShowNoteArea(false);
        createNote(title, content, id);
        setTitle('');
        setContent('');
    }

    function createNote(title: string, content: string, id: string) {
        if (title === '' && content === '') {
            return;
        }
        const note: Note = { title, content, id };
        saveNote(user, note);
    }

    return (
        <React.Fragment>
            <div className={`note-area-container ${showNoteArea ? "" : "minimized"}`} data-testid="note-panel">
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
                        onClick={() => setShowNoteArea(true)}
                        onChange={event => setContent(event.target.value)}
                        value={content}
                        data-testid="note-content" />
                </div>
                <div className="close-note-area">
                    <button onClick={onClose} data-testid="close-button">Close</button>
                </div>
            </div>
        </React.Fragment>
    )


}
