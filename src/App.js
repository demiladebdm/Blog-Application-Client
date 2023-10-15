import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Chat from "./components/Chat/Chat";
import Loader from "./components/Loader/Loader";

// Use lazy to import components dynamically
const Home = lazy(() => import("./pages/Home/Home"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail"));
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
        <Suspense fallback={<Loader />}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
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
        </Suspense>
        <Toaster />
      </Router>
    </section>
  );
}

export default App;
