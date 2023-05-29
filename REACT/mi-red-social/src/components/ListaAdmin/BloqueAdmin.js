import React from "react";
import Usuarios from "./Usuarios";
import { Container } from "react-bootstrap";

const BloqueAdmin = () => {

  return (
    <Container fluid className="h-100">
      <div className="bg-light rounded-3 border-1 border">
        <div className="text-center mb-3">
            <article className="my-3">
              <Usuarios />
            </article>
        </div>
      </div>
    </Container>
  );
};

export default BloqueAdmin;
