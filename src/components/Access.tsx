import React from "react";
import { signInWithGoogle } from '../lib/AccessService';

export default function Access() {
        return (
        <React.Fragment>
            <h1>My Notes</h1>
            <p>Do you look bad for forgetting meetings, payments, shopping? forget about that too and start keeping track of your activities quickly and clearly.</p>
            <button className="button" onClick={signInWithGoogle}>Google</button>
        </React.Fragment>
    );
}
