import React from "react";
import './Notes.css';
import { MyUser } from "../models/MyUser";
import Header from "./Header";

type NotesProps = {
  user: MyUser
}

export default function Notes({ user }: NotesProps) {
  return (
    <React.Fragment>
      <Header user={user}></Header>
      <main>
        pendiente
      </main>

    </React.Fragment>
  )
}
