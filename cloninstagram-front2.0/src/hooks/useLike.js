import { useEffect, useState } from "react";
import { likePostService } from "../services";

const useLike = () => {
  const [like, setLike] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLike = async () => {
      try {
        setLoading(true);
        const data = await likePostService(like);

        setLike(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadLike();
  }, [like]);

  return { like, error, loading };
};

export default useLike;
