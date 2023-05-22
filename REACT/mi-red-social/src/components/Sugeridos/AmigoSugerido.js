import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AmigoSugerido({ user_id }) {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    fetch(`http://localhost:3000/suggested/${user_id}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user_id]);

  const followUser = (follow_user_id) => {

    fetch('http://localhost:3000/newfollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id, follow_user_id })
    })
      .then(response => {

        console.log('Follow realizado con exito');

        // Actualizar la lista de usuarios sugeridos después de hacer el seguimiento
        fetch(`http://localhost:3000/suggested/${user_id}`)
          .then(response => response.json())
          .then(data => {
            setUsers(data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        {users.map(user => (
          <Col key={user.user_id} xs={6} sm={4} md={3} lg={3} xxl={2}>
              <div className="text-center mb-5">
                    <a href={`/user/${user.user_id}`}>
                      <img className="rounded-circle" src={user.image} width="70" alt="" />
                    </a>
                  <div className="overflow-hidden">
                    <a className="h6 mb-0" href={`/user/${user.user_id}`}>
                      {user.name} {user.surname}
                    </a>
                    <p className="mb-2 small text-truncate">{user.alias}</p>
                    <button className="btn btn-outline-success btn-sm" onClick={() => followUser(user.user_id)}>
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
