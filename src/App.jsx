import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Packages from "./pages/user/Packages";
// import Schedule from "./pages/user/Schedule";
// import Gallery from "./pages/user/Gallery";
// import Testimony from "./pages/user/Testimony";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/packages" element={<Packages />} />

        {/* <Route path="/packages" element={<Packages />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/review/gallery" element={<Gallery />} />
        <Route path="/review/testimony" element={<Testimony />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
