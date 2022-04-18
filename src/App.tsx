import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import Access from "./components/Access";
import Notes from "./components/Notes";
import { auth } from "./lib/AccessService";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [])

  return (
    <div className="app">
      {user ? <Notes user={user} /> : <Access />}
    </div>
  );
}

export default App;