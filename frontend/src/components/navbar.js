import logo from "../assets/img/logo.png";
import { FcMenu } from "react-icons/fc";
import { Link } from "react-router-dom";
import { openSidebar } from "../features/pet/petCart";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { logoutUser } from "../features/auth/auth";

const Navbar = () => {
  const { token } = useSelector((store) => store.auth);
  let isAdmin, sub;
  if (token) {
    let decoded = jwt_decode(token);
    isAdmin = decoded.isAdmin;
    sub = decoded.sub;
  }
  const dispatch = useDispatch();
  return (
    <>
      <nav>
        <div className="mainNavbarContainer">
          <div className="logoContainer">
            <img src={logo} alt="logo" />
            <h2>Pet</h2>
          </div>
          <div className="toggleButton">
            <button type="submit" onClick={() => dispatch(openSidebar())}>
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
            {isAdmin && (
              <span>
                <Link to="/admin">Admin</Link>
              </span>
            )}
            {sub ? (
              <span
                className="logoutBtn"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </span>
            ) : (
              <span>
                <Link to="/login">Sign In</Link>
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
