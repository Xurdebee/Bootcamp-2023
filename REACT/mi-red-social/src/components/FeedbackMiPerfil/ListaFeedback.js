import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ListaFeedback = ({ feedback_user_id }) => {
  const location = useLocation();
  const [feedbacks, setFeedbacks] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [updatedFeedback, setUpdatedFeedback] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/feedback/feedbacks/${feedback_user_id}`)
      .then((response) => response.json())
      .then((feedback) => {
        setFeedbacks(feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [feedback_user_id, updatedFeedback]); // Agrega updatedFeedback como dependencia

  useEffect(() => {
    setShowButtons(location.pathname === "/gestionar-feedbacks");
  }, [location]);

  const updateFeedbackStatus = (user_id, feedback_user_id, feedback_status) => {
    const feedback_status_updated = feedback_status === 1 ? 0 : 1;

    fetch(`http://localhost:3000/api/feedback/updatefeedback/${user_id}/${feedback_user_id}/${feedback_status_updated}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        setUpdatedFeedback(data.message); // Actualiza el estado updatedFeedback con el mensaje de éxito
        fetchFeedbacks(); // Carga todos los feedbacks nuevamente para refrescar la lista
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFeedbacks = () => {
    fetch(`http://localhost:3000/api/feedback/feedbacks/${feedback_user_id}`)
      .then((response) => response.json())
      .then((feedback) => {
        setFeedbacks(feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (feedbacks.length === 0) {
    return (
      <p className="text-center mt-4">
        Sigue haciendo más amigos y pide que te dejen una opinión positiva.
      </p>
    );
  }

  const allFeedbacksAreHidden = feedbacks.every((feedback) => feedback.feedback_status === 0);

  if (allFeedbacksAreHidden && location.pathname !== "/gestionar-feedbacks") {
    return (
      <p className="text-center mt-4">
        Pide que te escriban opiniones otros usuarios o habilita alguno de los que ya tienes.
      </p>
    );
  }

  return (
    <>
      {feedbacks
        .filter((feedback) => showButtons || feedback.feedback_status === 1) // Muestra todos los feedbacks si showButtons es verdadero, o los feedbacks con feedback_status igual a 1
        .map((feedback) => (
          <div className="bg-light p-2 rounded-3 border border-1 m-3" key={feedback.feedback_id}>
            <div className="overflow-hidden">
              <a className="h6 mb-0" href={`/user/${feedback.user_id}`}>
                {feedback.name} {feedback.surname}
              </a>
              <p className="mb-0 small text-truncate">{feedback.alias}</p>
            </div>
            <b>"{feedback.feedback_text}"</b>
            {showButtons && (
              <div className="text-center mt-2">
                <button
                  id={`boton_mostrar_${feedback.user_id}`}
                  className={`btn ${feedback.feedback_status === 0 ? "btn-success" : "btn-outline-success"} me-2`}
                  onClick={() => updateFeedbackStatus(feedback.user_id, feedback.feedback_user_id, feedback.feedback_status)}
                  disabled={feedback.feedback_status === 1} // Deshabilita el botón "Mostrar" cuando feedback_status es igual a 0
                >
                  Mostrar
                </button>
                <button
                  id={`boton_ocultar_${feedback.user_id}`}
                  className={`btn ${feedback.feedback_status === 1 ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={() => updateFeedbackStatus(feedback.user_id, feedback.feedback_user_id, feedback.feedback_status)}
                  disabled={feedback.feedback_status === 0} // Deshabilita el botón "Ocultar" cuando feedback_status es igual a 1
                >
                  Ocultar
                </button>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default ListaFeedback;
