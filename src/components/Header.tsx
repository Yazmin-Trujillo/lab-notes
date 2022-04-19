import React, { useState } from "react";
import './Header.css';
import { signOut } from "../lib/AuthService";
import { MyUser } from "../models/MyUser";

type HeaderProps = {
  user: MyUser
}

export default function Header({ user }: HeaderProps) {
  const [showProfile, setShowProfile] = useState<boolean>(false);

  return (
    <React.Fragment>
      <header data-testid="header">
        <div className="toolbar">
          <button className="button-round" onClick={() => setShowProfile(!showProfile)}>{user.name.charAt(0).toUpperCase()}</button>
          <h1>My Notes</h1>
        </div>
        <div className={`profile ${showProfile ? "" : "hidden"}`} >
          <img className="user-image" src={user.image} alt='' />
          <div className="username">{user.name}</div>
          <div>{user.email}</div>
          <button className="signout-button" data-testid="signOut" onClick={signOut}>Sign out</button>
        </div>
      </header>
    </React.Fragment>
  )
}