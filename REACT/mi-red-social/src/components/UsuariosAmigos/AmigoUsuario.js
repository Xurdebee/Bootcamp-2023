import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const AmigoUsuario = ({ user_id }) => {
  const [users, setFriends] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/friends/${user_id}`)
      .then((response) => response.json())
      .then((friend) => {
        setFriends(friend);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  const unfriendUser = (new_id) => {
    const localStorageUserId = localStorage.getItem("user_id");

    fetch(`http://localhost:3000/unfriend`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: localStorageUserId, new_id}),
    })
      .then((response) => {
        console.log("Amigo eliminado con exito");

        // Actualizar la lista de usuarios
        fetch(`http://localhost:3000/friends/${user_id}`)
          .then((response) => response.json())
          .then((friend) => {
            setFriends(friend);
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
        {users.map((friend) => (
          <Col key={friend.new_id} xs={6} sm={4} md={3} lg={3} xxl={2}>
            <div className="text-center mb-5">
              <a href={`/user/${friend.new_id}`}>
                <img
                  className="rounded-circle"
                  src={friend.image}
                  width="70"
                  alt=""
                />
              </a>
              <div className="overflow-hidden">
                <a className="h6 mb-0" href={`/user/${friend.new_id}`}>
                  {friend.name} {friend.surname}
                </a>
                <p className="mb-2 small text-truncate">{friend.alias}</p>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => unfriendUser(friend.new_id)}
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
