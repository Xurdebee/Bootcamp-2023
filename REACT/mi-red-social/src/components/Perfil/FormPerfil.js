
import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

  const handleChange = (event) => {
    setPerfil({
      ...perfil,
      [event.target.name]: event.target.value,
      
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-8 col-md-8">
          <div className="row">
            <div className="col-12 col-md-6">
              <img
                src="foto-perfil.jpg"
                alt="Foto de perfil"
                className="img-fluid mb-3"
              />
            </div>
            <div className="col-12 col-md-6">
              <h5>Nombre completo</h5>
              <p>{perfil.nombre}</p>

              <h5>Ciudad</h5>
              <p>{perfil.ciudad}</p>

              <h5>Edad</h5>
              <p>{perfil.edad}</p>

              <h5>Estudios</h5>
              <p>{perfil.estudios}</p>

              <h5>Certificaciones</h5>
              <p>{perfil.certificaciones}</p>

              <h5>Idiomas</h5>
              <p>{perfil.idiomas}</p>

              <h5>Perfil LinkedIn</h5>
              <a href={perfil.linkedin}>{perfil.linkedin}</a>

              <h5>Hobbies</h5>
              <p>{perfil.hobbies}</p>

              <h5>Conocimientos extras</h5>
              <p>{perfil.conocimientos}</p>

              <div className="text-right mt-3">
                <button className="btn btn-primary">Editar campos</button>
                <button className="btn btn-danger ml-3">Eliminar cuenta</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
          <h4>Feedback / recomendaciones:</h4>
          <textarea
            className="form-control"
            name="feedback"
            value={perfil.feedback}
            onChange={handleChange}
          ></textarea>
          <textarea
            className="form-control"
            name="feedback"
            value={perfil.feedback}
            onChange={handleChange}
          ></textarea>
          <textarea
            className="form-control"
            name="feedback"
            value={perfil.feedback}
            onChange={handleChange}
          ></textarea>
          <textarea
            className="form-control"
            name="feedback"
            value={perfil.feedback}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default FormPerfil;
