import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnaUsuario from "../components/ColumnaUsuario/ColumnaUsuario";
import BloquePendientes from "../components/Peticiones/BloquePeticiones";

function App() {
  return (
    <>
      <div className="row mt-3 m-3">
        <div className="col-lg-3 mb-4">
          <ColumnaUsuario />
        </div>
        <div className="col-lg-9 mb-4">
          <BloquePendientes/>
        </div>
      </div>
    </>
  );
}

export default App;