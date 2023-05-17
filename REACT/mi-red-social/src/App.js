import React from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import ColumnaSugeridos from './components/ColumnaSugeridos';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColumnaUsuario from './components/ColumnaUsuario';
import AmigoSugerido from './components/AmigoSugerido';




function App() {
  return (
    <div>
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
