import React from "react";
import './Login.css';
import { signInWithGoogle } from '../lib/AuthService';

export default function Login() {
        return (
        <div className="Login">
            <h1>My Notes</h1>
            <p className="text-login">Do you look bad for forgetting meetings, payments, shopping? forget about that too and start keeping track of your activities quickly and clearly.</p>
            <p>Login with </p>
            <button className="Login-button" data-testid="google-login" onClick={signInWithGoogle}>Google</button>
        </div>
    );
}
