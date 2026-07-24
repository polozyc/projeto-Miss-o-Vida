import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Projetos from "./pages/Projetos";
import Doacoes from "./pages/Doacoes";
import Contato from "./pages/Contato";
import NaoEncontrada from "./pages/NaoEncontrada";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGaleria from "./pages/admin/AdminGaleria";
import AdminNoticias from "./pages/admin/AdminNoticias";
import AdminMensagens from "./pages/admin/AdminMensagens";

export default function App() {
  const location = useLocation();
  const rotaAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!rotaAdmin && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/doacoes" element={<Doacoes />} />
          <Route path="/contato" element={<Contato />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/galeria"
            element={
              <ProtectedRoute>
                <AdminGaleria />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/noticias"
            element={
              <ProtectedRoute>
                <AdminNoticias />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/mensagens"
            element={
              <ProtectedRoute>
                <AdminMensagens />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      {!rotaAdmin && <Footer />}
    </div>
  );
}
