import React from "react";
import MiPerfil from "../components/Perfil/MiPerfil";
import "bootstrap/dist/css/bootstrap.min.css";
// import ColumnaFeedback from "../components/PerfilUsuario/ColumnaFeedback";

function App() {
  return (
    <>
    <div className="row mt-3">
        <div className="col-lg-7 mb-4">
          <MiPerfil />
        </div>
        {/* <div className="col-lg-5 mb-4">
          <ColumnaFeedback />
        </div> */}
      </div>
    </>
  );
}

export default App;
