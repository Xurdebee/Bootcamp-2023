import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function MiPerfil() {
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
    image: "",
    feedback: "",
  });

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/user/${user_id}`)
      .then((response) => response.json())
      .then((user) => {
        setUser(user[0]);
        console.log(user);
      })
      .catch((error) => console.error("Error:", error));
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
    image,
  } = user;

  return (
  <Container>
    <div className="bg-light p-2 rounded-3 border-1 borde">
      <div className="row">
        <div className="col-md-6 text-center mb-3">
          <div className="m-3">
            <img
              src={image}
              alt="User" 
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
            <a href="/perfil-editable" className="btn btn-secondary m-2">
              Editar
            </a>
          </div>
        </div>
        <div className="col-md-3">{/* componente feedback */}</div>
      </div>
    </div>
  </Container>
  );
}

export default MiPerfil;
