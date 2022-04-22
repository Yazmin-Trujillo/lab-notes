import React from "react";
import './Notes.css';
import { MyUser } from "../models/MyUser";
import Header from "./Header";
import Main from "./Main";

type NotesProps = {
  user: MyUser
}

export default function Notes({ user }: NotesProps) {
  return (
    <React.Fragment>
      <Header user={user}></Header>
      <Main user={user}></Main>

    </React.Fragment>
  )
}
