import React from "react";
import './Notes.css';
import { signOut } from "../lib/AuthService";
import { MyUser } from "../models/MyUser";

type NotesProps = {
  user: MyUser
}

export default function Notes({ user }: NotesProps) {
  return (
    <div className="Notes">
      <h1>Notes</h1>
      <img src={user.image} alt='' />
      <h2>Hello, <span>{user.name}</span></h2>
      <button className="Signout-button" data-testid="signOut" onClick={signOut}>Sign out</button>

    </div>
  )
}
