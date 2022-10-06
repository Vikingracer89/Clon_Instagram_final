import { useEffect, useState } from "react";
import { getSinglePostService } from "../services";

const usePost = (id) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await getSinglePostService(id);

        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  return { post, error, loading };
};

export default usePost;
