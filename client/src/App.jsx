import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/inicio/index.jsx";
import Tallas from "./components/tallas/tallas.jsx";
import Login from "./components/login/login.jsx";
import Profile from "./components/profile/main.jsx";
import Tables from "./components/admin/main.jsx";
import PayProcess from "./components/payprocess/payprocess.jsx";
import Confirmation from "./components/payprocess/confirmation.jsx";

export default function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}
