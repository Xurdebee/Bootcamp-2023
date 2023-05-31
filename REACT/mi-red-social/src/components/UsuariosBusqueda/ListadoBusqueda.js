import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const ListadoBusqueda = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchValue = searchParams.get("value");

    fetch(`http://localhost:3000/search/${searchValue}`)
      .then((response) => response.json())
      .then((user) => {
        setSearchResults(user);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  return (
    <Container>
      <div className="bg-light p-2 rounded-3 border-1 border">
        <div className="text-center my-3">
          {searchResults.length > 0 ? (
            <Row>
              {searchResults.map((user) => (
                <Col key={user.user_id} xs={6} sm={4} md={3} lg={3} xxl={2}>
                  <div className="text-center mb-5">
                    <a href={`/user/${user.user_id}`}>
                      <img
                        className="rounded-circle"
                        src={user.image}
                        width="70"
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
          ) : (
            <b>No hay ningún usuario con esos datos.</b>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ListadoBusqueda;
