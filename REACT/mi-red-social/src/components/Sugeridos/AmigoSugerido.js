import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AmigoSugerido = ({ userId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/suggested/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Agregar esta línea para verificar los datos en la consola
        setUsers(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  const followUser = (user_id, follow_user_id) => {
    fetch(`http://localhost:3000/follow/${user_id}/${follow_user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Si la eliminación es exitosa, recargar la lista de amigos para reflejar los cambios
        setUsers([]);
        fetch(`http://localhost:3000/suggested/${userId}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setUsers(data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row>
        {users.map(user => (
          <Col key={user.user_id} xs={6} sm={4} md={3} lg={3} xxl={2}>
              <div className="text-center mb-5">
                    <a href="#">
                      <img className="rounded-circle" src={user.image} width="70" alt="" />
                    </a>
                  <div className="overflow-hidden">
                    <a className="h6 mb-0" href={`/user/${user.follow_user_id}`}>
                      {user.name} {user.surname}
                    </a>
                    <p className="mb-2 small text-truncate">{user.alias}</p>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => followUser(user.user_id, user.follow_user_id)}
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
};

export default AmigoSugerido;