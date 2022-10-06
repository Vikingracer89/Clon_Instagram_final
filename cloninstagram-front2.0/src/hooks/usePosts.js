import { useEffect, useState } from "react";
import { getAllPostsService, getUserPostsService } from "../services";

const usePosts = (id) => {
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = id
          ? await getUserPostsService(id)
          : await getAllPostsService();

        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [id]);

  const addPost = (data) => {
    setPosts([data, ...post]);
  };

  const removePost = (id) => {
    setPosts(post.filter((post) => post.id !== id));
  };

  return { post, error, loading, addPost, removePost };
};

export default usePosts;
