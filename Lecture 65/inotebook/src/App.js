import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/notes/NoteState";
import { Alert } from "./components/Alert";

function App() {
  return (
    <NoteState>
      <Navbar />
      <Alert message="this is amazing react app" />
      <Routes path="/">
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </NoteState>
  );
}

export default App;
