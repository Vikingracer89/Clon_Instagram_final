import usePosts from "../hooks/usePosts";
import { PostList } from "../components/PostList";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewPost } from "../components/NewPost";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  const { posts, error, loading, addPost, removePost } = usePosts();
  const { user } = useContext(AuthContext);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      {user ? <NewPost addPost={addPost} /> : null}
      <h1>Ultimos posts</h1>
      <PostList posts={posts} removePost={removePost} />
    </section>
  );
};
