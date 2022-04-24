import React from "react"
import { MyUser } from "../models/MyUser";
import 'Main.css'


type Props = {
    user: MyUser
}

export default function Main({ user }: Props) {
    return (
        <React.Fragment>
            <Main user={user}></Main>
        </React.Fragment>
    )
}