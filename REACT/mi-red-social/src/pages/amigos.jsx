import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColumnaUsuario from '../components/UserFeed/ColumnaUsuario';
import BloqueAmigos from '../components/Amigos/BloqueAmigos';



function App() {
  return (
    <>
        <NavBar />

      <div className="row mt-3 text-center m-3">
        <div className="col-lg-3 mb-4">
          <ColumnaUsuario/>
        </div>
        <div className="col-lg-9 mb-4">
          <BloqueAmigos/>
        </div>
      </div>

      <Footer />

    </>
    
  );
}

export default App;