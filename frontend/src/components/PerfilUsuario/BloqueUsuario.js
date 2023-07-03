import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

function BloqueUsuario() {
  const [user, setUser] = useState({
    alias: "",
    name: "",
    surname: "",
    email: "",
    birthday: "",
    country: "",
    city: "",
    linkedIn: "",
    education: "",
    extra_knowledge: "",
  });

  const { user_id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/user/${user_id}`)
      .then((response) => response.json())
      .then((user) => {
        setUser(user[0]);
        console.log(user);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [user_id]);

  const {
    alias,
    name,
    surname,
    email,
    birthday,
    country,
    city,
    linkedIn,
    education,
    extra_knowledge,
  } = user;

  const imagePath = `/users/user_${user_id}.jpg`; // Construir la ruta de la imagen

  return  (
    <Container>
      <div className="bg-light p-2 rounded-3 border-1 border">
        <div className="row">
          <div className="col-md-6 text-center mb-3">
            <div className="m-3">
              <img src={imagePath} alt="User" 
                style={{ maxHeight: '80%', maxWidth: '80%' }}
                className= "rounded-4"
              />
            </div>
            <div className="hstack gap-2 gap-xl-3 justify-content-center">
                <div>
                  <h6 className="mb-0">
                    <strong>{user.number_posts}</strong>
                  </h6>
                  <small>Post</small>
                </div>

                <div className="vr"></div>
                <div>
                  <h6 className="mb-0">
                    <strong>{user.number_friends}</strong>
                  </h6>
                  <small>Amigos</small>
                </div>
                <div className="vr"></div>
                <div>
                  <h6 className="mb-0">
                    <strong>{user.number_likes}</strong>
                  </h6>
                  <small>Likes</small>
                </div>
              </div>
          </div>
          <div className="col-md-6">
            <div className="mb-2">
              <b>Alias:</b>
              <p>{alias}</p>
              <b>Nombre:</b>
              <p>{name}</p>
              <b>Apellidos:</b>
              <p>{surname}</p>
              <b>Email:</b>
              <p>{email}</p>
              <b>Fecha de nacimiento:</b>
              <p>{birthday}</p>
              <b>País:</b>
              <p>{country}</p>
              <b>Ciudad:</b>
              <p>{city}</p>
              <b>Perfil de LinkedIn:</b>
              <p>{linkedIn}</p>
              <b>Formación:</b>
              <p>{education}</p>
              <b>Conocimientos Extras:</b>
              <p>{extra_knowledge}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default BloqueUsuario;
