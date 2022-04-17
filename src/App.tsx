import React, { Suspense, lazy } from 'react';
import './App.css';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

const Access = lazy(() => import('./routes/Access'));
const Notes = lazy(() => import('./routes/Notes'));

export default function App() {
  return (
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

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Access />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Suspense>
    </div>
  );
}
