import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListadoBusqueda from "../components/UsuariosBusqueda/ListadoBusqueda";
import ColumnaMiUsuario from "../components/ColumnaMiUsuario/ColumnaMiUsuario";

function App() {
  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-3 mb-4">
            <ColumnaMiUsuario />
          </div>
          <div className="col-lg-9 mb-4">
            <ListadoBusqueda />
        </div>
      </div>
    </>
  );
}

export default App;