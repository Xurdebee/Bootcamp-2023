import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function MiPerfil() {
  const [profile, setProfile] = useState({
    alias: "",
    name: "",
    surname: "",
    email: "",
    birthday: "",
    country: "",
    city: "",
    linkedIn: "",
    education: "",
    feedback: "",
  });

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    fetch(`http://localhost:3000/usersmyprofile/${user_id}`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
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
  } = profile;

  return (
    <div className="container formulario mb-2">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-bg-light text-muted p-4 mt-2">
            Mi perfil de usuario
          </h2>
          <div className="form-registro p-3">
            <div id="mensaje-confirmacion" className="oculto"></div>

            <div className="form-group">
              <label><b>Alias</b></label>
              <p className="border-0">{alias}</p>
            </div>

            <div className="form-group">
              <label><b>Nombre</b></label>
              <p className="border-0">{name}</p>
            </div>

            <div className="form-group">
              <label><b>Apellidos</b></label>
              <p className="border-0">{surname}</p>
            </div>

            <div className="form-group">
              <label><b>Email</b></label>
              <p className="border-0">{email}</p>
            </div>

            <div className="form-group">
              <label><b>Fecha de nacimiento</b></label>
              <p className="border-0">{birthday}</p>
            </div>

            <div className="form-group">
              <label><b>País</b></label>
              <p className="border-0">{country}</p>
            </div>

            <div className="form-group">
              <label><b>Ciudad</b></label>
              <p className="border-0">{city}</p>
            </div>

            <div className="form-group">
              <label><b>Perfil de LinkedIn</b></label>
              <p className="border-0">{linkedIn}</p>
            </div>

            <div className="form-group">
              <label><b>Formación</b></label>
              <p className="border-0">{education}</p>
            </div>

            <div className="btn-container d-flex justify-content-evenly mb-1">
              <a href="/perfileditable" className="btn btn-secondary m-2">
                Editar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiPerfil;
