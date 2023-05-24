import React, { useState } from "react";

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
    
  
    const handleSubmit = (event) => {
      event.preventDefault(); //evita que la página se recargue y se pierda la información ingresada por el usuario
      // Falta el código para manejar el envío del formulario 
      
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

    };

    try {
      const response = await fetch("http://localhost:3000/newregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Usuario creado satisfactoriamente.");
        window.location.href = "/";
      } else {
        console.error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
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
    setEducation("none");
  };

  return (
    <div className="container formulario mb-2">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-bg-light text-muted p-4 mt-2">
            Formulario de Registro
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
                name="username"
                value={alias}
                onChange={(e) => setAlias(e.target.value)} //e es lo mismo que event
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="surname"
                name="fullname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="age"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
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
                onChange={(event) => setCountry(event.target.value)}
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
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="education">Formación</label>
              <select
                className="form-control"
                id="education"
                value={education}
                onChange={(event) => setEducation(event.target.value)}
              >
                <option value="none">Selecciona un nivel</option>
                <option value="primaria">Primaria</option>
                <option value="secundaria">Secundaria</option>
                <option value="bachillerato">Bachillerato</option>
                <option value="universidad">Universidad</option>
              </select>
            </div>

            <div className="btn-container d-flex justify-content-evenly mb-1">
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
  );
}

export default RegistroForm;
