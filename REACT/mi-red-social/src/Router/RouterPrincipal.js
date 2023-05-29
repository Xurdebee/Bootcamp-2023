import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Login from "../pages/WebLogin";
import Registro from "../pages/WebRegistro";
import MiPerfil from "../pages/WebMiPerfil";
import PefilEditable from "../pages/WebPerfilEditable";
import Feed from "../pages/WebFeed";
import Amigos from "../pages/WebAmigos";
import Sugeridos from "../pages/WebSugeridos";
import Admin from "../pages/WebAdmin";
import ListadoBusqueda from "../pages/WebBusqueda";
import Peticiones from "../pages/WebPeticiones";

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
                <Route path="/peticiones" element={<Peticiones />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/perfil" element={<MiPerfil />} />
                <Route path="/busqueda" element={<ListadoBusqueda />} />
                <Route path="/perfileditable" element={<PefilEditable />} />
                {/* <Route path="/*"/ element={Error}> */}
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
