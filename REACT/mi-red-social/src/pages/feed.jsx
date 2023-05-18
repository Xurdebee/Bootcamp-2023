import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import ColumnaSugeridos from '../components/Feed/ColumnaSugeridos';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColumnaUsuario from '../components/Feed/ColumnaUsuario';




function App() {
  return (
    <>
        <NavBar />
        <div className="row mt-3">
          <div className="col-lg-3">
            <ColumnaUsuario/>
          </div>
          {/* <div className="col-lg-6">
            <ColumnaPost/>
          </div> */}
          <div className="col-lg-3">
            <ColumnaSugeridos/>
          </div>
        </div>
        <Footer />
    </>
    
  );
}

export default App;