import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../App";
import {
  successMessage,
  erroMessage,
  warningMessage,
  ToastContainer,
} from "../utils/notification";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate(name, email, password)) {
      let credential = { email: email, password: password, name: name };
      try {
        const response = await fetch(`${config.endpoint}/v1/auth/register`, {
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
        if (data.code === 400) {
          erroMessage(data.message);
        }
        if (data.tokens && data.tokens.access) {
          successMessage("Registeration Successful");
          let { token } = data.tokens.access;
          window.localStorage.setItem("token", token);
          setEmail("");
          setPassword("");
          setName("");
          window.location.href = "/";
        }
      } catch (error) {
        console.log("error...");
      }
    }
  };

  const validate = (name, email, password) => {
    if (!name) {
      warningMessage("Plese enter name");
      return false;
    }
    if (!email) {
      warningMessage("Plese enter Email");
      return false;
    }
    if (!password) {
      warningMessage("Plese enter password");
      return false;
    }
    if (password.length < 7) {
      warningMessage("Password shoule have 8 characters.");
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
          <label htmlFor="name">Name</label>
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <div>
        <span className="btn" onClick={(e) => handleSubmit(e)}>
          Register
          <ToastContainer />
        </span>
        <span style={{ marginLeft: "1rem" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <button className="btn">Home</button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
