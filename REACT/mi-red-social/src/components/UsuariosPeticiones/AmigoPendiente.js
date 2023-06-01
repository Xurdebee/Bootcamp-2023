import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function AmigoPendiente({ user_id }) {
  const [users, setPendings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/pending/${user_id}`)
      .then((response) => response.json())
      .then((user) => {
        setPendings(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  const acceptFriend = (new_id) => {
    const localStorageUserId = localStorage.getItem("user_id");
    fetch("http://localhost:3000/api/users/acceptfriend", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: localStorageUserId, new_id}),
    })
      .then((response) => {
        console.log("Amistad aceptada");

        // Actualizar la lista de usuarios sugeridos después de hacer el seguimiento
        fetch(`http://localhost:3000/api/users/pending/${user_id}`)
          .then((response) => response.json())
          .then((user) => {
            setPendings(user);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectFriend = (new_id) => {
    const localStorageUserId = localStorage.getItem("user_id");
    fetch("http://localhost:3000/api/users/unfriend", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: localStorageUserId, new_id}),
    })
      .then((response) => {
        console.log("Amistad rechazada");

        // Actualizar la lista de usuarios sugeridos después de hacer el seguimiento
        fetch(`http://localhost:3000/api/users/pending/${user_id}`)
          .then((response) => response.json())
          .then((user) => {
            setPendings(user);
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
                <div>
                  <button
                    className="btn btn-outline-success btn-sm m-1"
                    onClick={() => acceptFriend(user.new_id)}
                  >
                    Aceptar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm m-1"
                    onClick={() => rejectFriend(user.new_id)}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AmigoPendiente;
