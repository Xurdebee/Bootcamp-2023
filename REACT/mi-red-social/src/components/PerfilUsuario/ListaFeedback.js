import React, { useEffect, useState } from "react";

const ListaFeedback = ({ user_id, feedback_user_id }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/feedbacks?user_id=${user_id}&feedback_user_id=${feedback_user_id}`)
      .then((response) => response.json())
      .then((feedback) => {
        setFeedbacks(feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id, feedback_user_id]);

  return (
    <>
      {feedbacks.map((feedback) => (
        <div key={feedback.feedback_id}>
          <div className="overflow-hidden">
            <a className="h6 mb-0" href={`/user/${user.user_id}`}>
              {user.name} {user.surname}
            </a>
            <p className="mb-0 small text-truncate">{user.alias}</p>
          </div>
          <p>Mensaje: {feedback.feedback_text}</p>
        </div>
      ))}
    </>
  );
};

export default ListaFeedback;
