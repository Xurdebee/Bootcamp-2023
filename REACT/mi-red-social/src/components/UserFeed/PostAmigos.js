import React, { useState, useEffect } from "react";
import { HeartFill, Heart } from "react-bootstrap-icons";

function PostAmigos() {
  const [posts, setPosts] = useState([]);
  const user_id = localStorage.getItem("user_id");

  const handleButtonClick = (postId, userLikeStatus) => {
    const newLikeStatus = userLikeStatus === 0 ? 1 : 0;
    const url = userLikeStatus === 0 ? "/newlike" : "/unlike";

    fetch(`http://localhost:3000${url}`, {
      method: userLikeStatus === 0 ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        post_id: postId,
        like_status: newLikeStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Actualizar el estado de los posts después de dar like/unlike
          setPosts((prevPosts) =>
            prevPosts.map((post) => {
              if (post.post_id === postId) {
                return {
                  ...post,
                  user_like_status: newLikeStatus,
                };
              }
              return post;
            })
          );
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <div className="ms-auto align-self-center">Hace {post.timeAgo}</div>
          </div>

          <div className="nav w-100">
            <p className="form-control">{post.body}</p>

            <div className="hstack gap-3">
              <div>
                <button
                  className="btn btn-outline-danger border-0"
                  onClick={() => handleButtonClick(post.post_id, post.user_like_status)}
                >
                  {post.user_like_status === 1 ? (
                    <HeartFill width="24" height="24" />
                  ) : (
                    <Heart width="24" height="24" />
                  )}
                </button>
                <div>
                  <p
                    id={`total_likes${post.post_id}`}
                    className="ms-1 text-center small"
                  >
                    {post.like_count} {post.like_count === 1 ? "like" : "likes"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PostAmigos;
