import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <div className="App">
      <NoteState>
        <Navbar />
        <Home />
        <Routes path="/">
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<Home />} />
        </Routes>
      </NoteState>
    </div>
  );
}

export default App;
