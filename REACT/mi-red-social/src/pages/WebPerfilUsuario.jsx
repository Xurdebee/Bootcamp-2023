import React, { useEffect } from "react";
import BloqueUsuario from "../components/PerfilUsuario/BloqueUsuario";
import ColumnaFeedback from "../components/PerfilUsuario/ColumnaFeedback";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const user_id = localStorage.getItem("user_id");
  const url = window.location.href;
  const user_visited = url.match(/\/user\/(\d+)/)[1]; // saca los valores numericos de la url

  useEffect(() => {
    if (user_id === user_visited) {
      window.location.href = "/perfil";
    }
  }, [user_id, user_visited]);

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
