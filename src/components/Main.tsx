import React from "react"
import { MyUser } from "../models/MyUser";
import './Main.css'
import CreateNotePanel from "./CreateNotePanel";
import NoteListPanel from "./NoteListPanel";

type Props = {
    user: MyUser
}

export default function Main({ user }: Props) {
    return (
        <main>
            <CreateNotePanel user={user}></CreateNotePanel>
            <NoteListPanel user={user}></NoteListPanel>
        </main>
    )
}