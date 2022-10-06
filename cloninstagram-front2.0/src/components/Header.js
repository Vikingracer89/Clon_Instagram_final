import { Auth } from "./Auth";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div>
        <span></span>
      </div>
      <h1>
        <Link to={"/"}>Clon Instagram</Link>
      </h1>
      <nav>
        <Auth />
      </nav>
    </header>
  );
};
