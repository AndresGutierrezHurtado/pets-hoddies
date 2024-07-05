import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { createRoot } from 'react-dom/client';
import Index from "./components/inicio/index.jsx";
import Tallas from "./components/tallas/tallas.jsx";
import Login from "./components/login/login.jsx";
import Profile from "./components/profile/main.jsx";
import Tables from "./components/admin/main.jsx";
import PayProcess from "./components/payprocess/payprocess.jsx";
import Confirmation from "./components/payprocess/confirmation.jsx"
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/productos" element={<Index />} />
        <Route path="/conocenos" element={<Index />} />
        <Route path="/tallas" element={<Tallas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/list/*" element={<Tables />} />
        <Route path="/pay-process" element={<PayProcess />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </Router>
  );
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
