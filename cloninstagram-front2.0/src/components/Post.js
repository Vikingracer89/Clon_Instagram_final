import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deletePostService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const Post = ({ photo, removePhoto }) => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");

  const deletePhoto = async (id) => {
    try {
      await deletePostService({ id, token });

      if (removePhoto) {
        removePhoto(id);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="Photo">
      <p>{photo.text}</p>
      {photo.image ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${photo.image}`}
          alt={photo.text}
        />
      ) : null}
      <p>
        By <Link to={`/user/${photo.user_id}`}>{photo.email}</Link> on{" "}
        <Link to={`/photo/${photo.id}`}>
          {new Date(photo.created_at).toLocaleString()}
        </Link>
      </p>
      {user && user.id === photo.user_id ? (
        <section>
          <button
            onClick={() => {
              if (
                window.confirm("¿Estas seguro de que quieres borrar este Post?")
              )
                deletePhoto(photo.id);
            }}
          >
            Borrar Post
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};
