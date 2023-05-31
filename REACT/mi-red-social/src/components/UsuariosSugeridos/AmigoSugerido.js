import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function AmigoSugerido({ user_id }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/suggested/${user_id}`)
      .then((response) => response.json())
      .then((suggested) => {
        setUsers(suggested);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  const friendUser = (new_id) => {
    const localStorageUserId = localStorage.getItem("user_id");
    fetch("http://localhost:3000/newfriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: localStorageUserId, new_id}),
    })
      .then((response) => {
        console.log("Amistad solicitada con exito");

        // Actualizar la lista de usuarios sugeridos después de hacer el seguimiento
        fetch(`http://localhost:3000/suggested/${user_id}`)
          .then((response) => response.json())
          .then((suggested) => {
            setUsers(suggested);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        {users.map((user) => (
          <Col key={user.new_id} xs={6} sm={4} md={3} lg={3} xxl={2}>
            <div className="text-center mb-5">
              <a href={`/user/${user.new_id}`}>
                <img
                  className="rounded-circle"
                  src={user.image}
                  width="70"
                  alt=""
                />
              </a>
              <div className="overflow-hidden">
                <a className="h6 mb-0" href={`/user/${user.new_id}`}>
                  {user.name} {user.surname}
                </a>
                <p className="mb-2 small text-truncate">{user.alias}</p>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => friendUser(user.new_id)}
                >
                  Añadir
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AmigoSugerido;
