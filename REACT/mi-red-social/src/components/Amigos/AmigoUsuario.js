import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const AmigoUsuario = ({ user_id }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/friends/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  const unfriendUser = (friend_user_id) => {
    fetch(`http://localhost:3000/unfriend/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, friend_user_id }),
    })
      .then((response) => {
        console.log("Amigo eliminado con exito");

        // Actualizar la lista de usuarios
        fetch(`http://localhost:3000/friends/${user_id}`)
          .then((response) => response.json())
          .then((data) => {
            setUsers(data);
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
          <Col key={user.friend_user_id} xs={6} sm={4} md={3} lg={3} xxl={2}>
            <div className="text-center mb-5">
              <a href={`/user/${user.friend_user_id}`}>
                <img
                  className="rounded-circle"
                  src={user.image}
                  width="70"
                  alt=""
                />
              </a>
              <div className="overflow-hidden">
                <a className="h6 mb-0" href={`/user/${user.friend_user_id}`}>
                  {user.name} {user.surname}
                </a>
                <p className="mb-2 small text-truncate">{user.alias}</p>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => unfriendUser(user.friend_user_id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AmigoUsuario;
