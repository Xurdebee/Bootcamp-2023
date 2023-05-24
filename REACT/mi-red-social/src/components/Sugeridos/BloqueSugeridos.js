import React from "react";
import AmigoSugerido from "./AmigoSugerido";
import { Container } from "react-bootstrap";

const BloqueSugeridos = () => {
  // const user_id = 1;
  const user_id = localStorage.getItem("user_id");

  return (
    <Container>
      <div className="bg-light p-2 rounded-3 border-1 border">
        <div className="text-center mb-3">
          <div className="">
            <article className="my-3">
              <AmigoSugerido user_id={user_id} />
            </article>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BloqueSugeridos;
