import React, { useState } from 'react';

const ListadoBusqueda = () => {
  const [alias, setAlias] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setAlias(event.target.value);
  };

  const handleSearch = async () => {
    console.log("hola")
    console.log(alias)
    /*const response = await fetch(`http://localhost:3000/users/${alias}`);
      const data = await response.json();
      console.log(data); // Mostrar la respuesta JSON en la consola*/

    try {
      const response = await fetch(`http://localhost:3000/users/${alias}`);
      const data = await response.json();
      console.log(data); // Mostrar la respuesta JSON en la consola

      if (data.length > 0) {
        setSearchResults(data);
        setError('');
      } else {
        setSearchResults([]);
        setError('0 coincidencias');
      }
    } catch (error) {
      console.error(error);
      setError('Error al ejecutar la consulta: ' + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={alias}
        onChange={handleInputChange}
        placeholder="Introduce un alias"
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p>{error}</p>}

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              <div className="text-center mb-5">
                {/*  Sustituir en href por URL del perfil del usuario */}
                <a href={user.profileUrl}> 
                  <img
                    className="rounded-circle"
                    src={user.image}
                    width="50"
                    alt=""
                  />
                </a>
                <div>
                  <a className="h6 mb-0" href={user.profileUrl}>
                  {user.name} {user.surname} 
                  </a>
                  <p className="mb-2 small text-truncate">{user.alias}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListadoBusqueda;








