import React from "react";
import './Notes.css';
import { MyUser } from "../models/MyUser";
import Header from "./Header";
import CreateNotePanel from "./CreateNotePanel";

type NotesProps = {
  user: MyUser
}

export default function Notes({ user }: NotesProps) {
  return (
    <React.Fragment>
      <Header user={user}></Header>
      <CreateNotePanel user={user}></CreateNotePanel>

    </React.Fragment>
  )
}
