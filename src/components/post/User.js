import React from "react";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router";


function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <Avatar src={user?.avatar?.url} />
        <h4>{user?.name}</h4>
      </div>
    </div>
  );
}

export default User;
