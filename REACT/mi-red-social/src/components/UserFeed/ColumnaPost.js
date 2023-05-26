import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostAmigos from "./PostAmigos";
import NuevoPost from "./NuevoPost";

const ColumnaPost = () => {
  const user_id = localStorage.getItem("user_id");
  const [updatePosts, setUpdatePosts] = useState(false);

  useEffect(() => {
    if (updatePosts) {
      setUpdatePosts(false); // Restablecer el valor a false después de actualizar los posts
    }
  }, [updatePosts]);

  const handleUpdatePosts = () => {
    setUpdatePosts(true);
  };

  return (
    <Container>
      <NuevoPost user_id={user_id} updatePostAmigos={handleUpdatePosts} />
      <PostAmigos user_id={user_id} updatePosts={updatePosts} />
    </Container>
  );
};

export default ColumnaPost;
