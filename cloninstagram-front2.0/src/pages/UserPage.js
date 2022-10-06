import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { ErrorMessage } from "../components/ErrorMessage";
import { UserPost } from "../components/UserPost";
import { Loading } from "../components/Loading";

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Usuario: {user.email}</h1>
      <section class="user-data">
        <p>ID Usuario: {user.id}</p>
        <p>Usuario desde: {new Date(user.created_at).toLocaleString()}</p>
      </section>
      <UserPost id={user.id} />
    </section>
  );
};
