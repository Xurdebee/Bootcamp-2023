import React, { useState, useEffect } from "react";
import { HeartFill, Heart } from "react-bootstrap-icons";

function PostAmigos({ updatePosts }) {
  const [post, setPosts] = useState([]);
  const user_id = localStorage.getItem("user_id");

  const handleButtonClick = (postId, userLikeStatus) => {
    const newLikeStatus = userLikeStatus === 0 ? 1 : 0;
    const url = userLikeStatus === 0 ? "newlike" : "unlike";

    fetch(`http://localhost:3000/${url}`, {
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
            prevPosts.map((post) =>
              post.post_id === postId
                ? {
                    ...post,
                    user_like_status: newLikeStatus,
                    like_count: data.like_count,
                  }
                : post
            )
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
    fetch(`http://localhost:3000/friendpost/${user_id}`)
      .then((response) => response.json())
      .then((friend_post) => {
        setPosts(friend_post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id, updatePosts]);

  return (
    <>
      {post.map((friendPost) => (
        <div
          className="bg-light p-2 rounded-3 border border-1 mb-3"
          key={friendPost.post_id}
        >
          <div className="mb-3 d-flex">
            <div className="me-2">
              <a href={`/user/${friendPost.user_id}`}>
                <img
                  className="rounded-circle"
                  src={friendPost.image}
                  height="50"
                  alt=""
                />
              </a>
            </div>
            <div className="overflow-hidden">
              <a className="h6 mb-0" href={`/user/${friendPost.user_id}`}>
                {friendPost.name} {friendPost.surname}
              </a>
              <p className="mb-0 small text-truncate">{friendPost.alias}</p>
            </div>
            <div className="ms-auto align-self-center">
              Hace {friendPost.timeAgo}
            </div>
          </div>

          <div className="nav w-100">
            <p className="form-control">{friendPost.body}</p>

            <div className="hstack gap-3">
              <div>
                <button
                  className="btn btn-outline-danger border-0"
                  onClick={() =>
                    handleButtonClick(
                      friendPost.post_id,
                      friendPost.user_like_status
                    )
                  }
                >
                  {friendPost.user_like_status === 1 ? (
                    <HeartFill width="24" height="24" />
                  ) : (
                    <Heart width="24" height="24" />
                  )}
                </button>
                <div>
                  <p
                    id={`total_likes${friendPost.post_id}`}
                    className="ms-1 text-center small"
                  >
                    {parseInt(friendPost.like_count)}{" "}
                    {parseInt(friendPost.like_count) === 1 ? "like" : "likes"}
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
