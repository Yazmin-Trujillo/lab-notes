import React from "react";
import './Login.css';
import { signInWithGoogle } from '../lib/AuthService';
import logoGoogle from '../assets/logoGoogle.png';
import Lista from '../assets/Lista.png';

export default function Login() {
    return (
        <div className="Login">
            <h1 className="Title-app">My Notes</h1>
            <div className="Line"></div>
            <div className="image-container">
                <img src={Lista} className="Image-lista" alt="imgLista"></img>
            </div>
            <button className="Login-button"
                data-testid="google-login"
                onClick={signInWithGoogle}>
                <img src={logoGoogle}
                    className="App-logo-google"
                    alt="logoGoogle">
                </img>
               Google
            </button>
        </div>
    );
}
