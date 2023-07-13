import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
import logo from "../../assets/logo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="Login">
      <div className="login-box">
        <marquee behavior="" direction="">
          <h1 className="heading">Central University of Karnataka</h1>
        </marquee>
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <div className="row">
            <input
              type={passwordType}
              className="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="new-password"
            />
            <div className="input-group-btn">
              <div className="btn btn-outline-primary" onClick={togglePassword}>
                {passwordType === "password" ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible />
                )}
              </div>
            </div>
          </div>

          <input type="submit" className="submit btn-primary" />
        </form>
        <p className="subheading">
          Do not have an account?{" "}
          <Link className="link" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
      <div className="Logo">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Login;
