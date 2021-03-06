import React, { useEffect, useState } from "react";
import { seeNotes } from "../lib/DbService";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import NoteCard from "./NoteCard";
import './NoteListPanel.css'
import Masonry from 'react-masonry-css'

type Props = {
    user: MyUser
}

export default function NoteListPanel({ user }: Props) {
    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {
        seeNotes(user).subscribe((notes) => setNotes(notes));
    }, [user])

    const  breakpointColumnsObj  =  { 
        predeterminado : 4 , 
        2560 : 5,
        1440 : 5,
        1200 : 4,
        992 : 4,
        768 : 3 , 
        425 : 2 , 
        375 : 1 
      } ; 

    return (
        <>
            <Masonry breakpointCols = { breakpointColumnsObj }  className="my-masonry-grid" columnClassName="my-masonry-grid_column" data-testid="section">
                {notes.map((note) => {
                    return <NoteCard key={note.id} user={user} note={note} />
                })}
            </Masonry>

        </>
    )
}
