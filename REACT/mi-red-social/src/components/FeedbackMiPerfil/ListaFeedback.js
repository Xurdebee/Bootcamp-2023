import React, { useEffect, useState } from "react";

const ListaFeedback = ({user_id}) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/feedbacks/${user_id}`)
      .then((response) => response.json())
      .then((feedback) => {
        setFeedbacks(feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  if (feedbacks.length === 0) {
    return (
      <p className="text-center mt-4">
        Sigue haciendo más amigos y pide que te dejen una opinión positiva.
      </p>
    );
  }

  return (
    <>
      {feedbacks.map((feedback) => (
        <div
          className="bg-light p-2 rounded-3 border border-1 m-3"
          key={feedback.feedback_id}
        >
          <div className="overflow-hidden">
            <a className="h6 mb-0" href={`/user/${feedback.user_id}`}>
              {feedback.name} {feedback.surname}
            </a>
            <p className="mb-0 small text-truncate">{feedback.alias}</p>
          </div>
          <b>"{feedback.feedback_text}"</b>
        </div>
      ))}
    </>
  );
};

export default ListaFeedback;
