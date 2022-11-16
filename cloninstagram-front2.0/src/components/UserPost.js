import usePosts from "../hooks/usePosts";
import { ErrorMessage } from "./ErrorMessage";
import { PostList } from "./PostList";

export const UserPost = ({ id }) => {
  // recibe id de usuario
  const { posts, error, loading, removePost } = usePosts(id);

  if (loading) return <p>Cargando Post</p>;
  if (error) return <ErrorMessage message={error} />;

  return <PostList posts={posts} removePost={removePost} />;
};
