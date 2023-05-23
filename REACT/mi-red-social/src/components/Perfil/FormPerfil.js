import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FormPerfil = () => {
  const [perfil, setPerfil] = useState({
    nombre: "Hugo García García",
    ciudad: "Gijón, Asturias",
    edad: "25",
    estudios: "Ingeniería Informática",
    certificaciones: "Microsoft Office Specialist",
    idiomas: "Español, Inglés",
    linkedin: "https://www.linkedin.com",
    hobbies: "Senderismo, Lectura, Música",
    conocimientos: "Programación en Python, JavaScript",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt.",
  });

  const handleChange = (event) => {
    setPerfil({
      ...perfil,
      [event.target.name]: event.target.value,
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
};

export default FormPerfil;
