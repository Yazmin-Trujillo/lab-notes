import { getFirestore, collection, addDoc } from "firebase/firestore";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import { app } from "./AuthService";

const db = getFirestore(app);

export const saveNote = async (user: MyUser, note: Note) => {
    try {
        const docRef = await addDoc(collection(db, 'users', user.uid, "notes"), {
            title: note.title,
            content: note.content
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};