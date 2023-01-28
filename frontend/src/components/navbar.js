import logo from "../assets/img/logo.png";
import { FcMenu } from "react-icons/fc";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav>
        <div className="mainNavbarContainer">
          <div className="logoContainer">
            <img src={logo} alt="logo" />
            <h2>Pet</h2>
          </div>
          <div className="toggleButton">
            <button type="submit">
              <FcMenu style={{ fontSize: "2rem" }} />
            </button>
          </div>
          <div className="navigationLinkContainer">
            <span>
              <Link to="/">Home</Link>
            </span>
            <span>
              <Link to="/about">About</Link>
            </span>
            <span>Sign In</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
