import usePost from "../hooks/usePost";
import { ErrorMessage } from "./ErrorMessage";
import { PostList } from "./PostList";

export const UserPost = ({ id }) => {
  const { photos, loading, error, removePost } = usePost(id);

  if (loading) return <p>Cargando Post</p>;
  if (error) return <ErrorMessage message={error} />;

  return <PostList photos={photos} removePost={removePost} />;
};
