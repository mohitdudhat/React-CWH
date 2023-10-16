import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <BrowserRouter>
        <Routes path='/'>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
