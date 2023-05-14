import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { closeSidebar } from "../features/pet/petCart";
import jwt_decode from "jwt-decode";
import { logoutUser } from "../features/auth/auth";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.pet);
  const { token } = useSelector((store) => store.auth);
  let isAdmin, sub;
  if (token) {
    let decoded = jwt_decode(token);
    isAdmin = decoded.isAdmin;
    sub = decoded.sub;
  }
  const dispatch = useDispatch();

  return (
    <div className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <img src={logo} alt="logo" width={"50rem"} />
        <button className="close-btn" onClick={() => dispatch(closeSidebar())}>
          <FaTimes />
        </button>
      </div>
      <div style={{ padding: "1rem" }}>
        <div className="links">
          <Link to="/" onClick={() => dispatch(closeSidebar())}>
            Home
          </Link>
        </div>
        <div className="links">
          <Link to="/about" onClick={() => dispatch(closeSidebar())}>
            About
          </Link>
        </div>
        {isAdmin && (
          <div className="links">
            <Link to="/admin" onClick={() => dispatch(closeSidebar())}>
              Admin
            </Link>
          </div>
        )}
        {sub ? (
          <div className="logoutBtn" onClick={() => dispatch(logoutUser())}>
            logout
          </div>
        ) : (
          <div className="links">
            <Link to="/login" onClick={() => dispatch(closeSidebar())}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
