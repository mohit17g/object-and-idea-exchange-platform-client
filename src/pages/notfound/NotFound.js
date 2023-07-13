import { Link } from "react-router-dom";
import "../notfound/NotFound.scss";

function NotFound() {
  return (
    <div className="containerr">
      <div>
        <h2 className="h2" style={{ color: "teal" }}>
          404
        </h2>
        <h3 className="h3">UH OH! You're lost.</h3>
        <p className="p">
          {" "}
          The page you are looking for does not exist. You can click the button
          below to go back to the homepage.
        </p>
        <Link to="/">
          <button className="btn-primary">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
