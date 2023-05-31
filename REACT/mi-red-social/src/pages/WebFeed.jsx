import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnaMiUsuario from "../components/ColumnaMiUsuario/ColumnaMiUsuario";
import ColumnaSugeridos from "../components/UserFeed/ColumnaSugeridos";
import ColumnaPost from "../components/UserFeed/ColumnaPost";

function App() {
  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-3 mb-4">
          <ColumnaMiUsuario />
        </div>
        <div className="col-lg-6 mb-4">
          <ColumnaPost />
        </div>
        <div className="col-lg-3">
          <ColumnaSugeridos />
        </div>
      </div>
    </>
  );
}

export default App;
