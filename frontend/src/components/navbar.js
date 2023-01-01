import logo from "../assets/img/logo.png";
import { FcMenu } from "react-icons/fc";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav>
        <div className="flex h-16 p-2 justify-between">
          <div className="flex justify-center items-center">
            <img
              className="object-cover relative shadow-sm max-w-max h-full"
              src={logo}
              alt="logo"
            />
            <h2 className="p-1 text-4xl text-purple-900">Pet</h2>
          </div>
          <div className="md:hidden flex items-center">
            <button type="submit">
              <FcMenu style={{ fontSize: "2rem" }} />
            </button>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center mt-2">
              <span className="p-3 text-2xl">
                <Link to="/">Home</Link>
              </span>
              <span className="p-3 text-2xl">
                <Link to="/about">About</Link>
              </span>
              <span className="p-3 text-2xl">Sign In</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
