import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function FormPerfil() {
  const [perfil, setPerfil] = useState({
    nombre: "",
    ciudad: "",
    edad: "",
    estudios: "",
    certificaciones: "",
    idiomas: "",
    linkedin: "",
    hobbies: "",
    conocimientos: "",
    feedback: "",
  });

  useEffect(() => {
    // Obtener el user_id del localStorage
    const user_id = localStorage.getItem("user_id");
    // Realizar la solicitud al backend para obtener los datos del usuario
    fetch(`http://localhost:3000/usersmyprofile/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        // Actualizar los estados con los datos del usuario recibidos del backend
        setPerfil(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);

  const handleChange = (event) => {
    setPerfil({
      ...perfil,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario al actualizar el registro
    // ...

    // Obtener el user_id del localStorage
    const user_id = localStorage.getItem("user_id");

    // Realizar la solicitud PUT al servidor
    fetch(`http://localhost:3000/updateregister/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perfil),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos actualizados correctamente:", data);
        // notificación de éxito
        alert("Actualización del registro con éxito");
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
        // mostrar un mensaje de error
        alert("Error al actualizar los datos");
      });
  };

  const handleReset = () => {
    setPerfil({
      nombre: "",
      ciudad: "",
      edad: "",
      estudios: "",
      certificaciones: "",
      idiomas: "",
      linkedin: "",
      hobbies: "",
      conocimientos: "",
      feedback: "",
    });
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
}

export default FormPerfil;
