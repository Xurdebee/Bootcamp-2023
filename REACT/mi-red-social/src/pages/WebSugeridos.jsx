import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColumnaUsuario from '../components/UserFeed/ColumnaUsuario';
import BloqueSugeridos from '../components/Sugeridos/BloqueSugeridos';



function App() {
  return (
    <>

      <div className="row mt-3 m-3">
        <div className="col-lg-3 mb-4">
          <ColumnaUsuario/>
        </div>
        <div className="col-lg-9 mb-4">
          <BloqueSugeridos/>
        </div>
      </div>


    </>
    
  );
}

export default App;