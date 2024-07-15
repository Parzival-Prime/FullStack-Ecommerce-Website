import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Cart from "./pages/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
