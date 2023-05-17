// importar los componentes de react-router-dom
// import { BrowserRouter, Route, Link } from "react-router-dom";

import React from 'react';

import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginForm from './components/Login/LoginForm';
import ColumnaSugeridos from './components/Feed/ColumnaSugeridos';

import 'bootstrap/dist/css/bootstrap.min.css';
import ColumnaUsuario from './components/Feed/ColumnaUsuario';
import AmigoSugerido from './components/Feed/AmigoSugerido';

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
      <div className="row mt-3">
        <div className="col-lg-3">
          <ColumnaUsuario/>
        </div>
        {/* <div className="col-lg-6">
          <ColumnaPost/>
        </div> */}
        <div className="col-lg-3">
          <ColumnaSugeridos><AmigoSugerido/></ColumnaSugeridos>
        </div>
      </div>

      <Footer />

    </div>

  );
}


export default App;
