import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Brokers from "./pages/Brokers/Brokers";
import Mesh from "./pages/Mesh/Mesh";
import Write from "./pages/Write/Write";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/brokers" element={<Brokers />}></Route>
          <Route path="/mesh" element={<Mesh />}></Route>
          <Route path="/write" element={<Write />}></Route>


          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>

        <Chat />
      </Router>
    </div>
  );
}

export default App;
