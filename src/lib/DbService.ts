import { getFirestore, collection, addDoc, onSnapshot, Timestamp, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { Observable } from "rxjs";
import { MyUser } from "../models/MyUser";
import { Note } from "../models/Note";
import { app } from "./AuthService";

const db = getFirestore(app);

export const saveNote = async (user: MyUser, note: Note) => {
    try {
        const docRef = await addDoc(collection(db, 'users', user.uid, "notes"), {
            title: note.title,
            content: note.content,
            createDate: Timestamp.fromDate(new Date())
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const seeNotes = (user: MyUser) => {
    const notesRef = collection(db, 'users', user.uid, "notes");
    const orderByCreateDateQuery = query(notesRef, orderBy("createDate", "desc"));

    return new Observable<Note[]>(observer => {
        onSnapshot(orderByCreateDateQuery, (snapshot) => {
            let notes: Note[] = [];
            snapshot.docs.forEach((doc) => {
                let note: Note = { title: doc.data().title, content: doc.data().content, id: doc.id };
                notes.push(note);
            });
            observer.next(notes);
        });
    });
};

export const deleteNote = async (user: MyUser, note: Note) => {
    await deleteDoc(doc(db, 'users', user.uid, "notes", note.id));
}
