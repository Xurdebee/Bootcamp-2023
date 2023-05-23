import React, { useEffect, useState } from "react";

function AmigoSugerido({ user_id }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/suggested/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  const followUser = (follow_user_id) => {
    fetch("http://localhost:3000/newfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, follow_user_id }),
    })
      .then((response) => {
        console.log("Follow realizado con exito");

        // Actualizar la lista de usuarios sugeridos después de hacer el seguimiento
        fetch(`http://localhost:3000/suggested/${user_id}`)
          .then((response) => response.json())
          .then((data) => {
            setUsers(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {users.map((user) => (
        <div className="hstack gap-2 mt-2 mb-3" key={user.user_id}>
          <div className="me-2">
            <a href="#">
              <img
                className="rounded-circle"
                src={user.image}
                height="50"
                alt=""
              />
            </a>
          </div>
          <div className="overflow-hidden">
            <a className="h6 mb-0" href="#!">
              {user.name} {user.surname}
            </a>
            <p className="mb-0 small text-truncate">{user.alias}</p>
          </div>
          <button
            className="btn btn-outline-primary ms-auto btn-sm"
            onClick={() => followUser(user.user_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
          </button>
        </div>
      ))}
    </>
  );
}

export default AmigoSugerido;
