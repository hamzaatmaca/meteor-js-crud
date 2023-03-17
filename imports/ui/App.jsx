import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Chat from "./Pages/Chat";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="container min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="chat" element={<Chat />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
};
