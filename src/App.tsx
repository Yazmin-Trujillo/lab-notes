import { useEffect, useState } from "react";
import Login from "./components/Login";
import Notes from "./components/Notes";
import { userChanged } from "./lib/AuthService";
import { MyUser } from "./models/MyUser";
import './App.css'

function App() {
  const [user, setUser] = useState<MyUser | undefined>(undefined);

  //mi observable.me subscribo.cuando pase el evento => hago esto
  useEffect(() => {
    userChanged().subscribe((user) =>  setUser(user))
  }, [])

  return (
    <div className="app">
      {user ? <Notes user={user} /> : <Login />}
    </div>
  );
}

export default App;