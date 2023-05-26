import React, { useState, useEffect } from "react";

function FormPerfil () {
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

  useEffect(() => { // useEffect se utiliza para realizar una solicitud al backend y actualizar el estado del componente con los datos del usuario.
    // Obtener el user_id del localStorage
    const user_id = localStorage.getItem('user_id');
    // Realizar la solicitud al backend para obtener los datos del usuario
    fetch(`http://localhost:3000/usersmyprofile/${user_id}`) 
      .then((response) => response.json())
      .then((data) => {
        // Actualizar los estados con los datos del usuario recibidos del backend
        setAlias(data.alias);
        setName(data.name);
        setSurname(data.surname);
        setEmail(data.email);
        setPassword(data.password);
        setBirthday(data.birthday);
        setCountry(data.country);
        setCity(data.city);
        setLinkedIn(data.linkedIn);
        setEducation(data.education);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);

 const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario al actualizar el registro
        //Similar al handleSubit para cuando creas el registro al pulsar en el botón 
      // Crear el objeto con los datos actualizados
    const updatedData = {
      alias,
      name,
      surname,
      email,
      password,
      birthday,
      country,
      city,
      linkedIn,
      education
    };  

    // Obtener el user_id del localStorage
    const user_id = localStorage.getItem('user_id');

    // Realizar la solicitud PUT al servidor
    fetch(`http://localhost:3000/updateregister/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos actualizados correctamente:", data);
        //notificación de éxito
        alert('Actualización del registro con exito');
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
        // mostrar un mensaje de error 
        alert('Error al actualizar los datos');
      });
    

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

  return (
    <div className="container formulario mb-2">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-bg-light text-muted p-4 mt-2">
              Mi perfil de usuario
            </h2>
            <form className="form-registro p-3" onSubmit={handleSubmit} onReset={handleReset}>
              <div id="mensaje-confirmacion" className="oculto"></div>
  
              <div className="form-group ">
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
                onChange={(e) => setCountry(e.target.value)}
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
                onChange={(e) => setCity(e.target.value)}
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
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="education">Formación</label>
              <textarea 
                className="form-control"
                id="education" 
                rows="3" 
                value={education}
                onChange={(e) => setEducation(e.target.value)}>
              </textarea>
            </div>
            
            <div className="btn-container d-flex justify-content-evenly mb-1">
                <button type="reset" className="btn btn-secondary m-2">Limpiar</button>
                <button type="submit" className="btn btn-primary m-2">Enviar</button>
                <a href="/feed" className="btn btn-danger  m-2">Cancelar</a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}



export default FormPerfil;