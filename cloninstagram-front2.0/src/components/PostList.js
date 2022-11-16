import { Post } from "./Post";

export const PostList = ({ posts, removePost }) => {
  return posts.length ? (
    <ul className="post-list">
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Post post={post} removePost={removePost} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>No hay Post que mostrar</p>
  );
};
