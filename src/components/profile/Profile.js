import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Profile.scss";
import { useNavigate, useParams } from "react-router";
import CreatePost from "../createPost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
// import { Profile1 } from "./Profile1";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile?._id === params.userId);
  }, [myProfile, params.userId]);

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part1">
          {isMyProfile && <CreatePost />}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}

          {/* <Profile1 /> */}
          {/* <h2
            className="banner hover-link"
            onClick={() => navigate(`/profile1/${myProfile?._id}`)}
          >
            Your Advertisements
          </h2> */}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className="user-img" src={userProfile?.avatar?.url} alt="" />
            <h3 className="user-name">{userProfile?.name}</h3>
            <p className="bio">{userProfile?.hobbies}</p>
            <p className="bio">{userProfile?.email}</p>
            <p className="bio">{userProfile?.department}</p>
            {/* <p className="bio">{userProfile?.regno}</p> */}
            <h4 className="bio bioo">{userProfile?.bio}</h4>

            {isMyProfile && userProfile?.email === "mohit17g.one@gmail.com" && (
              <button
                className="update-profile btn-primary"
                onClick={() => {
                  navigate(`/admin/${myProfile?._id}`);
                }}
              >
                Admin
              </button>
            )}

            {isMyProfile && (
              <button
                className="update-profile btn-primary"
                onClick={() => {
                  navigate("/updateProfile");
                }}
              >
                Update Profile
              </button>
            )}
            {isMyProfile && (
              <button
                className="update-profile btn-primary"
                onClick={() => {
                  navigate(`/profile2/${myProfile?._id}`);
                }}
              >
                Your All Events
              </button>
            )}
            {isMyProfile && (
              <button
                className="update-profile btn-primary"
                onClick={() => {
                  navigate(`/profile3/${myProfile?._id}`);
                }}
              >
                Your All Recruitment
              </button>
            )}
            {isMyProfile && (
              <button
                className="update-profile btn-primary"
                onClick={() => {
                  navigate(`/profile1/${myProfile?._id}`);
                }}
              >
                Your All Advertisments
              </button>
            )}
            {/* {myProfile?._id === "649982ea04591d8e68ab54de"  && userProfile?.email != "mohit17g.one@gmail.com" && (
              <button
                className="update-profile btn-primary"
                onClick={() => {
                  navigate(`/admin/${myProfile?._id}`);
                }}
              >
                Delete Account
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
