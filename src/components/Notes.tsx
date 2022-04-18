import { User } from "firebase/auth";
import React from "react";
import { signOut } from "../lib/AccessService";

type NotesProps = {
  user: User
}

export default function Notes({ user }: NotesProps) {
  return (
    <div className="notes">
      <h1>Hello, <span></span>{user.displayName}</h1>
      <img src={user.photoURL || undefined} alt='' />
      <button className="button signout" onClick={signOut}>Sign out</button>
      <h2>Notes</h2>
    </div>
  )
}

