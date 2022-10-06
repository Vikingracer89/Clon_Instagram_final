import { Link } from "react-router-dom";

export const ErrorMessage = ({ message }) => {
  return (
    <section className="error">
      <h1>Upss, hay un Error</h1>
      <p>{message}</p>
      <Link to={"/"}>Ir al inicio</Link>
    </section>
  );
};
