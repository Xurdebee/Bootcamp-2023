import React, { useState } from "react";
import { Container } from "react-bootstrap";

function RegistroForm() {
  const [alias, setAlias] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [education, setEducation] = useState("");
  const [extra_knowledge, setExtraKnowledge] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/newregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });

      if (response.ok) {
        alert("El usuario ha sido registrado exitosamente");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        alert("Error al crear el usuario, alias o email ya registrados");
      }
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error al crear el usuario");
    }
  };

  const handleReset = () => {
    setAlias("");
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setBirthday("");
    setCountry("");
    setCity("");
    setLinkedIn("");
    setEducation("");
    setExtraKnowledge("");
  };

  return (
    <Container className=" mt-4">
      <div className={`d-flex justify-content-center align-items-center ${window.innerHeight > 985 ? 'vh-100' : ''}`}>
        <div className="card bg-light shadow-lg">
          <div className="row d-flex m-3">
            <div className="col-md-6 d-flex justify-content-center align-items-center p-5">
              <img className="img-fluid" src="logo_horizontal.png" alt="logo" />
            </div>
            <form
              className="col-md-6 justify-content-center"
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
              <div className="mb-3 ">
                <label htmlFor="alias"> Alias</label>
                <input
                  type="text"
                  className="form-control"
                  id="alias"
                  name="username"
                  value={alias}
                  onChange={(event) => setAlias(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="fullname"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="surname">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  name="fullname"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthday">Fecha de nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="age"
                  value={birthday}
                  onChange={(event) => setBirthday(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country">País</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="linkedin">Perfil de LinkedIn</label>
                <input
                  type="text"
                  className="form-control"
                  id="linkedin"
                  name="linkedin"
                  value={linkedIn}
                  onChange={(event) => setLinkedIn(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="education">Formación</label>
                <select
                  className="form-control"
                  id="education"
                  value={education}
                  onChange={(event) => setEducation(event.target.value)}
                >
                  <option value="none">Selecciona un nivel</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Bachillerato">Bachillerato</option>
                  <option value="Formacion Profesional">
                    Formación Profesional
                  </option>
                  <option value="Universidad">Universidad</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="extraknowledge">Conocimiento Extra</label>
                <input
                  type="text"
                  className="form-control"
                  id="extraknowledge"
                  name="extraknowledge"
                  value={extra_knowledge}
                  onChange={(event) => setExtraKnowledge(event.target.value)}
                />
              </div>
              <div className="btn-container d-flex justify-content-evenly my-3">
                <button type="reset" className="btn btn-secondary m-2">
                  Limpiar
                </button>
                <button type="submit" className="btn btn-primary m-2">
                  Enviar
                </button>
                <a href="/" className="btn btn-danger m-2">
                  Cancelar
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default RegistroForm;
