import React from "react";
import { signInWithGoogle } from '../lib/AuthService';

export default function Login() {
        return (
        <React.Fragment>
            <h1>My Notes</h1>
            <p>Do you look bad for forgetting meetings, payments, shopping? forget about that too and start keeping track of your activities quickly and clearly.</p>
            <button className="button" onClick={signInWithGoogle}>Google</button>
        </React.Fragment>
    );
}
