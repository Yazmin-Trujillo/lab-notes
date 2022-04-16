import React, { Suspense, lazy  } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Access = lazy(() => import('./routes/Access'));
const Notes = lazy(() => import('./routes/Notes'));

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Access</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
   
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<Access />} />
            <Route path="/notes" element={<Notes />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
