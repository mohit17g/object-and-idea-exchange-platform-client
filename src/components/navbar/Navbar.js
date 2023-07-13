import React, { useRef, useState } from "react";
// import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { axiosClient } from "../../utils/axiosClient";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function handleLogoutClicked() {
    const confirmBox = window.confirm("Do you really want to Logout?");
    if (confirmBox === false) process.exit(1);
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {}
  }

  return (
    <div className="Navbar">
      <div className="container">
        <div className="left-side">
          <h2 className="banner hover-link" onClick={() => navigate("/")}>
            Home
          </h2>
          {/* <h2 className="banner hover-link" onClick={() => navigate(`/profile1/${myProfile?._id}`)}>
            Homew
          </h2> */}
          <h2
            className="banne hover-link"
            onClick={() => navigate(`/buyandsell/${myProfile?._id}`)}
          >
            Buy and Sell
          </h2>
          <h2
            className="banne hover-link"
            onClick={() => navigate(`/event/${myProfile?._id}`)}
          >
            Event
          </h2>
          <h2
            className="banne hover-link"
            onClick={() => navigate(`/recruitment/${myProfile?._id}`)}
          >
            Recruitment
          </h2>
        </div>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          {/* <div className="logout hover-link" onClick={() => navigate("/expen")}>
            Expense Tracker
          </div> */}
          {/* <div className="logout hover-link" onClick={() => navigate("/news")}>
            Daily News
          </div> */}
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
