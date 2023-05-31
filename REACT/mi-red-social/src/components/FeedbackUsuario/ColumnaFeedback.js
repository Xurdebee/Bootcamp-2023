import React, { useEffect, useState } from "react";
import ListaFeedback from "./ListaFeedback";
import { Container } from "react-bootstrap";
import NuevoFeedback from "./NuevoFeedback";

function ColumnaFeedback() {
  const user_id = localStorage.getItem("user_id");
  const url = window.location.href;
  const feedback_user_id = url.match(/\/user\/(\d+)/)[1]; // saca los valores numericos de la url
  const [reloadFeedback, setReloadFeedback] = useState(false);
  const [conFeedback, setConFeedback] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario logueado ha dejado un comentario en el perfil del usuario visitado
    fetch(`http://localhost:3000/checkfeedback/${user_id}/${feedback_user_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud");
        }
      })
      .then((data) => {
        const hasFeedback = data.hasFeedback;
        setConFeedback(hasFeedback);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id, feedback_user_id, reloadFeedback]);

  const handleNewFeedback = () => {
    // Cambiar el estado para recargar los feedbacks
    setReloadFeedback(true);
  };

  return (
    <Container>
      <div className="card">
        <div className="card-header pb-1 border-0">
          <h5 className="card-title mb-2">Opiniones:</h5>
        </div>
        {!conFeedback && (
          <article className="m-3">
            <NuevoFeedback
              user_id={user_id}
              feedback_user_id={feedback_user_id}
              feedbackCreado={handleNewFeedback} // Pasar la función de manejo
            />
          </article>
        )}
        <article>
          <ListaFeedback
            feedback_user_id={feedback_user_id}
            reloadFeedback={reloadFeedback} // Pasar el estado
          />
        </article>
      </div>
    </Container>
  );
}

export default ColumnaFeedback;
