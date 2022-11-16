import { useParams } from "react-router-dom";
import useLike from "../hooks/useLike";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";

export const LikeButton = () => {
  const { like } = useParams();
  const { error, loading } = useLike(like);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <button>Like</button>
    </section>
  );
};
