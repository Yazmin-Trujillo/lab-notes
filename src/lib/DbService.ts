import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import { Observable, Subject } from "rxjs";
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
const noteChangedSubject = new Subject<Note[]>();

export const seeNotes = (user: MyUser) => {
    // console.log('seenotescall');
    const unsub = onSnapshot(collection(db, "users", user.uid, "notes"), (snapshot) => {
        // console.log('collectionsnapshotupdate');
        let notes: Note[] = [];
        snapshot.docs.forEach((doc) => {
            // console.log('docdata', doc.data());
            let note: Note = { title: doc.data().title, content: doc.data().content };
            notes.push(note);
        });

        // console.log('adding next to changedSubject');
        noteChangedSubject.next(notes);
        // console.log('unsub', unsub);
        // console.log("Current data: ", snapshot.docs);
        // snapshot.docs.forEach(doc => console.log(doc.data()))
    });

    return noteChangedSubject.asObservable();
};