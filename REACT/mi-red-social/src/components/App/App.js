import React from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import ColumnaSugeridos from './components/ColumnaSugeridos';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColumnaUsuario from './components/ColumnaUsuario';
import AmigoSugerido from './components/AmigoSugerido';

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
