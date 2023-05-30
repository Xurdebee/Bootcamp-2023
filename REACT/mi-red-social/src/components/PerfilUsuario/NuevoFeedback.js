import React, { useEffect, useState } from "react";

const NuevoFeedback = ({ user_id, feedback_user_id, feedbackCreado }) => {
  const [user, setUser] = useState({});
  const [body, setBody] = useState("");

  // Carga el usuario registrado para ver sus datos en el mensaje para enviar
  useEffect(() => {
    fetch(`http://localhost:3000/user/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (body.trim() === "") {
      alert("No estás enviando nada");
      return;
    }

    // Realizar la solicitud POST al endpoint /newfeedback
    fetch("http://localhost:3000/newfeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        feedback_user_id: feedback_user_id,
        feedback_text: body,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Llamar a la función onNewFeedback para recargar los feedbacks
        feedbackCreado();
      })
      .catch((error) => {
        console.log(error);
      });

    // Limpiar el contenido del textarea después de enviar el feedback
    setBody("");
  };

  return (
    <>
      <div
        className="p-2 rounded-3 border border-1 mb-4"
        style={{ backgroundColor: "rgb(178, 216, 255, 0.5)" }}
      >
        <div className="mb-0">
          <div className="mb-2 d-flex">
            <div className="me-2">
              <a className="h6 mb-0" href={`/user/${user.user_id}`}>
                {user.name} {user.surname}
              </a>
              <p className="mb-0 small text-truncate">{user.alias}</p>
            </div>
          </div>

          <form className="nav w-100" onSubmit={handleSubmit}>
            <textarea
              data-autoresize=""
              className="form-control bg-white"
              placeholder="Escribe tu opinión sobre el usuario. Solo podrás introducir una opinión y no podrás editarla después."
              style={{ height: "70px" }}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            ></textarea>

            <button
              className="nav-link border-0 bg-transparent ms-auto"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-send-fill"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoFeedback;
