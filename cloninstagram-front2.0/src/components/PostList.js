import { Post } from "./Post";

export const PostList = ({ photos, removePost }) => {
  return photos.length ? (
    <ul className="post-list">
      {photos.map((photo) => {
        return (
          <li key={photo.id}>
            <Post photo={photo} removePost={removePost} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>No hay Post que mostrar</p>
  );
};
