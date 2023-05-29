import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function PerfilUsuario() {
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

  const { user_id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${user_id}`)
      .then((response) => response.json())
      .then((user) => {
        setUser(user[0]);
        console.log(user);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

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

  const imagePath = `/users/user_${user_id}.jpg`; // Construir la ruta de la imagen

  return  (
    <div className="container">
    <div className="row">
      <div className="col-md-3 d-flex justify-content-center">
            <div style={{marginTop: "150px"}}>
            <img src={imagePath} alt="User" style={{width: "250px", height: "250px", border: '2px solid #007bff'}}/>
          </div>
          </div>
          <div className="col-md-6">
          <div className="mb-2">
          <div id="mensaje-confirmacion" className="oculto"></div>
          <p><b>Alias:</b> {alias}</p>
          <p><b>Nombre:</b> {name}</p>
          <p><b>Apellidos:</b> {surname}</p>
          <p><b>Email:</b> {email}</p>
          <p><b>Fecha de nacimiento:</b> {birthday}</p>
          <p><b>País:</b> {country}</p>
          <p><b>Ciudad:</b> {city}</p>
          <p><b>Perfil de LinkedIn:</b> {linkedIn}</p>
          <p><b>Formación:</b> {education}</p>
          <p><b>Conocimientos Extras:</b> {extra_knowledge}</p>
        
      </div>
      </div>
      <div className="col-md-3">
        {/* componente feedback */}
      </div>
    </div>
  </div>
);
}
export default PerfilUsuario;
