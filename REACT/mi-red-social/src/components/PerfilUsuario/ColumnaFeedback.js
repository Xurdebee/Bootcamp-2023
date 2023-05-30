import React from "react";
import ListaFeedback from "./ListaFeedback";
import { Container } from "react-bootstrap";
import NuevoFeedback from "./NuevoFeedback";

function ColumnaFeedback() {
  const user_id = localStorage.getItem("user_id");
  const url = window.location.href;
    const feedback_user_id = url.match(/\/user\/(\d+)/)[1];

  return (
    <Container>
      <div className="card">
        <div className="card-header pb-1 border-0">
        	<h5 className="card-title mb-2">Opiniones:</h5>
        </div>

        <article className="mx-3 mt-3">
        	<NuevoFeedback user_id={user_id} feedback_user_id={feedback_user_id}  />
        </article>
        <article>
          <ListaFeedback feedback_user_id={feedback_user_id} />
        </article>
      </div>
    </Container>
  );
}

export default ColumnaFeedback;
