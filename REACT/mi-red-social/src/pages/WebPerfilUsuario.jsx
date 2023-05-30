import React from "react";
import BloqueUsuario from "../components/PerfilUsuario/BloqueUsuario";
import ColumnaFeedback from "../components/PerfilUsuario/ColumnaFeedback";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <> 
      <div className="row mt-3">
        <div className="col-lg-7 mb-4">
          <BloqueUsuario />
        </div>
        <div className="col-lg-5 mb-4">
          <ColumnaFeedback />
        </div>
      </div>
    </>
  );
}

export default App;
