import React from "react";
import AmigoUsuario from "./AmigoUsuario";
import { Container } from "react-bootstrap";

const ColumnaAmigos = () => {
  // const user_id = 1;
  const user_id = localStorage.getItem("user_id");
  return (
    <Container>
      <div className="bg-light p-2 rounded-3 border-1 border">
        <div className="text-center mb-3">
          <div className="">
            <article className="my-3">
              <AmigoUsuario user_id={user_id} />
            </article>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ColumnaAmigos;
