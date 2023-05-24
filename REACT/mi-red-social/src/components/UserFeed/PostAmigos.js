import React, { useState, useEffect } from "react";

function PostAmigos() {
  const [posts, setPosts] = useState([]);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`http://localhost:3000/friendPost/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div
          className="bg-light p-2 rounded-3 border border-1 mb-3"
          key={post.post_id}
        >
          <div className="mb-3 d-flex">
            <div className="me-2">
              <a href={`/user/${post.user_id}`}>
                <img
                  className="rounded-circle"
                  src={post.image}
                  height="50"
                  alt=""
                />
              </a>
            </div>
            <div className="overflow-hidden">
              <a className="h6 mb-0" href={`/user/${post.user_id}`}>
                {post.name} {post.surname}
              </a>
              <p className="mb-0 small text-truncate">{post.alias}</p>
            </div>
            <div className="ms-auto align-self-center">
              Hace {post.timeAgo}
            </div>
          </div>

          <div className="nav w-100">
            <p className="form-control">{post.body}</p>

            <div className="hstack gap-3">
              <div>
                <button
                  className="btn btn-outline-danger border-0 rounded-circle corazon"
                  id={`boton_likes${post.post_id}`}
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                  <div>
                    <p id={`total_likes${post.post_id}`} className="ms-1 text-center small">
                      {post.like_count} {post.like_count === 1 ? "like" : "likes"}
                    </p>
                </div>
                </button>
              </div>
            </div>
          </div>

        </div>
      ))}
    </>
  );
}

export default PostAmigos;
