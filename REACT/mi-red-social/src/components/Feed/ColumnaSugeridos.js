import React from 'react';
import AmigoSugerido from './AmigoSugerido';
import { Container } from 'react-bootstrap';

function ColumnaSugeridos() {
	const userId = 1; // Reemplazar este valor con el valor userId del login
	return (
  <Container>
      <div className="card">
        <div className="card-header pb-1 border-0">
          <h5 className="card-title mb-2">Quizás conozcas a:</h5>
        </div>

        <article className="mx-3">
      		<AmigoSugerido userId={userId} />
    	</article>

        <div className="d-grid mt-3">
          <a href="#!" className="btn btn-sm btn-outline-primary">Ver más</a>
        </div>
      </div>
  </Container>
  );
}

export default ColumnaSugeridos;