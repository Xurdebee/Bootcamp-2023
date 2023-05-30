import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PerfilEditable() {

  const [user, setUser] = useState({
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
    extra_knowledge: "",
    image: "",
  });
  const user_id = localStorage.getItem("user_id");
  useEffect(() => { 
    fetch(`http://localhost:3000/user/${user_id}`)
      .then((response) => response.json())
      .then((user) => {
        setUser(user[0]);
        console.log(user);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [user_id]);

  const handleChange = (event) => {

    setUser({
      ...user,

      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUser({
        ...user,
        image: e.target.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id");
    fetch(`http://localhost:3000/user/${user_id}`, {

      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
    setUser({
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
      extra_knowledge: "",
      image: "",

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
    extra_knowledge,
    image,
  } = user;

  return (
    <div className="container">
      <div className="row">
      <div className="col-md-3 d-flex justify-content-center">
            <div style={{marginTop: "150px"}}>
            <img src={image} alt="User" style={{width: "250px", height: "250px", border: '2px solid #007bff'}}/>
            <input type="file" onChange={handleImageChange} accept="image/*" />
          </div>
          </div>
        <div className="col-md-6 ">
        <div className="mb-2">
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
              <label htmlFor="alias"><b>Alias</b></label>
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
              <label htmlFor="name"><b>Nombre</b></label>
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
              <label htmlFor="surname"><b>Apellidos</b></label>
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
              <label htmlFor="email"><b>Email</b></label>
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
              <label htmlFor="password"><b>Contraseña</b></label>
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
              <label htmlFor="birthday"><b>Fecha de nacimiento</b></label>
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
              <label htmlFor="country"><b>País</b></label>
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
              <label htmlFor="city"><b>Ciudad</b></label>
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
              <label htmlFor="linkedin"><b>Perfil de LinkedIn</b></label>
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
              <label htmlFor="education"><b>Formación</b></label>
              <textarea
                className="form-control"
                id="education"
                name="education"
                rows="3"
                value={education}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="extra_knowledge"><b>Conocimiento extra</b></label>
              <textarea
                className="form-control"
                id="extra_knowledge"
                name="extra_knowledge"
                rows="3"
                value={extra_knowledge}
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
    </div>
  );
}

export default PerfilEditable;
