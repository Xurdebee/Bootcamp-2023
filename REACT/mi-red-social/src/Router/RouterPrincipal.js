import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Login from "../pages/WebLogin";
import Registro from "../pages/WebRegistro";
import MiPerfil from "../pages/WebMiPerfil";
import Feed from "../pages/WebFeed";
import Amigos from "../pages/WebAmigos";
import Sugeridos from "../pages/WebSugeridos";
import ListadoBusqueda from "../pages/WebBusqueda";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route path="/feed" element={<Feed />} />
                <Route path="/amigos" element={<Amigos />} />
                <Route path="/sugeridos" element={<Sugeridos />} />
                <Route path="/perfil" element={<MiPerfil />} />
                <Route path="/busqueda" element={<ListadoBusqueda />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
