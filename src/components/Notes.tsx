import React from "react";
import { signOut } from "../lib/AuthService";
import { MyUser } from "../models/MyUser";

type NotesProps = {
  user: MyUser
}

export default function Notes({ user }: NotesProps) {
  return (
    <div className="notes">
      <h1>Hello, <span></span>{user.name}</h1>
      <img src={user.image} alt='' />
      <button className="button signout" onClick={signOut}>Sign out</button>
      <h2>Notes</h2>
    </div>
  )
}

