import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import "./UpdateProfile.scss";
import dummyUserImg from "../../assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMyProfile,
  deleteMyProfile,
} from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";
import { useParams } from "react-router";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { axiosClient } from "../../utils/axiosClient";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  // const deletemyProfile = useSelector(
  //   (state) => state.appConfigReducer.myProfile
  // );
  const [hobbies, setHobbies] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setHobbies(myProfile?.hobbies || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url);
  }, [myProfile]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        hobbies,
        bio,
        userImg,
      })
    );
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "Profile Updated successfully",
      })
    );
    navigate(`/profile/${myProfile?._id}`);
  }

  async function handleDelete(e) {
    e.preventDefault();
    const confirmBox = window.confirm(
      "Are you sure you want to Delete your Account?"
    );
    if (confirmBox === false) process.exit(1);
    dispatch(
      deleteMyProfile({
        userId: params.userId,
      })
    );
    await axiosClient.post("/auth/logout");
    removeItem(KEY_ACCESS_TOKEN);
    navigate("/login");
  }

  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg ? userImg : dummyUserImg} alt={bio} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <label htmlFor="hobbies">Date of Birth</label>
            <input
              value={hobbies}
              id="hobbies"
              type="date"
              onChange={(e) => setHobbies(e.target.value)}
            />
            <label htmlFor="bio">About Yourself</label>
            <input
              value={bio}
              id="bio"
              type="text"
              placeholder="About Yourself"
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="submit"
              className="btn-primary"
              onClick={handleSubmit}
            />
          </form>
          <button className="delete-account btn-primary" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
