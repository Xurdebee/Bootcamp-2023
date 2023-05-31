import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const ListadoBusqueda = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const alias = urlParams.get("alias");

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${alias}`);
        const data = await response.json();

        if (data.length > 0) {
          setSearchResults(data);
          setError("");
        } else {
          setSearchResults([]);
          setError("Hay 0 coincidencias con los datos introducidos");
        }
      } catch (error) {
        console.error(error);
        setError("Error al ejecutar la consulta: " + error.message);
      }
    };

    if (alias) {
      fetchData();
    }
  }, []);

  return (
    <Container>
      <div className="bg-light p-2 rounded-3 border-1 border">
        <div className="text-center mb-3">
      {error && <p>{error}</p>}

      {searchResults.length > 0 && (
        <Row>
          {searchResults.map((user) => (
            <Col key={user.id} xs={6} sm={4} md={3} lg={3} xxl={2}>
              <div className="text-center mb-5">
                {/*  Sustituir en href por URL del perfil del usuario */}
                <a href={`/user/${user.user_id}`}>
                  <img
                    className="rounded-circle"
                    src={user.image}
                    width="50"
                    alt=""
                  />
                </a>
                <div>
                  <a className="h6 mb-0" href={`/user/${user.user_id}`}>
                    {user.name} {user.surname}
                  </a>
                  <p className="mb-2 small text-truncate">{user.alias}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
      </div>
      </div>
    </Container>
  );
};

export default ListadoBusqueda;
