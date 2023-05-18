import React from 'react';
import { Container } from 'react-bootstrap';
import NuevoPost from './NuevoPost';
import PostAmigos from './PostAmigos';

function ColumnaPost() {
	const userId = 1; // Reemplazar este valor con el valor userId del login
	return (
  <Container>
      <div className="bg-light p-2 rounded-3 border border-1 mb-4">
        <div className="mb-0">
          <div className="mb-2 d-flex">
            <div className="me-2">
            <a href="#"><img className="rounded-circle" src="./users/user_1.jpg" height="50" alt="" /></a>
              {/* <a href="#"><img className="rounded-circle" src={user.image} height="50" alt="" /></a> */}
            </div>
            <div className="overflow-hidden">
              <a className="h6 mb-0" href="#!">Ellen Ripley</a>
              <p className="mb-0 small text-truncate">Exterminadora de aliens</p>
              {/* <a className="h6 mb-0" href="#!">{user.name} {user.surname}</a>
              <p className="mb-0 small text-truncate">{user.alias}</p> */}
            </div>
          </div>

          <form className="nav w-100">
          <textarea data-autoresize="" className="form-control bg-white" placeholder="¿Que quieres compartir ahora?" style={{height: '70px'}}></textarea>

          <button className="nav-link border-0 bg-transparent ms-auto" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
            </svg>
          </button>

          </form>
        </div>
    </div>
  </Container>
  );
}

export default ColumnaPost;