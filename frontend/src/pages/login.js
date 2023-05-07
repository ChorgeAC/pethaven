import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate(email, password)) {
      let credential = { email: email, password: password };
      try {
        const response = await fetch(`${config.endpoint}/v1/auth/login`, {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(credential),
        });
        const data = await response.json();
        if (data.tokens && data.tokens.access) {
          let { token } = data.tokens.access;
          window.localStorage.setItem("token", token);
        }
        setEmail("");
        setPassword("");
        window.location.href = "/";
      } catch (error) {
        console.log("error...");
      }
    }
  };

  const validate = (email, password) => {
    if (!email) {
      return false;
    }
    if (!password) {
      return false;
    }
    return true;
  };

  return (
    <div className="login-box">
      <h2>Welcome back</h2>
      <p>Enter your details</p>

      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <i className="fa-solid fa-user"></i>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <div>
        <span className="btn" onClick={(e) => handleSubmit(e)}>
          Log In
        </span>
        <span className="btn" style={{ marginLeft: "1rem" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </span>
      </div>
      <div>
        <span className="forgot">Forgot Your Password?</span>
      </div>
    </div>
  );
};

export default Login;
