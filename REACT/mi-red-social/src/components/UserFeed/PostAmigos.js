import React from 'react';



function PostAmigos() {
	const userId = 1; // Reemplazar este valor con el valor userId del login
	return (
    <>
      <div className="bg-light p-2 rounded-3 border border-1 mb-3">
        <div className="mb-3 d-flex">
          <div className="me-2">
            <a href="#"><img className="rounded-circle" src="./users/user_2.jpg" height="50" alt="" /></a>
              {/* <a href="#"><img className="rounded-circle" src={user.image} height="50" alt="" /></a> */}
          </div>
          <div className="overflow-hidden">
              <a className="h6 mb-0" href="#!">Tio Random</a>
              <p className="mb-0 small text-truncate">Su alias</p>
              {/* <a className="h6 mb-0" href="#!">{user.name} {user.surname}</a>
              <p className="mb-0 small text-truncate">{user.alias}</p> */}
          </div>
          <div className="ms-auto align-self-center">Creado hace x unidades de tiempo</div>
        </div>

      <div className="nav w-100">

          <p className="form-control">Texto que carga de la base de datos. Puede que si meta muchos datos esto se rompa, pero eso estoy tratando de averiguar </p>
          
          <div className="hstack gap-3">
            <button className="btn btn-outline-danger border-0 rounded-circle corazon " id="boton_likes${comment.id}" type="submit" >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
            </button>

            <button className="nav-link border-0 bg-transparent" id="boton_responder" type="submit" >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
              </svg>
            </button>
          </div>
        </div>
            
        <div>
          <p id="total_likes${comment.id}" className="ms-1"> 1582</p>
        </div>

      </div>
    </>
  );
}


export default PostAmigos;