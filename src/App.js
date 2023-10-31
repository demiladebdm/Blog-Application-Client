import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Chat from "./components/Chat/Chat";
import Loader from "./components/Loader/Loader";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
// import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
// import Blog from "./pages/Blog/Blog";
// import BlogDetail from "./pages/BlogDetails/BlogDetail";
// import Contact from "./pages/Contact/Contact";
// import Brokers from "./pages/Brokers/Brokers";
// import Mesh from "./pages/Mesh/Mesh";
// import Write from "./pages/Write/Write";
// import Register from "./pages/Authentication/Register";
// import Login from "./pages/Authentication/Login";

// Use lazy to import components dynamically
// const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
// const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetails/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Brokers = lazy(() => import("./pages/Brokers/Brokers"));
const Mesh = lazy(() => import("./pages/Mesh/Mesh"));
const Write = lazy(() => import("./pages/Write/Write"));
const Register = lazy(() => import("./pages/Authentication/Register"));
const Login = lazy(() => import("./pages/Authentication/Login"));

function App() {
  return (
    <section className="App">
      <Router>
        <div style={{ zIndex: "888" }}>
          <Navbar />
        </div>

        <div className="content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              {/* <Route path="/home" element={<Home />}></Route> */}
              <Route path="/about" element={<About />}></Route>
              <Route path="/blog" element={<Blog />}></Route>
              <Route path="/blog/:id" element={<BlogDetail />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/brokers" element={<Brokers />}></Route>
              <Route path="/mesh" element={<Mesh />}></Route>
              <Route path="/write" element={<Write />}></Route>

              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>

            <Chat />
            <Footer />
          </Suspense>
        </div>
        <Toaster />
      </Router>
    </section>
  );
}

export default App;
