import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import "./Signup.scss";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Signup() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [regno, setRegno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordType1, setPasswordType1] = useState("password");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/signup", {
        name,
        phone,
        department,
        regno,
        email,
        password,
        cpassword,
      });
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "User created successfully",
        })
      );
      navigate("/login");
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

  const togglePassword1 = () => {
    if (passwordType1 === "password") {
      setPasswordType1("text");
      return;
    }
    setPasswordType1("password");
  };

  return (
    <div className="Signup">
      <div className="Logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="signup-box">
        <marquee behavior="" direction="">
          <h1 className="heading">Central University of Karnataka</h1>
        </marquee>
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            className="phone"
            id="phone"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="department">Department</label>
          <input
            type="text"
            className="department"
            id="department"
            placeholder="Department"
            onChange={(e) => setDepartment(e.target.value)}
          />

          <label htmlFor="regno">Enrollment Number</label>
          <input
            type="text"
            className="regno"
            id="regno"
            placeholder="Enrollment Number"
            onChange={(e) => setRegno(e.target.value)}
          />

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
              // onChange={handlePasswordChange}
              className="password"
              // value={passwordInput}
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

          <label htmlFor="cpassword">Confirm Password</label>
          <div className="row">
            <input
              type={passwordType1}
              className="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
              onChange={(e) => setCpassword(e.target.value)}
              autocomplete="new-password"
            />
            <div className="input-group-btn">
              <div
                className="btn btn-outline-primary"
                onClick={togglePassword1}
              >
                {passwordType1 === "password" ? (
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
          Already have an account?{" "}
          <Link className="link" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
