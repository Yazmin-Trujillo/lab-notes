import React, { useState } from "react";
import './Main.css';


export default function Main() {
    const [showNoteArea, setShowNoteArea] = useState<boolean>(false);

    return (
        <React.Fragment>
            <div className={`note-area-container ${showNoteArea ? "" : "minimized"}`}>
                <div><input className="note-area-title" placeholder="Title"></input></div>
                <div>
                    <textarea placeholder="New Note..." className="note-area-textarea" onClick={() => setShowNoteArea(true)}></textarea>
                </div>
                <div className="close-note-area" onClick={() => setShowNoteArea(false)}>
                    <button >Close</button>
                </div>
            </div>
        </React.Fragment>
    )
}
