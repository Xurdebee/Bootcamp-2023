import React, { useState, useEffect } from "react";

function ListadoBusqueda() {
  const [alias, setAlias] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleAliasChange = (event) => {
    setAlias(event.target.value);
  };

  useEffect(() => {
    if (alias !== "") {
      fetch(`http://localhost:3000/users/${alias}`)
        .then((response) => response.json())
        .then((data) => setResultados(data))
        .catch((error) => console.log(error));
    }
  }, [alias]);

  return (
    <div>
      <input
        type="text"
        value={alias}
        onChange={handleAliasChange}
        placeholder="Introduce un alias"
      />
      <h2 className="text-center text-bg-light text-muted p-4 mt-2">
        Resultado de la búsqueda:
      </h2>

      <ul>
        {resultados.length > 0 ? (
          resultados.map((resultado) => (
            <li key={resultado.id}>{resultado.nombre}</li>
          ))
        ) : (
          <p>No se encontraron coincidencias.</p>
        )}
      </ul>
    </div>
  );
}

export default ListadoBusqueda;




