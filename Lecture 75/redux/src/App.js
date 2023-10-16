import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./component/Navbar";
import { Shop } from "./component/Shop";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Shop />
    </div>
  );
}

export default App;
