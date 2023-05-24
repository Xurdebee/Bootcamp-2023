import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PerfilEditable() {

  const [profile, setProfile] = useState({
    alias: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    birthday: "",
    country: "",
    city: "",
    linkedIn: "",
    education: "",
  });

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    fetch(`http://localhost:3000/usersmyprofile/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleChange = (event) => {

    setProfile({
      ...profile,

      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id");
    fetch(`http://localhost:3000/usersmyprofile/${user_id}`, {

      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al actualizar los datos del usuario:", error);

      });
  };

  const handleReset = () => {
    setProfile({
      alias: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      birthday: "",
      country: "",
      city: "",
      linkedIn: "",
      education: "",

    });
  };

  const {
    alias,
    name,
    surname,
    email,
    password,
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
          <form
            className="form-registro p-3"
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <div id="mensaje-confirmacion" className="oculto"></div>

            <div className="form-group">
              <label htmlFor="alias"> Alias</label>
              <input
                type="text"
                className="form-control"
                id="alias"
                name="alias"
                value={alias}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="surname"
                name="surname"
                value={surname}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthday">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                value={birthday}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">País</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={country}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedin">Perfil de LinkedIn</label>
              <input
                type="text"
                className="form-control"
                id="linkedin"
                name="linkedIn"
                value={linkedIn}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="education">Formación</label>
              <textarea
                className="form-control"
                id="education"
                name="education"
                rows="3"
                value={education}
                onChange={handleChange}
              />
            </div>

            <div className="btn-container d-flex justify-content-evenly mb-1">
              <button type="reset" className="btn btn-secondary m-2">
                Limpiar
              </button>
              <button type="submit" className="btn btn-primary m-2">
                Enviar
              </button>
              <a href="/perfil" className="btn btn-danger m-2">
                Cancelar
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PerfilEditable;
