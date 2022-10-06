import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { Post } from "../components/Post";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";

export const PostPage = () => {
  const { id } = useParams();
  const { post, error, loading } = usePost(id);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Post</h1>
      <Post post={post} />
    </section>
  );
};
