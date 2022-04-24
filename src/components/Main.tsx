import React from "react"
import { MyUser } from "../models/MyUser";
import './Main'
import CreateNotePanel from "./CreateNotePanel";

type Props = {
    user: MyUser
}

export default function Main({ user }: Props) {
    return (
        <React.Fragment>
            <CreateNotePanel user={user}></CreateNotePanel>
        </React.Fragment>
    )
}