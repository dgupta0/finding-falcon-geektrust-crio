import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleHeaderReset() {
    localStorage.removeItem("data");
    localStorage.removeItem("result");
    location.pathname === "/game"
      ? window.location.reload()
      : navigate("/game");
  }

  return (
    <header>
      <h1 className="title">Finding Falcone</h1>
      {location.pathname === "/" ? (
        <nav className="larger-nav">
          <Link
            onClick={handleHeaderReset}
            className="nav-link play-now"
            to="game"
          >
            Play Now
          </Link>
        </nav>
      ) : (
        <nav className="larger-nav">
          <Link className="nav-link" to="/">
            Rules
          </Link>
          <Link onClick={handleHeaderReset} className="nav-link" to="/game">
            Reset
          </Link>
        </nav>
      )}
    </header>
  );
}
