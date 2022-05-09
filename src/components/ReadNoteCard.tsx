import React, { useEffect, useRef, useState } from "react";
import { deleteNote } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import './ReadNoteCard.css'


type Props = {
    user: MyUser,
    note: Note,
    onClick: () => void,
}

export default function ReadNoteCard({ user, note, onClick: propsOnClick }: Props) {

    let divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: MouseEvent) => {
            if (divRef.current && divRef.current.contains(event.target as Node)) {
                propsOnClick()
            }
        }
        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        }
    });

    return (
        <div ref={divRef} className="read-note-card" data-testid="article">
            <div className="note-title" onClick={() => propsOnClick()}><p>{note.title}</p></div>
            <div className="note-content" onClick={() => propsOnClick()}><pre>{note.content}</pre></div>
            <div className="note-footer" >
                <div className="delete-icon" onClick={() => deleteNote(user, note)} data-testid="delete-note">
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
        </div >
    )
}