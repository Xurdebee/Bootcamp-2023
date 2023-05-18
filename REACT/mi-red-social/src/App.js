// import { BrowserRouter, Route, Link } from "react-router-dom";
import React from 'react';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginForm from './components/Login/LoginForm';
import ColumnaUsuario from './components/UserFeed/ColumnaUsuario';
import ColumnaPost from './components/UserFeed/ColumnaPost';
import ColumnaSugeridos from './components/UserFeed/ColumnaSugeridos';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { RouterPrincipal } from "./Router/RouterPrincipal";


//no es necesario si no utilizamos los css para toda la web, estructura sacada de Silvia
// import "./App.css";

function App() {
  return (
    <div>

      {/* dentro de esto cargamos las rutas que tengamos
      
      <>
        <Routes>
          <route path="/" element={<Login/>}/}
          <route path="/feed" element={<Feed/>}/}
        </Routes>
       </>

       */}
    
      <NavBar />
      {/* <LoginForm/> */}
      <div className="row mt-3 m-3">
        <div className="col-lg-3">
          <ColumnaUsuario/>
        </div>
        <div className="col-lg-6">
          <ColumnaPost/>
        </div>
        <div className="col-lg-3">
          <ColumnaSugeridos/>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default App;
