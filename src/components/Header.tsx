import React, { useEffect, useRef, useState } from "react";
import './Header.css';
import { signOut } from "../lib/AuthService";
import { MyUser } from "../models/MyUser";

type Props = {
  user: MyUser
}

export default function Header({ user }: Props) {
  const [showProfile, setShowProfile] = useState<boolean>(false);

  let divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (event: MouseEvent) => {
      if (!divRef.current!.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    }
  });

  return (
    <header ref={divRef} data-testid="header">
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
  )
}