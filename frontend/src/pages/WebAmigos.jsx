import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnaMiUsuario from "../components/ColumnaMiUsuario/ColumnaMiUsuario";
import BloqueAmigos from "../components/UsuariosAmigos/BloqueAmigos";

function App() {
  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-3 mb-4">
          <ColumnaMiUsuario />
        </div>
        <div className="col-lg-9 mb-4">
          <BloqueAmigos />
        </div>
      </div>
    </>
  );
}

export default App;
