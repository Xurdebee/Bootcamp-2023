import React, { useEffect, useState } from "react";
import ListaFeedback from "./ListaFeedback";
import { Container } from "react-bootstrap";

function ColumnaEditableFeedback() {
  const user_id = localStorage.getItem("user_id");


  return (
    <Container>
      <div className="card">
        <div className="card-header pb-1 border-0">
          <h5 className="card-title mb-2">Opiniones:</h5>
        </div>
        <article>
          <ListaFeedback
            feedback_user_id={user_id}
          />
        </article>
        <div className="d-grid mt-3">
          <a href="/perfil" className="btn btn-sm btn-outline-success">
            Aceptar cambios
          </a>
        </div>
      </div>
    </Container>
  );
}

export default ColumnaEditableFeedback;
