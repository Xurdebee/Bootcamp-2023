// importar los componentes de react-router-dom
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterPrincipal } from "./Router/RouterPrincipal";

//no es necesario si no utilizamos los css para toda la web, estructura sacada de Silvia
// import "./App.css";

function App() {
  return (
    <div>
      <RouterPrincipal />
    </div>
  );
}

export default App;
