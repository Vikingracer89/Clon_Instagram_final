import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deletePostService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { LikeButton } from "./Like";

export const Post = ({ post, removePost }) => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");

  const deletePhoto = async (id) => {
    try {
      await deletePostService({ id, token });

      if (removePost) {
        removePost(id);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="Photo">
      <p>{post.text}</p>
      {post.image ? (
        <Link to={`/photo/${post.id}`}>
          <img
            src={`${process.env.REACT_APP_BACKEND}/uploads/${post.image}`}
            alt={post.text}
          />
        </Link>
      ) : null}
      {user ? (
        <p>
          By <Link to={`/user/${post.user_id}`}>{post.email}</Link> on{" "}
          {new Date(post.created_at).toLocaleString()}
        </p>
      ) : null}
      {user && user.id === post.user_id ? (
        <section>
          <button
            onClick={() => {
              if (
                window.confirm("¿Estas seguro de que quieres borrar este Post?")
              )
                deletePhoto(post.id);
            }}
          >
            Borrar Post
          </button>
          <LikeButton />
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};
