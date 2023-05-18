// import { BrowserRouter, Route, Link } from "react-router-dom";
import React from 'react';

import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginForm from './components/Login/LoginForm';
import ColumnaSugeridos from './components/Feed/ColumnaSugeridos';
import ColumnaUsuario from './components/Feed/ColumnaUsuario';
import AmigoSugerido from './components/Feed/AmigoSugerido';
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterPrincipal } from "./Router/RouterPrincipal";

//no es necesario si no utilizamos los css para toda la web, estructura sacada de Silvia
// import "./App.css";

function App() {
  return (
    <div>
      <RouterPrincipal />
    </div>
  );
}

export default App;
